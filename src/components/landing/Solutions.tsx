import SectionHead from './SectionHead';
import { card } from './ui';

const base = import.meta.env.BASE_URL;

const SOLUTIONS = [
  {
    tag: 'For Health',
    title: 'PHO networks, registries & clinical pipelines',
    body: 'From PHO data submissions to clinical registries to GP system integration. Medicly is built on Conductor for NZ health.',
    link: 'Explore Medicly',
    href: `${base}medicly/`,
  },
  {
    tag: 'For Government',
    title: 'Inter-agency data sharing, done properly',
    body: 'Move data between agencies with the audit trail, sovereignty and compliance posture your procurement team needs to sign off.',
    link: 'Talk to us about government data',
    href: '#contact',
  },
  {
    tag: 'For Social Sector',
    title: 'Outcomes-based reporting & multi-agency data',
    body: 'Aggregate outcomes data across health, social and justice systems. Consent management and privacy controls built in.',
    link: 'Talk to us about social-sector data',
    href: '#contact',
  },
];

export default function Solutions() {
  return (
    <section
      id="solutions"
      className="border-b border-cream-line py-24 sm:py-28"
      style={{
        background:
          'radial-gradient(ellipse 90% 60% at 10% 60%, rgba(129,215,19,0.06) 0%, transparent 55%), #F5F4EE',
      }}
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHead eyebrow="04 — Solutions">
          Built for sectors where <em className="text-forest">stakes are real</em>
        </SectionHead>

        <div className="grid gap-5 md:grid-cols-3">
          {SOLUTIONS.map((s, i) => (
            <article
              key={s.tag}
              className={`reveal reveal-d${i} group flex flex-col p-9 md:min-h-[300px] ${card}`}
            >
              <p className="mb-6 font-mono text-caption uppercase tracking-[0.08em] text-ink-muted">{s.tag}</p>
              <h3 className="mb-3 font-display text-h-card leading-snug text-ink">{s.title}</h3>
              <p className="mb-7 flex-1 text-body leading-[1.7] text-ink-soft">{s.body}</p>
              <a
                href={s.href}
                className="inline-flex items-center gap-2 text-body-sm font-medium text-forest transition-[gap] duration-200 hover:gap-3.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-forest"
              >
                {s.link} <span aria-hidden="true">→</span>
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
