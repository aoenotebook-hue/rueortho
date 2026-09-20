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

  /**
   * Is this query one unsegmented Thai phrase?
   *
   * Thai is written without spaces between words, so a reader searching for
   * two Thai words types them as one run of characters. That is the case
   * Pagefind cannot handle and the phrase filter in `render` exists for. A
   * query with a space in it was segmented by the person typing it, so it is
   * left to Pagefind.
   */
  const THAI = /[\u0E00-\u0E7F]/;
  const isThaiPhrase = (query) => THAI.test(query) && !/\s/.test(query.trim());

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

      /*
       * Fetch the candidates' fragments before ranking, because the Thai rule
       * below needs each page's own text to decide. A wider slice for Thai:
       * the phrase filter throws most of them away.
       */
      const phrase = isThaiPhrase(query);
      let scored = search.results.slice(0, phrase ? 30 : 20);
      let data = await Promise.all(scored.map((r) => r.data()));

      /*
       * **A Thai query typed without spaces is one phrase, and Pagefind cannot
       * see that.** It has no Thai segmenter, so it matches the leading run of
       * the query and lets the rest contribute almost nothing: searching
       * ปวดเข่า (knee pain) returned the ranking for ปวด (pain) alone, with
       * ปวดหลัง (back pain) first and ปวดเข่า itself sixth of 38. The author
       * reported it on 2026-09-20.
       *
       * Thai has no word boundaries, so a plain substring test is the thing a
       * segmenter would be approximating: a page about knee pain contains the
       * characters ปวดเข่า, and a page about back pain does not. Measured over
       * eight Thai reference queries, it separates them exactly — มือชา (numb
       * hand) went from 19 results to the two that are actually about it.
       *
       * **It is stricter than Pagefind on purpose.** Pagefind's generic
       * handler strips Thai tone marks, so เข่า (knee) matches เข้า (enter);
       * comparing against the page's real text does not. Both sides are
       * normalised to NFC first, since the same Thai string can be encoded
       * more than one way.
       *
       * **A query that matches nothing exactly keeps Pagefind's ranking**
       * rather than returning nothing. A reader who types a phrase the site
       * words differently — ปวดข้อเข่า where an article says ข้อเข่า — is
       * better served by near misses than by an empty page.
       *
       * English is deliberately untouched. Its queries arrive as space-
       * separated words that Pagefind already ANDs correctly, and a substring
       * test there would break stemming: a search for "injuries" would stop
       * matching a page that says "injury".
       *
       * **Two cleverer tiers were built, measured and thrown away**, so that
       * nobody builds them again. `Intl.Segmenter` does segment Thai
       * correctly (ปวดข้อเข่า → ปวด + ข้อ + เข่า), but requiring every word
       * somewhere in `content` filters almost nothing: `content` is the whole
       * page, and a back-pain article's related-reading links carry ข้อ and
       * เข่า. Requiring the longest contiguous sub-phrase instead picks the
       * leftmost of equal length, so ปวดข้อเข่า matched ปวดข้อ and returned
       * tennis elbow — worse than falling through. Both made an invented
       * query slightly better and a real one worse.
       */
      if (phrase) {
        const needle = query.normalize('NFC');
        const exact = scored
          .map((r, i) => ({ r, d: data[i] }))
          .filter(({ d }) => (d.content || '').normalize('NFC').includes(needle));

        if (exact.length > 0) {
          scored = exact.map((x) => x.r);
          data = exact.map((x) => x.d);
        }
      }

      /*
       * Pagefind's fallback still drags in weak matches, so drop anything
       * under a fraction of the top score. A query that genuinely matches
       * several pages keeps them all, because their scores stay close
       * together.
       *
       * See "Search notes" in CLAUDE.md for the measured table and for why
       * this number has been left alone.
       */
      const RELATIVE_CUTOFF = 0.3;
      const top = scored.length > 0 ? scored[0].score : 0;

      // Indices rather than a filtered list, because each kept result has to
      // carry its already-fetched fragment across from `data`.
      const keep = [];
      for (let i = 0; i < scored.length && keep.length < 20; i += 1) {
        if (i === 0 || scored[i].score >= top * RELATIVE_CUTOFF) keep.push(i);
      }

      results = keep.map((i) => data[i]);
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
