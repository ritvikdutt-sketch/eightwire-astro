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
        ink: { DEFAULT: '#0B100D', soft: '#2A322D', muted: '#69716C' },
      },
      fontFamily: {
        display: ['"DM Serif Display"', 'Georgia', 'serif'],
        body: ['"DM Sans"', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
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
        'ring-pulse': {
          '0%': { transform: 'scale(0.6)', opacity: '0.5' },
          '100%': { transform: 'scale(1.6)', opacity: '0' },
        },
      },
      animation: {
        marquee: 'marquee 36s linear infinite',
        'pulse-dot': 'pulse-dot 2s ease-in-out infinite',
        'ring-pulse': 'ring-pulse 2.6s ease-out infinite',
      },
    },
  },
  plugins: [],
};
