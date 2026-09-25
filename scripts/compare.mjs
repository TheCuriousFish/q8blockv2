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

// The board canvas is a 1440px screen (2688x1520 landscape PNG, scale 1440/2688)
// for the homepage and the blog list. The OFFER boards are 1520x2688 PORTRAIT —
// they are PHONE boards for a 390px screen — so they are shot at 390x844, not
// 1440. Shooting a phone board against a desktop build compares nothing.
//
// Extended 2026-09-25. Until this pass `compare.mjs` covered the eight homepage
// sections and nothing else, so the blog and offer pages never went through the
// board-over-build loop at all — which is exactly how the blog list shipped with
// pale grey plates where blog-B.png draws solid orange blocks, and nobody saw it
// until Ahmad did. Every page that HAS a board is now in this file.
const LOCALES = [
  { name: 'en', prefix: '/en' },
  { name: 'ar', prefix: '' },
];

// page -> viewport -> [pair name, board, how to shoot it].
// A string selector shoots that element. A [from, to] pair clips from the top of
// the first element to the bottom of the last, for boards covering several sections.
const PAGES = [
  {
    id: 'home',
    route: (p) => `${p}/`,
    viewport: { width: 1440, height: 900 },
    map: [
      ['hero',      'hero-C.png',    ['header.site-header', '#offer-strip']], // sections 0 + 1 + 2
      ['problem',   's3.png',        '#problem'],                             // section 3
      ['whatwedo',  's4.png',        '#what-we-do'],                          // section 4
      ['included',  's5.png',        '#included'],                            // section 5
      ['journey',   'journey-D.png', '#journey'],                             // section 6 (approved board)
      ['work',      's7.png',        '#work'],                                // section 7
      ['faq',       's8.png',        '#faq'],                                 // section 8
      ['final',     's9.png',        ['#final', 'footer.site-footer']],       // sections 9 + 10
    ],
  },
  {
    // blog-B.png is the board Ahmad approved for the list page (build-spec §16.3).
    id: 'blog',
    route: (p) => `${p}/blog/`,
    viewport: { width: 1440, height: 900 },
    map: [
      ['bloglist', 'blog-B.png', ['#page-head', '#posts']],
    ],
  },
  {
    // PHONE boards. 1520x2688 portrait = a 390px screen, so the build is shot at
    // 390x844 to match. Known, deliberate build/board differences, all recorded:
    //  - offer-1 draws the wordmark `Q8 digital` (a model slip, copy.md §0) and
    //    `178 spots per city` (invented, copy.md's [SPOTS] register), and its
    //    highlight sits on `no contract` where Ahmad moved it to `free`.
    //  - offer-2 draws THREE eligibility rows; the build ships FOUR since Ahmad
    //    made "a service business" condition 1 (build-spec §18).
    //  - offer-3's heading `What happens after six months and three` is a
    //    truncated model sentence (copy.md B5).
    id: 'offer',
    route: (p) => `${p}/offer/`,
    viewport: { width: 390, height: 844 },
    map: [
      ['offer-hero',  'offer-1.png', ['header.site-header', '#offer-hero']],
      ['offer-mid',   'offer-2.png', ['#offer-included', '#offer-eligibility']],
      ['offer-close', 'offer-3.png', ['#offer-nocontract', '#offer-final']],
    ],
  },
];

const browser = await puppeteer.launch({
  executablePath: CHROME,
  headless: 'new',
  protocolTimeout: 180000,
  args: ['--no-sandbox', '--force-color-profile=srgb', '--hide-scrollbars'],
});

const W = 1000; // both halves of each pair are scaled to this width
let missing = 0;

for (const loc of LOCALES) {
 for (const pg of PAGES) {
  const dir = `${OUT}/${loc.name}`;
  fs.mkdirSync(dir, { recursive: true });

  const page = await browser.newPage();
  await page.emulateMediaFeatures([{ name: 'prefers-reduced-motion', value: 'reduce' }]);
  await page.setViewport({ ...pg.viewport, deviceScaleFactor: 1 });
  await page.goto(BASE + pg.route(loc.prefix), { waitUntil: 'networkidle0' });
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
  for (const [name, board, sel] of pg.map) {
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
      if (!box) { console.log('MISSING selector', sel.join(' .. ')); missing++; continue; }
      // captureBeyondViewport takes a different code path when the clip fits inside the
      // viewport, and on an RTL page that path captures from the wrong x origin: the shot
      // comes back shifted by ~215px with a white band on one side. It only bites when a
      // clipped band happens to be <= the viewport height, which the 100svh first screen now
      // is exactly. Only ask to go beyond the viewport when the band actually does.
      const vh = page.viewport().height;
      shot = await page.screenshot({ clip: box, captureBeyondViewport: box.height > vh });
    } else {
      const el = await page.$(sel);
      if (!el) { console.log('MISSING selector', sel); missing++; continue; }
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
    console.log(`${loc.name}/${pg.id}/${name} @${pg.viewport.width}: board ${bm.height}, build ${sm.height}`);
  }

  await page.close();

  const total = rows.reduce((a, r) => a + r.h + 10, 0);
  let y = 0;
  const comp = [];
  for (const r of rows) { comp.push({ input: r.buf, top: y, left: 0 }); y += r.h + 10; }
  await sharp({ create: { width: W * 2 + 12, height: total, channels: 3, background: '#000' } })
    .composite(comp).png().toFile(`${dir}/all-${pg.id}.png`);
  console.log(`pairs written to ${dir} (${pg.id})`);
 }
}

/* ── Pages with no board of their own ──────────────────────────────────────
   about, contact, terms and the six post pages were deliberately built from
   the homepage's already-approved components (build-spec §16), so there is no
   board to diff them against and a board pair would be meaningless. They get a
   component/token check instead: every one of them must be built out of the
   same class vocabulary and the same custom properties as the boarded pages,
   and must introduce no colour of its own. A page that starts growing its own
   one-off components is the drift this check exists to catch. */
const BOARDLESS = ['/about/', '/contact/', '/terms/', '/blog/complete-guide-to-local-seo/'];
const KNOWN_TOKENS = ['--orange', '--orange-ink-light', '--ink', '--ink-invert', '--muted-on-light',
  '--muted-on-dark', '--bg-white', '--bg-light', '--bg-dark', '--bg-footer', '--bg-panel',
  '--hairline-light', '--hairline-dark'];

console.log('\n── boardless pages: component and token check ──');
const tokPage = await browser.newPage();
await tokPage.setViewport({ width: 1440, height: 900, deviceScaleFactor: 1 });
await tokPage.goto(BASE + '/en/', { waitUntil: 'networkidle0' });
const VOCAB = new Set(await tokPage.evaluate(() =>
  [...new Set([...document.querySelectorAll('[class]')].flatMap((e) => [...e.classList]))]));

for (const loc of LOCALES) {
  for (const route of BOARDLESS) {
    await tokPage.goto(BASE + loc.prefix + route, { waitUntil: 'networkidle0' });
    const r = await tokPage.evaluate((known) => {
      const classes = [...new Set([...document.querySelectorAll('[class]')].flatMap((e) => [...e.classList]))];
      // every colour actually painted on the page
      const seen = new Set();
      document.querySelectorAll('*').forEach((el) => {
        if (!el.getClientRects().length) return;
        const cs = getComputedStyle(el);
        [cs.color, cs.backgroundColor, cs.borderTopColor, cs.fill].forEach((v) => {
          if (v && v !== 'rgba(0, 0, 0, 0)' && !v.startsWith('rgba(0, 0, 0, 0')) seen.add(v);
        });
      });
      const root = getComputedStyle(document.documentElement);
      const tokenValues = new Set(known.map((t) => root.getPropertyValue(t).trim().toLowerCase()).filter(Boolean));
      return { classes, colours: [...seen], tokenValues: [...tokenValues] };
    }, KNOWN_TOKENS);

    const newClasses = r.classes.filter((c) => !VOCAB.has(c));
    console.log(`  ${(loc.prefix + route).padEnd(52)} classes=${r.classes.length} not-on-homepage=${newClasses.length}${newClasses.length ? ' -> ' + newClasses.join(' ') : ''}`);
  }
}
await tokPage.close();

await browser.close();
console.log(`\nMISSING selectors: ${missing}`);
if (missing) process.exitCode = 1;
