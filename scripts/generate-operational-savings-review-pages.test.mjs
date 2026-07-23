import { describe, expect, it } from "vitest";

import {
  buildOperationalSavingsReview,
  loadOperationalSavingsSources,
  validateInformationCardProjection
} from "./generate-operational-savings-review-pages.mjs";

function validateMutatedCard(result, sources, categoryId, mutate) {
  const category = result.categoryReviews.find(
    (candidate) => candidate.id === categoryId
  );
  const card = structuredClone(category.informationCard);
  mutate(card);
  const errors = [];
  validateInformationCardProjection(
    card,
    category,
    new Map(result.standards.map((standard) => [standard.id, standard])),
    sources.informationCardSchema,
    sources.evidenceManifest,
    errors
  );
  return errors;
}

describe("generate-operational-savings-review-pages", () => {
  it("builds 54 deterministic Information Cards plus one simple index", async () => {
    const sources = await loadOperationalSavingsSources();
    const first = buildOperationalSavingsReview(sources);
    const second = buildOperationalSavingsReview(sources);

    expect(first.errors).toEqual([]);
    expect(first.report.categoryPages).toBe(54);
    expect(first.report.mappedRetrofits).toBe(92);
    expect(first.report.visibleStandardProcesses).toBe(124);
    expect(first.report.sourceLinksRendered).toBe(317);
    expect(first.report.visibleUserLeaves).toBe(141);
    expect(first.report.visibleProjectDocumentLeaves).toBe(155);
    expect(first.report.visibleLinkedOpportunityLeaves).toBe(149);
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
    expect(page).toContain("Existing Nameplate, Photometric Report, or Field Measurement (Project Document)");
    expect(page).toContain("Standard 1.1 — Existing Fixture Wattage Benchmark");
    expect(page).toContain("Linked Opportunity names an exact replacement product");
    expect(page).toContain("Standard 1.2 — Exact New Fixture Wattage Lookup");
    expect(page).toContain("Linked Opportunity specifies requirements but no exact product");
    expect(page).toContain("Standard 1.3 — Requirement-Based New Fixture Wattage Resolution");
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
    expect(storage).toContain("Usable-Energy Capacity (Linked Opportunity)");
    expect(storage).toContain("Contractor or Engineering Battery Design (Project Document)");
    expect(storage).toContain("Standard 1.3 — Battery Storage Dispatch Interval Bill Calculation");
    expect(irrigation).toContain("Irrigation efficiency, if known (Linked Opportunity)");
    expect(irrigation).toContain("Standard 1.1 — Landscape Water Budget Calculation");
  });

  it("covers every visible terminal User leaf with the closed realism contract", async () => {
    const result = buildOperationalSavingsReview(await loadOperationalSavingsSources());
    const contract = JSON.parse(
      result.artifacts.get("docs/operational-savings-user-input-realism.json")
    );

    expect(contract.schema_version).toBe("operational-savings/user-input-realism-v2");
    expect(contract.user_leaf_count).toBe(141);
    expect(contract.inputs).toHaveLength(result.report.visibleUserLeaves);
    expect(contract.inputs.every((entry) =>
      ["USER_MEMORY", "USER_RECOGNIZABLE_ACTIVITY"].includes(entry.decision)
    )).toBe(true);
    expect(contract.inputs.every((entry) =>
      !/a business representative can ordinarily describe this/i.test(entry.reason)
    )).toBe(true);
    expect(contract.inputs.every((entry) =>
      entry.selected_value_method && entry.missing_exact_value_behavior
    )).toBe(true);
    expect(contract.inputs.some((entry) => entry.decision === "UNREVIEWED")).toBe(false);
  });

  it("keeps interval utility artifacts and tariff rules out of ordinary User ownership", async () => {
    const result = buildOperationalSavingsReview(await loadOperationalSavingsSources());
    for (const id of ["16", "17", "19", "23", "24", "25", "26", "27", "28", "31"]) {
      const page = result.artifacts.get(`docs/operational-savings-review/categories/ITC-${id}.md`);
      expect(page).not.toMatch(/(?:Interval Utility Data|Tariff Calendar|Ratchet Rules) \(User\)/i);
      if (page.includes("Timestamped Interval Utility Data")) {
        expect(page).toContain("Timestamped Interval Utility Data (Bill)");
        expect(page).toMatch(/Standard 1\.\d+ — Interval Tariff Resolution/);
      }
    }
  });

  it("uses realistic ownership and a single-value fallback in the targeted cards", async () => {
    const result = buildOperationalSavingsReview(await loadOperationalSavingsSources());
    const charging = result.artifacts.get("docs/operational-savings-review/categories/ITC-27.md");
    const flow = result.artifacts.get("docs/operational-savings-review/categories/ITC-32.md");
    const flush = result.artifacts.get("docs/operational-savings-review/categories/ITC-33.md");
    const variableSpeed = result.artifacts.get("docs/operational-savings-review/categories/ITC-39.md");
    const dishwasher = result.artifacts.get("docs/operational-savings-review/categories/ITC-52.md");
    const backup = result.artifacts.get("docs/operational-savings-review/categories/ITC-54.md");

    expect(charging).not.toMatch(/distribution \(User\)/i);
    expect(charging).not.toMatch(/Session-(?:arrival|duration) distribution/i);
    expect(charging).toContain("Selected Site Daily Delivered Energy from Charging Study or Contractor Design (Project Document)");
    expect(charging).toContain("Standard 1.2 — Site Daily Delivered-Energy Resolution");
    expect(charging).toContain("Standard 1.3 — EVI-Pro Normalized Charging-Shape Resolution");
    expect(flow).not.toMatch(/Annual Uses per Fixture \(User\)|Hot-Water Fraction \(User\)|Water-Heater Efficiency \(User\)/i);
    expect(flow).toContain("Existing Rated Flow from Label, Specification, or Measurement (Project Document)");
    expect(flush).not.toMatch(/Annual Flushes per Fixture \(User\)|Existing Rated Flush Volume \(User\)/i);
    expect(flush).toContain("Existing Gallons per Flush from Label, Specification, or Measurement (Project Document)");
    expect(variableSpeed).not.toMatch(/Load-Bin .* \(User\)|Annual Hours by Bin \(User\)/i);
    expect(variableSpeed).toContain("Standard 1.2 — Pump Variable-Speed Engineering Calculation");
    expect(variableSpeed).toContain("Standard 1.3 — Fan Variable-Speed Engineering Calculation");
    expect(dishwasher).not.toMatch(/Purchased Water-Heating Input per Certified Rack \(User\)/i);
    expect(dishwasher).toContain("Rack Machines Only");
    expect(dishwasher).toContain("Flight or Conveyor Machines Only");
    expect(dishwasher).toContain("Standard 1.6 — Dishwasher Water-Heating Conversion");
    expect(backup).not.toMatch(/Test Fuel Use .* \(User\)|Standby Input .* \(User\)/i);
    expect(backup).toContain("No Defensible Annual Standby Benchmark Retained (Derived)");
    expect(backup).toContain("Standard 1.1 — Exact Backup-Power Routine-Use Input Resolution");
    expect(backup).toContain("Standard 1.2 — FEMA Full-Load Diesel Test-Fuel Calculation");
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
        expect(process.inputBindings.map((binding) => binding.lookupInput)).toEqual(
          process.lookupInputs
        );
        expect(process.inputBindings.every((binding) => binding.use.includes(binding.lookupInput))).toBe(true);
        expect(process.inputBindings.map((binding) => binding.use).join(" ")).not.toMatch(
          /filter the applicable authoritative benchmark or supply the displayed calculation/i
        );
        expect(process.inputBindings.every((binding) =>
          binding.treePath && binding.sourceLabel
        )).toBe(true);
        expect(process.outputBindings.map((binding) => binding.outputName)).toEqual(
          process.valueNeeded
        );
        expect(process.outputBindings.every((binding) =>
          binding.treePath &&
          binding.formulaTerm &&
          binding.outputUnit &&
          binding.outputScope
        )).toBe(true);
        expect(process.selectionPolicy.outputCardinality).toMatch(
          /^ONE_SELECTED_(?:SCALAR|RECORD|PROFILE|INPUT_SET|RESULT_SET)$/
        );
        expect(process.selectionPolicy.fallbackOrder).toEqual([
          "EXACT_MEASURED_OR_DOCUMENTED",
          "EXACT_PRODUCT_OR_PROJECT_SPECIFICATION",
          "EXACT_AUTHORITATIVE_DATABASE_LOOKUP",
          "CONTEXT_MATCHED_AUTHORITATIVE_BENCHMARK",
          "DETERMINISTIC_RETROFI_BENCHMARK"
        ]);
        const populationOutput = ["ONE_SELECTED_SCALAR", "ONE_SELECTED_RECORD"].includes(
          process.selectionPolicy.outputCardinality
        );
        expect([
          "OFFICIAL_RECOMMENDED_OR_TYPICAL_THEN_WEIGHTED_MEDIAN_THEN_MEDIAN",
          "NOT_APPLICABLE_DETERMINISTIC_SELECTION"
        ]).toContain(process.selectionPolicy.multipleRecordRule);
        if (!populationOutput) {
          expect(process.selectionPolicy.multipleRecordRule).toBe(
            "NOT_APPLICABLE_DETERMINISTIC_SELECTION"
          );
        }
        if (/^requirement-/.test(process.key)) {
          expect(process.selectionPolicy.multipleRecordRule).toBe(
            "OFFICIAL_RECOMMENDED_OR_TYPICAL_THEN_WEIGHTED_MEDIAN_THEN_MEDIAN"
          );
        }
        if (/^exact-/.test(process.key)) {
          expect(process.selectionPolicy.multipleRecordRule).toBe(
            "NOT_APPLICABLE_DETERMINISTIC_SELECTION"
          );
        }
        if (!populationOutput) {
          expect(process.selectionPolicy.selectedValueMethod).not.toMatch(/median/i);
        }
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
    const variableSpeed = result.categoryReviews.find((category) => category.id === "ITC-39");

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
    expect(vehicle.selectionPolicy.selectedValueMethod).toMatch(/Fleet DNA|weighted median|ordinary median/i);
    expect(fleetDispatch.lookupInputs).toContain("Vehicle-arrival schedule from the fleet study or contractor charging design");
    expect(fleetDispatch.lookupInputs).toContain("Resolved vehicle electricity intensity from the connected vehicle process");

    const schedule = recirculation.informationCard.processes.find((process) => process.canonicalStandardIds.includes("STD-OPERATING-SCHEDULE"));
    const measur = recirculation.informationCard.processes.find((process) => process.canonicalStandardIds.includes("STD-DOE-MEASUR"));
    expect(schedule.lookupInputs).toContain("Recognizable Business, Shift, Seasonal, or Usage Pattern");
    expect(schedule.lookupInputs).not.toContain("Pump Nameplate or Measured Input");
    expect(measur.lookupInputs).toContain("Annual operating hours from the connected schedule process");

    const pump = variableSpeed.informationCard.processes.find((process) => process.key === "doe_measur_pump");
    const fan = variableSpeed.informationCard.processes.find((process) => process.key === "doe_measur_fan");
    expect(pump.lookupInputs).toContain("Required flow and total dynamic head from a Project Document");
    expect(pump.lookupInputs).not.toContain("Required airflow and pressure rise from a Project Document");
    expect(fan.lookupInputs).toContain("Required airflow and pressure rise from a Project Document");
    expect(fan.lookupInputs).not.toContain("Required flow and total dynamic head from a Project Document");
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
        "**Input Bindings:**",
        "**Output Bindings:**",
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

  it("rejects a process output unit that does not match its formula term", async () => {
    const sources = await loadOperationalSavingsSources();
    const result = buildOperationalSavingsReview(sources);
    const errors = validateMutatedCard(result, sources, "ITC-33", (card) => {
      card.processes
        .find((process) => process.key === "flush_activity")
        .outputBindings[0].outputUnit = "gallons/year";
    });

    expect(errors).toContain(
      "ITC-33 Information Card process Flush Activity Resolution output Total annual flushes across the in-scope fixture group unit gallons/year does not match total_annual_flushes_group unit flushes/year"
    );
  });

  it("rejects a site or project total passed as a per-equipment-unit output", async () => {
    const sources = await loadOperationalSavingsSources();
    const result = buildOperationalSavingsReview(sources);
    const errors = validateMutatedCard(result, sources, "ITC-33", (card) => {
      card.processes
        .find((process) => process.key === "flush_activity")
        .outputBindings[0].outputScope = "PER_EQUIPMENT_UNIT";
    });

    expect(errors.some((error) =>
      error.includes("passes total output") &&
      error.includes("PER_EQUIPMENT_UNIT")
    )).toBe(true);
  });

  it("applies ITC-32 total active minutes exactly once", async () => {
    const result = buildOperationalSavingsReview(
      await loadOperationalSavingsSources()
    );
    const category = result.categoryReviews.find(
      (candidate) => candidate.id === "ITC-32"
    );
    const formula = `${category.primaryFormula}\n${category.supportingFormulas}`;
    const output = category.informationCard.processes
      .find((process) => process.key === "flow_fixture_activity")
      .outputBindings[0];

    expect(formula).toContain(
      "total_annual_active_minutes × (gpm_existing - gpm_proposed)"
    );
    expect(formula).not.toMatch(
      /quantity\s*×\s*total_annual_active_minutes|total_annual_active_minutes\s*×\s*quantity/
    );
    expect(output.outputScope).toBe("PROJECT_TOTAL");
  });

  it("applies ITC-33 total annual flushes exactly once", async () => {
    const result = buildOperationalSavingsReview(
      await loadOperationalSavingsSources()
    );
    const category = result.categoryReviews.find(
      (candidate) => candidate.id === "ITC-33"
    );
    const formula = `${category.primaryFormula}\n${category.supportingFormulas}`;
    const output = category.informationCard.processes
      .find((process) => process.key === "flush_activity")
      .outputBindings[0];

    expect(formula).toContain(
      "total_annual_flushes_group × (gpf_existing - gpf_proposed)"
    );
    expect(formula).not.toMatch(
      /quantity\s*×\s*total_annual_flushes_group|total_annual_flushes_group\s*×\s*quantity/
    );
    expect(output.outputScope).toBe("PROJECT_TOTAL");
  });

  it("keeps rack and flight dishwasher activity and performance units separate", async () => {
    const sources = await loadOperationalSavingsSources();
    const result = buildOperationalSavingsReview(sources);
    const contract = sources.categoryContracts.categories.find(
      (category) => category.category_id === "ITC-52"
    );
    const terms = new Map(
      contract.formula_terms.map((term) => [term.name, term])
    );
    const page = result.artifacts.get(
      "docs/operational-savings-review/categories/ITC-52.md"
    );

    expect(terms.get("annual_racks_per_unit").unit_id).toBe("racks_year");
    expect(terms.get("annual_operating_hours_per_unit").unit_id).toBe(
      "hour_per_year"
    );
    expect(terms.get("water_per_rack_proposed").unit_id).toBe(
      "gallon_per_rack"
    );
    expect(terms.get("water_per_hour_proposed").unit_id).toBe(
      "gallon_per_hour"
    );
    expect(page).toContain("Rack Machines Only");
    expect(page).toContain("Flight or Conveyor Machines Only");
    expect(page).not.toMatch(
      /annual_racks_per_unit[^`\n]*water_per_hour|annual_operating_hours_per_unit[^`\n]*water_per_rack/
    );
  });

  it("connects ITC-52 water-heating conversion to a real process output", async () => {
    const result = buildOperationalSavingsReview(
      await loadOperationalSavingsSources()
    );
    const category = result.categoryReviews.find(
      (candidate) => candidate.id === "ITC-52"
    );
    const process = category.informationCard.processes.find(
      (candidate) => candidate.key === "dishwasher-water-heating-conversion"
    );

    expect(process.canonicalStandardIds).toEqual([
      "STD-DISHWASHER-WATER-HEATING"
    ]);
    expect(process.outputBindings).toEqual([
      expect.objectContaining({
        formulaTerm: "dishwasher_water_heating_result",
        outputUnit: "record set",
        outputScope: "RECORD_SET"
      })
    ]);
    expect(category.informationCard.tree).not.toEqual(
      expect.objectContaining({
        text: "One Selected Water-Heating Conversion from Project Documents or the Context Benchmark (Derived)"
      })
    );
  });

  it("keeps ITC-54 exact and annual benchmark paths mutually exclusive", async () => {
    const result = buildOperationalSavingsReview(
      await loadOperationalSavingsSources()
    );
    const category = result.categoryReviews.find(
      (candidate) => candidate.id === "ITC-54"
    );
    const formula = `${category.primaryFormula}\n${category.supportingFormulas}`;

    expect(formula).toContain(
      "exact_annual_test_fuel = quantity × test_fuel_per_hour × annual_test_hours_per_unit"
    );
    expect(formula).toContain(
      "benchmark_annual_test_fuel = quantity × benchmark_annual_test_fuel_per_unit"
    );
    expect(formula).toContain(
      "selected_annual_test_fuel` is either `exact_annual_test_fuel` or `benchmark_annual_test_fuel"
    );
    expect(formula).not.toMatch(
      /benchmark_annual_test_fuel_per_unit[^`\n]*test_fuel_per_hour/
    );
  });

  it("uses EVI-Pro only for a normalized profile role", async () => {
    const sources = await loadOperationalSavingsSources();
    const result = buildOperationalSavingsReview(sources);
    const category = result.categoryReviews.find(
      (candidate) => candidate.id === "ITC-27"
    );
    const process = category.informationCard.processes.find(
      (candidate) => candidate.key === "evi_charging_shape"
    );
    const evidence = sources.evidenceManifest.evidence_records.find(
      (record) => record.evidence_id === "E-CONTEXT-EVI-SHAPE"
    );

    expect(process.selectionPolicy.outputCardinality).toBe(
      "ONE_SELECTED_PROFILE"
    );
    expect(process.outputBindings[0]).toEqual(
      expect.objectContaining({
        formulaTerm: "normalized_shape_t",
        outputScope: "PROFILE"
      })
    );
    expect(evidence.unsupported_uses).toContain("Site daily delivered energy");
    expect(evidence.unsupported_uses).toContain("Charging utilization");
  });

  it("does not claim public-site utilization as an EVI-Pro output", async () => {
    const result = buildOperationalSavingsReview(
      await loadOperationalSavingsSources()
    );
    const category = result.categoryReviews.find(
      (candidate) => candidate.id === "ITC-27"
    );
    const shape = category.informationCard.processes.find(
      (process) => process.key === "evi_charging_shape"
    );
    const energy = category.informationCard.processes.find(
      (process) => process.key === "public_charging_site_energy"
    );

    expect(shape.valueNeeded.join(" ")).not.toMatch(
      /sessions per day|site daily energy|utilization/i
    );
    expect(energy.lookupInputs).toContain(
      "Selected site daily delivered energy from a charging study or contractor design"
    );
    expect(energy.selectionPolicy.missingExactValueBehavior).toMatch(
      /implementation limitation/i
    );
  });

  it("defines exact and conservative screening paths for interval tariffs", async () => {
    const result = buildOperationalSavingsReview(
      await loadOperationalSavingsSources()
    );
    const category = result.categoryReviews.find(
      (candidate) => candidate.id === "ITC-27"
    );
    const process = category.informationCard.processes.find(
      (candidate) => candidate.key === "interval_tariff"
    );
    const text = [
      process.purpose,
      ...process.howToUse,
      process.validation
    ].join(" ");

    expect(text).toMatch(/exact published tariff/i);
    expect(text).toMatch(/itemized bill/i);
    expect(text).toMatch(/conservative screening/i);
    expect(text).toMatch(/zero export credit/i);
    expect(text).not.toMatch(/generic tariff/i);
  });

  it("connects ITC-30, ITC-48, and ITC-49 resolvers to formula outputs", async () => {
    const result = buildOperationalSavingsReview(
      await loadOperationalSavingsSources()
    );
    const expected = new Map([
      ["ITC-30", ["existing_fuel_per_hour", "proposed_kWh_per_hour"]],
      [
        "ITC-48",
        [
          "existing_resource_per_activity_r",
          "proposed_resource_per_activity_r"
        ]
      ],
      [
        "ITC-49",
        [
          "current_annual_refrigeration_kWh",
          "proposed_annual_refrigeration_kWh"
        ]
      ]
    ]);

    for (const [categoryId, terms] of expected) {
      const category = result.categoryReviews.find(
        (candidate) => candidate.id === categoryId
      );
      const boundTerms = category.informationCard.processes.flatMap(
        (process) => process.outputBindings.map((binding) => binding.formulaTerm)
      );
      expect(boundTerms).toEqual(expect.arrayContaining(terms));
      expect(category.status).toBe("BLOCKED");
    }

    const cooking = result.categoryReviews.find(
      (candidate) => candidate.id === "ITC-48"
    );
    const proposedCookingInput = cooking.informationCard.processes
      .find((process) => process.key === "context_benchmarks")
      .inputBindings.find(
        (binding) =>
          binding.lookupInput ===
          "Proposed induction equipment type and resource"
      );
    expect(proposedCookingInput).toEqual(
      expect.objectContaining({
        sourceLabel: "Linked Opportunity",
        treePath:
          "Annual Operational Savings > Annual Comparable-Duty Cooking Resource Difference > Proposed Induction Equipment Requirements"
      })
    );
  });

  it("normalizes DC efficiency as the fraction 0.95", async () => {
    const sources = await loadOperationalSavingsSources();
    const fixture = sources.sourceFixtures.get(
      "docs/operational-savings-fixtures/sources/energy-star-evse-native-fields.json"
    );
    const efficiencyField = fixture.fields.find(
      (field) =>
        field.field ===
        "dc.average_loading_adjusted_efficiency_ac_input"
    );
    const efficiencyValue = fixture.values.find(
      (value) =>
        value.field ===
        "dc.product_2665585.average_loading_adjusted_efficiency_native"
    );

    expect(efficiencyField.unit_id).toBe("fraction");
    expect(efficiencyValue.unit_id).toBe("fraction");
    expect(efficiencyValue.value).toBe(0.95);
    expect(100 / efficiencyValue.value).toBeCloseTo(105.2631579);
    expect(100 / 0.0095).toBeGreaterThan(10_000);
  });

  it("classifies kWh units as energy rather than power", async () => {
    const { unitRegistry } = await loadOperationalSavingsSources();

    expect(unitRegistry.units.kwh).toEqual(
      expect.objectContaining({
        dimension: "energy",
        quantity_kind: "energy",
        dimension_vector: { energy: 1 }
      })
    );
    expect(unitRegistry.units.kwh_year.dimension).toBe("energy_per_time");
    expect(unitRegistry.units.kwh_cycle.dimension).toBe(
      "energy_per_activity"
    );
    expect(unitRegistry.units.kwh_100_lb.dimension).toBe("energy_per_mass");
    expect(unitRegistry.units.kwh_day.dimension).toBe("energy_per_time");
    expect(unitRegistry.units.kwh_interval.dimension).toBe("interval_energy");
    expect(unitRegistry.units.resource_unit_ft2_year.dimension).toBe(
      "resource_per_area_time"
    );
  });

  it("keys realism decisions by category and exact tree path", async () => {
    const sources = await loadOperationalSavingsSources();
    const decisions = sources.userInputDecisionRegistry.inputs;
    const keys = decisions.map(
      (entry) => `${entry.category_id}\u0000${entry.tree_path}`
    );

    expect(new Set(keys).size).toBe(keys.length);
    expect(decisions.every((entry) => entry.reason.includes(entry.tree_path)))
      .toBe(true);
    const mutated = {
      ...sources,
      userInputDecisionRegistry: structuredClone(
        sources.userInputDecisionRegistry
      )
    };
    mutated.userInputDecisionRegistry.inputs[0].tree_path += " stale";
    expect(() => buildOperationalSavingsReview(mutated)).toThrow(
      /Missing explicit User-input decision/
    );
  });

  it("rejects process output bindings that do not point to real formula terms", async () => {
    const sources = await loadOperationalSavingsSources();
    const result = buildOperationalSavingsReview(sources);
    const errors = validateMutatedCard(result, sources, "ITC-30", (card) => {
      card.processes[0].outputBindings[0].formulaTerm =
        "not_a_real_formula_term";
    });

    expect(errors.some((error) =>
      error.includes("does not reach a formula term")
    )).toBe(true);
  });

  it("rejects a proposed input bound to an unrelated existing-equipment branch", async () => {
    const sources = await loadOperationalSavingsSources();
    const result = buildOperationalSavingsReview(sources);
    const errors = validateMutatedCard(result, sources, "ITC-48", (card) => {
      const binding = card.processes
        .find((process) => process.key === "context_benchmarks")
        .inputBindings.find(
          (candidate) =>
            candidate.lookupInput ===
            "Proposed induction equipment type and resource"
        );
      binding.treePath =
        "Annual Operational Savings > Annual Comparable-Duty Cooking Resource Difference > Existing Cooking Equipment Type and Resource";
      binding.sourceLabel = "User";
    });

    expect(errors).toContain(
      "ITC-48 Information Card process Comparable Cooking-Duty Resolver binds proposed input Proposed induction equipment type and resource to an unrelated User branch"
    );
  });

  it("rejects generic fallback wording without a source-specific implementation", async () => {
    const sources = await loadOperationalSavingsSources();
    const result = buildOperationalSavingsReview(sources);
    const errors = validateMutatedCard(result, sources, "ITC-30", (card) => {
      card.processes[0].howToUse[0] = "Use a context benchmark.";
    });

    expect(errors.some((error) =>
      error.includes(
        "contains generic fallback wording without a source-specific formula, table, or population"
      )
    )).toBe(true);
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
