import SectionHead from './SectionHead';

const PILLARS = [
  {
    num: 'PILLAR 01',
    title: 'No-code data exchange',
    body: 'Visual flow builder. Connect systems, map fields, schedule transfers without writing a line of code. Engineers stay focused on harder problems.',
  },
  {
    num: 'PILLAR 02',
    title: 'NZ-native integrations',
    body: 'Pre-built connectors for Indici, Medicly, NHI, HL7, SFTP, S3, REST. We speak the formats your sector already uses.',
    code: true,
  },
  {
    num: 'PILLAR 03',
    title: 'Governance by default',
    body: 'Every transfer logged. Every transformation auditable. Built for OIA, Privacy Act 2020 and NZISM-aligned operations from day one.',
  },
  {
    num: 'PILLAR 04',
    title: 'Hosted in Aotearoa',
    body: 'Infrastructure in NZ. Data stays in NZ. Your sovereignty story is one sentence long, not a 40-page architecture diagram.',
  },
];

const CONNECTORS = ['Indici', 'Medicly', 'NHI', 'HL7', 'SFTP', 'S3', 'REST'];

export default function Platform() {
  return (
    <section
      id="platform"
      className="relative overflow-hidden py-24 sm:py-28"
      style={{
        background:
          'radial-gradient(ellipse 70% 60% at 85% 10%, rgba(129,215,19,0.08) 0%, transparent 60%), radial-gradient(ellipse 60% 70% at 5% 95%, rgba(20,80,65,0.4) 0%, transparent 60%), #050F09',
      }}
    >
      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHead eyebrow="02 — The platform" dark>
          Meet <em className="text-lime">Conductor.</em>
        </SectionHead>

        <p className="reveal -mt-6 mb-14 max-w-xl text-[17px] leading-[1.7] text-cream/65">
          A no-code data exchange platform built specifically for the systems, formats and regulations
          of New Zealand health, government and social sector data.
        </p>

        <div className="grid gap-4 md:grid-cols-2">
          {PILLARS.map((p, i) => (
            <article
              key={p.num}
              className={`reveal reveal-d${i % 2} group relative rounded border border-cream/10 border-l-2 border-l-lime/40 bg-cream/[0.04] p-8 transition-[transform,border-color,background-color] duration-300 hover:-translate-y-0.5 hover:border-l-lime hover:bg-cream/[0.06]`}
            >
              <p className="mb-6 font-mono text-[11px] tracking-[0.1em] text-lime">{p.num}</p>
              <h3 className="mb-3 font-display text-[22px] leading-snug text-cream">{p.title}</h3>
              {p.code ? (
                <p className="text-[14.5px] leading-[1.8] text-cream/60">
                  Pre-built connectors for{' '}
                  {CONNECTORS.map((c, j) => (
                    <span key={c}>
                      <code className="rounded-sm bg-lime/10 px-1.5 py-0.5 font-mono text-[12px] text-lime">{c}</code>
                      {j < CONNECTORS.length - 1 ? ', ' : '. '}
                    </span>
                  ))}
                  We speak the formats your sector already uses.
                </p>
              ) : (
                <p className="text-[14.5px] leading-[1.7] text-cream/60">{p.body}</p>
              )}
            </article>
          ))}
        </div>

        <div className="reveal mt-14 flex flex-wrap gap-3">
          <a
            href="#contact"
            className="group inline-flex items-center gap-2 rounded-sm bg-lime px-6 py-3 text-[14px] font-semibold text-forest-deepest transition-[transform,box-shadow] duration-200 hover:shadow-lime-glow active:scale-[0.97] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-lime"
          >
            Explore Conductor
            <span aria-hidden="true" className="transition-transform duration-200 group-hover:translate-x-1">→</span>
          </a>
          <a
            href="#contact"
            className="inline-flex items-center rounded-sm border border-cream/25 px-6 py-3 text-[14px] font-medium text-cream/85 transition-colors duration-200 hover:border-cream/50 hover:text-cream active:scale-[0.97] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-lime"
          >
            Read technical overview
          </a>
        </div>
      </div>
    </section>
  );
}
