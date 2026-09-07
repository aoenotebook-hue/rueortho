# Content roadmap

The twenty seed topics from the master plan (§33). Nineteen are conditions and
now exist as files; one is an imaging topic and has nowhere to live yet.
**Osteoporosis has since been added as a twentieth condition**, because the
author's deepest existing material is on that topic.

## Status — all twenty condition files now carry a full draft

Every condition file has been written out: none is a bare `SEED` skeleton any
more. All twenty are still `draft: true` and carry a `SAMPLE` marker, so none
of them is published, and `npm run lint:content` still fails if one is flipped
to `draft: false` with the marker in place.

| Group | Files | Where the words came from |
|---|---|---|
| Built from the author's own apps | `frozen-shoulder`, `osteoporosis`, `rotator-cuff-tear`, `acl-injury` | Large parts are the author's own reviewed Thai, lifted from `_extracted/` and re-pronouned to `คุณ`. The connecting prose, and everything the apps do not cover (what the condition is, diagnosis, non-operative treatment) is new drafting. Media from the same apps is placed in these four. |
| Drafted from scratch | the other sixteen | Entirely new drafting. No media. |

**What still needs the author, on every one of the twenty:**

1. Read the whole article and correct the medicine.
2. Confirm or replace `redFlags` and `faq` — these were drafted, not reviewed.
3. Fill `sources` where it is still empty (see below), and confirm the ones
   that are there.
4. Confirm the `<Figure>` and `<Video>` attribution wording on the four
   app-derived articles — see `docs/IMAGE-SOURCES.md`.
5. Delete the `SAMPLE` marker and set `draft: false`, one article at a time.

### Sources

Seven articles carry verified references (each one was looked up in PubMed and
its title, journal and year confirmed before being written into the
frontmatter). Eight carry `sources: []` **on purpose**: this environment has no
outbound access to the usual patient-education sites, so a URL could not be
checked before writing it down, and an unverifiable citation on a page with a
named doctor's byline is worse than an empty field. Those eight say so in their
`SAMPLE` marker. `knee-osteoarthritis` keeps the two references it already had.

## What a `SAMPLE` marker means

These files began as `SEED` skeletons — real slug, region, summary and section
headings with every body section left as `(ยังไม่ได้เขียน)`. That stage is over:
every file now carries a full draft and a `SAMPLE` marker instead, which means
**Claude wrote it and no doctor has read it**.

The safety behaviour is the same as it was for `SEED`:

- they never appear in a production build, because `draft: true`;
- they are visible in `npm run dev`, so you can read them in place;
- `npm run lint:content` **fails** if one is set to `draft: false` while the
  `SAMPLE` marker is still there, because publishing it would assert that
  `reviewedBy: sorawut` had reviewed something he has not read.

The summaries, red flags and FAQ answers are drafts like everything else.

## Reviewing one

1. `npm run dev` and open the condition.
2. Read the body against `docs/ARTICLE_TEMPLATE.md` and correct the medicine.
3. Confirm `redFlags`, `faq` and `sources` in the frontmatter — real sources only.
4. Check that `<RedFlags flags={frontmatter.redFlags} />` sits inside
   "เมื่อไหร่ควรไปพบแพทย์".
5. Delete the `SAMPLE` comment, set `lastReviewed` to today, set `draft: false`.
6. `npm run lint:content && npm run build` must both pass.

`docs/SOURCES.md` says which of these your four existing apps already cover —
start with those, since the reviewed Thai wording is already yours.

## Conditions

| # | Topic | Slug | Region | Existing material |
|---|---|---|---|---|
| 1 | ปวดเข่า | `knee-pain` | knee | Claude draft, no sources |
| 2 | ข้อเข่าเสื่อม | `knee-osteoarthritis` | knee | Claude draft, needs your review |
| 3 | หมอนรองเข่าฉีก | `meniscus-tear` | knee | Claude draft, no sources |
| 4 | เอ็นไขว้หน้าฉีกขาด | `acl-injury` | knee | **written** — ACLR app text + new front half |
| 5 | หมอนรองเข่าฉีกที่ราก | `meniscus-root-tear` | knee | Claude draft, no sources |
| 6 | ปวดไหล่ | `shoulder-pain` | shoulder | Claude draft, 2 sources |
| 7 | ไหล่ติด | `frozen-shoulder` | shoulder | **written** — FS app text, 11 images, 10 clips |
| 8 | เอ็นหมุนไหล่ฉีกขาด | `rotator-cuff-tear` | shoulder | **written** — RC app text + new front half, 1 image, 10 clips |
| 9 | ปวดคอ | `neck-pain` | neck | Claude draft, 2 sources |
| 10 | ปวดหลัง | `back-pain` | spine | Claude draft, 1 source |
| 11 | ปวดร้าวลงขา | `sciatica` | spine | Claude draft, 1 source |
| 12 | หมอนรองกระดูกทับเส้นประสาท | `herniated-disc` | spine | Claude draft, 1 source |
| 13 | รองช้ำ | `plantar-fasciitis` | foot-ankle | Claude draft, 1 source |
| 14 | เอ็นร้อยหวายอักเสบ | `achilles-tendinopathy` | foot-ankle | Claude draft, 1 source |
| 15 | ข้อเท้าแพลง | `ankle-sprain` | foot-ankle | Claude draft, no sources |
| 16 | ข้อศอกเทนนิส | `tennis-elbow` | elbow | Claude draft, no sources |
| 17 | เส้นประสาทข้อมือถูกกดทับ | `carpal-tunnel-syndrome` | hand-wrist | Claude draft, no sources |
| 18 | นิ้วล็อก | `trigger-finger` | hand-wrist | Claude draft, no sources |
| 19 | ปวดเข่าด้านหน้า | `patellofemoral-pain` | knee | Claude draft, no sources |
| 20 | กระดูกพรุน | `osteoporosis` | bone-health | **written** — osteoporosis app text, 15 images |

Osteoporosis is not one of the plan's twenty, but it is the deepest material of
the four apps, so it was written as a full condition in region `bone-health`.
It is already referenced by `src/data/apps.ts`.

## Not a condition

| Plan # | Topic | Where it belongs |
|---|---|---|
| 20 | MRI เข่าดูอะไรบ้าง? | `/examinations` |

`/examinations` is currently a stub. It needs its own content collection —
an imaging topic has a different shape from a condition (what the scan shows,
what the report words mean, what it cannot tell you), so it should not be forced
into the conditions schema.

## Suggested review order

Everything is drafted now, so the question is which to review and publish
first. Start where the words are already largely yours — those need correcting
rather than rewriting:

1. `frozen-shoulder` — most of the body is your own app text
2. `osteoporosis` — likewise, and the deepest material of the four apps
3. `rotator-cuff-tear` and `acl-injury` — the recovery half is yours; the front
   half (what the condition is, diagnosis, non-operative care) is new drafting
   and needs the closest reading
4. `knee-osteoarthritis` — an older Claude draft

Then the high-traffic symptom hubs: `knee-pain`, `back-pain`, `shoulder-pain`,
`neck-pain`. These four are where most search traffic will land.

## Regions

`neck` was added to `src/data/regions.ts` for topic 9. `foot-ankle` remains one
region rather than the plan's separate ข้อเท้า and เท้า — รองช้ำ, เอ็นร้อยหวาย
and ข้อเท้าแพลง sit across that boundary, so splitting it would make assignment
arbitrary. Split it if you disagree; it is a one-line data change plus an icon.
