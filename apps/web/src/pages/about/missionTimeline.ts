export type MissionTimelinePoint = {
  scroll: number;
  video: number;
};

export type MissionStageRange = {
  end: number;
  start: number;
};

// Five content beats begin at even 20% intervals. Wide reading ranges are
// separated by short film transitions so each beat has the same scroll rhythm.
export const MISSION_TIMELINE: MissionTimelinePoint[] = [
  { scroll: 0, video: 0 },
  { scroll: 0.18, video: 0.16 },
  { scroll: 0.2, video: 0.25 },
  { scroll: 0.38, video: 0.39 },
  { scroll: 0.4, video: 0.48 },
  { scroll: 0.58, video: 0.62 },
  { scroll: 0.6, video: 0.71 },
  { scroll: 0.78, video: 0.85 },
  { scroll: 0.8, video: 1 },
  { scroll: 1, video: 1 },
];

export const MISSION_STATEMENT_RANGE: MissionStageRange = { start: 0, end: 0.18 };

export const MISSION_STAGE_RANGES: MissionStageRange[] = [
  { start: 0.2, end: 0.38 },
  { start: 0.4, end: 0.58 },
  { start: 0.6, end: 0.78 },
];

export function clampMissionProgress(value: number) {
  return Math.min(1, Math.max(0, value));
}

function smoothstep(edge0: number, edge1: number, value: number) {
  if (edge0 === edge1) return value < edge0 ? 0 : 1;
  const progress = clampMissionProgress((value - edge0) / (edge1 - edge0));
  return progress * progress * (3 - 2 * progress);
}

function getRangeVisibility(scrollProgress: number, range: MissionStageRange) {
  const fadeDistance = Math.min(0.028, (range.end - range.start) * 0.24);
  const enters = smoothstep(range.start, range.start + fadeDistance, scrollProgress);
  const exits = 1 - smoothstep(range.end - fadeDistance, range.end, scrollProgress);
  return clampMissionProgress(enters * exits);
}

export function mapMissionScrollToVideoProgress(scrollProgress: number) {
  const clamped = clampMissionProgress(scrollProgress);

  for (let index = 1; index < MISSION_TIMELINE.length; index += 1) {
    const previous = MISSION_TIMELINE[index - 1];
    const next = MISSION_TIMELINE[index];

    if (clamped <= next.scroll) {
      const localProgress = (clamped - previous.scroll) / (next.scroll - previous.scroll);
      return previous.video + (next.video - previous.video) * localProgress;
    }
  }

  return 1;
}

export function getMissionStageVisibility(scrollProgress: number, stageIndex: number) {
  const range = MISSION_STAGE_RANGES[stageIndex];
  if (!range) return 0;

  return getRangeVisibility(scrollProgress, range);
}

export function getMissionStatementVisibility(scrollProgress: number) {
  const fadeDistance = Math.min(
    0.028,
    (MISSION_STATEMENT_RANGE.end - MISSION_STATEMENT_RANGE.start) * 0.24,
  );
  return 1 - smoothstep(
    MISSION_STATEMENT_RANGE.end - fadeDistance,
    MISSION_STATEMENT_RANGE.end,
    scrollProgress,
  );
}

export function getMissionFinaleVisibility(scrollProgress: number) {
  return smoothstep(0.8, 0.828, scrollProgress);
}
