import { useEffect, useMemo, useState } from 'react';
import { arrowNudge, focusForest } from '../landing/ui';

export interface KbArticle {
  slug: string;
  title: string;
  description: string;
  category: string;
  order: number;
}

interface Props {
  articles: KbArticle[];
  /** categories in curated order */
  categories: string[];
  base: string;
  supportEmail: string;
}

const norm = (s: string) => s.toLowerCase().normalize('NFKD');

/**
 * Searchable, filterable index of the knowledge base. Server-rendered with the full list,
 * so the page is complete before hydration; the island only narrows it.
 */
export default function KbBrowser({ articles, categories, base, supportEmail }: Props) {
  const [query, setQuery] = useState('');
  const [topic, setTopic] = useState('');

  // Deep links from article breadcrumbs: /knowledge-base/?topic=Install%20an%20Agent
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const t = params.get('topic');
    if (t && categories.includes(t)) setTopic(t);
    const q = params.get('q');
    if (q) setQuery(q);
  }, [categories]);

  const results = useMemo(() => {
    const q = norm(query.trim());
    return articles.filter((a) => {
      if (topic && a.category !== topic) return false;
      if (!q) return true;
      return norm(`${a.title} ${a.description} ${a.category}`).includes(q);
    });
  }, [articles, query, topic]);

  const grouped = categories
    .map((c) => ({ category: c, items: results.filter((a) => a.category === c) }))
    .filter((g) => g.items.length > 0);

  const chip = (label: string, value: string) => {
    const pressed = topic === value;
    return (
      <button
        key={value || 'all'}
        type="button"
        aria-pressed={pressed}
        onClick={() => setTopic(pressed && value ? '' : value)}
        className={`rounded-sm border px-3 py-1.5 font-mono text-caption uppercase tracking-[0.1em] transition-colors duration-200 ${
          pressed
            ? 'border-forest bg-forest text-cream'
            : 'border-cream-line bg-white text-ink-soft hover:border-forest/40 hover:text-forest'
        } ${focusForest}`}
      >
        {label}
      </button>
    );
  };

  return (
    <div>
      {/* Search + topics */}
      <div className="grid gap-8 lg:grid-cols-[0.38fr_1fr] lg:gap-14">
        <div>
          <label htmlFor="kb-search" className="block border-t border-forest pt-3 font-mono text-caption uppercase tracking-[0.16em] text-forest">
            Search
          </label>
          <input
            id="kb-search"
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search the knowledge base"
            autoComplete="off"
            className={`mt-4 w-full rounded-sm border border-cream-line bg-white px-4 py-3 text-body text-ink placeholder:text-ink-muted ${focusForest} focus-visible:outline-offset-2`}
          />
          <p className="mt-3 font-mono text-caption text-ink-muted" role="status" aria-live="polite">
            {results.length === articles.length
              ? `${articles.length} articles · ${categories.length} topics`
              : `${results.length} of ${articles.length} articles`}
          </p>
        </div>
        <div>
          <p className="border-t border-cream-line pt-3 font-mono text-caption uppercase tracking-[0.16em] text-ink-muted">Topics</p>
          <div className="mt-4 flex flex-wrap gap-2">
            {chip('All', '')}
            {categories.map((c) => chip(c, c))}
          </div>
        </div>
      </div>

      {/* Results */}
      <div className="mt-16 border-t border-cream-line">
        {grouped.map((g) => (
          <section key={g.category} className="grid gap-4 border-b border-cream-line py-10 lg:grid-cols-[0.38fr_1fr] lg:gap-14 lg:py-12">
            <h2 className="self-start font-mono text-caption uppercase tracking-[0.14em] text-ink-muted">
              {g.category}
              <span className="ml-2 text-ink-muted/60">{g.items.length}</span>
            </h2>
            <ul className="-mt-2" role="list">
              {g.items.map((a) => (
                <li key={a.slug} className="border-b border-cream-line/70 last:border-b-0">
                  <a
                    href={`${base}knowledge-base/${a.slug}/`}
                    className={`group grid gap-1 rounded-sm py-4 sm:grid-cols-[1fr_auto] sm:items-baseline sm:gap-6 ${focusForest}`}
                  >
                    <span>
                      <span className="block font-display text-xl leading-[1.25] text-ink transition-colors duration-200 group-hover:text-forest">
                        {a.title}
                      </span>
                      {a.description && (
                        <span className="mt-1 block max-w-2xl text-body-sm leading-[1.6] text-ink-soft line-clamp-2">
                          {a.description}
                        </span>
                      )}
                    </span>
                    <span aria-hidden="true" className={`hidden font-mono text-forest sm:block ${arrowNudge}`}>→</span>
                  </a>
                </li>
              ))}
            </ul>
          </section>
        ))}

        {grouped.length === 0 && (
          <div className="grid gap-4 py-16 lg:grid-cols-[0.38fr_1fr] lg:gap-14">
            <p className="font-mono text-caption uppercase tracking-[0.14em] text-ink-muted">No matches</p>
            <div>
              <p className="font-display text-2xl text-ink">Nothing here for &ldquo;{query}&rdquo;{topic ? ` in ${topic}` : ''}.</p>
              <p className="mt-3 max-w-xl text-body-lg leading-[1.7] text-ink-soft">
                Try a different word, clear the topic filter, or email{' '}
                <a href={`mailto:${supportEmail}`} className={`font-medium text-forest underline decoration-forest/30 underline-offset-4 ${focusForest}`}>
                  {supportEmail}
                </a>{' '}
                and we&rsquo;ll point you to the right guide.
              </p>
              <button
                type="button"
                onClick={() => { setQuery(''); setTopic(''); }}
                className={`group mt-6 inline-flex items-center gap-2 text-body-sm font-medium text-forest transition-colors duration-200 hover:text-forest-dark ${focusForest}`}
              >
                Show all articles <span aria-hidden="true" className={arrowNudge}>→</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
