/**
 * Google Tag Manager loader.
 *
 * This is Google's own snippet, moved out of the page and into `public/` —
 * unchanged apart from where the container id comes from.
 *
 * **It has to live here.** Astro's `security.csp` hashes only the scripts Astro
 * itself generates, and our policy carries no 'unsafe-inline', so an inline
 * <script> pasted into the layout is refused by the browser and the container
 * never loads. Files in `public/` are copied into the build verbatim and are
 * served from our own origin, which `script-src 'self'` already allows. This is
 * the same escape `public/search.js` uses, for the same reason.
 *
 * The id is read from the script tag's `data-gtm-id` instead of being written
 * in twice: it lives in `src/data/site.ts` and nowhere else. Same shape as the
 * Cloudflare beacon's `data-cf-beacon`.
 */
(function () {
  // Read before the IIFE below runs anything async — `document.currentScript`
  // is only this element while the script is executing synchronously.
  var el = document.currentScript;
  var id = el && el.dataset ? el.dataset.gtmId : '';
  if (!id) return;

  (function (w, d, s, l, i) {
    w[l] = w[l] || [];
    w[l].push({ 'gtm.start': new Date().getTime(), event: 'gtm.js' });
    var f = d.getElementsByTagName(s)[0],
      j = d.createElement(s),
      dl = l != 'dataLayer' ? '&l=' + l : '';
    j.async = true;
    j.src = 'https://www.googletagmanager.com/gtm.js?id=' + i + dl;
    f.parentNode.insertBefore(j, f);
  })(window, document, 'script', 'dataLayer', id);
})();
