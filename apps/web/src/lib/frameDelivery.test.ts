import { describe, expect, it } from "vitest";

import {
  chooseDecodedFramesToEvict,
  getCanvasBackingSize,
  getFrameRequestWindow,
  selectFrameDeliveryPolicy,
  type FrameSequenceTier,
} from "./frameDelivery";

const tiers: FrameSequenceTier[] = [
  { format: "jpeg", frames: ["720.jpg"], height: 720, id: "720p", width: 1280 },
  { format: "webp", frames: ["1080.webp"], height: 1080, id: "1080p", width: 1920 },
  { format: "webp", frames: ["1440.webp"], height: 1440, id: "1440p", width: 2560 },
];

function environment(overrides = {}) {
  return {
    deviceMemory: 8,
    devicePixelRatio: 1,
    effectiveType: "4g",
    reducedMotion: false,
    renderedHeight: 900,
    renderedWidth: 1440,
    saveData: false,
    viewportWidth: 1440,
    ...overrides,
  };
}

describe("selectFrameDeliveryPolicy", () => {
  it("keeps phones, reduced-motion users, and data-saving connections on 720p", () => {
    expect(selectFrameDeliveryPolicy(tiers, environment({ viewportWidth: 390 })).tier.id).toBe("720p");
    expect(selectFrameDeliveryPolicy(tiers, environment({ reducedMotion: true })).tier.id).toBe("720p");
    expect(selectFrameDeliveryPolicy(tiers, environment({ saveData: true })).tier.id).toBe("720p");
    expect(selectFrameDeliveryPolicy(tiers, environment({ effectiveType: "3g" })).tier.id).toBe("720p");
  });

  it("uses 1080p for tablets and lower-memory desktops", () => {
    expect(selectFrameDeliveryPolicy(tiers, environment({ viewportWidth: 1024 })).tier.id).toBe("1080p");
    expect(selectFrameDeliveryPolicy(tiers, environment({ deviceMemory: 4, devicePixelRatio: 2 })).tier.id).toBe("1080p");
  });

  it("uses 1440p for a high-DPI desktop without introducing a 4K tier", () => {
    const policy = selectFrameDeliveryPolicy(tiers, environment({ devicePixelRatio: 2 }));

    expect(policy.tier.id).toBe("1440p");
    expect(policy.maxCanvasPixels).toBe(2560 * 1440);
    expect(policy.decodedByteBudget).toBeLessThan(100 * 1024 * 1024);
  });

  it("uses width as well as height when an ultrawide cover needs the 1440p tier", () => {
    const policy = selectFrameDeliveryPolicy(tiers, environment({
      devicePixelRatio: 1,
      renderedHeight: 1080,
      renderedWidth: 2560,
      viewportWidth: 2560,
    }));

    expect(policy.tier.id).toBe("1440p");
  });
});

describe("frame request and memory bounds", () => {
  it("builds a small direction-biased moving window", () => {
    expect(getFrameRequestWindow({ centerIndex: 100, direction: 1, frameCount: 300, radius: 2 })).toEqual([
      100,
      101,
      99,
      102,
      98,
      103,
      104,
    ]);
    expect(getFrameRequestWindow({ centerIndex: 100, direction: 0, frameCount: 300, radius: 0 })).toEqual([100]);
  });

  it("evicts fallbacks and distant frames until the byte budget is met", () => {
    const frameBytes = 2560 * 1440 * 4;
    const evicted = chooseDecodedFramesToEvict({
      budget: frameBytes * 2,
      currentIndex: 10,
      entries: [
        { bytes: frameBytes, fallback: false, index: 10, lastUsed: 5 },
        { bytes: frameBytes, fallback: false, index: 11, lastUsed: 4 },
        { bytes: frameBytes, fallback: true, index: 11, lastUsed: 6 },
        { bytes: frameBytes, fallback: false, index: 2, lastUsed: 1 },
      ],
      targetIndex: 11,
    });

    expect(evicted.map((entry) => [entry.index, entry.fallback])).toEqual([
      [11, true],
      [2, false],
    ]);
  });
});

describe("getCanvasBackingSize", () => {
  it("never allocates beyond the source detail or pixel budget", () => {
    const sourceLimited = getCanvasBackingSize({
      cssHeight: 900,
      cssWidth: 1440,
      devicePixelRatio: 2,
      maxPixels: 2560 * 1440,
      sourceHeight: 1440,
      sourceWidth: 2560,
    });
    const budgetLimited = getCanvasBackingSize({
      cssHeight: 2160,
      cssWidth: 3840,
      devicePixelRatio: 2,
      maxPixels: 2560 * 1440,
      sourceHeight: 3840,
      sourceWidth: 7680,
    });

    expect(sourceLimited).toMatchObject({ height: 1440, width: 2304 });
    expect(budgetLimited.width * budgetLimited.height).toBeLessThanOrEqual(2560 * 1440);
  });
});
