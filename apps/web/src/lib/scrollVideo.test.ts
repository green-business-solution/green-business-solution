import { describe, expect, it } from "vitest";

import {
  getScrollMediaMode,
  reduceScrollVideoState,
  scrollProgressToVideoTime,
  selectScrollVideoVariant,
  shouldBeginScrollVideoBuffering,
  type ScrollVideoAsset,
} from "./scrollVideo";

const asset: ScrollVideoAsset = {
  desktop: {
    height: 720,
    id: "desktop",
    poster: "/media/poster.jpg",
    src: "/media/desktop.mp4",
    width: 1280,
  },
  framesPerSecond: 24,
  id: "test",
  mobile: {
    height: 480,
    id: "mobile",
    poster: "/media/poster.jpg",
    src: "/media/mobile.mp4",
    width: 854,
  },
};

describe("scrollProgressToVideoTime", () => {
  it("maps normalized scroll progress across the first and last decodable frames", () => {
    expect(scrollProgressToVideoTime(0, 10.0416667, 24)).toBe(0);
    expect(scrollProgressToVideoTime(0.5, 10.0416667, 24)).toBeCloseTo(5, 6);
    expect(scrollProgressToVideoTime(1, 10.0416667, 24)).toBeCloseTo(10, 6);
  });

  it("clamps overscroll and handles media without a usable duration", () => {
    expect(scrollProgressToVideoTime(-1, 5.0416667, 24)).toBe(0);
    expect(scrollProgressToVideoTime(2, 5.0416667, 24)).toBeCloseTo(5, 6);
    expect(scrollProgressToVideoTime(0.5, Number.NaN, 24)).toBe(0);
  });
});

describe("selectScrollVideoVariant", () => {
  it("uses 720p on desktop and the smaller asset on mobile or constrained connections", () => {
    expect(selectScrollVideoVariant(asset, {
      effectiveType: "4g",
      saveData: false,
      viewportWidth: 1440,
    }).id).toBe("desktop");
    expect(selectScrollVideoVariant(asset, {
      effectiveType: "4g",
      saveData: false,
      viewportWidth: 390,
    }).id).toBe("mobile");
    expect(selectScrollVideoVariant(asset, {
      effectiveType: "4g",
      saveData: true,
      viewportWidth: 1440,
    }).id).toBe("mobile");
    expect(selectScrollVideoVariant(asset, {
      effectiveType: "3g",
      saveData: false,
      viewportWidth: 1440,
    }).id).toBe("mobile");
  });
});

describe("scroll-video preference and fallback behavior", () => {
  it("buffers near the viewport normally, but waits until visible for data saver", () => {
    const base = {
      documentVisible: true,
      isNearViewport: true,
      isVisible: false,
      reducedMotion: false,
      saveData: false,
    };

    expect(shouldBeginScrollVideoBuffering(base)).toBe(true);
    expect(shouldBeginScrollVideoBuffering({ ...base, saveData: true })).toBe(false);
    expect(shouldBeginScrollVideoBuffering({ ...base, isVisible: true, saveData: true })).toBe(true);
    expect(shouldBeginScrollVideoBuffering({ ...base, reducedMotion: true })).toBe(false);
    expect(shouldBeginScrollVideoBuffering({ ...base, documentVisible: false })).toBe(false);
  });

  it("keeps reduced-motion users on a poster and makes video failures fall back to JPEGs", () => {
    const initial = { failed: false, reducedMotion: false };
    const reduced = reduceScrollVideoState(initial, { reducedMotion: true, type: "preference" });
    const restored = reduceScrollVideoState(reduced, { reducedMotion: false, type: "preference" });
    const failed = reduceScrollVideoState(restored, { type: "failure" });

    expect(getScrollMediaMode(initial)).toBe("video");
    expect(getScrollMediaMode(reduced)).toBe("poster");
    expect(getScrollMediaMode(restored)).toBe("video");
    expect(getScrollMediaMode(failed)).toBe("jpeg-fallback");
    expect(getScrollMediaMode(reduceScrollVideoState(failed, {
      reducedMotion: true,
      type: "preference",
    }))).toBe("jpeg-fallback");
  });
});
