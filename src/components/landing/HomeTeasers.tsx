import { arrowNudge, focusForest } from './ui';

const base = import.meta.env.BASE_URL;

// Copy is lifted verbatim from the pages these panels point at — no new claims.
const TEASERS = [
  {
    eyebrow: 'Solutions',
    title: (
      <>
        Built for sectors where <em className="text-forest">stakes are real</em>
      </>
    ),
    body: 'Conductor by Eightwire moves sensitive data between health, government and enterprise systems.',
    link: 'Explore solutions',
    href: `${base}solutions/`,
  },
  {
    eyebrow: 'Security & trust',
    title: (
      <>
        Built for the <em className="text-forest">strictest</em> procurement teams in the country
      </>
    ),
    body: 'AES-256 at rest, TLS 1.3 in transit. Multi-layer security architecture with role-based access at every boundary.',
    link: 'Explore security & trust',
    href: `${base}security/`,
  },
];

/** Homepage overview pair — hands off to /solutions/ and /security/. */
export default function HomeTeasers() {
  return (
    <section
      className="border-b border-cream-line py-24 sm:py-28"
      style={{
        background:
          'radial-gradient(ellipse 90% 60% at 90% 30%, rgba(214,237,216,0.55) 0%, transparent 55%), #EDEBE2',
      }}
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid divide-y divide-cream-line lg:grid-cols-2 lg:divide-x lg:divide-y-0">
          {TEASERS.map((t, i) => (
            <article
              key={t.eyebrow}
              className={`reveal reveal-d${i} flex flex-col py-10 first:pt-0 last:pb-0 lg:py-0 lg:first:pr-14 lg:last:pl-14`}
            >
              <p className="self-start border-t border-forest pt-3 font-mono text-caption uppercase tracking-[0.16em] text-forest">
                {t.eyebrow}
              </p>
              <h2 className="mt-6 max-w-md font-display text-[clamp(1.8rem,3vw,2.6rem)] leading-[1.1] tracking-[-0.01em] text-ink [text-wrap:balance]">
                {t.title}
              </h2>
              <p className="mt-5 max-w-md flex-1 text-body-lg leading-[1.75] text-ink-soft">{t.body}</p>
              <a
                href={t.href}
                className={`group mt-8 inline-flex items-center gap-2 text-body-sm font-medium text-forest transition-colors duration-200 hover:text-forest-dark ${focusForest}`}
              >
                {t.link} <span aria-hidden="true" className={arrowNudge}>→</span>
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
