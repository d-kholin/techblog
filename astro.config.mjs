// @ts-check

import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import { defineConfig } from 'astro/config';

import cloudflare from '@astrojs/cloudflare';

import { remarkAlert } from "remark-github-blockquote-alert";
import expressiveCode from 'astro-expressive-code';
// https://astro.build/config
export default defineConfig({
  site: 'https://example.com',
  integrations: [expressiveCode({
    themes: ['material-theme-lighter']}
  ), mdx(), sitemap() ],
  adapter: cloudflare(),
  markdown: {
    remarkPlugins: [remarkAlert],
  },
});