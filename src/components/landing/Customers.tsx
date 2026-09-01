import SectionHead from './SectionHead';

const QUOTES = [
  {
    quote: 'Eightwire’s data exchange allows organisations to securely exchange data without system changes.',
    initials: 'CE',
    name: 'Former Chief Executive',
    role: 'Government agency',
    outcome: '→ 4,000+ providers connected',
  },
  {
    quote: 'Eight-Wire has given us a fast and reliable way to aggregate data from a range of government agencies into one place.',
    initials: 'MD',
    name: 'Managing Director',
    role: 'Research consultancy',
    outcome: '→ multi-agency aggregation',
  },
  {
    quote: 'We replaced months of bespoke ETL with a single Conductor pipeline that we manage ourselves.',
    initials: 'PM',
    name: 'Data Lead',
    role: 'PHO network',
    outcome: '→ 6-month build → 3 weeks',
  },
];

export default function Customers() {
  return (
    <section
      id="customers"
      className="border-b border-cream-line py-24 sm:py-28"
      style={{
        background:
          'radial-gradient(ellipse 90% 60% at 90% 30%, rgba(214,237,216,0.55) 0%, transparent 55%), #EDEBE2',
      }}
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHead eyebrow="05 — Customer stories">
          What teams who’ve <em className="text-forest">actually shipped it</em> say.
        </SectionHead>

        <div className="grid gap-5 md:grid-cols-3">
          {QUOTES.map((q, i) => (
            <blockquote
              key={q.name}
              className={`reveal reveal-d${i} flex flex-col rounded border border-cream-line bg-white p-9 shadow-card transition-[transform,box-shadow,border-color] duration-300 hover:-translate-y-1 hover:border-forest/40 hover:shadow-card-hover`}
            >
              <span aria-hidden="true" className="mb-5 font-display text-6xl leading-[0.6] text-lime">“</span>
              <p className="mb-7 flex-1 font-display text-[17px] italic leading-[1.6] text-ink-soft">{q.quote}</p>
              <footer className="flex items-center gap-3 border-t border-cream-line pt-5">
                <span aria-hidden="true" className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-forest font-mono text-[12px] font-semibold text-cream">
                  {q.initials}
                </span>
                <div>
                  <cite className="block text-[14px] font-semibold not-italic text-ink">{q.name}</cite>
                  <p className="mt-0.5 text-[12px] leading-snug text-ink-muted">{q.role}</p>
                </div>
              </footer>
              <p className="mt-5 font-mono text-[11px] uppercase tracking-[0.08em] text-forest">{q.outcome}</p>
            </blockquote>
          ))}
        </div>
      </div>
    </section>
  );
}
