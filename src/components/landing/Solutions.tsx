import SectionHead from './SectionHead';
import { arrowNudge, focusForest } from './ui';

const base = import.meta.env.BASE_URL;

const SOLUTIONS = [
  {
    id: 'health',
    tag: 'For Health',
    title: 'PHO networks, registries & clinical pipelines',
    body: 'From PHO data submissions to clinical registries to GP system integration. Medicly is built on Conductor for NZ health.',
    link: 'Explore Medicly',
    href: `${base}medicly/`,
  },
  {
    id: 'government',
    tag: 'For Government',
    title: 'Inter-agency data sharing, done properly',
    body: 'Move data between agencies with the audit trail, sovereignty and compliance posture your procurement team needs to sign off.',
    link: 'Talk to us about government data',
    href: '#contact',
  },
  {
    id: 'social-sector',
    tag: 'For Social Sector',
    title: 'Outcomes-based reporting & multi-agency data',
    body: 'Aggregate outcomes data across health, social and justice systems. Consent management and privacy controls built in.',
    link: 'Talk to us about social-sector data',
    href: '#contact',
  },
];

interface Props {
  /** hide the section heading when a PageHero already carries it */
  showHead?: boolean;
}

export default function Solutions({ showHead = true }: Props) {
  const H: 'h2' | 'h3' = showHead ? 'h3' : 'h2';
  return (
    <section
      id="solutions"
      className={`border-b border-cream-line ${showHead ? 'py-24 sm:py-28' : 'pb-24 pt-6 sm:pb-28 sm:pt-8'}`}
      style={{
        background:
          'radial-gradient(ellipse 90% 60% at 10% 60%, rgba(129,215,19,0.06) 0%, transparent 55%), #F5F4EE',
      }}
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        {showHead && (
          <SectionHead eyebrow="Solutions">
            Built for sectors where <em className="text-forest">stakes are real</em>
          </SectionHead>
        )}

        <div className={showHead ? 'border-t border-cream-line' : ''}>
          {SOLUTIONS.map((s, i) => (
            <article
              key={s.id}
              id={s.id}
              className={`reveal reveal-d${i % 2} grid gap-5 border-b border-cream-line py-12 scroll-mt-24 last:border-b-0 lg:grid-cols-[0.38fr_1fr] lg:gap-14 lg:py-16`}
            >
              <div>
                <p className="font-mono text-caption uppercase tracking-[0.14em] text-ink-muted">{s.tag}</p>
                <H className="mt-3 max-w-md font-display text-[clamp(1.6rem,2.6vw,2.2rem)] leading-[1.12] tracking-[-0.01em] text-ink [text-wrap:balance]">
                  {s.title}
                </H>
              </div>
              <div className="max-w-2xl">
                <p className="text-body-lg leading-[1.75] text-ink-soft">{s.body}</p>
                <a
                  href={s.href}
                  className={`group mt-7 inline-flex items-center gap-2 text-body-sm font-medium text-forest transition-colors duration-200 hover:text-forest-dark ${focusForest}`}
                >
                  {s.link} <span aria-hidden="true" className={arrowNudge}>→</span>
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
