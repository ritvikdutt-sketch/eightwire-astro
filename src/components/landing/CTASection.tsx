import { BOOK_DEMO_HREF, BOOK_DEMO_LABEL, CONTACT_EMAIL } from './cta';
import { btnPrimary, btnGhostDark, arrowNudge } from './ui';

const base = import.meta.env.BASE_URL;

export default function CTASection() {
  return (
    <section
      id="contact"
      className="relative overflow-hidden py-28 text-center sm:py-36"
      style={{
        background:
          'radial-gradient(ellipse 60% 60% at 50% 40%, rgba(129,215,19,0.10) 0%, transparent 65%), #050F09',
      }}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            'linear-gradient(to right, rgba(129,215,19,0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(129,215,19,0.05) 1px, transparent 1px)',
          backgroundSize: '64px 64px',
          maskImage: 'radial-gradient(ellipse 60% 60% at 50% 50%, black 30%, transparent 80%)',
          WebkitMaskImage: 'radial-gradient(ellipse 60% 60% at 50% 50%, black 30%, transparent 80%)',
        }}
      />
      <div className="relative mx-auto max-w-3xl px-5 sm:px-8">
        <h2 className="reveal font-display text-[clamp(2.2rem,5vw,3.6rem)] leading-[1.08] tracking-[-0.01em] text-cream [text-wrap:balance]">
          Talk to a team that <em className="text-lime">knows</em> Aotearoa&rsquo;s data
        </h2>
        <p className="reveal reveal-d1 mx-auto mt-6 max-w-lg text-lede leading-[1.7] text-cream/65">
          We work with health, government and social sector teams every day. Tell us what you&rsquo;re
          trying to move. We&rsquo;ll show you the fastest path.
        </p>
        <div className="reveal reveal-d2 mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <a href={BOOK_DEMO_HREF} className={btnPrimary}>
            {BOOK_DEMO_LABEL}
            <span aria-hidden="true" className={arrowNudge}>→</span>
          </a>
          <a href={`${base}technical-overview/`} className={btnGhostDark}>
            Read the technical overview
          </a>
        </div>
        <p className="reveal reveal-d3 mt-7 text-body-xs text-cream/50">
          Or email us directly at{' '}
          <a
            href={`mailto:${CONTACT_EMAIL}`}
            className="text-cream/80 underline decoration-lime/40 underline-offset-4 transition-colors duration-200 hover:text-lime focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-lime"
          >
            {CONTACT_EMAIL}
          </a>
        </p>
      </div>
    </section>
  );
}
