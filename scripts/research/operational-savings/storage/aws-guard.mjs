import { createHash } from "node:crypto";
import { execFile, spawn } from "node:child_process";
import {
  copyFile,
  lstat,
  link,
  mkdir,
  mkdtemp,
  open,
  readFile,
  readdir,
  realpath,
  rename,
  rm,
  unlink,
  writeFile
} from "node:fs/promises";
import { constants as fsConstants } from "node:fs";
import {
  basename,
  dirname,
  isAbsolute,
  join,
  relative,
  resolve,
  sep
} from "node:path";
import { tmpdir } from "node:os";
import { promisify } from "node:util";

import {
  buildProofLedger,
  validateProofLedger
} from "../proof-ledger.mjs";
import {
  CACHE_RELATIVE_PATH,
  DEFAULT_MANIFEST_RELATIVE_PATH,
  DEFAULT_REPORT_RELATIVE_PATH,
  LOCAL_ARTIFACT_AUDIT_RELATIVE_PATH,
  OUTSIDE_CACHE_MIGRATION_SPECS,
  STORAGE_SCHEMA_VERSION,
  gitRepositoryIdentity,
  inheritedAuditRecord,
  loadLocalArtifactAudit,
  readArchiveMember,
  sha256CanonicalJson,
  sha256Path
} from "./inventory.mjs";
import {
  AUDITED_DIRECTORY_TREE_DIGEST_SCHEMA_VERSION,
  assertLocalArtifactAuditFresh,
  assertLocalArtifactAuditWorktree,
  auditedDirectoryTreeIdentity
} from "./local-audit-freshness.mjs";
import {
  FULL_OFFLINE_RESEARCH_VALIDATION_COMMAND,
  runFullOfflineResearchValidation
} from "./validation-commands.mjs";
import {
  FIXED_GIT_PATH,
  awsSubprocessEnvironment,
  dockerSubprocessEnvironment,
  gitSubprocessEnvironment,
  nodeSubprocessEnvironment,
  verifiedAwsCliPath,
  verifiedDockerCliPath,
  verifiedNodeExecutablePath
} from "../lib/subprocess-environment.mjs";
import {
  ECR_LOCAL_CLEANUP_COMPLETE_STATUS,
  EXECUTABLE_IMAGE_MANIFEST_MEDIA_TYPES,
  OCI_IMAGE_INDEX_MEDIA_TYPE,
  assertCurrentEcrRestoreReceipt,
  assertEcrBuildEvidence,
  ecrEvidenceDigest
} from "./ecr-evidence.mjs";
import {
  assertLivePostHocReplayReceipt
} from "./post-hoc-replay.mjs";

const execFileAsync = promisify(execFile);

export const RESEARCH_AWS_PROFILE =
  "retrofi-operational-savings-research";
export const RESEARCH_AWS_ACCOUNT_ID = "945129430686";
export const RESEARCH_AWS_REGION = "us-east-1";
export const RESEARCH_S3_BUCKET =
  "retrofi-operational-savings-research-945129430686-us-east-1";
export const FINAL_CLEANUP_VALIDATION_COMMAND =
  FULL_OFFLINE_RESEARCH_VALIDATION_COMMAND;
export const RESEARCH_ROLE_ARN_PATTERN =
  /^arn:aws:sts::945129430686:assumed-role\/RetroFiOperationalSavingsResearchRole\/[^/]+$/;

const FORBIDDEN_PROFILES = new Set([
  "default",
  "gbs",
  "retrofi-management",
  "retrofi-prod"
]);
const ALLOWED_OBJECT_KEY_PREFIXES = Object.freeze([
  "database-exports/",
  "licenses/",
  "manifests/",
  "manual-exports/",
  "model-assets/",
  "model-inputs/",
  "model-outputs/",
  "normalized/",
  "raw/",
  "temporary/"
]);
const AUDITED_SHARED_BUILDKIT_URI =
  "docker-buildkit://default";
const AUDITED_DOCKER_IMAGE_PREFIX = "docker-image://";
const AUDITED_LOCAL_DELETED_STATUS =
  "LOCAL_DELETED_AFTER_VERIFICATION";
const PARENT_REPOSITORY_OWNED_RETENTION_POLICY =
  "DELETE_WITH_PARENT_REPOSITORY";
const PARENT_REPOSITORY_DELETED_STATUS =
  "LOCAL_DELETED_WITH_PARENT_REPOSITORY";
const AUDITED_DOCKER_REMOVED_STATUS =
  "LOCAL_IMAGE_REMOVED_AFTER_ECR_VERIFICATION";
const AUDITED_BUILDKIT_RETAINED_STATUS =
  "LOCAL_RETAINED_SHARED_BUILDKIT_NO_BROAD_PRUNE";
const AUDITED_COMPLETED_STATUSES = new Set([
  AUDITED_LOCAL_DELETED_STATUS,
  AUDITED_DOCKER_REMOVED_STATUS,
  AUDITED_BUILDKIT_RETAINED_STATUS
]);
const LOCAL_CLEANUP_JOURNAL_SCHEMA_VERSION =
  "operational-savings/local-cleanup-journal-v1";
const PENDING_CLEANUP_RECOVERY_ALLOWED_COMMITTED_PATHS =
  new Set([
    DEFAULT_MANIFEST_RELATIVE_PATH,
    DEFAULT_REPORT_RELATIVE_PATH,
    "scripts/research/operational-savings/storage/aws-guard.mjs",
    "scripts/research/operational-savings/storage/research-storage.mjs",
    "scripts/research/operational-savings/tests/research-storage.test.mjs"
  ]);
const DEFAULT_AUDITED_TEMP_ROOTS = Object.freeze([
  "/private/tmp",
  tmpdir()
]);
const ECR_REPLAY_SPECS = Object.freeze([
  Object.freeze({
    modelId: "reopt",
    repositoryName: "retrofi-research-reopt",
    environmentKey: "REOPT_IMAGE",
    verifierRelativePaths: Object.freeze([
      "scripts/research/operational-savings/containers/reopt/verify.mjs",
      "scripts/research/operational-savings/containers/reopt/verify-solar-storage.mjs"
    ])
  }),
  Object.freeze({
    modelId: "ssc",
    repositoryName: "retrofi-research-ssc",
    environmentKey: "SSC_IMAGE",
    verifierRelativePaths: Object.freeze([
      "scripts/research/operational-savings/containers/ssc/verify.mjs"
    ])
  }),
  Object.freeze({
    modelId: "measur",
    repositoryName: "retrofi-research-measur",
    environmentKey: "MEASUR_IMAGE",
    verifierRelativePaths: Object.freeze([
      "scripts/research/operational-savings/containers/measur/verify.mjs"
    ])
  }),
  Object.freeze({
    modelId: "scout",
    repositoryName: "retrofi-research-scout",
    environmentKey: "SCOUT_IMAGE",
    verifierRelativePaths: Object.freeze([
      "scripts/research/operational-savings/containers/scout/verify.mjs"
    ])
  })
]);

export function sanitizedAwsEnvironment(environment = process.env) {
  return awsSubprocessEnvironment(environment);
}

function stableManifestDigest(manifest) {
  const copy = structuredClone(manifest);
  delete copy.manifestContentSha256;
  return sha256CanonicalJson(
    JSON.parse(JSON.stringify(copy))
  );
}

export function invalidateExecutionReceiptsAfterHydration({
  manifest,
  packageId,
  hydratedAt
}) {
  const invalidatedBy = {
    packageId,
    hydratedAt
  };
  if (manifest.execution.finalCleanupValidation) {
    manifest.execution.finalCleanupValidation.status =
      "INVALIDATED_BY_HYDRATION";
    manifest.execution.finalCleanupValidation.invalidatedBy =
      structuredClone(invalidatedBy);
  }
  if (manifest.execution.lastEcrRestoreReplay) {
    manifest.execution.lastEcrRestoreReplay.status =
      "INVALIDATED_BY_HYDRATION";
    manifest.execution.lastEcrRestoreReplay.invalidatedBy =
      structuredClone(invalidatedBy);
  }
}

export function validateManifestDigest(manifest) {
  if (
    !manifest ||
    manifest.schemaVersion !== STORAGE_SCHEMA_VERSION ||
    !Array.isArray(manifest.packages)
  ) {
    throw new Error(
      `MANIFEST_SCHEMA_MISMATCH: expected ${STORAGE_SCHEMA_VERSION}`
    );
  }
  const packageIds = manifest.packages.map(
    (entry) => entry.packageId
  );
  if (
    packageIds.some(
      (packageId) =>
        typeof packageId !== "string" || !packageId.trim()
    ) ||
    new Set(packageIds).size !== packageIds.length
  ) {
    throw new Error(
      "MANIFEST_PACKAGE_IDENTITIES_INVALID: package IDs must be unique non-empty strings"
    );
  }
  const packagesById = new Map(
    manifest.packages.map((entry) => [entry.packageId, entry])
  );
  for (const packageRecord of manifest.packages) {
    if (
      packageRecord.localRetentionPolicy !==
      PARENT_REPOSITORY_OWNED_RETENTION_POLICY
    ) {
      continue;
    }
    const parent = packagesById.get(
      packageRecord.parentPackageId
    );
    if (
      packageRecord.packageType !==
        "REPOSITORY_LICENSE_ARTIFACT" ||
      packageRecord.coverage?.mode !==
        "DUPLICATE_CHILD_OBJECT" ||
      packageRecord.localLifecycle?.ownerPackageId !==
        packageRecord.parentPackageId ||
      !parent ||
      parent.packageType !== "PINNED_GIT_REPOSITORY" ||
      typeof packageRecord.localPath !== "string" ||
      !packageRecord.localPath.startsWith(
        `${parent.localPath}/`
      )
    ) {
      throw new Error(
        `MANIFEST_PARENT_OWNED_PACKAGE_INVALID: ${packageRecord.packageId}`
      );
    }
  }
  for (const packageRecord of manifest.packages) {
    if (
      packageRecord.packageType !==
      "EMBEDDED_LICENSE_ARTIFACT"
    ) {
      continue;
    }
    const parent = packagesById.get(
      packageRecord.parentPackageId
    );
    const extractionPlan =
      packageRecord.plannedObject?.extractionPlan;
    if (
      !parent ||
      parent.packageId === packageRecord.packageId ||
      packageRecord.coverage?.mode !==
        "DUPLICATE_CHILD_OBJECT" ||
      packageRecord.localLifecycle?.ownerPackageId !==
        parent.packageId ||
      packageRecord.localPath !== parent.localPath ||
      packageRecord.embeddedMember?.parentPackageId !==
        parent.packageId ||
      packageRecord.embeddedMember?.parentLocalPath !==
        parent.localPath ||
      packageRecord.embeddedMember?.parentExpectedSha256 !==
        parent.plannedObject?.expectedSha256 ||
      extractionPlan?.parentPackageId !== parent.packageId ||
      extractionPlan?.parentLocalPath !== parent.localPath ||
      extractionPlan?.parentExpectedSha256 !==
        parent.plannedObject?.expectedSha256 ||
      extractionPlan?.memberPath !==
        packageRecord.embeddedMember?.memberPath ||
      extractionPlan?.archiveFormat !==
        packageRecord.embeddedMember?.archiveFormat ||
      typeof packageRecord.plannedObject?.localFilePath !==
        "string" ||
      !packageRecord.plannedObject.localFilePath.startsWith(
        `${CACHE_RELATIVE_PATH}/migration-staging/embedded-licenses/`
      )
    ) {
      throw new Error(
        `MANIFEST_EMBEDDED_LICENSE_PACKAGE_INVALID: ${packageRecord.packageId}`
      );
    }
  }
  if (
    typeof manifest.manifestContentSha256 !== "string" ||
    manifest.manifestContentSha256 !== stableManifestDigest(manifest)
  ) {
    throw new Error(
      "MANIFEST_DIGEST_MISMATCH: regenerate or review the migration manifest before execution"
    );
  }
  return manifest;
}

export function validateResearchDestination({
  profile,
  bucket,
  region
}) {
  if (!profile) {
    throw new Error(
      "RESEARCH_PROFILE_REQUIRED: provide --profile retrofi-operational-savings-research"
    );
  }
  if (FORBIDDEN_PROFILES.has(profile) || profile !== RESEARCH_AWS_PROFILE) {
    throw new Error(
      `UNSAFE_AWS_PROFILE: only ${RESEARCH_AWS_PROFILE} is allowed`
    );
  }
  if (!bucket || bucket !== RESEARCH_S3_BUCKET) {
    throw new Error(
      `UNSAFE_S3_BUCKET: only ${RESEARCH_S3_BUCKET} is allowed`
    );
  }
  if (!region || region !== RESEARCH_AWS_REGION) {
    throw new Error(
      `UNSAFE_AWS_REGION: only ${RESEARCH_AWS_REGION} is allowed`
    );
  }
  return { profile, bucket, region };
}

export async function defaultAwsRunner(args) {
  try {
    const awsPath = await verifiedAwsCliPath();
    const { stdout, stderr } = await execFileAsync(
      awsPath,
      args,
      {
        encoding: "utf8",
        maxBuffer: 16 * 1024 * 1024,
        env: sanitizedAwsEnvironment()
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

export async function defaultDockerRunner(
  args,
  {
    stdin = null,
    dockerConfig = "/var/empty"
  } = {}
) {
  const dockerPath = await verifiedDockerCliPath();
  return await new Promise((resolvePromise) => {
    const child = spawn(dockerPath, args, {
      env: dockerSubprocessEnvironment({
        dockerConfig
      }),
      stdio: ["pipe", "pipe", "pipe"]
    });
    const stdout = [];
    const stderr = [];
    let stdoutBytes = 0;
    let stderrBytes = 0;
    const maxBuffer = 16 * 1024 * 1024;
    let bufferExceeded = false;
    const collect = (chunks, chunk, stream) => {
      const size = Buffer.byteLength(chunk);
      if (stream === "stdout") {
        stdoutBytes += size;
        bufferExceeded ||= stdoutBytes > maxBuffer;
      } else {
        stderrBytes += size;
        bufferExceeded ||= stderrBytes > maxBuffer;
      }
      if (bufferExceeded) {
        child.kill();
        return;
      }
      chunks.push(chunk);
    };
    child.stdout.setEncoding("utf8");
    child.stderr.setEncoding("utf8");
    child.stdin.on("error", () => {
      // The process result below reports early Docker exits.
    });
    child.stdout.on("data", (chunk) =>
      collect(stdout, chunk, "stdout")
    );
    child.stderr.on("data", (chunk) =>
      collect(stderr, chunk, "stderr")
    );
    child.on("error", (error) => {
      resolvePromise({
        exitCode: 1,
        stdout: stdout.join(""),
        stderr: error.message
      });
    });
    child.on("close", (code, signal) => {
      resolvePromise({
        exitCode:
          bufferExceeded || signal
            ? 1
            : Number.isInteger(code)
              ? code
              : 1,
        stdout: stdout.join(""),
        stderr: bufferExceeded
          ? "Docker command output exceeded the 16 MiB safety limit."
          : stderr.join("")
      });
    });
    if (stdin === null) {
      child.stdin.end();
    } else {
      child.stdin.end(stdin);
    }
  });
}

export async function createIsolatedDockerConfig({
  temporaryRoot = tmpdir()
} = {}) {
  const dockerConfigPath = await mkdtemp(
    join(
      temporaryRoot,
      "retrofi-research-ecr-auth-"
    )
  );
  try {
    await writeFile(
      join(dockerConfigPath, "config.json"),
      `${JSON.stringify({ auths: {} }, null, 2)}\n`,
      {
        encoding: "utf8",
        mode: 0o600,
        flag: "wx"
      }
    );
    return dockerConfigPath;
  } catch (error) {
    await rm(dockerConfigPath, {
      recursive: true,
      force: true
    });
    throw error;
  }
}

function parseJsonOutput(result, operation) {
  if (result.exitCode !== 0) {
    throw new Error(
      `${operation}_FAILED: ${String(result.stderr ?? "").trim() || `exit ${result.exitCode}`}`
    );
  }
  try {
    return JSON.parse(result.stdout);
  } catch (error) {
    throw new Error(
      `${operation}_INVALID_JSON: ${error.message}`
    );
  }
}

function awsContextArgs({ profile, region }) {
  return [
    "--profile",
    profile,
    "--region",
    region,
    "--no-cli-pager",
    "--output",
    "json"
  ];
}

export async function verifyResearchIdentity(
  destination,
  { runner = defaultAwsRunner } = {}
) {
  const validated = validateResearchDestination(destination);
  const result = await runner([
    "sts",
    "get-caller-identity",
    ...awsContextArgs(validated)
  ]);
  const identity = parseJsonOutput(result, "STS_IDENTITY");
  if (
    identity.Account !== RESEARCH_AWS_ACCOUNT_ID ||
    typeof identity.Arn !== "string" ||
    !RESEARCH_ROLE_ARN_PATTERN.test(identity.Arn)
  ) {
    throw new Error(
      "UNSAFE_AWS_IDENTITY: caller must be the dedicated operational-savings research assumed role"
    );
  }
  return {
    accountId: identity.Account,
    arn: identity.Arn,
    userId: identity.UserId ?? null
  };
}

function requirePublicAccessBlock(value) {
  const configuration = value.PublicAccessBlockConfiguration;
  const controls = [
    "BlockPublicAcls",
    "IgnorePublicAcls",
    "BlockPublicPolicy",
    "RestrictPublicBuckets"
  ];
  if (
    !configuration ||
    controls.some((control) => configuration[control] !== true)
  ) {
    throw new Error(
      "UNSAFE_BUCKET_PUBLIC_ACCESS: all four S3 Block Public Access controls must be enabled"
    );
  }
  return Object.fromEntries(
    controls.map((control) => [control, true])
  );
}

function requireBucketOwnerEnforced(value) {
  const ownership = value.OwnershipControls?.Rules?.map(
    (rule) => rule.ObjectOwnership
  );
  if (
    !Array.isArray(ownership) ||
    !ownership.includes("BucketOwnerEnforced")
  ) {
    throw new Error(
      "UNSAFE_BUCKET_OWNERSHIP: BucketOwnerEnforced is required"
    );
  }
  return "BucketOwnerEnforced";
}

function requireDefaultEncryption(value) {
  const algorithms =
    value.ServerSideEncryptionConfiguration?.Rules?.map(
      (rule) =>
        rule.ApplyServerSideEncryptionByDefault?.SSEAlgorithm
    ).filter(Boolean) ??
    value.ServerSideEncryptionConfiguration?.map(
      (rule) =>
        rule.ApplyServerSideEncryptionByDefault?.SSEAlgorithm ??
        rule.ServerSideEncryptionByDefault?.SSEAlgorithm
    ).filter(Boolean) ??
    [];
  if (!algorithms.includes("AES256")) {
    throw new Error(
      "UNSAFE_BUCKET_ENCRYPTION: AES256 default encryption is required"
    );
  }
  return "AES256";
}

function policyDocument(value) {
  const policy = value.Policy;
  if (policy && typeof policy === "object") return policy;
  if (typeof policy !== "string") {
    throw new Error(
      "UNSAFE_BUCKET_POLICY: a parsed HTTPS-only bucket policy is required"
    );
  }
  try {
    return JSON.parse(policy);
  } catch (error) {
    throw new Error(
      `UNSAFE_BUCKET_POLICY: invalid policy JSON: ${error.message}`
    );
  }
}

function includesAllS3Resources(resource, bucket) {
  const resources = Array.isArray(resource) ? resource : [resource];
  return (
    resources.includes(`arn:aws:s3:::${bucket}`) &&
    resources.includes(`arn:aws:s3:::${bucket}/*`)
  );
}

function requireHttpsOnlyPolicy(value, bucket) {
  const statements = policyDocument(value).Statement;
  const list = Array.isArray(statements) ? statements : [statements];
  const secureTransportDeny = list.find(
    (statement) =>
      statement?.Effect === "Deny" &&
      (statement?.Principal === "*" ||
        statement?.Principal?.AWS === "*") &&
      (statement?.Action === "s3:*" ||
        (Array.isArray(statement?.Action) &&
          statement.Action.includes("s3:*"))) &&
      includesAllS3Resources(statement?.Resource, bucket) &&
      (statement?.Condition?.Bool?.["aws:SecureTransport"] ===
        "false" ||
        statement?.Condition?.Bool?.["aws:SecureTransport"] ===
          false)
  );
  if (!secureTransportDeny) {
    throw new Error(
      "UNSAFE_BUCKET_POLICY: an HTTPS-only deny covering the bucket and every object is required"
    );
  }
  return true;
}

function lifecycleRulePrefix(rule) {
  if (typeof rule.Prefix === "string") return rule.Prefix;
  if (typeof rule.Filter?.Prefix === "string") {
    return rule.Filter.Prefix;
  }
  if (typeof rule.Filter?.And?.Prefix === "string") {
    return rule.Filter.And.Prefix;
  }
  return "";
}

function requireNonTemporaryRetention(value) {
  const rules = value.Rules ?? [];
  if (!Array.isArray(rules)) {
    throw new Error(
      "UNSAFE_BUCKET_LIFECYCLE: lifecycle rules must be an array"
    );
  }
  for (const rule of rules) {
    if (rule.Status !== "Enabled") continue;
    const deletesObjects =
      rule.Expiration !== undefined ||
      rule.NoncurrentVersionExpiration !== undefined;
    if (!deletesObjects) continue;
    const prefix = lifecycleRulePrefix(rule);
    if (!prefix.startsWith("temporary/")) {
      throw new Error(
        `UNSAFE_BUCKET_LIFECYCLE: expiration rule ${rule.ID ?? rule.Id ?? "unnamed"} is not confined to temporary/`
      );
    }
  }
  return {
    nonTemporaryExpiration: "NONE",
    temporaryExpirationRules: rules
      .filter(
        (rule) =>
          rule.Status === "Enabled" &&
          (rule.Expiration !== undefined ||
            rule.NoncurrentVersionExpiration !== undefined)
      )
      .map((rule) => rule.ID ?? rule.Id ?? "unnamed")
  };
}

export async function verifyResearchBucketControls(
  destination,
  { runner = defaultAwsRunner } = {}
) {
  const validated = validateResearchDestination(destination);
  const common = [
    "--bucket",
    validated.bucket,
    "--expected-bucket-owner",
    RESEARCH_AWS_ACCOUNT_ID,
    ...awsContextArgs(validated)
  ];
  const [
    versioningResult,
    locationResult,
    publicAccessResult,
    ownershipResult,
    encryptionResult,
    policyResult,
    lifecycleResult
  ] =
    await Promise.all([
      runner(["s3api", "get-bucket-versioning", ...common]),
      runner(["s3api", "get-bucket-location", ...common]),
      runner(["s3api", "get-public-access-block", ...common]),
      runner(["s3api", "get-bucket-ownership-controls", ...common]),
      runner(["s3api", "get-bucket-encryption", ...common]),
      runner(["s3api", "get-bucket-policy", ...common]),
      runner([
        "s3api",
        "get-bucket-lifecycle-configuration",
        ...common
      ])
    ]);
  const versioning = parseJsonOutput(
    versioningResult,
    "S3_BUCKET_VERSIONING"
  );
  if (versioning.Status !== "Enabled") {
    throw new Error(
      `UNSAFE_BUCKET_VERSIONING: expected Enabled, received ${versioning.Status ?? "unset"}`
    );
  }
  const location = parseJsonOutput(
    locationResult,
    "S3_BUCKET_LOCATION"
  ).LocationConstraint;
  const normalizedLocation =
    location === null || location === ""
      ? "us-east-1"
      : location === "EU"
        ? "eu-west-1"
        : location;
  if (normalizedLocation !== validated.region) {
    throw new Error(
      `UNSAFE_BUCKET_LOCATION: expected ${validated.region}, received ${normalizedLocation}`
    );
  }
  const publicAccessBlock = requirePublicAccessBlock(
    parseJsonOutput(
      publicAccessResult,
      "S3_BUCKET_PUBLIC_ACCESS_BLOCK"
    )
  );
  const objectOwnership = requireBucketOwnerEnforced(
    parseJsonOutput(
      ownershipResult,
      "S3_BUCKET_OWNERSHIP_CONTROLS"
    )
  );
  const defaultEncryption = requireDefaultEncryption(
    parseJsonOutput(
      encryptionResult,
      "S3_BUCKET_DEFAULT_ENCRYPTION"
    )
  );
  const httpsOnlyPolicy = requireHttpsOnlyPolicy(
    parseJsonOutput(policyResult, "S3_BUCKET_POLICY"),
    validated.bucket
  );
  const lifecycle = requireNonTemporaryRetention(
    parseJsonOutput(
      lifecycleResult,
      "S3_BUCKET_LIFECYCLE_CONFIGURATION"
    )
  );
  return {
    versioningStatus: versioning.Status,
    mfaDeleteStatus: versioning.MFADelete ?? null,
    location: normalizedLocation,
    defaultEncryption,
    publicAccessBlock,
    objectOwnership,
    httpsOnlyPolicy,
    lifecycle,
    objectEncryptionVerification:
      "REQUIRED_ON_EVERY_OBJECT_HEAD"
  };
}

async function verifyExecutionContext(destination, runner) {
  const identity = await verifyResearchIdentity(destination, { runner });
  const bucketControls = await verifyResearchBucketControls(
    destination,
    { runner }
  );
  return { identity, bucketControls };
}

function isMissingHeadObject(result) {
  return (
    result.exitCode !== 0 &&
    /(?:\b404\b|Not Found|NoSuchKey)/i.test(
      `${result.stdout}\n${result.stderr}`
    )
  );
}

export async function readRemoteObject(
  destination,
  key,
  { runner = defaultAwsRunner, versionId = null } = {}
) {
  const validated = validateResearchDestination(destination);
  const args = [
    "s3api",
    "head-object",
    "--bucket",
    validated.bucket,
    "--expected-bucket-owner",
    RESEARCH_AWS_ACCOUNT_ID,
    "--key",
    key,
    "--checksum-mode",
    "ENABLED"
  ];
  if (versionId) {
    args.push("--version-id", versionId);
  }
  args.push(...awsContextArgs(validated));
  const result = await runner(args);
  if (isMissingHeadObject(result)) return null;
  return parseJsonOutput(result, "S3_HEAD_OBJECT");
}

function sha256Base64(hexDigest) {
  return Buffer.from(hexDigest, "hex").toString("base64");
}

export function verifyRemoteObject(remote, expected) {
  if (!remote || typeof remote !== "object") {
    throw new Error("REMOTE_OBJECT_MISSING");
  }
  if (remote.ContentLength !== expected.sizeBytes) {
    throw new Error(
      `REMOTE_SIZE_MISMATCH: expected ${expected.sizeBytes}, received ${remote.ContentLength}`
    );
  }
  if (
    expected.contentType &&
    remote.ContentType !== expected.contentType
  ) {
    throw new Error(
      `REMOTE_CONTENT_TYPE_MISMATCH: expected ${expected.contentType}, received ${remote.ContentType}`
    );
  }
  const metadataDigest =
    remote.Metadata?.sha256 ?? remote.Metadata?.SHA256 ?? null;
  if (metadataDigest !== expected.sha256) {
    throw new Error(
      `REMOTE_METADATA_CHECKSUM_MISMATCH: expected ${expected.sha256}, received ${metadataDigest}`
    );
  }
  const expectedBase64 = sha256Base64(expected.sha256);
  if (remote.ChecksumSHA256 !== expectedBase64) {
    throw new Error(
      `REMOTE_S3_CHECKSUM_MISMATCH: expected ${expectedBase64}, received ${remote.ChecksumSHA256}`
    );
  }
  if (!remote.VersionId || remote.VersionId === "null") {
    throw new Error(
      "REMOTE_VERSION_MISSING: the research bucket must return a durable S3 version ID"
    );
  }
  if (!["AES256", "aws:kms", "aws:kms:dsse"].includes(remote.ServerSideEncryption)) {
    throw new Error(
      "REMOTE_ENCRYPTION_MISSING: the research object must be encrypted at rest"
    );
  }
  return {
    versionId: remote.VersionId,
    etag: remote.ETag ?? null,
    contentLength: remote.ContentLength,
    contentType: remote.ContentType ?? null,
    checksumSha256Base64: remote.ChecksumSHA256,
    metadataSha256: metadataDigest,
    serverSideEncryption: remote.ServerSideEncryption,
    kmsKeyId: remote.SSEKMSKeyId ?? null
  };
}

async function withVerifiedRemoteVersion({
  repoRoot,
  destination,
  packageRecord,
  runner,
  now,
  useTemporaryFile
}) {
  const versionId = packageRecord.remote?.s3?.versionId;
  if (!versionId) {
    throw new Error(
      `REMOTE_VERSION_REQUIRED: ${packageRecord.packageId}`
    );
  }
  const cacheRoot = resolve(repoRoot, CACHE_RELATIVE_PATH);
  await mkdir(cacheRoot, { recursive: true });
  const temporaryDirectory = await mkdtemp(
    join(cacheRoot, "migration-restore-")
  );
  const temporaryPath = join(temporaryDirectory, "object.bin");
  const handle = await open(temporaryPath, "wx", 0o600);
  await handle.close();
  try {
    const result = await runner([
      "s3api",
      "get-object",
      "--bucket",
      destination.bucket,
      "--expected-bucket-owner",
      RESEARCH_AWS_ACCOUNT_ID,
      "--key",
      packageRecord.plannedObject.key,
      "--version-id",
      versionId,
      "--checksum-mode",
      "ENABLED",
      ...awsContextArgs(destination),
      temporaryPath
    ]);
    const response = parseJsonOutput(
      result,
      "S3_GET_OBJECT_VERSION"
    );
    const restored = verifyRemoteObject(response, {
      sizeBytes: packageRecord.plannedObject.expectedSizeBytes,
      sha256: packageRecord.plannedObject.expectedSha256,
      contentType: packageRecord.plannedObject.contentType
    });
    if (restored.versionId !== versionId) {
      throw new Error(
        `RESTORED_VERSION_MISMATCH: ${packageRecord.packageId}`
      );
    }
    const details = await lstat(temporaryPath);
    if (
      !details.isFile() ||
      details.isSymbolicLink() ||
      (details.mode & 0o777) !== 0o600
    ) {
      throw new Error(
        `RESTORE_TEMPORARY_FILE_UNSAFE: ${packageRecord.packageId}`
      );
    }
    if (
      details.size !==
      packageRecord.plannedObject.expectedSizeBytes
    ) {
      throw new Error(
        `RESTORED_SIZE_MISMATCH: ${packageRecord.packageId}`
      );
    }
    const digest = await sha256Path(temporaryPath);
    if (
      digest !== packageRecord.plannedObject.expectedSha256
    ) {
      throw new Error(
        `RESTORED_CHECKSUM_MISMATCH: ${packageRecord.packageId}`
      );
    }
    const proof = {
      restoredVersionId: versionId,
      restoredSha256: digest,
      restoredSizeBytes: details.size,
      restoredAt: now()
    };
    return await useTemporaryFile(temporaryPath, proof);
  } finally {
    await rm(temporaryDirectory, {
      recursive: true,
      force: false
    });
  }
}

export async function proveRemoteVersionRestorable({
  repoRoot,
  destination,
  packageRecord,
  runner = defaultAwsRunner,
  repositoryRestorer = defaultRepositoryRestorer,
  now = () => new Date().toISOString()
}) {
  return withVerifiedRemoteVersion({
    repoRoot,
    destination,
    packageRecord,
    runner,
    now,
    useTemporaryFile: async (temporaryPath, proof) => {
      if (
        packageRecord.packageType !==
        "PINNED_GIT_REPOSITORY"
      ) {
        return proof;
      }
      const repositoryPath = join(
        dirname(temporaryPath),
        "semantic-repository-restore"
      );
      try {
        await repositoryRestorer({
          bundlePath: temporaryPath,
          targetPath: repositoryPath,
          commitSha:
            packageRecord.fingerprint.commitSha,
          remoteUrl:
            packageRecord.content?.remoteUrl ?? null
        });
        const identity =
          await gitRepositoryIdentity(repositoryPath);
        if (
          !repositoryIdentityMatches(
            packageRecord,
            identity
          )
        ) {
          throw new Error(
            `RESTORED_REPOSITORY_FINGERPRINT_MISMATCH: ${packageRecord.packageId}`
          );
        }
        return {
          ...proof,
          repositorySemanticRestoreStatus: "VERIFIED",
          restoredRepositoryIdentity: identity
        };
      } finally {
        await rm(repositoryPath, {
          recursive: true,
          force: true
        });
      }
    }
  });
}

function packageById(manifest, packageId) {
  const packageRecord = manifest.packages.find(
    (candidate) => candidate.packageId === packageId
  );
  if (!packageRecord) {
    throw new Error(`PACKAGE_NOT_FOUND: ${packageId}`);
  }
  const key = packageRecord.plannedObject?.key;
  const keySegments =
    typeof key === "string" ? key.split("/") : [];
  if (
    typeof key !== "string" ||
    key.startsWith("/") ||
    key.endsWith("/") ||
    key.includes("\\") ||
    /[\u0000-\u001f\u007f]/.test(key) ||
    keySegments.some(
      (segment) =>
        !segment || segment === "." || segment === ".."
    ) ||
    !ALLOWED_OBJECT_KEY_PREFIXES.some((prefix) =>
      key.startsWith(prefix)
    )
  ) {
    throw new Error(
      `UNSAFE_OBJECT_KEY: ${packageRecord.packageId}`
    );
  }
  const expectedS3Uri =
    `s3://${RESEARCH_S3_BUCKET}/${key}`;
  if (
    packageRecord.s3Uri !== expectedS3Uri ||
    packageRecord.remote?.s3?.s3Uri !== expectedS3Uri
  ) {
    throw new Error(
      `MANIFEST_S3_URI_MISMATCH: ${packageRecord.packageId}`
    );
  }
  return packageRecord;
}

function safePathWithinCache(repoRoot, relativePath, label) {
  const cacheRoot = resolve(repoRoot, CACHE_RELATIVE_PATH);
  const localPath = resolve(repoRoot, relativePath);
  const rel = relative(cacheRoot, localPath);
  if (
    !rel ||
    rel === ".." ||
    rel.startsWith(`..${sep}`) ||
    resolve(localPath) === cacheRoot
  ) {
    throw new Error(
      `UNSAFE_LOCAL_PACKAGE_PATH: ${label}: ${relativePath}`
    );
  }
  return localPath;
}

function safeMigratablePath(repoRoot, relativePath, label) {
  const normalizedPath = relativePath?.split(sep).join("/");
  const outsideSpec = OUTSIDE_CACHE_MIGRATION_SPECS.find(
    (spec) => spec.localPath === normalizedPath
  );
  if (outsideSpec) {
    return resolve(repoRoot, outsideSpec.localPath);
  }
  return safePathWithinCache(repoRoot, relativePath, label);
}

function safeLocalPackagePath(repoRoot, packageRecord) {
  const sourcePath =
    packageRecord.plannedObject?.localFilePath ??
    packageRecord.localPath;
  return safeMigratablePath(
    repoRoot,
    sourcePath,
    packageRecord.packageId
  );
}

async function assertExistingMigratablePath(repoRoot, path, label) {
  const relativePath = relative(repoRoot, resolve(path))
    .split(sep)
    .join("/");
  if (
    OUTSIDE_CACHE_MIGRATION_SPECS.some(
      (spec) => spec.localPath === relativePath
    )
  ) {
    const resolvedPath = await realpath(path);
    if (resolvedPath !== resolve(repoRoot, relativePath)) {
      throw new Error(
        `UNSAFE_RESOLVED_PACKAGE_PATH: ${label}: ${resolvedPath}`
      );
    }
    return resolvedPath;
  }
  const cacheRoot = await realpath(
    resolve(repoRoot, CACHE_RELATIVE_PATH)
  );
  const resolvedPath = await realpath(path);
  const rel = relative(cacheRoot, resolvedPath);
  if (
    !rel ||
    rel === ".." ||
    rel.startsWith(`..${sep}`)
  ) {
    throw new Error(
      `UNSAFE_RESOLVED_PACKAGE_PATH: ${label}: ${resolvedPath}`
    );
  }
  return resolvedPath;
}

async function verifyLocalPackage(
  repoRoot,
  packageRecord,
  path = null
) {
  if (!packageRecord.plannedObject?.uploadReady) {
    throw new Error(
      `PACKAGE_NOT_UPLOAD_READY: ${packageRecord.packageId}`
    );
  }
  if (
    !packageRecord.plannedObject.expectedSha256 ||
    !Number.isSafeInteger(
      packageRecord.plannedObject.expectedSizeBytes
    )
  ) {
    throw new Error(
      `PACKAGE_INTEGRITY_INCOMPLETE: ${packageRecord.packageId}`
    );
  }
  const localPath =
    path ?? safeLocalPackagePath(repoRoot, packageRecord);
  await assertExistingMigratablePath(
    repoRoot,
    localPath,
    packageRecord.packageId
  );
  return verifyLocalPackageBytes(
    packageRecord,
    localPath
  );
}

async function verifyLocalPackageBytes(
  packageRecord,
  localPath
) {
  const details = await lstat(localPath);
  if (!details.isFile() || details.isSymbolicLink()) {
    throw new Error(
      `PACKAGE_LOCAL_FILE_REQUIRED: ${packageRecord.packageId}`
    );
  }
  if (
    details.size !== packageRecord.plannedObject.expectedSizeBytes
  ) {
    throw new Error(
      `LOCAL_SIZE_MISMATCH: ${packageRecord.packageId}`
    );
  }
  const digest = await sha256Path(localPath);
  if (digest !== packageRecord.plannedObject.expectedSha256) {
    throw new Error(
      `LOCAL_CHECKSUM_MISMATCH: ${packageRecord.packageId}`
    );
  }
  return {
    path: localPath,
    sizeBytes: details.size,
    sha256: digest
  };
}

function originalArtifactRestoreRecords(manifest) {
  const manifestRecords = new Map(
    (manifest.originalLocalArtifacts ?? []).map(
      (record) => [record.path, record]
    )
  );
  const records = [];
  for (const packageRecord of manifest.packages) {
    for (const origin of
      packageRecord.originalLocalArtifacts ?? []) {
      const linked = manifestRecords.get(origin.path);
      if (
        origin.relation !==
          "EXACT_BYTE_SOURCE_FOR_CANONICAL_CACHE_COPY" ||
        !isAbsolute(origin.path) ||
        resolve(origin.path) !== origin.path ||
        origin.expectedSizeBytes !==
          packageRecord.plannedObject.expectedSizeBytes ||
        origin.expectedSha256 !==
          packageRecord.plannedObject.expectedSha256 ||
        linked?.canonicalPackageId !==
          packageRecord.packageId ||
        linked.canonicalLocalPath !==
          packageRecord.localPath ||
        linked.expectedSizeBytes !==
          origin.expectedSizeBytes ||
        linked.expectedSha256 !== origin.expectedSha256
      ) {
        throw new Error(
          `ORIGINAL_ARTIFACT_RESTORE_LINKAGE_INVALID: ${origin.path}`
        );
      }
      records.push({
        packageRecord,
        origin,
        linked
      });
    }
  }
  const paths = records.map(
    ({ origin }) => origin.path
  );
  if (
    new Set(paths).size !== paths.length ||
    paths.length !== manifestRecords.size
  ) {
    throw new Error(
      "ORIGINAL_ARTIFACT_RESTORE_COVERAGE_INVALID"
    );
  }
  return records.sort((left, right) =>
    left.origin.path.localeCompare(right.origin.path)
  );
}

async function assertOriginalRestoreParentSafe({
  path,
  permittedTempRoot
}) {
  const root = resolve(permittedTempRoot);
  const candidate = relative(root, path);
  if (
    root === sep ||
    resolve(path) !== path ||
    !candidate ||
    candidate === ".." ||
    candidate.startsWith(`..${sep}`)
  ) {
    throw new Error(
      `ORIGINAL_ARTIFACT_RESTORE_PATH_UNSAFE: ${path}`
    );
  }
  const rootRealPath = await realpath(root);
  if (rootRealPath !== root) {
    throw new Error(
      `ORIGINAL_ARTIFACT_RESTORE_ROOT_SYMLINK_FORBIDDEN: ${root}`
    );
  }
  const parentPath = dirname(path);
  await mkdir(parentPath, { recursive: true });
  const parentRealPath = await realpath(parentPath);
  const expectedParentRealPath = resolve(
    rootRealPath,
    relative(root, parentPath)
  );
  if (parentRealPath !== expectedParentRealPath) {
    throw new Error(
      `ORIGINAL_ARTIFACT_RESTORE_PARENT_SYMLINK_FORBIDDEN: ${path}`
    );
  }
}

function assertPackageHasExactRestoreReceipt({
  manifest,
  packageRecord
}) {
  const journal = manifest.execution?.restoreAllJournal;
  const completion =
    journal?.completedPackages?.find(
      (entry) =>
        entry.packageId === packageRecord.packageId
    );
  const hydration = packageRecord.hydration;
  if (
    !["IN_PROGRESS", "COMPLETE"].includes(
      journal?.status
    ) ||
    journal.pendingPackageId !== null ||
    journal.completedPackages.length !==
      manifest.packages.length ||
    hydration?.status !==
      "HYDRATED_FROM_VERIFIED_S3_VERSION" ||
    hydration.restoredVersionId !==
      packageRecord.remote.s3.versionId ||
    hydration.restoredSha256 !==
      packageRecord.plannedObject.expectedSha256 ||
    hydration.restoredSizeBytes !==
      packageRecord.plannedObject.expectedSizeBytes ||
    completion?.restoredVersionId !==
      packageRecord.remote.s3.versionId ||
    completion.restoredSha256 !==
      packageRecord.plannedObject.expectedSha256 ||
    completion.restoredSizeBytes !==
      packageRecord.plannedObject.expectedSizeBytes ||
    completion.proof?.restoredVersionId !==
      packageRecord.remote.s3.versionId ||
    completion.proof.restoredSha256 !==
      packageRecord.plannedObject.expectedSha256 ||
    completion.proof.restoredSizeBytes !==
      packageRecord.plannedObject.expectedSizeBytes
  ) {
    throw new Error(
      `ORIGINAL_ARTIFACT_EXACT_RESTORE_RECEIPT_REQUIRED: ${packageRecord.packageId}`
    );
  }
  return completion;
}

function recordOriginalArtifactMaterialization(
  packageRecord
) {
  const hydration = packageRecord.hydration;
  const generation =
    hydration?.materializationGeneration;
  if (
    !Number.isSafeInteger(generation) ||
    generation <= 0
  ) {
    throw new Error(
      `ORIGINAL_ARTIFACT_RESTORE_GENERATION_REQUIRED: ${packageRecord.packageId}`
    );
  }
  const actionGenerations = {
    ...(hydration.cleanupActionGenerationByType ?? {})
  };
  actionGenerations.PACKAGE_ORIGINAL_FILE =
    generation;
  hydration.cleanupActionGenerationByType =
    actionGenerations;
  hydration.materializedCleanupActionTypes = [
    ...new Set([
      ...(hydration.materializedCleanupActionTypes ??
        []),
      "PACKAGE_ORIGINAL_FILE"
    ])
  ].sort();
  return generation;
}

export async function materializeOriginalLocalArtifacts({
  repoRoot,
  manifest,
  permittedTempRoot = "/private/tmp",
  createCopy = (sourcePath, targetPath) =>
    copyFile(
      sourcePath,
      targetPath,
      fsConstants.COPYFILE_EXCL
    ),
  now = () => new Date().toISOString()
}) {
  validateManifestDigest(manifest);
  const records = originalArtifactRestoreRecords(manifest);
  const prepared = [];
  for (const record of records) {
    const { packageRecord, origin } = record;
    assertPackageHasExactRestoreReceipt({
      manifest,
      packageRecord
    });
    const canonical = await verifyLocalPackage(
      repoRoot,
      packageRecord
    );
    await assertOriginalRestoreParentSafe({
      path: origin.path,
      permittedTempRoot
    });
    const exists = await pathExists(origin.path);
    if (exists) {
      await verifyLocalPackageBytes(
        packageRecord,
        origin.path
      );
    }
    prepared.push({
      ...record,
      canonical,
      existedBeforeRestore: exists
    });
  }
  for (const record of prepared) {
    if (!record.existedBeforeRestore) {
      await createCopy(
        record.canonical.path,
        record.origin.path
      );
    }
    await verifyLocalPackageBytes(
      record.packageRecord,
      record.origin.path
    );
  }
  const restoredAt = now();
  const generationByPackageId = new Map();
  for (const { packageRecord } of prepared) {
    if (
      !generationByPackageId.has(
        packageRecord.packageId
      )
    ) {
      generationByPackageId.set(
        packageRecord.packageId,
        recordOriginalArtifactMaterialization(
          packageRecord
        )
      );
    }
  }
  const results = prepared.map((record) => {
    for (const target of [
      record.origin,
      record.linked
    ]) {
      target.cleanupStatus = "LOCAL_RETAINED";
      target.deletedAt = null;
    }
    record.packageRecord.hydration.localPaths = [
      ...new Set([
        ...(record.packageRecord.hydration
          .localPaths ?? []),
        record.origin.path
      ])
    ].sort();
    return {
      path: record.origin.path,
      canonicalPackageId:
        record.packageRecord.packageId,
      canonicalLocalPath:
        record.packageRecord.localPath,
      materializationGeneration:
        generationByPackageId.get(
          record.packageRecord.packageId
        ),
      sizeBytes: record.origin.expectedSizeBytes,
      sha256: record.origin.expectedSha256,
      disposition: record.existedBeforeRestore
        ? "ADOPTED_EXISTING_EXACT_ORIGINAL_PATH"
        : "RESTORED_EXACT_ORIGINAL_PATH_BY_EXCLUSIVE_COPY"
    };
  });
  const receipt = {
    status: "COMPLETE",
    restoredAt,
    artifactCount: results.length,
    createdPathCount: results.filter(
      (result) =>
        result.disposition ===
        "RESTORED_EXACT_ORIGINAL_PATH_BY_EXCLUSIVE_COPY"
    ).length,
    adoptedPathCount: results.filter(
      (result) =>
        result.disposition ===
        "ADOPTED_EXISTING_EXACT_ORIGINAL_PATH"
    ).length,
    permittedTempRoot: resolve(permittedTempRoot),
    overwriteAllowed: false,
    source:
      "EXACT_LOCAL_BYTES_WITH_COMMITTED_S3_RESTORE_RECEIPT",
    results
  };
  manifest.execution.lastOriginalArtifactRestore =
    receipt;
  manifest.manifestContentSha256 =
    stableManifestDigest(manifest);
  return receipt;
}

export async function restoreOriginalLocalArtifacts({
  repoRoot,
  manifestPath,
  manifest,
  gitRunner = defaultGitRunner,
  permittedTempRoot = "/private/tmp",
  createCopy = (sourcePath, targetPath) =>
    copyFile(
      sourcePath,
      targetPath,
      fsConstants.COPYFILE_EXCL
    ),
  now = () => new Date().toISOString()
}) {
  await assertManifestCleanCommitted({
    repoRoot,
    manifestPath,
    gitRunner
  });
  return materializeOriginalLocalArtifacts({
    repoRoot,
    manifest,
    permittedTempRoot,
    createCopy,
    now
  });
}

async function verifyEmbeddedLicenseMember({
  repoRoot,
  manifest,
  packageRecord,
  archiveMemberReader = readArchiveMember
}) {
  if (
    packageRecord.packageType !==
    "EMBEDDED_LICENSE_ARTIFACT"
  ) {
    return null;
  }
  const parent = packageById(
    manifest,
    packageRecord.parentPackageId
  );
  const parentPath = safeMigratablePath(
    repoRoot,
    parent.localPath,
    parent.packageId
  );
  await assertExistingMigratablePath(
    repoRoot,
    parentPath,
    parent.packageId
  );
  const parentDigest = await sha256Path(parentPath);
  if (
    parentDigest !==
      packageRecord.embeddedMember.parentExpectedSha256 ||
    parentDigest !==
      parent.plannedObject.expectedSha256
  ) {
    throw new Error(
      `EMBEDDED_LICENSE_PARENT_CHECKSUM_MISMATCH: ${packageRecord.packageId}`
    );
  }
  const memberBytes = await archiveMemberReader({
    archivePath: parentPath,
    archiveFormat:
      packageRecord.embeddedMember.archiveFormat,
    memberPath: packageRecord.embeddedMember.memberPath
  });
  const digest = createHash("sha256")
    .update(memberBytes)
    .digest("hex");
  if (
    memberBytes.length !==
      packageRecord.plannedObject.expectedSizeBytes ||
    digest !==
      packageRecord.plannedObject.expectedSha256
  ) {
    throw new Error(
      `EMBEDDED_LICENSE_MEMBER_MISMATCH: ${packageRecord.packageId}`
    );
  }
  return {
    parentPath,
    parentPackageId: parent.packageId,
    memberPath:
      packageRecord.embeddedMember.memberPath,
    sizeBytes: memberBytes.length,
    sha256: digest
  };
}

async function defaultArchiveRunner({
  repositoryPath,
  outputPath,
  commitSha
}) {
  try {
    const { stdout, stderr } = await execFileAsync(
      FIXED_GIT_PATH,
      [
        "-C",
        repositoryPath,
        "bundle",
        "create",
        outputPath,
        "HEAD"
      ],
      {
        encoding: "utf8",
        maxBuffer: 16 * 1024 * 1024,
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

function repositoryIdentityMatches(packageRecord, identity) {
  return (
    identity.commitSha === packageRecord.fingerprint.commitSha &&
    identity.gitTreeObjectSha1 ===
      packageRecord.fingerprint.gitTreeObjectSha1 &&
    identity.gitIndexListingSha256 ===
      packageRecord.fingerprint.gitIndexListingSha256 &&
    identity.workingTreeClean === true
  );
}

async function stagedRegularFileIdentity({
  path,
  errorCode
}) {
  const details = await lstat(path);
  if (
    !details.isFile() ||
    details.isSymbolicLink() ||
    details.size === 0
  ) {
    throw new Error(`${errorCode}: ${path}`);
  }
  return {
    details,
    sizeBytes: details.size,
    sha256: await sha256Path(path)
  };
}

export async function prepareRepositoryArchive({
  repoRoot,
  manifest,
  packageId,
  archiveRunner = defaultArchiveRunner,
  now = () => new Date().toISOString()
}) {
  validateManifestDigest(manifest);
  const packageRecord = packageById(manifest, packageId);
  if (packageRecord.packageType !== "PINNED_GIT_REPOSITORY") {
    throw new Error(
      `REPOSITORY_PACKAGE_REQUIRED: ${packageRecord.packageId}`
    );
  }
  const repositoryPath = safePathWithinCache(
    repoRoot,
    packageRecord.localPath,
    packageRecord.packageId
  );
  await assertExistingMigratablePath(
    repoRoot,
    repositoryPath,
    packageRecord.packageId
  );
  const identity = await gitRepositoryIdentity(repositoryPath);
  if (!repositoryIdentityMatches(packageRecord, identity)) {
    throw new Error(
      `REPOSITORY_FINGERPRINT_MISMATCH: ${packageRecord.packageId}`
    );
  }
  const archiveName =
    packageRecord.plannedObject.archivePlan?.outputFileName;
  if (!archiveName || archiveName.includes("/") || archiveName === ".") {
    throw new Error(
      `ARCHIVE_NAME_INVALID: ${packageRecord.packageId}`
    );
  }
  const archiveRelativePath =
    `${CACHE_RELATIVE_PATH}/migration-staging/${archiveName}`;
  const archivePath = safePathWithinCache(
    repoRoot,
    archiveRelativePath,
    packageRecord.packageId
  );
  let interruptedStaging = null;
  try {
    const existing = await stagedRegularFileIdentity({
      path: archivePath,
      errorCode: "ARCHIVE_STAGING_FILE_UNSAFE"
    });
    if (
      packageRecord.plannedObject.uploadReady === true
    ) {
      if (
        existing.sizeBytes ===
          packageRecord.plannedObject.expectedSizeBytes &&
        existing.sha256 ===
          packageRecord.plannedObject.expectedSha256
      ) {
        return {
          disposition: "ALREADY_MATERIALIZED_VERIFIED",
          packageId,
          archivePath: archiveRelativePath,
          sizeBytes: existing.sizeBytes,
          sha256: existing.sha256
        };
      }
      throw new Error(
        `ARCHIVE_ALREADY_EXISTS: ${archiveRelativePath}`
      );
    }
    interruptedStaging = existing;
  } catch (error) {
    if (error.code !== "ENOENT") throw error;
  }

  await mkdir(dirname(archivePath), { recursive: true });
  const temporaryPath =
    `${archivePath}.${process.pid}.${Date.now()}.partial`;
  const prefix =
    `${packageRecord.content.repositoryName}-` +
    `${packageRecord.fingerprint.commitSha}/`;
  if (
    !/^[A-Za-z0-9._-]+$/.test(
      packageRecord.content.repositoryName
    )
  ) {
    throw new Error(
      `REPOSITORY_NAME_INVALID: ${packageRecord.packageId}`
    );
  }
  const result = await archiveRunner({
    repositoryPath,
    outputPath: temporaryPath,
    prefix,
    commitSha: packageRecord.fingerprint.commitSha
  });
  if (result.exitCode !== 0) {
    await unlink(temporaryPath).catch(() => {});
    throw new Error(
      `GIT_BUNDLE_FAILED: ${String(result.stderr ?? "").trim() || `exit ${result.exitCode}`}`
    );
  }
  let details = await lstat(temporaryPath);
  if (!details.isFile() || details.size === 0) {
    await unlink(temporaryPath).catch(() => {});
    throw new Error("SOURCE_ARCHIVE_EMPTY");
  }
  let digest = await sha256Path(temporaryPath);
  let disposition = "ARCHIVE_MATERIALIZED";
  if (interruptedStaging) {
    if (
      interruptedStaging.sizeBytes !== details.size ||
      interruptedStaging.sha256 !== digest
    ) {
      await unlink(temporaryPath).catch(() => {});
      throw new Error(
        `ARCHIVE_INTERRUPTED_STAGING_MISMATCH: ${archiveRelativePath}`
      );
    }
    await unlink(temporaryPath);
    const adoptedStaging =
      await stagedRegularFileIdentity({
        path: archivePath,
        errorCode:
          "ARCHIVE_INTERRUPTED_STAGING_FILE_UNSAFE"
      });
    if (
      adoptedStaging.sizeBytes !== details.size ||
      adoptedStaging.sha256 !== digest
    ) {
      throw new Error(
        `ARCHIVE_INTERRUPTED_STAGING_CHANGED: ${archiveRelativePath}`
      );
    }
    details = adoptedStaging.details;
    digest = adoptedStaging.sha256;
    disposition =
      "ARCHIVE_INTERRUPTED_STAGING_ADOPTED";
  } else {
    try {
      await link(temporaryPath, archivePath);
      await unlink(temporaryPath);
    } catch (error) {
      if (error.code !== "EEXIST") {
        await unlink(temporaryPath).catch(() => {});
        throw error;
      }
      const concurrentStaging =
        await stagedRegularFileIdentity({
          path: archivePath,
          errorCode:
            "ARCHIVE_CONCURRENT_STAGING_FILE_UNSAFE"
        });
      if (
        concurrentStaging.sizeBytes !== details.size ||
        concurrentStaging.sha256 !== digest
      ) {
        await unlink(temporaryPath).catch(() => {});
        throw new Error(
          `ARCHIVE_CONCURRENT_STAGING_MISMATCH: ${archiveRelativePath}`
        );
      }
      await unlink(temporaryPath);
      const adoptedStaging =
        await stagedRegularFileIdentity({
          path: archivePath,
          errorCode:
            "ARCHIVE_CONCURRENT_STAGING_FILE_UNSAFE"
        });
      if (
        adoptedStaging.sizeBytes !== details.size ||
        adoptedStaging.sha256 !== digest
      ) {
        throw new Error(
          `ARCHIVE_CONCURRENT_STAGING_CHANGED: ${archiveRelativePath}`
        );
      }
      details = adoptedStaging.details;
      digest = adoptedStaging.sha256;
      disposition =
        "ARCHIVE_CONCURRENT_STAGING_ADOPTED";
    }
  }

  const timestamp = now();
  Object.assign(packageRecord.plannedObject, {
    expectedSizeBytes: details.size,
    expectedSha256: digest,
    localFilePath: archiveRelativePath,
    uploadReady: true,
    state: "ARCHIVE_MATERIALIZED"
  });
  Object.assign(packageRecord.plannedObject.archivePlan, {
    materialized: true,
    materializedAt: timestamp,
    archiveSizeBytes: details.size,
    archiveSha256: digest
  });
  packageRecord.remote.s3.verificationStatus = "NOT_UPLOADED";
  const archiveNeed = manifest.sourceArchiveNeeds?.find(
    (candidate) => candidate.packageId === packageId
  );
  if (archiveNeed) {
    Object.assign(archiveNeed, {
      status: "MATERIALIZED_NOT_UPLOADED",
      uploadReady: true,
      localFilePath: archiveRelativePath,
      sizeBytes: details.size,
      sha256: digest,
      blocker: null
    });
  }
  manifest.manifestContentSha256 = stableManifestDigest(manifest);
  return {
    disposition,
    packageId,
    archivePath: archiveRelativePath,
    sizeBytes: details.size,
    sha256: digest
  };
}

export async function prepareEmbeddedLicenseArtifact({
  repoRoot,
  manifest,
  packageId,
  archiveMemberReader = readArchiveMember,
  now = () => new Date().toISOString()
}) {
  validateManifestDigest(manifest);
  const packageRecord = packageById(manifest, packageId);
  if (
    packageRecord.packageType !==
    "EMBEDDED_LICENSE_ARTIFACT"
  ) {
    throw new Error(
      `EMBEDDED_LICENSE_PACKAGE_REQUIRED: ${packageRecord.packageId}`
    );
  }
  const extractionPlan =
    packageRecord.plannedObject?.extractionPlan;
  const parent = packageById(
    manifest,
    packageRecord.parentPackageId
  );
  if (
    !extractionPlan ||
    extractionPlan.parentPackageId !== parent.packageId ||
    extractionPlan.parentLocalPath !== parent.localPath ||
    extractionPlan.parentExpectedSha256 !==
      parent.plannedObject?.expectedSha256 ||
    extractionPlan.memberPath !==
      packageRecord.embeddedMember?.memberPath ||
    extractionPlan.archiveFormat !==
      packageRecord.embeddedMember?.archiveFormat
  ) {
    throw new Error(
      `EMBEDDED_LICENSE_EXTRACTION_PLAN_INVALID: ${packageRecord.packageId}`
    );
  }
  const parentPath = safeMigratablePath(
    repoRoot,
    parent.localPath,
    parent.packageId
  );
  await assertExistingMigratablePath(
    repoRoot,
    parentPath,
    parent.packageId
  );
  const parentDigest = await sha256Path(parentPath);
  if (
    parentDigest !== extractionPlan.parentExpectedSha256
  ) {
    throw new Error(
      `EMBEDDED_LICENSE_PARENT_CHECKSUM_MISMATCH: ${packageRecord.packageId}`
    );
  }
  const stagedRelativePath =
    packageRecord.plannedObject.localFilePath;
  const stagedPath = safePathWithinCache(
    repoRoot,
    stagedRelativePath,
    packageRecord.packageId
  );
  let interruptedStaging = null;
  try {
    const existing = await stagedRegularFileIdentity({
      path: stagedPath,
      errorCode:
        "EMBEDDED_LICENSE_STAGING_FILE_UNSAFE"
    });
    if (
      packageRecord.plannedObject.uploadReady === true &&
      existing.sizeBytes ===
        packageRecord.plannedObject.expectedSizeBytes &&
      existing.sha256 ===
        packageRecord.plannedObject.expectedSha256
    ) {
      return {
        disposition:
          "EMBEDDED_LICENSE_ALREADY_MATERIALIZED_VERIFIED",
        packageId,
        localFilePath: stagedRelativePath,
        sizeBytes: existing.sizeBytes,
        sha256: existing.sha256
      };
    }
    if (packageRecord.plannedObject.uploadReady === true) {
      throw new Error(
        `EMBEDDED_LICENSE_STAGING_PATH_EXISTS: ${stagedRelativePath}`
      );
    }
    interruptedStaging = existing;
  } catch (error) {
    if (error.code !== "ENOENT") throw error;
  }
  const memberBytes = await archiveMemberReader({
    archivePath: parentPath,
    archiveFormat: extractionPlan.archiveFormat,
    memberPath: extractionPlan.memberPath
  });
  if (
    memberBytes.length !==
    packageRecord.plannedObject.expectedSizeBytes
  ) {
    throw new Error(
      `EMBEDDED_LICENSE_SIZE_MISMATCH: ${packageRecord.packageId}`
    );
  }
  const digest = createHash("sha256")
    .update(memberBytes)
    .digest("hex");
  if (
    digest !== packageRecord.plannedObject.expectedSha256
  ) {
    throw new Error(
      `EMBEDDED_LICENSE_CHECKSUM_MISMATCH: ${packageRecord.packageId}`
    );
  }
  let disposition =
    "EMBEDDED_LICENSE_MATERIALIZED";
  if (interruptedStaging) {
    if (
      interruptedStaging.sizeBytes !== memberBytes.length ||
      interruptedStaging.sha256 !== digest
    ) {
      throw new Error(
        `EMBEDDED_LICENSE_INTERRUPTED_STAGING_MISMATCH: ${stagedRelativePath}`
      );
    }
    const adoptedStaging =
      await stagedRegularFileIdentity({
        path: stagedPath,
        errorCode:
          "EMBEDDED_LICENSE_INTERRUPTED_STAGING_FILE_UNSAFE"
      });
    if (
      adoptedStaging.sizeBytes !== memberBytes.length ||
      adoptedStaging.sha256 !== digest
    ) {
      throw new Error(
        `EMBEDDED_LICENSE_INTERRUPTED_STAGING_CHANGED: ${stagedRelativePath}`
      );
    }
    disposition =
      "EMBEDDED_LICENSE_INTERRUPTED_STAGING_ADOPTED";
  } else {
    await mkdir(dirname(stagedPath), { recursive: true });
    const temporaryPath =
      `${stagedPath}.${process.pid}.${Date.now()}.partial`;
    const handle = await open(temporaryPath, "wx", 0o600);
    try {
      await handle.writeFile(memberBytes);
      await handle.sync();
    } catch (error) {
      await handle.close().catch(() => {});
      await unlink(temporaryPath).catch(() => {});
      throw error;
    } finally {
      await handle.close().catch(() => {});
    }
    try {
      await link(temporaryPath, stagedPath);
      await unlink(temporaryPath);
    } catch (error) {
      if (error.code !== "EEXIST") {
        await unlink(temporaryPath).catch(() => {});
        throw error;
      }
      const concurrentStaging =
        await stagedRegularFileIdentity({
          path: stagedPath,
          errorCode:
            "EMBEDDED_LICENSE_CONCURRENT_STAGING_FILE_UNSAFE"
        });
      if (
        concurrentStaging.sizeBytes !==
          memberBytes.length ||
        concurrentStaging.sha256 !== digest
      ) {
        await unlink(temporaryPath).catch(() => {});
        throw new Error(
          `EMBEDDED_LICENSE_CONCURRENT_STAGING_MISMATCH: ${stagedRelativePath}`
        );
      }
      await unlink(temporaryPath);
      const adoptedStaging =
        await stagedRegularFileIdentity({
          path: stagedPath,
          errorCode:
            "EMBEDDED_LICENSE_CONCURRENT_STAGING_FILE_UNSAFE"
        });
      if (
        adoptedStaging.sizeBytes !==
          memberBytes.length ||
        adoptedStaging.sha256 !== digest
      ) {
        throw new Error(
          `EMBEDDED_LICENSE_CONCURRENT_STAGING_CHANGED: ${stagedRelativePath}`
        );
      }
      disposition =
        "EMBEDDED_LICENSE_CONCURRENT_STAGING_ADOPTED";
    }
  }
  const timestamp = now();
  Object.assign(packageRecord.plannedObject, {
    uploadReady: true,
    state: "EMBEDDED_LICENSE_MATERIALIZED"
  });
  Object.assign(
    packageRecord.plannedObject.extractionPlan,
    {
      materialized: true,
      materializedAt: timestamp
    }
  );
  packageRecord.remote.s3.verificationStatus =
    "NOT_UPLOADED";
  const extractionNeed =
    manifest.embeddedLicenseExtractionNeeds?.find(
      (candidate) =>
        candidate.packageId === packageRecord.packageId
    );
  if (extractionNeed) {
    Object.assign(extractionNeed, {
      status: "MATERIALIZED_NOT_UPLOADED",
      uploadReady: true,
      materializedAt: timestamp
    });
  }
  manifest.manifestContentSha256 =
    stableManifestDigest(manifest);
  return {
    disposition,
    packageId,
    localFilePath: stagedRelativePath,
    sizeBytes: memberBytes.length,
    sha256: digest
  };
}

export async function prepareAllRepositoryArchives({
  repoRoot,
  manifest,
  archiveRunner = defaultArchiveRunner,
  archiveMemberReader = readArchiveMember,
  now = () => new Date().toISOString()
}) {
  validateManifestDigest(manifest);
  const manifestSnapshot = structuredClone(manifest);
  const repositories = manifest.packages.filter(
    (packageRecord) =>
      packageRecord.packageType === "PINNED_GIT_REPOSITORY"
  );
  const embeddedLicenses = manifest.packages.filter(
    (packageRecord) =>
      packageRecord.packageType ===
      "EMBEDDED_LICENSE_ARTIFACT"
  );
  const createdArchivePaths = [];
  const results = [];
  try {
    for (const packageRecord of repositories) {
      const result = await prepareRepositoryArchive({
        repoRoot,
        manifest,
        packageId: packageRecord.packageId,
        archiveRunner,
        now
      });
      results.push(result);
      if (result.disposition === "ARCHIVE_MATERIALIZED") {
        createdArchivePaths.push(
          safePathWithinCache(
            repoRoot,
            result.archivePath,
            packageRecord.packageId
          )
        );
      }
    }
    for (const packageRecord of embeddedLicenses) {
      const result =
        await prepareEmbeddedLicenseArtifact({
          repoRoot,
          manifest,
          packageId: packageRecord.packageId,
          archiveMemberReader,
          now
        });
      results.push(result);
      if (
        result.disposition ===
        "EMBEDDED_LICENSE_MATERIALIZED"
      ) {
        createdArchivePaths.push(
          safePathWithinCache(
            repoRoot,
            result.localFilePath,
            packageRecord.packageId
          )
        );
      }
    }
  } catch (error) {
    await Promise.all(
      createdArchivePaths.map((path) =>
        unlink(path).catch(() => {})
      )
    );
    for (const key of Object.keys(manifest)) {
      delete manifest[key];
    }
    Object.assign(manifest, manifestSnapshot);
    throw error;
  }
  return {
    disposition:
      "ALL_REPOSITORY_ARCHIVES_AND_EMBEDDED_LICENSES_PREPARED",
    packageCount: results.length,
    repositoryPackageCount: repositories.length,
    embeddedLicensePackageCount: embeddedLicenses.length,
    results
  };
}

function remoteRecord(verified, timestamp) {
  return {
    versionId: verified.versionId,
    etag: verified.etag,
    contentLength: verified.contentLength,
    contentType: verified.contentType,
    checksumSha256Base64: verified.checksumSha256Base64,
    metadataSha256: verified.metadataSha256,
    serverSideEncryption: verified.serverSideEncryption,
    kmsKeyId: verified.kmsKeyId,
    verifiedAt: timestamp,
    verificationStatus: "VERIFIED",
    deletionStatus: "LOCAL_RETAINED"
  };
}

async function conditionalPutObject({
  destination,
  packageRecord,
  local,
  runner
}) {
  const result = await runner([
    "s3api",
    "put-object",
    "--bucket",
    destination.bucket,
    "--expected-bucket-owner",
    RESEARCH_AWS_ACCOUNT_ID,
    "--key",
    packageRecord.plannedObject.key,
    "--body",
    local.path,
    "--content-type",
    packageRecord.plannedObject.contentType,
    "--metadata",
    `sha256=${local.sha256}`,
    "--checksum-sha256",
    sha256Base64(local.sha256),
    "--if-none-match",
    "*",
    ...awsContextArgs(destination)
  ]);
  if (result.exitCode !== 0) {
    if (/PreconditionFailed|\b412\b/i.test(result.stderr)) {
      throw new Error(
        "REMOTE_OBJECT_RACE: another writer created the immutable key"
      );
    }
    throw new Error(
      `S3_PUT_OBJECT_FAILED: ${String(result.stderr ?? "").trim() || `exit ${result.exitCode}`}`
    );
  }
  return parseJsonOutput(result, "S3_PUT_OBJECT");
}

function assertPackagePublicationMetadata(packageRecord) {
  const missing = [];
  if (
    typeof packageRecord.sourceOrganization !== "string" ||
    packageRecord.sourceOrganization.trim().length === 0
  ) {
    missing.push("sourceOrganization");
  }
  if (
    typeof packageRecord.acquisitionTimestamp !== "string" ||
    !Number.isFinite(Date.parse(packageRecord.acquisitionTimestamp))
  ) {
    missing.push("acquisitionTimestamp");
  }
  for (const [field, blockedStatuses] of [
    ["source", new Set(["NEEDS_REVIEW"])],
    ["release", new Set(["NEEDS_REVIEW"])],
    ["acquisition", new Set(["NEEDS_REVIEW"])],
    ["license", new Set(["NEEDS_REVIEW"])],
    [
      "ingestion",
      new Set(["NOT_DOCUMENTED_IN_PROOF_MANIFEST"])
    ]
  ]) {
    const metadata = packageRecord[field];
    if (
      !metadata ||
      blockedStatuses.has(metadata.status) ||
      metadata.blocker
    ) {
      missing.push(field);
    }
  }
  if (!packageRecord.release?.identities?.length) {
    missing.push("release.identities");
  }
  if (
    packageRecord.source?.status === "DOCUMENTED" &&
    !packageRecord.source.urls?.length
  ) {
    missing.push("source.urls");
  }
  if (
    packageRecord.source?.status === "DOCUMENTED" &&
    !packageRecord.license?.statements?.length
  ) {
    missing.push("license.statements");
  }
  if (
    packageRecord.content?.sourceDeclarations
      ?.verificationStatus === "DECLARATION_MISMATCH"
  ) {
    missing.push("content.sourceDeclarations");
  }
  if (missing.length) {
    throw new Error(
      `PACKAGE_PUBLICATION_METADATA_INCOMPLETE: ${packageRecord.packageId}: ${[...new Set(missing)].join(", ")}`
    );
  }
}

export async function uploadPackage({
  repoRoot,
  manifest,
  packageId,
  destination,
  runner = defaultAwsRunner,
  executionContext = null,
  now = () => new Date().toISOString()
}) {
  validateManifestDigest(manifest);
  const validated = validateResearchDestination(destination);
  const configured = manifest.destination?.s3;
  if (
    configured?.accountId !== RESEARCH_AWS_ACCOUNT_ID ||
    configured?.bucket !== RESEARCH_S3_BUCKET ||
    configured?.region !== RESEARCH_AWS_REGION
  ) {
    throw new Error(
      "MANIFEST_DESTINATION_MISMATCH: regenerate the manifest for the dedicated research destination"
    );
  }
  const packageRecord = packageById(manifest, packageId);
  assertPackagePublicationMetadata(packageRecord);
  const local = await verifyLocalPackage(repoRoot, packageRecord);
  const { identity, bucketControls } =
    executionContext ??
    (await verifyExecutionContext(validated, runner));
  const key = packageRecord.plannedObject.key;
  const expected = {
    sizeBytes: local.sizeBytes,
    sha256: local.sha256,
    contentType: packageRecord.plannedObject.contentType
  };
  const existing = await readRemoteObject(validated, key, { runner });
  let disposition;
  if (existing) {
    verifyRemoteObject(existing, expected);
    disposition = "ALREADY_PRESENT_VERIFIED_NO_OVERWRITE";
  } else {
    await conditionalPutObject({
      destination: validated,
      packageRecord,
      local,
      runner
    });
    disposition = "UPLOADED_CONDITIONALLY";
  }
  const remote = await readRemoteObject(validated, key, { runner });
  const verified = verifyRemoteObject(remote, expected);
  const timestamp = now();
  Object.assign(
    packageRecord.remote.s3,
    remoteRecord(verified, timestamp),
    {
      uploadedAt:
        disposition === "UPLOADED_CONDITIONALLY"
          ? timestamp
          : packageRecord.remote.s3.uploadedAt ?? null
    }
  );
  manifest.destination.s3.profile = validated.profile;
  manifest.destination.s3.verificationStatus =
    "CALLER_AND_BUCKET_CONTROLS_VERIFIED";
  manifest.destination.s3.infrastructureStatus =
    "VERIFIED_FOR_OBJECT_IO";
  manifest.destination.s3.bucketControls = bucketControls;
  manifest.destination.s3.blocker = null;
  manifest.execution.uploadsPerformed = true;
  manifest.execution.lastVerifiedIdentity = identity;
  manifest.manifestContentSha256 = stableManifestDigest(manifest);
  return {
    disposition,
    packageId,
    key,
    identity,
    remote: packageRecord.remote.s3
  };
}

function requireAllUploadReady(manifest) {
  const blocked = manifest.packages
    .filter(
      (packageRecord) =>
        packageRecord.plannedObject?.uploadReady !== true
    )
    .map((packageRecord) => packageRecord.packageId);
  if (blocked.length) {
    throw new Error(
      `BATCH_PACKAGE_NOT_UPLOAD_READY: ${blocked.join(", ")}`
    );
  }
  for (const packageRecord of manifest.packages) {
    assertPackagePublicationMetadata(packageRecord);
  }
}

export async function uploadAllPackages({
  repoRoot,
  manifest,
  destination,
  runner = defaultAwsRunner,
  now = () => new Date().toISOString()
}) {
  validateManifestDigest(manifest);
  requireAllUploadReady(manifest);
  const validated = validateResearchDestination(destination);
  const executionContext = await verifyExecutionContext(
    validated,
    runner
  );
  const results = [];
  for (const packageRecord of manifest.packages) {
    results.push(
      await uploadPackage({
        repoRoot,
        manifest,
        packageId: packageRecord.packageId,
        destination: validated,
        runner,
        executionContext,
        now
      })
    );
  }
  return {
    disposition: "ALL_PACKAGES_UPLOADED_OR_ALREADY_PRESENT",
    packageCount: results.length,
    identity: executionContext.identity,
    results
  };
}

export async function verifyPackageRemote({
  repoRoot,
  manifest,
  packageId,
  destination,
  runner = defaultAwsRunner,
  executionContext = null,
  now = () => new Date().toISOString()
}) {
  validateManifestDigest(manifest);
  const validated = validateResearchDestination(destination);
  const packageRecord = packageById(manifest, packageId);
  const local = await verifyLocalPackage(repoRoot, packageRecord);
  const { identity, bucketControls } =
    executionContext ??
    (await verifyExecutionContext(validated, runner));
  const remote = await readRemoteObject(
    validated,
    packageRecord.plannedObject.key,
    {
      runner,
      versionId: packageRecord.remote.s3.versionId
    }
  );
  const verified = verifyRemoteObject(remote, {
    sizeBytes: local.sizeBytes,
    sha256: local.sha256,
    contentType: packageRecord.plannedObject.contentType
  });
  const restoreProof = await proveRemoteVersionRestorable({
    repoRoot,
    destination: validated,
    packageRecord,
    runner,
    now
  });
  Object.assign(
    packageRecord.remote.s3,
    remoteRecord(verified, now())
  );
  manifest.destination.s3.profile = validated.profile;
  manifest.destination.s3.verificationStatus =
    "CALLER_AND_BUCKET_CONTROLS_VERIFIED";
  manifest.destination.s3.infrastructureStatus =
    "VERIFIED_FOR_OBJECT_IO";
  manifest.destination.s3.bucketControls = bucketControls;
  manifest.destination.s3.blocker = null;
  manifest.execution.lastVerifiedIdentity = identity;
  Object.assign(packageRecord.cleanupEligibility, restoreProof);
  manifest.manifestContentSha256 = stableManifestDigest(manifest);
  return {
    disposition: "REMOTE_VERIFIED",
    packageId,
    key: packageRecord.plannedObject.key,
    identity,
    remote: packageRecord.remote.s3,
    restoreProof
  };
}

export async function verifyAllPackages({
  repoRoot,
  manifest,
  destination,
  runner = defaultAwsRunner,
  now = () => new Date().toISOString()
}) {
  validateManifestDigest(manifest);
  requireAllUploadReady(manifest);
  const validated = validateResearchDestination(destination);
  const executionContext = await verifyExecutionContext(
    validated,
    runner
  );
  const results = [];
  for (const packageRecord of manifest.packages) {
    results.push(
      await verifyPackageRemote({
        repoRoot,
        manifest,
        packageId: packageRecord.packageId,
        destination: validated,
        runner,
        executionContext,
        now
      })
    );
  }
  return {
    disposition: "ALL_PACKAGES_VERIFIED_AND_RESTORABLE",
    packageCount: results.length,
    identity: executionContext.identity,
    results
  };
}

async function defaultRepositoryRestorer({
  bundlePath,
  targetPath,
  commitSha,
  remoteUrl
}) {
  try {
    await execFileAsync(
      FIXED_GIT_PATH,
      ["clone", "--no-checkout", bundlePath, targetPath],
      {
        encoding: "utf8",
        maxBuffer: 64 * 1024 * 1024,
        env: gitSubprocessEnvironment()
      }
    );
    await execFileAsync(
      FIXED_GIT_PATH,
      [
        "-C",
        targetPath,
        "-c",
        "advice.detachedHead=false",
        "checkout",
        "--detach",
        commitSha
      ],
      {
        encoding: "utf8",
        maxBuffer: 64 * 1024 * 1024,
        env: gitSubprocessEnvironment()
      }
    );
    if (remoteUrl) {
      await execFileAsync(
        FIXED_GIT_PATH,
        [
          "-C",
          targetPath,
          "remote",
          "set-url",
          "origin",
          remoteUrl
        ],
        {
          encoding: "utf8",
          maxBuffer: 64 * 1024 * 1024,
          env: gitSubprocessEnvironment()
        }
      );
    }
  } catch (error) {
    throw new Error(
      `RESTORE_GIT_BUNDLE_FAILED: ${error.stderr ?? error.message}`
    );
  }
}

async function assertTargetAbsent(targetPath, packageId) {
  try {
    await lstat(targetPath);
  } catch (error) {
    if (error.code === "ENOENT") return;
    throw error;
  }
  throw new Error(
    `RESTORE_TARGET_ALREADY_EXISTS: ${packageId}`
  );
}

async function assertRestoreParentSafe({
  repoRoot,
  targetPath,
  packageRecord
}) {
  const parentPath = dirname(targetPath);
  const resolvedParent = await realpath(parentPath);
  const relativePath = relative(repoRoot, targetPath)
    .split(sep)
    .join("/");
  if (
    OUTSIDE_CACHE_MIGRATION_SPECS.some(
      (spec) => spec.localPath === relativePath
    )
  ) {
    if (resolvedParent !== resolve(parentPath)) {
      throw new Error(
        `RESTORE_PARENT_SYMLINK_FORBIDDEN: ${packageRecord.packageId}`
      );
    }
    return;
  }
  const cacheRoot = await realpath(
    resolve(repoRoot, CACHE_RELATIVE_PATH)
  );
  const relativeParent = relative(
    cacheRoot,
    resolvedParent
  );
  if (
    relativeParent === ".." ||
    relativeParent.startsWith(`..${sep}`)
  ) {
    throw new Error(
      `RESTORE_PARENT_OUTSIDE_CACHE: ${packageRecord.packageId}`
    );
  }
}

function materializedCleanupActionTypes(packageRecord) {
  if (
    packageRecord.localRetentionPolicy !==
      "DELETE_AFTER_VERIFIED_MIGRATION" ||
    packageRecord.packageType ===
      "EMBEDDED_LICENSE_ARTIFACT"
  ) {
    return [];
  }
  if (
    packageRecord.packageType ===
    "PINNED_GIT_REPOSITORY"
  ) {
    return ["PACKAGE_REPOSITORY"];
  }
  return ["PACKAGE_CANONICAL_FILE"];
}

export function buildPackageHydrationRecord({
  packageRecord,
  result
}) {
  const previous = packageRecord.hydration ?? {};
  const previousGeneration =
    previous.materializationGeneration ?? 0;
  if (
    !Number.isSafeInteger(previousGeneration) ||
    previousGeneration < 0
  ) {
    throw new Error(
      `PACKAGE_MATERIALIZATION_GENERATION_INVALID: ${packageRecord.packageId}`
    );
  }
  const actionGenerations = {
    ...(
      previous.cleanupActionGenerationByType ??
      {}
    )
  };
  for (const [actionType, generation] of Object.entries(
    actionGenerations
  )) {
    if (
      ![
        "PACKAGE_CANONICAL_FILE",
        "PACKAGE_ORIGINAL_FILE",
        "PACKAGE_REPOSITORY"
      ].includes(actionType) ||
      !Number.isSafeInteger(generation) ||
      generation < 0 ||
      generation > previousGeneration
    ) {
      throw new Error(
        `PACKAGE_CLEANUP_GENERATION_INVALID: ${packageRecord.packageId}: ${actionType}`
      );
    }
  }
  const actionTypes =
    materializedCleanupActionTypes(packageRecord);
  if (
    actionTypes.length > 0 &&
    previousGeneration === Number.MAX_SAFE_INTEGER
  ) {
    throw new Error(
      `PACKAGE_MATERIALIZATION_GENERATION_EXHAUSTED: ${packageRecord.packageId}`
    );
  }
  const materializationGeneration =
    actionTypes.length > 0
      ? previousGeneration + 1
      : previousGeneration;
  for (const actionType of actionTypes) {
    actionGenerations[actionType] =
      materializationGeneration;
  }
  return {
    status: "HYDRATED_FROM_VERIFIED_S3_VERSION",
    ...result,
    materializationGeneration,
    cleanupActionGenerationByType:
      actionGenerations,
    materializedCleanupActionTypes: actionTypes
  };
}

export async function hydratePackage({
  repoRoot,
  manifest,
  packageId,
  destination,
  runner = defaultAwsRunner,
  executionContext = null,
  repositoryRestorer = defaultRepositoryRestorer,
  archiveMemberReader = readArchiveMember,
  now = () => new Date().toISOString()
}) {
  validateManifestDigest(manifest);
  const validated = validateResearchDestination(destination);
  const packageRecord = packageById(manifest, packageId);
  if (
    packageRecord.remote?.s3?.verificationStatus !== "VERIFIED" ||
    !packageRecord.remote.s3.versionId
  ) {
    throw new Error(
      `RESTORE_VERIFIED_REMOTE_REQUIRED: ${packageRecord.packageId}`
    );
  }
  assertPackageRemoteLocation(packageRecord, validated);
  await (
    executionContext ??
    verifyExecutionContext(validated, runner)
  );
  const targetPath = safeMigratablePath(
    repoRoot,
    packageRecord.localPath,
    packageRecord.packageId
  );
  const parentOwnedLicense =
    packageRecord.localRetentionPolicy ===
    PARENT_REPOSITORY_OWNED_RETENTION_POLICY;
  const embeddedLicense =
    packageRecord.packageType ===
    "EMBEDDED_LICENSE_ARTIFACT";
  if (
    (parentOwnedLicense || embeddedLicense) &&
    !(await pathExists(targetPath))
  ) {
    throw new Error(
      `${embeddedLicense ? "PARENT_PACKAGE_HYDRATION_REQUIRED" : "PARENT_REPOSITORY_HYDRATION_REQUIRED"}: ${packageRecord.packageId}: hydrate ${packageRecord.parentPackageId} first`
    );
  }
  if (!parentOwnedLicense && !embeddedLicense) {
    await assertTargetAbsent(
      targetPath,
      packageRecord.packageId
    );
  }
  const result = await withVerifiedRemoteVersion({
    repoRoot,
    destination: validated,
    packageRecord,
    runner,
    now,
    useTemporaryFile: async (temporaryPath, restoreProof) => {
      await mkdir(dirname(targetPath), { recursive: true });
      await assertRestoreParentSafe({
        repoRoot,
        targetPath,
        packageRecord
      });
      if (embeddedLicense) {
        const embedded =
          await verifyEmbeddedLicenseMember({
            repoRoot,
            manifest,
            packageRecord,
            archiveMemberReader
          });
        if (
          embedded.sha256 !==
            restoreProof.restoredSha256 ||
          embedded.sizeBytes !==
            restoreProof.restoredSizeBytes
        ) {
          throw new Error(
            `PARENT_PACKAGE_EMBEDDED_LICENSE_BYTES_MISMATCH: ${packageRecord.packageId}`
          );
        }
        return {
          ...restoreProof,
          hydrationMode:
            "VERIFIED_EXACT_MEMBER_FROM_HYDRATED_PARENT_PACKAGE",
          localPaths: [
            `${packageRecord.localPath}!/${packageRecord.embeddedMember.memberPath}`
          ]
        };
      }
      if (parentOwnedLicense) {
        const local = await verifyLocalPackage(
          repoRoot,
          packageRecord,
          targetPath
        );
        if (
          local.sha256 !== restoreProof.restoredSha256 ||
          local.sizeBytes !== restoreProof.restoredSizeBytes
        ) {
          throw new Error(
            `PARENT_REPOSITORY_LICENSE_BYTES_MISMATCH: ${packageRecord.packageId}`
          );
        }
        return {
          ...restoreProof,
          hydrationMode:
            "VERIFIED_EXACT_FILE_FROM_HYDRATED_PARENT_REPOSITORY",
          localPaths: [packageRecord.localPath]
        };
      }
      if (
        packageRecord.packageType ===
        "PINNED_GIT_REPOSITORY"
      ) {
        try {
          await repositoryRestorer({
            bundlePath: temporaryPath,
            targetPath,
            commitSha:
              packageRecord.fingerprint.commitSha,
            remoteUrl:
              packageRecord.content.remoteUrl
          });
          const identity =
            await gitRepositoryIdentity(targetPath);
          if (
            !repositoryIdentityMatches(
              packageRecord,
              identity
            )
          ) {
            throw new Error(
              `RESTORED_REPOSITORY_FINGERPRINT_MISMATCH: ${packageRecord.packageId}`
            );
          }
        } catch (error) {
          await rm(targetPath, {
            recursive: true,
            force: false
          }).catch(() => {});
          throw error;
        }
        return {
          ...restoreProof,
          hydrationMode:
            "CLONED_VERIFIED_GIT_BUNDLE",
          localPaths: [packageRecord.localPath]
        };
      }
      await link(temporaryPath, targetPath);
      return {
        ...restoreProof,
        hydrationMode: "EXACT_FILE_HARD_LINK",
        localPaths: [packageRecord.localPath]
      };
    }
  });
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
      "Hydration recreated local research input. Run final validation again and explicitly confirm no active consumers before any later cleanup."
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
  manifest.manifestContentSha256 = stableManifestDigest(manifest);
  return {
    disposition: "PACKAGE_HYDRATED_WITHOUT_OVERWRITE",
    packageId: packageRecord.packageId,
    ...packageRecord.hydration
  };
}

export function packageHydrationOrder(manifest) {
  validateManifestDigest(manifest);
  const packagesById = new Map(
    manifest.packages.map((packageRecord) => [
      packageRecord.packageId,
      packageRecord
    ])
  );
  const remainingDependencies = new Map();
  const children = new Map();
  for (const packageRecord of manifest.packages) {
    const dependency =
      packageRecord.localLifecycle?.ownerPackageId ??
      null;
    const dependencies = new Set(
      dependency ? [dependency] : []
    );
    for (const dependencyId of dependencies) {
      if (!packagesById.has(dependencyId)) {
        throw new Error(
          `PACKAGE_HYDRATION_DEPENDENCY_MISSING: ${packageRecord.packageId}: ${dependencyId}`
        );
      }
      const dependents =
        children.get(dependencyId) ?? new Set();
      dependents.add(packageRecord.packageId);
      children.set(dependencyId, dependents);
    }
    remainingDependencies.set(
      packageRecord.packageId,
      dependencies
    );
  }
  const ready = [...remainingDependencies.entries()]
    .filter(([, dependencies]) => dependencies.size === 0)
    .map(([packageId]) => packageId)
    .sort();
  const order = [];
  while (ready.length > 0) {
    const packageId = ready.shift();
    order.push(packageId);
    for (const childId of children.get(packageId) ?? []) {
      const dependencies =
        remainingDependencies.get(childId);
      dependencies.delete(packageId);
      if (dependencies.size === 0) {
        ready.push(childId);
        ready.sort();
      }
    }
  }
  if (order.length !== manifest.packages.length) {
    throw new Error(
      "PACKAGE_HYDRATION_DEPENDENCY_CYCLE"
    );
  }
  return order;
}

export async function hydrateAllPackages({
  repoRoot,
  manifest,
  destination,
  runner = defaultAwsRunner,
  repositoryRestorer = defaultRepositoryRestorer,
  archiveMemberReader = readArchiveMember,
  now = () => new Date().toISOString()
}) {
  validateManifestDigest(manifest);
  const validated = validateResearchDestination(destination);
  const executionContext = await verifyExecutionContext(
    validated,
    runner
  );
  const order = packageHydrationOrder(manifest);
  const results = [];
  for (const packageId of order) {
    const packageRecord = packageById(manifest, packageId);
    if (
      packageRecord.localRetentionPolicy ===
      "RETAIN_SOURCE_CONTROLLED_FIXTURE"
    ) {
      const local = await verifyLocalPackage(
        repoRoot,
        packageRecord
      );
      results.push({
        disposition:
          "SOURCE_CONTROLLED_PACKAGE_ALREADY_LOCAL_VERIFIED",
        packageId,
        localPaths: [packageRecord.localPath],
        sha256: local.sha256,
        sizeBytes: local.sizeBytes
      });
      continue;
    }
    results.push(
      await hydratePackage({
        repoRoot,
        manifest,
        packageId,
        destination: validated,
        runner,
        executionContext,
        repositoryRestorer,
        archiveMemberReader,
        now
      })
    );
  }
  manifest.execution.lastBatchHydration = {
    hydratedAt: now(),
    packageCount: results.length,
    order,
    results
  };
  manifest.manifestContentSha256 =
    stableManifestDigest(manifest);
  return {
    disposition:
      "ALL_PACKAGES_HYDRATED_IN_DEPENDENCY_ORDER",
    packageCount: results.length,
    order,
    results
  };
}

async function defaultGitRunner(repoRoot, args) {
  try {
    const { stdout, stderr } = await execFileAsync(
      FIXED_GIT_PATH,
      ["-C", repoRoot, ...args],
      {
        encoding: "utf8",
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

async function defaultValidationRunner(repoRoot, command) {
  return runFullOfflineResearchValidation({
    repoRoot,
    command
  });
}

async function defaultProofValidationRunner(repoRoot) {
  const ledger = await buildProofLedger({ repoRoot });
  validateProofLedger(ledger);
  return {
    status: ledger.executionVerification.status,
    runId: ledger.executionVerification.runId,
    recordContentSha256:
      ledger.executionVerification.recordContentSha256,
    processWideNetworkIsolationVerified:
      ledger.executionVerification.networkEnforcement
        ?.processWideNetworkIsolationVerified === true
  };
}

function successfulGitOutput(result, operation) {
  if (result.exitCode !== 0) {
    throw new Error(
      `${operation}_FAILED: ${String(result.stderr ?? "").trim() || `exit ${result.exitCode}`}`
    );
  }
  return result.stdout;
}

async function repositoryValidationIdentity({
  repoRoot,
  manifestPath,
  manifest,
  gitRunner,
  allowDirtyRelativePaths = []
}) {
  const manifestRelativePath = relative(
    repoRoot,
    resolve(manifestPath)
  )
    .split(sep)
    .join("/");
  const excludedRelativePaths = [
    manifestRelativePath,
    ...(manifest.localArtifactAudit
      ? [DEFAULT_REPORT_RELATIVE_PATH]
      : [])
  ].sort();
  const excludedPathSet = new Set(excludedRelativePaths);
  const [headResult, treeResult, statusResult] =
    await Promise.all([
      gitRunner(repoRoot, ["rev-parse", "HEAD"]),
      gitRunner(repoRoot, [
        "ls-tree",
        "-r",
        "-z",
        "--full-tree",
        "HEAD"
      ]),
      gitRunner(repoRoot, [
        "status",
        "--porcelain=v1",
        "-z",
        "--untracked-files=all"
      ])
    ]);
  const status = successfulGitOutput(
    statusResult,
    "VALIDATION_GIT_STATUS"
  );
  const allowedDirtyPaths = new Set(
    allowDirtyRelativePaths
  );
  const statusEntries = status
    .split("\u0000")
    .filter(Boolean);
  const dirtyPaths = [];
  for (let index = 0; index < statusEntries.length; index += 1) {
    const entry = statusEntries[index];
    if (
      entry.length < 4 ||
      entry[2] !== " "
    ) {
      throw new Error(
        "VALIDATION_GIT_STATUS_FORMAT_INVALID"
      );
    }
    dirtyPaths.push(entry.slice(3));
    if (
      ["R", "C"].includes(entry[0]) ||
      ["R", "C"].includes(entry[1])
    ) {
      const sourcePath = statusEntries[index + 1];
      if (!sourcePath) {
        throw new Error(
          "VALIDATION_GIT_STATUS_RENAME_INVALID"
        );
      }
      dirtyPaths.push(sourcePath);
      index += 1;
    }
  }
  if (
    dirtyPaths.some(
      (path) => !allowedDirtyPaths.has(path)
    )
  ) {
    throw new Error(
      "VALIDATION_REPOSITORY_NOT_CLEAN: commit or remove every tracked and untracked repository change before final cleanup validation"
    );
  }
  const listing = successfulGitOutput(
    treeResult,
    "VALIDATION_GIT_TREE"
  );
  const retainedEntries = listing
    .split("\u0000")
    .filter(Boolean)
    .filter(
      (entry) =>
        !excludedPathSet.has(
          entry.slice(entry.indexOf("\t") + 1)
        )
    )
    .sort();
  const canonicalListing = retainedEntries.length
    ? `${retainedEntries.join("\u0000")}\u0000`
    : "";
  return {
    headCommit: successfulGitOutput(
      headResult,
      "VALIDATION_GIT_HEAD"
    ).trim(),
    repositoryTreeDigest: createHash("sha256")
      .update(canonicalListing)
      .digest("hex"),
    manifestRelativePath,
    excludedRelativePaths
  };
}

function assertAllRemoteVersionsRecorded(manifest) {
  const blocked = [];
  for (const packageRecord of manifest.packages) {
    const remote = packageRecord.remote?.s3;
    const eligibility = packageRecord.cleanupEligibility;
    if (
      packageRecord.plannedObject?.uploadReady !== true ||
      remote?.verificationStatus !== "VERIFIED" ||
      !remote.versionId ||
      remote.contentType !==
        packageRecord.plannedObject.contentType ||
      eligibility?.restoredVersionId !== remote.versionId ||
      eligibility?.restoredSha256 !==
        packageRecord.plannedObject.expectedSha256 ||
      (
        packageRecord.packageType ===
          "PINNED_GIT_REPOSITORY" &&
        (
          eligibility.repositorySemanticRestoreStatus !==
            "VERIFIED" ||
          !repositoryIdentityMatches(
            packageRecord,
            eligibility.restoredRepositoryIdentity ??
              {}
          )
        )
      )
    ) {
      blocked.push(packageRecord.packageId);
    }
  }
  if (blocked.length) {
    throw new Error(
      `FINAL_VALIDATION_REMOTE_PROOF_REQUIRED: ${blocked.join(", ")}`
    );
  }
}

export async function recordAllCleanupValidation({
  repoRoot,
  manifestPath,
  manifest,
  validationCommand,
  confirmNoActiveConsumers,
  gitRunner = defaultGitRunner,
  validationRunner = defaultValidationRunner,
  proofValidationRunner = defaultProofValidationRunner,
  now = () => new Date().toISOString()
}) {
  validateManifestDigest(manifest);
  if (confirmNoActiveConsumers !== true) {
    throw new Error(
      "NO_ACTIVE_CONSUMERS_CONFIRMATION_REQUIRED: pass --confirm-no-active-consumers"
    );
  }
  if (validationCommand !== FINAL_CLEANUP_VALIDATION_COMMAND) {
    throw new Error(
      "FIXED_VALIDATION_COMMAND_REQUIRED: cleanup readiness only accepts the committed operational-savings validation sequence"
    );
  }
  await assertManifestCleanCommitted({
    repoRoot,
    manifestPath,
    gitRunner
  });
  await assertLivePostHocReplayReceipt({
    repoRoot,
    manifest
  });
  assertAllRemoteVersionsRecorded(manifest);
  const proofValidation =
    await proofValidationRunner(repoRoot);
  if (
    proofValidation?.status !==
      "CURRENT_LOCAL_CONTENT_BOUND_PASS" ||
    typeof proofValidation.runId !== "string" ||
    !proofValidation.runId ||
    !/^[a-f0-9]{64}$/.test(
      proofValidation.recordContentSha256 ?? ""
    ) ||
    proofValidation
      .processWideNetworkIsolationVerified !== true
  ) {
    throw new Error(
      "CURRENT_CONTENT_BOUND_PROOF_REQUIRED: run the complete deny-network real suite and commit its current proof execution record before cleanup validation"
    );
  }
  const before = await repositoryValidationIdentity({
    repoRoot,
    manifestPath,
    manifest,
    gitRunner
  });
  const validation = await validationRunner(
    repoRoot,
    validationCommand
  );
  if (validation.exitCode !== 0) {
    throw new Error(
      `FINAL_VALIDATION_FAILED: ${String(validation.stderr ?? "").trim() || `exit ${validation.exitCode}`}`
    );
  }
  const after = await repositoryValidationIdentity({
    repoRoot,
    manifestPath,
    manifest,
    gitRunner
  });
  if (
    before.headCommit !== after.headCommit ||
    before.repositoryTreeDigest !==
      after.repositoryTreeDigest
  ) {
    throw new Error(
      "FINAL_VALIDATION_CHANGED_REPOSITORY: final validation must leave the committed source tree unchanged"
    );
  }
  const timestamp = now();
  if (manifest.execution.lastEcrRestoreReplay) {
    manifest.execution.lastEcrRestoreReplay.status =
      "INVALIDATED_BY_NEW_FINAL_VALIDATION";
    manifest.execution.lastEcrRestoreReplay.invalidatedBy = {
      validationCompletedAt: timestamp
    };
  }
  for (const packageRecord of manifest.packages) {
    const eligibility = packageRecord.cleanupEligibility;
    const validatedConsumerPaths = [
      ...new Set([
        ...(eligibility.activeConsumerPaths ?? []),
        ...(eligibility.validatedConsumerPaths ?? [])
      ])
    ].sort();
    Object.assign(eligibility, {
      status: "ELIGIBLE",
      activeConsumerPaths: [],
      validatedConsumerPaths,
      validationCommand,
      validationStatus: "PASSED",
      validatedAt: timestamp,
      validatedSourceCommit: before.headCommit,
      validatedRepositoryTreeDigest:
        before.repositoryTreeDigest,
      blocker: null
    });
  }
  manifest.execution.finalCleanupValidation = {
    status: "PASSED",
    validationCommand,
    validatedAt: timestamp,
    validatedSourceCommit: before.headCommit,
    validatedRepositoryTreeDigest:
      before.repositoryTreeDigest,
    repositoryTreeDigestSchemaVersion:
      "git-ls-tree-r-nul-v1",
    repositoryTreeDigestExcludedPaths: [
      ...before.excludedRelativePaths
    ],
    noActiveConsumersConfirmed: true,
    proofExecution: proofValidation,
    packageCount: manifest.packages.length
  };
  manifest.manifestContentSha256 = stableManifestDigest(manifest);
  return {
    disposition: "ALL_PACKAGES_MARKED_CLEANUP_ELIGIBLE",
    packageCount: manifest.packages.length,
    validation:
      manifest.execution.finalCleanupValidation
  };
}

async function assertValidationStillCurrent({
  repoRoot,
  manifestPath,
  manifest,
  gitRunner
}) {
  const recorded = manifest.execution?.finalCleanupValidation;
  if (
    recorded?.status !== "PASSED" ||
    recorded.noActiveConsumersConfirmed !== true ||
    !recorded.validatedSourceCommit ||
    !recorded.validatedRepositoryTreeDigest ||
    recorded.repositoryTreeDigestSchemaVersion !==
      "git-ls-tree-r-nul-v1" ||
    !Array.isArray(
      recorded.repositoryTreeDigestExcludedPaths
    ) ||
    recorded.repositoryTreeDigestExcludedPaths.length < 1 ||
    recorded.repositoryTreeDigestExcludedPaths.length > 2
  ) {
    throw new Error(
      "FINAL_CLEANUP_VALIDATION_REQUIRED: commit a successful final tests/build validation before cleanup"
    );
  }
  await assertLivePostHocReplayReceipt({
    repoRoot,
    manifest
  });
  const current = await repositoryValidationIdentity({
    repoRoot,
    manifestPath,
    manifest,
    gitRunner,
    allowDirtyRelativePaths:
      relative(repoRoot, resolve(manifestPath))
        .split(sep)
        .join("/") === DEFAULT_MANIFEST_RELATIVE_PATH
        ? [DEFAULT_MANIFEST_RELATIVE_PATH]
        : []
  });
  if (
    recorded.repositoryTreeDigestExcludedPaths.length !==
      current.excludedRelativePaths.length ||
    recorded.repositoryTreeDigestExcludedPaths.some(
      (path, index) =>
        path !== current.excludedRelativePaths[index]
    )
  ) {
    throw new Error(
      "FINAL_VALIDATION_EXCLUSION_MISMATCH: only committed cleanup control outputs may be excluded from the repository tree digest"
    );
  }
  if (
    current.repositoryTreeDigest !==
    recorded.validatedRepositoryTreeDigest
  ) {
    throw new Error(
      "FINAL_VALIDATION_SOURCE_CHANGED: repository source changed after final validation"
    );
  }
  const ancestry = await gitRunner(repoRoot, [
    "merge-base",
    "--is-ancestor",
    recorded.validatedSourceCommit,
    current.headCommit
  ]);
  if (ancestry.exitCode !== 0) {
    throw new Error(
      "FINAL_VALIDATION_COMMIT_NOT_ANCESTOR: validated source commit is not an ancestor of the cleanup commit"
    );
  }
  const changes = successfulGitOutput(
    await gitRunner(repoRoot, [
      "diff",
      "--name-only",
      recorded.validatedSourceCommit,
      current.headCommit
    ]),
    "FINAL_VALIDATION_COMMIT_DIFF"
  )
    .split("\n")
    .filter(Boolean);
  if (
    changes.some(
      (path) =>
        !current.excludedRelativePaths.includes(path)
    )
  ) {
    throw new Error(
      "FINAL_VALIDATION_COMMIT_CHANGED_SOURCE: only committed cleanup control outputs may differ from the validated source commit"
    );
  }
  return current;
}

async function assertPendingCleanupRecoveryMayProceed({
  repoRoot,
  manifestPath,
  manifest,
  gitRunner
}) {
  const recorded = manifest.execution?.finalCleanupValidation;
  if (
    recorded?.status !== "PASSED" ||
    recorded.noActiveConsumersConfirmed !== true ||
    !recorded.validatedSourceCommit
  ) {
    throw new Error(
      "PENDING_CLEANUP_RECOVERY_VALIDATION_REQUIRED"
    );
  }
  await assertManifestCleanCommitted({
    repoRoot,
    manifestPath,
    gitRunner
  });
  const current = await repositoryValidationIdentity({
    repoRoot,
    manifestPath,
    manifest,
    gitRunner
  });
  const ancestry = await gitRunner(repoRoot, [
    "merge-base",
    "--is-ancestor",
    recorded.validatedSourceCommit,
    current.headCommit
  ]);
  if (ancestry.exitCode !== 0) {
    throw new Error(
      "PENDING_CLEANUP_RECOVERY_VALIDATION_NOT_ANCESTOR"
    );
  }
  const changes = successfulGitOutput(
    await gitRunner(repoRoot, [
      "diff",
      "--name-only",
      recorded.validatedSourceCommit,
      current.headCommit
    ]),
    "PENDING_CLEANUP_RECOVERY_COMMIT_DIFF"
  )
    .split("\n")
    .filter(Boolean);
  const disallowed = changes.filter(
    (path) =>
      !PENDING_CLEANUP_RECOVERY_ALLOWED_COMMITTED_PATHS.has(
        path
      )
  );
  if (disallowed.length > 0) {
    throw new Error(
      `PENDING_CLEANUP_RECOVERY_SOURCE_SCOPE_CHANGED: ${disallowed.join(",")}`
    );
  }
  return current;
}

async function defaultRepositoryDelete({
  repositoryPath,
  archivePath,
  quarantineAlreadyRenamed = false
}) {
  if (
    quarantineAlreadyRenamed !== true ||
    archivePath !== null
  ) {
    throw new Error(
      "REPOSITORY_DELETE_REQUIRES_CHECKPOINTED_QUARANTINE"
    );
  }
  await rm(repositoryPath, {
    recursive: true,
    force: false
  });
}

async function assertTrackedFileCleanCommitted({
  repoRoot,
  path,
  gitRunner,
  outsideErrorCode,
  errorCode,
  errorMessage
}) {
  const relativePath = relative(repoRoot, resolve(path));
  if (
    relativePath === ".." ||
    relativePath.startsWith(`..${sep}`)
  ) {
    throw new Error(outsideErrorCode);
  }
  const checks = [
    ["ls-files", "--error-unmatch", "--", relativePath],
    ["diff", "--quiet", "--", relativePath],
    ["diff", "--cached", "--quiet", "--", relativePath]
  ];
  for (const args of checks) {
    const result = await gitRunner(repoRoot, args);
    if (result.exitCode !== 0) {
      throw new Error(`${errorCode}: ${errorMessage}`);
    }
  }
  return true;
}

export async function assertManifestCleanCommitted({
  repoRoot,
  manifestPath,
  gitRunner = defaultGitRunner
}) {
  return assertTrackedFileCleanCommitted({
    repoRoot,
    path: manifestPath,
    gitRunner,
    outsideErrorCode: "MANIFEST_OUTSIDE_REPOSITORY",
    errorCode: "MANIFEST_NOT_CLEAN_COMMITTED",
    errorMessage:
      "track, commit, and leave the migration manifest unchanged before cleanup"
  });
}

function localCleanupJournal(manifest) {
  manifest.execution ??= {};
  manifest.execution.localCleanupJournal ??= {
    schemaVersion: LOCAL_CLEANUP_JOURNAL_SCHEMA_VERSION,
    status: "IN_PROGRESS",
    pendingAction: null,
    completedActions: []
  };
  const journal = manifest.execution.localCleanupJournal;
  if (
    journal.schemaVersion !==
      LOCAL_CLEANUP_JOURNAL_SCHEMA_VERSION ||
    !["IN_PROGRESS", "COMPLETE"].includes(journal.status) ||
    !Array.isArray(journal.completedActions)
  ) {
    throw new Error("LOCAL_CLEANUP_JOURNAL_INVALID");
  }
  return journal;
}

async function assertCleanupManifestMayProceed({
  repoRoot,
  manifestPath,
  manifest,
  gitRunner
}) {
  const journal =
    manifest.execution?.localCleanupJournal ?? null;
  if (
    !journal ||
    (
      journal.status === "COMPLETE" &&
      journal.pendingAction === null
    )
  ) {
    return assertManifestCleanCommitted({
      repoRoot,
      manifestPath,
      gitRunner
    });
  }
  localCleanupJournal(manifest);
  const relativePath = relative(
    repoRoot,
    resolve(manifestPath)
  )
    .split(sep)
    .join("/");
  if (relativePath !== DEFAULT_MANIFEST_RELATIVE_PATH) {
    throw new Error(
      "LOCAL_CLEANUP_RESUME_REQUIRES_FIXED_MANIFEST_PATH"
    );
  }
  for (const args of [
    ["ls-files", "--error-unmatch", "--", relativePath],
    ["diff", "--cached", "--quiet", "--", relativePath]
  ]) {
    const result = await gitRunner(repoRoot, args);
    if (result.exitCode !== 0) {
      throw new Error(
        "LOCAL_CLEANUP_RESUME_MANIFEST_NOT_TRACKED_OR_STAGED"
      );
    }
  }
  return true;
}

function cleanupActionIdentity(action) {
  const identity = {
    schemaVersion: LOCAL_CLEANUP_JOURNAL_SCHEMA_VERSION,
    ownerType: action.ownerType,
    ownerId: action.ownerId,
    actionType: action.actionType,
    targetPath: action.targetPath,
    expected: action.expected
  };
  const materializationGeneration =
    action.materializationGeneration ?? 0;
  if (
    !Number.isSafeInteger(materializationGeneration) ||
    materializationGeneration < 0
  ) {
    throw new Error(
      `LOCAL_MATERIALIZATION_GENERATION_INVALID: ${action.ownerId}: ${action.actionType}`
    );
  }
  if (materializationGeneration > 0) {
    identity.materializationGeneration =
      materializationGeneration;
  }
  return sha256CanonicalJson(identity);
}

function cleanupQuarantinePath(targetPath, actionId) {
  return join(
    dirname(targetPath),
    `.${basename(targetPath)}.retrofi-cleanup-${actionId.slice(0, 20)}`
  );
}

async function assertExistingPackageCleanupQuarantinePath({
  repoRoot,
  packageRecord,
  action,
  path
}) {
  const expectedTargetPath = safeLocalPackagePath(
    repoRoot,
    packageRecord
  );
  const expectedActionId = cleanupActionIdentity(action);
  const expectedQuarantinePath = cleanupQuarantinePath(
    expectedTargetPath,
    expectedActionId
  );
  if (
    action.actionType !== "PACKAGE_CANONICAL_FILE" ||
    action.targetPath !== expectedTargetPath ||
    action.actionId !== expectedActionId ||
    action.quarantinePath !== expectedQuarantinePath ||
    path !== expectedQuarantinePath ||
    !isAbsolute(path) ||
    resolve(path) !== path ||
    dirname(path) !== dirname(expectedTargetPath)
  ) {
    throw new Error(
      `PACKAGE_CLEANUP_QUARANTINE_IDENTITY_INVALID: ${packageRecord.packageId}: ${path}`
    );
  }
  const details = await lstat(path);
  if (details.isSymbolicLink()) {
    throw new Error(
      `PACKAGE_CLEANUP_QUARANTINE_SYMLINK_FORBIDDEN: ${packageRecord.packageId}: ${path}`
    );
  }
  const [repoRootRealPath, parentRealPath, pathRealPath] =
    await Promise.all([
      realpath(repoRoot),
      realpath(dirname(path)),
      realpath(path)
    ]);
  const expectedParentRealPath = resolve(
    repoRootRealPath,
    relative(repoRoot, dirname(expectedTargetPath))
  );
  const expectedPathRealPath = join(
    expectedParentRealPath,
    basename(expectedQuarantinePath)
  );
  if (
    parentRealPath !== expectedParentRealPath ||
    pathRealPath !== expectedPathRealPath
  ) {
    throw new Error(
      `PACKAGE_CLEANUP_QUARANTINE_PATH_ESCAPE: ${packageRecord.packageId}: ${path}`
    );
  }
  return pathRealPath;
}

async function checkpointCleanupJournal({
  manifestPath,
  manifest,
  expectedSourceSha256,
  checkpointManifest,
  mutate
}) {
  mutate(localCleanupJournal(manifest));
  manifest.manifestContentSha256 =
    stableManifestDigest(manifest);
  const written = await checkpointManifest({
    manifestPath,
    manifest,
    expectedSourceSha256
  });
  if (
    !written ||
    typeof written.sourceSha256 !== "string"
  ) {
    throw new Error(
      "LOCAL_CLEANUP_CHECKPOINT_RESULT_INVALID"
    );
  }
  return written.sourceSha256;
}

async function cleanupCheckpointSourceSha256(
  manifestPath,
  expectedSourceSha256
) {
  const source = await readFile(manifestPath, "utf8");
  const actual = bytesDigest(source);
  if (
    expectedSourceSha256 &&
    actual !== expectedSourceSha256
  ) {
    throw new Error(
      "MANIFEST_CONCURRENT_CHANGE: refusing cleanup with a manifest changed after it was read"
    );
  }
  return actual;
}

function pendingCleanupActionForPlan(manifest, action) {
  const pending =
    manifest.execution?.localCleanupJournal?.pendingAction ??
    null;
  if (!pending) return null;
  if (
    pending.actionId !== action.actionId ||
    pending.ownerType !== action.ownerType ||
    pending.ownerId !== action.ownerId ||
    pending.actionType !== action.actionType ||
    pending.targetPath !== action.targetPath ||
    pending.quarantinePath !== action.quarantinePath ||
    (pending.materializationGeneration ?? 0) !==
      (action.materializationGeneration ?? 0) ||
    sha256CanonicalJson(pending.expected) !==
      sha256CanonicalJson(action.expected) ||
    !["PENDING", "QUARANTINED"].includes(pending.state)
  ) {
    throw new Error(
      `LOCAL_CLEANUP_PENDING_ACTION_MISMATCH: ${pending.actionId}`
    );
  }
  return pending;
}

function completedCleanupAction(manifest, actionId) {
  return (
    manifest.execution?.localCleanupJournal?.completedActions ??
    []
  ).find((entry) => entry.actionId === actionId);
}

function packageCleanupActionGeneration(
  packageRecord,
  actionType
) {
  const generation =
    packageRecord.hydration
      ?.cleanupActionGenerationByType?.[actionType] ?? 0;
  const materializationGeneration =
    packageRecord.hydration
      ?.materializationGeneration ?? 0;
  if (
    !Number.isSafeInteger(generation) ||
    generation < 0 ||
    !Number.isSafeInteger(materializationGeneration) ||
    materializationGeneration < 0 ||
    generation > materializationGeneration
  ) {
    throw new Error(
      `PACKAGE_CLEANUP_GENERATION_INVALID: ${packageRecord.packageId}: ${actionType}`
    );
  }
  return generation;
}

function completedPackageCleanupActionForCurrentGeneration({
  manifest,
  packageRecord,
  actionTypes
}) {
  return (
    manifest.execution?.localCleanupJournal?.completedActions ??
    []
  ).some(
    (action) =>
      action.ownerId === packageRecord.packageId &&
      actionTypes.includes(action.actionType) &&
      action.state === "COMPLETED" &&
      (action.materializationGeneration ?? 0) ===
        packageCleanupActionGeneration(
          packageRecord,
          action.actionType
        )
  );
}

function assertPackageCleanupEligibility(
  packageRecord,
  finalValidation
) {
  const eligibility = packageRecord.cleanupEligibility;
  if (
    eligibility?.status !== "ELIGIBLE" ||
    eligibility.validationStatus !== "PASSED" ||
    !eligibility.validatedAt ||
    eligibility.validatedSourceCommit !==
      finalValidation.validatedSourceCommit ||
    eligibility.validatedRepositoryTreeDigest !==
      finalValidation.validatedRepositoryTreeDigest ||
    !Array.isArray(eligibility.activeConsumerPaths) ||
    eligibility.activeConsumerPaths.length !== 0
  ) {
    throw new Error(
      `PACKAGE_CLEANUP_ELIGIBILITY_REQUIRED: ${packageRecord.packageId}`
    );
  }
  if (
    eligibility.restoredVersionId !==
      packageRecord.remote?.s3?.versionId ||
    eligibility.restoredSha256 !==
      packageRecord.plannedObject?.expectedSha256
  ) {
    throw new Error(
      `PACKAGE_COMMITTED_RESTORE_PROOF_REQUIRED: ${packageRecord.packageId}`
    );
  }
  if (
    packageRecord.packageType ===
      "PINNED_GIT_REPOSITORY" &&
    (
      eligibility.repositorySemanticRestoreStatus !==
        "VERIFIED" ||
      !repositoryIdentityMatches(
        packageRecord,
        eligibility.restoredRepositoryIdentity ?? {}
      )
    )
  ) {
    throw new Error(
      `PACKAGE_REPOSITORY_SEMANTIC_RESTORE_PROOF_REQUIRED: ${packageRecord.packageId}`
    );
  }
}

async function verifyOriginalLocalArtifact(
  manifest,
  packageRecord,
  origin,
  path = origin?.path
) {
  if (
    !origin ||
    !isAbsolute(origin.path) ||
    origin.relation !==
      "EXACT_BYTE_SOURCE_FOR_CANONICAL_CACHE_COPY" ||
    origin.cleanupStatus !== "LOCAL_RETAINED" ||
    !Number.isSafeInteger(origin.expectedSizeBytes) ||
    typeof origin.expectedSha256 !== "string"
  ) {
    throw new Error(
      `ORIGINAL_LOCAL_ARTIFACT_RECORD_INVALID: ${packageRecord.packageId}`
    );
  }
  const allowedRoot = "/private/tmp";
  const resolvedPath = resolve(path);
  const rootRelativePath = relative(
    allowedRoot,
    resolvedPath
  );
  if (
    resolvedPath === allowedRoot ||
    rootRelativePath === ".." ||
    rootRelativePath.startsWith(`..${sep}`)
  ) {
    throw new Error(
      `UNSAFE_ORIGINAL_LOCAL_ARTIFACT_PATH: ${origin.path}`
    );
  }
  const linked = manifest.originalLocalArtifacts?.find(
    (candidate) =>
      candidate.path === origin.path &&
      candidate.canonicalPackageId ===
        packageRecord.packageId &&
      candidate.canonicalLocalPath ===
        packageRecord.localPath &&
      candidate.expectedSizeBytes ===
        origin.expectedSizeBytes &&
      candidate.expectedSha256 === origin.expectedSha256 &&
      candidate.cleanupStatus === origin.cleanupStatus
  );
  if (!linked) {
    throw new Error(
      `ORIGINAL_LOCAL_ARTIFACT_LINKAGE_INVALID: ${origin.path}`
    );
  }
  const realPath = await realpath(resolvedPath);
  if (realPath !== resolvedPath) {
    throw new Error(
      `ORIGINAL_LOCAL_ARTIFACT_SYMLINK_FORBIDDEN: ${origin.path}`
    );
  }
  const details = await lstat(realPath);
  if (!details.isFile() || details.isSymbolicLink()) {
    throw new Error(
      `ORIGINAL_LOCAL_ARTIFACT_FILE_REQUIRED: ${origin.path}`
    );
  }
  if (details.size !== origin.expectedSizeBytes) {
    throw new Error(
      `ORIGINAL_LOCAL_ARTIFACT_SIZE_MISMATCH: ${origin.path}`
    );
  }
  const digest = await sha256Path(realPath);
  if (digest !== origin.expectedSha256) {
    throw new Error(
      `ORIGINAL_LOCAL_ARTIFACT_CHECKSUM_MISMATCH: ${origin.path}`
    );
  }
  return { ...origin, realPath };
}

function recordOriginalLocalArtifactCleanup({
  manifest,
  packageRecord,
  originPath,
  deletedAt
}) {
  const packageOrigin =
    packageRecord.originalLocalArtifacts?.find(
      (entry) => entry.path === originPath
    );
  const manifestOrigin =
    manifest.originalLocalArtifacts?.find(
      (entry) =>
        entry.path === originPath &&
        entry.canonicalPackageId === packageRecord.packageId
    );
  if (!packageOrigin || !manifestOrigin) {
    throw new Error(
      `ORIGINAL_LOCAL_ARTIFACT_LINKAGE_INVALID: ${originPath}`
    );
  }
  for (const entry of [packageOrigin, manifestOrigin]) {
    entry.cleanupStatus =
      "LOCAL_DELETED_AFTER_REMOTE_VERIFICATION";
    entry.deletedAt = deletedAt;
  }
}

function assertPackageRemoteLocation(
  packageRecord,
  destination
) {
  const expectedS3Uri =
    `s3://${destination.bucket}/${packageRecord.plannedObject.key}`;
  if (
    packageRecord.remote?.s3?.bucket !== destination.bucket ||
    packageRecord.remote?.s3?.key !==
      packageRecord.plannedObject.key ||
    packageRecord.remote?.s3?.s3Uri !== expectedS3Uri ||
    packageRecord.s3Uri !== expectedS3Uri
  ) {
    throw new Error(
      `MANIFEST_REMOTE_LOCATION_MISMATCH: ${packageRecord.packageId}`
    );
  }
}

function assertCleanupManifestPackageReady(
  packageRecord,
  manifest,
  destination
) {
  assertPackageRemoteLocation(packageRecord, destination);
  assertPackageCleanupEligibility(
    packageRecord,
    manifest.execution.finalCleanupValidation
  );
  if (
    packageRecord.remote?.s3?.verificationStatus !== "VERIFIED" ||
    !packageRecord.remote.s3.versionId
  ) {
    throw new Error(
      `MANIFEST_REMOTE_VERIFICATION_REQUIRED: ${packageRecord.packageId}`
    );
  }
  if (
    ![
      "DELETE_AFTER_VERIFIED_MIGRATION",
      "RETAIN_SOURCE_CONTROLLED_FIXTURE",
      PARENT_REPOSITORY_OWNED_RETENTION_POLICY
    ].includes(packageRecord.localRetentionPolicy)
  ) {
    throw new Error(
      `UNKNOWN_LOCAL_RETENTION_POLICY: ${packageRecord.packageId}`
    );
  }
}

async function verifyRepositoryPackageIdentity(
  repoRoot,
  packageRecord,
  path = null
) {
  if (
    packageRecord.packageType !== "PINNED_GIT_REPOSITORY"
  ) {
    return null;
  }
  const repositoryPath =
    path ??
    safePathWithinCache(
      repoRoot,
      packageRecord.localPath,
      packageRecord.packageId
    );
  await assertExistingMigratablePath(
    repoRoot,
    repositoryPath,
    packageRecord.packageId
  );
  const identity = await gitRepositoryIdentity(repositoryPath);
  if (!repositoryIdentityMatches(packageRecord, identity)) {
    throw new Error(
      `REPOSITORY_FINGERPRINT_MISMATCH: ${packageRecord.packageId}`
    );
  }
  return { repositoryPath, identity };
}

async function preflightPackageRemoteProof({
  repoRoot,
  packageRecord,
  destination,
  runner,
  now
}) {
  const remote = await readRemoteObject(
    destination,
    packageRecord.plannedObject.key,
    {
      runner,
      versionId: packageRecord.remote.s3.versionId
    }
  );
  const verified = verifyRemoteObject(remote, {
    sizeBytes:
      packageRecord.plannedObject.expectedSizeBytes,
    sha256: packageRecord.plannedObject.expectedSha256,
    contentType: packageRecord.plannedObject.contentType
  });
  if (verified.versionId !== packageRecord.remote.s3.versionId) {
    throw new Error(
      `REMOTE_VERSION_CHANGED: ${packageRecord.packageId}`
    );
  }
  const restoreProof = await proveRemoteVersionRestorable({
    repoRoot,
    destination,
    packageRecord,
    runner,
    now
  });
  if (
    restoreProof.restoredVersionId !==
      packageRecord.cleanupEligibility.restoredVersionId ||
    restoreProof.restoredSha256 !==
      packageRecord.cleanupEligibility.restoredSha256 ||
    (
      packageRecord.packageType ===
        "PINNED_GIT_REPOSITORY" &&
      (
        restoreProof.repositorySemanticRestoreStatus !==
          "VERIFIED" ||
        packageRecord.cleanupEligibility
          .repositorySemanticRestoreStatus !==
          "VERIFIED" ||
        !repositoryIdentityMatches(
          packageRecord,
          restoreProof.restoredRepositoryIdentity ?? {}
        ) ||
        !repositoryIdentityMatches(
          packageRecord,
          packageRecord.cleanupEligibility
            .restoredRepositoryIdentity ?? {}
        )
      )
    )
  ) {
    throw new Error(
      `RESTORE_PROOF_CHANGED: ${packageRecord.packageId}`
    );
  }
  return { remote: verified, restoreProof };
}

function packageCleanupActions({
  repoRoot,
  packageRecord
}) {
  const actions = [];
  for (const origin of
    packageRecord.originalLocalArtifacts ?? []) {
    actions.push({
      ...checkpointedFilesystemAction({
        ownerType: "PACKAGE",
        ownerId: packageRecord.packageId,
        actionType: "PACKAGE_ORIGINAL_FILE",
        targetPath: resolve(origin.path),
        materializationGeneration:
          packageCleanupActionGeneration(
            packageRecord,
            "PACKAGE_ORIGINAL_FILE"
          ),
        expected: {
          originalPath: origin.path,
          sizeBytes: origin.expectedSizeBytes,
          sha256: origin.expectedSha256
        }
      }),
      origin
    });
  }
  const localFilePath = safeLocalPackagePath(
    repoRoot,
    packageRecord
  );
  actions.push(
    checkpointedFilesystemAction({
      ownerType: "PACKAGE",
      ownerId: packageRecord.packageId,
      actionType: "PACKAGE_CANONICAL_FILE",
      targetPath: localFilePath,
      materializationGeneration:
        packageCleanupActionGeneration(
          packageRecord,
          "PACKAGE_CANONICAL_FILE"
        ),
      expected: {
        localPath:
          packageRecord.plannedObject.localFilePath ??
          packageRecord.localPath,
        sizeBytes:
          packageRecord.plannedObject.expectedSizeBytes,
        sha256:
          packageRecord.plannedObject.expectedSha256
      }
    })
  );
  if (
    packageRecord.packageType === "PINNED_GIT_REPOSITORY"
  ) {
    const repositoryPath = safePathWithinCache(
      repoRoot,
      packageRecord.localPath,
      packageRecord.packageId
    );
    actions.push(
      checkpointedFilesystemAction({
        ownerType: "PACKAGE",
        ownerId: packageRecord.packageId,
        actionType: "PACKAGE_REPOSITORY",
        targetPath: repositoryPath,
        materializationGeneration:
          packageCleanupActionGeneration(
            packageRecord,
            "PACKAGE_REPOSITORY"
          ),
        expected: {
          localPath: packageRecord.localPath,
          commitSha: packageRecord.fingerprint.commitSha,
          gitTreeObjectSha1:
            packageRecord.fingerprint.gitTreeObjectSha1,
          gitIndexListingSha256:
            packageRecord.fingerprint
              .gitIndexListingSha256
        }
      })
    );
  }
  return actions;
}

async function verifyPackageCleanupActionPath({
  repoRoot,
  manifest,
  packageRecord,
  action,
  path
}) {
  if (action.actionType === "PACKAGE_ORIGINAL_FILE") {
    return verifyOriginalLocalArtifact(
      manifest,
      packageRecord,
      action.origin,
      path
    );
  }
  if (action.actionType === "PACKAGE_CANONICAL_FILE") {
    if (path === action.quarantinePath) {
      const quarantinePath =
        await assertExistingPackageCleanupQuarantinePath({
          repoRoot,
          packageRecord,
          action,
          path
        });
      return verifyLocalPackageBytes(
        packageRecord,
        quarantinePath
      );
    }
    return verifyLocalPackage(
      repoRoot,
      packageRecord,
      path
    );
  }
  if (action.actionType === "PACKAGE_REPOSITORY") {
    return verifyRepositoryPackageIdentity(
      repoRoot,
      packageRecord,
      path
    );
  }
  throw new Error(
    `PACKAGE_CLEANUP_ACTION_TYPE_INVALID: ${action.actionType}`
  );
}

async function cleanupPackageRecordCheckpointed({
  repoRoot,
  manifestPath,
  manifest,
  packageRecord,
  destination,
  runner,
  checkpointState,
  checkpointManifest,
  deleteFile,
  deleteRepository,
  renamePath,
  now,
  preflight = null
}) {
  const prepared =
    preflight ??
    (await preflightPackageCleanupActions({
      repoRoot,
      manifest,
      packageRecord,
      destination,
      runner,
      now
    }));
  const { actions, remoteProof } = prepared;
  const pending =
    manifest.execution.localCleanupJournal?.pendingAction ??
    null;
  if (
    pending &&
    !actions.some(
      (action) => action.actionId === pending.actionId
    )
  ) {
    throw new Error(
      `LOCAL_CLEANUP_PENDING_ACTION_REQUIRES_MATCHING_COMMAND: ${pending.actionId}`
    );
  }
  for (const action of actions) {
    await runCheckpointedFilesystemAction({
      manifestPath,
      manifest,
      checkpointState,
      checkpointManifest,
      action,
      verifyPath: (path) =>
        verifyPackageCleanupActionPath({
          repoRoot,
          manifest,
          packageRecord,
          action,
          path
        }),
      deleteQuarantine:
        action.actionType === "PACKAGE_REPOSITORY"
          ? (path) =>
              deleteRepository({
                repositoryPath: path,
                archivePath: null,
                quarantineAlreadyRenamed: true
              })
          : deleteFile,
      renamePath,
      now,
      onCompleted: (completedAt) => {
        if (
          action.actionType === "PACKAGE_ORIGINAL_FILE"
        ) {
          recordOriginalLocalArtifactCleanup({
            manifest,
            packageRecord,
            originPath: action.origin.path,
            deletedAt: completedAt
          });
        }
      }
    });
  }
  const completedAt = now();
  checkpointState.sourceSha256 =
    await checkpointCleanupJournal({
      manifestPath,
      manifest,
      expectedSourceSha256:
        checkpointState.sourceSha256,
      checkpointManifest,
      mutate: () => {
        Object.assign(
          packageRecord.cleanupEligibility,
          remoteProof.restoreProof
        );
        packageRecord.remote.s3.deletionStatus =
          "LOCAL_DELETED_AFTER_REMOTE_VERIFICATION";
        packageRecord.remote.s3.localDeletedAt = completedAt;
        manifest.execution.localFilesDeleted = true;
        if (manifest.summary) {
          manifest.summary.originalLocalArtifactPendingCleanupCount =
            manifest.originalLocalArtifacts.filter(
              (entry) =>
                entry.cleanupStatus === "LOCAL_RETAINED"
            ).length;
        }
      }
    });
  return {
    packageId: packageRecord.packageId,
    disposition:
      "LOCAL_DELETED_AFTER_REMOTE_VERIFICATION",
    localPaths: [
      ...new Set(
        [
          ...(packageRecord.originalLocalArtifacts ?? [])
            .map((origin) => origin.path),
          packageRecord.localPath,
          ...(packageRecord.packageType ===
          "PINNED_GIT_REPOSITORY"
            ? [
                packageRecord.plannedObject.localFilePath
              ]
            : [])
        ].filter(Boolean)
      )
    ],
    remoteVersionId: remoteProof.remote.versionId,
    deletedAt: completedAt
  };
}

async function preflightPackageCleanupActions({
  repoRoot,
  manifest,
  packageRecord,
  destination,
  runner,
  now,
  remoteProof = null,
  enforcePendingOwner = true
}) {
  const verifiedRemote =
    remoteProof ??
    (await preflightPackageRemoteProof({
      repoRoot,
      packageRecord,
      destination,
      runner,
      now
    }));
  const actions = packageCleanupActions({
    repoRoot,
    packageRecord
  });
  const pending =
    manifest.execution?.localCleanupJournal
      ?.pendingAction ?? null;
  if (
    enforcePendingOwner &&
    pending &&
    !actions.some(
      (action) => action.actionId === pending.actionId
    )
  ) {
    throw new Error(
      `LOCAL_CLEANUP_PENDING_ACTION_REQUIRES_MATCHING_COMMAND: ${pending.actionId}`
    );
  }
  for (const action of actions) {
    const completed = completedCleanupAction(
      manifest,
      action.actionId
    );
    const targetPresent = await pathExists(
      action.targetPath
    );
    const quarantinePresent = await pathExists(
      action.quarantinePath
    );
    if (completed) {
      if (targetPresent || quarantinePresent) {
        throw new Error(
          `LOCAL_CLEANUP_COMPLETED_ACTION_REAPPEARED: ${action.actionId}`
        );
      }
      continue;
    }
    if (targetPresent && quarantinePresent) {
      throw new Error(
        `LOCAL_CLEANUP_TARGET_AND_QUARANTINE_BOTH_PRESENT: ${action.actionId}`
      );
    }
    const isPending = pending?.actionId === action.actionId;
    if (targetPresent) {
      await verifyPackageCleanupActionPath({
        repoRoot,
        manifest,
        packageRecord,
        action,
        path: action.targetPath
      });
    } else if (quarantinePresent && isPending) {
      await verifyPackageCleanupActionPath({
        repoRoot,
        manifest,
        packageRecord,
        action,
        path: action.quarantinePath
      });
    } else if (!isPending) {
      throw new Error(
        `PACKAGE_CLEANUP_ACTION_TARGET_MISSING: ${action.targetPath}`
      );
    }
  }
  return {
    packageRecord,
    actions,
    remoteProof: verifiedRemote
  };
}

export async function cleanupPackage({
  repoRoot,
  manifestPath,
  manifest,
  packageId,
  destination,
  confirmDeleteLocal,
  expectedManifestSourceSha256 = null,
  checkpointManifest = writeManifestAtomically,
  runner = defaultAwsRunner,
  gitRunner = defaultGitRunner,
  archiveMemberReader = readArchiveMember,
  deleteFile = unlink,
  deleteRepository = defaultRepositoryDelete,
  renamePath = rename,
  now = () => new Date().toISOString()
}) {
  if (confirmDeleteLocal !== true) {
    throw new Error(
      "LOCAL_DELETE_CONFIRMATION_REQUIRED: pass --confirm-delete-local"
    );
  }
  validateManifestDigest(manifest);
  await assertCleanupManifestMayProceed({
    repoRoot,
    manifestPath,
    manifest,
    gitRunner
  });
  await assertValidationStillCurrent({
    repoRoot,
    manifestPath,
    manifest,
    gitRunner
  });
  const validated = validateResearchDestination(destination);
  const packageRecord = packageById(manifest, packageId);
  if (
    packageRecord.localLifecycle?.ownerPackageId
  ) {
    throw new Error(
      `PARENT_OWNED_PACKAGE_CLEANUP_REQUIRES_BATCH: ${packageRecord.packageId}`
    );
  }
  const parentOwnedChildren = manifest.packages.filter(
    (candidate) =>
      candidate.localLifecycle?.ownerPackageId ===
      packageRecord.packageId
  );
  if (parentOwnedChildren.length > 0) {
    throw new Error(
      `PARENT_REPOSITORY_CLEANUP_REQUIRES_BATCH: ${packageRecord.packageId}: ${parentOwnedChildren.length} logical child packages require common preflight`
    );
  }
  if (
    packageRecord.localRetentionPolicy !==
    "DELETE_AFTER_VERIFIED_MIGRATION"
  ) {
    throw new Error(
      `LOCAL_RETENTION_POLICY_FORBIDS_DELETE: ${packageRecord.packageId}`
    );
  }
  assertCleanupManifestPackageReady(
    packageRecord,
    manifest,
    validated
  );
  const executionContext = await verifyExecutionContext(
    validated,
    runner
  );
  const checkpointState = {
    sourceSha256: await cleanupCheckpointSourceSha256(
      manifestPath,
      expectedManifestSourceSha256
    )
  };
  const result = await cleanupPackageRecordCheckpointed({
    repoRoot,
    manifestPath,
    manifest,
    packageRecord,
    destination: validated,
    runner,
    checkpointState,
    checkpointManifest,
    deleteFile,
    deleteRepository,
    renamePath,
    now
  });
  checkpointState.sourceSha256 =
    await checkpointCleanupJournal({
      manifestPath,
      manifest,
      expectedSourceSha256:
        checkpointState.sourceSha256,
      checkpointManifest,
      mutate: (journal) => {
        journal.status = "COMPLETE";
        manifest.execution.lastLocalDeletion = {
          packageId,
          localPaths: result.localPaths,
          remoteVersionId: result.remoteVersionId,
          deletedAt: result.deletedAt
        };
        manifest.execution.lastVerifiedIdentity =
          executionContext.identity;
      }
    });
  return {
    ...result,
    manifestCheckpointSha256:
      checkpointState.sourceSha256
  };
}

export async function recoverPendingPackageCleanup({
  repoRoot,
  manifestPath,
  manifest,
  packageId,
  destination,
  confirmDeleteLocal,
  expectedManifestSourceSha256 = null,
  checkpointManifest = writeManifestAtomically,
  runner = defaultAwsRunner,
  gitRunner = defaultGitRunner,
  deleteFile = unlink,
  renamePath = rename,
  now = () => new Date().toISOString()
}) {
  if (confirmDeleteLocal !== true) {
    throw new Error(
      "LOCAL_DELETE_CONFIRMATION_REQUIRED: pass --confirm-delete-local"
    );
  }
  validateManifestDigest(manifest);
  const pending =
    manifest.execution?.localCleanupJournal
      ?.pendingAction ?? null;
  if (
    !pending ||
    pending.ownerType !== "PACKAGE" ||
    pending.ownerId !== packageId ||
    pending.actionType !== "PACKAGE_CANONICAL_FILE" ||
    !["PENDING", "QUARANTINED"].includes(pending.state)
  ) {
    throw new Error(
      `PENDING_PACKAGE_CLEANUP_RECOVERY_REQUIRED: ${packageId}`
    );
  }
  const packageRecord = packageById(manifest, packageId);
  if (
    packageRecord.localRetentionPolicy !==
      "DELETE_AFTER_VERIFIED_MIGRATION" ||
    packageRecord.localLifecycle?.ownerPackageId ||
    (
      packageRecord.originalLocalArtifacts?.length ??
      0
    ) !== 0
  ) {
    throw new Error(
      `PENDING_PACKAGE_CLEANUP_RECOVERY_SCOPE_INVALID: ${packageId}`
    );
  }
  const actions = packageCleanupActions({
    repoRoot,
    packageRecord
  });
  if (
    actions.length !== 1 ||
    actions[0].actionId !== pending.actionId
  ) {
    throw new Error(
      `PENDING_PACKAGE_CLEANUP_RECOVERY_ACTION_SET_INVALID: ${packageId}`
    );
  }
  const action = actions[0];
  if (
    (await pathExists(action.targetPath)) ||
    !(await pathExists(action.quarantinePath))
  ) {
    throw new Error(
      `PENDING_PACKAGE_CLEANUP_RECOVERY_PATH_STATE_INVALID: ${packageId}`
    );
  }
  await assertPendingCleanupRecoveryMayProceed({
    repoRoot,
    manifestPath,
    manifest,
    gitRunner
  });
  const validated = validateResearchDestination(destination);
  assertCleanupManifestPackageReady(
    packageRecord,
    manifest,
    validated
  );
  const executionContext = await verifyExecutionContext(
    validated,
    runner
  );
  const preflight = await preflightPackageCleanupActions({
    repoRoot,
    manifest,
    packageRecord,
    destination: validated,
    runner,
    now
  });
  const checkpointState = {
    sourceSha256: await cleanupCheckpointSourceSha256(
      manifestPath,
      expectedManifestSourceSha256
    )
  };
  const result = await cleanupPackageRecordCheckpointed({
    repoRoot,
    manifestPath,
    manifest,
    packageRecord,
    destination: validated,
    runner,
    checkpointState,
    checkpointManifest,
    deleteFile,
    deleteRepository: defaultRepositoryDelete,
    renamePath,
    now,
    preflight
  });
  checkpointState.sourceSha256 =
    await checkpointCleanupJournal({
      manifestPath,
      manifest,
      expectedSourceSha256:
        checkpointState.sourceSha256,
      checkpointManifest,
      mutate: (journal) => {
        journal.status = "COMPLETE";
        manifest.execution.lastPendingCleanupRecovery = {
          packageId,
          actionId: action.actionId,
          localPaths: result.localPaths,
          remoteVersionId: result.remoteVersionId,
          recoveredAt: result.deletedAt,
          recoveryScope:
            "EXACT_CHECKPOINTED_QUARANTINE_ONLY"
        };
        manifest.execution.lastVerifiedIdentity =
          executionContext.identity;
      }
    });
  return {
    ...result,
    recoveryScope:
      "EXACT_CHECKPOINTED_QUARANTINE_ONLY",
    manifestCheckpointSha256:
      checkpointState.sourceSha256
  };
}

export async function cleanupAllPackages({
  repoRoot,
  manifestPath,
  manifest,
  destination,
  confirmDeleteLocal,
  expectedManifestSourceSha256 = null,
  checkpointManifest = writeManifestAtomically,
  runner = defaultAwsRunner,
  gitRunner = defaultGitRunner,
  archiveMemberReader = readArchiveMember,
  deleteFile = unlink,
  deleteRepository = defaultRepositoryDelete,
  renamePath = rename,
  now = () => new Date().toISOString()
}) {
  if (confirmDeleteLocal !== true) {
    throw new Error(
      "LOCAL_DELETE_CONFIRMATION_REQUIRED: pass --confirm-delete-local"
    );
  }
  validateManifestDigest(manifest);
  await assertCleanupManifestMayProceed({
    repoRoot,
    manifestPath,
    manifest,
    gitRunner
  });
  await assertValidationStillCurrent({
    repoRoot,
    manifestPath,
    manifest,
    gitRunner
  });
  requireAllUploadReady(manifest);
  const validated = validateResearchDestination(destination);
  const packageRecords = manifest.packages.map(
    (packageRecord) =>
      packageById(manifest, packageRecord.packageId)
  );
  for (const packageRecord of packageRecords) {
    assertCleanupManifestPackageReady(
      packageRecord,
      manifest,
      validated
    );
  }
  const executionContext = await verifyExecutionContext(
    validated,
    runner
  );
  const checkpointState = {
    sourceSha256: await cleanupCheckpointSourceSha256(
      manifestPath,
      expectedManifestSourceSha256
    )
  };
  const preflights = [];
  for (const packageRecord of packageRecords) {
    const remoteProof = await preflightPackageRemoteProof({
      repoRoot,
      packageRecord,
      destination: validated,
      runner,
      now
    });
    if (
      packageRecord.localRetentionPolicy ===
      "DELETE_AFTER_VERIFIED_MIGRATION"
    ) {
      const preflight = await preflightPackageCleanupActions({
        repoRoot,
        manifest,
        packageRecord,
        destination: validated,
        runner,
        now,
        remoteProof,
        enforcePendingOwner: false
      });
      if (
        packageRecord.packageType ===
        "EMBEDDED_LICENSE_ARTIFACT"
      ) {
        const parentPackage = packageById(
          manifest,
          packageRecord.parentPackageId
        );
        const parentRemovalCheckpointed =
          completedPackageCleanupActionForCurrentGeneration({
            manifest,
            packageRecord: parentPackage,
            actionTypes: [
              "PACKAGE_CANONICAL_FILE",
              "PACKAGE_REPOSITORY"
            ]
          });
        preflight.embeddedMember =
          parentRemovalCheckpointed
            ? null
            : await verifyEmbeddedLicenseMember({
                repoRoot,
                manifest,
                packageRecord,
                archiveMemberReader
              });
      }
      preflights.push(preflight);
    } else if (
      packageRecord.localRetentionPolicy ===
      PARENT_REPOSITORY_OWNED_RETENTION_POLICY
    ) {
      const localPath = safeLocalPackagePath(
        repoRoot,
        packageRecord
      );
      const parentPackage = packageById(
        manifest,
        packageRecord.parentPackageId
      );
      const parentRemovalCheckpointed =
        completedPackageCleanupActionForCurrentGeneration({
          manifest,
          packageRecord: parentPackage,
          actionTypes: ["PACKAGE_REPOSITORY"]
        });
      let local = null;
      if (await pathExists(localPath)) {
        local = await verifyLocalPackage(
          repoRoot,
          packageRecord,
          localPath
        );
      } else if (!parentRemovalCheckpointed) {
        throw new Error(
          `PARENT_OWNED_PACKAGE_LOCAL_FILE_MISSING: ${packageRecord.packageId}`
        );
      }
      preflights.push({
        packageRecord,
        local,
        repository: null,
        originalLocalArtifacts: [],
        actions: [],
        remoteProof
      });
    } else {
      const local = await verifyLocalPackage(
        repoRoot,
        packageRecord
      );
      const repository =
        await verifyRepositoryPackageIdentity(
          repoRoot,
          packageRecord
        );
      const originalLocalArtifacts = [];
      for (const origin of
        packageRecord.originalLocalArtifacts ?? []) {
        originalLocalArtifacts.push(
          await verifyOriginalLocalArtifact(
            manifest,
            packageRecord,
            origin
          )
        );
      }
      preflights.push({
        packageRecord,
        local,
        repository,
        originalLocalArtifacts,
        actions: [],
        remoteProof
      });
    }
  }
  const pending =
    manifest.execution?.localCleanupJournal
      ?.pendingAction ?? null;
  if (
    pending &&
    !preflights.some((preflight) =>
      preflight.actions.some(
        (action) => action.actionId === pending.actionId
      )
    )
  ) {
    throw new Error(
      `LOCAL_CLEANUP_PENDING_ACTION_REQUIRES_MATCHING_COMMAND: ${pending.actionId}`
    );
  }

  const orderedPreflights = [...preflights].sort(
    (left, right) => {
      const leftOwnsPending = left.actions.some(
        (action) => action.actionId === pending?.actionId
      );
      const rightOwnsPending = right.actions.some(
        (action) => action.actionId === pending?.actionId
      );
      if (leftOwnsPending !== rightOwnsPending) {
        return leftOwnsPending ? -1 : 1;
      }
      return packageRecords.indexOf(left.packageRecord) -
        packageRecords.indexOf(right.packageRecord);
    }
  );

  const deletionResults = [];
  for (const preflight of orderedPreflights) {
    const packageRecord = preflight.packageRecord;
    if (
      packageRecord.localRetentionPolicy ===
      "RETAIN_SOURCE_CONTROLLED_FIXTURE"
    ) {
      deletionResults.push({
        packageId: packageRecord.packageId,
        disposition: "LOCAL_RETAINED_BY_POLICY",
        localPaths: [packageRecord.localPath],
        remoteVersionId:
          preflight.remoteProof.remote.versionId
      });
      continue;
    }
    if (
      packageRecord.localRetentionPolicy ===
      PARENT_REPOSITORY_OWNED_RETENTION_POLICY
    ) {
      deletionResults.push({
        packageId: packageRecord.packageId,
        parentPackageId: packageRecord.parentPackageId,
        disposition: PARENT_REPOSITORY_DELETED_STATUS,
        localPaths: [packageRecord.localPath],
        remoteVersionId:
          preflight.remoteProof.remote.versionId
      });
      continue;
    }
    const result = await cleanupPackageRecordCheckpointed({
      repoRoot,
      manifestPath,
      manifest,
      packageRecord,
      destination: validated,
      runner,
      checkpointState,
      checkpointManifest,
      deleteFile,
      deleteRepository,
      renamePath,
      now,
      preflight
    });
    deletionResults.push(result);
  }

  for (const result of deletionResults) {
    if (
      result.disposition !==
      PARENT_REPOSITORY_DELETED_STATUS
    ) {
      continue;
    }
    const parentResult = deletionResults.find(
      (candidate) =>
        candidate.packageId === result.parentPackageId
    );
    if (
      parentResult?.disposition !==
      "LOCAL_DELETED_AFTER_REMOTE_VERIFICATION"
    ) {
      throw new Error(
        `PARENT_REPOSITORY_CLEANUP_RESULT_REQUIRED: ${result.packageId}`
      );
    }
    const packageRecord = packageById(
      manifest,
      result.packageId
    );
    if (
      await pathExists(
        safeLocalPackagePath(repoRoot, packageRecord)
      )
    ) {
      throw new Error(
        `PARENT_OWNED_PACKAGE_STILL_PRESENT: ${result.packageId}`
      );
    }
  }

  deletionResults.sort(
    (left, right) =>
      packageRecords.findIndex(
        (record) => record.packageId === left.packageId
      ) -
      packageRecords.findIndex(
        (record) => record.packageId === right.packageId
      )
  );
  const timestamp = now();
  const deleted = deletionResults.filter(
    (result) =>
      [
        "LOCAL_DELETED_AFTER_REMOTE_VERIFICATION",
        PARENT_REPOSITORY_DELETED_STATUS
      ].includes(result.disposition)
  );
  checkpointState.sourceSha256 =
    await checkpointCleanupJournal({
      manifestPath,
      manifest,
      expectedSourceSha256:
        checkpointState.sourceSha256,
      checkpointManifest,
      mutate: (journal) => {
        for (const preflight of preflights) {
          const packageRecord = preflight.packageRecord;
          Object.assign(
            packageRecord.cleanupEligibility,
            preflight.remoteProof.restoreProof
          );
          const result = deletionResults.find(
            (candidate) =>
              candidate.packageId ===
              packageRecord.packageId
          );
          if (
            result.disposition ===
            "LOCAL_RETAINED_BY_POLICY"
          ) {
            packageRecord.remote.s3.deletionStatus =
              result.disposition;
            packageRecord.remote.s3.localDeletedAt = null;
          } else if (
            result.disposition ===
            PARENT_REPOSITORY_DELETED_STATUS
          ) {
            packageRecord.remote.s3.deletionStatus =
              result.disposition;
            packageRecord.remote.s3.localDeletedAt =
              timestamp;
          }
        }
        manifest.execution.localFilesDeleted =
          manifest.execution.localFilesDeleted === true ||
          deleted.length > 0;
        if (manifest.summary) {
          manifest.summary.originalLocalArtifactPendingCleanupCount =
            manifest.originalLocalArtifacts.filter(
              (entry) =>
                entry.cleanupStatus === "LOCAL_RETAINED"
            ).length;
        }
        manifest.execution.lastBatchLocalDeletion = {
          packageCount: packageRecords.length,
          deletedPackageCount: deleted.length,
          retainedPackageCount:
            deletionResults.length - deleted.length,
          deletedAt: timestamp,
          results: deletionResults
        };
        manifest.execution.lastVerifiedIdentity =
          executionContext.identity;
        journal.status = "COMPLETE";
      }
    });
  return {
    disposition:
      "ALL_PACKAGES_PREFLIGHTED_BEFORE_LOCAL_CLEANUP",
    packageCount: packageRecords.length,
    deletedPackageCount: deleted.length,
    retainedPackageCount:
      deletionResults.length - deleted.length,
    identity: executionContext.identity,
    results: deletionResults,
    manifestCheckpointSha256:
      checkpointState.sourceSha256
  };
}

function auditedArtifactRecords(localArtifactAudit) {
  const records = [];
  for (const group of localArtifactAudit.artifactGroups) {
    for (const child of group.childFiles ?? []) {
      records.push({
        ...inheritedAuditRecord(group, child),
        groupId: group.groupId,
        recordKind: child.originalPath.startsWith(
          AUDITED_DOCKER_IMAGE_PREFIX
        )
          ? "DOCKER_IMAGE"
          : "EXACT_FILE"
      });
    }
    for (const directory of group.directoryEntries ?? []) {
      records.push({
        ...inheritedAuditRecord(group, directory),
        groupId: group.groupId,
        recordKind:
          directory.originalPath === AUDITED_SHARED_BUILDKIT_URI
            ? "SHARED_BUILDKIT_CACHE"
            : "DIRECTORY_AGGREGATE"
      });
    }
  }
  const paths = records.map((record) => record.originalPath);
  if (new Set(paths).size !== paths.length) {
    throw new Error(
      "AUDITED_LOCAL_ARTIFACT_PATHS_NOT_UNIQUE"
    );
  }
  const filesystemRecords = records.filter((record) =>
    isAbsolute(record.originalPath)
  );
  for (const parent of filesystemRecords) {
    for (const child of filesystemRecords) {
      if (
        parent !== child &&
        resolve(child.originalPath).startsWith(
          `${resolve(parent.originalPath)}${sep}`
        )
      ) {
        throw new Error(
          `AUDITED_LOCAL_ARTIFACT_TARGETS_OVERLAP: ${parent.originalPath}: ${child.originalPath}`
        );
      }
    }
  }
  return records;
}

function assertAllPackagesReadyForAuditedCleanup(manifest) {
  assertAllRemoteVersionsRecorded(manifest);
  for (const packageRecord of manifest.packages) {
    assertPackageRemoteLocation(packageRecord, {
      bucket: RESEARCH_S3_BUCKET
    });
    assertPackageCleanupEligibility(
      packageRecord,
      manifest.execution.finalCleanupValidation
    );
  }
}

async function loadCommittedLocalArtifactAudit({
  repoRoot,
  manifest,
  gitRunner,
  permittedTempRoots
}) {
  if (
    manifest.localArtifactAudit?.sourcePath !==
    LOCAL_ARTIFACT_AUDIT_RELATIVE_PATH
  ) {
    throw new Error(
      "LOCAL_ARTIFACT_AUDIT_SOURCE_PATH_MISMATCH"
    );
  }
  const auditPath = resolve(
    repoRoot,
    LOCAL_ARTIFACT_AUDIT_RELATIVE_PATH
  );
  await assertTrackedFileCleanCommitted({
    repoRoot,
    path: auditPath,
    gitRunner,
    outsideErrorCode:
      "LOCAL_ARTIFACT_AUDIT_OUTSIDE_REPOSITORY",
    errorCode:
      "LOCAL_ARTIFACT_AUDIT_NOT_CLEAN_COMMITTED",
    errorMessage:
      "track, commit, and leave the local artifact audit unchanged before cleanup"
  });
  const loaded = await loadLocalArtifactAudit({
    repoRoot,
    originalLocalArtifacts:
      manifest.originalLocalArtifacts ?? []
  });
  assertLocalArtifactAuditWorktree({
    audit: loaded,
    repoRoot
  });
  await assertLocalArtifactAuditFresh({
    audit: loaded,
    roots: permittedTempRoots,
    allowMissingRecordedPaths: true
  });
  if (
    loaded.sourceSha256 !==
      manifest.localArtifactAudit.sourceSha256 ||
    sha256CanonicalJson(loaded) !==
      sha256CanonicalJson(manifest.localArtifactAudit)
  ) {
    throw new Error(
      "LOCAL_ARTIFACT_AUDIT_MANIFEST_MISMATCH: regenerate and commit the migration manifest before cleanup"
    );
  }
  if (
    !Array.isArray(loaded.scope?.excluded) ||
    !loaded.scope.excluded.includes(
      "Active contractor web-enrichment artifacts"
    )
  ) {
    throw new Error(
      "LOCAL_ARTIFACT_AUDIT_SCOPE_EXCLUSION_REQUIRED"
    );
  }
  return loaded;
}

function matchingAuditedTempRoot(path, permittedTempRoots) {
  if (!isAbsolute(path) || resolve(path) !== path) {
    throw new Error(
      `AUDITED_LOCAL_ARTIFACT_PATH_NOT_ABSOLUTE_NORMALIZED: ${path}`
    );
  }
  const roots = [
    ...new Set(permittedTempRoots.map((root) => resolve(root)))
  ]
    .filter((root) => root !== sep)
    .sort((left, right) => right.length - left.length);
  if (roots.length !== new Set(permittedTempRoots).size) {
    throw new Error(
      "AUDITED_LOCAL_ARTIFACT_TEMP_ROOT_INVALID"
    );
  }
  const root = roots.find((candidate) => {
    const child = relative(candidate, path);
    return (
      child !== "" &&
      child !== ".." &&
      !child.startsWith(`..${sep}`)
    );
  });
  if (!root) {
    throw new Error(
      `AUDITED_LOCAL_ARTIFACT_PATH_OUTSIDE_PERMITTED_TEMP_ROOTS: ${path}`
    );
  }
  return root;
}

async function resolveAuditedTempTarget(
  path,
  permittedTempRoots
) {
  const root = matchingAuditedTempRoot(
    path,
    permittedTempRoots
  );
  const details = await lstat(path);
  if (details.isSymbolicLink()) {
    throw new Error(
      `AUDITED_LOCAL_ARTIFACT_TARGET_SYMLINK_FORBIDDEN: ${path}`
    );
  }
  const [rootRealPath, targetRealPath] = await Promise.all([
    realpath(root),
    realpath(path)
  ]);
  const expectedRealPath = resolve(
    rootRealPath,
    relative(root, path)
  );
  if (targetRealPath !== expectedRealPath) {
    throw new Error(
      `AUDITED_LOCAL_ARTIFACT_PATH_SYMLINK_ESCAPE: ${path}`
    );
  }
  return {
    path: targetRealPath,
    details
  };
}

async function auditedPhysicalPath(
  path,
  permittedTempRoots
) {
  matchingAuditedTempRoot(path, permittedTempRoots);
  return resolve(path);
}

function assertCanonicalDuplicatePackage(manifest, record) {
  if (
    record.disposition !== "DUPLICATE_CANONICAL" ||
    record.recordKind !== "EXACT_FILE"
  ) {
    return null;
  }
  if (
    typeof record.canonicalCachePath !== "string" ||
    !record.canonicalCachePath.startsWith(
      `${CACHE_RELATIVE_PATH}/`
    )
  ) {
    throw new Error(
      `AUDITED_DUPLICATE_CANONICAL_PATH_REQUIRED: ${record.originalPath}`
    );
  }
  const packageRecord = manifest.packages.find(
    (candidate) =>
      candidate.localPath === record.canonicalCachePath
  );
  if (!packageRecord) {
    throw new Error(
      `AUDITED_DUPLICATE_CANONICAL_PACKAGE_REQUIRED: ${record.originalPath}`
    );
  }
  if (
    packageRecord.plannedObject.expectedSizeBytes !==
      record.byteSize ||
    packageRecord.plannedObject.expectedSha256 !== record.sha256
  ) {
    throw new Error(
      `AUDITED_DUPLICATE_CANONICAL_FINGERPRINT_MISMATCH: ${record.originalPath}`
    );
  }
  return packageRecord;
}

async function verifyAuditedExactFile({
  manifest,
  record,
  permittedTempRoots,
  path = record.originalPath
}) {
  if (
    !Number.isSafeInteger(record.byteSize) ||
    record.byteSize < 0 ||
    !/^[a-f0-9]{64}$/.test(record.sha256)
  ) {
    throw new Error(
      `AUDITED_FILE_FINGERPRINT_INVALID: ${record.originalPath}`
    );
  }
  assertCanonicalDuplicatePackage(manifest, record);
  const target = await resolveAuditedTempTarget(
    path,
    permittedTempRoots
  );
  if (!target.details.isFile()) {
    throw new Error(
      `AUDITED_FILE_REQUIRED: ${record.originalPath}`
    );
  }
  if (target.details.size !== record.byteSize) {
    throw new Error(
      `AUDITED_FILE_SIZE_MISMATCH: ${record.originalPath}`
    );
  }
  const digest = await sha256Path(target.path);
  if (digest !== record.sha256) {
    throw new Error(
      `AUDITED_FILE_CHECKSUM_MISMATCH: ${record.originalPath}`
    );
  }
  return {
    ...target,
    sizeBytes: target.details.size,
    sha256: digest
  };
}

async function verifyAuditedDirectory({
  manifest,
  record,
  permittedTempRoots,
  path = record.originalPath
}) {
  if (
    !Number.isSafeInteger(record.fileCount) ||
    record.fileCount < 0 ||
    !Number.isSafeInteger(record.symlinkCount) ||
    record.symlinkCount < 0 ||
    !Number.isSafeInteger(record.logicalBytes) ||
    record.logicalBytes < 0 ||
    record.treeDigestSchemaVersion !==
      AUDITED_DIRECTORY_TREE_DIGEST_SCHEMA_VERSION ||
    !/^[a-f0-9]{64}$/.test(
      record.fullTreeSha256 ?? ""
    )
  ) {
    throw new Error(
      `AUDITED_DIRECTORY_AGGREGATE_INVALID: ${record.originalPath}`
    );
  }
  const target = await resolveAuditedTempTarget(
    path,
    permittedTempRoots
  );
  if (!target.details.isDirectory()) {
    throw new Error(
      `AUDITED_DIRECTORY_REQUIRED: ${record.originalPath}`
    );
  }
  const aggregate = await auditedDirectoryTreeIdentity(
    target.path
  );
  if (
    aggregate.fileCount !== record.fileCount ||
    aggregate.symlinkCount !== record.symlinkCount ||
    aggregate.logicalBytes !== record.logicalBytes ||
    aggregate.treeDigestSchemaVersion !==
      record.treeDigestSchemaVersion ||
    aggregate.fullTreeSha256 !==
      record.fullTreeSha256
  ) {
    throw new Error(
      `AUDITED_DIRECTORY_AGGREGATE_MISMATCH: ${record.originalPath}`
    );
  }
  for (const expectedIdentity of
    record.gitRepositoryIdentities ?? []) {
    const repositoryPath = resolve(
      target.path,
      expectedIdentity.relativePath
    );
    const repositoryRelativePath = relative(
      target.path,
      repositoryPath
    );
    if (
      repositoryRelativePath === ".." ||
      repositoryRelativePath.startsWith(`..${sep}`) ||
      isAbsolute(repositoryRelativePath)
    ) {
      throw new Error(
        `AUDITED_DIRECTORY_GIT_REPOSITORY_OUTSIDE_PARENT: ${record.originalPath}: ${expectedIdentity.relativePath}`
      );
    }
    const observedIdentity =
      await gitRepositoryIdentity(repositoryPath);
    if (
      observedIdentity.commitSha !==
        expectedIdentity.commitSha ||
      observedIdentity.gitTreeObjectSha1 !==
        expectedIdentity.gitTreeObjectSha1 ||
      observedIdentity.gitIndexListingSha256 !==
        expectedIdentity.gitIndexListingSha256 ||
      observedIdentity.workingTreeClean !==
        expectedIdentity.workingTreeClean
    ) {
      throw new Error(
        `AUDITED_DIRECTORY_GIT_REPOSITORY_IDENTITY_MISMATCH: ${record.originalPath}: ${expectedIdentity.relativePath}`
      );
    }
  }
  for (const known of record.knownExactFiles ?? []) {
    const child = relative(
      record.originalPath,
      known.originalPath
    );
    if (
      child === "" ||
      child === ".." ||
      child.startsWith(`..${sep}`)
    ) {
      throw new Error(
        `AUDITED_DIRECTORY_KNOWN_FILE_OUTSIDE_PARENT: ${known.originalPath}`
      );
    }
    const knownRecord = {
      ...record,
      ...known,
      originalPath: join(
        path,
        relative(
          record.originalPath,
          known.originalPath
        )
      ),
      recordKind: "EXACT_FILE",
      disposition: "DUPLICATE_CANONICAL"
    };
    await verifyAuditedExactFile({
      manifest,
      record: knownRecord,
      permittedTempRoots
    });
  }
  return { ...target, ...aggregate };
}

function parseAuditedDockerReference(originalPath) {
  if (!originalPath.startsWith(AUDITED_DOCKER_IMAGE_PREFIX)) {
    throw new Error(
      `AUDITED_DOCKER_IMAGE_REFERENCE_INVALID: ${originalPath}`
    );
  }
  const reference = originalPath.slice(
    AUDITED_DOCKER_IMAGE_PREFIX.length
  );
  if (
    !/^retrofit-research-[a-z0-9][a-z0-9.-]*:[A-Za-z0-9_][A-Za-z0-9_.-]{0,127}$/.test(
      reference
    )
  ) {
    throw new Error(
      `AUDITED_DOCKER_IMAGE_REFERENCE_INVALID: ${originalPath}`
    );
  }
  const separator = reference.lastIndexOf(":");
  return {
    reference,
    repository: reference.slice(0, separator),
    tag: reference.slice(separator + 1)
  };
}

function successfulDockerOutput(result, operation) {
  if (result.exitCode !== 0) {
    throw new Error(
      `${operation}_FAILED: ${String(result.stderr ?? "").trim() || `exit ${result.exitCode}`}`
    );
  }
  return result.stdout;
}

function dockerInspectRecord(result, operation) {
  const source = successfulDockerOutput(result, operation);
  let records;
  try {
    records = JSON.parse(source);
  } catch (error) {
    throw new Error(
      `${operation}_INVALID_JSON: ${error.message}`
    );
  }
  if (!Array.isArray(records) || records.length !== 1) {
    throw new Error(
      `${operation}_EXPECTED_ONE_IMAGE`
    );
  }
  return records[0];
}

function ecrRecordForAuditedImage(manifest, record) {
  const parsed = parseAuditedDockerReference(
    record.originalPath
  );
  const repository = manifest.destination?.ecr?.repositories?.find(
    (candidate) =>
      candidate.localImage?.repositoryTag === parsed.reference
  );
  if (!repository) {
    throw new Error(
      `AUDITED_DOCKER_IMAGE_ECR_RECORD_REQUIRED: ${parsed.reference}`
    );
  }
  const buildEvidence = assertEcrBuildEvidence({
    manifest,
    repository,
    requireDurableArtifacts: true
  }).build;
  const imageId = `sha256:${record.sha256}`;
  const remote = repository.remoteImage;
  const expectedRemoteTag =
    `${repository.expectedRepositoryUri}:${parsed.tag}`;
  const expectedLocalDigest =
    `${parsed.repository}@${remote.imageDigest}`;
  if (
    repository.localImage.verificationStatus !==
      "PASS_COMMITTED_POST_HOC_REPLAY" ||
    repository.localImage.imageId !== imageId ||
    repository.localImage.imageTag !== parsed.tag ||
    remote?.verificationStatus !==
      "VERIFIED_EXACT_DIGEST" ||
    remote.exactDigestPulled !== true ||
    remote.runtimeVerificationStatus !== "PASS" ||
    remote.repositoryUri !==
      repository.expectedRepositoryUri ||
    remote.imageTag !== parsed.tag ||
    !/^sha256:[a-f0-9]{64}$/.test(remote.imageDigest) ||
    remote.imageDigest !== imageId ||
    !repository.localImage.repositoryDigests?.includes(
      `${parsed.repository}@${remote.imageDigest}`
    ) ||
    remote.imageUri !==
      `${repository.expectedRepositoryUri}@${remote.imageDigest}` ||
    record.canonicalPackageLinkage !== remote.imageUri
  ) {
    throw new Error(
      `AUDITED_DOCKER_IMAGE_ECR_PROOF_INVALID: ${parsed.reference}`
    );
  }
  return {
    parsed,
    repository,
    buildEvidence,
    imageId,
    expectedTags: [
      parsed.reference,
      expectedRemoteTag,
      remote.imageUri
    ].sort(),
    expectedDigests: [
      expectedLocalDigest,
      remote.imageUri
    ].sort(),
    expectedReferences: [
      parsed.reference,
      expectedLocalDigest,
      expectedRemoteTag,
      remote.imageUri
    ].sort(),
    expectedRemoteTag
  };
}

function requireResearchEcrRepositoryControls({
  response,
  repository
}) {
  if (
    !Array.isArray(response.repositories) ||
    response.repositories.length !== 1
  ) {
    throw new Error(
      `ECR_REPOSITORY_CONTROL_RECORD_REQUIRED: ${repository.repositoryName}`
    );
  }
  const live = response.repositories[0];
  if (
    live.registryId !== RESEARCH_AWS_ACCOUNT_ID ||
    live.repositoryName !== repository.repositoryName ||
    live.repositoryUri !== repository.expectedRepositoryUri
  ) {
    throw new Error(
      `ECR_REPOSITORY_IDENTITY_MISMATCH: ${repository.repositoryName}`
    );
  }
  if (live.imageTagMutability !== "IMMUTABLE") {
    throw new Error(
      `UNSAFE_ECR_TAG_MUTABILITY: ${repository.repositoryName} must be IMMUTABLE`
    );
  }
  if (
    live.encryptionConfiguration?.encryptionType !== "AES256"
  ) {
    throw new Error(
      `UNSAFE_ECR_ENCRYPTION: ${repository.repositoryName} must use AES256`
    );
  }
  if (live.imageScanningConfiguration?.scanOnPush !== true) {
    throw new Error(
      `UNSAFE_ECR_SCAN_CONFIGURATION: ${repository.repositoryName} must enable scanOnPush`
    );
  }
  return {
    registryId: live.registryId,
    repositoryName: live.repositoryName,
    repositoryUri: live.repositoryUri,
    imageTagMutability: live.imageTagMutability,
    encryptionType:
      live.encryptionConfiguration.encryptionType,
    scanOnPush: live.imageScanningConfiguration.scanOnPush
  };
}

function requireResearchEcrLifecycle({
  response,
  repository
}) {
  if (
    response.registryId !== RESEARCH_AWS_ACCOUNT_ID ||
    response.repositoryName !== repository.repositoryName ||
    typeof response.lifecyclePolicyText !== "string"
  ) {
    throw new Error(
      `ECR_LIFECYCLE_POLICY_RECORD_REQUIRED: ${repository.repositoryName}`
    );
  }
  let policy;
  try {
    policy = JSON.parse(response.lifecyclePolicyText);
  } catch (error) {
    throw new Error(
      `ECR_LIFECYCLE_POLICY_INVALID_JSON: ${repository.repositoryName}: ${error.message}`
    );
  }
  if (!Array.isArray(policy.rules) || policy.rules.length === 0) {
    throw new Error(
      `UNSAFE_ECR_LIFECYCLE: ${repository.repositoryName} must have an untagged expiration rule`
    );
  }
  const priorities = new Set();
  const rules = policy.rules.map((rule) => {
    const selection = rule?.selection;
    if (
      !Number.isSafeInteger(rule?.rulePriority) ||
      rule.rulePriority <= 0 ||
      priorities.has(rule.rulePriority) ||
      selection?.tagStatus !== "untagged" ||
      selection?.countType !== "sinceImagePushed" ||
      selection?.countUnit !== "days" ||
      !Number.isSafeInteger(selection?.countNumber) ||
      selection.countNumber < 14 ||
      rule?.action?.type !== "expire"
    ) {
      throw new Error(
        `UNSAFE_ECR_LIFECYCLE: ${repository.repositoryName} may expire only untagged images after at least 14 days`
      );
    }
    priorities.add(rule.rulePriority);
    return {
      rulePriority: rule.rulePriority,
      tagStatus: selection.tagStatus,
      countType: selection.countType,
      countUnit: selection.countUnit,
      countNumber: selection.countNumber,
      action: rule.action.type
    };
  });
  rules.sort(
    (left, right) => left.rulePriority - right.rulePriority
  );
  return {
    policySha256: sha256CanonicalJson(policy),
    ruleCount: rules.length,
    rules,
    taggedImagesRetained: true,
    minimumUntaggedRetentionDays: Math.min(
      ...rules.map((rule) => rule.countNumber)
    )
  };
}

async function verifyLiveResearchEcrImage({
  repository,
  destination,
  awsRunner,
  operationPrefix = "ECR"
}) {
  const [
    repositoryResponse,
    lifecycleResponse,
    imageResponse
  ] = await Promise.all([
    awsRunner([
      "ecr",
      "describe-repositories",
      "--registry-id",
      RESEARCH_AWS_ACCOUNT_ID,
      "--repository-names",
      repository.repositoryName,
      ...awsContextArgs(destination)
    ]),
    awsRunner([
      "ecr",
      "get-lifecycle-policy",
      "--registry-id",
      RESEARCH_AWS_ACCOUNT_ID,
      "--repository-name",
      repository.repositoryName,
      ...awsContextArgs(destination)
    ]),
    awsRunner([
      "ecr",
      "describe-images",
      "--registry-id",
      RESEARCH_AWS_ACCOUNT_ID,
      "--repository-name",
      repository.repositoryName,
      "--image-ids",
      `imageDigest=${repository.remoteImage.imageDigest}`,
      ...awsContextArgs(destination)
    ])
  ]);
  const repositoryControls =
    requireResearchEcrRepositoryControls({
      response: parseJsonOutput(
        repositoryResponse,
        `${operationPrefix}_DESCRIBE_REPOSITORY`
      ),
      repository
    });
  const lifecyclePolicy = requireResearchEcrLifecycle({
    response: parseJsonOutput(
      lifecycleResponse,
      `${operationPrefix}_GET_LIFECYCLE_POLICY`
    ),
    repository
  });
  const response = parseJsonOutput(
    imageResponse,
    `${operationPrefix}_DESCRIBE_EXACT_DIGEST`
  );
  if (
    !Array.isArray(response.imageDetails) ||
    response.imageDetails.length !== 1
  ) {
    throw new Error(
      `${operationPrefix}_EXACT_IMAGE_REQUIRED: ${repository.remoteImage.imageUri}`
    );
  }
  const image = response.imageDetails[0];
  if (
    image.registryId !== RESEARCH_AWS_ACCOUNT_ID ||
    image.repositoryName !==
      repository.repositoryName ||
    image.imageDigest !==
      repository.remoteImage.imageDigest ||
    image.imageSizeInBytes !==
      repository.remoteImage.imageSizeBytes ||
    image.imageManifestMediaType !==
      repository.remoteImage.imageManifestMediaType ||
    !Array.isArray(image.imageTags) ||
    !image.imageTags.includes(
      repository.remoteImage.imageTag
    )
  ) {
    throw new Error(
      `${operationPrefix}_LIVE_IMAGE_MISMATCH: ${repository.remoteImage.imageUri}`
    );
  }
  const recordedScan = repository.remoteImage.scan;
  const scannedManifestDigest =
    recordedScan?.scannedManifestDigest ??
    repository.remoteImage.imageDigest;
  const parentIsIndex =
    repository.remoteImage.imageManifestMediaType ===
    OCI_IMAGE_INDEX_MEDIA_TYPE;
  let parentBindingStatus =
    "SCAN_ON_EXACT_IMAGE_DIGEST";
  if (parentIsIndex) {
    if (
      !/^sha256:[a-f0-9]{64}$/.test(
        recordedScan?.scannedManifestDigest ?? ""
      ) ||
      scannedManifestDigest ===
        repository.remoteImage.imageDigest
    ) {
      throw new Error(
        `${operationPrefix}_SCAN_CHILD_DIGEST_REQUIRED: ${repository.remoteImage.imageUri}`
      );
    }
    const indexResponse = parseJsonOutput(
      await awsRunner([
        "ecr",
        "batch-get-image",
        "--registry-id",
        RESEARCH_AWS_ACCOUNT_ID,
        "--repository-name",
        repository.repositoryName,
        "--image-ids",
        `imageDigest=${repository.remoteImage.imageDigest}`,
        "--accepted-media-types",
        OCI_IMAGE_INDEX_MEDIA_TYPE,
        ...awsContextArgs(destination)
      ]),
      `${operationPrefix}_GET_EXACT_IMAGE_INDEX`
    );
    if (
      !Array.isArray(indexResponse.images) ||
      indexResponse.images.length !== 1 ||
      indexResponse.images[0].registryId !==
        RESEARCH_AWS_ACCOUNT_ID ||
      indexResponse.images[0].repositoryName !==
        repository.repositoryName ||
      indexResponse.images[0].imageId?.imageDigest !==
        repository.remoteImage.imageDigest ||
      indexResponse.images[0].imageManifestMediaType !==
        OCI_IMAGE_INDEX_MEDIA_TYPE
    ) {
      throw new Error(
        `${operationPrefix}_SCAN_PARENT_INDEX_MISMATCH: ${repository.remoteImage.imageUri}`
      );
    }
    let indexManifest;
    try {
      indexManifest = JSON.parse(
        indexResponse.images[0].imageManifest
      );
    } catch (error) {
      throw new Error(
        `${operationPrefix}_SCAN_PARENT_INDEX_INVALID: ${error.message}`
      );
    }
    if (
      indexManifest.mediaType !==
        OCI_IMAGE_INDEX_MEDIA_TYPE ||
      indexManifest.schemaVersion !== 2 ||
      !Array.isArray(indexManifest.manifests)
    ) {
      throw new Error(
        `${operationPrefix}_SCAN_PARENT_INDEX_INVALID: expected a schema-version 2 OCI image index`
      );
    }
    const [targetOs, targetArchitecture] =
      repository.localImage.targetPlatform.split("/");
    const matchingChildren = (
      indexManifest.manifests ?? []
    ).filter(
      (manifest) =>
        manifest.digest === scannedManifestDigest &&
        EXECUTABLE_IMAGE_MANIFEST_MEDIA_TYPES.includes(
          manifest.mediaType
        ) &&
        manifest.platform?.os === targetOs &&
        manifest.platform?.architecture ===
          targetArchitecture
    );
    if (matchingChildren.length !== 1) {
      throw new Error(
        `${operationPrefix}_SCAN_CHILD_NOT_BOUND_TO_TARGET_PLATFORM: ${repository.remoteImage.imageUri}`
      );
    }
    parentBindingStatus =
      "SCAN_ON_TARGET_PLATFORM_CHILD_BOUND_TO_EXACT_INDEX";
  } else if (
    recordedScan?.scannedManifestDigest != null &&
    scannedManifestDigest !==
      repository.remoteImage.imageDigest
  ) {
    throw new Error(
      `${operationPrefix}_DIRECT_SCAN_DIGEST_MISMATCH: ${repository.remoteImage.imageUri}`
    );
  }
  const scan = parseJsonOutput(
    await awsRunner([
      "ecr",
      "describe-image-scan-findings",
      "--registry-id",
      RESEARCH_AWS_ACCOUNT_ID,
      "--repository-name",
      repository.repositoryName,
      "--image-id",
      `imageDigest=${scannedManifestDigest}`,
      ...awsContextArgs(destination)
    ]),
    `${operationPrefix}_DESCRIBE_EXACT_DIGEST_SCAN`
  );
  const liveSeverityCounts =
    scan.imageScanFindings?.findingSeverityCounts ?? {};
  const liveScanCompletedAt =
    scan.imageScanFindings?.imageScanCompletedAt;
  if (
    scan.registryId !== RESEARCH_AWS_ACCOUNT_ID ||
    scan.repositoryName !== repository.repositoryName ||
    scan.imageId?.imageDigest !== scannedManifestDigest ||
    scan.imageScanStatus?.status !== "COMPLETE" ||
    !Number.isFinite(Date.parse(liveScanCompletedAt ?? "")) ||
    !recordedScan ||
    recordedScan.status !== "COMPLETE" ||
    Date.parse(liveScanCompletedAt) !==
      Date.parse(recordedScan.completedAt) ||
    (liveSeverityCounts.CRITICAL ?? 0) !==
      recordedScan.critical ||
    (liveSeverityCounts.HIGH ?? 0) !==
      recordedScan.high ||
    (liveSeverityCounts.MEDIUM ?? 0) !==
      recordedScan.medium ||
    (liveSeverityCounts.LOW ?? 0) !== recordedScan.low
  ) {
    throw new Error(
      `${operationPrefix}_LIVE_SCAN_MISMATCH: ${repository.remoteImage.imageUri}`
    );
  }
  return {
    registryId: image.registryId,
    repositoryName: image.repositoryName,
    imageDigest: image.imageDigest,
    imageSizeInBytes: image.imageSizeInBytes,
    imageManifestMediaType: image.imageManifestMediaType,
    verifiedTag: repository.remoteImage.imageTag,
    repositoryControls,
    lifecyclePolicy,
    exactDigestScan: {
      status: scan.imageScanStatus.status,
      completedAt: liveScanCompletedAt,
      parentImageDigest:
        repository.remoteImage.imageDigest,
      scannedManifestDigest,
      parentBindingStatus,
      critical: liveSeverityCounts.CRITICAL ?? 0,
      high: liveSeverityCounts.HIGH ?? 0,
      medium: liveSeverityCounts.MEDIUM ?? 0,
      low: liveSeverityCounts.LOW ?? 0,
      recordedEvidenceMatched: true
    },
    exactTaggedImageRetentionStatus:
      "VERIFIED_TAGGED_AND_EXCLUDED_FROM_UNTAGGED_ONLY_EXPIRATION"
  };
}

async function verifyLiveAuditedEcrImage({
  ecr,
  destination,
  awsRunner
}) {
  return await verifyLiveResearchEcrImage({
    repository: ecr.repository,
    destination,
    awsRunner,
    operationPrefix: "AUDITED_ECR"
  });
}

function ecrReplayRepositories(manifest) {
  validateManifestDigest(manifest);
  const ecr = manifest.destination?.ecr;
  if (
    ecr?.accountId !== RESEARCH_AWS_ACCOUNT_ID ||
    ecr?.region !== RESEARCH_AWS_REGION ||
    !Array.isArray(ecr.repositories)
  ) {
    throw new Error(
      "ECR_RESTORE_MANIFEST_DESTINATION_INVALID"
    );
  }
  return ECR_REPLAY_SPECS.map((spec) => {
    const repository = ecr.repositories.find(
      (candidate) =>
        candidate.modelId === spec.modelId &&
        candidate.repositoryName === spec.repositoryName
    );
    const expectedRepositoryUri =
      `${RESEARCH_AWS_ACCOUNT_ID}.dkr.ecr.${RESEARCH_AWS_REGION}.amazonaws.com/${spec.repositoryName}`;
    const remote = repository?.remoteImage;
    if (
      !repository ||
      repository.expectedRepositoryUri !==
        expectedRepositoryUri ||
      repository.localImage?.verificationStatus !==
        "PASS_COMMITTED_POST_HOC_REPLAY" ||
      !/^sha256:[a-f0-9]{64}$/.test(
        repository.localImage?.imageId ?? ""
      ) ||
      !/^linux\/(?:amd64|arm64)$/.test(
        repository.localImage?.targetPlatform ?? ""
      ) ||
      remote?.accountId !== RESEARCH_AWS_ACCOUNT_ID ||
      remote?.region !== RESEARCH_AWS_REGION ||
      remote?.repositoryName !== spec.repositoryName ||
      remote?.repositoryUri !== expectedRepositoryUri ||
      remote?.verificationStatus !==
        "VERIFIED_EXACT_DIGEST" ||
      remote?.exactDigestPulled !== true ||
      remote?.runtimeVerificationStatus !== "PASS" ||
      remote?.imageDigest !==
        repository.localImage.imageId ||
      remote?.imageUri !==
        `${expectedRepositoryUri}@${remote?.imageDigest}` ||
      !Number.isSafeInteger(remote?.imageSizeBytes) ||
      remote.imageSizeBytes <= 0 ||
      typeof remote?.imageManifestMediaType !== "string" ||
      remote.imageManifestMediaType.length === 0
    ) {
      throw new Error(
        `ECR_RESTORE_EXACT_PUBLICATION_REQUIRED: ${spec.modelId}`
      );
    }
    assertEcrBuildEvidence({
      manifest,
      repository,
      requireDurableArtifacts: true
    });
    return { spec, repository };
  });
}

export function planEcrImageRestore({
  manifest,
  destination,
  removeAfterReplay = false,
  runFullValidation = false,
  confirmNoActiveConsumers = false
}) {
  if (
    removeAfterReplay &&
    (!runFullValidation || confirmNoActiveConsumers !== true)
  ) {
    throw new Error(
      "ECR_RESTORE_LOCAL_REMOVAL_REQUIRES_FULL_VALIDATION_AND_CONFIRMATION"
    );
  }
  const validatedDestination =
    validateResearchDestination(destination);
  const repositories = ecrReplayRepositories(manifest);
  return {
    dryRun: true,
    operation: "restore-ecr-images",
    accountId: RESEARCH_AWS_ACCOUNT_ID,
    region: validatedDestination.region,
    imageCount: repositories.length,
    images: repositories.map(({ spec, repository }) => ({
      modelId: spec.modelId,
      imageUri: repository.remoteImage.imageUri,
      targetPlatform:
        repository.localImage.targetPlatform,
      verifierRelativePaths: [...spec.verifierRelativePaths]
    })),
    wouldVerifyResearchIdentity: true,
    wouldVerifyLiveRepositoryControls: true,
    wouldAuthenticateWithTemporaryDockerConfig: true,
    wouldPullExactDigests: true,
    wouldReplayOfflineVerifiers: true,
    wouldRunFullOfflineValidation: runFullValidation,
    wouldRequireAcceptedImagesAbsentBeforePull:
      removeAfterReplay,
    wouldRemoveExactEcrReferencesAndRequireImageAbsence:
      removeAfterReplay,
    wouldDeleteLocal: removeAfterReplay,
    wouldMutateAws: false
  };
}

async function defaultEcrVerifierRunner({
  repoRoot,
  verifierRelativePath,
  environmentKey,
  imageUri
}) {
  try {
    const nodePath =
      await verifiedNodeExecutablePath();
    const { stdout, stderr } = await execFileAsync(
      nodePath,
      [resolve(repoRoot, verifierRelativePath)],
      {
        cwd: repoRoot,
        encoding: "utf8",
        maxBuffer: 32 * 1024 * 1024,
        env: nodeSubprocessEnvironment({
          additional: {
            DOCKER_CONFIG: "/var/empty",
            DOCKER_HOST:
              "unix:///var/run/docker.sock",
            [environmentKey]: imageUri
          }
        })
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

function dockerImageNotFound(result) {
  return (
    result.exitCode !== 0 &&
    typeof result.stderr === "string" &&
    /\bno such (?:image|object)\b/i.test(
      result.stderr
    )
  );
}

async function inspectDockerImageIfPresent({
  dockerRunner,
  reference,
  operation
}) {
  const result = await dockerRunner([
    "image",
    "inspect",
    reference
  ]);
  if (dockerImageNotFound(result)) {
    return null;
  }
  return dockerInspectRecord(result, operation);
}

async function assertAcceptedEcrImageAbsent({
  spec,
  repository,
  dockerRunner
}) {
  for (const reference of [
    repository.localImage.imageId,
    repository.remoteImage.imageUri
  ]) {
    const inspection = await inspectDockerImageIfPresent({
      dockerRunner,
      reference,
      operation:
        `ECR_RESTORE_PREEXISTING_${spec.modelId.toUpperCase()}`
    });
    if (inspection) {
      throw new Error(
        `ECR_RESTORE_REMOVE_REQUIRES_IMAGE_ABSENT: ${spec.modelId}: ${reference}`
      );
    }
  }
}

function assertRestoredEcrInspection({
  spec,
  repository,
  inspection,
  requireDigest
}) {
  const imageUri = repository.remoteImage.imageUri;
  const tags = [...new Set(inspection.RepoTags ?? [])];
  const digests = [
    ...new Set(inspection.RepoDigests ?? [])
  ];
  if (
    inspection.Id !== repository.localImage.imageId ||
    inspection.Created !==
      repository.buildManifest.buildEvidence.builtAt ||
    (requireDigest && !digests.includes(imageUri))
  ) {
    throw new Error(
      `ECR_RESTORE_LOCAL_DIGEST_MISMATCH: ${imageUri}`
    );
  }
  const unexpectedDigests = digests.filter(
    (digest) => digest !== imageUri
  );
  const unexpectedTags = tags.filter(
    (tag) => tag !== imageUri
  );
  if (
    unexpectedTags.length > 0 ||
    unexpectedDigests.length > 0
  ) {
    throw new Error(
      `ECR_RESTORE_CLEANUP_UNEXPECTED_LOCAL_REFERENCES: ${spec.modelId}: ${[...unexpectedTags, ...unexpectedDigests].join(",")}`
    );
  }
  return { tags, digests };
}

async function assertNoDockerContainersForImage({
  dockerRunner,
  imageId,
  operation,
  errorCode,
  modelId
}) {
  const containers = successfulDockerOutput(
    await dockerRunner([
      "ps",
      "-aq",
      "--filter",
      `ancestor=${imageId}`
    ]),
    operation
  )
    .split("\n")
    .map((value) => value.trim())
    .filter(Boolean);
  if (containers.length > 0) {
    throw new Error(
      `${errorCode}: ${modelId}: ${containers.join(",")}`
    );
  }
}

async function removeRestoredEcrImage({
  spec,
  repository,
  dockerRunner
}) {
  const imageUri = repository.remoteImage.imageUri;
  const imageId = repository.localImage.imageId;
  const uriInspection = await inspectDockerImageIfPresent({
    dockerRunner,
    reference: imageUri,
    operation:
      `ECR_RESTORE_CLEANUP_URI_INSPECT_${spec.modelId.toUpperCase()}`
  });
  const idInspection = await inspectDockerImageIfPresent({
    dockerRunner,
    reference: imageId,
    operation:
      `ECR_RESTORE_CLEANUP_ID_INSPECT_${spec.modelId.toUpperCase()}`
  });
  if (!uriInspection && !idInspection) {
    throw new Error(
      `ECR_RESTORE_CLEANUP_IMAGE_DISAPPEARED_CONCURRENTLY: ${spec.modelId}`
    );
  }
  if (!uriInspection && idInspection) {
    throw new Error(
      `ECR_RESTORE_CLEANUP_EXACT_REFERENCE_MISSING: ${spec.modelId}`
    );
  }
  if (
    uriInspection &&
    idInspection &&
    uriInspection.Id !== idInspection.Id
  ) {
    throw new Error(
      `ECR_RESTORE_CLEANUP_REFERENCE_ID_MISMATCH: ${spec.modelId}`
    );
  }
  if (uriInspection) {
    assertRestoredEcrInspection({
      spec,
      repository,
      inspection: uriInspection,
      requireDigest: true
    });
  }
  if (idInspection) {
    assertRestoredEcrInspection({
      spec,
      repository,
      inspection: idInspection,
      requireDigest: Boolean(uriInspection)
    });
  }
  await assertNoDockerContainersForImage({
    dockerRunner,
    imageId,
    operation:
      `ECR_RESTORE_CLEANUP_CONTAINER_USE_${spec.modelId.toUpperCase()}`,
    errorCode:
      "ECR_RESTORE_CLEANUP_IMAGE_HAS_CONTAINERS",
    modelId: spec.modelId
  });
  if (uriInspection) {
    successfulDockerOutput(
      await dockerRunner(["image", "rm", imageUri]),
      `ECR_RESTORE_CLEANUP_URI_REMOVE_${spec.modelId.toUpperCase()}`
    );
    const remainingUri =
      await inspectDockerImageIfPresent({
        dockerRunner,
        reference: imageUri,
        operation:
          `ECR_RESTORE_CLEANUP_URI_REINSPECT_${spec.modelId.toUpperCase()}`
      });
    if (remainingUri) {
      throw new Error(
        `ECR_RESTORE_CLEANUP_URI_STILL_PRESENT: ${spec.modelId}`
      );
    }
  }
  const remainingId = await inspectDockerImageIfPresent({
    dockerRunner,
    reference: imageId,
    operation:
      `ECR_RESTORE_CLEANUP_ID_REINSPECT_${spec.modelId.toUpperCase()}`
  });
  if (remainingId) {
    const remainingReferences = {
      tags: [...new Set(remainingId.RepoTags ?? [])],
      digests: [
        ...new Set(remainingId.RepoDigests ?? [])
      ]
    };
    if (
      remainingId.Id !== imageId ||
      remainingId.Created !==
        repository.buildManifest.buildEvidence.builtAt
    ) {
      throw new Error(
        `ECR_RESTORE_CLEANUP_REMAINING_IMAGE_IDENTITY_CHANGED: ${spec.modelId}`
      );
    }
    throw new Error(
      `ECR_RESTORE_CLEANUP_IMAGE_RETAINED_AFTER_EXACT_REFERENCE_REMOVAL: ${spec.modelId}: ${
        [
          ...remainingReferences.tags,
          ...remainingReferences.digests
        ].join(",") || "untagged image"
      }`
    );
  }
  const remainingUri =
    await inspectDockerImageIfPresent({
      dockerRunner,
      reference: imageUri,
      operation:
        `ECR_RESTORE_CLEANUP_URI_FINAL_INSPECT_${spec.modelId.toUpperCase()}`
    });
  if (remainingUri) {
    throw new Error(
      `ECR_RESTORE_CLEANUP_URI_REAPPEARED: ${spec.modelId}`
    );
  }
  return {
    status: ECR_LOCAL_CLEANUP_COMPLETE_STATUS,
    imageUri,
    imageId,
    removalScope:
      "EXACT_ECR_DIGEST_REFERENCE_ONLY",
    imageIdRemovalAttempted: false
  };
}

export async function restoreAndReplayEcrImages({
  repoRoot,
  manifest,
  destination,
  removeAfterReplay = false,
  postReplayAction = null,
  confirmNoActiveConsumers = false,
  runner = defaultAwsRunner,
  dockerRunner = defaultDockerRunner,
  verifierRunner = defaultEcrVerifierRunner,
  createDockerConfig = createIsolatedDockerConfig,
  removeDockerConfig = (path) =>
    rm(path, { recursive: true, force: true })
}) {
  if (
    removeAfterReplay &&
    (postReplayAction === null ||
      confirmNoActiveConsumers !== true)
  ) {
    throw new Error(
      "ECR_RESTORE_LOCAL_REMOVAL_REQUIRES_FULL_VALIDATION_AND_CONFIRMATION"
    );
  }
  await assertLivePostHocReplayReceipt({
    repoRoot,
    manifest
  });
  const plan = planEcrImageRestore({
    manifest,
    destination,
    removeAfterReplay,
    runFullValidation: postReplayAction !== null,
    confirmNoActiveConsumers
  });
  if (
    postReplayAction !== null &&
    typeof postReplayAction !== "function"
  ) {
    throw new Error(
      "ECR_RESTORE_POST_REPLAY_ACTION_INVALID"
    );
  }
  const validatedDestination =
    validateResearchDestination(destination);
  const repositories = ecrReplayRepositories(manifest);
  if (removeAfterReplay) {
    for (const { spec, repository } of repositories) {
      await assertAcceptedEcrImageAbsent({
        spec,
        repository,
        dockerRunner
      });
    }
  }
  const identity = await verifyResearchIdentity(
    validatedDestination,
    { runner }
  );
  const preflight = [];
  for (const { spec, repository } of repositories) {
    preflight.push({
      modelId: spec.modelId,
      imageUri: repository.remoteImage.imageUri,
      liveEcr: await verifyLiveResearchEcrImage({
        repository,
        destination: validatedDestination,
        awsRunner: runner,
        operationPrefix: "ECR_RESTORE"
      })
    });
  }

  const login = await runner([
    "ecr",
    "get-login-password",
    ...awsContextArgs(validatedDestination)
  ]);
  if (
    login.exitCode !== 0 ||
    typeof login.stdout !== "string" ||
    login.stdout.trim().length === 0
  ) {
    throw new Error(
      `ECR_RESTORE_LOGIN_PASSWORD_FAILED: ${String(login.stderr ?? "").trim() || `exit ${login.exitCode}`}`
    );
  }

  const dockerConfigPath = await createDockerConfig();
  const registry =
    `${RESEARCH_AWS_ACCOUNT_ID}.dkr.ecr.${RESEARCH_AWS_REGION}.amazonaws.com`;
  const results = [];
  const cleanupCandidates = [];
  const cleanupByModel = new Map();
  const cleanupErrors = [];
  let operationError = null;
  let postReplayResult = null;
  try {
    successfulDockerOutput(
      await dockerRunner(
        [
          "--config",
          dockerConfigPath,
          "login",
          "--username",
          "AWS",
          "--password-stdin",
          registry
        ],
        {
          stdin: login.stdout,
          dockerConfig: dockerConfigPath
        }
      ),
      "ECR_RESTORE_DOCKER_LOGIN"
    );
    for (const { spec, repository } of repositories) {
      const imageUri = repository.remoteImage.imageUri;
      cleanupCandidates.push({ spec, repository });
      successfulDockerOutput(
        await dockerRunner(
          [
            "--config",
            dockerConfigPath,
            "pull",
            "--platform",
            repository.localImage.targetPlatform,
            imageUri
          ],
          {
            dockerConfig: dockerConfigPath
          }
        ),
        `ECR_RESTORE_PULL_${spec.modelId.toUpperCase()}`
      );
      const inspection = dockerInspectRecord(
        await dockerRunner([
          "image",
          "inspect",
          imageUri
        ]),
        `ECR_RESTORE_INSPECT_${spec.modelId.toUpperCase()}`
      );
      const repoDigests = [
        ...new Set(inspection.RepoDigests ?? [])
      ];
      if (
        inspection.Id !== repository.localImage.imageId ||
        inspection.Created !==
          repository.buildManifest.buildEvidence.builtAt ||
        !repoDigests.includes(imageUri)
      ) {
        throw new Error(
          `ECR_RESTORE_LOCAL_DIGEST_MISMATCH: ${imageUri}`
        );
      }
      const verifierResults = [];
      for (const verifierRelativePath of spec.verifierRelativePaths) {
        const verification = await verifierRunner({
          repoRoot,
          modelId: spec.modelId,
          verifierRelativePath,
          environmentKey: spec.environmentKey,
          imageUri
        });
        if (verification.exitCode !== 0) {
          throw new Error(
            `ECR_RESTORE_REPLAY_FAILED: ${spec.modelId}: ${verifierRelativePath}: ${String(verification.stderr ?? "").trim() || `exit ${verification.exitCode}`}`
          );
        }
        verifierResults.push({
          verifierRelativePath,
          status: "PASS"
        });
      }
      results.push({
        modelId: spec.modelId,
        imageUri,
        imageId: inspection.Id,
        targetPlatform:
          repository.localImage.targetPlatform,
        pullStatus: "PULLED_EXACT_DIGEST",
        replayStatus: "PASS",
        verifierResults,
        liveEcr: preflight.find(
          (record) => record.modelId === spec.modelId
        ).liveEcr,
        localCleanup: null
      });
    }
    if (postReplayAction) {
      postReplayResult = await postReplayAction({
        repoRoot,
        manifest,
        results
      });
    }
  } catch (error) {
    operationError = error;
  } finally {
    if (removeAfterReplay) {
      for (
        let index = cleanupCandidates.length - 1;
        index >= 0;
        index -= 1
      ) {
        const { spec, repository } =
          cleanupCandidates[index];
        try {
          cleanupByModel.set(
            spec.modelId,
            await removeRestoredEcrImage({
              spec,
              repository,
              dockerRunner
            })
          );
        } catch (error) {
          cleanupErrors.push(error);
        }
      }
    }
    try {
      await removeDockerConfig(dockerConfigPath);
    } catch (error) {
      cleanupErrors.push(error);
    }
  }
  if (operationError || cleanupErrors.length > 0) {
    const errors = [
      ...(operationError ? [operationError] : []),
      ...cleanupErrors
    ];
    if (errors.length === 1) {
      throw errors[0];
    }
    throw new AggregateError(
      errors,
      `ECR_RESTORE_REPLAY_AND_CLEANUP_FAILED: ${errors.map((error) => error.message).join(" | ")}`
    );
  }
  for (const result of results) {
    result.localCleanup =
      cleanupByModel.get(result.modelId) ?? null;
  }
  return {
    ...plan,
    dryRun: false,
    disposition:
      removeAfterReplay
        ? "EXACT_ECR_DIGESTS_RESTORED_REPLAYED_AND_REMOVED_LOCALLY"
        : "EXACT_ECR_DIGESTS_RESTORED_AND_OFFLINE_REPLAYED",
    verifiedResearchIdentity: identity,
    temporaryDockerCredentialRetained: false,
    postReplayResult,
    results
  };
}

export function recordEcrRestoreReplay({
  manifest,
  result,
  now = () => new Date().toISOString()
}) {
  validateManifestDigest(manifest);
  const repositories = ecrReplayRepositories(manifest);
  if (
    result?.dryRun !== false ||
    result.temporaryDockerCredentialRetained !== false ||
    result.verifiedResearchIdentity?.accountId !==
      RESEARCH_AWS_ACCOUNT_ID ||
    !RESEARCH_ROLE_ARN_PATTERN.test(
      result.verifiedResearchIdentity?.arn ?? ""
    ) ||
    !Array.isArray(result.results) ||
    result.results.length !== repositories.length
  ) {
    throw new Error(
      "ECR_RESTORE_RECEIPT_INVALID"
    );
  }
  const expectedByModel = new Map(
    repositories.map(({ spec, repository }) => [
      spec.modelId,
      { spec, repository }
    ])
  );
  const images = result.results
    .map((record) => {
      const expected = expectedByModel.get(
        record.modelId
      );
      const repository = expected?.repository;
      const spec = expected?.spec;
      const liveEcr = record.liveEcr;
      const recordedScan = repository?.remoteImage?.scan;
      const expectedVerifierPaths = [
        ...(spec?.verifierRelativePaths ?? [])
      ].sort();
      const actualVerifierPaths = Array.isArray(
        record.verifierResults
      )
        ? record.verifierResults
            .map(
              (verification) =>
                verification.verifierRelativePath
            )
            .sort()
        : [];
      const parentIsIndex =
        repository?.remoteImage?.imageManifestMediaType ===
        OCI_IMAGE_INDEX_MEDIA_TYPE;
      if (
        !repository ||
        !spec ||
        record.imageUri !==
          repository.remoteImage.imageUri ||
        record.imageId !==
          repository.localImage.imageId ||
        record.targetPlatform !==
          repository.localImage.targetPlatform ||
        record.pullStatus !==
          "PULLED_EXACT_DIGEST" ||
        record.replayStatus !== "PASS" ||
        !Array.isArray(record.verifierResults) ||
        JSON.stringify(actualVerifierPaths) !==
          JSON.stringify(expectedVerifierPaths) ||
        record.verifierResults.some(
          (verification) =>
            verification.status !== "PASS"
        ) ||
        liveEcr?.repositoryControls
          ?.imageTagMutability !== "IMMUTABLE" ||
        liveEcr?.repositoryControls?.encryptionType !==
          "AES256" ||
        liveEcr?.repositoryControls?.scanOnPush !== true ||
        liveEcr?.lifecyclePolicy?.taggedImagesRetained !==
          true ||
        !Number.isSafeInteger(
          liveEcr?.lifecyclePolicy
            ?.minimumUntaggedRetentionDays
        ) ||
        liveEcr.lifecyclePolicy
          .minimumUntaggedRetentionDays < 14 ||
        liveEcr?.exactDigestScan?.status !== "COMPLETE" ||
        liveEcr.exactDigestScan.recordedEvidenceMatched !==
          true ||
        liveEcr.exactDigestScan.parentImageDigest !==
          repository?.remoteImage?.imageDigest ||
        liveEcr.exactDigestScan.scannedManifestDigest !==
          (recordedScan?.scannedManifestDigest ??
            repository?.remoteImage?.imageDigest) ||
        liveEcr.exactDigestScan.parentBindingStatus !==
          (parentIsIndex
            ? "SCAN_ON_TARGET_PLATFORM_CHILD_BOUND_TO_EXACT_INDEX"
            : "SCAN_ON_EXACT_IMAGE_DIGEST") ||
        liveEcr.exactDigestScan.critical !==
          recordedScan?.critical ||
        liveEcr.exactDigestScan.high !==
          recordedScan?.high ||
        liveEcr.exactDigestScan.medium !==
          recordedScan?.medium ||
        liveEcr.exactDigestScan.low !== recordedScan?.low
      ) {
        throw new Error(
          `ECR_RESTORE_RECEIPT_IMAGE_INVALID: ${record.modelId ?? "unknown"}`
        );
      }
      expectedByModel.delete(record.modelId);
      const cleanupStatus =
        record.localCleanup?.status ?? "RETAINED";
      if (
        ![
          "RETAINED",
          ECR_LOCAL_CLEANUP_COMPLETE_STATUS
        ].includes(cleanupStatus)
      ) {
        throw new Error(
          `ECR_RESTORE_RECEIPT_CLEANUP_INVALID: ${record.modelId}`
        );
      }
      const durableArtifactEvidence =
        assertEcrBuildEvidence({
          manifest,
          repository,
          requireDurableArtifacts: true
        }).durableArtifacts;
      return {
        modelId: record.modelId,
        imageUri: record.imageUri,
        imageId: record.imageId,
        targetPlatform: record.targetPlatform,
        pullStatus: record.pullStatus,
        replayStatus: record.replayStatus,
        verifierResults: record.verifierResults,
        localCleanupStatus: cleanupStatus,
        liveEcr: structuredClone(liveEcr),
        durableArtifactEvidence: structuredClone(
          durableArtifactEvidence
        ),
        durableArtifactEvidenceSha256:
          ecrEvidenceDigest(durableArtifactEvidence),
        licenseEvidenceSetSha256:
          durableArtifactEvidence.licenseEvidence
            .evidenceSetSha256
      };
    })
    .sort((left, right) =>
      left.modelId.localeCompare(right.modelId)
    );
  if (expectedByModel.size > 0) {
    throw new Error(
      "ECR_RESTORE_RECEIPT_IMAGE_SET_INCOMPLETE"
    );
  }
  const fullValidationRecorded =
    result.postReplayResult !== null;
  if (
    fullValidationRecorded &&
    (
      result.postReplayResult?.disposition !==
        "ALL_PACKAGES_MARKED_CLEANUP_ELIGIBLE" ||
      manifest.execution?.finalCleanupValidation
        ?.status !== "PASSED"
    )
  ) {
    throw new Error(
      "ECR_RESTORE_RECEIPT_VALIDATION_INVALID"
    );
  }
  const allImagesRemovedLocally = images.every(
    (image) =>
      image.localCleanupStatus ===
      ECR_LOCAL_CLEANUP_COMPLETE_STATUS
  );
  const expectedDisposition = allImagesRemovedLocally
    ? "EXACT_ECR_DIGESTS_RESTORED_REPLAYED_AND_REMOVED_LOCALLY"
    : "EXACT_ECR_DIGESTS_RESTORED_AND_OFFLINE_REPLAYED";
  if (result.disposition !== expectedDisposition) {
    throw new Error(
      "ECR_RESTORE_RECEIPT_DISPOSITION_INVALID"
    );
  }
  const validation = fullValidationRecorded
    ? manifest.execution.finalCleanupValidation
    : null;
  const receipt = {
    status: "PASS",
    completedAt: now(),
    accountId: RESEARCH_AWS_ACCOUNT_ID,
    region: RESEARCH_AWS_REGION,
    principalArn:
      result.verifiedResearchIdentity.arn,
    exactDigestPullsVerified: true,
    offlineModelReplayVerified: true,
    fullValidationRecorded,
    finalCleanupValidation: validation
      ? {
          sha256: sha256CanonicalJson(validation),
          validatedAt: validation.validatedAt,
          validatedSourceCommit:
            validation.validatedSourceCommit,
          validatedRepositoryTreeDigest:
            validation.validatedRepositoryTreeDigest,
          packageCount: validation.packageCount
        }
      : null,
    allImagesRemovedLocally,
    temporaryDockerCredentialRetained: false,
    images
  };
  manifest.execution.lastEcrRestoreReplay = receipt;
  assertCurrentEcrRestoreReceipt({
    manifest,
    receipt,
    specs: ECR_REPLAY_SPECS,
    accountId: RESEARCH_AWS_ACCOUNT_ID,
    region: RESEARCH_AWS_REGION,
    principalArnPattern: RESEARCH_ROLE_ARN_PATTERN,
    requireFullValidation: fullValidationRecorded,
    requireLocalCleanup: allImagesRemovedLocally,
    requireDurableArtifacts: true
  });
  manifest.manifestContentSha256 =
    stableManifestDigest(manifest);
  return manifest.execution.lastEcrRestoreReplay;
}

async function verifyAuditedDockerImage({
  manifest,
  record,
  destination,
  awsRunner,
  dockerRunner
}) {
  if (
    !Number.isSafeInteger(record.byteSize) ||
    record.byteSize <= 0 ||
    !/^[a-f0-9]{64}$/.test(record.sha256)
  ) {
    throw new Error(
      `AUDITED_DOCKER_IMAGE_FINGERPRINT_INVALID: ${record.originalPath}`
    );
  }
  const ecr = ecrRecordForAuditedImage(manifest, record);
  const liveEcr = await verifyLiveAuditedEcrImage({
    ecr,
    destination,
    awsRunner
  });
  const imageIdInspect = dockerInspectRecord(
    await dockerRunner([
      "image",
      "inspect",
      ecr.imageId
    ]),
    "AUDITED_DOCKER_EXACT_IMAGE_ID_INSPECT"
  );
  const remoteTagInspect = dockerInspectRecord(
    await dockerRunner([
      "image",
      "inspect",
      ecr.expectedRemoteTag
    ]),
    "AUDITED_DOCKER_ECR_TAG_INSPECT"
  );
  const actualTags = [
    ...new Set(imageIdInspect.RepoTags ?? [])
  ].sort();
  const remoteInspectTags = [
    ...new Set(remoteTagInspect.RepoTags ?? [])
  ].sort();
  const actualDigests = [
    ...new Set(imageIdInspect.RepoDigests ?? [])
  ].sort();
  const remoteInspectDigests = [
    ...new Set(remoteTagInspect.RepoDigests ?? [])
  ].sort();
  if (
    imageIdInspect.Id !== ecr.imageId ||
    remoteTagInspect.Id !== ecr.imageId ||
    imageIdInspect.Created !== ecr.buildEvidence.builtAt ||
    remoteTagInspect.Created !== ecr.buildEvidence.builtAt ||
    imageIdInspect.Size !== record.byteSize ||
    remoteTagInspect.Size !== record.byteSize ||
    actualTags.length !== ecr.expectedTags.length ||
    actualTags.some(
      (tag, index) => tag !== ecr.expectedTags[index]
    ) ||
    remoteInspectTags.length !== ecr.expectedTags.length ||
    remoteInspectTags.some(
      (tag, index) => tag !== ecr.expectedTags[index]
    ) ||
    actualDigests.length !==
      ecr.expectedDigests.length ||
    actualDigests.some(
      (digest, index) =>
        digest !== ecr.expectedDigests[index]
    ) ||
    remoteInspectDigests.length !==
      ecr.expectedDigests.length ||
    remoteInspectDigests.some(
      (digest, index) =>
        digest !== ecr.expectedDigests[index]
    )
  ) {
    throw new Error(
      `AUDITED_DOCKER_IMAGE_ID_SIZE_OR_TAG_SET_MISMATCH: ${ecr.parsed.reference}`
    );
  }
  await assertNoDockerContainersForImage({
    dockerRunner,
    imageId: ecr.imageId,
    operation: "AUDITED_DOCKER_CONTAINER_USE_CHECK",
    errorCode: "AUDITED_DOCKER_IMAGE_HAS_CONTAINERS",
    modelId: ecr.parsed.reference
  });
  return {
    imageId: ecr.imageId,
    tags: ecr.expectedTags,
    digests: ecr.expectedDigests,
    references: ecr.expectedReferences,
    builtAt: ecr.buildEvidence.builtAt,
    sizeBytes: record.byteSize,
    ecrImageUri: ecr.repository.remoteImage.imageUri,
    liveEcr
  };
}

async function removeAuditedDockerImage({
  manifest,
  record,
  destination,
  awsRunner,
  dockerRunner
}) {
  const verified = await verifyAuditedDockerImage({
    manifest,
    record,
    destination,
    awsRunner,
    dockerRunner
  });
  const allowedTags = new Set(verified.tags);
  const allowedDigests = new Set(verified.digests);
  const assertInspectionIsStillAudited = (inspection) => {
    const actualTags = [
      ...new Set(inspection.RepoTags ?? [])
    ];
    const actualDigests = [
      ...new Set(inspection.RepoDigests ?? [])
    ];
    if (
      inspection.Id !== verified.imageId ||
      inspection.Created !== verified.builtAt ||
      inspection.Size !== verified.sizeBytes ||
      actualTags.some((tag) => !allowedTags.has(tag)) ||
      actualDigests.some(
        (digest) => !allowedDigests.has(digest)
      )
    ) {
      throw new Error(
        `AUDITED_DOCKER_IMAGE_CHANGED_DURING_CLEANUP: ${verified.imageId}`
      );
    }
    return { actualTags, actualDigests };
  };
  let imageRemoved = false;
  for (const reference of verified.references) {
    const referenceInspection =
      await inspectDockerImageIfPresent({
        dockerRunner,
        reference,
        operation:
          "AUDITED_DOCKER_REFERENCE_REINSPECT"
      });
    if (!referenceInspection) continue;
    assertInspectionIsStillAudited(referenceInspection);
    await assertNoDockerContainersForImage({
      dockerRunner,
      imageId: verified.imageId,
      operation:
        "AUDITED_DOCKER_CONTAINER_USE_RECHECK",
      errorCode:
        "AUDITED_DOCKER_IMAGE_HAS_CONTAINERS",
      modelId: verified.imageId
    });
    successfulDockerOutput(
      await dockerRunner(["image", "rm", reference]),
      "AUDITED_DOCKER_EXACT_REFERENCE_REMOVE"
    );
    const remaining =
      await inspectDockerImageIfPresent({
        dockerRunner,
        reference: verified.imageId,
        operation:
          "AUDITED_DOCKER_IMAGE_ID_REINSPECT"
      });
    if (!remaining) {
      imageRemoved = true;
      break;
    }
    assertInspectionIsStillAudited(remaining);
  }
  if (!imageRemoved) {
    const remaining = await inspectDockerImageIfPresent({
      dockerRunner,
      reference: verified.imageId,
      operation:
        "AUDITED_DOCKER_FINAL_ID_REINSPECT"
    });
    if (remaining) {
      const references =
        assertInspectionIsStillAudited(remaining);
      throw new Error(
        `AUDITED_DOCKER_IMAGE_RETAINED_AFTER_EXACT_REFERENCE_REMOVAL: ${verified.imageId}: ${
          [
            ...references.actualTags,
            ...references.actualDigests
          ].join(",") || "untagged image"
        }`
      );
    }
  }
  for (const tag of verified.references) {
    const inspect = await dockerRunner([
      "image",
      "inspect",
      tag
    ]);
    if (inspect.exitCode === 0) {
      throw new Error(
        `AUDITED_DOCKER_TAG_STILL_PRESENT_AFTER_REMOVE: ${tag}`
      );
    }
  }
  const imageInspect = await dockerRunner([
    "image",
    "inspect",
    verified.imageId
  ]);
  if (imageInspect.exitCode === 0) {
    throw new Error(
      `AUDITED_DOCKER_IMAGE_STILL_PRESENT_AFTER_REMOVE: ${verified.imageId}`
    );
  }
  return verified;
}

function validateExistingAuditedCleanup({
  manifest,
  audit,
  records
}) {
  const execution =
    manifest.execution?.auditedLocalArtifactCleanup;
  if (!execution) return new Map();
  if (
    execution.auditSourceSha256 !== audit.sourceSha256 ||
    execution.validatedSourceCommit !==
      manifest.execution.finalCleanupValidation
        .validatedSourceCommit ||
    execution.validatedRepositoryTreeDigest !==
      manifest.execution.finalCleanupValidation
        .validatedRepositoryTreeDigest ||
    !Array.isArray(execution.results)
  ) {
    throw new Error(
      "AUDITED_LOCAL_CLEANUP_EXECUTION_STATE_INVALID"
    );
  }
  const targetByPath = new Map(
    records.map((record) => [
      record.originalPath,
      record
    ])
  );
  const results = new Map();
  for (const result of execution.results) {
    const target = targetByPath.get(result.originalPath);
    if (
      !target ||
      target.disposition === "MIGRATE_UNIQUE" ||
      !AUDITED_COMPLETED_STATUSES.has(
        result.cleanupStatus
      ) ||
      results.has(result.originalPath)
    ) {
      throw new Error(
        `AUDITED_LOCAL_CLEANUP_RESULT_INVALID: ${result.originalPath ?? "unknown"}`
      );
    }
    const expectedStatus =
      target.recordKind === "DOCKER_IMAGE"
        ? AUDITED_DOCKER_REMOVED_STATUS
        : target.recordKind === "SHARED_BUILDKIT_CACHE"
          ? AUDITED_BUILDKIT_RETAINED_STATUS
          : AUDITED_LOCAL_DELETED_STATUS;
    if (result.cleanupStatus !== expectedStatus) {
      throw new Error(
        `AUDITED_LOCAL_CLEANUP_RESULT_STATUS_INVALID: ${result.originalPath}`
      );
    }
    if (
      result.groupId !== target.groupId ||
      result.recordKind !== target.recordKind ||
      result.disposition !== target.disposition ||
      !result.completedAt
    ) {
      throw new Error(
        `AUDITED_LOCAL_CLEANUP_RESULT_IDENTITY_INVALID: ${result.originalPath}`
      );
    }
    if (
      target.recordKind === "EXACT_FILE" &&
      (result.verification?.sizeBytes !== target.byteSize ||
        result.verification?.sha256 !== target.sha256)
    ) {
      throw new Error(
        `AUDITED_LOCAL_CLEANUP_RESULT_FINGERPRINT_INVALID: ${result.originalPath}`
      );
    }
    if (
      target.recordKind === "DIRECTORY_AGGREGATE" &&
      (result.verification?.fileCount !== target.fileCount ||
        result.verification?.symlinkCount !==
          target.symlinkCount ||
        result.verification?.logicalBytes !==
          target.logicalBytes)
    ) {
      throw new Error(
        `AUDITED_LOCAL_CLEANUP_RESULT_AGGREGATE_INVALID: ${result.originalPath}`
      );
    }
    if (target.recordKind === "DOCKER_IMAGE") {
      const ecr = ecrRecordForAuditedImage(manifest, target);
      const removedTags = [
        ...(result.verification?.removedTags ?? [])
      ].sort();
      const removedDigests = [
        ...(result.verification?.removedDigests ?? [])
      ].sort();
      const removedReferences = [
        ...(result.verification?.removedReferences ?? [])
      ].sort();
      const liveEcr = result.verification?.liveEcr;
      if (
        result.verification?.imageId !== ecr.imageId ||
        result.verification?.sizeBytes !== target.byteSize ||
        result.verification?.ecrImageUri !==
          ecr.repository.remoteImage.imageUri ||
        liveEcr?.repositoryControls
          ?.imageTagMutability !== "IMMUTABLE" ||
        liveEcr?.repositoryControls?.encryptionType !==
          "AES256" ||
        liveEcr?.repositoryControls?.scanOnPush !== true ||
        liveEcr?.exactDigestScan?.status !== "COMPLETE" ||
        liveEcr.exactDigestScan.recordedEvidenceMatched !==
          true ||
        liveEcr.exactDigestScan.parentImageDigest !==
          ecr.repository.remoteImage.imageDigest ||
        liveEcr.exactDigestScan.scannedManifestDigest !==
          (ecr.repository.remoteImage.scan
            ?.scannedManifestDigest ??
            ecr.repository.remoteImage.imageDigest) ||
        liveEcr.exactDigestScan.critical !==
          ecr.repository.remoteImage.scan?.critical ||
        liveEcr.exactDigestScan.high !==
          ecr.repository.remoteImage.scan?.high ||
        liveEcr.exactDigestScan.medium !==
          ecr.repository.remoteImage.scan?.medium ||
        liveEcr.exactDigestScan.low !==
          ecr.repository.remoteImage.scan?.low ||
        liveEcr?.lifecyclePolicy?.taggedImagesRetained !==
          true ||
        !Number.isSafeInteger(
          liveEcr?.lifecyclePolicy
            ?.minimumUntaggedRetentionDays
        ) ||
        liveEcr.lifecyclePolicy
          .minimumUntaggedRetentionDays < 14 ||
        liveEcr?.exactTaggedImageRetentionStatus !==
          "VERIFIED_TAGGED_AND_EXCLUDED_FROM_UNTAGGED_ONLY_EXPIRATION" ||
        removedTags.length !== ecr.expectedTags.length ||
        removedTags.some(
          (tag, index) => tag !== ecr.expectedTags[index]
        ) ||
        removedDigests.length !==
          ecr.expectedDigests.length ||
        removedDigests.some(
          (digest, index) =>
            digest !== ecr.expectedDigests[index]
        ) ||
        removedReferences.length !==
          ecr.expectedReferences.length ||
        removedReferences.some(
          (reference, index) =>
            reference !== ecr.expectedReferences[index]
        )
      ) {
        throw new Error(
          `AUDITED_LOCAL_CLEANUP_RESULT_IMAGE_PROOF_INVALID: ${result.originalPath}`
        );
      }
    }
    if (
      target.recordKind === "SHARED_BUILDKIT_CACHE" &&
      result.verification?.broadPrunePerformed !== false
    ) {
      throw new Error(
        `AUDITED_LOCAL_CLEANUP_RESULT_BUILDKIT_INVALID: ${result.originalPath}`
      );
    }
    results.set(result.originalPath, result);
  }
  return results;
}

async function assertPreviouslyCleanedArtifactStillAbsent({
  record,
  result,
  dockerRunner
}) {
  if (record.recordKind === "SHARED_BUILDKIT_CACHE") {
    return;
  }
  if (record.recordKind === "DOCKER_IMAGE") {
    for (const reference of [
      ...(result.verification?.removedReferences ?? []),
      result.verification?.imageId
    ].filter(Boolean)) {
      const inspect = await dockerRunner([
        "image",
        "inspect",
        reference
      ]);
      if (inspect.exitCode === 0) {
        throw new Error(
          `AUDITED_DOCKER_IMAGE_REAPPEARED: ${reference}`
        );
      }
    }
    return;
  }
  try {
    await lstat(record.originalPath);
  } catch (error) {
    if (error.code === "ENOENT") return;
    throw error;
  }
  throw new Error(
    `AUDITED_LOCAL_ARTIFACT_REAPPEARED: ${record.originalPath}`
  );
}

async function assertAuditedPathAbsent(path) {
  try {
    await lstat(path);
  } catch (error) {
    if (error.code === "ENOENT") return;
    throw error;
  }
  throw new Error(
    `AUDITED_LOCAL_ARTIFACT_STILL_PRESENT_AFTER_DELETE: ${path}`
  );
}

async function defaultAuditedDirectoryDelete(path) {
  await rm(path, { recursive: true, force: false });
}

function checkpointedFilesystemAction({
  ownerType,
  ownerId,
  actionType,
  targetPath,
  materializationGeneration = 0,
  expected
}) {
  const base = {
    ownerType,
    ownerId,
    actionType,
    targetPath,
    materializationGeneration,
    expected
  };
  const actionId = cleanupActionIdentity(base);
  return {
    ...base,
    actionId,
    quarantinePath: cleanupQuarantinePath(
      targetPath,
      actionId
    )
  };
}

async function pathExists(path) {
  try {
    await lstat(path);
    return true;
  } catch (error) {
    if (error.code === "ENOENT") return false;
    throw error;
  }
}

async function runCheckpointedFilesystemAction({
  manifestPath,
  manifest,
  checkpointState,
  checkpointManifest,
  action,
  verifyPath,
  deleteQuarantine,
  renamePath = rename,
  now,
  onCompleted = () => {}
}) {
  const completed = completedCleanupAction(
    manifest,
    action.actionId
  );
  if (completed) {
    if (
      (await pathExists(action.targetPath)) ||
      (await pathExists(action.quarantinePath))
    ) {
      throw new Error(
        `LOCAL_CLEANUP_COMPLETED_ACTION_REAPPEARED: ${action.actionId}`
      );
    }
    return completed;
  }
  let pending = pendingCleanupActionForPlan(
    manifest,
    action
  );
  if (!pending) {
    await verifyPath(action.targetPath);
    if (await pathExists(action.quarantinePath)) {
      throw new Error(
        `LOCAL_CLEANUP_QUARANTINE_ALREADY_EXISTS: ${action.quarantinePath}`
      );
    }
    const createdAt = now();
    checkpointState.sourceSha256 =
      await checkpointCleanupJournal({
        manifestPath,
        manifest,
        expectedSourceSha256:
          checkpointState.sourceSha256,
        checkpointManifest,
        mutate: (journal) => {
          journal.status = "IN_PROGRESS";
          journal.pendingAction = {
            ...action,
            state: "PENDING",
            createdAt,
            quarantinedAt: null
          };
        }
      });
    pending =
      manifest.execution.localCleanupJournal
        .pendingAction;
  }

  let targetPresent = await pathExists(action.targetPath);
  let quarantinePresent = await pathExists(
    action.quarantinePath
  );
  if (targetPresent && quarantinePresent) {
    throw new Error(
      `LOCAL_CLEANUP_TARGET_AND_QUARANTINE_BOTH_PRESENT: ${action.actionId}`
    );
  }
  let reconciledFromAbsence = false;
  if (targetPresent) {
    await verifyPath(action.targetPath);
    await renamePath(
      action.targetPath,
      action.quarantinePath
    );
    targetPresent = false;
    quarantinePresent = true;
  } else if (!quarantinePresent) {
    reconciledFromAbsence = true;
  }
  if (quarantinePresent) {
    await verifyPath(action.quarantinePath);
    if (pending.state !== "QUARANTINED") {
      checkpointState.sourceSha256 =
        await checkpointCleanupJournal({
          manifestPath,
          manifest,
          expectedSourceSha256:
            checkpointState.sourceSha256,
          checkpointManifest,
          mutate: (journal) => {
            journal.pendingAction = {
              ...journal.pendingAction,
              state: "QUARANTINED",
              quarantinedAt: now()
            };
          }
        });
    }
    await verifyPath(action.quarantinePath);
    await deleteQuarantine(action.quarantinePath);
  }
  if (
    (await pathExists(action.targetPath)) ||
    (await pathExists(action.quarantinePath))
  ) {
    throw new Error(
      `LOCAL_CLEANUP_ACTION_PATH_STILL_PRESENT: ${action.actionId}`
    );
  }
  const completedAt = now();
  checkpointState.sourceSha256 =
    await checkpointCleanupJournal({
      manifestPath,
      manifest,
      expectedSourceSha256:
        checkpointState.sourceSha256,
      checkpointManifest,
      mutate: (journal) => {
        onCompleted(completedAt);
        journal.completedActions.push({
          ...action,
          state: "COMPLETED",
          completedAt,
          reconciledFromAbsence
        });
        journal.completedActions.sort((left, right) =>
          left.actionId.localeCompare(right.actionId)
        );
        journal.pendingAction = null;
      }
    });
  return completedCleanupAction(manifest, action.actionId);
}

async function runCheckpointedDockerAction({
  manifestPath,
  manifest,
  checkpointState,
  checkpointManifest,
  action,
  record,
  destination,
  awsRunner,
  dockerRunner,
  now,
  onCompleted
}) {
  const completed = completedCleanupAction(
    manifest,
    action.actionId
  );
  if (completed) {
    const inspect = await dockerRunner([
      "image",
      "inspect",
      action.expected.imageId
    ]);
    if (inspect.exitCode === 0) {
      throw new Error(
        `LOCAL_CLEANUP_COMPLETED_IMAGE_REAPPEARED: ${action.expected.imageId}`
      );
    }
    return completed;
  }
  let pending = pendingCleanupActionForPlan(
    manifest,
    action
  );
  let inspect = await dockerRunner([
    "image",
    "inspect",
    action.expected.imageId
  ]);
  if (!pending) {
    if (inspect.exitCode !== 0) {
      throw new Error(
        `LOCAL_CLEANUP_IMAGE_MISSING_BEFORE_CHECKPOINT: ${action.expected.imageId}`
      );
    }
    await verifyAuditedDockerImage({
      manifest,
      record,
      destination,
      awsRunner,
      dockerRunner
    });
    const createdAt = now();
    checkpointState.sourceSha256 =
      await checkpointCleanupJournal({
        manifestPath,
        manifest,
        expectedSourceSha256:
          checkpointState.sourceSha256,
        checkpointManifest,
        mutate: (journal) => {
          journal.status = "IN_PROGRESS";
          journal.pendingAction = {
            ...action,
            state: "PENDING",
            createdAt,
            quarantinedAt: null
          };
        }
      });
    pending =
      manifest.execution.localCleanupJournal
        .pendingAction;
    inspect = await dockerRunner([
      "image",
      "inspect",
      action.expected.imageId
    ]);
  }
  let verified = null;
  const reconciledFromAbsence = inspect.exitCode !== 0;
  if (!reconciledFromAbsence) {
    verified = await removeAuditedDockerImage({
      manifest,
      record,
      destination,
      awsRunner,
      dockerRunner
    });
  } else {
    for (const tag of action.expected.references) {
      const tagInspect = await dockerRunner([
        "image",
        "inspect",
        tag
      ]);
      if (tagInspect.exitCode === 0) {
        throw new Error(
          `LOCAL_CLEANUP_IMAGE_ID_ABSENT_BUT_TAG_PRESENT: ${tag}`
        );
      }
    }
  }
  const completedAt = now();
  checkpointState.sourceSha256 =
    await checkpointCleanupJournal({
      manifestPath,
      manifest,
      expectedSourceSha256:
        checkpointState.sourceSha256,
      checkpointManifest,
      mutate: (journal) => {
        onCompleted(
          completedAt,
          verified ?? {
            imageId: action.expected.imageId,
            tags: action.expected.tags,
            digests: action.expected.digests,
            references: action.expected.references,
            sizeBytes: action.expected.sizeBytes,
            ecrImageUri: action.expected.ecrImageUri,
            liveEcr: action.expected.liveEcr
          }
        );
        journal.completedActions.push({
          ...action,
          state: "COMPLETED",
          completedAt,
          reconciledFromAbsence
        });
        journal.completedActions.sort((left, right) =>
          left.actionId.localeCompare(right.actionId)
        );
        journal.pendingAction = null;
      }
    });
  return completedCleanupAction(manifest, action.actionId);
}

export function planAuditedLocalArtifactCleanup(manifest) {
  validateManifestDigest(manifest);
  const records = auditedArtifactRecords(
    manifest.localArtifactAudit
  );
  const nonpackage = records.filter(
    (record) => record.disposition !== "MIGRATE_UNIQUE"
  );
  const completed = new Set(
    (
      manifest.execution?.auditedLocalArtifactCleanup
        ?.results ?? []
    ).map((result) => result.originalPath)
  );
  return {
    auditSourcePath:
      manifest.localArtifactAudit.sourcePath,
    auditSourceSha256:
      manifest.localArtifactAudit.sourceSha256,
    excludedPackageLinkedOriginalCount:
      records.length - nonpackage.length,
    nonpackageRecordCount: nonpackage.length,
    pendingRecordCount: nonpackage.filter(
      (record) => !completed.has(record.originalPath)
    ).length,
    exactFileCount: nonpackage.filter(
      (record) => record.recordKind === "EXACT_FILE"
    ).length,
    directoryCount: nonpackage.filter(
      (record) =>
        record.recordKind === "DIRECTORY_AGGREGATE"
    ).length,
    dockerImageCount: nonpackage.filter(
      (record) => record.recordKind === "DOCKER_IMAGE"
    ).length,
    retainedSharedBuildkitCount: nonpackage.filter(
      (record) =>
        record.recordKind === "SHARED_BUILDKIT_CACHE"
    ).length
  };
}

export async function cleanupAuditedLocalArtifacts({
  repoRoot,
  manifestPath,
  manifest,
  destination,
  confirmDeleteLocal,
  expectedManifestSourceSha256 = null,
  checkpointManifest = writeManifestAtomically,
  gitRunner = defaultGitRunner,
  runner = defaultAwsRunner,
  dockerRunner = defaultDockerRunner,
  deleteFile = unlink,
  deleteDirectory = defaultAuditedDirectoryDelete,
  renamePath = rename,
  permittedTempRoots = DEFAULT_AUDITED_TEMP_ROOTS,
  now = () => new Date().toISOString()
}) {
  if (confirmDeleteLocal !== true) {
    throw new Error(
      "LOCAL_DELETE_CONFIRMATION_REQUIRED: pass --confirm-delete-local"
    );
  }
  validateManifestDigest(manifest);
  await assertCleanupManifestMayProceed({
    repoRoot,
    manifestPath,
    manifest,
    gitRunner
  });
  await assertValidationStillCurrent({
    repoRoot,
    manifestPath,
    manifest,
    gitRunner
  });
  assertAllPackagesReadyForAuditedCleanup(manifest);
  const validatedDestination =
    validateResearchDestination(destination);
  const audit = await loadCommittedLocalArtifactAudit({
    repoRoot,
    manifest,
    gitRunner,
    permittedTempRoots
  });
  const records = auditedArtifactRecords(audit);
  const nonpackageRecords = records
    .filter(
      (record) => record.disposition !== "MIGRATE_UNIQUE"
    )
    .sort((left, right) =>
      left.originalPath.localeCompare(right.originalPath)
    );
  const existingResults = validateExistingAuditedCleanup({
    manifest,
    audit,
    records
  });
  for (const record of nonpackageRecords) {
    const result = existingResults.get(record.originalPath);
    if (result) {
      await assertPreviouslyCleanedArtifactStillAbsent({
        record,
        result,
        dockerRunner
      });
    }
  }
  const pendingRecords = nonpackageRecords.filter(
    (record) => !existingResults.has(record.originalPath)
  );
  if (pendingRecords.length === 0) {
    return {
      disposition:
        "AUDITED_LOCAL_ARTIFACT_CLEANUP_ALREADY_RECORDED",
      ...planAuditedLocalArtifactCleanup(manifest),
      summary:
        manifest.execution.auditedLocalArtifactCleanup
          .summary,
      results: [
        ...manifest.execution.auditedLocalArtifactCleanup
          .results
      ]
    };
  }

  const checkpointState = {
    sourceSha256: await cleanupCheckpointSourceSha256(
      manifestPath,
      expectedManifestSourceSha256
    )
  };
  const hasPendingDockerImages = pendingRecords.some(
    (record) => record.recordKind === "DOCKER_IMAGE"
  );
  const identity = hasPendingDockerImages
    ? await verifyResearchIdentity(validatedDestination, {
        runner
      })
    : null;
  const liveEcrByPath = new Map();
  for (const record of pendingRecords) {
    if (record.recordKind !== "DOCKER_IMAGE") continue;
    const ecr = ecrRecordForAuditedImage(manifest, record);
    liveEcrByPath.set(
      record.originalPath,
      await verifyLiveAuditedEcrImage({
        ecr,
        destination: validatedDestination,
        awsRunner: runner
      })
    );
  }
  manifest.execution.auditedLocalArtifactCleanup ??= {
    status: "IN_PROGRESS",
    auditSourcePath: audit.sourcePath,
    auditSourceSha256: audit.sourceSha256,
    completedAt: null,
    validatedSourceCommit:
      manifest.execution.finalCleanupValidation
        .validatedSourceCommit,
    validatedRepositoryTreeDigest:
      manifest.execution.finalCleanupValidation
        .validatedRepositoryTreeDigest,
    outOfScopeDiscoveryPerformed: false,
    outOfScopeArtifactsTouched: false,
    broadBuildkitPrunePerformed: false,
    verifiedResearchIdentity: identity,
    summary: null,
    results: [...existingResults.values()]
  };
  const execution =
    manifest.execution.auditedLocalArtifactCleanup;
  const upsertResult = (result) => {
    execution.results = [
      ...execution.results.filter(
        (candidate) =>
          candidate.originalPath !== result.originalPath
      ),
      result
    ].sort((left, right) =>
      left.originalPath.localeCompare(right.originalPath)
    );
  };
  const actionByPath = new Map();
  for (const record of pendingRecords) {
    if (record.recordKind === "EXACT_FILE") {
      const targetPath = await auditedPhysicalPath(
        record.originalPath,
        permittedTempRoots
      );
      actionByPath.set(
        record.originalPath,
        checkpointedFilesystemAction({
          ownerType: "AUDITED_LOCAL_ARTIFACT",
          ownerId: record.originalPath,
          actionType: "EXACT_FILE",
          targetPath,
          expected: {
            auditPath: record.originalPath,
            sizeBytes: record.byteSize,
            sha256: record.sha256
          }
        })
      );
    } else if (
      record.recordKind === "DIRECTORY_AGGREGATE"
    ) {
      const targetPath = await auditedPhysicalPath(
        record.originalPath,
        permittedTempRoots
      );
      actionByPath.set(
        record.originalPath,
        checkpointedFilesystemAction({
          ownerType: "AUDITED_LOCAL_ARTIFACT",
          ownerId: record.originalPath,
          actionType: "DIRECTORY_AGGREGATE",
          targetPath,
          expected: {
            auditPath: record.originalPath,
            fileCount: record.fileCount,
            symlinkCount: record.symlinkCount,
            logicalBytes: record.logicalBytes,
            treeDigestSchemaVersion:
              record.treeDigestSchemaVersion,
            fullTreeSha256:
              record.fullTreeSha256,
            gitRepositoryIdentities:
              record.gitRepositoryIdentities ?? []
          }
        })
      );
    } else if (record.recordKind === "DOCKER_IMAGE") {
      const ecr = ecrRecordForAuditedImage(
        manifest,
        record
      );
      const base = {
        ownerType: "AUDITED_LOCAL_ARTIFACT",
        ownerId: record.originalPath,
        actionType: "DOCKER_IMAGE",
        targetPath: ecr.imageId,
        quarantinePath: null,
        expected: {
          imageId: ecr.imageId,
          tags: ecr.expectedTags,
          digests: ecr.expectedDigests,
          references: ecr.expectedReferences,
          sizeBytes: record.byteSize,
          ecrImageUri:
            ecr.repository.remoteImage.imageUri,
          liveEcr: liveEcrByPath.get(record.originalPath)
        }
      };
      actionByPath.set(record.originalPath, {
        ...base,
        actionId: cleanupActionIdentity(base)
      });
    } else if (
      record.recordKind === "SHARED_BUILDKIT_CACHE"
    ) {
      if (record.originalPath !== AUDITED_SHARED_BUILDKIT_URI) {
        throw new Error(
          `AUDITED_SHARED_CACHE_REFERENCE_INVALID: ${record.originalPath}`
        );
      }
    } else {
      throw new Error(
        `AUDITED_LOCAL_ARTIFACT_KIND_INVALID: ${record.originalPath}`
      );
    }
  }

  const pendingJournalAction =
    manifest.execution.localCleanupJournal?.pendingAction ??
    null;
  if (
    pendingJournalAction &&
    ![...actionByPath.values()].some(
      (action) =>
        action.actionId === pendingJournalAction.actionId
    )
  ) {
    throw new Error(
      `LOCAL_CLEANUP_PENDING_ACTION_REQUIRES_MATCHING_COMMAND: ${pendingJournalAction.actionId}`
    );
  }

  for (const record of pendingRecords) {
    const action = actionByPath.get(record.originalPath);
    const isPending =
      pendingJournalAction?.actionId === action?.actionId;
    if (record.recordKind === "EXACT_FILE") {
      const targetPresent = await pathExists(
        action.targetPath
      );
      const quarantinePresent = await pathExists(
        action.quarantinePath
      );
      if (!isPending || targetPresent) {
        await verifyAuditedExactFile({
          manifest,
          record,
          permittedTempRoots,
          path: action.targetPath
        });
      } else if (quarantinePresent) {
        await verifyAuditedExactFile({
          manifest,
          record,
          permittedTempRoots,
          path: action.quarantinePath
        });
      }
    } else if (
      record.recordKind === "DIRECTORY_AGGREGATE"
    ) {
      const targetPresent = await pathExists(
        action.targetPath
      );
      const quarantinePresent = await pathExists(
        action.quarantinePath
      );
      if (!isPending || targetPresent) {
        await verifyAuditedDirectory({
          manifest,
          record,
          permittedTempRoots,
          path: action.targetPath
        });
      } else if (quarantinePresent) {
        await verifyAuditedDirectory({
          manifest,
          record,
          permittedTempRoots,
          path: action.quarantinePath
        });
      }
    } else if (record.recordKind === "DOCKER_IMAGE") {
      const inspect = await dockerRunner([
        "image",
        "inspect",
        action.expected.imageId
      ]);
      if (!isPending || inspect.exitCode === 0) {
        await verifyAuditedDockerImage({
          manifest,
          record,
          destination: validatedDestination,
          awsRunner: runner,
          dockerRunner
        });
      }
    }
  }

  for (const record of pendingRecords) {
    if (record.recordKind === "EXACT_FILE") {
      const action = actionByPath.get(record.originalPath);
      await runCheckpointedFilesystemAction({
        manifestPath,
        manifest,
        checkpointState,
        checkpointManifest,
        action,
        verifyPath: (path) =>
          verifyAuditedExactFile({
            manifest,
            record,
            permittedTempRoots,
            path
          }),
        deleteQuarantine: deleteFile,
        renamePath,
        now,
        onCompleted: (completedAt) => {
          upsertResult({
            groupId: record.groupId,
            originalPath: record.originalPath,
            recordKind: record.recordKind,
            disposition: record.disposition,
            cleanupStatus:
              AUDITED_LOCAL_DELETED_STATUS,
            completedAt,
            verification: {
              sizeBytes: record.byteSize,
              sha256: record.sha256
            }
          });
        }
      });
    } else if (
      record.recordKind === "DIRECTORY_AGGREGATE"
    ) {
      const action = actionByPath.get(record.originalPath);
      await runCheckpointedFilesystemAction({
        manifestPath,
        manifest,
        checkpointState,
        checkpointManifest,
        action,
        verifyPath: (path) =>
          verifyAuditedDirectory({
            manifest,
            record,
            permittedTempRoots,
            path
          }),
        deleteQuarantine: deleteDirectory,
        renamePath,
        now,
        onCompleted: (completedAt) => {
          upsertResult({
            groupId: record.groupId,
            originalPath: record.originalPath,
            recordKind: record.recordKind,
            disposition: record.disposition,
            cleanupStatus:
              AUDITED_LOCAL_DELETED_STATUS,
            completedAt,
            verification: {
              fileCount: record.fileCount,
              symlinkCount: record.symlinkCount,
              logicalBytes: record.logicalBytes,
              treeDigestSchemaVersion:
                record.treeDigestSchemaVersion,
              fullTreeSha256:
                record.fullTreeSha256,
              gitRepositoryIdentities:
                record.gitRepositoryIdentities ?? []
            }
          });
        }
      });
    } else if (record.recordKind === "DOCKER_IMAGE") {
      const action = actionByPath.get(record.originalPath);
      await runCheckpointedDockerAction({
        manifestPath,
        manifest,
        checkpointState,
        checkpointManifest,
        action,
        record,
        destination: validatedDestination,
        awsRunner: runner,
        dockerRunner,
        now,
        onCompleted: (completedAt, verified) => {
          upsertResult({
            groupId: record.groupId,
            originalPath: record.originalPath,
            recordKind: record.recordKind,
            disposition: record.disposition,
            cleanupStatus:
              AUDITED_DOCKER_REMOVED_STATUS,
            completedAt,
            verification: {
              imageId: verified.imageId,
              removedTags: verified.tags,
              removedDigests: verified.digests,
              removedReferences: verified.references,
              sizeBytes: verified.sizeBytes,
              ecrImageUri: verified.ecrImageUri,
              liveEcr: verified.liveEcr
            }
          });
        }
      });
    } else {
      const result = {
        groupId: record.groupId,
        originalPath: record.originalPath,
        recordKind: record.recordKind,
        disposition: record.disposition,
        cleanupStatus: AUDITED_BUILDKIT_RETAINED_STATUS,
        completedAt: now(),
        verification: {
          broadPrunePerformed: false,
          retainedReason:
            "BuildKit is shared with unrelated builds, so no broad prune command is permitted."
        }
      };
      checkpointState.sourceSha256 =
        await checkpointCleanupJournal({
          manifestPath,
          manifest,
          expectedSourceSha256:
            checkpointState.sourceSha256,
          checkpointManifest,
          mutate: () => upsertResult(result)
        });
    }
  }

  const results = [...execution.results].sort(
    (left, right) =>
      left.originalPath.localeCompare(right.originalPath)
  );
  const deletedPathCount = results.filter(
    (result) =>
      result.cleanupStatus === AUDITED_LOCAL_DELETED_STATUS
  ).length;
  const removedDockerImageCount = results.filter(
    (result) =>
      result.cleanupStatus === AUDITED_DOCKER_REMOVED_STATUS
  ).length;
  const removedDockerTagCount = results.reduce(
    (total, result) =>
      total +
      (result.cleanupStatus ===
      AUDITED_DOCKER_REMOVED_STATUS
        ? result.verification.removedTags.length
        : 0),
    0
  );
  const retainedSharedCacheCount = results.filter(
    (result) =>
      result.cleanupStatus ===
      AUDITED_BUILDKIT_RETAINED_STATUS
  ).length;
  if (results.length !== nonpackageRecords.length) {
    throw new Error(
      "AUDITED_LOCAL_CLEANUP_RESULT_COVERAGE_MISMATCH"
    );
  }
  const summary = {
    nonpackageRecordCount: nonpackageRecords.length,
    deletedPathCount,
    removedDockerImageCount,
    removedDockerTagCount,
    retainedSharedCacheCount,
    pendingRecordCount: 0,
    packageLinkedOriginalExcludedCount:
      records.length - nonpackageRecords.length
  };
  Object.assign(execution, {
    status: retainedSharedCacheCount
      ? "COMPLETE_WITH_SHARED_BUILDKIT_RETAINED"
      : "COMPLETE",
    completedAt: now(),
    verifiedResearchIdentity: identity,
    summary,
    results
  });
  manifest.execution.localFilesDeleted =
    manifest.execution.localFilesDeleted === true ||
    deletedPathCount > 0 ||
    removedDockerImageCount > 0;
  checkpointState.sourceSha256 =
    await checkpointCleanupJournal({
      manifestPath,
      manifest,
      expectedSourceSha256:
        checkpointState.sourceSha256,
      checkpointManifest,
      mutate: (journal) => {
        journal.status = "COMPLETE";
      }
    });
  return {
    disposition:
      "AUDITED_NONPACKAGE_ARTIFACTS_PREFLIGHTED_BEFORE_EXACT_CLEANUP",
    ...planAuditedLocalArtifactCleanup(manifest),
    summary,
    results,
    manifestCheckpointSha256:
      checkpointState.sourceSha256
  };
}

function bytesDigest(source) {
  return createHash("sha256").update(source).digest("hex");
}

export async function writeManifestAtomically({
  manifestPath,
  manifest,
  expectedSourceSha256 = null
}) {
  const existing = await readFile(manifestPath, "utf8");
  if (
    expectedSourceSha256 &&
    bytesDigest(existing) !== expectedSourceSha256
  ) {
    throw new Error(
      "MANIFEST_CONCURRENT_CHANGE: refusing to replace a manifest changed during execution"
    );
  }
  manifest.manifestContentSha256 = stableManifestDigest(manifest);
  const source = `${JSON.stringify(manifest, null, 2)}\n`;
  const temporaryPath = join(
    dirname(manifestPath),
    `.${Date.now()}-${process.pid}.research-storage.tmp`
  );
  const handle = await open(temporaryPath, "wx", 0o600);
  try {
    await handle.writeFile(source, "utf8");
    await handle.sync();
  } finally {
    await handle.close();
  }
  try {
    await rename(temporaryPath, manifestPath);
  } catch (error) {
    await unlink(temporaryPath).catch(() => {});
    throw error;
  }
  return {
    path: manifestPath,
    sourceSha256: bytesDigest(source)
  };
}

export function manifestSourceSha256(source) {
  return bytesDigest(source);
}

export function plannedOperation({
  manifest,
  packageId,
  destination,
  operation
}) {
  validateManifestDigest(manifest);
  const validated = validateResearchDestination(destination);
  const packageRecord = packageById(manifest, packageId);
  if (!["upload", "verify", "cleanup"].includes(operation)) {
    throw new Error(`UNKNOWN_OPERATION: ${operation}`);
  }
  return {
    dryRun: true,
    operation,
    packageId,
    localPath: packageRecord.localPath,
    bucket: validated.bucket,
    key: packageRecord.plannedObject.key,
    profile: validated.profile,
    region: validated.region,
    wouldCallAws: true,
    wouldDeleteLocal: operation === "cleanup",
    overwriteAllowed: false
  };
}
