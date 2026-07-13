import { describe, expect, it } from "vitest";
import {
  HOME_JOURNEY_INPUT_IDLE_MS,
  decideHomeJourneyInput,
  getHomeJourneyPositionState,
  isFreshHomeJourneyGesture,
  isHorizontalHomeJourneySwipe,
  shouldStartHomeJourneyMagnet,
} from "./homeJourneyInteraction";

describe("homeJourneyInteraction", () => {
  it("lets continuous page scrolling pass without acquiring the slideshow", () => {
    expect(
      decideHomeJourneyInput({
        atEnd: false,
        atStart: true,
        direction: 120,
        explicitIntent: false,
        freshGesture: false,
        state: "passing",
      }),
    ).toEqual({
      activated: false,
      consume: false,
      nextState: "passing",
      released: false,
    });
  });

  it("activates only from the centered intent state", () => {
    expect(
      decideHomeJourneyInput({
        atEnd: false,
        atStart: true,
        direction: 120,
        explicitIntent: true,
        freshGesture: true,
        state: "centered-awaiting-intent",
      }),
    ).toMatchObject({ activated: true, consume: true, nextState: "locked" });
  });

  it("keeps same-burst edge momentum locked, then releases on a fresh gesture", () => {
    const sameBurst = decideHomeJourneyInput({
      atEnd: true,
      atStart: false,
      direction: 90,
      explicitIntent: true,
      freshGesture: false,
      state: "locked",
    });
    const freshGesture = decideHomeJourneyInput({
      atEnd: true,
      atStart: false,
      direction: 90,
      explicitIntent: true,
      freshGesture: true,
      state: "locked",
    });

    expect(sameBurst).toMatchObject({ consume: true, nextState: "locked" });
    expect(freshGesture).toMatchObject({
      consume: false,
      nextState: "released",
      released: true,
    });
  });

  it("keeps backward gestures locked at the first slide", () => {
    expect(
      decideHomeJourneyInput({
        atEnd: false,
        atStart: true,
        direction: -90,
        explicitIntent: true,
        freshGesture: true,
        state: "locked",
      }),
    ).toMatchObject({ consume: true, nextState: "locked", released: false });
  });

  it("uses an idle boundary to identify a new wheel gesture", () => {
    expect(isFreshHomeJourneyGesture(1_000, 1_000 - HOME_JOURNEY_INPUT_IDLE_MS + 1)).toBe(false);
    expect(isFreshHomeJourneyGesture(1_000, 1_000 - HOME_JOURNEY_INPUT_IDLE_MS)).toBe(true);
  });

  it("activates touch only for a deliberate horizontal swipe", () => {
    expect(isHorizontalHomeJourneySwipe(30, 8)).toBe(true);
    expect(isHorizontalHomeJourneySwipe(8, 30)).toBe(false);
    expect(isHorizontalHomeJourneySwipe(10, 2)).toBe(false);
  });

  it("starts the magnet only after scrolling settles inside its entry band", () => {
    expect(
      shouldStartHomeJourneyMagnet({
        centerOffset: 64,
        isScrollIdle: false,
        magnetDistance: 96,
        state: "passing",
      }),
    ).toBe(false);
    expect(
      shouldStartHomeJourneyMagnet({
        centerOffset: 64,
        isScrollIdle: true,
        magnetDistance: 96,
        state: "passing",
      }),
    ).toBe(true);
  });

  it("holds released ownership until the slideshow clears hysteresis", () => {
    expect(
      getHomeJourneyPositionState({
        centerOffset: 40,
        centeredTolerance: 20,
        releaseDistance: 160,
        state: "released",
      }),
    ).toBe("released");
    expect(
      getHomeJourneyPositionState({
        centerOffset: 180,
        centeredTolerance: 20,
        releaseDistance: 160,
        state: "released",
      }),
    ).toBe("passing");
  });
});
