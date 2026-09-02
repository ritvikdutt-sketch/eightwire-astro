import type { ReactNode } from 'react';
import SectionHead from './SectionHead';

// Icons are resolved by name so .astro frontmatter can pass plain data.
const ICONS = {
  layers: (
    <>
      <path d="M12 2L2 7l10 5 10-5-10-5z" />
      <path d="M2 17l10 5 10-5" />
      <path d="M2 12l10 5 10-5" />
    </>
  ),
  clock: (
    <>
      <circle cx="12" cy="12" r="10" />
      <path d="M12 8v4l3 3" />
    </>
  ),
  shield: <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />,
  check: (
    <>
      <path d="M9 11l3 3L22 4" />
      <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
    </>
  ),
};

export type FeatureIcon = keyof typeof ICONS;

interface Feature {
  title: string;
  body: string;
  icon: FeatureIcon;
}

interface Props {
  eyebrow: string;
  items: Feature[];
  id?: string;
  children: ReactNode; // heading content
}

/** Hairline feature columns — stacked on mobile, 2x2 on sm, 4-up on lg. Every seam is one 1px line. */
export default function FeatureColumns({ eyebrow, items, id, children }: Props) {
  return (
    <section
      id={id}
      className="border-b border-cream-line py-24 sm:py-28"
      style={{
        background:
          'radial-gradient(ellipse 80% 60% at 85% 40%, rgba(214,237,216,0.5) 0%, transparent 55%), #EDEBE2',
      }}
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHead eyebrow={eyebrow}>{children}</SectionHead>

        <div className="grid border-b border-forest/15 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((f, i) => (
            <article
              key={f.title}
              className={`reveal reveal-d${i % 4} border-t border-forest/15 py-8 sm:odd:pr-8 sm:even:border-l sm:even:pl-8 lg:border-l lg:px-8 lg:first:border-l-0 lg:first:pl-0 lg:last:pr-0`}
            >
              <span className="mb-6 flex h-11 w-11 items-center justify-center rounded border border-forest/20 bg-forest/5">
                <svg
                  width="22"
                  height="22"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#145041"
                  strokeWidth="1.75"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  {ICONS[f.icon]}
                </svg>
              </span>
              <h3 className="mb-3 font-display text-2xl text-ink">{f.title}</h3>
              <p className="max-w-sm text-body leading-[1.7] text-ink-soft">{f.body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
