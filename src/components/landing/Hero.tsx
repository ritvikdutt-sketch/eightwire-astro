import { btnPrimary, btnGhostDark, arrowNudge, focusLime } from './ui';
import { BOOK_DEMO_HREF, BOOK_DEMO_LABEL } from './cta';
import { useMotion } from '../../lib/motion';

const base = import.meta.env.BASE_URL;

// Each trust line links to the page that substantiates it.
const TRUST = [
  { label: 'Data locked to NZ or AU', href: `${base}security/#sovereignty` },
  { label: 'SOC 2 Type I & II', href: `${base}knowledge-base/certifications-and-accreditations/` },
];

// `short` is what the node shows on phones, where the whole diagram is ~half size — bigger type,
// fewer letters, so the boxes never sit empty.
const SOURCES = [
  { id: 'src-rds', label: 'sql_server', short: 'sql', y: 96 },
  { id: 'src-hl7', label: 'hubspot', short: 'hubspot', y: 188 },
  { id: 'src-nhi', label: 'excel', short: 'excel', y: 280 },
  { id: 'src-sftp', label: 'postgresql', short: 'postgres', y: 372 },
  { id: 'src-s3', label: 'sftp', short: 'sftp', y: 464 },
];

const DESTS = [
  { id: 'dst-registry', label: 'snowflake', short: 'snowflake', y: 152 },
  { id: 'dst-analytics', label: 'azure', short: 'azure', y: 280 },
  { id: 'dst-agency', label: 's3', short: 's3', y: 408 },
];

const MONO = "'JetBrains Mono', monospace";

// Wires converge into the Conductor node (left edge x=300) and fan out (right edge x=380)
const IN_PATHS = SOURCES.map((s, i) => ({
  id: `wire-in-${i}`,
  d: `M 132 ${s.y} C 215 ${s.y}, 220 ${268 + i * 6}, 300 ${268 + i * 6}`,
  dur: 3.2 + i * 0.7,
  begin: i * 0.9,
}));

const OUT_PATHS = DESTS.map((d, i) => ({
  id: `wire-out-${i}`,
  d: `M 380 ${272 + i * 8} C 460 ${272 + i * 8}, 465 ${d.y}, 548 ${d.y}`,
  dur: 3.6 + i * 0.8,
  begin: 1.1 + i * 1.2,
}));

function WireField({ animate }: { animate: boolean }) {
  return (
    <svg
      viewBox="0 0 680 560"
      fill="none"
      role="img"
      aria-label="Diagram of data flowing from systems such as SQL Server, HubSpot and Excel through Conductor to destinations such as Snowflake, Azure and S3"
      className="h-auto w-full"
    >
      <defs>
        <radialGradient id="hub-glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#81D713" stopOpacity="0.28" />
          <stop offset="100%" stopColor="#81D713" stopOpacity="0" />
        </radialGradient>
        <filter id="packet-blur" x="-200%" y="-200%" width="500%" height="500%">
          <feGaussianBlur stdDeviation="2.2" />
        </filter>
      </defs>

      {/* hub ambient glow */}
      <circle cx="340" cy="280" r="170" fill="url(#hub-glow)" />

      {/* wires */}
      {[...IN_PATHS, ...OUT_PATHS].map((p) => (
        <path key={p.id} id={p.id} d={p.d} stroke="rgba(129,215,19,0.16)" strokeWidth="1.25" />
      ))}

      {/* travelling packets */}
      {animate &&
        [...IN_PATHS, ...OUT_PATHS].map((p) => (
          <g key={`pk-${p.id}`}>
            <circle r="5" fill="#81D713" opacity="0.35" filter="url(#packet-blur)">
              <animateMotion dur={`${p.dur}s`} begin={`${p.begin}s`} repeatCount="indefinite" calcMode="spline" keySplines="0.4 0 0.6 1" keyPoints="0;1" keyTimes="0;1">
                <mpath href={`#${p.id}`} />
              </animateMotion>
            </circle>
            <circle r="2.2" fill="#C6F38B">
              <animateMotion dur={`${p.dur}s`} begin={`${p.begin}s`} repeatCount="indefinite" calcMode="spline" keySplines="0.4 0 0.6 1" keyPoints="0;1" keyTimes="0;1">
                <mpath href={`#${p.id}`} />
              </animateMotion>
            </circle>
          </g>
        ))}

      {/* source nodes */}
      {SOURCES.map((s) => (
        <g key={s.id}>
          <rect x="28" y={s.y - 16} width="104" height="32" rx="3" fill="#0A1F14" stroke="rgba(129,215,19,0.22)" />
          <circle cx="44" cy={s.y} r="2.5" fill="#81D713" className="max-sm:hidden">
            {animate && <animate attributeName="opacity" values="1;0.25;1" dur="2.4s" repeatCount="indefinite" begin={`${s.y / 200}s`} />}
          </circle>
          <text x="56" y={s.y + 3.5} className="max-sm:hidden" fontFamily={MONO} fontSize="11" fill="rgba(245,244,238,0.72)">
            {s.label}
          </text>
          <text x="36" y={s.y + 6} className="sm:hidden" fontFamily={MONO} fontSize="18" fill="rgba(245,244,238,0.85)">
            {s.short}
          </text>
        </g>
      ))}

      {/* destination nodes */}
      {DESTS.map((d) => (
        <g key={d.id}>
          <rect x="548" y={d.y - 16} width="112" height="32" rx="3" fill="#0A1F14" stroke="rgba(129,215,19,0.22)" />
          <text x="564" y={d.y + 3.5} className="max-sm:hidden" fontFamily={MONO} fontSize="11" fill="rgba(245,244,238,0.72)">
            {d.label}
          </text>
          <text x="554" y={d.y + 6} className="sm:hidden" fontFamily={MONO} fontSize="18" fill="rgba(245,244,238,0.85)">
            {d.short}
          </text>
          <circle cx="648" cy={d.y} r="2.5" fill="#81D713" className="max-sm:hidden" />
        </g>
      ))}

      {/* Conductor hub */}
      <g>
        {animate && (
          <>
            <circle cx="340" cy="280" r="44" stroke="rgba(129,215,19,0.35)" strokeWidth="1">
              <animate attributeName="r" values="44;76" dur="2.8s" repeatCount="indefinite" />
              <animate attributeName="opacity" values="0.55;0" dur="2.8s" repeatCount="indefinite" />
            </circle>
            <circle cx="340" cy="280" r="44" stroke="rgba(129,215,19,0.35)" strokeWidth="1">
              <animate attributeName="r" values="44;76" dur="2.8s" begin="1.4s" repeatCount="indefinite" />
              <animate attributeName="opacity" values="0.55;0" dur="2.8s" begin="1.4s" repeatCount="indefinite" />
            </circle>
          </>
        )}
        <rect x="300" y="240" width="80" height="80" rx="10" fill="#0A1F14" stroke="rgba(129,215,19,0.55)" strokeWidth="1.25" />
        <rect x="308" y="248" width="64" height="64" rx="7" fill="rgba(129,215,19,0.07)" />
        {/* Eightwire mark */}
        <image href={`${base}eightwire-mark-dark.svg`} x="316" y="256" width="48" height="48" />
        <text x="340" y="342" className="max-sm:hidden" textAnchor="middle" fontFamily={MONO} fontSize="11" letterSpacing="2" fill="#81D713">
          CONDUCTOR
        </text>
        <text x="340" y="346" className="sm:hidden" textAnchor="middle" fontFamily={MONO} fontSize="16" letterSpacing="2" fill="#81D713">
          CONDUCTOR
        </text>
      </g>
    </svg>
  );
}

export default function Hero() {
  // packets only travel while motion is welcome: OS preference + the site's pause switch
  const motion = useMotion();

  return (
    <section className="relative overflow-hidden bg-forest-deepest" id="top">
      {/* layered atmosphere */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 75% 55% at 72% 42%, rgba(129,215,19,0.10) 0%, transparent 60%), radial-gradient(ellipse 60% 70% at 12% 88%, rgba(20,80,65,0.45) 0%, transparent 65%), radial-gradient(ellipse 50% 40% at 38% 8%, rgba(20,80,65,0.35) 0%, transparent 70%)',
        }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.55]"
        style={{
          backgroundImage:
            'linear-gradient(to right, rgba(129,215,19,0.045) 1px, transparent 1px), linear-gradient(to bottom, rgba(129,215,19,0.045) 1px, transparent 1px)',
          backgroundSize: '72px 72px',
          maskImage: 'radial-gradient(ellipse 90% 80% at 60% 40%, black 20%, transparent 75%)',
          WebkitMaskImage: 'radial-gradient(ellipse 90% 80% at 60% 40%, black 20%, transparent 75%)',
        }}
      />

      <div className="relative mx-auto grid max-w-7xl items-center gap-14 px-5 pb-20 pt-32 sm:px-8 lg:grid-cols-[1.05fr_1fr] lg:gap-10 lg:pb-28 lg:pt-44">
        <div className="min-w-0">
          <h1 className="rise rise-d1 max-w-xl font-display text-[clamp(2.6rem,6.2vw,4.6rem)] leading-[1.04] tracking-[-0.01em] text-cream [text-wrap:balance]">
            Secure data exchange for <em className="text-lime">Aotearoa&rsquo;s</em> high&#8209;stakes sectors
          </h1>

          <p className="rise rise-d2 mt-6 max-w-md text-lede leading-[1.7] text-cream/70">
            Conductor by Eightwire moves sensitive data between health, government and enterprise systems.
            No custom code. No manual handling. No sovereignty compromises.
          </p>

          <div className="rise rise-d3 mt-9 flex flex-wrap gap-3">
            <a href={BOOK_DEMO_HREF} className={btnPrimary}>
              {BOOK_DEMO_LABEL}
              <span aria-hidden="true" className={arrowNudge}>&rarr;</span>
            </a>
            <a href={`${base}conductor/`} className={btnGhostDark}>
              See how Conductor works
            </a>
          </div>

          <div className="rise rise-d4 mt-10 flex flex-wrap gap-x-7 gap-y-3 text-body-xs text-cream/75">
            {TRUST.map((t) => (
              <a
                key={t.label}
                href={t.href}
                className={`inline-flex items-center gap-2 rounded-sm underline-offset-4 transition-colors duration-200 hover:text-lime hover:underline ${focusLime}`}
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="#81D713" strokeWidth="2.5" className="h-3.5 w-3.5 shrink-0" aria-hidden="true">
                  <path d="M20 6L9 17l-5-5" />
                </svg>
                {t.label}
              </a>
            ))}
          </div>
        </div>

        <div className="rise rise-d2 relative">
          <WireField animate={motion} />
          <p className="mt-2 flex items-center justify-center gap-2 font-mono text-caption uppercase tracking-[0.14em] text-cream/55">
            <span className="h-1.5 w-1.5 rounded-full bg-lime motion-safe:animate-pulse-dot" aria-hidden="true" />
            How data moves through Conductor
          </p>
        </div>
      </div>

      {/* bottom hairline */}
      <div aria-hidden="true" className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-lime/30 to-transparent" />
    </section>
  );
}
