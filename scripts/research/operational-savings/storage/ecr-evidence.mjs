import { createHash } from "node:crypto";
import {
  POST_HOC_REPLAY_RECEIPT_RELATIVE_PATH,
  assertPostHocReplayReceiptBinding
} from "./post-hoc-replay.mjs";

export const OCI_IMAGE_INDEX_MEDIA_TYPE =
  "application/vnd.oci.image.index.v1+json";
export const OCI_IMAGE_MANIFEST_MEDIA_TYPE =
  "application/vnd.oci.image.manifest.v1+json";
export const DOCKER_IMAGE_MANIFEST_MEDIA_TYPE =
  "application/vnd.docker.distribution.manifest.v2+json";
export const EXECUTABLE_IMAGE_MANIFEST_MEDIA_TYPES = Object.freeze([
  OCI_IMAGE_MANIFEST_MEDIA_TYPE,
  DOCKER_IMAGE_MANIFEST_MEDIA_TYPE
]);
export const ECR_LOCAL_CLEANUP_COMPLETE_STATUS =
  "EXACT_ECR_REFERENCE_REMOVED_AFTER_REPLAY_AND_IMAGE_ABSENT";
export const ECR_LICENSE_EVIDENCE_SCHEMA_VERSION =
  "operational-savings/ecr-license-evidence-v2";

const SHA256_PATTERN = /^[a-f0-9]{64}$/;
const SHA256_IDENTIFIER_PATTERN = /^sha256:[a-f0-9]{64}$/;
const SCOUT_WHEEL_PACKAGE_ID_PREFIX =
  "cache-file:model-dependencies/scout/";
const SCOUT_WHEEL_LICENSE_ROLES = new Set([
  "PYTHON_DISTRIBUTION_LICENSE",
  "BUNDLED_COMPONENT_LICENSE",
  "DISTRIBUTION_NOTICE"
]);
const MODEL_BUILD_MATERIAL_REQUIREMENTS = Object.freeze({
  reopt: Object.freeze({
    repositoryName: "reopt",
    sourceCommitArgument: "REOPT_COMMIT",
    sourceArchiveArgument: "REOPT_ARCHIVE_SHA256"
  }),
  ssc: Object.freeze({
    repositoryName: "ssc",
    sourceCommitArgument: "SSC_COMMIT",
    sourceArchiveArgument: "SSC_ARCHIVE_SHA256",
    dependencyArchives: Object.freeze([
      Object.freeze({
        packageId:
          "cache-file:artifacts/or-tools_aarch64_AlmaLinux-8.10_cpp_v9.14.6206.tar.gz",
        argument: "ORTOOLS_ARCHIVE_SHA256"
      })
    ])
  }),
  measur: Object.freeze({
    repositoryName: "amo-tools-suite",
    sourceCommitArgument: "MEASUR_COMMIT",
    sourceArchiveArgument: "MEASUR_ARCHIVE_SHA256"
  }),
  scout: Object.freeze({
    repositoryName: "scout",
    sourceCommitArgument: "SCOUT_COMMIT",
    sourceArchiveArgument: "SCOUT_ARCHIVE_SHA256"
  })
});
const STATIC_ECR_LICENSE_REQUIREMENTS = Object.freeze({
  reopt: Object.freeze([
    Object.freeze({
      packageId: "repository-license:reopt:LICENSE",
      packageType: "REPOSITORY_LICENSE_ARTIFACT",
      role: "PROJECT_LICENSE",
      path: "LICENSE",
      primarySourceLicense: true
    }),
    Object.freeze({
      packageId: "repository-license:reopt:NOTICE",
      packageType: "REPOSITORY_LICENSE_ARTIFACT",
      role: "PROJECT_NOTICE",
      path: "NOTICE"
    }),
    Object.freeze({
      packageId:
        "repository-license:reopt:transcrypt:LICENSE",
      packageType: "REPOSITORY_LICENSE_ARTIFACT",
      role: "VENDORED_DEPENDENCY_LICENSE",
      path: "transcrypt/LICENSE"
    })
  ]),
  ssc: Object.freeze([
    Object.freeze({
      packageId: "repository-license:ssc:LICENSE",
      packageType: "REPOSITORY_LICENSE_ARTIFACT",
      role: "PROJECT_LICENSE",
      path: "LICENSE",
      primarySourceLicense: true
    }),
    Object.freeze({
      packageId:
        "repository-license:ssc:lpsolve:LICENSE.htm",
      packageType: "REPOSITORY_LICENSE_ARTIFACT",
      role: "VENDORED_DEPENDENCY_LICENSE",
      path: "lpsolve/LICENSE.htm"
    }),
    Object.freeze({
      packageId:
        "repository-license:ssc:nlopt:LICENSE.htm",
      packageType: "REPOSITORY_LICENSE_ARTIFACT",
      role: "VENDORED_DEPENDENCY_LICENSE",
      path: "nlopt/LICENSE.htm"
    }),
    Object.freeze({
      packageId:
        "embedded-license:9d2e2f12b2febd13396df270",
      packageType: "EMBEDDED_LICENSE_ARTIFACT",
      role: "BUILD_DEPENDENCY_LICENSE",
      declaredLicenseRole: "ARCHIVE_PROJECT_LICENSE",
      parentPackageId:
        "cache-file:artifacts/or-tools_aarch64_AlmaLinux-8.10_cpp_v9.14.6206.tar.gz",
      parentPackageType: "SOURCE_ARTIFACT",
      archiveFormat: "TAR_GZIP",
      path:
        "or-tools_aarch64_AlmaLinux-8.10_cpp_v9.14.6206/share/doc/ortools/LICENSE"
    })
  ]),
  measur: Object.freeze([
    Object.freeze({
      packageId:
        "repository-license:amo-tools-suite:LICENSE.txt",
      packageType: "REPOSITORY_LICENSE_ARTIFACT",
      role: "PROJECT_LICENSE",
      path: "LICENSE.txt",
      primarySourceLicense: true
    }),
    Object.freeze({
      packageId:
        "repository-license:amo-tools-suite:include:fast-cpp-csv-parser:LICENSE",
      packageType: "REPOSITORY_LICENSE_ARTIFACT",
      role: "VENDORED_DEPENDENCY_LICENSE",
      path: "include/fast-cpp-csv-parser/LICENSE"
    })
  ]),
  scout: Object.freeze([
    Object.freeze({
      packageId: "repository-license:scout:LICENSE.md",
      packageType: "REPOSITORY_LICENSE_ARTIFACT",
      role: "CONDITIONAL_DUAL_PROJECT_LICENSE",
      path: "LICENSE.md",
      primarySourceLicense: true
    })
  ])
});

function compareCanonicalStrings(left, right) {
  if (left === right) return 0;
  return left < right ? -1 : 1;
}

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

export function ecrEvidenceDigest(value) {
  return createHash("sha256")
    .update(JSON.stringify(canonicalize(value)))
    .digest("hex");
}

function requireString(value, label) {
  if (typeof value !== "string" || !value.trim()) {
    throw new Error(`${label} must be a non-empty string`);
  }
  return value;
}

function requireIsoTimestamp(value, label) {
  requireString(value, label);
  if (!Number.isFinite(Date.parse(value))) {
    throw new Error(`${label} must be an ISO timestamp`);
  }
  return value;
}

function normalizedGitHubRepositoryUrl(value) {
  if (typeof value !== "string") return null;
  let parsed;
  try {
    parsed = new URL(value);
  } catch {
    return null;
  }
  if (
    parsed.protocol !== "https:" ||
    parsed.hostname.toLowerCase() !== "github.com" ||
    parsed.username ||
    parsed.password ||
    parsed.search ||
    parsed.hash
  ) {
    return null;
  }
  const pathSegments = parsed.pathname
    .replace(/\/+$/, "")
    .split("/")
    .filter(Boolean);
  if (pathSegments.length !== 2) return null;
  const repository = pathSegments[1].replace(/\.git$/i, "");
  if (!repository) return null;
  return (
    `https://github.com/${pathSegments[0]}/` +
    repository
  );
}

function buildContextProvenanceEvidence(context) {
  const noteValid =
    typeof context?.note === "string" &&
    context.note.trim().length > 0;
  const uncommitted =
    context?.status ===
      "UNCOMMITTED_HISTORICAL_BUILD_CONTEXT" &&
    context.historicalRepositoryCommit === null &&
    context.contentIdentityStatus ===
      "POST_HOC_EXACT_FILE_HASHES" &&
    context.recordedImageBuildContextAttested === false;
  if (!noteValid || !uncommitted) {
    throw new Error(
      "ECR_BUILD_CONTEXT_PROVENANCE_INVALID"
    );
  }
  return {
    status: context.status,
    historicalRepositoryCommit:
      context.historicalRepositoryCommit,
    contentIdentityStatus: context.contentIdentityStatus,
    recordedImageBuildContextAttested:
      context.recordedImageBuildContextAttested,
    note: context.note
  };
}

function modelBuildMaterialBinding({
  manifest,
  repository
}) {
  const modelId = repository.modelId;
  const requirement =
    MODEL_BUILD_MATERIAL_REQUIREMENTS[modelId];
  const provenance = repository.provenance;
  const argumentsRecord =
    repository.buildManifest?.buildEvidence?.arguments;
  const sourceRepository =
    normalizedGitHubRepositoryUrl(
      provenance?.sourceRepository
    );
  if (
    !requirement ||
    !sourceRepository ||
    argumentsRecord?.[requirement.sourceCommitArgument] !==
      provenance?.sourceCommit ||
    argumentsRecord?.[requirement.sourceArchiveArgument] !==
      provenance?.sourceArchiveSha256
  ) {
    throw new Error(
      `ECR_BUILD_MATERIAL_BINDING_INVALID: ${modelId}`
    );
  }
  const dependencyArchives = (
    requirement.dependencyArchives ?? []
  ).map((dependency) => {
    const parentPackage = exactPackageRecord(
      manifest,
      dependency.packageId,
      `ECR_BUILD_DEPENDENCY_PACKAGE_REQUIRED: ${modelId}`
    );
    const sha256 =
      parentPackage?.plannedObject?.expectedSha256;
    if (
      !parentPackage ||
      !SHA256_PATTERN.test(sha256 ?? "") ||
      argumentsRecord[dependency.argument] !== sha256
    ) {
      throw new Error(
        `ECR_BUILD_DEPENDENCY_ARGUMENT_BINDING_INVALID: ${modelId}: ${dependency.packageId}`
      );
    }
    return {
      packageId: dependency.packageId,
      argument: dependency.argument,
      sha256
    };
  });
  return {
    modelId,
    sourceRepository,
    sourceCommit: provenance.sourceCommit,
    sourceArchiveSha256:
      provenance.sourceArchiveSha256,
    sourceCommitArgument: {
      name: requirement.sourceCommitArgument,
      value:
        argumentsRecord[requirement.sourceCommitArgument]
    },
    sourceArchiveArgument: {
      name: requirement.sourceArchiveArgument,
      value:
        argumentsRecord[requirement.sourceArchiveArgument]
    },
    dependencyArchives
  };
}

function durablePackageEvidence(
  packageRecord,
  expectedSha256,
  label,
  expectedBucket
) {
  const planned = packageRecord?.plannedObject;
  const remote = packageRecord?.remote?.s3;
  const restore = packageRecord?.cleanupEligibility;
  const expectedChecksumSha256Base64 = Buffer.from(
    expectedSha256 ?? "",
    "hex"
  ).toString("base64");
  const verifiedAt = Date.parse(remote?.verifiedAt ?? "");
  const restoredAt = Date.parse(restore?.restoredAt ?? "");
  if (
    typeof expectedBucket !== "string" ||
    !expectedBucket ||
    packageRecord?.fingerprint?.algorithm !== "SHA-256" ||
    packageRecord.fingerprint.digest !== expectedSha256 ||
    planned?.uploadReady !== true ||
    planned.expectedSha256 !== expectedSha256 ||
    !Number.isSafeInteger(planned.expectedSizeBytes) ||
    planned.expectedSizeBytes <= 0 ||
    typeof planned.key !== "string" ||
    !planned.key ||
    typeof planned.contentType !== "string" ||
    !planned.contentType ||
    remote?.verificationStatus !== "VERIFIED" ||
    remote.metadataSha256 !== expectedSha256 ||
    remote.contentLength !== planned.expectedSizeBytes ||
    remote.key !== planned.key ||
    remote.contentType !== planned.contentType ||
    remote.bucket !== expectedBucket ||
    remote.checksumSha256Base64 !==
      expectedChecksumSha256Base64 ||
    !["AES256", "aws:kms", "aws:kms:dsse"].includes(
      remote.serverSideEncryption
    ) ||
    typeof remote.versionId !== "string" ||
    !remote.versionId ||
    remote.versionId === "null" ||
    typeof remote.s3Uri !== "string" ||
    remote.s3Uri !==
      `s3://${remote.bucket}/${planned.key}` ||
    packageRecord.s3Uri !== remote.s3Uri ||
    !Number.isFinite(verifiedAt) ||
    restore?.restoredVersionId !== remote.versionId ||
    restore?.restoredSha256 !== expectedSha256 ||
    restore?.restoredSizeBytes !== planned.expectedSizeBytes ||
    !Number.isFinite(restoredAt)
  ) {
    throw new Error(
      `ECR_DURABLE_ARTIFACT_PROOF_INVALID: ${label}: ${packageRecord?.packageId ?? "missing"}`
    );
  }
  return {
    packageId: packageRecord.packageId,
    objectKey: planned.key,
    contentType: planned.contentType,
    sha256: expectedSha256,
    sizeBytes: planned.expectedSizeBytes,
    s3Uri: remote.s3Uri,
    versionId: remote.versionId,
    verificationStatus: remote.verificationStatus,
    verifiedAt: remote.verifiedAt,
    checksumSha256Base64:
      remote.checksumSha256Base64,
    serverSideEncryption: remote.serverSideEncryption,
    restoredProof: {
      versionId: restore.restoredVersionId,
      sha256: restore.restoredSha256,
      sizeBytes: restore.restoredSizeBytes
    }
  };
}

function exactPackageRecord(manifest, packageId, errorCode) {
  const matches = (manifest?.packages ?? []).filter(
    (packageRecord) =>
      packageRecord.packageId === packageId
  );
  if (matches.length !== 1) {
    throw new Error(
      `${errorCode}: ${packageId}`
    );
  }
  return matches[0];
}

function exactRepositoryLicenseIdentity({
  manifest,
  packageRecord,
  requirement,
  modelId,
  provenance
}) {
  const expected =
    MODEL_BUILD_MATERIAL_REQUIREMENTS[modelId];
  const identity = packageRecord.repositoryIdentity;
  const parentPackageId =
    `git-repository:${expected?.repositoryName ?? ""}`;
  const parentPackage = exactPackageRecord(
    manifest,
    parentPackageId,
    `ECR_LICENSE_PARENT_REPOSITORY_REQUIRED: ${modelId}`
  );
  const sourceRepository =
    normalizedGitHubRepositoryUrl(
      provenance.sourceRepository
    );
  const identityRepository =
    normalizedGitHubRepositoryUrl(identity?.remoteUrl);
  const parentRepository =
    normalizedGitHubRepositoryUrl(
      parentPackage.content?.remoteUrl
    );
  if (
    !expected ||
    !sourceRepository ||
    identity?.repositoryName !==
      expected.repositoryName ||
    identity?.commitSha !== provenance.sourceCommit ||
    identityRepository !== sourceRepository ||
    packageRecord.parentPackageId !== parentPackageId ||
    parentPackage.packageType !==
      "PINNED_GIT_REPOSITORY" ||
    parentPackage.content?.repositoryName !==
      expected.repositoryName ||
    parentPackage.fingerprint?.commitSha !==
      provenance.sourceCommit ||
    parentPackage.fingerprint?.workingTreeClean !== true ||
    parentRepository !== sourceRepository ||
    identity.remoteUrl !==
      parentPackage.content.remoteUrl ||
    !/^[a-f0-9]{40}$/.test(
      identity?.gitTreeObjectSha1 ?? ""
    ) ||
    identity.gitTreeObjectSha1 !==
      parentPackage.fingerprint?.gitTreeObjectSha1
  ) {
    throw new Error(
      `ECR_LICENSE_REPOSITORY_IDENTITY_INVALID: ${modelId}: ${requirement.packageId}`
    );
  }
  return {
    repositoryName: identity.repositoryName,
    remoteUrl: identity.remoteUrl,
    canonicalRemoteUrl: identityRepository,
    commitSha: identity.commitSha,
    gitTreeObjectSha1: identity.gitTreeObjectSha1,
    parentPackageId
  };
}

function exactEmbeddedParent({
  manifest,
  packageRecord,
  requirement,
  modelId
}) {
  const parentPackage = exactPackageRecord(
    manifest,
    requirement.parentPackageId,
    `ECR_LICENSE_PARENT_PACKAGE_REQUIRED: ${modelId}`
  );
  const embeddedMember = packageRecord.embeddedMember;
  const extractionPlan =
    packageRecord.plannedObject?.extractionPlan;
  const parentSha256 =
    parentPackage.plannedObject?.expectedSha256;
  if (
    parentPackage.packageType !==
      requirement.parentPackageType ||
    parentPackage.fingerprint?.algorithm !== "SHA-256" ||
    !SHA256_PATTERN.test(parentSha256 ?? "") ||
    parentPackage.fingerprint.digest !== parentSha256 ||
    embeddedMember?.parentPackageId !==
      requirement.parentPackageId ||
    embeddedMember?.parentExpectedSha256 !==
      parentSha256 ||
    embeddedMember?.archiveFormat !==
      requirement.archiveFormat ||
    embeddedMember?.memberPath !== requirement.path ||
    extractionPlan?.parentPackageId !==
      requirement.parentPackageId ||
    extractionPlan?.parentExpectedSha256 !==
      parentSha256 ||
    extractionPlan?.archiveFormat !==
      requirement.archiveFormat ||
    extractionPlan?.memberPath !== requirement.path ||
    packageRecord.content?.parentPackageId !==
      requirement.parentPackageId ||
    packageRecord.content?.parentPackageSha256 !==
      parentSha256
  ) {
    throw new Error(
      `ECR_LICENSE_PARENT_BINDING_INVALID: ${modelId}: ${requirement.packageId}`
    );
  }
  return parentPackage;
}

function exactPackageById(
  manifest,
  requirement,
  modelId,
  provenance
) {
  const packageRecord = exactPackageRecord(
    manifest,
    requirement.packageId,
    `ECR_LICENSE_PACKAGE_REQUIRED: ${modelId}`
  );
  const path =
    packageRecord.repositoryIdentity?.repositoryRelativePath ??
    packageRecord.embeddedMember?.memberPath;
  const expectedDeclaredRole =
    requirement.declaredLicenseRole ?? requirement.role;
  if (
    packageRecord.packageType !== requirement.packageType ||
    path !== requirement.path ||
    packageRecord.license?.licenseRole !==
      expectedDeclaredRole ||
    (requirement.parentPackageId != null &&
      (packageRecord.parentPackageId !==
        requirement.parentPackageId ||
        packageRecord.embeddedMember?.parentPackageId !==
          requirement.parentPackageId))
  ) {
    throw new Error(
      `ECR_LICENSE_PACKAGE_METADATA_INVALID: ${modelId}: ${requirement.packageId}`
    );
  }
  if (
    requirement.packageType ===
    "REPOSITORY_LICENSE_ARTIFACT"
  ) {
    return {
      packageRecord,
      repositoryIdentity:
        exactRepositoryLicenseIdentity({
          manifest,
          packageRecord,
          requirement,
          modelId,
          provenance
        }),
      parentPackage: null
    };
  }
  return {
    packageRecord,
    repositoryIdentity: null,
    parentPackage: exactEmbeddedParent({
      manifest,
      packageRecord,
      requirement,
      modelId
    })
  };
}

function scoutWheelLicenseRequirements(manifest) {
  const wheelPackages = (manifest?.packages ?? [])
    .filter(
      (packageRecord) =>
        packageRecord.packageType ===
          "MODEL_DEPENDENCY_WHEEL" &&
        packageRecord.packageId.startsWith(
          SCOUT_WHEEL_PACKAGE_ID_PREFIX
        )
    )
    .sort((left, right) =>
      compareCanonicalStrings(
        left.packageId,
        right.packageId
      )
    );
  if (wheelPackages.length === 0) {
    throw new Error(
      "ECR_SCOUT_WHEEL_PACKAGES_REQUIRED"
    );
  }
  const wheelIds = new Set(
    wheelPackages.map((packageRecord) => packageRecord.packageId)
  );
  const licensePackages = (manifest?.packages ?? [])
    .filter(
      (packageRecord) =>
        packageRecord.packageType ===
          "EMBEDDED_LICENSE_ARTIFACT" &&
        wheelIds.has(packageRecord.parentPackageId)
    )
    .sort((left, right) => {
      const parentOrder =
        compareCanonicalStrings(
          left.parentPackageId,
          right.parentPackageId
        );
      if (parentOrder !== 0) return parentOrder;
      const pathOrder = compareCanonicalStrings(
        String(left.embeddedMember?.memberPath ?? ""),
        String(right.embeddedMember?.memberPath ?? "")
      );
      return pathOrder !== 0
        ? pathOrder
        : compareCanonicalStrings(
            left.packageId,
            right.packageId
          );
    });
  const licensesByParent = new Map();
  for (const packageRecord of licensePackages) {
    const records =
      licensesByParent.get(packageRecord.parentPackageId) ?? [];
    records.push(packageRecord);
    licensesByParent.set(packageRecord.parentPackageId, records);
  }
  for (const wheelPackage of wheelPackages) {
    if (
      !licensesByParent.has(wheelPackage.packageId)
    ) {
      throw new Error(
        `ECR_SCOUT_WHEEL_LICENSE_REQUIRED: ${wheelPackage.packageId}`
      );
    }
  }
  return licensePackages.map((packageRecord) => {
    const path = packageRecord.embeddedMember?.memberPath;
    const role = packageRecord.license?.licenseRole;
    if (
      !SCOUT_WHEEL_LICENSE_ROLES.has(role) ||
      typeof path !== "string" ||
      !path ||
      packageRecord.embeddedMember?.parentPackageId !==
        packageRecord.parentPackageId
    ) {
      throw new Error(
        `ECR_SCOUT_WHEEL_LICENSE_METADATA_INVALID: ${packageRecord.packageId}`
      );
    }
    return {
      packageId: packageRecord.packageId,
      packageType: "EMBEDDED_LICENSE_ARTIFACT",
      role,
      parentPackageId: packageRecord.parentPackageId,
      parentPackageType: "MODEL_DEPENDENCY_WHEEL",
      archiveFormat: "ZIP",
      path
    };
  });
}

function ecrLicenseRequirements(manifest, modelId) {
  const staticRequirements =
    STATIC_ECR_LICENSE_REQUIREMENTS[modelId];
  if (!staticRequirements) {
    throw new Error(
      `ECR_LICENSE_REQUIREMENTS_UNKNOWN_MODEL: ${modelId}`
    );
  }
  const requirements = [
    ...staticRequirements,
    ...(modelId === "scout"
      ? scoutWheelLicenseRequirements(manifest)
      : [])
  ];
  const packageIds = requirements.map(
    (requirement) => requirement.packageId
  );
  if (new Set(packageIds).size !== packageIds.length) {
    throw new Error(
      `ECR_LICENSE_REQUIREMENTS_DUPLICATE: ${modelId}`
    );
  }
  return requirements;
}

function validBuildContentBinding(contentBinding) {
  const buildInputs = contentBinding?.buildInputs;
  const verificationInputs =
    contentBinding?.verificationInputs;
  if (
    contentBinding?.status !==
      "VERIFIED_EXACT_LOCAL_CONTENT" ||
    !Array.isArray(buildInputs) ||
    buildInputs.length === 0 ||
    !Array.isArray(verificationInputs) ||
    verificationInputs.length === 0
  ) {
    return false;
  }
  const allInputs = [
    ...buildInputs,
    ...verificationInputs
  ];
  if (
    allInputs.some(
      (input) =>
        typeof input?.path !== "string" ||
        !input.path ||
        typeof input.repositoryPath !== "string" ||
        !input.repositoryPath.startsWith(
          "scripts/research/operational-savings/"
        ) ||
        !SHA256_PATTERN.test(input.sha256 ?? "") ||
        !Number.isSafeInteger(input.byteSize) ||
        input.byteSize < 0
    )
  ) {
    return false;
  }
  const paths = allInputs.map(
    (input) => input.repositoryPath
  );
  if (new Set(paths).size !== paths.length) {
    return false;
  }
  return (
    contentBinding.buildInputSetSha256 ===
      ecrEvidenceDigest(buildInputs) &&
    contentBinding.verificationInputSetSha256 ===
      ecrEvidenceDigest(verificationInputs) &&
    contentBinding.completeInputSetSha256 ===
      ecrEvidenceDigest({
        buildInputs,
        verificationInputs
      })
  );
}

function durableEmbeddedParentArtifacts({
  manifest,
  parentPackages,
  modelId
}) {
  const byPackageId = new Map();
  for (const parentPackage of parentPackages) {
    const existing = byPackageId.get(
      parentPackage.packageId
    );
    if (existing && existing !== parentPackage) {
      throw new Error(
        `ECR_LICENSE_PARENT_PACKAGE_DUPLICATE: ${modelId}: ${parentPackage.packageId}`
      );
    }
    byPackageId.set(parentPackage.packageId, parentPackage);
  }
  return [...byPackageId.values()]
    .sort((left, right) =>
      compareCanonicalStrings(
        left.packageId,
        right.packageId
      )
    )
    .map((parentPackage) => ({
      packageType: parentPackage.packageType,
      ...durablePackageEvidence(
        parentPackage,
        parentPackage.plannedObject?.expectedSha256,
        `${modelId} embedded-license parent`,
        manifest.destination?.s3?.bucket
      )
    }));
}

function normalizedPythonDistributionName(value) {
  return typeof value === "string"
    ? value.toLowerCase().replace(/[-_.]+/g, "-")
    : null;
}

function wheelFileIdentity(packageId) {
  const fileName = packageId.slice(
    packageId.lastIndexOf("/") + 1
  );
  if (!fileName.endsWith(".whl")) return null;
  const parts = fileName.slice(0, -4).split("-");
  if (parts.length < 5) return null;
  return {
    fileName,
    name: normalizedPythonDistributionName(parts[0]),
    version: parts[1]
  };
}

function scoutDependencyLockEvidence({
  manifest,
  repository,
  parentArtifacts
}) {
  const evidence =
    repository.buildManifest?.buildEvidence
      ?.dependencyLockEvidence;
  const lockedArtifacts = evidence?.lockedArtifacts;
  const contentBinding =
    repository.buildManifest?.buildEvidence
      ?.contentBinding;
  const lockInput = contentBinding?.buildInputs?.filter(
    (input) =>
      input.path === evidence?.path &&
      input.repositoryPath === evidence?.repositoryPath
  );
  if (
    evidence?.status !==
      "VERIFIED_EXACT_PIP_HASH_LOCK" ||
    evidence.lockFormat !==
      "pip-require-hashes-linux-arm64-wheels" ||
    evidence.path !== "requirements.lock" ||
    evidence.repositoryPath !==
      "scripts/research/operational-savings/containers/scout/requirements.lock" ||
    !SHA256_PATTERN.test(evidence.sha256 ?? "") ||
    !Number.isSafeInteger(evidence.packageCount) ||
    evidence.packageCount <= 0 ||
    !Array.isArray(lockedArtifacts) ||
    lockedArtifacts.length !== evidence.packageCount ||
    lockInput?.length !== 1 ||
    lockInput[0].sha256 !== evidence.sha256 ||
    evidence.lockedArtifactSetSha256 !==
      ecrEvidenceDigest(lockedArtifacts)
  ) {
    throw new Error(
      "ECR_SCOUT_DEPENDENCY_LOCK_EVIDENCE_INVALID"
    );
  }
  const requirementNames = [];
  const lockedHashes = [];
  for (const artifact of lockedArtifacts) {
    const parsedRequirement =
      typeof artifact?.requirement === "string"
        ? artifact.requirement.match(
            /^([A-Za-z0-9][A-Za-z0-9._-]*)==([^\s]+)$/
          )
        : null;
    if (
      !parsedRequirement ||
      artifact.name !==
        normalizedPythonDistributionName(
          parsedRequirement[1]
        ) ||
      artifact.version !== parsedRequirement[2] ||
      !SHA256_PATTERN.test(artifact.sha256 ?? "")
    ) {
      throw new Error(
        "ECR_SCOUT_DEPENDENCY_LOCK_ENTRY_INVALID"
      );
    }
    requirementNames.push(artifact.name);
    lockedHashes.push(artifact.sha256);
  }
  if (
    new Set(requirementNames).size !==
      lockedArtifacts.length ||
    new Set(lockedHashes).size !==
      lockedArtifacts.length
  ) {
    throw new Error(
      "ECR_SCOUT_DEPENDENCY_LOCK_SET_INVALID"
    );
  }

  const wheelParents = parentArtifacts.filter(
    (artifact) =>
      artifact.packageType ===
      "MODEL_DEPENDENCY_WHEEL"
  );
  if (
    wheelParents.length !== parentArtifacts.length ||
    wheelParents.length !== evidence.packageCount
  ) {
    throw new Error(
      "ECR_SCOUT_DEPENDENCY_PARENT_SET_INVALID"
    );
  }
  const lockedByHash = new Map(
    lockedArtifacts.map((artifact) => [
      artifact.sha256,
      artifact
    ])
  );
  const wheelArtifacts = wheelParents.map(
    (parentArtifact) => {
      const locked = lockedByHash.get(
        parentArtifact.sha256
      );
      const fileIdentity = wheelFileIdentity(
        parentArtifact.packageId
      );
      if (
        !locked ||
        !fileIdentity ||
        fileIdentity.name !== locked.name ||
        fileIdentity.version !== locked.version
      ) {
        throw new Error(
          `ECR_SCOUT_WHEEL_LOCK_BINDING_INVALID: ${parentArtifact.packageId}`
        );
      }
      return {
        packageId: parentArtifact.packageId,
        fileName: fileIdentity.fileName,
        requirement: locked.requirement,
        name: locked.name,
        version: locked.version,
        sha256: parentArtifact.sha256,
        parentArtifactEvidenceSha256:
          ecrEvidenceDigest(parentArtifact)
      };
    }
  );
  if (
    new Set(
      wheelArtifacts.map((artifact) => artifact.sha256)
    ).size !== lockedArtifacts.length
  ) {
    throw new Error(
      "ECR_SCOUT_DEPENDENCY_HASH_SET_INVALID"
    );
  }

  const lockPackage = exactPackageRecord(
    manifest,
    "model-support:scout:requirements.lock",
    "ECR_SCOUT_DEPENDENCY_LOCK_PACKAGE_REQUIRED"
  );
  if (lockPackage.packageType !== "MODEL_DEPENDENCY_LOCK") {
    throw new Error(
      "ECR_SCOUT_DEPENDENCY_LOCK_PACKAGE_INVALID"
    );
  }
  const durableLock = durablePackageEvidence(
    lockPackage,
    evidence.sha256,
    "scout dependency lock",
    manifest.destination?.s3?.bucket
  );
  return {
    schemaVersion:
      "operational-savings/ecr-dependency-lock-evidence-v1",
    status: evidence.status,
    lockFormat: evidence.lockFormat,
    path: evidence.path,
    repositoryPath: evidence.repositoryPath,
    lockArtifact: durableLock,
    lockedArtifacts: structuredClone(lockedArtifacts),
    lockedArtifactSetSha256:
      evidence.lockedArtifactSetSha256,
    wheelArtifacts,
    wheelArtifactSetSha256:
      ecrEvidenceDigest(wheelArtifacts)
  };
}

function durableLicenseEvidence({
  manifest,
  repository,
  provenance
}) {
  const modelId = repository.modelId;
  const requirements = ecrLicenseRequirements(
    manifest,
    modelId
  );
  const resolvedRequirements = requirements.map(
    (requirement) => ({
      requirement,
      ...exactPackageById(
        manifest,
        requirement,
        modelId,
        provenance
      )
    })
  );
  const parentArtifacts =
    durableEmbeddedParentArtifacts({
      manifest,
      parentPackages: resolvedRequirements
        .map((resolved) => resolved.parentPackage)
        .filter(Boolean),
      modelId
    });
  const parentEvidenceById = new Map(
    parentArtifacts.map((artifact) => [
      artifact.packageId,
      artifact
    ])
  );
  const entries = resolvedRequirements.map(
    ({
      requirement,
      packageRecord,
      repositoryIdentity
    }) => {
      const durable = durablePackageEvidence(
        packageRecord,
        packageRecord.plannedObject?.expectedSha256,
        `${modelId} ${requirement.role} ${requirement.path}`,
        manifest.destination?.s3?.bucket
      );
      const parentArtifact =
        requirement.parentPackageId == null
          ? null
          : parentEvidenceById.get(
              requirement.parentPackageId
            );
      if (
        requirement.parentPackageId != null &&
        !parentArtifact
      ) {
        throw new Error(
          `ECR_LICENSE_PARENT_EVIDENCE_MISSING: ${modelId}: ${requirement.packageId}`
        );
      }
      return {
        packageId: requirement.packageId,
        role: requirement.role,
        path: requirement.path,
        parentPackageId:
          requirement.parentPackageId ?? null,
        parentArtifactEvidenceSha256:
          parentArtifact == null
            ? null
            : ecrEvidenceDigest(parentArtifact),
        repositoryIdentity,
        sha256: durable.sha256,
        sizeBytes: durable.sizeBytes,
        objectKey: durable.objectKey,
        contentType: durable.contentType,
        s3Uri: durable.s3Uri,
        versionId: durable.versionId,
        verificationStatus:
          durable.verificationStatus,
        verifiedAt: durable.verifiedAt,
        checksumSha256Base64:
          durable.checksumSha256Base64,
        serverSideEncryption:
          durable.serverSideEncryption,
        restoredProof: durable.restoredProof
      };
    }
  );
  const primaryEntries = requirements
    .map((requirement, index) => ({
      requirement,
      entry: entries[index]
    }))
    .filter(
      ({ requirement }) =>
        requirement.primarySourceLicense === true
    );
  if (
    primaryEntries.length !== 1 ||
    primaryEntries[0].entry.sha256 !==
      provenance.license.sha256
  ) {
    throw new Error(
      `ECR_PRIMARY_LICENSE_BINDING_INVALID: ${modelId}`
    );
  }
  const dependencyLockEvidence =
    modelId === "scout"
      ? scoutDependencyLockEvidence({
          manifest,
          repository,
          parentArtifacts
        })
      : null;
  const digestPayload = {
    schemaVersion: ECR_LICENSE_EVIDENCE_SCHEMA_VERSION,
    modelId,
    imageDigest: repository.remoteImage.imageDigest,
    buildManifestSha256:
      repository.buildManifest.sha256,
    completeBuildInputSetSha256:
      repository.buildManifest.buildEvidence.contentBinding
        .completeInputSetSha256,
    sourceArchiveSha256:
      provenance.sourceArchiveSha256,
    entries,
    parentArtifacts,
    dependencyLockEvidence
  };
  return {
    ...digestPayload,
    entryCount: entries.length,
    parentArtifactCount: parentArtifacts.length,
    evidenceSetSha256: ecrEvidenceDigest(digestPayload)
  };
}

function findDurableContentPackage(
  manifest,
  expectedSha256,
  label,
  allowedPackageTypes
) {
  const candidates = (manifest.packages ?? [])
    .filter(
      (packageRecord) =>
        packageRecord.plannedObject?.expectedSha256 ===
          expectedSha256 &&
        allowedPackageTypes.includes(
          packageRecord.packageType
        )
    )
    .sort((left, right) =>
      left.packageId.localeCompare(right.packageId)
    );
  const verified = [];
  for (const candidate of candidates) {
    try {
      verified.push(
        durablePackageEvidence(
          candidate,
          expectedSha256,
          label,
          manifest.destination?.s3?.bucket
        )
      );
    } catch {
      // A duplicate local representation does not invalidate another
      // independently verified durable representation of the same bytes.
    }
  }
  if (verified.length === 0) {
    throw new Error(
      `ECR_DURABLE_ARTIFACT_PACKAGE_REQUIRED: ${label}: ${expectedSha256}`
    );
  }
  return verified[0];
}

export function assertEcrBuildEvidence({
  manifest,
  repository,
  requireDurableArtifacts = true
}) {
  const build = repository?.buildManifest?.buildEvidence;
  const provenance = repository?.provenance;
  if (
    repository?.buildManifest?.status !== "VERIFIED" ||
    !SHA256_PATTERN.test(
      repository.buildManifest?.sha256 ?? ""
    ) ||
    provenance?.buildManifestSha256 !==
      repository.buildManifest.sha256 ||
    typeof provenance?.sourceRepository !== "string" ||
    !/^https:\/\/github\.com\/[^/]+\/[^/]+(?:\.git)?$/.test(
      provenance.sourceRepository
    ) ||
    !SHA256_PATTERN.test(
      provenance?.sourceArchiveSha256 ?? ""
    ) ||
    !/^[a-f0-9]{40}$/.test(
      provenance?.sourceCommit ?? ""
    ) ||
    typeof provenance?.sourceRelease !== "string" ||
    !provenance.sourceRelease.trim() ||
    typeof provenance?.modelVersion !== "string" ||
    !provenance.modelVersion.trim() ||
    typeof provenance?.purpose !== "string" ||
    !provenance.purpose.trim() ||
    typeof provenance?.sourceOrganization !== "string" ||
    !provenance.sourceOrganization.trim() ||
    provenance?.sourceRole !==
      "EXACT_CONTAINER_SOURCE_ARCHIVE" ||
    provenance?.official !== true ||
    typeof provenance?.license?.identifier !== "string" ||
    !provenance.license.identifier.trim() ||
    typeof provenance?.license?.path !== "string" ||
    !provenance.license.path.trim() ||
    !SHA256_PATTERN.test(
      provenance?.license?.sha256 ?? ""
    ) ||
    provenance?.license?.status !==
      "RECORDED_AND_HASH_VERIFIED" ||
    provenance?.license?.attributionStatus !==
      "SOURCE_ORGANIZATION_AND_LICENSE_RECORDED" ||
    build?.status !==
      "COMPLETED_AND_EXACT_IMAGE_VERIFIED" ||
    typeof build?.builtAt !== "string" ||
    !Number.isFinite(Date.parse(build.builtAt)) ||
    build?.builtAtEvidence?.kind !==
      "LOCAL_IMAGE_CONFIG_CREATED" ||
    build?.builtAtEvidence?.imageId !==
      repository.localImage?.imageId ||
    build?.builtAtEvidence?.inspectionField !== ".Created" ||
    typeof build?.historicalInvocationCaptured !== "boolean" ||
    typeof build?.commandSemantics !== "string" ||
    !build.commandSemantics.trim() ||
    typeof build?.reproductionCommand !== "string" ||
    !build.reproductionCommand.trim() ||
    !build?.arguments ||
    typeof build.arguments !== "object" ||
    Array.isArray(build.arguments) ||
    Object.keys(build.arguments).length === 0 ||
    Object.values(build.arguments).some(
      (value) =>
        typeof value !== "string" || value.length === 0
    ) ||
    build?.statusEvidence?.localImageId !==
      repository.localImage?.imageId ||
    build?.statusEvidence?.ecrImageDigest !==
      repository.remoteImage?.imageDigest ||
    build?.statusEvidence?.runtimeVerificationStatus !==
      "PASS" ||
    !validBuildContentBinding(build?.contentBinding)
  ) {
    throw new Error(
      `ECR_BUILD_EVIDENCE_INVALID: ${repository?.modelId ?? repository?.repositoryName ?? "unknown"}`
    );
  }
  const buildContextProvenance =
    buildContextProvenanceEvidence(
      build.buildContextProvenance
    );
  const replayState =
    manifest?.destination?.ecr?.postHocReplayReceipt;
  const replayRepositories =
    manifest?.destination?.ecr?.repositories;
  if (
    replayState?.path !==
      POST_HOC_REPLAY_RECEIPT_RELATIVE_PATH ||
    replayState.status !==
      "PASS_COMMITTED_POST_HOC_REPLAY" ||
    replayState.blocker !== null ||
    !Array.isArray(replayRepositories) ||
    repository.localImage?.verificationStatus !==
      "PASS_COMMITTED_POST_HOC_REPLAY"
  ) {
    throw new Error(
      `ECR_POST_HOC_REPLAY_RECEIPT_REQUIRED: ${repository?.modelId ?? repository?.repositoryName ?? "unknown"}`
    );
  }
  const replayBindings =
    assertPostHocReplayReceiptBinding({
      receipt: replayState.receipt,
      repositories: replayRepositories
    });
  const replayBinding = replayBindings.find(
    (candidate) =>
      candidate.repository === repository
  );
  if (!replayBinding) {
    throw new Error(
      `ECR_POST_HOC_REPLAY_MODEL_BINDING_REQUIRED: ${repository?.modelId ?? repository?.repositoryName ?? "unknown"}`
    );
  }
  const postHocReplayEvidence = {
    schemaVersion:
      "operational-savings/ecr-post-hoc-replay-evidence-v1",
    receiptPath: replayState.path,
    receiptContentSha256:
      replayState.receipt.receiptContentSha256,
    contextGitCommit:
      replayState.receipt.contextGitCommit,
    contextGitTree:
      replayState.receipt.contextGitTree,
    semantics: structuredClone(
      replayState.receipt.semantics
    ),
    executionEnvironment: structuredClone(
      replayState.receipt.executionEnvironment
    ),
    model: structuredClone(
      replayBinding.modelReceipt
    )
  };
  const buildMaterialBinding =
    modelBuildMaterialBinding({
      manifest,
      repository
    });

  let durableArtifacts = null;
  if (requireDurableArtifacts) {
    const buildManifestPackage = manifest?.packages?.find(
      (packageRecord) =>
        packageRecord.packageId ===
        `model-support:${repository.modelId}:build-manifest.json`
    );
    if (
      buildManifestPackage?.packageType !==
      "CONTAINER_BUILD_METADATA"
    ) {
      throw new Error(
        `ECR_BUILD_MANIFEST_PACKAGE_TYPE_INVALID: ${repository.modelId}`
      );
    }
    durableArtifacts = {
      schemaVersion:
        "operational-savings/ecr-durable-artifact-evidence-v4",
      buildManifest: durablePackageEvidence(
        buildManifestPackage,
        repository.buildManifest.sha256,
        `${repository.modelId} build manifest`,
        manifest.destination?.s3?.bucket
      ),
      sourceArchive: findDurableContentPackage(
        manifest,
        provenance.sourceArchiveSha256,
        `${repository.modelId} source archive`,
        ["SOURCE_ARTIFACT"]
      ),
      primaryLicense: findDurableContentPackage(
        manifest,
        provenance.license.sha256,
        `${repository.modelId} license`,
        [
          "REPOSITORY_LICENSE_ARTIFACT",
          "EMBEDDED_LICENSE_ARTIFACT"
        ]
      ),
      buildContentBinding: structuredClone(
        build.contentBinding
      ),
      buildContextProvenance,
      postHocReplayEvidence,
      buildMaterialBinding,
      licenseEvidence: durableLicenseEvidence({
        manifest,
        repository,
        provenance
      })
    };
  }
  return {
    build,
    postHocReplayEvidence,
    durableArtifacts
  };
}

function expectedScanBinding(repository) {
  const remote = repository.remoteImage;
  const recordedScan = remote.scan;
  const isIndex =
    remote.imageManifestMediaType ===
    OCI_IMAGE_INDEX_MEDIA_TYPE;
  if (isIndex) {
    if (
      !SHA256_IDENTIFIER_PATTERN.test(
        recordedScan?.scannedManifestDigest ?? ""
      ) ||
      recordedScan.scannedManifestDigest === remote.imageDigest
    ) {
      throw new Error(
        `ECR_INDEX_SCAN_CHILD_DIGEST_REQUIRED: ${repository.modelId}`
      );
    }
    return {
      scannedManifestDigest:
        recordedScan.scannedManifestDigest,
      parentBindingStatus:
        "SCAN_ON_TARGET_PLATFORM_CHILD_BOUND_TO_EXACT_INDEX"
    };
  }
  if (
    recordedScan?.scannedManifestDigest != null &&
    recordedScan.scannedManifestDigest !== remote.imageDigest
  ) {
    throw new Error(
      `ECR_DIRECT_SCAN_DIGEST_MISMATCH: ${repository.modelId}`
    );
  }
  return {
    scannedManifestDigest: remote.imageDigest,
    parentBindingStatus: "SCAN_ON_EXACT_IMAGE_DIGEST"
  };
}

function exactVerifierResults(image, spec) {
  if (!Array.isArray(image.verifierResults)) return false;
  const actual = image.verifierResults
    .map((result) => ({
      verifierRelativePath: result.verifierRelativePath,
      status: result.status
    }))
    .sort((left, right) =>
      left.verifierRelativePath.localeCompare(
        right.verifierRelativePath
      )
    );
  const expected = [...spec.verifierRelativePaths]
    .sort()
    .map((verifierRelativePath) => ({
      verifierRelativePath,
      status: "PASS"
    }));
  return JSON.stringify(actual) === JSON.stringify(expected);
}

export function assertCurrentEcrRestoreReceipt({
  manifest,
  receipt = manifest?.execution?.lastEcrRestoreReplay,
  specs,
  accountId,
  region,
  principalArnPattern,
  requireFullValidation = true,
  requireLocalCleanup = true,
  requireDurableArtifacts = true
}) {
  if (
    receipt?.status !== "PASS" ||
    receipt.accountId !== accountId ||
    receipt.region !== region ||
    !principalArnPattern.test(receipt.principalArn ?? "") ||
    receipt.exactDigestPullsVerified !== true ||
    receipt.offlineModelReplayVerified !== true ||
    receipt.temporaryDockerCredentialRetained !== false ||
    !Array.isArray(receipt.images) ||
    receipt.images.length !== specs.length ||
    !Number.isFinite(Date.parse(receipt.completedAt ?? ""))
  ) {
    throw new Error("ECR_RESTORE_RECEIPT_INVALID");
  }

  const finalValidation =
    manifest.execution?.finalCleanupValidation;
  if (requireFullValidation) {
    if (
      receipt.fullValidationRecorded !== true ||
      finalValidation?.status !== "PASSED" ||
      !Number.isFinite(
        Date.parse(finalValidation.validatedAt ?? "")
      ) ||
      !/^[a-f0-9]{40,64}$/.test(
        finalValidation.validatedSourceCommit ?? ""
      ) ||
      !SHA256_PATTERN.test(
        finalValidation.validatedRepositoryTreeDigest ?? ""
      ) ||
      !Number.isSafeInteger(finalValidation.packageCount) ||
      finalValidation.packageCount !==
        (manifest.packages ?? []).length ||
      receipt.finalCleanupValidation?.sha256 !==
        ecrEvidenceDigest(finalValidation) ||
      receipt.finalCleanupValidation.validatedAt !==
        finalValidation.validatedAt ||
      receipt.finalCleanupValidation.validatedSourceCommit !==
        finalValidation.validatedSourceCommit ||
      receipt.finalCleanupValidation
        .validatedRepositoryTreeDigest !==
        finalValidation.validatedRepositoryTreeDigest ||
      receipt.finalCleanupValidation.packageCount !==
        finalValidation.packageCount
    ) {
      throw new Error(
        "ECR_RESTORE_RECEIPT_VALIDATION_STALE"
      );
    }
  } else if (
    receipt.fullValidationRecorded !== false ||
    receipt.finalCleanupValidation !== null
  ) {
    throw new Error(
      "ECR_RESTORE_RECEIPT_VALIDATION_UNEXPECTED"
    );
  }

  if (
    receipt.allImagesRemovedLocally !==
      receipt.images.every(
        (image) =>
          image.localCleanupStatus ===
          ECR_LOCAL_CLEANUP_COMPLETE_STATUS
      ) ||
    (requireLocalCleanup &&
      receipt.allImagesRemovedLocally !== true)
  ) {
    throw new Error(
      "ECR_RESTORE_RECEIPT_CLEANUP_INVALID"
    );
  }

  const imagesByModel = new Map(
    receipt.images.map((image) => [
      image.modelId,
      image
    ])
  );
  if (imagesByModel.size !== receipt.images.length) {
    throw new Error(
      "ECR_RESTORE_RECEIPT_IMAGE_SET_INVALID"
    );
  }
  for (const spec of specs) {
    const image = imagesByModel.get(spec.modelId);
    const repository =
      manifest.destination?.ecr?.repositories?.find(
        (candidate) =>
          candidate.modelId === spec.modelId &&
          candidate.repositoryName === spec.repositoryName
      );
    if (!image || !repository) {
      throw new Error(
        `ECR_RESTORE_RECEIPT_IMAGE_MISSING: ${spec.modelId}`
      );
    }
    const evidence = assertEcrBuildEvidence({
      manifest,
      repository,
      requireDurableArtifacts
    });
    const binding = expectedScanBinding(repository);
    const durableArtifactEvidenceSha256 =
      ecrEvidenceDigest(evidence.durableArtifacts ?? null);
    const live = image.liveEcr;
    const scan = live?.exactDigestScan;
    const recordedScan = repository.remoteImage.scan;
    if (
      image.imageUri !== repository.remoteImage.imageUri ||
      image.imageId !== repository.localImage.imageId ||
      image.targetPlatform !==
        repository.localImage.targetPlatform ||
      image.pullStatus !== "PULLED_EXACT_DIGEST" ||
      image.replayStatus !== "PASS" ||
      !exactVerifierResults(image, spec) ||
      live?.repositoryControls?.imageTagMutability !==
        "IMMUTABLE" ||
      live?.repositoryControls?.encryptionType !== "AES256" ||
      live?.repositoryControls?.scanOnPush !== true ||
      live?.lifecyclePolicy?.taggedImagesRetained !== true ||
      !Number.isSafeInteger(
        live?.lifecyclePolicy?.minimumUntaggedRetentionDays
      ) ||
      live.lifecyclePolicy.minimumUntaggedRetentionDays < 14 ||
      scan?.status !== "COMPLETE" ||
      scan.recordedEvidenceMatched !== true ||
      scan.parentImageDigest !==
        repository.remoteImage.imageDigest ||
      scan.scannedManifestDigest !==
        binding.scannedManifestDigest ||
      scan.parentBindingStatus !==
        binding.parentBindingStatus ||
      scan.critical !== recordedScan.critical ||
      scan.high !== recordedScan.high ||
      scan.medium !== recordedScan.medium ||
      scan.low !== recordedScan.low ||
      image.durableArtifactEvidenceSha256 !==
        durableArtifactEvidenceSha256 ||
      image.licenseEvidenceSetSha256 !==
        evidence.durableArtifacts?.licenseEvidence
          ?.evidenceSetSha256 ||
      ecrEvidenceDigest(
        image.durableArtifactEvidence ?? null
      ) !==
        durableArtifactEvidenceSha256
    ) {
      throw new Error(
        `ECR_RESTORE_RECEIPT_IMAGE_INVALID: ${spec.modelId}`
      );
    }
  }
  return receipt;
}
