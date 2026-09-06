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
      redFlags: z.array(z.string()).default([]),
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

/** About, disclaimer, privacy, editorial policy, contact. */
const pages = defineCollection({
  loader: glob({ base: './src/content/pages', pattern: '**/*.{md,mdx}' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    lastUpdated: z.coerce.date(),
  }),
});

export const collections = { conditions, pages };
