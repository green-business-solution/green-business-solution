import { describe, expect, it } from "vitest";

import {
  forestScrollVideo,
  heroScrollVideo,
  homeScrollMediaVersion,
} from "./homeScrollMedia";

describe("homeScrollMedia", () => {
  it("uses one immutable versioned directory for every video and poster", () => {
    const paths = [
      heroScrollVideo.desktop.src,
      heroScrollVideo.mobile.src,
      heroScrollVideo.desktop.poster,
      forestScrollVideo.desktop.src,
      forestScrollVideo.mobile.src,
      forestScrollVideo.desktop.poster,
      forestScrollVideo.desktop.reducedMotionPoster,
    ];

    expect(homeScrollMediaVersion).toMatch(/^v\d{8}-g[2-6]-[a-f0-9]{12}$/);
    expect(paths.every((path) => path?.startsWith(
      `/home-scroll-media/${homeScrollMediaVersion}/`,
    ))).toBe(true);
    expect(heroScrollVideo.desktop).toMatchObject({ height: 720, width: 1280 });
    expect(heroScrollVideo.mobile).toMatchObject({ height: 480, width: 854 });
    expect(forestScrollVideo.framesPerSecond).toBe(24);
  });

});
