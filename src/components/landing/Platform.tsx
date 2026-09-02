import SectionHead from './SectionHead';
import { CONNECTORS as ALL_CONNECTORS } from '../../data/connectors';
import { btnPrimary, btnGhostDark, arrowNudge } from './ui';

const base = import.meta.env.BASE_URL;

// Intro supplied by Eightwire (Sept 2026); Overview and Why Conductor carried over verbatim
// from eightwire.io/conductor ("an data expert" → "a data expert").
export const PLATFORM_LEDE =
  'A data management tool unlike any other. Conductor makes data integration simple, automating the majority of the effort, massively reducing costs and fixing data errors as it goes. It integrates with all major data storage platforms, and data is encrypted from source to destination.';

const OVERVIEW_TITLE = 'Traditionally, exchanging data has been a headache';
const OVERVIEW = [
  'It generally requires a data expert to spend some serious time designing how the process will work, and the costs can be eye watering. Conductor simplifies the process and speeds up the integration, so your team can focus on putting the data to work.',
  'Conductor automatically maps between disparate systems without requiring any manual intervention. When Conductor moves data between systems, it does a full rebuild of the table and fixes the common mistakes that will cause most data loads to fail.',
  'Data quality and business rules can be added by business users, reducing the need for long IT projects merging and migrating data. Conductor makes data management easy.',
];

const WHY = [
  { title: 'Automated', body: 'Conductor automates complex, cross-enterprise data exchange processes.' },
  { title: 'Secure', body: 'Authentication, authorisation, and encryption secure both parties’ proprietary data.' },
  { title: 'Transparent', body: 'You always know what’s happening and can highlight and avoid trouble before it hits.' },
  { title: 'Compliant', body: 'We meet user access, data sovereignty, governance, privacy, and security requirements out of the box.' },
];

interface Props {
  /** `teaser` = homepage overview band linking to /conductor/; `full` = overview + why on the page */
  variant?: 'full' | 'teaser';
  /** hide heading + lede when a PageHero already carries them */
  showHead?: boolean;
}

export default function Platform({ variant = 'full', showHead = true }: Props) {
  const teaser = variant === 'teaser';
  // keep the outline h1 > h2 when a PageHero owns the h1 and the section head is hidden
  const H: 'h2' | 'h3' = showHead ? 'h3' : 'h2';
  const Sub: 'h3' | 'h4' = showHead ? 'h4' : 'h3';
  const eyebrowClass = 'font-mono text-caption uppercase tracking-[0.14em] text-lime/80';

  return (
    <section
      id="platform"
      className="relative overflow-hidden py-24 sm:py-28"
      style={{
        background:
          'radial-gradient(ellipse 70% 60% at 85% 10%, rgba(129,215,19,0.08) 0%, transparent 60%), radial-gradient(ellipse 60% 70% at 5% 95%, rgba(20,80,65,0.4) 0%, transparent 60%), #050F09',
      }}
    >
      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        {showHead && (
          <>
            <SectionHead eyebrow="The platform" dark>
              Meet <em className="text-lime">Conductor</em>
            </SectionHead>
            <p className="reveal -mt-6 mb-14 max-w-2xl text-lede leading-[1.7] text-cream/65">{PLATFORM_LEDE}</p>
          </>
        )}

        {!teaser && (
          <article className="reveal grid gap-5 border-t border-cream/10 py-12 lg:grid-cols-[0.38fr_1fr] lg:gap-14 lg:py-16">
            <div>
              <p className={eyebrowClass}>Overview</p>
              <H className="mt-3 max-w-md font-display text-[clamp(1.6rem,2.6vw,2.2rem)] leading-[1.12] tracking-[-0.01em] text-cream [text-wrap:balance]">
                {OVERVIEW_TITLE}
              </H>
            </div>
            <div className="max-w-2xl space-y-5">
              {OVERVIEW.map((p) => (
                <p key={p.slice(0, 24)} className="text-body-lg leading-[1.75] text-cream/65">
                  {p}
                </p>
              ))}
            </div>
          </article>
        )}

        <div className={`reveal ${teaser ? '' : 'border-t border-cream/10 pt-12 lg:pt-16'}`}>
          <p className={`${eyebrowClass} mb-6`}>Why Conductor</p>
          <ul className="grid border-b border-cream/10 sm:grid-cols-2 lg:grid-cols-4" role="list">
            {WHY.map((w, i) => (
              <li
                key={w.title}
                className={`reveal reveal-d${i % 4} border-t border-cream/10 py-7 sm:odd:pr-8 sm:even:border-l sm:even:pl-8 lg:border-l lg:px-8 lg:first:border-l-0 lg:first:pl-0 lg:last:pr-0`}
              >
                {teaser ? (
                  <H className="font-display text-2xl text-cream">{w.title}</H>
                ) : (
                  <Sub className="font-display text-2xl text-cream">{w.title}</Sub>
                )}
                <p className="mt-3 max-w-xs text-body leading-[1.7] text-cream/60">{w.body}</p>
              </li>
            ))}
          </ul>
        </div>

        <div className="reveal mt-14 flex flex-wrap gap-3">
          {teaser ? (
            <>
              <a href={`${base}conductor/`} className={btnPrimary}>
                Explore Conductor
                <span aria-hidden="true" className={arrowNudge}>→</span>
              </a>
              <a href={`${base}connectors/`} className={btnGhostDark}>
                See all connectors
              </a>
            </>
          ) : (
            <>
              <a href={`${base}connectors/`} className={btnPrimary}>
                Explore all {ALL_CONNECTORS.length} connectors
                <span aria-hidden="true" className={arrowNudge}>→</span>
              </a>
              <a href={`${base}technical-overview/`} className={btnGhostDark}>
                Read the technical overview
              </a>
            </>
          )}
        </div>
      </div>
    </section>
  );
}
