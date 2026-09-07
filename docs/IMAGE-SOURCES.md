# Image register

Every image on the site must be listed here before it is used. This exists
because provenance has already been a real problem on this project: five images
in the rotator-cuff app carry no C2PA credential and have completely stripped
metadata, and most of the rest is AI-generated. A public medical site under a
named doctor's byline cannot carry images whose origin nobody can state.

## The rule

An image may go on the site only if this table can be filled in truthfully for
it. If the Source or Licence column would have to say "not sure", the image does
not ship.

## Folders

| Folder | For |
|---|---|
| `public/images/anatomy/` | Anatomical illustrations used in articles |
| `public/images/conditions/` | Condition hero and card images |
| `public/images/exercises/` | Exercise demonstration stills |
| `public/images/hero/` | Homepage and section headers |
| `public/images/authors/` | Author portraits |
| `public/images/figures/` | Diagrams referenced by a single article |
| `public/icons/` | Icon assets not drawn inline as SVG |
| `public/logo/` | Logo files |

Name files descriptively — `knee-oa-cartilage-loss.webp`, not `img_034.webp`.
Prefer WebP or AVIF, and SVG for line diagrams. Anatomical illustrations should
share one visual language, so prefer a single source for the whole set.

## Register

| File | Source | Licence | Attribution shown | Added |
|---|---|---|---|---|
| `images/authors/sorawut-placeholder.svg` | Drawn for this project | Project's own | none needed (decorative) | 2026-09-06 |
| `images/figures/knee-anatomy-placeholder.svg` | Drawn for this project | Project's own | placeholder caption | 2026-09-06 |
| `favicon.svg` | Drawn for this project | Project's own | none needed | 2026-09-06 |

## Where attribution appears

In the `<Figure>` caption, via the `attribution` and `license` props — not in a
credits page. The reader should see where a figure came from without leaving the
article. `npm run lint:content` warns on a `<Figure>` with no `attribution` and
fails on one with no `alt`.

## Open question

Servier Medical Art (CC BY 4.0) covers most joints and would give the whole site
one consistent anatomical style. If used, the caption needs
"Servier Medical Art, CC BY 4.0" and the licence requires that attribution be
kept.

The author has confirmed he knows the provenance of the images in his four
patient-care apps, but the exact attribution wording for them is still
outstanding — see `CLAUDE.md`. Until that wording exists, none of those images
should be placed on a page.
