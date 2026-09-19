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

## The AI disclosure, and image reuse — settled 2026-09-19

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
| `images/figures/knee-anatomy-placeholder.svg` | Drawn for this project | Project's own | placeholder caption | 2026-09-06 |
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

**`self-care-mechanism.jpg` is deliberately unplaced.** Two of its three panels
show a knee sleeve being put on and then worn outdoors. Nothing in the self-care
article recommends a brace or support — the only mention of one anywhere in
these collections is a question to *ask* a doctor, in `knee-rehab` — so placing
it would put a treatment on the page that the author never wrote. It is the one
file in the two folders with no referrer.

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

**`straight-leg-raise.jpg` is deliberately unplaced.** The picture shows the
raised leg with the knee bent to about a right angle, and every card it would
have gone on (knee-pain, meniscus-tear, meniscus-root-tear) says in its own
"watch for" line that the knee must stay straight throughout. An illustration
that contradicts the instruction beside it teaches the wrong movement, so the
file stays in the folder until the author decides whether to redraw it or to
retitle the exercise. It is the one file in the set with no referrer, and
nothing on the site links to it.

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
