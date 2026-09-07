import rss from '@astrojs/rss';
import type { APIContext } from 'astro';
import { t } from '../../i18n/ui';
import { getPublishedConditions } from '../../lib/conditions';

/** English feed. */
export async function GET(context: APIContext) {
  const tr = t('en');
  // Published only — a preview build shows drafts on the site, but a feed
  // leaves the site, so it carries reviewed articles or nothing.
  const items = (await getPublishedConditions('en'))
    .sort((a, b) => b.data.lastReviewed.getTime() - a.data.lastReviewed.getTime())
    .slice(0, 50);

  return rss({
    title: tr('site.name'),
    description: tr('site.description'),
    site: context.site!,
    trailingSlash: false,
    items: items.map((entry) => ({
      title: entry.data.title,
      description: entry.data.summary,
      pubDate: entry.data.lastReviewed,
      link: `/en/conditions/${entry.data.slug}`,
    })),
    customData: '<language>en</language>',
  });
}
