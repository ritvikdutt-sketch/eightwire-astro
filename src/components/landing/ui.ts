// Shared System-A class recipes — one source of truth for buttons and cards.
// Plain constants (not components) so they interpolate into .astro and .tsx alike.

export const focusLime =
  'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-lime';
export const focusForest =
  'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-forest';

/** Primary lime button — standard size, dark or light background. */
export const btnPrimary = `group inline-flex items-center gap-2 rounded-sm bg-lime px-6 py-3 text-body-sm font-semibold text-forest-deepest transition-[transform,box-shadow] duration-200 hover:shadow-lime-glow active:scale-[0.97] ${focusLime}`;

/** Forest-green primary for light backgrounds where lime would shout. */
export const btnForest = `group inline-flex items-center gap-2 rounded-sm bg-forest px-6 py-3 text-body-sm font-semibold text-cream transition-[transform,box-shadow] duration-200 hover:shadow-card-hover active:scale-[0.97] ${focusForest}`;

/** Hairline outline button on dark surfaces. */
export const btnGhostDark = `inline-flex items-center gap-2 rounded-sm border border-cream/25 px-6 py-3 text-body-sm font-medium text-cream/85 transition-colors duration-200 hover:border-cream/50 hover:text-cream active:scale-[0.97] ${focusLime}`;

/** White card on light sections — hover lifts 0.5, tints border. */
export const card =
  'rounded border border-cream-line bg-white shadow-card transition-[transform,box-shadow,border-color] duration-300 hover:-translate-y-0.5 hover:border-forest/40 hover:shadow-card-hover';

/** Card without interactive states (static info panels). */
export const cardStatic = 'rounded border border-cream-line bg-white shadow-card';

/** Arrow glyph nudge inside a `group` button. */
export const arrowNudge = 'transition-transform duration-200 group-hover:translate-x-1';
