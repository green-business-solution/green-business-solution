# Homepage Scroll Media

RetroFi's two homepage scroll animations use short-GOP H.264 MP4 files as the
primary visual source and retain their original JPEG sequences as a temporary
runtime fallback.

The committed delivery version is
`public/home-scroll-media/v20260713-g4-c914aa0e9110/`. Its
[`manifest.json`](../public/home-scroll-media/v20260713-g4-c914aa0e9110/manifest.json)
pins source hashes, encoder settings, byte sizes, frame counts, durations, and
output hashes.

## Assets

Both sources are progressive 1280×720, 24 fps H.264 video without audio. The
desktop outputs preserve 720p. Mobile outputs are 854×480 and keep the same
16:9 composition and timeline.

| Animation | Desktop | Mobile | Duration | Frames |
| --- | ---: | ---: | ---: | ---: |
| Hero | 4,048,335 bytes | 2,156,048 bytes | 5.041667 s | 121 |
| Forest | 9,824,442 bytes | 5,311,024 bytes | 10.041667 s | 241 |

The hero and forest start posters are decoded from timestamp `0` of their final
desktop files. The forest reduced-motion poster is decoded from timestamp
`10.000000`, matching the former final-JPEG behavior.

The JPEG fallbacks remain:

- Hero: 26 frames in `public/scanner-scroll/frames/`.
- Forest: 300 frames in `public/how-it-works/scroll-frames/`.

Do not delete either sequence until production compatibility and media-error
telemetry justify removing the fallback path.

## Encoding contract

Final videos use libx264 High Profile Level 3.1, CRF 20, the slow preset,
`yuv420p`, square pixels, no audio or metadata, a closed fixed four-frame GOP,
scene-cut keyframes disabled, and a front-loaded `moov` atom through
`faststart`.

Desktop encode pattern:

```sh
ffmpeg -hide_banner -y -i "$INPUT" \
  -map 0:v:0 -an -sn -dn -map_metadata -1 -map_chapters -1 \
  -vf 'scale=1280:720:flags=lanczos,setsar=1' -fps_mode passthrough \
  -c:v libx264 -preset slow -crf 20 -profile:v high -level:v 3.1 \
  -pix_fmt yuv420p -g 4 -keyint_min 4 -sc_threshold 0 \
  -x264-params 'keyint=4:min-keyint=4:scenecut=0:open-gop=0' \
  -movflags +faststart "$OUTPUT"
```

For mobile, replace the scale filter with
`scale=-2:480:flags=lanczos,setsar=1`.

The GOP comparison used the same settings for every candidate:

| Asset | GOP 2 | GOP 4 | GOP 6 | GOP 4 quality |
| --- | ---: | ---: | ---: | ---: |
| Hero 720p | 6,402,639 B | 4,048,335 B | 3,287,555 B | VMAF 94.982, SSIM 0.99147 |
| Forest 720p | 13,068,044 B | 9,824,442 B | 8,562,780 B | VMAF 94.980, SSIM 0.98303 |

GOP 4 places an IDR every `0.166667` seconds. It saves 25–37% versus GOP 2
while limiting a seek to at most three dependent frames. GOP 6 saved only a
further 13–19% while extending that dependency window to five frames, so GOP 4
is the selected balance.

## Runtime delivery contract

`ScrollVideoScanner` keeps the established scanner section, sticky layout,
normalized scroll progress, hero copy thresholds, forest pause/resume mapping,
gradient handoff, and semantic content.

- Server-render a matching poster immediately for each video.
- Preload only the hero start poster from `index.html`.
- Choose the 480p source for viewports at or below 768 px, data saver, or
  3G/slower connections; otherwise choose 720p and lock that choice once loading
  begins.
- Begin normal buffering with a `175%` vertical IntersectionObserver margin.
- On data saver, wait until the animation is actually visible and request only
  metadata before seeking.
- Map progress to `duration - 1/24` so progress `1` selects the last displayable
  frame instead of the end boundary.
- Coalesce `currentTime` assignments through `requestAnimationFrame` and skip
  them while the animation is offscreen or the document is hidden.
- On reduced motion, attach no video source and display the designated static
  poster. Keep the existing collapsed layout and copy visibility rules.
- On unsupported H.264, a media error, or a ten-second visible decode timeout,
  detach the MP4 and activate the existing bounded JPEG/canvas loader at the
  current scroll position.

## Cache and deployment contract

Every URL includes the immutable version directory. Production syncs
`dist/home-scroll-media/` before the root site bundle with:

```text
Cache-Control: public,max-age=31536000,immutable
```

The root short-cache sync excludes `home-scroll-media/*`, and the immutable
sync does not use `--delete`, so open sessions and rollbacks keep resolving an
older version. A changed source or encoder contract requires a new directory;
never replace files inside a published version.

## Review checklist

1. Verify manifest hashes, dimensions, 24 fps timelines, GOP cadence, no audio,
   square pixels, and a front-loaded `moov` atom.
2. Run the focused scroll-video, homepage, cache/deploy, and retained JPEG tests.
3. Run frontend typecheck and a production build; confirm all seven media files
   and the manifest are present in `dist/`.
4. Smoke-test desktop and phone viewports, including rapid forward/backward
   scrolling and the forest 50% pause/resume handoff.
5. Test reduced motion, data saver selection, hidden-tab resume, and forced
   video failure into the JPEG fallback.
6. After deployment, verify `Content-Type`, immutable `Cache-Control`, and a
   `206 Partial Content` response for MP4 range requests before judging an asset
   URL healthy.
