// Music City Classic page content.
// Edit this file to update the tournament page; the page itself never needs to change.
// Keep the commas between entries.

window.GNDA_MCC = {

  // Shown under the page title.
  intro: "The GNDA's annual steel-tip tournament: a July weekend of singles, doubles and blind draws that brings players to Nashville from across the U.S. and Canada.",

  // The next tournament. Replace "TBA" as details are announced.
  next: {
    year: 2027,
    dates: "TBA",
    venue: "TBA",
    note: "Dates, venue and the full event schedule will be posted here and on the GNDA Facebook page."
  },

  // Board sponsorship (the item sold in the old Wix store).
  sponsorship: {
    price: "$25",
    text: "Put your business or your name on a tournament board. Send your logo or info to gndadarts@gmail.com.",
    link: "store/index.html", linkText: "Sponsor a board"
  },

  // Last year's tournament, shown as a reference until the new details are out.
  //   formats: one line per kind of event; count = how many events of that kind
  last: {
    title: "2026 Music City Classic",
    dates: "July 24–26, 2026",
    prizeFund: "$5,500",
    eventsTotal: 14,
    formats: [
      { name: "King and Queen of Music City", detail: "Open singles in 501 and cricket", count: 4 },
      { name: "Doubles", detail: "Men's and women's, in 501 and cricket", count: 4 },
      { name: "Blind draws", detail: "Friday and Saturday nights", count: 2 },
      { name: "Intro to Tournament singles", detail: "Capped for newer players, in 501 and cricket", count: 2 },
      { name: "Mixed triples", detail: "Cricket, 501 and more", count: 1 },
      { name: "Youth / Adult 501", detail: "Free, with trophies", count: 1 }
    ]
  },

  // Hall of fame: singles champions by year, newest first.
  //   field: number of entries in that event (optional; when added, the page shows it and adds up a yearly total)
  //   local: true adds a GNDA tag for a GNDA player
  // Players with more than one title are featured automatically at the top.
  hallOfFame: [
    { year: 2026, results: [
      { event: "Men's 501",       champion: "John Frank" },
      { event: "Women's 501",     champion: "Darby Price", local: true },
      { event: "Men's cricket",   champion: "David Lowe", local: true },
      { event: "Women's cricket", champion: "Brittany Berry" }
    ]},
    { year: 2025, results: [
      { event: "Men's 501",       champion: "Dustin Holt" },
      { event: "Women's 501",     champion: "Tracy Feiertag" },
      { event: "Men's cricket",   champion: "Kevin Luke" },
      { event: "Women's cricket", champion: "Paula Murphy" }
    ]},
    { year: 2024, results: [
      { event: "Men's 501",       champion: "Leonard Gates" },
      { event: "Women's 501",     champion: "Andrea Taylor" },
      { event: "Men's cricket",   champion: "Leonard Gates" },
      { event: "Women's cricket", champion: "Cali West" }
    ]},
    { year: 2023, results: [
      { event: "Men's 501",       champion: "Jules Van Dongen" },
      { event: "Women's 501",     champion: "Paula Murphy" },
      { event: "Men's cricket",   champion: "Jim Long" },
      { event: "Women's cricket", champion: "Paula Murphy" }
    ]},
    { year: 2022, results: [
      { event: "Men's 501",       champion: "Danny Lauby Jr." },
      { event: "Women's 501",     champion: "Liz Tynan" },
      { event: "Men's cricket",   champion: "Alex Spellman" },
      { event: "Women's cricket", champion: "Paula Murphy" }
    ]},
    { year: 2021, results: [
      { event: "Men's 501",       champion: "Larry Butler" },
      { event: "Women's 501",     champion: "Liz Tynan" },
      { event: "Men's cricket",   champion: "David Lowe", local: true },
      { event: "Women's cricket", champion: "Paula Murphy" }
    ]},
    { year: 2019, results: [
      { event: "Men's 501",       champion: "David Cameron" },
      { event: "Women's 501",     champion: "Paula Murphy" },
      { event: "Men's cricket",   champion: "Joe Chaney" },
      { event: "Women's cricket", champion: "Debbie Ivey" }
    ]},
    { year: 2018, results: [
      { event: "Men's 501",       champion: "Danny Lauby Jr." },
      { event: "Women's 501",     champion: "Paula Murphy" },
      { event: "Men's cricket",   champion: "Leonard Gates" },
      { event: "Women's cricket", champion: "Paula Murphy" }
    ]}
  ],

  sources: [
    { label: "ADO: 2018 results",  url: "https://www.adodarts.com/2018/08/05/2018-music-city-classic-results/" },
    { label: "ADO: 2019 results",  url: "https://www.adodarts.com/2019/08/05/2019-music-city-classic-results/" },
    { label: "ADO: 2021 results",  url: "https://www.adodarts.com/2021/07/28/2021-music-city-classic-results/" },
    { label: "2024 WDF calendar",  url: "https://en.wikipedia.org/wiki/2024_WDF_calendar" }
  ]
};
