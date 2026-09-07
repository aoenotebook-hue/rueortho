import type { Locale } from '../i18n/ui';

export interface CompanionApp {
  id: string;
  name: Record<Locale, string>;
  /** One sentence on what the app does for a patient, not what it is. */
  description: Record<Locale, string>;
  url: string;
  /** Condition slugs this app belongs to. */
  conditions: string[];
  status: 'live' | 'draft';
}

/**
 * The author's own patient-care apps. The website brings the traffic and the
 * trust; the apps do the day-to-day work. Articles link out to these rather
 * than repeating their day-by-day instructions.
 *
 * TODO: confirm each GitHub Pages URL resolves before launch — Pages has to be
 * enabled per repository, and the path segment is case-sensitive.
 */
export const apps: CompanionApp[] = [
  {
    id: 'osteoporosis-care',
    name: {
      th: 'ดูแลกระดูกพรุน',
      en: 'Osteoporosis Care',
    },
    description: {
      th: 'ช่วยประเมินความเสี่ยงกระดูกหักและการล้ม คำนวณแคลเซียมและวิตามินดีที่ได้รับในแต่ละวัน และแนะนำท่าฝึกการทรงตัวพร้อมคลิปสาธิต',
      en: 'Helps you check your fracture and fall risk, work out how much calcium and vitamin D you get each day, and follow balance exercises with video demonstrations.',
    },
    url: 'https://aoenotebook-hue.github.io/Osteoporosis-care/',
    conditions: ['osteoporosis'],
    status: 'live',
  },
  {
    id: 'frozen-shoulder-care',
    name: {
      th: 'ดูแลข้อไหล่ติด',
      en: 'Frozen Shoulder Care',
    },
    description: {
      th: 'พาคุณทำท่าบริหารข้อไหล่ทีละขั้นตอนพร้อมคลิปสาธิต และแนะนำวิธีจัดท่านอนและใช้ชีวิตประจำวันให้เจ็บน้อยลง',
      en: 'Walks you through shoulder exercises step by step with video, and shows how to sleep and manage daily tasks with less pain.',
    },
    url: 'https://aoenotebook-hue.github.io/Frozen-shoulder-care/',
    conditions: ['frozen-shoulder'],
    status: 'live',
  },
  {
    id: 'postoperative-care-rc',
    name: {
      th: 'ดูแลหลังผ่าตัดเย็บเอ็นหมุนไหล่',
      en: 'Rotator Cuff Repair Recovery',
    },
    description: {
      th: 'คู่มือการฟื้นตัวหลังผ่าตัดเย็บเอ็นหมุนไหล่ แบ่งเป็นระยะ พร้อมท่าบริหารในแต่ละระยะ วิธีใส่ผ้าคล้องแขน และข้อควรระวัง',
      en: 'A phase-by-phase recovery guide after rotator cuff repair, with the exercises for each phase, how to wear the sling, and what to avoid.',
    },
    url: 'https://aoenotebook-hue.github.io/Postoperative-care-RC/',
    conditions: ['rotator-cuff-tear'],
    status: 'live',
  },
  {
    id: 'postoperative-care-aclr',
    name: {
      th: 'ดูแลหลังผ่าตัดสร้างเอ็นไขว้หน้า',
      en: 'ACL Reconstruction Recovery',
    },
    description: {
      th: 'คู่มือการฟื้นตัวหลังผ่าตัดสร้างเอ็นไขว้หน้าข้อเข่า แบ่งเป็นระยะ พร้อมท่าบริหารและเป้าหมายการฟื้นตัวในแต่ละช่วง',
      en: 'A phase-by-phase recovery guide after ACL reconstruction, with the exercises and recovery goals for each stage.',
    },
    url: 'https://aoenotebook-hue.github.io/Postoperative-care-ACLR/',
    conditions: ['acl-injury'],
    status: 'live',
  },
];

/** Apps offered on a given condition article. Empty means the block is not rendered. */
export function appsForCondition(slug: string): CompanionApp[] {
  return apps.filter((app) => app.status === 'live' && app.conditions.includes(slug));
}
