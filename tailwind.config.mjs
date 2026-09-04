import animate from 'tailwindcss-animate';

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        forest: { DEFAULT: '#145041', light: '#195a4a', dark: '#104638', darkest: '#0c372c', night: '#0A1F14', deepest: '#050F09' },
        lime: { DEFAULT: '#81D713', mid: '#71B51B', dark: '#5C9A10' },
        teal: { DEFAULT: '#0f766e', light: '#14b8a6' },
        mint: { DEFAULT: '#f0f9f5', deep: '#cdede2' },
        honeydew: '#d6e9e2',
        sage: '#b8cfc7',
        chocolate: { DEFAULT: '#a55e46', dark: '#6c3b2a' },
        'light-brown': '#e2d7cd',
        cream: { DEFAULT: '#F5F4EE', dark: '#EDEBE2', line: '#DDDAD0' },
        // ink.muted darkened from #69716C so 11px labels clear 4.5:1 on cream-dark and tinted sections
        ink: { DEFAULT: '#0B100D', soft: '#2A322D', muted: '#626A65' },
        // shadcn-style semantic tokens used by src/components/ui/*, mapped onto the palette above
        background: '#F5F4EE',
        foreground: '#0B100D',
        muted: { DEFAULT: '#EDEBE2', foreground: '#69716C' },
        accent: { DEFAULT: '#EDEBE2', foreground: '#145041' },
        popover: { DEFAULT: '#FFFFFF', foreground: '#0B100D' },
        primary: { DEFAULT: '#81D713', foreground: '#050F09' },
        border: '#DDDAD0',
        input: '#DDDAD0',
        ring: '#145041',
      },
      fontFamily: {
        display: ['"DM Serif Display"', 'Georgia', 'serif'],
        body: ['"DM Sans"', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      // Type scale — sizes only (line-height stays where each usage sets it),
      // so tokens are drop-in equal to the arbitrary values they replace.
      fontSize: {
        '2xs': '10.5px',   // smallest mono badge
        'caption': '11px', // mono eyebrows, labels, badges
        'label': '12px',   // nav links, code chips
        'body-xs': '13px', // compact UI text
        'body-sm': '14px', // buttons, footer links
        'body': '14.5px',  // card body copy
        'body-lg': '15.5px', // section ledes (small)
        'lede': '17px',    // hero/section ledes
        'h-card': '22px',  // card headings
      },
      boxShadow: {
        'card': '0 1px 2px rgba(11,16,13,0.04), 0 8px 24px -8px rgba(20,80,65,0.12)',
        'card-hover': '0 2px 4px rgba(11,16,13,0.05), 0 20px 48px -12px rgba(20,80,65,0.22)',
        'lime-glow': '0 0 0 1px rgba(129,215,19,0.25), 0 8px 40px -8px rgba(129,215,19,0.35)',
        'panel': 'inset 0 1px 0 rgba(129,215,19,0.10), 0 0 0 1px rgba(129,215,19,0.07), 0 32px 80px -24px rgba(0,0,0,0.65)',
      },
      keyframes: {
        marquee: {
          from: { transform: 'translateX(0)' },
          to: { transform: 'translateX(-50%)' },
        },
        'pulse-dot': {
          '0%, 100%': { opacity: '1', transform: 'scale(1)' },
          '50%': { opacity: '0.3', transform: 'scale(0.7)' },
        },
        dropdown: {
          from: { opacity: '0', transform: 'translateY(-6px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
      },
      animation: {
        marquee: 'marquee 36s linear infinite',
        'pulse-dot': 'pulse-dot 2s ease-in-out infinite',
        dropdown: 'dropdown 0.18s cubic-bezier(0.22, 1, 0.36, 1) both',
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },
    },
  },
  plugins: [animate],
};
