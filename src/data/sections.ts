import type { Locale } from '../i18n/ui';

/**
 * The site's top-level sections, from the master plan's route list.
 *
 * Sections marked `planned` have a real page that says plainly that it is being
 * prepared, rather than being absent from the navigation or 404ing. The plan
 * asks for every navigation element to point at a real route, and a stub that
 * tells the reader where to go instead is more useful than a dead link.
 *
 * Labels live here rather than in ui.ts because they belong to the section, the
 * same way region labels live in regions.ts.
 */
export type SectionStatus = 'live' | 'planned';

export interface Section {
  id: string;
  path: string;
  /** Short label for the main navigation. */
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
    id: 'examinations',
    path: '/examinations',
    nav: { th: 'การตรวจ', en: 'Tests & imaging' },
    title: { th: 'การตรวจและการอ่านผล', en: 'Tests and imaging' },
    intro: {
      th: 'เอกซเรย์ MRI อัลตราซาวด์ และการตรวจความหนาแน่นกระดูก ดูอะไรได้บ้าง และศัพท์ในใบรายงานผลแปลว่าอะไร',
      en: 'What X-ray, MRI, ultrasound and bone-density scans can show, and what the words in a report actually mean.',
    },
    status: 'planned',
    fallback: 'search',
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
    status: 'planned',
    fallback: 'conditions',
  },
  {
    id: 'rehabilitation',
    path: '/rehabilitation',
    nav: { th: 'ฟื้นฟู & ออกกำลังกาย', en: 'Rehab & exercise' },
    title: { th: 'การฟื้นฟูและการออกกำลังกาย', en: 'Rehabilitation and exercise' },
    intro: {
      th: 'โปรแกรมฟื้นฟูแบ่งตามระยะ ตั้งแต่ช่วงปกป้องข้อ ไปจนถึงการกลับไปใช้งานได้ตามปกติ',
      en: 'Phase-based programmes, from protecting the joint through to returning to normal activity.',
    },
    status: 'planned',
    fallback: 'conditions',
  },
  {
    id: 'tools',
    path: '/tools',
    nav: { th: 'เครื่องมือผู้ป่วย', en: 'Patient tools' },
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
    nav: { th: 'บทความ & วิดีโอ', en: 'Articles & videos' },
    title: { th: 'บทความและวิดีโอ', en: 'Articles and videos' },
    intro: {
      th: 'บทความสั้นและวิดีโอสาธิต สำหรับเรื่องที่อธิบายด้วยภาพได้ดีกว่าตัวอักษร',
      en: 'Short articles and demonstration videos, for the things a picture explains better than words.',
    },
    status: 'planned',
    fallback: 'conditions',
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

export function getSection(id: string): Section {
  const section = sections.find((s) => s.id === id);
  if (!section) throw new Error(`Unknown section "${id}" — add it to src/data/sections.ts`);
  return section;
}
