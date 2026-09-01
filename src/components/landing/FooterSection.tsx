import { CONTACT_EMAIL } from './cta';

const base = import.meta.env.BASE_URL;

const COLS = [
  {
    heading: 'Platform',
    links: [
      { label: 'Conductor', href: `${base}#platform` },
      { label: 'How it works', href: `${base}#how-it-works` },
      { label: 'Connectors', href: `${base}connectors/` },
      { label: 'Security', href: `${base}#security` },
    ],
  },
  {
    heading: 'Solutions',
    links: [
      { label: 'Health', href: `${base}#solutions` },
      { label: 'Government', href: `${base}#solutions` },
      { label: 'Social sector', href: `${base}#solutions` },
    ],
  },
  {
    heading: 'Company',
    links: [
      { label: 'Support', href: `${base}support/` },
      { label: 'Contact', href: `mailto:${CONTACT_EMAIL}` },
    ],
  },
];

export default function FooterSection() {
  return (
    <footer aria-label="Site footer" className="border-t border-lime/10 bg-forest-deepest pb-10 pt-20">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid gap-10 border-b border-cream/10 pb-14 md:grid-cols-[1.5fr_1fr_1fr_1fr]">
          <div>
            <a href={base} aria-label="Eightwire home" className="inline-block rounded-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-lime">
              <img src={`${base}eightwire-logo-white-text-transparent.svg`} alt="Eightwire" className="h-7 w-auto" />
            </a>
            <p className="mt-5 max-w-xs text-body-sm leading-[1.7] text-cream/55">
              Secure data exchange for Aotearoa&rsquo;s high-stakes sectors. Built in Wellington since 2013.
            </p>
            <p className="mt-5 inline-block rounded-full border border-lime/25 bg-lime/10 px-3 py-1 font-mono text-2xs tracking-[0.05em] text-lime">
              SOC 2
            </p>
            <div className="mt-4">
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
                  className="block py-1.5 text-body-sm text-cream/65 transition-colors duration-200 hover:text-lime focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-lime"
                >
                  {l.label}
                </a>
              ))}
            </nav>
          ))}
        </div>

        <div className="flex flex-col gap-3 pt-8 text-body-xs text-cream/40 sm:flex-row sm:items-center sm:justify-between">
          <p>© 2026 Eightwire Ltd · Level 4, 40 Taranaki Street, Wellington 6011</p>
          <div className="flex items-center gap-6">
            <a href={`${base}#security`} className="transition-colors duration-200 hover:text-lime focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-lime">
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
