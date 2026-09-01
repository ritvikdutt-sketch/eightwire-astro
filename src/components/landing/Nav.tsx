import { useEffect, useState } from 'react';

const base = import.meta.env.BASE_URL;

const LINKS = [
  { href: `${base}#platform`, label: 'Platform' },
  { href: `${base}connectors/`, label: 'Connectors' },
  { href: `${base}#solutions`, label: 'Solutions' },
  { href: `${base}#customers`, label: 'Customers' },
  { href: `${base}#security`, label: 'Security' },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 32);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = 'hidden';
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setOpen(false); };
    document.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = '';
      document.removeEventListener('keydown', onKey);
    };
  }, [open]);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-[background-color,box-shadow] duration-500 ${
          scrolled
            ? 'bg-forest-deepest/85 shadow-[0_1px_0_rgba(129,215,19,0.10),0_8px_32px_rgba(0,0,0,0.45)] backdrop-blur-xl'
            : 'bg-transparent'
        }`}
      >
        <nav aria-label="Primary" className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-5 py-4 sm:px-8">
          <a href={base} className="shrink-0 rounded-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-lime">
            <img src={`${base}eightwire-logo-white-text-transparent.svg`} alt="Eightwire" className="h-7 w-auto sm:h-8" />
          </a>

          <div className="hidden items-center gap-8 md:flex">
            {LINKS.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="group relative py-1 font-mono text-[12px] uppercase tracking-[0.14em] text-cream/65 transition-colors duration-200 hover:text-lime focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-lime"
              >
                {l.label}
                <span className="absolute -bottom-0.5 left-0 h-px w-full origin-left scale-x-0 bg-lime transition-transform duration-300 ease-out group-hover:scale-x-100" aria-hidden="true" />
              </a>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <a
              href="#contact"
              className="group hidden items-center gap-2 rounded-sm bg-lime px-5 py-2.5 text-[13px] font-semibold text-forest-deepest transition-[transform,box-shadow] duration-200 hover:shadow-lime-glow active:scale-[0.97] sm:inline-flex focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-lime"
            >
              Book a demo
              <span aria-hidden="true" className="transition-transform duration-200 group-hover:translate-x-0.5">→</span>
            </a>
            <button
              type="button"
              onClick={() => setOpen(true)}
              aria-label="Open menu"
              aria-expanded={open}
              className="rounded-sm p-2 text-cream/80 transition-colors hover:text-lime md:hidden focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lime"
            >
              <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
                <path d="M3 6h16M3 11h16M3 16h16" />
              </svg>
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile menu */}
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Navigation"
        className={`fixed inset-0 z-[60] flex flex-col bg-forest-deepest transition-opacity duration-300 md:hidden ${
          open ? 'opacity-100' : 'pointer-events-none opacity-0'
        }`}
      >
        <div className="flex items-center justify-between px-5 py-4">
          <img src={`${base}eightwire-logo-white-text-transparent.svg`} alt="" className="h-7 w-auto" />
          <button
            type="button"
            onClick={() => setOpen(false)}
            aria-label="Close menu"
            className="rounded-sm p-2 text-cream/80 transition-colors hover:text-lime focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lime"
          >
            <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
              <path d="M5 5l12 12M17 5L5 17" />
            </svg>
          </button>
        </div>
        <nav aria-label="Mobile" className="flex flex-1 flex-col items-start justify-center gap-2 px-8">
          {LINKS.map((l, i) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className={`font-display text-4xl text-cream transition-[opacity,transform] duration-500 hover:text-lime focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-lime ${
                open ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
              }`}
              style={{ transitionDelay: open ? `${120 + i * 60}ms` : '0ms' }}
            >
              {l.label}
            </a>
          ))}
          <a
            href="#contact"
            onClick={() => setOpen(false)}
            className={`mt-8 inline-flex items-center gap-2 rounded-sm bg-lime px-6 py-3 text-sm font-semibold text-forest-deepest transition-[opacity,transform] duration-500 active:scale-[0.97] ${
              open ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
            }`}
            style={{ transitionDelay: open ? '400ms' : '0ms' }}
          >
            Book a demo <span aria-hidden="true">→</span>
          </a>
        </nav>
        <p className="px-8 pb-10 font-mono text-[11px] uppercase tracking-[0.14em] text-cream/30">
          Wellington · Aotearoa NZ
        </p>
      </div>
    </>
  );
}
