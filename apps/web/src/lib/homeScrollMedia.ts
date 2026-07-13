import type { ScrollVideoAsset } from "./scrollVideo";

export const homeScrollMediaVersion = "v20260713-g4-c914aa0e9110";

const HOME_SCROLL_MEDIA_DIRECTORY = `/home-scroll-media/${homeScrollMediaVersion}`;

const heroPoster = `${HOME_SCROLL_MEDIA_DIRECTORY}/hero-poster-720p.jpg`;
const forestPoster = `${HOME_SCROLL_MEDIA_DIRECTORY}/forest-poster-720p.jpg`;
const forestReducedMotionPoster =
  `${HOME_SCROLL_MEDIA_DIRECTORY}/forest-poster-final-720p.jpg`;

export const heroScrollVideo: ScrollVideoAsset = {
  desktop: {
    height: 720,
    id: "desktop",
    poster: heroPoster,
    reducedMotionPoster: heroPoster,
    src: `${HOME_SCROLL_MEDIA_DIRECTORY}/hero-desktop-720p.mp4`,
    width: 1280,
  },
  framesPerSecond: 24,
  id: "hero",
  mobile: {
    height: 480,
    id: "mobile",
    poster: heroPoster,
    reducedMotionPoster: heroPoster,
    src: `${HOME_SCROLL_MEDIA_DIRECTORY}/hero-mobile-480p.mp4`,
    width: 854,
  },
};

export const forestScrollVideo: ScrollVideoAsset = {
  desktop: {
    height: 720,
    id: "desktop",
    poster: forestPoster,
    reducedMotionPoster: forestReducedMotionPoster,
    src: `${HOME_SCROLL_MEDIA_DIRECTORY}/forest-desktop-720p.mp4`,
    width: 1280,
  },
  framesPerSecond: 24,
  id: "forest",
  mobile: {
    height: 480,
    id: "mobile",
    poster: forestPoster,
    reducedMotionPoster: forestReducedMotionPoster,
    src: `${HOME_SCROLL_MEDIA_DIRECTORY}/forest-mobile-480p.mp4`,
    width: 854,
  },
};
