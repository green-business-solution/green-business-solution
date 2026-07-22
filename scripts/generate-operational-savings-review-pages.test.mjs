import { describe, expect, it } from "vitest";

import {
  buildOperationalSavingsReview,
  loadOperationalSavingsSources
} from "./generate-operational-savings-review-pages.mjs";

describe("generate-operational-savings-review-pages", () => {
  it("builds one deterministic standalone artifact per category plus the index", async () => {
    const sources = await loadOperationalSavingsSources();
    const first = buildOperationalSavingsReview(sources);
    const second = buildOperationalSavingsReview(sources);

    expect(first.errors).toEqual([]);
    expect(first.report.categoryPages).toBe(54);
    expect(first.report.mappedRetrofits).toBe(92);
    expect(first.artifacts.size).toBe(55);
    expect([...first.artifacts]).toEqual([...second.artifacts]);
  });

  it("expands every shared branch and embeds complete traced Standard cards", async () => {
    const result = buildOperationalSavingsReview(await loadOperationalSavingsSources());
    const page = result.artifacts.get("docs/operational-savings-review/categories/ITC-24.md");

    expect(page).toContain("Chronological load and tariff [BR-INTERVAL-LOAD-AND-TARIFF]");
    expect(page).not.toMatch(/^[│ ]*[├└]─ BR-[A-Z0-9-]+\s*$/m);
    expect(page).toContain("### ■ STD-PVWATTS-V8 — PVWatts photovoltaic production");
    expect(page).toContain("### ■ STD-REOPT-LOCAL-DISPATCH — REopt interval dispatch and bill optimization");
    expect(page).toContain("**Access, Refresh, Versioning, and Maintenance Requirements:**");
    expect(page).not.toContain("UNRESOLVED");
  });
});
