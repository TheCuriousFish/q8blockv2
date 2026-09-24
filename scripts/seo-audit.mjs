// SEO audit of the built site: every rule that can be checked from the HTML on disk.
//   node scripts/seo-audit.mjs            human report
//   node scripts/seo-audit.mjs --json     machine output
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const SITE = path.join(ROOT, 'site');
const files = [];
(function walk(d) { for (const e of fs.readdirSync(d, { withFileTypes: true })) { const f = path.join(d, e.name); if (e.isDirectory()) walk(f); else if (e.name.endsWith('.html')) files.push(f); } })(SITE);
// Collect every .html page, not just index.html. Flat-file pages (e.g.
// /google-business-profile-checklist.html) are real pages: when they were skipped,
// every internal link and sitemap entry pointing at them was reported as a missing
// page at HIGH severity. On q8block that was 26 false highs against a page that was
// built, served and linked correctly (2026-09-24). url() already maps them right.

const url = (f) => '/' + path.relative(SITE, f).replace(/\\/g, '/').replace(/index\.html$/, '');
const pick = (h, re) => (h.match(re) || [])[1];
const all = (h, re) => [...h.matchAll(re)].map((m) => m[1]);
const pages = files.map((f) => {
  const h = fs.readFileSync(f, 'utf8');
  const main = (h.match(/<main[^>]*>([\s\S]*?)<\/main>/) || ['', ''])[1];
  const ld = all(h, /<script type="application\/ld\+json">([\s\S]*?)<\/script>/g);
  return {
    file: f, url: url(f), lang: pick(h, /<html lang="([^"]+)"/),
    title: pick(h, /<title>([^<]*)<\/title>/), desc: pick(h, /<meta name="description" content="([^"]*)"/),
    canonical: pick(h, /<link rel="canonical" href="([^"]*)"/),
    robots: pick(h, /<meta name="robots" content="([^"]*)"/),
    hreflang: all(h, /<link rel="alternate" hreflang="[^"]*" href="([^"]*)"/g),
    og: { title: pick(h, /<meta property="og:title" content="([^"]*)"/), image: pick(h, /<meta property="og:image" content="([^"]*)"/), type: pick(h, /<meta property="og:type" content="([^"]*)"/) },
    h1: all(h, /<h1[^>]*>([\s\S]*?)<\/h1>/g).map((x) => x.replace(/<[^>]+>/g, '').trim()),
    h2: all(h, /<h2[^>]*>([\s\S]*?)<\/h2>/g).length,
    // the lightbox holds an empty <img> that JS fills on click: it is not part of the page's layout
    imgs: [...h.replace(/<dialog[\s\S]*?<\/dialog>/g, ' ').matchAll(/<img\b([^>]*)>/g)].map((m) => m[1]),
    links: all(h, /<a\b[^>]*href="([^"#?]+)"/g),
    ld, words: main.replace(/<(script|style)[\s\S]*?<\/\1>/g, ' ').replace(/<[^>]+>/g, ' ').split(/\s+/).filter(Boolean).length,
    bytes: Buffer.byteLength(h), preload: all(h, /<link rel="preload"[^>]*href="([^"]*)"/g),
    breadcrumb: /BreadcrumbList/.test(h), faq: /FAQPage/.test(h),
  };
});

const issues = [];
const add = (sev, rule, where, detail) => issues.push({ sev, rule, where, detail });
const titles = new Map(), descs = new Map(), h1s = new Map();
for (const p of pages) {
  if (!p.title) add('high', 'title missing', p.url, '');
  else {
    if (p.title.length > 62) add('low', 'title over 62 characters', p.url, `${p.title.length}: ${p.title}`);
    (titles.get(p.title) || titles.set(p.title, []).get(p.title)).push(p.url);
  }
  if (!p.desc) add('high', 'description missing', p.url, '');
  else {
    if (p.desc.length < 70 || p.desc.length > 165) add('low', 'description outside 70 to 165 characters', p.url, `${p.desc.length}`);
    (descs.get(p.desc) || descs.set(p.desc, []).get(p.desc)).push(p.url);
  }
  if (!p.canonical) add('high', 'canonical missing', p.url, '');
  else if (!p.canonical.endsWith(p.url) && !p.canonical.endsWith(p.url.replace(/\/$/, ''))) add('medium', 'canonical does not point at this page', p.url, p.canonical);
  if (p.hreflang.length < 2) add('high', 'hreflang pair missing', p.url, `${p.hreflang.length} alternates`);
  if (p.h1.length !== 1) add('high', `${p.h1.length} H1 tags`, p.url, p.h1.join(' | ').slice(0, 80));
  else (h1s.get(p.h1[0]) || h1s.set(p.h1[0], []).get(p.h1[0])).push(p.url);
  if (!p.og.title || !p.og.image) add('medium', 'Open Graph incomplete', p.url, '');
  if (!p.ld.length) add('high', 'no JSON-LD', p.url, '');
  for (const s of p.ld) { try { JSON.parse(s); } catch (e) { add('high', 'JSON-LD does not parse', p.url, e.message.slice(0, 60)); } }
  if (p.words < 300) add('medium', 'thin page (under 300 words in main)', p.url, `${p.words} words`);
  if (p.bytes > 180000) add('low', 'page over 180 KB of HTML', p.url, `${Math.round(p.bytes / 1024)} KB`);
  const noAlt = p.imgs.filter((a) => !/\balt="/.test(a)).length;
  if (noAlt) add('high', 'images without alt', p.url, `${noAlt} of ${p.imgs.length}`);
  // an empty alt is correct on a decorative image (the scope illustrations), so it is not a finding
  const noDim = p.imgs.filter((a) => !/\bwidth="/.test(a) || !/\bheight="/.test(a)).length;
  if (noDim) add('medium', 'images without width and height', p.url, `${noDim} of ${p.imgs.length}`);
  const eager = p.imgs.filter((a) => !/loading="lazy"/.test(a)).length;
  if (eager > 4) add('low', 'more than 4 images not lazy loaded', p.url, `${eager}`);
  if (!p.preload.length) add('medium', 'no preloaded LCP image', p.url, '');
  if (p.url.startsWith('/services/') && !p.breadcrumb) add('medium', 'no BreadcrumbList', p.url, '');
}
for (const [t, us] of titles) if (us.length > 1) add('high', 'duplicate title', us.slice(0, 3).join(' , '), `${us.length} pages: ${t}`);
for (const [d, us] of descs) if (us.length > 1) add('high', 'duplicate description', us.slice(0, 3).join(' , '), `${us.length} pages`);
for (const [h, us] of h1s) if (us.length > 1) add('medium', 'duplicate H1', us.slice(0, 3).join(' , '), `${us.length} pages: ${h}`);

// internal links: broken targets, orphans, click depth from the home page
// /404.html is a Netlify convention, not a page in the site's own link graph:
// it must never be linked to internally (that would put a "page not found"
// link in the nav) and must never be listed in the sitemap (that would invite
// crawling and indexing an error page). Without this exception a correctly
// built error page was reported orphaned, unreachable and missing from the
// sitemap — three false highs for doing exactly what a 404 page should
// (2026-09-24, q8block). Its own tags (title, description, canonical, H1,
// JSON-LD, OG…) are still audited like any other page.
const isErrorPage = (u) => u === '/404.html';
const set = new Set(pages.map((p) => p.url));
const out = new Map(pages.map((p) => [p.url, []]));
const inbound = new Map(pages.map((p) => [p.url, 0]));
for (const p of pages) {
  for (const l of new Set(p.links)) {
    if (/^(https?:|mailto:|tel:|#)/.test(l)) continue;
    const t = l.startsWith('/') ? l : path.posix.normalize(path.posix.join(p.url, l));
    // Directory URLs are normalised with a trailing slash; a flat file page is not.
    // Appending '/' unconditionally turned /page.html into /page.html/, which never
    // matched the page set, so a correctly built and linked flat page was reported BOTH
    // as a missing link target AND as an orphan (2026-09-24, q8block: 26 false highs).
    const norm = t.endsWith('/') || /[.]html$/.test(t) ? t : `${t}/`;
    if (/\.(webp|png|jpg|svg|xml|txt|js|css|mp4|ico|json)$/.test(t)) continue;
    if (!set.has(norm)) { add('high', 'internal link to a missing page', p.url, t); continue; }
    out.get(p.url).push(norm);
    inbound.set(norm, inbound.get(norm) + 1);
  }
}
for (const [u, n] of inbound) if (!n && u !== '/' && u !== '/en/' && !isErrorPage(u)) add('high', 'orphan page (nothing links to it)', u, '');
// /404.html is reachable by definition — Netlify serves it directly for any
// missing URL, with no click path required — so it seeds the frontier like
// the two home pages rather than being walked to.
const depth = new Map([['/', 0], ['/en/', 0], ['/404.html', 0]]);
let frontier = ['/', '/en/', '/404.html'];
while (frontier.length) {
  const next = [];
  for (const u of frontier) for (const t of out.get(u) || []) if (!depth.has(t)) { depth.set(t, depth.get(u) + 1); next.push(t); }
  frontier = next;
}
for (const p of pages) { const d = depth.get(p.url); if (d === undefined) add('high', 'unreachable from the home page', p.url, ''); else if (d > 4) add('medium', 'more than 4 clicks from the home page', p.url, `${d}`); }

// sitemap and robots
// sitemap.xml is an index: read it and every file it points at
const readSitemap = (f) => (fs.existsSync(path.join(SITE, f)) ? fs.readFileSync(path.join(SITE, f), 'utf8') : '');
let sm = readSitemap('sitemap.xml');
if (/<sitemapindex/.test(sm)) {
  const parts = [...sm.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1].split('/').pop());
  if (!parts.length) add('high', 'sitemap index lists no sitemaps', '/sitemap.xml', '');
  sm = parts.map((p) => { const t = readSitemap(p); if (!t) add('high', 'sitemap index points at a file that does not exist', '/sitemap.xml', p); return t; }).join('\n');
}
const inSitemap = new Set([...sm.matchAll(/<url>\s*<loc>([^<]+)<\/loc>/g)].map((m) => m[1].replace(/^https?:\/\/[^/]+/, '')));
for (const p of pages) if (!inSitemap.has(p.url) && !isErrorPage(p.url)) add('high', 'missing from sitemap.xml', p.url, '');
for (const u of inSitemap) if (!set.has(u)) add('high', 'sitemap lists a page that does not exist', u, '');
if (!fs.existsSync(path.join(SITE, 'robots.txt'))) add('high', 'robots.txt missing', '/', '');
if (!fs.existsSync(path.join(SITE, '404.html'))) add('medium', '404 page missing', '/', '');
if (![...fs.readdirSync(SITE)].some((f) => /indexnow|\.txt$/i.test(f) && /^[a-f0-9]{8,}/i.test(f))) add('medium', 'no IndexNow key file at the site root', '/', '');

const order = { high: 0, medium: 1, low: 2 };
issues.sort((a, b) => order[a.sev] - order[b.sev]);
if (process.argv.includes('--json')) console.log(JSON.stringify(issues, null, 1));
else {
  const by = new Map();
  for (const i of issues) { const k = `${i.sev}|${i.rule}`; (by.get(k) || by.set(k, []).get(k)).push(i); }
  console.log(`${pages.length} pages audited\n`);
  for (const [k, list] of by) {
    const [sev, rule] = k.split('|');
    console.log(`${sev.toUpperCase().padEnd(6)} ${rule}: ${list.length}`);
    for (const i of list.slice(0, 3)) console.log(`       ${i.where} ${i.detail ? '- ' + i.detail.slice(0, 90) : ''}`);
    if (list.length > 3) console.log(`       ... and ${list.length - 3} more`);
  }
  console.log(`\ntotals: ${issues.filter((i) => i.sev === 'high').length} high, ${issues.filter((i) => i.sev === 'medium').length} medium, ${issues.filter((i) => i.sev === 'low').length} low`);
}
