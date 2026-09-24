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

export function header(t, page) {
  const home = page === 'offer' ? t.offer : t.home;
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

export function footer(t) {
  const year = new Date().getFullYear();
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
          <a href="${t.home.otherPath}" hreflang="${t.other}" lang="${t.other}">${esc(t.otherLabel)}</a>
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
  parts.push(`<span class="strip-sep" aria-hidden="true">&middot;</span>`);
  parts.push(`<a class="strip-link" href="${t.offer.path}">${esc(s.link)}<span class="chev" aria-hidden="true">&rsaquo;</span></a>`);

  return `<section id="offer-strip" class="sec on-dark"${live ? ` data-countdown-end="${CONFIG.COUNTDOWN_END}"` : ''}>
    <div class="wrap strip-row">${parts.join('')}</div>
  </section>`;
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
function workPlate(clicks, emptyLabel) {
  const W = 270, H = 155, P = 20;
  if (!clicks || clicks.length < 3) {
    return `<div class="work-plate"${emptyLabel ? ` data-empty="${esc(emptyLabel)}"` : ''}></div>`;
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

export function work(t) {
  const cards = WORK.map((c) => {
    const hasCurve = Boolean(c.clicks && c.clicks.length >= 3);
    const period = c.period ? c.period[t.lang] : '';
    const metric = c.isNew
      ? `<p class="work-metric">${esc(t.work.newTag)}</p>`
      : c.figure
        ? `<p class="work-metric"><span class="num">${esc(c.figure)}</span> ${esc(t.work.metricLabel)}</p>`
        : '';
    return `<a class="card-light work-card" href="${c.url}" rel="nofollow noopener" target="_blank">
      ${workPlate(c.clicks, hasCurve ? '' : period)}
      <p class="work-caption">${esc(c.sector[t.lang])}</p>
      <p class="work-site">${esc(c.site).replace(/\.([a-z]+)$/, '<wbr>.$1')}</p>
      ${metric}
      ${hasCurve && period ? `<p class="work-period">${esc(period)}</p>` : ''}
      <span class="work-link">${esc(t.work.linkLabel)}<span class="arrow" aria-hidden="true">&rarr;</span></span>
    </a>`;
  }).join('');
  return `<section id="work" class="sec">
    <div class="wrap">
      <p class="eyebrow">${esc(t.work.eyebrow)}</p>
      <h2 class="h2">${t.work.h2}</h2>
      <p class="lead">${esc(t.work.lead)}</p>
      <div class="work-grid">${cards}</div>
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

export { esc, telHref, waHref, hasCountdown, hasSpots };
