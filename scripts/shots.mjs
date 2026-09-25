// Full sweep: both locales at 1440x900 and 390x844.
// Must report broken=0, errors=0, overflow=false on every row before Ahmad sees anything.
//
//   cd <scratch> && npm i puppeteer-core sharp
//   BASE=http://localhost:4188 OUT=<scratch>/shots node clients/q8block/scripts/shots.mjs
import puppeteer from 'puppeteer-core';
import sharp from 'sharp';
import fs from 'node:fs';

const CHROME = 'C:/Program Files/Google/Chrome/Application/chrome.exe';
const BASE = process.env.BASE || 'http://localhost:4188';
const OUT = process.env.OUT || '.';
fs.mkdirSync(OUT, { recursive: true });

const SIZES = [
  { name: 'desktop', width: 1440, height: 900, dsf: 1 },
  { name: 'phone', width: 390, height: 844, dsf: 2 },
];
// SHOT_PAGES=name=path,name=path lets a caller sweep the offer pages too, e.g.
//   SHOT_PAGES=ar=/,en=/en/,offer-ar=/offer/,offer-en=/en/offer/
const PAGES = process.env.SHOT_PAGES
  ? process.env.SHOT_PAGES.split(',').map((x) => {
      const [name, p] = x.split('=');
      return { name, url: BASE + p };
    })
  : [
      { name: 'ar', url: BASE + '/' },
      { name: 'en', url: BASE + '/en/' },
    ];

const browser = await puppeteer.launch({
  executablePath: CHROME,
  headless: 'new',
  protocolTimeout: 180000,
  args: ['--no-sandbox', '--force-color-profile=srgb', '--hide-scrollbars'],
});

const report = [];

for (const s of SIZES) {
  for (const pg of PAGES) {
    const page = await browser.newPage();
    const errors = [];
    page.on('console', (m) => { if (m.type() === 'error') errors.push(m.text()); });
    page.on('pageerror', (e) => errors.push('pageerror: ' + e.message));
    page.on('requestfailed', (r) => errors.push('failed: ' + r.url()));
    await page.emulateMediaFeatures([{ name: 'prefers-reduced-motion', value: 'reduce' }]);
    await page.setViewport({ width: s.width, height: s.height, deviceScaleFactor: s.dsf });
    await page.goto(pg.url, { waitUntil: 'networkidle0', timeout: 60000 });

    // walk the page in separate calls so no single evaluate can time out
    const total = await page.evaluate(() => document.body.scrollHeight);
    for (let y = 0; y < Math.min(total, 40000); y += s.height) {
      await page.evaluate((v) => window.scrollTo(0, v), y);
      await new Promise((r) => setTimeout(r, 60));
    }
    await page.evaluate(() => window.scrollTo(0, 0));
    await new Promise((r) => setTimeout(r, 600));

    const file = `${OUT}/${pg.name}-${s.name}.png`;
    await page.screenshot({ path: file, fullPage: true });

    const info = await page.evaluate(() => {
      const bad = Array.from(document.images)
        .filter((i) => i.naturalWidth === 0 && i.offsetParent !== null)
        .map((i) => i.currentSrc || i.src);
      const overflow = document.documentElement.scrollWidth > window.innerWidth + 1;
      // the ten sections the build-spec locks, plus the header and footer
      const want = ['#hero', '#offer-strip', '#problem', '#what-we-do', '#included',
                    '#journey', '#work', '#faq', '#final'];
      const missing = want.filter((sel) => !document.querySelector(sel));
      if (!document.querySelector('header.site-header')) missing.push('header.site-header');
      if (!document.querySelector('footer.site-footer')) missing.push('footer.site-footer');
      return {
        sections: document.querySelectorAll('main section').length,
        missingSections: missing,
        height: document.body.scrollHeight,
        brokenImages: bad,
        horizontalOverflow: overflow,
        scrollWidth: document.documentElement.scrollWidth,
        inner: window.innerWidth,
        dir: document.documentElement.getAttribute('dir'),
        lang: document.documentElement.getAttribute('lang'),
        h1: (document.querySelector('h1') || {}).textContent,
        title: document.title,
      };
    });
    report.push({ page: pg.name, size: s.name, errors, ...info });
    await page.close();
  }
}

await browser.close();
fs.writeFileSync(`${OUT}/report.json`, JSON.stringify(report, null, 2));
for (const r of report) {
  console.log(
    `${r.page}/${r.size}: ${r.sections} sections, ${r.height}px tall, dir=${r.dir}, overflow=${r.horizontalOverflow} (${r.scrollWidth}/${r.inner}), broken=${r.brokenImages.length}, errors=${r.errors.length}`
  );
  if (r.missingSections.length) console.log('   missing!', r.missingSections.join(' '));
  r.errors.slice(0, 4).forEach((e) => console.log('   !', e.slice(0, 160)));
  r.brokenImages.slice(0, 4).forEach((e) => console.log('   img!', e.slice(0, 120)));
}

// contact strips so a whole page can be eyeballed in one image
for (const s of SIZES) {
  for (const pg of PAGES) {
    const f = `${OUT}/${pg.name}-${s.name}.png`;
    const m = await sharp(f).metadata();
    const target = 1100;
    await sharp(f).resize({ width: Math.min(target, m.width) }).png().toFile(`${OUT}/small-${pg.name}-${s.name}.png`);
  }
}
console.log('shots written to', OUT);
