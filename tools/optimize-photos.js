/* =====================================================================
   RamFam Builders: photo optimizer (not part of the website; excluded
   from Vercel by .vercelignore). Run from the ramfamv2 folder:

       node tools/optimize-photos.js                  (everything)
       node tools/optimize-photos.js ranch-home hero  (only names containing "ranch-home", plus the hero)

   - Makes <name>-full.(webp|jpg)  : fits within 1600px (lightbox)
           <name>-thumb.(webp|jpg) : fits within 800px  (cards, carousel, grid)
     Photos are never enlarged: smaller sources keep their own size.
   - Makes the hero sizes from heroclear.png: images/hero/hero-<width> (webp + jpg) for 640/1280/1920/2400
     plus the source's own width when it is under 2400 (never enlarged; index.html srcsets must
     list the ones that exist)
   Originals stay in _originals/ (not deployed) and are only read, never changed or copied
   into images/.

   To use full-size originals later: point SOURCE_DIRS at their folder
   (same file names) and run again; every size is regenerated.
   Needs ffmpeg (winget install Gyan.FFmpeg).
   ===================================================================== */
const fs = require("fs");
const path = require("path");
const { execFileSync } = require("child_process");

const SITE = path.resolve(__dirname, "..");
// looked up in order; first folder that has the file wins
const SOURCE_DIRS = [path.join(SITE, "_originals"), SITE, "C:/Users/Jaky Soza/Downloads"];
const FFMPEG = process.env.FFMPEG ||
  "C:/Users/Jaky Soza/AppData/Local/Microsoft/WinGet/Packages/Gyan.FFmpeg_Microsoft.Winget.Source_8wekyb3d8bbwe/ffmpeg-8.1.2-full_build/bin/ffmpeg.exe";

// original file name -> clean, URL-safe name (lowercase, no spaces or periods)
const PHOTOS = {};
["8659", "8671", "8689", "8691", "8692", "8696", "8711", "8719"].forEach(n => PHOTOS[`0P7A${n}.jpg`] = `project-${n}`);
["06", "08", "09", "11", "12", "14", "15", "17", "18", "20", "25", "26", "30", "31", "34", "37", "45", "51", "58", "61", "63"]
  .forEach(n => PHOTOS[`161 Heron Dr. Havelock-${n}.jpg`] = `havelock-home-${n}`);
["8322277747808902329", "1000122119", "2135329255709405975", "3823369407361073406", "3927392219399870220", "8005751767233815085"]
  .forEach((n, k) => PHOTOS[`${n}.jpeg`] = `septic-0${k + 1}`);
// blue-gray ranch home (exteriors image3/4 are PNG)
["2", "3", "4", "6", "9", "10", "11", "12", "13", "14", "15", "16"]
  .forEach(n => PHOTOS[`image${n}.${n === "3" || n === "4" ? "png" : "jpeg"}`] = `ranch-home-${n.padStart(2, "0")}`);

// optional filters from the command line (see the top)
const ONLY = process.argv.slice(2);
const want = name => !ONLY.length || ONLY.some(o => name.includes(o));

const OUT = path.join(SITE, "images", "gallery");
const HERO_OUT = path.join(SITE, "images", "hero");
fs.mkdirSync(OUT, { recursive: true });
fs.mkdirSync(HERO_OUT, { recursive: true });

const ff = args => execFileSync(FFMPEG, ["-hide_banner", "-loglevel", "error", "-y", ...args]);
const fit = max => `scale='min(${max},iw)':'min(${max},ih)':force_original_aspect_ratio=decrease:flags=lanczos`;
function jpegSize(file) {
  const b = fs.readFileSync(file); let i = 2;
  if (b[0] === 0x89) return [b.readUInt32BE(16), b.readUInt32BE(20)];   // PNG
  while (i < b.length) {
    if (b[i] !== 0xFF) { i++; continue; }
    const m = b[i + 1];
    if (m >= 0xC0 && m <= 0xCF && m !== 0xC4 && m !== 0xC8 && m !== 0xCC) return [b.readUInt16BE(i + 7), b.readUInt16BE(i + 5)];
    i += 2 + b.readUInt16BE(i + 2);
  }
}
function variants(src, base, max) {
  ff(["-i", src, "-vf", `${fit(max)},format=yuvj420p`, "-q:v", "4", `${base}.jpg`]);            // ~quality 80
  ff(["-i", src, "-vf", fit(max), "-c:v", "libwebp", "-quality", "80", "-compression_level", "6", `${base}.webp`]);
}

let inBytes = 0, outBytes = 0;
const report = [];
for (const [orig, name] of Object.entries(PHOTOS)) {
  if (!want(name)) continue;
  const dir = SOURCE_DIRS.find(d => fs.existsSync(path.join(d, orig)));
  if (!dir) { console.warn("MISSING:", orig); continue; }
  const src = path.join(dir, orig);
  inBytes += fs.statSync(src).size;
  variants(src, path.join(OUT, `${name}-full`), 1600);
  variants(src, path.join(OUT, `${name}-thumb`), 800);
  const sizes = ["-full.jpg", "-full.webp", "-thumb.jpg", "-thumb.webp"].map(s => fs.statSync(path.join(OUT, name + s)).size);
  outBytes += sizes.reduce((a, b) => a + b, 0);
  const [w, h] = jpegSize(path.join(OUT, `${name}-full.jpg`));
  report.push({ name, from: path.relative(SITE, src) || src, w, h, sizes });
}

// hero
const heroSrc = SOURCE_DIRS.map(d => path.join(d, "heroclear.png")).find(f => fs.existsSync(f));
if (heroSrc && want("hero")) {
  const srcW = jpegSize(heroSrc)[0];
  const widths = [640, 1280, 1920, 2400].filter(w => w < srcW);
  if (srcW < 2400) widths.push(srcW);
  for (const w of widths) {   // -q:v 3 / WebP 84: a little above the gallery's 80 so the big photo stays crisp
    ff(["-i", heroSrc, "-vf", `scale=${w}:-2:flags=lanczos,format=yuvj420p`, "-q:v", "3", path.join(HERO_OUT, `hero-${w}.jpg`)]);
    ff(["-i", heroSrc, "-vf", `scale=${w}:-2:flags=lanczos`, "-c:v", "libwebp", "-quality", "84", "-compression_level", "6", path.join(HERO_OUT, `hero-${w}.webp`)]);
  }
}

console.log(JSON.stringify({ photos: report.length, originalsKB: Math.round(inBytes / 1024), optimizedKB: Math.round(outBytes / 1024) }));
report.forEach(r => console.log(r.name.padEnd(18), `${r.w}x${r.h}`.padEnd(9), r.sizes.map(s => Math.round(s / 1024) + "KB").join(" / "), " <- ", r.from));
for (const f of fs.readdirSync(HERO_OUT)) {
  const p = path.join(HERO_OUT, f);
  console.log("hero", f.padEnd(15), Math.round(fs.statSync(p).size / 1024) + "KB", f.endsWith(".jpg") ? jpegSize(p).join("x") : "");
}
