# RueOrtho — AI image generation and website integration prompts

Repository reviewed: `aoenotebook-hue/rueortho` (Astro). This plan covers the 38 unique article topics in the site’s Articles index: Conditions, Examinations, Rehabilitation, and Treatments. Thai and English versions share the same topic/slug, so generate one shared visual set per topic and reuse it in both locales.

**Total planned files: 114 images (3 per unique article).**

## 1. Visual standard for the whole site

- Style: clean patient-friendly cartoon / flat-vector medical illustration.
- No text inside images: no labels, letters, numbers, captions, logos, watermarks, or brand names.
- Palette: white/pale-blue background; navy outlines; soft blue/teal accents; coral-red/orange only for pain/pathology.
- Anatomy: clinically plausible, simplified but accurate, calm and non-alarming; no gore.
- Accessibility: one teaching point per image, strong contrast, easy to understand on a phone and for older readers.
- Default ratio: **4:3 landscape**.
- Generate at **1600×1200 px** unless noted otherwise. After approval, the coding tool can convert to WebP at about quality 84–88.
- Do not use AI-generated text inside the artwork. Any explanation belongs in the article caption/alt text, not in the pixels.

## 2. Recommended asset structure

```text
src/assets/article-images/
  conditions/<slug>/...
  examinations/<slug>/...
  rehabilitation/<slug>/...
  treatments/<slug>/...
```

For **condition articles**, the first file is the article hero and should replace/set the existing `heroImage`; the next two are inline teaching figures. For **examinations, rehabilitation, and treatment articles**, keep all three as inline `<Figure>` images because those resource schemas currently do not use a hero-image field.

## 3. Image-generation prompts — Conditions

### 1. Achilles tendinopathy (`achilles-tendinopathy`)

#### Image 1 — Hero

- **File:** `src/assets/article-images/conditions/achilles-tendinopathy/achilles-tendinopathy-hero.webp`
- **Size:** 1600×1200 px (4:3)
- **Suggested position:** Condition hero: directly under title and summary.
- **Suggested alt text (English):** Recreational runner holding the back of the heel where the Achilles tendon is painful.

**AI image prompt:**

```text
Output: 1600x1200 px, 4:3 landscape. Create a clean, patient-friendly flat-vector/cartoon medical illustration for an orthopaedic education website. Use a white-to-pale-blue background, dark navy outlines, soft blue/teal clothing and accents, warm natural skin tones, and coral-red/orange only to highlight pain or pathology. Keep anatomy clinically plausible and proportional, with one clear teaching point. Use simple high-contrast shapes that remain understandable on a phone and for older readers. No words, letters, numbers, labels, captions, logos, watermarks, brand names, gore, exposed surgical wounds, or frightening imagery. Do not exaggerate disease severity. Avoid decorative clutter. The image must be self-explanatory without text. Scene: An adult recreational runner standing after activity and gently holding the back of one heel. Show a small, localized red highlight along the Achilles tendon just above the heel bone, not the whole ankle. Natural stance, supportive running shoes, calm expression, no dramatic injury event.
```

#### Image 2 — Anatomy / pathology

- **File:** `src/assets/article-images/conditions/achilles-tendinopathy/achilles-tendinopathy-anatomy.webp`
- **Size:** 1600×1200 px (4:3)
- **Suggested position:** Inline after the first explanatory section, “What it is”.
- **Suggested alt text (English):** Side-view anatomy of the Achilles tendon from the calf to the heel bone with a mildly thickened painful segment.

**AI image prompt:**

```text
Output: 1600x1200 px, 4:3 landscape. Create a clean, patient-friendly flat-vector/cartoon medical illustration for an orthopaedic education website. Use a white-to-pale-blue background, dark navy outlines, soft blue/teal clothing and accents, warm natural skin tones, and coral-red/orange only to highlight pain or pathology. Keep anatomy clinically plausible and proportional, with one clear teaching point. Use simple high-contrast shapes that remain understandable on a phone and for older readers. No words, letters, numbers, labels, captions, logos, watermarks, brand names, gore, exposed surgical wounds, or frightening imagery. Do not exaggerate disease severity. Avoid decorative clutter. The image must be self-explanatory without text. Scene: Side-view cutaway of the lower calf, ankle and heel. Clearly show the calf muscles narrowing into the Achilles tendon and attaching to the calcaneus. Show a mildly thickened, irritated segment of the tendon at the mid-portion or insertion with a subtle coral highlight. Keep the tendon continuous: this is tendinopathy, not a complete rupture.
```

#### Image 3 — Useful management

- **File:** `src/assets/article-images/conditions/achilles-tendinopathy/achilles-tendinopathy-care.webp`
- **Size:** 1600×1200 px (4:3)
- **Suggested position:** Inline in “Treatment options” or “Recovery and rehabilitation”.
- **Suggested alt text (English):** Person performing a controlled heel-lowering exercise on a step while holding a rail.

**AI image prompt:**

```text
Output: 1600x1200 px, 4:3 landscape. Create a clean, patient-friendly flat-vector/cartoon medical illustration for an orthopaedic education website. Use a white-to-pale-blue background, dark navy outlines, soft blue/teal clothing and accents, warm natural skin tones, and coral-red/orange only to highlight pain or pathology. Keep anatomy clinically plausible and proportional, with one clear teaching point. Use simple high-contrast shapes that remain understandable on a phone and for older readers. No words, letters, numbers, labels, captions, logos, watermarks, brand names, gore, exposed surgical wounds, or frightening imagery. Do not exaggerate disease severity. Avoid decorative clutter. The image must be self-explanatory without text. Scene: An adult performing a slow controlled heel-lowering exercise on the edge of a low step, holding a stable rail with one hand. The working heel lowers slightly below the step while the knee and ankle stay aligned. Show a second faint ghosted position at the top to communicate the controlled up-and-down movement without arrows or text.
```

### 2. ACL injury (`acl-injury`)

#### Image 1 — Hero

- **File:** `src/assets/article-images/conditions/acl-injury/acl-injury-hero.webp`
- **Size:** 1600×1200 px (4:3)
- **Suggested position:** Condition hero: directly under title and summary.
- **Suggested alt text (English):** Athlete during a non-contact pivot with pain highlighted at the knee.

**AI image prompt:**

```text
Output: 1600x1200 px, 4:3 landscape. Create a clean, patient-friendly flat-vector/cartoon medical illustration for an orthopaedic education website. Use a white-to-pale-blue background, dark navy outlines, soft blue/teal clothing and accents, warm natural skin tones, and coral-red/orange only to highlight pain or pathology. Keep anatomy clinically plausible and proportional, with one clear teaching point. Use simple high-contrast shapes that remain understandable on a phone and for older readers. No words, letters, numbers, labels, captions, logos, watermarks, brand names, gore, exposed surgical wounds, or frightening imagery. Do not exaggerate disease severity. Avoid decorative clutter. The image must be self-explanatory without text. Scene: A field-sport athlete making a non-contact change of direction with one foot planted and the knee slightly collapsing inward, immediately reaching toward the knee. Use a small red highlight inside the knee. Do not show a fall, collision, visible deformity, or gore.
```

#### Image 2 — Anatomy / pathology

- **File:** `src/assets/article-images/conditions/acl-injury/acl-injury-anatomy.webp`
- **Size:** 1600×1200 px (4:3)
- **Suggested position:** Inline in “What it is” after the ACL is first explained.
- **Suggested alt text (English):** Cutaway knee anatomy showing a torn anterior cruciate ligament and an intact posterior cruciate ligament.

**AI image prompt:**

```text
Output: 1600x1200 px, 4:3 landscape. Create a clean, patient-friendly flat-vector/cartoon medical illustration for an orthopaedic education website. Use a white-to-pale-blue background, dark navy outlines, soft blue/teal clothing and accents, warm natural skin tones, and coral-red/orange only to highlight pain or pathology. Keep anatomy clinically plausible and proportional, with one clear teaching point. Use simple high-contrast shapes that remain understandable on a phone and for older readers. No words, letters, numbers, labels, captions, logos, watermarks, brand names, gore, exposed surgical wounds, or frightening imagery. Do not exaggerate disease severity. Avoid decorative clutter. The image must be self-explanatory without text. Scene: Educational cutaway of a knee joint showing femur, tibia, patella, menisci, PCL and ACL. The ACL should run diagonally from the femur to the front-central tibia and show a realistic torn segment with separated or frayed fibers highlighted in coral. Keep the PCL intact for orientation and do not show multiple injuries.
```

#### Image 3 — Rehabilitation pathway

- **File:** `src/assets/article-images/conditions/acl-injury/acl-injury-care.webp`
- **Size:** 1600×1200 px (4:3)
- **Suggested position:** Inline in “Recovery and rehabilitation”.
- **Suggested alt text (English):** Three-stage ACL rehabilitation progression from quadriceps activation to balance and controlled running.

**AI image prompt:**

```text
Output: 1600x1200 px, 4:3 landscape. Create a clean, patient-friendly flat-vector/cartoon medical illustration for an orthopaedic education website. Use a white-to-pale-blue background, dark navy outlines, soft blue/teal clothing and accents, warm natural skin tones, and coral-red/orange only to highlight pain or pathology. Keep anatomy clinically plausible and proportional, with one clear teaching point. Use simple high-contrast shapes that remain understandable on a phone and for older readers. No words, letters, numbers, labels, captions, logos, watermarks, brand names, gore, exposed surgical wounds, or frightening imagery. Do not exaggerate disease severity. Avoid decorative clutter. The image must be self-explanatory without text. Scene: Three-panel progression in one landscape image: first, a patient doing quadriceps activation with the knee supported; second, supported single-leg balance; third, a controlled low-intensity return-to-running drill. The same adult appears in all panels, with progressively more demanding activity. No dates, stage numbers, or text.
```

### 3. Ankle sprain (`ankle-sprain`)

#### Image 1 — Hero

- **File:** `src/assets/article-images/conditions/ankle-sprain/ankle-sprain-hero.webp`
- **Size:** 1600×1200 px (4:3)
- **Suggested position:** Condition hero: directly under title and summary.
- **Suggested alt text (English):** Foot rolling inward during an ankle sprain with pain highlighted on the outer ankle.

**AI image prompt:**

```text
Output: 1600x1200 px, 4:3 landscape. Create a clean, patient-friendly flat-vector/cartoon medical illustration for an orthopaedic education website. Use a white-to-pale-blue background, dark navy outlines, soft blue/teal clothing and accents, warm natural skin tones, and coral-red/orange only to highlight pain or pathology. Keep anatomy clinically plausible and proportional, with one clear teaching point. Use simple high-contrast shapes that remain understandable on a phone and for older readers. No words, letters, numbers, labels, captions, logos, watermarks, brand names, gore, exposed surgical wounds, or frightening imagery. Do not exaggerate disease severity. Avoid decorative clutter. The image must be self-explanatory without text. Scene: An adult during a mild inversion ankle sprain while stepping or playing sport: the foot rolls inward and the person reacts to pain. Highlight only the outside of the ankle with a small coral glow. No fall, fracture deformity, or severe swelling.
```

#### Image 2 — Anatomy / pathology

- **File:** `src/assets/article-images/conditions/ankle-sprain/ankle-sprain-anatomy.webp`
- **Size:** 1600×1200 px (4:3)
- **Suggested position:** Inline after “What it is”.
- **Suggested alt text (English):** Outer ankle anatomy with the lateral ligaments highlighted after a sprain.

**AI image prompt:**

```text
Output: 1600x1200 px, 4:3 landscape. Create a clean, patient-friendly flat-vector/cartoon medical illustration for an orthopaedic education website. Use a white-to-pale-blue background, dark navy outlines, soft blue/teal clothing and accents, warm natural skin tones, and coral-red/orange only to highlight pain or pathology. Keep anatomy clinically plausible and proportional, with one clear teaching point. Use simple high-contrast shapes that remain understandable on a phone and for older readers. No words, letters, numbers, labels, captions, logos, watermarks, brand names, gore, exposed surgical wounds, or frightening imagery. Do not exaggerate disease severity. Avoid decorative clutter. The image must be self-explanatory without text. Scene: Lateral-view ankle anatomy showing fibula, talus, calcaneus and the main outer ankle ligaments. Emphasize the anterior talofibular ligament and calcaneofibular ligament with a small realistic stretch or partial tear and localized coral highlight. Bones remain normally aligned; no fracture.
```

#### Image 3 — Early recovery

- **File:** `src/assets/article-images/conditions/ankle-sprain/ankle-sprain-care.webp`
- **Size:** 1600×1200 px (4:3)
- **Suggested position:** Inline in “Treatment options” or “Recovery and rehabilitation”.
- **Suggested alt text (English):** Person using an ankle brace for supported walking with a second scene showing comfortable elevation.

**AI image prompt:**

```text
Output: 1600x1200 px, 4:3 landscape. Create a clean, patient-friendly flat-vector/cartoon medical illustration for an orthopaedic education website. Use a white-to-pale-blue background, dark navy outlines, soft blue/teal clothing and accents, warm natural skin tones, and coral-red/orange only to highlight pain or pathology. Keep anatomy clinically plausible and proportional, with one clear teaching point. Use simple high-contrast shapes that remain understandable on a phone and for older readers. No words, letters, numbers, labels, captions, logos, watermarks, brand names, gore, exposed surgical wounds, or frightening imagery. Do not exaggerate disease severity. Avoid decorative clutter. The image must be self-explanatory without text. Scene: A person walking with a supportive lace-up ankle brace and gradually putting weight through the injured side, next to a second small scene of the same person elevating the ankle comfortably. The ankle is protected but not fully immobilized. Calm, practical home-care presentation.
```

### 4. Back pain (`back-pain`)

#### Image 1 — Hero

- **File:** `src/assets/article-images/conditions/back-pain/back-pain-hero.webp`
- **Size:** 1600×1200 px (4:3)
- **Suggested position:** Condition hero: directly under title and summary.
- **Suggested alt text (English):** Adult with nonspecific lower back pain highlighted across the lumbar area.

**AI image prompt:**

```text
Output: 1600x1200 px, 4:3 landscape. Create a clean, patient-friendly flat-vector/cartoon medical illustration for an orthopaedic education website. Use a white-to-pale-blue background, dark navy outlines, soft blue/teal clothing and accents, warm natural skin tones, and coral-red/orange only to highlight pain or pathology. Keep anatomy clinically plausible and proportional, with one clear teaching point. Use simple high-contrast shapes that remain understandable on a phone and for older readers. No words, letters, numbers, labels, captions, logos, watermarks, brand names, gore, exposed surgical wounds, or frightening imagery. Do not exaggerate disease severity. Avoid decorative clutter. The image must be self-explanatory without text. Scene: An adult standing beside a desk and placing both hands over the lower back with a mild pain expression. Use a broad, subtle coral highlight over the lumbar region rather than a single pinpoint lesion, because common back pain often has no single visible cause. Normal posture, no dramatic bending.
```

#### Image 2 — Anatomy overview

- **File:** `src/assets/article-images/conditions/back-pain/back-pain-anatomy.webp`
- **Size:** 1600×1200 px (4:3)
- **Suggested position:** Inline after “What it is”.
- **Suggested alt text (English):** Lumbar spine, discs and surrounding muscles shown as an overview of structures that can contribute to back pain.

**AI image prompt:**

```text
Output: 1600x1200 px, 4:3 landscape. Create a clean, patient-friendly flat-vector/cartoon medical illustration for an orthopaedic education website. Use a white-to-pale-blue background, dark navy outlines, soft blue/teal clothing and accents, warm natural skin tones, and coral-red/orange only to highlight pain or pathology. Keep anatomy clinically plausible and proportional, with one clear teaching point. Use simple high-contrast shapes that remain understandable on a phone and for older readers. No words, letters, numbers, labels, captions, logos, watermarks, brand names, gore, exposed surgical wounds, or frightening imagery. Do not exaggerate disease severity. Avoid decorative clutter. The image must be self-explanatory without text. Scene: Posterior and side educational view of the lumbar spine with five lumbar vertebrae, intervertebral discs, sacrum and surrounding paraspinal muscles. Use a soft, diffuse highlight around the lower lumbar area but do not depict a definite herniation, fracture or compressed nerve. Make clear this is an overview of structures, not a diagnosis.
```

#### Image 3 — Self-care / movement

- **File:** `src/assets/article-images/conditions/back-pain/back-pain-care.webp`
- **Size:** 1600×1200 px (4:3)
- **Suggested position:** Inline in “Prevention and self-care” or the main non-surgical treatment section.
- **Suggested alt text (English):** Person staying active with walking, position changes and a gentle back exercise.

**AI image prompt:**

```text
Output: 1600x1200 px, 4:3 landscape. Create a clean, patient-friendly flat-vector/cartoon medical illustration for an orthopaedic education website. Use a white-to-pale-blue background, dark navy outlines, soft blue/teal clothing and accents, warm natural skin tones, and coral-red/orange only to highlight pain or pathology. Keep anatomy clinically plausible and proportional, with one clear teaching point. Use simple high-contrast shapes that remain understandable on a phone and for older readers. No words, letters, numbers, labels, captions, logos, watermarks, brand names, gore, exposed surgical wounds, or frightening imagery. Do not exaggerate disease severity. Avoid decorative clutter. The image must be self-explanatory without text. Scene: Three simple scenes of the same adult: taking a short walk, changing position from sitting to standing at a desk, and doing a gentle pelvic tilt or bridge on an exercise mat. Emphasize staying active and varying positions rather than bed rest or a single perfect posture.
```

### 5. Carpal tunnel syndrome (`carpal-tunnel-syndrome`)

#### Image 1 — Hero

- **File:** `src/assets/article-images/conditions/carpal-tunnel-syndrome/carpal-tunnel-syndrome-hero.webp`
- **Size:** 1600×1200 px (4:3)
- **Suggested position:** Condition hero: directly under title and summary.
- **Suggested alt text (English):** Hand tingling in the median nerve distribution with the wrist highlighted.

**AI image prompt:**

```text
Output: 1600x1200 px, 4:3 landscape. Create a clean, patient-friendly flat-vector/cartoon medical illustration for an orthopaedic education website. Use a white-to-pale-blue background, dark navy outlines, soft blue/teal clothing and accents, warm natural skin tones, and coral-red/orange only to highlight pain or pathology. Keep anatomy clinically plausible and proportional, with one clear teaching point. Use simple high-contrast shapes that remain understandable on a phone and for older readers. No words, letters, numbers, labels, captions, logos, watermarks, brand names, gore, exposed surgical wounds, or frightening imagery. Do not exaggerate disease severity. Avoid decorative clutter. The image must be self-explanatory without text. Scene: Adult at a desk or in bed gently shaking one hand because of numbness and tingling. Highlight the thumb, index finger, middle finger and thumb-side half of the ring finger, plus the palm-side wrist. Keep the little finger unhighlighted to match the median nerve distribution.
```

#### Image 2 — Anatomy / mechanism

- **File:** `src/assets/article-images/conditions/carpal-tunnel-syndrome/carpal-tunnel-syndrome-anatomy.webp`
- **Size:** 1600×1200 px (4:3)
- **Suggested position:** Inline after “What it is”.
- **Suggested alt text (English):** Cross-section of the carpal tunnel showing the median nerve compressed beneath the transverse carpal ligament.

**AI image prompt:**

```text
Output: 1600x1200 px, 4:3 landscape. Create a clean, patient-friendly flat-vector/cartoon medical illustration for an orthopaedic education website. Use a white-to-pale-blue background, dark navy outlines, soft blue/teal clothing and accents, warm natural skin tones, and coral-red/orange only to highlight pain or pathology. Keep anatomy clinically plausible and proportional, with one clear teaching point. Use simple high-contrast shapes that remain understandable on a phone and for older readers. No words, letters, numbers, labels, captions, logos, watermarks, brand names, gore, exposed surgical wounds, or frightening imagery. Do not exaggerate disease severity. Avoid decorative clutter. The image must be self-explanatory without text. Scene: Clean cross-sectional wrist anatomy showing the carpal bones forming a tunnel, flexor tendons within it, and the median nerve directly beneath the transverse carpal ligament. Show the median nerve mildly compressed or flattened with a localized coral highlight. No labels.
```

#### Image 3 — Practical management

- **File:** `src/assets/article-images/conditions/carpal-tunnel-syndrome/carpal-tunnel-syndrome-care.webp`
- **Size:** 1600×1200 px (4:3)
- **Suggested position:** Inline in “Treatment options” or “Prevention and self-care”.
- **Suggested alt text (English):** Neutral wrist splint at night and neutral wrist position during desk work.

**AI image prompt:**

```text
Output: 1600x1200 px, 4:3 landscape. Create a clean, patient-friendly flat-vector/cartoon medical illustration for an orthopaedic education website. Use a white-to-pale-blue background, dark navy outlines, soft blue/teal clothing and accents, warm natural skin tones, and coral-red/orange only to highlight pain or pathology. Keep anatomy clinically plausible and proportional, with one clear teaching point. Use simple high-contrast shapes that remain understandable on a phone and for older readers. No words, letters, numbers, labels, captions, logos, watermarks, brand names, gore, exposed surgical wounds, or frightening imagery. Do not exaggerate disease severity. Avoid decorative clutter. The image must be self-explanatory without text. Scene: A person sleeping with the wrist held straight in a simple neutral-position wrist splint, with a second small desk scene showing the wrist kept neutral during keyboard or mouse use. Do not show the wrist bent strongly up or down.
```

### 6. Frozen shoulder (`frozen-shoulder`)

#### Image 1 — Hero

- **File:** `src/assets/article-images/conditions/frozen-shoulder/frozen-shoulder-hero.webp`
- **Size:** 1600×1200 px (4:3)
- **Suggested position:** Condition hero: directly under title and summary.
- **Suggested alt text (English):** Person with a stiff painful shoulder unable to raise the arm fully overhead.

**AI image prompt:**

```text
Output: 1600x1200 px, 4:3 landscape. Create a clean, patient-friendly flat-vector/cartoon medical illustration for an orthopaedic education website. Use a white-to-pale-blue background, dark navy outlines, soft blue/teal clothing and accents, warm natural skin tones, and coral-red/orange only to highlight pain or pathology. Keep anatomy clinically plausible and proportional, with one clear teaching point. Use simple high-contrast shapes that remain understandable on a phone and for older readers. No words, letters, numbers, labels, captions, logos, watermarks, brand names, gore, exposed surgical wounds, or frightening imagery. Do not exaggerate disease severity. Avoid decorative clutter. The image must be self-explanatory without text. Scene: An adult trying to reach overhead with one arm but stopping well below full elevation because the shoulder is stiff and painful. The other hand may touch the affected shoulder. Use a small red shoulder highlight and show restricted range, not weakness from a tendon tear.
```

#### Image 2 — Anatomy / pathology

- **File:** `src/assets/article-images/conditions/frozen-shoulder/frozen-shoulder-anatomy.webp`
- **Size:** 1600×1200 px (4:3)
- **Suggested position:** Inline after “What it is”.
- **Suggested alt text (English):** Shoulder joint with a thickened and contracted capsule typical of frozen shoulder.

**AI image prompt:**

```text
Output: 1600x1200 px, 4:3 landscape. Create a clean, patient-friendly flat-vector/cartoon medical illustration for an orthopaedic education website. Use a white-to-pale-blue background, dark navy outlines, soft blue/teal clothing and accents, warm natural skin tones, and coral-red/orange only to highlight pain or pathology. Keep anatomy clinically plausible and proportional, with one clear teaching point. Use simple high-contrast shapes that remain understandable on a phone and for older readers. No words, letters, numbers, labels, captions, logos, watermarks, brand names, gore, exposed surgical wounds, or frightening imagery. Do not exaggerate disease severity. Avoid decorative clutter. The image must be self-explanatory without text. Scene: Cutaway glenohumeral joint showing humeral head, glenoid and joint capsule. Depict the capsule as thickened, contracted and tight around the joint, especially at the lower capsule, with a subtle coral highlight. Do not show a torn rotator cuff or dislocation.
```

#### Image 3 — Gentle mobility

- **File:** `src/assets/article-images/conditions/frozen-shoulder/frozen-shoulder-care.webp`
- **Size:** 1600×1200 px (4:3)
- **Suggested position:** Inline in “Recovery and rehabilitation”.
- **Suggested alt text (English):** Gentle pendulum and wall-assisted shoulder mobility exercises performed within a comfortable range.

**AI image prompt:**

```text
Output: 1600x1200 px, 4:3 landscape. Create a clean, patient-friendly flat-vector/cartoon medical illustration for an orthopaedic education website. Use a white-to-pale-blue background, dark navy outlines, soft blue/teal clothing and accents, warm natural skin tones, and coral-red/orange only to highlight pain or pathology. Keep anatomy clinically plausible and proportional, with one clear teaching point. Use simple high-contrast shapes that remain understandable on a phone and for older readers. No words, letters, numbers, labels, captions, logos, watermarks, brand names, gore, exposed surgical wounds, or frightening imagery. Do not exaggerate disease severity. Avoid decorative clutter. The image must be self-explanatory without text. Scene: Two gentle frozen-shoulder exercises: a relaxed pendulum with the body supported on a table and the affected arm hanging, and a wall finger-walk or wall slide stopping at a comfortable height. Show calm, controlled movement and no forceful stretching.
```

### 7. Herniated disc (`herniated-disc`)

#### Image 1 — Hero

- **File:** `src/assets/article-images/conditions/herniated-disc/herniated-disc-hero.webp`
- **Size:** 1600×1200 px (4:3)
- **Suggested position:** Condition hero: directly under title and summary.
- **Suggested alt text (English):** Adult with lower back pain and one-sided leg pain suggesting nerve irritation.

**AI image prompt:**

```text
Output: 1600x1200 px, 4:3 landscape. Create a clean, patient-friendly flat-vector/cartoon medical illustration for an orthopaedic education website. Use a white-to-pale-blue background, dark navy outlines, soft blue/teal clothing and accents, warm natural skin tones, and coral-red/orange only to highlight pain or pathology. Keep anatomy clinically plausible and proportional, with one clear teaching point. Use simple high-contrast shapes that remain understandable on a phone and for older readers. No words, letters, numbers, labels, captions, logos, watermarks, brand names, gore, exposed surgical wounds, or frightening imagery. Do not exaggerate disease severity. Avoid decorative clutter. The image must be self-explanatory without text. Scene: Adult with lower back pain and one-sided pain travelling into the buttock and leg. Use a modest coral path from the low back into one leg to suggest nerve-related symptoms, without implying severe paralysis or emergency signs.
```

#### Image 2 — Anatomy / pathology

- **File:** `src/assets/article-images/conditions/herniated-disc/herniated-disc-anatomy.webp`
- **Size:** 1600×1200 px (4:3)
- **Suggested position:** Inline after “What it is”.
- **Suggested alt text (English):** Lumbar disc protrusion contacting a nearby nerve root.

**AI image prompt:**

```text
Output: 1600x1200 px, 4:3 landscape. Create a clean, patient-friendly flat-vector/cartoon medical illustration for an orthopaedic education website. Use a white-to-pale-blue background, dark navy outlines, soft blue/teal clothing and accents, warm natural skin tones, and coral-red/orange only to highlight pain or pathology. Keep anatomy clinically plausible and proportional, with one clear teaching point. Use simple high-contrast shapes that remain understandable on a phone and for older readers. No words, letters, numbers, labels, captions, logos, watermarks, brand names, gore, exposed surgical wounds, or frightening imagery. Do not exaggerate disease severity. Avoid decorative clutter. The image must be self-explanatory without text. Scene: Sagittal-oblique educational view of two or three lumbar vertebrae and discs. One disc has a realistic posterolateral protrusion touching or crowding a nearby exiting nerve root. Keep the protrusion moderate and show surrounding anatomy clearly; no large extrusion unless necessary.
```

#### Image 3 — Conservative care

- **File:** `src/assets/article-images/conditions/herniated-disc/herniated-disc-care.webp`
- **Size:** 1600×1200 px (4:3)
- **Suggested position:** Inline in “Treatment options” or “Recovery and rehabilitation”.
- **Suggested alt text (English):** Conservative back care with walking, position changes and a comfortable supported rest position.

**AI image prompt:**

```text
Output: 1600x1200 px, 4:3 landscape. Create a clean, patient-friendly flat-vector/cartoon medical illustration for an orthopaedic education website. Use a white-to-pale-blue background, dark navy outlines, soft blue/teal clothing and accents, warm natural skin tones, and coral-red/orange only to highlight pain or pathology. Keep anatomy clinically plausible and proportional, with one clear teaching point. Use simple high-contrast shapes that remain understandable on a phone and for older readers. No words, letters, numbers, labels, captions, logos, watermarks, brand names, gore, exposed surgical wounds, or frightening imagery. Do not exaggerate disease severity. Avoid decorative clutter. The image must be self-explanatory without text. Scene: Three calm scenes: a short walk, changing from sitting to standing, and lying in a comfortable supported position. Emphasize gentle activity and position changes rather than prolonged bed rest. No forceful spinal manipulation or extreme stretching.
```

### 8. Hip pain (`hip-pain`)

#### Image 1 — Hero

- **File:** `src/assets/article-images/conditions/hip-pain/hip-pain-hero.webp`
- **Size:** 1600×1200 px (4:3)
- **Suggested position:** Condition hero: directly under title and summary.
- **Suggested alt text (English):** Adult indicating pain around the hip and groin area.

**AI image prompt:**

```text
Output: 1600x1200 px, 4:3 landscape. Create a clean, patient-friendly flat-vector/cartoon medical illustration for an orthopaedic education website. Use a white-to-pale-blue background, dark navy outlines, soft blue/teal clothing and accents, warm natural skin tones, and coral-red/orange only to highlight pain or pathology. Keep anatomy clinically plausible and proportional, with one clear teaching point. Use simple high-contrast shapes that remain understandable on a phone and for older readers. No words, letters, numbers, labels, captions, logos, watermarks, brand names, gore, exposed surgical wounds, or frightening imagery. Do not exaggerate disease severity. Avoid decorative clutter. The image must be self-explanatory without text. Scene: An adult standing and indicating pain around the front/side of one hip and groin with one hand. Use a small soft highlight over the hip joint region rather than a large dramatic pain glow. Neutral everyday setting.
```

#### Image 2 — Anatomy overview

- **File:** `src/assets/article-images/conditions/hip-pain/hip-pain-anatomy.webp`
- **Size:** 1600×1200 px (4:3)
- **Suggested position:** Inline after “What it is”.
- **Suggested alt text (English):** Overview of the hip joint and surrounding soft tissues that can contribute to hip pain.

**AI image prompt:**

```text
Output: 1600x1200 px, 4:3 landscape. Create a clean, patient-friendly flat-vector/cartoon medical illustration for an orthopaedic education website. Use a white-to-pale-blue background, dark navy outlines, soft blue/teal clothing and accents, warm natural skin tones, and coral-red/orange only to highlight pain or pathology. Keep anatomy clinically plausible and proportional, with one clear teaching point. Use simple high-contrast shapes that remain understandable on a phone and for older readers. No words, letters, numbers, labels, captions, logos, watermarks, brand names, gore, exposed surgical wounds, or frightening imagery. Do not exaggerate disease severity. Avoid decorative clutter. The image must be self-explanatory without text. Scene: Educational hip overview showing pelvis, femoral head and neck, acetabulum, articular cartilage, labrum area and the main lateral gluteal tendons. Use subtle neutral emphasis on several structures without claiming one specific diagnosis.
```

#### Image 3 — Assessment / movement

- **File:** `src/assets/article-images/conditions/hip-pain/hip-pain-care.webp`
- **Size:** 1600×1200 px (4:3)
- **Suggested position:** Inline in “How it is diagnosed” or “Recovery and rehabilitation”.
- **Suggested alt text (English):** Hip assessment followed by a simple side-lying hip strengthening exercise.

**AI image prompt:**

```text
Output: 1600x1200 px, 4:3 landscape. Create a clean, patient-friendly flat-vector/cartoon medical illustration for an orthopaedic education website. Use a white-to-pale-blue background, dark navy outlines, soft blue/teal clothing and accents, warm natural skin tones, and coral-red/orange only to highlight pain or pathology. Keep anatomy clinically plausible and proportional, with one clear teaching point. Use simple high-contrast shapes that remain understandable on a phone and for older readers. No words, letters, numbers, labels, captions, logos, watermarks, brand names, gore, exposed surgical wounds, or frightening imagery. Do not exaggerate disease severity. Avoid decorative clutter. The image must be self-explanatory without text. Scene: Two-panel scene: clinician gently checking hip range of motion with the patient lying comfortably, and the patient performing a simple side-lying hip abduction exercise with the pelvis level. Clinical and calm, no painful forcing.
```

### 9. Knee osteoarthritis (`knee-osteoarthritis`)

#### Image 1 — Hero

- **File:** `src/assets/article-images/conditions/knee-osteoarthritis/knee-osteoarthritis-hero.webp`
- **Size:** 1600×1200 px (4:3)
- **Suggested position:** Condition hero: directly under title and summary.
- **Suggested alt text (English):** Older adult with knee pain while rising from a chair.

**AI image prompt:**

```text
Output: 1600x1200 px, 4:3 landscape. Create a clean, patient-friendly flat-vector/cartoon medical illustration for an orthopaedic education website. Use a white-to-pale-blue background, dark navy outlines, soft blue/teal clothing and accents, warm natural skin tones, and coral-red/orange only to highlight pain or pathology. Keep anatomy clinically plausible and proportional, with one clear teaching point. Use simple high-contrast shapes that remain understandable on a phone and for older readers. No words, letters, numbers, labels, captions, logos, watermarks, brand names, gore, exposed surgical wounds, or frightening imagery. Do not exaggerate disease severity. Avoid decorative clutter. The image must be self-explanatory without text. Scene: Older adult with knee pain while rising from a chair or using stairs, one hand on the knee. Use a small localized red highlight around the joint line. Show an active, independent adult rather than a frail stereotype.
```

#### Image 2 — Anatomy / pathology

- **File:** `src/assets/article-images/conditions/knee-osteoarthritis/knee-osteoarthritis-anatomy.webp`
- **Size:** 1600×1200 px (4:3)
- **Suggested position:** Inline after “What it is”; replace the current temporary knee-anatomy placeholder.
- **Suggested alt text (English):** Knee joint with moderate cartilage thinning, joint-space narrowing and small osteophytes.

**AI image prompt:**

```text
Output: 1600x1200 px, 4:3 landscape. Create a clean, patient-friendly flat-vector/cartoon medical illustration for an orthopaedic education website. Use a white-to-pale-blue background, dark navy outlines, soft blue/teal clothing and accents, warm natural skin tones, and coral-red/orange only to highlight pain or pathology. Keep anatomy clinically plausible and proportional, with one clear teaching point. Use simple high-contrast shapes that remain understandable on a phone and for older readers. No words, letters, numbers, labels, captions, logos, watermarks, brand names, gore, exposed surgical wounds, or frightening imagery. Do not exaggerate disease severity. Avoid decorative clutter. The image must be self-explanatory without text. Scene: Cutaway knee joint showing femur, tibia, patella and articular cartilage. Depict moderate osteoarthritis with uneven thinning of cartilage, mild joint-space narrowing and a few small osteophytes at the edges. Avoid extreme bone-on-bone collapse unless the article specifically discusses severe disease.
```

#### Image 3 — Core treatment

- **File:** `src/assets/article-images/conditions/knee-osteoarthritis/knee-osteoarthritis-care.webp`
- **Size:** 1600×1200 px (4:3)
- **Suggested position:** Inline in “Treatment options”.
- **Suggested alt text (English):** Knee osteoarthritis management with sit-to-stand strengthening, cycling and walking.

**AI image prompt:**

```text
Output: 1600x1200 px, 4:3 landscape. Create a clean, patient-friendly flat-vector/cartoon medical illustration for an orthopaedic education website. Use a white-to-pale-blue background, dark navy outlines, soft blue/teal clothing and accents, warm natural skin tones, and coral-red/orange only to highlight pain or pathology. Keep anatomy clinically plausible and proportional, with one clear teaching point. Use simple high-contrast shapes that remain understandable on a phone and for older readers. No words, letters, numbers, labels, captions, logos, watermarks, brand names, gore, exposed surgical wounds, or frightening imagery. Do not exaggerate disease severity. Avoid decorative clutter. The image must be self-explanatory without text. Scene: Three non-surgical activities shown clearly: controlled sit-to-stand from a chair, low-impact stationary cycling, and flat-ground walking. The adult is comfortable and active, emphasizing strengthening and regular movement.
```

### 10. Knee pain (`knee-pain`)

#### Image 1 — Hero

- **File:** `src/assets/article-images/conditions/knee-pain/knee-pain-hero.webp`
- **Size:** 1600×1200 px (4:3)
- **Suggested position:** Condition hero: directly under title and summary.
- **Suggested alt text (English):** Adult holding a painful knee with a general pain highlight.

**AI image prompt:**

```text
Output: 1600x1200 px, 4:3 landscape. Create a clean, patient-friendly flat-vector/cartoon medical illustration for an orthopaedic education website. Use a white-to-pale-blue background, dark navy outlines, soft blue/teal clothing and accents, warm natural skin tones, and coral-red/orange only to highlight pain or pathology. Keep anatomy clinically plausible and proportional, with one clear teaching point. Use simple high-contrast shapes that remain understandable on a phone and for older readers. No words, letters, numbers, labels, captions, logos, watermarks, brand names, gore, exposed surgical wounds, or frightening imagery. Do not exaggerate disease severity. Avoid decorative clutter. The image must be self-explanatory without text. Scene: Adult sitting or standing and gently holding one painful knee. Use a broad, modest red highlight around the front and sides of the knee without showing a specific injury mechanism or structural diagnosis.
```

#### Image 2 — Anatomy overview

- **File:** `src/assets/article-images/conditions/knee-pain/knee-pain-anatomy.webp`
- **Size:** 1600×1200 px (4:3)
- **Suggested position:** Inline after “What it is”.
- **Suggested alt text (English):** Overview of the main bones, cartilage, menisci and ligaments of the knee.

**AI image prompt:**

```text
Output: 1600x1200 px, 4:3 landscape. Create a clean, patient-friendly flat-vector/cartoon medical illustration for an orthopaedic education website. Use a white-to-pale-blue background, dark navy outlines, soft blue/teal clothing and accents, warm natural skin tones, and coral-red/orange only to highlight pain or pathology. Keep anatomy clinically plausible and proportional, with one clear teaching point. Use simple high-contrast shapes that remain understandable on a phone and for older readers. No words, letters, numbers, labels, captions, logos, watermarks, brand names, gore, exposed surgical wounds, or frightening imagery. Do not exaggerate disease severity. Avoid decorative clutter. The image must be self-explanatory without text. Scene: Clean knee anatomy overview with femur, tibia, patella, articular cartilage, medial and lateral menisci, ACL/PCL and collateral ligaments visible in a simplified but accurate cutaway. Use small neutral emphasis regions rather than depicting one lesion.
```

#### Image 3 — Assessment / early rehab

- **File:** `src/assets/article-images/conditions/knee-pain/knee-pain-care.webp`
- **Size:** 1600×1200 px (4:3)
- **Suggested position:** Inline in “Treatment options” or “Recovery and rehabilitation”.
- **Suggested alt text (English):** Knee examination followed by a gentle strengthening exercise.

**AI image prompt:**

```text
Output: 1600x1200 px, 4:3 landscape. Create a clean, patient-friendly flat-vector/cartoon medical illustration for an orthopaedic education website. Use a white-to-pale-blue background, dark navy outlines, soft blue/teal clothing and accents, warm natural skin tones, and coral-red/orange only to highlight pain or pathology. Keep anatomy clinically plausible and proportional, with one clear teaching point. Use simple high-contrast shapes that remain understandable on a phone and for older readers. No words, letters, numbers, labels, captions, logos, watermarks, brand names, gore, exposed surgical wounds, or frightening imagery. Do not exaggerate disease severity. Avoid decorative clutter. The image must be self-explanatory without text. Scene: Two-panel scene: clinician examining knee motion and swelling, followed by the patient performing a straight-leg raise or shallow sit-to-stand with controlled alignment. No claim about a diagnosis.
```

### 11. Meniscus root tear (`meniscus-root-tear`)

#### Image 1 — Hero

- **File:** `src/assets/article-images/conditions/meniscus-root-tear/meniscus-root-tear-hero.webp`
- **Size:** 1600×1200 px (4:3)
- **Suggested position:** Condition hero: directly under title and summary.
- **Suggested alt text (English):** Adult with sudden deep knee pain after a squat or turning movement.

**AI image prompt:**

```text
Output: 1600x1200 px, 4:3 landscape. Create a clean, patient-friendly flat-vector/cartoon medical illustration for an orthopaedic education website. Use a white-to-pale-blue background, dark navy outlines, soft blue/teal clothing and accents, warm natural skin tones, and coral-red/orange only to highlight pain or pathology. Keep anatomy clinically plausible and proportional, with one clear teaching point. Use simple high-contrast shapes that remain understandable on a phone and for older readers. No words, letters, numbers, labels, captions, logos, watermarks, brand names, gore, exposed surgical wounds, or frightening imagery. Do not exaggerate disease severity. Avoid decorative clutter. The image must be self-explanatory without text. Scene: Middle-aged or older adult feeling sudden deep knee pain after a low squat or turning movement, reaching toward the inside/back of the knee. Keep the motion believable and not athletic or violent.
```

#### Image 2 — Anatomy / pathology

- **File:** `src/assets/article-images/conditions/meniscus-root-tear/meniscus-root-tear-anatomy.webp`
- **Size:** 1600×1200 px (4:3)
- **Suggested position:** Inline after “What it is”.
- **Suggested alt text (English):** Medial meniscus posterior root tear near its tibial attachment with subtle meniscal extrusion.

**AI image prompt:**

```text
Output: 1600x1200 px, 4:3 landscape. Create a clean, patient-friendly flat-vector/cartoon medical illustration for an orthopaedic education website. Use a white-to-pale-blue background, dark navy outlines, soft blue/teal clothing and accents, warm natural skin tones, and coral-red/orange only to highlight pain or pathology. Keep anatomy clinically plausible and proportional, with one clear teaching point. Use simple high-contrast shapes that remain understandable on a phone and for older readers. No words, letters, numbers, labels, captions, logos, watermarks, brand names, gore, exposed surgical wounds, or frightening imagery. Do not exaggerate disease severity. Avoid decorative clutter. The image must be self-explanatory without text. Scene: Cutaway knee emphasizing the medial meniscus posterior root where it attaches to the tibia. Show a realistic root tear close to the tibial attachment and a subtle amount of meniscal extrusion away from the joint edge. Keep the ACL and articular surfaces visible for orientation.
```

#### Image 3 — Management choices

- **File:** `src/assets/article-images/conditions/meniscus-root-tear/meniscus-root-tear-care.webp`
- **Size:** 1600×1200 px (4:3)
- **Suggested position:** Inline in “Treatment options”.
- **Suggested alt text (English):** Non-surgical rehabilitation and arthroscopic root repair shown as two possible management paths.

**AI image prompt:**

```text
Output: 1600x1200 px, 4:3 landscape. Create a clean, patient-friendly flat-vector/cartoon medical illustration for an orthopaedic education website. Use a white-to-pale-blue background, dark navy outlines, soft blue/teal clothing and accents, warm natural skin tones, and coral-red/orange only to highlight pain or pathology. Keep anatomy clinically plausible and proportional, with one clear teaching point. Use simple high-contrast shapes that remain understandable on a phone and for older readers. No words, letters, numbers, labels, captions, logos, watermarks, brand names, gore, exposed surgical wounds, or frightening imagery. Do not exaggerate disease severity. Avoid decorative clutter. The image must be self-explanatory without text. Scene: Balanced two-path educational scene with no text: one side shows protected activity and supervised rehabilitation; the other shows a surgeon using arthroscopic instruments to repair the meniscal root back to bone in a clean schematic inset. Present as options, not a guaranteed sequence.
```

### 12. Meniscus tear (`meniscus-tear`)

#### Image 1 — Hero

- **File:** `src/assets/article-images/conditions/meniscus-tear/meniscus-tear-hero.webp`
- **Size:** 1600×1200 px (4:3)
- **Suggested position:** Condition hero: directly under title and summary.
- **Suggested alt text (English):** Twisting movement with pain highlighted along the knee joint line.

**AI image prompt:**

```text
Output: 1600x1200 px, 4:3 landscape. Create a clean, patient-friendly flat-vector/cartoon medical illustration for an orthopaedic education website. Use a white-to-pale-blue background, dark navy outlines, soft blue/teal clothing and accents, warm natural skin tones, and coral-red/orange only to highlight pain or pathology. Keep anatomy clinically plausible and proportional, with one clear teaching point. Use simple high-contrast shapes that remain understandable on a phone and for older readers. No words, letters, numbers, labels, captions, logos, watermarks, brand names, gore, exposed surgical wounds, or frightening imagery. Do not exaggerate disease severity. Avoid decorative clutter. The image must be self-explanatory without text. Scene: Adult making a twisting turn with the foot planted and feeling pain along the knee joint line. Use a small red highlight on the inner or outer joint line. No fall or dramatic swelling.
```

#### Image 2 — Anatomy / pathology

- **File:** `src/assets/article-images/conditions/meniscus-tear/meniscus-tear-anatomy.webp`
- **Size:** 1600×1200 px (4:3)
- **Suggested position:** Inline after “What it is”.
- **Suggested alt text (English):** Knee cutaway showing a localized tear in one meniscus between the femur and tibia.

**AI image prompt:**

```text
Output: 1600x1200 px, 4:3 landscape. Create a clean, patient-friendly flat-vector/cartoon medical illustration for an orthopaedic education website. Use a white-to-pale-blue background, dark navy outlines, soft blue/teal clothing and accents, warm natural skin tones, and coral-red/orange only to highlight pain or pathology. Keep anatomy clinically plausible and proportional, with one clear teaching point. Use simple high-contrast shapes that remain understandable on a phone and for older readers. No words, letters, numbers, labels, captions, logos, watermarks, brand names, gore, exposed surgical wounds, or frightening imagery. Do not exaggerate disease severity. Avoid decorative clutter. The image must be self-explanatory without text. Scene: Cutaway knee showing a crescent-shaped meniscus between femur and tibia with one realistic tear pattern, such as a longitudinal or small flap tear. Highlight only the tear; keep cartilage and ligaments intact unless needed for orientation.
```

#### Image 3 — Rehabilitation / function

- **File:** `src/assets/article-images/conditions/meniscus-tear/meniscus-tear-care.webp`
- **Size:** 1600×1200 px (4:3)
- **Suggested position:** Inline in “Treatment options” or “Recovery and rehabilitation”.
- **Suggested alt text (English):** Controlled knee and hip strengthening used during rehabilitation for a meniscus injury.

**AI image prompt:**

```text
Output: 1600x1200 px, 4:3 landscape. Create a clean, patient-friendly flat-vector/cartoon medical illustration for an orthopaedic education website. Use a white-to-pale-blue background, dark navy outlines, soft blue/teal clothing and accents, warm natural skin tones, and coral-red/orange only to highlight pain or pathology. Keep anatomy clinically plausible and proportional, with one clear teaching point. Use simple high-contrast shapes that remain understandable on a phone and for older readers. No words, letters, numbers, labels, captions, logos, watermarks, brand names, gore, exposed surgical wounds, or frightening imagery. Do not exaggerate disease severity. Avoid decorative clutter. The image must be self-explanatory without text. Scene: A patient doing controlled quadriceps and hip strengthening: shallow sit-to-stand or mini-squat plus side-step with a resistance band, both with good knee alignment. No deep squatting or forced twisting.
```

### 13. Neck pain (`neck-pain`)

#### Image 1 — Hero

- **File:** `src/assets/article-images/conditions/neck-pain/neck-pain-hero.webp`
- **Size:** 1600×1200 px (4:3)
- **Suggested position:** Condition hero: directly under title and summary.
- **Suggested alt text (English):** Adult with pain across the neck and upper shoulder area during desk or phone use.

**AI image prompt:**

```text
Output: 1600x1200 px, 4:3 landscape. Create a clean, patient-friendly flat-vector/cartoon medical illustration for an orthopaedic education website. Use a white-to-pale-blue background, dark navy outlines, soft blue/teal clothing and accents, warm natural skin tones, and coral-red/orange only to highlight pain or pathology. Keep anatomy clinically plausible and proportional, with one clear teaching point. Use simple high-contrast shapes that remain understandable on a phone and for older readers. No words, letters, numbers, labels, captions, logos, watermarks, brand names, gore, exposed surgical wounds, or frightening imagery. Do not exaggerate disease severity. Avoid decorative clutter. The image must be self-explanatory without text. Scene: Adult at a computer or holding a phone, then gently touching the side/back of the neck and upper shoulder. Use a diffuse coral highlight over the neck and upper trapezius rather than a single vertebra.
```

#### Image 2 — Anatomy overview

- **File:** `src/assets/article-images/conditions/neck-pain/neck-pain-anatomy.webp`
- **Size:** 1600×1200 px (4:3)
- **Suggested position:** Inline after “What it is”.
- **Suggested alt text (English):** Cervical spine and surrounding neck and shoulder muscles shown as an overview.

**AI image prompt:**

```text
Output: 1600x1200 px, 4:3 landscape. Create a clean, patient-friendly flat-vector/cartoon medical illustration for an orthopaedic education website. Use a white-to-pale-blue background, dark navy outlines, soft blue/teal clothing and accents, warm natural skin tones, and coral-red/orange only to highlight pain or pathology. Keep anatomy clinically plausible and proportional, with one clear teaching point. Use simple high-contrast shapes that remain understandable on a phone and for older readers. No words, letters, numbers, labels, captions, logos, watermarks, brand names, gore, exposed surgical wounds, or frightening imagery. Do not exaggerate disease severity. Avoid decorative clutter. The image must be self-explanatory without text. Scene: Side and back educational view of the cervical spine, intervertebral discs, upper trapezius and shoulder-blade muscles. Keep the vertebrae normally aligned and use a diffuse soft highlight over muscular and joint regions without depicting a definite disc herniation.
```

#### Image 3 — Self-care / movement

- **File:** `src/assets/article-images/conditions/neck-pain/neck-pain-care.webp`
- **Size:** 1600×1200 px (4:3)
- **Suggested position:** Inline in “Prevention and self-care”.
- **Suggested alt text (English):** Desk movement break with gentle neck rotation and upper-trapezius stretching.

**AI image prompt:**

```text
Output: 1600x1200 px, 4:3 landscape. Create a clean, patient-friendly flat-vector/cartoon medical illustration for an orthopaedic education website. Use a white-to-pale-blue background, dark navy outlines, soft blue/teal clothing and accents, warm natural skin tones, and coral-red/orange only to highlight pain or pathology. Keep anatomy clinically plausible and proportional, with one clear teaching point. Use simple high-contrast shapes that remain understandable on a phone and for older readers. No words, letters, numbers, labels, captions, logos, watermarks, brand names, gore, exposed surgical wounds, or frightening imagery. Do not exaggerate disease severity. Avoid decorative clutter. The image must be self-explanatory without text. Scene: Three practical scenes: a brief desk movement break, slow comfortable neck rotation, and a gentle upper-trapezius stretch with the shoulder relaxed. Show a well-adjusted screen at eye level but avoid suggesting one perfect posture must be held all day.
```

### 14. Osteoporosis (`osteoporosis`)

#### Image 1 — Hero

- **File:** `src/assets/article-images/conditions/osteoporosis/osteoporosis-hero.webp`
- **Size:** 1600×1200 px (4:3)
- **Suggested position:** Condition hero: directly under title and summary.
- **Suggested alt text (English):** Active older adult with the spine and hips subtly highlighted as important bone-health areas.

**AI image prompt:**

```text
Output: 1600x1200 px, 4:3 landscape. Create a clean, patient-friendly flat-vector/cartoon medical illustration for an orthopaedic education website. Use a white-to-pale-blue background, dark navy outlines, soft blue/teal clothing and accents, warm natural skin tones, and coral-red/orange only to highlight pain or pathology. Keep anatomy clinically plausible and proportional, with one clear teaching point. Use simple high-contrast shapes that remain understandable on a phone and for older readers. No words, letters, numbers, labels, captions, logos, watermarks, brand names, gore, exposed surgical wounds, or frightening imagery. Do not exaggerate disease severity. Avoid decorative clutter. The image must be self-explanatory without text. Scene: Active older adult walking confidently outdoors with a subtle semi-transparent skeleton overlay at the spine and hips to indicate common fracture sites. Do not portray the person as severely hunched, fragile or disabled.
```

#### Image 2 — Bone structure

- **File:** `src/assets/article-images/conditions/osteoporosis/osteoporosis-anatomy.webp`
- **Size:** 1600×1200 px (4:3)
- **Suggested position:** Inline after “What it is”.
- **Suggested alt text (English):** Comparison of dense healthy trabecular bone and more porous osteoporotic trabecular bone.

**AI image prompt:**

```text
Output: 1600x1200 px, 4:3 landscape. Create a clean, patient-friendly flat-vector/cartoon medical illustration for an orthopaedic education website. Use a white-to-pale-blue background, dark navy outlines, soft blue/teal clothing and accents, warm natural skin tones, and coral-red/orange only to highlight pain or pathology. Keep anatomy clinically plausible and proportional, with one clear teaching point. Use simple high-contrast shapes that remain understandable on a phone and for older readers. No words, letters, numbers, labels, captions, logos, watermarks, brand names, gore, exposed surgical wounds, or frightening imagery. Do not exaggerate disease severity. Avoid decorative clutter. The image must be self-explanatory without text. Scene: Side-by-side microscopic-style cutaway of cancellous bone: one side has a dense interconnected trabecular network, the other has thinner, more widely spaced trabeculae typical of osteoporosis. Keep the comparison clean and realistic, without labels or numbers.
```

#### Image 3 — Prevention / fall reduction

- **File:** `src/assets/article-images/conditions/osteoporosis/osteoporosis-care.webp`
- **Size:** 1600×1200 px (4:3)
- **Suggested position:** Inline in “Prevention and self-care”.
- **Suggested alt text (English):** Weight-bearing exercise, strength training, balance practice and a safer home environment for bone health.

**AI image prompt:**

```text
Output: 1600x1200 px, 4:3 landscape. Create a clean, patient-friendly flat-vector/cartoon medical illustration for an orthopaedic education website. Use a white-to-pale-blue background, dark navy outlines, soft blue/teal clothing and accents, warm natural skin tones, and coral-red/orange only to highlight pain or pathology. Keep anatomy clinically plausible and proportional, with one clear teaching point. Use simple high-contrast shapes that remain understandable on a phone and for older readers. No words, letters, numbers, labels, captions, logos, watermarks, brand names, gore, exposed surgical wounds, or frightening imagery. Do not exaggerate disease severity. Avoid decorative clutter. The image must be self-explanatory without text. Scene: Three-part scene: brisk weight-bearing walking, simple resistance or sit-to-stand exercise, and tandem balance near a stable support. Include a small tidy home-safety vignette with good lighting, a clear floor and a handrail. No supplements or dosage messaging.
```

### 15. Patellofemoral pain (`patellofemoral-pain`)

#### Image 1 — Hero

- **File:** `src/assets/article-images/conditions/patellofemoral-pain/patellofemoral-pain-hero.webp`
- **Size:** 1600×1200 px (4:3)
- **Suggested position:** Condition hero: directly under title and summary.
- **Suggested alt text (English):** Active adult with pain around the kneecap while using stairs.

**AI image prompt:**

```text
Output: 1600x1200 px, 4:3 landscape. Create a clean, patient-friendly flat-vector/cartoon medical illustration for an orthopaedic education website. Use a white-to-pale-blue background, dark navy outlines, soft blue/teal clothing and accents, warm natural skin tones, and coral-red/orange only to highlight pain or pathology. Keep anatomy clinically plausible and proportional, with one clear teaching point. Use simple high-contrast shapes that remain understandable on a phone and for older readers. No words, letters, numbers, labels, captions, logos, watermarks, brand names, gore, exposed surgical wounds, or frightening imagery. Do not exaggerate disease severity. Avoid decorative clutter. The image must be self-explanatory without text. Scene: Young or middle-aged active adult feeling pain around or behind the kneecap while going down stairs or after running. Highlight the area around the patella, not the whole knee.
```

#### Image 2 — Anatomy / mechanism

- **File:** `src/assets/article-images/conditions/patellofemoral-pain/patellofemoral-pain-anatomy.webp`
- **Size:** 1600×1200 px (4:3)
- **Suggested position:** Inline after “What it is”.
- **Suggested alt text (English):** Patella tracking within the trochlear groove with the contact surface behind the kneecap highlighted.

**AI image prompt:**

```text
Output: 1600x1200 px, 4:3 landscape. Create a clean, patient-friendly flat-vector/cartoon medical illustration for an orthopaedic education website. Use a white-to-pale-blue background, dark navy outlines, soft blue/teal clothing and accents, warm natural skin tones, and coral-red/orange only to highlight pain or pathology. Keep anatomy clinically plausible and proportional, with one clear teaching point. Use simple high-contrast shapes that remain understandable on a phone and for older readers. No words, letters, numbers, labels, captions, logos, watermarks, brand names, gore, exposed surgical wounds, or frightening imagery. Do not exaggerate disease severity. Avoid decorative clutter. The image must be self-explanatory without text. Scene: Front-oblique knee cutaway showing the patella sitting in the femoral trochlear groove as the knee bends. Emphasize the contact surface behind the kneecap with a subtle coral highlight, while keeping cartilage present and avoiding severe degeneration.
```

#### Image 3 — Exercise

- **File:** `src/assets/article-images/conditions/patellofemoral-pain/patellofemoral-pain-care.webp`
- **Size:** 1600×1200 px (4:3)
- **Suggested position:** Inline in “Recovery and rehabilitation”.
- **Suggested alt text (English):** Hip strengthening and controlled step-down exercise with good knee alignment.

**AI image prompt:**

```text
Output: 1600x1200 px, 4:3 landscape. Create a clean, patient-friendly flat-vector/cartoon medical illustration for an orthopaedic education website. Use a white-to-pale-blue background, dark navy outlines, soft blue/teal clothing and accents, warm natural skin tones, and coral-red/orange only to highlight pain or pathology. Keep anatomy clinically plausible and proportional, with one clear teaching point. Use simple high-contrast shapes that remain understandable on a phone and for older readers. No words, letters, numbers, labels, captions, logos, watermarks, brand names, gore, exposed surgical wounds, or frightening imagery. Do not exaggerate disease severity. Avoid decorative clutter. The image must be self-explanatory without text. Scene: Two exercises: side-lying hip abduction and a controlled shallow step-down or squat. Show the knee tracking over the middle of the foot rather than collapsing inward. Use a stable support if needed.
```

### 16. Plantar fasciitis (`plantar-fasciitis`)

#### Image 1 — Hero

- **File:** `src/assets/article-images/conditions/plantar-fasciitis/plantar-fasciitis-hero.webp`
- **Size:** 1600×1200 px (4:3)
- **Suggested position:** Condition hero: directly under title and summary.
- **Suggested alt text (English):** First-step heel pain under the foot after getting out of bed.

**AI image prompt:**

```text
Output: 1600x1200 px, 4:3 landscape. Create a clean, patient-friendly flat-vector/cartoon medical illustration for an orthopaedic education website. Use a white-to-pale-blue background, dark navy outlines, soft blue/teal clothing and accents, warm natural skin tones, and coral-red/orange only to highlight pain or pathology. Keep anatomy clinically plausible and proportional, with one clear teaching point. Use simple high-contrast shapes that remain understandable on a phone and for older readers. No words, letters, numbers, labels, captions, logos, watermarks, brand names, gore, exposed surgical wounds, or frightening imagery. Do not exaggerate disease severity. Avoid decorative clutter. The image must be self-explanatory without text. Scene: Adult taking the first few steps after getting out of bed in the morning and reacting to heel pain. Highlight the underside of the heel near the medial arch, not the Achilles tendon or ankle.
```

#### Image 2 — Anatomy / pathology

- **File:** `src/assets/article-images/conditions/plantar-fasciitis/plantar-fasciitis-anatomy.webp`
- **Size:** 1600×1200 px (4:3)
- **Suggested position:** Inline after “What it is”.
- **Suggested alt text (English):** Plantar fascia from the heel to the toes with irritation highlighted at its heel origin.

**AI image prompt:**

```text
Output: 1600x1200 px, 4:3 landscape. Create a clean, patient-friendly flat-vector/cartoon medical illustration for an orthopaedic education website. Use a white-to-pale-blue background, dark navy outlines, soft blue/teal clothing and accents, warm natural skin tones, and coral-red/orange only to highlight pain or pathology. Keep anatomy clinically plausible and proportional, with one clear teaching point. Use simple high-contrast shapes that remain understandable on a phone and for older readers. No words, letters, numbers, labels, captions, logos, watermarks, brand names, gore, exposed surgical wounds, or frightening imagery. Do not exaggerate disease severity. Avoid decorative clutter. The image must be self-explanatory without text. Scene: Side and underside educational view of the foot showing the plantar fascia running from the medial calcaneus toward the toes. Show mild thickening and irritation at its origin on the heel bone with a small red highlight. Do not depict a heel spur as the cause.
```

#### Image 3 — Stretching / load management

- **File:** `src/assets/article-images/conditions/plantar-fasciitis/plantar-fasciitis-care.webp`
- **Size:** 1600×1200 px (4:3)
- **Suggested position:** Inline in “Treatment options” or “Recovery and rehabilitation”.
- **Suggested alt text (English):** Plantar fascia stretch, calf stretch and gentle rolling under the foot.

**AI image prompt:**

```text
Output: 1600x1200 px, 4:3 landscape. Create a clean, patient-friendly flat-vector/cartoon medical illustration for an orthopaedic education website. Use a white-to-pale-blue background, dark navy outlines, soft blue/teal clothing and accents, warm natural skin tones, and coral-red/orange only to highlight pain or pathology. Keep anatomy clinically plausible and proportional, with one clear teaching point. Use simple high-contrast shapes that remain understandable on a phone and for older readers. No words, letters, numbers, labels, captions, logos, watermarks, brand names, gore, exposed surgical wounds, or frightening imagery. Do not exaggerate disease severity. Avoid decorative clutter. The image must be self-explanatory without text. Scene: Three practical exercises: seated plantar-fascia stretch by gently pulling the toes back, calf stretch against a wall, and rolling the sole over a chilled bottle or small ball. Show moderate, comfortable positions.
```

### 17. Rotator cuff tear (`rotator-cuff-tear`)

#### Image 1 — Hero

- **File:** `src/assets/article-images/conditions/rotator-cuff-tear/rotator-cuff-tear-hero.webp`
- **Size:** 1600×1200 px (4:3)
- **Suggested position:** Condition hero: directly under title and summary.
- **Suggested alt text (English):** Adult with shoulder pain and weakness while raising the arm.

**AI image prompt:**

```text
Output: 1600x1200 px, 4:3 landscape. Create a clean, patient-friendly flat-vector/cartoon medical illustration for an orthopaedic education website. Use a white-to-pale-blue background, dark navy outlines, soft blue/teal clothing and accents, warm natural skin tones, and coral-red/orange only to highlight pain or pathology. Keep anatomy clinically plausible and proportional, with one clear teaching point. Use simple high-contrast shapes that remain understandable on a phone and for older readers. No words, letters, numbers, labels, captions, logos, watermarks, brand names, gore, exposed surgical wounds, or frightening imagery. Do not exaggerate disease severity. Avoid decorative clutter. The image must be self-explanatory without text. Scene: Middle-aged or older adult trying to raise one arm and showing pain and weakness around the shoulder. The hand may support the affected arm. Use a localized red shoulder highlight and do not show dislocation.
```

#### Image 2 — Anatomy / pathology

- **File:** `src/assets/article-images/conditions/rotator-cuff-tear/rotator-cuff-tear-anatomy.webp`
- **Size:** 1600×1200 px (4:3)
- **Suggested position:** Inline after “What it is”.
- **Suggested alt text (English):** Shoulder cutaway showing a tear in the supraspinatus rotator cuff tendon.

**AI image prompt:**

```text
Output: 1600x1200 px, 4:3 landscape. Create a clean, patient-friendly flat-vector/cartoon medical illustration for an orthopaedic education website. Use a white-to-pale-blue background, dark navy outlines, soft blue/teal clothing and accents, warm natural skin tones, and coral-red/orange only to highlight pain or pathology. Keep anatomy clinically plausible and proportional, with one clear teaching point. Use simple high-contrast shapes that remain understandable on a phone and for older readers. No words, letters, numbers, labels, captions, logos, watermarks, brand names, gore, exposed surgical wounds, or frightening imagery. Do not exaggerate disease severity. Avoid decorative clutter. The image must be self-explanatory without text. Scene: Cutaway shoulder showing humeral head, glenoid, acromion and the supraspinatus tendon passing underneath the acromion to attach on the greater tuberosity. Show a realistic partial- or full-thickness defect in the supraspinatus tendon with localized highlight; do not show multiple tendon tears.
```

#### Image 3 — Early rehabilitation

- **File:** `src/assets/article-images/conditions/rotator-cuff-tear/rotator-cuff-tear-care.webp`
- **Size:** 1600×1200 px (4:3)
- **Suggested position:** Inline in “Recovery and rehabilitation”.
- **Suggested alt text (English):** Gentle pendulum, supported arm elevation and scapular setting for early shoulder rehabilitation.

**AI image prompt:**

```text
Output: 1600x1200 px, 4:3 landscape. Create a clean, patient-friendly flat-vector/cartoon medical illustration for an orthopaedic education website. Use a white-to-pale-blue background, dark navy outlines, soft blue/teal clothing and accents, warm natural skin tones, and coral-red/orange only to highlight pain or pathology. Keep anatomy clinically plausible and proportional, with one clear teaching point. Use simple high-contrast shapes that remain understandable on a phone and for older readers. No words, letters, numbers, labels, captions, logos, watermarks, brand names, gore, exposed surgical wounds, or frightening imagery. Do not exaggerate disease severity. Avoid decorative clutter. The image must be self-explanatory without text. Scene: Two gentle exercises appropriate for an early painful shoulder: relaxed pendulum with the arm hanging, and supported forward elevation using the other hand or a stick. Add a small scapular-setting posture cue. No heavy overhead resistance.
```

### 18. Sciatica (`sciatica`)

#### Image 1 — Hero

- **File:** `src/assets/article-images/conditions/sciatica/sciatica-hero.webp`
- **Size:** 1600×1200 px (4:3)
- **Suggested position:** Condition hero: directly under title and summary.
- **Suggested alt text (English):** One-sided pain travelling from the lower back or buttock down the leg.

**AI image prompt:**

```text
Output: 1600x1200 px, 4:3 landscape. Create a clean, patient-friendly flat-vector/cartoon medical illustration for an orthopaedic education website. Use a white-to-pale-blue background, dark navy outlines, soft blue/teal clothing and accents, warm natural skin tones, and coral-red/orange only to highlight pain or pathology. Keep anatomy clinically plausible and proportional, with one clear teaching point. Use simple high-contrast shapes that remain understandable on a phone and for older readers. No words, letters, numbers, labels, captions, logos, watermarks, brand names, gore, exposed surgical wounds, or frightening imagery. Do not exaggerate disease severity. Avoid decorative clutter. The image must be self-explanatory without text. Scene: Adult standing with one hand on the lower back or buttock while a modest coral pain pathway travels down only one leg toward the calf or foot. Keep the person upright and mobile; no wheelchair or severe neurological deficit.
```

#### Image 2 — Anatomy / mechanism

- **File:** `src/assets/article-images/conditions/sciatica/sciatica-anatomy.webp`
- **Size:** 1600×1200 px (4:3)
- **Suggested position:** Inline after “What it is”.
- **Suggested alt text (English):** Lumbar nerve root irritated by a disc protrusion with the sciatic nerve pathway shown down the leg.

**AI image prompt:**

```text
Output: 1600x1200 px, 4:3 landscape. Create a clean, patient-friendly flat-vector/cartoon medical illustration for an orthopaedic education website. Use a white-to-pale-blue background, dark navy outlines, soft blue/teal clothing and accents, warm natural skin tones, and coral-red/orange only to highlight pain or pathology. Keep anatomy clinically plausible and proportional, with one clear teaching point. Use simple high-contrast shapes that remain understandable on a phone and for older readers. No words, letters, numbers, labels, captions, logos, watermarks, brand names, gore, exposed surgical wounds, or frightening imagery. Do not exaggerate disease severity. Avoid decorative clutter. The image must be self-explanatory without text. Scene: Educational lumbar and pelvic nerve view showing a lumbar nerve root exiting the spine, a modest posterolateral disc protrusion contacting that root, and the sciatic nerve continuing down the back of the leg. Keep anatomy simplified but accurate.
```

#### Image 3 — Conservative movement

- **File:** `src/assets/article-images/conditions/sciatica/sciatica-care.webp`
- **Size:** 1600×1200 px (4:3)
- **Suggested position:** Inline in “Treatment options” or “Recovery and rehabilitation”.
- **Suggested alt text (English):** Walking, comfortable positioning and a gentle nerve-slider movement for sciatica recovery.

**AI image prompt:**

```text
Output: 1600x1200 px, 4:3 landscape. Create a clean, patient-friendly flat-vector/cartoon medical illustration for an orthopaedic education website. Use a white-to-pale-blue background, dark navy outlines, soft blue/teal clothing and accents, warm natural skin tones, and coral-red/orange only to highlight pain or pathology. Keep anatomy clinically plausible and proportional, with one clear teaching point. Use simple high-contrast shapes that remain understandable on a phone and for older readers. No words, letters, numbers, labels, captions, logos, watermarks, brand names, gore, exposed surgical wounds, or frightening imagery. Do not exaggerate disease severity. Avoid decorative clutter. The image must be self-explanatory without text. Scene: Three calm scenes: short walking, comfortable supported sitting or lying position, and a gentle seated nerve-slider movement performed without forcing a stretch. Emphasize symptom-guided movement rather than aggressive stretching.
```

### 19. Shoulder pain (`shoulder-pain`)

#### Image 1 — Hero

- **File:** `src/assets/article-images/conditions/shoulder-pain/shoulder-pain-hero.webp`
- **Size:** 1600×1200 px (4:3)
- **Suggested position:** Condition hero: directly under title and summary.
- **Suggested alt text (English):** Adult with general shoulder pain during reaching.

**AI image prompt:**

```text
Output: 1600x1200 px, 4:3 landscape. Create a clean, patient-friendly flat-vector/cartoon medical illustration for an orthopaedic education website. Use a white-to-pale-blue background, dark navy outlines, soft blue/teal clothing and accents, warm natural skin tones, and coral-red/orange only to highlight pain or pathology. Keep anatomy clinically plausible and proportional, with one clear teaching point. Use simple high-contrast shapes that remain understandable on a phone and for older readers. No words, letters, numbers, labels, captions, logos, watermarks, brand names, gore, exposed surgical wounds, or frightening imagery. Do not exaggerate disease severity. Avoid decorative clutter. The image must be self-explanatory without text. Scene: Adult reaching to a shelf and then holding the shoulder with the opposite hand. Use a modest red highlight over the shoulder without showing a definite tear or frozen joint.
```

#### Image 2 — Anatomy overview

- **File:** `src/assets/article-images/conditions/shoulder-pain/shoulder-pain-anatomy.webp`
- **Size:** 1600×1200 px (4:3)
- **Suggested position:** Inline after “What it is”.
- **Suggested alt text (English):** Overview of the shoulder joint, rotator cuff, bursa, acromioclavicular joint and biceps tendon.

**AI image prompt:**

```text
Output: 1600x1200 px, 4:3 landscape. Create a clean, patient-friendly flat-vector/cartoon medical illustration for an orthopaedic education website. Use a white-to-pale-blue background, dark navy outlines, soft blue/teal clothing and accents, warm natural skin tones, and coral-red/orange only to highlight pain or pathology. Keep anatomy clinically plausible and proportional, with one clear teaching point. Use simple high-contrast shapes that remain understandable on a phone and for older readers. No words, letters, numbers, labels, captions, logos, watermarks, brand names, gore, exposed surgical wounds, or frightening imagery. Do not exaggerate disease severity. Avoid decorative clutter. The image must be self-explanatory without text. Scene: Clean shoulder overview showing glenohumeral joint, rotator cuff tendons, subacromial bursa, acromioclavicular joint and long-head biceps tendon. Use subtle neutral emphasis across several possible pain sources without depicting a specific lesion.
```

#### Image 3 — Assessment / movement

- **File:** `src/assets/article-images/conditions/shoulder-pain/shoulder-pain-care.webp`
- **Size:** 1600×1200 px (4:3)
- **Suggested position:** Inline in “How it is diagnosed” or “Recovery and rehabilitation”.
- **Suggested alt text (English):** Shoulder range-of-motion assessment followed by a gentle scapular or wall-assisted exercise.

**AI image prompt:**

```text
Output: 1600x1200 px, 4:3 landscape. Create a clean, patient-friendly flat-vector/cartoon medical illustration for an orthopaedic education website. Use a white-to-pale-blue background, dark navy outlines, soft blue/teal clothing and accents, warm natural skin tones, and coral-red/orange only to highlight pain or pathology. Keep anatomy clinically plausible and proportional, with one clear teaching point. Use simple high-contrast shapes that remain understandable on a phone and for older readers. No words, letters, numbers, labels, captions, logos, watermarks, brand names, gore, exposed surgical wounds, or frightening imagery. Do not exaggerate disease severity. Avoid decorative clutter. The image must be self-explanatory without text. Scene: Two-panel clinical scene: clinician comparing active and passive shoulder range of motion, followed by a gentle scapular retraction or wall-assisted arm movement. No painful forcing or heavy resistance.
```

### 20. Snapping hip (`snapping-hip`)

#### Image 1 — Hero

- **File:** `src/assets/article-images/conditions/snapping-hip/snapping-hip-hero.webp`
- **Size:** 1600×1200 px (4:3)
- **Suggested position:** Condition hero: directly under title and summary.
- **Suggested alt text (English):** Active adult feeling a snap at the front or side of the hip during hip flexion.

**AI image prompt:**

```text
Output: 1600x1200 px, 4:3 landscape. Create a clean, patient-friendly flat-vector/cartoon medical illustration for an orthopaedic education website. Use a white-to-pale-blue background, dark navy outlines, soft blue/teal clothing and accents, warm natural skin tones, and coral-red/orange only to highlight pain or pathology. Keep anatomy clinically plausible and proportional, with one clear teaching point. Use simple high-contrast shapes that remain understandable on a phone and for older readers. No words, letters, numbers, labels, captions, logos, watermarks, brand names, gore, exposed surgical wounds, or frightening imagery. Do not exaggerate disease severity. Avoid decorative clutter. The image must be self-explanatory without text. Scene: Active adult lifting the knee or moving from standing to a step and reacting to a click or snap at the front or side of the hip. Use a small highlight at the hip with a subtle curved motion cue, no words.
```

#### Image 2 — Anatomy / mechanism

- **File:** `src/assets/article-images/conditions/snapping-hip/snapping-hip-anatomy.webp`
- **Size:** 1600×1200 px (4:3)
- **Suggested position:** Inline after “What it is”.
- **Suggested alt text (English):** Internal and external snapping hip mechanisms shown with tendons moving over the front and side of the hip.

**AI image prompt:**

```text
Output: 1600x1200 px, 4:3 landscape. Create a clean, patient-friendly flat-vector/cartoon medical illustration for an orthopaedic education website. Use a white-to-pale-blue background, dark navy outlines, soft blue/teal clothing and accents, warm natural skin tones, and coral-red/orange only to highlight pain or pathology. Keep anatomy clinically plausible and proportional, with one clear teaching point. Use simple high-contrast shapes that remain understandable on a phone and for older readers. No words, letters, numbers, labels, captions, logos, watermarks, brand names, gore, exposed surgical wounds, or frightening imagery. Do not exaggerate disease severity. Avoid decorative clutter. The image must be self-explanatory without text. Scene: Two clean anatomical mini-panels in one image: one shows the iliopsoas tendon moving over the front of the hip during flexion; the other shows the iliotibial band or gluteal tissue moving over the greater trochanter laterally. Use simple curved motion arrows only, with no text.
```

#### Image 3 — Control / strengthening

- **File:** `src/assets/article-images/conditions/snapping-hip/snapping-hip-care.webp`
- **Size:** 1600×1200 px (4:3)
- **Suggested position:** Inline in “Recovery and rehabilitation”.
- **Suggested alt text (English):** Bridge and side-lying hip strengthening with temporary reduction of repetitive hip-snapping activity.

**AI image prompt:**

```text
Output: 1600x1200 px, 4:3 landscape. Create a clean, patient-friendly flat-vector/cartoon medical illustration for an orthopaedic education website. Use a white-to-pale-blue background, dark navy outlines, soft blue/teal clothing and accents, warm natural skin tones, and coral-red/orange only to highlight pain or pathology. Keep anatomy clinically plausible and proportional, with one clear teaching point. Use simple high-contrast shapes that remain understandable on a phone and for older readers. No words, letters, numbers, labels, captions, logos, watermarks, brand names, gore, exposed surgical wounds, or frightening imagery. Do not exaggerate disease severity. Avoid decorative clutter. The image must be self-explanatory without text. Scene: Two hip-control exercises: bridge and side-lying hip abduction, performed slowly with pelvis level. Add a small scene of reducing repetitive high-knee activity during a flare. No extreme stretching.
```

### 21. Tennis elbow (`tennis-elbow`)

#### Image 1 — Hero

- **File:** `src/assets/article-images/conditions/tennis-elbow/tennis-elbow-hero.webp`
- **Size:** 1600×1200 px (4:3)
- **Suggested position:** Condition hero: directly under title and summary.
- **Suggested alt text (English):** Pain at the outer elbow during gripping or lifting.

**AI image prompt:**

```text
Output: 1600x1200 px, 4:3 landscape. Create a clean, patient-friendly flat-vector/cartoon medical illustration for an orthopaedic education website. Use a white-to-pale-blue background, dark navy outlines, soft blue/teal clothing and accents, warm natural skin tones, and coral-red/orange only to highlight pain or pathology. Keep anatomy clinically plausible and proportional, with one clear teaching point. Use simple high-contrast shapes that remain understandable on a phone and for older readers. No words, letters, numbers, labels, captions, logos, watermarks, brand names, gore, exposed surgical wounds, or frightening imagery. Do not exaggerate disease severity. Avoid decorative clutter. The image must be self-explanatory without text. Scene: Adult lifting a light kettle, bag or racquet and feeling pain at the outer elbow. Highlight the lateral epicondyle region only. Grip is present but not excessively tight.
```

#### Image 2 — Anatomy / pathology

- **File:** `src/assets/article-images/conditions/tennis-elbow/tennis-elbow-anatomy.webp`
- **Size:** 1600×1200 px (4:3)
- **Suggested position:** Inline after “What it is”.
- **Suggested alt text (English):** Common wrist extensor tendon origin at the lateral epicondyle with localized tendinopathy.

**AI image prompt:**

```text
Output: 1600x1200 px, 4:3 landscape. Create a clean, patient-friendly flat-vector/cartoon medical illustration for an orthopaedic education website. Use a white-to-pale-blue background, dark navy outlines, soft blue/teal clothing and accents, warm natural skin tones, and coral-red/orange only to highlight pain or pathology. Keep anatomy clinically plausible and proportional, with one clear teaching point. Use simple high-contrast shapes that remain understandable on a phone and for older readers. No words, letters, numbers, labels, captions, logos, watermarks, brand names, gore, exposed surgical wounds, or frightening imagery. Do not exaggerate disease severity. Avoid decorative clutter. The image must be self-explanatory without text. Scene: Lateral elbow anatomy showing the common wrist extensor tendon attaching to the lateral epicondyle, with a mildly thickened and irritated tendon origin highlighted. Keep the joint itself normal and do not depict inflammatory arthritis.
```

#### Image 3 — Exercise

- **File:** `src/assets/article-images/conditions/tennis-elbow/tennis-elbow-care.webp`
- **Size:** 1600×1200 px (4:3)
- **Suggested position:** Inline in “Recovery and rehabilitation”.
- **Suggested alt text (English):** Forearm extensor stretch and slow eccentric wrist-extension exercise for lateral elbow pain.

**AI image prompt:**

```text
Output: 1600x1200 px, 4:3 landscape. Create a clean, patient-friendly flat-vector/cartoon medical illustration for an orthopaedic education website. Use a white-to-pale-blue background, dark navy outlines, soft blue/teal clothing and accents, warm natural skin tones, and coral-red/orange only to highlight pain or pathology. Keep anatomy clinically plausible and proportional, with one clear teaching point. Use simple high-contrast shapes that remain understandable on a phone and for older readers. No words, letters, numbers, labels, captions, logos, watermarks, brand names, gore, exposed surgical wounds, or frightening imagery. Do not exaggerate disease severity. Avoid decorative clutter. The image must be self-explanatory without text. Scene: Two exercises: gentle forearm extensor stretch with elbow straight, and slow eccentric wrist extension using a very light dumbbell with the forearm supported on a table. Show correct hand and wrist positions.
```

### 22. Trigger finger (`trigger-finger`)

#### Image 1 — Hero

- **File:** `src/assets/article-images/conditions/trigger-finger/trigger-finger-hero.webp`
- **Size:** 1600×1200 px (4:3)
- **Suggested position:** Condition hero: directly under title and summary.
- **Suggested alt text (English):** Finger catching in a bent position with pain highlighted at the palm-side base of the finger.

**AI image prompt:**

```text
Output: 1600x1200 px, 4:3 landscape. Create a clean, patient-friendly flat-vector/cartoon medical illustration for an orthopaedic education website. Use a white-to-pale-blue background, dark navy outlines, soft blue/teal clothing and accents, warm natural skin tones, and coral-red/orange only to highlight pain or pathology. Keep anatomy clinically plausible and proportional, with one clear teaching point. Use simple high-contrast shapes that remain understandable on a phone and for older readers. No words, letters, numbers, labels, captions, logos, watermarks, brand names, gore, exposed surgical wounds, or frightening imagery. Do not exaggerate disease severity. Avoid decorative clutter. The image must be self-explanatory without text. Scene: Adult hand with one finger catching in a bent position while the other hand gently helps straighten it. Highlight the palm-side base of the affected finger near the MCP joint. No severe deformity.
```

#### Image 2 — Anatomy / mechanism

- **File:** `src/assets/article-images/conditions/trigger-finger/trigger-finger-anatomy.webp`
- **Size:** 1600×1200 px (4:3)
- **Suggested position:** Inline after “What it is”.
- **Suggested alt text (English):** Flexor tendon catching beneath a thickened A1 pulley at the base of the finger.

**AI image prompt:**

```text
Output: 1600x1200 px, 4:3 landscape. Create a clean, patient-friendly flat-vector/cartoon medical illustration for an orthopaedic education website. Use a white-to-pale-blue background, dark navy outlines, soft blue/teal clothing and accents, warm natural skin tones, and coral-red/orange only to highlight pain or pathology. Keep anatomy clinically plausible and proportional, with one clear teaching point. Use simple high-contrast shapes that remain understandable on a phone and for older readers. No words, letters, numbers, labels, captions, logos, watermarks, brand names, gore, exposed surgical wounds, or frightening imagery. Do not exaggerate disease severity. Avoid decorative clutter. The image must be self-explanatory without text. Scene: Cutaway side-view of a finger flexor tendon passing through the A1 pulley at the base of the finger. Show a mildly thickened pulley and a small tendon nodule that catches as it passes, with a localized coral highlight. Keep the tendon intact.
```

#### Image 3 — Self-care / motion

- **File:** `src/assets/article-images/conditions/trigger-finger/trigger-finger-care.webp`
- **Size:** 1600×1200 px (4:3)
- **Suggested position:** Inline in “Treatment options” or “Prevention and self-care”.
- **Suggested alt text (English):** Gentle tendon-glide hand movement with reduced forceful gripping and an optional simple night splint.

**AI image prompt:**

```text
Output: 1600x1200 px, 4:3 landscape. Create a clean, patient-friendly flat-vector/cartoon medical illustration for an orthopaedic education website. Use a white-to-pale-blue background, dark navy outlines, soft blue/teal clothing and accents, warm natural skin tones, and coral-red/orange only to highlight pain or pathology. Keep anatomy clinically plausible and proportional, with one clear teaching point. Use simple high-contrast shapes that remain understandable on a phone and for older readers. No words, letters, numbers, labels, captions, logos, watermarks, brand names, gore, exposed surgical wounds, or frightening imagery. Do not exaggerate disease severity. Avoid decorative clutter. The image must be self-explanatory without text. Scene: Gentle hand tendon-glide sequence and a small practical scene avoiding repeated forceful gripping. Optionally show a simple neutral night finger splint, but do not depict a rigid cast or forceful stretching.
```

## 4. Image-generation prompts — Examinations

### 1. Bone density scan (DXA) (`bone-density-scan`)

#### Image 1 — Overview

- **File:** `src/assets/article-images/examinations/bone-density-scan/bone-density-scan-overview.webp`
- **Size:** 1600×1200 px (4:3)
- **Suggested position:** Inline near the start of “What DXA is”.
- **Suggested alt text (English):** Patient lying on an open DXA scanner while the arm measures the hip and lower spine.

**AI image prompt:**

```text
Output: 1600x1200 px, 4:3 landscape. Create a clean, patient-friendly flat-vector/cartoon medical illustration for an orthopaedic education website. Use a white-to-pale-blue background, dark navy outlines, soft blue/teal clothing and accents, warm natural skin tones, and coral-red/orange only to highlight pain or pathology. Keep anatomy clinically plausible and proportional, with one clear teaching point. Use simple high-contrast shapes that remain understandable on a phone and for older readers. No words, letters, numbers, labels, captions, logos, watermarks, brand names, gore, exposed surgical wounds, or frightening imagery. Do not exaggerate disease severity. Avoid decorative clutter. The image must be self-explanatory without text. Scene: Patient lying comfortably on an open DXA scanning table while a slim scanner arm passes over the hip and lower spine. The machine is open, not a tunnel. Calm outpatient imaging room, light clothing, no metal accessories.
```

#### Image 2 — Core concept

- **File:** `src/assets/article-images/examinations/bone-density-scan/bone-density-scan-concept.webp`
- **Size:** 1600×1200 px (4:3)
- **Suggested position:** Inline in “T-score and Z-score” after the explanation of bone density.
- **Suggested alt text (English):** Hip and lumbar spine scan sites with dense and porous trabecular bone shown for comparison.

**AI image prompt:**

```text
Output: 1600x1200 px, 4:3 landscape. Create a clean, patient-friendly flat-vector/cartoon medical illustration for an orthopaedic education website. Use a white-to-pale-blue background, dark navy outlines, soft blue/teal clothing and accents, warm natural skin tones, and coral-red/orange only to highlight pain or pathology. Keep anatomy clinically plausible and proportional, with one clear teaching point. Use simple high-contrast shapes that remain understandable on a phone and for older readers. No words, letters, numbers, labels, captions, logos, watermarks, brand names, gore, exposed surgical wounds, or frightening imagery. Do not exaggerate disease severity. Avoid decorative clutter. The image must be self-explanatory without text. Scene: Clean educational composition showing the hip and lumbar spine as the usual DXA measurement sites, alongside two enlarged trabecular-bone cutaways: one dense and interconnected, one more porous. No numbers, scales or text.
```

#### Image 3 — Preparation

- **File:** `src/assets/article-images/examinations/bone-density-scan/bone-density-scan-practical.webp`
- **Size:** 1600×1200 px (4:3)
- **Suggested position:** Inline in “Preparation and cautions”.
- **Suggested alt text (English):** Patient removing metal items and reviewing safety information before a DXA scan.

**AI image prompt:**

```text
Output: 1600x1200 px, 4:3 landscape. Create a clean, patient-friendly flat-vector/cartoon medical illustration for an orthopaedic education website. Use a white-to-pale-blue background, dark navy outlines, soft blue/teal clothing and accents, warm natural skin tones, and coral-red/orange only to highlight pain or pathology. Keep anatomy clinically plausible and proportional, with one clear teaching point. Use simple high-contrast shapes that remain understandable on a phone and for older readers. No words, letters, numbers, labels, captions, logos, watermarks, brand names, gore, exposed surgical wounds, or frightening imagery. Do not exaggerate disease severity. Avoid decorative clutter. The image must be self-explanatory without text. Scene: Patient in simple metal-free clothing preparing for a bone density scan, placing a belt and jewellery in a tray while a radiographer reviews a safety checklist. Include a small, universal pregnancy caution pictogram without words and without alarming imagery.
```

### 2. Knee MRI (`knee-mri`)

#### Image 1 — Overview

- **File:** `src/assets/article-images/examinations/knee-mri/knee-mri-overview.webp`
- **Size:** 1600×1200 px (4:3)
- **Suggested position:** Inline near the start of the article.
- **Suggested alt text (English):** Patient with the knee positioned inside a dedicated MRI coil.

**AI image prompt:**

```text
Output: 1600x1200 px, 4:3 landscape. Create a clean, patient-friendly flat-vector/cartoon medical illustration for an orthopaedic education website. Use a white-to-pale-blue background, dark navy outlines, soft blue/teal clothing and accents, warm natural skin tones, and coral-red/orange only to highlight pain or pathology. Keep anatomy clinically plausible and proportional, with one clear teaching point. Use simple high-contrast shapes that remain understandable on a phone and for older readers. No words, letters, numbers, labels, captions, logos, watermarks, brand names, gore, exposed surgical wounds, or frightening imagery. Do not exaggerate disease severity. Avoid decorative clutter. The image must be self-explanatory without text. Scene: Patient lying supine with one knee placed inside a dedicated padded MRI knee coil at the entrance of the scanner. The rest of the body is relaxed and the setup looks realistic and comfortable.
```

#### Image 2 — What MRI shows

- **File:** `src/assets/article-images/examinations/knee-mri/knee-mri-concept.webp`
- **Size:** 1600×1200 px (4:3)
- **Suggested position:** Inline in the section explaining MRI findings.
- **Suggested alt text (English):** MRI-style sagittal knee image showing the major ligaments, menisci, cartilage and bone structures.

**AI image prompt:**

```text
Output: 1600x1200 px, 4:3 landscape. Create a clean, patient-friendly flat-vector/cartoon medical illustration for an orthopaedic education website. Use a white-to-pale-blue background, dark navy outlines, soft blue/teal clothing and accents, warm natural skin tones, and coral-red/orange only to highlight pain or pathology. Keep anatomy clinically plausible and proportional, with one clear teaching point. Use simple high-contrast shapes that remain understandable on a phone and for older readers. No words, letters, numbers, labels, captions, logos, watermarks, brand names, gore, exposed surgical wounds, or frightening imagery. Do not exaggerate disease severity. Avoid decorative clutter. The image must be self-explanatory without text. Scene: Large grayscale MRI-style sagittal knee slice, simplified for education but anatomically plausible, with femur, tibia, patella, ACL, PCL, menisci, cartilage and bone marrow distinguishable. Add one subtle small abnormality example but do not label it or imply that every finding causes pain.
```

#### Image 3 — Interpretation

- **File:** `src/assets/article-images/examinations/knee-mri/knee-mri-practical.webp`
- **Size:** 1600×1200 px (4:3)
- **Suggested position:** Inline in the section about interpreting results or limitations.
- **Suggested alt text (English):** Clinician comparing knee MRI findings with the patient's symptoms and physical examination.

**AI image prompt:**

```text
Output: 1600x1200 px, 4:3 landscape. Create a clean, patient-friendly flat-vector/cartoon medical illustration for an orthopaedic education website. Use a white-to-pale-blue background, dark navy outlines, soft blue/teal clothing and accents, warm natural skin tones, and coral-red/orange only to highlight pain or pathology. Keep anatomy clinically plausible and proportional, with one clear teaching point. Use simple high-contrast shapes that remain understandable on a phone and for older readers. No words, letters, numbers, labels, captions, logos, watermarks, brand names, gore, exposed surgical wounds, or frightening imagery. Do not exaggerate disease severity. Avoid decorative clutter. The image must be self-explanatory without text. Scene: Split scene: on one side a knee scan displayed on a monitor with a small structural finding; on the other a clinician examines the patient's knee movement and talks with the patient. Visually communicate that scan findings are considered together with symptoms and examination.
```

### 3. MRI scan (`mri`)

#### Image 1 — Overview

- **File:** `src/assets/article-images/examinations/mri/mri-overview.webp`
- **Size:** 1600×1200 px (4:3)
- **Suggested position:** Inline in “How it works” or immediately after Key Facts.
- **Suggested alt text (English):** Patient entering an MRI scanner with hearing protection and a call button.

**AI image prompt:**

```text
Output: 1600x1200 px, 4:3 landscape. Create a clean, patient-friendly flat-vector/cartoon medical illustration for an orthopaedic education website. Use a white-to-pale-blue background, dark navy outlines, soft blue/teal clothing and accents, warm natural skin tones, and coral-red/orange only to highlight pain or pathology. Keep anatomy clinically plausible and proportional, with one clear teaching point. Use simple high-contrast shapes that remain understandable on a phone and for older readers. No words, letters, numbers, labels, captions, logos, watermarks, brand names, gore, exposed surgical wounds, or frightening imagery. Do not exaggerate disease severity. Avoid decorative clutter. The image must be self-explanatory without text. Scene: Patient lying on an MRI table entering the cylindrical scanner, wearing hearing protection and holding a small call button. Show the scanner as clean and realistic with no radiation symbols.
```

#### Image 2 — Modality concept

- **File:** `src/assets/article-images/examinations/mri/mri-concept.webp`
- **Size:** 1600×1200 px (4:3)
- **Suggested position:** Inline in “What it shows that an X-ray does not”.
- **Suggested alt text (English):** Comparison of bone-focused X-ray imaging and soft-tissue-rich MRI imaging.

**AI image prompt:**

```text
Output: 1600x1200 px, 4:3 landscape. Create a clean, patient-friendly flat-vector/cartoon medical illustration for an orthopaedic education website. Use a white-to-pale-blue background, dark navy outlines, soft blue/teal clothing and accents, warm natural skin tones, and coral-red/orange only to highlight pain or pathology. Keep anatomy clinically plausible and proportional, with one clear teaching point. Use simple high-contrast shapes that remain understandable on a phone and for older readers. No words, letters, numbers, labels, captions, logos, watermarks, brand names, gore, exposed surgical wounds, or frightening imagery. Do not exaggerate disease severity. Avoid decorative clutter. The image must be self-explanatory without text. Scene: Text-free comparison: one panel shows an X-ray-like view where bones are bright and soft tissues are faint; the second shows an MRI-like cross-section where ligaments, cartilage, muscle and discs are visible in richer soft-tissue detail. Use a generic knee or shoulder for consistency.
```

#### Image 3 — Safety screening

- **File:** `src/assets/article-images/examinations/mri/mri-practical.webp`
- **Size:** 1600×1200 px (4:3)
- **Suggested position:** Inline in “What to declare before you go in”.
- **Suggested alt text (English):** MRI safety screening for implanted electronic devices, cochlear implants and possible metal fragments.

**AI image prompt:**

```text
Output: 1600x1200 px, 4:3 landscape. Create a clean, patient-friendly flat-vector/cartoon medical illustration for an orthopaedic education website. Use a white-to-pale-blue background, dark navy outlines, soft blue/teal clothing and accents, warm natural skin tones, and coral-red/orange only to highlight pain or pathology. Keep anatomy clinically plausible and proportional, with one clear teaching point. Use simple high-contrast shapes that remain understandable on a phone and for older readers. No words, letters, numbers, labels, captions, logos, watermarks, brand names, gore, exposed surgical wounds, or frightening imagery. Do not exaggerate disease severity. Avoid decorative clutter. The image must be self-explanatory without text. Scene: MRI safety screening scene with a radiographer reviewing a checklist with the patient. Around them are small clear icons for a pacemaker or implanted device, a cochlear implant, and a metal fragment near the eye, each paired with a simple caution symbol. No text, model numbers or brands.
```

### 4. Nerve conduction study (`nerve-conduction-study`)

#### Image 1 — Overview

- **File:** `src/assets/article-images/examinations/nerve-conduction-study/nerve-conduction-study-overview.webp`
- **Size:** 1600×1200 px (4:3)
- **Suggested position:** Inline near the beginning of the article.
- **Suggested alt text (English):** Clinician performing a nerve conduction study with surface electrodes on the hand and forearm.

**AI image prompt:**

```text
Output: 1600x1200 px, 4:3 landscape. Create a clean, patient-friendly flat-vector/cartoon medical illustration for an orthopaedic education website. Use a white-to-pale-blue background, dark navy outlines, soft blue/teal clothing and accents, warm natural skin tones, and coral-red/orange only to highlight pain or pathology. Keep anatomy clinically plausible and proportional, with one clear teaching point. Use simple high-contrast shapes that remain understandable on a phone and for older readers. No words, letters, numbers, labels, captions, logos, watermarks, brand names, gore, exposed surgical wounds, or frightening imagery. Do not exaggerate disease severity. Avoid decorative clutter. The image must be self-explanatory without text. Scene: Clinician placing small surface electrodes on a patient's forearm and hand while applying a brief electrical stimulus with a handheld stimulator. Patient is seated comfortably and the scene is non-threatening.
```

#### Image 2 — How it works

- **File:** `src/assets/article-images/examinations/nerve-conduction-study/nerve-conduction-study-concept.webp`
- **Size:** 1600×1200 px (4:3)
- **Suggested position:** Inline in the section explaining nerve conduction.
- **Suggested alt text (English):** Peripheral nerve with surface electrodes and a waveform representing the measured nerve signal.

**AI image prompt:**

```text
Output: 1600x1200 px, 4:3 landscape. Create a clean, patient-friendly flat-vector/cartoon medical illustration for an orthopaedic education website. Use a white-to-pale-blue background, dark navy outlines, soft blue/teal clothing and accents, warm natural skin tones, and coral-red/orange only to highlight pain or pathology. Keep anatomy clinically plausible and proportional, with one clear teaching point. Use simple high-contrast shapes that remain understandable on a phone and for older readers. No words, letters, numbers, labels, captions, logos, watermarks, brand names, gore, exposed surgical wounds, or frightening imagery. Do not exaggerate disease severity. Avoid decorative clutter. The image must be self-explanatory without text. Scene: Educational cutaway of a peripheral nerve running down the forearm with two surface electrodes along its course and a simple waveform trace on a monitor. Use subtle pulses travelling along the nerve to show signal timing and strength, with no labels or numbers.
```

#### Image 3 — EMG component

- **File:** `src/assets/article-images/examinations/nerve-conduction-study/nerve-conduction-study-practical.webp`
- **Size:** 1600×1200 px (4:3)
- **Suggested position:** Inline where needle EMG is explained, if included.
- **Suggested alt text (English):** Fine needle electrode used for electromyography while muscle activity is viewed on a monitor.

**AI image prompt:**

```text
Output: 1600x1200 px, 4:3 landscape. Create a clean, patient-friendly flat-vector/cartoon medical illustration for an orthopaedic education website. Use a white-to-pale-blue background, dark navy outlines, soft blue/teal clothing and accents, warm natural skin tones, and coral-red/orange only to highlight pain or pathology. Keep anatomy clinically plausible and proportional, with one clear teaching point. Use simple high-contrast shapes that remain understandable on a phone and for older readers. No words, letters, numbers, labels, captions, logos, watermarks, brand names, gore, exposed surgical wounds, or frightening imagery. Do not exaggerate disease severity. Avoid decorative clutter. The image must be self-explanatory without text. Scene: Clinician inserting a very fine needle electrode into a forearm or leg muscle while the patient rests comfortably, with a monitor displaying a simple waveform. Keep it clean and non-graphic: no blood, no close-up puncture detail.
```

### 5. Musculoskeletal ultrasound (`ultrasound`)

#### Image 1 — Overview

- **File:** `src/assets/article-images/examinations/ultrasound/ultrasound-overview.webp`
- **Size:** 1600×1200 px (4:3)
- **Suggested position:** Inline near the beginning of the article.
- **Suggested alt text (English):** Clinician using an ultrasound probe on a joint while viewing the monitor.

**AI image prompt:**

```text
Output: 1600x1200 px, 4:3 landscape. Create a clean, patient-friendly flat-vector/cartoon medical illustration for an orthopaedic education website. Use a white-to-pale-blue background, dark navy outlines, soft blue/teal clothing and accents, warm natural skin tones, and coral-red/orange only to highlight pain or pathology. Keep anatomy clinically plausible and proportional, with one clear teaching point. Use simple high-contrast shapes that remain understandable on a phone and for older readers. No words, letters, numbers, labels, captions, logos, watermarks, brand names, gore, exposed surgical wounds, or frightening imagery. Do not exaggerate disease severity. Avoid decorative clutter. The image must be self-explanatory without text. Scene: Clinician holding a musculoskeletal ultrasound probe against a patient's shoulder or knee with a small amount of gel while both look at the monitor. Use realistic probe contact and calm clinic setting.
```

#### Image 2 — How it works

- **File:** `src/assets/article-images/examinations/ultrasound/ultrasound-concept.webp`
- **Size:** 1600×1200 px (4:3)
- **Suggested position:** Inline in the section explaining what ultrasound shows.
- **Suggested alt text (English):** Ultrasound probe sending sound waves through soft tissue with a tendon and bursa visible beneath it.

**AI image prompt:**

```text
Output: 1600x1200 px, 4:3 landscape. Create a clean, patient-friendly flat-vector/cartoon medical illustration for an orthopaedic education website. Use a white-to-pale-blue background, dark navy outlines, soft blue/teal clothing and accents, warm natural skin tones, and coral-red/orange only to highlight pain or pathology. Keep anatomy clinically plausible and proportional, with one clear teaching point. Use simple high-contrast shapes that remain understandable on a phone and for older readers. No words, letters, numbers, labels, captions, logos, watermarks, brand names, gore, exposed surgical wounds, or frightening imagery. Do not exaggerate disease severity. Avoid decorative clutter. The image must be self-explanatory without text. Scene: Cutaway showing an ultrasound probe on the skin, fan-shaped sound-wave beams passing into tissue, and a tendon with a nearby bursa or small fluid collection beneath the probe. Beside it, show the corresponding grayscale ultrasound-style screen image.
```

#### Image 3 — Dynamic examination

- **File:** `src/assets/article-images/examinations/ultrasound/ultrasound-practical.webp`
- **Size:** 1600×1200 px (4:3)
- **Suggested position:** Inline in the section about advantages or limitations.
- **Suggested alt text (English):** Dynamic ultrasound examination while the patient moves the joint and the tendon is viewed in real time.

**AI image prompt:**

```text
Output: 1600x1200 px, 4:3 landscape. Create a clean, patient-friendly flat-vector/cartoon medical illustration for an orthopaedic education website. Use a white-to-pale-blue background, dark navy outlines, soft blue/teal clothing and accents, warm natural skin tones, and coral-red/orange only to highlight pain or pathology. Keep anatomy clinically plausible and proportional, with one clear teaching point. Use simple high-contrast shapes that remain understandable on a phone and for older readers. No words, letters, numbers, labels, captions, logos, watermarks, brand names, gore, exposed surgical wounds, or frightening imagery. Do not exaggerate disease severity. Avoid decorative clutter. The image must be self-explanatory without text. Scene: Clinician keeps the ultrasound probe over a shoulder tendon while the patient slowly moves the arm through a comfortable range, and the monitor shows the tendon sliding dynamically. Emphasize real-time movement assessment.
```

### 6. X-ray (`xray`)

#### Image 1 — Overview

- **File:** `src/assets/article-images/examinations/xray/xray-overview.webp`
- **Size:** 1600×1200 px (4:3)
- **Suggested position:** Inline in “What an X-ray is”.
- **Suggested alt text (English):** Radiographer positioning a joint for a routine X-ray.

**AI image prompt:**

```text
Output: 1600x1200 px, 4:3 landscape. Create a clean, patient-friendly flat-vector/cartoon medical illustration for an orthopaedic education website. Use a white-to-pale-blue background, dark navy outlines, soft blue/teal clothing and accents, warm natural skin tones, and coral-red/orange only to highlight pain or pathology. Keep anatomy clinically plausible and proportional, with one clear teaching point. Use simple high-contrast shapes that remain understandable on a phone and for older readers. No words, letters, numbers, labels, captions, logos, watermarks, brand names, gore, exposed surgical wounds, or frightening imagery. Do not exaggerate disease severity. Avoid decorative clutter. The image must be self-explanatory without text. Scene: Radiographer positioning a patient's knee or shoulder between an X-ray tube and detector while the patient stays still. The room is calm and realistic, with no dramatic radiation graphics.
```

#### Image 2 — What X-rays show

- **File:** `src/assets/article-images/examinations/xray/xray-concept.webp`
- **Size:** 1600×1200 px (4:3)
- **Suggested position:** Inline in “What an X-ray can answer”.
- **Suggested alt text (English):** X-ray-style examples showing normal bone, a fracture and osteoarthritic joint changes.

**AI image prompt:**

```text
Output: 1600x1200 px, 4:3 landscape. Create a clean, patient-friendly flat-vector/cartoon medical illustration for an orthopaedic education website. Use a white-to-pale-blue background, dark navy outlines, soft blue/teal clothing and accents, warm natural skin tones, and coral-red/orange only to highlight pain or pathology. Keep anatomy clinically plausible and proportional, with one clear teaching point. Use simple high-contrast shapes that remain understandable on a phone and for older readers. No words, letters, numbers, labels, captions, logos, watermarks, brand names, gore, exposed surgical wounds, or frightening imagery. Do not exaggerate disease severity. Avoid decorative clutter. The image must be self-explanatory without text. Scene: Clean educational radiograph-style composition showing three small examples: a normal bone/joint, a simple displaced fracture, and an osteoarthritic joint with narrowed joint space and small bone spurs. Keep soft tissues faint and bones clear. No labels.
```

#### Image 3 — Limitations

- **File:** `src/assets/article-images/examinations/xray/xray-practical.webp`
- **Size:** 1600×1200 px (4:3)
- **Suggested position:** Inline in “What an X-ray cannot show”.
- **Suggested alt text (English):** Same knee shown by X-ray and MRI to compare bone visibility with soft-tissue detail.

**AI image prompt:**

```text
Output: 1600x1200 px, 4:3 landscape. Create a clean, patient-friendly flat-vector/cartoon medical illustration for an orthopaedic education website. Use a white-to-pale-blue background, dark navy outlines, soft blue/teal clothing and accents, warm natural skin tones, and coral-red/orange only to highlight pain or pathology. Keep anatomy clinically plausible and proportional, with one clear teaching point. Use simple high-contrast shapes that remain understandable on a phone and for older readers. No words, letters, numbers, labels, captions, logos, watermarks, brand names, gore, exposed surgical wounds, or frightening imagery. Do not exaggerate disease severity. Avoid decorative clutter. The image must be self-explanatory without text. Scene: Side-by-side text-free comparison of the same knee: X-ray-like panel with bone clearly visible but menisci and ligaments essentially invisible; MRI-like panel showing soft tissues including menisci and ligaments. Maintain matching orientation.
```

## 5. Image-generation prompts — Rehabilitation

### 1. Back rehabilitation (`back-rehab`)

#### Image 1 — Overview

- **File:** `src/assets/article-images/rehabilitation/back-rehab/back-rehab-overview.webp`
- **Size:** 1600×1200 px (4:3)
- **Suggested position:** Inline near “What a back needs” or the first main section.
- **Suggested alt text (English):** Back rehabilitation progressing from walking to gentle trunk exercise and a functional hip-hinge.

**AI image prompt:**

```text
Output: 1600x1200 px, 4:3 landscape. Create a clean, patient-friendly flat-vector/cartoon medical illustration for an orthopaedic education website. Use a white-to-pale-blue background, dark navy outlines, soft blue/teal clothing and accents, warm natural skin tones, and coral-red/orange only to highlight pain or pathology. Keep anatomy clinically plausible and proportional, with one clear teaching point. Use simple high-contrast shapes that remain understandable on a phone and for older readers. No words, letters, numbers, labels, captions, logos, watermarks, brand names, gore, exposed surgical wounds, or frightening imagery. Do not exaggerate disease severity. Avoid decorative clutter. The image must be self-explanatory without text. Scene: Three-stage back rehabilitation sequence with the same adult: short walking, gentle pelvic tilt or bridge, then a controlled functional hip-hinge. Show neutral comfortable movement and no pain-provoking extremes.
```

#### Image 2 — Technique

- **File:** `src/assets/article-images/rehabilitation/back-rehab/back-rehab-technique.webp`
- **Size:** 1600×1200 px (4:3)
- **Suggested position:** Inline in the section about lifting or functional retraining.
- **Suggested alt text (English):** Person using a hip hinge to lift a light object close to the body.

**AI image prompt:**

```text
Output: 1600x1200 px, 4:3 landscape. Create a clean, patient-friendly flat-vector/cartoon medical illustration for an orthopaedic education website. Use a white-to-pale-blue background, dark navy outlines, soft blue/teal clothing and accents, warm natural skin tones, and coral-red/orange only to highlight pain or pathology. Keep anatomy clinically plausible and proportional, with one clear teaching point. Use simple high-contrast shapes that remain understandable on a phone and for older readers. No words, letters, numbers, labels, captions, logos, watermarks, brand names, gore, exposed surgical wounds, or frightening imagery. Do not exaggerate disease severity. Avoid decorative clutter. The image must be self-explanatory without text. Scene: Adult picking up a light box from knee height using a hip hinge: feet stable, hips move back, object kept close to the body, spine in a comfortable neutral range. Show a small second ghosted start position to make the movement clear.
```

#### Image 3 — Progression

- **File:** `src/assets/article-images/rehabilitation/back-rehab/back-rehab-progression.webp`
- **Size:** 1600×1200 px (4:3)
- **Suggested position:** Inline near the end of the rehabilitation article.
- **Suggested alt text (English):** Back rehabilitation progression from mobility to strength and normal daily function.

**AI image prompt:**

```text
Output: 1600x1200 px, 4:3 landscape. Create a clean, patient-friendly flat-vector/cartoon medical illustration for an orthopaedic education website. Use a white-to-pale-blue background, dark navy outlines, soft blue/teal clothing and accents, warm natural skin tones, and coral-red/orange only to highlight pain or pathology. Keep anatomy clinically plausible and proportional, with one clear teaching point. Use simple high-contrast shapes that remain understandable on a phone and for older readers. No words, letters, numbers, labels, captions, logos, watermarks, brand names, gore, exposed surgical wounds, or frightening imagery. Do not exaggerate disease severity. Avoid decorative clutter. The image must be self-explanatory without text. Scene: Three-panel progression: gentle mobility, trunk and hip strengthening, then functional lifting or return to normal daily activity. The same adult appears in each panel. Avoid implying that one exact posture prevents all back pain.
```

### 2. Balance and fall prevention (`balance-and-fall-prevention`)

#### Image 1 — Overview

- **File:** `src/assets/article-images/rehabilitation/balance-and-fall-prevention/balance-and-fall-prevention-overview.webp`
- **Size:** 1600×1200 px (4:3)
- **Suggested position:** Inline near the first section.
- **Suggested alt text (English):** Older adult practising balance safely beside a stable support.

**AI image prompt:**

```text
Output: 1600x1200 px, 4:3 landscape. Create a clean, patient-friendly flat-vector/cartoon medical illustration for an orthopaedic education website. Use a white-to-pale-blue background, dark navy outlines, soft blue/teal clothing and accents, warm natural skin tones, and coral-red/orange only to highlight pain or pathology. Keep anatomy clinically plausible and proportional, with one clear teaching point. Use simple high-contrast shapes that remain understandable on a phone and for older readers. No words, letters, numbers, labels, captions, logos, watermarks, brand names, gore, exposed surgical wounds, or frightening imagery. Do not exaggerate disease severity. Avoid decorative clutter. The image must be self-explanatory without text. Scene: Older adult practising tandem stance or supported single-leg balance beside a sturdy kitchen counter or rail, with one hand hovering near support. Upright, confident, safe footwear, uncluttered floor.
```

#### Image 2 — Home safety

- **File:** `src/assets/article-images/rehabilitation/balance-and-fall-prevention/balance-and-fall-prevention-technique.webp`
- **Size:** 1600×1200 px (4:3)
- **Suggested position:** Inline in the home-safety section.
- **Suggested alt text (English):** Safer home environment with clear floors, good lighting and stable handholds.

**AI image prompt:**

```text
Output: 1600x1200 px, 4:3 landscape. Create a clean, patient-friendly flat-vector/cartoon medical illustration for an orthopaedic education website. Use a white-to-pale-blue background, dark navy outlines, soft blue/teal clothing and accents, warm natural skin tones, and coral-red/orange only to highlight pain or pathology. Keep anatomy clinically plausible and proportional, with one clear teaching point. Use simple high-contrast shapes that remain understandable on a phone and for older readers. No words, letters, numbers, labels, captions, logos, watermarks, brand names, gore, exposed surgical wounds, or frightening imagery. Do not exaggerate disease severity. Avoid decorative clutter. The image must be self-explanatory without text. Scene: Bright, tidy home hallway and bathroom with clear walking paths, secured rug edges, good lighting, handrail or grab bar, non-slip surface and supportive shoes. No text or warning labels.
```

#### Image 3 — Strength and stepping

- **File:** `src/assets/article-images/rehabilitation/balance-and-fall-prevention/balance-and-fall-prevention-progression.webp`
- **Size:** 1600×1200 px (4:3)
- **Suggested position:** Inline in the exercise section.
- **Suggested alt text (English):** Sit-to-stand, supported heel raises and low-step practice for strength and balance.

**AI image prompt:**

```text
Output: 1600x1200 px, 4:3 landscape. Create a clean, patient-friendly flat-vector/cartoon medical illustration for an orthopaedic education website. Use a white-to-pale-blue background, dark navy outlines, soft blue/teal clothing and accents, warm natural skin tones, and coral-red/orange only to highlight pain or pathology. Keep anatomy clinically plausible and proportional, with one clear teaching point. Use simple high-contrast shapes that remain understandable on a phone and for older readers. No words, letters, numbers, labels, captions, logos, watermarks, brand names, gore, exposed surgical wounds, or frightening imagery. Do not exaggerate disease severity. Avoid decorative clutter. The image must be self-explanatory without text. Scene: Three exercises for fall prevention: sit-to-stand from a firm chair, heel raises while holding a counter, and controlled step practice on a low step with a rail. Same older adult, calm and capable.
```

### 3. Knee rehabilitation (`knee-rehab`)

#### Image 1 — Overview

- **File:** `src/assets/article-images/rehabilitation/knee-rehab/knee-rehab-overview.webp`
- **Size:** 1600×1200 px (4:3)
- **Suggested position:** Inline in “The order of work”.
- **Suggested alt text (English):** Knee rehabilitation progressing from quadriceps activation to a shallow squat and step-up.

**AI image prompt:**

```text
Output: 1600x1200 px, 4:3 landscape. Create a clean, patient-friendly flat-vector/cartoon medical illustration for an orthopaedic education website. Use a white-to-pale-blue background, dark navy outlines, soft blue/teal clothing and accents, warm natural skin tones, and coral-red/orange only to highlight pain or pathology. Keep anatomy clinically plausible and proportional, with one clear teaching point. Use simple high-contrast shapes that remain understandable on a phone and for older readers. No words, letters, numbers, labels, captions, logos, watermarks, brand names, gore, exposed surgical wounds, or frightening imagery. Do not exaggerate disease severity. Avoid decorative clutter. The image must be self-explanatory without text. Scene: Three-stage knee rehabilitation sequence with the same patient: quadriceps setting or straight-leg raise, then a shallow squat, then a controlled step-up. Show stable knee alignment and increasing load without deep knee bending.
```

#### Image 2 — Hip-knee control

- **File:** `src/assets/article-images/rehabilitation/knee-rehab/knee-rehab-technique.webp`
- **Size:** 1600×1200 px (4:3)
- **Suggested position:** Inline after the discussion of hip muscles and knee alignment.
- **Suggested alt text (English):** Hip abduction and controlled step-down demonstrating good knee alignment.

**AI image prompt:**

```text
Output: 1600x1200 px, 4:3 landscape. Create a clean, patient-friendly flat-vector/cartoon medical illustration for an orthopaedic education website. Use a white-to-pale-blue background, dark navy outlines, soft blue/teal clothing and accents, warm natural skin tones, and coral-red/orange only to highlight pain or pathology. Keep anatomy clinically plausible and proportional, with one clear teaching point. Use simple high-contrast shapes that remain understandable on a phone and for older readers. No words, letters, numbers, labels, captions, logos, watermarks, brand names, gore, exposed surgical wounds, or frightening imagery. Do not exaggerate disease severity. Avoid decorative clutter. The image must be self-explanatory without text. Scene: Two exercises: side-lying hip abduction with pelvis level and a slow step-down from a low step. In the step-down, show the knee tracking over the middle of the foot rather than collapsing inward.
```

#### Image 3 — Return to function

- **File:** `src/assets/article-images/rehabilitation/knee-rehab/knee-rehab-progression.webp`
- **Size:** 1600×1200 px (4:3)
- **Suggested position:** Inline near “After knee surgery” or the end of general progression content.
- **Suggested alt text (English):** Functional knee rehabilitation progressing from stairs to brisk walking and controlled jogging.

**AI image prompt:**

```text
Output: 1600x1200 px, 4:3 landscape. Create a clean, patient-friendly flat-vector/cartoon medical illustration for an orthopaedic education website. Use a white-to-pale-blue background, dark navy outlines, soft blue/teal clothing and accents, warm natural skin tones, and coral-red/orange only to highlight pain or pathology. Keep anatomy clinically plausible and proportional, with one clear teaching point. Use simple high-contrast shapes that remain understandable on a phone and for older readers. No words, letters, numbers, labels, captions, logos, watermarks, brand names, gore, exposed surgical wounds, or frightening imagery. Do not exaggerate disease severity. Avoid decorative clutter. The image must be self-explanatory without text. Scene: Text-free staged return to function: comfortable stairs using a rail, brisk flat-ground walking, then a controlled easy jog or sport-specific balance drill. Show progression, not a fixed timeline.
```

### 4. Rehabilitation principles (`rehab-principles`)

#### Image 1 — Overview

- **File:** `src/assets/article-images/rehabilitation/rehab-principles/rehab-principles-overview.webp`
- **Size:** 1600×1200 px (4:3)
- **Suggested position:** Inline at the beginning of the article.
- **Suggested alt text (English):** General rehabilitation progression from mobility to strength to functional practice.

**AI image prompt:**

```text
Output: 1600x1200 px, 4:3 landscape. Create a clean, patient-friendly flat-vector/cartoon medical illustration for an orthopaedic education website. Use a white-to-pale-blue background, dark navy outlines, soft blue/teal clothing and accents, warm natural skin tones, and coral-red/orange only to highlight pain or pathology. Keep anatomy clinically plausible and proportional, with one clear teaching point. Use simple high-contrast shapes that remain understandable on a phone and for older readers. No words, letters, numbers, labels, captions, logos, watermarks, brand names, gore, exposed surgical wounds, or frightening imagery. Do not exaggerate disease severity. Avoid decorative clutter. The image must be self-explanatory without text. Scene: Three clear stages of rehabilitation shown with one adult: restoring comfortable movement, building strength with a resistance exercise, then practising a real-life or sport movement. Use a visual left-to-right progression without words or stage numbers.
```

#### Image 2 — Load monitoring

- **File:** `src/assets/article-images/rehabilitation/rehab-principles/rehab-principles-technique.webp`
- **Size:** 1600×1200 px (4:3)
- **Suggested position:** Inline in the section about pain or exercise dose.
- **Suggested alt text (English):** Same exercise shown at easy, appropriate and excessive loads to illustrate symptom-guided progression.

**AI image prompt:**

```text
Output: 1600x1200 px, 4:3 landscape. Create a clean, patient-friendly flat-vector/cartoon medical illustration for an orthopaedic education website. Use a white-to-pale-blue background, dark navy outlines, soft blue/teal clothing and accents, warm natural skin tones, and coral-red/orange only to highlight pain or pathology. Keep anatomy clinically plausible and proportional, with one clear teaching point. Use simple high-contrast shapes that remain understandable on a phone and for older readers. No words, letters, numbers, labels, captions, logos, watermarks, brand names, gore, exposed surgical wounds, or frightening imagery. Do not exaggerate disease severity. Avoid decorative clutter. The image must be self-explanatory without text. Scene: Three versions of the same strengthening exercise at easy, appropriate and excessive loads. In the first two the person has relaxed form; in the excessive panel the person strains and has a small red pain flare. Use body language only, with no green-yellow-red traffic light or text.
```

#### Image 3 — Recovery habits

- **File:** `src/assets/article-images/rehabilitation/rehab-principles/rehab-principles-progression.webp`
- **Size:** 1600×1200 px (4:3)
- **Suggested position:** Inline near the section about consistency and recovery.
- **Suggested alt text (English):** Sleep, nutrition, hydration, light activity and regular routine supporting rehabilitation.

**AI image prompt:**

```text
Output: 1600x1200 px, 4:3 landscape. Create a clean, patient-friendly flat-vector/cartoon medical illustration for an orthopaedic education website. Use a white-to-pale-blue background, dark navy outlines, soft blue/teal clothing and accents, warm natural skin tones, and coral-red/orange only to highlight pain or pathology. Keep anatomy clinically plausible and proportional, with one clear teaching point. Use simple high-contrast shapes that remain understandable on a phone and for older readers. No words, letters, numbers, labels, captions, logos, watermarks, brand names, gore, exposed surgical wounds, or frightening imagery. Do not exaggerate disease severity. Avoid decorative clutter. The image must be self-explanatory without text. Scene: Calm collage of recovery-supporting habits: regular sleep, a balanced protein-rich meal, hydration, an easy walk or rest day, and a simple calendar or clock icon with no numbers. Emphasize consistency rather than supplements.
```

### 5. Shoulder rehabilitation (`shoulder-rehab`)

#### Image 1 — Overview

- **File:** `src/assets/article-images/rehabilitation/shoulder-rehab/shoulder-rehab-overview.webp`
- **Size:** 1600×1200 px (4:3)
- **Suggested position:** Inline near the beginning of the article.
- **Suggested alt text (English):** Pendulum, wall slide and assisted forward elevation for early shoulder rehabilitation.

**AI image prompt:**

```text
Output: 1600x1200 px, 4:3 landscape. Create a clean, patient-friendly flat-vector/cartoon medical illustration for an orthopaedic education website. Use a white-to-pale-blue background, dark navy outlines, soft blue/teal clothing and accents, warm natural skin tones, and coral-red/orange only to highlight pain or pathology. Keep anatomy clinically plausible and proportional, with one clear teaching point. Use simple high-contrast shapes that remain understandable on a phone and for older readers. No words, letters, numbers, labels, captions, logos, watermarks, brand names, gore, exposed surgical wounds, or frightening imagery. Do not exaggerate disease severity. Avoid decorative clutter. The image must be self-explanatory without text. Scene: Three gentle shoulder mobility exercises: pendulum, wall slide and assisted forward elevation with a stick or the other hand. Same adult, comfortable range, no forced end-range movement.
```

#### Image 2 — Strengthening

- **File:** `src/assets/article-images/rehabilitation/shoulder-rehab/shoulder-rehab-technique.webp`
- **Size:** 1600×1200 px (4:3)
- **Suggested position:** Inline in the strengthening section.
- **Suggested alt text (English):** Band external rotation and band row for shoulder and scapular strengthening.

**AI image prompt:**

```text
Output: 1600x1200 px, 4:3 landscape. Create a clean, patient-friendly flat-vector/cartoon medical illustration for an orthopaedic education website. Use a white-to-pale-blue background, dark navy outlines, soft blue/teal clothing and accents, warm natural skin tones, and coral-red/orange only to highlight pain or pathology. Keep anatomy clinically plausible and proportional, with one clear teaching point. Use simple high-contrast shapes that remain understandable on a phone and for older readers. No words, letters, numbers, labels, captions, logos, watermarks, brand names, gore, exposed surgical wounds, or frightening imagery. Do not exaggerate disease severity. Avoid decorative clutter. The image must be self-explanatory without text. Scene: Two precise exercises: resistance-band external rotation with elbow tucked at the side, and a band row with shoulder blades gently drawing back. Show neutral wrist and controlled movement.
```

#### Image 3 — Return overhead

- **File:** `src/assets/article-images/rehabilitation/shoulder-rehab/shoulder-rehab-progression.webp`
- **Size:** 1600×1200 px (4:3)
- **Suggested position:** Inline near the end of the article.
- **Suggested alt text (English):** Shoulder rehabilitation progressing from low reaching to controlled overhead use.

**AI image prompt:**

```text
Output: 1600x1200 px, 4:3 landscape. Create a clean, patient-friendly flat-vector/cartoon medical illustration for an orthopaedic education website. Use a white-to-pale-blue background, dark navy outlines, soft blue/teal clothing and accents, warm natural skin tones, and coral-red/orange only to highlight pain or pathology. Keep anatomy clinically plausible and proportional, with one clear teaching point. Use simple high-contrast shapes that remain understandable on a phone and for older readers. No words, letters, numbers, labels, captions, logos, watermarks, brand names, gore, exposed surgical wounds, or frightening imagery. Do not exaggerate disease severity. Avoid decorative clutter. The image must be self-explanatory without text. Scene: Three-stage return to overhead use: reaching at waist height, then shoulder height, then overhead with a very light object. The same adult performs each stage with good control and no visible pain.
```

## 6. Image-generation prompts — Treatments

### 1. Choosing treatment with your doctor (`choosing-treatment`)

#### Image 1 — Overview

- **File:** `src/assets/article-images/treatments/choosing-treatment/choosing-treatment-overview.webp`
- **Size:** 1600×1200 px (4:3)
- **Suggested position:** Inline near “There is rarely one right answer”.
- **Suggested alt text (English):** Doctor and patient reviewing treatment choices together.

**AI image prompt:**

```text
Output: 1600x1200 px, 4:3 landscape. Create a clean, patient-friendly flat-vector/cartoon medical illustration for an orthopaedic education website. Use a white-to-pale-blue background, dark navy outlines, soft blue/teal clothing and accents, warm natural skin tones, and coral-red/orange only to highlight pain or pathology. Keep anatomy clinically plausible and proportional, with one clear teaching point. Use simple high-contrast shapes that remain understandable on a phone and for older readers. No words, letters, numbers, labels, captions, logos, watermarks, brand names, gore, exposed surgical wounds, or frightening imagery. Do not exaggerate disease severity. Avoid decorative clutter. The image must be self-explanatory without text. Scene: Doctor and patient sitting side by side reviewing several neutral treatment-option cards or a tablet. Both are engaged in discussion and looking at each other, visually conveying shared decision-making rather than the doctor dictating a single choice.
```

#### Image 2 — Treatment pathways

- **File:** `src/assets/article-images/treatments/choosing-treatment/choosing-treatment-mechanism.webp`
- **Size:** 1600×1200 px (4:3)
- **Suggested position:** Inline in “The usual order”.
- **Suggested alt text (English):** Different treatment options shown as branching choices from self-care and rehabilitation through medicines, injections and surgery.

**AI image prompt:**

```text
Output: 1600x1200 px, 4:3 landscape. Create a clean, patient-friendly flat-vector/cartoon medical illustration for an orthopaedic education website. Use a white-to-pale-blue background, dark navy outlines, soft blue/teal clothing and accents, warm natural skin tones, and coral-red/orange only to highlight pain or pathology. Keep anatomy clinically plausible and proportional, with one clear teaching point. Use simple high-contrast shapes that remain understandable on a phone and for older readers. No words, letters, numbers, labels, captions, logos, watermarks, brand names, gore, exposed surgical wounds, or frightening imagery. Do not exaggerate disease severity. Avoid decorative clutter. The image must be self-explanatory without text. Scene: Text-free branching pathway of five visual options: activity/self-care, rehabilitation exercise, generic medicine, joint injection and surgery. Arrange them as choices that can branch rather than a rigid mandatory ladder. No arrows implying everyone must progress to surgery.
```

#### Image 3 — Questions / second opinion

- **File:** `src/assets/article-images/treatments/choosing-treatment/choosing-treatment-practical.webp`
- **Size:** 1600×1200 px (4:3)
- **Suggested position:** Inline in “Questions that change the conversation” or near the end.
- **Suggested alt text (English):** Patient bringing questions to a consultation with a second-opinion option shown in a small vignette.

**AI image prompt:**

```text
Output: 1600x1200 px, 4:3 landscape. Create a clean, patient-friendly flat-vector/cartoon medical illustration for an orthopaedic education website. Use a white-to-pale-blue background, dark navy outlines, soft blue/teal clothing and accents, warm natural skin tones, and coral-red/orange only to highlight pain or pathology. Keep anatomy clinically plausible and proportional, with one clear teaching point. Use simple high-contrast shapes that remain understandable on a phone and for older readers. No words, letters, numbers, labels, captions, logos, watermarks, brand names, gore, exposed surgical wounds, or frightening imagery. Do not exaggerate disease severity. Avoid decorative clutter. The image must be self-explanatory without text. Scene: Patient holding a short written question list while the clinician listens attentively; include a small second-clinician consultation vignette in the background to normalize seeking another opinion for a major decision. No readable writing.
```

### 2. Joint injections (`joint-injections`)

#### Image 1 — Overview

- **File:** `src/assets/article-images/treatments/joint-injections/joint-injections-overview.webp`
- **Size:** 1600×1200 px (4:3)
- **Suggested position:** Inline near the start of the article.
- **Suggested alt text (English):** Clinician performing a sterile injection into the knee joint.

**AI image prompt:**

```text
Output: 1600x1200 px, 4:3 landscape. Create a clean, patient-friendly flat-vector/cartoon medical illustration for an orthopaedic education website. Use a white-to-pale-blue background, dark navy outlines, soft blue/teal clothing and accents, warm natural skin tones, and coral-red/orange only to highlight pain or pathology. Keep anatomy clinically plausible and proportional, with one clear teaching point. Use simple high-contrast shapes that remain understandable on a phone and for older readers. No words, letters, numbers, labels, captions, logos, watermarks, brand names, gore, exposed surgical wounds, or frightening imagery. Do not exaggerate disease severity. Avoid decorative clutter. The image must be self-explanatory without text. Scene: Sterile knee joint injection in a clinic: clinician wearing gloves, skin cleaned, small needle entering from an anatomically reasonable approach while the patient is relaxed. No blood and no dramatic close-up.
```

#### Image 2 — Where the injection goes

- **File:** `src/assets/article-images/treatments/joint-injections/joint-injections-mechanism.webp`
- **Size:** 1600×1200 px (4:3)
- **Suggested position:** Inline in the section explaining the procedure.
- **Suggested alt text (English):** Cutaway knee showing a needle entering the joint space with medication delivered inside the joint.

**AI image prompt:**

```text
Output: 1600x1200 px, 4:3 landscape. Create a clean, patient-friendly flat-vector/cartoon medical illustration for an orthopaedic education website. Use a white-to-pale-blue background, dark navy outlines, soft blue/teal clothing and accents, warm natural skin tones, and coral-red/orange only to highlight pain or pathology. Keep anatomy clinically plausible and proportional, with one clear teaching point. Use simple high-contrast shapes that remain understandable on a phone and for older readers. No words, letters, numbers, labels, captions, logos, watermarks, brand names, gore, exposed surgical wounds, or frightening imagery. Do not exaggerate disease severity. Avoid decorative clutter. The image must be self-explanatory without text. Scene: Clean cutaway knee joint with a needle tip entering the joint space between articular surfaces, avoiding tendon, nerve and major blood vessels. Show a small diffuse medication cloud within the joint space. No labels.
```

#### Image 3 — Aftercare and warning signs

- **File:** `src/assets/article-images/treatments/joint-injections/joint-injections-practical.webp`
- **Size:** 1600×1200 px (4:3)
- **Suggested position:** Inline in the aftercare or safety section.
- **Suggested alt text (English):** Brief rest and gentle activity after a joint injection, with a small warning vignette for a hot red swollen joint.

**AI image prompt:**

```text
Output: 1600x1200 px, 4:3 landscape. Create a clean, patient-friendly flat-vector/cartoon medical illustration for an orthopaedic education website. Use a white-to-pale-blue background, dark navy outlines, soft blue/teal clothing and accents, warm natural skin tones, and coral-red/orange only to highlight pain or pathology. Keep anatomy clinically plausible and proportional, with one clear teaching point. Use simple high-contrast shapes that remain understandable on a phone and for older readers. No words, letters, numbers, labels, captions, logos, watermarks, brand names, gore, exposed surgical wounds, or frightening imagery. Do not exaggerate disease severity. Avoid decorative clutter. The image must be self-explanatory without text. Scene: Two-part scene: patient resting the injected joint briefly and then walking gently later; beside it, a small caution vignette showing a knee that is unusually red, hot and swollen with a thermometer icon. Keep the warning cue small and non-alarming.
```

### 3. Pain medicines (`pain-medicines`)

#### Image 1 — Overview

- **File:** `src/assets/article-images/treatments/pain-medicines/pain-medicines-overview.webp`
- **Size:** 1600×1200 px (4:3)
- **Suggested position:** Inline near the start of the article.
- **Suggested alt text (English):** Clinician discussing generic oral and topical pain-relief options with a patient.

**AI image prompt:**

```text
Output: 1600x1200 px, 4:3 landscape. Create a clean, patient-friendly flat-vector/cartoon medical illustration for an orthopaedic education website. Use a white-to-pale-blue background, dark navy outlines, soft blue/teal clothing and accents, warm natural skin tones, and coral-red/orange only to highlight pain or pathology. Keep anatomy clinically plausible and proportional, with one clear teaching point. Use simple high-contrast shapes that remain understandable on a phone and for older readers. No words, letters, numbers, labels, captions, logos, watermarks, brand names, gore, exposed surgical wounds, or frightening imagery. Do not exaggerate disease severity. Avoid decorative clutter. The image must be self-explanatory without text. Scene: Doctor or pharmacist reviewing generic pain-relief options with a patient: unbranded tablets, a topical gel tube with no logo, and a medication list. Calm consultation, no dosage information.
```

#### Image 2 — Routes and cautions

- **File:** `src/assets/article-images/treatments/pain-medicines/pain-medicines-mechanism.webp`
- **Size:** 1600×1200 px (4:3)
- **Suggested position:** Inline in the section comparing medicine types.
- **Suggested alt text (English):** Topical gel compared with oral medicine, with stomach, kidney and heart icons indicating systemic cautions.

**AI image prompt:**

```text
Output: 1600x1200 px, 4:3 landscape. Create a clean, patient-friendly flat-vector/cartoon medical illustration for an orthopaedic education website. Use a white-to-pale-blue background, dark navy outlines, soft blue/teal clothing and accents, warm natural skin tones, and coral-red/orange only to highlight pain or pathology. Keep anatomy clinically plausible and proportional, with one clear teaching point. Use simple high-contrast shapes that remain understandable on a phone and for older readers. No words, letters, numbers, labels, captions, logos, watermarks, brand names, gore, exposed surgical wounds, or frightening imagery. Do not exaggerate disease severity. Avoid decorative clutter. The image must be self-explanatory without text. Scene: Text-free comparison: topical gel applied to a painful knee or hand on one side, generic tablet swallowed on the other. Behind the oral medicine side, use subtle neutral silhouettes of stomach, kidneys and heart as a caution that systemic medicines affect the whole body. No medical warning text.
```

#### Image 3 — Medication review

- **File:** `src/assets/article-images/treatments/pain-medicines/pain-medicines-practical.webp`
- **Size:** 1600×1200 px (4:3)
- **Suggested position:** Inline in the safety section.
- **Suggested alt text (English):** Pharmacist reviewing all of a patient's medicines and supplements for safe use.

**AI image prompt:**

```text
Output: 1600x1200 px, 4:3 landscape. Create a clean, patient-friendly flat-vector/cartoon medical illustration for an orthopaedic education website. Use a white-to-pale-blue background, dark navy outlines, soft blue/teal clothing and accents, warm natural skin tones, and coral-red/orange only to highlight pain or pathology. Keep anatomy clinically plausible and proportional, with one clear teaching point. Use simple high-contrast shapes that remain understandable on a phone and for older readers. No words, letters, numbers, labels, captions, logos, watermarks, brand names, gore, exposed surgical wounds, or frightening imagery. Do not exaggerate disease severity. Avoid decorative clutter. The image must be self-explanatory without text. Scene: Patient showing a pharmacist a full collection of current medicines and supplements in plain unbranded containers while the pharmacist checks them against a list. Emphasize avoiding duplication and interactions without showing drug names or doses.
```

### 4. Self-care (`self-care`)

#### Image 1 — Overview

- **File:** `src/assets/article-images/treatments/self-care/self-care-overview.webp`
- **Size:** 1600×1200 px (4:3)
- **Suggested position:** Inline near the start of the article.
- **Suggested alt text (English):** Everyday self-care with walking, sleep, heat or cold and activity pacing.

**AI image prompt:**

```text
Output: 1600x1200 px, 4:3 landscape. Create a clean, patient-friendly flat-vector/cartoon medical illustration for an orthopaedic education website. Use a white-to-pale-blue background, dark navy outlines, soft blue/teal clothing and accents, warm natural skin tones, and coral-red/orange only to highlight pain or pathology. Keep anatomy clinically plausible and proportional, with one clear teaching point. Use simple high-contrast shapes that remain understandable on a phone and for older readers. No words, letters, numbers, labels, captions, logos, watermarks, brand names, gore, exposed surgical wounds, or frightening imagery. Do not exaggerate disease severity. Avoid decorative clutter. The image must be self-explanatory without text. Scene: Calm collage of everyday musculoskeletal self-care: gentle walking, regular sleep, a wrapped cold pack and a warm pack used comfortably, and pacing a household task with a short rest. No medication brands or medical devices.
```

#### Image 2 — Managing a flare

- **File:** `src/assets/article-images/treatments/self-care/self-care-mechanism.webp`
- **Size:** 1600×1200 px (4:3)
- **Suggested position:** Inline in the section on symptom flares.
- **Suggested alt text (English):** Temporary load reduction followed by gentle movement and gradual return to activity during a flare.

**AI image prompt:**

```text
Output: 1600x1200 px, 4:3 landscape. Create a clean, patient-friendly flat-vector/cartoon medical illustration for an orthopaedic education website. Use a white-to-pale-blue background, dark navy outlines, soft blue/teal clothing and accents, warm natural skin tones, and coral-red/orange only to highlight pain or pathology. Keep anatomy clinically plausible and proportional, with one clear teaching point. Use simple high-contrast shapes that remain understandable on a phone and for older readers. No words, letters, numbers, labels, captions, logos, watermarks, brand names, gore, exposed surgical wounds, or frightening imagery. Do not exaggerate disease severity. Avoid decorative clutter. The image must be self-explanatory without text. Scene: Three-stage flare-management scene: temporarily reducing a painful heavy activity, using comfortable supportive footwear or a simple support if appropriate, then returning to gentle range-of-motion and walking. Show gradual return rather than complete rest.
```

#### Image 3 — Daily habits

- **File:** `src/assets/article-images/treatments/self-care/self-care-practical.webp`
- **Size:** 1600×1200 px (4:3)
- **Suggested position:** Inline near prevention or practical tips.
- **Suggested alt text (English):** Movement breaks at a workstation and practical lifting with the object kept close to the body.

**AI image prompt:**

```text
Output: 1600x1200 px, 4:3 landscape. Create a clean, patient-friendly flat-vector/cartoon medical illustration for an orthopaedic education website. Use a white-to-pale-blue background, dark navy outlines, soft blue/teal clothing and accents, warm natural skin tones, and coral-red/orange only to highlight pain or pathology. Keep anatomy clinically plausible and proportional, with one clear teaching point. Use simple high-contrast shapes that remain understandable on a phone and for older readers. No words, letters, numbers, labels, captions, logos, watermarks, brand names, gore, exposed surgical wounds, or frightening imagery. Do not exaggerate disease severity. Avoid decorative clutter. The image must be self-explanatory without text. Scene: Adult at a well-arranged workstation taking a movement break, plus a second vignette lifting a light object close to the body. Show variety of comfortable postures rather than one rigid 'perfect posture'.
```

### 5. Orthopaedic surgery (`surgery`)

#### Image 1 — Overview

- **File:** `src/assets/article-images/treatments/surgery/surgery-overview.webp`
- **Size:** 1600×1200 px (4:3)
- **Suggested position:** Inline near the start of the article.
- **Suggested alt text (English):** Patient and orthopaedic surgeon discussing an operation using a joint model and scan.

**AI image prompt:**

```text
Output: 1600x1200 px, 4:3 landscape. Create a clean, patient-friendly flat-vector/cartoon medical illustration for an orthopaedic education website. Use a white-to-pale-blue background, dark navy outlines, soft blue/teal clothing and accents, warm natural skin tones, and coral-red/orange only to highlight pain or pathology. Keep anatomy clinically plausible and proportional, with one clear teaching point. Use simple high-contrast shapes that remain understandable on a phone and for older readers. No words, letters, numbers, labels, captions, logos, watermarks, brand names, gore, exposed surgical wounds, or frightening imagery. Do not exaggerate disease severity. Avoid decorative clutter. The image must be self-explanatory without text. Scene: Orthopaedic surgeon and patient reviewing a simple joint model and scan together before an operation. The patient has a question list and the surgeon is listening, emphasizing informed consent and shared decision-making.
```

#### Image 2 — What surgery involves

- **File:** `src/assets/article-images/treatments/surgery/surgery-mechanism.webp`
- **Size:** 1600×1200 px (4:3)
- **Suggested position:** Inline in the section explaining procedures.
- **Suggested alt text (English):** Non-graphic orthopaedic operating room with schematic arthroscopy and joint-replacement concepts.

**AI image prompt:**

```text
Output: 1600x1200 px, 4:3 landscape. Create a clean, patient-friendly flat-vector/cartoon medical illustration for an orthopaedic education website. Use a white-to-pale-blue background, dark navy outlines, soft blue/teal clothing and accents, warm natural skin tones, and coral-red/orange only to highlight pain or pathology. Keep anatomy clinically plausible and proportional, with one clear teaching point. Use simple high-contrast shapes that remain understandable on a phone and for older readers. No words, letters, numbers, labels, captions, logos, watermarks, brand names, gore, exposed surgical wounds, or frightening imagery. Do not exaggerate disease severity. Avoid decorative clutter. The image must be self-explanatory without text. Scene: Clean, non-graphic orthopaedic operating room with a sterile team. Include a small schematic inset showing a generic arthroscopy camera in a joint and another small inset showing replacement joint surfaces. No open wound, blood, tissue cutting or brand-specific implants.
```

#### Image 3 — Recovery

- **File:** `src/assets/article-images/treatments/surgery/surgery-practical.webp`
- **Size:** 1600×1200 px (4:3)
- **Suggested position:** Inline in the recovery section.
- **Suggested alt text (English):** Recovery after orthopaedic surgery progressing from assisted walking to rehabilitation and independent daily activity.

**AI image prompt:**

```text
Output: 1600x1200 px, 4:3 landscape. Create a clean, patient-friendly flat-vector/cartoon medical illustration for an orthopaedic education website. Use a white-to-pale-blue background, dark navy outlines, soft blue/teal clothing and accents, warm natural skin tones, and coral-red/orange only to highlight pain or pathology. Keep anatomy clinically plausible and proportional, with one clear teaching point. Use simple high-contrast shapes that remain understandable on a phone and for older readers. No words, letters, numbers, labels, captions, logos, watermarks, brand names, gore, exposed surgical wounds, or frightening imagery. Do not exaggerate disease severity. Avoid decorative clutter. The image must be self-explanatory without text. Scene: Three-stage postoperative recovery sequence: early walking with an appropriate aid, supervised rehabilitation exercise, then independent normal daily activity. Show progression without exact dates or guarantees.
```

## 7. Prompt for an AI coding tool — prepare and add all image files

Use this after all 114 generated images are available in a local input folder. The filenames should match the manifest above.

```text
You are editing the Astro repository aoenotebook-hue/rueortho.

Goal:
Integrate the complete article-image set described in rueortho_article_image_prompts.md into the website, using the same generated files for the Thai and English versions of each article.

Important constraints:
1. Do not change any medical wording, red-flag content, treatment advice, references, FAQ content, or article meaning unless an image insertion requires a tiny grammatical bridge.
2. Do not add text inside image files.
3. Do not invent new diagnoses or make an image imply a diagnosis that the article does not make.
4. Do not remove safety callouts, <RedFlags>, <Video>, <ExerciseCard>, <DoctorChecklist>, or existing medically useful media.
5. Make no unrelated refactors.

Asset preparation:
- Place the new files exactly under:
  src/assets/article-images/conditions/<slug>/
  src/assets/article-images/examinations/<slug>/
  src/assets/article-images/rehabilitation/<slug>/
  src/assets/article-images/treatments/<slug>/
- If the supplied source files are PNG/JPG, convert them to WebP with Sharp at approximately quality 86, preserve the 4:3 crop, and do not upscale beyond the supplied resolution.
- Target around 1600×1200 source pixels. Keep each ordinary WebP reasonably compressed; avoid visibly degrading anatomical detail.
- Do not delete existing assets in this task unless you prove they are unreferenced.

Conditions:
- For every slug under src/content/conditions/th and src/content/conditions/en:
  - Set or replace frontmatter `heroImage` with the new `<slug>-hero.webp`.
  - Set `heroImageAlt` with a concise, accurate, language-appropriate description.
  - Use the same hero file in both languages.
  - Add imports for `<slug>-anatomy.webp` and `<slug>-care.webp` inside each MDX file after frontmatter.
  - Insert `<Figure src={...} alt="..."/>` at the positions specified in the image manifest.
  - If the article already contains a temporary placeholder figure for the same teaching point, replace it instead of creating a duplicate. In particular, replace the temporary knee-anatomy placeholder in knee-osteoarthritis.
  - Do not add a fourth decorative image just because an older hero already exists; the new set should be the article’s three-image set.

Examinations, Rehabilitation and Treatments:
- Do NOT add `heroImage` to the resource schema merely to support this task.
- Import all three article images from `src/assets/article-images/...` and place them inline using the globally registered `<Figure>` component at the positions in the manifest.
- Reuse the same visual file in Thai and English, but write localized `alt` text for each language.
- Keep the first inline image high in the article, usually just after the opening explanatory paragraph of the first main H2 section, not before safety warnings.

Figure implementation:
- Prefer imported Astro assets, e.g.
  `import anatomyImage from '../../../assets/article-images/conditions/knee-osteoarthritis/knee-osteoarthritis-anatomy.webp';`
  then:
  `<Figure src={anatomyImage} alt="..." />`
- Use the existing src/components/mdx/Figure.astro rather than raw <img> unless there is a compelling technical reason.
- Do not add attribution/license lines for AI-generated images unless the project owner asks for them.
- If a short caption materially helps understanding, add a concise caption in the article language. Do not use a caption merely to repeat nearby prose.

Accessibility:
- Every inserted figure must have specific alt text.
- Alt text should describe what the image shows, not say “image of”.
- Keep alt text concise and avoid diagnostic certainty where the article itself is non-diagnostic.
- Decorative visual flourishes should be aria-hidden rather than described, but these planned article figures are instructional and therefore need meaningful alt text.

Responsive behavior:
- Confirm figures fit the existing prose column on desktop and mobile.
- Preserve the existing rounded-corner visual language.
- Do not hard-code fixed heights that crop anatomy.
- Use Astro image optimization through the existing Figure component.

Verification:
1. Confirm all 38 unique slugs have exactly the planned 3 images available.
2. Confirm both Thai and English article files use the correct shared images.
3. Check for broken imports and duplicate figures.
4. Run:
   npm run lint:content
   npm run check
   npm run build
5. Fix any failures caused by this change.
6. Produce a final report listing:
   - every article updated,
   - the three image files used,
   - exact insertion locations,
   - any existing figure that was replaced,
   - any article where the planned location did not exist and the closest safe alternative used.
Do not report success until all three commands pass.

```

## 8. Prompt for an AI coding tool — localization and placement QA

```text
Audit the RueOrtho article-image integration after the image insertion pass.

Scope:
- 22 condition topics
- 6 examination topics
- 5 rehabilitation topics
- 5 treatment topics
- both Thai and English variants
- one shared visual set per slug, three images per unique article topic

Check all of the following:
1. Every unique article topic has exactly three planned instructional images.
2. Thai and English versions point to the same three visual files for the same slug.
3. All alt text is localized and medically accurate.
4. No alt text claims a diagnosis where the article only discusses possible causes.
5. No image is placed above an urgent safety warning in a way that delays the warning.
6. The new condition hero is the only hero for that condition; old inline placeholders for the same concept are removed or replaced.
7. Resource articles use inline Figure components and do not require a schema change.
8. No figure duplicates an existing exercise/video illustration unless the new figure adds a distinct teaching purpose.
9. Mobile layout has no overflow, forced crop, unreadably small anatomy, or excessive vertical spacing.
10. Generated WebP files are reasonably compressed and no obvious large unoptimized source file was accidentally referenced.
11. Run `npm run lint:content`, `npm run check`, and `npm run build`.

Return a compact table of any problem found with: collection, slug, locale, file, issue, and exact fix. If no problems remain, say that explicitly and include the build/check results.

```

## 9. Prompt for an AI coding tool — optional final visual-consistency pass

```text
Review only the visual consistency of all new RueOrtho article figures; do not rewrite medical content.

Make sure:
- all figures use the same pale-blue/white, navy, teal/blue and coral-red visual language;
- pain highlights remain localized and are not more dramatic than the article describes;
- anatomy images are simplified but anatomically plausible;
- no image contains generated text, labels, numbers, brands or watermarks;
- the same condition is not depicted with conflicting anatomy from one figure to another;
- people are diverse across the whole site without changing the meaning of an individual image;
- older adults are shown as active and capable, not stereotyped as frail;
- practical exercise images show safe joint alignment and stable support where needed;
- the image crop is 4:3 and the subject remains legible at mobile width.

Do not alter an image file merely for cosmetic uniformity if that would reduce medical clarity.
Provide a list of only the images that genuinely need regeneration and quote the exact original prompt section to revise.

```
