// Register page settings.
//
// endpoint: the web app address of the GNDA Sheet's Apps Script (Deploy → Manage deployments → Web app URL,
// ending in /exec). Blank = the Register page says online registration isn't available.
//
// Everything else (open or closed, session, price per player, roster size, divisions, note) is set by the
// board in the Sheet's Settings tab ("Registration ..." rows) and read live by the page.

window.GNDA_REGISTER = {
  endpoint: "",

  // Shown when registration is closed or the page can't reach the Sheet.
  closedText: "Team registration for the next session isn't open yet. Watch the home page for the announcement.",
  contact: "gndadarts@gmail.com"
};
