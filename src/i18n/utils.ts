import { defaultLocale, locales, type Locale } from './ui';

/** Reads the locale from a URL: /en/… is English, everything else is Thai. */
export function getLocaleFromUrl(url: URL): Locale {
  const segment = url.pathname.split('/').filter(Boolean)[0];
  return locales.includes(segment as Locale) ? (segment as Locale) : defaultLocale;
}

/**
 * Turns a locale-less path ('/conditions/knee-osteoarthritis') into a real one.
 * Thai is unprefixed, English is served under /en.
 */
export function localizePath(path: string, locale: Locale): string {
  const clean = '/' + path.replace(/^\/+/, '').replace(/\/+$/, '');
  const base = clean === '/' ? '' : clean;
  return locale === defaultLocale ? base || '/' : `/${locale}${base}`;
}

/** Strips the locale prefix, giving the shared path both languages have in common. */
export function stripLocale(pathname: string): string {
  const parts = pathname.split('/').filter(Boolean);
  if (locales.includes(parts[0] as Locale)) parts.shift();
  return '/' + parts.join('/');
}

/**
 * The page's own path, with the language prefix and any trailing slash gone,
 * so `/en/treatments/surgery/` and `/treatments/surgery` are the same string.
 * `stripLocale` already drops the trailing slash — filtering empty segments
 * does it — so this is only a name for the pair of steps.
 */
export function currentPath(url: URL): string {
  return stripLocale(url.pathname);
}

/**
 * Is `path` the page at `section`, or a page inside it? Both are expected to
 * have come through `currentPath` or `stripLocale` already.
 *
 * The home page is the reason this is not a plain `startsWith`: every path on
 * the site begins with `/`, so treating `/` as a section would mark Home as
 * the section you are in no matter where you are. It is a page, not a
 * container, and only matches itself. The segment boundary matters for the
 * same reason in the other direction: `/treatments-old` must not count as
 * being inside `/treatments`.
 */
export function isWithinSection(path: string, section: string): boolean {
  if (section === '/') return path === '/';
  return path === section || path.startsWith(`${section}/`);
}

/** The same page in the other language. */
export function getAlternatePath(url: URL): { locale: Locale; path: string } {
  const current = getLocaleFromUrl(url);
  const other: Locale = current === 'th' ? 'en' : 'th';
  return { locale: other, path: localizePath(stripLocale(url.pathname), other) };
}

/**
 * Thai dates use the Buddhist era (2026 → 2569), which is what Thai readers
 * expect on a medical page; English dates stay Gregorian.
 */
export function formatDate(date: Date, locale: Locale): string {
  const tag = locale === 'th' ? 'th-TH-u-ca-buddhist' : 'en-GB';
  return new Intl.DateTimeFormat(tag, {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  }).format(date);
}

/** ISO date for <time datetime> and structured data. */
export function isoDate(date: Date): string {
  return date.toISOString().split('T')[0]!;
}

/** True when an article is past the 24-month review cycle in the editorial policy. */
export function isReviewOverdue(lastReviewed: Date, months = 24): boolean {
  const due = new Date(lastReviewed);
  due.setMonth(due.getMonth() + months);
  return due < new Date();
}
