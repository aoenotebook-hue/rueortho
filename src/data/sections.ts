import type { Locale } from '../i18n/ui';

/**
 * The site's top-level sections, from the master plan's route list.
 *
 * Sections marked `planned` have a real page that says plainly that it is being
 * prepared, rather than being absent from the navigation or 404ing. The plan
 * asks for every navigation element to point at a real route, and a stub that
 * tells the reader where to go instead is more useful than a dead link.
 *
 * `examinations`, `rehabilitation` and `articles` are `live` because they now
 * have real index pages. The first two list whatever is published in their
 * collection and fall back to the same in-preparation wording while that is
 * empty, so marking them live does not promise content that is not there.
 *
 * Labels live here rather than in ui.ts because they belong to the section, the
 * same way region labels live in regions.ts.
 */
export type SectionStatus = 'live' | 'planned';

export interface Section {
  id: string;
  path: string;
  /**
   * Kept out of the main navigation while still having a page of its own.
   *
   * **`articles` is the one that uses this now**, and the two have swapped.
   * `/articles` and `/conditions` overlap — the hub indexes the four libraries
   * and the clips, the conditions index lists the largest of those libraries —
   * so only one of them belongs in the menu, and on 2026-09-19 the author
   * chose `conditions`. The `/articles` route stays: the home page's "all
   * articles" link points at it, and so does the videos entry in the menu,
   * which lands on its gallery.
   */
  hiddenFromNav?: boolean;
  /**
   * Short label for the main navigation — and it has to stay short.
   *
   * The nav is one row on a desktop, and a row of nine tabs has about 1112px
   * to live in however wide the window is, because the container caps at
   * 72rem. Lengthening a label here is what pushes it onto a second line and
   * changes `--header-offset` for every in-page anchor on the site.
   * `ฟื้นฟู & ออกกำลังกาย` / `Rehab & exercise` and
   * `เครื่องมือผู้ป่วย` / `Patient tools` were trimmed for exactly that reason
   * on 2026-09-19; `title` below still carries the full heading.
   */
  nav: Record<Locale, string>;
  /** Page heading, which can be longer than the nav label. */
  title: Record<Locale, string>;
  intro: Record<Locale, string>;
  status: SectionStatus;
  /** What the reader can usefully do while this section is being built. */
  fallback?: 'conditions' | 'search';
}

export const sections: Section[] = [
  {
    id: 'conditions',
    path: '/conditions',
    nav: { th: 'อาการ & โรค', en: 'Conditions' },
    title: { th: 'อาการ & โรค', en: 'Conditions' },
    intro: {
      th: 'ค้นหาข้อมูลจากบริเวณที่มีอาการ หรือเลือกจากชื่อโรค',
      en: 'Find information by the area that hurts, or by the name of the condition.',
    },
    status: 'live',
  },
  {
    id: 'basics',
    path: '/basics',
    nav: { th: 'รู้จักร่างกาย', en: 'Body basics' },
    title: { th: 'รู้จักร่างกายของคุณ', en: 'How your body works' },
    intro: {
      th: 'กระดูกและกระดูกอ่อนคืออะไร ทำงานอย่างไร และทำไมการดูแลตั้งแต่ยังไม่ปวดจึงสำคัญ',
      en: 'What bone and cartilage actually are, how they work, and why looking after them before anything hurts is the part that pays off.',
    },
    status: 'live',
  },
  {
    id: 'examinations',
    path: '/examinations',
    nav: { th: 'การตรวจ', en: 'Tests' },
    title: { th: 'การตรวจและการอ่านผล', en: 'Tests and imaging' },
    intro: {
      th: 'เอกซเรย์ MRI อัลตราซาวด์ และการตรวจความหนาแน่นกระดูก ดูอะไรได้บ้าง และศัพท์ในใบรายงานผลแปลว่าอะไร',
      en: 'What X-ray, MRI, ultrasound and bone-density scans can show, and what the words in a report actually mean.',
    },
    status: 'live',
  },
  {
    id: 'treatments',
    path: '/treatments',
    nav: { th: 'การรักษา', en: 'Treatment' },
    title: { th: 'ทางเลือกการรักษา', en: 'Treatment options' },
    intro: {
      th: 'การดูแลตนเอง กายภาพบำบัด ยา การฉีดยา และการผ่าตัด แต่ละทางเลือกช่วยอะไรได้ มีข้อดีข้อเสียอย่างไร',
      en: 'Self-care, physiotherapy, medicines, injections and surgery — what each one aims to do, and its trade-offs.',
    },
    status: 'live',
  },
  {
    id: 'rehabilitation',
    path: '/rehabilitation',
    nav: { th: 'ฟื้นฟู', en: 'Rehab' },
    title: { th: 'การฟื้นฟูและการออกกำลังกาย', en: 'Rehabilitation and exercise' },
    intro: {
      th: 'โปรแกรมฟื้นฟูแบ่งตามระยะ ตั้งแต่ช่วงปกป้องข้อ ไปจนถึงการกลับไปใช้งานได้ตามปกติ',
      en: 'Phase-based programmes, from protecting the joint through to returning to normal activity.',
    },
    status: 'live',
  },
  {
    id: 'tools',
    path: '/tools',
    nav: { th: 'เครื่องมือ', en: 'Tools' },
    title: { th: 'เครื่องมือสำหรับผู้ป่วย', en: 'Tools for patients' },
    intro: {
      th: 'แอปดูแลตัวเองที่ใช้งานได้ฟรี พร้อมคิวอาร์โค้ดสำหรับเปิดบนมือถือ เป็นสื่อการเรียนรู้ ไม่ใช่การวินิจฉัย',
      en: 'Free self-care apps with QR codes to open them on a phone. Educational, never diagnostic.',
    },
    status: 'live',
  },
  {
    id: 'articles',
    path: '/articles',
    hiddenFromNav: true,
    nav: { th: 'บทความ & วิดีโอ', en: 'Articles & videos' },
    title: { th: 'บทความและวิดีโอ', en: 'Articles and videos' },
    intro: {
      th: 'บทความสั้นและวิดีโอสาธิต สำหรับเรื่องที่อธิบายด้วยภาพได้ดีกว่าตัวอักษร',
      en: 'Short articles and demonstration videos, for the things a picture explains better than words.',
    },
    status: 'live',
  },
  {
    id: 'about',
    path: '/about',
    nav: { th: 'เกี่ยวกับเรา', en: 'About' },
    title: { th: 'เกี่ยวกับเว็บไซต์', en: 'About' },
    intro: { th: '', en: '' },
    status: 'live',
  },
];

export const plannedSections = sections.filter((s) => s.status === 'planned');

/** What the main navigation shows. */
export const navSections = sections.filter((s) => !s.hiddenFromNav);

export function getSection(id: string): Section {
  const section = sections.find((s) => s.id === id);
  if (!section) throw new Error(`Unknown section "${id}" — add it to src/data/sections.ts`);
  return section;
}
