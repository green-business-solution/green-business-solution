import { readFile } from "node:fs/promises";
import { basename } from "node:path";

import {
  assertNetworkDisabled,
  sha256Json,
  verifyArtifact
} from "../../lib/artifact.mjs";
import { readWorksheet } from "../../lib/xlsx.mjs";

export const WATERSENSE_PRODUCT_SEARCH_URL =
  "https://www.epa.gov/watersense/product-search";

export const REQUIRED_OPERATOR_ROLES = Object.freeze([
  "sourceRecordId",
  "productType",
  "brand",
  "modelNumber",
  "certificationStatus",
  "ratedValue"
]);

export const OPERATOR_IMPORT_CONTRACT = Object.freeze({
  schemaVersion:
    "operational-savings/watersense-operator-export-package-v1",
  sourcePageUrl: WATERSENSE_PRODUCT_SEARCH_URL,
  permittedArtifactFormat: "XLSX",
  requiredOperatorRoles: REQUIRED_OPERATOR_ROLES,
  permittedRatedUnits: ["gallons/minute", "gallons/flush"],
  requiredAttestations: {
    usedPublicProductSearchPage: true,
    usedDisplayedDownloadAction: true,
    accessedEnvironmentEndpoint: false,
    copiedApiKey: false,
    usedGuessedEndpoint: false
  }
});

export const OPERATOR_IMPORT_CONTRACT_FINGERPRINT =
  "a735273bfcdfd4637fee437b41afa26dc0af4fd1c3b30b7e87712d74f3ad410e";

function requireString(value, label) {
  if (typeof value !== "string" || !value.trim()) {
    throw new Error(`INVALID_OPERATOR_PACKAGE: ${label}`);
  }
  return value;
}

function requireInteger(value, label, minimum = 0) {
  if (!Number.isInteger(value) || value < minimum) {
    throw new Error(`INVALID_OPERATOR_PACKAGE: ${label}`);
  }
  return value;
}

function parseInstant(value, label) {
  requireString(value, label);
  const timestamp = Date.parse(value);
  if (!Number.isFinite(timestamp)) {
    throw new Error(`INVALID_OPERATOR_PACKAGE: ${label}`);
  }
  return new Date(timestamp).toISOString();
}

export function validateWaterSenseOperatorManifest(manifest) {
  if (!manifest || typeof manifest !== "object" || Array.isArray(manifest)) {
    throw new Error("INVALID_OPERATOR_PACKAGE: manifest must be an object");
  }
  if (manifest.schemaVersion !== OPERATOR_IMPORT_CONTRACT.schemaVersion) {
    throw new Error("INVALID_OPERATOR_PACKAGE: schemaVersion");
  }
  if (manifest.sourcePageUrl !== WATERSENSE_PRODUCT_SEARCH_URL) {
    throw new Error("INVALID_OPERATOR_PACKAGE: sourcePageUrl");
  }
  const downloadedAt = parseInstant(
    manifest.downloadedAt,
    "downloadedAt"
  );
  const artifact = manifest.artifact;
  if (!artifact || typeof artifact !== "object") {
    throw new Error("INVALID_OPERATOR_PACKAGE: artifact");
  }
  const fileName = requireString(artifact.fileName, "artifact.fileName");
  if (!fileName.toLocaleLowerCase("en-US").endsWith(".xlsx")) {
    throw new Error("INVALID_OPERATOR_PACKAGE: artifact must be XLSX");
  }
  const byteSize = requireInteger(
    artifact.byteSize,
    "artifact.byteSize",
    1
  );
  const sha256 = requireString(artifact.sha256, "artifact.sha256");
  if (!/^[a-f0-9]{64}$/.test(sha256)) {
    throw new Error("INVALID_OPERATOR_PACKAGE: artifact.sha256");
  }
  const worksheet = manifest.worksheet;
  if (!worksheet || typeof worksheet !== "object") {
    throw new Error("INVALID_OPERATOR_PACKAGE: worksheet");
  }
  const worksheetName = requireString(
    worksheet.name,
    "worksheet.name"
  );
  const headerRow = requireInteger(
    worksheet.headerRow,
    "worksheet.headerRow",
    1
  );
  if (
    !Array.isArray(manifest.columnMappings) ||
    manifest.columnMappings.length < REQUIRED_OPERATOR_ROLES.length
  ) {
    throw new Error("INVALID_OPERATOR_PACKAGE: columnMappings");
  }
  const roles = new Set();
  const headers = new Set();
  const columnMappings = manifest.columnMappings.map((mapping, index) => {
    if (!mapping || typeof mapping !== "object") {
      throw new Error(
        `INVALID_OPERATOR_PACKAGE: columnMappings[${index}]`
      );
    }
    const role = requireString(
      mapping.role,
      `columnMappings[${index}].role`
    );
    const sourceHeader = requireString(
      mapping.sourceHeader,
      `columnMappings[${index}].sourceHeader`
    );
    if (roles.has(role) || headers.has(sourceHeader)) {
      throw new Error(
        "INVALID_OPERATOR_PACKAGE: duplicate role or source header"
      );
    }
    roles.add(role);
    headers.add(sourceHeader);
    return { role, sourceHeader };
  });
  for (const role of REQUIRED_OPERATOR_ROLES) {
    if (!roles.has(role)) {
      throw new Error(
        `INVALID_OPERATOR_PACKAGE: missing column role ${role}`
      );
    }
  }
  if (!Array.isArray(manifest.ratedUnitRules) || !manifest.ratedUnitRules.length) {
    throw new Error("INVALID_OPERATOR_PACKAGE: ratedUnitRules");
  }
  const ratedProductTypes = new Set();
  const ratedUnitRules = manifest.ratedUnitRules.map((rule, index) => {
    if (!rule || typeof rule !== "object") {
      throw new Error(
        `INVALID_OPERATOR_PACKAGE: ratedUnitRules[${index}]`
      );
    }
    const productType = requireString(
      rule.productType,
      `ratedUnitRules[${index}].productType`
    );
    const unit = requireString(
      rule.unit,
      `ratedUnitRules[${index}].unit`
    );
    if (!OPERATOR_IMPORT_CONTRACT.permittedRatedUnits.includes(unit)) {
      throw new Error(
        `INVALID_OPERATOR_PACKAGE: unsupported rated unit ${unit}`
      );
    }
    if (ratedProductTypes.has(productType)) {
      throw new Error(
        `INVALID_OPERATOR_PACKAGE: duplicate rated unit rule ${productType}`
      );
    }
    ratedProductTypes.add(productType);
    return { productType, unit };
  });
  const attestation = manifest.attestation;
  if (!attestation || typeof attestation !== "object") {
    throw new Error("INVALID_OPERATOR_PACKAGE: attestation");
  }
  for (const [key, requiredValue] of Object.entries(
    OPERATOR_IMPORT_CONTRACT.requiredAttestations
  )) {
    if (attestation[key] !== requiredValue) {
      throw new Error(
        `UNLAWFUL_OR_UNREVIEWED_ACQUISITION: attestation.${key}`
      );
    }
  }
  return {
    schemaVersion: manifest.schemaVersion,
    sourcePageUrl: manifest.sourcePageUrl,
    downloadedAt,
    artifact: { fileName, byteSize, sha256 },
    worksheet: { name: worksheetName, headerRow },
    columnMappings,
    ratedUnitRules,
    attestation: structuredClone(attestation)
  };
}

function headerValues(worksheet, headerRow) {
  const row = worksheet.rows.find(
    (candidate) => candidate.rowNumber === headerRow
  );
  if (!row) {
    throw new Error(
      `SOURCE_SCHEMA_DRIFT: header row ${headerRow} is missing`
    );
  }
  const headers = row.cells
    .filter(Boolean)
    .map((cell) => String(cell.value ?? "").trim());
  if (!headers.length || headers.some((header) => !header)) {
    throw new Error("SOURCE_SCHEMA_DRIFT: blank header cell");
  }
  if (new Set(headers).size !== headers.length) {
    throw new Error("SOURCE_SCHEMA_DRIFT: duplicate header");
  }
  return headers;
}

export async function inspectWaterSenseOperatorExport({
  artifactPath,
  manifestPath
}) {
  assertNetworkDisabled();
  const manifest = validateWaterSenseOperatorManifest(
    JSON.parse(await readFile(manifestPath, "utf8"))
  );
  const artifact = await verifyArtifact(artifactPath, {
    byteSize: manifest.artifact.byteSize,
    sha256: manifest.artifact.sha256
  });
  if (basename(artifactPath) !== manifest.artifact.fileName) {
    throw new Error(
      "INVALID_OPERATOR_PACKAGE: artifact filename does not match sidecar"
    );
  }
  const worksheet = await readWorksheet(
    artifactPath,
    manifest.worksheet.name
  );
  const headers = headerValues(
    worksheet,
    manifest.worksheet.headerRow
  );
  const headerSet = new Set(headers);
  for (const mapping of manifest.columnMappings) {
    if (!headerSet.has(mapping.sourceHeader)) {
      throw new Error(
        `SOURCE_SCHEMA_DRIFT: mapped header ${mapping.sourceHeader} is missing`
      );
    }
  }
  const observedSchema = {
    format: "XLSX_OOXML_OPERATOR_EXPORT",
    sheetName: worksheet.sheet.name,
    dimension: worksheet.dimension,
    headerRow: manifest.worksheet.headerRow,
    headers,
    columnMappings: manifest.columnMappings,
    ratedUnitRules: manifest.ratedUnitRules
  };
  return {
    artifact,
    manifest,
    observedSchema,
    observedSchemaFingerprintSha256: sha256Json(observedSchema)
  };
}

if (
  sha256Json(OPERATOR_IMPORT_CONTRACT) !==
  OPERATOR_IMPORT_CONTRACT_FINGERPRINT
) {
  throw new Error(
    "OPERATOR_IMPORT_CONTRACT_FINGERPRINT_MISMATCH"
  );
}
