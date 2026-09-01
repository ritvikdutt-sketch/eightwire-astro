import SectionHead from './SectionHead';
import { arrowNudge, focusForest } from './ui';

const base = import.meta.env.BASE_URL;

const PILLARS = [
  {
    title: 'Safe',
    body: 'All data is fully encrypted at rest and in transit, ensuring such stringent security that even Eightwire staff cannot access or view the data.',
    icon: <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />,
  },
  {
    title: 'Secure',
    body: 'We are committed to data security and meet the highest security thresholds required for data sharing.',
    icon: (
      <>
        <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
        <path d="M7 11V7a5 5 0 0 1 10 0v4" />
      </>
    ),
  },
  {
    title: 'Compliant',
    body: 'We have jumped through all the compliance hoops so you can start exchanging data from day one.',
    icon: (
      <>
        <path d="M9 11l3 3L22 4" />
        <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
      </>
    ),
  },
];

/** Trust pillars — moved from the Support page; lives on /security/. */
export default function TrustPillars() {
  return (
    <section
      className="border-b border-cream-line py-24 sm:py-28"
      style={{
        background:
          'radial-gradient(ellipse 80% 60% at 85% 40%, rgba(214,237,216,0.5) 0%, transparent 55%), #EDEBE2',
      }}
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHead eyebrow="Why Eightwire">
          Trusted by organisations <em className="text-forest">across New Zealand</em>
        </SectionHead>

        <div className="grid divide-y divide-forest/15 border-y border-forest/15 md:grid-cols-3 md:divide-x md:divide-y-0">
          {PILLARS.map((p, i) => (
            <article key={p.title} className={`reveal reveal-d${i} py-8 md:px-8 md:first:pl-0 md:last:pr-0`}>
              <span className="mb-6 flex h-11 w-11 items-center justify-center rounded border border-forest/20 bg-forest/5">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#145041" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  {p.icon}
                </svg>
              </span>
              <h3 className="mb-3 font-display text-2xl text-ink">{p.title}</h3>
              <p className="text-body leading-[1.7] text-ink-soft">{p.body}</p>
            </article>
          ))}
        </div>

        <p className="reveal mt-12 text-body-sm text-ink-soft">
          Questions about security?{' '}
          <a
            href={`${base}support/#faq`}
            className={`group inline-flex items-center gap-2 font-medium text-forest transition-colors duration-200 hover:text-forest-dark ${focusForest}`}
          >
            Read the FAQ <span aria-hidden="true" className={arrowNudge}>→</span>
          </a>
        </p>
      </div>
    </section>
  );
}
