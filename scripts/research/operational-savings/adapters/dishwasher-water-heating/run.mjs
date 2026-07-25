import {
  assertNetworkDisabled,
  buildProvenance,
  sha256Json,
  verifyArtifact
} from "../../lib/artifact.mjs";
import { upsertSourceProof } from "../../lib/sqlite.mjs";
import {
  inspectDishwasherWaterHeatingSchema
} from "./inspect-schema.mjs";

export const DISHWASHER_CALCULATOR_ARTIFACT = Object.freeze({
  byteSize: 403484,
  sha256: "3d2abed1938bd1400378a2e0ca2095058fe490b2b599ef15f09056639f06fcd6"
});

export const DISHWASHER_CALCULATOR_URL =
  "https://www.energystar.gov/sites/default/files/2024-03/CFS%20Equipment%20Calculator.xlsx";

const STANDARD_ID = "STD-DISHWASHER-WATER-HEATING";
const SOURCE_ID = "source:energy-star-cfs-dishwasher-water-heating";
const SCHEMA_ID = "schema:energy-star-cfs-dishwasher-water-heating:2024-03";
const RELEASE_ID = "release:energy-star-cfs-calculator:2024-03:water-heating";
const ARTIFACT_ID = "artifact:energy-star-cfs-calculator:2024-03";
const MODEL_ID = "model:energy-star-dishwasher-water-heating:2024-03";
const MODEL_SCHEMA_ID =
  "model-schema:energy-star-dishwasher-water-heating:2024-03";
const ADAPTER_PATH =
  "scripts/research/operational-savings/adapters/dishwasher-water-heating/run.mjs";

const ASSUMPTIONS = Object.freeze({
  specificHeatBtuPerPoundF: 1,
  densityPoundsPerGallon: 8.208556149732619,
  btuPerKwh: 3413,
  btuPerTherm: 100000,
  buildingTemperatureRiseF: 70,
  boosterTemperatureRiseF: 40,
  electricHeaterEfficiency: 0.98,
  naturalGasHeaterEfficiency: 0.8
});

const MODEL_INPUT_SCHEMA = Object.freeze({
  resource: ["electric", "natural gas"],
  sanitationMethod: ["LOW_TEMPERATURE", "HIGH_TEMPERATURE"],
  nativeBasis: ["rack", "hour"],
  requiredNumbers: [
    "existingWaterQuantity",
    "proposedWaterQuantity",
    "buildingTemperatureRiseF",
    "waterHeaterEfficiency"
  ],
  conditionalNumbers: [
    "boosterTemperatureRiseF",
    "boosterHeaterEfficiency"
  ]
});

function requireFinite(value, label, { greaterThan = 0, maximum = null } = {}) {
  if (
    !Number.isFinite(value) ||
    value <= greaterThan ||
    (maximum !== null && value > maximum)
  ) {
    throw new Error(`INVALID_MODEL_INPUT: ${label}`);
  }
  return Number(value);
}

function resourceContract(resource) {
  if (resource === "electric") {
    return {
      nativeUnit: "kWh",
      btuPerResourceUnit: ASSUMPTIONS.btuPerKwh
    };
  }
  if (resource === "natural gas") {
    return {
      nativeUnit: "therm",
      btuPerResourceUnit: ASSUMPTIONS.btuPerTherm
    };
  }
  throw new Error(`UNSUPPORTED_RESOURCE: ${resource}`);
}

function sanitationContract(sanitationMethod) {
  if (sanitationMethod === "LOW_TEMPERATURE") return { booster: false };
  if (sanitationMethod === "HIGH_TEMPERATURE") return { booster: true };
  throw new Error(`UNSUPPORTED_SANITATION_METHOD: ${sanitationMethod}`);
}

function basisContract(nativeBasis) {
  if (nativeBasis === "rack") {
    return {
      waterUnit: "gallons/rack",
      resourceUnitSuffix: "rack",
      existingTerm: "water_heating_R_per_rack_existing",
      proposedTerm: "water_heating_R_per_rack_proposed",
      scope: "PER_EVENT",
      existingOutput:
        "Existing rack-machine water-heating resource per rack",
      proposedOutput:
        "Proposed rack-machine water-heating resource per rack"
    };
  }
  if (nativeBasis === "hour") {
    return {
      waterUnit: "gallons/hour",
      resourceUnitSuffix: "hour",
      existingTerm: "water_heating_R_per_hour_existing",
      proposedTerm: "water_heating_R_per_hour_proposed",
      scope: "PER_HOUR",
      existingOutput:
        "Existing flight or conveyor water-heating resource per operating hour",
      proposedOutput:
        "Proposed flight or conveyor water-heating resource per operating hour"
    };
  }
  throw new Error(`UNSUPPORTED_NATIVE_BASIS: ${nativeBasis}`);
}

function stageInputPerGallon({
  temperatureRiseF,
  efficiency,
  btuPerResourceUnit
}) {
  return (
    temperatureRiseF *
    ASSUMPTIONS.specificHeatBtuPerPoundF *
    ASSUMPTIONS.densityPoundsPerGallon /
    efficiency /
    btuPerResourceUnit
  );
}

function sourceFormulaInputs({
  resource,
  sanitationMethod,
  buildingTemperatureRiseF,
  boosterTemperatureRiseF,
  waterHeaterEfficiency,
  boosterHeaterEfficiency
}) {
  const resourceValues = resourceContract(resource);
  const sanitation = sanitationContract(sanitationMethod);
  const buildingRise = requireFinite(
    buildingTemperatureRiseF,
    "buildingTemperatureRiseF",
    { maximum: 180 }
  );
  const buildingEfficiency = requireFinite(
    waterHeaterEfficiency,
    "waterHeaterEfficiency",
    { maximum: 1 }
  );
  const stages = [
    {
      name: "building",
      temperatureRiseF: buildingRise,
      efficiency: buildingEfficiency,
      resourceInputPerGallon: stageInputPerGallon({
        temperatureRiseF: buildingRise,
        efficiency: buildingEfficiency,
        btuPerResourceUnit: resourceValues.btuPerResourceUnit
      })
    }
  ];
  if (sanitation.booster) {
    const boosterRise = requireFinite(
      boosterTemperatureRiseF,
      "boosterTemperatureRiseF",
      { maximum: 180 }
    );
    const boosterEfficiency = requireFinite(
      boosterHeaterEfficiency,
      "boosterHeaterEfficiency",
      { maximum: 1 }
    );
    stages.push({
      name: "booster",
      temperatureRiseF: boosterRise,
      efficiency: boosterEfficiency,
      resourceInputPerGallon: stageInputPerGallon({
        temperatureRiseF: boosterRise,
        efficiency: boosterEfficiency,
        btuPerResourceUnit: resourceValues.btuPerResourceUnit
      })
    });
  }
  return {
    ...resourceValues,
    stages,
    totalResourceInputPerGallon: stages.reduce(
      (total, stage) => total + stage.resourceInputPerGallon,
      0
    )
  };
}

function sourceProof(schema, artifact) {
  return {
    source: {
      id: SOURCE_ID,
      standardId: STANDARD_ID,
      organization: "U.S. Environmental Protection Agency",
      name: "ENERGY STAR Commercial Food Service Equipment Calculator",
      primaryUrl: DISHWASHER_CALCULATOR_URL,
      license: "U.S. EPA calculator",
      attribution: "ENERGY STAR, U.S. Environmental Protection Agency",
      accessMode: "PUBLIC_XLSX_DOWNLOAD"
    },
    schema: {
      id: SCHEMA_ID,
      fingerprintSha256: schema.fingerprintSha256,
      kind: "XLSX_EXACT_CELLS_AND_FORMULAS",
      observed: schema,
      inspectedAt: "2026-07-24T00:00:00.000Z"
    },
    release: {
      id: RELEASE_ID,
      version: "Workbook published March 2024",
      publishedAt: "2024-03-01T00:00:00.000Z",
      acquiredAt: "2026-07-23T00:00:00.000Z",
      status: "PUBLISHED"
    },
    artifact: {
      id: ARTIFACT_ID,
      sourceUrl: DISHWASHER_CALCULATOR_URL,
      localName: "energy-star-cfs-calculator.xlsx",
      mediaType:
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      byteSize: artifact.byteSize,
      sha256: artifact.sha256
    },
    ingestion: {
      id: "ingestion:energy-star-cfs-dishwasher-water-heating:2024-03:v1",
      adapterVersion: "dishwasher-water-heating-v1",
      startedAt: "2026-07-24T00:00:00.000Z",
      finishedAt: "2026-07-24T00:00:00.000Z",
      status: "SUCCEEDED",
      recordsRead: schema.requiredCells.length,
      recordsWritten: Object.keys(ASSUMPTIONS).length,
      warningCount: 0
    }
  };
}

export async function ingestDishwasherWaterHeatingWorkbook({
  artifactPath,
  database
}) {
  assertNetworkDisabled();
  const artifact = await verifyArtifact(
    artifactPath,
    DISHWASHER_CALCULATOR_ARTIFACT
  );
  const schema = await inspectDishwasherWaterHeatingSchema(artifactPath);
  upsertSourceProof(database, sourceProof(schema, artifact));
  database.prepare(`
    INSERT INTO model_versions (
      id, standard_id, package_name, version, commit_sha, executable_sha256
    ) VALUES (?, ?, ?, ?, NULL, ?)
    ON CONFLICT(id) DO UPDATE SET
      executable_sha256 = excluded.executable_sha256
  `).run(
    MODEL_ID,
    STANDARD_ID,
    "ENERGY STAR CFS Dishwasher Calcs local equation",
    "March 2024 workbook",
    artifact.sha256
  );
  database.prepare(`
    INSERT INTO model_input_schemas (
      id, model_version_id, module_name, fingerprint_sha256, schema_json
    ) VALUES (?, ?, ?, ?, ?)
    ON CONFLICT(id) DO UPDATE SET
      fingerprint_sha256 = excluded.fingerprint_sha256,
      schema_json = excluded.schema_json
  `).run(
    MODEL_SCHEMA_ID,
    MODEL_ID,
    "Dishwasher Calcs water-heating conversion",
    sha256Json(MODEL_INPUT_SCHEMA),
    JSON.stringify(MODEL_INPUT_SCHEMA)
  );
  const insertAssumption = database.prepare(`
    INSERT INTO calculation_assumptions (
      id, standard_id, assumption_key, value_json, unit, source_release_id
    ) VALUES (?, ?, ?, ?, ?, ?)
    ON CONFLICT(id) DO UPDATE SET
      value_json = excluded.value_json,
      unit = excluded.unit
  `);
  const units = {
    specificHeatBtuPerPoundF: "Btu/pound/degree F",
    densityPoundsPerGallon: "pounds/gallon",
    btuPerKwh: "Btu/kWh",
    btuPerTherm: "Btu/therm",
    buildingTemperatureRiseF: "degree F",
    boosterTemperatureRiseF: "degree F",
    electricHeaterEfficiency: "fraction",
    naturalGasHeaterEfficiency: "fraction"
  };
  for (const [key, value] of Object.entries(ASSUMPTIONS)) {
    insertAssumption.run(
      `energy-star-cfs-dishwasher:${key}`,
      STANDARD_ID,
      key,
      JSON.stringify(value),
      units[key],
      RELEASE_ID
    );
  }
  return {
    artifact,
    schema,
    assumptions: ASSUMPTIONS,
    normalizedTargets: [
      "model_versions",
      "model_input_schemas",
      "calculation_assumptions"
    ]
  };
}

export function mapDishwasherWaterHeatingToItc52({
  nativeBasis,
  sanitationMethod,
  resource,
  existingWaterQuantity,
  proposedWaterQuantity,
  buildingTemperatureRiseF,
  boosterTemperatureRiseF,
  waterHeaterEfficiency,
  boosterHeaterEfficiency
}) {
  assertNetworkDisabled();
  const basis = basisContract(nativeBasis);
  const existingWater = requireFinite(
    existingWaterQuantity,
    "existingWaterQuantity"
  );
  const proposedWater = requireFinite(
    proposedWaterQuantity,
    "proposedWaterQuantity"
  );
  const formula = sourceFormulaInputs({
    resource,
    sanitationMethod,
    buildingTemperatureRiseF,
    boosterTemperatureRiseF,
    waterHeaterEfficiency,
    boosterHeaterEfficiency
  });
  const existing = existingWater * formula.totalResourceInputPerGallon;
  const proposed = proposedWater * formula.totalResourceInputPerGallon;
  const nativeResourceUnit =
    `${formula.nativeUnit}/${basis.resourceUnitSuffix}`;
  const resultSet = {
    nativeBasis,
    sanitationMethod,
    resource,
    waterUnit: basis.waterUnit,
    nativeResourceUnit,
    sourceStages: formula.stages,
    totalResourceInputPerGallon:
      formula.totalResourceInputPerGallon,
    existing,
    proposed
  };
  return {
    standardId: STANDARD_ID,
    categoryId: "ITC-52",
    processKey: "dishwasher-water-heating-conversion",
    values: {
      dishwasher_water_heating_result: resultSet,
      [basis.existingTerm]: existing,
      [basis.proposedTerm]: proposed
    },
    formulaBindings: [
      {
        outputName: "Dishwasher water-heating result set",
        formulaTerm: "dishwasher_water_heating_result",
        value: resultSet,
        unit: "record set",
        scope: "RECORD_SET"
      },
      {
        outputName: basis.existingOutput,
        formulaTerm: basis.existingTerm,
        value: existing,
        nativeUnit: nativeResourceUnit,
        unit: nativeBasis === "rack"
          ? "resource/certified activity"
          : "resource/hour",
        scope: basis.scope
      },
      {
        outputName: basis.proposedOutput,
        formulaTerm: basis.proposedTerm,
        value: proposed,
        nativeUnit: nativeResourceUnit,
        unit: nativeBasis === "rack"
          ? "resource/certified activity"
          : "resource/hour",
        scope: basis.scope
      }
    ],
    provenance: buildProvenance({
      standardId: STANDARD_ID,
      artifact: DISHWASHER_CALCULATOR_ARTIFACT,
      sourceVersion: "Workbook published March 2024",
      sourceFields: [
        "Dishwasher Calcs!I18",
        "Dishwasher Calcs!I19",
        "Dishwasher Calcs!C20:D21",
        "Dishwasher Calcs!E20:E21",
        "Dishwasher Calcs!C39:D40",
        "General Assumptions!C62:C63"
      ],
      filters: {
        nativeBasis,
        sanitationMethod,
        resource,
        existingWaterQuantity,
        proposedWaterQuantity,
        buildingTemperatureRiseF,
        boosterTemperatureRiseF,
        waterHeaterEfficiency,
        boosterHeaterEfficiency
      },
      transformation:
        "Native water quantity multiplied by the exact ENERGY STAR water density, specific heat, temperature-rise, heater-efficiency, and resource-conversion equation",
      adapterPath: ADAPTER_PATH
    })
  };
}

export function recordDishwasherWaterHeatingRun(database, result) {
  assertNetworkDisabled();
  const inputHash = sha256Json(result.provenance.filters);
  const outputHash = sha256Json(result.values);
  const runId = `calculation:dishwasher-water-heating:${inputHash}`;
  database.prepare(`
    INSERT INTO calculation_runs (
      id, standard_id, process_key, source_release_id, model_version_id,
      adapter_version, input_sha256, output_sha256, network_disabled, status,
      created_at
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, 1, 'SUCCEEDED', ?)
    ON CONFLICT(id) DO UPDATE SET
      output_sha256 = excluded.output_sha256,
      status = excluded.status
  `).run(
    runId,
    STANDARD_ID,
    result.processKey,
    RELEASE_ID,
    MODEL_ID,
    "dishwasher-water-heating-v1",
    inputHash,
    outputHash,
    "2026-07-24T00:00:00.000Z"
  );
  const insertValue = database.prepare(`
    INSERT INTO selected_values (
      id, calculation_run_id, formula_term, value, unit, scope, selection_rule
    ) VALUES (?, ?, ?, ?, ?, ?, 'PINNED_SOURCE_EQUATION')
    ON CONFLICT(id) DO UPDATE SET
      value = excluded.value
  `);
  const insertProvenance = database.prepare(`
    INSERT INTO selected_value_provenance (
      selected_value_id, source_artifact_id, source_fields_json, filters_json,
      transformation, adapter_path
    ) VALUES (?, ?, ?, ?, ?, ?)
    ON CONFLICT(selected_value_id) DO UPDATE SET
      filters_json = excluded.filters_json,
      transformation = excluded.transformation
  `);
  for (const binding of result.formulaBindings.filter(
    (binding) => typeof binding.value === "number"
  )) {
    const id = `${runId}:${binding.formulaTerm}`;
    insertValue.run(
      id,
      runId,
      binding.formulaTerm,
      binding.value,
      binding.unit,
      binding.scope
    );
    insertProvenance.run(
      id,
      ARTIFACT_ID,
      JSON.stringify(result.provenance.sourceFields),
      JSON.stringify(result.provenance.filters),
      result.provenance.transformation,
      ADAPTER_PATH
    );
  }
  return runId;
}

export { ASSUMPTIONS, MODEL_INPUT_SCHEMA };
