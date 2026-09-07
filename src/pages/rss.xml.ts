import rss from '@astrojs/rss';
import type { APIContext } from 'astro';
import { t } from '../i18n/ui';
import { getRecentlyReviewed } from '../lib/conditions';

/** Thai feed. Ordered by lastReviewed so a re-review resurfaces an article. */
export async function GET(context: APIContext) {
  const tr = t('th');
  const items = await getRecentlyReviewed('th', 50);

  return rss({
    title: tr('site.name'),
    description: tr('site.description'),
    site: context.site!,
    trailingSlash: false,
    items: items.map((entry) => ({
      title: entry.data.title,
      description: entry.data.summary,
      pubDate: entry.data.lastReviewed,
      link: `/conditions/${entry.data.slug}`,
    })),
    customData: '<language>th-TH</language>',
  });
}
