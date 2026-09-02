import { useEffect, useState } from 'react';
import { CONTACT_EMAIL } from './cta';
import { focusLime } from './ui';

const base = import.meta.env.BASE_URL;

// The one channel, addressed before the mail client opens. Presets are plain mailto links,
// so they work without JavaScript; hydration only adds the live SUBJECT line and the packet replay.
const SUBJECTS = ['Book a demo', 'Product support', 'Partnerships', 'Pricing'];

const mailto = (subject?: string) =>
  subject ? `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}` : `mailto:${CONTACT_EMAIL}`;

/** One wire from "you" into the Eightwire mark; the packet is your message. */
function Wire({ animate, replay }: { animate: boolean; replay: number }) {
  return (
    <svg viewBox="0 0 1000 72" fill="none" className="h-auto w-full overflow-visible" aria-hidden="true">
      <defs>
        <filter id="contact-packet-blur" x="-200%" y="-200%" width="500%" height="500%">
          <feGaussianBlur stdDeviation="2.4" />
        </filter>
      </defs>
      {/* you */}
      <circle cx="14" cy="36" r="4" fill="#F5F4EE" />
      <text x="28" y="40" fontFamily="'JetBrains Mono', monospace" fontSize="11" letterSpacing="1.5" fill="rgba(245,244,238,0.6)">
        YOU
      </text>
      {/* the wire draws in from you (scaleX, transform only) */}
      <g className={animate ? 'contact-wire' : undefined} style={{ transformBox: 'fill-box', transformOrigin: 'left center' }}>
        <path id="contact-wire-path" d="M 72 36 H 928" stroke="rgba(129,215,19,0.6)" strokeWidth="1" />
      </g>
      {/* the packet — remounting the group restarts the SMIL animation */}
      {animate ? (
        <g key={replay}>
          <circle r="6" fill="#81D713" opacity="0.4" filter="url(#contact-packet-blur)">
            <animateMotion dur="1.6s" begin="0.7s" fill="freeze" calcMode="spline" keySplines="0.4 0 0.2 1" keyPoints="0;1" keyTimes="0;1">
              <mpath href="#contact-wire-path" />
            </animateMotion>
          </circle>
          <circle r="2.6" fill="#C6F38B">
            <animateMotion dur="1.6s" begin="0.7s" fill="freeze" calcMode="spline" keySplines="0.4 0 0.2 1" keyPoints="0;1" keyTimes="0;1">
              <mpath href="#contact-wire-path" />
            </animateMotion>
          </circle>
        </g>
      ) : (
        <circle cx="928" cy="36" r="2.6" fill="#C6F38B" />
      )}
      {/* the mark — where the wire ends */}
      <rect x="940" y="8" width="56" height="56" rx="8" fill="#0A1F14" stroke="rgba(129,215,19,0.55)" strokeWidth="1.25" />
      <image href={`${base}eightwire-mark-dark.svg`} x="950" y="18" width="36" height="36" />
    </svg>
  );
}

export default function ContactHero() {
  const [reduced, setReduced] = useState(false);
  const [subject, setSubject] = useState<string | undefined>(undefined);
  const [replay, setReplay] = useState(0);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReduced(mq.matches);
    const onChange = (e: MediaQueryListEvent) => setReduced(e.matches);
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);

  const pick = (s: string) => {
    if (s !== subject) {
      setSubject(s);
      setReplay((n) => n + 1);
    }
  };

  return (
    <section className="relative overflow-hidden bg-forest-night" id="top">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 60% 50% at 85% 20%, rgba(129,215,19,0.08) 0%, transparent 60%), radial-gradient(ellipse 60% 70% at 5% 95%, rgba(20,80,65,0.45) 0%, transparent 65%)',
        }}
      />

      <div className="relative mx-auto max-w-7xl px-5 pb-16 pt-32 sm:px-8 lg:pb-20 lg:pt-40">
        <p className="rise inline-flex items-center gap-2.5 rounded-sm border border-lime/25 bg-lime/10 px-3.5 py-1.5 font-mono text-caption uppercase tracking-[0.14em] text-lime">
          Contact us
        </p>
        <h1 className="rise rise-d1 mt-6 font-display text-[2.25rem] leading-[1.1] tracking-[-0.01em] text-cream">
          Talk to the Eightwire team
        </h1>
        <p className="rise rise-d2 mt-4 max-w-xl text-lede leading-[1.7] text-cream/70">
          We&rsquo;re here to help! Feel free to reach out to us with any enquiries, feedback, or collaboration
          opportunities. We look forward to connecting with you.
        </p>

        {/* the wire */}
        <div className="rise rise-d3 mt-14 sm:mt-16">
          <Wire animate={!reduced} replay={replay} />
          <p className="mt-2 text-right font-mono text-caption uppercase tracking-[0.14em] text-cream/60">
            1 Queens Wharf, Wellington
          </p>
        </div>

        {/* the monument — the address is the largest object on the page */}
        <a
          href={mailto(subject)}
          aria-label={`Email ${CONTACT_EMAIL}${subject ? ` about ${subject}` : ''}`}
          onMouseEnter={() => setReplay((n) => n + 1)}
          className={`group mt-4 block w-fit rounded-sm font-display text-[clamp(2.75rem,8.5vw,8rem)] leading-[0.95] tracking-[-0.03em] text-cream ${focusLime}`}
        >
          <span className="rise rise-d3 block">support</span>
          <span className="rise rise-d4 block">
            <em className="text-lime transition-colors duration-200 group-hover:text-[#C6F38B]">@</em>eight-wire
          </span>
          <span className="rise rise-d4 block text-cream/85 transition-colors duration-200 group-hover:text-cream">.com</span>
        </a>

        {/* the router — pick the conversation, the address is pre-addressed */}
        <div className="rise rise-d4 mt-10 max-w-2xl">
          <p className="font-mono text-caption uppercase tracking-[0.14em] text-cream/60" aria-live="polite">
            Subject <span className="ml-3 text-cream">{subject ?? '—'}</span>
          </p>
          <ul className="mt-4 flex flex-wrap gap-2.5" role="list">
            {SUBJECTS.map((s) => {
              const on = s === subject;
              return (
                <li key={s}>
                  <a
                    href={mailto(s)}
                    onMouseEnter={() => pick(s)}
                    onFocus={() => pick(s)}
                    data-active={on ? '' : undefined}
                    className={`inline-flex min-h-[44px] items-center rounded-sm border px-4 font-mono text-caption uppercase tracking-[0.12em] text-cream transition-[border-color,transform] duration-200 hover:-translate-y-px hover:border-lime data-[active]:border-lime ${
                      on ? 'border-lime' : 'border-cream/25'
                    } ${focusLime}`}
                  >
                    {s}
                  </a>
                </li>
              );
            })}
          </ul>
          <p className="mt-8 font-mono text-caption uppercase tracking-[0.14em] text-cream/60">We reply from Wellington</p>
        </div>
      </div>

      <div aria-hidden="true" className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-lime/30 to-transparent" />
    </section>
  );
}
