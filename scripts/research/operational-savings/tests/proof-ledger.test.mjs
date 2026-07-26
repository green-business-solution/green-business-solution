import { createHash } from "node:crypto";
import { mkdtemp, mkdir, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import { expect, test } from "vitest";

import {
  CONDITIONAL_OUTPUT_COVERAGE,
  PROOF_GATES,
  PROOF_LEVELS,
  buildProofLedger,
  deriveProofLevel,
  normalizeProofGates,
  validateProofLedger
} from "../proof-ledger.mjs";
import {
  assertProofExecutionInputStateUnchanged,
  captureProofExecutionInputState,
  generateProofExecutionRunRecord,
  validateProofExecutionRunRecord,
  verifyProofExecutionRunRecord
} from "../proof-execution-run-record.mjs";

const repoRoot = fileURLToPath(new URL("../../../..", import.meta.url));

function canonicalize(value) {
  if (Array.isArray(value)) {
    return value.map(canonicalize);
  }
  if (
    value &&
    typeof value === "object" &&
    Object.getPrototypeOf(value) === Object.prototype
  ) {
    return Object.fromEntries(
      Object.keys(value)
        .sort()
        .map((key) => [key, canonicalize(value[key])])
    );
  }
  return value;
}

function sha256Canonical(value) {
  return createHash("sha256")
    .update(JSON.stringify(canonicalize(value)))
    .digest("hex");
}

function rehashInputState(state) {
  state.inputStateSha256 = sha256Canonical({
    sourceEvidenceFingerprint:
      state.sourceEvidenceFingerprint,
    artifactIdentityCatalog:
      state.artifactIdentityCatalog,
    executionToolchainIdentity:
      state.executionToolchainIdentity,
    repositoryState: state.repositoryState
  });
  return state;
}

function mutateFingerprintedFile(state, path) {
  const file = state.sourceEvidenceFingerprint.files.find(
    (candidate) => candidate.path === path
  );
  if (!file) {
    throw new Error(`Missing fingerprint test file ${path}`);
  }
  file.sha256 =
    file.sha256 === "f".repeat(64)
      ? "e".repeat(64)
      : "f".repeat(64);
  const fingerprintPayload = {
    schemaVersion:
      state.sourceEvidenceFingerprint.schemaVersion,
    algorithm:
      state.sourceEvidenceFingerprint.algorithm,
    files: state.sourceEvidenceFingerprint.files
  };
  state.sourceEvidenceFingerprint.digest =
    sha256Canonical(fingerprintPayload);
  state.repositoryState.relevantContentDigest =
    state.sourceEvidenceFingerprint.digest;
  return rehashInputState(state);
}

function allGates(value = true) {
  return Object.fromEntries(PROOF_GATES.map((gate) => [gate, value]));
}

function testExecutionIsolation(inputState) {
  return {
    mode:
      "PRIVATE_CONTENT_VERIFIED_DEPENDENCY_AND_CACHE_COPIES",
    privateCopyMode:
      "MACOS_CLONEFILE_OR_PRIVATE_COPY",
    originalInputsUnchanged: true,
    snapshotInputsUnchanged: true,
    originalAndSnapshotContentMatched: true,
    installedDependencyIdentityDigest:
      inputState.executionToolchainIdentity
        .installedDependencies.digest,
    researchCacheIdentityDigest: "d".repeat(64),
    researchCacheFileCount: 1,
    researchCacheSizeBytes: 1,
    snapshotVitestEntrypointSha256: "e".repeat(64),
    vitestExecutedFromPrivateSnapshot: true
  };
}

async function withTemporaryAdapters(callback) {
  const root = await mkdtemp(join(tmpdir(), "retrofi-proof-ledger-"));
  try {
    return await callback(root);
  } finally {
    await rm(root, { recursive: true, force: true });
  }
}

async function buildUnverifiedProofLedger(options) {
  return buildProofLedger({
    ...options,
    executionRunRecord: null,
    executionRunRecordPath: null
  });
}

function fuelEconomyManifest({
  formulaTermReached = true,
  proofLevel = formulaTermReached
    ? "END_TO_END_REAL"
    : "SOURCE_TO_STANDARD_REAL"
} = {}) {
  return {
    schemaVersion: "operational-savings/real-proof-manifest-v1",
    standardId: "STD-FUELECONOMY-VEHICLES",
    slug: "fueleconomy",
    adapterPath:
      "scripts/research/operational-savings/adapters/fueleconomy/run.mjs",
    artifacts: [
      {
        artifactId: "artifact:fueleconomy:test",
        sourceUrl:
          "https://www.fueleconomy.gov/feg/epadata/vehicles.csv.zip",
        release: "test release",
        sha256: "a".repeat(64)
      }
    ],
    observedSchemas: [
      {
        schemaId: "schema:fueleconomy:test",
        artifactId: "artifact:fueleconomy:test",
        format: "ZIP_CSV",
        requiredNativeFields: [
          "id",
          "year",
          "make",
          "model",
          "VClass",
          "drive",
          "fuelType1",
          "comb08",
          "combE",
          "modifiedOn"
        ]
      }
    ],
    normalizedTargets: [
      "equipment_products",
      "fuel_economy_vehicles",
      "selected_values"
    ],
    tests: [
      {
        testId: "fueleconomy-proof",
        path:
          "scripts/research/operational-savings/tests/fueleconomy-real.test.mjs",
        name: "real bulk source proof",
        kind: proofLevel,
        networkMode: "DISABLED",
        artifactIds: ["artifact:fueleconomy:test"],
        sourceNativeFields: ["id", "comb08", "combE"],
        mutationCases: ["missing column", "corrupt checksum"]
      }
    ],
    processClaims: [
      {
        categoryId: "ITC-29",
        processKey: "fueleconomy_vehicles",
        proofLevel,
        artifactIds: ["artifact:fueleconomy:test"],
        testIds: ["fueleconomy-proof"],
        gates: {
          sourcePinned: true,
          artifactAcquired: true,
          checksumVerified: true,
          schemaExtracted: true,
          requiredFieldsLocated: true,
          unitsEnumerationsPinned: true,
          parserOrModelExecuted: true,
          normalizedPublished: true,
          resolutionExecuted: true,
          standardOutputProduced: true,
          unitScopeMatched: true,
          formulaTermReached,
          offlinePassed: true,
          provenanceComplete: true,
          mutationFailureTestsPassed: true
        },
        actualOutput: {
          existing_combined_mpg: 32,
          proposed_combE: 28
        },
        formulaTerms: formulaTermReached
          ? ["existing_combined_mpg", "proposed_combE"]
          : [],
        remainingBlocker: formulaTermReached
          ? null
          : "Formula-input mapping is not proved."
      }
    ]
  };
}

function syntheticOnlyManifest({
  syntheticTests = [
    {
      testId: "synthetic-fueleconomy-proof",
      path:
        "scripts/research/operational-savings/tests/proof-ledger.test.mjs",
      name: "synthetic process exact proof"
    }
  ]
} = {}) {
  return {
    schemaVersion: "operational-savings/real-proof-manifest-v1",
    standardId: "STD-FUELECONOMY-VEHICLES",
    slug: "fueleconomy",
    adapterPath:
      "scripts/research/operational-savings/adapters/fueleconomy/run.mjs",
    artifacts: [],
    observedSchemas: [],
    normalizedTargets: [],
    tests: [],
    processClaims: [
      {
        categoryId: "ITC-29",
        processKey: "fueleconomy_vehicles",
        proofLevel: "SYNTHETIC_ONLY",
        syntheticOnly: true,
        syntheticTests,
        gates: allGates(false),
        remainingBlocker:
          "Only a synthetic compatibility assertion is available."
      }
    ]
  };
}

function terminalDispositionManifest({
  proofLevel,
  includeTest = true
}) {
  const manifest = fuelEconomyManifest();
  manifest.tests = includeTest
    ? [
        {
          ...manifest.tests[0],
          kind: "FAILURE"
        }
      ]
    : [];
  const claim = manifest.processClaims[0];
  claim.proofLevel = proofLevel;
  claim.testIds = includeTest
    ? ["fueleconomy-proof"]
    : [];
  claim.gates = allGates(false);
  delete claim.actualOutput;
  claim.formulaTerms = [];
  claim.accessBlocked =
    proofLevel === "ACCESS_BLOCKED";
  claim.sourceUnsupported =
    proofLevel === "SOURCE_UNSUPPORTED";
  claim.remainingBlocker =
    proofLevel === "ACCESS_BLOCKED"
      ? "The retained official access probe proves the current access boundary."
      : "The retained source inventory omits the required output.";
  return manifest;
}

function conditionalBranchManifest({
  categoryId,
  processKey,
  selectedOutputGroupId,
  coveredStandardIds,
  actualOutputs,
  proofLevel = "END_TO_END_REAL"
}) {
  const adapterId = `conditional-${categoryId.toLowerCase()}-${processKey}`;
  const artifactId = `artifact:${adapterId}:test`;
  const testId = `${adapterId}-proof`;
  return {
    schemaVersion: "operational-savings/real-proof-manifest-v1",
    adapterId,
    adapterPath:
      "scripts/research/operational-savings/adapters/energy-star/run.mjs",
    artifacts: [
      {
        artifactId,
        sourceUrl: "https://example.gov/official-conditional-source.json",
        release: "test release",
        sha256: "b".repeat(64)
      }
    ],
    observedSchemas: [
      {
        schemaId: `schema:${adapterId}:test`,
        artifactId,
        format: "JSON",
        requiredNativeFields: actualOutputs.map(
          (output) => output.formulaTerm
        )
      }
    ],
    normalizedTargets: ["selected_values", "calculation_provenance"],
    tests: [
      {
        testId,
        path:
          "scripts/research/operational-savings/tests/proof-ledger.test.mjs",
        name: "conditional output branch proof",
        kind: "END_TO_END_REAL",
        networkMode: "DISABLED",
        artifactIds: [artifactId],
        sourceNativeFields: actualOutputs.map(
          (output) => output.formulaTerm
        ),
        mutationCases: ["missing branch field"]
      }
    ],
    processes: [
      {
        categoryId,
        processKey,
        proofLevel,
        coveredStandardIds,
        ...(selectedOutputGroupId === undefined
          ? {}
          : { selectedOutputGroupId }),
        artifactIds: [artifactId],
        testIds: [testId],
        gates: allGates(),
        actualOutputs,
        formulaMappings: actualOutputs.map(
          ({ value: _value, ...output }) => ({
            ...output,
            testId
          })
        )
      }
    ]
  };
}

function acChargerOutputs({ includeDc = false } = {}) {
  return [
    {
      outputName: "Rated output power per port",
      formulaTerm: "rated_output_power_kW",
      unit: "kW",
      scope: "PER_PORT",
      value: 7.2
    },
    {
      outputName:
        "Applicable AC mode-specific total loss in watts when the record is AC-output",
      formulaTerm: "ac_total_loss_W",
      unit: "Wac",
      scope: "PER_PORT",
      value: 18
    },
    ...(includeDc
      ? [
          {
            outputName:
              "DC loading-adjusted efficiency as a fraction when the record is DC-output",
            formulaTerm: "dc_efficiency_fraction",
            unit: "fraction",
            scope: "PER_PORT",
            value: 0.95
          }
        ]
      : []),
    {
      outputName: "Applicable no-vehicle or idle standby power per port",
      formulaTerm: "standby_power_kW_per_port",
      unit: "kW/port",
      scope: "PER_PORT",
      value: 0.002
    }
  ];
}

function proposedRackDishwasherOutputs() {
  return [
    {
      outputName: "Proposed dishwasher native-field record",
      formulaTerm: "proposed_dishwasher_record",
      unit: "record set",
      scope: "RECORD_SET",
      value: { machineType: "RACK_MACHINE" }
    },
    {
      outputName: "Proposed rack-machine water use per rack",
      formulaTerm: "water_per_rack_proposed",
      unit: "gallons/rack",
      scope: "PER_EVENT",
      value: 0.5
    },
    {
      outputName: "Proposed rack-machine active electricity per rack",
      formulaTerm: "active_kWh_per_rack_proposed",
      unit: "kWh/rack",
      scope: "PER_EVENT",
      value: 0.1
    },
    {
      outputName: "Proposed idle power",
      formulaTerm: "idle_kW_proposed",
      unit: "kW",
      scope: "PER_EQUIPMENT_UNIT",
      value: 0.07
    }
  ];
}

async function writeProofManifest(
  adaptersRoot,
  manifest,
  directory = "fueleconomy"
) {
  const familyRoot = join(adaptersRoot, directory);
  const path = join(familyRoot, "proof.json");
  await mkdir(familyRoot, { recursive: true });
  await writeFile(
    path,
    `${JSON.stringify(manifest, null, 2)}\n`
  );
  return {
    path,
    content: manifest
  };
}

function vitestJsonResult({
  testPath,
  testName,
  assertionStatus = "passed",
  suiteStatus = "passed",
  success = true,
  fractionalEndTime = false
}) {
  const startedAt = Date.parse("2026-07-24T12:00:00.000Z");
  return {
    startTime: startedAt,
    success,
    testResults: [
      {
        name: testPath,
        status: suiteStatus,
        startTime: startedAt,
        endTime:
          startedAt +
          (fractionalEndTime ? 25.75 : 25),
        assertionResults: [
          {
            fullName: testName,
            status: assertionStatus,
            duration: 7
          }
        ]
      },
      {
        name: join(
          repoRoot,
          "scripts/research/operational-savings/tests/network-sandbox-real.test.mjs"
        ),
        status: "passed",
        startTime: startedAt,
        endTime:
          startedAt +
          (fractionalEndTime ? 30.875 : 30),
        assertionResults: [
          {
            fullName:
              "enforces deny-network policy across the real Vitest process tree",
            status: "passed",
            duration: 5.25
          }
        ]
      }
    ]
  };
}

async function generateTestRunRecord({
  manifestFile,
  vitestJson
}) {
  const preRunInputState =
    await captureProofExecutionInputState({
      repoRoot,
      manifestFiles: [manifestFile]
    });
  const runnerStartedAtMs =
    Date.parse(preRunInputState.capturedAt) + 2;
  const preRunSnapshotState = {
    capturedAt: new Date(
      runnerStartedAtMs - 1
    ).toISOString(),
    sourceEvidenceFingerprint: structuredClone(
      preRunInputState.sourceEvidenceFingerprint
    ),
    artifactIdentityCatalog: structuredClone(
      preRunInputState.artifactIdentityCatalog
    )
  };
  preRunSnapshotState.snapshotStateSha256 =
    sha256Canonical({
      sourceEvidenceFingerprint:
        preRunSnapshotState.sourceEvidenceFingerprint,
      artifactIdentityCatalog:
        preRunSnapshotState.artifactIdentityCatalog
    });
  const originalStartedAtMs = vitestJson.startTime;
  const attestedVitestJson = structuredClone(vitestJson);
  const shiftedStartedAtMs = runnerStartedAtMs + 1;
  const timestampShift =
    shiftedStartedAtMs - originalStartedAtMs;
  attestedVitestJson.startTime = shiftedStartedAtMs;
  for (const suite of attestedVitestJson.testResults) {
    if (Number.isFinite(suite.startTime)) {
      suite.startTime += timestampShift;
    }
    if (Number.isFinite(suite.endTime)) {
      suite.endTime += timestampShift;
    }
  }
  const latestSuiteEndMs = Math.max(
    attestedVitestJson.startTime,
    ...attestedVitestJson.testResults
      .map((suite) => suite.endTime)
      .filter(Number.isFinite)
      .map(Math.trunc)
  );
  const runnerCompletedAtMs = latestSuiteEndMs + 1;
  const postRunSnapshotState = structuredClone(
    preRunSnapshotState
  );
  postRunSnapshotState.capturedAt = new Date(
    runnerCompletedAtMs + 1
  ).toISOString();
  const postRunInputState = structuredClone(
    preRunInputState
  );
  postRunInputState.capturedAt = new Date(
    runnerCompletedAtMs + 2
  ).toISOString();
  return generateProofExecutionRunRecord({
    repoRoot,
    manifestFiles: [manifestFile],
    preRunInputState,
    postRunInputState,
    preRunSnapshotState,
    postRunSnapshotState,
    executionIsolation:
      testExecutionIsolation(preRunInputState),
    vitestJson: attestedVitestJson,
    vitestJsonSha256: "c".repeat(64),
    command:
      "npx vitest run --config vite.config.ts --reporter=json --outputFile=/tmp/vitest.json",
    runnerStartedAtMs,
    runnerCompletedAtMs,
    runnerExitStatus:
      attestedVitestJson.success === true ? 0 : 1,
    platform: {
      operatingSystem: "darwin",
      architecture: "arm64",
      nodeVersion: "v26.3.1"
    },
    vitestVersion: "3.2.6"
  });
}

test("derives all seven proof levels from the 15 gates and terminal dispositions", () => {
  const complete = allGates();
  expect(deriveProofLevel(complete)).toBe("END_TO_END_REAL");

  const throughStandard = { ...complete, formulaTermReached: false };
  expect(deriveProofLevel(throughStandard)).toBe(
    "SOURCE_TO_STANDARD_REAL"
  );

  const partial = allGates(false);
  for (const gate of PROOF_GATES.slice(0, 7)) partial[gate] = true;
  expect(deriveProofLevel(partial)).toBe("REAL_SOURCE_PARTIAL");
  expect(deriveProofLevel(allGates(false))).toBe("DOCUMENTATION_ONLY");
  expect(
    deriveProofLevel(allGates(false), { syntheticOnly: true })
  ).toBe("SYNTHETIC_ONLY");
  expect(
    deriveProofLevel(allGates(false), { accessBlocked: true })
  ).toBe("ACCESS_BLOCKED");
  expect(
    deriveProofLevel(allGates(false), { sourceUnsupported: true })
  ).toBe("SOURCE_UNSUPPORTED");
  expect(new Set(PROOF_LEVELS).size).toBe(7);
});

test("synthetic process exact proof", () => {
  expect(true).toBe(true);
});

test("normalizes legacy proof-manifest gate names without weakening the gate set", () => {
  const gates = normalizeProofGates({
    sourcePinned: true,
    checksumVerified: true,
    unitScopeMatched: true,
    offlinePassed: true
  });
  expect(Object.keys(gates)).toHaveLength(15);
  expect(gates.sourceIdentityPinned).toBe(true);
  expect(gates.checksumOrCommitRetained).toBe(true);
  expect(gates.unitScopeMatches).toBe(true);
  expect(gates.offlineRerunPassed).toBe(true);
});

test("bootstraps exactly 124 honest documentation-only records without manifests", async () => {
  await withTemporaryAdapters(async (adaptersRoot) => {
    const ledger = await buildUnverifiedProofLedger({
      repoRoot,
      adaptersRoot
    });
    expect(ledger.processes).toHaveLength(124);
    expect(
      new Set(
        ledger.processes.map(
          (process) => `${process.categoryId}/${process.processKey}`
        )
      ).size
    ).toBe(124);
    expect(ledger.counts).toEqual({
      END_TO_END_REAL: 0,
      SOURCE_TO_STANDARD_REAL: 0,
      REAL_SOURCE_PARTIAL: 0,
      DOCUMENTATION_ONLY: 124,
      SYNTHETIC_ONLY: 0,
      ACCESS_BLOCKED: 0,
      SOURCE_UNSUPPORTED: 0
    });
    for (const process of ledger.processes) {
      expect(process.realArtifacts).toEqual([]);
      expect(process.adapterPath).toBeNull();
      expect(process.offlineStatus.status).toBe("NOT_RUN");
      expect(process.blocker.code).toBe("MISSING_PROOF_MANIFEST");
      expect(process.formulaMappings).toHaveLength(
        process.outputBindings.length
      );
    }
    expect(CONDITIONAL_OUTPUT_COVERAGE).toHaveLength(8);
    expect(
      ledger.processes.find(
        (process) =>
          process.categoryId === "ITC-27" &&
          process.processKey === "exact-charger-rating"
      ).outputCoverage.mode
    ).toBe("COMMON_PLUS_ONE_ALTERNATIVE");
    expect(
      ledger.processes.find(
        (process) =>
          process.categoryId === "ITC-29" &&
          process.processKey === "fueleconomy_vehicles"
      ).outputCoverage
    ).toEqual({ mode: "ALL_OUTPUTS" });
    expect(validateProofLedger(ledger)).toBe(ledger);
  });
});

test("fails every retained terminal disposition closed without current execution", async () => {
  const ledger = await buildProofLedger({
    repoRoot,
    executionRunRecord: null,
    executionRunRecordPath: null
  });
  const terminal = ledger.processes.filter((process) =>
    ["ACCESS_BLOCKED", "SOURCE_UNSUPPORTED"].includes(
      process.declaredProofLevel
    )
  );
  expect(
    terminal.filter(
      (process) =>
        process.declaredProofLevel === "ACCESS_BLOCKED"
    )
  ).toHaveLength(26);
  expect(
    terminal.filter(
      (process) =>
        process.declaredProofLevel ===
        "SOURCE_UNSUPPORTED"
    )
  ).toHaveLength(4);
  for (const process of terminal) {
    expect(
      process.requiredExecutionTestIds.length,
      `${process.categoryId}/${process.processKey}`
    ).toBeGreaterThan(0);
    expect(process.executionVerificationStatus).toBe(
      "NO_RUN_RECORD"
    );
    expect(process.executionVerifiedProofLevel).toBeNull();
    expect(process.proofLevel).toBe(
      "DOCUMENTATION_ONLY"
    );
  }
}, 30_000);

test("keeps a declared end-to-end manifest documentation-only without an execution record", async () => {
  await withTemporaryAdapters(async (adaptersRoot) => {
    const familyRoot = join(adaptersRoot, "fueleconomy");
    await mkdir(familyRoot, { recursive: true });
    await writeFile(
      join(familyRoot, "proof.json"),
      `${JSON.stringify(fuelEconomyManifest(), null, 2)}\n`
    );

    const ledger = await buildUnverifiedProofLedger({
      repoRoot,
      adaptersRoot
    });
    const process = ledger.processes.find(
      (candidate) =>
        candidate.categoryId === "ITC-29" &&
        candidate.processKey === "fueleconomy_vehicles"
    );
    expect(process.declaredProofLevel).toBe(
      "END_TO_END_REAL"
    );
    expect(process.executionVerifiedProofLevel).toBeNull();
    expect(process.executionVerificationStatus).toBe(
      "NO_RUN_RECORD"
    );
    expect(process.proofLevel).toBe(
      "DOCUMENTATION_ONLY"
    );
    expect(process.realArtifacts).toHaveLength(1);
    expect(process.checksums[0].digest).toBe("a".repeat(64));
    expect(process.observedSchemas).toHaveLength(1);
    expect(process.adapterPath).toMatch(/fueleconomy\/run\.mjs$/);
    expect(process.normalizedTargets).toContain("fuel_economy_vehicles");
    expect(process.actualOutputs).toHaveLength(2);
    expect(
      process.formulaMappings.every(
        (mapping) =>
          mapping.declarationStatus === "DECLARED" &&
          mapping.executionStatus === "NOT_VERIFIED" &&
          mapping.status === "UNVERIFIED"
      )
    ).toBe(true);
    expect(process.realTests[0].testId).toBe("fueleconomy-proof");
    expect(process.declaredOfflineStatus.status).toBe(
      "DECLARED"
    );
    expect(process.offlineStatus.status).toBe(
      "NOT_VERIFIED"
    );
    expect(process.blocker.code).toBe(
      "EXECUTION_RUN_RECORD_REQUIRED"
    );
  });
});

test("keeps a declared source-to-Standard manifest documentation-only without execution", async () => {
  await withTemporaryAdapters(async (adaptersRoot) => {
    const familyRoot = join(adaptersRoot, "fueleconomy");
    await mkdir(familyRoot, { recursive: true });
    await writeFile(
      join(familyRoot, "proof.json"),
      `${JSON.stringify(
        fuelEconomyManifest({ formulaTermReached: false }),
        null,
        2
      )}\n`
    );

    const ledger = await buildUnverifiedProofLedger({
      repoRoot,
      adaptersRoot
    });
    const process = ledger.processes.find(
      (candidate) =>
        candidate.categoryId === "ITC-29" &&
        candidate.processKey === "fueleconomy_vehicles"
    );
    expect(process.declaredProofLevel).toBe(
      "SOURCE_TO_STANDARD_REAL"
    );
    expect(process.executionVerifiedProofLevel).toBeNull();
    expect(process.proofLevel).toBe(
      "DOCUMENTATION_ONLY"
    );
    expect(
      process.formulaMappings.every(
        (mapping) =>
          mapping.declarationStatus === "UNDECLARED" &&
          mapping.executionStatus === "NOT_VERIFIED" &&
          mapping.status === "UNVERIFIED"
      )
    ).toBe(true);
    expect(process.declaredBlocker).not.toBeNull();
    expect(process.blocker.code).toBe(
      "EXECUTION_RUN_RECORD_REQUIRED"
    );
  });
});

test(
  "binds synthetic-only proof to its exact passing assertion",
  { timeout: 15_000 },
  async () => {
    await withTemporaryAdapters(async (adaptersRoot) => {
      const manifest = syntheticOnlyManifest();
      const manifestFile = await writeProofManifest(
        adaptersRoot,
        manifest
      );
      const [declaredTest] =
        manifest.processClaims[0].syntheticTests;

      const unverifiedLedger =
        await buildUnverifiedProofLedger({
          repoRoot,
          adaptersRoot
        });
      const unverifiedProcess =
        unverifiedLedger.processes.find(
          (candidate) =>
            candidate.categoryId === "ITC-29" &&
            candidate.processKey === "fueleconomy_vehicles"
        );
      expect(unverifiedProcess.declaredProofLevel).toBe(
        "SYNTHETIC_ONLY"
      );
      expect(
        unverifiedProcess.requiredExecutionTestIds
      ).toEqual(["synthetic-fueleconomy-proof"]);
      expect(
        unverifiedProcess.executionVerificationStatus
      ).toBe("NO_RUN_RECORD");
      expect(unverifiedProcess.proofLevel).toBe(
        "DOCUMENTATION_ONLY"
      );

      const record = await generateTestRunRecord({
        manifestFile,
        vitestJson: vitestJsonResult({
          testPath: join(repoRoot, declaredTest.path),
          testName: declaredTest.name
        })
      });
      expect(record.tests).toEqual([
        expect.objectContaining({
          testId: declaredTest.testId,
          path: declaredTest.path,
          name: declaredTest.name,
          status: "PASSED"
        })
      ]);

      const verifiedLedger = await buildProofLedger({
        repoRoot,
        adaptersRoot,
        executionRunRecord: record,
        executionRunRecordPath: null
      });
      const verifiedProcess = verifiedLedger.processes.find(
        (candidate) =>
          candidate.categoryId === "ITC-29" &&
          candidate.processKey ===
            "fueleconomy_vehicles"
      );
      expect(
        verifiedProcess.executionVerificationStatus
      ).toBe("EXECUTION_VERIFIED");
      expect(
        verifiedProcess.executionVerifiedProofLevel
      ).toBe("SYNTHETIC_ONLY");
      expect(verifiedProcess.proofLevel).toBe(
        "SYNTHETIC_ONLY"
      );
      expect(
        verifiedProcess.executionTestResults
      ).toEqual([
        expect.objectContaining({
          testId: declaredTest.testId,
          status: "PASSED"
        })
      ]);
    });
  }
);

test.each([
  "ACCESS_BLOCKED",
  "SOURCE_UNSUPPORTED"
])(
  "binds %s to its exact retained-source or access-probe assertion",
  async (proofLevel) => {
    await withTemporaryAdapters(async (adaptersRoot) => {
      const manifest = terminalDispositionManifest({
        proofLevel
      });
      const manifestFile = await writeProofManifest(
        adaptersRoot,
        manifest
      );
      const unverifiedLedger =
        await buildUnverifiedProofLedger({
          repoRoot,
          adaptersRoot
        });
      const unverifiedProcess =
        unverifiedLedger.processes.find(
          (candidate) =>
            candidate.categoryId === "ITC-29" &&
            candidate.processKey ===
              "fueleconomy_vehicles"
        );
      expect(unverifiedProcess.declaredProofLevel).toBe(
        proofLevel
      );
      expect(
        unverifiedProcess.requiredExecutionTestIds
      ).toEqual(["fueleconomy-proof"]);
      expect(
        unverifiedProcess.executionVerificationStatus
      ).toBe("NO_RUN_RECORD");
      expect(unverifiedProcess.proofLevel).toBe(
        "DOCUMENTATION_ONLY"
      );

      const [declaredTest] = manifest.tests;
      const record = await generateTestRunRecord({
        manifestFile,
        vitestJson: vitestJsonResult({
          testPath: join(repoRoot, declaredTest.path),
          testName: declaredTest.name
        })
      });
      const verifiedLedger = await buildProofLedger({
        repoRoot,
        adaptersRoot,
        executionRunRecord: record,
        executionRunRecordPath: null
      });
      const verifiedProcess =
        verifiedLedger.processes.find(
          (candidate) =>
            candidate.categoryId === "ITC-29" &&
            candidate.processKey ===
              "fueleconomy_vehicles"
        );
      expect(
        verifiedProcess.executionVerificationStatus
      ).toBe("EXECUTION_VERIFIED");
      expect(
        verifiedProcess.executionVerifiedProofLevel
      ).toBe(proofLevel);
      expect(verifiedProcess.proofLevel).toBe(
        proofLevel
      );
      expect(
        verifiedProcess.executionTestResults
      ).toEqual([
        expect.objectContaining({
          testId: "fueleconomy-proof",
          status: "PASSED"
        })
      ]);
    });
  }
);

test.each([
  "ACCESS_BLOCKED",
  "SOURCE_UNSUPPORTED"
])(
  "fails %s closed when no exact retained-source test is declared",
  async (proofLevel) => {
    await withTemporaryAdapters(async (adaptersRoot) => {
      const manifest = terminalDispositionManifest({
        proofLevel,
        includeTest: false
      });
      const manifestFile = await writeProofManifest(
        adaptersRoot,
        manifest
      );
      const record = await generateTestRunRecord({
        manifestFile,
        vitestJson: vitestJsonResult({
          testPath: join(
            repoRoot,
            "scripts/research/operational-savings/tests/proof-ledger.test.mjs"
          ),
          testName: "unrelated passing assertion"
        })
      });
      expect(record.execution.status).toBe("PASSED");
      expect(record.tests).toEqual([]);

      const ledger = await buildProofLedger({
        repoRoot,
        adaptersRoot,
        executionRunRecord: record,
        executionRunRecordPath: null
      });
      const process = ledger.processes.find(
        (candidate) =>
          candidate.categoryId === "ITC-29" &&
          candidate.processKey ===
            "fueleconomy_vehicles"
      );
      expect(process.declaredProofLevel).toBe(proofLevel);
      expect(
        process.executionVerificationStatus
      ).toBe("NO_REQUIRED_TESTS_DECLARED");
      expect(process.executionVerifiedProofLevel).toBeNull();
      expect(process.proofLevel).toBe(
        "DOCUMENTATION_ONLY"
      );
    });
  }
);

test("fails synthetic-only proof closed without a declared exact synthetic assertion", async () => {
  await withTemporaryAdapters(async (adaptersRoot) => {
    const manifest = syntheticOnlyManifest({
      syntheticTests: []
    });
    const manifestFile = await writeProofManifest(
      adaptersRoot,
      manifest
    );
    const record = await generateTestRunRecord({
      manifestFile,
      vitestJson: vitestJsonResult({
        testPath: join(
          repoRoot,
          "scripts/research/operational-savings/tests/proof-ledger.test.mjs"
        ),
        testName: "unrelated passing assertion"
      })
    });
    expect(record.execution.status).toBe("PASSED");
    expect(record.tests).toEqual([]);

    const ledger = await buildProofLedger({
      repoRoot,
      adaptersRoot,
      executionRunRecord: record,
      executionRunRecordPath: null
    });
    const process = ledger.processes.find(
      (candidate) =>
        candidate.categoryId === "ITC-29" &&
        candidate.processKey === "fueleconomy_vehicles"
    );
    expect(process.executionVerificationStatus).toBe(
      "NO_REQUIRED_SYNTHETIC_TESTS_DECLARED"
    );
    expect(process.executionVerifiedProofLevel).toBeNull();
    expect(process.proofLevel).toBe(
      "DOCUMENTATION_ONLY"
    );
  });
});

test("fails synthetic-only proof closed on exact path or full-name mismatch", async () => {
  await withTemporaryAdapters(async (adaptersRoot) => {
    const manifest = syntheticOnlyManifest();
    const manifestFile = await writeProofManifest(
      adaptersRoot,
      manifest
    );
    const [declaredTest] =
      manifest.processClaims[0].syntheticTests;
    const cases = [
      {
        expected: "PATH_MISMATCH",
        testPath: join(
          repoRoot,
          "scripts/research/operational-savings/tests/fueleconomy-real.test.mjs"
        ),
        testName: declaredTest.name
      },
      {
        expected: "NAME_MISMATCH",
        testPath: join(repoRoot, declaredTest.path),
        testName: `${declaredTest.name} renamed`
      }
    ];

    for (const candidate of cases) {
      const record = await generateTestRunRecord({
        manifestFile,
        vitestJson: vitestJsonResult(candidate)
      });
      expect(record.tests).toEqual([
        expect.objectContaining({
          testId: declaredTest.testId,
          status: candidate.expected
        })
      ]);
      const ledger = await buildProofLedger({
        repoRoot,
        adaptersRoot,
        executionRunRecord: record,
        executionRunRecordPath: null
      });
      const process = ledger.processes.find(
        (item) =>
          item.categoryId === "ITC-29" &&
          item.processKey === "fueleconomy_vehicles"
      );
      expect(process.executionVerificationStatus).toBe(
        "RUN_FAILED"
      );
      expect(process.executionVerifiedProofLevel).toBeNull();
      expect(process.proofLevel).toBe(
        "DOCUMENTATION_ONLY"
      );
    }
  });
});

test("continues to require every canonical output for an ordinary process", async () => {
  await withTemporaryAdapters(async (adaptersRoot) => {
    const familyRoot = join(adaptersRoot, "fueleconomy");
    await mkdir(familyRoot, { recursive: true });
    const manifest = fuelEconomyManifest();
    delete manifest.processClaims[0].actualOutput.proposed_combE;
    await writeFile(
      join(familyRoot, "proof.json"),
      `${JSON.stringify(manifest, null, 2)}\n`
    );

    await expect(
      buildUnverifiedProofLedger({ repoRoot, adaptersRoot })
    ).rejects.toThrow(/standardOutputProduced, unitScopeMatches/);
  });
});

test("rejects a true real-source gate when its evidence column is empty", async () => {
  await withTemporaryAdapters(async (adaptersRoot) => {
    const familyRoot = join(adaptersRoot, "fueleconomy");
    await mkdir(familyRoot, { recursive: true });
    const manifest = fuelEconomyManifest();
    manifest.artifacts = [];
    await writeFile(
      join(familyRoot, "proof.json"),
      `${JSON.stringify(manifest, null, 2)}\n`
    );

    await expect(
      buildUnverifiedProofLedger({ repoRoot, adaptersRoot })
    ).rejects.toThrow(/artifactAcquired/);
  });
});

test("accepts one explicitly selected AC-output branch and marks DC output inapplicable", async () => {
  await withTemporaryAdapters(async (adaptersRoot) => {
    const familyRoot = join(adaptersRoot, "conditional-charger");
    await mkdir(familyRoot, { recursive: true });
    await writeFile(
      join(familyRoot, "proof.json"),
      `${JSON.stringify(
        conditionalBranchManifest({
          categoryId: "ITC-27",
          processKey: "exact-charger-rating",
          selectedOutputGroupId: "AC_OUTPUT",
          coveredStandardIds: ["STD-ENERGY-STAR-PRODUCT-DATA"],
          actualOutputs: acChargerOutputs()
        }),
        null,
        2
      )}\n`
    );

    const ledger = await buildUnverifiedProofLedger({
      repoRoot,
      adaptersRoot
    });
    const process = ledger.processes.find(
      (candidate) =>
        candidate.categoryId === "ITC-27" &&
        candidate.processKey === "exact-charger-rating"
    );
    expect(process.declaredProofLevel).toBe(
      "END_TO_END_REAL"
    );
    expect(process.proofLevel).toBe(
      "DOCUMENTATION_ONLY"
    );
    expect(process.selectedOutputGroupId).toBe("AC_OUTPUT");
    expect(
      Object.fromEntries(
        process.formulaMappings.map((mapping) => [
          mapping.formulaTerm,
          mapping.status
        ])
      )
    ).toEqual({
      rated_output_power_kW: "UNVERIFIED",
      ac_total_loss_W: "UNVERIFIED",
      dc_efficiency_fraction: "NOT_APPLICABLE",
      standby_power_kW_per_port: "UNVERIFIED"
    });
    expect(process.blocker.code).toBe(
      "EXECUTION_RUN_RECORD_REQUIRED"
    );
  });
});

test("requires all canonical outputs when a conditional branch is not selected", async () => {
  await withTemporaryAdapters(async (adaptersRoot) => {
    const familyRoot = join(adaptersRoot, "conditional-charger");
    await mkdir(familyRoot, { recursive: true });
    await writeFile(
      join(familyRoot, "proof.json"),
      `${JSON.stringify(
        conditionalBranchManifest({
          categoryId: "ITC-27",
          processKey: "exact-charger-rating",
          selectedOutputGroupId: undefined,
          coveredStandardIds: ["STD-ENERGY-STAR-PRODUCT-DATA"],
          actualOutputs: acChargerOutputs()
        }),
        null,
        2
      )}\n`
    );

    await expect(
      buildUnverifiedProofLedger({ repoRoot, adaptersRoot })
    ).rejects.toThrow(
      /standardOutputProduced, unitScopeMatches, formulaTermReached/
    );
  });
});

test("rejects evidence mixed across mutually exclusive output branches", async () => {
  await withTemporaryAdapters(async (adaptersRoot) => {
    const familyRoot = join(adaptersRoot, "conditional-charger");
    await mkdir(familyRoot, { recursive: true });
    await writeFile(
      join(familyRoot, "proof.json"),
      `${JSON.stringify(
        conditionalBranchManifest({
          categoryId: "ITC-27",
          processKey: "exact-charger-rating",
          selectedOutputGroupId: "AC_OUTPUT",
          coveredStandardIds: ["STD-ENERGY-STAR-PRODUCT-DATA"],
          actualOutputs: acChargerOutputs({ includeDc: true })
        }),
        null,
        2
      )}\n`
    );

    await expect(
      buildUnverifiedProofLedger({ repoRoot, adaptersRoot })
    ).rejects.toThrow(
      /actualOutputs includes outputs outside selected group AC_OUTPUT: dc_efficiency_fraction/
    );
  });
});

test("keeps multi-Standard coverage as a strict AND after selecting a dishwasher branch", async () => {
  await withTemporaryAdapters(async (adaptersRoot) => {
    const familyRoot = join(adaptersRoot, "conditional-dishwasher");
    await mkdir(familyRoot, { recursive: true });
    await writeFile(
      join(familyRoot, "proof.json"),
      `${JSON.stringify(
        conditionalBranchManifest({
          categoryId: "ITC-52",
          processKey: "exact-proposed-dishwasher-record",
          selectedOutputGroupId: "RACK_MACHINE",
          coveredStandardIds: ["STD-ENERGY-STAR-PRODUCT-DATA"],
          actualOutputs: proposedRackDishwasherOutputs(),
          proofLevel: "REAL_SOURCE_PARTIAL"
        }),
        null,
        2
      )}\n`
    );

    const ledger = await buildUnverifiedProofLedger({
      repoRoot,
      adaptersRoot
    });
    const process = ledger.processes.find(
      (candidate) =>
        candidate.categoryId === "ITC-52" &&
        candidate.processKey === "exact-proposed-dishwasher-record"
    );
    expect(process.declaredProofLevel).toBe(
      "REAL_SOURCE_PARTIAL"
    );
    expect(process.proofLevel).toBe(
      "DOCUMENTATION_ONLY"
    );
    expect(process.selectedOutputGroupId).toBe("RACK_MACHINE");
    expect(process.declaredBlocker.code).toBe(
      "INCOMPLETE_STANDARD_COVERAGE"
    );
    expect(process.blocker.code).toBe(
      "EXECUTION_RUN_RECORD_REQUIRED"
    );
    expect(
      process.formulaMappings
        .filter((mapping) => mapping.status === "NOT_APPLICABLE")
        .map((mapping) => mapping.formulaTerm)
    ).toEqual([
      "water_per_hour_proposed",
      "active_kWh_per_hour_proposed"
    ]);
  });
});

test("promotes declared proof only when the exact named test passes against the current fingerprint", async () => {
  await withTemporaryAdapters(async (adaptersRoot) => {
    const manifest = fuelEconomyManifest();
    const manifestFile = await writeProofManifest(
      adaptersRoot,
      manifest
    );
    const [declaredTest] = manifest.tests;
    const record = await generateTestRunRecord({
      manifestFile,
      vitestJson: vitestJsonResult({
        testPath: join(repoRoot, declaredTest.path),
        testName: declaredTest.name,
        fractionalEndTime: true
      })
    });

    expect(validateProofExecutionRunRecord(record)).toBe(
      record
    );
    expect(record.schemaVersion).toBe(
      "operational-savings/proof-execution-run-record-v2"
    );
    expect(record.recordType).toBe(
      "LOCAL_CONTENT_BOUND_RUN_RECORD"
    );
    expect(record.trust).toMatchObject({
      runnerIdentityAuthenticated: false,
      signer: {
        status: "UNSIGNED",
        signature: null
      }
    });
    expect(record.execution.status).toBe("PASSED");
    expect(record.execution.runner).toEqual({
      framework: "Vitest",
      version: "3.2.6"
    });
    expect(record.execution.attestation).toMatchObject({
      mode:
        "PRIVATE_COMMITTED_SNAPSHOT_WITH_PRE_RUN_POST_RUN_EQUALITY",
      inputStateUnchanged: true,
      runnerExitStatus: 0,
      executionSnapshot: {
        mode:
          "PRIVATE_DETACHED_COMMITTED_GIT_WORKTREE",
        privatePathRetained: false
      }
    });
    expect(record.trust).toMatchObject({
      forgeryResistance:
        "NONE_REPOSITORY_WRITER_CAN_FABRICATE_A_SELF_CONSISTENT_RECORD",
      contentDigestPurpose:
        "STALE_CONTENT_AND_ACCIDENTAL_CORRUPTION_DETECTION_ONLY"
    });
    expect(record.repositoryState.observation).toBe(
      "PRE_RUN_AND_POST_RUN_BEFORE_RECORD_WRITE"
    );
    expect(
      record.executionToolchainIdentity.digest
    ).toMatch(/^[a-f0-9]{64}$/);
    const relocatedToolchain = structuredClone(
      record.executionToolchainIdentity
    );
    const relocatedVitest =
      relocatedToolchain.tools.find(
        (tool) =>
          tool.toolId === "vitest-entrypoint"
      );
    relocatedVitest.requestedPath =
      "/private/snapshot/node_modules/vitest/vitest.mjs";
    relocatedVitest.resolvedPath =
      "/private/snapshot/node_modules/vitest/vitest.mjs";
    const relocatedToolchainPayload =
      structuredClone(relocatedToolchain);
    delete relocatedToolchainPayload.digest;
    relocatedToolchain.digest = sha256Canonical(
      relocatedToolchainPayload
    );
    const declarations = record.tests.map(
      ({ testId, path, name, manifestPath }) => ({
        testId,
        path,
        name,
        manifestPath
      })
    );
    expect(
      verifyProofExecutionRunRecord({
        record,
        currentFingerprint:
          record.sourceEvidenceFingerprint,
        declarations,
        currentArtifactIdentityCatalog:
          record.artifactIdentityCatalog,
        currentExecutionToolchainIdentity:
          relocatedToolchain
      }).status
    ).toBe("CURRENT_LOCAL_CONTENT_BOUND_PASS");
    relocatedVitest.sha256 = "f".repeat(64);
    relocatedToolchain.digest = sha256Canonical(
      Object.fromEntries(
        Object.entries(relocatedToolchain).filter(
          ([key]) => key !== "digest"
        )
      )
    );
    expect(
      verifyProofExecutionRunRecord({
        record,
        currentFingerprint:
          record.sourceEvidenceFingerprint,
        declarations,
        currentArtifactIdentityCatalog:
          record.artifactIdentityCatalog,
        currentExecutionToolchainIdentity:
          relocatedToolchain
      }).status
    ).toBe("TOOLCHAIN_IDENTITY_MISMATCH");
    expect(
      record.execution.networkEnforcement
        .processWideNetworkIsolationVerified
    ).toBe(true);
    expect(
      record.execution.networkEnforcement.status
    ).toBe(
      "VERIFIED_PROCESS_WIDE_DENY_NETWORK"
    );
    expect(
      record.execution.networkEnforcement.evidence
        .status
    ).toBe("PASSED");
    expect(record.execution.durationMs).toBe(30);
    expect(record.repositoryState.gitHeadCommit).toMatch(
      /^[a-f0-9]{40}$/
    );
    expect(
      record.repositoryState.relevantContentDigest
    ).toBe(record.sourceEvidenceFingerprint.digest);
    expect(
      record.sourceEvidenceFingerprint.files.some(
        (file) =>
          file.path ===
          "scripts/research/operational-savings/proof-ledger.mjs"
      )
    ).toBe(true);
    const fingerprintPaths = new Set(
      record.sourceEvidenceFingerprint.files.map(
        (file) => file.path
      )
    );
    for (const path of [
      "package.json",
      "package-lock.json",
      "vite.config.ts",
      "tsconfig.json",
      "tsconfig.node.json",
      "scripts/research/operational-savings/run-real-test-suite.mjs",
      "scripts/research/operational-savings/proof-attestation.mjs",
      "scripts/research/operational-savings/lib/network-isolation.mjs"
    ]) {
      expect(fingerprintPaths.has(path), path).toBe(true);
    }
    expect(
      record.sourceEvidenceFingerprint.files.some(
        (file) => file.path.split("/").includes(".cache")
      )
    ).toBe(false);
    expect(
      record.sourceEvidenceFingerprint.files.some(
        (file) =>
          file.path ===
          "scripts/research/operational-savings/containers/post-hoc-replay-receipt.v1.json"
      )
    ).toBe(false);
    expect(record.artifactIdentityCatalog).toMatchObject({
      artifactCount: 1,
      artifacts: [
        {
          artifactId: "artifact:fueleconomy:test",
          sha256: "a".repeat(64),
          commitSha: null,
          byteSize: null
        }
      ]
    });

    const ledger = await buildProofLedger({
      repoRoot,
      adaptersRoot,
      executionRunRecord: record,
      executionRunRecordPath: null
    });
    const process = ledger.processes.find(
      (candidate) =>
        candidate.categoryId === "ITC-29" &&
        candidate.processKey === "fueleconomy_vehicles"
    );
    expect(ledger.executionVerification.status).toBe(
      "CURRENT_LOCAL_CONTENT_BOUND_PASS"
    );
    expect(process.declaredProofLevel).toBe(
      "END_TO_END_REAL"
    );
    expect(process.executionVerifiedProofLevel).toBe(
      "END_TO_END_REAL"
    );
    expect(process.executionVerificationStatus).toBe(
      "EXECUTION_VERIFIED"
    );
    expect(process.proofLevel).toBe("END_TO_END_REAL");
    expect(process.offlineStatus.status).toBe("PASSED");
    expect(process.resolutionStatus).toBe("PASSED");
    expect(
      process.formulaMappings.every(
        (mapping) =>
          mapping.declarationStatus === "DECLARED" &&
          mapping.executionStatus === "VERIFIED" &&
          mapping.status === "EXECUTION_VERIFIED"
      )
    ).toBe(true);
    expect(process.blocker).toBeNull();
  });
});

test("fails closed for missing, failed, path-mismatched, and name-mismatched Vitest assertions", async () => {
  await withTemporaryAdapters(async (adaptersRoot) => {
    const manifest = fuelEconomyManifest();
    const manifestFile = await writeProofManifest(
      adaptersRoot,
      manifest
    );
    const [declaredTest] = manifest.tests;
    const declaredPath = join(
      repoRoot,
      declaredTest.path
    );
    const startedAt = Date.parse(
      "2026-07-24T12:00:00.000Z"
    );
    const cases = [
      {
        expected: "MISSING",
        vitestJson: {
          startTime: startedAt,
          success: true,
          testResults: []
        }
      },
      {
        expected: "FAILED",
        vitestJson: vitestJsonResult({
          testPath: declaredPath,
          testName: declaredTest.name,
          assertionStatus: "failed",
          suiteStatus: "failed",
          success: false
        })
      },
      {
        expected: "PATH_MISMATCH",
        vitestJson: vitestJsonResult({
          testPath: join(
            repoRoot,
            "scripts/research/operational-savings/tests/proof-ledger.test.mjs"
          ),
          testName: declaredTest.name
        })
      },
      {
        expected: "NAME_MISMATCH",
        vitestJson: vitestJsonResult({
          testPath: declaredPath,
          testName: `${declaredTest.name} renamed`
        })
      }
    ];

    for (const candidate of cases) {
      const record = await generateTestRunRecord({
        manifestFile,
        vitestJson: candidate.vitestJson
      });
      expect(record.execution.status).toBe("FAILED");
      expect(record.tests).toHaveLength(1);
      expect(record.tests[0].status).toBe(
        candidate.expected
      );
      expect(
        record.execution.resultCounts[
          candidate.expected
        ]
      ).toBe(1);
      expect(validateProofExecutionRunRecord(record)).toBe(
        record
      );
      const ledger = await buildProofLedger({
        repoRoot,
        adaptersRoot,
        executionRunRecord: record,
        executionRunRecordPath: null
      });
      const process = ledger.processes.find(
        (item) =>
          item.categoryId === "ITC-29" &&
          item.processKey === "fueleconomy_vehicles"
      );
      expect(ledger.executionVerification.status).toBe(
        "RUN_FAILED"
      );
      expect(process.executionVerifiedProofLevel).toBeNull();
      expect(process.proofLevel).toBe(
        "DOCUMENTATION_ONLY"
      );
      expect(process.offlineStatus.status).toBe(
        "NOT_VERIFIED"
      );
    }
  });
});

test.each([
  "vite.config.ts",
  "scripts/research/operational-savings/run-real-test-suite.mjs",
  "scripts/research/operational-savings/proof-attestation.mjs",
  "scripts/research/operational-savings/lib/network-isolation.mjs"
])(
  "refuses a passing record when %s changes between execution and attestation",
  async (mutatedPath) => {
    await withTemporaryAdapters(async (adaptersRoot) => {
      const manifest = fuelEconomyManifest();
      const manifestFile = await writeProofManifest(
        adaptersRoot,
        manifest
      );
      const preRunInputState =
        await captureProofExecutionInputState({
          repoRoot,
          manifestFiles: [manifestFile]
        });
      const postRunInputState = mutateFingerprintedFile(
        structuredClone(preRunInputState),
        mutatedPath
      );
      postRunInputState.capturedAt = new Date(
        Date.parse(preRunInputState.capturedAt) + 10
      ).toISOString();
      expect(() =>
        assertProofExecutionInputStateUnchanged({
          preRunInputState,
          postRunInputState
        })
      ).toThrow(/PROOF_EXECUTION_INPUTS_CHANGED/);

      const [declaredTest] = manifest.tests;
      await expect(
        generateProofExecutionRunRecord({
          repoRoot,
          manifestFiles: [manifestFile],
          preRunInputState,
          postRunInputState,
          vitestJson: vitestJsonResult({
            testPath: join(repoRoot, declaredTest.path),
            testName: declaredTest.name
          }),
          vitestJsonSha256: "c".repeat(64),
          command:
            "node vitest.mjs run --config vite.config.ts",
          runnerStartedAtMs:
            Date.parse(preRunInputState.capturedAt) + 1,
          runnerCompletedAtMs:
            Date.parse(preRunInputState.capturedAt) + 9,
          runnerExitStatus: 0,
          vitestVersion: "3.2.6"
        })
      ).rejects.toThrow(/PROOF_EXECUTION_INPUTS_CHANGED/);
    });
  }
);

test("refuses stale Vitest JSON that predates the orchestrated runner window", async () => {
  await withTemporaryAdapters(async (adaptersRoot) => {
    const manifest = fuelEconomyManifest();
    const manifestFile = await writeProofManifest(
      adaptersRoot,
      manifest
    );
    const preRunInputState =
      await captureProofExecutionInputState({
        repoRoot,
        manifestFiles: [manifestFile]
      });
    const preRunCapturedAtMs = Date.parse(
      preRunInputState.capturedAt
    );
    const postRunInputState = structuredClone(
      preRunInputState
    );
    postRunInputState.capturedAt = new Date(
      preRunCapturedAtMs + 100
    ).toISOString();
    const [declaredTest] = manifest.tests;
    const preRunSnapshotState = {
      capturedAt: preRunInputState.capturedAt,
      sourceEvidenceFingerprint: structuredClone(
        preRunInputState.sourceEvidenceFingerprint
      ),
      artifactIdentityCatalog: structuredClone(
        preRunInputState.artifactIdentityCatalog
      )
    };
    preRunSnapshotState.snapshotStateSha256 =
      sha256Canonical({
        sourceEvidenceFingerprint:
          preRunSnapshotState.sourceEvidenceFingerprint,
        artifactIdentityCatalog:
          preRunSnapshotState.artifactIdentityCatalog
      });
    const postRunSnapshotState = structuredClone(
      preRunSnapshotState
    );
    postRunSnapshotState.capturedAt = new Date(
      preRunCapturedAtMs + 99
    ).toISOString();

    await expect(
      generateProofExecutionRunRecord({
        repoRoot,
        manifestFiles: [manifestFile],
        preRunInputState,
        postRunInputState,
        preRunSnapshotState,
        postRunSnapshotState,
        executionIsolation:
          testExecutionIsolation(preRunInputState),
        vitestJson: vitestJsonResult({
          testPath: join(repoRoot, declaredTest.path),
          testName: declaredTest.name
        }),
        vitestJsonSha256: "c".repeat(64),
        command:
          "node vitest.mjs run --config vite.config.ts",
        runnerStartedAtMs: preRunCapturedAtMs + 1,
        runnerCompletedAtMs: preRunCapturedAtMs + 99,
        runnerExitStatus: 0,
        vitestVersion: "3.2.6"
      })
    ).rejects.toThrow(/PROOF_EXECUTION_TIMELINE_INVALID/);
  });
});

test("rejects a stale source fingerprint even when the prior exact test passed", async () => {
  await withTemporaryAdapters(async (adaptersRoot) => {
    const manifest = fuelEconomyManifest();
    const manifestFile = await writeProofManifest(
      adaptersRoot,
      manifest
    );
    const [declaredTest] = manifest.tests;
    const record = await generateTestRunRecord({
      manifestFile,
      vitestJson: vitestJsonResult({
        testPath: join(repoRoot, declaredTest.path),
        testName: declaredTest.name
      })
    });

    manifest.artifacts[0].release =
      "changed after the passing run";
    await writeFile(
      manifestFile.path,
      `${JSON.stringify(manifest, null, 2)}\n`
    );

    const ledger = await buildProofLedger({
      repoRoot,
      adaptersRoot,
      executionRunRecord: record,
      executionRunRecordPath: null
    });
    const process = ledger.processes.find(
      (candidate) =>
        candidate.categoryId === "ITC-29" &&
        candidate.processKey === "fueleconomy_vehicles"
    );
    expect(ledger.executionVerification.status).toBe(
      "STALE_SOURCE_FINGERPRINT"
    );
    expect(process.executionVerificationStatus).toBe(
      "STALE_SOURCE_FINGERPRINT"
    );
    expect(process.executionVerifiedProofLevel).toBeNull();
    expect(process.proofLevel).toBe(
      "DOCUMENTATION_ONLY"
    );
    expect(process.offlineStatus.status).toBe(
      "NOT_VERIFIED"
    );
  });
});

test("detects tampering inside the fingerprint and the enclosing run record", async () => {
  await withTemporaryAdapters(async (adaptersRoot) => {
    const manifest = fuelEconomyManifest();
    const manifestFile = await writeProofManifest(
      adaptersRoot,
      manifest
    );
    const [declaredTest] = manifest.tests;
    const record = await generateTestRunRecord({
      manifestFile,
      vitestJson: vitestJsonResult({
        testPath: join(repoRoot, declaredTest.path),
        testName: declaredTest.name
      })
    });

    const fingerprintTamper = structuredClone(record);
    fingerprintTamper.sourceEvidenceFingerprint.files[0].sha256 =
      "f".repeat(64);
    expect(() =>
      validateProofExecutionRunRecord(fingerprintTamper)
    ).toThrow(/source fingerprint digest/);

    const recordTamper = structuredClone(record);
    recordTamper.execution.command = "different command";
    expect(() =>
      validateProofExecutionRunRecord(recordTamper)
    ).toThrow(/content digest mismatch/);

    const trustBoundaryTamper = structuredClone(record);
    trustBoundaryTamper.trust.forgeryResistance =
      "CRYPTOGRAPHICALLY_AUTHENTICATED";
    expect(() =>
      validateProofExecutionRunRecord(
        trustBoundaryTamper
      )
    ).toThrow(
      /unsigned, unauthenticated, repository-writer-forgeable trust boundary/
    );
  });
});
