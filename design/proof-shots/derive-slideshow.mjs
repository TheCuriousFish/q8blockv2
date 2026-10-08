/* Run: SHARP_FROM=<scratch>/node_modules node design/proof-shots/derive-slideshow.mjs
   Format conversion only (PNG to WebP at native size). No crop, resize, retouch or recolour:
   the figures in these exports must stay exactly as exported. Sources: ./slideshow/ */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
const HERE = path.dirname(fileURLToPath(import.meta.url));
const sharp = (await import(process.env.SHARP_FROM
  ? pathToFileURL(path.join(process.env.SHARP_FROM, 'sharp', 'dist', 'index.mjs')).href : 'sharp')).default;
const OUT = path.join(HERE, '..', '..', 'src', 'img');
for (const n of ['ss1', 'ss2', 'ss3', 'ss4', 'new1', 'new2']) {
  const out = path.join(OUT, `slide-${n}.webp`);
  await sharp(path.join(HERE, 'slideshow', `${n}.png`)).webp({ quality: 92, effort: 6 }).toFile(out);
  console.log(n, (fs.statSync(out).size / 1024).toFixed(1), 'kB');
}
