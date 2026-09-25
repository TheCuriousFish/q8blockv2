/* Hero credentials strip: derive the four tool logos into ONE muted set. */
import sharp from 'sharp';
import fs from 'node:fs';
import path from 'node:path';

const RAW = process.argv[2];
const OUT = process.argv[3];
const SCALE = 3;
const TONE = { r: 0x6E, g: 0x74, b: 0x7E };

const PICKS = [
  { slug: 'semrush',     file: 'semrush-827723.png',       h: 22, mode: 'key-white' },
  { slug: 'ahrefs',      file: 'ahrefs-logo-blue-big.svg', h: 17, mode: 'flat' },
  { slug: 'ubersuggest', file: 'ubersuggest-logo.svg',     h: 15, mode: 'flat' },
  { slug: 'gsc',         file: 'gsc-logo.svg',             h: 16, mode: 'grey' },
];

const raster = (f) => /\.svg$/i.test(f)
  ? sharp(fs.readFileSync(f), { density: 900 }).png().toBuffer()
  : sharp(fs.readFileSync(f)).png().toBuffer();

/* one flat ink, shaped by a coverage mask */
async function inkFromAlpha(mask, w, h) {
  const rgba = Buffer.alloc(w * h * 4);
  for (let j = 0; j < w * h; j++) {
    rgba[j * 4] = TONE.r; rgba[j * 4 + 1] = TONE.g; rgba[j * 4 + 2] = TONE.b; rgba[j * 4 + 3] = mask[j];
  }
  return sharp(rgba, { raw: { width: w, height: h, channels: 4 } }).png().toBuffer();
}

const rows = [];
for (const p of PICKS) {
  let buf = await raster(path.join(RAW, p.file));

  if (p.mode === 'key-white') {
    const { data, info } = await sharp(buf).flatten({ background: '#ffffff' })
      .grayscale().raw().toBuffer({ resolveWithObject: true });
    const a = Buffer.alloc(info.width * info.height);
    for (let i = 0, j = 0; i < data.length; i += info.channels, j++) a[j] = 255 - data[i];
    buf = await inkFromAlpha(a, info.width, info.height);
  }

  if (p.mode === 'flat') {
    const { data, info } = await sharp(buf).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
    const a = Buffer.alloc(info.width * info.height);
    for (let i = 0, j = 0; i < data.length; i += 4, j++) a[j] = data[i + 3];
    buf = await inkFromAlpha(a, info.width, info.height);
  }

  if (p.mode === 'grey') {
    const grey = await sharp(buf).grayscale().toBuffer();
    const { data, info } = await sharp(grey).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
    const hist = new Array(256).fill(0); let n = 0;
    for (let i = 0; i < data.length; i += info.channels) {
      if (data[i + info.channels - 1] > 128) { hist[data[i]]++; n++; }
    }
    let acc = 0, p10 = 0;
    for (let v = 0; v < 256; v++) { acc += hist[v]; if (acc >= n * 0.10) { p10 = v; break; } }
    // map [p10 .. 255] -> [TONE .. 255]: the body of the mark lands on the same
    // ink as the other three, and the icon keeps its internal structure instead
    // of blowing out to white the way a flat gain does.
    const T = (TONE.r + TONE.g + TONE.b) / 3;
    const a = (255 - T) / Math.max(1, 255 - p10);
    const b = T - a * p10;
    buf = await sharp(grey).linear(a, b).png().toBuffer();
  }

  try { buf = await sharp(buf).trim({ threshold: 1 }).toBuffer(); } catch {}
  const meta = await sharp(buf).metadata();
  const H = Math.round(p.h * SCALE);
  const W = Math.round(H * (meta.width / meta.height));
  const out = path.join(OUT, `tool-${p.slug}.webp`);
  await sharp(buf).resize({ width: W, height: H, fit: 'fill', kernel: 'lanczos3' })
    .webp({ quality: 92, alphaQuality: 100, effort: 6 }).toFile(out);

  rows.push({ slug: p.slug, src: p.file, mode: p.mode, ink: `${meta.width}x${meta.height}`,
    r: (meta.width / meta.height).toFixed(2), intrinsic: `${W}x${H}`,
    css: `${(W / SCALE).toFixed(1)}x${p.h}`, kb: (fs.statSync(out).size / 1024).toFixed(1) });
}
console.table(rows);
fs.writeFileSync(path.join(OUT, 'sizes.json'), JSON.stringify(
  Object.fromEntries(rows.map(r => [r.slug, { w: +r.intrinsic.split('x')[0], h: +r.intrinsic.split('x')[1] }])), null, 2));
