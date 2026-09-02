import type { ReactNode } from 'react';

interface Props {
  eyebrow: string;
  lede?: string;
  /** optional CTA row — from Astro, pass `<div slot="actions">…</div>` */
  actions?: ReactNode;
  /** heading content — rendered inside the page h1 */
  children: ReactNode;
}

/** Dark page intro for inner pages — shares the homepage hero's atmosphere. */
export default function PageHero({ eyebrow, lede, actions, children }: Props) {
  return (
    <section className="relative overflow-hidden bg-forest-deepest" id="top">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 70% 55% at 75% 30%, rgba(129,215,19,0.10) 0%, transparent 60%), radial-gradient(ellipse 60% 70% at 8% 90%, rgba(20,80,65,0.45) 0%, transparent 65%)',
        }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.55]"
        style={{
          backgroundImage:
            'linear-gradient(to right, rgba(129,215,19,0.045) 1px, transparent 1px), linear-gradient(to bottom, rgba(129,215,19,0.045) 1px, transparent 1px)',
          backgroundSize: '72px 72px',
          maskImage: 'radial-gradient(ellipse 90% 80% at 60% 30%, black 20%, transparent 75%)',
          WebkitMaskImage: 'radial-gradient(ellipse 90% 80% at 60% 30%, black 20%, transparent 75%)',
        }}
      />

      <div className="relative mx-auto max-w-7xl px-5 pb-16 pt-32 sm:px-8 lg:pb-20 lg:pt-40">
        <p className="rise inline-flex items-center gap-2.5 rounded-sm border border-lime/25 bg-lime/10 px-3.5 py-1.5 font-mono text-caption uppercase tracking-[0.14em] text-lime">
          {eyebrow}
        </p>
        <h1 className="rise rise-d1 mt-6 max-w-3xl font-display text-[clamp(2.4rem,5.5vw,4.2rem)] leading-[1.05] tracking-[-0.01em] text-cream [text-wrap:balance]">
          {children}
        </h1>
        {lede && (
          <p className="rise rise-d2 mt-6 max-w-xl text-lede leading-[1.7] text-cream/70">{lede}</p>
        )}
        {actions && <div className="rise rise-d3 mt-9">{actions}</div>}
      </div>

      <div aria-hidden="true" className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-lime/30 to-transparent" />
    </section>
  );
}
