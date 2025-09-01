// ========== DATA ==========
const IMAGES = [
  { src: "https://picsum.photos/seed/forest/1000/750",   alt: "Forest in mist",        caption: "Misty Forest",     favorite: true  },
  { src: "https://picsum.photos/seed/mountain/1000/750", alt: "Mountain at sunrise",   caption: "Alpenglow Peak",   favorite: false },
  { src: "https://picsum.photos/seed/lake/1000/750",     alt: "Lake reflections",      caption: "Mirror Lake",      favorite: true  },
  { src: "https://picsum.photos/seed/city/1000/750",     alt: "City skyline",          caption: "Evening Skyline",  favorite: false },
  { src: "https://picsum.photos/seed/road/1000/750",     alt: "Road through fields",   caption: "Open Road",        favorite: false },
  { src: "https://picsum.photos/seed/beach/1000/750",    alt: "Beach and sea",         caption: "Quiet Beach",      favorite: true  },
  { src: "https://picsum.photos/seed/bridge/1000/750",   alt: "Bridge over water",     caption: "Old Bridge",       favorite: false },
  { src: "https://picsum.photos/seed/desert/1000/750",   alt: "Desert dunes",          caption: "Golden Dunes",     favorite: true  },
];

const DESCRIPTIONS = {
  "https://picsum.photos/seed/forest/1000/750":
    "A foggy morning among tall pines. The soft mist wraps the trees and dampens sound — a calm, quiet forest mood.",
  "https://picsum.photos/seed/mountain/1000/750":
    "First light catching a high peak. The warm alpenglow contrasts with the cool shadows below.",
  "https://picsum.photos/seed/lake/1000/750":
    "A glass-still lake reflecting the sky and shoreline, creating a perfect mirror image.",
  "https://picsum.photos/seed/city/1000/750":
    "City skyline at dusk — windows start to glow as the last daylight fades.",
  "https://picsum.photos/seed/road/1000/750":
    "A single road stretches through open fields. Simple composition that feels like a journey beginning.",
  "https://picsum.photos/seed/beach/1000/750":
    "A quiet shoreline with gentle waves. Minimal, relaxing, and a bit nostalgic.",
  "https://picsum.photos/seed/bridge/1000/750":
    "An old bridge spanning a river. Strong leading lines draw the eye across the frame.",
  "https://picsum.photos/seed/desert/1000/750":
    "Golden dunes shaped by wind. Curves and shadows create a natural pattern."
};

// ========== STATE ==========
let showFavoritesOnly = false;
let theme = "light";
let currentIndex = 0;
let searchQuery = "";

// ========== DOM ==========
const galleryEl   = document.getElementById("gallery");
const favToggle   = document.getElementById("favToggle");
const modeBtn     = document.getElementById("modeBtn");
const countBadge  = document.getElementById("countBadge");
const navToggle   = document.getElementById("navToggle");
const navMenu     = document.getElementById("navMenu");
const searchBtn   = document.getElementById("searchBtn");
const searchInput = document.getElementById("searchInput");

// Lightbox variables (injected later)
let lbRoot, lbViewer, lbImg, lbCaption, lbInfo, lbDims, lbFav, lbOpen, lbPrev, lbNext, lbClose;

// ========== LIGHTBOX (styles + DOM injected) ==========
function injectLightboxStyles() {
  if (document.getElementById("pg-lightbox-styles")) return;
  const css = `
  .pg-hidden{display:none!important}
  .pg-lightbox{position:fixed;inset:0;z-index:9999;display:grid;place-items:center;padding:24px;background:rgba(0,0,0,.55)}
  .pg-viewer{background:#0f172a;color:#e5e7eb;width:min(1000px,95vw);max-height:90vh;border-radius:16px;overflow:hidden;display:grid;grid-template-columns:2fr 1fr;box-shadow:0 10px 30px rgba(0,0,0,.35);border:1px solid rgba(255,255,255,.06);position:relative}
  .pg-left{background:#000;display:grid;place-items:center;min-height:320px}
  .pg-left img{max-width:100%;max-height:80vh;object-fit:contain;background:#000;display:block}
  .pg-right{padding:16px;display:grid;gap:10px;align-content:start}
  .pg-title{margin:0;font-size:1.1rem}
  .pg-desc{margin:0;color:#aab4c3;white-space:pre-wrap}
  .pg-dl{display:grid;gap:6px;margin:6px 0}
  .pg-dl dt{font-size:.85rem;color:#94a3b8}
  .pg-dl dd{margin:0;font-weight:700}
  .pg-actions .pg-btn{display:inline-block}
  .pg-btn{border:1px solid rgba(255,255,255,.14);background:rgba(255,255,255,.06);color:#e5e7eb;padding:.55rem .8rem;border-radius:10px;cursor:pointer;transition:transform .06s ease,background .2s ease}
  .pg-btn:hover{transform:translateY(-
