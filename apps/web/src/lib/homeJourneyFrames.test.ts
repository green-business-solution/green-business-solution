import { describe, expect, it } from "vitest";
import {
  homeJourneyFinalFrame,
  homeJourneyFirstFrame,
  homeJourneyFrameCount,
  homeJourneyFrames,
  homeJourneyFrameTiers,
  homeJourneyFrameVersion
} from "./homeJourneyFrames";

describe("homeJourneyFrames", () => {
  it("builds the complete zero-padded frame sequence in numeric order", () => {
    expect(homeJourneyFrameCount).toBe(300);
    expect(homeJourneyFrameVersion).toMatch(/^[a-f0-9]{16}$/);
    expect(homeJourneyFrames).toHaveLength(homeJourneyFrameCount);
    expect(new Set(homeJourneyFrames).size).toBe(homeJourneyFrameCount);
    expect(homeJourneyFirstFrame).toBe(
      `/how-it-works/scroll-frames/ezgif-frame-001.jpg?v=${homeJourneyFrameVersion}`
    );
    expect(homeJourneyFinalFrame).toBe(
      `/how-it-works/scroll-frames/ezgif-frame-300.jpg?v=${homeJourneyFrameVersion}`
    );

    homeJourneyFrames.forEach((frame, index) => {
      expect(frame).toBe(
        `/how-it-works/scroll-frames/ezgif-frame-${String(index + 1).padStart(3, "0")}.jpg?v=${homeJourneyFrameVersion}`
      );
    });
  });

  it("offers responsive 720p, 1080p, and 1440p delivery without a wasteful 4K tier", () => {
    expect(homeJourneyFrameTiers.map(({ format, height, id, width }) => ({ format, height, id, width }))).toEqual([
      { format: "jpeg", height: 720, id: "720p", width: 1280 },
      { format: "webp", height: 1080, id: "1080p", width: 1920 },
      { format: "webp", height: 1440, id: "1440p", width: 2560 },
    ]);
    expect(homeJourneyFrameTiers.every((tier) => tier.frames.length === homeJourneyFrameCount)).toBe(true);
    expect(homeJourneyFrameTiers[1].frames[1]).toBe(homeJourneyFrameTiers[1].frames[2]);
    expect(homeJourneyFrameTiers.some((tier) => tier.height >= 2160)).toBe(false);
  });
});
