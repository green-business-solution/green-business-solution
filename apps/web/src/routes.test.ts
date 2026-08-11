import { describe, expect, it } from "vitest";
import { pathForRoute, routeFromPath, shouldCanonicalizeUnknownHomeFallback } from "./routes";

describe("routes", () => {
  it("keeps unknown public paths on the homepage route but marks them for URL replacement", () => {
    expect(routeFromPath("/dfdfd")).toBe("home");
    expect(shouldCanonicalizeUnknownHomeFallback("/dfdfd")).toBe(true);
  });

  it("does not canonicalize known routes or intentional aliases", () => {
    expect(shouldCanonicalizeUnknownHomeFallback("/")).toBe(false);
    expect(shouldCanonicalizeUnknownHomeFallback("/pricing")).toBe(false);
    expect(shouldCanonicalizeUnknownHomeFallback("/admin")).toBe(false);
    expect(shouldCanonicalizeUnknownHomeFallback("/for-businesses")).toBe(false);
    expect(shouldCanonicalizeUnknownHomeFallback("/get-started")).toBe(false);
  });

  it("routes the standalone pricing page", () => {
    expect(routeFromPath("/pricing")).toBe("pricing");
    expect(pathForRoute("pricing")).toBe("/pricing");
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
