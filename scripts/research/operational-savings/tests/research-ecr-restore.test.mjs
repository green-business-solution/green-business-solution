import { execFile } from "node:child_process";
import { createHash } from "node:crypto";
import {
  mkdir,
  mkdtemp,
  rm,
  writeFile
} from "node:fs/promises";
import { tmpdir } from "node:os";
import { dirname, join } from "node:path";
import { promisify } from "node:util";

import {
  afterAll,
  beforeAll,
  expect,
  test,
  vi
} from "vitest";

import {
  RESEARCH_AWS_ACCOUNT_ID,
  RESEARCH_AWS_PROFILE,
  RESEARCH_AWS_REGION,
  RESEARCH_S3_BUCKET,
  planEcrImageRestore,
  recordEcrRestoreReplay,
  restoreAndReplayEcrImages
} from "../storage/aws-guard.mjs";
import { sha256CanonicalJson } from "../storage/inventory.mjs";
import {
  assertCurrentEcrRestoreReceipt,
  assertEcrBuildEvidence,
  ecrEvidenceDigest
} from "../storage/ecr-evidence.mjs";
import {
  POST_HOC_REPLAY_EXECUTION_ENVIRONMENT,
  POST_HOC_REPLAY_IMPLEMENTATION_PATHS,
  POST_HOC_REPLAY_RECEIPT_RELATIVE_PATH,
  POST_HOC_REPLAY_SCHEMA_VERSION,
  POST_HOC_REPLAY_SEMANTICS,
  sealPostHocReplayReceipt
} from "../storage/post-hoc-replay.mjs";

const destination = Object.freeze({
  profile: RESEARCH_AWS_PROFILE,
  bucket: RESEARCH_S3_BUCKET,
  region: RESEARCH_AWS_REGION
});
const execFileAsync = promisify(execFile);
let liveReplayRepoRoot;
let liveReplayContext;

function sha256(value) {
  return createHash("sha256")
    .update(value)
    .digest("hex");
}

function fixtureBoundFileBytes(repositoryPath) {
  return Buffer.from(
    `live replay fixture: ${repositoryPath}\n`
  );
}

function fixtureBoundFileSha256(repositoryPath) {
  return sha256(
    fixtureBoundFileBytes(repositoryPath)
  );
}

async function writeFixtureBoundFile(
  repoRoot,
  repositoryPath
) {
  const absolutePath = join(
    repoRoot,
    repositoryPath
  );
  await mkdir(dirname(absolutePath), {
    recursive: true
  });
  await writeFile(
    absolutePath,
    fixtureBoundFileBytes(repositoryPath)
  );
}

async function fixtureGit(repoRoot, args) {
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
const modelSpecs = Object.freeze([
  Object.freeze({
    modelId: "reopt",
    repositoryName: "retrofi-research-reopt",
    imageId: `sha256:${"a".repeat(64)}`,
    verifierRelativePaths: Object.freeze([
      "scripts/research/operational-savings/containers/reopt/verify.mjs",
      "scripts/research/operational-savings/containers/reopt/verify-solar-storage.mjs"
    ])
  }),
  Object.freeze({
    modelId: "ssc",
    repositoryName: "retrofi-research-ssc",
    imageId: `sha256:${"b".repeat(64)}`,
    verifierRelativePaths: Object.freeze([
      "scripts/research/operational-savings/containers/ssc/verify.mjs"
    ])
  }),
  Object.freeze({
    modelId: "measur",
    repositoryName: "retrofi-research-measur",
    imageId: `sha256:${"c".repeat(64)}`,
    verifierRelativePaths: Object.freeze([
      "scripts/research/operational-savings/containers/measur/verify.mjs"
    ])
  }),
  Object.freeze({
    modelId: "scout",
    repositoryName: "retrofi-research-scout",
    imageId: `sha256:${"d".repeat(64)}`,
    verifierRelativePaths: Object.freeze([
      "scripts/research/operational-savings/containers/scout/verify.mjs"
    ])
  })
]);
const fixtureModelSources = Object.freeze({
  reopt: Object.freeze({
    repositoryName: "reopt",
    sourceRepository: "https://github.com/example/reopt",
    sourceCommitArgument: "REOPT_COMMIT",
    sourceArchiveArgument: "REOPT_ARCHIVE_SHA256"
  }),
  ssc: Object.freeze({
    repositoryName: "ssc",
    sourceRepository: "https://github.com/example/ssc",
    sourceCommitArgument: "SSC_COMMIT",
    sourceArchiveArgument: "SSC_ARCHIVE_SHA256"
  }),
  measur: Object.freeze({
    repositoryName: "amo-tools-suite",
    sourceRepository:
      "https://github.com/example/amo-tools-suite",
    sourceCommitArgument: "MEASUR_COMMIT",
    sourceArchiveArgument: "MEASUR_ARCHIVE_SHA256"
  }),
  scout: Object.freeze({
    repositoryName: "scout",
    sourceRepository: "https://github.com/example/scout",
    sourceCommitArgument: "SCOUT_COMMIT",
    sourceArchiveArgument: "SCOUT_ARCHIVE_SHA256"
  })
});

function repositoryUri(repositoryName) {
  return (
    `${RESEARCH_AWS_ACCOUNT_ID}.dkr.ecr.${RESEARCH_AWS_REGION}` +
    `.amazonaws.com/${repositoryName}`
  );
}

function durablePackage(
  packageId,
  packageType,
  sha256,
  index
) {
  const sizeBytes = 2_000 + index;
  const versionId = `version-${packageId}`;
  const objectKey = `test/${encodeURIComponent(packageId)}`;
  const contentType = "application/octet-stream";
  return {
    packageId,
    packageType,
    s3Uri:
      `s3://${RESEARCH_S3_BUCKET}/${objectKey}`,
    fingerprint: {
      algorithm: "SHA-256",
      digest: sha256
    },
    plannedObject: {
      uploadReady: true,
      expectedSha256: sha256,
      expectedSizeBytes: sizeBytes,
      key: objectKey,
      contentType
    },
    remote: {
      s3: {
        bucket: RESEARCH_S3_BUCKET,
        key: objectKey,
        verificationStatus: "VERIFIED",
        metadataSha256: sha256,
        checksumSha256Base64: Buffer.from(
          sha256,
          "hex"
        ).toString("base64"),
        contentLength: sizeBytes,
        contentType,
        serverSideEncryption: "AES256",
        versionId,
        s3Uri:
          `s3://${RESEARCH_S3_BUCKET}/${objectKey}`,
        verifiedAt: "2026-07-24T21:59:00.000Z"
      }
    },
    cleanupEligibility: {
      restoredVersionId: versionId,
      restoredSha256: sha256,
      restoredSizeBytes: sizeBytes,
      restoredAt: "2026-07-24T22:00:00.000Z"
    }
  };
}

function fixtureSha256(value) {
  return value.toString(16).padStart(2, "0").repeat(32);
}

function fixtureContentBinding(modelId, index) {
  const dockerfilePath =
    `scripts/research/operational-savings/containers/${modelId}/Dockerfile`;
  const buildInputs = [
    {
      path: "Dockerfile",
      repositoryPath: dockerfilePath,
      sha256:
        fixtureBoundFileSha256(dockerfilePath),
      byteSize:
        fixtureBoundFileBytes(dockerfilePath).length
    }
  ];
  if (modelId === "scout") {
    const lockPath =
      "scripts/research/operational-savings/containers/scout/requirements.lock";
    buildInputs.push({
      path: "requirements.lock",
      repositoryPath: lockPath,
      sha256:
        fixtureBoundFileSha256(lockPath),
      byteSize:
        fixtureBoundFileBytes(lockPath).length
    });
  }
  const verifierPath =
    `scripts/research/operational-savings/containers/${modelId}/verify.mjs`;
  const verificationInputs = [
    {
      path: "verify.mjs",
      repositoryPath: verifierPath,
      sha256:
        fixtureBoundFileSha256(verifierPath),
      byteSize:
        fixtureBoundFileBytes(verifierPath).length
    }
  ];
  return {
    status: "VERIFIED_EXACT_LOCAL_CONTENT",
    buildInputs,
    buildInputSetSha256:
      ecrEvidenceDigest(buildInputs),
    verificationInputs,
    verificationInputSetSha256:
      ecrEvidenceDigest(verificationInputs),
    completeInputSetSha256: ecrEvidenceDigest({
      buildInputs,
      verificationInputs
    })
  };
}

function fixtureLicenseRequirements(modelId, index) {
  const base = 20 + index * 20;
  const byModel = {
    reopt: [
      {
        packageId: "repository-license:reopt:LICENSE",
        path: "LICENSE",
        role: "PROJECT_LICENSE",
        primary: true
      },
      {
        packageId: "repository-license:reopt:NOTICE",
        path: "NOTICE",
        role: "PROJECT_NOTICE"
      },
      {
        packageId:
          "repository-license:reopt:transcrypt:LICENSE",
        path: "transcrypt/LICENSE",
        role: "VENDORED_DEPENDENCY_LICENSE"
      }
    ],
    ssc: [
      {
        packageId: "repository-license:ssc:LICENSE",
        path: "LICENSE",
        role: "PROJECT_LICENSE",
        primary: true
      },
      {
        packageId:
          "repository-license:ssc:lpsolve:LICENSE.htm",
        path: "lpsolve/LICENSE.htm",
        role: "VENDORED_DEPENDENCY_LICENSE"
      },
      {
        packageId:
          "repository-license:ssc:nlopt:LICENSE.htm",
        path: "nlopt/LICENSE.htm",
        role: "VENDORED_DEPENDENCY_LICENSE"
      },
      {
        packageId:
          "embedded-license:9d2e2f12b2febd13396df270",
        path:
          "or-tools_aarch64_AlmaLinux-8.10_cpp_v9.14.6206/share/doc/ortools/LICENSE",
        role: "ARCHIVE_PROJECT_LICENSE",
        packageType: "EMBEDDED_LICENSE_ARTIFACT",
        parentPackageType: "SOURCE_ARTIFACT",
        archiveFormat: "TAR_GZIP",
        parentPackageId:
          "cache-file:artifacts/or-tools_aarch64_AlmaLinux-8.10_cpp_v9.14.6206.tar.gz"
      }
    ],
    measur: [
      {
        packageId:
          "repository-license:amo-tools-suite:LICENSE.txt",
        path: "LICENSE.txt",
        role: "PROJECT_LICENSE",
        primary: true
      },
      {
        packageId:
          "repository-license:amo-tools-suite:include:fast-cpp-csv-parser:LICENSE",
        path: "include/fast-cpp-csv-parser/LICENSE",
        role: "VENDORED_DEPENDENCY_LICENSE"
      }
    ],
    scout: [
      {
        packageId:
          "repository-license:scout:LICENSE.md",
        path: "LICENSE.md",
        role: "CONDITIONAL_DUAL_PROJECT_LICENSE",
        primary: true
      },
      {
        packageId: "embedded-license:scout-wheel-license",
        path:
          "example-1.0.dist-info/licenses/LICENSE",
        role: "PYTHON_DISTRIBUTION_LICENSE",
        packageType: "EMBEDDED_LICENSE_ARTIFACT",
        parentPackageType: "MODEL_DEPENDENCY_WHEEL",
        archiveFormat: "ZIP",
        parentPackageId:
          "cache-file:model-dependencies/scout/example-1.0-py3-none-any.whl"
      },
      {
        packageId:
          "embedded-license:scout-wheel-license-two",
        path:
          "example_two-2.0.dist-info/licenses/LICENSE",
        role: "PYTHON_DISTRIBUTION_LICENSE",
        packageType: "EMBEDDED_LICENSE_ARTIFACT",
        parentPackageType: "MODEL_DEPENDENCY_WHEEL",
        archiveFormat: "ZIP",
        parentPackageId:
          "cache-file:model-dependencies/scout/example_two-2.0-py3-none-any.whl"
      }
    ]
  };
  const source = fixtureModelSources[modelId];
  const sourceCommit =
    String.fromCharCode(97 + index).repeat(40);
  return byModel[modelId].map((requirement, offset) => ({
    ...requirement,
    sha256: fixtureSha256(base + offset),
    ...(requirement.parentPackageId
      ? {
          parentSha256: fixtureSha256(
            base + 10 + offset
          ),
          parentLocalPath:
            `scripts/research/operational-savings/.cache/fixture/${encodeURIComponent(requirement.parentPackageId)}`
        }
      : {
          repositoryName: source.repositoryName,
          repositoryRemoteUrl:
            `${source.sourceRepository}.git`,
          repositoryCommit: sourceCommit,
          repositoryTree:
            fixtureSha256(base + 15).slice(0, 40),
          parentPackageId:
            `git-repository:${source.repositoryName}`
        })
  }));
}

function fixtureLicensePackage(requirement, index) {
  const packageType =
    requirement.packageType ??
    "REPOSITORY_LICENSE_ARTIFACT";
  const packageRecord = durablePackage(
    requirement.packageId,
    packageType,
    requirement.sha256,
    index
  );
  packageRecord.license = {
    licenseRole: requirement.role
  };
  if (packageType === "REPOSITORY_LICENSE_ARTIFACT") {
    packageRecord.parentPackageId =
      requirement.parentPackageId;
    packageRecord.repositoryIdentity = {
      repositoryName: requirement.repositoryName,
      remoteUrl: requirement.repositoryRemoteUrl,
      commitSha: requirement.repositoryCommit,
      gitTreeObjectSha1: requirement.repositoryTree,
      repositoryRelativePath: requirement.path
    };
  } else {
    packageRecord.parentPackageId =
      requirement.parentPackageId;
    packageRecord.localPath =
      requirement.parentLocalPath;
    packageRecord.coverage = {
      mode: "DUPLICATE_CHILD_OBJECT"
    };
    packageRecord.localLifecycle = {
      ownerPackageId: requirement.parentPackageId
    };
    packageRecord.embeddedMember = {
      parentPackageId: requirement.parentPackageId,
      parentLocalPath: requirement.parentLocalPath,
      parentExpectedSha256: requirement.parentSha256,
      archiveFormat: requirement.archiveFormat,
      memberPath: requirement.path
    };
    packageRecord.plannedObject.localFilePath =
      `scripts/research/operational-savings/.cache/migration-staging/embedded-licenses/${requirement.sha256}/${encodeURIComponent(requirement.packageId)}`;
    packageRecord.plannedObject.extractionPlan = {
      parentPackageId: requirement.parentPackageId,
      parentLocalPath: requirement.parentLocalPath,
      parentExpectedSha256: requirement.parentSha256,
      archiveFormat: requirement.archiveFormat,
      memberPath: requirement.path
    };
    packageRecord.content = {
      parentPackageId: requirement.parentPackageId,
      parentPackageSha256: requirement.parentSha256
    };
  }
  return packageRecord;
}

function fixtureEmbeddedParent(requirement, index) {
  return {
    ...durablePackage(
      requirement.parentPackageId,
      requirement.parentPackageType,
      requirement.parentSha256,
      500 + index
    ),
    localPath: requirement.parentLocalPath
  };
}

function fixtureRepositoryParent(modelId, index) {
  const source = fixtureModelSources[modelId];
  const sourceCommit =
    String.fromCharCode(97 + index).repeat(40);
  const repositoryTree = fixtureLicenseRequirements(
    modelId,
    index
  ).find(
    (requirement) =>
      requirement.packageType == null
  ).repositoryTree;
  return {
    packageId:
      `git-repository:${source.repositoryName}`,
    packageType: "PINNED_GIT_REPOSITORY",
    fingerprint: {
      commitSha: sourceCommit,
      gitTreeObjectSha1: repositoryTree,
      workingTreeClean: true
    },
    content: {
      repositoryName: source.repositoryName,
      remoteUrl: `${source.sourceRepository}.git`
    }
  };
}

function manifestFixture() {
  const evidenceByModel = new Map(
    modelSpecs.map((spec, index) => [
      spec.modelId,
      {
        buildSha256:
          fixtureBoundFileSha256(
            `scripts/research/operational-savings/containers/${spec.modelId}/build-manifest.json`
          ),
        sourceSha256: fixtureSha256(index * 20 + 2),
        sourceCommit:
          String.fromCharCode(97 + index).repeat(40),
        licenses: fixtureLicenseRequirements(
          spec.modelId,
          index
        )
      }
    ])
  );
  const packages = modelSpecs.flatMap((spec, index) => {
    const evidence = evidenceByModel.get(spec.modelId);
    const embeddedRequirements = evidence.licenses.filter(
      (requirement) =>
        requirement.packageType ===
        "EMBEDDED_LICENSE_ARTIFACT"
    );
    return [
      fixtureRepositoryParent(spec.modelId, index),
      durablePackage(
        `model-support:${spec.modelId}:build-manifest.json`,
        "CONTAINER_BUILD_METADATA",
        evidence.buildSha256,
        index * 20
      ),
      durablePackage(
        `source-archive:${spec.modelId}`,
        "SOURCE_ARTIFACT",
        evidence.sourceSha256,
        index * 20 + 1
      ),
      ...evidence.licenses.map((requirement, offset) =>
        fixtureLicensePackage(
          requirement,
          index * 20 + 2 + offset
        )
      ),
      ...embeddedRequirements.map(fixtureEmbeddedParent),
      ...(spec.modelId === "scout"
        ? [
            durablePackage(
              "model-support:scout:requirements.lock",
              "MODEL_DEPENDENCY_LOCK",
              fixtureBoundFileSha256(
                "scripts/research/operational-savings/containers/scout/requirements.lock"
              ),
              600
            )
          ]
        : [])
    ];
  });
  const manifest = {
    schemaVersion:
      "operational-savings/research-storage-migration-v1",
    destination: {
      s3: {
        bucket: RESEARCH_S3_BUCKET
      },
      ecr: {
        accountId: RESEARCH_AWS_ACCOUNT_ID,
        region: RESEARCH_AWS_REGION,
        repositories: modelSpecs.map((spec, index) => {
          const evidence = evidenceByModel.get(spec.modelId);
          const source = fixtureModelSources[spec.modelId];
          const primaryLicense = evidence.licenses.find(
            (requirement) => requirement.primary === true
          );
          const buildArguments = {
            [source.sourceCommitArgument]:
              evidence.sourceCommit,
            [source.sourceArchiveArgument]:
              evidence.sourceSha256,
            ...(spec.modelId === "ssc"
              ? {
                  ORTOOLS_ARCHIVE_SHA256:
                    evidence.licenses.find(
                      (requirement) =>
                        requirement.parentPackageId?.startsWith(
                          "cache-file:artifacts/or-tools_"
                        )
                    ).parentSha256
                }
              : {})
          };
          const contentBinding = fixtureContentBinding(
            spec.modelId,
            index
          );
          const scoutWheelRequirements =
            spec.modelId === "scout"
              ? evidence.licenses.filter(
                  (requirement) =>
                    requirement.parentPackageType ===
                    "MODEL_DEPENDENCY_WHEEL"
                )
              : [];
          const lockedArtifacts =
            scoutWheelRequirements.length === 0
              ? null
              : scoutWheelRequirements.map(
                  (requirement, wheelIndex) => {
                    const name =
                      wheelIndex === 0
                        ? "example"
                        : "example-two";
                    const version =
                      wheelIndex === 0 ? "1.0" : "2.0";
                    return {
                      name,
                      requirement: `${name}==${version}`,
                      version,
                      sha256: requirement.parentSha256
                    };
                  }
                );
          const uri = repositoryUri(spec.repositoryName);
          const imageTag = `release-${index}-arm64`;
          return {
            modelId: spec.modelId,
            repositoryName: spec.repositoryName,
            expectedRepositoryUri: uri,
            buildManifest: {
              path:
                `scripts/research/operational-savings/containers/${spec.modelId}/build-manifest.json`,
              status: "VERIFIED",
              sha256: evidence.buildSha256,
              buildEvidence: {
                status:
                  "COMPLETED_AND_EXACT_IMAGE_VERIFIED",
                builtAt:
                  `2026-07-24T20:00:0${index}.000000000Z`,
                builtAtEvidence: {
                  kind: "LOCAL_IMAGE_CONFIG_CREATED",
                  imageId: spec.imageId,
                  inspectionField: ".Created"
                },
                historicalInvocationCaptured: false,
                commandSemantics:
                  "Source-controlled reproduction command.",
                reproductionCommand:
                  `docker buildx build ${spec.modelId}`,
                arguments: buildArguments,
                statusEvidence: {
                  localImageId: spec.imageId,
                  ecrImageDigest: spec.imageId,
                  runtimeVerificationStatus: "PASS"
                },
                buildContextProvenance: {
                  status:
                    "UNCOMMITTED_HISTORICAL_BUILD_CONTEXT",
                  historicalRepositoryCommit: null,
                  contentIdentityStatus:
                    "POST_HOC_EXACT_FILE_HASHES",
                  recordedImageBuildContextAttested: false,
                  note:
                    "Exact current files are recorded, but they are not attested as the historical image build context."
                },
                contentBinding,
                ...(lockedArtifacts == null
                  ? {}
                  : {
                      dependencyLockEvidence: {
                        status:
                          "VERIFIED_EXACT_PIP_HASH_LOCK",
                        lockFormat:
                          "pip-require-hashes-linux-arm64-wheels",
                        path: "requirements.lock",
                        repositoryPath:
                          "scripts/research/operational-savings/containers/scout/requirements.lock",
                        sha256:
                          fixtureBoundFileSha256(
                            "scripts/research/operational-savings/containers/scout/requirements.lock"
                          ),
                        packageCount:
                          lockedArtifacts.length,
                        lockedArtifacts,
                        lockedArtifactSetSha256:
                          ecrEvidenceDigest(
                            lockedArtifacts
                          )
                      }
                    })
              }
            },
            provenance: {
              sourceRepository: source.sourceRepository,
              sourceCommit: evidence.sourceCommit,
              sourceRelease: `release-${index}`,
              modelVersion: `release-${index}`,
              purpose: `Research-only ${spec.modelId} replay.`,
              sourceOrganization: "Example research source",
              sourceRole:
                "EXACT_CONTAINER_SOURCE_ARCHIVE",
              official: true,
              sourceArchiveSha256:
                evidence.sourceSha256,
              buildManifestSha256:
                evidence.buildSha256,
              license: {
                identifier: "Apache-2.0",
                path: "/opt/model/LICENSE",
                sha256: primaryLicense.sha256,
                status: "RECORDED_AND_HASH_VERIFIED",
                attributionStatus:
                  "SOURCE_ORGANIZATION_AND_LICENSE_RECORDED"
              }
            },
            localImage: {
              imageId: spec.imageId,
              targetPlatform: "linux/arm64",
              verificationCommand:
                `node scripts/research/operational-savings/containers/${spec.modelId}/verify.mjs`,
              verificationStatus:
                "PASS_COMMITTED_POST_HOC_REPLAY"
            },
            remoteImage: {
              accountId: RESEARCH_AWS_ACCOUNT_ID,
              region: RESEARCH_AWS_REGION,
              repositoryName: spec.repositoryName,
              repositoryUri: uri,
              imageTag,
              imageDigest: spec.imageId,
              imageUri: `${uri}@${spec.imageId}`,
              imageSizeBytes: 1000 + index,
              imageManifestMediaType:
                index === 1
                  ? "application/vnd.oci.image.index.v1+json"
                  : "application/vnd.oci.image.manifest.v1+json",
              exactDigestPulled: true,
              runtimeVerificationStatus: "PASS",
              verificationStatus: "VERIFIED_EXACT_DIGEST",
              scan: {
                status: "COMPLETE",
                completedAt:
                  `2026-07-24T20:01:0${index}.000Z`,
                ...(index === 1
                  ? {
                      scannedManifestDigest:
                        `sha256:${"f".repeat(64)}`
                    }
                  : {}),
                critical: index,
                high: index + 1,
                medium: index + 2,
                low: index + 3
              }
            }
          };
        })
      }
    },
    packages,
    execution: {
      uploadsPerformed: false,
      localFilesDeleted: false
    }
  };
  const replayReceipt = sealPostHocReplayReceipt({
    schemaVersion: POST_HOC_REPLAY_SCHEMA_VERSION,
    status: "PASS_COMMITTED_POST_HOC_REPLAY",
    semantics: POST_HOC_REPLAY_SEMANTICS,
    executionEnvironment:
      POST_HOC_REPLAY_EXECUTION_ENVIRONMENT,
    contextGitCommit:
      liveReplayContext?.contextGitCommit ??
      "1".repeat(40),
    contextGitTree:
      liveReplayContext?.contextGitTree ??
      "2".repeat(40),
    createdAt: "2026-07-24T20:02:00.000Z",
    implementationFiles:
      POST_HOC_REPLAY_IMPLEMENTATION_PATHS.map(
        (path) => ({
          path,
          sha256: fixtureBoundFileSha256(path)
        })
      ),
    models:
      manifest.destination.ecr.repositories.map(
        (repository, index) => {
          const contentBinding =
            repository.buildManifest.buildEvidence
              .contentBinding;
          const verifier =
            contentBinding.verificationInputs.find(
              (input) =>
                input.repositoryPath ===
                repository.localImage
                  .verificationCommand.slice(5)
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
            verifierPath: verifier.repositoryPath,
            verifierSha256: verifier.sha256,
            exitCode: 0,
            stdoutSha256:
              fixtureSha256(240 + index * 2),
            stdoutSizeBytes: 8,
            stderrSha256:
              fixtureSha256(241 + index * 2),
            stderrSizeBytes: 0,
            replayedAt:
              `2026-07-24T20:02:0${index}.000Z`,
            replayKind:
              POST_HOC_REPLAY_SEMANTICS.replayKind,
            historicalBuildContext:
              POST_HOC_REPLAY_SEMANTICS
                .historicalBuildContext
          };
        }
      )
  });
  manifest.destination.ecr.postHocReplayReceipt = {
    path: POST_HOC_REPLAY_RECEIPT_RELATIVE_PATH,
    status: "PASS_COMMITTED_POST_HOC_REPLAY",
    blocker: null,
    receipt: replayReceipt
  };
  manifest.manifestContentSha256 =
    sha256CanonicalJson(manifest);
  return manifest;
}

function resealManifest(manifest) {
  delete manifest.manifestContentSha256;
  manifest.manifestContentSha256 =
    sha256CanonicalJson(manifest);
  return manifest;
}

function assertFixtureReceiptCurrent(manifest, receipt) {
  return assertCurrentEcrRestoreReceipt({
    manifest,
    receipt,
    specs: modelSpecs,
    accountId: RESEARCH_AWS_ACCOUNT_ID,
    region: RESEARCH_AWS_REGION,
    principalArnPattern:
      /^arn:aws:sts::945129430686:assumed-role\/RetroFiOperationalSavingsResearchRole\/[^/]+$/,
    requireFullValidation: false,
    requireLocalCleanup: false,
    requireDurableArtifacts: true
  });
}

beforeAll(async () => {
  liveReplayRepoRoot = await mkdtemp(
    join(tmpdir(), "retrofi-live-replay-gate-")
  );
  const repositoryPaths = new Set(
    POST_HOC_REPLAY_IMPLEMENTATION_PATHS
  );
  for (const [index, spec] of
    modelSpecs.entries()) {
    repositoryPaths.add(
      `scripts/research/operational-savings/containers/${spec.modelId}/build-manifest.json`
    );
    const contentBinding =
      fixtureContentBinding(spec.modelId, index);
    for (const input of [
      ...contentBinding.buildInputs,
      ...contentBinding.verificationInputs
    ]) {
      repositoryPaths.add(input.repositoryPath);
    }
  }
  for (const repositoryPath of repositoryPaths) {
    await writeFixtureBoundFile(
      liveReplayRepoRoot,
      repositoryPath
    );
  }
  await fixtureGit(liveReplayRepoRoot, [
    "init",
    "--quiet"
  ]);
  await fixtureGit(liveReplayRepoRoot, [
    "config",
    "user.name",
    "Live Replay Gate Test"
  ]);
  await fixtureGit(liveReplayRepoRoot, [
    "config",
    "user.email",
    "live-replay@example.test"
  ]);
  await fixtureGit(liveReplayRepoRoot, [
    "add",
    "--all"
  ]);
  await fixtureGit(liveReplayRepoRoot, [
    "-c",
    "commit.gpgsign=false",
    "commit",
    "--quiet",
    "-m",
    "freeze live replay inputs"
  ]);
  liveReplayContext = {
    contextGitCommit: await fixtureGit(
      liveReplayRepoRoot,
      ["rev-parse", "HEAD"]
    ),
    contextGitTree: await fixtureGit(
      liveReplayRepoRoot,
      ["rev-parse", "HEAD^{tree}"]
    )
  };
  const receipt =
    manifestFixture().destination.ecr
      .postHocReplayReceipt.receipt;
  const receiptPath = join(
    liveReplayRepoRoot,
    POST_HOC_REPLAY_RECEIPT_RELATIVE_PATH
  );
  await mkdir(dirname(receiptPath), {
    recursive: true
  });
  await writeFile(
    receiptPath,
    `${JSON.stringify(receipt, null, 2)}\n`,
    "utf8"
  );
  await fixtureGit(liveReplayRepoRoot, [
    "add",
    POST_HOC_REPLAY_RECEIPT_RELATIVE_PATH
  ]);
  await fixtureGit(liveReplayRepoRoot, [
    "-c",
    "commit.gpgsign=false",
    "commit",
    "--quiet",
    "-m",
    "commit live replay receipt"
  ]);
});

afterAll(async () => {
  if (liveReplayRepoRoot) {
    await rm(liveReplayRepoRoot, {
      recursive: true,
      force: true
    });
  }
});

test("requires a committed post-hoc replay receipt before ECR restore planning", () => {
  const manifest = manifestFixture();
  delete manifest.destination.ecr.postHocReplayReceipt;
  resealManifest(manifest);
  expect(() =>
    planEcrImageRestore({ manifest, destination })
  ).toThrow(
    /ECR_POST_HOC_REPLAY_RECEIPT_REQUIRED/
  );
});

test("rejects a replay receipt that weakens its unsigned trust boundary", () => {
  const manifest = manifestFixture();
  const replayState =
    manifest.destination.ecr.postHocReplayReceipt;
  replayState.receipt.semantics = {
    ...replayState.receipt.semantics,
    authentication: "SIGNED"
  };
  replayState.receipt =
    sealPostHocReplayReceipt(
      replayState.receipt
    );
  resealManifest(manifest);
  expect(() =>
    planEcrImageRestore({ manifest, destination })
  ).toThrow(
    /POST_HOC_REPLAY_RECEIPT_INVALID/
  );
});

test("blocks AWS and Docker when a structurally valid manifest carries a stale committed receipt", async () => {
  const manifest = manifestFixture();
  const replayState =
    manifest.destination.ecr.postHocReplayReceipt;
  replayState.receipt =
    sealPostHocReplayReceipt({
      ...replayState.receipt,
      createdAt: "2026-07-24T20:03:00.000Z"
    });
  resealManifest(manifest);
  expect(() =>
    planEcrImageRestore({ manifest, destination })
  ).not.toThrow();
  const runner = vi.fn();
  const dockerRunner = vi.fn();
  const verifierRunner = vi.fn();
  await expect(
    restoreAndReplayEcrImages({
      repoRoot: liveReplayRepoRoot,
      manifest,
      destination,
      runner,
      dockerRunner,
      verifierRunner
    })
  ).rejects.toThrow(
    /POST_HOC_REPLAY_MANIFEST_RECEIPT_MISMATCH/
  );
  expect(runner).not.toHaveBeenCalled();
  expect(dockerRunner).not.toHaveBeenCalled();
  expect(verifierRunner).not.toHaveBeenCalled();
});

function resealReceiptImageEvidence(image) {
  const licenseEvidence =
    image.durableArtifactEvidence.licenseEvidence;
  licenseEvidence.entryCount =
    licenseEvidence.entries.length;
  licenseEvidence.evidenceSetSha256 =
    ecrEvidenceDigest({
      schemaVersion: licenseEvidence.schemaVersion,
      modelId: licenseEvidence.modelId,
      imageDigest: licenseEvidence.imageDigest,
      buildManifestSha256:
        licenseEvidence.buildManifestSha256,
      sourceArchiveSha256:
        licenseEvidence.sourceArchiveSha256,
      completeBuildInputSetSha256:
        licenseEvidence.completeBuildInputSetSha256,
      entries: licenseEvidence.entries,
      parentArtifacts: licenseEvidence.parentArtifacts,
      dependencyLockEvidence:
        licenseEvidence.dependencyLockEvidence
    });
  image.licenseEvidenceSetSha256 =
    licenseEvidence.evidenceSetSha256;
  image.durableArtifactEvidenceSha256 =
    ecrEvidenceDigest(image.durableArtifactEvidence);
}

function success(value) {
  return {
    exitCode: 0,
    stdout:
      typeof value === "string"
        ? value
        : JSON.stringify(value),
    stderr: ""
  };
}

function imageNotFound(reference) {
  return {
    exitCode: 1,
    stdout: "[]",
    stderr:
      `Error response from daemon: No such image: ${reference}`
  };
}

function safeLifecyclePolicy() {
  return {
    rules: [
      {
        rulePriority: 1,
        description:
          "Expire only untagged images after 14 days",
        selection: {
          tagStatus: "untagged",
          countType: "sinceImagePushed",
          countUnit: "days",
          countNumber: 14
        },
        action: { type: "expire" }
      }
    ]
  };
}

function awsRunnerFor(
  manifest,
  {
    repositoryMutation = (value) => value,
    lifecycleMutation = (value) => value,
    scanMutation = (value) => value,
    indexManifestMutation = (value) => value
  } = {}
) {
  return vi.fn(async (args) => {
    if (args[0] === "sts") {
      return success({
        Account: RESEARCH_AWS_ACCOUNT_ID,
        Arn:
          "arn:aws:sts::945129430686:assumed-role/RetroFiOperationalSavingsResearchRole/ecr-test",
        UserId: "test"
      });
    }
    if (
      args[0] === "ecr" &&
      args[1] === "get-login-password"
    ) {
      return success("test-password\n");
    }
    const repositoryOption = args.includes(
      "--repository-name"
    )
      ? "--repository-name"
      : "--repository-names";
    const repositoryName =
      args[args.indexOf(repositoryOption) + 1];
    const repository =
      manifest.destination.ecr.repositories.find(
        (candidate) =>
          candidate.repositoryName === repositoryName
      );
    if (!repository) {
      throw new Error(
        `unexpected repository command ${args.join(" ")}`
      );
    }
    if (args[1] === "describe-repositories") {
      return success({
        repositories: [
          repositoryMutation({
            registryId: RESEARCH_AWS_ACCOUNT_ID,
            repositoryName,
            repositoryUri:
              repository.expectedRepositoryUri,
            imageTagMutability: "IMMUTABLE",
            imageScanningConfiguration: {
              scanOnPush: true
            },
            encryptionConfiguration: {
              encryptionType: "AES256"
            }
          })
        ]
      });
    }
    if (args[1] === "get-lifecycle-policy") {
      return success({
        registryId: RESEARCH_AWS_ACCOUNT_ID,
        repositoryName,
        lifecyclePolicyText: JSON.stringify(
          lifecycleMutation(safeLifecyclePolicy())
        )
      });
    }
    if (args[1] === "describe-images") {
      return success({
        imageDetails: [
          {
            registryId: RESEARCH_AWS_ACCOUNT_ID,
            repositoryName,
            imageDigest:
              repository.remoteImage.imageDigest,
            imageTags: [
              repository.remoteImage.imageTag
            ],
            imageSizeInBytes:
              repository.remoteImage.imageSizeBytes,
            imageManifestMediaType:
              repository.remoteImage
                .imageManifestMediaType
          }
        ]
      });
    }
    if (args[1] === "batch-get-image") {
      const scannedManifestDigest =
        repository.remoteImage.scan
          .scannedManifestDigest;
      return success({
        images: [
          {
            registryId: RESEARCH_AWS_ACCOUNT_ID,
            repositoryName,
            imageId: {
              imageDigest:
                repository.remoteImage.imageDigest
            },
            imageManifestMediaType:
              "application/vnd.oci.image.index.v1+json",
            imageManifest: JSON.stringify(
              indexManifestMutation({
                schemaVersion: 2,
                mediaType:
                  "application/vnd.oci.image.index.v1+json",
                manifests: [
                  {
                    mediaType:
                      "application/vnd.oci.image.manifest.v1+json",
                    digest: scannedManifestDigest,
                    size: 123,
                    platform: {
                      os: "linux",
                      architecture: "arm64"
                    }
                  }
                ]
              })
            )
          }
        ]
      });
    }
    if (args[1] === "describe-image-scan-findings") {
      const requestedDigest = args[
        args.indexOf("--image-id") + 1
      ].slice("imageDigest=".length);
      return success(scanMutation({
        registryId: RESEARCH_AWS_ACCOUNT_ID,
        repositoryName,
        imageId: {
          imageDigest: requestedDigest
        },
        imageScanStatus: {
          status: "COMPLETE"
        },
        imageScanFindings: {
          imageScanCompletedAt:
            repository.remoteImage.scan.completedAt,
          findingSeverityCounts: {
            CRITICAL:
              repository.remoteImage.scan.critical,
            HIGH: repository.remoteImage.scan.high,
            MEDIUM:
              repository.remoteImage.scan.medium,
            LOW: repository.remoteImage.scan.low
          }
        }
      }));
    }
    throw new Error(`unexpected AWS command ${args.join(" ")}`);
  });
}

test("plans exact-digest ECR restore without calling AWS or Docker", () => {
  const manifest = manifestFixture();
  expect(
    planEcrImageRestore({ manifest, destination })
  ).toMatchObject({
    dryRun: true,
    operation: "restore-ecr-images",
    imageCount: 4,
    wouldVerifyResearchIdentity: true,
    wouldVerifyLiveRepositoryControls: true,
    wouldAuthenticateWithTemporaryDockerConfig: true,
    wouldPullExactDigests: true,
    wouldReplayOfflineVerifiers: true,
    wouldDeleteLocal: false,
    wouldMutateAws: false
  });
});

test("plans fail-closed local cleanup only when explicitly requested", () => {
  const manifest = manifestFixture();
  expect(
    planEcrImageRestore({
      manifest,
      destination,
      removeAfterReplay: true,
      runFullValidation: true,
      confirmNoActiveConsumers: true
    })
  ).toMatchObject({
    dryRun: true,
    wouldRequireAcceptedImagesAbsentBeforePull: true,
    wouldRemoveExactEcrReferencesAndRequireImageAbsence:
      true,
    wouldDeleteLocal: true,
    wouldMutateAws: false
  });
});

test("rejects local ECR replay cleanup without full validation", () => {
  const manifest = manifestFixture();
  expect(() =>
    planEcrImageRestore({
      manifest,
      destination,
      removeAfterReplay: true
    })
  ).toThrow(
    /ECR_RESTORE_LOCAL_REMOVAL_REQUIRES_FULL_VALIDATION/
  );
});

test("rejects local ECR replay cleanup without explicit no-active-consumers confirmation", () => {
  const manifest = manifestFixture();
  expect(() =>
    planEcrImageRestore({
      manifest,
      destination,
      removeAfterReplay: true,
      runFullValidation: true
    })
  ).toThrow(
    /ECR_RESTORE_LOCAL_REMOVAL_REQUIRES_FULL_VALIDATION_AND_CONFIRMATION/
  );
});

test("rejects ungrounded build timestamps before any ECR restore call", () => {
  const manifest = manifestFixture();
  manifest.destination.ecr.repositories[0]
    .buildManifest.buildEvidence.builtAtEvidence.kind =
    "MANUALLY_ENTERED";
  resealManifest(manifest);
  expect(() =>
    planEcrImageRestore({ manifest, destination })
  ).toThrow(/ECR_BUILD_EVIDENCE_INVALID/);
});

test("rejects build content-binding set digests that do not match the exact input records", () => {
  const manifest = manifestFixture();
  manifest.destination.ecr.repositories[0]
    .buildManifest.buildEvidence.contentBinding
    .buildInputSetSha256 = "f".repeat(64);
  resealManifest(manifest);
  expect(() =>
    planEcrImageRestore({ manifest, destination })
  ).toThrow(/ECR_BUILD_EVIDENCE_INVALID/);
});

test("rejects ECR restore records without content-hashed source and license provenance", () => {
  const manifest = manifestFixture();
  delete manifest.destination.ecr.repositories[0].provenance
    .license;
  resealManifest(manifest);
  expect(() =>
    planEcrImageRestore({ manifest, destination })
  ).toThrow(/ECR_BUILD_EVIDENCE_INVALID/);
});

test("binds every repository license to the exact source repository commit and clean parent tree", () => {
  const mutations = [
    {
      label: "license commit",
      mutate(manifest) {
        manifest.packages.find(
          (packageRecord) =>
            packageRecord.packageId ===
            "repository-license:reopt:NOTICE"
        ).repositoryIdentity.commitSha = "f".repeat(40);
      }
    },
    {
      label: "license remote",
      mutate(manifest) {
        manifest.packages.find(
          (packageRecord) =>
            packageRecord.packageId ===
            "repository-license:reopt:NOTICE"
        ).repositoryIdentity.remoteUrl =
          "https://github.com/attacker/reopt.git";
      }
    },
    {
      label: "parent repository commit",
      mutate(manifest) {
        manifest.packages.find(
          (packageRecord) =>
            packageRecord.packageId ===
            "git-repository:reopt"
        ).fingerprint.commitSha = "f".repeat(40);
      }
    },
    {
      label: "dirty parent repository",
      mutate(manifest) {
        manifest.packages.find(
          (packageRecord) =>
            packageRecord.packageId ===
            "git-repository:reopt"
        ).fingerprint.workingTreeClean = false;
      }
    }
  ];
  for (const mutation of mutations) {
    const manifest = manifestFixture();
    mutation.mutate(manifest);
    resealManifest(manifest);
    expect(
      () =>
        planEcrImageRestore({ manifest, destination }),
      mutation.label
    ).toThrow(
      /ECR_LICENSE_REPOSITORY_IDENTITY_INVALID: reopt/
    );
  }
});

test("binds model-specific source and dependency build arguments to durable materials", () => {
  const mutations = [
    {
      label: "source commit argument",
      modelId: "reopt",
      argument: "REOPT_COMMIT",
      value: "f".repeat(40),
      expected: /ECR_BUILD_MATERIAL_BINDING_INVALID: reopt/
    },
    {
      label: "source archive argument",
      modelId: "measur",
      argument: "MEASUR_ARCHIVE_SHA256",
      value: "f".repeat(64),
      expected:
        /ECR_BUILD_MATERIAL_BINDING_INVALID: measur/
    },
    {
      label: "OR-Tools archive argument",
      modelId: "ssc",
      argument: "ORTOOLS_ARCHIVE_SHA256",
      value: "f".repeat(64),
      expected:
        /ECR_BUILD_DEPENDENCY_ARGUMENT_BINDING_INVALID: ssc/
    }
  ];
  for (const mutation of mutations) {
    const manifest = manifestFixture();
    const repository =
      manifest.destination.ecr.repositories.find(
        (candidate) =>
          candidate.modelId === mutation.modelId
      );
    repository.buildManifest.buildEvidence.arguments[
      mutation.argument
    ] = mutation.value;
    resealManifest(manifest);
    expect(
      () =>
        planEcrImageRestore({ manifest, destination }),
      mutation.label
    ).toThrow(mutation.expected);
  }
});

test("preserves the explicit uncommitted historical build-context evidence boundary", () => {
  const manifest = manifestFixture();
  manifest.destination.ecr.repositories[0]
    .buildManifest.buildEvidence.buildContextProvenance
    .recordedImageBuildContextAttested = true;
  resealManifest(manifest);
  expect(() =>
    planEcrImageRestore({ manifest, destination })
  ).toThrow(/ECR_BUILD_CONTEXT_PROVENANCE_INVALID/);

  const falseCommittedClaim = manifestFixture();
  falseCommittedClaim.destination.ecr.repositories[0]
    .buildManifest.buildEvidence.buildContextProvenance = {
    status: "COMMITTED_REPRODUCTION_CONTEXT",
    historicalRepositoryCommit: "a".repeat(40),
    contentIdentityStatus: "COMMITTED_EXACT_FILE_HASHES",
    recordedImageBuildContextAttested: false,
    note:
      "A build manifest cannot bind the future commit that contains itself."
  };
  resealManifest(falseCommittedClaim);
  expect(() =>
    planEcrImageRestore({
      manifest: falseCommittedClaim,
      destination
    })
  ).toThrow(/ECR_BUILD_CONTEXT_PROVENANCE_INVALID/);
});

test("requires every fixed project, notice, and vendored dependency license", () => {
  const manifest = manifestFixture();
  manifest.packages = manifest.packages.filter(
    (packageRecord) =>
      packageRecord.packageId !==
      "repository-license:reopt:NOTICE"
  );
  resealManifest(manifest);
  expect(() =>
    planEcrImageRestore({ manifest, destination })
  ).toThrow(
    /ECR_LICENSE_PACKAGE_REQUIRED: reopt: repository-license:reopt:NOTICE/
  );
});

test("requires at least one bound license package for every Scout wheel", () => {
  const manifest = manifestFixture();
  manifest.packages = manifest.packages.filter(
    (packageRecord) =>
      packageRecord.packageId !==
      "embedded-license:scout-wheel-license"
  );
  resealManifest(manifest);
  expect(() =>
    planEcrImageRestore({ manifest, destination })
  ).toThrow(
    /ECR_SCOUT_WHEEL_LICENSE_REQUIRED: cache-file:model-dependencies\/scout\/example-1.0-py3-none-any.whl/
  );
});

test("binds every Scout wheel license and notice in deterministic path order", () => {
  const manifest = manifestFixture();
  const existingLicense = manifest.packages.find(
    (packageRecord) =>
      packageRecord.packageId ===
      "embedded-license:scout-wheel-license"
  );
  manifest.packages.push(
    fixtureLicensePackage(
      {
        packageId:
          "embedded-license:scout-wheel-notice",
        packageType: "EMBEDDED_LICENSE_ARTIFACT",
        parentPackageId:
          existingLicense.parentPackageId,
        parentLocalPath:
          existingLicense.embeddedMember.parentLocalPath,
        parentSha256:
          existingLicense.embeddedMember
            .parentExpectedSha256,
        archiveFormat: "ZIP",
        path:
          "example-1.0.dist-info/licenses/AUTHORS",
        role: "DISTRIBUTION_NOTICE",
        sha256: "8".repeat(64)
      },
      99
    )
  );
  resealManifest(manifest);
  const repository =
    manifest.destination.ecr.repositories.find(
      (candidate) => candidate.modelId === "scout"
    );
  const evidence = assertEcrBuildEvidence({
    manifest,
    repository,
    requireDurableArtifacts: true
  }).durableArtifacts.licenseEvidence;
  expect(evidence.entryCount).toBe(4);
  expect(
    evidence.entries.map((entry) => entry.path)
  ).toEqual([
    "LICENSE.md",
    "example-1.0.dist-info/licenses/AUTHORS",
    "example-1.0.dist-info/licenses/LICENSE",
    "example_two-2.0.dist-info/licenses/LICENSE"
  ]);
  const reorderedManifest = structuredClone(manifest);
  reorderedManifest.packages.reverse();
  resealManifest(reorderedManifest);
  const reorderedRepository =
    reorderedManifest.destination.ecr.repositories.find(
      (candidate) => candidate.modelId === "scout"
    );
  const reorderedEvidence = assertEcrBuildEvidence({
    manifest: reorderedManifest,
    repository: reorderedRepository,
    requireDurableArtifacts: true
  }).durableArtifacts.licenseEvidence;
  expect(reorderedEvidence).toEqual(evidence);
});

test("requires the exact verified S3 version and matching restored-byte proof for every license", () => {
  const manifest = manifestFixture();
  const notice = manifest.packages.find(
    (packageRecord) =>
      packageRecord.packageId ===
      "repository-license:reopt:NOTICE"
  );
  notice.cleanupEligibility.restoredVersionId =
    "different-version";
  resealManifest(manifest);
  expect(() =>
    planEcrImageRestore({ manifest, destination })
  ).toThrow(
    /ECR_DURABLE_ARTIFACT_PROOF_INVALID: reopt PROJECT_NOTICE NOTICE/
  );
});

test("requires durable restored-byte proof for each embedded license parent", () => {
  const manifest = manifestFixture();
  const wheel = manifest.packages.find(
    (packageRecord) =>
      packageRecord.packageId ===
      "cache-file:model-dependencies/scout/example-1.0-py3-none-any.whl"
  );
  wheel.cleanupEligibility.restoredVersionId =
    "different-parent-version";
  resealManifest(manifest);
  expect(() =>
    planEcrImageRestore({ manifest, destination })
  ).toThrow(
    /ECR_DURABLE_ARTIFACT_PROOF_INVALID: scout embedded-license parent/
  );
});

test("binds every embedded license extraction to the exact parent checksum", () => {
  const manifest = manifestFixture();
  const license = manifest.packages.find(
    (packageRecord) =>
      packageRecord.packageId ===
      "embedded-license:scout-wheel-license"
  );
  license.embeddedMember.parentExpectedSha256 =
    "f".repeat(64);
  resealManifest(manifest);
  expect(() =>
    planEcrImageRestore({ manifest, destination })
  ).toThrow(
    /MANIFEST_EMBEDDED_LICENSE_PACKAGE_INVALID|ECR_LICENSE_PARENT_BINDING_INVALID: scout/
  );
});

test("binds the exact durable Scout lock to every wheel parent hash", () => {
  const manifest = manifestFixture();
  const scout =
    manifest.destination.ecr.repositories.find(
      (repository) => repository.modelId === "scout"
    );
  const lockEvidence =
    scout.buildManifest.buildEvidence
      .dependencyLockEvidence;
  lockEvidence.lockedArtifacts[0].sha256 =
    "f".repeat(64);
  lockEvidence.lockedArtifactSetSha256 =
    ecrEvidenceDigest(lockEvidence.lockedArtifacts);
  resealManifest(manifest);
  expect(() =>
    planEcrImageRestore({ manifest, destination })
  ).toThrow(/ECR_SCOUT_WHEEL_LOCK_BINDING_INVALID/);

  const duplicateNameManifest = manifestFixture();
  const duplicateNameEvidence =
    duplicateNameManifest.destination.ecr.repositories.find(
      (repository) => repository.modelId === "scout"
    ).buildManifest.buildEvidence.dependencyLockEvidence;
  duplicateNameEvidence.lockedArtifacts[1].name = "example";
  duplicateNameEvidence.lockedArtifacts[1].requirement =
    "example==2.0";
  duplicateNameEvidence.lockedArtifactSetSha256 =
    ecrEvidenceDigest(
      duplicateNameEvidence.lockedArtifacts
    );
  resealManifest(duplicateNameManifest);
  expect(() =>
    planEcrImageRestore({
      manifest: duplicateNameManifest,
      destination
    })
  ).toThrow(/ECR_SCOUT_DEPENDENCY_LOCK_SET_INVALID/);
});

test("requires the exact restored S3 version of the Scout dependency lock", () => {
  const manifest = manifestFixture();
  const lockPackage = manifest.packages.find(
    (packageRecord) =>
      packageRecord.packageId ===
      "model-support:scout:requirements.lock"
  );
  lockPackage.cleanupEligibility.restoredVersionId =
    "different-lock-version";
  resealManifest(manifest);
  expect(() =>
    planEcrImageRestore({ manifest, destination })
  ).toThrow(
    /ECR_DURABLE_ARTIFACT_PROOF_INVALID: scout dependency lock/
  );
});

test("accepts independently recorded verification and restore timestamps when the exact version proof matches", () => {
  const manifest = manifestFixture();
  const notice = manifest.packages.find(
    (packageRecord) =>
      packageRecord.packageId ===
      "repository-license:reopt:NOTICE"
  );
  notice.remote.s3.verifiedAt =
    "2026-07-24T22:00:01.000Z";
  notice.cleanupEligibility.restoredAt =
    "2026-07-24T22:00:00.000Z";
  resealManifest(manifest);
  expect(() =>
    planEcrImageRestore({ manifest, destination })
  ).not.toThrow();
});

test("pulls exact ECR digests and replays every verifier after all controls pass", async () => {
  const manifest = manifestFixture();
  const runner = awsRunnerFor(manifest);
  const events = [];
  const dockerRunner = vi.fn(async (args, options = {}) => {
    if (args.includes("login")) {
      events.push("login");
      expect(options.stdin).toBe("test-password\n");
      expect(args).not.toContain("test-password");
      return success("Login Succeeded\n");
    }
    if (args.includes("pull")) {
      const imageUri = args.at(-1);
      events.push(`pull:${imageUri}`);
      expect(imageUri).toMatch(
        /\.amazonaws\.com\/retrofi-research-[a-z]+@sha256:[a-f0-9]{64}$/
      );
      expect(args).toContain("--platform");
      return success("pulled\n");
    }
    if (args[0] === "image" && args[1] === "inspect") {
      const imageUri = args[2];
      const repository =
        manifest.destination.ecr.repositories.find(
          (candidate) =>
            candidate.remoteImage.imageUri === imageUri
        );
      return success([
        {
          Id: repository.localImage.imageId,
          Created:
            repository.buildManifest.buildEvidence.builtAt,
          RepoDigests: [imageUri]
        }
      ]);
    }
    throw new Error(
      `unexpected Docker command ${args.join(" ")}`
    );
  });
  const verifierRunner = vi.fn(async (input) => {
    events.push(
      `verify:${input.modelId}:${input.verifierRelativePath}`
    );
    expect(input.imageUri).toContain("@sha256:");
    return success("PASS\n");
  });
  const createDockerConfig = vi.fn(
    async () => "/private/tmp/ecr-auth-test"
  );
  const removeDockerConfig = vi.fn();

  const result = await restoreAndReplayEcrImages({
    repoRoot: liveReplayRepoRoot,
    manifest,
    destination,
    runner,
    dockerRunner,
    verifierRunner,
    createDockerConfig,
    removeDockerConfig
  });

  expect(result).toMatchObject({
    dryRun: false,
    disposition:
      "EXACT_ECR_DIGESTS_RESTORED_AND_OFFLINE_REPLAYED",
    temporaryDockerCredentialRetained: false
  });
  expect(result.results).toHaveLength(4);
  expect(
    result.results.every(
      (record) =>
        record.pullStatus === "PULLED_EXACT_DIGEST" &&
        record.replayStatus === "PASS" &&
        record.liveEcr.repositoryControls
          .imageTagMutability === "IMMUTABLE" &&
        record.liveEcr.repositoryControls
          .encryptionType === "AES256" &&
        record.liveEcr.repositoryControls.scanOnPush ===
          true &&
        record.liveEcr.lifecyclePolicy
          .minimumUntaggedRetentionDays === 14
    )
  ).toBe(true);
  expect(verifierRunner).toHaveBeenCalledTimes(5);
  expect(createDockerConfig).toHaveBeenCalledTimes(1);
  expect(removeDockerConfig).toHaveBeenCalledWith(
    "/private/tmp/ecr-auth-test"
  );
  expect(JSON.stringify(result)).not.toContain(
    "test-password"
  );
  const firstPull = events.findIndex((event) =>
    event.startsWith("pull:")
  );
  expect(firstPull).toBeGreaterThan(
    events.indexOf("login")
  );
  const preflightCallsBeforeLogin = runner.mock.calls
    .slice(
      0,
      runner.mock.calls.findIndex(
        ([args]) => args[1] === "get-login-password"
      )
    )
    .filter(([args]) => args[0] === "ecr");
  expect(preflightCallsBeforeLogin).toHaveLength(17);
  const receipt = recordEcrRestoreReplay({
    manifest,
    result,
    now: () => "2026-07-24T23:30:00.000Z"
  });
  expect(receipt).toMatchObject({
    status: "PASS",
    completedAt: "2026-07-24T23:30:00.000Z",
    exactDigestPullsVerified: true,
    offlineModelReplayVerified: true,
    fullValidationRecorded: false,
    allImagesRemovedLocally: false,
    temporaryDockerCredentialRetained: false
  });
  expect(receipt.images).toHaveLength(4);
  expect(
    Object.fromEntries(
      receipt.images.map((image) => [
        image.modelId,
        image.durableArtifactEvidence.licenseEvidence
          .entryCount
      ])
    )
  ).toEqual({
    measur: 2,
    reopt: 3,
    scout: 3,
    ssc: 4
  });
  expect(
    Object.fromEntries(
      receipt.images.map((image) => [
        image.modelId,
        image.durableArtifactEvidence.licenseEvidence
          .parentArtifactCount
      ])
    )
  ).toEqual({
    measur: 0,
    reopt: 0,
    scout: 2,
    ssc: 1
  });
  for (const image of receipt.images) {
    const licenseEvidence =
      image.durableArtifactEvidence.licenseEvidence;
    const repository =
      manifest.destination.ecr.repositories.find(
        (candidate) =>
          candidate.modelId === image.modelId
      );
    expect(licenseEvidence).toMatchObject({
      imageDigest: repository.remoteImage.imageDigest,
      buildManifestSha256:
        repository.buildManifest.sha256,
      sourceArchiveSha256:
        repository.provenance.sourceArchiveSha256,
      completeBuildInputSetSha256:
        repository.buildManifest.buildEvidence
          .contentBinding.completeInputSetSha256
    });
    expect(image.licenseEvidenceSetSha256).toBe(
      licenseEvidence.evidenceSetSha256
    );
    expect(image.durableArtifactEvidenceSha256).toBe(
      ecrEvidenceDigest(image.durableArtifactEvidence)
    );
    expect(
      image.durableArtifactEvidence
        .buildContextProvenance
    ).toMatchObject({
      status:
        "UNCOMMITTED_HISTORICAL_BUILD_CONTEXT",
      historicalRepositoryCommit: null,
      contentIdentityStatus:
        "POST_HOC_EXACT_FILE_HASHES",
      recordedImageBuildContextAttested: false
    });
    expect(
      image.durableArtifactEvidence
        .buildMaterialBinding
    ).toMatchObject({
      modelId: image.modelId,
      sourceCommit: repository.provenance.sourceCommit,
      sourceArchiveSha256:
        repository.provenance.sourceArchiveSha256
    });
    expect(
      licenseEvidence.entries
        .filter(
          (entry) => entry.parentPackageId === null
        )
        .every(
          (entry) =>
            entry.repositoryIdentity?.commitSha ===
              repository.provenance.sourceCommit &&
            entry.repositoryIdentity
              ?.canonicalRemoteUrl ===
              repository.provenance.sourceRepository
        )
    ).toBe(true);
    expect(
      licenseEvidence.entries.every(
        (entry) =>
          entry.versionId ===
            entry.restoredProof.versionId &&
          entry.sha256 ===
            entry.restoredProof.sha256 &&
          entry.sizeBytes ===
            entry.restoredProof.sizeBytes
      )
    ).toBe(true);
    expect(
      licenseEvidence.entries
        .filter(
          (entry) => entry.parentPackageId !== null
        )
        .every((entry) =>
          licenseEvidence.parentArtifacts.some(
            (parent) =>
              parent.packageId ===
                entry.parentPackageId &&
              ecrEvidenceDigest(parent) ===
                entry.parentArtifactEvidenceSha256
          )
        )
    ).toBe(true);
    if (image.modelId === "scout") {
      expect(
        licenseEvidence.dependencyLockEvidence
      ).toMatchObject({
        status:
          "VERIFIED_EXACT_PIP_HASH_LOCK",
        lockedArtifactSetSha256:
          expect.stringMatching(/^[a-f0-9]{64}$/),
        wheelArtifactSetSha256:
          expect.stringMatching(/^[a-f0-9]{64}$/)
      });
      expect(
        licenseEvidence.dependencyLockEvidence
          .wheelArtifacts
      ).toHaveLength(2);
    } else {
      expect(
        licenseEvidence.dependencyLockEvidence
      ).toBeNull();
    }
  }
  expect(() =>
    assertFixtureReceiptCurrent(manifest, receipt)
  ).not.toThrow();

  const receiptMutations = [
    {
      label: "missing license entry",
      mutate(image) {
        image.durableArtifactEvidence.licenseEvidence
          .entries.pop();
      }
    },
    {
      label: "reordered license entries",
      mutate(image) {
        image.durableArtifactEvidence.licenseEvidence
          .entries.reverse();
      }
    },
    {
      label: "mutated license path",
      mutate(image) {
        image.durableArtifactEvidence.licenseEvidence
          .entries[0].path = "changed/LICENSE";
      }
    },
    {
      label: "mutated license hash",
      mutate(image) {
        const entry =
          image.durableArtifactEvidence.licenseEvidence
            .entries[0];
        entry.sha256 = "f".repeat(64);
        entry.restoredProof.sha256 = "f".repeat(64);
      }
    },
    {
      label: "mutated image binding",
      mutate(image) {
        image.durableArtifactEvidence.licenseEvidence
          .imageDigest = `sha256:${"9".repeat(64)}`;
      }
    },
    {
      label: "mutated complete build input binding",
      mutate(image) {
        const contentBinding =
          image.durableArtifactEvidence
            .buildContentBinding;
        contentBinding.buildInputs[0].sha256 =
          "7".repeat(64);
        contentBinding.buildInputSetSha256 =
          ecrEvidenceDigest(contentBinding.buildInputs);
        contentBinding.completeInputSetSha256 =
          ecrEvidenceDigest({
            buildInputs: contentBinding.buildInputs,
            verificationInputs:
              contentBinding.verificationInputs
          });
        image.durableArtifactEvidence.licenseEvidence
          .completeBuildInputSetSha256 =
          contentBinding.completeInputSetSha256;
      }
    },
    {
      label: "mutated S3 restore version",
      mutate(image) {
        const entry =
          image.durableArtifactEvidence.licenseEvidence
            .entries[0];
        entry.versionId = "attacker-version";
        entry.restoredProof.versionId =
          "attacker-version";
      }
    },
    {
      label: "mutated repository commit identity",
      mutate(image) {
        image.durableArtifactEvidence.licenseEvidence
          .entries[0].repositoryIdentity.commitSha =
          "f".repeat(40);
      }
    },
    {
      label: "mutated parent artifact and references",
      modelId: "ssc",
      mutate(image) {
        const licenseEvidence =
          image.durableArtifactEvidence
            .licenseEvidence;
        const parent =
          licenseEvidence.parentArtifacts[0];
        parent.versionId = "attacker-parent-version";
        parent.restoredProof.versionId =
          "attacker-parent-version";
        const digest = ecrEvidenceDigest(parent);
        licenseEvidence.entries.find(
          (entry) => entry.parentPackageId !== null
        ).parentArtifactEvidenceSha256 = digest;
      }
    },
    {
      label: "reordered locked wheel artifacts",
      modelId: "scout",
      mutate(image) {
        const lock =
          image.durableArtifactEvidence
            .licenseEvidence.dependencyLockEvidence;
        lock.lockedArtifacts.reverse();
        lock.lockedArtifactSetSha256 =
          ecrEvidenceDigest(lock.lockedArtifacts);
      }
    },
    {
      label: "mutated source build-material binding",
      mutate(image) {
        image.durableArtifactEvidence
          .buildMaterialBinding.sourceCommit =
          "f".repeat(40);
        image.durableArtifactEvidence
          .buildMaterialBinding.sourceCommitArgument
          .value = "f".repeat(40);
      }
    },
    {
      label: "mutated build-context boundary",
      mutate(image) {
        image.durableArtifactEvidence
          .buildContextProvenance
          .recordedImageBuildContextAttested = true;
      }
    }
  ];
  for (const mutation of receiptMutations) {
    const changed = structuredClone(receipt);
    const image = changed.images.find(
      (candidate) =>
        candidate.modelId ===
        (mutation.modelId ?? "reopt")
    );
    mutation.mutate(image);
    resealReceiptImageEvidence(image);
    expect(
      () =>
        assertFixtureReceiptCurrent(manifest, changed),
      mutation.label
    ).toThrow(
      new RegExp(
        `ECR_RESTORE_RECEIPT_IMAGE_INVALID: ${mutation.modelId ?? "reopt"}`
      )
    );
  }
});

test("removes only exact ECR references and requires the image ID to become absent", async () => {
  const manifest = manifestFixture();
  const present = new Map();
  const postReplayAction = vi.fn(async ({ results }) => {
    expect(results).toHaveLength(4);
    expect(present.size).toBe(8);
    expect(
      dockerRunner.mock.calls.some(
        ([args]) =>
          args[0] === "image" && args[1] === "rm"
      )
    ).toBe(false);
    manifest.execution.finalCleanupValidation = {
      status: "PASSED",
      validatedAt: "2026-07-24T23:30:30.000Z",
      validatedSourceCommit: "e".repeat(40),
      validatedRepositoryTreeDigest: "f".repeat(64),
      packageCount: manifest.packages.length
    };
    resealManifest(manifest);
    return {
      disposition:
        "ALL_PACKAGES_MARKED_CLEANUP_ELIGIBLE"
    };
  });
  const dockerRunner = vi.fn(async (args, options = {}) => {
    if (args.includes("login")) {
      expect(options.stdin).toBe("test-password\n");
      return success("Login Succeeded\n");
    }
    if (args.includes("pull")) {
      const imageUri = args.at(-1);
      const repository =
        manifest.destination.ecr.repositories.find(
          (candidate) =>
            candidate.remoteImage.imageUri === imageUri
        );
      const inspection = {
        Id: repository.localImage.imageId,
        Created:
          repository.buildManifest.buildEvidence.builtAt,
        RepoTags: [imageUri],
        RepoDigests: [imageUri]
      };
      present.set(imageUri, inspection);
      present.set(repository.localImage.imageId, inspection);
      return success("pulled\n");
    }
    if (args[0] === "image" && args[1] === "inspect") {
      return present.has(args[2])
        ? success([present.get(args[2])])
        : imageNotFound(args[2]);
    }
    if (args[0] === "ps") {
      return success("");
    }
    if (args[0] === "image" && args[1] === "rm") {
      expect(args).not.toContain("--force");
      const reference = args[2];
      const inspection = present.get(reference);
      if (!inspection) {
        return imageNotFound(reference);
      }
      for (const [
        candidate,
        candidateInspection
      ] of present.entries()) {
        if (candidateInspection.Id === inspection.Id) {
          present.delete(candidate);
        }
      }
      return success(`Deleted: ${inspection.Id}\n`);
    }
    throw new Error(
      `unexpected Docker command ${args.join(" ")}`
    );
  });

  const result = await restoreAndReplayEcrImages({
    repoRoot: liveReplayRepoRoot,
    manifest,
    destination,
    removeAfterReplay: true,
    confirmNoActiveConsumers: true,
    postReplayAction,
    runner: awsRunnerFor(manifest),
    dockerRunner,
    verifierRunner: vi.fn(async () => success("PASS\n")),
    createDockerConfig: async () =>
      "/private/tmp/ecr-auth-test",
    removeDockerConfig: vi.fn()
  });

  expect(result).toMatchObject({
    dryRun: false,
    disposition:
      "EXACT_ECR_DIGESTS_RESTORED_REPLAYED_AND_REMOVED_LOCALLY",
    wouldDeleteLocal: true,
    wouldRunFullOfflineValidation: true,
    postReplayResult: {
      disposition:
        "ALL_PACKAGES_MARKED_CLEANUP_ELIGIBLE"
    }
  });
  expect(postReplayAction).toHaveBeenCalledTimes(1);
  expect(
    result.results.every(
      (record) =>
        record.localCleanup?.status ===
        "EXACT_ECR_REFERENCE_REMOVED_AFTER_REPLAY_AND_IMAGE_ABSENT"
    )
  ).toBe(true);
  expect(present.size).toBe(0);
  expect(
    dockerRunner.mock.calls.filter(
      ([args]) =>
        args[0] === "image" && args[1] === "rm"
    )
  ).toHaveLength(4);
  expect(
    dockerRunner.mock.calls
      .filter(
        ([args]) =>
          args[0] === "image" && args[1] === "rm"
      )
      .every(([args]) => args[2].includes("@sha256:"))
  ).toBe(true);
  const receipt = recordEcrRestoreReplay({
    manifest,
    result,
    now: () => "2026-07-24T23:31:00.000Z"
  });
  expect(receipt).toMatchObject({
    fullValidationRecorded: true,
    allImagesRemovedLocally: true
  });
});

test("blocks opted-in cleanup when an accepted image already exists", async () => {
  const manifest = manifestFixture();
  const first =
    manifest.destination.ecr.repositories[0];
  const runner = vi.fn();
  const dockerRunner = vi.fn(async (args) => {
    if (
      args[0] === "image" &&
      args[1] === "inspect" &&
      args[2] === first.localImage.imageId
    ) {
      return success([
        {
          Id: first.localImage.imageId,
          Created:
            first.buildManifest.buildEvidence.builtAt,
          RepoTags: [],
          RepoDigests: []
        }
      ]);
    }
    return imageNotFound(args.at(-1));
  });

  await expect(
    restoreAndReplayEcrImages({
      repoRoot: liveReplayRepoRoot,
      manifest,
      destination,
      removeAfterReplay: true,
      confirmNoActiveConsumers: true,
      postReplayAction: vi.fn(),
      runner,
      dockerRunner,
      verifierRunner: vi.fn()
    })
  ).rejects.toThrow(
    /ECR_RESTORE_REMOVE_REQUIRES_IMAGE_ABSENT/
  );
  expect(runner).not.toHaveBeenCalled();
  expect(
    dockerRunner.mock.calls.some(([args]) =>
      args.includes("pull")
    )
  ).toBe(false);
  expect(
    dockerRunner.mock.calls.some(
      ([args]) =>
        args[0] === "image" && args[1] === "rm"
    )
  ).toBe(false);
});

test("fails closed when Docker cannot prove an accepted image is absent", async () => {
  const manifest = manifestFixture();
  const runner = vi.fn();
  const dockerRunner = vi.fn(async () => ({
    exitCode: 1,
    stdout: "",
    stderr: "Cannot connect to the Docker daemon"
  }));

  await expect(
    restoreAndReplayEcrImages({
      repoRoot: liveReplayRepoRoot,
      manifest,
      destination,
      removeAfterReplay: true,
      confirmNoActiveConsumers: true,
      postReplayAction: vi.fn(),
      runner,
      dockerRunner,
      verifierRunner: vi.fn()
    })
  ).rejects.toThrow(
    /ECR_RESTORE_PREEXISTING_REOPT_FAILED/
  );
  expect(runner).not.toHaveBeenCalled();
});

test("cleans an exact pulled image even when its offline verifier fails", async () => {
  const manifest = manifestFixture();
  const present = new Map();
  const dockerRunner = vi.fn(async (args) => {
    if (args.includes("login")) {
      return success("Login Succeeded\n");
    }
    if (args.includes("pull")) {
      const imageUri = args.at(-1);
      const repository =
        manifest.destination.ecr.repositories.find(
          (candidate) =>
            candidate.remoteImage.imageUri === imageUri
        );
      const inspection = {
        Id: repository.localImage.imageId,
        Created:
          repository.buildManifest.buildEvidence.builtAt,
        RepoTags: [imageUri],
        RepoDigests: [imageUri]
      };
      present.set(imageUri, inspection);
      present.set(repository.localImage.imageId, inspection);
      return success("pulled\n");
    }
    if (args[0] === "image" && args[1] === "inspect") {
      return present.has(args[2])
        ? success([present.get(args[2])])
        : imageNotFound(args[2]);
    }
    if (args[0] === "ps") {
      return success("");
    }
    if (args[0] === "image" && args[1] === "rm") {
      const inspection = present.get(args[2]);
      for (const [
        reference,
        candidate
      ] of present.entries()) {
        if (candidate.Id === inspection.Id) {
          present.delete(reference);
        }
      }
      return success("removed\n");
    }
    throw new Error(
      `unexpected Docker command ${args.join(" ")}`
    );
  });

  await expect(
    restoreAndReplayEcrImages({
      repoRoot: liveReplayRepoRoot,
      manifest,
      destination,
      removeAfterReplay: true,
      confirmNoActiveConsumers: true,
      postReplayAction: vi.fn(async () => ({
        disposition:
          "ALL_PACKAGES_MARKED_CLEANUP_ELIGIBLE"
      })),
      runner: awsRunnerFor(manifest),
      dockerRunner,
      verifierRunner: vi.fn(async () => ({
        exitCode: 1,
        stdout: "",
        stderr: "intentional verifier failure"
      })),
      createDockerConfig: async () =>
        "/private/tmp/ecr-auth-test",
      removeDockerConfig: vi.fn()
    })
  ).rejects.toThrow(/ECR_RESTORE_REPLAY_FAILED/);
  expect(present.size).toBe(0);
  expect(
    dockerRunner.mock.calls.some(
      ([args]) =>
        args[0] === "image" && args[1] === "rm"
    )
  ).toBe(true);
});

test("refuses to remove a pulled image after an unexpected local tag appears", async () => {
  const manifest = manifestFixture();
  const present = new Map();
  const dockerRunner = vi.fn(async (args) => {
    if (args.includes("login")) {
      return success("Login Succeeded\n");
    }
    if (args.includes("pull")) {
      const imageUri = args.at(-1);
      const repository =
        manifest.destination.ecr.repositories.find(
          (candidate) =>
            candidate.remoteImage.imageUri === imageUri
        );
      const inspection = {
        Id: repository.localImage.imageId,
        Created:
          repository.buildManifest.buildEvidence.builtAt,
        RepoTags: [
          imageUri,
          "unexpected-owner:keep"
        ],
        RepoDigests: [imageUri]
      };
      present.set(imageUri, inspection);
      present.set(repository.localImage.imageId, inspection);
      return success("pulled\n");
    }
    if (args[0] === "image" && args[1] === "inspect") {
      return present.has(args[2])
        ? success([present.get(args[2])])
        : imageNotFound(args[2]);
    }
    throw new Error(
      `unexpected Docker command ${args.join(" ")}`
    );
  });

  await expect(
    restoreAndReplayEcrImages({
      repoRoot: liveReplayRepoRoot,
      manifest,
      destination,
      removeAfterReplay: true,
      confirmNoActiveConsumers: true,
      postReplayAction: vi.fn(async () => ({
        disposition:
          "ALL_PACKAGES_MARKED_CLEANUP_ELIGIBLE"
      })),
      runner: awsRunnerFor(manifest),
      dockerRunner,
      verifierRunner: vi.fn(async () => success("PASS\n")),
      createDockerConfig: async () =>
        "/private/tmp/ecr-auth-test",
      removeDockerConfig: vi.fn()
    })
  ).rejects.toThrow(
    /ECR_RESTORE_CLEANUP_UNEXPECTED_LOCAL_REFERENCES/
  );
  expect(
    dockerRunner.mock.calls.some(
      ([args]) =>
        args[0] === "image" && args[1] === "rm"
    )
  ).toBe(false);
});

test("rejects an OCI index scan record that reuses the parent digest before Docker access", async () => {
  const manifest = manifestFixture();
  const repository =
    manifest.destination.ecr.repositories.find(
      (candidate) => candidate.modelId === "ssc"
    );
  repository.remoteImage.scan.scannedManifestDigest =
    repository.remoteImage.imageDigest;
  resealManifest(manifest);
  const dockerRunner = vi.fn();
  await expect(
    restoreAndReplayEcrImages({
      repoRoot: liveReplayRepoRoot,
      manifest,
      destination,
      runner: awsRunnerFor(manifest),
      dockerRunner,
      verifierRunner: vi.fn()
    })
  ).rejects.toThrow(
    /ECR_RESTORE_SCAN_CHILD_DIGEST_REQUIRED/
  );
  expect(dockerRunner).not.toHaveBeenCalled();
});

test("rejects a nested OCI index in place of the executable platform child", async () => {
  const manifest = manifestFixture();
  const dockerRunner = vi.fn();
  await expect(
    restoreAndReplayEcrImages({
      repoRoot: liveReplayRepoRoot,
      manifest,
      destination,
      runner: awsRunnerFor(manifest, {
        indexManifestMutation: (value) => ({
          ...value,
          manifests: value.manifests.map((manifestEntry) => ({
            ...manifestEntry,
            mediaType:
              "application/vnd.oci.image.index.v1+json"
          }))
        })
      }),
      dockerRunner,
      verifierRunner: vi.fn()
    })
  ).rejects.toThrow(
    /ECR_RESTORE_SCAN_CHILD_NOT_BOUND_TO_TARGET_PLATFORM/
  );
  expect(dockerRunner).not.toHaveBeenCalled();
});

test.each([
  [
    "mutable tags",
    {
      repositoryMutation: (value) => ({
        ...value,
        imageTagMutability: "MUTABLE"
      })
    },
    /UNSAFE_ECR_TAG_MUTABILITY/
  ],
  [
    "KMS encryption",
    {
      repositoryMutation: (value) => ({
        ...value,
        encryptionConfiguration: {
          encryptionType: "KMS"
        }
      })
    },
    /UNSAFE_ECR_ENCRYPTION/
  ],
  [
    "disabled scan-on-push",
    {
      repositoryMutation: (value) => ({
        ...value,
        imageScanningConfiguration: {
          scanOnPush: false
        }
      })
    },
    /UNSAFE_ECR_SCAN_CONFIGURATION/
  ],
  [
    "tagged expiration",
    {
      lifecycleMutation: (value) => ({
        ...value,
        rules: [
          {
            ...value.rules[0],
            selection: {
              ...value.rules[0].selection,
              tagStatus: "any"
            }
          }
        ]
      })
    },
    /UNSAFE_ECR_LIFECYCLE/
  ],
  [
    "short untagged retention",
    {
      lifecycleMutation: (value) => ({
        ...value,
        rules: [
          {
            ...value.rules[0],
            selection: {
              ...value.rules[0].selection,
              countNumber: 13
            }
          }
        ]
      })
    },
    /UNSAFE_ECR_LIFECYCLE/
  ],
  [
    "scan findings that differ from the recorded exact-digest evidence",
    {
      scanMutation: (value) => ({
        ...value,
        imageScanFindings: {
          ...value.imageScanFindings,
          findingSeverityCounts: {
            ...value.imageScanFindings
              .findingSeverityCounts,
            HIGH:
              value.imageScanFindings
                .findingSeverityCounts.HIGH + 1
          }
        }
      })
    },
    /ECR_RESTORE_LIVE_SCAN_MISMATCH/
  ]
])(
  "fails before Docker access when ECR has %s",
  async (_label, mutation, errorPattern) => {
    const manifest = manifestFixture();
    const dockerRunner = vi.fn();
    await expect(
      restoreAndReplayEcrImages({
        repoRoot: liveReplayRepoRoot,
        manifest,
        destination,
        runner: awsRunnerFor(manifest, mutation),
        dockerRunner,
        verifierRunner: vi.fn()
      })
    ).rejects.toThrow(errorPattern);
    expect(dockerRunner).not.toHaveBeenCalled();
  }
);

test("removes temporary Docker credentials when exact image timestamp inspection fails", async () => {
  const manifest = manifestFixture();
  const removeDockerConfig = vi.fn();
  const dockerRunner = vi.fn(async (args) => {
    if (args.includes("login") || args.includes("pull")) {
      return success("ok\n");
    }
    if (args[0] === "image" && args[1] === "inspect") {
      const repository =
        manifest.destination.ecr.repositories.find(
          (candidate) =>
            candidate.remoteImage.imageUri === args[2]
        );
      return success([
        {
          Id: repository.localImage.imageId,
          Created: "2026-07-24T00:00:00.000Z",
          RepoDigests: [args[2]]
        }
      ]);
    }
    throw new Error(`unexpected ${args.join(" ")}`);
  });
  await expect(
    restoreAndReplayEcrImages({
      repoRoot: liveReplayRepoRoot,
      manifest,
      destination,
      runner: awsRunnerFor(manifest),
      dockerRunner,
      verifierRunner: vi.fn(),
      createDockerConfig: async () =>
        "/private/tmp/ecr-auth-test",
      removeDockerConfig
    })
  ).rejects.toThrow(/ECR_RESTORE_LOCAL_DIGEST_MISMATCH/);
  expect(removeDockerConfig).toHaveBeenCalledWith(
    "/private/tmp/ecr-auth-test"
  );
});
