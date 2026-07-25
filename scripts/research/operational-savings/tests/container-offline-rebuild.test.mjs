import { createHash } from "node:crypto";
import {
  chmod,
  mkdir,
  mkdtemp,
  readFile,
  realpath,
  rm,
  stat,
  symlink,
  writeFile
} from "node:fs/promises";
import { tmpdir } from "node:os";
import { join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { afterEach, expect, test } from "vitest";

import {
  buildOfflineCandidate,
  inspectOfflineRebuildModel,
  loadOfflineRebuildPlan,
  parseHashedRequirements,
  prepareOfflineBuildContext,
  sha256File,
  validateOfflineDockerfile,
  verifyPreparedContext
} from "../containers/offline-rebuild.mjs";
import { verifyOfflineCandidateReceipt } from "../containers/offline-candidate-verifier.mjs";

const temporaryDirectories = [];
const repoRoot = fileURLToPath(
  new URL("../../../../", import.meta.url)
);

afterEach(async () => {
  await Promise.all(
    temporaryDirectories.splice(0).map((path) =>
      rm(path, { recursive: true, force: true })
    )
  );
});

function sha256(value) {
  return createHash("sha256").update(value).digest("hex");
}

function syntheticBuilderInspection() {
  const binding = {
    name: "synthetic-local",
    driver: "docker",
    currentContext: "synthetic-local",
    dockerHost: "unix:///private/tmp/docker.sock",
    nodes: [
      {
        name: "synthetic-local",
        endpoint: "synthetic-local",
        status: "running",
        version: "v1.0.0",
        platforms: ["linux/arm64"]
      }
    ]
  };
  return {
    status: "VERIFIED_LOCAL_DOCKER_BUILDER",
    ...binding,
    inspectionSha256: sha256(
      `${JSON.stringify(binding)}\n`
    )
  };
}

async function writeFixture(root, path, value) {
  const absolutePath = join(root, path);
  await mkdir(resolve(absolutePath, ".."), {
    recursive: true
  });
  await writeFile(absolutePath, value);
  return absolutePath;
}

async function newContextPath(label) {
  const parent = await mkdtemp(
    join(tmpdir(), `retrofi-${label}-`)
  );
  temporaryDirectories.push(parent);
  return join(parent, "context");
}

test("keeps prospective offline Dockerfiles separate from accepted image evidence", async () => {
  const plan = await loadOfflineRebuildPlan();
  expect(plan.models.map((model) => model.modelId)).toEqual([
    "reopt",
    "ssc",
    "scout",
    "measur"
  ]);
  for (const model of plan.models) {
    expect(model.candidateTag).toContain(
      "-offline-candidate-"
    );
    const acceptedManifest = JSON.parse(
      await readFile(
        resolve(repoRoot, model.historicalBuildManifestPath),
        "utf8"
      )
    );
    expect(
      acceptedManifest.buildInputs?.some(
        (input) => input.path === "Dockerfile.offline"
      ) ?? false
    ).toBe(false);
    if (model.workflowStatus === "IMPLEMENTED") {
      const dockerfile = await readFile(
        resolve(repoRoot, model.offlineDockerfilePath),
        "utf8"
      );
      expect(validateOfflineDockerfile(dockerfile)).toEqual(
        []
      );
      expect(dockerfile).not.toMatch(
        /\b(?:curl|wget|apt-get)\b/
      );
      expect(dockerfile).not.toMatch(
        /^\s*#\s*syntax\s*=/im
      );
    }
  }
  const scoutDockerfile = await readFile(
    resolve(
      repoRoot,
      "scripts/research/operational-savings/containers/scout/Dockerfile.offline"
    ),
    "utf8"
  );
  expect(scoutDockerfile).toContain("--no-index");
  expect(scoutDockerfile).toContain("--require-hashes");
  const reoptDockerfile = await readFile(
    resolve(
      repoRoot,
      "scripts/research/operational-savings/containers/reopt/Dockerfile.offline"
    ),
    "utf8"
  );
  expect(reoptDockerfile).not.toMatch(
    /\bPkg\.(?:add|instantiate|resolve|update)\b/
  );
});

test("rejects mutable dependency operations in an offline Dockerfile", () => {
  expect(
    validateOfflineDockerfile(`
      # syntax=docker/dockerfile:1.7
      # escape=\`
      FROM ubuntu:latest
      FROM --platform=linux/amd64 scratch AS override
      ADD --checksum=sha256:${"3".repeat(64)} https://example.invalid/source.tar.gz /tmp/
      COPY --from=ghcr.io/example/tool:latest /tool /tool
      RUN curl https://example.invalid/source.tar.gz -o /tmp/source
      RUN apt-get update && apt-get install -y cmake
      RUN python -m pip install demo==1.0
      RUN julia -e "using Pkg; Pkg.instantiate()"
      RUN --mount=type=cache,target=/tmp --network=host python -c "import urllib.request; urllib.request.urlopen('https://example.invalid')"
    `)
  ).toEqual([
    "ADD_FORBIDDEN",
    "EXTERNAL_COPY_SOURCE",
    "EXTERNAL_DOCKERFILE_FRONTEND",
    "FROM_OPTIONS_FORBIDDEN",
    "LIVE_HTTP_CLIENT",
    "LIVE_JULIA_PACKAGE_OPERATION",
    "LIVE_SYSTEM_PACKAGE_OPERATION",
    "PIP_INSTALL_WITHOUT_OFFLINE_HASH_LOCK",
    "RUN_NETWORK_OVERRIDE",
    "RUN_PRIVILEGED_OPTION_FORBIDDEN",
    "RUN_REMOTE_URL_LITERAL",
    "UNPINNED_FROM",
    "UNSUPPORTED_DOCKERFILE_PARSER_DIRECTIVE"
  ]);
});

test("parses one exact hash per locked Python requirement", () => {
  const firstHash = "1".repeat(64);
  const secondHash = "2".repeat(64);
  expect(
    parseHashedRequirements(
      [
        `demo-pkg==1.0.0 --hash=sha256:${firstHash}`,
        `other_pkg==2.0.0 --hash=sha256:${secondHash}`,
        ""
      ].join("\n")
    )
  ).toMatchObject([
    {
      normalizedName: "demo-pkg",
      version: "1.0.0",
      sha256: firstHash
    },
    {
      normalizedName: "other-pkg",
      version: "2.0.0",
      sha256: secondHash
    }
  ]);
  expect(() =>
    parseHashedRequirements("demo==1.0.0")
  ).toThrow("OFFLINE_REBUILD_INVALID_REQUIREMENT_LOCK_LINE");
});

async function buildSyntheticReadyPlan() {
  const root = await mkdtemp(
    join(tmpdir(), "retrofi-offline-rebuild-test-")
  );
  temporaryDirectories.push(root);
  const sourceBytes = Buffer.from("exact-source-archive");
  const wheelBytes = Buffer.from("exact-wheel");
  const wheelSha256 = sha256(wheelBytes);
  const dockerfile = [
    `ARG BASE_IMAGE=example.invalid/python@sha256:${"1".repeat(64)}`,
    "FROM ${BASE_IMAGE}",
    "ARG SOURCE_SHA256",
    "COPY inputs/source.tar /opt/source.tar",
    "COPY inputs/wheels /opt/wheels",
    "COPY requirements.lock /opt/requirements.lock",
    "RUN python -m pip install --no-index --find-links=/opt/wheels --require-hashes -r /opt/requirements.lock",
    ""
  ].join("\n");
  await writeFixture(
    root,
    "cache/source.tar",
    sourceBytes
  );
  await writeFixture(
    root,
    "cache/wheels/demo_pkg-1.0.0-py3-none-any.whl",
    wheelBytes
  );
  await writeFixture(
    root,
    "containers/scout/Dockerfile.offline",
    dockerfile
  );
  await writeFixture(
    root,
    "containers/scout/runner.py",
    "print('ok')\n"
  );
  await writeFixture(
    root,
    "containers/scout/requirements.lock",
    `demo-pkg==1.0.0 --hash=sha256:${wheelSha256}\n`
  );
  const daemonEvidence = Buffer.from(
    "verified synthetic daemon egress control\n"
  );
  await writeFixture(
    root,
    "evidence/daemon-egress.txt",
    daemonEvidence
  );
  const baseReference =
    `example.invalid/python@sha256:${"1".repeat(64)}`;
  const plan = {
    schemaVersion:
      "operational-savings/offline-container-rebuild-plan-v1",
    targetPlatform: "linux/arm64",
    daemonEgressControl: {
      status: "VERIFIED_DENY_EXTERNAL_EGRESS",
      evidencePath: "evidence/daemon-egress.txt",
      evidenceSha256: sha256(daemonEvidence),
      verifiedAt: "2026-07-24T00:00:00.000Z",
      scope: "Synthetic unit-test evidence."
    },
    durableImageDependencies: [
      {
        dependencyId: "synthetic-python-arm64",
        roles: ["synthetic-build", "synthetic-runtime"],
        reference: baseReference,
        indexDigest: `sha256:${"1".repeat(64)}`,
        arm64ManifestDigest:
          `sha256:${"2".repeat(64)}`,
        durableEvidence: {
          status: "AWS_RESTORE_VERIFIED",
          storageKind: "RESEARCH_S3_OCI_LAYOUT",
          uri: "s3://research-only/base/python.oci.tar",
          immutableIdentity: "version-1",
          contentSha256: "3".repeat(64),
          restoredReference: baseReference,
          restoredManifestDigest:
            `sha256:${"2".repeat(64)}`,
          verifiedAt: "2026-07-24T00:00:00.000Z",
          restoreVerifiedAt:
            "2026-07-24T00:01:00.000Z"
        }
      }
    ],
    models: [
      {
        modelId: "scout",
        historicalBuildManifestPath:
          "containers/scout/build-manifest.json",
        candidateTag:
          "example/scout:1.0-offline-candidate-arm64",
        workflowStatus: "IMPLEMENTED",
        imageDependencyIds: ["synthetic-python-arm64"],
        baseImageArgument: "BASE_IMAGE",
        offlineDockerfilePath:
          "containers/scout/Dockerfile.offline",
        exactArtifacts: [
          {
            artifactId: "source",
            cachePath: "cache/source.tar",
            contextPath: "inputs/source.tar",
            sha256: sha256(sourceBytes),
            sizeBytes: sourceBytes.length,
            required: true
          }
        ],
        wheelhouse: {
          cacheDirectory: "cache/wheels",
          contextDirectory: "inputs/wheels",
          requirementsPath:
            "containers/scout/requirements.lock",
          expectedPackageCount: 1
        },
        trackedContextFiles: [
          {
            sourcePath:
              "containers/scout/Dockerfile.offline",
            contextPath: "Dockerfile"
          },
          {
            sourcePath: "containers/scout/runner.py",
            contextPath: "runner.py"
          },
          {
            sourcePath:
              "containers/scout/requirements.lock",
            contextPath: "requirements.lock"
          }
        ],
        buildArguments: {
          BASE_IMAGE: baseReference,
          SOURCE_SHA256: sha256(sourceBytes)
        },
        blockedAction: "No action required."
      }
    ]
  };
  return { root, plan, sourceBytes, wheelSha256 };
}

test("materializes a content-locked context and a network-denied candidate command", async () => {
  const { root, plan, sourceBytes, wheelSha256 } =
    await buildSyntheticReadyPlan();
  const ready = await inspectOfflineRebuildModel({
    modelId: "scout",
    plan,
    repoRoot: root,
    checkBaseImage: true,
    inspectBaseImage: async (reference) => ({
      reference,
      status: "VERIFIED_LOCAL_PINNED_BASE_IMAGE",
      present: true,
      imageId: `sha256:${"2".repeat(64)}`,
      architecture: "arm64",
      os: "linux"
    })
  });
  expect(ready).toMatchObject({
    contextStatus: "VERIFIED_EXACT_CONTEXT_INPUTS_READY",
    offlineBuildStatus:
      "READY_FOR_DAEMON_EGRESS_DENIED_CANDIDATE_BUILD",
    wheelhouse: {
      status: "VERIFIED_EXACT_LOCKED_WHEELHOUSE",
      actualPackageCount: 1,
      files: [
        {
          actualSha256: wheelSha256,
          status: "VERIFIED_EXACT_LOCKED_WHEEL"
        }
      ]
    }
  });

  const outputPath = await newContextPath(
    "offline-context"
  );
  const prepared = await prepareOfflineBuildContext({
    modelId: "scout",
    outputPath,
    plan,
    repoRoot: root
  });
  expect(prepared.contextLock).toMatchObject({
    modelId: "scout",
    candidateTag:
      "example/scout:1.0-offline-candidate-arm64",
    networkPolicy: {
      runInstructionDefaultNetwork: "none",
      pull: false,
      daemonEgressControl:
        "VERIFIED_DENY_EXTERNAL_EGRESS"
    }
  });
  expect(prepared.contextLock.inputs).toHaveLength(5);
  expect(prepared.contextLock.buildCommand).toEqual(
    expect.arrayContaining([
      "--network",
      "none",
      "--no-cache",
      "--pull=false",
      "--provenance=false",
      "--sbom=false"
    ])
  );
  expect(
    prepared.contextLock.buildCommandShell
  ).toContain("docker buildx build");
  expect(prepared.contextLock.buildCommand.at(-1)).toBe(".");
  expect(prepared.contextLock.buildCommand).not.toContain(
    outputPath
  );
  expect(
    await sha256File(join(outputPath, "inputs/source.tar"))
  ).toBe(sha256(sourceBytes));
  const copiedState = await stat(
    join(outputPath, "inputs/source.tar")
  );
  expect(copiedState.mode & 0o777).toBe(0o444);
  expect(copiedState.mtimeMs).toBe(0);
  expect(
    JSON.parse(
      await readFile(
        join(outputPath, "offline-context-lock.v1.json"),
        "utf8"
      )
    )
  ).toEqual(prepared.contextLock);
  await expect(
    prepareOfflineBuildContext({
      modelId: "scout",
      outputPath,
      plan,
      repoRoot: root
    })
  ).rejects.toThrow(
    "OFFLINE_REBUILD_CONTEXT_TARGET_EXISTS"
  );
});

test("checks the exact local base before invoking the candidate build", async () => {
  const { root, plan } = await buildSyntheticReadyPlan();
  const blockedOutput = await newContextPath(
    "base-blocked"
  );
  let buildInvoked = false;
  await expect(
    buildOfflineCandidate({
      modelId: "scout",
      outputPath: blockedOutput,
      plan,
      repoRoot: root,
      inspectBaseImage: async (reference) => ({
        reference,
        status: "PINNED_BASE_IMAGE_NOT_LOCAL",
        present: false
      }),
      inspectBuilder: async () =>
        syntheticBuilderInspection(),
      inspectImage: async () => {
        throw new Error("candidate inspection must not run");
      },
      runProcess: async () => {
        buildInvoked = true;
        return { exitCode: 0 };
      }
    })
  ).rejects.toThrow("OFFLINE_REBUILD_BUILD_BLOCKED");
  expect(buildInvoked).toBe(false);
  await expect(
    readFile(blockedOutput)
  ).rejects.toMatchObject({ code: "ENOENT" });

  const readyOutput = await newContextPath(
    "guarded-build"
  );
  let executed = null;
  let executedOptions = null;
  const result = await buildOfflineCandidate({
    modelId: "scout",
    outputPath: readyOutput,
    plan,
    repoRoot: root,
    inspectBaseImage: async (reference) => ({
      reference,
      status: "VERIFIED_LOCAL_PINNED_BASE_IMAGE",
      present: true,
      imageId: `sha256:${"2".repeat(64)}`,
      architecture: "arm64",
      os: "linux"
    }),
    inspectBuilder: async () =>
      syntheticBuilderInspection(),
    inspectImage: async (reference) => ({
      status: "VERIFIED_LOCAL_CANDIDATE_IMAGE",
      reference,
      imageId: `sha256:${"4".repeat(64)}`,
      os: "linux",
      architecture: "arm64",
      runtimeUser: "65532:65532",
      entrypoint: ["python"],
      labels: {}
    }),
    runProcess: async (command, args, options) => {
      executed = [command, ...args];
      executedOptions = options;
      return { exitCode: 0 };
    }
  });
  expect(executed).toEqual(
    result.build.command
  );
  expect(executedOptions).toEqual({
    cwd: await realpath(readyOutput)
  });
  expect(executed).toEqual(
    expect.arrayContaining([
      "--network",
      "none",
      "--no-cache",
      "--pull=false",
      "--provenance=false",
      "--sbom=false",
      "--builder",
      "synthetic-local"
    ])
  );
  expect(result.build).toMatchObject({
    status:
      "LOCAL_CANDIDATE_BUILT_VERIFICATION_NOT_YET_RECORDED",
    imageId: `sha256:${"4".repeat(64)}`,
    historicalEvidenceChanged: false
  });
  expect(
    JSON.parse(await readFile(result.receiptPath, "utf8"))
  ).toEqual(result.receipt);
});

test("does not materialize a context when a required dependency lacks a pinned identity", async () => {
  const { root, plan } = await buildSyntheticReadyPlan();
  plan.models[0].exactArtifacts.push({
    artifactId: "mutable-dependency",
    plannedCachePath: "cache/mutable-dependency.tar",
    contextPath: "inputs/mutable-dependency.tar",
    sha256: null,
    sizeBytes: null,
    required: true,
    missingReason: "No exact artifact was retained."
  });
  const report = await inspectOfflineRebuildModel({
    modelId: "scout",
    plan,
    repoRoot: root
  });
  expect(report.contextStatus).toBe(
    "BLOCKED_MISSING_EXACT_DEPENDENCY_ARTIFACT"
  );
  const outputPath = await newContextPath(
    "missing-dependency"
  );
  await expect(
    prepareOfflineBuildContext({
      modelId: "scout",
      outputPath,
      plan,
      repoRoot: root
    })
  ).rejects.toThrow("OFFLINE_REBUILD_CONTEXT_BLOCKED");
  await expect(readFile(outputPath)).rejects.toMatchObject({
    code: "ENOENT"
  });
});

test("rejects duplicate, reserved, and base-inconsistent plan paths", async () => {
  const first = await buildSyntheticReadyPlan();
  const validPlanPath = await writeFixture(
    first.root,
    "valid-plan.json",
    `${JSON.stringify(first.plan, null, 2)}\n`
  );
  await expect(
    loadOfflineRebuildPlan({ planPath: validPlanPath })
  ).resolves.toMatchObject({
    models: [{ modelId: "scout" }]
  });

  const duplicate = await buildSyntheticReadyPlan();
  duplicate.plan.models[0].exactArtifacts.push({
    artifactId: "duplicate-runner",
    cachePath: "cache/source.tar",
    contextPath: "runner.py",
    sha256: sha256(duplicate.sourceBytes),
    sizeBytes: duplicate.sourceBytes.length,
    required: true
  });
  const duplicatePath = await writeFixture(
    duplicate.root,
    "duplicate-plan.json",
    `${JSON.stringify(duplicate.plan)}\n`
  );
  await expect(
    loadOfflineRebuildPlan({ planPath: duplicatePath })
  ).rejects.toThrow(
    "OFFLINE_REBUILD_DUPLICATE_CONTEXT_PATH"
  );

  const reserved = await buildSyntheticReadyPlan();
  reserved.plan.models[0].exactArtifacts[0].contextPath =
    "offline-context-lock.v1.json";
  const reservedPath = await writeFixture(
    reserved.root,
    "reserved-plan.json",
    `${JSON.stringify(reserved.plan)}\n`
  );
  await expect(
    loadOfflineRebuildPlan({ planPath: reservedPath })
  ).rejects.toThrow(
    "OFFLINE_REBUILD_RESERVED_CONTEXT_PATH"
  );

  const inconsistent = await buildSyntheticReadyPlan();
  inconsistent.plan.models[0].buildArguments.BASE_IMAGE =
    `example.invalid/other@sha256:${"5".repeat(64)}`;
  const inconsistentPath = await writeFixture(
    inconsistent.root,
    "inconsistent-plan.json",
    `${JSON.stringify(inconsistent.plan)}\n`
  );
  await expect(
    loadOfflineRebuildPlan({
      planPath: inconsistentPath
    })
  ).rejects.toThrow(
    "OFFLINE_REBUILD_INCONSISTENT_BASE_ARGUMENT"
  );
});

test("blocks a declared optional artifact when its exact identity does not validate", async () => {
  const { root, plan } = await buildSyntheticReadyPlan();
  plan.models[0].exactArtifacts[0].required = false;
  await writeFile(
    join(root, "cache/source.tar"),
    "corrupt-optional-artifact"
  );
  const report = await inspectOfflineRebuildModel({
    modelId: "scout",
    plan,
    repoRoot: root
  });
  expect(report.contextStatus).toBe(
    "BLOCKED_EXACT_INPUT_VALIDATION"
  );
  const outputPath = await newContextPath(
    "invalid-optional"
  );
  await expect(
    prepareOfflineBuildContext({
      modelId: "scout",
      outputPath,
      plan,
      repoRoot: root
    })
  ).rejects.toThrow("OFFLINE_REBUILD_CONTEXT_BLOCKED");
});

test("rejects a cache file reached through an ancestor symlink outside the repository", async () => {
  const { root, plan, sourceBytes } =
    await buildSyntheticReadyPlan();
  const outside = await mkdtemp(
    join(tmpdir(), "retrofi-offline-outside-")
  );
  temporaryDirectories.push(outside);
  await writeFile(join(outside, "source.tar"), sourceBytes);
  await symlink(outside, join(root, "outside-link"));
  plan.models[0].exactArtifacts[0].cachePath =
    "outside-link/source.tar";
  await expect(
    inspectOfflineRebuildModel({
      modelId: "scout",
      plan,
      repoRoot: root
    })
  ).rejects.toThrow("OFFLINE_REBUILD_REALPATH_ESCAPE");
});

test("detects mutation of a prepared context before candidate execution", async () => {
  const { root, plan } = await buildSyntheticReadyPlan();
  const outputPath = await newContextPath(
    "mutated-context"
  );
  const prepared = await prepareOfflineBuildContext({
    modelId: "scout",
    outputPath,
    plan,
    repoRoot: root
  });
  const dockerfilePath = join(outputPath, "Dockerfile");
  await chmod(dockerfilePath, 0o644);
  await writeFile(
    dockerfilePath,
    "FROM scratch\n",
    "utf8"
  );
  await expect(
    verifyPreparedContext({
      contextPath: outputPath,
      contextLock: prepared.contextLock
    })
  ).rejects.toThrow(
    "OFFLINE_REBUILD_FINAL_CONTEXT_MISMATCH"
  );
});

test("verifies a new candidate through a separate receipt without changing historical evidence", async () => {
  const { root, plan } = await buildSyntheticReadyPlan();
  const outputPath = await newContextPath(
    "candidate-receipt"
  );
  const imageId = `sha256:${"6".repeat(64)}`;
  const candidate = await buildOfflineCandidate({
    modelId: "scout",
    outputPath,
    plan,
    repoRoot: root,
    inspectBaseImage: async (reference) => ({
      reference,
      status: "VERIFIED_LOCAL_PINNED_BASE_IMAGE",
      present: true,
      imageId: `sha256:${"7".repeat(64)}`,
      architecture: "arm64",
      os: "linux"
    }),
    inspectBuilder: async () =>
      syntheticBuilderInspection(),
    inspectImage: async (reference) => ({
      status: "VERIFIED_LOCAL_CANDIDATE_IMAGE",
      reference,
      imageId,
      os: "linux",
      architecture: "arm64",
      runtimeUser: "65532:65532",
      entrypoint: ["python"],
      labels: {}
    }),
    runProcess: async () => ({ exitCode: 0 })
  });
  const result = await verifyOfflineCandidateReceipt({
    receiptPath: candidate.receiptPath,
    repoRoot: root,
    inspectImage: async (reference) => ({
      status: "VERIFIED_LOCAL_CANDIDATE_IMAGE",
      reference,
      imageId,
      os: "linux",
      architecture: "arm64",
      runtimeUser: "65532:65532",
      entrypoint: ["python"],
      labels: {}
    }),
    runCandidateVerifier: async () => ({
      status: "PASS",
      verifierSourcePath: "synthetic",
      verifierSha256: "8".repeat(64),
      stdout: "PASS",
      reoptModes: []
    })
  });
  expect(result.verification).toMatchObject({
    status: "PASS_CANDIDATE_NOT_ACCEPTED",
    modelId: "scout",
    candidate: { imageId },
    historicalEvidenceChanged: false
  });
  expect(
    JSON.parse(
      await readFile(result.verificationPath, "utf8")
    )
  ).toEqual(result.verification);

  const tamperedReceipt = JSON.parse(
    await readFile(candidate.receiptPath, "utf8")
  );
  const platformIndex =
    tamperedReceipt.command.indexOf("--platform");
  tamperedReceipt.command[platformIndex + 1] =
    "linux/amd64";
  tamperedReceipt.commandSha256 = sha256(
    `${JSON.stringify(tamperedReceipt.command)}\n`
  );
  await chmod(candidate.receiptPath, 0o644);
  await writeFile(
    candidate.receiptPath,
    `${JSON.stringify(tamperedReceipt, null, 2)}\n`
  );
  await expect(
    verifyOfflineCandidateReceipt({
      receiptPath: candidate.receiptPath,
      repoRoot: root,
      inspectImage: async () => {
        throw new Error("image inspection must not run");
      },
      runCandidateVerifier: async () => {
        throw new Error("candidate verifier must not run");
      }
    })
  ).rejects.toThrow("exact candidate build command");
});
