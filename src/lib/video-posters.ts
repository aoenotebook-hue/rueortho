import type { ImageMetadata } from 'astro';
import frozenAssistedExternalRotation from '../assets/conditions/frozen-shoulder/assisted-external-rotation.webp';
import frozenBandExternalRotation from '../assets/conditions/frozen-shoulder/band-external-rotation.webp';
import frozenBandInternalRotation from '../assets/conditions/frozen-shoulder/band-internal-rotation.webp';
import frozenBandRow from '../assets/conditions/frozen-shoulder/band-row.webp';
import frozenCrossBodyStretch from '/public/media/frozen-shoulder/cross-body-stretch.poster.webp';
import frozenExternalRotationStretch from '../assets/conditions/frozen-shoulder/external-rotation-stretch.webp';
import frozenFingerWalk from '/public/media/frozen-shoulder/finger-walk.poster.webp';
import frozenGettingDressed from '/public/media/frozen-shoulder/getting-dressed.poster.webp';
import frozenIceOrHeat from '/public/media/frozen-shoulder/ice-or-heat.poster.webp';
import frozenLightForwardRaise from '../assets/conditions/frozen-shoulder/light-forward-raise.webp';
import frozenLoadedCarry from '../assets/conditions/frozen-shoulder/loaded-carry.webp';
import frozenPendulum from '../assets/conditions/frozen-shoulder/pendulum.webp';
import frozenScapularSetting from '/public/media/frozen-shoulder/scapular-setting.poster.webp';
import frozenShowering from '/public/media/frozen-shoulder/showering.poster.webp';
import frozenSleepBackSupported from '/public/media/frozen-shoulder/sleep-back-supported.poster.webp';
import frozenSleepNightWaking from '/public/media/frozen-shoulder/sleep-night-waking.poster.webp';
import frozenSleepProppedUpright from '/public/media/frozen-shoulder/sleep-propped-upright.poster.webp';
import frozenSleepSideLying from '/public/media/frozen-shoulder/sleep-side-lying.poster.webp';
import frozenStickAssistedElevation from '../assets/conditions/frozen-shoulder/stick-assisted-elevation.webp';
import frozenTowelInternalRotation from '../assets/conditions/frozen-shoulder/towel-internal-rotation.webp';
import frozenWallSlide from '/public/media/frozen-shoulder/wall-slide.poster.webp';
import osteoporosisChinTuck from '../assets/conditions/osteoporosis/chin-tuck.webp';
import osteoporosisHipHinge from '../assets/conditions/osteoporosis/hip-hinge.webp';
import osteoporosisSafePickup from '../assets/conditions/osteoporosis/safe-pickup.webp';
import osteoporosisScapularSqueeze from '../assets/conditions/osteoporosis/scapular-squeeze.webp';
import osteoporosisSitToStandHold from '../assets/conditions/osteoporosis/sit-to-stand-hold.webp';
import osteoporosisWeightShifts from '../assets/conditions/osteoporosis/weight-shifts.webp';
import rotatorActivityPrecautions from '/public/media/rotator-cuff-tear/activity-precautions.poster.webp';
import rotatorGettingDressed from '/public/media/rotator-cuff-tear/getting-dressed.poster.webp';
import rotatorGripPump from '/public/media/rotator-cuff-tear/grip-pump.poster.webp';
import rotatorIce from '/public/media/rotator-cuff-tear/ice.poster.webp';
import rotatorPassiveForwardElevation from '/public/media/rotator-cuff-tear/passive-forward-elevation.poster.webp';
import rotatorPendulum from '/public/media/rotator-cuff-tear/pendulum.poster.webp';
import rotatorScapularSqueeze from '/public/media/rotator-cuff-tear/scapular-squeeze.poster.webp';
import rotatorSlingWear from '/public/media/rotator-cuff-tear/sling-wear.poster.webp';
import rotatorStickAssistedElevation from '../assets/conditions/rotator-cuff-tear/stick-assisted-elevation.webp';
import rotatorWallCrawl from '/public/media/rotator-cuff-tear/wall-crawl.poster.webp';
import rotatorWristAndElbow from '/public/media/rotator-cuff-tear/wrist-and-elbow.poster.webp';

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
 * **Explicit imports rather than an `import.meta.glob`**, for the
 * reason `lib/topic-images.ts` records at length: an eager glob imports
 * everything it matches and Astro emits every module it has imported, so the
 * glob version of that file put 8 MB of unrequested full-size copies into
 * `dist/_astro/`. Explicit imports also fail the build when a poster is
 * renamed, rather than the card quietly losing its picture.
 *
 * **A clip on an exercise card has no poster file**: the card's own still is
 * its poster, so the gallery takes the same still from `src/assets/` — the
 * importer writes both to the same slug and name, which is what the second
 * half of the list relies on.
 *
 * Keyed by the clip's own `src`. The list was regenerated on 2026-09-23 from
 * what is on disk, when the frozen shoulder, rotator cuff and osteoporosis
 * clips were refreshed from the apps.
 */

const posters: Record<string, ImageMetadata> = {
  '/media/frozen-shoulder/assisted-external-rotation.mp4': frozenAssistedExternalRotation,
  '/media/frozen-shoulder/band-external-rotation.mp4': frozenBandExternalRotation,
  '/media/frozen-shoulder/band-internal-rotation.mp4': frozenBandInternalRotation,
  '/media/frozen-shoulder/band-row.mp4': frozenBandRow,
  '/media/frozen-shoulder/cross-body-stretch.mp4': frozenCrossBodyStretch,
  '/media/frozen-shoulder/external-rotation-stretch.mp4': frozenExternalRotationStretch,
  '/media/frozen-shoulder/finger-walk.mp4': frozenFingerWalk,
  '/media/frozen-shoulder/getting-dressed.mp4': frozenGettingDressed,
  '/media/frozen-shoulder/ice-or-heat.mp4': frozenIceOrHeat,
  '/media/frozen-shoulder/light-forward-raise.mp4': frozenLightForwardRaise,
  '/media/frozen-shoulder/loaded-carry.mp4': frozenLoadedCarry,
  '/media/frozen-shoulder/pendulum.mp4': frozenPendulum,
  '/media/frozen-shoulder/scapular-setting.mp4': frozenScapularSetting,
  '/media/frozen-shoulder/showering.mp4': frozenShowering,
  '/media/frozen-shoulder/sleep-back-supported.mp4': frozenSleepBackSupported,
  '/media/frozen-shoulder/sleep-night-waking.mp4': frozenSleepNightWaking,
  '/media/frozen-shoulder/sleep-propped-upright.mp4': frozenSleepProppedUpright,
  '/media/frozen-shoulder/sleep-side-lying.mp4': frozenSleepSideLying,
  '/media/frozen-shoulder/stick-assisted-elevation.mp4': frozenStickAssistedElevation,
  '/media/frozen-shoulder/towel-internal-rotation.mp4': frozenTowelInternalRotation,
  '/media/frozen-shoulder/wall-slide.mp4': frozenWallSlide,
  '/media/osteoporosis/chin-tuck.mp4': osteoporosisChinTuck,
  '/media/osteoporosis/hip-hinge.mp4': osteoporosisHipHinge,
  '/media/osteoporosis/safe-pickup.mp4': osteoporosisSafePickup,
  '/media/osteoporosis/scapular-squeeze.mp4': osteoporosisScapularSqueeze,
  '/media/osteoporosis/sit-to-stand-hold.mp4': osteoporosisSitToStandHold,
  '/media/osteoporosis/weight-shifts.mp4': osteoporosisWeightShifts,
  '/media/rotator-cuff-tear/activity-precautions.mp4': rotatorActivityPrecautions,
  '/media/rotator-cuff-tear/getting-dressed.mp4': rotatorGettingDressed,
  '/media/rotator-cuff-tear/grip-pump.mp4': rotatorGripPump,
  '/media/rotator-cuff-tear/ice.mp4': rotatorIce,
  '/media/rotator-cuff-tear/passive-forward-elevation.mp4': rotatorPassiveForwardElevation,
  '/media/rotator-cuff-tear/pendulum.mp4': rotatorPendulum,
  '/media/rotator-cuff-tear/scapular-squeeze.mp4': rotatorScapularSqueeze,
  '/media/rotator-cuff-tear/sling-wear.mp4': rotatorSlingWear,
  '/media/rotator-cuff-tear/stick-assisted-elevation.mp4': rotatorStickAssistedElevation,
  '/media/rotator-cuff-tear/wall-crawl.mp4': rotatorWallCrawl,
  '/media/rotator-cuff-tear/wrist-and-elbow.mp4': rotatorWristAndElbow,
};

export function getVideoPoster(src: string): ImageMetadata | undefined {
  return posters[src];
}
