// Website forms (agenda items, team registration, and later the others).
//
// endpoint: the web app address of the GNDA Sheet's Apps Script (Apps Script → Deploy → Manage deployments →
// Web app URL, ending in /exec). Every form on the site sends to this one address.
// Blank = the forms say online submission isn't available yet and show the email address below instead.

window.GNDA_FORMS = {
  endpoint: "https://script.google.com/macros/s/AKfycbzcqBmH_hUB0iq6ZFIlUOd0pZdzIOMbLyDMj8cscA-j49rgR5bZKK5mNRdHZhDVr0zhQQ/exec",
  contact: "gndadarts@gmail.com"
};
