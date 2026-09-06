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

Components are registered globally on the article page, so MDX files use them
without importing anything.

> Note: the component set below is being built. Until then, write plain Markdown
> headings and lists; the sample knee-osteoarthritis articles show the shape.

| Component | Purpose |
|---|---|
| `<KeyFacts>` | 3–5 bullet summary shown above the article body |
| `<RedFlags />` | Renders the `redFlags` frontmatter as the warning box. Place it inside "When to see a doctor". |
| `<Callout type="info \| warning \| tip" title="…">` | An aside that should not be missed |
| `<Figure src alt caption attribution />` | Image with caption and licence line. `alt` and `attribution` are mandatory. |
| `<ExerciseCard>` | An exercise with reps/sets and optional media |
| `<Glossary term="…">` | Inline term with an accessible definition |
| `<DoctorChecklist>` | Printable checklist of questions to ask |

## Before you publish

1. Run the review pass (medical accuracy, no sentence that reads as a diagnosis,
   reading level, internal consistency, frontmatter completeness).
2. Set `lastReviewed` to today and `draft: false`.
3. `npm run build` must pass.
4. Commit as `content: add <slug> (th)`.
