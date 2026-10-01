/* Derive a §7 card plate from a brand lockup in design/client-logos/.

     cd <scratch> && npm i sharp
     node clients/q8block/scripts/logo-plate.mjs --check     prove it first
     node clients/q8block/scripts/logo-plate.mjs             derive

   build-spec §20.2 / §22.3 describe this derivation but no script survived the
   first two passes, so it was rewritten in §28.4 and REVERSE ENGINEERED against
   three already-shipped plates until it reproduced §22.3's table exactly, to
   the kilobyte. Run --check before trusting any change to this file.

   THE RULE §22.3 DOES NOT SPELL OUT, and the one that got it wrong first time:
   the 7% re-pad is ONE value for all four sides, computed from the LARGER ink
   dimension, each side still capped by what was actually trimmed off it. Not
   7% of each axis separately — that is the obvious reading and it comes out
   ~30px short on the vertical every time.

   The rest, in order: trim against the source's own corner colour (tolerance
   12), re-pad as above, scale by EQUAL OPTICAL AREA k = sqrt(0.44 * 640 * 334
   / inkArea) clamped to 614x307, centre on the shared 640x334 transparent
   canvas, WebP q86 / alphaQuality 100 / effort 6. Equal AREA, never a bounding
   box fit: a box fit puts a square mark at 307 tall beside a 3.4:1 wordmark at
   167 and reads as twice the logo. One canvas for all of them, so the same
   explicit width/height covers every card and no logo can move the layout. */
import { createRequire } from 'node:module';
import path from 'node:path';
import fs from 'node:fs';

/* sharp is resolved from the CURRENT WORKING DIRECTORY, not from this file. A
   bare `import sharp` resolves against clients/q8block/node_modules and up,
   which is empty, so the documented workflow (npm i sharp in a scratch folder,
   then run this path) would die on the import line. shots.mjs and compare.mjs
   have the same latent problem; this one does not. */
const sharp = createRequire(path.join(process.cwd(), 'x.js'))('sharp');


const HERE = path.dirname(new URL(import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, '$1'));
const SRC = path.join(HERE, '..', 'design', 'client-logos');
const OUT = path.join(HERE, '..', 'src', 'img');
const CW = 640, CH = 334, COVER = 0.44, MAXW = 614, MAXH = 307, TOL = 12, PAD = 0.07;

async function derive(srcFile, outSlug, write) {
  const img = sharp(path.join(SRC, srcFile));
  const meta = await img.metadata();
  const { data, info } = await img.clone().ensureAlpha().raw().toBuffer({ resolveWithObject: true });
  const W = info.width, H = info.height, C = info.channels;
  const at = (x, y) => { const o = (y * W + x) * C; return [data[o], data[o + 1], data[o + 2], data[o + 3]]; };

  // The source's OWN corner colour, averaged over the four corners so one
  // stray pixel cannot define the ground.
  const corners = [at(0, 0), at(W - 1, 0), at(0, H - 1), at(W - 1, H - 1)];
  const ground = [0, 1, 2].map((i) => Math.round(corners.reduce((a, c) => a + c[i], 0) / 4));
  const transparentSrc = info.channels === 4 && corners.every((c) => c[3] < 8);

  let x0 = W, y0 = H, x1 = -1, y1 = -1;
  for (let y = 0; y < H; y++) {
    for (let x = 0; x < W; x++) {
      const p = at(x, y);
      const ink = transparentSrc
        ? p[3] > 8
        : Math.max(Math.abs(p[0] - ground[0]), Math.abs(p[1] - ground[1]), Math.abs(p[2] - ground[2])) > TOL;
      if (ink) { if (x < x0) x0 = x; if (x > x1) x1 = x; if (y < y0) y0 = y; if (y > y1) y1 = y; }
    }
  }
  if (x1 < 0) throw new Error('no ink found in ' + srcFile);

  // Re-pad in the ground colour, up to 7%, never more than was trimmed off that side.
  const iw = x1 - x0 + 1, ih = y1 - y0 + 1;
  // ONE pad value for all four sides, 7% of the LARGER ink dimension, each
  // side capped by what was actually trimmed off it. Reverse engineered from
  // the shipped plates and verified to reproduce build-spec �22.3 exactly.
  const padX = Math.round(Math.max(iw, ih) * PAD), padY = padX;
  const L = Math.min(padX, x0), R = Math.min(padX, W - 1 - x1);
  const T = Math.min(padY, y0), B = Math.min(padY, H - 1 - y1);
  const bx = x0 - L, by = y0 - T, bw = iw + L + R, bh = ih + T + B;

  const k = Math.min(
    Math.sqrt((COVER * CW * CH) / (bw * bh)),
    MAXW / bw,
    MAXH / bh,
  );
  const rw = Math.round(bw * k), rh = Math.round(bh * k);

  const tile = await sharp(path.join(SRC, srcFile))
    .extract({ left: bx, top: by, width: bw, height: bh })
    .resize(rw, rh, { fit: 'fill', kernel: 'lanczos3' })
    .png().toBuffer();

  const out = await sharp({ create: { width: CW, height: CH, channels: 4, background: { r: 0, g: 0, b: 0, alpha: 0 } } })
    .composite([{ input: tile, left: Math.round((CW - rw) / 2), top: Math.round((CH - rh) / 2) }])
    .webp({ quality: 86, alphaQuality: 100, effort: 6 })
    .toBuffer();

  if (write) fs.writeFileSync(path.join(OUT, `logo-${outSlug}.webp`), out);
  console.log(
    `${srcFile.padEnd(28)} src ${meta.width}x${meta.height}  ink ${bw}x${bh}` +
    `  ratio ${(bw / bh).toFixed(2)}  placed ${rw}x${rh}  ${(out.length / 1024).toFixed(1)} kB` +
    (write ? '  -> ' + `logo-${outSlug}.webp` : '  (check only, not written)'),
  );
}

/* --check re-derives three plates that already shipped and prints their
   numbers, so a change to this file can be compared against build-spec §22.3
   before it is used on anything new. It writes nothing. */
if (process.argv[2] === '--check') {
  await derive('v2-carwashkw.com.png', 'carwashkw', false);   // §22.3: 1024x847 -> 337x279, 13.5 kB
  await derive('v2-kwtclean.com.png', 'kwtclean', false);     // §22.3: 1024x889 -> 329x286,  9.4 kB
  await derive('v2-ragwaclean.com.png', 'ragwaclean', false); // §22.3:  970x754 -> 348x270, 10.4 kB
} else {
  // The §28.4 pass. Edit this list for the next one; every plate in src/img is
  // reproducible from design/client-logos by running the matching line.
  await derive('v2-alamana-kw.com.png', 'alamana-kw', true);
  await derive('v2-tasleekq8.com.png', 'tasleekq8', true);
  await derive('v2-skyscraperkw.com.png', 'skyscraperkw', true);
  await derive('v2-mashame3.com.png', 'mashame3', true);
}
