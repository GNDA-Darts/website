// Register page settings.
//
// endpoint: leave blank to use the address in data/forms.js (the same web app serves every form).
//
// Everything else (open or closed, session, price per player, roster size, divisions, note) is set by the
// board in the Sheet's Settings tab ("Registration ..." rows) and read live by the page.

window.GNDA_REGISTER = {
  endpoint: "",

  // Shown when registration is closed or the page can't reach the Sheet.
  closedText: "Team registration for the next session isn't open yet. Watch the home page for the announcement.",
  contact: "gndadarts@gmail.com"
};
