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
      en: 'Sorawut Thamyongkit, MD',
    },
    credentials: {
      th: 'ศัลยแพทย์ออร์โธปิดิกส์',
      en: 'Orthopaedic surgeon',
    },
    bio: {
      th: [
        'นพ.สรวุฒิ ธรรมยงค์กิจ เป็นศัลยแพทย์ออร์โธปิดิกส์ ผ่านการฝึกอบรมด้านเวชศาสตร์การกีฬาและการผ่าตัดกระดูกหักและข้อ สนใจปัญหาของข้อไหล่และข้อเข่าเป็นพิเศษ',
        'นอกจากงานดูแลผู้ป่วย ยังสอนแพทย์ประจำบ้านออร์โธปิดิกส์ และทำงานวิจัยอย่างต่อเนื่อง',
        'จัดทำเว็บไซต์นี้และแอปดูแลผู้ป่วยที่ลิงก์ไว้ในบทความ ด้วยความตั้งใจอย่างเดียว คือ อยากให้ผู้ป่วยเข้าใจภาวะของตนเองมากขึ้น และพูดคุยกับแพทย์ผู้ดูแลได้อย่างมั่นใจ',
      ],
      en: [
        'Sorawut Thamyongkit is an orthopaedic surgeon trained in sports medicine and trauma surgery, with a particular interest in shoulder and knee problems.',
        'Alongside caring for patients, he teaches orthopaedic residents and takes part in research.',
        'He writes this site, and the free patient apps linked from its articles, for one reason: patients who understand their own condition can talk to their doctor with more confidence.',
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
