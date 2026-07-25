import { spawnSync } from "node:child_process";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

import {
  assertNetworkDisabled,
  sha256Json,
  verifyArtifact
} from "../../lib/artifact.mjs";

export const SCOUT_COMMIT =
  "72bcf419eb1cb37379f163563344b0ec61507fd3";
export const SCOUT_REPOSITORY_URL = "https://github.com/trynthink/scout";
export const SCOUT_PREPARATION_RESULT = Object.freeze({
  byteSize: 4309,
  sha256: "9e1a8df3f7d498b6bf7651af191b165afb0551f41d84e4d04d17f050f76fe38c"
});
export const SCOUT_PREPARATION_OUTPUT = Object.freeze({
  byteSize: 599004,
  sha256: "f7b428a2e66d90b4bfc4cf6272d85f52b1aea88229ff3c3fb53e33f536eccf50"
});

const SCOUT_COMMERCIAL_BUILDING_TYPES = new Set([
  "assembly",
  "education",
  "food sales",
  "food service",
  "health care",
  "lodging",
  "large office",
  "small office",
  "mercantile/service",
  "warehouse",
  "other",
  "unspecified"
]);
const SCOUT_RESIDENTIAL_BUILDING_TYPES = new Set([
  "single family home",
  "multi family home",
  "mobile home"
]);

export const SCOUT_PINNED_FILES = Object.freeze({
  schema: Object.freeze({
    relativePath: "ecm_definitions/ecm_schema.json",
    byteSize: 39231,
    sha256: "d28cdc4fd33c65a03a05c0c08e5e222b1eaf26bb081670c5e081e78f7d1b07ed"
  }),
  lighting: Object.freeze({
    relativePath: "ecm_definitions/(C) 90.1 Lighting.json",
    byteSize: 3558,
    sha256: "f58f1dec2e3b4693339eae59a73cf018b637a5c34400ff6c62dae189cfe18baa"
  }),
  entryPoint: Object.freeze({
    relativePath: "scout/ecm_prep.py",
    byteSize: 863824,
    sha256: "639134208b7368e7a9cafe9975b8205ed8fe4b864cce10368167557cd5831848"
  }),
  configSchema: Object.freeze({
    relativePath: "scout/supporting_data/config_schema.yml",
    byteSize: 17699,
    sha256: "1e6eff0552e7f88ed276950eb77551089c283734bb45caf00174c8be1e9405c8"
  })
});

function parseJson(source, label) {
  try {
    return JSON.parse(source);
  } catch (error) {
    throw new Error(`SOURCE_SCHEMA_DRIFT: invalid ${label} JSON: ${error.message}`);
  }
}

function requireObject(value, label) {
  if (value === null || typeof value !== "object" || Array.isArray(value)) {
    throw new Error(`SOURCE_SCHEMA_DRIFT: ${label} must be an object`);
  }
  return value;
}

function values(value) {
  return Array.isArray(value) ? value : [value];
}

function enumSet(schema, definitionName) {
  const enumeration = schema.definitions?.[definitionName]?.enum;
  if (!Array.isArray(enumeration) || !enumeration.length) {
    throw new Error(
      `SOURCE_SCHEMA_DRIFT: Scout schema lacks ${definitionName} enumeration`
    );
  }
  return new Set(enumeration);
}

function validateEnumeration(value, allowed, field) {
  for (const candidate of values(value)) {
    if (typeof candidate !== "string" || !allowed.has(candidate)) {
      throw new Error(
        `SOURCE_SCHEMA_DRIFT: Scout ${field} has unsupported value ${candidate}`
      );
    }
  }
}

export function parseScoutSchema(source) {
  const schema = requireObject(parseJson(source, "Scout ECM schema"), "schema");
  if (schema.$id !== "https://scout.energy.gov/schemas/ecm/v1.0.0") {
    throw new Error(`SOURCE_SCHEMA_DRIFT: unexpected Scout schema id ${schema.$id}`);
  }
  if (schema.version !== "1.0.0") {
    throw new Error(
      `SOURCE_SCHEMA_DRIFT: unexpected Scout schema version ${schema.version}`
    );
  }
  if (!Array.isArray(schema.required) || !schema.required.length) {
    throw new Error("SOURCE_SCHEMA_DRIFT: Scout schema has no required fields");
  }
  for (const requiredDefinition of [
    "climateZoneEnum",
    "bldgTypeEnum",
    "endUseEnum",
    "structureTypeEnum",
    "fuelTypeEnum"
  ]) {
    enumSet(schema, requiredDefinition);
  }
  return schema;
}

export function parseScoutEcmDefinition(source, schema) {
  const ecm = requireObject(parseJson(source, "Scout ECM"), "ECM");
  for (const field of schema.required) {
    if (!Object.hasOwn(ecm, field) || ecm[field] === null) {
      throw new Error(`SOURCE_SCHEMA_DRIFT: Scout ECM missing ${field}`);
    }
  }
  if (typeof ecm.name !== "string" || !ecm.name.trim()) {
    throw new Error("SOURCE_SCHEMA_DRIFT: Scout ECM name must be a string");
  }
  validateEnumeration(
    ecm.climate_zone,
    enumSet(schema, "climateZoneEnum"),
    "climate_zone"
  );
  validateEnumeration(
    ecm.bldg_type,
    enumSet(schema, "bldgTypeEnum"),
    "bldg_type"
  );
  validateEnumeration(
    ecm.end_use,
    enumSet(schema, "endUseEnum"),
    "end_use"
  );
  validateEnumeration(
    ecm.structure_type,
    enumSet(schema, "structureTypeEnum"),
    "structure_type"
  );
  validateEnumeration(
    ecm.fuel_type,
    enumSet(schema, "fuelTypeEnum"),
    "fuel_type"
  );
  if (
    typeof ecm.energy_efficiency_units !== "string" &&
    !Array.isArray(ecm.energy_efficiency_units) &&
    (ecm.energy_efficiency_units === null ||
      typeof ecm.energy_efficiency_units !== "object")
  ) {
    throw new Error(
      "SOURCE_SCHEMA_DRIFT: Scout energy_efficiency_units has an unsupported shape"
    );
  }
  return ecm;
}

export function extractScoutConstantRelativeSavings(ecm, { buildingType }) {
  if (ecm.energy_efficiency_units !== "relative savings (constant)") {
    throw new Error(
      `UNSUPPORTED_SCOUT_EFFICIENCY_UNIT: ${JSON.stringify(ecm.energy_efficiency_units)}`
    );
  }
  const applicableBuildingTypes = values(ecm.bldg_type);
  if (
    !applicableBuildingTypes.includes("all") &&
    !(
      applicableBuildingTypes.includes("all commercial") &&
      SCOUT_COMMERCIAL_BUILDING_TYPES.has(buildingType)
    ) &&
    !(
      applicableBuildingTypes.includes("all residential") &&
      SCOUT_RESIDENTIAL_BUILDING_TYPES.has(buildingType)
    ) &&
    !applicableBuildingTypes.includes(buildingType)
  ) {
    throw new Error(
      `INCOMPATIBLE_SCOUT_MARKET: ${buildingType} is outside ${ecm.name}`
    );
  }
  let reductionFraction;
  if (typeof ecm.energy_efficiency === "number") {
    reductionFraction = ecm.energy_efficiency;
  } else {
    requireObject(ecm.energy_efficiency, "Scout energy_efficiency");
    if (!Object.hasOwn(ecm.energy_efficiency, buildingType)) {
      throw new Error(
        `MISSING_SCOUT_MARKET_VALUE: ${ecm.name} has no ${buildingType} value`
      );
    }
    reductionFraction = ecm.energy_efficiency[buildingType];
  }
  if (
    typeof reductionFraction !== "number" ||
    !Number.isFinite(reductionFraction) ||
    reductionFraction < 0 ||
    reductionFraction > 1
  ) {
    throw new Error(
      `SOURCE_SCHEMA_DRIFT: invalid Scout relative savings ${reductionFraction}`
    );
  }
  return {
    measureName: ecm.name,
    buildingType,
    climateZoneSelector: ecm.climate_zone,
    endUse: ecm.end_use,
    fuelType: ecm.fuel_type,
    reductionFraction,
    nativeUnit: ecm.energy_efficiency_units,
    source: ecm.energy_efficiency_source
  };
}

function requireExactArray(actual, expected, label) {
  if (
    !Array.isArray(actual) ||
    actual.length !== expected.length ||
    actual.some((value, index) => value !== expected[index])
  ) {
    throw new Error(
      `PREPARATION_PROOF_MISMATCH: unexpected ${label}`
    );
  }
}

function requireSha256(value, label) {
  if (
    typeof value !== "string" ||
    !/^[a-f0-9]{64}$/.test(value)
  ) {
    throw new Error(
      `PREPARATION_PROOF_MISMATCH: invalid ${label}`
    );
  }
}

export function parseScoutPreparationResult(source, inspection) {
  const result = requireObject(
    parseJson(source, "Scout preparation result"),
    "preparation result"
  );
  if (
    result.schemaVersion !==
    "operational-savings/scout-preparation-result-v1"
  ) {
    throw new Error(
      `PREPARATION_PROOF_MISMATCH: unexpected result schema ${result.schemaVersion}`
    );
  }
  const sourceMetadata = requireObject(
    result.source,
    "preparation source"
  );
  const expectedSource = {
    commitSha: inspection.commit,
    ecmSha256: inspection.artifacts.lighting.sha256,
    schemaSha256: inspection.artifacts.schema.sha256,
    entryPointSha256:
      inspection.artifacts.entryPoint.sha256,
    configSchemaSha256:
      inspection.artifacts.configSchema.sha256
  };
  for (const [field, expected] of Object.entries(expectedSource)) {
    if (sourceMetadata[field] !== expected) {
      throw new Error(
        `PREPARATION_PROOF_MISMATCH: ${field} does not match the pinned Scout source`
      );
    }
  }

  const execution = requireObject(
    result.execution,
    "preparation execution"
  );
  if (execution.entryPoint !== "scout/ecm_prep.py") {
    throw new Error(
      "PREPARATION_PROOF_MISMATCH: unexpected Scout entry point"
    );
  }
  requireExactArray(
    execution.arguments,
    [
      "--ecm_files",
      "(C) 90.1 Lighting",
      "--alt_regions",
      "AIA",
      "--no_scnd_lgt"
    ],
    "Scout execution arguments"
  );
  if (execution.networkMode !== "OS_SANDBOX_DENY_NETWORK") {
    throw new Error(
      "PREPARATION_PROOF_MISMATCH: Scout preparation was not network-isolated"
    );
  }
  if (
    !Number.isSafeInteger(execution.outputByteSize) ||
    execution.outputByteSize <= 0
  ) {
    throw new Error(
      "PREPARATION_PROOF_MISMATCH: invalid preparation output byte size"
    );
  }
  requireSha256(
    execution.outputSha256,
    "preparation output checksum"
  );
  if (
    execution.independentReplayCount < 2 ||
    execution.independentReplayOutputSha256 !==
      execution.outputSha256
  ) {
    throw new Error(
      "PREPARATION_PROOF_MISMATCH: independent Scout replay did not reproduce the output"
    );
  }

  const prepared = requireObject(
    result.preparedMeasure,
    "prepared measure"
  );
  if (
    prepared.name !== inspection.lighting.name ||
    prepared.endUse !== inspection.lighting.end_use ||
    prepared.fuelType !== inspection.lighting.fuel_type ||
    prepared.energyEfficiencyUnit !==
      inspection.lighting.energy_efficiency_units
  ) {
    throw new Error(
      "PREPARATION_PROOF_MISMATCH: prepared measure identity or units changed"
    );
  }
  requireExactArray(
    prepared.buildingTypes,
    inspection.lighting.bldg_type,
    "prepared building types"
  );
  const allowedClimateZones = enumSet(
    inspection.schema,
    "climateZoneEnum"
  );
  const allowedStructureTypes = enumSet(
    inspection.schema,
    "structureTypeEnum"
  );
  if (
    !Array.isArray(prepared.climateZones) ||
    !prepared.climateZones.length ||
    new Set(prepared.climateZones).size !==
      prepared.climateZones.length ||
    prepared.climateZones.some(
      (value) => !allowedClimateZones.has(value)
    )
  ) {
    throw new Error(
      "PREPARATION_PROOF_MISMATCH: invalid prepared climate zones"
    );
  }
  if (
    !Array.isArray(prepared.structureTypes) ||
    !prepared.structureTypes.length ||
    new Set(prepared.structureTypes).size !==
      prepared.structureTypes.length ||
    prepared.structureTypes.some(
      (value) => !allowedStructureTypes.has(value)
    )
  ) {
    throw new Error(
      "PREPARATION_PROOF_MISMATCH: invalid prepared structure types"
    );
  }

  const reductionFractions = requireObject(
    prepared.reductionFractions,
    "prepared reduction fractions"
  );
  requireExactArray(
    Object.keys(reductionFractions),
    prepared.buildingTypes,
    "prepared reduction fraction keys"
  );
  for (const buildingType of prepared.buildingTypes) {
    const sourceValue =
      inspection.lighting.energy_efficiency[buildingType];
    const preparedValue = reductionFractions[buildingType];
    if (
      !Number.isFinite(preparedValue) ||
      preparedValue < 0 ||
      preparedValue > 1 ||
      preparedValue !== sourceValue
    ) {
      throw new Error(
        `PREPARATION_PROOF_MISMATCH: invalid ${buildingType} reduction fraction`
      );
    }
  }

  const annualResults = result.annualModelResults;
  if (!Array.isArray(annualResults)) {
    throw new Error(
      "PREPARATION_PROOF_MISMATCH: annual model results must be an array"
    );
  }
  const expectedAnnualKeys = new Set(
    [
      "Technical potential",
      "Max adoption potential"
    ].flatMap((scenario) =>
      [2026, 2030, 2050].map(
        (year) => `${scenario}:${year}`
      )
    )
  );
  const observedAnnualKeys = new Set();
  for (const row of annualResults) {
    requireObject(row, "annual model result");
    const key = `${row.adoptionScenario}:${row.year}`;
    if (
      !expectedAnnualKeys.has(key) ||
      observedAnnualKeys.has(key)
    ) {
      throw new Error(
        `PREPARATION_PROOF_MISMATCH: unexpected or duplicate annual result ${key}`
      );
    }
    if (
      !Number.isFinite(row.baselineEnergyMmbtu) ||
      row.baselineEnergyMmbtu <= 0 ||
      !Number.isFinite(row.efficientEnergyMmbtu) ||
      row.efficientEnergyMmbtu < 0 ||
      row.efficientEnergyMmbtu >
        row.baselineEnergyMmbtu
    ) {
      throw new Error(
        `PREPARATION_PROOF_MISMATCH: invalid annual energy result ${key}`
      );
    }
    const calculatedReduction =
      1 -
      row.efficientEnergyMmbtu /
        row.baselineEnergyMmbtu;
    if (
      !Number.isFinite(row.aggregateReductionFraction) ||
      Math.abs(
        calculatedReduction -
          row.aggregateReductionFraction
      ) > 1e-12
    ) {
      throw new Error(
        `PREPARATION_PROOF_MISMATCH: invalid aggregate reduction ${key}`
      );
    }
    observedAnnualKeys.add(key);
  }
  if (
    observedAnnualKeys.size !== expectedAnnualKeys.size
  ) {
    throw new Error(
      "PREPARATION_PROOF_MISMATCH: annual Scout result coverage is incomplete"
    );
  }
  return result;
}

export function parseScoutPreparationOutput(
  source,
  preparedResult
) {
  const output = parseJson(
    source,
    "Scout ecm_prep output"
  );
  if (!Array.isArray(output) || output.length !== 1) {
    throw new Error(
      "PREPARATION_OUTPUT_MISMATCH: expected exactly one prepared Scout measure"
    );
  }
  const measure = requireObject(
    output[0],
    "prepared Scout measure"
  );
  const expected =
    preparedResult.preparedMeasure;
  if (
    measure.name !== expected.name ||
    measure.measure_type !== expected.measureType
  ) {
    throw new Error(
      "PREPARATION_OUTPUT_MISMATCH: prepared measure identity changed"
    );
  }
  requireExactArray(
    measure.climate_zone,
    expected.climateZones,
    "output climate zones"
  );
  requireExactArray(
    measure.bldg_type,
    expected.buildingTypes,
    "output building types"
  );
  requireExactArray(
    measure.structure_type,
    expected.structureTypes,
    "output structure types"
  );
  requireExactArray(
    measure.end_use?.primary,
    [expected.endUse],
    "output end use"
  );
  requireExactArray(
    measure.fuel_type?.primary,
    [expected.fuelType],
    "output fuel type"
  );
  if (
    measure.energy_efficiency_units?.primary !==
      expected.energyEfficiencyUnit
  ) {
    throw new Error(
      "PREPARATION_OUTPUT_MISMATCH: prepared efficiency unit changed"
    );
  }
  const outputReductionFractions = requireObject(
    measure.energy_efficiency?.primary,
    "output reduction fractions"
  );
  for (const buildingType of expected.buildingTypes) {
    if (
      outputReductionFractions[buildingType] !==
      expected.reductionFractions[buildingType]
    ) {
      throw new Error(
        `PREPARATION_OUTPUT_MISMATCH: output ${buildingType} reduction fraction changed`
      );
    }
  }
  requireExactArray(
    measure.usr_opts?.ecm_files,
    ["(C) 90.1 Lighting"],
    "output selected ECMs"
  );
  if (
    measure.usr_opts?.no_scnd_lgt !== true ||
    measure.usr_opts?.alt_regions !== "AIA"
  ) {
    throw new Error(
      "PREPARATION_OUTPUT_MISMATCH: output Scout options changed"
    );
  }

  for (const row of preparedResult.annualModelResults) {
    const totals =
      measure.markets?.[row.adoptionScenario]
        ?.master_mseg?.energy?.total;
    const year = String(row.year);
    if (
      totals?.baseline?.[year] !==
        row.baselineEnergyMmbtu ||
      totals?.efficient?.[year] !==
        row.efficientEnergyMmbtu
    ) {
      throw new Error(
        `PREPARATION_OUTPUT_MISMATCH: annual model output ${row.adoptionScenario}:${year} changed`
      );
    }
  }
  return measure;
}

export function verifyScoutCommit(repositoryPath) {
  const result = spawnSync(
    "git",
    ["-C", repositoryPath, "rev-parse", "HEAD"],
    {
      encoding: "utf8",
      env: {
        ...process.env,
        GIT_CONFIG_NOSYSTEM: "1",
        GIT_TERMINAL_PROMPT: "0"
      }
    }
  );
  if (result.status !== 0) {
    throw new Error(
      `SOURCE_REPOSITORY_INVALID: ${result.stderr.trim() || "git rev-parse failed"}`
    );
  }
  const commit = result.stdout.trim();
  if (commit !== SCOUT_COMMIT) {
    throw new Error(
      `SOURCE_COMMIT_MISMATCH: expected ${SCOUT_COMMIT}, received ${commit}`
    );
  }
  return commit;
}

export async function inspectScoutRepository(repositoryPath) {
  assertNetworkDisabled();
  const commit = verifyScoutCommit(repositoryPath);
  const schemaPath = join(repositoryPath, SCOUT_PINNED_FILES.schema.relativePath);
  const lightingPath = join(
    repositoryPath,
    SCOUT_PINNED_FILES.lighting.relativePath
  );
  const entryPointPath = join(
    repositoryPath,
    SCOUT_PINNED_FILES.entryPoint.relativePath
  );
  const configSchemaPath = join(
    repositoryPath,
    SCOUT_PINNED_FILES.configSchema.relativePath
  );
  const [
    schemaArtifact,
    lightingArtifact,
    entryPointArtifact,
    configSchemaArtifact
  ] = await Promise.all([
    verifyArtifact(schemaPath, SCOUT_PINNED_FILES.schema),
    verifyArtifact(lightingPath, SCOUT_PINNED_FILES.lighting),
    verifyArtifact(
      entryPointPath,
      SCOUT_PINNED_FILES.entryPoint
    ),
    verifyArtifact(
      configSchemaPath,
      SCOUT_PINNED_FILES.configSchema
    )
  ]);
  const schema = parseScoutSchema(await readFile(schemaPath, "utf8"));
  const lighting = parseScoutEcmDefinition(
    await readFile(lightingPath, "utf8"),
    schema
  );
  const observedSchema = {
    format: "GIT_PINNED_JSON_SCHEMA_AND_ECM_JSON",
    schemaId: schema.$id,
    schemaVersion: schema.version,
    requiredFields: [...schema.required],
    enumerations: {
      climateZone: [...enumSet(schema, "climateZoneEnum")],
      buildingType: [...enumSet(schema, "bldgTypeEnum")],
      endUse: [...enumSet(schema, "endUseEnum")],
      structureType: [...enumSet(schema, "structureTypeEnum")],
      fuelType: [...enumSet(schema, "fuelTypeEnum")]
    },
    inspectedEcm: {
      name: lighting.name,
      climateZoneShape: Array.isArray(lighting.climate_zone)
        ? "array"
        : typeof lighting.climate_zone,
      buildingTypeShape: Array.isArray(lighting.bldg_type)
        ? "array"
        : typeof lighting.bldg_type,
      energyEfficiencyShape: Array.isArray(lighting.energy_efficiency)
        ? "array"
        : typeof lighting.energy_efficiency,
      energyEfficiencyUnit: lighting.energy_efficiency_units
    },
    preparationInterface: {
      entryPoint:
        SCOUT_PINNED_FILES.entryPoint.relativePath,
      entryPointSha256: entryPointArtifact.sha256,
      configSchema:
        SCOUT_PINNED_FILES.configSchema.relativePath,
      configSchemaSha256: configSchemaArtifact.sha256
    }
  };
  return {
    commit,
    artifacts: {
      schema: schemaArtifact,
      lighting: lightingArtifact,
      entryPoint: entryPointArtifact,
      configSchema: configSchemaArtifact
    },
    schema,
    lighting,
    observedSchema,
    schemaFingerprintSha256: sha256Json(observedSchema)
  };
}
