/* design/proof-shots/derive.mjs — run from the repo root, pointing at a scratch folder that has `sharp`:
 *     SHARP_FROM=<scratch>/node_modules node design/proof-shots/derive.mjs
 *
 * `sharp` is NOT a repo dependency (build-spec §20, §23 say so for the logo and tool derivations); this
 * script is run against a scratch install the same way. NODE_PATH does not work for ESM, hence the
 * explicit env var and the createRequire below.
 *
 * WHAT THIS DOES, AND WHAT IT MUST NEVER DO.
 * The source in this folder is a real Google Search Console export for a real client property. It is
 * kept byte-for-byte and the derivation is a FORMAT CONVERSION ONLY: PNG -> WebP at the source's own
 * pixel dimensions.
 *
 *   - It is never cropped further. The crop that exists is the one Ahmad supplied.
 *   - It is never retouched, sharpened, recoloured, upscaled or composited.
 *   - No number in it is altered, masked or redrawn. The page's whole argument is that its figures are
 *     checkable, and a figure that has been through an image editor is not.
 *
 * The sha256 of the source is verified before anything is written, so if the file in this folder is ever
 * swapped the run fails loudly instead of silently shipping a different screenshot.
 */
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import { fileURLToPath, pathToFileURL } from 'node:url';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const sharp = (await import(process.env.SHARP_FROM
  ? pathToFileURL(path.join(process.env.SHARP_FROM, 'sharp', 'dist', 'index.mjs')).href
  : 'sharp')).default;
const OUT = path.join(HERE, '..', '..', 'src', 'img');

const SHOTS = [
  {
    file: 'kwtclean-gsc-2026-04-01-to-2026-09-19.png',
    sha256: 'b762c37640d5e1fd213fd287032561dadffb3e93d47fc77a1f12cf2b1ff8d4f1',
    w: 2243,
    h: 582,
    out: 'proof-kwtclean-gsc.webp',
  },
];

let failed = 0;
for (const s of SHOTS) {
  const src = path.join(HERE, s.file);
  const buf = fs.readFileSync(src);
  const sum = crypto.createHash('sha256').update(buf).digest('hex');
  const meta = await sharp(buf).metadata();

  const problems = [];
  if (sum !== s.sha256) problems.push(`sha256 is ${sum}, expected ${s.sha256} — the source changed`);
  if (meta.width !== s.w || meta.height !== s.h) {
    problems.push(`native is ${meta.width}x${meta.height}, expected ${s.w}x${s.h}`);
  }
  if (problems.length) {
    console.error(`!! ${s.file}\n   ${problems.join('\n   ')}`);
    failed++;
    continue;
  }

  // No resize, no crop, no filter. Lossless-ish quality so the small type in the
  // four metric tiles stays readable: a reader has to be able to check the numbers.
  const out = path.join(OUT, s.out);
  await sharp(buf).webp({ quality: 92, effort: 6 }).toFile(out);
  const kb = (fs.statSync(out).size / 1024).toFixed(1);
  console.log(`ok  ${s.file} -> src/img/${s.out}  ${meta.width}x${meta.height}  ${kb} kB`);
}

if (failed) {
  console.error(`\n${failed} source(s) failed verification. Nothing was written for them.`);
  process.exit(1);
}
