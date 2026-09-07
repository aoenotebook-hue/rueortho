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

const CONDITIONS = 'src/content/conditions';
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

function readArticles(locale) {
  const dir = join(CONDITIONS, locale);
  if (!existsSync(dir)) return [];
  return readdirSync(dir)
    .filter((f) => f.endsWith('.mdx') || f.endsWith('.md'))
    .map((file) => {
      const path = join(dir, file);
      const { data, content } = matter(readFileSync(path, 'utf8'));
      return { path, locale, file, data, content };
    });
}

const th = readArticles('th');
const en = readArticles('en');
const enSlugs = new Set(en.map((a) => a.data.slug));

for (const article of [...th, ...en]) {
  const { path, data, content, locale } = article;
  /*
   * The schema declares `draft: z.boolean().default(false)`, so an article that
   * omits the field is PUBLISHED. Testing `=== false` would treat an omitted
   * field as a draft and skip every check below — the exact hole these checks
   * exist to close. Only an explicit `draft: true` counts as unpublished.
   */
  const published = data.draft !== true;

  // A sample must never go out under a real doctor's byline claiming review.
  if (published && /SAMPLE/i.test(content)) {
    errors.push(
      `${path}: still marked SAMPLE but not draft — it would publish as reviewed by ${data.reviewedBy}.`,
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

  // Red flags declared but never surfaced is a safety problem worth naming,
  // even though ConditionArticle falls back to rendering them itself.
  if (published && (data.redFlags?.length ?? 0) === 0) {
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
for (const article of th) {
  if (article.data.translationPending) continue;
  if (!enSlugs.has(article.data.slug)) {
    warnings.push(
      `${article.path}: no English version, and translationPending is not set.`,
    );
  }
}

for (const w of warnings) console.warn(`warning  ${w}`);
for (const e of errors) console.error(`error    ${e}`);

console.log(
  `\nlint:content — ${th.length} Thai, ${en.length} English article(s); ` +
    `${errors.length} error(s), ${warnings.length} warning(s).`,
);

process.exit(errors.length > 0 ? 1 : 0);
