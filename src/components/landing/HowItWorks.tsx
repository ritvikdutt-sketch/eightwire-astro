import SectionHead from './SectionHead';

const STEPS = [
  {
    num: '01',
    title: 'Connect',
    body: 'Plug in your source and destination systems via pre-built connectors or our universal API. No infrastructure changes required on either side.',
    time: '≈ 5 minutes',
  },
  {
    num: '02',
    title: 'Map',
    body: 'Drag-and-drop field mapping with automatic schema detection. Validation rules and error correction catch thousands of common data issues.',
    time: '≈ 15 minutes',
  },
  {
    num: '03',
    title: 'Exchange',
    body: 'Schedule, monitor and audit your flows. Real-time alerts when something needs your attention. Otherwise it just keeps running.',
    time: 'ongoing',
  },
];

export default function HowItWorks() {
  return (
    <section
      id="how-it-works"
      className="border-b border-cream-line py-24 sm:py-28"
      style={{
        background:
          'radial-gradient(ellipse 60% 80% at 85% 20%, rgba(214,237,216,0.5) 0%, transparent 55%), #F5F4EE',
      }}
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHead eyebrow="03 — How it works">
          From <em className="text-forest">spreadsheet chaos</em> to live data flow in under 30 minutes.
        </SectionHead>

        <ol className="grid gap-5 md:grid-cols-3">
          {STEPS.map((s, i) => (
            <li
              key={s.num}
              className={`reveal reveal-d${i} group relative rounded border border-cream-line bg-white p-9 shadow-card transition-[transform,box-shadow] duration-300 hover:-translate-y-1 hover:shadow-card-hover`}
            >
              <div className="mb-6 flex items-baseline justify-between">
                <span className="font-display text-5xl leading-none text-forest/15 transition-colors duration-300 group-hover:text-lime">
                  {s.num}
                </span>
                {i < STEPS.length - 1 && (
                  <span aria-hidden="true" className="hidden font-mono text-ink-muted/40 md:block">⟶</span>
                )}
              </div>
              <h3 className="mb-3 font-display text-2xl text-ink">{s.title}</h3>
              <p className="mb-6 text-[14.5px] leading-[1.7] text-ink-soft">{s.body}</p>
              <span className="inline-block rounded-sm bg-mint-deep/60 px-2.5 py-1 font-mono text-[11.5px] text-forest">
                {s.time}
              </span>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
