import {
  mkdir,
  mkdtemp,
  readFile,
  rm,
  symlink,
  writeFile
} from "node:fs/promises";
import { createHash } from "node:crypto";
import { execFile } from "node:child_process";
import { tmpdir } from "node:os";
import { dirname, join } from "node:path";
import { promisify } from "node:util";
import { expect, test } from "vitest";

import {
  DEFAULT_REPO_ROOT,
  buildResearchEcrInventory,
  loadProofReferences,
  parsePipHashLock
} from "../storage/inventory.mjs";
import {
  POST_HOC_REPLAY_EXECUTION_ENVIRONMENT,
  POST_HOC_REPLAY_IMPLEMENTATION_PATHS,
  POST_HOC_REPLAY_RECEIPT_RELATIVE_PATH,
  POST_HOC_REPLAY_SCHEMA_VERSION,
  POST_HOC_REPLAY_SEMANTICS,
  sealPostHocReplayReceipt
} from "../storage/post-hoc-replay.mjs";

const execFileAsync = promisify(execFile);
const BUILD_MANIFEST_PATH =
  "scripts/research/operational-savings/containers/ssc/build-manifest.json";
const LOCAL_IMAGE_ID =
  "sha256:70eb1f134a8ca9342988c3593d51ce08b1c6042847b23bfb7e8c4e15a8f435cc";
const REMOTE_REPOSITORY_URI =
  "945129430686.dkr.ecr.us-east-1.amazonaws.com/retrofi-research-ssc";
const TEST_DOCKERFILE = "FROM scratch\n";
const TEST_VERIFIER = "process.stdout.write('PASS\\n');\n";

function sha256(value) {
  return createHash("sha256").update(value).digest("hex");
}

async function git(repoRoot, args) {
  const result = await execFileAsync(
    "/usr/bin/git",
    ["-C", repoRoot, ...args],
    {
      encoding: "utf8",
      env: {
        PATH: "/usr/bin:/bin",
        LANG: "C",
        LC_ALL: "C",
        GIT_CONFIG_GLOBAL: "/dev/null",
        GIT_CONFIG_NOSYSTEM: "1",
        GIT_CONFIG_SYSTEM: "/dev/null",
        GIT_CONFIG_COUNT: "0",
        GIT_OPTIONAL_LOCKS: "0",
        GIT_TERMINAL_PROMPT: "0"
      }
    }
  );
  return result.stdout.trim();
}

async function copyRepositoryFile(
  sourceRoot,
  destinationRoot,
  repositoryPath
) {
  const bytes = await readFile(
    join(sourceRoot, repositoryPath)
  );
  const destination = join(
    destinationRoot,
    repositoryPath
  );
  await mkdir(dirname(destination), {
    recursive: true
  });
  await writeFile(destination, bytes);
  return bytes;
}

test("strictly parses canonical pip wheel hash locks", () => {
  expect(
    parsePipHashLock(
      [
        "# exact Linux arm64 wheels",
        `Example_Pkg==1.2.3 --hash=sha256:${"a".repeat(64)}`,
        `second-pkg==4.5 --hash=sha256:${"b".repeat(64)}`,
        ""
      ].join("\n")
    )
  ).toEqual([
    {
      name: "example-pkg",
      requirement: "Example_Pkg==1.2.3",
      version: "1.2.3",
      sha256: "a".repeat(64)
    },
    {
      name: "second-pkg",
      requirement: "second-pkg==4.5",
      version: "4.5",
      sha256: "b".repeat(64)
    }
  ]);
  for (const invalid of [
    `example==1 --hash=sha256:${"A".repeat(64)}`,
    "example==1",
    "example @ https://example.test/example.whl",
    `example==1 --hash=sha512:${"a".repeat(64)}`
  ]) {
    expect(() => parsePipHashLock(invalid)).toThrow(
      /BUILD_DEPENDENCY_LOCK_LINE_INVALID/
    );
  }
  expect(() =>
    parsePipHashLock(
      Buffer.from([0xc3, 0x28])
    )
  ).toThrow(/BUILD_DEPENDENCY_LOCK_UTF8_INVALID/);
  expect(() =>
    parsePipHashLock(
      [
        `example_pkg==1 --hash=sha256:${"a".repeat(64)}`,
        `example-pkg==2 --hash=sha256:${"b".repeat(64)}`
      ].join("\n")
    )
  ).toThrow(/BUILD_DEPENDENCY_LOCK_PACKAGE_SET_INVALID/);
});

function verifiedBuildManifest(overrides = {}) {
  const hasEcrPublication =
    Object.hasOwn(overrides, "ecr") &&
    overrides.ecr !== null;
  return {
    schemaVersion: 1,
    buildContextProvenance: {
      status: "UNCOMMITTED_HISTORICAL_BUILD_CONTEXT",
      historicalRepositoryCommit: null,
      contentIdentityStatus: "POST_HOC_EXACT_FILE_HASHES",
      recordedImageBuildContextAttested: false,
      note:
        "Synthetic historical context with exact post-hoc file hashes."
    },
    source: {
      repository: "https://github.com/NatLabRockies/ssc.git",
      commit: "ba7a7968a115baa0c250597ce2381c7ffb27fbf2",
      archiveSha256: "1".repeat(64),
      sourceOrganization:
        "National Laboratory of the Rockies",
      role: "EXACT_CONTAINER_SOURCE_ARCHIVE",
      official: true,
      sscApiVersion: 308,
      samPackageVersion: "2026.7.3",
      license: {
        spdxId: "BSD-3-Clause",
        file: "/opt/ssc/LICENSE",
        fileSha256: "2".repeat(64)
      }
    },
    image: {
      repositoryTag:
        "retrofit-research-ssc:ssc-308-ba7a7968-arm64",
      targetPlatform: "linux/arm64",
      localImageId: LOCAL_IMAGE_ID,
      localRepoDigests: [
        `retrofit-research-ssc@${LOCAL_IMAGE_ID}`
      ]
    },
    runtime: {
      verificationCommand:
        "node scripts/research/operational-savings/containers/ssc/verify.mjs"
    },
    build: {
      status: hasEcrPublication
        ? "COMPLETED_AND_EXACT_IMAGE_VERIFIED"
        : "COMPLETED_AND_LOCAL_IMAGE_VERIFIED",
      builtAt: "2026-07-24T18:53:21.863952004Z",
      builtAtEvidence: {
        kind: "LOCAL_IMAGE_CONFIG_CREATED",
        imageId: LOCAL_IMAGE_ID,
        inspectionField: ".Created"
      },
      historicalInvocationCaptured: false,
      commandSemantics:
        "Source-controlled reproduction command, not a retained historical shell invocation.",
      reproductionCommand:
        "docker buildx build --platform linux/arm64 --load --tag retrofit-research-ssc:ssc-308-ba7a7968-arm64 --build-arg SSC_COMMIT=test scripts/research/operational-savings/containers/ssc",
      arguments: {
        SSC_COMMIT: "test"
      },
      statusEvidence: {
        localImageId: LOCAL_IMAGE_ID,
        ecrImageDigest: hasEcrPublication
          ? overrides.ecr.imageDigest
          : null,
        runtimeVerificationStatus: "PASS"
      }
    },
    verification: {
      status: "PASS",
      verifiedAt: "2026-07-24T18:53:33Z",
      architecture: "linux/arm64",
      fixtureHashesVerified: true,
      licenseHashVerified: true
    },
    buildInputs: [
      {
        path: "Dockerfile",
        sha256: sha256(TEST_DOCKERFILE)
      }
    ],
    verificationInputs: [
      {
        path: "verify.mjs",
        sha256: sha256(TEST_VERIFIER)
      }
    ],
    ...overrides
  };
}

function verifiedEcrPublication() {
  return {
    accountId: "945129430686",
    region: "us-east-1",
    repositoryName: "retrofi-research-ssc",
    repositoryUri: REMOTE_REPOSITORY_URI,
    imageTag: "ssc-308-ba7a7968-arm64",
    imageDigest: LOCAL_IMAGE_ID,
    imageUri: `${REMOTE_REPOSITORY_URI}@${LOCAL_IMAGE_ID}`,
    pushedAt: "2026-07-24T19:05:21.417Z",
    imageSizeBytes: 71498334,
    imageManifestMediaType:
      "application/vnd.oci.image.index.v1+json",
    verificationStatus: "VERIFIED_EXACT_DIGEST",
    verifiedAt: "2026-07-24T19:20:00.000Z",
    exactDigestPulled: true,
    runtimeVerificationStatus: "PASS",
    verificationCommand:
      "docker pull 945129430686.dkr.ecr.us-east-1.amazonaws.com/retrofi-research-ssc@sha256:70eb1f134a8ca9342988c3593d51ce08b1c6042847b23bfb7e8c4e15a8f435cc",
    scan: {
      status: "COMPLETE",
      completedAt: "2026-07-24T19:05:30.000Z",
      scannedManifestDigest: `sha256:${"3".repeat(64)}`,
      critical: 0,
      high: 0,
      medium: 9,
      low: 0,
      disposition:
        "Research-only image with hardened runtime controls."
    }
  };
}

test("keeps exactly one top-level ECR record in every research build manifest", async () => {
  for (const modelId of ["reopt", "ssc", "measur", "scout"]) {
    const source = await readFile(
      new URL(
        `../containers/${modelId}/build-manifest.json`,
        import.meta.url
      ),
      "utf8"
    );
    expect(source.match(/^  "ecr"\s*:/gm) ?? []).toHaveLength(
      1
    );
    const manifest = JSON.parse(source);
    expect(manifest.ecr.imageDigest).toBe(
      manifest.image.localImageId
    );
    expect(manifest.image.localRepoDigests).toContain(
      `${manifest.image.repositoryTag.split(":")[0]}@${manifest.ecr.imageDigest}`
    );
    expect(manifest.build).toMatchObject({
      status: "COMPLETED_AND_EXACT_IMAGE_VERIFIED",
      builtAt: expect.stringMatching(/Z$/),
      builtAtEvidence: {
        kind: "LOCAL_IMAGE_CONFIG_CREATED",
        imageId: manifest.image.localImageId,
        inspectionField: ".Created"
      },
      historicalInvocationCaptured: expect.any(Boolean),
      commandSemantics: expect.any(String),
      reproductionCommand: expect.any(String),
      statusEvidence: {
        localImageId: manifest.image.localImageId,
        ecrImageDigest: manifest.ecr.imageDigest,
        runtimeVerificationStatus: "PASS"
      }
    });
    expect(
      Object.keys(manifest.build.arguments).length
    ).toBeGreaterThan(0);
    expect(manifest.buildContextProvenance).toEqual({
      status: "UNCOMMITTED_HISTORICAL_BUILD_CONTEXT",
      historicalRepositoryCommit: null,
      contentIdentityStatus: "POST_HOC_EXACT_FILE_HASHES",
      recordedImageBuildContextAttested: false,
      note: expect.any(String)
    });
    expect(manifest.buildInputs.length).toBeGreaterThan(0);
    expect(
      manifest.verificationInputs.length
    ).toBeGreaterThan(0);
  }
});

test("content-verifies every current build and verification context without overstating historical provenance", async () => {
  const inventory = await buildResearchEcrInventory();
  expect(inventory.repositories).toHaveLength(4);
  for (const repository of inventory.repositories) {
    expect(repository.buildManifest).toMatchObject({
      status: "VERIFIED",
      buildEvidence: {
        buildContextProvenance: {
          status:
            "UNCOMMITTED_HISTORICAL_BUILD_CONTEXT",
          historicalRepositoryCommit: null,
          contentIdentityStatus:
            "POST_HOC_EXACT_FILE_HASHES",
          recordedImageBuildContextAttested: false
        },
        contentBinding: {
          status: "VERIFIED_EXACT_LOCAL_CONTENT",
          buildInputSetSha256:
            expect.stringMatching(/^[a-f0-9]{64}$/),
          verificationInputSetSha256:
            expect.stringMatching(/^[a-f0-9]{64}$/),
          completeInputSetSha256:
            expect.stringMatching(/^[a-f0-9]{64}$/)
        }
      }
    });
    expect(
      repository.buildManifest.buildEvidence.contentBinding
        .buildInputs.length
    ).toBeGreaterThan(0);
    expect(
      repository.buildManifest.buildEvidence.contentBinding
        .verificationInputs.length
    ).toBeGreaterThan(0);
  }
  const scout = inventory.repositories.find(
    (repository) => repository.modelId === "scout"
  );
  expect(
    scout.buildManifest.buildEvidence.dependencyLockEvidence
  ).toMatchObject({
    status: "VERIFIED_EXACT_PIP_HASH_LOCK",
    lockFormat:
      "pip-require-hashes-linux-arm64-wheels",
    path: "requirements.lock",
    packageCount: 34,
    lockedArtifactSetSha256:
      expect.stringMatching(/^[a-f0-9]{64}$/)
  });
  expect(
    scout.buildManifest.buildEvidence.dependencyLockEvidence
      .lockedArtifacts
  ).toHaveLength(34);
});

test("promotes only a committed four-model receipt bound to the exact current Git context", async () => {
  const sourceInventory =
    await buildResearchEcrInventory();
  const repoRoot = await mkdtemp(
    join(tmpdir(), "retrofi-ecr-replay-inventory-")
  );
  try {
    const repositoryPaths = new Set(
      POST_HOC_REPLAY_IMPLEMENTATION_PATHS
    );
    for (const repository of
      sourceInventory.repositories) {
      repositoryPaths.add(
        repository.buildManifest.path
      );
      const contentBinding =
        repository.buildManifest.buildEvidence
          .contentBinding;
      for (const input of [
        ...contentBinding.buildInputs,
        ...contentBinding.verificationInputs
      ]) {
        repositoryPaths.add(input.repositoryPath);
      }
    }
    const fileBytes = new Map();
    for (const repositoryPath of repositoryPaths) {
      fileBytes.set(
        repositoryPath,
        await copyRepositoryFile(
          DEFAULT_REPO_ROOT,
          repoRoot,
          repositoryPath
        )
      );
    }
    await git(repoRoot, ["init", "--quiet"]);
    await git(repoRoot, [
      "config",
      "user.name",
      "Replay Inventory Test"
    ]);
    await git(repoRoot, [
      "config",
      "user.email",
      "replay-inventory@example.test"
    ]);
    await git(repoRoot, ["add", "--all"]);
    await git(repoRoot, [
      "-c",
      "commit.gpgsign=false",
      "commit",
      "--quiet",
      "-m",
      "freeze exact replay source"
    ]);

    const pending =
      await buildResearchEcrInventory({
        repoRoot
      });
    expect(pending).toMatchObject({
      historicalBuildManifestPassCount: 4,
      locallyVerifiedImageCount: 0,
      postHocReplayReceipt: {
        status: "PENDING"
      }
    });
    const [contextGitCommit, contextGitTree] =
      await Promise.all([
        git(repoRoot, ["rev-parse", "HEAD"]),
        git(repoRoot, [
          "rev-parse",
          "HEAD^{tree}"
        ])
      ]);
    const receipt = sealPostHocReplayReceipt({
      schemaVersion:
        POST_HOC_REPLAY_SCHEMA_VERSION,
      status: "PASS_COMMITTED_POST_HOC_REPLAY",
      semantics: POST_HOC_REPLAY_SEMANTICS,
      executionEnvironment:
        POST_HOC_REPLAY_EXECUTION_ENVIRONMENT,
      contextGitCommit,
      contextGitTree,
      createdAt: "2026-07-24T22:30:00.000Z",
      implementationFiles:
        POST_HOC_REPLAY_IMPLEMENTATION_PATHS.map(
          (path) => ({
            path,
            sha256: sha256(fileBytes.get(path))
          })
        ),
      models: pending.repositories.map(
        (repository, index) => {
          const contentBinding =
            repository.buildManifest.buildEvidence
              .contentBinding;
          const verifierPath =
            repository.localImage
              .verificationCommand.slice(5);
          const verifier =
            contentBinding.verificationInputs.find(
              (input) =>
                input.repositoryPath === verifierPath
            );
          return {
            modelId: repository.modelId,
            buildManifestPath:
              repository.buildManifest.path,
            buildManifestSha256:
              repository.buildManifest.sha256,
            completeInputSetSha256:
              contentBinding.completeInputSetSha256,
            imageId: repository.localImage.imageId,
            imageDigest:
              repository.remoteImage.imageDigest,
            sourceCommit:
              repository.provenance.sourceCommit,
            verifierPath,
            verifierSha256: verifier.sha256,
            exitCode: 0,
            stdoutSha256: sha256(
              `${repository.modelId} PASS\n`
            ),
            stdoutSizeBytes: Buffer.byteLength(
              `${repository.modelId} PASS\n`
            ),
            stderrSha256: sha256(""),
            stderrSizeBytes: 0,
            replayedAt:
              `2026-07-24T22:30:0${index}.000Z`,
            replayKind:
              POST_HOC_REPLAY_SEMANTICS.replayKind,
            historicalBuildContext:
              POST_HOC_REPLAY_SEMANTICS
                .historicalBuildContext
          };
        }
      )
    });
    await mkdir(
      dirname(
        join(
          repoRoot,
          POST_HOC_REPLAY_RECEIPT_RELATIVE_PATH
        )
      ),
      { recursive: true }
    );
    await writeFile(
      join(
        repoRoot,
        POST_HOC_REPLAY_RECEIPT_RELATIVE_PATH
      ),
      `${JSON.stringify(receipt, null, 2)}\n`,
      "utf8"
    );
    await git(repoRoot, [
      "add",
      POST_HOC_REPLAY_RECEIPT_RELATIVE_PATH
    ]);
    await git(repoRoot, [
      "-c",
      "commit.gpgsign=false",
      "commit",
      "--quiet",
      "-m",
      "commit exact replay receipt"
    ]);

    const verified =
      await buildResearchEcrInventory({
        repoRoot
      });
    expect(verified).toMatchObject({
      historicalBuildManifestPassCount: 4,
      locallyVerifiedImageCount: 4,
      runnableContainerBuilt: true,
      postHocReplayReceipt: {
        status:
          "PASS_COMMITTED_POST_HOC_REPLAY",
        blocker: null
      }
    });
    expect(
      verified.repositories.every(
        (repository) =>
          repository.localImage
            .verificationStatus ===
          "PASS_COMMITTED_POST_HOC_REPLAY"
      )
    ).toBe(true);

    await writeFile(
      join(
        repoRoot,
        POST_HOC_REPLAY_IMPLEMENTATION_PATHS[1]
      ),
      "mutated after receipt\n",
      "utf8"
    );
    const invalid =
      await buildResearchEcrInventory({
        repoRoot
      });
    expect(invalid).toMatchObject({
      locallyVerifiedImageCount: 0,
      postHocReplayReceipt: {
        status: "INVALID",
        blocker: expect.stringContaining(
          "POST_HOC_REPLAY_COMMIT_FILE_MISMATCH"
        )
      }
    });
  } finally {
    await rm(repoRoot, {
      recursive: true,
      force: true
    });
  }
}, 30_000);

async function withBuildManifest(
  manifest,
  callback,
  { setup = null } = {}
) {
  const repoRoot = await mkdtemp(
    join(tmpdir(), "retrofi-ecr-inventory-")
  );
  try {
    await mkdir(
      join(
        repoRoot,
        "scripts/research/operational-savings/adapters"
      ),
      { recursive: true }
    );
    const supplementPath = join(
      repoRoot,
      "docs/operational-savings-automation-research/research-artifact-metadata-supplement.v1.json"
    );
    await mkdir(dirname(supplementPath), { recursive: true });
    await writeFile(
      supplementPath,
      `${JSON.stringify(
        {
          schemaVersion:
            "operational-savings/research-artifact-metadata-supplement-v1",
          artifacts: []
        },
        null,
        2
      )}\n`,
      "utf8"
    );
    if (manifest !== null) {
      const path = join(repoRoot, BUILD_MANIFEST_PATH);
      await mkdir(dirname(path), { recursive: true });
      await writeFile(
        join(dirname(path), "Dockerfile"),
        TEST_DOCKERFILE,
        "utf8"
      );
      await writeFile(
        join(dirname(path), "verify.mjs"),
        TEST_VERIFIER,
        "utf8"
      );
      await writeFile(
        path,
        `${JSON.stringify(manifest, null, 2)}\n`,
        "utf8"
      );
      await setup?.({
        containerDirectory: dirname(path),
        repoRoot
      });
    }
    await callback(
      await buildResearchEcrInventory({ repoRoot }),
      repoRoot
    );
  } finally {
    await rm(repoRoot, { recursive: true, force: true });
  }
}

test("records but does not promote a historical SSC PASS without a committed replay receipt", async () => {
  await withBuildManifest(verifiedBuildManifest(), (ecr) => {
    expect(ecr).toMatchObject({
      historicalBuildManifestPassCount: 1,
      locallyVerifiedImageCount: 0,
      remotelyVerifiedImageCount: 0,
      runnableContainerBuilt: false,
      postHocReplayReceipt: {
        status: "PENDING"
      },
      localImagePresenceCheckedByInventory: false,
      remoteStateCheckedByInventory: false
    });
    const ssc = ecr.repositories.find(
      (entry) => entry.modelId === "ssc"
    );
    expect(ssc).toMatchObject({
      repositoryName: "retrofi-research-ssc",
      expectedRepositoryUri: REMOTE_REPOSITORY_URI,
      buildManifest: {
        path: BUILD_MANIFEST_PATH,
        status: "VERIFIED",
        sha256: expect.stringMatching(/^[a-f0-9]{64}$/),
        schemaVersion: 1,
        buildEvidence: {
          status: "COMPLETED_AND_LOCAL_IMAGE_VERIFIED",
          builtAtEvidence: {
            kind: "LOCAL_IMAGE_CONFIG_CREATED",
            imageId: LOCAL_IMAGE_ID,
            inspectionField: ".Created"
          },
          arguments: {
            SSC_COMMIT: "test"
          },
          buildContextProvenance: {
            status:
              "UNCOMMITTED_HISTORICAL_BUILD_CONTEXT",
            recordedImageBuildContextAttested: false
          },
          contentBinding: {
            status: "VERIFIED_EXACT_LOCAL_CONTENT",
            buildInputSetSha256:
              expect.stringMatching(/^[a-f0-9]{64}$/),
            verificationInputSetSha256:
              expect.stringMatching(/^[a-f0-9]{64}$/),
            completeInputSetSha256:
              expect.stringMatching(/^[a-f0-9]{64}$/)
          }
        }
      },
      provenance: {
        sourceRepository:
          "https://github.com/NatLabRockies/ssc.git",
        sourceCommit:
          "ba7a7968a115baa0c250597ce2381c7ffb27fbf2",
        sourceRelease: "2026.7.3",
        modelVersion: "2026.7.3",
        purpose: expect.stringContaining("SSC"),
        sourceOrganization:
          "National Laboratory of the Rockies",
        sourceArchiveSha256: "1".repeat(64),
        buildManifestSha256:
          expect.stringMatching(/^[a-f0-9]{64}$/),
        license: {
          identifier: "BSD-3-Clause",
          sha256: "2".repeat(64),
          status: "RECORDED_AND_HASH_VERIFIED",
          attributionStatus:
            "SOURCE_ORGANIZATION_AND_LICENSE_RECORDED"
        }
      },
      localImage: {
        repositoryTag:
          "retrofit-research-ssc:ssc-308-ba7a7968-arm64",
        imageTag: "ssc-308-ba7a7968-arm64",
        imageId: LOCAL_IMAGE_ID,
        targetPlatform: "linux/arm64",
        verifiedAt: "2026-07-24T18:53:33Z",
        verificationStatus:
          "HISTORICAL_PASS_RECORDED_CURRENT_CONTEXT_UNATTESTED",
        currentDaemonPresenceCheckedByInventory: false
      },
      plannedRemoteImage: {
        repositoryUri: REMOTE_REPOSITORY_URI,
        imageTag: "ssc-308-ba7a7968-arm64",
        taggedImageUri:
          `${REMOTE_REPOSITORY_URI}:ssc-308-ba7a7968-arm64`
      },
      remoteImage: {
        repositoryUri: null,
        imageTag: null,
        imageDigest: null,
        pushStatus: "NOT_RECORDED",
        verificationStatus: "NOT_RECORDED"
      }
    });
  });
});

test("fails closed on mismatched, escaping, or symlinked build evidence inputs", async () => {
  const mismatched = verifiedBuildManifest();
  mismatched.buildInputs[0].sha256 = "f".repeat(64);
  await withBuildManifest(mismatched, (ecr) => {
    const ssc = ecr.repositories.find(
      (entry) => entry.modelId === "ssc"
    );
    expect(ssc.buildManifest.status).toBe("INVALID");
    expect(ssc.blocker).toContain(
      "buildInputs[0].sha256 does not match"
    );
  });

  const escaping = verifiedBuildManifest();
  escaping.buildInputs[0] = {
    path: "../../../../outside",
    sha256: sha256(TEST_DOCKERFILE)
  };
  await withBuildManifest(escaping, (ecr) => {
    const ssc = ecr.repositories.find(
      (entry) => entry.modelId === "ssc"
    );
    expect(ssc.buildManifest.status).toBe("INVALID");
    expect(ssc.blocker).toContain(
      "BUILD_INPUT_PATH_OUTSIDE_RESEARCH_ROOT"
    );
  });

  await withBuildManifest(
    verifiedBuildManifest(),
    (ecr) => {
      const ssc = ecr.repositories.find(
        (entry) => entry.modelId === "ssc"
      );
      expect(ssc.buildManifest.status).toBe("INVALID");
      expect(ssc.blocker).toContain(
        "BUILD_INPUT_SYMLINK_REJECTED"
      );
    },
    {
      setup: async ({ containerDirectory }) => {
        const verifierPath = join(
          containerDirectory,
          "verify.mjs"
        );
        const targetPath = join(
          containerDirectory,
          "verify-target.mjs"
        );
        await writeFile(
          targetPath,
          TEST_VERIFIER,
          "utf8"
        );
        await rm(verifierPath);
        await symlink("verify-target.mjs", verifierPath);
      }
    }
  );
});

test("requires every retained proof artifact to be an exact verification input", async () => {
  const manifest = verifiedBuildManifest({
    proofRuns: [
      {
        mode: "synthetic",
        evidencePath: "verify.mjs",
        evidenceSha256: "f".repeat(64)
      }
    ]
  });
  await withBuildManifest(manifest, (ecr) => {
    const ssc = ecr.repositories.find(
      (entry) => entry.modelId === "ssc"
    );
    expect(ssc.buildManifest.status).toBe("INVALID");
    expect(ssc.blocker).toContain(
      "verificationInputs must content-bind proofRuns[0] evidence verify.mjs"
    );
  });
});

test("keeps absent and unverified build manifests out of runnable-image counts", async () => {
  await withBuildManifest(null, (ecr) => {
    expect(ecr).toMatchObject({
      locallyVerifiedImageCount: 0,
      remotelyVerifiedImageCount: 0,
      runnableContainerBuilt: false
    });
    expect(
      ecr.repositories.every(
        (entry) =>
          entry.buildManifest.status === "NOT_FOUND" &&
          entry.localImage.verificationStatus ===
            "NO_BUILD_MANIFEST"
      )
    ).toBe(true);
  });

  await withBuildManifest(
    verifiedBuildManifest({
      ecr: verifiedEcrPublication(),
      verification: {
        status: "FAILED",
        verifiedAt: "2026-07-24T18:53:33Z",
        architecture: "linux/arm64",
        fixtureHashesVerified: true,
        licenseHashVerified: true
      }
    }),
    (ecr) => {
      expect(ecr).toMatchObject({
        locallyVerifiedImageCount: 0,
        remotelyVerifiedImageCount: 0,
        runnableContainerBuilt: false
      });
      expect(
        ecr.repositories.find((entry) => entry.modelId === "ssc")
      ).toMatchObject({
        buildManifest: {
          status: "UNVERIFIED"
        },
        localImage: {
          verificationStatus: "BUILD_MANIFEST_UNVERIFIED"
        },
        remoteImage: {
          repositoryUri: null,
          imageDigest: null,
          verificationStatus: "NOT_RECORDED"
        }
      });
    }
  );
});

test("rejects a remote claim outside the exact research ECR destination", async () => {
  const wrongRepositoryUri =
    "059310317821.dkr.ecr.us-east-1.amazonaws.com/retrofi-research-ssc";
  await withBuildManifest(
    verifiedBuildManifest({
      ecr: {
        ...verifiedEcrPublication(),
        accountId: "059310317821",
        repositoryUri: wrongRepositoryUri,
        imageUri: `${wrongRepositoryUri}@${LOCAL_IMAGE_ID}`
      }
    }),
    (ecr) => {
      const ssc = ecr.repositories.find(
        (entry) => entry.modelId === "ssc"
      );
      expect(ecr.remotelyVerifiedImageCount).toBe(0);
      expect(ssc.remoteImage).toMatchObject({
        repositoryUri: null,
        imageTag: null,
        imageDigest: null,
        pushedAt: null,
        pushStatus: "INVALID_PUBLICATION_RECORD",
        verificationStatus: "INVALID_PUBLICATION_RECORD",
        verifiedByInventoryAwsCall: false
      });
    }
  );
});

test("rejects an ECR publication digest that does not identify the verified local image", async () => {
  const mismatchedDigest = `sha256:${"b".repeat(64)}`;
  await withBuildManifest(
    verifiedBuildManifest({
      ecr: {
        ...verifiedEcrPublication(),
        imageDigest: mismatchedDigest,
        imageUri: `${REMOTE_REPOSITORY_URI}@${mismatchedDigest}`
      }
    }),
    (ecr) => {
      const ssc = ecr.repositories.find(
        (entry) => entry.modelId === "ssc"
      );
      expect(ecr.remotelyVerifiedImageCount).toBe(0);
      expect(ssc.remoteImage).toMatchObject({
        pushStatus: "INVALID_PUBLICATION_RECORD",
        verificationStatus: "INVALID_PUBLICATION_RECORD"
      });
    }
  );
});

test("rejects an OCI index scan that records the parent index instead of a distinct executable child", async () => {
  const publication = verifiedEcrPublication();
  publication.scan.scannedManifestDigest =
    publication.imageDigest;
  await withBuildManifest(
    verifiedBuildManifest({
      ecr: publication,
      build: {
        ...verifiedBuildManifest().build,
        status: "COMPLETED_AND_EXACT_IMAGE_VERIFIED",
        statusEvidence: {
          localImageId: LOCAL_IMAGE_ID,
          ecrImageDigest: LOCAL_IMAGE_ID,
          runtimeVerificationStatus: "PASS"
        }
      }
    }),
    (ecr) => {
      const ssc = ecr.repositories.find(
        (entry) => entry.modelId === "ssc"
      );
      expect(ecr.remotelyVerifiedImageCount).toBe(0);
      expect(ssc.remoteImage).toMatchObject({
        pushStatus: "INVALID_PUBLICATION_RECORD",
        verificationStatus: "INVALID_PUBLICATION_RECORD"
      });
    }
  );
});

test("rejects passing build manifests without grounded build reproduction evidence", async () => {
  for (const build of [
    null,
    {
      status: "COMPLETED_AND_EXACT_IMAGE_VERIFIED",
      builtAt: "2026-07-24T18:53:21.863952004Z",
      builtAtEvidence: {
        kind: "MANUALLY_ENTERED",
        imageId: LOCAL_IMAGE_ID,
        inspectionField: ".Created"
      },
      historicalInvocationCaptured: false,
      commandSemantics: "Test",
      reproductionCommand: "docker build .",
      arguments: { SSC_COMMIT: "test" },
      statusEvidence: {
        localImageId: LOCAL_IMAGE_ID,
        ecrImageDigest: LOCAL_IMAGE_ID,
        runtimeVerificationStatus: "PASS"
      }
    }
  ]) {
    await withBuildManifest(
      verifiedBuildManifest({ build }),
      (ecr) => {
        const ssc = ecr.repositories.find(
          (entry) => entry.modelId === "ssc"
        );
        expect(ssc.buildManifest.status).toBe("INVALID");
        expect(ssc.buildManifest.buildEvidence).toBeNull();
        expect(ssc.blocker).toContain(
          "build."
        );
      }
    );
  }
});

test("rejects a false historical build-context attestation", async () => {
  const manifest = verifiedBuildManifest();
  manifest.buildContextProvenance
    .recordedImageBuildContextAttested = true;
  await withBuildManifest(manifest, (ecr) => {
    const ssc = ecr.repositories.find(
      (entry) => entry.modelId === "ssc"
    );
    expect(ssc.buildManifest.status).toBe("INVALID");
    expect(ssc.blocker).toContain(
      "must not attest that an uncommitted historical context produced the recorded image"
    );
  });
});

test("rejects passing build manifests with incomplete source or license provenance", async () => {
  const cases = [
    (manifest) => {
      delete manifest.source.repository;
    },
    (manifest) => {
      delete manifest.source.commit;
    },
    (manifest) => {
      delete manifest.source.license;
    },
    (manifest) => {
      delete manifest.source.sourceOrganization;
    }
  ];
  for (const mutate of cases) {
    const manifest = verifiedBuildManifest();
    mutate(manifest);
    await withBuildManifest(manifest, (ecr) => {
      const ssc = ecr.repositories.find(
        (entry) => entry.modelId === "ssc"
      );
      expect(ssc.buildManifest.status).toBe("INVALID");
      expect(ssc.provenance).toBeNull();
      expect(ssc.blocker).toContain("source.");
    });
  }
});

test("carries a complete exact-digest ECR verification record without claiming a new AWS check", async () => {
  const ecrPublication = verifiedEcrPublication();
  await withBuildManifest(
    verifiedBuildManifest({
      ecr: ecrPublication,
      build: {
        ...verifiedBuildManifest().build,
        status: "COMPLETED_AND_EXACT_IMAGE_VERIFIED",
        statusEvidence: {
          localImageId: LOCAL_IMAGE_ID,
          ecrImageDigest: LOCAL_IMAGE_ID,
          runtimeVerificationStatus: "PASS"
        }
      }
    }),
    (ecr) => {
      expect(ecr).toMatchObject({
        historicalBuildManifestPassCount: 1,
        locallyVerifiedImageCount: 0,
        remotelyVerifiedImageCount: 1,
        postHocReplayReceipt: {
          status: "PENDING"
        },
        remoteStateCheckedByInventory: false
      });
      expect(
        ecr.repositories.find((entry) => entry.modelId === "ssc")
          .remoteImage
      ).toEqual({
        ...ecrPublication,
        pushStatus: "PUSHED",
        evidenceSource: BUILD_MANIFEST_PATH,
        verifiedByInventoryAwsCall: false
      });
    }
  );
});

test("collects pinned cache-backed dependencies from a verified container build manifest", async () => {
  const archiveSha256 =
    "2f731a156cd9e4123d1433dec51a22ba74702d349457fe76c65bba0f1f7958e0";
  const cachePath =
    "scripts/research/operational-savings/.cache/artifacts/or-tools_aarch64_AlmaLinux-8.10_cpp_v9.14.6206.tar.gz";
  await withBuildManifest(
    verifiedBuildManifest({
      dependencies: {
        orTools: {
          repository: "https://github.com/google/or-tools.git",
          version: "9.14.6206",
          archiveUrl:
            "https://github.com/google/or-tools/releases/download/v9.14/or-tools_aarch64_AlmaLinux-8.10_cpp_v9.14.6206.tar.gz",
          archiveSha256,
          archiveSizeBytes: 53631276,
          cachePath,
          license: {
            spdxId: "Apache-2.0",
            archivePath: "share/doc/ortools/LICENSE",
            sha256:
              "cfc7749b96f63bd31c3c42b5c471bf756814053e847c10f3eb003417bc523d30"
          }
        }
      }
    }),
    async (_ecr, repoRoot) => {
      const references = await loadProofReferences(repoRoot);
      expect(
        references.find((entry) => entry.path === cachePath)
      ).toEqual({
        path: cachePath,
        standardId: null,
        processKey: null,
        manifestPath: BUILD_MANIFEST_PATH,
        adapterPath: null,
        artifactId:
          "container-build:ssc:or-tools_aarch64_AlmaLinux-8.10_cpp_v9.14.6206.tar.gz",
        sourceUrl:
          "https://github.com/google/or-tools/releases/download/v9.14/or-tools_aarch64_AlmaLinux-8.10_cpp_v9.14.6206.tar.gz",
        release: "9.14.6206",
        commitSha: null,
        acquisitionMode:
          "PINNED_VERIFIED_CONTAINER_BUILD_DEPENDENCY",
        acquisitionTimestamp: null,
        sourceOrganization: "Google",
        declaredSha256: archiveSha256,
        declaredSizeBytes: 53631276,
        licenseContext:
          "SPDX Apache-2.0; archive path share/doc/ortools/LICENSE; SHA-256 cfc7749b96f63bd31c3c42b5c471bf756814053e847c10f3eb003417bc523d30",
        role: "CONTAINER_BUILD_DEPENDENCY",
        field: null,
        official: true
      });
    }
  );
});
