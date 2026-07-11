import { describe, expect, it } from "vitest";
import {
  homeJourneyFinalFrame,
  homeJourneyFirstFrame,
  homeJourneyFrameCount,
  homeJourneyFrames
} from "./homeJourneyFrames";

describe("homeJourneyFrames", () => {
  it("builds the complete zero-padded frame sequence in numeric order", () => {
    expect(homeJourneyFrameCount).toBe(300);
    expect(homeJourneyFrames).toHaveLength(homeJourneyFrameCount);
    expect(new Set(homeJourneyFrames).size).toBe(homeJourneyFrameCount);
    expect(homeJourneyFirstFrame).toBe("/how-it-works/scroll-frames/ezgif-frame-001.jpg");
    expect(homeJourneyFinalFrame).toBe("/how-it-works/scroll-frames/ezgif-frame-300.jpg");

    homeJourneyFrames.forEach((frame, index) => {
      expect(frame).toBe(`/how-it-works/scroll-frames/ezgif-frame-${String(index + 1).padStart(3, "0")}.jpg`);
    });
  });
});
