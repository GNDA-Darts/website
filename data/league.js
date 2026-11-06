// League pages content: Overview, Sub list and Rules.
// Edit this file to update those pages; the pages themselves never need to change.
// Keep the commas between entries.

window.GNDA_LEAGUE = {

  // ---------- Overview ----------
  // One overview per league, chosen with the Team | Singles switch. Both use the same headings in the same order.
  // Links: write [link text](page) — e.g. [Venues page](venues/index.html) — and it becomes a link.
  overview: {
    team: {
      name: "Team league",
      register: ["Register a team", "league/register/index.html"],
      items: [
        { title: "When and where",
          text: "Wednesdays at 7:30 pm. Each team picks a home bar and plays every other team in its division twice: once at home and once away. See the [Venues page](venues/index.html) for league bars." },
        { title: "Format",
          text: "Each match is a mix of singles, doubles and a team game, playing 501, cricket and 1001. Details are in the [rules](league/rules/index.html)." },
        { title: "Teams and divisions",
          text: "Teams have 4 to 6 players and play in divisions of 4 to 6 similarly skilled teams, placed by players' stats and ability." },
        { title: "Sessions",
          text: "Three a year: Fall (September–November), Winter (January–March) and Summer (May–July)." },
        { title: "How to join",
          text: "Captains are responsible for [registering the team](league/register/index.html). The team session fee is $20 per player and must be paid at the time of registration. The captain is also responsible for confirming that their home bar is available to host them before completing the registration. Note: All players must have an active GNDA membership to participate. Not an active member? Join [here](store/index.html)!" }
      ]
    },
    singles: {
      name: "Singles league",
      register: ["Register", "league/register/singles/index.html"],
      items: [
        { title: "When and where",
          text: "Any day, at any GNDA bar: you and your opponent pick the time and place. Matches can be played in any order, as long as all of them are finished by the session deadline." },
        { title: "Format",
          text: "One-on-one 501, scored in DartConnect. Division 1 plays first to 11 legs; Division 2 plays 11 legs, and Division 3 plays 9 legs. Rankings determined by match wins for Division 1 and total legs won in Divisions 2 and 3. Details are in the [rules](league/singles/rules/index.html)." },
        { title: "Divisions and groups",
          text: "Three divisions, placed by DartConnect 501 average. Each division is split into groups of up to 8 of similar overall strength, and you play everyone in your group once (7 matches in a group of 8). The top three in each group go to the playoffs, and prizes go to the top three; the amounts depend on the number of players." },
        { title: "Sessions",
          text: "Three a year: two in the first half of the year, then a summer break, and one in the fall. Dates to be announced." },
        { title: "How to join",
          text: "Players are responsible for [registering themselves](league/register/singles/index.html). The buy-in is $50 per player and must be paid at the time of registration. When you register, you tell us which afternoons and evenings usually work for you; you get a suggested schedule showing when you and each opponent are usually free, and each session starts with a mixer where players put their dates on the calendar. Note: All players must have an active GNDA membership to participate. Not an active member? Join [here](store/index.html)!" }
      ]
    }
  },

  // Singles rules page
  singlesDivisions: [
    { division: "Division 1", match: "First to 11 legs.", ranked: "Match wins" },
    { division: "Division 2", match: "Best of 11 legs. All 11 are played.", ranked: "Total legs won" },
    { division: "Division 3", match: "Best of 9 legs. All 9 are played.", ranked: "Total legs won" }
  ],

  // Singles rules page. Items marked "To be decided" are placeholders until the board settles them.
  singlesRules: [
    { title: "Matches", items: [
      "All legs are 501. Cork for the first throw, then players alternate.",
      "Every match is scored in DartConnect, under the GNDA singles league.",
      "Play at any GNDA bar, on any day and at any time both players agree on."
    ]},
    { title: "Deadline", items: [
      "Matches can be played in any order, ahead or behind, as long as every group match is finished by the session deadline.",
      "Matches not played by the deadline: to be decided."
    ]},
    { title: "Standings and playoffs", items: [
      "Division 1 is ranked by match wins; Divisions 2 and 3 by total legs won.",
      "Tiebreakers: to be decided.",
      "The top three in each group play off: 2nd against 3rd, then the winner against 1st (proposed)."
    ]}
  ],
  singlesPrizes: "Prizes go to the top three in each group. The amounts depend on the number of players in the group and are announced once groups are set.",

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
