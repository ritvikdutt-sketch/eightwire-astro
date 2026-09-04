import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';

// Retired routes (/solutions/, /support/, /platform/, /customer-stories/) are real pages built on
// src/layouts/Redirect.astro so they carry <html lang="en">; they are kept out of the sitemap.
const RETIRED = /\/(solutions|support|platform|customer-stories)\/$/;

export default defineConfig({
  site: 'https://ritvikdutt-sketch.github.io',
  base: '/eightwire-astro/',
  integrations: [tailwind(), react(), sitemap({ filter: (page) => !RETIRED.test(page) })],
  devToolbar: { enabled: false },
});
