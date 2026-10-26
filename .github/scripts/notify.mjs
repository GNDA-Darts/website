// Sends the sync report to the Sheet's script, which emails the website administrator
// (Form settings → Notify emails) and lists any skipped rows on the Problems tab.
// Needs repository secrets SHEET_NOTIFY_URL (the script's web app address) and SHEET_NOTIFY_KEY.

import fs from 'node:fs';

const url = process.env.SHEET_NOTIFY_URL, key = process.env.SHEET_NOTIFY_KEY;
if (!url || !key) { console.log('Email not set up yet (no SHEET_NOTIFY_URL / SHEET_NOTIFY_KEY secrets); skipping.'); process.exit(0); }

const report = JSON.parse(fs.readFileSync(new URL('../sync-report.json', import.meta.url), 'utf8'));
const body = { key, ...report, site: process.env.SITE_URL || '', run: process.env.RUN_URL || '' };
const r = await fetch(url, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body), redirect: 'follow' });
const text = (await r.text()).trim();
console.log('Sheet script answered:', r.status, text.slice(0, 200));
if (!r.ok || text !== 'ok') process.exitCode = 1;
