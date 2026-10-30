// GNDA site header and footer, shared by every page.
// To add or rename a menu item, edit MENU below; every page picks it up.
// League pages also get a second row of links (LEAGUE below), on wider screens only; phones list them in the Menu.
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
    ["League",             "league/index.html",                   "league"],
    ["Store",              "store/index.html",                    "store"],
    ["Venues",             "venues/index.html",                   "venues"],
    ["Music City Classic", "musiccityclassic/index.html",         "mcc"],
    ["About",              "about/index.html",                    "about"]
  ];
  var LEAGUE = [
    // Second row of links on every League page
    ["Overview",    "league/index.html",                 "overview"],
    ["Standings",   "league/stats/index.html#standings", "standings"],
    ["Players",     "league/stats/index.html#players",   "players"],
    ["Leaderboard", "league/stats/index.html#leaders",   "leaders"],
    ["Sub list",    "league/subs/index.html",            "subs"],
    ["Rules",       "league/rules/index.html",           "rules"]
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

  // On phones the menu also lists the League links under League (hidden on wider screens, which use the League row)
  var leagueSub = '<div class="nav-sub">'+LEAGUE.map(function(m){
      return '<a href="'+esc(href(m[1]))+'" data-sub="'+m[2]+'"'+(page==="league" && m[2]===sub?' aria-current="page"':'')+'>'+esc(m[0])+'</a>';
    }).join("")+'</div>';
  var items = MENU.map(function(m){
    if(!m[1]) return '<span title="Coming soon">'+esc(m[0])+'</span>';
    return '<a href="'+esc(href(m[1]))+'"'+(m[2]===page?' aria-current="page"':'')+'>'+esc(m[0])+'</a>'+
      (m[2]==="league" ? leagueSub : '');
  }).join("");

  var subnav = page==="league" ?
    '<nav class="subnav" aria-label="League"><div class="wrap">'+LEAGUE.map(function(m){
      return '<a href="'+esc(href(m[1]))+'" data-sub="'+m[2]+'"'+(m[2]===sub?' aria-current="page"':'')+'>'+esc(m[0])+'</a>';
    }).join("")+'</div></nav>' : '';

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
    document.querySelectorAll(".subnav a, .nav-sub a").forEach(function(a){
      if(a.getAttribute("data-sub")===key) a.setAttribute("aria-current","page"); else a.removeAttribute("aria-current");
    });
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
