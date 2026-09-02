import { CONTACT_EMAIL } from './cta';

const base = import.meta.env.BASE_URL;

interface FooterLink {
  label: string;
  href: string;
  /** opens in a new tab (PDFs) */
  external?: boolean;
  kind?: 'PDF';
}

const COLS: { heading: string; links: FooterLink[] }[] = [
  {
    heading: 'Products',
    links: [
      { label: 'Conductor', href: `${base}conductor/` },
      { label: 'Medicly', href: `${base}medicly/` },
      { label: 'How it works', href: `${base}conductor/#how-it-works` },
      { label: 'Connectors', href: `${base}connectors/` },
    ],
  },
  {
    heading: 'Solutions',
    links: [
      { label: 'Health', href: `${base}solutions/#health` },
      { label: 'Government', href: `${base}solutions/#government` },
      { label: 'Social sector', href: `${base}solutions/#social-sector` },
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
      { label: 'Security whitepaper', href: `${base}whitepapers/eightwire-security-whitepaper.pdf`, external: true, kind: 'PDF' },
      { label: 'Technical whitepaper', href: `${base}whitepapers/eightwire-technical-whitepaper.pdf`, external: true, kind: 'PDF' },
      { label: 'Support', href: `${base}support/` },
    ],
  },
];

export default function FooterSection() {
  return (
    <footer aria-label="Site footer" className="border-t border-lime/10 bg-forest-deepest pb-10 pt-20">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid gap-10 border-b border-cream/10 pb-14 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1fr_1fr]">
          <div className="sm:col-span-2 lg:col-span-1">
            <a href={base} aria-label="Eightwire home" className="inline-block rounded-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-lime">
              <img src={`${base}eightwire-logo-white-text-transparent.svg`} alt="Eightwire" className="h-7 w-auto" />
            </a>
            <p className="mt-5 max-w-xs text-body-sm leading-[1.7] text-cream/55">
              Secure data exchange for Aotearoa&rsquo;s high-stakes sectors. Built in Wellington since 2013.
            </p>
            <p className="mt-5 inline-block rounded-full border border-lime/25 bg-lime/10 px-3 py-1 font-mono text-2xs tracking-[0.05em] text-lime">
              SOC 2
            </p>
            <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2">
              <a
                href="https://www.linkedin.com/company/eight-wire-limited/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-body-xs text-cream/50 transition-colors duration-200 hover:text-lime focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-lime"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z" />
                  <circle cx="4" cy="4" r="2" />
                </svg>
                LinkedIn
                <span className="sr-only"> (opens in a new tab)</span>
              </a>
              <a
                href={`mailto:${CONTACT_EMAIL}`}
                className="text-body-xs text-cream/50 transition-colors duration-200 hover:text-lime focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-lime"
              >
                {CONTACT_EMAIL}
              </a>
            </div>
          </div>

          {COLS.map((col) => (
            <nav key={col.heading} aria-label={col.heading}>
              <h4 className="mb-5 font-mono text-caption uppercase tracking-[0.14em] text-cream/40">{col.heading}</h4>
              {col.links.map((l) => (
                <a
                  key={l.label}
                  href={l.href}
                  {...(l.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                  className="block py-1.5 text-body-sm text-cream/65 transition-colors duration-200 hover:text-lime focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-lime"
                >
                  {l.label}
                  {l.kind && (
                    <span aria-hidden="true" className="ml-2 font-mono text-2xs tracking-[0.08em] text-cream/35">
                      {l.kind}
                    </span>
                  )}
                  {l.external && <span className="sr-only"> (opens in a new tab)</span>}
                </a>
              ))}
            </nav>
          ))}
        </div>

        <div className="flex flex-col gap-3 pt-8 text-body-xs text-cream/40 sm:flex-row sm:items-center sm:justify-between">
          <p>© 2026 Eightwire Ltd · Level 4, 40 Taranaki Street, Wellington 6011</p>
          <div className="flex items-center gap-6">
            <a href={`${base}security/`} className="transition-colors duration-200 hover:text-lime focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-lime">
              Security &amp; trust
            </a>
            <a href="#top" className="font-mono text-caption uppercase tracking-[0.1em] transition-colors duration-200 hover:text-lime focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-lime">
              <span aria-hidden="true">↑</span> Top
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
