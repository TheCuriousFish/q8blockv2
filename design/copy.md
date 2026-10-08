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

**Three changes to this section since, all Ahmad's own instructions, all recorded below:** the Arabic
headline (2026-09-24), and on 2026-09-25 the subhead and the row under the buttons. The CTA **labels**,
**colours** and **order** are untouched — `Call now` is still the orange fill and `WhatsApp` the outline —
only their size moved, one modest step, on his instruction (build-spec §23).

**Two lines were touched here earlier on 2026-09-24, both under rules Ahmad gave the same day, both
revertible in one edit.** The English headline is untouched and stays exactly as approved; the Arabic
headline was replaced later the same day by Ahmad himself, see the note under the table below.
1. The subhead's `ثم نرفعه إلى الصفحة الأولى` / `then we rank it on the first page` was the rank promise
   the new rule forbids. It now reads as discoverability. Nothing else in the sentence moved.
2. Trust point 1 read `We build it then we rank it`. Same reason, same fix.
3. Trust point 4 is resolved, and the reasoning is written out under the trust row below.

**The subhead and the trust row were both replaced on 2026-09-25 (build-spec §23).** The subhead is now
Ahmad's own one-line sentence; the four trust points are gone and the row carries a Google rating mark
instead. Everything from `The trust row` down is kept below as the record of what stood there, marked
**superseded** — the old subhead is in the table row directly beneath it.

**And the row was cut back again the same day (build-spec §24).** §23 put a strip of SEO tool logos on
that row beside the Google mark. Ahmad: `I told you we do not want to mention the tools that we are
using... that's not trust.` The strip, its label and its logos are **deleted**, and the Google mark is now
the whole row. **No string naming a tool, a vendor, a subscription, a partner or a piece of software goes
into the hero again**, under any label. The removed wording is kept below, marked superseded.

**The Arabic headline changed on 2026-09-24, and it is Ahmad's own line.** It now reads
`تبي عملاءك يجدونك في جوجل وفي الذكاء الاصطناعي؟` — **deliberately Gulf colloquial** (`تبي`, not the
MSA `هل تريد`) and **deliberately a question**. It is the hook, and it is the only colloquial string
on the site: every other Arabic line in this file stays professional MSA. **Do not "correct" it.**
The highlight stays on `يجدونك`. The English headline is unchanged.

| Element | Arabic | English |
|---|---|---|
| Headline | تبي عملاءك يجدونك في جوجل وفي الذكاء الاصطناعي؟ | Customers find you on Google and in AI. |
| Highlighted word | يجدونك | find you |
| Subhead | نضع خدماتك في نتائج جوجل وفي إجابات الذكاء الاصطناعي، حيث يبحث عميلك | We put you in Google's results and in AI's answers, where your customer is looking. |
| CTA primary | اتصل الآن | Call now |
| CTA secondary | واتساب | WhatsApp |

### The subhead, replaced 2026-09-25. Ahmad's own wording, verbatim

The line above is his, word for word, in both languages. He chose it because NP Digital's hero runs a
**single line** and ours was running a three-clause paragraph. It is one line at 1440 and at 1920 in both
locales, two lines on the Arabic phone and three on the English phone — that is as far as one line can be
carried at 390px. Do not lengthen it back and do not add a clause to it.

Superseded: `نبني لك موقعًا كاملًا، ثم نجعله يظهر لعملائك في نتائج البحث المحلية، ونهيئه ليكون مصدرًا
تستشهد به مساعدات الذكاء الاصطناعي.` / `We build your whole website, then we get it found in local search
and prepare it to be a source AI assistants cite.`

### The Google rating mark, 2026-09-25. It replaced the four trust points, and it is now the whole row

Ahmad: `this is great real estate to put authority and trustability.` The four trust points and their
orange rules are **deleted**, because one of them had no business being in the brand hero: point 4,
`الاستضافة والنطاق والحماية علينا` / `Hosting, domain and security included`, is Section 5 deliverable 6 —
an **offer deliverable** — and it only ended up here because `بدون عقد` / `No contract` had to be pulled
(the reasoning is kept below, marked superseded).

**The row draws no words at all.** Five filled stars and Google's own wordmark, centred under the CTAs,
the whole thing one link out to Q8Block's own Google Business Profile in a new tab (`rel="noopener"`).
The URL is `CONFIG.GBP_URL` in `src/data.mjs`; with it set to `null` the mark does not render at all, so
the page can never link to somebody else's profile.

* **No review count.** Ahmad has few reviews and does not want the number on the page.
* **No review text.** Nothing is quoted, paraphrased or scraped.
* **No rating structured data, ever.** The stars are a visual mark and nothing more. Marking up a rating
  on a handful of reviews is the thing that earns a manual action, and this site's whole argument is that
  its numbers are checkable. Showing stars is fine; claiming a rating in schema is not. This is a standing
  rule, not a preference — see build-spec §23 and §24.
* **The word `Google` is an image, not text.** Ahmad, 2026-09-25: `add the colours for each letter of the
  Google so it matches the Google company, since black is just boring.` It is Google's own SVG wordmark,
  fetched byte-for-byte (`design/brand-marks/`) and never redrawn. As live text the yellow `o` is ~1.8:1
  on the hero background and fails WCAG even as large text; an image of a logotype is exempt, so this is
  the only way to have both the brand colours and a 100 accessibility score. Do not convert it to text.
* The stars are Google's own star gold `#FBBC04`, chosen over the site orange §23 shipped once the
  wordmark was in full colour — see build-spec §24.

**The one string this row still needs is not drawn on the page.** Because nothing on the row is text, a
screen reader would otherwise hear only "Google". The link carries an accessible name instead:

| Element | Arabic | English |
|---|---|---|
| Link accessible name (`aria-label`) | تقييم خمس نجوم على Google | Five star rating on Google |

It names the rating and never a count, it is not visible copy, and it must keep containing the word
`Google` so the visible-label rule cannot fire against it.

**Nothing on this row may imply endorsement, partnership, certification or a badge** — no "official", no
"certified", no "trusted by", no partner or vendor lockup of any kind.

---

### Superseded 2026-09-25 (same day): the tools strip that briefly shared this row

§23 put four SEO tool logos under a small label beside the Google mark. Ahmad killed it hours later:
`I told you we do not want to mention the tools that we are using... that's not trust.`

**The label strings are deleted from this file rather than quoted here**, in both languages, so they
cannot be copied back out of a "superseded" block by the next agent. What stood there was one small
label naming the software the work is done with, over four vendor wordmarks. It is gone from the copy,
from `src/data.mjs` and from the build. Do not write another one.

The label was never `partners` and the question is now moot: Ahmad floated that word and agreed it out in
the same breath, because those were **subscriptions**, not partnerships — and then removed the row itself.
The logo source files stay on disk under `design/tool-logos/` for the record; **nothing references them.**

`Google Search Console` does still appear on the page, twice in Section 6/7 and once in an FAQ answer,
as the **source of the figures** (`All figures from Google Search Console...`). That is a provenance
citation that copy.md rule 2 depends on, it predates the strip, and it is not a claim about tools we buy.
If Ahmad wants it gone too, that is a separate decision and it takes the checkability argument with it.

---

### Superseded 2026-09-25: the trust row, four points, separated by thin orange rules as on the board.

| # | Arabic | English |
|---|---|---|
| 1 | نبني الموقع ثم نُظهره في نتائج البحث | We build it then we get it found |
| 2 | صفحة لكل خدمة ولكل منطقة | A page for every service and area |
| 3 | نتائج موثقة من Google Search Console | Results documented in Google Search Console |
| 4 | الاستضافة والنطاق والحماية علينا | Hosting, domain and security included |

### Superseded: the fourth trust point, resolved 2026-09-24. Marked Ahmad-reversible.

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
| Line | ستة أشهر بـ$500 مرة واحدة | 6 months for $500, paid once |
| Countdown label | يغلق التسجيل خلال | Registration closes in |
| Countdown | `[COUNTDOWN]` | `[COUNTDOWN]` |
| Countdown units | يوم · ساعة · دقيقة · ثانية | Days · Hours · Minutes · Seconds |
| Spots line | `[SPOTS]` مقاعد متبقية | `[SPOTS]` seats left |
| CTA, same row | اطلع على العرض | See the offer |

**Rewritten 2026-09-30 (build-spec §25): the line now carries the PRICE, and the "service firms"
qualifier came off it.** The offer is no longer free, and the one thing the strip must not do is leave a
reader thinking the price is monthly, so `مرة واحدة` / `paid once` is on the line beside the number. There
is no room for both that and the qualifier: at 390 the pill and the line share row 1 inside a 350px inner
box, and adding `لشركات خدمية` / `service firms` back overruns it. The qualifier is not lost — the offer
page names service companies in its subhead, in the B3 intro and as eligibility condition 1, which is
where a reader actually self-qualifies. Measured after the change: **one row at 1440 and 1920** in both
locales (band 78 / 79px, row 1037 / 1141px inside 1320 / 1500), and **three rows at 390** with the line
sharing row 1 with the pill at 333px (en) and 300px (ar) inside 350. The band is 117.2px at 390, to the
pixel what §23.6 and §24.7 measured.

**The line it replaced, and why the history matters.** `ستة أشهر مجانية لشركات الخدمات` /
`Six months free for service companies` was the string §18.3 added to carry the "service companies"
qualifier; it pushed the phone strip to four rows (§18.6) and was shortened on 2026-09-25 to
`شركات خدمية` / `service firms` to get back to three. The pixel budget on this line has been tight twice
now. Anything added to it has to be measured at 390 in both locales before it ships.

### Static state, countdown removed and spots empty

| Element | Arabic | English |
|---|---|---|
| Label pill | عرض محدود | Limited offer |
| Line | ستة أشهر بـ$500 مرة واحدة | 6 months for $500, paid once |
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


**Slide strip (added 2026-10-08), between the subhead and the three blocks.** Only new copy in the section.

| Element | Arabic | English |
|---|---|---|
| Frame label (accessible name) | أمثلة من Search Console | Search Console examples |
| Stamp, on the two new projects only | مشروع جديد | New project (rendered uppercase) |
| Alt, established slides | مخطط من Search Console يعرض نقرات موقع ومرات ظهوره عبر الزمن | Search Console chart of clicks and impressions over time |
| Alt, new projects | مخطط من Search Console يعرض نقرات مشروع جديد ومرات ظهوره عبر الزمن | Search Console chart of clicks and impressions for a new project |

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

## 5. DELETED 2026-10-01. There is no "what is included" section

Ahmad, 2026-10-01:

> "the what's included section is not needed because the one above it is what we present, which is
> the same thing. So remove that. What we present, immediately what follows is the how we work."

He is right about the overlap: Section 4's three blocks already say build it, get it found, keep it
growing, and the six items underneath were the same promise itemised. **Section 4 now runs straight
into Section 6.** The section's markup, its `#included` id, its copy block in `src/data.mjs` and its
two `#included`-scoped CSS rules are all gone. Nothing links to `#included` and nothing ever did.

**The six deliverables are not lost, and no icon became unreferenced.** They are still written out in
full on the offer page (B2) and on the About page (A3), both of which render the same six icon files.
The icon files stay on disk and stay referenced. **Do not reinstate a third copy of the list on the
homepage.** Build-spec §28.3 has the record.

---

## 6. The journey

**Background** dark `#141415`, full bleed band.

**REBUILT AROUND THE GRAPH, 2026-09-30 (build-spec §26.1).** The Search Console graph is the section's
centrepiece and the three illustrations that used to head three large cards are now small icons under it
carrying the story. The shape is: eyebrow, headline, one short subhead, the graph, a row of three compact
beats, the WhatsApp CTA. Nothing else.

**THE FORENSIC DETAIL IS GONE ON PURPOSE AND MAY NOT BE RESTORED.** Ahmad, in his own words:
*"don't use details like kwtclean or from what month to what month."* Removed from this section's copy:

* the client name (`kwtclean.com`, the old site label),
* the date range and the three month labels,
* the three click figures (`7` / `165` / `531`),
* the precision note about April being the first data month and August the fifth full one,
* the carwashkw.com baseline paragraph,
* the Search Console source caption.

**This is a deliberate reversal of the earlier checkability framing and he has now made it twice**, on the
grounds that prospects do not verify and the detail costs more than it earns. The long argument for the
opposite that used to live in this section is not an instruction to a later agent; build-spec §26.1 records
the decision. **Nothing became unverifiable**: the offer page's B2b still names the client and both dates,
and the derivation tables at the end of this file are untouched.

**The numbers printed inside the graph image stay exactly as they are.** `1.99K`, `114K`, `1.7%`, `10.9`
and the dated x axis are the image's own axis, not our copy, and no number in it is ever altered.

**The graph is the same asset as offer B2b**, `src/img/proof-kwtclean-gsc.webp`, reused and never
re-derived or re-cropped. It keeps B2b's behaviour: below 1000px it **pans instead of shrinking** and its
wrapper forces `direction: ltr`, so both locales open on the four headline figures at the panel's left
edge. Build-spec §25.6 and §26.1 have the measurements.

| Element | Arabic | English |
|---|---|---|
| Eyebrow | كيف نعمل | How it works |
| Headline | هكذا يبدأ موقع جديد في الظهور | How a new site gets found. |
| Highlighted word | في الظهور | gets found |
| Subhead | هذه أرقام موقع واحد بنيناه، كما صدّرها Google Search Console. | These are the numbers of one site we built, exactly as Google Search Console exported them. |

**The graph's accessible text.** It names no client and no date range. It describes the panel, which is a
description of an image and not a claim — the same reasoning that lets `متوسط الموضع` / `average position`
appear in it where the `rank` register forbids position as a selling word anywhere else.

| Element | Arabic | English |
|---|---|---|
| Alt | لوحة أداء في Google Search Console لموقع بنيناه: إجمالي النقرات 1.99 ألف، وإجمالي مرات الظهور 114 ألفًا، ومعدل النقر 1.7 بالمئة، ومتوسط الموضع 10.9، ومنحنى يومي يبدأ عند الصفر ثم يرتفع ويستقر في نطاق أعلى. | A Google Search Console performance panel for a site we built: total clicks 1.99K, total impressions 114K, average CTR 1.7 percent, average position 10.9, and a daily curve that starts at zero, lifts and settles into a higher band. |
| Pan region accessible name | لوحة أداء في Google Search Console لموقع بنيناه | A Google Search Console performance panel for a site we built |
| Pan hint, phone only | اسحب الصورة أفقيًا لقراءتها كاملة | Swipe the panel sideways to read all of it |

**The three beats, under the graph.** Same three story beats as before, and the titles are still the
approved board's — `Build / Get discovered / Get traction`, and the MSA triad `البناء / الظهور / النمو`
(Ahmad, 2026-09-24: *"I like the messaging that was used, use the same exact messaging. So get discovered,
get traction, get more customers."*). `الظهور` is the same register word the headline uses, so nothing here
reaches for the banned `ترتيب`. **The bodies are the ones the cards already carried, kept because they
contain no invented claim, duration or figure** — which is now the only thing holding this section, since
the figures that used to support them are gone. Each beat carries its icon, its title and its body. No
month label, no figure.

| # | Icon | Arabic title | Arabic body | English title | English body |
|---|---|---|---|---|---|
| 1 | Build (`journey-1.webp`) | البناء | يُصمَّم الموقع ويُبنى ويُنشر، وتُرسل صفحاته إلى جوجل للفهرسة. | Build | The site is designed, built and published, and sent to Google. |
| 2 | Get discovered (`journey-2.webp`) | الظهور | تدخل صفحات الخدمات والمناطق الفهرس، ويبدأ العميل يجدها في بحثه. | Get discovered | Service and area pages enter the index. Customers find them. |
| 3 | Get traction (`journey-3.webp`) | النمو | يجد العميل صفحة الخدمة في منطقته، وتأتي المكالمة منها. | Get traction | A customer finds the page for his area, and calls you from it. |

**CTA strip closing the section**, now centred on its own row because the source line it used to share
that row with is gone.

| Arabic | English |
|---|---|
| واتساب | WhatsApp |

**Build data kept on file, printed nowhere.** The five real Google Search Console rows for kwtclean.com
stay in `src/data.mjs` as `JOURNEY_ROWS` and in `design/proof-data.md`. Nothing on the page prints them
any more and no chart is drawn from them — the graph is the export image.

| Month | Clicks | Impressions |
|---|---|---|
| April 2026 | 7 | 956 |
| May 2026 | 165 | 11,155 |
| June 2026 | 354 | 22,101 |
| July 2026 | 452 | 25,564 |
| August 2026 | 531 | 27,932 |

**Retired from this section, 2026-09-30.** Kept here so nobody hunts for them or puts them back:

| What it said | Where it went |
|---|---|
| `الشهر الأول، أبريل 2026` / `Month one, April 2026` and the two other month labels | deleted |
| `7 نقرات في الشهر` / `165` / `531` | deleted from the page; the rows are in the table above |
| The precision note about April and the fifth full data month | deleted |
| The carwashkw.com baseline pair (199 to 440 clicks over thirteen months, plus the Google profile checklist condition) | deleted |
| `المصدر: Google Search Console، بيانات حتى 24 سبتمبر 2026` | deleted; the subhead still names the source |
| `kwtclean.com` site label | deleted |

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
| Headline | عملاؤنا | Our clients. |
| Highlighted word | none. The headline is two words and sets plain, like Section 8's | |
| Subhead | **THERE IS NONE. DELETED 2026-10-01.** | |

**THE HEADLINE, 2026-10-01.** It read `مواقع بنيناها ويجدها العملاء اليوم` /
`Sites we built that get found.` Ahmad called it horrible and asked for "something very simple like
our clients". It is now `عملاؤنا` / `Our clients.` and it carries **no highlighted word** — there is
nothing in two words to pick out, and Section 8's `أسئلة شائعة` / `Common questions` is the precedent
for a plain head on this page.

**THE SUBHEAD AND THE SOURCE LINE ARE DELETED, NOT REWRITTEN, 2026-10-01.** Ahmad: `don't write what
the number is or any of that.` The subhead explained that every site was built from scratch, what the
figure on the card is, that it is summed across complete months, and that recent projects are tagged;
the source line explained where the figures came from. Both were describing the mechanism instead of
saying the thing, and a shortened version of either would have been the same mistake in fewer words.
**The section is eyebrow, headline, cards.** The derivation stays in this file's tables, which is the
record; it is not copy and it does not go on the page. Build-spec §28.2.

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

### The fourteen cards, ordered biggest figure first

**Three clients added 2026-10-01**, all three live sites Ahmad built: `alamana-kw.com`,
`tasleekq8.com` and `skyscraperkw.com`. **All three carry the `مشروع جديد` / `New project` tag and no
figure**, and that is not a judgement call — the Search Console service account **cannot see any of the
three properties**. Checked 2026-10-01 against `sites.list`: thirteen properties are accessible and
none of these three is among them, so there is no complete month to sum and nothing to print. No figure
goes on these cards until the property is shared and its rows are added to `proof-data.md`.

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
| 12 | alamana-kw.com | مشروع جديد / New project | no Search Console access, no data |
| 13 | tasleekq8.com | مشروع جديد / New project | no Search Console access, no data |
| 14 | skyscraperkw.com | مشروع جديد / New project | no Search Console access, no data |

**The seven tagged cards sit after the seven that carry a figure**, in the order above: the four
one-month clients first, then the three with no Search Console property at all.

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

## 7b. The price

**REWRITTEN 2026-10-01, twice (build-spec §27). THE OFFER IS NOT MENTIONED IN THIS SECTION.**
Placed **after Section 7 Our work and before Section 8 FAQ**, keeping its `#pricing` id, so the page
runs problem, solution, what you get, proof, **price**, objections, close.

**What this section used to be.** From 2026-09-30 it led with the offer: the B1b price anchor (normal
price versus this offer), a bold `one payment, not monthly` note, and only then the three tiers.
Ahmad, 2026-10-01:

> "I told you not to mention the offer in the pricing section. The pricing section should be three
> cards, the traditional beautiful way of showing tiers, and don't mention the offer in the pricing
> section."

**THE OFFER HAS EXACTLY TWO HOMES AND THIS IS NOT ONE OF THEM: the Section 2 strip, and `/offer/`.**
Nothing in this section may say `$500 one time`, `دفعة واحدة`, `مرة واحدة`, `one payment`, six months,
`ستة أشهر`, a countdown, spots left, a limited anything, or any other promotion wording. No anchor
row, no normal-price-versus-offer pair, no link to the offer page.

### What separates the three plans: COMPANY SIZE, and nothing else

Ahmad, 2026-10-01, verbatim:

> "We're selling phone calls. We're obviously not going to mention number of phone calls because in
> SEO that's unpredictable. My suggestion is mention the size of the company. So a 500 is for small
> companies, 1,000 is small to medium, $1,500 is medium to large."

So a card is a **price, a period and who the plan is for**, and that is a **complete card**. The
earlier stand-in line, `what each plan covers is agreed with you on the call`, is gone along with the
gap it was covering.

**Never invented, and this axis is rejected on purpose**, because it is exactly what SEO agencies
conventionally print on tiers: hours, page counts, numbers of services or areas, blog post volume,
link quantities, reporting frequency, support levels, and above all **any promise about how many
calls a plan produces**. None of that goes on a card. Neither does a `most popular` badge.

### The message is the business outcome, not SEO

Ahmad: *"we're selling SEO, so the messaging is not really SEO... we're selling phone calls."* The
head sits on customers calling and on picking by the size of the business. No feature language, no
packages framing, no jargon, and the standing ban on `rank` / `ترتيب` / `يتصدر` holds.

### The copy

| Element | Arabic | English |
|---|---|---|
| Eyebrow | الأسعار | Pricing |
| Headline | اختر خطتك | Choose your plan. |
| Highlighted phrase | اختر خطتك — the whole headline | Choose your plan. — the whole headline |
| Subhead | كل خطة هدفها واحد: عملاء يتصلون بك. | Every plan has one goal: customers calling you. |

**THE QUALIFIER IS CUT, 2026-10-01.** The headline read `اختر خطتك حسب حجم شركتك` /
`Pick your plan by your company size.` Ahmad: `just leave it, choose your plan, remove company size.`
The highlighted phrase was already exactly `اختر خطتك` / `Pick your plan`, so what is left **is** the
highlight, unchanged — nothing was added around it and the highlight was not invented. The English
`<br class="brk">` / `<span class="nb">` break treatment went with the qualifier: three words need no
planned break.

**THE SUBHEAD LOST ITS SECOND SENTENCE WITH IT.** `والفرق بينها هو حجم شركتك` /
`What changes is the size of your company.` was the headline's qualifier said twice, and each of the
three cards already prints who it is for. What is left is the one thing the section sells: customers
calling. Build-spec §28.1.

**Three cards, `$500` / `$1,000` / `$1,500` per month, low to high in reading order**, which is left
to right on `/en/` and **right to left on `/`**. Same order in the source, both languages; the page
direction does the mirroring.

| Card | Price | Period, ar / en | Who it is for, ar / en |
|---|---|---|---|
| 1 | $500 | شهريًا / monthly | للشركات الصغيرة / For small companies |
| 2 | $1,000 | شهريًا / monthly | للشركات الصغيرة والمتوسطة / For small to medium companies |
| 3 | $1,500 | شهريًا / monthly | للشركات المتوسطة والكبيرة / For medium to large companies |

**The CTA on each card is the site's existing call CTA, and no third label is introduced.**

| Arabic | English |
|---|---|
| اتصل الآن → `tel:` | Call now → `tel:` |

**Four hard rules on this section.**

1. **NO OFFER.** See above. This is the rule the section exists to obey and it is the one a future
   agent will break first, because the copy for the offer is sitting right there in Part B.
2. **COMPANY SIZE IS THE ONLY DIFFERENTIATOR.** No hours, no page counts, no service or area counts,
   no blog volume, no link quantities, no reporting frequency, no support levels, no `most popular`
   marker, and no promise about how many calls a plan produces.
3. **NO SAVINGS FIGURE, NO STRUCK-THROUGH PRICE, NO PERCENTAGE.** Three prices are three prices.
4. **NO GEOGRAPHY.** The homepage names no country anywhere. The geography register at the end of
   this file is unchanged.

**Every Arabic price still goes through `ltr()`, the Unicode LTR isolate** — never a bare `$` inside an
Arabic string.

**The section is built to `design/boards/pricing-light.png`.** Ahmad picked `pricing-dark.png` first
and then replaced it: *"you are right make it light because dark follows."* **`pricing-dark.png` is
the dead board.** Either way the board's own words are placeholders and are **not** used: it draws
`$2,000`, `Get Started` and `More features for growing teams`, and all three are wrong here — the
last is exactly the invented feature language rule 2 bans. The board is the layout and the type,
never the copy. See build-spec §27.5 and §27.6.

---

## 8. FAQ

**Background** light `#F5F6F7`, accordion panels on white with a `1px #EBEBEB` hairline.

These are brand objections. Every offer question, `is the $500 per month`, `why is it $500 for six months`,
`is there a contract`, `what happens after six months`, `do I need a commercial registration`, lives on
`/offer`. **No figures and no prices in this section.** No durations are invented anywhere in it.

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

## THE OFFER CHANGED ON 2026-09-30. IT IS NOT FREE.

Ahmad, in his own words: *"It's actually $500 for six months. And we anchor the actual price starts from
$500 a month. But for the first six months, they don't actually need to pay monthly. They just pay one
time $500. And then after that, they can choose a three-tier price, $500, $1,000, or $1,500."*

So, and every line in Part B is written off these three facts:

1. **The anchor.** The service normally starts at **$500 per month**.
2. **The offer.** **$500 ONE TIME**, and that single payment covers the first six months. Not $500 a
   month. Not $500 a month for six months. One payment of $500 buys six months.
3. **After six months** the client picks one of three monthly tiers: **$500, $1,000 or $1,500 a month.**

**THE SINGLE BIGGEST RISK ON THIS PAGE IS CONFUSION**, and it is worth more than any other consideration
here. If a reader leaves thinking it is $500 per month for six months, the offer is dead and so is the
trust. Every place the price appears says in the shortest words available that it is one payment, in both
languages: `دفعة واحدة` / `one payment`, `مرة واحدة` / `one time`. Do not economise on those words anywhere.

**Why the anchor is the weapon.** Ahmad has a competitor actively pitching his prospects at $500 a month.
A prospect who reads this page has to find that offer unthinkable by comparison, and the way that happens
is the same number printed twice with two different units, sitting next to each other in the hero, with
nothing between them. **There is no "you save $2,500" line and there never will be** — a savings claim
reads as a discount gimmick and it makes the reader argue with the arithmetic instead of with the
competitor's quote. Two numbers. The reader does the sum.

**The three tiers carry PRICES ONLY.** Ahmad gave the three figures and not what differs between them.
Nothing on this page invents a service level, a page count, an hours figure or a feature list to fill them
out. What each plan covers is agreed on the call, which is what `copy-pages.md` T6 already says of
everything project specific. **Fill the tiers in only when Ahmad supplies their contents.**

**One performance figure block is now allowed here, B2b, and only that one.** Part B used to forbid
performance figures outright, on the grounds that a figure lifted onto an offer page turns into a promise.
Ahmad overrode that on 2026-09-30, when the offer stopped being free: a reader who is being asked for money
wants to see what the six months do before he pays. B2b keeps every guard rail the homepage figures carry —
one named client, one named period, already in the past, the source named on the page — and its image is an
unedited Search Console export. Nothing else on this page carries a performance figure, and no figure
anywhere on it is phrased as a forecast.

`وثيقة عمل حر` appears everywhere `سجل تجاري` appears. Leaving it out silently disqualifies the larger
half of the market.

## Page meta

| Field | Arabic (`/offer`) | English (`/en/offer`) |
|---|---|---|
| Title | عملاء جدد من محركات البحث والذكاء الاصطناعي \| Q8 block | New customers from search engines and AI \| Q8 block |
| Description | عملاء جدد من محركات البحث والذكاء الاصطناعي لشركات الخدمات في السعودية. دفعة واحدة 500 دولار تغطي أول ستة أشهر. السعر المعتاد يبدأ من 500 دولار شهريًا. | New customers from search engines and AI, for service companies in Saudi Arabia. One payment of $500 covers the first six months. Normal price from $500 a month. |

**The Arabic meta writes `500 دولار`, not `$500`, and that is deliberate.** Inside page copy the price is
`$500` wrapped in a Unicode LTR isolate (see the price register at the end of this file); a title and a
description are shown as plain text in a search result, where an invisible control character is not worth
the risk, and `500 دولار` is unambiguous without one.

## B1. Offer hero

**Background** dark `#141415`. Countdown directly under the headline.

**Rewritten 2026-09-30 for the paid offer.** The headline, the subhead and the highlight all moved, and a
new block, the price anchor, sits between the subhead and the countdown. Everything else in this section —
the pill, the countdown, the spots slot, both CTAs and the static state — is untouched.

**THE HEADLINE WAS REPLACED AGAIN LATER ON 2026-09-30 (build-spec §26.4). It sells the outcome, not the
price.** It was `ستة أشهر بـ$500، تُدفع مرة واحدة` / `Six months for $500, paid one time.` Ahmad:
*"you're selling the website, not the dream outcome, which is related to search and AI, getting clients."*
The line now opens on the outcome, new customers, and names the two channels without explaining either.
**`محركات البحث` / `search engines` is deliberate and must NOT be narrowed back to `جوجل` / `Google`**:
he asked for search engines specifically. Six Arabic words, seven English.

**Where the highlight went.** Ahmad's rule from 2026-09-24 was that the highlight belongs on the offer's
value word, not on `بدون عقد` / `no contract`. The value word was `مجانية` / `free`, then `مرة واحدة` /
`one time` while the headline still carried the price. **The headline no longer carries the price**, so the
highlight moved to `عملاء جدد` / `New customers` — the outcome, which is what the reader is being sold.
`بدون عقد` is still never highlighted here: it owns its own full width band in B4.

**Because the price left the headline, B1b now carries the whole price message alone and was strengthened
to compensate**: a bigger offer row with an orange edge, and the anti-confusion note in a box. The single
biggest risk on this page is still confusion. Build-spec §26.4 has the sizes and the measured line counts.

**Three fixes against the rendered board, 2026-09-24, that still stand.**
1. One highlighted phrase only, and it is the value word (above).
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
| Headline | عملاء جدد من محركات البحث والذكاء الاصطناعي | New customers from search engines and AI. |
| Highlighted phrase | عملاء جدد | New customers |
| Subhead | هذا العرض مخصص لشركات الخدمات في السعودية. دفعة واحدة $500 تغطي أول ستة أشهر من العمل الكامل. نجعل عملاءك يجدونك في جوجل وفي الذكاء الاصطناعي، فتتحول هذه الزيارات إلى مكالمات وعملاء لنشاطك. | This offer is for service companies in Saudi Arabia. One payment of $500 covers your first six months of the full work. We get your business found on Google and in AI, turning those visits into calls and customers. |
| Countdown label | يغلق التسجيل خلال | Registration closes in |
| Countdown | `[COUNTDOWN]` | `[COUNTDOWN]` |
| Countdown units | يوم · ساعة · دقيقة · ثانية | Days · Hours · Minutes · Seconds |
| Spots line | `[SPOTS]` مقاعد متبقية | `[SPOTS]` seats left |
| CTA primary | اتصل الآن | Call now |
| CTA secondary | واتساب | WhatsApp |

**Static state.** With `[COUNTDOWN]` removed and `[SPOTS]` empty the hero still has to read correctly.
Replacement line: `التسجيل مفتوح الآن` / `Registration is open now`.

### B1b. The price anchor

The block that carries the whole argument. It sits directly under the subhead, above the countdown, and
nothing competes with it: two rows, the **same number**, **different units**, and one short line under them.

| Row | Label, ar / en | Value, ar / en |
|---|---|---|
| Anchor | السعر المعتاد / Normal price | يبدأ من $500 شهريًا / from $500 per month |
| Offer | هذا العرض / This offer | $500 دفعة واحدة، تغطي ستة أشهر / $500 one time, covers six months |

| Note under the pair | Arabic | English |
|---|---|---|
| | دفعة واحدة، وليست شهرية. لا فاتورة شهرية خلال الأشهر الستة. | One payment, not monthly. No monthly bill during the six months. |

**The note is not decoration.** It is the anti-confusion line and it is the reason the block exists: a
reader who takes one thing away from this page has to take away that the $500 is paid once. It is the only
bold line in the hero after the headline.

**No savings figure, no struck-through price, no percentage.** The anchor row is not a "was" price being
crossed out — it is the service's real ongoing price, stated plainly, because it is also tier 1 in B5. A
strike-through would turn a true statement into a sales device and would contradict B5 three sections later.

**It is a description list, not a table**, because two label/value pairs are exactly that, and it gives a
screen reader the pairing with no ARIA. The note sits outside the `dl`, which may only contain `dt`, `dd`
and `div`.

## B2. What the offer includes

Same six deliverables as homepage Section 5, same icons, listed here as the contents of the six months the
one payment buys.

| Element | Arabic | English |
|---|---|---|
| Block title | ما يشمله العرض | What is included |
| Intro | دفعة واحدة $500 تغطي الأشهر الستة كاملة، والأشهر الستة تشمل العمل كاملًا لا جزءًا منه. | One payment of $500 covers all six months, and the six months cover the full work, not a part of it. |

| # | Arabic | English |
|---|---|---|
| 1 | تصميم وتطوير موقع مخصص | Custom website design and development |
| 2 | صفحة مستقلة لكل خدمة ولكل منطقة | A dedicated page for every service and area |
| 3 | الظهور في نتائج بحث جوجل | Google Search visibility |
| 4 | الظهور في منصات الذكاء الاصطناعي | AI platform visibility |
| 5 | بناء الروابط والسلطة | Backlinks and authority building |
| 6 | الاستضافة والنطاق والحماية | Hosting, domain and security |

## B2b. The proof

**New 2026-09-30, and it is the only performance figure in Part B.** It answers the question the price
creates: what do six months actually do. Placed after B2, so the reader has just read what he gets and is
immediately shown one real case of it.

| Element | Arabic | English |
|---|---|---|
| Block title | مثال واحد على ستة أشهر | One example of six months |
| Intro | موقع بنيناه. هذه أرقامه. | A site we built. These are its numbers. |
| Fine print, directly under the image | kwtclean.com، من 1 أبريل 2026 إلى 19 سبتمبر 2026. | kwtclean.com, 1 April 2026 to 19 September 2026. |
| Caption, under the image | ستة أشهر من هذا العمل هي ما تشتريه الدفعة الواحدة $500. | Six months of that work is what the one payment of $500 buys. |
| Pan hint, phone only | اسحب الصورة أفقيًا لقراءتها كاملة | Swipe the panel sideways to read all of it |
| Pan region accessible name | لوحة أداء kwtclean.com في Google Search Console | The kwtclean.com performance panel in Google Search Console |
| Source line | الصورة تصدير مباشر من Google Search Console، دون أي تعديل على الأرقام. | The image is an unedited export from Google Search Console. No figure in it has been changed. |

**On a phone the panel pans, it does not shrink.** Scaled into a 350px box the export's headline figures
render about 5px tall, so below 1000px the image keeps a 1000px floor inside a horizontally scrollable
wrapper and the reader swipes it. **It is never cropped to fit.** build-spec §25.6 has the measurements and
the RTL trap that cost one round.

**The image.** `src/img/proof-kwtclean-gsc.webp`, 2243 x 582, derived from the PNG kept byte-for-byte at
`design/proof-shots/kwtclean-gsc-2026-04-01-to-2026-09-19.png`. The derivation is a format conversion and
nothing else: never cropped further, never retouched, never recoloured, and **no number in it is altered**.
The full provenance, including the sha256 the derive script checks before it will write, is in
`design/proof-shots/SOURCES.md`.

The alt text describes the panel as a panel — the two selected tiles (`Total clicks 1.99K`,
`Total impressions 114K`), the two unselected ones (`Average CTR 1.7%`, `Average position 10.9`), the date
range and the shape of the daily curve. That is a description of an image, not a claim, which is why
`Average position` may appear in it where the `rank` register forbids position as a selling word.

**Ahmad's framing when he supplied it:** *"a good example of what happens in six months."* The page prints
the two dates off the image and never rounds them into a month count or a claim. April 2026 is this
property's first month with any data, so the chart is the site's whole life to date.

**THE LEAD WAS SHORTENED LATER ON 2026-09-30 (build-spec §26.3) AND THE PROVENANCE MOVED UNDER THE IMAGE.**
Ahmad: *"you put too much details for the search console graph, you are very logical and direct in your
messaging."* The lead used to open on the client name and both exact dates before the reader had looked at
the panel. It is now six words, and `kwtclean.com` and the range are small fine print directly beneath the
image, where provenance belongs. **They were not deleted** — B2b still names one client and one named
period already in the past, so every guard rail above still holds. Do not lead with them again.

**What this block never says.** It does not average the figures, project them, promise them to the reader,
call them typical, or compare them with anything. One client, one named period, already in the past.

## B3. Eligibility

**Four** conditions, given equal visual weight to the inclusion list. The conditions are what make a
selective offer read as selective rather than desperate, so they are not tucked into small print.

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
**Rewritten 2026-09-30, because the old body was written for a free offer.** It said `تستطيع التوقف في أي
وقت خلال الأشهر الستة أو بعدها، دون رسوم` / `You can stop at any time during the six months or after them,
with no fee`, which was plainly true when nothing had been paid and reads as a **refund promise** now that
it has. The new body states what is actually true and stops there: one payment, no monthly bill, no
automatic renewal, nothing further due. **It states no refund policy in either direction.** Nobody has
decided one, `copy-pages.md` T6 already says the money terms are agreed directly, and inventing one here
would be inventing a fact about money.

| Element | Arabic | English |
|---|---|---|
| Block title | بدون عقد | No contract |
| Body | لا يوجد عقد ولا التزام ولا فترة إشعار. الدفعة $500 مرة واحدة، ولا توجد فاتورة شهرية خلال الأشهر الستة، ولا يتجدد شيء تلقائيًا. وحين تنتهي المدة، القرار لك وحدك، ولا يُطلب منك شيء إن قررت التوقف. | There is no contract, no commitment and no notice period. The $500 is one payment, there is no monthly bill during the six months, and nothing renews by itself. When the period ends the decision is yours alone, and nothing further is due if you stop. |

## B5. After six months

**Rebuilt 2026-09-30. This block now carries the three tiers.** Until 2026-09-30 tier pricing was undecided
and this block said in as many words that no price figure could appear in it. Ahmad has now given the three
figures, so they are printed, and the old three options (continue on a plan / keep the site on a small
monthly fee / stop) are replaced by the three tiers plus stopping.

**PRICES ONLY. THE TIERS HAVE NO CONTENTS AND NOTHING MAY BE INVENTED FOR THEM.** Ahmad gave the three
figures and not what differs between them. No service level, no page count, no hours figure, no feature
list, no "most popular" marker. The note under the row says what is true instead: the contents are agreed
on the call. This is the one section of Part B that is knowingly incomplete, and it is the only thing on
this page waiting on Ahmad.

**Heading check.** One rendered board came back with `What happens after six months and three`, a truncated
sentence from the image model. The heading is the cell below and nothing else, in both languages.

| Element | Arabic | English |
|---|---|---|
| Block title | ماذا يحدث بعد ستة أشهر | What happens after six months |
| Intro | حين تنتهي الأشهر الستة تختار خطة شهرية من ثلاث، أو تتوقف. القرار لك. | When the six months end you pick one of three monthly plans, or you stop. You decide. |

| Tier | Price | Unit, ar / en |
|---|---|---|
| 1 | $500 | شهريًا / per month |
| 2 | $1,000 | شهريًا / per month |
| 3 | $1,500 | شهريًا / per month |

| Note | Arabic | English |
|---|---|---|
| 1 | ما تشمله كل خطة يُتفق عليه معك في المكالمة، حسب قطاعك وحسب ما حققته الأشهر الستة. | What each plan covers is agreed with you on the call, against your industry and what the six months produced. |
| 2 | وإن اخترت التوقف، فالتوقف نهائي، دون رسوم ودون إشعار. | If you choose to stop, you stop completely, with no fee and no notice. |

**Tier 1 is the same $500 as the anchor in B1b, on purpose.** The anchor is not a struck-through "was"
price; it is the real ongoing price, and it reappears here as the entry tier. The two blocks have to agree,
and they do.

## B6. Offer FAQ

The offer questions live here and only here.

**Q1**

| | Arabic | English |
|---|---|---|
| Question | هل الـ$500 شهريًا؟ | Is the $500 per month? |
| Answer | لا. الـ$500 دفعة واحدة تغطي الأشهر الستة كاملة، ولا توجد فاتورة شهرية خلالها. السعر المعتاد لهذه الخدمة يبدأ من $500 شهريًا، وبعد انتهاء الأشهر الستة تختار خطة شهرية من ثلاث: $500 أو $1,000 أو $1,500. | No. The $500 is one payment and it covers all six months, with no monthly bill during them. The normal price for this service starts at $500 a month, and after the six months end you pick one of three monthly plans: $500, $1,000 or $1,500. |

**Q1 is the confusion question and it is deliberately first.** It is the single most likely reason a
qualified prospect walks away from this page, so it is answered before anything else is, in the plainest
possible words, and the anchor is restated inside the answer.

**Q2**

| | Arabic | English |
|---|---|---|
| Question | لماذا السعر $500 لستة أشهر؟ | Why is it $500 for six months? |
| Answer | نختار عددًا محدودًا من الشركات في كل مدينة ونعمل عليها ستة أشهر كاملة حتى تظهر النتيجة. النتيجة نفسها هي ما يجعل العميل يقرر الاستمرار، وهي أيضًا ما نعرضه على العميل التالي. ولهذا وُضعت شروط القبول: العرض لا ينجح إلا مع نشاط قائم وموثق فعلًا. | We take a limited number of companies in each city and work on them for a full six months until the result shows. That result is what makes a client decide to continue, and it is also what we show the next client. That is why the eligibility conditions exist. The offer only works with a business that is already running and already documented. |

**Q3**

| | Arabic | English |
|---|---|---|
| Question | هل هناك عقد أو التزام؟ | Is there a contract or a commitment? |
| Answer | لا. لا يوجد عقد ولا فترة إشعار. الدفعة $500 مرة واحدة، ولا توجد فاتورة شهرية خلال الأشهر الستة، ولا يتجدد شيء تلقائيًا. وحين تنتهي المدة، إن قررت التوقف فلا يُطلب منك شيء. | No. There is no contract and no notice period. The $500 is one payment, there is no monthly bill during the six months, and nothing renews by itself. When the period ends, nothing further is due if you stop. |

**Q4**

| | Arabic | English |
|---|---|---|
| Question | هل يشترط وجود سجل تجاري؟ | Do I need a commercial registration? |
| Answer | سجل تجاري أو وثيقة عمل حر. أي منهما يكفي. الشرط الوحيد أن يطابق العنوان المسجل في الوثيقة عنوان ملف نشاطك على جوجل. | A commercial registration or a freelance certificate. Either one is enough. The only requirement is that the address on the certificate matches the address on your Google Business Profile. |

**Q5**

| | Arabic | English |
|---|---|---|
| Question | لدي موقع قائم، هل أنا مؤهل؟ | I already have a website. Do I qualify? |
| Answer | العرض مخصص لمن لا يملك موقعًا قائمًا. إن كان لديك موقع وتريد استبداله بالكامل، فهذا عمل نقوم به خارج هذا العرض، واتصل بنا لنراجعه معك. | The offer is for businesses with no existing website. If you have one and you want it replaced entirely, that is work we do outside this offer. Call us and we will look at it with you. |

**Q6**

| | Arabic | English |
|---|---|---|
| Question | ماذا يحدث بعد ستة أشهر؟ | What happens after six months? |
| Answer | القرار لك. حين تنتهي الأشهر الستة تختار خطة شهرية من ثلاث، $500 أو $1,000 أو $1,500، وما تشمله كل خطة يُتفق عليه معك في المكالمة حسب قطاعك وحسب ما حققته الأشهر الستة. وإن اخترت التوقف، فالتوقف نهائي، دون رسوم ودون إشعار. | You decide. When the six months end you pick one of three monthly plans, $500, $1,000 or $1,500, and what each plan covers is agreed with you on the call, against your industry and what the six months produced. If you choose to stop, you stop completely, with no fee and no notice. |

**Q7**

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

**Rewritten 2026-09-30.** Section 6 stopped printing figures of its own when it was rebuilt around the
graph (build-spec §26.1). The three click figures, the carwashkw.com baseline range, the month labels and
the source caption all came off the page. The only figures §6 now shows are the ones drawn **inside the
Search Console export image** — its own axis, not our copy, and never altered.

| Figure | Where | Source |
|---|---|---|
| `1.99K` clicks, `114K` impressions, `1.7%` CTR, `10.9` average position, and the dated x axis | Section 6 and offer B2b, printed **inside the image** | the unedited Search Console export, `design/proof-shots/` |
| Seven impression totals and **seven** `New project` tags | Section 7, the **fourteen** cards | derivation table below |

Sections 0, 1, 2, 3, 4, 8, 9 and 10 carry no figures (there is no Section 5 any more). **The homepage carries a price in exactly two
places: the Section 2 strip line and Section 7b.** The strip is the offer teaser. **Since 2026-10-01,
§7b carries only the three monthly prices and never the offer** — it was the offer a second time until
Ahmad ruled it out. Neither place invents a figure. (Until 2026-09-30 the strip was the only one.) Part B
carries prices (the price register below) and exactly one performance figure block, B2b. Every other number
that renders in Part B comes from the `[COUNTDOWN]` and `[SPOTS]` build slots, which are configuration,
not claims. Every figure behind Section 7 comes from `clients/q8block/design/proof-data.md`, pulled from
the Search Console API on 24 September 2026.

## Price register, 2026-09-30

Every price printed anywhere on the site, and there are only three distinct figures. Nothing else may be
added and no figure here may be changed without Ahmad.

| Figure | What it is | Where it appears |
|---|---|---|
| **$500 per month** | The anchor. What the service normally starts at, and tier 1 after the six months | **Homepage §7b card 1**, offer B1b anchor row, B5 tier 1, offer FAQ Q1 and Q6 |
| **$500 one time** | The offer. One payment covering the first six months | Homepage §2 strip line ONLY on the homepage (§7b no longer mentions the offer), offer meta, B1 subhead, B1b offer row and note, B2 intro, B2b caption, B4, offer FAQ Q1, Q2 and Q3 |
| **$1,000 and $1,500 per month** | Tiers 2 and 3 after the six months | **Homepage §7b cards 2 and 3**, B5, offer FAQ Q1 and Q6 |

**The offer B1 headline is no longer in this register.** It carried `$500` until 2026-09-30, when it was
replaced with `عملاء جدد من محركات البحث والذكاء الاصطناعي` / `New customers from search engines and AI.`
(build-spec §26.4). The price it dropped is carried by B1b directly beneath it, which was strengthened for
exactly that reason.

**The one-payment wording is mandatory beside the number, every time.** `دفعة واحدة` / `one payment`,
`مرة واحدة` / `one time`, `تُدفع مرة واحدة` / `paid once`. A price on this site never appears next to
"six months" without one of them.

**`$500` in Arabic needs a Unicode LTR isolate and this is not optional.** Written plainly inside an Arabic
sentence it renders as `500$`: the bidi algorithm resolves European digits following an Arabic letter to
Arabic-Number, which leaves the `$` as a neutral and pushes it to the wrong side of the run. `src/data.mjs`
exports `ltr()`, which wraps the price in U+2066 / U+2069, and every Arabic price string goes through it.
Invisible characters were chosen over `<span dir="ltr">` because they survive `esc()`, so the strings stay
ordinary escaped copy. **Never write a bare `$` price into an Arabic string.** The two exceptions are the
Arabic `<title>` and meta description, which write `500 دولار` instead — a control character in a search
result snippet is not worth the risk.

**No savings figure is derived from these anywhere**, and none may be. See the Part B preamble.
No figure in Section 7 is rounded at all — each is an exact sum of exact monthly rows — none is averaged
across clients, and none is taken from a partial month. September 2026 is a partial month and is excluded
from every claim on the site.

**Section 7 prints impressions. Section 6 prints no figure of its own at all any more** (2026-09-30, build-spec
§26.1): it is one Search Console export image and three short beats, and the only numbers in it are the
image's own. **The word "impression" still appears nowhere on the page** — Section 7's card says
`times shown in Google search` / `مرة ظهر فيها في بحث Google`, which is what an impression is, in words a
reader who has never owned a website already understands. The monthly impression rows behind every total
are in this file's Section 7 derivation table and in `src/data.mjs`, which is where the build adds them up.

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
| 12 | alamana-kw.com | مشروع جديد / New project | — | **No Search Console property accessible to the service account** (checked 2026-10-01). No rows exist, so nothing is summed and nothing is printed |
| 13 | tasleekq8.com | مشروع جديد / New project | — | As above, no accessible property |
| 14 | skyscraperkw.com | مشروع جديد / New project | — | As above, no accessible property |

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

**The three cards added 2026-10-01 are not in `proof-data.md` and must not be guessed into it.** A
`sites.list` call on 2026-10-01 through the same service account `.claude/skills/report/scripts/lib.js`
uses returned thirteen properties — the twelve already in `proof-data.md` plus `israelsupportindex.com`.
`alamana-kw.com`, `tasleekq8.com` and `skyscraperkw.com` are **not** among them. All three sites are
live and return 200; Search Console simply has not been shared with the service account. Until it is,
they carry the tag. **Do not estimate, infer from another client, or copy a figure across.**

**Sites in `proof-data.md` that are not cards.** `q8block.com` is Q8Block's own site, not a client, and it
is not in the fourteen. Its own numbers are tiny, 0 to 2 clicks a month, which is exactly why the site is
being rebuilt. `skyscraper`, `fightclub` and `alamana` are not SEO clients and have no Search Console
property in the export, so there is no data for them and they get no card.

## Section 7 logo table

One row per card, in the shipping order. **Revised 2026-10-01: fourteen cards. Three new lockups were
added and mashame3.com's plate was replaced**, all four derived by build-spec §20.2's rules exactly —
see §28.4. **Revised 2026-09-25: seven of the eleven are now clean brand
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
| 7 | mashame3.com | **regenerated 2026-10-01** | `v2-mashame3.com.png` — the `مؤسسة المشامع للتكييف والتبريد / AL MASHAME` lockup on white. It replaced the live site's `/favicon.svg`, a bare blue snowflake. Ahmad: the old one "is just a big icon without the company name, so it doesn't align with the rest" |
| 8 | betikcleaner.com | unchanged | `/assets/brand/betik-cleaner-primary-rtl.svg` from the live site — the full `بيتك كلينر / BETIK CLEANER` lockup |
| 9 | anharpest.com | **regenerated** | `v2-anharpest.com.png` — the `شركة انهار لمكافحة الحشرات / ANHAR PEST CONTROL` shield lockup on white |
| 10 | alghadeerclean.com | **regenerated** | `v2-alghadeerclean.com.png` — the `الغدير اللامع كلين / AL GHADEER CLEAN` droplet lockup on white |
| 11 | ragwaclean.com | **regenerated** | `v2-ragwaclean.com.png` — the `رغوة الجنوب / RAGWA CLEAN` bubble lockup on white |
| 12 | alamana-kw.com | **new 2026-10-01** | `v2-alamana-kw.com.png` — the `شركة الأمانة لتسليك المجاري / AL AMANA` pipe lockup on white |
| 13 | tasleekq8.com | **new 2026-10-01** | `v2-tasleekq8.com.png` — the `رمضان لتسليك المجاري / RAMADAN DRAIN` gully lockup on white |
| 14 | skyscraperkw.com | **new 2026-10-01** | `v2-skyscraperkw.com.png` — the `ناطحات السحاب / SKYSCRAPER` towers lockup on white |

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
