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

const base = import.meta.env.BASE_URL;

interface MenuItem {
  title: string;
  url: string;
  /** first path segment(s) this item is current for — inner pages roll up to their section */
  matches: string[];
  items?: MenuItem[];
}

const LOGO = { url: base, src: `${base}eightwire-logo.svg`, alt: 'Eightwire' };

const MENU: MenuItem[] = [
  {
    title: 'Products',
    url: `${base}conductor/`,
    matches: ['conductor', 'platform', 'technical-overview', 'medicly'],
    items: [
      { title: 'Conductor', url: `${base}conductor/`, matches: ['conductor', 'platform', 'technical-overview'] },
      { title: 'Medicly', url: `${base}medicly/`, matches: ['medicly'] },
    ],
  },
  { title: 'Connectors', url: `${base}connectors/`, matches: ['connectors'] },
  { title: 'Solutions', url: `${base}solutions/`, matches: ['solutions'] },
  { title: 'Security', url: `${base}security/`, matches: ['security'] },
];

const CTA = { text: 'Book a demo', url: `${base}#contact` };

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
            // hover already opened it — a click keeps it open instead of toggling it shut
            onClick={(e) => { if (open) e.preventDefault(); }}
          >
            {item.title}
            <span className={underline(active || open)} aria-hidden="true" />
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="w-52 rounded border border-cream-line bg-popover p-1.5 shadow-card">
              {item.items.map((subItem) => {
                const current = isCurrent(subItem.matches);
                return (
                  <li key={subItem.title}>
                    <NavigationMenuLink asChild active={current}>
                      <a
                        href={subItem.url}
                        aria-current={current ? 'page' : undefined}
                        className="flex min-h-[44px] select-none items-center rounded-sm px-4 py-2.5 font-display text-[19px] leading-tight text-forest no-underline outline-none transition-colors duration-200 hover:bg-cream focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-forest data-[active]:bg-cream"
                      >
                        {subItem.title}
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
                  className={cn(
                    'rounded-sm py-2 font-display text-2xl leading-tight text-forest outline-none transition-colors duration-200 hover:text-forest-dark focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-forest',
                    current && 'underline decoration-forest/40 underline-offset-8',
                  )}
                >
                  {subItem.title}
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

  const productsActive = isCurrent(MENU[0].matches);

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
          <img src={LOGO.src} className="h-7 w-auto lg:h-8" alt={LOGO.alt} />
        </a>

        <div className="hidden md:flex">
          <NavigationMenu aria-label="Primary" value={menuValue} onValueChange={setMenuValue} delayDuration={80} skipDelayDuration={400}>
            <NavigationMenuList>{MENU.map((item) => renderMenuItem(item))}</NavigationMenuList>
          </NavigationMenu>
        </div>

        <div className="flex items-center gap-3">
          <a href={CTA.url} className={cn(buttonVariants({ size: 'sm' }), 'group hidden sm:inline-flex')}>
            {CTA.text}
            <span aria-hidden="true" className="transition-transform duration-200 group-hover:translate-x-0.5">→</span>
          </a>

          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="md:hidden" aria-label="Open menu">
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
                  defaultValue={productsActive ? 'Products' : undefined}
                  className="flex w-full flex-col border-t border-ink/10"
                >
                  {MENU.map((item) => renderMobileMenuItem(item))}
                </Accordion>
                <a href={CTA.url} className={cn(buttonVariants(), 'group self-start')}>
                  {CTA.text}
                  <span aria-hidden="true" className="transition-transform duration-200 group-hover:translate-x-0.5">→</span>
                </a>
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
