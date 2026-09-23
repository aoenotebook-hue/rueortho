/**
 * Click-to-load for every demonstration clip on the site.
 *
 * Shared by `<Video>` and `<ExerciseCard video>`: both render a button carrying
 * `data-video`, and this one delegated listener swaps it for a real `<video>`
 * only when the reader asks. It lives in its own module so a page that has a
 * card with a clip but no `<Video>` block still gets it — Astro bundles a
 * component's script only on pages that use that component, and dedupes an
 * imported module, so two importers cost one copy.
 *
 * A facade may carry `data-video-class` to size the player it becomes; an
 * exercise card uses it to keep a portrait clip at the card's picture width
 * instead of letting it run the full column and a screen and a half tall.
 */
document.addEventListener('click', (event) => {
  const facade = (event.target as HTMLElement)?.closest<HTMLElement>('[data-video]');
  if (!facade) return;

  const src = facade.dataset.video;
  if (!src) return;

  const video = document.createElement('video');
  video.src = src;
  // Carried across so the error handler below holds no visible text of its
  // own — the string still comes from ui.ts.
  video.dataset.unavailable = facade.dataset.unavailable ?? '';
  video.controls = true;
  video.autoplay = true;
  video.loop = true;
  // The clips are silent demonstrations; muted also keeps autoplay allowed.
  video.muted = true;
  video.playsInline = true;
  video.preload = 'auto';
  // A portrait clip at full column width would be taller than the screen, so
  // the player is capped at most of the viewport's height and the frame is
  // letterboxed inside it rather than cropped.
  video.className =
    facade.dataset.videoClass ??
    'block max-h-[75vh] w-full rounded-[10px] border border-border bg-black';
  video.setAttribute('aria-label', facade.dataset.title ?? '');

  /*
   * If the file will not play, say so in words rather than leaving a dead
   * black rectangle. The clip is a silent demonstration and the figcaption
   * under it already carries the full description, so the reader loses the
   * picture and nothing else — this panel points them at it.
   *
   * Not theoretical: these files are all H.264, which some browsers cannot
   * decode (Playwright's Chromium among them, which is how this path gets
   * tested).
   */
  video.addEventListener('error', () => {
    const note = document.createElement('p');
    note.className =
      'm-0 rounded-[10px] border border-border bg-ground p-4 text-sm text-muted';
    note.setAttribute('role', 'status');
    // Focusable programmatically but not in the tab order, so that a reader
    // who pressed Enter on the facade is told what happened instead of being
    // dropped back to the top of the document — replacing a focused element
    // with a plain <p> sends focus to <body>.
    note.tabIndex = -1;
    note.textContent = video.dataset.unavailable ?? '';

    const hadFocus = document.activeElement === video;
    video.replaceWith(note);
    if (hadFocus) note.focus();
  });

  facade.replaceWith(video);
  video.focus();
});
