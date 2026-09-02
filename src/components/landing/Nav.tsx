import { useEffect, useRef, useState } from 'react';

const base = import.meta.env.BASE_URL;

// `matches` = first path segment(s) this item is current for; inner pages roll up to their section
const LINKS = [
  { href: `${base}platform/`, label: 'Platform', matches: ['platform', 'technical-overview'] },
  { href: `${base}connectors/`, label: 'Connectors', matches: ['connectors'] },
  { href: `${base}solutions/`, label: 'Solutions', matches: ['solutions', 'medicly'] },
  { href: `${base}security/`, label: 'Security', matches: ['security'] },
];

interface Props {
  /** Astro.url.pathname of the rendering page — drives the active-link state */
  currentPath?: string;
}

const firstSegment = (p: string) =>
  (p.startsWith(base) ? p.slice(base.length) : p.replace(/^\/+/, '')).split('/').filter(Boolean)[0] ?? '';

const focusForest =
  'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-forest';

export default function Nav({ currentPath = '' }: Props) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const openBtn = useRef<HTMLButtonElement>(null);
  const closeBtn = useRef<HTMLButtonElement>(null);
  const segment = firstSegment(currentPath);
  const isCurrent = (l: (typeof LINKS)[number]) => segment !== '' && l.matches.includes(segment);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 32);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = 'hidden';
    closeBtn.current?.focus();
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setOpen(false); };
    document.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = '';
      openBtn.current?.focus();
      document.removeEventListener('keydown', onKey);
    };
  }, [open]);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 bg-cream transition-[box-shadow] duration-500 ${
          scrolled
            ? 'shadow-[0_1px_0_rgba(11,16,13,0.08),0_12px_32px_-16px_rgba(20,80,65,0.25)]'
            : 'shadow-[0_1px_0_rgba(11,16,13,0.06)]'
        }`}
      >
        <nav aria-label="Primary" className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-5 py-4 sm:px-8">
          <a href={base} className={`shrink-0 rounded-sm ${focusForest}`}>
            <img src={`${base}eightwire-logo.svg`} alt="Eightwire" className="h-7 w-auto lg:h-8" />
          </a>

          <div className="hidden items-center gap-5 md:flex lg:gap-8">
            {LINKS.map((l) => {
              const active = isCurrent(l);
              return (
                <a
                  key={l.href}
                  href={l.href}
                  aria-current={active ? 'page' : undefined}
                  className={`group relative whitespace-nowrap py-1 font-mono text-label font-medium uppercase tracking-[0.12em] transition-colors duration-200 hover:text-forest ${focusForest} ${
                    active ? 'text-forest' : 'text-ink'
                  }`}
                >
                  {l.label}
                  <span
                    className={`absolute -bottom-0.5 left-0 h-px w-full origin-left bg-forest transition-transform duration-300 ease-out group-hover:scale-x-100 ${
                      active ? 'scale-x-100' : 'scale-x-0'
                    }`}
                    aria-hidden="true"
                  />
                </a>
              );
            })}
          </div>

          <div className="flex items-center gap-3">
            <a
              href={`${base}#contact`}
              className={`group hidden items-center gap-2 whitespace-nowrap rounded-sm bg-lime px-5 py-2.5 text-body-xs font-semibold text-forest-deepest transition-[transform,box-shadow] duration-200 hover:shadow-lime-glow active:scale-[0.97] sm:inline-flex ${focusForest}`}
            >
              Book a demo
              <span aria-hidden="true" className="transition-transform duration-200 group-hover:translate-x-0.5">→</span>
            </a>
            <button
              type="button"
              onClick={() => setOpen(true)}
              ref={openBtn}
              aria-controls="mobile-nav"
              aria-label="Open menu"
              aria-expanded={open}
              className={`rounded-sm p-2 text-ink transition-colors hover:text-forest md:hidden ${focusForest}`}
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
        id="mobile-nav"
        role="dialog"
        inert={!open}
        aria-hidden={!open}
        aria-modal="true"
        aria-label="Navigation"
        className={`fixed inset-0 z-[60] flex flex-col bg-cream transition-opacity duration-300 md:hidden ${
          open ? 'opacity-100' : 'pointer-events-none opacity-0'
        }`}
      >
        <div className="flex items-center justify-between px-5 py-4 shadow-[0_1px_0_rgba(11,16,13,0.06)]">
          <img src={`${base}eightwire-logo.svg`} alt="" className="h-7 w-auto" />
          <button
            type="button"
            onClick={() => setOpen(false)}
            ref={closeBtn}
            aria-label="Close menu"
            className={`rounded-sm p-2 text-ink transition-colors hover:text-forest ${focusForest}`}
          >
            <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
              <path d="M5 5l12 12M17 5L5 17" />
            </svg>
          </button>
        </div>
        <nav aria-label="Mobile" className="flex flex-1 flex-col items-start justify-center gap-2 px-8">
          {LINKS.map((l, i) => {
            const active = isCurrent(l);
            return (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                aria-current={active ? 'page' : undefined}
                className={`font-display text-4xl transition-[opacity,transform] duration-500 hover:text-forest ${focusForest} ${
                  active ? 'text-forest' : 'text-ink'
                } ${open ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}
                style={{ transitionDelay: open ? `${120 + i * 60}ms` : '0ms' }}
              >
                {l.label}
              </a>
            );
          })}
          <a
            href={`${base}#contact`}
            onClick={() => setOpen(false)}
            className={`mt-8 inline-flex items-center gap-2 rounded-sm bg-lime px-6 py-3 text-sm font-semibold text-forest-deepest transition-[opacity,transform] duration-500 active:scale-[0.97] ${focusForest} ${
              open ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
            }`}
            style={{ transitionDelay: open ? '400ms' : '0ms' }}
          >
            Book a demo <span aria-hidden="true">→</span>
          </a>
        </nav>
        <p className="px-8 pb-10 font-mono text-caption uppercase tracking-[0.14em] text-ink-muted">
          Wellington · Aotearoa NZ
        </p>
      </div>
    </>
  );
}
