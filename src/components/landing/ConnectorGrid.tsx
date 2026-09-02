import { CONNECTORS, CATEGORIES } from '../../data/connectors';
import SectionHead from './SectionHead';
import { CONTACT_HREF } from './cta';
import { btnForest, card, arrowNudge } from './ui';

const base = import.meta.env.BASE_URL;

export default function ConnectorGrid() {
  return (
    <section
      id="catalogue"
      className="border-b border-cream-line py-24 sm:py-28"
      style={{
        background:
          'radial-gradient(ellipse 80% 60% at 15% 30%, rgba(129,215,19,0.06) 0%, transparent 60%), #F5F4EE',
      }}
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHead eyebrow="The full catalogue">
          Every connector, <em className="text-forest">ready on day one</em>
        </SectionHead>

        {CATEGORIES.map((cat) => {
          const items = CONNECTORS.filter((c) => c.cat === cat);
          return (
            <div key={cat} className="reveal mb-14 last:mb-0">
              <div className="mb-6 flex items-baseline justify-between gap-4 border-b border-cream-line pb-3">
                <h3 className="font-display text-2xl text-ink">{cat}</h3>
                <span className="font-mono text-caption uppercase tracking-[0.1em] text-ink-muted">
                  {items.length} connector{items.length === 1 ? '' : 's'}
                </span>
              </div>
              <ul className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
                {items.map((c) => (
                  <li
                    key={c.name}
                    className={`group flex items-center gap-4 p-4 ${card}`}
                  >
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-md border border-cream-line bg-cream p-2">
                      <img src={`${base}${c.file}`} alt="" loading="lazy" className="max-h-full max-w-full object-contain" />
                    </span>
                    <span className="min-w-0">
                      <span className="block truncate text-body font-semibold text-ink">{c.name}</span>
                      <span className="block truncate font-mono text-2xs uppercase tracking-[0.08em] text-ink-muted">
                        {c.kind}
                      </span>
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          );
        })}

        {/* universal API note */}
        <div className="reveal mt-16 flex flex-col items-start justify-between gap-6 rounded border border-forest/20 bg-mint p-8 sm:flex-row sm:items-center">
          <div>
            <h3 className="font-display text-2xl text-ink">Don&rsquo;t see your system?</h3>
            <p className="mt-2 max-w-lg text-body leading-[1.7] text-ink-soft">
              Conductor&rsquo;s universal REST API and generic connectors cover almost anything that can speak HTTP,
              SQL or files. Tell us what you need to move — we&rsquo;ll show you the fastest path.
            </p>
          </div>
          <a href={CONTACT_HREF} className={`group shrink-0 ${btnForest}`}>
            Talk to us
            <span aria-hidden="true" className={arrowNudge}>→</span>
          </a>
        </div>
      </div>
    </section>
  );
}
