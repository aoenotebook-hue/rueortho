/**
 * The condition articles the home page leads with, in the order it shows them.
 *
 * **This is an editorial starting selection, not a ranking.** Nothing here is
 * measured: the site has no analytics of its own that could say which articles
 * are read most, and a "most searched" strip that nobody counted is a claim
 * the site cannot support. The order is simply where a reader who does not yet
 * know what to look for is best off starting — the common, broad complaints
 * first, then the specific diagnoses.
 *
 * It replaced `published.slice(0, 6)`, which took the first six articles in
 * Thai or English alphabetical order. That put a different six on each
 * language's home page, in an order nobody chose, and it changed whenever an
 * article was added or retitled.
 *
 * Slugs only. Both languages share a slug on purpose, so one list serves both
 * and the two home pages lead with the same topics; the title, the summary and
 * the illustration are read from the article itself, so nothing here can go
 * stale against the article it names.
 *
 * A slug that names an article which does not exist, is not translated into
 * the locale being rendered, or is still a draft, is skipped rather than
 * rendered as an empty card — `getFeaturedConditions` resolves the list
 * against what is actually published. Editing this list is therefore safe: the
 * worst a wrong slug can do is show one card fewer.
 */
export const featuredConditionSlugs = [
  'knee-pain',
  'shoulder-pain',
  'back-pain',
  'frozen-shoulder',
  'plantar-fasciitis',
  'knee-osteoarthritis',
] as const;

export type FeaturedConditionSlug = (typeof featuredConditionSlugs)[number];
