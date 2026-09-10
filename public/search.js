/**
 * Search behaviour for /search and /en/search.
 *
 * This lives in public/ on purpose. Pagefind generates /pagefind/pagefind.js
 * *after* the Astro build, so Vite must never try to resolve that import. In a
 * bundled Astro <script> it rewrites the dynamic import into its preload helper
 * and leaves an undefined __VITE_PRELOAD__ behind, which throws at runtime.
 * Files in public/ are copied verbatim, so the import survives as written.
 *
 * Every visible string is passed in from src/i18n/ui.ts through a JSON script
 * tag, so this file contains no user-facing text.
 */

const form = document.querySelector('[data-search-form]');
const input = document.querySelector('[data-search-input]');
const statusEl = document.querySelector('[data-search-status]');
const list = document.querySelector('[data-search-results]');
const stringsEl = document.querySelector('[data-search-strings]');

if (form && input && statusEl && list && stringsEl) {
  const s = JSON.parse(stringsEl.textContent || '{}');

  let pagefind;
  let token = 0;
  let debounce;
  let composing = false;

  const escape = (value) =>
    String(value).replace(
      /[&<>"']/g,
      (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c],
    );

  /** The localised way out when search cannot help: real links, not a sentence. */
  const browseLinks = () =>
    `<li class="mt-4"><ul class="m-0 flex list-none flex-wrap gap-3 p-0">${(s.browse || [])
      .map(
        (item) =>
          `<li><a href="${escape(item.href)}" class="inline-block rounded-full border border-border bg-surface px-5 py-2.5 text-ink no-underline hover:border-accent">${escape(item.label)}</a></li>`,
      )
      .join('')}</ul></li>`;

  const load = async () => {
    if (!pagefind) {
      pagefind = await import('/pagefind/pagefind.js');
      await pagefind.init();
    }
    return pagefind;
  };

  const render = async (query) => {
    const mine = ++token;
    list.innerHTML = '';

    if (!query.trim()) {
      statusEl.textContent = '';
      return;
    }

    statusEl.textContent = s.searching;

    let results;
    try {
      const pf = await load();
      const search = await pf.search(query);
      const scored = search.results.slice(0, 20);

      /*
       * Pagefind has no Thai analyser and its fallback strips Thai tone marks,
       * so เข่า (knee) also matches เข้า (enter) and drags unrelated pages in.
       * Those matches score far below a real one, so drop anything under a
       * fraction of the top score. A query that genuinely matches several pages
       * keeps them all, because their scores stay close together.
       *
       * Measured on the 2026-09-10 build, 72 articles — see "Search notes" in
       * CLAUDE.md for the full table and for why this number was left alone.
       */
      const RELATIVE_CUTOFF = 0.3;
      const top = scored.length > 0 ? scored[0].score : 0;
      const kept = scored.filter((r, i) => i === 0 || r.score >= top * RELATIVE_CUTOFF);

      results = await Promise.all(kept.map((r) => r.data()));
    } catch (error) {
      if (mine !== token) return;
      console.error('Pagefind failed to load or search', error);
      statusEl.textContent = s.unavailable;
      list.innerHTML = browseLinks();
      return;
    }

    // A newer keystroke already won the race.
    if (mine !== token) return;

    if (results.length === 0) {
      statusEl.textContent = s.noResults.replace('{q}', query);
      list.innerHTML = `<li class="mt-3 text-muted">${escape(s.noResultsHint)}</li>` + browseLinks();
      return;
    }

    statusEl.textContent = s.results.replace('{n}', String(results.length));

    list.innerHTML = results
      .map((r) => {
        const region = r.meta && r.meta.region;
        // Pagefind's excerpt carries <mark> highlighting worth keeping; our own
        // summary is plain text and gets escaped.
        const summary =
          r.meta && r.meta.summary ? escape(r.meta.summary) : (r.excerpt || '');
        const title = (r.meta && r.meta.title) || r.url;

        return `<li class="mt-4">
          <a href="${escape(r.url)}"
             class="block rounded-[10px] border border-border bg-surface p-5 no-underline hover:border-accent">
            ${
              region
                ? `<span class="mb-2 inline-block rounded-full bg-info-ground px-3 py-1 text-sm text-info-ink">${escape(region)}</span>`
                : ''
            }
            <span class="block font-semibold text-ink">${escape(title)}</span>
            <span class="mt-1 block text-[0.95em] text-muted">${summary}</span>
          </a>
        </li>`;
      })
      .join('');
  };

  /**
   * Keep the address bar showing what the box shows, so a result set can be
   * copied, bookmarked or reloaded.
   *
   * Always `replaceState`, never `pushState`. Typing must not leave a history
   * entry per keystroke, and once typing keeps the URL in step there is nothing
   * left for a submit to push that is not already the current entry — pushing
   * there would only add a duplicate whose Back does nothing visible. Back
   * therefore leaves the search page, and any entry the reader does arrive at
   * — a bookmark, a shared link, Back from an article — is read and rendered
   * by `fromUrl` below.
   */
  const syncUrl = (query) => {
    const url = new URL(location.href);
    const current = url.searchParams.get('q') ?? '';
    if (current === query) return;

    if (query) url.searchParams.set('q', query);
    else url.searchParams.delete('q');
    history.replaceState(null, '', url);
  };

  const run = (query) => {
    syncUrl(query);
    render(query);
  };

  const schedule = () => {
    clearTimeout(debounce);
    debounce = setTimeout(() => run(input.value), 180);
  };

  /*
   * An IME composes a word over several keystrokes — Japanese and Chinese
   * always, Thai on some keyboards — and the half-formed text in the box during
   * that is not something anybody meant to search for. Wait for the composition
   * to end, then search once.
   */
  input.addEventListener('compositionstart', () => {
    composing = true;
    clearTimeout(debounce);
  });

  input.addEventListener('compositionend', () => {
    composing = false;
    schedule();
  });

  input.addEventListener('input', (event) => {
    if (composing || event.isComposing) return;
    schedule();
  });

  /*
   * Enter means "now", so it runs the query rather than waiting out the
   * debounce it just cancelled. Preventing the default reload is not enough on
   * its own: a reader who types and hits Enter quickly would otherwise see
   * nothing happen at all.
   */
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    clearTimeout(debounce);
    composing = false;
    run(input.value);
  });

  /** Read the query out of the URL and show it — on load, and on Back/Forward. */
  const fromUrl = () => {
    const query = new URLSearchParams(location.search).get('q') ?? '';
    if (input.value !== query) input.value = query;
    render(query);
  };

  // Back and Forward move between entries this page did not create — a link
  // into /search?q=…, or the entry before it — so re-read rather than assume.
  window.addEventListener('popstate', fromUrl);

  // Support /search?q=… so a result set can be linked to or bookmarked.
  if (new URLSearchParams(location.search).get('q')) fromUrl();
}
