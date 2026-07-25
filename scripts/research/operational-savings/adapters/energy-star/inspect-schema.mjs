import { createHash } from "node:crypto";
import { readFile } from "node:fs/promises";

export const REQUIRED_DISHWASHER_FIELDS = Object.freeze([
  "pd_id",
  "energy_star_partner",
  "brand_name",
  "model_name",
  "model_number",
  "machine_type",
  "sanitation_method",
  "date_available_on_market",
  "date_qualified",
  "markets",
  "energy_star_model_identifier"
]);

const LOW_TEMP_FIELDS = Object.freeze([
  "idle_energy_rate_for_low_temp_kw",
  "washing_energy_consumption_kwh_rack_for_low_temp_and_dual_sanitizing_machines"
]);

const HIGH_TEMP_FIELDS = Object.freeze([
  "idle_energy_rate_for_high_temp_kw",
  "washing_energy_consumption_kwh_rack_for_high_temp_and_dual_sanitizing_machines"
]);

const DUAL_TEMP_FIELDS = Object.freeze([
  ...LOW_TEMP_FIELDS,
  ...HIGH_TEMP_FIELDS
]);

const FIELD_SEMANTICS = Object.freeze({
  pd_id: {
    logicalType: "identifier",
    nullable: false,
    keyRole: "PRIMARY_SOURCE_KEY"
  },
  energy_star_partner: {
    logicalType: "string",
    nullable: false,
    keyRole: "MANUFACTURER"
  },
  brand_name: {
    logicalType: "string",
    nullable: false,
    keyRole: "EXACT_MATCH_COMPONENT"
  },
  model_name: {
    logicalType: "string",
    nullable: false
  },
  model_number: {
    logicalType: "string",
    nullable: false,
    keyRole: "EXACT_MATCH_COMPONENT"
  },
  machine_type: {
    logicalType: "enumeration",
    nullable: false,
    keyRole: "COMPATIBILITY_FILTER"
  },
  sanitation_method: {
    logicalType: "enumeration",
    nullable: false,
    keyRole: "COMPATIBILITY_FILTER"
  },
  idle_energy_rate_for_low_temp_kw: {
    logicalType: "decimal string",
    nullable: true,
    unit: "kW"
  },
  idle_energy_rate_for_high_temp_kw: {
    logicalType: "decimal string",
    nullable: true,
    unit: "kW"
  },
  booster_heater_idle_energy_rate_for_high_temp_and_dual_sanitizing_machines_kw: {
    logicalType: "decimal string",
    nullable: true,
    unit: "kW"
  },
  water_use_gallons_per_rack_gpr: {
    logicalType: "decimal string",
    nullable: true,
    unit: "gallons/rack"
  },
  washing_energy_consumption_kwh_rack_for_low_temp_and_dual_sanitizing_machines: {
    logicalType: "decimal string",
    nullable: true,
    unit: "kWh/rack"
  },
  washing_energy_consumption_kwh_rack_for_high_temp_and_dual_sanitizing_machines: {
    logicalType: "decimal string",
    nullable: true,
    unit: "kWh/rack"
  },
  racks_per_hour: {
    logicalType: "decimal string",
    nullable: true,
    unit: "racks/hour"
  },
  date_available_on_market: {
    logicalType: "floating timestamp",
    nullable: false
  },
  date_qualified: {
    logicalType: "floating timestamp",
    nullable: false
  },
  energy_star_model_identifier: {
    logicalType: "identifier",
    nullable: false,
    keyRole: "NON_UNIQUE_SOURCE_MODEL_IDENTIFIER"
  }
});

function requireNonemptyString(record, field, rowNumber) {
  if (typeof record[field] !== "string" || !record[field].trim()) {
    throw new Error(`MISSING_REQUIRED_VALUE: row ${rowNumber} field ${field}`);
  }
}

function requireDecimalString(record, field, rowNumber, {
  positive = false
} = {}) {
  const value = record[field];
  if (
    typeof value !== "string" ||
    !/^-?(?:\d+(?:\.\d*)?|\.\d+)$/.test(value.trim())
  ) {
    throw new Error(`INVALID_SOURCE_NUMBER: row ${rowNumber} field ${field}`);
  }
  const number = Number(value);
  if (!Number.isFinite(number) || number < 0 || (positive && number === 0)) {
    throw new Error(`INVALID_SOURCE_NUMBER: row ${rowNumber} field ${field}`);
  }
}

function requireTimestamp(record, field, rowNumber) {
  requireNonemptyString(record, field, rowNumber);
  if (
    !/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d+)?$/.test(record[field]) ||
    Number.isNaN(Date.parse(`${record[field]}Z`))
  ) {
    throw new Error(`INVALID_SOURCE_TIMESTAMP: row ${rowNumber} field ${field}`);
  }
}

export function assertDishwasherRecordSchema(record, rowNumber = 1) {
  if (!record || typeof record !== "object" || Array.isArray(record)) {
    throw new Error(`INVALID_SOURCE_ROW: row ${rowNumber}`);
  }
  for (const field of REQUIRED_DISHWASHER_FIELDS) {
    requireNonemptyString(record, field, rowNumber);
  }
  if (record.water_use_gallons_per_rack_gpr !== undefined) {
    requireDecimalString(
      record,
      "water_use_gallons_per_rack_gpr",
      rowNumber,
      { positive: true }
    );
  }
  if (record.racks_per_hour !== undefined) {
    requireDecimalString(
      record,
      "racks_per_hour",
      rowNumber,
      { positive: true }
    );
  }
  requireTimestamp(record, "date_available_on_market", rowNumber);
  requireTimestamp(record, "date_qualified", rowNumber);

  let conditionalFields;
  if (record.sanitation_method === "Chemical Sanitizing (Low Temp) Machine") {
    conditionalFields = LOW_TEMP_FIELDS;
  } else if (
    record.sanitation_method === "Hot Water Sanitizing (High Temp) Machine"
  ) {
    conditionalFields = HIGH_TEMP_FIELDS;
  } else if (
    record.sanitation_method === "Dual Sanitizing Machine"
  ) {
    conditionalFields = DUAL_TEMP_FIELDS;
  } else {
    throw new Error(
      `UNSUPPORTED_SANITATION_SCHEMA: row ${rowNumber} ${record.sanitation_method}`
    );
  }
  for (const field of conditionalFields) {
    if (record[field] !== undefined) {
      requireDecimalString(record, field, rowNumber);
    }
  }
  const boosterField =
    "booster_heater_idle_energy_rate_for_high_temp_and_dual_sanitizing_machines_kw";
  if (record[boosterField] !== undefined) {
    requireDecimalString(record, boosterField, rowNumber);
  }
  return record;
}

export function schemaFromDishwasherRecords(records) {
  if (!Array.isArray(records) || records.length === 0) {
    throw new Error("EMPTY_SOURCE_ARTIFACT: expected a nonempty JSON array");
  }
  records.forEach((record, index) =>
    assertDishwasherRecordSchema(record, index + 1)
  );

  const names = [];
  const seen = new Set();
  for (const record of records) {
    for (const name of Object.keys(record)) {
      if (!seen.has(name)) {
        names.push(name);
        seen.add(name);
      }
    }
  }
  const observed = {
    format: "Socrata JSON array",
    rowCount: records.length,
    fields: names.map((name, position) => {
      const values = records
        .filter((record) => Object.hasOwn(record, name))
        .map((record) => record[name]);
      return {
        name,
        position,
        physicalTypes: [...new Set(values.map((value) => typeof value))].sort(),
        presenceCount: values.length,
        ...(FIELD_SEMANTICS[name] ?? {
          logicalType: "uninterpreted source value",
          nullable: values.length !== records.length
        })
      };
    }),
    conditionalFieldSets: [
      {
        when: {
          sanitation_method: "Chemical Sanitizing (Low Temp) Machine"
        },
        applicableFields: [...LOW_TEMP_FIELDS]
      },
      {
        when: {
          sanitation_method: "Hot Water Sanitizing (High Temp) Machine"
        },
        applicableFields: [...HIGH_TEMP_FIELDS]
      },
      {
        when: {
          sanitation_method: "Dual Sanitizing Machine"
        },
        applicableFields: [...DUAL_TEMP_FIELDS]
      }
    ]
  };
  return {
    ...observed,
    fingerprintSha256: createHash("sha256")
      .update(JSON.stringify(observed))
      .digest("hex")
  };
}

export async function inspectEnergyStarDishwasherSchema(artifactPath) {
  const source = await readFile(artifactPath, "utf8");
  let records;
  try {
    records = JSON.parse(source);
  } catch (error) {
    throw new Error(`INVALID_SOURCE_JSON: ${error.message}`);
  }
  return schemaFromDishwasherRecords(records);
}
