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
    expect(page).toContain("**Resolution Contract:**");
    expect(page).toContain("### Standard-Derived Assumptions");
    expect(page).not.toContain("UNRESOLVED");
  });

  it("separates required and optional inputs and filters resources by category", async () => {
    const result = buildOperationalSavingsReview(await loadOperationalSavingsSources());
    const exterior = result.artifacts.get("docs/operational-savings-review/categories/ITC-02.md");
    const vehicle = result.artifacts.get("docs/operational-savings-review/categories/ITC-29.md");

    expect(exterior).toContain("### Required User Inputs");
    expect(exterior).toContain("### Optional Known Details");
    expect(exterior).toContain("Existing Fixture Model, if known");
    expect(exterior).toContain("Electric variable charge");
    expect(exterior).not.toContain("Gas variable charge");
    expect(exterior).not.toContain("Water and sewer variable charge");
    expect(vehicle).toContain("Liquid or vehicle-fuel variable charge");
    expect(vehicle).not.toContain("Water and sewer variable charge");
  });

  it("keeps recognizable resolver context required and exact equipment details optional", async () => {
    const result = buildOperationalSavingsReview(await loadOperationalSavingsSources());
    const product = result.artifacts.get("docs/operational-savings-review/categories/ITC-10.md");
    const fixture = result.artifacts.get("docs/operational-savings-review/categories/ITC-32.md");
    const chp = result.artifacts.get("docs/operational-savings-review/categories/ITC-20.md");

    expect(product).toContain("`energy_star_product_context` - **Required:**");
    expect(product).toContain("`energy_star_exact_product` - **Optional:**");
    expect(fixture).toContain("`fixture_context` - **Required:**");
    expect(fixture).toContain("`fixture_exact_rating` - **Optional:**");
    expect(chp).toContain("`chp_exact_model` - **Optional:**");
    expect(chp).toContain("Linked Opportunity");
  });
});
