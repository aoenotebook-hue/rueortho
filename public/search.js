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
  form.addEventListener('submit', (event) => event.preventDefault());

  let pagefind;
  let token = 0;

  const escape = (value) =>
    String(value).replace(
      /[&<>"']/g,
      (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c],
    );

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
       * Those matches score far below a real one — for "เข่า" the article
       * scores 0.94 and the next page 0.26 — so drop anything under a fraction
       * of the top score. A query that genuinely matches several pages keeps
       * them all, because their scores stay close together.
       */
      const RELATIVE_CUTOFF = 0.3;
      const top = scored.length > 0 ? scored[0].score : 0;
      const kept = scored.filter((r, i) => i === 0 || r.score >= top * RELATIVE_CUTOFF);

      results = await Promise.all(kept.map((r) => r.data()));
    } catch (error) {
      if (mine !== token) return;
      console.error('Pagefind failed to load or search', error);
      statusEl.textContent = s.unavailable;
      return;
    }

    // A newer keystroke already won the race.
    if (mine !== token) return;

    if (results.length === 0) {
      statusEl.textContent = s.noResults.replace('{q}', query);
      list.innerHTML =
        `<li class="mt-3 text-muted">${escape(s.noResultsHint)} ` +
        `<a href="${escape(s.conditionsPath)}">${escape(s.browseAll)}</a></li>`;
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

  let debounce;
  input.addEventListener('input', () => {
    clearTimeout(debounce);
    debounce = setTimeout(() => render(input.value), 180);
  });

  // Support /search?q=… so a result set can be linked to or bookmarked.
  const initial = new URLSearchParams(location.search).get('q');
  if (initial) {
    input.value = initial;
    render(initial);
  }
}
