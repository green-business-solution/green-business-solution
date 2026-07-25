import { mkdtemp, readFile, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import { afterEach, beforeEach, expect, test } from "vitest";

import {
  CCMS_BLOCK_REASON,
  ccmsManualExportRunbook,
  inspectCcmsAccessBlock,
  validateCcmsExportEnvelope
} from "../adapters/doe-ccms/run.mjs";

const repoRoot = fileURLToPath(new URL("../../../..", import.meta.url));
const probesRoot = join(
  repoRoot,
  "scripts/research/operational-savings/.cache/probes"
);
const headersPath = join(probesRoot, "ccms.headers");
const bodyPath = join(probesRoot, "ccms.html");
const proofPath = join(
  repoRoot,
  "scripts/research/operational-savings/adapters/doe-ccms/proof.json"
);
let previousNetworkMode;

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

test("verifies the retained official CCMS 403 access boundary", async () => {
  const result = await inspectCcmsAccessBlock({ headersPath, bodyPath });
  expect(result).toMatchObject({
    available: false,
    reasonCode: CCMS_BLOCK_REASON,
    statusCode: 403
  });
  expect(result.responseHeaders).toMatchObject({
    server: "awselb/2.0",
    "content-type": "text/html",
    "content-length": "118"
  });
  expect(result.artifacts.body.sha256).toBe(
    "58bf2215b395dcac74c009aa98701854e43cbe54a1cd3a95fee6a647ca9910d4"
  );
  expect(result.fingerprintSha256).toMatch(/^[a-f0-9]{64}$/);
});

test("validates a future export only against an explicit exact template contract", () => {
  const contract = {
    productFamily: "example-family",
    officialTemplateVersion: "example-version",
    officialTemplateSha256: "a".repeat(64),
    orderedHeaders: ["Manufacturer", "Basic Model Number", "Status"]
  };
  const envelope = {
    productFamily: "example-family",
    officialTemplateVersion: "example-version",
    officialTemplateSha256: "a".repeat(64),
    exportedAt: "2026-07-24T00:00:00.000Z",
    originalFilename: "official-export.csv",
    exportSha256: "b".repeat(64),
    exportByteSize: 100,
    orderedHeaders: ["Manufacturer", "Basic Model Number", "Status"]
  };
  const validated = validateCcmsExportEnvelope(envelope, contract);
  expect(validated.validationFingerprintSha256).toMatch(/^[a-f0-9]{64}$/);
  expect(() =>
    validateCcmsExportEnvelope(
      { ...envelope, orderedHeaders: [...envelope.orderedHeaders].reverse() },
      contract
    )
  ).toThrow(/CCMS_EXPORT_HEADER_FINGERPRINT_MISMATCH/);
  expect(() =>
    validateCcmsExportEnvelope(
      { ...envelope, officialTemplateSha256: "c".repeat(64) },
      contract
    )
  ).toThrow(/CCMS_TEMPLATE_FINGERPRINT_MISMATCH/);
  expect(() =>
    validateCcmsExportEnvelope(
      { ...envelope, exportedAt: "yesterday" },
      contract
    )
  ).toThrow(/ISO 8601 UTC instant/);
});

test("rejects vague contracts instead of inferring a universal CCMS schema", () => {
  expect(() =>
    validateCcmsExportEnvelope(
      {},
      {
        productFamily: "example-family",
        officialTemplateVersion: "example-version",
        officialTemplateSha256: "a".repeat(64),
        orderedHeaders: []
      }
    )
  ).toThrow(/orderedHeaders/);
  const runbook = ccmsManualExportRunbook();
  expect(runbook.reasonCode).toBe(CCMS_BLOCK_REASON);
  expect(runbook.prohibitedShortcuts).toContain(
    "Inferred universal CCMS schema"
  );
});

test("rejects changed block evidence and requires offline inspection", async () => {
  const workspace = await mkdtemp(join(tmpdir(), "ccms-proof-test-"));
  try {
    const changedBody = join(workspace, "ccms.html");
    await writeFile(changedBody, "<h1>403 Forbidden</h1>");
    await expect(
      inspectCcmsAccessBlock({ headersPath, bodyPath: changedBody })
    ).rejects.toThrow(/ARTIFACT_SIZE_MISMATCH/);
    delete process.env.OS_RESEARCH_NETWORK;
    await expect(
      inspectCcmsAccessBlock({ headersPath, bodyPath })
    ).rejects.toThrow(/OFFLINE_GUARD_REQUIRED/);
  } finally {
    await rm(workspace, { recursive: true, force: true });
  }
});

test("marks every CCMS-bound product-rating process as access blocked", async () => {
  const manifest = JSON.parse(await readFile(proofPath, "utf8"));
  const expectedCategories = [
    "ITC-03",
    "ITC-06",
    "ITC-07",
    "ITC-10",
    "ITC-13",
    "ITC-50",
    "ITC-52",
    "ITC-53"
  ];
  expect(manifest.processClaims).toHaveLength(24);
  expect(
    [...new Set(manifest.processClaims.map((claim) => claim.categoryId))].sort()
  ).toEqual(expectedCategories);
  expect(
    manifest.processClaims.every(
      (claim) =>
        claim.proofLevel === "ACCESS_BLOCKED" &&
        claim.accessBlocked === true &&
        claim.gates.artifactAcquired === false &&
        claim.gates.schemaExtracted === false
    )
  ).toBe(true);
});
