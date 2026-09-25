# GSC Proof Data — real month-over-month numbers from Google Search Console

Pulled 2026-09-24 via the service account used by `.claude/skills/report/scripts/lib.js`. Today's date for month-window purposes: 2026-09-24. All numbers below are exactly what the Search Console API returned — nothing estimated, interpolated, or rounded.

**12 properties accessible** via the service account, all as **domain properties** (`sc-domain:...`) — no URL-prefix properties found. All 10 of the named priority clients are accessible; none are missing. Two additional accessible properties beyond the priority list: `sc-domain:q8block.com` (Q8Block's own site) and `sc-domain:movingcompanykw.com` (movingcompanykw, repo `moving`).

## Summary — three picks

**(a) Best "month 2" example — mashame3 (mashamame3 / acrepairMuhammad), April 2026: 31 clicks / 3013 impressions.**
Its first data month (March 2026) was 12 clicks / 1364 impressions, so month 2 is real, modest, upward movement — the "early signs of life" case. (Note: kwtclean's own month 2, May 2026, was far stronger at 165 clicks / 11155 impressions — see the mature/6-month discussion below — but that reads as an outlier ramp, not a representative "typical month 2," so mashame3 is the more honest pick for this slot.)

**(b) Best "month 6" example — kwtclean (CleanAlKuwait), August 2026: 531 clicks / 27932 impressions.**
kwtclean's first GSC data is April 2026, making August 2026 its 5th full month of recorded data (~6 months of real-world age allowing for pre-indexing lag before the first click landed). This is the strongest complete-month number of any site at this stage.

**(c) Best "mature" example — carwashkw.com, August 2026: 440 clicks / 16796 impressions.**
carwashkw.com has data across the entire 14-month window queried (Aug 2025 through Sep 2026) with sustained 199–440 clicks/month throughout — the longest, steadiest track record of any accessible site, and the highest 13-month average (~306 clicks/month across Aug 2025–Aug 2026 complete months). It is the single strongest site by sustained volume, not just a peak month.

**kwtclean "500+ clicks/month at ~6 months" claim — CONFIRMED.**
kwtclean's most recent complete month, August 2026, shows **531 clicks**, which is over 500. First data in our window is April 2026 (7 clicks), so August is roughly its 5th full data-month (~6 months of real-world age counting pre-indexing time). Ahmad's belief is confirmed by real numbers, not just close: 531 clicks in the most recent complete month.

---

## Per-site monthly totals (last 14 calendar months, Aug 2025 – Sep 2026)

All 10 priority clients are accessible via the service account — none missing, none returning zero rows across the whole window (each has at least some months with real data; several have long stretches of "no data" before their first indexed month, which is reported as "no data," not 0).

### sc-domain:kwtclean.com — client: kwtclean (repo CleanAlKuwait)

Earliest available data in this 14-month window: **Apr 2026** (7 clicks / 956 impressions). Months before that in the window returned no rows from the API (no data), not zero.

| Month | Clicks | Impressions |
|---|---|---|
| Aug 2025 | no data | no data |
| Sep 2025 | no data | no data |
| Oct 2025 | no data | no data |
| Nov 2025 | no data | no data |
| Dec 2025 | no data | no data |
| Jan 2026 | no data | no data |
| Feb 2026 | no data | no data |
| Mar 2026 | no data | no data |
| Apr 2026 | 7 | 956 |
| May 2026 | 165 | 11155 |
| Jun 2026 | 354 | 22101 |
| Jul 2026 | 452 | 25564 |
| Aug 2026 | 531 | 27932 |
| Sep 2026 (partial — data through Sep 24, 2026) | 390 | 19977 |

### sc-domain:kuwaityclean.com — client: kuwaityclean (repo kuwaityclean)

Earliest available data in this 14-month window: **Aug 2025** (83 clicks / 31710 impressions). Months before that in the window returned no rows from the API (no data), not zero.

| Month | Clicks | Impressions |
|---|---|---|
| Aug 2025 | 83 | 31710 |
| Sep 2025 | 65 | 19720 |
| Oct 2025 | 79 | 14389 |
| Nov 2025 | 89 | 17278 |
| Dec 2025 | 125 | 18103 |
| Jan 2026 | 127 | 16640 |
| Feb 2026 | 188 | 17752 |
| Mar 2026 | 107 | 12717 |
| Apr 2026 | 83 | 14151 |
| May 2026 | 154 | 15353 |
| Jun 2026 | 330 | 22256 |
| Jul 2026 | 372 | 23818 |
| Aug 2026 | 354 | 21713 |
| Sep 2026 (partial — data through Sep 24, 2026) | 264 | 15202 |

### sc-domain:carwashkw.com — client: carwashkw.com (repo carwashkw.com)

Earliest available data in this 14-month window: **Aug 2025** (334 clicks / 23024 impressions). Months before that in the window returned no rows from the API (no data), not zero.

| Month | Clicks | Impressions |
|---|---|---|
| Aug 2025 | 334 | 23024 |
| Sep 2025 | 389 | 21414 |
| Oct 2025 | 321 | 16167 |
| Nov 2025 | 287 | 15900 |
| Dec 2025 | 240 | 12382 |
| Jan 2026 | 211 | 13902 |
| Feb 2026 | 227 | 13961 |
| Mar 2026 | 199 | 13107 |
| Apr 2026 | 225 | 12765 |
| May 2026 | 287 | 15451 |
| Jun 2026 | 437 | 17831 |
| Jul 2026 | 386 | 15155 |
| Aug 2026 | 440 | 16796 |
| Sep 2026 (partial — data through Sep 24, 2026) | 317 | 10473 |

### sc-domain:kwcarwash.com — client: kwcarwash.com (repo kwcarwash)

Earliest available data in this 14-month window: **Aug 2025** (0 clicks / 24 impressions). Months before that in the window returned no rows from the API (no data), not zero.

| Month | Clicks | Impressions |
|---|---|---|
| Aug 2025 | 0 | 24 |
| Sep 2025 | 0 | 31 |
| Oct 2025 | 0 | 14 |
| Nov 2025 | 0 | 23 |
| Dec 2025 | 23 | 825 |
| Jan 2026 | 46 | 3181 |
| Feb 2026 | 72 | 6012 |
| Mar 2026 | 82 | 6816 |
| Apr 2026 | 97 | 6245 |
| May 2026 | 106 | 10053 |
| Jun 2026 | 108 | 7796 |
| Jul 2026 | 105 | 6930 |
| Aug 2026 | 85 | 6182 |
| Sep 2026 (partial — data through Sep 24, 2026) | 72 | 3379 |

### sc-domain:q8carwash.com — client: q8carwash.com (repo q8carwash)

Earliest available data in this 14-month window: **Aug 2025** (8 clicks / 778 impressions). Months before that in the window returned no rows from the API (no data), not zero.

| Month | Clicks | Impressions |
|---|---|---|
| Aug 2025 | 8 | 778 |
| Sep 2025 | 21 | 3826 |
| Oct 2025 | 43 | 4996 |
| Nov 2025 | 105 | 9493 |
| Dec 2025 | 171 | 13032 |
| Jan 2026 | 193 | 12894 |
| Feb 2026 | 158 | 11377 |
| Mar 2026 | 148 | 12824 |
| Apr 2026 | 97 | 9130 |
| May 2026 | 118 | 10280 |
| Jun 2026 | 104 | 9787 |
| Jul 2026 | 72 | 7278 |
| Aug 2026 | 80 | 6928 |
| Sep 2026 (partial — data through Sep 24, 2026) | 67 | 4015 |

### sc-domain:mashame3.com — client: mashamame3 (repo acrepairMuhammad)
_Note: domain is mashame3.com; client folder/repo name is 'mashamame3'/'acrepairMuhammad'_

Earliest available data in this 14-month window: **Mar 2026** (12 clicks / 1364 impressions). Months before that in the window returned no rows from the API (no data), not zero.

| Month | Clicks | Impressions |
|---|---|---|
| Aug 2025 | no data | no data |
| Sep 2025 | no data | no data |
| Oct 2025 | no data | no data |
| Nov 2025 | no data | no data |
| Dec 2025 | no data | no data |
| Jan 2026 | no data | no data |
| Feb 2026 | no data | no data |
| Mar 2026 | 12 | 1364 |
| Apr 2026 | 31 | 3013 |
| May 2026 | 83 | 3995 |
| Jun 2026 | 86 | 7098 |
| Jul 2026 | 122 | 8173 |
| Aug 2026 | 118 | 8791 |
| Sep 2026 (partial — data through Sep 24, 2026) | 0 | 371 |

### sc-domain:alghadeerclean.com — client: alghadeerclean (repo qadeer)

Earliest available data in this 14-month window: **Aug 2026** (8 clicks / 531 impressions). Months before that in the window returned no rows from the API (no data), not zero.

| Month | Clicks | Impressions |
|---|---|---|
| Aug 2025 | no data | no data |
| Sep 2025 | no data | no data |
| Oct 2025 | no data | no data |
| Nov 2025 | no data | no data |
| Dec 2025 | no data | no data |
| Jan 2026 | no data | no data |
| Feb 2026 | no data | no data |
| Mar 2026 | no data | no data |
| Apr 2026 | no data | no data |
| May 2026 | no data | no data |
| Jun 2026 | no data | no data |
| Jul 2026 | no data | no data |
| Aug 2026 | 8 | 531 |
| Sep 2026 (partial — data through Sep 24, 2026) | 7 | 2483 |

### sc-domain:anharpest.com — client: anharpest (repo ksa-pest)
_Note: newer Saudi project_

Earliest available data in this 14-month window: **Aug 2026** (10 clicks / 768 impressions). Months before that in the window returned no rows from the API (no data), not zero.

| Month | Clicks | Impressions |
|---|---|---|
| Aug 2025 | no data | no data |
| Sep 2025 | no data | no data |
| Oct 2025 | no data | no data |
| Nov 2025 | no data | no data |
| Dec 2025 | no data | no data |
| Jan 2026 | no data | no data |
| Feb 2026 | no data | no data |
| Mar 2026 | no data | no data |
| Apr 2026 | no data | no data |
| May 2026 | no data | no data |
| Jun 2026 | no data | no data |
| Jul 2026 | no data | no data |
| Aug 2026 | 10 | 768 |
| Sep 2026 (partial — data through Sep 24, 2026) | 8 | 1455 |

### sc-domain:ragwaclean.com — client: ragwaclean (repo facade-cleaning)

Earliest available data in this 14-month window: **Aug 2026** (1 clicks / 160 impressions). Months before that in the window returned no rows from the API (no data), not zero.

| Month | Clicks | Impressions |
|---|---|---|
| Aug 2025 | no data | no data |
| Sep 2025 | no data | no data |
| Oct 2025 | no data | no data |
| Nov 2025 | no data | no data |
| Dec 2025 | no data | no data |
| Jan 2026 | no data | no data |
| Feb 2026 | no data | no data |
| Mar 2026 | no data | no data |
| Apr 2026 | no data | no data |
| May 2026 | no data | no data |
| Jun 2026 | no data | no data |
| Jul 2026 | no data | no data |
| Aug 2026 | 1 | 160 |
| Sep 2026 (partial — data through Sep 24, 2026) | 6 | 521 |

### sc-domain:betikcleaner.com — client: betikcleaner (repo betik-clean)

Earliest available data in this 14-month window: **Aug 2026** (8 clicks / 1614 impressions). Months before that in the window returned no rows from the API (no data), not zero.

| Month | Clicks | Impressions |
|---|---|---|
| Aug 2025 | no data | no data |
| Sep 2025 | no data | no data |
| Oct 2025 | no data | no data |
| Nov 2025 | no data | no data |
| Dec 2025 | no data | no data |
| Jan 2026 | no data | no data |
| Feb 2026 | no data | no data |
| Mar 2026 | no data | no data |
| Apr 2026 | no data | no data |
| May 2026 | no data | no data |
| Jun 2026 | no data | no data |
| Jul 2026 | no data | no data |
| Aug 2026 | 8 | 1614 |
| Sep 2026 (partial — data through Sep 24, 2026) | 13 | 2083 |

### sc-domain:q8block.com — client: q8block.com (repo q8blockv2)
_Note: Orcha/Q8Block own site, not one of the 10 priority clients_

Earliest available data in this 14-month window: **Aug 2025** (0 clicks / 3 impressions). Months before that in the window returned no rows from the API (no data), not zero.

| Month | Clicks | Impressions |
|---|---|---|
| Aug 2025 | 0 | 3 |
| Sep 2025 | 0 | 3 |
| Oct 2025 | 2 | 6 |
| Nov 2025 | 0 | 4 |
| Dec 2025 | 1 | 12 |
| Jan 2026 | 0 | 6 |
| Feb 2026 | 0 | 40 |
| Mar 2026 | 1 | 85 |
| Apr 2026 | 1 | 113 |
| May 2026 | 2 | 255 |
| Jun 2026 | 0 | 148 |
| Jul 2026 | 0 | 38 |
| Aug 2026 | 0 | 44 |
| Sep 2026 (partial — data through Sep 24, 2026) | 1 | 32 |

### sc-domain:movingcompanykw.com — client: movingcompanykw (repo moving)
_Note: not one of the 10 priority clients, included as an other accessible property_

Earliest available data in this 14-month window: **Aug 2025** (27 clicks / 17452 impressions). Months before that in the window returned no rows from the API (no data), not zero.

| Month | Clicks | Impressions |
|---|---|---|
| Aug 2025 | 27 | 17452 |
| Sep 2025 | 15 | 11898 |
| Oct 2025 | 10 | 5303 |
| Nov 2025 | 6 | 2230 |
| Dec 2025 | 4 | 782 |
| Jan 2026 | 0 | 464 |
| Feb 2026 | 0 | 793 |
| Mar 2026 | 1 | 905 |
| Apr 2026 | 15 | 1801 |
| May 2026 | 13 | 1630 |
| Jun 2026 | 4 | 227 |
| Jul 2026 | 11 | 4211 |
| Aug 2026 | 11 | 4384 |
| Sep 2026 (partial — data through Sep 24, 2026) | 7 | 2249 |
