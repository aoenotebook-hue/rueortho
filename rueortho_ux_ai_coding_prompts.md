# RueOrtho / รู้เรื่องกระดูกและข้อ
## UX, Navigation, Trust, and AI Coding Improvement Prompts

**Live site reviewed:** https://rueortho.vercel.app  
**Repository reviewed:** https://github.com/aoenotebook-hue/rueortho  
**Stack:** Astro 7, MDX, Tailwind CSS 4, Pagefind, TypeScript, static deployment on Vercel  
**Primary audience:** Thai-speaking patients/general public, with English-language equivalents

---

# 1. Overall UX assessment

The current site already has a strong technical and accessibility foundation. It has:

- Thai/English routing.
- A sticky responsive header.
- Pagefind search.
- Body-region navigation.
- Condition, examination, treatment, rehabilitation, tools, article, and video content.
- Accessible focus states and touch targets.
- Medical red-flag callouts.
- References, FAQ, related content, and structured MedicalWebPage metadata.
- Responsive typography designed specifically for Thai.
- Dark-mode support through `prefers-color-scheme`.
- CI checks for Astro, medical-content linting, builds, and broken links.

The biggest opportunity is **not adding more features**. It is making the first few seconds easier for a patient:

1. Immediately understand what the site can help with.
2. Immediately find their symptom/condition.
3. Understand the difference between conditions, tests, treatment, and rehabilitation.
4. See visible signals that the medical information is reviewed and current.
5. Avoid feeling overwhelmed as the content library grows.

---

# 2. Highest-priority improvements

## P0 — Fix before public launch

### A. Fix production canonical/site URL configuration

`astro.config.mjs` currently has:

```js
const SITE = 'https://easyortho.com';
```

But the currently deployed site is:

```text
https://rueortho.vercel.app
```

Because `Astro.site` is used for canonical URLs, hreflang, sitemap/RSS, and QR sharing, this can produce incorrect URLs until the custom domain is actually connected.

**Recommendation:** make the production site URL environment-configurable and keep one safe fallback.

---

### B. Put “อาการ & โรค / Conditions” back in the primary navigation

The conditions section is a major patient entry point but is currently marked:

```ts
hiddenFromNav: true
```

Patients are more likely to think “I have knee pain” or “What is frozen shoulder?” than “I want an article.”

**Recommended primary navigation:**

Thai:
- หน้าแรก
- อาการ & โรค
- การตรวจ
- การรักษา
- ฟื้นฟู & ออกกำลังกาย
- เครื่องมือผู้ป่วย

Secondary/footer:
- บทความ & วิดีโอ
- เกี่ยวกับเรา

English:
- Home
- Conditions
- Tests & imaging
- Treatment
- Rehab & exercise
- Patient tools

Secondary/footer:
- Articles & videos
- About

This is a clearer patient-oriented information architecture.

---

### C. Restore a prominent search field in the homepage hero

The current homepage deliberately removed the hero search box and leaves search mainly in the header.

For a medical information site, search should be the clearest first action.

Recommended hero interaction:

**Thai placeholder**
> ค้นหาอาการ โรค หรือผลตรวจ เช่น ปวดเข่า ไหล่ติด MRI

**English placeholder**
> Search symptoms, conditions or tests, e.g. knee pain, frozen shoulder, MRI

Keep the existing popular-search chips below it.

---

### D. Make medical-review information visible on article pages

The code already stores:

- author
- reviewer
- credentials
- published date
- last-reviewed date

and already outputs these values in JSON-LD.

However, visible article UI currently shows only the author at the end of the page and intentionally hides review dates.

For medical content, readers benefit from seeing a compact trust signal near the title.

Recommended visible line:

**Thai**
> ข้อมูลทางการแพทย์ตรวจทานโดยศัลยแพทย์ออร์โธปิดิกส์ · ทบทวนล่าสุด 6 ก.ย. 2569

**English**
> Medically reviewed by an orthopaedic surgeon · Last reviewed 6 Sep 2026

Do **not** add hospital affiliation, workplace, promotional claims, or a clinician photo.

If preserving the current author-name privacy preference, show the reviewer role and review date without a personal name.

---

# 3. Important second-phase improvements

## Improve article navigation

Many medical pages are long. Add:

- “ในหน้านี้ / On this page”
- generated links to H2 sections
- current-section highlighting on desktop if possible without heavy JS
- “กลับขึ้นด้านบน / Back to top” after long content
- preserve existing semantic headings and MDX structure

Do not automatically rewrite medical content.

---

## Improve conditions filtering

The condition index already has:

- text search
- body-region chips

Enhance it with:

- visible result count
- clear/reset button
- URL-persisted `q` and `region` filters
- better empty-state guidance
- keyboard-accessible controls
- sensible mobile chip overflow/wrapping

---

## Make “Articles & videos” scalable

The current page renders several long grids grouped by content type. As the library grows this will become difficult to scan.

Add:

- one search box
- content-type filters
- body-region filter where applicable
- visible result count
- concise content-type badge on every result
- progressive enhancement: all content remains accessible without JavaScript

---

## Improve mobile navigation

Current mobile menu works, but improve behavior:

- close after selecting a link
- close with Escape
- return focus to Menu button on Escape
- close when viewport moves back to desktop
- prevent an invisible/open-state mismatch
- preserve `aria-expanded` and `aria-controls`
- do not introduce a large JavaScript framework

---

## Improve visual scanning without redesigning the brand

Keep the current typography, color tokens, Thai spacing rules, dark mode, and overall illustration style.

Enhance only where useful:

- add small content-type badges
- optionally add selected existing condition illustrations
- use Astro `<Image>` for optimized responsive assets
- avoid using an illustration on every card
- avoid decorative animation
- preserve the calm medical-education appearance

---

# 4. Rules for every AI coding task

Paste these rules together with each prompt below.

```text
PROJECT RULES

Work in the existing Astro/TypeScript/Tailwind architecture. Do not migrate frameworks.

Before editing:
1. Read CLAUDE.md.
2. Inspect the relevant existing components and data files.
3. Reuse existing tokens, utility classes, i18n helpers, content collections, and components.
4. Do not duplicate existing functionality.

Medical-content safety:
- Do not invent, rewrite, summarize, or change medical facts unless explicitly requested.
- Do not change red flags, treatment advice, rehabilitation instructions, medication information, or medical references.
- This task is UX/UI/technical unless explicitly stated otherwise.
- Preserve the site's educational/non-diagnostic positioning.
- Do not add healthcare advertising or hospital affiliation.

Internationalization:
- Every new user-visible string must support Thai and English through the existing i18n approach.
- Do not hard-code English-only labels into shared components.
- Preserve Thai typography rules and avoid letter-spacing/justified Thai text.

Accessibility:
- Preserve semantic HTML.
- Maintain visible keyboard focus.
- Maintain at least 44px touch targets where appropriate.
- Do not convey status using color alone.
- Respect `prefers-reduced-motion`.
- Ensure controls have accessible names and correct ARIA state.

Performance:
- Prefer server-rendered Astro markup and progressive enhancement.
- Avoid React/Vue/Svelte or a new client framework.
- Avoid unnecessary client-side JavaScript.
- Use `astro:assets` for local images where appropriate.

After changes run:
npm run check
npm run lint:content
npm run build

Do not consider the task complete if any command fails.
Do not change unrelated files.
Summarize the files changed, behavior changed, and test results at the end.
```

---

# 5. AI CODING PROMPTS

Run the prompts in this order.

---

## PROMPT 1 — Fix production site URL, canonical URLs, sitemap, hreflang, RSS and QR sharing

```text
Audit and fix the production site URL configuration for this Astro project.

Repository:
https://github.com/aoenotebook-hue/rueortho

Current deployment:
https://rueortho.vercel.app

Relevant files to inspect:
- astro.config.mjs
- .env.example
- src/layouts/BaseLayout.astro
- src/components/ToolsPage.astro
- src/pages/robots.txt.ts
- src/pages/rss.xml.ts
- src/pages/en/rss.xml.ts
- any sitemap-related configuration

Problem:
`astro.config.mjs` currently hard-codes `https://easyortho.com` as `Astro.site`.
That value drives canonical URLs, hreflang, sitemap/RSS and the QR code used to share the site. Until easyortho.com is genuinely connected to this deployment, generated production metadata can point at the wrong host.

Implement a clean environment-based solution.

Requirements:
1. Use one environment variable for the public canonical production URL, preferably `PUBLIC_SITE_URL`.
2. Normalize it so the configured URL has a valid scheme and no accidental duplicate trailing slash behavior.
3. Provide a safe default suitable for the current Vercel production site only if no environment variable is supplied.
4. Update `.env.example` with clear documentation.
5. Ensure `Astro.site` remains the single source of truth used by BaseLayout, sitemap, RSS, and ToolsPage QR sharing.
6. Do not scatter the domain string across components.
7. Do not change route structure.
8. Preserve current CSP configuration.
9. Verify Thai and English canonical/hreflang output conceptually and through the production build output.
10. Search the repository for stale hard-coded `easyortho.com` references and report each one. Change only references that should represent the live site URL.

Acceptance criteria:
- `npm run check` passes.
- `npm run lint:content` passes.
- `npm run build` passes.
- Built canonical URLs use the configured site host.
- hreflang alternates use the configured site host.
- sitemap/RSS use the configured site host.
- ToolsPage QR points to the configured site host.
- No unrelated medical content is modified.

At the end, show the exact environment variable I need to configure in Vercel.
```

---

## PROMPT 2 — Simplify primary navigation around patient intent

```text
Improve the site's primary navigation so a first-time patient can immediately find symptoms and conditions.

Inspect:
- src/data/sections.ts
- src/components/Header.astro
- src/components/Footer.astro
- src/i18n/ui.ts
- localized route helpers
- all pages that depend on `navSections`

Current issue:
The core `/conditions` section has `hiddenFromNav: true`, while “Articles & videos” and “About” occupy primary-navigation space. Conditions are one of the strongest patient discovery routes and should be directly visible.

Implement this information architecture:

Primary navigation, Thai:
- หน้าแรก
- อาการ & โรค
- การตรวจ
- การรักษา
- ฟื้นฟู & ออกกำลังกาย
- เครื่องมือผู้ป่วย

Primary navigation, English:
- Home
- Conditions
- Tests & imaging
- Treatment
- Rehab & exercise
- Patient tools

Keep “Articles & videos” and “About” easily accessible as secondary/footer destinations rather than primary navigation.

Requirements:
1. Make `/conditions` visible in primary navigation.
2. Remove `/articles` and `/about` from the main nav without deleting their routes.
3. Keep both in the footer.
4. Preserve bilingual links.
5. Improve active-state detection:
   - Home should be active only on `/` or `/en/`.
   - A section should remain active on its child pages, e.g. `/conditions/frozen-shoulder`.
6. Keep search and language switching visible.
7. Do not introduce dropdown navigation unless clearly necessary.
8. Preserve the sticky header.
9. Ensure the desktop navigation fits common 1024px widths without horizontal overflow.
10. Verify mobile layout at approximately 360, 390, 430, 768 and 1024px widths.

Also improve the mobile menu:
- Escape closes it.
- Focus returns to the menu button after Escape.
- Selecting a nav link closes it.
- Moving to desktop width resets the mobile open state safely.
- `aria-expanded` remains accurate.

Keep JavaScript minimal and framework-free.

Run all existing checks/build after implementation.
```

---

## PROMPT 3 — Restore homepage hero search as the primary action

```text
Improve homepage findability by restoring a prominent search field inside the hero.

Inspect:
- src/components/Home.astro
- src/components/SearchPage.astro
- public/search.js
- src/i18n/ui.ts
- src/i18n/utils.ts
- src/styles/global.css

The homepage currently has popular-search chips but no actual hero search form. Search is mainly accessed through the header.

Implement a prominent hero search form that submits to the existing localized `/search` page using the `q` query parameter.

Thai UX:
Label/accessible name:
ค้นหาข้อมูลกระดูกและข้อ

Placeholder:
ค้นหาอาการ โรค หรือผลตรวจ เช่น ปวดเข่า ไหล่ติด MRI

Button:
ค้นหา

English UX:
Accessible label:
Search orthopaedic information

Placeholder:
Search symptoms, conditions or tests, e.g. knee pain, frozen shoulder, MRI

Button:
Search

Requirements:
1. Use the existing localized search route.
2. Use GET submission with `name="q"`.
3. Keep the existing popular chips under the search field.
4. Do not replace the header search; both may coexist.
5. Make the hero search visually dominant but calm and medical-professional.
6. Minimum comfortable tap target sizes.
7. Correct visible focus states.
8. On narrow mobile layouts, input and button may stack if that is more readable.
9. Do not add search suggestions/autocomplete that could appear diagnostic.
10. Do not create a new search engine; use the existing Pagefind search page.
11. All strings must go through existing i18n conventions.
12. Preserve the current hero image on desktop.

Also inspect the current hero copy and spacing. Reduce unnecessary vertical whitespace if possible, but do not rewrite the medical/site mission substantially.

Run:
npm run check
npm run lint:content
npm run build
```

---

## PROMPT 4 — Improve homepage information hierarchy and first impression

```text
Refine the homepage hierarchy without redesigning the whole site.

Inspect:
- src/components/Home.astro
- src/components/BodyMap.astro
- src/components/BodyIcon.astro
- src/styles/global.css
- src/i18n/ui.ts

Goal:
A patient should understand and choose a path within roughly 10 seconds.

Desired hierarchy:
1. Hero: what this site is + prominent search
2. “ปวดตรงไหน? / Where does it hurt?” body-area navigation
3. “คุณอยากรู้อะไร? / What would you like to know?” task cards
4. Common conditions
5. “When should I see a doctor?” guidance
6. Recently reviewed / latest useful content
7. Trust signals

Requirements:
1. Keep the existing body map and four task cards.
2. Avoid adding more homepage sections.
3. Make section headings and short descriptions scan quickly.
4. Keep common-condition cards concise.
5. Ensure the four task cards clearly map to:
   - Conditions
   - Tests/imaging
   - Treatment
   - Rehabilitation/self-management
6. Add a compact textual route to all conditions near the body map.
7. Make mobile layout feel complete even though the large hero illustration is currently desktop-only.
   - You may show a smaller/cropped optimized hero image on mobile OR
   - keep it hidden if performance/readability is better, but ensure the hero does not feel visually empty.
8. Do not add sliders/carousels.
9. Do not add animated counters.
10. Do not use excessive gradients or shadows.
11. Preserve current color tokens and dark mode.
12. Keep emergency/triage wording exactly medically equivalent; do not invent new red flags.

Check for duplicate calls-to-action and remove visual competition where appropriate.

Verify:
- no horizontal scroll at 360px
- clear heading hierarchy
- keyboard navigation
- dark mode readability
- Thai line wrapping
- English layout
```

---

## PROMPT 5 — Upgrade the Conditions index filtering experience

```text
Improve `/conditions` and `/en/conditions` filtering without changing medical content.

Inspect:
- src/components/ConditionsIndex.astro
- src/components/Card.astro
- src/data/regions.ts
- src/i18n/ui.ts
- src/i18n/utils.ts

Current behavior:
- text filter
- region chips
- client-side filtering
- progressive enhancement

Add:
1. A visible results count, e.g. “พบ 8 รายการ” / “8 results”.
2. A clear/reset control that resets both query and region.
3. Persist filter state in the URL:
   - `?q=...`
   - `?region=knee`
4. Initialize controls from the URL on page load.
5. Update URL using History API without full reload when filters change.
6. Keep browser Back/Forward useful.
7. Improve no-results state with:
   - a short message
   - reset-filters action
   - link to full site search
8. Keep region buttons keyboard accessible.
9. Keep `aria-pressed` accurate.
10. Make selected state obvious using more than color alone if practical.
11. Keep all conditions visible when JavaScript is disabled.
12. Do not add fuzzy diagnostic matching or infer diseases from symptoms.
13. Preserve sorting by body region and title.

Optional, only if clean:
Show a small content count beside each region filter.

Do not change condition titles, summaries, keywords or medical text.

Run all repository checks and build.
```

---

## PROMPT 6 — Make Articles & Videos easy to browse as the library grows

```text
Redesign only the browsing controls and information architecture of the existing Articles & Videos index.

Inspect:
- src/components/ArticlesIndex.astro
- src/components/Card.astro
- src/lib/conditions.ts
- src/lib/resources.ts
- src/lib/videos.ts
- src/data/regions.ts
- src/data/sections.ts
- src/i18n/ui.ts

Current issue:
The page renders videos and several long content grids grouped by content type. This will become visually heavy as more material is published.

Goal:
Create one easy-to-scan knowledge-library interface without changing the underlying content.

Implement:
1. One search/filter input.
2. Content-type chips:
   - All
   - Conditions
   - Tests & imaging
   - Treatment
   - Rehab & exercise
   - Videos
3. Body-region filtering for entries that have region metadata.
4. Visible result count.
5. Clear/reset action.
6. URL-persisted filters when reasonable.
7. A concise content-type badge on each result.
8. Keep videos linked to their safe contextual article rather than playing exercise clips without surrounding instructions.
9. Preserve full accessible content if JavaScript is disabled.
10. Do not duplicate Pagefind or add a large search dependency.
11. Avoid an infinite-scroll interface.
12. Avoid tabs that make content inaccessible to search engines.
13. Keep heading hierarchy semantic.
14. Reuse existing Card styles instead of creating an unrelated design system.

The page should be useful on 360px mobile and large desktop screens.

Run all checks/build and report the before/after interaction model.
```

---

## PROMPT 7 — Add visible medical trust and review metadata

```text
Improve trust on medical article pages using metadata the project already stores.

Inspect:
- src/components/ConditionArticle.astro
- src/components/ResourceArticle.astro
- src/data/authors.ts
- src/content.config.ts
- src/i18n/ui.ts
- src/i18n/utils.ts
- existing MedicalWebPage JSON-LD

Do not alter medical facts or references.

Create a reusable small component, for example:
`src/components/MedicalReviewMeta.astro`

Place it directly below the article title/summary area on:
- condition articles
- examination articles
- treatment articles
- rehabilitation articles

Display:
- medical-review role/credential
- last-reviewed date

Preferred privacy-preserving wording:

Thai:
“ข้อมูลทางการแพทย์ตรวจทานโดยศัลยแพทย์ออร์โธปิดิกส์ · ทบทวนล่าสุด {date}”

English:
“Medically reviewed by an orthopaedic surgeon · Last reviewed {date}”

Requirements:
1. Source data from existing frontmatter and author/reviewer records.
2. Do not hard-code an arbitrary date.
3. Do not add hospital/workplace affiliation.
4. Do not add a clinician photograph.
5. Do not make promotional superiority claims.
6. Keep existing JSON-LD intact.
7. If an article is overdue for review, retain the existing visible warning.
8. Format Thai and English dates with existing utilities.
9. Ensure this block is visually secondary to the article title but easy to find.
10. Mark it appropriately so Pagefind does not over-weight repetitive trust text.

Also review the footer's current “last built” date. It can be confused with medical review freshness.
Either:
- rename it clearly as a technical/site build date, or
- remove it from the user-facing footer.

Prefer real article review freshness over deployment/build freshness.

Run all checks/build.
```

---

## PROMPT 8 — Add an “On this page” table of contents for long medical pages

```text
Improve navigation inside long medical articles without rewriting their content.

Inspect:
- src/components/ConditionArticle.astro
- src/components/ResourceArticle.astro
- src/components/Prose.astro
- Astro content `render(entry)` heading metadata
- MDX components
- global scroll-padding and sticky-header behavior

Implement a reusable article table of contents based on existing H2 headings.

Requirements:
1. Use headings generated from the existing MDX content.
2. Do not manually duplicate headings in frontmatter.
3. Display a compact “ในหน้านี้ / On this page” list after the article intro/trust metadata and before the main article body when there are enough H2 sections to justify it.
4. Do not display the TOC for very short pages.
5. Anchor links must land below the sticky header.
6. Preserve proper heading semantics.
7. Use standard links so navigation works without JavaScript.
8. If adding active-section highlighting, make it progressive enhancement and lightweight.
9. Add a small “กลับขึ้นด้านบน / Back to top” affordance near the end of long articles if helpful.
10. Respect reduced-motion preferences.
11. Do not alter MDX medical wording.
12. Make long Thai labels wrap cleanly.

Test a long page such as:
- frozen shoulder
- osteoporosis
- ACL injury
in both Thai and English.

Run all checks/build.
```

---

## PROMPT 9 — Improve related-content journeys across Conditions, Tests, Treatment and Rehab

```text
Improve “what should I read next?” navigation while keeping medical associations editorially controlled.

Inspect:
- src/content.config.ts
- src/components/ConditionArticle.astro
- src/components/ResourceArticle.astro
- src/lib/conditions.ts
- src/lib/resources.ts
- current `related` metadata
- all content collections

Important safety rule:
DO NOT algorithmically infer that a specific test, medicine, injection, surgery, or exercise is appropriate for a condition.
Only render relationships explicitly declared in reviewed frontmatter.

Design a clean optional related-resource model.

Possible schema:
- relatedConditions
- relatedExaminations
- relatedTreatments
- relatedRehabilitation

Or another typed structure that is cleaner in this codebase.

Requirements:
1. All relationships must be explicit and optional.
2. Existing content must continue to build without adding new relationships immediately.
3. Validate slugs/types where practical.
4. Render grouped “อ่านต่อ / Related information” cards at the end of articles only when metadata exists.
5. Show the content type clearly.
6. Do not infer or auto-populate medical relationships.
7. Avoid duplicate links.
8. Keep URLs localized.
9. Reuse Card or a small compatible variant.
10. Update documentation/template for future authors if there is an existing content-authoring guide.
11. Do not change current reviewed medical text as part of this task.

Implement the schema/UI first with backward compatibility, then provide an example of how an editor would add links manually without actually adding medically unreviewed associations.

Run all checks/build.
```

---

## PROMPT 10 — Use the existing illustration assets selectively and optimize them

```text
Audit the project's existing illustration/image assets and improve visual scanning without making the site image-heavy.

Inspect:
- /images
- src/assets
- src/components/Home.astro
- src/components/Card.astro
- src/components/BodyIcon.astro
- relevant condition pages
- Astro image usage

The repository already contains generated assets such as:
- knee_pain.png
- shoulder_pain.png
- back_pain.png
- plantar_fasciitis.png
- acl_injury.png
- oa_knee.png
- running.png
- arm_sling.png
- body-region icon PNGs

Some are outside `src/assets`, and some PNGs are relatively large.

Goal:
Use only selected images that clearly improve comprehension.

Requirements:
1. Inventory duplicates and unused files before moving anything.
2. Do not delete assets automatically unless clearly redundant and verified unused.
3. Prefer placing production illustrations under a coherent `src/assets/...` structure.
4. Use Astro `<Image>` / `astro:assets` for responsive optimization.
5. Preserve alt-text quality:
   - informative medical illustration: useful localized alt
   - purely decorative repeated graphic: empty alt
6. Do not put an illustration on every text card.
7. Suggested first use:
   - common conditions on homepage
   - selected condition article hero/summary areas
8. Maintain one consistent cartoon/medical visual language.
9. Avoid graphic injury imagery.
10. Avoid text baked into illustrations.
11. Do not alter clinical meaning.
12. Prevent layout shift with known dimensions/aspect ratios.
13. Verify light and dark mode.
14. Check mobile performance after adding images.

Before implementing, present a small mapping of existing asset -> proposed use and only then make the minimal useful changes.

Run all checks/build and report asset-size/performance implications.
```

---

## PROMPT 11 — Final UX/accessibility/performance QA pass

```text
Perform a final focused UX QA pass after the earlier improvements.

Do not redesign or add features during this task unless fixing a verified defect.

Repository stack includes Astro and Playwright.

Audit these routes in both Thai and English:
- /
- /conditions
- one condition article
- /examinations
- one examination article
- /treatments
- /rehabilitation
- /articles
- /search
- /tools
- /about

Viewport checks:
- 360x800
- 390x844
- 430x932
- 768x1024
- 1024x768
- 1440x900

Check:
1. No horizontal overflow.
2. Header/navigation does not obscure content.
3. Mobile menu keyboard behavior.
4. Correct focus order.
5. Visible focus rings.
6. Search form submits with localized route and `q`.
7. Filter controls work with keyboard and URL state.
8. Language switch remains correct on nested pages.
9. Active nav state works on nested routes.
10. Body-map links are reachable and understandable.
11. Long Thai headings wrap correctly.
12. Tables do not overflow the viewport.
13. Videos do not autoplay.
14. Images have appropriate alt text and dimensions.
15. Dark mode has readable contrast.
16. Reduced-motion behavior remains respected.
17. No dead internal links.
18. Canonical/hreflang URLs use the configured production host.
19. Medical-review metadata is visible but not promotional.
20. Emergency/disclaimer text remains present where designed.

Performance:
- Identify avoidable large assets.
- Identify unnecessary JS.
- Do not introduce a framework merely for testing.
- Do not trade accessibility for a better performance score.

If practical, add a small maintainable smoke-test script using the project's existing dependencies. Do not create a large brittle visual snapshot suite.

Finally run:
npm run check
npm run lint:content
npm run build

Provide:
- verified defects fixed
- files changed
- commands run
- remaining UX risks, if any
```

---

# 6. Recommended execution order

### First implementation batch — highest impact
1. Prompt 1 — production URL / SEO correctness
2. Prompt 2 — navigation / Conditions visibility
3. Prompt 3 — homepage search
4. Prompt 7 — medical trust metadata

### Second implementation batch — usability
5. Prompt 4 — homepage hierarchy
6. Prompt 5 — Conditions filters
7. Prompt 8 — article table of contents
8. Prompt 6 — Articles & Videos browsing

### Third implementation batch — polish and expansion
9. Prompt 9 — editorially controlled related journeys
10. Prompt 10 — illustration integration
11. Prompt 11 — QA/performance/accessibility

---

# 7. What I would avoid

Do not ask the coding AI to:

- redesign the entire visual identity;
- introduce React/Next.js just for interactivity;
- create an AI symptom checker;
- recommend a diagnosis from search terms;
- add chatbots that provide individualized medical advice;
- autoplay exercise videos;
- place ads or product recommendations inside medical articles;
- hide safety information behind accordions by default;
- add hospital affiliations or promotional claims without deliberate review;
- automatically infer which treatment/test/exercise belongs to a condition;
- create excessive animations, popups, carousels, or notification prompts;
- replace the existing accessible Thai typography;
- turn every section into a dashboard.

The site should feel like a calm, trustworthy patient-education library rather than a commercial healthcare landing page.

---

# 8. Target user experience after improvement

A new patient should be able to:

1. Arrive on the homepage.
2. Immediately understand that this is plain-language orthopaedic information.
3. Search “ปวดเข่า” directly, or tap Knee on the body-region interface.
4. See relevant conditions.
5. Open an article and immediately see:
   - what the page is about;
   - when the medical content was reviewed;
   - where they are in the article;
   - when urgent medical assessment may be appropriate;
   - references;
   - clearly labeled related information.
6. Move between Conditions, Tests, Treatment and Rehab without getting lost.
7. Use the same flow comfortably on a phone.

That should be the main design goal for the next version.
