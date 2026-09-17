/**
 * Every in-page anchor on the built site must point at an id that exists.
 *
 * This lives here rather than in the CI link checker because **lychee's
 * `--include-fragments` cannot do it on this site at all.** Astro builds
 * directory-style pages, so `/conditions/frozen-shoulder` is a *directory*
 * holding `index.html`. lychee resolves that path happily for a plain link —
 * a link with no fragment never errors — but when a fragment is attached it
 * cannot read ids out of a directory and reports "Cannot find fragment" for
 * every one. That was 38 failures on a site whose anchors all work: the 19
 * video-gallery links per locale, each pointing at a heading id that is
 * demonstrably in the HTML. On this site the flag produces nothing but false
 * positives, so it is off in `ci.yml` and this script does the job properly.
 *
 * It is a real check, not a rubber stamp: it resolves the target file the way
 * a browser does, percent-decodes the fragment (Thai heading ids arrive
 * encoded), and looks for a matching `id` or `name`.
 */
import { readdirSync, readFileSync, statSync, existsSync } from 'node:fs';
import { join, resolve, dirname } from 'node:path';

const DIST = 'dist';
if (!existsSync(DIST)) {
  console.error('check-anchors: no dist/ — run `npm run build` first.');
  process.exit(1);
}

/** Every built HTML page. */
function htmlFiles(dir) {
  const out = [];
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const p = join(dir, entry.name);
    if (entry.isDirectory()) out.push(...htmlFiles(p));
    else if (entry.name.endsWith('.html')) out.push(p);
  }
  return out;
}

/** The ids and names a page offers as anchor targets. */
const targetCache = new Map();
function anchorsIn(file) {
  if (targetCache.has(file)) return targetCache.get(file);
  const html = readFileSync(file, 'utf8');
  const set = new Set();
  for (const m of html.matchAll(/\s(?:id|name)="([^"]+)"/g)) set.add(m[1]);
  targetCache.set(file, set);
  return set;
}

/**
 * Resolve an href to the file that serves it, the way the host does:
 * `/a/b` is `dist/a/b/index.html` when that directory exists, else
 * `dist/a/b.html`, else `dist/a/b`.
 */
function resolveTarget(href, fromFile) {
  const clean = href.split('?')[0]; // /search?q=x is served by /search
  if (!clean) return fromFile;
  const path = clean.startsWith('/')
    ? join(DIST, clean)
    : resolve(dirname(fromFile), clean);
  if (existsSync(path) && statSync(path).isDirectory()) {
    const index = join(path, 'index.html');
    return existsSync(index) ? index : null;
  }
  if (existsSync(`${path}.html`)) return `${path}.html`;
  return existsSync(path) ? path : null;
}

const pages = htmlFiles(DIST);
const problems = [];
let checked = 0;

for (const file of pages) {
  const html = readFileSync(file, 'utf8');
  for (const m of html.matchAll(/<a\b[^>]*\shref="([^"]+)"/g)) {
    const href = m[1];
    // External, protocol-relative and non-http schemes are lychee's job.
    if (/^(?:[a-z][a-z0-9+.-]*:|\/\/)/i.test(href)) continue;
    const hash = href.indexOf('#');
    if (hash === -1) continue;

    const fragmentRaw = href.slice(hash + 1);
    if (!fragmentRaw) continue; // a bare "#" is a valid top-of-page link
    let fragment;
    try {
      fragment = decodeURIComponent(fragmentRaw);
    } catch {
      fragment = fragmentRaw; // malformed encoding: compare it literally
    }

    const pathPart = href.slice(0, hash);
    const targetFile = pathPart === '' ? file : resolveTarget(pathPart, file);
    checked++;

    if (!targetFile) {
      problems.push(`${file}: ${href} — no page serves ${pathPart}`);
      continue;
    }
    const ids = anchorsIn(targetFile);
    if (!ids.has(fragment) && !ids.has(fragmentRaw)) {
      problems.push(`${file}: ${href} — ${targetFile} has no id "${fragment}"`);
    }
  }
}

const label = `check-anchors — ${pages.length} page(s), ${checked} in-page link(s)`;
if (problems.length) {
  console.error(`${label}; ${problems.length} broken:\n`);
  for (const p of problems) console.error(`  ${p}`);
  process.exit(1);
}
console.log(`${label}; all resolve.`);
