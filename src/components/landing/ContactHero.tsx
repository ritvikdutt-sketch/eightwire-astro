import { useState } from 'react';
import { CONTACT_EMAIL } from './cta';
import { focusLime } from './ui';
import { useMotion } from '../../lib/motion';

const base = import.meta.env.BASE_URL;

// The one channel, addressed before the mail client opens. Presets are plain mailto links,
// so they work without JavaScript; hydration only adds the live SUBJECT line and the packet replay.
const SUBJECTS = ['Book a demo', 'Product support', 'Partnerships', 'Pricing'];

const mailto = (subject?: string) =>
  subject ? `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}` : `mailto:${CONTACT_EMAIL}`;

/** A short wire under the address: your message travelling into the Eightwire mark. */
function Wire({ animate, replay }: { animate: boolean; replay: number }) {
  return (
    <svg viewBox="0 0 420 24" fill="none" className="h-6 w-full max-w-[420px] overflow-visible" aria-hidden="true">
      <defs>
        <filter id="contact-packet-blur" x="-200%" y="-200%" width="500%" height="500%">
          <feGaussianBlur stdDeviation="2" />
        </filter>
      </defs>
      <g className={animate ? 'contact-wire' : undefined} style={{ transformBox: 'fill-box', transformOrigin: 'left center' }}>
        <path id="contact-wire-path" d="M 8 12 H 388" stroke="rgba(129,215,19,0.45)" strokeWidth="1" />
      </g>
      {animate ? (
        <g key={replay}>
          <circle r="5" fill="#81D713" opacity="0.35" filter="url(#contact-packet-blur)">
            <animateMotion dur="1.4s" begin="0.5s" fill="freeze" calcMode="spline" keySplines="0.4 0 0.2 1" keyPoints="0;1" keyTimes="0;1">
              <mpath href="#contact-wire-path" />
            </animateMotion>
          </circle>
          <circle r="2.2" fill="#C6F38B">
            <animateMotion dur="1.4s" begin="0.5s" fill="freeze" calcMode="spline" keySplines="0.4 0 0.2 1" keyPoints="0;1" keyTimes="0;1">
              <mpath href="#contact-wire-path" />
            </animateMotion>
          </circle>
        </g>
      ) : (
        <circle cx="388" cy="12" r="2.2" fill="#C6F38B" />
      )}
      <image href={`${base}eightwire-mark-dark.svg`} x="396" y="2" width="20" height="20" />
    </svg>
  );
}

export default function ContactHero() {
  const motion = useMotion();
  const [subject, setSubject] = useState<string | undefined>(undefined);
  const [replay, setReplay] = useState(0);

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

      <div className="relative mx-auto grid max-w-7xl gap-12 px-5 pb-20 pt-32 sm:px-8 lg:grid-cols-[1fr_1fr] lg:gap-16 lg:pb-24 lg:pt-40">
        <div className="min-w-0">
          <p className="rise inline-flex items-center gap-2.5 rounded-sm border border-lime/25 bg-lime/10 px-3.5 py-1.5 font-mono text-caption uppercase tracking-[0.14em] text-lime">
            Contact us
          </p>
          <h1 className="rise rise-d1 mt-6 max-w-lg font-display text-[clamp(2.4rem,5vw,3.6rem)] leading-[1.05] tracking-[-0.01em] text-cream [text-wrap:balance]">
            Talk to the <em className="text-lime">Eightwire</em> team
          </h1>
          <p className="rise rise-d2 mt-6 max-w-md text-lede leading-[1.7] text-cream/70">
            We&rsquo;re here to help! Feel free to reach out to us with any enquiries, feedback, or collaboration
            opportunities. We look forward to connecting with you.
          </p>
        </div>

        {/* One channel, pre-addressed */}
        <div className="rise rise-d3 min-w-0 lg:pt-4">
          <p className="border-t border-lime/30 pt-4 font-mono text-caption uppercase tracking-[0.16em] text-lime">
            Write to us
          </p>

          <a
            href={mailto(subject)}
            aria-label={`Email ${CONTACT_EMAIL}${subject ? ` about ${subject}` : ''}`}
            onMouseEnter={() => setReplay((n) => n + 1)}
            className={`group mt-5 block w-fit max-w-full break-words rounded-sm font-display text-[clamp(1.5rem,3.4vw,2.25rem)] leading-[1.15] tracking-[-0.01em] text-cream transition-[color,transform] duration-200 hover:text-lime active:scale-[0.97] motion-reduce:transition-none motion-reduce:transform-none ${focusLime}`}
          >
            {CONTACT_EMAIL}
          </a>

          <div className="mt-4">
            <Wire animate={motion} replay={replay} />
          </div>

          <p className="mt-8 font-mono text-caption uppercase tracking-[0.14em] text-cream/55" aria-live="polite">
            Subject <span className="ml-3 text-cream">{subject ?? '—'}</span>
          </p>
          <ul className="mt-3 flex flex-wrap gap-2.5" role="list">
            {SUBJECTS.map((s) => {
              const on = s === subject;
              return (
                <li key={s}>
                  <a
                    href={mailto(s)}
                    onMouseEnter={() => pick(s)}
                    onFocus={() => pick(s)}
                    className={`inline-flex min-h-[44px] items-center rounded-sm border px-4 font-mono text-caption uppercase tracking-[0.12em] text-cream transition-[border-color,transform] duration-200 hover:-translate-y-px hover:border-lime active:scale-[0.97] active:translate-y-0 motion-reduce:transition-none motion-reduce:transform-none ${
                      on ? 'border-lime' : 'border-cream/40'
                    } ${focusLime}`}
                  >
                    {s}
                  </a>
                </li>
              );
            })}
          </ul>
          <p className="mt-7 font-mono text-caption uppercase tracking-[0.14em] text-cream/55">We reply in 24&ndash;48 hours</p>
        </div>
      </div>

      <div aria-hidden="true" className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-lime/30 to-transparent" />
    </section>
  );
}
