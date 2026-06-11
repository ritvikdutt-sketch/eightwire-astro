import SectionHead from './SectionHead';

const ITEMS = [
  {
    title: 'End-to-end encryption',
    body: 'AES-256 at rest, TLS 1.3 in transit. Multi-layer security architecture with role-based access at every boundary.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-9 w-9" aria-hidden="true">
        <rect x="3" y="11" width="18" height="11" rx="2" /><path d="M7 11V7a5 5 0 0110 0v4" />
      </svg>
    ),
  },
  {
    title: 'Data sovereignty',
    body: 'All infrastructure hosted in Aotearoa. Your data never leaves NZ. Sub-processors documented and disclosed.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-9 w-9" aria-hidden="true">
        <path d="M12 2L4 6v6c0 5 3.5 9.5 8 10 4.5-.5 8-5 8-10V6l-8-4z" />
      </svg>
    ),
  },
  {
    title: 'Compliant from the start',
    body: 'We exceed the highest security thresholds for data sharing and navigate all the compliance requirements, ensuring you can exchange even the most sensitive data with confidence and ease.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-9 w-9" aria-hidden="true">
        <path d="M9 11l3 3L22 4" /><path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11" />
      </svg>
    ),
  },
];

export default function Security() {
  return (
    <section
      id="security"
      className="border-b border-cream-line py-24 sm:py-28"
      style={{
        background:
          'radial-gradient(ellipse 80% 60% at 20% 50%, rgba(129,215,19,0.05) 0%, transparent 60%), #F5F4EE',
      }}
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHead eyebrow="06 — Security & trust">
          Built for the <em className="text-forest">strictest</em> procurement teams in the country.
        </SectionHead>

        <div className="grid items-start gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            {ITEMS.map((item) => (
              <div key={item.title} className="reveal grid grid-cols-[36px_1fr] gap-5 border-b border-cream-line py-7 last:border-b-0">
                <span className="text-forest">{item.icon}</span>
                <div>
                  <h3 className="mb-2 font-display text-[19px] text-forest-deepest">{item.title}</h3>
                  <p className="text-[14.5px] leading-[1.7] text-ink-soft">{item.body}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="reveal reveal-d2 rounded border border-cream-line bg-white p-8 shadow-card lg:sticky lg:top-24">
            <p className="mb-6 font-mono text-[11px] uppercase tracking-[0.1em] text-ink-muted">
              Certifications & alignments
            </p>
            <div className="rounded border border-cream-line bg-cream px-5 py-7 text-center">
              <p className="font-display text-3xl text-ink">SOC 2</p>
              <p className="mt-1 text-[12.5px] text-ink-muted">Type II, current</p>
            </div>
            <a
              href="#contact"
              className="mt-6 inline-flex items-center gap-2 text-[14px] font-medium text-forest transition-[gap] duration-200 hover:gap-3.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-forest"
            >
              Open the trust centre <span aria-hidden="true">→</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
