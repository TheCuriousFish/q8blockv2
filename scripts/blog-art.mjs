/* Cut the blog WebP derivatives from design/blog-art/<slug>.png.

   NOT part of `node build.mjs`. The build has no dependencies and only COPIES
   src/img/, so nothing here happens on its own — build-spec §18.5.2 A records
   the pass where the derivatives went stale by an hour and the page therefore
   did not change. Re-run this whenever a post is added, renamed, or its
   drawing is replaced, and rebuild afterwards.

   It needs sharp, and this repo has no node_modules, so it is COPIED OUT and
   run from a scratch folder exactly the way compare.mjs and shots.mjs are.
   The repo root is argv[2]:

     cd <scratch> && npm i sharp
     cp <repo>/scripts/blog-art.mjs . && node blog-art.mjs <repo>

   Three outputs per post:
     blog-<slug>.webp       1344x752  post hero
     blog-<slug>-sq.webp     240x240  the 100px list thumbnail
     blog-<slug>-wide.webp  1344x506  the featured panel — blog-B.png draws the
                                      featured art 670.2 x 252.3 css, i.e.
                                      2.657:1, not the source's 1.787:1.
   Both derivatives are cut from the drawing's OWN ink box (difference from the
   corner pixel, which is the orange field) plus a margin, then CONTAINED onto
   that same orange field. Containing rather than cropping matters: five of the
   six drawings are taller than a 2.657:1 frame and four are wider than a
   square, so a crop clips them. Contained, the drawing keeps all of itself and
   the flat field extends around it, which is what blog-B.png draws anyway. */
import sharp from 'sharp';
import fs from 'node:fs';
import path from 'node:path';

const ROOT = process.argv[2];
if (!ROOT || !fs.existsSync(path.join(ROOT, 'design', 'blog-art'))) {
  console.error('usage: node blog-art.mjs <path to the q8block repo>');
  process.exit(1);
}
const ART = path.join(ROOT, 'design', 'blog-art');
const OUT = path.join(ROOT, 'src', 'img');

/* Every post in content/blog/ that has a drawing at design/blog-art/<slug>.png.
   Since the 2026-09-25 rename the two are the same name, so this is just the
   list; build-spec §19.7 records which drawing each slug inherited. Add a slug
   here when you add a post. */
const SLUGS = [
  'complete-guide-to-local-seo',
  'keyword-research-for-local-seo',
  'on-page-seo-basics-for-local-sites',
  'google-business-profile-optimization',
  'measuring-local-seo-success',
  'building-local-citations-that-matter',
];

/* Find the ink box AND flatten the field in one pass.
   The generated PNGs are not a perfectly flat orange — the field drifts a few
   values across the canvas, so filling the extend/contain margin with a single
   sampled colour left a visible rectangular seam around the drawing. So the
   MODAL field colour is taken (not the corner pixel), every pixel within
   tolerance of it is written to exactly that value, and the same value is then
   used for every fill. The field ends up perfectly flat, the way the board
   draws it, and the seam is gone. Anti-aliased edges sit far outside the
   tolerance and are untouched. */
async function prepare(file) {
  const { data, info } = await sharp(file).raw().toBuffer({ resolveWithObject: true });
  const ch = info.channels, W = info.width, Hh = info.height;

  // modal field colour, quantised to 4s, taken from the whole canvas
  const hist = new Map();
  for (let i = 0; i < data.length; i += ch) {
    const k = ((data[i] >> 2) << 16) | ((data[i + 1] >> 2) << 8) | (data[i + 2] >> 2);
    hist.set(k, (hist.get(k) || 0) + 1);
  }
  let bk = 0, bn = -1;
  for (const [k, n] of hist) if (n > bn) { bn = n; bk = k; }
  // exact mean of the pixels in that bucket
  let sr = 0, sg = 0, sb = 0, n = 0;
  for (let i = 0; i < data.length; i += ch) {
    const k = ((data[i] >> 2) << 16) | ((data[i + 1] >> 2) << 8) | (data[i + 2] >> 2);
    if (k === bk) { sr += data[i]; sg += data[i + 1]; sb += data[i + 2]; n++; }
  }
  const bg = [Math.round(sr / n), Math.round(sg / n), Math.round(sb / n)];

  const out = Buffer.alloc(W * Hh * 3);
  let x0 = W, x1 = -1, y0 = Hh, y1 = -1;
  for (let y = 0; y < Hh; y++) for (let x = 0; x < W; x++) {
    const i = (y * W + x) * ch, o = (y * W + x) * 3;
    const d = Math.abs(data[i] - bg[0]) + Math.abs(data[i + 1] - bg[1]) + Math.abs(data[i + 2] - bg[2]);
    if (d <= 45) { out[o] = bg[0]; out[o + 1] = bg[1]; out[o + 2] = bg[2]; }
    else {
      out[o] = data[i]; out[o + 1] = data[i + 1]; out[o + 2] = data[i + 2];
      if (d > 60) { if (x < x0) x0 = x; if (x > x1) x1 = x; if (y < y0) y0 = y; if (y > y1) y1 = y; }
    }
  }
  const flat = sharp(out, { raw: { width: W, height: Hh, channels: 3 } });
  return { x0, y0, x1, y1, w: x1 - x0 + 1, h: y1 - y0 + 1, W, H: Hh, bg, flat: () => sharp(out, { raw: { width: W, height: Hh, channels: 3 } }) };
}

const clamp = (v, lo, hi) => Math.max(lo, Math.min(hi, v));

for (const slug of SLUGS) {
  const src = slug;
  const file = path.join(ART, `${src}.png`);
  const ink = await prepare(file);
  const { W, H, bg } = ink;
  const field = { r: bg[0], g: bg[1], b: bg[2] };

  // 1. native, field flattened
  await ink.flat().webp({ quality: 82 }).toFile(path.join(OUT, `blog-${slug}.webp`));

  // ink box + a 6% margin on each side, clamped to the canvas. Measured on the
  // board, the drawing fills 73-100% of its thumbnail (mean ~89) and 78% of
  // the featured art's height.
  const mx = Math.round(ink.w * 0.06), my = Math.round(ink.h * 0.06);
  const box = { left: clamp(ink.x0 - mx, 0, W - 1), top: clamp(ink.y0 - my, 0, H - 1) };
  box.width = clamp(ink.w + mx * 2, 1, W - box.left);
  box.height = clamp(ink.h + my * 2, 1, H - box.top);

  // 2. square, 240x240, for the 100px list thumbnail
  await ink.flat().extract(box)
    .resize(240, 240, { fit: 'contain', background: field })
    .webp({ quality: 84 }).toFile(path.join(OUT, `blog-${slug}-sq.webp`));

  /* 3. wide 1344x506 (2.657:1). Measured on the board, the featured drawing
        fills 78% of the art block's HEIGHT and 71% of its width, so the
        drawing is scaled by height — scaling it into a square box instead
        left the wider drawings at 59% and the panel read as a small icon
        floating in a lot of orange. Width is capped at 76% so a very wide
        drawing cannot run edge to edge. */
  /* TWO pipelines on purpose. sharp allows ONE resize per pipeline and a
     second .resize() silently REPLACES the first, so scaling the drawing and
     then sizing the canvas in one chain produced 2163x617 files instead of
     1344x506 — the panel rendered a 1:3.5 strip and the art came out 60px
     short. Scale first, write to a buffer, extend in a second pipeline. */
  const WW = 1344, WH = Math.round(WW / 2.657);          // 506
  const dh = Math.round(WH * 0.78);                       // 395
  const dw = Math.min(Math.round(WW * 0.76), Math.round(dh * (box.width / box.height)));
  const drawing = await ink.flat().extract(box)
    .resize(dw, dh, { fit: 'inside', background: field }).png().toBuffer();
  const dm = await sharp(drawing).metadata();
  await sharp(drawing).extend({
      top: Math.round((WH - dm.height) / 2), bottom: WH - dm.height - Math.round((WH - dm.height) / 2),
      left: Math.round((WW - dm.width) / 2), right: WW - dm.width - Math.round((WW - dm.width) / 2),
      background: field,
    })
    .webp({ quality: 82 }).toFile(path.join(OUT, `blog-${slug}-wide.webp`));

  console.log(`${slug.padEnd(38)} <- ${src}\n   ink ${ink.w}x${ink.h}  box ${box.width}x${box.height}  field rgb(${bg.join(',')})`);
}

// drop the six old derivatives
for (const f of fs.readdirSync(OUT)) {
  if (!f.startsWith('blog-')) continue;
  const keep = SLUGS.some((s) => f === `blog-${s}.webp` || f === `blog-${s}-sq.webp` || f === `blog-${s}-wide.webp`);
  if (!keep) { fs.unlinkSync(path.join(OUT, f)); console.log('removed stale', f); }
}
