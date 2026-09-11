import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'zod';
import { regionIds } from './data/regions';

/**
 * One MDX file per condition per language, sharing a slug, so the language
 * switch always lands on the same condition. Entry ids look like
 * "th/knee-osteoarthritis".
 */
const conditions = defineCollection({
  loader: glob({
    base: './src/content/conditions',
    pattern: '**/*.{md,mdx}',
    // Without this the loader would take the `slug` frontmatter field as the
    // entry id, and the Thai and English files — which deliberately share a
    // slug — would collide and overwrite each other.
    generateId: ({ entry }) => entry.replace(/\.mdx?$/, ''),
  }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      slug: z
        .string()
        .regex(/^[a-z0-9]+(-[a-z0-9]+)*$/, 'slug must be kebab-case'),
      region: z.enum(regionIds),
      summary: z.string().max(300),
      keywords: z.array(z.string()).default([]),
      publishedDate: z.coerce.date(),
      lastReviewed: z.coerce.date(),
      author: z.string(),
      reviewedBy: z.string(),
      readingTime: z.number().optional(),
      heroImage: image().optional(),
      heroImageAlt: z.string().optional(),
      /**
       * Symptoms that mean hospital now. Kept for the urgent tier only — see
       * `seeDoctorSoon` for the ones that mean "book an appointment".
       */
      redFlags: z.array(z.string()).default([]),
      /**
       * Symptoms worth seeing a doctor about, but not an emergency.
       *
       * Split out of `redFlags` on 2026-09-11 at the author's request: a list
       * headed "go to hospital now" that also contains "if it has not settled
       * in two weeks" teaches the reader to discount the whole list. The two
       * are rendered as visibly different blocks by `<RedFlags>`.
       */
      seeDoctorSoon: z.array(z.string()).default([]),
      faq: z.array(z.object({ q: z.string(), a: z.string() })).default([]),
      related: z.array(z.string()).default([]),
      sources: z.array(z.object({ title: z.string(), url: z.url() })).default([]),
      /** Set on a Thai article that deliberately has no English version yet. */
      translationPending: z.boolean().default(false),
      draft: z.boolean().default(false),
    })
    .refine((data) => !data.heroImage || Boolean(data.heroImageAlt), {
      message: 'heroImageAlt is required whenever heroImage is set',
      path: ['heroImageAlt'],
    }),
});

/**
 * `examinations` and `rehabilitation` share almost all of a condition's shape —
 * the same byline, review dates, FAQ, red flags and sources — but not its
 * `region`, which is required on a condition and meaningless on "what an MRI
 * shows". They are separate collections rather than a `type` field on
 * `conditions` so that a listing, a route and a schema rule can address one
 * kind of page without filtering, and so a change to one cannot silently
 * reshape the twenty condition articles.
 *
 * `related` holds condition slugs in every collection, which is what lets a
 * bone-density page point at osteoporosis and a shoulder-rehab page point at
 * frozen shoulder.
 */
function resourceSchema() {
  return z.object({
    title: z.string(),
    slug: z.string().regex(/^[a-z0-9]+(-[a-z0-9]+)*$/, 'slug must be kebab-case'),
    summary: z.string().max(300),
    keywords: z.array(z.string()).default([]),
    publishedDate: z.coerce.date(),
    lastReviewed: z.coerce.date(),
    author: z.string(),
    reviewedBy: z.string(),
    /** Optional here: an imaging page rarely has a "go to hospital now" list. */
    redFlags: z.array(z.string()).default([]),
    /** The calmer tier — see the conditions schema above. */
    seeDoctorSoon: z.array(z.string()).default([]),
    faq: z.array(z.object({ q: z.string(), a: z.string() })).default([]),
    /** Slugs from the `conditions` collection. */
    related: z.array(z.string()).default([]),
    sources: z.array(z.object({ title: z.string(), url: z.url() })).default([]),
    translationPending: z.boolean().default(false),
    draft: z.boolean().default(false),
  });
}

/** `generateId` here for the same reason as on conditions — see above. */
function resourceLoader(base: string) {
  return glob({
    base,
    pattern: '**/*.{md,mdx}',
    generateId: ({ entry }) => entry.replace(/\.mdx?$/, ''),
  });
}

/** X-ray, MRI, ultrasound, bone density, nerve conduction studies. */
const examinations = defineCollection({
  loader: resourceLoader('./src/content/examinations'),
  schema: resourceSchema(),
});

/** Self-care, medicines by class, injections and surgery. */
const treatments = defineCollection({
  loader: resourceLoader('./src/content/treatments'),
  schema: resourceSchema(),
});

/** Phase-based rehabilitation and exercise programmes. */
const rehabilitation = defineCollection({
  loader: resourceLoader('./src/content/rehabilitation'),
  schema: resourceSchema().extend({
    /**
     * Rehab is mostly organised by body part, so this one keeps a region — but
     * optional, because the principles that apply to every programme belong to
     * no single joint.
     */
    region: z.enum(regionIds).optional(),
  }),
});

/** About, disclaimer, privacy, editorial policy, contact. */
const pages = defineCollection({
  loader: glob({ base: './src/content/pages', pattern: '**/*.{md,mdx}' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    lastUpdated: z.coerce.date(),
  }),
});

export const collections = { conditions, examinations, rehabilitation, treatments, pages };
