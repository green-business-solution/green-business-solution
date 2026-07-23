import { describe, expect, it } from "vitest";

import {
  buildOperationalSavingsReview,
  loadOperationalSavingsSources
} from "./generate-operational-savings-review-pages.mjs";

describe("generate-operational-savings-review-pages", () => {
  it("builds 54 deterministic Information Cards plus one simple index", async () => {
    const sources = await loadOperationalSavingsSources();
    const first = buildOperationalSavingsReview(sources);
    const second = buildOperationalSavingsReview(sources);

    expect(first.errors).toEqual([]);
    expect(first.report.categoryPages).toBe(54);
    expect(first.report.mappedRetrofits).toBe(92);
    expect(first.report.visibleStandardProcesses).toBe(92);
    expect(first.report.sourceLinksRendered).toBe(272);
    expect(first.report.visibleUserLeaves).toBe(186);
    expect(first.artifacts.size).toBe(56);
    expect([...first.artifacts]).toEqual([...second.artifacts]);
  });

  it("renders exactly one approved Information Card structure on every category page", async () => {
    const result = buildOperationalSavingsReview(await loadOperationalSavingsSources());
    const banned = [
      "GENERATED REVIEW VIEW",
      "Human Review Snapshot",
      "Review Status",
      "Scenario Readiness",
      "Formula-Term Evidence",
      "Source-Role Evidence",
      "Default-Path Proof",
      "Input Workflow",
      "Human Review Decisions"
    ];

    for (const [path, page] of result.artifacts) {
      if (!path.includes("/categories/")) continue;
      expect(page).toMatch(/^# Information Card — .+\n\n/);
      expect(page.match(/^# /gm)).toHaveLength(1);
      expect(page).not.toMatch(/^##+ /m);
      expect(page.match(/```text\n/g)).toHaveLength(3);
      expect(page).toContain("**Retrofits included:**");
      expect(page).toContain("**Overview:**");
      expect(page).toContain("**Broader Formula**");
      expect(page).toContain("**Expanded Formula**");
      expect(page).toContain("**Information Tree**");
      for (const value of banned) expect(page).not.toContain(value);
    }
  });

  it("uses the approved ITC-02 routing and keeps the simple electricity rate Bill-derived", async () => {
    const result = buildOperationalSavingsReview(await loadOperationalSavingsSources());
    const page = result.artifacts.get("docs/operational-savings-review/categories/ITC-02.md");

    expect(page).not.toContain("Existing Fixture Wattage Estimate");
    expect(page).toContain("Existing Nameplate, Photometric Report, or Field Measurement (User)");
    expect(page).toContain("No Existing Wattage Value Without Documentation or Measurement (Derived)");
    expect(page).toContain("Linked Opportunity names an exact replacement product");
    expect(page).toContain("Standard 1.1 — Exact New Fixture Wattage Lookup");
    expect(page).toContain("Linked Opportunity specifies requirements but no exact product");
    expect(page).toContain("Standard 1.2 — Requirement-Based New Fixture Wattage Resolution");
    expect(page).toContain("Standard 2.1 — Fixed-Schedule Lighting Hours");
    expect(page).toContain("Standard 2.2 — Daylight-Based Lighting Hours");
    expect(page).toContain("Standard 3.1 — Lighting-Replacement Calculation");
    expect(page).toContain("Avoidable Electricity Rate (Derived)");
    expect(page).not.toMatch(/Standard [^\n]*Bill-Derived Electricity Rate/);
  });

  it("keeps ITC-29 recognizable while preserving the verified exact-model proof", async () => {
    const result = buildOperationalSavingsReview(await loadOperationalSavingsSources());
    const page = result.artifacts.get("docs/operational-savings-review/categories/ITC-29.md");

    expect(page).toContain("Existing Vehicle Make and Model (User)");
    expect(page).toContain("Approximate Model Year (User)");
    expect(page).toContain("Proposed Vehicle Make and Model (Linked Opportunity)");
    expect(page).toContain("Version or Drivetrain Details");
    expect(page).toContain("$1,617 per year");
    expect(page).not.toMatch(/\b(?:comb08|combE|FuelEconomy\.gov ID)\b/);
  });

  it("routes exact-product and requirements-only opportunities through distinct local processes", async () => {
    const result = buildOperationalSavingsReview(await loadOperationalSavingsSources());
    const certifiedProduct = result.artifacts.get("docs/operational-savings-review/categories/ITC-52.md");
    const charger = result.artifacts.get("docs/operational-savings-review/categories/ITC-27.md");
    const fixture = result.artifacts.get("docs/operational-savings-review/categories/ITC-32.md");

    for (const page of [certifiedProduct, charger, fixture]) {
      expect(page).toMatch(/Linked Opportunity names an exact/);
      expect(page).toMatch(/Linked Opportunity specifies .*requirements but no exact product/);
      expect(page).toMatch(/Standard 1\.\d+ — Exact/);
      expect(page).toMatch(/Standard 1\.\d+ — Requirement-Based/);
    }
    expect(charger).not.toContain("Opportunity Equipment or Performance Requirements (Linked Opportunity)");
    expect(charger).not.toContain("Charger Class or Intended Application (Linked Opportunity)");
    expect(charger).not.toContain("Rated Power or Capacity (Linked Opportunity)");
  });

  it("places proposed design specifications on linked-opportunity paths connected to a process", async () => {
    const result = buildOperationalSavingsReview(await loadOperationalSavingsSources());
    const solar = result.artifacts.get("docs/operational-savings-review/categories/ITC-17.md");
    const storage = result.artifacts.get("docs/operational-savings-review/categories/ITC-23.md");
    const irrigation = result.artifacts.get("docs/operational-savings-review/categories/ITC-34.md");

    expect(solar).toContain("DC capacity (Linked Opportunity)");
    expect(solar).toContain("Standard 1.1 — PVWatts Solar Production Calculation");
    expect(storage).toContain("Usable-energy capacity (Linked Opportunity)");
    expect(storage).toContain("Standard 1.1 — Battery Storage Dispatch Interval Bill Calculation");
    expect(irrigation).toContain("Irrigation efficiency, if known (Linked Opportunity)");
    expect(irrigation).toContain("Standard 1.1 — Landscape Water Budget Calculation");
  });

  it("covers every visible terminal User leaf with the closed realism contract", async () => {
    const result = buildOperationalSavingsReview(await loadOperationalSavingsSources());
    const contract = JSON.parse(
      result.artifacts.get("docs/operational-savings-user-input-realism.json")
    );

    expect(contract.user_leaf_count).toBe(186);
    expect(contract.inputs).toHaveLength(result.report.visibleUserLeaves);
    expect(contract.inputs.filter((entry) => entry.knowledge_likelihood === "UNLIKELY_KNOWN")).toEqual([]);
    expect(
      contract.inputs
        .filter((entry) => entry.knowledge_likelihood === "MAY_KNOW")
        .every((entry) => entry.alternate_source !== "NONE")
    ).toBe(true);
    expect(contract.inputs.every((entry) => entry.recognizable_to_ordinary_user)).toBe(true);
  });

  it("keeps interval utility artifacts and tariff rules out of ordinary User ownership", async () => {
    const result = buildOperationalSavingsReview(await loadOperationalSavingsSources());
    for (const id of ["16", "17", "19", "23", "24", "25", "26", "27", "28", "31"]) {
      const page = result.artifacts.get(`docs/operational-savings-review/categories/ITC-${id}.md`);
      expect(page).not.toMatch(/(?:Interval Utility Data|Tariff Calendar|Ratchet Rules) \(User\)/i);
      if (page.includes("Timestamped Interval Utility Data")) {
        expect(page).toContain("Timestamped Interval Utility Data (Bill)");
        expect(page).toContain("No Interval Dollar Estimate Until Tariff Rules Are Resolved (Derived)");
      }
    }
  });

  it("uses realistic ownership and honest no-estimate behavior in the targeted cards", async () => {
    const result = buildOperationalSavingsReview(await loadOperationalSavingsSources());
    const charging = result.artifacts.get("docs/operational-savings-review/categories/ITC-27.md");
    const flow = result.artifacts.get("docs/operational-savings-review/categories/ITC-32.md");
    const flush = result.artifacts.get("docs/operational-savings-review/categories/ITC-33.md");
    const variableSpeed = result.artifacts.get("docs/operational-savings-review/categories/ITC-39.md");
    const dishwasher = result.artifacts.get("docs/operational-savings-review/categories/ITC-52.md");
    const backup = result.artifacts.get("docs/operational-savings-review/categories/ITC-54.md");

    expect(charging).not.toMatch(/distribution \(User\)/i);
    expect(charging).not.toMatch(/Session-(?:arrival|duration) distribution/i);
    expect(charging).toContain("Documented Interval Charging Profile from Site Study or Contractor Design (Linked Opportunity)");
    expect(charging).toContain("No Utilization Estimate Without a Site Study or Contractor Design (Derived)");
    expect(flow).not.toMatch(/Annual Uses per Fixture \(User\)|Hot-Water Fraction \(User\)|Water-Heater Efficiency \(User\)/i);
    expect(flow).toContain("Existing Rated Flow from Label, Specification, or Measurement (User)");
    expect(flush).not.toMatch(/Annual Flushes per Fixture \(User\)|Existing Rated Flush Volume \(User\)/i);
    expect(flush).toContain("Existing Gallons per Flush from Label, Specification, or Measurement (User)");
    expect(variableSpeed).not.toMatch(/Load-Bin .* \(User\)|Annual Hours by Bin \(User\)/i);
    expect(variableSpeed).toContain("Pumping System Assessment Tool for pumps or Fan System Assessment Tool for fans");
    expect(dishwasher).not.toMatch(/Purchased Water-Heating Input per Certified Rack \(User\)/i);
    expect(dishwasher).toContain("Do Not Convert Gallons per Rack to Gallons per Hour (Derived)");
    expect(backup).not.toMatch(/Test Fuel Use .* \(User\)|Standby Input .* \(User\)/i);
    expect(backup).toContain("Blocked Until Routine-Use Documentation Is Available (Derived)");
  });

  it("makes process content source-specific and exact-product routing distinct", async () => {
    const result = buildOperationalSavingsReview(await loadOperationalSavingsSources());

    for (const category of result.categoryReviews) {
      for (const process of category.informationCard.processes) {
        expect(process.evidenceState).toMatch(
          /^(?:EXECUTABLE_PROOF_PRESENT|METHOD_VERIFIED_IMPLEMENTATION_PENDING)$/
        );
        expect(process.howToUse.join(" ")).not.toMatch(
          /^(?:Validate these inputs|Reject missing, ambiguous|Return the value|Store provenance)/i
        );
      }
      const exact = category.informationCard.processes.find((process) => /^exact-/.test(process.key));
      const requirement = category.informationCard.processes.find((process) => /^requirement-/.test(process.key));
      if (!exact || !requirement) continue;
      expect(requirement.howToUse).not.toEqual(exact.howToUse);
      expect(requirement.automation.automationMethod).not.toEqual(exact.automation.automationMethod);
      expect(requirement.validation).not.toEqual(exact.validation);
    }
  });

  it("keeps each multi-Standard process limited to its own inputs and connected outputs", async () => {
    const result = buildOperationalSavingsReview(await loadOperationalSavingsSources());
    const solarStorage = result.categoryReviews.find((category) => category.id === "ITC-24");
    const microgrid = result.categoryReviews.find((category) => category.id === "ITC-26");
    const fleet = result.categoryReviews.find((category) => category.id === "ITC-28");
    const recirculation = result.categoryReviews.find((category) => category.id === "ITC-09");

    const pv = solarStorage.informationCard.processes.find((process) => process.canonicalStandardIds.includes("STD-PVWATTS-V8"));
    const storageDispatch = solarStorage.informationCard.processes.find((process) => process.canonicalStandardIds.includes("STD-REOPT-LOCAL-DISPATCH"));
    expect(pv.lookupInputs).toContain("DC capacity");
    expect(pv.lookupInputs).not.toContain("Power capacity");
    expect(storageDispatch.lookupInputs).toContain("Timestamped interval utility data from the uploaded utility artifact");
    expect(storageDispatch.lookupInputs).toContain("Interval solar generation from the connected PVWatts process");

    const microgridInputSets = microgrid.informationCard.processes.map((process) => process.lookupInputs);
    expect(new Set(microgridInputSets.map((inputs) => JSON.stringify(inputs))).size).toBe(
      microgridInputSets.length
    );
    expect(
      microgrid.informationCard.processes
        .find((process) => process.canonicalStandardIds.includes("STD-REOPT-LOCAL-DISPATCH"))
        .lookupInputs
    ).toContain(
      "Interval generation and resource profiles from the connected PVWatts, wind, and onsite-generation processes"
    );

    const vehicle = fleet.informationCard.processes.find((process) => process.canonicalStandardIds.includes("STD-FUELECONOMY-VEHICLES"));
    const fleetDispatch = fleet.informationCard.processes.find((process) => process.canonicalStandardIds.includes("STD-REOPT-LOCAL-DISPATCH"));
    expect(vehicle.lookupInputs).not.toContain("Annual fleet miles");
    expect(fleetDispatch.lookupInputs).toContain("Vehicle-arrival schedule from the fleet study or contractor charging design");
    expect(fleetDispatch.lookupInputs).toContain("Resolved vehicle electricity intensity from the connected vehicle process");

    const schedule = recirculation.informationCard.processes.find((process) => process.canonicalStandardIds.includes("STD-OPERATING-SCHEDULE"));
    const measur = recirculation.informationCard.processes.find((process) => process.canonicalStandardIds.includes("STD-DOE-MEASUR"));
    expect(schedule.lookupInputs).toContain("Recognizable Business, Shift, Seasonal, or Usage Pattern");
    expect(schedule.lookupInputs).not.toContain("Pump Nameplate or Measured Input");
    expect(measur.lookupInputs).toContain("Annual operating hours from the connected schedule process");
  });

  it("matches every visible tree process to exactly one complete section", async () => {
    const result = buildOperationalSavingsReview(await loadOperationalSavingsSources());

    for (const [path, page] of result.artifacts) {
      if (!path.includes("/categories/")) continue;
      const tree = page.match(/\*\*Information Tree\*\*\n\n```text\n([\s\S]*?)\n```/)?.[1] || "";
      const references = [...tree.matchAll(/Standard ([1-9]\d*\.[1-9]\d*) — ([^\n]+)/g)]
        .map((match) => `${match[1]}\u0000${match[2].trim()}`)
        .filter((value, index, values) => values.indexOf(value) === index);
      const sections = [...page.matchAll(/^\*\*■ Standard ([1-9]\d*\.[1-9]\d*) — ([^*\n]+)\*\*$/gm)]
        .map((match) => `${match[1]}\u0000${match[2].trim()}`);

      expect(sections).toEqual(references);
      for (const marker of [
        "**Purpose:**",
        "**Source:**",
        "**Lookup Inputs:**",
        "**Value Needed:**",
        "**How to Use:**",
        "**Automation:**",
        "**Selected Strategy:**",
        "**Automation Method:**",
        "**Difficulty:**",
        "**Validation:**"
      ]) {
        expect((page.match(new RegExp(marker.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "g")) || []).length)
          .toBe(sections.length);
      }
    }
  });

  it("shows visible direct source URLs without leaking canonical audit identifiers", async () => {
    const result = buildOperationalSavingsReview(await loadOperationalSavingsSources());

    for (const [path, page] of result.artifacts) {
      if (!path.includes("/categories/")) continue;
      const processCount = (page.match(/^\*\*■ Standard /gm) || []).length;
      const sourceUrlCount = (page.match(/\[https:\/\/[^\]]+\]\(https:\/\/[^)]+\)/g) || []).length;
      expect(sourceUrlCount).toBeGreaterThanOrEqual(processCount);
      const withoutUrls = page.replace(/\[[^\]]+\]\(https:\/\/[^)]+\)/g, "");
      expect(withoutUrls).not.toMatch(
        /\b(?:STD-[A-Z0-9-]+|BR-[A-Z0-9-]+|E-[A-Z][A-Z0-9-]+|comb08|combE|unit_id|evidence_id)\b/
      );
      expect(withoutUrls).not.toMatch(
        /no current canonical|bill-dictionary|current bill parser|utilityExtractedValues|schema key/i
      );
      expect(withoutUrls).not.toContain("{{");
    }
  });

  it("keeps the zero-direct-savings boundary on ITC-15", async () => {
    const result = buildOperationalSavingsReview(await loadOperationalSavingsSources());
    const page = result.artifacts.get("docs/operational-savings-review/categories/ITC-15.md");

    expect(page).toContain("Annual Direct Operational Savings = $0");
    expect(page).toContain("Annual Direct Operational Savings: $0");
    expect(page).not.toContain("**■ Standard");
    expect(page).not.toMatch(/incentive|project cost/i);
  });

  it("uses a closed Information Card schema that matches the normalized registry fields", async () => {
    const sources = await loadOperationalSavingsSources();

    expect(sources.informationCardSchema.additionalProperties).toBe(false);
    expect(sources.informationCardSchema.required).toEqual([
      "categoryId",
      "title",
      "retrofitNames",
      "overview",
      "broaderFormula",
      "expandedFormula",
      "tree",
      "processes"
    ]);
    expect(sources.informationCardSchema.$defs.process.additionalProperties).toBe(false);
    expect(sources.informationCardSchema.$defs.treeNode.additionalProperties).toBe(false);
  });

  it("renders the index as only an explanation and ordered ITC-01 through ITC-54 links", async () => {
    const result = buildOperationalSavingsReview(await loadOperationalSavingsSources());
    const index = result.artifacts.get("docs/operational-savings-review/README.md");
    const links = [...index.matchAll(/^- \[(ITC-\d{2}) - [^\]]+\]\(\.\/categories\/ITC-\d{2}\.md\)$/gm)];

    expect(links.map((match) => match[1])).toEqual(
      Array.from({ length: 54 }, (_, index) => `ITC-${String(index + 1).padStart(2, "0")}`)
    );
    expect(index).not.toContain("|");
    expect(index).not.toMatch(/\b(?:Ready|Draft|Blocked|evidence count|input count)\b/i);
  });
});
