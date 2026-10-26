// League pages content: Overview, Sub list and Rules.
// Edit this file to update those pages; the pages themselves never need to change.
// Keep the commas between entries.

window.GNDA_LEAGUE = {

  // ---------- Overview ----------
  // How it works: a heading and a paragraph each.
  // Links: write [link text](page) — e.g. [Venues page](venues/index.html) — and it becomes a link.
  howItWorks: [
    { title: "League night",
      text: "Matches are played Wednesdays at 7:30 pm, in three sessions a year: Fall (September–November), Winter (January–March) and Summer (May–July). Each match is a mix of singles, doubles and a team game, playing 501, cricket and 1001." },
    { title: "Teams and divisions",
      text: "Each team has 4 to 6 players and is placed in a division of 4 to 6 similarly skilled teams, based on players' stats and ability. Each session carries a team fee of $20 per player on the roster. The fee covers the scoring and stats service the league runs on, which charges per player, and helps fund the end-of-session awards ceremony." },
    { title: "Home and away",
      text: "Each team picks a home bar and plays every other team in its division twice: once at its home bar and once at the other team's. See the [Venues page](venues/index.html) for a list of league bars." },
    { title: "Captains",
      text: "Each team has a captain who signs up the team and pays the team session fee, sets the lineup on league night, makes sure every match is scored, and passes league news to the team." }
  ],


  // ---------- Sub list ----------
  subsIntro: "Players available to fill in when a team is short.",
  // Roster and sub rules, shown beside the sub list (from the Rules & By-Laws).
  subRules: [
    "Once registered, a player is locked to that team for the session.",
    "No new players can join during the last three matches of a session.",
    "Subs must come from this list or be new members.",
    "A team can use one sub per match, and none if four registered players are there at the start.",
    "If a registered player arrives after the match starts with a sub, the captain chooses which of the two plays the rest of the night, starting with the next set.",
    "A team can use subs in up to five matches a session. No subs in the playoffs."
  ],
  subs: [
    { name: "Beth Dunkerson",  division: "E" },
    { name: "Brandi Shore",    division: "E" },
    { name: "Brian Jackson",   division: "E" },
    { name: "Brian McHugh",    division: "B" },
    { name: "John Roberts",    division: "C" },
    { name: "Lindsey Kapp",    division: "E" },
    { name: "Mark Dzurko",     division: "E" },
    { name: "Marty Dunkerson", division: "D" },
    { name: "Robert Bennet",   division: "D" },
    { name: "Shane McCaslin",  division: "B" }
  ],

  // ---------- Rules ----------

  // Key rules: a short summary of the player-facing rules in the Rules & By-Laws.
  // The PDF is the official version. One card per group; one line per rule.
  // Links: write [link text](web address) and it becomes a link.
  keyRulesNote: "A summary of the rules players run into most. The full [Rules & By-Laws](https://www.nashvilledartleague.com/_files/ugd/1fd038_74e6ead834ee4e92b06ab5025bbbd54a.pdf) (PDF) are the official version.",
  keyRules: [
    { title: "Match night", items: [
      "The first event has a 15-minute grace period. No more than 5 minutes should pass between games.",
      "If you can't put a player on a board by the end of the grace period, that singles set is an automatic loss. In a doubles or team event, you play a player down instead.",
      "Keep your feet behind the oche, 7 ft 9¼ in from the board, until the dart lands. After a warning, a foot fault cancels that dart's score."
    ]},
    { title: "Sportsmanship and protests", items: [
      "Good sportsmanship is required at every GNDA event. Don't distract a player who is throwing. Serious or repeated problems are handled by the board.",
      "Captains should settle problems on the spot. If they can't, raise a protest then and play on, and send it in writing to the Secretary within 7 days. A committee of uninvolved members rules within 7 days, and its decision is final."
    ]},
    { title: "Scheduling", items: [
      "A match can be rescheduled only if both captains agree and the Vice President and Statistician are told before the start time. The new date must be within 10 days.",
      "A team that forfeits must tell the board at least 3 days before its next match, or it is treated as withdrawn.",
      "Each team must send its captain or a teammate to captains' meetings. Missing one without approval costs a point."
    ]}
  ],

  // League-night checklist for captains and scorers.
  // Links: write [link text](web address) and it becomes a link.
  checklistIntro: "For captains and whoever is scoring. First time? Watch [how to set up a league match](https://youtu.be/6WnJVg455vo) (video).",
  checklist: [
    "Update the scoring app on both tablets before league night.",
    "Pick the correct match and match date before you start.",
    "Set your lineups.",
    "Score every dart as thrown: tap T for triples, D for doubles and the number for singles. Shortcut buttons make triple and double percentages wrong.",
    "Use cricket scoring for cricket legs.",
    "End and save the match after every set. No Wi-Fi? Play on and save when you're back online."
  ]
};
