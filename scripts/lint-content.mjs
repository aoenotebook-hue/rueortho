#!/usr/bin/env node
/**
 * Editorial checks that the Zod schema cannot express, because they are about
 * relationships between files or about the review process rather than shape.
 *
 * Exits non-zero on an error so CI blocks the merge. Warnings are printed but
 * do not fail the build — they are prompts for the author, not defects.
 */
import { readdirSync, readFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';
import matter from 'gray-matter';

/**
 * Every collection of article MDX. The publication-safety checks below — the
 * SAMPLE/SEED marker, the sources requirement, and the media checks — apply to
 * all of them, because a page in any of these carries the same byline and the
 * same claim of review. A few checks are specific to conditions and are gated
 * on the collection name where they appear.
 */
const COLLECTIONS = ['conditions', 'examinations', 'rehabilitation', 'treatments'];
const REVIEW_MONTHS = 24;

const errors = [];
const warnings = [];

/** Canonical section order. An article may stop early but must not reorder. */
const SECTIONS = {
  th: [
    'โรคนี้คืออะไร',
    'อาการ',
    'สาเหตุและปัจจัยเสี่ยง',
    'เมื่อไหร่ควรไปพบแพทย์',
    'แพทย์วินิจฉัยอย่างไร',
    'แนวทางการรักษา',
    'การฟื้นตัวและการฟื้นฟู',
    'การป้องกันและการดูแลตนเอง',
    'คำถามที่ควรถามแพทย์',
  ],
  en: [
    'What it is',
    'Symptoms',
    'Causes and risk factors',
    'When to see a doctor',
    'How it is diagnosed',
    'Treatment options',
    'Recovery and rehabilitation',
    'Prevention and self-care',
    'Questions to ask your doctor',
  ],
};

function readArticles(collection, locale) {
  const dir = join('src/content', collection, locale);
  if (!existsSync(dir)) return [];
  return readdirSync(dir)
    .filter((f) => f.endsWith('.mdx') || f.endsWith('.md'))
    .map((file) => {
      const path = join(dir, file);
      const { data, content } = matter(readFileSync(path, 'utf8'));
      return { path, collection, locale, file, data, content };
    });
}

const byCollection = COLLECTIONS.map((collection) => ({
  collection,
  th: readArticles(collection, 'th'),
  en: readArticles(collection, 'en'),
}));

const articles = byCollection.flatMap((c) => [...c.th, ...c.en]);

for (const article of articles) {
  const { path, data, content, locale, collection } = article;
  /*
   * The schema declares `draft: z.boolean().default(false)`, so an article that
   * omits the field is PUBLISHED. Testing `=== false` would treat an omitted
   * field as a draft and skip every check below — the exact hole these checks
   * exist to close. Only an explicit `draft: true` counts as unpublished.
   */
  const published = data.draft !== true;

  /*
   * Unreviewed copy must never go out under a real doctor's byline claiming
   * review. SAMPLE marks text Claude drafted; SEED marks a skeleton from the
   * content roadmap that nobody has written yet. Either one published would be
   * a false claim of medical review, so both are errors.
   */
  const marker = content.match(/\b(SAMPLE|SEED)\b/);
  if (published && marker) {
    errors.push(
      `${path}: still marked ${marker[1]} but not draft — it would publish as reviewed by ${data.reviewedBy}.`,
    );
  }

  if (published && (!data.sources || data.sources.length === 0)) {
    errors.push(`${path}: published with no sources.`);
  }

  // Figures must carry alt text and an attribution line.
  for (const tag of content.match(/<Figure[\s\S]*?\/>/g) ?? []) {
    if (!/\balt=/.test(tag)) errors.push(`${path}: a <Figure> has no alt text.`);
    if (!/\battribution=/.test(tag)) {
      warnings.push(`${path}: a <Figure> has no attribution.`);
    }
  }

  /*
   * A <Video> carries all of its meaning in the picture, so it needs a text
   * description, and its src must actually resolve. The src is a path under
   * public/, which nothing else validates: the clip is only requested after the
   * reader presses play, so a typo or a file that lost out to deduplication in
   * scripts/import-app-media.mjs would show a broken player rather than fail
   * the build. This caught three such paths on the rotator cuff article.
   */
  for (const tag of content.match(/<Video[\s\S]*?\/>/g) ?? []) {
    if (!/\bdescription=/.test(tag)) {
      errors.push(`${path}: a <Video> has no description.`);
    }
    const src = tag.match(/\bsrc="([^"]+)"/)?.[1];
    if (!src) {
      errors.push(`${path}: a <Video> has no src.`);
    } else if (src.startsWith('/') && !existsSync(join('public', src))) {
      errors.push(`${path}: <Video src="${src}"> — no such file under public/.`);
    }
  }

  // Same for a <Figure> pointing at a path under public/ rather than an import.
  for (const tag of content.match(/<Figure[\s\S]*?\/>/g) ?? []) {
    const src = tag.match(/\bsrc="(\/[^"]+)"/)?.[1];
    if (src && !existsSync(join('public', src))) {
      errors.push(`${path}: <Figure src="${src}"> — no such file under public/.`);
    }
  }

  /*
   * Every condition needs a "when to see a doctor" list. Examinations and
   * rehabilitation pages do not: an explainer on how a DXA scan works has no
   * urgent-symptom list to give, and demanding one would only invite an author
   * to invent filler on a medical page.
   */
  if (collection === 'conditions' && published && (data.redFlags?.length ?? 0) === 0) {
    warnings.push(`${path}: published with no redFlags.`);
  }

  if (data.lastReviewed) {
    const due = new Date(data.lastReviewed);
    due.setMonth(due.getMonth() + REVIEW_MONTHS);
    if (due < new Date()) {
      warnings.push(
        `${path}: last reviewed ${new Date(data.lastReviewed).toISOString().slice(0, 10)} — past the ${REVIEW_MONTHS}-month review cycle.`,
      );
    }
  }

  // Headings must follow the canonical order (skipping is allowed).
  const headings = [...content.matchAll(/^##\s+(.+)$/gm)].map((m) => m[1].trim());
  const canonical = SECTIONS[locale] ?? [];
  let cursor = -1;
  for (const heading of headings) {
    const index = canonical.indexOf(heading);
    if (index === -1) continue; // FAQ, References and custom headings are fine
    if (index < cursor) {
      warnings.push(`${path}: section "${heading}" appears out of canonical order.`);
    }
    cursor = Math.max(cursor, index);
  }
}

// Every Thai article needs an English counterpart unless deliberately deferred.
for (const { th, en } of byCollection) {
  const enSlugs = new Set(en.map((a) => a.data.slug));
  for (const article of th) {
    if (article.data.translationPending) continue;
    if (!enSlugs.has(article.data.slug)) {
      warnings.push(
        `${article.path}: no English version, and translationPending is not set.`,
      );
    }
  }
}

for (const w of warnings) console.warn(`warning  ${w}`);
for (const e of errors) console.error(`error    ${e}`);

const tally = byCollection
  .map(({ collection, th, en }) => `${collection} ${th.length}+${en.length}`)
  .join(', ');

console.log(
  `\nlint:content — ${tally} (Thai+English); ` +
    `${articles.length} file(s); ${errors.length} error(s), ${warnings.length} warning(s).`,
);

process.exit(errors.length > 0 ? 1 : 0);
