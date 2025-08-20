// @ts-check

import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import { defineConfig } from 'astro/config';

import cloudflare from '@astrojs/cloudflare';

import { remarkAlert } from "remark-github-blockquote-alert";
// https://astro.build/config
export default defineConfig({
  site: 'https://example.com',
  integrations: [mdx(), sitemap()],
  adapter: cloudflare(),
  markdown: {
    remarkPlugins: [remarkAlert],
  },
});