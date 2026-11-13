/* =====================================================================
   RAMFAM BUILDERS: SYNC THE NAV ON EVERY PAGE
   ---------------------------------------------------------------------
   Every page is self-contained (its own CSS + JS), so the header nav, the
   mobile menu, the footer links and the Services dropdown styles/script
   are copied into each one. Edit them HERE, then run from the ramfamv2 folder:

       node tools/sync-nav.js

   It rewrites, in each page listed in PAGES:
     - <nav class="main-nav">          desktop nav + Services dropdown
     - <nav aria-label="Mobile">       links inside the full-screen phone menu
     - footer "Explore" + "Services" link lists
     - the NAV DROPDOWN css block (before </style>) and script (before </body>)
   Safe to run again and again: each block is replaced, never duplicated.
   ===================================================================== */
const fs = require("fs");
const path = require("path");
const ROOT = path.join(__dirname, "..");

/* Services: one line each. Shown in the dropdown, the phone menu and the footer. */
const SERVICES = [
  { slug: "custom-homes", name: "Custom Homes",                   blurb: "Design + build, start to finish" },
  { slug: "concrete",     name: "Concrete",                       blurb: "Driveways, slabs, patios, foundations" },
  { slug: "septic",       name: "Septic Installation &amp; Repair", blurb: "New systems, diagnosis and fixes" },
];
const svcFile = s => `service-${s.slug}.html`;

/* page file → which nav item is "current" (service pages also name their service) */
const PAGES = {
  "index.html":    { current: "home" },
  "services.html": { current: "services" },
  "gallery.html":  { current: "gallery" },
  "story.html":    { current: "story" },
  "reviews.html":  { current: "reviews" },
  "privacy.html":  { current: null },
};
SERVICES.forEach(s => { PAGES[svcFile(s)] = { current: "services", service: s.slug }; });

function build(file, cfg) {
  const home = file === "index.html";
  const contact = home ? "#contact" : "index.html#contact";
  const cur = key => (cfg.current === key ? ' aria-current="page"' : "");
  // the Services parent is "current" on services.html (the page itself) and on each service page (a section of it)
  const svcParentCur = cfg.current === "services" ? (cfg.service ? ' aria-current="true"' : ' aria-current="page"') : "";
  const svcCur = s => (cfg.service === s.slug ? ' aria-current="page"' : "");
  const homeHref = home ? "#top" : "index.html";
  const onServices = cfg.current === "services";

  const mainNav =
`<nav class="main-nav" aria-label="Primary">
      <ul>
        <li><a href="${homeHref}"${cur("home")}>Home</a></li>
        <li class="nav-dd">
          <a class="nav-dd-link" href="services.html" aria-expanded="false" aria-controls="nav-dd-services"${svcParentCur}>Services<svg class="nav-caret" viewBox="0 0 24 24" aria-hidden="true"><path d="m6 9 6 6 6-6"/></svg></a>
          <div class="nav-dd-panel" id="nav-dd-services">
            <ul>
${SERVICES.map(s => `              <li><a href="${svcFile(s)}"${svcCur(s)}><strong>${s.name}</strong><span>${s.blurb}</span></a></li>`).join("\n")}
              <li class="nav-dd-all"><a href="services.html"><strong>All Services</strong><svg aria-hidden="true"><use href="#i-arrow"/></svg></a></li>
            </ul>
          </div>
        </li>
        <li><a href="gallery.html"${cur("gallery")}>Gallery</a></li>
        <li><a href="story.html"${cur("story")}>Our Story</a></li>
        <li><a href="reviews.html"${cur("reviews")}>Reviews</a></li>
      </ul>
    </nav>`;

  const mobileNav =
`<nav aria-label="Mobile">
    <ul>
      <li><a href="${homeHref}"${cur("home")}>Home</a></li>
      <li class="m-dd${onServices ? " is-open" : ""}">
        <button class="m-dd-toggle" type="button" aria-expanded="${onServices}" aria-controls="m-dd-services"${svcParentCur ? ' data-current' : ""}>Services<span class="m-dd-icon" aria-hidden="true"></span></button>
        <div class="m-dd-panel" id="m-dd-services">
          <ul>
            <li><a href="services.html"${cfg.current === "services" && !cfg.service ? ' aria-current="page"' : ""}>All Services</a></li>
${SERVICES.map(s => `            <li><a href="${svcFile(s)}"${svcCur(s)}>${s.name}</a></li>`).join("\n")}
          </ul>
        </div>
      </li>
      <li><a href="gallery.html"${cur("gallery")}>Gallery</a></li>
      <li><a href="story.html"${cur("story")}>Our Story</a></li>
      <li><a href="reviews.html"${cur("reviews")}>Reviews</a></li>
      <li><a href="${contact}">Contact</a></li>
    </ul>
  </nav>`;

  const footerNav =
`<nav aria-label="Footer">
        <h3>Explore</h3>
        <ul>
          <li><a href="${homeHref}"${cur("home")}>Home</a></li>
          <li><a href="services.html"${cfg.current === "services" && !cfg.service ? ' aria-current="page"' : ""}>Services</a></li>
          <li><a href="gallery.html"${cur("gallery")}>Gallery</a></li>
          <li><a href="story.html"${cur("story")}>Our Story</a></li>
          <li><a href="reviews.html"${cur("reviews")}>Reviews</a></li>
          <li><a href="${contact}">Free Estimate</a></li>
        </ul>
      </nav>
      <div>
        <h3>Services</h3>
        <ul>
${SERVICES.map(s => `          <li><a href="${svcFile(s)}"${svcCur(s)}>${s.name}</a></li>`).join("\n")}
        </ul>
      </div>`;

  return { mainNav, mobileNav, footerNav, contact };
}

const CSS = `/* ===== NAV DROPDOWN (synced by tools/sync-nav.js; edit it there) ===== */
/* current page in the nav */
.menu-overlay a[aria-current="page"],.m-dd-toggle[data-current]{color:var(--gold-light)}
/* phone menu: "Services" expands its list in place */
.m-dd-toggle{display:flex;align-items:center;justify-content:space-between;width:100%;min-height:60px;padding:0;margin:0;background:none;border:0;border-bottom:1px solid rgba(255,255,255,.1);color:inherit;font-family:var(--serif);font-size:clamp(1.8rem,7vw,2.4rem);font-weight:500;line-height:1.2;text-align:left;cursor:pointer}
@media (hover:hover){ .m-dd-toggle:hover{color:var(--gold-light)} }
.m-dd-icon{width:8px;height:8px;margin-right:2px;border-top:1.5px solid var(--gold);border-right:1.5px solid var(--gold);transform:rotate(135deg);transition:transform .3s ease}
.m-dd.is-open .m-dd-icon{transform:rotate(-45deg)}
.m-dd-panel{display:grid;grid-template-rows:0fr;visibility:hidden;transition:grid-template-rows .3s ease,visibility 0s linear .3s}
.m-dd.is-open .m-dd-panel{grid-template-rows:1fr;visibility:visible;transition-delay:0s}
.menu-overlay .m-dd-panel ul{min-height:0;overflow:hidden;margin:0;padding:0 0 0 18px;border-left:2px solid rgba(201,162,74,.45)}
.menu-overlay .m-dd-panel li a{min-height:52px;font-family:var(--sans);font-size:1.08rem;font-weight:500;color:rgba(255,255,255,.88)}
.menu-overlay .m-dd-panel li a::after{width:6px;height:6px}
.menu-overlay .m-dd-panel li a[aria-current="page"]{color:var(--gold-light)}
@media (min-width:1024px){
  /* desktop: current page keeps its gold underline */
  .main-nav a[aria-current]{color:var(--charcoal-deep);font-weight:600}
  .main-nav a[aria-current]::after{transform:scaleX(1)}
  /* Services dropdown: opens on hover or keyboard focus, closes with Esc */
  .nav-dd{position:relative}
  .nav-caret{width:14px;height:14px;margin-left:4px;fill:none;stroke:currentColor;stroke-width:2;stroke-linecap:round;stroke-linejoin:round;transition:transform .25s ease}
  .nav-dd:hover .nav-caret,.nav-dd:focus-within .nav-caret{transform:rotate(180deg)}
  .nav-dd-panel{position:absolute;z-index:210;top:100%;left:50%;width:300px;padding-top:calc((var(--header-h) - 44px) / 2);opacity:0;visibility:hidden;transform:translate(-50%,8px);transition:opacity .22s ease,transform .22s ease,visibility 0s linear .22s}
  .nav-dd:hover .nav-dd-panel,.nav-dd:focus-within .nav-dd-panel{opacity:1;visibility:visible;transform:translate(-50%,0);transition-delay:0s}
  .nav-dd.is-dismissed .nav-dd-panel{opacity:0;visibility:hidden;transform:translate(-50%,8px)}
  .nav-dd.is-dismissed .nav-caret{transform:none}
  .main-nav .nav-dd-panel ul{display:block;margin:0;padding:8px;list-style:none;background:var(--charcoal-deep);border-top:2px solid var(--gold);border-radius:0 0 var(--radius) var(--radius);box-shadow:0 22px 44px -16px rgba(33,31,29,.5)}
  .main-nav .nav-dd-panel a{display:flex;flex-direction:column;align-items:flex-start;gap:2px;min-height:0;padding:11px 14px;border-radius:6px;color:#fff;white-space:normal;transition:background-color .2s}
  .main-nav .nav-dd-panel a::after{display:none}
  .nav-dd-panel strong{font-family:var(--serif);font-size:1.22rem;font-weight:600;line-height:1.15}
  .nav-dd-panel span{font-size:.8rem;line-height:1.35;color:rgba(255,255,255,.66)}
  .main-nav .nav-dd-panel a:hover,.main-nav .nav-dd-panel a:focus-visible{background:rgba(201,162,74,.16)}
  .main-nav .nav-dd-panel a:hover strong,.main-nav .nav-dd-panel a:focus-visible strong,.main-nav .nav-dd-panel a[aria-current] strong{color:var(--gold-light)}
  .main-nav .nav-dd-panel a:focus-visible{outline-offset:-3px}
  .main-nav .nav-dd-all{margin-top:6px;padding-top:6px;border-top:1px solid rgba(255,255,255,.12)}
  .main-nav .nav-dd-all a{flex-direction:row;align-items:center;gap:8px}
  .main-nav .nav-dd-all strong{font-family:var(--sans);font-size:.85rem;letter-spacing:.06em;text-transform:uppercase;color:var(--gold-light)}
  .main-nav .nav-dd-all svg{width:16px;height:16px;color:var(--gold);transition:transform .2s}
  .main-nav .nav-dd-all a:hover svg{transform:translateX(3px)}
}
@media (prefers-reduced-motion:reduce){ .nav-dd-panel,.m-dd-panel{transition:none !important} }
/* ===== END NAV DROPDOWN ===== */
`;

const JS = `<!-- NAV DROPDOWN (synced by tools/sync-nav.js; edit it there) -->
<script>
(function () {
  /* desktop Services dropdown: CSS opens it on hover/focus; this keeps aria-expanded in sync,
     lets Esc close it, and ArrowDown on "Services" jumps into the list */
  document.querySelectorAll(".nav-dd").forEach(function (dd) {
    var link = dd.querySelector(".nav-dd-link"), items = dd.querySelectorAll(".nav-dd-panel a");
    function sync() {
      var open = !dd.classList.contains("is-dismissed") && (dd.matches(":hover") || dd.contains(document.activeElement));
      link.setAttribute("aria-expanded", String(open));
    }
    dd.addEventListener("mouseenter", sync);
    dd.addEventListener("mouseleave", function () { if (!dd.contains(document.activeElement)) dd.classList.remove("is-dismissed"); sync(); });
    dd.addEventListener("focusin", sync);
    dd.addEventListener("focusout", function () { setTimeout(function () { if (!dd.contains(document.activeElement)) dd.classList.remove("is-dismissed"); sync(); }); });
    dd.addEventListener("keydown", function (e) {
      var list = Array.prototype.slice.call(items), i = list.indexOf(document.activeElement);
      if (e.key === "Escape") { dd.classList.add("is-dismissed"); link.focus(); sync(); }
      else if (e.key === "ArrowDown") { e.preventDefault(); dd.classList.remove("is-dismissed"); (list[i + 1] || list[0]).focus(); }
      else if (e.key === "ArrowUp" && i >= 0) { e.preventDefault(); (i > 0 ? list[i - 1] : link).focus(); }
    });
  });
  /* phone menu: tapping "Services" expands / collapses its list */
  document.querySelectorAll(".m-dd-toggle").forEach(function (btn) {
    var li = btn.parentNode;
    btn.addEventListener("click", function () {
      var open = !li.classList.contains("is-open");
      li.classList.toggle("is-open", open);
      btn.setAttribute("aria-expanded", String(open));
    });
  });
})();
</script>
<!-- END NAV DROPDOWN -->
`;

function replaceOnce(src, re, value, what, file) {
  if (!re.test(src)) throw new Error(`${file}: could not find ${what}`);
  return src.replace(re, () => value);
}

let changed = 0;
for (const [file, cfg] of Object.entries(PAGES)) {
  const p = path.join(ROOT, file);
  if (!fs.existsSync(p)) { console.warn("skip (missing): " + file); continue; }
  let s = fs.readFileSync(p, "utf8");
  const before = s;
  const b = build(file, cfg);
  s = replaceOnce(s, /<nav class="main-nav" aria-label="Primary">[\s\S]*?<\/nav>/, b.mainNav, "main nav", file);
  s = replaceOnce(s, /<nav aria-label="Mobile">[\s\S]*?<\/nav>/, b.mobileNav, "mobile nav", file);
  s = replaceOnce(s, /<nav aria-label="Footer">[\s\S]*?<\/nav>\s*<div>\s*<h3>Services<\/h3>[\s\S]*?<\/div>/, b.footerNav, "footer links", file);
  // header + phone-menu quote buttons point at the form
  s = s.replace(/(<a class="btn btn--charcoal btn--sm" href=")[^"]*(">Contact Us<\/a>)/, `$1${b.contact}$2`);
  s = s.replace(/(<a class="btn btn--gold" href=")[^"]*(">Get a Free Estimate<\/a>\s*<a class="btn btn--ghost")/, `$1${b.contact}$2`);
  // css + js blocks
  s = s.replace(/\/\* ===== NAV DROPDOWN[\s\S]*?\/\* ===== END NAV DROPDOWN ===== \*\/\n/, "");
  s = replaceOnce(s, /<\/style>/, CSS + "</style>", "</style>", file);
  s = s.replace(/<!-- NAV DROPDOWN[\s\S]*?<!-- END NAV DROPDOWN -->\n/, "");
  s = replaceOnce(s, /<\/body>/, JS + "</body>", "</body>", file);
  if (s !== before) { fs.writeFileSync(p, s); changed++; console.log("updated " + file); }
  else console.log("unchanged " + file);
}
console.log(changed + " page(s) updated");
