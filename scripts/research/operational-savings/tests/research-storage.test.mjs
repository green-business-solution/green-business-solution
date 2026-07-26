import {
  mkdir,
  mkdtemp,
  readFile,
  readdir,
  realpath,
  rm,
  symlink,
  writeFile
} from "node:fs/promises";
import { existsSync } from "node:fs";
import { createHash } from "node:crypto";
import { execFile } from "node:child_process";
import { tmpdir } from "node:os";
import { basename, dirname, join } from "node:path";
import { promisify } from "node:util";
import { fileURLToPath } from "node:url";
import { expect, test, vi } from "vitest";

import {
  RESEARCH_AWS_ACCOUNT_ID,
  RESEARCH_AWS_PROFILE,
  RESEARCH_AWS_REGION,
  RESEARCH_S3_BUCKET,
  cleanupAllPackages,
  cleanupAuditedLocalArtifacts,
  cleanupPackage,
  hydrateAllPackages,
  hydratePackage,
  packageHydrationOrder,
  plannedOperation,
  prepareAllRepositoryArchives,
  prepareEmbeddedLicenseArtifact,
  prepareRepositoryArchive,
  proveRemoteVersionRestorable,
  recordAllCleanupValidation,
  recoverPendingPackageCleanup,
  restoreOriginalLocalArtifacts,
  FINAL_CLEANUP_VALIDATION_COMMAND,
  sanitizedAwsEnvironment,
  uploadPackage,
  validateManifestDigest,
  validateResearchDestination,
  verifyRemoteObject,
  writeManifestAtomically
} from "../storage/aws-guard.mjs";
import {
  CACHE_RELATIVE_PATH,
  DEFAULT_MANIFEST_RELATIVE_PATH,
  assertCanonicalInventoriesMatch,
  assertCanonicalInventoryIdentity,
  buildResearchStorageReport,
  buildResearchStorageInventory,
  canonicalInventoryContentSha256,
  declaredWheelLicenseMembers,
  gitRepositoryIdentity,
  readArchiveMember,
  loadLocalArtifactAudit,
  sha256CanonicalJson,
  sha256Path
} from "../storage/inventory.mjs";
import {
  archiveSubprocessEnvironment,
  dockerSubprocessEnvironment,
  gitSubprocessEnvironment,
  nodeSubprocessEnvironment
} from "../lib/subprocess-environment.mjs";
import {
  auditedDirectoryTreeIdentity
} from "../storage/local-audit-freshness.mjs";
import {
  POST_HOC_REPLAY_EXECUTION_ENVIRONMENT,
  POST_HOC_REPLAY_IMPLEMENTATION_PATHS,
  POST_HOC_REPLAY_RECEIPT_RELATIVE_PATH,
  POST_HOC_REPLAY_SCHEMA_VERSION,
  POST_HOC_REPLAY_SEMANTICS,
  sealPostHocReplayReceipt
} from "../storage/post-hoc-replay.mjs";

const repoRoot = fileURLToPath(new URL("../../../..", import.meta.url));
const execFileAsync = promisify(execFile);
const realResearchCacheAvailable = [
  "artifacts",
  "repos/amo-tools-suite/.git",
  "repos/reopt/.git",
  "repos/scout/.git",
  "repos/ssc/.git"
].every((path) =>
  existsSync(join(repoRoot, CACHE_RELATIVE_PATH, path))
);
const cacheBackedTest = realResearchCacheAvailable
  ? test
  : test.skip;
const destination = Object.freeze({
  profile: RESEARCH_AWS_PROFILE,
  bucket: RESEARCH_S3_BUCKET,
  region: RESEARCH_AWS_REGION
});
let inventoryPromise;

function buildTestInventory() {
  inventoryPromise ??= buildResearchStorageInventory({
    repoRoot,
    generatedOn: "2026-07-24"
  });
  return inventoryPromise;
}

function sealManifest(manifest) {
  manifest.manifestContentSha256 = sha256CanonicalJson(
    JSON.parse(JSON.stringify(manifest))
  );
  return manifest;
}

function resealManifest(manifest) {
  delete manifest.manifestContentSha256;
  return sealManifest(manifest);
}

function bindCanonicalInventory(manifest) {
  manifest.canonicalInventory = {
    schemaVersion:
      "operational-savings/canonical-inventory-identity-v2",
    packageCount: manifest.packages.length,
    contentSha256:
      canonicalInventoryContentSha256(manifest)
  };
  return resealManifest(manifest);
}

async function persistManifest(
  root,
  manifest,
  relativePath = "manifest.json"
) {
  const manifestPath = join(root, relativePath);
  await mkdir(dirname(manifestPath), { recursive: true });
  await writeFile(
    manifestPath,
    `${JSON.stringify(manifest, null, 2)}\n`,
    "utf8"
  );
  return manifestPath;
}

function dirtyManifestValidationGitRunner(
  relativePath = DEFAULT_MANIFEST_RELATIVE_PATH
) {
  return vi.fn(async (_repoRoot, args) => {
    if (args[0] === "rev-parse") {
      return {
        exitCode: 0,
        stdout: "validated-head\n",
        stderr: ""
      };
    }
    if (args[0] === "ls-tree") {
      return { exitCode: 0, stdout: "", stderr: "" };
    }
    if (args[0] === "status") {
      return {
        exitCode: 0,
        stdout: ` M ${relativePath}\u0000`,
        stderr: ""
      };
    }
    if (args[0] === "diff" && args.includes("--name-only")) {
      return { exitCode: 0, stdout: "", stderr: "" };
    }
    return { exitCode: 0, stdout: "", stderr: "" };
  });
}

function pendingCleanupRecoveryGitRunner(
  changedPaths = [
    "scripts/research/operational-savings/storage/aws-guard.mjs",
    "scripts/research/operational-savings/storage/research-storage.mjs",
    "scripts/research/operational-savings/tests/research-storage.test.mjs"
  ]
) {
  return vi.fn(async (_repoRoot, args) => {
    if (args[0] === "rev-parse") {
      return {
        exitCode: 0,
        stdout: "recovery-head\n",
        stderr: ""
      };
    }
    if (args[0] === "ls-tree") {
      return { exitCode: 0, stdout: "", stderr: "" };
    }
    if (args[0] === "status") {
      return { exitCode: 0, stdout: "", stderr: "" };
    }
    if (
      args[0] === "diff" &&
      args.includes("--name-only")
    ) {
      return {
        exitCode: 0,
        stdout: `${changedPaths.join("\n")}\n`,
        stderr: ""
      };
    }
    return { exitCode: 0, stdout: "", stderr: "" };
  });
}

function remoteHead({
  sha256,
  sizeBytes,
  versionId = "version-1",
  contentType = "application/json"
}) {
  return {
    ContentLength: sizeBytes,
    ContentType: contentType,
    ChecksumSHA256: Buffer.from(sha256, "hex").toString("base64"),
    Metadata: { sha256 },
    VersionId: versionId,
    ETag: '"etag"',
    ServerSideEncryption: "aws:kms",
    SSEKMSKeyId: "test-key"
  };
}

function success(value) {
  return {
    exitCode: 0,
    stdout: JSON.stringify(value),
    stderr: ""
  };
}

function identity() {
  return success({
    Account: RESEARCH_AWS_ACCOUNT_ID,
    Arn:
      "arn:aws:sts::945129430686:assumed-role/RetroFiOperationalSavingsResearchRole/test-session",
    UserId: "test"
  });
}

function bucketControlResult(args) {
  if (args[0] !== "s3api") return null;
  if (args[1] === "get-bucket-versioning") {
    return success({ Status: "Enabled" });
  }
  if (args[1] === "get-bucket-location") {
    return success({ LocationConstraint: null });
  }
  if (args[1] === "get-public-access-block") {
    return success({
      PublicAccessBlockConfiguration: {
        BlockPublicAcls: true,
        IgnorePublicAcls: true,
        BlockPublicPolicy: true,
        RestrictPublicBuckets: true
      }
    });
  }
  if (args[1] === "get-bucket-ownership-controls") {
    return success({
      OwnershipControls: {
        Rules: [
          { ObjectOwnership: "BucketOwnerEnforced" }
        ]
      }
    });
  }
  if (args[1] === "get-bucket-encryption") {
    return success({
      ServerSideEncryptionConfiguration: {
        Rules: [
          {
            ApplyServerSideEncryptionByDefault: {
              SSEAlgorithm: "AES256"
            }
          }
        ]
      }
    });
  }
  if (args[1] === "get-bucket-policy") {
    return success({
      Policy: JSON.stringify({
        Statement: [
          {
            Effect: "Deny",
            Principal: "*",
            Action: "s3:*",
            Resource: [
              `arn:aws:s3:::${RESEARCH_S3_BUCKET}`,
              `arn:aws:s3:::${RESEARCH_S3_BUCKET}/*`
            ],
            Condition: {
              Bool: { "aws:SecureTransport": "false" }
            }
          }
        ]
      })
    });
  }
  if (
    args[1] === "get-bucket-lifecycle-configuration"
  ) {
    return success({
      Rules: [
        {
          ID: "abort-incomplete",
          Status: "Enabled",
          AbortIncompleteMultipartUpload: {
            DaysAfterInitiation: 7
          }
        },
        {
          ID: "temporary-only",
          Status: "Enabled",
          Prefix: "temporary/",
          Expiration: { Days: 14 },
          NoncurrentVersionExpiration: {
            NoncurrentDays: 14
          }
        }
      ]
    });
  }
  return null;
}

const EMPTY_TREE_DIGEST = createHash("sha256")
  .update("")
  .digest("hex");

function cleanValidationGitRunner() {
  return vi.fn(async (_repoRoot, args) => {
    if (args[0] === "rev-parse") {
      return { exitCode: 0, stdout: "validated-head\n", stderr: "" };
    }
    if (args[0] === "ls-tree") {
      return { exitCode: 0, stdout: "", stderr: "" };
    }
    if (args[0] === "status") {
      return { exitCode: 0, stdout: "", stderr: "" };
    }
    if (args[0] === "diff" && args.includes("--name-only")) {
      return { exitCode: 0, stdout: "", stderr: "" };
    }
    return { exitCode: 0, stdout: "", stderr: "" };
  });
}

function markCleanupEligible(
  manifest,
  packageRecords,
  manifestRelativePath = "manifest.json"
) {
  const validation = {
    status: "PASSED",
    validationCommand: "npm test && npm run build",
    validatedAt: "2026-07-24T00:00:00.000Z",
    validatedSourceCommit: "validated-head",
    validatedRepositoryTreeDigest: EMPTY_TREE_DIGEST,
    repositoryTreeDigestSchemaVersion:
      "git-ls-tree-r-nul-v1",
    repositoryTreeDigestExcludedPaths: [
      manifestRelativePath,
      ...(manifest.localArtifactAudit
        ? [
            "docs/operational-savings-automation-research/research-storage-migration-report.md"
          ]
        : [])
    ].sort(),
    noActiveConsumersConfirmed: true,
    packageCount: packageRecords.length
  };
  manifest.execution.finalCleanupValidation = validation;
  for (const packageRecord of packageRecords) {
    packageRecord.cleanupEligibility = {
      status: "ELIGIBLE",
      activeConsumerPaths: [],
      validatedConsumerPaths: ["test-consumer"],
      validationCommand: validation.validationCommand,
      validationStatus: "PASSED",
      validatedAt: validation.validatedAt,
      validatedSourceCommit:
        validation.validatedSourceCommit,
      validatedRepositoryTreeDigest:
        validation.validatedRepositoryTreeDigest,
      restoredVersionId:
        packageRecord.remote.s3.versionId,
      restoredSha256:
        packageRecord.plannedObject.expectedSha256,
      restoredSizeBytes:
        packageRecord.plannedObject.expectedSizeBytes,
      repositorySemanticRestoreStatus:
        packageRecord.packageType ===
        "PINNED_GIT_REPOSITORY"
          ? "VERIFIED"
          : "NOT_APPLICABLE",
      restoredRepositoryIdentity:
        packageRecord.packageType ===
        "PINNED_GIT_REPOSITORY"
          ? {
              commitSha:
                packageRecord.fingerprint.commitSha,
              gitTreeObjectSha1:
                packageRecord.fingerprint
                  .gitTreeObjectSha1,
              gitIndexListingSha256:
                packageRecord.fingerprint
                  .gitIndexListingSha256,
              workingTreeClean: true
            }
          : null,
      restoredAt: "2026-07-24T00:00:00.000Z",
      blocker: null
    };
  }
  resealManifest(manifest);
}

async function installMinimalLiveReplayFixture({
  root,
  manifest
}) {
  const buildManifestPath =
    "scripts/research/operational-savings/containers/_test-fixture/build-manifest.json";
  const dockerfilePath =
    "scripts/research/operational-savings/containers/_test-fixture/Dockerfile";
  const verifierPath =
    "scripts/research/operational-savings/containers/_test-fixture/verify.mjs";
  const boundFileBytes = new Map([
    [
      buildManifestPath,
      Buffer.from('{"schemaVersion":1}\n')
    ],
    [dockerfilePath, Buffer.from("FROM scratch\n")],
    [
      verifierPath,
      Buffer.from(
        'process.stdout.write("PASS\\n");\n'
      )
    ],
    ...POST_HOC_REPLAY_IMPLEMENTATION_PATHS.map(
      (path, index) => [
        path,
        Buffer.from(
          `export const cleanupReplayFixture${index} = true;\n`
        )
      ]
    )
  ]);
  const sha256ByPath = new Map();
  for (const [repositoryPath, bytes] of
    boundFileBytes) {
    const absolutePath = join(root, repositoryPath);
    await mkdir(dirname(absolutePath), {
      recursive: true
    });
    await writeFile(absolutePath, bytes);
    sha256ByPath.set(
      repositoryPath,
      await sha256Path(absolutePath)
    );
  }
  const buildInputs = [
    {
      path: "Dockerfile",
      repositoryPath: dockerfilePath,
      sha256: sha256ByPath.get(dockerfilePath),
      byteSize: boundFileBytes.get(dockerfilePath).length
    }
  ];
  const verificationInputs = [
    {
      path: "verify.mjs",
      repositoryPath: verifierPath,
      sha256: sha256ByPath.get(verifierPath),
      byteSize: boundFileBytes.get(verifierPath).length
    }
  ];
  const contentBinding = {
    status: "VERIFIED_EXACT_LOCAL_CONTENT",
    buildInputs,
    buildInputSetSha256:
      sha256CanonicalJson(buildInputs),
    verificationInputs,
    verificationInputSetSha256:
      sha256CanonicalJson(verificationInputs),
    completeInputSetSha256: sha256CanonicalJson({
      buildInputs,
      verificationInputs
    })
  };
  const sourceCommit = "b".repeat(40);
  const imageId = `sha256:${"a".repeat(64)}`;
  const repository = {
    modelId: "reopt",
    repositoryName: "retrofi-research-reopt",
    buildManifest: {
      path: buildManifestPath,
      status: "VERIFIED",
      sha256: sha256ByPath.get(buildManifestPath),
      buildEvidence: {
        contentBinding
      }
    },
    provenance: {
      sourceCommit
    },
    localImage: {
      imageId,
      verificationCommand: `node ${verifierPath}`,
      verificationStatus:
        "PASS_COMMITTED_POST_HOC_REPLAY"
    },
    remoteImage: {
      imageDigest: imageId
    }
  };

  await execFileAsync(
    "/usr/bin/git",
    ["-C", root, "init", "--quiet"]
  );
  await execFileAsync(
    "/usr/bin/git",
    [
      "-C",
      root,
      "config",
      "user.name",
      "Cleanup Replay Test"
    ]
  );
  await execFileAsync(
    "/usr/bin/git",
    [
      "-C",
      root,
      "config",
      "user.email",
      "cleanup-replay@example.test"
    ]
  );
  await execFileAsync(
    "/usr/bin/git",
    [
      "-C",
      root,
      "add",
      "--",
      ...boundFileBytes.keys()
    ]
  );
  await execFileAsync(
    "/usr/bin/git",
    [
      "-C",
      root,
      "-c",
      "commit.gpgsign=false",
      "commit",
      "--quiet",
      "-m",
      "freeze cleanup replay inputs"
    ]
  );
  const [
    contextGitCommitResult,
    contextGitTreeResult
  ] = await Promise.all([
    execFileAsync(
      "/usr/bin/git",
      ["-C", root, "rev-parse", "HEAD"],
      { encoding: "utf8" }
    ),
    execFileAsync(
      "/usr/bin/git",
      ["-C", root, "rev-parse", "HEAD^{tree}"],
      { encoding: "utf8" }
    )
  ]);
  const receipt = sealPostHocReplayReceipt({
    schemaVersion: POST_HOC_REPLAY_SCHEMA_VERSION,
    status: "PASS_COMMITTED_POST_HOC_REPLAY",
    semantics: POST_HOC_REPLAY_SEMANTICS,
    executionEnvironment:
      POST_HOC_REPLAY_EXECUTION_ENVIRONMENT,
    contextGitCommit:
      contextGitCommitResult.stdout.trim(),
    contextGitTree:
      contextGitTreeResult.stdout.trim(),
    createdAt: "2026-07-24T00:00:00.000Z",
    implementationFiles:
      POST_HOC_REPLAY_IMPLEMENTATION_PATHS.map(
        (path) => ({
          path,
          sha256: sha256ByPath.get(path)
        })
      ),
    models: [
      {
        modelId: repository.modelId,
        buildManifestPath,
        buildManifestSha256:
          repository.buildManifest.sha256,
        completeInputSetSha256:
          contentBinding.completeInputSetSha256,
        imageId,
        imageDigest: imageId,
        sourceCommit,
        verifierPath,
        verifierSha256:
          sha256ByPath.get(verifierPath),
        exitCode: 0,
        stdoutSha256: "6".repeat(64),
        stdoutSizeBytes: 5,
        stderrSha256: "7".repeat(64),
        stderrSizeBytes: 0,
        replayedAt: "2026-07-24T00:00:01.000Z",
        replayKind:
          POST_HOC_REPLAY_SEMANTICS.replayKind,
        historicalBuildContext:
          POST_HOC_REPLAY_SEMANTICS
            .historicalBuildContext
      }
    ]
  });
  const receiptPath = join(
    root,
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
  await execFileAsync(
    "/usr/bin/git",
    [
      "-C",
      root,
      "add",
      "--",
      POST_HOC_REPLAY_RECEIPT_RELATIVE_PATH
    ]
  );
  await execFileAsync(
    "/usr/bin/git",
    [
      "-C",
      root,
      "-c",
      "commit.gpgsign=false",
      "commit",
      "--quiet",
      "-m",
      "commit cleanup replay receipt"
    ]
  );
  manifest.destination.ecr = {
    repositories: [repository],
    postHocReplayReceipt: {
      path: POST_HOC_REPLAY_RECEIPT_RELATIVE_PATH,
      status: "PASS_COMMITTED_POST_HOC_REPLAY",
      blocker: null,
      receipt
    }
  };
  resealManifest(manifest);
}

async function withTemporaryPackage(callback) {
  const root = await mkdtemp(join(tmpdir(), "retrofi-research-storage-"));
  try {
    const cacheRoot = join(root, CACHE_RELATIVE_PATH);
    await mkdir(cacheRoot, { recursive: true });
    const localPath = join(cacheRoot, "tiny-source.json");
    await writeFile(localPath, '{"real":true}\n', "utf8");
    const sha256 = await sha256Path(localPath);
    const sizeBytes = 14;
    const packageRecord = {
      packageId: "cache-file:tiny-source.json",
      packageType: "SOURCE_ARTIFACT",
      localPath: `${CACHE_RELATIVE_PATH}/tiny-source.json`,
      fingerprint: {
        algorithm: "SHA-256",
        digest: sha256
      },
      plannedObject: {
        key:
          `raw/test-source/test-release/${sha256}/` +
          "tiny-source.json",
        contentType: "application/json",
        expectedSizeBytes: sizeBytes,
        expectedSha256: sha256,
        uploadReady: true,
        state: "PLANNED"
      },
      sourceOrganization: "Test Organization",
      source: {
        status: "DOCUMENTED",
        urls: ["https://example.test/tiny-source.json"],
        standardIds: ["TEST-STANDARD"],
        blocker: null
      },
      release: {
        status: "PINNED",
        identities: ["test-release"],
        commitShas: [],
        blocker: null
      },
      acquisition: {
        status: "DOCUMENTED",
        modes: ["TEST_FIXTURE"],
        timestamps: ["2026-07-24T00:00:00.000Z"],
        blocker: null
      },
      license: {
        status: "DOCUMENTED_REVIEW_RETAINED",
        statements: ["Test fixture license"],
        legalReview: [],
        blocker: null
      },
      ingestion: {
        status: "REFERENCED_BY_RESEARCH_PROOF",
        manifests: ["test-manifest.json"],
        adapters: [],
        blocker: null
      },
      s3Uri:
        `s3://${RESEARCH_S3_BUCKET}/raw/test-source/test-release/` +
        `${sha256}/tiny-source.json`,
      acquisitionTimestamp: "2026-07-24T00:00:00.000Z",
      localRetentionPolicy:
        "DELETE_AFTER_VERIFIED_MIGRATION",
      cleanupEligibility: {
        status: "BLOCKED",
        activeConsumerPaths: ["test-consumer"],
        validatedConsumerPaths: [],
        validationCommand: null,
        validationStatus: "NOT_RUN",
        validatedAt: null,
        validatedSourceCommit: null,
        validatedRepositoryTreeDigest: null,
        restoredVersionId: null,
        restoredSha256: null,
        restoredAt: null,
        blocker: "test"
      },
      remote: {
        s3: {
          bucket: RESEARCH_S3_BUCKET,
          key:
            `raw/test-source/test-release/${sha256}/` +
            "tiny-source.json",
          s3Uri:
            `s3://${RESEARCH_S3_BUCKET}/raw/test-source/test-release/` +
            `${sha256}/tiny-source.json`,
          versionId: null,
          verificationStatus: "NOT_UPLOADED",
          deletionStatus: "LOCAL_RETAINED"
        }
      }
    };
    const manifest = sealManifest({
      schemaVersion:
        "operational-savings/research-storage-migration-v1",
      destination: {
        s3: {
          accountId: RESEARCH_AWS_ACCOUNT_ID,
          region: RESEARCH_AWS_REGION,
          bucket: RESEARCH_S3_BUCKET,
          profile: null,
          verificationStatus: "NOT_CHECKED",
          blocker: "test"
        }
      },
      packages: [packageRecord],
      execution: {
        uploadsPerformed: false,
        localFilesDeleted: false
      }
    });
    await installMinimalLiveReplayFixture({
      root,
      manifest
    });
    return await callback({
      root,
      localPath,
      manifest,
      packageRecord,
      sha256,
      sizeBytes
    });
  } finally {
    await rm(root, { recursive: true, force: true });
  }
}

async function addSecondTemporaryPackage(context) {
  const content = '{"real":false}\n';
  const relativePath =
    `${CACHE_RELATIVE_PATH}/tiny-source-2.json`;
  const localPath = join(context.root, relativePath);
  await writeFile(localPath, content, "utf8");
  const sha256 = await sha256Path(localPath);
  const sizeBytes = Buffer.byteLength(content);
  const key =
    `raw/test-source/test-release/${sha256}/` +
    "tiny-source-2.json";
  const packageRecord = structuredClone(context.packageRecord);
  Object.assign(packageRecord, {
    packageId: "cache-file:tiny-source-2.json",
    localPath: relativePath,
    s3Uri: `s3://${RESEARCH_S3_BUCKET}/${key}`
  });
  Object.assign(packageRecord.fingerprint, {
    digest: sha256
  });
  Object.assign(packageRecord.plannedObject, {
    key,
    expectedSizeBytes: sizeBytes,
    expectedSha256: sha256
  });
  Object.assign(packageRecord.remote.s3, {
    key,
    s3Uri: `s3://${RESEARCH_S3_BUCKET}/${key}`,
    versionId: null,
    verificationStatus: "NOT_UPLOADED"
  });
  context.manifest.packages.push(packageRecord);
  resealManifest(context.manifest);
  return {
    packageRecord,
    localPath,
    sha256,
    sizeBytes,
    content
  };
}

function markRemoteVerified(packageRecord, sha256, sizeBytes) {
  Object.assign(packageRecord.remote.s3, {
    versionId: `version-${packageRecord.packageId}`,
    etag: '"etag"',
    contentLength: sizeBytes,
    contentType: packageRecord.plannedObject.contentType,
    checksumSha256Base64: Buffer.from(
      sha256,
      "hex"
    ).toString("base64"),
    metadataSha256: sha256,
    serverSideEncryption: "aws:kms",
    kmsKeyId: "test-key",
    verifiedAt: "2026-07-24T00:00:00.000Z",
    verificationStatus: "VERIFIED",
    deletionStatus: "LOCAL_RETAINED"
  });
}

async function withAuditedCleanupFixture(callback) {
  return withTemporaryPackage(async (context) => {
    const externalRoot = join(context.root, "audited-temp");
    const exactPath = join(externalRoot, "diagnostic.txt");
    const directoryPath = join(externalRoot, "expanded");
    const nestedPath = join(directoryPath, "nested.bin");
    await mkdir(directoryPath, { recursive: true });
    await writeFile(exactPath, "diagnostic\n", "utf8");
    await writeFile(nestedPath, "nested\n", "utf8");
    const exactSha256 = await sha256Path(exactPath);
    const directoryIdentity =
      await auditedDirectoryTreeIdentity(directoryPath);
    const imageSha256 = "d".repeat(64);
    const imageId = `sha256:${imageSha256}`;
    const localImageTag =
      "retrofit-research-test:test-release-arm64";
    const repositoryUri =
      "945129430686.dkr.ecr.us-east-1.amazonaws.com/retrofi-research-test";
    const ecrImageTag = `${repositoryUri}:test-release-arm64`;
    const ecrImageUri = `${repositoryUri}@${imageId}`;
    const imageSizeBytes = 321;
    const remoteImageSizeBytes = 123;
    const imageManifestMediaType =
      "application/vnd.oci.image.manifest.v1+json";
    const imageBuiltAt =
      "2026-07-24T20:00:00.000000000Z";
    const buildManifestRepositoryPath =
      "scripts/research/operational-savings/containers/reopt/build-manifest.json";
    const dockerfileRepositoryPath =
      "scripts/research/operational-savings/containers/reopt/Dockerfile";
    const verifierRepositoryPath =
      "scripts/research/operational-savings/containers/reopt/verify.mjs";
    const boundFileBytes = new Map([
      [
        buildManifestRepositoryPath,
        Buffer.from('{"schemaVersion":1}\n')
      ],
      [
        dockerfileRepositoryPath,
        Buffer.from("FROM scratch\n")
      ],
      [
        verifierRepositoryPath,
        Buffer.from(
          'process.stdout.write("PASS\\n");\n'
        )
      ],
      ...POST_HOC_REPLAY_IMPLEMENTATION_PATHS.map(
        (path, index) => [
          path,
          Buffer.from(
            `export const replayFixture${index} = true;\n`
          )
        ]
      )
    ]);
    const boundFileSha256 = new Map();
    for (const [repositoryPath, bytes] of
      boundFileBytes) {
      const absolutePath = join(
        context.root,
        repositoryPath
      );
      await mkdir(dirname(absolutePath), {
        recursive: true
      });
      await writeFile(absolutePath, bytes);
      boundFileSha256.set(
        repositoryPath,
        await sha256Path(absolutePath)
      );
    }
    const buildManifestSha256 =
      boundFileSha256.get(
        buildManifestRepositoryPath
      );
    const buildInputs = [
      {
        path: "Dockerfile",
        repositoryPath: dockerfileRepositoryPath,
        sha256:
          boundFileSha256.get(
            dockerfileRepositoryPath
          ),
        byteSize:
          boundFileBytes.get(
            dockerfileRepositoryPath
          ).length
      }
    ];
    const verificationInputs = [
      {
        path: "verify.mjs",
        repositoryPath: verifierRepositoryPath,
        sha256:
          boundFileSha256.get(
            verifierRepositoryPath
          ),
        byteSize:
          boundFileBytes.get(
            verifierRepositoryPath
          ).length
      }
    ];
    const buildContentBinding = {
      status: "VERIFIED_EXACT_LOCAL_CONTENT",
      buildInputs,
      buildInputSetSha256:
        sha256CanonicalJson(buildInputs),
      verificationInputs,
      verificationInputSetSha256:
        sha256CanonicalJson(verificationInputs),
      completeInputSetSha256: sha256CanonicalJson({
        buildInputs,
        verificationInputs
      })
    };
    const audit = {
      schemaVersion:
        "operational-savings/research-local-artifact-audit-v1",
      generatedAt: "2026-07-24T00:00:00.000Z",
      scope: {
        worktree: context.root,
        excluded: [
          "Active contractor web-enrichment artifacts"
        ]
      },
      allowedDispositions: [
        "MIGRATE_UNIQUE",
        "DUPLICATE_CANONICAL",
        "DISPOSABLE_REPRODUCIBLE",
        "SUPERSEDED_TRANSIENT"
      ],
      artifactGroups: [
        {
          groupId: "test-files",
          originalPath: externalRoot,
          artifactType: "TEST_TEMP",
          disposition: "SUPERSEDED_TRANSIENT",
          cleanupPrerequisite: "Final validation.",
          cleanupReason: "Test temporary.",
          cleanupStatus: "LOCAL_RETAINED",
          childFiles: [
            {
              originalPath: exactPath,
              byteSize: 11,
              sha256: exactSha256
            }
          ]
        },
        {
          groupId: "test-directories",
          originalPath: externalRoot,
          artifactType: "TEST_DIRECTORY",
          disposition: "DISPOSABLE_REPRODUCIBLE",
          cleanupPrerequisite: "Final validation.",
          cleanupReason: "Test directory.",
          cleanupStatus: "LOCAL_RETAINED",
          directoryEntries: [
            {
              originalPath: directoryPath,
              fileCount: 1,
              symlinkCount: 0,
              logicalBytes: 7,
              treeDigestSchemaVersion:
                directoryIdentity.treeDigestSchemaVersion,
              fullTreeSha256:
                directoryIdentity.fullTreeSha256
            },
            {
              originalPath: "docker-buildkit://default",
              artifactType: "SHARED_CONTAINER_BUILD_CACHE",
              fileCount: 1,
              symlinkCount: 0,
              logicalBytes: null
            }
          ]
        },
        {
          groupId: "test-image",
          originalPath: "docker-image://local",
          artifactType: "RUNNABLE_MODEL_CONTAINER_IMAGE",
          disposition: "DUPLICATE_CANONICAL",
          cleanupPrerequisite: "Verified ECR image.",
          cleanupReason: "Test image.",
          cleanupStatus: "LOCAL_RETAINED",
          childFiles: [
            {
              originalPath:
                `docker-image://${localImageTag}`,
              byteSize: imageSizeBytes,
              sha256: imageSha256,
              canonicalPackageLinkage: ecrImageUri
            }
          ]
        }
      ]
    };
    const auditPath = join(
      context.root,
      "docs/operational-savings-automation-research/research-local-artifact-audit.v1.json"
    );
    await mkdir(dirname(auditPath), { recursive: true });
    await writeFile(
      auditPath,
      `${JSON.stringify(audit, null, 2)}\n`,
      "utf8"
    );
    context.manifest.originalLocalArtifacts = [];
    context.manifest.localArtifactAudit =
      await loadLocalArtifactAudit({
        repoRoot: context.root,
        originalLocalArtifacts: []
      });
    context.manifest.destination.ecr = {
      repositories: [
        {
          modelId: "reopt",
          repositoryName: "retrofi-research-test",
          expectedRepositoryUri: repositoryUri,
          buildManifest: {
            path: buildManifestRepositoryPath,
            status: "VERIFIED",
            sha256: buildManifestSha256,
            buildEvidence: {
              status:
                "COMPLETED_AND_EXACT_IMAGE_VERIFIED",
              builtAt: imageBuiltAt,
              builtAtEvidence: {
                kind: "LOCAL_IMAGE_CONFIG_CREATED",
                imageId,
                inspectionField: ".Created"
              },
              historicalInvocationCaptured: false,
              commandSemantics:
                "Source-controlled reproduction command.",
              reproductionCommand:
                "docker buildx build --platform linux/arm64 test",
              arguments: {
                REOPT_COMMIT: "b".repeat(40),
                REOPT_ARCHIVE_SHA256: "c".repeat(64)
              },
              statusEvidence: {
                localImageId: imageId,
                ecrImageDigest: imageId,
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
              contentBinding: buildContentBinding
            }
          },
          provenance: {
            sourceRepository:
              "https://github.com/example/research-model",
            sourceCommit: "b".repeat(40),
            sourceRelease: "test-release",
            modelVersion: "test-release",
            purpose: "Research-only model replay.",
            sourceOrganization: "Example research source",
            sourceRole: "EXACT_CONTAINER_SOURCE_ARCHIVE",
            official: true,
            sourceArchiveSha256: "c".repeat(64),
            buildManifestSha256:
              buildManifestSha256,
            license: {
              identifier: "Apache-2.0",
              path: "/opt/model/LICENSE",
              sha256: "e".repeat(64),
              status: "RECORDED_AND_HASH_VERIFIED",
              attributionStatus:
                "SOURCE_ORGANIZATION_AND_LICENSE_RECORDED"
            }
          },
          localImage: {
            repositoryTag: localImageTag,
            imageTag: "test-release-arm64",
            imageId,
            repositoryDigests: [
              `retrofit-research-test@${imageId}`
            ],
            verificationCommand:
              `node ${verifierRepositoryPath}`,
            verificationStatus:
              "PASS_COMMITTED_POST_HOC_REPLAY"
          },
          remoteImage: {
            repositoryName: "retrofi-research-test",
            repositoryUri,
            imageTag: "test-release-arm64",
            imageDigest: imageId,
            imageUri: ecrImageUri,
            imageSizeBytes: remoteImageSizeBytes,
            imageManifestMediaType,
            exactDigestPulled: true,
            runtimeVerificationStatus: "PASS",
            verificationStatus: "VERIFIED_EXACT_DIGEST",
            scan: {
              status: "COMPLETE",
              completedAt: "2026-07-24T20:05:00.000Z",
              critical: 0,
              high: 1,
              medium: 2,
              low: 3
            }
          }
        }
      ]
    };
    const replayRepository =
      context.manifest.destination.ecr.repositories[0];
    await execFileAsync(
      "/usr/bin/git",
      ["-C", context.root, "init", "--quiet"]
    );
    await execFileAsync(
      "/usr/bin/git",
      [
        "-C",
        context.root,
        "config",
        "user.name",
        "Audited Replay Test"
      ]
    );
    await execFileAsync(
      "/usr/bin/git",
      [
        "-C",
        context.root,
        "config",
        "user.email",
        "audited-replay@example.test"
      ]
    );
    await execFileAsync(
      "/usr/bin/git",
      [
        "-C",
        context.root,
        "add",
        "--",
        ...boundFileBytes.keys()
      ]
    );
    await execFileAsync(
      "/usr/bin/git",
      [
        "-C",
        context.root,
        "-c",
        "commit.gpgsign=false",
        "commit",
        "--quiet",
        "-m",
        "freeze audited replay inputs"
      ]
    );
    const [
      contextGitCommitResult,
      contextGitTreeResult
    ] = await Promise.all([
      execFileAsync(
        "/usr/bin/git",
        [
          "-C",
          context.root,
          "rev-parse",
          "HEAD"
        ],
        { encoding: "utf8" }
      ),
      execFileAsync(
        "/usr/bin/git",
        [
          "-C",
          context.root,
          "rev-parse",
          "HEAD^{tree}"
        ],
        { encoding: "utf8" }
      )
    ]);
    const contextGitCommit =
      contextGitCommitResult.stdout.trim();
    const contextGitTree =
      contextGitTreeResult.stdout.trim();
    const replayReceipt = sealPostHocReplayReceipt({
      schemaVersion: POST_HOC_REPLAY_SCHEMA_VERSION,
      status: "PASS_COMMITTED_POST_HOC_REPLAY",
      semantics: POST_HOC_REPLAY_SEMANTICS,
      executionEnvironment:
        POST_HOC_REPLAY_EXECUTION_ENVIRONMENT,
      contextGitCommit,
      contextGitTree,
      createdAt: "2026-07-24T20:04:00.000Z",
      implementationFiles:
        POST_HOC_REPLAY_IMPLEMENTATION_PATHS.map(
          (path) => ({
            path,
            sha256:
              boundFileSha256.get(path)
          })
        ),
      models: [
        {
          modelId: replayRepository.modelId,
          buildManifestPath:
            replayRepository.buildManifest.path,
          buildManifestSha256:
            replayRepository.buildManifest.sha256,
          completeInputSetSha256:
            buildContentBinding.completeInputSetSha256,
          imageId,
          imageDigest: imageId,
          sourceCommit:
            replayRepository.provenance.sourceCommit,
          verifierPath:
            verificationInputs[0].repositoryPath,
          verifierSha256:
            verificationInputs[0].sha256,
          exitCode: 0,
          stdoutSha256: "6".repeat(64),
          stdoutSizeBytes: 5,
          stderrSha256: "7".repeat(64),
          stderrSizeBytes: 0,
          replayedAt: "2026-07-24T20:04:01.000Z",
          replayKind:
            POST_HOC_REPLAY_SEMANTICS.replayKind,
          historicalBuildContext:
            POST_HOC_REPLAY_SEMANTICS
              .historicalBuildContext
        }
      ]
    });
    context.manifest.destination.ecr.postHocReplayReceipt = {
      path: POST_HOC_REPLAY_RECEIPT_RELATIVE_PATH,
      status: "PASS_COMMITTED_POST_HOC_REPLAY",
      blocker: null,
      receipt: replayReceipt
    };
    const replayReceiptPath = join(
      context.root,
      POST_HOC_REPLAY_RECEIPT_RELATIVE_PATH
    );
    await mkdir(dirname(replayReceiptPath), {
      recursive: true
    });
    await writeFile(
      replayReceiptPath,
      `${JSON.stringify(replayReceipt, null, 2)}\n`,
      "utf8"
    );
    await execFileAsync(
      "/usr/bin/git",
      [
        "-C",
        context.root,
        "add",
        "--",
        POST_HOC_REPLAY_RECEIPT_RELATIVE_PATH
      ]
    );
    await execFileAsync(
      "/usr/bin/git",
      [
        "-C",
        context.root,
        "-c",
        "commit.gpgsign=false",
        "commit",
        "--quiet",
        "-m",
        "commit audited replay receipt"
      ]
    );
    const durableArtifactPackages = [
      {
        packageId: "git-repository:reopt",
        packageType: "PINNED_GIT_REPOSITORY",
        sha256: "4".repeat(64),
        sizeBytes: 100,
        repositoryParent: true
      },
      {
        packageId:
          "model-support:reopt:build-manifest.json",
        packageType: "CONTAINER_BUILD_METADATA",
        sha256: buildManifestSha256,
        sizeBytes: 101
      },
      {
        packageId: "model-support:test:source-archive",
        packageType: "SOURCE_ARTIFACT",
        sha256: "c".repeat(64),
        sizeBytes: 102
      },
      {
        packageId: "repository-license:reopt:LICENSE",
        packageType: "REPOSITORY_LICENSE_ARTIFACT",
        sha256: "e".repeat(64),
        sizeBytes: 103,
        repositoryRelativePath: "LICENSE",
        licenseRole: "PROJECT_LICENSE"
      },
      {
        packageId: "repository-license:reopt:NOTICE",
        packageType: "REPOSITORY_LICENSE_ARTIFACT",
        sha256: "f".repeat(64),
        sizeBytes: 104,
        repositoryRelativePath: "NOTICE",
        licenseRole: "PROJECT_NOTICE"
      },
      {
        packageId:
          "repository-license:reopt:transcrypt:LICENSE",
        packageType: "REPOSITORY_LICENSE_ARTIFACT",
        sha256: "1".repeat(64),
        sizeBytes: 105,
        repositoryRelativePath: "transcrypt/LICENSE",
        licenseRole: "VENDORED_DEPENDENCY_LICENSE"
      }
    ].map((artifact) => {
      const packageRecord = structuredClone(
        context.packageRecord
      );
      const filename = artifact.packageId
        .replaceAll(":", "-")
        .replaceAll("/", "-");
      const key =
        `raw/test-ecr/test-release/${artifact.sha256}/` +
        filename;
      Object.assign(packageRecord, {
        packageId: artifact.packageId,
        packageType: artifact.packageType,
        localPath: `${CACHE_RELATIVE_PATH}/${filename}`,
        s3Uri: `s3://${RESEARCH_S3_BUCKET}/${key}`
      });
      Object.assign(packageRecord.fingerprint, {
        digest: artifact.sha256
      });
      Object.assign(packageRecord.plannedObject, {
        key,
        contentType: "application/octet-stream",
        expectedSizeBytes: artifact.sizeBytes,
        expectedSha256: artifact.sha256
      });
      if (artifact.repositoryRelativePath) {
        packageRecord.parentPackageId =
          "git-repository:reopt";
        packageRecord.repositoryIdentity = {
          repositoryName: "reopt",
          remoteUrl:
            "https://github.com/example/research-model.git",
          commitSha: "b".repeat(40),
          gitTreeObjectSha1: "4".repeat(40),
          repositoryRelativePath:
            artifact.repositoryRelativePath
        };
        packageRecord.license = {
          ...packageRecord.license,
          licenseRole: artifact.licenseRole
        };
      }
      if (artifact.repositoryParent === true) {
        Object.assign(packageRecord.fingerprint, {
          commitSha: "b".repeat(40),
          gitTreeObjectSha1: "4".repeat(40),
          workingTreeClean: true
        });
        packageRecord.content = {
          repositoryName: "reopt",
          remoteUrl:
            "https://github.com/example/research-model.git"
        };
      }
      Object.assign(packageRecord.remote.s3, {
        key,
        s3Uri: `s3://${RESEARCH_S3_BUCKET}/${key}`
      });
      markRemoteVerified(
        packageRecord,
        artifact.sha256,
        artifact.sizeBytes
      );
      return packageRecord;
    });
    context.manifest.packages.push(
      ...durableArtifactPackages
    );
    markRemoteVerified(
      context.packageRecord,
      context.sha256,
      context.sizeBytes
    );
    markCleanupEligible(context.manifest, [
      context.packageRecord,
      ...durableArtifactPackages
    ]);
    await callback({
      ...context,
      auditPath,
      externalRoot,
      exactPath,
      directoryPath,
      imageId,
      imageSizeBytes,
      localImageTag,
      ecrImageTag,
      ecrImageUri,
      remoteImageSizeBytes,
      imageManifestMediaType,
      imageBuiltAt
    });
  });
}

function auditedEcrControlResult(args, context) {
  const repositoryOption = args.includes(
    "--repository-name"
  )
    ? "--repository-name"
    : "--repository-names";
  const repositoryName =
    args[args.indexOf(repositoryOption) + 1];
  if (
    args[0] !== "ecr" ||
    repositoryName !== "retrofi-research-test"
  ) {
    return null;
  }
  if (args[1] === "describe-repositories") {
    return success({
      repositories: [
        {
          registryId: RESEARCH_AWS_ACCOUNT_ID,
          repositoryName: "retrofi-research-test",
          repositoryUri:
            "945129430686.dkr.ecr.us-east-1.amazonaws.com/retrofi-research-test",
          imageTagMutability: "IMMUTABLE",
          imageScanningConfiguration: {
            scanOnPush: true
          },
          encryptionConfiguration: {
            encryptionType: "AES256"
          }
        }
      ]
    });
  }
  if (args[1] === "get-lifecycle-policy") {
    return success({
      registryId: RESEARCH_AWS_ACCOUNT_ID,
      repositoryName: "retrofi-research-test",
      lifecyclePolicyText: JSON.stringify({
        rules: [
          {
            rulePriority: 1,
            selection: {
              tagStatus: "untagged",
              countType: "sinceImagePushed",
              countUnit: "days",
              countNumber: 14
            },
            action: { type: "expire" }
          }
        ]
      })
    });
  }
  if (args[1] === "describe-images") {
    return success({
      imageDetails: [
        {
          registryId: RESEARCH_AWS_ACCOUNT_ID,
          repositoryName: "retrofi-research-test",
          imageDigest: context.imageId,
          imageTags: ["test-release-arm64"],
          imageSizeInBytes:
            context.remoteImageSizeBytes,
          imageManifestMediaType:
            context.imageManifestMediaType
        }
      ]
    });
  }
  if (args[1] === "describe-image-scan-findings") {
    return success({
      registryId: RESEARCH_AWS_ACCOUNT_ID,
      repositoryName: "retrofi-research-test",
      imageId: {
        imageDigest: context.imageId
      },
      imageScanStatus: {
        status: "COMPLETE"
      },
      imageScanFindings: {
        imageScanCompletedAt:
          "2026-07-24T20:05:00.000Z",
        findingSeverityCounts: {
          HIGH: 1,
          MEDIUM: 2,
          LOW: 3
        }
      }
    });
  }
  return null;
}

test("accepts only the dedicated research destination", () => {
  expect(validateResearchDestination(destination)).toEqual(destination);
  for (const profile of [
    "gbs",
    "retrofi-management",
    "retrofi-prod",
    "default",
    "another-research-profile"
  ]) {
    expect(() =>
      validateResearchDestination({ ...destination, profile })
    ).toThrow(/UNSAFE_AWS_PROFILE/);
  }
  expect(() =>
    validateResearchDestination({
      ...destination,
      bucket: "gbs-retrofi-runtime-cache"
    })
  ).toThrow(/UNSAFE_S3_BUCKET/);
  expect(() =>
    validateResearchDestination({
      ...destination,
      region: "us-east-2"
    })
  ).toThrow(/UNSAFE_AWS_REGION/);
});

test("strips ambient AWS credentials, profiles, regions, and endpoint overrides", () => {
  expect(
    sanitizedAwsEnvironment({
      HOME: "/Users/test",
      PATH: "/attacker",
      NODE_OPTIONS: "--import=/tmp/forge.mjs",
      AWS_ACCESS_KEY_ID: "ambient",
      AWS_SECRET_ACCESS_KEY: "ambient",
      AWS_SESSION_TOKEN: "ambient",
      AWS_PROFILE: "retrofi-prod",
      AWS_REGION: "us-east-2",
      AWS_ENDPOINT_URL: "http://127.0.0.1:9999",
      AWS_ENDPOINT_URL_S3: "http://127.0.0.1:9999",
      AWS_CONFIG_FILE: "/tmp/attacker-config",
      AWS_SHARED_CREDENTIALS_FILE:
        "/tmp/attacker-credentials"
    })
  ).toEqual({
    HOME: "/Users/test",
    TMPDIR: "/tmp",
    TMP: "/tmp",
    TEMP: "/tmp",
    PATH:
      "/usr/local/bin:/opt/homebrew/bin:/usr/bin:/bin",
    LANG: "C",
    LC_ALL: "C",
    TZ: "UTC",
    TERM: "dumb",
    CI: "1",
    NO_COLOR: "1",
    AWS_PAGER: "",
    AWS_CLI_AUTO_PROMPT: "off",
    AWS_EC2_METADATA_DISABLED: "true",
    AWS_IGNORE_CONFIGURED_ENDPOINT_URLS: "true"
  });
});

test("uses closed subprocess environments for Git, archives, Docker, and Node", () => {
  const environments = [
    gitSubprocessEnvironment(),
    archiveSubprocessEnvironment(),
    dockerSubprocessEnvironment(),
    nodeSubprocessEnvironment()
  ];
  for (const environment of environments) {
    expect(environment).not.toHaveProperty("NODE_OPTIONS");
    expect(environment).not.toHaveProperty("BASH_ENV");
    expect(environment).not.toHaveProperty("ENV");
    expect(environment).not.toHaveProperty("GIT_DIR");
    expect(environment).not.toHaveProperty(
      "GIT_CONFIG_PARAMETERS"
    );
    expect(environment).not.toHaveProperty("TAR_OPTIONS");
    expect(environment).not.toHaveProperty("UNZIP");
    expect(environment).not.toHaveProperty("UNZIPOPT");
  }
  expect(gitSubprocessEnvironment()).toMatchObject({
    HOME: "/var/empty",
    GIT_CONFIG_GLOBAL: "/dev/null",
    GIT_CONFIG_SYSTEM: "/dev/null",
    GIT_CONFIG_NOSYSTEM: "1",
    GIT_CONFIG_COUNT: "0",
    GIT_TERMINAL_PROMPT: "0"
  });
  expect(dockerSubprocessEnvironment()).toMatchObject({
    HOME: "/var/empty",
    DOCKER_CONFIG: "/var/empty",
    DOCKER_HOST: "unix:///var/run/docker.sock"
  });
});

test("canonical inventory freshness detects content-set changes while ignoring migration state", async () => {
  await withTemporaryPackage(async ({ manifest }) => {
    const originalLocalArtifact = {
      path: "/private/tmp/source-artifact.bin",
      relation:
        "EXACT_BYTE_SOURCE_FOR_CANONICAL_CACHE_COPY",
      expectedSizeBytes: 12,
      expectedSha256: "a".repeat(64),
      cleanupStatus: "LOCAL_RETAINED"
    };
    manifest.originalLocalArtifacts = [
      {
        ...originalLocalArtifact,
        canonicalPackageId:
          manifest.packages[0].packageId,
        canonicalLocalPath:
          manifest.packages[0].localPath,
        plannedS3Uri: manifest.packages[0].s3Uri
      }
    ];
    manifest.packages[0].originalLocalArtifacts = [
      originalLocalArtifact
    ];
    bindCanonicalInventory(manifest);
    expect(
      assertCanonicalInventoryIdentity(manifest)
    ).toBe(manifest.canonicalInventory);

    const migrationOnlyChange =
      structuredClone(manifest);
    migrationOnlyChange.packages[0].remote.s3 = {
      ...migrationOnlyChange.packages[0].remote.s3,
      versionId: "verified-version",
      verificationStatus: "VERIFIED"
    };
    migrationOnlyChange.originalLocalArtifacts[0]
      .cleanupStatus = "DELETED_AFTER_VERIFIED_MIGRATION";
    migrationOnlyChange.originalLocalArtifacts[0]
      .deletedAt = "2026-07-24T00:00:00.000Z";
    migrationOnlyChange.packages[0]
      .originalLocalArtifacts[0].cleanupStatus =
      "DELETED_AFTER_VERIFIED_MIGRATION";
    bindCanonicalInventory(migrationOnlyChange);
    expect(
      assertCanonicalInventoriesMatch({
        manifest,
        currentInventory: migrationOnlyChange
      })
    ).toMatchObject({
      status: "VERIFIED_CURRENT",
      packageCount: 1
    });

    const restoredLocalMetadata =
      structuredClone(manifest);
    restoredLocalMetadata.packages[0]
      .acquisitionTimestamp =
      "2026-07-25T23:26:40.972Z";
    restoredLocalMetadata.packages[0]
      .acquisition.timestamps = [
      "2026-07-25T23:26:40.972Z"
    ];
    bindCanonicalInventory(restoredLocalMetadata);
    expect(
      assertCanonicalInventoriesMatch({
        manifest,
        currentInventory: restoredLocalMetadata
      })
    ).toMatchObject({
      status: "VERIFIED_CURRENT",
      packageCount: 1
    });

    const repositoryManifest =
      structuredClone(manifest);
    repositoryManifest.packages[0].packageType =
      "PINNED_GIT_REPOSITORY";
    repositoryManifest.packages[0].coverage = {
      mode: "RECURSIVE_LOGICAL_PACKAGE",
      includesVersionControlMetadata: true,
      physicalFileCount: 100,
      physicalSizeBytes: 10_000,
      symbolicLinkCount: 0,
      trackedFileCount: 90,
      trackedCheckoutSizeBytes: 9_000,
      note: "Pinned repository coverage"
    };
    bindCanonicalInventory(repositoryManifest);
    const restoredRepositoryMetadata =
      structuredClone(repositoryManifest);
    restoredRepositoryMetadata.packages[0]
      .coverage.physicalFileCount = 95;
    restoredRepositoryMetadata.packages[0]
      .coverage.physicalSizeBytes = 9_500;
    bindCanonicalInventory(
      restoredRepositoryMetadata
    );
    expect(
      assertCanonicalInventoriesMatch({
        manifest: repositoryManifest,
        currentInventory:
          restoredRepositoryMetadata
      })
    ).toMatchObject({
      status: "VERIFIED_CURRENT",
      packageCount: 1
    });

    const changedContent = structuredClone(manifest);
    changedContent.packages[0].fingerprint.digest =
      "f".repeat(64);
    bindCanonicalInventory(changedContent);
    expect(() =>
      assertCanonicalInventoriesMatch({
        manifest,
        currentInventory: changedContent
      })
    ).toThrow(/CANONICAL_INVENTORY_STALE/);

    manifest.packages[0].fingerprint.digest =
      "e".repeat(64);
    expect(() =>
      assertCanonicalInventoryIdentity(manifest)
    ).toThrow(/CANONICAL_INVENTORY_IDENTITY_MISMATCH/);
  });
});

cacheBackedTest("builds a complete logical-package inventory without an AWS call", {
  timeout: 120_000
}, async () => {
  const manifest = await buildTestInventory();
  expect(validateManifestDigest(manifest)).toBe(manifest);
  expect(manifest.execution).toMatchObject({
    awsCallsPerformedByInventory: false,
    uploadsPerformed: false,
    localFilesDeleted: false,
    finalCleanupValidation: {
      status: "NOT_RUN",
      noActiveConsumersConfirmed: false
    }
  });
  expect(manifest.coverage.uncoveredPaths).toEqual([]);
  expect(manifest.coverage.coveredFileCount).toBe(
    manifest.coverage.discovered.fileCount
  );
  expect(manifest.coverage.coveredSizeBytes).toBe(
    manifest.coverage.discovered.totalSizeBytes
  );
  expect(
    manifest.packages.filter(
      (entry) => entry.packageType === "PINNED_GIT_REPOSITORY"
    )
  ).toHaveLength(4);
  const repositoryLicenses = manifest.packages.filter(
    (entry) =>
      entry.packageType === "REPOSITORY_LICENSE_ARTIFACT"
  );
  const expectedRepositoryLicensePaths = [
    "amo-tools-suite/LICENSE.txt",
    "amo-tools-suite/include/fast-cpp-csv-parser/LICENSE",
    "reopt/LICENSE",
    "reopt/NOTICE",
    "reopt/transcrypt/LICENSE",
    "scout/LICENSE.md",
    "ssc/LICENSE",
    "ssc/lpsolve/LICENSE.htm",
    "ssc/nlopt/LICENSE.htm"
  ];
  expect(repositoryLicenses).toHaveLength(9);
  expect(
    manifest.summary.repositoryLicenseArtifactPackageCount
  ).toBe(9);
  expect(
    repositoryLicenses
      .map((entry) =>
        entry.localPath.replace(
          `${CACHE_RELATIVE_PATH}/repos/`,
          ""
        )
      )
      .sort()
  ).toEqual(expectedRepositoryLicensePaths);
  for (const packageRecord of repositoryLicenses) {
    expect(packageRecord).toMatchObject({
      parentPackageId: expect.stringMatching(
        /^git-repository:/
      ),
      coverage: {
        mode: "DUPLICATE_CHILD_OBJECT",
        physicalOwnership: "PARENT_REPOSITORY_PACKAGE"
      },
      localRetentionPolicy:
        "DELETE_WITH_PARENT_REPOSITORY",
      localLifecycle: {
        ownerPackageId: packageRecord.parentPackageId,
        ownershipMode:
          "PARENT_REPOSITORY_OWNS_LOCAL_BYTES"
      },
      plannedObject: {
        key: expect.stringMatching(
          /^licenses\/[^/]+\/git-[a-f0-9]{40}\/[a-f0-9]{64}\/.+/
        ),
        expectedSha256: expect.stringMatching(
          /^[a-f0-9]{64}$/
        ),
        uploadReady: true
      },
      repositoryIdentity: {
        commitSha: expect.stringMatching(/^[a-f0-9]{40}$/),
        repositoryRelativePath: expect.any(String)
      },
      license: {
        status: "EXACT_UPSTREAM_LICENSE_TEXT_RETAINED",
        spdxExpression: expect.any(String),
        licenseRole: expect.any(String),
        statements: expect.arrayContaining([
          expect.stringContaining(
            packageRecord.repositoryIdentity.commitSha
          )
        ])
      }
    });
    expect(
      await sha256Path(join(repoRoot, packageRecord.localPath))
    ).toBe(packageRecord.plannedObject.expectedSha256);
    expect(packageRecord.plannedObject.contentType).toBe(
      packageRecord.localPath.endsWith(".htm")
        ? "text/html"
        : packageRecord.localPath.endsWith(".md")
          ? "text/markdown"
      : "text/plain"
    );
  }
  const embeddedLicenses = manifest.packages.filter(
    (entry) =>
      entry.packageType === "EMBEDDED_LICENSE_ARTIFACT"
  );
  expect(embeddedLicenses).toHaveLength(51);
  expect(manifest.summary).toMatchObject({
    embeddedLicenseArtifactPackageCount: 51,
    embeddedLicenseScannedParentPackageCount: 35,
    embeddedLicenseParentWithoutMatchingMemberCount: 0
  });
  expect(manifest.embeddedLicenseDiscovery).toMatchObject({
    scannedParentPackageCount: 35,
    scannedWheelPackageCount: 34,
    parentPackageWithMatchingMemberCount: 35,
    parentPackageWithoutMatchingMemberCount: 0,
    extractedMemberPackageCount: 51,
    parentsWithoutMatchingMembers: []
  });
  expect(
    new Set(
      embeddedLicenses
        .filter(
          (entry) =>
            entry.embeddedMember.archiveFormat === "ZIP"
        )
        .map((entry) => entry.parentPackageId)
    ).size
  ).toBe(34);
  for (const packageRecord of embeddedLicenses) {
    expect(packageRecord).toMatchObject({
      parentPackageId: expect.stringMatching(/^cache-file:/),
      coverage: {
        mode: "DUPLICATE_CHILD_OBJECT",
        physicalOwnership: "PARENT_ARCHIVE_PACKAGE"
      },
      localRetentionPolicy:
        "DELETE_AFTER_VERIFIED_MIGRATION",
      localLifecycle: {
        ownerPackageId: packageRecord.parentPackageId,
        ownershipMode:
          "MEMBER_BYTES_OWNED_BY_PARENT_ARCHIVE"
      },
      plannedObject: {
        key: expect.stringMatching(
          /^licenses\/[^/]+\/[^/]+\/[a-f0-9]{64}\/.+/
        ),
        expectedSha256: expect.stringMatching(
          /^[a-f0-9]{64}$/
        ),
        uploadReady: false,
        state: "EMBEDDED_LICENSE_EXTRACTION_REQUIRED",
        localFilePath: expect.stringMatching(
          /\/migration-staging\/embedded-licenses\//
        )
      },
      embeddedMember: {
        parentPackageId: packageRecord.parentPackageId,
        memberPath: expect.stringMatching(
          /(?:LICENSE|NOTICE|COPYING|COPYRIGHT|AUTHORS)/i
        )
      },
      license: {
        status:
          "EXACT_EMBEDDED_LICENSE_TEXT_RETAINED",
        licenseRole: expect.any(String)
      }
    });
  }
  const orToolsLicense = embeddedLicenses.find(
    (entry) =>
      entry.embeddedMember.memberPath.endsWith(
        "/share/doc/ortools/LICENSE"
      )
  );
  expect(orToolsLicense).toMatchObject({
    parentPackageId:
      "cache-file:artifacts/or-tools_aarch64_AlmaLinux-8.10_cpp_v9.14.6206.tar.gz",
    plannedObject: {
      expectedSha256:
        "cfc7749b96f63bd31c3c42b5c471bf756814053e847c10f3eb003417bc523d30",
      contentType: "text/plain"
    },
    license: {
      licenseRole: "ARCHIVE_PROJECT_LICENSE"
    }
  });
  const orToolsBytes = await readArchiveMember({
    archivePath: join(repoRoot, orToolsLicense.localPath),
    archiveFormat:
      orToolsLicense.embeddedMember.archiveFormat,
    memberPath:
      orToolsLicense.embeddedMember.memberPath
  });
  expect(
    createHash("sha256")
      .update(orToolsBytes)
      .digest("hex")
  ).toBe(orToolsLicense.plannedObject.expectedSha256);
  expect(
    manifest.embeddedLicenseExtractionNeeds
  ).toHaveLength(51);
  const orjsonLicenses = embeddedLicenses
    .filter((entry) =>
      entry.parentPackageId.includes(
        "/orjson-3.11.9-"
      )
    )
    .map((entry) =>
      basename(entry.embeddedMember.memberPath)
    )
    .sort();
  expect(orjsonLicenses).toEqual([
    "LICENSE-APACHE",
    "LICENSE-MIT",
    "LICENSE-MPL-2.0"
  ]);
  expect(
    embeddedLicenses.some(
      (entry) =>
        entry.parentPackageId.includes(
          "/pygments-2.20.0-"
        ) &&
        entry.embeddedMember.memberPath.endsWith(
          "/AUTHORS"
        )
    )
  ).toBe(true);
  for (const [fileName, commitSha] of [
    [
      "scout-72bcf419-source.tar.gz",
      "72bcf419eb1cb37379f163563344b0ec61507fd3"
    ],
    [
      "ssc-ba7a7968-source.tar.gz",
      "ba7a7968a115baa0c250597ce2381c7ffb27fbf2"
    ]
  ]) {
    const packageRecord = manifest.packages.find((entry) =>
      entry.localPath.endsWith(`/artifacts/${fileName}`)
    );
    expect(packageRecord).toMatchObject({
      release: {
        status: "PINNED",
        identities: [`Git commit ${commitSha}`],
        commitShas: [commitSha]
      },
      plannedObject: {
        key: expect.stringContaining(`/git-${commitSha}/`)
      }
    });
  }
  expect(manifest.summary.outsideCachePackageCount).toBe(18);
  for (const packageRecord of manifest.packages.filter(
    (entry) =>
      entry.coverage.mode ===
      "EXACT_ALLOWLISTED_REPOSITORY_FILE"
  )) {
    expect(packageRecord).toMatchObject({
      acquisitionTimestamp: expect.stringMatching(
        /^\d{4}-\d{2}-\d{2}T/
      ),
      timestampEvidence: "LOCAL_FILE_MTIME",
      acquisition: {
        timestampEvidence: "LOCAL_FILE_MTIME"
      }
    });
    expect(packageRecord.acquisitionTimestamp).not.toBe(
      `${manifest.generatedOn}T00:00:00.000Z`
    );
  }
  expect(
    manifest.packages.find(
      (entry) =>
        entry.packageId ===
        "repository-artifact:research-database.compact.json"
    )
  ).toMatchObject({
    packageType: "NORMALIZED_OUTPUT_FIXTURE",
    localPath:
      "docs/operational-savings-automation-research/fixtures/research-database.compact.json",
    localRetentionPolicy:
      "RETAIN_SOURCE_CONTROLLED_FIXTURE",
    sourceOrganization: "RetroFi",
    cleanupEligibility: {
      status: "BLOCKED",
      activeConsumerPaths: expect.arrayContaining([
        "scripts/research/operational-savings/run-real-proofs.mjs"
      ])
    },
    plannedObject: {
      key: expect.stringMatching(
        /^database-exports\/operational-savings-research\/[^/]+\/compact-database-v1\/research-database\.compact\.json$/
      )
    }
  });
  expect(
    manifest.packages.find(
      (entry) =>
        entry.packageId ===
        "adapter-fixture:operating-schedule:project-schedule-fixtures.v1.json"
    )
  ).toMatchObject({
    packageType: "MODEL_INPUT_FIXTURE",
    localPath:
      "scripts/research/operational-savings/adapters/operating-schedule/project-schedule-fixtures.v1.json",
    localRetentionPolicy:
      "RETAIN_SOURCE_CONTROLLED_FIXTURE",
    plannedObject: {
      key: expect.stringMatching(
        /^model-inputs\/operating-schedule\/project-schedule-fixtures-v1\/model-input-v1\/[a-f0-9]{64}\/project-schedule-fixtures\.v1\.json$/
      ),
      uploadReady: true
    }
  });
  expect(
    manifest.packages.find(
      (entry) =>
        entry.packageId ===
        "adapter-output:scout:prepared-result.v1.json"
    )
  ).toMatchObject({
    packageType: "MODEL_OUTPUT_FIXTURE",
    localPath:
      "scripts/research/operational-savings/adapters/scout/prepared-result.v1.json",
    localRetentionPolicy:
      "RETAIN_SOURCE_CONTROLLED_FIXTURE",
    plannedObject: {
      key: expect.stringMatching(
        /^model-outputs\/scout\/scout-72bcf419\/model-output-v1\/[a-f0-9]{64}\/prepared-result\.v1\.json$/
      ),
      uploadReady: true
    }
  });
  for (const [localPath, derivedFromLocalPath] of [
    [
      "tmp/pdfs/epa-chp-page-037.png",
      "scripts/research/operational-savings/.cache/artifacts/epa-chp-catalog.pdf"
    ],
    [
      "tmp/pdfs/tariff/sdge-jrc-page-10.png",
      "scripts/research/operational-savings/.cache/artifacts/sdge-sdcp-joint-rate-comparison-2026-06-01.pdf"
    ],
    [
      "tmp/pdfs/tariff/sdge-small-commercial-page-1.png",
      "scripts/research/operational-savings/.cache/artifacts/sdge-small-commercial-rates-2026-06-01.pdf"
    ]
  ]) {
    expect(
      manifest.packages.find(
        (entry) => entry.localPath === localPath
      )
    ).toMatchObject({
      packageType: "DERIVED_INSPECTION_IMAGE",
      localRetentionPolicy: "DELETE_AFTER_VERIFIED_MIGRATION",
      plannedObject: {
        key: expect.stringMatching(
          /^model-assets\/research-inspection\/2026-07-24\/pdf-page-render-v1\/[a-f0-9]{64}\/[^/]+\.png$/
        ),
        contentType: "image/png",
        uploadReady: true
      },
      source: {
        status: "DERIVED_FROM_LOCAL_SOURCE_ARTIFACT",
        derivedFromLocalPath
      },
      content: {
        kind: "DERIVED_PDF_PAGE_INSPECTION_IMAGE",
        mediaType: "image/png"
      },
      ingestion: {
        status: "RESEARCH_SOURCE_INSPECTION_RENDER"
      }
    });
  }
  const modelSupportPackages = manifest.packages.filter((entry) =>
    entry.packageId.startsWith("model-support:")
  );
  expect(modelSupportPackages).toHaveLength(12);
  expect(
    new Set(
      modelSupportPackages.map((entry) =>
        entry.packageId.split(":")[1]
      )
    )
  ).toEqual(new Set(["reopt", "ssc", "measur", "scout"]));
  for (const packageRecord of modelSupportPackages) {
    const expectedPrefix =
      packageRecord.packageType === "MODEL_INPUT_FIXTURE"
        ? "model-inputs"
        : packageRecord.packageType === "MODEL_OUTPUT_FIXTURE"
          ? "model-outputs"
          : "model-assets";
    expect(packageRecord).toMatchObject({
      localRetentionPolicy: "RETAIN_SOURCE_CONTROLLED_FIXTURE",
      sourceOrganization: "RetroFi",
      plannedObject: {
        key: expect.stringMatching(new RegExp(
          `^${expectedPrefix}/(?:reopt|ssc|measur|scout)/[^/]+/[^/]+/[a-f0-9]{64}/[^/]+$`
        )),
        uploadReady: true
      },
      ingestion: {
        status: "REFERENCED_BY_CONTAINER_VERIFICATION",
        manifests: [expect.stringMatching(/build-manifest\.json$/)]
      },
      reproducibility: {
        status: "SOURCE_CONTROLLED_AND_OFFLINE_VERIFIED"
      }
    });
  }
  expect(manifest.summary).toMatchObject({
    originalLocalArtifactCount: 78,
    originalLocalArtifactPendingCleanupCount: 78,
    auditedExternalExactFileCount: 257,
    auditedExternalDirectoryCount: 44,
    packageLicenseReviewCount: 0,
    packageIngestionReviewCount: 0
  });
  expect(manifest.originalLocalArtifacts).toHaveLength(78);
  expect(manifest.localArtifactAudit).toMatchObject({
    schemaVersion:
      "operational-savings/research-local-artifact-audit-v1",
    sourcePath:
      "docs/operational-savings-automation-research/research-local-artifact-audit.v1.json",
    sourceSha256: expect.stringMatching(/^[a-f0-9]{64}$/),
    summary: {
      exactChildFileCount: 257,
      directoryEntryCount: 44,
      migratedUniqueFileCount: 78
    }
  });
  const wheelPackages = manifest.packages.filter(
    (entry) =>
      entry.packageType === "MODEL_DEPENDENCY_WHEEL"
  );
  expect(wheelPackages).toHaveLength(34);
  for (const packageRecord of wheelPackages) {
    expect(packageRecord).toMatchObject({
      sourceOrganization:
        "Python package publishers via Python Package Index",
      localRetentionPolicy: "DELETE_AFTER_VERIFIED_MIGRATION",
      originalLocalArtifacts: [
        {
          path: expect.stringMatching(
            /^\/private\/tmp\/scout-wheelhouse\/.+\.whl$/
          ),
          relation:
            "EXACT_BYTE_SOURCE_FOR_CANONICAL_CACHE_COPY",
          cleanupStatus: "LOCAL_RETAINED"
        }
      ],
      plannedObject: {
        key: expect.stringMatching(
          /^model-assets\/scout\/scout-72bcf419\/python-wheel-linux-arm64-v1\/[a-f0-9]{64}\/.+\.whl$/
        )
      },
      content: {
        sourceDeclarations: {
          verificationStatus: "VERIFIED"
        }
      }
    });
  }
  expect(
    manifest.packages.find(
      (entry) =>
        entry.localPath ===
        "scripts/research/operational-savings/.cache/model-outputs/reopt/pvwatts-full-output.json"
    )
  ).toMatchObject({
    packageType: "MODEL_OUTPUT_FIXTURE",
    fingerprint: {
      digest:
        "eb01c3b8fc1dda18056dac7ca3b03f4460ad3241371705ad938f85f715639be4"
    },
    plannedObject: {
      key: expect.stringMatching(
        /^model-outputs\/reopt\/ssc-303-reopt-f952cab\/model-output-v1\/[a-f0-9]{64}\/pvwatts-full-output\.json$/
      )
    }
  });
  expect(
    manifest.packages.find(
      (entry) => entry.packageId === "git-repository:ssc"
    )?.fingerprint.commitSha
  ).toBe("ba7a7968a115baa0c250597ce2381c7ffb27fbf2");
  expect(
    manifest.packages.find(
      (entry) =>
        entry.packageId ===
        "cache-file:research-database.sqlite"
    )
  ).toMatchObject({
    packageType: "NORMALIZED_DATABASE",
    plannedObject: {
      uploadReady: true,
      key: expect.stringMatching(
        /^database-exports\/operational-savings-research\/[^/]+\/research-database-v1\/research-database\.sqlite$/
      )
    }
  });
  const comstockPackages = manifest.packages.filter(
    (entry) =>
      entry.localPath?.startsWith(
        "scripts/research/operational-savings/.cache/artifacts/comstock-"
      )
  );
  expect(comstockPackages).toHaveLength(6);
  for (const packageRecord of comstockPackages) {
    expect(packageRecord).toMatchObject({
      packageType: "SOURCE_ARTIFACT",
      sourceOrganization: "National Renewable Energy Laboratory",
      acquisitionTimestamp: "2026-07-24T00:00:00.000Z",
      release: {
        status: "PINNED",
        identities: ["2025 ComStock Release 3"]
      },
      acquisition: {
        status: "DOCUMENTED",
        modes: ["PUBLIC_OEDI_DOWNLOAD"]
      }
    });
    expect(packageRecord.plannedObject.key).toMatch(
      /^raw\/oedi-comstock\/2025-comstock-release-3\/[a-f0-9]{64}\/[^/]+$/
    );
  }
  expect(
    comstockPackages.find((entry) =>
      entry.localPath.endsWith(".parquet")
    )?.content.mediaType
  ).toBe("application/vnd.apache.parquet");
  expect(
    comstockPackages.find((entry) =>
      entry.localPath.endsWith(".tsv")
    )?.content.mediaType
  ).toBe("text/tab-separated-values");
  expect(
    manifest.packages.find(
      (entry) =>
        entry.localPath ===
        "scripts/research/operational-savings/.cache/artifacts/or-tools_aarch64_AlmaLinux-8.10_cpp_v9.14.6206.tar.gz"
    )
  ).toMatchObject({
    sourceOrganization: "Google",
    fingerprint: {
      algorithm: "SHA-256",
      digest:
        "2f731a156cd9e4123d1433dec51a22ba74702d349457fe76c65bba0f1f7958e0"
    },
    plannedObject: {
      key:
        "raw/google-or-tools/9.14.6206/2f731a156cd9e4123d1433dec51a22ba74702d349457fe76c65bba0f1f7958e0/or-tools_aarch64_AlmaLinux-8.10_cpp_v9.14.6206.tar.gz"
    },
    source: {
      status: "DOCUMENTED",
      urls: [
        "https://github.com/google/or-tools/releases/download/v9.14/or-tools_aarch64_AlmaLinux-8.10_cpp_v9.14.6206.tar.gz"
      ]
    },
    release: {
      status: "PINNED",
      identities: ["9.14.6206"]
    },
    acquisition: {
      status: "DOCUMENTED",
      modes: [
        "PINNED_VERIFIED_CONTAINER_BUILD_DEPENDENCY"
      ]
    },
    content: {
      sizeBytes: 53631276,
      sha256:
        "2f731a156cd9e4123d1433dec51a22ba74702d349457fe76c65bba0f1f7958e0",
      sourceDeclarations: {
        sha256: [
          "2f731a156cd9e4123d1433dec51a22ba74702d349457fe76c65bba0f1f7958e0"
        ],
        sizeBytes: [53631276],
        verificationStatus: "VERIFIED",
        manifestPaths: [
          "scripts/research/operational-savings/containers/ssc/build-manifest.json"
        ]
      }
    },
    license: {
      status: "DOCUMENTED_REVIEW_RETAINED",
      statements: [
        "SPDX Apache-2.0; archive path share/doc/ortools/LICENSE; SHA-256 cfc7749b96f63bd31c3c42b5c471bf756814053e847c10f3eb003417bc523d30"
      ]
    },
    ingestion: {
      status: "REFERENCED_BY_RESEARCH_PROOF",
      manifests: [
        "scripts/research/operational-savings/containers/ssc/build-manifest.json"
      ]
    }
  });
  for (const packageRecord of manifest.packages) {
    expect(packageRecord).toHaveProperty("sourceOrganization");
    expect(packageRecord).toHaveProperty("acquisitionTimestamp");
    expect(packageRecord.s3Uri).toBe(
      `s3://${RESEARCH_S3_BUCKET}/${packageRecord.plannedObject.key}`
    );
    expect(packageRecord.remote.s3.s3Uri).toBe(
      packageRecord.s3Uri
    );
    expect(packageRecord.cleanupEligibility.status).toBe("BLOCKED");
    if (packageRecord.plannedObject.key.startsWith("normalized/")) {
      expect(packageRecord.plannedObject.key).toMatch(
        /^normalized\/[^/]+\/[^/]+\/[^/]+\/[^/]+$/
      );
    } else if (
      packageRecord.plannedObject.key.startsWith(
        "database-exports/"
      )
    ) {
      expect(packageRecord.plannedObject.key).toMatch(
        /^database-exports\/[^/]+\/[^/]+\/[^/]+\/[^/]+$/
      );
    } else if (
      packageRecord.plannedObject.key.startsWith("model-inputs/") ||
      packageRecord.plannedObject.key.startsWith("model-outputs/")
    ) {
      expect(packageRecord.plannedObject.key).toMatch(
        /^model-(?:inputs|outputs)\/[^/]+\/[^/]+\/[^/]+\/[a-f0-9]{64}\/[^/]+$/
      );
    } else if (
      packageRecord.plannedObject.key.startsWith("model-assets/")
    ) {
      expect(packageRecord.plannedObject.key).toMatch(
        /^model-assets\/[^/]+\/[^/]+\/[^/]+\/[a-f0-9]{64}\/[^/]+$/
      );
    } else if (
      packageRecord.plannedObject.key.startsWith("licenses/")
    ) {
      expect(packageRecord.plannedObject.key).toMatch(
        packageRecord.packageType ===
          "REPOSITORY_LICENSE_ARTIFACT"
          ? /^licenses\/[^/]+\/git-[a-f0-9]{40}\/[a-f0-9]{64}\/.+$/
          : /^licenses\/[^/]+\/[^/]+\/[a-f0-9]{64}\/.+$/
      );
    } else {
      expect(packageRecord.plannedObject.key).toMatch(
        /^raw\/[^/]+\/[^/]+\/[a-f0-9]{64}\/[^/]+$/
      );
    }
  }
  expect(manifest.destination.s3.bucket).toBe(RESEARCH_S3_BUCKET);
  expect(manifest.destination.s3.profile).toBe(
    RESEARCH_AWS_PROFILE
  );
  const replayReceiptPassed =
    manifest.destination.ecr.postHocReplayReceipt.status ===
    "PASS_COMMITTED_POST_HOC_REPLAY";
  expect([
    "INVALID",
    "PENDING",
    "PASS_COMMITTED_POST_HOC_REPLAY"
  ]).toContain(
    manifest.destination.ecr.postHocReplayReceipt.status
  );
  expect(manifest.destination.ecr).toMatchObject({
    runnableContainerBuilt: replayReceiptPassed,
    historicalBuildManifestPassCount: 4,
    locallyVerifiedImageCount:
      replayReceiptPassed ? 4 : 0,
    remotelyVerifiedImageCount: 4,
    localImagePresenceCheckedByInventory: false,
    remoteStateCheckedByInventory: false
  });
  expect(
    manifest.destination.ecr.repositories.map(
      (entry) => entry.repositoryName
    )
  ).toEqual([
    "retrofi-research-reopt",
    "retrofi-research-ssc",
    "retrofi-research-measur",
    "retrofi-research-scout"
  ]);
  expect(
    manifest.destination.ecr.repositories.find(
      (entry) => entry.modelId === "ssc"
    )
  ).toMatchObject({
    buildManifest: {
      status: "VERIFIED"
    },
    localImage: {
      imageTag: "ssc-308-ba7a7968-arm64",
      verificationStatus:
        replayReceiptPassed
          ? "PASS_COMMITTED_POST_HOC_REPLAY"
          : "HISTORICAL_PASS_RECORDED_CURRENT_CONTEXT_UNATTESTED",
      currentDaemonPresenceCheckedByInventory: false
    }
  });
}, 30_000);

cacheBackedTest("lists proof-critical binaries and all SSC resource dependencies without duplicate objects", async () => {
  const manifest = await buildTestInventory();
  expect(manifest.compiledBinaries).toHaveLength(7);
  for (const artifact of [
    ...manifest.proofCriticalFiles,
    ...manifest.compiledBinaries,
    ...manifest.modelFixturesAndResources,
    ...manifest.sourceArchiveNeeds,
    ...manifest.normalizedDatabaseAndOutputFixtures
  ]) {
    expect(artifact).toHaveProperty("sourceOrganization");
    expect(artifact).toHaveProperty("s3Uri");
    expect(artifact).toHaveProperty("acquisitionTimestamp");
  }
  const proofBinary = manifest.compiledBinaries.find(
    (entry) => entry.proofRequired
  );
  expect(proofBinary).toMatchObject({
    path:
      "scripts/research/operational-savings/.cache/repos/reopt/src/sam/libssc.dylib",
    sha256:
      "db933646389fa94f41af34066d65034681d5836f1bd29644f9b2a934a01b788f",
    duplicateObjectPlanned: false
  });
  for (const suffix of [
    "swh_residential_data/scaled_draw.csv",
    "swh_residential_data/custom_mains.csv",
    "swh_residential_data/custom_set.csv",
    "swh_residential_data/load.csv",
    "input_docs/wind.srw",
    "pvsamv1_data/USA AZ Phoenix (TMY2).csv"
  ]) {
    expect(
      manifest.modelFixturesAndResources.some((entry) =>
        entry.path.endsWith(suffix)
      )
    ).toBe(true);
  }
  expect(
    manifest.sourceArchiveNeeds.every(
      (entry) =>
        entry.status === "NOT_MATERIALIZED" &&
        entry.uploadReady === false
    )
  ).toBe(true);
});

cacheBackedTest("reports recorded local and exact-digest ECR evidence without claiming a new remote check", async () => {
  const manifest = await buildTestInventory();
  const report = buildResearchStorageReport(manifest);
  const replayReceiptPassed =
    manifest.destination.ecr.postHocReplayReceipt.status ===
    "PASS_COMMITTED_POST_HOC_REPLAY";
  const locallyVerifiedImageCount =
    replayReceiptPassed ? 4 : 0;
  expect(report).toContain(
    `${locallyVerifiedImageCount} runnable research container images have a passing committed post-hoc exact-context replay receipt.`
  );
  if (replayReceiptPassed) {
    expect(report).toContain(
      "The replay receipt is committed and content-bound at source context"
    );
  } else {
    expect(report).toContain(
      "Historical build-manifest PASS records are not treated as current exact-context verification."
    );
  }
  expect(report).toContain(
    "4 ECR publications have a complete exact-digest verification record."
  );
  expect(report).toContain(
    "sha256:70eb1f134a8ca9342988c3593d51ce08b1c6042847b23bfb7e8c4e15a8f435cc"
  );
  expect(report).toContain(
    "https://github.com/NatLabRockies/ssc.git"
  );
  expect(report).toContain(
    "BSD-3-Clause (RECORDED_AND_HASH_VERIFIED)"
  );
  expect(report).toContain(
    manifest.destination.ecr.repositories.find(
      (entry) => entry.modelId === "ssc"
    ).provenance.buildManifestSha256
  );
  expect(report).toContain("Exact input-set SHA-256");
  expect(report).toContain(
    "UNCOMMITTED_HISTORICAL_BUILD_CONTEXT"
  );
  expect(report).toContain(
    manifest.destination.ecr.repositories.find(
      (entry) => entry.modelId === "ssc"
    ).buildManifest.buildEvidence.contentBinding
      .completeInputSetSha256
  );
  expect(report).toContain(
    "inventory generation did not independently call AWS."
  );
  expect(report).toContain(
    "18 current outside-cache packages are exact-allowlisted"
  );
  expect(report).toContain(
    "| Independent repository license objects | 9 |"
  );
  expect(report).toContain(
    "| Independent embedded license objects | 51 |"
  );
  expect(report).toContain(
    "## Independent repository license objects"
  );
  expect(report).toContain(
    "licenses/<repository>/<release>/<sha256>/<repository-relative-path>"
  );
  expect(report).toContain(
    "VENDORED_DEPENDENCY_LICENSE"
  );
  expect(report).toContain(
    "## Independent embedded license objects"
  );
  expect(report).toContain(
    "all 34 checksum-pinned Scout wheels plus the exact OR-Tools binary archive"
  );
  expect(report).toContain(
    "orjson-3.11.9-"
  );
  expect(report).toContain(
    "tmp/pdfs/epa-chp-page-037.png"
  );
  expect(report).toContain(
    "No complete current exact-digest ECR restore and local cleanup receipt is recorded."
  );
  expect(report).not.toContain(
    "No runnable research container is currently built."
  );
  manifest.execution.lastEcrRestoreReplay = {
    status: "PASS",
    completedAt: "2026-07-24T23:45:00.000Z",
    fullValidationRecorded: true,
    allImagesRemovedLocally: true,
    temporaryDockerCredentialRetained: false,
    images: manifest.destination.ecr.repositories.map(
      (repository) => ({
        modelId: repository.modelId,
        imageUri: repository.remoteImage.imageUri,
        targetPlatform:
          repository.localImage.targetPlatform,
        pullStatus: "PULLED_EXACT_DIGEST",
        replayStatus: "PASS",
        liveEcr: {
          exactDigestScan: {
            recordedEvidenceMatched: true,
            critical:
              repository.remoteImage.scan.critical,
            high: repository.remoteImage.scan.high,
            medium:
              repository.remoteImage.scan.medium,
            low: repository.remoteImage.scan.low
          }
        },
        localCleanupStatus:
          "EXACT_ECR_REFERENCE_REMOVED_AFTER_REPLAY_AND_IMAGE_ABSENT"
      })
    )
  };
  const completedReport =
    buildResearchStorageReport(manifest);
  expect(completedReport).toContain(
    "No complete current exact-digest ECR restore and local cleanup receipt is recorded."
  );
  expect(completedReport).toContain(
    "ECR_RESTORE_RECEIPT_INVALID"
  );
  expect(completedReport).toContain(
    "License evidence objects"
  );
  expect(completedReport).toContain(
    "License evidence set SHA-256"
  );
  expect(completedReport).toContain(
    "Durable evidence SHA-256"
  );
  expect(completedReport).not.toContain(
    "all offline model replays and the exact bound full validation passed"
  );
}, 30_000);

test("dry-run planning never invokes a command runner", async () => {
  await withTemporaryPackage(async ({ manifest }) => {
    const runner = vi.fn();
    const plan = plannedOperation({
      manifest,
      packageId: "cache-file:tiny-source.json",
      destination,
      operation: "upload"
    });
    expect(plan).toMatchObject({
      dryRun: true,
      overwriteAllowed: false,
      wouldDeleteLocal: false
    });
    expect(runner).not.toHaveBeenCalled();
  });
});

test("rejects manifest object keys with traversal or control segments", async () => {
  await withTemporaryPackage(async ({ manifest, packageRecord }) => {
    packageRecord.plannedObject.key = "raw/../unsafe";
    packageRecord.s3Uri =
      `s3://${RESEARCH_S3_BUCKET}/raw/../unsafe`;
    packageRecord.remote.s3.key = "raw/../unsafe";
    packageRecord.remote.s3.s3Uri =
      packageRecord.s3Uri;
    resealManifest(manifest);
    expect(() =>
      plannedOperation({
        manifest,
        packageId: packageRecord.packageId,
        destination,
        operation: "upload"
      })
    ).toThrow(/UNSAFE_OBJECT_KEY/);
  });
});

test("materializes, cleans, and restores a clean pinned Git repository bundle", {
  timeout: 30_000
}, async () => {
  const root = await mkdtemp(
    join(tmpdir(), "retrofi-research-archive-")
  );
  try {
    const repositoryPath = join(
      root,
      CACHE_RELATIVE_PATH,
      "repos/example"
    );
    await mkdir(repositoryPath, { recursive: true });
    await execFileAsync("/usr/bin/git", ["init", repositoryPath]);
    await writeFile(
      join(repositoryPath, "source.txt"),
      "pinned source\n",
      "utf8"
    );
    await writeFile(
      join(repositoryPath, ".gitattributes"),
      "source.txt filter=lfs\n",
      "utf8"
    );
    await execFileAsync(
      "/usr/bin/git",
      [
        "-C",
        repositoryPath,
        "add",
        ".gitattributes",
        "source.txt"
      ]
    );
    await execFileAsync(
      "/usr/bin/git",
      [
        "-C",
        repositoryPath,
        "-c",
        "user.name=Research Test",
        "-c",
        "user.email=research@example.invalid",
        "commit",
        "-m",
        "pin source"
      ]
    );
    const identityRecord =
      await gitRepositoryIdentity(repositoryPath);
    const archiveName =
      `example-${identityRecord.commitSha}.bundle`;
    const packageRecord = {
      packageId: "git-repository:example",
      packageType: "PINNED_GIT_REPOSITORY",
      localPath: `${CACHE_RELATIVE_PATH}/repos/example`,
      fingerprint: {
        algorithm: "GIT_TREE_PLUS_SHA256_INDEX_LISTING",
        ...identityRecord
      },
      content: { repositoryName: "example" },
      plannedObject: {
        key:
          `raw/example/git-${identityRecord.commitSha}/` +
          `${identityRecord.gitIndexListingSha256}/${archiveName}`,
        contentType: "application/x-git-bundle",
        expectedSizeBytes: null,
        expectedSha256: null,
        uploadReady: false,
        state: "SOURCE_ARCHIVE_REQUIRED",
        archivePlan: {
          outputFileName: archiveName,
          materialized: false
        }
      },
      sourceOrganization: "Example Organization",
      s3Uri:
        `s3://${RESEARCH_S3_BUCKET}/raw/example/` +
        `git-${identityRecord.commitSha}/` +
        `${identityRecord.gitIndexListingSha256}/${archiveName}`,
      acquisitionTimestamp: null,
      localRetentionPolicy:
        "DELETE_AFTER_VERIFIED_MIGRATION",
      cleanupEligibility: {
        status: "BLOCKED",
        activeConsumerPaths: ["test-consumer"],
        validatedConsumerPaths: [],
        validationCommand: null,
        validationStatus: "NOT_RUN",
        validatedAt: null,
        validatedSourceCommit: null,
        validatedRepositoryTreeDigest: null,
        restoredVersionId: null,
        restoredSha256: null,
        restoredAt: null,
        blocker: "test"
      },
      remote: {
        s3: {
          bucket: RESEARCH_S3_BUCKET,
          key:
            `raw/example/git-${identityRecord.commitSha}/` +
            `${identityRecord.gitIndexListingSha256}/${archiveName}`,
          s3Uri:
            `s3://${RESEARCH_S3_BUCKET}/raw/example/` +
            `git-${identityRecord.commitSha}/` +
            `${identityRecord.gitIndexListingSha256}/${archiveName}`,
          verificationStatus: "ARCHIVE_NOT_MATERIALIZED",
          deletionStatus: "LOCAL_RETAINED"
        }
      }
    };
    const manifest = sealManifest({
      schemaVersion:
        "operational-savings/research-storage-migration-v1",
      destination: {
        s3: {
          accountId: RESEARCH_AWS_ACCOUNT_ID,
          region: RESEARCH_AWS_REGION,
          bucket: RESEARCH_S3_BUCKET
        }
      },
      packages: [packageRecord],
      sourceArchiveNeeds: [
        {
          packageId: packageRecord.packageId,
          status: "NOT_MATERIALIZED",
          uploadReady: false
        }
      ],
      execution: {}
    });
    const interruptedManifest =
      structuredClone(manifest);
    const mismatchedInterruptedManifest =
      structuredClone(manifest);
    const racedInterruptedManifest =
      structuredClone(manifest);
    const first = await prepareRepositoryArchive({
      repoRoot: root,
      manifest,
      packageId: packageRecord.packageId,
      now: () => "2026-07-24T00:00:00.000Z"
    });
    expect(first).toMatchObject({
      disposition: "ARCHIVE_MATERIALIZED",
      packageId: packageRecord.packageId
    });
    expect(first.sizeBytes).toBeGreaterThan(0);
    expect(first.sha256).toMatch(/^[a-f0-9]{64}$/);
    expect(packageRecord.plannedObject).toMatchObject({
      uploadReady: true,
      state: "ARCHIVE_MATERIALIZED",
      expectedSizeBytes: first.sizeBytes,
      expectedSha256: first.sha256
    });
    expect(manifest.sourceArchiveNeeds[0]).toMatchObject({
      status: "MATERIALIZED_NOT_UPLOADED",
      uploadReady: true,
      sizeBytes: first.sizeBytes,
      sha256: first.sha256
    });
    const adopted = await prepareRepositoryArchive({
      repoRoot: root,
      manifest: interruptedManifest,
      packageId: packageRecord.packageId,
      now: () => "2026-07-24T00:00:01.000Z"
    });
    expect(adopted).toMatchObject({
      disposition:
        "ARCHIVE_INTERRUPTED_STAGING_ADOPTED",
      archivePath: first.archivePath,
      sizeBytes: first.sizeBytes,
      sha256: first.sha256
    });
    expect(
      interruptedManifest.packages[0].plannedObject
    ).toMatchObject({
      uploadReady: true,
      state: "ARCHIVE_MATERIALIZED",
      expectedSizeBytes: first.sizeBytes,
      expectedSha256: first.sha256
    });
    await expect(
      prepareRepositoryArchive({
        repoRoot: root,
        manifest: mismatchedInterruptedManifest,
        packageId: packageRecord.packageId,
        archiveRunner: async ({ outputPath }) => {
          await writeFile(
            outputPath,
            "different deterministic candidate\n",
            "utf8"
          );
          return {
            exitCode: 0,
            stdout: "",
            stderr: ""
          };
        }
      })
    ).rejects.toThrow(
      /ARCHIVE_INTERRUPTED_STAGING_MISMATCH/
    );
    const stagedArchivePath = join(
      root,
      first.archivePath
    );
    const stagedArchiveBytes =
      await readFile(stagedArchivePath);
    await expect(
      prepareRepositoryArchive({
        repoRoot: root,
        manifest: racedInterruptedManifest,
        packageId: packageRecord.packageId,
        archiveRunner: async ({ outputPath }) => {
          await writeFile(
            outputPath,
            stagedArchiveBytes
          );
          await writeFile(
            stagedArchivePath,
            "changed during adoption\n",
            "utf8"
          );
          return {
            exitCode: 0,
            stdout: "",
            stderr: ""
          };
        }
      })
    ).rejects.toThrow(
      /ARCHIVE_INTERRUPTED_STAGING_CHANGED/
    );
    await writeFile(
      stagedArchivePath,
      stagedArchiveBytes
    );
    const second = await prepareRepositoryArchive({
      repoRoot: root,
      manifest,
      packageId: packageRecord.packageId
    });
    expect(second.disposition).toBe(
      "ALREADY_MATERIALIZED_VERIFIED"
    );
    expect(validateManifestDigest(manifest)).toBe(manifest);

    packageRecord.remote.s3 = {
      ...packageRecord.remote.s3,
      versionId: "archive-version-1",
      verificationStatus: "VERIFIED",
      deletionStatus: "LOCAL_RETAINED"
    };
    await installMinimalLiveReplayFixture({
      root,
      manifest
    });
    markCleanupEligible(
      manifest,
      [packageRecord],
      "manifest.json"
    );
    const archivePath = join(
      root,
      packageRecord.plannedObject.localFilePath
    );
    const bundleBytes = await readFile(archivePath);
    const manifestPath = await persistManifest(
      root,
      manifest
    );
    const runner = vi.fn(async (args) => {
      if (args[0] === "sts") return identity();
      const control = bucketControlResult(args);
      if (control) return control;
      if (args[1] === "head-object") {
        return success(
          remoteHead({
            sha256: first.sha256,
            sizeBytes: first.sizeBytes,
            versionId: "archive-version-1",
            contentType:
              packageRecord.plannedObject.contentType
          })
        );
      }
      if (args[1] === "get-object") {
        await writeFile(
          args.at(-1),
          bundleBytes
        );
        return success(
          remoteHead({
            sha256: first.sha256,
            sizeBytes: first.sizeBytes,
            versionId: "archive-version-1",
            contentType:
              packageRecord.plannedObject.contentType
          })
        );
      }
      throw new Error(`unexpected command ${args.join(" ")}`);
    });
    const deleteRepository = vi.fn(
      async ({ repositoryPath: path }) => {
        await rm(path, { recursive: true });
      }
    );
    const cleanup = await cleanupPackage({
      repoRoot: root,
      manifestPath,
      manifest,
      packageId: packageRecord.packageId,
      destination,
      confirmDeleteLocal: true,
      runner,
      gitRunner: cleanValidationGitRunner(),
      deleteRepository,
      now: () => "2026-07-24T02:00:00.000Z"
    });
    expect(cleanup.localPaths).toEqual([
      packageRecord.localPath,
      packageRecord.plannedObject.localFilePath
    ]);
    expect(deleteRepository).toHaveBeenCalledWith(
      expect.objectContaining({
        repositoryPath: expect.stringMatching(
          /\.retrofi-cleanup-[a-f0-9]{20}$/
        ),
        archivePath: null,
        quarantineAlreadyRenamed: true
      })
    );
    await expect(
      readFile(repositoryPath)
    ).rejects.toThrow();
    await expect(readFile(archivePath)).rejects.toThrow();
    const priorGitConfig = {
      count: process.env.GIT_CONFIG_COUNT,
      key0: process.env.GIT_CONFIG_KEY_0,
      value0: process.env.GIT_CONFIG_VALUE_0,
      key1: process.env.GIT_CONFIG_KEY_1,
      value1: process.env.GIT_CONFIG_VALUE_1,
      key2: process.env.GIT_CONFIG_KEY_2,
      value2: process.env.GIT_CONFIG_VALUE_2
    };
    process.env.GIT_CONFIG_COUNT = "3";
    process.env.GIT_CONFIG_KEY_0 = "filter.lfs.smudge";
    process.env.GIT_CONFIG_VALUE_0 =
      'test "$GIT_LFS_SKIP_SMUDGE" = 1 && cat || exit 1';
    process.env.GIT_CONFIG_KEY_1 = "filter.lfs.required";
    process.env.GIT_CONFIG_VALUE_1 = "true";
    process.env.GIT_CONFIG_KEY_2 = "filter.lfs.clean";
    process.env.GIT_CONFIG_VALUE_2 = "cat";
    let hydration;
    try {
      hydration = await hydratePackage({
        repoRoot: root,
        manifest,
        packageId: packageRecord.packageId,
        destination,
        runner
      });
    } finally {
      for (const [key, value] of [
        ["GIT_CONFIG_COUNT", priorGitConfig.count],
        ["GIT_CONFIG_KEY_0", priorGitConfig.key0],
        ["GIT_CONFIG_VALUE_0", priorGitConfig.value0],
        ["GIT_CONFIG_KEY_1", priorGitConfig.key1],
        ["GIT_CONFIG_VALUE_1", priorGitConfig.value1],
        ["GIT_CONFIG_KEY_2", priorGitConfig.key2],
        ["GIT_CONFIG_VALUE_2", priorGitConfig.value2]
      ]) {
        if (value === undefined) delete process.env[key];
        else process.env[key] = value;
      }
    }
    expect(hydration).toMatchObject({
      disposition: "PACKAGE_HYDRATED_WITHOUT_OVERWRITE",
      hydrationMode: "CLONED_VERIFIED_GIT_BUNDLE",
      restoredSha256: first.sha256,
      materializationGeneration: 1,
      cleanupActionGenerationByType: {
        PACKAGE_REPOSITORY: 1
      },
      materializedCleanupActionTypes: [
        "PACKAGE_REPOSITORY"
      ]
    });
    expect(
      await gitRepositoryIdentity(repositoryPath)
    ).toMatchObject({
      commitSha: identityRecord.commitSha,
      gitTreeObjectSha1:
        identityRecord.gitTreeObjectSha1,
      gitIndexListingSha256:
        identityRecord.gitIndexListingSha256,
      workingTreeClean: true
    });
    expect(
      await readFile(join(repositoryPath, ".git", "HEAD"), "utf8")
    ).toContain(identityRecord.commitSha);
    markCleanupEligible(
      manifest,
      [packageRecord],
      "manifest.json"
    );
    await persistManifest(root, manifest);
    await cleanupPackage({
      repoRoot: root,
      manifestPath,
      manifest,
      packageId: packageRecord.packageId,
      destination,
      confirmDeleteLocal: true,
      runner,
      gitRunner: cleanValidationGitRunner(),
      deleteRepository,
      now: () => "2026-07-24T03:00:00.000Z"
    });
    expect(deleteRepository).toHaveBeenCalledTimes(2);
    await expect(
      readFile(repositoryPath)
    ).rejects.toThrow();
    await expect(readFile(archivePath)).rejects.toThrow();
    expect(
      manifest.execution.localCleanupJournal
        .completedActions.map((action) => ({
          actionType: action.actionType,
          generation:
            action.materializationGeneration
        }))
    ).toEqual(
      expect.arrayContaining([
        {
          actionType: "PACKAGE_CANONICAL_FILE",
          generation: 0
        },
        {
          actionType: "PACKAGE_REPOSITORY",
          generation: 0
        },
        {
          actionType: "PACKAGE_REPOSITORY",
          generation: 1
        }
      ])
    );
    expect(validateManifestDigest(manifest)).toBe(manifest);
  } finally {
    await rm(root, { recursive: true, force: true });
  }
});

test("rejects incomplete publication metadata before any AWS call", async () => {
  await withTemporaryPackage(
    async ({ root, manifest, packageRecord }) => {
      packageRecord.license.status = "NEEDS_REVIEW";
      resealManifest(manifest);
      const runner = vi.fn();
      await expect(
        uploadPackage({
          repoRoot: root,
          manifest,
          packageId: packageRecord.packageId,
          destination,
          runner
        })
      ).rejects.toThrow(
        /PACKAGE_PUBLICATION_METADATA_INCOMPLETE.*license/
      );
      expect(runner).not.toHaveBeenCalled();
    }
  );
});

test("uploads only after role verification and a conditional no-overwrite write", async () => {
  await withTemporaryPackage(
    async ({
      root,
      manifest,
      packageRecord,
      sha256,
      sizeBytes
    }) => {
      let headCount = 0;
      const runner = vi.fn(async (args) => {
        if (args[0] === "sts") return identity();
        const control = bucketControlResult(args);
        if (control) return control;
        if (args[0] === "s3api" && args[1] === "head-object") {
          headCount += 1;
          return headCount === 1
            ? {
                exitCode: 254,
                stdout: "",
                stderr: "An error occurred (404) when calling the HeadObject operation: Not Found"
              }
            : success(remoteHead({ sha256, sizeBytes }));
        }
        if (args[0] === "s3api" && args[1] === "put-object") {
          expect(args).toContain("--if-none-match");
          expect(args[args.indexOf("--if-none-match") + 1]).toBe("*");
          expect(args[args.indexOf("--profile") + 1]).toBe(
            RESEARCH_AWS_PROFILE
          );
          return success({
            VersionId: "version-1",
            ChecksumSHA256: Buffer.from(sha256, "hex").toString(
              "base64"
            )
          });
        }
        throw new Error(`unexpected command ${args.join(" ")}`);
      });
      const result = await uploadPackage({
        repoRoot: root,
        manifest,
        packageId: packageRecord.packageId,
        destination,
        runner,
        now: () => "2026-07-24T00:00:00.000Z"
      });
      expect(result.disposition).toBe("UPLOADED_CONDITIONALLY");
      expect(packageRecord.remote.s3).toMatchObject({
        versionId: "version-1",
        metadataSha256: sha256,
        contentLength: sizeBytes,
        serverSideEncryption: "aws:kms",
        verificationStatus: "VERIFIED",
        deletionStatus: "LOCAL_RETAINED"
      });
      expect(
        runner.mock.calls.filter(
          ([args]) =>
            args[0] === "s3api" && args[1] === "put-object"
        )
      ).toHaveLength(1);
      expect(validateManifestDigest(manifest)).toBe(manifest);
    }
  );
});

test("never overwrites an existing matching immutable object", async () => {
  await withTemporaryPackage(
    async ({
      root,
      manifest,
      packageRecord,
      sha256,
      sizeBytes
    }) => {
      const runner = vi.fn(async (args) => {
        if (args[0] === "sts") return identity();
        const control = bucketControlResult(args);
        if (control) return control;
        if (args[0] === "s3api" && args[1] === "head-object") {
          return success(remoteHead({ sha256, sizeBytes }));
        }
        throw new Error("put-object must not run");
      });
      const result = await uploadPackage({
        repoRoot: root,
        manifest,
        packageId: packageRecord.packageId,
        destination,
        runner
      });
      expect(result.disposition).toBe(
        "ALREADY_PRESENT_VERIFIED_NO_OVERWRITE"
      );
      expect(
        runner.mock.calls.some(
          ([args]) =>
            args[0] === "s3api" && args[1] === "put-object"
        )
      ).toBe(false);
    }
  );
});

test("stops before object access when bucket versioning is not enabled", async () => {
  await withTemporaryPackage(
    async ({ root, manifest, packageRecord }) => {
      const runner = vi.fn(async (args) => {
        if (args[0] === "sts") return identity();
        if (args[1] === "get-bucket-versioning") {
          return success({ Status: "Suspended" });
        }
        const control = bucketControlResult(args);
        if (control) return control;
        throw new Error("object access must not run");
      });
      await expect(
        uploadPackage({
          repoRoot: root,
          manifest,
          packageId: packageRecord.packageId,
          destination,
          runner
        })
      ).rejects.toThrow(/UNSAFE_BUCKET_VERSIONING/);
      expect(
        runner.mock.calls.some(
          ([args]) =>
            args[1] === "head-object" ||
            args[1] === "put-object"
        )
      ).toBe(false);
    }
  );
});

test("stops before object access when Block Public Access is incomplete", async () => {
  await withTemporaryPackage(
    async ({ root, manifest, packageRecord }) => {
      const runner = vi.fn(async (args) => {
        if (args[0] === "sts") return identity();
        if (args[1] === "get-public-access-block") {
          return success({
            PublicAccessBlockConfiguration: {
              BlockPublicAcls: true,
              IgnorePublicAcls: true,
              BlockPublicPolicy: true,
              RestrictPublicBuckets: false
            }
          });
        }
        const control = bucketControlResult(args);
        if (control) return control;
        throw new Error("object access must not run");
      });
      await expect(
        uploadPackage({
          repoRoot: root,
          manifest,
          packageId: packageRecord.packageId,
          destination,
          runner
        })
      ).rejects.toThrow(/UNSAFE_BUCKET_PUBLIC_ACCESS/);
      expect(
        runner.mock.calls.some(
          ([args]) =>
            args[1] === "head-object" ||
            args[1] === "put-object"
        )
      ).toBe(false);
    }
  );
});

test("rejects any lifecycle expiration outside temporary/", async () => {
  await withTemporaryPackage(
    async ({ root, manifest, packageRecord }) => {
      const runner = vi.fn(async (args) => {
        if (args[0] === "sts") return identity();
        if (
          args[1] ===
          "get-bucket-lifecycle-configuration"
        ) {
          return success({
            Rules: [
              {
                ID: "unsafe-global-expiration",
                Status: "Enabled",
                Prefix: "",
                Expiration: { Days: 30 }
              }
            ]
          });
        }
        const control = bucketControlResult(args);
        if (control) return control;
        throw new Error("object access must not run");
      });
      await expect(
        uploadPackage({
          repoRoot: root,
          manifest,
          packageId: packageRecord.packageId,
          destination,
          runner
        })
      ).rejects.toThrow(/UNSAFE_BUCKET_LIFECYCLE/);
      expect(
        runner.mock.calls.some(
          ([args]) =>
            args[1] === "head-object" ||
            args[1] === "put-object"
        )
      ).toBe(false);
    }
  );
});

test("restored-byte proof rejects a corrupt exact-version download and removes its temporary file", async () => {
  await withTemporaryPackage(
    async ({
      root,
      manifest,
      packageRecord,
      sha256,
      sizeBytes
    }) => {
      markRemoteVerified(packageRecord, sha256, sizeBytes);
      resealManifest(manifest);
      const runner = vi.fn(async (args) => {
        if (args[1] === "get-object") {
          await writeFile(
            args.at(-1),
            Buffer.alloc(sizeBytes, 0x78)
          );
          return success(
            remoteHead({
              sha256,
              sizeBytes,
              versionId: packageRecord.remote.s3.versionId
            })
          );
        }
        throw new Error(`unexpected command ${args.join(" ")}`);
      });
      await expect(
        proveRemoteVersionRestorable({
          repoRoot: root,
          destination,
          packageRecord,
          runner
        })
      ).rejects.toThrow(/RESTORED_CHECKSUM_MISMATCH/);
      const cacheEntries = await readdir(
        join(root, CACHE_RELATIVE_PATH)
      );
      expect(
        cacheEntries.some((entry) =>
          entry.startsWith("migration-restore-")
        )
      ).toBe(false);
    }
  );
});

test("hydrates a deleted standalone package from its exact version without making cleanup eligible", async () => {
  await withTemporaryPackage(
    async ({
      root,
      manifest,
      packageRecord,
      sha256,
      sizeBytes,
      localPath
    }) => {
      const original = await readFile(localPath);
      markRemoteVerified(packageRecord, sha256, sizeBytes);
      manifest.execution.finalCleanupValidation = {
        status: "PASSED"
      };
      manifest.execution.lastEcrRestoreReplay = {
        status: "PASS"
      };
      resealManifest(manifest);
      await rm(localPath);
      const runner = vi.fn(async (args) => {
        if (args[0] === "sts") return identity();
        const control = bucketControlResult(args);
        if (control) return control;
        if (args[1] === "get-object") {
          await writeFile(args.at(-1), original);
          return success(
            remoteHead({
              sha256,
              sizeBytes,
              versionId: packageRecord.remote.s3.versionId
            })
          );
        }
        throw new Error(`unexpected command ${args.join(" ")}`);
      });
      const result = await hydratePackage({
        repoRoot: root,
        manifest,
        packageId: packageRecord.packageId,
        destination,
        runner
      });
      expect(result).toMatchObject({
        disposition: "PACKAGE_HYDRATED_WITHOUT_OVERWRITE",
        hydrationMode: "EXACT_FILE_HARD_LINK",
        restoredSha256: sha256,
        materializationGeneration: 1,
        cleanupActionGenerationByType: {
          PACKAGE_CANONICAL_FILE: 1
        },
        materializedCleanupActionTypes: [
          "PACKAGE_CANONICAL_FILE"
        ]
      });
      expect(await readFile(localPath)).toEqual(original);
      expect(packageRecord.cleanupEligibility.status).toBe("BLOCKED");
      expect(
        manifest.execution.finalCleanupValidation.status
      ).toBe("INVALIDATED_BY_HYDRATION");
      expect(
        manifest.execution.lastEcrRestoreReplay.status
      ).toBe("INVALIDATED_BY_HYDRATION");
      await expect(
        hydratePackage({
          repoRoot: root,
          manifest,
          packageId: packageRecord.packageId,
          destination,
          runner
        })
      ).rejects.toThrow(/RESTORE_TARGET_ALREADY_EXISTS/);
    }
  );
});

test("verifies a parent-owned license object independently without overwriting the hydrated repository file", async () => {
  await withTemporaryPackage(
    async ({
      root,
      manifest,
      packageRecord,
      sha256,
      sizeBytes,
      localPath
    }) => {
      const licenseBytes = await readFile(localPath);
      const repositoryRelativePath =
        `${CACHE_RELATIVE_PATH}/repos/example`;
      const repositoryPath = join(root, repositoryRelativePath);
      const licenseRelativePath =
        `${repositoryRelativePath}/LICENSE`;
      const licensePath = join(root, licenseRelativePath);
      await mkdir(repositoryPath, { recursive: true });
      await writeFile(licensePath, licenseBytes);
      const parentPackage = {
        packageId: "git-repository:example",
        packageType: "PINNED_GIT_REPOSITORY",
        localPath: repositoryRelativePath,
        plannedObject: {
          key: "raw/example/git-" + "a".repeat(40) +
            "/" + "b".repeat(64) + "/example.bundle"
        },
        s3Uri:
          `s3://${RESEARCH_S3_BUCKET}/raw/example/git-` +
          `${"a".repeat(40)}/${"b".repeat(64)}/example.bundle`,
        localRetentionPolicy:
          "DELETE_AFTER_VERIFIED_MIGRATION"
      };
      const licenseKey =
        `licenses/example/git-${"a".repeat(40)}/` +
        `${sha256}/LICENSE`;
      Object.assign(packageRecord, {
        packageId: "repository-license:example:LICENSE",
        packageType: "REPOSITORY_LICENSE_ARTIFACT",
        localPath: licenseRelativePath,
        parentPackageId: parentPackage.packageId,
        coverage: {
          mode: "DUPLICATE_CHILD_OBJECT",
          fileCount: 1,
          totalSizeBytes: sizeBytes,
          physicalOwnership: "PARENT_REPOSITORY_PACKAGE",
          parentPackageId: parentPackage.packageId
        },
        localRetentionPolicy:
          "DELETE_WITH_PARENT_REPOSITORY",
        localLifecycle: {
          ownerPackageId: parentPackage.packageId,
          ownershipMode:
            "PARENT_REPOSITORY_OWNS_LOCAL_BYTES"
        },
        s3Uri:
          `s3://${RESEARCH_S3_BUCKET}/${licenseKey}`
      });
      Object.assign(packageRecord.plannedObject, {
        key: licenseKey,
        contentType: "text/plain"
      });
      Object.assign(packageRecord.remote.s3, {
        key: licenseKey,
        s3Uri:
          `s3://${RESEARCH_S3_BUCKET}/${licenseKey}`
      });
      manifest.packages.unshift(parentPackage);
      markRemoteVerified(packageRecord, sha256, sizeBytes);
      resealManifest(manifest);

      const invalid = structuredClone(manifest);
      const invalidLicense = invalid.packages.find(
        (entry) =>
          entry.packageId === packageRecord.packageId
      );
      invalidLicense.parentPackageId =
        "git-repository:missing";
      invalidLicense.localLifecycle.ownerPackageId =
        "git-repository:missing";
      resealManifest(invalid);
      expect(() => validateManifestDigest(invalid)).toThrow(
        /MANIFEST_PARENT_OWNED_PACKAGE_INVALID/
      );

      const runner = vi.fn(async (args) => {
        if (args[0] === "sts") return identity();
        const control = bucketControlResult(args);
        if (control) return control;
        if (args[1] === "get-object") {
          await writeFile(args.at(-1), licenseBytes);
          return success(
            remoteHead({
              sha256,
              sizeBytes,
              versionId: packageRecord.remote.s3.versionId,
              contentType: "text/plain"
            })
          );
        }
        throw new Error(
          `unexpected command ${args.join(" ")}`
        );
      });
      const result = await hydratePackage({
        repoRoot: root,
        manifest,
        packageId: packageRecord.packageId,
        destination,
        runner
      });
      expect(result).toMatchObject({
        disposition: "PACKAGE_HYDRATED_WITHOUT_OVERWRITE",
        hydrationMode:
          "VERIFIED_EXACT_FILE_FROM_HYDRATED_PARENT_REPOSITORY",
        restoredSha256: sha256
      });
      expect(await readFile(licensePath)).toEqual(licenseBytes);

      await rm(licensePath);
      await expect(
        hydratePackage({
          repoRoot: root,
          manifest,
          packageId: packageRecord.packageId,
          destination,
          runner
        })
      ).rejects.toThrow(
        /PARENT_REPOSITORY_HYDRATION_REQUIRED/
      );
    }
  );
});

test("materializes an embedded license from its checksum-pinned parent and orders parent hydration first", {
  timeout: 30_000
}, async () => {
  await withTemporaryPackage(async (context) => {
    const memberBytes = Buffer.from(
      "Exact embedded license\n",
      "utf8"
    );
    const memberSha256 = createHash("sha256")
      .update(memberBytes)
      .digest("hex");
    const memberPath =
      "example-1.0.dist-info/licenses/LICENSE";
    const key =
      `licenses/example/test-${context.sha256.slice(0, 12)}/` +
      `${memberSha256}/tiny-source.json/${memberPath}`;
    const stagedLocalPath =
      `${CACHE_RELATIVE_PATH}/migration-staging/embedded-licenses/` +
      `${context.sha256}/${memberSha256}/tiny-source.json/` +
      memberPath;
    const child = {
      packageId: "embedded-license:test",
      packageType: "EMBEDDED_LICENSE_ARTIFACT",
      localPath: context.packageRecord.localPath,
      parentPackageId: context.packageRecord.packageId,
      coverage: {
        mode: "DUPLICATE_CHILD_OBJECT",
        fileCount: 1,
        totalSizeBytes: memberBytes.length,
        physicalOwnership: "PARENT_ARCHIVE_PACKAGE",
        parentPackageId: context.packageRecord.packageId
      },
      fingerprint: {
        algorithm: "SHA-256",
        digest: memberSha256
      },
      plannedObject: {
        key,
        contentType: "text/plain",
        expectedSizeBytes: memberBytes.length,
        expectedSha256: memberSha256,
        uploadReady: false,
        state: "EMBEDDED_LICENSE_EXTRACTION_REQUIRED",
        localFilePath: stagedLocalPath,
        extractionPlan: {
          archiveFormat: "ZIP",
          parentPackageId:
            context.packageRecord.packageId,
          parentLocalPath:
            context.packageRecord.localPath,
          parentExpectedSha256: context.sha256,
          memberPath,
          materialized: false
        }
      },
      s3Uri: `s3://${RESEARCH_S3_BUCKET}/${key}`,
      localRetentionPolicy:
        "DELETE_AFTER_VERIFIED_MIGRATION",
      localLifecycle: {
        ownerPackageId: context.packageRecord.packageId,
        ownershipMode:
          "MEMBER_BYTES_OWNED_BY_PARENT_ARCHIVE"
      },
      embeddedMember: {
        archiveFormat: "ZIP",
        parentPackageId: context.packageRecord.packageId,
        parentLocalPath: context.packageRecord.localPath,
        parentExpectedSha256: context.sha256,
        memberPath
      },
      sourceOrganization:
        context.packageRecord.sourceOrganization,
      source: structuredClone(context.packageRecord.source),
      release: structuredClone(
        context.packageRecord.release
      ),
      acquisition: structuredClone(
        context.packageRecord.acquisition
      ),
      license: structuredClone(
        context.packageRecord.license
      ),
      ingestion: structuredClone(
        context.packageRecord.ingestion
      ),
      reproducibility: {
        status:
          "DETERMINISTIC_EXTRACTION_FROM_CHECKSUM_PINNED_PARENT",
        proofReferences: [],
        offlineInput: true,
        blocker: null
      },
      acquisitionTimestamp:
        context.packageRecord.acquisitionTimestamp,
      cleanupEligibility: {
        status: "BLOCKED",
        activeConsumerPaths: [],
        blocker: "test"
      },
      remote: {
        s3: {
          bucket: RESEARCH_S3_BUCKET,
          key,
          s3Uri: `s3://${RESEARCH_S3_BUCKET}/${key}`,
          verificationStatus: "ARCHIVE_NOT_MATERIALIZED",
          deletionStatus: "LOCAL_RETAINED"
        }
      }
    };
    context.manifest.packages.push(child);
    context.manifest.embeddedLicenseExtractionNeeds = [
      {
        packageId: child.packageId,
        status: "NOT_MATERIALIZED",
        uploadReady: false
      }
    ];
    resealManifest(context.manifest);
    const interruptedManifest = structuredClone(
      context.manifest
    );
    const mismatchedInterruptedManifest =
      structuredClone(context.manifest);
    const racedInterruptedManifest =
      structuredClone(context.manifest);
    expect(packageHydrationOrder(context.manifest)).toEqual([
      context.packageRecord.packageId,
      child.packageId
    ]);
    const archiveMemberReader = vi.fn(
      async () => memberBytes
    );
    const prepared = await prepareAllRepositoryArchives({
      repoRoot: context.root,
      manifest: context.manifest,
      archiveMemberReader,
      now: () => "2026-07-24T00:00:00.000Z"
    });
    expect(prepared).toMatchObject({
      disposition:
        "ALL_REPOSITORY_ARCHIVES_AND_EMBEDDED_LICENSES_PREPARED",
      packageCount: 1,
      repositoryPackageCount: 0,
      embeddedLicensePackageCount: 1
    });
    const [first] = prepared.results;
    expect(first).toMatchObject({
      disposition: "EMBEDDED_LICENSE_MATERIALIZED",
      sizeBytes: memberBytes.length,
      sha256: memberSha256
    });
    expect(
      await readFile(join(context.root, stagedLocalPath))
    ).toEqual(memberBytes);
    expect(child.plannedObject).toMatchObject({
      uploadReady: true,
      state: "EMBEDDED_LICENSE_MATERIALIZED",
      extractionPlan: {
        materialized: true,
        materializedAt:
          "2026-07-24T00:00:00.000Z"
      }
    });
    expect(
      context.manifest.embeddedLicenseExtractionNeeds[0]
    ).toMatchObject({
      status: "MATERIALIZED_NOT_UPLOADED",
      uploadReady: true
    });
    const adopted =
      await prepareEmbeddedLicenseArtifact({
        repoRoot: context.root,
        manifest: interruptedManifest,
        packageId: child.packageId,
        archiveMemberReader,
        now: () =>
          "2026-07-24T00:00:01.000Z"
      });
    expect(adopted).toMatchObject({
      disposition:
        "EMBEDDED_LICENSE_INTERRUPTED_STAGING_ADOPTED",
      sizeBytes: memberBytes.length,
      sha256: memberSha256
    });
    expect(
      interruptedManifest.packages.find(
        (entry) => entry.packageId === child.packageId
      ).plannedObject
    ).toMatchObject({
      uploadReady: true,
      state: "EMBEDDED_LICENSE_MATERIALIZED"
    });
    await writeFile(
      join(context.root, stagedLocalPath),
      "corrupt interrupted staging\n",
      "utf8"
    );
    await expect(
      prepareEmbeddedLicenseArtifact({
        repoRoot: context.root,
        manifest: mismatchedInterruptedManifest,
        packageId: child.packageId,
        archiveMemberReader
      })
    ).rejects.toThrow(
      /EMBEDDED_LICENSE_INTERRUPTED_STAGING_MISMATCH/
    );
    await writeFile(
      join(context.root, stagedLocalPath),
      memberBytes
    );
    await expect(
      prepareEmbeddedLicenseArtifact({
        repoRoot: context.root,
        manifest: racedInterruptedManifest,
        packageId: child.packageId,
        archiveMemberReader: async () => {
          await writeFile(
            join(context.root, stagedLocalPath),
            "changed during adoption\n",
            "utf8"
          );
          return memberBytes;
        }
      })
    ).rejects.toThrow(
      /EMBEDDED_LICENSE_INTERRUPTED_STAGING_CHANGED/
    );
    await writeFile(
      join(context.root, stagedLocalPath),
      memberBytes
    );
    const second = await prepareEmbeddedLicenseArtifact({
      repoRoot: context.root,
      manifest: context.manifest,
      packageId: child.packageId,
      archiveMemberReader
    });
    expect(second.disposition).toBe(
      "EMBEDDED_LICENSE_ALREADY_MATERIALIZED_VERIFIED"
    );
    expect(archiveMemberReader).toHaveBeenCalledTimes(3);
    markRemoteVerified(
      child,
      memberSha256,
      memberBytes.length
    );
    resealManifest(context.manifest);
    await rm(join(context.root, stagedLocalPath));
    const hydrationRunner = vi.fn(async (args) => {
      if (args[0] === "sts") return identity();
      const control = bucketControlResult(args);
      if (control) return control;
      if (args[1] === "get-object") {
        await writeFile(args.at(-1), memberBytes);
        return success(
          remoteHead({
            sha256: memberSha256,
            sizeBytes: memberBytes.length,
            versionId: child.remote.s3.versionId,
            contentType: "text/plain"
          })
        );
      }
      throw new Error(
        `unexpected command ${args.join(" ")}`
      );
    });
    const hydrated = await hydratePackage({
      repoRoot: context.root,
      manifest: context.manifest,
      packageId: child.packageId,
      destination,
      runner: hydrationRunner,
      archiveMemberReader
    });
    expect(hydrated).toMatchObject({
      hydrationMode:
        "VERIFIED_EXACT_MEMBER_FROM_HYDRATED_PARENT_PACKAGE",
      restoredSha256: memberSha256,
      localPaths: [
        `${context.packageRecord.localPath}!/${memberPath}`
      ]
    });
    expect(validateManifestDigest(context.manifest)).toBe(
      context.manifest
    );

    await prepareEmbeddedLicenseArtifact({
      repoRoot: context.root,
      manifest: context.manifest,
      packageId: child.packageId,
      archiveMemberReader
    });
    markRemoteVerified(
      context.packageRecord,
      context.sha256,
      context.sizeBytes
    );
    markRemoteVerified(
      child,
      memberSha256,
      memberBytes.length
    );
    markCleanupEligible(context.manifest, [
      context.packageRecord,
      child
    ]);
    const manifestPath = await persistManifest(
      context.root,
      context.manifest
    );
    const remoteBytes = new Map([
      [
        context.packageRecord.plannedObject.key,
        await readFile(context.localPath)
      ],
      [child.plannedObject.key, memberBytes]
    ]);
    const cleanupRunner = vi.fn(async (args) => {
      if (args[0] === "sts") return identity();
      const control = bucketControlResult(args);
      if (control) return control;
      const key = args[args.indexOf("--key") + 1];
      const packageRecord =
        key === child.plannedObject.key
          ? child
          : context.packageRecord;
      const bytes = remoteBytes.get(key);
      if (args[1] === "head-object") {
        return success(
          remoteHead({
            sha256:
              packageRecord.plannedObject.expectedSha256,
            sizeBytes:
              packageRecord.plannedObject.expectedSizeBytes,
            versionId: packageRecord.remote.s3.versionId,
            contentType:
              packageRecord.plannedObject.contentType
          })
        );
      }
      if (args[1] === "get-object") {
        await writeFile(args.at(-1), bytes);
        return success(
          remoteHead({
            sha256:
              packageRecord.plannedObject.expectedSha256,
            sizeBytes:
              packageRecord.plannedObject.expectedSizeBytes,
            versionId: packageRecord.remote.s3.versionId,
            contentType:
              packageRecord.plannedObject.contentType
          })
        );
      }
      throw new Error(
        `unexpected command ${args.join(" ")}`
      );
    });
    const deleteFile = vi.fn(async (path) => {
      await rm(path);
    });
    await expect(
      cleanupPackage({
        repoRoot: context.root,
        manifestPath,
        manifest: context.manifest,
        packageId: child.packageId,
        destination,
        confirmDeleteLocal: true,
        runner: cleanupRunner,
        gitRunner: cleanValidationGitRunner(),
        deleteFile
      })
    ).rejects.toThrow(
      /PARENT_OWNED_PACKAGE_CLEANUP_REQUIRES_BATCH/
    );
    await expect(
      cleanupPackage({
        repoRoot: context.root,
        manifestPath,
        manifest: context.manifest,
        packageId: context.packageRecord.packageId,
        destination,
        confirmDeleteLocal: true,
        runner: cleanupRunner,
        gitRunner: cleanValidationGitRunner(),
        deleteFile
      })
    ).rejects.toThrow(
      /PARENT_REPOSITORY_CLEANUP_REQUIRES_BATCH/
    );
    expect(cleanupRunner).not.toHaveBeenCalled();
    const cleaned = await cleanupAllPackages({
      repoRoot: context.root,
      manifestPath,
      manifest: context.manifest,
      destination,
      confirmDeleteLocal: true,
      runner: cleanupRunner,
      gitRunner: cleanValidationGitRunner(),
      archiveMemberReader,
      deleteFile,
      now: () => "2026-07-24T04:00:00.000Z"
    });
    expect(cleaned).toMatchObject({
      disposition:
        "ALL_PACKAGES_PREFLIGHTED_BEFORE_LOCAL_CLEANUP",
      packageCount: 2,
      deletedPackageCount: 2,
      retainedPackageCount: 0
    });
    expect(archiveMemberReader).toHaveBeenCalledTimes(6);
    expect(deleteFile).toHaveBeenCalledTimes(2);
    await expect(readFile(context.localPath)).rejects.toThrow();
    await expect(
      readFile(join(context.root, stagedLocalPath))
    ).rejects.toThrow();
    expect(validateManifestDigest(context.manifest)).toBe(
      context.manifest
    );

    const restored = await hydrateAllPackages({
      repoRoot: context.root,
      manifest: context.manifest,
      destination,
      runner: cleanupRunner,
      archiveMemberReader,
      now: () => "2026-07-24T04:30:00.000Z"
    });
    expect(restored).toMatchObject({
      disposition:
        "ALL_PACKAGES_HYDRATED_IN_DEPENDENCY_ORDER",
      packageCount: 2,
      order: [
        context.packageRecord.packageId,
        child.packageId
      ],
      results: [
        {
          packageId: context.packageRecord.packageId,
          hydrationMode: "EXACT_FILE_HARD_LINK"
        },
        {
          packageId: child.packageId,
          hydrationMode:
            "VERIFIED_EXACT_MEMBER_FROM_HYDRATED_PARENT_PACKAGE"
        }
      ]
    });
    expect(await readFile(context.localPath)).toEqual(
      remoteBytes.get(
        context.packageRecord.plannedObject.key
      )
    );
    await expect(
      readFile(join(context.root, stagedLocalPath))
    ).rejects.toThrow();
    expect(archiveMemberReader).toHaveBeenCalledTimes(7);
    expect(validateManifestDigest(context.manifest)).toBe(
      context.manifest
    );
  });
});

test("rejects archive member patterns and option-like paths before extraction", async () => {
  for (const memberPath of [
    "licenses/LICENSE*",
    "licenses/NOTICE?.txt",
    "licenses/[A-Z]COPYING",
    "-C/LICENSE"
  ]) {
    await expect(
      readArchiveMember({
        archivePath: "does-not-exist.zip",
        archiveFormat: "ZIP",
        memberPath
      })
    ).rejects.toThrow(/ARCHIVE_MEMBER_PATH_UNSAFE/);
  }
});

test("resolves every declared wheel License-File entry exactly", () => {
  const metadataMemberPath =
    "example-1.0.dist-info/METADATA";
  const members = [
    metadataMemberPath,
    "example-1.0.dist-info/licenses/LICENSE-APACHE",
    "example-1.0.dist-info/NOTICE"
  ];
  expect(
    declaredWheelLicenseMembers({
      members,
      metadataMemberPath,
      metadataText: [
        "Metadata-Version: 2.4",
        "Name: example",
        "License-File: LICENSE-APACHE",
        "License-File: NOTICE",
        "",
        "Description body"
      ].join("\n"),
      packageId: "wheel:example"
    })
  ).toEqual([
    "example-1.0.dist-info/licenses/LICENSE-APACHE",
    "example-1.0.dist-info/NOTICE"
  ]);
});

test("fails closed when a declared wheel license is missing, ambiguous, or unsafe", () => {
  const metadataMemberPath =
    "example-1.0.dist-info/METADATA";
  const base = {
    metadataMemberPath,
    packageId: "wheel:example"
  };
  expect(() =>
    declaredWheelLicenseMembers({
      ...base,
      members: [metadataMemberPath],
      metadataText: [
        "Metadata-Version: 2.4",
        "License-File: LICENSE",
        ""
      ].join("\n")
    })
  ).toThrow(/WHEEL_DECLARED_LICENSE_MEMBER_MISSING/);
  expect(() =>
    declaredWheelLicenseMembers({
      ...base,
      members: [
        metadataMemberPath,
        "example-1.0.dist-info/licenses/LICENSE",
        "example-1.0.dist-info/LICENSE"
      ],
      metadataText: [
        "Metadata-Version: 2.4",
        "License-File: LICENSE",
        ""
      ].join("\n")
    })
  ).toThrow(/WHEEL_DECLARED_LICENSE_MEMBER_AMBIGUOUS/);
  expect(() =>
    declaredWheelLicenseMembers({
      ...base,
      members: [metadataMemberPath],
      metadataText: [
        "Metadata-Version: 2.4",
        "License-File: ../LICENSE",
        ""
      ].join("\n")
    })
  ).toThrow(/WHEEL_LICENSE_FILE_DECLARATION_INVALID/);
});

test("prepare-all rolls back embedded license state and staging files after a later extraction fails", {
  timeout: 30_000
}, async () => {
  await withTemporaryPackage(async (context) => {
    const firstBytes = Buffer.from(
      "First exact license\n",
      "utf8"
    );
    const secondBytes = Buffer.from(
      "Second exact license\n",
      "utf8"
    );
    const wrongSecondBytes = Buffer.from(secondBytes);
    wrongSecondBytes[0] ^= 1;
    const buildChild = ({
      suffix,
      memberPath,
      memberBytes
    }) => {
      const digest = createHash("sha256")
        .update(memberBytes)
        .digest("hex");
      const key =
        `licenses/test/rollback/${digest}/` +
        `${suffix}/${memberPath}`;
      const localFilePath =
        `${CACHE_RELATIVE_PATH}/migration-staging/embedded-licenses/` +
        `rollback/${suffix}/${memberPath}`;
      return {
        packageId: `embedded-license:rollback-${suffix}`,
        packageType: "EMBEDDED_LICENSE_ARTIFACT",
        localPath: context.packageRecord.localPath,
        parentPackageId:
          context.packageRecord.packageId,
        coverage: {
          mode: "DUPLICATE_CHILD_OBJECT",
          fileCount: 1,
          totalSizeBytes: memberBytes.length,
          physicalOwnership: "PARENT_ARCHIVE_PACKAGE",
          parentPackageId:
            context.packageRecord.packageId
        },
        fingerprint: {
          algorithm: "SHA-256",
          digest
        },
        plannedObject: {
          key,
          contentType: "text/plain",
          expectedSizeBytes: memberBytes.length,
          expectedSha256: digest,
          uploadReady: false,
          state:
            "EMBEDDED_LICENSE_EXTRACTION_REQUIRED",
          localFilePath,
          extractionPlan: {
            archiveFormat: "ZIP",
            parentPackageId:
              context.packageRecord.packageId,
            parentLocalPath:
              context.packageRecord.localPath,
            parentExpectedSha256: context.sha256,
            memberPath,
            materialized: false
          }
        },
        s3Uri: `s3://${RESEARCH_S3_BUCKET}/${key}`,
        localRetentionPolicy:
          "DELETE_AFTER_VERIFIED_MIGRATION",
        localLifecycle: {
          ownerPackageId:
            context.packageRecord.packageId,
          ownershipMode:
            "MEMBER_BYTES_OWNED_BY_PARENT_ARCHIVE"
        },
        embeddedMember: {
          archiveFormat: "ZIP",
          parentPackageId:
            context.packageRecord.packageId,
          parentLocalPath:
            context.packageRecord.localPath,
          parentExpectedSha256: context.sha256,
          memberPath
        },
        remote: {
          s3: {
            bucket: RESEARCH_S3_BUCKET,
            key,
            s3Uri:
              `s3://${RESEARCH_S3_BUCKET}/${key}`,
            verificationStatus:
              "ARCHIVE_NOT_MATERIALIZED",
            deletionStatus: "LOCAL_RETAINED"
          }
        }
      };
    };
    const first = buildChild({
      suffix: "first",
      memberPath: "licenses/FIRST-LICENSE",
      memberBytes: firstBytes
    });
    const second = buildChild({
      suffix: "second",
      memberPath: "licenses/SECOND-LICENSE",
      memberBytes: secondBytes
    });
    context.manifest.packages.push(first, second);
    context.manifest.embeddedLicenseExtractionNeeds = [
      first,
      second
    ].map((packageRecord) => ({
      packageId: packageRecord.packageId,
      status: "NOT_MATERIALIZED",
      uploadReady: false
    }));
    resealManifest(context.manifest);
    const originalDigest =
      context.manifest.manifestContentSha256;
    const archiveMemberReader = vi.fn(
      async ({ memberPath }) =>
        memberPath === first.embeddedMember.memberPath
          ? firstBytes
          : wrongSecondBytes
    );
    await expect(
      prepareAllRepositoryArchives({
        repoRoot: context.root,
        manifest: context.manifest,
        archiveMemberReader
      })
    ).rejects.toThrow(
      /EMBEDDED_LICENSE_CHECKSUM_MISMATCH/
    );
    expect(archiveMemberReader).toHaveBeenCalledTimes(2);
    expect(
      context.manifest.manifestContentSha256
    ).toBe(originalDigest);
    for (const packageId of [
      first.packageId,
      second.packageId
    ]) {
      const restored = context.manifest.packages.find(
        (packageRecord) =>
          packageRecord.packageId === packageId
      );
      expect(restored.plannedObject).toMatchObject({
        uploadReady: false,
        state:
          "EMBEDDED_LICENSE_EXTRACTION_REQUIRED",
        extractionPlan: {
          materialized: false
        }
      });
      await expect(
        readFile(
          join(
            context.root,
            restored.plannedObject.localFilePath
          )
        )
      ).rejects.toThrow();
    }
    expect(validateManifestDigest(context.manifest)).toBe(
      context.manifest
    );
  });
});

test("rejects a remote object whose checksum, version, or encryption is not verified", () => {
  const sha256 = "a".repeat(64);
  const valid = remoteHead({ sha256, sizeBytes: 42 });
  expect(verifyRemoteObject(valid, { sha256, sizeBytes: 42 })).toMatchObject({
    versionId: "version-1",
    contentLength: 42
  });
  expect(() =>
    verifyRemoteObject(
      {
        ...valid,
        Metadata: { sha256: "b".repeat(64) }
      },
      { sha256, sizeBytes: 42 }
    )
  ).toThrow(/REMOTE_METADATA_CHECKSUM_MISMATCH/);
  expect(() =>
    verifyRemoteObject(
      { ...valid, VersionId: null },
      { sha256, sizeBytes: 42 }
    )
  ).toThrow(/REMOTE_VERSION_MISSING/);
  expect(() =>
    verifyRemoteObject(
      { ...valid, ServerSideEncryption: undefined },
      { sha256, sizeBytes: 42 }
    )
  ).toThrow(/REMOTE_ENCRYPTION_MISSING/);
  expect(() =>
    verifyRemoteObject(
      { ...valid, ContentType: "text/plain" },
      {
        sha256,
        sizeBytes: 42,
        contentType: "application/json"
      }
    )
  ).toThrow(/REMOTE_CONTENT_TYPE_MISMATCH/);
});

test("final cleanup validation is fail-closed and records the exact validated tree only after success", async () => {
  await withTemporaryPackage(
    async ({
      root,
      manifest,
      packageRecord,
      sha256,
      sizeBytes
    }) => {
      markRemoteVerified(packageRecord, sha256, sizeBytes);
      Object.assign(packageRecord.cleanupEligibility, {
        restoredVersionId: packageRecord.remote.s3.versionId,
        restoredSha256: sha256,
        restoredAt: "2026-07-24T00:00:00.000Z"
      });
      resealManifest(manifest);
      const manifestPath = join(root, "manifest.json");
      await expect(
        recordAllCleanupValidation({
          repoRoot: root,
          manifestPath,
          manifest,
          validationCommand: "true",
          confirmNoActiveConsumers: true
        })
      ).rejects.toThrow(
        /FIXED_VALIDATION_COMMAND_REQUIRED/
      );
      const skippedValidationRunner = vi.fn();
      await expect(
        recordAllCleanupValidation({
          repoRoot: root,
          manifestPath,
          manifest,
          validationCommand:
            FINAL_CLEANUP_VALIDATION_COMMAND,
          confirmNoActiveConsumers: true,
          proofValidationRunner: async () => ({
            status: "STALE_SOURCE_FINGERPRINT",
            runId: "local-content-stale",
            recordContentSha256: "a".repeat(64),
            processWideNetworkIsolationVerified: true
          }),
          gitRunner: cleanValidationGitRunner(),
          validationRunner: skippedValidationRunner
        })
      ).rejects.toThrow(
        /CURRENT_CONTENT_BOUND_PROOF_REQUIRED/
      );
      expect(skippedValidationRunner).not.toHaveBeenCalled();
      await expect(
        recordAllCleanupValidation({
          repoRoot: root,
          manifestPath,
          manifest,
          validationCommand:
            FINAL_CLEANUP_VALIDATION_COMMAND,
          confirmNoActiveConsumers: true,
          proofValidationRunner: async () => ({
            status: "CURRENT_LOCAL_CONTENT_BOUND_PASS",
            runId: "local-content-test",
            recordContentSha256: "a".repeat(64),
            processWideNetworkIsolationVerified: true
          }),
          gitRunner: cleanValidationGitRunner(),
          validationRunner: async () => ({
            exitCode: 1,
            stdout: "",
            stderr: "test failed"
          })
        })
      ).rejects.toThrow(/FINAL_VALIDATION_FAILED/);
      expect(packageRecord.cleanupEligibility.status).toBe(
        "BLOCKED"
      );

      const result = await recordAllCleanupValidation({
        repoRoot: root,
        manifestPath,
        manifest,
        validationCommand:
          FINAL_CLEANUP_VALIDATION_COMMAND,
        confirmNoActiveConsumers: true,
        proofValidationRunner: async () => ({
          status: "CURRENT_LOCAL_CONTENT_BOUND_PASS",
          runId: "local-content-test",
          recordContentSha256: "a".repeat(64),
          processWideNetworkIsolationVerified: true
        }),
        gitRunner: cleanValidationGitRunner(),
        validationRunner: async () => ({
          exitCode: 0,
          stdout: "passed",
          stderr: ""
        }),
        now: () => "2026-07-24T04:00:00.000Z"
      });
      expect(result).toMatchObject({
        disposition:
          "ALL_PACKAGES_MARKED_CLEANUP_ELIGIBLE",
        packageCount: 1
      });
      expect(packageRecord.cleanupEligibility).toMatchObject({
        status: "ELIGIBLE",
        activeConsumerPaths: [],
        validationStatus: "PASSED",
        validatedSourceCommit: "validated-head",
        validatedRepositoryTreeDigest: EMPTY_TREE_DIGEST
      });
      expect(
        manifest.execution.finalCleanupValidation
      ).toMatchObject({
        repositoryTreeDigestSchemaVersion:
          "git-ls-tree-r-nul-v1",
        repositoryTreeDigestExcludedPaths: [
          "manifest.json"
        ]
      });
      expect(validateManifestDigest(manifest)).toBe(manifest);
    }
  );
});

test("final cleanup validation blocks a stale persisted replay receipt before proof or validation execution", async () => {
  await withAuditedCleanupFixture(async (context) => {
    const replayState =
      context.manifest.destination.ecr
        .postHocReplayReceipt;
    replayState.receipt =
      sealPostHocReplayReceipt({
        ...replayState.receipt,
        createdAt: "2026-07-24T20:04:30.000Z"
      });
    resealManifest(context.manifest);
    const manifestPath = await persistManifest(
      context.root,
      context.manifest
    );
    const proofValidationRunner = vi.fn();
    const validationRunner = vi.fn();

    await expect(
      recordAllCleanupValidation({
        repoRoot: context.root,
        manifestPath,
        manifest: context.manifest,
        validationCommand:
          FINAL_CLEANUP_VALIDATION_COMMAND,
        confirmNoActiveConsumers: true,
        gitRunner: cleanValidationGitRunner(),
        proofValidationRunner,
        validationRunner
      })
    ).rejects.toThrow(
      /POST_HOC_REPLAY_MANIFEST_RECEIPT_MISMATCH/
    );
    expect(proofValidationRunner).not.toHaveBeenCalled();
    expect(validationRunner).not.toHaveBeenCalled();
  });
});

test("final cleanup validation rejects missing and empty ECR repositories before proof execution", async () => {
  await withTemporaryPackage(async (context) => {
    const validEcr = structuredClone(
      context.manifest.destination.ecr
    );
    for (const repositoryState of [
      "MISSING",
      "EMPTY"
    ]) {
      if (repositoryState === "MISSING") {
        delete context.manifest.destination.ecr;
      } else {
        context.manifest.destination.ecr = {
          ...structuredClone(validEcr),
          repositories: []
        };
      }
      resealManifest(context.manifest);
      const manifestPath = await persistManifest(
        context.root,
        context.manifest
      );
      const proofValidationRunner = vi.fn();
      const validationRunner = vi.fn();

      await expect(
        recordAllCleanupValidation({
          repoRoot: context.root,
          manifestPath,
          manifest: context.manifest,
          validationCommand:
            FINAL_CLEANUP_VALIDATION_COMMAND,
          confirmNoActiveConsumers: true,
          gitRunner: cleanValidationGitRunner(),
          proofValidationRunner,
          validationRunner
        })
      ).rejects.toThrow(
        /POST_HOC_REPLAY_LIVE_RECEIPT_REQUIRED/
      );
      expect(
        proofValidationRunner
      ).not.toHaveBeenCalled();
      expect(validationRunner).not.toHaveBeenCalled();
    }
  });
});

test("package cleanup rejects missing and empty ECR repositories before AWS or deletion", async () => {
  await withTemporaryPackage(async (context) => {
    markRemoteVerified(
      context.packageRecord,
      context.sha256,
      context.sizeBytes
    );
    markCleanupEligible(
      context.manifest,
      [context.packageRecord]
    );
    const validEcr = structuredClone(
      context.manifest.destination.ecr
    );
    for (const repositoryState of [
      "MISSING",
      "EMPTY"
    ]) {
      if (repositoryState === "MISSING") {
        delete context.manifest.destination.ecr;
      } else {
        context.manifest.destination.ecr = {
          ...structuredClone(validEcr),
          repositories: []
        };
      }
      resealManifest(context.manifest);
      const manifestPath = await persistManifest(
        context.root,
        context.manifest
      );
      const runner = vi.fn();
      const deleteFile = vi.fn();

      await expect(
        cleanupPackage({
          repoRoot: context.root,
          manifestPath,
          manifest: context.manifest,
          packageId:
            context.packageRecord.packageId,
          destination,
          confirmDeleteLocal: true,
          gitRunner: cleanValidationGitRunner(),
          runner,
          deleteFile
        })
      ).rejects.toThrow(
        /POST_HOC_REPLAY_LIVE_RECEIPT_REQUIRED/
      );
      expect(runner).not.toHaveBeenCalled();
      expect(deleteFile).not.toHaveBeenCalled();
    }
  });
});

test("cleanup requires a clean committed manifest and a matching verified version", async () => {
  await withTemporaryPackage(
    async ({
      root,
      manifest,
      packageRecord,
      sha256,
      sizeBytes,
      localPath
    }) => {
      packageRecord.remote.s3 = {
        ...packageRecord.remote.s3,
        ...remoteHead({ sha256, sizeBytes }),
        versionId: "version-1",
        verificationStatus: "VERIFIED",
        deletionStatus: "LOCAL_RETAINED"
      };
      markCleanupEligible(
        manifest,
        [packageRecord],
        "docs/research-storage-migration-manifest.v1.json"
      );
      const runner = vi.fn(async (args) => {
        if (args[0] === "sts") return identity();
        const control = bucketControlResult(args);
        if (control) return control;
        if (args[0] === "s3api" && args[1] === "head-object") {
          return success(remoteHead({ sha256, sizeBytes }));
        }
        if (args[0] === "s3api" && args[1] === "get-object") {
          await writeFile(
            args.at(-1),
            await readFile(localPath)
          );
          return success(remoteHead({ sha256, sizeBytes }));
        }
        throw new Error(`unexpected command ${args.join(" ")}`);
      });
      const gitRunner = cleanValidationGitRunner();
      const manifestPath = await persistManifest(
        root,
        manifest,
        "docs/research-storage-migration-manifest.v1.json"
      );
      const deleteFile = vi.fn(async (path) => {
        await rm(path);
      });
      const result = await cleanupPackage({
        repoRoot: root,
        manifestPath,
        manifest,
        packageId: packageRecord.packageId,
        destination,
        confirmDeleteLocal: true,
        runner,
        gitRunner,
        deleteFile,
        now: () => "2026-07-24T01:00:00.000Z"
      });
      expect(result).toMatchObject({
        localPaths: [packageRecord.localPath],
        remoteVersionId: "version-1"
      });
      expect(deleteFile).toHaveBeenCalledWith(
        expect.stringMatching(
          /\.retrofi-cleanup-[a-f0-9]{20}$/
        )
      );
      await expect(readFile(localPath)).rejects.toThrow();
      expect(packageRecord.remote.s3.deletionStatus).toBe(
        "LOCAL_DELETED_AFTER_REMOTE_VERIFICATION"
      );
      expect(validateManifestDigest(manifest)).toBe(manifest);
    }
  );
});

test("cleanup can run again after verified hydration without erasing the prior generation", async () => {
  await withTemporaryPackage(
    async ({
      root,
      manifest,
      packageRecord,
      sha256,
      sizeBytes,
      localPath
    }) => {
      const objectBytes = await readFile(localPath);
      markRemoteVerified(packageRecord, sha256, sizeBytes);
      markCleanupEligible(
        manifest,
        [packageRecord],
        "manifest.json"
      );
      const manifestPath = await persistManifest(
        root,
        manifest
      );
      const runner = vi.fn(async (args) => {
        if (args[0] === "sts") return identity();
        const control = bucketControlResult(args);
        if (control) return control;
        if (args[1] === "head-object") {
          return success(
            remoteHead({
              sha256,
              sizeBytes,
              versionId:
                packageRecord.remote.s3.versionId
            })
          );
        }
        if (args[1] === "get-object") {
          await writeFile(args.at(-1), objectBytes);
          return success(
            remoteHead({
              sha256,
              sizeBytes,
              versionId:
                packageRecord.remote.s3.versionId
            })
          );
        }
        throw new Error(
          `unexpected command ${args.join(" ")}`
        );
      });
      const deleteFile = vi.fn(async (path) => rm(path));

      await cleanupPackage({
        repoRoot: root,
        manifestPath,
        manifest,
        packageId: packageRecord.packageId,
        destination,
        confirmDeleteLocal: true,
        runner,
        gitRunner: cleanValidationGitRunner(),
        deleteFile,
        now: () => "2026-07-24T01:00:00.000Z"
      });
      const firstCompleted =
        manifest.execution.localCleanupJournal
          .completedActions[0];
      expect(firstCompleted).toMatchObject({
        actionType: "PACKAGE_CANONICAL_FILE",
        materializationGeneration: 0,
        state: "COMPLETED"
      });
      await expect(readFile(localPath)).rejects.toThrow();

      const hydration = await hydratePackage({
        repoRoot: root,
        manifest,
        packageId: packageRecord.packageId,
        destination,
        runner,
        now: () => "2026-07-24T02:00:00.000Z"
      });
      expect(hydration).toMatchObject({
        materializationGeneration: 1,
        cleanupActionGenerationByType: {
          PACKAGE_CANONICAL_FILE: 1
        }
      });
      expect(packageRecord.remote.s3).toMatchObject({
        deletionStatus: "LOCAL_RETAINED",
        localDeletedAt: null
      });
      expect(await readFile(localPath)).toEqual(
        objectBytes
      );

      markCleanupEligible(
        manifest,
        [packageRecord],
        "manifest.json"
      );
      await persistManifest(root, manifest);
      await cleanupPackage({
        repoRoot: root,
        manifestPath,
        manifest,
        packageId: packageRecord.packageId,
        destination,
        confirmDeleteLocal: true,
        runner,
        gitRunner: cleanValidationGitRunner(),
        deleteFile,
        now: () => "2026-07-24T03:00:00.000Z"
      });

      const completed =
        manifest.execution.localCleanupJournal
          .completedActions;
      expect(completed).toHaveLength(2);
      expect(
        completed.map((action) =>
          action.materializationGeneration
        ).sort()
      ).toEqual([0, 1]);
      expect(
        new Set(
          completed.map((action) => action.actionId)
        ).size
      ).toBe(2);
      expect(
        completed.find(
          (action) =>
            action.materializationGeneration === 0
        )
      ).toEqual(firstCompleted);
      expect(deleteFile).toHaveBeenCalledTimes(2);
      await expect(readFile(localPath)).rejects.toThrow();
      expect(validateManifestDigest(manifest)).toBe(
        manifest
      );
    }
  );
}, 30_000);

test("package cleanup resumes from a persisted quarantine after deletion interrupted its completion checkpoint", async () => {
  await withTemporaryPackage(
    async ({
      root,
      manifest,
      packageRecord,
      sha256,
      sizeBytes,
      localPath
    }) => {
      markRemoteVerified(packageRecord, sha256, sizeBytes);
      markCleanupEligible(
        manifest,
        [packageRecord],
        DEFAULT_MANIFEST_RELATIVE_PATH
      );
      const objectBytes = await readFile(localPath);
      const manifestPath = await persistManifest(
        root,
        manifest,
        DEFAULT_MANIFEST_RELATIVE_PATH
      );
      const runner = vi.fn(async (args) => {
        if (args[0] === "sts") return identity();
        const control = bucketControlResult(args);
        if (control) return control;
        if (args[1] === "head-object") {
          return success(
            remoteHead({
              sha256,
              sizeBytes,
              versionId: packageRecord.remote.s3.versionId
            })
          );
        }
        if (args[1] === "get-object") {
          await writeFile(args.at(-1), objectBytes);
          return success(
            remoteHead({
              sha256,
              sizeBytes,
              versionId: packageRecord.remote.s3.versionId
            })
          );
        }
        throw new Error(
          `unexpected command ${args.join(" ")}`
        );
      });
      let checkpointCallCount = 0;
      const interruptedCheckpoint = vi.fn(
        async (options) => {
          checkpointCallCount += 1;
          if (checkpointCallCount === 3) {
            throw new Error(
              "SIMULATED_COMPLETION_CHECKPOINT_INTERRUPTION"
            );
          }
          return writeManifestAtomically(options);
        }
      );
      await expect(
        cleanupPackage({
          repoRoot: root,
          manifestPath,
          manifest,
          packageId: packageRecord.packageId,
          destination,
          confirmDeleteLocal: true,
          runner,
          gitRunner: cleanValidationGitRunner(),
          checkpointManifest: interruptedCheckpoint,
          deleteFile: async (path) => rm(path),
          now: () => "2026-07-24T01:30:00.000Z"
        })
      ).rejects.toThrow(
        /SIMULATED_COMPLETION_CHECKPOINT_INTERRUPTION/
      );

      const interrupted = JSON.parse(
        await readFile(manifestPath, "utf8")
      );
      expect(validateManifestDigest(interrupted)).toBe(
        interrupted
      );
      const pending =
        interrupted.execution.localCleanupJournal
          .pendingAction;
      expect(pending).toMatchObject({
        actionType: "PACKAGE_CANONICAL_FILE",
        targetPath: localPath,
        state: "QUARANTINED"
      });
      await expect(readFile(localPath)).rejects.toThrow();
      await expect(
        readFile(pending.quarantinePath)
      ).rejects.toThrow();

      const resumedDelete = vi.fn();
      const resumed = await cleanupPackage({
        repoRoot: root,
        manifestPath,
        manifest: interrupted,
        packageId: packageRecord.packageId,
        destination,
        confirmDeleteLocal: true,
        runner,
        gitRunner: dirtyManifestValidationGitRunner(),
        deleteFile: resumedDelete,
        now: () => "2026-07-24T01:31:00.000Z"
      });
      expect(resumedDelete).not.toHaveBeenCalled();
      expect(resumed.disposition).toBe(
        "LOCAL_DELETED_AFTER_REMOTE_VERIFICATION"
      );
      const completed = JSON.parse(
        await readFile(manifestPath, "utf8")
      );
      expect(validateManifestDigest(completed)).toBe(
        completed
      );
      expect(
        completed.execution.localCleanupJournal
      ).toMatchObject({
        status: "COMPLETE",
        pendingAction: null
      });
      expect(
        completed.execution.localCleanupJournal
          .completedActions
      ).toEqual([
        expect.objectContaining({
          actionId: pending.actionId,
          state: "COMPLETED",
          reconciledFromAbsence: true
        })
      ]);
    }
  );
});

test("outside-cache package cleanup resumes only from its exact nonsymlink quarantine sibling", async () => {
  await withTemporaryPackage(
    async ({
      root,
      manifest,
      packageRecord,
      sha256,
      sizeBytes,
      localPath
    }) => {
      const canonicalRoot = await realpath(root);
      const objectBytes = await readFile(localPath);
      const outsideRelativePath =
        "tmp/pdfs/epa-chp-page-037.png";
      const outsidePath = join(
        canonicalRoot,
        outsideRelativePath
      );
      await mkdir(dirname(outsidePath), {
        recursive: true
      });
      await writeFile(outsidePath, objectBytes);
      await rm(localPath);
      packageRecord.localPath = outsideRelativePath;
      resealManifest(manifest);
      markRemoteVerified(packageRecord, sha256, sizeBytes);
      markCleanupEligible(
        manifest,
        [packageRecord],
        DEFAULT_MANIFEST_RELATIVE_PATH
      );
      const manifestPath = await persistManifest(
        canonicalRoot,
        manifest,
        DEFAULT_MANIFEST_RELATIVE_PATH
      );
      const runner = vi.fn(async (args) => {
        if (args[0] === "sts") return identity();
        const control = bucketControlResult(args);
        if (control) return control;
        if (args[1] === "head-object") {
          return success(
            remoteHead({
              sha256,
              sizeBytes,
              versionId:
                packageRecord.remote.s3.versionId
            })
          );
        }
        if (args[1] === "get-object") {
          await writeFile(args.at(-1), objectBytes);
          return success(
            remoteHead({
              sha256,
              sizeBytes,
              versionId:
                packageRecord.remote.s3.versionId
            })
          );
        }
        throw new Error(
          `unexpected command ${args.join(" ")}`
        );
      });
      const interruptedDelete = vi.fn(async () => {
        throw new Error(
          "SIMULATED_QUARANTINE_DELETE_INTERRUPTION"
        );
      });
      await expect(
        cleanupPackage({
          repoRoot: canonicalRoot,
          manifestPath,
          manifest,
          packageId: packageRecord.packageId,
          destination,
          confirmDeleteLocal: true,
          runner,
          gitRunner: cleanValidationGitRunner(),
          deleteFile: interruptedDelete,
          now: () => "2026-07-24T01:30:00.000Z"
        })
      ).rejects.toThrow(
        /SIMULATED_QUARANTINE_DELETE_INTERRUPTION/
      );

      const interrupted = JSON.parse(
        await readFile(manifestPath, "utf8")
      );
      expect(validateManifestDigest(interrupted)).toBe(
        interrupted
      );
      const pending =
        interrupted.execution.localCleanupJournal
          .pendingAction;
      expect(pending).toMatchObject({
        actionType: "PACKAGE_CANONICAL_FILE",
        targetPath: outsidePath,
        state: "QUARANTINED"
      });
      expect(await readFile(pending.quarantinePath)).toEqual(
        objectBytes
      );

      const disallowedDelete = vi.fn();
      await expect(
        recoverPendingPackageCleanup({
          repoRoot: canonicalRoot,
          manifestPath,
          manifest: interrupted,
          packageId: packageRecord.packageId,
          destination,
          confirmDeleteLocal: true,
          runner,
          gitRunner: pendingCleanupRecoveryGitRunner([
            "src/customer-calculation.ts"
          ]),
          deleteFile: disallowedDelete,
          now: () => "2026-07-24T01:30:30.000Z"
        })
      ).rejects.toThrow(
        /PENDING_CLEANUP_RECOVERY_SOURCE_SCOPE_CHANGED/
      );
      expect(disallowedDelete).not.toHaveBeenCalled();
      expect(await readFile(pending.quarantinePath)).toEqual(
        objectBytes
      );

      await rm(pending.quarantinePath);
      await symlink(
        join(canonicalRoot, "attacker-controlled"),
        pending.quarantinePath
      );
      await expect(
        recoverPendingPackageCleanup({
          repoRoot: canonicalRoot,
          manifestPath,
          manifest: interrupted,
          packageId: packageRecord.packageId,
          destination,
          confirmDeleteLocal: true,
          runner,
          gitRunner: pendingCleanupRecoveryGitRunner(),
          deleteFile: vi.fn(),
          now: () => "2026-07-24T01:31:00.000Z"
        })
      ).rejects.toThrow(
        /PACKAGE_CLEANUP_QUARANTINE_SYMLINK_FORBIDDEN/
      );

      await rm(pending.quarantinePath);
      await writeFile(pending.quarantinePath, objectBytes);
      const resumedDelete = vi.fn(async (path) => {
        await rm(path);
      });
      const resumed = await recoverPendingPackageCleanup({
        repoRoot: canonicalRoot,
        manifestPath,
        manifest: interrupted,
        packageId: packageRecord.packageId,
        destination,
        confirmDeleteLocal: true,
        runner,
        gitRunner: pendingCleanupRecoveryGitRunner(),
        deleteFile: resumedDelete,
        now: () => "2026-07-24T01:32:00.000Z"
      });
      expect(resumedDelete).toHaveBeenCalledWith(
        pending.quarantinePath
      );
      expect(resumed.disposition).toBe(
        "LOCAL_DELETED_AFTER_REMOTE_VERIFICATION"
      );
      const completed = JSON.parse(
        await readFile(manifestPath, "utf8")
      );
      expect(validateManifestDigest(completed)).toBe(
        completed
      );
      expect(
        completed.execution.localCleanupJournal
      ).toMatchObject({
        status: "COMPLETE",
        pendingAction: null
      });
      expect(
        completed.execution.localCleanupJournal
          .completedActions
      ).toEqual([
        expect.objectContaining({
          actionId: pending.actionId,
          state: "COMPLETED",
          reconciledFromAbsence: false
        })
      ]);
    }
  );
});

test("original artifact restore requires an exact package receipt and never overwrites a recorded path", async () => {
  await withTemporaryPackage(
    async ({
      root,
      manifest,
      packageRecord,
      sha256,
      sizeBytes,
      localPath
    }) => {
      const canonicalRoot = await realpath(root);
      markRemoteVerified(packageRecord, sha256, sizeBytes);
      const originalRoot = join(
        canonicalRoot,
        "original-artifacts"
      );
      const originalPath = join(
        originalRoot,
        "source.json"
      );
      await mkdir(originalRoot, { recursive: true });
      const origin = {
        path: originalPath,
        relation:
          "EXACT_BYTE_SOURCE_FOR_CANONICAL_CACHE_COPY",
        expectedSizeBytes: sizeBytes,
        expectedSha256: sha256,
        cleanupStatus:
          "LOCAL_DELETED_AFTER_REMOTE_VERIFICATION",
        deletedAt: "2026-07-24T00:00:00.000Z"
      };
      packageRecord.originalLocalArtifacts = [origin];
      packageRecord.hydration = {
        status: "HYDRATED_FROM_VERIFIED_S3_VERSION",
        restoredVersionId:
          packageRecord.remote.s3.versionId,
        restoredSha256: sha256,
        restoredSizeBytes: sizeBytes,
        restoredAt: "2026-07-24T01:00:00.000Z",
        hydrationMode: "EXACT_FILE_HARD_LINK",
        localPaths: [packageRecord.localPath],
        materializationGeneration: 1,
        cleanupActionGenerationByType: {
          PACKAGE_CANONICAL_FILE: 1
        },
        materializedCleanupActionTypes: [
          "PACKAGE_CANONICAL_FILE"
        ]
      };
      manifest.originalLocalArtifacts = [
        {
          ...origin,
          canonicalPackageId:
            packageRecord.packageId,
          canonicalLocalPath:
            packageRecord.localPath,
          plannedS3Uri: packageRecord.s3Uri
        }
      ];
      manifest.execution.restoreAllJournal = {
        status: "COMPLETE",
        pendingPackageId: null,
        completedPackages: [
          {
            packageId: packageRecord.packageId,
            restoredVersionId:
              packageRecord.remote.s3.versionId,
            restoredSha256: sha256,
            restoredSizeBytes: sizeBytes,
            proof: {
              restoredVersionId:
                packageRecord.remote.s3.versionId,
              restoredSha256: sha256,
              restoredSizeBytes: sizeBytes
            }
          }
        ]
      };
      resealManifest(manifest);
      const manifestPath = await persistManifest(
        canonicalRoot,
        manifest,
        DEFAULT_MANIFEST_RELATIVE_PATH
      );

      const first = await restoreOriginalLocalArtifacts({
        repoRoot: canonicalRoot,
        manifestPath,
        manifest,
        gitRunner: cleanValidationGitRunner(),
        permittedTempRoot: originalRoot,
        now: () => "2026-07-24T02:00:00.000Z"
      });
      expect(first).toMatchObject({
        status: "COMPLETE",
        artifactCount: 1,
        createdPathCount: 1,
        adoptedPathCount: 0,
        overwriteAllowed: false,
        results: [
          expect.objectContaining({
            materializationGeneration: 1
          })
        ]
      });
      expect(await readFile(originalPath)).toEqual(
        await readFile(localPath)
      );
      expect(origin).toMatchObject({
        cleanupStatus: "LOCAL_RETAINED",
        deletedAt: null
      });
      expect(packageRecord.hydration).toMatchObject({
        materializationGeneration: 1,
        cleanupActionGenerationByType: {
          PACKAGE_CANONICAL_FILE: 1,
          PACKAGE_ORIGINAL_FILE: 1
        },
        materializedCleanupActionTypes: [
          "PACKAGE_CANONICAL_FILE",
          "PACKAGE_ORIGINAL_FILE"
        ]
      });

      const second = await restoreOriginalLocalArtifacts({
        repoRoot: canonicalRoot,
        manifestPath,
        manifest,
        gitRunner: cleanValidationGitRunner(),
        permittedTempRoot: originalRoot,
        now: () => "2026-07-24T02:01:00.000Z"
      });
      expect(second).toMatchObject({
        artifactCount: 1,
        createdPathCount: 0,
        adoptedPathCount: 1
      });

      await writeFile(originalPath, "tampered\n");
      const createCopy = vi.fn();
      await expect(
        restoreOriginalLocalArtifacts({
          repoRoot: canonicalRoot,
          manifestPath,
          manifest,
          gitRunner: cleanValidationGitRunner(),
          permittedTempRoot: originalRoot,
          createCopy
        })
      ).rejects.toThrow(/LOCAL_SIZE_MISMATCH/);
      expect(createCopy).not.toHaveBeenCalled();
    }
  );
});

test("restored original artifacts receive a fresh cleanup generation", async () => {
  await withTemporaryPackage(
    async ({
      root,
      manifest,
      packageRecord,
      sha256,
      sizeBytes,
      localPath
    }) => {
      const canonicalRoot = await realpath(root);
      const objectBytes = await readFile(localPath);
      const originalRoot = await mkdtemp(
        "/private/tmp/retrofi-original-generation-"
      );
      try {
        const originalPath = join(
          originalRoot,
          "source.json"
        );
        await writeFile(originalPath, objectBytes);
        const origin = {
          path: originalPath,
          relation:
            "EXACT_BYTE_SOURCE_FOR_CANONICAL_CACHE_COPY",
          expectedSizeBytes: sizeBytes,
          expectedSha256: sha256,
          cleanupStatus: "LOCAL_RETAINED",
          deletedAt: null
        };
        packageRecord.originalLocalArtifacts = [origin];
        manifest.originalLocalArtifacts = [
          {
            ...origin,
            canonicalPackageId:
              packageRecord.packageId,
            canonicalLocalPath:
              packageRecord.localPath,
            plannedS3Uri: packageRecord.s3Uri
          }
        ];
        markRemoteVerified(
          packageRecord,
          sha256,
          sizeBytes
        );
        markCleanupEligible(
          manifest,
          [packageRecord],
          DEFAULT_MANIFEST_RELATIVE_PATH
        );
        const manifestPath = await persistManifest(
          canonicalRoot,
          manifest,
          DEFAULT_MANIFEST_RELATIVE_PATH
        );
        const runner = vi.fn(async (args) => {
          if (args[0] === "sts") return identity();
          const control = bucketControlResult(args);
          if (control) return control;
          if (args[1] === "head-object") {
            return success(
              remoteHead({
                sha256,
                sizeBytes,
                versionId:
                  packageRecord.remote.s3.versionId
              })
            );
          }
          if (args[1] === "get-object") {
            await writeFile(args.at(-1), objectBytes);
            return success(
              remoteHead({
                sha256,
                sizeBytes,
                versionId:
                  packageRecord.remote.s3.versionId
              })
            );
          }
          throw new Error(
            `unexpected command ${args.join(" ")}`
          );
        });

        await cleanupPackage({
          repoRoot: canonicalRoot,
          manifestPath,
          manifest,
          packageId: packageRecord.packageId,
          destination,
          confirmDeleteLocal: true,
          runner,
          gitRunner: cleanValidationGitRunner(),
          now: () => "2026-07-24T01:00:00.000Z"
        });
        expect(
          manifest.execution.localCleanupJournal
            .completedActions.map((action) => ({
              type: action.actionType,
              generation:
                action.materializationGeneration
            }))
        ).toEqual(
          expect.arrayContaining([
            {
              type: "PACKAGE_ORIGINAL_FILE",
              generation: 0
            },
            {
              type: "PACKAGE_CANONICAL_FILE",
              generation: 0
            }
          ])
        );

        await hydratePackage({
          repoRoot: canonicalRoot,
          manifest,
          packageId: packageRecord.packageId,
          destination,
          runner,
          now: () => "2026-07-24T02:00:00.000Z"
        });
        manifest.execution.restoreAllJournal = {
          status: "COMPLETE",
          pendingPackageId: null,
          completedPackages: [
            {
              packageId: packageRecord.packageId,
              restoredVersionId:
                packageRecord.remote.s3.versionId,
              restoredSha256: sha256,
              restoredSizeBytes: sizeBytes,
              proof: {
                restoredVersionId:
                  packageRecord.remote.s3.versionId,
                restoredSha256: sha256,
                restoredSizeBytes: sizeBytes
              }
            }
          ]
        };
        resealManifest(manifest);
        await persistManifest(
          canonicalRoot,
          manifest,
          DEFAULT_MANIFEST_RELATIVE_PATH
        );
        await restoreOriginalLocalArtifacts({
          repoRoot: canonicalRoot,
          manifestPath,
          manifest,
          gitRunner: cleanValidationGitRunner(),
          permittedTempRoot: originalRoot,
          now: () => "2026-07-24T03:00:00.000Z"
        });
        expect(packageRecord.hydration).toMatchObject({
          materializationGeneration: 1,
          cleanupActionGenerationByType: {
            PACKAGE_CANONICAL_FILE: 1,
            PACKAGE_ORIGINAL_FILE: 1
          }
        });

        markCleanupEligible(
          manifest,
          [packageRecord],
          DEFAULT_MANIFEST_RELATIVE_PATH
        );
        await persistManifest(
          canonicalRoot,
          manifest,
          DEFAULT_MANIFEST_RELATIVE_PATH
        );
        await cleanupPackage({
          repoRoot: canonicalRoot,
          manifestPath,
          manifest,
          packageId: packageRecord.packageId,
          destination,
          confirmDeleteLocal: true,
          runner,
          gitRunner: cleanValidationGitRunner(),
          now: () => "2026-07-24T04:00:00.000Z"
        });

        const completed =
          manifest.execution.localCleanupJournal
            .completedActions;
        expect(completed).toHaveLength(4);
        expect(
          completed.map((action) => ({
            type: action.actionType,
            generation:
              action.materializationGeneration
          }))
        ).toEqual(
          expect.arrayContaining([
            {
              type: "PACKAGE_ORIGINAL_FILE",
              generation: 0
            },
            {
              type: "PACKAGE_CANONICAL_FILE",
              generation: 0
            },
            {
              type: "PACKAGE_ORIGINAL_FILE",
              generation: 1
            },
            {
              type: "PACKAGE_CANONICAL_FILE",
              generation: 1
            }
          ])
        );
        expect(
          new Set(
            completed.map((action) => action.actionId)
          ).size
        ).toBe(4);
        await expect(
          readFile(originalPath)
        ).rejects.toThrow();
        await expect(readFile(localPath)).rejects.toThrow();
        expect(validateManifestDigest(manifest)).toBe(
          manifest
        );
      } finally {
        await rm(originalRoot, {
          recursive: true,
          force: true
        });
      }
    }
  );
}, 30_000);

test("cleanup-all performs no deletion when any restored-byte preflight fails", async () => {
  await withTemporaryPackage(async (context) => {
    const second = await addSecondTemporaryPackage(context);
    markRemoteVerified(
      context.packageRecord,
      context.sha256,
      context.sizeBytes
    );
    markRemoteVerified(
      second.packageRecord,
      second.sha256,
      second.sizeBytes
    );
    markCleanupEligible(
      context.manifest,
      [context.packageRecord, second.packageRecord]
    );
    const byKey = new Map([
      [
        context.packageRecord.plannedObject.key,
        {
          path: context.localPath,
          packageRecord: context.packageRecord,
          sha256: context.sha256,
          sizeBytes: context.sizeBytes
        }
      ],
      [
        second.packageRecord.plannedObject.key,
        {
          path: second.localPath,
          packageRecord: second.packageRecord,
          sha256: second.sha256,
          sizeBytes: second.sizeBytes
        }
      ]
    ]);
    const runner = vi.fn(async (args) => {
      if (args[0] === "sts") return identity();
      const control = bucketControlResult(args);
      if (control) return control;
      const key = args[args.indexOf("--key") + 1];
      const record = byKey.get(key);
      if (args[1] === "head-object") {
        return success(
          remoteHead({
            sha256: record.sha256,
            sizeBytes: record.sizeBytes,
            versionId: record.packageRecord.remote.s3.versionId
          })
        );
      }
      if (args[1] === "get-object") {
        const bytes =
          record.packageRecord === second.packageRecord
            ? Buffer.alloc(record.sizeBytes, 0x78)
            : await readFile(record.path);
        await writeFile(args.at(-1), bytes);
        return success(
          remoteHead({
            sha256: record.sha256,
            sizeBytes: record.sizeBytes,
            versionId: record.packageRecord.remote.s3.versionId
          })
        );
      }
      throw new Error(`unexpected command ${args.join(" ")}`);
    });
    const deleteFile = vi.fn(async () => {});
    const manifestPath = await persistManifest(
      context.root,
      context.manifest
    );
    await expect(
      cleanupAllPackages({
        repoRoot: context.root,
        manifestPath,
        manifest: context.manifest,
        destination,
        confirmDeleteLocal: true,
        runner,
        gitRunner: cleanValidationGitRunner(),
        deleteFile
      })
    ).rejects.toThrow(/RESTORED_CHECKSUM_MISMATCH/);
    expect(deleteFile).not.toHaveBeenCalled();
    expect(await readFile(context.localPath, "utf8")).toBe(
      '{"real":true}\n'
    );
    expect(await readFile(second.localPath, "utf8")).toBe(
      second.content
    );
  });
});

test("cleanup-all preflights every local and exact-version remote before the first deletion", async () => {
  await withTemporaryPackage(async (context) => {
    const second = await addSecondTemporaryPackage(context);
    markRemoteVerified(
      context.packageRecord,
      context.sha256,
      context.sizeBytes
    );
    markRemoteVerified(
      second.packageRecord,
      second.sha256,
      second.sizeBytes
    );
    markCleanupEligible(
      context.manifest,
      [context.packageRecord, second.packageRecord]
    );
    const byKey = new Map([
      [
        context.packageRecord.plannedObject.key,
        {
          path: context.localPath,
          packageRecord: context.packageRecord,
          sha256: context.sha256,
          sizeBytes: context.sizeBytes
        }
      ],
      [
        second.packageRecord.plannedObject.key,
        {
          path: second.localPath,
          packageRecord: second.packageRecord,
          sha256: second.sha256,
          sizeBytes: second.sizeBytes
        }
      ]
    ]);
    const events = [];
    const runner = vi.fn(async (args) => {
      if (args[0] === "sts") return identity();
      const control = bucketControlResult(args);
      if (control) return control;
      const key = args[args.indexOf("--key") + 1];
      const record = byKey.get(key);
      if (args[1] === "head-object") {
        events.push(`head:${key}`);
        return success(
          remoteHead({
            sha256: record.sha256,
            sizeBytes: record.sizeBytes,
            versionId: record.packageRecord.remote.s3.versionId
          })
        );
      }
      if (args[1] === "get-object") {
        events.push(`get:${key}`);
        await writeFile(
          args.at(-1),
          await readFile(record.path)
        );
        return success(
          remoteHead({
            sha256: record.sha256,
            sizeBytes: record.sizeBytes,
            versionId: record.packageRecord.remote.s3.versionId
          })
        );
      }
      throw new Error(`unexpected command ${args.join(" ")}`);
    });
    const deleteFile = vi.fn(async (path) => {
      events.push(`delete:${basename(path)}`);
      await rm(path);
    });
    const manifestPath = await persistManifest(
      context.root,
      context.manifest
    );
    const result = await cleanupAllPackages({
      repoRoot: context.root,
      manifestPath,
      manifest: context.manifest,
      destination,
      confirmDeleteLocal: true,
      runner,
      gitRunner: cleanValidationGitRunner(),
      deleteFile,
      now: () => "2026-07-24T03:00:00.000Z"
    });
    expect(result).toMatchObject({
      disposition:
        "ALL_PACKAGES_PREFLIGHTED_BEFORE_LOCAL_CLEANUP",
      packageCount: 2,
      deletedPackageCount: 2,
      retainedPackageCount: 0
    });
    expect(deleteFile).toHaveBeenCalledTimes(2);
    const firstDelete = events.findIndex((event) =>
      event.startsWith("delete:")
    );
    const lastRestore = Math.max(
      ...events
        .map((event, index) =>
          event.startsWith("get:") ? index : -1
        )
    );
    expect(firstDelete).toBeGreaterThan(lastRestore);
    expect(validateManifestDigest(context.manifest)).toBe(
      context.manifest
    );
  });
}, 30_000);

test("cleanup-all verifies license objects independently and deletes their local bytes only with the parent repository", async () => {
  const root = await mkdtemp(
    join(tmpdir(), "retrofi-license-cleanup-")
  );
  try {
    const repositoryRelativePath =
      `${CACHE_RELATIVE_PATH}/repos/example`;
    const repositoryPath = join(root, repositoryRelativePath);
    await mkdir(repositoryPath, { recursive: true });
    const licensePath = join(repositoryPath, "LICENSE");
    const licenseBytes = Buffer.from(
      "Example upstream license\n",
      "utf8"
    );
    await writeFile(licensePath, licenseBytes);
    await execFileAsync("/usr/bin/git", ["init", repositoryPath]);
    await execFileAsync(
      "/usr/bin/git",
      ["-C", repositoryPath, "add", "LICENSE"]
    );
    await execFileAsync(
      "/usr/bin/git",
      [
        "-C",
        repositoryPath,
        "-c",
        "user.name=Research Test",
        "-c",
        "user.email=research@example.invalid",
        "commit",
        "-m",
        "pin license"
      ]
    );
    const repositoryIdentity =
      await gitRepositoryIdentity(repositoryPath);
    const archiveName =
      `example-${repositoryIdentity.commitSha}.bundle`;
    const repositoryKey =
      `raw/example/git-${repositoryIdentity.commitSha}/` +
      `${repositoryIdentity.gitIndexListingSha256}/${archiveName}`;
    const parentPackage = {
      packageId: "git-repository:example",
      packageType: "PINNED_GIT_REPOSITORY",
      localPath: repositoryRelativePath,
      fingerprint: {
        algorithm: "GIT_TREE_PLUS_SHA256_INDEX_LISTING",
        ...repositoryIdentity
      },
      content: {
        repositoryName: "example",
        remoteUrl: null
      },
      plannedObject: {
        key: repositoryKey,
        contentType: "application/x-git-bundle",
        expectedSizeBytes: null,
        expectedSha256: null,
        uploadReady: false,
        state: "SOURCE_ARCHIVE_REQUIRED",
        archivePlan: {
          format: "git-bundle-v2",
          sourceCommit: repositoryIdentity.commitSha,
          sourceTree:
            repositoryIdentity.gitTreeObjectSha1,
          deterministicIdentity:
            repositoryIdentity.gitIndexListingSha256,
          outputFileName: archiveName,
          materialized: false
        }
      },
      s3Uri:
        `s3://${RESEARCH_S3_BUCKET}/${repositoryKey}`,
      sourceOrganization: "Example Organization",
      acquisitionTimestamp:
        "2026-07-24T00:00:00.000Z",
      source: {
        status: "DOCUMENTED",
        urls: ["https://example.test/example.git"],
        standardIds: [],
        blocker: null
      },
      release: {
        status: "PINNED",
        identities: [
          `Git commit ${repositoryIdentity.commitSha}`
        ],
        commitShas: [repositoryIdentity.commitSha],
        blocker: null
      },
      acquisition: {
        status: "DOCUMENTED",
        modes: ["TEST_GIT_CLONE"],
        timestamps: ["2026-07-24T00:00:00.000Z"],
        blocker: null
      },
      license: {
        status: "DOCUMENTED_REVIEW_RETAINED",
        statements: ["Example license"],
        legalReview: [],
        blocker: null
      },
      ingestion: {
        status: "REPOSITORY_SOURCE",
        manifests: [],
        adapters: [],
        blocker: null
      },
      localRetentionPolicy:
        "DELETE_AFTER_VERIFIED_MIGRATION",
      cleanupEligibility: {
        status: "BLOCKED",
        activeConsumerPaths: [],
        blocker: "test"
      },
      remote: {
        s3: {
          bucket: RESEARCH_S3_BUCKET,
          key: repositoryKey,
          s3Uri:
            `s3://${RESEARCH_S3_BUCKET}/${repositoryKey}`,
          verificationStatus: "ARCHIVE_NOT_MATERIALIZED",
          deletionStatus: "LOCAL_RETAINED"
        }
      }
    };
    const licenseSha256 = await sha256Path(licensePath);
    const licenseKey =
      `licenses/example/git-${repositoryIdentity.commitSha}/` +
      `${licenseSha256}/LICENSE`;
    const licensePackage = {
      packageId: "repository-license:example:LICENSE",
      packageType: "REPOSITORY_LICENSE_ARTIFACT",
      localPath:
        `${repositoryRelativePath}/LICENSE`,
      parentPackageId: parentPackage.packageId,
      coverage: {
        mode: "DUPLICATE_CHILD_OBJECT",
        fileCount: 1,
        totalSizeBytes: licenseBytes.length,
        physicalOwnership: "PARENT_REPOSITORY_PACKAGE",
        parentPackageId: parentPackage.packageId
      },
      fingerprint: {
        algorithm: "SHA-256",
        digest: licenseSha256
      },
      plannedObject: {
        key: licenseKey,
        contentType: "text/plain",
        expectedSizeBytes: licenseBytes.length,
        expectedSha256: licenseSha256,
        uploadReady: true,
        state: "PLANNED"
      },
      s3Uri:
        `s3://${RESEARCH_S3_BUCKET}/${licenseKey}`,
      sourceOrganization: "Example Organization",
      acquisitionTimestamp:
        "2026-07-24T00:00:00.000Z",
      source: {
        status: "DOCUMENTED",
        urls: [
          "https://example.test/example/blob/test/LICENSE"
        ],
        standardIds: [],
        blocker: null
      },
      release: {
        status: "PINNED",
        identities: [
          `Git commit ${repositoryIdentity.commitSha}`
        ],
        commitShas: [repositoryIdentity.commitSha],
        blocker: null
      },
      acquisition: {
        status: "DOCUMENTED",
        modes: [
          "PINNED_TRACKED_REPOSITORY_LICENSE_FILE"
        ],
        timestamps: ["2026-07-24T00:00:00.000Z"],
        blocker: null
      },
      license: {
        status: "EXACT_UPSTREAM_LICENSE_TEXT_RETAINED",
        statements: ["Exact example license text"],
        legalReview: [],
        blocker: null
      },
      ingestion: {
        status:
          "RETAINED_WITH_PINNED_REPOSITORY_RELEASE",
        manifests: [],
        adapters: [],
        blocker: null
      },
      localRetentionPolicy:
        "DELETE_WITH_PARENT_REPOSITORY",
      localLifecycle: {
        ownerPackageId: parentPackage.packageId,
        ownershipMode:
          "PARENT_REPOSITORY_OWNS_LOCAL_BYTES"
      },
      cleanupEligibility: {
        status: "BLOCKED",
        activeConsumerPaths: [],
        blocker: "test"
      },
      remote: {
        s3: {
          bucket: RESEARCH_S3_BUCKET,
          key: licenseKey,
          s3Uri:
            `s3://${RESEARCH_S3_BUCKET}/${licenseKey}`,
          verificationStatus: "NOT_UPLOADED",
          deletionStatus: "LOCAL_RETAINED"
        }
      }
    };
    const manifest = sealManifest({
      schemaVersion:
        "operational-savings/research-storage-migration-v1",
      destination: {
        s3: {
          accountId: RESEARCH_AWS_ACCOUNT_ID,
          region: RESEARCH_AWS_REGION,
          bucket: RESEARCH_S3_BUCKET
        }
      },
      packages: [parentPackage, licensePackage],
      sourceArchiveNeeds: [
        {
          packageId: parentPackage.packageId,
          status: "NOT_MATERIALIZED",
          uploadReady: false
        }
      ],
      execution: {}
    });
    await prepareRepositoryArchive({
      repoRoot: root,
      manifest,
      packageId: parentPackage.packageId
    });
    const archivePath = join(
      root,
      parentPackage.plannedObject.localFilePath
    );
    const archiveBytes = await readFile(archivePath);
    markRemoteVerified(
      parentPackage,
      parentPackage.plannedObject.expectedSha256,
      parentPackage.plannedObject.expectedSizeBytes
    );
    markRemoteVerified(
      licensePackage,
      licenseSha256,
      licenseBytes.length
    );
    await installMinimalLiveReplayFixture({
      root,
      manifest
    });
    markCleanupEligible(
      manifest,
      [parentPackage, licensePackage]
    );
    const manifestPath = await persistManifest(
      root,
      manifest
    );
    const byKey = new Map([
      [
        repositoryKey,
        {
          bytes: archiveBytes,
          packageRecord: parentPackage
        }
      ],
      [
        licenseKey,
        {
          bytes: licenseBytes,
          packageRecord: licensePackage
        }
      ]
    ]);
    const runner = vi.fn(async (args) => {
      if (args[0] === "sts") return identity();
      const control = bucketControlResult(args);
      if (control) return control;
      const key = args[args.indexOf("--key") + 1];
      const record = byKey.get(key);
      if (args[1] === "head-object") {
        return success(
          remoteHead({
            sha256:
              record.packageRecord.plannedObject
                .expectedSha256,
            sizeBytes:
              record.packageRecord.plannedObject
                .expectedSizeBytes,
            versionId:
              record.packageRecord.remote.s3.versionId,
            contentType:
              record.packageRecord.plannedObject
                .contentType
          })
        );
      }
      if (args[1] === "get-object") {
        await writeFile(args.at(-1), record.bytes);
        return success(
          remoteHead({
            sha256:
              record.packageRecord.plannedObject
                .expectedSha256,
            sizeBytes:
              record.packageRecord.plannedObject
                .expectedSizeBytes,
            versionId:
              record.packageRecord.remote.s3.versionId,
            contentType:
              record.packageRecord.plannedObject
                .contentType
          })
        );
      }
      throw new Error(
        `unexpected command ${args.join(" ")}`
      );
    });
    const deletedFiles = [];
    const deleteFile = vi.fn(async (path) => {
      deletedFiles.push(path);
      await rm(path);
    });
    const deleteRepository = vi.fn(
      async ({ repositoryPath: path }) => {
        await rm(path, { recursive: true });
      }
    );
    const result = await cleanupAllPackages({
      repoRoot: root,
      manifestPath,
      manifest,
      destination,
      confirmDeleteLocal: true,
      runner,
      gitRunner: cleanValidationGitRunner(),
      deleteFile,
      deleteRepository,
      now: () => "2026-07-24T03:30:00.000Z"
    });
    expect(result).toMatchObject({
      packageCount: 2,
      deletedPackageCount: 2,
      retainedPackageCount: 0,
      results: expect.arrayContaining([
        expect.objectContaining({
          packageId: licensePackage.packageId,
          parentPackageId: parentPackage.packageId,
          disposition:
            "LOCAL_DELETED_WITH_PARENT_REPOSITORY"
        })
      ])
    });
    expect(deleteRepository).toHaveBeenCalledTimes(1);
    expect(
      deletedFiles.some((path) => path.endsWith("LICENSE"))
    ).toBe(false);
    await expect(readFile(licensePath)).rejects.toThrow();
    expect(
      licensePackage.remote.s3.deletionStatus
    ).toBe("LOCAL_DELETED_WITH_PARENT_REPOSITORY");
    expect(validateManifestDigest(manifest)).toBe(manifest);
  } finally {
    await rm(root, { recursive: true, force: true });
  }
}, 30_000);

test("cleanup stops before AWS or deletion when the manifest is not committed", async () => {
  await withTemporaryPackage(
    async ({ root, manifest, packageRecord }) => {
      const runner = vi.fn();
      const deleteFile = vi.fn();
      await expect(
        cleanupPackage({
          repoRoot: root,
          manifestPath: join(root, "manifest.json"),
          manifest,
          packageId: packageRecord.packageId,
          destination,
          confirmDeleteLocal: true,
          runner,
          gitRunner: async () => ({
            exitCode: 1,
            stdout: "",
            stderr: "not tracked"
          }),
          deleteFile
        })
      ).rejects.toThrow(/MANIFEST_NOT_CLEAN_COMMITTED/);
      expect(runner).not.toHaveBeenCalled();
      expect(deleteFile).not.toHaveBeenCalled();
    }
  );
});

test("audited cleanup blocks a stale persisted replay receipt before AWS, Docker, or deletion", async () => {
  await withAuditedCleanupFixture(async (context) => {
    const replayState =
      context.manifest.destination.ecr
        .postHocReplayReceipt;
    replayState.receipt =
      sealPostHocReplayReceipt({
        ...replayState.receipt,
        createdAt: "2026-07-24T20:04:30.000Z"
      });
    resealManifest(context.manifest);
    const manifestPath = await persistManifest(
      context.root,
      context.manifest
    );
    const runner = vi.fn();
    const dockerRunner = vi.fn();
    const deleteFile = vi.fn();
    const deleteDirectory = vi.fn();

    await expect(
      cleanupAuditedLocalArtifacts({
        repoRoot: context.root,
        manifestPath,
        manifest: context.manifest,
        destination,
        confirmDeleteLocal: true,
        gitRunner: cleanValidationGitRunner(),
        runner,
        dockerRunner,
        deleteFile,
        deleteDirectory
      })
    ).rejects.toThrow(
      /POST_HOC_REPLAY_MANIFEST_RECEIPT_MISMATCH/
    );
    expect(runner).not.toHaveBeenCalled();
    expect(dockerRunner).not.toHaveBeenCalled();
    expect(deleteFile).not.toHaveBeenCalled();
    expect(deleteDirectory).not.toHaveBeenCalled();
  });
});

test("audited cleanup preflights every record, removes only exact research image references, and retains shared BuildKit", async () => {
  await withAuditedCleanupFixture(async (context) => {
    const events = [];
    let imagePresent = true;
    let imageTags = [
      context.localImageTag,
      context.ecrImageTag,
      context.ecrImageUri
    ].sort();
    const imageDigests = [
      `retrofit-research-test@${context.imageId}`,
      context.ecrImageUri
    ].sort();
    const manifestPath = await persistManifest(
      context.root,
      context.manifest
    );
    const runner = vi.fn(async (args) => {
      if (args[0] === "sts") return identity();
      if (args[0] === "ecr") {
        events.push("ecr-preflight");
        const response = auditedEcrControlResult(
          args,
          context
        );
        if (response) return response;
      }
      throw new Error(`unexpected AWS command ${args.join(" ")}`);
    });
    const dockerRunner = vi.fn(async (args) => {
      expect(args).not.toContain("prune");
      if (args[0] === "ps") {
        return { exitCode: 0, stdout: "", stderr: "" };
      }
      if (args[0] === "image" && args[1] === "inspect") {
        const reference = args[2];
        const found =
          imagePresent &&
          (reference === context.imageId ||
            reference === context.ecrImageTag);
        if (!found) {
          return {
            exitCode: 1,
            stdout: "",
            stderr: "No such image"
          };
        }
        events.push(`inspect:${reference}`);
        return success([
          {
            Id: context.imageId,
            Created: context.imageBuiltAt,
            Size: context.imageSizeBytes,
            RepoTags: [...imageTags],
            RepoDigests: [...imageDigests]
          }
        ]);
      }
      if (args[0] === "image" && args[1] === "rm") {
        events.push(`remove:${args.slice(2).join(",")}`);
        expect(args).toEqual([
          "image",
          "rm",
          context.ecrImageTag
        ]);
        const persisted = JSON.parse(
          await readFile(manifestPath, "utf8")
        );
        expect(
          persisted.execution.localCleanupJournal
            .pendingAction
        ).toMatchObject({
          actionType: "DOCKER_IMAGE",
          targetPath: context.imageId,
          state: "PENDING",
          expected: {
            liveEcr: {
              repositoryControls: {
                imageTagMutability: "IMMUTABLE",
                encryptionType: "AES256",
                scanOnPush: true
              },
              lifecyclePolicy: {
                taggedImagesRetained: true,
                minimumUntaggedRetentionDays: 14
              }
            }
          }
        });
        imagePresent = false;
        return {
          exitCode: 0,
          stdout: "removed\n",
          stderr: ""
        };
      }
      throw new Error(
        `unexpected Docker command ${args.join(" ")}`
      );
    });
    const deleteFile = vi.fn(async (path) => {
      events.push(`delete-file:${path}`);
      await rm(path);
    });
    const deleteDirectory = vi.fn(async (path) => {
      events.push(`delete-directory:${path}`);
      await rm(path, { recursive: true });
    });
    const result = await cleanupAuditedLocalArtifacts({
      repoRoot: context.root,
      manifestPath,
      manifest: context.manifest,
      destination,
      confirmDeleteLocal: true,
      runner,
      dockerRunner,
      gitRunner: cleanValidationGitRunner(),
      deleteFile,
      deleteDirectory,
      permittedTempRoots: [context.externalRoot],
      now: () => "2026-07-24T21:00:00.000Z"
    });
    expect(result).toMatchObject({
      disposition:
        "AUDITED_NONPACKAGE_ARTIFACTS_PREFLIGHTED_BEFORE_EXACT_CLEANUP",
      summary: {
        nonpackageRecordCount: 4,
        deletedPathCount: 2,
        removedDockerImageCount: 1,
        removedDockerTagCount: 3,
        retainedSharedCacheCount: 1,
        pendingRecordCount: 0
      }
    });
    expect(deleteFile).toHaveBeenCalledTimes(1);
    expect(deleteDirectory).toHaveBeenCalledTimes(1);
    expect(imagePresent).toBe(false);
    const ecrCalls = runner.mock.calls.filter(
      ([args]) =>
        args[0] === "ecr" && args[1] === "describe-images"
    );
    expect(ecrCalls.length).toBeGreaterThanOrEqual(2);
    for (const [args] of ecrCalls) {
      expect(args[args.indexOf("--image-ids") + 1]).toBe(
        `imageDigest=${context.imageId}`
      );
      expect(args[args.indexOf("--profile") + 1]).toBe(
        RESEARCH_AWS_PROFILE
      );
    }
    expect(
      dockerRunner.mock.calls.some(
        ([args]) => args[0] === "builder"
      )
    ).toBe(false);
    expect(
      context.manifest.execution
        .auditedLocalArtifactCleanup
    ).toMatchObject({
      status: "COMPLETE_WITH_SHARED_BUILDKIT_RETAINED",
      outOfScopeDiscoveryPerformed: false,
      outOfScopeArtifactsTouched: false,
      broadBuildkitPrunePerformed: false
    });
    expect(
      context.manifest.execution
        .auditedLocalArtifactCleanup.results.find(
          (record) =>
            record.recordKind === "DOCKER_IMAGE"
        )?.verification.liveEcr
    ).toMatchObject({
      repositoryControls: {
        imageTagMutability: "IMMUTABLE",
        encryptionType: "AES256",
        scanOnPush: true
      },
      lifecyclePolicy: {
        taggedImagesRetained: true,
        minimumUntaggedRetentionDays: 14
      },
      exactTaggedImageRetentionStatus:
        "VERIFIED_TAGGED_AND_EXCLUDED_FROM_UNTAGGED_ONLY_EXPIRATION"
    });
    expect(validateManifestDigest(context.manifest)).toBe(
      context.manifest
    );
  });
}, 30_000);

test("audited cleanup resumes an exact quarantined file without revalidating deleted source bytes", async () => {
  await withAuditedCleanupFixture(async (context) => {
    const audit = JSON.parse(
      await readFile(context.auditPath, "utf8")
    );
    audit.artifactGroups = audit.artifactGroups.filter(
      (group) => group.groupId === "test-files"
    );
    await writeFile(
      context.auditPath,
      `${JSON.stringify(audit, null, 2)}\n`,
      "utf8"
    );
    context.manifest.localArtifactAudit =
      await loadLocalArtifactAudit({
        repoRoot: context.root,
        originalLocalArtifacts: []
      });
    markCleanupEligible(
      context.manifest,
      [context.packageRecord],
      DEFAULT_MANIFEST_RELATIVE_PATH
    );
    const manifestPath = await persistManifest(
      context.root,
      context.manifest,
      DEFAULT_MANIFEST_RELATIVE_PATH
    );
    const interruptedDelete = vi.fn(async () => {
      const persisted = JSON.parse(
        await readFile(manifestPath, "utf8")
      );
      expect(
        persisted.execution.localCleanupJournal
          .pendingAction
      ).toMatchObject({
        actionType: "EXACT_FILE",
        targetPath: context.exactPath,
        state: "QUARANTINED"
      });
      throw new Error(
        "SIMULATED_QUARANTINE_DELETE_INTERRUPTION"
      );
    });
    await expect(
      cleanupAuditedLocalArtifacts({
        repoRoot: context.root,
        manifestPath,
        manifest: context.manifest,
        destination,
        confirmDeleteLocal: true,
        runner: vi.fn(),
        dockerRunner: vi.fn(),
        gitRunner: cleanValidationGitRunner(),
        deleteFile: interruptedDelete,
        permittedTempRoots: [context.externalRoot],
        now: () => "2026-07-24T21:30:00.000Z"
      })
    ).rejects.toThrow(
      /SIMULATED_QUARANTINE_DELETE_INTERRUPTION/
    );
    const interrupted = JSON.parse(
      await readFile(manifestPath, "utf8")
    );
    expect(validateManifestDigest(interrupted)).toBe(
      interrupted
    );
    const pending =
      interrupted.execution.localCleanupJournal
        .pendingAction;
    await expect(
      readFile(context.exactPath)
    ).rejects.toThrow();
    expect(
      await readFile(pending.quarantinePath, "utf8")
    ).toBe("diagnostic\n");

    const resumedDelete = vi.fn(async (path) => {
      await rm(path);
    });
    const resumed =
      await cleanupAuditedLocalArtifacts({
        repoRoot: context.root,
        manifestPath,
        manifest: interrupted,
        destination,
        confirmDeleteLocal: true,
        runner: vi.fn(),
        dockerRunner: vi.fn(),
        gitRunner: dirtyManifestValidationGitRunner(),
        deleteFile: resumedDelete,
        permittedTempRoots: [context.externalRoot],
        now: () => "2026-07-24T21:31:00.000Z"
      });
    expect(resumed.summary).toMatchObject({
      nonpackageRecordCount: 1,
      deletedPathCount: 1,
      pendingRecordCount: 0
    });
    expect(resumedDelete).toHaveBeenCalledWith(
      pending.quarantinePath
    );
    const completed = JSON.parse(
      await readFile(manifestPath, "utf8")
    );
    expect(validateManifestDigest(completed)).toBe(
      completed
    );
    expect(
      completed.execution.localCleanupJournal
    ).toMatchObject({
      status: "COMPLETE",
      pendingAction: null
    });
    expect(
      completed.execution
        .auditedLocalArtifactCleanup.results
    ).toEqual([
      expect.objectContaining({
        originalPath: context.exactPath,
        cleanupStatus:
          "LOCAL_DELETED_AFTER_VERIFICATION"
      })
    ]);
  });
});

test("audited cleanup performs no deletion when an exact file checksum changed", async () => {
  await withAuditedCleanupFixture(async (context) => {
    const manifestPath = await persistManifest(
      context.root,
      context.manifest
    );
    await writeFile(context.exactPath, "tampered!!\n", "utf8");
    const deleteFile = vi.fn();
    const deleteDirectory = vi.fn();
    const dockerRunner = vi.fn();
    await expect(
      cleanupAuditedLocalArtifacts({
        repoRoot: context.root,
        manifestPath,
        manifest: context.manifest,
        destination,
        confirmDeleteLocal: true,
        runner: async (args) => {
          if (args[0] === "sts") return identity();
          const response = auditedEcrControlResult(
            args,
            context
          );
          if (response) return response;
          throw new Error(`unexpected ${args.join(" ")}`);
        },
        dockerRunner,
        gitRunner: cleanValidationGitRunner(),
        deleteFile,
        deleteDirectory,
        permittedTempRoots: [context.externalRoot]
      })
    ).rejects.toThrow(
      /AUDITED_EXACT_FILE_CONTENT_CHANGED/
    );
    expect(deleteFile).not.toHaveBeenCalled();
    expect(deleteDirectory).not.toHaveBeenCalled();
    expect(dockerRunner).not.toHaveBeenCalled();
  });
});

test("audited cleanup rejects unsafe live ECR repository controls before local deletion", async () => {
  await withAuditedCleanupFixture(async (context) => {
    const manifestPath = await persistManifest(
      context.root,
      context.manifest
    );
    const deleteFile = vi.fn();
    const deleteDirectory = vi.fn();
    const dockerRunner = vi.fn();
    const runner = vi.fn(async (args) => {
      if (args[0] === "sts") return identity();
      const response = auditedEcrControlResult(
        args,
        context
      );
      if (
        response &&
        args[1] === "describe-repositories"
      ) {
        const body = JSON.parse(response.stdout);
        body.repositories[0].imageTagMutability =
          "MUTABLE";
        return success(body);
      }
      if (response) return response;
      throw new Error(`unexpected ${args.join(" ")}`);
    });
    await expect(
      cleanupAuditedLocalArtifacts({
        repoRoot: context.root,
        manifestPath,
        manifest: context.manifest,
        destination,
        confirmDeleteLocal: true,
        runner,
        dockerRunner,
        gitRunner: cleanValidationGitRunner(),
        deleteFile,
        deleteDirectory,
        permittedTempRoots: [context.externalRoot]
      })
    ).rejects.toThrow(/UNSAFE_ECR_TAG_MUTABILITY/);
    expect(deleteFile).not.toHaveBeenCalled();
    expect(deleteDirectory).not.toHaveBeenCalled();
    expect(dockerRunner).not.toHaveBeenCalled();
  });
});

test("audited cleanup rejects an unexpected Docker tag before any deletion", async () => {
  await withAuditedCleanupFixture(async (context) => {
    const manifestPath = await persistManifest(
      context.root,
      context.manifest
    );
    const deleteFile = vi.fn();
    const deleteDirectory = vi.fn();
    const runner = vi.fn(async (args) => {
      if (args[0] === "sts") return identity();
      if (args[0] === "ecr") {
        const response = auditedEcrControlResult(
          args,
          context
        );
        if (response) return response;
      }
      throw new Error(`unexpected ${args.join(" ")}`);
    });
    const dockerRunner = vi.fn(async (args) => {
      if (args[0] === "image" && args[1] === "inspect") {
        return success([
          {
            Id: context.imageId,
            Created: context.imageBuiltAt,
            Size: context.imageSizeBytes,
            RepoTags: [
              context.localImageTag,
              context.ecrImageTag,
              context.ecrImageUri,
              "unrelated:latest"
            ],
            RepoDigests: [
              `retrofit-research-test@${context.imageId}`,
              context.ecrImageUri
            ]
          }
        ]);
      }
      if (args[0] === "ps") {
        return { exitCode: 0, stdout: "", stderr: "" };
      }
      throw new Error(`unexpected ${args.join(" ")}`);
    });
    await expect(
      cleanupAuditedLocalArtifacts({
        repoRoot: context.root,
        manifestPath,
        manifest: context.manifest,
        destination,
        confirmDeleteLocal: true,
        runner,
        dockerRunner,
        gitRunner: cleanValidationGitRunner(),
        deleteFile,
        deleteDirectory,
        permittedTempRoots: [context.externalRoot]
      })
    ).rejects.toThrow(
      /AUDITED_DOCKER_IMAGE_ID_SIZE_OR_TAG_SET_MISMATCH/
    );
    expect(deleteFile).not.toHaveBeenCalled();
    expect(deleteDirectory).not.toHaveBeenCalled();
    expect(
      dockerRunner.mock.calls.some(
        ([args]) =>
          args[0] === "image" && args[1] === "rm"
      )
    ).toBe(false);
  });
});

test("audited cleanup detects a Docker reference race and never force-removes the image", async () => {
  await withAuditedCleanupFixture(async (context) => {
    const audit = JSON.parse(
      await readFile(context.auditPath, "utf8")
    );
    audit.artifactGroups = audit.artifactGroups.filter(
      (group) => group.groupId === "test-image"
    );
    await writeFile(
      context.auditPath,
      `${JSON.stringify(audit, null, 2)}\n`,
      "utf8"
    );
    context.manifest.localArtifactAudit =
      await loadLocalArtifactAudit({
        repoRoot: context.root,
        originalLocalArtifacts: []
      });
    markCleanupEligible(context.manifest, [
      context.packageRecord
    ]);
    const manifestPath = await persistManifest(
      context.root,
      context.manifest
    );
    const runner = vi.fn(async (args) => {
      if (args[0] === "sts") return identity();
      const response = auditedEcrControlResult(
        args,
        context
      );
      if (response) return response;
      throw new Error(`unexpected ${args.join(" ")}`);
    });
    const localDigest =
      `retrofit-research-test@${context.imageId}`;
    const tags = new Set([
      context.localImageTag,
      context.ecrImageTag,
      context.ecrImageUri
    ]);
    const digests = new Set([
      localDigest,
      context.ecrImageUri
    ]);
    let removalCount = 0;
    const dockerRunner = vi.fn(async (args) => {
      expect(args).not.toContain("--force");
      if (args[0] === "ps") {
        return { exitCode: 0, stdout: "", stderr: "" };
      }
      if (args[0] === "image" && args[1] === "inspect") {
        const reference = args[2];
        if (
          reference !== context.imageId &&
          !tags.has(reference) &&
          !digests.has(reference)
        ) {
          return {
            exitCode: 1,
            stdout: "",
            stderr: "No such image"
          };
        }
        return success([
          {
            Id: context.imageId,
            Created: context.imageBuiltAt,
            Size: context.imageSizeBytes,
            RepoTags: [...tags],
            RepoDigests: [...digests]
          }
        ]);
      }
      if (args[0] === "image" && args[1] === "rm") {
        removalCount += 1;
        const reference = args[2];
        tags.delete(reference);
        digests.delete(reference);
        tags.add("unrelated:race");
        return success("Untagged exact reference\n");
      }
      throw new Error(`unexpected ${args.join(" ")}`);
    });

    await expect(
      cleanupAuditedLocalArtifacts({
        repoRoot: context.root,
        manifestPath,
        manifest: context.manifest,
        destination,
        confirmDeleteLocal: true,
        runner,
        dockerRunner,
        gitRunner: cleanValidationGitRunner(),
        permittedTempRoots: [context.externalRoot]
      })
    ).rejects.toThrow(
      /AUDITED_DOCKER_IMAGE_CHANGED_DURING_CLEANUP/
    );
    expect(removalCount).toBe(1);
    expect(tags.has("unrelated:race")).toBe(true);
    expect(
      dockerRunner.mock.calls.some(
        ([args]) =>
          args[0] === "image" &&
          args[1] === "rm" &&
          args[2] === context.imageId
      )
    ).toBe(false);
  });
});
