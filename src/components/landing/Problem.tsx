import SectionHead from './SectionHead';

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
        <SectionHead eyebrow="The problem">
          Data sharing in NZ is <em className="text-forest">harder than it should be</em>
        </SectionHead>

        <div className="grid divide-y divide-ink/10 border-y border-ink/10 md:grid-cols-3 md:divide-x md:divide-y-0">
          {PROBLEMS.map((p, i) => (
            <article key={p.num} className={`reveal reveal-d${i} py-8 md:px-8 md:first:pl-0 md:last:pr-0 lg:py-10`}>
              <p className="mb-6 font-mono text-caption tracking-[0.08em] text-forest">{p.num}</p>
              <h3 className="mb-3 max-w-xs font-display text-h-card leading-snug text-ink">{p.title}</h3>
              <p className="max-w-sm text-body leading-[1.7] text-ink-soft">{p.body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
