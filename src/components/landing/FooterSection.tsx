import { CONTACT_EMAIL } from './cta';

const base = import.meta.env.BASE_URL;

const CERTS_HREF = `${base}knowledge-base/certifications-and-accreditations/`;

interface FooterLink {
  label: string;
  href: string;
  /** opens in a new tab (PDFs) */
  external?: boolean;
  kind?: 'PDF' | 'TXT';
}

const COLS: { heading: string; links: FooterLink[] }[] = [
  {
    heading: 'Products',
    links: [
      { label: 'Conductor', href: `${base}conductor/` },
      { label: 'Medicly', href: `${base}medicly/` },
      { label: 'Connectors', href: `${base}connectors/` },
    ],
  },
  {
    heading: 'Company',
    links: [
      { label: 'About Eightwire', href: `${base}company/` },
      { label: 'Technical overview', href: `${base}technical-overview/` },
      { label: 'FAQ', href: `${base}faq/` },
      { label: 'Contact us', href: `${base}contact-us/` },
    ],
  },
  {
    heading: 'Resources',
    links: [
      { label: 'Knowledge base', href: `${base}knowledge-base/` },
      { label: 'Security & trust', href: `${base}security/` },
      { label: 'Security whitepaper', href: `${base}whitepapers/eightwire-security-whitepaper.pdf`, external: true, kind: 'PDF' },
      { label: 'Technical whitepaper', href: `${base}whitepapers/eightwire-technical-whitepaper.pdf`, external: true, kind: 'PDF' },
      { label: 'Site as Markdown', href: `${base}llms.txt`, kind: 'TXT' },
    ],
  },
];

// Muted text on the dark footer sits at cream/55 (5.75:1) — the AA floor for 11–13px type.
const focusRing = 'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-lime';

export default function FooterSection() {
  return (
    <footer aria-label="Site footer" className="border-t border-lime/10 bg-forest-deepest pb-10 pt-20">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid gap-10 border-b border-cream/10 pb-14 md:grid-cols-[1.5fr_1fr_1fr_1fr]">
          <div>
            <a href={base} aria-label="Eightwire home" className={`inline-block rounded-sm ${focusRing}`}>
              <img src={`${base}eightwire-logo-white-text-transparent.svg`} alt="Eightwire" className="h-7 w-auto" />
            </a>
            <p className="mt-5 max-w-xs text-body-sm leading-[1.7] text-cream/55">
              Secure data exchange for Aotearoa&rsquo;s high-stakes sectors. Built in Wellington since 2015.
            </p>
            {/* AICPA SOC badge — links to the certificates published in the knowledge base */}
            <a href={CERTS_HREF} className={`group mt-6 inline-flex items-center gap-3 rounded-sm ${focusRing}`}>
              <img src={`${base}images/Ellipse-16.png`} alt="" width="56" height="56" className="h-14 w-14 shrink-0" />
              <span className="text-body-xs leading-snug text-cream/55 transition-colors duration-200 group-hover:text-cream/80">
                SOC 2 audited
                <span className="block text-cream/55 group-hover:text-lime">View the certificates</span>
              </span>
            </a>
            <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2">
              <a
                href="https://www.linkedin.com/company/eight-wire-limited/"
                target="_blank"
                rel="noopener noreferrer"
                className={`inline-flex items-center gap-1.5 text-body-xs text-cream/55 transition-colors duration-200 hover:text-lime ${focusRing}`}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z" />
                  <circle cx="4" cy="4" r="2" />
                </svg>
                LinkedIn
                <span className="sr-only"> (opens in a new tab)</span>
              </a>
              <a href={`mailto:${CONTACT_EMAIL}`} className={`text-body-xs text-cream/55 transition-colors duration-200 hover:text-lime ${focusRing}`}>
                {CONTACT_EMAIL}
              </a>
            </div>
          </div>

          {COLS.map((col) => (
            <nav key={col.heading} aria-label={col.heading}>
              <h4 className="mb-5 font-mono text-caption uppercase tracking-[0.14em] text-cream/55">{col.heading}</h4>
              {col.links.map((l) => (
                <a
                  key={l.label}
                  href={l.href}
                  {...(l.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                  className={`block py-1.5 text-body-sm text-cream/65 transition-colors duration-200 hover:text-lime ${focusRing}`}
                >
                  {l.label}
                  {l.kind && (
                    <span aria-hidden="true" className="ml-2 font-mono text-2xs tracking-[0.08em] text-cream/55">
                      {l.kind}
                    </span>
                  )}
                  {l.external && <span className="sr-only"> (opens in a new tab)</span>}
                </a>
              ))}
            </nav>
          ))}
        </div>

        <div className="flex flex-col gap-4 pt-8 text-body-xs text-cream/55 sm:flex-row sm:items-center sm:justify-between">
          <p>© 2026 Eightwire Ltd · 1 Queens Wharf, Wellington Central, Wellington 6011</p>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
            {/* Pause/play every decorative animation — wired by LandingLayout's inline motion script */}
            <button
              type="button"
              data-motion-toggle
              aria-pressed="false"
              className={`inline-flex min-h-[44px] items-center gap-2 rounded-sm font-mono text-caption uppercase tracking-[0.14em] text-cream/55 transition-colors duration-200 hover:text-lime ${focusRing}`}
            >
              Pause motion
            </button>
            <a href="#top" className={`font-mono text-caption uppercase tracking-[0.1em] transition-colors duration-200 hover:text-lime ${focusRing}`}>
              <span aria-hidden="true">↑</span> Top
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
