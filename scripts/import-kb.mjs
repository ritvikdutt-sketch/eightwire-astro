// Imports the Eightwire knowledge base from the old Webflow site into src/content/kb.
// Re-runnable: wipes and rebuilds src/content/kb (articles + downloaded images).
//
//   node scripts/import-kb.mjs
//
// Source structure (Webflow CMS, uniform across articles):
//   .section-banner .nested-tags        category
//   h1.wikie-header                     title
//   p.blog-desc                         summary
//   .rich-text-block.w-richtext         body (h3/p/ol/ul/blockquote/figure>img/iframe/table)
// Index pages (?51c9e10d_page=N) give the curated article order.

import { load } from 'cheerio';
import TurndownService from 'turndown';
import { gfm } from 'turndown-plugin-gfm';
import sharp from 'sharp';
import { mkdir, writeFile, rm } from 'node:fs/promises';
import path from 'node:path';

const ORIGIN = 'https://www.eightwire.io';
const OUT = path.resolve('src/content/kb');
const IMG_DIR = path.join(OUT, 'images');
const MAX_IMAGE_WIDTH = 1600;
const PAGE_PARAM = '51c9e10d_page';

// Whitepaper PDFs already copied into public/whitepapers/ (Part 5).
const PDFS = new Map([
  ['652dec61713291bc3d28fb24_Eightwire%20security%20whitepaper.pdf', 'eightwire-security-whitepaper.pdf'],
  ['653627ce8dd72174527d02b1_Eightwire%20Technical%20Whitepaper.pdf', 'eightwire-technical-whitepaper.pdf'],
]);

const EXT_BY_TYPE = {
  'image/png': 'png',
  'image/jpeg': 'jpg',
  'image/webp': 'webp',
  'image/gif': 'gif',
  'image/svg+xml': 'svg',
  'image/avif': 'avif',
};

const report = { articles: 0, images: 0, imageBytes: 0, embeds: 0, tablesKeptRaw: 0, unresolvedLinks: [], notInIndex: [], warnings: [] };

async function fetchOk(url, init) {
  const res = await fetch(url, { headers: { 'user-agent': 'Mozilla/5.0 (eightwire-kb-import)' }, ...init });
  if (!res.ok) throw new Error(`${res.status} ${res.statusText} — ${url}`);
  return res;
}
const fetchText = async (url) => (await fetchOk(url)).text();

async function mapLimit(items, limit, fn) {
  const out = new Array(items.length);
  let next = 0;
  await Promise.all(
    Array.from({ length: Math.min(limit, items.length) }, async () => {
      while (next < items.length) {
        const i = next++;
        out[i] = await fn(items[i], i);
      }
    }),
  );
  return out;
}

const collapse = (s) => s.replace(/[‍ ]/g, ' ').replace(/\s+/g, ' ').trim();
const yaml = (v) => JSON.stringify(v); // JSON strings are valid YAML double-quoted scalars
// One public address everywhere on the new site (support@ replaces the old heya@ inbox and
// the old-domain / odd-case variants that appear in article bodies).
const oneAddress = (s) =>
  s
    .replace(/heya@eight-?wire\.(?:com|io)/gi, 'support@eight-wire.com')
    .replace(/support@eight-?wire\.(?:com|io)/gi, 'support@eight-wire.com');

// ---------------------------------------------------------------- 1. slugs
const sitemap = await fetchText(`${ORIGIN}/sitemap.xml`);
const slugs = [...sitemap.matchAll(/<loc>https:\/\/www\.eightwire\.io\/knowledge-base\/([^<]+)<\/loc>/g)].map((m) => m[1]);
const slugSet = new Set(slugs);
for (const s of slugs) {
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(s)) throw new Error(`Slug is not URL-safe as-is: ${s}`);
}
console.log(`sitemap: ${slugs.length} knowledge-base articles`);

// ---------------------------------------------------------------- 2. curated order from the index
const order = new Map();
for (let page = 1; page <= 40; page++) {
  const $ = load(await fetchText(`${ORIGIN}/knowledge-base?${PAGE_PARAM}=${page}`));
  const links = $('.knowledge-base-list .w-dyn-item a.learn-more');
  if (!links.length) break;
  links.each((_, a) => {
    const slug = ($(a).attr('href') || '').split('/').filter(Boolean).pop();
    if (slug && !order.has(slug)) order.set(slug, order.size);
  });
  if (!$('a.w-pagination-next').length) break;
}
console.log(`index: ${order.size} articles in curated order`);
for (const s of slugs) {
  if (!order.has(s)) {
    report.notInIndex.push(s);
    order.set(s, order.size);
  }
}

// ---------------------------------------------------------------- 3. converter
const turndown = new TurndownService({
  headingStyle: 'atx',
  codeBlockStyle: 'fenced',
  bulletListMarker: '-',
  emDelimiter: '*',
  strongDelimiter: '**',
});
turndown.use(gfm);
// Video embeds stay as HTML (Astro renders raw HTML in Markdown).
turndown.keep((node) => node.nodeName === 'DIV' && node.getAttribute('class') === 'kb-embed');
// Literal angle brackets in prose ("Data Source=<data source>") would otherwise be parsed as
// HTML tags by the Markdown renderer and vanish — backslash-escape them like other punctuation.
const escapeText = turndown.escape.bind(turndown);
turndown.escape = (s) => escapeText(s).replace(/</g, '\\<');

const imageFiles = new Map(); // remote URL → local file name (shared across articles)

async function downloadImage(url, slug, n) {
  if (imageFiles.has(url)) return imageFiles.get(url);
  const res = await fetchOk(url);
  const type = (res.headers.get('content-type') || '').split(';')[0].trim();
  const ext = EXT_BY_TYPE[type];
  if (!ext) throw new Error(`Unsupported image type ${type} — ${url}`);
  let buf = Buffer.from(await res.arrayBuffer());
  let outExt = ext;
  if (ext === 'png' || ext === 'jpg' || ext === 'webp' || ext === 'avif') {
    // Screenshots arrive as 1–3 MB PNGs. Store them as capped-width WebP so the repo stays
    // small; Astro's image pipeline re-encodes to WebP at build time anyway.
    buf = await sharp(buf)
      .resize({ width: MAX_IMAGE_WIDTH, withoutEnlargement: true })
      .webp({ quality: 88 })
      .toBuffer();
    outExt = 'webp';
  }
  const file = `${slug}-${n}.${outExt}`;
  await writeFile(path.join(IMG_DIR, file), buf);
  imageFiles.set(url, file);
  report.images += 1;
  report.imageBytes += buf.length;
  return file;
}

function rewriteHref(href, slug) {
  if (!href) return null;
  if (href.startsWith('../') || href.startsWith('./') || href.startsWith('#')) return href; // already ours
  let url;
  try {
    url = new URL(href, ORIGIN);
  } catch {
    return href;
  }
  if (url.hostname === 'cdn.prod.website-files.com') {
    const file = url.pathname.split('/').pop();
    if (PDFS.has(file)) return `../../whitepapers/${PDFS.get(file)}`;
    return href;
  }
  if (url.hostname === 'wiki.eight-wire.com') {
    // Legacy wiki host: article slugs map 1:1 to the knowledge base; hashed ids are dead links.
    const slugPart = url.pathname.split('/').filter(Boolean)[0];
    if (slugPart && slugSet.has(slugPart)) return `../${slugPart}/${url.hash}`;
    return null; // caller unlinks
  }
  if (url.hostname !== 'www.eightwire.io' && url.hostname !== 'eightwire.io') return href;
  const parts = url.pathname.split('/').filter(Boolean);
  if ((parts[0] === 'wiki' || parts[0] === 'knowledge-base') && parts[1]) {
    if (slugSet.has(parts[1])) return `../${parts[1]}/${url.hash}`;
    report.unresolvedLinks.push({ slug, href });
    return href;
  }
  if (parts.length === 0) return '../../';
  if (parts[0] === 'knowledge-base') return '../';
  return `../../${parts.join('/')}/${url.hash}`;
}

async function convertArticle(slug) {
  const url = `${ORIGIN}/knowledge-base/${slug}`;
  const $ = load(await fetchText(url));

  const category = collapse($('.section-banner .nested-tags').first().text()) || 'Articles';
  const title = collapse($('h1.wikie-header').first().text());
  const description = oneAddress(collapse($('p.blog-desc').first().text()));
  const body = $('.rich-text-block.w-richtext').first();
  if (!title || !body.length) throw new Error(`Unexpected article structure — ${url}`);

  // Filler paragraphs Webflow leaves behind (zero-width joiner / lone <br>).
  body.find('p').each((_, p) => {
    const $p = $(p);
    if (collapse($p.text()) === '' && !$p.find('img, iframe').length) $p.remove();
  });

  // Heading levels: bodies start at h3 on the old site; here they sit under the page h1.
  for (const [from, to] of [['h2', 'h2'], ['h3', 'h2'], ['h4', 'h3'], ['h5', 'h4'], ['h6', 'h5']]) {
    body.find(from).each((_, h) => {
      if (from !== to) h.tagName = to;
    });
  }

  // Embedded PDF viewers (Google Docs viewer around a Webflow upload) → a download link to our copy.
  body.find('iframe').each((_, f) => {
    const $f = $(f);
    const src = $f.attr('src') || '';
    if (!/viewer\?url=/.test(src)) return;
    const inner = decodeURIComponent(new URL(src).searchParams.get('url') || '');
    const file = [...PDFS.keys()].find((k) => decodeURIComponent(inner).endsWith(decodeURIComponent(k)));
    const fig = $f.closest('figure');
    if (!file) {
      report.warnings.push(`${slug}: unknown embedded document ${inner}`);
      (fig.length ? fig : $f).remove();
      return;
    }
    const label = PDFS.get(file).includes('security') ? 'security whitepaper' : 'technical whitepaper';
    (fig.length ? fig : $f).replaceWith(`<p><a href="../../whitepapers/${PDFS.get(file)}">Download the ${label} (PDF)</a></p>`);
  });

  // Video embeds → bare iframe in a known wrapper (drops Webflow's absolute positioning).
  body.find('iframe').each((_, f) => {
    const $f = $(f);
    const src = $f.attr('src');
    const t = $f.attr('title') || 'Video';
    const wrapper = `<div class="kb-embed"><iframe src="${src}" title="${t.replace(/"/g, '&quot;')}" loading="lazy" allowfullscreen></iframe></div>`;
    const fig = $f.closest('figure');
    (fig.length ? fig : $f).replaceWith(wrapper);
    report.embeds += 1;
  });

  body.find('table').each((_, t) => {
    if (!$(t).find('th').length) report.tablesKeptRaw += 1;
  });

  // Images → local files next to the article.
  let n = 0;
  const imgs = body.find('img').toArray();
  for (const img of imgs) {
    const $img = $(img);
    const src = $img.attr('src');
    if (!src) {
      $img.remove();
      continue;
    }
    n += 1;
    const file = await downloadImage(new URL(src, ORIGIN).href, slug, n);
    $img.attr('src', `./images/${file}`);
    const alt = collapse($img.attr('alt') || '');
    $img.attr('alt', alt === '' || alt.toLowerCase() === 'image' ? 'Screenshot' : alt);
    $img.removeAttr('loading srcset sizes width height');
    const fig = $img.closest('figure');
    if (fig.length) fig.replaceWith($('<p></p>').append($img));
  }

  // Links → relative, base-agnostic paths; drop empty anchors left over from the old wiki.
  body.find('a').each((_, a) => {
    const $a = $(a);
    const href = $a.attr('href') || '';
    if (collapse($a.text()) === '' && !$a.find('img').length) {
      $a.replaceWith($a.text()); // keep the whitespace so neighbouring words stay separated
      return;
    }
    // Webflow auto-linked fragments like "com|co.nz" into bogus URLs — keep the words, drop the link.
    if (/%7C|\|/.test(href) || /^https?:\/\/[^./]+\/?$/.test(href)) {
      report.warnings.push(`${slug}: unlinked bogus href ${href}`);
      $a.replaceWith($a.text());
      return;
    }
    const next = rewriteHref($a.attr('href'), slug);
    if (next === null && href) {
      report.warnings.push(`${slug}: unlinked dead legacy href ${href}`);
      $a.replaceWith($a.text());
      return;
    }
    if (next) $a.attr('href', next);
    $a.removeAttr('target rel');
  });

  let markdown = oneAddress(
    turndown
      .turndown(body.html() || '')
      // Webflow splits one bold run into adjacent <strong> fragments; "**a****b**" cannot pair in
      // CommonMark, so join the fragments back into a single run.
      .replace(/(\S)\*\*\*\*(\S)/g, '$1$2')
      .replace(/\n{3,}/g, '\n\n')
      .trim(),
  );

  // The two whitepaper articles say "see attached" — make sure each actually links our copy.
  const WHITEPAPER_ARTICLES = {
    'security-white-paper': ['security whitepaper', 'eightwire-security-whitepaper.pdf'],
    'technical-whitepaper': ['technical whitepaper', 'eightwire-technical-whitepaper.pdf'],
  };
  if (WHITEPAPER_ARTICLES[slug] && !markdown.includes('whitepapers/')) {
    const [label, file] = WHITEPAPER_ARTICLES[slug];
    markdown += `\n\n[Download the ${label} (PDF)](../../whitepapers/${file})`;
  }

  const fm = [
    '---',
    `title: ${yaml(title)}`,
    `description: ${yaml(description)}`,
    `category: ${yaml(category)}`,
    `order: ${order.get(slug)}`,
    `sourceUrl: ${yaml(url)}`,
    '---',
  ].join('\n');

  await writeFile(path.join(OUT, `${slug}.md`), `${fm}\n\n${markdown}\n`);
  report.articles += 1;
  return { slug, title, category, images: n };
}

// ---------------------------------------------------------------- 4. run
await rm(OUT, { recursive: true, force: true });
await mkdir(IMG_DIR, { recursive: true });

const results = await mapLimit(slugs, 4, async (slug) => {
  try {
    const r = await convertArticle(slug);
    console.log(`✓ ${r.category} — ${r.title} (${r.images} img)`);
    return r;
  } catch (err) {
    report.warnings.push(`${slug}: ${err.message}`);
    console.error(`✗ ${slug}: ${err.message}`);
    return null;
  }
});

const categories = new Map();
for (const r of results.filter(Boolean)) categories.set(r.category, (categories.get(r.category) || 0) + 1);

console.log('\n==== import report ====');
console.log(`articles: ${report.articles}/${slugs.length}`);
console.log(`images: ${report.images} (${(report.imageBytes / 1024 / 1024).toFixed(1)} MB), embeds: ${report.embeds}, header-less tables kept as HTML: ${report.tablesKeptRaw}`);
console.log(`categories (${categories.size}):`, Object.fromEntries([...categories.entries()]));
if (report.notInIndex.length) console.log('not in curated index (appended):', report.notInIndex);
if (report.unresolvedLinks.length) console.log('unresolved internal links:', report.unresolvedLinks);
if (report.warnings.length) console.log('warnings:', report.warnings);
await writeFile(path.join('scripts', 'kb-import-report.json'), JSON.stringify({ ...report, categories: Object.fromEntries(categories) }, null, 2));
if (report.warnings.length) process.exitCode = 1;
