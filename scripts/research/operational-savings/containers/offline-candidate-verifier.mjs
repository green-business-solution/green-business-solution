import { spawn } from "node:child_process";
import { createHash } from "node:crypto";
import {
  chmod,
  copyFile,
  mkdir,
  mkdtemp,
  readFile,
  realpath,
  rm,
  utimes,
  writeFile
} from "node:fs/promises";
import { tmpdir } from "node:os";
import {
  dirname,
  isAbsolute,
  relative,
  resolve,
  sep
} from "node:path";

import {
  CANDIDATE_RECEIPT_SCHEMA,
  createRunNetworkNoneBuildCommand,
  inspectCandidateImage,
  loadOfflineRebuildPlan,
  sha256File,
  verifyPreparedContext
} from "./offline-rebuild.mjs";

const VERIFICATION_SCHEMA =
  "operational-savings/offline-container-candidate-verification-v1";
const NORMALIZED_FILE_MODE = 0o444;
const NORMALIZED_MTIME = new Date(0);

function sha256Text(value) {
  return createHash("sha256").update(value).digest("hex");
}

function assert(condition, message) {
  if (!condition) {
    throw new Error(
      `OFFLINE_CANDIDATE_VERIFICATION_INVALID: ${message}`
    );
  }
}

function resolveWithin(root, value, label) {
  assert(
    typeof value === "string" &&
      value.length > 0 &&
      !isAbsolute(value) &&
      !value.includes("\\") &&
      !value.split("/").includes(".."),
    `${label} relative path`
  );
  const absolutePath = resolve(root, value);
  const absoluteRoot = resolve(root);
  assert(
    absolutePath.startsWith(`${absoluteRoot}${sep}`),
    `${label} path escape`
  );
  return absolutePath;
}

function captureProcess(command, args, options = {}) {
  return new Promise((resolveProcess) => {
    const child = spawn(command, args, {
      cwd: options.cwd,
      env: options.env ?? process.env,
      stdio: ["ignore", "pipe", "pipe"]
    });
    let stdout = "";
    let stderr = "";
    child.stdout.on(
      "data",
      (chunk) => (stdout += chunk.toString())
    );
    child.stderr.on(
      "data",
      (chunk) => (stderr += chunk.toString())
    );
    child.on("error", (error) =>
      resolveProcess({
        exitCode: null,
        stdout,
        stderr,
        error: error.message
      })
    );
    child.on("close", (exitCode) =>
      resolveProcess({
        exitCode,
        stdout,
        stderr,
        error: null
      })
    );
  });
}

async function copyWorkspaceFile({
  repoRoot,
  workspaceRoot,
  relativePath
}) {
  const sourcePath = resolveWithin(
    repoRoot,
    relativePath,
    "verification source"
  );
  const sourceRealPath = await realpath(sourcePath);
  const repoRealPath = await realpath(repoRoot);
  assert(
    sourceRealPath.startsWith(`${repoRealPath}${sep}`),
    "verification source realpath escape"
  );
  const targetPath = resolveWithin(
    workspaceRoot,
    relativePath,
    "verification target"
  );
  await mkdir(dirname(targetPath), {
    recursive: true,
    mode: 0o755
  });
  await copyFile(sourceRealPath, targetPath);
  return targetPath;
}

function overlayCandidateImage(
  manifest,
  modelId,
  candidate
) {
  const overlay = structuredClone(manifest);
  if (modelId === "reopt") {
    overlay.image.tag = candidate.reference;
    overlay.image.repositoryTag = candidate.reference;
    overlay.image.digest = candidate.imageId;
    overlay.image.localImageId = candidate.imageId;
  } else if (modelId === "ssc") {
    overlay.image.repositoryTag = candidate.reference;
    overlay.image.localImageId = candidate.imageId;
  } else if (modelId === "scout") {
    overlay.image.repositoryTag = candidate.reference;
    overlay.image.localImageId = candidate.imageId;
  } else {
    throw new Error(
      `OFFLINE_CANDIDATE_VERIFIER_UNSUPPORTED_MODEL: ${modelId}`
    );
  }
  return overlay;
}

async function runReoptCandidateModes({
  image,
  manifest,
  runProcess
}) {
  const results = [];
  for (const mode of ["official", "retrofi"]) {
    const expected = manifest.proofRuns.find(
      (run) => run.mode === mode
    );
    assert(expected, `REopt ${mode} expected proof`);
    const result = await runProcess(
      "docker",
      [
        "run",
        "--rm",
        "--platform",
        "linux/arm64",
        "--network",
        "none",
        "--read-only",
        "--cap-drop",
        "ALL",
        "--security-opt",
        "no-new-privileges",
        "--pull",
        "never",
        image,
        mode
      ],
      {}
    );
    assert(
      result.exitCode === 0,
      `REopt ${mode} candidate execution: ${
        result.error ?? result.stderr.trim()
      }`
    );
    let parsed;
    try {
      parsed = JSON.parse(result.stdout);
    } catch {
      throw new Error(
        `OFFLINE_CANDIDATE_VERIFICATION_INVALID: REopt ${mode} JSON`
      );
    }
    assert(
      parsed.outputSha256 === expected.outputSha256,
      `REopt ${mode} output checksum`
    );
    results.push({
      mode,
      outputSha256: parsed.outputSha256
    });
  }
  return results;
}

export async function runAcceptedVerifierOverlay({
  repoRoot,
  model,
  candidate,
  runProcess = captureProcess
}) {
  const manifestPath = resolveWithin(
    repoRoot,
    model.historicalBuildManifestPath,
    "historical manifest"
  );
  const manifest = JSON.parse(
    await readFile(manifestPath, "utf8")
  );
  const manifestDirectory = dirname(manifestPath);
  const verifierPath = resolve(manifestDirectory, "verify.mjs");
  const verifierRelativePath = relative(
    resolve(repoRoot),
    verifierPath
  );
  assert(
    !verifierRelativePath.startsWith(".."),
    "recorded verifier path"
  );
  const workspaceRoot = await mkdtemp(
    resolve(tmpdir(), "retrofi-offline-candidate-verify-")
  );
  try {
    const requiredPaths = new Set([
      verifierRelativePath,
      ...(
        manifest.buildInputs ?? []
      ).map((input) =>
        relative(
          resolve(repoRoot),
          resolve(manifestDirectory, input.path)
        )
      ),
      ...(
        manifest.verificationInputs ?? []
      ).map((input) =>
        relative(
          resolve(repoRoot),
          resolve(manifestDirectory, input.path)
        )
      ),
      ...(
        manifest.proofRuns ?? []
      )
        .filter((run) => run.evidencePath)
        .map((run) =>
          relative(
            resolve(repoRoot),
            resolve(
              manifestDirectory,
              run.evidencePath
            )
          )
        )
    ]);
    if (model.modelId === "reopt") {
      requiredPaths.add(
        "scripts/research/operational-savings/lib/artifact.mjs"
      );
    }
    for (const relativePath of requiredPaths) {
      await copyWorkspaceFile({
        repoRoot,
        workspaceRoot,
        relativePath
      });
    }
    const workspaceManifestPath = resolveWithin(
      workspaceRoot,
      model.historicalBuildManifestPath,
      "workspace manifest"
    );
    await mkdir(dirname(workspaceManifestPath), {
      recursive: true,
      mode: 0o755
    });
    const overlay = overlayCandidateImage(
      manifest,
      model.modelId,
      candidate
    );
    await writeFile(
      workspaceManifestPath,
      `${JSON.stringify(overlay, null, 2)}\n`,
      { encoding: "utf8", flag: "wx" }
    );
    const workspaceVerifierPath = resolveWithin(
      workspaceRoot,
      verifierRelativePath,
      "workspace verifier"
    );
    const result = await runProcess(
      process.execPath,
      [workspaceVerifierPath],
      {
        cwd: workspaceRoot,
        env: {
          ...process.env,
          OS_RESEARCH_NETWORK: "disabled"
        }
      }
    );
    assert(
      result.exitCode === 0,
      `checksum-bound verifier overlay: ${
        result.error ??
        result.stderr.trim() ??
        result.stdout.trim()
      }`
    );
    const reoptModes =
      model.modelId === "reopt"
        ? await runReoptCandidateModes({
            image: candidate.reference,
            manifest: overlay,
            runProcess
          })
        : [];
    return {
      status: "PASS",
      verifierSourcePath: verifierRelativePath,
      verifierSha256: await sha256File(verifierPath),
      stdout: result.stdout.trim(),
      reoptModes
    };
  } finally {
    await rm(workspaceRoot, {
      recursive: true,
      force: true
    });
  }
}

function verifyBuilderBinding(builderInspection) {
  assert(
    builderInspection?.status ===
      "VERIFIED_LOCAL_DOCKER_BUILDER",
    "builder status"
  );
  const binding = {
    name: builderInspection.name,
    driver: builderInspection.driver,
    currentContext: builderInspection.currentContext,
    dockerHost: builderInspection.dockerHost,
    nodes: builderInspection.nodes
  };
  assert(
    sha256Text(`${JSON.stringify(binding)}\n`) ===
      builderInspection.inspectionSha256,
    "builder inspection checksum"
  );
  assert(
    builderInspection.driver === "docker" &&
      (
        builderInspection.dockerHost.startsWith("unix://") ||
        builderInspection.dockerHost.startsWith("npipe://")
      ),
    "local Docker builder"
  );
}

function verifyCommandBinding(receipt) {
  assert(
    Array.isArray(receipt.command) &&
      receipt.command[0] === "docker",
    "candidate command"
  );
  assert(
    sha256Text(`${JSON.stringify(receipt.command)}\n`) ===
      receipt.commandSha256,
    "candidate command checksum"
  );
  const pairedOptions = [
    ["--network", "none"],
    ["--builder", receipt.builderInspection.name],
    ["--tag", receipt.candidate.reference]
  ];
  for (const [option, expectedValue] of pairedOptions) {
    const optionIndex = receipt.command.indexOf(option);
    assert(
      optionIndex !== -1 &&
        receipt.command[optionIndex + 1] === expectedValue,
      `${option} ${expectedValue}`
    );
  }
  for (const exactFlag of [
    "--no-cache",
    "--pull=false",
    "--provenance=false",
    "--sbom=false"
  ]) {
    assert(receipt.command.includes(exactFlag), exactFlag);
  }
}

function verifyExactBuildCommand({
  receipt,
  plan,
  model,
  contextLock
}) {
  assert(
    contextLock.targetPlatform === plan.targetPlatform,
    "context target platform"
  );
  const artifacts = model.exactArtifacts.map((artifact) => {
    const lockedInput = contextLock.inputs.find(
      (input) => input.contextPath === artifact.contextPath
    );
    assert(
      lockedInput &&
        lockedInput.sha256 === artifact.sha256 &&
        lockedInput.sizeBytes === artifact.sizeBytes,
      `context artifact ${artifact.artifactId}`
    );
    return {
      ...artifact,
      status: "VERIFIED_EXACT_LOCAL_INPUT",
      actualSha256: lockedInput.sha256
    };
  });
  const preparedCommand =
    createRunNetworkNoneBuildCommand({
      model,
      targetPlatform: plan.targetPlatform,
      artifacts
    });
  assert(
    JSON.stringify(contextLock.buildCommand) ===
      JSON.stringify(preparedCommand),
    "prepared build command"
  );
  const expectedCommand =
    createRunNetworkNoneBuildCommand({
      model,
      targetPlatform: plan.targetPlatform,
      artifacts,
      builderName: receipt.builderInspection.name
    });
  assert(
    JSON.stringify(receipt.command) ===
      JSON.stringify(expectedCommand),
    "exact candidate build command"
  );
}

export async function verifyOfflineCandidateReceipt({
  receiptPath,
  repoRoot,
  inspectImage = inspectCandidateImage,
  runCandidateVerifier = runAcceptedVerifierOverlay
}) {
  const receiptRealPath = await realpath(receiptPath);
  const contextPath = dirname(receiptRealPath);
  const receipt = JSON.parse(
    await readFile(receiptRealPath, "utf8")
  );
  assert(
    receipt.schemaVersion === CANDIDATE_RECEIPT_SCHEMA,
    "receipt schema"
  );
  assert(
    receipt.status ===
      "LOCAL_CANDIDATE_BUILT_VERIFICATION_NOT_YET_RECORDED",
    "receipt status"
  );
  const planPath = resolveWithin(
    contextPath,
    receipt.plan.path,
    "receipt plan"
  );
  const contextLockPath = resolveWithin(
    contextPath,
    receipt.contextLock.path,
    "receipt context lock"
  );
  assert(
    (await sha256File(planPath)) === receipt.plan.sha256,
    "plan checksum"
  );
  assert(
    (await sha256File(contextLockPath)) ===
      receipt.contextLock.sha256,
    "context lock checksum"
  );
  const [plan, contextLock] = await Promise.all([
    loadOfflineRebuildPlan({ planPath }),
    readFile(contextLockPath, "utf8").then(JSON.parse)
  ]);
  const model = plan.models.find(
    (candidate) => candidate.modelId === receipt.modelId
  );
  assert(model, "receipt model");
  assert(
    model.workflowStatus === "IMPLEMENTED",
    "implemented model workflow"
  );
  assert(
    model.historicalBuildManifestPath ===
      receipt.historicalBuildManifestPath,
    "historical manifest binding"
  );
  assert(
    contextLock.modelId === receipt.modelId &&
      contextLock.candidateTag === receipt.candidate.reference,
    "context lock candidate binding"
  );
  assert(
    contextLock.contextMetadata
      .dockerBuildInputTreeSha256 ===
      receipt.contextLock.dockerBuildInputTreeSha256,
    "context tree binding"
  );
  verifyBuilderBinding(receipt.builderInspection);
  verifyCommandBinding(receipt);
  verifyExactBuildCommand({
    receipt,
    plan,
    model,
    contextLock
  });
  assert(
    receipt.networkEvidence?.daemonEgressControl?.status ===
      "VERIFIED_DENY_EXTERNAL_EGRESS",
    "daemon egress evidence"
  );
  await verifyPreparedContext({
    contextPath,
    contextLock,
    allowedReceiptFiles: [
      "offline-candidate-receipt.v1.json"
    ]
  });
  const currentImage = await inspectImage(
    receipt.candidate.reference
  );
  assert(
    currentImage.status ===
      "VERIFIED_LOCAL_CANDIDATE_IMAGE" &&
      currentImage.imageId === receipt.candidate.imageId &&
      currentImage.os === receipt.candidate.os &&
      currentImage.architecture ===
        receipt.candidate.architecture,
    "current candidate image identity"
  );
  const verifier = await runCandidateVerifier({
    repoRoot,
    model,
    candidate: receipt.candidate
  });
  assert(verifier.status === "PASS", "candidate verifier");
  const receiptSha256 = await sha256File(receiptRealPath);
  const verification = {
    schemaVersion: VERIFICATION_SCHEMA,
    status: "PASS_CANDIDATE_NOT_ACCEPTED",
    evidenceScope:
      "Prospective candidate verification only. The accepted historical manifest remains unchanged.",
    verifiedAt: new Date().toISOString(),
    modelId: receipt.modelId,
    candidate: receipt.candidate,
    receipt: {
      path: "offline-candidate-receipt.v1.json",
      sha256: receiptSha256
    },
    contextLock: receipt.contextLock,
    builderInspectionSha256:
      receipt.builderInspection.inspectionSha256,
    commandSha256: receipt.commandSha256,
    verifier,
    historicalEvidenceChanged: false
  };
  const verificationPath = resolve(
    contextPath,
    "offline-candidate-verification.v1.json"
  );
  await writeFile(
    verificationPath,
    `${JSON.stringify(verification, null, 2)}\n`,
    {
      encoding: "utf8",
      flag: "wx",
      mode: NORMALIZED_FILE_MODE
    }
  );
  await chmod(verificationPath, NORMALIZED_FILE_MODE);
  await utimes(
    verificationPath,
    NORMALIZED_MTIME,
    NORMALIZED_MTIME
  );
  await verifyPreparedContext({
    contextPath,
    contextLock,
    allowedReceiptFiles: [
      "offline-candidate-receipt.v1.json",
      "offline-candidate-verification.v1.json"
    ]
  });
  return {
    verificationPath,
    verification
  };
}
