import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import react from '@astrojs/react';

export default defineConfig({
  site: 'https://ritvikdutt-sketch.github.io',
  base: '/eightwire-astro/',
  integrations: [tailwind(), react()],
  devToolbar: { enabled: false },
  // Retired routes keep working: destinations carry the base path.
  redirects: {
    '/customer-stories/': '/eightwire-astro/',
    '/platform/': '/eightwire-astro/conductor/',
    '/solutions/': '/eightwire-astro/',
    '/support/': '/eightwire-astro/knowledge-base/',
  },
});
