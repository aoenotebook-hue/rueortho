import rss from '@astrojs/rss';
import type { APIContext } from 'astro';
import { t } from '../../i18n/ui';
import { getRecentlyReviewed } from '../../lib/conditions';

/** English feed. */
export async function GET(context: APIContext) {
  const tr = t('en');
  const items = await getRecentlyReviewed('en', 50);

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
