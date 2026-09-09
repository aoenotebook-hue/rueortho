export const locales = ['th', 'en'] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = 'th';

/**
 * Every visible string on the site lives here. Components must never
 * hard-code text — that is what keeps the Thai and English sites in step.
 */
const ui = {
  th: {
    'site.name': 'รู้เรื่องกระดูกและข้อ',
    'site.tagline': 'ความรู้เรื่องกระดูกและข้อที่เข้าใจง่าย โดยศัลยแพทย์กระดูกและข้อ',
    'site.description':
      'ความรู้เรื่องโรคกระดูก ข้อ และกล้ามเนื้อที่พบบ่อย อธิบายด้วยภาษาที่เข้าใจง่าย เขียนและตรวจทานโดยศัลยแพทย์ออร์โธปิดิกส์',

    'nav.home': 'หน้าแรก',
    'nav.conditions': 'โรคและภาวะ',
    'nav.regions': 'เลือกตามตำแหน่งที่ปวด',
    'nav.apps': 'แอปดูแลตัวเอง',
    'nav.about': 'เกี่ยวกับเว็บไซต์',
    'nav.menu': 'เมนู',
    'nav.close': 'ปิด',

    'a11y.skipToContent': 'ข้ามไปยังเนื้อหาหลัก',
    'a11y.mainNav': 'เมนูหลัก',
    'a11y.breadcrumb': 'เส้นทางนำทาง',

    'lang.switch': 'English',
    'lang.switchLabel': 'อ่านหน้านี้เป็นภาษาอังกฤษ',
    'lang.comingSoon': 'ฉบับภาษาอังกฤษกำลังจัดทำ',

    'search.label': 'ค้นหา',
    'search.placeholder': 'ค้นหาอาการหรือชื่อโรค เช่น ปวดเข่า ไหล่ติด',
    'search.devNotice':
      'ระบบค้นหาทำงานเมื่อสร้างเว็บไซต์แล้วเท่านั้น ลองใช้คำสั่ง npm run build แล้วตามด้วย npm run preview',
    'search.hint': 'พิมพ์อาการหรือชื่อโรคที่ต้องการค้นหา เช่น ปวดเข่า เข่าเสื่อม',
    'search.searching': 'กำลังค้นหา…',
    'search.results': 'พบ {n} รายการ',
    'search.noResults': 'ไม่พบผลลัพธ์สำหรับ “{q}”',
    'search.noResultsHint': 'ลองใช้คำที่สั้นลง หรือดูรายการโรคและภาวะทั้งหมด',
    'search.browseAll': 'ดูโรคและภาวะทั้งหมด',
    'search.unavailable': 'ขออภัย ระบบค้นหาขัดข้องชั่วคราว กรุณาดูรายการโรคและภาวะทั้งหมดแทน',

    'common.readMore': 'อ่านต่อ',
    'common.readingTime': 'อ่านประมาณ {n} นาที',
    'common.comingSoon': 'กำลังจัดทำ',
    'common.backToTop': 'กลับขึ้นด้านบน',
    'common.viewAll': 'ดูทั้งหมด',
    'common.article': 'บทความ',
    'common.articleCount': '{n} บทความ',
    'article.lastReviewed': 'ตรวจทานล่าสุด',
    'article.writtenBy': 'เขียนโดย',
    'article.onThisPage': 'หัวข้อในหน้านี้',
    'article.keyFacts': 'สรุปสั้น ๆ',
    'article.whenToSeeDoctor': 'เมื่อไหร่ควรไปพบแพทย์',
    'article.redFlagsTitle': 'อาการที่ควรไปพบแพทย์ทันที',
    'article.redFlagsUrgent':
      'หากมีอาการข้อใดข้อหนึ่งต่อไปนี้ ควรไปพบแพทย์หรือห้องฉุกเฉินทันที หรือโทร 1669',
    'article.draftTitle': 'ฉบับร่าง ยังไม่เผยแพร่',
    'article.draftBody':
      'หน้านี้เป็นฉบับร่างที่ยังไม่ผ่านการตรวจทานทางการแพทย์ จัดทำขึ้นเพื่อให้ผู้เขียนอ่านและแก้ไขก่อนเผยแพร่ ยังไม่ควรใช้อ้างอิงในการดูแลตนเอง และจะไม่ปรากฏบนเว็บไซต์จริงจนกว่าผู้เขียนจะตรวจทานแล้ว',

    'article.faq': 'คำถามที่พบบ่อย',
    'article.references': 'แหล่งอ้างอิง',
    'article.related': 'เรื่องที่เกี่ยวข้อง',
    'article.relatedConditions': 'โรคและภาวะที่เกี่ยวข้อง',
    'articles.count': 'บทความ {articles} เรื่อง และวิดีโอสาธิต {videos} คลิป',
    'articles.videos': 'วิดีโอสาธิต',
    'articles.videosBody':
      'คลิปทั้งหมดเป็นภาพเคลื่อนไหวไม่มีเสียง และอยู่ในบทความที่อธิบายวิธีทำและข้อควรระวังไว้แล้ว กดที่คลิปเพื่อไปยังบทความนั้น',
    'articles.clip': 'วิดีโอ',
    'article.doctorChecklist': 'คำถามที่ควรถามแพทย์',
    'article.helpful': 'บทความนี้มีประโยชน์หรือไม่',
    'article.helpfulYes': 'มีประโยชน์',
    'article.helpfulNo': 'ยังไม่ตรงกับที่ต้องการ',
    'article.reviewOverdue':
      'บทความนี้เลยกำหนดทบทวนแล้ว ผู้เขียนกำลังตรวจทานให้เป็นปัจจุบัน',

    'media.play': 'เล่นวิดีโอ',
    'media.videoHint': 'คลิปสั้น ไม่มีเสียง จะเริ่มโหลดเมื่อคุณกดเล่น',

    'apps.sectionTitle': 'แอปช่วยดูแลตัวเองสำหรับภาวะนี้',
    'apps.free': 'ใช้งานฟรี จัดทำโดยผู้เขียนบทความนี้เอง',
    'apps.open': 'เปิดแอป',
    'apps.pageTitle': 'แอปดูแลตัวเอง',
    'apps.helpsWith': 'ใช้กับภาวะ',

    'region.browseTitle': 'เลือกตามตำแหน่งที่ปวด',
    'region.browseIntro': 'เลือกส่วนของร่างกายที่มีอาการ เพื่อดูโรคและภาวะที่พบบ่อยในบริเวณนั้น',
    'region.allRegions': 'ทุกตำแหน่ง',
    'region.bodyMapLabel': 'แผนภาพร่างกาย เลือกตำแหน่งที่มีอาการ',
    'region.textListLabel': 'รายการตำแหน่งทั้งหมด',

    'home.recentlyReviewed': 'บทความที่ตรวจทานล่าสุด',
    'home.aboutAuthor': 'เกี่ยวกับผู้เขียน',

    'brand.sub': 'Easy Orthopaedic Knowledge for Everyone',
    'brand.promise': 'เข้าใจอาการ รู้ทางเลือก ดูแลตัวเองได้',

    'hero.body':
      'ความรู้เรื่องกระดูก ข้อ กล้ามเนื้อ และเส้นเอ็น อธิบายให้เข้าใจง่าย อ้างอิงหลักฐานทางการแพทย์',
    'hero.popularLabel': 'หัวข้อที่คนค้นบ่อย:',
    'hero.note': 'ความรู้ที่ดี ช่วยให้คุณกลับมาใช้ชีวิตได้อีกครั้ง',
    'hero.badge': 'สุขภาพข้อดี เริ่มได้จากความเข้าใจ',
    'hero.imageAlt': 'ภาพประกอบชายคนหนึ่งใช้มือจับไหล่ข้างที่ปวด โดยมีสัญลักษณ์แสดงตำแหน่งที่ปวดบริเวณไหล่',

    'home.whereTitle': 'ปวดตรงไหน?',
    'home.whereSub': 'เลือกบริเวณที่มีอาการ เพื่อดูข้อมูลที่เกี่ยวข้อง',

    'home.wantTitle': 'คุณอยากรู้อะไร?',
    'home.wantSub': 'เลือกเมนูที่ตรงกับสิ่งที่คุณต้องการ',
    'home.want1Title': 'ฉันเป็นอะไร?',
    'home.want1Body': 'ประเมินอาการเบื้องต้น และทำความเข้าใจโรคที่พบบ่อย',
    'home.want2Title': 'ผล X-ray / MRI หมายความว่าอะไร?',
    'home.want2Body': 'แปลศัพท์ทางการแพทย์ให้เข้าใจง่าย',
    'home.want3Title': 'ต้องรักษาอย่างไร?',
    'home.want3Body': 'รู้จักทางเลือกการรักษา ข้อดี ข้อเสีย และสิ่งที่ควรพิจารณา',
    'home.want4Title': 'ฉันควรทำอะไรตอนนี้?',
    'home.want4Body': 'คำแนะนำเบื้องต้น การออกกำลังกาย และการฟื้นฟู',

    'home.popularTitle': 'โรคและอาการยอดนิยม',
    'home.popularSub': 'เรื่องที่คนค้นหามากที่สุด',
    'home.viewAllConditions': 'ดูโรคทั้งหมด',
    'home.latestTitle': 'บทความล่าสุด',
    'home.viewAllArticles': 'ดูบทความทั้งหมด',
    'home.emptyConditions': 'บทความชุดแรกกำลังอยู่ระหว่างการตรวจทาน และจะเผยแพร่เร็ว ๆ นี้',

    'section.inProgress': 'กำลังจัดทำ',
    'section.plannedBody':
      'ส่วนนี้กำลังอยู่ระหว่างการเขียนและตรวจทาน เราจะเผยแพร่เมื่อเนื้อหาผ่านการตรวจทานเรียบร้อยแล้ว ระหว่างนี้ลองดูช่องทางด้านล่าง',

    'triage.title': 'อาการแบบไหนควรพบแพทย์?',
    'triage.sub': 'แนวทางประเมินเบื้องต้น ไม่ใช่การวินิจฉัย หากไม่แน่ใจ ควรปรึกษาแพทย์เสมอ',
    'triage.greenLabel': 'มักดูแลเบื้องต้นได้',
    'triage.greenBody':
      'อาการไม่รุนแรง ค่อย ๆ ดีขึ้นเอง ยังเดินและใช้งานได้ตามปกติ ไม่มีสัญญาณเตือนด้านล่าง',
    'triage.amberLabel': 'ควรนัดพบแพทย์',
    'triage.amberBody':
      'ปวดต่อเนื่องเกินสองถึงสามสัปดาห์ รบกวนการนอนหรือการทำงาน หรือดูแลตนเองแล้วยังไม่ดีขึ้น',
    'triage.redLabel': 'ควรพบแพทย์ทันที',
    'triage.redBody':
      'บาดเจ็บรุนแรง ลงน้ำหนักไม่ได้ ข้อบวมแดงร้อนร่วมกับมีไข้ ชาหรืออ่อนแรงเฉียบพลัน หรือควบคุมการขับถ่ายไม่ได้',
    'triage.emergency': 'กรณีฉุกเฉิน โทร 1669 หรือไปห้องฉุกเฉินที่ใกล้ที่สุด',

    'tools.appsTitle': 'แอปดูแลตัวเอง',
    'tools.appsIntro':
      'แอปเหล่านี้ใช้งานฟรี ไม่ต้องสมัครสมาชิก จัดทำโดยผู้เขียนเว็บไซต์นี้ สแกนคิวอาร์โค้ดด้วยกล้องมือถือ หรือกดปุ่มเพื่อเปิด',
    'tools.scanToOpen': 'สแกนเพื่อเปิดแอป',
    'tools.shareTitle': 'แชร์เว็บไซต์นี้',
    'tools.shareIntro':
      'สแกนหรือส่งลิงก์นี้ให้ผู้ที่อยากอ่านข้อมูลเพิ่มเติม เหมาะสำหรับพิมพ์ติดไว้ที่ห้องตรวจหรือส่งต่อให้ผู้ป่วย',
    'tools.scanSite': 'สแกนเพื่อเปิดเว็บไซต์',
    'tools.qrFor': 'คิวอาร์โค้ดสำหรับ {name}',

    'trust.evidence': 'เนื้อหาอ้างอิงจากหลักฐานทางการแพทย์',
    'trust.reviewed': 'ตรวจสอบโดยแพทย์ผู้เชี่ยวชาญ',
    'trust.plain': 'เข้าใจง่ายสำหรับทุกคน',
    'trust.life': 'เพื่อสุขภาพที่ดีขึ้นในทุกช่วงชีวิต',

    'footer.motto': 'ความรู้วันนี้ เพื่อการเคลื่อนไหวที่ดีในวันพรุ่งนี้',
    'footer.slogan': 'Move Better. Live Better.',

    'footer.disclaimer':
      'เนื้อหาบนเว็บไซต์นี้เป็นความรู้ทั่วไป ไม่ใช่คำแนะนำทางการแพทย์เฉพาะบุคคล และไม่สามารถใช้แทนการตรวจและปรึกษาแพทย์ได้',
    'footer.about': 'เกี่ยวกับเว็บไซต์',
    'footer.disclaimerLink': 'ข้อจำกัดความรับผิดชอบ',
    'footer.privacy': 'นโยบายความเป็นส่วนตัว',
    'footer.editorial': 'นโยบายด้านเนื้อหา',
    'footer.contact': 'ติดต่อ',
    'footer.emergency': 'กรณีฉุกเฉิน โทร 1669',
    'footer.lastBuilt': 'ปรับปรุงเว็บไซต์เมื่อ',
    'footer.rights': 'สงวนลิขสิทธิ์',

    'error.404.title': 'ไม่พบหน้าที่ต้องการ',
    'error.404.body': 'หน้าที่ท่านเปิดอาจถูกย้ายหรือไม่มีอยู่แล้ว ลองค้นหาหรือกลับไปที่หน้ารวมบทความ',
  },

  en: {
    'site.name': 'Easyortho',
    'site.tagline': 'Orthopaedic problems explained simply, by an orthopaedic surgeon',
    'site.description':
      'Plain-language information about common bone, joint and muscle problems, written and reviewed by an orthopaedic surgeon.',

    'nav.home': 'Home',
    'nav.conditions': 'Conditions',
    'nav.regions': 'Body regions',
    'nav.apps': 'Self-care apps',
    'nav.about': 'About',
    'nav.menu': 'Menu',
    'nav.close': 'Close',

    'a11y.skipToContent': 'Skip to content',
    'a11y.mainNav': 'Main navigation',
    'a11y.breadcrumb': 'Breadcrumb',

    'lang.switch': 'ไทย',
    'lang.switchLabel': 'Read this page in Thai',
    'lang.comingSoon': 'English version coming soon',

    'search.label': 'Search',
    'search.placeholder': 'Search a symptom or condition, e.g. knee pain',
    'search.devNotice':
      'Search only works on a built site. Run npm run build, then npm run preview.',
    'search.hint': 'Type a symptom or the name of a condition, e.g. knee pain.',
    'search.searching': 'Searching…',
    'search.results': '{n} results',
    'search.noResults': 'No results for “{q}”',
    'search.noResultsHint': 'Try a shorter word, or browse all conditions.',
    'search.browseAll': 'Browse all conditions',
    'search.unavailable': 'Search is temporarily unavailable. Please browse all conditions instead.',

    'common.readMore': 'Read more',
    'common.readingTime': '{n} min read',
    'common.comingSoon': 'Coming soon',
    'common.backToTop': 'Back to top',
    'common.viewAll': 'View all',
    'common.article': 'article',
    'common.articleCount': '{n} articles',
    'article.lastReviewed': 'Last reviewed',
    'article.writtenBy': 'Written by',
    'article.onThisPage': 'On this page',
    'article.keyFacts': 'Key facts',
    'article.whenToSeeDoctor': 'When to see a doctor',
    'article.redFlagsTitle': 'See a doctor straight away if you have',
    'article.redFlagsUrgent':
      'If any of the following apply, go to a doctor or an emergency department now, or call 1669.',
    'article.draftTitle': 'Draft — not published',
    'article.draftBody':
      'This page is a draft that has not been medically reviewed. It is here so the author can read and correct it before publication. Do not rely on it for your own care; it will not appear on the live site until he has reviewed it.',

    'article.faq': 'Frequently asked questions',
    'article.references': 'References',
    'article.related': 'Related conditions',
    'article.relatedConditions': 'Related conditions',
    'articles.count': '{articles} articles and {videos} demonstration videos',
    'articles.videos': 'Demonstration videos',
    'articles.videosBody':
      'The clips are silent, and each one sits in an article that explains how to do the movement and what to watch for. Choosing a clip opens that article.',
    'articles.clip': 'Video',
    'article.doctorChecklist': 'Questions to ask your doctor',
    'article.helpful': 'Was this helpful?',
    'article.helpfulYes': 'Yes',
    'article.helpfulNo': 'Not quite',
    'article.reviewOverdue':
      'This article is past its review date. The author is bringing it up to date.',

    'media.play': 'Play video',
    'media.videoHint': 'A short clip with no sound. Nothing downloads until you press play.',

    'apps.sectionTitle': 'A self-care app for this condition',
    'apps.free': 'Free, and made by the author of this article.',
    'apps.open': 'Open the app',
    'apps.pageTitle': 'Self-care apps',
    'apps.helpsWith': 'Helps with',

    'region.browseTitle': 'Browse by body region',
    'region.browseIntro': 'Choose the part of the body that hurts to see the common problems there.',
    'region.allRegions': 'All regions',
    'region.bodyMapLabel': 'Body map. Choose the area where you have symptoms.',
    'region.textListLabel': 'All body regions as a list',

    'home.recentlyReviewed': 'Recently reviewed',
    'home.aboutAuthor': 'About the author',

    'brand.sub': 'Easy Orthopaedic Knowledge for Everyone',
    'brand.promise': 'Understand your symptoms, know your options, look after yourself',

    'hero.body':
      'Bone, joint, muscle and tendon problems explained in plain language, grounded in medical evidence.',
    'hero.popularLabel': 'Commonly looked up:',
    'hero.note': 'Understanding your condition helps you get your life back.',
    'hero.badge': 'Healthy joints start with understanding',
    'hero.imageAlt': 'Illustration of a man holding his shoulder, with a marker showing where the pain is.',

    'home.whereTitle': 'Where does it hurt?',
    'home.whereSub': 'Choose the area with symptoms to see what is relevant.',

    'home.wantTitle': 'What would you like to know?',
    'home.wantSub': 'Pick whichever matches what you need.',
    'home.want1Title': 'What is wrong with me?',
    'home.want1Body': 'Make sense of your symptoms and the conditions that cause them.',
    'home.want2Title': 'What does my X-ray or MRI mean?',
    'home.want2Body': 'Medical terms translated into plain language.',
    'home.want3Title': 'How is it treated?',
    'home.want3Body': 'The treatment options, their trade-offs, and what to weigh up.',
    'home.want4Title': 'What should I do now?',
    'home.want4Body': 'Practical first steps, exercise and rehabilitation.',

    'home.popularTitle': 'Common conditions',
    'home.popularSub': 'What people look for most',
    'home.viewAllConditions': 'All conditions',
    'home.latestTitle': 'Latest articles',
    'home.viewAllArticles': 'All articles',
    'home.emptyConditions': 'The first articles are being reviewed and will be published shortly.',

    'section.inProgress': 'In preparation',
    'section.plannedBody':
      'This section is being written and reviewed, and will be published once it has been checked. In the meantime, try one of these.',

    'triage.title': 'Which symptoms need a doctor?',
    'triage.sub':
      'A general guide, not a diagnosis. If you are unsure, always ask a doctor.',
    'triage.greenLabel': 'Usually safe to manage yourself',
    'triage.greenBody':
      'Mild symptoms that are slowly improving, you can still walk and use the limb normally, and none of the warning signs below.',
    'triage.amberLabel': 'Arrange to see a doctor',
    'triage.amberBody':
      'Pain lasting more than two to three weeks, disturbing your sleep or work, or not improving with self-care.',
    'triage.redLabel': 'See a doctor straight away',
    'triage.redBody':
      'A serious injury, being unable to bear weight, a joint that is swollen, red and hot with a fever, sudden numbness or weakness, or loss of bladder or bowel control.',
    'triage.emergency': 'In an emergency call 1669 or go to the nearest emergency department.',

    'tools.appsTitle': 'Self-care apps',
    'tools.appsIntro':
      'These apps are free and need no account. They are made by the author of this site. Scan a code with your phone camera, or use the button.',
    'tools.scanToOpen': 'Scan to open the app',
    'tools.shareTitle': 'Share this site',
    'tools.shareIntro':
      'Scan or pass on this link. Handy to print for a clinic room, or to send to someone who wants to read more.',
    'tools.scanSite': 'Scan to open the site',
    'tools.qrFor': 'QR code for {name}',

    'trust.evidence': 'Grounded in medical evidence',
    'trust.reviewed': 'Reviewed by a specialist',
    'trust.plain': 'Written to be understood',
    'trust.life': 'For better health at every stage of life',

    'footer.motto': 'What you learn today is how well you move tomorrow.',
    'footer.slogan': 'Move Better. Live Better.',

    'footer.disclaimer':
      'Everything here is general information. It is not personal medical advice and cannot replace being examined by a doctor.',
    'footer.about': 'About',
    'footer.disclaimerLink': 'Medical disclaimer',
    'footer.privacy': 'Privacy notice',
    'footer.editorial': 'Editorial policy',
    'footer.contact': 'Contact',
    'footer.emergency': 'Emergency in Thailand: call 1669',
    'footer.lastBuilt': 'Site last built',
    'footer.rights': 'All rights reserved',

    'error.404.title': 'Page not found',
    'error.404.body':
      'This page may have moved or may no longer exist. Try a search, or go back to the list of conditions.',
  },
} as const;

export type UIKey = keyof (typeof ui)['th'];

/** Returns a lookup function for the given locale, falling back to Thai. */
export function t(locale: Locale) {
  return (key: UIKey, vars?: Record<string, string | number>): string => {
    const dict = ui[locale] as Record<string, string>;
    let value = dict[key] ?? (ui[defaultLocale] as Record<string, string>)[key] ?? key;
    if (vars) {
      for (const [name, replacement] of Object.entries(vars)) {
        value = value.replace(`{${name}}`, String(replacement));
      }
    }
    return value;
  };
}

export default ui;
