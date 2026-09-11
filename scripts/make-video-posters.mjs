/**
 * Cuts a poster frame out of every clip in `public/media/`.
 *
 * A `<Video>` used to open onto a flat grey panel, so the reader had to take
 * the caption's word for what the clip showed before deciding to press play.
 * A still from the clip itself answers that before the download starts.
 *
 * **ffmpeg is not a dependency of this project.** It is not in the toolchain
 * and it is not in package.json — the posters it produces are committed, so
 * this script only ever runs again if a clip is added or replaced. To run it:
 *
 *     npm i --no-save ffmpeg-static && node scripts/make-video-posters.mjs
 *
 * or with any ffmpeg on PATH. Re-running is safe: a poster that already exists
 * is left alone unless `--force` is passed.
 *
 * The frame is taken at 20% of the duration rather than at 0s. The first frame
 * of these clips is often a fade-in or an empty room; a fifth of the way in the
 * demonstration is under way and the still actually shows the movement.
 */
import { execFileSync } from 'node:child_process';
import { createRequire } from 'node:module';
import { readdirSync, existsSync, statSync } from 'node:fs';
import { join } from 'node:path';

const ROOT = 'public/media';
const force = process.argv.includes('--force');

const ffmpeg = (() => {
  try {
    return createRequire(import.meta.url)('ffmpeg-static');
  } catch {
    return 'ffmpeg';
  }
})();

/** Seconds, read off the container rather than guessed. */
function durationOf(file) {
  // `ffmpeg -i` with no output writes the stream info to stderr and then exits
  // non-zero on purpose ("At least one output file must be specified"), so the
  // text we want arrives on the thrown error rather than as a return value.
  let text = '';
  try {
    text = execFileSync(ffmpeg, ['-hide_banner', '-i', file], {
      encoding: 'utf8',
      stdio: ['ignore', 'ignore', 'pipe'],
    }).toString();
  } catch (error) {
    text = (error.stderr ?? '').toString();
  }
  const m = text.match(/Duration:\s*(\d+):(\d+):([\d.]+)/);
  if (!m) return null;
  return Number(m[1]) * 3600 + Number(m[2]) * 60 + Number(m[3]);
}

let made = 0;
let skipped = 0;

for (const slug of readdirSync(ROOT)) {
  const dir = join(ROOT, slug);
  if (!statSync(dir).isDirectory()) continue;

  for (const name of readdirSync(dir)) {
    if (!name.endsWith('.mp4')) continue;
    const src = join(dir, name);
    const poster = src.replace(/\.mp4$/, '.poster.webp');

    if (existsSync(poster) && !force) {
      skipped += 1;
      continue;
    }

    let at = 1;
    try {
      const seconds = durationOf(src);
      if (seconds) at = Math.max(0.2, seconds * 0.2);
    } catch {
      /* fall back to one second in */
    }

    execFileSync(
      ffmpeg,
      [
        '-hide_banner', '-loglevel', 'error', '-y',
        '-ss', String(at.toFixed(2)),
        '-i', src,
        '-frames:v', '1',
        // 960px wide is twice the widest slot the poster is shown in, so it
        // stays sharp on a 2x screen without shipping the full 1280.
        '-vf', 'scale=960:-2',
        '-c:v', 'libwebp', '-quality', '72',
        poster,
      ],
      { stdio: ['ignore', 'ignore', 'inherit'] },
    );
    made += 1;
    process.stdout.write(`  ${poster.replace('public/', '')}  @${at.toFixed(1)}s\n`);
  }
}

console.log(`\nposters written: ${made}, already present: ${skipped}`);
