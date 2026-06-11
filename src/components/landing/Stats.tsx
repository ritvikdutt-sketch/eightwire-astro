import { useEffect, useRef } from 'react';

const STATS = [
  { value: 20, suffix: '+', display: '20+', label: 'organisations connected' },
  { display: 'PMS', label: 'practice management systems integrated' },
  { value: 99.9, suffix: '%', decimals: 1, display: '99.9%', label: 'platform uptime, 12-month rolling' },
  { display: '12+ yrs', label: 'moving NZ’s most sensitive data' },
];

const easeOutExpo = (t: number) => (t === 1 ? 1 : 1 - Math.pow(2, -10 * t));

export default function Stats() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          obs.unobserve(entry.target);
          const el = entry.target as HTMLElement;
          const target = parseFloat(el.dataset.target || '');
          if (isNaN(target)) return;
          const suffix = el.dataset.suffix || '';
          const decimals = parseInt(el.dataset.decimals || '0');
          const start = performance.now();
          const tick = (now: number) => {
            const p = Math.min((now - start) / 2000, 1);
            const v = target * easeOutExpo(p);
            el.textContent = (decimals ? v.toFixed(decimals) : Math.round(v).toString()) + suffix;
            if (p < 1) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
        });
      },
      { threshold: 0.5 }
    );
    root.querySelectorAll('[data-target]').forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  return (
    <section className="border-t border-lime/10 bg-forest-deepest">
      <div ref={ref} className="mx-auto max-w-7xl px-5 sm:px-8">
        <p className="pt-14 text-center font-mono text-[11px] uppercase tracking-[0.18em] text-cream/40">
          Trusted by Aotearoa&rsquo;s most regulated sectors
        </p>
        <div className="mt-10 grid grid-cols-1 gap-px overflow-hidden bg-lime/10 sm:grid-cols-2 lg:grid-cols-4">
          {STATS.map((s, i) => (
            <div key={s.label} className="bg-forest-deepest px-7 py-9">
              <div
                className="font-display text-[clamp(2.9rem,4.5vw,3.9rem)] leading-none tracking-tight text-cream tabular-nums"
                {...(s.value != null
                  ? { 'data-target': s.value, 'data-suffix': s.suffix, 'data-decimals': s.decimals ?? 0 }
                  : {})}
              >
                {s.display}
              </div>
              <p className="mt-3 max-w-[24ch] text-[13.5px] leading-relaxed text-cream/55">{s.label}</p>
            </div>
          ))}
        </div>
      </div>
      <div aria-hidden="true" className="mt-14 h-px bg-gradient-to-r from-transparent via-lime/15 to-transparent" />
    </section>
  );
}
