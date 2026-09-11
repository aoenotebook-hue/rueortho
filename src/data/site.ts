/**
 * Single source of truth for the site's own address.
 *
 * `origin` is imported by `astro.config.mjs` as well as by the legal pages, so
 * the canonical URLs, `hreflang` alternates, the sitemap, both RSS feeds,
 * `robots.txt`, every QR code and the address printed in the legal text all
 * come from this one line. Changing the domain means editing it here and
 * nowhere else.
 *
 * **The production origin is the Vercel deployment**, which is where the site
 * actually answers today. `easyortho.com` was never registered; leaving it in
 * place told search engines an address that does not resolve. If a custom
 * domain is mapped later, change `origin` here, redeploy, and update the
 * canonical address in Search Console.
 *
 * A branch preview URL (`rueortho-git-<branch>-….vercel.app`) must never go in
 * here: previews come and go, and a canonical pointing at one would send
 * readers and crawlers to a URL that disappears.
 */
const origin = 'https://rueortho.vercel.app';

export const site = {
  origin,
  /** Host only, for the sentence "Easyortho (rueortho.vercel.app)" in the legal pages. */
  domain: new URL(origin).host,
  /**
   * The author's own mailbox, given by him on 2026-09-10 to be published.
   *
   * It is printed on the contact page, twice in the privacy notice — as the
   * data controller's address and as the route for exercising PDPA rights —
   * and once in the editorial policy, so it is a legal identification as much
   * as a way to get in touch. Do not remove it, and do not swap in a different
   * address without asking him: a privacy notice has to name a channel that
   * actually reaches the person responsible for the data.
   *
   * It is deliberately not tied to the site's domain, so mapping a custom
   * domain later does not change it.
   */
  contactEmail: 'sorawut410@gmail.com',
  /** Emergency medical number in Thailand. */
  emergencyNumber: '1669',
  /**
   * Google Search Console ownership token, rendered as
   * `<meta name="google-site-verification">` on every page.
   *
   * Site-wide rather than home-page-only on purpose: Search Console checks the
   * address it was given, and a token that exists on one page only stops
   * working the moment that address changes. Verification is also claimed a
   * second way — `public/googlef9618cb9fa32a0a8.html`, the file Google
   * generated — because two independent proofs mean a redesign of the layout
   * cannot silently unverify the property.
   *
   * The DNS TXT method Search Console also offers is **not available here**:
   * the site answers on a `vercel.app` subdomain and Vercel owns that zone, so
   * no record can be added to it. It becomes possible if a custom domain is
   * ever mapped.
   */
  googleSiteVerification: 'KAS3zSkCkUjQ4RHkUvt0oqLFXuSKWx1eyPd1p4QhDg4',
  /**
   * Google Tag Manager container.
   *
   * Empty string switches the loader and its `<noscript>` frame off everywhere
   * — that is the whole off switch, and it is the only place the id is
   * written. `public/gtm.js` reads it from a `data-` attribute rather than
   * hard-coding it, the same shape the Cloudflare beacon uses.
   *
   * **What the container loads is configured in the GTM console, not here**,
   * and the site's Content-Security-Policy allows no inline script — so a
   * Custom HTML tag added there will be refused by the browser. Built-in tags
   * (the Google tag / GA4 among them) load an external script from
   * googletagmanager.com and work.
   */
  gtmContainerId: 'GTM-M6XH4X2D',
} as const;
