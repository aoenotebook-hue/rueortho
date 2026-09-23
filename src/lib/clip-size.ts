import { readFileSync } from 'node:fs';

/**
 * The pixel size of a demonstration clip, read off the file at build time.
 *
 * The clips come in both shapes — on 2026-09-23, 28 wide (16:9) and 10 tall
 * (9:16) — and a player that assumes 16:9 gets the tall ones wrong: the poster
 * is shrunk inside a short panel, and pressing play grows the box to 75vh with
 * black bars either side, pushing the text below it down the page. Knowing the
 * real shape lets the frame be drawn at that shape before a byte of the clip
 * loads.
 *
 * An MP4 records the display size in each track header (`tkhd`) as two 16.16
 * fixed-point numbers at the end of the box. The audio track's are zero, so the
 * first header with a non-zero width is the picture. No dependency is needed
 * for that, and ffmpeg is deliberately not in the toolchain.
 */
export interface ClipSize {
  width: number;
  height: number;
}

const cache = new Map<string, ClipSize | undefined>();

export function getClipSize(src: string): ClipSize | undefined {
  if (cache.has(src)) return cache.get(src);

  let size: ClipSize | undefined;
  try {
    const bytes = readFileSync(`public${src}`);
    let at = bytes.indexOf('tkhd');
    while (at !== -1 && !size) {
      // Version 1 headers carry 64-bit times, which pushes the size 12 bytes later.
      const offset = bytes[at + 4] === 1 ? 92 : 80;
      const width = bytes.readUInt32BE(at + offset) / 65536;
      const height = bytes.readUInt32BE(at + offset + 4) / 65536;
      if (width > 0 && height > 0) size = { width, height };
      at = bytes.indexOf('tkhd', at + 4);
    }
  } catch {
    size = undefined;
  }

  cache.set(src, size);
  return size;
}

/**
 * The class that draws a box at the clip's shape — `clip-frame-wide` or
 * `clip-frame-tall`, defined in global.css. A class rather than a computed
 * inline style because the CSP refuses `style=""` attributes outright; every
 * clip on the site is exactly 16:9 or 9:16, so two classes cover them all, and
 * an unreadable file falls back to wide, the shape the frame always had.
 */
export function clipFrameClass(size: ClipSize | undefined): string {
  return size && size.height > size.width ? 'clip-frame-tall' : 'clip-frame-wide';
}
