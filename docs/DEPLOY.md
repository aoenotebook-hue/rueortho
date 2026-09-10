# Deploying Easyortho

The site is a static build. Vercel serves `dist/`, rebuilding on every push to
`main`. Nothing here costs money except the domain.

Work through this in order. Steps 1–3 get you a live `*.vercel.app` URL; the
custom domain in step 5 can wait until the content is ready.

---

## Before you start: what must be true

Two things are not deployment problems but will embarrass you if skipped.

1. **No unreviewed article is published.** `npm run lint:content` fails if an
   article still marked `SAMPLE` has `draft: false`, because publishing it puts
   your name on it as reviewer. Nothing carries that marker today — all 72
   article files are published — so the check is there for the next thing
   anyone drafts.
2. **Both addresses are real.** `contactEmail` in `src/data/site.ts` is
   `sorawut410@gmail.com`, the mailbox you asked to have published on
   2026-09-10. It appears on the contact page, twice in the privacy notice —
   as the data controller's address and as the route for exercising PDPA
   rights — and once in the editorial policy, so it is a legal identification
   as well as a way to be reached. It is a plain `mailto:`-less string in the
   page text, which is what you want legally; it does mean address harvesters
   can read it, so expect some spam and filter rather than removing it.

   The site's own address is settled too: `src/data/site.ts` sets
   `origin` to `https://rueortho.vercel.app`, the Vercel deployment, and
   `astro.config.mjs` imports it. That single line drives the canonical URLs,
   `hreflang`, the sitemap, both feeds, `robots.txt`, the QR codes and the
   domain printed in the legal text.

---

## 1. Push the repository to GitHub

The code already lives at `aoenotebook-hue/rueortho` on the
`claude/orthopaedic-education-website-ng2rw4` branch. Merge it to `main` when
you are happy with it — Vercel will track `main`.

A private repository is fine; Vercel can still deploy it.

## 2. Import into Vercel

1. Sign in at [vercel.com](https://vercel.com) **with your GitHub account**.
2. **Add New → Project**, and pick the `rueortho` repository.
3. Vercel detects Astro on its own. Leave the defaults:
   - Framework preset: **Astro**
   - Build command: `npm run build`
   - Output directory: `dist`
   - Install command: `npm ci`
4. Click **Deploy**. The first build takes a couple of minutes.

You now have a live URL like `rueortho.vercel.app`. Every branch also gets its
own preview URL, so you can read a new article in place before merging it.

## 3. Check the deployment

Open the live URL and confirm:

- The Thai home page loads and the fonts look right (IBM Plex Sans Thai Looped,
  not a system fallback).
- `/search` returns results — search for `เข่า`. If search is broken but the
  rest of the site works, the Pagefind index did not ship; check the build log
  for the `[pagefind] Pagefind indexed N pages` line.
- `/robots.txt` shows the sitemap URL, and `/sitemap-index.xml` loads.
- A wrong URL such as `/nope` shows the Thai 404 page.

## 4. Turn on analytics

Analytics is off until a token exists, so preview deployments stay silent.

1. In Cloudflare, go to **Web Analytics → Add a site**, enter the site's
   hostname, and copy the `token` value out of the JS snippet it shows.
2. In Vercel: **Project → Settings → Environment Variables**, add
   `PUBLIC_CF_ANALYTICS_TOKEN` with that value, scoped to **Production only**.
3. Redeploy. `Analytics.astro` renders nothing when the variable is missing, so
   local builds and previews send no data — which is what the privacy notice
   promises readers.

## 5. Connect the custom domain

The domain is registered at WordPress.com but the site runs on Vercel, so only
DNS changes. You do **not** need a WordPress site plan.

1. In Vercel: **Project → Settings → Domains → Add**, enter your domain. Vercel
   then shows the exact records to create — use its values, not the examples
   below, since Vercel's IP can change.
2. In **WordPress.com → Domains → your domain → DNS records**, add:
   - an **A** record for `@` pointing at the IP Vercel shows (currently
     `76.76.21.21`);
   - a **CNAME** for `www` pointing at `cname.vercel-dns.com`.
3. **Delete any conflicting default WordPress.com A or CNAME records for `@`
   and `www`.** Leaving them in place is the usual reason a domain never
   resolves to Vercel.
4. Wait for propagation — usually minutes, occasionally up to an hour. Vercel
   issues the HTTPS certificate automatically once DNS resolves; the domain
   shows a green tick when it is done.
5. **Point the site at the new domain** and push: change `origin` in
   `src/data/site.ts`. That is the only place it lives — `astro.config.mjs`
   imports it, and the canonical URLs, `hreflang` alternates, the sitemap, both
   RSS feeds, `robots.txt`, every QR code and the domain in the legal text all
   follow from it.

   Until you do, all of those keep naming `rueortho.vercel.app`, which is
   correct — it is where the site answers — but it means the custom domain
   serves pages whose canonical points at the Vercel address, so search engines
   go on indexing that one. Change it in the same session you add the domain.

   Never put a branch preview URL (`rueortho-git-…vercel.app`) in `origin`:
   previews are deleted, and a canonical pointing at one sends readers to a URL
   that stops existing.

## 6. Tell search engines

1. [Google Search Console](https://search.google.com/search-console): add the
   domain, verify it (the DNS TXT method uses the same WordPress.com DNS panel),
   and submit `https://<your-domain>/sitemap-index.xml`.
2. [Bing Webmaster Tools](https://www.bing.com/webmasters) accepts an import
   from Search Console — a two-minute job worth doing.

---

## What runs on every push

`.github/workflows/ci.yml` runs on every branch and pull request:

| Step | What it protects |
|---|---|
| `npm run check` | Types and templates — kept at zero errors, warnings and hints |
| `npm run lint:content` | A `SAMPLE` article published as reviewed, a published article with no sources, a `<Figure>` with no alt text |
| `npm run build` | The build itself, including the Pagefind index |
| Internal link check | Broken internal links fail the build |
| External link check | Reported, never blocking |

Vercel builds independently of CI, so a red CI run does not by itself stop a
deploy. Fix red CI before merging to `main`.

## Security headers

Split across two places, deliberately:

- **`vercel.json`** carries the headers that must come from the server:
  `X-Content-Type-Options`, `Referrer-Policy`, `Permissions-Policy`,
  `X-Frame-Options` and HSTS, plus long cache lifetimes for `/_astro/*`.
- **The Content-Security-Policy is generated by Astro** (`security.csp` in
  `astro.config.mjs`) and delivered as a `<meta>` tag, because Astro hashes each
  page's inline scripts and styles. That is what lets the policy avoid
  `'unsafe-inline'`. A static header in `vercel.json` could not carry per-page
  hashes, so do not try to move it there.

If you add a third-party embed, script or font host, add it to `security.csp`
or the browser will silently block it. `'wasm-unsafe-eval'` is already there and
is required — Pagefind runs its search index in WebAssembly.
