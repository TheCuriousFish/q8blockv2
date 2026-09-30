// Q8Block — all copy for both pages in both locales.
// Words come from design/copy.md and NOWHERE else. Never transcribe text off a board.
// Layout, sizes, colours and spacing come from design/build-spec.md.

/* ─────────────────────────────────────────────────────────────────────────
   BUILD CONFIG — Ahmad sets these two. They are configuration, not copy.
   Both the homepage offer strip (§2) and the offer hero (B1) must still
   render a complete, sensible band when either one is switched off:
     COUNTDOWN_END = null  -> the countdown disappears, the strip/hero falls
                              back to "التسجيل مفتوح الآن / Registration is open now"
     SPOTS         = null  -> the "N seats left" line disappears
   ───────────────────────────────────────────────────────────────────────── */
export const CONFIG = {
  // Registration close date. ISO 8601 with the Kuwait/Riyadh offset (+03:00).
  // Set to null (or a date in the past) to ship the page with no countdown.
  //
  // AHMAD SETS THE REAL DATE. The value below is a placeholder: ten days out
  // from 2026-09-24, because a 98-day countdown reads as no deadline at all
  // ("should be less than 10. Ten days", 2026-09-24). Change this one line and
  // the homepage strip and offer hero both follow.
  COUNTDOWN_END: '2026-10-04T23:59:59+03:00',

  // Seats left. Ahmad's working number is around 9. Set to null to hide the line.
  // "per city" came off the line on 2026-09-25: Ahmad — "don't mention each
  // city. It says just nine seats left. That's it."
  SPOTS: 9,

  // Q8Block's OWN Google Business Profile. The hero's trust row (§23, reworked
  // in §24) is five stars plus Google's own wordmark, linked out to it; with
  // this set to null the mark — and with it the whole row, since the tools
  // strip that used to share it is gone — disappears, so the page can never
  // link to a profile that is not his.
  //
  // This is the share link Google generated for the profile (Knowledge Graph
  // /g/11n3dddmb8, شركة كويت بلوك — the registered Arabic name in company.md).
  // Do NOT "improve" it into a maps.google.com/?cid= or place_id URL: nobody
  // has his CID, and a constructed link that resolves to the wrong business is
  // far worse than a redirect.
  //
  // The stars are a VISUAL mark only. There is no aggregateRating and no
  // Review structured data anywhere in this build and there must never be:
  // marking up a rating on a handful of reviews is what earns a manual action.
  // No review count is shown either — Ahmad's decision, he has few reviews.
  // Google rating mark in the hero. OFF at Ahmad's instruction, 2026-09-25:
  // "the Google five star just looks basic and desperate". The space is meant
  // to stay empty, which also gives the hero the breathing room he asked for.
  // This is a deliberate removal, NOT a missing value. Do not restore it
  // without him asking. His real profile URL, verified against the registered
  // Arabic name شركة كويت بلوك, is kept here so it is not hunted for again:
  //   https://share.google/JMWP620SaaXf2GqNL
  GBP_URL: null,
};

/* IndexNow key. Generated once, 2026-09-24 (32-char hex, `crypto.randomBytes(16)`),
   and locked here so a rebuild can never issue a second, different key — IndexNow
   keys must stay stable at the same filename for as long as the site pings that
   endpoint. build.mjs writes it to site/<key>.txt verbatim. Recorded in
   design/build-spec.md §17. The site is not deployed and IndexNow is never pinged
   by this build; the key file is only prepared for when Ahmad decides to go live. */
export const INDEXNOW_KEY = '57376d59e41f6fbe081224d68d86aa8e';

/* ── NAP, from company.md. Fills slots only; never a source of copy. ── */
export const NAP = {
  phoneDisplay: '+965 94139666',
  phoneTel: '+96594139666',
  whatsapp: 'https://wa.me/96594139666',
  website: 'q8block.com',
  origin: 'https://q8block.com',
  // The one query string the contact page's map uses, in both locales. It is
  // the English NAP from company.md and nothing else — no coordinates, no
  // place id, nothing invented. Google is not contacted until the reader taps.
  mapQuery: 'Nasser Falih Shnaz Al Subaie Building, Street 14, Block 004, Mangaf, Al Ahmadi Governorate, Kuwait',
};

/* ── Section 6 build data: the five real Google Search Console rows for
      kwtclean.com. The page prints three of them; June and July exist so
      the curve between month two and month six is continuous. ── */
export const JOURNEY_ROWS = [
  { month: 'April 2026', clicks: 7 },
  { month: 'May 2026', clicks: 165 },
  { month: 'June 2026', clicks: 354 },
  { month: 'July 2026', clicks: 452 },
  { month: 'August 2026', clicks: 531 },
];

/* ── Section 7: eleven cards, every SEO client. The figure on a card is the
      site's TOTAL IMPRESSIONS — the number of times it came up in Google
      search results — summed at build time from `impressions`, the site's real
      monthly series out of design/proof-data.md. No total is typed anywhere, so
      no total can drift away from its own rows. `clicks` is the site's real
      monthly click series and stays as the record.

      REVISED 2026-09-25 (Ahmad: "my best performing is carwashkw and it shows
      32% growth. What is this growth thing? It sounds very weird. Mashame3 is
      883% growth. We need a new metric... I think a good metric is total
      impressions."). THE GROWTH PERCENTAGE IS GONE from every card.

      He is right twice over. A percentage is measured off a base, so it
      punishes the mature site and flatters the small one: carwashkw.com, the
      strongest site of the eleven by sustained volume, carried the SMALLEST
      number on the wall (+32%) while mashame3.com, six months old, carried
      +883%. And "growth" between two months the card does not name is jargon a
      business owner cannot check. A total impression count is one plain number
      per site, it cannot be moved by choosing a base month, and sorting by it
      puts the sites in the order a reader would call correct.

      `months` is how many complete months are summed and `window` names them.
      Windows differ per site because the sites are different ages —
      kwtclean.com has five complete months, kuwaityclean.com has thirteen — so
      the section's ONE source line says the window is per site and that partial
      months are excluded. September 2026 is partial everywhere and is in no
      total.

      ORDER: biggest total first. Ahmad's 2026-09-24 instruction, unchanged,
      now applied to impressions instead of a percentage.

      The four newest clients have ONE complete month each, between 160 and
      1,614 impressions. They keep the `مشروع جديد` / `New project` tag rather
      than a number: 160 beside 245,600 undercuts the whole wall, and the tag is
      the honest description of a site whose data is not in yet.

      movingcompanykw.com is no longer the odd card with neither figure nor tag.
      Under a growth percentage it could have neither — 27 clicks in August 2025
      fell to 11 in August 2026, and every positive window started from one of
      its own troughs — but a total is not a window, so its real 52,080
      impressions across thirteen complete months goes on the card like
      everyone else's.

      `logo` names the client's own logo, derived into
      src/img/logo-<logo>.webp from the source kept in
      design/client-logos/<domain>.<ext>. Every client has one, so every card is
      full; build-spec §20 records which asset each one came from. The plate is
      a logo and is never a chart again (Ahmad, 2026-09-25). ── */
export const WORK = [
  { site: 'kuwaityclean.com', url: 'https://kuwaityclean.com/', logo: 'kuwaityclean',
    months: 13, window: { ar: 'أغسطس 2025 إلى أغسطس 2026', en: 'August 2025 to August 2026' },
    impressions: [31710, 19720, 14389, 17278, 18103, 16640, 17752, 12717, 14151, 15353, 22256, 23818, 21713],
    clicks: [83, 65, 79, 89, 125, 127, 188, 107, 83, 154, 330, 372, 354] },
  { site: 'carwashkw.com', url: 'https://carwashkw.com/', logo: 'carwashkw',
    months: 13, window: { ar: 'أغسطس 2025 إلى أغسطس 2026', en: 'August 2025 to August 2026' },
    impressions: [23024, 21414, 16167, 15900, 12382, 13902, 13961, 13107, 12765, 15451, 17831, 15155, 16796],
    clicks: [334, 389, 321, 287, 240, 211, 227, 199, 225, 287, 437, 386, 440] },
  { site: 'q8carwash.com', url: 'https://q8carwash.com/', logo: 'q8carwash',
    months: 13, window: { ar: 'أغسطس 2025 إلى أغسطس 2026', en: 'August 2025 to August 2026' },
    impressions: [778, 3826, 4996, 9493, 13032, 12894, 11377, 12824, 9130, 10280, 9787, 7278, 6928],
    clicks: [8, 21, 43, 105, 171, 193, 158, 148, 97, 118, 104, 72, 80] },
  { site: 'kwtclean.com', url: 'https://kwtclean.com/', logo: 'kwtclean',
    months: 5, window: { ar: 'أبريل 2026 إلى أغسطس 2026', en: 'April 2026 to August 2026' },
    impressions: [956, 11155, 22101, 25564, 27932],
    clicks: [7, 165, 354, 452, 531] },
  { site: 'kwcarwash.com', url: 'https://kwcarwash.com/', logo: 'kwcarwash',
    months: 13, window: { ar: 'أغسطس 2025 إلى أغسطس 2026', en: 'August 2025 to August 2026' },
    impressions: [24, 31, 14, 23, 825, 3181, 6012, 6816, 6245, 10053, 7796, 6930, 6182],
    clicks: [0, 0, 0, 0, 23, 46, 72, 82, 97, 106, 108, 105, 85] },
  { site: 'movingcompanykw.com', url: 'https://movingcompanykw.com/', logo: 'movingcompanykw',
    months: 13, window: { ar: 'أغسطس 2025 إلى أغسطس 2026', en: 'August 2025 to August 2026' },
    impressions: [17452, 11898, 5303, 2230, 782, 464, 793, 905, 1801, 1630, 227, 4211, 4384],
    clicks: [27, 15, 10, 6, 4, 0, 0, 1, 15, 13, 4, 11, 11] },
  { site: 'mashame3.com', url: 'https://mashame3.com/', logo: 'mashame3',
    months: 6, window: { ar: 'مارس 2026 إلى أغسطس 2026', en: 'March 2026 to August 2026' },
    impressions: [1364, 3013, 3995, 7098, 8173, 8791],
    clicks: [12, 31, 83, 86, 122, 118] },
  /* One complete month each, August 2026: betikcleaner 1,614 impressions,
     anharpest 768, alghadeerclean 531, ragwaclean 160. Recorded in copy.md's
     derivation table, deliberately not printed on the card. */
  { site: 'betikcleaner.com', url: 'https://betikcleaner.com/', logo: 'betikcleaner', isNew: true },
  { site: 'anharpest.com', url: 'https://anharpest.com/', logo: 'anharpest', isNew: true },
  { site: 'alghadeerclean.com', url: 'https://alghadeerclean.com/', logo: 'alghadeerclean', isNew: true },
  { site: 'ragwaclean.com', url: 'https://ragwaclean.com/', logo: 'ragwaclean', isNew: true },
];

/* ── PRICES. The offer changed on 2026-09-30: it is no longer free.
      $500 ONE TIME buys the first six months. The service's normal price starts
      at $500 PER MONTH, and that anchor is the point — a prospect comparing this
      against a competitor charging $500 a month has to see the two numbers side
      by side. After the six months the client picks $500, $1,000 or $1,500 a month.

      WHY EVERY PRICE GOES THROUGH `ltr()`. `$500` written plainly inside an Arabic
      sentence renders as `500$`: the Unicode bidi algorithm resolves European digits
      after an Arabic letter to Arabic-Number, which leaves the `$` as a neutral and
      pushes it to the wrong side of the run. U+2066 / U+2069 (LRI / PDI) isolate the
      run so it renders `$500` — and, unlike a `<span dir="ltr">`, invisible characters
      survive `esc()`, so these strings can still be escaped like any other copy.
      Never write a bare `$` price into an Arabic string. ── */
export const ltr = (s) => `⁦${s}⁩`;
const P = {
  six: ltr('$500'),          // the one-time price of the six months
  month: ltr('$500'),        // the anchor, and tier 1
  t2: ltr('$1,000'),
  t3: ltr('$1,500'),
};

/* ── Section 5 / offer B2: the six deliverables, in copy.md's order. Icon
      files are design/icons/v2/<name>-sq.png (512x512, transparent, trimmed to
      a 476px ink box), converted to WebP at 240x240 in src/img/icon-<name>.webp
      and rendered in the locked 60x60 slot.
      The first set, design/icons/*.png, was 240x179 landscape and opaque: at
      60x60 it letterboxed and read as a grey smudge. Those files stay on disk
      for reference and are no longer referenced by the build. ── */
export const ICONS = [
  'website-build', 'service-area-pages', 'google-visibility',
  'ai-visibility', 'backlinks-authority', 'hosting-security',
];

export const COPY = {
  /* ═══════════════════════════ ARABIC ═══════════════════════════ */
  ar: {
    lang: 'ar', dir: 'rtl', other: 'en', otherLabel: 'English',
    home: { path: '/', otherPath: '/en/' },
    offer: { path: '/offer/', otherPath: '/en/offer/' },
    /* Every page's own {path, otherPath} pair, in one place: the canonical, the
       two hreflang alternates, the header language link and the sitemap entry
       all read from here, so they cannot drift apart. Kept under `paths`
       because the copy blocks below already own the names `about`, `contact`,
       `blog` and `terms`. */
    paths: {
      home: { path: '/', otherPath: '/en/' },
      offer: { path: '/offer/', otherPath: '/en/offer/' },
      about: { path: '/about/', otherPath: '/en/about/' },
      contact: { path: '/contact/', otherPath: '/en/contact/' },
      blog: { path: '/blog/', otherPath: '/en/blog/' },
      terms: { path: '/terms/', otherPath: '/en/terms/' },
      post: (slug) => ({ path: `/blog/${slug}/`, otherPath: `/en/blog/${slug}/` }),
    },
    months: ['يناير', 'فبراير', 'مارس', 'أبريل', 'مايو', 'يونيو', 'يوليو', 'أغسطس', 'سبتمبر', 'أكتوبر', 'نوفمبر', 'ديسمبر'],

    meta: {
      home: {
        title: 'نبني موقعك ليجدك عملاؤك في جوجل والذكاء الاصطناعي | Q8 block',
        description: 'نبني لشركات الخدمات المحلية موقعًا كاملًا بصفحة مستقلة لكل خدمة ولكل منطقة، ثم نعمل على ظهوره في نتائج بحث جوجل وفي إجابات الذكاء الاصطناعي.',
        ogAlt: 'موقع إلكتروني يظهر في نتائج البحث المحلية وفي إجابات الذكاء الاصطناعي',
      },
      offer: {
        title: 'عملاء جدد من محركات البحث والذكاء الاصطناعي | Q8 block',
        description: 'عملاء جدد من محركات البحث والذكاء الاصطناعي لشركات الخدمات في السعودية. دفعة واحدة 500 دولار تغطي أول ستة أشهر. السعر المعتاد يبدأ من 500 دولار شهريًا.',
        ogAlt: 'عرض Q8 block: عملاء جدد من محركات البحث والذكاء الاصطناعي',
      },
      about: {
        title: 'نبني المواقع التي نتحمل مسؤوليتها | Q8 block',
        description: 'نبني لشركات الخدمات المحلية موقعًا كاملًا، ولا نعمل إلا على المواقع التي نبنيها بأنفسنا، لأن الأساس التقني هو ما يحدد ظهور الموقع في بحث جوجل وفي إجابات الذكاء الاصطناعي.',
        ogAlt: 'Q8 block، بناء المواقع لشركات الخدمات المحلية',
      },
      contact: {
        title: 'تواصل معنا | Q8 block',
        description: 'اتصل بنا أو راسلنا على واتساب. رقم الهاتف وعنوان المكتب وخريطة تُفتح عند طلبها. لا يوجد نموذج على هذه الصفحة.',
        ogAlt: 'رقم هاتف Q8 block وعنوان المكتب',
      },
      blog: {
        title: 'مقالات لأصحاب الأنشطة الخدمية | Q8 block',
        description: 'مقالات عملية عن الظهور في بحث جوجل وفي إجابات الذكاء الاصطناعي، مكتوبة لصاحب نشاط خدمي، دون مصطلحات تقنية.',
        ogAlt: 'مقالات Q8 block لأصحاب الأنشطة الخدمية',
      },
      terms: {
        title: 'الشروط والأحكام | Q8 block',
        description: 'ما تشمله خدمتنا وما لا تشمله، بلغة واضحة: بناء الموقع، والاستضافة والنطاق والحماية، وملف نشاطك على جوجل الذي يبقى لك.',
        ogAlt: 'شروط وأحكام خدمة Q8 block',
      },
    },

    /* ── 0. Header ── */
    /* Rebuilt 2026-09-24. Ahmad: "I hate navigation scrollies. When I click on
       something and then it scrolls I hate that. Remove all navigation."
       Every in-page #anchor is gone from the header and the footer, and so is
       `scroll-behavior: smooth`. The offer left the nav as well — it lives in
       the banner directly under the hero. Five real pages only. */
    nav: [
      { label: 'الرئيسية', href: '/' },
      { label: 'من نحن', href: '/about/' },
      { label: 'المدونة', href: '/blog/' },
      { label: 'الشروط والأحكام', href: '/terms/' },
      { label: 'تواصل معنا', href: '/contact/' },
    ],
    cta: { call: 'اتصل الآن', whatsapp: 'واتساب' },
    menuOpen: 'القائمة', menuClose: 'إغلاق',
    skip: 'تخطَّ إلى المحتوى',

    /* ── 1. Hero ── */
    hero: {
      /* Ahmad's own hook line, 2026-09-24. Deliberately Gulf colloquial —
         `تبي` not `هل تريد` — and it ends on a question mark. It is the ONLY
         colloquial line on the site; every other Arabic string stays MSA.
         Do not "correct" this to MSA. The highlight stays on `يجدونك`. */
      h1: 'تبي عملاءك <span class="hl">يجدونك</span><br class="brk"> في جوجل وفي الذكاء الاصطناعي؟',
      /* Ahmad's own line, 2026-09-25, verbatim. It replaces the three-clause
         paragraph that stood here: NP Digital's hero runs ONE line and this one
         was a paragraph. Do not lengthen it back. */
      lead: 'نضعك في نتائج جوجل وفي إجابات الذكاء الاصطناعي، حيث يبحث عميلك',
      /* The four trust points are gone (§23). One of them, "الاستضافة والنطاق
         والحماية علينا", was an OFFER deliverable sitting in the brand hero —
         it only got there when "بدون عقد" had to be pulled.

         §24: the tools strip that shared this row is gone too. Ahmad: "I told
         you we do not want to mention the tools that we are using... that's not
         trust." There is NO toolsLabel any more and no wording about tools,
         partners, subscriptions or software goes back into this row.

         One string is left: the accessible name of the Google mark. It has to
         say what the mark means, because the page draws five stars and the
         Google wordmark and no words at all — so a screen reader would
         otherwise hear only "Google". It names the rating, never a count. */
      cred: {
        googleLabel: 'تقييم خمس نجوم على Google',
      },
    },

    /* ── 2. Offer strip ──
       Rebuilt 2026-09-24. The separate `الشروط والتفاصيل` row is deleted:
       Ahmad wanted everything on ONE row and the whole bar clickable, with a
       real CTA inside that row. `cta` is a navigation label, not a third
       contact CTA — the only two contact labels are still اتصل الآن / واتساب. */
    strip: {
      pill: 'عرض محدود',
      line: `ستة أشهر بـ${P.six} مرة واحدة`,
      countdownLabel: 'يغلق التسجيل خلال',
      units: ['يوم', 'ساعة', 'دقيقة', 'ثانية'],
      spots: (n) => `<span dir="ltr">${n}</span> مقاعد متبقية`,
      statusLine: 'التسجيل مفتوح الآن',
      cta: 'اطلع على العرض',
    },

    /* ── 3. The problem ── */
    problem: {
      eyebrow: 'المشكلة',
      h2: 'ملفك على جوجل يعمل<br class="brk"> <span class="hl">وما عندك موقع إلكتروني؟</span>',
      lead: 'ملفك على جوجل يضعك على الخريطة داخل نطاق ضيق حول عنوانك، وهذا كل ما يستطيعه. الموقع يأخذ الطلب نفسه ويوسعه: كل منطقة تخدمها، وكل سؤال يكتبه العميل قبل أن يتصل، وكل إجابة تقدمها مساعدات الذكاء الاصطناعي. الفارق بين الاثنين هو عمل قائم لا يصلك اليوم.',
      cards: [
        { title: 'الخريطة تتوقف عند حدود حيّك', body: 'ملف النشاط التجاري يظهر في نطاق ضيق حول عنوانك المسجل. الموقع الإلكتروني يظهر في كل مدينة وكل حي تستهدفه بصفحة مخصصة.' },
        { title: 'المنافس يجيب قبلك', body: 'عندما يريد العميل التفاصيل، تجيبه صفحة المنافس. السؤال نفسه يُطرح، وأنت غائب عن الإجابة.' },
        { title: 'الذكاء الاصطناعي لا يجد ما يقتبسه', body: 'مساعدات الذكاء الاصطناعي تقتبس صفحات مكتوبة ومفهرسة. بلا موقع، لا يوجد نص يمكن الاستشهاد به عنك.' },
      ],
    },

    /* ── 4. What we do ── */
    wwd: {
      eyebrow: 'ما نقدمه',
      h2: 'نبني الموقع،<br class="brk"> ثم نجعل عملاءك <span class="hl">يجدونه</span>',
      lead: 'لا نعمل على مواقع بناها غيرنا. الأساس التقني هو ما يحدد النتيجة، ولذلك نصمم الموقع ونبنيه بأنفسنا، ثم نتحمل مسؤولية ظهوره في نتائج البحث وفي إجابات الذكاء الاصطناعي.',
      blocks: [
        { title: 'نصمم ونبني', body: 'تصميم وبرمجة موقع كامل من الصفر، بصفحة مستقلة لكل خدمة ولكل منطقة تخدمها، بسرعة تحميل عالية وبنية تقنية سليمة.' },
        { title: 'نجعل عملاءك يجدونك', body: 'تهيئة داخلية وتقنية، ومحتوى محلي مكتوب لكل صفحة، حتى تظهر صفحاتك للعميل في نتائج بحث جوجل، وتصبح قابلة للاقتباس في إجابات مساعدات الذكاء الاصطناعي.' },
        { title: 'نُبقيه يعمل وينمو', body: 'الاستضافة والنطاق والحماية والتحديثات التقنية تبقى علينا، ويستمر بناء الروابط وسلطة النطاق شهرًا بعد شهر، مع متابعة شهرية لظهور الصفحات.' },
      ],
    },

    /* ── 5. What is included ── */
    included: {
      eyebrow: 'ما يشمله العمل',
      h2: 'ما نقدمه في <span class="hl">كل مشروع</span>',
      lead: 'هذه ليست قائمة عرض مؤقت. هذا هو العمل نفسه، في كل مشروع نبدأه.',
      items: [
        { title: 'تصميم وتطوير موقع مخصص', body: 'موقع يُصمَّم ويُبرمَج من الصفر لنشاطك، لا قالب جاهز يُعاد تركيبه.' },
        { title: 'صفحة مستقلة لكل خدمة ولكل منطقة', body: 'كل خدمة تقدمها وكل منطقة تخدمها تحصل على صفحتها الخاصة بمحتوى مكتوب لها وحدها.' },
        { title: 'الظهور في نتائج بحث جوجل', body: 'تهيئة داخلية وتقنية، ومحتوى محلي لكل صفحة، ومتابعة شهرية لظهور الصفحات في نتائج البحث.' },
        { title: 'الظهور في منصات الذكاء الاصطناعي', body: 'بنية محتوى واضحة ومفهرسة تجعل صفحاتك قابلة للاقتباس في إجابات مساعدات الذكاء الاصطناعي.' },
        { title: 'بناء الروابط والسلطة', body: 'عمل مستمر على الروابط الخارجية وعلى سلطة النطاق، لأن الظهور لا يأتي من الصفحة وحدها.' },
        { title: 'الاستضافة والنطاق والحماية', body: 'الاستضافة والنطاق وحماية الموقع وتحديثاته التقنية، كلها ضمن العمل ولا تُدار من طرفك.' },
      ],
    },

    /* ── 6. The journey. REBUILT 2026-09-30 (build-spec §26.1): the Search
          Console graph is the section, and the three illustrations that used to
          head three large cards are small icons under it carrying the three
          story beats. THE FORENSIC DETAIL IS DELIBERATELY GONE — no client
          name, no date range, no "fifth full data month" note, no carwashkw
          baseline, no source caption. Ahmad has now said twice that a prospect
          does not verify and that the detail costs more than it earns. Do NOT
          restore it: this is a reversal of the earlier checkability framing,
          not a regression. The figures printed INSIDE the image are the
          image's own axis and stay exactly as exported. ── */
    journey: {
      eyebrow: 'كيف نعمل',
      h2: 'هكذا يبدأ موقع جديد <span class="hl">في الظهور</span>',
      lead: 'هذه أرقام موقع واحد بنيناه، كما صدّرها Google Search Console.',
      /* The same unedited export the offer page's B2b carries, reused here —
         never re-derived or re-cropped. It pans instead of shrinking below
         1000px and its wrapper forces direction:ltr, because the four headline
         figures sit at the panel's LEFT edge and an RTL scroller would open on
         the tail of the chart. See build-spec §25.6 and §26.1. The alt names no
         client and no date range; it describes the panel, which is why
         "متوسط الموضع" may appear in it where the rank register bans position
         as a selling word. */
      graph: {
        alt: 'لوحة أداء في Google Search Console لموقع بنيناه: إجمالي النقرات 1.99 ألف، وإجمالي مرات الظهور 114 ألفًا، ومعدل النقر 1.7 بالمئة، ومتوسط الموضع 10.9، ومنحنى يومي يبدأ عند الصفر ثم يرتفع ويستقر في نطاق أعلى.',
        panLabel: 'لوحة أداء في Google Search Console لموقع بنيناه',
        hint: 'اسحب الصورة أفقيًا لقراءتها كاملة',
      },
      stages: [
        { title: 'البناء', body: 'يُصمَّم الموقع ويُبنى ويُنشر، وتُرسل صفحاته إلى جوجل للفهرسة.' },
        { title: 'الظهور', body: 'تدخل صفحات الخدمات والمناطق الفهرس، ويبدأ العميل يجدها في بحثه.' },
        { title: 'النمو', body: 'يجد العميل صفحة الخدمة في منطقته، وتأتي المكالمة منها.' },
      ],
    },

    /* ── 7. Our work ── */
    work: {
      eyebrow: 'أعمالنا',
      h2: 'مواقع بنيناها <span class="hl">ويجدها العملاء</span> اليوم',
      /* `مكتوبين عليها` / `printed on it` was dropped 2026-09-24: the two
         months are no longer printed on the cards, so the sentence would have
         been describing something the reader cannot see. One source line now
         sits under the whole section instead. */
      /* The lead used to describe a growth percentage computed from two
         complete months. The figure is now a total, so the sentence says what a
         total is, in the words a business owner uses: how many times the site
         came up in Google. (Ahmad, 2026-09-25.) */
      lead: 'كل موقع هنا بُني من الصفر وما زال يعمل. الرقم على كل بطاقة هو عدد المرات التي ظهر فيها الموقع في نتائج بحث Google، مجموع كل شهر كامل سجّله Google لهذا الموقع. والمشاريع الحديثة موسومة كما هي، لأن بياناتها لم تكتمل بعد.',
      /* The metric label never says "impression": it says what an impression
         IS. A reader who has no website does not know the word and is not
         asked to. Reads on the card as "246K ظهور". One number, one word. */
      metricLabel: 'ظهور',
      newTag: 'مشروع جديد',
      linkLabel: 'افتح الموقع',
      /* ONE source line under the whole section, replacing the eleven date
         windows that used to sit on the cards (Ahmad, 2026-09-24). */
      source: 'كل الأرقام من Google Search Console: مجموع مرات الظهور في كل شهر كامل مسجّل لكل موقع، حتى أغسطس 2026. الأشهر غير المكتملة غير محسوبة.',
      carouselLabel: 'مواقع بنيناها',
      prev: 'السابق',
      next: 'التالي',
    },

    /* ── 7b. The price. NEW 2026-09-30 (build-spec §26.2). The homepage used to
          carry a price in exactly one place, the §2 strip teaser; it now carries
          the offer itself, after the proof in §7 and before the objections in §8.
          EVERY FIGURE AND EVERY WORD HERE IS ALREADY DECIDED ON THE OFFER PAGE
          (copy.md Part B) and is repeated verbatim — nothing is invented and
          nothing new is said. In particular:
            * the three tiers carry PRICES ONLY. Ahmad has not defined what
              differs between them and nothing here may fill them out;
            * there is NO savings figure and there never will be. The two numbers
              sitting together do the work and the reader does the arithmetic;
            * NO COUNTRY. The offer page names Saudi Arabia because eligibility is
              a condition of the promotion; the homepage names no geography
              anywhere and this section does not break that. ── */
    pricing: {
      eyebrow: 'السعر',
      h2: '<span class="hl">دفعة واحدة</span> تغطي ستة أشهر',
      lead: `السعر المعتاد لهذه الخدمة يبدأ من ${P.month} شهريًا. وفي هذا العرض تدفع ${P.six} مرة واحدة، وتغطي أول ستة أشهر كاملة.`,
      /* The same two rows as offer B1b, word for word. */
      price: {
        anchorLabel: 'السعر المعتاد',
        anchorValue: `يبدأ من ${P.month} شهريًا`,
        offerLabel: 'هذا العرض',
        offerValue: `${P.six} دفعة واحدة، تغطي ستة أشهر`,
        note: 'دفعة واحدة، وليست شهرية. لا فاتورة شهرية خلال الأشهر الستة.',
      },
      afterTitle: 'بعد الأشهر الستة',
      afterIntro: 'تختار خطة شهرية من ثلاث، أو تتوقف. القرار لك.',
      tiers: [P.month, P.t2, P.t3],
      tierUnit: 'شهريًا',
      note: 'ما تشمله كل خطة يُتفق عليه معك في المكالمة.',
      cta: 'اطلع على العرض',
    },

    /* ── 8. FAQ ── */
    faq: {
      eyebrow: 'أسئلة شائعة',
      h2: 'أسئلة شائعة',
      items: [
        { q: 'هل تعملون على موقعي الحالي؟', a: 'لا. نعمل فقط على المواقع التي نبنيها بأنفسنا. الأساس التقني والبنية الداخلية هما ما يحدد الترتيب، ولا يمكننا أن نتحمل مسؤولية نتيجة مبنية على أساس وضعه غيرنا.' },
        { q: 'لمن يعود الموقع؟', a: 'الموقع يُبنى لنشاطك التجاري وحده. الاستضافة والنطاق والحماية والتحديثات التقنية جزء مما نتولاه لك ضمن العمل، فلا تحتاج إلى إدارتها. وشروط ما بعد انتهاء فترة العرض مكتوبة كاملة في صفحة العرض.' },
        { q: 'هل تديرون ملف نشاطي على جوجل؟', a: 'لا. لا نطلب صلاحية الدخول إلى ملفك. نسلمك قائمة تعليمات واضحة ينفذها من يدير الملف عندك، ثم نتابع أثرها في نتائج البحث. الملف يبقى بالكامل تحت سيطرتك.' },
        { q: 'متى تظهر النتائج؟', a: 'لا نعطي جدولًا زمنيًا، لأن الترتيب يعتمد على قطاعك وعلى منافسيك في نتائج البحث. ما نستطيع عرضه هو ما حدث فعلًا: قسم كيف نعمل في هذه الصفحة يعرض أشهرًا متتالية لموقع واحد بنيناه، كما صدّرها Google Search Console.' },
        { q: 'لدي موقع بالفعل، فماذا يحدث؟', a: 'نستبدله بموقع نبنيه نحن من الصفر. لا نعمل على موقع قائم بناه غيرنا، لكن الاستبدال الكامل وارد ضمن عملنا المعتاد. أما شروط العرض المحدود فتختلف عن ذلك، وهي مكتوبة في صفحة العرض.' },
      ],
    },

    /* ── 9. Final call ── */
    final: {
      h2: '<span class="nb">عملاؤك يبحثون الآن.</span><br class="brk"> <span class="hl nb">كن أنت الإجابة</span>',
      lead: 'مكالمة واحدة نراجع فيها ملفك على جوجل، ونشرح لك كيف نبني الموقع وكيف نجعل عملاءك يجدونه.',
    },

    /* ── 10. Footer ── */
    footer: {
      strapline: 'نبني المواقع ونجعل العملاء يجدونها',
      cols: [
        { title: 'الشركة', links: [
          { label: 'الرئيسية', href: '/' },
          { label: 'من نحن', href: '/about/' },
          { label: 'تواصل معنا', href: '/contact/' },
        ] },
        { title: 'الموارد', links: [
          { label: 'المدونة', href: '/blog/' },
          { label: 'قائمة ملف جوجل', href: '/google-business-profile-checklist.html' },
        ] },
        { title: 'العرض', links: [
          { label: 'العرض', href: '/offer/' },
          { label: 'الشروط والأحكام', href: '/terms/' },
        ] },
        { title: 'تواصل', links: [
          { label: 'اتصل الآن', href: 'tel:' },
          { label: 'واتساب', href: 'wa:' },
        ] },
      ],
      addressLabel: 'العنوان',
      address: 'محافظة الأحمدي، المنقف، قطعة 004، شارع 14، مبنى ناصر فالح شناز السبيعي، الدور الأول، محل 9',
      phoneLabel: 'الهاتف',
      legal: 'جميع الحقوق محفوظة لشركة كويت بلوك',
    },

    /* ═══ PART C. The four secondary pages ═══
       Words come from design/copy-pages.md, verbatim, the same way Part A and
       Part B come from design/copy.md. Highlighted phrases are the ones that
       file names; never invent one. No figures, no geography beyond the
       company's own NAP, no founder story, no dates, no headcount. ── */

    /* ── About us, /about/ ── */
    about: {
      eyebrow: 'من نحن',
      h1: 'نبني ما نتحمل <span class="hl">مسؤوليته</span>',
      lead: 'Q8 block تبني لشركات الخدمات المحلية موقعًا كاملًا، بصفحة مستقلة لكل خدمة ولكل منطقة، ثم تتولى ظهوره في بحث جوجل وفي إجابات الذكاء الاصطناعي.',
      principle: {
        eyebrow: 'كيف نعمل',
        h2: 'نعمل فقط على المواقع التي <span class="hl">نبنيها</span>',
        lead: 'هذا القرار هو ما يميز طريقتنا، وهو أيضًا ما نرفض من أجله عملًا كل شهر. الأساس التقني للموقع هو ما يحدد إن كان العميل سيجده أصلًا، ولا نستطيع أن نتحمل مسؤولية نتيجة مبنية على أساس وضعه غيرنا.',
        blocks: [
          { title: 'الأساس يُبنى مرة واحدة', body: 'بنية الموقع وسرعته وطريقة كتابة صفحاته تُقرَّر في أول أسبوع من البناء، ويصعب تغييرها بعد ذلك دون إعادة بنائه. لذلك نبدأ من الصفر، لا من موقع جاهز نحاول إصلاحه.' },
          { title: 'صفحة لكل خدمة ولكل منطقة', body: 'العميل لا يبحث باسم نشاطك، بل بالخدمة التي يريدها في المنطقة التي هو فيها. هذا يعني عشرات الصفحات، ولا تُضاف عشرات الصفحات إلى موقع لم يُصمَّم لها من البداية.' },
          { title: 'المسؤولية كاملة أو لا شيء', body: 'لأننا بنينا الموقع، فكل ما يؤثر في ظهوره يبقى في أيدينا: الاستضافة والنطاق والحماية والتحديثات التقنية والمحتوى. لا يوجد طرف ثالث نحيل إليه السبب حين لا تسير الأمور.' },
        ],
      },
      /* Same six deliverables as §5 and offer B2, same titles, titles only. */
      deliver: {
        h2: 'ما نقدمه في <span class="hl">كل مشروع</span>',
        intro: 'العمل نفسه في كل مشروع نبدأه. التفاصيل الكاملة على الصفحة الرئيسية.',
        items: [
          'تصميم وتطوير موقع مخصص',
          'صفحة مستقلة لكل خدمة ولكل منطقة',
          'الظهور في نتائج بحث جوجل',
          'الظهور في منصات الذكاء الاصطناعي',
          'بناء الروابط والسلطة',
          'الاستضافة والنطاق والحماية',
        ],
        link: { label: 'اقرأ التفاصيل على الصفحة الرئيسية', href: '/' },
      },
      notdo: {
        h2: 'ما لا نقوم به',
        items: [
          'لا نعمل على موقع قائم بناه غيرنا. إن كان لديك موقع وتريد استبداله بالكامل بموقع نبنيه من الصفر، فهذا عمل نقوم به.',
          'لا ندير ملف نشاطك على جوجل ولا نطلب صلاحية الدخول إليه. نسلمك قائمة تعليمات واضحة ينفذها من يدير الملف عندك، ثم نتابع أثرها في نتائج البحث. الملف يبقى لك بالكامل.',
        ],
      },
      /* Facts only, from company.md. The address is NAP, not positioning. */
      company: {
        h2: 'الشركة',
        rows: [
          { label: 'الاسم المسجل', value: 'شركة كويت بلوك' },
          { label: 'العلامة', value: 'Q8 block', ltr: true },
          { label: 'المكتب', from: 'address' },
          { label: 'الموقع', value: 'q8block.com', ltr: true },
        ],
      },
      /* The highlight span carries the attached prefix ب, because Arabic joins
         it to the word: copy-pages.md names `مكالمة واحدة` and splitting
         `بمكالمة` would break the word. */
      final: {
        h2: 'ابدأ <span class="hl">بمكالمة واحدة</span>',
        lead: 'نراجع معك ملفك على جوجل ونشرح كيف نبني الموقع وكيف نجعل عملاءك يجدونه.',
      },
    },

    /* ── Contact us, /contact/. NO FORM, and no field of any kind. Nothing
          from Google loads until the reader taps the map. ── */
    contact: {
      eyebrow: 'تواصل',
      h1: 'تحدث إلينا <span class="hl">مباشرة</span>',
      lead: 'لا يوجد نموذج على هذه الصفحة. اتصل أو راسلنا على واتساب، وتصل رسالتك إلينا مباشرة دون وسيط.',
      call: {
        title: 'اتصل بنا',
        body: 'مكالمة واحدة نراجع فيها ملفك على جوجل ونقول لك مباشرة ما نستطيع بناءه لك.',
      },
      whatsapp: {
        title: 'راسلنا على واتساب',
        body: 'إن كان الاتصال غير مناسب الآن، اكتب لنا اسم نشاطك والخدمة التي تقدمها ونعود إليك.',
      },
      office: { title: 'المكتب', name: 'شركة كويت بلوك' },
      map: {
        title: 'الخريطة لا تُحمَّل إلا بطلبك',
        line: 'نحمّل خرائط جوجل عند الضغط فقط، حتى تبقى الصفحة سريعة ولا يُطلب منك شيء لم تطلبه.',
        button: 'إظهار الخريطة',
        caption: 'خرائط جوجل، موقع المكتب',
        directions: 'افتح في خرائط جوجل',
        frameTitle: 'خرائط جوجل، موقع مكتب شركة كويت بلوك',
      },
    },

    /* ── Blog, /blog/ and /blog/<slug>/ ── */
    blog: {
      eyebrow: 'المدونة',
      /* The Arabic mirror of blog-B.png's `Insights for better growth.`, with
         the orange block over the same first half. MSA, same register as the
         rest of the body copy, and `نمو` is growth in the plain business
         sense, not a ranking claim (copy-pages.md §B rule 4). */
      h1: '<span class="hl">رؤى من أجل</span> نمو أفضل.',
      lead: null, // board B draws no intro under the blog heading (Ahmad, replica request)
      by: 'بقلم أحمد عويهان',
      /* `Read more` on blog-B.png, which Ahmad asked to be replicated word for
         word; copy-pages §B2 had `اقرأ المقال` / `Read the article`. */
      readMore: 'اقرأ المزيد',
      /* 3–10 minutes takes the plural دقائق; the digits are wrapped dir="ltr". */
      readTime: (n) => `<span dir="ltr">${n}</span> ${n <= 2 ? 'دقيقة' : n <= 10 ? 'دقائق' : 'دقيقة'} قراءة`,
      home: 'الرئيسية',
      blog: 'المدونة',
      crumbLabel: 'مسار التنقل',
      back: 'عد إلى كل المقالات',
      prev: 'المقال السابق',
      next: 'المقال التالي',
      more: 'مقالات أخرى',
    },

    /* ── Terms and conditions, /terms/. Only what is already true and already
          stated somewhere else on this site. ── */
    terms: {
      h1: 'الشروط والأحكام',
      lead: 'هذه الصفحة مكتوبة لتُقرأ. تشرح ما نقدمه وما لا نقدمه، بنفس اللغة التي نتحدث بها معك في المكالمة. ولا تحتوي على بنود لم نقلها لك مباشرة.',
      updated: 'آخر تحديث: <span dir="ltr">24</span> سبتمبر <span dir="ltr">2026</span>',
      blocks: [
        { title: 'ما هي الخدمة', body: 'نصمم ونبرمج موقعًا إلكترونيًا لنشاطك التجاري، بصفحة مستقلة لكل خدمة تقدمها ولكل منطقة تخدمها، ثم نعمل على ظهوره في نتائج بحث جوجل وفي إجابات مساعدات الذكاء الاصطناعي. العمل يشمل التهيئة الداخلية والتقنية، والمحتوى المكتوب لكل صفحة، وبناء الروابط وسلطة النطاق، ومتابعة شهرية. القائمة الكاملة بما يشمله العمل منشورة على الصفحة الرئيسية.' },
        { title: 'نعمل على ما نبنيه', body: 'لا نتسلم موقعًا بناه غيرنا ونعمل عليه. الأساس التقني والبنية الداخلية هما ما يحددان إن كان العميل سيجد الموقع أصلًا، ولا نستطيع أن نتحمل مسؤولية نتيجة مبنية على أساس لم نضعه. إن كان لديك موقع قائم وتريد استبداله بالكامل بموقع نبنيه من الصفر، فهذا عمل نقوم به ضمن عملنا المعتاد.' },
        { title: 'الاستضافة والنطاق والحماية', body: 'الاستضافة والنطاق وحماية الموقع وتحديثاته التقنية كلها جزء من الخدمة ونتولاها نحن، فلا تحتاج إلى إدارتها ولا إلى التعامل مع مزود منفصل. والموقع يُبنى لنشاطك التجاري وحده ولا يُستخدم لغيرك.' },
        { title: 'ملفك على جوجل يبقى لك', body: 'إدارة ملف نشاطك التجاري على جوجل ليست ضمن الخدمة. لا نطلب صلاحية الدخول إلى الملف ولا نملكه ولا ندير محتواه. ما نقدمه هو قائمة تعليمات واضحة ينفذها من يدير الملف عندك، ثم نتابع أثر ذلك في نتائج البحث. الملف وحسابه يبقيان تحت سيطرتك بالكامل، خلال العمل معنا وبعده.' },
        { title: 'العرض المحدود', body: 'العرض المحدود له شروطه الخاصة: من يحق له التسجيل، وما تشمله الأشهر الستة، وسعره وكيف يُدفع، والخيارات المتاحة بعدها. هذه الشروط مكتوبة كاملة في صفحة العرض، وهي المرجع الوحيد لها. ما في هذه الصفحة يصف الخدمة نفسها، لا العرض.', link: { label: 'اقرأ شروط العرض', href: '/offer/' } },
        { title: 'ما يُتفق عليه مباشرة', body: 'كل ما يخص مشروعك تحديدًا، من نطاق العمل والخدمات والمناطق التي تُبنى لها الصفحات إلى شروط الدفع وما يحدث إن أراد أي من الطرفين التوقف، يُتفق عليه معك مباشرة قبل بدء العمل ويُكتب لك. لن تجد هنا بندًا عامًا يقرر شيئًا لم تسمعه منا. إن لم يكن الأمر مكتوبًا في اتفاقك أو منشورًا على هذا الموقع، فهو غير قائم.' },
        { title: 'تحديث هذه الصفحة', body: 'إن تغيّر شيء مما سبق، نحدّث هذه الصفحة ونغيّر تاريخ آخر تحديث أعلاها. وإن كان لديك سؤال عن أي بند هنا، اتصل بنا وسنجيبك مباشرة.', link: { label: 'تواصل معنا', href: '/contact/' } },
      ],
    },

    /* ═══ PART B. The offer page ═══
       Rewritten 2026-09-30: the offer is NOT free any more. One payment of $500
       buys the first six months; the normal price starts at $500 a month. The
       single biggest risk on this page is a reader thinking it is $500 monthly,
       so "دفعة واحدة" sits beside the number everywhere the number appears and
       `price.note` says it in the shortest words there are. */
    offerPage: {
      pill: 'عرض محدود',
      /* H1 REPLACED 2026-09-30, second pass (build-spec §26.4). The old line
         `ستة أشهر بـ$500، تُدفع مرة واحدة` sold the PRICE; every replacement that
         led with the website sold the WEBSITE. Ahmad: "you're selling the
         website, not the dream outcome, which is related to search and AI,
         getting clients." So it opens on the outcome and names the two channels
         without explaining either. `محركات البحث` is deliberate and is NOT to be
         narrowed back to "جوجل" — he asked for search engines. The highlight
         moved with it, onto the outcome phrase `عملاء جدد`, because the price is
         no longer in the headline to carry it. The price now lives entirely in
         the anchor block directly beneath, which was strengthened to compensate. */
      h1: `<span class="hl">عملاء جدد</span> من محركات البحث<br class="brk"> والذكاء الاصطناعي`,
      lead: `هذا العرض مخصص لشركات الخدمات في السعودية. دفعة واحدة ${P.six} تغطي أول ستة أشهر من العمل الكامل. نجعل عملاءك يجدونك في جوجل وفي الذكاء الاصطناعي، فتتحول هذه الزيارات إلى مكالمات وعملاء لنشاطك.`,

      /* The anchor. Two rows, same number, different unit, nothing between them.
         No "you save X" line anywhere: the arithmetic is the reader's to do and
         a savings claim reads as a discount gimmick. */
      price: {
        anchorLabel: 'السعر المعتاد',
        anchorValue: `يبدأ من ${P.month} شهريًا`,
        offerLabel: 'هذا العرض',
        offerValue: `${P.six} دفعة واحدة، تغطي ستة أشهر`,
        note: 'دفعة واحدة، وليست شهرية. لا فاتورة شهرية خلال الأشهر الستة.',
      },

      countdownLabel: 'يغلق التسجيل خلال',
      units: ['يوم', 'ساعة', 'دقيقة', 'ثانية'],
      spots: (n) => `<span dir="ltr">${n}</span> مقاعد متبقية`,
      statusLine: 'التسجيل مفتوح الآن',

      b2: { title: 'ما يشمله العرض', intro: `دفعة واحدة ${P.six} تغطي الأشهر الستة كاملة، والأشهر الستة تشمل العمل كاملًا لا جزءًا منه.`,
        items: [
          'تصميم وتطوير موقع مخصص',
          'صفحة مستقلة لكل خدمة ولكل منطقة',
          'الظهور في نتائج بحث جوجل',
          'الظهور في منصات الذكاء الاصطناعي',
          'بناء الروابط والسلطة',
          'الاستضافة والنطاق والحماية',
        ] },

      /* B2b, the proof block, added 2026-09-30. Part B used to carry NO performance
         figure at all, on the grounds that a figure on an offer page turns into a
         promise. Ahmad overrode that when the offer stopped being free: a reader
         being asked for money wants to see what six months do before he pays.
         It keeps every guard rail the homepage figures carry — one named client,
         one named period, already in the past, the source named on the page — and
         the image is an unedited Search Console export (design/proof-shots/). */
      proof: {
        title: 'مثال واحد على ستة أشهر',
        /* SHORTENED 2026-09-30, second pass (build-spec §26.3). The lead used to
           open on the client name and the exact date range. Ahmad: "you put too
           much details for the search console graph, you are very logical and
           direct in your messaging." Six words now. The client name and the
           range are NOT deleted — they moved to `meta`, small fine print under
           the image, where provenance belongs. Do not lead with them again. */
        intro: 'موقع بنيناه. هذه أرقامه.',
        meta: 'kwtclean.com، من 1 أبريل 2026 إلى 19 سبتمبر 2026.',
        alt: 'لوحة الأداء في Google Search Console لموقع kwtclean.com من 1 أبريل 2026 إلى 19 سبتمبر 2026: إجمالي النقرات 1.99 ألف، وإجمالي مرات الظهور 114 ألفًا، ومعدل النقر 1.7 بالمئة، ومتوسط الموضع 10.9، ومنحنى يومي يبدأ عند الصفر في أبريل ثم يرتفع ويستقر في نطاق أعلى حتى سبتمبر.',
        panLabel: 'لوحة أداء kwtclean.com في Google Search Console',
        hint: 'اسحب الصورة أفقيًا لقراءتها كاملة',
        caption: `ستة أشهر من هذا العمل هي ما تشتريه الدفعة الواحدة ${P.six}.`,
        source: 'الصورة تصدير مباشر من Google Search Console، دون أي تعديل على الأرقام.',
      },

      b3: { title: 'شروط القبول', intro: 'العرض مخصص لشركات الخدمات في السعودية. أربعة شروط، وإن تحققت جميعها فنشاطك مؤهل.',
        items: [
          'نشاط خدمي. نعمل مع شركات الخدمات فقط.',
          'سجل تجاري أو وثيقة عمل حر. أي منهما يكفي.',
          'ملف نشاط تجاري على جوجل بعنوان مطابق للوثيقة.',
          'لا يوجد موقع إلكتروني قائم.',
        ] },

      /* Rewritten 2026-09-30. The old body said "stop at any time, with no fee",
         which was written for a free offer and reads as a refund promise once money
         has changed hands. It now says what is actually true and nothing more: one
         payment, no monthly bill, no automatic renewal, nothing further due. It does
         NOT state a refund policy in either direction — nobody has decided one, and
         copy-pages.md T6 already says the money terms are agreed directly. */
      b4: { title: 'بدون عقد', body: `لا يوجد عقد ولا التزام ولا فترة إشعار. الدفعة ${P.six} مرة واحدة، ولا توجد فاتورة شهرية خلال الأشهر الستة، ولا يتجدد شيء تلقائيًا. وحين تنتهي المدة، القرار لك وحدك، ولا يُطلب منك شيء إن قررت التوقف.` },

      /* The three tiers. Ahmad gave the PRICES and not what differs between them,
         so this block prints prices only. Do NOT invent service levels, page counts,
         hours or feature lists for them: what each plan covers is agreed on the call,
         exactly as copy-pages.md T6 already says of everything project specific. */
      b5: { title: 'ماذا يحدث بعد ستة أشهر', intro: 'حين تنتهي الأشهر الستة تختار خطة شهرية من ثلاث، أو تتوقف. القرار لك.',
        tiers: [P.month, P.t2, P.t3],
        tierUnit: 'شهريًا',
        notes: [
          'ما تشمله كل خطة يُتفق عليه معك في المكالمة، حسب قطاعك وحسب ما حققته الأشهر الستة.',
          'وإن اخترت التوقف، فالتوقف نهائي، دون رسوم ودون إشعار.',
        ] },

      b6: { title: 'أسئلة شائعة',
        items: [
          { q: `هل الـ${P.six} شهريًا؟`, a: `لا. الـ${P.six} دفعة واحدة تغطي الأشهر الستة كاملة، ولا توجد فاتورة شهرية خلالها. السعر المعتاد لهذه الخدمة يبدأ من ${P.month} شهريًا، وبعد انتهاء الأشهر الستة تختار خطة شهرية من ثلاث: ${P.month} أو ${P.t2} أو ${P.t3}.` },
          { q: `لماذا السعر ${P.six} لستة أشهر؟`, a: 'نختار عددًا محدودًا من الشركات في كل مدينة ونعمل عليها ستة أشهر كاملة حتى تظهر النتيجة. النتيجة نفسها هي ما يجعل العميل يقرر الاستمرار، وهي أيضًا ما نعرضه على العميل التالي. ولهذا وُضعت شروط القبول: العرض لا ينجح إلا مع نشاط قائم وموثق فعلًا.' },
          { q: 'هل هناك عقد أو التزام؟', a: `لا. لا يوجد عقد ولا فترة إشعار. الدفعة ${P.six} مرة واحدة، ولا توجد فاتورة شهرية خلال الأشهر الستة، ولا يتجدد شيء تلقائيًا. وحين تنتهي المدة، إن قررت التوقف فلا يُطلب منك شيء.` },
          { q: 'هل يشترط وجود سجل تجاري؟', a: 'سجل تجاري أو وثيقة عمل حر. أي منهما يكفي. الشرط الوحيد أن يطابق العنوان المسجل في الوثيقة عنوان ملف نشاطك على جوجل.' },
          { q: 'لدي موقع قائم، هل أنا مؤهل؟', a: 'العرض مخصص لمن لا يملك موقعًا قائمًا. إن كان لديك موقع وتريد استبداله بالكامل، فهذا عمل نقوم به خارج هذا العرض، واتصل بنا لنراجعه معك.' },
          { q: 'ماذا يحدث بعد ستة أشهر؟', a: `القرار لك. حين تنتهي الأشهر الستة تختار خطة شهرية من ثلاث، ${P.month} أو ${P.t2} أو ${P.t3}، وما تشمله كل خطة يُتفق عليه معك في المكالمة حسب قطاعك وحسب ما حققته الأشهر الستة. وإن اخترت التوقف، فالتوقف نهائي، دون رسوم ودون إشعار.` },
          { q: 'هل تديرون ملف نشاطي على جوجل خلال العرض؟', a: 'لا، لا في العرض ولا خارجه. نسلمك قائمة تعليمات واضحة ينفذها من يدير الملف عندك، ثم نتابع أثرها في نتائج البحث.' },
        ] },

      b7: { h2: 'اتصل، ونخبرك إن كنت <span class="hl">مؤهلًا</span>',
        lead: 'مكالمة واحدة نراجع فيها وثيقتك وملفك على جوجل، ونقول لك مباشرة إن كان نشاطك ضمن الشروط.' },
    },
  },

  /* ═══════════════════════════ ENGLISH ═══════════════════════════ */
  en: {
    lang: 'en', dir: 'ltr', other: 'ar', otherLabel: 'العربية',
    home: { path: '/en/', otherPath: '/' },
    offer: { path: '/en/offer/', otherPath: '/offer/' },
    paths: {
      home: { path: '/en/', otherPath: '/' },
      offer: { path: '/en/offer/', otherPath: '/offer/' },
      about: { path: '/en/about/', otherPath: '/about/' },
      contact: { path: '/en/contact/', otherPath: '/contact/' },
      blog: { path: '/en/blog/', otherPath: '/blog/' },
      terms: { path: '/en/terms/', otherPath: '/terms/' },
      post: (slug) => ({ path: `/en/blog/${slug}/`, otherPath: `/blog/${slug}/` }),
    },
    months: ['January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'],

    meta: {
      home: {
        title: 'We build your website and get you found | Q8 block',
        description: 'We build local service businesses a full website with a dedicated page for every service and every area, then get it found in Google search and in AI answers.',
        ogAlt: 'A website found in local search and in AI answers',
      },
      offer: {
        title: 'New customers from search engines and AI | Q8 block',
        description: 'New customers from search engines and AI, for service companies in Saudi Arabia. One payment of $500 covers the first six months. Normal price from $500 a month.',
        ogAlt: 'The Q8 block offer: new customers from search engines and AI',
      },
      about: {
        title: 'We build the websites we take responsibility for | Q8 block',
        description: 'We build local service businesses a full website, and we only work on the websites we build ourselves, because the technical foundation decides whether a site is found in Google search and in AI answers.',
        ogAlt: 'Q8 block, building websites for local service businesses',
      },
      contact: {
        title: 'Contact us | Q8 block',
        description: 'Call us or message us on WhatsApp. Phone, office address, and a map that opens when you ask for it. There is no form on this page.',
        ogAlt: 'The Q8 block phone number and office address',
      },
      blog: {
        title: 'Articles for local service owners | Q8 block',
        description: 'Practical articles on being found in Google search and in AI answers, written for a service business owner, without the jargon.',
        ogAlt: 'Q8 block articles for local service owners',
      },
      terms: {
        title: 'Terms and conditions | Q8 block',
        description: 'What our service covers and what it does not, in plain language: the website build, hosting, domain and security, and the Google Business Profile that stays yours.',
        ogAlt: 'The terms and conditions of the Q8 block service',
      },
    },

    /* See the Arabic nav above: every in-page #anchor is gone, and the offer
       is in the banner, not the nav. */
    nav: [
      { label: 'Home', href: '/en/' },
      { label: 'About us', href: '/en/about/' },
      { label: 'Blog', href: '/en/blog/' },
      { label: 'Terms and conditions', href: '/en/terms/' },
      { label: 'Contact us', href: '/en/contact/' },
    ],
    cta: { call: 'Call now', whatsapp: 'WhatsApp' },
    menuOpen: 'Menu', menuClose: 'Close',
    skip: 'Skip to content',

    hero: {
      h1: 'Customers <span class="hl">find you</span><br class="brk"> on Google and in AI.',
      // Ahmad's own line, 2026-09-25, verbatim. One line, not a paragraph.
      lead: "We put you in Google's results and in AI's answers, where your customer is looking.",
      // §24: the tools strip is gone; only the Google mark's accessible name
      // remains. See the Arabic note above.
      cred: {
        googleLabel: 'Five star rating on Google',
      },
    },

    strip: {
      pill: 'Limited offer',
      line: '6 months for $500, paid once',
      countdownLabel: 'Registration closes in',
      units: ['Days', 'Hours', 'Minutes', 'Seconds'],
      spots: (n) => `<span dir="ltr">${n}</span> seats left`,
      statusLine: 'Registration is open now',
      cta: 'See the offer',
    },

    problem: {
      eyebrow: 'The problem',
      h2: 'Your Google profile works.<br class="brk"> But <span class="hl">no website?</span>',
      lead: 'Your Google profile puts you on the map inside a narrow radius around your address, and that is as far as it reaches. A website takes the same demand and widens it: every area you serve, every question a customer types before he calls, and every answer an AI assistant gives. The gap between the two is real work that is not reaching you yet.',
      cards: [
        { title: 'The map stops at<br class="brk"> your district', body: 'A business profile shows inside a narrow radius around your registered address. A website shows in every city and district you target, with a page built for it.' },
        { title: 'Your competitor answers first', body: 'When the customer wants the detail, a competitor page answers him. The same question gets asked, and you are absent from the answer.' },
        { title: 'AI has nothing to quote', body: 'AI assistants quote pages that are written and indexed. With no website there is no text about you to cite.' },
      ],
    },

    wwd: {
      eyebrow: 'What we do',
      h2: 'We build the site.<br class="brk"> We <span class="hl">get it found.</span>',
      lead: 'We do not work on websites other people built. The technical foundation decides the result, so we design and build the site ourselves, then we take responsibility for it being found in search and in AI answers.',
      blocks: [
        { title: 'We design and build', body: 'A full website designed and coded from scratch, with a separate page for every service and every area you serve, fast to load and technically sound.' },
        { title: 'We get you found', body: 'On page and technical work, and local content written for every page, so your pages come up for the customer in Google search and become quotable in the answers AI assistants give.' },
        { title: 'We keep it running and growing', body: 'Hosting, the domain, security and the technical updates stay with us, links and domain authority keep building month after month, and you get monthly tracking of how the pages are found.' },
      ],
    },

    included: {
      eyebrow: 'What is included',
      h2: 'What <span class="hl">every project</span> includes.',
      lead: 'This is not a promotion list. This is the work itself, on every project we start.',
      items: [
        { title: 'Custom website design and development', body: 'A website designed and coded from scratch for your business, not a template reassembled.' },
        { title: 'A dedicated page for every service and area', body: 'Every service you offer and every area you cover gets its own page, with content written for it alone.' },
        { title: 'Google Search visibility', body: 'On page and technical optimisation, local content for every page, and monthly tracking of how the pages are found in search.' },
        { title: 'AI platform visibility', body: 'A clear, indexed content structure that makes your pages quotable in the answers AI assistants give.' },
        { title: 'Backlinks and authority building', body: 'Continuous work on external links and domain authority, because visibility does not come from the page alone.' },
        { title: 'Hosting, domain and security', body: 'Hosting, the domain, site security and the technical updates. All part of the work, none of it on your desk.' },
      ],
    },

    /* The English mirror of the rebuilt §6. See the Arabic block above for why
       the client name, the date range, the precision note, the carwashkw
       baseline and the source caption are gone, and why they stay gone. */
    journey: {
      eyebrow: 'How it works',
      h2: 'How a new site <span class="hl">gets found.</span>',
      lead: 'These are the numbers of one site we built, exactly as Google Search Console exported them.',
      graph: {
        alt: 'A Google Search Console performance panel for a site we built: total clicks 1.99K, total impressions 114K, average CTR 1.7 percent, average position 10.9, and a daily curve that starts at zero, lifts and settles into a higher band.',
        panLabel: 'A Google Search Console performance panel for a site we built',
        hint: 'Swipe the panel sideways to read all of it',
      },
      stages: [
        { title: 'Build', body: 'The site is designed, built and published, and sent to Google.' },
        { title: 'Get discovered', body: 'Service and area pages enter the index. Customers find them.' },
        { title: 'Get traction', body: 'A customer finds the page for his area, and calls you from it.' },
      ],
    },

    work: {
      eyebrow: 'Our work',
      h2: 'Sites we built that <span class="hl">get found.</span>',
      lead: 'Every site here was built from scratch and is still running. The figure on each card is how many times that site has come up in Google search results, added up across every complete month Google has recorded for it. The recent projects are labelled as what they are, because their data is not in yet.',
      metricLabel: 'impressions',
      newTag: 'New project',
      linkLabel: 'View case study',
      source: 'All figures from Google Search Console: every complete month recorded for each site, added up, to August 2026. Partial months are not counted.',
      carouselLabel: 'Sites we built',
      prev: 'Previous',
      next: 'Next',
    },

    /* The English mirror of §7b. Prices only in the tiers, no savings figure,
       no country. See the Arabic block above. */
    pricing: {
      eyebrow: 'The price',
      h2: '<span class="hl">One payment</span> covers six months.',
      lead: 'The normal price for this service starts at $500 per month. In this offer you pay $500 one time, and it covers your first six months in full.',
      price: {
        anchorLabel: 'Normal price',
        anchorValue: 'from $500 per month',
        offerLabel: 'This offer',
        offerValue: '$500 one time, covers six months',
        note: 'One payment, not monthly. No monthly bill during the six months.',
      },
      afterTitle: 'After the six months',
      afterIntro: 'You pick one of three monthly plans, or you stop. You decide.',
      tiers: ['$500', '$1,000', '$1,500'],
      tierUnit: 'per month',
      note: 'What each plan covers is agreed with you on the call.',
      cta: 'See the offer',
    },

    faq: {
      eyebrow: 'FAQ',
      h2: 'Common questions',
      items: [
        { q: 'Do you work on my current website?', a: 'No. We only work on websites we build ourselves. The technical foundation and the internal structure are what decide the ranking, and we cannot take responsibility for a result built on somebody else’s foundation.' },
        { q: 'Who owns the website?', a: 'The website is built for your business alone. Hosting, the domain, security and the technical updates are part of what we run for you, so you do not have to manage any of it. The terms for what happens when the offer period ends are written in full on the offer page.' },
        { q: 'Do you manage my Google Business Profile?', a: 'No. We do not ask for access to your profile. We hand you a clear checklist for whoever manages the profile, then we track its effect in the search results. The profile stays entirely under your control.' },
        { q: 'How long before results show?', a: 'We do not give a timeline, because ranking depends on your sector and on your competitors in the search results. What we can show you is what actually happened. The How it works section on this page shows consecutive months from one single site we built, exactly as Google Search Console exported them.' },
        { q: 'What if I already have a website?', a: 'We replace it with a website we build from scratch. We do not work on an existing site somebody else built, but a full replacement is part of our normal work. The conditions of the limited offer are different, and they are written on the offer page.' },
      ],
    },

    final: {
      h2: '<span class="nb">Your customers are searching.</span><br class="brk"> <span class="hl nb">Be the answer.</span>',
      lead: 'One call. We look at your Google profile and explain how we build the site and how we get it found.',
    },

    footer: {
      strapline: 'We build websites and get them found',
      cols: [
        { title: 'Company', links: [
          { label: 'Home', href: '/en/' },
          { label: 'About us', href: '/en/about/' },
          { label: 'Contact us', href: '/en/contact/' },
        ] },
        { title: 'Resources', links: [
          { label: 'Blog', href: '/en/blog/' },
          { label: 'Google profile checklist', href: '/en/google-business-profile-checklist.html' },
        ] },
        { title: 'The offer', links: [
          { label: 'The offer', href: '/en/offer/' },
          { label: 'Terms and conditions', href: '/en/terms/' },
        ] },
        { title: 'Contact', links: [
          { label: 'Call now', href: 'tel:' },
          { label: 'WhatsApp', href: 'wa:' },
        ] },
      ],
      addressLabel: 'Address',
      address: 'Al Ahmadi Governorate, Mangaf, Block 004, Street 14, Nasser Falih Shnaz Al Subaie Building, Floor 1, Unit 9',
      phoneLabel: 'Phone',
      legal: 'All rights reserved, Kuwait Block',
    },

    /* ═══ PART C. The four secondary pages — the English mirror of the Arabic
       above, section for section, from design/copy-pages.md. ═══ */

    about: {
      eyebrow: 'About us',
      h1: 'We build what we take <span class="hl">responsibility</span> for',
      lead: 'Q8 block builds local service businesses a full website, with a dedicated page for every service and every area, then takes on getting it found in Google search and in AI answers.',
      principle: {
        eyebrow: 'How we work',
        h2: 'We only work on sites <span class="hl">we build</span>',
        lead: 'This one decision is what makes the method work, and it is also why we turn work down. The technical foundation of a website decides whether a customer ever finds it, and we cannot take responsibility for a result built on somebody else’s foundation.',
        blocks: [
          { title: 'The foundation is built once', body: 'The structure of a site, its speed and the way its pages are written are all decided in the first week of the build, and they are hard to change afterwards without rebuilding. So we start from scratch rather than from a finished site we try to repair.' },
          { title: 'A page for every service and area', body: 'A customer does not search for your business name. He searches for the service he wants in the area he is in. That means dozens of pages, and dozens of pages do not get bolted onto a site that was never designed to hold them.' },
          { title: 'Whole responsibility or none', body: 'Because we built the site, everything that affects whether it is found stays in our hands: hosting, the domain, security, the technical updates and the content. There is no third party to point at when something does not work.' },
        ],
      },
      deliver: {
        h2: 'What <span class="hl">every project</span> includes',
        intro: 'The same work on every project we start. The detail is on the homepage.',
        items: [
          'Custom website design and development',
          'A dedicated page for every service and area',
          'Google Search visibility',
          'AI platform visibility',
          'Backlinks and authority building',
          'Hosting, domain and security',
        ],
        link: { label: 'Read the detail on the homepage', href: '/en/' },
      },
      notdo: {
        h2: 'What we do not do',
        items: [
          'We do not work on an existing site somebody else built. If you have one and you want it replaced entirely by a site we build from scratch, that is work we do.',
          'We do not manage your Google Business Profile and we do not ask for access to it. We hand you a clear checklist for whoever manages the profile, then we track its effect in the search results. The profile stays entirely yours.',
        ],
      },
      company: {
        h2: 'The company',
        rows: [
          { label: 'Registered name', value: 'Kuwait Block' },
          { label: 'Brand', value: 'Q8 block' },
          { label: 'Office', from: 'address' },
          { label: 'Website', value: 'q8block.com' },
        ],
      },
      final: {
        h2: 'Start with <span class="hl">one call</span>',
        lead: 'We look at your Google profile with you and explain how we build the site and how we get it found.',
      },
    },

    contact: {
      eyebrow: 'Contact',
      h1: 'Talk to us <span class="hl">directly</span>',
      lead: 'There is no form on this page. Call or message us on WhatsApp and it reaches us directly, with nothing in between.',
      call: {
        title: 'Call us',
        body: 'One call. We look at your Google profile and tell you straight away what we can build for you.',
      },
      whatsapp: {
        title: 'Message us on WhatsApp',
        body: 'If a call does not suit you now, send us the name of your business and the service you offer and we will come back to you.',
      },
      office: { title: 'The office', name: 'Kuwait Block' },
      map: {
        title: 'The map loads only when you ask',
        line: 'We load Google Maps on tap only, so the page stays fast and nothing loads that you did not ask for.',
        button: 'Show the map',
        caption: 'Google Maps, the office location',
        directions: 'Open in Google Maps',
        frameTitle: 'Google Maps, the Kuwait Block office location',
      },
    },

    blog: {
      eyebrow: 'Blog',
      /* blog-B.png draws this heading, word for word and with the orange block
         on `Insights for`, and Ahmad asked for the board copied exactly. The
         board also sets it materially smaller than the other secondary pages'
         H1 — see .blog-page .page-head h1 in styles.css. */
      h1: '<span class="hl">Insights for</span> better growth.',
      lead: null, // board B draws no intro under the blog heading (Ahmad, replica request)
      by: 'By Ahmad Owaihan',
      readMore: 'Read more',   // blog-B.png, verbatim
      readTime: (n) => `${n} min read`,
      home: 'Home',
      blog: 'Blog',
      crumbLabel: 'Breadcrumb',
      back: 'Back to all articles',
      prev: 'Previous article',
      next: 'Next article',
      more: 'More articles',
    },

    terms: {
      h1: 'Terms and conditions',
      lead: 'This page is written to be read. It says what we provide and what we do not, in the same language we use with you on the phone, and it contains nothing we have not already said to you directly.',
      updated: 'Last updated: 24 September 2026',
      blocks: [
        { title: 'What the service is', body: 'We design and code a website for your business, with a dedicated page for every service you offer and every area you cover, then we work on it being found in Google search results and in the answers AI assistants give. The work includes the on page and technical optimisation, the content written for every page, the backlinks and domain authority work, and monthly tracking. The full list of what is included is published on the homepage.' },
        { title: 'We work on what we build', body: 'We do not take over a website somebody else built and work on it. The technical foundation and the internal structure are what decide whether a customer ever finds the site, and we cannot take responsibility for a result built on a foundation we did not lay. If you have an existing website and you want it replaced entirely by one we build from scratch, that is part of our normal work.' },
        { title: 'Hosting, domain and security', body: 'Hosting, the domain, site security and the technical updates are all part of the service and we run them, so you do not have to manage any of it or deal with a separate provider. The website is built for your business alone and is not used for anybody else.' },
        { title: 'Your Google profile stays yours', body: 'Managing your Google Business Profile is not part of the service. We do not ask for access to it, we do not own it and we do not run its content. What we provide is a clear checklist for whoever manages the profile on your side, and then we track the effect in the search results. The profile and the account behind it stay entirely under your control, during the work and after it.' },
        { title: 'The limited offer', body: 'The limited offer has its own conditions: who can register, what the six months cover, what it costs and how it is paid, and the options available afterwards. Those conditions are written in full on the offer page, which is the only reference for them. This page describes the service itself, not the promotion.', link: { label: 'Read the offer terms', href: '/en/offer/' } },
        { title: 'What we agree directly', body: 'Everything specific to your project, from the scope of the work and which services and areas get pages to the payment arrangements and what happens if either side wants to stop, is agreed with you directly before the work starts and put in writing for you. You will not find a general clause here deciding something you have not heard from us. If it is not in your agreement or published on this site, it does not apply.' },
        { title: 'Updates to this page', body: 'If anything above changes, we update this page and change the last updated date at the top of it. If you have a question about anything here, call us and we will answer you directly.', link: { label: 'Contact us', href: '/en/contact/' } },
      ],
    },

    /* The English mirror of Part B. Rewritten 2026-09-30 with the Arabic: ONE
       payment of $500 buys the first six months, the normal price starts at $500
       PER MONTH, and after the six months the client picks $500, $1,000 or $1,500
       a month. "paid once" / "one payment" sits beside the number every single
       time the number appears. Do not shorten it away. */
    offerPage: {
      pill: 'Limited offer',
      /* See the Arabic H1 note. "search engines", never "Google". */
      h1: '<span class="hl">New customers</span><br class="brk"> from search engines and AI.',
      lead: 'This offer is for service companies in Saudi Arabia. One payment of $500 covers your first six months of the full work. We get your business found on Google and in AI, turning those visits into calls and customers.',

      price: {
        anchorLabel: 'Normal price',
        anchorValue: 'from $500 per month',
        offerLabel: 'This offer',
        offerValue: '$500 one time, covers six months',
        note: 'One payment, not monthly. No monthly bill during the six months.',
      },

      countdownLabel: 'Registration closes in',
      units: ['Days', 'Hours', 'Minutes', 'Seconds'],
      spots: (n) => `<span dir="ltr">${n}</span> seats left`,
      statusLine: 'Registration is open now',

      b2: { title: 'What is included', intro: 'One payment of $500 covers all six months, and the six months cover the full work, not a part of it.',
        items: [
          'Custom website design and development',
          'A dedicated page for every service and area',
          'Google Search visibility',
          'AI platform visibility',
          'Backlinks and authority building',
          'Hosting, domain and security',
        ] },

      proof: {
        title: 'One example of six months',
        /* See the Arabic note: the provenance moved to `meta`, it was not cut. */
        intro: 'A site we built. These are its numbers.',
        meta: 'kwtclean.com, 1 April 2026 to 19 September 2026.',
        alt: 'Google Search Console performance panel for kwtclean.com from 1 April 2026 to 19 September 2026: total clicks 1.99K, total impressions 114K, average CTR 1.7 percent, average position 10.9, and a daily curve that sits at zero through April, lifts through May and settles into a higher band to September.',
        panLabel: 'The kwtclean.com performance panel in Google Search Console',
        hint: 'Swipe the panel sideways to read all of it',
        caption: 'Six months of that work is what the one payment of $500 buys.',
        source: 'The image is an unedited export from Google Search Console. No figure in it has been changed.',
      },

      b3: { title: 'Eligibility', intro: 'The offer is for service companies in Saudi Arabia. Four conditions, and if all four are met your business qualifies.',
        items: [
          'A service business. We work with service companies only.',
          'A commercial registration or a freelance certificate. Either one is enough.',
          'A Google Business Profile with an address matching that certificate.',
          'No existing website.',
        ] },

      b4: { title: 'No contract', body: 'There is no contract, no commitment and no notice period. The $500 is one payment, there is no monthly bill during the six months, and nothing renews by itself. When the period ends the decision is yours alone, and nothing further is due if you stop.' },

      b5: { title: 'What happens after six months', intro: 'When the six months end you pick one of three monthly plans, or you stop. You decide.',
        tiers: ['$500', '$1,000', '$1,500'],
        tierUnit: 'per month',
        notes: [
          'What each plan covers is agreed with you on the call, against your industry and what the six months produced.',
          'If you choose to stop, you stop completely, with no fee and no notice.',
        ] },

      b6: { title: 'Common questions',
        items: [
          { q: 'Is the $500 per month?', a: 'No. The $500 is one payment and it covers all six months, with no monthly bill during them. The normal price for this service starts at $500 a month, and after the six months end you pick one of three monthly plans: $500, $1,000 or $1,500.' },
          { q: 'Why is it $500 for six months?', a: 'We take a limited number of companies in each city and work on them for a full six months until the result shows. That result is what makes a client decide to continue, and it is also what we show the next client. That is why the eligibility conditions exist. The offer only works with a business that is already running and already documented.' },
          { q: 'Is there a contract or a commitment?', a: 'No. There is no contract and no notice period. The $500 is one payment, there is no monthly bill during the six months, and nothing renews by itself. When the period ends, nothing further is due if you stop.' },
          { q: 'Do I need a commercial registration?', a: 'A commercial registration or a freelance certificate. Either one is enough. The only requirement is that the address on the certificate matches the address on your Google Business Profile.' },
          { q: 'I already have a website. Do I qualify?', a: 'The offer is for businesses with no existing website. If you have one and you want it replaced entirely, that is work we do outside this offer. Call us and we will look at it with you.' },
          { q: 'What happens after six months?', a: 'You decide. When the six months end you pick one of three monthly plans, $500, $1,000 or $1,500, and what each plan covers is agreed with you on the call, against your industry and what the six months produced. If you choose to stop, you stop completely, with no fee and no notice.' },
          { q: 'Do you manage my Google Business Profile during the offer?', a: 'No, neither during the offer nor outside it. We hand you a clear checklist for whoever manages the profile, then we track its effect in the search results.' },
        ] },

      b7: { h2: 'Call us and we check your <span class="hl">eligibility.</span>',
        lead: 'One call. We look at your certificate and your Google profile and tell you straight away whether your business fits the conditions.' },
    },
  },
};
