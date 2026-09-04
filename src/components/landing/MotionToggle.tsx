import { useMotionPaused } from '../../lib/motion';

interface Props {
  /** `dark` for the footer, `light` for the mobile drawer */
  tone?: 'dark' | 'light';
}

/** Pause / play every decorative animation on the site (WCAG 2.2.2). Used inside React islands;
 *  the static footer renders the same control as plain markup wired by LandingLayout's inline script. */
export default function MotionToggle({ tone = 'light' }: Props) {
  const [paused, setPaused] = useMotionPaused();
  const colours =
    tone === 'dark'
      ? 'text-cream/55 hover:text-lime focus-visible:outline-lime'
      : 'text-ink-muted hover:text-forest focus-visible:outline-forest';
  return (
    <button
      type="button"
      aria-pressed={paused}
      onClick={() => setPaused(!paused)}
      className={`inline-flex min-h-[44px] items-center gap-2 rounded-sm font-mono text-caption uppercase tracking-[0.14em] transition-colors duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 ${colours}`}
    >
      <span aria-hidden="true" className="text-[13px] leading-none">{paused ? '▶' : '❚❚'}</span>
      {paused ? 'Play motion' : 'Pause motion'}
    </button>
  );
}
