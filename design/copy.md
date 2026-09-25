# Q8Block landing page copy

Arabic is the primary language and ships at `/`. English is the mirror at `/en/`.
The offer page ships at `/offer` (Arabic) and `/en/offer` (English) and is written in Part B of this file.

Rules applied throughout: headlines eight words or fewer, no dashes, no emojis, two CTA labels only,
no invented facts, numbers, prices, durations, client names or testimonials.

**Two rules govern this file above all others. Both come from Ahmad, 2026-09-24.**

**1. No geography in the brand copy.** Q8Block is an SEO agency for local service businesses. It does
not state who it sells to by location. No country, no region, no market appears anywhere on the
homepage, including the page title and the meta description. The phrase is always
`شركات الخدمات المحلية` / `local service businesses`, never a nationality. The company's own address in
the footer stays, because that is NAP from `company.md`, not positioning. The only place in this file
where a country is named is Part B, the offer page, because being in Saudi Arabia is a condition of that
one promotion.

**2. Figures live in two sections and nowhere else.** Every performance figure on the homepage appears
in Section 6 and Section 7 only. Not in Section 3, not in 4, not in 5, not in the FAQ, not in the offer
strip, not in Part B. No figure ever appears in a headline. A figure is never phrased as a promise or a
forecast: it is one named client, one named period, already in the past. Every figure comes from
`clients/q8block/design/proof-data.md` exactly as exported. If it is not in the register at the end of
this file, it does not go on the page.

**2b. The one derivation allowed, added 2026-09-24.** Section 7 cards carry a growth percentage instead
of a raw monthly total. A percentage is the only computed number on the site, and it is computed one way
only: clicks in one named complete month against clicks in another named complete month, both exported in
`proof-data.md`, rounded to a whole percent. Both months are printed on the card, so the reader can check
the arithmetic himself. Nothing is averaged across clients, nothing is taken from a partial month, and no
site gets a percentage that its own two months do not produce. A site whose history is too short, or whose
history does not support an honest growth figure, gets the `مشروع جديد` / `New project` tag or no figure at
all. It never gets an invented one (Ahmad, 2026-09-24: `we don't want fake`).

**3. The word `rank` is not a selling word on this site (Ahmad, 2026-09-24).** His words: `I don't like the
word ranking because this is outdated now. We want something about discoverability with search engines and
AI. They're like, what is ranking? What does that mean?` So `rank`, `ranking`, `يتصدر`, `نتصدر` and
`ترتيب` never carry the promise anywhere: not in a headline, an eyebrow, a subhead, a card title, the
footer strapline, the page title or the meta description. The register everywhere is being **found** and
being **discovered**, across Google search and AI assistants, matching the approved hero headline
`نجعل عملاءك يجدونك في جوجل وفي الذكاء الاصطناعي` / `Customers find you on Google and in AI`. The word
survives in exactly two places, both plainly descriptive inside a factual FAQ answer (Section 8, Q1 and
Q4), where it explains how search works rather than promising anything.

Company name, phone and address come from `company.md` and fill slots only. They are never the source
of the copy. The brand mark reads `Q8 block` in both locales: it is a mark, not a translated phrase. The
registered Arabic name `شركة كويت بلوك` appears only in the footer NAP and the legal line.

Only two slots remain anywhere in this file: `[COUNTDOWN]` and `[SPOTS]`, both build config.

---

# PART A. Homepage

## Page meta

No country, no region, no market.

| Field | Arabic (`/`) | English (`/en/`) |
|---|---|---|
| Title | نبني موقعك ليجدك عملاؤك في جوجل والذكاء الاصطناعي \| Q8 block | We build your website and get you found \| Q8 block |
| Description | نبني لشركات الخدمات المحلية موقعًا كاملًا بصفحة مستقلة لكل خدمة ولكل منطقة، ثم نعمل على ظهوره في نتائج بحث جوجل وفي إجابات الذكاء الاصطناعي. | We build local service businesses a full website with a dedicated page for every service and every area, then get it found in Google search and in AI answers. |
| OG image alt | موقع إلكتروني يظهر في نتائج البحث المحلية وفي إجابات الذكاء الاصطناعي | A website found in local search and in AI answers |

---

## 0. Header

**Background** white, solid `#FFFFFF` on scroll.

**Rebuilt 2026-09-24. Every scroll-to-section link is gone.** Ahmad: `I hate navigation scrollies.
When I click on something and then it scrolls I hate that. Remove all navigation.` So no `#section`
link appears in the header or the footer, and `scroll-behavior: smooth` is out of the stylesheet. The
offer also left the nav: it lives in the banner under the hero, which is now a clickable bar.

The five nav items point at five real pages. Arabic at `/`, English mirrors under `/en/`.

| Element | Arabic | English | Href (ar / en) |
|---|---|---|---|
| Logo lockup | Q8 block | Q8 block | `/` · `/en/` |
| Nav 1 | الرئيسية | Home | `/` · `/en/` |
| Nav 2 | من نحن | About us | `/about/` · `/en/about/` |
| Nav 3 | المدونة | Blog | `/blog/` · `/en/blog/` |
| Nav 4 | الشروط والأحكام | Terms and conditions | `/terms/` · `/en/terms/` |
| Nav 5 | تواصل معنا | Contact us | `/contact/` · `/en/contact/` |
| Language link | English | العربية | the mirror of the current page |
| CTA | اتصل الآن | Call now | `tel:` |

**Logo note.** The approved board generated the wordmark as `Q8 digital`. That was a model slip. The mark
reads `Q8 block`: orange square holding `Q8`, wordmark `block` beside it. The logo is HTML and CSS built
from `brand/logo/index.html`, never a generated image, so this costs nothing to fix.

---

## 1. Hero

**Approved board C, locked.** Background `#F5F6F7`. Centred. Headline carries one orange highlight bar.
Two fixes against the board and nothing else: the wordmark reads `Q8 block`, and the small `Kuwait Block`
line above the headline is deleted. Nobody changes the headline, the highlight, the CTAs or the layout.

**Two lines were touched here earlier on 2026-09-24, both under rules Ahmad gave the same day, both
revertible in one edit.** The English headline is untouched and stays exactly as approved; the Arabic
headline was replaced later the same day by Ahmad himself, see the note under the table below.
1. The subhead's `ثم نرفعه إلى الصفحة الأولى` / `then we rank it on the first page` was the rank promise
   the new rule forbids. It now reads as discoverability. Nothing else in the sentence moved.
2. Trust point 1 read `We build it then we rank it`. Same reason, same fix.
3. Trust point 4 is resolved, and the reasoning is written out under the trust row below.

**The Arabic headline changed on 2026-09-24, and it is Ahmad's own line.** It now reads
`تبي عملاءك يجدونك في جوجل وفي الذكاء الاصطناعي؟` — **deliberately Gulf colloquial** (`تبي`, not the
MSA `هل تريد`) and **deliberately a question**. It is the hook, and it is the only colloquial string
on the site: every other Arabic line in this file stays professional MSA. **Do not "correct" it.**
The highlight stays on `يجدونك`. The English headline is unchanged.

| Element | Arabic | English |
|---|---|---|
| Headline | تبي عملاءك يجدونك في جوجل وفي الذكاء الاصطناعي؟ | Customers find you on Google and in AI. |
| Highlighted word | يجدونك | find you |
| Subhead | نبني لك موقعًا كاملًا، ثم نجعله يظهر لعملائك في نتائج البحث المحلية، ونهيئه ليكون مصدرًا تستشهد به مساعدات الذكاء الاصطناعي. | We build your whole website, then we get it found in local search and prepare it to be a source AI assistants cite. |
| CTA primary | اتصل الآن | Call now |
| CTA secondary | واتساب | WhatsApp |

**Trust row, four points, separated by thin orange rules as on the board.**

| # | Arabic | English |
|---|---|---|
| 1 | نبني الموقع ثم نُظهره في نتائج البحث | We build it then we get it found |
| 2 | صفحة لكل خدمة ولكل منطقة | A page for every service and area |
| 3 | نتائج موثقة من Google Search Console | Results documented in Google Search Console |
| 4 | الاستضافة والنطاق والحماية علينا | Hosting, domain and security included |

### The fourth trust point, resolved 2026-09-24. Marked Ahmad-reversible.

Point 4 used to read `بدون عقد` / `No contract`, which came out of the offer terms. The question was put to
Ahmad twice and not answered, so the safe option is taken rather than left open: an offer term cannot sit
in brand copy if nobody has confirmed it is true outside the promotion.

Point 4 is now **Section 5 deliverable 6**, `الاستضافة والنطاق والحماية علينا` /
`Hosting, domain and security included`. It is a permanent deliverable, true every month of the year
whether the promotion is running or switched off, and it is already stated on the page in Section 5 and in
FAQ Q2, so it introduces no new claim.

**Ahmad-reversible, one edit.** If he confirms `no contract` is true of Q8Block all year, swap the two
cells in the row above back to `بدون عقد` / `No contract` and nothing else in the hero moves. The rejected
alternative, `ملفك على جوجل يبقى لك` / `Your Google profile stays yours`, is deliberately not used here:
Ahmad cut that line from Section 4 as `weird to say`, so it does not belong in the hero either. The fact
itself lives in FAQ Q3.

---

## 2. Offer strip

**Background** dark `#141415`. Thin band, one line tall on desktop. Orange on the pill and the countdown
numerals only. This strip and `/offer` are the only two places the promotion exists. Nothing else on this
page mentions it.

No country here. The strip sells the shape of the offer; the conditions, including the country, live on
`/offer` where a reader has asked for them.

The strip must render a complete, sensible band with `[COUNTDOWN]` removed and `[SPOTS]` empty, so two
states are written.

**Rebuilt 2026-09-24 on Ahmad's instruction, and this supersedes the old build note.** His words:
`the link to check the offer says terms and details. Remove this because it's taking a whole row which
I don't like. It should be inside the same row where it has all the information... I think the whole
thing should be clickable. Also there should be a CTA somewhere. But no new rows please.`

1. **The separate `الشروط والتفاصيل` / `Terms and details` row is deleted.** It does not appear anywhere
   on the strip in either state.
2. **Everything sits on one row:** pill, line, countdown label, countdown, spots line, CTA.
3. **The whole band is the link to `/offer/`** (`/en/offer/` on English pages). The bar itself is the
   `<a>`, so the full-bleed band is the hit area, and it has a visible hover state.
4. **The pill stays and is now a label, not an action.** Ahmad likes the pill but noted it read like a
   CTA. Now that the row carries a real CTA, the pill is an outline in brand orange and the CTA takes
   the solid orange fill. Two things cannot both read as the action.
5. `اطلع على العرض` / `See the offer` is a **navigation** CTA into the offer page. The site still has
   exactly two contact CTA labels, `اتصل الآن` / `Call now` and `واتساب` / `WhatsApp`.

### Full state, countdown running

| Element | Arabic | English |
|---|---|---|
| Label pill | عرض محدود | Limited offer |
| Line | ستة أشهر مجانًا لشركات خدمية | 6 months free, service firms |
| Countdown label | يغلق التسجيل خلال | Registration closes in |
| Countdown | `[COUNTDOWN]` | `[COUNTDOWN]` |
| Countdown units | يوم · ساعة · دقيقة · ثانية | Days · Hours · Minutes · Seconds |
| Spots line | `[SPOTS]` مقاعد متبقية | `[SPOTS]` seats left |
| CTA, same row | اطلع على العرض | See the offer |

**Line shortened 2026-09-25 (build-spec §21).** `ستة أشهر مجانية لشركات الخدمات` /
`Six months free for service companies` was the string §18.3 added to carry the "service companies"
qualifier, but it pushed the phone strip to four rows (§18.6) because the English could no longer share
a row with the pill at 390px. Shortened to keep the same qualifier in fewer pixels — `شركات خدمية` /
`service firms` reads the same and the band is back to three rows on a phone, in both locales.

### Static state, countdown removed and spots empty

| Element | Arabic | English |
|---|---|---|
| Label pill | عرض محدود | Limited offer |
| Line | ستة أشهر مجانًا لشركات خدمية | 6 months free, service firms |
| Status line | التسجيل مفتوح الآن | Registration is open now |
| CTA, same row | اطلع على العرض | See the offer |

---

## 3. The problem

**Background** white. Three cards. One flat 2D illustration slot each, filled from the section board.
No figures anywhere in this section. **The design is approved and unchanged. Only the headline row and the
subhead were rewritten, 2026-09-24.**

**Rewritten 2026-09-25 to state the PROBLEM. This supersedes both headlines that used to sit here.** The
line that shipped, `ملفك على جوجل يعمل. والموقع يضاعف أثره` / `Your profile works. A website multiplies
it.`, is the **solution sentence sitting inside the problem section**. Ahmad's correction: the problem is
that the reader has a working Google profile **and no website behind it**, and his own line for it was
`ملفك على جوجل يعمل وما عندك موقع إلكتروني`.

The headline now says that and nothing else. Eight words in each language, the orange highlight on the half
that carries the point — the absence of a website, never the profile.

**The Arabic is deliberately Gulf colloquial** (`وما عندك`, not the MSA `وليس لديك`), because it is Ahmad's
own line and because it pairs with the hero H1 he also wrote colloquially (`تبي عملاءك...`). Those two
display lines are in his voice; **every other Arabic string in this file stays professional MSA**. Do not
"correct" it, exactly as §1 says of the hero.

| Element | Arabic | English |
|---|---|---|
| Eyebrow | المشكلة | The problem |
| Headline | ملفك على جوجل يعمل وما عندك موقع إلكتروني؟ | Your Google profile works. You have no website? |
| Highlighted phrase | وما عندك موقع إلكتروني؟ | no website? |

**Question mark added 2026-09-25 (build-spec §21).** The hero H1 ends in `؟`
(`تبي عملاءك يجدونك...؟`, §15.6) and this headline is its pair — the same rhetorical question asked twice,
once as a hook and once as the problem. It shipped without the mark, so the pair did not read as intended.
Both languages now close on a question mark; the highlight still sits on the same phrase, one character
longer.

**The subhead was re-read against the new headline and is unchanged.** It still follows from it: the profile
reaches a narrow radius and that is all it can do, a website would widen the same demand, and it closes on
`الفارق بين الاثنين هو عمل قائم لا يصلك اليوم` / `The gap between the two is real work that is not reaching
you yet` — which is the cost of the absence the headline has just named. Nothing in it contradicts the new
line, so nothing in it moved.

**The three cards are unchanged and still read as consequences of the stated problem**: with no website the
map stops at your district, a competitor page answers the question instead, and AI has no text about you to
quote. Card 3 already says `بلا موقع` / `With no website` in as many words.

**The two retired headlines, kept only so nobody reinstates one by accident.**
`ملفك على جوجل يعمل. والموقع يضاعف أثره` / `Your profile works. A website multiplies it.` was the default and
`ملفك يجلب المكالمات. والموقع يضاعفها` / `Your profile brings calls. A website multiplies them.` was the
alternative held for Ahmad. Both describe the solution, which is the thing he rejected. Neither is the
default any more and neither goes on the page.

| Element | Arabic | English |
|---|---|---|
| Subhead | ملفك على جوجل يضعك على الخريطة داخل نطاق ضيق حول عنوانك، وهذا كل ما يستطيعه. الموقع يأخذ الطلب نفسه ويوسعه: كل منطقة تخدمها، وكل سؤال يكتبه العميل قبل أن يتصل، وكل إجابة تقدمها مساعدات الذكاء الاصطناعي. الفارق بين الاثنين هو عمل قائم لا يصلك اليوم. | Your Google profile puts you on the map inside a narrow radius around your address, and that is as far as it reaches. A website takes the same demand and widens it: every area you serve, every question a customer types before he calls, and every answer an AI assistant gives. The gap between the two is real work that is not reaching you yet. |

**The three cards below are approved and their titles are locked.** Their bodies were re-read on
2026-09-24 against the new framing and none of them presumes an existing website: card 1 compares a profile
radius with what a website would reach, card 2 says a competitor page answers the question the reader is
absent from, and card 3 says `With no website there is no text about you to cite`. No sentence was changed.

**Card 1**

| | Arabic | English |
|---|---|---|
| Title | الخريطة تتوقف عند حدود حيّك | The map stops at your district |
| Body | ملف النشاط التجاري يظهر في نطاق ضيق حول عنوانك المسجل. الموقع الإلكتروني يظهر في كل مدينة وكل حي تستهدفه بصفحة مخصصة. | A business profile shows inside a narrow radius around your registered address. A website shows in every city and district you target, with a page built for it. |

**Card 2**

| | Arabic | English |
|---|---|---|
| Title | المنافس يجيب قبلك | Your competitor answers first |
| Body | عندما يريد العميل التفاصيل، تجيبه صفحة المنافس. السؤال نفسه يُطرح، وأنت غائب عن الإجابة. | When the customer wants the detail, a competitor page answers him. The same question gets asked, and you are absent from the answer. |

**Card 3**

| | Arabic | English |
|---|---|---|
| Title | الذكاء الاصطناعي لا يجد ما يقتبسه | AI has nothing to quote |
| Body | مساعدات الذكاء الاصطناعي تقتبس صفحات مكتوبة ومفهرسة. بلا موقع، لا يوجد نص يمكن الاستشهاد به عنك. | AI assistants quote pages that are written and indexed. With no website there is no text about you to cite. |

---

## 4. What we do

**Background** light `#F5F6F7`. Three blocks. This section corrects the category: we are not an agency
that optimises the site you already have. No figures anywhere in this section.

**The design of this section is approved and unchanged. Only the copy was rewritten, 2026-09-24.** Same
three-block shape, same layout, same widths. Two things changed inside it:
1. The headline no longer says `rank`.
2. **The old Block C, `Your Google profile stays yours`, is deleted.** Ahmad: `that's weird to say, we
   don't need to mention that.` The fact is not lost, it simply belongs in an answer rather than a
   headline block, and it is already written in full in FAQ Q3. Do not reinstate it here.

The three blocks now read as one sequence rather than three unrelated claims: build it, get it found, keep
it growing. Every deliverable named in block C is one Ahmad already sells and it is already listed in
Section 5, items 5 and 6.

| Element | Arabic | English |
|---|---|---|
| Eyebrow | ما نقدمه | What we do |
| Headline | نبني الموقع، ثم نجعل عملاءك يجدونه | We build the site. We get it found. |
| Highlighted word | يجدونه | get it found |
| Subhead | لا نعمل على مواقع بناها غيرنا. الأساس التقني هو ما يحدد النتيجة، ولذلك نصمم الموقع ونبنيه بأنفسنا، ثم نتحمل مسؤولية ظهوره في نتائج البحث وفي إجابات الذكاء الاصطناعي. | We do not work on websites other people built. The technical foundation decides the result, so we design and build the site ourselves, then we take responsibility for it being found in search and in AI answers. |

**Block A**

| | Arabic | English |
|---|---|---|
| Title | نصمم ونبني | We design and build |
| Body | تصميم وبرمجة موقع كامل من الصفر، بصفحة مستقلة لكل خدمة ولكل منطقة تخدمها، بسرعة تحميل عالية وبنية تقنية سليمة. | A full website designed and coded from scratch, with a separate page for every service and every area you serve, fast to load and technically sound. |

**Block B**

| | Arabic | English |
|---|---|---|
| Title | نجعل عملاءك يجدونك | We get you found |
| Body | تهيئة داخلية وتقنية، ومحتوى محلي مكتوب لكل صفحة، حتى تظهر صفحاتك للعميل في نتائج بحث جوجل، وتصبح قابلة للاقتباس في إجابات مساعدات الذكاء الاصطناعي. | On page and technical work, and local content written for every page, so your pages come up for the customer in Google search and become quotable in the answers AI assistants give. |

**Block C**

| | Arabic | English |
|---|---|---|
| Title | نُبقيه يعمل وينمو | We keep it running and growing |
| Body | الاستضافة والنطاق والحماية والتحديثات التقنية تبقى علينا، ويستمر بناء الروابط وسلطة النطاق شهرًا بعد شهر، مع متابعة شهرية لظهور الصفحات. | Hosting, the domain, security and the technical updates stay with us, links and domain authority keep building month after month, and you get monthly tracking of how the pages are found. |

---

## 5. What is included

**Background** white. Six items, one flat 2D icon each, three across on desktop and two on tablet.

This is the service, not the promotion. It is written as a permanent capability and it survives the
promotion being switched off. No figures, no prices, no durations, no country.

**The design of this section is approved and unchanged. Only wording moved, 2026-09-24.** Two notes, both
from Ahmad the same day:

1. **The six items below are the real six deliverables and the list does not change.** One of the generated
   section boards came back drawing a different list, `keyword research, content creation, link building,
   on page SEO, performance tracking, ongoing support`. That was the image model inventing a stock SEO
   list, not copy from this file. It is not the offer, it never was, and no part of it may be built. The
   six rows in the table below are the list.
2. **Website design and development has to be visible in this list, not buried.** It is item 1, first in
   reading order, and its title now says both words explicitly: `تصميم وتطوير موقع مخصص` /
   `Custom website design and development`. The same title is used on the offer page in B2 so the two
   lists cannot drift apart.

The headline and subhead were already free of the rank promise and are unchanged. Items 3 and 5 had the
words `موقع الصفحات في نتائج البحث` and `الترتيب` inside their bodies; both now read as visibility.

| Element | Arabic | English |
|---|---|---|
| Eyebrow | ما يشمله العمل | What is included |
| Headline | ما نقدمه في كل مشروع | What every project includes. |
| Highlighted word | كل مشروع | every project |
| Subhead | هذه ليست قائمة عرض مؤقت. هذا هو العمل نفسه، في كل مشروع نبدأه. | This is not a promotion list. This is the work itself, on every project we start. |

| # | Icon | Arabic title | Arabic body | English title | English body |
|---|---|---|---|---|---|
| 1 | Website build | تصميم وتطوير موقع مخصص | موقع يُصمَّم ويُبرمَج من الصفر لنشاطك، لا قالب جاهز يُعاد تركيبه. | Custom website design and development | A website designed and coded from scratch for your business, not a template reassembled. |
| 2 | Page per service and area | صفحة مستقلة لكل خدمة ولكل منطقة | كل خدمة تقدمها وكل منطقة تخدمها تحصل على صفحتها الخاصة بمحتوى مكتوب لها وحدها. | A dedicated page for every service and area | Every service you offer and every area you cover gets its own page, with content written for it alone. |
| 3 | Google Search | الظهور في نتائج بحث جوجل | تهيئة داخلية وتقنية، ومحتوى محلي لكل صفحة، ومتابعة شهرية لظهور الصفحات في نتائج البحث. | Google Search visibility | On page and technical optimisation, local content for every page, and monthly tracking of how the pages are found in search. |
| 4 | AI answers | الظهور في منصات الذكاء الاصطناعي | بنية محتوى واضحة ومفهرسة تجعل صفحاتك قابلة للاقتباس في إجابات مساعدات الذكاء الاصطناعي. | AI platform visibility | A clear, indexed content structure that makes your pages quotable in the answers AI assistants give. |
| 5 | Authority | بناء الروابط والسلطة | عمل مستمر على الروابط الخارجية وعلى سلطة النطاق، لأن الظهور لا يأتي من الصفحة وحدها. | Backlinks and authority building | Continuous work on external links and domain authority, because visibility does not come from the page alone. |
| 6 | Hosting and security | الاستضافة والنطاق والحماية | الاستضافة والنطاق وحماية الموقع وتحديثاته التقنية، كلها ضمن العمل ولا تُدار من طرفك. | Hosting, domain and security | Hosting, the domain, site security and the technical updates. All part of the work, none of it on your desk. |

---

## 6. The journey

**Background** dark `#141415`, full bleed band.

**The layout of this section is not settled.** Three new design directions are being generated separately
and Ahmad picks one. Nothing below prescribes a layout. What is settled is the copy: a three stage story of
one real site, month one, month two, month six, with one figure per stage.

**This is one of exactly two sections on the page that carry figures.** All figures are real Google Search
Console exports from `clients/q8block/design/proof-data.md`, from one site, kwtclean.com. Nothing is
rounded, estimated or stitched together from different clients. Every digit run is wrapped `dir="ltr"` and
uses Western numerals. No figure appears in the headline.

**Rewritten 2026-09-24 to the narrative Ahmad described, and cut down.** His instruction was to
`avoid using stupid data`, so the story leads and the figures support it. Three changes against the old
version:
* **One number per stage, clicks only.** The impressions were dropped from the stage lines. A reader who
  has no website does not know what an impression is, and printing two numbers per stage turned three
  sentences into a spreadsheet.
* **The printed five month table is gone.** The five rows stay in this file as build data for the curve,
  below, but the page does not print a table of them.
* **The mashame3.com start note is gone from this section.** That site now carries its own card with its
  own real figure in Section 7, so the number is still on the page and it is no longer a third data point
  crowding this one.

**Stage titles and bodies corrected back to the approved board, 2026-09-24 (second pass).** The build had
drifted to `شهر البناء` / `The build month`, `أول ظهور` / `First found`, `النتيجة` / `The result`. The
approved board `design/boards/journey-D.png` draws **Build / Get discovered / Get traction** and Ahmad
restated it in his own words: `I like the messaging that was used, use the same exact messaging. So get
discovered, get traction, get more customers.` The English titles are now the board's exactly. The Arabic
is the natural MSA equivalent triad in this file's register, three parallel nouns:
`البناء` / `الظهور` / `النمو`. `الظهور` is the same register word the section headline already uses
(`هكذا يبدأ موقع جديد في الظهور`), so nothing here reaches for the banned `ترتيب`.
The **month labels above the titles keep their real months** (`الشهر الأول، أبريل 2026` /
`Month one, April 2026`, and so on). They are deliberately more precise than the board's plain `MONTH 1`,
because the credibility of the whole section rests on dates a reader can check.
The three **bodies were cut to two lines each**, because the board draws two lines per card
and the build was rendering six to nine, which tripled the card height and cost the section the punch it
was chosen for. The meaning is unchanged and the three figures stay exactly where they were.

| Element | Arabic | English |
|---|---|---|
| Eyebrow | كيف نعمل | How it works |
| Headline | هكذا يبدأ موقع جديد في الظهور | How a new site gets found. |
| Highlighted word | في الظهور | gets found |
| Subhead | هذه قصة موقع واحد بنيناه، شهرًا بعد شهر، كما صدّرها Google Search Console. لم نجمع بين عملاء مختلفين ولم نختر أفضل شهر من كل موقع. | This is the story of one site we built, month by month, exactly as Google Search Console exported it. We did not mix clients together and we did not pick the best month from each site. |
| Site label | kwtclean.com | kwtclean.com |

**Stage 1**

| | Arabic | English |
|---|---|---|
| Stage label | الشهر الأول، أبريل 2026 | Month one, April 2026 |
| Title | البناء | Build |
| Body | يُصمَّم الموقع ويُبنى ويُنشر، وتُرسل صفحاته إلى جوجل للفهرسة. | The site is designed, built and published, and sent to Google. |
| Figure | 7 نقرات في الشهر | 7 clicks in the month |

**Stage 2**

| | Arabic | English |
|---|---|---|
| Stage label | الشهر الثاني، مايو 2026 | Month two, May 2026 |
| Title | الظهور | Get discovered |
| Body | تدخل صفحات الخدمات والمناطق الفهرس، ويبدأ العميل يجدها في بحثه. | Service and area pages enter the index. Customers find them. |
| Figure | 165 نقرة في الشهر | 165 clicks in the month |

**Stage 3**

| | Arabic | English |
|---|---|---|
| Stage label | بعد نحو ستة أشهر، أغسطس 2026 | About six months in, August 2026 |
| Title | النمو | Get traction |
| Body | يجد العميل صفحة الخدمة في منطقته، وتأتي المكالمة منها. | A customer finds the page for his area, and calls you from it. |
| Figure | 531 نقرة في الشهر | 531 clicks in the month |

**Precision note, printed on the page under the stages. This is not optional wording.**

| Arabic | English |
|---|---|
| أبريل 2026 هو أول شهر سُجّلت فيه بيانات لهذا الموقع، وأغسطس 2026 هو خامس شهر كامل من البيانات، أي ما يقارب ستة أشهر من عمر الموقع إذا احتسبنا فترة الفهرسة التي تسبق أول نقرة. | April 2026 is the first month with recorded data for this site, and August 2026 is its fifth full data month, which is close to six months of site age once the indexing period before the first click is counted. |

**Build data for the curve. Not printed as a table on the page.**

The chart, however the chosen direction draws it, is drawn in HTML and CSS from these five real rows and
from nothing else. June and July exist so the line between month two and month six is continuous and
honest, not a jump between two cherry picked months. The page prints the three stage figures only.

| Month | Clicks | Impressions |
|---|---|---|
| أبريل 2026 / April 2026 | 7 | 956 |
| مايو 2026 / May 2026 | 165 | 11,155 |
| يونيو 2026 / June 2026 | 354 | 22,101 |
| يوليو 2026 / July 2026 | 452 | 25,564 |
| أغسطس 2026 / August 2026 | 531 | 27,932 |

### The baseline line, kept short

kwtclean.com is the top of the range partly because that client also worked through the Google Business
Profile checklist and built up his reviews. Most clients will not, so the section still states the level a
site of ours holds without that. **Two lines, not a second band of figures.** Ahmad required this framing
on 2026-09-24 and it is written as a condition the client controls, never as a disclaimer. The page does
not say `results may vary`.

| Element | Arabic | English |
|---|---|---|
| Line 1 | وموقع مثل carwashkw.com حافظ على 199 إلى 440 نقرة في الشهر عبر ثلاثة عشر شهرًا كاملًا متتاليًا، من الموقع وحده. | And a site like carwashkw.com has held between 199 and 440 clicks a month across thirteen consecutive complete months, from the website alone. |
| Line 2 | إن أردت أن تكون في أعلى النطاق، فالشرط أن تنفذ قائمة تعليمات ملف جوجل التي نسلمك إياها. | If you want to sit at the top of the range, the condition is that you work through the Google Business Profile checklist we hand you. |

**Source caption, sits under the whole section**

| Arabic | English |
|---|---|
| المصدر: Google Search Console، بيانات حتى 24 سبتمبر 2026 | Source: Google Search Console, data to 24 September 2026 |

**CTA strip closing the section**

| Arabic | English |
|---|---|
| واتساب | WhatsApp |

---

## 7. Our work

**Background** white. **The card design approved on the boards is unchanged**: a white panel with a
`1px #EBEBEB` hairline, the site name, one figure, and a `view case study` style link. Real client sites
only. No generated mockup is ever presented as a client.

**The figure is TOTAL IMPRESSIONS, not a growth percentage (Ahmad, 2026-09-25).** His words: `my best
performing is carwashkw and it shows 32% growth. What is this growth thing? It sounds very weird.
Mashame3 is 883% growth. We need a new metric... I think a good metric is total impressions.`

He is right twice over, and both reasons matter:
* **A percentage is measured off a base, so it ranked the wall backwards.** carwashkw.com is the
  strongest site of the eleven by sustained volume — 199 to 440 clicks every month for thirteen straight
  months — and it carried the smallest number on the page, `+32%`. mashame3.com, six months old, carried
  `+883%`, because 12 clicks is a small base. A prospect reading the wall was being told the opposite of
  the truth.
* **"Growth" between two months the card does not name is jargon.** A total is one plain number: how
  many times this site came up in Google. Nothing to interpret, no base to pick, nothing to game.

**Each total is the sum of the site's impressions across every COMPLETE month Google has recorded for
it.** Partial months are excluded — September 2026 is partial for every site and is in no total. The
totals are not typed anywhere: `src/data.mjs` holds each site's real monthly impression rows out of
`proof-data.md` and the build adds them up, so a total cannot drift away from its own rows. The
derivation table at the end of this file prints the rows and the sum for every card.

**Sorted biggest total first.** That alone fixes the complaint: carwashkw.com moves from last place to
second.

**The plate at the top of the card is THE CLIENT'S OWN LOGO (Ahmad, 2026-09-25), not a chart.** His
words: `The client slideshow, many boxes are empty. I think since the website lacks images, we should
scratch the graph idea and just put images. If you can extract good images for each project and put them
there. Or their logos. Actually, would be better. Yeah, their logos.` The plate used to draw the site's
real monthly click series, and the four newest clients have one complete month each, so they had no curve
and rendered a bare dashed slot — that is what read as broken. Every client has a logo, so every card is
now full. The logo sources are in the logo table at the end of this file and the derivation is in
`build-spec.md` §20 and §22.

**Rebuilt 2026-09-24. This is the biggest change on the page.** Ahmad's decisions, in his order:
1. **Show every SEO client, not four.** Eleven sites, not a shortlist of the four best. A page that shows
   four and has eleven is hiding something a prospect will find anyway.
2. **Keep the approved card design**, the title, one figure and the case study link.
3. **Every figure is real.** His words: `we don't want fake.` Every total is reproduced row by row in the
   derivation table below, from `proof-data.md`, which is a straight Search Console export.
4. **A site with little or no traffic gets the `مشروع جديد` / `New project` tag instead of a figure.**
   It is not given an invented number and it is not quietly dropped from the grid.
5. **The cards link out to the live client sites**, `rel="nofollow"`.

**This is the second and last section on the page that carries figures.** Every card is one named client
across its own named complete months, already in the past. None of it describes what a new client will
get. No figure appears in the headline.

| Element | Arabic | English |
|---|---|---|
| Eyebrow | أعمالنا | Our work |
| Headline | مواقع بنيناها ويجدها العملاء اليوم | Sites we built that get found. |
| Highlighted word | ويجدها العملاء | get found |
| Subhead | كل موقع هنا بُني من الصفر وما زال يعمل. الرقم على كل بطاقة هو عدد المرات التي ظهر فيها الموقع في نتائج بحث Google، مجموع كل شهر كامل سجّله Google لهذا الموقع. والمشاريع الحديثة موسومة كما هي، لأن بياناتها لم تكتمل بعد. | Every site here was built from scratch and is still running. The figure on each card is how many times that site has come up in Google search results, added up across every complete month Google has recorded for it. The recent projects are labelled as what they are, because their data is not in yet. |

**Source line, ONE line under the whole section.** Rewritten 2026-09-25: it used to name the two months a
percentage was computed between, and there is no longer a percentage. It now says what is summed, that
the window is **per site** (the sites are different ages — kwtclean.com has five complete months,
kuwaityclean.com has thirteen), and that partial months are not counted.

| Arabic | English |
|---|---|
| كل الأرقام من Google Search Console: مجموع مرات الظهور في كل شهر كامل مسجّل لكل موقع، حتى أغسطس 2026. الأشهر غير المكتملة غير محسوبة. | All figures from Google Search Console: every complete month recorded for each site, added up, to August 2026. Partial months are not counted. |

**Card fields, same shape on every card**

| Field | Arabic | English |
|---|---|---|
| Metric label | مرة ظهر فيها في بحث Google | times shown in Google search |
| New project tag | مشروع جديد | New project |
| Link label | افتح الموقع | View case study |

**The metric label never says "impression".** It says what an impression *is*. `impressions` is a Search
Console word; a service-company owner who has never had a website does not know it and is not asked to
learn it to read this page. The card reads `245,600 times shown in Google search` /
`245,600 مرة ظهر فيها في بحث Google` — a sentence, not a metric name. Western digits with a comma group,
the same convention as every other number on the site; `.work-metric .num` isolates them so they read
left to right inside the Arabic line.

**The card carries no caption under the logo and the logo carries no `alt` text.** The card already
prints the client's domain as real text directly under the plate, so an alt would read the same name
twice in a row to a screen reader. The retired
`لقطة من Google Search Console` / `Capture from Google Search Console` caption went with the charts: no
card shows a Search Console capture and none is planned.

**Revised 2026-09-24. Three things came off every card and the section became a slideshow.** Ahmad's
instructions, in his words and in full:
1. **Sort by the biggest numbers first.** Still true, now applied to the impression totals.
2. **The sector labels are gone.** `خدمات التنظيف` / `Cleaning services`, `غسيل السيارات` / `Car wash`,
   `تكييف وتبريد` / `Air conditioning` and the rest are removed from every card and from the build data.
3. **The date windows are gone from the cards.** He was explicit that he does not want them and is not
   worried about a reader checking them. One source line sits under the whole section instead. Every
   total is still reproduced with its exact months in the derivation table at the end of this file, so
   nothing became uncheckable.
4. **`أول شهر بيانات: أغسطس 2026` / `First data month: August 2026` is gone from the empty plates.** He
   called it not sexy. **Superseded 2026-09-25:** there are no empty plates any more. Those four cards
   keep their tag and carry their client's logo, the same as the other seven.

**The slideshow LOOPS ENDLESSLY (Ahmad, 2026-09-25: `the slideshow needs to be infinite`).** It reaches
the last card and carries straight on into the first, with no rewind and no stop. The mechanism is in
`build-spec.md` §22; nothing about the copy, the cards or their order depends on it.

**Build rules for this section, all five are hard.**
* Every outbound card link is `rel="nofollow"` plus `target="_blank"` and `rel` also carries `noopener`,
  so the attribute reads `rel="nofollow noopener"` (Ahmad, 2026-09-24).
* A `مشروع جديد` / `New project` card carries the tag in the slot where the figure sits on the other
  cards, in the same position and the same size. It is not smaller, greyed out or pushed to the end.
* Every total stays traceable: its monthly rows and their sum are in the derivation table below, and the
  section prints the single source line above.
* No card carries a Search Console capture unless the capture is real and unedited. The figure alone is
  enough; a capture is optional per card.
* A card carries the site name, the figure and the link. No card states a country.

### The eleven cards, ordered biggest figure first

| # | Site | Figure shown | Complete months summed |
|---|---|---|---|
| 1 | kuwaityclean.com | 245,600 | 13, August 2025 to August 2026 |
| 2 | carwashkw.com | 207,855 | 13, August 2025 to August 2026 |
| 3 | q8carwash.com | 112,623 | 13, August 2025 to August 2026 |
| 4 | kwtclean.com | 87,708 | 5, April 2026 to August 2026 |
| 5 | kwcarwash.com | 54,132 | 13, August 2025 to August 2026 |
| 6 | movingcompanykw.com | 52,080 | 13, August 2025 to August 2026 |
| 7 | mashame3.com | 32,434 | 6, March 2026 to August 2026 |
| 8 | betikcleaner.com | مشروع جديد / New project | one complete month only, August 2026 |
| 9 | anharpest.com | مشروع جديد / New project | one complete month only, August 2026 |
| 10 | alghadeerclean.com | مشروع جديد / New project | one complete month only, August 2026 |
| 11 | ragwaclean.com | مشروع جديد / New project | one complete month only, August 2026 |

**The four newest clients keep the tag and are not given their number.** betikcleaner.com has 1,614
impressions in its single complete month, anharpest.com 768, alghadeerclean.com 531 and ragwaclean.com
160. Every one of those is real and every one is in the derivation table, but 160 printed beside 245,600
says nothing true about the work — it says the site is a month old, which is exactly what the tag says,
in words a reader understands. They sit after the seven, in that order.

**Card 11 under the old metric, movingcompanykw.com. The problem is gone.** Ahmad resolved the card
itself on 2026-09-24 (`Moving company is a valid company. You can put that in, no problem.`) but under a
growth percentage it could carry **neither** a figure nor a tag: the site fell from 27 clicks in August
2025 to 11 in August 2026, every window that turned that into growth started from one of its own
troughs, and fourteen months of recorded data made the `New project` tag false. So it shipped as the one
card with an empty figure slot. **A total is not a window and cannot be cherry-picked**, so its real
52,080 impressions across thirteen complete months now goes on the card like everyone else's, and it sits
sixth. The odd card is gone without anything being invented.

**Build note.** Ahmad confirms which client names may be shown publicly before this section ships. Every
total is reproduced in the derivation table at the end of this file with the exact rows it came from, so
any figure on the page can be traced in one step.

---

## 8. FAQ

**Background** light `#F5F6F7`, accordion panels on white with a `1px #EBEBEB` hairline.

These are brand objections. Every offer question, `why is this free`, `is there a contract`, `what happens
after six months`, `do I need a commercial registration`, has moved to `/offer`. **No figures in this
section.** No durations are invented anywhere in it.

| Element | Arabic | English |
|---|---|---|
| Eyebrow | أسئلة شائعة | FAQ |
| Headline | أسئلة شائعة | Common questions |

**Q1**

| | Arabic | English |
|---|---|---|
| Question | هل تعملون على موقعي الحالي؟ | Do you work on my current website? |
| Answer | لا. نعمل فقط على المواقع التي نبنيها بأنفسنا. الأساس التقني والبنية الداخلية هما ما يحدد الترتيب، ولا يمكننا أن نتحمل مسؤولية نتيجة مبنية على أساس وضعه غيرنا. | No. We only work on websites we build ourselves. The technical foundation and the internal structure are what decide the ranking, and we cannot take responsibility for a result built on somebody else's foundation. |

**Q2**

| | Arabic | English |
|---|---|---|
| Question | لمن يعود الموقع؟ | Who owns the website? |
| Answer | الموقع يُبنى لنشاطك التجاري وحده. الاستضافة والنطاق والحماية والتحديثات التقنية جزء مما نتولاه لك ضمن العمل، فلا تحتاج إلى إدارتها. وشروط ما بعد انتهاء فترة العرض مكتوبة كاملة في صفحة العرض. | The website is built for your business alone. Hosting, the domain, security and the technical updates are part of what we run for you, so you do not have to manage any of it. The terms for what happens when the offer period ends are written in full on the offer page. |

**Q3**

| | Arabic | English |
|---|---|---|
| Question | هل تديرون ملف نشاطي على جوجل؟ | Do you manage my Google Business Profile? |
| Answer | لا. لا نطلب صلاحية الدخول إلى ملفك. نسلمك قائمة تعليمات واضحة ينفذها من يدير الملف عندك، ثم نتابع أثرها في نتائج البحث. الملف يبقى بالكامل تحت سيطرتك. | No. We do not ask for access to your profile. We hand you a clear checklist for whoever manages the profile, then we track its effect in the search results. The profile stays entirely under your control. |

**Q4**

| | Arabic | English |
|---|---|---|
| Question | متى تظهر النتائج؟ | How long before results show? |
| Answer | لا نعطي جدولًا زمنيًا، لأن الترتيب يعتمد على قطاعك وعلى منافسيك في نتائج البحث. ما نستطيع عرضه هو ما حدث فعلًا: قسم كيف نعمل في هذه الصفحة يعرض أشهرًا متتالية لموقع واحد بنيناه، كما صدّرها Google Search Console. | We do not give a timeline, because ranking depends on your sector and on your competitors in the search results. What we can show you is what actually happened. The How it works section on this page shows consecutive months from one single site we built, exactly as Google Search Console exported them. |

**Q5**

| | Arabic | English |
|---|---|---|
| Question | لدي موقع بالفعل، فماذا يحدث؟ | What if I already have a website? |
| Answer | نستبدله بموقع نبنيه نحن من الصفر. لا نعمل على موقع قائم بناه غيرنا، لكن الاستبدال الكامل وارد ضمن عملنا المعتاد. أما شروط العرض المحدود فتختلف عن ذلك، وهي مكتوبة في صفحة العرض. | We replace it with a website we build from scratch. We do not work on an existing site somebody else built, but a full replacement is part of our normal work. The conditions of the limited offer are different, and they are written on the offer page. |

---

## 9. Final call

**Background** dark `#141415`, full bleed, centred. No figures.

**Approved section. One phrase was touched on 2026-09-24 and nothing else.** The subhead ended
`وكيف نرفعه في نتائج البحث` / `how we rank it in search`, which is the rank promise the new rule forbids.
It now ends on being found. The headline, the highlight and both CTAs are exactly as approved, and the
change is revertible in one edit.

| Element | Arabic | English |
|---|---|---|
| Headline | عملاؤك يبحثون الآن. كن أنت الإجابة | Your customers are searching. Be the answer. |
| Highlighted word | كن أنت الإجابة | Be the answer |
| Subhead | مكالمة واحدة نراجع فيها ملفك على جوجل، ونشرح لك كيف نبني الموقع وكيف نجعل عملاءك يجدونه. | One call. We look at your Google profile and explain how we build the site and how we get it found. |
| CTA primary | اتصل الآن | Call now |
| CTA secondary | واتساب | WhatsApp |

---

## 10. Footer

**Background** `#000000`. NAP filled from `company.md`. Every digit run wrapped `dir="ltr"`.
The address is the only place on the homepage where a location appears, and it is the company's own.

| Element | Arabic | English |
|---|---|---|
| Brand line | Q8 block | Q8 block |
| Brand strapline | نبني المواقع ونجعل العملاء يجدونها | We build websites and get them found |
| Column 1 title | الشركة | Company |
| Column 2 title | الموارد | Resources |
| Column 3 title | العرض | The offer |
| Column 4 title | تواصل | Contact |

**Footer links, rebuilt 2026-09-24 under the same no-scrollies rule as the header.** Every `#section`
link is gone; every link below is a page.

| Column | Arabic | English | Href (ar / en) |
|---|---|---|---|
| 1 الشركة / Company | الرئيسية · من نحن · تواصل معنا | Home · About us · Contact us | `/` · `/about/` · `/contact/` |
| 2 الموارد / Resources | المدونة · قائمة ملف جوجل | Blog · Google profile checklist | `/blog/` · `/google-business-profile-checklist.html` |
| 3 العرض / The offer | العرض · الشروط والأحكام | The offer · Terms and conditions | `/offer/` · `/terms/` |
| 4 تواصل / Contact | اتصل الآن · واتساب + NAP | Call now · WhatsApp + NAP | `tel:` · `wa:` |
| Address label | العنوان | Address |
| Address value | محافظة الأحمدي، المنقف، قطعة 004، شارع 14، مبنى ناصر فالح شناز السبيعي، الدور الأول، محل 9 | Al Ahmadi Governorate, Mangaf, Block 004, Street 14, Nasser Falih Shnaz Al Subaie Building, Floor 1, Unit 9 |
| Phone label | الهاتف | Phone |
| Phone value | +965 94139666 | +965 94139666 |
| Website | q8block.com | q8block.com |
| Language link | English | العربية |
| Legal line | جميع الحقوق محفوظة لشركة كويت بلوك | All rights reserved, Kuwait Block |

---

# PART B. The offer page

Arabic at `/offer`, English at `/en/offer`. Reached from the Section 2 strip, the header nav item
`العرض` / `The offer`, and footer column 3.

**This is the only part of the site where a country is named**, because being in Saudi Arabia is a
condition of this specific promotion, not a description of who Q8Block sells to.

**No prices anywhere on this page.** Tier pricing is not decided and inventing one is a launch blocker.
**No performance figures on this page either.** The proof lives on the homepage, in sections 6 and 7,
where it can be read with its month labels and its source caption. A figure lifted onto an offer page
turns into a promise, which is exactly what the numbers rule forbids.

`وثيقة عمل حر` appears everywhere `سجل تجاري` appears. Leaving it out silently disqualifies the larger
half of the market.

## Page meta

| Field | Arabic (`/offer`) | English (`/en/offer`) |
|---|---|---|
| Title | العرض: ستة أشهر مجانية بدون عقد \| Q8 block | The offer: six months free, no contract \| Q8 block |
| Description | ستة أشهر من العمل الكامل على الموقع وتحسين محركات البحث، لشركات الخدمات في السعودية، دون رسوم ودون عقد. الشروط والتفاصيل كاملة. | Six months of full website and search work for service companies in Saudi Arabia, with no fee and no contract. Full conditions and details. |

## B1. Offer hero

**Background** dark `#141415`. Countdown directly under the headline.

**Three fixes against the rendered board, 2026-09-24, and nothing else in this section moved.**
1. **The highlight sits on `مجانية` / `free`, not on `بدون عقد` / `no contract`** (Ahmad: `the highlighter is
   on no contract, it should be highlighted on free`). One word only. `بدون عقد` is never highlighted here:
   it already owns its own full width band in B4.
2. **The subhead no longer sells a position in search.** It is written in what the owner counts, being
   discovered on Google and in AI, the call that follows, and the clients and revenue those calls become.
   Ahmad has now said three times that a promise about position in search results, in either language, means
   nothing to a service owner who has no website. It is not a selling word anywhere in Part B.
3. **The spots figure is the `[SPOTS]` build slot, never a typed number.** The board rendered
   a spots figure of its own, which the image model invented. No spots number is ever written into this file.

**Fourth fix, 2026-09-25 (build-spec §21): the "what we do" sentence led with mechanics, not benefit.**
Ahmad: `one thing I don't like in the paragraph is what we do, which is we build website, then we write its
pages. It sounds very basic and stupid. Let's just talk bring the benefit immediately. We get your business
found in Google and AI. Because that will make the paragraph way shorter and easier to read.` The clause
`نبني موقعك ونكتب صفحاته، ليجدك العميل الذي يبحث عن خدمتك في جوجل وفي إجابات الذكاء الاصطناعي فيتصل بك،
وتتحول هذه المكالمات إلى عملاء وإلى إيرادات لنشاطك` / `We build your website and write every page, so the
customer searching for your service discovers you on Google and in AI answers and calls you, and those
calls become clients and revenue` (26 Arabic words, ~34 English) is now
`نجعل عملاءك يجدونك في جوجل وفي الذكاء الاصطناعي، فتتحول هذه الزيارات إلى مكالمات وعملاء لنشاطك` /
`We get your business found on Google and in AI, turning those visits into calls and customers` (15 Arabic
words, 17 English) — the benefit first, the build-and-write mechanics dropped since they are already told
in B2, and roughly half the length. The Arabic reuses `نجعل عملاءك يجدونك`, the same construction the hero
H1 and §4's block B title already use, so the voice stays consistent site-wide. The "for service companies
in Saudi Arabia" opening sentence and the "No commitment" closer are untouched — neither was Ahmad's
complaint and both carry required information (§18.3's eligibility condition, and the no-contract promise).

| Element | Arabic | English |
|---|---|---|
| Label pill | عرض محدود | Limited offer |
| Headline | ستة أشهر مجانية، بدون عقد | Six months free, no contract. |
| Highlighted word | مجانية | free |
| Subhead | هذا العرض مخصص لشركات الخدمات في السعودية. ستة أشهر من العمل الكامل، دون رسوم. نجعل عملاءك يجدونك في جوجل وفي الذكاء الاصطناعي، فتتحول هذه الزيارات إلى مكالمات وعملاء لنشاطك. دون التزام. | This offer is for service companies in Saudi Arabia. Six months of the full work, with no fee. We get your business found on Google and in AI, turning those visits into calls and customers. No commitment. |
| Countdown label | يغلق التسجيل خلال | Registration closes in |
| Countdown | `[COUNTDOWN]` | `[COUNTDOWN]` |
| Countdown units | يوم · ساعة · دقيقة · ثانية | Days · Hours · Minutes · Seconds |
| Spots line | `[SPOTS]` مقاعد متبقية | `[SPOTS]` seats left |
| CTA primary | اتصل الآن | Call now |
| CTA secondary | واتساب | WhatsApp |

**Static state.** With `[COUNTDOWN]` removed and `[SPOTS]` empty the hero still has to read correctly.
Replacement line: `التسجيل مفتوح الآن` / `Registration is open now`.

## B2. What the offer includes

Same six deliverables as homepage Section 5, same icons, listed here as the contents of the free period.

| Element | Arabic | English |
|---|---|---|
| Block title | ما يشمله العرض | What is included |
| Intro | الأشهر الستة تشمل العمل كاملًا، لا جزءًا منه. | The six months cover the full work, not a part of it. |

| # | Arabic | English |
|---|---|---|
| 1 | تصميم وتطوير موقع مخصص | Custom website design and development |
| 2 | صفحة مستقلة لكل خدمة ولكل منطقة | A dedicated page for every service and area |
| 3 | الظهور في نتائج بحث جوجل | Google Search visibility |
| 4 | الظهور في منصات الذكاء الاصطناعي | AI platform visibility |
| 5 | بناء الروابط والسلطة | Backlinks and authority building |
| 6 | الاستضافة والنطاق والحماية | Hosting, domain and security |

## B3. Eligibility

**Four** conditions, given equal visual weight to the inclusion list. The conditions are what make a free
thing read as selective rather than desperate, so they are not tucked into small print.

**Condition 1 added 2026-09-25, and it is deliberately first.** Ahmad: `We're not mentioning service
companies. That should be clear because we don't work with anyone, only service companies. Even in the
offer, it doesn't mention service companies.` The eligibility list is the part a reader actually reads and
it is where he self-qualifies, so being a service business is condition **1**, ahead of the commercial
registration, rather than a phrase inside the intro. The old three keep their wording exactly and renumber
to 2, 3 and 4. No other offer term moved.

| Element | Arabic | English |
|---|---|---|
| Block title | شروط القبول | Eligibility |
| Intro | العرض مخصص لشركات الخدمات في السعودية. أربعة شروط، وإن تحققت جميعها فنشاطك مؤهل. | The offer is for service companies in Saudi Arabia. Four conditions, and if all four are met your business qualifies. |

| # | Arabic | English |
|---|---|---|
| 1 | نشاط خدمي. نعمل مع شركات الخدمات فقط. | A service business. We work with service companies only. |
| 2 | سجل تجاري أو وثيقة عمل حر. أي منهما يكفي. | A commercial registration or a freelance certificate. Either one is enough. |
| 3 | ملف نشاط تجاري على جوجل بعنوان مطابق للوثيقة. | A Google Business Profile with an address matching that certificate. |
| 4 | لا يوجد موقع إلكتروني قائم. | No existing website. |

**Spots line, configurable slot**

| Arabic | English |
|---|---|
| `[SPOTS]` مقاعد متبقية | `[SPOTS]` seats left |

## B4. No contract

Its own block, not a bullet. This is the strongest line on the page and it gets a full width band.

| Element | Arabic | English |
|---|---|---|
| Block title | بدون عقد | No contract |
| Body | لا يوجد عقد ولا التزام ولا فترة إشعار. تستطيع التوقف في أي وقت خلال الأشهر الستة أو بعدها، دون رسوم. | There is no contract, no commitment and no notice period. You can stop at any time during the six months or after them, with no fee. |

## B5. After six months

**Rewritten 2026-09-24.** The old body described continuing, pricing and keeping the site as one paragraph
and Ahmad called it confusing: `choose a plan, default back to the maintenance monthly, or cancel.` It is now
three explicit numbered choices, so the reader sees every option he has at a glance. Same block, same layout
as B2 and B3: a title, an intro, then a numbered list given equal weight per row.

**One hard rule on this block.** No price figure appears in any of the three options, in either language.
Tier pricing is not decided and inventing a figure here is a launch blocker.

**Heading check.** One rendered board came back with `What happens after six months and three`, a truncated
sentence from the image model. The heading is the two cells below and nothing else, in both languages.

| Element | Arabic | English |
|---|---|---|
| Block title | ماذا يحدث بعد ستة أشهر | What happens after six months |
| Intro | القرار لك. أمامك ثلاثة خيارات، تختار منها ما يناسبك. | You decide. You have three options and you pick the one that suits you. |

| # | Arabic | English |
|---|---|---|
| 1 | الاستمرار في العمل الكامل عبر خطة، يُحدد سعرها حسب قطاعك وحسب النتائج التي تحققت. | Continue the full work on a plan, priced according to your industry and the results achieved. |
| 2 | إيقاف العمل على محركات البحث والاحتفاظ بالموقع مباشرًا مقابل رسم شهري بسيط. | Stop the search work and keep the website live for a small monthly fee. |
| 3 | التوقف نهائيًا، دون رسوم ودون إشعار. | Stop completely, with no fee and no notice. |

## B6. Offer FAQ

The offer questions live here and only here.

**Q1**

| | Arabic | English |
|---|---|---|
| Question | لماذا هذا العرض مجاني؟ | Why is this offer free? |
| Answer | نختار عددًا محدودًا من الشركات في كل مدينة ونعمل عليها ستة أشهر كاملة حتى تظهر النتيجة. النتيجة نفسها هي ما يجعل العميل يقرر الاستمرار، وهي أيضًا ما نعرضه على العميل التالي. ولهذا وُضعت شروط القبول: العرض لا ينجح إلا مع نشاط قائم وموثق فعلًا. | We take a limited number of companies in each city and work on them for a full six months until the result shows. That result is what makes a client decide to continue, and it is also what we show the next client. That is why the eligibility conditions exist. The offer only works with a business that is already running and already documented. |

**Q2**

| | Arabic | English |
|---|---|---|
| Question | هل هناك عقد أو التزام؟ | Is there a contract or a commitment? |
| Answer | لا. لا يوجد عقد. تستطيع التوقف في أي وقت خلال الأشهر الستة أو بعدها، دون رسوم ودون إشعار مسبق. | No. There is no contract. You can stop at any time during the six months or after them, with no fee and no notice period. |

**Q3**

| | Arabic | English |
|---|---|---|
| Question | هل يشترط وجود سجل تجاري؟ | Do I need a commercial registration? |
| Answer | سجل تجاري أو وثيقة عمل حر. أي منهما يكفي. الشرط الوحيد أن يطابق العنوان المسجل في الوثيقة عنوان ملف نشاطك على جوجل. | A commercial registration or a freelance certificate. Either one is enough. The only requirement is that the address on the certificate matches the address on your Google Business Profile. |

**Q4**

| | Arabic | English |
|---|---|---|
| Question | لدي موقع قائم، هل أنا مؤهل؟ | I already have a website. Do I qualify? |
| Answer | العرض مخصص لمن لا يملك موقعًا قائمًا. إن كان لديك موقع وتريد استبداله بالكامل، فهذا عمل نقوم به خارج هذا العرض، واتصل بنا لنراجعه معك. | The offer is for businesses with no existing website. If you have one and you want it replaced entirely, that is work we do outside this offer. Call us and we will look at it with you. |

**Q5**

| | Arabic | English |
|---|---|---|
| Question | ماذا يحدث لموقعي بعد ستة أشهر؟ | What happens to my website after six months? |
| Answer | القرار لك، وأمامك ثلاثة خيارات. الأول، الاستمرار في العمل الكامل عبر خطة يُحدد سعرها حسب قطاعك وحسب النتائج التي تحققت. الثاني، إيقاف العمل على محركات البحث والاحتفاظ بالموقع مباشرًا مقابل رسم شهري بسيط. الثالث، التوقف نهائيًا، دون رسوم ودون إشعار. | You decide, and you have three options. One, continue the full work on a plan, priced according to your industry and the results achieved. Two, stop the search work and keep the website live for a small monthly fee. Three, stop completely, with no fee and no notice. |

**Q6**

| | Arabic | English |
|---|---|---|
| Question | هل تديرون ملف نشاطي على جوجل خلال العرض؟ | Do you manage my Google Business Profile during the offer? |
| Answer | لا، لا في العرض ولا خارجه. نسلمك قائمة تعليمات واضحة ينفذها من يدير الملف عندك، ثم نتابع أثرها في نتائج البحث. | No, neither during the offer nor outside it. We hand you a clear checklist for whoever manages the profile, then we track its effect in the search results. |

## B7. Offer page final call

| Element | Arabic | English |
|---|---|---|
| Headline | اتصل، ونخبرك إن كنت مؤهلًا | Call us and we check your eligibility. |
| Highlighted word | مؤهلًا | eligibility |
| Subhead | مكالمة واحدة نراجع فيها وثيقتك وملفك على جوجل، ونقول لك مباشرة إن كان نشاطك ضمن الشروط. | One call. We look at your certificate and your Google profile and tell you straight away whether your business fits the conditions. |
| CTA primary | اتصل الآن | Call now |
| CTA secondary | واتساب | WhatsApp |

---

# Registers

## Slot register

| Slot | Where | Filled from |
|---|---|---|
| `[COUNTDOWN]` | Homepage Section 2, offer page B1 | Build config, end date set by Ahmad. Both must also render correctly with this element absent. **Placeholder since 2026-09-24: `2026-10-04T23:59:59+03:00`, ten days out.** The previous value ran 98 days and Ahmad rejected it on sight — `should be less than 10. Ten days.` He sets the real date; it is one line, `CONFIG.COUNTDOWN_END` in `src/data.mjs`. |
| `[SPOTS]` | Homepage Section 2, offer page B1 and B3 | Build config, number set by Ahmad. Never hardcoded into body copy anywhere else. |

**`[SPOTS]`, the working number.** Ahmad's working figure is **around 9** seats. It lives in build
config and is set there once, so the three places above all read the same and one edit changes all three. It
is never typed into body copy, a headline or a meta description in this file. The board that rendered a
spots figure of its own invented it; no such value comes from anywhere in this file.

**"per city" came off the line on 2026-09-25.** Ahmad: `don't mention each city. It says just nine seats
left. That's it.` The line now reads `[SPOTS] مقاعد متبقية` / `[SPOTS] seats left` in all three places —
the homepage strip, B1 and B3 — and the number still comes from `CONFIG.SPOTS`, never typed into copy. Both the homepage strip and B1 must also render correctly with the slot empty, using the
`التسجيل مفتوح الآن` / `Registration is open now` replacement line.

## Numbers on the page

Every figure printed anywhere on the site, with its source. Nothing else may be added, and nothing here may
move to another section.

| Figure | Where | Source |
|---|---|---|
| 7 clicks, April 2026 | Section 6, stage 1 | kwtclean.com |
| 165 clicks, May 2026 | Section 6, stage 2 | kwtclean.com |
| 531 clicks, August 2026 | Section 6, stage 3 | kwtclean.com |
| 199 to 440 clicks a month across 13 consecutive complete months | Section 6, baseline line 1 | carwashkw.com |
| Seven impression totals and four `New project` tags | Section 7, the eleven cards | derivation table below |

Sections 0, 1, 2, 3, 4, 5, 8, 9 and 10 carry no figures. Part B carries no performance figures and no
prices, in any section, including the three options in B5. The only digits that render in Part B come from
the `[COUNTDOWN]` and `[SPOTS]` build slots, which are configuration, not claims. Every number above
comes from `clients/q8block/design/proof-data.md`, pulled from the Search Console API on 24 September 2026.
No figure in Section 7 is rounded at all — each is an exact sum of exact monthly rows — none is averaged
across clients, and none is taken from a partial month. September 2026 is a partial month and is excluded
from every claim on the site.

**Section 7 now prints impressions, and Section 6 still does not.** Section 6 prints clicks only: it is
the month-by-month story of one site, and a click is a person arriving. Section 7 prints one impression
total per site, because Ahmad replaced its growth percentage with one (2026-09-25). **The word
"impression" appears nowhere on the page** — the card says `times shown in Google search` /
`مرة ظهر فيها في بحث Google`, which is what an impression is, in words a reader who has never owned a
website already understands. The monthly impression rows behind every total are in this file's Section 7
derivation table and in `src/data.mjs`, which is where the build adds them up.

## Section 7 derivation table

One row per card. **Rewritten 2026-09-25 with the metric.** The figure on a card is no longer a growth
percentage between two months — it is the site's **total impressions**, the sum of every complete month
Google has recorded for that site in `proof-data.md`. Nothing is rounded, nothing is averaged, nothing is
estimated: the addition below is the whole derivation, and the same rows live in `src/data.mjs` where the
build adds them up itself, so no total on the page can differ from this table.

**Partial months are excluded.** September 2026 is partial for every property (data to 24 September 2026)
and appears in no total. The window differs per site because the sites are different ages, which is why
the section's source line says "every complete month recorded for each site" rather than naming one range.

| # | Site | Total shown | Months | Every complete month, added |
|---|---|---|---|---|
| 1 | kuwaityclean.com | **245,600** | 13 | 31,710 + 19,720 + 14,389 + 17,278 + 18,103 + 16,640 + 17,752 + 12,717 + 14,151 + 15,353 + 22,256 + 23,818 + 21,713 = 245,600 |
| 2 | carwashkw.com | **207,855** | 13 | 23,024 + 21,414 + 16,167 + 15,900 + 12,382 + 13,902 + 13,961 + 13,107 + 12,765 + 15,451 + 17,831 + 15,155 + 16,796 = 207,855 |
| 3 | q8carwash.com | **112,623** | 13 | 778 + 3,826 + 4,996 + 9,493 + 13,032 + 12,894 + 11,377 + 12,824 + 9,130 + 10,280 + 9,787 + 7,278 + 6,928 = 112,623 |
| 4 | kwtclean.com | **87,708** | 5 | 956 + 11,155 + 22,101 + 25,564 + 27,932 = 87,708 |
| 5 | kwcarwash.com | **54,132** | 13 | 24 + 31 + 14 + 23 + 825 + 3,181 + 6,012 + 6,816 + 6,245 + 10,053 + 7,796 + 6,930 + 6,182 = 54,132 |
| 6 | movingcompanykw.com | **52,080** | 13 | 17,452 + 11,898 + 5,303 + 2,230 + 782 + 464 + 793 + 905 + 1,801 + 1,630 + 227 + 4,211 + 4,384 = 52,080 |
| 7 | mashame3.com | **32,434** | 6 | 1,364 + 3,013 + 3,995 + 7,098 + 8,173 + 8,791 = 32,434 |
| 8 | betikcleaner.com | مشروع جديد / New project | 1 | August 2026, `1,614` impressions. One month is not a track record |
| 9 | anharpest.com | مشروع جديد / New project | 1 | August 2026, `768` impressions |
| 10 | alghadeerclean.com | مشروع جديد / New project | 1 | August 2026, `531` impressions |
| 11 | ragwaclean.com | مشروع جديد / New project | 1 | August 2026, `160` impressions |

The 13-month sites run August 2025 to August 2026, kwtclean.com runs April to August 2026 (its first data
month is April 2026) and mashame3.com runs March to August 2026 (first data month March 2026). Months
before a site's first indexed month returned no rows from the API and are reported in `proof-data.md` as
"no data", not as zero, so they are not summed as zeroes — they are not in the series at all.

**What the change fixed, in one comparison.** Under the retired metric the order was q8carwash `+900%`,
mashame3 `+883%`, kuwaityclean `+326%`, kwcarwash `+270%`, kwtclean `+222%`, carwashkw `+32%`, then four
tags and one empty card. carwashkw.com — thirteen straight months between 199 and 440 clicks, the
steadiest site of the eleven — came last on the wall, and mashame3.com came second on a 12-click base.
Sorting by total impressions puts carwashkw second and needs no explanation to a reader.

**Two caveats that came off with the percentages.** The old table carried warnings about q8carwash's
`+900%` (exact, but the site is below its own January 2026 peak) and about mashame3's `+883%` (correct,
but its partial September shows 0 clicks against 371 impressions, which usually means something broke).
Neither figure is printed any more, so neither caveat applies to anything on the page. **The mashame3
observation still stands as an operational note**: somebody should look at why that site's September
clicks fell to zero. It does not affect its 32,434 total, which is complete months only.

**Sites in `proof-data.md` that are not cards.** `q8block.com` is Q8Block's own site, not a client, and it
is not in the eleven. Its own numbers are tiny, 0 to 2 clicks a month, which is exactly why the site is
being rebuilt. `skyscraper`, `fightclub` and `alamana` are not SEO clients and have no Search Console
property in the export, so there is no data for them and they get no card.

## Section 7 logo table

One row per card, in the shipping order. **Revised 2026-09-25: seven of the eleven are now clean brand
lockups regenerated from each client's real registered name**, supplied as `design/client-logos/v2-<domain>.png`
and derived into the plate by `build-spec.md` §22. The other four are unchanged and are still the mark the
client's own live site serves, fetched 2026-09-25 and kept byte-for-byte at `design/client-logos/<domain>.<ext>`.
The old seven source files stay on disk; the build simply stops referencing them. **No brand mark is
invented, redrawn or recoloured from what was supplied.** `build-spec.md` §20 has the pixel record of the
first pass and §22 of this one.

| # | Site | Plate | Source |
|---|---|---|---|
| 1 | kuwaityclean.com | unchanged | `/images/icons/brand-logo-colorful.webp` from the live site — the header logo, `KUWAITY CLEAN` with the colour house mark |
| 2 | carwashkw.com | **regenerated** | `v2-carwashkw.com.png` — the `MASTER WASH / غسيل سيارات متنقل` lockup on white |
| 3 | q8carwash.com | unchanged | `/images/logo-badge.webp` from the live site — the Posefore car badge, the `LocalBusiness` image in its own JSON-LD |
| 4 | kwtclean.com | **regenerated** | `v2-kwtclean.com.png` — the `كلين الكويت / CLEAN AL KUWAIT` house lockup on white |
| 5 | kwcarwash.com | **regenerated** | `v2-kwcarwash.com.png` — the `WASH AND POLISH / غسيل سيارات متنقل` lockup on white |
| 6 | movingcompanykw.com | **regenerated** | `v2-movingcompanykw.com.png` — the `شركة منيف للنقل / MUNEEF TRANSPORT` truck lockup on white |
| 7 | mashame3.com | unchanged | `/favicon.svg` from the live site — the blue snowflake mark |
| 8 | betikcleaner.com | unchanged | `/assets/brand/betik-cleaner-primary-rtl.svg` from the live site — the full `بيتك كلينر / BETIK CLEANER` lockup |
| 9 | anharpest.com | **regenerated** | `v2-anharpest.com.png` — the `شركة انهار لمكافحة الحشرات / ANHAR PEST CONTROL` shield lockup on white |
| 10 | alghadeerclean.com | **regenerated** | `v2-alghadeerclean.com.png` — the `الغدير اللامع كلين / AL GHADEER CLEAN` droplet lockup on white |
| 11 | ragwaclean.com | **regenerated** | `v2-ragwaclean.com.png` — the `رغوة الجنوب / RAGWA CLEAN` bubble lockup on white |

**Two notes from the first pass that the regeneration retired.** anharpest.com's live logo is a
light-on-dark lockup, so §20.3 had to composite it on the site's own `#0D1512` ground and it shipped as
the one dark tile in the row; the regenerated lockup is dark-on-white like the rest and the dark tile is
gone. movingcompanykw.com ships **no logo file at all** — its live brand is type — so §20.4 reproduced
that wordmark in the site's own two typefaces and colours; it now carries a proper lockup instead, so
nothing on the page is a reproduction any more.

## Geography register

| Where a location appears | What it is |
|---|---|
| Footer address and phone, both locales | The company's own NAP from `company.md` |
| Footer legal line `شركة كويت بلوك` | The registered company name |
| Offer page B1 subhead, B3 intro, offer page meta description | The eligibility condition of one promotion |

Nowhere else. The homepage never states who Q8Block sells to by location. The audience phrase is
`شركات الخدمات المحلية` / `local service businesses`, and it carries no country.
