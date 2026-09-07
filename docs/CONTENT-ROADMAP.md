# Content roadmap

The twenty seed topics from the master plan (§33). Nineteen are conditions and
now exist as files; one is an imaging topic and has nowhere to live yet.

## What a seed file is

A seed is **structure, not medicine**. Each file carries a real slug, region,
summary, keywords and related links, plus the canonical section skeleton — and
nothing else. Every section body says `(ยังไม่ได้เขียน)`, and `redFlags`, `faq`
and `sources` are empty on purpose.

They are all `draft: true` and carry a `SEED` marker, so:

- they never appear in a production build;
- they are visible in `npm run dev`, so you can click through the structure;
- `npm run lint:content` **fails** if one is set to `draft: false` while the
  SEED marker is still there, because publishing it would assert that
  `reviewedBy: sorawut` had reviewed something nobody has written.

The summaries are placeholder-grade descriptions written to make the directory
navigable while you work. Treat them as drafts like everything else.

## Writing one

1. `npm run dev` and open the condition to see the skeleton.
2. Write the Thai body following `docs/ARTICLE_TEMPLATE.md`.
3. Fill `redFlags`, `faq` and `sources` in the frontmatter — real sources only.
4. Place `<RedFlags flags={frontmatter.redFlags} />` inside "เมื่อไหร่ควรไปพบแพทย์".
5. Delete the `SEED` comment, set `lastReviewed` to today, set `draft: false`.
6. `npm run lint:content && npm run build` must both pass.

`docs/SOURCES.md` says which of these your four existing apps already cover —
start with those, since the reviewed Thai wording is already yours.

## Conditions

| # | Topic | Slug | Region | Existing material |
|---|---|---|---|---|
| 1 | ปวดเข่า | `knee-pain` | knee | — |
| 2 | ข้อเข่าเสื่อม | `knee-osteoarthritis` | knee | Claude draft, needs your review |
| 3 | หมอนรองเข่าฉีก | `meniscus-tear` | knee | — |
| 4 | เอ็นไขว้หน้าฉีกขาด | `acl-injury` | knee | ACLR app — post-op only |
| 5 | หมอนรองเข่าฉีกที่ราก | `meniscus-root-tear` | knee | — |
| 6 | ปวดไหล่ | `shoulder-pain` | shoulder | — |
| 7 | ไหล่ติด | `frozen-shoulder` | shoulder | **Frozen-shoulder app — strong** |
| 8 | เอ็นหมุนไหล่ฉีกขาด | `rotator-cuff-tear` | shoulder | RC app — post-op only |
| 9 | ปวดคอ | `neck-pain` | neck | — |
| 10 | ปวดหลัง | `back-pain` | spine | — |
| 11 | ปวดร้าวลงขา | `sciatica` | spine | — |
| 12 | หมอนรองกระดูกทับเส้นประสาท | `herniated-disc` | spine | — |
| 13 | รองช้ำ | `plantar-fasciitis` | foot-ankle | — |
| 14 | เอ็นร้อยหวายอักเสบ | `achilles-tendinopathy` | foot-ankle | — |
| 15 | ข้อเท้าแพลง | `ankle-sprain` | foot-ankle | — |
| 16 | ข้อศอกเทนนิส | `tennis-elbow` | elbow | — |
| 17 | เส้นประสาทข้อมือถูกกดทับ | `carpal-tunnel-syndrome` | hand-wrist | — |
| 18 | นิ้วล็อก | `trigger-finger` | hand-wrist | — |
| 19 | ปวดเข่าด้านหน้า | `patellofemoral-pain` | knee | — |

Not in the plan's twenty but already covered by an app, and the deepest material
you have: **osteoporosis** (`bone-health`). Worth writing early for that reason.

## Not a condition

| # | Topic | Where it belongs |
|---|---|---|
| 20 | MRI เข่าดูอะไรบ้าง? | `/examinations` |

`/examinations` is currently a stub. It needs its own content collection —
an imaging topic has a different shape from a condition (what the scan shows,
what the report words mean, what it cannot tell you), so it should not be forced
into the conditions schema.

## Suggested order

Start where the reviewed Thai text already exists, so the first published
articles cost the least and read the most like you:

1. `frozen-shoulder` — the app has strong material on natural history and stages
2. `osteoporosis` — the deepest material of all four apps
3. `knee-osteoarthritis` — a Claude draft is already there to correct
4. `rotator-cuff-tear` and `acl-injury` — the apps cover recovery, so only the
   front half needs writing

Then the high-traffic symptom hubs: `knee-pain`, `back-pain`, `shoulder-pain`.

## Regions

`neck` was added to `src/data/regions.ts` for topic 9. `foot-ankle` remains one
region rather than the plan's separate ข้อเท้า and เท้า — รองช้ำ, เอ็นร้อยหวาย
and ข้อเท้าแพลง sit across that boundary, so splitting it would make assignment
arbitrary. Split it if you disagree; it is a one-line data change plus an icon.
