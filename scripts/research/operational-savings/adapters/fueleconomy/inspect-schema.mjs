import { createHash } from "node:crypto";

import { parseCsvRows } from "../../lib/csv.mjs";
import { readZipEntry } from "../../lib/zip.mjs";

export const REQUIRED_VEHICLE_FIELDS = Object.freeze([
  "id",
  "year",
  "make",
  "model",
  "VClass",
  "drive",
  "fuelType",
  "fuelType1",
  "comb08",
  "combE",
  "baseModel",
  "createdOn",
  "modifiedOn"
]);

const FIELD_SEMANTICS = Object.freeze({
  id: { logicalType: "identifier", nullable: false, keyRole: "PRIMARY_SOURCE_KEY" },
  year: { logicalType: "integer", nullable: false, unit: "model year" },
  make: { logicalType: "string", nullable: false, keyRole: "EXACT_MATCH_COMPONENT" },
  model: { logicalType: "string", nullable: false, keyRole: "EXACT_MATCH_COMPONENT" },
  VClass: { logicalType: "enumeration", nullable: false, keyRole: "COMPATIBILITY_FILTER" },
  drive: { logicalType: "enumeration", nullable: true, keyRole: "DISAMBIGUATION_FILTER" },
  fuelType: { logicalType: "enumeration", nullable: false, keyRole: "COMPATIBILITY_FILTER" },
  fuelType1: { logicalType: "enumeration", nullable: false, keyRole: "RESOURCE_FILTER" },
  comb08: { logicalType: "number", nullable: true, unit: "miles/gallon" },
  combE: { logicalType: "number", nullable: true, unit: "kWh/100 miles at the wall" },
  baseModel: { logicalType: "string", nullable: true, keyRole: "PAIR_COMPATIBILITY_EVIDENCE" },
  createdOn: { logicalType: "source timestamp", nullable: true },
  modifiedOn: { logicalType: "source timestamp", nullable: true, keyRole: "CORRECTION_VERSION" }
});

export function schemaFromHeaders(headers) {
  const missing = REQUIRED_VEHICLE_FIELDS.filter((field) => !headers.includes(field));
  if (missing.length) {
    throw new Error(`MISSING_REQUIRED_COLUMN: ${missing.join(", ")}`);
  }
  const duplicate = headers.find((header, index) => headers.indexOf(header) !== index);
  if (duplicate) {
    throw new Error(`DUPLICATE_SOURCE_COLUMN: ${duplicate}`);
  }
  const observed = {
    format: "ZIP containing RFC 4180-style CSV",
    zipEntry: "vehicles.csv",
    columnCount: headers.length,
    fields: headers.map((name, position) => ({
      name,
      position,
      physicalType: "CSV text",
      ...(FIELD_SEMANTICS[name] ?? {
        logicalType: "uninterpreted source text",
        nullable: true
      })
    }))
  };
  return {
    ...observed,
    fingerprintSha256: createHash("sha256")
      .update(JSON.stringify(observed))
      .digest("hex")
  };
}

export async function inspectFuelEconomySchema(artifactPath) {
  const csv = await readZipEntry(artifactPath, "vehicles.csv");
  let headers;
  for await (const row of parseCsvRows(csv.toString("utf8"))) {
    headers = row;
    break;
  }
  if (!headers) {
    throw new Error("EMPTY_SOURCE_ARTIFACT: vehicles.csv has no header");
  }
  return schemaFromHeaders(headers);
}
