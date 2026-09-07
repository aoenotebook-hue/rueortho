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
- Accessibility target is WCAG 2.2 AA: contrast ≥ 4.5:1, visible focus rings,
  skip link, one `h1` per page, touch targets ≥ 44px, reduced-motion respected.
- **Never convey meaning by colour alone.** The homepage triage levels carry a
  distinct shape and a written label as well as a colour, and any future
  status indicator must do the same.
- Drafts (`draft: true`) appear in `npm run dev` and never in a build.

## Decisions the author has made

- **The reader is addressed as `คุณ`, never `ท่าน`.** Three of the four source
  apps (osteoporosis, rotator cuff, ACL) use `ท่าน`; only frozen shoulder uses
  `คุณ`. When reusing extracted text from `_extracted/`, convert the pronoun —
  and check the surrounding register still reads naturally, since `ท่าน` text
  tends to carry other formal markers with it.
- **The author has confirmed he knows the provenance of all media** in his four
  apps, including the five rotator cuff images that carry no C2PA credential
  and have stripped metadata (`p2_2`, `p2_3`, `p3_3`, `p4_3`, `p4_4`). Most of
  the rest is AI-generated and carries a Google C2PA credential.
  **Still outstanding: the exact attribution wording to put in the `Figure`
  caption.** Ask for it before putting any app image on a page.
- **The Thai font stays IBM Plex Sans Thai Looped.** The later master plan
  specifies Noto Sans Thai; the author was asked and chose to keep Plex Looped.
  Looped Thai carries the heads on the glyphs and reads more easily for older
  readers and anyone with reduced vision, which is much of the audience for a
  site about arthritis and osteoporosis. Do not switch on the master plan's
  say-so.
- **Contact address and domain live in `src/data/site.ts`**, and the legal pages
  read them through an MDX import, so there is one place to change. Both are
  still placeholders (`easyortho.com`).

## Medical content rules

These are not style preferences — they are what makes the site safe to publish.

- Plain language, roughly Thai มัธยมต้น / English Grade 7. Short sentences, one
  idea per paragraph.
- Second person (`คุณ` / "you"), warm and calm.
- Explain every medical term in plain language the first time, with the English
  term in parentheses once.
- **Never tell the reader they have the condition.** Use "อาจเป็นสัญญาณของ…" /
  "this may be a sign of…" and defer diagnosis to a doctor. Never
  "คุณเป็นโรค…"; write "อาการลักษณะนี้อาจเกี่ยวข้องกับ…".
- **Never tell a reader they do not need a doctor.** Not
  "คุณไม่จำเป็นต้องพบแพทย์" but "ในกรณีที่ไม่มีสัญญาณเตือน อาการบางลักษณะอาจเริ่ม
  ดูแลเบื้องต้นได้ แต่ควรพบแพทย์หาก…". The site cannot see the reader, so it can
  never rule anything out.
- **Claude does not make medical editorial decisions.** Layout, structure,
  routing, components, accessibility and performance are Claude's; what is
  medically true is the author's, through research, writing and review. Draft
  copy stays `draft: true` until he has read it.
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

The full build plan lives outside the repo.

Done: scaffold, i18n, content collections, data files, sample article in both
languages, design system, header/footer, home page, conditions index with
filtering, region pages, the condition article page (red flags, FAQ, references,
companion apps, related, JSON-LD), author page, and the info and legal pages.

Also done: the MDX component set (`KeyFacts`, `RedFlags`, `Figure`, `Callout`,
`Glossary`, `DoctorChecklist`, `ExerciseCard`), registered in
`src/components/mdx/index.ts` and documented with usage examples in
`docs/ARTICLE_TEMPLATE.md`.

Also done: Pagefind search at `/search` and `/en/search`.

Also done: the deployment layer — `vercel.json` headers, an Astro-generated CSP,
Cloudflare analytics behind `PUBLIC_CF_ANALYTICS_TOKEN`, RSS per locale,
generated `robots.txt`, a bilingual 404, `npm run lint:content`, CI, and
`docs/DEPLOY.md`.

Still to do: sticky table of contents, the body map, per-article OG images, the
pre-launch QA pass — and the real articles.

### Publishing safety

`npm run lint:content` fails the build when an article still containing the
`SAMPLE` marker has `draft: false`, because that would publish it under the
author's name with `reviewedBy` set. The sample knee-osteoarthritis article is
`draft: true` for that reason: it was written by Claude and the author has not
reviewed it. Do not flip it without him reading it first. The linter also fails
on a published article with no `sources` and on a `<Figure>` with no `alt`.

### Deployment notes

- The CSP is generated by Astro (`security.csp` in `astro.config.mjs`) and
  delivered as a `<meta>` tag, so it can carry per-page hashes for inline
  scripts and styles and avoid `'unsafe-inline'`. It cannot move to
  `vercel.json`, which holds only the static headers. Any new third-party host
  must be added to `security.csp` or the browser blocks it silently.
- `'wasm-unsafe-eval'` in the script directive is required: Pagefind runs its
  index in WebAssembly and search fails without it.
- `site` in `astro.config.mjs` and `domain`/`contactEmail` in `src/data/site.ts`
  are still the `easyortho.com` placeholder and must be changed together when
  the real domain is registered.

### Search notes — read before touching search

- **Test search with `npm run build && npm run preview`, never `npm run dev`.**
  Pagefind indexes the built output, so the index does not exist in dev; the
  search page renders an explanatory notice there instead of a broken box.
- **Pagefind has no Thai analyser.** `pagefind-entry.json` shows
  `"th": { "wasm": null }` — Thai falls back to the generic handler, which
  **strips Thai tone marks**. เข่า (knee), เข้า (enter) and เขา all match each
  other. This is not fixable from our side; design around it.
- Two mitigations, both load-bearing, both tuned against measured scores:
  1. Info pages carry `data-pagefind-weight="0.25"` so articles out-rank them,
     while they stay findable by their own words (searching นโยบาย still
     returns the privacy and editorial pages).
  2. `public/search.js` drops results scoring below 30% of the top score. With
     tone folding the noise sits far below a real match — for เข่า the article
     scores 0.94 and the next page 0.26 — so the cutoff removes it without
     touching genuinely multi-page matches.
  If either is removed, a search for เข่า returns the privacy notice.
- **The client script lives in `public/search.js`, not in a `<script>` in the
  component, and must stay there.** Pagefind generates `/pagefind/pagefind.js`
  *after* the Astro build, so Vite must never resolve that import. In a bundled
  Astro script Vite rewrites the dynamic import into its preload helper and
  leaves an undefined `__VITE_PRELOAD__` behind, which throws at runtime and
  silently shows the "search unavailable" message. `@vite-ignore` does not
  prevent this — Vite constant-folds the URL back to a literal. Files in
  `public/` are copied verbatim, which is the only reliable escape.
- Strings still come from `ui.ts`: the page serialises them into a
  `application/json` script tag that `search.js` reads, so `public/search.js`
  contains no user-facing text.
- Only pages with `data-pagefind-body` are indexed (articles and info pages).
  Listings, the home page and the search pages are excluded by construction.

### CSS and layout traps — all three were live bugs

- **Base element styles must stay inside `@layer base` in `global.css`.**
  Tailwind puts its utilities in `@layer utilities`, and an *unlayered* rule
  beats a layered one no matter the specificity. An unlayered
  `a { color: var(--accent) }` therefore overrode every Tailwind text-colour
  utility on a link: the header's search button rendered teal-on-teal, i.e.
  invisible, and nav links ignored `text-muted`. Anything new that styles bare
  elements goes in that layer too.
- **Never use a `style=""` attribute.** Our CSP hashes `<style>` elements but
  cannot cover style attributes, so an inline style is silently refused by the
  browser — the hero gradient simply did not paint. Put it in a class in
  `global.css`.
- **Give flex and grid children `min-w-0` on any Thai text.** Thai has no
  spaces, so a heading is one unbreakable token, and `overflow-wrap: break-word`
  does *not* reduce an element's min-content contribution. A grid item defaults
  to `min-width: auto`, so the hero column was sized to the full width of the
  site name and pushed the page 11px wider than a 390px viewport. Headings now
  also carry `overflow-wrap: break-word`, but that alone is not enough.

### Homepage

`src/components/Home.astro` follows the author's design mockup: hero with a
search form, "ปวดตรงไหน?" body regions, four "คุณอยากรู้อะไร?" cards, common
conditions, trust marks, author strip.

Deliberate departures from that mockup, each with a reason:

- **No photography.** The design uses stock photos for the hero, the region
  circles and the condition cards. Those need licensing and do not adapt to
  dark mode, so regions and the hero use SVG glyphs (`BodyIcon.astro`,
  `Logo.astro`) and condition cards use a neutral panel. A licensed photo can
  drop into the card via `heroImage` later.
- **Nav is three items, not eight.** การตรวจ, การรักษา, ฟื้นฟู, เครื่องมือผู้ป่วย
  and บทความ & วิดีโอ have no pages; putting them in the nav would ship 404s.
- **Seven body regions, not nine.** `regions.ts` has no neck, and combines foot
  and ankle. Change the data first if the design's split is wanted.
- **No social icons in the footer**, because no accounts exist yet.
- The hero search is a plain GET form to `/search`, so it works without
  JavaScript, and the example chips are real `?q=` searches.

### Sections and routes

`src/data/sections.ts` is the single source for the main navigation and the
section landing pages. A section is `live` or `planned`; a planned one still
gets a real page (`SectionStub.astro`) that says it is being prepared and points
the reader at search or the conditions index. That is why the navigation can
carry the plan's full eight entries without shipping a single 404 — add a
section there and both the nav and its page follow.

`/terms` from the plan's route list is **not** built: it needs legal wording the
author has to supply, and inventing terms of use would be worse than not having
the page. The footer links to the disclaimer, privacy notice and editorial
policy, which do exist.

### Images

`docs/IMAGE-SOURCES.md` is a register: an image may not go on the site unless
its source and licence can be stated truthfully there. This is not bureaucracy —
five images in the author's own apps have stripped metadata and unknown origin,
and this site carries a named doctor's byline.

### MDX component notes

- `frontmatter` is available inside any MDX body, which is how
  `<RedFlags flags={frontmatter.redFlags} />` avoids restating the list.
- If an article declares `redFlags` but never places `<RedFlags />`,
  `ConditionArticle` renders the box near the top instead — it detects the tag
  by looking for `<RedFlags` in `entry.body`. Safety content must not vanish
  because of an editing slip. Keep that fallback.
- Prose's heading rules (`.prose h2 { margin-top: 2.2em }`) outrank a plain
  Tailwind `m-0` on a component heading, so component headings use `mt-0!`.
  Watch for this whenever a new component carries its own heading.

**Deviation from the plan:** the legal texts went straight into
`src/content/pages/<locale>/` rather than through an intermediate
`docs/legal/*.md`. Keeping two copies of legal wording invites drift; the MDX
files are markdown in git and are just as reviewable.

## Verifying UI changes

`npm run build && npx astro preview`, then drive it with Playwright
(`executablePath: '/opt/pw-browsers/chromium'`). Check at 390px and 1280px:
no horizontal overflow, exactly one `h1`, mobile nav opens, and every internal
link returns 200. Google Fonts is blocked in the sandbox, so abort
`**://fonts.{googleapis,gstatic}.com/**` in the test or the load event never
fires — and remember Thai renders in a fallback font there, not Plex Looped.
