# Proof screenshots used in the build

Everything in this folder is a real export from a real Google Search Console property. Nothing here is
cropped further, retouched, sharpened, recoloured, upscaled or composited, and **no number inside any of
these images is altered, masked or redrawn**. `derive.mjs` converts PNG to WebP at the source's own pixel
dimensions and does nothing else, after checking the source's sha256 still matches the record below.

The site's whole argument is that its figures are checkable. A figure that has been through an image
editor is not checkable, so this rule is not a preference.

## kwtclean-gsc-2026-04-01-to-2026-09-19.png

| | |
|---|---|
| Property | `kwtclean.com` — a client site Q8Block built. It is card 4 in homepage §7 and the site homepage §6 follows month by month |
| Source | Google Search Console, Performance report, Search results, daily view |
| Date range shown | `4/1/26` to `9/19/26`, i.e. 1 April 2026 to 19 September 2026 |
| Supplied | 2026-09-30, by Ahmad, already cropped to the four metric tiles plus the daily chart |
| Native | 2243 x 582 PNG, 121,385 bytes |
| sha256 | `b762c37640d5e1fd213fd287032561dadffb3e93d47fc77a1f12cf2b1ff8d4f1` |
| Ships as | `src/img/proof-kwtclean-gsc.webp`, 2243 x 582, 74.7 kB |

**What it shows.** Four metric tiles, two of them selected: `Total clicks 1.99K` (blue) and
`Total impressions 114K` (purple), with `Average CTR 1.7%` and `Average position 10.9` unselected beside
them. Under them the daily chart, flat along zero through April, lifting through May and settling into a
band that climbs to September.

**The period is about six months, and the page says the dates, not a month count.** April 2026 is this
property's first month with any data (`design/proof-data.md`), so the chart is the site's whole life to
date. Ahmad's framing when he supplied it: *"a good example of what happens in six months."* The offer
page prints the two dates off the image and never rounds them into a claim.

**Why it is on the offer page and not the homepage.** `copy.md` Part B used to forbid performance figures
on `/offer` entirely, on the grounds that a figure lifted onto an offer page turns into a promise. Ahmad
overrode that on 2026-09-30, when the offer stopped being free: a reader being asked for money wants to
see what the six months do before he pays. The section is written with the same guard rails the homepage
figures carry — one named client, one named period, already in the past, source named on the page.

**Usage rule.** The image is presented as what it is: one client's Search Console export over one named
period. No copy beside it averages it, projects it, promises it to the reader, or describes it as typical.
It is never mirrored under RTL: it is a screenshot of an LTR interface.
