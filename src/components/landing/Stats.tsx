import { useEffect, useRef } from 'react';
import { CONNECTORS } from '../../data/connectors';

// Figures Eightwire already publishes (eightwire.io) or that come straight from this site's data.
const STATS = [
  { value: 100, suffix: '+', display: '100+', label: 'public and private organisations exchange data with Eightwire' },
  { display: 'Since 2015', label: 'making data sharing between enterprises simple and secure' },
  { value: CONNECTORS.length, display: String(CONNECTORS.length), label: 'connectors across databases, files, transfer and SaaS' },
  { value: 20, suffix: ' min', display: '20 min', label: 'as little as it takes to connect and begin exchanging data' },
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
        <p className="pt-14 text-center font-mono text-caption uppercase tracking-[0.18em] text-cream/55">
          Trusted to handle high-stakes data
        </p>
        <div className="mt-10 grid grid-cols-1 divide-y divide-lime/10 overflow-hidden sm:grid-cols-2 sm:gap-px sm:divide-y-0 sm:bg-lime/10 lg:grid-cols-4">
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
              <p className="mt-3 max-w-[24ch] text-body-xs leading-relaxed text-cream/55">{s.label}</p>
            </div>
          ))}
        </div>
      </div>
      <div aria-hidden="true" className="mt-14 h-px bg-gradient-to-r from-transparent via-lime/15 to-transparent" />
    </section>
  );
}
