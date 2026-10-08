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

/* The hero's Google rating mark, §23 then §24. It replaced the four trust
   points, one of which ("hosting, domain and security included") was an OFFER
   deliverable that had drifted into the brand hero. Ahmad: "this is great real
   estate to put authority and trustability."

   §24, 2026-09-25: the row that briefly also carried a strip of SEO tool logos
   under the label "the tools we work with" is cut back to this mark alone.
   Ahmad: "I told you we do not want to mention the tools that we are using...
   that's not trust." Nothing about tools, partners or software appears anywhere
   on the page any more, so the mark is now the whole row: CENTRED and a size
   step larger, because it no longer shares the space.

   The mark is five filled stars and Google's own wordmark, linked to Q8Block's
   own Business Profile — NO review count (he has few reviews and does not want
   the number shown) and NO review text.

   THE WORDMARK IS AN IMAGE, NOT COLOURED TEXT, AND THAT IS DELIBERATE. Ahmad
   asked for Google's own per-letter colours. As live text the yellow `o` is
   ~1.8:1 on the hero's #F5F6F7 and fails WCAG even at the large-text threshold,
   which would cost the 100 accessibility score; WCAG does not apply to an image
   of a logotype, so the image keeps the colours AND the score. The file is
   Google's official SVG, fetched byte-for-byte — see design/brand-marks/.

   THE STARS ARE VISUAL ONLY. Nothing here emits `aggregateRating` or `Review`
   structured data and nothing ever should: showing stars is fine, marking them
   up as a rating on a handful of reviews is what earns a manual action. There
   is no rating value, no count and no review body anywhere in this markup.
   The link carries its own `aria-label`, so a screen reader hears that this is
   a five star rating on Google even though neither word is drawn on screen. */

const STAR = 'M12 17.27 18.18 21l-1.64-7.03L22 9.24l-7.19-.62L12 2 9.19 8.62 2 9.24l5.46 4.73L5.82 21z';

function stars(n = 5) {
  const S = 24, GAP = 4, W = n * S + (n - 1) * GAP;
  const paths = Array.from({ length: n }, (_, i) =>
    `<path d="${STAR}" transform="translate(${i * (S + GAP)})"/>`).join('');
  return `<svg class="cred-stars" viewBox="0 0 ${W} ${S}" width="${W}" height="${S}" fill="currentColor" aria-hidden="true" focusable="false">${paths}</svg>`;
}

function credentials(t) {
  const c = t.hero.cred;
  // Rendered only when Ahmad's own profile URL is configured. With GBP_URL
  // null the whole row disappears rather than linking somewhere wrong — there
  // is nothing else left in it to carry.
  if (!CONFIG.GBP_URL) return '';
  // alt="" on the wordmark: the link's aria-label is the accessible name and it
  // already contains "Google", so alt text here would only be announced twice.
  // With no visible text inside the link, axe's label-content-name-mismatch
  // cannot fire. The intrinsic 74x24 is the SVG's own viewBox — both dimensions
  // are present, so the first screen cannot shift as the image decodes.
  return `<div class="cred">
      <a class="cred-google" href="${CONFIG.GBP_URL}" target="_blank" rel="noopener" aria-label="${esc(c.googleLabel)}">
        ${stars()}<img class="cred-word" src="/assets/img/google-wordmark.svg" width="74" height="24" alt="" decoding="async">
      </a>
    </div>`;
}

export function hero(t) {
  return `<section id="hero" class="sec-wide">
    <div class="wrap-wide">
      <h1 class="hero-h1">${t.hero.h1}</h1>
      <p class="lead">${esc(t.hero.lead)}</p>
      ${ctaRow(t, { centred: true })}
      ${credentials(t)}
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
const SLIDE_ORDER = ['ss1', 'new1', 'ss2', 'ss3', 'new2', 'ss4'];
export function whatWeDo(t) {
  const sl = t.wwd.slides;
  const slides = SLIDE_ORDER.map((n) => {
    const isNew = n.startsWith('new');
    return `<div class="ss-slide"><img src="/assets/img/slide-${n}.webp" width="960" height="417" alt="${esc(isNew ? sl.altNew : sl.alt)}" decoding="async" fetchpriority="low">${isNew ? `<span class="ss-stamp">${esc(sl.stamp)}</span>` : ''}</div>`;
  }).join('');
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
      <div class="ss" role="group" aria-roledescription="carousel" aria-label="${esc(sl.label)}" data-ss><div class="ss-track" data-ss-track>${slides}</div></div>
      <div class="wwd-grid">${blocks}</div>
    </div>
  </section>`;
}

/* ── §5 WHAT IS INCLUDED IS DELETED, 2026-10-01 (build-spec §28.3).
      Ahmad: "the what's included section is not needed because the one above it
      is what we present, which is the same thing. So remove that. What we
      present, immediately what follows is the how we work." There is no
      `included()` renderer, no `#included` section and no `included` copy block
      any more; §4 `whatWeDo()` is followed directly by §6 `journey()`.

      `ICONS` is still imported and still used TWICE below — offer B2
      (`offerIncluded`) and About A3 (`aboutDeliver`) — so none of the six icon
      files became unreferenced and none was deleted. `.icons-grid`,
      `.icon-card` and `.icon-card.compact` stay in styles.css for the same
      reason; only the `#included`-scoped rules came out. ── */

/* ── §6 The journey. REBUILT AROUND THE GRAPH, 2026-09-30 (build-spec §26.1).
      Ahmad: the Search Console graph is the centrepiece and the three
      illustrations become small icons underneath it that tell the story. What
      was three large charcoal cards — illustration, month label, title, body
      and a click figure each, then a precision note, a baseline paragraph and a
      source caption — is now headline, graph, three compact beats.

      THE FORENSIC DETAIL IS GONE ON PURPOSE AND MUST NOT BE RESTORED. Ahmad,
      twice: "don't use details like kwtclean or from what month to what month."
      The client name, the date range, the "fifth full data month" note, the
      carwashkw baseline and the source caption are all out of THIS section's
      copy. It is a deliberate reversal of the earlier checkability framing, on
      the grounds that prospects do not verify and the detail costs more than it
      earns. The figures printed inside the image stay exactly as exported:
      that is the image's own axis, not our copy. The offer page's B2b still
      carries the full provenance, which is where a reader who wants it looks.

      THE GRAPH IS THE SAME ASSET AS B2b — one unedited export, never
      re-derived or re-cropped — and it keeps B2b's behaviour exactly: below
      1000px it pans inside `.proof-pan` instead of shrinking (scaled into a
      350px box its headline figures render about 5px tall), and the wrapper is
      `direction: ltr` so an RTL scroller cannot open on the tail of the chart
      instead of on the four figures at its left edge. See §25.6.

      The section still diverges from journey-D.png, which draws three cards and
      a sparkline. That divergence is Ahmad-instructed, the same status as
      §21.2's sparkline removal. ─────────────────────────────────────────── */
const JOURNEY_ART = ['/assets/img/journey-1.webp', '/assets/img/journey-2.webp', '/assets/img/journey-3.webp'];

export function journey(t) {
  const g = t.journey.graph;
  const beats = t.journey.stages.map((s, i) => `<li class="journey-beat">
      <img src="${JOURNEY_ART[i]}" width="343" height="296" alt="" loading="lazy" decoding="async">
      <div class="journey-beat-text">
        <h3 class="h3">${esc(s.title)}</h3>
        <p class="body">${esc(s.body)}</p>
      </div>
    </li>`).join('');
  return `<section id="journey" class="sec on-dark">
    <div class="wrap">
      <p class="eyebrow">${esc(t.journey.eyebrow)}</p>
      <h2 class="h2">${t.journey.h2}</h2>
      <p class="lead">${esc(t.journey.lead)}</p>
      <figure class="proof-shot journey-graph">
        <div class="proof-pan" tabindex="0" role="group" aria-label="${esc(g.panLabel)}">
          <img src="/assets/img/proof-kwtclean-gsc.webp" width="${PROOF_W}" height="${PROOF_H}"
               alt="${esc(g.alt)}" loading="lazy" decoding="async">
        </div>
        <p class="proof-hint" aria-hidden="true">${esc(g.hint)}</p>
      </figure>
      <ul class="journey-beats">${beats}</ul>
        <!-- Call and WhatsApp always ship as a pair. This block had WhatsApp alone,
             which read as an unfinished row beside every other CTA on the site. -->
      <div class="journey-foot btn-row">
        <a class="btn btn-primary" href="${telHref}">${esc(t.cta.call)}</a>
        <a class="btn btn-outline" href="${waHref}" rel="noopener" target="_blank">${esc(t.cta.whatsapp)}</a>
      </div>
    </div>
  </section>`;
}

/* ── §7 Our work.
      THE PLATE IS THE CLIENT'S OWN LOGO (Ahmad, 2026-09-25). It used to be
      the site's real monthly click series drawn as inline SVG, and a site
      with fewer than three complete months had no curve to draw, so the four
      newest clients rendered an empty dashed plate — the "many boxes are
      empty" he complained about. Every client has a logo, so every card is
      full. `workPlate()`'s chart generator is DELETED. §6's own chart was a
      separate function and nothing in this pass went near §6.

      Every logo is the same 640x334 canvas (build-spec §20), so one explicit
      width/height covers all eleven and the set cannot shift layout. The
      alt is empty on purpose: the card already prints the site name as real
      text, so an alt here would read the client's name twice in a row.

      NOT `loading="lazy"`, and this is the one place on the page that breaks
      §7's below-the-fold rule. Eight of the eleven cards are clipped sideways
      by the carousel, so a lazy image there is only fetched as its card slides
      in — measured: 5 of 11 loaded when §7 came into view and still only 7
      after twelve seconds of auto-advance. A card that arrives with no logo is
      the empty box this whole pass exists to remove. `fetchpriority="low"`
      instead, so the 143 kB queues behind the hero and costs nothing above the
      fold. */
const LOGO_W = 640, LOGO_H = 334;
function workPlate(c) {
  return `<div class="work-plate"><img src="/assets/img/logo-${c.logo}.webp" width="${LOGO_W}" height="${LOGO_H}" alt="" decoding="async" fetchpriority="low"></div>`;
}

// Rebuilt as a slideshow 2026-09-24, to Ahmad's list:
//   * biggest number first (the order is fixed in data.mjs, not here) — since
//     2026-09-25 that number is the site's total impressions, not a growth
//     percentage;
//   * no sector labels and no date windows on the cards — one source line
//     under the whole section instead of eleven on the cards;
//   * roughly three noticeably bigger cards visible, auto-advancing.
// Accessibility: the track is a labelled, focusable scroll region (native
// arrow-key scrolling), every card is a real link in DOM order so Tab walks
// the eleven and the browser scrolls each into view, and the two buttons carry
// aria-labels over aria-hidden glyphs. app.js pauses the auto-advance on
// hover, on focus, on touch and off-screen, and never starts it at all under
// prefers-reduced-motion. It also LOOPS ENDLESSLY (Ahmad, 2026-09-25: "the
// slideshow needs to be infinite"): app.js clones the card set once at runtime
// and normalises scrollLeft by one set length at the seam, so the wrap is a
// jump between two pixel-identical views. The clones are aria-hidden and
// tabindex="-1", so the eleven real cards are still the only eleven tab stops
// and the only eleven the accessibility tree sees.
/* The card's figure: the site's TOTAL IMPRESSIONS, summed HERE from the real
   monthly series in data.mjs, never typed as a total. Ahmad, 2026-09-25: "my
   best performing is carwashkw and it shows 32% growth. What is this growth
   thing? It sounds very weird ... I think a good metric is total impressions."
   A percentage is measured off a base, so it ranked the strongest site last;
   a total does not have a base and cannot be moved by choosing one.

   Western digits with a comma group, the same convention as every other number
   on the site (§6 prints 7 / 165 / 531). `.work-metric .num` already carries
   `direction: ltr; unicode-bidi: isolate`, so 245,600 reads left to right
   inside the Arabic sentence without a wrapper here. */

// Compact thousands: 245,600 -> 246K. Ahmad, 2026-09-25: the full grouped number
// plus a six word label was "so much text" on the card. One number, one word.
const compactNum = (n) => (n >= 1000 ? Math.round(n / 1000) + "K" : String(n));
const totalImpressions = (c) => (c.impressions || []).reduce((a, b) => a + b, 0);
const groupNum = (n) => String(n).replace(/\B(?=(\d{3})+(?!\d))/g, ',');

/* THE LEAD AND THE SOURCE LINE ARE DELETED, 2026-10-01 (build-spec §28.2).
   Ahmad: "don't write what the number is or any of that." The lead explained
   that each site was built from scratch, what the figure on the card is, that
   it is summed across complete months and that recent projects are tagged; the
   source line explained where the figures came from. Both were DELETED, not
   shortened — a trimmed sentence that still explains the mechanism is the same
   mistake. `t.work.lead` and `t.work.source` no longer exist in data.mjs, so
   re-adding either markup line throws rather than printing "undefined".
   The section is eyebrow, headline, carousel, and nothing else. The derivation
   lives in copy.md's tables, which is the record, not the page. */
export function work(t) {
  const cards = WORK.map((c) => {
    const total = totalImpressions(c);
    const metric = c.isNew
      ? `<p class="work-metric work-tag">${esc(t.work.newTag)}</p>`
      : total
        ? `<p class="work-metric"><span class="num">${compactNum(total)}</span> ${esc(t.work.metricLabel)}</p>`
        : '';
    return `<a class="card-light work-card" href="${c.url}" rel="nofollow noopener" target="_blank">
      ${workPlate(c)}
      <p class="work-site">${esc(c.site).replace(/\.([a-z]+)$/, '<wbr>.$1')}</p>
      ${metric}
      <span class="work-link">${esc(t.work.linkLabel)}<span class="arrow" aria-hidden="true">&rarr;</span></span>
    </a>`;
  }).join('');
  return `<section id="work" class="sec">
    <div class="wrap">
      <p class="eyebrow">${esc(t.work.eyebrow)}</p>
      <h2 class="h2">${t.work.h2}</h2>
      <div class="work-slider" data-slider>
        <div class="work-track" id="work-track" data-track tabindex="0" role="group"
             aria-roledescription="carousel" aria-label="${esc(t.work.carouselLabel)}">${cards}</div>
        <div class="work-nav">
          <button class="slide-btn" type="button" data-slide="prev" aria-controls="work-track" aria-label="${esc(t.work.prev)}"><span aria-hidden="true">&lsaquo;</span></button>
          <button class="slide-btn" type="button" data-slide="next" aria-controls="work-track" aria-label="${esc(t.work.next)}"><span aria-hidden="true">&rsaquo;</span></button>
        </div>
      </div>
    </div>
  </section>`;
}

/* ── §7b The price. Between §7 Our work and §8 FAQ. Keeps its `#pricing` id
      and its position; both are linked to and neither moves.

      BUILT TO design/boards/pricing-v2-A.png (build-spec §30). pricing-v2-B,
      pricing-v2-C, pricing-light and pricing-dark are DEAD boards.
      Eyebrow, headline, a company-size switch (Small / Medium / Large), then
      three packages: label, name, price + period, hairline, three check lines,
      the site's call button. The middle card is weighted by an orange top edge
      and NOTHING else: no badge, no ribbon, no scale, no "most popular".

      THE SWITCH IS NATIVE RADIO INPUTS, NOT SCRIPT. A fieldset of three
      `name="psize"` radios with visible labels as the pills: radio-group
      semantics, arrow-key operation and the checked state come from the
      browser. All nine prices are in the markup; CSS shows the checked size
      via :has() (styles.css §7b). Small is `checked` in the HTML, so with no
      script, and in a browser without :has(), the Small prices show and are
      correct. Every size's price occupies the same line box, so switching
      never changes a card's height.

      THE OFFER IS NOT IN THIS SECTION. No $500 one time, no six months, no
      countdown, no link to /offer/. The CTA is the site's existing call label
      on the site's tel: href.

      DOM ORDER IS ALWAYS LOW TO HIGH; the grid follows the document direction,
      so the cards read low to high left to right on /en/ and right to left on /. */
const PSIZE = ['s', 'm', 'l'];
export function pricing(t) {
  const p = t.pricing;
  const sw = p.sizes.map((label, i) => `<input class="psw-in" type="radio" name="psize" id="psize-${PSIZE[i]}" value="${PSIZE[i]}"${i === 0 ? ' checked' : ''}><label class="psw-pill" for="psize-${PSIZE[i]}">${esc(label)}</label>`).join('');
  const cards = p.plans.map((plan, i) => {
    const amounts = plan.prices.map((v, k) => `<span class="pa pa-${PSIZE[k]}">${esc(v)}</span>`).join('');
    const features = `<ul class="plan-features">${plan.features.map((f) => `<li>${esc(f)}</li>`).join('')}</ul>`;
    return `<li class="plan${i === 1 ? ' plan-featured' : ''}">
      <p class="plan-tag">${esc(plan.tag)}</p>
      <h3 class="plan-name">${esc(plan.name)}</h3>
      <p class="plan-price"><span class="plan-amount">${amounts}</span> <span class="plan-unit">${esc(p.tierUnit)}</span></p>
      ${features}
      <div class="plan-cta">
        <a class="btn btn-primary" href="${telHref}">${esc(t.cta.call)}</a>
      </div>
    </li>`;
  }).join('');
  return `<section id="pricing" class="sec">
    <div class="wrap">
      <p class="eyebrow">${esc(p.eyebrow)}</p>
      <h2 class="h2">${p.h2}</h2>
      <fieldset class="psw"><legend class="vh">${esc(p.sizesLabel)}</legend>${sw}</fieldset>
      <ul class="plan-row">${cards}</ul>
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

/* The anchor, added 2026-09-30 when the offer stopped being free.

   Two rows carrying the SAME NUMBER with DIFFERENT UNITS, nothing between them
   and no third element competing: "Normal price / from $500 per month" over
   "This offer / $500 one time, covers six months". Ahmad has a competitor
   pitching his prospects at $500 a month, so the arithmetic is the argument and
   the reader does it himself in about a second.

   THERE IS NO "you save $2,500" LINE AND THERE NEVER WILL BE. A savings claim
   reads as a discount gimmick and it makes the reader argue with the figure
   instead of with the competitor's quote. Two numbers, side by side, nothing else.

   `price.note` is the anti-confusion line and it is the reason this block exists
   at all: if a reader leaves thinking it is $500 a MONTH for six months, the offer
   and the trust both die. It is written in the shortest words there are and it is
   repeated wherever the number appears (hero, B2 intro, B4, two FAQ answers).

   The two pairs are a <dl>, not a table: they are label/value pairs, and that is
   also what gives a screen reader the pairing without any ARIA. The note sits
   OUTSIDE the <dl> on purpose — a <dl> may only contain dt, dd and div, so a <p>
   inside it is invalid HTML. */
function priceAnchor(p) {
  if (!p) return '';
  return `<div class="price-anchor">
      <dl class="pa-pair">
        <div class="pa-row pa-was">
          <dt>${esc(p.anchorLabel)}</dt><dd>${esc(p.anchorValue)}</dd>
        </div>
        <div class="pa-row pa-now">
          <dt>${esc(p.offerLabel)}</dt><dd>${esc(p.offerValue)}</dd>
        </div>
      </dl>
      <p class="pa-note">${esc(p.note)}</p>
    </div>`;
}

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
      ${priceAnchor(o.price)}
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

/* B2b, the proof block. Added 2026-09-30, and it is the one place on this page
   where a performance figure appears — copy.md Part B used to forbid them here
   outright. Ahmad overrode that when the offer stopped being free: a reader who
   is being asked for money wants to see what the six months do before he pays.

   The image is an UNEDITED Google Search Console export for kwtclean.com, a real
   client site, kept byte-for-byte at design/proof-shots/ and converted to WebP at
   its own pixel size by that folder's derive.mjs. It is never cropped further,
   retouched or recoloured, and no number in it is altered — see SOURCES.md there.

   Explicit width and height on the image element, so the box is reserved before
   the file decodes and CLS stays 0. It is `loading="lazy"`: it sits well below
   the fold, which is the opposite of §20.6's first-viewport rule and right here.

   IT PANS ON A PHONE INSTEAD OF SHRINKING, AND THAT IS THE WHOLE POINT OF IT.
   The export is 2243px of a wide chart. Scaled to fit a 350px phone box it
   renders "1.99K" about 5px tall, which makes the one piece of evidence on the
   page unreadable on the device 99% of the traffic uses — a proof nobody can
   read is not proof. So below 1000px the image keeps a 1000px floor inside a
   horizontally scrollable wrapper and the reader swipes it. It is NEVER cropped
   to fit: this is a real export and the crop it has is the one Ahmad supplied.

   The wrapper is `tabindex="0"` with a role and a label, because axe requires a
   scrollable region to be keyboard reachable (`scrollable-region-focusable`);
   that also gives arrow-key panning for free. The hint line is `aria-hidden`:
   it tells a sighted phone reader the panel scrolls, and a screen reader
   already has the whole panel described in the image's alt.

   The section names the client and both dates, because the page's credibility
   rests on a reader being able to go and check. Nothing beside it averages the
   figures, projects them, promises them to the reader or calls them typical. */
const PROOF_W = 2243, PROOF_H = 582;
export function offerProof(t) {
  const b = t.offerPage.proof;
  return `<section id="offer-proof" class="sec offer-sec plain on-dark">
    <div class="wrap">
      <h2>${esc(b.title)}</h2>
      <p class="lead">${esc(b.intro)}</p>
      <figure class="proof-shot">
        <div class="proof-pan" tabindex="0" role="group" aria-label="${esc(b.panLabel)}">
          <img src="/assets/img/proof-kwtclean-gsc.webp" width="${PROOF_W}" height="${PROOF_H}"
               alt="${esc(b.alt)}" loading="lazy" decoding="async">
        </div>
        <p class="proof-hint" aria-hidden="true">${esc(b.hint)}</p>
        <p class="proof-meta">${esc(b.meta)}</p>
        <figcaption>${esc(b.caption)}</figcaption>
      </figure>
      <p class="proof-source">${esc(b.source)}</p>
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

/* B5, rebuilt 2026-09-30. It used to be three numbered options (continue on a
   plan / keep the site on a small fee / stop). It is now the three monthly tiers
   Ahmad named, $500, $1,000 and $1,500, plus stopping.

   PRICES ONLY, AND THAT IS DELIBERATE. Ahmad gave the three figures and NOT what
   differs between them. Nothing here invents a service level, a page count, an
   hours figure or a feature list to fill the tiles out, because an invented tier
   spec on a page whose whole argument is that its figures are checkable is the
   worst possible place to make something up. `notes[0]` says what is true instead:
   the contents are agreed on the call, which is also what copy-pages.md T6 says of
   everything project specific. Fill these in only when Ahmad supplies them. */
export function offerAfter(t) {
  const b = t.offerPage.b5;
  const tiers = b.tiers.map((price) => `<li class="tier">
      <span class="tier-price">${esc(price)}</span>
      <span class="tier-unit">${esc(b.tierUnit)}</span>
    </li>`).join('');
  const notes = b.notes.map((n) => `<p>${esc(n)}</p>`).join('');
  return `<section id="offer-after" class="sec offer-sec tint on-dark">
    <div class="wrap">
      <h2>${esc(b.title)}</h2>
      <p class="lead">${esc(b.intro)}</p>
      <ul class="tier-row">${tiers}</ul>
      <div class="tier-notes">${notes}</div>
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

/* The board draws `Read more →` with a long thin arrow, not the `›` chevron
   the rest of the site uses. U+2192 is NOT in either Alexandria subset's
   unicode-range (the Latin face carries U+2191 and U+2193 and stops), so
   typing the character would silently fall out of the brand font on the one
   line Ahmad singled out. It is drawn instead, in `currentColor`, and
   mirrored under `dir="rtl"` by CSS. */
/* blog-B.png's arrow is 14.5 css wide against the 26 this used to draw, and
   its gap to the text is 9.1. U+2192 is in neither Alexandria subset's
   unicode-range, so it stays an inline SVG in currentColor rather than being
   typed and silently lost to a fallback font. */
const ARROW = '<svg class="arw" viewBox="0 0 15 7" width="15" height="7" aria-hidden="true" focusable="false"><path d="M0 3.5h12.6M9.7 0.7l2.9 2.8-2.9 2.8" fill="none" stroke="currentColor" stroke-width="1.3" stroke-linecap="square"/></svg>';

/* The list page, layout B, approved 2026-09-24 and rebuilt as an exact replica
   2026-09-25 (design/boards/blog-B.png, measured in build-spec §19).

   Ahmad: "I want it to be exactly like the image you showed me, which is B.
   Everything in it. Even the titles and everything." So this markup is the
   board's, not copy-pages.md §B2's six-field card:

     featured panel — a full-bleed orange art block one side; a small orange
       CATEGORY label, the title, the excerpt and an orange `Read more →` the
       other. No date, no read time, no byline: the board draws none.
     five rows — a small orange square, an UPPERCASE date, the title and a
       two line excerpt. No read-more on the rows; the board draws it on the
       featured panel only, and with the byline gone each row now holds exactly
       ONE link, so the title link stretches over the whole row instead.

   §B2's "no category chips" and its read-more-on-every-card were overridden by
   Ahmad for this page specifically; both overrides are recorded in
   copy-pages.md §B2 so the next agent does not revert them as drift.

   Both grids are logical, so the art and the thumbnails sit inline-start:
   left under `dir="ltr"`, right under `dir="rtl"`, with no RTL-specific rule. */
export function blogList(t, { featured, rows: posts }) {
  const rows = posts.map((p) => `<li class="post-row">
      <img class="row-art" src="${p.thumb.src}" width="${p.thumb.w}" height="${p.thumb.h}" alt="" loading="lazy" decoding="async">
      <div class="row-text">
        <p class="row-date">${p.dateShort}</p>
        <h3 class="row-title"><a href="${p.path}">${esc(p.title)}</a></h3>
        <p class="row-excerpt">${esc(p.excerpt)}</p>
      </div>
    </li>`).join('');

  return `<section id="posts" class="sec">
    <div class="wrap">
      <article class="feature">
        <img class="feature-art" src="${featured.wide.src}" width="${featured.wide.w}" height="${featured.wide.h}" alt="" fetchpriority="high" decoding="async">
        <div class="feature-text">
          <p class="feature-cat">${esc(featured.category)}</p>
          <h2 class="feature-title"><a href="${featured.path}">${esc(featured.title)}</a></h2>
          <p class="feature-excerpt">${esc(featured.excerpt)}</p>
          <a class="read-more" href="${featured.path}">${esc(t.blog.readMore)}<span class="vh">: ${esc(featured.title)}</span>${ARROW}</a>
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
      <img class="post-art" src="${post.art.src}" width="${post.art.w}" height="${post.art.h}" alt="" fetchpriority="high" decoding="async">
      <div class="prose">${post.html}</div>
      <p class="under-link"><a class="text-link" href="${t.paths.blog.path}">${esc(t.blog.back)}<span class="chev" aria-hidden="true">&rsaquo;</span></a></p>
      <nav class="post-nav" aria-label="${esc(t.blog.more)}">${nav}</nav>
    </div>
  </article>`;
}

/* ── first load: every page opens on a full-screen loading panel ─────────────
   Until the first screen is ready the whole screen (header included) is one
   panel in that first screen's own colour, with a small icon loader in the
   middle: the orange Q8 box of the logo (48 px phone, 56 px desktop) breathing
   softly. All inline (first thing in <body>), so it is the first paint.
   Ready = the faces of the header and first-screen words loaded + every image
   on the first screen decoded; event-driven, with one 8 s safety cap. Then
   performance.mark('hero-ready') and html.open: the panel fades off the
   finished screen. Until then everything under it is laid out but not painted,
   so the webfont settling there is never seen and never counted as a shift.
   No JS: html never gets .js, the panel never shows, the page is as before.
   Reduced motion: the icon stands still, short fade.
   The CSS lives here and not in styles.css because the two legacy checklist
   pages carry their own stylesheet and get the same panel at copy time.
   Comments stay out of the strings below: they ship. ── */
const FL_MARK = '<g class="fl-m"><rect width="67" height="56" fill="#FF5F29"/><g fill="none" stroke="#fff" stroke-width="5.4"><ellipse cx="20.5" cy="27" rx="7.6" ry="9.2"/><path d="M24 32.5 30.5 40"/><circle cx="46" cy="21.4" r="5"/><circle cx="46" cy="33.6" r="6.6"/></g></g>';
export const FL_CSS = `.fl{display:none}
.js .fl{display:flex;position:fixed;inset:0;z-index:400;align-items:center;justify-content:center;transition:opacity .35s ease}
.js:not(.open) body>:not(.fl){visibility:hidden}
.open .fl{opacity:0;pointer-events:none}
.done .fl{display:none}
.fl-light{background:#F2F3F5}.fl-white{background:#FEFEFE}.fl-dark{background:#101012}.fl-deep{background:linear-gradient(180deg,#0d161c,#080e13)}
.fl svg{width:48px;height:40px;overflow:visible}
.fl .fl-m{transform-origin:33.5px 28px;animation:fl-p 1.5s ease-in-out infinite}
@keyframes fl-p{0%,100%{opacity:.55;transform:scale(.9)}50%{opacity:1;transform:scale(1)}}
@media (min-width:1024px){.fl svg{width:56px;height:47px}}
@media (prefers-reduced-motion:reduce){.fl *{animation:none!important;transition:none!important}.js .fl{transition-duration:.2s}}`;
export const flPanel = (tone, bg = '') => `<div class="fl fl-${tone}" aria-hidden="true"${bg ? ` data-bg="${bg}"` : ''}><svg viewBox="0 0 67 56" focusable="false">${FL_MARK}</svg></div>`;
// in <head>: the class that lets the panel show at all
export const FL_HEAD = `<script>document.documentElement.classList.add('js')</script>`;
// right after the panel: the safety cap starts with the page
export const FL_START = `<script>window.flT=setTimeout(function(){window.flO&&flO()},8000)</script>`;
// end of <body>: the first screen exists; wait for its faces and images, then open
export const flBoot = (faces) => `<script>(function(){var d=document,r=d.documentElement,p=d.querySelector('.fl'),on=0;
if(!p)return;if(!window.Promise){r.classList.add('open','done');return}
var open=window.flO=function(){if(on)return;on=1;clearTimeout(window.flT);requestAnimationFrame(function(){if(window.performance&&performance.mark)performance.mark('hero-ready');
p.addEventListener('transitionend',function(e){if(e.target===p)r.classList.add('done')});r.classList.add('open')})};
if(!window.flT)window.flT=setTimeout(open,8000);
var H=innerHeight,w=[],t='',f=${JSON.stringify(faces)};
[].forEach.call(d.querySelectorAll('body>:not(.fl):not(script)'),function(e){if(e.getBoundingClientRect().top<H)t+=e.textContent});
t=t.replace(/\\s+/g,' ');
[].forEach.call(d.querySelectorAll('body img'),function(i){var b=i.getBoundingClientRect();if(b.width&&b.top<H&&b.bottom>0&&i.decode)w.push(i.decode())});
if(p.dataset.bg){var b=new Image();b.src=p.dataset.bg;if(b.decode)w.push(b.decode())}
if(d.fonts&&d.fonts.load)f.forEach(function(s){w.push(d.fonts.load(s,t||'a'))});
Promise.all(w).then(open,open)})()</script>`;

export { esc, telHref, waHref, hasCountdown, hasSpots };
