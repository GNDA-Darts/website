// GNDA site header and footer, shared by every page.
// To add or rename a menu item, edit MENU below; every page picks it up.
// League pages also get a second row: Overview, a Team | Singles switch and that league's pages (LEAGUES below), on wider screens only; phones list them in the Menu.
//
// Each page includes, as the first thing inside <body>:
//   <script src="assets/site.js" data-root="" data-page="home"></script>
//   data-root: path back to the site's top folder ("" on the home page, "../" one folder down)
//   data-page: which menu item to mark as the current page
//   data-sub:  on League pages, which League link to mark (overview, standings, players, ...)
(function(){
  var MENU = [
    // [label, link (relative to the site's top folder, or a full web address), page key]
    // A label with an empty link shows greyed out as "coming soon".
    ["Home",               "index.html",                          "home"],
    ["Leagues",            "league/index.html",                   "league"],
    ["Store",              "store/index.html",                    "store"],
    ["Venues",             "venues/index.html",                   "venues"],
    ["Music City Classic", "musiccityclassic/index.html",         "mcc"],
    ["About",              "about/index.html",                    "about"]
  ];
  // League row: Overview, a Team | Singles switch, then the chosen league's own pages.
  // Register isn't in the row: the league cards on the Overview, the Home announcement and the Store link to it.
  var OVERVIEW = ["Overview", "league/index.html", "overview"];
  var LEAGUES = [
    { label: "Team", long: "Team league", key: "team", items: [
      ["Standings",   "league/stats/index.html#standings", "standings"],
      ["Players",     "league/stats/index.html#players",   "players"],
      ["Leaderboard", "league/stats/index.html#leaders",   "leaders"],
      ["Sub list",    "league/subs/index.html",            "subs"],
      ["Rules",       "league/rules/index.html",           "rules"]
    ]},
    { label: "Singles", long: "Singles league", key: "singles", items: [
      ["Standings",   "league/singles/index.html#standings", "s-standings"],
      ["Matches",     "league/singles/index.html#matches",   "s-matches"],
      ["Rules",       "league/singles/rules/index.html",     "s-rules"]
    ]}
  ];
  var FACEBOOK  = "https://www.facebook.com/groups/171823421880/";
  var INSTAGRAM = "https://www.instagram.com/gnda_nashvilledartleague/";
  var EMAIL     = "gndadarts@gmail.com";

  var me = document.currentScript;
  var root = (me && me.getAttribute("data-root")) || "";
  var page = (me && me.getAttribute("data-page")) || "";
  var sub  = (me && me.getAttribute("data-sub")) || "";
  function esc(s){return String(s).replace(/[&<>"']/g,function(c){return {"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]})}
  function href(l){return /^https?:/.test(l) ? l : root + l}

  function link(m, cls){
    return '<a'+(cls?' class="'+cls+'"':'')+' href="'+esc(href(m[1]))+'" data-sub="'+m[2]+'"'+(page==="league" && m[2]===sub?' aria-current="page"':'')+'>'+esc(m[0])+'</a>';
  }
  function groupOf(key){ for(var i=0;i<LEAGUES.length;i++){ if(LEAGUES[i].items.some(function(m){return m[2]===key})) return LEAGUES[i]; } return null; }
  function groupLink(g, text, cls, on){
    return '<a'+(cls?' class="'+cls+'"':'')+' href="'+esc(href(g.items[0][1]))+'" data-group="'+g.key+'"'+(page==="league" && (on || groupOf(sub)===g)?' aria-current="page"':'')+'>'+esc(text)+'</a>';
  }

  // On phones the menu lists the league pages under Leagues (wider screens use the League row)
  var leagueSub = '<div class="nav-sub">'+link(OVERVIEW)+LEAGUES.map(function(g){
      return groupLink(g, g.long, "nav-grp")+'<div class="nav-sub2">'+g.items.map(function(x){return link(x)}).join("")+'</div>';
    }).join("")+'</div>';
  var items = MENU.map(function(m){
    if(!m[1]) return '<span title="Coming soon">'+esc(m[0])+'</span>';
    return '<a href="'+esc(href(m[1]))+'"'+(m[2]===page?' aria-current="page"':'')+'>'+esc(m[0])+'</a>'+
      (m[2]==="league" ? leagueSub : '');
  }).join("");

  // Pages that belong to neither league (Overview, Register) show the Team league's links; the singles signup page shows Singles'
  var cur = groupOf(sub) || (/\/singles\//.test(location.pathname) ? LEAGUES[1] : LEAGUES[0]);
  var subnav = page!=="league" ? '' :
    '<nav class="subnav" aria-label="Leagues"><div class="wrap">'+link(OVERVIEW)+
      '<span class="switch" role="group" aria-label="League">'+LEAGUES.map(function(g){ return groupLink(g, g.label, "", g===cur); }).join("")+'</span>'+
      LEAGUES.map(function(g){
        return '<span class="pages" data-row="'+g.key+'"'+(g===cur?'':' hidden')+'>'+g.items.map(function(x){return link(x)}).join("")+'</span>';
      }).join("")+
    '</div></nav>';

  document.body.insertAdjacentHTML("afterbegin",
    '<header class="top"><div class="wrap">'+
      '<a class="brand" href="'+esc(root)+'index.html">GNDA</a>'+
      // Menu button: only shown on phones (see site.css), where it opens and closes the menu
      '<button class="menu-btn" type="button" aria-expanded="false" aria-controls="site-nav">'+
        '<span class="menu-icon" aria-hidden="true"><i></i><i></i><i></i></span>Menu</button>'+
      '<nav class="nav" id="site-nav" aria-label="Site">'+items+'</nav>'+
    '</div></header>'+subnav);

  // Phone menu: open/close with the button; close on Escape or a tap outside the header
  var head = document.querySelector(".top"), btn = head.querySelector(".menu-btn");
  function setMenu(open){
    head.classList.toggle("menu-open", open);
    btn.setAttribute("aria-expanded", open ? "true" : "false");
  }
  btn.addEventListener("click", function(){ setMenu(!head.classList.contains("menu-open")); });
  document.addEventListener("keydown", function(e){
    if(e.key==="Escape" && head.classList.contains("menu-open")){ setMenu(false); btn.focus(); }
  });
  document.addEventListener("click", function(e){ if(!head.contains(e.target)) setMenu(false); });
  // Close after picking a link (matters for Standings/Players/Leaderboard, which switch views without loading a new page)
  head.querySelector(".nav").addEventListener("click", function(e){ if(e.target.closest("a")) setMenu(false); });

  // Lets a page change which League link is marked (the stats page does this when you switch views)
  window.GNDA = window.GNDA || {};
  // On phones the League row scrolls sideways; keep the marked link in view
  function reveal(){
    var a = document.querySelector('.subnav a[aria-current="page"]'); if(!a) return;
    var row = a.parentNode; row.scrollLeft = a.offsetLeft - (row.clientWidth - a.offsetWidth)/2;
  }
  window.GNDA.setSub = function(key){
    document.querySelectorAll(".subnav a[data-sub], .nav-sub a[data-sub]").forEach(function(a){
      if(a.getAttribute("data-sub")===key) a.setAttribute("aria-current","page"); else a.removeAttribute("aria-current");
    });
    var g = groupOf(key);
    document.querySelectorAll("[data-group]").forEach(function(a){
      if(g && a.getAttribute("data-group")===g.key) a.setAttribute("aria-current","page"); else a.removeAttribute("aria-current");
    });
    document.querySelectorAll(".subnav .pages").forEach(function(r){ r.hidden = !(g && r.getAttribute("data-row")===g.key); });
    reveal();
  };
  reveal();

  // Publish the header's height as --top-h, so the League row (or a page's own bar) can stick just below it
  var top = document.querySelector(".top");
  function setTop(){ document.documentElement.style.setProperty("--top-h", top.offsetHeight+"px"); }
  setTop();
  if(window.ResizeObserver) new ResizeObserver(setTop).observe(top); else window.addEventListener("resize", setTop);

  // The footer goes in once the rest of the page has loaded, so it lands at the bottom.
  function footer(){
    document.body.insertAdjacentHTML("beforeend",
      '<footer><div class="wrap">'+
        '<strong>GNDA</strong>'+
        '<a class="soc" href="'+FACEBOOK+'" rel="noopener"><img class="social" src="'+esc(root)+'assets/facebook.png" width="18" height="18" alt="">Facebook</a>'+
        '<a class="soc" href="'+INSTAGRAM+'" rel="noopener"><img class="social" src="'+esc(root)+'assets/instagram.png" width="18" height="18" alt="">Instagram</a>'+
        '<span>Email <span class="mail">'+EMAIL+'</span></span>'+
      '</div></footer>');
  }
  if(document.readyState==="loading") document.addEventListener("DOMContentLoaded", footer); else footer();
})();
