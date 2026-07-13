# Homepage Frame Assets

The homepage journey animation uses the 300 JPEG source frames in
`public/how-it-works/scroll-frames/`. Those files are the best available source
in the repository: they are 1280×720 and no higher-resolution video or render is
currently available.

## Generate and validate

Install dependencies, then run:

```sh
npm run frames:home-journey
npm run frames:home-journey:check
```

The generator:

- requires a complete `ezgif-frame-001.jpg` through `ezgif-frame-300.jpg`
  sequence;
- rejects missing, unreadable, or dimensionally inconsistent frames;
- hashes every source frame and preserves timeline positions for exact repeats;
- uses deterministic Lanczos3 resizing and WebP encoding through Sharp;
- creates 1920×1080 and 2560×1440 delivery tiers;
- strips source metadata by default;
- writes a deterministic manifest with source and output dimensions, paths,
  byte sizes, and SHA-256 hashes;
- writes `apps/web/src/lib/homeJourneyFrameBuild.json`, which locks the runtime
  to the content-versioned output path; and
- validates and reuses an existing output version when neither sources nor
  encoder settings changed.

Generated image files live under
`public/how-it-works/scroll-frames/generated/<content-version>/` and are ignored
by Git. `npm run build` generates or validates them before Vite copies the
public directory. Production deploys cache these content-versioned paths for a
year and retain older versions so an open page can finish loading its current
sequence.

Do not hand-edit generated frames or the runtime build JSON. Change the source
sequence or generator settings and rerun the command.

Current measured output for content version `19a9d9c27e60db62`:

| Assets | Files | Encoded bytes |
| --- | ---: | ---: |
| Original 720p JPEG source/fallback | 300 | 6,625,392 |
| 1080p WebP | 242 unique | 18,269,554 |
| 1440p WebP | 242 unique | 22,432,518 |

The 58 exact source repeats retain their timeline indices but reuse a canonical
high-resolution URL, avoiding duplicate generated files and network transfers.

Two operational limits remain deliberate:

- a clean CI checkout has no ignored generated directory, so its first frontend
  build re-encodes the full version; cache the generated directory in CI if
  build time becomes material; and
- deploys retain old content versions so open sessions and rollbacks remain
  valid. Add a lifecycle or bounded cleanup policy before accumulated versions
  become a meaningful storage cost, while always retaining the current and at
  least one prior version.

## Delivery policy

The original 720p JPEGs remain the lightweight mobile and compatibility tier.
The browser selects one primary tier when each scanner mounts:

| Conditions | Primary tier |
| --- | --- |
| Phone viewport, reduced motion, data saver, or 3G/slower | 720p JPEG |
| Tablet or lower-memory desktop | 1080p WebP |
| High-DPI desktop | 1440p WebP |

The selected primary tier remains locked across resizes so a session does not
download complete copies of multiple tiers. When a high-resolution frame takes
too long or fails, only the matching 720p frame is requested as a temporary
fallback.

The runtime keeps a small direction-aware request window instead of sweeping
the entire sequence. It cancels obsolete image requests, pauses while the
scanner is offscreen or the tab is hidden, and evicts decoded images against a
byte budget. The canvas backing buffer is also capped to the selected source
resolution.

## Quality limits

The generated manifest deliberately labels this pipeline as `resampled`. A
1440p file removes browser-side enlargement and gives the canvas enough pixels
for high-DPI rendering, but it cannot recover detail that was already absent or
damaged by compression in the 720p JPEG.

Do not add a 4K tier from the current source. It would use about 31.6 MiB of
decoded memory per frame without a defensible detail gain. A genuine 4K tier
should start from the original high-resolution render/video or a pinned,
temporally consistent video super-resolution model. Avoid independent
generative edits to individual frames because they can introduce shimmer,
color shifts, and unstable edges during playback.

## Review checklist

After changing sources or delivery settings:

1. Run the generator and its check command.
2. Compare representative early, middle, and late frames at 100% scale.
3. Run frontend tests, typechecking, and the production build.
4. Smoke-test a phone, tablet, 1440p desktop, and high-DPI desktop viewport.
5. Verify reduced motion, data saver or throttled networking, rapid scrolling,
   backward scrolling, hidden-tab resume, console errors, and failed-frame
   fallback.
6. Record source bytes, generated tier bytes, decoded-memory limits, and any
   remaining visual artifacts.
