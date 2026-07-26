import {
  mkdtemp,
  readFile,
  rm,
  writeFile
} from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { fileURLToPath } from "node:url";

import {
  afterAll,
  beforeAll,
  expect,
  test
} from "vitest";

import {
  loadDoeWalkInPdfEvidence,
  schemaFromDoeWalkInEvidence
} from "../adapters/context-benchmarks/doe-walkin-inspect-schema.mjs";
import {
  DOE_WALKIN_ARTIFACT,
  DOE_WALKIN_REVIEWED_FIXTURE,
  ingestDoeWalkInBenchmarks,
  mapDoeWalkInBenchmarkToItc49,
  recordDoeWalkInBenchmark
} from "../adapters/context-benchmarks/doe-walkin.mjs";
import {
  sha256File
} from "../lib/artifact.mjs";
import {
  openResearchDatabase
} from "../lib/sqlite.mjs";

const repoRoot = fileURLToPath(
  new URL("../../../..", import.meta.url)
);
const artifactPath = join(
  repoRoot,
  "scripts/research/operational-savings/.cache/artifacts/doe-wicf-ecs-nopr-2023.pdf"
);
const fixturePath = join(
  repoRoot,
  "docs/operational-savings-fixtures/sources/doe-walk-in-energy-benchmarks.json"
);
const exactPanelInput = Object.freeze({
  componentType: "PANEL",
  equipmentClass: "PS.L",
  temperatureClass: "LOW",
  indoorOutdoorConfiguration: "NOT_APPLICABLE",
  existingEfficiencyLevel: "BASELINE",
  proposedEfficiencyLevel: "TSL_3",
  panelAreaFt2: 100
});
const supportedCases = Object.freeze([
  {
    input: {
      componentType: "PANEL",
      equipmentClass: "PF.L",
      temperatureClass: "LOW",
      indoorOutdoorConfiguration: "NOT_APPLICABLE",
      existingEfficiencyLevel: "BASELINE",
      proposedEfficiencyLevel: "TSL_3",
      panelAreaFt2: 100
    },
    current: 580,
    proposed: 400
  },
  {
    input: exactPanelInput,
    current: 950,
    proposed: 520
  },
  {
    input: {
      ...exactPanelInput,
      equipmentClass: "PS.M",
      temperatureClass: "MEDIUM"
    },
    current: 230,
    proposed: 110.00000000000001
  },
  {
    input: {
      componentType: "DOOR",
      equipmentClass: "DW.L",
      temperatureClass: "LOW",
      indoorOutdoorConfiguration: "NOT_APPLICABLE",
      existingEfficiencyLevel: "BASELINE",
      proposedEfficiencyLevel: "TSL_3"
    },
    current: 2_698,
    proposed: 2_120
  },
  {
    input: {
      componentType: "DOOR",
      equipmentClass: "NM.L",
      temperatureClass: "LOW",
      indoorOutdoorConfiguration: "NOT_APPLICABLE",
      existingEfficiencyLevel: "BASELINE",
      proposedEfficiencyLevel: "TSL_3"
    },
    current: 3_796,
    proposed: 1_118
  },
  {
    input: {
      componentType: "DOOR",
      equipmentClass: "NO.L",
      temperatureClass: "LOW",
      indoorOutdoorConfiguration: "NOT_APPLICABLE",
      existingEfficiencyLevel: "BASELINE",
      proposedEfficiencyLevel: "TSL_3"
    },
    current: 5_320,
    proposed: 1_678
  },
  {
    input: {
      componentType: "REFRIGERATION_SYSTEM",
      equipmentClass: "DC.L.I",
      temperatureClass: "LOW",
      indoorOutdoorConfiguration: "INDOOR",
      existingEfficiencyLevel: "BASELINE",
      proposedEfficiencyLevel: "TSL_3"
    },
    current: 26_420,
    proposed: 25_887
  },
  {
    input: {
      componentType: "REFRIGERATION_SYSTEM",
      equipmentClass: "DC.M.I",
      temperatureClass: "MEDIUM",
      indoorOutdoorConfiguration: "INDOOR",
      existingEfficiencyLevel: "BASELINE",
      proposedEfficiencyLevel: "TSL_3"
    },
    current: 12_178,
    proposed: 11_615
  },
  {
    input: {
      componentType: "REFRIGERATION_SYSTEM",
      equipmentClass: "SP.H.I",
      temperatureClass: "HIGH",
      indoorOutdoorConfiguration: "INDOOR",
      existingEfficiencyLevel: "BASELINE",
      proposedEfficiencyLevel: "TSL_3"
    },
    current: 2_275,
    proposed: 1_999
  },
  {
    input: {
      componentType: "REFRIGERATION_SYSTEM",
      equipmentClass: "UC.L",
      temperatureClass: "LOW",
      indoorOutdoorConfiguration: "NOT_APPLICABLE",
      existingEfficiencyLevel: "BASELINE",
      proposedEfficiencyLevel: "TSL_3"
    },
    current: 45_993,
    proposed: 43_190
  }
]);

let database;
let evidence;
let ingestion;
let reviewedFixture;
let temporaryRoot;

beforeAll(async () => {
  process.env.OS_RESEARCH_NETWORK = "disabled";
  temporaryRoot = await mkdtemp(
    join(tmpdir(), "retrofi-context-doe-walkin-")
  );
  database = await openResearchDatabase(
    join(temporaryRoot, "research.sqlite"),
    { deferReleasePublicationUntilClose: true }
  );
  ingestion = await ingestDoeWalkInBenchmarks({
    artifactPath,
    fixturePath,
    database
  });
  [evidence, reviewedFixture] = await Promise.all([
    loadDoeWalkInPdfEvidence(artifactPath),
    readFile(fixturePath, "utf8").then(JSON.parse)
  ]);
}, 120_000);

afterAll(async () => {
  database?.close();
  if (temporaryRoot) {
    await rm(temporaryRoot, { recursive: true, force: true });
  }
});

test("verifies the exact PDF and reviewed fixture before publishing ten rows", async () => {
  expect(await sha256File(artifactPath)).toBe(
    DOE_WALKIN_ARTIFACT.sha256
  );
  expect(await sha256File(fixturePath)).toBe(
    DOE_WALKIN_REVIEWED_FIXTURE.sha256
  );
  expect(ingestion.schema.observed).toMatchObject({
    sourceIdentity: {
      docket: "EERE-2017-BT-STD-0009",
      pdfPageCount: 391
    },
    energyTableEvidence: {
      pdfPage: 164,
      documentPage: 163,
      tables: [
        "Table IV.31",
        "Table IV.32",
        "Table IV.33"
      ]
    }
  });
  expect(ingestion.schema.rows).toHaveLength(10);
  expect(
    database.prepare(`
      SELECT count(*) AS count
      FROM benchmark_populations
      WHERE source_release_id =
        'release:doe-wicf-ecs-nopr:2023-08'
    `).get().count
  ).toBe(10);
  expect(
    database.prepare(`
      SELECT count(*) AS count
      FROM benchmark_values v
      JOIN benchmark_populations p ON p.id = v.population_id
      WHERE p.source_release_id =
        'release:doe-wicf-ecs-nopr:2023-08'
    `).get().count
  ).toBe(20);
});

test("maps every reviewed class from one same-row baseline and TSL 3 pair", () => {
  for (const supported of supportedCases) {
    const result = mapDoeWalkInBenchmarkToItc49(
      database,
      supported.input
    );
    expect(
      result.values.current_annual_refrigeration_kWh
    ).toBeCloseTo(supported.current, 12);
    expect(
      result.values.proposed_annual_refrigeration_kWh
    ).toBeCloseTo(supported.proposed, 12);
    expect(result.selectionRule).toBe(
      "EXACT_SAME_COMPONENT_AND_EQUIPMENT_CLASS_ROW_BASELINE_TO_TSL_3"
    );
  }
});

test("publishes both exact ITC-49 formula terms with canonical units and scope", () => {
  const result = mapDoeWalkInBenchmarkToItc49(
    database,
    exactPanelInput
  );
  expect(result.values).toEqual({
    current_annual_refrigeration_kWh: 950,
    proposed_annual_refrigeration_kWh: 520
  });
  expect(result.formulaBindings).toEqual([
    expect.objectContaining({
      formulaTerm: "current_annual_refrigeration_kWh",
      value: 950,
      unit: "kWh/year",
      scope: "PER_EQUIPMENT_UNIT"
    }),
    expect.objectContaining({
      formulaTerm: "proposed_annual_refrigeration_kWh",
      value: 520,
      unit: "kWh/year",
      scope: "PER_EQUIPMENT_UNIT"
    })
  ]);
  const calculationId =
    recordDoeWalkInBenchmark(database, result);
  expect(
    database.prepare(`
      SELECT
        formula_term AS formulaTerm,
        value,
        unit,
        scope
      FROM selected_values
      WHERE calculation_run_id = ?
      ORDER BY formula_term
    `).all(calculationId)
  ).toEqual([
    {
      formulaTerm:
        "current_annual_refrigeration_kWh",
      value: 950,
      unit: "kWh/year",
      scope: "PER_EQUIPMENT_UNIT"
    },
    {
      formulaTerm:
        "proposed_annual_refrigeration_kWh",
      value: 520,
      unit: "kWh/year",
      scope: "PER_EQUIPMENT_UNIT"
    }
  ]);
  expect(
    database.prepare(`
      SELECT source_fields_json AS sourceFieldsJson
      FROM selected_value_provenance
      WHERE selected_value_id =
        ?
    `).get(
      `${calculationId}:current_annual_refrigeration_kWh`
    )
  ).toMatchObject({
    sourceFieldsJson: expect.stringContaining(
      "Table IV.31, PS.L baseline"
    )
  });
});

test("fails closed outside the reviewed row and exact class dimensions", () => {
  for (const incompatible of [
    { componentType: "DOOR" },
    { temperatureClass: "MEDIUM" },
    { indoorOutdoorConfiguration: "INDOOR" },
    { existingEfficiencyLevel: "TSL_1" },
    { proposedEfficiencyLevel: "TSL_2" }
  ]) {
    expect(() =>
      mapDoeWalkInBenchmarkToItc49(database, {
        ...exactPanelInput,
        ...incompatible
      })
    ).toThrow(/INCOMPATIBLE_DOE_WALKIN_SCOPE/);
  }
  expect(() =>
    mapDoeWalkInBenchmarkToItc49(database, {
      ...exactPanelInput,
      equipmentClass: "DW.M",
      componentType: "DOOR",
      panelAreaFt2: undefined
    })
  ).toThrow(/INCOMPATIBLE_DOE_WALKIN_SCOPE/);
  expect(() =>
    mapDoeWalkInBenchmarkToItc49(database, {
      ...supportedCases[8].input,
      equipmentClass: "SPU.H.I"
    })
  ).toThrow(/INCOMPATIBLE_DOE_WALKIN_SCOPE/);
  expect(() =>
    mapDoeWalkInBenchmarkToItc49(database, {
      ...exactPanelInput,
      panelAreaFt2: undefined
    })
  ).toThrow(/INVALID_PROJECT_INPUT/);
  expect(() =>
    mapDoeWalkInBenchmarkToItc49(database, {
      ...supportedCases[3].input,
      panelAreaFt2: 100
    })
  ).toThrow(/INCOMPATIBLE_DOE_WALKIN_SCOPE/);
});

test("fails source-title, table-row, and fixture-value mutations", () => {
  const changedTitle = structuredClone(evidence);
  changedTitle.pages[2] = changedTitle.pages[2].replace(
    "Energy Conservation Standards for Walk-in",
    "Energy Guidelines for Walk-in"
  );
  expect(() =>
    schemaFromDoeWalkInEvidence(
      changedTitle,
      reviewedFixture
    )
  ).toThrow(/DOE_WALKIN_SOURCE_SCHEMA_DRIFT/);

  const changedRow = structuredClone(evidence);
  changedRow.pages[164] = changedRow.pages[164].replace(
    "5.8 5.8 5.7 4.0",
    "5.9 5.8 5.7 4.0"
  );
  expect(() =>
    schemaFromDoeWalkInEvidence(
      changedRow,
      reviewedFixture
    )
  ).toThrow(/DOE_WALKIN_SOURCE_SCHEMA_DRIFT/);

  const changedFixture = structuredClone(reviewedFixture);
  changedFixture.tables.find(
    ({ field }) => field === "panel_ps_l_tsl3"
  ).value = 5.3;
  expect(() =>
    schemaFromDoeWalkInEvidence(
      evidence,
      changedFixture
    )
  ).toThrow(/DOE_WALKIN_FIXTURE_SCHEMA_DRIFT/);
});

test("rejects a corrupt retained PDF", async () => {
  const corruptPath = join(temporaryRoot, "corrupt.pdf");
  await writeFile(corruptPath, "not the DOE source", "utf8");
  await expect(
    ingestDoeWalkInBenchmarks({
      artifactPath: corruptPath,
      fixturePath,
      database
    })
  ).rejects.toThrow(
    /ARTIFACT_SIZE_MISMATCH|CORRUPT_CHECKSUM/
  );
});

test("requires offline mode and never calls fetch", () => {
  const previousNetwork = process.env.OS_RESEARCH_NETWORK;
  const previousFetch = globalThis.fetch;
  let fetchCalls = 0;
  globalThis.fetch = async () => {
    fetchCalls += 1;
    throw new Error("network must not be called");
  };
  try {
    delete process.env.OS_RESEARCH_NETWORK;
    expect(() =>
      mapDoeWalkInBenchmarkToItc49(
        database,
        exactPanelInput
      )
    ).toThrow(/OFFLINE_GUARD_REQUIRED/);
    expect(fetchCalls).toBe(0);
  } finally {
    process.env.OS_RESEARCH_NETWORK = previousNetwork;
    globalThis.fetch = previousFetch;
  }
});
