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
