#!/usr/bin/env node
/* Pulls every figure the homepage report section prints out of the real
   monthly report HTML, so no number on the page is ever typed by hand.

     node scripts/derive-report.mjs [path-to-report.html]

   Default source: ../../ops/reports/kwtclean/2026-09.html (hub tree).
   Writes src/report.json. The build reads that file; re-run this script,
   never edit the JSON. Report pages used: 1 (conversions), 2 (by service),
   4 (search keywords), 5 (visits from search). */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const SRC = process.argv[2] || path.resolve(ROOT, '../../ops/reports/kwtclean/2026-09.html');
const html = fs.readFileSync(SRC, 'utf8');

const pages = html.split('<section class="page">').slice(1).map((p) => p.split('</section>')[0]);
if (pages.length !== 6) throw new Error(`expected 6 report pages, found ${pages.length}`);

const text = (s) => s.replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim();
const num = (s) => Number(text(s).replace(/,/g, ''));
const one = (re, s, what) => {
  const m = s.match(re);
  if (!m) throw new Error(`not found in report: ${what}`);
  return m;
};

/* header label, e.g. "kwtclean.com — Sep 2026" */
const label = text(one(/<span class="eyebrow-en">([\s\S]*?)<\/span>/, pages[0], 'header label')[1]);
const [site, month] = label.split(/\s+[—–-]\s+/);

/* page 1: conversions */
const p1 = pages[0];
const total = num(one(/<div class="bignum">([\s\S]*?)<\/div>/, p1, 'total')[1]);
const sp = (cls) => {
  const block = one(new RegExp(`<div class="sp ${cls}"[\\s\\S]*?<div class="pc">([\\s\\S]*?)</div>`), p1, cls);
  return {
    n: num(one(/<div class="n">([\s\S]*?)<\/div>/, block[0], `${cls} n`)[1]),
    pct: num(one(/<bdi dir="ltr">(\d+)%<\/bdi>/, block[1], `${cls} pct`)[1]),
  };
};
const wa = sp('wa');
const call = sp('call');
if (wa.n + call.n !== total) throw new Error('page 1 split does not add up');

/* page 2: conversions by service, top 8 */
const rows = [...pages[1].matchAll(/<div class="er">([\s\S]*?)<span class="tot">([\s\S]*?)<\/span><\/div>/g)].map((m) => {
  const body = m[1];
  const mix = text(one(/<span class="mix">([\s\S]*?)<\/span>\s*$/, body, 'mix')[1]);
  const calls = (mix.match(/(\d+) اتصال/) || [0, 0])[1];
  const whats = (mix.match(/(\d+) واتساب/) || [0, 0])[1];
  return {
    n: text(one(/<span class="rank">([\s\S]*?)<\/span>/, body, 'rank')[1]),
    ar: text(one(/<span class="lbl">([\s\S]*?)<\/span>/, body, 'lbl')[1]),
    calls: Number(calls), wa: Number(whats), total: num(m[2]),
  };
});
for (const r of rows) if (r.calls + r.wa !== r.total) throw new Error(`row ${r.n} does not add up`);
const services = rows.slice(0, 8);

/* page 4: search keywords, the report's own order */
const keywords = [...pages[3].matchAll(/<span class="pill( hot)?">([\s\S]*?)<\/span>/g)].map((m) => {
  const raw = m[2];
  const en = /<bdi class="en">/.test(raw);
  const phrase = text(raw.replace(/<bdi class="en">[\s\S]*?<\/bdi>/, ''));
  return { text: phrase, lang: en ? 'en' : 'ar', hot: Boolean(m[1]) };
});

/* page 5: visits from search */
const p5 = pages[4];
const panels = [...p5.matchAll(/<div class="panel( key)?"><div class="k">([\s\S]*?)<\/div>\s*<div class="v[^"]*">([\s\S]*?)<\/div>\s*<div class="s">([\s\S]*?)<\/div><\/div>/g)]
  .map((m) => ({ k: text(m[2]), v: text(m[3]), s: text(m[4]) }));
if (panels.length !== 4) throw new Error(`expected 4 traffic panels, found ${panels.length}`);
const clicks = num(panels[0].v);
const impressions = num(panels[1].v);
const peakDay = Number(panels[2].v.match(/\d+/)[0]);
const peakVisits = Number(panels[2].s.match(/\d+/)[0]);
const [valueLo, valueHi] = panels[3].v.match(/\d+/g).map(Number);

/* the daily series is not stored in the report as numbers, only as the
   chart path. Recover it: the chart's baseline is y=196, the peak marker
   sits at the peak value, x runs from day 1 at the right to day N at the
   left. Each point must land on a whole number of visits. */
const svg = one(/<svg class="chart"[\s\S]*?<\/svg>/, p5, 'chart')[0];
const line = one(/<path d="([^"]+)" stroke=/, svg, 'chart line')[1];
const base = Number(one(/<line x1="[\d.]+" y1="([\d.]+)"/, svg, 'baseline')[1]);
const peak = one(/<circle cx="([\d.]+)" cy="([\d.]+)"/, svg, 'peak marker');
const pts = [...line.matchAll(/[ML]([\d.]+),([\d.]+)/g)].map((m) => [Number(m[1]), Number(m[2])]);
const scale = (base - Number(peak[2])) / peakVisits;
pts.sort((a, b) => b[0] - a[0]);                       // day 1 first
const daily = pts.map(([, y]) => {
  const v = (base - y) / scale;
  if (Math.abs(v - Math.round(v)) > 0.05) throw new Error(`chart point ${y} is not a whole visit count (${v})`);
  return Math.round(v);
});
const peakIndex = pts.findIndex(([x]) => Math.abs(x - Number(peak[1])) < 0.2);
if (peakIndex + 1 !== peakDay) throw new Error('peak marker is not on the peak day');
if (Math.max(...daily) !== peakVisits) throw new Error('peak value mismatch');

const out = {
  source: path.relative(ROOT, SRC).replace(/\\/g, '/'),
  label: { site, month },
  conversions: { total, wa: wa.n, waPct: wa.pct, call: call.n, callPct: call.pct },
  services,
  keywords,
  traffic: { clicks, impressions, peakDay, peakVisits, valueLo, valueHi, daily, dailySum: daily.reduce((a, b) => a + b, 0) },
};
fs.writeFileSync(path.join(ROOT, 'src', 'report.json'), JSON.stringify(out, null, 2) + '\n');
console.log(JSON.stringify(out));
