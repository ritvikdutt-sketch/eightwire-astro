import { useEffect, useState } from 'react';
import { Menu } from 'lucide-react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Button, buttonVariants } from '@/components/ui/button';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { cn } from '@/lib/utils';
import { BOOK_DEMO_HREF, BOOK_DEMO_LABEL } from './cta';
import MotionToggle from './MotionToggle';

const base = import.meta.env.BASE_URL;

interface MenuItem {
  title: string;
  url: string;
  /** first path segment(s) this item is current for — inner pages roll up to their section */
  matches: string[];
  items?: MenuItem[];
  /** opens in a new tab (PDFs, other sites) */
  external?: boolean;
  /** file-type marker shown after the label */
  kind?: 'PDF';
}

const LOGO = { url: base, src: `${base}eightwire-logo.svg`, alt: 'Eightwire' };

const MENU: MenuItem[] = [
  {
    title: 'Products',
    url: `${base}conductor/`,
    matches: ['conductor', 'platform', 'medicly'],
    items: [
      { title: 'Conductor', url: `${base}conductor/`, matches: ['conductor', 'platform'] },
      { title: 'Medicly', url: `${base}medicly/`, matches: ['medicly'] },
    ],
  },
  { title: 'Connectors', url: `${base}connectors/`, matches: ['connectors'] },
  {
    title: 'Resources',
    url: `${base}knowledge-base/`,
    matches: ['knowledge-base', 'security'],
    items: [
      { title: 'Knowledge base', url: `${base}knowledge-base/`, matches: ['knowledge-base'] },
      { title: 'Security & trust', url: `${base}security/`, matches: ['security'] },
      {
        title: 'Security whitepaper',
        url: `${base}whitepapers/eightwire-security-whitepaper.pdf`,
        matches: [],
        external: true,
        kind: 'PDF',
      },
      {
        title: 'Technical whitepaper',
        url: `${base}whitepapers/eightwire-technical-whitepaper.pdf`,
        matches: [],
        external: true,
        kind: 'PDF',
      },
    ],
  },
  {
    title: 'About',
    url: `${base}company/`,
    matches: ['company', 'technical-overview', 'faq'],
    items: [
      { title: 'About Eightwire', url: `${base}company/`, matches: ['company'] },
      { title: 'Technical overview', url: `${base}technical-overview/`, matches: ['technical-overview'] },
      { title: 'FAQ', url: `${base}faq/`, matches: ['faq'] },
    ],
  },
  { title: 'Contact us', url: `${base}contact-us/`, matches: ['contact-us'] },
];

const CTA = { text: BOOK_DEMO_LABEL, url: BOOK_DEMO_HREF };
/** Conductor's real login — the old site's "Sign in" destination. */
const SIGN_IN = { text: 'Sign in', url: 'https://conductor.eight-wire.com' };

interface Props {
  /** Astro.url.pathname of the rendering page — drives the active-link state */
  currentPath?: string;
}

const firstSegment = (p: string) =>
  (p.startsWith(base) ? p.slice(base.length) : p.replace(/^\/+/, '')).split('/').filter(Boolean)[0] ?? '';

const underline = (on: boolean) =>
  `absolute -bottom-0.5 left-0 h-px w-full origin-left bg-forest transition-transform duration-300 ease-out group-hover:scale-x-100 ${
    on ? 'scale-x-100' : 'scale-x-0'
  }`;

const externalProps = (item: MenuItem) =>
  item.external ? { target: '_blank', rel: 'noopener noreferrer' } : {};

/** Label + optional file-type marker + new-tab note for assistive tech. */
function Label({ item, markerClass }: { item: MenuItem; markerClass: string }) {
  return (
    <>
      {item.title}
      {item.kind && (
        <span aria-hidden="true" className={markerClass}>
          {item.kind}
        </span>
      )}
      {item.external && <span className="sr-only"> (opens in a new tab)</span>}
    </>
  );
}

export default function Nav({ currentPath = '' }: Props) {
  const [scrolled, setScrolled] = useState(false);
  const [menuValue, setMenuValue] = useState('');
  const segment = firstSegment(currentPath);
  const isCurrent = (matches: string[]) => segment !== '' && matches.includes(segment);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 32);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const renderMenuItem = (item: MenuItem) => {
    const active = isCurrent(item.matches);

    if (item.items) {
      const open = menuValue === item.title;
      return (
        <NavigationMenuItem key={item.title} value={item.title}>
          <NavigationMenuTrigger
            className={cn(active && 'text-forest')}
            // hover already opened it — a pointer click keeps it open instead of toggling it shut;
            // keyboard activation (detail === 0) still toggles, so Enter/Space can close it too
            onClick={(e) => { if (open && e.detail !== 0) e.preventDefault(); }}
          >
            {item.title}
            <span className={underline(active || open)} aria-hidden="true" />
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            {/* Panel reads as part of the bar: same cream, same mono label recipe as the triggers. */}
            <ul className="w-max min-w-56 rounded border border-cream-line bg-cream p-1.5 shadow-card">
              {item.items.map((subItem) => {
                const current = isCurrent(subItem.matches);
                return (
                  <li key={subItem.title}>
                    <NavigationMenuLink asChild active={current}>
                      <a
                        href={subItem.url}
                        aria-current={current ? 'page' : undefined}
                        {...externalProps(subItem)}
                        className="flex min-h-[44px] select-none items-center whitespace-nowrap rounded-sm px-4 py-2.5 font-mono text-label font-medium uppercase tracking-[0.12em] text-forest no-underline outline-none transition-colors duration-200 hover:bg-cream-dark focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-forest data-[active]:bg-cream-dark"
                      >
                        <Label item={subItem} markerClass="ml-2.5 text-2xs tracking-[0.08em] text-ink-muted" />
                      </a>
                    </NavigationMenuLink>
                  </li>
                );
              })}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
      );
    }

    return (
      <NavigationMenuItem key={item.title}>
        <NavigationMenuLink asChild active={active}>
          <a href={item.url} aria-current={active ? 'page' : undefined} className={cn(navigationMenuTriggerStyle(), active && 'text-forest')}>
            {item.title}
            <span className={underline(active)} aria-hidden="true" />
          </a>
        </NavigationMenuLink>
      </NavigationMenuItem>
    );
  };

  const renderMobileMenuItem = (item: MenuItem) => {
    const active = isCurrent(item.matches);

    if (item.items) {
      return (
        <AccordionItem key={item.title} value={item.title}>
          <AccordionTrigger className={cn('font-display text-3xl text-ink data-[state=open]:text-forest', active && 'text-forest')}>
            {item.title}
          </AccordionTrigger>
          <AccordionContent className="flex flex-col gap-1 pb-5 pl-1">
            {item.items.map((subItem) => {
              const current = isCurrent(subItem.matches);
              return (
                <a
                  key={subItem.title}
                  href={subItem.url}
                  aria-current={current ? 'page' : undefined}
                  {...externalProps(subItem)}
                  className={cn(
                    'rounded-sm py-2 font-display text-2xl leading-tight text-forest outline-none transition-colors duration-200 hover:text-forest-dark focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-forest',
                    current && 'underline decoration-forest/40 underline-offset-8',
                  )}
                >
                  <Label item={subItem} markerClass="ml-2.5 align-middle font-mono text-caption tracking-[0.08em] text-ink-muted" />
                </a>
              );
            })}
          </AccordionContent>
        </AccordionItem>
      );
    }

    return (
      <a
        key={item.title}
        href={item.url}
        aria-current={active ? 'page' : undefined}
        className={cn(
          'block border-b border-ink/10 py-4 font-display text-3xl text-ink outline-none transition-colors duration-200 hover:text-forest focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-forest',
          active && 'text-forest',
        )}
      >
        {item.title}
      </a>
    );
  };

  // The drawer opens the group that holds the current page, so the reader sees where they are.
  const activeGroup = MENU.find((m) => m.items && isCurrent(m.matches))?.title;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 bg-cream transition-[box-shadow] duration-500 ${
        scrolled
          ? 'shadow-[0_1px_0_rgba(11,16,13,0.08),0_12px_32px_-16px_rgba(20,80,65,0.25)]'
          : 'shadow-[0_1px_0_rgba(11,16,13,0.06)]'
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-5 py-4 sm:px-8">
        <a href={LOGO.url} className="shrink-0 rounded-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-forest">
          <img src={LOGO.src} className="h-7 w-auto xl:h-8" alt={LOGO.alt} />
        </a>

        <div className="hidden lg:flex">
          <NavigationMenu aria-label="Primary" value={menuValue} onValueChange={setMenuValue} delayDuration={80} skipDelayDuration={400}>
            <NavigationMenuList>{MENU.map((item) => renderMenuItem(item))}</NavigationMenuList>
          </NavigationMenu>
        </div>

        <div className="flex items-center gap-3 lg:gap-5">
          <a
            href={SIGN_IN.url}
            className="hidden items-center whitespace-nowrap py-1 font-mono text-label font-medium uppercase tracking-[0.12em] text-ink transition-colors duration-200 hover:text-forest focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-forest lg:inline-flex"
          >
            {SIGN_IN.text}
          </a>
          <a href={CTA.url} className={cn(buttonVariants({ size: 'sm' }), 'group hidden sm:inline-flex')}>
            {CTA.text}
            <span aria-hidden="true" className="transition-transform duration-200 group-hover:translate-x-0.5">→</span>
          </a>

          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="lg:hidden" aria-label="Open menu">
                <Menu className="size-5" aria-hidden="true" />
              </Button>
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle asChild>
                  <a href={LOGO.url} className="inline-flex rounded-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-forest">
                    <img src={LOGO.src} className="h-7 w-auto" alt={LOGO.alt} />
                  </a>
                </SheetTitle>
              </SheetHeader>
              <nav aria-label="Mobile" className="my-8 flex flex-col gap-8">
                <Accordion
                  type="single"
                  collapsible
                  defaultValue={activeGroup}
                  className="flex w-full flex-col border-t border-ink/10"
                >
                  {MENU.map((item) => renderMobileMenuItem(item))}
                </Accordion>
                <div className="flex flex-wrap items-center gap-x-6 gap-y-4">
                  <a href={CTA.url} className={cn(buttonVariants(), 'group')}>
                    {CTA.text}
                    <span aria-hidden="true" className="transition-transform duration-200 group-hover:translate-x-0.5">→</span>
                  </a>
                  <a
                    href={SIGN_IN.url}
                    className="font-mono text-label font-medium uppercase tracking-[0.12em] text-ink transition-colors duration-200 hover:text-forest focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-forest"
                  >
                    {SIGN_IN.text} to Conductor
                  </a>
                </div>
                <MotionToggle tone="light" />
              </nav>
              <p className="mt-auto font-mono text-caption uppercase tracking-[0.14em] text-ink-muted">
                Wellington · Aotearoa NZ
              </p>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
