export type HomeJourneyInteractionState =
  | "passing"
  | "centered-awaiting-intent"
  | "locked"
  | "released";

export const HOME_JOURNEY_INPUT_IDLE_MS = 180;
export const HOME_JOURNEY_MAGNET_IDLE_MS = 160;
export const HOME_JOURNEY_MAGNET_DURATION_MS = 220;
export const HOME_JOURNEY_TOUCH_THRESHOLD_PX = 16;
export const HOME_JOURNEY_TOUCH_HORIZONTAL_DOMINANCE = 1.15;

export type HomeJourneyInputDecision = {
  activated: boolean;
  consume: boolean;
  nextState: HomeJourneyInteractionState;
  released: boolean;
};

export function isFreshHomeJourneyGesture(
  timestamp: number,
  previousTimestamp: number | null,
) {
  return (
    previousTimestamp == null ||
    timestamp - previousTimestamp >= HOME_JOURNEY_INPUT_IDLE_MS
  );
}

export function isHorizontalHomeJourneySwipe(deltaX: number, deltaY: number) {
  return (
    Math.abs(deltaX) >= HOME_JOURNEY_TOUCH_THRESHOLD_PX &&
    Math.abs(deltaX) > Math.abs(deltaY) * HOME_JOURNEY_TOUCH_HORIZONTAL_DOMINANCE
  );
}

export function shouldStartHomeJourneyMagnet({
  centerOffset,
  isScrollIdle,
  magnetDistance,
  state,
}: {
  centerOffset: number;
  isScrollIdle: boolean;
  magnetDistance: number;
  state: HomeJourneyInteractionState;
}) {
  return (
    state === "passing" &&
    isScrollIdle &&
    Math.abs(centerOffset) <= magnetDistance
  );
}

export function getHomeJourneyPositionState({
  centerOffset,
  centeredTolerance,
  releaseDistance,
  state,
}: {
  centerOffset: number;
  centeredTolerance: number;
  releaseDistance: number;
  state: HomeJourneyInteractionState;
}): HomeJourneyInteractionState {
  const distanceFromCenter = Math.abs(centerOffset);

  if (state === "locked") return state;
  if (state === "released") {
    return distanceFromCenter >= releaseDistance ? "passing" : state;
  }
  if (state === "centered-awaiting-intent") {
    return distanceFromCenter >= releaseDistance ? "passing" : state;
  }
  return distanceFromCenter <= centeredTolerance
    ? "centered-awaiting-intent"
    : state;
}

export function decideHomeJourneyInput({
  atEnd,
  atStart,
  direction,
  explicitIntent,
  freshGesture,
  state,
}: {
  atEnd: boolean;
  atStart: boolean;
  direction: number;
  explicitIntent: boolean;
  freshGesture: boolean;
  state: HomeJourneyInteractionState;
}): HomeJourneyInputDecision {
  if (direction === 0) {
    return {
      activated: false,
      consume: false,
      nextState: state,
      released: false,
    };
  }

  if (state === "centered-awaiting-intent" && explicitIntent) {
    return {
      activated: true,
      consume: true,
      nextState: "locked",
      released: false,
    };
  }

  if (state !== "locked") {
    return {
      activated: false,
      consume: false,
      nextState: state,
      released: false,
    };
  }

  const isLeavingForward = direction > 0 && atEnd;
  if (freshGesture && isLeavingForward) {
    return {
      activated: false,
      consume: false,
      nextState: "released",
      released: true,
    };
  }

  return {
    activated: false,
    consume: true,
    nextState: "locked",
    released: false,
  };
}
