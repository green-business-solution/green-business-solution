import { describe, expect, test } from "vitest";

import {
  buildMergedResearchView,
  nextActionForProcess,
  renderCategoryReport,
  renderStandardReport
} from "../generate-research.mjs";

const canonicalProcess = {
  key: "test-process",
  name: "Test Process",
  canonicalStandardIds: ["STD-TEST"],
  lookupInputs: ["Owned input"],
  valueNeeded: ["Calculated output"],
  validation: "Canonical planning validation",
  inputBindings: [
    {
      lookupInput: "Owned input",
      sourceLabel: "Project Document",
      treePath: "Root > Owned input"
    }
  ],
  outputBindings: [
    {
      outputName: "Calculated output",
      formulaTerm: "calculated_output",
      outputUnit: "kWh/year",
      outputScope: "PER_YEAR",
      treePath: "Root > Calculated output"
    }
  ]
};

const category = {
  id: "ITC-99",
  title: "Test Category",
  standardIds: ["STD-TEST"],
  informationCard: {
    processes: [canonicalProcess]
  }
};

function proofProcess(overrides = {}) {
  return {
    categoryId: "ITC-99",
    categoryTitle: "Test Category",
    processKey: "test-process",
    processName: "Test Process",
    standardIds: ["STD-TEST"],
    requiredInputs: [
      {
        inputName: "Owned input",
        sourceOwner: "Project Document",
        treePath: "Root > Owned input"
      }
    ],
    outputBindings: [
      {
        outputName: "Calculated output",
        formulaTerm: "calculated_output",
        unit: "kWh/year",
        scope: "PER_YEAR",
        treePath: "Root > Calculated output"
      }
    ],
    declaredProofLevel: "END_TO_END_REAL",
    proofLevel: "DOCUMENTATION_ONLY",
    adapterPath: "scripts/research/test-adapter.mjs",
    executionTestResults: [
      {
        testId: "test-adapter-proof",
        path: null,
        name: null,
        status: "NOT_COVERED",
        durationMs: null
      }
    ],
    blocker: {
      code: "EXECUTION_RECORD_STALE",
      detail: "The current proof run does not cover this adapter test."
    },
    contributions: [],
    ...overrides
  };
}

function mergedFixture(proof = proofProcess()) {
  return buildMergedResearchView(
    {
      standards: [{ id: "STD-TEST" }],
      categoryReviews: [category]
    },
    {
      processes: [proof]
    }
  );
}

describe("merged canonical and proof research view", () => {
  test("merges one exact process identity without losing canonical bindings", () => {
    const merged = mergedFixture();

    expect(merged.processes).toHaveLength(1);
    expect(merged.processes[0].inputBindings).toEqual(
      canonicalProcess.inputBindings
    );
    expect(merged.processes[0].proof.proofLevel).toBe(
      "DOCUMENTATION_ONLY"
    );
  });

  test("fails closed when canonical and proof Standard bindings disagree", () => {
    expect(() =>
      mergedFixture(
        proofProcess({
          standardIds: ["STD-OTHER"]
        })
      )
    ).toThrow(
      "Canonical and proof process views disagree for ITC-99\u0000test-process field standardIds"
    );
  });

  test("fails closed when canonical and proof output contracts disagree", () => {
    const outputBindings = structuredClone(
      proofProcess().outputBindings
    );
    outputBindings[0].unit = "MWh/year";

    expect(() =>
      mergedFixture(
        proofProcess({
          outputBindings
        })
      )
    ).toThrow(
      "Canonical and proof process views disagree for ITC-99\u0000test-process field outputBindings"
    );
  });

  test("renders the execution-verified level, test result, blocker, and conditional action", () => {
    const merged = mergedFixture();
    const report = renderCategoryReport(
      category,
      new Map([
        [
          "STD-TEST",
          {
            feasibility: "NOT_FEASIBLE_WITH_CURRENT_PUBLIC_SOURCES",
            internalTargets: ["selected_values"]
          }
        ]
      ]),
      merged.processesByCategory.get("ITC-99")
    );

    expect(report).toContain("DOCUMENTATION_ONLY");
    expect(report).toContain(
      "test-adapter-proof: NOT_COVERED"
    );
    expect(report).toContain("EXECUTION_RECORD_STALE");
    expect(report).toContain(
      "Acquire or implement the missing evidence"
    );
    expect(report).not.toContain("END_TO_END_REAL");
    expect(report).not.toContain(
      "Implement and accept the shared source-family adapters"
    );
  });

  test("selects a distinct next action for every proof state", () => {
    const levels = [
      "END_TO_END_REAL",
      "SOURCE_TO_STANDARD_REAL",
      "REAL_SOURCE_PARTIAL",
      "SYNTHETIC_ONLY",
      "DOCUMENTATION_ONLY",
      "ACCESS_BLOCKED",
      "SOURCE_UNSUPPORTED"
    ];
    const actions = levels.map((proofLevel) =>
      nextActionForProcess({
        proofLevel,
        blocker: {
          code: "TEST_BLOCKER",
          detail: "Test blocker detail."
        }
      })
    );

    expect(new Set(actions).size).toBe(levels.length);
  });
});

describe("proof-backed Standard report", () => {
  test("uses retained proof releases and one nonduplicated semantic outline", () => {
    const proof = proofProcess({
      declaredProofLevel: "SOURCE_TO_STANDARD_REAL",
      proofLevel: "SOURCE_TO_STANDARD_REAL",
      executionTestResults: [
        {
          testId: "test-adapter-proof",
          path: "scripts/research/test-adapter.test.mjs",
          name: "executes retained artifact",
          status: "PASSED",
          durationMs: 1
        }
      ],
      blocker: {
        code: "FORMULA_MAPPING_PENDING",
        detail: "The Standard output has not reached the category formula."
      },
      contributions: [
        {
          contributionId: "test-adapter:ITC-99:test-process:1",
          coveredStandardIds: ["STD-TEST"],
          proofLevel: "SOURCE_TO_STANDARD_REAL",
          adapterPath: "scripts/research/test-adapter.mjs",
          executionTestResults: [
            {
              testId: "test-adapter-proof",
              path: "scripts/research/test-adapter.test.mjs",
              name: "executes retained artifact",
              status: "PASSED",
              durationMs: 1
            }
          ],
          blocker: {
            code: "FORMULA_MAPPING_PENDING",
            detail:
              "The Standard output has not reached the category formula."
          },
          realArtifacts: [
            {
              artifactId: "artifact:test:2026.1",
              sourceUrl: "https://example.test/source.csv",
              release: "2026.1",
              sha256:
                "a".repeat(64),
              sizeBytes: 42,
              acquisitionMode: "PUBLIC_STATIC_DOWNLOAD",
              official: true
            }
          ],
          observedSchemas: [
            {
              schemaId: "schema:test:2026.1",
              artifactId: "artifact:test:2026.1",
              format: "CSV",
              extractor: "scripts/research/test-adapter.mjs",
              requiredNativeFields: ["native_value"]
            }
          ]
        }
      ]
    });
    const merged = mergedFixture(proof);
    const process = merged.processes[0];
    const standard = {
      id: "STD-TEST",
      slug: "test-standard",
      organization: "Test Organization",
      officialSource: "Test source",
      version: "planning-version",
      releaseDate: "planning release",
      updateCadence: "annual",
      license: "test license",
      legalReview: "not required",
      officialUrls: ["https://example.test"],
      accessRoutes: ["public CSV download"],
      testedAccess: "HTTP 200",
      observedArtifact: "catalog-planning.csv",
      observedFormat: "CSV",
      observedSizeBytes: 100,
      observedSha256: "b".repeat(64),
      accessClass: "completely free",
      nativeFields: ["native_value"],
      derivation: "Map native_value to calculated_output.",
      internalTargets: ["selected_values"],
      runtimeDesign: "Pinned local lookup",
      cost: {
        engineeringHours: "1-2",
        rawStorageGb: 0.01,
        publishedStorageGb: 0.01,
        refreshHours: "1 hour",
        maintenance: "Low",
        externalMonthlyUsd: 0,
        monthly100Usd: 0,
        monthly1000Usd: 0,
        monthly10000Usd: 0
      },
      feasibility: "FEASIBLE_AFTER_ADAPTER_WORK",
      feasibilityEvidence: {
        processCount: 1,
        endToEndProcessCount: 0,
        sourceVerifiedProcessCount: 1,
        manualExportReadyProcessCount: 0,
        basis:
          "A retained source reaches the typed Standard output."
      },
      supportedBoundary: "The retained release and output mapping.",
      unsupportedBoundary: "The category formula mapping.",
      recommendedStrategy: "Complete the category formula mapping.",
      rejectedAlternative: "Treat planning metadata as proof."
    };
    const report = renderStandardReport(
      standard,
      { title: "Test Standard" },
      [{ category, process }],
      [],
      {
        kind: "scalar",
        selectionRule: "SYNTHETIC_TEST_ONLY",
        unit: "kWh/year"
      }
    );
    const headings = [...report.matchAll(/^## \d+\. (.+)$/gm)].map(
      (match) => match[1]
    );

    expect(headings).toHaveLength(13);
    expect(new Set(headings).size).toBe(headings.length);
    expect(report).toContain("| artifact:test:2026.1 |");
    expect(report).toContain("| 2026.1 |");
    expect(report).toContain(`sha256:${"a".repeat(64)}`);
    expect(report).toContain(
      "The planning catalog observation is catalog-planning.csv"
    );
    expect(report).not.toContain(
      "The retained inspected artifact is"
    );
  });
});
