import { describe, expect, it } from "vitest";
import {
  MISSION_STAGE_RANGES,
  MISSION_STATEMENT_RANGE,
  getMissionFinaleVisibility,
  getMissionStatementVisibility,
  getMissionStageVisibility,
  mapMissionScrollToVideoProgress,
} from "./missionTimeline";

describe("mission timeline", () => {
  it("maps the full native scroll range to the full video", () => {
    expect(mapMissionScrollToVideoProgress(-1)).toBe(0);
    expect(mapMissionScrollToVideoProgress(0)).toBe(0);
    expect(mapMissionScrollToVideoProgress(1)).toBe(1);
    expect(mapMissionScrollToVideoProgress(2)).toBe(1);
  });

  it("advances the video more slowly while a narrative beat is readable", () => {
    const readingAdvance =
      mapMissionScrollToVideoProgress(0.18) - mapMissionScrollToVideoProgress(0);
    const transitionAdvance =
      mapMissionScrollToVideoProgress(0.2) - mapMissionScrollToVideoProgress(0.18);

    expect(readingAdvance / 0.18).toBeLessThan(transitionAdvance / 0.02);
  });

  it("spaces the mission statement, three chapters, and finale at even intervals", () => {
    const starts = [
      MISSION_STATEMENT_RANGE.start,
      ...MISSION_STAGE_RANGES.map((range) => range.start),
      0.8,
    ];

    starts.slice(1).forEach((start, index) => {
      expect(start - starts[index]).toBeCloseTo(0.2);
    });
    expect(getMissionStatementVisibility(0)).toBe(1);
  });

  it("shows one narrative chapter at the center of each reading interval", () => {
    MISSION_STAGE_RANGES.forEach((range, stageIndex) => {
      const midpoint = (range.start + range.end) / 2;
      expect(getMissionStageVisibility(midpoint, stageIndex)).toBe(1);
      MISSION_STAGE_RANGES.forEach((_, otherIndex) => {
        if (otherIndex !== stageIndex) {
          expect(getMissionStageVisibility(midpoint, otherIndex)).toBe(0);
        }
      });
    });
  });

  it("holds the finale after the video reaches its final frame", () => {
    expect(getMissionFinaleVisibility(0.79)).toBe(0);
    expect(getMissionFinaleVisibility(0.84)).toBe(1);
    expect(mapMissionScrollToVideoProgress(0.86)).toBe(1);
  });
});
