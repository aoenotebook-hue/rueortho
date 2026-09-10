import { render, type CollectionEntry } from 'astro:content';
import type { MarkdownHeading } from 'astro';
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
  /**
   * The same article, anchored at the section that holds this clip — or the
   * plain article link when no section could be resolved. Never a dead anchor.
   */
  sectionHref: string;
  /** Heading text of that section, when there is one. */
  sectionTitle?: string;
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
/**
 * One pass over the body picking up markdown `##` headings and `<Video>` tags
 * in the order they appear, so each clip can be told which section it sits in.
 * `[^#]` after `##` keeps `###` out: the section, not the sub-heading — see
 * `collect` below for why that distinction is the whole point.
 */
const SCAN = /(?<h2>^##[^#][^\n]*)|(?<video><Video\b[^>]*?\/>)/gm;

function attr(tag: string, name: string): string | undefined {
  const match = tag.match(new RegExp(`\\b${name}="([^"]*)"`, 's'));
  return match?.[1];
}

/**
 * Fenced code, blanked out but the same length, so offsets are unchanged and a
 * `##` inside a fence cannot be mistaken for a heading.
 */
function withoutFences(body: string): string {
  return body.replace(/^```[\s\S]*?^```/gm, (block) => block.replace(/[^\n]/g, ' '));
}

/**
 * The `##` section each clip belongs to, as a rendered heading slug.
 *
 * **The section, deliberately, and not the `###` above the clip.** In the
 * frozen shoulder article the phase sub-headings sit under
 * "การฟื้นตัวและการฟื้นฟู", and the callout that says how far to stretch —
 * green means keep going, red means stop — sits directly under that `##`,
 * above every phase. An anchor on "ระยะที่ 1" drops the reader below it. The
 * `##` is the smallest unit that still carries the heading, the instructions
 * and the cautions together, so that is the unit the gallery links to.
 *
 * Slugs come from `render()`, never from the heading text: Astro's slugger
 * keeps Thai characters, turns spaces into hyphens and suffixes a repeat with
 * `-1`, and a second implementation of those rules would drift. The Nth `##`
 * in the body is the Nth depth-2 entry in `headings` — component headings
 * (`ExerciseCard`, `Callout`) are not markdown, so they never appear there.
 */
function collect(
  body: string | undefined,
  headings: MarkdownHeading[],
  articleTitle: string,
  articleHref: string,
): VideoRef[] {
  const sections = headings.filter((heading) => heading.depth === 2);
  const out: VideoRef[] = [];

  let section: MarkdownHeading | undefined;
  let seen = 0;

  for (const match of withoutFences(body ?? '').matchAll(SCAN)) {
    if (match.groups?.h2 !== undefined) {
      section = sections[seen];
      seen += 1;
      continue;
    }

    const tag = match.groups?.video;
    if (!tag) continue;

    const src = attr(tag, 'src');
    const title = attr(tag, 'title');
    if (!src || !title) continue;

    // No resolvable section — a clip above the first heading, or a body and a
    // heading list that disagree — falls back to the article itself rather
    // than pointing at an id that is not on the page.
    const anchored = section?.slug ? `${articleHref}#${section.slug}` : articleHref;

    out.push({
      src,
      title,
      articleTitle,
      articleHref,
      sectionHref: anchored,
      sectionTitle: section?.slug ? section.text : undefined,
    });
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

  const add = async (
    entry: CollectionEntry<'conditions'> | CollectionEntry<'examinations'>,
    href: string,
  ) => {
    if (!entry.body?.includes('<Video')) return;
    const { headings } = await render(entry);
    videos.push(...collect(entry.body, headings, entry.data.title, href));
  };

  for (const entry of await getConditions(locale)) {
    await add(entry, `${prefix}/conditions/${entry.data.slug}`);
  }
  for (const collection of ['examinations', 'rehabilitation', 'treatments'] as const) {
    for (const entry of await getResources(collection, locale)) {
      await add(
        entry as CollectionEntry<'examinations'>,
        `${prefix}/${collection}/${entry.data.slug}`,
      );
    }
  }

  return videos;
}
