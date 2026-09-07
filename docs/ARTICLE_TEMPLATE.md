# Article template

Copy the frontmatter block below into a new file at
`src/content/conditions/th/<slug>.mdx` (and later `…/en/<slug>.mdx` with the
**same slug**). The build validates every field against
`src/content.config.ts`, so a missing or misspelled field fails the build
rather than shipping quietly.

## Frontmatter

```yaml
---
title: ''                    # The condition name as a patient would say it
slug: ''                     # kebab-case; IDENTICAL in the th and en files
region: ''                   # shoulder | knee | spine | hip | foot-ankle |
                             # hand-wrist | elbow | paediatric | sports | bone-health
summary: ''                  # 1–2 plain sentences, ≤ 300 characters.
                             # Shown in lists, search results and meta description.
keywords: []                 # 5–8 terms a patient would actually type, Thai and English
publishedDate: YYYY-MM-DD
lastReviewed: YYYY-MM-DD     # Re-review at least every 24 months
author: 'sorawut'
reviewedBy: 'sorawut'
readingTime:                 # optional; computed if omitted
heroImage: './images/<slug>-hero.png'   # optional
heroImageAlt: ''             # REQUIRED whenever heroImage is set
redFlags: []                 # 3–5 items, each a complete sentence a layperson
                             # can recognise. Rendered as the warning box.
faq: []                      # 4–6 items of { q, a }; each answer ≤ 3 sentences
related: []                  # 2–3 slugs that exist in this locale
sources: []                  # { title, url } — real sources only, never invented
translationPending: false    # true on a Thai article with no English version yet
draft: true                  # flip to false only after the review pass
---
```

## Section order

Keep this order in every article. It is what makes pages comparable, and the
layout and structured data depend on it.

| # | Thai heading | English heading |
|---|---|---|
| 1 | `## โรคนี้คืออะไร` | `## What it is` |
| 2 | `## อาการ` | `## Symptoms` |
| 3 | `## สาเหตุและปัจจัยเสี่ยง` | `## Causes and risk factors` |
| 4 | `## เมื่อไหร่ควรไปพบแพทย์` | `## When to see a doctor` |
| 5 | `## แพทย์วินิจฉัยอย่างไร` | `## How it is diagnosed` |
| 6 | `## แนวทางการรักษา` | `## Treatment options` |
|   | `### การรักษาโดยไม่ผ่าตัด` | `### Non-surgical treatment` |
|   | `### การผ่าตัด` | `### Surgery` |
| 7 | `## การฟื้นตัวและการฟื้นฟู` | `## Recovery and rehabilitation` |
| 8 | `## การป้องกันและการดูแลตนเอง` | `## Prevention and self-care` |
| 9 | `## คำถามที่ควรถามแพทย์` | `## Questions to ask your doctor` |

FAQ and References are rendered automatically from frontmatter — do not write
them as body sections.

## Writing rules

- Audience: adults with no medical background, many over 50, reading on a phone.
  Thai reading level about มัธยมต้น, English about Grade 7.
- Short sentences. Short paragraphs — no more than about four lines on a phone.
  One idea per paragraph.
- Second person (`คุณ` / "you"), warm and calm.
- Explain each medical term in plain language the first time it appears, with the
  English term in parentheses once.
- **Never state a diagnosis.** Write "อาจเป็นสัญญาณของ…" / "this may be a sign
  of…" and defer to a doctor.
- No drug names with doses. Drug classes are acceptable with a "check with a
  doctor or pharmacist" note.
- No promotion of any clinic, product, brand or supplement.
- Be honest about uncertainty. Present non-surgical options first. Describe
  surgery in terms of what it aims to achieve, roughly how long recovery takes,
  and who it is usually considered for — no statistics you cannot source.
- Include safe self-care, and 2–4 simple exercises only where appropriate,
  written so the reader knows to stop if it hurts.

## Components

Every component below is registered globally on the article page, so MDX files
use them **without importing anything**. Registration lives in
`src/components/mdx/index.ts` — add a component there and document it here.

Two rules that apply to all of them:

- Leave a **blank line** between a component tag and the Markdown around it,
  otherwise MDX treats the following text as raw JSX and the build fails.
- Markdown inside a component works normally (`- ` lists, `**bold**`), as long
  as the content starts on its own line.

### `<KeyFacts>` — the summary box

Place it immediately after the frontmatter, before the first heading. Three to
five bullets, each one a complete thought a reader could take away on its own.

```mdx
<KeyFacts>
- ข้อเข่าเสื่อมเกิดจากกระดูกอ่อนผิวข้อค่อย ๆ บางลง ไม่ใช่โรคที่เกิดขึ้นทันทีทันใด
- คนส่วนใหญ่ควบคุมอาการได้ดีโดยไม่ต้องผ่าตัด
</KeyFacts>
```

The heading ("สรุปสั้น ๆ" / "Key facts") comes from `ui.ts` and the locale is
read from the URL, so you never pass either.

### `<RedFlags />` — the urgent-symptoms box

Put it inside the "When to see a doctor" section, after the opening sentence.
It renders the `redFlags` frontmatter, so the list is never written twice:

```mdx
## เมื่อไหร่ควรไปพบแพทย์

อาการปวดเข่าส่วนใหญ่ไม่ใช่เรื่องฉุกเฉิน แต่มีบางอาการที่ควรไปพบแพทย์ทันที

<RedFlags flags={frontmatter.redFlags} />
```

`frontmatter` is available in any MDX body — no import needed.

**If you leave `<RedFlags />` out**, the article page renders the box near the
top of the article instead. Safety content is never silently dropped because of
an editing slip. The consequence is that placing it *twice* would show it twice,
so place it once.

### `<Figure>` — an image with attribution

`alt` is required and the build fails without it. Describe what the figure
shows, not that it is a figure.

```mdx
<Figure
  src="/images/figures/knee-anatomy.svg"
  alt="แผนภาพข้อเข่า แสดงปลายกระดูกต้นขาและกระดูกหน้าแข้งที่มีกระดูกอ่อนผิวข้อคั่นอยู่"
  caption="กระดูกอ่อนผิวข้อคั่นอยู่ระหว่างปลายกระดูกทั้งสอง"
  attribution="Servier Medical Art"
  license="CC BY 4.0"
/>
```

`src` takes either a path under `public/` (as above) or an imported image, which
gets optimised and responsive `widths`:

```mdx
import kneeAnatomy from './images/knee-anatomy.png';

<Figure src={kneeAnatomy} alt="…" attribution="…" />
```

### `<Video>` — a demonstration clip, loaded only on request

For the short silent clips imported from the author's apps. Nothing downloads
until the reader presses play, so an article can carry ten of them and still
load fast.

```mdx
<Video
  src="/media/frozen-shoulder/wall-slide.mp4"
  title="ไถมือขึ้นผนัง"
  description="ผู้ป่วยยืนหันหน้าเข้าผนัง วางมือบนผนังแล้วค่อย ๆ ไถมือไต่ขึ้นไปจนสุดที่ไหว แล้วไถกลับลงมา"
  attribution="วิดีโอจากแอปดูแลข้อไหล่ติด โดย นพ.สรวุฒิ ธรรมยงค์กิจ · คลิปสร้างด้วยปัญญาประดิษฐ์"
/>
```

`src` is a path under `public/` — video cannot go through `astro:assets`.
`description` is **required**: a silent demonstration carries all of its meaning
in the picture, so a reader who cannot see it gets nothing without one. It is
also what shows under the clip when no `caption` is given.

None of the app clips ship a poster still, so the facade is a designed panel
rather than a frozen frame. Pass `poster` if a matching still exists.

### `<Callout>` — an aside worth stopping for

`type` is `info`, `warning` or `tip`. Use `warning` sparingly — it competes with
the red-flag box for the reader's alarm.

```mdx
<Callout type="tip" title="ปวดขึ้นเล็กน้อยหลังออกกำลังกาย ผิดปกติหรือไม่">
อาการปวดเพิ่มขึ้นเล็กน้อยและหายไปภายในหนึ่งวัน ถือว่ายอมรับได้
</Callout>
```

### `<Glossary>` — explain a term in place

The term stays in the sentence with a dotted underline; tapping or focusing it
reveals the definition inline. Keyboard- and touch-accessible.

```mdx
เรียกว่า <Glossary definition="ผิวเรียบลื่นที่หุ้มปลายกระดูกในข้อ ช่วยให้ข้อเคลื่อนไหวได้ลื่น">**กระดูกอ่อนผิวข้อ**</Glossary> (articular cartilage)
```

Use it for a term you mention once in passing. For a term the whole article
rests on, explain it in a sentence of body text instead — a reader should not
have to tap anything to follow the argument.

### `<DoctorChecklist>` — questions to take to an appointment

Renders as a printable checklist. The checkboxes are drawn in CSS and hidden
from screen readers; the list itself carries the meaning.

```mdx
## คำถามที่ควรถามแพทย์

<DoctorChecklist>
- อาการปวดเข่าของฉันน่าจะเกิดจากสาเหตุใด
- ฉันควรเริ่มออกกำลังกายแบบใด และควรทำบ่อยแค่ไหน
</DoctorChecklist>
```

### `<ExerciseCard>` — one exercise

```mdx
<ExerciseCard
  title="เหยียดเข่าตรงในท่านั่ง"
  sets="2 เซ็ต"
  reps="10 ครั้ง"
  hold="ค้างไว้ 5 วินาที"
  image="/images/exercises/seated-knee-extension.jpg"
  imageAlt="ผู้ป่วยนั่งบนเก้าอี้และเหยียดเข่าข้างหนึ่งให้ตรง"
>
นั่งหลังตรงบนเก้าอี้ เหยียดเข่าข้างหนึ่งขึ้นจนตรง ค้างไว้ แล้วค่อย ๆ ลดลง หากปวดมากขึ้นให้หยุด
</ExerciseCard>
```

`imageAlt` is required whenever `image` is set. A `youtube="<video id>"` prop is
also available: it renders a click-to-load facade, so nothing loads from Google
until the reader presses play. Add `poster="…"` for the still image.

Keep day-by-day rehab programmes in the companion apps and link to them — the
article is for someone who does not yet know what is wrong.

## Before you publish

1. Run the review pass (medical accuracy, no sentence that reads as a diagnosis,
   reading level, internal consistency, frontmatter completeness).
2. Set `lastReviewed` to today and `draft: false`.
3. `npm run build` must pass.
4. Commit as `content: add <slug> (th)`.
