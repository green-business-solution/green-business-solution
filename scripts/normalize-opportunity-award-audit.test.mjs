import fs from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { afterEach, describe, expect, it } from "vitest";
import {
  buildCanonicalOverlay,
  countRecordsByOpportunity,
  normalizeAndValidateReview,
  normalizeFromManifest,
  normalizeApprovalStage as normalizeApprovalStageValue
} from "./normalize-opportunity-award-audit.mjs";

const tmpDirs = [];

afterEach(async () => {
  await Promise.all(tmpDirs.splice(0).map((dir) => fs.rm(dir, { recursive: true, force: true })));
});

describe("normalize-opportunity-award-audit", () => {
  it("maps combined legacy approval stages into canonical multiple", () => {
    const normalized = normalizeApprovalStageValue("pre_construction_application_and_post_completion_verification");

    expect(normalized.canonical).toBe("multiple");
    expect(["combined_separator", "combined_phase"]).toContain(normalized.method);
    expect(normalized.notes[0]).toMatch(/multiple/i);
  });

  it("normalizes markdown evidence URLs and records malformed links", () => {
    const normalized = normalizeAndValidateReview(
      {
        opportunityId: "opp-1",
        requiresProgramApproval: true,
        approvalRequirements: ["EPA registration"],
        approvalStage: "competitive_pre_project_application",
        awardLikelihood: "likely",
        awardLikelihoodReason: "Strong eligibility match and program fit.",
        evidenceUrls: ["[Program](https://program.example.com/evidence)", "mailto:test@example.com"],
        evidenceText: "Evidence from the official portal.",
        reviewedAt: "2026-07-01T00:00:00.000Z",
        reviewStatus: "audited",
        awardLikelihoodEvidence: "Observed official language in docs."
      },
      {
        opportunityRecord: {
          sourceUrl: "https://program.example.com",
          websiteUrl: "https://program.example.com/details"
        }
      }
    );

    expect(normalized.ok).toBe(true);
    expect(normalized.normalized?.evidenceUrls).toEqual(["https://program.example.com/evidence"]);
    expect(normalized.warnings.join(" ")).toMatch(/Malformed evidenceUrls/);
    expect(normalized.normalized?.normalization.awardEvidenceNormalization.originalEvidenceUrls).toEqual([
      "[Program](https://program.example.com/evidence)",
      "mailto:test@example.com"
    ]);
  });

  it("rejects non-official evidence when approval is required", () => {
    const normalized = normalizeAndValidateReview(
      {
        opportunityId: "opp-2",
        requiresProgramApproval: true,
        approvalRequirements: ["official submittal"],
        approvalStage: "before_installation",
        awardLikelihood: "possible",
        awardLikelihoodReason: "Program appears possible but evidence is weak.",
        evidenceUrls: ["https://third-party-blog.example.com/nonsense"],
        evidenceText: "Reference from partner directory.",
        reviewedAt: "2026-07-01T00:00:00.000Z",
        reviewStatus: "audited",
        awardLikelihoodEvidence: "No direct official text captured."
      },
      {
        opportunityRecord: {
          sourceUrl: "https://program.example.com/app",
          websiteUrl: "https://program.example.com"
        }
      }
    );

    expect(normalized.ok).toBe(true);
    expect(normalized.normalized?.reviewStatus).toBe("needs_followup");
    expect(normalized.warnings.join(" ")).toMatch(/no official-host evidenceUrl/i);
    expect(normalized.normalized?.normalization.awardEvidenceNormalization.officialEvidenceUrls).toEqual([]);
  });

  it("maps awardLikelihood near_guaranteed and rare to canonical values with trace", () => {
    const nearGuaranteed = normalizeAndValidateReview({
      opportunityId: "opp-a1",
      requiresProgramApproval: true,
      approvalRequirements: ["official source evidence"],
      approvalStage: "before_installation",
      awardLikelihood: "near_guaranteed",
      awardLikelihoodReason: "Strong proof in source.",
      evidenceUrls: ["https://program.example.com/evidence"],
      evidenceText: "Reviewed with examples.",
      reviewedAt: "2026-07-01T00:00:00.000Z",
      reviewStatus: "audited",
      awardLikelihoodEvidence: "Mapped likelihood signal."
    });
    expect(nearGuaranteed.ok).toBe(true);
    expect(nearGuaranteed.normalized?.awardLikelihood).toBe("likely");
    expect(nearGuaranteed.normalized?.normalization.awardLikelihoodMethod).toBe("legacy_near_guaranteed");

    const rare = normalizeAndValidateReview({
      opportunityId: "opp-a2",
      requiresProgramApproval: true,
      approvalRequirements: ["official source evidence"],
      approvalStage: "before_installation",
      awardLikelihood: "rare",
      awardLikelihoodReason: "Only limited opportunities.",
      evidenceUrls: ["https://program.example.com/evidence"],
      evidenceText: "Reviewed with examples.",
      reviewedAt: "2026-07-01T00:00:00.000Z",
      reviewStatus: "audited",
      awardLikelihoodEvidence: "Mapped likelihood signal."
    });
    expect(rare.ok).toBe(true);
    expect(rare.normalized?.awardLikelihood).toBe("unlikely");
    expect(rare.normalized?.normalization.awardLikelihoodMethod).toBe("legacy_rare");
  });

  it("maps requiresProgramApproval string unknown to null and marks follow-up", () => {
    const normalized = normalizeAndValidateReview({
      opportunityId: "opp-a3",
      requiresProgramApproval: "unknown",
      approvalRequirements: [],
      approvalStage: "before_purchase",
      awardLikelihood: "possible",
      awardLikelihoodReason: "Source did not provide a definitive yes/no answer.",
      evidenceUrls: ["https://program.example.com/evidence"],
      evidenceText: "Evidence provided in notes.",
      reviewedAt: "2026-07-01T00:00:00.000Z",
      reviewStatus: "audited",
      awardLikelihoodEvidence: "Evidence supports possible outcome."
    });
    expect(normalized.ok).toBe(true);
    expect(normalized.normalized?.requiresProgramApproval).toBeNull();
    expect(normalized.normalized?.reviewStatus).toBe("needs_followup");
    expect(normalized.normalized?.normalization.requiresProgramApprovalMethod).toBe("legacy_unknown");
  });

  it("flags duplicate, missing, and extra IDs during manifest reconciliation", async () => {
    const dir = await makeTmpDir();
    await writeManifestFixture(dir, {
      batches: [
        { batchId: "batch-001", inputFile: "batch-001_input.json", outputFile: "batch-001_output.json" },
        { batchId: "batch-002", inputFile: "batch-002_input.json", outputFile: "batch-002_output.json" }
      ]
    });

    await writeJson(path.join(dir, "batch-001_input.json"), {
      opportunities: [
        { opportunityId: "opp-1", sourceUrl: "https://program.example.com/opp-1" },
        { opportunityId: "opp-2", sourceUrl: "https://program.example.com/opp-2" }
      ]
    });
    await writeJson(path.join(dir, "batch-002_input.json"), {
      opportunities: [{ opportunityId: "opp-3", sourceUrl: "https://program.example.com/opp-3" }]
    });

    await writeJson(path.join(dir, "batch-001_output.json"), {
      schemaVersion: "opportunity-award-audit-output.v1",
      batchId: "batch-001",
      inputFile: "batch-001_input.json",
      inputRecordCount: 2,
      generatedAt: "2026-07-01T00:00:00.000Z",
      reviews: [
        buildSampleReview("opp-1", true),
        buildSampleReview("opp-1", true)
      ]
    });

    await writeJson(path.join(dir, "batch-002_output.json"), {
      schemaVersion: "opportunity-award-audit-output.v1",
      batchId: "batch-002",
      inputFile: "batch-002_input.json",
      inputRecordCount: 1,
      generatedAt: "2026-07-01T00:00:00.000Z",
      reviews: [
        buildSampleReview("opp-extra", true)
      ]
    });

    const result = normalizeFromManifest(dir);

    expect(result.ok).toBe(false);
    expect(result.missingOpportunityIds.sort()).toEqual(["opp-2", "opp-3"]);
    expect(result.duplicateOpportunityCount).toBe(1);
    expect(result.missingOpportunityCount).toBe(2);
    expect(result.rejectedOpportunityCount).toBe(0);
    expect(result.errors.some((error) => /not in this batch input/i.test(error))).toBe(true);
  });

  it("builds canonical overlay with preserved normalization trace", async () => {
    const dir = await makeTmpDir();
    await writeManifestFixture(dir, {
      batches: [
        { batchId: "batch-001", inputFile: "batch-001_input.json", outputFile: "batch-001_output.json" }
      ]
    });
    await writeJson(path.join(dir, "batch-001_input.json"), {
      opportunities: [{
        opportunityId: "opp-1",
        sourceUrl: "https://program.example.com/source",
        websiteUrl: "https://program.example.com/site"
      }]
    });
    await writeJson(path.join(dir, "batch-001_output.json"), {
      schemaVersion: "opportunity-award-audit-output.v1",
      batchId: "batch-001",
      inputFile: "batch-001_input.json",
      inputRecordCount: 1,
      generatedAt: "2026-07-01T00:00:00.000Z",
      reviews: [
        {
          opportunityId: "opp-1",
          requiresProgramApproval: true,
          approvalRequirements: ["official application guidance"],
          approvalStage: "document-review",
          awardLikelihood: "likely",
          awardLikelihoodReason: "Clear program docs in official guidance.",
          evidenceUrls: ["https://program.example.com/evidence"],
          evidenceText: "Evidence from official portal.",
          reviewedAt: "2026-07-01T00:00:00.000Z",
          reviewStatus: "audited",
          awardLikelihoodEvidence: "Observed language says eligible."
        }
      ]
    });

    const normalized = normalizeFromManifest(dir);
    const overlay = buildCanonicalOverlay(normalized);

    expect(normalized.ok).toBe(true);
    expect(overlay.records["opp-1"]).toMatchObject({
      approvalStage: "before_installation",
      awardLikelihood: "likely",
      requiresProgramApproval: true
    });
    expect(overlay.records["opp-1"].auditTrace.approvalStage).toMatchObject({
      canonical: "before_installation",
      method: "legacy_mapping",
      requiresManualAttention: false
    });
  });

  it("counts records for reporting and official-evidence coverage", () => {
    const recordsById = new Map([
      [
        "opp-1",
        {
          awardLikelihood: "likely",
          requiresProgramApproval: true,
          reviewStatus: "audited",
          approvalStage: "before_purchase",
          normalization: {
            approvalStageMethod: "legacy_mapping",
            awardLikelihoodMethod: "canonical",
            requiresProgramApprovalMethod: "canonical",
            requiresManualAttention: false,
            sourceTrace: { rawApprovalStage: "application" },
            awardEvidenceNormalization: { officialEvidenceUrls: ["https://program.example.com/evidence"] }
          },
          evidenceUrls: ["https://program.example.com/evidence"]
        }
      ],
      [
        "opp-2",
        {
          awardLikelihood: "unknown",
          requiresProgramApproval: false,
          reviewStatus: "not_audited",
          approvalStage: "unknown",
          normalization: {
            approvalStageMethod: "fallback_unknown",
            awardLikelihoodMethod: "fallback_unknown",
            requiresProgramApprovalMethod: "fallback_unknown",
            requiresManualAttention: true,
            sourceTrace: { rawApprovalStage: "nonsensical-stage" },
            awardEvidenceNormalization: { officialEvidenceUrls: [] }
          },
          evidenceUrls: [],
        }
      ]
    ]);

    const counts = countRecordsByOpportunity(recordsById);

    expect(counts.awardLikelihood.likely).toBe(1);
    expect(counts.awardLikelihood.unknown).toBe(1);
    expect(counts.requiresProgramApproval.true).toBe(1);
    expect(counts.requiresProgramApproval.false).toBe(1);
    expect(counts.normalizationMethod.legacy_mapping).toBe(1);
    expect(counts.normalizationMethod.fallback_unknown).toBe(1);
    expect(counts.awardLikelihoodMethod.canonical).toBe(1);
    expect(counts.awardLikelihoodMethod.fallback_unknown).toBe(1);
    expect(counts.requiresProgramApprovalMethod.canonical).toBe(1);
    expect(counts.requiresProgramApprovalMethod.fallback_unknown).toBe(1);
    expect(counts.officialEvidenceCoverage.covered).toBe(1);
    expect(counts.officialEvidenceCoverage.missing).toBe(1);
    expect(counts.normalizationTrace.requiresManualAttention).toBe(1);
  });
});

async function makeTmpDir() {
  const dir = await fs.mkdtemp(path.join(os.tmpdir(), "retrofi-award-audit-test-"));
  tmpDirs.push(dir);
  return dir;
}

async function writeJson(filePath, value) {
  await fs.writeFile(filePath, `${JSON.stringify(value, null, 2)}\n`, "utf8");
}

async function writeManifestFixture(dir, manifest) {
  await writeJson(path.join(dir, "manifest.json"), {
    schemaVersion: "opportunity-award-audit-batch-manifest.v1",
    ...manifest
  });
}

function buildSampleReview(opportunityId, requiresProgramApproval = true) {
  return {
    opportunityId,
    requiresProgramApproval,
    approvalRequirements: ["official application guidance"],
    approvalStage: "pre-application",
    awardLikelihood: "likely",
    awardLikelihoodReason: "Initial research suggests likely.",
    evidenceUrls: ["https://program.example.com/evidence"],
    evidenceText: "Evidence from the official portal.",
    reviewedAt: "2026-07-01T00:00:00.000Z",
    reviewStatus: "audited",
    awardLikelihoodEvidence: "Observed program language."
  };
}
