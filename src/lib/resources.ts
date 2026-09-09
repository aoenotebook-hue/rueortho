import { getCollection, type CollectionEntry } from 'astro:content';
import type { Locale } from '../i18n/ui';
import { draftsIncluded } from './conditions';

/**
 * `examinations`, `rehabilitation` and `treatments` are shaped alike on purpose,
 * so one set of queries serves all three. Anything that needs the rehab-only `region` field
 * narrows the entry itself rather than getting a separate function here.
 */
export type ResourceCollection = 'examinations' | 'rehabilitation' | 'treatments';
export type Resource = CollectionEntry<ResourceCollection>;

/** Entry ids look like "th/knee-mri". */
function localeOf(entry: { id: string }): string {
  return entry.id.split('/')[0]!;
}

/**
 * Draft visibility follows the conditions rule exactly — dev, and preview
 * deployments, never production. Importing `draftsIncluded` rather than
 * repeating the expression means the two can never drift apart, which matters:
 * the whole point is that unreviewed medical copy has one definition of
 * "published", not one per collection.
 */
export async function getResources(
  collection: ResourceCollection,
  locale: Locale,
): Promise<Resource[]> {
  const all = await getCollection(collection);
  return all
    .filter((entry) => localeOf(entry) === locale)
    .filter((entry) => draftsIncluded || !entry.data.draft)
    .sort((a, b) => a.data.title.localeCompare(b.data.title, locale));
}

export async function getResourceBySlug(
  collection: ResourceCollection,
  locale: Locale,
  slug: string,
): Promise<Resource | undefined> {
  const entries = await getResources(collection, locale);
  return entries.find((entry) => entry.data.slug === slug);
}

/**
 * Published outright, whatever `draftsIncluded` says — the same guarantee
 * `getPublishedConditions` gives, for anything that leaves the site.
 */
export async function getPublishedResources(
  collection: ResourceCollection,
  locale: Locale,
): Promise<Resource[]> {
  const entries = await getResources(collection, locale);
  return entries.filter((entry) => !entry.data.draft);
}
