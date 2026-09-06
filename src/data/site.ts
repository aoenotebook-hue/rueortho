/**
 * Single source of truth for the values that appear across the legal pages.
 *
 * TODO before launch: the domain has not been registered yet. Update `domain`
 * and `contactEmail` here and `site` in astro.config.mjs together — they are
 * the only two places these values live.
 */
export const site = {
  domain: 'easyortho.com',
  contactEmail: 'contact@easyortho.com',
  /** Emergency medical number in Thailand. */
  emergencyNumber: '1669',
} as const;
