// Q8Block — every section renderer lives here, once. The homepage build and
// the offer-page build both import from this module, so a change is made in
// one place. Layout numbers come from design/build-spec.md.

import { CONFIG, NAP, WORK, ICONS } from './data.mjs';

const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

const telHref = `tel:${NAP.phoneTel}`;
const waHref = NAP.whatsapp;
const resolveHref = (h) => (h === 'tel:' ? telHref : h === 'wa:' ? waHref : h);

/* ── shared bits ─────────────────────────────────────────────────────────── */

// The visible text IS the accessible name: "Q8" + "block". An aria-label of
// "Q8 block" plus aria-hidden on the box hid "Q8" from the name and tripped
// axe's label-content-name-mismatch on every page in both locales. Neither
// attribute is needed — the two spans read out as "Q8 block" on their own.
export function logo(href, cls = '') {
  return `<a class="logo ${cls}" href="${href}">
      <span class="logo-box">Q8</span> <span class="logo-word">block</span>
    </a>`;
}

export function ctaRow(t, { centred = false } = {}) {
  return `<div class="btn-row${centred ? ' centred' : ''}">
      <a class="btn btn-primary" href="${telHref}">${esc(t.cta.call)}</a>
      <a class="btn btn-outline" href="${waHref}" rel="noopener" target="_blank">${esc(t.cta.whatsapp)}</a>
    </div>`;
}

// `self` is the {path, otherPath} pair of the page being rendered, so the
// language link swaps to the mirror of THIS page and not to the home page.
// Omitted, it falls back to the two pages that existed before the secondary
// pages were built.
export function header(t, page, self) {
  const home = self || (page === 'offer' ? t.offer : t.home);
  const links = t.nav.map((n) => `<a href="${n.href}">${esc(n.label)}</a>`).join('');
  return `<header class="site-header${page === 'offer' ? ' over-dark' : ''}">
    <div class="sec-wide"><div class="wrap-wide header-row">
      ${logo(t.lang === 'ar' ? '/' : '/en/')}
      <nav class="nav" id="nav">
        <button class="nav-close" type="button" aria-label="${esc(t.menuClose)}">&times;</button>
        ${links}
        <a class="lang" href="${home.otherPath}" hreflang="${t.other}" lang="${t.other}">${esc(t.otherLabel)}</a>
      </nav>
      <a class="header-cta" href="${telHref}">${esc(t.cta.call)}</a>
      <button class="burger" type="button" aria-controls="nav" aria-expanded="false" aria-label="${esc(t.menuOpen)}"><span></span></button>
    </div></div>
  </header>`;
}

export function footer(t, self) {
  const year = new Date().getFullYear();
  const mirror = (self || t.home).otherPath;
  const cols = t.footer.cols.map((c) => `<div class="footer-col">
      <h3>${esc(c.title)}</h3>
      ${c.links.map((l) => `<a href="${resolveHref(l.href)}">${esc(l.label)}</a>`).join('')}
      ${c.title === t.footer.cols[3].title
        ? `<div class="footer-nap">
             <p>${esc(t.footer.phoneLabel)}: <span dir="ltr">${esc(NAP.phoneDisplay)}</span></p>
             <p>${esc(t.footer.addressLabel)}: ${esc(t.footer.address)}</p>
           </div>` : ''}
    </div>`).join('');

  return `<footer class="site-footer on-dark">
    <div class="sec"><div class="wrap">
      <div class="footer-top">
        <div class="footer-brand">
          ${logo(t.lang === 'ar' ? '/' : '/en/')}
          <p class="footer-tag">${esc(t.footer.strapline)}</p>
        </div>
        ${cols}
      </div>
      <div class="footer-bottom">
        <p class="footer-legal"><span dir="ltr">&copy; ${year}</span> ${esc(t.footer.legal)}</p>
        <div class="footer-mini">
          <a href="https://${NAP.website}" dir="ltr">${NAP.website}</a>
          <a href="${mirror}" hreflang="${t.other}" lang="${t.other}">${esc(t.otherLabel)}</a>
        </div>
      </div>
    </div></div>
  </footer>`;
}

/* ── §2 offer strip and the countdown.
      Both states are written: full (countdown running) and static
      (countdown removed / spots empty). app.js swaps to the static state
      the moment the end date passes. ────────────────────────────────────── */
const hasCountdown = () => {
  if (!CONFIG.COUNTDOWN_END) return false;
  const t = Date.parse(CONFIG.COUNTDOWN_END);
  return !!t && !isNaN(t) && t > Date.now();
};
const hasSpots = () => CONFIG.SPOTS !== null && CONFIG.SPOTS !== undefined && CONFIG.SPOTS !== '' && Number(CONFIG.SPOTS) > 0;

// Rebuilt 2026-09-24 to Ahmad's three instructions:
//   1. the separate "Terms and details" row is DELETED — it took a whole row;
//   2. everything sits on ONE row: pill, line, countdown, spots, CTA;
//   3. the WHOLE bar is the link to /offer/, so `#offer-strip` is itself the
//      <a> and the full-bleed band is the hit area, not a 1320px centre.
// The pill stays (he likes it) but is restyled as a label, because the row now
// carries a real CTA and two things could not both read as the action.
// Both degraded states still produce one complete row: with the countdown
// removed (app.js strips every [data-countdown-part]) and with SPOTS empty.
export function offerStrip(t) {
  const s = t.strip;
  const live = hasCountdown();
  const parts = [`<span class="strip-pill">${esc(s.pill)}</span>`, `<span class="strip-line">${esc(s.line)}</span>`];

  if (live) {
    parts.push(`<span class="strip-sep" data-countdown-part aria-hidden="true">&middot;</span>`);
    parts.push(`<span class="strip-label" data-countdown-part>${esc(s.countdownLabel)}</span>`);
    parts.push(`<span class="countdown" data-countdown data-countdown-part>&nbsp;</span>`);
  }
  if (hasSpots()) {
    parts.push(`<span class="strip-sep" aria-hidden="true">&middot;</span>`);
    parts.push(`<span class="strip-spots">${s.spots(CONFIG.SPOTS)}</span>`);
  }
  // shown when there is no countdown, and revealed by app.js when one expires
  parts.push(`<span class="strip-spots" data-countdown-fallback${live ? ' hidden' : ''}>${esc(s.statusLine)}</span>`);
  parts.push(`<span class="strip-cta">${esc(s.cta)}<span class="chev" aria-hidden="true">&rsaquo;</span></span>`);

  // .strip-slot holds the bar's height in the flow. When app.js pins the bar
  // under the header it goes position:fixed and the slot keeps its measured
  // height, so the document never changes height and CLS stays 0.
  return `<div class="strip-slot">
    <a id="offer-strip" class="sec on-dark" href="${t.offer.path}"${live ? ` data-countdown-end="${CONFIG.COUNTDOWN_END}"` : ''}>
      <span class="wrap strip-row">${parts.join('')}</span>
    </a>
  </div>`;
}

/* ── §1 Hero ─────────────────────────────────────────────────────────────── */
export function hero(t) {
  return `<section id="hero" class="sec-wide">
    <div class="wrap-wide">
      <h1 class="hero-h1">${t.hero.h1}</h1>
      <p class="lead">${esc(t.hero.lead)}</p>
      ${ctaRow(t, { centred: true })}
      <ul class="trust">${t.hero.trust.map((x) => `<li>${esc(x)}</li>`).join('')}</ul>
    </div>
  </section>`;
}

/* ── §1 + §2 together: the first screen ──────────────────────────────────
   On a large monitor the hero used to be sized by its content, so it ended
   early, the offer strip stranded itself mid-screen and §3 peeked through
   underneath. The two now share one `min-height: 100svh` flex column: the hero
   grows to fill whatever is left and the strip is pinned to the bottom of it,
   so the first viewport is exactly header, hero, strip and nothing else.
   `svh`, not `vh`, so mobile browser chrome cannot clip it. ─────────────── */
export function firstScreen(t) {
  return `<div class="first-screen">
${hero(t)}
${offerStrip(t)}
</div>`;
}

/* ── §3 The problem ──────────────────────────────────────────────────────── */
const PROBLEM_ART = [
  { src: '/assets/img/problem-1.webp', w: 106, h: 111 },
  { src: '/assets/img/problem-2.webp', w: 182, h: 105 },
  { src: '/assets/img/problem-3.webp', w: 118, h: 124 },
];

export function problem(t) {
  const cards = t.problem.cards.map((c, i) => `<article class="card-light problem-card">
      <div class="art"><img src="${PROBLEM_ART[i].src}" width="${PROBLEM_ART[i].w}" height="${PROBLEM_ART[i].h}" alt="" loading="lazy" decoding="async"></div>
      <h3 class="h3">${c.title}</h3>
      <p class="body">${esc(c.body)}</p>
    </article>`).join('');
  return `<section id="problem" class="sec">
    <div class="wrap">
      <p class="eyebrow">${esc(t.problem.eyebrow)}</p>
      <h2 class="h2">${t.problem.h2}</h2>
      <p class="lead">${esc(t.problem.lead)}</p>
      <div class="problem-grid">${cards}</div>
    </div>
  </section>`;
}

/* ── §4 What we do ───────────────────────────────────────────────────────── */
export function whatWeDo(t) {
  const blocks = t.wwd.blocks.map((b, i) => `<article class="wwd-block">
      <div class="wwd-num" aria-hidden="true">0${i + 1}</div>
      <h3 class="h3">${esc(b.title)}</h3>
      <p class="body">${esc(b.body)}</p>
    </article>`).join('');
  return `<section id="what-we-do" class="sec">
    <div class="wrap">
      <p class="eyebrow">${esc(t.wwd.eyebrow)}</p>
      <h2 class="h2">${t.wwd.h2}</h2>
      <p class="lead">${esc(t.wwd.lead)}</p>
      <div class="wwd-grid">${blocks}</div>
    </div>
  </section>`;
}

/* ── §5 What is included ─────────────────────────────────────────────────── */
export function included(t) {
  const cards = t.included.items.map((it, i) => `<article class="card-light icon-card">
      <img src="/assets/img/icon-${ICONS[i]}.webp" width="60" height="60" alt="" loading="lazy" decoding="async">
      <h3 class="h3">${esc(it.title)}</h3>
      <p class="body">${esc(it.body)}</p>
    </article>`).join('');
  return `<section id="included" class="sec">
    <div class="wrap">
      <p class="eyebrow">${esc(t.included.eyebrow)}</p>
      <h2 class="h2">${t.included.h2}</h2>
      <p class="lead">${esc(t.included.lead)}</p>
      <div class="icons-grid">${cards}</div>
    </div>
  </section>`;
}

/* ── §6 The journey.
      The sparkline is the board's own measured geometry (build-spec §7):
      1320px wide, 2.5px stroke, five 10px dots at 327.5px pitch over a
      39px band, dot y-centres 751.6 / 747.1 / 742.2 / 735.5 / 724.3 css,
      here expressed relative to the band. ─────────────────────────────── */
function sparkline() {
  const ys = [32.3, 27.8, 22.9, 16.2, 5.0];
  const xs = [5, 332.5, 660, 987.5, 1315];
  const pts = xs.map((x, i) => `${x},${ys[i]}`).join(' ');
  const dots = xs.map((x, i) => `<circle cx="${x}" cy="${ys[i]}" r="5" fill="#FF5F29"/>`).join('');
  return `<svg class="spark" viewBox="0 0 1320 39" width="1320" height="39" preserveAspectRatio="none" role="presentation" focusable="false">
      <polyline points="${pts}" fill="none" stroke="#FF5F29" stroke-width="2.5" vector-effect="non-scaling-stroke"/>${dots}
    </svg>`;
}

const JOURNEY_ART = ['/assets/img/journey-1.webp', '/assets/img/journey-2.webp', '/assets/img/journey-3.webp'];

export function journey(t) {
  const cards = t.journey.stages.map((s, i) => `<article class="journey-card">
      <img src="${JOURNEY_ART[i]}" width="343" height="296" alt="" loading="lazy" decoding="async">
      <p class="month">${esc(s.label)}</p>
      <h3 class="h3">${esc(s.title)}</h3>
      <p class="journey-figure">${s.figure}</p>
      <p class="body">${esc(s.body)}</p>
    </article>`).join('');
  return `<section id="journey" class="sec on-dark">
    <div class="wrap">
      <p class="eyebrow">${esc(t.journey.eyebrow)}</p>
      <h2 class="h2">${t.journey.h2}</h2>
      <p class="lead">${esc(t.journey.lead)}</p>
      <p class="site-label">${esc(t.journey.siteLabel)}</p>
      <div class="journey-grid">${cards}</div>
      ${sparkline()}
      <div class="journey-notes">
        <p>${esc(t.journey.precision)}</p>
        <p>${t.journey.baseline[0]}</p>
        <p>${t.journey.baseline[1]}</p>
      </div>
      <div class="journey-foot">
        <p class="journey-source">${t.journey.source}</p>
        <a class="btn btn-outline" href="${waHref}" rel="noopener" target="_blank">${esc(t.cta.whatsapp)}</a>
      </div>
    </div>
  </section>`;
}

/* ── §7 Our work.
      The plate is the site's own real monthly click series from
      design/proof-data.md, drawn as inline SVG the same way §6's sparkline
      is. Nothing is generated, smoothed or invented; a site with a single
      complete month gets an empty plate, because one month is not a curve. */
function workPlate(clicks) {
  const W = 270, H = 155, P = 20;
  if (!clicks || clicks.length < 3) {
    // No "First data month: August 2026" label any more — Ahmad called it "not
    // sexy". The empty plate is a bare dashed slot and the card's only
    // description is its "New project" tag.
    return `<div class="work-plate"></div>`;
  }
  const max = Math.max(...clicks), min = Math.min(...clicks);
  const span = max - min || 1;
  const step = (W - P * 2) / (clicks.length - 1);
  const pts = clicks.map((v, i) => `${(P + i * step).toFixed(1)},${(H - P - ((v - min) / span) * (H - P * 2)).toFixed(1)}`);
  const dots = pts.map((p) => { const [x, y] = p.split(','); return `<circle cx="${x}" cy="${y}" r="3.5" fill="#FF5F29"/>`; }).join('');
  return `<div class="work-plate"><svg viewBox="0 0 ${W} ${H}" role="presentation" focusable="false">
      <polyline points="${pts.join(' ')}" fill="none" stroke="#FF5F29" stroke-width="2.5" stroke-linejoin="round"/>${dots}
    </svg></div>`;
}

// Rebuilt as a slideshow 2026-09-24, to Ahmad's list:
//   * biggest number first (the order is fixed in data.mjs, not here);
//   * no sector labels and no date windows on the cards — one source line
//     under the whole section instead of eleven on the cards;
//   * roughly three noticeably bigger cards visible, auto-advancing.
// Accessibility: the track is a labelled, focusable scroll region (native
// arrow-key scrolling), every card is a real link in DOM order so Tab walks
// the eleven and the browser scrolls each into view, and the two buttons carry
// aria-labels over aria-hidden glyphs. app.js pauses the auto-advance on
// hover, on focus, on touch and off-screen, and never starts it at all under
// prefers-reduced-motion.
export function work(t) {
  const cards = WORK.map((c) => {
    const metric = c.isNew
      ? `<p class="work-metric work-tag">${esc(t.work.newTag)}</p>`
      : c.figure
        ? `<p class="work-metric"><span class="num">${esc(c.figure)}</span> ${esc(t.work.metricLabel)}</p>`
        : '';
    return `<a class="card-light work-card" href="${c.url}" rel="nofollow noopener" target="_blank">
      ${workPlate(c.clicks)}
      <p class="work-site">${esc(c.site).replace(/\.([a-z]+)$/, '<wbr>.$1')}</p>
      ${metric}
      <span class="work-link">${esc(t.work.linkLabel)}<span class="arrow" aria-hidden="true">&rarr;</span></span>
    </a>`;
  }).join('');
  return `<section id="work" class="sec">
    <div class="wrap">
      <p class="eyebrow">${esc(t.work.eyebrow)}</p>
      <h2 class="h2">${t.work.h2}</h2>
      <p class="lead">${esc(t.work.lead)}</p>
      <div class="work-slider" data-slider>
        <div class="work-track" id="work-track" data-track tabindex="0" role="group"
             aria-roledescription="carousel" aria-label="${esc(t.work.carouselLabel)}">${cards}</div>
        <div class="work-nav">
          <button class="slide-btn" type="button" data-slide="prev" aria-controls="work-track" aria-label="${esc(t.work.prev)}"><span aria-hidden="true">&lsaquo;</span></button>
          <button class="slide-btn" type="button" data-slide="next" aria-controls="work-track" aria-label="${esc(t.work.next)}"><span aria-hidden="true">&rsaquo;</span></button>
        </div>
      </div>
      <p class="work-source">${esc(t.work.source)}</p>
    </div>
  </section>`;
}

/* ── §8 FAQ ──────────────────────────────────────────────────────────────── */
// The approved board (s8, offer-3) draws the first row open, so the build ships
// the first row open too.
export function accordion(items, idPrefix) {
  return `<div class="faq-list">${items.map((q, i) => `<div class="faq-item${i === 0 ? ' open' : ''}">
      <button class="faq-q" type="button" aria-expanded="${i === 0 ? 'true' : 'false'}" aria-controls="${idPrefix}-a${i}">
        <span>${esc(q.q)}</span><span class="faq-icon" aria-hidden="true"></span>
      </button>
      <div class="faq-a" id="${idPrefix}-a${i}">${esc(q.a)}</div>
    </div>`).join('')}</div>`;
}

export function faq(t) {
  return `<section id="faq" class="sec">
    <div class="wrap">
      <p class="eyebrow">${esc(t.faq.eyebrow)}</p>
      <h2 class="h2">${esc(t.faq.h2)}</h2>
      ${accordion(t.faq.items, 'faq')}
    </div>
  </section>`;
}

/* ── §9 Final call ───────────────────────────────────────────────────────── */
export function finalCall(t, { id = 'final', h2, lead } = {}) {
  return `<section id="${id}" class="sec final on-dark">
    <div class="wrap">
      <h2>${h2 || t.final.h2}</h2>
      <p class="lead">${esc(lead || t.final.lead)}</p>
      ${ctaRow(t, { centred: true })}
    </div>
  </section>`;
}

/* ══ Offer page sections — built from design/boards/offer-1..3.png with the
     homepage's tokens, type scale and components. ══════════════════════════ */

export function offerHero(t) {
  const o = t.offerPage;
  const live = hasCountdown();
  const boxes = ['d', 'h', 'm', 's'].map((k, i) => `<div class="count-box">
      <b data-count="${k}">&nbsp;</b><span>${esc(o.units[i])}</span>
    </div>`).join('');
  return `<section id="offer-hero" class="sec-wide on-dark"${live ? ` data-countdown-end="${CONFIG.COUNTDOWN_END}"` : ''}>
    <div class="wrap-wide">
      <span class="strip-pill">${esc(o.pill)}</span>
      <h1>${o.h1}</h1>
      <p class="lead">${esc(o.lead)}</p>
      ${live ? `<p class="count-label" data-countdown-part>${esc(o.countdownLabel)}</p>
      <div class="count-boxes" data-countdown-part>${boxes}</div>` : ''}
      <p class="offer-spots" data-countdown-fallback${live ? ' hidden' : ''}>${esc(o.statusLine)}</p>
      ${hasSpots() ? `<p class="offer-spots">${o.spots(CONFIG.SPOTS)}</p>` : ''}
      ${ctaRow(t, { centred: true })}
    </div>
  </section>`;
}

export function offerIncluded(t) {
  const b = t.offerPage.b2;
  const rows = b.items.map((label, i) => `<li class="offer-row">
      <img src="/assets/img/icon-${ICONS[i]}.webp" width="60" height="60" alt="" loading="lazy" decoding="async">
      <span class="t">${esc(label)}</span>
    </li>`).join('');
  return `<section id="offer-included" class="sec offer-sec plain on-dark">
    <div class="wrap">
      <h2>${esc(b.title)}</h2>
      <p class="lead">${esc(b.intro)}</p>
      <ul class="offer-rows">${rows}</ul>
    </div>
  </section>`;
}

export function offerEligibility(t) {
  const b = t.offerPage.b3;
  const rows = b.items.map((label, i) => `<li class="offer-row ruled">
      <span class="n" aria-hidden="true">${i + 1}</span><span class="t">${esc(label)}</span>
    </li>`).join('');
  return `<section id="offer-eligibility" class="sec offer-sec tint on-dark">
    <div class="wrap">
      <h2>${esc(b.title)}</h2>
      <p class="lead">${esc(b.intro)}</p>
      <ul class="offer-rows">${rows}</ul>
      ${hasSpots() ? `<p class="offer-spots">${t.offerPage.spots(CONFIG.SPOTS)}</p>` : ''}
    </div>
  </section>`;
}

export function offerNoContract(t) {
  const b = t.offerPage.b4;
  return `<section id="offer-nocontract" class="sec">
    <div class="wrap">
      <h2>${esc(b.title)}</h2>
      <p>${esc(b.body)}</p>
    </div>
  </section>`;
}

export function offerAfter(t) {
  const b = t.offerPage.b5;
  const rows = b.items.map((label, i) => `<li class="offer-row">
      <span class="n" aria-hidden="true">${i + 1}</span><span class="t">${esc(label)}</span>
    </li>`).join('');
  return `<section id="offer-after" class="sec offer-sec tint on-dark">
    <div class="wrap">
      <h2>${esc(b.title)}</h2>
      <p class="lead">${esc(b.intro)}</p>
      <ul class="offer-rows">${rows}</ul>
    </div>
  </section>`;
}

export function offerFaq(t) {
  const b = t.offerPage.b6;
  return `<section id="offer-faq" class="sec on-dark">
    <div class="wrap">
      <h2>${esc(b.title)}</h2>
      ${accordion(b.items, 'ofaq')}
    </div>
  </section>`;
}

/* ══ The four secondary pages — About, Contact, Blog, Terms ══════════════
   No new visual language. Every block below is one of the homepage's already
   approved components: the `.eyebrow → h → .lead` head, the `.card-light`
   hairline card, the §4 outline numeral block, the §5 icon card, the §7 card
   hairline and the §9 final-call band. Words come from design/copy-pages.md
   via data.mjs. Layout for the blog list is design/boards/blog-B.png.
   ═══════════════════════════════════════════════════════════════════════ */

/* The head of every secondary page: the hero rhythm (eyebrow 16 → H1 28 →
   lead) on `--bg-light`, start aligned. blog-B.png measures its heading ink at
   71.3 css from ascender to descender, i.e. an 80px Alexandria 600 — exactly
   the locked §2 H2 — so these H1s take `--fs-h2`, not the hero's 86. */
export function pageHead(t, { eyebrow, h1, lead, note }) {
  return `<section id="page-head" class="sec page-head">
    <div class="wrap">
      ${eyebrow ? `<p class="eyebrow">${esc(eyebrow)}</p>` : ''}
      <h1 class="h2">${h1}</h1>
      ${lead ? `<p class="lead">${esc(lead)}</p>` : ''}
      ${note ? `<p class="page-note">${note}</p>` : ''}
    </div>
  </section>`;
}

/* ── About A2: the principle. §3's three hairline cards, 18px gaps. ── */
export function aboutPrinciple(t) {
  const b = t.about.principle;
  const cards = b.blocks.map((c) => `<article class="card-light about-card">
      <h3 class="h3">${esc(c.title)}</h3>
      <p class="body">${esc(c.body)}</p>
    </article>`).join('');
  return `<section id="principle" class="sec">
    <div class="wrap">
      <p class="eyebrow">${esc(b.eyebrow)}</p>
      <h2 class="h2">${b.h2}</h2>
      <p class="lead">${esc(b.lead)}</p>
      <div class="problem-grid">${cards}</div>
    </div>
  </section>`;
}

/* ── About A3: the same six deliverables as §5 and offer B2, titles only. ── */
export function aboutDeliver(t) {
  const b = t.about.deliver;
  const cards = b.items.map((title, i) => `<article class="card-light icon-card compact">
      <img src="/assets/img/icon-${ICONS[i]}.webp" width="60" height="60" alt="" loading="lazy" decoding="async">
      <h3 class="h3">${esc(title)}</h3>
    </article>`).join('');
  return `<section id="deliver" class="sec">
    <div class="wrap">
      <h2 class="h2">${b.h2}</h2>
      <p class="lead">${esc(b.intro)}</p>
      <div class="icons-grid">${cards}</div>
      <p class="under-link"><a class="text-link" href="${b.link.href}">${esc(b.link.label)}<span class="chev" aria-hidden="true">&rsaquo;</span></a></p>
    </div>
  </section>`;
}

/* ── About A4: two honest exclusions, on §4's outline numerals. ── */
export function aboutNotDo(t) {
  const b = t.about.notdo;
  const blocks = b.items.map((body, i) => `<article class="wwd-block">
      <div class="wwd-num" aria-hidden="true">0${i + 1}</div>
      <p class="body">${esc(body)}</p>
    </article>`).join('');
  return `<section id="not-do" class="sec">
    <div class="wrap">
      <h2 class="h2">${esc(b.h2)}</h2>
      <div class="wwd-grid two">${blocks}</div>
    </div>
  </section>`;
}

/* ── About A5: facts only, filled from company.md. Digit runs are dir="ltr"
      and Western numerals, per build-spec §10. ── */
export function aboutCompany(t) {
  const b = t.about.company;
  const rows = b.rows.map((r) => {
    if (r.from === 'address') {
      return `<div class="fact"><dt>${esc(r.label)}</dt><dd>${addressLine(t, t.footer.address)}</dd></div>`;
    }
    // `Q8 block` and `q8block.com` are Latin runs on an RTL page. The isolation
    // goes on a span inside the cell, not on the cell: `dir="ltr"` on the <dd>
    // would also flip its text-align and leave those two values hanging off
    // the far side of the column.
    const value = r.ltr && t.lang === 'ar' ? `<span dir="ltr">${esc(r.value)}</span>` : esc(r.value);
    return `<div class="fact"><dt>${esc(r.label)}</dt><dd>${value}</dd></div>`;
  }).join('');
  return `<section id="company" class="sec">
    <div class="wrap">
      <h2 class="h2">${esc(b.h2)}</h2>
      <dl class="card-light facts">${rows}</dl>
    </div>
  </section>`;
}

// Every digit run inside the Arabic address is isolated so the bidi algorithm
// cannot reorder `004` and `14` against the words around them (build-spec §10).
function addressLine(t, value) {
  if (t.lang !== 'ar') return esc(value);
  return esc(value).replace(/\d+/g, (d) => `<span dir="ltr">${d}</span>`);
}

/* ── Contact C2 + C3: the call block and the WhatsApp block. No form, no
      field of any kind — the absence is the design and C1 says so. ── */
export function contactBlocks(t) {
  const c = t.contact;
  return `<section id="reach" class="sec">
    <div class="wrap">
      <div class="reach-grid">
        <article class="card-light reach-card">
          <h2 class="h3">${esc(c.call.title)}</h2>
          <p class="body">${esc(c.call.body)}</p>
          <p class="reach-number"><a href="${telHref}" dir="ltr">${esc(NAP.phoneDisplay)}</a></p>
          <p class="reach-cta"><a class="btn btn-primary" href="${telHref}">${esc(t.cta.call)}</a></p>
        </article>
        <article class="card-light reach-card">
          <h2 class="h3">${esc(c.whatsapp.title)}</h2>
          <p class="body">${esc(c.whatsapp.body)}</p>
          <p class="reach-cta"><a class="btn btn-outline" href="${waHref}" rel="noopener" target="_blank">${esc(t.cta.whatsapp)}</a></p>
        </article>
      </div>
    </div>
  </section>`;
}

/* ── Contact C4: the office block and the map.
      NOTHING from Google loads until the reader taps. The closed state is
      drawn here in HTML, CSS and one inline SVG; app.js swaps in the iframe on
      the tap and reveals the caption and the directions link. The shell keeps
      its size across the swap, so the tap costs zero layout shift. ── */
export function contactOffice(t) {
  const c = t.contact;
  const q = encodeURIComponent(NAP.mapQuery);
  const embed = `https://www.google.com/maps?q=${q}&output=embed`;
  const open = `https://www.google.com/maps/search/?api=1&query=${q}`;
  return `<section id="office" class="sec">
    <div class="wrap">
      <h2 class="h2">${esc(c.office.title)}</h2>
      <div class="office-grid">
        <div class="card-light office-card">
          <p class="office-name">${esc(c.office.name)}</p>
          <p class="body">${addressLine(t, t.footer.address)}</p>
        </div>
        <figure class="map" data-map data-src="${embed}" data-frame-title="${esc(c.map.frameTitle)}">
          <div class="map-shell">
            <div class="map-closed" data-map-closed>
              <svg class="map-pin" viewBox="0 0 48 48" width="48" height="48" role="presentation" focusable="false">
                <circle cx="24" cy="24" r="21" fill="none" stroke="#0A0A0C" stroke-width="2" stroke-dasharray="5 5"/>
                <path d="M24 13c-4.4 0-8 3.6-8 8 0 6 8 14 8 14s8-8 8-14c0-4.4-3.6-8-8-8z" fill="#FF5F29"/>
                <circle cx="24" cy="21" r="3.2" fill="#FEFEFE"/>
              </svg>
              <p class="h3">${esc(c.map.title)}</p>
              <p class="body">${esc(c.map.line)}</p>
              <button class="btn btn-primary" type="button" data-map-btn>${esc(c.map.button)}</button>
            </div>
          </div>
          <figcaption class="map-foot" data-map-foot hidden>
            <span>${esc(c.map.caption)}</span>
            <a class="text-link" href="${open}" rel="noopener" target="_blank">${esc(c.map.directions)}<span class="chev" aria-hidden="true">&rsaquo;</span></a>
          </figcaption>
        </figure>
      </div>
    </div>
  </section>`;
}

/* ── Terms T1–T7: seven plain blocks on hairlines, measure capped. ── */
export function termsBody(t) {
  const blocks = t.terms.blocks.map((b) => `<section class="term">
      <h2 class="h3">${esc(b.title)}</h2>
      <p class="body">${esc(b.body)}</p>
      ${b.link ? `<p class="under-link"><a class="text-link" href="${b.link.href}">${esc(b.link.label)}<span class="chev" aria-hidden="true">&rsaquo;</span></a></p>` : ''}
    </section>`).join('');
  return `<section id="terms" class="sec">
    <div class="wrap"><div class="terms-body">${blocks}</div></div>
  </section>`;
}

/* ── Blog B2: the card. Six fields and nothing else — title, excerpt, date,
      author, computed read time, read more. No category chips, no tags, no
      share icons, no comment counts. The author link is the only outbound
      link on the list page and carries rel="author". ── */
function cardMeta(t, post) {
  return `<p class="card-meta">${post.dateLabel}<span class="dot" aria-hidden="true">&middot;</span>${post.readLabel}<span class="dot" aria-hidden="true">&middot;</span><a class="byline" href="${post.authorUrl}" rel="author">${esc(t.blog.by)}</a></p>`;
}

/* The list page, layout B, approved 2026-09-24 (design/boards/blog-B.png):
   one wide featured panel (art one side, label, title, excerpt and a read-more
   link the other), a hairline rule, then the remaining five as a two column
   list with small square thumbnails and a hairline between rows.
   Both grids are logical, so the art and the thumbnails sit inline-start:
   left under `dir="ltr"`, right under `dir="rtl"`, with no RTL-specific rule. */
export function blogList(t, posts) {
  const [lead, ...rest] = posts;
  const rows = rest.map((p) => `<li class="post-row">
      <a class="row-art" href="${p.path}" tabindex="-1" aria-hidden="true">
        <img src="${p.thumb}" width="240" height="240" alt="" loading="lazy" decoding="async">
      </a>
      <div class="row-text">
        ${cardMeta(t, p)}
        <h3 class="h3"><a href="${p.path}">${esc(p.title)}</a></h3>
        <p class="row-excerpt">${esc(p.excerpt)}</p>
        <a class="read-more" href="${p.path}">${esc(t.blog.readMore)}<span class="chev" aria-hidden="true">&rsaquo;</span></a>
      </div>
    </li>`).join('');

  return `<section id="posts" class="sec">
    <div class="wrap">
      <article class="feature">
        <a class="feature-art" href="${lead.path}" tabindex="-1" aria-hidden="true">
          <img src="${lead.art}" width="1344" height="752" alt="" fetchpriority="high" decoding="async">
        </a>
        <div class="feature-text">
          ${cardMeta(t, lead)}
          <h2 class="feature-title"><a href="${lead.path}">${esc(lead.title)}</a></h2>
          <p class="body">${esc(lead.excerpt)}</p>
          <a class="read-more" href="${lead.path}">${esc(t.blog.readMore)}<span class="chev" aria-hidden="true">&rsaquo;</span></a>
        </div>
      </article>
      <ul class="post-rows">${rows}</ul>
    </div>
  </section>`;
}

/* ── Blog B3: the post page. A readable measure, not the full container: the
      aesthetics audit found 86-character lines a real problem elsewhere on
      this site, so the article column is capped at 780px. ── */
export function postArticle(t, post, { prev, next }) {
  const nav = [
    prev ? `<a class="post-step prev" href="${prev.path}">
        <span class="step-label">${esc(t.blog.prev)}</span>
        <span class="step-title">${esc(prev.title)}</span>
      </a>` : '<span></span>',
    next ? `<a class="post-step next" href="${next.path}">
        <span class="step-label">${esc(t.blog.next)}</span>
        <span class="step-title">${esc(next.title)}</span>
      </a>` : '<span></span>',
  ].join('');

  return `<article id="post" class="sec post">
    <div class="wrap">
      <nav class="crumbs" aria-label="${esc(t.blog.crumbLabel)}">
        <a href="${t.paths.home.path}">${esc(t.blog.home)}</a><span class="chev" aria-hidden="true">&rsaquo;</span><a href="${t.paths.blog.path}">${esc(t.blog.blog)}</a>
      </nav>
      <h1 class="post-title">${esc(post.title)}</h1>
      ${cardMeta(t, post)}
      <img class="post-art" src="${post.art}" width="1344" height="752" alt="" fetchpriority="high" decoding="async">
      <div class="prose">${post.html}</div>
      <p class="under-link"><a class="text-link" href="${t.paths.blog.path}">${esc(t.blog.back)}<span class="chev" aria-hidden="true">&rsaquo;</span></a></p>
      <nav class="post-nav" aria-label="${esc(t.blog.more)}">${nav}</nav>
    </div>
  </article>`;
}

export { esc, telHref, waHref, hasCountdown, hasSpots };
