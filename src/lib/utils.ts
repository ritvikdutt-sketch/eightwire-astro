import { clsx, type ClassValue } from 'clsx';
import { extendTailwindMerge } from 'tailwind-merge';

// tailwind-merge only knows Tailwind's default type scale; without this it files our
// fontSize tokens (tailwind.config.mjs) under text-colour and drops them next to text-ink.
const twMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      'font-size': [{ text: ['2xs', 'caption', 'label', 'body-xs', 'body-sm', 'body', 'body-lg', 'lede', 'h-card'] }],
    },
  },
});

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
