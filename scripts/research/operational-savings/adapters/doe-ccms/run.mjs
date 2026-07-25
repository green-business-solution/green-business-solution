import { readFile } from "node:fs/promises";

import {
  assertNetworkDisabled,
  sha256Json,
  verifyArtifact
} from "../../lib/artifact.mjs";

export const CCMS_CERTIFICATION_DATA_URL =
  "https://www.regulations.doe.gov/certification-data/";
export const CCMS_TEMPLATE_URL =
  "https://www.regulations.doe.gov/ccms/templates";
export const CCMS_BLOCK_REASON = "HTTP_403_MANUAL_EXPORT_REQUIRED";

export const CCMS_PROBE_ARTIFACTS = Object.freeze({
  headers: Object.freeze({
    byteSize: 118,
    sha256: "126e0d5e2cb4449613f1a274a714076f122f81fd738c0137934803e34f3b6b9a"
  }),
  body: Object.freeze({
    byteSize: 118,
    sha256: "58bf2215b395dcac74c009aa98701854e43cbe54a1cd3a95fee6a647ca9910d4"
  })
});

function parseProbeHeaders(source) {
  const lines = source
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean);
  const status = lines.shift();
  const match = status?.match(/^HTTP\/2 (\d{3})$/);
  if (!match) {
    throw new Error("ACCESS_PROBE_DRIFT: missing HTTP/2 status");
  }
  const headers = {};
  for (const line of lines) {
    const separator = line.indexOf(":");
    if (separator <= 0) {
      throw new Error(`ACCESS_PROBE_DRIFT: malformed header ${line}`);
    }
    const name = line.slice(0, separator).trim().toLowerCase();
    const value = line.slice(separator + 1).trim();
    if (Object.hasOwn(headers, name)) {
      throw new Error(`ACCESS_PROBE_DRIFT: duplicate header ${name}`);
    }
    headers[name] = value;
  }
  return {
    statusCode: Number(match[1]),
    headers
  };
}

function parseProbeBody(source) {
  if (!/<title>403 Forbidden<\/title>/.test(source)) {
    throw new Error("ACCESS_PROBE_DRIFT: body lacks 403 title");
  }
  if (!/<h1>403 Forbidden<\/h1>/.test(source)) {
    throw new Error("ACCESS_PROBE_DRIFT: body lacks 403 heading");
  }
  return {
    title: "403 Forbidden",
    heading: "403 Forbidden"
  };
}

export async function inspectCcmsAccessBlock({ headersPath, bodyPath }) {
  assertNetworkDisabled();
  const [headersArtifact, bodyArtifact] = await Promise.all([
    verifyArtifact(headersPath, CCMS_PROBE_ARTIFACTS.headers),
    verifyArtifact(bodyPath, CCMS_PROBE_ARTIFACTS.body)
  ]);
  const probe = parseProbeHeaders(await readFile(headersPath, "utf8"));
  const body = parseProbeBody(await readFile(bodyPath, "utf8"));
  if (probe.statusCode !== 403) {
    throw new Error(
      `ACCESS_PROBE_DRIFT: expected 403, received ${probe.statusCode}`
    );
  }
  if (probe.headers.server !== "awselb/2.0") {
    throw new Error(
      `ACCESS_PROBE_DRIFT: expected awselb/2.0, received ${probe.headers.server}`
    );
  }
  if (Number(probe.headers["content-length"]) !== bodyArtifact.byteSize) {
    throw new Error(
      "ACCESS_PROBE_DRIFT: response content-length does not match retained body"
    );
  }
  return {
    available: false,
    reasonCode: CCMS_BLOCK_REASON,
    sourceUrl: CCMS_CERTIFICATION_DATA_URL,
    statusCode: probe.statusCode,
    responseHeaders: probe.headers,
    responseBody: body,
    artifacts: {
      headers: headersArtifact,
      body: bodyArtifact
    },
    fingerprintSha256: sha256Json({
      statusCode: probe.statusCode,
      responseHeaders: probe.headers,
      responseBody: body
    })
  };
}

function requireString(value, label) {
  if (typeof value !== "string" || !value.trim()) {
    throw new Error(`INVALID_CCMS_EXPORT_ENVELOPE: ${label}`);
  }
  return value;
}

function requireSha256(value, label) {
  if (!/^[a-f0-9]{64}$/.test(value ?? "")) {
    throw new Error(`INVALID_CCMS_EXPORT_ENVELOPE: ${label}`);
  }
  return value;
}

export function validateCcmsExportEnvelope(envelope, contract) {
  if (!envelope || typeof envelope !== "object" || Array.isArray(envelope)) {
    throw new Error("INVALID_CCMS_EXPORT_ENVELOPE: envelope must be an object");
  }
  if (!contract || typeof contract !== "object" || Array.isArray(contract)) {
    throw new Error("INVALID_CCMS_EXPORT_CONTRACT: contract must be an object");
  }
  requireString(contract.productFamily, "contract.productFamily");
  requireString(contract.officialTemplateVersion, "contract.officialTemplateVersion");
  requireSha256(
    contract.officialTemplateSha256,
    "contract.officialTemplateSha256"
  );
  if (
    !Array.isArray(contract.orderedHeaders) ||
    !contract.orderedHeaders.length ||
    contract.orderedHeaders.some(
      (header) => typeof header !== "string" || !header.trim()
    )
  ) {
    throw new Error(
      "INVALID_CCMS_EXPORT_CONTRACT: orderedHeaders must be an explicit non-empty string array"
    );
  }
  if (new Set(contract.orderedHeaders).size !== contract.orderedHeaders.length) {
    throw new Error(
      "INVALID_CCMS_EXPORT_CONTRACT: orderedHeaders contains duplicates"
    );
  }

  const productFamily = requireString(
    envelope.productFamily,
    "envelope.productFamily"
  );
  if (productFamily !== contract.productFamily) {
    throw new Error(
      `CCMS_PRODUCT_FAMILY_MISMATCH: expected ${contract.productFamily}, received ${productFamily}`
    );
  }
  const templateVersion = requireString(
    envelope.officialTemplateVersion,
    "envelope.officialTemplateVersion"
  );
  if (templateVersion !== contract.officialTemplateVersion) {
    throw new Error(
      `CCMS_TEMPLATE_VERSION_MISMATCH: expected ${contract.officialTemplateVersion}, received ${templateVersion}`
    );
  }
  if (envelope.officialTemplateSha256 !== contract.officialTemplateSha256) {
    throw new Error("CCMS_TEMPLATE_FINGERPRINT_MISMATCH");
  }
  const exportedAt = requireString(envelope.exportedAt, "envelope.exportedAt");
  if (
    !/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/.test(exportedAt) ||
    Number.isNaN(Date.parse(exportedAt))
  ) {
    throw new Error(
      "INVALID_CCMS_EXPORT_ENVELOPE: envelope.exportedAt must be an ISO 8601 UTC instant"
    );
  }
  requireString(envelope.originalFilename, "envelope.originalFilename");
  requireSha256(envelope.exportSha256, "envelope.exportSha256");
  if (!Number.isSafeInteger(envelope.exportByteSize) || envelope.exportByteSize <= 0) {
    throw new Error(
      "INVALID_CCMS_EXPORT_ENVELOPE: envelope.exportByteSize"
    );
  }
  if (
    JSON.stringify(envelope.orderedHeaders) !==
    JSON.stringify(contract.orderedHeaders)
  ) {
    throw new Error("CCMS_EXPORT_HEADER_FINGERPRINT_MISMATCH");
  }
  return {
    ...envelope,
    validationFingerprintSha256: sha256Json({
      productFamily,
      templateVersion,
      officialTemplateSha256: envelope.officialTemplateSha256,
      exportSha256: envelope.exportSha256,
      exportByteSize: envelope.exportByteSize,
      orderedHeaders: envelope.orderedHeaders
    })
  };
}

export function ccmsManualExportRunbook() {
  return {
    reasonCode: CCMS_BLOCK_REASON,
    steps: [
      "Use the official interactive certification database or DOE-provided product-family export.",
      "Download the official product-family certification template from the DOE CCMS templates page.",
      "Retain the original export and template without editing either file.",
      "Record SHA-256 and byte size for both files.",
      "Define the ordered native headers from that exact official template.",
      "Validate the export envelope before any row parsing or normalization.",
      "Implement a separate parser and field contract for each product family.",
      "Reject mixed templates, missing fields, ambiguous basic models, and status assumptions."
    ],
    prohibitedShortcuts: [
      "Browser scraping",
      "Inferred universal CCMS schema",
      "Cross-product-family field reuse",
      "Current certified products used as an installed-equipment baseline"
    ]
  };
}
