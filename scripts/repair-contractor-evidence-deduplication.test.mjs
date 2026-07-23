import { describe, expect, it, vi } from "vitest";

import { repairContractorEvidenceDeduplication } from "./repair-contractor-evidence-deduplication.mjs";

const RUN_ID = "directory-resolution-20260723T185235786Z";

describe("repairContractorEvidenceDeduplication", () => {
  it("requires exactly five duplicate evidence arrays before proposing repairs", async () => {
    const aws = buildAws();
    const result = await repairContractorEvidenceDeduplication(
      {
        approval: "",
        output: "",
        profile: "retrofi-prod",
        write: false,
      },
      { aws },
    );

    expect(result.report).toMatchObject({
      mode: "dry-run",
      proposedRepairCount: 5,
      removedDuplicateCount: 5,
      awsWriteCount: 0,
    });
    expect(aws.updateContractor).not.toHaveBeenCalled();
    expect(aws.uploadJson).not.toHaveBeenCalled();
  });

  it("conditionally updates only enrichment evidence and uploads its report", async () => {
    const aws = buildAws();
    const result = await repairContractorEvidenceDeduplication(
      {
        approval: RUN_ID,
        output: "",
        profile: "retrofi-prod",
        write: true,
      },
      { aws },
    );

    expect(aws.updateContractor).toHaveBeenCalledTimes(5);
    for (const [update] of aws.updateContractor.mock.calls) {
      expect(Object.keys(update.expected)).toEqual([
        "enrichmentEvidence",
      ]);
      expect(Object.keys(update.set)).toEqual([
        "enrichmentEvidence",
      ]);
      expect(update.set.enrichmentEvidence).toHaveLength(1);
    }
    expect(aws.uploadJson).toHaveBeenCalledOnce();
    expect(result.report).toMatchObject({
      mode: "write",
      repairedContractorCount: 5,
      awsWriteCount: 6,
    });
  });
});

function buildAws() {
  return {
    assertInfrastructure: vi.fn(),
    getAccountId: vi.fn().mockResolvedValue("059310317821"),
    readJson: vi.fn().mockResolvedValue(null),
    scanContractors: vi.fn().mockResolvedValue(
      Array.from({ length: 5 }, (_, index) => ({
        contractorId: `CA_CSLB_${index + 1}`,
        email: `existing-${index + 1}@example.test`,
        supportedRetrofitIds: ["approved_retrofit"],
        enrichmentEvidence: [
          evidence("directory_name"),
          evidence("exact_license"),
        ],
      })),
    ),
    updateContractor: vi.fn(),
    uploadJson: vi.fn(),
  };
}

function evidence(matchMethod) {
  return {
    field: "programMemberships",
    matchMethod,
    sourceId: "official-directory",
    sourceName: "Official Directory",
    sourceUrl: "https://example.test/directory",
    sourceValue: "Member",
    verificationDate: "2026-07-23",
  };
}
