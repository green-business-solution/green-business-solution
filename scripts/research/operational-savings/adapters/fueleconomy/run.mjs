import { basename, relative } from "node:path";

import {
  assertNetworkDisabled,
  buildProvenance,
  normalizeIdentifier,
  sha256Json,
  verifyArtifact
} from "../../lib/artifact.mjs";
import { parseCsvRecords, parseNullableNumber } from "../../lib/csv.mjs";
import { upsertSourceProof } from "../../lib/sqlite.mjs";
import { streamZipEntry } from "../../lib/zip.mjs";
import {
  inspectFuelEconomySchema,
  REQUIRED_VEHICLE_FIELDS
} from "./inspect-schema.mjs";
import { OFFICIAL_VEHICLE_BULK_URL } from "./acquire.mjs";

export const FUELECONOMY_ARTIFACT = Object.freeze({
  byteSize: 2185627,
  sha256: "83ee4bf48e65e8e962e55952e0bfbdc6ab94d4bf63f42e2d38aa39143d6f1ecc"
});

const SOURCE_ID = "source:fueleconomy-vehicles";
const SCHEMA_ID = "schema:fueleconomy-vehicles:2026-07-23";
const RELEASE_ID = "release:fueleconomy-vehicles:2026-07-23";
const ARTIFACT_ID = "artifact:fueleconomy-vehicles:2026-07-23";
const INGESTION_ID = "ingestion:fueleconomy-vehicles:2026-07-23:v1";
const ADAPTER_PATH =
  "scripts/research/operational-savings/adapters/fueleconomy/run.mjs";

export function fuelEconomyVehicleProductId(
  nativeId,
  releaseId = RELEASE_ID
) {
  const normalizedNativeId = String(nativeId ?? "").trim();
  if (
    typeof releaseId !== "string" ||
    !releaseId ||
    !normalizedNativeId
  ) {
    throw new Error(
      "INVALID_RELEASE_SCOPED_VEHICLE_ID_INPUT"
    );
  }
  return `fueleconomy:${releaseId}:${normalizedNativeId}`;
}

function parsePositiveMetric(value, field) {
  const parsed = parseNullableNumber(value, field);
  if (parsed === null || parsed <= 0) return null;
  return parsed;
}

function sourceProof(schema, artifact, status, recordsRead = 0, recordsWritten = 0) {
  return {
    source: {
      id: SOURCE_ID,
      standardId: "STD-FUELECONOMY-VEHICLES",
      organization: "U.S. Department of Energy and U.S. Environmental Protection Agency",
      name: "FuelEconomy.gov vehicle data",
      primaryUrl: OFFICIAL_VEHICLE_BULK_URL,
      license: "U.S. government data",
      attribution: "FuelEconomy.gov, U.S. DOE and U.S. EPA",
      accessMode: "PUBLIC_BULK_DOWNLOAD"
    },
    schema: {
      id: SCHEMA_ID,
      fingerprintSha256: schema.fingerprintSha256,
      kind: "ZIP_CSV_HEADER",
      observed: schema,
      inspectedAt: "2026-07-23T00:00:00.000Z"
    },
    release: {
      id: RELEASE_ID,
      version: "bulk snapshot acquired 2026-07-23",
      publishedAt: null,
      acquiredAt: "2026-07-23T00:00:00.000Z",
      status
    },
    artifact: {
      id: ARTIFACT_ID,
      sourceUrl: OFFICIAL_VEHICLE_BULK_URL,
      localName: basename(artifact.path),
      mediaType: "application/zip",
      byteSize: artifact.byteSize,
      sha256: artifact.sha256
    },
    ingestion: {
      id: INGESTION_ID,
      adapterVersion: "fueleconomy-v1",
      startedAt: "2026-07-23T00:00:00.000Z",
      finishedAt: status === "PUBLISHED" ? "2026-07-23T00:00:00.000Z" : null,
      status: status === "PUBLISHED" ? "SUCCEEDED" : "RUNNING",
      recordsRead,
      recordsWritten,
      warningCount: 0
    }
  };
}

export async function ingestFuelEconomy({
  artifactPath,
  database
}) {
  assertNetworkDisabled();
  const artifact = await verifyArtifact(artifactPath, FUELECONOMY_ARTIFACT);
  const schema = await inspectFuelEconomySchema(artifactPath);
  upsertSourceProof(database, sourceProof(schema, artifact, "INSPECTED"));

  const insertProduct = database.prepare(`
    INSERT INTO equipment_products (
      id, source_release_id, native_id, manufacturer, brand, model,
      normalized_model, product_family, source_status, active, modified_at
    ) VALUES (?, ?, ?, ?, ?, ?, ?, 'light-duty vehicle', 'CURRENT_SNAPSHOT', 1, ?)
    ON CONFLICT(id) DO UPDATE SET
      manufacturer = excluded.manufacturer,
      model = excluded.model,
      normalized_model = excluded.normalized_model,
      modified_at = excluded.modified_at
  `);
  const insertVehicle = database.prepare(`
    INSERT INTO fuel_economy_vehicles (
      product_id, model_year, vehicle_class, drive, fuel_type, comb08_mpg,
      comb_e_kwh_per_100_miles, modified_on
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    ON CONFLICT(product_id) DO UPDATE SET
      model_year = excluded.model_year,
      vehicle_class = excluded.vehicle_class,
      drive = excluded.drive,
      fuel_type = excluded.fuel_type,
      comb08_mpg = excluded.comb08_mpg,
      comb_e_kwh_per_100_miles = excluded.comb_e_kwh_per_100_miles,
      modified_on = excluded.modified_on
  `);
  const insertPerformance = database.prepare(`
    INSERT INTO equipment_performance_fields (
      id, product_id, field_key, numeric_value, text_value, unit, native_field
    ) VALUES (?, ?, ?, ?, NULL, ?, ?)
    ON CONFLICT(product_id, field_key) DO UPDATE SET
      numeric_value = excluded.numeric_value,
      unit = excluded.unit,
      native_field = excluded.native_field
  `);

  let recordsRead = 0;
  let recordsWritten = 0;
  const seenIds = new Set();
  const stream = streamZipEntry(artifactPath, "vehicles.csv");
  database.exec("BEGIN IMMEDIATE");
  try {
    for await (const record of parseCsvRecords(stream, {
      requiredHeaders: REQUIRED_VEHICLE_FIELDS
    })) {
      recordsRead += 1;
      if (!record.id || !record.year || !record.make || !record.model || !record.VClass) {
        throw new Error(`MISSING_REQUIRED_VALUE: vehicle row ${recordsRead}`);
      }
      if (seenIds.has(record.id)) {
        throw new Error(`MIXED_OR_DUPLICATE_RELEASE_RECORD: vehicle id ${record.id}`);
      }
      seenIds.add(record.id);
      const id = fuelEconomyVehicleProductId(
        record.id,
        RELEASE_ID
      );
      const comb08 = parsePositiveMetric(record.comb08, "comb08");
      const combE = parsePositiveMetric(record.combE, "combE");
      insertProduct.run(
        id,
        RELEASE_ID,
        record.id,
        record.make,
        record.make,
        record.model,
        normalizeIdentifier(`${record.make} ${record.model}`),
        record.modifiedOn || null
      );
      insertVehicle.run(
        id,
        Number(record.year),
        record.VClass,
        record.drive || null,
        record.fuelType1 || record.fuelType,
        comb08,
        combE,
        record.modifiedOn || null
      );
      if (comb08 !== null) {
        insertPerformance.run(
          `${id}:comb08`,
          id,
          "combined_fuel_economy",
          comb08,
          "miles/gallon",
          "comb08"
        );
      }
      if (combE !== null) {
        insertPerformance.run(
          `${id}:combE`,
          id,
          "combined_wall_electricity",
          combE,
          "kWh/100 miles at the wall",
          "combE"
        );
      }
      recordsWritten += 1;
    }
    await stream.zipCompletion;
    database.exec("COMMIT");
  } catch (error) {
    database.exec("ROLLBACK");
    stream.destroy();
    throw error;
  }

  upsertSourceProof(
    database,
    sourceProof(schema, artifact, "PUBLISHED", recordsRead, recordsWritten)
  );
  return {
    artifact,
    schema,
    recordsRead,
    recordsWritten,
    releaseId: RELEASE_ID,
    normalizedTargets: [
      "equipment_products",
      "equipment_performance_fields",
      "fuel_economy_vehicles"
    ]
  };
}

export function resolveVehicleById(database, nativeId) {
  const rows = database.prepare(`
    SELECT
      p.native_id AS nativeId,
      p.manufacturer AS make,
      p.model,
      v.model_year AS year,
      v.vehicle_class AS vehicleClass,
      v.drive,
      v.fuel_type AS fuelType,
      v.comb08_mpg AS comb08,
      v.comb_e_kwh_per_100_miles AS combE,
      v.modified_on AS modifiedOn
    FROM equipment_products p
    JOIN fuel_economy_vehicles v ON v.product_id = p.id
    WHERE p.source_release_id = ?
      AND p.native_id = ?
      AND p.active = 1
  `).all(RELEASE_ID, String(nativeId));
  if (rows.length === 0) {
    throw new Error(`NO_EXACT_MATCH: FuelEconomy vehicle id ${nativeId}`);
  }
  if (rows.length !== 1) {
    throw new Error(`AMBIGUOUS_EXACT_MATCH: FuelEconomy vehicle id ${nativeId}`);
  }
  return rows[0];
}

export function resolveVehicleByDescription(database, {
  make,
  model,
  year,
  drive
}) {
  const rows = database.prepare(`
    SELECT p.native_id AS nativeId
    FROM equipment_products p
    JOIN fuel_economy_vehicles v ON v.product_id = p.id
    WHERE p.source_release_id = ?
      AND p.normalized_model = ?
      AND v.model_year = ?
      AND (? IS NULL OR v.drive = ?)
      AND p.active = 1
    ORDER BY p.native_id
  `).all(
    RELEASE_ID,
    normalizeIdentifier(`${make} ${model}`),
    Number(year),
    drive ?? null,
    drive ?? null
  );
  if (rows.length === 0) {
    throw new Error("NO_EXACT_MATCH: vehicle description");
  }
  if (rows.length !== 1) {
    throw new Error("AMBIGUOUS_EXACT_MATCH: vehicle description requires drivetrain details");
  }
  return resolveVehicleById(database, rows[0].nativeId);
}

export function mapExactVehiclePairToItc29(database, {
  existingVehicleId,
  proposedVehicleId
}) {
  assertNetworkDisabled();
  const existing = resolveVehicleById(database, existingVehicleId);
  const proposed = resolveVehicleById(database, proposedVehicleId);
  if (existing.vehicleClass !== proposed.vehicleClass) {
    throw new Error("INCOMPATIBLE_VEHICLE_PAIR: source vehicle classes differ");
  }
  if (!existing.comb08 || existing.fuelType === "Electricity") {
    throw new Error("INCOMPATIBLE_VEHICLE_PAIR: existing record lacks combustion comb08");
  }
  if (!proposed.combE || proposed.fuelType !== "Electricity") {
    throw new Error("INCOMPATIBLE_VEHICLE_PAIR: proposed record lacks electric combE");
  }
  const artifact = {
    byteSize: FUELECONOMY_ARTIFACT.byteSize,
    sha256: FUELECONOMY_ARTIFACT.sha256
  };
  const values = {
    existing_combined_mpg: existing.comb08,
    proposed_combE: proposed.combE
  };
  return {
    standardId: "STD-FUELECONOMY-VEHICLES",
    categoryId: "ITC-29",
    processKey: "fueleconomy_vehicles",
    values,
    selectionRule: "EXACT_SOURCE_ID_AND_COMPATIBLE_PAIR",
    formulaBindings: [
      {
        outputName: "Existing combined fuel economy",
        formulaTerm: "existing_combined_mpg",
        value: existing.comb08,
        unit: "miles/gallon",
        scope: "PER_EQUIPMENT_UNIT"
      },
      {
        outputName: "Proposed electricity use at the wall",
        formulaTerm: "proposed_combE",
        value: proposed.combE,
        unit: "kWh/100 miles",
        scope: "PER_EQUIPMENT_UNIT"
      }
    ],
    provenance: buildProvenance({
      standardId: "STD-FUELECONOMY-VEHICLES",
      artifact,
      sourceVersion: "bulk snapshot acquired 2026-07-23",
      sourceFields: ["id", "VClass", "fuelType1", "comb08", "combE", "modifiedOn"],
      filters: { existingVehicleId, proposedVehicleId },
      transformation: "Exact ID lookup with equal source vehicle-class compatibility guard",
      adapterPath: ADAPTER_PATH
    })
  };
}

export function mapExactElectricVehicleToItc28(database, {
  vehicleId
}) {
  assertNetworkDisabled();
  const vehicle = resolveVehicleById(database, vehicleId);
  if (vehicle.fuelType !== "Electricity" || !vehicle.combE) {
    throw new Error(
      "INCOMPATIBLE_VEHICLE: exact record lacks electric combE"
    );
  }
  const value = vehicle.combE / 100;
  return {
    standardId: "STD-FUELECONOMY-VEHICLES",
    categoryId: "ITC-28",
    processKey: "fueleconomy_vehicles",
    values: {
      vehicle_kWh_per_mile: value
    },
    formulaBindings: [
      {
        outputName: "Vehicle electricity intensity at the wall",
        formulaTerm: "vehicle_kWh_per_mile",
        value,
        unit: "kWh/mile",
        scope: "PER_EQUIPMENT_UNIT"
      }
    ],
    selectionRule: "EXACT_ELECTRIC_SOURCE_ID",
    provenance: buildProvenance({
      standardId: "STD-FUELECONOMY-VEHICLES",
      artifact: FUELECONOMY_ARTIFACT,
      sourceVersion: "bulk snapshot acquired 2026-07-23",
      sourceFields: [
        "id",
        "VClass",
        "fuelType1",
        "combE",
        "modifiedOn"
      ],
      filters: { vehicleId },
      transformation:
        "Exact electric-vehicle source ID lookup and conversion from native kWh/100 miles at the wall to kWh/mile",
      adapterPath: ADAPTER_PATH
    })
  };
}

export function recordFuelEconomyFormulaMapping(database, result) {
  assertNetworkDisabled();
  if (
    !result ||
    result.standardId !== "STD-FUELECONOMY-VEHICLES" ||
    !["ITC-28", "ITC-29"].includes(result.categoryId)
  ) {
    throw new Error("INVALID_FUELECONOMY_RESULT");
  }
  const calculationId = [
    "calculation",
    "fueleconomy",
    result.categoryId.toLowerCase(),
    RELEASE_ID,
    sha256Json(result.provenance.filters).slice(0, 16)
  ].join(":");
  const outputSha256 = sha256Json(result.values);
  database.prepare(`
    INSERT INTO calculation_runs (
      id, standard_id, process_key, source_release_id, model_version_id,
      adapter_version, input_sha256, output_sha256, network_disabled, status, created_at
    ) VALUES (?, 'STD-FUELECONOMY-VEHICLES', ?, ?, NULL,
      'fueleconomy-v1', ?, ?, 1, 'SUCCEEDED', '2026-07-23T00:00:00.000Z')
    ON CONFLICT(id) DO UPDATE SET output_sha256 = excluded.output_sha256
  `).run(
    calculationId,
    result.processKey,
    RELEASE_ID,
    sha256Json(result.provenance.filters),
    outputSha256
  );
  const insertValue = database.prepare(`
    INSERT INTO selected_values (
      id, calculation_run_id, formula_term, value, unit, scope, selection_rule
    ) VALUES (?, ?, ?, ?, ?, ?, ?)
    ON CONFLICT(id) DO UPDATE SET
      value = excluded.value,
      unit = excluded.unit,
      scope = excluded.scope,
      selection_rule = excluded.selection_rule
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

export function recordItc29FormulaMapping(database, result) {
  if (result.categoryId !== "ITC-29") {
    throw new Error("INVALID_ITC29_RESULT");
  }
  return recordFuelEconomyFormulaMapping(database, result);
}
