import type { ImageMetadata } from 'astro';
import type { ResourceCollection } from './resources';

/**
 * One picture from inside each resource article, for its listing-card icon.
 *
 * The author asked on 2026-09-19 for the card icon to be a picture from the
 * topic itself rather than a generic glyph. Conditions already had one —
 * `heroImage` in the frontmatter — but the four resource collections have no
 * image field at all: their pictures are referenced from the MDX body as plain
 * `/images/<collection>/<slug>/…` strings, which carry no dimensions and never
 * reach `astro:assets`.
 *
 * **So the files are imported out of `public/`.** Vite resolves a project-root
 * path and Astro then treats the file as an ordinary asset, which is what lets
 * `<Image>` emit a 192px webp of 2–7 KB instead of serving the 100–200 KB
 * original into a 68px box. The file is still copied to `dist/images/…` for
 * the article body to use; the card gets its own small derivative. Nothing is
 * duplicated in git and there is no build script to re-run, unlike the video
 * posters.
 *
 * **They are twenty explicit imports and not an `import.meta.glob`, and that
 * was measured.** A glob has to be a static pattern, so it matches the whole
 * tree — and an *eager* glob imports every file it matches, while Astro emits
 * every module it has imported whether or not anything renders it. The first
 * version of this file globbed `**\/*.jpg` and put **8 MB across 52
 * full-size JPEGs** into `dist/_astro/`, every one of them a byte-for-byte
 * second copy of a file already in `dist/images/`, and none of them ever
 * requested. A lazy glob would avoid that at the cost of making this function
 * async, which it does not need to be. Twenty imports are also louder: rename
 * a picture and the build fails here, rather than the card quietly falling
 * back to a glyph.
 */
import arthroscopicSurgery from '/public/images/basics/arthroscopic-surgery/arthroscopic-surgery-repair.jpg';
import boneAndCartilage from '/public/images/basics/bone-and-cartilage/bone-and-cartilage-anatomy.jpg';
import boneAsAnOrgan from '/public/images/basics/bone-as-an-organ/bone-as-an-organ-living.jpg';
import fractureHealing from '/public/images/basics/fracture-healing/fracture-healing-stages.jpg';

import boneDensityScan from '/public/images/examinations/bone-density-scan/bone-density-scan-concept.jpg';
import kneeMri from '/public/images/examinations/knee-mri/knee-mri-concept.jpg';
import mri from '/public/images/examinations/mri/mri-concept.jpg';
import nerveConductionStudy from '/public/images/examinations/nerve-conduction-study/nerve-conduction-study-concept.jpg';
import ultrasound from '/public/images/examinations/ultrasound/ultrasound-concept.jpg';
import xray from '/public/images/examinations/xray/xray-concept.jpg';

import choosingTreatment from '/public/images/treatments/choosing-treatment/choosing-treatment-mechanism.jpg';
import jointInjections from '/public/images/treatments/joint-injections/joint-injections-mechanism.jpg';
import painMedicines from '/public/images/treatments/pain-medicines/pain-medicines-mechanism.jpg';
import selfCare from '/public/images/treatments/self-care/self-care-overview.jpg';
import surgery from '/public/images/treatments/surgery/surgery-mechanism.jpg';

import backRehab from '/public/images/rehabilitation/back-rehab/back-rehab-technique.jpg';
import balanceAndFallPrevention from '/public/images/rehabilitation/balance-and-fall-prevention/balance-and-fall-prevention-overview.jpg';
import kneeRehab from '/public/images/rehabilitation/knee-rehab/knee-rehab-technique.jpg';
import rehabPrinciples from '/public/images/rehabilitation/rehab-principles/rehab-principles-technique.jpg';
import shoulderRehab from '/public/images/rehabilitation/shoulder-rehab/shoulder-rehab-technique.jpg';

/**
 * Which picture each article lends to its card, chosen by looking at the
 * frames rather than by taking the first file in the folder.
 *
 * A card icon is 56–68px, so a diagram with two or three large shapes survives
 * the reduction and a room scene does not: at that size a photograph of a
 * scanner and a photograph of a clinic are the same grey rectangle. Where an
 * article has a `-concept`, `-mechanism` or `-anatomy` frame, that is almost
 * always the one — they were drawn as diagrams.
 */
const chosen: Record<ResourceCollection, Record<string, ImageMetadata>> = {
  basics: {
    // Two big circular insets: a stitched meniscus and a tendon back on bone.
    'arthroscopic-surgery': arthroscopicSurgery,
    // A knee in section — the clearest silhouette in the set.
    'bone-and-cartilage': boneAndCartilage,
    // Two whole bones side by side, one dry and one alive.
    'bone-as-an-organ': boneAsAnOrgan,
    // Four bones in a row; still reads as bone at any size.
    'fracture-healing': fractureHealing,
  },
  examinations: {
    'bone-density-scan': boneDensityScan,
    'knee-mri': kneeMri,
    mri,
    'nerve-conduction-study': nerveConductionStudy,
    ultrasound,
    xray,
  },
  treatments: {
    'choosing-treatment': choosingTreatment,
    'joint-injections': jointInjections,
    'pain-medicines': painMedicines,
    /*
     * The one that is not a `-mechanism`. `self-care-mechanism.jpg` shows a
     * knee sleeve being put on and worn, and the self-care article never
     * mentions a brace — it is deliberately unplaced until the author rules on
     * it, so it must not arrive on the page as an icon either.
     */
    'self-care': selfCare,
    surgery,
  },
  rehabilitation: {
    'back-rehab': backRehab,
    'balance-and-fall-prevention': balanceAndFallPrevention,
    'knee-rehab': kneeRehab,
    'rehab-principles': rehabPrinciples,
    'shoulder-rehab': shoulderRehab,
  },
};

/**
 * The card picture for one resource article, or `undefined` if the article has
 * no entry here — the card then falls back to its collection's glyph rather
 * than rendering an empty box. A new article gets a glyph until somebody picks
 * a frame for it.
 */
export function getTopicImage(
  collection: ResourceCollection,
  slug: string,
): ImageMetadata | undefined {
  return chosen[collection]?.[slug];
}
