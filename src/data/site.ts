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
   * ⚠️ UNCONFIRMED — the one value on this page that is still not real.
   *
   * This address is a mailbox at `easyortho.com`, a domain the project does not
   * own, so mail sent to it does not reach the author. It is printed on the
   * contact page, twice in the privacy notice (as the data controller's address
   * and as the route for exercising PDPA rights) and once in the editorial
   * policy, so it cannot simply be deleted — a privacy notice with no contact
   * route is worse than one with a wrong address.
   *
   * Nothing in this repository records a working address, and inventing one
   * would be worse still. **The author must supply the mailbox he wants
   * published**; then change this line. Until he does, treat the site as not
   * ready to be announced. See docs/DEPLOY.md.
   */
  contactEmail: 'contact@easyortho.com',
  /** Emergency medical number in Thailand. */
  emergencyNumber: '1669',
} as const;
