import {
  mkdtemp,
  rm,
  writeFile
} from "node:fs/promises";
import { createHash } from "node:crypto";
import { tmpdir } from "node:os";
import { join } from "node:path";
import {
  afterAll,
  beforeAll,
  expect,
  test
} from "vitest";

import {
  inspectWaterSenseOperatorExport,
  OPERATOR_IMPORT_CONTRACT,
  OPERATOR_IMPORT_CONTRACT_FINGERPRINT,
  validateWaterSenseOperatorManifest
} from "../adapters/watersense-fixtures/operator-import.mjs";

let temporaryRoot;

beforeAll(async () => {
  process.env.OS_RESEARCH_NETWORK = "disabled";
  temporaryRoot = await mkdtemp(
    join(tmpdir(), "retrofi-watersense-operator-")
  );
});

afterAll(async () => {
  if (temporaryRoot) {
    await rm(temporaryRoot, { recursive: true, force: true });
  }
});

function validManifest() {
  return {
    schemaVersion:
      "operational-savings/watersense-operator-export-package-v1",
    sourcePageUrl:
      "https://www.epa.gov/watersense/product-search",
    downloadedAt: "2026-07-24T01:00:00.000Z",
    artifact: {
      fileName: "watersense-products.xlsx",
      byteSize: 123,
      sha256:
        "1111111111111111111111111111111111111111111111111111111111111111"
    },
    worksheet: {
      name: "Products",
      headerRow: 1
    },
    columnMappings: [
      {
        role: "sourceRecordId",
        sourceHeader: "Operator-observed ID"
      },
      {
        role: "productType",
        sourceHeader: "Operator-observed product type"
      },
      {
        role: "brand",
        sourceHeader: "Operator-observed brand"
      },
      {
        role: "modelNumber",
        sourceHeader: "Operator-observed model"
      },
      {
        role: "certificationStatus",
        sourceHeader: "Operator-observed certification status"
      },
      {
        role: "ratedValue",
        sourceHeader: "Operator-observed rated value"
      }
    ],
    ratedUnitRules: [
      {
        productType: "Operator-observed flow fixture category",
        unit: "gallons/minute"
      },
      {
        productType: "Operator-observed flush fixture category",
        unit: "gallons/flush"
      }
    ],
    attestation: {
      usedPublicProductSearchPage: true,
      usedDisplayedDownloadAction: true,
      accessedEnvironmentEndpoint: false,
      copiedApiKey: false,
      usedGuessedEndpoint: false
    }
  };
}

test("pins the repository operator-import contract but not a product schema", () => {
  const fingerprint = createHash("sha256")
    .update(JSON.stringify(OPERATOR_IMPORT_CONTRACT))
    .digest("hex");
  expect(fingerprint).toBe(
    OPERATOR_IMPORT_CONTRACT_FINGERPRINT
  );
  expect(
    validateWaterSenseOperatorManifest(validManifest())
  ).toMatchObject({
    sourcePageUrl:
      "https://www.epa.gov/watersense/product-search",
    worksheet: {
      name: "Products",
      headerRow: 1
    }
  });
});

test("rejects secret-derived or guessed acquisition paths", () => {
  for (const mutation of [
    { accessedEnvironmentEndpoint: true },
    { copiedApiKey: true },
    { usedGuessedEndpoint: true },
    { usedDisplayedDownloadAction: false }
  ]) {
    const manifest = validManifest();
    Object.assign(manifest.attestation, mutation);
    expect(() =>
      validateWaterSenseOperatorManifest(manifest)
    ).toThrow(/UNLAWFUL_OR_UNREVIEWED_ACQUISITION/);
  }
  const wrongPage = validManifest();
  wrongPage.sourcePageUrl =
    "https://example.test/guessed-products.xlsx";
  expect(() =>
    validateWaterSenseOperatorManifest(wrongPage)
  ).toThrow(/INVALID_OPERATOR_PACKAGE: sourcePageUrl/);
});

test("rejects incomplete mappings and unsupported unit claims", () => {
  const missingRole = validManifest();
  missingRole.columnMappings = missingRole.columnMappings.filter(
    (mapping) => mapping.role !== "ratedValue"
  );
  expect(() =>
    validateWaterSenseOperatorManifest(missingRole)
  ).toThrow(/columnMappings|missing column role ratedValue/);

  const unsupportedUnit = validManifest();
  unsupportedUnit.ratedUnitRules[0].unit = "liters/minute";
  expect(() =>
    validateWaterSenseOperatorManifest(unsupportedUnit)
  ).toThrow(/unsupported rated unit/);
});

test("fails a mismatched operator artifact before schema inspection", async () => {
  const artifactPath = join(temporaryRoot, "products.xlsx");
  const manifestPath = join(temporaryRoot, "products.json");
  await writeFile(artifactPath, "not a real export\n", "utf8");
  await writeFile(
    manifestPath,
    `${JSON.stringify(validManifest(), null, 2)}\n`,
    "utf8"
  );
  await expect(
    inspectWaterSenseOperatorExport({
      artifactPath,
      manifestPath
    })
  ).rejects.toThrow(/ARTIFACT_SIZE_MISMATCH|CORRUPT_CHECKSUM/);
});

test("requires offline mode and never calls fetch", async () => {
  const artifactPath = join(temporaryRoot, "offline.xlsx");
  const manifestPath = join(temporaryRoot, "offline.json");
  await writeFile(artifactPath, "unused\n", "utf8");
  await writeFile(
    manifestPath,
    `${JSON.stringify(validManifest())}\n`,
    "utf8"
  );
  const previousNetwork = process.env.OS_RESEARCH_NETWORK;
  const previousFetch = globalThis.fetch;
  let fetchCalls = 0;
  globalThis.fetch = async () => {
    fetchCalls += 1;
    throw new Error("network must not be called");
  };
  try {
    process.env.OS_RESEARCH_NETWORK = "enabled";
    await expect(
      inspectWaterSenseOperatorExport({
        artifactPath,
        manifestPath
      })
    ).rejects.toThrow(/OFFLINE_GUARD_REQUIRED/);
    expect(fetchCalls).toBe(0);
  } finally {
    process.env.OS_RESEARCH_NETWORK = previousNetwork;
    globalThis.fetch = previousFetch;
  }
});
