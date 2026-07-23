import fs from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";

import { describe, expect, it, vi } from "vitest";

import {
  DEFAULT_MAPPING_PATH,
  buildContractorItem,
  contractorIdForLicense,
  normalizeClassificationCode,
  parseCslbSource,
  runCslbImport,
  writeBatchWithRetries,
} from "./import-cslb-contractors.mjs";

const fixturePath = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  "__fixtures__/cslb-master-license-sample.csv",
);
const fixedDate = new Date("2026-07-23T16:00:00.000Z");
const itemContext = {
  importId: "cslb-test",
  importedAt: fixedDate.toISOString(),
  s3SourceKey: "raw/cslb/2026-07-23/sample.csv",
  sourceReceivedAt: fixedDate.toISOString(),
};

describe("CSLB contractor import", () => {
  it("normalizes official CSLB classification variants without inferring unknown tokens", () => {
    expect(normalizeClassificationCode("C10")).toBe("C-10");
    expect(normalizeClassificationCode("C 10")).toBe("C-10");
    expect(normalizeClassificationCode("D12")).toBe("C-61/D-12");
    expect(normalizeClassificationCode("D-12")).toBe("C-61/D-12");
    expect(normalizeClassificationCode("C61/D12")).toBe("C-61/D-12");
    expect(normalizeClassificationCode("C-61 / D-12")).toBe(
      "C-61/D-12",
    );
    expect(normalizeClassificationCode("MYSTERY")).toBeNull();
  });

  it("parses real headers, merges duplicate licenses, and reports conflicts", async () => {
    const parsed = await parseCslbSource(fixturePath);
    expect(parsed.sourceHeaders).toHaveLength(52);
    expect(parsed.sourceRowCount).toBe(7);
    expect(parsed.contractorsByLicense.size).toBe(5);
    expect(parsed.duplicateLicenseNumbers).toEqual(new Set(["000123"]));
    expect(parsed.duplicateRowCount).toBe(1);
    expect(parsed.malformedRowCount).toBe(1);
    expect(parsed.conflictCounts.get("phone")).toBe(1);
    expect(parsed.unknownClassificationCounts.get("MYSTERY")).toBe(1);
    expect(parsed.ignoredCredentialTokenCounts.get("HAZ")).toBe(1);
    expect(parsed.ignoredCredentialTokenCounts.get("ASB")).toBe(1);

    const merged = parsed.contractorsByLicense.get("000123");
    expect(merged.licenseClassifications).toEqual([
      "C-10",
      "C-20",
      "C-61/D-12",
    ]);
    expect(merged.primaryStatus).toBe("CLEAR");
    expect(merged.businessAddress.county).toBe("Alameda");
  });

  it("derives relevant Retrofit IDs deterministically and omits empty fields", async () => {
    const parsed = await parseCslbSource(fixturePath);
    const mappingJson = JSON.parse(
      await fs.readFile(DEFAULT_MAPPING_PATH, "utf8"),
    );
    const mapping = new Map(
      mappingJson.classifications.map((entry) => [
        entry.classificationCode,
        entry,
      ]),
    );
    const record = parsed.contractorsByLicense.get("000127");
    const first = buildContractorItem(record, mapping, itemContext);
    const second = buildContractorItem(record, mapping, itemContext);

    expect(contractorIdForLicense("000127")).toBe("CA_CSLB_000127");
    expect(first.contractorId).toBe("CA_CSLB_000127");
    expect(first.source.sourceRecordHash).toBe(
      second.source.sourceRecordHash,
    );
    expect(first.supportedRetrofitIds).toEqual(
      [...first.supportedRetrofitIds].sort(),
    );
    expect(first).not.toHaveProperty("phone");
    expect(first).not.toHaveProperty("licenseIssueDate");
    expect(first.businessAddress).not.toHaveProperty("line1");
    expect(first.businessAddress.county).toBe("Los Angeles");
    expect(first.primaryStatus).toBe("CLEAR");
    expect(JSON.stringify(first)).not.toContain("null");

    const mergedItem = buildContractorItem(
      parsed.contractorsByLicense.get("000123"),
      mapping,
      itemContext,
    );
    expect(mergedItem.matchedClassificationCodes).toEqual([
      "C-10",
      "C-20",
      "C-61/D-12",
    ]);
    expect(mergedItem.supportedRetrofitIds).toEqual(
      [...new Set(mergedItem.supportedRetrofitIds)].sort(),
    );
  });

  it("performs a complete dry run with zero AWS access or writes", async () => {
    const outputDirectory = await fs.mkdtemp(
      path.join(os.tmpdir(), "retrofi-cslb-test-"),
    );
    const aws = {
      getAccountId: vi.fn(() => {
        throw new Error("Dry run must not access AWS.");
      }),
    };

    try {
      const result = await runCslbImport(
        {
          enforceStatewide: false,
          outputDirectory,
          quiet: true,
          sourceFile: fixturePath,
          write: false,
        },
        {
          aws,
          now: () => fixedDate,
        },
      );

      expect(aws.getAccountId).not.toHaveBeenCalled();
      expect(result.report.awsWriteCount).toBe(0);
      expect(result.report.dryRunConfirmedZeroAwsWrites).toBe(true);
      expect(result.report.relevantContractorCount).toBe(4);
      expect(result.report.irrelevantContractorCount).toBe(1);
      expect(result.report.duplicateLicenseCount).toBe(1);
      expect(result.report.unknownClassificationCount).toBe(1);
      expect(result.report.writtenContractorCount).toBe(0);
      await expect(fs.stat(result.localManifestPath)).resolves.toBeDefined();
      await expect(fs.stat(result.localReportPath)).resolves.toBeDefined();
    } finally {
      await fs.rm(outputDirectory, { recursive: true, force: true });
    }
  });

  it("retries DynamoDB unprocessed items with a fixed bound", async () => {
    const item = { contractorId: "CA_CSLB_000123" };
    const sendBatch = vi
      .fn()
      .mockResolvedValueOnce({
        UnprocessedItems: {
          "gbs-contractors": [{ PutRequest: { Item: item } }],
        },
      })
      .mockResolvedValueOnce({
        UnprocessedItems: {
          "gbs-contractors": [{ PutRequest: { Item: item } }],
        },
      })
      .mockResolvedValueOnce({ UnprocessedItems: {} });
    const sleep = vi.fn().mockResolvedValue(undefined);

    const result = await writeBatchWithRetries({
      items: [item],
      sendBatch,
      sleep,
      tableName: "gbs-contractors",
    });

    expect(result.writtenCount).toBe(1);
    expect(result.failedItems).toEqual([]);
    expect(result.requestCount).toBe(3);
    expect(sendBatch).toHaveBeenCalledTimes(3);
    expect(sleep).toHaveBeenCalledTimes(2);
  });
});
