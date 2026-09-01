import SectionHead from './SectionHead';
import { card } from './ui';

const PROBLEMS = [
  {
    num: '/ 01',
    title: 'Manual handling that doesn’t scale',
    body: 'Critical data still moves by email, USB and ad-hoc SFTP. Every transfer is a privacy incident waiting to happen.',
  },
  {
    num: '/ 02',
    title: 'Custom integrations that break',
    body: 'Bespoke pipelines take months to ship, cost a fortune to maintain, and fall over the moment a system upstream changes.',
  },
  {
    num: '/ 03',
    title: 'Sovereignty and compliance overhead',
    body: 'Privacy Act 2020, NZISM, sector frameworks. Most platforms aren’t built for Aotearoa’s rules. We are.',
  },
];

export default function Problem() {
  return (
    <section
      className="border-b border-cream-line py-24 sm:py-28"
      style={{
        background:
          'radial-gradient(ellipse 80% 60% at 15% 40%, rgba(129,215,19,0.06) 0%, transparent 60%), #F5F4EE',
      }}
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHead eyebrow="01 — The problem">
          Data sharing in NZ is <em className="text-forest">harder than it should be</em>
        </SectionHead>

        <div className="grid gap-5 md:grid-cols-3">
          {PROBLEMS.map((p, i) => (
            <article
              key={p.num}
              className={`reveal reveal-d${i} group relative overflow-hidden p-8 ${card}`}
            >
              <span
                aria-hidden="true"
                className="absolute inset-x-0 top-0 h-0.5 origin-left scale-x-0 bg-lime transition-transform duration-300 ease-out group-hover:scale-x-100"
              />
              <p className="mb-6 font-mono text-caption tracking-[0.08em] text-ink-muted">{p.num}</p>
              <h3 className="mb-3 font-display text-h-card leading-snug text-ink">{p.title}</h3>
              <p className="text-body leading-[1.7] text-ink-soft">{p.body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
