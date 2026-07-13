import { describe, expect, it } from "vitest";
import {
  HOME_JOURNEY_GESTURE_IDLE_MS,
  decideHomeJourneyOwnership,
  isFreshHomeJourneyGesture,
} from "./homeJourneyInteraction";

describe("homeJourneyInteraction", () => {
  it("passes input to the page while inactive", () => {
    expect(
      decideHomeJourneyOwnership("inactive", {
        atEnd: false,
        direction: 120,
        freshGesture: true,
        type: "input",
      }),
    ).toEqual({ consume: false, nextState: "inactive", released: false });
  });

  it("activates only from an intentional slideshow surface action", () => {
    expect(
      decideHomeJourneyOwnership("inactive", {
        source: "surface",
        type: "activate",
      }),
    ).toMatchObject({ nextState: "active" });
  });

  it("does not activate when a popup control handles the action", () => {
    expect(
      decideHomeJourneyOwnership("inactive", {
        source: "control",
        type: "activate",
      }),
    ).toEqual({ consume: false, nextState: "inactive", released: false });
  });

  it("releases ownership for an outside click or Escape action", () => {
    expect(
      decideHomeJourneyOwnership("active", { type: "release" }),
    ).toEqual({ consume: false, nextState: "inactive", released: true });
  });

  it("consumes active input before the final slide", () => {
    expect(
      decideHomeJourneyOwnership("active", {
        atEnd: false,
        direction: 120,
        freshGesture: true,
        type: "input",
      }),
    ).toEqual({ consume: true, nextState: "active", released: false });
  });

  it("releases downward input from the final slide to the page", () => {
    expect(
      decideHomeJourneyOwnership("active", {
        atEnd: true,
        direction: 120,
        freshGesture: true,
        type: "input",
      }),
    ).toEqual({ consume: false, nextState: "inactive", released: true });
  });

  it("contains same-burst trackpad momentum at the final slide", () => {
    expect(
      decideHomeJourneyOwnership("active", {
        atEnd: true,
        direction: 40,
        freshGesture: false,
        type: "input",
      }),
    ).toEqual({ consume: true, nextState: "active", released: false });
  });

  it("identifies the next gesture after the idle boundary", () => {
    expect(
      isFreshHomeJourneyGesture(
        1_000,
        1_000 - HOME_JOURNEY_GESTURE_IDLE_MS + 1,
      ),
    ).toBe(false);
    expect(
      isFreshHomeJourneyGesture(
        1_000,
        1_000 - HOME_JOURNEY_GESTURE_IDLE_MS,
      ),
    ).toBe(true);
  });
});
