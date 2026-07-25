import { basename } from "node:path";
import { readFile } from "node:fs/promises";

import {
  assertNetworkDisabled,
  buildProvenance,
  sha256Json,
  verifyArtifact
} from "../../lib/artifact.mjs";
import { upsertSourceProof } from "../../lib/sqlite.mjs";
import {
  assertDishwasherRecordSchema,
  inspectEnergyStarDishwasherSchema
} from "./inspect-schema.mjs";

export const ENERGY_STAR_DISHWASHER_ARTIFACT = Object.freeze({
  byteSize: 370605,
  sha256: "a746b679f6ae2a9ce30f1fe115d1e279adccca49e684d3a6a35fc2e76fdb43ba"
});

export const ENERGY_STAR_DISHWASHER_METADATA_ARTIFACT =
  Object.freeze({
    byteSize: 54036,
    sha256:
      "9e37aca49d32907b588334205fb1c2293c8419191473f117d0e7a8a6e5061190"
});

export const OFFICIAL_DISHWASHER_QUERY_URL =
  "https://data.energystar.gov/resource/pk8q-dim8.json?$limit=50000&$order=pd_id";
export const OFFICIAL_DISHWASHER_METADATA_URL =
  "https://data.energystar.gov/api/views/pk8q-dim8";

const SOURCE_ID = "source:energy-star-commercial-dishwashers";
const SCHEMA_ID =
  "schema:energy-star-commercial-dishwashers:2026-07-24-full";
const RELEASE_ID =
  "release:energy-star-commercial-dishwashers:2026-07-24-full";
const ARTIFACT_ID =
  "artifact:energy-star-commercial-dishwashers:2026-07-24-full";
const METADATA_ARTIFACT_ID =
  "artifact:energy-star-commercial-dishwashers-metadata:2026-07-24";
const INGESTION_ID =
  "ingestion:energy-star-commercial-dishwashers:2026-07-24-full:v2";
const ADAPTER_PATH =
  "scripts/research/operational-savings/adapters/energy-star/run.mjs";
const ACQUIRED_AT = "2026-07-24T18:56:42.000Z";
const DATASET_UPDATED_AT = "2026-07-24T13:28:47.000Z";

function parseDecimal(value, field, {
  positive = false
} = {}) {
  if (
    typeof value !== "string" ||
    !/^-?(?:\d+(?:\.\d*)?|\.\d+)$/.test(value.trim())
  ) {
    throw new Error(`INVALID_SOURCE_NUMBER: ${field}`);
  }
  const number = Number(value);
  if (!Number.isFinite(number) || number < 0 || (positive && number === 0)) {
    throw new Error(`INVALID_SOURCE_NUMBER: ${field}`);
  }
  return number;
}

function parseOptionalDecimal(value, field, options) {
  return value === undefined
    ? null
    : parseDecimal(value, field, options);
}

export function energyStarDishwasherProductId(
  pdId,
  releaseId = RELEASE_ID
) {
  if (
    typeof releaseId !== "string" ||
    !releaseId ||
    typeof pdId !== "string" ||
    !pdId
  ) {
    throw new Error(
      "INVALID_RELEASE_SCOPED_PRODUCT_ID_INPUT"
    );
  }
  return (
    "energy-star:commercial-dishwasher:" +
    `${releaseId}:${pdId}`
  );
}

function exactModelKey(brand, modelNumber) {
  const normalizePart = (value) =>
    String(value ?? "")
      .normalize("NFKC")
      .trim()
      .toLocaleUpperCase("en-US")
      .replaceAll(/\s+/g, " ");
  return `${normalizePart(brand)}\u001f${normalizePart(modelNumber)}`;
}

function operatingModesForRecord(record) {
  const common = {
    waterGallonsPerRack: parseOptionalDecimal(
      record.water_use_gallons_per_rack_gpr,
      "water_use_gallons_per_rack_gpr",
      { positive: true }
    ),
    racksPerHour: parseOptionalDecimal(
      record.racks_per_hour,
      "racks_per_hour",
      { positive: true }
    )
  };
  const boosterField =
    "booster_heater_idle_energy_rate_for_high_temp_and_dual_sanitizing_machines_kw";
  const configurations = [];
  if (
    record.sanitation_method ===
      "Chemical Sanitizing (Low Temp) Machine" ||
    record.sanitation_method === "Dual Sanitizing Machine"
  ) {
    configurations.push({
      operatingMode: "LOW_TEMPERATURE",
      idleField: "idle_energy_rate_for_low_temp_kw",
      washingField:
        "washing_energy_consumption_kwh_rack_for_low_temp_and_dual_sanitizing_machines",
      boosterField: null
    });
  }
  if (
    record.sanitation_method ===
      "Hot Water Sanitizing (High Temp) Machine" ||
    record.sanitation_method === "Dual Sanitizing Machine"
  ) {
    configurations.push({
      operatingMode: "HIGH_TEMPERATURE",
      idleField: "idle_energy_rate_for_high_temp_kw",
      washingField:
        "washing_energy_consumption_kwh_rack_for_high_temp_and_dual_sanitizing_machines",
      boosterField:
        record[boosterField] === undefined ? null : boosterField
    });
  }
  if (configurations.length === 0) {
    throw new Error(
      `UNSUPPORTED_SANITATION_SCHEMA: ${record.sanitation_method}`
    );
  }
  return configurations.map((configuration) => ({
    ...common,
    operatingMode: configuration.operatingMode,
    washingKwhPerRack: parseOptionalDecimal(
      record[configuration.washingField],
      configuration.washingField
    ),
    idleKw: parseOptionalDecimal(
      record[configuration.idleField],
      configuration.idleField
    ),
    boosterIdleKw:
      configuration.boosterField === null
        ? null
        : parseDecimal(
          record[configuration.boosterField],
          configuration.boosterField
        ),
    nativeFields: {
      water: "water_use_gallons_per_rack_gpr",
      washing: configuration.washingField,
      idle: configuration.idleField,
      racksPerHour: "racks_per_hour",
      boosterIdle: configuration.boosterField
    }
  }));
}

function sourceProof(schema, artifact, status, recordsRead = 0, recordsWritten = 0) {
  return {
    source: {
      id: SOURCE_ID,
      standardId: "STD-ENERGY-STAR-PRODUCT-DATA",
      organization: "U.S. Environmental Protection Agency",
      name: "ENERGY STAR certified commercial dishwashers",
      primaryUrl: OFFICIAL_DISHWASHER_QUERY_URL,
      license:
        "EPA Data License; ENERGY STAR trademark rules remain separate",
      attribution: "ENERGY STAR, U.S. Environmental Protection Agency",
      accessMode: "PUBLIC_SOCRATA_JSON"
    },
    schema: {
      id: SCHEMA_ID,
      fingerprintSha256: schema.fingerprintSha256,
      kind: "SOCRATA_JSON_ARRAY",
      observed: schema,
      inspectedAt: ACQUIRED_AT
    },
    release: {
      id: RELEASE_ID,
      version:
        `full current-list snapshot; dataset updated ${DATASET_UPDATED_AT}`,
      publishedAt: DATASET_UPDATED_AT,
      acquiredAt: ACQUIRED_AT,
      status
    },
    artifact: {
      id: ARTIFACT_ID,
      sourceUrl: OFFICIAL_DISHWASHER_QUERY_URL,
      localName: basename(artifact.path),
      mediaType: "application/json",
      byteSize: artifact.byteSize,
      sha256: artifact.sha256
    },
    ingestion: {
      id: INGESTION_ID,
      adapterVersion: "energy-star-commercial-dishwashers-v2",
      startedAt: ACQUIRED_AT,
      finishedAt: status === "PUBLISHED" ? ACQUIRED_AT : null,
      status: status === "PUBLISHED" ? "SUCCEEDED" : "RUNNING",
      recordsRead,
      recordsWritten,
      warningCount: 0
    }
  };
}

function insertPerformance(database, product, fieldKey, value, unit, nativeField) {
  database.prepare(`
    INSERT INTO equipment_performance_fields (
      id, product_id, field_key, numeric_value, text_value, unit, native_field
    ) VALUES (?, ?, ?, ?, NULL, ?, ?)
    ON CONFLICT(product_id, field_key) DO UPDATE SET
      numeric_value = excluded.numeric_value,
      unit = excluded.unit,
      native_field = excluded.native_field
  `).run(`${product}:${fieldKey}`, product, fieldKey, value, unit, nativeField);
}

export async function ingestEnergyStarDishwashers({
  artifactPath,
  metadataPath,
  database
}) {
  assertNetworkDisabled();
  const [artifact, metadataArtifact] = await Promise.all([
    verifyArtifact(
      artifactPath,
      ENERGY_STAR_DISHWASHER_ARTIFACT
    ),
    verifyArtifact(
      metadataPath,
      ENERGY_STAR_DISHWASHER_METADATA_ARTIFACT
    )
  ]);
  const schema = await inspectEnergyStarDishwasherSchema(artifactPath);
  const records = JSON.parse(await readFile(artifactPath, "utf8"));
  const metadata = JSON.parse(
    await readFile(metadataPath, "utf8")
  );
  if (
    metadata.id !== "pk8q-dim8" ||
    metadata.name !==
      "ENERGY STAR Certified Commercial Dishwashers" ||
    new Date(metadata.rowsUpdatedAt * 1000).toISOString() !==
      DATASET_UPDATED_AT
  ) {
    throw new Error(
      "SOURCE_METADATA_DRIFT: unexpected ENERGY STAR dataset identity or revision"
    );
  }
  upsertSourceProof(database, sourceProof(schema, artifact, "INSPECTED"));
  database.prepare(`
    INSERT INTO source_artifacts (
      id, release_id, source_url, local_name, media_type, byte_size,
      sha256, acquired_at, official
    ) VALUES (?, ?, ?, ?, 'application/json', ?, ?, ?, 1)
    ON CONFLICT(id) DO UPDATE SET
      byte_size = excluded.byte_size,
      sha256 = excluded.sha256
  `).run(
    METADATA_ARTIFACT_ID,
    RELEASE_ID,
    OFFICIAL_DISHWASHER_METADATA_URL,
    basename(metadataArtifact.path),
    metadataArtifact.byteSize,
    metadataArtifact.sha256,
    ACQUIRED_AT
  );
  database.prepare(`
    INSERT INTO source_checksums (
      artifact_id, algorithm, digest, observed_at
    ) VALUES (?, 'sha256', ?, ?)
    ON CONFLICT(artifact_id, algorithm) DO UPDATE SET
      digest = excluded.digest,
      observed_at = excluded.observed_at
  `).run(
    METADATA_ARTIFACT_ID,
    metadataArtifact.sha256,
    ACQUIRED_AT
  );

  const insertProduct = database.prepare(`
    INSERT INTO equipment_products (
      id, source_release_id, native_id, manufacturer, brand, model,
      normalized_model, product_family, source_status, active, modified_at
    ) VALUES (?, ?, ?, ?, ?, ?, ?, 'commercial dishwasher',
      'PRESENT_IN_CURRENT_CERTIFIED_LIST_SNAPSHOT', 1, ?)
    ON CONFLICT(id) DO UPDATE SET
      manufacturer = excluded.manufacturer,
      brand = excluded.brand,
      model = excluded.model,
      normalized_model = excluded.normalized_model,
      source_status = excluded.source_status,
      active = excluded.active,
      modified_at = excluded.modified_at
  `);
  const insertCertification = database.prepare(`
    INSERT INTO equipment_certifications (
      id, product_id, specification, test_procedure, effective_from,
      effective_to, active
    ) VALUES (?, ?, 'ENERGY STAR Commercial Dishwashers Version 3.0',
      NULL, ?, NULL, 1)
    ON CONFLICT(id) DO UPDATE SET
      effective_from = excluded.effective_from,
      active = excluded.active
  `);
  const insertDishwasher = database.prepare(`
    INSERT INTO energy_star_commercial_dishwashers (
      product_id, machine_type, sanitation_method, water_gallons_per_rack,
      washing_kwh_per_rack, idle_energy_rate_kw, date_qualified
    ) VALUES (?, ?, ?, ?, ?, ?, ?)
    ON CONFLICT(product_id) DO UPDATE SET
      machine_type = excluded.machine_type,
      sanitation_method = excluded.sanitation_method,
      water_gallons_per_rack = excluded.water_gallons_per_rack,
      washing_kwh_per_rack = excluded.washing_kwh_per_rack,
      idle_energy_rate_kw = excluded.idle_energy_rate_kw,
      date_qualified = excluded.date_qualified
  `);
  const insertOperatingMode = database.prepare(`
    INSERT INTO energy_star_dishwasher_operating_modes (
      id, product_id, operating_mode, water_gallons_per_rack,
      washing_kwh_per_rack, idle_energy_rate_kw,
      booster_idle_energy_rate_kw, racks_per_hour,
      washing_native_field, idle_native_field, booster_native_field
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    ON CONFLICT(product_id, operating_mode) DO UPDATE SET
      water_gallons_per_rack = excluded.water_gallons_per_rack,
      washing_kwh_per_rack = excluded.washing_kwh_per_rack,
      idle_energy_rate_kw = excluded.idle_energy_rate_kw,
      booster_idle_energy_rate_kw =
        excluded.booster_idle_energy_rate_kw,
      racks_per_hour = excluded.racks_per_hour,
      washing_native_field = excluded.washing_native_field,
      idle_native_field = excluded.idle_native_field,
      booster_native_field = excluded.booster_native_field
  `);

  const seenPdIds = new Set();
  const modelIdentifierCounts = new Map();
  database.exec("BEGIN IMMEDIATE");
  try {
    for (const [index, record] of records.entries()) {
      assertDishwasherRecordSchema(record, index + 1);
      if (seenPdIds.has(record.pd_id)) {
        throw new Error(`DUPLICATE_SOURCE_ID: pd_id ${record.pd_id}`);
      }
      seenPdIds.add(record.pd_id);
      modelIdentifierCounts.set(
        record.energy_star_model_identifier,
        (modelIdentifierCounts.get(
          record.energy_star_model_identifier
        ) ?? 0) + 1
      );
      const id = energyStarDishwasherProductId(
        record.pd_id,
        RELEASE_ID
      );
      const operatingModes = operatingModesForRecord(record);
      insertProduct.run(
        id,
        RELEASE_ID,
        record.pd_id,
        record.energy_star_partner,
        record.brand_name,
        record.model_number,
        exactModelKey(record.brand_name, record.model_number),
        record.date_qualified
      );
      insertCertification.run(
        `${id}:current-certified-snapshot`,
        id,
        record.date_qualified.slice(0, 10)
      );
      insertDishwasher.run(
        id,
        record.machine_type,
        record.sanitation_method,
        operatingModes[0].waterGallonsPerRack,
        operatingModes.length === 1
          ? operatingModes[0].washingKwhPerRack
          : null,
        operatingModes.length === 1
          ? operatingModes[0].idleKw
          : null,
        record.date_qualified
      );
      if (operatingModes[0].waterGallonsPerRack !== null) {
        insertPerformance(
          database,
          id,
          "water_per_rack",
          operatingModes[0].waterGallonsPerRack,
          "gallons/rack",
          operatingModes[0].nativeFields.water
        );
      }
      if (operatingModes[0].racksPerHour !== null) {
        insertPerformance(
          database,
          id,
          "rated_racks_per_hour",
          operatingModes[0].racksPerHour,
          "racks/hour",
          operatingModes[0].nativeFields.racksPerHour
        );
      }
      for (const mode of operatingModes) {
        insertOperatingMode.run(
          `${id}:${mode.operatingMode}`,
          id,
          mode.operatingMode,
          mode.waterGallonsPerRack,
          mode.washingKwhPerRack,
          mode.idleKw,
          mode.boosterIdleKw,
          mode.racksPerHour,
          mode.nativeFields.washing,
          mode.nativeFields.idle,
          mode.nativeFields.boosterIdle
        );
        if (mode.washingKwhPerRack !== null) {
          insertPerformance(
            database,
            id,
            `active_electricity_per_rack:${mode.operatingMode}`,
            mode.washingKwhPerRack,
            "kWh/rack",
            mode.nativeFields.washing
          );
        }
        if (mode.idleKw !== null) {
          insertPerformance(
            database,
            id,
            `machine_idle_power:${mode.operatingMode}`,
            mode.idleKw,
            "kW",
            mode.nativeFields.idle
          );
        }
        if (mode.boosterIdleKw !== null) {
          insertPerformance(
            database,
            id,
            `booster_heater_idle_power:${mode.operatingMode}`,
            mode.boosterIdleKw,
            "kW",
            mode.nativeFields.boosterIdle
          );
        }
      }
    }
    database.exec("COMMIT");
  } catch (error) {
    database.exec("ROLLBACK");
    throw error;
  }

  upsertSourceProof(
    database,
    sourceProof(schema, artifact, "PUBLISHED", records.length, records.length)
  );
  return {
    artifact,
    metadataArtifact,
    schema,
    recordsRead: records.length,
    recordsWritten: records.length,
    operatingModesWritten: database.prepare(`
      SELECT count(*) AS count
      FROM energy_star_dishwasher_operating_modes
      WHERE product_id LIKE 'energy-star:commercial-dishwasher:%'
    `).get().count,
    duplicateModelIdentifierCount: [
      ...modelIdentifierCounts.values()
    ].filter((count) => count > 1).length,
    releaseId: RELEASE_ID,
    warning: null,
    normalizedTargets: [
      "equipment_products",
      "equipment_certifications",
      "equipment_performance_fields",
      "energy_star_commercial_dishwashers",
      "energy_star_dishwasher_operating_modes"
    ]
  };
}

function selectDishwasherRows(database, where, values) {
  return database.prepare(`
    SELECT
      p.native_id AS pdId,
      p.manufacturer AS energyStarPartner,
      p.brand,
      p.model AS modelNumber,
      d.machine_type AS machineType,
      d.sanitation_method AS sanitationMethod,
      mode.operating_mode AS operatingMode,
      mode.water_gallons_per_rack AS waterGallonsPerRack,
      mode.washing_kwh_per_rack AS washingKwhPerRack,
      mode.idle_energy_rate_kw AS idleKw,
      d.date_qualified AS dateQualified,
      mode.racks_per_hour AS racksPerHour,
      mode.booster_idle_energy_rate_kw AS boosterIdleKw,
      mode.washing_native_field AS washingNativeField,
      mode.idle_native_field AS idleNativeField,
      mode.booster_native_field AS boosterNativeField
    FROM equipment_products p
    JOIN energy_star_commercial_dishwashers d ON d.product_id = p.id
    JOIN energy_star_dishwasher_operating_modes mode
      ON mode.product_id = p.id
    WHERE p.source_release_id = ?
      AND p.active = 1
      AND ${where}
    ORDER BY p.native_id
  `).all(RELEASE_ID, ...values);
}

function requireUnique(rows, label) {
  if (rows.length === 0) {
    throw new Error(`NO_EXACT_MATCH: ${label}`);
  }
  if (rows.length !== 1) {
    throw new Error(`AMBIGUOUS_EXACT_MATCH: ${label}`);
  }
  return rows[0];
}

function requireCompleteFormulaMetrics(record) {
  const missing = [
    ["water_gallons_per_rack", record.waterGallonsPerRack],
    ["washing_kwh_per_rack", record.washingKwhPerRack],
    ["idle_energy_rate_kw", record.idleKw],
    ["racks_per_hour", record.racksPerHour]
  ]
    .filter(([, value]) => value === null)
    .map(([field]) => field);
  if (missing.length > 0) {
    throw new Error(
      `INCOMPLETE_SOURCE_METRICS: pd_id ${record.pdId} mode ${record.operatingMode} missing ${missing.join(", ")}`
    );
  }
  return record;
}

export function resolveEnergyStarDishwasherByPdId(
  database,
  pdId,
  { operatingMode } = {}
) {
  assertNetworkDisabled();
  const clauses = ["p.native_id = ?"];
  const values = [String(pdId)];
  if (operatingMode !== undefined) {
    clauses.push("mode.operating_mode = ?");
    values.push(operatingMode);
  }
  return requireCompleteFormulaMetrics(
    requireUnique(
      selectDishwasherRows(
        database,
        clauses.join(" AND "),
        values
      ),
      `ENERGY STAR dishwasher pd_id ${pdId}`
    )
  );
}

export function resolveEnergyStarDishwasherByExactModel(database, {
  brand,
  modelNumber,
  machineType,
  sanitationMethod,
  operatingMode
}) {
  assertNetworkDisabled();
  const clauses = ["p.normalized_model = ?"];
  const values = [exactModelKey(brand, modelNumber)];
  if (machineType !== undefined) {
    clauses.push("d.machine_type = ?");
    values.push(machineType);
  }
  if (sanitationMethod !== undefined) {
    clauses.push("d.sanitation_method = ?");
    values.push(sanitationMethod);
  }
  if (operatingMode !== undefined) {
    clauses.push("mode.operating_mode = ?");
    values.push(operatingMode);
  }
  return requireCompleteFormulaMetrics(
    requireUnique(
      selectDishwasherRows(
        database,
        clauses.join(" AND "),
        values
      ),
      "ENERGY STAR dishwasher brand and model"
    )
  );
}

function optionalThreshold(value, label) {
  if (value === undefined) return null;
  if (!Number.isFinite(value) || value < 0) {
    throw new Error(`INVALID_REQUIREMENT: ${label}`);
  }
  return value;
}

export function resolveEnergyStarDishwasherRequirements(database, {
  candidatePdIds,
  machineType,
  sanitationMethod,
  operatingMode,
  minRacksPerHour,
  maxWaterGallonsPerRack,
  maxWashingKwhPerRack,
  maxIdleKw
}) {
  assertNetworkDisabled();
  if (
    candidatePdIds !== undefined &&
    (!Array.isArray(candidatePdIds) ||
      candidatePdIds.length === 0)
  ) {
    throw new Error(
      "INVALID_REQUIREMENT: candidatePdIds must be a nonempty array when supplied"
    );
  }
  if (
    candidatePdIds !== undefined &&
    new Set(candidatePdIds.map(String)).size !==
      candidatePdIds.length
  ) {
    throw new Error("DUPLICATE_CANDIDATE_ID");
  }
  if (typeof machineType !== "string" || !machineType.trim()) {
    throw new Error("INVALID_REQUIREMENT: machineType");
  }
  if (typeof sanitationMethod !== "string" || !sanitationMethod.trim()) {
    throw new Error("INVALID_REQUIREMENT: sanitationMethod");
  }
  if (
    !["LOW_TEMPERATURE", "HIGH_TEMPERATURE"].includes(
      operatingMode
    )
  ) {
    throw new Error("INVALID_REQUIREMENT: operatingMode");
  }
  const minimumRacks = optionalThreshold(minRacksPerHour, "minRacksPerHour");
  const maximumWater = optionalThreshold(
    maxWaterGallonsPerRack,
    "maxWaterGallonsPerRack"
  );
  const maximumWashing = optionalThreshold(
    maxWashingKwhPerRack,
    "maxWashingKwhPerRack"
  );
  const maximumIdle = optionalThreshold(maxIdleKw, "maxIdleKw");
  const candidates =
    candidatePdIds === undefined
      ? selectDishwasherRows(
        database,
        [
          "d.machine_type = ?",
          "d.sanitation_method = ?",
          "mode.operating_mode = ?"
        ].join(" AND "),
        [machineType, sanitationMethod, operatingMode]
      )
      : candidatePdIds.map((pdId) =>
        resolveEnergyStarDishwasherByPdId(
          database,
          pdId,
          { operatingMode }
        )
      );
  const matches = candidates.filter(
    (record) =>
      record.machineType === machineType &&
      record.sanitationMethod === sanitationMethod &&
      record.operatingMode === operatingMode &&
      record.waterGallonsPerRack !== null &&
      record.washingKwhPerRack !== null &&
      record.idleKw !== null &&
      record.racksPerHour !== null &&
      (minimumRacks === null || record.racksPerHour >= minimumRacks) &&
      (maximumWater === null ||
        record.waterGallonsPerRack <= maximumWater) &&
      (maximumWashing === null ||
        record.washingKwhPerRack <= maximumWashing) &&
      (maximumIdle === null || record.idleKw <= maximumIdle)
  );
  return requireUnique(
    matches,
    candidatePdIds === undefined
      ? "complete ENERGY STAR dishwasher snapshot requirements"
      : "explicit ENERGY STAR dishwasher candidate requirements"
  );
}

function mapDishwasherRecord(record, processKey, filters, selectionRule) {
  assertNetworkDisabled();
  if (record.boosterIdleKw !== null) {
    throw new Error(
      "UNRESOLVED_BOOSTER_SCOPE: a separate booster-heater idle rate is present and cannot be silently included in or excluded from ITC-52 idle_kW_proposed"
    );
  }
  const values = {
    proposed_dishwasher_record: {
      pdId: record.pdId,
      brand: record.brand,
      modelNumber: record.modelNumber,
      machineType: record.machineType,
      sanitationMethod: record.sanitationMethod,
      operatingMode: record.operatingMode,
      dateQualified: record.dateQualified
    },
    water_per_rack_proposed: record.waterGallonsPerRack,
    active_kWh_per_rack_proposed: record.washingKwhPerRack,
    idle_kW_proposed: record.idleKw
  };
  return {
    standardId: "STD-ENERGY-STAR-PRODUCT-DATA",
    categoryId: "ITC-52",
    processKey,
    values,
    formulaBindings: [
      {
        outputName: "Proposed rack-machine water use per rack",
        formulaTerm: "water_per_rack_proposed",
        value: record.waterGallonsPerRack,
        unit: "gallons/rack",
        scope: "PER_EVENT"
      },
      {
        outputName: "Proposed rack-machine active electricity per rack",
        formulaTerm: "active_kWh_per_rack_proposed",
        value: record.washingKwhPerRack,
        unit: "kWh/rack",
        scope: "PER_EVENT"
      },
      {
        outputName: "Proposed idle power",
        formulaTerm: "idle_kW_proposed",
        value: record.idleKw,
        unit: "kW",
        scope: "PER_EQUIPMENT_UNIT"
      }
    ],
    unsupportedFormulaTerms: [
      "water_per_hour_proposed",
      "active_kWh_per_hour_proposed"
    ],
    selectionRule,
    provenance: buildProvenance({
      standardId: "STD-ENERGY-STAR-PRODUCT-DATA",
      artifact: ENERGY_STAR_DISHWASHER_ARTIFACT,
      sourceVersion:
        `full current-list snapshot; dataset updated ${DATASET_UPDATED_AT}`,
      sourceFields: [
        "pd_id",
        "brand_name",
        "model_number",
        "machine_type",
        "sanitation_method",
        "water_use_gallons_per_rack_gpr",
        record.washingNativeField,
        record.idleNativeField,
        ...(record.boosterNativeField === null
          ? []
          : [record.boosterNativeField]),
        "racks_per_hour",
        "date_qualified"
      ],
      filters,
      transformation:
        "Exact current-snapshot rack-machine record lookup with explicit operating-mode native field selection",
      adapterPath: ADAPTER_PATH
    })
  };
}

export function mapExactProposedDishwasherToItc52(database, query) {
  const record =
    query.pdId !== undefined
      ? resolveEnergyStarDishwasherByPdId(
        database,
        query.pdId,
        { operatingMode: query.operatingMode }
      )
      : resolveEnergyStarDishwasherByExactModel(database, query);
  return mapDishwasherRecord(
    record,
    "exact-proposed-dishwasher-record",
    query,
    "EXACT_CURRENT_SNAPSHOT_SOURCE_ID_OR_BRAND_MODEL_AND_OPERATING_MODE"
  );
}

export function mapRequirementProposedDishwasherToItc52(
  database,
  requirements
) {
  const record = resolveEnergyStarDishwasherRequirements(
    database,
    requirements
  );
  return mapDishwasherRecord(
    record,
    "requirement-proposed-dishwasher-record",
    requirements,
    requirements.candidatePdIds === undefined
      ? "UNIQUE_MATCH_WITHIN_COMPLETE_CURRENT_SNAPSHOT"
      : "UNIQUE_MATCH_WITHIN_EXPLICIT_CANDIDATE_SET"
  );
}

export function recordItc52DishwasherFormulaMapping(database, result) {
  assertNetworkDisabled();
  const calculationId =
    `calculation:energy-star:itc-52:${RELEASE_ID}:` +
    `${result.processKey}:` +
    result.values.proposed_dishwasher_record.pdId;
  database.prepare(`
    INSERT INTO calculation_runs (
      id, standard_id, process_key, source_release_id, model_version_id,
      adapter_version, input_sha256, output_sha256, network_disabled, status,
      created_at
    ) VALUES (?, 'STD-ENERGY-STAR-PRODUCT-DATA', ?, ?, NULL,
      'energy-star-commercial-dishwashers-v2', ?, ?, 1, 'SUCCEEDED',
      ?)
    ON CONFLICT(id) DO UPDATE SET
      input_sha256 = excluded.input_sha256,
      output_sha256 = excluded.output_sha256
  `).run(
    calculationId,
    result.processKey,
    RELEASE_ID,
    sha256Json(result.provenance.filters),
    sha256Json(result.values),
    ACQUIRED_AT
  );
  const insertValue = database.prepare(`
    INSERT INTO selected_values (
      id, calculation_run_id, formula_term, value, unit, scope, selection_rule
    ) VALUES (?, ?, ?, ?, ?, ?, ?)
    ON CONFLICT(id) DO UPDATE SET value = excluded.value
  `);
  const insertProvenance = database.prepare(`
    INSERT INTO selected_value_provenance (
      selected_value_id, source_artifact_id, source_fields_json, filters_json,
      transformation, adapter_path
    ) VALUES (?, ?, ?, ?, ?, ?)
    ON CONFLICT(selected_value_id) DO UPDATE SET
      source_fields_json = excluded.source_fields_json,
      filters_json = excluded.filters_json,
      transformation = excluded.transformation,
      adapter_path = excluded.adapter_path
  `);
  for (const binding of result.formulaBindings) {
    const valueId = `${calculationId}:${binding.formulaTerm}`;
    insertValue.run(
      valueId,
      calculationId,
      binding.formulaTerm,
      binding.value,
      binding.unit,
      binding.scope,
      result.selectionRule
    );
    insertProvenance.run(
      valueId,
      ARTIFACT_ID,
      JSON.stringify(result.provenance.sourceFields),
      JSON.stringify(result.provenance.filters),
      result.provenance.transformation,
      ADAPTER_PATH
    );
  }
  return calculationId;
}
