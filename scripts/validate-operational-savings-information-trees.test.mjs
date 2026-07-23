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

  it("rejects a missing embedded Standard", async () => {
    const fixtureRoot = await createFixture();
    await mutateFile(
      join(fixtureRoot, "docs/operational-savings-review/categories/ITC-01.md"),
      (text) => text.replace("### ■ STD-COMSTOCK-ANNUAL-DELTA —", "### Removed Standard —")
    );

    expect(() => runValidator(fixtureRoot)).toThrow(/ITC-01 generated page is missing embedded Standard STD-COMSTOCK-ANNUAL-DELTA/);
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

  it("rejects an incorrect Optional Known-Detail count", async () => {
    const fixtureRoot = await createFixture();
    await mutateFile(
      join(fixtureRoot, "docs/operational-savings-review/categories/ITC-07.md"),
      (text) => text.replace("**Optional Known-Detail count:** 5", "**Optional Known-Detail count:** 4")
    );

    expect(() => runValidator(fixtureRoot)).toThrow(/ITC-07 generated Optional Known-Detail count is 4; expected 5/);
  });

  it("rejects technical wattage made mandatory despite a Standard path", async () => {
    const fixtureRoot = await createFixture();
    await mutateTree(fixtureRoot, (text) => text.replace(
      "Existing Fixture Model, if known {{lookup: existing_fixture_model}} {{input: optional}} (User)",
      "Existing Fixture Wattage {{lookup: existing_fixture_model}} {{input: required}} (User)"
    ));

    expect(() => runValidator(fixtureRoot)).toThrow(/technical engineering value is mandatory despite a Standard path/);
  });

  it("rejects an unclassified User input", async () => {
    const fixtureRoot = await createFixture();
    await mutateTree(fixtureRoot, (text) => text.replace(
      "{{lookup: existing_fixture_model}} {{input: optional}} (User)",
      "{{lookup: existing_fixture_model}} (User)"
    ));

    expect(() => runValidator(fixtureRoot)).toThrow(/User input must have exactly one required or optional classification/);
  });

  it("rejects an Optional Known Detail counted as required", async () => {
    const fixtureRoot = await createFixture();
    await mutateTree(fixtureRoot, (text) => text.replace(
      "Existing Fixture Model, if known {{lookup: existing_fixture_model}} {{input: optional}} (User)",
      "Existing Fixture Model, if known {{lookup: existing_fixture_model}} {{input: required}} (User)"
    ));

    expect(() => runValidator(fixtureRoot)).toThrow(/Required User Input cannot say "if known"/);
  });

  it("rejects an equipment resolver without an exact proposed-model path", async () => {
    const fixtureRoot = await createFixture();
    await mutateStandard(fixtureRoot, (text) => text.replace("; exact-proposed-model.", "."));

    expect(() => runValidator(fixtureRoot)).toThrow(/equipment resolver is missing scenario exact-proposed-model/);
  });

  it("rejects an equipment resolver without a type-based fallback", async () => {
    const fixtureRoot = await createFixture();
    await mutateStandard(fixtureRoot, (text) => text.replace("existing-type-or-application; ", ""));

    expect(() => runValidator(fixtureRoot)).toThrow(/equipment resolver is missing scenario existing-type-or-application/);
  });

  it("rejects an equipment resolver without a no-opportunity path", async () => {
    const fixtureRoot = await createFixture();
    await mutateStandard(fixtureRoot, (text) => text.replace("no-linked-opportunity; ", ""));

    expect(() => runValidator(fixtureRoot)).toThrow(/equipment resolver is missing scenario no-linked-opportunity/);
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
  for (const directory of ["docs", "scripts", "apps/api/server/matching"]) {
    await mkdir(join(fixtureRoot, directory), { recursive: true });
  }
  for (const file of [
    "docs/operational-savings-information-trees.md",
    "docs/operational-savings-standard-registry.md",
    "docs/operational-savings-information-tree-audit.md",
    "scripts/generate-operational-savings-review-pages.mjs",
    "scripts/validate-operational-savings-information-trees.mjs",
    "apps/api/server/matching/retrofitTaxonomy.mjs",
    "apps/api/server/matching/ontologies.mjs"
  ]) {
    await cp(join(SOURCE_ROOT, file), join(fixtureRoot, file));
  }
  await cp(
    join(SOURCE_ROOT, "docs/operational-savings-review"),
    join(fixtureRoot, "docs/operational-savings-review"),
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

async function mutateFile(path, mutate) {
  const original = await readFile(path, "utf8");
  const changed = mutate(original);
  if (changed === original) throw new Error(`Mutation did not change ${path}`);
  await writeFile(path, changed, "utf8");
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
