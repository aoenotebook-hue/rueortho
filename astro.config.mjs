// @ts-check
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import pagefind from 'astro-pagefind';
import tailwindcss from '@tailwindcss/vite';

// The site's address lives in exactly one place. `src/data/site.ts` is imported
// here as well as by the legal pages, so the canonical URLs, hreflang
// alternates, the sitemap, the RSS feeds, robots.txt, the QR codes and the
// printed address can never disagree with each other.
import { site } from './src/data/site.ts';

const SITE = site.origin;

/**
 * `https://host/about/` → `https://host/about`, leaving `https://host/` alone.
 *
 * @param {string} url
 * @returns {string}
 */
const withoutTrailingSlash = (url) =>
  url.endsWith('/') && new URL(url).pathname !== '/' ? url.slice(0, -1) : url;

export default defineConfig({
  site: SITE,
  output: 'static',
  trailingSlash: 'ignore',
  server: {
    host: '0.0.0.0',
    port: 3000,
  },

  /**
   * Astro hashes every inline script and style it emits, so the policy below
   * needs no 'unsafe-inline'. Notes on the non-obvious entries:
   *  - 'wasm-unsafe-eval': Pagefind runs its index in WebAssembly, and search
   *    silently fails without it.
   *  - fonts.googleapis.com is a *stylesheet* host, gstatic serves the fonts.
   *  - youtube-nocookie is only reached after a reader presses play on an
   *    ExerciseCard facade.
   */
  security: {
    csp: {
      directives: [
        "default-src 'self'",
        "img-src 'self' data:",
        "font-src 'self' https://fonts.gstatic.com",
        "frame-src https://www.youtube-nocookie.com",
        "connect-src 'self' https://cloudflareinsights.com",
        "base-uri 'none'",
        "form-action 'self'",
        "object-src 'none'",
      ],
      styleDirective: {
        resources: ["'self'", 'https://fonts.googleapis.com'],
      },
      scriptDirective: {
        resources: ["'self'", "'wasm-unsafe-eval'", 'https://static.cloudflareinsights.com'],
      },
    },
  },

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
    // The sitemap has to spell a URL the same way the canonical tag does, or
    // the two disagree about which address is the real one: no trailing slash,
    // and the same language tags the pages emit in their own `hreflang` links
    // and in `<html lang>`.
    sitemap({
      // `astro:sitemap` writes every URL with a trailing slash. The canonical
      // tags, the feeds and robots.txt all spell a page without one, and two
      // spellings of the same page is exactly what a sitemap is supposed to
      // settle, so each entry — and each of its language alternates — is
      // rewritten to match. The site root keeps its slash: an origin has to
      // end in one.
      serialize: (item) => ({
        ...item,
        url: withoutTrailingSlash(item.url),
        links: item.links?.map((link) => ({ ...link, url: withoutTrailingSlash(link.url) })),
      }),
      i18n: {
        defaultLocale: 'th',
        locales: { th: 'th', en: 'en' },
      },
      filter: (page) => !page.includes('/search'),
    }),
  ],

  vite: {
    plugins: [tailwindcss()],
    server: {
      allowedHosts: true,
    },
  },
});
