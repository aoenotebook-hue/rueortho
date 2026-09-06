# Easyortho (รู้เรื่องกระดูกและข้อ) — project notes for Claude

## What this is

A static, bilingual patient-education website about common orthopaedic problems,
written for the general public in Thailand by an orthopaedic surgeon (author id
`sorawut`). Thai is the primary language and is served at `/`; English is served
at `/en/`.

Articles are MDX files at `src/content/conditions/<locale>/<slug>.mdx`, one per
condition per language, **sharing the same slug** so the language switch always
lands on the same condition.

`_sources/` holds shallow clones of the author's own patient-care apps
(git-ignored, read-only reference). `docs/SOURCES.md` maps them to conditions —
consult it when drafting or fact-checking content. Never copy an image out of
`_sources/` unless SOURCES.md marks it original or openly licensed.

## Commands

- `npm run dev` — dev server (drafts are visible here)
- `npm run build` — **must pass before any commit**
- `npm run preview` — serve the built site (needed to test search)
- `npm run check` — `astro check`; keep it at 0 errors, 0 warnings, 0 hints

## Stack notes and gotchas

- **Astro 7** (not Astro 5 as the original build plan assumed — 7 was current
  when the project was scaffolded). The plan's content model carries over
  unchanged: `defineCollection` + the `glob` loader + i18n routing all work.
- **Zod comes from `zod` directly**, not from `astro:content`. The `z` re-export
  from `astro:content` is deprecated in Astro 7, and `z.string().url()` is
  deprecated in Zod 4 — use `z.url()`.
- **`generateId` on the conditions collection is load-bearing.** The glob loader
  otherwise adopts the `slug` frontmatter field as the entry id, so the Thai and
  English files — which share a slug on purpose — collide and silently
  overwrite each other, producing zero condition pages. Do not remove it.
- Tailwind 4 through `@tailwindcss/vite` (not the old `@astrojs/tailwind`
  integration). Design tokens are CSS custom properties in
  `src/styles/global.css`, exposed to Tailwind via `@theme inline` so that
  `prefers-color-scheme` can swap them.
- `site` in `astro.config.mjs` is still the placeholder `https://easyortho.com`.
  It drives canonical URLs, hreflang, the sitemap and RSS — **set the real
  domain before launch.**
- The companion-app URLs in `src/data/apps.ts` are unverified GitHub Pages URLs.
  Confirm each one resolves before launch.

## Conventions

- No React unless a component genuinely needs interactivity; prefer a small
  `<script>` inside the `.astro` file.
- **All UI strings come from `src/i18n/ui.ts`.** Never hard-code visible text in
  a component. Thai strings must be real Thai, never a placeholder.
- Every page sets `<html lang>` correctly and emits `hreflang` alternates for
  th, en and x-default.
- The content schema lives in `src/content.config.ts`. Changing it means
  updating every article and `docs/ARTICLE_TEMPLATE.md`.
- Thai typography: line-height 1.8, base 17px (18px ≥768px), never justified,
  never letter-spaced, `overflow-wrap: break-word`. Re-check Thai line wrapping
  after any typography change — Thai has no spaces between words.
- Accessibility target is WCAG 2.1 AA: contrast ≥ 4.5:1, visible focus rings,
  skip link, one `h1` per page, touch targets ≥ 44px.
- Drafts (`draft: true`) appear in `npm run dev` and never in a build.

## Medical content rules

These are not style preferences — they are what makes the site safe to publish.

- Plain language, roughly Thai มัธยมต้น / English Grade 7. Short sentences, one
  idea per paragraph.
- Second person (`คุณ` / "you"), warm and calm.
- Explain every medical term in plain language the first time, with the English
  term in parentheses once.
- **Never tell the reader they have the condition.** Use "อาจเป็นสัญญาณของ…" /
  "this may be a sign of…" and defer diagnosis to a doctor.
- No drug doses. Drug classes are fine, with a "ask a doctor or pharmacist" note.
- No promotion of any clinic, product, brand or supplement.
- Be honest about uncertainty and about what the evidence does and does not
  support. Non-surgical options come before surgical ones.
- Every article carries `publishedDate`, `lastReviewed`, `author`, `reviewedBy`
  and `sources`. Articles are re-reviewed at least every 24 months.
- Images must be the author's own or openly licensed, with attribution in the
  figure caption.

## Structure

```
src/
  content/conditions/{th,en}/   article MDX, one file per condition per language
  content/pages/{th,en}/        about, disclaimer, privacy, editorial policy, contact
  content.config.ts             zod schema for both collections
  data/authors.ts               author records (deliberately no workplace field)
  data/regions.ts               body regions + browsing categories, display order
  data/apps.ts                  companion-app registry, linked from articles
  i18n/ui.ts                    every visible string, th + en
  i18n/utils.ts                 locale from URL, path localisation, date formatting
  lib/conditions.ts             collection queries (by locale, region, recency)
  layouts/BaseLayout.astro      html shell, meta, hreflang, fonts
  pages/                        Thai routes at /, English mirrored under /en
  styles/global.css             design tokens, Thai typography, base styles
docs/                           SOURCES.md, ARTICLE_TEMPLATE.md, legal texts
_sources/                       read-only clones of the author's apps (git-ignored)
```

## Build-plan progress

The full build plan lives outside the repo. Completed so far: project scaffold,
i18n, content collections, data files, sample article in both languages.
Still to do: design system and real layouts, the full condition article page with
MDX components, browse/region pages and body map, Pagefind search, info and legal
pages, SEO/OG/RSS, analytics and deployment, pre-launch QA.
