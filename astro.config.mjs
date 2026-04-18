// @ts-check

import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import { defineConfig, fontProviders } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  site: 'https://weizuSANN.github.io',
  base: '/KisaragiBlog',
  integrations: [mdx(), sitemap()],

  fonts: [],

  vite: {
    plugins: [tailwindcss()],
  },
});