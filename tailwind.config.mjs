/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        forest: { DEFAULT: '#145041', light: '#195a4a', dark: '#104638', darkest: '#0c372c' },
        lime: { DEFAULT: '#81D713', mid: '#71B51B', dark: '#5C9A10' },
        teal: { DEFAULT: '#0f766e', light: '#14b8a6' },
        mint: { DEFAULT: '#f0f9f5', deep: '#cdede2' },
        honeydew: '#d6e9e2',
        sage: '#b8cfc7',
        chocolate: { DEFAULT: '#a55e46', dark: '#6c3b2a' },
        'light-brown': '#e2d7cd',
      },
      fontFamily: {
        display: ['"DM Serif Display"', 'Georgia', 'serif'],
        body: ['"DM Sans"', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
    },
  },
  plugins: [],
};
