import { describe, expect, test } from "vitest";

import { deriveStandardFeasibility } from "../generate-research.mjs";
import { PROOF_GATES } from "../proof-ledger.mjs";

const standardId = "STD-TEST";

function processRecord({
  categoryId,
  processKey,
  proofLevel,
  standardIds = [standardId],
  contributions
}) {
  return {
    categoryId,
    processKey,
    standardIds,
    proofLevel,
    ...(contributions ? { contributions } : {})
  };
}

function standard(accessClass = "completely free") {
  return {
    id: standardId,
    accessClass
  };
}

describe("proof-derived Standard feasibility", () => {
  test("requires every bound process to be end-to-end real for FEASIBLE_NOW", () => {
    const result = deriveStandardFeasibility(standard(), [
      processRecord({
        categoryId: "ITC-01",
        processKey: "proved",
        proofLevel: "END_TO_END_REAL"
      }),
      processRecord({
        categoryId: "ITC-02",
        processKey: "unproved",
        proofLevel: "DOCUMENTATION_ONLY"
      })
    ]);

    expect(result.feasibility).toBe("PARTIALLY_FEASIBLE");
    expect(result.endToEndProcessCount).toBe(1);
    expect(result.processCount).toBe(2);
  });

  test("uses adapter work only when real source execution exists without an end-to-end process", () => {
    const result = deriveStandardFeasibility(standard(), [
      processRecord({
        categoryId: "ITC-01",
        processKey: "source-verified",
        proofLevel: "REAL_SOURCE_PARTIAL"
      }),
      processRecord({
        categoryId: "ITC-02",
        processKey: "unproved",
        proofLevel: "DOCUMENTATION_ONLY"
      })
    ]);

    expect(result.feasibility).toBe("FEASIBLE_AFTER_ADAPTER_WORK");
    expect(result.endToEndProcessCount).toBe(0);
    expect(result.sourceVerifiedProcessCount).toBe(1);
  });

  test("keeps access probes out of FEASIBLE_AFTER_MANUAL_SEED", () => {
    const contribution = {
      contributionId: "blocked",
      coveredStandardIds: [standardId],
      proofLevel: "ACCESS_BLOCKED",
      realArtifacts: [
        {
          official: true,
          acquisitionMode: "OFFICIAL_ENDPOINT_ACCESS_PROBE"
        }
      ],
      gates: Object.fromEntries(
        PROOF_GATES.map((gate) => [gate, false])
      )
    };
    const result = deriveStandardFeasibility(
      standard("free with manual export"),
      [
        processRecord({
          categoryId: "ITC-01",
          processKey: "blocked",
          proofLevel: "ACCESS_BLOCKED",
          contributions: [contribution]
        })
      ]
    );

    expect(result.feasibility).toBe(
      "NOT_FEASIBLE_WITH_CURRENT_PUBLIC_SOURCES"
    );
    expect(result.manualExportReadyProcessCount).toBe(0);
  });

  test("allows manual seed only after a genuine export reaches downstream gates", () => {
    const contribution = {
      contributionId: "manual-export",
      coveredStandardIds: [standardId],
      proofLevel: "SOURCE_TO_STANDARD_REAL",
      realArtifacts: [
        {
          official: true,
          acquisitionMode: "OFFICIAL_MANUAL_EXPORT"
        }
      ],
      gates: Object.fromEntries(PROOF_GATES.map((gate) => [gate, true]))
    };
    contribution.gates.formulaTermReached = false;
    const result = deriveStandardFeasibility(
      standard("free with manual export"),
      [
        processRecord({
          categoryId: "ITC-01",
          processKey: "exported",
          proofLevel: "SOURCE_TO_STANDARD_REAL",
          contributions: [contribution]
        })
      ]
    );

    expect(result.feasibility).toBe("FEASIBLE_AFTER_MANUAL_SEED");
    expect(result.manualExportReadyProcessCount).toBe(1);
  });

  test("does not credit proof to an unnamed Standard on a multi-Standard process", () => {
    const result = deriveStandardFeasibility(standard(), [
      processRecord({
        categoryId: "ITC-01",
        processKey: "shared",
        proofLevel: "END_TO_END_REAL",
        standardIds: ["STD-OTHER", standardId],
        contributions: [
          {
            contributionId: "other-only",
            coveredStandardIds: ["STD-OTHER"],
            proofLevel: "END_TO_END_REAL"
          }
        ]
      })
    ]);

    expect(result.feasibility).toBe(
      "NOT_FEASIBLE_WITH_CURRENT_PUBLIC_SOURCES"
    );
    expect(result.proofLevelCounts.DOCUMENTATION_ONLY).toBe(1);
  });
});
