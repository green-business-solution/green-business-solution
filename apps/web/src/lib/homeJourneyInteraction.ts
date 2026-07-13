export type HomeJourneyOwnershipState = "inactive" | "active";

export const HOME_JOURNEY_GESTURE_IDLE_MS = 180;

export type HomeJourneyOwnershipAction =
  | { type: "activate"; source: "surface" | "control" }
  | { type: "release" }
  | {
      type: "input";
      atEnd: boolean;
      direction: number;
      freshGesture: boolean;
    };

export type HomeJourneyOwnershipDecision = {
  consume: boolean;
  nextState: HomeJourneyOwnershipState;
  released: boolean;
};

export function isFreshHomeJourneyGesture(
  timestamp: number,
  previousTimestamp: number | null,
) {
  return (
    previousTimestamp == null ||
    timestamp - previousTimestamp >= HOME_JOURNEY_GESTURE_IDLE_MS
  );
}

export function decideHomeJourneyOwnership(
  state: HomeJourneyOwnershipState,
  action: HomeJourneyOwnershipAction,
): HomeJourneyOwnershipDecision {
  if (action.type === "activate") {
    return {
      consume: false,
      nextState: action.source === "surface" ? "active" : state,
      released: false,
    };
  }

  if (action.type === "release") {
    return {
      consume: false,
      nextState: "inactive",
      released: state === "active",
    };
  }

  if (state !== "active" || action.direction === 0) {
    return {
      consume: false,
      nextState: state,
      released: false,
    };
  }

  if (action.direction > 0 && action.atEnd && action.freshGesture) {
    return {
      consume: false,
      nextState: "inactive",
      released: true,
    };
  }

  return {
    consume: true,
    nextState: "active",
    released: false,
  };
}
