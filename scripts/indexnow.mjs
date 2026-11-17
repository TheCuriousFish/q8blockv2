// Submit every sitemap URL to IndexNow (Bing, Yandex and the other engines). Run after a production deploy is ready:
//   node scripts/indexnow.mjs          submit
//   node scripts/indexnow.mjs --dry    print what it would send
// The key and its live file come from src/data.mjs (INDEXNOW_KEY), written by the build to site/<key>.txt.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { INDEXNOW_KEY, NAP } from '../src/data.mjs';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const xml = fs.readFileSync(path.join(ROOT, 'site', 'sitemap.xml'), 'utf8');
const urls = [...xml.matchAll(/<url>\s*<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
const host = new URL(NAP.origin).host;
console.log(`${urls.length} URLs`);
if (process.argv.includes('--dry')) { console.log(urls.join('\n')); process.exit(0); }

for (let i = 0; i < urls.length; i += 10000) {
  const res = await fetch('https://api.indexnow.org/IndexNow', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
    body: JSON.stringify({ host, key: INDEXNOW_KEY, keyLocation: `${NAP.origin}/${INDEXNOW_KEY}.txt`, urlList: urls.slice(i, i + 10000) }),
  });
  console.log(`batch ${i / 10000 + 1}: HTTP ${res.status}`);
  if (res.status >= 300) process.exitCode = 1;
}
