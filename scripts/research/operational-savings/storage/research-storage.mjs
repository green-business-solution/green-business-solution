#!/usr/bin/env node

import {
  mkdir,
  readFile,
  writeFile
} from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

import {
  FINAL_CLEANUP_VALIDATION_COMMAND,
  cleanupAllPackages,
  cleanupAuditedLocalArtifacts,
  cleanupPackage,
  hydratePackage,
  manifestSourceSha256,
  planEcrImageRestore,
  planAuditedLocalArtifactCleanup,
  plannedOperation,
  prepareAllRepositoryArchives,
  prepareRepositoryArchive,
  recordAllCleanupValidation,
  recordEcrRestoreReplay,
  recoverPendingPackageCleanup,
  restoreOriginalLocalArtifacts,
  restoreAndReplayEcrImages,
  uploadPackage,
  uploadAllPackages,
  validateManifestDigest,
  validateResearchDestination,
  verifyAllPackages,
  verifyPackageRemote,
  writeManifestAtomically
} from "./aws-guard.mjs";
import {
  assertRestoreAllManifestMayProceed,
  planRestoreAllPackages,
  restoreAllPackagesCheckpointed
} from "./restore-all.mjs";
import {
  DEFAULT_MANIFEST_RELATIVE_PATH,
  DEFAULT_REPORT_RELATIVE_PATH,
  DEFAULT_REPO_ROOT,
  assertCanonicalInventoriesMatch,
  assertCanonicalInventoryIdentity,
  buildResearchEcrInventory,
  buildResearchStorageInventory,
  buildResearchStorageReport,
  sha256CanonicalJson
} from "./inventory.mjs";
import {
  POST_HOC_REPLAY_RECEIPT_RELATIVE_PATH,
  assertLivePostHocReplayReceipt
} from "./post-hoc-replay.mjs";
import {
  captureCleanCommittedSourceContext,
  runPostHocReplayAndWriteReceipt
} from "../verify-model-containers.mjs";

const VALUE_OPTIONS = new Set([
  "--bucket",
  "--generated-on",
  "--manifest",
  "--package",
  "--profile",
  "--region",
  "--repo-root",
  "--report",
  "--validation-command"
]);
const BOOLEAN_OPTIONS = new Set([
  "--confirm-no-active-consumers",
  "--confirm-delete-local",
  "--execute",
  "--help",
  "--remove-after-replay",
  "--refresh-replay-receipt",
  "--run-validation",
  "--write"
]);

function parseArguments(argv) {
  const command = argv[0]?.startsWith("--")
    ? "inventory"
    : argv[0] ?? "inventory";
  const tokens = argv[0]?.startsWith("--") ? argv : argv.slice(1);
  const options = {};
  for (let index = 0; index < tokens.length; index += 1) {
    const token = tokens[index];
    if (BOOLEAN_OPTIONS.has(token)) {
      options[token.slice(2)] = true;
      continue;
    }
    if (!VALUE_OPTIONS.has(token)) {
      throw new Error(`UNKNOWN_ARGUMENT: ${token}`);
    }
    const value = tokens[index + 1];
    if (!value || value.startsWith("--")) {
      throw new Error(`ARGUMENT_VALUE_REQUIRED: ${token}`);
    }
    options[token.slice(2)] = value;
    index += 1;
  }
  return { command, options };
}

function help() {
  return `Operational-savings research storage migration

Inventory without any AWS access:
  node scripts/research/operational-savings/storage/research-storage.mjs inventory
  node scripts/research/operational-savings/storage/research-storage.mjs inventory --write

Plan one upload without any AWS access:
  node scripts/research/operational-savings/storage/research-storage.mjs upload --package <id> --profile retrofi-operational-savings-research --bucket retrofi-operational-savings-research-945129430686-us-east-1 --region us-east-1

Execute one guarded upload:
  Add --execute to the upload command.

Verify one already uploaded object:
  Replace upload with verify and add --execute.

Prepare one pinned repository as a deterministic source archive:
  Replace upload with prepare-archive and add --execute.

Prepare every pinned repository archive with one manifest update:
  Use prepare-all-archives and add --execute.

Upload or verify every package with one manifest update:
  Use upload-all or verify-all and add --execute.

Record final tests/builds after every exact S3 version has passed a restored-byte proof:
  Use validate-cleanup-readiness --validation-command '<command>' --confirm-no-active-consumers --execute.

Delete one local standalone file after every remote, restored-byte, validation, and Git gate passes:
  Replace upload with cleanup and add --execute --confirm-delete-local.

Preflight every local and exact-version remote package before deleting any eligible local package:
  Use cleanup-all and add --execute --confirm-delete-local.

Recover only one already-checkpointed package quarantine after a cleanup implementation fix:
  Use recover-pending-cleanup --package <id> and add --execute --confirm-delete-local.
  The command requires the original validated commit as an ancestor, permits only committed cleanup-control changes, re-verifies the exact S3 version and quarantined bytes, and never starts a new deletion action.

Preflight every committed nonpackage audit record before exact temp-path and research-image cleanup:
  Use cleanup-audited-local and add --execute --confirm-delete-local.
  This command never broadly prunes shared BuildKit cache.

Hydrate one deleted package from its exact verified S3 version without overwrite:
  Use restore --package <id> and add --execute.

Hydrate every package in parent-before-child dependency order:
  Use restore-all and add --execute.
  The command starts only from a clean committed manifest, preflights every exact S3 version, and checkpoints each dependency-ordered package for safe restart.
  Add --run-validation to run the fixed full offline validation sequence after restoration.
  Without --run-validation, the result prints the exact required next command.

Restore every audited original temporary path from its exact hydrated package without overwrite:
  Use restore-original-artifacts and add --execute.
  The command requires a complete exact-version restore-all receipt, verifies every canonical package and existing target, and creates only exclusive copies below /private/tmp.

Hydrate and replay every runnable model from its exact verified ECR digest:
  Use restore-ecr-images with the dedicated research destination and add --execute.
  The command verifies immutable tags, AES256 encryption, scan-on-push, and tagged-image-safe lifecycle policy before pulling.
  It authenticates with a temporary Docker configuration and removes that configuration after the offline verifiers finish.
  Every successful executed replay writes an atomic manifest receipt.
  Local removal is accepted only with --remove-after-replay --run-validation --confirm-no-active-consumers.
  That mode requires every accepted image to be absent before the pull, runs the fixed full offline validation while every restored S3 package and ECR image is present, removes only each exact ECR digest reference, and succeeds only when the corresponding image ID is then absent.
  If a committed replay receipt is stale after an implementation change, use --refresh-replay-receipt --remove-after-replay --confirm-no-active-consumers.
  Receipt refresh verifies the historical receipt and exact ECR controls, pulls and replays all four images, atomically rotates the committed receipt, and removes only the exact transient ECR images.
  Commit the refreshed receipt and manifest before running the full validation mode.

Refresh only the recorded current post-hoc replay evidence after committing a new receipt:
  Use refresh-ecr-evidence and add --execute.
  The command refuses any change to durable build or exact ECR publication evidence and never calls AWS.

Upload, verify, and cleanup accept only the dedicated research profile, account, role, bucket, and region.
Repository packages remain blocked until a source archive is materialized and the manifest records its exact size and SHA-256.
`;
}

function absoluteFromRoot(repoRoot, value, fallback) {
  return resolve(repoRoot, value ?? fallback);
}

function destination(options) {
  return {
    profile:
      options.profile ?? process.env.OS_RESEARCH_AWS_PROFILE,
    bucket:
      options.bucket ?? process.env.OS_RESEARCH_S3_BUCKET,
    region:
      options.region ?? process.env.OS_RESEARCH_AWS_REGION
  };
}

async function readManifest(path) {
  const source = await readFile(path, "utf8");
  let manifest;
  try {
    manifest = JSON.parse(source);
  } catch (error) {
    throw new Error(
      `MANIFEST_INVALID_JSON: ${path}: ${error.message}`
    );
  }
  validateManifestDigest(manifest);
  return { manifest, source };
}

function durableEcrEvidence(ecr) {
  return {
    accountId: ecr?.accountId,
    region: ecr?.region,
    repositories: [...(ecr?.repositories ?? [])]
      .sort((left, right) =>
        left.modelId.localeCompare(right.modelId)
      )
      .map((repository) => {
        const {
          verificationStatus: _verificationStatus,
          currentDaemonPresenceCheckedByInventory:
            _currentDaemonPresenceCheckedByInventory,
          ...durableLocalImage
        } = repository.localImage ?? {};
        return {
          modelId: repository.modelId,
          repositoryName:
            repository.repositoryName,
          expectedRepositoryUri:
            repository.expectedRepositoryUri,
          buildManifest: repository.buildManifest,
          localImage: durableLocalImage,
          plannedRemoteImage:
            repository.plannedRemoteImage,
          provenance: repository.provenance,
          remoteImage: repository.remoteImage
        };
      })
  };
}

async function refreshEcrEvidenceCommand(options) {
  const repoRoot = resolve(
    options["repo-root"] ?? DEFAULT_REPO_ROOT
  );
  const manifestPath = absoluteFromRoot(
    repoRoot,
    options.manifest,
    DEFAULT_MANIFEST_RELATIVE_PATH
  );
  const { manifest, source } =
    await readManifest(manifestPath);
  const currentEcr = await buildResearchEcrInventory({
    repoRoot
  });
  if (
    currentEcr.postHocReplayReceipt?.status !==
      "PASS_COMMITTED_POST_HOC_REPLAY" ||
    currentEcr.postHocReplayReceipt.blocker !== null
  ) {
    throw new Error(
      "CURRENT_POST_HOC_REPLAY_RECEIPT_REQUIRED: generate and commit the exact four-model replay receipt first"
    );
  }
  const recordedDurableEvidenceSha256 =
    sha256CanonicalJson(
      durableEcrEvidence(manifest.destination?.ecr)
    );
  const currentDurableEvidenceSha256 =
    sha256CanonicalJson(
      durableEcrEvidence(currentEcr)
    );
  if (
    recordedDurableEvidenceSha256 !==
    currentDurableEvidenceSha256
  ) {
    throw new Error(
      "DURABLE_ECR_EVIDENCE_CHANGED: refusing to refresh replay state across a build or publication evidence change"
    );
  }
  const plan = {
    dryRun: true,
    operation: "refresh-ecr-evidence",
    recordedDurableEvidenceSha256,
    currentDurableEvidenceSha256,
    receiptContentSha256:
      currentEcr.postHocReplayReceipt.receipt
        .receiptContentSha256,
    wouldCallAws: false,
    wouldDeleteLocal: false,
    wouldOverwriteDurableEvidence: false
  };
  if (!options.execute) {
    return plan;
  }
  manifest.destination.ecr = currentEcr;
  delete manifest.manifestContentSha256;
  manifest.manifestContentSha256 =
    sha256CanonicalJson(manifest);
  await assertLivePostHocReplayReceipt({
    repoRoot,
    manifest
  });
  const writeResult = await writeManifestAtomically({
    manifestPath,
    manifest,
    expectedSourceSha256:
      manifestSourceSha256(source)
  });
  return {
    ...plan,
    dryRun: false,
    manifest: writeResult
  };
}

async function verifyCurrentCanonicalInventory({
  repoRoot,
  manifest
}) {
  const currentInventory =
    await buildResearchStorageInventory({
      repoRoot,
      generatedOn: manifest.generatedOn
    });
  return {
    ...assertCanonicalInventoriesMatch({
      manifest,
      currentInventory
    }),
    verifiedAt: new Date().toISOString(),
    observedHeadCommit:
      currentInventory.sourceRepository.headCommit
  };
}

function requireRecordedCanonicalInventoryFreshness(
  manifest
) {
  const identity =
    assertCanonicalInventoryIdentity(manifest);
  const receipt =
    manifest.execution?.canonicalInventoryFreshness;
  if (
    receipt?.status !== "VERIFIED_CURRENT" ||
    receipt.schemaVersion !==
      "operational-savings/canonical-inventory-freshness-v1" ||
    receipt.packageCount !== identity.packageCount ||
    receipt.contentSha256 !== identity.contentSha256 ||
    typeof receipt.verifiedAt !== "string" ||
    !Number.isFinite(Date.parse(receipt.verifiedAt))
  ) {
    throw new Error(
      "CANONICAL_INVENTORY_FRESHNESS_RECEIPT_REQUIRED: run upload and cleanup through the guarded storage workflow before deleting audited local artifacts"
    );
  }
  return receipt;
}

async function inventoryCommand(options) {
  const repoRoot = resolve(options["repo-root"] ?? DEFAULT_REPO_ROOT);
  const manifestPath = absoluteFromRoot(
    repoRoot,
    options.manifest,
    DEFAULT_MANIFEST_RELATIVE_PATH
  );
  const reportPath = absoluteFromRoot(
    repoRoot,
    options.report,
    DEFAULT_REPORT_RELATIVE_PATH
  );
  const manifest = await buildResearchStorageInventory({
    repoRoot,
    generatedOn: options["generated-on"]
  });
  const report = buildResearchStorageReport(manifest);
  if (options.write) {
    const existingSource = await readFile(manifestPath, "utf8").catch(
      (error) => {
        if (error.code === "ENOENT") return null;
        throw error;
      }
    );
    if (existingSource !== null) {
      let existing;
      try {
        existing = JSON.parse(existingSource);
      } catch (error) {
        throw new Error(
          `EXISTING_MANIFEST_INVALID: ${error.message}`
        );
      }
      const hasMigrationState =
        existing.execution?.uploadsPerformed === true ||
        existing.execution?.localFilesDeleted === true ||
        existing.packages?.some(
          (entry) =>
            entry.remote?.s3?.verificationStatus === "VERIFIED" ||
            entry.plannedObject?.state === "ARCHIVE_MATERIALIZED"
        );
      if (hasMigrationState) {
        throw new Error(
          "MIGRATION_STATE_EXISTS: refusing to replace a manifest that records materialization, upload, verification, or cleanup state"
        );
      }
    }
    await Promise.all([
      mkdir(dirname(manifestPath), { recursive: true }),
      mkdir(dirname(reportPath), { recursive: true })
    ]);
    await Promise.all([
      writeFile(
        manifestPath,
        `${JSON.stringify(manifest, null, 2)}\n`,
        "utf8"
      ),
      writeFile(reportPath, report, "utf8")
    ]);
  }
  return {
    dryRun: true,
    wroteFiles: Boolean(options.write),
    manifestPath,
    reportPath,
    summary: manifest.summary,
    destination: manifest.destination,
    execution: manifest.execution
  };
}

async function remoteCommand(command, options) {
  const repoRoot = resolve(options["repo-root"] ?? DEFAULT_REPO_ROOT);
  const manifestPath = absoluteFromRoot(
    repoRoot,
    options.manifest,
    DEFAULT_MANIFEST_RELATIVE_PATH
  );
  if (!options.package) {
    throw new Error("PACKAGE_REQUIRED: provide --package <id>");
  }
  const { manifest, source } = await readManifest(manifestPath);
  const requestedDestination = validateResearchDestination(
    destination(options)
  );
  const operation = plannedOperation({
    manifest,
    packageId: options.package,
    destination: requestedDestination,
    operation: command
  });
  if (!options.execute) return operation;

  const canonicalInventoryFreshness =
    ["upload", "cleanup"].includes(command)
      ? await verifyCurrentCanonicalInventory({
          repoRoot,
          manifest
        })
      : null;
  let result;
  if (command === "upload") {
    result = await uploadPackage({
      repoRoot,
      manifest,
      packageId: options.package,
      destination: requestedDestination
    });
  } else if (command === "verify") {
    result = await verifyPackageRemote({
      repoRoot,
      manifest,
      packageId: options.package,
      destination: requestedDestination
    });
  } else if (command === "cleanup") {
    result = await cleanupPackage({
      repoRoot,
      manifestPath,
      manifest,
      packageId: options.package,
      destination: requestedDestination,
      expectedManifestSourceSha256:
        manifestSourceSha256(source),
      confirmDeleteLocal: options["confirm-delete-local"] === true
    });
  } else {
    throw new Error(`UNKNOWN_COMMAND: ${command}`);
  }
  if (command === "upload") {
    manifest.execution.canonicalInventoryFreshness =
      canonicalInventoryFreshness;
  }
  const writeResult =
    command === "cleanup"
      ? await (async () => {
          manifest.execution
            .canonicalInventoryFreshness =
            canonicalInventoryFreshness;
          return writeManifestAtomically({
            manifestPath,
            manifest,
            expectedSourceSha256:
              result.manifestCheckpointSha256
          });
        })()
      : await writeManifestAtomically({
          manifestPath,
          manifest,
          expectedSourceSha256:
            manifestSourceSha256(source)
        });
  return {
    dryRun: false,
    operation: command,
    ...result,
    manifest: writeResult
  };
}

async function batchRemoteCommand(command, options) {
  const repoRoot = resolve(options["repo-root"] ?? DEFAULT_REPO_ROOT);
  const manifestPath = absoluteFromRoot(
    repoRoot,
    options.manifest,
    DEFAULT_MANIFEST_RELATIVE_PATH
  );
  const { manifest, source } = await readManifest(manifestPath);
  const requestedDestination =
    command === "prepare-all-archives"
      ? destination(options)
      : validateResearchDestination(destination(options));
  const operation = {
    dryRun: true,
    operation: command,
    packageCount: manifest.packages.length,
    bucket: requestedDestination.bucket,
    profile: requestedDestination.profile,
    region: requestedDestination.region,
    wouldCallAws: command !== "prepare-all-archives",
    wouldDeleteLocal: command === "cleanup-all",
    overwriteAllowed: false
  };
  if (!options.execute) return operation;

  const canonicalInventoryFreshness =
    ["upload-all", "cleanup-all"].includes(
      command
    )
      ? await verifyCurrentCanonicalInventory({
          repoRoot,
          manifest
        })
      : null;
  let result;
  if (command === "prepare-all-archives") {
    result = await prepareAllRepositoryArchives({
      repoRoot,
      manifest
    });
  } else if (command === "upload-all") {
    result = await uploadAllPackages({
      repoRoot,
      manifest,
      destination: requestedDestination
    });
  } else if (command === "verify-all") {
    result = await verifyAllPackages({
      repoRoot,
      manifest,
      destination: requestedDestination
    });
  } else if (command === "cleanup-all") {
    result = await cleanupAllPackages({
      repoRoot,
      manifestPath,
      manifest,
      destination: requestedDestination,
      expectedManifestSourceSha256:
        manifestSourceSha256(source),
      confirmDeleteLocal:
        options["confirm-delete-local"] === true
    });
  } else {
    throw new Error(`UNKNOWN_BATCH_COMMAND: ${command}`);
  }
  if (command === "upload-all") {
    manifest.execution.canonicalInventoryFreshness =
      canonicalInventoryFreshness;
  }
  const writeResult =
    command === "cleanup-all"
      ? await (async () => {
          manifest.execution
            .canonicalInventoryFreshness =
            canonicalInventoryFreshness;
          return writeManifestAtomically({
            manifestPath,
            manifest,
            expectedSourceSha256:
              result.manifestCheckpointSha256
          });
        })()
      : await writeManifestAtomically({
          manifestPath,
          manifest,
          expectedSourceSha256:
            manifestSourceSha256(source)
        });
  return {
    dryRun: false,
    operation: command,
    ...result,
    manifest: writeResult
  };
}

async function restoreAllCommand(options) {
  const repoRoot = resolve(options["repo-root"] ?? DEFAULT_REPO_ROOT);
  const manifestPath = absoluteFromRoot(
    repoRoot,
    options.manifest,
    DEFAULT_MANIFEST_RELATIVE_PATH
  );
  const { manifest, source } = await readManifest(manifestPath);
  const requestedDestination = validateResearchDestination(
    destination(options)
  );
  if (!options.execute) {
    const start =
      await assertRestoreAllManifestMayProceed({
        repoRoot,
        manifestPath,
        manifest,
        destination: requestedDestination
      });
    const plan = await planRestoreAllPackages({
      repoRoot,
      manifest,
      destination: requestedDestination
    });
    return {
      ...plan,
      manifestStartMode: start.mode,
      manifestHeadCommit: start.headCommit,
      wouldRunOfflineValidation:
        options["run-validation"] === true
    };
  }
  const result = await restoreAllPackagesCheckpointed({
    repoRoot,
    manifestPath,
    manifest,
    expectedManifestSourceSha256:
      manifestSourceSha256(source),
    destination: requestedDestination,
    runOfflineValidation:
      options["run-validation"] === true
  });
  return {
    dryRun: false,
    operation: "restore-all",
    ...result,
    manifest: {
      path: manifestPath,
      sourceSha256:
        result.manifestCheckpointSha256
    }
  };
}

async function recoverPendingCleanupCommand(options) {
  const repoRoot = resolve(
    options["repo-root"] ?? DEFAULT_REPO_ROOT
  );
  const manifestPath = absoluteFromRoot(
    repoRoot,
    options.manifest,
    DEFAULT_MANIFEST_RELATIVE_PATH
  );
  if (!options.package) {
    throw new Error(
      "PACKAGE_REQUIRED: provide --package <id>"
    );
  }
  const { manifest, source } =
    await readManifest(manifestPath);
  const pending =
    manifest.execution?.localCleanupJournal
      ?.pendingAction ?? null;
  if (!options.execute) {
    return {
      dryRun: true,
      operation: "recover-pending-cleanup",
      packageId: options.package,
      pendingAction: pending,
      wouldCallAws: true,
      wouldDeleteLocal: true,
      wouldStartNewDeletion: false
    };
  }
  const result = await recoverPendingPackageCleanup({
    repoRoot,
    manifestPath,
    manifest,
    packageId: options.package,
    destination: validateResearchDestination(
      destination(options)
    ),
    expectedManifestSourceSha256:
      manifestSourceSha256(source),
    confirmDeleteLocal:
      options["confirm-delete-local"] === true
  });
  return {
    dryRun: false,
    operation: "recover-pending-cleanup",
    ...result,
    manifest: {
      path: manifestPath,
      sourceSha256:
        result.manifestCheckpointSha256
    }
  };
}

async function restoreOriginalArtifactsCommand(options) {
  const repoRoot = resolve(
    options["repo-root"] ?? DEFAULT_REPO_ROOT
  );
  const manifestPath = absoluteFromRoot(
    repoRoot,
    options.manifest,
    DEFAULT_MANIFEST_RELATIVE_PATH
  );
  const { manifest, source } =
    await readManifest(manifestPath);
  const artifactCount =
    manifest.originalLocalArtifacts?.length ?? 0;
  if (!options.execute) {
    return {
      dryRun: true,
      operation: "restore-original-artifacts",
      artifactCount,
      permittedTempRoot: "/private/tmp",
      wouldCreateExclusiveCopies: true,
      wouldOverwrite: false,
      wouldCallAws: false,
      requiredProof:
        "COMPLETE_EXACT_VERSION_RESTORE_ALL_RECEIPT"
    };
  }
  const receipt = await restoreOriginalLocalArtifacts({
    repoRoot,
    manifestPath,
    manifest
  });
  const writeResult = await writeManifestAtomically({
    manifestPath,
    manifest,
    expectedSourceSha256:
      manifestSourceSha256(source)
  });
  return {
    dryRun: false,
    operation: "restore-original-artifacts",
    receipt,
    manifest: writeResult
  };
}

async function validateCleanupReadinessCommand(options) {
  const repoRoot = resolve(options["repo-root"] ?? DEFAULT_REPO_ROOT);
  const manifestPath = absoluteFromRoot(
    repoRoot,
    options.manifest,
    DEFAULT_MANIFEST_RELATIVE_PATH
  );
  const { manifest, source } = await readManifest(manifestPath);
  if (!options.execute) {
    return {
      dryRun: true,
      operation: "validate-cleanup-readiness",
      packageCount: manifest.packages.length,
      validationCommand:
        FINAL_CLEANUP_VALIDATION_COMMAND,
      wouldRunValidation: true,
      wouldCallAws: false,
      wouldDeleteLocal: false
    };
  }
  const canonicalInventoryFreshness =
    await verifyCurrentCanonicalInventory({
      repoRoot,
      manifest
    });
  const result = await recordAllCleanupValidation({
    repoRoot,
    manifestPath,
    manifest,
    validationCommand:
      options["validation-command"] ??
      FINAL_CLEANUP_VALIDATION_COMMAND,
    confirmNoActiveConsumers:
      options["confirm-no-active-consumers"] === true
  });
  manifest.execution.canonicalInventoryFreshness =
    canonicalInventoryFreshness;
  const writeResult = await writeManifestAtomically({
    manifestPath,
    manifest,
    expectedSourceSha256: manifestSourceSha256(source)
  });
  return {
    dryRun: false,
    operation: "validate-cleanup-readiness",
    ...result,
    manifest: writeResult
  };
}

async function cleanupAuditedLocalCommand(options) {
  const repoRoot = resolve(options["repo-root"] ?? DEFAULT_REPO_ROOT);
  const manifestPath = absoluteFromRoot(
    repoRoot,
    options.manifest,
    DEFAULT_MANIFEST_RELATIVE_PATH
  );
  const reportPath = absoluteFromRoot(
    repoRoot,
    options.report,
    DEFAULT_REPORT_RELATIVE_PATH
  );
  const defaultReportPath = resolve(
    repoRoot,
    DEFAULT_REPORT_RELATIVE_PATH
  );
  if (reportPath !== defaultReportPath) {
    throw new Error(
      "AUDITED_CLEANUP_REPORT_PATH_FIXED: use the committed default migration report"
    );
  }
  const { manifest, source } = await readManifest(manifestPath);
  const requestedDestination = validateResearchDestination(
    destination(options)
  );
  const plan = planAuditedLocalArtifactCleanup(manifest);
  if (!options.execute) {
    return {
      dryRun: true,
      operation: "cleanup-audited-local",
      ...plan,
      wouldCallAws: plan.dockerImageCount > 0,
      wouldInspectDocker: plan.dockerImageCount > 0,
      wouldDeleteLocal: true,
      wouldBroadlyPruneBuildkit: false
    };
  }
  let canonicalInventoryFreshness = null;
  if (manifest.execution?.localFilesDeleted === true) {
    requireRecordedCanonicalInventoryFreshness(
      manifest
    );
  } else {
    canonicalInventoryFreshness =
      await verifyCurrentCanonicalInventory({
        repoRoot,
        manifest
      });
  }
  const result = await cleanupAuditedLocalArtifacts({
    repoRoot,
    manifestPath,
    manifest,
    destination: requestedDestination,
    expectedManifestSourceSha256:
      manifestSourceSha256(source),
    confirmDeleteLocal:
      options["confirm-delete-local"] === true
  });
  if (canonicalInventoryFreshness) {
    manifest.execution.canonicalInventoryFreshness =
      canonicalInventoryFreshness;
  }
  const manifestWrite = await writeManifestAtomically({
    manifestPath,
    manifest,
    expectedSourceSha256:
      result.manifestCheckpointSha256
  });
  const report = buildResearchStorageReport(manifest);
  await mkdir(dirname(reportPath), { recursive: true });
  await writeFile(reportPath, report, "utf8");
  return {
    dryRun: false,
    operation: "cleanup-audited-local",
    ...result,
    manifest: manifestWrite,
    report: {
      path: reportPath,
      generatedFromManifestSha256:
        manifest.manifestContentSha256
    }
  };
}

async function restoreCommand(options) {
  const repoRoot = resolve(options["repo-root"] ?? DEFAULT_REPO_ROOT);
  const manifestPath = absoluteFromRoot(
    repoRoot,
    options.manifest,
    DEFAULT_MANIFEST_RELATIVE_PATH
  );
  if (!options.package) {
    throw new Error("PACKAGE_REQUIRED: provide --package <id>");
  }
  const { manifest, source } = await readManifest(manifestPath);
  const requestedDestination = validateResearchDestination(
    destination(options)
  );
  const packageRecord = manifest.packages.find(
    (candidate) => candidate.packageId === options.package
  );
  if (!packageRecord) {
    throw new Error(`PACKAGE_NOT_FOUND: ${options.package}`);
  }
  if (!options.execute) {
    return {
      dryRun: true,
      operation: "restore",
      packageId: packageRecord.packageId,
      localPath: packageRecord.localPath,
      versionId: packageRecord.remote?.s3?.versionId ?? null,
      wouldCallAws: true,
      wouldDeleteLocal: false,
      wouldOverwrite: false
    };
  }
  const result = await hydratePackage({
    repoRoot,
    manifest,
    packageId: options.package,
    destination: requestedDestination
  });
  const writeResult = await writeManifestAtomically({
    manifestPath,
    manifest,
    expectedSourceSha256: manifestSourceSha256(source)
  });
  return {
    dryRun: false,
    operation: "restore",
    ...result,
    manifest: writeResult
  };
}

async function restoreEcrImagesCommand(options) {
  const repoRoot = resolve(options["repo-root"] ?? DEFAULT_REPO_ROOT);
  const manifestPath = absoluteFromRoot(
    repoRoot,
    options.manifest,
    DEFAULT_MANIFEST_RELATIVE_PATH
  );
  const { manifest, source } = await readManifest(manifestPath);
  const requestedDestination = validateResearchDestination(
    destination(options)
  );
  if (!options.execute) {
    return planEcrImageRestore({
      manifest,
      destination: requestedDestination,
      removeAfterReplay: options["remove-after-replay"],
      runFullValidation: options["run-validation"],
      refreshReplayReceipt:
        options["refresh-replay-receipt"],
      confirmNoActiveConsumers:
        options["confirm-no-active-consumers"]
    });
  }
  const runFullValidation =
    options["run-validation"] === true;
  const refreshReplayReceipt =
    options["refresh-replay-receipt"] === true;
  if (
    refreshReplayReceipt &&
    (
      runFullValidation ||
      options["remove-after-replay"] !== true ||
      options["confirm-no-active-consumers"] !== true
    )
  ) {
    throw new Error(
      "ECR_RESTORE_REPLAY_RECEIPT_REFRESH_REQUIRES_EXACT_REMOVAL_AND_CONFIRMATION_WITHOUT_FULL_VALIDATION"
    );
  }
  if (refreshReplayReceipt) {
    await captureCleanCommittedSourceContext({
      repoRoot
    });
  }
  if (
    options["remove-after-replay"] === true &&
    (
      (!runFullValidation && !refreshReplayReceipt) ||
      options["confirm-no-active-consumers"] !== true)
  ) {
    throw new Error(
      "ECR_RESTORE_LOCAL_REMOVAL_REQUIRES_FULL_VALIDATION_AND_CONFIRMATION"
    );
  }
  let canonicalInventoryFreshness = null;
  const result = await restoreAndReplayEcrImages({
    repoRoot,
    manifest,
    destination: requestedDestination,
    removeAfterReplay: options["remove-after-replay"],
    confirmNoActiveConsumers:
      options["confirm-no-active-consumers"] === true,
    replayReceiptRefreshAction:
      refreshReplayReceipt
        ? async () =>
            runPostHocReplayAndWriteReceipt({
              repoRoot,
              replaceCommittedReceipt: true
            })
        : null,
    postReplayAction: runFullValidation
      ? async () => {
          const validation =
            await recordAllCleanupValidation({
            repoRoot,
            manifestPath,
            manifest,
            validationCommand:
              FINAL_CLEANUP_VALIDATION_COMMAND,
            confirmNoActiveConsumers:
              options["confirm-no-active-consumers"] ===
              true
            });
          if (options["remove-after-replay"] === true) {
            canonicalInventoryFreshness =
              await verifyCurrentCanonicalInventory({
                repoRoot,
                manifest
              });
          }
          return validation;
        }
      : null
  });
  if (refreshReplayReceipt) {
    const refreshed =
      result.refreshedReplayReceipt;
    if (
      refreshed?.receiptPath !==
        resolve(
          repoRoot,
          POST_HOC_REPLAY_RECEIPT_RELATIVE_PATH
        ) ||
      refreshed.receipt?.status !==
        "PASS_COMMITTED_POST_HOC_REPLAY"
    ) {
      throw new Error(
        "ECR_RESTORE_REPLAY_RECEIPT_REFRESH_RESULT_INVALID"
      );
    }
    manifest.destination.ecr.postHocReplayReceipt = {
      path: POST_HOC_REPLAY_RECEIPT_RELATIVE_PATH,
      status: "PASS_COMMITTED_POST_HOC_REPLAY",
      blocker: null,
      receipt: refreshed.receipt
    };
    delete manifest.manifestContentSha256;
    manifest.manifestContentSha256 =
      sha256CanonicalJson(manifest);
  }
  const receipt = recordEcrRestoreReplay({
    manifest,
    result
  });
  if (canonicalInventoryFreshness) {
    manifest.execution.canonicalInventoryFreshness =
      canonicalInventoryFreshness;
  }
  const writeResult = await writeManifestAtomically({
    manifestPath,
    manifest,
    expectedSourceSha256: manifestSourceSha256(source)
  });
  return {
    ...result,
    receipt,
    manifest: writeResult
  };
}

async function prepareArchiveCommand(options) {
  const repoRoot = resolve(options["repo-root"] ?? DEFAULT_REPO_ROOT);
  const manifestPath = absoluteFromRoot(
    repoRoot,
    options.manifest,
    DEFAULT_MANIFEST_RELATIVE_PATH
  );
  if (!options.package) {
    throw new Error("PACKAGE_REQUIRED: provide --package <id>");
  }
  const { manifest, source } = await readManifest(manifestPath);
  const packageRecord = manifest.packages.find(
    (candidate) => candidate.packageId === options.package
  );
  if (!packageRecord) {
    throw new Error(`PACKAGE_NOT_FOUND: ${options.package}`);
  }
  if (packageRecord.packageType !== "PINNED_GIT_REPOSITORY") {
    throw new Error(
      `REPOSITORY_PACKAGE_REQUIRED: ${options.package}`
    );
  }
  if (!options.execute) {
    return {
      dryRun: true,
      operation: "prepare-archive",
      packageId: packageRecord.packageId,
      repositoryPath: packageRecord.localPath,
      archiveFileName:
        packageRecord.plannedObject.archivePlan.outputFileName,
      wouldCallAws: false,
      wouldDeleteLocal: false,
      wouldOverwrite: false
    };
  }
  const result = await prepareRepositoryArchive({
    repoRoot,
    manifest,
    packageId: options.package
  });
  const writeResult = await writeManifestAtomically({
    manifestPath,
    manifest,
    expectedSourceSha256: manifestSourceSha256(source)
  });
  return {
    dryRun: false,
    operation: "prepare-archive",
    ...result,
    manifest: writeResult
  };
}

export async function main(argv = process.argv.slice(2)) {
  const { command, options } = parseArguments(argv);
  if (options.help || command === "help") {
    process.stdout.write(help());
    return;
  }
  let result;
  if (command === "inventory") {
    result = await inventoryCommand(options);
  } else if (command === "prepare-archive") {
    result = await prepareArchiveCommand(options);
  } else if (
    [
      "prepare-all-archives",
      "upload-all",
      "verify-all",
      "cleanup-all"
    ].includes(command)
  ) {
    result = await batchRemoteCommand(command, options);
  } else if (command === "restore-all") {
    result = await restoreAllCommand(options);
  } else if (command === "recover-pending-cleanup") {
    result = await recoverPendingCleanupCommand(options);
  } else if (command === "restore-original-artifacts") {
    result = await restoreOriginalArtifactsCommand(options);
  } else if (command === "validate-cleanup-readiness") {
    result = await validateCleanupReadinessCommand(options);
  } else if (command === "cleanup-audited-local") {
    result = await cleanupAuditedLocalCommand(options);
  } else if (command === "restore") {
    result = await restoreCommand(options);
  } else if (command === "restore-ecr-images") {
    result = await restoreEcrImagesCommand(options);
  } else if (command === "refresh-ecr-evidence") {
    result = await refreshEcrEvidenceCommand(options);
  } else if (["upload", "verify", "cleanup"].includes(command)) {
    result = await remoteCommand(command, options);
  } else {
    throw new Error(`UNKNOWN_COMMAND: ${command}`);
  }
  process.stdout.write(`${JSON.stringify(result, null, 2)}\n`);
}

if (
  process.argv[1] &&
  resolve(process.argv[1]) === resolve(fileURLToPath(import.meta.url))
) {
  main().catch((error) => {
    process.stderr.write(`${error.message}\n`);
    process.exitCode = 1;
  });
}
