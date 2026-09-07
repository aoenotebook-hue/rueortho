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
import { readFile, writeFile, mkdir, copyFile, stat } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import sharp from 'sharp';

const SRC = '_sources';
const IMG_OUT = 'src/assets/conditions';
const VID_OUT = 'public/media';
const MAX_EDGE = 1200;

/** [source path, destination slug, destination basename] */
const images = [
  // frozen-shoulder
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
  ['Frozen-shoulder-care/media/fs-selfcare-04-showering.jpg', 'frozen-shoulder', 'showering'],

  // rotator-cuff-tear (post-operative). p2_1 is byte-identical to the frozen
  // shoulder stick-elevation still, so it is imported once, under this slug too,
  // because the two articles caption it differently.
  ['Postoperative-care-RC/images/p2_1.jpg', 'rotator-cuff-tear', 'stick-assisted-elevation'],

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
  ['Osteoporosis-care/media/exercises/Picking things up safely.jpg', 'osteoporosis', 'safe-pickup'],
  // osteoporosis — food, safety and self-test
  ['Osteoporosis-care/media/selfcare/food_calcium.jpg', 'osteoporosis', 'food-calcium'],
  ['Osteoporosis-care/media/selfcare/food_vitamin_d.jpg', 'osteoporosis', 'food-vitamin-d'],
  ['Osteoporosis-care/media/selfcare/safety_bathroom.jpg', 'osteoporosis', 'safety-bathroom'],
  ['Osteoporosis-care/media/selfcare/safety_stairs.jpg', 'osteoporosis', 'safety-stairs'],
  ['Osteoporosis-care/media/selfcare/test_chair_stand.jpg', 'osteoporosis', 'test-chair-stand'],
];

const videos = [
  ['Frozen-shoulder-care/media/fs-02-finger-walk.mp4', 'frozen-shoulder', 'finger-walk'],
  ['Frozen-shoulder-care/media/fs-04-scapular-setting.mp4', 'frozen-shoulder', 'scapular-setting'],
  ['Frozen-shoulder-care/media/fs-05-wall-slide.mp4', 'frozen-shoulder', 'wall-slide'],
  ['Frozen-shoulder-care/media/fs-08-cross-body-stretch.mp4', 'frozen-shoulder', 'cross-body-stretch'],
  ['Frozen-shoulder-care/media/fs-sleep-01-back-supported.mp4', 'frozen-shoulder', 'sleep-back-supported'],
  ['Frozen-shoulder-care/media/fs-sleep-02-side-lying-pillow.mp4', 'frozen-shoulder', 'sleep-side-lying'],
  ['Frozen-shoulder-care/media/fs-sleep-03-propped-upright.mp4', 'frozen-shoulder', 'sleep-propped-upright'],
  ['Frozen-shoulder-care/media/fs-sleep-04-night-waking-mobility.mp4', 'frozen-shoulder', 'sleep-night-waking'],
  ['Frozen-shoulder-care/media/fs-selfcare-01-ice-or-heat.mp4', 'frozen-shoulder', 'ice-or-heat'],
  ['Frozen-shoulder-care/media/fs-selfcare-03-getting-dressed.mp4', 'frozen-shoulder', 'getting-dressed'],

  ['Postoperative-care-RC/videos/p1_1.mp4', 'rotator-cuff-tear', 'pendulum'],
  ['Postoperative-care-RC/videos/p1_2.mp4', 'rotator-cuff-tear', 'wrist-and-elbow'],
  ['Postoperative-care-RC/videos/p1_3.mp4', 'rotator-cuff-tear', 'grip-pump'],
  ['Postoperative-care-RC/videos/p1_4.mp4', 'rotator-cuff-tear', 'passive-forward-elevation'],
  ['Postoperative-care-RC/videos/sling_wear.mp4', 'rotator-cuff-tear', 'sling-wear'],
  ['Postoperative-care-RC/videos/activity_precautions.mp4', 'rotator-cuff-tear', 'activity-precautions'],
  ['Postoperative-care-RC/videos/dressing.mp4', 'rotator-cuff-tear', 'getting-dressed'],
  ['Postoperative-care-RC/videos/sleep_position.mp4', 'rotator-cuff-tear', 'sleep-semi-reclined'],
  ['Postoperative-care-RC/videos/side_sleeping.mp4', 'rotator-cuff-tear', 'sleep-side-lying'],
  ['Postoperative-care-RC/videos/pain_swelling.mp4', 'rotator-cuff-tear', 'pain-and-swelling'],
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
for (const [from, slug, name] of videos) {
  const bytes = await readFile(join(SRC, from));
  const hash = createHash('sha256').update(bytes).digest('hex');
  const out = join(VID_OUT, slug, `${name}.mp4`);

  if (seen.has(hash)) {
    rows.push({ kind: 'video-dup', from, out, before: bytes.length, after: 0, note: `identical to ${seen.get(hash)}` });
    continue;
  }
  seen.set(hash, out);
  await mkdir(dirname(out), { recursive: true });
  await copyFile(join(SRC, from), out);
  rows.push({ kind: 'video', from, out, before: bytes.length, after: bytes.length, note: '' });
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
