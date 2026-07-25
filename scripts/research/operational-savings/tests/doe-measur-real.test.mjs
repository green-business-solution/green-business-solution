import {
  mkdtemp,
  readFile,
  rm
} from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import { afterEach, beforeEach, expect, test } from "vitest";

import {
  DOE_MEASUR_PINNED_FILES,
  DOE_MEASUR_SOURCE_SCHEMA_ID,
  assertCompressedAirNativeInterface,
  inspectDoeMeasurRepository
} from "../adapters/doe-measur/inspect-schema.mjs";
import {
  DOE_MEASUR_COMPRESSED_AIR_ESTIMATE_FIXTURE,
  mapDoeMeasurCompressedAirToItc43,
  publishDoeMeasurCompressedAirProof,
  runDoeMeasurCompressedAirGolden
} from "../adapters/doe-measur/run.mjs";
import {
  DOE_MEASUR_EQUIPMENT_GOLDEN_FIXTURE,
  mapDoeMeasurCoolingTowerToItc36,
  mapDoeMeasurFanToItc41,
  mapDoeMeasurMotorToItc38,
  mapDoeMeasurPsatToItc40,
  publishDoeMeasurEquipmentProof,
  runDoeMeasurEquipmentGolden
} from "../adapters/doe-measur/equipment.mjs";
import {
  DOE_MEASUR_EQUIPMENT_PINNED_FILES,
  assertEquipmentNativeInterfaces,
  inspectDoeMeasurEquipmentRepository
} from "../adapters/doe-measur/inspect-equipment-schema.mjs";
import { openResearchDatabase } from "../lib/sqlite.mjs";

const repoRoot = fileURLToPath(new URL("../../../..", import.meta.url));
const repositoryPath = join(
  repoRoot,
  "scripts/research/operational-savings/.cache/repos/amo-tools-suite"
);
const proofPath = join(
  repoRoot,
  "scripts/research/operational-savings/adapters/doe-measur/proof.json"
);
let previousNetworkMode;
let compressedAirExecutionPromise;
let changedCompressedAirExecutionPromise;
let equipmentExecutionPromise;
let changedEquipmentExecutionPromise;

function getCompressedAirExecution() {
  compressedAirExecutionPromise ??=
    runDoeMeasurCompressedAirGolden({
      repositoryPath
    });
  return compressedAirExecutionPromise;
}

function getEquipmentExecution() {
  equipmentExecutionPromise ??=
    runDoeMeasurEquipmentGolden({
      repositoryPath
    });
  return equipmentExecutionPromise;
}

function getChangedCompressedAirExecution() {
  changedCompressedAirExecutionPromise ??=
    runDoeMeasurCompressedAirGolden({
      repositoryPath,
      input: {
        ...DOE_MEASUR_COMPRESSED_AIR_ESTIMATE_FIXTURE,
        annualHours: 8000
      }
    });
  return changedCompressedAirExecutionPromise;
}

function getChangedEquipmentExecution() {
  if (!changedEquipmentExecutionPromise) {
    const input = structuredClone(
      DOE_MEASUR_EQUIPMENT_GOLDEN_FIXTURE
    );
    input.coolingTower.existingFanControlSpeedType =
      "VARIABLE";
    input.coolingTower.proposedFanControlSpeedType = "ONE";
    changedEquipmentExecutionPromise =
      runDoeMeasurEquipmentGolden({
        repositoryPath,
        input
      });
  }
  return changedEquipmentExecutionPromise;
}

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

test("verifies the pinned MEASUR commit and exact compressed-air interface", async () => {
  const inspection = await inspectDoeMeasurRepository(repositoryPath);
  expect(inspection.commit).toBe(
    "bdc33b837d39e3b30d2ad802cde9f49ec5df1e6b"
  );
  expect(inspection.artifacts.leakHeader.sha256).toBe(
    "6e8fd190d67677f94e9c4f1020cd7ddc46414a2a149c432ab8ad3577bdbb1319"
  );
  expect(inspection.nativeInterface.inputs).toContainEqual({
    name: "compressorElectricityData.compressorSpecificPower",
    nativeType: "double",
    unit: "kW/flow-unit"
  });
  expect(inspection.nativeInterface.outputs).toContainEqual({
    name: "totalFlowRate",
    nativeType: "double",
    unit: "flow/leak"
  });
  expect(inspection.schemaFingerprintSha256).toMatch(/^[a-f0-9]{64}$/);
});

test("compiles and executes the official native compressed-air golden fixture offline", async () => {
  const execution = await getCompressedAirExecution();
  expect(execution.result.networkMode).toBe(
    "macOS sandbox-exec deny network for compilation and execution"
  );
  expect(execution.result.nativeOutput).toEqual({
    annualTotalElectricity: 138.24,
    annualTotalElectricityCost: 16.5888,
    totalFlowRate: 0.1,
    annualTotalFlowRate: 51840
  });
  expect(execution.resultFingerprintSha256).toBe(
    "5fe9279a4194d6b51eb25553a6d4efc57fcb179438c274f4f7ac9b06d1d8e76b"
  );
  expect(execution.result.executableSha256).toMatch(
    /^[a-f0-9]{64}$/
  );
}, 30_000);

test("detects native binding or golden-fixture drift", async () => {
  const sources = Object.fromEntries(
    await Promise.all(
      ["leakHeader", "reductionHeader", "wasmBinding", "goldenTest"].map(
        async (key) => [
          key,
          await readFile(
            join(repositoryPath, DOE_MEASUR_PINNED_FILES[key].relativePath),
            "utf8"
          )
        ]
      )
    )
  );
  expect(() =>
    assertCompressedAirNativeInterface({
      ...sources,
      wasmBinding: sources.wasmBinding.replace(
        '.property("totalFlowRate"',
        '.property("renamedFlowRate"'
      )
    })
  ).toThrow(/calculator.cpp binding lacks/);
  expect(() =>
    assertCompressedAirNativeInterface({
      ...sources,
      goldenTest: sources.goldenTest.replace(
        "Approx(138.24)",
        "Approx(999.0)"
      )
    })
  ).toThrow(/CompressedAirLeakSurvey.unit.cpp lacks/);
});

test("requires offline mode and rejects unsupported or invalid project inputs", async () => {
  delete process.env.OS_RESEARCH_NETWORK;
  await expect(inspectDoeMeasurRepository(repositoryPath)).rejects.toThrow(
    /OFFLINE_GUARD_REQUIRED/
  );
  await expect(
    inspectDoeMeasurEquipmentRepository(repositoryPath)
  ).rejects.toThrow(/OFFLINE_GUARD_REQUIRED/);
  process.env.OS_RESEARCH_NETWORK = "disabled";
  await expect(
    runDoeMeasurCompressedAirGolden({
      repositoryPath,
      input: {
        ...DOE_MEASUR_COMPRESSED_AIR_ESTIMATE_FIXTURE,
        measurementMethod: "decibels"
      }
    })
  ).rejects.toThrow(
    /UNSUPPORTED_MEASUREMENT_METHOD/
  );
  await expect(
    runDoeMeasurCompressedAirGolden({
      repositoryPath,
      input: {
        ...DOE_MEASUR_COMPRESSED_AIR_ESTIMATE_FIXTURE,
        compressorSpecificPower: 0
      }
    })
  ).rejects.toThrow(
    /INCOMPATIBLE_UNIT_OR_VALUE.*compressorSpecificPower/
  );
  await expect(
    runDoeMeasurCompressedAirGolden({
      repositoryPath,
      input: {
        ...DOE_MEASUR_COMPRESSED_AIR_ESTIMATE_FIXTURE,
        annualHours: 1000.5
      }
    })
  ).rejects.toThrow(
    /INCOMPATIBLE_UNIT_OR_VALUE.*annualHours must be an integer/
  );
});

test("publishes native model execution and exact ITC-43 formula inputs to the research database", async () => {
  const workspace = await mkdtemp(
    join(tmpdir(), "doe-measur-database-proof-")
  );
  let database;
  try {
    const execution = await getCompressedAirExecution();
    const mapped =
      mapDoeMeasurCompressedAirToItc43(execution);
    expect(mapped.formulaBindings).toEqual([
      {
        outputName: "Measured leak flow",
        formulaTerm: "leak_flow",
        value: 0.1,
        unit: "flow/leak",
        scope: "PER_EQUIPMENT_UNIT"
      },
      {
        outputName: "Compressor specific power",
        formulaTerm: "compressor_specific_power",
        value: 0.16,
        unit: "kW/flow-unit",
        scope: "PER_EQUIPMENT_UNIT"
      }
    ]);
    database = await openResearchDatabase(
      join(workspace, "research.sqlite"),
      { deferReleasePublicationUntilClose: true }
    );
    const publication =
      publishDoeMeasurCompressedAirProof(
        database,
        execution,
        mapped
      );
    expect(publication.calculationId).toContain(
      "bdc33b837d39e3b30d2ad802cde9f49ec5df1e6b"
    );
    expect(publication.selectedValueIds).toHaveLength(2);
    expect(
      database.prepare(`
        SELECT id
        FROM model_input_schemas
        WHERE model_version_id = ?
      `).get(publication.modelVersionId).id
    ).toContain(
      "bdc33b837d39e3b30d2ad802cde9f49ec5df1e6b"
    );
    expect(
      database.prepare(`
        SELECT formula_term AS formulaTerm, value, unit, scope
        FROM selected_values
        WHERE calculation_run_id = ?
        ORDER BY formula_term
      `).all(publication.calculationId)
    ).toEqual([
      {
        formulaTerm: "compressor_specific_power",
        value: 0.16,
        unit: "kW/flow-unit",
        scope: "PER_EQUIPMENT_UNIT"
      },
      {
        formulaTerm: "leak_flow",
        value: 0.1,
        unit: "flow/leak",
        scope: "PER_EQUIPMENT_UNIT"
      }
    ]);
    expect(
      database.prepare("PRAGMA foreign_key_check").all()
    ).toEqual([]);
  } finally {
    database?.close();
    await rm(workspace, { recursive: true, force: true });
  }
}, 30_000);

test("classifies all five supported MEASUR module paths as end-to-end real", async () => {
  const manifest = JSON.parse(await readFile(proofPath, "utf8"));
  expect(
    manifest.processClaims.map(
      ({ categoryId, processKey, proofLevel }) => ({
        categoryId,
        processKey,
        proofLevel
      })
    )
  ).toEqual([
    {
      categoryId: "ITC-36",
      processKey: "doe_measur",
      proofLevel: "END_TO_END_REAL"
    },
    {
      categoryId: "ITC-38",
      processKey: "doe_measur",
      proofLevel: "END_TO_END_REAL"
    },
    {
      categoryId: "ITC-40",
      processKey: "doe_measur",
      proofLevel: "END_TO_END_REAL"
    },
    {
      categoryId: "ITC-41",
      processKey: "doe_measur",
      proofLevel: "END_TO_END_REAL"
    },
    {
      categoryId: "ITC-43",
      processKey: "doe_measur",
      proofLevel: "END_TO_END_REAL"
    }
  ]);
  for (const claim of manifest.processClaims) {
    expect(Object.values(claim.gates)).toEqual(
      Array(15).fill(true)
    );
  }
});

test("verifies the pinned MEASUR motor, PSAT, fan, and cooling-tower interfaces", async () => {
  const inspection =
    await inspectDoeMeasurEquipmentRepository(repositoryPath);
  expect(inspection.commit).toBe(
    "bdc33b837d39e3b30d2ad802cde9f49ec5df1e6b"
  );
  expect(Object.keys(inspection.artifacts)).toHaveLength(13);
  expect(inspection.pinnedSourceTree).toHaveLength(22);
  expect(
    inspection.nativeInterfaces.modules.motorEfficiency
      .outputFields
  ).toEqual([
    "existingEfficiency",
    "proposedEfficiency"
  ]);
  expect(
    inspection.nativeInterfaces.modules.psat.outputFields
  ).toContain("proposedInputKw");
  expect(
    inspection.nativeInterfaces.modules.fanSystemAssessment
      .outputFields
  ).toContain("proposedInputKw");
  expect(
    inspection.nativeInterfaces.modules.coolingTowerFan
      .outputFields
  ).toContain("avoidedFanEnergyKwh");
  expect(inspection.schemaFingerprintSha256).toBe(
    "cceb538e092ac2abebc8b033e30291408f6bdd08b1dd25ac64d9cd103884ac1d"
  );
});

test("compiles and executes the official motor, PSAT, fan, and cooling-tower golden fixtures offline", async () => {
  const execution = await getEquipmentExecution();
  expect(execution.result.networkMode).toBe(
    "macOS sandbox-exec deny network for compilation and execution"
  );
  expect(execution.result.nativeOutput).toEqual({
    motor: {
      existingEfficiency: 0.8867837735583464,
      proposedEfficiency: 0.9226247725330855
    },
    psat: {
      existingInputKw: 150,
      proposedInputKw: 149.64012475884022,
      existingPumpEfficiency: 0.3810942535343008,
      proposedPumpEfficiency: 0.382,
      existingAnnualEnergyMwh: 1314,
      proposedAnnualEnergyMwh: 1310.8474928874405
    },
    fan: {
      existingInputKw: 460,
      proposedInputKw: 460.00014402241186,
      existingFanEfficiency: 0.5953983150358069,
      proposedFanEfficiency: 0.595398315,
      existingAnnualEnergyMwh: 4029.6,
      proposedAnnualEnergyMwh: 4029.6012616363278
    },
    coolingTower: {
      existingFanPowerHp: 55.14996187617361,
      existingFanEnergyKwh: 41.141871559625514,
      proposedFanPowerHp: 44.78961473708352,
      proposedFanEnergyKwh: 33.41305259386431,
      avoidedFanEnergyKwh: 7.7288189657612065
    }
  });
  expect(execution.resultFingerprintSha256).toBe(
    "8f5c28ac75fdeb71889cc586326dcfc3ba8fc77d7b94081a6cfc903d3fe131f2"
  );
  expect(execution.result.executableSha256).toMatch(
    /^[a-f0-9]{64}$/
  );
}, 30_000);

test("keeps native executable identities stable when validated runtime inputs change", async () => {
  const compressedAirGolden =
    await getCompressedAirExecution();
  const changedCompressedAir =
    await getChangedCompressedAirExecution();
  expect(
    changedCompressedAir.result.executableSha256
  ).toBe(
    compressedAirGolden.result.executableSha256
  );
  expect(
    changedCompressedAir.result.nativeOutput
      .annualTotalElectricity
  ).toBe(128);

  const equipmentGolden = await getEquipmentExecution();
  const changedEquipment =
    await getChangedEquipmentExecution();
  expect(changedEquipment.result.executableSha256).toBe(
    equipmentGolden.result.executableSha256
  );
  expect(
    changedEquipment.result.nativeOutput.coolingTower
      .avoidedFanEnergyKwh
  ).toBeCloseTo(-7.7288189657612065, 12);
  expect(
    mapDoeMeasurCoolingTowerToItc36(changedEquipment)
      .formulaBindings[0].value
  ).toBeCloseTo(-7.7288189657612065, 12);
}, 15_000);

test("detects MEASUR equipment binding and golden-fixture drift", async () => {
  const sources = Object.fromEntries(
    await Promise.all(
      Object.entries(
        DOE_MEASUR_EQUIPMENT_PINNED_FILES
      ).map(async ([key, expected]) => [
        key,
        await readFile(
          join(repositoryPath, expected.relativePath),
          "utf8"
        )
      ])
    )
  );
  expect(() =>
    assertEquipmentNativeInterfaces({
      ...sources,
      motorBinding: sources.motorBinding.replace(
        '.function("calculate", &MotorEfficiency::calculate)',
        '.function("renamed", &MotorEfficiency::calculate)'
      )
    })
  ).toThrow(/motor\.cpp binding lacks/);
  expect(() =>
    assertEquipmentNativeInterfaces({
      ...sources,
      motorGoldenTest:
        sources.motorGoldenTest.replace(
          "Approx(0.9226247725)",
          "Approx(0.999)"
        )
    })
  ).toThrow(/MotorEfficiency\.unit\.cpp lacks/);
  expect(() =>
    assertEquipmentNativeInterfaces({
      ...sources,
      resultsGoldenTest:
        sources.resultsGoldenTest.replace(
          "CHECK(mod.motorPower == Approx(149.6401247588))",
          "CHECK(mod.motorPower == Approx(999.0))"
        )
    })
  ).toThrow(/Results\.unit\.cpp lacks/);
  expect(() =>
    assertEquipmentNativeInterfaces({
      ...sources,
      coolingTowerGoldenTest:
        sources.coolingTowerGoldenTest.replace(
          "CHECK(res.savingsEnergy == Approx(7.7288))",
          "CHECK(res.savingsEnergy == Approx(999.0))"
        )
    })
  ).toThrow(/CoolingTower\.unit\.cpp lacks/);
});

test("rejects incomplete or incompatible MEASUR equipment inputs before native execution", async () => {
  await expect(
    runDoeMeasurEquipmentGolden({
      repositoryPath,
      input: {
        ...DOE_MEASUR_EQUIPMENT_GOLDEN_FIXTURE,
        motor: {
          ...DOE_MEASUR_EQUIPMENT_GOLDEN_FIXTURE.motor,
          lineFrequencyHz: 55
        }
      }
    })
  ).rejects.toThrow(/lineFrequencyHz must be 50 or 60 Hz/);
  await expect(
    runDoeMeasurEquipmentGolden({
      repositoryPath,
      input: {
        ...DOE_MEASUR_EQUIPMENT_GOLDEN_FIXTURE,
        motor: {
          ...DOE_MEASUR_EQUIPMENT_GOLDEN_FIXTURE.motor,
          existingEfficiencyClass: "UNREVIEWED"
        }
      }
    })
  ).rejects.toThrow(/INCOMPATIBLE_ENUMERATION/);
  await expect(
    runDoeMeasurEquipmentGolden({
      repositoryPath,
      input: {
        ...DOE_MEASUR_EQUIPMENT_GOLDEN_FIXTURE,
        psat: {
          ...DOE_MEASUR_EQUIPMENT_GOLDEN_FIXTURE.psat,
          pumpEfficiency: 1.2
        }
      }
    })
  ).rejects.toThrow(/psat\.pumpEfficiency/);
  await expect(
    runDoeMeasurEquipmentGolden({
      repositoryPath,
      input: {
        ...DOE_MEASUR_EQUIPMENT_GOLDEN_FIXTURE,
        fan: {
          ...DOE_MEASUR_EQUIPMENT_GOLDEN_FIXTURE.fan,
          proposedFanEfficiency: 0
        }
      }
    })
  ).rejects.toThrow(/fan\.proposedFanEfficiency/);
  await expect(
    runDoeMeasurEquipmentGolden({
      repositoryPath,
      input: {
        ...DOE_MEASUR_EQUIPMENT_GOLDEN_FIXTURE,
        fan: {
          ...DOE_MEASUR_EQUIPMENT_GOLDEN_FIXTURE.fan,
          driveSpecifiedEfficiency: 1.2
        }
      }
    })
  ).rejects.toThrow(/fan\.driveSpecifiedEfficiency/);
  await expect(
    runDoeMeasurEquipmentGolden({
      repositoryPath,
      input: {
        ...DOE_MEASUR_EQUIPMENT_GOLDEN_FIXTURE,
        coolingTower: {
          ...DOE_MEASUR_EQUIPMENT_GOLDEN_FIXTURE
            .coolingTower,
          operatingWetBulbTemperatureF: 90
        }
      }
    })
  ).rejects.toThrow(/wet bulb < leaving water < entering water/);
});

test("maps native MEASUR equipment outputs to the exact ITC-36, ITC-38, ITC-40, and ITC-41 terms", async () => {
  const execution = await getEquipmentExecution();
  expect(
    mapDoeMeasurCoolingTowerToItc36(execution)
      .formulaBindings
  ).toEqual([
    {
      outputName:
        "Annual avoided cooling-tower fan electricity",
      formulaTerm: "avoided_fan_kWh",
      value: 7.7288189657612065,
      unit: "kWh/year",
      scope: "PROJECT_TOTAL"
    }
  ]);
  expect(
    mapDoeMeasurMotorToItc38(execution).formulaBindings
  ).toEqual([
    {
      outputName: "Existing motor efficiency",
      formulaTerm: "η_existing",
      value: 0.8867837735583464,
      unit: "fraction",
      scope: "PER_EQUIPMENT_UNIT"
    },
    {
      outputName: "Proposed motor efficiency",
      formulaTerm: "η_proposed",
      value: 0.9226247725330855,
      unit: "fraction",
      scope: "PER_EQUIPMENT_UNIT"
    }
  ]);
  expect(
    mapDoeMeasurPsatToItc40(execution).formulaBindings.map(
      ({ formulaTerm, value, unit }) => ({
        formulaTerm,
        value,
        unit
      })
    )
  ).toEqual([
    {
      formulaTerm: "existing_input_kW",
      value: 150,
      unit: "kW"
    },
    {
      formulaTerm: "proposed_input_kW",
      value: 149.64012475884022,
      unit: "kW"
    }
  ]);
  expect(
    mapDoeMeasurFanToItc41(execution).formulaBindings.map(
      ({ formulaTerm, value, unit }) => ({
        formulaTerm,
        value,
        unit
      })
    )
  ).toEqual([
    {
      formulaTerm: "existing_input_kW",
      value: 460,
      unit: "kW"
    },
    {
      formulaTerm: "proposed_input_kW",
      value: 460.00014402241186,
      unit: "kW"
    }
  ]);
}, 30_000);

test("publishes all four native MEASUR equipment calculations with provenance", async () => {
  const workspace = await mkdtemp(
    join(tmpdir(), "doe-measur-equipment-database-proof-")
  );
  let database;
  try {
    const execution = await getEquipmentExecution();
    database = await openResearchDatabase(
      join(workspace, "research.sqlite"),
      { deferReleasePublicationUntilClose: true }
    );
    const publication =
      publishDoeMeasurEquipmentProof(database, execution);
    expect(publication.calculations).toHaveLength(4);
    expect(
      publication.calculations.every(({ calculationId }) =>
        calculationId.includes(
          "bdc33b837d39e3b30d2ad802cde9f49ec5df1e6b"
        )
      )
    ).toBe(true);
    expect(publication.selectedValueIds).toHaveLength(7);
    expect(
      database.prepare(`
        SELECT process_key AS processKey, count(*) AS count
        FROM calculation_runs
        WHERE standard_id = 'STD-DOE-MEASUR'
        GROUP BY process_key
      `).all()
    ).toEqual([
      {
        processKey: "doe_measur",
        count: 4
      }
    ]);
    expect(
      database.prepare(`
        SELECT formula_term AS formulaTerm, unit, count(*) AS count
        FROM selected_values
        GROUP BY formula_term, unit
        ORDER BY formula_term
      `).all()
    ).toEqual([
      {
        formulaTerm: "avoided_fan_kWh",
        unit: "kWh/year",
        count: 1
      },
      {
        formulaTerm: "existing_input_kW",
        unit: "kW",
        count: 2
      },
      {
        formulaTerm: "proposed_input_kW",
        unit: "kW",
        count: 2
      },
      {
        formulaTerm: "η_existing",
        unit: "fraction",
        count: 1
      },
      {
        formulaTerm: "η_proposed",
        unit: "fraction",
        count: 1
      }
    ]);
    expect(
      database.prepare(`
        SELECT count(*) AS count
        FROM selected_value_provenance
      `).get().count
    ).toBe(7);
    expect(
      database.prepare(`
        SELECT count(*) AS count
        FROM model_input_schemas
        WHERE model_version_id = ?
      `).get(publication.modelVersionId).count
    ).toBe(4);
    expect(
      database.prepare(`
        SELECT count(*) AS count
        FROM model_input_schemas
        WHERE model_version_id = ?
          AND id LIKE ?
      `).get(
        publication.modelVersionId,
        "%bdc33b837d39e3b30d2ad802cde9f49ec5df1e6b%"
      ).count
    ).toBe(4);
    expect(
      database.prepare("PRAGMA foreign_key_check").all()
    ).toEqual([]);
  } finally {
    database?.close();
    await rm(workspace, { recursive: true, force: true });
  }
}, 30_000);

test("publishes multiple compressed-air and equipment runs without identity collisions", async () => {
  const workspace = await mkdtemp(
    join(tmpdir(), "doe-measur-combined-database-proof-")
  );
  let database;
  try {
    database = await openResearchDatabase(
      join(workspace, "research.sqlite"),
      { deferReleasePublicationUntilClose: true }
    );
    publishDoeMeasurCompressedAirProof(
      database,
      await getCompressedAirExecution()
    );
    publishDoeMeasurEquipmentProof(
      database,
      await getEquipmentExecution()
    );
    publishDoeMeasurCompressedAirProof(
      database,
      await getChangedCompressedAirExecution()
    );
    publishDoeMeasurEquipmentProof(
      database,
      await getChangedEquipmentExecution()
    );
    publishDoeMeasurCompressedAirProof(
      database,
      await getCompressedAirExecution()
    );
    expect(
      database.prepare(`
        SELECT
          (SELECT count(*) FROM model_versions) AS models,
          (SELECT count(*) FROM model_input_schemas) AS inputSchemas,
          (SELECT count(*) FROM calculation_runs) AS calculations,
          (SELECT count(*) FROM selected_values) AS selectedValues,
          (SELECT count(*) FROM source_artifacts) AS artifacts,
          (SELECT count(*) FROM calculation_warnings) AS warnings,
          (SELECT count(*) FROM schema_versions) AS sourceSchemas
      `).get()
    ).toEqual({
      models: 2,
      inputSchemas: 5,
      calculations: 7,
      selectedValues: 12,
      artifacts: 20,
      warnings: 7,
      sourceSchemas: 1
    });
    expect(
      database.prepare(`
        SELECT
          source.name,
          release.schema_version_id AS schemaVersionId
        FROM source_registry AS source
        JOIN source_releases AS release
          ON release.source_id = source.id
        WHERE source.id = 'source:doe-measur'
      `).get()
    ).toEqual({
      name: "AMO Tools Suite",
      schemaVersionId: DOE_MEASUR_SOURCE_SCHEMA_ID
    });
    expect(
      database.prepare(`
        SELECT count(*) AS count
        FROM calculation_runs AS run
        LEFT JOIN calculation_warnings AS warning
          ON warning.calculation_run_id = run.id
        WHERE warning.id IS NULL
      `).get().count
    ).toBe(0);
    expect(
      database.prepare("PRAGMA foreign_key_check").all()
    ).toEqual([]);
  } finally {
    database?.close();
    await rm(workspace, { recursive: true, force: true });
  }
}, 30_000);
