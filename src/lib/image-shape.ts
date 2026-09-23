import type { ImageMetadata } from 'astro';

/**
 * Whether a picture stands taller than it is wide — read without costing a
 * full-size copy of it in the build.
 *
 * An imported image is a Proxy, and reading *any* property off it (`width`
 * included) adds the original file to Astro's "referenced" set, which makes
 * the build emit that untouched original into `dist/_astro/` whether or not a
 * page ever requests it. Measured on 2026-09-23: reading `.width` in `<Figure>`
 * and `<ExerciseCard>` put 89 unrequested originals, 5.7 MB, into the build.
 * The proxy's `clone` is the one read it deliberately does not count, so the
 * shape is taken from a clone.
 *
 * A string path carries no dimensions of its own; pass the ones the author
 * wrote on the component.
 */
export function isPortrait(
  image: ImageMetadata | string | undefined,
  width?: number,
  height?: number,
): boolean {
  if (!image) return false;
  if (typeof image === 'string') return !!(width && height && height > width);
  const plain = (image as ImageMetadata & { clone?: ImageMetadata }).clone ?? image;
  return plain.height > plain.width;
}
