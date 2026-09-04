// Post-build: publish a Markdown twin of every page for AI agents, plus llms.txt / llms-full.txt
// (https://llmstxt.org/). Runs from `npm run build` via the postbuild script.
//
//   dist/<route>/index.md      one per page (marketing pages converted from the built HTML,
//                              knowledge-base articles copied from their Markdown source)
//   dist/llms.txt              index: site summary + links to every twin
//   dist/llms-full.txt         every twin concatenated
//
// GitHub Pages serves .md as text/markdown, and LandingLayout links each twin with
// <link rel="alternate" type="text/markdown">.

import { load } from 'cheerio';
import TurndownService from 'turndown';
import { gfm } from 'turndown-plugin-gfm';
import { readdirSync, readFileSync, statSync, writeFileSync, existsSync } from 'node:fs';
import { join, relative, sep } from 'node:path';

const ROOT = process.cwd();
const DIST = join(ROOT, 'dist');
const KB_SRC = join(ROOT, 'src', 'content', 'kb');
const SITE = 'https://ritvikdutt-sketch.github.io/eightwire-astro';
const BASE = '/eightwire-astro/';
const TODAY = new Date().toISOString().slice(0, 10);

// The one-paragraph summary llms.txt opens with — the team's own Conductor description.
const SUMMARY =
  'Eightwire is a Wellington, New Zealand company. Conductor, its data exchange platform, is a data management tool unlike any other: it makes data integration simple, automating the majority of the effort, massively reducing costs and fixing data errors as it goes. It integrates with all major data storage platforms, and data is encrypted from source to destination.';

const PAGE_ORDER = ['', 'conductor', 'medicly', 'connectors', 'security', 'company', 'technical-overview', 'faq', 'contact-us', 'knowledge-base'];

// ---------------------------------------------------------------- discover routes
const htmlFiles = [];
(function walk(dir) {
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    if (statSync(p).isDirectory()) walk(p);
    else if (name === 'index.html') htmlFiles.push(p);
  }
})(DIST);

const routeOf = (file) => relative(DIST, file).split(sep).slice(0, -1).join('/'); // '' | 'company' | 'knowledge-base/slug'
const isStub = (html) => /http-equiv="refresh"/i.test(html);

const pages = htmlFiles
  .map((file) => ({ file, route: routeOf(file), html: readFileSync(file, 'utf8') }))
  .filter((p) => !isStub(p.html));

const twinRoutes = new Set(pages.map((p) => p.route));
const htmlUrl = (route) => `${SITE}/${route}${route ? '/' : ''}`;
const mdUrl = (route) => `${htmlUrl(route)}index.md`;

/** Turn a site-internal href into the Markdown twin when one exists, else the canonical HTML URL. */
function resolveInternal(href) {
  if (!href) return href;
  if (/^(https?:|mailto:|tel:|#)/i.test(href)) return href;
  let path = href.startsWith(BASE) ? href.slice(BASE.length) : href.replace(/^\/+/, '');
  const [pathOnly, hash = ''] = path.split('#');
  const clean = pathOnly.replace(/\/+$/, '');
  if (/\.[a-z0-9]{2,5}$/i.test(clean)) return `${SITE}/${clean}`; // files: pdf, svg, images…
  if (twinRoutes.has(clean)) return mdUrl(clean) + (hash ? `#${hash}` : '');
  return htmlUrl(clean) + (hash ? `#${hash}` : '');
}

// ---------------------------------------------------------------- converters
const turndown = new TurndownService({ headingStyle: 'atx', bulletListMarker: '-', codeBlockStyle: 'fenced', emDelimiter: '*' });
turndown.use(gfm);

const frontMatter = (fields) =>
  ['---', ...Object.entries(fields).filter(([, v]) => v !== undefined && v !== '').map(([k, v]) => `${k}: ${JSON.stringify(v)}`), '---'].join('\n');

function convertMarketing(page) {
  const $ = load(page.html);
  const title = $('title').first().text().trim();
  const description = $('meta[name="description"]').attr('content') || '';
  const main = $('main').first();

  // chrome and decoration that carries nothing for a reader of plain text
  main.find('nav, aside, script, style, svg, template, button, input, [aria-hidden="true"], .sr-only, #contact').remove();

  // FAQ: the question is the heading, the answer follows
  main.find('summary').each((_, el) => { $(el).replaceWith(`<h3>${$(el).text().trim()}</h3>`); });
  main.find('details').each((_, el) => { $(el).replaceWith($(el).html()); });

  // emphasised words inside headings are typographic, not semantic
  main.find('h1 em, h2 em, h3 em').each((_, el) => { $(el).replaceWith($(el).text()); });

  // stats: value + label on one line
  main.find('.tabular-nums').each((_, el) => {
    const $v = $(el);
    const label = $v.next('p').text().trim();
    $v.parent().replaceWith(`<p><strong>${$v.text().trim()}</strong> ${label}</p>`);
  });

  // connector catalogue tiles: "**Name** — kind"
  main.find('#catalogue li').each((_, el) => {
    const spans = $(el).find('span.block');
    if (spans.length >= 2) $(el).html(`<strong>${$(spans[0]).text().trim()}</strong> — ${$(spans[1]).text().trim()}`);
  });

  // knowledge-base hub: "Category (7 articles)"
  if (page.route === 'knowledge-base') {
    main.find('h2 > span').each((_, el) => { $(el).replaceWith(` (${$(el).text().trim()} articles)`); });
  }

  main.find('a[href]').each((_, el) => { $(el).attr('href', resolveInternal($(el).attr('href'))); });
  main.find('img').each((_, el) => {
    const $img = $(el);
    if (!($img.attr('alt') || '').trim()) { $img.remove(); return; }
    const src = $img.attr('src') || '';
    if (src.startsWith('/')) $img.attr('src', `${SITE}${src.replace(/^\/eightwire-astro/, '')}`);
    $img.removeAttr('srcset sizes loading decoding width height');
  });

  let md = turndown.turndown(main.html() || '');
  md = md
    .replace(/\]\(([^)\s]+)\)\[(?!\!)/g, ']($1) · [') // adjacent links on one line
    .replace(/[ \t]+\n/g, '\n')
    .replace(/\n{3,}/g, '\n\n')
    .trim();

  return { route: page.route, title, description, body: md, category: undefined, order: undefined };
}

// Our own frontmatter is JSON-quoted scalars, one per line. Source files are checked out with
// CRLF on Windows, so normalise before matching.
function parseFrontMatter(raw) {
  const text = raw.replace(/\r\n/g, '\n');
  const m = text.match(/^---\n([\s\S]*?)\n---\n?/);
  if (!m) return { data: {}, body: text };
  const data = {};
  for (const line of m[1].split('\n')) {
    const i = line.indexOf(':');
    if (i < 0) continue;
    const key = line.slice(0, i).trim();
    const raw = line.slice(i + 1).trim();
    try { data[key] = JSON.parse(raw); } catch { data[key] = raw; }
  }
  return { data, body: text.slice(m[0].length) };
}

function convertKbArticle(page) {
  const slug = page.route.split('/')[1];
  const srcPath = join(KB_SRC, `${slug}.md`);
  if (!existsSync(srcPath)) return convertMarketing(page);
  const { data, body } = parseFrontMatter(readFileSync(srcPath, 'utf8'));
  const $ = load(page.html);
  const title = data.title || $('h1').first().text().trim();

  // built image URLs, keyed by the source file stem (install-an-agent-1 → /_astro/install-an-agent-1.HASH.webp)
  const imageUrl = new Map();
  $('main img[src]').each((_, el) => {
    const src = $(el).attr('src') || '';
    const file = src.split('/').pop() || '';
    const stem = file.split('.')[0];
    if (stem) imageUrl.set(stem, `${SITE}${src.replace(/^\/eightwire-astro/, '')}`);
  });

  let md = body
    // images → absolute built URLs
    .replace(/!\[([^\]]*)\]\(\.\/images\/([^)]+)\)/g, (_, alt, file) => {
      const stem = file.split('.')[0];
      return `![${alt}](${imageUrl.get(stem) || `${SITE}/knowledge-base/${slug}/images/${file}`})`;
    })
    // video embeds → links
    .replace(/<div class="kb-embed"><iframe src="([^"]+)" title="([^"]*)"[^>]*><\/iframe><\/div>/g, (_, src, t) => {
      const watch = src.replace(/https:\/\/www\.youtube\.com\/embed\/([^?&]+).*/, 'https://www.youtube.com/watch?v=$1');
      return `[Video: ${t || 'YouTube'}](${watch})`;
    })
    // relative links → absolute twins
    .replace(/\]\(\.\.\/\.\.\/whitepapers\/([^)]+)\)/g, `](${SITE}/whitepapers/$1)`)
    .replace(/\]\(\.\.\/\.\.\/([^)#]*?)\/?(#[^)]*)?\)/g, (_, route, hash = '') => `](${route === '' ? mdUrl('') : resolveInternal(`${BASE}${route}/`)}${hash})`)
    .replace(/\]\(\.\.\/([^)/#]+)\/?(#[^)]*)?\)/g, (_, s, hash = '') => `](${mdUrl(`knowledge-base/${s}`)}${hash})`)
    .replace(/\]\(\.\.\/\)/g, `](${mdUrl('knowledge-base')})`)
    .trim();

  return { route: page.route, title, description: data.description || '', body: md, category: data.category, order: data.order };
}

// ---------------------------------------------------------------- emit twins
const twins = [];
for (const page of pages) {
  const isArticle = /^knowledge-base\/[^/]+$/.test(page.route);
  const twin = isArticle ? convertKbArticle(page) : convertMarketing(page);
  // No sourceUrl here: the old Webflow site is retired, and these files are public.
  // Marketing pages already open with their own h1, so only add one when the body lacks it.
  const hasH1 = /^#\s/m.test(twin.body.split('\n').slice(0, 12).join('\n'));
  const doc = [
    frontMatter({ title: twin.title, description: twin.description, url: htmlUrl(twin.route), category: twin.category, generated: TODAY }),
    '',
    hasH1 ? '' : `# ${twin.title}\n`,
    twin.description ? `> ${twin.description}\n` : '',
    twin.body,
    '',
  ].filter((s) => s !== '').join('\n');
  writeFileSync(join(DIST, ...twin.route.split('/').filter(Boolean), 'index.md'), doc);
  twins.push({ ...twin, doc });
}

// ---------------------------------------------------------------- llms.txt
const marketing = PAGE_ORDER.map((r) => twins.find((t) => t.route === r)).filter(Boolean);
const articles = twins.filter((t) => /^knowledge-base\/[^/]+$/.test(t.route)).sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
const categories = [...new Set(articles.map((a) => a.category))];

// "Conductor — Eightwire" reads as "Conductor" in a list that is already all Eightwire.
const shortTitle = (t) => t.replace(/\s+[—-]\s+Eightwire$/, '').trim();
const line = (t) => `- [${shortTitle(t.title)}](${mdUrl(t.route)})${t.description ? `: ${t.description.replace(/\s+/g, ' ').trim()}` : ''}`;

const llms = [
  '# Eightwire',
  '',
  `> ${SUMMARY}`,
  '',
  `Markdown versions of every page on the Eightwire website, generated from the published site on ${TODAY}. The HTML page for any entry is the same URL without \`index.md\`. Contact: support@eight-wire.com.`,
  '',
  '## Pages',
  '',
  ...marketing.map(line),
  '',
  '## Knowledge base',
  '',
  ...categories.flatMap((c) => [`### ${c}`, '', ...articles.filter((a) => a.category === c).map(line), '']),
  '## Optional',
  '',
  `- [Security whitepaper (PDF)](${SITE}/whitepapers/eightwire-security-whitepaper.pdf)`,
  `- [Technical whitepaper (PDF)](${SITE}/whitepapers/eightwire-technical-whitepaper.pdf)`,
  '- [Sign in to Conductor](https://conductor.eight-wire.com)',
  '- [Eightwire on LinkedIn](https://www.linkedin.com/company/eight-wire-limited/)',
  '',
].join('\n');
writeFileSync(join(DIST, 'llms.txt'), llms);

const full = [llms, ...marketing.map((t) => t.doc), ...articles.map((t) => t.doc)].join('\n\n---\n\n');
writeFileSync(join(DIST, 'llms-full.txt'), full);

console.log(`emit-markdown: ${twins.length} twins (${marketing.length} pages, ${articles.length} articles in ${categories.length} topics); llms.txt ${(llms.length / 1024).toFixed(1)} KB, llms-full.txt ${(full.length / 1024).toFixed(0)} KB`);
