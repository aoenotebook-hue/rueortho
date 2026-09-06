# SOURCES — existing patient content in the four PWAs

What already exists in the four apps at `_sources/`, where it lives, and how to reach
it when writing an article for รู้เรื่องกระดูกและข้อ / Easyortho.

Every string in those four apps has been extracted to `_extracted/`, one JSON file per
repo, as records of `{ key, th, en, uiContext, class }`. The Thai is byte-exact —
never re-translated, never tidied. When an article needs a sentence about one of these
topics, take his sentence from the JSON rather than writing a new one.

| Extract file | Records | education | instruction | warning | ui | dynamic |
|---|--:|--:|--:|--:|--:|--:|
| `_extracted/Osteoporosis-care.json` | 569 | 61 | 79 | 21 | 401 | 7 |
| `_extracted/Postoperative-care-ACLR.json` | 496 | 24 | 157 | 10 | 305 | 0 |
| `_extracted/Frozen-shoulder-care.json` | 394 | 29 | 101 | 3 | 255 | 6 |
| `_extracted/Postoperative-care-RC.json` | 221 | 11 | 69 | 9 | 132 | 0 |
| **Total** | **1,680** | **125** | **406** | **43** | **1,093** | **13** |

`class` means: `education` explains the condition, its causes, treatment or prevention
and is reusable in an article; `instruction` is how to do an exercise or take a
medicine; `warning` is a red flag or an urgent-contact line; `ui` is a button, label or
nav item and is not reusable; `dynamic` carries a `{n}`-style placeholder or comes out
of a resolver.

`key` is the app's own dictionary key wherever the app has one (`boneStatusOsteopenia_desc`,
`phaseDesc.2`, `MED_CLASSES.denosumab.doNotStop`). For the three HTML apps the key is
the dotted path inside their `CONTENT` object, so `care.7.items.0` in the RC extract is
`CONTENT.th.care[7].items[0]` in `Postoperative-care-RC/index.html`.

**Licence.** All four repos carry Apache-2.0 and are the surgeon's own work, so the
text can be reused without restriction. The media needs a look before it goes public —
see the media table and the flag at the end of it.

---

## 1. Conditions with existing material

### osteoporosis — the deepest source by a distance

**Repo:** `_sources/Osteoporosis-care/` · **Extract:** `_extracted/Osteoporosis-care.json`
**Where the text lives:** `app-core.js` lines 13–438 (`CONTENT`), 441–473 (`LISTS`),
652–719 (`MED_CLASSES`), 781–860 (food tables), 908–1011 (`EXERCISE_LIST`),
1041–1066 (`SAFETY_ITEMS`). Two more patient strings are hard-coded in `index.html`
(lines 1354 and 1526) and are in the extract under keys prefixed `index.html.`.

This is a whole article series already written, not raw material.

| Article you could write | Keys to start from | uiContext |
|---|---|---|
| What osteoporosis is | `boneWhatIsBody`, `learnTScoreBody`, `learnExpectBody` | Learn |
| Reading your DXA / T-score | `learnTScoreBody`, `bmdIntro`, `bmdThresholdOsteoporosis`, `boneStatusBasis` | Learn, Track |
| Who should be screened | `learnScreeningBody` + `LISTS.learnScreening.0`–`.6` (7 bullets) | Learn |
| Normal / thinning / osteoporosis / severe — what each means | `boneStatus*_name` and `boneStatus*_desc` (5 pairs) | Home — assessment result |
| Calcium in Thai food | `foodCalciumKnowledgeBody`, `LISTS.foodCalcium.0`–`.5`, plus the `CALCIUM_FOODS.*` table (10 foods with mg per serving) | Food |
| Vitamin D and sunlight | `foodVitDKnowledgeBody`, `LISTS.foodVitD.0`–`.4`, `VITAMIN_D_FOODS.*` | Food |
| What to cut down | `foodAvoidBody`, `LISTS.foodAvoid.0`–`.4` (salt, coffee, alcohol, fizzy drinks, cigarettes — each with the reason) | Food |
| Osteoporosis medicines | `MED_CLASSES.<id>.whatItDoes / .instructions / .missedDose / .sideEffects / .tellDoctor` for `bisphosphonate_weekly`, `denosumab`, `zoledronate`, `teriparatide`, `romosozumab` | Medicine |
| Why you must not stop denosumab | `MED_CLASSES.denosumab.doNotStop`, `learnMedMattersBody`, `drugDoNotStop` | Medicine |
| Dental care on bone medicine | `index.html.drugDentalNoteBody`, `drugDentalNote` | Medicine |
| Exercise for thin bone | `moveIntro`, `moveNeverDoBody`, and 17 exercises at `EXERCISE_LIST.<id>.name/.amount/.howTo` | Move |
| Red flags | `alertBackPain(+Action)`, `alertHipPain(+Action)`, `alertHeadInjury(+Action)`, `alertNeuro(+Action)` | Urgent |
| Height loss and spinal fracture | `heightLossWarning`, `heightEvery6Months`, `alertBackPainAction` | Track, Urgent |
| 10-year fracture risk / FRAX | `fraxIntro`, `fraxEstimateCaution`, `fraxBaselineCaveat`, and section 4 below | Home — FRAX |

The 17 exercises are also directly reusable as an exercise library on the new site:
7 balance, 5 strength, 5 posture-and-spine, each tagged with the balance
levels it suits (`levels`), the equipment it needs (`requires`) and, for the seated band
row, a contraindication (`avoidIf: ['vertebralFracture']`).

### frozen-shoulder

**Repo:** `_sources/Frozen-shoulder-care/` · **Extract:** `_extracted/Frozen-shoulder-care.json`
**Where the text lives:** `index.html` lines 699–1322, `const CONTENT = { en: {…}, th: {…} }`.

The strongest asset here is the four-stage natural history, written four ways over:
headline, plain description, "what is happening", and "what you may notice".

| Article | Keys |
|---|---|
| The four stages of frozen shoulder | `stagesCardIntro`, `phaseTitles.0`–`.3`, `phaseMonths.0`–`.3`, `phaseHeadline.0`–`.3`, `phaseDesc.0`–`.3`, `phaseWhat.0`–`.3`, `phaseSymptoms.0`–`.3`, `stagesCardOutcome` |
| Why stages are not a timetable | `roadmapNote`, `phaseTimingNote` |
| What to work on at each stage | `goalsByPhase.0.0`–`.3.3` (16 goals), `todayReminders.0.0`–`.3.3` (16 reminders) |
| Exercises by stage | `exercises.0.*`–`exercises.3.*` — 18 exercises, each with `.name`, `.dose`, `.desc` and a one-line `.cue` |
| How hard a stretch should feel | `zoneTitle`, `zones.0`–`.2` (green / yellow / red) and `exCaution` |
| Sleeping with a frozen shoulder | `sleepIntro`, `sleep.0.desc`–`sleep.4.desc` (4 positions plus one "do not") |
| Everyday self-care | `selfcare.0.desc`–`.3.desc` (ice or heat, keep moving, dressing, showering) |
| When it is not frozen shoulder | `sosInfoNote`, `flagsHard.0`–`.2` |
| What your doctor might add | `escalateIntro`, `escalate.0`–`.2` (intra-articular injection, injection plus physio, non-steroid options), `escalateNoDose` |
| Recovery expectations | `recoveredDesc`, `stagesCardOutcome` |

The `.cue` lines are the most quotable writing in any of the four apps — one sentence
each, e.g. `exercises.0.p1_1.cue`: *"ถ้ารู้สึกว่าไหล่ต้องออกแรง แสดงว่าแกว่งกว้างเกินไป"*.

### rotator-cuff-tear (post-operative only)

**Repo:** `_sources/Postoperative-care-RC/` · **Extract:** `_extracted/Postoperative-care-RC.json`
**Where the text lives:** `index.html` lines 504–955.

Everything here is about **after a repair**, not about the tear itself. There is no
Thai text anywhere in these repos explaining what a rotator cuff tear is, how it
happens, or how it is diagnosed and treated non-operatively — that has to be written
new. What exists is a complete post-op guide.

| Article | Keys |
|---|---|
| The five phases after a repair | `phaseTitles.0`–`.4`, `phaseWeeks.0`–`.4`, `phaseDesc.0`–`.4` |
| How a repaired tendon heals | `care.7.items.0`–`.4` (tendon-to-bone healing takes time; why the early restrictions are strict) |
| What to do in each phase | `todayReminders.0.0`–`.4.3` (20 reminders), `exerciseCaution.0`–`.4` |
| Post-op exercises | `exercises.0.*`–`exercises.4.*` — 15 exercises across pre-op and phases 1–5 |
| Before your surgery | `care.0.items.*` |
| Dressing with a sling | `care.1.items.*` |
| Wound and incision care | `care.2.items.*`, `care.3.items.*` |
| Pain and swelling | `care.4.items.*` |
| Sling care | `care.5.items.*` |
| Activity precautions | `care.6.items.*` |
| Sleeping after shoulder surgery | `sleep.0.desc`–`.3.desc` |
| What is normal, what is not | `normalNote`, `emergencyFlags.0`–`.6`, `emergencyNote` |
| First follow-up visit | `care.8.items.0` |

### acl-injury (post-operative, plus rehab science)

**Repo:** `_sources/Postoperative-care-ACLR/` · **Extract:** `_extracted/Postoperative-care-ACLR.json`
**Where the text lives:** `index.html` lines 607–1434.

The richest of the three HTML apps: 496 strings, seven phases, 51 exercises, 13 care
sections and a criteria-driven return-to-sport model. Like the RC app it is
post-operative — there is nothing on how an ACL tears, on the Lachman/pivot-shift exam,
or on choosing surgery versus rehabilitation.

| Article | Keys |
|---|---|
| How a graft heals (ligamentisation) | `healingItems.0`–`.4` — the single best piece of explanatory writing in these four repos |
| The seven phases | `phaseTitles.0`–`.6`, `phaseWeeks.0`–`.6`, `phaseDesc.0`–`.6`, `goals.0.*`–`.6.*` |
| Getting the knee fully straight | `care.1.items.*`, `crit.ext`, `metricHints.extDeficit` |
| Crutches and weight bearing | `care.2.items.*`, `wbValues.*`, `restrictWB` |
| The brace | `care.3.items.*`, `restrictBrace`, `braceValue` |
| Swelling and ice | `care.4.items.*` |
| Wound care, showering | `care.5.items.*`, `care.6.items.*` |
| Positioning and sleep | `care.7.items.*` |
| Blood clot prevention | `care.8.items.0` |
| Driving and activity | `care.9.items.*` |
| Smoking and graft healing | `care.10.items.0` |
| If a meniscus was repaired too | `care.11.items.*` (the app also carries meniscus-repair restriction presets — see `MENISCUS_PRESETS`, `index.html` line 1467) |
| Follow-up visits | `care.12.items.*` |
| When can I run again? | `runGateTitle`, `runGateSub`, `crit.ext`, `crit.flex`, `crit.quad80`, `crit.ham80`, `crit.noRestrict`, `crit.week12` |
| When can I go back to sport? | `rtsGateTitle`, `rtsGateSub`, `crit.quad90`, `crit.ham90`, `crit.hop90`, `crit.month9`, `crit.runCleared` |
| Why some things are still locked | `lockReason.fwb / .flex / .flex110 / .ham / .kneel / .okc / .pivot / .run` — eight short explanations of a restriction, all reusable |
| Measuring your own progress | `metricHints.*` (5), `metrics.*` (8), `metricUnits.*` |
| Red flags after ACL surgery | `emergencyFlags.0`–`.6`, `emergencyLabel`, `normalNote` |
| Exercises | `exercises.0.*`–`exercises.6.*` — 51 exercises, several carrying a `.req` line saying which restriction gates them |

---

## 2. Gaps — MVP conditions with no existing material

Nothing in any of the four repos covers these. Every word will be new writing. The
voice notes in section 6 are the guide for making new Thai match the existing Thai.

| Slug | Nearest existing material to lean on |
|---|---|
| `shoulder-impingement` | Frozen-shoulder exercise vocabulary and stage structure; RC `exercises.2.*` (active-assisted motion) for the movement names |
| `shoulder-dislocation` | RC sling and activity-precaution wording (`care.5.*`, `care.6.*`); FS red-flag phrasing |
| `calcific-tendinitis` | FS pain-control writing (`todayReminders.1.*`) and `escalate.*` (injection wording) |
| `knee-osteoarthritis` | ACLR knee vocabulary (`crit.*`, `metricHints.*`); osteoporosis exercise-dosing and balance wording |
| `meniscus-tear` | ACLR `care.11.items.*` (meniscus-repair restrictions) and `MENISCUS_PRESETS` in `index.html` line 1467 — the only meniscus content that exists, and it is post-repair only |
| `patellofemoral-pain` | Nothing. ACLR quadriceps and single-leg-control wording is the closest vocabulary |
| `patellar-tendinopathy` | Nothing. ACLR load-progression wording (`exerciseCaution.3`–`.5`) is the closest model |

Two of the five shoulder conditions and four of the five knee conditions are therefore
green-field. Osteoporosis, frozen shoulder and the two post-op topics are the only
places where his own words already exist.

---

## 3. Beyond MVP — material that fits no MVP condition

Good content already written that has nowhere to go in the eleven MVP articles. Each
would make a standalone article or a cross-cutting hub.

| Future topic | Source | Notes |
|---|---|---|
| **Fall prevention in older adults** | Osteoporosis extract, `uiContext` = `Safety — …` | 20 home-hazard checklist items across five rooms (`SAFETY_ITEMS.*`), plus `footwearBody`, `visionBody`, `fallRiskMedsBody`, `gettingUpBody`. A complete article on its own, and arguably a better standalone piece than a section inside the osteoporosis article |
| **How to get up after a fall** | `gettingUpTitle`, `gettingUpBody` | One paragraph, complete, immediately publishable |
| **Bone-health nutrition for Thai kitchens** | `LISTS.foodCalcium.*`, `LISTS.foodVitD.*`, `LISTS.foodAvoid.*`, `CALCIUM_FOODS.*`, `VITAMIN_D_FOODS.*`, `PROTEIN_FOODS.*` | Calcium, vitamin D and protein tables built around Thai foods (ปลาเล็กปลาน้อย, กุ้งแห้ง, คะน้า, ตำลึง, ใบยอ, งาดำ) with mg/IU/g per serving. Nothing else on the web does this in Thai with these numbers |
| **Protein and muscle in later life** | `PROTEIN_FOODS.*`, `nutritionProteinIdea`, `proteinTargetG` logic | 1.0 g/kg under 65, 1.2 g/kg at 65+ |
| **Testing your own strength and balance at home** | `chairStandInstructions`, `chairStandNormLabel`, `tugInstructions`, `selfTestSafety`, plus the norm tables in section 4 | 30-second chair stand and TUG with the full age/sex norm table |
| **Post-op wound care** | RC `care.2.*`, `care.3.*`; ACLR `care.5.*`, `care.6.*` | Two independent versions of the same advice; merge into one shoulder-and-knee wound-care article |
| **Sleeping after shoulder surgery / with shoulder pain** | RC `sleep.*`, FS `sleep.*` | Two sets, four positions each, largely complementary |
| **Preventing blood clots after leg surgery** | ACLR `care.8.items.0`, `emergencyFlags.0`, `emergencyFlags.1` | Calf pain and chest symptoms — thin, would need expanding |
| **Smoking, nicotine and healing** | ACLR `care.10.items.0`, `LISTS.foodAvoid.4` | Two sentences from two apps, same message |
| **Understanding tissue healing** | RC `care.7.items.*` (tendon-to-bone), ACLR `healingItems.*` (graft ligamentisation) | A "why your surgeon says wait" article covering both |
| **Return-to-sport testing (LSI, hop tests)** | ACLR `crit.*`, `metrics.*`, `metricHints.*` | Applies well beyond ACL |
| **PDPA and health apps / what we do with your data** | `pdpaBody` (osteo), `consentText` and `privacyPoints.*` (FS), `privacy.*` (RC) | Three versions of a Thai PDPA notice written for patients — reusable as the site's own privacy page |

---

## 4. Clinical logic — the reasoning already committed to code

All of this is in `_sources/Osteoporosis-care/app-core.js`. It is decision-making the
surgeon has already made and defended in comments; it belongs in prose in the articles
rather than staying buried in JavaScript.

### Bone status — `resolveBoneStatus()` (line 545)

Bone status is treated as a **diagnosis**, so it rests on two things only: the bone
density reading and the fracture history. Age, steroids and falls raise the *risk* of a
fracture but never by themselves create the label. A T-score of −1.0 or above is
normal; between −1.0 and −2.5 is thinning bone; −2.5 or below is osteoporosis. Any
fragility fracture makes it osteoporosis whatever the scan says, and a fragility
fracture of the **hip or spine** counts as severe osteoporosis even when the density
reading looks reassuring — that patient's chance of a second fracture is high enough
that the scan number stops being the deciding fact. When a DXA result is recorded the
app takes the **lowest** T-score of the sites measured (`lowestTScore()`, line 1283),
which is how a DXA report is read, and updates the diagnosis from it.

### Chance of falling — `resolveFallRisk()` (line 568)

Graded on the STEADI pattern: screen on falls, unsteadiness and worry about falling,
then grade on how many falls, whether one caused injury, and an objective walking time.
**High** risk means two or more falls in the past year, *or* any fall that caused an
injury, *or* a Timed Up and Go of 12 seconds or more. **Moderate** means one uninjured
fall, or feeling unsteady, or being afraid of falling, or using a walking aid.
Otherwise **low**. Each grade carries its own management line on the Home tab
(`fallRiskLow_action`, `fallRiskModerate_action`, `fallRiskHigh_action`) — low risk gets
balance work three days a week and a yearly home check; high risk gets a formal gait and
balance assessment, a review of sedating medicines, and the home hazards fixed soon
rather than eventually.

### Balance level — `resolveBalanceLevel()` and `canAdvanceBalanceLevel()` (lines 629–650)

Exercises are prescribed at one of three levels — always holding on, light fingertip
support, or independent. The starting level comes from the fall-risk grade: high risk or
a walking aid starts at level 1, everyone else at level 2. It **drops one level
automatically after any fall in the last four weeks**, and it rises only when *every*
one of five conditions is met: no fall in four weeks; the 30-second chair stand meets
the age-and-sex norm; the TUG is under 12 seconds; both test results are less than 90
days old; and the patient has been at the current level for at least 28 days. Progress
is deliberately slow to earn and quick to lose.

### 30-second chair stand — `chairStandNorm()` (line 609)

The patient sits mid-chair with arms crossed and stands fully and sits again as many
times as possible in 30 seconds. The pass mark is the published age-and-sex norm:

| Age | Men | Women |
|---|--:|--:|
| 60–64 | 14 | 12 |
| 65–69 | 12 | 11 |
| 70–74 | 12 | 10 |
| 75–79 | 11 | 10 |
| 80–84 | 10 | 9 |
| 85–89 | 8 | 8 |
| 90+ | 7 | 4 |

Below the norm the app says so plainly and prescribes more sit-to-stand practice rather
than sending the patient anywhere.

### Timed Up and Go — `meetsTUG()` (line 622)

Stand from a chair, walk 3 metres, turn, walk back, sit; timed from standing to sitting.
**12 seconds is the cut-off.** At or above it the patient is graded high fall risk
regardless of their falls history, and the app tells them to mention it to their doctor.
Both self-tests carry a standing safety instruction — have someone with you, chair
against a wall, stop at once if dizzy — and are offered to every patient rather than
restricted to supervised settings.

### Height loss — `checkHeightLoss()` (line 1090)

Height is measured every six months. A loss of **2 cm or more** from baseline is
flagged, and the patient is told to tell their doctor because a vertebral body may have
collapsed. The same 2 cm threshold appears in the DXA screening list.

### Calcium — `estimateDailyCalciumMg()`, `calciumTargetMg()`, `recommendCalciumSupplement()` (lines 794–820)

A yearly food-frequency questionnaire over ten calcium-rich Thai foods gives servings
per week; these are converted to mg per day and **200 mg is added as an assumed
background diet**. The target is 1,200 mg/day for women aged 50+ and men aged 70+, and
1,000 mg/day otherwise. The shortfall is rounded **down** to the nearest common tablet
size (0, 500, 600, 1,000 or 1,200 mg of elemental calcium), except that any shortfall at
all triggers at least 500 mg. Rounding down is the conservative direction, and the
result is always shown as an estimate to confirm with the doctor. The patient advice
adds one thing the calculator does not: the body absorbs only about 500 mg at a time, so
little and often beats one large dose.

### Vitamin D — `estimateDailyVitaminDIu()`, `recommendVitaminD()` (lines 833–852)

Diet is estimated the same way from four foods, but the recommendation is driven mainly
by **sunlight**: fewer than 60 minutes a week of sun on the arms or legs without
sunscreen counts as low sun and raises the suggested supplement from 800 IU/day to
1,000 IU/day. The patient advice specifies gentle sun — 10 to 15 minutes on the arms or
legs, two or three times a week, before 9 a.m. or after 4 p.m. — which is Thai-specific
and worth keeping verbatim.

### Protein — `proteinTargetG()`, `recommendProtein()` (lines 874–891)

A 15 g/day background diet plus servings from five protein foods. The target is
**1.2 g per kg of body weight at 65 and over, 1.0 g/kg below that**. Any shortfall is
also expressed in eggs per day, because a gram figure means nothing to most patients.

### Medication scheduling — `computeNextDue()`, `doseReminderState()` (lines 728–755)

Each medicine class carries its own cadence: weekly oral bisphosphonate, six-monthly
denosumab, yearly zoledronate, daily teriparatide, monthly romosozumab as a fixed
12-dose course. Reminders start **7 days before** the next dose, once a day, and a
calendar file is offered with an alarm a week ahead and another on the day. Denosumab is
flagged `doNotDelay`, and romosozumab is the only one with a course total, so the app
can tell the patient at dose 12 that the course is finished and another medicine must
follow to hold the gain.

### Home safety score — `computeSafetyScore()` (line 1068)

Twenty home-hazard items across bedroom, bathroom, stairs, kitchen and outdoors, each
carrying a priority from 2 to 5. The score is simply the number ticked out of 20, but
the useful output is the **three highest-priority unticked items**, surfaced as "fix
these three first" — grab bars, a non-slip mat and a stair handrail all carry priority 5.
Re-audit is prompted every 182 days.

### FRAX — `estimateFractureRisk()` and the comment at line 1297

**FRAX itself is not computed anywhere in this repo, and cannot be**: its coefficients
are licensed and unpublished. The app therefore works in two modes that it never mixes.
When the doctor has run the official calculator (`frax.shef.ac.uk`, country 57 =
Thailand) the two percentages are recorded, dated, and shown as the official result.
When no official result exists, the app shows **its own estimate**, always under an
amber banner reading "the app's own estimate — not an official FRAX result", always as a
range rather than a single figure, and always with a panel showing every step of the
arithmetic.

The estimate is a population baseline for the patient's age and sex, multiplied by a
relative risk for each factor present (previous fragility fracture, parental hip
fracture, current smoking, regular steroids, rheumatoid arthritis, secondary
osteoporosis, three or more drinks a day, BMI under 20, and the femoral neck T-score).
The multipliers are the pooled relative risks from the meta-analyses behind FRAX (Kanis
et al.) and the per-standard-deviation gradient of risk for bone density (Marshall et
al.).

Three corrections are applied, and the reasoning is article material in itself:

1. **A published relative risk compares people with a factor against people without
   it**, so applying it whole to a population average — which already contains people
   with the factor — counts the risk twice. Each is rescaled as `rr / (1 + prevalence ×
   (rr − 1))`, so a factor of average prevalence multiplies by roughly its excess over
   the average rather than its full published figure.
2. **A T-score is measured against a young adult, not against the patient's own age
   group.** A 75-year-old with a T-score of −1.9 is typical for her age, so she gets no
   bone-density multiplier at all; a better-than-average scan lowers the estimate.
3. **Risk factors overlap** — someone with a previous fracture is also more likely to
   have thin bone — so the combined multiplier is raised to the power 0.75. One factor
   is left almost untouched; stacked factors are pulled back towards the published FRAX
   range.

Without these corrections the naive model reads two to three times above FRAX. With
them, `tests/t13_frax_medication.js` checks the output against published FRAX ranges for
three reference profiles. Two caveats stated in the code and worth repeating in any
article: the age/sex baselines are approximate figures for an Asian population and need
Thai epidemiology before real use, and the model has no competing-mortality or
dose-response terms, which is why the caps and the range exist.

---

## 5. Media

All the media, with what it illustrates. Sizes are as-shipped; **every image needs
converting to WebP/AVIF and resizing before it goes near a web page** — the osteoporosis
images alone are 45 MB for 31 files, several of them 2 MB apiece at 2400 px. **Every
video needs a poster image and click-to-load**; none of them should be an autoplaying or
preloading `<video>` on an article page.

Sizes: images are quoted at their real pixel dimensions and true format (note that
ten files in `Frozen-shoulder-care/media/` are named `.jpg` but are actually PNG,
which is part of why they are so large).

### Osteoporosis-care — `media/exercises/` (17 files, exercise demonstrations)

| File | Format | Dimensions | Size | Illustrates |
|---|---|---|---|---|
| `sit_to_stand_hold.jpg` | JPEG | 896×1200 | 447 KB | Sit-to-stand with support (balance, L1–3) — **wired into the app** |
| `standing_marching.jpg` | JPEG | 896×1200 | 400 KB | Standing marching (balance, L1–3) — **wired into the app** |
| `weight_shifts.jpg` | JPEG | 896×1200 | 349 KB | Side-to-side weight shifts (balance, L1–3) — **wired into the app** |
| `single_leg_stand_chair.jpg` | JPEG | 896×1200 | 410 KB | Single-leg stance (balance, L2–3) |
| `tandem_stand.jpg` | JPEG | 896×1200 | 368 KB | Heel-to-toe stand (balance, L2–3) |
| `tandem_walk.jpg` | JPEG | 896×1200 | 417 KB | Heel-to-toe walking (balance, L3) |
| `backward_walk.jpg` | JPEG | 896×1200 | 432 KB | Backward walking (balance, L3) |
| `sit_to_stand.jpg` | JPEG | 1792×2400 | 1.9 MB | Sit-to-stand (strength, L1–3) |
| `heel_raises.jpg` | JPEG | 1792×2400 | 1.9 MB | Heel raises (strength, L1–3) |
| `wall_pushups.jpg` | JPEG | 1792×2400 | 1.9 MB | Wall push-ups (strength, L1–3) |
| `hip_abduction.jpg` | JPEG | 1792×2400 | 1.9 MB | Standing hip abduction (strength, L1–3) |
| `step_up.jpg` | JPEG | 1792×2400 | 1.9 MB | Step-ups (strength, L2–3) — **filename mismatch**, the exercise id is `step_ups` |
| `hip_hinge.jpg` | JPEG | 1792×2400 | 1.8 MB | Hip hinge — bend at the hips not the back (posture, L1–3) |
| `chin_tuck.jpg` | JPEG | 2048×2048 | 1.6 MB | Chin tuck (posture, L1–3) |
| `scapular_squeeze.jpg` | JPEG | 2048×2048 | 1.5 MB | Shoulder blade squeeze (posture, L1–3) |
| `Picking things up safely.jpg` | JPEG | 896×1200 | 445 KB | Safe pick-up from the floor (posture, L1–3) — **filename mismatch and spaces**, the exercise id is `safe_pickup` |
| `seated_row_band.jpg` | JPEG | 896×1200 | 475 KB | Seated band row (posture, L2–3) |

Only three of the seventeen are listed in `MEDIA_MANIFEST` (`app-core.js` line 1018), so
only three currently display in the app. All seventeen are usable on the website.

### Osteoporosis-care — `media/selfcare/` (14 files, not yet wired to any tab)

| File | Format | Dimensions | Size | Illustrates |
|---|---|---|---|---|
| `med_bisphosphonate_weekly.jpg` | JPEG | 2400×1792 | 2.0 MB | Taking a weekly oral bisphosphonate correctly (upright, plain water) |
| `med_denosumab.jpg` | JPEG | 2400×1792 | 2.0 MB | Denosumab subcutaneous injection at hospital |
| `med_zoledronate.jpg` | JPEG | 2400×1792 | 2.0 MB | Zoledronate infusion |
| `med_teriparatide.jpg` | JPEG | 2400×1792 | 1.9 MB | Teriparatide pen, self-injection |
| `med_romosozumab.jpg` | JPEG | 2400×1792 | 2.0 MB | Romosozumab injection |
| `food_calcium.jpg` | JPEG | 2400×1792 | 2.4 MB | Calcium-rich Thai foods |
| `food_vitamin_d.jpg` | JPEG | 2400×1792 | 2.3 MB | Vitamin D sources |
| `safety_bedroom.jpg` | JPEG | 2400×1792 | 1.9 MB | Bedroom fall hazards |
| `safety_bathroom.jpg` | JPEG | 2400×1792 | 1.8 MB | Bathroom grab bars and non-slip mat |
| `safety_kitchen.jpg` | JPEG | 2400×1792 | 1.3 MB | Kitchen reach and spill hazards |
| `safety_stairs.jpg` | JPEG | 1792×2400 | 1.7 MB | Stair handrail, step-edge marking, lighting |
| `safety_outdoors.jpg` | JPEG | 2400×1792 | 1.9 MB | Entrance and outdoor hazards |
| `test_chair_stand.jpg` | JPEG | 1792×2400 | 2.0 MB | 30-second chair stand test |
| `test_tug.jpg` | JPEG | 2400×1792 | 2.0 MB | Timed Up and Go test |

### Frozen-shoulder-care — `media/` (22 of an expected 52 files)

| File | Format | Dimensions / duration | Size | Illustrates |
|---|---|---|---|---|
| `fs-01-pendulum.jpg` | **PNG** | 976×1098 | 1.1 MB | Pendulum swing (stage 1) |
| `fs-02-finger-walk.mp4` | MP4 | 1280×720, 10 s | 1.9 MB | Finger walk up the wall (stage 1) — no poster image shipped |
| `fs-03-assisted-external-rotation.jpg` | **PNG** | 1024×1024 | 1.2 MB | Assisted outward rotation (stage 1) |
| `fs-04-scapular-setting.mp4` | MP4 | 720×1280, 10 s | 2.5 MB | Shoulder-blade setting (stage 1) — no poster |
| `fs-05-wall-slide.jpg` | JPEG | 900×502 | 44 KB | Wall slide (stage 2) — **see flag below** |
| `fs-05-wall-slide.mp4` | MP4 | 1280×720, 8 s | 2.0 MB | Wall slide (stage 2) |
| `fs-06-stick-assisted-elevation.jpg` | JPEG | 1450×736 | 229 KB | Assisted overhead reach with a stick (stage 2) |
| `fs-07-external-rotation-stretch.jpg` | **PNG** | 992×1078 | 1.2 MB | Outward rotation stretch (stage 2) |
| `fs-08-cross-body-stretch.mp4` | MP4 | 1280×720, 10 s | 1.4 MB | Cross-body stretch (stage 2) — no poster |
| `fs-09-towel-internal-rotation.jpg` | **PNG** | 1309×800 | 1.5 MB | Towel stretch behind the back (stage 2) |
| `fs-10-band-external-rotation.jpg` | **PNG** | 1024×1032 | 911 KB | Band outward rotation (stage 3) |
| `fs-11-band-internal-rotation.jpg` | **PNG** | 1099×960 | 924 KB | Band inward rotation (stage 3) |
| `fs-12-band-row.jpg` | **PNG** | 1024×1032 | 856 KB | Band row (stage 3) |
| `fs-13-light-forward-raise.jpg` | **PNG** | 1264×843 | 1.3 MB | Light forward raise (stage 3) |
| `fs-14-loaded-carry.jpg` | **PNG** | 1361×768 | 1.5 MB | Loaded carry (stage 3) |
| `fs-sleep-01-back-supported.mp4` | MP4 | 1280×720, 10 s | 2.3 MB | Sleeping on the back with the arm supported |
| `fs-sleep-02-side-lying-pillow.mp4` | MP4 | 1280×720, 10 s | 2.3 MB | Sleeping on the good side hugging a pillow |
| `fs-sleep-03-propped-upright.mp4` | MP4 | 1280×720, 8 s | 1.9 MB | Sleeping propped up |
| `fs-sleep-04-night-waking-mobility.mp4` | MP4 | 720×1280, 10 s | 2.4 MB | Gentle movement when stiffness wakes you |
| `fs-selfcare-01-ice-or-heat.mp4` | MP4 | 1280×720, 8 s | 1.8 MB | Ice or heat |
| `fs-selfcare-03-getting-dressed.mp4` | MP4 | 720×1280, 10 s | 2.5 MB | Getting dressed with a stiff shoulder |
| `fs-selfcare-04-showering.jpg` | **PNG** | 1024×1030 | 1.8 MB | Showering with a stiff shoulder |

Nothing exists for stage 4 (`fs-15`–`fs-18`) or for "keep moving, gently"
(`fs-selfcare-02`), and no video has a matching poster still except `fs-05`.

### Postoperative-care-RC — `images/` and `videos/`

| File | Format | Dimensions / duration | Size | Illustrates |
|---|---|---|---|---|
| `videos/pre_3.mp4` | MP4 | 720×1280, 10 s | 2.5 MB | Prepare button-up shirts (pre-op) — **byte-identical to `dressing.mp4`** |
| `videos/p1_1.mp4` | MP4 | 720×1280, 10 s | 2.6 MB | Pendulum (Codman) swings, phase 1 |
| `videos/p1_2.mp4` | MP4 | 720×1280, 10 s | 2.5 MB | Wrist and elbow exercises, phase 1 |
| `videos/p1_3.mp4` | MP4 | 720×1280, 10 s | 2.4 MB | Grip pump and ball squeeze, phase 1 |
| `videos/p1_4.mp4` | MP4 | 720×1280, 10 s | 2.6 MB | Passive forward elevation, phase 1 |
| `videos/p2_4.mp4` | MP4 | 720×1280, 10 s | 2.5 MB | Scapular squeezes, phase 2 — **byte-identical to FS `fs-04-scapular-setting.mp4`** |
| `videos/dressing.mp4` | MP4 | 720×1280, 10 s | 2.5 MB | Dressing with a sling — **byte-identical to FS `fs-selfcare-03-getting-dressed.mp4`** |
| `videos/sling_wear.mp4` | MP4 | 720×1280, 10 s | 2.4 MB | Wearing the sling correctly |
| `videos/pain_swelling.mp4` | MP4 | 1280×720, 8 s | 1.8 MB | Managing pain and swelling — **byte-identical to FS `fs-selfcare-01-ice-or-heat.mp4`** |
| `videos/activity_precautions.mp4` | MP4 | 1280×720, 8 s | 1.7 MB | Activity precautions after repair |
| `videos/sleep_position.mp4` | MP4 | 1280×720, 10 s | 2.3 MB | Semi-reclined sleeping — **byte-identical to FS `fs-sleep-01-back-supported.mp4`** |
| `videos/side_sleeping.mp4` | MP4 | 1280×720, 10 s | 2.3 MB | Side sleeping on the unaffected side — **byte-identical to FS `fs-sleep-02-side-lying-pillow.mp4`** |
| `images/p2_1.jpg` | JPEG | 1450×736 | 229 KB | Wand/stick elevation and external rotation, phase 2 — **byte-identical to FS `fs-06-stick-assisted-elevation.jpg`** |
| `images/p2_2.jpg` | JPEG | 900×502 | 44 KB | Wall crawls / ladder climbs, phase 2 — **byte-identical to FS `fs-05-wall-slide.jpg`; see flag** |
| `images/p2_3.jpg` | JPEG | 900×372 | 41 KB | Supine active arm raises, phase 2 — **see flag** |
| `images/p3_3.jpg` | JPEG | 900×578 | 65 KB | Sidelying dumbbell external rotation, phase 3 — **see flag** |
| `images/p4_3.jpg` | JPEG | 900×674 | 64 KB | PNF diagonal lift patterns, phase 4 — **see flag** |
| `images/p4_4.jpg` | JPEG | 900×502 | 86 KB | Sport/job-specific simulation drills, phase 4 — **see flag** |
| `images/icon-192.png`, `icon-512.png`, `icon-512-maskable.png` | PNG | 192/512 px | 10–51 KB | PWA icons, not article media |

### Postoperative-care-ACLR

No exercise media at all — only `icon-192.png` (192×192, 3 KB) and `icon-512.png`
(512×512, 10 KB). All 51 exercises are text-only. This is the largest media gap in the
four repos, and it is for the condition with the most written material.

### Provenance — please check before publishing

**Most of the media is AI-generated, not photographed.** Every image and video listed
above except the five flagged below carries an embedded **Google C2PA content
credential** (`pki.goog/c2pa`, "Google C2PA Media Services"), which is the signature
Google's image and video models attach to their output. This is corroborated inside the
repos themselves: `Osteoporosis-care/media/media-asset-list.md` and
`media/all-prompts-batch.txt` are 70 KB of ready-to-paste image-generation prompts, and
`media/video-prompts.md` opens with a warning that "AI video is far less reliable than
AI stills for this job" and recommends filming a real person instead. So this is not
third-party copyright — but it is generated content on a public medical site, and two
things follow:

1. **Check the generator's terms** for commercial and medical use, and decide whether
   the site should disclose that illustrations are AI-generated. `video-prompts.md`
   already makes the clinical argument: a clip that looks fine at speed can contain
   three frames where the knee inverts, and a patient copies what is on screen.
2. **Review every asset anatomically before publication**, which the prompt files
   themselves insist on.

**Five files carry no content credential and look different from the rest** — flag these
for a provenance check before they go on a public website. They are small
(41–86 KB), all exactly 900 px wide with varying heights (900×502, 900×372, 900×578,
900×674, 900×502), which is the fingerprint of images saved from a content-managed
website rather than generated or photographed:

- `Postoperative-care-RC/images/p2_2.jpg` — also present as `Frozen-shoulder-care/media/fs-05-wall-slide.jpg`
- `Postoperative-care-RC/images/p2_3.jpg`
- `Postoperative-care-RC/images/p3_3.jpg`
- `Postoperative-care-RC/images/p4_3.jpg`
- `Postoperative-care-RC/images/p4_4.jpg`

Nothing else in the four repos looks like stock photography or a figure lifted from a
paper. The only third-party material found is **outbound links**, which is fine and
needs no licence, but should be attributed on the page: Rama Channel (Ramathibodi),
Harvard Health, Mahidol Faculty of Physical Therapy, and several YouTube videos in the
FS, RC and ACLR resource lists, plus the Thai Osteoporosis Foundation, Otago, CDC STEADI
and WHO in the osteoporosis Learn tab.

### Conversion checklist

- Images → WebP with AVIF where supported; the ten mislabelled PNGs in
  `Frozen-shoulder-care/media/` should be re-encoded as lossy rather than converted
  as-is.
- Target roughly 1200 px on the long edge for an in-article illustration; the 2400 px
  originals are 10–20× larger than any article needs.
- Videos → poster still + click-to-load, never `preload="auto"` and never autoplay. The
  frozen-shoulder app already gets this right by using its still as the video poster —
  reuse that pattern.
- Six video files are byte-identical duplicates across the FS and RC repos, and one is
  duplicated inside the RC repo (`pre_3.mp4` = `dressing.mp4`). Deduplicate on hash
  before importing anything.

---

## 6. Voice notes — how he writes for Thai patients

Article-writing prompts should carry this section verbatim. The point is that new
articles read as though the same person wrote them.

His own stated rules, from `Osteoporosis-care/README.md` ("Writing for patients"):

> - No patient-facing string runs past 260 characters. Anything longer belongs in
>   `LISTS`, rendered as bullets.
> - Everyday words over medical ones: "กระดูกบาง" rather than "ภาวะมวลกระดูกต่ำ",
>   "broken a bone in a small fall" rather than "fragility fracture". Where a clinical
>   term has to appear (T-score), the sentence explains it.
> - Both languages are written for the patient, not translated word for word from each
>   other.

What the extracted text actually shows:

**1. He addresses the reader as ท่าน, not คุณ — except in the frozen-shoulder app.**
The osteoporosis app uses ท่าน 49 times and คุณ never; the ACLR app ท่าน 44 times; the RC
app is mixed (ท่าน 32, คุณ 9); the frozen-shoulder app uses คุณ 50 times and ท่าน 7.
ท่าน is the deferential register appropriate to older patients, and the osteoporosis app
— written for people in their seventies and eighties — is the most consistent. **Pick
ท่าน as the site default** and treat the frozen-shoulder app's คุณ as the outlier, or the
new articles will read as two different authors.

**2. Sentences are short and chained with spaces, not commas.** The median Thai string
is around 37–46 characters; even the long explanatory ones break into two or three
clauses separated by a space, never by a comma or a semicolon. Example
(`gettingUpBody`): *"ถ้าล้ม อย่ารีบลุก ตั้งสติก่อน แล้วพลิกตัวตะแคง คลานไปหาเก้าอี้หรือโต๊ะที่มั่นคง คุกเข่าข้างหนึ่ง แล้วค่อย ๆ ดันตัวขึ้นนั่ง ถ้าลุกไม่ไหว ให้โทรขอความช่วยเหลือและห่มผ้าให้อุ่นไว้"* — nine
short actions in one sentence, each one a thing the hands do.

**3. A medical term appears only after the plain-Thai idea, and the sentence teaches
the term rather than assuming it.** `learnTScoreBody` is the model:

> "T-score คือตัวเลขที่บอกว่ากระดูกของท่านแน่นแค่ไหน เทียบกับคนหนุ่มสาวที่กระดูกปกติ ตั้งแต่ -1 ขึ้นไปคือปกติ ระหว่าง -1 ถึง -2.5 คือเริ่มบาง และ -2.5 หรือต่ำกว่าคือกระดูกพรุน"

Definition, then comparator, then the three bands with their everyday names. The same
pattern runs through the apps: กระดูกบาง for osteopenia, กระดูกพรุน for osteoporosis,
เข่าฉิ่ง glossed as *(knee valgus)* in the ACLR resource list, ลุกเดินจับเวลา (TUG),
ดัชนีมวลกาย for BMI.

**4. Warnings are always cause → action, in that order, and the action is specific.**
Not "seek medical attention" but a named number or a named timeframe.
`alertHipPainAction`: *"อาจเป็นกระดูกสะโพกหัก อย่าฝืนลุกเดิน โทร 1669 ทันที"* — possible
diagnosis, one prohibition, one phone number. `alertBackPainAction` sets a deadline
instead: *"อาจเป็นกระดูกสันหลังยุบ ให้นอนพักและติดต่อโรงพยาบาลภายในวันนี้"*.

**5. Prohibitions are graded, and the grading is consistent.** ห้าม is reserved for
absolutes with a consequence attached (`ห้ามนอนราบ`, `ห้ามหยุดยานี้เองโดยเด็ดขาด`,
`ห้ามฉีด 2 เข็มในวันเดียว`); ควรเลี่ยง / หลีกเลี่ยง is for advisory reduction
(`ควรลดหรือเลี่ยง`, `หลีกเลี่ยงท่าซิทอัพ`). ควร appears 32 times in the osteoporosis
extract and ห้าม only 8 — he does not shout unless it matters.

**6. Reassurance is honest rather than warm — he states the limit of the benefit.**
`learnExpectBody`: *"การดูแลอย่างต่อเนื่องช่วยลดโอกาสล้มและกระดูกหักได้มาก แต่ไม่ได้แปลว่าจะไม่หักเลย
และไม่ได้ทำให้กระดูกกลับไปแข็งแรงเหมือนตอนหนุ่มสาว เป้าหมายคือใช้ชีวิตได้ตามปกติและแข็งแรงที่สุดเท่าที่ทำได้"*.
The pattern is: real benefit, then the two things it will not do, then a goal the
patient can actually hold. Praise is short and unadorned when it comes:
*"ยังไม่มีบันทึกการล้ม ดีมาก"*, *"กระดูกของท่านแข็งแรงดี ทำต่อไปแบบนี้"*.

**7. The reason comes attached to the instruction, in the same sentence.** Almost never
a bare rule. *"อาหารเค็มจัด … เพราะเกลือทำให้แคลเซียมหลุดออกทางปัสสาวะ"*; *"กินทีละน้อยแต่บ่อยครั้ง
ดีกว่ากินทีเดียวมาก ๆ เพราะร่างกายรับได้ครั้งละไม่เกิน 500 มก."*. The word เพราะ is doing a lot
of work across all four apps.

**8. Numbers are concrete, small and immediately actionable.** "10-15 นาที สัปดาห์ละ 2-3
ครั้ง", "ค้างไว้ 3 วินาที", "ไม่ควรเกินวันละ 2 แก้ว", "อย่างน้อย 30 นาที". He rarely gives a
range without also giving a way to hit it.

**9. Everything is localised to Thailand, not translated into Thai.** Thai foods with
Thai names and local serving sizes (ปลาเล็กปลาน้อย, กุ้งแห้ง, คะน้า, ตำลึง, ใบยอ, งาดำ,
เต้าหู้), the Thai emergency number 1669, Buddhist-era birth years, and sun exposure
timed to the Thai day (ก่อน 9 โมงเช้า หรือหลัง 4 โมงเย็น). The English strings are written
independently for an English-reading patient rather than being a gloss of the Thai — his
test suite (`t1_i18n_parity`) fails any string where the two languages are identical.

**10. Typography: ๆ always takes a preceding space** (เบา ๆ, ช้า ๆ, น้อย ๆ, ค่อย ๆ),
consistently across all four apps — 33 occurrences in the osteoporosis extract alone.
Ranges use an en dash in the English and a hyphen in the Thai. Keep both conventions.

**11. Second-person questions in the ท่าน…หรือไม่ frame** for anything the reader has to
answer about themselves: *"ท่านเคยกระดูกหักจากการล้มหรือกระแทกเบา ๆ หรือไม่"*,
*"ท่านรู้สึกว่าเดินหรือยืนไม่ค่อยมั่นคงหรือไม่"*. Useful for article FAQ headings and
self-check boxes.

---

## 7. Two things to know before reusing the text

**The content is a careful draft, not signed-off copy.** The osteoporosis README says so
directly, under "Before a real pilot (do not skip)": *"Every Thai clinical string —
medication instructions, red flags, the do-not-stop and dental warnings, and the
supplement figures — needs your clinical read-through. The content is a complete,
careful v1 draft, not clinically validated copy."* The same README flags the FRAX
baselines as approximate Asian figures needing Thai epidemiology, and the DXA screening
criteria as international guidance needing checking against the Thai guideline. Treat
extracted strings as his words and his voice, which they are — but not as text that has
already cleared clinical review.

**The ACLR IKDC questionnaire is explicitly unverified.** The comment at
`Postoperative-care-ACLR/index.html` line 1669 states that the 18-item IKDC form was
transcribed from trained knowledge without access to the official scoring manual, and
that the Thai copy should be replaced with a published, validated Thai translation
rather than a direct translation of the English. The 65 `ikdc*` keys in the ACLR
extract are all marked `ui` for that reason — do not lift them into an article as
though they were the validated instrument.
