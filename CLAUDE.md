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
  (`npm run lint` is an alias for the same thing). It reads `scripts/*.mjs`
  too — an unused import in one of those is a hint, and hints count.
- `npm run lint:anchors` — every in-page anchor in `dist/` points at an id that
  exists. Needs a build first; see "The anchor check" below for why it is a
  script of ours rather than a lychee flag.

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
  **`https://easybone.org`** since 2026-09-24 — the author's own domain,
  attached and verified on the Vercel project on 2026-09-23. It was
  `https://rueortho.vercel.app` before; that address now **308-redirects** to
  easybone.org, as does `www.easybone.org` — see "The domains" under
  Deployment notes. `easyortho.com` was never registered, and `easyortho.org`
  is no longer used. A branch preview URL must never go in there.
- **Never upload a hand-made `sitemap.xml` or a `sitemap.ts`.** The build
  generates `/sitemap-index.xml` and `/sitemap-0.xml` from the pages that
  exist (`@astrojs/sitemap`), and `robots.txt` points at the index. On
  2026-09-23 three files were uploaded to `main` — a Next.js `sitemap.ts` at
  the root and in `public/`, and a one-URL `public/sitemap.xml` — and **CI went
  red on every push** from then: `astro check` cannot resolve `import … from
  'next'`, because this is not a Next.js site. Vercel kept deploying, since its
  build does not run `astro check`, so the failure was silent on the live
  site. They were removed on 2026-09-24. The sitemap to submit to Search
  Console is `https://easybone.org/sitemap-index.xml`.
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
- **A standalone text link needs `tap-24`.** WCAG 2.2 AA asks for a 24x24
  target, and the site's own goal is 44px — but a link in a run of text cannot
  reach either without pushing the lines apart. The footer links measured 19px
  tall, the breadcrumb links and the hero's editorial line 16px. `.tap-24` in
  `global.css` adds 5px of vertical padding, which on an *inline* element grows
  the border box the browser hit-tests while leaving the line box alone: the
  target gets bigger and nothing on the page moves. Links **inside a sentence
  are exempt** from 2.5.8 and must stay unpadded — padding them makes
  neighbouring lines' targets overlap, which is worse than the thing it fixes.
  The footer list also went `gap-y-2` to `gap-y-3`, because at 390px it wraps
  and 8px between rows would let two padded rows touch.
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
- **The Thai reads as Thai, not as translated English.** Reviewed across the
  whole corpus on 2026-09-19 at the author's request. Three habits were swept
  out and must not come back:
  - **`ถูก` for a neutral passive.** Thai `ถูก` is adversative — it says
    something was done *to* the subject, usually badly. "กระดูกถูกรื้อและสร้าง
    ใหม่" therefore reads wrong for ordinary bone turnover. Name the agent and
    use the active voice: `ร่างกายรื้อกระดูกเก่าและสร้างกระดูกใหม่`,
    `เซลล์สองกลุ่ม…คอยดูแลกระดูก`, `ศัลยแพทย์จะเป็นผู้กำหนดโปรแกรมให้`.
    **Most `ถูก` on the site are correct and must not be touched**: `ถูกกด`,
    `ถูกกดทับ`, `ถูกกระแทก`, `ถูกใช้งานเกินกำลัง`, `ถูกมองข้าม`, and the
    metaphor `บัญชีที่ถูกถอนเงิน` where the adversative sense is the point.
    `ถูกต้อง` ("correct") is not a passive at all and a grep for `ถูก` finds it.
  - **`มัน` for an inanimate thing.** Repeat the noun instead — `พังผืด`,
    `หมอนรอง`, `กระดูกอ่อน`, `อัลตราซาวด์` — or drop the pronoun where it
    carries nothing. English "it" has no comfortable Thai equivalent in this
    register, and on a page a reader may have entered mid-article a bare `มัน`
    makes them hunt for the referent. (`ไขมัน`, `เค้าโครง`, `สครับ` contain the
    letters and are not the pronoun.)
  - **English idiom translated word for word.** The one that mattered was in
    `bone-and-cartilage`: "some way down the road before it says anything" had
    become `ข้ออาจเดินทางมาไกล…ก่อนจะเริ่มส่งเสียง`, where `ส่งเสียง` collides
    with the joint-noise topic of that same article. Also gone: `รับแรงที่
    ไม่อย่างนั้นจะ…` (a calque of "that would otherwise") and `ในขณะที่` used
    for a contrastive "while" — the temporal ones are correct and stay.

  **Spelling and term choices settled by the same pass**, so a new article
  should follow them: `เมื่อไหร่`, never `เมื่อไร` (seven files carried both,
  with an article's `## เมื่อไหร่ควรไปพบแพทย์` heading disagreeing with its own
  checklist); `กระดูกสะบ้า`, never `ลูกสะบ้า`; `แพทย์`, never `หมอ` (the site
  has never used the colloquial form and should not start). Checked and already
  clean: terminology (one Thai rendering per English term), `ๆ` spacing (a
  space always precedes it), and numeric ranges in prose (always an en-dash,
  never an ASCII hyphen — those are only in URLs, slugs and dates).

  **A second sweep on 2026-09-19, after the two new basics articles landed,
  found seven more and settled one further habit.** The seven were all the
  neutral `ถูก` the first pass had let through: `ถูกยึดไว้…ด้วยห่วงเอ็น`
  (trigger-finger) → `มีห่วงเอ็นเล็ก ๆ ยึดไว้`, `มักถูกเรียกว่าโรคเงียบ`
  (osteoporosis, twice) → `มักเรียกกันว่า`, `วัดว่าถูกดูดกลืนไปเท่าใด` and
  `เม็ดยาที่ยังไม่ถูกดูดซึม` (bone-density-scan) → the agent named, and two
  `ทำการ` + verb constructions (achilles-tendinopathy, carpal-tunnel-syndrome)
  → plain verbs. **`ทำการ` is the new entry**: `ทำการทดสอบ` is bureaucratic
  Thai for what a doctor simply does, and a grep for it should stay at zero.
  `ถูกชะลอ` in `acl-injury` was **checked against `_extracted/` and left
  alone** — it is the author's own wording from his app, and his prose is not
  Claude's to smooth. Also verified clean in the same sweep: `มัน` (only
  `น้ำมัน` remains), `เมื่อไร`, `ลูกสะบ้า`, `หมอ`, the `ท่าน` filter, `ๆ`
  spacing, and ASCII hyphens in Thai prose (zero, once frontmatter dates are
  excluded — a naive grep finds `2026-09-19` and means nothing).
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
- **How he is addressed, as of 2026-09-11:** `รศ. นพ. สรวุฒิ ธรรมยงค์กิจ` /
  `Assoc. Prof. Sorawut Thamyongkit, M.D.`, with `credentials` reading
  "Orthopedic Surgeon · Specialist in Shoulder & Knee Injuries, Orthopaedics
  Trauma and Sports Medicine". It lives in `data/authors.ts`, but his name is
  **also written out as a literal string 96 times in the article MDX** — the
  video and figure attribution lines — so a change has to sweep
  `src/content/` too, not just the data file.
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
  real now: the domain is `easybone.org` (since 2026-09-24; it was
  `rueortho.vercel.app`), and `contactEmail` is
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
  content/basics/{th,en}/       how the body works — bone, cartilage, the tissues in a joint
  content/conditions/{th,en}/   article MDX, one file per condition per language
  content/examinations/{th,en}/ imaging and tests — x-ray, MRI, ultrasound, DXA, NCS
  content/rehabilitation/{th,en}/ phase-based rehab and exercise programmes
  content/treatments/{th,en}/   self-care, medicines by class, injections, surgery
  content/pages/{th,en}/        about, disclaimer, privacy, editorial policy, contact
  content.config.ts             zod schema for all six collections
  data/authors.ts               author records (no workplace, bio or photo — see decisions)
  data/regions.ts               body regions + browsing categories, display order
  data/apps.ts                  companion-app registry, linked from articles
  data/featured.ts              the home page's chosen condition slugs, in order
  i18n/ui.ts                    every visible string, th + en
  i18n/utils.ts                 locale from URL, path localisation, date formatting
  lib/conditions.ts             collection queries (by locale, region, recency)
  lib/resources.ts              the same queries for basics, examinations, treatments and rehabilitation
  lib/nav.ts                    the main menu and each tab's drop-down, read from the collections
  lib/videos.ts                 the video index, read out of article bodies at build time
  assets/regions/               the author's drawing for each body-map region
  assets/conditions/<slug>/     everything drawn for one condition: hero, anatomy, care
  components/ArticleContents.astro  the on-this-page list, built from render()'s headings
  components/FilterBar.astro    the shared listing filter: box, count, reset
  layouts/BaseLayout.astro      html shell, meta, hreflang, fonts
  pages/                        Thai routes at /, English mirrored under /en
  styles/global.css             design tokens, Thai typography, base styles
docs/                           SOURCES.md, ARTICLE_TEMPLATE.md, IMAGE-SOURCES.md,
                                CONTENT-ROADMAP.md, DEPLOY.md, planning/
                                (the legal texts are content, in content/pages/)
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
hub — see "The section collections" below.

The build plan's own list is finished. The sticky table of contents landed on
2026-09-19 — see "The article contents list" below — and the pre-launch QA pass
ran the same day; see "The pre-launch QA pass" below for what it found, what it
fixed, and the three things it could not check from here. Share images are done
— see "The share picture". `/treatments` and the body map are done — see their
sections.

### The pre-launch QA pass

Ran 2026-09-19 over all 126 pages the site had then at 390, 768, 1280 and 1440px in both
languages — 504 page loads — plus the four gates, a contrast audit in light and
dark, and a check of every citation on the site against PubMed.

**It found three real defects, all fixed in the same pass**, and each fix is
load-bearing where it lives:

- **`TableHeader.astro`** gives every `<th>` a `scope="col"`. A markdown table
  emits bare header cells, and on the osteoporosis medicines table that guess
  *is* the content — column three is "tell your doctor if", and a value read
  without its header is a warning attached to nothing (WCAG 1.3.1). It is an
  MDX component override rather than a rehype plugin, like `Table.astro`.
  `scope="col"` will stay right: markdown has no syntax for a row header.
- **`nav[aria-label] .tap-24`** adds horizontal padding cancelled by an equal
  negative margin, because a breadcrumb link is *not* inside a sentence and so
  gets no WCAG 2.5.8 exemption — three were under 24px wide. See the `.tap-24`
  entry under Conventions for why the plain rule pads vertically only.
- **`<main>` carries `tabindex="-1"`** so a screen reader's cursor follows the
  skip link, not just the scroll. The focus outline it paints falls outside the
  full-width box, i.e. off-screen.

**Every one of the 51 distinct PubMed citations was verified** against the
PubMed record on first author, title, journal and year. All 51 match. Two
looked wrong at first and are not: PubMed's `publication_date` is the
electronic-ahead-of-print date, while the site cites the **issue** year, which
is correct practice — `33356772` is e-pub Dec 2020 in the 2021 issue, and
`37832814` is e-pub Oct 2023 in APMR vol 105, which is 2024. **Do not
"correct" those two to match PubMed's date field.**

**Clean, and worth not re-testing blind:** contrast in light *and* dark mode
(every sampled paragraph, link, heading and table cell passes AA); one `h1` per
page; no heading-level skips; no image without `alt`; no unnamed link or
button; no horizontal page overflow at any width; mobile nav opens and closes;
search returns 20 results for ปวดเข่า in the built preview; the 404 page; RSS
(22 items per locale); the sitemap (124 URLs, no stray trailing slashes);
hreflang clusters complete with self, alternate and x-default; `robots.txt`
disallowing `/search` in agreement with the sitemap that omits it; reduced
motion leaving nothing animating; page weight 102–150 KiB with 6–14 requests.

**Two things that look like defects and are not**, both of which cost a round
of investigation — do not re-file them:

- A crawler that reads `innerText` reports ~20 "unnamed links" per article at
  390px. Those are the contents list's links inside a **closed** `<details>`.
  `textContent` has them; a closed disclosure is out of the accessibility tree
  too, so there is nothing there to fix. Check accessible names with
  `textContent`.
- The English osteoporosis medicines table reports as "escaping the viewport"
  at 390px. It is 444px inside a 350px `.table-wrapper` that scrolls, which is
  the designed behaviour; the page itself does not scroll sideways. A viewport
  check has to skip elements inside a horizontal scroll container.

**Three things could not be checked from this environment**, and are the only
open items the pass leaves:

- **No external URL can be verified.** The agent proxy denies CONNECT to every
  outside host, so `curl` returns `000` for pubmed.ncbi.nlm.nih.gov as readily
  as for anything else — an apparent failure that means nothing. **The four
  companion-app URLs in `src/data/apps.ts` are therefore still unverified**,
  as they have been since they were written, and `/tools` prints a QR code for
  each. Somebody has to open all four in a browser before launch.
- **What is inside the GTM container.** `GTM-M6XH4X2D` demonstrably loads on
  every page — the proxy logged the blocked requests — but its tag list lives
  in Google's UI, not in this repo. The privacy notice describes GA4 on the
  author's word.
- **Thai in its real font.** Google Fonts is blocked here, so every measurement
  above is in a fallback face. The layout numbers that depend on it are written
  to be font-independent (see the contents rail), but a human should still look
  at one long Thai article in a browser that has Plex Looped.

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
rehabilitation files. The four `basics` files followed on 2026-09-18, on his
instruction rather than after a read-through (see "the section collections"),
bringing the total to 66, and the four files of the second pair of basics
articles on 2026-09-19 — those after he said he had read them — bringing it
to 70.

No `SAMPLE` or `SEED` marker remains anywhere in `src/content/`, and every file
is `draft: false`. **`lastReviewed` is 2026-09-20 on all 84 files**, set there
on the author's instruction on 2026-09-20 — he asked for the review date to be
brought up to date everywhere, and the review date is his claim to make. It
asserts that he re-read the corpus that day; nothing else about the articles
changed in that pass, and `publishedDate` was deliberately left alone, so the
record still shows when each article first went up (2026-09-06 to 2026-09-19).
Before it, 72 files carried 2026-09-08, four 2026-09-12, four 2026-09-18 and
four 2026-09-19.

**Do not refresh these dates on your own.** A `lastReviewed` is a statement
that a named doctor read the article, under a byline that says so; it moves
when he says it moves and at no other time.

The home page's "recently reviewed" strip is **unaffected**: it sorts by that
date over the 22 condition articles, which shared one date before and share
one date now, so the sort stays a no-op over the title-sorted list. That strip
only becomes meaningful when a *condition* is re-reviewed on its own.

The rule itself has not changed: anything new that Claude drafts gets a
`SAMPLE` marker and `draft: true` until the author has read it.

### Articles

The nineteen condition seeds from the master plan's §33, **plus osteoporosis**,
exist in Thai and English — forty files, twenty slugs. All are published.
`docs/CONTENT-ROADMAP.md` tracks where each article's words came from.

**The two hip articles are bilingual.** The author wrote `hip-pain` and
`snapping-hip` in Thai on 2026-09-11 and asked for English the same day, so
they were Thai-only for about an hour — long enough to confirm that
`translationPending` and the one-language routing work, which nothing had ever
exercised. Both are now `translationPending: false` with a full English
counterpart, `/regions/hip` builds in both languages, and the hip dot on the
body map links in both.

**His prose is unchanged; the scaffolding around it is not his.** The headings
were mapped onto the canonical order (`ทำความเข้าใจอาการปวดสะโพก` became
`โรคนี้คืออะไร`, `สาเหตุที่พบบ่อย` became `สาเหตุและปัจจัยเสี่ยง`, and so on)
and the "when to see a doctor" bullets were lifted verbatim into `redFlags` so
`<RedFlags>` renders them. Both articles stop after `แนวทางการรักษา` and
`คำถามที่ควรถามแพทย์` — the linter allows an article to stop early, only not to
reorder. `KeyFacts` is a selection of his own sentences, `faq` is empty rather
than invented, and the `sources` came out of the PubMed tool the same way the
other eight topics' did. Those four things are Claude's and are flagged for him:
he has not read them.

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
- **`related` runs one way in the data and both ways on the site.** A resource
  names the conditions it bears on; `getResourcesForCondition` in
  `lib/resources.ts` reads that backwards so a condition page can offer the
  tests, treatments and rehabilitation mapped to it, grouped by collection and
  labelled with `sections.ts`'s own names. **Nothing is inferred**: a resource
  appears only where the author wrote the condition into its `related`, and a
  condition nobody has mapped renders no section rather than a guessed one.
  **All twenty are mapped now.** `ankle-sprain` and `plantar-fasciitis` were the
  last two without one, and the author asked for them on 2026-09-11; every link
  added was taken from a sentence already in his own text rather than chosen on
  clinical grounds — the ankle article names X-ray, "ultrasound or MRI", pain
  relief, the ice/elevation/compression routine, surgery and rehabilitation, and
  the plantar article names the same plus "injection or shockwave". Two
  candidates were deliberately left out on the same rule:
  `balance-and-fall-prevention`, which is about thin bone and falls in older
  adults and never mentions the ankle, and `joint-injections` for the ankle,
  which names ankle sprains only inside a hyaluronic-acid evidence paragraph
  while the ankle article itself offers no injection. It resolves through
  `getPublishedResources`, so a draft stays out
  even in a preview build (verified by drafting one Thai examination and
  watching it vanish from the Thai page while the English page kept it).
  The section is headed "อ่านเพิ่มเติมเรื่องที่เกี่ยวข้อง" / "Related
  educational reading" and carries a sub-line saying it is general reading and
  not a treatment sequence — an ordered list of tests and treatments under a
  condition reads as a plan for the reader unless it says it is not one.
- **`ResourceIndex.astro` is one page for two states.** While a collection has
  nothing published it shows the in-preparation wording `SectionStub` used to
  show; the moment something is published it becomes a listing. That is why
  those sections could be marked `live` before their content was reviewed
  without promising anything that is not there.
- **`/articles` adds nothing of its own.** It indexes the other collections, so
  it was finishable without the author reading new medical copy. It **held the
  clip gallery too until 2026-09-20**, when that moved to `/videos` — see "The
  videos tab" below. What is left is the four libraries and a link to the
  gallery, and the page is lighter for it: 111–114 KiB against 158–170 KiB.
- **The video index is derived, not maintained.** `lib/videos.ts` parses
  `<Video>` tags out of the article bodies at build time. A hand-kept list would
  drift, which is exactly the bug that already hit three rotator-cuff clips.
- **A gallery link lands on the `##` section holding the clip, never on the
  `###` above it.** The anchor comes from `render()`'s `headings` — the same
  slugs the page really emits, never re-derived from heading text, for the
  reason `ArticleContents` gives. It is the `##` because that is the smallest
  unit that still carries the heading, the instructions *and* the cautions: in
  the frozen shoulder article the phase sub-headings sit under
  "การฟื้นตัวและการฟื้นฟู" and the callout saying how far to stretch — green
  keep going, red stop — sits under that `##`, above every phase. An anchor on
  "ระยะที่ 1" drops the reader below the thing that qualifies the exercise.
  A clip whose section cannot be resolved falls back to the plain article link,
  so the gallery never points at an id that is not on the page. Verified: 19
  anchored links per locale, no dead anchors, each landing at the header offset
  with a caution inside the section it lands on. Still true now the gallery
  lives at `/videos` — the anchor is computed in `lib/videos.ts`, not in the
  page that renders it.

**`basics` is the fourth collection on `resourceSchema()`**, added on
2026-09-18 — how the body works, rather than a disease, a test or a treatment.
It exists as its own collection rather than as `conditions` entries because a
basics page has **no body region** (which `conditions` requires), nothing to
diagnose, and no urgent-symptom list of its own; and because putting "what is
cartilage" in a list of diseases tells a reader it is one.

Its first two articles are `bone-as-an-organ` and `bone-and-cartilage`, in both
languages. Two more followed on 2026-09-19 — `fracture-healing` (how a broken
bone mends) and `arthroscopic-surgery` (what the camera can and cannot do) —
and **all eight files are published**.

**All four are illustrated as of 2026-09-19.** The author committed twenty
pictures to `public/images/basics/<slug>/`, to the filenames
`docs/IMAGE-SOURCES.md` had asked for, and they are placed in both languages as
forty `<Figure>`s — six, four, five and five. They are **the first upload on
this project whose extension matched the file**: genuine JPEGs named `.jpg`,
where the five batches before them all arrived as JPEG named `.webp` or `.png`.
They are `.webp` since 2026-09-20 along with the rest of `public/images/`.
All twenty are 1024x765, so every figure carries `width` and `height`; without
them a string path lays out with a zero-height box and reflows the article when
the lazy file lands.

**`arthroscopic-surgery` is in `basics` on the author's instruction**, and it
earns the place: it explains how the operation works rather than whether to have
it. The *decision* — when to consider surgery, what to ask, what happens if you
wait — stays in `treatments/surgery`, and the two link to each other rather than
repeating. Keep that split if either is edited.

Both were render-tested by the documented procedure: publish temporarily, build,
drive, then restore. **`git checkout --` cannot restore a new file**, because an
untracked file has nothing to restore from — put the frontmatter back explicitly
and check it, or you will commit a draft as published. The marker comment also
contains the words `draft: true`, so a blind replace of that string hits it as
well; do the comment first, then anchor the frontmatter replace to the closing
`---`.

**They went through the rule rather than around it**, unlike `/treatments` and
unlike the first two basics articles. They were drafted with a `SAMPLE` marker
and `draft: true`; the author read them and said to publish; the marker came
out and `draft` went to `false` in the same instruction. That is what the
process is supposed to look like, and it is the first time on this site it has
run end to end. They follow the medical content rules (no doses, nothing that
tells a reader what they have, nothing that tells a reader they do not need a
doctor, uncertainty stated), and every reference came out of the PubMed tool.
If he wants either held back, setting `draft: true` on the two files is the
whole job.

The rule itself is unchanged: anything new that Claude drafts still gets a
`SAMPLE` marker and `draft: true`, and `lint:content` still fails the build if a
marked file is published.

**`treatments` is the third collection on `resourceSchema()`** — self-care,
medicines by class, injections, surgery, and how to choose between them, five
topics in each language. Adding a collection means touching nine places, and `basics`
walked all of them on 2026-09-18: `content.config.ts` (define it and add it to
the `collections` export), the `ResourceCollection` union and the display order
in `lib/resources.ts`, the collection lists in `lib/videos.ts` and
`ArticlesIndex.astro`, `COLLECTIONS` in `scripts/lint-content.mjs`,
`COLLECTION_FOR` in `lib/nav.ts`, an entry in `data/sections.ts`, and four
routes (`index.astro` and `[slug].astro` in each language). **Miss
`scripts/lint-content.mjs` and the publication-safety checks silently skip the
new collection** — the SAMPLE marker, the sources rule and the media checks all
stop applying. Miss `lib/nav.ts` and the tab appears with no drop-down.

All 32 files in the three published resource collections are live. Production
builds **133 pages** — 115 until the two hip articles and `/regions/hip` landed
on 2026-09-11, then 121, then 123 once `/basics` got an index page in each
language, 127 when its first two articles were published on 2026-09-18, and 131
when its second two were published on 2026-09-19, and 133 when `/videos`
became a page in each language on 2026-09-20.

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
- **Every clip now has a poster, cut from the clip itself.** A `<Video>` used
  to open onto a flat grey panel, so before pressing play the reader had only
  the caption's word for what it showed — which on a silent demonstration is
  most of the point. `scripts/make-video-posters.mjs` writes
  `<name>.poster.webp` beside each mp4 and `<Video>` picks it up **by
  convention**, checking `existsSync` at build time so a clip added before its
  poster falls back to the old panel rather than a broken image. The frame is
  taken at 20% of the duration, not at 0s: the first frame is often a fade-in
  or an empty room. 16 posters, 520 KB in total, 960px wide so they stay sharp
  at 2x. The play badge gained a scrim and a ring, because it now sits over a
  photograph rather than a flat panel.

  **ffmpeg is still not part of the toolchain** and is deliberately not in
  `package.json` — the posters are committed, so the script only runs again if
  a clip changes. Re-run it with
  `npm i --no-save ffmpeg-static && node scripts/make-video-posters.mjs`.
  Six video files are byte-identical across the frozen shoulder and rotator
  cuff apps and are stored once, so they share one poster too.
- `<Video>` requires a `description` prop and throws without one. A silent
  demonstration clip carries all of its meaning in the picture, so without a
  text description the content simply is not there for a blind reader.
- **When the file will not play, `<Video>` swaps in words rather than leaving a
  dead rectangle**, and moves focus to that message if the reader had activated
  the player from the keyboard — replacing a focused element with a plain `<p>`
  otherwise sends focus to `<body>`, i.e. back to the top of the article. The
  message points at the figcaption description, which is on the page either
  way. This path is easy to exercise: the clips are all H.264 and Playwright's
  Chromium cannot decode it, so the fallback is what that browser shows.
- **`ExerciseCard`'s play control is localised**, through `media.play` and
  `getLocaleFromUrl` exactly as `<Video>` does it. It used to hard-code
  "`<title>` — play video" and a bare "Video" for the YouTube frame's title, so
  a Thai page handed a screen reader an English name for a Thai exercise. The
  `youtube` prop is unused in content today; the fix is there so the first
  article to use it is not the one that ships the bug.
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
- **The 38 MB of video in `public/` is copied into `dist/` on every build, and
  it is the single largest thing the site ships** — 70% of a 54 MB build as of
  2026-09-23 (it was 36 MB, 57% of 63 MB, before the refresh).
  The articles that use it are published, so that is correct rather than waste;
  **`single-leg-stand-supported.mp4` was the one exception** and was deleted on
  2026-09-20, having never been referenced by any `<Video>`. The no-transcode
  rule above still stands, and it is the author's to lift — see "Build size and
  Vercel usage".

### The 2026-09-23 refresh from the apps

The author asked for everything he had uploaded to his four apps to be reused
wherever it fits. `scripts/import-app-media.mjs` was rewritten to the apps'
current filenames and re-run; **its lists are the record of what came from
where**, and `docs/IMAGE-SOURCES.md` has the table and every file that was
looked at and left out, with the reason. Four things about it:

- **Nothing was placed where the article is silent.** Each picture or clip sits
  beside a sentence that already describes what it shows — the ACL article's
  care sections (heel prop, ice, crutches, shower cover, pillow under the heel,
  desk work, no smoking), the osteoporosis rooms and the Timed Up and Go test,
  the frozen shoulder stage-4 levels, the rotator cuff movements "your
  physiotherapist will usually add". The ACL phase exercises were **not**
  placed: the article's phase table names none of them.
- **Every file was looked at first** — stills on contact sheets, clips as five
  frames each. That found the defects the filenames hide: an osteoporosis
  "marching" clip that is sit-to-stand footage, a rotator cuff "passive
  elevation" clip that is someone icing a shoulder, drug-box pictures with
  brand names and doses, and three ACL pictures that contradict the text
  beside them. **Check the frames of any new clip before trusting its name.**
- **It fixed two things that were already wrong on the live site.** The
  rotator cuff sleep section used frozen shoulder clips showing **no sling**,
  beside text saying to wear the sling while sleeping; the app's own stills,
  sling on, replaced them. And three `<Video>` descriptions — the text a blind
  reader gets instead of the clip — described something else: "passive forward
  elevation" said a therapist lifts the arm of someone lying down, the clip is
  a seated table slide; "activity precautions" and "if stiffness wakes you"
  were also off. Descriptions describe the frame, so they were corrected.
- **The medicine pictures went in on 2026-09-24, on the author's instruction**:
  the five unbranded scenes of how each medicine in the osteoporosis table is
  given — a tablet, a drip, three injections — in a two-column grid directly
  under the table, captioned with the app's own `route` line for that medicine
  ("Tablet, taken at home", "Injection pen, self-injected at home"). No dose,
  no schedule. **The branded boxes in `media/meds/` stay out** — brand names
  and printed doses.
- **The C2PA check no longer applies.** The re-cut files carry no credential;
  provenance rests on the author's own statement (see the register). The five
  rotator cuff stills of unknown origin are still out.

**`<ExerciseCard>` takes `video` and `videoDescription`.** The card's picture
becomes the clip's poster: a play badge over the still, and tapping swaps in
the clip through the same click-to-load `<Video>` uses — the handler lives in
`src/scripts/video-facade.ts`, imported by both components, because Astro only
bundles a component's script on pages that use that component. 17 cards carry
a clip now (ten frozen shoulder, six osteoporosis, one rotator cuff), which
turns every frozen shoulder exercise into a still you can press to see it
move. `lint:content` checks a card's `video` file exists and that it has a
description, as it does for `<Video>`.

**A portrait picture is capped at 20rem, a landscape one at 30rem (card) or
34rem (figure).** The ACL photographs are 4:5 and at 34rem one was taller than
a laptop screen. Figure and card decide from the image's shape through
`lib/image-shape.ts` — and **that helper exists because of a trap**: reading
`.width` off an imported image makes Astro emit its full-size original, see
"Build size". A `<Video>` poster now shows the whole frame (`object-contain`),
and a playing clip is capped at 75% of the viewport height, because the
rotator cuff clips are 9:16 and at full column width one ran a screen and a
half tall.

**The companion apps show their own icons** — on `/tools` and in each
article's app block, from `src/assets/apps/`, taken from each app's repository
(the frozen shoulder one is extracted from the inline SVG in its `index.html`).
On a phone, `/tools` puts the app's name and Open button before its QR code:
nobody can scan the screen they are holding.

### The infographic posters (2026-09-24)

The author uploaded 42 infographic posters, one per article, and asked for
each to go in its article. **All 42 are placed**, as a `<Figure enlarge>` directly
under the `<KeyFacts>` box of the **Thai** article only — every poster is
lettered in Thai. `docs/IMAGE-SOURCES.md` has the full account; the things
that must not be undone:

- **They live in `public/images/infographics/<collection>/<slug>.webp`**, WebP
  q82, ~195 KB each, 8 MB in all — exactly the growth of the build (67 → 75 MB
  on the day). The upload folder was removed once converted.
- **`<Figure enlarge>` is a plain link** around the picture and a
  `media.enlarge` line, to the file itself — no script, nothing for the CSP.
  It keeps the 34rem figure width; the 20rem portrait cap would make the
  lettering unreadable. `src` must be a `public/` path (it throws otherwise).
- **The alt is a transcription of the poster**, because the poster is words.
- **`basics/arthroscopic-surgery` went up on the author's ruling**, after
  its "ฟื้นตัวเร็ว" advantage was found to contradict the article's FAQ. He
  had the article reworded instead, in both languages: the small incision
  heals faster than an open one, but recovery inside the joint depends on the
  procedure. Keep both halves together in any edit. Two posters carry
  lettering errors he was told about (rotator cuff "ต้ตนอก", knee rehab
  "กล้ามเนือ") — replacing the file is the whole fix.

### Clip frames take the clip's shape (2026-09-23)

`lib/clip-size.ts` reads a clip's width and height from its MP4 track header at
build time, and `<Video>` and `<ExerciseCard video>` size themselves from that
rather than assuming 16:9 or copying the still's shape. The classes are
`.clip-frame-wide` / `.clip-frame-tall` in global.css (classes, because the CSP
refuses `style=""`); the height cap goes through the width, so a 9:16 clip is a
306x544 box at every width and nothing is letterboxed.

Measured on the seven 9:16 rotator-cuff clips before the change: the facade was
a 16:9 panel (350x198 on a phone, 782x308 on a desktop) and pressing play grew
it to 350x621 / 782x675 with black bars either side, **pushing the text below
down by 368–588px**. After: the facade and the player are the same box, and the
text below moves 0px at 390, 820 and 1440. A card whose still is square but
whose clip is 9:16 (chin tuck, shoulder-blade squeeze) now plays at the tall
size instead of 30rem wide and 75vh tall between bars. The 28 wide clips are
unaffected.

### Build size and Vercel usage

Audited on 2026-09-20 against the live project (`aoe5/rueortho`,
`prj_FnXhsld44pmKNu5rmVauaALJxJOy`). A production build was **71 MB** and went
to **63 MB**; the table below is that audit. **On 2026-09-23 it is 54 MB** for
22 more clips and 29 more pictures than the audit counted: the author's
re-encoded rotator cuff clips are a seventh of the size of the ones they
replaced, and the frozen shoulder re-cuts are about 40% smaller, so
`dist/media` is 38 MB for 38 clips where it was 36 MB for 16. What it was made
of on 2026-09-20, largest first:

| part | size | what it is |
|---|---|---|
| `dist/media` | 36 MB | the 16 demonstration clips, copied verbatim |
| `dist/_astro` | 11 MB | every `astro:assets` derivative |
| `dist/images` | 6.6 MB | `public/images`, served byte for byte |
| the rest | ~9 MB | 133 pages of HTML, Pagefind's index, the feeds |

**`public/images` was re-encoded to WebP**, 12.9 MB of JPEG to 6.2 MB at
quality 85, and all 246 `<Figure src>` / `<ExerciseCard image>` paths in 69
files were repointed. This is not cosmetic: nothing in the build touches
`public/`, so those bytes are exactly what a reader downloads, and the figures
are the heaviest thing on an article page. Every other picture on the site has
always been WebP — `astro:assets` emits it from `src/assets/` — so this only
applies the site's own format to the files that happen to live in `public/`.
`lint:content` validates every one of those paths against the file on disk, so
a missed rename fails the build rather than shipping a broken picture. The
JPEGs are in git history if a source is ever wanted back.

**Two genuinely dead files went**: `public/media/exercises/single-leg-stand-supported.mp4`
(1.7 MB, no `<Video>` ever referenced it — it is the one clip with no poster,
which is how it was found) and `public/images/figures/knee-oa-cartilage-loss.webp`
(69 KB, orphaned when the placeholder knee figure was removed).
`self-care-mechanism.webp` and `straight-leg-raise.webp`, once held unplaced,
are both placed since 2026-09-23 — see the sections on each below.

**Reading a property off an imported image emits its full-size original.**
Found on 2026-09-23, and it cost 5.7 MB before it was caught. An `import x
from './a.webp'` is a Proxy in the build, and *any* property read — `x.width`
included — adds the file to Astro's "referenced" set, so the untouched
original is copied into `dist/_astro/` whether or not a page requests it.
Reading `width`/`height` in `<Figure>` and `<ExerciseCard>` to tell portrait
from landscape put 89 unrequested originals into the build. The proxy's
`clone` is the one read it does not count, which is what `lib/image-shape.ts`
uses. **Measure `dist/_astro` against `main` after any change that touches
imported images**: files no HTML, CSS, JS or XML names are the symptom — 22 of
them (the condition heroes, below) is the baseline.

**What is left, and why it stays:**

- **The video — 38 MB, 70% of the build since 2026-09-23 — cannot be touched
  from here.** Re-encoding would shrink it further, but the no-transcode rule under "App
  media" is the author's: the apps' own notes warn a generated clip can contain
  a few frames where the joint inverts, so re-encoding without checking every
  frame is not a decision Claude makes. There is no ffmpeg in the toolchain
  either. **If he ever wants it done, that is the single biggest saving left.**
- **1.5 MB of `dist/_astro` is unreferenced and unavoidable.** Astro emits the
  untouched original of every imported image, and 22 condition heroes are
  imported through the content schema's `image()` helper — checked, zero pages
  reference those files. The other 23 JPEGs there *are* referenced: they are
  the `og:image` social cards, which must be JPEG (see "The share picture").
- **No duplicate bytes.** All 16 clips hash distinctly, and `public/` carries
  no second copy of anything in `src/assets/`.

**The project had 159 stored deployments** on 2026-09-20, going back to the
first commit — one live, the rest superseded production builds and stale branch
previews. The author chose to keep the ten most recent and delete the rest, and
**that deletion is still outstanding**: the Vercel MCP server this project is
wired to exposes no delete-deployment call. `cancel_deployment` only stops a
build in progress, and all 159 are `READY`; `update_project` has no retention
field in its schema either. It has to be done from the dashboard — Settings →
Deployment Retention to stop it recurring, or the deployment list to remove
them by hand.

Worth knowing before anyone panics about that number: Vercel stores files
content-addressed and shares unchanged ones between deployments, so 159
deployments never meant 159 × 71 MB — the 36 MB of video was uploaded once and
reused. What multiplies is the HTML and the hashed assets that change per
build. The deployment list itself is what the dashboard counts.

Also confirmed while auditing: no password or SSO protection on the project,
three domains attached at the time (`rueortho.vercel.app` plus the two Vercel
aliases — the domains now attached are listed under "The domains" below), and
the build is fully static, so nothing is running a serverless function.

### The domains

As read off the Vercel project on 2026-09-24. **Every address but one
redirects to `easybone.org`**, so there is one site under one name:

| address | what it does | since |
|---|---|---|
| `easybone.org` | serves the site; `origin` names it | 2026-09-23 |
| `www.easybone.org` | 308 permanent redirect to `easybone.org` | 2026-09-24 |
| `rueortho.vercel.app` | 308 permanent redirect to `easybone.org` | 2026-09-23 |

- **`easybone.org` was bought through Vercel** on 2026-09-23 and runs on
  Vercel's DNS (`ns1`/`ns2.vercel-dns.com`), so attaching a subdomain needs no
  DNS record — Vercel writes it — and a DNS TXT record for Search Console goes
  in Vercel's own DNS panel, not at an outside registrar. The WordPress.com
  steps in `docs/DEPLOY.md` did not apply to it.
- **Its registration runs to 2027-09-23 and auto-renew was OFF** when this was
  read. If it lapses the site goes dark at its only canonical address and the
  name can be bought by anyone. Turning renewal on is the author's call (it is
  a payment), in Vercel → Domains → `easybone.org`.
- **`easyortho.org` and `www.easyortho.org` are gone.** They were attached
  for a few hours on 2026-09-24, redirecting to `easybone.org`; the author
  removed both from the project the same day and said he no longer uses that
  domain. Do not re-add them or mention them on the site.
- **`www.easybone.org` was added by Claude on 2026-09-24**, at the author's
  request, through the Vercel MCP `add_project_domain` call. The rest were
  added by him in the dashboard.
- **The old address redirects, it does not serve.** Earlier notes here said
  `rueortho.vercel.app` "still serves the same site"; since the redirect it
  answers every path with a 308 to the same path on `easybone.org`, so links
  and QR codes printed with it still arrive at the right page.

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
- **The sitemap drops drafts, and the filter is keyed by locale.** A draft only
  exists in a preview build, where it carries `noindex, nofollow` — and listing a
  page in a sitemap while telling robots not to index it is a contradiction. The
  draft slugs are read straight off the MDX frontmatter in `astro.config.mjs`,
  because the sitemap integration is configured before the content layer exists;
  it is a plain frontmatter scan, and a file the regex cannot read is treated as
  published, which is the safe direction. **The key includes the locale
  prefix.** Both languages share a slug on purpose and only one of a pair may be
  a draft, so keying on the bare slug dropped the *published* counterpart from
  the sitemap too — measured, and fixed. Production is unaffected: 112 URLs
  either way, because a production build never renders a draft at all.
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

### Search Console and Google Tag Manager

Added on 2026-09-11, at the author's request, so the site can be found in
Google.

- **Ownership is claimed two ways, on purpose.**
  `public/googlef9618cb9fa32a0a8.html` is Google's own file, copied in
  byte-for-byte (one line, no trailing newline), and
  `site.googleSiteVerification` in `src/data/site.ts` is rendered as a
  `<meta name="google-site-verification">` by `BaseLayout` on **every** page,
  not only the home page. Search Console re-checks periodically, and one proof
  that a later edit could remove is one proof too few.
- **The DNS TXT record Search Console also offers could not be done on the
  `vercel.app` address**, because Vercel owns that zone. Now the site's address
  is `easybone.org` it is possible — in **Vercel's** DNS panel, since the
  domain was bought through Vercel and uses its nameservers — and a Domain
  property there covers `www.` and `http://` too. `easybone.org` is a new
  property in Search Console and has to be verified on its own; the file and
  the meta tag above move with the site, so either still works.
- **The GTM loader lives in `public/gtm.js`, and it has to.** Google's
  instructions say to paste an inline `<script>`; `security.csp` hashes only
  the scripts Astro itself generates and the policy carries no
  `'unsafe-inline'`, so a pasted inline script is refused by the browser and
  the container silently never loads. A file in `public/` is copied verbatim
  and served from our own origin, which `script-src 'self'` already allows —
  the same escape `public/search.js` makes, for the same reason. The container
  id is read from a `data-gtm-id` attribute rather than written into the file,
  so it lives only in `site.gtmContainerId`; that is also the off switch,
  since an empty string renders neither the loader nor the frame.
- **The `<noscript>` iframe is hidden by a class, not Google's `style`
  attribute.** The CSP cannot cover a style attribute, so Google's version is
  refused and leaves a visible empty frame at the top of every page.
  `.gtm-noscript` in `global.css` does the same job. Verified with scripting
  off: the iframe is in the markup and has no layout box.
- **A GTM Custom HTML tag will not run.** Those inject inline script, which the
  policy refuses; adding `'unsafe-inline'` to make one work would undo the
  reason the rest of the site has no inline script at all. Built-in tags — the
  Google tag / GA4 among them — load an external script from
  googletagmanager.com and work normally. `googletagmanager.com` is in four
  directives (`script-src`, `frame-src`, `img-src`, `connect-src`), with
  `*.google-analytics.com` and `*.analytics.google.com` in `connect-src` for
  GA4's beacons. Any further tag host has to be added there or the browser
  blocks it silently.
- **The privacy notice discloses GTM and GA4 as of 2026-09-19**, at the
  author's instruction — it had said "no tracking cookies" and listed four
  third parties for the eight days GTM was live, which under-stated what the
  site collects. `src/content/pages/{th,en}/privacy.mdx` now names Google LLC
  in the third-party list and carries a section 4 on GTM/GA4: what the cookie
  stores, what reaches Google (page, time, device and browser, approximate
  location, IP), what it is used for, and two ways to opt out. The "what we do
  not do" paragraph dropped its "we do not build user profiles" claim, which
  GA4 makes hard to defend.

  **A consent banner was not built and the author was told why it may be
  needed.** The notice claims legitimate interest (s.24(5)) for these cookies,
  matching the wording already used for Cloudflare — but PDPC guidance
  generally treats non-essential analytics cookies as needing consent, which
  legitimate interest does not supply. That is a legal judgement, and Claude
  does not make it: the gap is flagged to him, and closing it means either a
  consent banner gating `public/gtm.js` or dropping GA4 and keeping
  cookie-less Cloudflare Analytics alone. **Adding any further tag to the
  container is a fresh PDPA disclosure** and has to come back to this section.

### The share picture

Every page carried `twitter:card="summary_large_image"` and **no `og:image` at
all**, so a link posted to LINE, Facebook or X rendered as a blank card. On a
site readers mostly reach because somebody sent them the link, that was most of
the first impression, and it was the one real defect found when the live site
was audited on 2026-09-11.

- `BaseLayout` takes an optional `image` prop and falls back to
  `src/assets/hero-shoulder-pain.png`. The two **condition** routes pass
  `entry.data.heroImage`; nothing else does, because `heroImage` is on the
  conditions schema only — `resourceSchema()` has no such field, and adding one
  would mean a schema change and 32 files. Resource articles therefore share
  the site picture, which is correct rather than a gap.
- **JPEG, not WebP.** The file is fetched by the crawlers behind those
  platforms rather than by a browser, and their WebP support is uneven. 1200px
  wide is what they all ask for; the whole set is 1.8 MB.
- **The card type follows the picture's shape.** A large card promises a
  1.91:1 image, and the author's illustrations are 4:3 scenes and square
  badges — both get cropped to a band across the middle in that slot. So
  `summary_large_image` is emitted only at ratio ≥ 1.5, which today means the
  site hero; every article gets `summary`, which shows a square thumbnail
  beside the text. Give a page a genuinely wide image and it takes the large
  card automatically.
- The URL is absolute and built from `Astro.site`, for the same reason the
  canonical is. CSP does not apply — no browser fetches it.

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

**Every section tab carries a drop-down of the pages under it**, added on
2026-09-17 at the author's request. Four things about it:

- **The children are read from the collections, not hand-kept.** `lib/nav.ts`
  calls `getPublishedResources`, so a drop-down can never offer a draft and
  never drifts from the index page below it. Two tabs are hand-written because
  what they hold is not a collection: `articles`, whose page indexes the four
  libraries, and `about`, whose children are the info and legal pages — and
  those take the *footer's* labels, so the two menus cannot disagree about the
  same page. `tools` is one page and has no drop-down.
- **No drop-down entry anywhere repeats a tab label**, and that was a real
  complaint. The `articles` tab used to carry a drop-down listing conditions,
  examinations, treatments and rehabilitation — and the last three each had a
  tab two places to the left with the same label and the same destination, so
  opening the menu showed a reader three rows they had just walked past. The
  author reported it on 2026-09-19. `articles` has had no tab at all since the
  swap later that day, so the menu holds `conditions` directly. Keep it that
  way: verify the invariant, not the old shape.
- **It opens on click, never on hover.** A hover menu cannot be tapped, and the
  tab itself stays an ordinary link to the section index, so nothing is
  reachable only by opening a menu. One open at a time; Escape closes and
  returns focus to the chevron; a click outside closes without moving focus.
- **The `<noscript>` copy renders every drop-down open**, through NavList's
  `expanded` prop. A closed disclosure with no script to open it would put the
  whole of `/treatments` and `/examinations` behind a dead control.
- **Each topic is its own row, and that was asked for on 2026-09-19.** The
  panel was a stack of `--muted` links at 0.9em with nothing between them, so
  at a glance it read as one block of text rather than a list of places. Three
  changes, all in `global.css`: a hairline `border-top` on every `li` after
  the first, so the rows are visibly separate; `--ink` at 0.95em instead of
  `--muted` at 0.9em, because small grey text on a white panel passes the
  contrast rule by the letter and is hard work on the one control that has to
  be scanned quickly (measured 13.58:1 in dark mode); and a 44px minimum row
  height — the site's own touch-target goal rather than the 24px floor, since
  a menu row is a primary control, not a link inside a sentence. The hover and
  focus fill is `--brand-soft`, the same tint the current-page pill uses, so a
  pointed-at row and a current row are one idea; `--ground` was almost
  invisible there (#f7f8f8 on a #ffffff panel). The panel went 15rem to 16rem
  to hold the longest label in two lines. Measured at 1280 and 1440px: six
  rows, 44px each except the two that wrap to 70px, no overflow either side.

**A drop-down decides which way to open by measuring, never from its position
in the DOM.** `positionSubmenu` in `Header.astro` adds `.opens-inline-end` when
the panel would run off the right edge, and takes it off again if the flipped
panel would run off the left — a **class**, not an inline style, because the CSP
refuses those. This replaced `.nav-item:nth-last-child(-n + 2)`, which assumed
the last two tabs sit at the right-hand end of the row. **The nav wrapped onto
two lines at every desktop width when that was written**, so the last tab was
alone on row two at the far *left*, and right-aligning its panel hung the About
menu 51px off the left of a 1280px viewport with the first characters of every
label cut off. The row is one line from 960px now, but the measuring is what
keeps it correct at the widths below that — and at any width a tenth tab would
create.
Verified: 60 drop-down openings — six menus at 768, 1024, 1280, 1440 and 1920px
in both languages — none crossing either edge. A resize while a panel is open
re-runs it.

**The chevron is 30px wide, not the site's usual 44px, and that was measured.**
Five chevrons at 44px widened the nav row enough to wrap it onto a second line
at every desktop width, which added 36px of sticky header and put every in-page
anchor under it. The button still fills the row's height, so the target is about
30x44 — past the 24x24 of WCAG 2.5.8 — and the tab beside it is untouched.

**The nav row is one line from 960px up, in both languages — and getting it
there took three changes at once.** It had wrapped onto two lines at every
desktop width since the eighth tab landed, and on 2026-09-19 the author asked
for every entry on one row. The row now carries **nine** entries, so nothing
short of all three would have done it:

- **the type went from 0.95em to 0.85em** (16.15px against a 19px body) and the
  pill padding from `px-4` to `px-3`, and the chevron from 30px to 26px;
- **four nav labels were shortened**, because a nav label is not a page
  heading and `sections.ts` already has a separate `title` for that:
  `ฟื้นฟู & ออกกำลังกาย` → `ฟื้นฟู`, `เครื่องมือผู้ป่วย` → `เครื่องมือ`,
  `How the body works` → `Body basics`, `Tests & imaging` → `Tests`,
  `Rehab & exercise` → `Rehab`, `Patient tools` → `Tools`;
- **the "บทความ & วิดีโอ" tab went away** in the same pass, which is what made
  room for `conditions` and `วิดีโอ` to be tabs at all.

**English was the binding constraint, not Thai.** Before the change the Thai
row needed 1297px against 1112px of container; English needed **1519px**. The
container caps at 72rem, so there is no width at which the problem solves
itself.

**All nine still pass AA**: 5.55:1 in light and 6.33:1 in dark, measured at the
new size. The labels are also the headings of the related-reading groups on
every condition page (`ConditionArticle` reads `nav[locale]`), which now read
"การตรวจ" / "Tests" rather than "การตรวจ" / "Tests & imaging" — checked, and it
reads better there too.

**Lengthening any label pushes the one-row threshold above 960px and breaks
`--header-offset` for the widths that newly wrap.** The threshold was found by
binary search over both languages and is 960px exactly. Re-measure the table in
`global.css` if a label grows or a tenth tab appears.

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

### The anchor check, and why CI was red

CI failed on every push from 2026-09-17 02:51 onwards — **before any of that
day's work**, on commits that only uploaded images. The failing step was
"Check internal links", and all 38 of its errors were the same thing:

```
dist/conditions/frozen-shoulder#การฟื้นตัวและการฟื้นฟู | Cannot find fragment
```

**Every one was a false positive.** Those ids are in the HTML — `grep -o
'id="[^"]*"'` on the built page lists them, and the links work in a browser.
The cause is `--include-fragments` meeting Astro's directory-style output:
`/conditions/frozen-shoulder` is a *directory* holding `index.html`, lychee
resolves it happily for a link with no fragment — those never errored — but
cannot read ids out of a directory, so it fails every anchored link on the
site. 19 gallery links per locale, 38 in total, which is exactly the error
count. On this site the flag cannot catch a real problem, only invent one.

So `--include-fragments` is off, and `scripts/check-anchors.mjs` does the job
instead. It resolves a target the way a browser does (`/a/b` → `dist/a/b/index.html`,
else `dist/a/b.html`, else the path itself), strips the query string,
percent-decodes the fragment — Thai heading ids arrive encoded — and looks for
a matching `id` or `name`. 929 in-page links across 122 pages.

**It was tested by breaking things, not by watching it pass**: a dead ASCII
fragment, a fragment pointing at a page that does not exist, and a dead
percent-encoded Thai fragment were each introduced into `dist/` in turn and
each was caught, with exit code 1; the rebuilt site exits 0. A checker that has
never failed is not known to work.

lychee still runs, and still blocks: it checks that every internal link
*resolves*, which it does correctly. External links stay `continue-on-error`.

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

### The listing cards

`Card.astro` is the row on `/conditions`, on each section index, on `/articles`,
on a region page, and in the two "related" blocks at the foot of an article. It
was a square tile in an `auto-fill` grid until 2026-09-19, when the author asked
for three things at once: an icon in front of the title, one topic per row, and
a shorter line under it.

- **A row, not a tile.** Every list that used
  `grid-cols-[repeat(auto-fill,minmax(17rem,1fr))]` is now
  `flex flex-col gap-3`, so nothing competes for the eye sideways. The row also
  gives the summary the full measure, which is what lets one sentence sit on
  one line instead of five.
- **The icon is a picture from inside that topic**, asked for later the same
  day. The first version used the region's drawing for a condition and a
  collection glyph for everything else, which meant one picture for all five
  knee articles and one glyph for all five treatments — a card told the reader
  which shelf it was on, not what it was about. Now every card on the site
  shows its own article's artwork: **all 42 of them, no glyph anywhere.**
  `Card.astro` takes `image` and prefers it over `region`, which it still
  prefers over `collection`, so the two older paths survive as fallbacks and
  nothing can render an empty box.
- **A condition lends its `heroImage`; a resource article lends a frame named
  in `src/lib/topic-images.ts`.** Conditions had one already, in the
  frontmatter. The four resource collections have no image field at all — their
  pictures are `/images/<collection>/<slug>/…` strings in the MDX body, which
  never reach `astro:assets` — so `topic-images.ts` imports one file per
  article straight out of `public/`. Vite resolves the project-root path and
  Astro treats it as an ordinary asset, which is what lets `<Image>` emit a
  2–7 KB webp instead of putting a 100–200 KB original behind a 68px box. The
  file is still copied to `dist/images/` for the article body; nothing is
  duplicated in git.
- **They are twenty explicit imports, not an `import.meta.glob`, and that was
  measured.** A glob has to be a static pattern, so it matches the whole tree —
  and an *eager* glob imports every file it matches while Astro emits every
  module it has imported, referenced or not. The first version put **8 MB
  across 52 full-size JPEGs** into `dist/_astro/`, every one a second copy of a
  file already in `dist/images/` and none of them ever requested. Explicit
  imports are also louder: rename a picture and the build fails in that file,
  rather than the card quietly falling back to a glyph.
- **The frame is chosen by looking at it, not by taking the first file in the
  folder.** At 56–68px a diagram with two or three large shapes survives and a
  room scene does not — a photograph of a scanner and a photograph of a clinic
  are the same grey rectangle that small. So a `-concept`, `-mechanism` or
  `-anatomy` frame wins wherever one exists. `self-care` is the one exception
  and uses `-overview`: `self-care-mechanism.webp` shows a knee sleeve, and the
  self-care article never mentions a brace. The picture now lives on
  `knee-pain`, whose text does discuss one — it must still not arrive as the
  self-care icon.
- **`SectionIcon.astro`'s four glyphs are now the fallback, not the norm.**
  Every published resource article has a picture, so nothing renders one today;
  it is what a new article gets until somebody picks a frame for it. Drawn on
  the same 40x40 viewBox in `currentColor` as `BodyIcon`, so the two sit
  together without looking like two icon sets. **Keep them simple**: the first
  draft's capsule was drawn at an angle with an inner split and read as a
  smudge at 34px.
- **`.card-icon` in `global.css` is the box** — 56px on a phone, 68px from
  640px up, grown from 52/60 when the icons became photographs rather than line
  art. `flex: 0 0 auto` is load-bearing — without it a long unbroken Thai title
  in the column beside it squeezes the square into a sliver — and so is
  `min-w-0` on that text column, for the reason the CSS traps section gives.
  The pictures are 4:3 in a square box under `object-cover`, so each loses an
  eighth off either side and nothing off the top or bottom.
- **Page weight was re-measured after the switch**, because 22 distinct
  pictures replaced eight shared drawings: `/conditions` at 390px is **132 KiB
  over 14 requests** against 125 KiB before, and every other listing is 82–100
  KiB. `/articles` was the heaviest at 158–170 KiB, and that was 123 KB of
  raw HTML for 42 cards — 17 KB gzipped — rather than the icons, which are
  lazy and below the fold. It is 111–114 KiB since the clip gallery moved out
  to `/videos` on 2026-09-20.
- **A region page passes `badge={false}`.** Every card there is the same region,
  so the pill would repeat the page's own `h1` on every row. The picture stays,
  because an icon showing the condition is useful even where the words beside
  it are not.
- **`meta`, `playBadge` and `fullSummary` exist for the video gallery alone**,
  and it is the only caller of any of them. See "The videos tab" below for what
  each one is for; the short version is that a clip's card links into the
  middle of an article, its icon is a photograph that needs saying it is a
  clip, and its summary carries a caution that must not be clipped off the
  end.

**`cardSummary` is a new schema field, and it is not a shortened `summary`.**
`summary` has two other jobs — it is the page's meta description and what
Pagefind shows under a hit — and it earns its 92-to-267 characters there. On a
card it ran to two full lines and a phone clamped it mid-word. `cardSummary` is
the same claim in a glance: **all 84 article files carry one**, 55–91 characters
in Thai and 49–75 in English, and the card falls back to `summary` when it is
absent. The home page's featured strip reads it too.

- **It must never soften a caution by dropping its qualifier.** "most settle
  within weeks" without "know which symptoms need a doctor" is a reassurance
  this site does not make — `back-pain`'s card line keeps both halves, and so
  must any future one.
- **Measured rather than assumed**: 0 of 564 card lines clip at 390, 768 or
  1280px in either language, over 48 page loads. One Thai line and 42 English
  ones were trimmed after the first measurement showed them wrapping past the
  clamp, and two more English lines — `back-pain` and `ankle-sprain`, both 75
  characters — when the icon box grew 52px to 56px at 390px and took the width
  back out of the text column. Both were trimmed to ~70, and `back-pain` kept
  both halves of its caution. The clamp
  itself is `line-clamp-3 sm:line-clamp-2` — a 390px card is a third of a
  desktop row's measure, so the same sentence needs three lines there — and it
  is the guard for an article that has no `cardSummary`.
- **These are 168 new visible strings under the author's byline** and he has
  not read them. They carry no claim his own `summary` did not.

### The videos tab

`/videos` and `/en/videos` are the clip gallery, and they are a page rather
than an anchor since 2026-09-20.

**The tab used to land on `/articles#videos`**, and that page carried the
gallery *plus* five groups of article cards — conditions, basics, tests,
treatments and rehabilitation. Every one of those five is a tab of its own two
places to the left, so a reader who chose "วิดีโอ" got a page mostly made of
the menu they had just used. The author asked for the tab to show clips and
nothing else.

- **The gallery moved; the hub stayed.** `/articles` still indexes the four
  libraries — the home page's "ดูบทความทั้งหมด" link and the search page's
  browse link both point at it — and now carries one link to `/videos` instead
  of a second copy of the list. Two galleries built from the same scan of the
  article bodies would be two things to keep in step, which is the bug
  `lib/videos.ts` exists to avoid.
- **The nav did not change shape.** `videos` was already the ninth tab; it just
  stopped being pushed onto the list by hand and became an entry in
  `sections.ts` like the others. Same nine labels, same one row from 960px,
  same `--header-offset` — re-measured at 960, 1024, 1280, 1440 and 1920px in
  both languages: one row, nine tabs, 132px of header in Thai and 127px in
  English. (A row test that counts distinct `top` values reports two rows in
  English and is wrong: a tab with a chevron is 1px taller than one without.
  Measure the `<ul>`'s height — it is 44px.)
- **Each row is an ordinary `Card`**, the same row `/conditions` and every
  section index use, because the author asked for the horizontal box here too
  and two implementations of "a listing row" drift.
- **The icon is the clip's own poster frame.** `scripts/make-video-posters.mjs`
  already cuts one at 20% of each clip's duration, and `src/lib/video-posters.ts`
  hands the same file to the card — so the row shows what the clip shows, and
  the picture can never disagree with the one the player opens onto, because
  both derive it from the clip's `src` by the same `.mp4` → `.poster.webp`
  rule. Sixteen explicit imports, not a glob, for the reason
  `lib/topic-images.ts` records. 16 files serve 19 rows, because six clips are
  byte-identical across two apps and stored once. Cost: 84 KiB for the whole
  set of thumbnails, 2–7 KiB each.
- **A play badge sits over the poster**, because a frame from a clip looks
  exactly like any other photograph at 68px. It is a shape on a scrim with a
  ring — the treatment `<Video>`'s own poster badge uses — not a tint, per the
  site's rule against meaning carried by colour alone, and it is decorative:
  the card's heading and its `meta` line say the same thing in words.
- **The card's summary is the author's own `<Video caption>`, verbatim and
  unclamped — and the unclamping is a safety fix, not a visual one.**
  `Card` normally clamps a summary to two lines, which is right for a
  `cardSummary` written to fit. A clip's caption was written to sit under a
  playing video, and several carry their caution in the last clause:
  "หยุดที่ความตึง ไม่ใช่ที่ความปวด", "ดึงที่ต้นแขน ห้ามดึงที่ข้อมือ", "Stop at a
  stretch, not at a sting", "Pull at the upper arm, never at the wrist".
  Measured at 390px, the clamp cut **30 of 38 captions**, and what it cut was
  the end — it was deleting the warning and keeping the instruction. `Card`
  therefore takes `fullSummary`, and the gallery is the only caller. A tall row
  is the cheap problem here; **do not put the clamp back**.
- **`meta` is the other new `Card` prop**, and it is what lets the gallery be
  ordinary cards at all: a clip's link lands in the *middle* of an article, at
  the `##` that carries its cautions, and a card that jumps a reader there
  without saying so is a card that lied. It prints "article · section" under
  the caption, clamped to two lines — one line truncated
  "เอ็นหมุนไหล่ฉีกขาด · การฟื้นตัวและการฟื้นฟู" on nine rows out of nineteen at
  390px. Nothing else passes it.
- **Links, not players, unchanged.** The gallery never embeds a second player,
  for the reason it never did: a clip is a silent demonstration whose cautions
  live in the prose around it.

**Clips on exercise cards are in the gallery too**, since 2026-09-23:
`lib/videos.ts` reads `<ExerciseCard video=…>` as well as `<Video>`, the row
takes the card's `videoDescription` as its line (a card's body is its
instructions, and has no caption), and the icon is the card's own still —
`lib/video-posters.ts` maps each clip to its poster file or, for a card clip,
to the still in `src/assets/` the importer wrote under the same name. That
list was regenerated from disk and is **38 clips per locale**.

Verified (2026-09-20): 19 cards per locale, 19 posters, 19 play badges, every href anchored
at a section; 54 page loads at 390, 768 and 1280px across both languages with
0 clipped lines, 0 horizontal overflow and one `h1` each; `/videos` is 54–105
KiB; the hreflang cluster carries self, alternate and x-default; and no
`/articles#videos` is left anywhere in the built markup.

### The region empty state

`RegionPage` renders an explanation and a link to the conditions index when a
region has nothing published. **No route reaches it today**: both region
routes build only the regions with a published article *in that locale*, and
every region now has one in both. `/regions/hip` demonstrated the branch for
about an hour on 2026-09-11, while the two hip articles were Thai-only; they
are bilingual now, so it builds in both languages again. The branch is there
for the day a region's only article is held back, or is written in one
language before the other, and it was tested by routing every region
temporarily.

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
  content.
- **From 1400px it becomes a sticky rail in the LEFT gutter**, added on
  2026-09-19 at the author's request and moved from the right gutter to the
  left later the same day, also at his request. This entry used to say there
  was no room for a sidebar because the reading column is 68ch — true of the
  column, but the gutter beside it is not part of the column, and that is
  where the rail goes. **The reading column does not move**: measured at
  1399px and 1400px, the prose starts at the same x (309px) and keeps the same
  width (782px), because the rail is a float with a negative margin whose
  margin box falls entirely outside the container and so shortens no line box.

  **Its width is a constant — 14rem — and that is the point.** It was
  `min(15rem, gutter)`, which meant the rail grew with every pixel of viewport
  between 1360px and about 1600px: drag the window wider and the whole list
  reflowed. Measured now at 1400, 1440, 1600 and 1920px: 224px at every one.
  The gutter-derived `min()` is kept purely as a guard — `(100vw - 100%) / 2`
  on the child is exactly the gutter the centred column leaves, so a
  pathologically wide 68ch column shrinks the rail instead of pushing it off
  the screen, which matters because `ch` is a digit's width in whichever font
  actually loaded. **1400px rather than 1360px** is where 14rem fits with room
  to spare under the widest column the fonts here produce: the sandbox
  fallback gives an 822px column there, leaving 241px of usable gutter against
  the 224px the rail wants. The real Thai face is narrower, so production has
  more room, never less.

  **The rail does not scroll itself to follow the marked section, deliberately.**
  On a 23-entry article (acl-injury) the list is 1753px inside a 662px box, so
  the current-section marker can be scrolled out of the rail's own view. Fixing
  that means moving the rail's contents on a scroll event, which is the exact
  jumpiness the author asked to be rid of. Measured instead: the rail caps at
  `100vh - header - 5rem`, scrolls internally with `overscroll-behavior:
  contain`, and never overhangs the footer — checked at 950, 800 and 700px
  viewport heights, scrolled to the end of the page each time.

  **There is one copy of the list, not two.** Markup, DOM order and the
  accessibility tree are identical at every width; only the CSS differs. Two
  copies would double the tab order and drift.
- **The rail marks the section the reader is in**, which is the thing that
  makes a list that follows you worth having. The spy reads the scroll position
  and takes the last heading whose top has passed under `--header-offset` —
  the heading `scroll-padding-top` would land the reader on. An
  IntersectionObserver answers a different question, which headings are
  visible, and gets it wrong for a long section whose heading has scrolled
  away. Targets are looked up by the ids already in the list's own hrefs, so
  the spy and the links cannot disagree about a slug.

  The marker is a rule down the side **and** a colour **and** a weight, per the
  site's own no-colour-alone rule, and every link reserves the same 2px and
  padding whether current or not — on a list that re-marks itself each scroll
  frame, a one-pixel jog reads as a shiver.

  Verified at 1440px: tabbing into the rail brings the link on screen (the
  browser scrolls it into view — check this with a real `Tab` press and wait
  for the smooth scroll to settle, or you will measure a failure that is not
  there), activating a link lands its heading at exactly `--header-offset`,
  the rail stays inside the article at the foot of the page rather than
  overhanging the footer, and with JavaScript off it is a closed disclosure in
  the gutter that still fits the viewport.

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
  and `วววฬฬฬ` returns sixteen; even `qwxzvkjhg`, which this file used to call
  empty in both locales, returns the knee-pain page once. A test that needs a
  genuinely empty result set has to be checked rather than assumed, and there
  may not be one.

**A Thai query typed without spaces is one phrase, and Pagefind could not see
that.** The author reported it on 2026-09-20: searching ปวดเข่า (knee pain)
returned the ranking for ปวด (pain) alone — ปวดหลัง (back pain) first, ปวดคอ
and ปวดไหล่ above it, and ปวดเข่า itself sixth of 38. With no Thai segmenter,
Pagefind matches the leading run of the query and the rest contributes almost
nothing.

`public/search.js` therefore **filters Thai phrase results by whether the
page's own text actually contains the query**, before any scoring. Thai has no
word boundaries, so a substring test is what a segmenter would be
approximating: a page about knee pain contains the characters ปวดเข่า and a
page about back pain does not. It is *stricter* than Pagefind, which strips
Thai tone marks; both sides are normalised to NFC first. A query that matches
nothing exactly keeps Pagefind's ranking rather than returning nothing, and
**English is untouched** — its words arrive space-separated and already AND
correctly, and a substring test there would break stemming.

Three mitigations now, in the order they apply:

1. **The Thai phrase filter above**, which does most of the work.
2. Info pages carry `data-pagefind-weight="0.25"` so articles out-rank them
   while staying findable by their own words. **This is what keeps the privacy
   notice out of a search for เข่า** — not the cutoff.
3. `public/search.js` keeps the top 20 and drops anything scoring below 30% of
   the top score.

**Measured on the 2026-09-20 build, 133 pages.** Thai first, where the filter
applies:

| query | hits | shown before | shown now | first result now |
|---|---|---|---|---|
| ปวดเข่า | 38 | 20 | **9** | ปวดเข่า *(was ปวดหลัง)* |
| เข่า | 43 | 13 | 12 | MRI เข่า |
| ไหล่ติด | 20 | 17 | **5** | เอ็นหมุนไหล่ฉีกขาด |
| มือชา | 24 | 19 | **2** | carpal tunnel |
| ปวดหลัง | 38 | 20 | **8** | ปวดหลัง |
| ข้อเข่าเสื่อม | 20 | 20 | **8** | MRI เข่า |
| รองช้ำ | 1 | 1 | 1 | รองช้ำ |
| กระดูกพรุน | 1 | 1 | 1 | กระดูกพรุน |

English is unchanged, and was re-measured to prove it: knee pain 7, frozen
shoulder 3, numb hand 19, heel pain 6 — identical to before the change. A
Thai search costs about 30 fragment fetches and stays under 350ms.

**Two cleverer designs were built, measured and thrown away**, so nobody
builds them again. `Intl.Segmenter` does segment Thai correctly (ปวดข้อเข่า →
ปวด + ข้อ + เข่า), but requiring every word somewhere in `content` filters
almost nothing, because `content` is the whole page and a back-pain article's
related-reading links carry ข้อ and เข่า. Requiring the longest contiguous
sub-phrase instead picks the leftmost of equal length, so ปวดข้อเข่า matched
ปวดข้อ and returned tennis elbow — worse than falling through. Both made an
invented query slightly better and a real one worse.

**The known gap:** a Thai phrase the site words differently still falls back to
Pagefind's ranking. ปวดข้อเข่า leads with ปวดหลัง, because no page contains
that exact string. That is the pre-existing behaviour rather than a
regression, and the two rejected designs above are why it was left alone.

**The 0.3 cutoff was left where it is, and the evidence for it is mixed rather
than clean.** It still trims the tail on เข่า. But it is not a noise filter
everywhere: it drops acl-injury from *knee pain* and rotator-cuff-tear from
*frozen shoulder*, both plausibly worth showing. **Do not retune it without
re-measuring every query in the table above**; the top-20 slice and, now, the
phrase filter do much of the work the cutoff used to be credited with.
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

### Type scale, section numbering and captions

All three were reviewed on 2026-09-17 at the author's request.

- **The base size is 18px on a phone and 19px from 768px up**, raised from
  17/18. Much of the audience is reading about arthritis and osteoporosis, so
  it skews older — the same reason the looped Thai face was chosen.
- **It is deliberately not set on `html`.** A great deal of this site is sized
  in `rem` and measured by hand: the body map's 36rem/44rem widths and its
  hotspot coordinates, `--header-offset`, the `/tools` grid minimum, the
  article hero's 20rem/34rem caps. Moving the root would rescale all of it and
  invalidate those measurements. **Headings therefore use `em`, not `rem`**,
  so they track the base size while the layout stays put. Before this they were
  `rem` against the browser's 16px root, so a `1.5rem` h2 was 24px next to a
  19px paragraph — 1.26x, which does not read as a new section.
- **Article sections are numbered** — `1.`, `1.1`, `1.2`, `2.` — by CSS
  counters in `Prose.astro`, with a hairline rule above each `h2` and an
  indented left border on each `h3`. Nothing in the MDX changed, so moving a
  section renumbers everything below it for free, in both languages.
  `ArticleContents` computes the identical numbering from `render()`'s
  headings and shows it in the list.
- **The counters use the child combinator, and that is load-bearing.**
  `KeyFacts` renders an `<h2>` inside an `<aside>` and `ExerciseCard` an `<h3>`
  inside an `<article>`, both inside `.prose`. As descendants they were counted
  too: "สรุปสั้น ๆ" took number 1, every real section was one out from the
  contents list beside it, and every exercise card claimed a subsection number.
  A markdown heading is a *direct child* of the prose div; a component's
  heading never is.
- **Info and legal pages are not numbered.** `InfoPage` passes
  `numbered={false}` — their sections are independent statements, not steps.
- **Captions are `.caption` in `global.css`, at 0.75em**, which is the smallest
  type on the site: 13.5px on a phone, 14.25px on a desktop. `<Figure>`,
  `<Video>` and `<ExerciseCard>` all use it, so one rule moves every credit
  line on the site. It replaced Tailwind's `text-sm`, which was 0.875 of the
  browser's 16px root and so froze at 14px however large the body got.
- **The 80% opacity those lines used to carry is gone, and that was a
  contrast bug.** `--muted` on `--surface` is already near the AA floor; dimming
  it to 80% took it under. Small and muted is the whole effect — transparency
  is not part of it.
- **The app-media credits moved out of the card body.** In frozen-shoulder,
  osteoporosis and rotator-cuff-tear they were plain paragraphs inside
  `<ExerciseCard>`, so they rendered at full reading size in the middle of the
  instructions. They are now on `imageAttribution`, **wording untouched** —
  that wording is still the author's to confirm.
- **Figures are capped at 34rem and spaced asymmetrically.** At 68ch the column
  runs to ~680px on a desktop and a 1024px illustration printed that size
  dominates the sentences around it; 34rem is the same cap the article hero
  uses for a 4:3 scene. The figure sits 1.25em under the paragraph it
  illustrates and 2.5em above whatever follows, so it reads as belonging to the
  text above it. Exercise-card pictures are capped at 20rem: they are 765x1024
  portraits, and uncapped they rendered about 910px tall inside a card holding
  four lines of instructions.

### CSS and layout traps — all three were live bugs

- **Base element styles must stay inside `@layer base` in `global.css`.**
  Tailwind puts its utilities in `@layer utilities`, and an *unlayered* rule
  beats a layered one no matter the specificity. An unlayered
  `a { color: var(--accent) }` therefore overrode every Tailwind text-colour
  utility on a link: the header's search button rendered teal-on-teal, i.e.
  invisible, and nav links ignored `text-muted`. Anything new that styles bare
  elements goes in that layer too.
- **Anchor offset lives in `--header-offset`, not in a magic number.** The
  header is sticky and changes height with the viewport — re-measured on
  2026-09-19 once the nav fitted on one row, in both languages, with the menu
  closed: **125px below 480px, 75px from 480px, 77px from 640px, 181px from
  768px** (two nav rows) **and 132px from 960px** (one nav row, to 1920px).
  The token is 9rem / 6rem / 13rem / 9.5rem across those bands, each leaving
  about 20px on top. `html { scroll-padding-top }` reads it, so the skip link
  and every in-page anchor clear the header at every width. It used to be a
  flat `5rem`, which left an anchor target under the header nearly everywhere.
  **Overshooting is safe and undershooting is not** — too large only opens a
  gap above the heading, too small hides it under the header. Verified at
  twelve widths in both languages that the offset is never smaller than the
  header, and that a contents-list link lands its heading at exactly the
  offset.

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

**The map renders from `md` and its width scales with the breakpoint — 36rem at
md, 44rem at lg.** It used to be a flat 34rem, which was measured to be too
small for its own labels:

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
- 44rem needs room the tablet does not have, which is why the width is not one
  number. The longest label ("Hand & wrist", 167px) reaches ~57px left of the
  drawing, and at 768px the panel is only 664px wide; at 44rem that label would
  go off the side of the screen. 36rem is the widest the tablet holds, and from
  `lg` the panel is at least 920px and 44rem fits with slack to spare.
- **The tap target scales too: 44px from lg, 36px at md, and the difference is
  entirely transparent padding.** A hotspot's height is its pill's line box plus
  the hotspot's own padding, so `min-height` is rarely what decides it — a Thai
  label runs ~44px at the lg padding and an English one ~41px. At md the drawing
  is 36rem, leaving only 38.4px between the elbow, hand-wrist and hip
  coordinates, so a 44px box overlapped its neighbours by 5–6px: an ambiguous
  strip of blank space where a tap landed on whichever element came later in the
  document. Trimming `--body-map-pad-block` to 0.1rem there brings the box to
  36px and clears the overlap with 2.4px to spare. **The visible pill is
  identical at both sizes** — measured 33px in Thai and 30px in English at every
  width — so this is invisible. 36px is comfortably past the 24px WCAG 2.2 AA
  asks for, and an unambiguous 36px target beats a nominal 44px one that fights
  the target above it. Shrinking the *text* was never on the table.
  Verified: zero hotspot collisions at 768, 820, 900, 1023, 1024 and 1280px in
  both languages.

**The back-view figure's labels sit on a leader line.** Its two landmarks —
neck and spine — are at x 71% on a figure spanning 55–86%, i.e. in the middle
of it, so a label beside the dot lay across the drawing: the spine label
crossed the torso edge at 76% and both arm lines at 79–80% and 84–84.5%. The
dot has to stay on the spine, so the label moves instead — `has-leader` in
`global.css` pushes it clear by `--body-map-leader` and joins it back with a
dashed rule. That length scales with the drawing, because "clear of the figure"
is a fraction of it: 4.5rem at md, 7rem at lg.
The left figure needs none of this: its dots are already on the outer edge and
its labels run away from the body.

**Hovering a hotspot marks the place, not just the name.** Recolouring the
label alone was too quiet — the reader is looking at the drawing, not at the
pill, and a teal border on a small pill at the edge of the figure is easy to
miss before committing to a click. The dot now fills, grows 35% and takes a
halo (a `box-shadow`, so nothing moves and nothing joins the accessibility
tree) while the label fills solid. `:focus-visible` gets exactly the same
treatment, and `prefers-reduced-motion` keeps the colour and the halo while
dropping the growth.

The drawing is black line art on transparency, so it is inverted under
`prefers-color-scheme: dark` — that turns the lines white and leaves the
transparent areas alone.

### The condition illustration set

On 2026-09-17 the author committed 68 more illustrations, this time straight
into `src/assets/conditions/<slug>/` — **three per condition**: a `-hero` scene,
an `-anatomy` diagram and a `-care` scene, with a spare `-symptoms` scene for
carpal-tunnel-syndrome, herniated-disc and meniscus-tear. All 22 conditions have
a hero and a care picture; only meniscus-tear has no anatomy diagram.

- **One folder per condition now holds everything about it.**
  `src/assets/illustrations/` is **gone**: every hero it held was either
  byte-identical to the new one (4 of them) or superseded by it (18), so
  `heroImage` in all 44 article files points into `assets/conditions/` and the
  old folder had no referrer left. The two hip articles gained their first hero
  — they had none and were falling back to the region drawing.
- **The upload mangled a lot of names and every one was normalised.** A folder
  called `Achilles tendinopathy`; `.webp.jpg` double extensions; three files
  written as `back-pain:back-pain-care.webp` with a colon where the folder
  separator should have been; `nee-pain-anatomy.webp`; eleven names with spaces
  in them. Five files were byte-identical re-uploads of heroes already in the
  repo and were dropped.
- **Every new file is a JPEG whatever its extension claimed.** Same trap as
  2026-09-10: they arrived as `.webp` and `.png` and are JPEG inside. They were
  renamed to `.jpg`; the bytes are the author's, untouched. Astro reads the real
  format through sharp and emits webp either way, but a served `Content-Type`
  that lies is a bug waiting to happen.
- **Placement follows the canonical section order**: the anatomy diagram closes
  `โรคนี้คืออะไร` / `What it is`, the spare scene closes `อาการ` / `Symptoms`,
  and the care scene closes `แนวทางการรักษา` / `Treatment options`. Both
  languages get the same picture in the same place, which works because **none
  of these images carries text**.
- **Captions are now ON, and that reverses the ruling recorded here.** He ruled
  on 2026-09-19 that no captions were to be added; **later the same day he asked
  for the opposite** — "instead of `Illustration: …`, make appropriate captions
  for each image and video". Every one of the **284** `<Figure>` and `<Video>`
  blocks on the site now carries a `caption`; 196 were written in that pass and
  88 already had one.

  **The reason the old ruling gave still governs how they are written.** A
  caption under a picture of an exercise must not read as an instruction to do
  it, so every caption describes the frame or says what to notice in it, and
  none tells the reader to do anything. They also keep the medical content
  rules: nothing that tells a reader what they have, nothing that rules
  anything out ("a normal film does not mean nothing is wrong", not "a normal
  film is reassuring").

  **A caption is not a second copy of the `alt`.** `alt` describes the whole
  frame for somebody who cannot see it; the caption says why the picture is
  there. Duplicating one into the other makes a screen reader read the same
  sentence twice.

  **`attribution` was kept.** The instruction said "instead of", and the
  visible line is now the caption with the credit under it in the same small
  type — the credit is also what the editorial policy's copyright section
  leans on, and `lint:content` warns on a figure without one. Dropping it
  entirely is a search and replace over `src/content/` if that is what he
  meant.

  **`<ExerciseCard>` pictures were deliberately left alone.** The card already
  carries a title, the repetitions, the instructions and a "watch for" line;
  a caption would be a fifth block of text under a picture whose whole context
  is the card around it, and it is exactly the exercise case the old ruling was
  written about. The component has no `caption` prop, only `imageAttribution`.
- **The AI disclosure was answered on 2026-09-19 and lives on the editorial
  policy page, not in the captions.** None of these files carries a C2PA
  credential or any metadata — same as the 20 heroes before them, and unlike the
  app media, whose captions could claim AI generation because a credential
  proved it. The author confirmed that **every illustration and clip on the site
  is AI-generated** and asked for the statement to be made once, on
  `editorial-policy.mdx` in both languages, which also says the pictures are not
  photographs of patients, not medical images, and that where a picture and the
  words disagree the words win. **The 139 per-image attribution lines in each
  language were therefore not touched** and still read `ภาพ: …` / `Illustration:
  …` alone. A future pass that wants the disclosure per-image must ask him — he
  chose where it goes.
- **The illustrations are fully reserved; the text is not.** The same page now
  splits them: the site's text may still be reused for non-commercial education
  with attribution and a link back, while the illustrations and clips may not be
  copied, altered or republished for any purpose, education included, without
  his written permission. Do not re-merge those two into one licence.

### The examination illustration set

Also on 2026-09-17, 22 illustrations arrived in
`public/images/examinations/<exam>/` — for each of the six examination topics a
`-concept` diagram (what the test shows), an `-overview` scene (the room and the
machine) and a `-practical` scene (preparation, screening, what to declare),
plus for four of them a second procedure scene left over from an earlier upload.

- **These live in `public/`, not `src/assets/`**, so they are referenced as
  `<Figure src="/images/examinations/…">` — a string path, which is the branch
  of `<Figure>` that `lint:content` validates against the file on disk. They
  are not processed by `astro:assets`: **what is in `public/images/` is what
  the reader downloads, byte for byte**, which is why the whole set was
  re-encoded to WebP on 2026-09-20 — see "Build size and Vercel usage".
- **Placement follows what is in the frame, not the filename.** `-overview` is
  a room scene, so it goes in the section that explains what the test *is* or
  how it works; `-concept` goes where the article says what the test can show;
  `-practical` goes in preparation or safety. Two that did not fit that rule
  were placed on their content instead: the MRI `-practical` picture is a
  safety-screening interview, which is exactly "what to declare before you go
  in", and the nerve-conduction `-practical` picture is the needle EMG, which
  belongs under "afterwards" where the article talks about the needle site
  aching.
- **`ultrasound/musculoskeletal-ultrasound.jpg` is a lead image**, placed
  before the first `##`. It is a second shoulder-scanning scene with no section
  of its own, and putting it beside `ultrasound-overview.jpg` in one section
  would have been two near-identical pictures a few lines apart.
- **Six older flat files were deleted as byte-identical duplicates** of a file
  now inside a subfolder — `xray.webp`, `mri-scan.webp`, `knee-mri.webp`,
  `dxa-scan.webp`, `musculoskeletal-ultrasound.webp`,
  `nerve-conduction-emg.webp`. Checked by SHA-256, not by name.
- **Every file was a JPEG named `.webp`**, the third batch in a row to arrive
  that way. Renamed to `.jpg`, bytes untouched — and then genuinely converted
  to WebP on 2026-09-20, so they are `.webp` again and this time the extension
  is true. In `public/` this matters more than in `src/assets/`: nothing
  re-encodes these at build time, so the served `Content-Type` comes straight
  off the extension.
- Captions are again `alt` + `attribution` and nothing else, for the reason
  the condition set gives.

### The rehabilitation and treatment illustration set

Also on 2026-09-17, 30 illustrations for the five rehabilitation and five
treatment topics — an `-overview`, a `-technique`/`-mechanism` and a
`-progression`/`-practical` scene each. 29 are placed, in both languages, as 58
`<Figure>`s.

- **The paths were normalised to the examination set's convention**,
  `public/images/<collection>/<slug>/<slug>-<role>.jpg`. They arrived as
  `public/images/Rehabilitation/` — a capital letter, which is a broken URL on a
  case-sensitive server — and `public/images/treatment/`, where the collection
  is `treatments`, with subfolders (`balance-fall`, `principle`, `selfcare`,
  `injection`, `medication`, `choosing`) that did not match the articles.
- **The role in the filename does not describe the frame, so placement follows
  the picture, as it did for the examinations.** `rehab-principles-overview` is
  a three-stage progression from floor work to carrying shopping upstairs and
  closes "the four phases"; `rehab-principles-progression` is five everyday
  scenes around a ticked calendar and closes "how to measure progress";
  `rehab-principles-technique` is light weight → heavier → straining under a
  barbell with pain marked, and closes "increasing the load safely". Taking the
  filenames at face value would have put all three in the wrong sections.
- **`shoulder-rehab` is the one article whose figures are interleaved rather
  than closing a section.** All three of its pictures belong to "the usual
  sequence", which is four numbered steps, so each sits directly under the step
  it shows. Three stacked at the end of one section would have separated every
  picture from its own instructions.
- **`<Figure>` gained a `height` prop**, and all 102 path-based figures now
  carry `width` and `height` — the 58 new ones and the 44 examination figures
  that were already live. Same reason as `<ExerciseCard>`'s
  `imageWidth`/`imageHeight`: a path carries no dimensions, so the figure lays
  out with a zero-height box and reflows the article when the lazy file lands.
- **Every file was a JPEG named `.webp`**, the fifth batch in a row; renamed to
  `.jpg`, bytes untouched, then converted to real WebP on 2026-09-20.

**`self-care-mechanism.webp` is on `knee-pain`, not on `self-care`, and that
is on purpose.** It was held unplaced until the author asked for it to be
placed on 2026-09-23. Its three panels are a sore knee during a chore → an elastic sleeve
going on → walking outdoors in it. The self-care article never mentions a
brace or a support, so it still does not belong there: it would put a
treatment on that page that he never wrote, through a picture. `knee-pain`
*does* discuss one, in the author's own FAQ ("Should I wear a knee support?"),
and the picture shows exactly the sequence that answer describes. It closes
`## Prevention and self-care` / `## การป้องกันและการดูแลตนเอง`, and its caption
is that FAQ answer shortened **with both qualifiers kept** — it does not treat
the cause, and it is not a substitute for strengthening. A caption that kept
"helps some people feel more confident" and dropped those two would be the
picture promoting a product, which the medical content rules forbid.

### The exercise illustration set

The 36 pictures in `public/images/exercises/`, unreferenced since an earlier
upload, went onto the `<ExerciseCard>`s of the condition articles on
2026-09-17 — **42 cards in each language, 34 distinct pictures**. They did not
go to the rehabilitation or treatment articles, which an earlier note here
guessed at: those articles carry no `<ExerciseCard>` at all, and the card
titles in the condition articles map onto the filenames almost one to one.

- **A picture may serve two articles**, because two articles prescribe the same
  exercise — `calf-stretch-wall` on achilles-tendinopathy and plantar-fasciitis,
  `prone-on-elbows` on herniated-disc and sciatica, `hand-tendon-glide` on
  carpal-tunnel-syndrome and trigger-finger, `bridge` on back-pain and sciatica,
  `quadriceps-setting` on three knee articles.
- **Cards are addressed by index, not by title.** The Thai and English files
  carry the same exercises in the same order under different names, so the
  placement script matched on position within the file. Reordering the cards in
  one language without the other would silently pair a picture with the wrong
  exercise — as would inserting a card into one file only.
- **`<ExerciseCard>` gained an `imageAttribution` prop**, rendering under the
  picture exactly as a `<Figure>` figcaption does, and carrying the same line
  the condition and examination sets use. The app-derived cards in
  frozen-shoulder, osteoporosis and rotator-cuff-tear predate it and keep their
  credit as a line of body text, because that wording is still the author's to
  confirm.
- **A picture given as a path needs `imageWidth`/`imageHeight`**, and the cards
  carry the files' own 765x1024. An import carries its dimensions and `<Image>`
  writes them out; a string path does not, so the browser lays the card out with
  a zero-height box and reflows when the lazy file arrives. Measured at 390px by
  stripping the two attributes back out at runtime: the article grew 413px per
  picture as they landed — up to **1,650px on ankle-sprain**, four pictures, out
  of an 11,784px page. With the attributes the page height changes by at most
  1px across all 28 article pages at 390px and 1280px.
- **`lint:content` now checks an `<ExerciseCard image="/…">` against `public/`**,
  the same rule it already ran on `<Figure>` and `<Video>`. The component throws
  when an image has no `imageAlt` but cannot tell whether the file is there, and
  a string path goes straight to `<img>` — so a typo would render a broken
  picture on a published page rather than fail the build. Tested by breaking a
  path and watching it fail.
- **Every file was a JPEG named `.webp`**, the fourth batch in a row; renamed
  to `.jpg`, bytes untouched, then converted to real WebP on 2026-09-20. Two
  had a `.webp.jpg` double extension. `knee-oa-cartilage-loss.webp` was deleted
  as a byte-identical duplicate of the copy in `public/images/figures/`, and
  was never an exercise picture — **that surviving copy was deleted too on
  2026-09-20**, because nothing had referenced it since the placeholder knee
  figure went.

**`straight-leg-raise.webp` is placed on all three straight-leg-raise cards**
(knee-pain, meniscus-tear, meniscus-root-tear, both languages) since
2026-09-23, **on the author's ruling**. The file is the ACL app's `pre_4.jpg`:
other knee bent, working leg straight, toes up. It lifts the leg to about the
height of the other knee where the cards say "about a hand's width"; the
author was shown that difference and said to place it as it is. The alt text
describes the height the picture shows rather than the one the card states.

The picture it replaced was held for a different reason and must not come
back: it showed the working leg with the hip and knee both bent to about a
right angle — not a straight-leg raise at any point in the movement — beside
cards whose "watch for" line says the knee must stay straight throughout.

Two more were placed but are flagged for him: `ankle-alphabet.jpg` has the
letters **"ABC"** drawn into it — the first picture on the site with text in it,
so the Thai page shows English letters — and `double-leg-heel-raise.jpg` and
`heel-raise-towel-toes.jpg` show the **starting position**, feet flat, rather
than the heels raised. The alt text on those two says "starting position"
rather than describing a movement that is not in the frame.

### Region art, and the two illustration shapes

Two things from the 2026-09-10 upload still govern layout. The rest of that
batch's history — the `images/` staging folder, the `src/assets/illustrations/`
folder that replaced it, and the `.png`-named-JPEG renaming — is over: the
folder is gone and `heroImage` in all 44 article files points into
`assets/conditions/`. See "The condition illustration set" for where they live
now.

**`src/assets/regions/<region id>.png` is the drawing for each body-map
region**, rendered by `RegionArt.astro`. **The three browsing categories that
are not body parts — bone-health, paediatric, sports — have no drawing** and
fall back to the line glyph in `BodyIcon.astro`. That fallback is why the
osteoporosis card on the home page once rendered an **empty panel**: `BodyIcon`
keys off the region id and simply had no path for `bone-health`. **Any new
region needs either a drawing here or a glyph there.**

`src/assets/sections/rehabilitation.png` is the runner beside the heading on
`/rehabilitation`. `ResourceIndex` maps collection → art, and the other
sections run without a picture rather than borrowing one.

**Two shapes are still in play, and that is not cosmetic** — but check which,
because this changed. **All 22 condition heroes are 4:3 at 1024x765** since the
2026-09-17 set replaced the badges; the **eight region drawings are still
square 800x800**, a circle inside a square with only soft gradient in the
corners. So the split is now regions against conditions, not one condition
against another.

- **`ConditionArticle` still branches on hero shape** — `max-w-[34rem]` for a
  wide hero, `max-w-[20rem]` for a square one, with `sizes` branching to match
  so the browser does not fetch a 34rem file for a 20rem slot. Every hero
  takes the wide path today, so **it is a guard rather than a live split**:
  keep it, because squeezing a labelled inset diagram to 320px makes it
  unreadable, and that is what would happen the day a square hero is added.
- **`RegionArt` takes a `fit` prop and the cards pass `contain`.** The home
  page's featured and reviewed cards are an 80x60 thumbnail on a 4:3 box.
  They were full-width 4:3 panels showing square badges, and measured, **seven
  of nine lost 25% off the top and bottom** — a quarter of the height off a
  circle-in-a-square takes the circle, not "the soft edge". `contain` is close
  to a no-op now that the heroes are 4:3, and it still earns its place: a card
  whose article has no `heroImage` falls back to that article's square region
  badge, and `cover` would crop it again.
- **The region circles keep `cover`** — there the box is square and so is the
  badge, so the crop only ever removes the soft corners, which is what that
  layout wants.

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

Worth knowing: **every article still shares one `lastReviewed`**, so that
sort is a no-op over the title-sorted list and the two languages show a
different three. The strip only becomes meaningful when review dates start to
differ. Do not manufacture dates to make it look livelier — see "Publishing
safety" for whose claim that date is.

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

**`articles` carries `hiddenFromNav: true`, and it used to be `conditions`.**
`/articles` and `/conditions` overlap — the hub indexes the four libraries and
the clips, the conditions index lists the largest of those libraries — so only
one of the two belongs in the menu. It was `conditions` that was hidden from
2026-09-08; on 2026-09-19 the author asked for the swap, and `conditions` is a
tab again while "บทความ & วิดีโอ" is gone. **Neither route was deleted**: the
home page's "ดูบทความทั้งหมด" link and the menu's videos entry both land on
`/articles`, and the body map, the homepage cards, the region pages and every
article breadcrumb link straight to `/conditions`. The nav is built from
`navSections`, not `sections`, so hiding an entry never removes its route.

**The video gallery is a section now, and it used to be an anchor.** It was the
`#videos` block of `/articles` with a tab pushed onto the list by hand in
`lib/nav.ts`, because it was not a page and an entry in `sections.ts` would
have handed `getSection` an id that answers to no collection. On 2026-09-20 the
author asked for the tab to show clips and nothing else, so it became `/videos`
with a component of its own — see "The videos tab" below — and the hand-pushed
entry went away. Nothing dispatches a collection off a section id, so the
missing one never mattered; what a section needs is a path, a nav label and a
heading, and the gallery has all three. It still sits after `rehabilitation`,
because the clips demonstrate that section's exercises.

`/terms` from the plan's route list is **not** built: it needs legal wording the
author has to supply, and inventing terms of use would be worse than not having
the page. The footer links to the disclaimer, privacy notice and editorial
policy, which do exist.

### The repository itself

Audited on 2026-09-20. GitHub reports it at **70 MB** over 160 commits, which
is nowhere near any GitHub limit — **do not rewrite history to reclaim space.**
Removing the superseded blobs (the 12.9 MB of JPEGs converted to WebP that
day, the deleted `src/assets/illustrations/` folder, the old `images/`
uploads) would need a filter-repo and a force push: every commit SHA changes,
every clone breaks, and every commit link in this file and in 50 merged PRs
goes dead. The saving is about 20 MB on a repo with no size problem.

What the audit did find and fix:

- **The LICENSE was CC0 1.0 — a public-domain dedication — on a public repo
  holding every illustration and clip.** The site's own editorial policy says
  in both languages that the illustrations and clips are fully reserved and
  may not be republished without written permission, so the licence said the
  exact opposite of the author's stated decision. He chose a three-part
  replacement on 2026-09-20: MIT for the code, CC BY-NC 4.0 for the article
  text, all rights reserved for the illustrations and clips, with the
  editorial policy named as the authority where the two differ. **A CC0
  dedication cannot be withdrawn from anyone who already relied on it**, which
  the file says plainly; it governs use from that date onwards.
- **The README was one line** (`# rueortho`) on a public repo. It now says
  what the site is, how to run it, what the four gates check, where things
  live, and how the three-way licence splits.
- **A stray copy of `googlef9618cb9fa32a0a8.html` sat at the repo root**,
  byte-identical to the one in `public/`. Only the `public/` copy is served;
  nothing referenced the root one. Deleted — **the two real proofs of Search
  Console ownership are untouched.**
- **`images/back pain.png`** (1 MB) was the last file in `images/` and this
  file had recorded it as unused since 2026-09-10. Deleted.
- **Two 200 KB planning documents sat at the repo root** and moved to
  `docs/planning/`. They are the author's own prompt notes, unreferenced by
  any code, and are kept rather than deleted.

Verified clean in the same pass: no secrets tracked (`.env.example` holds an
empty analytics token and nothing else), no open pull requests, `main` the
only branch, and CI green on all recent runs. The CI workflow is already
correctly scoped — `push` restricted to `main` plus `pull_request`, with
`cancel-in-progress` concurrency — so a branch push runs the jobs once, not
twice.

**`_extracted/` is tracked on purpose** and should stay tracked: it is the
author's own app content, and it is what his wording is checked against when
a Thai sweep asks whether a phrase is his or Claude's.

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
is **`easybone.org`** since 2026-09-24, so the codes scan to the author's own
domain. Any code printed before then points at `rueortho.vercel.app`, which
redirects to the same page on `easybone.org`, so it keeps working. **This is
the domain to print.**

`/tools` (เครื่องมือผู้ป่วย) is `live` rather than a stub because the companion
apps *are* the patient tools. A grid whose `minmax` minimum exceeds the viewport
overflows, so it uses `minmax(min(23rem,100%),1fr)`.

### MDX component notes

- `frontmatter` is available inside any MDX body, which is how
  `<RedFlags flags={frontmatter.redFlags} />` avoids restating the list.
- **1669 is for a life-threatening emergency, and nothing else.** Reviewed on
  2026-09-17 at the author's request, because the number was being handed out
  by the box rather than by the symptom. The urgent box's own intro told every
  reader to "go to an emergency department now **or call 1669**" — under a
  heading that also carried "you have lost 2 cm in height, tell your doctor"
  and, on the MRI page, "tell the staff you have a pacemaker". What changed:
  - **The intro now names the emergency department first** and reserves 1669
    for being too unwell to travel, or for a bullet that says to call. The
    triage panel and the footer say "life-threatening" rather than just
    "emergency"; the disclaimer and contact pages give the department first and
    1669 as the condition.
  - **Every bullet that names 1669 was checked and kept** — suspected heart
    attack, stroke symptoms, a limb with no pulse, a neck injury, a hip
    fracture that cannot bear weight, a head injury on blood thinners,
    anaphylaxis. Those are ambulance calls.
  - **One was reworded for consistency, not on a fresh judgement.**
    Osteoporosis said "call 1669 now" for cauda equina; back-pain,
    herniated-disc and sciatica all say "go to the emergency room immediately"
    for the same symptom. Osteoporosis now matches its three siblings.
  - **Four bullets moved to `seeDoctorSoon`**, and only where the author's own
    sentence already named a non-urgent action: "speak to your doctor"
    (achilles, fluoroquinolone), "tell your doctor" (osteoporosis, height
    loss), "have a doctor examine it" and "even when it does not hurt"
    (trigger-finger). **Anything ambiguous stayed urgent**, which is the safe
    direction and the same rule the tiers were split on.
  - **The MRI page's three items left `redFlags` entirely.** They are pre-scan
    declarations — a pacemaker, metal in the eye, aneurysm clips — and the box
    was telling readers to take them to an emergency department. They are now a
    warning callout in the section that already existed for them, which says in
    as many words that they are not emergencies.
- **Urgency has two tiers, and they are two visibly different blocks.**
  `redFlags` means hospital now; `seeDoctorSoon` means book an appointment.
  They were one list until 2026-09-11, and a list headed "go to hospital now"
  that also contains "if it is no better in two weeks" teaches the reader that
  the heading is an exaggeration — so the one line that really means tonight
  gets read at the same weight as the rest. `<RedFlags>` takes both
  (`flags` and `soon`) and renders the urgent one first, in the warning colours
  with an octagon, and the calmer one below it in the info colours with a
  calendar: **shape as well as colour**, per the site's own rule.
  `lint:content` accepts either tier as satisfying the "a published condition
  needs safety content" check, because an article about a benign problem can
  legitimately have nothing urgent to say while still saying when to book.
  Only five bullets site-wide needed moving — the existing lists were already
  genuinely urgent — and the split was made on wording the author had already
  written ("ไม่ดีขึ้นหลัง 1–2 สัปดาห์", "needing a painkiller every day for
  weeks"), never on a fresh judgement. Anything ambiguous stayed urgent, which
  is the safe direction.
- **A `<DoctorChecklist>` carries no heading of its own**, and every article
  caps the list at **five questions**. The component used to print an `h3` with
  the same words as the `## คำถามที่ควรถามแพทย์` immediately above it, one line
  apart; the section name now reaches assistive technology through
  `aria-label`, which is not rendered. Where a list ran longer than five, the
  author's own order was treated as the ranking: the first four are kept, plus
  the "how many weeks, and when should I come back" question wherever it sat,
  because that is the one with safety in it.
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
