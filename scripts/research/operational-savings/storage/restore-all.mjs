import { createHash } from "node:crypto";
import { execFile } from "node:child_process";
import {
  lstat,
  readFile,
  realpath
} from "node:fs/promises";
import {
  dirname,
  relative,
  resolve,
  sep
} from "node:path";
import { promisify } from "node:util";

import {
  RESEARCH_AWS_ACCOUNT_ID,
  assertManifestCleanCommitted,
  buildPackageHydrationRecord,
  hydratePackage,
  invalidateExecutionReceiptsAfterHydration,
  manifestSourceSha256,
  packageHydrationOrder,
  proveRemoteVersionRestorable,
  readRemoteObject,
  validateManifestDigest,
  validateResearchDestination,
  verifyRemoteObject,
  verifyResearchBucketControls,
  verifyResearchIdentity,
  writeManifestAtomically
} from "./aws-guard.mjs";
import {
  CACHE_RELATIVE_PATH,
  gitRepositoryIdentity,
  readArchiveMember,
  sha256CanonicalJson,
  sha256Path
} from "./inventory.mjs";
import {
  FULL_OFFLINE_RESEARCH_VALIDATION_COMMAND,
  runFullOfflineResearchValidation
} from "./validation-commands.mjs";
import {
  FIXED_GIT_PATH,
  gitSubprocessEnvironment
} from "../lib/subprocess-environment.mjs";

const execFileAsync = promisify(execFile);

export const RESTORE_ALL_JOURNAL_SCHEMA_VERSION =
  "operational-savings/s3-restore-all-journal-v2";
export const RESTORE_ALL_OFFLINE_VALIDATION_COMMAND =
  FULL_OFFLINE_RESEARCH_VALIDATION_COMMAND;

const LEGACY_RESTORE_ALL_JOURNAL_SCHEMA_VERSION =
  "operational-savings/s3-restore-all-journal-v1";
const RESTORE_ALL_HISTORY_ENTRY_SCHEMA_VERSION =
  "operational-savings/s3-restore-all-history-entry-v1";
const RESTORE_ALL_JOURNAL_SCHEMA_VERSIONS = new Set([
  LEGACY_RESTORE_ALL_JOURNAL_SCHEMA_VERSION,
  RESTORE_ALL_JOURNAL_SCHEMA_VERSION
]);
const SOURCE_CONTROLLED_RETENTION_POLICY =
  "RETAIN_SOURCE_CONTROLLED_FIXTURE";
const ALLOWED_ENCRYPTION = new Set([
  "AES256",
  "aws:kms",
  "aws:kms:dsse"
]);
const JOURNAL_STATUSES = new Set([
  "IN_PROGRESS",
  "COMPLETE"
]);
const VALIDATION_STATUSES = new Set([
  "NOT_REQUESTED",
  "RUNNING",
  "PASSED",
  "FAILED"
]);

function sha256Bytes(value) {
  return createHash("sha256").update(value).digest("hex");
}

function successfulGitOutput(result, operation) {
  if (result.exitCode !== 0) {
    throw new Error(
      `${operation}_FAILED: ${String(result.stderr ?? "").trim() || `exit ${result.exitCode}`}`
    );
  }
  return result.stdout;
}

async function defaultGitRunner(repoRoot, args) {
  try {
    const { stdout, stderr } = await execFileAsync(
      FIXED_GIT_PATH,
      ["-C", repoRoot, ...args],
      {
        encoding: "utf8",
        maxBuffer: 64 * 1024 * 1024,
        env: gitSubprocessEnvironment()
      }
    );
    return { exitCode: 0, stdout, stderr };
  } catch (error) {
    return {
      exitCode:
        typeof error.code === "number" ? error.code : 1,
      stdout: error.stdout ?? "",
      stderr: error.stderr ?? error.message
    };
  }
}

async function defaultOfflineValidationRunner(
  repoRoot,
  command
) {
  return runFullOfflineResearchValidation({
    repoRoot,
    command
  });
}

async function defaultVerifyExecutionContext(
  destination,
  runner
) {
  const [identity, bucketControls] = await Promise.all([
    verifyResearchIdentity(destination, { runner }),
    verifyResearchBucketControls(destination, { runner })
  ]);
  return { identity, bucketControls };
}

function packageById(manifest, packageId) {
  const packageRecord = manifest.packages.find(
    (candidate) => candidate.packageId === packageId
  );
  if (!packageRecord) {
    throw new Error(`PACKAGE_NOT_FOUND: ${packageId}`);
  }
  return packageRecord;
}

function safePackagePath(repoRoot, packageRecord) {
  if (
    typeof packageRecord.localPath !== "string" ||
    !packageRecord.localPath.trim()
  ) {
    throw new Error(
      `RESTORE_LOCAL_PATH_INVALID: ${packageRecord.packageId}`
    );
  }
  const root = resolve(repoRoot);
  const target = resolve(root, packageRecord.localPath);
  const candidate = relative(root, target);
  if (
    candidate === "" ||
    candidate === ".." ||
    candidate.startsWith(`..${sep}`)
  ) {
    throw new Error(
      `RESTORE_LOCAL_PATH_OUTSIDE_REPOSITORY: ${packageRecord.packageId}`
    );
  }
  return target;
}

async function assertExistingParentSafe({
  repoRoot,
  packageRecord,
  targetPath
}) {
  const parentPath = dirname(targetPath);
  const resolvedParent = await realpath(parentPath);
  if (
    packageRecord.localPath ===
      CACHE_RELATIVE_PATH ||
    packageRecord.localPath.startsWith(
      `${CACHE_RELATIVE_PATH}/`
    )
  ) {
    const resolvedCache = await realpath(
      resolve(repoRoot, CACHE_RELATIVE_PATH)
    );
    const candidate = relative(
      resolvedCache,
      resolvedParent
    );
    if (
      candidate === ".." ||
      candidate.startsWith(`..${sep}`)
    ) {
      throw new Error(
        `RESTORE_EXISTING_PARENT_OUTSIDE_CACHE: ${packageRecord.packageId}`
      );
    }
    return;
  }
  if (resolvedParent !== resolve(parentPath)) {
    throw new Error(
      `RESTORE_EXISTING_PARENT_SYMLINK_FORBIDDEN: ${packageRecord.packageId}`
    );
  }
}

async function pathState(path) {
  try {
    const details = await lstat(path);
    return { exists: true, details };
  } catch (error) {
    if (error.code === "ENOENT") {
      return { exists: false, details: null };
    }
    throw error;
  }
}

function expectedRemoteUri(destination, packageRecord) {
  return (
    `s3://${destination.bucket}/` +
    packageRecord.plannedObject.key
  );
}

function assertExactVerifiedRemoteRecord(
  packageRecord,
  destination
) {
  const planned = packageRecord.plannedObject;
  const remote = packageRecord.remote?.s3;
  const expectedDigest = planned?.expectedSha256;
  const expectedSize = planned?.expectedSizeBytes;
  const expectedChecksum =
    typeof expectedDigest === "string" &&
    /^[a-f0-9]{64}$/.test(expectedDigest)
      ? Buffer.from(expectedDigest, "hex").toString("base64")
      : null;
  const blocked =
    planned?.uploadReady !== true ||
    !Number.isSafeInteger(expectedSize) ||
    expectedSize < 0 ||
    !expectedChecksum ||
    typeof planned.contentType !== "string" ||
    !planned.contentType ||
    remote?.verificationStatus !== "VERIFIED" ||
    typeof remote.versionId !== "string" ||
    !remote.versionId.trim() ||
    remote.versionId === "null" ||
    remote.bucket !== destination.bucket ||
    remote.key !== planned.key ||
    remote.s3Uri !==
      expectedRemoteUri(destination, packageRecord) ||
    remote.contentLength !== expectedSize ||
    remote.contentType !== planned.contentType ||
    remote.metadataSha256 !== expectedDigest ||
    remote.checksumSha256Base64 !== expectedChecksum ||
    !ALLOWED_ENCRYPTION.has(remote.serverSideEncryption) ||
    typeof remote.verifiedAt !== "string" ||
    !Number.isFinite(Date.parse(remote.verifiedAt));
  if (blocked) {
    throw new Error(
      `RESTORE_EXACT_VERIFIED_REMOTE_REQUIRED: ${packageRecord.packageId}: run verify-all and commit the resulting manifest before restore-all`
    );
  }
  return {
    packageId: packageRecord.packageId,
    bucket: remote.bucket,
    key: remote.key,
    versionId: remote.versionId,
    sha256: expectedDigest,
    sizeBytes: expectedSize,
    contentType: planned.contentType
  };
}

function assertManifestDestination(manifest, destination) {
  const configured = manifest.destination?.s3;
  if (
    configured?.accountId !==
      RESEARCH_AWS_ACCOUNT_ID ||
    configured?.profile !== destination.profile ||
    configured?.bucket !== destination.bucket ||
    configured?.region !== destination.region ||
    configured?.verificationStatus !==
      "CALLER_AND_BUCKET_CONTROLS_VERIFIED" ||
    configured?.infrastructureStatus !==
      "VERIFIED_FOR_OBJECT_IO"
  ) {
    throw new Error(
      "RESTORE_MANIFEST_DESTINATION_MISMATCH"
    );
  }
}

export function exactVerifiedRemoteRecords(
  manifest,
  destination
) {
  validateManifestDigest(manifest);
  const validated =
    validateResearchDestination(destination);
  assertManifestDestination(manifest, validated);
  return manifest.packages.map((packageRecord) =>
    assertExactVerifiedRemoteRecord(
      packageRecord,
      validated
    )
  );
}

function packageSetSha256(manifest) {
  return sha256CanonicalJson(
    manifest.packages.map((packageRecord) => ({
      packageId: packageRecord.packageId,
      packageType: packageRecord.packageType,
      localPath: packageRecord.localPath,
      parentPackageId:
        packageRecord.parentPackageId ?? null,
      ownerPackageId:
        packageRecord.localLifecycle?.ownerPackageId ??
        null,
      localRetentionPolicy:
        packageRecord.localRetentionPolicy,
      fingerprint: packageRecord.fingerprint,
      plannedObject: {
        key: packageRecord.plannedObject?.key,
        expectedSizeBytes:
          packageRecord.plannedObject
            ?.expectedSizeBytes,
        expectedSha256:
          packageRecord.plannedObject?.expectedSha256,
        contentType:
          packageRecord.plannedObject?.contentType
      },
      remote: {
        bucket: packageRecord.remote?.s3?.bucket,
        key: packageRecord.remote?.s3?.key,
        s3Uri: packageRecord.remote?.s3?.s3Uri,
        versionId:
          packageRecord.remote?.s3?.versionId
      },
      embeddedMember:
        packageRecord.embeddedMember ?? null
    }))
  );
}

function restoreInvariantSha256(manifest) {
  const copy = structuredClone(manifest);
  delete copy.manifestContentSha256;
  if (copy.execution) {
    delete copy.execution.restoreAllJournal;
    delete copy.execution.lastHydration;
    delete copy.execution.lastBatchHydration;
    delete copy.execution.finalCleanupValidation;
    const ecrRestoreReplay =
      copy.execution.lastEcrRestoreReplay;
    if (ecrRestoreReplay) {
      delete ecrRestoreReplay.status;
      delete ecrRestoreReplay.invalidatedBy;
    }
  }
  for (const packageRecord of copy.packages) {
    delete packageRecord.hydration;
    if (packageRecord.remote?.s3) {
      delete packageRecord.remote.s3.deletionStatus;
      delete packageRecord.remote.s3.localDeletedAt;
    }
    const cleanup = packageRecord.cleanupEligibility;
    if (cleanup) {
      for (const field of [
        "status",
        "activeConsumerPaths",
        "validationCommand",
        "validationStatus",
        "validatedAt",
        "validatedSourceCommit",
        "validatedRepositoryTreeDigest",
        "blocker"
      ]) {
        delete cleanup[field];
      }
    }
  }
  return sha256CanonicalJson(copy);
}

function packageDependency(packageRecord) {
  return (
    packageRecord.localLifecycle?.ownerPackageId ??
    null
  );
}

function isLogicalChild(packageRecord) {
  return packageDependency(packageRecord) !== null;
}

function mayAdoptVerifiedRetainedPackage(
  manifest,
  packageRecord
) {
  const cleanupJournal =
    manifest.execution?.localCleanupJournal;
  return (
    manifest.execution?.localFilesDeleted === true &&
    cleanupJournal?.status === "COMPLETE" &&
    cleanupJournal.pendingAction === null &&
    packageRecord.localRetentionPolicy ===
      "DELETE_AFTER_VERIFIED_MIGRATION" &&
    !isLogicalChild(packageRecord) &&
    packageRecord.remote?.s3?.deletionStatus ===
      "LOCAL_RETAINED"
  );
}

function completedPackageMap(journal) {
  return new Map(
    (journal?.completedPackages ?? []).map((entry) => [
      entry.packageId,
      entry
    ])
  );
}

function assertRepositoryIdentity(packageRecord, identity) {
  const expected = packageRecord.fingerprint;
  if (
    identity.commitSha !== expected.commitSha ||
    identity.gitTreeObjectSha1 !==
      expected.gitTreeObjectSha1 ||
    identity.gitIndexListingSha256 !==
      expected.gitIndexListingSha256 ||
    identity.workingTreeClean !== true
  ) {
    throw new Error(
      `RESTORE_EXISTING_REPOSITORY_IDENTITY_MISMATCH: ${packageRecord.packageId}`
    );
  }
}

async function verifyRegularFile(
  path,
  packageRecord,
  details
) {
  if (
    !details.isFile() ||
    details.isSymbolicLink()
  ) {
    throw new Error(
      `RESTORE_EXISTING_FILE_UNSAFE: ${packageRecord.packageId}`
    );
  }
  const sha256 = await sha256Path(path);
  const expected = packageRecord.plannedObject;
  if (
    details.size !== expected.expectedSizeBytes ||
    sha256 !== expected.expectedSha256
  ) {
    throw new Error(
      `RESTORE_EXISTING_FILE_IDENTITY_MISMATCH: ${packageRecord.packageId}`
    );
  }
  return {
    kind: "EXACT_FILE",
    sha256,
    sizeBytes: details.size
  };
}

export async function verifyExistingLocalPackage({
  repoRoot,
  manifest,
  packageRecord,
  repositoryIdentityReader =
    gitRepositoryIdentity,
  archiveMemberReader = readArchiveMember
}) {
  const targetPath = safePackagePath(
    repoRoot,
    packageRecord
  );
  if (
    packageRecord.packageType ===
    "EMBEDDED_LICENSE_ARTIFACT"
  ) {
    const parent = packageById(
      manifest,
      packageRecord.parentPackageId
    );
    const parentPath = safePackagePath(repoRoot, parent);
    const parentState = await pathState(parentPath);
    if (!parentState.exists) {
      throw new Error(
        `RESTORE_EXISTING_PARENT_MISSING: ${packageRecord.packageId}`
      );
    }
    await assertExistingParentSafe({
      repoRoot,
      packageRecord: parent,
      targetPath: parentPath
    });
    const bytes = await archiveMemberReader({
      archivePath: parentPath,
      archiveFormat:
        packageRecord.embeddedMember.archiveFormat,
      memberPath:
        packageRecord.embeddedMember.memberPath
    });
    const sha256 = sha256Bytes(bytes);
    if (
      bytes.length !==
        packageRecord.plannedObject.expectedSizeBytes ||
      sha256 !==
        packageRecord.plannedObject.expectedSha256
    ) {
      throw new Error(
        `RESTORE_EXISTING_EMBEDDED_MEMBER_IDENTITY_MISMATCH: ${packageRecord.packageId}`
      );
    }
    return {
      kind: "EXACT_EMBEDDED_ARCHIVE_MEMBER",
      parentPackageId: parent.packageId,
      memberPath:
        packageRecord.embeddedMember.memberPath,
      sha256,
      sizeBytes: bytes.length
    };
  }
  const state = await pathState(targetPath);
  if (!state.exists) {
    throw new Error(
      `RESTORE_EXISTING_TARGET_MISSING: ${packageRecord.packageId}`
    );
  }
  await assertExistingParentSafe({
    repoRoot,
    packageRecord,
    targetPath
  });
  if (
    packageRecord.packageType ===
    "PINNED_GIT_REPOSITORY"
  ) {
    if (
      !state.details.isDirectory() ||
      state.details.isSymbolicLink()
    ) {
      throw new Error(
        `RESTORE_EXISTING_REPOSITORY_UNSAFE: ${packageRecord.packageId}`
      );
    }
    const identity =
      await repositoryIdentityReader(targetPath);
    assertRepositoryIdentity(packageRecord, identity);
    return {
      kind: "PINNED_GIT_REPOSITORY",
      ...identity
    };
  }
  return verifyRegularFile(
    targetPath,
    packageRecord,
    state.details
  );
}

function completedRestoreWasCleaned(manifest, journal) {
  const cleanupJournal =
    manifest.execution?.localCleanupJournal;
  const deletableRootPackages =
    manifest.packages.filter(
      (packageRecord) =>
        packageRecord.localRetentionPolicy ===
          "DELETE_AFTER_VERIFIED_MIGRATION" &&
        !isLogicalChild(packageRecord)
    );
  return (
    journal.status === "COMPLETE" &&
    manifest.execution?.localFilesDeleted === true &&
    cleanupJournal?.status === "COMPLETE" &&
    cleanupJournal.pendingAction === null &&
    deletableRootPackages.length > 0 &&
    deletableRootPackages.every(
      (packageRecord) =>
        packageRecord.remote?.s3?.deletionStatus ===
        "LOCAL_DELETED_AFTER_REMOTE_VERIFICATION"
    ) &&
    (
      manifest.originalLocalArtifacts ?? []
    ).every(
      (artifact) =>
        artifact.cleanupStatus ===
        "LOCAL_DELETED_AFTER_REMOTE_VERIFICATION"
    )
  );
}

function archivedRestoreEntryIsValid(
  entry,
  destination,
  packageCount
) {
  if (entry === null) return true;
  return (
    entry &&
    entry.schemaVersion ===
      RESTORE_ALL_HISTORY_ENTRY_SCHEMA_VERSION &&
    entry.status === "COMPLETE" &&
    /^[a-f0-9]{64}$/.test(entry.attemptId ?? "") &&
    typeof entry.startedAt === "string" &&
    Number.isFinite(Date.parse(entry.startedAt)) &&
    typeof entry.completedAt === "string" &&
    Number.isFinite(Date.parse(entry.completedAt)) &&
    /^[a-f0-9]{40,64}$/.test(
      entry.startedCommit ?? ""
    ) &&
    /^[a-f0-9]{64}$/.test(
      entry.startedManifestSourceSha256 ?? ""
    ) &&
    /^[a-f0-9]{64}$/.test(
      entry.startedInvariantSha256 ?? ""
    ) &&
    /^[a-f0-9]{64}$/.test(
      entry.packageSetSha256 ?? ""
    ) &&
    entry.packageCount === packageCount &&
    entry.destination?.profile ===
      destination.profile &&
    entry.destination?.bucket ===
      destination.bucket &&
    entry.destination?.region ===
      destination.region &&
    VALIDATION_STATUSES.has(
      entry.validation?.status
    ) &&
    entry.validation?.command ===
      RESTORE_ALL_OFFLINE_VALIDATION_COMMAND &&
    /^[a-f0-9]{64}$/.test(
      entry.journalContentSha256 ?? ""
    )
  );
}

function validateJournal({
  manifest,
  destination,
  order
}) {
  const journal =
    manifest.execution?.restoreAllJournal ?? null;
  if (!journal) return null;
  const expectedPackageSet = packageSetSha256(manifest);
  const expectedOrder = JSON.stringify(order);
  const completed = journal.completedPackages;
  const structurallyInvalid =
    !RESTORE_ALL_JOURNAL_SCHEMA_VERSIONS.has(
      journal.schemaVersion
    ) ||
    !JOURNAL_STATUSES.has(journal.status) ||
    !/^[a-f0-9]{64}$/.test(
      journal.startedManifestSourceSha256 ?? ""
    ) ||
    !/^[a-f0-9]{40,64}$/.test(
      journal.startedCommit ?? ""
    ) ||
    !/^[a-f0-9]{64}$/.test(
      journal.startedInvariantSha256 ?? ""
    ) ||
    !/^[a-f0-9]{64}$/.test(
      journal.attemptId ?? ""
    ) ||
    typeof journal.startedAt !== "string" ||
    !Number.isFinite(Date.parse(journal.startedAt)) ||
    journal.packageSetSha256 !== expectedPackageSet ||
    JSON.stringify(journal.order) !== expectedOrder ||
    journal.destination?.bucket !==
      destination.bucket ||
    journal.destination?.region !==
      destination.region ||
    journal.destination?.profile !==
      destination.profile ||
    !Array.isArray(completed) ||
    !VALIDATION_STATUSES.has(
      journal.validation?.status
    ) ||
    journal.validation?.command !==
      RESTORE_ALL_OFFLINE_VALIDATION_COMMAND ||
    (
      journal.schemaVersion ===
        RESTORE_ALL_JOURNAL_SCHEMA_VERSION &&
      !archivedRestoreEntryIsValid(
        journal.previousCompletedAttempt,
        destination,
        order.length
      )
    );
  if (structurallyInvalid) {
    throw new Error(
      "RESTORE_ALL_JOURNAL_INVALID"
    );
  }
  const completedIds = completed.map(
    (entry) => entry.packageId
  );
  if (
    new Set(completedIds).size !== completedIds.length ||
    completedIds.some(
      (packageId, index) =>
        packageId !== order[index]
    )
  ) {
    throw new Error(
      "RESTORE_ALL_JOURNAL_COMPLETION_ORDER_INVALID"
    );
  }
  for (const entry of completed) {
    const packageRecord = packageById(
      manifest,
      entry.packageId
    );
    if (
      entry.restoredVersionId !==
        packageRecord.remote.s3.versionId ||
      entry.restoredSha256 !==
        packageRecord.plannedObject.expectedSha256 ||
      entry.restoredSizeBytes !==
        packageRecord.plannedObject.expectedSizeBytes ||
      entry.proof?.restoredVersionId !==
        packageRecord.remote.s3.versionId ||
      entry.proof?.restoredSha256 !==
        packageRecord.plannedObject.expectedSha256 ||
      entry.proof?.restoredSizeBytes !==
        packageRecord.plannedObject.expectedSizeBytes ||
      typeof entry.completedAt !== "string" ||
      !Number.isFinite(Date.parse(entry.completedAt)) ||
      !entry.localIdentity ||
      typeof entry.disposition !== "string" ||
      !entry.disposition
    ) {
      throw new Error(
        `RESTORE_ALL_JOURNAL_REMOTE_IDENTITY_MISMATCH: ${entry.packageId}`
      );
    }
  }
  const nextPackageId =
    order[completedIds.length] ?? null;
  if (
    journal.pendingPackageId !== null &&
    journal.pendingPackageId !== nextPackageId
  ) {
    throw new Error(
      "RESTORE_ALL_JOURNAL_PENDING_PACKAGE_INVALID"
    );
  }
  if (
    journal.status === "COMPLETE" &&
    (completed.length !== order.length ||
      journal.pendingPackageId !== null ||
      typeof journal.completedAt !== "string" ||
      !Number.isFinite(
        Date.parse(journal.completedAt)
      ))
  ) {
    throw new Error(
      "RESTORE_ALL_JOURNAL_PREMATURE_COMPLETION"
    );
  }
  const validation = journal.validation;
  if (
    validation.status === "NOT_REQUESTED" &&
    (
      validation.startedAt !== null ||
      validation.completedAt !== null ||
      validation.exitCode !== null ||
      validation.stdoutSha256 !== null ||
      validation.stderrSha256 !== null
    )
  ) {
    throw new Error(
      "RESTORE_ALL_JOURNAL_VALIDATION_STATE_INVALID"
    );
  }
  if (
    validation.status === "RUNNING" &&
    (
      typeof validation.startedAt !== "string" ||
      !Number.isFinite(
        Date.parse(validation.startedAt)
      ) ||
      validation.completedAt !== null ||
      validation.exitCode !== null
    )
  ) {
    throw new Error(
      "RESTORE_ALL_JOURNAL_VALIDATION_STATE_INVALID"
    );
  }
  if (
    ["PASSED", "FAILED"].includes(validation.status) &&
    (
      typeof validation.startedAt !== "string" ||
      !Number.isFinite(
        Date.parse(validation.startedAt)
      ) ||
      typeof validation.completedAt !== "string" ||
      !Number.isFinite(
        Date.parse(validation.completedAt)
      ) ||
      !Number.isInteger(validation.exitCode) ||
      !/^[a-f0-9]{64}$/.test(
        validation.stdoutSha256 ?? ""
      ) ||
      !/^[a-f0-9]{64}$/.test(
        validation.stderrSha256 ?? ""
      ) ||
      (
        validation.status === "PASSED" &&
        validation.exitCode !== 0
      ) ||
      (
        validation.status === "FAILED" &&
        validation.exitCode === 0
      )
    )
  ) {
    throw new Error(
      "RESTORE_ALL_JOURNAL_VALIDATION_STATE_INVALID"
    );
  }
  if (completedRestoreWasCleaned(manifest, journal)) {
    return null;
  }
  if (
    restoreInvariantSha256(manifest) !==
    journal.startedInvariantSha256
  ) {
    throw new Error(
      "RESTORE_ALL_JOURNAL_INVARIANT_CHANGED"
    );
  }
  return journal;
}

function archivedRestoreJournalEntry(journal) {
  return {
    schemaVersion:
      RESTORE_ALL_HISTORY_ENTRY_SCHEMA_VERSION,
    attemptId: journal.attemptId,
    status: journal.status,
    startedAt: journal.startedAt,
    completedAt: journal.completedAt,
    startedCommit: journal.startedCommit,
    startedManifestSourceSha256:
      journal.startedManifestSourceSha256,
    startedInvariantSha256:
      journal.startedInvariantSha256,
    packageSetSha256: journal.packageSetSha256,
    packageCount: journal.completedPackages.length,
    destination: structuredClone(journal.destination),
    validation: structuredClone(journal.validation),
    journalContentSha256:
      sha256CanonicalJson(journal)
  };
}

async function manifestHeadCommit(repoRoot, gitRunner) {
  return successfulGitOutput(
    await gitRunner(repoRoot, ["rev-parse", "HEAD"]),
    "RESTORE_GIT_HEAD"
  ).trim();
}

function relativeManifestPath(repoRoot, manifestPath) {
  const candidate = relative(
    resolve(repoRoot),
    resolve(manifestPath)
  )
    .split(sep)
    .join("/");
  if (
    !candidate ||
    candidate === ".." ||
    candidate.startsWith("../") ||
    candidate.includes(":") ||
    candidate.includes("\n")
  ) {
    throw new Error(
      "RESTORE_MANIFEST_OUTSIDE_REPOSITORY"
    );
  }
  return candidate;
}

async function assertRestartCheckpointSafe({
  repoRoot,
  manifestPath,
  manifest,
  journal,
  gitRunner
}) {
  const relativePath = relativeManifestPath(
    repoRoot,
    manifestPath
  );
  const head = await manifestHeadCommit(
    repoRoot,
    gitRunner
  );
  if (head !== journal.startedCommit) {
    throw new Error(
      "RESTORE_ALL_RESUME_COMMIT_CHANGED"
    );
  }
  for (const args of [
    ["ls-files", "--error-unmatch", "--", relativePath],
    ["diff", "--cached", "--quiet", "--", relativePath]
  ]) {
    const result = await gitRunner(repoRoot, args);
    if (result.exitCode !== 0) {
      throw new Error(
        "RESTORE_ALL_RESUME_MANIFEST_INDEX_CHANGED"
      );
    }
  }
  const committedSource = successfulGitOutput(
    await gitRunner(repoRoot, [
      "show",
      `${journal.startedCommit}:${relativePath}`
    ]),
    "RESTORE_ALL_BASELINE_MANIFEST"
  );
  if (
    manifestSourceSha256(committedSource) !==
    journal.startedManifestSourceSha256
  ) {
    throw new Error(
      "RESTORE_ALL_RESUME_BASELINE_MANIFEST_CHANGED"
    );
  }
  let committedManifest;
  try {
    committedManifest = JSON.parse(committedSource);
  } catch {
    throw new Error(
      "RESTORE_ALL_BASELINE_MANIFEST_INVALID_JSON"
    );
  }
  validateManifestDigest(committedManifest);
  if (
    restoreInvariantSha256(committedManifest) !==
      journal.startedInvariantSha256 ||
    packageSetSha256(committedManifest) !==
      journal.packageSetSha256
  ) {
    throw new Error(
      "RESTORE_ALL_RESUME_BASELINE_INVARIANT_MISMATCH"
    );
  }
  return { headCommit: head, relativePath };
}

export async function assertRestoreAllManifestMayProceed({
  repoRoot,
  manifestPath,
  manifest,
  destination,
  gitRunner = defaultGitRunner,
  assertCleanManifest =
    assertManifestCleanCommitted
}) {
  validateManifestDigest(manifest);
  const validated =
    validateResearchDestination(destination);
  const order = packageHydrationOrder(manifest);
  const journal = validateJournal({
    manifest,
    destination: validated,
    order
  });
  if (!journal) {
    await assertCleanManifest({
      repoRoot,
      manifestPath,
      gitRunner
    });
    return {
      mode: "NEW",
      headCommit: await manifestHeadCommit(
        repoRoot,
        gitRunner
      ),
      order,
      journal: null
    };
  }
  await assertRestartCheckpointSafe({
    repoRoot,
    manifestPath,
    manifest,
    journal,
    gitRunner
  });
  return {
    mode: "RESUME",
    headCommit: journal.startedCommit,
    order,
    journal
  };
}

export async function planRestoreAllPackages({
  repoRoot,
  manifest,
  destination,
  verifyExistingPackage =
    verifyExistingLocalPackage
}) {
  validateManifestDigest(manifest);
  const validated =
    validateResearchDestination(destination);
  exactVerifiedRemoteRecords(manifest, validated);
  const order = packageHydrationOrder(manifest);
  const journal = validateJournal({
    manifest,
    destination: validated,
    order
  });
  const completed = completedPackageMap(journal);
  const steps = [];
  for (const packageId of order) {
    const packageRecord = packageById(
      manifest,
      packageId
    );
    const targetPath = safePackagePath(
      repoRoot,
      packageRecord
    );
    const state = await pathState(targetPath);
    const isCompleted = completed.has(packageId);
    const isPending =
      journal?.pendingPackageId === packageId;
    let disposition;
    let localIdentity = null;
    let blocker = null;
    if (
      packageRecord.localRetentionPolicy ===
      SOURCE_CONTROLLED_RETENTION_POLICY
    ) {
      localIdentity = await verifyExistingPackage({
        repoRoot,
        manifest,
        packageRecord
      });
      disposition =
        "VERIFY_SOURCE_CONTROLLED_FIXTURE_AND_EXACT_S3_VERSION";
    } else if (isLogicalChild(packageRecord)) {
      disposition = isCompleted
        ? "VERIFY_COMPLETED_DEPENDENCY_CHILD"
        : "VERIFY_AFTER_PARENT_HYDRATION";
      if (isCompleted) {
        localIdentity = await verifyExistingPackage({
          repoRoot,
          manifest,
          packageRecord
        });
      }
    } else if (!state.exists) {
      if (isCompleted) {
        blocker =
          "A checkpointed root package is missing locally.";
      }
      disposition = blocker
        ? "BLOCKED_CHECKPOINT_TARGET_MISSING"
        : isPending
          ? "RESTORE_PENDING_ABSENT_PACKAGE"
          : "RESTORE_ABSENT_PACKAGE";
    } else if (isCompleted || isPending) {
      localIdentity = await verifyExistingPackage({
        repoRoot,
        manifest,
        packageRecord
      });
      disposition = isCompleted
        ? "VERIFY_COMPLETED_RESTORED_PACKAGE"
        : "RECOVER_PENDING_RESTORED_PACKAGE";
    } else if (
      mayAdoptVerifiedRetainedPackage(
        manifest,
        packageRecord
      )
    ) {
      localIdentity = await verifyExistingPackage({
        repoRoot,
        manifest,
        packageRecord
      });
      disposition =
        "VERIFY_RETAINED_PACKAGE_AND_EXACT_S3_VERSION";
    } else {
      disposition = "BLOCKED_EXISTING_TARGET";
      blocker =
        "The target already exists and restore-all never overwrites an uncheckpointed cache or repository package.";
    }
    steps.push({
      index: steps.length,
      packageId,
      packageType: packageRecord.packageType,
      parentPackageId:
        packageDependency(packageRecord),
      localPath: packageRecord.localPath,
      remote: {
        bucket:
          packageRecord.remote.s3.bucket,
        key: packageRecord.remote.s3.key,
        versionId:
          packageRecord.remote.s3.versionId,
        sha256:
          packageRecord.plannedObject.expectedSha256,
        sizeBytes:
          packageRecord.plannedObject.expectedSizeBytes
      },
      disposition,
      localIdentity,
      blocker
    });
  }
  const blocked = steps.filter((step) => step.blocker);
  return {
    dryRun: true,
    operation: "restore-all",
    packageCount: steps.length,
    dependencyOrder: order,
    steps,
    blockedCount: blocked.length,
    blockedPackageIds: blocked.map(
      (step) => step.packageId
    ),
    wouldCallAws: true,
    wouldDeleteLocal: false,
    wouldOverwrite: false,
    restartMode: journal ? "RESUME" : "NEW",
    offlineValidationCommand:
      RESTORE_ALL_OFFLINE_VALIDATION_COMMAND
  };
}

async function mapWithConcurrency(
  values,
  limit,
  operation
) {
  const results = new Array(values.length);
  let nextIndex = 0;
  async function worker() {
    while (true) {
      const index = nextIndex;
      nextIndex += 1;
      if (index >= values.length) return;
      results[index] = await operation(
        values[index],
        index
      );
    }
  }
  await Promise.all(
    Array.from(
      {
        length: Math.min(limit, values.length)
      },
      () => worker()
    )
  );
  return results;
}

async function preflightEveryRemoteVersion({
  manifest,
  order,
  destination,
  runner,
  readRemote = readRemoteObject
}) {
  return mapWithConcurrency(
    order,
    8,
    async (packageId) => {
      const packageRecord = packageById(
        manifest,
        packageId
      );
      const remote = await readRemote(
        destination,
        packageRecord.plannedObject.key,
        {
          runner,
          versionId:
            packageRecord.remote.s3.versionId
        }
      );
      const verified = verifyRemoteObject(remote, {
        sizeBytes:
          packageRecord.plannedObject.expectedSizeBytes,
        sha256:
          packageRecord.plannedObject.expectedSha256,
        contentType:
          packageRecord.plannedObject.contentType
      });
      if (
        verified.versionId !==
        packageRecord.remote.s3.versionId
      ) {
        throw new Error(
          `RESTORE_REMOTE_VERSION_MISMATCH: ${packageId}`
        );
      }
      return {
        packageId,
        versionId: verified.versionId,
        sha256: verified.metadataSha256,
        sizeBytes: verified.contentLength
      };
    }
  );
}

function invalidateCleanupAfterHydration({
  manifest,
  packageRecord,
  result
}) {
  packageRecord.hydration =
    buildPackageHydrationRecord({
      packageRecord,
      result
    });
  if (
    packageRecord.hydration
      .materializedCleanupActionTypes.length > 0
  ) {
    packageRecord.remote.s3.deletionStatus =
      "LOCAL_RETAINED";
    packageRecord.remote.s3.localDeletedAt = null;
  }
  Object.assign(packageRecord.cleanupEligibility, {
    status: "BLOCKED",
    activeConsumerPaths: [
      `hydrated:${packageRecord.localPath}`
    ],
    validationCommand: null,
    validationStatus: "NOT_RUN",
    validatedAt: null,
    validatedSourceCommit: null,
    validatedRepositoryTreeDigest: null,
    blocker:
      "Hydration recreated or verified local research input. Run final validation again and explicitly confirm no active consumers before any later cleanup."
  });
  invalidateExecutionReceiptsAfterHydration({
    manifest,
    packageId: packageRecord.packageId,
    hydratedAt: result.restoredAt
  });
  manifest.execution.lastHydration = {
    packageId: packageRecord.packageId,
    ...packageRecord.hydration
  };
}

function createJournal({
  manifest,
  sourceSha256,
  headCommit,
  destination,
  order,
  previousJournal = null,
  now
}) {
  const startedAt = now();
  return {
    schemaVersion:
      RESTORE_ALL_JOURNAL_SCHEMA_VERSION,
    status: "IN_PROGRESS",
    attemptId: sha256Bytes(
      [
        sourceSha256,
        headCommit,
        destination.bucket,
        startedAt
      ].join("\n")
    ),
    startedAt,
    completedAt: null,
    startedManifestSourceSha256: sourceSha256,
    startedCommit: headCommit,
    startedInvariantSha256:
      restoreInvariantSha256(manifest),
    packageSetSha256: packageSetSha256(manifest),
    destination: {
      profile: destination.profile,
      bucket: destination.bucket,
      region: destination.region
    },
    previousCompletedAttempt: previousJournal
      ? archivedRestoreJournalEntry(previousJournal)
      : null,
    order,
    pendingPackageId: null,
    completedPackages: [],
    remotePreflight: null,
    validation: {
      status: "NOT_REQUESTED",
      command:
        RESTORE_ALL_OFFLINE_VALIDATION_COMMAND,
      startedAt: null,
      completedAt: null,
      exitCode: null,
      stdoutSha256: null,
      stderrSha256: null
    }
  };
}

function completionRecord({
  packageRecord,
  disposition,
  proof,
  localIdentity,
  now
}) {
  return {
    packageId: packageRecord.packageId,
    disposition,
    restoredVersionId:
      packageRecord.remote.s3.versionId,
    restoredSha256:
      packageRecord.plannedObject.expectedSha256,
    restoredSizeBytes:
      packageRecord.plannedObject.expectedSizeBytes,
    proof,
    localIdentity,
    completedAt: now()
  };
}

function assertRestoreProofMatches(
  packageRecord,
  proof
) {
  if (
    proof?.restoredVersionId !==
      packageRecord.remote.s3.versionId ||
    proof?.restoredSha256 !==
      packageRecord.plannedObject.expectedSha256 ||
    proof?.restoredSizeBytes !==
      packageRecord.plannedObject.expectedSizeBytes ||
    typeof proof?.restoredAt !== "string" ||
    !Number.isFinite(Date.parse(proof.restoredAt))
  ) {
    throw new Error(
      `RESTORE_PACKAGE_PROOF_MISMATCH: ${packageRecord.packageId}`
    );
  }
  return proof;
}

function assertSourceFixtureIdentity(
  packageRecord,
  localIdentity
) {
  if (
    localIdentity?.sha256 !==
      packageRecord.plannedObject.expectedSha256 ||
    localIdentity?.sizeBytes !==
      packageRecord.plannedObject.expectedSizeBytes
  ) {
    throw new Error(
      `RESTORE_SOURCE_FIXTURE_LOCAL_IDENTITY_MISMATCH: ${packageRecord.packageId}`
    );
  }
  return localIdentity;
}

async function checkpointMutation({
  manifestPath,
  manifest,
  checkpointState,
  checkpointManifest,
  mutate
}) {
  mutate();
  const result = await checkpointManifest({
    manifestPath,
    manifest,
    expectedSourceSha256:
      checkpointState.sourceSha256
  });
  checkpointState.sourceSha256 =
    result.sourceSha256;
  return result;
}

async function verifyCompletedTargets({
  repoRoot,
  manifest,
  journal,
  verifyExistingPackage
}) {
  for (const entry of journal.completedPackages) {
    const packageRecord = packageById(
      manifest,
      entry.packageId
    );
    await verifyExistingPackage({
      repoRoot,
      manifest,
      packageRecord
    });
  }
}

async function runCheckedOfflineValidation({
  repoRoot,
  manifestPath,
  manifest,
  journal,
  checkpointState,
  checkpointManifest,
  validationRunner,
  now
}) {
  if (journal.validation.status === "PASSED") {
    return journal.validation;
  }
  await checkpointMutation({
    manifestPath,
    manifest,
    checkpointState,
    checkpointManifest,
    mutate: () => {
      journal.validation = {
        status: "RUNNING",
        command:
          RESTORE_ALL_OFFLINE_VALIDATION_COMMAND,
        startedAt: now(),
        completedAt: null,
        exitCode: null,
        stdoutSha256: null,
        stderrSha256: null
      };
    }
  });
  const result = await validationRunner(
    repoRoot,
    RESTORE_ALL_OFFLINE_VALIDATION_COMMAND
  );
  const completedAt = now();
  await checkpointMutation({
    manifestPath,
    manifest,
    checkpointState,
    checkpointManifest,
    mutate: () => {
      journal.validation = {
        ...journal.validation,
        status:
          result.exitCode === 0 ? "PASSED" : "FAILED",
        completedAt,
        exitCode: result.exitCode,
        stdoutSha256: sha256Bytes(
          result.stdout ?? ""
        ),
        stderrSha256: sha256Bytes(
          result.stderr ?? ""
        )
      };
    }
  });
  if (result.exitCode !== 0) {
    throw new Error(
      `RESTORE_ALL_OFFLINE_VALIDATION_FAILED: ${String(result.stderr ?? "").trim() || `exit ${result.exitCode}`}`
    );
  }
  return journal.validation;
}

export async function restoreAllPackagesCheckpointed({
  repoRoot,
  manifestPath,
  manifest,
  expectedManifestSourceSha256,
  destination,
  runOfflineValidation = false,
  runner,
  gitRunner = defaultGitRunner,
  assertCleanManifest =
    assertManifestCleanCommitted,
  verifyExecutionContext =
    defaultVerifyExecutionContext,
  readRemote = readRemoteObject,
  hydrateOnePackage = hydratePackage,
  proveRemoteVersion =
    proveRemoteVersionRestorable,
  verifyExistingPackage =
    verifyExistingLocalPackage,
  checkpointManifest =
    writeManifestAtomically,
  validationRunner =
    defaultOfflineValidationRunner,
  now = () => new Date().toISOString()
}) {
  validateManifestDigest(manifest);
  const validated =
    validateResearchDestination(destination);
  const start = await assertRestoreAllManifestMayProceed({
    repoRoot,
    manifestPath,
    manifest,
    destination: validated,
    gitRunner,
    assertCleanManifest
  });
  exactVerifiedRemoteRecords(manifest, validated);
  const plan = await planRestoreAllPackages({
    repoRoot,
    manifest,
    destination: validated,
    verifyExistingPackage
  });
  if (plan.blockedCount > 0) {
    throw new Error(
      `RESTORE_ALL_TARGET_PREFLIGHT_BLOCKED: ${plan.blockedPackageIds.join(", ")}`
    );
  }
  const executionContext =
    await verifyExecutionContext(validated, runner);
  const remotePreflight =
    await preflightEveryRemoteVersion({
      manifest,
      order: start.order,
      destination: validated,
      runner,
      readRemote
    });
  const existingPackageProofs = new Map();
  for (const packageId of start.order) {
    const packageRecord = packageById(
      manifest,
      packageId
    );
    const step = plan.steps.find(
      (candidate) =>
        candidate.packageId === packageId
    );
    if (
      packageRecord.localRetentionPolicy !==
        SOURCE_CONTROLLED_RETENTION_POLICY &&
      step?.disposition !==
        "VERIFY_RETAINED_PACKAGE_AND_EXACT_S3_VERSION"
    ) {
      continue;
    }
    const proof = await proveRemoteVersion({
      repoRoot,
      destination: validated,
      packageRecord,
      runner,
      now
    });
    if (
      proof.restoredVersionId !==
        packageRecord.remote.s3.versionId ||
      proof.restoredSha256 !==
        packageRecord.plannedObject.expectedSha256 ||
      proof.restoredSizeBytes !==
        packageRecord.plannedObject.expectedSizeBytes ||
      typeof proof.restoredAt !== "string" ||
      !Number.isFinite(Date.parse(proof.restoredAt))
    ) {
      const errorCode =
        packageRecord.localRetentionPolicy ===
        SOURCE_CONTROLLED_RETENTION_POLICY
          ? "RESTORE_SOURCE_FIXTURE_REMOTE_BYTES_MISMATCH"
          : "RESTORE_RETAINED_PACKAGE_REMOTE_BYTES_MISMATCH";
      throw new Error(
        `${errorCode}: ${packageId}`
      );
    }
    const localIdentity =
      await verifyExistingPackage({
        repoRoot,
        manifest,
        packageRecord
      });
    if (
      packageRecord.localRetentionPolicy ===
      SOURCE_CONTROLLED_RETENTION_POLICY
    ) {
      assertSourceFixtureIdentity(
        packageRecord,
        localIdentity
      );
    }
    existingPackageProofs.set(packageId, proof);
  }
  const checkpointState = {
    sourceSha256:
      expectedManifestSourceSha256 ??
      manifestSourceSha256(
        await readFile(manifestPath, "utf8")
      )
  };
  manifest.execution ??= {};
  let journal = start.journal;
  if (!journal) {
    const previousJournal =
      manifest.execution.restoreAllJournal ?? null;
    if (
      previousJournal &&
      !completedRestoreWasCleaned(
        manifest,
        previousJournal
      )
    ) {
      throw new Error(
        "RESTORE_ALL_COMPLETED_JOURNAL_NOT_SUPERSEDED"
      );
    }
    journal = createJournal({
      manifest,
      sourceSha256: checkpointState.sourceSha256,
      headCommit: start.headCommit,
      destination: validated,
      order: start.order,
      previousJournal,
      now
    });
    await checkpointMutation({
      manifestPath,
      manifest,
      checkpointState,
      checkpointManifest,
      mutate: () => {
        manifest.execution.restoreAllJournal =
          journal;
        journal.remotePreflight = {
          status:
            "EVERY_EXACT_VERSION_HEAD_VERIFIED",
          verifiedAt: now(),
          packageCount:
            remotePreflight.length,
          identity:
            executionContext.identity
        };
      }
    });
  } else {
    await verifyCompletedTargets({
      repoRoot,
      manifest,
      journal,
      verifyExistingPackage
    });
    await checkpointMutation({
      manifestPath,
      manifest,
      checkpointState,
      checkpointManifest,
      mutate: () => {
        journal.remotePreflight = {
          status:
            "EVERY_EXACT_VERSION_HEAD_VERIFIED",
          verifiedAt: now(),
          packageCount:
            remotePreflight.length,
          identity:
            executionContext.identity
        };
      }
    });
  }
  const completed = completedPackageMap(journal);
  const planById = new Map(
    plan.steps.map((step) => [
      step.packageId,
      step
    ])
  );
  for (const packageId of start.order) {
    if (completed.has(packageId)) continue;
    const packageRecord = packageById(
      manifest,
      packageId
    );
    const step = planById.get(packageId);
    if (journal.pendingPackageId === null) {
      await checkpointMutation({
        manifestPath,
        manifest,
        checkpointState,
        checkpointManifest,
        mutate: () => {
          journal.pendingPackageId = packageId;
        }
      });
    } else if (
      journal.pendingPackageId !== packageId
    ) {
      throw new Error(
        `RESTORE_ALL_PENDING_PACKAGE_MISMATCH: expected ${packageId}, received ${journal.pendingPackageId}`
      );
    }
    let disposition;
    let proof;
    let localIdentity = null;
    if (
      packageRecord.localRetentionPolicy ===
      SOURCE_CONTROLLED_RETENTION_POLICY
    ) {
      localIdentity =
        await verifyExistingPackage({
          repoRoot,
          manifest,
          packageRecord
        });
      assertSourceFixtureIdentity(
        packageRecord,
        localIdentity
      );
      proof = existingPackageProofs.get(packageId);
      disposition =
        "SOURCE_CONTROLLED_FIXTURE_AND_REMOTE_BYTES_VERIFIED";
      invalidateCleanupAfterHydration({
        manifest,
        packageRecord,
        result: {
          ...proof,
          hydrationMode:
            "VERIFIED_EXISTING_SOURCE_CONTROLLED_FIXTURE",
          localPaths: [packageRecord.localPath]
        }
      });
    } else if (
      step.disposition ===
      "VERIFY_RETAINED_PACKAGE_AND_EXACT_S3_VERSION"
    ) {
      localIdentity =
        await verifyExistingPackage({
          repoRoot,
          manifest,
          packageRecord
        });
      proof = existingPackageProofs.get(packageId);
      disposition =
        "RETAINED_PACKAGE_AND_REMOTE_BYTES_VERIFIED";
      invalidateCleanupAfterHydration({
        manifest,
        packageRecord,
        result: {
          ...proof,
          hydrationMode:
            "VERIFIED_EXISTING_RETAINED_PACKAGE",
          localPaths: [packageRecord.localPath]
        }
      });
    } else if (
      step.disposition ===
      "RECOVER_PENDING_RESTORED_PACKAGE"
    ) {
      localIdentity =
        await verifyExistingPackage({
          repoRoot,
          manifest,
          packageRecord
        });
      proof = await proveRemoteVersion({
        repoRoot,
        destination: validated,
        packageRecord,
        runner,
        now
      });
      disposition =
        "RECOVERED_CHECKPOINTED_PACKAGE_AFTER_EXACT_VERIFICATION";
      invalidateCleanupAfterHydration({
        manifest,
        packageRecord,
        result: {
          ...proof,
          hydrationMode:
            "RECOVERED_EXISTING_CHECKPOINT_TARGET",
          localPaths: [packageRecord.localPath]
        }
      });
    } else {
      const result = await hydrateOnePackage({
        repoRoot,
        manifest,
        packageId,
        destination: validated,
        runner,
        executionContext,
        now
      });
      proof = {
        restoredVersionId:
          result.restoredVersionId,
        restoredSha256:
          result.restoredSha256,
        restoredSizeBytes:
          result.restoredSizeBytes,
        restoredAt: result.restoredAt
      };
      disposition = result.disposition;
      localIdentity = await verifyExistingPackage({
        repoRoot,
        manifest,
        packageRecord
      });
    }
    assertRestoreProofMatches(
      packageRecord,
      proof
    );
    const completion = completionRecord({
      packageRecord,
      disposition,
      proof,
      localIdentity,
      now
    });
    await checkpointMutation({
      manifestPath,
      manifest,
      checkpointState,
      checkpointManifest,
      mutate: () => {
        journal.completedPackages.push(
          completion
        );
        journal.pendingPackageId = null;
      }
    });
    completed.set(packageId, completion);
  }
  if (journal.status !== "COMPLETE") {
    await checkpointMutation({
      manifestPath,
      manifest,
      checkpointState,
      checkpointManifest,
      mutate: () => {
        journal.status = "COMPLETE";
        journal.completedAt = now();
      }
    });
  }
  let validation = journal.validation;
  if (runOfflineValidation) {
    validation = await runCheckedOfflineValidation({
      repoRoot,
      manifestPath,
      manifest,
      journal,
      checkpointState,
      checkpointManifest,
      validationRunner,
      now
    });
  }
  return {
    disposition:
      "ALL_PACKAGES_RESTORED_AND_VERIFIED_IN_DEPENDENCY_ORDER",
    packageCount:
      journal.completedPackages.length,
    order: start.order,
    restartMode: start.mode,
    remotePreflight:
      journal.remotePreflight,
    validation,
    nextCommand:
      validation.status === "PASSED"
        ? null
        : RESTORE_ALL_OFFLINE_VALIDATION_COMMAND,
    manifestCheckpointSha256:
      checkpointState.sourceSha256
  };
}
