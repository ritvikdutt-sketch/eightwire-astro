import type { ReactNode } from 'react';

interface Props {
  eyebrow: string;
  dark?: boolean;
  children: ReactNode; // heading content
}

export default function SectionHead({ eyebrow, dark = false, children }: Props) {
  return (
    <div className="reveal mb-14 grid gap-5 sm:mb-16 lg:grid-cols-[0.38fr_1fr] lg:gap-14">
      <p
        className={`self-start border-t pt-3 font-mono text-caption uppercase tracking-[0.16em] ${
          dark ? 'border-lime/60 text-lime' : 'border-forest text-forest'
        }`}
      >
        {eyebrow}
      </p>
      <h2
        className={`max-w-3xl font-display text-[clamp(2rem,4vw,3.25rem)] leading-[1.08] tracking-[-0.01em] [text-wrap:balance] ${
          dark ? 'text-cream' : 'text-ink'
        }`}
      >
        {children}
      </h2>
    </div>
  );
}
