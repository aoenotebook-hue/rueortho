import type { APIContext } from 'astro';

/**
 * Generated rather than static so the sitemap URL always matches `site` in
 * astro.config.mjs — one fewer thing to forget when the domain changes.
 */
export function GET(context: APIContext) {
  const body = [
    'User-agent: *',
    'Allow: /',
    '',
    '# Search results pages carry no content of their own.',
    'Disallow: /search',
    'Disallow: /en/search',
    '',
    `Sitemap: ${new URL('sitemap-index.xml', context.site).href}`,
    '',
  ].join('\n');

  return new Response(body, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
}
