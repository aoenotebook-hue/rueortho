# Image register

Every image on the site must be listed here before it is used. This exists
because provenance has already been a real problem on this project: five images
in the rotator-cuff app carry no C2PA credential and have completely stripped
metadata, and most of the rest is AI-generated. A public medical site under a
named doctor's byline cannot carry images whose origin nobody can state.

## The rule

An image may go on the site only if this table can be filled in truthfully for
it. If the Source or Licence column would have to say "not sure", the image does
not ship.

## The `basics` illustrations — delivered and placed

**The author drew all twenty and committed them on 2026-09-19**, to exactly the
filenames this section asked for. They are placed, in both languages, as forty
`<Figure>`s: six on `bone-as-an-organ`, four on `bone-and-cartilage`, five on
`fracture-healing` and five on `arthroscopic-surgery`. The table below is kept
as the register entry for each file and as the record of what was asked for.

Three things worth knowing about this batch:

- **They are genuine JPEGs with a `.jpg` extension** — the first upload on this
  project where the extension matched the file. The five batches before it all
  arrived as JPEG named `.webp` or `.png` and had to be renamed.
- **All twenty are 1024x765**, so every `<Figure>` carries
  `width={1024} height={765}`; a string path carries no dimensions of its own
  and the article reflows when the lazy file lands without them.
- **Placement follows what is in the frame**, checked picture by picture rather
  than taken from the filename — the rule the examination and rehabilitation
  sets established. It happened to agree with the filenames everywhere here,
  which the earlier batches did not.

**Where they live:** `public/images/basics/<slug>/<filename>`. `basics` shares
`resourceSchema()` with examinations, treatments and rehabilitation, whose
pictures all live in `public/` and are referenced by URL, so these follow the
same convention rather than going through `astro:assets`.

### `public/images/basics/bone-as-an-organ/`

| File | Closes the section | What should be in the frame |
|---|---|---|
| `bone-as-an-organ-living.jpg` | ภาพที่คนส่วนใหญ่นึกถึง / The picture most people have | The article's own contrast: the dry, pale bone in a museum case beside the same bone alive — blood vessels running through it, cells at work inside |
| `bone-as-an-organ-remodelling.jpg` | ขณะที่คุณอ่านอยู่นี้ ร่างกายกำลังสร้างกระดูกใหม่ | The two crews on one patch of bone: cells clearing old bone away, cells filling the space with new, and the buried network sensing load and directing them. **The core diagram of the article** |
| `bone-as-an-organ-marrow.jpg` | ข้างในมีโรงงานอยู่ | A long bone cut away, marrow in the middle producing red cells, white cells and platelets |
| `bone-as-an-organ-care.jpg` | การดูแลกระดูก | Everyday loading rather than a gym: walking, stairs, a resistance band, food, a well-lit uncluttered floor |

Optional, if the set is worth extending:

| File | Closes the section | What should be in the frame |
|---|---|---|
| `bone-as-an-organ-calcium.jpg` | บัญชีแคลเซียมของร่างกาย | Calcium leaving the skeleton into the bloodstream on a hormone signal, and going back when there is plenty — the "account being drawn on" |
| `bone-as-an-organ-signals.jpg` | กระดูกส่งข้อความถึงอวัยวะอื่น | Bone releasing messengers that reach the kidney, muscle and fat |

### `public/images/basics/bone-and-cartilage/`

| File | Closes the section | What should be in the frame |
|---|---|---|
| `bone-and-cartilage-anatomy.jpg` | สองเนื้อเยื่อ ในข้อเดียวกัน | A joint cut away: bone ends capped with a few millimetres of smooth white cartilage. The two tissues told apart by texture and colour, not by a label |
| `bone-and-cartilage-healing.jpg` | ทำไมความต่างนี้จึงสำคัญมาก | Side by side: a fracture with vessels arriving and knitting it, beside a worn joint surface with no vessel reaching it at all. **The core diagram of the article** |
| `bone-and-cartilage-nutrition.jpg` | กระดูกอ่อนได้อาหารอย่างไร | The sponge the article describes: the joint loaded and fluid pressed out, the joint released and fluid drawn back in |
| `bone-and-cartilage-care.jpg` | การดูแลทั้งสองอย่าง | Regular ordinary movement and strength work for the muscle around the joint, and load going up a little at a time rather than in a jump |

Optional:

| File | Closes the section | What should be in the frame |
|---|---|---|
| `bone-and-cartilage-nonerve.jpg` | ทำไมความต่างนี้จึงสำคัญมาก (second figure) | Why early wear does not hurt: no nerve reaching the surface, while the lining, the bone underneath and the capsule around it do carry pain |

### `public/images/basics/fracture-healing/`

For the article on how a broken bone mends. Same story as the two above: no
picture yet, and the subject is entirely invisible to the reader.

| File | Closes the section | What should be in the frame |
|---|---|---|
| `fracture-healing-stages.jpg` | สี่ระยะที่คาบเกี่ยวกัน / Four stages, running into each other | The four stages as one strip: blood filling the break, the inflamed stage, a soft cartilage bridge across the gap, then that bridge turned to bone. **The core diagram of the article** |
| `fracture-healing-cast.jpg` | เฝือกมีไว้ทำอะไรกันแน่ / What the cast is actually for | Two bone ends held still and close with the soft bridge forming between them, beside the same bridge being pulled apart by movement and failing to harden — the cast holds, it does not join |
| `fracture-healing-remodelling.jpg` | สี่ระยะที่คาบเกี่ยวกัน (second figure) or ต้องนิ่ง แต่ไม่ใช่แข็งทื่อ | The same bone twice: bulky untidy new bone around the break, then months later the same bone carved back to its proper shape |
| `fracture-healing-care.jpg` | สิ่งที่คุณทำได้จริง / What you can actually do | Everyday scenes: a cigarette put down, food on a plate, the joints above and below the cast being moved, a follow-up appointment card |

Optional:

| File | Closes the section | What should be in the frame |
|---|---|---|
| `fracture-healing-delay.jpg` | อะไรทำให้ติดช้า / What slows it down | Smoking, high blood sugar and a poorly supplied bone end shown as three things slowing the same repair |

### `public/images/basics/arthroscopic-surgery/`

For the article on keyhole joint surgery.

| File | Closes the section | What should be in the frame |
|---|---|---|
| `arthroscopic-surgery-overview.jpg` | การส่องกล้องข้อคืออะไร / What it actually is | The set-up: a thin camera entering a knee through a tiny opening, instruments alongside it, and the magnified view of the inside of the joint on a screen |
| `arthroscopic-surgery-fluid.jpg` | ทำไมต้องใส่น้ำเข้าไปในข้อ / Why the joint is filled with fluid | Side by side: joint surfaces pressed together with the lens against tissue and nothing to see, beside the same joint opened up by fluid with a clear view. **The detail nobody expects** |
| `arthroscopic-surgery-repair.jpg` | กล้องทำอะไรได้ดี / What it is good at | Work being done through the small openings — a torn meniscus stitched back down, a tendon drawn back to bone |
| `arthroscopic-surgery-recovery.jpg` | แผลเล็กไม่ได้แปลว่าเรื่องเล็ก / Small cuts do not mean a small operation | The point of the whole article: two or three healed millimetre scars on the outside, and inside the same joint a repair still knitting, against a calendar running to months. **The core diagram of the article** |

Optional:

| File | Closes the section | What should be in the frame |
|---|---|---|
| `arthroscopic-surgery-limits.jpg` | สิ่งที่กล้องทำไม่ได้ / What it cannot do | A worn joint surface with an instrument beside it that can tidy a catching flap but cannot resurface what has thinned |

### Rules all of these files have to follow

- **JPEG, and the extension must say `.jpg`.** Five uploads in a row arrived
  named `.webp` or `.png` and were JPEG inside. In `public/` nothing re-encodes
  them, so the served `Content-Type` comes straight off the extension.
- **1024 × 765**, matching every other set on the site. `<Figure>` on a string
  path carries `width` and `height`, and a path gives the browser neither, so
  the figure would lay out at zero height and reflow the article when the lazy
  file lands.
- **No text, letters or numbers drawn into the picture.** Thai and English share
  the same file in the same section, which only works because the frame carries
  no words. `exercises/ankle-alphabet.jpg`, with "ABC" drawn in, is the one
  exception on the site and is flagged as a problem rather than a precedent.
- **No caption**, per the 2026-09-19 ruling — `alt` describing the frame, and
  the standard attribution line, and nothing else.
- **No hero image is needed.** `heroImage` is on the conditions schema only;
  `resourceSchema()` has no such field, so a basics article has no hero slot.
- **No video is needed.** None of these four articles demonstrates a movement.

## The AI disclosure, and image reuse — settled 2026-09-19

**`images/figures/knee-anatomy-placeholder.svg` was removed on 2026-09-19**, at
the author's request, and its row is gone from the register. It was a crude
stand-in with the words "Placeholder — replace with a licensed anatomy figure"
drawn into the picture itself, and it had been sitting in the published
`knee-osteoarthritis` article in both languages since 2026-09-06 under an
attribution that said so. The article loses nothing: the author's own knee
anatomy diagram sits three paragraphs below it, and the caption the placeholder
carried repeated the sentence that followed it. The file is deleted and nothing
references it.

The author ruled on both open questions on 2026-09-19, and the answers now live
on the **editorial policy page** in both languages rather than in any caption:

- **Every illustration and demonstration clip on the site is AI-generated**, by
  him. That covers the sets below whose provenance reads "supplied by the
  author" and which carry no C2PA credential — the question two sections of this
  file used to leave open is answered, and those passages are marked.
- **The illustrations are fully reserved.** The site's text may still be reused
  for non-commercial education with attribution; the pictures may not be copied,
  altered or republished for any purpose without his written permission. That is
  a deliberate split: text one way, images the other.

**The per-image attribution lines were not changed, on his instruction.** He
asked for the AI statement to be made once, on the policy page, and asked for no
captions to be added — so the 139 figure and exercise-card credits in each
language still read `ภาพ: รศ. นพ. สรวุฒิ ธรรมยงค์กิจ` /
`Illustration: Assoc. Prof. Sorawut Thamyongkit, M.D.` and nothing more. The
app-media lines, which already said `สร้างด้วยปัญญาประดิษฐ์` because a C2PA
credential proved it, are also untouched. A future pass that wants the
disclosure per-image should ask him first — he chose where it goes.

## Folders

| Folder | For |
|---|---|
| `public/images/anatomy/` | Anatomical illustrations used in articles |
| `public/images/conditions/` | Condition hero and card images |
| `public/images/exercises/` | Exercise demonstration stills |
| `public/images/hero/` | Homepage and section headers |
| `public/images/figures/` | Diagrams referenced by a single article |
| `public/icons/` | Icon assets not drawn inline as SVG |
| `src/assets/logo.png` | The site's logo mark, run through `astro:assets` so each place that uses it gets a correctly sized copy |
| `src/assets/conditions/<slug>/` | Media imported from the author's four apps, optimised (WebP). Imported through `scripts/import-app-media.mjs`, never copied by hand |
| `public/media/<slug>/` | Demonstration video clips from the same apps. Videos cannot go through `astro:assets`, so they sit in `public/` and are played by `<Video>` |

Name files descriptively — `knee-oa-cartilage-loss.webp`, not `img_034.webp`.
Prefer WebP or AVIF, and SVG for line diagrams. Anatomical illustrations should
share one visual language, so prefer a single source for the whole set.

## Register

| File | Source | Licence | Attribution shown | Added |
|---|---|---|---|---|
| `src/assets/logo.png` | Supplied by the author (uploaded to the repo as `logo3.png`) | Author's own | none needed (decorative; the wordmark carries the name) | 2026-09-08 |
| `favicon-32.png`, `favicon-192.png`, `apple-touch-icon.png` | Generated from `src/assets/logo.png` | Author's own | none needed | 2026-09-08 |
| `src/assets/hero-shoulder-pain.png` | Supplied by the author (uploaded to the repo under `images/`) | Author's own | none needed (decorative illustration) | 2026-09-08 |
| `src/assets/body-map.png` | Supplied by the author (uploaded to the repo under `images/`) | Author's own | none needed (decorative; the hotspot labels carry the meaning) | 2026-09-08 |
| `src/assets/regions/*.png` (8: neck, shoulder, spine, hip, knee, elbow, hand-wrist, foot-ankle) | Supplied by the author (uploaded to the repo under `images/` as `icon_*.png`) | Author's own | none needed (decorative; the region label sits beside each one) | 2026-09-10 |
| ~~`src/assets/illustrations/*`~~ (20 condition heroes) | Supplied by the author | Author's own | — | 2026-09-10, **superseded 2026-09-17** |
| `src/assets/conditions/<slug>/<slug>-hero.jpg` (22) | Supplied by the author (committed straight to `src/assets/conditions/`) | Author's own | none needed; described to screen readers by each article's `heroImageAlt` | 2026-09-17 |
| `src/assets/conditions/<slug>/<slug>-anatomy.jpg` (21 — every condition but meniscus-tear) | Supplied by the author (as above) | Author's own | `ภาพ: รศ. นพ. สรวุฒิ ธรรมยงค์กิจ` / `Illustration: Assoc. Prof. Sorawut Thamyongkit, M.D.` in the figure caption | 2026-09-17 |
| `src/assets/conditions/<slug>/<slug>-care.jpg` (22) | Supplied by the author (as above) | Author's own | as above | 2026-09-17 |
| `src/assets/conditions/<slug>/<slug>-symptoms.jpg` (3: carpal-tunnel-syndrome, herniated-disc, meniscus-tear) | Supplied by the author (as above) | Author's own | as above | 2026-09-17 |
| `public/images/examinations/<exam>/*.jpg` (22) | Supplied by the author (committed straight to `public/images/examinations/`) | Author's own | `ภาพ: รศ. นพ. สรวุฒิ ธรรมยงค์กิจ` / `Illustration: Assoc. Prof. Sorawut Thamyongkit, M.D.` in the figure caption | 2026-09-17 |
| `src/assets/sections/rehabilitation.png` | Supplied by the author (uploaded to the repo under `images/` as `running.png`) | Author's own | none needed (decorative) | 2026-09-10 |


## The 2026-09-17 condition illustration set

On 2026-09-17 the author committed 68 illustrations straight into
`src/assets/conditions/<slug>/`, three for most conditions: a **hero** scene, an
**anatomy** diagram and a **care** scene, plus a spare symptom scene for three
topics. They are the same 4:3, 1024x765 house style as the eleven heroes he
added on 2026-09-10, and they are **his own**, committed by him to his own
repository — the same basis on which every other `src/assets/` image here is
recorded.

Two things about them are worth writing down rather than discovering later.

**They carry no metadata whatsoever.** `grep -a c2pa` finds no content
credential in any of the 68, and sharp reports no EXIF, ICC, XMP or IPTC block
either. That is *not* the situation that got five rotator-cuff files excluded
from the app-media import: those were files of unknown origin sitting inside a
third-party-ish source tree, where a missing credential was the only signal
available. These came from the author directly. The already-published
`illustrations/` heroes are in exactly the same position — 0 of 20 carry a
credential — so this set is consistent with what the site already ships.

**The AI question was open here until 2026-09-19, and is now answered** — see
"The AI disclosure, and image reuse" above. The author confirmed these are
AI-generated and asked for the disclosure to be made once on the editorial
policy page rather than in each caption, so the attribution lines below are
unchanged. The paragraph this replaced was right that nothing in the files
proved it and that guessing was not Claude's call; it took him saying so.

**The captions carry attribution and nothing else.** `lint:content` warns on a
`<Figure>` with no `attribution`, so each of the 92 new figures names the
author. None of them carries a `caption`: a caption under an exercise picture
reads as an instruction, and what a reader should actually do is the author's
to write, not Claude's. The `alt` text describes only what is visibly in the
frame.

## The 2026-09-17 examination illustration set

The same day, and on the same terms as the condition set above, the author
committed 22 illustrations into `public/images/examinations/<exam>/` — for each
of the six examination topics a **concept** diagram (what the test shows), an
**overview** scene (the room and the machine) and a **practical** scene
(preparation, screening, what to declare), plus for four of them a second
procedure scene carried over from an earlier upload.

These sit in `public/` rather than `src/assets/`, so they are referenced by URL
and `lint:content` checks each `<Figure src="/images/…">` against the file on
disk. They are not run through `astro:assets`, so they are served exactly as
uploaded.

Provenance is the author's own upload, as for every other `src/assets` and
`public/images` picture here. They carry the same attribution line as the
condition set, and the AI disclosure that covers them is the site-wide one on
the editorial policy page — see the top of this file. Nothing in the files
claims it; the policy page does, for the whole set at once.

**Six older flat files were deleted as exact duplicates.**
`public/images/examinations/{xray,mri-scan,knee-mri,dxa-scan,musculoskeletal-ultrasound,nerve-conduction-emg}.webp`
were byte-identical (SHA-256) to a file now inside the matching subfolder.

**Every file was a JPEG named `.webp`** and was renamed to `.jpg`; the bytes are
untouched.

## The 2026-09-17 rehabilitation and treatment illustration set

30 more illustrations, on the same terms as the sets above: for each of the five
rehabilitation topics and each of the five treatment topics an `-overview`, a
`-technique`/`-mechanism` and a `-progression`/`-practical` scene. 29 are placed
as `<Figure>` on the article of the same name, in both languages — 58 figures.

**The paths were normalised to the convention the examination set uses**,
`public/images/<collection>/<slug>/<slug>-<role>.jpg`: the folders arrived as
`Rehabilitation` (capital R, which is a broken URL on a case-sensitive server)
and `treatment` (the collection is `treatments`), with subfolders named
`balance-fall`, `principle`, `selfcare`, `injection`, `medication` and
`choosing` rather than after the articles they belong to.

**Every file was a JPEG named `.webp`** — the fifth batch in a row — and all 30
were renamed to `.jpg` with the bytes untouched.

**The role in the filename does not describe the frame, so placement follows the
picture.** `rehab-principles-overview` is a three-stage progression from floor
work to carrying shopping upstairs, and `rehab-principles-progression` is five
everyday scenes around a ticked calendar; the first closes "the four phases",
the second "how to measure progress". The same applies across the set.

**`self-care-mechanism.webp` is placed on `knee-pain`, not on `self-care`.**
Two of its three panels show a knee sleeve being put on and then worn outdoors.
Nothing in the self-care article recommends a brace or support, so it does not
go there. `knee-pain`'s own FAQ answers "Should I wear a knee support?", and on
2026-09-23, at the author's request, the picture went at the end of that
article's prevention and self-care section, captioned with that answer's
qualifiers intact.

Provenance is the author's own upload, and the same open question about an AI
disclosure applies — nothing in the files claims it, so neither does the
caption.

## The 2026-09-17 exercise illustration set

36 exercise pictures had been sitting unreferenced in `public/images/exercises/`
since an earlier upload. They are the author's own, on the same terms as the two
sets above, and they are placed on the `<ExerciseCard>`s of the condition
articles — 42 cards in each language, 34 distinct pictures, several of which
serve two articles because the two articles prescribe the same exercise
(`calf-stretch-wall` on achilles-tendinopathy and plantar-fasciitis,
`prone-on-elbows` on herniated-disc and sciatica, `hand-tendon-glide` on
carpal-tunnel-syndrome and trigger-finger, and so on).

**Every file was a JPEG whatever its extension claimed** — the fourth batch in a
row — and all 36 were renamed to `.jpg` with the bytes untouched. Two carried a
`.webp.jpg` double extension. These live in `public/`, so nothing re-encodes
them and the served `Content-Type` came straight off the extension; before the
rename every one of them was served as `image/webp` and was not one.

`knee-oa-cartilage-loss.webp` was deleted as a byte-identical (SHA-256)
duplicate of `public/images/figures/knee-oa-cartilage-loss.webp`, and was not an
exercise picture at all.

**`straight-leg-raise.jpg` was deliberately unplaced**, because it showed the
raised leg with the knee bent to about a right angle beside three cards that
say the knee must stay straight. On 2026-09-23 the file was replaced with a
correct-form picture from the ACL app — see "The straight-leg raise" under the
2026-09-23 refresh — and is now placed on all three cards.

Two more are worth his eye, and both were placed:

- `ankle-alphabet.jpg` carries the baked-in letters **"ABC"**. It is the first
  picture on the site with text in it, so unlike everything else it is not
  language-neutral: the Thai page shows English letters. The exercise is
  usually taught with the alphabet, so it is not wrong — only not Thai.
- `double-leg-heel-raise.jpg` and `heel-raise-towel-toes.jpg` show the
  **starting position**, feet flat, rather than the heels raised. The alt text
  says so rather than describing a movement that is not in the frame.

Provenance is the author's own upload, and the same open question about an AI
disclosure applies — nothing in the files claims it, so neither does the
caption.

## App media imported from the author's own apps

All 43 files below come from the four patient-care apps in `_sources/`, which
are the author's own work under Apache-2.0. Provenance was checked file by file
before import: **every one of them carries an embedded Google C2PA content
credential**, i.e. they are AI-generated illustrations, verified by
`grep -a c2pa` against each source file, not by trusting the table in
`docs/SOURCES.md`.

The **five files with no content credential and stripped metadata**
(`Postoperative-care-RC/images/p2_2.jpg`, `p2_3.jpg`, `p3_3.jpg`, `p4_3.jpg`,
`p4_4.jpg`) were **deliberately left out** of the import and must stay out until
their origin can be written down here in a sentence.

Images were re-encoded to WebP with the long edge capped at 1200 px: 79 MB of
source became 0.9 MB of images. Videos are copied verbatim — there is no ffmpeg
in the toolchain, and re-encoding a clip without checking every frame is exactly
the risk the apps' own `media/video-prompts.md` warns about. Six of the video
files are byte-identical across the frozen-shoulder and rotator-cuff apps and
are stored once.

### Attribution wording — **proposed, awaiting the author's confirmation**

Every one of these files carries this line in its `<Figure>` or `<Video>`
caption, written out in the article MDX:

```
ภาพจากแอป{ชื่อแอป} โดย นพ.สรวุฒิ ธรรมยงค์กิจ · ภาพประกอบสร้างด้วยปัญญาประดิษฐ์
วิดีโอจากแอป{ชื่อแอป} โดย นพ.สรวุฒิ ธรรมยงค์กิจ · คลิปสร้างด้วยปัญญาประดิษฐ์
```

Two decisions are baked into it and either can be changed with one pass over the
four articles:

1. **The AI disclosure is stated.** The site carries a named doctor's byline and
   the illustrations show body positions a reader will copy. Saying plainly that
   a picture is generated rather than photographed is the honest default; the
   author may decide it is unnecessary, but that has to be his decision.
2. **The app is named, not the generator.** The author is the person who
   commissioned, prompted and reviewed each asset, so the credit is his.

If the author wants different wording, this is the only place it appears in
prose — the articles carry it as a literal string, so a search and replace over
`src/content/conditions/` changes all of it.

### The files

| Imported to | From (`_sources/…`) | App | Size |
|---|---|---|--:|
| `src/assets/conditions/frozen-shoulder/pendulum.webp` | `Frozen-shoulder-care/media/fs-01-pendulum.jpg` | Frozen-shoulder-care | 41 KB |
| `src/assets/conditions/frozen-shoulder/assisted-external-rotation.webp` | `Frozen-shoulder-care/media/fs-03-assisted-external-rotation.jpg` | Frozen-shoulder-care | 24 KB |
| `src/assets/conditions/frozen-shoulder/stick-assisted-elevation.webp` | `Frozen-shoulder-care/media/fs-06-stick-assisted-elevation.jpg` | Frozen-shoulder-care | 14 KB |
| `src/assets/conditions/frozen-shoulder/external-rotation-stretch.webp` | `Frozen-shoulder-care/media/fs-07-external-rotation-stretch.jpg` | Frozen-shoulder-care | 50 KB |
| `src/assets/conditions/frozen-shoulder/towel-internal-rotation.webp` | `Frozen-shoulder-care/media/fs-09-towel-internal-rotation.jpg` | Frozen-shoulder-care | 39 KB |
| `src/assets/conditions/frozen-shoulder/band-external-rotation.webp` | `Frozen-shoulder-care/media/fs-10-band-external-rotation.jpg` | Frozen-shoulder-care | 25 KB |
| `src/assets/conditions/frozen-shoulder/band-internal-rotation.webp` | `Frozen-shoulder-care/media/fs-11-band-internal-rotation.jpg` | Frozen-shoulder-care | 46 KB |
| `src/assets/conditions/frozen-shoulder/band-row.webp` | `Frozen-shoulder-care/media/fs-12-band-row.jpg` | Frozen-shoulder-care | 23 KB |
| `src/assets/conditions/frozen-shoulder/light-forward-raise.webp` | `Frozen-shoulder-care/media/fs-13-light-forward-raise.jpg` | Frozen-shoulder-care | 12 KB |
| `src/assets/conditions/frozen-shoulder/loaded-carry.webp` | `Frozen-shoulder-care/media/fs-14-loaded-carry.jpg` | Frozen-shoulder-care | 41 KB |
| `src/assets/conditions/frozen-shoulder/showering.webp` | `Frozen-shoulder-care/media/fs-selfcare-04-showering.jpg` | Frozen-shoulder-care | 38 KB |
| `src/assets/conditions/rotator-cuff-tear/stick-assisted-elevation.webp` | `Postoperative-care-RC/images/p2_1.jpg` | Postoperative-care-RC | 14 KB |
| `src/assets/conditions/osteoporosis/sit-to-stand-hold.webp` | `Osteoporosis-care/media/exercises/sit_to_stand_hold.jpg` | Osteoporosis-care | 37 KB |
| `src/assets/conditions/osteoporosis/standing-marching.webp` | `Osteoporosis-care/media/exercises/standing_marching.jpg` | Osteoporosis-care | 28 KB |
| `src/assets/conditions/osteoporosis/weight-shifts.webp` | `Osteoporosis-care/media/exercises/weight_shifts.jpg` | Osteoporosis-care | 20 KB |
| `src/assets/conditions/osteoporosis/tandem-stand.webp` | `Osteoporosis-care/media/exercises/tandem_stand.jpg` | Osteoporosis-care | 24 KB |
| `src/assets/conditions/osteoporosis/heel-raises.webp` | `Osteoporosis-care/media/exercises/heel_raises.jpg` | Osteoporosis-care | 25 KB |
| `src/assets/conditions/osteoporosis/wall-pushups.webp` | `Osteoporosis-care/media/exercises/wall_pushups.jpg` | Osteoporosis-care | 23 KB |
| `src/assets/conditions/osteoporosis/hip-hinge.webp` | `Osteoporosis-care/media/exercises/hip_hinge.jpg` | Osteoporosis-care | 22 KB |
| `src/assets/conditions/osteoporosis/chin-tuck.webp` | `Osteoporosis-care/media/exercises/chin_tuck.jpg` | Osteoporosis-care | 32 KB |
| `src/assets/conditions/osteoporosis/scapular-squeeze.webp` | `Osteoporosis-care/media/exercises/scapular_squeeze.jpg` | Osteoporosis-care | 35 KB |
| `src/assets/conditions/osteoporosis/safe-pickup.webp` | `Osteoporosis-care/media/exercises/Picking things up safely.jpg` | Osteoporosis-care | 39 KB |
| `src/assets/conditions/osteoporosis/food-calcium.webp` | `Osteoporosis-care/media/selfcare/food_calcium.jpg` | Osteoporosis-care | 93 KB |
| `src/assets/conditions/osteoporosis/food-vitamin-d.webp` | `Osteoporosis-care/media/selfcare/food_vitamin_d.jpg` | Osteoporosis-care | 74 KB |
| `src/assets/conditions/osteoporosis/safety-bathroom.webp` | `Osteoporosis-care/media/selfcare/safety_bathroom.jpg` | Osteoporosis-care | 32 KB |
| `src/assets/conditions/osteoporosis/safety-stairs.webp` | `Osteoporosis-care/media/selfcare/safety_stairs.jpg` | Osteoporosis-care | 10 KB |
| `src/assets/conditions/osteoporosis/test-chair-stand.webp` | `Osteoporosis-care/media/selfcare/test_chair_stand.jpg` | Osteoporosis-care | 44 KB |
| `public/media/frozen-shoulder/finger-walk.mp4` | `Frozen-shoulder-care/media/fs-02-finger-walk.mp4` | Frozen-shoulder-care | 1960 KB |
| `public/media/frozen-shoulder/scapular-setting.mp4` | `Frozen-shoulder-care/media/fs-04-scapular-setting.mp4` | Frozen-shoulder-care | 2546 KB |
| `public/media/frozen-shoulder/wall-slide.mp4` | `Frozen-shoulder-care/media/fs-05-wall-slide.mp4` | Frozen-shoulder-care | 2011 KB |
| `public/media/frozen-shoulder/cross-body-stretch.mp4` | `Frozen-shoulder-care/media/fs-08-cross-body-stretch.mp4` | Frozen-shoulder-care | 1472 KB |
| `public/media/frozen-shoulder/sleep-back-supported.mp4` | `Frozen-shoulder-care/media/fs-sleep-01-back-supported.mp4` | Frozen-shoulder-care | 2359 KB |
| `public/media/frozen-shoulder/sleep-side-lying.mp4` | `Frozen-shoulder-care/media/fs-sleep-02-side-lying-pillow.mp4` | Frozen-shoulder-care | 2352 KB |
| `public/media/frozen-shoulder/sleep-propped-upright.mp4` | `Frozen-shoulder-care/media/fs-sleep-03-propped-upright.mp4` | Frozen-shoulder-care | 1971 KB |
| `public/media/frozen-shoulder/sleep-night-waking.mp4` | `Frozen-shoulder-care/media/fs-sleep-04-night-waking-mobility.mp4` | Frozen-shoulder-care | 2443 KB |
| `public/media/frozen-shoulder/ice-or-heat.mp4` | `Frozen-shoulder-care/media/fs-selfcare-01-ice-or-heat.mp4` | Frozen-shoulder-care | 1872 KB |
| `public/media/frozen-shoulder/getting-dressed.mp4` | `Frozen-shoulder-care/media/fs-selfcare-03-getting-dressed.mp4` | Frozen-shoulder-care | 2540 KB |
| `public/media/rotator-cuff-tear/pendulum.mp4` | `Postoperative-care-RC/videos/p1_1.mp4` | Postoperative-care-RC | 2625 KB |
| `public/media/rotator-cuff-tear/wrist-and-elbow.mp4` | `Postoperative-care-RC/videos/p1_2.mp4` | Postoperative-care-RC | 2515 KB |
| `public/media/rotator-cuff-tear/grip-pump.mp4` | `Postoperative-care-RC/videos/p1_3.mp4` | Postoperative-care-RC | 2498 KB |
| `public/media/rotator-cuff-tear/passive-forward-elevation.mp4` | `Postoperative-care-RC/videos/p1_4.mp4` | Postoperative-care-RC | 2650 KB |
| `public/media/rotator-cuff-tear/sling-wear.mp4` | `Postoperative-care-RC/videos/sling_wear.mp4` | Postoperative-care-RC | 2424 KB |
| `public/media/rotator-cuff-tear/activity-precautions.mp4` | `Postoperative-care-RC/videos/activity_precautions.mp4` | Postoperative-care-RC | 1784 KB |

## The 2026-09-23 refresh from the apps

The author asked on 2026-09-23 for everything he had uploaded to his four apps
to be reused on the site wherever it fits. Since the import above, he had
re-cut most of it: new stills for every frozen shoulder topic and a clip for
every frozen shoulder exercise, a complete ACL set (66 pictures, 9 clips),
re-encoded rotator cuff clips at a seventh of the size, and new osteoporosis
clips and pictures. The clones in `_sources/` were brought up to date first
(the ACL repository's history had been rewritten upstream, so that clone was
reset rather than merged).

**Provenance.** The C2PA check the first import relied on no longer works:
**the re-cut files carry no content credential at all** — of about 200 media
files across the four apps, only a handful of the older ones still do. Applying
the old rule would have excluded everything, including the replacements for
clips already on the site. What stands instead is the author's own statement:
these are files he uploaded to his own repositories, and on 2026-09-19 he
confirmed that every illustration and clip on the site is AI-generated and his
(see "The AI disclosure" above). The five rotator cuff stills listed above as
having unknown origin (`p2_2`, `p2_3`, `p3_3`, `p4_3`, `p4_4`) are **still not
imported** — nothing placed today needed them — and the rule for them is
unchanged.

**Every file below was looked at before it was placed**: the stills on a
labelled contact sheet, and each clip as five frames spread across its length,
which is also the check the apps' own notes ask for (a generated clip can have
a few frames where a joint inverts — none were seen). Each file sits beside the
sentence in the article that already describes what it shows; nothing was
placed where the article is silent. The authoritative list is
`scripts/import-app-media.mjs`; this table is generated from it.

| On the site | From (`_sources/…`) | Size |
|---|---|--:|
| `src/assets/conditions/frozen-shoulder/pendulum.webp` | `Frozen-shoulder-care/media/fs-01-pendulum.jpg` | 17 KB |
| `src/assets/conditions/frozen-shoulder/assisted-external-rotation.webp` | `Frozen-shoulder-care/media/fs-03-assisted-external-rotation.jpg` | 22 KB |
| `src/assets/conditions/frozen-shoulder/stick-assisted-elevation.webp` | `Frozen-shoulder-care/media/fs-06-stick-assisted-elevation.jpg` | 22 KB |
| `src/assets/conditions/frozen-shoulder/external-rotation-stretch.webp` | `Frozen-shoulder-care/media/fs-07-external-rotation-stretch.jpg` | 20 KB |
| `src/assets/conditions/frozen-shoulder/towel-internal-rotation.webp` | `Frozen-shoulder-care/media/fs-09-towel-internal-rotation.jpg` | 18 KB |
| `src/assets/conditions/frozen-shoulder/band-external-rotation.webp` | `Frozen-shoulder-care/media/fs-10-band-external-rotation.jpg` | 21 KB |
| `src/assets/conditions/frozen-shoulder/band-internal-rotation.webp` | `Frozen-shoulder-care/media/fs-11-band-internal-rotation.jpg` | 27 KB |
| `src/assets/conditions/frozen-shoulder/band-row.webp` | `Frozen-shoulder-care/media/fs-12-band-row.jpg` | 16 KB |
| `src/assets/conditions/frozen-shoulder/light-forward-raise.webp` | `Frozen-shoulder-care/media/fs-13-light-forward-raise.jpg` | 21 KB |
| `src/assets/conditions/frozen-shoulder/loaded-carry.webp` | `Frozen-shoulder-care/media/fs-14-loaded-carry.jpg` | 19 KB |
| `src/assets/conditions/frozen-shoulder/level-1-self-care.webp` | `Frozen-shoulder-care/media/fs-15-level1-self-care.jpg` | 17 KB |
| `src/assets/conditions/frozen-shoulder/level-2-everyday-reach.webp` | `Frozen-shoulder-care/media/fs-16-level2-everyday-reach.jpg` | 15 KB |
| `src/assets/conditions/frozen-shoulder/level-3-load.webp` | `Frozen-shoulder-care/media/fs-17-level3-load.jpg` | 17 KB |
| `src/assets/conditions/frozen-shoulder/level-4-your-life.webp` | `Frozen-shoulder-care/media/fs-18-level4-return-to-life.jpg` | 40 KB |
| `src/assets/conditions/rotator-cuff-tear/stick-assisted-elevation.webp` | `Postoperative-care-RC/images/p2_1.jpg` | 61 KB |
| `src/assets/conditions/rotator-cuff-tear/sleep-semi-reclined.webp` | `Postoperative-care-RC/images/sleep_position.jpg` | 49 KB |
| `src/assets/conditions/rotator-cuff-tear/sleep-side-lying.webp` | `Postoperative-care-RC/images/side_sleeping.jpg` | 48 KB |
| `src/assets/conditions/acl-injury/heel-prop.webp` | `Postoperative-care-ACLR/images/heel_prop.jpg` | 32 KB |
| `src/assets/conditions/acl-injury/ice-and-elevation.webp` | `Postoperative-care-ACLR/images/swelling_ice.jpg` | 34 KB |
| `src/assets/conditions/acl-injury/crutches.webp` | `Postoperative-care-ACLR/images/crutches_weightbearing.jpg` | 27 KB |
| `src/assets/conditions/acl-injury/showering.webp` | `Postoperative-care-ACLR/images/showering.jpg` | 47 KB |
| `src/assets/conditions/acl-injury/sleep-heel-on-pillow.webp` | `Postoperative-care-ACLR/images/positioning_sleep.jpg` | 32 KB |
| `src/assets/conditions/acl-injury/desk-work.webp` | `Postoperative-care-ACLR/images/driving_activity.jpg` | 65 KB |
| `src/assets/conditions/acl-injury/no-smoking.webp` | `Postoperative-care-ACLR/images/smoking_nicotine.jpg` | 18 KB |
| `src/assets/conditions/osteoporosis/sit-to-stand-hold.webp` | `Osteoporosis-care/media/exercises/sit_to_stand_hold.jpg` | 36 KB |
| `src/assets/conditions/osteoporosis/standing-marching.webp` | `Osteoporosis-care/media/exercises/standing_marching.jpg` | 38 KB |
| `src/assets/conditions/osteoporosis/weight-shifts.webp` | `Osteoporosis-care/media/exercises/weight_shifts.jpg` | 30 KB |
| `src/assets/conditions/osteoporosis/tandem-stand.webp` | `Osteoporosis-care/media/exercises/tandem_stand.jpg` | 29 KB |
| `src/assets/conditions/osteoporosis/heel-raises.webp` | `Osteoporosis-care/media/exercises/heel_raises.jpg` | 32 KB |
| `src/assets/conditions/osteoporosis/wall-pushups.webp` | `Osteoporosis-care/media/exercises/wall_pushups.jpg` | 25 KB |
| `src/assets/conditions/osteoporosis/hip-hinge.webp` | `Osteoporosis-care/media/exercises/hip_hinge.jpg` | 25 KB |
| `src/assets/conditions/osteoporosis/chin-tuck.webp` | `Osteoporosis-care/media/exercises/chin_tuck.jpg` | 43 KB |
| `src/assets/conditions/osteoporosis/scapular-squeeze.webp` | `Osteoporosis-care/media/exercises/scapular_squeeze.jpg` | 42 KB |
| `src/assets/conditions/osteoporosis/safe-pickup.webp` | `Osteoporosis-care/media/exercises/safe_pickup.jpg` | 37 KB |
| `src/assets/conditions/osteoporosis/food-calcium.webp` | `Osteoporosis-care/media/selfcare/food_calcium.jpg` | 140 KB |
| `src/assets/conditions/osteoporosis/food-vitamin-d.webp` | `Osteoporosis-care/media/selfcare/food_vitamin_d.jpg` | 130 KB |
| `src/assets/conditions/osteoporosis/safety-bedroom.webp` | `Osteoporosis-care/media/selfcare/safety_bedroom.jpg` | 48 KB |
| `src/assets/conditions/osteoporosis/safety-bathroom.webp` | `Osteoporosis-care/media/selfcare/safety_bathroom.jpg` | 53 KB |
| `src/assets/conditions/osteoporosis/safety-stairs.webp` | `Osteoporosis-care/media/selfcare/safety_stairs.jpg` | 44 KB |
| `src/assets/conditions/osteoporosis/safety-kitchen.webp` | `Osteoporosis-care/media/selfcare/safety_kitchen.jpg` | 75 KB |
| `src/assets/conditions/osteoporosis/safety-outdoors.webp` | `Osteoporosis-care/media/selfcare/safety_outdoors.jpg` | 119 KB |
| `src/assets/conditions/osteoporosis/test-chair-stand.webp` | `Osteoporosis-care/media/selfcare/test_chair_stand.jpg` | 53 KB |
| `src/assets/conditions/osteoporosis/test-tug.webp` | `Osteoporosis-care/media/selfcare/test_tug.jpg` | 44 KB |
| `src/assets/conditions/osteoporosis/med-oral-bisphosphonate.webp` | `Osteoporosis-care/media/selfcare/med_oral_bisphosphonate.jpg` | 61 KB |
| `src/assets/conditions/osteoporosis/med-zoledronate.webp` | `Osteoporosis-care/media/selfcare/med_zoledronate.jpg` | 60 KB |
| `src/assets/conditions/osteoporosis/med-denosumab.webp` | `Osteoporosis-care/media/selfcare/med_denosumab.jpg` | 54 KB |
| `src/assets/conditions/osteoporosis/med-teriparatide.webp` | `Osteoporosis-care/media/selfcare/med_teriparatide.jpg` | 57 KB |
| `src/assets/conditions/osteoporosis/med-romosozumab.webp` | `Osteoporosis-care/media/selfcare/med_romosozumab.jpg` | 43 KB |
| `public/media/frozen-shoulder/pendulum.mp4` | `Frozen-shoulder-care/media/fs-01-pendulum.mp4` | 1295 KB |
| `public/media/frozen-shoulder/finger-walk.mp4` | `Frozen-shoulder-care/media/fs-02-finger-walk.mp4` | 1197 KB |
| `public/media/frozen-shoulder/assisted-external-rotation.mp4` | `Frozen-shoulder-care/media/fs-03-assisted-external-rotation.mp4` | 1228 KB |
| `public/media/frozen-shoulder/scapular-setting.mp4` | `Frozen-shoulder-care/media/fs-04-scapular-setting.mp4` | 985 KB |
| `public/media/frozen-shoulder/wall-slide.mp4` | `Frozen-shoulder-care/media/fs-05-wall-slide.mp4` | 1865 KB |
| `public/media/frozen-shoulder/stick-assisted-elevation.mp4` | `Frozen-shoulder-care/media/fs-06-stick-assisted-elevation.mp4` | 1278 KB |
| `public/media/frozen-shoulder/external-rotation-stretch.mp4` | `Frozen-shoulder-care/media/fs-07-external-rotation-stretch.mp4` | 1176 KB |
| `public/media/frozen-shoulder/cross-body-stretch.mp4` | `Frozen-shoulder-care/media/fs-08-cross-body-stretch.mp4` | 1225 KB |
| `public/media/frozen-shoulder/towel-internal-rotation.mp4` | `Frozen-shoulder-care/media/fs-09-towel-internal-rotation.mp4` | 1316 KB |
| `public/media/frozen-shoulder/band-external-rotation.mp4` | `Frozen-shoulder-care/media/fs-10-band-external-rotation.mp4` | 1270 KB |
| `public/media/frozen-shoulder/band-internal-rotation.mp4` | `Frozen-shoulder-care/media/fs-11-band-internal-rotation.mp4` | 1322 KB |
| `public/media/frozen-shoulder/band-row.mp4` | `Frozen-shoulder-care/media/fs-12-band-row.mp4` | 1175 KB |
| `public/media/frozen-shoulder/light-forward-raise.mp4` | `Frozen-shoulder-care/media/fs-13-light-forward-raise.mp4` | 1193 KB |
| `public/media/frozen-shoulder/loaded-carry.mp4` | `Frozen-shoulder-care/media/fs-14-loaded-carry.mp4` | 1508 KB |
| `public/media/frozen-shoulder/sleep-back-supported.mp4` | `Frozen-shoulder-care/media/fs-sleep-01-back-supported.mp4` | 2324 KB |
| `public/media/frozen-shoulder/sleep-side-lying.mp4` | `Frozen-shoulder-care/media/fs-sleep-02-side-lying-pillow.mp4` | 1959 KB |
| `public/media/frozen-shoulder/sleep-propped-upright.mp4` | `Frozen-shoulder-care/media/fs-sleep-03-propped-upright.mp4` | 2168 KB |
| `public/media/frozen-shoulder/sleep-night-waking.mp4` | `Frozen-shoulder-care/media/fs-sleep-04-night-waking-mobility.mp4` | 1610 KB |
| `public/media/frozen-shoulder/ice-or-heat.mp4` | `Frozen-shoulder-care/media/fs-selfcare-01-ice-or-heat.mp4` | 1367 KB |
| `public/media/frozen-shoulder/getting-dressed.mp4` | `Frozen-shoulder-care/media/fs-selfcare-03-getting-dressed.mp4` | 1785 KB |
| `public/media/frozen-shoulder/showering.mp4` | `Frozen-shoulder-care/media/fs-selfcare-04-showering.mp4` | 1352 KB |
| `public/media/rotator-cuff-tear/pendulum.mp4` | `Postoperative-care-RC/videos/p1_1.mp4` | 365 KB |
| `public/media/rotator-cuff-tear/wrist-and-elbow.mp4` | `Postoperative-care-RC/videos/p1_2.mp4` | 244 KB |
| `public/media/rotator-cuff-tear/grip-pump.mp4` | `Postoperative-care-RC/videos/p1_3.mp4` | 223 KB |
| `public/media/rotator-cuff-tear/sling-wear.mp4` | `Postoperative-care-RC/videos/sling_wear.mp4` | 252 KB |
| `public/media/rotator-cuff-tear/activity-precautions.mp4` | `Postoperative-care-RC/videos/activity_precautions.mp4` | 325 KB |
| `public/media/rotator-cuff-tear/ice.mp4` | `Postoperative-care-RC/videos/pain_swelling.mp4` | 128 KB |
| `public/media/rotator-cuff-tear/getting-dressed.mp4` | `Postoperative-care-RC/videos/pre_3.mp4` | 371 KB |
| `public/media/rotator-cuff-tear/stick-assisted-elevation.mp4` | `Postoperative-care-RC/videos/p2_1.mp4` | 85 KB |
| `public/media/rotator-cuff-tear/wall-crawl.mp4` | `Postoperative-care-RC/videos/p2_2.mp4` | 83 KB |
| `public/media/rotator-cuff-tear/scapular-squeeze.mp4` | `Postoperative-care-RC/videos/p2_4.mp4` | 264 KB |
| `public/media/osteoporosis/chin-tuck.mp4` | `Osteoporosis-care/media/exercises/chin_tuck.mp4` | 451 KB |
| `public/media/osteoporosis/hip-hinge.mp4` | `Osteoporosis-care/media/exercises/hip_hinge.mp4` | 222 KB |
| `public/media/osteoporosis/safe-pickup.mp4` | `Osteoporosis-care/media/exercises/safe_pickup.mp4` | 835 KB |
| `public/media/osteoporosis/scapular-squeeze.mp4` | `Osteoporosis-care/media/exercises/scapular_squeeze.mp4` | 494 KB |
| `public/media/osteoporosis/sit-to-stand-hold.mp4` | `Osteoporosis-care/media/exercises/sit_to_stand_hold.mp4` | 270 KB |
| `public/media/osteoporosis/weight-shifts.mp4` | `Osteoporosis-care/media/exercises/weight_shifts.mp4` | 138 KB |
| `public/images/exercises/straight-leg-raise.webp` | `Postoperative-care-ACLR/images/pre_4.jpg` | 35 KB |

The earlier table above is the 2026-09-08 import as it was. Where a row appears
in both, this one is current. `rotator-cuff-tear/passive-forward-elevation.mp4`
is the one clip still from the first import — see below.

### Looked at and left out, and why

- **`Osteoporosis-care/media/meds/*.jpg` (seven files).** Drug boxes with real
  brand names and printed doses — FOSAMAX 70 mg, Prolia 60 mg/mL, Actonel 35 mg,
  Evenity, Forteo, Aclasta, an ibandronate 150 mg box. The site prints no doses
  and promotes no brand.
- **`Osteoporosis-care/media/selfcare/med_*.jpg` (five files)** were held
  here on 2026-09-23 — the app's own `GENERATED-MEDIA-NOTE.md` asks for a
  clinician to review injection technique — and **placed on 2026-09-24 on the
  author's instruction**, under the osteoporosis medicines table, captioned
  with each medicine's `route` line from `app-core.js`.
- **`Osteoporosis-care/media/exercises/standing_marching.mp4`** — after its
  first second it is sit-to-stand footage. **`single_leg_stand_chair.mp4`** —
  no foot leaves the floor in any sampled frame. **`tandem_walk`,
  `seated_row_band`, `backward_walk`, `hip_abduction`, `step_ups`,
  `sit_to_stand`, `single_leg_stand_chair` stills** — no card or sentence in
  the article describes them.
- **`Postoperative-care-RC/videos/p1_4.mp4`** — filed as passive forward
  elevation, shows someone icing a shoulder. The site keeps the earlier
  table-slide clip for that card. **`p2_3.mp4`** is byte-identical to `p2_1.mp4`.
- **`Postoperative-care-RC/videos/side_sleeping.mp4` and `sleep_position.mp4`**
  have Thai text burned into the picture, which the English page would show,
  and the second has a ghosted double-figure frame. The app's stills of the
  same two positions were used instead.
- **`Postoperative-care-ACLR/images/blood_clots.jpg`** rests the leg on a
  cushion under the calf and knee, beside text that says never to put a pillow
  under the knee. **`brace.jpg`** shows hands on the brace hinge beside "do not
  change the range settings yourself". **`meniscus_repair.jpg`** is a squat,
  under a section about holding squats back.
- **The ACL phase exercises (`p1_*` to `p6_*`) and their nine clips.** The
  article's phase table names no individual exercise, so there is no sentence
  for any of them to sit beside. The app is linked from the article.
- **`Frozen-shoulder-care/media/fs-selfcare-02-gentle-movement.*` and the
  level-1/level-2 clips.** The stills for the four levels are placed; a clip
  for each level would repeat them.

### The straight-leg raise

`public/images/exercises/straight-leg-raise.webp` **now holds the ACL app's
`pre_4.jpg`**, replacing the picture that showed the knee bent. The form is
right — the other knee bent, the working leg fully straight, toes up. It lifts
the leg to about the height of the other knee, where the three cards say
"about a hand's width"; the author was shown that and ruled on 2026-09-23 to
place it as it is. It is on all six cards, credited to the ACL app.

## The 2026-09-24 infographic posters

The author uploaded **42 infographic posters** to `infographics/<collection>/`
on 2026-09-24 — one for each of the 42 articles — and asked
for each to be placed in its article. They are his: every one is signed
"Sorawut" and/or `easybone.org`, and like every picture on the site they are
AI-generated (the editorial policy's disclosure covers them). They carry no
C2PA credential; provenance rests on his upload, as for the 2026-09-23 refresh.

- **Converted, not copied.** The uploads were genuine PNGs, 1122×1402 (the
  ultrasound and X-ray posters 1024×1536), 400–660 KB each, 21 MB in all. They
  are now `public/images/infographics/<collection>/<article slug>.webp` at WebP
  quality 82 — 8 MB, about 195 KB each. That quality was chosen by looking: the
  smallest lettering on the posters (the "see a doctor" row) stays crisp at 82
  and starts to smear below 75. The upload folder and its `README.txt` /
  `manifest.json` were removed once the WebP copies existed; the PNGs are in
  git history. One file was renamed on the way: `bone-density-scan-dxa.png` is
  `examinations/bone-density-scan.webp`, the article's slug.
- **Thai pages only.** Every poster is lettered in Thai, so it goes on the
  Thai article and not the English one — an English reader would get a picture
  of words they cannot read, under an `<html lang="en">` that says otherwise.
  English versions, if he makes them, drop into the same place.
- **Placed directly under the `<KeyFacts>` "สรุปสั้น ๆ" box**, before the first
  `##` (on ultrasound, after the lead picture that already sat there). A poster
  is the article's outline in one picture — what it is, symptoms, first-line
  care, when to see a doctor — so it belongs with the summary, before the
  detail. It also puts his "พบแพทย์เมื่อ" row in the first screen or two.
- **`<Figure enlarge>`** makes the picture and a "แตะที่ภาพเพื่อดูขนาดเต็ม" line
  one link to the full-size file, where a phone can pinch-zoom it; the posters
  show at the full 34rem figure width rather than the 20rem portrait-photo
  cap, which would shrink the lettering to about 7px.
- **Alt text transcribes the poster** — its headings and items in order —
  because a poster made of words is content, not decoration, and a screen
  reader user should get the same summary a sighted reader does. The caption
  is short ("สรุปเรื่อง… ในภาพเดียว") so it does not repeat the alt aloud.

**Every poster was read against its article before placing.** Claims with a
number or a named product were checked in the text: DXA 10–20 minutes, MRI
20–60 minutes, the ACL's ice 15–20 minutes, the balance programme's "more than
3 months", the injection poster's "rest the joint 24–48 hours" (the article
says "a day or two… avoid heavy use"), and the pain-medicine poster's
paracetamol, ibuprofen and diclofenac (all named in the article; generic
names, no brands, no doses). All agree.

**`basics/arthroscopic-surgery` was held for a day, then placed on the
author's ruling, with the article adjusted to match.** Its "ข้อดี" row lists
"ฟื้นตัวเร็ว" (recovers quickly), and the article used to answer
"แผลเล็กแปลว่าฟื้นตัวเร็วใช่ไหม" with a flat "ไม่ใช่". Shown the conflict on
2026-09-24, he said to place the poster as it is and to make the article say
what he means: **the small incision itself heals faster than an open
incision, but recovery inside the joint is a separate matter that depends on
each procedure.** The summary, the KeyFacts line, the FAQ answer and the
"แผลเล็กไม่ได้แปลว่าเรื่องเล็ก" section now say that, in both languages; the
list of procedures and their timetables is unchanged. Keep the two halves
together in any later edit — "keyhole heals faster" without "inside depends on
the procedure" is the misunderstanding the section exists to prevent.

**Moved to the end of each article on 2026-09-24**, on the author's
instruction, under a `## สรุปเป็นภาพ` heading of its own — a recap to review
after reading rather than a preview before it. The captions went with the
move; the heading says what they said.

**Replaced on 2026-09-24:** the author uploaded new WebP files over all 22
condition posters. Compared pixel by pixel with what they replaced, 19
differ in under 0.5% of their pixels — a re-export, same content. Three were
redrawn, and each was read again: `rotator-cuff-tear` (the "ต้ตนอก"
misspelling is gone; it now says some cases may need surgery depending on the
tear and daily use, and ends "if the pain is severe, the arm cannot be raised
or it does not improve, see a doctor"), `hip-pain` (its "see a doctor" row now
has "severe hip pain or pain at night", which the article's `seeDoctorSoon`
already lists) and `ankle-sprain` (same content, cleaner lettering). The alt
text of the first two was rewritten to match.

**Placed, but with a lettering error the author was told about** (the first
is fixed by the replacement above; the second is still live):

- `conditions/rotator-cuff-tear` — "ปวดไหล่**ต้ตนอก**" should read
  "ปวดไหล่**ด้านนอก**" (the first symptom).
- `rehabilitation/knee-rehab` — the subtitle's "กล้าม**เนือ**" is missing its
  tone mark: "กล้าม**เนื้อ**".

Minor, and his to decide: `conditions/knee-pain` labels the kneecap
"ลูกสะบ้า" and asks "ปวดเมื่อไร", where the site's settled spellings are
"กระดูกสะบ้า" and "เมื่อไหร่"; `treatments/surgery` also uses "เมื่อไร". The
ultrasound poster's last line has a slightly smeared "และการ". Re-uploading a
corrected PNG and re-running the conversion replaces the file in place — the
path does not change.

## Where attribution appears

In the `<Figure>` caption, via the `attribution` and `license` props — not in a
credits page. The reader should see where a figure came from without leaving the
article. `npm run lint:content` warns on a `<Figure>` with no `attribution` and
fails on one with no `alt`.

`<Figure>` also takes `width`/`height` for a picture given as a path, for the
reason `<ExerciseCard>`'s `imageWidth`/`imageHeight` exists: a path carries no
dimensions, so the figure lays out with a zero-height box and reflows the
article when the lazy file arrives. All 102 path-based figures carry both.

`<ExerciseCard>` does the same through `imageAttribution`, which renders under
the picture exactly as a figcaption does. The prop was added on 2026-09-17 with
the exercise set; the app-derived cards in frozen-shoulder, osteoporosis and
rotator-cuff-tear predate it and carry their credit as a line of body text
instead, because that wording is still the author's to confirm and migrating it
would have meant rewriting it.

`lint:content` also fails on an `<ExerciseCard image="/…">` whose file is not in
`public/`, the same check it already ran on `<Figure>` and `<Video>`. The
component throws when an image has no `imageAlt`, but it cannot tell whether the
file exists — a string path goes straight to `<img>`, so a typo would render a
broken picture on a published page rather than fail the build.

## Open question

Servier Medical Art (CC BY 4.0) covers most joints and would give the whole site
one consistent anatomical style. If used, the caption needs
"Servier Medical Art, CC BY 4.0" and the licence requires that attribution be
kept.

The author has confirmed he knows the provenance of the media in his four
patient-care apps and that it may be used on this site. The **exact attribution
wording is still his to confirm** — the proposal above is in use on the four
app-derived articles, which are all `draft: true` and therefore not published,
so nothing goes public under wording he has not read.
