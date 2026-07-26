#!/usr/bin/env node

import { accessSync, constants } from "node:fs";

import {
  NETWORK_ENFORCEMENT,
  spawnSyncWithNetworkDenied
} from "./lib/network-isolation.mjs";
import {
  DEFAULT_REPOSITORY_ROOT,
  buildRealProofVitestArguments,
  runProofExecutionAttestation
} from "./proof-attestation.mjs";

const clangPath = "/usr/bin/clang++";
const sandboxPath = "/usr/bin/sandbox-exec";
const requiredExecutables = [clangPath, sandboxPath];

function verifyHostPrerequisites() {
  if (process.platform !== "darwin") {
    throw new Error(
      "REAL_PROOF_PLATFORM_UNSUPPORTED: the host-native real-proof suite requires macOS because the retained binaries and measured network sandbox are macOS-specific. Use the model-container replay for portable Linux model execution."
    );
  }
  for (const path of requiredExecutables) {
    try {
      accessSync(path, constants.X_OK);
    } catch {
      throw new Error(
        `REAL_PROOF_EXECUTABLE_MISSING: ${path}`
      );
    }
  }
}

const forwardedArguments = process.argv.slice(2);
verifyHostPrerequisites();

if (forwardedArguments.includes("--attest")) {
  if (
    forwardedArguments.length !== 1 ||
    forwardedArguments[0] !== "--attest"
  ) {
    throw new Error(
      "PROOF_ATTESTATION_ARGUMENTS_FORBIDDEN: --attest runs the fixed complete real suite and accepts no test-selection or reporter overrides"
    );
  }
  const { record, outputPath } =
    await runProofExecutionAttestation({
      repoRoot: DEFAULT_REPOSITORY_ROOT
    });
  process.stdout.write(
    `${JSON.stringify(
      {
        outputPath,
        runId: record.runId,
        status: record.execution.status,
        trust: record.recordType,
        inputStateSha256:
          record.execution.attestation.inputStateSha256,
        resultCounts: record.execution.resultCounts
      },
      null,
      2
    )}\n`
  );
  if (record.execution.status !== "PASSED") {
    process.exitCode = 1;
  }
} else {
  const result = spawnSyncWithNetworkDenied(
    process.execPath,
    buildRealProofVitestArguments(forwardedArguments),
    {
      cwd: DEFAULT_REPOSITORY_ROOT,
      env: {
        ...process.env,
        OS_RESEARCH_REAL_PROOFS: "required",
        OS_RESEARCH_NETWORK: "disabled",
        OS_RESEARCH_NETWORK_ENFORCEMENT:
          NETWORK_ENFORCEMENT
      },
      stdio: "inherit"
    },
    {
      forceTopLevelSandbox: true
    }
  );
  if (result.error) throw result.error;
  process.exitCode = result.status ?? 1;
}
