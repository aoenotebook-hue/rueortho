// @ts-check
import { readdirSync, readFileSync } from 'node:fs';

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
 * Slugs of articles the author has not finished, read straight off the MDX
 * frontmatter.
 *
 * A production build never renders these, so the sitemap filter below is a
 * no-op there. A **preview** build does render them — that is the whole point,
 * the author reviews his drafts on a deployed URL — and each draft page carries
 * `noindex, nofollow`. Listing a page in a sitemap while telling robots not to
 * index it is a contradiction, so they are dropped from the sitemap too.
 *
 * Read here rather than through `getCollection`, because the sitemap
 * integration is configured before the content layer is available. It is a
 * plain frontmatter scan: no MDX is parsed, and a file the regex cannot read is
 * treated as published, which is the safe direction — a published article
 * missing from the sitemap would be the worse failure.
 *
 * **Keyed by locale, not by slug.** Both languages share a slug on purpose, and
 * only one of the pair may be a draft — an article written in Thai before its
 * English translation is reviewed, say. Storing the bare slug dropped the
 * published counterpart from the sitemap along with the draft.
 */
const draftSlugs = (() => {
  const root = new URL('./src/content/', import.meta.url);
  const slugs = new Set();
  for (const collection of readdirSync(root, { withFileTypes: true })) {
    if (!collection.isDirectory()) continue;
    for (const locale of ['th', 'en']) {
      const dir = new URL(`${collection.name}/${locale}/`, root);
      let files;
      try {
        files = readdirSync(dir);
      } catch {
        continue;
      }
      for (const file of files) {
        if (!file.endsWith('.mdx')) continue;
        const head = readFileSync(new URL(file, dir), 'utf8').split('---')[1] ?? '';
        if (!/^draft:\s*true\s*$/m.test(head)) continue;
        const slug = head.match(/^slug:\s*['"]?([\w-]+)/m)?.[1];
        const prefix = locale === 'en' ? '/en' : '';
        if (slug) slugs.add(`${prefix}/${collection.name}/${slug}`);
      }
    }
  }
  return slugs;
})();

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
      /*
       * Out: the search pages, which index nothing of their own, and any draft
       * — which only exists in a preview build, and carries `noindex` there.
       * The locale prefix stays on the path: only the drafted language is
       * dropped, and its published counterpart is not.
       */
      filter: (page) => {
        if (page.includes('/search')) return false;
        const path = new URL(page).pathname.replace(/\/$/, '');
        return !draftSlugs.has(path);
      },
    }),
  ],

  vite: {
    plugins: [tailwindcss()],
    server: {
      allowedHosts: true,
    },
  },
});
