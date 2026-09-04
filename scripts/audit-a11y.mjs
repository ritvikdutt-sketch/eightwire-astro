// Accessibility regression check: runs axe-core (WCAG 2.0/2.1 A + AA rules) against every built page.
//
//   npm run build && npm run audit:a11y
//
// Serves dist/ with `astro preview`, injects axe into each page with puppeteer, and writes
// reports/a11y/axe-<date>.json + .md. Exits 1 when any A/AA violation is found.

import { spawn } from 'node:child_process';
import { readdirSync, statSync, mkdirSync, writeFileSync, readFileSync } from 'node:fs';
import { join, relative, sep } from 'node:path';
import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);
const puppeteer = require('puppeteer');
const AXE_PATH = require.resolve('axe-core/axe.min.js');

const ROOT = process.cwd();
const DIST = join(ROOT, 'dist');
const PORT = 4325;
const BASE = `http://127.0.0.1:${PORT}/eightwire-astro/`;
const OUT_DIR = join(ROOT, 'reports', 'a11y');
const STAMP = new Date().toISOString().slice(0, 10);
const SAMPLE_ARTICLES = Number(process.env.AXE_ARTICLES ?? 81); // all KB articles by default

// ---------------------------------------------------------------- routes
const routes = [];
(function walk(dir) {
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    if (statSync(p).isDirectory()) walk(p);
    else if (name === 'index.html' && !/http-equiv="refresh"/i.test(readFileSync(p, 'utf8'))) {
      routes.push(relative(DIST, p).split(sep).slice(0, -1).join('/'));
    }
  }
})(DIST);
const articles = routes.filter((r) => /^knowledge-base\/.+/.test(r)).slice(0, SAMPLE_ARTICLES);
const targets = [...routes.filter((r) => !/^knowledge-base\/.+/.test(r)), ...articles];

// ---------------------------------------------------------------- serve dist
const preview = spawn(process.platform === 'win32' ? 'npx.cmd' : 'npx', ['astro', 'preview', '--port', String(PORT), '--host', '127.0.0.1'], {
  cwd: ROOT,
  stdio: 'ignore',
  shell: process.platform === 'win32',
});
const waitFor = async (url, tries = 60) => {
  for (let i = 0; i < tries; i++) {
    try {
      const r = await fetch(url);
      if (r.ok) return;
    } catch {}
    await new Promise((r) => setTimeout(r, 500));
  }
  throw new Error(`preview server did not start on ${url}`);
};

try {
  await waitFor(BASE);
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 900 });

  const results = [];
  for (const route of targets) {
    const url = `${BASE}${route}${route ? '/' : ''}`;
    await page.goto(url, { waitUntil: 'networkidle0', timeout: 60000 });
    await page.addScriptTag({ path: AXE_PATH });
    const r = await page.evaluate(async () => {
      // @ts-ignore axe is injected
      return await window.axe.run(document, {
        runOnly: { type: 'tag', values: ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'] },
        resultTypes: ['violations', 'incomplete'],
      });
    });
    results.push({
      route: route || '/',
      violations: r.violations.map((v) => ({ id: v.id, impact: v.impact, help: v.help, helpUrl: v.helpUrl, tags: v.tags, nodes: v.nodes.map((n) => ({ target: n.target, html: n.html.slice(0, 200), summary: n.failureSummary })) })),
      incomplete: r.incomplete.map((v) => ({ id: v.id, help: v.help, nodes: v.nodes.length })),
    });
    const count = r.violations.reduce((n, v) => n + v.nodes.length, 0);
    console.log(`${count ? '✗' : '✓'} ${route || '/'} — ${r.violations.length} rule(s), ${count} node(s)${r.incomplete.length ? `, ${r.incomplete.length} needs-review` : ''}`);
  }
  await browser.close();

  mkdirSync(OUT_DIR, { recursive: true });
  writeFileSync(join(OUT_DIR, `axe-${STAMP}.json`), JSON.stringify({ generated: new Date().toISOString(), axe: require('axe-core/package.json').version, pages: results.length, results }, null, 2));

  const byRule = new Map();
  for (const p of results) for (const v of p.violations) {
    const e = byRule.get(v.id) || { id: v.id, impact: v.impact, help: v.help, helpUrl: v.helpUrl, pages: new Set(), nodes: 0 };
    e.pages.add(p.route);
    e.nodes += v.nodes.length;
    byRule.set(v.id, e);
  }
  const totalNodes = [...byRule.values()].reduce((n, e) => n + e.nodes, 0);
  const md = [
    `# axe-core accessibility run — ${STAMP}`,
    '',
    `Rules: WCAG 2.0/2.1 Level A + AA. Pages scanned: ${results.length} (${targets.length - articles.length} section pages, ${articles.length} knowledge-base articles). axe-core ${require('axe-core/package.json').version}.`,
    '',
    totalNodes === 0 ? '**No violations.**' : `**${byRule.size} failing rule(s), ${totalNodes} node(s).**`,
    '',
    ...(byRule.size
      ? ['| Rule | Impact | Nodes | Pages | Help |', '|---|---|---|---|---|', ...[...byRule.values()].map((e) => `| ${e.id} | ${e.impact} | ${e.nodes} | ${e.pages.size} | [${e.help}](${e.helpUrl}) |`)]
      : []),
    '',
  ].join('\n');
  writeFileSync(join(OUT_DIR, `axe-${STAMP}.md`), md);
  console.log(`\n${totalNodes === 0 ? 'PASS' : 'FAIL'}: ${byRule.size} rule(s), ${totalNodes} node(s) → reports/a11y/axe-${STAMP}.{json,md}`);
  process.exitCode = totalNodes === 0 ? 0 : 1;
} finally {
  preview.kill();
}
