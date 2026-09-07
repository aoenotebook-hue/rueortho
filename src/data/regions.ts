import type { Locale } from '../i18n/ui';

export const regionIds = [
  'neck',
  'shoulder',
  'knee',
  'spine',
  'hip',
  'foot-ankle',
  'hand-wrist',
  'elbow',
  'paediatric',
  'sports',
  'bone-health',
] as const;

export type RegionId = (typeof regionIds)[number];

export interface Region {
  id: RegionId;
  label: Record<Locale, string>;
  /** Patient-friendly introduction shown at the top of the region page. */
  intro: Record<Locale, string> | null;
  icon: string;
  /**
   * False for categories that are not a body part (bone-health, paediatric,
   * sports). These are shown as cards beside the body map rather than on it.
   */
  bodyMap: boolean;
  order: number;
}

export const regions: Record<RegionId, Region> = {
  neck: {
    id: 'neck',
    label: { th: 'คอ', en: 'Neck' },
    intro: {
      th: 'อาการปวดคอส่วนใหญ่มาจากกล้ามเนื้อและข้อต่อรอบคอ และมักดีขึ้นได้เอง แต่บางครั้งอาการปวดที่ร้าวลงแขน ชา หรืออ่อนแรง อาจเกี่ยวข้องกับเส้นประสาทที่ถูกกดทับ ซึ่งต้องการการตรวจที่ละเอียดขึ้น',
      en: 'Most neck pain comes from the muscles and joints around the neck and settles on its own. Pain that travels down the arm, or numbness and weakness, can involve a compressed nerve and needs a closer look.',
    },
    icon: 'neck',
    bodyMap: true,
    order: 0,
  },

  shoulder: {
    id: 'shoulder',
    label: { th: 'ไหล่', en: 'Shoulder' },
    intro: {
      th: 'ข้อไหล่เป็นข้อที่เคลื่อนไหวได้มากที่สุดในร่างกาย จึงต้องอาศัยเอ็นและกล้ามเนื้อรอบข้อช่วยพยุงไว้ ปัญหาที่พบบ่อยจึงมักเกิดกับเอ็นและเยื่อหุ้มข้อ มากกว่าตัวกระดูกเอง อาการปวดไหล่ ยกแขนไม่ขึ้น หรือปวดจนนอนไม่ได้ มีได้หลายสาเหตุ และแต่ละสาเหตุมีแนวทางดูแลต่างกัน',
      en: 'The shoulder moves more than any other joint in the body, so it relies on the tendons and muscles around it for support. That is why most shoulder problems involve the tendons and the joint lining rather than the bone itself. Pain, difficulty lifting the arm, or pain that stops you sleeping can each have several causes, and each is managed differently.',
    },
    icon: 'shoulder',
    bodyMap: true,
    order: 1,
  },
  knee: {
    id: 'knee',
    label: { th: 'เข่า', en: 'Knee' },
    intro: {
      th: 'ข้อเข่ารับน้ำหนักตัวเกือบตลอดเวลาที่เรายืนและเดิน ปัญหาที่เข่าจึงพบได้บ่อยมาก ตั้งแต่ข้อเสื่อมตามวัย ไปจนถึงการบาดเจ็บจากการเล่นกีฬา อาการปวดเข่าที่ตำแหน่งต่างกัน และเกิดในจังหวะต่างกัน มักบอกสาเหตุที่ต่างกันได้',
      en: 'The knee carries your body weight almost every time you stand or walk, which is why knee problems are so common — from age-related wear to sports injuries. Where the knee hurts, and when it hurts, often points to different causes.',
    },
    icon: 'knee',
    bodyMap: true,
    order: 2,
  },
  spine: {
    id: 'spine',
    label: { th: 'กระดูกสันหลัง', en: 'Spine' },
    intro: null,
    icon: 'spine',
    bodyMap: true,
    order: 3,
  },
  hip: {
    id: 'hip',
    label: { th: 'สะโพก', en: 'Hip' },
    intro: null,
    icon: 'hip',
    bodyMap: true,
    order: 4,
  },
  'hand-wrist': {
    id: 'hand-wrist',
    label: { th: 'มือและข้อมือ', en: 'Hand and wrist' },
    intro: null,
    icon: 'hand',
    bodyMap: true,
    order: 5,
  },
  elbow: {
    id: 'elbow',
    label: { th: 'ข้อศอก', en: 'Elbow' },
    intro: null,
    icon: 'elbow',
    bodyMap: true,
    order: 6,
  },
  'foot-ankle': {
    id: 'foot-ankle',
    label: { th: 'เท้าและข้อเท้า', en: 'Foot and ankle' },
    intro: null,
    icon: 'foot',
    bodyMap: true,
    order: 7,
  },
  paediatric: {
    id: 'paediatric',
    label: { th: 'เด็ก', en: 'Children' },
    intro: null,
    icon: 'child',
    bodyMap: false,
    order: 8,
  },
  sports: {
    id: 'sports',
    label: { th: 'การบาดเจ็บจากกีฬา', en: 'Sports injuries' },
    intro: null,
    icon: 'sports',
    bodyMap: false,
    order: 9,
  },
  'bone-health': {
    id: 'bone-health',
    label: { th: 'สุขภาพกระดูก', en: 'Bone health' },
    intro: {
      th: 'สุขภาพกระดูกไม่ได้เป็นเรื่องของอวัยวะใดอวัยวะหนึ่ง แต่เป็นเรื่องของทั้งร่างกาย กระดูกที่บางลงตามวัยอาจไม่มีอาการใด ๆ จนกระทั่งเกิดกระดูกหักจากการล้มเบา ๆ การดูแลกระดูกให้แข็งแรงและการป้องกันการล้ม จึงเป็นสองเรื่องที่ต้องทำควบคู่กัน',
      en: 'Bone health is not about one body part — it concerns the whole skeleton. Bone that thins with age often causes no symptoms at all until a minor fall breaks something. Keeping bone strong and preventing falls are two halves of the same job.',
    },
    icon: 'bone',
    bodyMap: false,
    order: 10,
  },
};

/** Regions in display order, with bone-health last. */
export const orderedRegions: Region[] = Object.values(regions).sort((a, b) => a.order - b.order);

export const bodyMapRegions: Region[] = orderedRegions.filter((r) => r.bodyMap);
export const categoryRegions: Region[] = orderedRegions.filter((r) => !r.bodyMap);

export function getRegion(id: RegionId): Region {
  return regions[id];
}
