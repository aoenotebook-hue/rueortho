import type { ImageMetadata } from 'astro';

/**
 * The poster frame of each demonstration clip, for its gallery-card icon.
 *
 * The author asked on 2026-09-20 for every card on the videos tab to carry a
 * picture from inside that clip. There already is one:
 * `scripts/make-video-posters.mjs` cuts a frame at 20% of each clip's duration
 * to `<name>.poster.webp` beside it, and `<Video>` picks that up by
 * convention. This file hands the same frame to `Card.astro`, so a gallery row
 * shows what the clip shows rather than a generic play glyph.
 *
 * **The posters live in `public/`, so they are imported by project-root path.**
 * Vite resolves it and Astro treats the file as an ordinary asset, which is
 * what lets `<Image>` emit a ~3 KB webp for the 56/68px box instead of serving
 * the 960px poster — 17–40 KB each, 520 KB for the set — behind a thumbnail.
 * The originals stay in `dist/media/` for `<Video>` to use.
 *
 * **Sixteen explicit imports rather than an `import.meta.glob`**, for the
 * reason `lib/topic-images.ts` records at length: an eager glob imports
 * everything it matches and Astro emits every module it has imported, so the
 * glob version of that file put 8 MB of unrequested full-size copies into
 * `dist/_astro/`. Explicit imports also fail the build when a poster is
 * renamed, rather than the card quietly losing its picture.
 *
 * Six clips are byte-identical across the frozen-shoulder and rotator-cuff
 * apps and are stored once, so there are sixteen files for nineteen gallery
 * rows per locale — two rows can legitimately share a poster, exactly as they
 * share a clip.
 */
import crossBodyStretch from '/public/media/frozen-shoulder/cross-body-stretch.poster.webp';
import fingerWalk from '/public/media/frozen-shoulder/finger-walk.poster.webp';
import gettingDressed from '/public/media/frozen-shoulder/getting-dressed.poster.webp';
import iceOrHeat from '/public/media/frozen-shoulder/ice-or-heat.poster.webp';
import scapularSetting from '/public/media/frozen-shoulder/scapular-setting.poster.webp';
import sleepBackSupported from '/public/media/frozen-shoulder/sleep-back-supported.poster.webp';
import sleepNightWaking from '/public/media/frozen-shoulder/sleep-night-waking.poster.webp';
import sleepProppedUpright from '/public/media/frozen-shoulder/sleep-propped-upright.poster.webp';
import sleepSideLying from '/public/media/frozen-shoulder/sleep-side-lying.poster.webp';
import wallSlide from '/public/media/frozen-shoulder/wall-slide.poster.webp';
import activityPrecautions from '/public/media/rotator-cuff-tear/activity-precautions.poster.webp';
import gripPump from '/public/media/rotator-cuff-tear/grip-pump.poster.webp';
import passiveForwardElevation from '/public/media/rotator-cuff-tear/passive-forward-elevation.poster.webp';
import pendulum from '/public/media/rotator-cuff-tear/pendulum.poster.webp';
import slingWear from '/public/media/rotator-cuff-tear/sling-wear.poster.webp';
import wristAndElbow from '/public/media/rotator-cuff-tear/wrist-and-elbow.poster.webp';

const posters: Record<string, ImageMetadata> = {
  '/media/frozen-shoulder/cross-body-stretch.poster.webp': crossBodyStretch,
  '/media/frozen-shoulder/finger-walk.poster.webp': fingerWalk,
  '/media/frozen-shoulder/getting-dressed.poster.webp': gettingDressed,
  '/media/frozen-shoulder/ice-or-heat.poster.webp': iceOrHeat,
  '/media/frozen-shoulder/scapular-setting.poster.webp': scapularSetting,
  '/media/frozen-shoulder/sleep-back-supported.poster.webp': sleepBackSupported,
  '/media/frozen-shoulder/sleep-night-waking.poster.webp': sleepNightWaking,
  '/media/frozen-shoulder/sleep-propped-upright.poster.webp': sleepProppedUpright,
  '/media/frozen-shoulder/sleep-side-lying.poster.webp': sleepSideLying,
  '/media/frozen-shoulder/wall-slide.poster.webp': wallSlide,
  '/media/rotator-cuff-tear/activity-precautions.poster.webp': activityPrecautions,
  '/media/rotator-cuff-tear/grip-pump.poster.webp': gripPump,
  '/media/rotator-cuff-tear/passive-forward-elevation.poster.webp': passiveForwardElevation,
  '/media/rotator-cuff-tear/pendulum.poster.webp': pendulum,
  '/media/rotator-cuff-tear/sling-wear.poster.webp': slingWear,
  '/media/rotator-cuff-tear/wrist-and-elbow.poster.webp': wristAndElbow,
};

/**
 * The poster for one clip, found from the clip's own `src` by the same
 * `.mp4` → `.poster.webp` rule `<Video>` uses — never from a second list that
 * could name a different file than the player shows. A clip with no poster
 * returns `undefined`, and its card falls back to the play glyph.
 */
export function getVideoPoster(src: string): ImageMetadata | undefined {
  return posters[src.replace(/\.mp4$/, '.poster.webp')];
}
