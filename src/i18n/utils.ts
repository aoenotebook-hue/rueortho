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
