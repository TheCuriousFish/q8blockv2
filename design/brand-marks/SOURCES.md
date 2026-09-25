# Third-party brand marks used in the build

Nothing in this folder is redrawn, recoloured or reconstructed by hand. A trademark is fetched from the
owner's own asset host and kept byte-for-byte; `derive.mjs` copies it into `src/img/` after checking it is
still the mark we think it is.

## google-wordmark.svg

| | |
|---|---|
| Fetched | 2026-09-25 |
| URL | `https://www.gstatic.com/images/branding/googlelogo/svg/googlelogo_clr_74x24px.svg` |
| Bytes | 1660 |
| sha256 | `99bf4aa403643a6d41c028e5db29c79c17cbc815b3e10cd5c6b8f90567a03e52` |
| Native | vector, `viewBox="0 0 74 24"` |

This is the asset Google itself serves for the `Google` wordmark, out of its own
`images/branding/googlelogo/` directory on `gstatic.com` — the same tree the logo on Google's own
properties is loaded from, and the SVG counterpart of the `googlelogo_color_*dp.png` rasters listed on
Google's brand resource centre (`about.google/brand-resource-center/logos-list/`). Vector was preferred
over the PNGs for the usual reason: the mark is scaled in CSS and resolution is free.

The six letter fills are Google's four brand colours, in the official order:

| Letter | Fill |
|---|---|
| G | `#4285F4` blue |
| o | `#EA4335` red |
| o | `#FBBC05` yellow |
| g | `#4285F4` blue |
| l | `#34A853` green |
| e | `#EA4335` red |

**Why it ships as an image and not as coloured live text.** Ahmad asked for the letters in Google's own
colours. Set as text, the yellow `o` is about 1.8:1 against the hero's `#F5F6F7` and fails WCAG even at
the large-text threshold, which would drop the accessibility score off 100. WCAG 1.4.3 does not apply to
images of text used as a logotype, so an image keeps the brand colours **and** the score. Do not
"simplify" this back into `<span>`s with per-letter colours.

**Usage rule.** The mark appears exactly once, inside the hero's Google rating link, next to five stars.
It is never presented as a partnership, certification, endorsement or badge, and no copy anywhere claims
a relationship with Google beyond Q8Block having a Business Profile.
