# Content roadmap

The twenty seed topics from the master plan (§33). Nineteen are conditions and
now exist as files; one is an imaging topic and has nowhere to live yet.
**Osteoporosis has since been added as a twentieth condition**, because the
author's deepest existing material is on that topic.

## Status — all forty articles are published

Every condition exists in Thai and English — forty files, twenty slugs — and
all of them went live on **2026-09-08**, after the author said he had read them.
No `SAMPLE` or `SEED` marker is left in `src/content/conditions/`; every file is
`draft: false` with `lastReviewed: 2026-09-08`.

| Group | Files | Where the words came from |
|---|---|---|
| Built from the author's own apps | `frozen-shoulder`, `osteoporosis`, `rotator-cuff-tear`, `acl-injury` | Large parts are the author's own reviewed Thai, lifted from `_extracted/` and re-pronouned to `คุณ`. The connecting prose, and everything the apps do not cover (what the condition is, diagnosis, non-operative treatment) is new drafting. Media from the same apps is placed in these four. |
| Drafted from scratch | the other sixteen | Entirely new drafting. No media. |

**Still outstanding, now that they are live:**

1. The `<Figure>` and `<Video>` attribution wording on the four app-derived
   articles is still a *proposal* — see `docs/IMAGE-SOURCES.md`. It is now
   public, so if the author wants different wording it is a search and replace
   over `src/content/conditions/` and a redeploy.
2. Articles are re-reviewed at least every 24 months: the next pass is due by
   **2028-09-08**.

### Sources

Every topic now carries at least one reference, and every one of them came out
of the PubMed tool — title, journal and year read back off the record before
being written into the frontmatter, and the `url` always a
`pubmed.ncbi.nlm.nih.gov` link. Twelve topics were sourced when they were
drafted. The eight that carried `sources: []` — ankle sprain, carpal tunnel,
knee pain, meniscus tear, meniscus root tear, patellofemoral pain, tennis
elbow, trigger finger — were filled the same way at publication, and are the
ones most worth a second look, since the references were chosen for the topic
rather than written alongside the prose.

This environment still has no outbound access to the usual patient-education
sites. Never write down a citation that cannot be checked: on a page with a
named doctor's byline an unverifiable citation is worse than an empty field.

## What a `SAMPLE` marker means

Nothing carries one at the moment, but the mechanism stays in place for anything
drafted from here on. A `SAMPLE` marker means **Claude wrote it and no doctor
has read it**; a `SEED` marker means a skeleton nobody has written yet. Either
one goes with `draft: true`, and then:

- it never appears in a production build;
- it is visible in `npm run dev`, and on a Vercel preview deployment, so it can
  be read in place;
- `npm run lint:content` **fails** if it is set to `draft: false` while the
  marker is still there, because publishing it would assert that
  `reviewedBy: sorawut` had reviewed something he has not read.

## Publishing a new article

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
| 1 | ปวดเข่า | `knee-pain` | knee | Claude draft; references added at publication |
| 2 | ข้อเข่าเสื่อม | `knee-osteoarthritis` | knee | Claude draft, 2 PubMed references |
| 3 | หมอนรองเข่าฉีก | `meniscus-tear` | knee | Claude draft; references added at publication |
| 4 | เอ็นไขว้หน้าฉีกขาด | `acl-injury` | knee | **written** — ACLR app text + new front half |
| 5 | หมอนรองเข่าฉีกที่ราก | `meniscus-root-tear` | knee | Claude draft; references added at publication |
| 6 | ปวดไหล่ | `shoulder-pain` | shoulder | Claude draft, 2 PubMed reference(s) |
| 7 | ไหล่ติด | `frozen-shoulder` | shoulder | **written** — FS app text, 11 images, 10 clips |
| 8 | เอ็นหมุนไหล่ฉีกขาด | `rotator-cuff-tear` | shoulder | **written** — RC app text + new front half, 1 image, 10 clips |
| 9 | ปวดคอ | `neck-pain` | neck | Claude draft, 2 PubMed reference(s) |
| 10 | ปวดหลัง | `back-pain` | spine | Claude draft, 1 PubMed reference(s) |
| 11 | ปวดร้าวลงขา | `sciatica` | spine | Claude draft, 1 PubMed reference(s) |
| 12 | หมอนรองกระดูกทับเส้นประสาท | `herniated-disc` | spine | Claude draft, 1 PubMed reference(s) |
| 13 | รองช้ำ | `plantar-fasciitis` | foot-ankle | Claude draft, 1 PubMed reference(s) |
| 14 | เอ็นร้อยหวายอักเสบ | `achilles-tendinopathy` | foot-ankle | Claude draft, 1 PubMed reference(s) |
| 15 | ข้อเท้าแพลง | `ankle-sprain` | foot-ankle | Claude draft; references added at publication |
| 16 | ข้อศอกเทนนิส | `tennis-elbow` | elbow | Claude draft; references added at publication |
| 17 | เส้นประสาทข้อมือถูกกดทับ | `carpal-tunnel-syndrome` | hand-wrist | Claude draft; references added at publication |
| 18 | นิ้วล็อก | `trigger-finger` | hand-wrist | Claude draft; references added at publication |
| 19 | ปวดเข่าด้านหน้า | `patellofemoral-pain` | knee | Claude draft; references added at publication |
| 20 | กระดูกพรุน | `osteoporosis` | bone-health | **written** — osteoporosis app text, 15 images |

Osteoporosis is not one of the plan's twenty, but it is the deepest material of
the four apps, so it was written as a full condition in region `bone-health`.
It is already referenced by `src/data/apps.ts`.

## Not a condition — now its own section

| Plan # | Topic | Where it went |
|---|---|---|
| 20 | MRI เข่าดูอะไรบ้าง? | `examinations/{th,en}/knee-mri.mdx` |

`/examinations` now has its own content collection, so the imaging topic no
longer has to be forced into the conditions schema.

## Examinations — 6 topics, drafted 2026-09-08

All **`SAMPLE` + `draft: true`**, awaiting the author's reading.

| Topic | Slug | Notes |
|---|---|---|
| เอกซเรย์กระดูกและข้อ | `xray` | what it can and cannot show; film/pain discordance |
| เอ็มอาร์ไอ (MRI) คืออะไร | `mri` | includes the asymptomatic-findings problem |
| MRI เข่า ดูอะไรได้บ้าง | `knee-mri` | the master plan's topic 20 |
| อัลตราซาวด์กระดูกและข้อ | `ultrasound` | strengths, and operator dependence |
| การตรวจความหนาแน่นกระดูก (DXA) | `bone-density-scan` | T-score vs Z-score |
| การตรวจการนำไฟฟ้าของเส้นประสาท | `nerve-conduction-study` | NCS and EMG |

## Rehabilitation — 5 topics, drafted 2026-09-08

All **`SAMPLE` + `draft: true`**, awaiting the author's reading.

| Topic | Slug | Region |
|---|---|---|
| หลักการฟื้นฟูที่ใช้ได้กับเกือบทุกอาการ | `rehab-principles` | *(none — general)* |
| การฟื้นฟูข้อไหล่ | `shoulder-rehab` | shoulder |
| การฟื้นฟูข้อเข่า | `knee-rehab` | knee |
| การฝึกการทรงตัวและการป้องกันการล้ม | `balance-and-fall-prevention` | bone-health |
| การฟื้นฟูอาการปวดหลัง | `back-rehab` | spine |

Every one of the 22 files carries PubMed-verified references, found and checked
the same way as the conditions: title, journal and year read back off the
PubMed record before being written down.

**These are the ones that most need the author's eye.** They were drafted from
the evidence rather than from his own teaching material, so unlike the four
app-derived condition articles there is no reviewed Thai underneath them.

## Suggested order for the next read-through

Everything is live now. If the articles get another pass, the ones whose words
are largely the author's own need correcting rather than rewriting, and the
four app-derived ones also carry the attribution wording that is still a
proposal:

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
