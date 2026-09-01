import SectionHead from './SectionHead';
import { CONNECTORS as ALL_CONNECTORS } from '../../data/connectors';
import { btnPrimary, btnGhostDark, arrowNudge } from './ui';

const base = import.meta.env.BASE_URL;

export const PLATFORM_LEDE =
  'A no-code data exchange platform built specifically for the systems, formats and regulations of New Zealand health, government and social sector data.';

const PILLARS = [
  {
    num: 'PILLAR 01',
    title: 'No-code data exchange',
    body: 'Visual flow builder. Connect systems, map fields, schedule transfers without writing a line of code. Engineers stay focused on harder problems.',
  },
  {
    num: 'PILLAR 02',
    title: 'NZ-native integrations',
    body: 'Pre-built connectors for Indici, Medicly, NHI, HL7, SFTP, S3, REST. We speak the formats your sector already uses.',
    code: true,
  },
  {
    num: 'PILLAR 03',
    title: 'Governance by default',
    body: 'Every transfer logged. Every transformation auditable. Built for OIA, Privacy Act 2020 and NZISM-aligned operations from day one.',
  },
  {
    num: 'PILLAR 04',
    title: 'Hosted in Aotearoa',
    body: 'Infrastructure in NZ. Data stays in NZ. Your sovereignty story is one sentence long, not a 40-page architecture diagram.',
  },
];

const CONNECTORS = ['Indici', 'Medicly', 'NHI', 'HL7', 'SFTP', 'S3', 'REST'];

interface Props {
  /** `teaser` = homepage overview band linking to /platform/; `full` = pillar cards on the page */
  variant?: 'full' | 'teaser';
  /** hide heading + lede when a PageHero already carries them */
  showHead?: boolean;
}

export default function Platform({ variant = 'full', showHead = true }: Props) {
  const teaser = variant === 'teaser';
  // keep the outline h1 > h2 when a PageHero owns the h1 and the section head is hidden
  const H: 'h2' | 'h3' = showHead ? 'h3' : 'h2';
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
            <p className="reveal -mt-6 mb-14 max-w-xl text-lede leading-[1.7] text-cream/65">{PLATFORM_LEDE}</p>
          </>
        )}

        {teaser ? (
          <ul className="reveal grid gap-x-12 gap-y-6 border-t border-cream/10 pt-8 sm:grid-cols-2">
            {PILLARS.map((p) => (
              <li key={p.num} className="flex items-baseline gap-4">
                <span className="shrink-0 font-mono text-caption tracking-[0.1em] text-lime">{p.num}</span>
                <span className="font-display text-h-card leading-snug text-cream">{p.title}</span>
              </li>
            ))}
          </ul>
        ) : (
          <div className="grid gap-4 md:grid-cols-2">
            {PILLARS.map((p, i) => (
              <article
                key={p.num}
                className={`reveal reveal-d${i % 2} group relative rounded border border-cream/10 border-l-2 border-l-lime/40 bg-cream/[0.04] p-8 transition-[transform,border-color,background-color] duration-300 hover:-translate-y-0.5 hover:border-l-lime hover:bg-cream/[0.06]`}
              >
                <p className="mb-6 font-mono text-caption tracking-[0.1em] text-lime">{p.num}</p>
                <H className="mb-3 font-display text-h-card leading-snug text-cream">{p.title}</H>
                {p.code ? (
                  <p className="text-body leading-[1.8] text-cream/60">
                    Pre-built connectors for{' '}
                    {CONNECTORS.map((c, j) => (
                      <span key={c}>
                        <code className="rounded-sm bg-lime/10 px-1.5 py-0.5 font-mono text-label text-lime">{c}</code>
                        {j < CONNECTORS.length - 1 ? ', ' : '. '}
                      </span>
                    ))}
                    We speak the formats your sector already uses.
                  </p>
                ) : (
                  <p className="text-body leading-[1.7] text-cream/60">{p.body}</p>
                )}
              </article>
            ))}
          </div>
        )}

        <div className="reveal mt-14 flex flex-wrap gap-3">
          {teaser ? (
            <>
              <a href={`${base}platform/`} className={btnPrimary}>
                Explore the platform
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
