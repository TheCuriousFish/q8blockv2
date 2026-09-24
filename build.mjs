#!/usr/bin/env node
/* ══════════════════════════════════════════════════════════════════════════
   Q8Block — the whole site, built from one template plus data.

     node build.mjs            writes clients/q8block/site/

   Four pages out of one template and one stylesheet:
     /            Arabic homepage   (primary)
     /en/         English homepage
     /offer/      Arabic offer page
     /en/offer/   English offer page

   Arabic is primary and ships at the root: the client sites already carry
   478 links to q8block.com/ and 478 to q8block.com/en/.

   Node only. No framework, no toolchain, no dependencies.
   Words come from design/copy.md via src/data.mjs.
   Sizes, colours and spacing come from design/build-spec.md via src/styles.css.

   ── THE TWO BUILD SLOTS AHMAD SETS ──────────────────────────────────────
   `[COUNTDOWN]` and `[SPOTS]` in copy.md are build config, not copy. Both
   live in CONFIG at the top of src/data.mjs:

       COUNTDOWN_END   registration close date, ISO 8601 +03:00.
                       null or a past date  ->  no countdown anywhere, and
                       the strip and the offer hero fall back to
                       "التسجيل مفتوح الآن / Registration is open now".
       SPOTS           seats per city (Ahmad's working number is around 9).
                       null or 0  ->  every "N spots per city" line is
                       dropped and both pages still read correctly.

   Change them there, re-run this file, and all three places that print them
   (the homepage strip, offer B1, offer B3) move together.
   ══════════════════════════════════════════════════════════════════════════ */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { COPY, NAP, CONFIG } from './src/data.mjs';
import {
  header, footer, hero, offerStrip, problem, whatWeDo, included, journey, work,
  faq, finalCall, offerHero, offerIncluded, offerEligibility, offerNoContract,
  offerAfter, offerFaq, esc,
} from './src/render.mjs';

const ROOT = path.dirname(fileURLToPath(import.meta.url));
const SRC = path.join(ROOT, 'src');
const OUT = path.join(ROOT, 'site');

const CSS = fs.readFileSync(path.join(SRC, 'styles.css'), 'utf8');

/* ── the one page shell both pages use ──────────────────────────────────── */
function shell({ t, page, meta, body, bodyClass = '', jsonLd = [] }) {
  const self = page === 'offer' ? t.offer : t.home;
  const abs = (p) => NAP.origin + p;
  const arPath = t.lang === 'ar' ? self.path : self.otherPath;
  const enPath = t.lang === 'en' ? self.path : self.otherPath;

  // /en/ never needs the Arabic subset; / carries Latin brand names and digits.
  const preload = t.lang === 'ar'
    ? ['alexandria-arabic.woff2', 'alexandria-latin.woff2']
    : ['alexandria-latin.woff2'];

  return `<!doctype html>
<html lang="${t.lang}" dir="${t.dir}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(meta.title)}</title>
<meta name="description" content="${esc(meta.description)}">
<link rel="canonical" href="${abs(self.path)}">
<link rel="alternate" hreflang="ar" href="${abs(arPath)}">
<link rel="alternate" hreflang="en" href="${abs(enPath)}">
<link rel="alternate" hreflang="x-default" href="${abs(arPath)}">
${preload.map((f) => `<link rel="preload" as="font" type="font/woff2" href="/assets/fonts/${f}" crossorigin>`).join('\n')}
<meta property="og:type" content="website">
<meta property="og:site_name" content="Q8 block">
<meta property="og:locale" content="${t.lang === 'ar' ? 'ar_KW' : 'en_US'}">
<meta property="og:title" content="${esc(meta.title)}">
<meta property="og:description" content="${esc(meta.description)}">
<meta property="og:url" content="${abs(self.path)}">
<meta property="og:image:alt" content="${esc(meta.ogAlt)}">
<meta name="twitter:card" content="summary">
<meta name="theme-color" content="#FF5F29">
<link rel="icon" href="/assets/img/favicon.svg" type="image/svg+xml">
<style>${CSS}</style>
<script defer src="/assets/app.js"></script>
${jsonLd.map((o) => `<script type="application/ld+json">${JSON.stringify(o)}</script>`).join('\n')}
</head>
<body${bodyClass ? ` class="${bodyClass}"` : ''}>
<a class="skip" href="#main">${esc(t.skip)}</a>
${header(t, page)}
<main id="main">
${body}
</main>
${footer(t)}
</body>
</html>
`;
}

/* ── structured data: only facts that are on the page ───────────────────── */
function orgLd(t) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Q8 block',
    alternateName: t.lang === 'ar' ? 'شركة كويت بلوك' : 'Kuwait Block',
    url: NAP.origin + '/',
    telephone: NAP.phoneDisplay,
    address: {
      '@type': 'PostalAddress',
      streetAddress: t.footer.address,
      addressCountry: 'KW',
    },
  };
}
function faqLd(items) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((q) => ({
      '@type': 'Question',
      name: q.q,
      acceptedAnswer: { '@type': 'Answer', text: q.a },
    })),
  };
}

/* ── the two page templates ─────────────────────────────────────────────── */
function homePage(t) {
  const body = [
    hero(t), offerStrip(t), problem(t), whatWeDo(t), included(t),
    journey(t), work(t), faq(t), finalCall(t),
  ].join('\n');
  return shell({ t, page: 'home', meta: t.meta.home, body, jsonLd: [orgLd(t), faqLd(t.faq.items)] });
}

function offerPage(t) {
  const body = [
    offerHero(t), offerIncluded(t), offerEligibility(t), offerNoContract(t),
    offerAfter(t), offerFaq(t),
    finalCall(t, { id: 'offer-final', h2: t.offerPage.b7.h2, lead: t.offerPage.b7.lead }),
  ].join('\n');
  return shell({
    t, page: 'offer', meta: t.meta.offer, body, bodyClass: 'theme-dark',
    jsonLd: [orgLd(t), faqLd(t.offerPage.b6.items)],
  });
}

/* ── writers ────────────────────────────────────────────────────────────── */
const written = [];
function write(rel, contents) {
  const f = path.join(OUT, rel);
  fs.mkdirSync(path.dirname(f), { recursive: true });
  fs.writeFileSync(f, contents);
  written.push(rel.replace(/\\/g, '/'));
}
function copy(from, rel) {
  const f = path.join(OUT, rel);
  fs.mkdirSync(path.dirname(f), { recursive: true });
  fs.copyFileSync(from, f);
  written.push(rel.replace(/\\/g, '/'));
}

/* ── the page set, in one place, so the sitemap cannot drift from it ────── */
const PAGES = [
  { path: '/', file: 'index.html', build: () => homePage(COPY.ar), priority: '1.0' },
  { path: '/en/', file: 'en/index.html', build: () => homePage(COPY.en), priority: '1.0' },
  { path: '/offer/', file: 'offer/index.html', build: () => offerPage(COPY.ar), priority: '0.9' },
  { path: '/en/offer/', file: 'en/offer/index.html', build: () => offerPage(COPY.en), priority: '0.9' },
];
const EXTRA_URLS = ['/google-business-profile-checklist.html', '/en/google-business-profile-checklist.html'];

function sitemap() {
  const today = new Date().toISOString().slice(0, 10);
  const alt = (p) => {
    const ar = p.startsWith('/en/') ? p.replace('/en/', '/') : p;
    const en = p.startsWith('/en/') ? p : '/en' + p;
    return [
      `    <xhtml:link rel="alternate" hreflang="ar" href="${NAP.origin}${ar}"/>`,
      `    <xhtml:link rel="alternate" hreflang="en" href="${NAP.origin}${en}"/>`,
      `    <xhtml:link rel="alternate" hreflang="x-default" href="${NAP.origin}${ar}"/>`,
    ].join('\n');
  };
  const urls = PAGES.map((p) => `  <url>
    <loc>${NAP.origin}${p.path}</loc>
${alt(p.path)}
    <lastmod>${today}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>${p.priority}</priority>
  </url>`).join('\n');
  const extra = EXTRA_URLS.map((u) => `  <url>
    <loc>${NAP.origin}${u}</loc>
${alt(u)}
    <lastmod>${today}</lastmod>
    <changefreq>yearly</changefreq>
    <priority>0.5</priority>
  </url>`).join('\n');
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
${urls}
${extra}
</urlset>
`;
}

function robots() {
  return `User-agent: *
Allow: /

Sitemap: ${NAP.origin}/sitemap.xml
`;
}

function llms() {
  return `# Q8 block

> Q8 block builds local service businesses a full website with a dedicated page for every
> service and every area, then works on it being found in Google search and in the answers
> AI assistants give.

## Pages

- [Home, Arabic](${NAP.origin}/)
- [Home, English](${NAP.origin}/en/)
- [The offer, Arabic](${NAP.origin}/offer/)
- [The offer, English](${NAP.origin}/en/offer/)
- [Google Business Profile checklist, Arabic](${NAP.origin}/google-business-profile-checklist.html)
- [Google Business Profile checklist, English](${NAP.origin}/en/google-business-profile-checklist.html)

## What is included on every project

1. Custom website design and development
2. A dedicated page for every service and area
3. Google Search visibility
4. AI platform visibility
5. Backlinks and authority building
6. Hosting, domain and security

## Contact

- Phone: ${NAP.phoneDisplay}
- Address: ${COPY.en.footer.address}
- Website: ${NAP.origin}

## Notes for AI

Every performance figure on this site comes from Google Search Console exports for the named
client and the named complete months, which are printed beside the figure. Nothing is averaged
across clients and no partial month is used.
`;
}

const favicon = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 67 56"><rect width="67" height="56" fill="#FF5F29"/><text x="33.5" y="39" font-family="Alexandria,Arial,sans-serif" font-size="30" font-weight="800" fill="#fff" text-anchor="middle">Q8</text></svg>`;

/* ── run ────────────────────────────────────────────────────────────────── */
fs.rmSync(OUT, { recursive: true, force: true });

for (const p of PAGES) write(p.file, p.build());

// static assets
copy(path.join(SRC, 'app.js'), 'assets/app.js');
for (const f of fs.readdirSync(path.join(SRC, 'fonts'))) copy(path.join(SRC, 'fonts', f), `assets/fonts/${f}`);
for (const f of fs.readdirSync(path.join(SRC, 'img'))) copy(path.join(SRC, 'img', f), `assets/img/${f}`);
write('assets/img/favicon.svg', favicon);

// preserved from the old site: the checklist page is referenced in the offer.
// Arabic-first, same convention as the four main pages: ar at the root, en at /en/.
const CHECKLIST_AR = path.join(SRC, 'static', 'google-business-profile-checklist.ar.html');
const CHECKLIST_EN = path.join(SRC, 'static', 'google-business-profile-checklist.en.html');
if (fs.existsSync(CHECKLIST_AR)) copy(CHECKLIST_AR, 'google-business-profile-checklist.html');
else console.warn('!! google-business-profile-checklist.ar.html not found in src/static/ — not copied');
if (fs.existsSync(CHECKLIST_EN)) copy(CHECKLIST_EN, 'en/google-business-profile-checklist.html');
else console.warn('!! google-business-profile-checklist.en.html not found in src/static/ — not copied');

write('robots.txt', robots());
write('sitemap.xml', sitemap());
write('llms.txt', llms());

const c = CONFIG;
const live = c.COUNTDOWN_END && Date.parse(c.COUNTDOWN_END) > Date.now();
console.log(`built ${written.length} files into ${OUT}`);
console.log(`  countdown: ${live ? c.COUNTDOWN_END : 'off (static state)'}`);
console.log(`  spots:     ${c.SPOTS || 'off (line dropped)'}`);
for (const p of PAGES) console.log(`  ${p.path.padEnd(12)} -> ${p.file}`);
