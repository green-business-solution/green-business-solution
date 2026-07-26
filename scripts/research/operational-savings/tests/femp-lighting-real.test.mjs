import { mkdtemp, readFile, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import { afterAll, beforeAll, expect, test } from "vitest";

import {
  ingestLightingMarketBenchmarks,
  mapExistingExteriorLightingToItc02,
  recordExistingExteriorLightingBenchmark
} from "../adapters/context-benchmarks/run.mjs";
import {
  FEMP_EXTERIOR_LIGHTING_ARTIFACT,
  composeItc02LightingReplacement,
  fempExteriorLightingRequirementId,
  ingestFempExteriorLighting,
  mapFempRequirementToItc02,
  recordItc02FempFormulaMapping,
  recordItc02LightingReplacement,
  resolveExactFempLightingProduct,
  resolveFempLightingRequirement
} from "../adapters/femp-lighting/run.mjs";
import {
  parseFempTable1,
  schemaFromFempRequirementRows
} from "../adapters/femp-lighting/inspect-schema.mjs";
import {
  mapWeeklyScheduleToFormula,
  recordOperatingScheduleFormulaMapping
} from "../adapters/operating-schedule/run.mjs";
import {
  sha256File,
  verifyArtifact
} from "../lib/artifact.mjs";
import { openResearchDatabase } from "../lib/sqlite.mjs";

const repoRoot = fileURLToPath(new URL("../../../..", import.meta.url));
const artifactPath = join(
  repoRoot,
  "scripts/research/operational-savings/.cache/artifacts/femp-exterior-lighting.html"
);
const lightingMarketArtifactPath = join(
  repoRoot,
  "scripts/research/operational-savings/.cache/artifacts/doe-lmc-2015-tables.xlsx"
);
const projectScheduleFixturePath = join(
  repoRoot,
  "scripts/research/operational-savings/adapters/operating-schedule/project-schedule-fixtures.v1.json"
);

let database;
let temporaryRoot;
let ingestion;
let projectScheduleFixtures;

beforeAll(async () => {
  process.env.OS_RESEARCH_NETWORK = "disabled";
  temporaryRoot = await mkdtemp(join(tmpdir(), "retrofi-femp-lighting-proof-"));
  database = await openResearchDatabase(
    join(temporaryRoot, "research.sqlite"),
    { deferReleasePublicationUntilClose: true }
  );
  ingestion = await ingestFempExteriorLighting({ artifactPath, database });
  await ingestLightingMarketBenchmarks({
    artifactPath: lightingMarketArtifactPath,
    database
  });
  projectScheduleFixtures = JSON.parse(
    await readFile(projectScheduleFixturePath, "utf8")
  );
});

afterAll(async () => {
  database?.close();
  if (temporaryRoot) {
    await rm(temporaryRoot, { recursive: true, force: true });
  }
});

test("parses and publishes the exact seven-row FEMP Table 1 with its pinned checksum", async () => {
  expect(await sha256File(artifactPath)).toBe(
    FEMP_EXTERIOR_LIGHTING_ARTIFACT.sha256
  );
  expect(ingestion.artifact.byteSize).toBe(
    FEMP_EXTERIOR_LIGHTING_ARTIFACT.byteSize
  );
  expect(ingestion.schema).toMatchObject({
    tableTitle: "Table 1. Efficiency Requirements for Exterior Lighting",
    headers: ["Category", "Luminaire Efficacy Rating (LER)"],
    rowCount: 7
  });
  expect(
    database.prepare(`
      SELECT application, required_efficacy_lm_per_w AS efficacy,
        lumen_min AS lumenMin, lumen_max AS lumenMax,
        example_power_w AS examplePower
      FROM femp_exterior_lighting_requirements
      ORDER BY application
    `).all()
  ).toEqual([
    {
      application: "Bollards",
      efficacy: 100,
      lumenMin: null,
      lumenMax: null,
      examplePower: null
    },
    {
      application: "Floodlight Luminaires",
      efficacy: 118,
      lumenMin: null,
      lumenMax: null,
      examplePower: null
    },
    {
      application: "Fuel pump canopy luminaires",
      efficacy: 128,
      lumenMin: null,
      lumenMax: null,
      examplePower: null
    },
    {
      application: "Outdoor pole/arm-mounted area and roadway luminaires",
      efficacy: 136,
      lumenMin: null,
      lumenMax: null,
      examplePower: null
    },
    {
      application: "Outdoor pole/arm-mounted decorative luminaires",
      efficacy: 112,
      lumenMin: null,
      lumenMax: null,
      examplePower: null
    },
    {
      application: "Outdoor wall-mounted luminaires",
      efficacy: 126,
      lumenMin: null,
      lumenMax: null,
      examplePower: null
    },
    {
      application: "Parking garage luminaires",
      efficacy: 123,
      lumenMin: null,
      lumenMax: null,
      examplePower: null
    }
  ]);
});

test("scopes stable FEMP requirement identities to the exact source release", () => {
  const application = "Outdoor wall-mounted luminaires";
  const currentId = fempExteriorLightingRequirementId(
    application,
    ingestion.releaseId
  );
  const laterId = fempExteriorLightingRequirementId(
    application,
    "release:femp-exterior-lighting:later"
  );
  expect(laterId).not.toBe(currentId);
  expect(
    database.prepare(`
      SELECT id, source_release_id AS sourceReleaseId
      FROM femp_exterior_lighting_requirements
      WHERE id = ?
    `).get(currentId)
  ).toEqual({
    id: currentId,
    sourceReleaseId: ingestion.releaseId
  });
});

test("maps an exact application and supplied lumen requirement to the ITC-02 power ceiling", () => {
  const resolved = resolveFempLightingRequirement(database, {
    application: "Outdoor wall-mounted luminaires",
    requiredLumens: 10_000
  });
  expect(resolved).toMatchObject({
    requiredEfficacyLmPerW: 126,
    requiredLumens: 10_000,
    maximumInputWatts: 10_000 / 126,
    proposedKw: 10 / 126
  });
  const result = mapFempRequirementToItc02(database, {
    application: "Outdoor wall-mounted luminaires",
    requiredLumens: 10_000
  });
  expect(result.values.proposed_kW).toBeCloseTo(0.07936507936507936, 12);
  expect(result.formulaBindings).toEqual([
    expect.objectContaining({
      formulaTerm: "proposed_kW",
      unit: "kW/fixture",
      scope: "PER_FIXTURE"
    })
  ]);
  expect(result.warning).toMatch(/requirement-derived maximum input power/);

  const calculationId = recordItc02FempFormulaMapping(database, result);
  expect(calculationId).toContain(
    `:${ingestion.releaseId}:`
  );
  expect(
    database.prepare(`
      SELECT formula_term AS formulaTerm, value, unit, scope, selection_rule AS selectionRule
      FROM selected_values
      WHERE calculation_run_id = ?
    `).get(calculationId)
  ).toMatchObject({
    formulaTerm: "proposed_kW",
    value: 10 / 126,
    unit: "kW/fixture",
    scope: "PER_FIXTURE",
    selectionRule: "EXACT_APPLICATION_AND_FEMP_MINIMUM_EFFICACY_POWER_CEILING"
  });
  expect(
    database.prepare(`
      SELECT source_artifact_id AS sourceArtifactId
      FROM selected_value_provenance
      WHERE selected_value_id = ?
    `).get(`${calculationId}:proposed_kW`)
  ).toEqual({
    sourceArtifactId: "artifact:femp-exterior-lighting:2026-07-23"
  });
});

test("composes real benchmark, requirement, and schedule outputs into annual_kWh", () => {
  const existingResult = mapExistingExteriorLightingToItc02(
    database,
    { application: "Building Exterior: C&I" }
  );
  const proposedResult = mapFempRequirementToItc02(database, {
    application: "Outdoor wall-mounted luminaires",
    requiredLumens: 10_000
  });
  const scheduleResult = mapWeeklyScheduleToFormula(
    projectScheduleFixtures.cases.itc02FixedLighting
  );
  const sourceRunIds = {
    existing_fixture_power:
      recordExistingExteriorLightingBenchmark(
        database,
        existingResult
      ),
    proposed_fixture_power:
      recordItc02FempFormulaMapping(database, proposedResult),
    annual_operating_hours:
      recordOperatingScheduleFormulaMapping(
        database,
        scheduleResult
      )
  };
  const result = composeItc02LightingReplacement({
    existingResult,
    proposedResult,
    scheduleResult,
    replacementFixtureCount: 100
  });
  expect(
    result.dependencies.find(
      (dependency) =>
        dependency.role === "annual_operating_hours"
    )
  ).toMatchObject({
    standardId: "STD-OPERATING-SCHEDULE",
    processKey: "fixed-lighting-hours",
    sourceArtifactId: null,
    inputOwnership: "PROJECT_OR_PROFILE",
    inputSha256:
      scheduleResult.provenance.inputSnapshotSha256
  });
  expect(
    result.provenance.filters.inputs.find(
      (input) =>
        input.role === "annual_operating_hours"
    )
  ).toMatchObject({
    sourceArtifactId: null,
    inputOwnership: "PROJECT_OR_PROFILE",
    inputSha256:
      scheduleResult.provenance.inputSnapshotSha256
  });
  expect(result.values.annual_kWh).toBeCloseTo(
    733.6126984126986,
    10
  );
  expect(result.formulaBindings).toEqual([
    {
      outputName: "Annual electricity reduction",
      formulaTerm: "annual_kWh",
      value: expect.closeTo(733.6126984126986, 10),
      unit: "kWh/year",
      scope: "PROJECT_TOTAL"
    }
  ]);
  const calculationId = recordItc02LightingReplacement(
    database,
    result,
    sourceRunIds
  );
  expect(
    database.prepare(`
      SELECT formula_term AS formulaTerm, value, unit, scope
      FROM selected_values
      WHERE calculation_run_id = ?
    `).get(calculationId)
  ).toEqual({
    formulaTerm: "annual_kWh",
    value: expect.closeTo(733.6126984126986, 10),
    unit: "kWh/year",
    scope: "PROJECT_TOTAL"
  });
  expect(
    database.prepare(`
      SELECT dependency_role AS role,
        input_calculation_run_id AS inputCalculationRunId,
        source_artifact_id AS sourceArtifactId
      FROM calculation_source_dependencies
      WHERE calculation_run_id = ?
      ORDER BY dependency_role
    `).all(calculationId)
  ).toEqual([
    {
      role: "annual_operating_hours",
      inputCalculationRunId:
        sourceRunIds.annual_operating_hours,
      sourceArtifactId: null
    },
    {
      role: "existing_fixture_power",
      inputCalculationRunId:
        sourceRunIds.existing_fixture_power,
      sourceArtifactId:
        "artifact:doe-lmc-2015-tables:2017-11"
    },
    {
      role: "proposed_fixture_power",
      inputCalculationRunId:
        sourceRunIds.proposed_fixture_power,
      sourceArtifactId:
        "artifact:femp-exterior-lighting:2026-07-23"
    }
  ]);
  expect(
    database.prepare(`
      SELECT cr.source_release_id AS sourceReleaseId,
        svp.source_artifact_id AS sourceArtifactId,
        svp.source_fields_json AS sourceFieldsJson
      FROM calculation_runs cr
      JOIN selected_values sv
        ON sv.calculation_run_id = cr.id
      JOIN selected_value_provenance svp
        ON svp.selected_value_id = sv.id
      WHERE cr.id = ?
    `).get(sourceRunIds.annual_operating_hours)
  ).toEqual({
    sourceReleaseId: null,
    sourceArtifactId: null,
    sourceFieldsJson: JSON.stringify([
      "year",
      "timeZone",
      "weekly",
      "exceptions",
      "holidays",
      "activeWeeks"
    ])
  });
  expect(() =>
    recordItc02LightingReplacement(
      database,
      result,
      {
        ...sourceRunIds,
        annual_operating_hours:
          sourceRunIds.proposed_fixture_power
      }
    )
  ).toThrow(
    /MISMATCHED_COMPOSITION_DEPENDENCY: annual_operating_hours/
  );
});

test("rejects exact-product resolution because the FEMP page has no products", () => {
  expect(() => resolveExactFempLightingProduct()).toThrow(
    /UNSUPPORTED_SOURCE_BOUNDARY.*no product model/
  );
});

test("fails closed on unknown applications and invalid required light output", () => {
  expect(() => resolveFempLightingRequirement(database, {
    application: "Sports field luminaires",
    requiredLumens: 10_000
  })).toThrow(/NO_EXACT_MATCH/);
  expect(() => resolveFempLightingRequirement(database, {
    application: "Outdoor wall-mounted luminaires",
    requiredLumens: 0
  })).toThrow(/INVALID_REQUIREMENT: requiredLumens/);
  const existingResult = mapExistingExteriorLightingToItc02(
    database,
    { application: "Building Exterior: C&I" }
  );
  const proposedResult = mapFempRequirementToItc02(database, {
    application: "Outdoor wall-mounted luminaires",
    requiredLumens: 10_000
  });
  const wrongSchedule = mapWeeklyScheduleToFormula({
    year: 2026,
    timeZone: "America/Los_Angeles",
    weekly: { monday: [["09:00", "17:00"]] },
    categoryId: "ITC-02",
    processKey: "operating_schedule",
    formulaTerm: "annual_on_hours"
  });
  expect(() => composeItc02LightingReplacement({
    existingResult,
    proposedResult,
    scheduleResult: wrongSchedule,
    replacementFixtureCount: 100
  })).toThrow(/INVALID_STANDARD_OUTPUT/);
  expect(() => composeItc02LightingReplacement({
    existingResult,
    proposedResult,
    scheduleResult: {
      ...wrongSchedule,
      processKey: "fixed-lighting-hours"
    },
    replacementFixtureCount: 0
  })).toThrow(/INVALID_PROJECT_INPUT/);
});

test("fails header, threshold-unit, and duplicate-application schema mutations", async () => {
  const html = await readFile(artifactPath, "utf8");
  expect(() =>
    parseFempTable1(
      html.replace("<th>Category</th>", "<th>Application</th>")
    )
  ).toThrow(/UNEXPECTED_TABLE_HEADER_SCHEMA/);
  expect(() =>
    parseFempTable1(
      html.replace("<td>≥ 128</td>", "<td>128 watts</td>")
    )
  ).toThrow(/INVALID_EFFICACY_REQUIREMENT/);

  const parsed = parseFempTable1(html);
  expect(() =>
    schemaFromFempRequirementRows([
      ...parsed.rows,
      structuredClone(parsed.rows[0])
    ])
  ).toThrow(/AMBIGUOUS_APPLICATION_REQUIREMENT/);
});

test("fails a corrupt artifact checksum", async () => {
  const corrupt = join(temporaryRoot, "corrupt-femp.html");
  await writeFile(corrupt, "<html></html>\n", "utf8");
  await expect(
    verifyArtifact(corrupt, FEMP_EXTERIOR_LIGHTING_ARTIFACT)
  ).rejects.toThrow(/ARTIFACT_SIZE_MISMATCH|CORRUPT_CHECKSUM/);
});

test("requires offline mode and makes no runtime network call", () => {
  const previousNetwork = process.env.OS_RESEARCH_NETWORK;
  const previousFetch = globalThis.fetch;
  let fetchCalls = 0;
  globalThis.fetch = async () => {
    fetchCalls += 1;
    throw new Error("network must not be called");
  };
  try {
    process.env.OS_RESEARCH_NETWORK = "disabled";
    expect(
      mapFempRequirementToItc02(database, {
        application: "Bollards",
        requiredLumens: 1_000
      }).values.proposed_kW
    ).toBe(0.01);
    expect(fetchCalls).toBe(0);
    delete process.env.OS_RESEARCH_NETWORK;
    expect(() =>
      mapFempRequirementToItc02(database, {
        application: "Bollards",
        requiredLumens: 1_000
      })
    ).toThrow(/OFFLINE_GUARD_REQUIRED/);
    expect(fetchCalls).toBe(0);
  } finally {
    globalThis.fetch = previousFetch;
    if (previousNetwork === undefined) {
      delete process.env.OS_RESEARCH_NETWORK;
    } else {
      process.env.OS_RESEARCH_NETWORK = previousNetwork;
    }
  }
});
