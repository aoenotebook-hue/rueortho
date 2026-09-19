import type { Locale } from '../i18n/ui';
import { t } from '../i18n/ui';
import { navSections } from '../data/sections';
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
 * `about` gets a hand-written list instead, because what it contains is not a
 * collection — its children are the info and legal pages, and they take the
 * *footer's* labels so the two menus cannot disagree about the same page.
 * `conditions`, `tools` and the video gallery get no drop-down: the first
 * would be a list of 22 rows, and the other two are single destinations.
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
    } else if (section.id === 'about') {
      item.children = ABOUT_PAGES.map((page) => ({
        path: page.path,
        label: tr(page.key),
      }));
    }

    items.push(item);

    /*
     * The video gallery, as a tab of its own.
     *
     * It is not a section in `sections.ts` because it is not a page: it is the
     * `#videos` block of `/articles`, built by `lib/videos.ts` from the clips
     * in the article bodies. Giving it an entry there would hand `getSection`
     * and `ArticlesIndex` an id that answers to no collection.
     *
     * It goes in beside `rehabilitation` rather than at the end because the
     * clips are demonstrations of the exercises that section describes, and
     * because the menu otherwise ends on two utility entries in a row.
     */
    if (section.id === 'rehabilitation') {
      items.push({ path: '/articles#videos', label: tr('nav.videos') });
    }
  }

  return items;
}
