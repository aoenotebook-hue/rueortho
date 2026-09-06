// @ts-check
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import pagefind from 'astro-pagefind';
import tailwindcss from '@tailwindcss/vite';

// TODO: replace with the real domain once it is registered at WordPress.com.
// This value drives canonical URLs, hreflang alternates, the sitemap and RSS,
// so it must be correct before launch.
const SITE = 'https://easyortho.com';

export default defineConfig({
  site: SITE,
  output: 'static',
  trailingSlash: 'ignore',

  i18n: {
    defaultLocale: 'th',
    locales: ['th', 'en'],
    routing: {
      prefixDefaultLocale: false,
    },
  },

  integrations: [
    mdx(),
    // Builds the Pagefind index from dist/ after each build. Pagefind reads
    // <html lang> and keeps a separate index per language, so a Thai search
    // returns Thai pages and an English search returns English ones.
    pagefind(),
    sitemap({
      i18n: {
        defaultLocale: 'th',
        locales: { th: 'th-TH', en: 'en' },
      },
      filter: (page) => !page.includes('/search'),
    }),
  ],

  vite: {
    plugins: [tailwindcss()],
  },
});
