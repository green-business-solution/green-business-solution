import {
  mkdtemp,
  readdir,
  readFile,
  rm,
  writeFile
} from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import {
  afterAll,
  afterEach,
  beforeAll,
  beforeEach,
  expect,
  test
} from "vitest";

import {
  SCOUT_PREPARATION_OUTPUT,
  SCOUT_PREPARATION_RESULT,
  extractScoutConstantRelativeSavings,
  inspectScoutRepository,
  parseScoutEcmDefinition,
  parseScoutPreparationOutput,
  parseScoutPreparationResult
} from "../adapters/scout/inspect-schema.mjs";
import {
  DEFAULT_SCOUT_PREPARATION_OUTPUT_PATH,
  DEFAULT_SCOUT_PREPARATION_RESULT_PATH,
  ingestScoutPreparedMeasure,
  inspectScoutLightingMeasure,
  mapScoutPreparedMeasureToItc14,
  recordScoutFormulaMapping,
  resolveExactScoutReduction,
  rejectUnreviewedScoutCrosswalk,
  scoutBuildingMeasureId
} from "../adapters/scout/run.mjs";
import { openResearchDatabase } from "../lib/sqlite.mjs";

const repoRoot = fileURLToPath(new URL("../../../..", import.meta.url));
const repositoryPath = join(
  repoRoot,
  "scripts/research/operational-savings/.cache/repos/scout"
);
const proofPath = join(
  repoRoot,
  "scripts/research/operational-savings/adapters/scout/proof.json"
);
let previousNetworkMode;
let database;
let ingestion;
let temporaryRoot;

beforeAll(async () => {
  process.env.OS_RESEARCH_NETWORK = "disabled";
  temporaryRoot = await mkdtemp(
    join(tmpdir(), "retrofi-scout-proof-")
  );
  database = await openResearchDatabase(
    join(temporaryRoot, "research.sqlite"),
    { deferReleasePublicationUntilClose: true }
  );
  ingestion = await ingestScoutPreparedMeasure({
    repositoryPath,
    database
  });
});

afterAll(async () => {
  database?.close();
  if (temporaryRoot) {
    await rm(temporaryRoot, {
      recursive: true,
      force: true
    });
  }
});

beforeEach(() => {
  previousNetworkMode = process.env.OS_RESEARCH_NETWORK;
  process.env.OS_RESEARCH_NETWORK = "disabled";
});

afterEach(() => {
  if (previousNetworkMode === undefined) {
    delete process.env.OS_RESEARCH_NETWORK;
  } else {
    process.env.OS_RESEARCH_NETWORK = previousNetworkMode;
  }
});

test("verifies the pinned Scout commit, schema, and source ECM checksums", async () => {
  const inspection = await inspectScoutRepository(repositoryPath);
  expect(inspection.commit).toBe(
    "72bcf419eb1cb37379f163563344b0ec61507fd3"
  );
  expect(inspection.schema.$id).toBe(
    "https://scout.energy.gov/schemas/ecm/v1.0.0"
  );
  expect(inspection.schema.required).toContain("energy_efficiency");
  expect(inspection.schema.required).toContain("energy_efficiency_units");
  expect(inspection.artifacts.lighting.sha256).toBe(
    "f58f1dec2e3b4693339eae59a73cf018b637a5c34400ff6c62dae189cfe18baa"
  );
  expect(inspection.artifacts.entryPoint).toMatchObject({
    byteSize: 863824,
    sha256:
      "639134208b7368e7a9cafe9975b8205ed8fe4b864cce10368167557cd5831848"
  });
  expect(inspection.artifacts.configSchema).toMatchObject({
    byteSize: 17699,
    sha256:
      "1e6eff0552e7f88ed276950eb77551089c283734bb45caf00174c8be1e9405c8"
  });
  expect(inspection.observedSchema.inspectedEcm.energyEfficiencyShape).toBe(
    "object"
  );
});

test("validates the independently replayed offline Scout ecm_prep result", async () => {
  expect(ingestion.preparationResultArtifact).toMatchObject(
    SCOUT_PREPARATION_RESULT
  );
  expect(ingestion.preparationOutputArtifact).toMatchObject(
    SCOUT_PREPARATION_OUTPUT
  );
  expect(ingestion.preparedResult.execution).toMatchObject({
    entryPoint: "scout/ecm_prep.py",
    arguments: [
      "--ecm_files",
      "(C) 90.1 Lighting",
      "--alt_regions",
      "AIA",
      "--no_scnd_lgt"
    ],
    networkMode: "OS_SANDBOX_DENY_NETWORK",
    outputByteSize: 599004,
    outputSha256:
      "f7b428a2e66d90b4bfc4cf6272d85f52b1aea88229ff3c3fb53e33f536eccf50",
    independentReplayCount: 2,
    independentReplayOutputSha256:
      "f7b428a2e66d90b4bfc4cf6272d85f52b1aea88229ff3c3fb53e33f536eccf50"
  });
  expect(
    ingestion.preparedResult.preparedMeasure
      .reductionFractions["small office"]
  ).toBe(0.2);
  expect(
    ingestion.preparedResult.annualModelResults
  ).toHaveLength(6);
  for (
    const row of
    ingestion.preparedResult.annualModelResults
  ) {
    expect(row.aggregateReductionFraction).toBeCloseTo(
      1 -
        row.efficientEnergyMmbtu /
          row.baselineEnergyMmbtu,
      12
    );
  }
  expect(ingestion.preparedOutput).toMatchObject({
    name: "(C) 90.1 Lighting",
    measure_type: "add-on",
    energy_efficiency_units: {
      primary: "relative savings (constant)",
      secondary: null
    }
  });
});

test("extracts only the exact source-native building-type relative savings", async () => {
  const result = await inspectScoutLightingMeasure({
    repositoryPath,
    buildingType: "small office"
  });
  expect(result.sourceValue).toMatchObject({
    measureName: "(C) 90.1 Lighting",
    buildingType: "small office",
    endUse: "lighting",
    fuelType: "electricity",
    reductionFraction: 0.2,
    nativeUnit: "relative savings (constant)"
  });
  expect(result.provenance.sourceVersion).toContain(
    "72bcf419eb1cb37379f163563344b0ec61507fd3"
  );
  expect(result.provenance.artifactSha256).toBe(
    "f58f1dec2e3b4693339eae59a73cf018b637a5c34400ff6c62dae189cfe18baa"
  );
});

test("publishes the preparation interface, ten market rows, and six model outputs", () => {
  expect(ingestion.normalizedTargets).toEqual([
    "scout_preparation_runs",
    "scout_prepared_ecm_values",
    "scout_prepared_ecm_annual_results",
    "building_upgrade_measures"
  ]);
  expect(
    database.prepare(`
      SELECT count(*) AS count
      FROM scout_prepared_ecm_values
    `).get().count
  ).toBe(10);
  expect(
    database.prepare(`
      SELECT count(*) AS count
      FROM scout_prepared_ecm_annual_results
    `).get().count
  ).toBe(6);
  expect(
    database.prepare(`
      SELECT
        commit_sha AS commitSha,
        entry_point AS entryPoint,
        network_mode AS networkMode,
        output_sha256 AS outputSha256,
        independent_replay_count AS replayCount
      FROM scout_preparation_runs
    `).get()
  ).toEqual({
    commitSha:
      "72bcf419eb1cb37379f163563344b0ec61507fd3",
    entryPoint: "scout/ecm_prep.py",
    networkMode: "OS_SANDBOX_DENY_NETWORK",
    outputSha256:
      "f7b428a2e66d90b4bfc4cf6272d85f52b1aea88229ff3c3fb53e33f536eccf50",
    replayCount: 2
  });
  expect(
    database.prepare(`
      SELECT package_name AS packageName,
        commit_sha AS commitSha,
        executable_sha256 AS executableSha256
      FROM model_versions
      WHERE standard_id = 'STD-SCOUT-ECM-SCREEN'
    `).get()
  ).toEqual({
    packageName: "Scout ecm_prep",
    commitSha:
      "72bcf419eb1cb37379f163563344b0ec61507fd3",
    executableSha256:
      "639134208b7368e7a9cafe9975b8205ed8fe4b864cce10368167557cd5831848"
  });
  expect(
    database.prepare("PRAGMA foreign_key_check").all()
  ).toEqual([]);
});

test("scopes the building measure identity to the exact Scout release", () => {
  const nativeMeasureId =
    ingestion.preparedResult.preparedMeasure.name;
  const currentId = scoutBuildingMeasureId(
    nativeMeasureId,
    ingestion.releaseId
  );
  const laterId = scoutBuildingMeasureId(
    nativeMeasureId,
    "release:scout:later"
  );
  expect(laterId).not.toBe(currentId);
  expect(
    database.prepare(`
      SELECT id, source_release_id AS sourceReleaseId
      FROM building_upgrade_measures
      WHERE id = ?
    `).get(currentId)
  ).toEqual({
    id: currentId,
    sourceReleaseId: ingestion.releaseId
  });
});

test("maps only an exact prepared Scout market to the ITC-14 formula term", () => {
  const selectors = {
    measureName: "(C) 90.1 Lighting",
    buildingType: "small office",
    climateZone: "AIA_CZ3",
    structureType: "existing",
    endUse: "lighting",
    fuelType: "electricity"
  };
  const resolved = resolveExactScoutReduction(
    database,
    selectors
  );
  expect(resolved).toMatchObject({
    measureName: "(C) 90.1 Lighting",
    buildingType: "small office",
    endUse: "lighting",
    fuelType: "electricity",
    reductionFraction: 0.2,
    nativeUnit: "relative savings (constant)",
    preparationOutputSha256:
      "f7b428a2e66d90b4bfc4cf6272d85f52b1aea88229ff3c3fb53e33f536eccf50"
  });
  const mapped = mapScoutPreparedMeasureToItc14(
    database,
    selectors
  );
  expect(mapped.formulaBindings).toEqual([
    {
      formulaTerm: "Scout_reduction_fraction_r",
      value: 0.2,
      unit: "fraction",
      scope:
        "EXACT_SCOUT_MEASURE_AND_MARKET_SEGMENT"
    }
  ]);
  const calculationId = recordScoutFormulaMapping(
    database,
    mapped
  );
  expect(calculationId).toContain(
    `:${ingestion.releaseId}:`
  );
  expect(
    database.prepare(`
      SELECT formula_term AS formulaTerm, value, unit,
        scope, selection_rule AS selectionRule
      FROM selected_values
      WHERE calculation_run_id = ?
    `).get(calculationId)
  ).toEqual({
    formulaTerm: "Scout_reduction_fraction_r",
    value: 0.2,
    unit: "fraction",
    scope: "EXACT_SCOUT_MEASURE_AND_MARKET_SEGMENT",
    selectionRule:
      "EXACT_PREPARED_MEASURE_BUILDING_CLIMATE_STRUCTURE_END_USE_AND_FUEL"
  });
  expect(
    database.prepare(`
      SELECT source_artifact_id AS artifactId,
        filters_json AS filtersJson
      FROM selected_value_provenance
      WHERE selected_value_id = ?
    `).get(
      `${calculationId}:Scout_reduction_fraction_r`
    )
  ).toEqual({
    artifactId:
      "artifact:scout-commercial-901-lighting-72bcf419",
    filtersJson: JSON.stringify(selectors)
  });
});

test("rejects incompatible markets, unsupported units, and missing schema fields", async () => {
  const inspection = await inspectScoutRepository(repositoryPath);
  expect(() =>
    extractScoutConstantRelativeSavings(inspection.lighting, {
      buildingType: "mobile home"
    })
  ).toThrow(/INCOMPATIBLE_SCOUT_MARKET/);
  expect(() =>
    extractScoutConstantRelativeSavings(
      {
        ...inspection.lighting,
        bldg_type: "all commercial",
        energy_efficiency: 0.2
      },
      { buildingType: "mobile home" }
    )
  ).toThrow(/INCOMPATIBLE_SCOUT_MARKET/);
  expect(() =>
    extractScoutConstantRelativeSavings(
      { ...inspection.lighting, energy_efficiency_units: "lm/W" },
      { buildingType: "small office" }
    )
  ).toThrow(/UNSUPPORTED_SCOUT_EFFICIENCY_UNIT/);
  const missing = { ...inspection.lighting };
  delete missing.energy_efficiency;
  expect(() =>
    parseScoutEcmDefinition(JSON.stringify(missing), inspection.schema)
  ).toThrow(/missing energy_efficiency/);
});

test("fails closed on every non-exact prepared market selector", () => {
  const valid = {
    measureName: "(C) 90.1 Lighting",
    buildingType: "small office",
    climateZone: "AIA_CZ3",
    structureType: "existing",
    endUse: "lighting",
    fuelType: "electricity"
  };
  expect(() =>
    resolveExactScoutReduction(database, {
      ...valid,
      measureName: "LED lighting"
    })
  ).toThrow(/NO_EXACT_SCOUT_MARKET_MATCH/);
  expect(() =>
    resolveExactScoutReduction(database, {
      ...valid,
      buildingType: "mobile home"
    })
  ).toThrow(/NO_EXACT_SCOUT_MARKET_MATCH/);
  expect(() =>
    resolveExactScoutReduction(database, {
      ...valid,
      climateZone: "AIA_CZ9"
    })
  ).toThrow(/INCOMPATIBLE_SCOUT_MARKET/);
  expect(() =>
    resolveExactScoutReduction(database, {
      ...valid,
      structureType: "retrofit"
    })
  ).toThrow(/INCOMPATIBLE_SCOUT_MARKET/);
  expect(() =>
    resolveExactScoutReduction(database, {
      ...valid,
      endUse: "refrigeration"
    })
  ).toThrow(/NO_EXACT_SCOUT_MARKET_MATCH/);
});

test("rejects mixed commits, altered outputs, and prepared-value mutations", async () => {
  const inspection =
    await inspectScoutRepository(repositoryPath);
  const source = JSON.parse(
    await readFile(
      DEFAULT_SCOUT_PREPARATION_RESULT_PATH,
      "utf8"
    )
  );
  expect(() =>
    parseScoutPreparationResult(
      JSON.stringify({
        ...source,
        source: {
          ...source.source,
          commitSha: "0".repeat(40)
        }
      }),
      inspection
    )
  ).toThrow(/commitSha does not match/);
  expect(() =>
    parseScoutPreparationResult(
      JSON.stringify({
        ...source,
        execution: {
          ...source.execution,
          independentReplayOutputSha256:
            "0".repeat(64)
        }
      }),
      inspection
    )
  ).toThrow(/independent Scout replay/);
  expect(() =>
    parseScoutPreparationResult(
      JSON.stringify({
        ...source,
        preparedMeasure: {
          ...source.preparedMeasure,
          reductionFractions: {
            ...source.preparedMeasure.reductionFractions,
            "small office": 0.3
          }
        }
      }),
      inspection
    )
  ).toThrow(/small office reduction fraction/);
  const annualModelResults =
    structuredClone(source.annualModelResults);
  annualModelResults[0].aggregateReductionFraction = 0.5;
  expect(() =>
    parseScoutPreparationResult(
      JSON.stringify({
        ...source,
        annualModelResults
      }),
      inspection
    )
  ).toThrow(/invalid aggregate reduction/);

  const preparationOutput = JSON.parse(
    await readFile(
      DEFAULT_SCOUT_PREPARATION_OUTPUT_PATH,
      "utf8"
    )
  );
  preparationOutput[0].energy_efficiency.primary[
    "small office"
  ] = 0.3;
  expect(() =>
    parseScoutPreparationOutput(
      JSON.stringify(preparationOutput),
      source
    )
  ).toThrow(/output small office reduction fraction/);
});

test("rejects a corrupt retained preparation artifact before publication", async () => {
  const corruptPath = join(
    temporaryRoot,
    "corrupt-scout-preparation.json"
  );
  await writeFile(
    corruptPath,
    '{"schemaVersion":"corrupt"}\n',
    "utf8"
  );
  await expect(
    ingestScoutPreparedMeasure({
      repositoryPath,
      preparationResultPath: corruptPath,
      database
    })
  ).rejects.toThrow(
    /ARTIFACT_SIZE_MISMATCH|CORRUPT_CHECKSUM/
  );

  const corruptOutputPath = join(
    temporaryRoot,
    "corrupt-scout-output.json"
  );
  await writeFile(
    corruptOutputPath,
    '[{"name":"corrupt"}]\n',
    "utf8"
  );
  await expect(
    ingestScoutPreparedMeasure({
      repositoryPath,
      preparationOutputPath: corruptOutputPath,
      database
    })
  ).rejects.toThrow(
    /ARTIFACT_SIZE_MISMATCH|CORRUPT_CHECKSUM/
  );
});

test("requires offline mode and an independently reviewed crosswalk", async () => {
  const previousFetch = globalThis.fetch;
  let fetchCalls = 0;
  globalThis.fetch = async () => {
    fetchCalls += 1;
    throw new Error("network must not be called");
  };
  try {
    process.env.OS_RESEARCH_NETWORK = "disabled";
    expect(
      resolveExactScoutReduction(database, {
        measureName: "(C) 90.1 Lighting",
        buildingType: "small office",
        climateZone: "AIA_CZ3",
        structureType: "existing",
        endUse: "lighting",
        fuelType: "electricity"
      }).reductionFraction
    ).toBe(0.2);
    expect(fetchCalls).toBe(0);
    delete process.env.OS_RESEARCH_NETWORK;
    await expect(
      inspectScoutRepository(repositoryPath)
    ).rejects.toThrow(/OFFLINE_GUARD_REQUIRED/);
    expect(fetchCalls).toBe(0);
    expect(() => rejectUnreviewedScoutCrosswalk()).toThrow(
      /REVIEWED_CROSSWALK_REQUIRED/
    );
  } finally {
    globalThis.fetch = previousFetch;
  }
});

test("proves the pinned source inventory cannot supply ITC-05 or ITC-11", async () => {
  const definitionsPath = join(
    repositoryPath,
    "ecm_definitions"
  );
  const definitionFiles = (
    await readdir(definitionsPath)
  ).filter(
    (name) => name.endsWith(".json") &&
      name !== "ecm_schema.json"
  );
  const definitions = await Promise.all(
    definitionFiles.map(async (name) => ({
      name,
      source: await readFile(
        join(definitionsPath, name),
        "utf8"
      )
    }))
  );
  const ductCandidates = definitions.filter(
    ({ source }) => /\bduct(?:s|work)?\b/i.test(source)
  );
  const refrigerationControlCandidates =
    definitions.filter(({ source }) =>
      /anti[- ]sweat|floating head|evaporator fan|refrigeration control|case control/i.test(
        source
      )
    );
  expect(ductCandidates).toEqual([]);
  expect(refrigerationControlCandidates).toEqual([]);

  const airSealing = JSON.parse(
    await readFile(
      join(
        definitionsPath,
        "(C) BTO RDO Air Sealing (Exist).json"
      ),
      "utf8"
    )
  );
  expect(airSealing).toMatchObject({
    end_use: ["heating", "cooling"],
    technology: "infiltration",
    energy_efficiency_units: "CFM/ft^2 @ 0.3 in. w.c."
  });

  const refrigeration = JSON.parse(
    await readFile(
      join(
        definitionsPath,
        "(C) Best Refrigeration.json"
      ),
      "utf8"
    )
  );
  expect(refrigeration).toMatchObject({
    end_use: "refrigeration",
    energy_efficiency_units: "BTU out/BTU in"
  });
  expect(refrigeration.measure_type).toBe("full service");
});

test("claims only the exact ITC-14 screen and retains unrelated blockers", async () => {
  const manifest = JSON.parse(await readFile(proofPath, "utf8"));
  expect(manifest.processClaims).toHaveLength(3);
  expect(manifest.processClaims).toEqual(
    expect.arrayContaining([
      expect.objectContaining({
        categoryId: "ITC-14",
        processKey: "scout_ecm_screen",
        proofLevel: "END_TO_END_REAL"
      }),
      expect.objectContaining({
        categoryId: "ITC-05",
        processKey: "scout_ecm_screen",
        proofLevel: "SOURCE_UNSUPPORTED",
        sourceUnsupported: true
      }),
      expect.objectContaining({
        categoryId: "ITC-11",
        processKey: "scout_ecm_screen",
        proofLevel: "SOURCE_UNSUPPORTED",
        sourceUnsupported: true
      })
    ])
  );
  expect(
    Object.values(
      manifest.processClaims[0].gates
    ).every(Boolean)
  ).toBe(true);
  expect(manifest.remainingBlockers).toContain(
    "ITC-05 and ITC-11 are source-unsupported within the pinned Scout release because no compatible ECM supplies their required process outputs."
  );
});
