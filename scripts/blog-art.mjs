/* Cut the blog WebP derivatives from design/blog-art-board/<slug>.png.

   THE SOURCE IS THE APPROVED BOARD. `design/blog-art-board/` holds the six
   tiles cropped out of `design/boards/blog-B.png` itself at the board's native
   2688x1520 — the featured panel (1249x470 board px) and the five list tiles
   (~184x164 each). They are the drawings Ahmad approved, orange field and all.

   `design/blog-art/` holds a SEPARATELY GENERATED set. It is dead. It is kept
   on disk only as a record and nothing in this repo may point at it again.
   The design skill's rule (references/lessons.md): "Photographs in the build
   are cropped out of the approved boards ... Never substitute a different
   photo." Re-generating blog artwork is the mistake this file now prevents;
   build-spec §19.7 records why.

   NOT part of `node build.mjs`. The build has no dependencies and only COPIES
   src/img/, so nothing here happens on its own. Re-run this whenever a post is
   added or renamed, and rebuild afterwards.

   It needs sharp, and this repo has no node_modules, so it is COPIED OUT and
   run from a scratch folder exactly the way compare.mjs and shots.mjs are.
   The repo root is argv[2]:

     cd <scratch> && npm i sharp
     cp <repo>/scripts/blog-art.mjs . && node blog-art.mjs <repo>

   Two outputs per post, plus one manifest:
     blog-<slug>-sq.webp    the board tile VERBATIM, 240x2xx — the board's own
                            crop, not re-cropped and not re-composed, because
                            on the board the orange IS part of the artwork
     blog-<slug>-wide.webp  1440x542 (2.657:1) — the featured panel, the post
                            hero and the og:image. ONE wide frame, not two:
                            2.657:1 is the only art ratio blog-B.png gives, and
                            a second, much taller 1344x752 frame meant blowing
                            a 194px drawing up past 2.5x to fill it.
     src/blog-art.json      every file's intrinsic size, so build.mjs can put a
                            truthful width/height on each tag and CLS stays 0.
                            It lives in src/ and NOT in src/img/, because the
                            build copies everything in src/img/ into the public
                            output and a manifest is not a public asset.

   The tiles are small — 184x164 on the board — and that is the ceiling. The
   wide and hero frames therefore place the drawing on its own flat field
   rather than blowing it up to fill them: 78% of the height on the wide frame
   (the fraction the board itself draws in the featured panel) and 58% on the
   much taller hero frame, which keeps the hero's upscale near 2x. The featured
   crop is a composed panel already, so it is resized, never re-composed. */
import sharp from 'sharp';
import fs from 'node:fs';
import path from 'node:path';

const ROOT = process.argv[2];
if (!ROOT || !fs.existsSync(path.join(ROOT, 'design', 'blog-art-board'))) {
  console.error('usage: node blog-art.mjs <path to the q8block repo>');
  process.exit(1);
}
const ART = path.join(ROOT, 'design', 'blog-art-board');
const OUT = path.join(ROOT, 'src', 'img');

/* Every post in content/blog/. The file name is the slug; build-spec §19.7a
   records which tile of the board each slug is. Add a slug here when you add a
   post — and crop its tile off a board, do not generate one. */
const SLUGS = [
  'complete-guide-to-local-seo',
  'keyword-research-for-local-seo',
  'on-page-seo-basics-for-local-sites',
  'google-business-profile-optimization',
  'measuring-local-seo-success',
  'building-local-citations-that-matter',
];

const WIDE = { w: 1440, h: 542 };   // 2.657:1, the ratio blog-B.png draws
const TILE = { w: 240, h: 214 };    // only for a composed crop; see below
/* Every crop is INSET by 3px on each side before anything is measured or cut.
   The crops end at the board's own tile edge, so their outermost rows carry a
   pixel or two of the panel behind them, and those rows survived the field
   flattening (they sit outside its tolerance) and drew a hairline across the
   top and bottom of every composed frame. */
const INSET = 3;

/* Find the ink box AND flatten the field in one pass. The board crop's orange
   drifts a few values across the tile, so filling an extend margin with a
   single sampled colour would leave a visible rectangular seam. The MODAL
   field colour is taken, every pixel within tolerance is written to exactly
   that value, and the same value fills every margin. Anti-aliased edges sit
   far outside the tolerance and are untouched. */
async function prepare(file) {
  const m0 = await sharp(file).metadata();
  const { data, info } = await sharp(file)
    .extract({ left: INSET, top: INSET, width: m0.width - INSET * 2, height: m0.height - INSET * 2 })
    .raw().toBuffer({ resolveWithObject: true });
  const ch = info.channels, W = info.width, H = info.height;

  const hist = new Map();
  for (let i = 0; i < data.length; i += ch) {
    const k = ((data[i] >> 2) << 16) | ((data[i + 1] >> 2) << 8) | (data[i + 2] >> 2);
    hist.set(k, (hist.get(k) || 0) + 1);
  }
  let bk = 0, bn = -1;
  for (const [k, n] of hist) if (n > bn) { bn = n; bk = k; }
  let sr = 0, sg = 0, sb = 0, n = 0;
  for (let i = 0; i < data.length; i += ch) {
    const k = ((data[i] >> 2) << 16) | ((data[i + 1] >> 2) << 8) | (data[i + 2] >> 2);
    if (k === bk) { sr += data[i]; sg += data[i + 1]; sb += data[i + 2]; n++; }
  }
  const bg = [Math.round(sr / n), Math.round(sg / n), Math.round(sb / n)];

  const out = Buffer.alloc(W * H * 3);
  let x0 = W, x1 = -1, y0 = H, y1 = -1;
  for (let y = 0; y < H; y++) for (let x = 0; x < W; x++) {
    const i = (y * W + x) * ch, o = (y * W + x) * 3;
    const d = Math.abs(data[i] - bg[0]) + Math.abs(data[i + 1] - bg[1]) + Math.abs(data[i + 2] - bg[2]);
    if (d <= 45) { out[o] = bg[0]; out[o + 1] = bg[1]; out[o + 2] = bg[2]; }
    else {
      out[o] = data[i]; out[o + 1] = data[i + 1]; out[o + 2] = data[i + 2];
      if (d > 60) { if (x < x0) x0 = x; if (x > x1) x1 = x; if (y < y0) y0 = y; if (y > y1) y1 = y; }
    }
  }
  return {
    x0, y0, x1, y1, w: x1 - x0 + 1, h: y1 - y0 + 1, W, H, bg,
    /* flattened: every field pixel written to exactly the modal colour, so an
       extend margin in the same colour leaves no seam. Only use it where there
       IS a margin — the flattening tolerance also nibbles the edge of the
       board's darker red circle and leaves speckle behind. */
    flat: () => sharp(out, { raw: { width: W, height: H, channels: 3 } }),
    /* the inset crop exactly as the board drew it */
    raw: () => sharp(file).extract({ left: INSET, top: INSET, width: W, height: H }),
  };
}

const clamp = (v, lo, hi) => Math.max(lo, Math.min(hi, v));

/* Scale a drawing into a frame and fill the rest with the flat field.
   TWO pipelines on purpose. sharp allows ONE resize per pipeline and a second
   .resize() silently REPLACES the first, so scaling the drawing and sizing the
   canvas in one chain produces the wrong output size (build-spec §19.7). */
async function compose(ink, box, frame, fracW, fracH, field) {
  const buf = await ink.flat().extract(box)
    .resize(Math.round(frame.w * fracW), Math.round(frame.h * fracH), { fit: 'inside', background: field })
    .png().toBuffer();
  const m = await sharp(buf).metadata();
  const top = Math.round((frame.h - m.height) / 2), left = Math.round((frame.w - m.width) / 2);
  return sharp(buf).extend({
    top, bottom: frame.h - m.height - top,
    left, right: frame.w - m.width - left,
    background: field,
  });
}

const manifest = {};

for (const slug of SLUGS) {
  const file = path.join(ART, `${slug}.png`);
  if (!fs.existsSync(file)) throw new Error(`no board crop for ${slug} at ${file}`);
  const ink = await prepare(file);
  const { W, H, bg } = ink;
  const field = { r: bg[0], g: bg[1], b: bg[2] };
  /* A crop wider than 2:1 is already a composed panel cut off the board — the
     featured one. It is resized, never re-composed: re-cropping it to its ink
     box would throw away the board's own framing. */
  const composed = W / H >= 2;

  /* 1. the list tile: the board's crop verbatim, only re-encoded. The orange
        field is part of the artwork, so nothing is cropped off it and nothing
        is laid behind it.
        The featured crop is a wide panel and cannot be a tile, so it is
        letterboxed onto its own field at the tile frame. It is never rendered
        while `complete-guide-to-local-seo` holds FEATURED_SLUG — it exists so
        that moving the pin cannot leave a row without a thumbnail. */
  let sq = { w: W, h: H };
  if (composed) {
    sq = { w: TILE.w, h: TILE.h };
    await (await compose(ink, { left: 0, top: 0, width: W, height: H }, TILE, 0.94, 0.94, field))
      .webp({ quality: 88 }).toFile(path.join(OUT, `blog-${slug}-sq.webp`));
  } else {
    await ink.raw().webp({ quality: 88 }).toFile(path.join(OUT, `blog-${slug}-sq.webp`));
  }
  manifest[`blog-${slug}-sq.webp`] = sq;

  // ink box + a 6% margin on each side, clamped to the canvas
  const mx = Math.round(ink.w * 0.06), my = Math.round(ink.h * 0.06);
  const box = { left: clamp(ink.x0 - mx, 0, W - 1), top: clamp(ink.y0 - my, 0, H - 1) };
  box.width = clamp(ink.w + mx * 2, 1, W - box.left);
  box.height = clamp(ink.h + my * 2, 1, H - box.top);

  // 2. the featured panel, 1440x542
  if (composed) {
    await ink.raw().resize(WIDE.w, WIDE.h, { fit: 'fill' }).webp({ quality: 84 })
      .toFile(path.join(OUT, `blog-${slug}-wide.webp`));
  } else {
    await (await compose(ink, box, WIDE, 0.76, 0.78, field))
      .webp({ quality: 84 }).toFile(path.join(OUT, `blog-${slug}-wide.webp`));
  }
  manifest[`blog-${slug}-wide.webp`] = { w: WIDE.w, h: WIDE.h };

  console.log(`${slug.padEnd(38)} crop ${W}x${H}${composed ? ' (composed panel)' : ''}`
    + `  ink ${ink.w}x${ink.h}  field rgb(${bg.join(',')})`);
}

fs.writeFileSync(path.join(ROOT, 'src', 'blog-art.json'), JSON.stringify(manifest, null, 2) + '\n');
console.log('wrote src/blog-art.json');

// drop any derivative that is no longer one of the three per slug
for (const f of fs.readdirSync(OUT)) {
  if (!f.startsWith('blog-')) continue;
  if (!manifest[f]) { fs.unlinkSync(path.join(OUT, f)); console.log('removed stale', f); }
}
