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
       SPOTS           seats left (Ahmad's working number is around 9). "per city"
                       came off the line 2026-09-25 on his instruction.
                       null or 0  ->  every "N seats left" line is
                       dropped and both pages still read correctly.

   Change them there, re-run this file, and all three places that print them
   (the homepage strip, offer B1, offer B3) move together.
   ══════════════════════════════════════════════════════════════════════════ */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { COPY, NAP, CONFIG, INDEXNOW_KEY } from './src/data.mjs';
import {
  header, footer, firstScreen, problem, whatWeDo, included, journey, work,
  faq, finalCall, offerHero, offerIncluded, offerEligibility, offerNoContract,
  offerAfter, offerFaq, esc,
  pageHead, aboutPrinciple, aboutDeliver, aboutNotDo, aboutCompany,
  contactBlocks, contactOffice, termsBody, blogList, postArticle,
} from './src/render.mjs';

const ROOT = path.dirname(fileURLToPath(import.meta.url));
const SRC = path.join(ROOT, 'src');
const OUT = path.join(ROOT, 'site');
const CONTENT = path.join(ROOT, 'content', 'blog');

const CSS = fs.readFileSync(path.join(SRC, 'styles.css'), 'utf8');

/* ══════════════════════════════════════════════════════════════════════════
   The blog content layer: a frontmatter parser and a markdown renderer,
   written here rather than installed. This repo has no dependencies and the
   posts use four constructs and no more — `##`, `###`, paragraphs and
   `**bold**` — so a parser is a dozen lines and a package is a supply chain.
   The frontmatter shape is documented in design/copy-pages.md §B5.
   ══════════════════════════════════════════════════════════════════════════ */

// `---\n key: value \n--- \n body`. Values are plain scalars: no nesting, no
// lists, no anchors. A quoted value keeps its quotes off. Nothing is eval'd.
function frontmatter(raw) {
  const text = raw.replace(/^﻿/, '').replace(/\r\n/g, '\n');
  const m = text.match(/^---\n([\s\S]*?)\n---\n?([\s\S]*)$/);
  if (!m) throw new Error('no frontmatter block');
  const data = {};
  for (const line of m[1].split('\n')) {
    if (!line.trim() || /^\s*#/.test(line)) continue;
    const at = line.indexOf(':');
    if (at < 0) throw new Error(`frontmatter line without a colon: ${line}`);
    const key = line.slice(0, at).trim();
    let value = line.slice(at + 1).trim();
    if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) {
      value = value.slice(1, -1);
    }
    data[key] = value;
  }
  return { data, body: m[2].trim() };
}

// The four constructs the posts use, and nothing else. Everything is escaped
// first, so a post can never inject markup into the page.
function markdown(body) {
  const inline = (s) => esc(s)
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/(^|[\s(])\*(?!\s)(.+?)(?<!\s)\*/g, '$1<em>$2</em>');
  const out = [];
  let list = null;
  const closeList = () => { if (list) { out.push(`<ul>${list.join('')}</ul>`); list = null; } };
  for (const block of body.split(/\n{2,}/)) {
    const b = block.trim();
    if (!b) continue;
    const h = b.match(/^(#{2,4})\s+(.*)$/);
    if (h) { closeList(); out.push(`<h${h[1].length}>${inline(h[2].trim())}</h${h[1].length}>`); continue; }
    if (/^[-*]\s+/.test(b)) {
      list = list || [];
      for (const li of b.split('\n')) list.push(`<li>${inline(li.replace(/^[-*]\s+/, '').trim())}</li>`);
      continue;
    }
    closeList();
    out.push(`<p>${inline(b.replace(/\n/g, ' '))}</p>`);
  }
  closeList();
  return out.join('\n');
}

/* Read time is COMPUTED from the rendered word count, never typed onto a card
   by hand (copy-pages.md §B2). 200 words a minute for English and 140 for
   Arabic — Arabic words carry more, and at this pair every one of the six
   posts returns the SAME number in both languages, which matters because the
   two pages are the same article. `read:` in frontmatter stays as the
   author's own estimate and is not printed. */
const WPM = { en: 200, ar: 140 };
const readTime = (words, lang) => Math.max(1, Math.round(words / WPM[lang]));

/* Every blog image's intrinsic size, written by scripts/blog-art.mjs when it
   cuts the derivatives out of the board crops. It lives in src/ and not in
   src/img/ on purpose: the build copies everything in src/img/ into the public
   output, and a manifest is not a public asset. */
const ART_SIZES = JSON.parse(fs.readFileSync(path.join(SRC, 'blog-art.json'), 'utf8'));
function img(file) {
  const s = ART_SIZES[file];
  if (!s) throw new Error(`${file} is not in src/blog-art.json — re-run scripts/blog-art.mjs`);
  return { src: `/assets/img/${file}`, w: s.w, h: s.h };
}

// 2026-09-24 -> `24 September 2026` / `24 سبتمبر 2026`, with every digit run
// isolated on the Arabic page (build-spec §10).
function dateLabel(t, iso) {
  const [y, m, d] = iso.split('-').map(Number);
  const month = t.months[m - 1];
  return t.lang === 'ar'
    ? `<span dir="ltr">${d}</span> ${month} <span dir="ltr">${y}</span>`
    : `${d} ${month} ${y}`;
}

/* The list ROW carries the board's short date and the post page keeps the long
   one. blog-B.png draws `APR 12, 2025`, 82.5 css wide; the long form sets
   `24 SEPTEMBER 2026` at 169, which is twice the board and wraps the row at
   narrower widths. Only the SHAPE is the board's: the date printed is the real
   publication date, never the board's invented 2025 spread (build-spec §19.3,
   Ahmad: "I want to be honest and no fake"). Arabic has no conventional
   three-letter month, so the Arabic row keeps the long form. */
function dateLabelShort(t, iso) {
  if (t.lang === 'ar') return dateLabel(t, iso);
  const [y, m, d] = iso.split('-').map(Number);
  return `${t.months[m - 1].slice(0, 3)} ${d}, ${y}`;
}

/* ── The featured slot is PINNED. Do not make it dynamic. ────────────────────
   Ahmad, 2026-09-25, looking at design/boards/blog-B.png:

     "it is amazing how the featured one, the big one, says The Complete Guide
      to Local SEO for Small Businesses, which is perfect for our business.
      And that will remain there no matter how many blog posts we have."

   So the featured panel is a deliberate editorial choice about ONE evergreen
   pillar, not "the newest post". Whoever adds post seven, seventy or seven
   hundred: add the slug to LIST_ORDER and leave this alone. Do NOT rewrite
   this as `LIST_ORDER[0]`, a `date` sort, a `featured: true` flag that the
   newest post can also set, or anything else that lets the slot move on its
   own. If the pillar ever changes, it changes here, by hand, on purpose. */
const FEATURED_SLUG = 'complete-guide-to-local-seo';

/* The list rows, in the order blog-B.png draws them. The grid is two columns
   filled row by row, so this order puts 1 and 2 on the board's first row,
   3 and 4 on its second and 5 alone on its third. */
const LIST_ORDER = [
  'keyword-research-for-local-seo',
  'on-page-seo-basics-for-local-sites',
  'google-business-profile-optimization',
  'measuring-local-seo-success',
  'building-local-citations-that-matter',
];

// Every post, for the page/sitemap loop and for prev/next. The featured post
// leads it because it is also the pillar the others hang off.
const POST_ORDER = [FEATURED_SLUG, ...LIST_ORDER];

function loadPosts(t) {
  return POST_ORDER.map((slug) => {
    const file = path.join(CONTENT, `${slug}.${t.lang}.md`);
    const { data, body } = frontmatter(fs.readFileSync(file, 'utf8'));
    for (const k of ['title', 'description', 'excerpt', 'category', 'date', 'author', 'authorUrl', 'slug', 'lang']) {
      if (!data[k]) throw new Error(`${path.basename(file)}: frontmatter is missing ${k}`);
    }
    if (data.slug !== slug) throw new Error(`${path.basename(file)}: slug ${data.slug} does not match the filename`);
    if (data.lang !== t.lang) throw new Error(`${path.basename(file)}: lang ${data.lang} does not match the filename`);
    const html = markdown(body);
    const words = body.replace(/[#*]/g, ' ').split(/\s+/).filter(Boolean).length;
    const read = readTime(words, t.lang);
    return {
      ...data, html, words, read,
      ...t.paths.post(slug),
      /* All three are cut from the APPROVED BOARD's own tiles by
         scripts/blog-art.mjs (design/blog-art-board/, not design/blog-art/).
         `img()` carries each file's real intrinsic size out of
         src/blog-art.json so every tag gets a truthful width/height and CLS
         stays 0 — the board's tiles are not square and not all the same shape,
         so one hard-coded pair would be wrong for five of the six. */
      /* One wide frame does the featured panel, the post hero and the
         og:image: 2.657:1 is the only art ratio blog-B.png gives. */
      art: img(`blog-${slug}-wide.webp`),    // 1440x542, post hero + og:image
      wide: img(`blog-${slug}-wide.webp`),   // 1440x542, the featured panel
      thumb: img(`blog-${slug}-sq.webp`),    // the board tile itself, ~240x21x
      dateLabel: dateLabel(t, data.date),
      dateShort: dateLabelShort(t, data.date),
      readLabel: t.blog.readTime(read),
    };
  });
}

/* ── the one page shell both pages use ──────────────────────────────────── */
function shell({ t, page, meta, body, bodyClass = '', jsonLd = [], self }) {
  self = self || (page === 'offer' ? t.offer : t.home);
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
${meta.ogImage ? `<meta property="og:image" content="${abs(meta.ogImage)}">\n` : ''}<meta property="og:image:alt" content="${esc(meta.ogAlt)}">
<meta name="twitter:card" content="${meta.ogImage ? 'summary_large_image' : 'summary'}">
<meta name="twitter:title" content="${esc(meta.title)}">
<meta name="twitter:description" content="${esc(meta.description)}">
${meta.ogImage ? `<meta name="twitter:image" content="${abs(meta.ogImage)}">\n` : ''}<meta name="theme-color" content="#FF5F29">
<link rel="icon" href="/assets/img/favicon.svg" type="image/svg+xml">
<style>${CSS}</style>
<script defer src="/assets/app.js"></script>
${jsonLd.map((o) => `<script type="application/ld+json">${JSON.stringify(o)}</script>`).join('\n')}
</head>
<body${bodyClass ? ` class="${bodyClass}"` : ''}>
<a class="skip" href="#main">${esc(t.skip)}</a>
${header(t, page, self)}
<main id="main">
${body}
</main>
${footer(t, self)}
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
// Blog structured data: the same six titles, dates and authors the page
// prints, and nothing that is not on the page.
function blogLd(t, posts) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Blog',
    name: t.meta.blog.title.split(' | ')[0],
    url: NAP.origin + t.paths.blog.path,
    inLanguage: t.lang,
    blogPost: posts.map((p) => ({
      '@type': 'BlogPosting',
      headline: p.title,
      url: NAP.origin + p.path,
      datePublished: p.date,
      author: { '@type': 'Person', name: p.author, url: p.authorUrl },
    })),
  };
}
function postLd(t, p) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: p.title,
    description: p.description,
    url: NAP.origin + p.path,
    mainEntityOfPage: NAP.origin + p.path,
    datePublished: p.date,
    dateModified: p.date,
    inLanguage: t.lang,
    image: NAP.origin + p.art.src,
    author: { '@type': 'Person', name: p.author, url: p.authorUrl },
    publisher: { '@type': 'Organization', name: 'Q8 block', url: NAP.origin + '/' },
  };
}
function crumbLd(t, p) {
  const at = [
    [t.blog.home, t.paths.home.path],
    [t.blog.blog, t.paths.blog.path],
    [p.title, p.path],
  ];
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: at.map(([name, url], i) => ({
      '@type': 'ListItem', position: i + 1, name, item: NAP.origin + url,
    })),
  };
}

/* ── the two page templates ─────────────────────────────────────────────── */
function homePage(t) {
  const body = [
    firstScreen(t), problem(t), whatWeDo(t), included(t),
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

/* ── the four secondary pages ───────────────────────────────────────────── */

function aboutPage(t) {
  const a = t.about;
  const body = [
    pageHead(t, { eyebrow: a.eyebrow, h1: a.h1, lead: a.lead }),
    aboutPrinciple(t), aboutDeliver(t), aboutNotDo(t), aboutCompany(t),
    finalCall(t, { id: 'about-final', h2: a.final.h2, lead: a.final.lead }),
  ].join('\n');
  return shell({ t, page: 'about', self: t.paths.about, meta: t.meta.about, body, jsonLd: [orgLd(t)] });
}

function contactPage(t) {
  const c = t.contact;
  const body = [
    pageHead(t, { eyebrow: c.eyebrow, h1: c.h1, lead: c.lead }),
    contactBlocks(t), contactOffice(t),
  ].join('\n');
  return shell({ t, page: 'contact', self: t.paths.contact, meta: t.meta.contact, body, jsonLd: [orgLd(t)] });
}

function termsPage(t) {
  const body = [
    pageHead(t, { h1: t.terms.h1, lead: t.terms.lead, note: t.terms.updated }),
    termsBody(t),
  ].join('\n');
  return shell({ t, page: 'terms', self: t.paths.terms, meta: t.meta.terms, body, jsonLd: [orgLd(t)] });
}

/* ── 404 — one file at the publish root, Netlify's own convention, served for
   every missing URL in either locale (build-spec.md §17). It does not go
   through shell(): a 404 is not part of the ar/en page-pair system, so its
   canonical and both hreflang alternates self-reference the one file that
   actually serves them, and its header/footer language link points at the
   English homepage rather than at itself. Arabic primary, same header, same
   footer, same tokens as every other page, with one English line for a
   reader who followed a broken /en/ link — Netlify serves this exact file
   under /en/ too, since the publish directory holds no per-locale 404. */
function notFoundPage() {
  const t = COPY.ar;
  const self = { path: '/404.html', otherPath: '/en/' };
  const title = 'الصفحة غير موجودة | Q8 block';
  const description = 'هذا الرابط غير متاح على موقع Q8 block. عد إلى الصفحة الرئيسية أو تواصل معنا مباشرة.';
  const links = [
    { label: t.nav[0].label, href: t.paths.home.path },   // الرئيسية
    { label: t.strip.cta, href: t.offer.path },            // اطلع على العرض
    { label: t.nav[2].label, href: t.paths.blog.path },    // المدونة
    { label: t.nav[4].label, href: t.paths.contact.path }, // تواصل معنا
  ];
  const body = `<section id="notfound" class="sec page-head">
    <div class="wrap">
      <p class="eyebrow">خطأ 404</p>
      <h1 class="h2">هذه الصفحة غير موجودة</h1>
      <p class="lead">الرابط الذي فتحته غير متاح، أو تم نقله. جرّب أحد الروابط التالية:</p>
      <nav class="notfound-links" aria-label="روابط مفيدة">
        ${links.map((l) => `<a class="text-link" href="${l.href}">${esc(l.label)}</a>`).join('')}
      </nav>
      <p class="page-note" dir="ltr">Looking for the English site? <a class="text-link" href="/en/">Go to the English homepage</a></p>
    </div>
  </section>`;
  return `<!doctype html>
<html lang="${t.lang}" dir="${t.dir}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(title)}</title>
<meta name="description" content="${esc(description)}">
<meta name="robots" content="noindex,follow">
<link rel="canonical" href="${NAP.origin}/404.html">
<link rel="alternate" hreflang="ar" href="${NAP.origin}/404.html">
<link rel="alternate" hreflang="en" href="${NAP.origin}/404.html">
<link rel="alternate" hreflang="x-default" href="${NAP.origin}/404.html">
<link rel="preload" as="font" type="font/woff2" href="/assets/fonts/alexandria-arabic.woff2" crossorigin>
<link rel="preload" as="font" type="font/woff2" href="/assets/fonts/alexandria-latin.woff2" crossorigin>
<meta property="og:type" content="website">
<meta property="og:site_name" content="Q8 block">
<meta property="og:locale" content="ar_KW">
<meta property="og:title" content="${esc(title)}">
<meta property="og:description" content="${esc(description)}">
<meta property="og:url" content="${NAP.origin}/404.html">
<meta name="twitter:card" content="summary">
<meta name="twitter:title" content="${esc(title)}">
<meta name="twitter:description" content="${esc(description)}">
<meta name="theme-color" content="#FF5F29">
<link rel="icon" href="/assets/img/favicon.svg" type="image/svg+xml">
<style>${CSS}</style>
<script defer src="/assets/app.js"></script>
<script type="application/ld+json">${JSON.stringify(orgLd(t))}</script>
</head>
<body>
<a class="skip" href="#main">${esc(t.skip)}</a>
${header(t, 'notfound', self)}
<main id="main">
${body}
</main>
${footer(t, self)}
</body>
</html>
`;
}

/* Both the list page and every post page close on the §9 final-call band,
   used exactly as copy.md writes it, so the site has one closing argument
   and not three (copy-pages.md §B4). */
function blogPage(t, posts) {
  // The pin is resolved here, by slug, not by position — so a reorder of
  // LIST_ORDER can never quietly move the featured panel. See FEATURED_SLUG.
  const featured = posts.find((p) => p.slug === FEATURED_SLUG);
  if (!featured) throw new Error(`FEATURED_SLUG ${FEATURED_SLUG} is not one of the posts`);
  const rows = posts.filter((p) => p.slug !== FEATURED_SLUG);
  const body = [
    pageHead(t, { eyebrow: t.blog.eyebrow, h1: t.blog.h1, lead: t.blog.lead }),
    blogList(t, { featured, rows }), finalCall(t),
  ].join('\n');
  return shell({
    // blog-B.png draws the WHOLE page on the white surface — there is no
    // --bg-light band behind the heading, and the panel's top rule sits 19.8
    // css under the H1's ink. `.page-head` keeps its grey band on about,
    // contact, terms and 404; only this page opts out. See styles.css.
    t, page: 'blog', self: t.paths.blog, meta: t.meta.blog, body, bodyClass: 'blog-page',
    jsonLd: [orgLd(t), blogLd(t, posts)],
  });
}

function postPage(t, posts, i) {
  const post = posts[i];
  const body = [
    postArticle(t, post, { prev: posts[i - 1], next: posts[i + 1] }),
    finalCall(t),
  ].join('\n');
  return shell({
    t, page: 'post', self: { path: post.path, otherPath: post.otherPath },
    // the post's own illustration is a real image of this page, so it is the
    // one og:image on the site; no other page has a picture to point at.
    meta: {
      title: `${post.title} | Q8 block`, description: post.description,
      ogAlt: post.title, ogImage: post.art.src,
    },
    body, jsonLd: [postLd(t, post), crumbLd(t, post)],
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
const POSTS = { ar: loadPosts(COPY.ar), en: loadPosts(COPY.en) };

const PAGES = [
  { path: '/', file: 'index.html', build: () => homePage(COPY.ar), priority: '1.0' },
  { path: '/en/', file: 'en/index.html', build: () => homePage(COPY.en), priority: '1.0' },
  { path: '/offer/', file: 'offer/index.html', build: () => offerPage(COPY.ar), priority: '0.9' },
  { path: '/en/offer/', file: 'en/offer/index.html', build: () => offerPage(COPY.en), priority: '0.9' },
  { path: '/about/', file: 'about/index.html', build: () => aboutPage(COPY.ar), priority: '0.8' },
  { path: '/en/about/', file: 'en/about/index.html', build: () => aboutPage(COPY.en), priority: '0.8' },
  { path: '/blog/', file: 'blog/index.html', build: () => blogPage(COPY.ar, POSTS.ar), priority: '0.8' },
  { path: '/en/blog/', file: 'en/blog/index.html', build: () => blogPage(COPY.en, POSTS.en), priority: '0.8' },
  { path: '/contact/', file: 'contact/index.html', build: () => contactPage(COPY.ar), priority: '0.8' },
  { path: '/en/contact/', file: 'en/contact/index.html', build: () => contactPage(COPY.en), priority: '0.8' },
  { path: '/terms/', file: 'terms/index.html', build: () => termsPage(COPY.ar), priority: '0.4' },
  { path: '/en/terms/', file: 'en/terms/index.html', build: () => termsPage(COPY.en), priority: '0.4' },
  // one page per post per language, from content/blog/, in POST_ORDER
  ...['ar', 'en'].flatMap((lang) => POSTS[lang].map((p, i) => ({
    path: p.path,
    file: p.path.replace(/^\//, '') + 'index.html',
    build: () => postPage(COPY[lang], POSTS[lang], i),
    priority: '0.7',
    lastmod: p.date,          // the post's own publication date, not the build date
  }))),
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
    <lastmod>${p.lastmod || today}</lastmod>
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
- [About us, Arabic](${NAP.origin}/about/)
- [About us, English](${NAP.origin}/en/about/)
- [Blog, Arabic](${NAP.origin}/blog/)
- [Blog, English](${NAP.origin}/en/blog/)
- [Contact us, Arabic](${NAP.origin}/contact/)
- [Contact us, English](${NAP.origin}/en/contact/)
- [Terms and conditions, Arabic](${NAP.origin}/terms/)
- [Terms and conditions, English](${NAP.origin}/en/terms/)
- [Google Business Profile checklist, Arabic](${NAP.origin}/google-business-profile-checklist.html)
- [Google Business Profile checklist, English](${NAP.origin}/en/google-business-profile-checklist.html)

## Articles

Six articles, each published in Arabic at /blog/<slug>/ and in English at
/en/blog/<slug>/. All were published on 2026-09-24, written by Ahmad Owaihan
(${COPY.en.blog.by.replace('By ', '')}, https://ahmadowaihan.com/).

${POSTS.en.map((p, i) => `- [${p.title}](${NAP.origin}${p.path}) — ${p.description}
  Arabic: [${POSTS.ar[i].title}](${NAP.origin}${POSTS.ar[i].path})`).join('\n')}

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
client and named complete months. Section 7's figure is the total number of times that client's
site appeared in Google search results, added up across every complete month Google has recorded
for it. Nothing is averaged across clients and no partial month is used.
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

// The checklist pages' own illustrations. They shipped with broken relative
// src paths from the old site's directory shape (build-spec.md §17) and were
// never copied into site/ at all, so every img 404'd. Vendored once here from
// _old/img/blog/, at the absolute path both HTML files now point at.
const CHECKLIST_IMG_SRC = path.join(ROOT, '_old', 'img', 'blog');
const CHECKLIST_IMGS = ['gbp-setup.webp', 'gbp-reviews.png', 'gbp-engagement.webp', 'gbp-website.webp', 'gbp-citations.webp', 'gbp-blueprint.webp'];
for (const f of CHECKLIST_IMGS) {
  const from = path.join(CHECKLIST_IMG_SRC, f);
  if (fs.existsSync(from)) copy(from, `assets/img/checklist/${f}`);
  else console.warn(`!! ${f} not found in _old/img/blog/ — not copied`);
}

write('robots.txt', robots());
write('sitemap.xml', sitemap());
write('llms.txt', llms());
write('404.html', notFoundPage());
write(`${INDEXNOW_KEY}.txt`, INDEXNOW_KEY);

const c = CONFIG;
const live = c.COUNTDOWN_END && Date.parse(c.COUNTDOWN_END) > Date.now();
console.log(`built ${written.length} files into ${OUT}`);
console.log(`  countdown: ${live ? c.COUNTDOWN_END : 'off (static state)'}`);
console.log(`  spots:     ${c.SPOTS || 'off (line dropped)'}`);
for (const p of PAGES) console.log(`  ${p.path.padEnd(12)} -> ${p.file}`);
