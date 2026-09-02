import SectionHead from './SectionHead';

// Connect / Map / Exchange — carried over verbatim from eightwire.io. A real sequence, so the
// steps are numbered.
const STEPS = [
  {
    title: 'Connect',
    body: 'Our no-code interface connects complex, cross-enterprise data exchange processes with ease. It takes as little as 20 minutes for an organisation to connect and begin exchanging data.',
  },
  {
    title: 'Map',
    body: 'Eightwire products automatically map your data sources and destination, with governance and security built into every step.',
  },
  {
    title: 'Exchange',
    body: 'Eightwire products move information between systems without the need to write code.',
  },
];

export default function Steps({ id = 'how-it-works' }: { id?: string }) {
  return (
    <section
      id={id}
      className="border-b border-cream-line py-24 sm:py-28"
      style={{
        background:
          'radial-gradient(ellipse 90% 60% at 10% 60%, rgba(129,215,19,0.06) 0%, transparent 55%), #F5F4EE',
      }}
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHead eyebrow="How it works">
          Three <em className="text-forest">simple steps</em>
        </SectionHead>

        <ol className="grid divide-y divide-forest/15 border-y border-forest/15 md:grid-cols-3 md:divide-x md:divide-y-0" role="list">
          {STEPS.map((s, i) => (
            <li key={s.title} className={`reveal reveal-d${i} py-8 md:px-8 md:first:pl-0 md:last:pr-0`}>
              <p className="font-mono text-caption uppercase tracking-[0.14em] text-ink-muted">Step {String(i + 1).padStart(2, '0')}</p>
              <h3 className="mt-3 font-display text-2xl text-ink">{s.title}</h3>
              <p className="mt-3 max-w-sm text-body leading-[1.7] text-ink-soft">{s.body}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
