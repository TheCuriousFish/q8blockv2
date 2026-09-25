/* design/brand-marks/derive.mjs — run from the repo root: node design/brand-marks/derive.mjs
 *
 * Copies the third-party brand marks in this folder into `src/img/`, which is what the build ships.
 * A vector needs no rasterising, so the "derivation" here is a guarded copy: the source is verified to
 * still be the mark we recorded in SOURCES.md before it is allowed into the build, and a provenance
 * comment is prepended so the shipped file says where it came from.
 *
 * No `sharp`, no dependencies. The tool logos in ../tool-logos/ used to be derived here too; that strip
 * is gone from the hero (build-spec §24) and those files are kept on disk for reference only.
 */
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import { fileURLToPath } from 'node:url';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const OUT = path.join(HERE, '..', '..', 'src', 'img');

const MARKS = [
  {
    file: 'google-wordmark.svg',
    sha256: '99bf4aa403643a6d41c028e5db29c79c17cbc815b3e10cd5c6b8f90567a03e52',
    viewBox: '0 0 74 24',
    // Google's four brand colours, in the order the six letters use them.
    fills: ['#4285F4', '#EA4335', '#FBBC05', '#34A853'],
    provenance: 'Google wordmark, fetched 2026-09-25 byte-for-byte from Google\'s own asset host: '
      + 'https://www.gstatic.com/images/branding/googlelogo/svg/googlelogo_clr_74x24px.svg '
      + '— not redrawn. See design/brand-marks/SOURCES.md.',
  },
];

let failed = 0;
for (const m of MARKS) {
  const src = path.join(HERE, m.file);
  const svg = fs.readFileSync(src, 'utf8');
  const sum = crypto.createHash('sha256').update(fs.readFileSync(src)).digest('hex');

  const problems = [];
  if (sum !== m.sha256) problems.push(`sha256 is ${sum}, expected ${m.sha256} — the source changed`);
  if (!svg.includes(`viewBox="${m.viewBox}"`)) problems.push(`viewBox "${m.viewBox}" not found`);
  for (const f of m.fills) if (!svg.includes(f)) problems.push(`brand colour ${f} missing`);

  if (problems.length) {
    failed++;
    console.error(`!! ${m.file}\n   ${problems.join('\n   ')}`);
    continue;
  }

  // Prepend the provenance comment after the XML/svg opening so the shipped asset carries its source.
  const out = svg.replace(/^(<svg)/, `<!-- ${m.provenance} -->\n$1`);
  fs.mkdirSync(OUT, { recursive: true });
  fs.writeFileSync(path.join(OUT, m.file), out);
  console.log(`ok ${m.file} -> src/img/${m.file}  ${out.length} bytes  viewBox ${m.viewBox}`);
}

process.exit(failed ? 1 : 0);
