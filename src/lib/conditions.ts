import { getCollection, type CollectionEntry } from 'astro:content';
import type { Locale } from '../i18n/ui';
import type { RegionId } from '../data/regions';

export type Condition = CollectionEntry<'conditions'>;

/** Drafts stay visible while running `npm run dev`, never in a built site. */
const includeDrafts = import.meta.env.DEV;

/** Entry ids look like "th/knee-osteoarthritis". */
function localeOf(entry: Condition): string {
  return entry.id.split('/')[0]!;
}

export async function getConditions(locale: Locale): Promise<Condition[]> {
  const all = await getCollection('conditions');
  return all
    .filter((entry) => localeOf(entry) === locale)
    .filter((entry) => includeDrafts || !entry.data.draft)
    .sort((a, b) => a.data.title.localeCompare(b.data.title, locale));
}

export async function getConditionsByRegion(
  locale: Locale,
  region: RegionId,
): Promise<Condition[]> {
  const conditions = await getConditions(locale);
  return conditions.filter((entry) => entry.data.region === region);
}

export async function getRecentlyReviewed(locale: Locale, limit = 6): Promise<Condition[]> {
  const conditions = await getConditions(locale);
  return conditions
    .sort((a, b) => b.data.lastReviewed.getTime() - a.data.lastReviewed.getTime())
    .slice(0, limit);
}

export async function getConditionBySlug(
  locale: Locale,
  slug: string,
): Promise<Condition | undefined> {
  const conditions = await getConditions(locale);
  return conditions.find((entry) => entry.data.slug === slug);
}

/** Counts per region, used to grey out regions that have nothing published yet. */
export async function getRegionCounts(locale: Locale): Promise<Record<string, number>> {
  const conditions = await getConditions(locale);
  const counts: Record<string, number> = {};
  for (const entry of conditions) {
    counts[entry.data.region] = (counts[entry.data.region] ?? 0) + 1;
  }
  return counts;
}
