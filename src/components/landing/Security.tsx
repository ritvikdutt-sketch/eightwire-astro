import SectionHead from './SectionHead';
import { cardStatic, arrowNudge, focusForest } from './ui';

const base = import.meta.env.BASE_URL;
const CERTS_HREF = `${base}knowledge-base/certifications-and-accreditations/`;

// Every sentence here is either Eightwire's own published copy (eightwire.io, knowledge base)
// or a statement supplied by the team (region locking, Sept 2026).
const ITEMS = [
  {
    id: 'encryption',
    title: 'Encrypted from source to destination',
    body: 'Data is encrypted at rest and in transit. Authentication, authorisation and encryption secure both parties’ proprietary data.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-9 w-9" aria-hidden="true">
        <rect x="3" y="11" width="18" height="11" rx="2" /><path d="M7 11V7a5 5 0 0110 0v4" />
      </svg>
    ),
  },
  {
    id: 'sovereignty',
    title: 'Data sovereignty, your choice of region',
    body: 'Lock processing to the region you choose — New Zealand or Australia. Eightwire’s hybrid cloud lets customers restrict the servers that physically handle data to certain countries or data centres.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-9 w-9" aria-hidden="true">
        <path d="M12 2L4 6v6c0 5 3.5 9.5 8 10 4.5-.5 8-5 8-10V6l-8-4z" />
      </svg>
    ),
  },
  {
    id: 'assessment',
    title: 'Independently assessed',
    body: 'External security specialists have reviewed our AWS configuration against security best practices, the application code and configuration behind it, the controls covering our New Zealand processing servers, and our change control, business continuity and disaster recovery processes.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-9 w-9" aria-hidden="true">
        <path d="M9 11l3 3L22 4" /><path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11" />
      </svg>
    ),
  },
];

// Scope and dates live in the knowledge-base article "Certifications and Accreditations", not here,
// so this card cannot go stale. Government certification is omitted pending review (Sept 2026).
const CERTS = [
  { name: 'SOC 2', detail: 'Service Organisation Control audit — see the certifications page for scope and dates' },
];

export default function Security({ showHead = true }: { showHead?: boolean }) {
  const H: 'h2' | 'h3' = showHead ? 'h3' : 'h2';
  const linkClass = `group inline-flex items-center gap-2 text-body-sm font-medium text-forest transition-colors duration-200 hover:text-forest-dark ${focusForest}`;
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
        {showHead && (<SectionHead eyebrow="Security & trust">
          Built for the <em className="text-forest">strictest</em> procurement teams in the country
        </SectionHead>)}

        <div className="grid items-start gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            {ITEMS.map((item) => (
              <div key={item.id} id={item.id} className="reveal grid scroll-mt-28 grid-cols-[36px_1fr] gap-5 border-b border-cream-line py-7 last:border-b-0">
                <span className="text-forest">{item.icon}</span>
                <div>
                  <H className="mb-2 font-display text-[19px] text-forest-deepest">{item.title}</H>
                  <p className="text-body leading-[1.7] text-ink-soft">{item.body}</p>
                </div>
              </div>
            ))}

            <p className="reveal mt-8 text-body-sm text-ink-soft">
              Questions about security?{' '}
              <a href={`${base}faq/`} className={linkClass}>
                Read the FAQ <span aria-hidden="true" className={arrowNudge}>→</span>
              </a>
            </p>
          </div>

          <div className={`reveal reveal-d2 p-8 lg:sticky lg:top-24 ${cardStatic}`}>
            <p className="mb-6 font-mono text-caption uppercase tracking-[0.1em] text-ink-muted">
              Certifications
            </p>
            <ul className="divide-y divide-cream-line border-y border-cream-line" role="list">
              {CERTS.map((c) => (
                <li key={c.name} className="py-5">
                  <a
                    href={CERTS_HREF}
                    className={`inline-block rounded-sm font-display text-2xl leading-tight text-ink transition-colors duration-200 hover:text-forest ${focusForest}`}
                  >
                    {c.name}
                  </a>
                  <p className="mt-1.5 text-body-sm leading-[1.6] text-ink-soft">{c.detail}</p>
                </li>
              ))}
            </ul>
            <div className="mt-6 flex flex-col items-start gap-3">
              <a href={CERTS_HREF} className={linkClass}>
                View the certificates
                <span aria-hidden="true" className={arrowNudge}>→</span>
              </a>
              <a
                href={`${base}whitepapers/eightwire-security-whitepaper.pdf`}
                target="_blank"
                rel="noopener noreferrer"
                className={linkClass}
              >
                Read the security whitepaper
                <span aria-hidden="true" className="font-mono text-2xs tracking-[0.08em] text-ink-muted">PDF</span>
                <span aria-hidden="true" className={arrowNudge}>→</span>
                <span className="sr-only"> (opens in a new tab)</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
