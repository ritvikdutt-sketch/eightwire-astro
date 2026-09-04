// Build guard: fails `npm run build` (via postbuild) if retired or forbidden content reaches dist/.
//   - product/sector names the business asked to remove (Surely, Banex, insurers)
//   - the old inbox and domain (heya@, eightwire.io), the old street address
//   - the placeholder alt text the knowledge-base import used to emit
// Scans every HTML, Markdown and llms*.txt file; never touches the whitepaper PDFs.

import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join, relative } from 'node:path';

const DIST = join(process.cwd(), 'dist');

const RULES = [
  { name: 'Surely (product)', re: /\bSurely\b/ },
  { name: 'Banex (product)', re: /\bBanex\b/i },
  { name: 'insurers', re: /\binsurers?\b/i },
  { name: 'old inbox heya@', re: /heya@/i },
  { name: 'old domain eightwire.io', re: /eightwire\.io/i },
  { name: 'old street address', re: /Taranaki/i },
  { name: 'placeholder alt "Screenshot"', re: /alt="Screenshot"|!\[Screenshot\]/ },
];

const files = [];
(function walk(dir) {
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    if (statSync(p).isDirectory()) walk(p);
    else if (/\.(html|md|txt)$/i.test(name)) files.push(p);
  }
})(DIST);

const hits = [];
for (const file of files) {
  const text = readFileSync(file, 'utf8');
  for (const rule of RULES) {
    const m = text.match(rule.re);
    if (m) {
      const at = m.index ?? 0;
      hits.push({ file: relative(DIST, file), rule: rule.name, context: text.slice(Math.max(0, at - 60), at + 60).replace(/\s+/g, ' ') });
    }
  }
}

if (hits.length) {
  console.error(`check-content: ${hits.length} forbidden mention(s) in dist/`);
  for (const h of hits) console.error(`  ${h.file} — ${h.rule}\n    …${h.context}…`);
  process.exit(1);
}
console.log(`check-content: ${files.length} files clean`);
