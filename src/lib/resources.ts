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

/**
 * Resources whose `related` list names this condition, grouped by collection.
 *
 * The mapping already exists and runs the other way — an examination, a
 * treatment or a rehabilitation article names the conditions it bears on, and
 * `ResourceArticle` renders those as links. This reads the same editorial
 * relationships backwards so a condition page can offer them too. **Nothing
 * here infers a relationship**: if the author has not written the condition
 * into a resource's `related`, that resource does not appear, and a condition
 * nobody has mapped gets no section at all rather than a guessed one.
 *
 * `getPublishedResources`, not `getResources`, so a draft never surfaces here
 * even in a preview build. A list offered as further reading should not point
 * at something the author has not finished.
 *
 * Order is examinations, then treatments, then rehabilitation: what the test
 * is, what can be done, and how recovery works. Within a collection the order
 * is whatever `getResources` sorts by, which is title. Nothing is dropped —
 * trimming the list would be a judgement about which reading matters most, and
 * that is not this function's to make.
 */
export interface RelatedResourceGroup {
  collection: ResourceCollection;
  entries: Resource[];
}

export async function getResourcesForCondition(
  locale: Locale,
  conditionSlug: string,
): Promise<RelatedResourceGroup[]> {
  const order: ResourceCollection[] = ['examinations', 'treatments', 'rehabilitation'];
  const groups: RelatedResourceGroup[] = [];

  for (const collection of order) {
    const entries = (await getPublishedResources(collection, locale)).filter((entry) =>
      entry.data.related?.includes(conditionSlug),
    );
    if (entries.length > 0) groups.push({ collection, entries });
  }

  return groups;
}
