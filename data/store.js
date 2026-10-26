// Store page content.
// Edit this file to update the store; the page itself never needs to change.
//
// Each item's "link" is where its Pay button goes. For now these point to the
// matching items in the old Wix store. When Stripe or Square is set up, replace
// each link with that item's payment link. Leave link empty ("") to show the
// item without a button.
// Keep the commas between entries.

window.GNDA_STORE = {

  intro: "Pay league fees, membership and sponsorships online.",

  groups: [
    { title: "League fees", items: [
      { name: "Team session fee", price: "$20", unit: "per player, per session",
        text: "Paid by the team captain before each session. A full team of 6 is $120.",
        link: "https://www.nashvilledartleague.com/store/GNDA-Session-Fee-p560893761" },
      { name: "GNDA membership", price: "$20", unit: "per player, per year",
        text: "Paid once a year and good through December 31 of the year you join. Includes membership in the Tennessee Darts Organization.",
        link: "https://www.nashvilledartleague.com/store/GNDA-Membership-p560880217" },
      { name: "Bar session fee", price: "$30", unit: "per team, per session",
        text: "Paid by host bars for each team that plays there.",
        link: "https://www.nashvilledartleague.com/store/GNDA-Bar-Sponsor-Fee-p751283992" }
    ]},
    { title: "Sponsorships", items: [
      { name: "Music City Classic board sponsorship", price: "$25", unit: "per board",
        text: "Put your business or your name on a tournament board. Send your logo or info to gndadarts@gmail.com.",
        link: "https://www.nashvilledartleague.com/store/MMCC-Board-Sponsorship-p560869165" }
    ]}
  ],

  // Shown at the end of the store until merchandise is added.
  comingSoon: "Shirts and other GNDA merchandise are coming soon."
};
