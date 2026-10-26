// Bars with steel-tip boards and weekly blind draws.
// Used by both the home page (blind draws) and the Venues page (full list).
// Keep the commas between entries.

window.GNDA_VENUES = {

  // Shown at the bottom of the Venues page. [link text](page) becomes a link.
  hostNote: "Want your bar to host GNDA teams? Host bars pay a $30 fee per team, per session. [Contact the board](about/index.html#contact).",

  // Bars with steel-tip boards. Each address becomes a map link.
  //   league: true  = a GNDA league venue (listed first)
  //   area:   neighborhood, shown under the name
  venues: [
    { name: "The Villager Tavern",          league: true, area: "Hillsboro Village", address: "1719 21st Ave S, Nashville, TN 37212" },
    { name: "Asian Cajun",                  league: true, area: "Donelson",          address: "3248 Blackwood Dr, Nashville, TN 37214" },
    { name: "Elm Hill Tavern",              league: true, area: "Elm Hill Pike",     address: "1941 Elm Hill Pike, Nashville, TN 37210" },
    { name: "Players South",                league: true, area: "Wilhagan Rd",       address: "314 Wilhagan Rd, Nashville, TN 37217" },
    { name: "Noble's Central",              league: true, area: "MetroCenter",       address: "2292 Rosa L Parks Blvd, Nashville, TN" },
    { name: "TNT's Billiards Bar & Grill",  league: true, area: "Nolensville Pike",  address: "4523 Nolensville Pike, Nashville, TN" },
    { name: "Ernie's Boondock",             area: "East Nashville",                  address: "927 Woodland St, Nashville, TN 37206" },
    { name: "Corner Bar South",             area: "Nolensville Pike",                address: "2190 Nolensville Pike, Nashville, TN" },
    { name: "Lowbar",                       area: "East Nashville",                  address: "917 Woodland St, Nashville, TN 37206" },
    { name: "Crow's Nest",                  area: "Green Hills",                     address: "2221 Bandywood Dr, Nashville, TN 37215" },
    { name: "Roy's Tavern",                 area: "East Nashville",                  address: "3807 Gallatin Pike, Nashville, TN 37216" },
    { name: "Noble's Kitchen & Beer Hall",  area: "East Nashville",                  address: "974 Main St, Nashville, TN 37206" },
    { name: "Mickey's Tavern",              area: "East Nashville",                  address: "2907 Gallatin Pike, Nashville, TN 37216" }
  ],

  // Weekly blind draws. Shown in day order, starting from today.
  //   day:    Monday ... Sunday
  //   time:   as it should appear, e.g. "7:30 pm"
  //   venue:  same spelling as in the venues list above (the address comes from there)
  //   notes:  format, entry fee, anything players should know (optional)
  blindDraws: [
    { day: "Monday", time: "7:30 pm", venue: "The Villager Tavern" },
    { day: "Friday", time: "7:30 pm", venue: "Players South" },
    { day: "Saturday", time: "7:30 pm", venue: "Players South" }
  ]
};
