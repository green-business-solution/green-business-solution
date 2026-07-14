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
    expect(homeJourneyFrameVersion).toBe("2026-07-13-720p-optimized");
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

  it("offers only the optimized original 720p delivery tier", () => {
    expect(homeJourneyFrameTiers.map(({ format, height, id, width }) => ({ format, height, id, width }))).toEqual([
      { format: "jpeg", height: 720, id: "720p", width: 1280 },
    ]);
    expect(homeJourneyFrameTiers.every((tier) => tier.frames.length === homeJourneyFrameCount)).toBe(true);
    expect(homeJourneyFrameTiers[0].frames).toBe(homeJourneyFrames);
  });
});
