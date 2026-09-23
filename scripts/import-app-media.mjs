/**
 * One-off importer for the media that ships inside the author's four patient
 * apps (`_sources/`, git-ignored). It is kept in the repo so the import can be
 * re-run and audited, not because it runs in the build.
 *
 *   node scripts/import-app-media.mjs
 *
 * Images  → WebP, long edge capped at 1200 px, into src/assets/conditions/<slug>/
 *           so astro:assets can still emit responsive widths from them.
 * Videos  → deduplicated by content hash and copied verbatim into
 *           public/media/<slug>/. They are never transcoded here: no ffmpeg in
 *           the toolchain, and re-encoding without checking each frame would
 *           risk exactly the anatomical drift the app's own video-prompts.md
 *           warns about.
 *
 * Six of the twenty-two video files are byte-identical across the frozen
 * shoulder and rotator cuff apps, so the hash map below keeps one copy and
 * points both articles at it.
 */
import { createHash } from 'node:crypto';
import { readFile, writeFile, mkdir, copyFile, rm, stat } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import sharp from 'sharp';

const SRC = '_sources';
const IMG_OUT = 'src/assets/conditions';
const VID_OUT = 'public/media';
const MAX_EDGE = 1200;

/**
 * [source path, destination slug, destination basename]
 *
 * Re-run on 2026-09-23 against the apps as they stood that day. The author had
 * re-cut most of the media since the first import (2026-09-08): new stills for
 * every frozen shoulder topic, a clip for every frozen shoulder exercise, a
 * full ACL set, re-encoded rotator cuff clips a seventh of the size, and new
 * osteoporosis clips. Every file below was looked at — the stills on a contact
 * sheet, the clips as five frames each — and matched to the sentence it sits
 * beside before it was listed. What was left out, and why, is in
 * docs/IMAGE-SOURCES.md.
 */
const images = [
  // frozen-shoulder — exercise and self-care stills; also the posters of the
  // exercise cards that now carry the clip too
  ['Frozen-shoulder-care/media/fs-01-pendulum.jpg', 'frozen-shoulder', 'pendulum'],
  ['Frozen-shoulder-care/media/fs-03-assisted-external-rotation.jpg', 'frozen-shoulder', 'assisted-external-rotation'],
  ['Frozen-shoulder-care/media/fs-06-stick-assisted-elevation.jpg', 'frozen-shoulder', 'stick-assisted-elevation'],
  ['Frozen-shoulder-care/media/fs-07-external-rotation-stretch.jpg', 'frozen-shoulder', 'external-rotation-stretch'],
  ['Frozen-shoulder-care/media/fs-09-towel-internal-rotation.jpg', 'frozen-shoulder', 'towel-internal-rotation'],
  ['Frozen-shoulder-care/media/fs-10-band-external-rotation.jpg', 'frozen-shoulder', 'band-external-rotation'],
  ['Frozen-shoulder-care/media/fs-11-band-internal-rotation.jpg', 'frozen-shoulder', 'band-internal-rotation'],
  ['Frozen-shoulder-care/media/fs-12-band-row.jpg', 'frozen-shoulder', 'band-row'],
  ['Frozen-shoulder-care/media/fs-13-light-forward-raise.jpg', 'frozen-shoulder', 'light-forward-raise'],
  ['Frozen-shoulder-care/media/fs-14-loaded-carry.jpg', 'frozen-shoulder', 'loaded-carry'],
  ['Frozen-shoulder-care/media/fs-15-level1-self-care.jpg', 'frozen-shoulder', 'level-1-self-care'],
  ['Frozen-shoulder-care/media/fs-16-level2-everyday-reach.jpg', 'frozen-shoulder', 'level-2-everyday-reach'],
  ['Frozen-shoulder-care/media/fs-17-level3-load.jpg', 'frozen-shoulder', 'level-3-load'],
  ['Frozen-shoulder-care/media/fs-18-level4-return-to-life.jpg', 'frozen-shoulder', 'level-4-your-life'],

  // rotator-cuff-tear. The two sleep pictures replace frozen shoulder clips
  // that showed no sling beside text saying to wear it while sleeping.
  ['Postoperative-care-RC/images/p2_1.jpg', 'rotator-cuff-tear', 'stick-assisted-elevation'],
  ['Postoperative-care-RC/images/sleep_position.jpg', 'rotator-cuff-tear', 'sleep-semi-reclined'],
  ['Postoperative-care-RC/images/side_sleeping.jpg', 'rotator-cuff-tear', 'sleep-side-lying'],

  // acl-injury — the practical care sections, one picture per instruction it
  // shows. blood_clots.jpg (a cushion under the knee) and brace.jpg (hands on
  // the hinge beside "do not change the settings yourself") are left out.
  ['Postoperative-care-ACLR/images/heel_prop.jpg', 'acl-injury', 'heel-prop'],
  ['Postoperative-care-ACLR/images/swelling_ice.jpg', 'acl-injury', 'ice-and-elevation'],
  ['Postoperative-care-ACLR/images/crutches_weightbearing.jpg', 'acl-injury', 'crutches'],
  ['Postoperative-care-ACLR/images/showering.jpg', 'acl-injury', 'showering'],
  ['Postoperative-care-ACLR/images/positioning_sleep.jpg', 'acl-injury', 'sleep-heel-on-pillow'],
  ['Postoperative-care-ACLR/images/driving_activity.jpg', 'acl-injury', 'desk-work'],
  ['Postoperative-care-ACLR/images/smoking_nicotine.jpg', 'acl-injury', 'no-smoking'],

  // osteoporosis — exercise demonstrations
  ['Osteoporosis-care/media/exercises/sit_to_stand_hold.jpg', 'osteoporosis', 'sit-to-stand-hold'],
  ['Osteoporosis-care/media/exercises/standing_marching.jpg', 'osteoporosis', 'standing-marching'],
  ['Osteoporosis-care/media/exercises/weight_shifts.jpg', 'osteoporosis', 'weight-shifts'],
  ['Osteoporosis-care/media/exercises/tandem_stand.jpg', 'osteoporosis', 'tandem-stand'],
  ['Osteoporosis-care/media/exercises/heel_raises.jpg', 'osteoporosis', 'heel-raises'],
  ['Osteoporosis-care/media/exercises/wall_pushups.jpg', 'osteoporosis', 'wall-pushups'],
  ['Osteoporosis-care/media/exercises/hip_hinge.jpg', 'osteoporosis', 'hip-hinge'],
  ['Osteoporosis-care/media/exercises/chin_tuck.jpg', 'osteoporosis', 'chin-tuck'],
  ['Osteoporosis-care/media/exercises/scapular_squeeze.jpg', 'osteoporosis', 'scapular-squeeze'],
  ['Osteoporosis-care/media/exercises/safe_pickup.jpg', 'osteoporosis', 'safe-pickup'],
  // osteoporosis — food, home safety and self-tests
  ['Osteoporosis-care/media/selfcare/food_calcium.jpg', 'osteoporosis', 'food-calcium'],
  ['Osteoporosis-care/media/selfcare/food_vitamin_d.jpg', 'osteoporosis', 'food-vitamin-d'],
  ['Osteoporosis-care/media/selfcare/safety_bedroom.jpg', 'osteoporosis', 'safety-bedroom'],
  ['Osteoporosis-care/media/selfcare/safety_bathroom.jpg', 'osteoporosis', 'safety-bathroom'],
  ['Osteoporosis-care/media/selfcare/safety_stairs.jpg', 'osteoporosis', 'safety-stairs'],
  ['Osteoporosis-care/media/selfcare/safety_kitchen.jpg', 'osteoporosis', 'safety-kitchen'],
  ['Osteoporosis-care/media/selfcare/safety_outdoors.jpg', 'osteoporosis', 'safety-outdoors'],
  ['Osteoporosis-care/media/selfcare/test_chair_stand.jpg', 'osteoporosis', 'test-chair-stand'],
  ['Osteoporosis-care/media/selfcare/test_tug.jpg', 'osteoporosis', 'test-tug'],
];

/**
 * [source path, destination slug, destination basename, poster still or null]
 *
 * A poster still is the app's own photograph of the same scene, written as
 * `<name>.poster.webp` so `<Video>` opens onto it. Clips without one get a
 * frame cut from themselves by scripts/make-video-posters.mjs. A clip that
 * replaces an older file loses its old poster here, so that script cuts a
 * fresh one rather than keeping a frame from the previous clip.
 */
const videos = [
  // frozen-shoulder: the ten clips the article already used, re-cut, and one
  // for every exercise card that had only a still
  ['Frozen-shoulder-care/media/fs-01-pendulum.mp4', 'frozen-shoulder', 'pendulum', null],
  ['Frozen-shoulder-care/media/fs-02-finger-walk.mp4', 'frozen-shoulder', 'finger-walk', 'Frozen-shoulder-care/media/fs-02-finger-walk.jpg'],
  ['Frozen-shoulder-care/media/fs-03-assisted-external-rotation.mp4', 'frozen-shoulder', 'assisted-external-rotation', null],
  ['Frozen-shoulder-care/media/fs-04-scapular-setting.mp4', 'frozen-shoulder', 'scapular-setting', 'Frozen-shoulder-care/media/fs-04-scapular-setting.jpg'],
  // The wall-slide still is drawn in the set's style and the clip is not, so
  // its poster is cut from the clip instead.
  ['Frozen-shoulder-care/media/fs-05-wall-slide.mp4', 'frozen-shoulder', 'wall-slide', null],
  ['Frozen-shoulder-care/media/fs-06-stick-assisted-elevation.mp4', 'frozen-shoulder', 'stick-assisted-elevation', null],
  ['Frozen-shoulder-care/media/fs-07-external-rotation-stretch.mp4', 'frozen-shoulder', 'external-rotation-stretch', null],
  ['Frozen-shoulder-care/media/fs-08-cross-body-stretch.mp4', 'frozen-shoulder', 'cross-body-stretch', 'Frozen-shoulder-care/media/fs-08-cross-body-stretch.jpg'],
  ['Frozen-shoulder-care/media/fs-09-towel-internal-rotation.mp4', 'frozen-shoulder', 'towel-internal-rotation', null],
  ['Frozen-shoulder-care/media/fs-10-band-external-rotation.mp4', 'frozen-shoulder', 'band-external-rotation', null],
  ['Frozen-shoulder-care/media/fs-11-band-internal-rotation.mp4', 'frozen-shoulder', 'band-internal-rotation', null],
  ['Frozen-shoulder-care/media/fs-12-band-row.mp4', 'frozen-shoulder', 'band-row', null],
  ['Frozen-shoulder-care/media/fs-13-light-forward-raise.mp4', 'frozen-shoulder', 'light-forward-raise', null],
  ['Frozen-shoulder-care/media/fs-14-loaded-carry.mp4', 'frozen-shoulder', 'loaded-carry', null],
  ['Frozen-shoulder-care/media/fs-sleep-01-back-supported.mp4', 'frozen-shoulder', 'sleep-back-supported', 'Frozen-shoulder-care/media/fs-sleep-01-back-supported.jpg'],
  ['Frozen-shoulder-care/media/fs-sleep-02-side-lying-pillow.mp4', 'frozen-shoulder', 'sleep-side-lying', 'Frozen-shoulder-care/media/fs-sleep-02-side-lying-pillow.jpg'],
  ['Frozen-shoulder-care/media/fs-sleep-03-propped-upright.mp4', 'frozen-shoulder', 'sleep-propped-upright', 'Frozen-shoulder-care/media/fs-sleep-03-propped-upright.jpg'],
  ['Frozen-shoulder-care/media/fs-sleep-04-night-waking-mobility.mp4', 'frozen-shoulder', 'sleep-night-waking', 'Frozen-shoulder-care/media/fs-sleep-04-night-waking-mobility.jpg'],
  ['Frozen-shoulder-care/media/fs-selfcare-01-ice-or-heat.mp4', 'frozen-shoulder', 'ice-or-heat', 'Frozen-shoulder-care/media/fs-selfcare-01-ice-or-heat.jpg'],
  ['Frozen-shoulder-care/media/fs-selfcare-03-getting-dressed.mp4', 'frozen-shoulder', 'getting-dressed', 'Frozen-shoulder-care/media/fs-selfcare-03-getting-dressed.jpg'],
  ['Frozen-shoulder-care/media/fs-selfcare-04-showering.mp4', 'frozen-shoulder', 'showering', 'Frozen-shoulder-care/media/fs-selfcare-04-showering.jpg'],

  // rotator-cuff-tear. Same content as the clips they replace, re-encoded by
  // the author at a seventh of the size. p1_4.mp4 is NOT here: it is filed as
  // passive forward elevation but shows someone icing a shoulder, so the
  // table-slide clip already in public/ stays.
  ['Postoperative-care-RC/videos/p1_1.mp4', 'rotator-cuff-tear', 'pendulum', null],
  ['Postoperative-care-RC/videos/p1_2.mp4', 'rotator-cuff-tear', 'wrist-and-elbow', null],
  ['Postoperative-care-RC/videos/p1_3.mp4', 'rotator-cuff-tear', 'grip-pump', null],
  ['Postoperative-care-RC/videos/sling_wear.mp4', 'rotator-cuff-tear', 'sling-wear', null],
  ['Postoperative-care-RC/videos/activity_precautions.mp4', 'rotator-cuff-tear', 'activity-precautions', null],
  ['Postoperative-care-RC/videos/pain_swelling.mp4', 'rotator-cuff-tear', 'ice', null],
  // pre_3 is "wearing a shirt": lean forward, operated arm first — word for
  // word the caption the article used to put under a frozen shoulder clip.
  ['Postoperative-care-RC/videos/pre_3.mp4', 'rotator-cuff-tear', 'getting-dressed', null],
  ['Postoperative-care-RC/videos/p2_1.mp4', 'rotator-cuff-tear', 'stick-assisted-elevation', null],
  ['Postoperative-care-RC/videos/p2_2.mp4', 'rotator-cuff-tear', 'wall-crawl', null],
  ['Postoperative-care-RC/videos/p2_4.mp4', 'rotator-cuff-tear', 'scapular-squeeze', null],

  // osteoporosis — clips for the cards that had only a still. standing_marching
  // (sit-to-stand footage after its first second) and single_leg_stand_chair
  // (no foot ever leaves the floor) are left out.
  ['Osteoporosis-care/media/exercises/chin_tuck.mp4', 'osteoporosis', 'chin-tuck', null],
  ['Osteoporosis-care/media/exercises/hip_hinge.mp4', 'osteoporosis', 'hip-hinge', null],
  ['Osteoporosis-care/media/exercises/safe_pickup.mp4', 'osteoporosis', 'safe-pickup', null],
  ['Osteoporosis-care/media/exercises/scapular_squeeze.mp4', 'osteoporosis', 'scapular-squeeze', null],
  ['Osteoporosis-care/media/exercises/sit_to_stand_hold.mp4', 'osteoporosis', 'sit-to-stand-hold', null],
  ['Osteoporosis-care/media/exercises/weight_shifts.mp4', 'osteoporosis', 'weight-shifts', null],
];

/**
 * Loose files: [source path, destination, max edge]. The straight-leg raise
 * replaces a picture that showed the knee bent — this one, from the ACL app's
 * pre-operative set, has the other knee bent and the working leg straight.
 */
const loose = [
  ['Postoperative-care-ACLR/images/pre_4.jpg', 'public/images/exercises/straight-leg-raise.webp', 1024],
];

const rows = [];

for (const [from, slug, name] of images) {
  const out = join(IMG_OUT, slug, `${name}.webp`);
  await mkdir(dirname(out), { recursive: true });

  const input = sharp(join(SRC, from));
  const meta = await input.metadata();
  await input
    .resize({
      width: meta.width >= meta.height ? MAX_EDGE : null,
      height: meta.height > meta.width ? MAX_EDGE : null,
      withoutEnlargement: true,
    })
    .webp({ quality: 78 })
    .toFile(out);

  const before = (await stat(join(SRC, from))).size;
  const after = (await stat(out)).size;
  rows.push({ kind: 'image', from, out, before, after, note: `${meta.format} ${meta.width}×${meta.height}` });
}

const seen = new Map();
for (const [from, slug, name, still] of videos) {
  const bytes = await readFile(join(SRC, from));
  const hash = createHash('sha256').update(bytes).digest('hex');
  const out = join(VID_OUT, slug, `${name}.mp4`);
  const poster = out.replace(/\.mp4$/, '.poster.webp');

  if (seen.has(hash)) {
    rows.push({ kind: 'video-dup', from, out, before: bytes.length, after: 0, note: `identical to ${seen.get(hash)}` });
    continue;
  }
  seen.set(hash, out);
  await mkdir(dirname(out), { recursive: true });

  let changed = true;
  try {
    changed = createHash('sha256').update(await readFile(out)).digest('hex') !== hash;
  } catch {
    /* new file */
  }
  if (changed) {
    await copyFile(join(SRC, from), out);
    await rm(poster, { force: true });
  }
  if (still) {
    await sharp(join(SRC, still)).resize({ width: 960, withoutEnlargement: true }).webp({ quality: 72 }).toFile(poster);
  }
  rows.push({ kind: 'video', from, out, before: bytes.length, after: bytes.length, note: changed ? (still ? 'poster from still' : 'poster to cut') : 'unchanged' });
}

for (const [from, out, edge] of loose) {
  await mkdir(dirname(out), { recursive: true });
  await sharp(join(SRC, from))
    .resize({ width: edge, height: edge, fit: 'inside', withoutEnlargement: true })
    .webp({ quality: 85 })
    .toFile(out);
  rows.push({ kind: 'image', from, out, before: (await stat(join(SRC, from))).size, after: (await stat(out)).size, note: '' });
}

const kb = (n) => `${Math.round(n / 1024)} KB`;
for (const r of rows) {
  console.log(`${r.kind.padEnd(9)} ${r.out.padEnd(58)} ${kb(r.before).padStart(8)} → ${kb(r.after).padStart(8)}  ${r.note}`);
}
const before = rows.reduce((n, r) => n + r.before, 0);
const after = rows.reduce((n, r) => n + r.after, 0);
console.log(`\n${rows.length} files: ${kb(before)} → ${kb(after)}`);
await writeFile(
  'scripts/.import-app-media.report.json',
  JSON.stringify(rows, null, 2) + '\n',
);
