import type { Locale } from '../i18n/ui';

export interface Author {
  id: string;
  name: Record<Locale, string>;
  credentials: Record<Locale, string>;
  /** Paragraphs, kept separate so the author page can space them properly. */
  bio: Record<Locale, string[]>;
  photo: string;
  links?: { label: string; url: string }[];
}

/**
 * Deliberately no affiliation or workplace field. The author does not want any
 * institution named on the site, which also keeps it clear of Thai rules on
 * healthcare-facility advertising.
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
    bio: {
      th: [
        'จัดทำเว็บไซต์นี้และแอปดูแลผู้ป่วยทั้งหมดโดยไม่มีค่าใช้จ่าย เพื่อให้ผู้ป่วยเข้าใจภาวะของตนเอง และพูดคุยกับแพทย์ผู้ดูแลได้อย่างมั่นใจ',
      ],
      en: [
        'He builds this site and the patient apps free of charge, so that patients can understand their own condition and talk to their doctor with more confidence.',
      ],
    },
    // TODO: add the real photo at src/assets/authors/sorawut.jpg (≥800px square).
    photo: '/images/authors/sorawut-placeholder.svg',
    links: [],
  },
};

export function getAuthor(id: string): Author {
  const author = authors[id];
  if (!author) throw new Error(`Unknown author id "${id}" — add it to src/data/authors.ts`);
  return author;
}

/** One-line byline shown under every article title. */
export function byline(author: Author, locale: Locale): string {
  return `${author.name[locale]} · ${author.credentials[locale]}`;
}
