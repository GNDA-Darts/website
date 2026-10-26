// Website sync: reads the Sheet's published tabs and writes data/sheet.js.
//
// data/sheet.js overrides the parts of data/*.js that the Sheet owns (events, announcements, venues,
// blind draws, board, hall of fame, single-line settings). Long text stays in data/*.js.
//
// Safety rules:
//   - A tab that fails to download, or whose columns don't match, keeps its last good content.
//   - Bad rows are skipped and reported; good rows still publish.
//   - Venues, Board and Hall of fame must have at least one good row (an empty tab is treated as a mistake).
//
// Writes: data/sheet.js (only if the content changed), .github/sync-state.json (failure counts, last problems),
// and $GITHUB_OUTPUT: changed=true|false, notify=true|false. The email text goes to .github/sync-report.json.
//
// Local test: SHEET_CSV_DIR=/path/to/csvs node .github/scripts/sync-sheet.mjs
//   (files named like "... - Events.csv"; no network needed)

import fs from 'node:fs';
import path from 'node:path';

const ROOT = path.resolve(path.dirname(new URL(import.meta.url).pathname), '..', '..');
const OUT = path.join(ROOT, 'data', 'sheet.js');
const STATE = path.join(ROOT, '.github', 'sync-state.json');
const REPORT = path.join(ROOT, '.github', 'sync-report.json');

const BASE = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vSt72B_ITuXPZah1EQX9qo6wae-jH2iQNY6YDXL0TL3yCsayq8hQxa4WuDL5VIL9vKwoQ1SDyarCDb5/pub';
const TABS = {
  'Events': 191168445,
  'Announcements': 349244965,
  'Blind draws': 1559201622,
  'Venues': 1407077343,
  'Board': 1337314146,
  'Hall of fame': 1980104400,
  'Settings': 1891239368,
};
const FAILS_BEFORE_EMAIL = 3;   // hourly runs: a tab must fail 3 times in a row before anyone is emailed

// ------------------------------------------------------------------------------------------------
// CSV and value checks
// ------------------------------------------------------------------------------------------------

function parseCsv(text) {
  const rows = []; let row = [], cell = '', q = false;
  text = text.replace(/^﻿/, '');
  for (let i = 0; i < text.length; i++) {
    const c = text[i];
    if (q) {
      if (c === '"' && text[i + 1] === '"') { cell += '"'; i++; }
      else if (c === '"') q = false;
      else cell += c;
    } else if (c === '"') q = true;
    else if (c === ',') { row.push(cell); cell = ''; }
    else if (c === '\n' || c === '\r') {
      if (c === '\r' && text[i + 1] === '\n') i++;
      row.push(cell); rows.push(row); row = []; cell = '';
    } else cell += c;
  }
  if (cell !== '' || row.length) { row.push(cell); rows.push(row); }
  return rows;
}

const isIso = s => {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(s)) return false;
  const [y, m, d] = s.split('-').map(Number), t = new Date(Date.UTC(y, m - 1, d));
  return t.getUTCFullYear() === y && t.getUTCMonth() === m - 1 && t.getUTCDate() === d;
};
// A full web address, or a page on this site written from the top folder ("league/index.html", "about/index.html#contact").
const isLink = s => /^https?:\/\/[^\s]+\.[^\s]+$/i.test(s) || /^[a-z0-9][a-z0-9\-_/]*(\.html)?(#[\w\-]+)?$/i.test(s);
const isWebUrl = s => /^https?:\/\/[^\s]+\.[^\s]+$/i.test(s);
const yes = s => /^(true|yes|y|x|1)$/i.test(String(s).trim());
const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
const REPEAT = /^(first|second|third|fourth|last) (monday|tuesday|wednesday|thursday|friday|saturday|sunday)$/i;
const time = s => s.replace(/\s*([ap])\.?m\.?$/i, (m, a) => ' ' + a.toLowerCase() + 'm').trim();

/** Turn a tab's rows into objects keyed by header; checks the required columns are there. */
function table(rows, need) {
  const head = (rows[0] || []).map(h => h.trim());
  const missing = need.filter(c => !head.includes(c));
  if (missing.length) throw new Error('missing column' + (missing.length > 1 ? 's' : '') + ': ' + missing.join(', '));
  return rows.slice(1)
    .map((r, i) => ({ row: i + 2, v: Object.fromEntries(head.map((h, j) => [h, String(r[j] ?? '').trim()])) }))
    .filter(r => Object.values(r.v).some(Boolean));
}

// ------------------------------------------------------------------------------------------------
// One converter per tab: returns {data, problems}
// ------------------------------------------------------------------------------------------------

const CONVERT = {
  'Events'(rows) {
    const problems = [], data = [];
    for (const { row, v } of table(rows, ['Status', 'Date', 'End date', 'Date text', 'Repeats', 'Time', 'Title', 'Venue', 'Details', 'Link', 'Link text', 'Flyer link', 'Short link id'])) {
      const at = `Events row ${row}${v['Title'] ? ` ("${v['Title']}")` : ''}`;
      const status = v['Status'] || 'Active';
      if (status === 'Cancelled') continue;
      if (status !== 'Active') { problems.push(`${at}: status "${status}" is not Active or Cancelled; skipped.`); continue; }
      if (!v['Title']) { problems.push(`${at}: no title; skipped.`); continue; }
      const e = { title: v['Title'] };
      if (v['Repeats']) {
        if (!REPEAT.test(v['Repeats'])) { problems.push(`${at}: Repeats "${v['Repeats']}" should look like "third Monday"; skipped.`); continue; }
        e.repeat = v['Repeats'];
      } else {
        if (!isIso(v['Date'])) { problems.push(`${at}: Date "${v['Date']}" is not a date (YYYY-MM-DD); skipped.`); continue; }
        e.date = v['Date'];
        if (v['End date']) {
          if (isIso(v['End date']) && v['End date'] >= v['Date']) e.end = v['End date'];
          else problems.push(`${at}: End date "${v['End date']}" ignored (not a date, or before the start).`);
        }
        if (v['Date text']) e.when = v['Date text'];
      }
      if (v['Time']) e.time = time(v['Time']);
      if (v['Venue']) e.place = v['Venue'];
      if (v['Details']) e.details = v['Details'];
      if (v['Link']) {
        if (isLink(v['Link'])) { e.link = v['Link']; e.linkText = v['Link text'] || 'More info'; }
        else problems.push(`${at}: Link "${v['Link']}" is not a web address; left off.`);
      } else if (v['Link text']) e.linkText = v['Link text'];        // shows as "(coming soon)"
      if (v['Flyer link']) {
        if (isWebUrl(v['Flyer link'])) e.flyer = v['Flyer link'];
        else problems.push(`${at}: Flyer link "${v['Flyer link']}" is not a web address; left off.`);
      }
      if (v['Short link id']) {
        if (/^[a-z0-9-]+$/.test(v['Short link id'])) e.id = v['Short link id'];
        else problems.push(`${at}: Short link id "${v['Short link id']}" should be lowercase letters, numbers and dashes; left off.`);
      }
      data.push(e);
    }
    return { data, problems };
  },

  'Announcements'(rows) {
    const problems = [], data = [];
    for (const { row, v } of table(rows, ['Status', 'Title', 'Text', 'Button link', 'Button label', 'Show from', 'Show until', 'Pinned'])) {
      const at = `Announcements row ${row}${v['Title'] ? ` ("${v['Title']}")` : ''}`;
      const status = v['Status'] || 'Active';
      if (status === 'Removed') continue;
      if (status !== 'Active') { problems.push(`${at}: status "${status}" is not Active or Removed; skipped.`); continue; }
      if (!v['Title'] || !v['Text']) { problems.push(`${at}: needs both a title and text; skipped.`); continue; }
      if (!isIso(v['Show until'])) { problems.push(`${at}: Show until "${v['Show until']}" is not a date (YYYY-MM-DD); skipped.`); continue; }
      const a = { title: v['Title'], text: v['Text'], until: v['Show until'] };
      if (v['Show from']) {
        if (isIso(v['Show from'])) a.from = v['Show from'];
        else problems.push(`${at}: Show from "${v['Show from']}" is not a date; shown right away instead.`);
      }
      if (v['Button link']) {
        if (isLink(v['Button link'])) { a.link = v['Button link']; a.linkText = v['Button label'] || 'Learn more'; }
        else problems.push(`${at}: Button link "${v['Button link']}" is not a web address; button left off.`);
      }
      if (yes(v['Pinned'])) a.pinned = true;
      data.push(a);
    }
    return { data, problems };
  },

  'Blind draws'(rows) {
    const problems = [], data = [];
    for (const { row, v } of table(rows, ['Day', 'Time', 'Venue', 'Notes'])) {
      const at = `Blind draws row ${row}`;
      const day = DAYS.find(d => d.toLowerCase() === v['Day'].toLowerCase());
      if (!day) { problems.push(`${at}: Day "${v['Day']}" is not a weekday; skipped.`); continue; }
      if (!v['Venue']) { problems.push(`${at}: no venue; skipped.`); continue; }
      const d = { day, time: time(v['Time']), venue: v['Venue'] };
      if (v['Notes']) d.notes = v['Notes'];
      data.push(d);
    }
    return { data, problems };
  },

  'Venues'(rows) {
    const problems = [], data = [];
    for (const { row, v } of table(rows, ['Name', 'Neighborhood', 'Address', 'League venue'])) {
      if (!v['Name']) { problems.push(`Venues row ${row}: no name; skipped.`); continue; }
      const x = { name: v['Name'] };
      if (yes(v['League venue'])) x.league = true;
      if (v['Neighborhood']) x.area = v['Neighborhood'];
      if (v['Address']) x.address = v['Address'];
      data.push(x);
    }
    if (!data.length) throw new Error('no venues listed');
    return { data, problems };
  },

  'Board'(rows) {
    const problems = [], data = [];
    for (const { row, v } of table(rows, ['Role', 'Name'])) {
      if (!v['Role'] || !v['Name']) { problems.push(`Board row ${row}: needs both a role and a name; skipped.`); continue; }
      data.push({ role: v['Role'], name: v['Name'] });
    }
    if (!data.length) throw new Error('no board members listed');
    return { data, problems };
  },

  'Hall of fame'(rows) {
    const problems = [], years = new Map();
    for (const { row, v } of table(rows, ['Year', 'Event', 'Champion', 'GNDA player', 'Entries'])) {
      const at = `Hall of fame row ${row}`;
      if (!/^(19|20)\d\d$/.test(v['Year'])) { problems.push(`${at}: Year "${v['Year']}" is not a year; skipped.`); continue; }
      if (!v['Event'] || !v['Champion']) { problems.push(`${at}: needs an event and a champion; skipped.`); continue; }
      const r = { event: v['Event'], champion: v['Champion'] };
      if (yes(v['GNDA player'])) r.local = true;
      if (v['Entries']) {
        if (/^\d+$/.test(v['Entries'])) r.field = Number(v['Entries']);
        else problems.push(`${at}: Entries "${v['Entries']}" is not a number; left off.`);
      }
      const y = Number(v['Year']);
      if (!years.has(y)) years.set(y, []);
      years.get(y).push(r);
    }
    if (!years.size) throw new Error('no champions listed');
    const data = [...years.keys()].sort((a, b) => b - a).map(year => ({ year, results: years.get(year) }));
    return { data, problems };
  },

  'Settings'(rows) {
    const problems = [], data = {};
    for (const { v } of table(rows, ['Key', 'Value'])) if (v['Key'] !== 'Last published') data[v['Key']] = v['Value'];
    const link = data['Contact form link'];
    if (link && !isWebUrl(link)) { problems.push(`Settings: Contact form link "${link}" is not a web address; left as "coming soon".`); data['Contact form link'] = ''; }
    return { data, problems };
  },
};

// ------------------------------------------------------------------------------------------------
// Assemble data/sheet.js
// ------------------------------------------------------------------------------------------------

/** Sections of sheet.js, keyed by the tab they come from. */
function build(tabs) {
  const S = {}, t = tabs;
  const sec = k => (S[k] = S[k] || {});
  if (t['Events']) sec('home').events = t['Events'];
  if (t['Announcements']) sec('home').announcements = t['Announcements'];
  if (t['Blind draws']) sec('venues').blindDraws = t['Blind draws'];
  if (t['Venues']) sec('venues').venues = t['Venues'];
  if (t['Board']) sec('about').board = t['Board'];
  if (t['Hall of fame']) sec('mcc').hallOfFame = t['Hall of fame'];
  const st = t['Settings'];
  if (st) {
    const has = k => Object.prototype.hasOwnProperty.call(st, k);
    if (has('Mission') && st['Mission']) sec('home').mission = st['Mission'].split(/\n\s*\n/).map(s => s.trim()).filter(Boolean);
    if (has('Board title')) sec('about').boardTitle = st['Board title'];
    if (has('Contact form link')) sec('about').contactLink = st['Contact form link'];
    if (has('Store intro')) sec('store').intro = st['Store intro'];
    if (has('Merchandise note')) sec('store').comingSoon = st['Merchandise note'];
    if (has('Venue hosting note')) sec('venues').hostNote = st['Venue hosting note'];
  }
  return S;
}

const APPLY = `(function (S) {
  // Copy the Sheet's sections over the defaults in data/*.js. Anything missing here keeps the file's value.
  function put(target, src) { if (!target || !src) return; for (var k in src) target[k] = src[k]; }
  var A = window.GNDA_ABOUT;
  put(window.GNDA_HOME, S.home);
  put(window.GNDA_VENUES, S.venues);
  put(window.GNDA_MCC, S.mcc);
  put(window.GNDA_STORE, S.store);
  if (A && S.about) {
    if (S.about.board) A.board = S.about.board;
    if (S.about.boardTitle !== undefined) A.boardTitle = S.about.boardTitle;
    if (S.about.contactLink !== undefined && A.contact) A.contact.link = S.about.contactLink;
  }
})(window.GNDA_SHEET);`;

function render(tabs) {
  return '// Generated by the website sync from the Google Sheet. Do not edit: change the Sheet instead.\n' +
    '// tabs: ' + JSON.stringify(tabs) + '\n' +
    'window.GNDA_SHEET = ' + JSON.stringify(build(tabs), null, 1) + ';\n' + APPLY + '\n';
}

function readPrevious() {
  try {
    const m = /^\/\/ tabs: (.*)$/m.exec(fs.readFileSync(OUT, 'utf8'));
    return m ? JSON.parse(m[1]) : {};
  } catch { return {}; }
}

// ------------------------------------------------------------------------------------------------
// What changed (for the email and the commit message)
// ------------------------------------------------------------------------------------------------

const LABEL = {
  'Events': e => e.title, 'Announcements': a => a.title, 'Blind draws': d => `${d.day} ${d.venue}`,
  'Venues': v => v.name, 'Board': b => `${b.role}: ${b.name}`, 'Hall of fame': y => String(y.year),
};

function describe(tab, before, after) {
  if (JSON.stringify(before) === JSON.stringify(after)) return null;
  if (before === undefined) return `${tab}: now from the Sheet.`;
  if (tab === 'Settings') {
    const keys = [...new Set([...Object.keys(before), ...Object.keys(after)])].filter(k => before[k] !== after[k] && k !== 'Last published');
    return keys.length ? `Settings: changed ${keys.join(', ')}.` : null;
  }
  const lab = LABEL[tab], b = new Map(before.map(x => [lab(x), JSON.stringify(x)])), a = new Map(after.map(x => [lab(x), JSON.stringify(x)]));
  const added = [...a.keys()].filter(k => !b.has(k)), removed = [...b.keys()].filter(k => !a.has(k));
  const changed = [...a.keys()].filter(k => b.has(k) && b.get(k) !== a.get(k));
  const parts = [];
  if (added.length) parts.push('added ' + added.join('; '));
  if (removed.length) parts.push('removed ' + removed.join('; '));
  if (changed.length) parts.push('changed ' + changed.join('; '));
  return `${tab}: ${parts.join('. ') || 'order changed'}.`;
}

// ------------------------------------------------------------------------------------------------
// Main
// ------------------------------------------------------------------------------------------------

async function fetchTab(name) {
  const dir = process.env.SHEET_CSV_DIR;
  if (dir) {
    const f = fs.readdirSync(dir).find(n => n.endsWith(`- ${name}.csv`) || n === `${name}.csv`);
    if (!f) throw new Error('no local file');
    return fs.readFileSync(path.join(dir, f), 'utf8');
  }
  const url = `${BASE}?gid=${TABS[name]}&single=true&output=csv`;
  let last;
  for (let attempt = 1; attempt <= 3; attempt++) {
    try {
      const r = await fetch(url, { redirect: 'follow', signal: AbortSignal.timeout(30000) });
      if (!r.ok) throw new Error('HTTP ' + r.status);
      const text = await r.text();
      if (/^\s*</.test(text)) throw new Error('got a web page instead of the tab (is it still published?)');
      return text;
    } catch (err) { last = err; await new Promise(res => setTimeout(res, 3000 * attempt)); }
  }
  throw last;
}

const prev = readPrevious();
let state = {};
try { state = JSON.parse(fs.readFileSync(STATE, 'utf8')); } catch {}
state.fails = state.fails || {};

const tabs = {}, problems = [], failed = [];
for (const name of Object.keys(TABS)) {
  let text = null;
  try { text = await fetchTab(name); }
  catch (err) {                                                 // download trouble: usually passes, so wait a few runs
    state.fails[name] = (state.fails[name] || 0) + 1;
    failed.push({ name, why: err.message, count: state.fails[name], threshold: FAILS_BEFORE_EMAIL });
  }
  if (text !== null) {
    try {
      const { data, problems: p } = CONVERT[name](parseCsv(text));
      tabs[name] = data; problems.push(...p);
      state.fails[name] = 0;
    } catch (err) {                                             // the tab itself is broken: report on the first run
      state.fails[name] = (state.fails[name] || 0) + 1;
      failed.push({ name, why: err.message, count: state.fails[name], threshold: 1 });
    }
  }
  if (tabs[name] === undefined && prev[name] !== undefined) tabs[name] = prev[name];   // keep the last good version
}

const changes = Object.keys(TABS).map(n => describe(n, prev[n], tabs[n])).filter(Boolean);
const changed = changes.length > 0;
if (changed) fs.writeFileSync(OUT, render(tabs));

// Email only for news: content changed, a new set of skipped rows, or a tab that has failed several runs in a row.
const failNews = failed.filter(f => f.count === f.threshold).map(f => f.threshold === 1
  ? `${f.name} tab: ${f.why}. Nothing from this tab was published; the website keeps its last good copy until it is fixed.`
  : `${f.name} tab: could not be downloaded for ${f.count} runs in a row (${f.why}). The website keeps its last good copy.`);
const problemsKey = JSON.stringify(problems);
const problemsNews = problemsKey !== JSON.stringify(state.problems || []) && problems.length > 0;
state.problems = problems;
const notify = changed || failNews.length > 0 || problemsNews;

fs.writeFileSync(STATE, JSON.stringify(state, null, 1) + '\n');
fs.writeFileSync(REPORT, JSON.stringify({ changes, problems, failures: failNews }, null, 1));

console.log(changed ? 'Changed:\n  ' + changes.join('\n  ') : 'No content changes.');
if (problems.length) console.log('Skipped or adjusted:\n  ' + problems.join('\n  '));
if (failed.length) console.log('Could not read:\n  ' + failed.map(f => `${f.name} (${f.why}; ${f.count} in a row)`).join('\n  '));
if (process.env.GITHUB_OUTPUT) fs.appendFileSync(process.env.GITHUB_OUTPUT, `changed=${changed}\nnotify=${notify}\n`);
