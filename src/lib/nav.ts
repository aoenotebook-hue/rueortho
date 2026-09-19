import type { Locale } from '../i18n/ui';
import { t } from '../i18n/ui';
import { navSections, getSection } from '../data/sections';
import { getPublishedResources, type ResourceCollection } from './resources';

export interface NavItem {
  path: string;
  label: string;
  /** Rendered as a drop-down under the tab. Absent or empty means a plain tab. */
  children?: { path: string; label: string }[];
}

/**
 * The main navigation, with a drop-down under every tab that has one.
 *
 * The children are read from the same collections the section's own index page
 * lists, through `getPublishedResources` — so a drop-down can never offer a
 * draft, and never drifts from what the page below it shows. A hand-kept list
 * here would do both, which is the bug the video index already taught us.
 *
 * Two tabs get a hand-written list instead, because what they contain is not a
 * collection: `articles`, whose page indexes the four libraries rather than
 * holding articles of its own, and `about`, whose children are the info and
 * legal pages. `tools` is a single page and gets no drop-down at all.
 */
const COLLECTION_FOR: Partial<Record<string, ResourceCollection>> = {
  basics: 'basics',
  examinations: 'examinations',
  treatments: 'treatments',
  rehabilitation: 'rehabilitation',
};

/**
 * The info and legal pages, which live in `pages/` and have no index of their
 * own. The labels are the footer's, so the two never say different things
 * about the same page.
 */
const ABOUT_PAGES = [
  { path: '/about', key: 'footer.about' },
  { path: '/editorial-policy', key: 'footer.editorial' },
  { path: '/disclaimer', key: 'footer.disclaimerLink' },
  { path: '/privacy', key: 'footer.privacy' },
  { path: '/contact', key: 'footer.contact' },
] as const;

export async function getNavItems(locale: Locale): Promise<NavItem[]> {
  const tr = t(locale);

  const items: NavItem[] = [{ path: '/', label: tr('nav.home') }];

  for (const section of navSections) {
    const item: NavItem = { path: section.path, label: section.nav[locale] };
    const collection = COLLECTION_FOR[section.id];

    if (collection) {
      const entries = await getPublishedResources(collection, locale);
      item.children = entries.map((entry) => ({
        path: `${section.path}/${entry.data.slug}`,
        label: entry.data.title,
      }));
    } else if (section.id === 'articles') {
      /*
       * Only what is not already a tab of its own.
       *
       * This used to list conditions, examinations, treatments and
       * rehabilitation — and the last three each have a tab two places to the
       * left, with the same label and the same destination. Opening this menu
       * therefore showed a reader three rows they had just walked past, which
       * is what the author reported on 2026-09-19: the menu looked duplicated
       * because it was.
       *
       * What is genuinely only reachable from here is `conditions`, which has
       * no tab by the author's own decision (`hiddenFromNav`), and the video
       * gallery, which is a section of the `/articles` page rather than a page
       * of its own. Everything else the hub indexes is one click away on the
       * row above.
       */
      item.children = [
        { path: '/conditions', label: getSection('conditions').nav[locale] },
        { path: '/articles#videos', label: tr('articles.videos') },
      ];
    } else if (section.id === 'about') {
      item.children = ABOUT_PAGES.map((page) => ({
        path: page.path,
        label: tr(page.key),
      }));
    }

    items.push(item);
  }

  return items;
}
