import { execFileSync } from "node:child_process";
import { cp, mkdtemp, mkdir, readFile, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { fileURLToPath } from "node:url";

import { afterEach, describe, expect, it } from "vitest";

const SOURCE_ROOT = fileURLToPath(new URL("..", import.meta.url));
const fixtureRoots = [];

afterEach(async () => {
  await Promise.all(fixtureRoots.splice(0).map((fixtureRoot) => rm(fixtureRoot, { recursive: true, force: true })));
});

describe("validate-operational-savings-information-trees", () => {
  it("accepts the canonical registries and all current generated review pages", async () => {
    const fixtureRoot = await createFixture();

    expect(runValidator(fixtureRoot)).toContain(
      "Operational-savings information-tree and generated-review validation passed."
    );
  });

  it("rejects a missing generated category page", async () => {
    const fixtureRoot = await createFixture();
    await rm(join(fixtureRoot, "docs/operational-savings-review/categories/ITC-54.md"));

    expect(() => runValidator(fixtureRoot)).toThrow(/missing generated category page: ITC-54\.md/);
  });

  it("rejects a stale generated category page", async () => {
    const fixtureRoot = await createFixture();
    await mutateFile(
      join(fixtureRoot, "docs/operational-savings-review/categories/ITC-01.md"),
      (text) => `${text}\nStale manual edit.\n`
    );

    expect(() => runValidator(fixtureRoot)).toThrow(/stale generated review page: docs\/operational-savings-review\/categories\/ITC-01\.md/);
  });

  it("rejects an undefined shared branch", async () => {
    const fixtureRoot = await createFixture();
    await mutateTree(fixtureRoot, (text) => text.replace(
      "│  ├─ BR-ANNUAL-OPERATING-HOURS\n│  └─ MEASUR thermal and pump result",
      "│  ├─ BR-UNDEFINED-OPERATING-HOURS\n│  └─ MEASUR thermal and pump result"
    ));

    expect(() => runValidator(fixtureRoot)).toThrow(/undefined branch BR-UNDEFINED-OPERATING-HOURS/);
  });

  it("rejects a circular shared-branch reference", async () => {
    const fixtureRoot = await createFixture();
    await mutateTree(fixtureRoot, (text) => text.replace(
      "└─ Deterministic annual operating-hours resolution {{lookup: operating_schedule}} (Standard)",
      "└─ BR-ANNUAL-OPERATING-HOURS"
    ));

    expect(() => runValidator(fixtureRoot)).toThrow(/circular shared-branch reference/);
  });

  it("rejects a tree Standard reference without a matching process section", async () => {
    const fixtureRoot = await createFixture();
    await mutateFile(
      join(fixtureRoot, "docs/operational-savings-review/categories/ITC-01.md"),
      (text) => text.replace(
        "**■ Standard 1.1 — Commercial Building Upgrade Resource Model**",
        "**Removed process section**"
      )
    );

    expect(() => runValidator(fixtureRoot)).toThrow(
      /ITC-01 Information Card tree references and Standard sections do not match/
    );
  });

  it("rejects a Standard without a source link", async () => {
    const fixtureRoot = await createFixture();
    await mutateStandard(fixtureRoot, (text) => text.replace(
      "https://www.fueleconomy.gov/feg/ws/index.shtml",
      "www.fueleconomy.gov/feg/ws/index.shtml"
    ));

    expect(() => runValidator(fixtureRoot)).toThrow(/STD-FUELECONOMY-VEHICLES Standard missing source link/);
  });

  it("rejects a Standard with a missing Automation field", async () => {
    const fixtureRoot = await createFixture();
    await mutateStandard(fixtureRoot, (text) => text.replace(
      "- **Difficulty:** Medium.\n- **Efficient Build-Time Estimate:** 3 to 5 developer days for the product groups used here.",
      "- Difficulty: Medium.\n- **Efficient Build-Time Estimate:** 3 to 5 developer days for the product groups used here."
    ));

    expect(() => runValidator(fixtureRoot)).toThrow(/STD-DOE-CCMS-RATINGS Standard missing Automation field \*\*Difficulty:\*\*/);
  });

  it("rejects an untraceable Standard Lookup Input", async () => {
    const fixtureRoot = await createFixture();
    await mutateTree(fixtureRoot, (text) => text.replace(
      "{{lookup: floor_area}}",
      "{{lookup: floor_area_typo}}"
    ));

    expect(() => runValidator(fixtureRoot)).toThrow(/ITC-01 has untraceable Standard Lookup Input STD-COMSTOCK-ANNUAL-DELTA:floor_area/);
  });

  it("rejects a formula and tree-root mismatch", async () => {
    const fixtureRoot = await createFixture();
    await mutateTree(fixtureRoot, (text) => text.replace(
      "Annual dollar savings\n├─ Annual gas reduction\n│  ├─ Current annual water-heating gas",
      "Annual gas reduction\n├─ Current annual water-heating gas"
    ));

    expect(() => runValidator(fixtureRoot)).toThrow(/ITC-07 formula\/tree root mismatch/);
  });

  it("rejects a banned visible heading in an Information Card", async () => {
    const fixtureRoot = await createFixture();
    await mutateFile(
      join(fixtureRoot, "docs/operational-savings-review/categories/ITC-07.md"),
      (text) => text.replace(
        "**Broader Formula**",
        "## Review Status\n\n**Broader Formula**"
      )
    );

    expect(() => runValidator(fixtureRoot)).toThrow(
      /ITC-07 Information Card contains banned visible content Review Status/
    );
  });

  it("rejects a card missing a required top-level component", async () => {
    const fixtureRoot = await createFixture();
    await mutateFile(
      join(fixtureRoot, "docs/operational-savings-review/categories/ITC-08.md"),
      (text) => text.replace("**Overview:**", "**Summary:**")
    );

    expect(() => runValidator(fixtureRoot)).toThrow(
      /ITC-08 Information Card is missing \*\*Overview:\*\*/
    );
  });

  it("rejects an Information Card schema whose required fields drift", async () => {
    const fixtureRoot = await createFixture();
    await mutateJson(
      join(fixtureRoot, "docs/operational-savings-information-card.schema.json"),
      (schema) => {
        schema.required = schema.required.filter((field) => field !== "overview");
      }
    );

    expect(() => runValidator(fixtureRoot)).toThrow(
      /Information Card schema required fields do not match the presentation registry/
    );
  });

  it("rejects a process section that is not referenced by the tree", async () => {
    const fixtureRoot = await createFixture();
    await mutateFile(
      join(fixtureRoot, "docs/operational-savings-review/categories/ITC-23.md"),
      (text) => text.replace(
        "Standard 1.2 — Battery Storage Dispatch Interval Bill Calculation",
        "Standard 1.2 — Renamed Tree Process"
      )
    );

    expect(() => runValidator(fixtureRoot)).toThrow(
      /ITC-23 Information Card tree references and Standard sections do not match/
    );
  });

  it("rejects duplicate visible Standard numbers", async () => {
    const fixtureRoot = await createFixture();
    await mutateFile(
      join(fixtureRoot, "docs/operational-savings-review/categories/ITC-02.md"),
      (text) => text.replaceAll("Standard 1.3 — Requirement-Based New Fixture Wattage Resolution", "Standard 1.2 — Requirement-Based New Fixture Wattage Resolution")
    );

    expect(() => runValidator(fixtureRoot)).toThrow(
      /ITC-02 Information Card has duplicate Standard numbers or names/
    );
  });

  it.each([
    "Purpose",
    "Source",
    "Lookup Inputs",
    "Value Needed",
    "How to Use",
    "Automation",
    "Validation"
  ])("rejects a visible Standard missing %s", async (field) => {
    const fixtureRoot = await createFixture();
    await mutateFile(
      join(fixtureRoot, "docs/operational-savings-review/categories/ITC-29.md"),
      (text) => text.replace(`**${field}:**`, `**Removed ${field}:**`)
    );

    expect(() => runValidator(fixtureRoot)).toThrow(
      new RegExp(`ITC-29 Standard 1\\.1 is missing ${field}`)
    );
  });

  it("rejects a visible Standard source with no direct URL", async () => {
    const fixtureRoot = await createFixture();
    await mutateFile(
      join(fixtureRoot, "docs/operational-savings-review/categories/ITC-29.md"),
      (text) => text.replace(
        "[https://www.fueleconomy.gov/feg/ws/index.shtml](https://www.fueleconomy.gov/feg/ws/index.shtml)",
        "FuelEconomy.gov source link removed"
      )
    );

    expect(() => runValidator(fixtureRoot)).toThrow(
      /ITC-29 Standard 1.1 lacks a visible direct source URL/
    );
  });

  it("rejects a technical source field displayed as a User input", async () => {
    const fixtureRoot = await createFixture();
    await mutateFile(
      join(fixtureRoot, "docs/operational-savings-review/categories/ITC-29.md"),
      (text) => text.replace(
        "Existing Vehicle Make and Model (User)",
        "FuelEconomy.gov record ID (User)"
      )
    );

    expect(() => runValidator(fixtureRoot)).toThrow(
      /ITC-29 Information Card exposes a technical identifier as a User input/
    );
  });

  it("rejects a generated realism entry without an explicit reviewed decision", async () => {
    const fixtureRoot = await createFixture();
    await mutateFile(
      join(fixtureRoot, "scripts/operational-savings-information-card-registry.mjs"),
      (text) => text.replace(
        '["Public Operating Hours", ["USER_RECOGNIZABLE_ACTIVITY"',
        '["Public Operating Hours Typo", ["USER_RECOGNIZABLE_ACTIVITY"'
      )
    );

    expect(() => runValidator(fixtureRoot)).toThrow(
      /User-input realism entry .* has an invalid explicit User decision/
    );
  });

  it("rejects a Project Document mislabeled as Linked Opportunity", async () => {
    const fixtureRoot = await createFixture();
    await mutateFile(
      join(fixtureRoot, "scripts/operational-savings-information-card-registry.mjs"),
      (text) => text.replace(
        "Existing Nameplate, Photometric Report, or Field Measurement (Project Document)",
        "Existing Nameplate, Photometric Report, or Field Measurement (Linked Opportunity)"
      )
    );

    expect(() => runValidator(fixtureRoot)).toThrow(
      /ITC-02 Information Card mislabels a Project Document as Linked Opportunity/
    );
  });

  it("rejects a nameplate, audit, or measurement labeled as ordinary User", async () => {
    const fixtureRoot = await createFixture();
    await mutateFile(
      join(fixtureRoot, "scripts/operational-savings-information-card-registry.mjs"),
      (text) => text.replace(
        "Backup Equipment Nameplate, Commissioning Record, or Engineering Assessment (Project Document)",
        "Backup Equipment Nameplate, Commissioning Record, or Engineering Assessment (User)"
      )
    );

    expect(() => runValidator(fixtureRoot)).toThrow(
      /ITC-08 Information Card labels Project Document evidence as ordinary User input/
    );
  });

  it("rejects technical usage assigned directly to User without a benchmark resolver", async () => {
    const fixtureRoot = await createFixture();
    await mutateFile(
      join(fixtureRoot, "scripts/operational-savings-information-card-registry.mjs"),
      (text) => text.replace(
        "Public Operating Hours (User)",
        "Flushes per Day per Fixture (User)"
      )
    );

    expect(() => runValidator(fixtureRoot)).toThrow(
      /ITC-27 Information Card assigns technical usage directly to User without a benchmark resolver/
    );
  });

  it("rejects a visible multi-value output where one selected value is required", async () => {
    const fixtureRoot = await createFixture();
    await mutateFile(
      join(fixtureRoot, "scripts/operational-savings-information-card-registry.mjs"),
      (text) => text.replace(
        '"One existing input-watt value per fixture"',
        '"Low, median, and high existing input-watt values per fixture"'
      )
    );

    expect(() => runValidator(fixtureRoot)).toThrow(
      /ITC-02 Information Card process Existing Fixture Wattage Benchmark exposes a range where one selected value is required/
    );
  });

  it("rejects a requirements process without a deterministic selected-value rule", async () => {
    const fixtureRoot = await createFixture();
    await mutateFile(
      join(fixtureRoot, "scripts/operational-savings-information-card-registry.mjs"),
      (text) => text.replace(
        "\"Use the source's official recommended or typical value when present; otherwise select the weighted median when valid weights exist, or the ordinary median of the eligible compatible population.\"",
        '"Select any compatible product record."'
      )
    );

    expect(() => runValidator(fixtureRoot)).toThrow(
      /requirements-based process .* lacks a deterministic selected-value rule/
    );
  });

  it("rejects a Standard that omits a technical tree input", async () => {
    const fixtureRoot = await createFixture();
    await mutateFile(
      join(fixtureRoot, "scripts/operational-savings-information-card-registry.mjs"),
      (text) => text.replace(
        '"Maximum event duration from a Project Document, the linked opportunity, or the connected context benchmark",',
        '"Event notification from a Project Document",'
      )
    );

    expect(() => runValidator(fixtureRoot)).toThrow(
      /ITC-16 Information Card process Automated Demand Response Interval Bill Calculation omits required technical tree input Maximum event duration/
    );
  });

  it("rejects a Standard input whose use is not documented", async () => {
    const fixtureRoot = await createFixture();
    await mutateFile(
      join(fixtureRoot, "scripts/operational-savings-information-card-registry.mjs"),
      (text) => text.replace(
        "return `${lookupInput} is used by ${CARD_COPY[category.id].title} to ${purpose}.`;",
        'return "This input is listed but is not used.";'
      )
    );

    expect(() => runValidator(fixtureRoot)).toThrow(
      /Information Card process .* does not document how Lookup Input .* is used/
    );
  });

  it("rejects a solar-thermal simulator price input", async () => {
    const fixtureRoot = await createFixture();
    await mutateFile(
      join(fixtureRoot, "scripts/operational-savings-information-card-registry.mjs"),
      (text) => text.replace(
        'solarWaterHeating\n          ? [\n              "Site location",',
        'solarWaterHeating\n          ? [\n              "Site location",\n              "Fuel price",'
      )
    );

    expect(() => runValidator(fixtureRoot)).toThrow(
      /ITC-08 Information Card simulator process Solar Thermal Production Simulation includes price before resolving the physical result/
    );
  });

  it("rejects AC and DC charger fields without explicit normalization formulas", async () => {
    const fixtureRoot = await createFixture();
    await mutateFile(
      join(fixtureRoot, "scripts/operational-savings-information-card-registry.mjs"),
      (text) => text.replace(
        "Normalize AC active input power as output power plus the applicable mode-specific total loss, with units converted consistently.",
        "Use one generic active efficiency field for both AC and DC chargers."
      )
    );

    expect(() => runValidator(fixtureRoot)).toThrow(
      /ITC-27 Information Card process Exact Charger Rating Lookup conflates AC and DC charger fields or omits an explicit normalization formula/
    );
  });

  it("rejects a WaterSense product claim outside supported fixture types", async () => {
    const fixtureRoot = await createFixture();
    await mutateFile(
      join(fixtureRoot, "scripts/operational-savings-information-card-registry.mjs"),
      (text) => text.replace(
        "Supported fixture type: bathroom faucet, showerhead, or pre-rinse spray valve",
        "Supported fixture type: bathroom faucet, showerhead, pre-rinse spray valve, or kitchen faucet"
      )
    );

    expect(() => runValidator(fixtureRoot)).toThrow(
      /ITC-32 WaterSense usage process claims a fixture type outside the supported source scope/
    );
  });

  it("rejects an unsupported source-field claim without an inspected artifact or pending limitation", async () => {
    const fixtureRoot = await createFixture();
    await mutateFile(
      join(fixtureRoot, "scripts/operational-savings-information-card-registry.mjs"),
      (text) => text.replace(
        "The official DLC data-access guide documents tokenized SSL QPL CSV downloads, and the technical requirements define model, application, light-output, efficacy, input-power, status, and version fields. No authenticated QPL extract, retained exact-product fixture, or category adapter is present, so implementation execution is not yet proved.",
        "The official DLC dataset provides the exact input-power source field."
      )
    );

    expect(() => runValidator(fixtureRoot)).toThrow(
      /ITC-02 Information Card process Exact New Fixture Wattage Lookup makes a source-field claim without inspected evidence or an implementation-pending limitation/
    );
  });

  it("rejects a technical probability distribution assigned to User", async () => {
    const fixtureRoot = await createFixture();
    await mutateFile(
      join(fixtureRoot, "scripts/operational-savings-information-card-registry.mjs"),
      (text) => text.replace(
        "Installed Charger Count (User)",
        "Session Arrival Probability Distribution (User)"
      )
    );

    expect(() => runValidator(fixtureRoot)).toThrow(
      /ITC-27 Information Card assigns an unrealistic technical value to User/
    );
  });

  it("rejects complete tariff rules assigned to User", async () => {
    const fixtureRoot = await createFixture();
    await mutateFile(
      join(fixtureRoot, "scripts/operational-savings-information-card-registry.mjs"),
      (text) => text.replace(
        "Public Operating Hours (User)",
        "Complete Tariff Calendar and Ratchet Rules (User)"
      )
    );

    expect(() => runValidator(fixtureRoot)).toThrow(
      /ITC-27 Information Card assigns uploaded utility or tariff data to User/
    );
  });

  it("rejects uploaded interval utility data assigned to User", async () => {
    const fixtureRoot = await createFixture();
    await mutateFile(
      join(fixtureRoot, "scripts/operational-savings-information-card-registry.mjs"),
      (text) => text.replace(
        "Public Operating Hours (User)",
        "Timestamped Interval Utility Data (User)"
      )
    );

    expect(() => runValidator(fixtureRoot)).toThrow(
      /ITC-27 Information Card assigns uploaded utility or tariff data to User/
    );
  });

  it("rejects a source-unsupported process displayed as a value resolver", async () => {
    const fixtureRoot = await createFixture();
    await mutateFile(
      join(fixtureRoot, "scripts/operational-savings-information-card-registry.mjs"),
      (text) => text.replace(
        'purpose: "Resolve input watts when the linked opportunity names an exact replacement luminaire.",',
        'purpose: "Resolve input watts when the linked opportunity names an exact replacement luminaire.",\n      evidenceState: "SOURCE_UNSUPPORTED",'
      )
    );

    expect(() => runValidator(fixtureRoot)).toThrow(
      /ITC-02 Information Card displays source-unsupported process Exact New Fixture Wattage Lookup as a tree resolver/
    );
  });

  it("rejects identical exact-product and requirements-based Validation", async () => {
    const fixtureRoot = await createFixture();
    await mutateFile(
      join(fixtureRoot, "scripts/operational-savings-information-card-registry.mjs"),
      (text) => text.replace(
        "The official DLC data-access guide and SSL technical requirements establish a candidate-filtering method. No retained QPL population currently proves the application, light-output, distribution, mounting, controls, active-status, and version filters or the resulting selected median wattage.",
        "The official DLC data-access guide documents tokenized SSL QPL CSV downloads, and the technical requirements define model, application, light-output, efficacy, input-power, status, and version fields. No authenticated QPL extract, retained exact-product fixture, or category adapter is present, so implementation execution is not yet proved."
      )
    );

    expect(() => runValidator(fixtureRoot)).toThrow(
      /ITC-02 exact-product and requirement-based processes have identical Validation/
    );
  });

  it("rejects generic process How to Use boilerplate", async () => {
    const fixtureRoot = await createFixture();
    await mutateFile(
      join(fixtureRoot, "scripts/operational-savings-information-card-registry.mjs"),
      (text) => text.replace(
        "`Map the ${categoryName} inputs to the documented ${name} source fields or model inputs: ${inputSummary}.`,",
        '"Validate these inputs before the calculation.",'
      )
    );

    expect(() => runValidator(fixtureRoot)).toThrow(
      /contains generic How to Use boilerplate/
    );
  });

  it("rejects a MEASUR process without an exact calculator or module", async () => {
    const fixtureRoot = await createFixture();
    await mutateFile(
      join(fixtureRoot, "scripts/operational-savings-information-card-registry.mjs"),
      (text) => text.replaceAll(
        "Pumping System Assessment Tool",
        "Generic MEASUR calculator"
      ).replaceAll(
        "Fan System Assessment Tool",
        "Generic MEASUR calculator"
      )
    );

    expect(() => runValidator(fixtureRoot)).toThrow(
      /ITC-39 Information Card process .* does not identify its exact MEASUR calculator or module/
    );
  });

  it("rejects a simulator that supplies missing project design inputs", async () => {
    const fixtureRoot = await createFixture();
    await mutateFile(
      join(fixtureRoot, "scripts/operational-savings-information-card-registry.mjs"),
      (text) => text.replace(
        "Validate site coordinates and array design, run the documented V8 field contract, check warnings, and return interval or annual AC generation with source provenance.",
        "Use the PVWatts simulator to supply missing project design capacity as a model output."
      )
    );

    expect(() => runValidator(fixtureRoot)).toThrow(
      /simulator process PVWatts Solar Production Calculation treats missing project design inputs as model outputs/
    );
  });

  it("rejects a current certified-product population used as an unknown existing baseline", async () => {
    const fixtureRoot = await createFixture();
    await mutateFile(
      join(fixtureRoot, "scripts/operational-savings-information-card-registry.mjs"),
      (text) => text.replace(
        "If an exact record is unavailable, select one context-matched existing-equipment benchmark from an authoritative historical or installed-stock source; never substitute the current efficient-product population for the installed baseline.",
        "If an exact record is unavailable, use the current certified-product population as the unknown existing-equipment baseline."
      )
    );

    expect(() => runValidator(fixtureRoot)).toThrow(
      /uses current products as the unknown existing-equipment baseline/
    );
  });

  it("rejects a product process that resolves an operating schedule", async () => {
    const fixtureRoot = await createFixture();
    await mutateFile(
      join(fixtureRoot, "scripts/operational-savings-information-card-registry.mjs"),
      (text) => text.replace(
        'lookupInputs: ["Exact proposed make and model from the linked opportunity", "Product type and capacity", "Applicable certified test method"],',
        'lookupInputs: ["Exact proposed make and model from the linked opportunity", "Product type and capacity", "Operating schedule"],'
      )
    );

    expect(() => runValidator(fixtureRoot)).toThrow(
      /Information Card product process .* incorrectly resolves usage or an operating schedule/
    );
  });

  it("rejects a process source that does not correspond to its canonical Standard", async () => {
    const fixtureRoot = await createFixture();
    await mutateFile(
      join(fixtureRoot, "scripts/operational-savings-information-card-registry.mjs"),
      (text) => text.replace(
        'sourceName: "U.S. Environmental Protection Agency - ENERGY STAR Product Finder",',
        'sourceName: "National Laboratory of the Rockies - PVWatts V8",'
      )
    );

    expect(() => runValidator(fixtureRoot)).toThrow(
      /names a source that does not correspond to STD-ENERGY-STAR-PRODUCT-DATA/
    );
  });

  it("rejects a Profile leaf outside the production-backed presentation projection", async () => {
    const fixtureRoot = await createFixture();
    await mutateFile(
      join(fixtureRoot, "docs/operational-savings-review/categories/ITC-02.md"),
      (text) => text.replace("Site Location (Profile)", "Existing Fixture Model (Profile)")
    );

    expect(() => runValidator(fixtureRoot)).toThrow(
      /ITC-02 Information Card Profile leaves do not match the production-backed presentation projection/
    );
  });

  it("rejects a simple Bill-derived rate rendered as a Standard", async () => {
    const fixtureRoot = await createFixture();
    await mutateFile(
      join(fixtureRoot, "docs/operational-savings-review/categories/ITC-02.md"),
      (text) => text.replace(
        "Avoidable Electricity Rate (Derived)",
        "Standard 9.9 — Bill-Derived Electricity Rate"
      )
    );

    expect(() => runValidator(fixtureRoot)).toThrow(
      /ITC-02 Information Card renders a simple Bill-derived rate as a Standard/
    );
  });

  it("rejects a Linked Opportunity engineering value without an interpreting process", async () => {
    const fixtureRoot = await createFixture();
    await mutateFile(
      join(fixtureRoot, "docs/operational-savings-review/categories/ITC-02.md"),
      (text) => text.replace(
        "Standard 1.2 — Exact New Fixture Wattage Lookup",
        "Exact Fixture Watts (Linked Opportunity)"
      )
    );

    expect(() => runValidator(fixtureRoot)).toThrow(
      /ITC-02 Linked Opportunity jumps directly to an engineering value without a Standard process/
    );
  });

  it("rejects a tree that repeats its root result", async () => {
    const fixtureRoot = await createFixture();
    await mutateFile(
      join(fixtureRoot, "docs/operational-savings-review/categories/ITC-15.md"),
      (text) => text.replace(
        "No direct purchased-resource reduction is assigned to this activity (Derived)",
        "Annual Direct Operational Savings: $0"
      )
    );

    expect(() => runValidator(fixtureRoot)).toThrow(
      /ITC-15 Information Card tree repeats its root output/
    );
  });

  it("rejects a generic Retrofit selected branch", async () => {
    const fixtureRoot = await createFixture();
    await mutateFile(
      join(fixtureRoot, "docs/operational-savings-review/categories/ITC-20.md"),
      (text) => text.replace(
        "Opportunity Equipment or Performance Requirements (Linked Opportunity)",
        "Retrofit selected (Linked Opportunity)"
      )
    );

    expect(() => runValidator(fixtureRoot)).toThrow(
      /ITC-20 Information Card contains a generic Retrofit selected branch/
    );
  });

  it("rejects a generic unsupported routing branch", async () => {
    const fixtureRoot = await createFixture();
    await mutateFile(
      join(fixtureRoot, "docs/operational-savings-review/categories/ITC-02.md"),
      (text) => text.replace(
        "Linked Opportunity specifies requirements but no exact product",
        "Unknown or different"
      )
    );

    expect(() => runValidator(fixtureRoot)).toThrow(
      /ITC-02 Information Card contains a generic unsupported routing branch/
    );
  });

  it("rejects generic future-work wording as the complete Validation", async () => {
    const fixtureRoot = await createFixture();
    await mutateFile(
      join(fixtureRoot, "docs/operational-savings-review/categories/ITC-29.md"),
      (text) => text.replace(
        /\*\*Validation:\*\*\n[\s\S]*$/,
        "**Validation:**\nThis should work.\n"
      )
    );

    expect(() => runValidator(fixtureRoot)).toThrow(
      /ITC-29 Standard 1.1 has generic or empty Validation/
    );
  });

  it("rejects Validation that contradicts the source-evidence manifest", async () => {
    const fixtureRoot = await createFixture();
    await mutateFile(
      join(fixtureRoot, "scripts/operational-savings-information-card-registry.mjs"),
      (text) => text.replace(
        "The official DLC data-access guide documents tokenized SSL QPL CSV downloads, and the technical requirements define model, application, light-output, efficacy, input-power, status, and version fields. No authenticated QPL extract, retained exact-product fixture, or category adapter is present, so implementation execution is not yet proved.",
        "The official DLC source provides a general installed legacy-equipment distribution that supports an existing baseline."
      )
    );

    expect(() => runValidator(fixtureRoot)).toThrow(
      /ITC-02 Information Card process Exact New Fixture Wattage Lookup Validation contradicts the source-evidence manifest/
    );
  });

  it("rejects a leaked canonical identifier in an Information Card", async () => {
    const fixtureRoot = await createFixture();
    await mutateFile(
      join(fixtureRoot, "docs/operational-savings-review/categories/ITC-34.md"),
      (text) => text.replace(
        "Standard 1.1 — Landscape Water Budget Calculation",
        "Standard 1.1 — BR-AVOIDABLE-RESOURCE-RATE and E-WATERSENSE-LANDSCAPE-DESIGN"
      )
    );

    expect(() => runValidator(fixtureRoot)).toThrow(
      /ITC-34 Information Card exposes internal technical identifiers/
    );
  });

  it("rejects a high-sensitivity project input made optional without a supported resolver", async () => {
    const fixtureRoot = await createFixture();
    await mutateTree(fixtureRoot, (text) => text.replace(
      "Existing full-load input kW {{lookup: measur_calculator_inputs}} {{input: required}} (User)",
      "Existing full-load input kW, if known {{lookup: measur_calculator_inputs}} {{input: optional}} (User)"
    ));

    expect(() => runValidator(fixtureRoot)).toThrow(
      /ITC-39 unresolved direct input must be required for STD-DOE-MEASUR/
    );
  });

  it("rejects an unclassified User input", async () => {
    const fixtureRoot = await createFixture();
    await mutateTree(fixtureRoot, (text) => text.replace(
      "{{lookup: operating_schedule, operating_schedule_details, measured_annual_operating_hours}} {{input: optional}} (User)",
      "{{lookup: operating_schedule, operating_schedule_details, measured_annual_operating_hours}} (User)"
    ));

    expect(() => runValidator(fixtureRoot)).toThrow(
      /User input must have exactly one required, conditional, or optional classification/
    );
  });

  it("rejects an Optional Known Detail counted as required", async () => {
    const fixtureRoot = await createFixture();
    await mutateTree(fixtureRoot, (text) => text.replace(
      "Exact Schedule, if known {{lookup: operating_schedule, operating_schedule_details, measured_annual_operating_hours}} {{input: optional}} (User)",
      "Exact Schedule, if known {{lookup: operating_schedule, operating_schedule_details, measured_annual_operating_hours}} {{input: required}} (User)"
    ));

    expect(() => runValidator(fixtureRoot)).toThrow(/Required Screening Input cannot say "if known"/);
  });

  it("rejects source evidence with a missing exact source location", async () => {
    const fixtureRoot = await createFixture();
    await mutateEvidence(fixtureRoot, (manifest) => {
      delete manifest.evidence_records.find((record) => record.evidence_id === "E-FEMP-PROPOSED")
        .exact_field_table_page_equation_or_function;
    });

    expect(() => runValidator(fixtureRoot)).toThrow(
      /E-FEMP-PROPOSED evidence record is missing exact_field_table_page_equation_or_function/
    );
  });

  it.each([
    [
      "source URL",
      async (fixtureRoot) => mutateEvidence(fixtureRoot, (manifest) => {
        manifest.evidence_records.find((record) => record.evidence_id === "E-FUELECONOMY-COMB08")
          .source_url = "https://www.fueleconomy.gov/ws/rest/vehicle/99999";
      }),
      /E-FUELECONOMY-COMB08 fixture binding source URL does not match evidence metadata/
    ],
    [
      "source version",
      async (fixtureRoot) => mutateEvidence(fixtureRoot, (manifest) => {
        manifest.evidence_records.find((record) => record.evidence_id === "E-FUELECONOMY-COMB08")
          .source_version = "substituted version";
      }),
      /E-FUELECONOMY-COMB08 fixture binding source version does not match evidence metadata/
    ],
    [
      "artifact",
      async (fixtureRoot) => mutateEvidence(fixtureRoot, (manifest) => {
        manifest.evidence_records.find((record) => record.evidence_id === "E-FUELECONOMY-COMB08")
          .exact_artifact = "substituted artifact";
      }),
      /E-FUELECONOMY-COMB08 fixture binding artifact does not match evidence metadata/
    ],
    [
      "field",
      async (fixtureRoot) => mutateSourceFixture(
        fixtureRoot,
        "fueleconomy-vehicle-schema.json",
        (fixture) => {
          fixture.fields[8].field = "comb08_substituted";
        }
      ),
      /E-FUELECONOMY-COMB08 bound field comb08_substituted is absent/
    ],
    [
      "unit",
      async (fixtureRoot) => mutateSourceFixture(
        fixtureRoot,
        "fueleconomy-vehicle-schema.json",
        (fixture) => {
          fixture.fields[8].unit_id = "kilowatt_hour_per_100_mile";
        }
      ),
      /E-FUELECONOMY-COMB08 canonical unit mile_per_gallon is absent/
    ],
    [
      "reviewed value",
      async (fixtureRoot) => mutateSourceFixture(
        fixtureRoot,
        "fueleconomy-vehicle-schema.json",
        (fixture) => {
          fixture.values[4].value = 31;
        }
      ),
      /E-FUELECONOMY-COMB08 fixture binding value does not match/
    ],
    [
      "unsupported inference",
      async (fixtureRoot) => mutateSourceFixture(
        fixtureRoot,
        "fueleconomy-vehicle-schema.json",
        (fixture) => {
          fixture.unsupported_inferences[0] = "Substituted annual activity claim";
        }
      ),
      /E-FUELECONOMY-COMB08 unsupported-use binding does not match/
    ],
    [
      "fixture type",
      async (fixtureRoot) => mutateSourceFixture(
        fixtureRoot,
        "fueleconomy-vehicle-schema.json",
        (fixture) => {
          fixture.fixture_type = "reviewed_source_schema";
        }
      ),
      /fueleconomy-vehicle-schema\.json source fixture has invalid fixture type/
    ],
    [
      "free-text source title",
      async (fixtureRoot) => mutateEvidence(fixtureRoot, (manifest) => {
        manifest.evidence_records.find((record) => record.evidence_id === "E-FUELECONOMY-COMB08")
          .source_title = "Substituted source title";
      }),
      /E-FUELECONOMY-COMB08 fixture binding source title does not match evidence metadata/
    ],
    [
      "checksum",
      async (fixtureRoot) => mutateSourceFixture(
        fixtureRoot,
        "fueleconomy-vehicle-schema.json",
        (fixture) => {
          fixture.raw_artifacts[0].source_checksum = `sha256:${"0".repeat(64)}`;
        }
      ),
      /E-FUELECONOMY-COMB08 fixture binding checksum does not match evidence metadata/
    ]
  ])("rejects a substituted VERIFIED %s binding", async (_label, mutate, expected) => {
    const fixtureRoot = await createFixture();
    await mutate(fixtureRoot);

    expect(() => runValidator(fixtureRoot)).toThrow(expected);
  });

  it("rejects evidence that names an undeclared Standard lookup input", async () => {
    const fixtureRoot = await createFixture();
    await mutateEvidence(fixtureRoot, (manifest) => {
      manifest.evidence_records.find((record) => record.evidence_id === "E-PVWATTS-V8")
        .required_lookup_inputs.push("invented_pv_design_input");
    });

    expect(() => runValidator(fixtureRoot)).toThrow(
      /E-PVWATTS-V8 evidence references undeclared Standard lookup input invented_pv_design_input/
    );
  });

  it("rejects evidence omitted from its declared source role", async () => {
    const fixtureRoot = await createFixture();
    await mutateEvidence(fixtureRoot, (manifest) => {
      const standard = manifest.standards.find(
        (candidate) => candidate.standard_id === "STD-COMSTOCK-ANNUAL-DELTA"
      );
      standard.source_roles.physics_or_calculation_method =
        standard.source_roles.physics_or_calculation_method.filter(
          (evidenceId) => evidenceId !== "E-COMSTOCK-TAXONOMY"
        );
    });

    expect(() => runValidator(fixtureRoot)).toThrow(
      /E-COMSTOCK-TAXONOMY is absent from the STD-COMSTOCK-ANNUAL-DELTA source-role summary/
    );
  });

  it("rejects proposed-product evidence used as an existing baseline", async () => {
    const fixtureRoot = await createFixture();
    await mutateEvidence(fixtureRoot, (manifest) => {
      const record = manifest.evidence_records.find((candidate) => candidate.evidence_id === "E-FEMP-PROPOSED");
      record.source_roles.push("existing_equipment_baseline");
      record.existing_or_proposed_coverage = "proposed";
    });

    expect(() => runValidator(fixtureRoot)).toThrow(
      /E-FEMP-PROPOSED proposed-product evidence is incorrectly used as an existing baseline/
    );
  });

  it("rejects an unsupported Profile or Bill equipment fallback", async () => {
    const fixtureRoot = await createFixture();
    await mutateStandard(fixtureRoot, (text) => text.replace(
      "- **Supported Scenarios:** linked-opportunity-exact-product; linked-opportunity-product-class; no-product-restriction; no-linked-opportunity; exact-proposed-model; insufficient-data.",
      "- **Supported Scenarios:** linked-opportunity-exact-product; linked-opportunity-product-class; no-product-restriction; no-linked-opportunity; exact-proposed-model; insufficient-data; profile-or-bill-fallback."
    ));

    expect(() => runValidator(fixtureRoot)).toThrow(
      /STD-ENERGY-STAR-PRODUCT-DATA equipment resolver must not claim profile-or-bill-fallback/
    );
  });

  it("rejects an enabled percentile without population, filters, sample size, and a fixture", async () => {
    const fixtureRoot = await createFixture();
    await mutateEvidence(fixtureRoot, (manifest) => {
      manifest.evidence_records.find((record) => record.evidence_id === "E-COMSTOCK-DELTA")
        .selected_value_basis = "Use the 25th, 50th, and 75th percentiles.";
    });

    expect(() => runValidator(fixtureRoot)).toThrow(
      /E-COMSTOCK-DELTA enables a percentile without eligible-population filters, sample size, and a fixture/
    );
  });

  it("rejects a formula term without a matching tree node", async () => {
    const fixtureRoot = await createFixture();
    await mutateContract(fixtureRoot, (contract) => {
      contract.categories.find((category) => category.category_id === "ITC-02")
        .formula_terms[0].tree_nodes = ["Invented replacement scope"];
    });

    expect(() => runValidator(fixtureRoot)).toThrow(
      /ITC-02 formula term quantity has unmatched tree nodes/
    );
  });

  it("rejects a formula term marked unused", async () => {
    const fixtureRoot = await createFixture();
    await mutateContract(fixtureRoot, (contract) => {
      contract.categories.find((category) => category.category_id === "ITC-02")
        .formula_terms[0].formula_use = "unused";
    });

    expect(() => runValidator(fixtureRoot)).toThrow(
      /ITC-02 formula term quantity is not used by the formula/
    );
  });

  it("rejects a tree User input unused by the formula or a traced Standard", async () => {
    const fixtureRoot = await createFixture();
    await mutateTree(fixtureRoot, (text) => text.replace(
      "Annual direct operational-resource savings equals zero\n└─ Linked Opportunity {{intermediate: project-opportunity}}",
      "Annual direct operational-resource savings equals zero\n├─ Unused customer color {{input: required}} (User)\n└─ Linked Opportunity {{intermediate: project-opportunity}}"
    ));

    expect(() => runValidator(fixtureRoot)).toThrow(
      /ITC-15 tree User input is unused by the formula or a traced Standard/
    );
  });

  it("rejects a formula identifier without a formula-term contract", async () => {
    const fixtureRoot = await createFixture();
    await mutateContract(fixtureRoot, (contract) => {
      const category = contract.categories.find((candidate) => candidate.category_id === "ITC-02");
      category.formula_terms = category.formula_terms.filter(
        (term) => term.name !== "fixture_input_W"
      );
    });

    expect(() => runValidator(fixtureRoot)).toThrow(
      /ITC-02 formula identifier fixture_input_W has no formula-term contract/
    );
  });

  it("rejects a resource conversion without a formula-term contract", async () => {
    const fixtureRoot = await createFixture();
    await mutateContract(fixtureRoot, (contract) => {
      const category = contract.categories.find((candidate) => candidate.category_id === "ITC-08");
      category.formula_terms = category.formula_terms.filter(
        (group) => !(group.exact_paths || []).includes("unit_conversion:resource-energy")
      );
    });

    expect(() => runValidator(fixtureRoot)).toThrow(
      /ITC-08 uses a resource-energy conversion without a formula-term contract/
    );
  });

  it("rejects an unused resource-conversion contract", async () => {
    const fixtureRoot = await createFixture();
    await mutateContract(fixtureRoot, (contract) => {
      contract.categories.find((category) => category.category_id === "ITC-15").formula_terms.push({
        name: "resource_unit_conversion",
        dimension: "declared",
        unit_id: "common_energy_unit_resource_unit",
        display_unit: "common-energy-unit/resource-unit",
        quantity_kind: "numeric",
        tree_nodes: ["Complete Fixture Count"],
        source_or_resolver: "UNIT-RESOURCE-ENERGY",
        exact_paths: ["unit_conversion:resource-energy"],
        fallback_path: null,
        standard_output_key: null,
        evidence_ids: [],
        formula_use: "Mutation-only unused conversion",
        default_path_resolved: false,
        missing_data_behavior: "NO_ESTIMATE"
      });
    });

    expect(() => runValidator(fixtureRoot)).toThrow(
      /ITC-15 declares an unused resource-energy conversion/
    );
  });

  it("rejects a formula-term unit mismatch", async () => {
    const fixtureRoot = await createFixture();
    await mutateContract(fixtureRoot, (contract) => {
      contract.categories.find((category) => category.category_id === "ITC-02")
        .formula_terms[0].unit_id = "usd_per_year";
    });

    expect(() => runValidator(fixtureRoot)).toThrow(
      /ITC-02 formula term quantity dimension count does not match unit usd_per_year/
    );
  });

  it("rejects an unknown canonical unit ID", async () => {
    const fixtureRoot = await createFixture();
    await mutateContract(fixtureRoot, (contract) => {
      contract.categories.find((category) => category.category_id === "ITC-02")
        .formula_terms[0].unit_id = "invented_unit";
    });

    expect(() => runValidator(fixtureRoot)).toThrow(
      /ITC-02 formula term quantity references unknown unit_id invented_unit/
    );
  });

  it("rejects a combined unit in one atomic formula term", async () => {
    const fixtureRoot = await createFixture();
    await mutateContract(fixtureRoot, (contract) => {
      contract.categories.find((category) => category.category_id === "ITC-29")
        .formula_terms.find((term) => term.name === "p_fuel")
        .display_unit = "USD/gallon and USD/kWh";
    });

    expect(() => runValidator(fixtureRoot)).toThrow(
      /ITC-29 formula term p_fuel has ambiguous combined units/
    );
  });

  it("rejects incompatible dimensional relationship metadata", async () => {
    const fixtureRoot = await createFixture();
    await mutateContract(fixtureRoot, (contract) => {
      contract.dimensional_relationships.find(
        (relationship) => relationship.relationship_id === "ITC-29-added-electricity"
      ).operands[1].exponent = -1;
    });

    expect(() => runValidator(fixtureRoot)).toThrow(
      /ITC-29-added-electricity dimension mismatch/
    );
  });

  it("rejects incomplete Conditional Calculation Gate metadata", async () => {
    const fixtureRoot = await createFixture();
    await mutateContract(fixtureRoot, (contract) => {
      delete contract.categories.find((category) => category.category_id === "ITC-02")
        .conditional_gates[0].activation_condition;
    });

    expect(() => runValidator(fixtureRoot)).toThrow(
      /ITC-02 Conditional Calculation Gate Existing Fixture Model or Documented Watts lacks activation_condition/
    );
  });

  it("rejects Ready status when the named scenario is not executable", async () => {
    const fixtureRoot = await createFixture();
    await mutateContract(fixtureRoot, (contract) => {
      contract.categories.find((category) => category.category_id === "ITC-29")
        .scenarios[0].readiness = "VERIFIED_NONEXECUTABLE";
    });

    expect(() => runValidator(fixtureRoot)).toThrow(
      /ITC-29 ready_scenario_id is not VERIFIED_EXECUTABLE/
    );
  });

  it("rejects a changed ITC-29 exact source value in the golden fixture", async () => {
    const fixtureRoot = await createFixture();
    await mutateGoldenFixture(fixtureRoot, "ITC-29.golden.json", (fixture) => {
      fixture.source_records.find((record) => record.field === "combE").value = 29;
    });

    expect(() => runValidator(fixtureRoot)).toThrow(
      /ITC-29 golden fixture arithmetic mismatch/
    );
  });

  it("rejects ITC-29 without explicit service-equivalence confirmation", async () => {
    const fixtureRoot = await createFixture();
    await mutateGoldenFixture(fixtureRoot, "ITC-29.golden.json", (fixture) => {
      fixture.minimum_default_path_inputs.user_confirmed_service_equivalence = false;
    });

    expect(() => runValidator(fixtureRoot)).toThrow(
      /ITC-29 golden fixture lacks explicit user-confirmed service equivalence/
    );
  });

  it("rejects a second charging-efficiency adjustment for FuelEconomy combE", async () => {
    const fixtureRoot = await createFixture();
    await mutateTree(fixtureRoot, (text) => text.replace(
      "`added_kWh = annual_miles × proposed_combE / 100`",
      "`added_kWh = annual_miles × proposed_combE / 100 / charging_efficiency`"
    ));

    expect(() => runValidator(fixtureRoot)).toThrow(
      /ITC-29 applies vehicle charging efficiency twice/
    );
  });

  it("rejects multiplication of an annual quantity by annual hours twice", async () => {
    const fixtureRoot = await createFixture();
    await mutateTree(fixtureRoot, (text) => text.replace(
      "`S = quantity × annual_flow_hours × (specific_power_existing - specific_power_proposed) × p_electric`",
      "`S = quantity × annual_flow_hours × annual_hours × (specific_power_existing - specific_power_proposed) × p_electric`"
    ));

    expect(() => runValidator(fixtureRoot)).toThrow(
      /ITC-42 multiplies an annual quantity by annual hours twice/
    );
  });

  it("rejects demand valuation without an interval load path", async () => {
    const fixtureRoot = await createFixture();
    await mutateContract(fixtureRoot, (contract) => {
      contract.categories.find((category) => category.category_id === "ITC-02")
        .rate_components.push("electric-demand");
    });

    expect(() => runValidator(fixtureRoot)).toThrow(
      /ITC-02 declares demand value without an interval load and tariff formula path/
    );
  });

  it("rejects export valuation without an export formula or traced dispatch", async () => {
    const fixtureRoot = await createFixture();
    await mutateContract(fixtureRoot, (contract) => {
      contract.categories.find((category) => category.category_id === "ITC-02")
        .rate_components.push("electric-export");
    });

    expect(() => runValidator(fixtureRoot)).toThrow(
      /ITC-02 declares export treatment without an export formula or traced dispatch output/
    );
  });

  it("rejects sewer valuation on the irrigation design path", async () => {
    const fixtureRoot = await createFixture();
    await mutateContract(fixtureRoot, (contract) => {
      const category = contract.categories.find((candidate) => candidate.category_id === "ITC-34");
      category.rate_components.push("sewer-volumetric");
      category.sewer_applicability = "Always";
    });

    expect(() => runValidator(fixtureRoot)).toThrow(
      /ITC-34 must not include sewer on the irrigation design path/
    );
  });

  it("rejects a nonexistent canonical Profile path", async () => {
    const fixtureRoot = await createFixture();
    await mutateContract(fixtureRoot, (contract) => {
      contract.categories.find((category) => category.category_id === "ITC-02")
        .profile_paths.push("site.fake.exteriorFixtureCount");
    });

    expect(() => runValidator(fixtureRoot)).toThrow(
      /ITC-02 references nonexistent Profile field site\.fake\.exteriorFixtureCount/
    );
  });

  it("rejects a Profile path renamed in production normalization", async () => {
    const fixtureRoot = await createFixture();
    await mutateFile(
      join(fixtureRoot, "apps/api/server/matching/normalizeUserProfile.mjs"),
      (text) => text.replace("buildingTypes: unique(", "buildingCategories: unique(")
    );

    expect(() => runValidator(fixtureRoot)).toThrow(
      /normalized Profile path fixture is stale: missing actual path site\.buildingCategories/
    );
  });

  it("rejects the wrong object or array structure in the Profile path fixture", async () => {
    const fixtureRoot = await createFixture();
    await mutateProfileFixture(fixtureRoot, (fixture) => {
      fixture.paths.find((descriptor) => descriptor.path === "site.buildingTypes").kind = "object";
    });

    expect(() => runValidator(fixtureRoot)).toThrow(
      /normalized Profile path fixture has wrong structure for site\.buildingTypes: object; expected array/
    );
  });

  it("rejects a stale normalized Profile path fixture checksum", async () => {
    const fixtureRoot = await createFixture();
    await mutateProfileFixture(fixtureRoot, (fixture) => {
      fixture.contract_sha256 = `sha256:${"0".repeat(64)}`;
    });

    expect(() => runValidator(fixtureRoot)).toThrow(
      /normalized Profile path fixture checksum is stale/
    );
  });

  it("rejects a nonexistent canonical Bill field", async () => {
    const fixtureRoot = await createFixture();
    await mutateContract(fixtureRoot, (contract) => {
      contract.categories.find((category) => category.category_id === "ITC-02")
        .bill_field_ids.push("invented_tariff_field");
    });

    expect(() => runValidator(fixtureRoot)).toThrow(
      /ITC-02 references nonexistent Bill field invented_tariff_field/
    );
  });

  it("rejects a Ready category without its declared golden fixture", async () => {
    const fixtureRoot = await createFixture();
    await rm(join(fixtureRoot, "docs/operational-savings-fixtures/categories/ITC-15.golden.json"));

    expect(() => runValidator(fixtureRoot)).toThrow(
      /ITC-15 Ready category lacks its declared executable golden fixture/
    );
  });

  it("rejects a Ready category backed by unverified source evidence", async () => {
    const fixtureRoot = await createFixture();
    await mutateTree(fixtureRoot, (text) => text.replace(
      "### ITC-01 - ComStock archetype annual resource delta\n\n**Status:** DRAFT",
      "### ITC-01 - ComStock archetype annual resource delta\n\n**Status:** RESEARCHED — READY FOR HUMAN REVIEW"
    ).replace(
      "Show an interquartile range and applicability share only after the eligible population, filters, weights, and sample count are fixture-backed.",
      "Show an interquartile range and applicability share only after the eligible population, filters, weights, and sample count are fixture-backed.\n\nReady mutation marker."
    ));
    await mutateContract(fixtureRoot, (contract) => {
      contract.categories.find((category) => category.category_id === "ITC-01").verdict =
        "RESEARCHED — READY FOR HUMAN REVIEW";
    });

    expect(() => runValidator(fixtureRoot)).toThrow(
      /ITC-01 Ready category uses insufficient evidence E-COMSTOCK-DELTA/
    );
  });

  it("rejects a Standard scenario without output behavior", async () => {
    const fixtureRoot = await createFixture();
    await mutateStandard(fixtureRoot, (text) => text.replace("- **Scenario Output Behavior:**", "- Scenario Output Behavior:"));

    expect(() => runValidator(fixtureRoot)).toThrow(/Standard missing Resolution Contract field \*\*Scenario Output Behavior:\*\*/);
  });

  it("rejects a Standard assumption without uncertainty", async () => {
    const fixtureRoot = await createFixture();
    await mutateStandard(fixtureRoot, (text) => text.replace("- **Uncertainty Rule:**", "- Uncertainty Rule:"));

    expect(() => runValidator(fixtureRoot)).toThrow(/Standard missing Resolution Contract field \*\*Uncertainty Rule:\*\*/);
  });

  it("rejects a Standard assumption that is not editable", async () => {
    const fixtureRoot = await createFixture();
    await mutateStandard(fixtureRoot, (text) => text.replace("- **Editable:** Yes.", "- **Editable:** No."));

    expect(() => runValidator(fixtureRoot)).toThrow(/Standard assumption must be editable/);
  });

  it("rejects exact values that fail to override estimates", async () => {
    const fixtureRoot = await createFixture();
    await mutateStandard(fixtureRoot, (text) => text.replace(
      "- **Exact Override:** A validated exact model, measurement, or project specification overrides the corresponding estimated value and records the exact source.",
      "- **Exact Override:** A validated value is retained only as a note."
    ));

    expect(() => runValidator(fixtureRoot)).toThrow(/Standard is missing exact-value override behavior/);
  });

  it("rejects an incorrect applicable resource", async () => {
    const fixtureRoot = await createFixture();
    await mutateTree(fixtureRoot, (text) => text.replace(
      "**Applicable Resources:** electricity\n\n**Retrofits:**\n\n- `exterior_site_lighting_retrofit`",
      "**Applicable Resources:** geothermal\n\n**Retrofits:**\n\n- `exterior_site_lighting_retrofit`"
    ));

    expect(() => runValidator(fixtureRoot)).toThrow(/ITC-02 declares invalid applicable resource geothermal/);
  });

  it("rejects a missing retrofit mapping", async () => {
    const fixtureRoot = await createFixture();
    await mutateTree(fixtureRoot, (text) => text.replace(
      "- `building_benchmarking_compliance` - Building benchmarking compliance\n",
      ""
    ));

    expect(() => runValidator(fixtureRoot)).toThrow(/missing retrofit mapping: building_benchmarking_compliance/);
  });

  it("rejects a duplicate retrofit mapping", async () => {
    const fixtureRoot = await createFixture();
    await mutateTree(fixtureRoot, (text) => text.replace(
      "- `building_benchmarking_compliance` - Building benchmarking compliance",
      "- `led_lighting_retrofit` - LED lighting retrofit"
    ));

    expect(() => runValidator(fixtureRoot)).toThrow(/duplicate retrofit mapping: led_lighting_retrofit/);
  });

  it("rejects an incorrect Used By declaration", async () => {
    const fixtureRoot = await createFixture();
    await mutateStandard(fixtureRoot, (text) => text.replace(
      "**Used By:** ITC-01.",
      "**Used By:** ITC-02."
    ));

    expect(() => runValidator(fixtureRoot)).toThrow(/STD-COMSTOCK-ANNUAL-DELTA Used By mismatch/);
  });
});

async function createFixture() {
  const fixtureRoot = await mkdtemp(join(tmpdir(), "gbs-operational-savings-validator-"));
  fixtureRoots.push(fixtureRoot);
  for (const directory of ["docs", "scripts", "data", "apps/api/server/matching"]) {
    await mkdir(join(fixtureRoot, directory), { recursive: true });
  }
  for (const file of [
    "docs/operational-savings-information-trees.md",
    "docs/operational-savings-standard-registry.md",
    "docs/operational-savings-information-tree-audit.md",
    "docs/operational-savings-information-card.schema.json",
    "docs/operational-savings-user-input-realism.schema.json",
    "docs/operational-savings-user-input-realism.json",
    "docs/operational-savings-source-evidence.json",
    "docs/operational-savings-category-contracts.json",
    "docs/operational-savings-unit-registry.json",
    "data/bill_field_dictionary.json",
    "scripts/generate-operational-savings-review-pages.mjs",
    "scripts/operational-savings-information-card-registry.mjs",
    "scripts/validate-operational-savings-information-trees.mjs",
    "apps/api/server/matching/retrofitTaxonomy.mjs",
    "apps/api/server/matching/normalizeUserProfile.mjs",
    "apps/api/server/matching/ontologies.mjs"
  ]) {
    await cp(join(SOURCE_ROOT, file), join(fixtureRoot, file));
  }
  await cp(
    join(SOURCE_ROOT, "docs/operational-savings-review"),
    join(fixtureRoot, "docs/operational-savings-review"),
    { recursive: true }
  );
  await cp(
    join(SOURCE_ROOT, "docs/operational-savings-fixtures"),
    join(fixtureRoot, "docs/operational-savings-fixtures"),
    { recursive: true }
  );
  return fixtureRoot;
}

async function mutateTree(fixtureRoot, mutate) {
  await mutateFile(join(fixtureRoot, "docs/operational-savings-information-trees.md"), mutate);
}

async function mutateStandard(fixtureRoot, mutate) {
  await mutateFile(join(fixtureRoot, "docs/operational-savings-standard-registry.md"), mutate);
}

async function mutateEvidence(fixtureRoot, mutate) {
  await mutateJson(join(fixtureRoot, "docs/operational-savings-source-evidence.json"), mutate);
}

async function mutateContract(fixtureRoot, mutate) {
  await mutateJson(join(fixtureRoot, "docs/operational-savings-category-contracts.json"), mutate);
}

async function mutateSourceFixture(fixtureRoot, file, mutate) {
  await mutateJson(
    join(fixtureRoot, "docs/operational-savings-fixtures/sources", file),
    mutate
  );
}

async function mutateProfileFixture(fixtureRoot, mutate) {
  await mutateJson(
    join(
      fixtureRoot,
      "docs/operational-savings-fixtures/profile/normalized-profile-paths.json"
    ),
    mutate
  );
}

async function mutateGoldenFixture(fixtureRoot, file, mutate) {
  await mutateJson(
    join(fixtureRoot, "docs/operational-savings-fixtures/categories", file),
    mutate
  );
}

async function mutateFile(path, mutate) {
  const original = await readFile(path, "utf8");
  const changed = mutate(original);
  if (changed === original) throw new Error(`Mutation did not change ${path}`);
  await writeFile(path, changed, "utf8");
}

async function mutateJson(path, mutate) {
  const original = JSON.parse(await readFile(path, "utf8"));
  mutate(original);
  await writeFile(path, `${JSON.stringify(original, null, 2)}\n`, "utf8");
}

function runValidator(fixtureRoot) {
  try {
    return execFileSync(
      process.execPath,
      [join(fixtureRoot, "scripts/validate-operational-savings-information-trees.mjs")],
      { encoding: "utf8", stdio: ["ignore", "pipe", "pipe"] }
    );
  } catch (error) {
    throw new Error(`${error.stdout || ""}${error.stderr || ""}`);
  }
}
