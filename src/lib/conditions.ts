import { getCollection, type CollectionEntry } from 'astro:content';
import type { Locale } from '../i18n/ui';
import type { RegionId } from '../data/regions';
import { featuredConditionSlugs } from '../data/featured';

export type Condition = CollectionEntry<'conditions'>;

/**
 * Drafts are visible in `npm run dev`, and in a **preview** deployment, and
 * never in a production build.
 *
 * The author cannot review what he cannot open, and every condition article is
 * `draft: true` until he has read it — so with dev-only visibility the deployed
 * site had a conditions index listing nothing and a search index containing no
 * articles. A preview deployment is the place to read them: Vercel serves
 * preview URLs with `X-Robots-Tag: noindex`, and each draft page also carries
 * its own noindex tag and an unreviewed banner. Production is unchanged.
 *
 * `PUBLIC_INCLUDE_DRAFTS=1 npm run build` does the same thing locally.
 *
 * The Vercel test is written as "on Vercel, and not the production
 * environment" rather than "VERCEL_ENV is exactly preview". Both are true of a
 * branch deployment, but the negative form still works if Vercel ever labels a
 * deployment something other than `preview`, and the whole point of the change
 * is that the author can open his drafts. Requiring VERCEL=1 as well is what
 * keeps it precise: off Vercel — a local `npm run build`, or CI — VERCEL_ENV is
 * undefined, and without that guard `!== 'production'` would be true and every
 * ordinary build would quietly start including drafts.
 */
export const draftsIncluded =
  import.meta.env.DEV ||
  process.env.PUBLIC_INCLUDE_DRAFTS === '1' ||
  (process.env.VERCEL === '1' && process.env.VERCEL_ENV !== 'production');

const includeDrafts = draftsIncluded;

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

/**
 * `exclude` holds slugs the caller is already showing elsewhere on the page —
 * the home page passes its featured list — so the same article does not appear
 * twice within one screen. Filtering happens before the limit is applied, so
 * excluding an article promotes the next one rather than leaving a gap; if
 * that runs the list short, it comes back short. Nothing is padded.
 */
export async function getRecentlyReviewed(
  locale: Locale,
  limit = 6,
  exclude: ReadonlySet<string> = new Set(),
): Promise<Condition[]> {
  const conditions = await getConditions(locale);
  return conditions
    .filter((entry) => !exclude.has(entry.data.slug))
    .sort((a, b) => b.data.lastReviewed.getTime() - a.data.lastReviewed.getTime())
    .slice(0, limit);
}

/**
 * The home page's featured strip: `src/data/featured.ts` in its own order,
 * resolved against what this locale actually publishes.
 *
 * `getPublishedConditions`, not `getConditions`, so a draft is skipped even in
 * a preview build where the rest of the site shows drafts. A curated strip
 * says "start here", and an article the author has not finished reading is not
 * ready to be recommended — he can still reach it from the conditions index,
 * which is where reviewing drafts belongs.
 *
 * A slug with no published article is dropped, so the strip is always as long
 * as the articles that exist and never renders an empty card.
 */
export async function getFeaturedConditions(locale: Locale): Promise<Condition[]> {
  const published = await getPublishedConditions(locale);
  const bySlug = new Map(published.map((entry) => [entry.data.slug, entry]));

  return featuredConditionSlugs
    .map((slug) => bySlug.get(slug))
    .filter((entry): entry is Condition => entry !== undefined);
}

export async function getConditionBySlug(
  locale: Locale,
  slug: string,
): Promise<Condition | undefined> {
  const conditions = await getConditions(locale);
  return conditions.find((entry) => entry.data.slug === slug);
}

/**
 * Articles that are published outright, whatever `draftsIncluded` says. Feeds
 * and anything else that syndicates beyond the site must use this: a preview
 * deployment showing a draft to its author is one thing, an RSS reader pulling
 * unreviewed medical copy into someone else's app is another.
 */
export async function getPublishedConditions(locale: Locale): Promise<Condition[]> {
  const conditions = await getConditions(locale);
  return conditions.filter((entry) => !entry.data.draft);
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
