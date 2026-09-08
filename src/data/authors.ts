import type { Locale } from '../i18n/ui';

export interface Author {
  id: string;
  name: Record<Locale, string>;
  credentials: Record<Locale, string>;
  links?: { label: string; url: string }[];
}

/**
 * Deliberately no affiliation or workplace field. The author does not want any
 * institution named on the site, which also keeps it clear of Thai rules on
 * healthcare-facility advertising.
 *
 * There is no bio or photo either: the author asked for his name to appear only
 * on the About page, so the dedicated author page was deleted and the homepage
 * strip removed. `credentials` survives because the article JSON-LD still
 * carries it as `jobTitle`, where it helps a search engine see that a named
 * clinician stands behind the page.
 */
export const authors: Record<string, Author> = {
  sorawut: {
    id: 'sorawut',
    name: {
      th: 'นพ.สรวุฒิ ธรรมยงค์กิจ',
      en: 'Sorawut Thamyongkit',
    },
    credentials: {
      th: 'พ.บ. · ศัลยแพทย์ออร์โธปิดิกส์',
      en: 'MD · Orthopaedic surgeon',
    },
    links: [],
  },
};

export function getAuthor(id: string): Author {
  const author = authors[id];
  if (!author) throw new Error(`Unknown author id "${id}" — add it to src/data/authors.ts`);
  return author;
}
