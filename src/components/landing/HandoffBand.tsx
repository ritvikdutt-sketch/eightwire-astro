import type { ReactNode } from 'react';
import SectionHead from './SectionHead';
import { btnGhostDark, arrowNudge } from './ui';

interface Props {
  eyebrow: string;
  lede?: string;
  cta: { label: string; href: string };
  children: ReactNode; // heading content
}

/** Dark wayfinding band — hands a product page off to a related page (e.g. Medicly → Conductor). */
export default function HandoffBand({ eyebrow, lede, cta, children }: Props) {
  return (
    <section
      className="relative overflow-hidden border-b border-lime/10 py-24 sm:py-28"
      style={{
        background:
          'radial-gradient(ellipse 70% 60% at 85% 20%, rgba(129,215,19,0.08) 0%, transparent 60%), #0A1F14',
      }}
    >
      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHead eyebrow={eyebrow} dark lede={lede}>
          {children}
        </SectionHead>
        <div className="reveal -mt-6 grid lg:grid-cols-[0.38fr_1fr] lg:gap-14">
          <div className="hidden lg:block" aria-hidden="true" />
          <div>
            <a href={cta.href} className={`group ${btnGhostDark}`}>
              {cta.label}
              <span aria-hidden="true" className={arrowNudge}>→</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
