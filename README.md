# รู้เรื่องกระดูกและข้อ / Easyortho

Patient education about common orthopaedic problems, written for the general
public in Thailand by an orthopaedic surgeon. Thai is the primary language and
is served at `/`; English is mirrored under `/en/`.

**Live site: <https://easybone.org>**

A static site — 133 pages, no server, no database. 84 articles across five
libraries (conditions, body basics, tests and imaging, treatments,
rehabilitation), a body map, a clip gallery and offline-capable search.

## Running it

```sh
npm ci
npm run dev      # dev server on port 3000; drafts are visible here
npm run build    # must pass before any commit
npm run preview  # serve the built site — needed to test search
```

Four checks gate every change, and all four run in CI:

| command | what it checks |
|---|---|
| `npm run check` | `astro check` — kept at 0 errors, 0 warnings, 0 hints |
| `npm run lint:content` | publication safety (see below) |
| `npm run build` | the site builds |
| `npm run lint:anchors` | every in-page anchor points at an id that exists |

`lint:content` is the one worth knowing about: it fails the build if an
article still carrying a draft marker is published, if a published article has
no sources, if a figure has no alt text, if a video has no description, or if
any media path names a file that is not on disk. The site carries a named
doctor's byline, so those are correctness rules rather than style ones.

## Layout

```
src/content/{basics,conditions,examinations,rehabilitation,treatments}/{th,en}/
                     the articles, one MDX file per topic per language,
                     both languages sharing a slug
src/content/pages/   about, disclaimer, privacy, editorial policy, contact
src/content.config.ts   the Zod schema for all six collections
src/data/            authors, regions, sections, featured slugs, site origin
src/i18n/ui.ts       every visible string, Thai and English
src/components/      Astro components, including the MDX component set
src/assets/          illustrations processed by astro:assets
public/images/       illustrations served as-is
public/media/        the demonstration clips and their poster frames
docs/                the image register, the article template, deploy notes
```

`CLAUDE.md` is the long-form engineering record: why things are the way they
are, which decisions are the author's, and what must not be "fixed". Read it
before changing anything non-obvious.

## Licensing — three parts, not one

See [`LICENSE`](LICENSE) for the full text, and the site's
[editorial policy](https://easybone.org/en/editorial-policy), which is
the authoritative statement.

- **Code** — MIT.
- **Article text** — CC BY-NC 4.0: share and adapt for non-commercial
  education, with attribution and a link back.
- **Illustrations and clips** — all rights reserved. They may not be copied,
  altered or republished for any purpose, educational use included, without
  the author's written permission. They are AI-generated illustrations, not
  photographs of patients and not medical images.

## This is not medical advice

Everything here is general health information. It cannot see you, it is not a
substitute for seeing a doctor, and it must not be used to diagnose or treat
anyone. In Thailand, a life-threatening emergency is 1669.
