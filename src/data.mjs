// Q8Block — all copy for both pages in both locales.
// Words come from design/copy.md and NOWHERE else. Never transcribe text off a board.
// Layout, sizes, colours and spacing come from design/build-spec.md.

/* ─────────────────────────────────────────────────────────────────────────
   BUILD CONFIG — Ahmad sets these two. They are configuration, not copy.
   Both the homepage offer strip (§2) and the offer hero (B1) must still
   render a complete, sensible band when either one is switched off:
     COUNTDOWN_END = null  -> the countdown disappears, the strip/hero falls
                              back to "التسجيل مفتوح الآن / Registration is open now"
     SPOTS         = null  -> the "N spots per city" line disappears
   ───────────────────────────────────────────────────────────────────────── */
export const CONFIG = {
  // Registration close date. ISO 8601 with the Kuwait/Riyadh offset (+03:00).
  // Set to null (or a date in the past) to ship the page with no countdown.
  COUNTDOWN_END: '2026-12-31T23:59:59+03:00',

  // Seats per city. Ahmad's working number is around 9. Set to null to hide the line.
  SPOTS: 9,
};

/* ── NAP, from company.md. Fills slots only; never a source of copy. ── */
export const NAP = {
  phoneDisplay: '+965 94139666',
  phoneTel: '+96594139666',
  whatsapp: 'https://wa.me/96594139666',
  website: 'q8block.com',
  origin: 'https://q8block.com',
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

/* ── Section 7: eleven cards, every SEO client. Every percentage is reproduced
      in copy.md's derivation table. `clicks` is the site's real monthly click
      series from design/proof-data.md, used to draw the card's sparkline plate;
      a site with fewer than three complete months gets an empty plate carrying
      its first data month, because one month is not a curve.

      Card 11, movingcompanykw.com, resolved by Ahmad 2026-09-24: "Moving
      company is a valid company. You can put that in, no problem." It carries
      NO percentage — August 2025's 27 clicks fell to 11 in August 2026 and
      every window that turns that into growth starts from one of its own
      troughs — and NO "New project" tag, because fourteen months of recorded
      data makes that tag false. Sector, name and link, and nothing else. One
      card without a figure beside ten that have one is honest; an invented
      window would not be. ── */
export const WORK = [
  { site: 'kwtclean.com', url: 'https://kwtclean.com/', sector: { ar: 'خدمات التنظيف', en: 'Cleaning services' },
    figure: '+222%', period: { ar: 'مايو 2026 إلى أغسطس 2026', en: 'May 2026 to August 2026' },
    clicks: [7, 165, 354, 452, 531] },
  { site: 'carwashkw.com', url: 'https://carwashkw.com/', sector: { ar: 'غسيل السيارات', en: 'Car wash' },
    figure: '+32%', period: { ar: 'أغسطس 2025 إلى أغسطس 2026', en: 'August 2025 to August 2026' },
    clicks: [334, 389, 321, 287, 240, 211, 227, 199, 225, 287, 437, 386, 440] },
  { site: 'kuwaityclean.com', url: 'https://kuwaityclean.com/', sector: { ar: 'خدمات التنظيف', en: 'Cleaning services' },
    figure: '+326%', period: { ar: 'أغسطس 2025 إلى أغسطس 2026', en: 'August 2025 to August 2026' },
    clicks: [83, 65, 79, 89, 125, 127, 188, 107, 83, 154, 330, 372, 354] },
  { site: 'mashame3.com', url: 'https://mashame3.com/', sector: { ar: 'تكييف وتبريد', en: 'Air conditioning' },
    figure: '+883%', period: { ar: 'مارس 2026 إلى أغسطس 2026', en: 'March 2026 to August 2026' },
    clicks: [12, 31, 83, 86, 122, 118] },
  { site: 'kwcarwash.com', url: 'https://kwcarwash.com/', sector: { ar: 'غسيل السيارات', en: 'Car wash' },
    figure: '+270%', period: { ar: 'ديسمبر 2025 إلى أغسطس 2026', en: 'December 2025 to August 2026' },
    clicks: [23, 46, 72, 82, 97, 106, 108, 105, 85] },
  { site: 'q8carwash.com', url: 'https://q8carwash.com/', sector: { ar: 'غسيل السيارات', en: 'Car wash' },
    figure: '+900%', period: { ar: 'أغسطس 2025 إلى أغسطس 2026', en: 'August 2025 to August 2026' },
    clicks: [8, 21, 43, 105, 171, 193, 158, 148, 97, 118, 104, 72, 80] },
  { site: 'betikcleaner.com', url: 'https://betikcleaner.com/', sector: { ar: 'خدمات التنظيف', en: 'Cleaning services' },
    isNew: true, period: { ar: 'أول شهر بيانات: أغسطس 2026', en: 'First data month: August 2026' } },
  { site: 'anharpest.com', url: 'https://anharpest.com/', sector: { ar: 'مكافحة الحشرات', en: 'Pest control' },
    isNew: true, period: { ar: 'أول شهر بيانات: أغسطس 2026', en: 'First data month: August 2026' } },
  { site: 'alghadeerclean.com', url: 'https://alghadeerclean.com/', sector: { ar: 'خدمات التنظيف', en: 'Cleaning services' },
    isNew: true, period: { ar: 'أول شهر بيانات: أغسطس 2026', en: 'First data month: August 2026' } },
  { site: 'ragwaclean.com', url: 'https://ragwaclean.com/', sector: { ar: 'تنظيف الواجهات', en: 'Facade cleaning' },
    isNew: true, period: { ar: 'أول شهر بيانات: أغسطس 2026', en: 'First data month: August 2026' } },
  { site: 'movingcompanykw.com', url: 'https://movingcompanykw.com/', sector: { ar: 'نقل الأثاث', en: 'Furniture moving' } },
];

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

    meta: {
      home: {
        title: 'نبني موقعك ليجدك عملاؤك في جوجل والذكاء الاصطناعي | Q8 block',
        description: 'نبني لشركات الخدمات المحلية موقعًا كاملًا بصفحة مستقلة لكل خدمة ولكل منطقة، ثم نعمل على ظهوره في نتائج بحث جوجل وفي إجابات الذكاء الاصطناعي.',
        ogAlt: 'موقع إلكتروني يظهر في نتائج البحث المحلية وفي إجابات الذكاء الاصطناعي',
      },
      offer: {
        title: 'العرض: ستة أشهر مجانية بدون عقد | Q8 block',
        description: 'ستة أشهر من العمل الكامل على الموقع وتحسين محركات البحث، لشركات الخدمات في السعودية، دون رسوم ودون عقد. الشروط والتفاصيل كاملة.',
        ogAlt: 'عرض ستة أشهر مجانية من Q8 block',
      },
    },

    /* ── 0. Header ── */
    nav: [
      { label: 'ما نقدمه', href: '/#what-we-do' },
      { label: 'كيف نعمل', href: '/#journey' },
      { label: 'أعمالنا', href: '/#work' },
      { label: 'العرض', href: '/offer/' },
      { label: 'أسئلة شائعة', href: '/#faq' },
    ],
    cta: { call: 'اتصل الآن', whatsapp: 'واتساب' },
    menuOpen: 'القائمة', menuClose: 'إغلاق',
    skip: 'تخطَّ إلى المحتوى',

    /* ── 1. Hero ── */
    hero: {
      h1: 'نجعل عملاءك <span class="hl">يجدونك</span><br class="brk"> في جوجل وفي الذكاء الاصطناعي',
      lead: 'نبني لك موقعًا كاملًا، ثم نجعله يظهر لعملائك في نتائج البحث المحلية، ونهيئه ليكون مصدرًا تستشهد به مساعدات الذكاء الاصطناعي.',
      trust: [
        'نبني الموقع ثم نُظهره في نتائج البحث',
        'صفحة لكل خدمة ولكل منطقة',
        'نتائج موثقة من Google Search Console',
        'الاستضافة والنطاق والحماية علينا',
      ],
    },

    /* ── 2. Offer strip ── */
    strip: {
      pill: 'عرض محدود',
      line: 'ستة أشهر مجانية، بدون عقد',
      countdownLabel: 'يغلق التسجيل خلال',
      units: ['يوم', 'ساعة', 'دقيقة', 'ثانية'],
      spots: (n) => `<span dir="ltr">${n}</span> مقاعد لكل مدينة`,
      statusLine: 'التسجيل مفتوح الآن',
      link: 'الشروط والتفاصيل',
    },

    /* ── 3. The problem ── */
    problem: {
      eyebrow: 'المشكلة',
      h2: 'ملفك على جوجل يعمل.<br class="brk"> والموقع <span class="hl">يضاعف أثره</span>',
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

    /* ── 6. The journey ── */
    journey: {
      eyebrow: 'كيف نعمل',
      h2: 'هكذا يبدأ موقع جديد <span class="hl">في الظهور</span>',
      lead: 'هذه قصة موقع واحد بنيناه، شهرًا بعد شهر، كما صدّرها Google Search Console. لم نجمع بين عملاء مختلفين ولم نختر أفضل شهر من كل موقع.',
      siteLabel: 'kwtclean.com',
      stages: [
        { label: 'الشهر الأول، أبريل 2026', title: 'البناء', figure: '<span dir="ltr">7</span> نقرات في الشهر', body: 'يُصمَّم الموقع ويُبنى ويُنشر، وتُرسل صفحاته إلى جوجل للفهرسة.' },
        { label: 'الشهر الثاني، مايو 2026', title: 'الظهور', figure: '<span dir="ltr">165</span> نقرة في الشهر', body: 'تدخل صفحات الخدمات والمناطق الفهرس، ويبدأ العميل يجدها في بحثه.' },
        { label: 'بعد نحو ستة أشهر، أغسطس 2026', title: 'النمو', figure: '<span dir="ltr">531</span> نقرة في الشهر', body: 'يجد العميل صفحة الخدمة في منطقته، وتأتي المكالمة منها.' },
      ],
      precision: 'أبريل 2026 هو أول شهر سُجّلت فيه بيانات لهذا الموقع، وأغسطس 2026 هو خامس شهر كامل من البيانات، أي ما يقارب ستة أشهر من عمر الموقع إذا احتسبنا فترة الفهرسة التي تسبق أول نقرة.',
      baseline: [
        'وموقع مثل carwashkw.com حافظ على <span dir="ltr">199</span> إلى <span dir="ltr">440</span> نقرة في الشهر عبر ثلاثة عشر شهرًا كاملًا متتاليًا، من الموقع وحده.',
        'إن أردت أن تكون في أعلى النطاق، فالشرط أن تنفذ قائمة تعليمات ملف جوجل التي نسلمك إياها.',
      ],
      source: 'المصدر: Google Search Console، بيانات حتى <span dir="ltr">24</span> سبتمبر <span dir="ltr">2026</span>',
    },

    /* ── 7. Our work ── */
    work: {
      eyebrow: 'أعمالنا',
      h2: 'مواقع بنيناها <span class="hl">ويجدها العملاء</span> اليوم',
      lead: 'كل موقع هنا بُني من الصفر وما زال يعمل. نسبة النمو على كل بطاقة محسوبة من شهرين كاملين مكتوبين عليها، من Google Search Console. والمشاريع الحديثة موسومة كما هي، لأن بياناتها لم تكتمل بعد.',
      metricLabel: 'نمو النقرات',
      newTag: 'مشروع جديد',
      linkLabel: 'افتح الموقع',
      plateCaption: 'النقرات الشهرية، Google Search Console',
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
          { label: 'الصفحة الرئيسية', href: '/' },
          { label: 'أعمالنا', href: '/#work' },
          { label: 'أسئلة شائعة', href: '/#faq' },
        ] },
        { title: 'ما نقدمه', links: [
          { label: 'ما نقدمه', href: '/#what-we-do' },
          { label: 'ما يشمله العمل', href: '/#included' },
          { label: 'كيف نعمل', href: '/#journey' },
        ] },
        { title: 'العرض', links: [
          { label: 'العرض', href: '/offer/' },
          { label: 'الشروط والتفاصيل', href: '/offer/#offer-eligibility' },
          { label: 'قائمة ملف جوجل', href: '/google-business-profile-checklist.html' },
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

    /* ═══ PART B. The offer page ═══ */
    offerPage: {
      pill: 'عرض محدود',
      h1: 'ستة أشهر <span class="hl">مجانية</span>،<br class="brk"> بدون عقد',
      lead: 'ستة أشهر من العمل الكامل، دون رسوم. نبني موقعك ونكتب صفحاته، ليجدك العميل الذي يبحث عن خدمتك في جوجل وفي إجابات الذكاء الاصطناعي فيتصل بك، وتتحول هذه المكالمات إلى عملاء وإلى إيرادات لنشاطك. العرض متاح لشركات الخدمات في السعودية، دون التزام.',
      countdownLabel: 'يغلق التسجيل خلال',
      units: ['يوم', 'ساعة', 'دقيقة', 'ثانية'],
      spots: (n) => `<span dir="ltr">${n}</span> مقاعد لكل مدينة`,
      statusLine: 'التسجيل مفتوح الآن',

      b2: { title: 'ما يشمله العرض', intro: 'الأشهر الستة تشمل العمل كاملًا، لا جزءًا منه.',
        items: [
          'تصميم وتطوير موقع مخصص',
          'صفحة مستقلة لكل خدمة ولكل منطقة',
          'الظهور في نتائج بحث جوجل',
          'الظهور في منصات الذكاء الاصطناعي',
          'بناء الروابط والسلطة',
          'الاستضافة والنطاق والحماية',
        ] },

      b3: { title: 'شروط القبول', intro: 'العرض مخصص لشركات الخدمات في السعودية. ثلاثة شروط، وإن تحققت جميعها فنشاطك مؤهل.',
        items: [
          'سجل تجاري أو وثيقة عمل حر. أي منهما يكفي.',
          'ملف نشاط تجاري على جوجل بعنوان مطابق للوثيقة.',
          'لا يوجد موقع إلكتروني قائم.',
        ] },

      b4: { title: 'بدون عقد', body: 'لا يوجد عقد ولا التزام ولا فترة إشعار. تستطيع التوقف في أي وقت خلال الأشهر الستة أو بعدها، دون رسوم.' },

      b5: { title: 'ماذا يحدث بعد ستة أشهر', intro: 'القرار لك. أمامك ثلاثة خيارات، تختار منها ما يناسبك.',
        items: [
          'الاستمرار في العمل الكامل عبر خطة، يُحدد سعرها حسب قطاعك وحسب النتائج التي تحققت.',
          'إيقاف العمل على محركات البحث والاحتفاظ بالموقع مباشرًا مقابل رسم شهري بسيط.',
          'التوقف نهائيًا، دون رسوم ودون إشعار.',
        ] },

      b6: { title: 'أسئلة شائعة',
        items: [
          { q: 'لماذا هذا العرض مجاني؟', a: 'نختار عددًا محدودًا من الشركات في كل مدينة ونعمل عليها ستة أشهر كاملة حتى تظهر النتيجة. النتيجة نفسها هي ما يجعل العميل يقرر الاستمرار، وهي أيضًا ما نعرضه على العميل التالي. ولهذا وُضعت شروط القبول: العرض لا ينجح إلا مع نشاط قائم وموثق فعلًا.' },
          { q: 'هل هناك عقد أو التزام؟', a: 'لا. لا يوجد عقد. تستطيع التوقف في أي وقت خلال الأشهر الستة أو بعدها، دون رسوم ودون إشعار مسبق.' },
          { q: 'هل يشترط وجود سجل تجاري؟', a: 'سجل تجاري أو وثيقة عمل حر. أي منهما يكفي. الشرط الوحيد أن يطابق العنوان المسجل في الوثيقة عنوان ملف نشاطك على جوجل.' },
          { q: 'لدي موقع قائم، هل أنا مؤهل؟', a: 'العرض مخصص لمن لا يملك موقعًا قائمًا. إن كان لديك موقع وتريد استبداله بالكامل، فهذا عمل نقوم به خارج هذا العرض، واتصل بنا لنراجعه معك.' },
          { q: 'ماذا يحدث لموقعي بعد ستة أشهر؟', a: 'القرار لك، وأمامك ثلاثة خيارات. الأول، الاستمرار في العمل الكامل عبر خطة يُحدد سعرها حسب قطاعك وحسب النتائج التي تحققت. الثاني، إيقاف العمل على محركات البحث والاحتفاظ بالموقع مباشرًا مقابل رسم شهري بسيط. الثالث، التوقف نهائيًا، دون رسوم ودون إشعار.' },
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

    meta: {
      home: {
        title: 'We build your website and get you found | Q8 block',
        description: 'We build local service businesses a full website with a dedicated page for every service and every area, then get it found in Google search and in AI answers.',
        ogAlt: 'A website found in local search and in AI answers',
      },
      offer: {
        title: 'The offer: six months free, no contract | Q8 block',
        description: 'Six months of full website and search work for service companies in Saudi Arabia, with no fee and no contract. Full conditions and details.',
        ogAlt: 'The Q8 block six months free offer',
      },
    },

    nav: [
      { label: 'What we do', href: '/en/#what-we-do' },
      { label: 'How it works', href: '/en/#journey' },
      { label: 'Our work', href: '/en/#work' },
      { label: 'The offer', href: '/en/offer/' },
      { label: 'FAQ', href: '/en/#faq' },
    ],
    cta: { call: 'Call now', whatsapp: 'WhatsApp' },
    menuOpen: 'Menu', menuClose: 'Close',
    skip: 'Skip to content',

    hero: {
      h1: 'Customers <span class="hl">find you</span><br class="brk"> on Google and in AI.',
      lead: 'We build your whole website, then we get it found in local search and prepare it to be a source AI assistants cite.',
      trust: [
        'We build it then we get it found',
        'A page for every service and area',
        'Results documented in Google Search Console',
        'Hosting, domain and security included',
      ],
    },

    strip: {
      pill: 'Limited offer',
      line: 'Six months free, no contract',
      countdownLabel: 'Registration closes in',
      units: ['Days', 'Hours', 'Minutes', 'Seconds'],
      spots: (n) => `<span dir="ltr">${n}</span> spots per city`,
      statusLine: 'Registration is open now',
      link: 'Terms and details',
    },

    problem: {
      eyebrow: 'The problem',
      h2: 'Your profile works.<br class="brk"> A website <span class="hl">multiplies it.</span>',
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

    journey: {
      eyebrow: 'How it works',
      h2: 'How a new site <span class="hl">gets found.</span>',
      lead: 'This is the story of one site we built, month by month, exactly as Google Search Console exported it. We did not mix clients together and we did not pick the best month from each site.',
      siteLabel: 'kwtclean.com',
      stages: [
        { label: 'Month one, April 2026', title: 'Build', figure: '<span dir="ltr">7</span> clicks in the month', body: 'The site is designed, built and published, and sent to Google.' },
        { label: 'Month two, May 2026', title: 'Get discovered', figure: '<span dir="ltr">165</span> clicks in the month', body: 'Service and area pages enter the index. Customers find them.' },
        { label: 'About six months in, August 2026', title: 'Get traction', figure: '<span dir="ltr">531</span> clicks in the month', body: 'A customer finds the page for his area, and calls you from it.' },
      ],
      precision: 'April 2026 is the first month with recorded data for this site, and August 2026 is its fifth full data month, which is close to six months of site age once the indexing period before the first click is counted.',
      baseline: [
        'And a site like carwashkw.com has held between <span dir="ltr">199</span> and <span dir="ltr">440</span> clicks a month across thirteen consecutive complete months, from the website alone.',
        'If you want to sit at the top of the range, the condition is that you work through the Google Business Profile checklist we hand you.',
      ],
      source: 'Source: Google Search Console, data to <span dir="ltr">24 September 2026</span>',
    },

    work: {
      eyebrow: 'Our work',
      h2: 'Sites we built that <span class="hl">get found.</span>',
      lead: 'Every site here was built from scratch and is still running. The growth figure on each card is computed from the two complete months printed on it, from Google Search Console. The recent projects are labelled as what they are, because their data is not in yet.',
      metricLabel: 'Click growth',
      newTag: 'New project',
      linkLabel: 'View case study',
      plateCaption: 'Monthly clicks, Google Search Console',
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
          { label: 'Our work', href: '/en/#work' },
          { label: 'FAQ', href: '/en/#faq' },
        ] },
        { title: 'What we do', links: [
          { label: 'What we do', href: '/en/#what-we-do' },
          { label: 'What is included', href: '/en/#included' },
          { label: 'How it works', href: '/en/#journey' },
        ] },
        { title: 'The offer', links: [
          { label: 'The offer', href: '/en/offer/' },
          { label: 'Terms and details', href: '/en/offer/#offer-eligibility' },
          { label: 'Google profile checklist', href: '/en/google-business-profile-checklist.html' },
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

    offerPage: {
      pill: 'Limited offer',
      h1: 'Six months <span class="hl">free</span>,<br class="brk"> no contract.',
      lead: 'Six months of the full work, with no fee. We build your website and write every page, so the customer searching for your service discovers you on Google and in AI answers and calls you, and those calls become clients and revenue. The offer is open to service companies in Saudi Arabia, with no commitment.',
      countdownLabel: 'Registration closes in',
      units: ['Days', 'Hours', 'Minutes', 'Seconds'],
      spots: (n) => `<span dir="ltr">${n}</span> spots per city`,
      statusLine: 'Registration is open now',

      b2: { title: 'What is included', intro: 'The six months cover the full work, not a part of it.',
        items: [
          'Custom website design and development',
          'A dedicated page for every service and area',
          'Google Search visibility',
          'AI platform visibility',
          'Backlinks and authority building',
          'Hosting, domain and security',
        ] },

      b3: { title: 'Eligibility', intro: 'The offer is for service companies in Saudi Arabia. Three conditions, and if all three are met your business qualifies.',
        items: [
          'A commercial registration or a freelance certificate. Either one is enough.',
          'A Google Business Profile with an address matching that certificate.',
          'No existing website.',
        ] },

      b4: { title: 'No contract', body: 'There is no contract, no commitment and no notice period. You can stop at any time during the six months or after them, with no fee.' },

      b5: { title: 'What happens after six months', intro: 'You decide. You have three options and you pick the one that suits you.',
        items: [
          'Continue the full work on a plan, priced according to your industry and the results achieved.',
          'Stop the search work and keep the website live for a small monthly fee.',
          'Stop completely, with no fee and no notice.',
        ] },

      b6: { title: 'Common questions',
        items: [
          { q: 'Why is this offer free?', a: 'We take a limited number of companies in each city and work on them for a full six months until the result shows. That result is what makes a client decide to continue, and it is also what we show the next client. That is why the eligibility conditions exist. The offer only works with a business that is already running and already documented.' },
          { q: 'Is there a contract or a commitment?', a: 'No. There is no contract. You can stop at any time during the six months or after them, with no fee and no notice period.' },
          { q: 'Do I need a commercial registration?', a: 'A commercial registration or a freelance certificate. Either one is enough. The only requirement is that the address on the certificate matches the address on your Google Business Profile.' },
          { q: 'I already have a website. Do I qualify?', a: 'The offer is for businesses with no existing website. If you have one and you want it replaced entirely, that is work we do outside this offer. Call us and we will look at it with you.' },
          { q: 'What happens to my website after six months?', a: 'You decide, and you have three options. One, continue the full work on a plan, priced according to your industry and the results achieved. Two, stop the search work and keep the website live for a small monthly fee. Three, stop completely, with no fee and no notice.' },
          { q: 'Do you manage my Google Business Profile during the offer?', a: 'No, neither during the offer nor outside it. We hand you a clear checklist for whoever manages the profile, then we track its effect in the search results.' },
        ] },

      b7: { h2: 'Call us and we check your <span class="hl">eligibility.</span>',
        lead: 'One call. We look at your certificate and your Google profile and tell you straight away whether your business fits the conditions.' },
    },
  },
};
