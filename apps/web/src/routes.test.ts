import { describe, expect, it } from "vitest";
import {
  aboutLinks,
  aboutMenuLinks,
  pathForRoute,
  routeFromPath,
  shouldCanonicalizeUnknownHomeFallback,
} from "./routes";

describe("routes", () => {
  it("keeps unknown public paths on the homepage route but marks them for URL replacement", () => {
    expect(routeFromPath("/dfdfd")).toBe("home");
    expect(shouldCanonicalizeUnknownHomeFallback("/dfdfd")).toBe(true);
  });

  it("does not canonicalize known routes or intentional aliases", () => {
    expect(shouldCanonicalizeUnknownHomeFallback("/")).toBe(false);
    expect(shouldCanonicalizeUnknownHomeFallback("/admin")).toBe(false);
    expect(shouldCanonicalizeUnknownHomeFallback("/for-businesses")).toBe(false);
    expect(shouldCanonicalizeUnknownHomeFallback("/get-started")).toBe(false);
  });

  it("keeps the About navigation focused on Mission and Team", () => {
    expect(aboutLinks).toEqual([
      { label: "Mission", route: "about-mission" },
      { label: "Team", route: "about-team" },
    ]);
    expect(routeFromPath("/about")).toBe("about-mission");
    expect(routeFromPath("/about/mission")).toBe("about-mission");
    expect(pathForRoute("about")).toBe("/about/mission");
  });

  it("keeps Contact out of the About menu", () => {
    expect(aboutMenuLinks).toEqual([
      { label: "Mission", route: "about-mission" },
      { label: "Team", route: "about-team" },
    ]);
  });

  it("preserves server-handled API and auth callback paths", () => {
    expect(shouldCanonicalizeUnknownHomeFallback("/api")).toBe(false);
    expect(shouldCanonicalizeUnknownHomeFallback("/api/auth/google/callback")).toBe(false);
  });

  it("recognizes the canonical tasks report path", () => {
    expect(routeFromPath("/tasks/reports")).toBe("tasks-report");
    expect(routeFromPath("/tasks/reports/example-task")).toBe("tasks-report");
  });
});
