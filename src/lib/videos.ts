import type { Locale } from '../i18n/ui';
import { getConditions } from './conditions';
import { getResources } from './resources';

export interface VideoRef {
  /** Path under public/, e.g. "/media/frozen-shoulder/wall-slide.mp4". */
  src: string;
  title: string;
  /** Title of the article the clip lives in. */
  articleTitle: string;
  /** Site-relative path of that article, already localised. */
  articleHref: string;
}

/**
 * The video index is read out of the article bodies at build time rather than
 * kept in a data file beside them.
 *
 * Two reasons. A second list would drift — a clip renamed in the MDX and not in
 * the list is exactly the class of bug that already bit this project once, when
 * three rotator-cuff clips pointed at paths deduplication had moved. And a clip
 * is only meaningful inside the article that frames it: the gallery therefore
 * links to the article rather than embedding a second player, so nobody watches
 * a shoulder exercise without the "stop at tightness, not at pain" line above
 * it.
 */
const VIDEO_TAG = /<Video\b[^>]*?\/>/gs;

function attr(tag: string, name: string): string | undefined {
  const match = tag.match(new RegExp(`\\b${name}="([^"]*)"`, 's'));
  return match?.[1];
}

function collect(
  body: string | undefined,
  articleTitle: string,
  articleHref: string,
): VideoRef[] {
  const out: VideoRef[] = [];
  for (const tag of (body ?? '').match(VIDEO_TAG) ?? []) {
    const src = attr(tag, 'src');
    const title = attr(tag, 'title');
    if (!src || !title) continue;
    out.push({ src, title, articleTitle, articleHref });
  }
  return out;
}

/**
 * Every demonstration clip on the site, in the order the articles present them.
 * Six of the files are byte-identical across two apps and are stored once, so
 * the same `src` can legitimately appear under two different articles; the
 * gallery shows both, because the framing differs even when the pixels do not.
 */
export async function getVideos(locale: Locale): Promise<VideoRef[]> {
  const prefix = locale === 'th' ? '' : '/en';
  const videos: VideoRef[] = [];

  for (const entry of await getConditions(locale)) {
    videos.push(
      ...collect(entry.body, entry.data.title, `${prefix}/conditions/${entry.data.slug}`),
    );
  }
  for (const collection of ['examinations', 'rehabilitation'] as const) {
    for (const entry of await getResources(collection, locale)) {
      videos.push(
        ...collect(entry.body, entry.data.title, `${prefix}/${collection}/${entry.data.slug}`),
      );
    }
  }

  return videos;
}
