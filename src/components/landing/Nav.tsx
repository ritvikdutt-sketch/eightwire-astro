import { useEffect, useRef, useState } from 'react';
import { cardStatic } from './ui';

const base = import.meta.env.BASE_URL;

// Products disclosure (APG disclosure-navigation pattern — plain links, not role="menu").
// `matches` = first path segment(s) each item is current for; inner pages roll up to their product.
const PRODUCTS = [
  {
    segment: 'conductor',
    href: `${base}conductor/`,
    label: 'Conductor',
    desc: 'No-code data exchange for NZ health, government and social sector data',
    matches: ['conductor', 'platform', 'technical-overview'],
  },
  {
    segment: 'medicly',
    href: `${base}medicly/`,
    label: 'Medicly',
    desc: 'Sensitive health data exchange',
    matches: ['medicly'],
  },
];

const LINKS = [
  { href: `${base}connectors/`, label: 'Connectors', matches: ['connectors'] },
  { href: `${base}solutions/`, label: 'Solutions', matches: ['solutions'] },
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
const navLabel =
  'group relative whitespace-nowrap py-1 font-mono text-label font-medium uppercase tracking-[0.12em] transition-colors duration-200 hover:text-forest';
const underline = (on: boolean) =>
  `absolute -bottom-0.5 left-0 h-px w-full origin-left bg-forest transition-transform duration-300 ease-out group-hover:scale-x-100 ${
    on ? 'scale-x-100' : 'scale-x-0'
  }`;

export default function Nav({ currentPath = '' }: Props) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false); // mobile dialog
  const [productsOpen, setProductsOpen] = useState(false); // desktop disclosure
  const openBtn = useRef<HTMLButtonElement>(null);
  const closeBtn = useRef<HTMLButtonElement>(null);
  const productsRef = useRef<HTMLDivElement>(null);
  const productsBtn = useRef<HTMLButtonElement>(null);

  const segment = firstSegment(currentPath);
  const isCurrent = (matches: string[]) => segment !== '' && matches.includes(segment);
  const productsActive = PRODUCTS.some((p) => isCurrent(p.matches));

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

  // Escape + outside pointerdown close the disclosure. Document-level because Safari
  // does not focus buttons on click, so focus may never enter the wrapper.
  useEffect(() => {
    if (!productsOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setProductsOpen(false);
        productsBtn.current?.focus();
      }
    };
    const onPointer = (e: PointerEvent) => {
      if (productsRef.current && !productsRef.current.contains(e.target as Node)) setProductsOpen(false);
    };
    document.addEventListener('keydown', onKey);
    document.addEventListener('pointerdown', onPointer);
    return () => {
      document.removeEventListener('keydown', onKey);
      document.removeEventListener('pointerdown', onPointer);
    };
  }, [productsOpen]);

  const itemLinks = () =>
    Array.from(productsRef.current?.querySelectorAll<HTMLAnchorElement>('#products-menu a') ?? []);

  const onTriggerKey = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setProductsOpen(true);
      requestAnimationFrame(() => itemLinks()[0]?.focus());
    }
  };

  const onMenuKey = (e: React.KeyboardEvent) => {
    if (e.key !== 'ArrowDown' && e.key !== 'ArrowUp') return;
    e.preventDefault();
    const items = itemLinks();
    const i = items.indexOf(document.activeElement as HTMLAnchorElement);
    const next = e.key === 'ArrowDown' ? (i + 1) % items.length : (i - 1 + items.length) % items.length;
    items[next]?.focus();
  };

  // relatedTarget === null means focus went to the body (e.g. click on panel padding) — leave it to pointerdown
  const onProductsBlur = (e: React.FocusEvent) => {
    if (e.relatedTarget && !productsRef.current?.contains(e.relatedTarget as Node)) setProductsOpen(false);
  };

  const mobileLink = (href: string, label: string, current: boolean, i: number) => (
    <a
      key={href}
      href={href}
      onClick={() => setOpen(false)}
      aria-current={current ? 'page' : undefined}
      className={`py-1 font-display text-4xl transition-[opacity,transform] duration-500 hover:text-forest ${focusForest} ${
        current ? 'text-forest' : 'text-ink'
      } ${open ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}
      style={{ transitionDelay: open ? `${120 + i * 60}ms` : '0ms' }}
    >
      {label}
    </a>
  );

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
            <div ref={productsRef} className="relative" onBlur={onProductsBlur}>
              <button
                type="button"
                ref={productsBtn}
                aria-expanded={productsOpen}
                aria-controls="products-menu"
                onClick={() => setProductsOpen((o) => !o)}
                onKeyDown={onTriggerKey}
                className={`${navLabel} inline-flex items-center gap-1.5 ${focusForest} ${
                  productsActive || productsOpen ? 'text-forest' : 'text-ink'
                }`}
              >
                Products
                <svg
                  width="10"
                  height="10"
                  viewBox="0 0 10 10"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                  className={`transition-transform duration-200 motion-reduce:transition-none ${productsOpen ? 'rotate-180' : ''}`}
                >
                  <path d="M2 3.5l3 3 3-3" />
                </svg>
                <span className={underline(productsActive || productsOpen)} aria-hidden="true" />
              </button>

              <div
                id="products-menu"
                onKeyDown={onMenuKey}
                className={`${productsOpen ? '' : 'hidden'} absolute left-0 top-full mt-3 w-[22rem] p-1.5 motion-safe:animate-dropdown ${cardStatic}`}
              >
                <ul>
                  {PRODUCTS.map((p) => {
                    const current = segment === p.segment;
                    return (
                      <li key={p.segment}>
                        <a
                          href={p.href}
                          aria-current={current ? 'page' : undefined}
                          className={`group/item flex min-h-[44px] items-start justify-between gap-4 rounded-sm px-4 py-3 transition-colors duration-200 hover:bg-cream ${focusForest}`}
                        >
                          <span>
                            <span
                              className={`block font-display text-[19px] leading-tight transition-colors duration-200 group-hover/item:text-forest ${
                                current ? 'text-forest' : 'text-ink'
                              }`}
                            >
                              {p.label}
                            </span>
                            <span className="mt-1 block text-body-xs leading-snug text-ink-muted">{p.desc}</span>
                          </span>
                          <span
                            aria-hidden="true"
                            className="mt-1 text-forest opacity-0 transition-[opacity,transform] duration-200 group-hover/item:translate-x-0.5 group-hover/item:opacity-100 group-focus-visible/item:opacity-100"
                          >
                            →
                          </span>
                        </a>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>

            {LINKS.map((l) => {
              const active = isCurrent(l.matches);
              return (
                <a
                  key={l.href}
                  href={l.href}
                  aria-current={active ? 'page' : undefined}
                  className={`${navLabel} ${focusForest} ${active ? 'text-forest' : 'text-ink'}`}
                >
                  {l.label}
                  <span className={underline(active)} aria-hidden="true" />
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
              ref={openBtn}
              onClick={() => setOpen(true)}
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
            ref={closeBtn}
            onClick={() => setOpen(false)}
            aria-label="Close menu"
            className={`rounded-sm p-2 text-ink transition-colors hover:text-forest ${focusForest}`}
          >
            <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
              <path d="M5 5l12 12M17 5L5 17" />
            </svg>
          </button>
        </div>
        <nav aria-label="Mobile" className="flex flex-1 flex-col items-start justify-center gap-2 px-8">
          <p className="mb-1 font-mono text-caption uppercase tracking-[0.14em] text-ink-muted">Products</p>
          {PRODUCTS.map((p, i) => mobileLink(p.href, p.label, segment === p.segment, i))}
          <span aria-hidden="true" className="my-3 w-12 border-t border-ink/15" />
          {LINKS.map((l, i) => mobileLink(l.href, l.label, isCurrent(l.matches), i + PRODUCTS.length))}
          <a
            href={`${base}#contact`}
            onClick={() => setOpen(false)}
            className={`mt-8 inline-flex items-center gap-2 rounded-sm bg-lime px-6 py-3 text-sm font-semibold text-forest-deepest transition-[opacity,transform] duration-500 active:scale-[0.97] ${focusForest} ${
              open ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
            }`}
            style={{ transitionDelay: open ? '480ms' : '0ms' }}
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
