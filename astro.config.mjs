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
    server: {
      allowedHosts: true,
    },
  },
});
