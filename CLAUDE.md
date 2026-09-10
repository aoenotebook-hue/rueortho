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

- **`package-lock.json` must stay in the repo.** CI pins `actions/setup-node`
  with `cache: npm`, which needs a lockfile to build its cache key, so deleting
  it fails the job at *setup* — before `npm ci`, before `astro check`, before
  the content lint and the build. That happened on 2026-09-08: the lockfile was
  removed and three commits reached `main` with every check silently skipped.
  If it ever needs regenerating, `npm install --package-lock-only` writes one
  from `package.json` without touching `node_modules`.
- `npm run dev` — dev server (drafts are visible here)
- `npm run build` — **must pass before any commit**
- `npm run preview` — serve the built site (needed to test search)
- `npm run check` — `astro check`; keep it at 0 errors, 0 warnings, 0 hints
  (`npm run lint` is an alias for the same thing)

`astro.config.mjs` sets `server.host: '0.0.0.0'`, `server.port: 3000` and
`vite.server.allowedHosts: true`, so `npm run dev` and `npm run preview` listen
on **port 3000 on every interface**, not Astro's default localhost:4321. That is
for a cloud dev environment that reaches the server by hostname. It only affects
the dev and preview servers, never the built site — but `allowedHosts: true`
does turn off Vite's DNS-rebinding protection, so treat the dev server as
reachable by anything on the network while it runs.

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
- **The site's origin lives in one place: `origin` in `src/data/site.ts`.**
  `astro.config.mjs` imports it (a `.ts` import from the config file works —
  Astro loads the config through Vite), so `site`, the canonical URLs, the
  hreflang alternates, the sitemap, both RSS feeds, `robots.txt`, the QR codes
  and the domain printed in the legal pages all come from that line. It is
  `https://rueortho.vercel.app`, the live Vercel deployment. `easyortho.com`
  was never registered and is gone from the code. A branch preview URL must
  never go in there.
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
- **A card title's heading level is a prop, not a fixed tag.** `Card.astro`
  renders `h3` by default, which is right on the home page where cards sit under
  a section `h2`. On a listing page the cards are the only thing under the `h1`,
  so `ConditionsIndex`, `ResourceIndex` and `RegionPage` pass `headingLevel={2}`.
  Without that the page jumps `h1 → h3`, which it did on 17 pages until
  2026-09-08. Any new listing that puts cards straight under its `h1` must do
  the same.
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

  The four Thai legal pages — disclaimer, privacy, editorial policy, contact —
  and `error.404.body` kept `ท่าน` until 2026-09-10, because they were written
  in a formal register rather than reused from an app. 28 pronouns converted;
  nothing else in those pages changed.

  **Grepping for `ท่าน` mostly finds words that are not the pronoun**, and they
  must not be touched: `เท่านั้น` ("only"), and `ท่านี้` / `ท่านั่ง` / `ท่านอน`
  / `ท่านั้น` — `ท่า` is "position", so almost every exercise instruction on
  the site contains one. `แพทย์บางท่าน` ("some doctors") is `ท่าน` as a polite
  classifier for other people, which is correct and stays. The safe filter is
  `grep -rn 'ท่าน' src/ | grep -v 'เท่านั้น' | grep -vE 'ท่านี้|ท่านั่ง|ท่านอน|บางท่าน'`.
- **The author has confirmed he knows the provenance of all media** in his four
  apps, including the five rotator cuff images that carry no C2PA credential
  and have stripped metadata (`p2_2`, `p2_3`, `p3_3`, `p4_3`, `p4_4`), and has
  said the media may be used on the site. Media is now imported and placed —
  see "App media" below. **The five uncredentialed files were deliberately left
  out** and must stay out until their origin can be written down truthfully.
  **The exact attribution wording is still his to confirm.** A proposal is in
  use on the four app-derived articles, all of which are `draft: true`, so
  nothing is public under wording he has not read. The wording and the reasoning
  behind it are in `docs/IMAGE-SOURCES.md`; it appears as a literal string in
  the article MDX, so a search and replace over `src/content/conditions/`
  changes all of it.
- **The Thai font stays IBM Plex Sans Thai Looped.** The later master plan
  specifies Noto Sans Thai; the author was asked and chose to keep Plex Looped.
  Looped Thai carries the heads on the glyphs and reads more easily for older
  readers and anyone with reduced vision, which is much of the audience for a
  site about arthritis and osteoporosis. Do not switch on the master plan's
  say-so.
- **The author's name appears in exactly two places, and that is deliberate.**
  On 2026-09-08 he asked for it off the rest of the site: the dedicated author
  page (`/about/author/<id>`) was **deleted**, the "เกี่ยวกับผู้เขียน" link was
  taken out of the footer, and the homepage author strip was removed. What
  remains is the `## ผู้เขียน` / `## The author` section of the About page, and
  the byline on each article — which he then asked to move to the **foot** of
  the article, showing **the name alone**: no credentials, no reviewer line, and
  **no review or publication date**. The editorial policy was reworded to match,
  since it used to promise those dates at the top of every article. The dates
  are still in the frontmatter and still in the JSON-LD; only the visible ones
  went. There is
  no `bio` or `photo` on the author record any more; `credentials` survives only
  because the article JSON-LD still uses it as `jobTitle`. `reviewedBy` is still
  required in the frontmatter and still emitted in the JSON-LD; only its visible
  duplicate went. His name is also in the privacy notice, where it identifies
  who is responsible for the data — that is a legal identification, not a
  credit, so do not strip it as part of some future tidy-up.
- **Contact address and domain live in `src/data/site.ts`**, and the legal pages
  read them through an MDX import, so there is one place to change. Both are
  real now: the domain is `rueortho.vercel.app`, and `contactEmail` is
  `sorawut410@gmail.com`, which the author gave on 2026-09-10 to be published.
  It is his own mailbox rather than an address at the site's domain, so mapping
  a custom domain later does not change it. It is printed on the contact page,
  twice in the privacy notice — as the data controller's address and as the
  route for exercising PDPA rights — and once in the editorial policy, so it is
  a legal identification as much as a courtesy: do not remove it, and do not
  substitute a different address without asking him.

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
  content/examinations/{th,en}/ imaging and tests — x-ray, MRI, ultrasound, DXA, NCS
  content/rehabilitation/{th,en}/ phase-based rehab and exercise programmes
  content/treatments/{th,en}/   self-care, medicines by class, injections, surgery
  content/pages/{th,en}/        about, disclaimer, privacy, editorial policy, contact
  content.config.ts             zod schema for all five collections
  data/authors.ts               author records (no workplace, bio or photo — see decisions)
  data/regions.ts               body regions + browsing categories, display order
  data/apps.ts                  companion-app registry, linked from articles
  data/featured.ts              the home page's chosen condition slugs, in order
  i18n/ui.ts                    every visible string, th + en
  i18n/utils.ts                 locale from URL, path localisation, date formatting
  lib/conditions.ts             collection queries (by locale, region, recency)
  lib/resources.ts              the same queries for examinations and rehabilitation
  lib/videos.ts                 the video index, read out of article bodies at build time
  assets/regions/               the author's drawing for each body-map region
  assets/illustrations/         his drawing for a condition, used as heroImage
  components/ArticleContents.astro  the on-this-page list, built from render()'s headings
  components/FilterBar.astro    the shared listing filter: box, count, reset
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
companion apps, related, JSON-LD), and the info and legal pages.

Also done: the MDX component set (`KeyFacts`, `RedFlags`, `Figure`, `Video`,
`Callout`, `Glossary`, `DoctorChecklist`, `ExerciseCard`), registered in
`src/components/mdx/index.ts` and documented with usage examples in
`docs/ARTICLE_TEMPLATE.md`.

Also done: Pagefind search at `/search` and `/en/search`.

Also done: the deployment layer — `vercel.json` headers, an Astro-generated CSP,
Cloudflare analytics behind `PUBLIC_CF_ANALYTICS_TOKEN`, RSS per locale,
generated `robots.txt`, a bilingual 404, `npm run lint:content`, CI, and
`docs/DEPLOY.md`.

Also done: all twenty condition articles in both languages, the import of the
author's app media — see "Articles" and "App media" below — and, on 2026-09-08,
the author's read-through and the publication of all forty.

Also done: the author's logo. `src/assets/logo.png` is his own mark, run through
`astro:assets` by `Logo.astro`, with `public/favicon-32.png`, `favicon-192.png`
and `apple-touch-icon.png` generated from it. It is raster, so unlike the
placeholder SVG it does not recolour with `--brand`/`--accent`; it is a
transparent PNG and reads on both themes.

Also done: Vercel Authentication was turned off on 2026-09-08, so the site is
publicly readable. It had been on for every `*.vercel.app` URL
(`all_except_custom_domains`), which put production behind a Vercel login.

Also done: the examinations and rehabilitation sections, and a real `/articles`
hub — see "The three new sections" below.

Still to do: a sticky table of contents, per-article OG images, and the
pre-launch QA pass. `/treatments` and the body map are done — see their
sections below.

### Publishing safety

`npm run lint:content` fails the build when an article carrying a `SAMPLE` or
`SEED` marker has `draft: false`, because that would publish it under the
author's name with `reviewedBy` set — a false claim of medical review. `SAMPLE`
marks copy Claude drafted; `SEED` marks a roadmap skeleton nobody has written.
Both are `draft: true` and must stay that way until the author has written and
read the article himself. The linter also fails on a published article with no
`sources`, on a `<Figure>` with no `alt`, on a `<Video>` with no `description`,
and on a `<Video>` or `<Figure>` whose `src` names a file that is not in
`public/`.

`lint:content` covers **all three article collections**, not just conditions:
the marker rule, the sources rule and the `<Figure>`/`<Video>` rules apply
wherever an article carries the author's byline. Two checks stay
conditions-only — the canonical section order, and the warning about a published
article with no `redFlags`, because an explainer on how a DXA scan works has no
urgent-symptom list to give and demanding one would invite filler.

**All 62 articles were published on 2026-09-08**, after the author said he had
read them — the forty condition files first, then the 22 examinations and
rehabilitation files. No `SAMPLE` or `SEED` marker remains anywhere in
`src/content/`, and every file is `draft: false` with `lastReviewed:
2026-09-08`. The rule itself has not changed: anything new that Claude drafts
gets a `SAMPLE` marker and `draft: true` until the author has read it.

### Articles

The nineteen condition seeds from the master plan's §33, **plus osteoporosis**,
exist in Thai and English — forty files, twenty slugs. All are published.
`docs/CONTENT-ROADMAP.md` tracks where each article's words came from.

Four of them — `frozen-shoulder`, `osteoporosis`, `rotator-cuff-tear`,
`acl-injury` — are built largely from the author's **own reviewed Thai**, taken
from `_extracted/` and re-pronouned from `ท่าน` to `คุณ`. They also carry his app
media. The apps cover recovery only for the two post-operative topics, so the
front half of `rotator-cuff-tear` and `acl-injury` (what the condition is, how
it is diagnosed, non-operative treatment) is new drafting and needs the closest
reading. The other sixteen are new drafting throughout.

**Every reference on the site came out of the PubMed tool.** This environment
has no outbound access to the usual patient-education sites, so each source's
title, journal and year was read back off the PubMed record before it was
written down, and each `url` is a `pubmed.ncbi.nlm.nih.gov` link. Twelve topics
were sourced this way when they were drafted; the remaining eight — ankle
sprain, carpal tunnel, knee pain, meniscus tear, meniscus root tear,
patellofemoral pain, tennis elbow, trigger finger — had `sources: []` until
publication, and were filled the same way. Never write a citation you cannot
check: on a page with a named doctor's byline an unverifiable citation is worse
than an empty field, and `lint:content` fails a published article with no
sources at all.

Topic 20 in the plan (MRI เข่า) is now `examinations/{th,en}/knee-mri.mdx`. It
was held back from the conditions collection on purpose — an imaging topic has a
different shape from a disease — and it went in as soon as `/examinations` had a
collection of its own.

### The section collections

`/examinations`, `/rehabilitation` and `/articles` became real on 2026-09-08,
and `/treatments` followed the same day.

- **`examinations` and `rehabilitation` are separate collections** sharing one
  base schema (`resourceSchema()` in `src/content.config.ts`) and one renderer,
  `ResourceArticle.astro`. They are not a `type` field on `conditions`, so a
  route, a listing and a schema rule can address one kind of page without
  filtering, and a change to one cannot reshape the twenty condition articles.
  `related` holds **condition** slugs in both, which is what lets a bone-density
  page point at osteoporosis.
- **`region` is required on a condition and optional on a rehab article**, since
  the principles that apply to every programme belong to no single joint.
  Examinations have no region at all.
- **`ResourceIndex.astro` is one page for two states.** While a collection has
  nothing published it shows the in-preparation wording `SectionStub` used to
  show; the moment something is published it becomes a listing. That is why
  those sections could be marked `live` before their content was reviewed
  without promising anything that is not there.
- **`/articles` adds nothing of its own.** It indexes the other collections and
  the demonstration clips, so it was finishable without the author reading new
  medical copy. Its video gallery **links to the hosting article rather than
  embedding a second player** — a clip is a silent demonstration whose cautions
  live in the prose around it.
- **The video index is derived, not maintained.** `lib/videos.ts` parses
  `<Video>` tags out of the article bodies at build time. A hand-kept list would
  drift, which is exactly the bug that already hit three rotator-cuff clips.

**`treatments` is the third collection on `resourceSchema()`** — self-care,
medicines by class, injections, surgery, and how to choose between them, five
topics in each language. Adding a collection means touching five places:
`content.config.ts`, the `ResourceCollection` union in `lib/resources.ts`, the
collection lists in `lib/videos.ts` and `ArticlesIndex.astro`, and `COLLECTIONS`
in `scripts/lint-content.mjs`. Miss the last one and the publication-safety
checks silently skip the new collection.

All 32 files in the three resource collections are published. Production builds
**115 pages**.

**The treatments articles are the one exception to the read-before-publish
rule.** The author asked for the section to be created *and published* in the
same instruction, so unlike everything else on the site they went live without
him having read them first. They follow the medical content rules — no doses
anywhere, drug classes only, evidence stated with its uncertainty — but if he
wants them held back, setting `draft: true` on the ten files is the whole job.

### App media

`scripts/import-app-media.mjs` is the one-off importer, kept in the repo so the
import can be re-run and audited. It converts images to WebP capped at 1200 px
into `src/assets/conditions/<slug>/` (79 MB of source became 0.9 MB) and copies
videos verbatim, deduplicated by SHA-256, into `public/media/<slug>/`.

- **Videos are not transcoded.** There is no ffmpeg in the toolchain, and the
  apps' own `media/video-prompts.md` warns that a generated clip can contain a
  few frames where the joint inverts. Re-encoding without checking each frame is
  not worth the bytes saved.
- **No poster stills.** Six video files are byte-identical across the frozen
  shoulder and rotator cuff apps and are stored once; none of them ships a
  poster, and there is no ffmpeg to cut one, so `<Video>` uses a designed
  facade panel rather than a frozen frame.
- `<Video>` requires a `description` prop and throws without one. A silent
  demonstration clip carries all of its meaning in the picture, so without a
  text description the content simply is not there for a blind reader.
- Every imported file was checked individually for a Google C2PA credential
  before import (`grep -a c2pa`), not taken on trust from `docs/SOURCES.md`.
  All 47 carry one; the five that do not were left out.
- **`npm run lint:content` now fails on a `<Video>` or `<Figure>` whose `src`
  points at a file that is not in `public/`.** This is not theoretical: three
  rotator-cuff clips referenced `public/media/rotator-cuff-tear/…` paths that
  deduplication had collapsed into the frozen-shoulder folder, and nothing
  caught it — the clip is only requested after the reader presses play, so the
  page loads clean and Playwright saw a working facade. It also fails on a
  `<Video>` with no `description`.
- The 36 MB of video in `public/` is copied into `dist/` on every build even
  though the articles that use it are still drafts. That is correct once they
  publish; if it becomes a problem before then, move the folder rather than
  deleting files the articles reference.

### Deployment notes

- The CSP is generated by Astro (`security.csp` in `astro.config.mjs`) and
  delivered as a `<meta>` tag, so it can carry per-page hashes for inline
  scripts and styles and avoid `'unsafe-inline'`. It cannot move to
  `vercel.json`, which holds only the static headers. Any new third-party host
  must be added to `security.csp` or the browser blocks it silently.
- `'wasm-unsafe-eval'` in the script directive is required: Pagefind runs its
  index in WebAssembly and search fails without it.
- **The origin is `origin` in `src/data/site.ts` and nowhere else.**
  `astro.config.mjs` imports it, `domain` is derived from it with `new URL()`,
  and everything else reads `Astro.site`. Changing domain is a one-line edit.
- **Absolute URLs are built from `Astro.site`, never from the request.**
  `BaseLayout` normalises the path through `stripLocale` + `localizePath`
  before joining it to the origin, so canonical, `hreflang`, `og:url`, the
  feeds and the sitemap all spell a page the same way — no trailing slash, the
  language prefix applied once — and a forged Host header or a preview domain
  cannot change what a page claims to be.
- **The sitemap needs `serialize` to agree with the canonical tags.**
  `@astrojs/sitemap` writes every URL with a trailing slash and has no option
  to turn that off in this version (`trailingSlash` is rejected as an
  unrecognised key, and passing it makes the integration emit no sitemap at
  all). The `serialize` hook in `astro.config.mjs` trims it from each entry and
  each language alternate, leaving the root's slash alone.
- **hreflang: self, alternate, x-default.** A page always links to itself in
  its own language — a cluster whose members do not name themselves is ignored
  — and only adds the other two when the counterpart page was really built.
  The routes compute that: the file exists in the other language, it is not a
  draft in this build, and `translationPending` is false. `translationPending`
  had never been read by anything until then. The sitemap is safe by
  construction — `@astrojs/sitemap` pairs languages from the built URL list and
  omits the alternates entirely when a page exists in one language — but it
  does not know about `translationPending`, so a pair that is built but flagged
  pending is dropped from the page's hreflang and still paired in the sitemap.
  Keep the untranslated side `draft: true` if that ever matters.

### The header

`Header.astro` is the site's only navigation, and three things in it are
load-bearing.

- **The search button carries its own `aria-label`.** Its text is
  `hidden sm:inline` and the icon is `aria-hidden`, so below 640px the link had
  no accessible name at all — an unlabelled link to the only search entry point
  on the site. `search.linkLabel` ("ค้นหาในเว็บไซต์" / "Search the site") starts
  with the same word the visible label shows, which is what keeps speech
  control working while that label is on screen (WCAG 2.5.3).
- **Section state is not page state.** `aria-current="page"` is only ever the
  exact page; a section that merely *contains* the current page —
  `/treatments` while reading `/treatments/surgery` — gets `aria-current="true"`
  and an outlined pill instead of a filled one. Two shapes, not two colours.
  The match runs through `isWithinSection` in `i18n/utils.ts`, which exists
  because a `startsWith` test would mark Home as the current section on every
  page (every path starts with `/`) and would count `/treatments-old` as inside
  `/treatments`. Paths are compared after `currentPath`, i.e. locale-stripped —
  `stripLocale` already drops a trailing slash, since it filters empty
  segments.
- **The mobile menu's no-JS path is a `<noscript>` copy of the list**, hidden
  from md up. It is not a `<style>` or an inline script, and that is not a
  style preference: **Astro's `security.csp` hashes only the scripts and styles
  Astro itself generates, so an `is:inline` script is refused by the browser** —
  the same trap as the `style=""` attribute, and it was hit while building
  this. `<noscript>` needs neither. With scripting on, the parser treats its
  contents as text, so there is no second nav in the DOM, the accessibility
  tree or the tab order; `NavList.astro` renders the list for both copies so
  they cannot drift.

The disclosure is a disclosure, not a modal: no focus trap, no inert page, and
links inside it navigate normally. `aria-expanded` and the nav's `hidden` class
are set in one function so they cannot disagree. Escape closes it and returns
focus to the toggle **only when focus was inside the menu** — pressing Escape
while reading further down the page must not throw the caret back up to the
header. Resizing needs no handler at all: `hidden` only bites below md because
the nav also carries `md:block`, so the desktop row is unaffected by whatever
the button last said, and the state survives a round trip.

**`brand.promise` is not in the header.** It used to sit beside the wordmark
from lg up — the one width at which the home page's hero shows the same
sentence in full, a hundred pixels below. The header is for getting somewhere;
the promise is a statement about the site, and the home page is where it
belongs. Its `flex-1` was also what pushed the search button to the end of the
row, which is why that button no longer drops its `ms-auto` at lg. Removing it
changed no header height: it was `hidden` below lg, and from lg up the row is
sized by the logo block.

The toggle button stays visible without JavaScript even though it cannot do
anything there. Hiding it would need the same CSS the CSP refuses, and the
menu below it is already open in that case, so the cost is a button that does
nothing on a page where nothing needs it.

### The listing filter

`FilterBar.astro` is the filter on `/conditions` and on `/articles`. One
component, because two copies of "hide the cards that do not match" drift.

- **The page marks its own content, the component owns the behaviour.** Items
  carry `data-filter-item` plus a lowercased `data-search` string (title,
  summary and keywords) and, on conditions, `data-region`. Groups carry
  `data-filter-group`; a jump link carries `data-jump-for` with the same id.
  When a filter empties a group the component hides the group **and** its jump
  link — a heading with nothing under it is worse than no heading, and a jump
  link to a hidden group goes nowhere.
- **The count is a polite live region**, so a screen-reader user hears "แสดง 6
  จาก 20 เรื่อง" instead of watching cards vanish in silence. It is written on
  a 250ms timer: announcing every keystroke talks over the typing. `/articles`
  passes `showTotal={false}` because that page already prints its own count —
  the live region is still there, it just says nothing until it has something
  to report.
- **Reset is a link, not a button.** `href` is the page itself, so it works
  with no JavaScript; the script intercepts the click, clears the box and the
  chips in place, and puts focus back in the box. It appears as soon as
  anything is filtered, not only when the filter finds nothing: a reader
  looking at three of twenty cards needs the way back as much as one looking
  at none.
- **The zero-results message is about the filter.** It used to reuse
  `error.404.body` — "the page may have moved or no longer exists" — which was
  neither true nor about the filter.

Strings reach the script the way the search page does it: a
`type="application/json"` block, which is not executable and so is not
something the CSP has to hash. `t()` only substitutes the variables it is
given, so calling it with none returns the template with `{n}` and `{total}`
intact for the browser to fill in.

Without JavaScript the box and the chips do nothing, and that is the
pre-existing bargain on these pages: **the full list is always in the HTML**,
so nothing is unreachable — the filter only ever hides.

### The region empty state

`RegionPage` renders an explanation and a link to the conditions index when a
region has nothing published. **No route reaches it today**: both region
routes build only the regions with a published article *in that locale*, so
`/regions/hip` (nought articles) does not exist and the body map renders that
dot inert rather than linking. The branch is there for the day a region's only
article is held back, or is written in one language before the other, and it
was tested by routing every region temporarily.

The wording is deliberate and worth keeping deliberate: an empty region page
must not read as reassurance. A body part with no articles yet says nothing at
all about the reader's symptoms, and the site cannot see them — so it says the
articles are being written, says that it means nothing about them, and points
at the full index.

### The article contents list

`ArticleContents.astro` renders the "หัวข้อในหน้านี้" / "On this page" list on
every condition and resource article. Four things about it are load-bearing.

- **It is built from `render(entry)`'s `headings`, never from the MDX source.**
  Astro's markdown pipeline gives every heading an id and hands the same list
  back, so the links and the anchors come from one place. A regex over the
  Markdown would have to reimplement the slugger — Thai keeps its characters,
  spaces become hyphens, and a repeated title gets a `-1` suffix (verified: two
  `## หัวข้อซ้ำ` headings produce `หัวข้อซ้ำ` and `หัวข้อซ้ำ-1`) — and the two
  would drift the first time an author wrote something the regex missed.
- **Only the MDX body is listed.** The FAQ, references, companion apps and
  related blocks are rendered by `ConditionArticle`/`ResourceArticle` after the
  body, carry no ids, and are appendices rather than parts of the article. The
  component headings inside `KeyFacts`, `DoctorChecklist` and the rest are not
  markdown headings, so they never reach `headings` — which is why the list
  starts at "โรคนี้คืออะไร" and not at "สรุปสั้น ๆ".
- **h2 is the outline; an h3 is listed only where its parent h2 has at least
  two of them.** A section with one subheading needs no help; the ACL article's
  twelve-part recovery section is exactly what the list is for. Fewer than
  three entries in total and the component renders nothing at all.
- **It is `<details>`, closed in the markup, opened from md up by its own
  script.** `open` is an attribute and CSS cannot set it, and forcing a closed
  `<details>` open from a stylesheet is not reliable — so a phone gets a
  compact disclosure and a desktop a plain two-column list. Without JavaScript
  it stays closed at every width, which is a working control rather than hidden
  content. There is no sidebar because there is no room: the reading column is
  68ch and nothing else fits beside it. It is not sticky.

It carries `data-pagefind-ignore`, so the headings are not indexed twice —
confirmed through Pagefind's own API, not just by reading the attribute — and
`@media print` hides it, because a page of links nobody can click is a wasted
sheet of paper.

**The warnings stay above it and outside it.** The draft banner, the
overdue-review notice and the red-flag box are rendered before the contents
list and are never inside the disclosure: nobody should have to expand
anything to be told to go to hospital.

### Search notes — read before touching search

- **Test search with `npm run build && npm run preview`, never `npm run dev`.**
  Pagefind indexes the built output, so the index does not exist in dev; the
  search page renders an explanatory notice there instead of a broken box.
- **Pagefind has no Thai analyser.** `pagefind-entry.json` shows
  `"th": { "wasm": null }` — Thai falls back to the generic handler, which
  **strips Thai tone marks**. เข่า (knee), เข้า (enter) and เขา all match each
  other. This is not fixable from our side; design around it.
- **Pagefind falls back to fuzzy matching**, so a query that matches nothing
  can still return pages. `zzzqqqxxx` returns the DXA page in the Thai index
  and `วววฬฬฬ` returns sixteen. A test that needs a genuinely empty result set
  has to be checked rather than assumed — `qwxzvkjhg` is empty in both locales.
- Two mitigations, both load-bearing:
  1. Info pages carry `data-pagefind-weight="0.25"` so articles out-rank them,
     while they stay findable by their own words. Both halves still hold:
     searching นโยบาย returns `/privacy/` first at 19.149, and for เข่า the
     four info pages rank **28th, 31st, 34th and 37th of 39**, scoring
     0.091–0.038. **This is the mitigation that keeps the privacy notice out
     of a search for เข่า** — not the cutoff below.
  2. `public/search.js` takes the top 20 hits and drops any scoring below 30%
     of the top score.

  **Re-measured on the 2026-09-10 build, 115 pages, all nine reference
  queries** (ปวดเข่า, เข่า, ไหล่ติด, มือชา, รองช้ำ, knee pain, frozen
  shoulder, numb hand, heel pain). What the numbers actually say:

  | query | hits | top | kept of 20 | what the cutoff removes |
  |---|---|---|---|---|
  | ปวดเข่า | 34 | 2.494 | 20 | nothing |
  | เข่า | 39 | 0.634 | 10 | tone-fold noise from 0.185 down |
  | ไหล่ติด | 17 | 4.858 | 15 | acl-injury, meniscus-root-tear |
  | มือชา | 20 | 5.097 | 17 | three knee/foot articles |
  | รองช้ำ | 1 | 23.565 | 1 | nothing |
  | knee pain | 20 | 16.947 | 7 | acl-injury (4.817) and below |
  | frozen shoulder | 5 | 32.59 | 3 | rotator-cuff-tear (8.034) |
  | numb hand | 18 | 5.024 | 17 | plantar-fasciitis |
  | heel pain | 8 | 10.54 | 6 | patellofemoral-pain, meniscus-root-tear |

  **The cutoff was left at 0.3, and the evidence for that is mixed rather than
  clean.** It earns its place on เข่า, where it removes half the list. But it
  is not a noise filter everywhere: it drops acl-injury from *knee pain* and
  rotator-cuff-tear from *frozen shoulder*, both plausibly worth showing, while
  keeping frozen-shoulder — a shoulder article — in the results for เข่า at
  0.251. No threshold separates signal from noise on this corpus, so moving the
  number trades one visible wrong answer for another. **Do not retune it
  without measuring all nine queries again**; two of the three claims that used
  to justify it here (the 0.94/0.26 figures, and "without it เข่า returns the
  privacy notice") were already stale when this table was measured. The top-20
  slice does much of the work the cutoff is credited with.
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

**The query lives in the URL, and `replaceState` puts it there.** Typing syncs
`?q=` so a result set can be bookmarked, shared or reloaded — but never with
`pushState`, which would leave a history entry per keystroke and strand the
reader inside their own typing. Once typing keeps the URL in step there is
nothing left for Enter to push that is not already the current entry, so submit
does not push either: it cancels the debounce and runs the query at once, which
is what a reader who types and hits Enter quickly is asking for. Back therefore
leaves the search page, and any entry the reader *does* arrive at — a bookmark,
a shared link, Forward, Back from an article — is re-read by `fromUrl`, which
refills the box and re-renders. `popstate` is wired to the same function.

**Every render carries a token and a stale one throws its results away.** A
slow query that resolves after a newer keystroke must not repaint the list, and
that includes the failure path: the `catch` checks the token before it writes
the unavailable message.

**An IME composes over several keystrokes** — Japanese and Chinese always, Thai
on some keyboards — and the half-formed text in the box is not something anybody
meant to search for. `compositionstart` cancels the pending debounce and gates
the `input` handler; `compositionend` searches once. Submit clears the flag, so
a composition abandoned without an `end` event cannot wedge the box.

**Failure and emptiness both offer real links, not a sentence.** When Pagefind
cannot load, and when a query matches nothing, the list renders the two browse
destinations (`/conditions` and `/articles`, localised) rather than telling the
reader to go and find them. A `<noscript>` block does the same for a reader with
no JavaScript, where the box cannot work at all — `<noscript>` for the same
reason the header uses it, since our CSP refuses an `is:inline` script.

The status line is `role="status"` with `aria-live="polite"` and
**`aria-atomic="true"`**: it says four different things over a search's life
(searching, a count, no results, unavailable), and without `aria-atomic` a
screen reader announces only the words that changed, which turns "พบ 20 รายการ"
into "20".

### CSS and layout traps — all three were live bugs

- **Base element styles must stay inside `@layer base` in `global.css`.**
  Tailwind puts its utilities in `@layer utilities`, and an *unlayered* rule
  beats a layered one no matter the specificity. An unlayered
  `a { color: var(--accent) }` therefore overrode every Tailwind text-colour
  utility on a link: the header's search button rendered teal-on-teal, i.e.
  invisible, and nav links ignored `text-muted`. Anything new that styles bare
  elements goes in that layer too.
- **Anchor offset lives in `--header-offset`, not in a magic number.** The
  header is sticky and changes height with the viewport — measured, in both
  languages, with the menu closed: 124px below sm, 76px from sm, 183px from md
  (the nav row appears while the top row still wraps) and 132px from lg. `html
  { scroll-padding-top }` reads the token, so the skip link and every in-page
  anchor clear the header at every width. It used to be a flat `5rem`, which
  left an anchor target under the header nearly everywhere. Re-measure if the
  header gains a row or the nav gains an item.

  **One offset, in one place.** `.prose h2`/`h3` also carried
  `scroll-margin-top: 5rem`, and the two add: scroll-padding pulls the
  scrollport's edge down, scroll-margin pushes the target's box up, so a
  heading landed `--header-offset` plus 5rem from the top — a third of the way
  down the viewport, which reads as the wrong heading entirely. The prose rule
  is gone; do not add a second offset anywhere.
- **Never use a `style=""` attribute.** Our CSP hashes `<style>` elements but
  cannot cover style attributes, so an inline style is silently refused by the
  browser — the hero gradient simply did not paint. Put it in a class in
  `global.css`.
- **An `auto-fit`/`auto-fill` grid minimum must be capped by the space
  available.** `minmax(16rem, 1fr)` cannot shrink below 16rem, so in a narrow
  panel the *card* grows wider than its own track and breaks out. Measured at
  320px: the triage card was 256px in a 230px track — 26px out through the
  panel's padding — and the reviewed-articles card 10px. It never showed up as
  page overflow, because the panel and container padding absorbed it, so
  `scrollWidth` stayed clean while the card visibly crossed the panel edge.
  Write `minmax(min(16rem, 100%), 1fr)`; every grid on the home page now does,
  and `/tools` already did.
- **`line-clamp-N` and `block` cannot both be on the same element.** Tailwind's
  `line-clamp` works by setting `display: -webkit-box`, and a `block` next to it
  wins the cascade and turns the clamp off silently — `-webkit-line-clamp` stays
  in the computed style, doing nothing. The home page's card summaries carried
  both from the day they were written and ran to six lines instead of two, which
  is why every card in a row was a different height.
- **Give flex and grid children `min-w-0` on any Thai text.** Thai has no
  spaces, so a heading is one unbreakable token, and `overflow-wrap: break-word`
  does *not* reduce an element's min-content contribution. A grid item defaults
  to `min-width: auto`, so the hero column was sized to the full width of the
  site name and pushed the page 11px wider than a 390px viewport. Headings now
  also carry `overflow-wrap: break-word`, but that alone is not enough.

### The body map

`BodyMap.astro` puts clickable hotspots over `src/assets/body-map.png`, the
author's own drawing of two figures. Three things about it are load-bearing:

- **The coordinates live in `global.css`, keyed off `data-region`**, not in a
  `style` attribute. Our CSP hashes `<style>` elements but cannot cover style
  attributes, so inline positioning is refused silently and every hotspot piles
  up in one corner.
- **A hotspot is anchored by its dot, not by the middle of the pill.** Centring
  the whole pill on the landmark is what put the elbow and the hand in the
  middle of the torso the first time. Labels then flow outwards, away from the
  figure, so they never cross it — `.to-left` flips that for the left figure.
- **The coordinates were measured off the artwork's alpha channel, not guessed.**
  The drawing is 1200×800. The figures occupy x 13–44% and 55–86%, the arms
  reach their widest at y 50%, and below y 58% there are no arms in the outline
  at all. Re-measure if the drawing is ever replaced.

**The map is 44rem and renders from `lg`, and both numbers are load-bearing.**
It used to be 34rem from `md`, and that was measured to be too small for its
own labels:

- A hotspot is 44px tall to meet the touch-target rule. At 34rem the drawing is
  363px high, so the 10% between elbow (40%), hand-wrist (50%) and hip (60%) is
  36.3px — **the three tap targets on the left figure overlapped each other by
  8px at every width**, in both languages (elbow/hand-wrist 87px of horizontal
  overlap in Thai, 85px in English; hip/hand-wrist 49px and 31px). The visible
  pills never touched, so nothing looked wrong; the clickable boxes did, which
  is a mis-tap you cannot see. CLAUDE.md used to claim here that the y values
  were "spread far enough apart that two labels in the same column cannot
  overlap" — that was measurably false.
- At 44rem the drawing is 704×469 and the same 10% is 46.9px, so the targets
  clear each other **without a single coordinate moving**.
- 44rem needs room the tablet does not have: the longest label ("Hand & wrist",
  167px) reaches 57px left of the drawing, and at 768px the panel is only 664px
  wide — the English hand-wrist label already crossed 19px past the panel's
  inner edge at 34rem. From `lg` the panel leaves at least 108px of slack on
  that side. So the map waits for `lg` and the circle grid covers phone **and**
  tablet. Measured at 1023px the grid is 8 columns with no clipped label in
  either language.

**The back-view figure's labels sit on a leader line.** Its two landmarks —
neck and spine — are at x 71% on a figure spanning 55–86%, i.e. in the middle
of it, so a label beside the dot lay across the drawing: the spine label
crossed the torso edge at 76% and both arm lines at 79–80% and 84–84.5%. The
dot has to stay on the spine, so the label moves instead — `has-leader` in
`global.css` pushes it 7rem clear and joins it back with a dashed rule. A fixed
7rem is safe because the map is exactly 44rem at every width it renders at.
The left figure needs none of this: its dots are already on the outer edge and
its labels run away from the body.

The drawing is black line art on transparency, so it is inverted under
`prefers-color-scheme: dark` — that turns the lines white and leaves the
transparent areas alone.

### The author's illustrations

On 2026-09-10 the author uploaded eighteen flat illustrations to `images/` and
asked for them to be placed. Each is an 800×800 PNG whose artwork is a **circle
inside a square**, with only soft gradient in the corners — so every use crops
with `object-cover`, which throws away corner and nothing else, and the circular
crop in the region grid lines up with the drawing by construction.

They went to three places, and the files were moved out of `images/` rather than
copied, so there is one copy of each in git:

- `src/assets/regions/<region id>.png` — the eight body-map regions, rendered by
  `RegionArt.astro`. **The three browsing categories that are not body parts —
  bone-health, paediatric, sports — have no drawing**, and fall back to the line
  glyph in `BodyIcon.astro`. Those three glyphs did not exist until now, which
  is why the osteoporosis card on the home page rendered an **empty panel**:
  `BodyIcon` keys off the region id and simply had no path for `bone-health`.
  Any new region needs either a drawing here or a glyph there.
- `src/assets/illustrations/<condition slug>` — a drawing per condition, wired
  in as `heroImage`/`heroImageAlt` in the frontmatter of both language files.
  The schema has carried those two fields since the beginning and nothing
  rendered them; `ConditionArticle` shows the image under the summary, and
  `RegionArt` takes a condition's own image as an override, so its cards show
  the condition rather than its region.

  **All twenty conditions have one now, and they come in two shapes.** The
  first nine are the square 800×800 badges described above. The other eleven —
  achilles-tendinopathy, frozen-shoulder, herniated-disc, meniscus-root-tear,
  meniscus-tear, neck-pain, osteoporosis, patellofemoral-pain, sciatica,
  tennis-elbow, trigger-finger — arrived on 2026-09-10 committed straight to
  `src/assets/illustrations/`, and are 4:3 scenes at 1024×765. Several carry an
  inset anatomical diagram with labels on it. (frozen-shoulder first landed as
  a 2400×1792, 1.7 MB export; the author replaced it with a 1024×765 one the
  same day, so the set is uniform.)

  **They were uploaded as `.png` and are JPEGs inside**, every one of them.
  They were renamed to `.jpg`; the bytes are the author's, untouched. Astro
  reads the real format through sharp and emits webp either way, so the site
  worked regardless — but the extension has to match the file or the served
  `Content-Type` is a lie the browser has to sniff its way past.

  **The article hero sizes itself by shape.** A square badge is held to
  `max-w-[20rem]` so it does not tower over the prose; a 4:3 scene gets
  `max-w-[34rem]`, because squeezing a labelled inset diagram to 320px makes it
  unreadable — which matters on a site written for older readers. `sizes` has
  to branch with it, or the browser fetches a 34rem file for a 20rem slot.
- `src/assets/sections/rehabilitation.png` — the runner, beside the heading on
  `/rehabilitation`. `ResourceIndex` maps collection → art, and the other two
  sections simply run without a picture rather than borrowing one.

**The home page's featured and reviewed cards show these as an 80×60
thumbnail, not a banner, and with `object-contain`.** They were full-width 4:3
panels — 247×185 at 1280 and 300×225 at 390, nine of them on one page — and the
crop was not the harmless one this note used to claim. Measured: **seven of the
nine cropped 25% off the top and bottom**, because those seven are the square
badges and the box was 4:3; only the two 4:3 scenes fitted. A quarter of the
height off a circle-in-a-square takes the top and bottom off the circle, not
"the soft edge".

The two shapes mean *any* single box ratio crops one set or the other, so the
box no longer crops at all: `RegionArt` takes a `fit` prop, the cards pass
`contain`, and both shapes sit whole on the panel's own ground. The box keeps
4:3 so every card matches. **The region circles keep `cover`** — there the box
is square and so is the badge, so the crop only ever removes the soft corners,
which is what that layout wants.

Shrinking the media took the Thai home page from 8052px to 5929px at 390px and
4057px to 3442px at 1280px.

`images/back pain.png` is the one upload still unused — it is the older,
non-square version of `back_pain.png`, which is now the back-pain article's
illustration.

### Homepage

`src/components/Home.astro` follows the author's design mockup: a hero,
"ปวดตรงไหน?" body regions, four "คุณอยากรู้อะไร?" cards, common conditions,
when-to-see-a-doctor, latest articles and trust marks. The mockup's author
strip was built and then removed at the author's request — see "Decisions the
author has made"; the hero's search field went the same way.

**The promise appears exactly once on the site, here.** See "The header".

**The hero says one thing and offers one action.** It had four turns of the
same phrase — the site name, `brand.promise`, `hero.body`, then `hero.note`
above the illustration and `hero.badge` overlapping its corner. The last two
are gone. What is left is the identity, the promise, the purpose, and then:

- **one primary action**, `home.primaryAction` ("เลือกตำแหน่งที่ปวด" / "Choose
  where it hurts"), anchored to `#where-it-hurts`;
- **a quiet link to `#when-to-see-a-doctor`**, whose text is `triage.title`
  itself so the link and the heading it lands on can never say different
  things;
- the popular-search chips;
- **a small link to the editorial policy**, `home.editorialLink`. That is the
  only trust signal the hero carries: the author's name, his credentials and
  the review dates are deliberately not there.

**`#where-it-hurts` and `#when-to-see-a-doctor` are part of the page's
contract** now that the hero links to them. Renaming either breaks a link on
the same page.

**The four cards are named after the sections they open**, not after questions
the site cannot answer. "ฉันเป็นอะไร?" / "What is wrong with me?" promised an
assessment and led to a library of explanations; "ฉันควรทำอะไรตอนนี้?" / "What
should I do now?" promised immediate personal advice and led to phase-based
rehab programmes. A card label that does not match its destination is a
promise the next page has to break.

**The hero image is `src/assets/hero-shoulder-pain.png`**, the author's own
illustration, through `astro:assets`. Like any opaque raster image it does not
follow the theme: in dark mode it stays a pale panel on the dark ground. It is
rounded and bordered so it reads as a deliberate illustration card — the same
concession the QR codes make.

**It is `loading="lazy"`, and that is about the phone, not the desktop.** Its
column is `display: none` below `lg`, and *an eager image inside a hidden box is
still fetched*: measured at 390px, the hero webp was downloaded in full — 6,986
bytes of a 29 KiB page — for a picture the reader never sees. A lazy image in a
`display: none` box is not fetched at all, and from `lg` up it is in the
viewport when the page lays out, so it still starts immediately;
`fetchpriority="high"` keeps it ahead of the region drawings further down.
Verified both ways: no hero request at 320/390/768, one at 1024/1280. The phone
now fetches 22.6 KiB before scrolling instead of 29 KiB.

**There is deliberately no compact hero illustration on the phone**, and that
was tested rather than assumed. At 390px the primary action already sits 391px
down in Thai and 406px in English, and `#where-it-hurts` at 680px and 730px —
one screen on a phone with nothing to spare. Any illustration above them pushes
both past the fold, and the illustration is atmosphere where the button is the
point. If this is ever revisited, measure those two numbers again first.

Nothing is positioned over it any more, and if anything ever is again it
**must carry its own background**: the italic `hero.note` used to, which was
invisible while the panel was an empty placeholder and became a half-on-dark,
half-on-artwork collision once a real illustration landed.

**There is no search field in the hero.** The author asked for it off on
2026-09-08; the chips beneath it stayed, relabelled `hero.popularLabel`, because
they are ordinary links to real searches and their old "examples" label pointed
at a field that is no longer there. **The teal button in the header is now the
only search entry point on the site, so it must never be removed** — nothing
else links to `/search`.

**The featured strip is curated, and says so.** It used to be
`published.slice(0, 6)` under the heading "โรคและอาการยอดนิยม" / "Common
conditions" with the sub-line "เรื่องที่คนค้นหามากที่สุด" / "What people look
for most" — a popularity claim nothing on this site measures, over a selection
that was simply the first six articles in each language's alphabet. The two
home pages therefore led with different topics in an order nobody chose.

`src/data/featured.ts` now holds the slugs, in the order they appear, and
`getFeaturedConditions` resolves them against what the locale publishes. It is
**slugs only** — the title, summary and illustration come from the article, so
the list cannot go stale against what it names. Both languages share a slug, so
one list serves both. The heading is "หัวข้อแนะนำ" / "Featured topics" and the
sub-line offers it as a starting point, which is what it is. The chips under
the hero lost the same claim: `hero.exploreLabel`, "ลองอ่านเรื่อง" / "Explore
topics".

A slug naming a missing, untranslated or draft article is dropped rather than
rendered as an empty card, and the whole section is absent rather than empty
when nothing resolves. Featured uses `getPublishedConditions`, so a draft is
skipped **even in a preview build** where the rest of the site shows drafts:
a strip that says "start here" should not point at something the author has
not finished reading. He still reaches it from the conditions index, which is
where reviewing drafts belongs.

**The strip below it is "บทความที่ตรวจทานล่าสุด" / "Recently reviewed", not
"latest articles"** — it is ordered by `lastReviewed`, and calling that
"latest" would promise a publication order it does not have. It also skips
whatever the featured strip already shows, by passing those slugs to
`getRecentlyReviewed`'s `exclude` set; filtering happens before the limit, so
an excluded article promotes the next one instead of leaving a gap, and if the
list runs short it stays short. Its "ดูบทความทั้งหมด" / "All articles" link
goes to `/articles`, the hub it names; it used to go to `/conditions`.

Worth knowing: **every article carries the same `lastReviewed`** (2026-09-08,
the day they were all published), so that sort is a no-op over the
title-sorted list and the two languages show a different three. That is not
wrong — they really were all reviewed the same day — but the strip will only
become meaningful when review dates start to differ. Do not manufacture dates
to make it look livelier.

Both strips show titles without dates, for the same reason the article byline
does.

Deliberate departures from that mockup, each with a reason:

- **No stock photography.** The design uses stock photos for the hero, the
  region circles and the condition cards. Those need licensing and do not adapt
  to dark mode. The author has since drawn his own illustrations for the hero,
  the eight regions and all twenty conditions — see "The author's illustrations" —
  and everything still uncovered falls back to an SVG glyph
  (`BodyIcon.astro`, `Logo.astro`). Like any opaque raster the drawings keep
  their pale ground in dark mode, which is why each one carries a border.
- **Eight body-map regions, not nine.** `regions.ts` combines foot and ankle.
  Change the data first if the design's split is wanted.
- **No social icons in the footer**, because no accounts exist yet, and no
  author link either — see "Decisions the author has made".

The nav caught up with the plan: การตรวจ, การรักษา, ฟื้นฟู, เครื่องมือผู้ป่วย
and บทความ & วิดีโอ all have real pages now and are all in the menu, with
`conditions` the only entry deliberately hidden from it.

### Sections and routes

`src/data/sections.ts` is the single source for the main navigation and the
section landing pages. A section is `live` or `planned`; a planned one still
gets a real page (`SectionStub.astro`) that says it is being prepared and points
the reader at search or the conditions index. That is why the navigation can
carry the plan's full eight entries without shipping a single 404 — add a
section there and both the nav and its page follow.

No stubs are left — `examinations`, `rehabilitation`, `articles` and
`treatments` all went `live` on 2026-09-08 with published content. Keep the
in-preparation fallback in `ResourceIndex.astro` anyway: it is what lets a new
collection be added and routed before its first article has been reviewed.

**`conditions` carries `hiddenFromNav: true`.** Its index duplicates what
"บทความ & วิดีโอ" lists, so the author asked for the menu item to go — but the
page holds the region filter and the type-to-filter box, and the body map, the
homepage cards, the region pages and every article breadcrumb link straight to
it. The nav is built from `navSections`, not `sections`, so hiding an entry
never removes its route.

`/terms` from the plan's route list is **not** built: it needs legal wording the
author has to supply, and inventing terms of use would be worse than not having
the page. The footer links to the disclaimer, privacy notice and editorial
policy, which do exist.

### Images

`docs/IMAGE-SOURCES.md` is a register: an image may not go on the site unless
its source and licence can be stated truthfully there. This is not bureaucracy —
five images in the author's own apps have stripped metadata and unknown origin,
and this site carries a named doctor's byline.

### QR codes

`QrCode.astro` generates each code as inline SVG **at build time** from the live
URL, so a code cannot drift out of date the way an exported PNG would — change
`site` in `astro.config.mjs` or a URL in `src/data/apps.ts` and every code
regenerates. `/tools` carries one per companion app plus one for the site
itself.

Two things that are deliberate and should not be "fixed":

- **The code panel stays white in dark mode.** A QR needs dark modules on a
  light ground to scan reliably, so it does not invert with the theme.
- **`margin: 2`** keeps the quiet zone the QR spec requires. Without it many
  scanners fail on a code that sits flush against other content.

The site code encodes whatever `origin` in `src/data/site.ts` is set to, which
is the live `rueortho.vercel.app` deployment, so the codes scan to a real page.
If a custom domain is mapped later, every code regenerates from that one line —
but codes already printed on paper will keep pointing at the Vercel address, so
wait for the domain before printing anything.

`/tools` (เครื่องมือผู้ป่วย) is `live` rather than a stub because the companion
apps *are* the patient tools. A grid whose `minmax` minimum exceeds the viewport
overflows, so it uses `minmax(min(23rem,100%),1fr)`.

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

**Drafts are excluded from the build**, so an article that is still
`draft: true` has no page in `dist/` and can only be driven through
`npm run dev`. To check one against the real CSP, temporarily set
`draft: false` and delete its `SAMPLE` marker, build, test, then put both back.

**Playwright's Chromium cannot decode H.264.** `canPlayType('video/mp4;
codecs="avc1…"')` returns `''` there, so a `<video>` pointed at any of the app
clips — all of which are `avc1` — fires `MEDIA_ELEMENT_ERROR` code 4 with
`readyState: 0`. That is the test browser, not the site: H.264 in an MP4 is the
most widely supported video format there is, and these same files play inside
the author's own PWAs. Assert on the `<video>` element being created with the
right `src`, and fetch the URL to prove it serves 200; do not assert on
playback.
