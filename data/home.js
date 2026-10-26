// GNDA home page content.
// Edit this file to update the home page; the page itself never needs to change.
// Bars and weekly blind draws live in data/venues.js (shared with the Venues page).
//
// Rules of thumb:
//   - Dates are written YYYY-MM-DD (e.g. "2026-12-05").
//   - Past events and expired announcements disappear on their own.
//   - Keep the commas between entries.

window.GNDA_HOME = {

  // Who we are and what we do, beside the logo. One line per paragraph.
  mission: [
    "Our mission is to promote the sport of darts and create a fun and welcoming environment for players of all skill levels. We offer a range of divisions, from beginner to advanced, and our teams are made up of players from all walks of life. Join us for a game and a great time."
  ],

  // One-off events: signups, tournaments, banquets, board meetings.
  //   date:     first day (YYYY-MM-DD)
  //   end:      last day, for multi-day events (optional)
  //   when:     replaces the printed date when the exact date isn't set, e.g. "Third weekend of July" (optional)
  //   time, place, details, link, linkText: optional
  //   place: a venue name spelled as in data/venues.js links to its map; "TBA" shows as "Venue TBA"
  //   flyer: web address of the flyer (Instagram post or Google Drive); shows a "View flyer" link (optional)
  //   id:   a short web address for the event, e.g. "music-city-classic" makes
  //         nashvilledartleague.com/#music-city-classic open straight to it (optional)
  //   repeat: for a monthly event, e.g. "third Monday" or "first Saturday". Leave out date;
  //         the page always shows the next one. (optional)
  //   linkText with no link shows as "(coming soon)" until a link is added.
  //   more: text for a "More info" expansion: a list of paragraphs; put a paragraph
  //         in [square brackets] to show it as bullet points (optional). Example:
  //         more: [ "Registration opens June 1.", ["Friday: doubles", "Saturday: singles"] ]
  events: [
    { repeat: "third Monday", time: "7:30 pm", title: "Board meeting",
      details: "Board meetings are open to the public and held the third Monday of every month. Have something you'd like the board to discuss?",
      link: "about/index.html#contact", linkText: "Submit an agenda item" },
    { date: "2026-10-24", title: "A Killer Night: GNDA Halloween Party", time: "7:00 pm", place: "New venue TBA",
      details: "A killer blind draw: draw your partner and hope for the best. Costume contest, $10 per entry with 5 free Triple Shot tickets. Beer goggles contest. The GNDA Triple Shot will be there." },
    { date: "2027-01-01", when: "January 2027 (date TBA)", title: "Winter session starts",
      details: "New players are welcome, with or without a team. Tell us you're interested and we'll help you find teammates, including a meet and greet before the season.",
      link: "league/index.html", linkText: "How to join" },
    { date: "2027-07-16", end: "2027-07-18", when: "July 2027 (dates TBA)", title: "Music City Classic", id: "music-city-classic",
      details: "The GNDA's annual steel-tip tournament, held each July.",
      link: "musiccityclassic/index.html", linkText: "Tournament page" }
  ],

  // Announcements: news that isn't a dated event (signups open, a rule change, a new venue).
  //   title, text: required (keep text to a sentence or two)
  //   link, linkText: optional button (linkText defaults to "Learn more")
  //   from:  first day to show (optional; blank = now)
  //   until: last day to show (required; it disappears the day after)
  //   pinned: true keeps it at the top (optional)
  // With no current announcements, the column is hidden and events use the full width.
  announcements: [
    { title: "Need a team for Winter?", until: "2027-01-01",
      text: "Solo players are welcome. Tell us you're interested and we'll help you find teammates before the session starts.",
      link: "league/index.html", linkText: "How to join" }
  ]

};
