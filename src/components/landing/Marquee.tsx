// Sectors Eightwire names in its own published copy (company mission and footer line).
const COMPANIES = ['Governments', 'Health providers', 'Social services', 'Banks'];

export default function Marquee() {
  const row = [...COMPANIES, ...COMPANIES];
  return (
    <section className="overflow-hidden border-b border-cream-line bg-forest-deepest py-12" aria-label="Who we work with">
      <p className="reveal mb-8 text-center font-mono text-caption uppercase tracking-[0.18em] text-cream/55">
        Who we work with
      </p>
      <div
        className="relative"
        style={{
          maskImage: 'linear-gradient(to right, transparent, black 12%, black 88%, transparent)',
          WebkitMaskImage: 'linear-gradient(to right, transparent, black 12%, black 88%, transparent)',
        }}
      >
        <div className="marquee-track flex w-max motion-safe:animate-marquee motion-reduce:flex-wrap motion-reduce:justify-center">
          {row.map((name, i) => (
            <span
              key={`${name}-${i}`}
              aria-hidden={i >= COMPANIES.length || undefined}
              className="flex shrink-0 items-center gap-10 px-5 font-display text-2xl text-cream/45 sm:gap-14 sm:px-7 sm:text-3xl"
            >
              {name}
              <span className="h-1 w-1 rounded-full bg-lime/40" aria-hidden="true" />
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
