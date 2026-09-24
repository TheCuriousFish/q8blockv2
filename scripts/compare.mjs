// Board over build, section by section, at the board's own 1440 width.
// The boards are English, so /en/ is the primary check -- but the Arabic page is
// checked against the same boards too (Alexandria draws Arabic much larger, so the
// Arabic page drifts on its own; see design/build-spec.md section 9).
//
//   cd <scratch> && npm i puppeteer-core sharp
//   BASE=http://localhost:4188 OUT=<scratch>/pairs node clients/q8block/scripts/compare.mjs
import puppeteer from 'puppeteer-core';
import sharp from 'sharp';
import fs from 'node:fs';

const CHROME = 'C:/Program Files/Google/Chrome/Application/chrome.exe';
const BOARDS = 'C:/Users/Ahmad/projects/Orcha/clients/q8block/design/boards';
const BASE = process.env.BASE || 'http://localhost:4188';
const OUT = process.env.OUT || '.';

// The board canvas is a 1440px screen (2688px PNG, scale 1440/2688 = 0.5357).
const LOCALES = [
  { name: 'en', path: '/en/' },
  { name: 'ar', path: '/' },
];

// section -> the approved board it was drawn from -> how to shoot it.
// A string selector shoots that element. A [from, to] pair clips from the top of
// the first element to the bottom of the last, for boards that cover several sections.
const MAP = [
  ['hero',      'hero-C.png',    ['header.site-header', '#offer-strip']], // sections 0 + 1 + 2
  ['problem',   's3.png',        '#problem'],                             // section 3
  ['whatwedo',  's4.png',        '#what-we-do'],                          // section 4
  ['included',  's5.png',        '#included'],                            // section 5
  ['journey',   'journey-D.png', '#journey'],                             // section 6 (approved board)
  ['work',      's7.png',        '#work'],                                // section 7
  ['faq',       's8.png',        '#faq'],                                 // section 8
  ['final',     's9.png',        ['#final', 'footer.site-footer']],       // sections 9 + 10
];

const browser = await puppeteer.launch({
  executablePath: CHROME,
  headless: 'new',
  protocolTimeout: 180000,
  args: ['--no-sandbox', '--force-color-profile=srgb', '--hide-scrollbars'],
});

const W = 1000; // both halves of each pair are scaled to this width

for (const loc of LOCALES) {
  const dir = `${OUT}/${loc.name}`;
  fs.mkdirSync(dir, { recursive: true });

  const page = await browser.newPage();
  await page.emulateMediaFeatures([{ name: 'prefers-reduced-motion', value: 'reduce' }]);
  await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 1 });
  await page.goto(BASE + loc.path, { waitUntil: 'networkidle0' });
  await page.evaluate(async () => {
    const step = window.innerHeight;
    for (let y = 0; y < document.body.scrollHeight; y += step) {
      window.scrollTo(0, y);
      await new Promise((r) => setTimeout(r, 120));
    }
    window.scrollTo(0, 0);
    await new Promise((r) => setTimeout(r, 400));
  });

  const rows = [];
  for (const [name, board, sel] of MAP) {
    let shot;
    if (Array.isArray(sel)) {
      const [first, last] = sel;
      const box = await page.evaluate(
        (a, b) => {
          const ea = document.querySelector(a);
          const eb = document.querySelector(b);
          if (!ea || !eb) return null;
          const ra = ea.getBoundingClientRect();
          const rb = eb.getBoundingClientRect();
          const top = ra.top + window.scrollY;
          const bottom = rb.bottom + window.scrollY;
          return { x: 0, y: top, width: document.documentElement.clientWidth, height: bottom - top };
        },
        first,
        last
      );
      if (!box) { console.log('MISSING selector', sel.join(' .. ')); continue; }
      // captureBeyondViewport takes a different code path when the clip fits inside the
      // viewport, and on an RTL page that path captures from the wrong x origin: the shot
      // comes back shifted by ~215px with a white band on one side. It only bites when a
      // clipped band happens to be <= the viewport height, which the 100svh first screen now
      // is exactly. Only ask to go beyond the viewport when the band actually does.
      const vh = page.viewport().height;
      shot = await page.screenshot({ clip: box, captureBeyondViewport: box.height > vh });
    } else {
      const el = await page.$(sel);
      if (!el) { console.log('MISSING selector', sel); continue; }
      shot = await el.screenshot();
    }

    const b = await sharp(`${BOARDS}/${board}`).resize({ width: W }).toBuffer();
    const s = await sharp(shot).resize({ width: W }).toBuffer();
    const bm = await sharp(b).metadata();
    const sm = await sharp(s).metadata();
    const h = Math.max(bm.height, sm.height);
    const label = (t) =>
      Buffer.from(
        `<svg width="${W}" height="26"><rect width="${W}" height="26" fill="#000"/><text x="8" y="19" font-family="Arial" font-size="15" fill="#FF5F29">${t}</text></svg>`
      );
    const pair = await sharp({ create: { width: W * 2 + 12, height: h + 26, channels: 3, background: '#000' } })
      .composite([
        { input: label(`BOARD  ${board}`), top: 0, left: 0 },
        { input: label(`BUILD  ${loc.name}  ${name}`), top: 0, left: W + 12 },
        { input: b, top: 26, left: 0 },
        { input: s, top: 26, left: W + 12 },
      ])
      .png()
      .toBuffer();
    fs.writeFileSync(`${dir}/${name}.png`, pair);
    rows.push({ buf: pair, h: h + 26 });
    console.log(`${loc.name}/${name}: board ${bm.height}, build ${sm.height}`);
  }

  await page.close();

  const total = rows.reduce((a, r) => a + r.h + 10, 0);
  let y = 0;
  const comp = [];
  for (const r of rows) { comp.push({ input: r.buf, top: y, left: 0 }); y += r.h + 10; }
  await sharp({ create: { width: W * 2 + 12, height: total, channels: 3, background: '#000' } })
    .composite(comp).png().toFile(`${dir}/all.png`);
  console.log(`pairs written to ${dir}`);
}

await browser.close();
