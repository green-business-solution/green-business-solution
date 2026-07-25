import { createHash } from "node:crypto";
import { execFile } from "node:child_process";
import { createReadStream } from "node:fs";
import {
  lstat,
  open,
  readFile,
  readdir,
  readlink
} from "node:fs/promises";
import {
  basename,
  dirname,
  extname,
  isAbsolute,
  join,
  relative,
  resolve,
  sep
} from "node:path";
import { promisify } from "node:util";
import { fileURLToPath } from "node:url";

import { REOPT_FILES } from "../adapters/reopt/inspect-schema.mjs";
import {
  FIXED_GIT_PATH,
  archiveSubprocessEnvironment,
  gitSubprocessEnvironment
} from "../lib/subprocess-environment.mjs";
import {
  assertLocalArtifactAuditFresh,
  assertLocalArtifactAuditWorktree
} from "./local-audit-freshness.mjs";
import {
  OCI_IMAGE_INDEX_MEDIA_TYPE,
  assertCurrentEcrRestoreReceipt
} from "./ecr-evidence.mjs";
import {
  loadPostHocReplayReceipt
} from "./post-hoc-replay.mjs";

const execFileAsync = promisify(execFile);

export const STORAGE_SCHEMA_VERSION =
  "operational-savings/research-storage-migration-v1";
export const CACHE_RELATIVE_PATH =
  "scripts/research/operational-savings/.cache";
export const DEFAULT_REPO_ROOT = fileURLToPath(
  new URL("../../../../", import.meta.url)
);
export const DEFAULT_MANIFEST_RELATIVE_PATH =
  "docs/operational-savings-automation-research/research-storage-migration-manifest.v1.json";
export const DEFAULT_REPORT_RELATIVE_PATH =
  "docs/operational-savings-automation-research/research-storage-migration-report.md";
export const ARTIFACT_METADATA_SUPPLEMENT_RELATIVE_PATH =
  "docs/operational-savings-automation-research/research-artifact-metadata-supplement.v1.json";
export const LOCAL_ARTIFACT_AUDIT_RELATIVE_PATH =
  "docs/operational-savings-automation-research/research-local-artifact-audit.v1.json";
const MODEL_SUPPORT_MIGRATION_SPECS = [
  {
    modelId: "reopt",
    storageRelease: "reopt-0.59.2-f952cab",
    fileName: "build-manifest.json",
    packageType: "CONTAINER_BUILD_METADATA",
    role: "VERIFIED_CONTAINER_BUILD_MANIFEST",
    adapterVersion: "container-build-v1",
    acquisitionMode: "VERIFIED_CONTAINER_BUILD_EVIDENCE",
    contentKind: "CONTAINER_BUILD_METADATA"
  },
  ...[
    "official-proof.json",
    "retrofi-proof.json",
    "solar-storage-proof.json"
  ].map((fileName) => ({
    modelId: "reopt",
    storageRelease: "reopt-0.59.2-f952cab",
    fileName,
    packageType: "MODEL_OUTPUT_FIXTURE",
    role: "VERIFIED_OFFLINE_MODEL_OUTPUT",
    adapterVersion: "model-output-v1",
    acquisitionMode: "VERIFIED_OFFLINE_MODEL_EXECUTION",
    contentKind: "MODEL_OUTPUT_FIXTURE"
  })),
  ...[
    "pvwatts-interval-series.json",
    "retrofi-storage-spec.json",
    "retrofi-solar-storage-spec.json"
  ].map((fileName) => ({
    modelId: "reopt",
    storageRelease: "reopt-0.59.2-f952cab",
    fileName,
    packageType: "MODEL_INPUT_FIXTURE",
    role: "PINNED_OFFLINE_MODEL_INPUT",
    adapterVersion: "model-input-v1",
    acquisitionMode: "SOURCE_CONTROLLED_MODEL_INPUT",
    contentKind: "MODEL_INPUT_FIXTURE"
  })),
  {
    modelId: "ssc",
    storageRelease: "ssc-308-ba7a7968",
    fileName: "build-manifest.json",
    packageType: "CONTAINER_BUILD_METADATA",
    role: "VERIFIED_CONTAINER_BUILD_MANIFEST",
    adapterVersion: "container-build-v1",
    acquisitionMode: "VERIFIED_CONTAINER_BUILD_EVIDENCE",
    contentKind: "CONTAINER_BUILD_METADATA"
  },
  {
    modelId: "measur",
    storageRelease: "amo-tools-bdc33b8",
    fileName: "build-manifest.json",
    packageType: "CONTAINER_BUILD_METADATA",
    role: "VERIFIED_CONTAINER_BUILD_MANIFEST",
    adapterVersion: "container-build-v1",
    acquisitionMode: "VERIFIED_CONTAINER_BUILD_EVIDENCE",
    contentKind: "CONTAINER_BUILD_METADATA"
  },
  {
    modelId: "measur",
    storageRelease: "amo-tools-bdc33b8",
    fileName: "fixtures.json",
    packageType: "MODEL_INPUT_FIXTURE",
    role: "PINNED_OFFLINE_MODEL_INPUT",
    adapterVersion: "model-input-v1",
    acquisitionMode: "SOURCE_CONTROLLED_MODEL_INPUT",
    contentKind: "MODEL_INPUT_FIXTURE"
  },
  {
    modelId: "scout",
    storageRelease: "scout-72bcf419",
    fileName: "build-manifest.json",
    packageType: "CONTAINER_BUILD_METADATA",
    role: "VERIFIED_CONTAINER_BUILD_MANIFEST",
    adapterVersion: "container-build-v1",
    acquisitionMode: "VERIFIED_CONTAINER_BUILD_EVIDENCE",
    contentKind: "CONTAINER_BUILD_METADATA"
  },
  {
    modelId: "scout",
    storageRelease: "scout-72bcf419",
    fileName: "requirements.lock",
    packageType: "MODEL_DEPENDENCY_LOCK",
    role: "PINNED_CONTAINER_DEPENDENCY_LOCK",
    adapterVersion: "dependency-lock-v1",
    acquisitionMode: "SOURCE_CONTROLLED_DEPENDENCY_LOCK",
    contentKind: "MODEL_DEPENDENCY_LOCK"
  }
].map((spec) =>
  Object.freeze({
    ...spec,
    packageId:
      `model-support:${spec.modelId}:${spec.fileName}`,
    localPath:
      `scripts/research/operational-savings/containers/${spec.modelId}/${spec.fileName}`,
    sourceOrganization: "RetroFi",
    localRetentionPolicy: "RETAIN_SOURCE_CONTROLLED_FIXTURE",
    storageArea:
      spec.packageType === "MODEL_INPUT_FIXTURE"
        ? "MODEL_INPUT"
        : spec.packageType === "MODEL_OUTPUT_FIXTURE"
          ? "MODEL_OUTPUT"
          : "MODEL_SUPPORT",
    releaseIdentity: spec.storageRelease,
    ingestionStatus: "REFERENCED_BY_CONTAINER_VERIFICATION",
    ingestionManifest:
      `scripts/research/operational-savings/containers/${spec.modelId}/build-manifest.json`,
    reproducibilityStatus: "SOURCE_CONTROLLED_AND_OFFLINE_VERIFIED"
  })
);
export const OUTSIDE_CACHE_MIGRATION_SPECS = Object.freeze([
  Object.freeze({
    packageId: "repository-artifact:research-database.compact.json",
    packageType: "NORMALIZED_OUTPUT_FIXTURE",
    localPath:
      "docs/operational-savings-automation-research/fixtures/research-database.compact.json",
    outputId: "compact-research-database",
    role: "COMPACT_NORMALIZED_OUTPUT_FIXTURE",
    adapterVersion: "compact-database-v1",
    sourceOrganization: "RetroFi",
    acquisitionMode: "LOCAL_DATABASE_COMPACT_EXPORT",
    localRetentionPolicy: "RETAIN_SOURCE_CONTROLLED_FIXTURE",
    storageArea: "DATABASE_EXPORT"
  }),
  Object.freeze({
    packageId:
      "adapter-fixture:operating-schedule:project-schedule-fixtures.v1.json",
    packageType: "MODEL_INPUT_FIXTURE",
    localPath:
      "scripts/research/operational-savings/adapters/operating-schedule/project-schedule-fixtures.v1.json",
    modelId: "operating-schedule",
    storageRelease: "project-schedule-fixtures-v1",
    role: "PINNED_OFFLINE_MODEL_INPUT",
    adapterVersion: "model-input-v1",
    sourceOrganization: "RetroFi",
    acquisitionMode: "SOURCE_CONTROLLED_MODEL_INPUT",
    localRetentionPolicy: "RETAIN_SOURCE_CONTROLLED_FIXTURE",
    storageArea: "MODEL_INPUT",
    contentKind: "MODEL_INPUT_FIXTURE",
    releaseIdentity:
      "Operational-savings project schedule fixtures v1",
    ingestionStatus: "REFERENCED_BY_RESEARCH_PROOF",
    ingestionManifest:
      "scripts/research/operational-savings/adapters/operating-schedule/proof.json",
    reproducibilityStatus:
      "SOURCE_CONTROLLED_AND_OFFLINE_VERIFIED"
  }),
  Object.freeze({
    packageId:
      "adapter-output:scout:prepared-result.v1.json",
    packageType: "MODEL_OUTPUT_FIXTURE",
    localPath:
      "scripts/research/operational-savings/adapters/scout/prepared-result.v1.json",
    modelId: "scout",
    storageRelease: "scout-72bcf419",
    role: "VERIFIED_OFFLINE_MODEL_OUTPUT",
    adapterVersion: "model-output-v1",
    sourceOrganization: "RetroFi",
    acquisitionMode: "VERIFIED_OFFLINE_MODEL_EXECUTION",
    localRetentionPolicy: "RETAIN_SOURCE_CONTROLLED_FIXTURE",
    storageArea: "MODEL_OUTPUT",
    contentKind: "MODEL_OUTPUT_FIXTURE",
    releaseIdentity:
      "Scout 72bcf419 prepared ECM result v1",
    ingestionStatus: "REFERENCED_BY_RESEARCH_PROOF",
    ingestionManifest:
      "scripts/research/operational-savings/adapters/scout/proof.json",
    reproducibilityStatus:
      "SOURCE_CONTROLLED_AND_OFFLINE_VERIFIED"
  }),
  Object.freeze({
    packageId: "inspection-image:epa-chp-page-037.png",
    packageType: "DERIVED_INSPECTION_IMAGE",
    localPath: "tmp/pdfs/epa-chp-page-037.png",
    outputId: "epa-chp-page-037",
    role: "SOURCE_PDF_INSPECTION_RENDER",
    adapterVersion: "pdf-page-render-v1",
    sourceOrganization: "United States Environmental Protection Agency",
    acquisitionMode: "LOCAL_PDF_PAGE_RENDER",
    localRetentionPolicy: "DELETE_AFTER_VERIFIED_MIGRATION",
    storageArea: "MODEL_SUPPORT",
    contentKind: "DERIVED_PDF_PAGE_INSPECTION_IMAGE",
    derivedFromLocalPath:
      `${CACHE_RELATIVE_PATH}/artifacts/epa-chp-catalog.pdf`,
    releaseIdentity:
      "EPA CHP catalog page 37 inspection render"
  }),
  Object.freeze({
    packageId: "inspection-image:sdge-jrc-page-10.png",
    packageType: "DERIVED_INSPECTION_IMAGE",
    localPath: "tmp/pdfs/tariff/sdge-jrc-page-10.png",
    outputId: "sdge-jrc-page-10",
    role: "SOURCE_PDF_INSPECTION_RENDER",
    adapterVersion: "pdf-page-render-v1",
    sourceOrganization: "San Diego Gas & Electric",
    acquisitionMode: "LOCAL_PDF_PAGE_RENDER",
    localRetentionPolicy: "DELETE_AFTER_VERIFIED_MIGRATION",
    storageArea: "MODEL_SUPPORT",
    contentKind: "DERIVED_PDF_PAGE_INSPECTION_IMAGE",
    derivedFromLocalPath:
      `${CACHE_RELATIVE_PATH}/artifacts/sdge-sdcp-joint-rate-comparison-2026-06-01.pdf`,
    releaseIdentity:
      "SDG&E and SDCP joint rate comparison page 10 inspection render"
  }),
  Object.freeze({
    packageId:
      "inspection-image:sdge-small-commercial-page-1.png",
    packageType: "DERIVED_INSPECTION_IMAGE",
    localPath:
      "tmp/pdfs/tariff/sdge-small-commercial-page-1.png",
    outputId: "sdge-small-commercial-page-1",
    role: "SOURCE_PDF_INSPECTION_RENDER",
    adapterVersion: "pdf-page-render-v1",
    sourceOrganization: "San Diego Gas & Electric",
    acquisitionMode: "LOCAL_PDF_PAGE_RENDER",
    localRetentionPolicy: "DELETE_AFTER_VERIFIED_MIGRATION",
    storageArea: "MODEL_SUPPORT",
    contentKind: "DERIVED_PDF_PAGE_INSPECTION_IMAGE",
    derivedFromLocalPath:
      `${CACHE_RELATIVE_PATH}/artifacts/sdge-small-commercial-rates-2026-06-01.pdf`,
    releaseIdentity:
      "SDG&E small commercial rates page 1 inspection render"
  }),
  ...MODEL_SUPPORT_MIGRATION_SPECS
]);

const DESTINATION = Object.freeze({
  accountId: "945129430686",
  region: "us-east-1",
  bucket:
    "retrofi-operational-savings-research-945129430686-us-east-1",
  roleName: "RetroFiOperationalSavingsResearchRole",
  ecrRepositories: Object.freeze([
    Object.freeze({
      modelId: "reopt",
      repositoryName: "retrofi-research-reopt",
      localRepositoryName: "retrofit-research-reopt",
      purpose:
        "Research-only REopt optimal energy dispatch and solar-plus-storage calculation replay.",
      verifierRelativePaths: Object.freeze([
        "scripts/research/operational-savings/containers/reopt/verify.mjs",
        "scripts/research/operational-savings/containers/reopt/verify-solar-storage.mjs"
      ]),
      buildManifestRelativePath:
        "scripts/research/operational-savings/containers/reopt/build-manifest.json"
    }),
    Object.freeze({
      modelId: "ssc",
      repositoryName: "retrofi-research-ssc",
      localRepositoryName: "retrofit-research-ssc",
      purpose:
        "Research-only SSC and SAM technology-performance calculation replay.",
      verifierRelativePaths: Object.freeze([
        "scripts/research/operational-savings/containers/ssc/verify.mjs"
      ]),
      buildManifestRelativePath:
        "scripts/research/operational-savings/containers/ssc/build-manifest.json"
    }),
    Object.freeze({
      modelId: "measur",
      repositoryName: "retrofi-research-measur",
      localRepositoryName: "retrofit-research-measur",
      purpose:
        "Research-only DOE MEASUR industrial energy calculation replay.",
      verifierRelativePaths: Object.freeze([
        "scripts/research/operational-savings/containers/measur/verify.mjs"
      ]),
      buildManifestRelativePath:
        "scripts/research/operational-savings/containers/measur/build-manifest.json"
    }),
    Object.freeze({
      modelId: "scout",
      repositoryName: "retrofi-research-scout",
      localRepositoryName: "retrofit-research-scout",
      purpose:
        "Research-only Scout energy-conservation-measure screening replay.",
      verifierRelativePaths: Object.freeze([
        "scripts/research/operational-savings/containers/scout/verify.mjs"
      ]),
      buildManifestRelativePath:
        "scripts/research/operational-savings/containers/scout/build-manifest.json"
    })
  ])
});

const COMPILED_EXTENSIONS = new Set([".dll", ".dylib", ".so"]);
const SOURCE_ARCHIVE_MEDIA_TYPE =
  "application/x-git-bundle";
const SHA256_IDENTIFIER_PATTERN = /^sha256:[a-f0-9]{64}$/;
const RESEARCH_ROLE_ARN_PATTERN =
  /^arn:aws:sts::945129430686:assumed-role\/RetroFiOperationalSavingsResearchRole\/[^/]+$/;
const CONTAINER_TAG_PATTERN = /^[\w][\w.-]{0,127}$/;
const REPOSITORY_LICENSE_FILE_PATTERN =
  /^(?:LICENSE|NOTICE|COPYING|COPYRIGHT)(?:[._-][^/]+)?$/i;
const REPOSITORY_LICENSE_SPECS = Object.freeze({
  "amo-tools-suite": Object.freeze({
    sourceOrganization: "Oak Ridge National Laboratory",
    files: Object.freeze({
      "LICENSE.txt": Object.freeze({
        spdxExpression: "LicenseRef-ORNL-AMO-Permissive",
        licenseRole: "PROJECT_LICENSE",
        attribution:
          "Copyright 2018, UT-Battelle, LLC. Retain the complete upstream AMO Tools Suite license and its attribution."
      }),
      "include/fast-cpp-csv-parser/LICENSE": Object.freeze({
        spdxExpression: "BSD-3-Clause",
        licenseRole: "VENDORED_DEPENDENCY_LICENSE",
        attribution:
          "Copyright 2015, ben-strasser. Retain the complete fast-cpp-csv-parser license and copyright notice."
      })
    })
  }),
  reopt: Object.freeze({
    sourceOrganization:
      "National Laboratory of the Rockies",
    files: Object.freeze({
      LICENSE: Object.freeze({
        spdxExpression: "Apache-2.0",
        licenseRole: "PROJECT_LICENSE",
        attribution:
          "Retain the complete Apache License 2.0 text distributed with REopt.jl."
      }),
      NOTICE: Object.freeze({
        spdxExpression: "Apache-2.0",
        licenseRole: "PROJECT_NOTICE",
        attribution:
          "Copyright 2023 Alliance for Sustainable Energy, LLC. Retain the complete REopt.jl NOTICE with the Apache-2.0 license text."
      }),
      "transcrypt/LICENSE": Object.freeze({
        spdxExpression: "MIT",
        licenseRole: "VENDORED_DEPENDENCY_LICENSE",
        attribution:
          "Copyright 2014-2019 Aaron Bull Schaefer and Copyright 2011 Woody Gilk. Retain the complete transcrypt license and copyright notices."
      })
    })
  }),
  scout: Object.freeze({
    sourceOrganization:
      "National Laboratory of the Rockies",
    files: Object.freeze({
      "LICENSE.md": Object.freeze({
        spdxExpression: "Apache-2.0 OR BSD-3-Clause",
        licenseRole: "CONDITIONAL_DUAL_PROJECT_LICENSE",
        attribution:
          "Copyright 2015-2018 Chioke Harris and Jared Langevin. The BSD alternative is conditional, so retain the complete Scout license text rather than relying only on its SPDX summary."
      })
    })
  }),
  ssc: Object.freeze({
    sourceOrganization:
      "National Laboratory of the Rockies",
    files: Object.freeze({
      LICENSE: Object.freeze({
        spdxExpression: "BSD-3-Clause",
        licenseRole: "PROJECT_LICENSE",
        attribution:
          "Copyright 2017 and 2022 Alliance for Energy Innovation, LLC. Retain the complete SSC license and copyright notice."
      }),
      "lpsolve/LICENSE.htm": Object.freeze({
        spdxExpression: "LGPL-2.1-only",
        licenseRole: "VENDORED_DEPENDENCY_LICENSE",
        attribution:
          "Retain the complete GNU Lesser General Public License version 2.1 text distributed with the vendored lp_solve source."
      }),
      "nlopt/LICENSE.htm": Object.freeze({
        spdxExpression: "LGPL-2.1-only",
        licenseRole: "VENDORED_DEPENDENCY_LICENSE",
        attribution:
          "Retain the complete GNU Lesser General Public License version 2.1 text distributed with the vendored NLopt source."
      })
    })
  })
});
const OR_TOOLS_ARCHIVE_FILE_NAME =
  "or-tools_aarch64_AlmaLinux-8.10_cpp_v9.14.6206.tar.gz";
const OR_TOOLS_LICENSE_MEMBER_PATH =
  `${OR_TOOLS_ARCHIVE_FILE_NAME.replace(/\.tar\.gz$/i, "")}/share/doc/ortools/LICENSE`;
const EMBEDDED_LICENSE_PARENT_KINDS = Object.freeze([
  Object.freeze({
    packageType: "MODEL_DEPENDENCY_WHEEL",
    archiveFormat: "ZIP",
    expectedParentCount: 34
  }),
  Object.freeze({
    packageId:
      `cache-file:artifacts/${OR_TOOLS_ARCHIVE_FILE_NAME}`,
    archiveFormat: "TAR_GZIP",
    exactMemberPaths: Object.freeze([
      OR_TOOLS_LICENSE_MEMBER_PATH
    ])
  })
]);

function parsedMetadataHeaders(metadataText, packageId) {
  if (
    typeof metadataText !== "string"
  ) {
    throw new Error(
      `WHEEL_METADATA_INVALID_UTF8: ${packageId}`
    );
  }
  const headers = [];
  let current = null;
  for (const line of metadataText
    .replaceAll("\r\n", "\n")
    .replaceAll("\r", "\n")
    .split("\n")) {
    if (line === "") break;
    if (
      line.includes("\0") ||
      line.includes("\uFFFD")
    ) {
      throw new Error(
        `WHEEL_METADATA_INVALID_UTF8: ${packageId}`
      );
    }
    if (/^[ \t]/.test(line)) {
      if (!current) {
        throw new Error(
          `WHEEL_METADATA_HEADER_CONTINUATION_INVALID: ${packageId}`
        );
      }
      current.value += `\n${line.slice(1)}`;
      continue;
    }
    const separator = line.indexOf(":");
    if (separator <= 0) {
      throw new Error(
        `WHEEL_METADATA_HEADER_INVALID: ${packageId}`
      );
    }
    current = {
      name: line.slice(0, separator),
      value: line.slice(separator + 1).trim()
    };
    headers.push(current);
  }
  return headers;
}

function safeWheelLicenseDeclaration(value, packageId) {
  if (
    typeof value !== "string" ||
    !value ||
    value.includes("\\") ||
    value.startsWith("/") ||
    value.endsWith("/") ||
    value.split("/").some(
      (segment) =>
        !segment ||
        segment === "." ||
        segment === ".."
    )
  ) {
    throw new Error(
      `WHEEL_LICENSE_FILE_DECLARATION_INVALID: ${packageId}: ${JSON.stringify(value)}`
    );
  }
  return value;
}

export function declaredWheelLicenseMembers({
  members,
  metadataMemberPath,
  metadataText,
  packageId
}) {
  if (
    !Array.isArray(members) ||
    !members.includes(metadataMemberPath) ||
    !/^[^/]+\.dist-info\/METADATA$/.test(
      metadataMemberPath
    )
  ) {
    throw new Error(
      `WHEEL_METADATA_MEMBER_INVALID: ${packageId}: ${metadataMemberPath}`
    );
  }
  const distInfoPath = dirname(metadataMemberPath)
    .split(sep)
    .join("/");
  const declarations = unique(
    parsedMetadataHeaders(metadataText, packageId)
      .filter(
        (header) =>
          header.name.toLowerCase() === "license-file"
      )
      .map((header) =>
        safeWheelLicenseDeclaration(
          header.value,
          packageId
        )
      )
  );
  const memberSet = new Set(members);
  return declarations.map((declaration) => {
    const candidates = unique([
      `${distInfoPath}/licenses/${declaration}`,
      `${distInfoPath}/${declaration}`
    ]).filter((candidate) => memberSet.has(candidate));
    if (candidates.length !== 1) {
      throw new Error(
        `${candidates.length === 0 ? "WHEEL_DECLARED_LICENSE_MEMBER_MISSING" : "WHEEL_DECLARED_LICENSE_MEMBER_AMBIGUOUS"}: ${packageId}: ${declaration}`
      );
    }
    return candidates[0];
  });
}

function sha256Bytes(value) {
  return createHash("sha256").update(value).digest("hex");
}

function isIsoTimestamp(value) {
  return (
    typeof value === "string" &&
    value.length > 0 &&
    Number.isFinite(Date.parse(value))
  );
}

function parseTaggedImageReference(value) {
  if (typeof value !== "string" || value.includes("@")) return null;
  const lastSlash = value.lastIndexOf("/");
  const lastColon = value.lastIndexOf(":");
  if (lastColon <= lastSlash) return null;
  const repository = value.slice(0, lastColon);
  const tag = value.slice(lastColon + 1);
  if (!repository || !CONTAINER_TAG_PATTERN.test(tag)) return null;
  return { repository, tag };
}

function emptyRemoteImage() {
  return {
    accountId: null,
    region: null,
    repositoryName: null,
    repositoryUri: null,
    imageTag: null,
    imageDigest: null,
    imageUri: null,
    imageSizeBytes: null,
    imageManifestMediaType: null,
    pushedAt: null,
    verifiedAt: null,
    exactDigestPulled: false,
    runtimeVerificationStatus: null,
    verificationCommand: null,
    scan: null,
    pushStatus: "NOT_RECORDED",
    verificationStatus: "NOT_RECORDED",
    evidenceSource: null,
    verifiedByInventoryAwsCall: false
  };
}

function localImageState(verificationStatus) {
  return {
    repositoryTag: null,
    imageTag: null,
    imageId: null,
    repositoryDigests: [],
    targetPlatform: null,
    verifiedAt: null,
    verificationCommand: null,
    verificationStatus,
    currentDaemonPresenceCheckedByInventory: false
  };
}

function normalizedContainerProvenance(manifest, spec) {
  const source = manifest?.source;
  const license = source?.license;
  const licenseIdentifier =
    license?.spdxId ??
    license?.spdxExpression ??
    license?.upstreamName;
  const licensePath = license?.path ?? license?.file;
  const licenseSha256 =
    license?.sha256 ?? license?.fileSha256;
  const sourceRelease =
    typeof source?.version === "string" && source.version.trim()
      ? source.version.trim()
      : typeof source?.samPackageVersion === "string" &&
          source.samPackageVersion.trim()
        ? source.samPackageVersion.trim()
        : Number.isSafeInteger(source?.sscApiVersion)
          ? `ssc-api-${source.sscApiVersion}`
          : `git-${String(source?.commit ?? "").slice(0, 12)}`;
  const validationErrors = [];
  if (
    typeof source?.repository !== "string" ||
    !/^https:\/\/github\.com\/[^/]+\/[^/]+(?:\.git)?$/.test(
      source.repository
    )
  ) {
    validationErrors.push(
      "source.repository must be a complete HTTPS GitHub repository URL"
    );
  }
  if (
    typeof source?.commit !== "string" ||
    !/^[a-f0-9]{40}$/.test(source.commit)
  ) {
    validationErrors.push(
      "source.commit must be a full lowercase Git commit"
    );
  }
  if (
    typeof source?.sourceOrganization !== "string" ||
    !source.sourceOrganization.trim()
  ) {
    validationErrors.push(
      "source.sourceOrganization must record attribution"
    );
  }
  if (
    typeof source?.role !== "string" ||
    !source.role.trim()
  ) {
    validationErrors.push(
      "source.role must record the source archive purpose"
    );
  }
  if (source?.official !== true) {
    validationErrors.push(
      "source.official must identify the archive as official"
    );
  }
  if (!/^[a-f0-9]{64}$/.test(source?.archiveSha256 ?? "")) {
    validationErrors.push(
      "source.archiveSha256 must bind the exact source archive"
    );
  }
  if (
    typeof sourceRelease !== "string" ||
    !sourceRelease.trim() ||
    sourceRelease === "git-"
  ) {
    validationErrors.push(
      "source must provide a version, release, API version, or pinned commit"
    );
  }
  if (
    typeof licenseIdentifier !== "string" ||
    !licenseIdentifier.trim()
  ) {
    validationErrors.push(
      "source.license must record an SPDX identifier, SPDX expression, or upstream license name"
    );
  }
  if (
    typeof licensePath !== "string" ||
    !licensePath.trim()
  ) {
    validationErrors.push(
      "source.license must record the verified license path"
    );
  }
  if (!/^[a-f0-9]{64}$/.test(licenseSha256 ?? "")) {
    validationErrors.push(
      "source.license must record the verified license SHA-256"
    );
  }
  if (
    typeof spec.purpose !== "string" ||
    !spec.purpose.trim()
  ) {
    validationErrors.push(
      "the container inventory specification must record a purpose"
    );
  }
  if (validationErrors.length > 0) {
    return { validationErrors, provenance: null };
  }
  return {
    validationErrors,
    provenance: {
      sourceRepository: source.repository,
      sourceCommit: source.commit,
      sourceRelease,
      modelVersion: sourceRelease,
      purpose: spec.purpose,
      sourceOrganization: source.sourceOrganization,
      sourceRole: source.role,
      official: source.official,
      sourceArchiveSha256: source.archiveSha256,
      license: {
        identifier: licenseIdentifier,
        path: licensePath,
        sha256: licenseSha256,
        status: "RECORDED_AND_HASH_VERIFIED",
        attributionStatus:
          "SOURCE_ORGANIZATION_AND_LICENSE_RECORDED"
      }
    }
  };
}

function sameStableFileIdentity(left, right) {
  return [
    "dev",
    "ino",
    "size",
    "mtimeNs",
    "ctimeNs"
  ].every((field) => left[field] === right[field]);
}

async function assertContainedPathHasNoSymlink({
  allowedRoot,
  absolutePath
}) {
  const containedPath = relative(allowedRoot, absolutePath);
  if (
    !containedPath ||
    containedPath === ".." ||
    containedPath.startsWith(`..${sep}`) ||
    isAbsolute(containedPath)
  ) {
    throw new Error("BUILD_INPUT_PATH_OUTSIDE_RESEARCH_ROOT");
  }
  let currentPath = allowedRoot;
  for (const segment of containedPath.split(sep)) {
    currentPath = join(currentPath, segment);
    const details = await lstat(currentPath, {
      bigint: true
    });
    if (details.isSymbolicLink()) {
      throw new Error("BUILD_INPUT_SYMLINK_REJECTED");
    }
  }
}

async function readStableRegularFile(absolutePath) {
  const pathBefore = await lstat(absolutePath, {
    bigint: true
  });
  if (!pathBefore.isFile() || pathBefore.isSymbolicLink()) {
    throw new Error("BUILD_INPUT_NOT_REGULAR_FILE");
  }
  const handle = await open(absolutePath, "r");
  try {
    const openBefore = await handle.stat({
      bigint: true
    });
    if (
      !openBefore.isFile() ||
      !sameStableFileIdentity(pathBefore, openBefore)
    ) {
      throw new Error(
        "BUILD_INPUT_CHANGED_BEFORE_CONTENT_READ"
      );
    }
    const bytes = await handle.readFile();
    const openAfter = await handle.stat({
      bigint: true
    });
    const pathAfter = await lstat(absolutePath, {
      bigint: true
    });
    if (
      BigInt(bytes.byteLength) !== openBefore.size ||
      !sameStableFileIdentity(openBefore, openAfter) ||
      !sameStableFileIdentity(openAfter, pathAfter)
    ) {
      throw new Error(
        "BUILD_INPUT_CHANGED_DURING_CONTENT_READ"
      );
    }
    return {
      byteSize: bytes.byteLength,
      sha256: sha256Bytes(bytes),
      bytes
    };
  } finally {
    await handle.close();
  }
}

function canonicalManifestInputPath(value) {
  if (
    typeof value !== "string" ||
    !value ||
    isAbsolute(value) ||
    value.includes("\\") ||
    /[\u0000-\u001f\u007f]/.test(value)
  ) {
    return null;
  }
  let enteredPath = false;
  for (const segment of value.split("/")) {
    if (!segment || segment === ".") return null;
    if (segment === "..") {
      if (enteredPath) return null;
      continue;
    }
    enteredPath = true;
  }
  return enteredPath ? value : null;
}

async function validateManifestInputGroup({
  repoRoot,
  manifestDirectory,
  groupName,
  inputs
}) {
  const validationErrors = [];
  const records = [];
  const absolutePaths = new Set();
  const contentByAbsolutePath = new Map();
  if (!Array.isArray(inputs) || inputs.length === 0) {
    return {
      validationErrors: [
        `${groupName} must be a non-empty array of exact file hashes`
      ],
      records,
      absolutePaths,
      contentByAbsolutePath
    };
  }
  const researchRoot = resolve(
    repoRoot,
    "scripts/research/operational-savings"
  );
  const declaredPaths = new Set();
  for (const [index, input] of inputs.entries()) {
    const label = `${groupName}[${index}]`;
    if (
      !input ||
      typeof input !== "object" ||
      Array.isArray(input)
    ) {
      validationErrors.push(
        `${label} must be an object`
      );
      continue;
    }
    const inputPath = canonicalManifestInputPath(
      input.path
    );
    if (!inputPath) {
      validationErrors.push(
        `${label}.path must be a canonical relative research path`
      );
      continue;
    }
    if (declaredPaths.has(inputPath)) {
      validationErrors.push(
        `${groupName} contains duplicate path ${inputPath}`
      );
      continue;
    }
    declaredPaths.add(inputPath);
    if (!/^[a-f0-9]{64}$/.test(input.sha256 ?? "")) {
      validationErrors.push(
        `${label}.sha256 must be a lowercase SHA-256`
      );
      continue;
    }
    const absolutePath = resolve(
      manifestDirectory,
      inputPath
    );
    try {
      await assertContainedPathHasNoSymlink({
        allowedRoot: researchRoot,
        absolutePath
      });
      const observed = await readStableRegularFile(
        absolutePath
      );
      await assertContainedPathHasNoSymlink({
        allowedRoot: researchRoot,
        absolutePath
      });
      if (observed.sha256 !== input.sha256) {
        validationErrors.push(
          `${label}.sha256 does not match ${inputPath}`
        );
        continue;
      }
      absolutePaths.add(absolutePath);
      contentByAbsolutePath.set(
        absolutePath,
        observed.bytes
      );
      records.push({
        path: inputPath,
        repositoryPath: relativeToRepo(
          repoRoot,
          absolutePath
        ),
        sha256: observed.sha256,
        byteSize: observed.byteSize
      });
    } catch (error) {
      validationErrors.push(
        `${label} cannot be content-verified: ${error.code ?? error.message}`
      );
    }
  }
  records.sort((left, right) =>
    left.repositoryPath < right.repositoryPath
      ? -1
      : left.repositoryPath > right.repositoryPath
        ? 1
        : 0
  );
  return {
    validationErrors,
    records,
    absolutePaths,
    contentByAbsolutePath
  };
}

function normalizedPythonRequirement(value) {
  const match = String(value).match(
    /^([A-Za-z0-9][A-Za-z0-9._-]*)==([^\s]+)$/
  );
  if (!match) return null;
  return {
    name: match[1]
      .toLowerCase()
      .replaceAll(/[-_.]+/g, "-"),
    requirement: `${match[1]}==${match[2]}`,
    version: match[2]
  };
}

export function parsePipHashLock(bytes) {
  let text;
  try {
    text =
      typeof bytes === "string"
        ? bytes
        : new TextDecoder("utf-8", {
            fatal: true
          }).decode(bytes);
  } catch {
    throw new Error(
      "BUILD_DEPENDENCY_LOCK_UTF8_INVALID"
    );
  }
  const lockedArtifacts = [];
  for (const [index, rawLine] of text
    .replaceAll("\r\n", "\n")
    .replaceAll("\r", "\n")
    .split("\n")
    .entries()) {
    const line = rawLine.trim();
    if (!line || line.startsWith("#")) continue;
    const match = line.match(
      /^([A-Za-z0-9][A-Za-z0-9._-]*==[^\s]+)\s+--hash=sha256:([a-f0-9]{64})$/
    );
    const requirement = normalizedPythonRequirement(
      match?.[1]
    );
    if (!match || !requirement) {
      throw new Error(
        `BUILD_DEPENDENCY_LOCK_LINE_INVALID: ${index + 1}`
      );
    }
    lockedArtifacts.push({
      ...requirement,
      sha256: match[2]
    });
  }
  if (
    lockedArtifacts.length === 0 ||
    new Set(
      lockedArtifacts.map((entry) => entry.name)
    ).size !== lockedArtifacts.length ||
    new Set(
      lockedArtifacts.map((entry) => entry.sha256)
    ).size !== lockedArtifacts.length
  ) {
    throw new Error(
      "BUILD_DEPENDENCY_LOCK_PACKAGE_SET_INVALID"
    );
  }
  return lockedArtifacts;
}

function verifiedPipHashLockEvidence({
  manifest,
  manifestDirectory,
  buildInputs
}) {
  const dependencies = manifest.dependencies;
  if (dependencies?.lockFormat == null) return null;
  const lockPath = canonicalManifestInputPath(
    dependencies.lockPath
  );
  if (
    dependencies.lockFormat !==
      "pip-require-hashes-linux-arm64-wheels" ||
    !lockPath
  ) {
    throw new Error(
      "BUILD_DEPENDENCY_LOCK_DECLARATION_INVALID"
    );
  }
  const absolutePath = resolve(
    manifestDirectory,
    lockPath
  );
  const inputRecord = buildInputs.records.find(
    (record) => record.path === lockPath
  );
  const bytes =
    buildInputs.contentByAbsolutePath.get(absolutePath);
  if (
    !inputRecord ||
    !bytes ||
    dependencies.lockSha256 !== inputRecord.sha256
  ) {
    throw new Error(
      "BUILD_DEPENDENCY_LOCK_CONTENT_BINDING_INVALID"
    );
  }
  const lockedArtifacts = parsePipHashLock(bytes);
  const requirementKeys = lockedArtifacts.map(
    (entry) => entry.name
  );
  const lockedHashes = lockedArtifacts.map(
    (entry) => entry.sha256
  );
  if (
    new Set(requirementKeys).size !==
      lockedArtifacts.length ||
    new Set(lockedHashes).size !== lockedArtifacts.length ||
    dependencies.packageCount !== lockedArtifacts.length ||
    !Array.isArray(dependencies.packages) ||
    dependencies.packages.length !==
      lockedArtifacts.length ||
    dependencies.packages.some(
      (entry, index) =>
        entry !== lockedArtifacts[index].requirement
    )
  ) {
    throw new Error(
      "BUILD_DEPENDENCY_LOCK_PACKAGE_SET_INVALID"
    );
  }
  return {
    status: "VERIFIED_EXACT_PIP_HASH_LOCK",
    lockFormat: dependencies.lockFormat,
    path: lockPath,
    repositoryPath: inputRecord.repositoryPath,
    sha256: inputRecord.sha256,
    packageCount: lockedArtifacts.length,
    lockedArtifacts,
    lockedArtifactSetSha256:
      sha256CanonicalJson(lockedArtifacts)
  };
}

function validateBuildContextProvenance(manifest) {
  const context = manifest.buildContextProvenance;
  const errors = [];
  if (
    context?.status ===
    "UNCOMMITTED_HISTORICAL_BUILD_CONTEXT"
  ) {
    if (context.historicalRepositoryCommit !== null) {
      errors.push(
        "buildContextProvenance.historicalRepositoryCommit must be null for an uncommitted historical context"
      );
    }
    if (
      context.contentIdentityStatus !==
      "POST_HOC_EXACT_FILE_HASHES"
    ) {
      errors.push(
        "buildContextProvenance.contentIdentityStatus must identify post-hoc exact file hashes"
      );
    }
    if (
      context.recordedImageBuildContextAttested !== false
    ) {
      errors.push(
        "buildContextProvenance must not attest that an uncommitted historical context produced the recorded image"
      );
    }
  } else {
    errors.push(
      "buildContextProvenance.status must preserve the uncommitted historical build-context boundary; committed replay evidence belongs in the external post-hoc receipt"
    );
  }
  if (
    typeof context?.note !== "string" ||
    !context.note.trim()
  ) {
    errors.push(
      "buildContextProvenance.note must explain the evidence boundary"
    );
  }
  return errors;
}

async function validateLocalBuildManifest(
  manifest,
  spec,
  repoRoot
) {
  if (!manifest || typeof manifest !== "object" || Array.isArray(manifest)) {
    return {
      status: "INVALID",
      blocker: "The build manifest root must be an object."
    };
  }
  if (manifest.verification?.status !== "PASS") {
    return {
      status: "UNVERIFIED",
      blocker:
        "The build manifest does not record a passing local verification."
    };
  }

  const taggedImage = parseTaggedImageReference(
    manifest.image?.repositoryTag
  );
  const validationErrors = [];
  const provenance =
    normalizedContainerProvenance(manifest, spec);
  validationErrors.push(...provenance.validationErrors);
  if (manifest.schemaVersion !== 1) {
    validationErrors.push("schemaVersion must equal 1");
  }
  if (
    !taggedImage ||
    taggedImage.repository !== spec.localRepositoryName
  ) {
    validationErrors.push(
      `image.repositoryTag must name ${spec.localRepositoryName} with an explicit tag`
    );
  }
  if (!SHA256_IDENTIFIER_PATTERN.test(manifest.image?.localImageId)) {
    validationErrors.push(
      "image.localImageId must be a SHA-256 identifier"
    );
  }
  if (
    typeof manifest.image?.targetPlatform !== "string" ||
    !/^linux\/(?:amd64|arm64)$/.test(manifest.image.targetPlatform)
  ) {
    validationErrors.push(
      "image.targetPlatform must be linux/amd64 or linux/arm64"
    );
  }
  if (
    manifest.verification?.architecture !==
    manifest.image?.targetPlatform
  ) {
    validationErrors.push(
      "verification.architecture must match image.targetPlatform"
    );
  }
  if (!isIsoTimestamp(manifest.verification?.verifiedAt)) {
    validationErrors.push(
      "verification.verifiedAt must be an ISO-compatible timestamp"
    );
  }
  if (manifest.verification?.fixtureHashesVerified !== true) {
    validationErrors.push(
      "verification.fixtureHashesVerified must be true"
    );
  }
  if (manifest.verification?.licenseHashVerified !== true) {
    validationErrors.push(
      "verification.licenseHashVerified must be true"
    );
  }
  if (
    ![
      "COMPLETED_AND_LOCAL_IMAGE_VERIFIED",
      "COMPLETED_AND_EXACT_IMAGE_VERIFIED"
    ].includes(manifest.build?.status)
  ) {
    validationErrors.push(
      "build.status must record completed local or exact-image verification"
    );
  }
  if (!isIsoTimestamp(manifest.build?.builtAt)) {
    validationErrors.push(
      "build.builtAt must be an ISO-compatible timestamp"
    );
  }
  if (
    manifest.build?.builtAtEvidence?.kind !==
      "LOCAL_IMAGE_CONFIG_CREATED" ||
    manifest.build?.builtAtEvidence?.imageId !==
      manifest.image?.localImageId ||
    manifest.build?.builtAtEvidence?.inspectionField !==
      ".Created"
  ) {
    validationErrors.push(
      "build.builtAtEvidence must bind builtAt to the exact local image Config.Created field"
    );
  }
  if (
    typeof manifest.build?.historicalInvocationCaptured !==
    "boolean"
  ) {
    validationErrors.push(
      "build.historicalInvocationCaptured must be explicit"
    );
  }
  if (
    typeof manifest.build?.commandSemantics !== "string" ||
    !manifest.build.commandSemantics.trim()
  ) {
    validationErrors.push(
      "build.commandSemantics must explain the command evidence"
    );
  }
  if (
    typeof manifest.build?.reproductionCommand !== "string" ||
    !manifest.build.reproductionCommand.trim()
  ) {
    validationErrors.push(
      "build.reproductionCommand must be recorded"
    );
  }
  const buildArguments = manifest.build?.arguments;
  if (
    !buildArguments ||
    typeof buildArguments !== "object" ||
    Array.isArray(buildArguments) ||
    Object.keys(buildArguments).length === 0 ||
    Object.values(buildArguments).some(
      (value) =>
        typeof value !== "string" || value.length === 0
    )
  ) {
    validationErrors.push(
      "build.arguments must record the pinned non-empty build arguments"
    );
  }
  if (
    manifest.build?.statusEvidence?.localImageId !==
      manifest.image?.localImageId ||
    manifest.build?.statusEvidence?.runtimeVerificationStatus !==
      "PASS" ||
    (manifest.ecr != null &&
      manifest.build?.status !==
        "COMPLETED_AND_EXACT_IMAGE_VERIFIED") ||
    (manifest.build?.status ===
      "COMPLETED_AND_EXACT_IMAGE_VERIFIED"
      ? manifest.build?.statusEvidence?.ecrImageDigest !==
        manifest.ecr?.imageDigest
      : manifest.build?.statusEvidence?.ecrImageDigest !==
        null)
  ) {
    validationErrors.push(
      "build.statusEvidence must bind the local image, ECR digest, and passing runtime verification"
    );
  }
  if (
    typeof manifest.runtime?.verificationCommand !== "string" ||
    !manifest.runtime.verificationCommand.trim()
  ) {
    validationErrors.push(
      "runtime.verificationCommand must be recorded"
    );
  }
  if (
    !Array.isArray(manifest.image?.localRepoDigests) ||
    manifest.image.localRepoDigests.length === 0 ||
    manifest.image.localRepoDigests.some(
      (digest) =>
        typeof digest !== "string" ||
        !digest.startsWith(`${spec.localRepositoryName}@`) ||
        !SHA256_IDENTIFIER_PATTERN.test(
          digest.slice(digest.indexOf("@") + 1)
        )
    )
  ) {
    validationErrors.push(
      "image.localRepoDigests must contain local SHA-256 repository digests"
    );
  }
  validationErrors.push(
    ...validateBuildContextProvenance(manifest)
  );
  const manifestDirectory = dirname(
    resolve(repoRoot, spec.buildManifestRelativePath)
  );
  const [buildInputs, verificationInputs] =
    await Promise.all([
      validateManifestInputGroup({
        repoRoot,
        manifestDirectory,
        groupName: "buildInputs",
        inputs: manifest.buildInputs
      }),
      validateManifestInputGroup({
        repoRoot,
        manifestDirectory,
        groupName: "verificationInputs",
        inputs: manifest.verificationInputs
      })
    ]);
  validationErrors.push(
    ...buildInputs.validationErrors,
    ...verificationInputs.validationErrors
  );
  let dependencyLockEvidence = null;
  if (buildInputs.validationErrors.length === 0) {
    try {
      dependencyLockEvidence =
        verifiedPipHashLockEvidence({
          manifest,
          manifestDirectory,
          buildInputs
        });
    } catch (error) {
      validationErrors.push(error.message);
    }
  }
  for (const absolutePath of buildInputs.absolutePaths) {
    if (verificationInputs.absolutePaths.has(absolutePath)) {
      validationErrors.push(
        `buildInputs and verificationInputs both declare ${relativeToRepo(repoRoot, absolutePath)}`
      );
    }
  }
  const dockerfilePath = resolve(
    manifestDirectory,
    "Dockerfile"
  );
  if (!buildInputs.absolutePaths.has(dockerfilePath)) {
    validationErrors.push(
      "buildInputs must content-bind Dockerfile"
    );
  }
  const dockerignorePath = resolve(
    manifestDirectory,
    ".dockerignore"
  );
  try {
    const dockerignore = await lstat(dockerignorePath);
    if (
      dockerignore.isFile() &&
      !buildInputs.absolutePaths.has(dockerignorePath)
    ) {
      validationErrors.push(
        "buildInputs must content-bind the active .dockerignore"
      );
    }
  } catch (error) {
    if (error.code !== "ENOENT") throw error;
  }
  for (const verifierRelativePath of
    spec.verifierRelativePaths) {
    const verifierPath = resolve(
      repoRoot,
      verifierRelativePath
    );
    if (!verificationInputs.absolutePaths.has(verifierPath)) {
      validationErrors.push(
        `verificationInputs must content-bind ${verifierRelativePath}`
      );
    }
  }
  const proofEvidencePaths = new Set();
  for (const [index, proofRun] of (
    manifest.proofRuns ?? []
  ).entries()) {
    if (proofRun?.evidencePath == null) continue;
    const evidencePath = canonicalManifestInputPath(
      proofRun.evidencePath
    );
    if (
      !evidencePath ||
      proofEvidencePaths.has(evidencePath) ||
      !/^[a-f0-9]{64}$/.test(
        proofRun.evidenceSha256 ?? ""
      )
    ) {
      validationErrors.push(
        `proofRuns[${index}] must declare one unique canonical evidencePath and exact evidenceSha256`
      );
      continue;
    }
    proofEvidencePaths.add(evidencePath);
    const evidenceAbsolutePath = resolve(
      manifestDirectory,
      evidencePath
    );
    const inputRecord =
      verificationInputs.records.find(
        (record) => record.path === evidencePath
      );
    if (
      !verificationInputs.absolutePaths.has(
        evidenceAbsolutePath
      ) ||
      inputRecord?.sha256 !==
        proofRun.evidenceSha256
    ) {
      validationErrors.push(
        `verificationInputs must content-bind proofRuns[${index}] evidence ${evidencePath}`
      );
    }
  }
  for (const command of [
    manifest.build?.command,
    manifest.build?.reproductionCommand
  ]) {
    const entryPoint =
      typeof command === "string"
        ? command.match(/^node\s+([^\s]+)(?:\s|$)/)?.[1]
        : null;
    if (
      entryPoint?.startsWith(
        "scripts/research/operational-savings/"
      )
    ) {
      const entryPointPath = resolve(repoRoot, entryPoint);
      if (!buildInputs.absolutePaths.has(entryPointPath)) {
        validationErrors.push(
          `buildInputs must content-bind build entry point ${entryPoint}`
        );
      }
    }
  }
  if (validationErrors.length > 0) {
    return {
      status: "INVALID",
      blocker: `The passing build manifest is incomplete: ${validationErrors.join("; ")}.`
    };
  }

  return {
    status: "VERIFIED",
    taggedImage,
    localImage: {
      repositoryTag: manifest.image.repositoryTag,
      imageTag: taggedImage.tag,
      imageId: manifest.image.localImageId,
      repositoryDigests: [...manifest.image.localRepoDigests],
      targetPlatform: manifest.image.targetPlatform,
      verifiedAt: manifest.verification.verifiedAt,
      verificationCommand: manifest.runtime.verificationCommand,
      verificationStatus: "PASS_RECORDED_IN_BUILD_MANIFEST",
      currentDaemonPresenceCheckedByInventory: false
    },
    buildEvidence: {
      status: manifest.build.status,
      builtAt: manifest.build.builtAt,
      builtAtEvidence: structuredClone(
        manifest.build.builtAtEvidence
      ),
      historicalInvocationCaptured:
        manifest.build.historicalInvocationCaptured,
      commandSemantics: manifest.build.commandSemantics,
      reproductionCommand:
        manifest.build.reproductionCommand,
      arguments: structuredClone(manifest.build.arguments),
      statusEvidence: structuredClone(
        manifest.build.statusEvidence
      ),
      buildContextProvenance: structuredClone(
        manifest.buildContextProvenance
      ),
      contentBinding: {
        status: "VERIFIED_EXACT_LOCAL_CONTENT",
        buildInputs: buildInputs.records,
        buildInputSetSha256: sha256CanonicalJson(
          buildInputs.records
        ),
        verificationInputs: verificationInputs.records,
        verificationInputSetSha256: sha256CanonicalJson(
          verificationInputs.records
        ),
        completeInputSetSha256: sha256CanonicalJson({
          buildInputs: buildInputs.records,
          verificationInputs: verificationInputs.records
        })
      },
      dependencyLockEvidence
    },
    provenance: provenance.provenance
  };
}

function readRecordedEcrPublication({
  manifest,
  spec,
  taggedImage
}) {
  const publication = manifest.ecr;
  if (publication == null) {
    return {
      remoteImage: emptyRemoteImage(),
      blocker:
        "No guarded ECR push and remote digest verification is recorded."
    };
  }
  const expectedRepositoryUri =
    `${DESTINATION.accountId}.dkr.ecr.${DESTINATION.region}.amazonaws.com/${spec.repositoryName}`;
  const scan = publication.scan;
  const scanUsesIndexChild =
    publication.imageManifestMediaType ===
    OCI_IMAGE_INDEX_MEDIA_TYPE;
  const validScanBinding = scanUsesIndexChild
    ? SHA256_IDENTIFIER_PATTERN.test(
        scan?.scannedManifestDigest ?? ""
      ) &&
      scan.scannedManifestDigest !== publication.imageDigest
    : scan?.scannedManifestDigest == null ||
      scan.scannedManifestDigest === publication.imageDigest;
  const validScan =
    scan?.status === "COMPLETE" &&
    isIsoTimestamp(scan.completedAt) &&
    ["critical", "high", "medium", "low"].every(
      (severity) =>
        Number.isSafeInteger(scan[severity]) &&
        scan[severity] >= 0
    ) &&
    typeof scan.disposition === "string" &&
    scan.disposition.trim().length > 0 &&
    validScanBinding;
  const valid =
    publication.accountId === DESTINATION.accountId &&
    publication.region === DESTINATION.region &&
    publication.repositoryName === spec.repositoryName &&
    publication.repositoryUri === expectedRepositoryUri &&
    publication.imageTag === taggedImage.tag &&
    SHA256_IDENTIFIER_PATTERN.test(publication.imageDigest) &&
    publication.imageDigest === manifest.image.localImageId &&
    manifest.image.localRepoDigests.includes(
      `${spec.localRepositoryName}@${publication.imageDigest}`
    ) &&
    publication.imageUri ===
      `${expectedRepositoryUri}@${publication.imageDigest}` &&
    Number.isSafeInteger(publication.imageSizeBytes) &&
    publication.imageSizeBytes > 0 &&
    typeof publication.imageManifestMediaType === "string" &&
    publication.imageManifestMediaType.length > 0 &&
    isIsoTimestamp(publication.pushedAt) &&
    isIsoTimestamp(publication.verifiedAt) &&
    typeof publication.verificationCommand === "string" &&
    publication.verificationCommand.trim().length > 0 &&
    publication.verificationStatus === "VERIFIED_EXACT_DIGEST" &&
    publication.exactDigestPulled === true &&
    publication.runtimeVerificationStatus === "PASS" &&
    validScan;
  if (!valid) {
    return {
      remoteImage: {
        ...emptyRemoteImage(),
        pushStatus: "INVALID_PUBLICATION_RECORD",
        verificationStatus: "INVALID_PUBLICATION_RECORD",
        evidenceSource: spec.buildManifestRelativePath
      },
      blocker:
        "The ECR publication record is incomplete or does not match the authorized repository and local image tag."
    };
  }
  return {
    remoteImage: {
      accountId: publication.accountId,
      region: publication.region,
      repositoryName: publication.repositoryName,
      repositoryUri: publication.repositoryUri,
      imageTag: publication.imageTag,
      imageDigest: publication.imageDigest,
      imageUri: publication.imageUri,
      imageSizeBytes: publication.imageSizeBytes,
      imageManifestMediaType: publication.imageManifestMediaType,
      pushedAt: publication.pushedAt,
      verifiedAt: publication.verifiedAt,
      exactDigestPulled: publication.exactDigestPulled,
      runtimeVerificationStatus:
        publication.runtimeVerificationStatus,
      verificationCommand: publication.verificationCommand,
      scan: structuredClone(publication.scan),
      pushStatus: "PUSHED",
      verificationStatus: "VERIFIED_EXACT_DIGEST",
      evidenceSource: spec.buildManifestRelativePath,
      verifiedByInventoryAwsCall: false
    },
    blocker: null
  };
}

async function buildEcrRepositoryInventory(repoRoot, spec) {
  const expectedRepositoryUri =
    `${DESTINATION.accountId}.dkr.ecr.${DESTINATION.region}.amazonaws.com/${spec.repositoryName}`;
  const base = {
    modelId: spec.modelId,
    repositoryName: spec.repositoryName,
    expectedRepositoryUri,
    buildManifest: {
      path: spec.buildManifestRelativePath,
      status: "NOT_FOUND",
      sha256: null,
      schemaVersion: null,
      buildEvidence: null
    },
    provenance: null,
    localImage: localImageState("NO_BUILD_MANIFEST"),
    plannedRemoteImage: {
      repositoryUri: expectedRepositoryUri,
      imageTag: null,
      taggedImageUri: null
    },
    remoteImage: emptyRemoteImage(),
    blocker:
      "No verified local runnable image build manifest is present."
  };

  let source;
  try {
    source = await readFile(
      join(repoRoot, spec.buildManifestRelativePath),
      "utf8"
    );
  } catch (error) {
    if (error.code === "ENOENT") return base;
    throw error;
  }

  base.buildManifest.sha256 = sha256Bytes(source);
  let manifest;
  try {
    manifest = JSON.parse(source);
  } catch {
    base.buildManifest.status = "INVALID";
    base.localImage.verificationStatus = "BUILD_MANIFEST_INVALID";
    base.blocker = "The local container build manifest is not valid JSON.";
    return base;
  }
  base.buildManifest.schemaVersion = manifest?.schemaVersion ?? null;
  const localValidation = await validateLocalBuildManifest(
    manifest,
    spec,
    repoRoot
  );
  base.buildManifest.status = localValidation.status;
  if (localValidation.status !== "VERIFIED") {
    base.localImage.verificationStatus =
      localValidation.status === "UNVERIFIED"
        ? "BUILD_MANIFEST_UNVERIFIED"
        : "BUILD_MANIFEST_INVALID";
    base.blocker = localValidation.blocker;
    return base;
  }

  base.localImage = localValidation.localImage;
  base.buildManifest.buildEvidence =
    localValidation.buildEvidence;
  base.provenance = {
    ...localValidation.provenance,
    buildManifestSha256: base.buildManifest.sha256
  };
  base.plannedRemoteImage.imageTag =
    localValidation.localImage.imageTag;
  base.plannedRemoteImage.taggedImageUri =
    `${expectedRepositoryUri}:${localValidation.localImage.imageTag}`;
  const publication = readRecordedEcrPublication({
    manifest,
    spec,
    taggedImage: localValidation.taggedImage
  });
  base.remoteImage = publication.remoteImage;
  base.blocker = publication.blocker;
  return base;
}

export async function buildResearchEcrInventory({
  repoRoot = DEFAULT_REPO_ROOT
} = {}) {
  const repositories = await Promise.all(
    DESTINATION.ecrRepositories.map((spec) =>
      buildEcrRepositoryInventory(repoRoot, spec)
    )
  );
  const historicalBuildManifestPassCount =
    repositories.filter(
      (entry) =>
        entry.localImage.verificationStatus ===
        "PASS_RECORDED_IN_BUILD_MANIFEST"
    ).length;
  const postHocReplayReceipt =
    await loadPostHocReplayReceipt({
      repoRoot,
      repositories
    });
  const postHocReplayPassed =
    postHocReplayReceipt.status ===
    "PASS_COMMITTED_POST_HOC_REPLAY";
  for (const repository of repositories) {
    if (
      repository.localImage.verificationStatus !==
      "PASS_RECORDED_IN_BUILD_MANIFEST"
    ) {
      continue;
    }
    repository.localImage.verificationStatus =
      postHocReplayPassed
        ? "PASS_COMMITTED_POST_HOC_REPLAY"
        : "HISTORICAL_PASS_RECORDED_CURRENT_CONTEXT_UNATTESTED";
  }
  const locallyVerifiedImageCount = repositories.filter(
    (entry) =>
      entry.localImage.verificationStatus ===
      "PASS_COMMITTED_POST_HOC_REPLAY"
  ).length;
  const remotelyVerifiedImageCount = repositories.filter(
    (entry) =>
      entry.remoteImage.verificationStatus ===
      "VERIFIED_EXACT_DIGEST"
  ).length;
  let blocker;
  if (historicalBuildManifestPassCount === 0) {
    blocker =
      "No content-verified historical runnable container build manifest is recorded, so there is no image eligible for a post-hoc replay or guarded ECR push.";
  } else if (
    postHocReplayReceipt.status !==
    "PASS_COMMITTED_POST_HOC_REPLAY"
  ) {
    blocker =
      `${historicalBuildManifestPassCount} historical passing build ${historicalBuildManifestPassCount === 1 ? "manifest is" : "manifests are"} recorded, but the current exact input context has no committed passing post-hoc four-model replay receipt. Receipt status: ${postHocReplayReceipt.status}. ${postHocReplayReceipt.blocker ?? ""}`.trim();
  } else if (locallyVerifiedImageCount === 0) {
    blocker =
      "No current committed post-hoc replay of a runnable local container is recorded, so there is no image ready for a guarded ECR push.";
  } else if (remotelyVerifiedImageCount < locallyVerifiedImageCount) {
    const pendingCount =
      locallyVerifiedImageCount - remotelyVerifiedImageCount;
    blocker =
      `${pendingCount} locally verified runnable container ${pendingCount === 1 ? "image has" : "images have"} no recorded, exact-digest-verified ECR publication.`;
  } else {
    blocker = repositories.some(
      (entry) =>
        entry.localImage.verificationStatus !==
        "PASS_COMMITTED_POST_HOC_REPLAY"
    )
      ? "Verified ECR publications are recorded for every locally verified image, but one or more configured model repositories still have no verified local build."
      : null;
  }
  return {
    accountId: DESTINATION.accountId,
    region: DESTINATION.region,
    repositories,
    postHocReplayReceipt,
    historicalBuildManifestPassCount,
    locallyVerifiedImageCount,
    remotelyVerifiedImageCount,
    runnableContainerBuilt:
      locallyVerifiedImageCount > 0,
    localImagePresenceCheckedByInventory: false,
    remoteStateCheckedByInventory: false,
    blocker
  };
}

export function canonicalJson(value) {
  if (Array.isArray(value)) {
    return `[${value.map((item) => canonicalJson(item)).join(",")}]`;
  }
  if (value && typeof value === "object") {
    return `{${Object.keys(value)
      .sort()
      .map(
        (key) =>
          `${JSON.stringify(key)}:${canonicalJson(value[key])}`
      )
      .join(",")}}`;
  }
  return JSON.stringify(value);
}

export function sha256CanonicalJson(value) {
  return sha256Bytes(canonicalJson(value));
}

function canonicalOriginalLocalArtifactIdentity(
  artifact
) {
  return {
    path: artifact.path,
    relation: artifact.relation,
    expectedSizeBytes:
      artifact.expectedSizeBytes ?? null,
    expectedSha256:
      artifact.expectedSha256 ?? null,
    canonicalPackageId:
      artifact.canonicalPackageId ?? null,
    canonicalLocalPath:
      artifact.canonicalLocalPath ?? null,
    plannedS3Uri: artifact.plannedS3Uri ?? null
  };
}

function canonicalOriginalLocalArtifacts(artifacts) {
  return [...(artifacts ?? [])]
    .sort((left, right) =>
      `${left.path}\u0000${left.relation}`.localeCompare(
        `${right.path}\u0000${right.relation}`
      )
    )
    .map(canonicalOriginalLocalArtifactIdentity);
}

function canonicalPackageInventoryIdentity(packageRecord) {
  const repositoryPackage =
    packageRecord.packageType ===
    "PINNED_GIT_REPOSITORY";
  return {
    packageId: packageRecord.packageId,
    packageType: packageRecord.packageType,
    localPath: packageRecord.localPath,
    parentPackageId:
      packageRecord.parentPackageId ?? null,
    localRetentionPolicy:
      packageRecord.localRetentionPolicy,
    coverage: packageRecord.coverage,
    fingerprint: packageRecord.fingerprint,
    sourceOrganization:
      packageRecord.sourceOrganization,
    acquisitionTimestamp:
      packageRecord.acquisitionTimestamp,
    source: packageRecord.source,
    release: packageRecord.release,
    acquisition: packageRecord.acquisition,
    content: packageRecord.content,
    license: packageRecord.license,
    ingestion: packageRecord.ingestion,
    reproducibility:
      packageRecord.reproducibility,
    repositoryIdentity:
      packageRecord.repositoryIdentity ?? null,
    embeddedMember:
      packageRecord.embeddedMember ?? null,
    originalLocalArtifacts:
      canonicalOriginalLocalArtifacts(
        packageRecord.originalLocalArtifacts
      ),
    plannedObject: {
      key: packageRecord.plannedObject?.key,
      contentType:
        packageRecord.plannedObject?.contentType,
      expectedSizeBytes: repositoryPackage
        ? null
        : packageRecord.plannedObject
            ?.expectedSizeBytes,
      expectedSha256: repositoryPackage
        ? null
        : packageRecord.plannedObject
            ?.expectedSha256,
      repositoryArchiveIdentity: repositoryPackage
        ? {
            format:
              packageRecord.plannedObject?.archivePlan
                ?.format,
            sourceCommit:
              packageRecord.plannedObject?.archivePlan
                ?.sourceCommit,
            sourceTree:
              packageRecord.plannedObject?.archivePlan
                ?.sourceTree,
            deterministicIdentity:
              packageRecord.plannedObject?.archivePlan
                ?.deterministicIdentity,
            outputFileName:
              packageRecord.plannedObject?.archivePlan
                ?.outputFileName
          }
        : null
    }
  };
}

export function canonicalInventoryContent(manifest) {
  return {
    schemaVersion:
      "operational-savings/canonical-inventory-content-v1",
    cacheRoot:
      manifest.sourceRepository?.cacheRoot ?? null,
    packages: [...(manifest.packages ?? [])]
      .sort((left, right) =>
        left.packageId.localeCompare(
          right.packageId
        )
      )
      .map(canonicalPackageInventoryIdentity),
    originalLocalArtifacts:
      canonicalOriginalLocalArtifacts(
        manifest.originalLocalArtifacts
      ),
    localArtifactAudit: {
      sourcePath:
        manifest.localArtifactAudit?.sourcePath ?? null,
      sourceSha256:
        manifest.localArtifactAudit?.sourceSha256 ?? null
    }
  };
}

export function canonicalInventoryContentSha256(manifest) {
  return sha256CanonicalJson(
    JSON.parse(
      JSON.stringify(
        canonicalInventoryContent(manifest)
      )
    )
  );
}

export function assertCanonicalInventoryIdentity(
  manifest
) {
  const identity = manifest.canonicalInventory;
  const observedSha256 =
    canonicalInventoryContentSha256(manifest);
  if (
    identity?.schemaVersion !==
      "operational-savings/canonical-inventory-identity-v1" ||
    identity.packageCount !==
      manifest.packages?.length ||
    !/^[a-f0-9]{64}$/.test(
      identity.contentSha256 ?? ""
    ) ||
    identity.contentSha256 !== observedSha256
  ) {
    throw new Error(
      "CANONICAL_INVENTORY_IDENTITY_MISMATCH: regenerate the migration inventory before execution"
    );
  }
  return identity;
}

export function assertCanonicalInventoriesMatch({
  manifest,
  currentInventory
}) {
  const expected =
    assertCanonicalInventoryIdentity(manifest);
  const current =
    assertCanonicalInventoryIdentity(
      currentInventory
    );
  if (
    expected.contentSha256 !== current.contentSha256 ||
    expected.packageCount !== current.packageCount
  ) {
    throw new Error(
      `CANONICAL_INVENTORY_STALE: expected ${expected.packageCount} packages at ${expected.contentSha256}, observed ${current.packageCount} packages at ${current.contentSha256}`
    );
  }
  return {
    status: "VERIFIED_CURRENT",
    schemaVersion:
      "operational-savings/canonical-inventory-freshness-v1",
    packageCount: expected.packageCount,
    contentSha256: expected.contentSha256,
    localArtifactAuditSourceSha256:
      manifest.localArtifactAudit?.sourceSha256 ??
      null
  };
}

export async function sha256Path(path) {
  const details = await lstat(path);
  if (details.isSymbolicLink()) {
    return sha256Bytes(`symlink\u0000${await readlink(path)}`);
  }
  if (!details.isFile()) {
    throw new Error(`CONTENT_NOT_HASHABLE: ${path}`);
  }
  const hash = createHash("sha256");
  for await (const chunk of createReadStream(path)) {
    hash.update(chunk);
  }
  return hash.digest("hex");
}

function posixPath(value) {
  return value.split(sep).join("/");
}

function relativeToRepo(repoRoot, absolutePath) {
  const candidate = relative(repoRoot, absolutePath);
  if (candidate === ".." || candidate.startsWith(`..${sep}`)) {
    throw new Error(`PATH_OUTSIDE_REPOSITORY: ${absolutePath}`);
  }
  return posixPath(candidate);
}

async function walkFiles(root) {
  const output = [];
  async function walk(directory) {
    const entries = await readdir(directory, { withFileTypes: true });
    entries.sort((left, right) => left.name.localeCompare(right.name));
    for (const entry of entries) {
      const path = join(directory, entry.name);
      const details = await lstat(path);
      if (entry.isDirectory()) {
        await walk(path);
        continue;
      }
      output.push({
        absolutePath: path,
        relativePath: posixPath(relative(root, path)),
        entryType: entry.isSymbolicLink()
          ? "SYMLINK"
          : entry.isFile()
            ? "FILE"
            : "OTHER",
        sizeBytes: details.size,
        modifiedAt: details.mtime.toISOString()
      });
    }
  }
  await walk(root);
  return output;
}

function summarizeEntries(entries) {
  return {
    fileCount: entries.length,
    totalSizeBytes: entries.reduce(
      (total, entry) => total + entry.sizeBytes,
      0
    ),
    symbolicLinkCount: entries.filter(
      (entry) => entry.entryType === "SYMLINK"
    ).length,
    otherEntryCount: entries.filter(
      (entry) => entry.entryType === "OTHER"
    ).length
  };
}

function normalizeCachePath(repoRoot, value) {
  if (typeof value !== "string" || !value.trim()) return null;
  let candidate = value.trim();
  if (candidate.startsWith(".cache/")) {
    candidate = `scripts/research/operational-savings/${candidate}`;
  }
  const absolute = resolve(repoRoot, candidate);
  const relativeCandidate = relative(repoRoot, absolute);
  if (
    isAbsolute(relativeCandidate) ||
    relativeCandidate === ".." ||
    relativeCandidate.startsWith(`..${sep}`)
  ) {
    return null;
  }
  const relativePath = posixPath(relativeCandidate);
  if (
    relativePath !== CACHE_RELATIVE_PATH &&
    !relativePath.startsWith(`${CACHE_RELATIVE_PATH}/`)
  ) {
    return null;
  }
  return relativePath;
}

function sourceOrganizationFromRepository(value) {
  const source =
    value.repository ?? value.sourceUrl ?? value.archiveUrl ?? null;
  if (typeof source !== "string") return null;
  try {
    const url = new URL(source);
    if (url.hostname !== "github.com") return null;
    const owner = url.pathname.split("/").filter(Boolean)[0];
    return (
      {
        google: "Google",
        NatLabRockies: "National Laboratory of the Rockies"
      }[owner] ?? owner ?? null
    );
  } catch {
    return null;
  }
}

function structuredLicenseContext(value) {
  if (value.licenseContext != null) return value.licenseContext;
  const license = value.license;
  if (!license || typeof license !== "object") return null;
  const parts = [];
  if (license.spdxId) parts.push(`SPDX ${license.spdxId}`);
  if (license.spdxExpression) {
    parts.push(`SPDX ${license.spdxExpression}`);
  }
  if (license.archivePath) {
    parts.push(`archive path ${license.archivePath}`);
  }
  if (license.file) parts.push(`file ${license.file}`);
  if (license.sha256) parts.push(`SHA-256 ${license.sha256}`);
  if (license.fileSha256) {
    parts.push(`file SHA-256 ${license.fileSha256}`);
  }
  return parts.length ? parts.join("; ") : null;
}

function artifactRecord({
  repoRoot,
  manifestPath,
  manifest,
  value
}) {
  const path = normalizeCachePath(
    repoRoot,
    value.cachePath ?? value.path
  );
  if (!path) return null;
  const commitSha =
    value.commitSha ??
    value.repositoryCommit ??
    value.commit ??
    value.source?.commitSha ??
    value.source?.repositoryCommit ??
    value.source?.commit ??
    null;
  return {
    path,
    standardId: value.standardId ?? manifest.standardId ?? null,
    processKey: value.processKey ?? manifest.processKey ?? null,
    manifestPath,
    adapterPath: value.adapterPath ?? manifest.adapterPath ?? null,
    artifactId: value.artifactId ?? null,
    sourceUrl:
      value.sourceUrl ??
      value.archiveUrl ??
      value.repository ??
      value.source ??
      null,
    release:
      value.release ??
      value.version ??
      (commitSha
        ? `Git commit ${commitSha}`
        : null),
    commitSha,
    acquisitionMode:
      value.acquisitionMode ?? manifest.acquisitionMode ?? null,
    acquisitionTimestamp:
      value.acquisitionTimestamp ??
      value.acquiredAt ??
      value.downloadedAt ??
      value.fetchedAt ??
      value.retrievedAt ??
      manifest.acquisitionTimestamp ??
      manifest.acquiredAt ??
      manifest.downloadedAt ??
      null,
    sourceOrganization:
      value.sourceOrganization ??
      value.organization ??
      manifest.sourceOrganization ??
      manifest.organization ??
      sourceOrganizationFromRepository(value) ??
      null,
    declaredSha256:
      value.sha256 ?? value.archiveSha256 ?? null,
    declaredSizeBytes:
      value.sizeBytes ??
      value.byteSize ??
      value.archiveSizeBytes ??
      null,
    licenseContext: structuredLicenseContext(value),
    role: value.role ?? null,
    field: value.field ?? null,
    official: value.official ?? null,
    ...(value.originalLocalPath
      ? { originalLocalPath: value.originalLocalPath }
      : {})
  };
}

async function collectArtifactGroupReferences({
  repoRoot,
  manifestPath,
  groups
}) {
  const records = [];
  for (const group of groups ?? []) {
    const cacheDirectory = normalizeCachePath(
      repoRoot,
      group.cacheDirectory
    );
    if (!cacheDirectory) {
      throw new Error(
        `ARTIFACT_GROUP_CACHE_DIRECTORY_INVALID: ${group.artifactIdPrefix ?? "unknown"}`
      );
    }
    const entries = (
      await readdir(join(repoRoot, cacheDirectory), {
        withFileTypes: true
      })
    ).sort((left, right) =>
      left.name.localeCompare(right.name)
    );
    if (
      entries.some(
        (entry) => !entry.isFile() || entry.isSymbolicLink()
      )
    ) {
      throw new Error(
        `ARTIFACT_GROUP_REGULAR_FILES_REQUIRED: ${cacheDirectory}`
      );
    }
    if (
      !Number.isSafeInteger(group.expectedFileCount) ||
      entries.length !== group.expectedFileCount
    ) {
      throw new Error(
        `ARTIFACT_GROUP_FILE_COUNT_MISMATCH: ${cacheDirectory}: expected ${group.expectedFileCount}, found ${entries.length}`
      );
    }
    let lockedHashes = null;
    if (group.hashLockPath) {
      const lock = await readFile(
        join(repoRoot, group.hashLockPath),
        "utf8"
      );
      lockedHashes = new Set(
        [...lock.matchAll(/sha256:([a-f0-9]{64})/g)].map(
          (match) => match[1]
        )
      );
      if (lockedHashes.size !== entries.length) {
        throw new Error(
          `ARTIFACT_GROUP_HASH_LOCK_COUNT_MISMATCH: ${group.hashLockPath}`
        );
      }
    }
    for (const entry of entries) {
      const cachePath = `${cacheDirectory}/${entry.name}`;
      const absolutePath = join(repoRoot, cachePath);
      const details = await lstat(absolutePath);
      const digest = await sha256Path(absolutePath);
      if (lockedHashes && !lockedHashes.has(digest)) {
        throw new Error(
          `ARTIFACT_GROUP_HASH_NOT_LOCKED: ${cachePath}: ${digest}`
        );
      }
      const record = artifactRecord({
        repoRoot,
        manifestPath,
        manifest: group,
        value: {
          ...group,
          artifactId: `${group.artifactIdPrefix}:${entry.name}`,
          cachePath,
          release: `${group.release}: ${entry.name}`,
          sha256: lockedHashes ? digest : null,
          sizeBytes: lockedHashes ? details.size : null,
          originalLocalPath: group.originalLocalDirectory
            ? `${group.originalLocalDirectory}/${entry.name}`
            : null
        }
      });
      if (!record) {
        throw new Error(
          `ARTIFACT_GROUP_RECORD_INVALID: ${cachePath}`
        );
      }
      records.push(record);
    }
  }
  return records;
}

function collectCacheObjects({
  repoRoot,
  manifestPath,
  manifest
}) {
  const records = [];
  const seenObjects = new Set();
  function visit(value) {
    if (!value || typeof value !== "object") return;
    if (seenObjects.has(value)) return;
    seenObjects.add(value);
    if (!Array.isArray(value)) {
      const record = artifactRecord({
        repoRoot,
        manifestPath,
        manifest,
        value
      });
      if (record) records.push(record);
    }
    for (const child of Object.values(value)) visit(child);
  }
  visit(manifest);
  return records;
}

export async function loadProofReferences(repoRoot) {
  const adaptersRoot = join(
    repoRoot,
    "scripts/research/operational-savings/adapters"
  );
  const references = [];
  const adapterDirectories = (
    await readdir(adaptersRoot, { withFileTypes: true })
  )
    .filter((entry) => entry.isDirectory())
    .sort((left, right) => left.name.localeCompare(right.name));
  for (const directory of adapterDirectories) {
    for (const fileName of ["proof.json", "process-proof.json"]) {
      const absolutePath = join(adaptersRoot, directory.name, fileName);
      let source;
      try {
        source = await readFile(absolutePath, "utf8");
      } catch (error) {
        if (error.code === "ENOENT") continue;
        throw error;
      }
      const manifest = JSON.parse(source);
      const manifestPath = relativeToRepo(repoRoot, absolutePath);
      references.push(
        ...collectCacheObjects({
          repoRoot,
          manifestPath,
          manifest
        })
      );
    }
  }

  const supplementPath = join(
    repoRoot,
    ARTIFACT_METADATA_SUPPLEMENT_RELATIVE_PATH
  );
  const supplement = JSON.parse(
    await readFile(supplementPath, "utf8")
  );
  if (
    supplement.schemaVersion !==
      "operational-savings/research-artifact-metadata-supplement-v1" ||
    !Array.isArray(supplement.artifacts)
  ) {
    throw new Error(
      "ARTIFACT_METADATA_SUPPLEMENT_SCHEMA_INVALID"
    );
  }
  references.push(
    ...collectCacheObjects({
      repoRoot,
      manifestPath:
        ARTIFACT_METADATA_SUPPLEMENT_RELATIVE_PATH,
      manifest: supplement
    })
  );
  references.push(
    ...(await collectArtifactGroupReferences({
      repoRoot,
      manifestPath:
        ARTIFACT_METADATA_SUPPLEMENT_RELATIVE_PATH,
      groups: supplement.artifactGroups
    }))
  );

  for (const spec of DESTINATION.ecrRepositories) {
    const absolutePath = join(
      repoRoot,
      spec.buildManifestRelativePath
    );
    let source;
    try {
      source = await readFile(absolutePath, "utf8");
    } catch (error) {
      if (error.code === "ENOENT") continue;
      throw error;
    }
    let manifest;
    try {
      manifest = JSON.parse(source);
    } catch {
      continue;
    }
    if (
      (
        await validateLocalBuildManifest(
          manifest,
          spec,
          repoRoot
        )
      ).status !== "VERIFIED"
    ) {
      continue;
    }
    const manifestPath = relativeToRepo(repoRoot, absolutePath);
    const containerRecords = collectCacheObjects({
      repoRoot,
      manifestPath,
      manifest: {
        ...manifest,
        acquisitionMode:
          "PINNED_VERIFIED_CONTAINER_BUILD_DEPENDENCY"
      }
    });
    for (const record of containerRecords) {
      record.artifactId ??=
        `container-build:${spec.modelId}:${basename(record.path)}`;
      record.role ??= "CONTAINER_BUILD_DEPENDENCY";
      record.official ??= true;
    }
    references.push(...containerRecords);
  }

  const reoptRoot =
    `${CACHE_RELATIVE_PATH}/repos/reopt`;
  for (const [role, file] of Object.entries(REOPT_FILES)) {
    references.push({
      path: `${reoptRoot}/${file.path}`,
      standardId: "STD-REOPT-LOCAL-DISPATCH",
      processKey: "reopt_local_dispatch",
      manifestPath:
        "scripts/research/operational-savings/adapters/reopt/inspect-schema.mjs",
      adapterPath:
        "scripts/research/operational-savings/adapters/reopt/run.mjs",
      artifactId: `proof-critical:reopt:${role}`,
      sourceUrl:
        "https://github.com/NatLabRockies/REopt.jl",
      release:
        "Git commit f952cabdf3e60f6e88eef80bb7bc9e7e24bac643",
      commitSha:
        "f952cabdf3e60f6e88eef80bb7bc9e7e24bac643",
      acquisitionMode: "PINNED_REPOSITORY_FILE",
      acquisitionTimestamp: null,
      sourceOrganization: "National Laboratory of the Rockies",
      declaredSha256: file.sha256,
      declaredSizeBytes: null,
      licenseContext: null,
      role,
      field: null,
      official: true
    });
  }
  return references;
}

export function inheritedAuditRecord(group, record) {
  const mappedFileName =
    group.canonicalMappingRule &&
    record.originalPath?.startsWith(
      group.canonicalMappingRule.sourcePrefix
    )
      ? basename(record.originalPath)
      : null;
  const watersenseRenderDirectory =
    record.originalPath?.startsWith(
      "/private/tmp/ws-toilet-pages/"
    )
      ? "watersense-toilet-pages"
      : record.originalPath?.startsWith(
            "/private/tmp/ws-urinal-pages/"
          )
        ? "watersense-urinal-pages"
        : null;
  const mappedCanonicalCachePath = mappedFileName
    ? `${group.canonicalMappingRule.canonicalCachePrefix}${mappedFileName}`
    : watersenseRenderDirectory
      ? `${CACHE_RELATIVE_PATH}/model-support/inspection/${watersenseRenderDirectory}/${basename(record.originalPath)}`
      : null;
  const mappedCanonicalPackageId = mappedFileName
    ? `${group.canonicalMappingRule.packageIdPrefix}${mappedFileName}`
    : watersenseRenderDirectory
      ? `cache-file:model-support/inspection/${watersenseRenderDirectory}/${basename(record.originalPath)}`
      : null;
  return {
    groupId: group.groupId,
    originalPath: record.originalPath,
    artifactType: record.artifactType ?? group.artifactType,
    disposition: record.disposition ?? group.disposition,
    canonicalCachePath:
      record.canonicalCachePath ??
      mappedCanonicalCachePath ??
      group.canonicalCachePath ??
      null,
    canonicalPackageLinkage:
      record.canonicalPackageLinkage ??
      mappedCanonicalPackageId ??
      group.canonicalPackageLinkage ??
      null,
    cleanupPrerequisite:
      record.cleanupPrerequisite ??
      group.cleanupPrerequisite,
    cleanupReason:
      record.cleanupReason ??
      record.preciseReason ??
      group.cleanupReason,
    cleanupStatus:
      record.cleanupStatus ?? group.cleanupStatus,
    ...record
  };
}

export async function loadLocalArtifactAudit({
  repoRoot,
  originalLocalArtifacts
}) {
  const path = join(
    repoRoot,
    LOCAL_ARTIFACT_AUDIT_RELATIVE_PATH
  );
  const source = await readFile(path, "utf8");
  const audit = JSON.parse(source);
  if (
    audit.schemaVersion !==
      "operational-savings/research-local-artifact-audit-v1" ||
    !Array.isArray(audit.artifactGroups) ||
    !Array.isArray(audit.allowedDispositions)
  ) {
    throw new Error("LOCAL_ARTIFACT_AUDIT_SCHEMA_INVALID");
  }
  const allowedDispositions = new Set(
    audit.allowedDispositions
  );
  const groupIds = audit.artifactGroups.map(
    (group) => group.groupId
  );
  if (
    groupIds.some(
      (groupId) =>
        typeof groupId !== "string" || !groupId.trim()
    ) ||
    new Set(groupIds).size !== groupIds.length
  ) {
    throw new Error(
      "LOCAL_ARTIFACT_AUDIT_GROUP_IDENTITIES_INVALID"
    );
  }
  const childFiles = [];
  const directoryEntries = [];
  for (const group of audit.artifactGroups) {
    if (
      !allowedDispositions.has(group.disposition) ||
      !group.cleanupPrerequisite ||
      !group.cleanupReason ||
      !group.cleanupStatus
    ) {
      throw new Error(
        `LOCAL_ARTIFACT_AUDIT_GROUP_INVALID: ${group.groupId}`
      );
    }
    for (const child of group.childFiles ?? []) {
      const record = inheritedAuditRecord(group, child);
      if (
        !record.originalPath ||
        !Number.isSafeInteger(record.byteSize) ||
        !/^[a-f0-9]{64}$/.test(record.sha256) ||
        !allowedDispositions.has(record.disposition) ||
        !record.cleanupPrerequisite ||
        !record.cleanupReason ||
        !record.cleanupStatus
      ) {
        throw new Error(
          `LOCAL_ARTIFACT_AUDIT_CHILD_INVALID: ${group.groupId}: ${record.originalPath ?? "unknown"}`
        );
      }
      childFiles.push(record);
    }
    for (const directory of group.directoryEntries ?? []) {
      const record = inheritedAuditRecord(
        group,
        directory
      );
      const filesystemDirectory = isAbsolute(
        record.originalPath ?? ""
      );
      const gitDirectory =
        filesystemDirectory &&
        /(?:GIT|REPOSITORY)/.test(
          record.artifactType ?? ""
        );
      if (
        !record.originalPath ||
        !Number.isSafeInteger(record.fileCount) ||
        !Number.isSafeInteger(record.symlinkCount) ||
        (
          filesystemDirectory &&
          (
            !Number.isSafeInteger(record.logicalBytes) ||
            !/^[a-f0-9]{64}$/.test(
              record.fullTreeSha256 ?? ""
            ) ||
            record.treeDigestSchemaVersion !==
              "relative-path-type-mode-size-content-sha256-symlink-target-v1"
          )
        ) ||
        (
          gitDirectory &&
          (
            (
              record.gitRepositoryIdentityStatus !==
                "NOT_APPLICABLE_NO_GIT_METADATA" &&
              (
                !Array.isArray(
                  record.gitRepositoryIdentities
                ) ||
                record.gitRepositoryIdentities.length ===
                  0
              )
            ) ||
            (
              Array.isArray(
                record.gitRepositoryIdentities
              ) &&
              record.gitRepositoryIdentities.some(
                (identity) =>
                  typeof identity.relativePath !== "string" ||
                  !identity.relativePath ||
                  isAbsolute(identity.relativePath) ||
                  identity.relativePath
                    .split("/")
                    .some(
                      (segment) =>
                        !segment ||
                        segment === ".."
                    ) ||
                  !/^[a-f0-9]{40}$/.test(
                    identity.commitSha ?? ""
                  ) ||
                  !/^[a-f0-9]{40}$/.test(
                    identity.gitTreeObjectSha1 ?? ""
                  ) ||
                  !/^[a-f0-9]{64}$/.test(
                    identity.gitIndexListingSha256 ?? ""
                  ) ||
                  typeof identity.workingTreeClean !==
                    "boolean"
              )
            )
          )
        ) ||
        !allowedDispositions.has(record.disposition) ||
        !record.cleanupPrerequisite ||
        !record.cleanupReason ||
        !record.cleanupStatus
      ) {
        throw new Error(
          `LOCAL_ARTIFACT_AUDIT_DIRECTORY_INVALID: ${group.groupId}: ${record.originalPath ?? "unknown"}`
        );
      }
      directoryEntries.push(record);
    }
  }
  const childPaths = childFiles.map(
    (record) => record.originalPath
  );
  if (new Set(childPaths).size !== childPaths.length) {
    throw new Error(
      "LOCAL_ARTIFACT_AUDIT_CHILD_PATHS_NOT_UNIQUE"
    );
  }
  const migratedChildren = childFiles.filter(
    (record) => record.disposition === "MIGRATE_UNIQUE"
  );
  const originalByPath = new Map(
    originalLocalArtifacts.map((record) => [
      record.path,
      record
    ])
  );
  for (const child of migratedChildren) {
    const original = originalByPath.get(child.originalPath);
    if (
      !original ||
      child.byteSize !== original.expectedSizeBytes ||
      child.sha256 !== original.expectedSha256 ||
      child.canonicalCachePath !==
        original.canonicalLocalPath ||
      child.canonicalPackageLinkage !==
        original.canonicalPackageId
    ) {
      throw new Error(
        `LOCAL_ARTIFACT_AUDIT_MIGRATION_LINK_MISMATCH: ${child.originalPath}`
      );
    }
  }
  const migratedPaths = new Set(
    migratedChildren.map((record) => record.originalPath)
  );
  if (
    migratedPaths.size !== originalLocalArtifacts.length ||
    originalLocalArtifacts.some(
      (record) => !migratedPaths.has(record.path)
    )
  ) {
    throw new Error(
      "LOCAL_ARTIFACT_AUDIT_MIGRATION_COVERAGE_MISMATCH"
    );
  }
  return {
    ...audit,
    sourcePath: LOCAL_ARTIFACT_AUDIT_RELATIVE_PATH,
    sourceSha256: await sha256Path(path),
    summary: {
      groupCount: audit.artifactGroups.length,
      exactChildFileCount: childFiles.length,
      directoryEntryCount: directoryEntries.length,
      migratedUniqueFileCount: migratedChildren.length,
      pendingCleanupFileCount: childFiles.filter(
        (record) => record.cleanupStatus === "LOCAL_RETAINED"
      ).length,
      pendingCleanupDirectoryCount: directoryEntries.filter(
        (record) => record.cleanupStatus === "LOCAL_RETAINED"
      ).length
    }
  };
}

async function loadStandards(repoRoot) {
  const path = join(
    repoRoot,
    "docs/operational-savings-automation-research/source-download-manifest.json"
  );
  const manifest = JSON.parse(await readFile(path, "utf8"));
  return new Map(
    manifest.standards.map((standard) => [
      standard.standardId,
      standard
    ])
  );
}

function unique(values) {
  return [
    ...new Set(
      values.filter(
        (value) => value !== null && value !== undefined && value !== ""
      )
    )
  ].sort((left, right) => String(left).localeCompare(String(right)));
}

function proofReferences(records) {
  const deduplicated = new Map();
  for (const record of records) {
    const key = [
      record.standardId,
      record.processKey,
      record.manifestPath,
      record.artifactId
    ].join("\u0000");
    deduplicated.set(key, {
      standardId: record.standardId,
      processKey: record.processKey,
      manifestPath: record.manifestPath,
      artifactId: record.artifactId
    });
  }
  return [...deduplicated.values()].sort((left, right) =>
    canonicalJson(left).localeCompare(canonicalJson(right))
  );
}

function packageMetadata(records, standards, content) {
  const standardIds = unique(records.map((record) => record.standardId));
  const standardMetadata = standardIds
    .map((standardId) => standards.get(standardId))
    .filter(Boolean);
  const sources = unique(records.map((record) => record.sourceUrl));
  const releases = unique(records.map((record) => record.release));
  const acquisitionModes = unique(
    records.map((record) => record.acquisitionMode)
  );
  const acquisitionTimestamps = unique(
    records.map((record) => record.acquisitionTimestamp)
  );
  const recordedSourceOrganizations = unique(
    records.map((record) => record.sourceOrganization)
  );
  const sourceOrganizations = recordedSourceOrganizations.length
    ? recordedSourceOrganizations
    : unique(
        standardMetadata.map((standard) => standard.organization)
      );
  const licenses = unique([
    ...records.map((record) => record.licenseContext),
    ...standardMetadata.map((standard) => standard.license)
  ]);
  const legalReview = unique(
    standardMetadata.map((standard) => standard.legalReview)
  );
  const manifests = unique(
    records.map((record) => record.manifestPath)
  );
  const adapters = unique(records.map((record) => record.adapterPath));
  const originalLocalPaths = unique(
    records.map((record) => record.originalLocalPath)
  );
  const declaredSha256 = unique(
    records.map((record) => record.declaredSha256)
  );
  const declaredSizeBytes = unique(
    records.map((record) => record.declaredSizeBytes)
  );
  const declarationsApplyToExactContent =
    typeof content.sha256 === "string" &&
    Number.isFinite(content.sizeBytes);
  const hasDeclarations =
    declarationsApplyToExactContent &&
    (declaredSha256.length > 0 || declaredSizeBytes.length > 0);
  const declarationsMatch =
    (!declaredSha256.length ||
      declaredSha256.includes(content.sha256)) &&
    (!declaredSizeBytes.length ||
      declaredSizeBytes.includes(content.sizeBytes));
  const sourceDeclarationVerificationStatus =
    !declarationsApplyToExactContent
      ? "NOT_APPLICABLE_TO_AGGREGATE_PACKAGE"
      : !hasDeclarations
        ? "NOT_DECLARED"
        : declarationsMatch
          ? "VERIFIED"
          : "DECLARATION_MISMATCH";
  const documented = records.length > 0;
  return {
    sourceOrganization:
      sourceOrganizations.length === 1
        ? sourceOrganizations[0]
        : sourceOrganizations.length > 1
          ? sourceOrganizations.join("; ")
          : null,
    acquisitionTimestamp:
      acquisitionTimestamps.length === 1
        ? acquisitionTimestamps[0]
        : null,
    source: {
      status: sources.length ? "DOCUMENTED" : "NEEDS_REVIEW",
      urls: sources,
      standardIds,
      blocker: sources.length
        ? null
        : "No proof manifest records the authoritative source for this cached file."
    },
    release: {
      status: releases.length ? "PINNED" : "NEEDS_REVIEW",
      identities: releases,
      commitShas: unique(records.map((record) => record.commitSha)),
      blocker: releases.length
        ? null
        : "No release or source commit is recorded for this cached file."
    },
    acquisition: {
      status: acquisitionModes.length ? "DOCUMENTED" : "NEEDS_REVIEW",
      modes: acquisitionModes,
      timestamps: acquisitionTimestamps,
      blocker: acquisitionModes.length
        ? null
        : "The acquisition method is not recorded in a proof manifest."
    },
    content: {
      ...content,
      sourceDeclarations: {
        sha256: declarationsApplyToExactContent
          ? declaredSha256
          : [],
        sizeBytes: declarationsApplyToExactContent
          ? declaredSizeBytes
          : [],
        verificationStatus: sourceDeclarationVerificationStatus,
        manifestPaths: manifests
      }
    },
    license: {
      status: licenses.length ? "DOCUMENTED_REVIEW_RETAINED" : "NEEDS_REVIEW",
      statements: licenses,
      legalReview,
      blocker: licenses.length
        ? null
        : "License and redistribution terms must be resolved before remote publication."
    },
    ingestion: {
      status: documented
        ? "REFERENCED_BY_RESEARCH_PROOF"
        : "NOT_DOCUMENTED_IN_PROOF_MANIFEST",
      manifests,
      adapters,
      blocker: documented
        ? null
        : "No current proof manifest identifies how this file is ingested."
    },
    reproducibility: {
      status: documented
        ? "LOCAL_CONTENT_PINNED"
        : "CONTENT_PINNED_METADATA_INCOMPLETE",
      proofReferences: proofReferences(records),
      offlineInput: true,
      blocker: documented
        ? null
        : "The local checksum is reproducible, but reacquisition cannot be reproduced from current metadata."
    },
    originalLocalArtifacts: originalLocalPaths.map((path) => ({
      path,
      relation: "EXACT_BYTE_SOURCE_FOR_CANONICAL_CACHE_COPY",
      expectedSizeBytes: content.sizeBytes,
      expectedSha256: content.sha256,
      cleanupStatus: "LOCAL_RETAINED"
    }))
  };
}

function mediaType(path) {
  const extension = extname(path).toLowerCase();
  if (
    REPOSITORY_LICENSE_FILE_PATTERN.test(basename(path))
  ) {
    return extension === ".htm" || extension === ".html"
      ? "text/html"
      : extension === ".md"
        ? "text/markdown"
        : "text/plain";
  }
  return (
    {
      ".csv": "text/csv",
      ".dll": "application/vnd.microsoft.portable-executable",
      ".dylib": "application/x-mach-binary",
      ".gz": "application/gzip",
      ".h": "text/x-c",
      ".htm": "text/html",
      ".html": "text/html",
      ".json": "application/json",
      ".md": "text/markdown",
      ".parquet": "application/vnd.apache.parquet",
      ".pdf": "application/pdf",
      ".png": "image/png",
      ".so": "application/x-sharedlib",
      ".sqlite": "application/vnd.sqlite3",
      ".srw": "text/plain",
      ".txt": "text/plain",
      ".tsv": "text/tab-separated-values",
      ".xls": "application/vnd.ms-excel",
      ".xlsx":
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      ".zip": "application/zip"
    }[extension] ?? "application/octet-stream"
  );
}

function safeObjectName(path) {
  return basename(path)
    .normalize("NFKC")
    .replaceAll(/[^A-Za-z0-9._-]+/g, "-");
}

function safeLicenseObjectPath(path) {
  const segments = path.split("/");
  return segments
    .map((segment, index) =>
      index === segments.length - 1
        ? safeObjectName(segment)
        : safeKeySegment(segment, "path")
    )
    .join("/");
}

function safeKeySegment(value, fallback) {
  const segment = String(value ?? "")
    .normalize("NFKC")
    .toLowerCase()
    .replaceAll(/[^a-z0-9._+-]+/g, "-")
    .replaceAll(/^-+|-+$/g, "")
    .slice(0, 120);
  return segment || fallback;
}

function exactGitHubBlobUrl(remoteUrl, commitSha, path) {
  if (!remoteUrl) return null;
  try {
    const url = new URL(remoteUrl.replace(/\.git$/i, ""));
    if (url.hostname !== "github.com") return null;
    const encodedPath = path
      .split("/")
      .map((segment) => encodeURIComponent(segment))
      .join("/");
    return `${url.href.replace(/\/$/, "")}/blob/${commitSha}/${encodedPath}`;
  } catch {
    return null;
  }
}

function sourceSegmentFromUrl(sourceUrl) {
  if (!sourceUrl) return null;
  try {
    const url = new URL(sourceUrl);
    if (url.hostname === "github.com") {
      const [owner, repository] = url.pathname
        .split("/")
        .filter(Boolean);
      if (owner && repository) {
        return safeKeySegment(
          `${owner}-${repository.replace(/\.git$/i, "")}`,
          null
        );
      }
    }
    const hostMappings = [
      [/energystar\.gov$/i, "energy-star"],
      [/epa\.gov$/i, "epa"],
      [/energy\.gov$/i, "doe"],
      [/fueleconomy\.gov$/i, "fueleconomy"],
      [/openei\.org$/i, "openei"],
      [/sdge\.com$/i, "sdge"],
      [/usno\.navy\.mil$/i, "usno"],
      [/regulations\.doe\.gov$/i, "doe-ccms"],
      [/oedi-data-lake\.s3\.amazonaws\.com$/i, "oedi-comstock"]
    ];
    for (const [pattern, segment] of hostMappings) {
      if (pattern.test(url.hostname)) return segment;
    }
    return safeKeySegment(url.hostname, null);
  } catch {
    return null;
  }
}

function sourceKeySegment(records) {
  const segments = unique(
    records.map((record) =>
      sourceSegmentFromUrl(record.sourceUrl)
    )
  );
  if (!segments.length) return "unclassified";
  if (segments.length === 1) return segments[0];
  return `multi-source-${sha256CanonicalJson(segments).slice(0, 12)}`;
}

function releaseKeySegment(records) {
  const commits = unique(records.map((record) => record.commitSha));
  if (commits.length === 1) return `git-${commits[0]}`;
  const releases = unique(records.map((record) => record.release));
  if (releases.length === 1) {
    return safeKeySegment(releases[0], "unversioned");
  }
  if (releases.length > 1) {
    return `multi-release-${sha256CanonicalJson(releases).slice(0, 12)}`;
  }
  return "unversioned";
}

function normalizedAdapterVersion(path) {
  return path.includes("/proof/")
    ? "proof-database-v1"
    : "research-database-v1";
}

export function immutableFileKey({
  path,
  sha256,
  records = [],
  generatedOn = "undated"
}) {
  if (path.endsWith(".sqlite")) {
    return (
      "database-exports/operational-savings-research/" +
      `snapshot-${generatedOn}-${sha256.slice(0, 12)}/` +
      `${normalizedAdapterVersion(path)}/${safeObjectName(path)}`
    );
  }
  return (
    `raw/${sourceKeySegment(records)}/` +
    `${releaseKeySegment(records)}/${sha256}/${safeObjectName(path)}`
  );
}

function immutableNormalizedOutputKey({
  path,
  sha256,
  generatedOn,
  adapterVersion
}) {
  return (
    "normalized/operational-savings-research/" +
    `snapshot-${generatedOn}-${sha256.slice(0, 12)}/` +
    `${adapterVersion}/${safeObjectName(path)}`
  );
}

function immutableDatabaseExportKey({
  path,
  sha256,
  generatedOn,
  adapterVersion
}) {
  return (
    "database-exports/operational-savings-research/" +
    `snapshot-${generatedOn}-${sha256.slice(0, 12)}/` +
    `${adapterVersion}/${safeObjectName(path)}`
  );
}

function immutableModelSupportKey({
  path,
  sha256,
  generatedOn,
  adapterVersion,
  modelId,
  storageRelease,
  storagePrefix = "model-assets"
}) {
  return (
    `${storagePrefix}/${safeKeySegment(modelId, "research-inspection")}/` +
    `${safeKeySegment(storageRelease ?? generatedOn, "undated")}/` +
    `${safeKeySegment(adapterVersion, "unversioned")}/` +
    `${sha256}/${safeObjectName(path)}`
  );
}

function cacheFileStoragePlan({
  localPath,
  records,
  generatedOn
}) {
  if (
    localPath.startsWith(
      `${CACHE_RELATIVE_PATH}/model-dependencies/scout/`
    )
  ) {
    return {
      packageType: "MODEL_DEPENDENCY_WHEEL",
      contentKind: "PINNED_MODEL_DEPENDENCY_WHEEL",
      key: ({ sha256 }) =>
        immutableModelSupportKey({
          path: localPath,
          sha256,
          generatedOn,
          adapterVersion: "python-wheel-linux-arm64-v1",
          modelId: "scout",
          storageRelease: "scout-72bcf419"
        })
    };
  }
  if (
    localPath ===
    `${CACHE_RELATIVE_PATH}/model-outputs/reopt/pvwatts-full-output.json`
  ) {
    return {
      packageType: "MODEL_OUTPUT_FIXTURE",
      contentKind: "VERIFIED_FULL_MODEL_OUTPUT",
      key: ({ sha256 }) =>
        immutableModelSupportKey({
          path: localPath,
          sha256,
          generatedOn,
          adapterVersion: "model-output-v1",
          modelId: "reopt",
          storageRelease: "ssc-303-reopt-f952cab",
          storagePrefix: "model-outputs"
        })
    };
  }
  if (
    localPath.startsWith(
      `${CACHE_RELATIVE_PATH}/model-support/inspection/`
    )
  ) {
    return {
      packageType: "DERIVED_INSPECTION_IMAGE",
      contentKind: "DERIVED_PDF_PAGE_INSPECTION_IMAGE",
      key: ({ sha256 }) =>
        immutableModelSupportKey({
          path: localPath,
          sha256,
          generatedOn,
          adapterVersion: "pdf-page-render-v1",
          modelId: "research-inspection",
          storageRelease:
            records[0]?.release ?? "source-inspection"
        })
    };
  }
  if (
    localPath.startsWith(
      `${CACHE_RELATIVE_PATH}/normalized/`
    )
  ) {
    return {
      packageType: "NORMALIZED_SOURCE_INSPECTION",
      contentKind: "NORMALIZED_SOURCE_INSPECTION",
      key: ({ sha256 }) =>
        immutableNormalizedOutputKey({
          path: localPath,
          sha256,
          generatedOn,
          adapterVersion: "source-inspection-v1"
        })
    };
  }
  return null;
}

function remoteState(key, { uploadReady }) {
  return {
    s3: {
      bucket: DESTINATION.bucket,
      key,
      s3Uri: `s3://${DESTINATION.bucket}/${key}`,
      versionId: null,
      etag: null,
      contentLength: null,
      contentType: null,
      checksumSha256Base64: null,
      metadataSha256: null,
      serverSideEncryption: null,
      kmsKeyId: null,
      uploadedAt: null,
      verifiedAt: null,
      verificationStatus: uploadReady
        ? "NOT_UPLOADED"
        : "ARCHIVE_NOT_MATERIALIZED",
      deletionStatus: "LOCAL_RETAINED"
    }
  };
}

function initialCleanupEligibility(packageRecord) {
  const activeConsumerPaths = unique([
    ...(packageRecord.ingestion?.manifests ?? []),
    ...(packageRecord.ingestion?.adapters ?? []),
    ...(packageRecord.reproducibility?.proofReferences ?? []).map(
      (reference) => reference.manifestPath
    )
  ]);
  return {
    status: "BLOCKED",
    activeConsumerPaths,
    validatedConsumerPaths: [],
    validationCommand: null,
    validationStatus: "NOT_RUN",
    validatedAt: null,
    validatedSourceCommit: null,
    validatedRepositoryTreeDigest: null,
    restoredVersionId: null,
    restoredSha256: null,
    repositorySemanticRestoreStatus:
      packageRecord.packageType ===
      "PINNED_GIT_REPOSITORY"
        ? "NOT_VERIFIED"
        : "NOT_APPLICABLE",
    restoredRepositoryIdentity: null,
    restoredAt: null,
    blocker: activeConsumerPaths.length
      ? "Research proof manifests or adapters still reference this local package. Run final validation and explicitly confirm that no consumer is active before cleanup."
      : "Final tests and builds have not been recorded for this package."
  };
}

async function loadResearchConsumerDocuments(repoRoot) {
  const roots = [
    "scripts/research/operational-savings/adapters",
    "scripts/research/operational-savings/tests"
  ];
  const paths = [
    "scripts/research/operational-savings/run-real-proofs.mjs"
  ];
  for (const relativeRoot of roots) {
    const entries = await walkFiles(resolve(repoRoot, relativeRoot));
    for (const entry of entries) {
      if (
        entry.entryType === "FILE" &&
        [".json", ".md", ".mjs", ".py"].includes(
          extname(entry.relativePath).toLowerCase()
        )
      ) {
        paths.push(
          `${relativeRoot}/${entry.relativePath}`
        );
      }
    }
  }
  const documents = [];
  for (const path of unique(paths)) {
    documents.push({
      path,
      source: await readFile(resolve(repoRoot, path), "utf8")
    });
  }
  return documents;
}

function applyActiveConsumerReferences(
  packages,
  consumerDocuments
) {
  for (const packageRecord of packages) {
    const literalReferences = consumerDocuments
      .filter((document) =>
        document.source.includes(packageRecord.localPath)
      )
      .map((document) => document.path);
    const activeConsumerPaths = unique([
      ...packageRecord.cleanupEligibility.activeConsumerPaths,
      ...literalReferences
    ]);
    packageRecord.cleanupEligibility.activeConsumerPaths =
      activeConsumerPaths;
    packageRecord.cleanupEligibility.blocker =
      activeConsumerPaths.length
        ? "Research proof manifests, tests, or adapters still reference this local package. Run final validation and explicitly confirm that no consumer is active before cleanup."
        : packageRecord.cleanupEligibility.blocker;
  }
}

async function buildFilePackage({
  repoRoot,
  entry,
  references,
  standards,
  generatedOn
}) {
  const localPath = `${CACHE_RELATIVE_PATH}/${entry.relativePath}`;
  const digest = await sha256Path(entry.absolutePath);
  const records = references.filter((record) => record.path === localPath);
  const storagePlan = cacheFileStoragePlan({
    localPath,
    records,
    generatedOn
  });
  const key = storagePlan
    ? storagePlan.key({ sha256: digest })
    : immutableFileKey({
        path: localPath,
        sha256: digest,
        records,
        generatedOn
      });
  const packageRecord = {
    packageId: `cache-file:${entry.relativePath}`,
    packageType:
      storagePlan?.packageType ??
      (localPath.endsWith(".sqlite")
        ? "NORMALIZED_DATABASE"
        : localPath.includes("/probes/")
          ? "ACCESS_PROBE"
          : "SOURCE_ARTIFACT"),
    localPath,
    coverage: {
      mode: "EXACT_FILE",
      fileCount: 1,
      totalSizeBytes: entry.sizeBytes
    },
    fingerprint: {
      algorithm: "SHA-256",
      digest
    },
    plannedObject: {
      key,
      keyDigest: {
        algorithm: "SHA-256",
        digest,
        scope: "OBJECT_BYTES"
      },
      contentType: mediaType(localPath),
      expectedSizeBytes: entry.sizeBytes,
      expectedSha256: digest,
      uploadReady: true,
      state: "PLANNED"
    },
    s3Uri: `s3://${DESTINATION.bucket}/${key}`,
    localRetentionPolicy: "DELETE_AFTER_VERIFIED_MIGRATION",
    ...packageMetadata(records, standards, {
      kind: storagePlan?.contentKind ?? "FILE",
      fileName: basename(localPath),
      mediaType: mediaType(localPath),
      sizeBytes: entry.sizeBytes,
      sha256: digest
    }),
    remote: remoteState(key, { uploadReady: true })
  };
  if (!packageRecord.acquisitionTimestamp) {
    packageRecord.acquisitionTimestamp = entry.modifiedAt;
    packageRecord.acquisition.timestamps = [entry.modifiedAt];
    packageRecord.acquisition.modes = unique([
      ...packageRecord.acquisition.modes,
      "LOCAL_FILE_MODIFICATION_TIME_EVIDENCE"
    ]);
    packageRecord.acquisition.timestampEvidence =
      "LOCAL_FILE_MODIFICATION_TIME";
  }
  if (packageRecord.packageType === "NORMALIZED_DATABASE") {
    packageRecord.sourceOrganization ??= "RetroFi";
    packageRecord.acquisitionTimestamp ??=
      `${generatedOn}T00:00:00.000Z`;
    Object.assign(packageRecord.source, {
      status: "DOCUMENTED_INTERNAL_DERIVATION",
      urls: [],
      standardIds: packageRecord.source.standardIds ?? [],
      blocker: null
    });
    Object.assign(packageRecord.release, {
      status: "PINNED",
      identities: [
        `Operational-savings normalized database snapshot ${generatedOn} ${digest}`
      ],
      commitShas: [],
      blocker: null
    });
    Object.assign(packageRecord.acquisition, {
      status: "DOCUMENTED",
      modes: ["LOCAL_RESEARCH_DATABASE_PUBLICATION"],
      timestamps: [packageRecord.acquisitionTimestamp],
      blocker: null
    });
    Object.assign(packageRecord.license, {
      status: "SOURCE_LICENSES_RETAINED_IN_LINEAGE",
      statements: [
        "Internal normalized database derived from the source artifacts recorded in this migration manifest. Retain every source-specific license and attribution record with the database."
      ],
      legalReview: [
        "Private research retention only. Do not publish or deploy the aggregate database without reviewing every source-specific term."
      ],
      blocker: null
    });
    Object.assign(packageRecord.ingestion, {
      status: "RESEARCH_DATABASE_EXPORT",
      manifests: [
        "scripts/research/operational-savings/run-real-proofs.mjs"
      ],
      adapters: [
        "scripts/research/operational-savings/run-real-proofs.mjs"
      ],
      blocker: null
    });
    Object.assign(packageRecord.reproducibility, {
      status: "REPRODUCIBLE_FROM_PINNED_RESEARCH_INPUTS",
      proofReferences: [],
      offlineInput: true,
      blocker: null
    });
  }
  packageRecord.cleanupEligibility =
    initialCleanupEligibility(packageRecord);
  return packageRecord;
}

async function buildOutsideCachePackage({
  repoRoot,
  spec,
  generatedOn
}) {
  const absolutePath = resolve(repoRoot, spec.localPath);
  const relativePath = relativeToRepo(repoRoot, absolutePath);
  if (relativePath !== spec.localPath) {
    throw new Error(
      `OUTSIDE_CACHE_SPEC_PATH_MISMATCH: ${spec.localPath}`
    );
  }
  const details = await lstat(absolutePath);
  if (!details.isFile() || details.isSymbolicLink()) {
    throw new Error(
      `OUTSIDE_CACHE_FILE_REQUIRED: ${spec.localPath}`
    );
  }
  const digest = await sha256Path(absolutePath);
  const observedLocalModifiedAt =
    details.mtime.toISOString();
  const key =
    [
      "MODEL_SUPPORT",
      "MODEL_INPUT",
      "MODEL_OUTPUT"
    ].includes(spec.storageArea)
      ? immutableModelSupportKey({
          path: spec.localPath,
          sha256: digest,
          generatedOn,
          adapterVersion: spec.adapterVersion,
          modelId: spec.modelId,
          storageRelease: spec.storageRelease,
          storagePrefix:
            spec.storageArea === "MODEL_INPUT"
              ? "model-inputs"
              : spec.storageArea === "MODEL_OUTPUT"
                ? "model-outputs"
                : "model-assets"
        })
      : spec.storageArea === "DATABASE_EXPORT"
        ? immutableDatabaseExportKey({
            path: spec.localPath,
            sha256: digest,
            generatedOn,
            adapterVersion: spec.adapterVersion
          })
      : immutableNormalizedOutputKey({
          path: spec.localPath,
          sha256: digest,
          generatedOn,
          adapterVersion: spec.adapterVersion
        });
  const packageRecord = {
    packageId: spec.packageId,
    packageType: spec.packageType,
    localPath: spec.localPath,
    coverage: {
      mode: "EXACT_ALLOWLISTED_REPOSITORY_FILE",
      fileCount: 1,
      totalSizeBytes: details.size
    },
    fingerprint: {
      algorithm: "SHA-256",
      digest
    },
    plannedObject: {
      key,
      keyDigest: {
        algorithm: "SHA-256",
        digest,
        scope: "OBJECT_BYTES"
      },
      contentType: mediaType(spec.localPath),
      expectedSizeBytes: details.size,
      expectedSha256: digest,
      uploadReady: true,
      state: "PLANNED"
    },
    sourceOrganization: spec.sourceOrganization,
    s3Uri: `s3://${DESTINATION.bucket}/${key}`,
    acquisitionTimestamp: observedLocalModifiedAt,
    timestampEvidence: "LOCAL_FILE_MTIME",
    localRetentionPolicy: spec.localRetentionPolicy,
    source: {
      status: spec.derivedFromLocalPath
        ? "DERIVED_FROM_LOCAL_SOURCE_ARTIFACT"
        : "INTERNAL_DERIVED_ARTIFACT",
      urls: [],
      standardIds: [],
      derivedFromLocalPath: spec.derivedFromLocalPath ?? null,
      blocker: null
    },
    release: {
      status: "PINNED",
      identities: [
        spec.releaseIdentity ??
          `Research database compact export ${generatedOn}`
      ],
      commitShas: [],
      blocker: null
    },
    acquisition: {
      status: "DOCUMENTED",
      modes: [spec.acquisitionMode],
      timestamps: [observedLocalModifiedAt],
      timestampEvidence: "LOCAL_FILE_MTIME",
      blocker: null
    },
    content: {
      kind: spec.contentKind ?? "COMPACT_NORMALIZED_OUTPUT",
      fileName: basename(spec.localPath),
      mediaType: mediaType(spec.localPath),
      sizeBytes: details.size,
      sha256: digest
    },
    license: {
      status: spec.derivedFromLocalPath
        ? "SOURCE_LICENSE_REVIEW_RETAINED"
        : "INTERNAL_DERIVED_ARTIFACT",
      statements: spec.derivedFromLocalPath
        ? [
            `Derived inspection render of ${spec.derivedFromLocalPath}; retain the source artifact's license and attribution context.`
          ]
        : [],
      legalReview: [],
      blocker: null
    },
    ingestion: {
      status:
        spec.ingestionStatus ??
        (spec.derivedFromLocalPath
          ? "RESEARCH_SOURCE_INSPECTION_RENDER"
          : "RESEARCH_DATABASE_EXPORT"),
      manifests: spec.ingestionManifest
        ? [spec.ingestionManifest]
        : [],
      adapters: spec.derivedFromLocalPath
        ? []
        : spec.ingestionManifest
          ? [
              `scripts/research/operational-savings/containers/${spec.modelId}/verify.mjs`
            ]
        : [
            "scripts/research/operational-savings/run-real-proofs.mjs"
          ],
      blocker: null
    },
    reproducibility: {
      status:
        spec.reproducibilityStatus ?? "LOCAL_CONTENT_PINNED",
      proofReferences: spec.ingestionManifest
        ? [spec.ingestionManifest]
        : [],
      offlineInput: true,
      blocker: null
    },
    remote: remoteState(key, { uploadReady: true })
  };
  packageRecord.cleanupEligibility =
    initialCleanupEligibility(packageRecord);
  return packageRecord;
}

async function runGit(repoPath, args, options = {}) {
  const result = await execFileAsync(
    FIXED_GIT_PATH,
    ["-C", repoPath, ...args],
    {
      encoding: options.encoding,
      maxBuffer: 64 * 1024 * 1024,
      env: gitSubprocessEnvironment()
    }
  );
  return result.stdout;
}

function assertSafeArchiveMemberPath(memberPath) {
  const segments =
    typeof memberPath === "string"
      ? memberPath.split("/")
      : [];
  if (
    !memberPath ||
    memberPath.startsWith("/") ||
    memberPath.endsWith("/") ||
    memberPath.includes("\\") ||
    /[*?[\]]/.test(memberPath) ||
    /[\u0000-\u001f\u007f]/.test(memberPath) ||
    segments.some(
      (segment) =>
        !segment ||
        segment === "." ||
        segment === ".." ||
        segment.startsWith("-")
    )
  ) {
    throw new Error(
      `ARCHIVE_MEMBER_PATH_UNSAFE: ${String(memberPath)}`
    );
  }
  return memberPath;
}

async function runArchiveReader(command, args) {
  const result = await execFileAsync(command, args, {
    encoding: null,
    maxBuffer: 64 * 1024 * 1024,
    env: archiveSubprocessEnvironment()
  });
  return Buffer.isBuffer(result.stdout)
    ? result.stdout
    : Buffer.from(result.stdout);
}

export async function listArchiveMembers({
  archivePath,
  archiveFormat
}) {
  let output;
  if (archiveFormat === "ZIP") {
    output = await runArchiveReader(
      "/usr/bin/unzip",
      ["-Z1", archivePath]
    );
  } else if (archiveFormat === "TAR_GZIP") {
    output = await runArchiveReader(
      "/usr/bin/tar",
      ["-tzf", archivePath]
    );
  } else {
    throw new Error(
      `ARCHIVE_FORMAT_UNSUPPORTED: ${archiveFormat}`
    );
  }
  const listedPaths = output
    .toString("utf8")
    .split(/\r?\n/)
    .filter(Boolean);
  for (const listedPath of listedPaths) {
    assertSafeArchiveMemberPath(
      listedPath.endsWith("/")
        ? listedPath.slice(0, -1)
        : listedPath
    );
  }
  const members = listedPaths.filter(
    (listedPath) => !listedPath.endsWith("/")
  );
  if (new Set(members).size !== members.length) {
    throw new Error(
      `ARCHIVE_MEMBER_PATH_DUPLICATED: ${archivePath}`
    );
  }
  return members.sort((left, right) =>
    left.localeCompare(right)
  );
}

export async function readArchiveMember({
  archivePath,
  archiveFormat,
  memberPath,
  knownMembers = null
}) {
  assertSafeArchiveMemberPath(memberPath);
  const members =
    knownMembers ??
    (await listArchiveMembers({
      archivePath,
      archiveFormat
    }));
  if (!members.includes(memberPath)) {
    throw new Error(
      `ARCHIVE_MEMBER_NOT_FOUND: ${memberPath}`
    );
  }
  if (archiveFormat === "ZIP") {
    return runArchiveReader(
      "/usr/bin/unzip",
      ["-p", archivePath, memberPath]
    );
  }
  if (archiveFormat === "TAR_GZIP") {
    return runArchiveReader(
      "/usr/bin/tar",
      ["-xOzf", archivePath, memberPath]
    );
  }
  throw new Error(
    `ARCHIVE_FORMAT_UNSUPPORTED: ${archiveFormat}`
  );
}

export async function gitRepositoryIdentity(repoPath) {
  const [commit, tree, status, remoteUrl, listing] = await Promise.all([
    runGit(repoPath, ["rev-parse", "HEAD"], { encoding: "utf8" }),
    runGit(repoPath, ["rev-parse", "HEAD^{tree}"], {
      encoding: "utf8"
    }),
    runGit(repoPath, ["status", "--porcelain=v1", "-z"], {
      encoding: null
    }),
    runGit(repoPath, ["remote", "get-url", "origin"], {
      encoding: "utf8"
    }).catch(() => ""),
    runGit(repoPath, ["ls-files", "-s", "-z"], {
      encoding: null
    })
  ]);
  const listingBuffer = Buffer.isBuffer(listing)
    ? listing
    : Buffer.from(listing);
  const paths = listingBuffer
    .toString("utf8")
    .split("\u0000")
    .filter(Boolean)
    .map((entry) => entry.slice(entry.indexOf("\t") + 1));
  let trackedCheckoutSizeBytes = 0;
  for (const path of paths) {
    trackedCheckoutSizeBytes += (await lstat(join(repoPath, path))).size;
  }
  return {
    commitSha: commit.trim(),
    gitTreeObjectSha1: tree.trim(),
    gitIndexListingSha256: sha256Bytes(listingBuffer),
    trackedFileCount: paths.length,
    trackedCheckoutSizeBytes,
    workingTreeClean:
      (Buffer.isBuffer(status) ? status.length : status.length) === 0,
    remoteUrl: remoteUrl.trim() || null
  };
}

async function buildRepositoryPackage({
  repoRoot,
  repositoryName,
  cacheEntries,
  references,
  standards
}) {
  const localPath =
    `${CACHE_RELATIVE_PATH}/repos/${repositoryName}`;
  const absolutePath = join(repoRoot, localPath);
  const physicalEntries = cacheEntries.filter((entry) =>
    entry.relativePath.startsWith(`repos/${repositoryName}/`)
  );
  const physical = summarizeEntries(physicalEntries);
  const identity = await gitRepositoryIdentity(absolutePath);
  const records = references.filter(
    (record) =>
      record.path === localPath ||
      record.path.startsWith(`${localPath}/`)
  );
  if (
    identity.remoteUrl &&
    !records.some(
      (record) =>
        record.path === localPath &&
        record.acquisitionMode === "PUBLIC_GIT_CLONE"
    )
  ) {
    records.push({
      path: localPath,
      standardId: null,
      processKey: null,
      manifestPath: null,
      adapterPath: null,
      artifactId: null,
      sourceUrl: identity.remoteUrl,
      release: `Git commit ${identity.commitSha}`,
      commitSha: identity.commitSha,
      acquisitionMode: "PUBLIC_GIT_CLONE",
      acquisitionTimestamp: null,
      sourceOrganization: null,
      declaredSha256: null,
      declaredSizeBytes: null,
      licenseContext: null,
      role: null,
      field: null,
      official: null
    });
  }
  const archiveName =
    `${repositoryName}-${identity.commitSha}.bundle`;
  const sourceSegment = sourceKeySegment(records);
  const key =
    `raw/${sourceSegment}/git-${identity.commitSha}/` +
    `${identity.gitIndexListingSha256}/${archiveName}`;
  const packageRecord = {
    packageId: `git-repository:${repositoryName}`,
    packageType: "PINNED_GIT_REPOSITORY",
    localPath,
    coverage: {
      mode: "RECURSIVE_LOGICAL_PACKAGE",
      includesVersionControlMetadata: true,
      physicalFileCount: physical.fileCount,
      physicalSizeBytes: physical.totalSizeBytes,
      symbolicLinkCount: physical.symbolicLinkCount,
      trackedFileCount: identity.trackedFileCount,
      trackedCheckoutSizeBytes: identity.trackedCheckoutSizeBytes,
      note:
        "The parent package covers every physical path under the clone. The planned Git bundle preserves the pinned commit and its reachable Git objects so the exact working tree and required Git identity can be restored."
    },
    fingerprint: {
      algorithm: "GIT_TREE_PLUS_SHA256_INDEX_LISTING",
      commitSha: identity.commitSha,
      gitTreeObjectSha1: identity.gitTreeObjectSha1,
      gitIndexListingSha256: identity.gitIndexListingSha256,
      workingTreeClean: identity.workingTreeClean
    },
    plannedObject: {
      key,
      keyDigest: {
        algorithm: "SHA-256",
        digest: identity.gitIndexListingSha256,
        scope: "DETERMINISTIC_GIT_INDEX_LISTING"
      },
      contentType: SOURCE_ARCHIVE_MEDIA_TYPE,
      expectedSizeBytes: null,
      expectedSha256: null,
      uploadReady: false,
      state: "SOURCE_ARCHIVE_REQUIRED",
      archivePlan: {
        format: "git-bundle-v2",
        sourceCommit: identity.commitSha,
        sourceTree: identity.gitTreeObjectSha1,
        deterministicIdentity:
          identity.gitIndexListingSha256,
        outputFileName: archiveName,
        materialized: false
      }
    },
    s3Uri: `s3://${DESTINATION.bucket}/${key}`,
    acquisitionTimestamp: null,
    localRetentionPolicy: "DELETE_AFTER_VERIFIED_MIGRATION",
    ...packageMetadata(records, standards, {
      kind: "GIT_SOURCE_BUNDLE",
      repositoryName,
      remoteUrl: identity.remoteUrl,
      commitSha: identity.commitSha,
      gitTreeObjectSha1: identity.gitTreeObjectSha1,
      gitIndexListingSha256: identity.gitIndexListingSha256
    }),
    remote: remoteState(key, { uploadReady: false })
  };
  const indexEntry = cacheEntries.find(
    (entry) =>
      entry.relativePath ===
      `repos/${repositoryName}/.git/index`
  );
  if (!packageRecord.acquisitionTimestamp && indexEntry) {
    packageRecord.acquisitionTimestamp = indexEntry.modifiedAt;
    packageRecord.acquisition.timestamps = [indexEntry.modifiedAt];
    packageRecord.acquisition.modes = unique([
      ...packageRecord.acquisition.modes,
      "LOCAL_GIT_INDEX_MODIFICATION_TIME_EVIDENCE"
    ]);
    packageRecord.acquisition.timestampEvidence =
      "LOCAL_GIT_INDEX_MODIFICATION_TIME";
  }
  packageRecord.cleanupEligibility =
    initialCleanupEligibility(packageRecord);
  return packageRecord;
}

async function trackedRepositoryLicensePaths(repositoryPath) {
  const listing = await runGit(
    repositoryPath,
    ["ls-files", "-z"],
    { encoding: null }
  );
  return (Buffer.isBuffer(listing) ? listing : Buffer.from(listing))
    .toString("utf8")
    .split("\u0000")
    .filter(Boolean)
    .filter((path) =>
      REPOSITORY_LICENSE_FILE_PATTERN.test(basename(path))
    )
    .sort((left, right) => left.localeCompare(right));
}

function assertRepositoryLicenseSpecsMatch({
  repositoryName,
  discoveredPaths,
  configuredFiles
}) {
  const configuredPaths = Object.keys(configuredFiles).sort(
    (left, right) => left.localeCompare(right)
  );
  if (
    canonicalJson(discoveredPaths) !==
    canonicalJson(configuredPaths)
  ) {
    throw new Error(
      `REPOSITORY_LICENSE_FILE_SET_MISMATCH: ${repositoryName}: configured ${configuredPaths.join(", ") || "none"}; tracked ${discoveredPaths.join(", ") || "none"}`
    );
  }
}

async function buildRepositoryLicensePackages({
  repoRoot,
  repositoryPackage
}) {
  const repositoryName =
    repositoryPackage.content.repositoryName;
  const spec = REPOSITORY_LICENSE_SPECS[repositoryName];
  if (!spec) {
    throw new Error(
      `REPOSITORY_LICENSE_SPEC_REQUIRED: ${repositoryName}`
    );
  }
  const repositoryPath = resolve(
    repoRoot,
    repositoryPackage.localPath
  );
  const trackedPaths =
    await trackedRepositoryLicensePaths(repositoryPath);
  assertRepositoryLicenseSpecsMatch({
    repositoryName,
    discoveredPaths: trackedPaths,
    configuredFiles: spec.files
  });
  const commitSha =
    repositoryPackage.fingerprint.commitSha;
  const remoteUrl =
    repositoryPackage.content.remoteUrl ??
    repositoryPackage.source.urls[0] ??
    null;
  const sourceSegment =
    sourceSegmentFromUrl(remoteUrl) ??
    safeKeySegment(repositoryName, "repository");
  const packages = [];
  for (const repositoryRelativePath of trackedPaths) {
    const fileSpec = spec.files[repositoryRelativePath];
    const absolutePath = resolve(
      repositoryPath,
      repositoryRelativePath
    );
    const details = await lstat(absolutePath);
    if (!details.isFile() || details.isSymbolicLink()) {
      throw new Error(
        `REPOSITORY_LICENSE_REGULAR_FILE_REQUIRED: ${repositoryName}: ${repositoryRelativePath}`
      );
    }
    const digest = await sha256Path(absolutePath);
    const localPath =
      `${repositoryPackage.localPath}/${repositoryRelativePath}`;
    const key =
      `licenses/${sourceSegment}/git-${commitSha}/${digest}/` +
      safeLicenseObjectPath(repositoryRelativePath);
    const exactSourceUrl = exactGitHubBlobUrl(
      remoteUrl,
      commitSha,
      repositoryRelativePath
    );
    const acquiredAt = details.mtime.toISOString();
    const parentPackageId = repositoryPackage.packageId;
    const packageRecord = {
      packageId:
        `repository-license:${repositoryName}:` +
        repositoryRelativePath.replaceAll("/", ":"),
      packageType: "REPOSITORY_LICENSE_ARTIFACT",
      localPath,
      parentPackageId,
      coverage: {
        mode: "DUPLICATE_CHILD_OBJECT",
        fileCount: 1,
        totalSizeBytes: details.size,
        physicalOwnership: "PARENT_REPOSITORY_PACKAGE",
        parentPackageId,
        note:
          "This independently stored license object is a logical child. Its bytes remain counted once in cache coverage by the parent repository package."
      },
      fingerprint: {
        algorithm: "SHA-256",
        digest
      },
      plannedObject: {
        key,
        keyDigest: {
          algorithm: "SHA-256",
          digest,
          scope: "OBJECT_BYTES"
        },
        contentType: mediaType(repositoryRelativePath),
        expectedSizeBytes: details.size,
        expectedSha256: digest,
        uploadReady: true,
        state: "PLANNED"
      },
      sourceOrganization:
        repositoryPackage.sourceOrganization ??
        spec.sourceOrganization,
      s3Uri: `s3://${DESTINATION.bucket}/${key}`,
      acquisitionTimestamp: acquiredAt,
      timestampEvidence: "LOCAL_FILE_MTIME",
      localRetentionPolicy:
        "DELETE_WITH_PARENT_REPOSITORY",
      localLifecycle: {
        ownerPackageId: parentPackageId,
        ownershipMode: "PARENT_REPOSITORY_OWNS_LOCAL_BYTES",
        cleanupMode:
          "DELETE_ONLY_WITH_VERIFIED_PARENT_REPOSITORY_CLEANUP",
        hydrationMode:
          "VERIFY_EXACT_BYTES_AFTER_PARENT_REPOSITORY_HYDRATION"
      },
      repositoryIdentity: {
        repositoryName,
        remoteUrl,
        commitSha,
        gitTreeObjectSha1:
          repositoryPackage.fingerprint.gitTreeObjectSha1,
        repositoryRelativePath
      },
      source: {
        status: "DOCUMENTED",
        urls: unique([remoteUrl, exactSourceUrl]),
        standardIds:
          repositoryPackage.source.standardIds ?? [],
        exactFileUrl: exactSourceUrl,
        blocker: null
      },
      release: {
        status: "PINNED",
        identities: [`Git commit ${commitSha}`],
        commitShas: [commitSha],
        blocker: null
      },
      acquisition: {
        status: "DOCUMENTED",
        modes: [
          "PINNED_TRACKED_REPOSITORY_LICENSE_FILE"
        ],
        timestamps: [acquiredAt],
        timestampEvidence: "LOCAL_FILE_MTIME",
        blocker: null
      },
      content: {
        kind: "UPSTREAM_LICENSE_OR_NOTICE_FILE",
        fileName: basename(repositoryRelativePath),
        repositoryName,
        repositoryRelativePath,
        parentPackageId,
        mediaType: mediaType(repositoryRelativePath),
        sizeBytes: details.size,
        sha256: digest,
        sourceDeclarations: {
          sha256: [digest],
          sizeBytes: [details.size],
          verificationStatus: "VERIFIED",
          manifestPaths: []
        }
      },
      license: {
        status: "EXACT_UPSTREAM_LICENSE_TEXT_RETAINED",
        spdxExpression: fileSpec.spdxExpression,
        licenseRole: fileSpec.licenseRole,
        statements: [
          `Exact ${repositoryRelativePath} bytes retained from ${repositoryName} at Git commit ${commitSha}.`,
          `SPDX summary: ${fileSpec.spdxExpression}.`,
          fileSpec.attribution
        ],
        legalReview: [
          "The exact upstream text is authoritative. Review redistribution and attribution obligations before publishing outside the private research environment."
        ],
        blocker: null
      },
      ingestion: {
        status:
          "RETAINED_WITH_PINNED_REPOSITORY_RELEASE",
        manifests:
          repositoryPackage.ingestion.manifests ?? [],
        adapters: repositoryPackage.ingestion.adapters ?? [],
        blocker: null
      },
      reproducibility: {
        status:
          "RESTORABLE_FROM_PINNED_GIT_RELEASE_AND_EXACT_S3_OBJECT",
        proofReferences: [],
        offlineInput: true,
        blocker: null
      },
      remote: remoteState(key, { uploadReady: true })
    };
    packageRecord.cleanupEligibility =
      initialCleanupEligibility(packageRecord);
    packages.push(packageRecord);
  }
  return packages;
}

function embeddedLicenseRole({
  parentPackage,
  memberPath
}) {
  if (
    parentPackage.packageId ===
    `cache-file:artifacts/${OR_TOOLS_ARCHIVE_FILE_NAME}`
  ) {
    return "ARCHIVE_PROJECT_LICENSE";
  }
  if (/^NOTICE(?:\.|$)/i.test(basename(memberPath))) {
    return "DISTRIBUTION_NOTICE";
  }
  if (memberPath.includes(".dist-info/")) {
    return "PYTHON_DISTRIBUTION_LICENSE";
  }
  return "BUNDLED_COMPONENT_LICENSE";
}

async function buildEmbeddedLicensePackage({
  repoRoot,
  parentPackage,
  archiveFormat,
  memberPath,
  memberBytes
}) {
  if (memberBytes.length === 0) {
    throw new Error(
      `EMBEDDED_LICENSE_EMPTY: ${parentPackage.packageId}: ${memberPath}`
    );
  }
  const parentDigest =
    parentPackage.plannedObject.expectedSha256;
  const digest = sha256Bytes(memberBytes);
  const sourceRecords = (
    parentPackage.source?.urls ?? []
  ).map((sourceUrl) => ({ sourceUrl }));
  const sourceSegment = sourceKeySegment(sourceRecords);
  const releaseSegment = safeKeySegment(
    parentPackage.release?.identities?.[0],
    `parent-${parentDigest.slice(0, 12)}`
  );
  const parentObjectName = safeObjectName(
    parentPackage.localPath
  );
  const memberObjectPath =
    safeLicenseObjectPath(memberPath);
  const key =
    `licenses/${sourceSegment}/` +
    `${releaseSegment}-${parentDigest.slice(0, 12)}/` +
    `${digest}/${parentObjectName}/${memberObjectPath}`;
  const packageIdentity = sha256CanonicalJson([
    parentPackage.packageId,
    memberPath
  ]).slice(0, 24);
  const stagedLocalPath =
    `${CACHE_RELATIVE_PATH}/migration-staging/embedded-licenses/` +
    `${parentDigest}/${digest}/${parentObjectName}/` +
    memberObjectPath;
  const licenseRole = embeddedLicenseRole({
    parentPackage,
    memberPath
  });
  const packageRecord = {
    packageId: `embedded-license:${packageIdentity}`,
    packageType: "EMBEDDED_LICENSE_ARTIFACT",
    localPath: parentPackage.localPath,
    parentPackageId: parentPackage.packageId,
    coverage: {
      mode: "DUPLICATE_CHILD_OBJECT",
      fileCount: 1,
      totalSizeBytes: memberBytes.length,
      physicalOwnership: "PARENT_ARCHIVE_PACKAGE",
      parentPackageId: parentPackage.packageId,
      note:
        "The embedded member bytes remain counted once in cache coverage by the parent archive or wheel package. The independently uploaded object is a logical child."
    },
    fingerprint: {
      algorithm: "SHA-256",
      digest
    },
    plannedObject: {
      key,
      keyDigest: {
        algorithm: "SHA-256",
        digest,
        scope: "OBJECT_BYTES"
      },
      contentType: mediaType(memberPath),
      expectedSizeBytes: memberBytes.length,
      expectedSha256: digest,
      uploadReady: false,
      state: "EMBEDDED_LICENSE_EXTRACTION_REQUIRED",
      localFilePath: stagedLocalPath,
      extractionPlan: {
        archiveFormat,
        parentPackageId: parentPackage.packageId,
        parentLocalPath: parentPackage.localPath,
        parentExpectedSha256: parentDigest,
        memberPath,
        materialized: false
      }
    },
    sourceOrganization:
      parentPackage.sourceOrganization,
    s3Uri: `s3://${DESTINATION.bucket}/${key}`,
    acquisitionTimestamp:
      parentPackage.acquisitionTimestamp,
    timestampEvidence:
      parentPackage.timestampEvidence ??
      parentPackage.acquisition?.timestampEvidence ??
      null,
    localRetentionPolicy:
      "DELETE_AFTER_VERIFIED_MIGRATION",
    localLifecycle: {
      ownerPackageId: parentPackage.packageId,
      ownershipMode: "MEMBER_BYTES_OWNED_BY_PARENT_ARCHIVE",
      cleanupMode:
        "BATCH_CLEANUP_WITH_PARENT_PACKAGE_REQUIRED",
      hydrationMode:
        "VERIFY_EXACT_MEMBER_AFTER_PARENT_PACKAGE_HYDRATION",
      stagedExtractionPath: stagedLocalPath
    },
    embeddedMember: {
      archiveFormat,
      parentPackageId: parentPackage.packageId,
      parentLocalPath: parentPackage.localPath,
      parentExpectedSha256: parentDigest,
      memberPath
    },
    source: structuredClone(parentPackage.source),
    release: structuredClone(parentPackage.release),
    acquisition: structuredClone(
      parentPackage.acquisition
    ),
    content: {
      kind: "EMBEDDED_UPSTREAM_LICENSE_OR_NOTICE_FILE",
      fileName: basename(memberPath),
      mediaType: mediaType(memberPath),
      sizeBytes: memberBytes.length,
      sha256: digest,
      parentPackageId: parentPackage.packageId,
      parentPackageSha256: parentDigest,
      archiveFormat,
      archiveMemberPath: memberPath,
      sourceDeclarations: {
        sha256: [digest],
        sizeBytes: [memberBytes.length],
        verificationStatus: "VERIFIED_BY_EXACT_EXTRACTION",
        manifestPaths:
          parentPackage.content?.sourceDeclarations
            ?.manifestPaths ?? []
      }
    },
    license: {
      status: "EXACT_EMBEDDED_LICENSE_TEXT_RETAINED",
      licenseRole,
      statements: unique([
        `Exact ${memberPath} bytes extracted from immutable parent package ${parentPackage.packageId} with SHA-256 ${parentDigest}.`,
        ...(parentPackage.license?.statements ?? [])
      ]),
      legalReview:
        parentPackage.license?.legalReview ?? [],
      blocker: null
    },
    ingestion: {
      status:
        "RETAINED_WITH_IMMUTABLE_PARENT_PACKAGE",
      manifests:
        parentPackage.ingestion?.manifests ?? [],
      adapters:
        parentPackage.ingestion?.adapters ?? [],
      blocker: null
    },
    reproducibility: {
      status:
        "DETERMINISTIC_EXTRACTION_FROM_CHECKSUM_PINNED_PARENT",
      proofReferences:
        parentPackage.reproducibility
          ?.proofReferences ?? [],
      offlineInput: true,
      blocker: null
    },
    remote: remoteState(key, { uploadReady: false })
  };
  packageRecord.cleanupEligibility =
    initialCleanupEligibility(packageRecord);
  return packageRecord;
}

async function buildEmbeddedLicensePackages({
  repoRoot,
  packages
}) {
  const embeddedPackages = [];
  const parentsWithoutMatchingMembers = [];
  let wheelParentCount = 0;
  for (const parentKind of EMBEDDED_LICENSE_PARENT_KINDS) {
    const parents = packages.filter((packageRecord) =>
      parentKind.packageId
        ? packageRecord.packageId === parentKind.packageId
        : packageRecord.packageType ===
          parentKind.packageType
    );
    if (
      Number.isSafeInteger(parentKind.expectedParentCount) &&
      parents.length !== parentKind.expectedParentCount
    ) {
      throw new Error(
        `EMBEDDED_LICENSE_PARENT_COUNT_MISMATCH: ${parentKind.packageType}: expected ${parentKind.expectedParentCount}, found ${parents.length}`
      );
    }
    if (parentKind.packageType === "MODEL_DEPENDENCY_WHEEL") {
      wheelParentCount += parents.length;
    }
    for (const parentPackage of parents) {
      const archivePath = resolve(
        repoRoot,
        parentPackage.localPath
      );
      const parentDigest = await sha256Path(archivePath);
      if (
        parentDigest !==
        parentPackage.plannedObject.expectedSha256
      ) {
        throw new Error(
          `EMBEDDED_LICENSE_PARENT_CHECKSUM_MISMATCH: ${parentPackage.packageId}`
        );
      }
      const members = await listArchiveMembers({
        archivePath,
        archiveFormat: parentKind.archiveFormat
      });
      let declaredMembers = [];
      if (
        parentKind.packageType ===
        "MODEL_DEPENDENCY_WHEEL"
      ) {
        const metadataMembers = members.filter(
          (memberPath) =>
            /^[^/]+\.dist-info\/METADATA$/.test(
              memberPath
            )
        );
        if (metadataMembers.length !== 1) {
          throw new Error(
            `WHEEL_METADATA_MEMBER_COUNT_INVALID: ${parentPackage.packageId}: ${metadataMembers.length}`
          );
        }
        const metadataMemberPath = metadataMembers[0];
        const metadataBytes = await readArchiveMember({
          archivePath,
          archiveFormat: parentKind.archiveFormat,
          memberPath: metadataMemberPath,
          knownMembers: members
        });
        declaredMembers = declaredWheelLicenseMembers({
          members,
          metadataMemberPath,
          metadataText: metadataBytes.toString("utf8"),
          packageId: parentPackage.packageId
        });
      }
      const fallbackMembers = members.filter(
        (memberPath) =>
          REPOSITORY_LICENSE_FILE_PATTERN.test(
            basename(memberPath)
          )
      );
      const matchingMembers = (
        parentKind.exactMemberPaths
          ? [...parentKind.exactMemberPaths]
          : unique([
              ...declaredMembers,
              ...fallbackMembers
            ])
      ).sort();
      for (const memberPath of matchingMembers) {
        if (!members.includes(memberPath)) {
          throw new Error(
            `EMBEDDED_LICENSE_REQUIRED_MEMBER_MISSING: ${parentPackage.packageId}: ${memberPath}`
          );
        }
      }
      if (matchingMembers.length === 0) {
        parentsWithoutMatchingMembers.push({
          parentPackageId: parentPackage.packageId,
          localPath: parentPackage.localPath,
          archiveFormat: parentKind.archiveFormat,
          reason:
            "The exact archive member listing contains no LICENSE, NOTICE, COPYING, or COPYRIGHT-style file."
        });
      }
      for (const memberPath of matchingMembers) {
        embeddedPackages.push(
          await buildEmbeddedLicensePackage({
            repoRoot,
            parentPackage,
            archiveFormat: parentKind.archiveFormat,
            memberPath,
            memberBytes: await readArchiveMember({
              archivePath,
              archiveFormat: parentKind.archiveFormat,
              memberPath,
              knownMembers: members
            })
          })
        );
      }
    }
  }
  embeddedPackages.sort((left, right) =>
    left.packageId.localeCompare(right.packageId)
  );
  return {
    packages: embeddedPackages,
    discovery: {
      scannedParentPackageCount:
        wheelParentCount + 1,
      scannedWheelPackageCount: wheelParentCount,
      parentPackageWithMatchingMemberCount:
        wheelParentCount +
        1 -
        parentsWithoutMatchingMembers.length,
      parentPackageWithoutMatchingMemberCount:
        parentsWithoutMatchingMembers.length,
      parentsWithoutMatchingMembers,
      extractedMemberPackageCount:
        embeddedPackages.length
    }
  };
}

function repositoryNameForPath(path) {
  const prefix = `${CACHE_RELATIVE_PATH}/repos/`;
  if (!path.startsWith(prefix)) return null;
  return path.slice(prefix.length).split("/")[0] || null;
}

async function buildCriticalFile({
  repoRoot,
  path,
  records
}) {
  const absolutePath = join(repoRoot, path);
  const details = await lstat(absolutePath);
  const digest = await sha256Path(absolutePath);
  const declaredDigests = unique(
    records.map((record) => record.declaredSha256)
  );
  const declaredSizes = unique(
    records.map((record) => record.declaredSizeBytes)
  );
  const integrityStatus =
    (!declaredDigests.length || declaredDigests.includes(digest)) &&
    (!declaredSizes.length || declaredSizes.includes(details.size))
      ? "VERIFIED"
      : "DECLARATION_MISMATCH";
  const repositoryName = repositoryNameForPath(path);
  return {
    path,
    parentPackageId: `git-repository:${repositoryName}`,
    sizeBytes: details.size,
    sha256: digest,
    declaredSha256: declaredDigests,
    declaredSizeBytes: declaredSizes,
    integrityStatus,
    proofReferences: proofReferences(records),
    retentionMode: "IN_PARENT_SOURCE_ARCHIVE",
    duplicateObjectPlanned: false
  };
}

function isCompiledBinary(path) {
  return COMPILED_EXTENSIONS.has(extname(path).toLowerCase());
}

function modelFixtureKind(records, path) {
  if (isCompiledBinary(path)) return null;
  if (
    !records.some((record) =>
      [
        "STD-PVWATTS-V8",
        "STD-SAM-SOLAR-THERMAL",
        "STD-WIND-SAM"
      ].includes(record.standardId)
    )
  ) {
    return null;
  }
  if (/weather|solar|wind/i.test(records.map((record) => record.role).join(" "))) {
    return "WEATHER_OR_RESOURCE_FILE";
  }
  if (/\.csv$|\.srw$/i.test(path)) return "MODEL_RESOURCE_FILE";
  return "OFFICIAL_MODEL_FIXTURE";
}

async function repositoryStatus(repoRoot, path) {
  const relativePath = relativeToRepo(repoRoot, path);
  try {
    await execFileAsync(
      FIXED_GIT_PATH,
      ["-C", repoRoot, "ls-files", "--error-unmatch", "--", relativePath],
      {
        encoding: "utf8",
        env: gitSubprocessEnvironment()
      }
    );
    return "TRACKED";
  } catch {
    return "UNTRACKED";
  }
}

async function normalizedOutputs(repoRoot, packages) {
  const candidates = [
    {
      outputId: "research-database",
      path: `${CACHE_RELATIVE_PATH}/research-database.sqlite`,
      role: "LOCAL_NORMALIZED_DATABASE",
      parentPackageId: "cache-file:research-database.sqlite"
    },
    {
      outputId: "proof-test-database",
      path: `${CACHE_RELATIVE_PATH}/proof/test.sqlite`,
      role: "LOCAL_PROOF_DATABASE_FIXTURE",
      parentPackageId: "cache-file:proof/test.sqlite"
    },
    {
      outputId: "compact-research-database",
      path:
        "docs/operational-savings-automation-research/fixtures/research-database.compact.json",
      role: "COMPACT_NORMALIZED_OUTPUT_FIXTURE",
      parentPackageId:
        "repository-artifact:research-database.compact.json"
    }
  ];
  const output = [];
  for (const candidate of candidates) {
    const absolutePath = join(repoRoot, candidate.path);
    let details;
    try {
      details = await lstat(absolutePath);
    } catch (error) {
      if (error.code === "ENOENT") {
        output.push({
          ...candidate,
          status: "MISSING",
          sizeBytes: null,
          sha256: null,
          repositoryStatus: null,
          sourceOrganization: null,
          s3Uri: null,
          acquisitionTimestamp: null
        });
        continue;
      }
      throw error;
    }
    const parent = candidate.parentPackageId
      ? packages.find(
          (entry) => entry.packageId === candidate.parentPackageId
        )
      : null;
    output.push({
      ...candidate,
      status: "PRESENT",
      sizeBytes: details.size,
      sha256:
        parent?.fingerprint?.digest ?? (await sha256Path(absolutePath)),
      repositoryStatus: await repositoryStatus(repoRoot, absolutePath),
      sourceOrganization:
        parent?.sourceOrganization ?? "RetroFi",
      s3Uri: parent?.s3Uri ?? null,
      acquisitionTimestamp:
        parent?.acquisitionTimestamp ?? null
    });
  }
  return output;
}

async function gitHead(repoRoot) {
  const stdout = await runGit(repoRoot, ["rev-parse", "HEAD"], {
    encoding: "utf8"
  });
  return stdout.trim();
}

function totalPackageCoverage(packages) {
  return packages.reduce(
    (summary, packageRecord) => {
      if (packageRecord.packageType === "PINNED_GIT_REPOSITORY") {
        summary.fileCount += packageRecord.coverage.physicalFileCount;
        summary.totalSizeBytes += packageRecord.coverage.physicalSizeBytes;
      } else {
        summary.fileCount += packageRecord.coverage.fileCount;
        summary.totalSizeBytes += packageRecord.coverage.totalSizeBytes;
      }
      return summary;
    },
    { fileCount: 0, totalSizeBytes: 0 }
  );
}

export async function buildResearchStorageInventory({
  repoRoot = DEFAULT_REPO_ROOT,
  generatedOn = new Date().toISOString().slice(0, 10)
} = {}) {
  const cacheRoot = join(repoRoot, CACHE_RELATIVE_PATH);
  const [cacheEntries, references, standards] = await Promise.all([
    walkFiles(cacheRoot),
    loadProofReferences(repoRoot),
    loadStandards(repoRoot)
  ]);
  const excludedEntries = cacheEntries.filter(
    (entry) =>
      entry.relativePath === ".gitignore" ||
      entry.relativePath.startsWith("migration-staging/") ||
      entry.relativePath.startsWith("migration-trash/")
  );
  const standaloneEntries = cacheEntries.filter(
    (entry) =>
      !excludedEntries.includes(entry) &&
      !entry.relativePath.startsWith("repos/")
  );
  const repositoryNames = (
    await readdir(join(cacheRoot, "repos"), {
      withFileTypes: true
    })
  )
    .filter((entry) => entry.isDirectory())
    .map((entry) => entry.name)
    .sort();

  const filePackages = [];
  for (const entry of standaloneEntries) {
    filePackages.push(
      await buildFilePackage({
        repoRoot,
        entry,
        references,
        standards,
        generatedOn
      })
    );
  }
  const repositoryPackages = [];
  for (const repositoryName of repositoryNames) {
    repositoryPackages.push(
      await buildRepositoryPackage({
        repoRoot,
        repositoryName,
        cacheEntries,
        references,
        standards
      })
    );
  }
  const repositoryLicensePackages = [];
  for (const repositoryPackage of repositoryPackages) {
    repositoryLicensePackages.push(
      ...(await buildRepositoryLicensePackages({
        repoRoot,
        repositoryPackage
      }))
    );
  }
  const outsideCachePackages = [];
  for (const spec of OUTSIDE_CACHE_MIGRATION_SPECS) {
    outsideCachePackages.push(
      await buildOutsideCachePackage({
        repoRoot,
        spec,
        generatedOn
      })
    );
  }
  const cachePackages = [...filePackages, ...repositoryPackages];
  const embeddedLicenseInventory =
    await buildEmbeddedLicensePackages({
      repoRoot,
      packages: cachePackages
    });
  const embeddedLicensePackages =
    embeddedLicenseInventory.packages;
  const packages = [
    ...cachePackages,
    ...outsideCachePackages,
    ...repositoryLicensePackages,
    ...embeddedLicensePackages
  ].sort(
    (left, right) => left.packageId.localeCompare(right.packageId)
  );
  applyActiveConsumerReferences(
    packages,
    await loadResearchConsumerDocuments(repoRoot)
  );

  const nestedReferenceGroups = new Map();
  for (const record of references) {
    const repositoryName = repositoryNameForPath(record.path);
    if (!repositoryName) continue;
    if (
      record.path ===
      `${CACHE_RELATIVE_PATH}/repos/${repositoryName}`
    ) {
      continue;
    }
    const absolutePath = join(repoRoot, record.path);
    try {
      const details = await lstat(absolutePath);
      if (!details.isFile() && !details.isSymbolicLink()) continue;
    } catch (error) {
      if (error.code === "ENOENT") continue;
      throw error;
    }
    const list = nestedReferenceGroups.get(record.path) ?? [];
    list.push(record);
    nestedReferenceGroups.set(record.path, list);
  }

  const proofCriticalFiles = [];
  for (const [path, records] of [...nestedReferenceGroups.entries()].sort(
    ([left], [right]) => left.localeCompare(right)
  )) {
    proofCriticalFiles.push(
      await buildCriticalFile({ repoRoot, path, records })
    );
  }
  for (const file of proofCriticalFiles) {
    const parent = packages.find(
      (packageRecord) =>
        packageRecord.packageId === file.parentPackageId
    );
    Object.assign(file, {
      sourceOrganization:
        parent?.sourceOrganization ?? null,
      s3Uri: parent?.s3Uri ?? null,
      acquisitionTimestamp:
        parent?.acquisitionTimestamp ?? null
    });
  }

  const compiledEntries = cacheEntries.filter(
    (entry) =>
      entry.relativePath.startsWith("repos/") &&
      isCompiledBinary(entry.relativePath)
  );
  const compiledBinaries = [];
  for (const entry of compiledEntries) {
    const path = `${CACHE_RELATIVE_PATH}/${entry.relativePath}`;
    const existing = proofCriticalFiles.find(
      (candidate) => candidate.path === path
    );
    compiledBinaries.push({
      path,
      parentPackageId:
        `git-repository:${repositoryNameForPath(path)}`,
      sizeBytes: entry.sizeBytes,
      sha256: existing?.sha256 ?? (await sha256Path(entry.absolutePath)),
      proofRequired: Boolean(existing),
      proofReferences: existing?.proofReferences ?? [],
      retentionMode: "IN_PARENT_SOURCE_ARCHIVE",
      duplicateObjectPlanned: false
    });
    const compiled = compiledBinaries.at(-1);
    const parent = packages.find(
      (packageRecord) =>
        packageRecord.packageId ===
        compiled.parentPackageId
    );
    Object.assign(compiled, {
      sourceOrganization:
        parent?.sourceOrganization ?? null,
      s3Uri: parent?.s3Uri ?? null,
      acquisitionTimestamp:
        parent?.acquisitionTimestamp ?? null
    });
  }

  const modelFixturesAndResources = proofCriticalFiles
    .map((file) => {
      const records = nestedReferenceGroups.get(file.path) ?? [];
      const kind = modelFixtureKind(records, file.path);
      return kind
        ? {
            ...file,
            resourceKind: kind,
            roles: unique(records.map((record) => record.role)),
            fields: unique(records.map((record) => record.field))
          }
        : null;
    })
    .filter(Boolean);

  const sourceArchiveNeeds = repositoryPackages.map((repository) => ({
    packageId: repository.packageId,
    localPath: repository.localPath,
    sourceCommit: repository.fingerprint.commitSha,
    sourceTree: repository.fingerprint.gitTreeObjectSha1,
    deterministicTreeDigest:
      repository.fingerprint.gitIndexListingSha256,
    archiveFormat: "git-bundle-v2",
    plannedKey: repository.plannedObject.key,
    sourceOrganization: repository.sourceOrganization,
    s3Uri: repository.s3Uri,
    acquisitionTimestamp: repository.acquisitionTimestamp,
    status: "NOT_MATERIALIZED",
    uploadReady: false,
    blocker:
      "Create the deterministic source archive, record its SHA-256 and exact size in this manifest, then review license and upload readiness before execution."
  }));

  const discovered = summarizeEntries(cacheEntries);
  const excluded = summarizeEntries(excludedEntries);
  const inventoried = totalPackageCoverage(cachePackages);
  const coveredFileCount = inventoried.fileCount + excluded.fileCount;
  const coveredSizeBytes =
    inventoried.totalSizeBytes + excluded.totalSizeBytes;
  if (
    coveredFileCount !== discovered.fileCount ||
    coveredSizeBytes !== discovered.totalSizeBytes
  ) {
    throw new Error(
      "INVENTORY_COVERAGE_MISMATCH: discovered cache content is not fully covered"
    );
  }

  const [outputs, ecrDestination] = await Promise.all([
    normalizedOutputs(repoRoot, packages),
    buildResearchEcrInventory({ repoRoot })
  ]);
  const licenseReviewPackageCount = packages.filter(
    (packageRecord) => packageRecord.license.status === "NEEDS_REVIEW"
  ).length;
  const ingestionReviewPackageCount = packages.filter(
    (packageRecord) =>
      packageRecord.ingestion.status ===
      "NOT_DOCUMENTED_IN_PROOF_MANIFEST"
  ).length;
  const originalLocalArtifactsByPath = new Map();
  for (const packageRecord of packages) {
    for (const origin of
      packageRecord.originalLocalArtifacts ?? []) {
      const record = {
        ...origin,
        canonicalPackageId: packageRecord.packageId,
        canonicalLocalPath: packageRecord.localPath,
        plannedS3Uri: packageRecord.s3Uri
      };
      const existing = originalLocalArtifactsByPath.get(
        origin.path
      );
      if (
        existing &&
        (existing.expectedSha256 !== record.expectedSha256 ||
          existing.expectedSizeBytes !==
            record.expectedSizeBytes ||
          existing.canonicalPackageId !==
            record.canonicalPackageId)
      ) {
        throw new Error(
          `ORIGINAL_LOCAL_ARTIFACT_CONFLICT: ${origin.path}`
        );
      }
      originalLocalArtifactsByPath.set(origin.path, record);
    }
  }
  const originalLocalArtifacts = [
    ...originalLocalArtifactsByPath.values()
  ].sort((left, right) => left.path.localeCompare(right.path));
  const localArtifactAudit = await loadLocalArtifactAudit({
    repoRoot,
    originalLocalArtifacts
  });
  assertLocalArtifactAuditWorktree({
    audit: localArtifactAudit,
    repoRoot
  });
  await assertLocalArtifactAuditFresh({
    audit: localArtifactAudit
  });
  const manifest = {
    schemaVersion: STORAGE_SCHEMA_VERSION,
    generatedOn,
    purpose:
      "Plan an immutable, provenance-preserving migration of local operational-savings research inputs without touching production resources.",
    sourceRepository: {
      headCommit: await gitHead(repoRoot),
      cacheRoot: CACHE_RELATIVE_PATH
    },
    destination: {
      status: "AUTHORIZED_NOT_VERIFIED_BY_THIS_INVENTORY",
      s3: {
        accountId: DESTINATION.accountId,
        region: DESTINATION.region,
        bucket: DESTINATION.bucket,
        profile: "retrofi-operational-savings-research",
        roleName: DESTINATION.roleName,
        expectedAssumedRoleArnPattern:
          "arn:aws:sts::945129430686:assumed-role/RetroFiOperationalSavingsResearchRole/*",
        expectedControls: {
          versioning: "Enabled",
          region: DESTINATION.region,
          defaultEncryption: "AES256",
          publicAccessBlock: "ALL_ENABLED",
          objectOwnership: "BucketOwnerEnforced",
          httpsOnlyPolicy: "REQUIRED",
          nonTemporaryObjectExpiration: "NONE"
        },
        bucketControls: null,
        infrastructureStatus: "COORDINATED_EXTERNALLY",
        verificationStatus: "NOT_CHECKED",
        blocker:
          "This local inventory did not call AWS. The first execution must verify the dedicated profile, exact assumed-role ARN, bucket location, versioning, Block Public Access, object ownership, default encryption, HTTPS-only policy, lifecycle retention, object encryption, and checksum behavior before any package can become cleanup-eligible."
      },
      ecr: ecrDestination
    },
    policy: {
      immutableObjects: true,
      overwriteAllowed: false,
      checksumRequired: "SHA-256",
      remoteSizeVerificationRequired: true,
      remoteChecksumVerificationRequired: true,
      cleanupRequiresVerifiedRemoteCopy: true,
      cleanupRequiresRestoredVersionByteProof: true,
      cleanupRequiresCleanCommittedManifest: true,
      cleanupRequiresFinalValidation: true,
      cleanupRequiresNoActiveConsumers: true,
      productionResourcesAllowed: false,
      sourceRepositoryArchivesPreserveGitIdentity: true,
      keyStructure: {
        raw:
          "raw/<source>/<release>/<sha256>/<filename>",
        normalized:
          "normalized/<source>/<release>/<adapter-version>/<filename>",
        modelSupport:
          "model-assets/<model>/<release>/<artifact-version>/<sha256>/<filename>",
        modelInputs:
          "model-inputs/<model>/<release>/<artifact-version>/<sha256>/<filename>",
        modelOutputs:
          "model-outputs/<model>/<release>/<artifact-version>/<sha256>/<filename>",
        databaseExports:
          "database-exports/<source>/<release>/<adapter-version>/<filename>",
        authorizedTopLevelPrefixes: [
          "raw/",
          "normalized/",
          "model-assets/",
          "manual-exports/",
          "model-inputs/",
          "model-outputs/",
          "database-exports/",
          "manifests/",
          "licenses/",
          "temporary/"
        ]
      }
    },
    summary: {
      packageCount: packages.length,
      standalonePackageCount:
        filePackages.length +
        outsideCachePackages.length +
        repositoryLicensePackages.length +
        embeddedLicensePackages.length,
      repositoryPackageCount: repositoryPackages.length,
      repositoryLicenseArtifactPackageCount:
        repositoryLicensePackages.length,
      embeddedLicenseArtifactPackageCount:
        embeddedLicensePackages.length,
      embeddedLicenseScannedParentPackageCount:
        embeddedLicenseInventory.discovery
          .scannedParentPackageCount,
      embeddedLicenseParentWithoutMatchingMemberCount:
        embeddedLicenseInventory.discovery
          .parentPackageWithoutMatchingMemberCount,
      outsideCachePackageCount: outsideCachePackages.length,
      discoveredCacheFileCount: discovered.fileCount,
      discoveredCacheSizeBytes: discovered.totalSizeBytes,
      proofCriticalFileCount: proofCriticalFiles.length,
      compiledBinaryCount: compiledBinaries.length,
      proofRequiredCompiledBinaryCount: compiledBinaries.filter(
        (entry) => entry.proofRequired
      ).length,
      modelFixtureAndResourceCount:
        modelFixturesAndResources.length,
      sourceArchiveNeedCount: sourceArchiveNeeds.length,
      normalizedOutputCount: outputs.length,
      packageLicenseReviewCount: licenseReviewPackageCount,
      packageIngestionReviewCount: ingestionReviewPackageCount,
      originalLocalArtifactCount:
        originalLocalArtifacts.length,
      originalLocalArtifactPendingCleanupCount:
        originalLocalArtifacts.filter(
          (entry) => entry.cleanupStatus === "LOCAL_RETAINED"
        ).length,
      auditedExternalExactFileCount:
        localArtifactAudit.summary.exactChildFileCount,
      auditedExternalDirectoryCount:
        localArtifactAudit.summary.directoryEntryCount
    },
    coverage: {
      discovered,
      inventoriedByPackages: inventoried,
      excludedControlFiles: excludedEntries.map((entry) => ({
        path: `${CACHE_RELATIVE_PATH}/${entry.relativePath}`,
        sizeBytes: entry.sizeBytes,
        reason:
          entry.relativePath === ".gitignore"
            ? "Git ignore control file is committed configuration, not a migratable cache artifact."
            : "Migration staging or deletion-quarantine content is operational state recorded by its owning package, not a standalone research input."
      })),
      coveredFileCount,
      coveredSizeBytes,
      uncoveredPaths: [],
      outsideCache: {
        inclusionMode: "EXACT_ALLOWLIST_ONLY",
        includedPackages: outsideCachePackages.map(
          (packageRecord) => ({
            packageId: packageRecord.packageId,
            path: packageRecord.localPath,
            sizeBytes: packageRecord.coverage.totalSizeBytes,
            sha256: packageRecord.fingerprint.digest
          })
        ),
        excludedScopes: [
          {
            path: "data/",
            reason:
              "Tracked product and taxonomy data is repository source, not operational-savings migration content."
          },
          {
            path: "scripts/research/operational-savings/",
            reason:
              "Adapters, tests, migrations, and control source are retained in Git and are not inferred as migratable merely because they are untracked during development."
          },
          {
            path: "docs/operational-savings-automation-research/",
            reason:
              "Research documentation and proof ledgers remain Git evidence. Only the exact compact database fixture allowlisted above is a migratable derived artifact."
          },
          {
            path: "tmp/",
            reason:
              "Unrelated rendering and inspection scratch files are not research source artifacts."
          }
        ]
      }
    },
    packages,
    repositoryLicenseArtifacts:
      repositoryLicensePackages.map((packageRecord) => ({
        packageId: packageRecord.packageId,
        parentPackageId: packageRecord.parentPackageId,
        localPath: packageRecord.localPath,
        repositoryIdentity:
          packageRecord.repositoryIdentity,
        sizeBytes:
          packageRecord.plannedObject.expectedSizeBytes,
        sha256:
          packageRecord.plannedObject.expectedSha256,
        spdxExpression:
          packageRecord.license.spdxExpression,
        licenseRole: packageRecord.license.licenseRole,
        s3Uri: packageRecord.s3Uri
      })),
    embeddedLicenseArtifacts:
      embeddedLicensePackages.map((packageRecord) => ({
        packageId: packageRecord.packageId,
        parentPackageId: packageRecord.parentPackageId,
        localPath: packageRecord.localPath,
        embeddedMember: packageRecord.embeddedMember,
        stagedLocalPath:
          packageRecord.plannedObject.localFilePath,
        sizeBytes:
          packageRecord.plannedObject.expectedSizeBytes,
        sha256:
          packageRecord.plannedObject.expectedSha256,
        licenseRole: packageRecord.license.licenseRole,
        plannedKey: packageRecord.plannedObject.key,
        s3Uri: packageRecord.s3Uri
      })),
    embeddedLicenseDiscovery:
      embeddedLicenseInventory.discovery,
    embeddedLicenseExtractionNeeds:
      embeddedLicensePackages.map((packageRecord) => ({
        packageId: packageRecord.packageId,
        parentPackageId: packageRecord.parentPackageId,
        parentLocalPath: packageRecord.localPath,
        archiveFormat:
          packageRecord.embeddedMember.archiveFormat,
        memberPath:
          packageRecord.embeddedMember.memberPath,
        stagedLocalPath:
          packageRecord.plannedObject.localFilePath,
        expectedSizeBytes:
          packageRecord.plannedObject.expectedSizeBytes,
        expectedSha256:
          packageRecord.plannedObject.expectedSha256,
        plannedKey: packageRecord.plannedObject.key,
        status: "NOT_MATERIALIZED",
        uploadReady: false
      })),
    proofCriticalFiles,
    compiledBinaries,
    modelFixturesAndResources,
    sourceArchiveNeeds,
    normalizedDatabaseAndOutputFixtures: outputs,
    originalLocalArtifacts,
    localArtifactAudit,
    execution: {
      awsCallsPerformedByInventory: false,
      uploadsPerformed: false,
      localFilesDeleted: false,
      finalCleanupValidation: {
        status: "NOT_RUN",
        validationCommand: null,
        validatedAt: null,
        validatedSourceCommit: null,
        validatedRepositoryTreeDigest: null,
        repositoryTreeDigestSchemaVersion:
          "git-ls-tree-r-nul-v1",
        repositoryTreeDigestExcludedPaths: [
          DEFAULT_MANIFEST_RELATIVE_PATH,
          DEFAULT_REPORT_RELATIVE_PATH
        ],
        noActiveConsumersConfirmed: false,
        packageCount: packages.length
      },
      lastHydration: null
    }
  };
  manifest.canonicalInventory = {
    schemaVersion:
      "operational-savings/canonical-inventory-identity-v1",
    packageCount: manifest.packages.length,
    contentSha256:
      canonicalInventoryContentSha256(manifest)
  };
  manifest.manifestContentSha256 = sha256CanonicalJson(manifest);
  return manifest;
}

function formatBytes(bytes) {
  if (!Number.isFinite(bytes)) return "n/a";
  const units = ["B", "KiB", "MiB", "GiB", "TiB"];
  let value = bytes;
  let index = 0;
  while (value >= 1024 && index < units.length - 1) {
    value /= 1024;
    index += 1;
  }
  return `${value.toFixed(index === 0 ? 0 : 2)} ${units[index]}`;
}

function markdownTable(headers, rows) {
  const line = (cells) =>
    `| ${cells.map((cell) => String(cell).replaceAll("|", "\\|")).join(" | ")} |`;
  return [
    line(headers),
    line(headers.map(() => "---")),
    ...rows.map((row) => line(row))
  ].join("\n");
}

function auditedCleanupResults(manifest) {
  return new Map(
    (
      manifest.execution?.auditedLocalArtifactCleanup?.results ?? []
    ).map((record) => [record.originalPath, record])
  );
}

function effectiveAuditCleanupStatus({
  manifest,
  record,
  executionResults
}) {
  const executionResult = executionResults.get(
    record.originalPath
  );
  if (executionResult) return executionResult.cleanupStatus;
  const migratedOriginal = (
    manifest.originalLocalArtifacts ?? []
  ).find((candidate) => candidate.path === record.originalPath);
  return (
    migratedOriginal?.cleanupStatus ??
    record.cleanupStatus
  );
}

function effectiveAuditGroupStatus(group, records) {
  if (records.length === 0) return group.cleanupStatus;
  const statuses = unique(
    records
      .filter((record) => record.groupId === group.groupId)
      .map((record) => record.cleanupStatus)
  );
  if (statuses.length === 0) return group.cleanupStatus;
  if (statuses.length === 1) return statuses[0];
  if (
    statuses.some((status) => status === "LOCAL_RETAINED") ||
    statuses.some((status) =>
      status.startsWith("LOCAL_RETAINED_")
    )
  ) {
    return "PARTIAL_LOCAL_CLEANUP";
  }
  return "LOCAL_CLEANUP_COMPLETE";
}

const PACKAGE_LOCAL_DELETED_STATUS =
  "LOCAL_DELETED_AFTER_REMOTE_VERIFICATION";
const PACKAGE_LOCAL_DELETED_STATUSES = new Set([
  PACKAGE_LOCAL_DELETED_STATUS,
  "LOCAL_DELETED_WITH_PARENT_REPOSITORY"
]);
const AUDITED_LOCAL_REMOVED_STATUSES = new Set([
  "LOCAL_DELETED_AFTER_VERIFICATION",
  "LOCAL_IMAGE_REMOVED_AFTER_ECR_VERIFICATION"
]);

function packageS3VerificationStatus(packageRecord) {
  return (
    packageRecord.remote?.s3?.verificationStatus ??
    "NOT_RECORDED"
  );
}

function packageS3Version(packageRecord) {
  return packageRecord.remote?.s3?.versionId ?? "none";
}

function packageLocalStatus(packageRecord) {
  if (
    packageRecord.hydration?.status ===
    "HYDRATED_FROM_VERIFIED_S3_VERSION"
  ) {
    return "LOCAL_HYDRATED_FROM_VERIFIED_S3_VERSION";
  }
  return (
    packageRecord.remote?.s3?.deletionStatus ??
    "LOCAL_STATUS_NOT_RECORDED"
  );
}

function packageIsStillLocal(packageRecord) {
  return !PACKAGE_LOCAL_DELETED_STATUSES.has(
    packageLocalStatus(packageRecord)
  );
}

function packageHasRestoredByteProof(packageRecord) {
  const remoteVersion = packageRecord.remote?.s3?.versionId;
  const cleanup = packageRecord.cleanupEligibility;
  const byteProofVerified =
    packageS3VerificationStatus(packageRecord) === "VERIFIED" &&
    typeof remoteVersion === "string" &&
    remoteVersion.length > 0 &&
    cleanup?.restoredVersionId === remoteVersion &&
    cleanup?.restoredSha256 ===
      packageRecord.plannedObject?.expectedSha256;
  if (
    !byteProofVerified ||
    packageRecord.packageType !==
      "PINNED_GIT_REPOSITORY"
  ) {
    return byteProofVerified;
  }
  return (
    cleanup.repositorySemanticRestoreStatus ===
      "VERIFIED" &&
    cleanup.restoredRepositoryIdentity?.commitSha ===
      packageRecord.fingerprint?.commitSha &&
    cleanup.restoredRepositoryIdentity
      ?.gitTreeObjectSha1 ===
      packageRecord.fingerprint
        ?.gitTreeObjectSha1 &&
    cleanup.restoredRepositoryIdentity
      ?.gitIndexListingSha256 ===
      packageRecord.fingerprint
        ?.gitIndexListingSha256 &&
    cleanup.restoredRepositoryIdentity
      ?.workingTreeClean === true
  );
}

function packageLocalReason(packageRecord) {
  const localStatus = packageLocalStatus(packageRecord);
  if (PACKAGE_LOCAL_DELETED_STATUSES.has(localStatus)) {
    return localStatus ===
      "LOCAL_DELETED_WITH_PARENT_REPOSITORY"
      ? "The logical license package was independently verified in S3, then its local bytes were deleted by the verified parent repository cleanup."
      : "The local package was deleted after exact-version S3 verification.";
  }
  if (
    localStatus === "LOCAL_HYDRATED_FROM_VERIFIED_S3_VERSION"
  ) {
    return "The package was restored locally from its exact verified S3 version and requires a new cleanup validation.";
  }
  if (
    packageRecord.localRetentionPolicy ===
    "RETAIN_SOURCE_CONTROLLED_FIXTURE"
  ) {
    return "The source-controlled fixture remains in Git by explicit retention policy.";
  }
  if (packageS3VerificationStatus(packageRecord) !== "VERIFIED") {
    return "The local package remains until exact S3 verification succeeds.";
  }
  if (!packageHasRestoredByteProof(packageRecord)) {
    return "The local package remains until its exact S3 version passes a restored-byte proof.";
  }
  if (packageRecord.cleanupEligibility?.status !== "ELIGIBLE") {
    return (
      packageRecord.cleanupEligibility?.blocker ??
      "The local package remains until final cleanup validation succeeds."
    );
  }
  return "The package is cleanup-eligible, but local cleanup has not completed.";
}

function originalArtifactIsStillLocal(record) {
  return (
    record.cleanupStatus !==
    PACKAGE_LOCAL_DELETED_STATUS
  );
}

function originalArtifactLocalReason(manifest, record) {
  const packageRecord = (manifest.packages ?? []).find(
    (candidate) =>
      candidate.packageId === record.canonicalPackageId
  );
  if (!packageRecord) {
    return "The original artifact remains because its canonical package record is unavailable.";
  }
  return packageLocalReason(packageRecord);
}

function auditedArtifactIsStillLocal(record) {
  return !AUDITED_LOCAL_REMOVED_STATUSES.has(
    record.cleanupStatus
  );
}

function auditedArtifactLocalReason(record, executionResults) {
  const executionResult = executionResults.get(
    record.originalPath
  );
  const retainedReason =
    executionResult?.verification?.retainedReason;
  if (retainedReason) return retainedReason;
  return (
    record.cleanupReason ??
    record.cleanupPrerequisite ??
    "The audited local artifact has no recorded cleanup completion."
  );
}

function ecrLocalVerificationStatus(repository) {
  return (
    repository.localImage?.verificationStatus ??
    repository.verificationStatus ??
    "NOT_RECORDED"
  );
}

function ecrRemoteVerificationStatus(repository) {
  return (
    repository.remoteImage?.verificationStatus ??
    repository.verificationStatus ??
    "NOT_RECORDED"
  );
}

function ecrRemoteDigest(repository) {
  return (
    repository.remoteImage?.imageDigest ??
    repository.imageDigest ??
    null
  );
}

function packagePublicationMetadataBlockers(packageRecord) {
  const blockers = [];
  if (
    typeof packageRecord.sourceOrganization !== "string" ||
    !packageRecord.sourceOrganization.trim()
  ) {
    blockers.push("sourceOrganization");
  }
  if (
    typeof packageRecord.acquisitionTimestamp !== "string" ||
    !Number.isFinite(
      Date.parse(packageRecord.acquisitionTimestamp)
    )
  ) {
    blockers.push("acquisitionTimestamp");
  }
  for (const field of [
    "source",
    "release",
    "acquisition",
    "license",
    "ingestion"
  ]) {
    const value = packageRecord[field];
    if (
      !value ||
      value.blocker ||
      value.status === "NEEDS_REVIEW" ||
      value.status === "NOT_DOCUMENTED_IN_PROOF_MANIFEST"
    ) {
      blockers.push(field);
    }
  }
  if (!packageRecord.release?.identities?.length) {
    blockers.push("release.identities");
  }
  if (
    packageRecord.source?.status === "DOCUMENTED" &&
    !packageRecord.source.urls?.length
  ) {
    blockers.push("source.urls");
  }
  if (
    packageRecord.source?.status === "DOCUMENTED" &&
    !packageRecord.license?.statements?.length
  ) {
    blockers.push("license.statements");
  }
  if (
    packageRecord.content?.sourceDeclarations
      ?.verificationStatus === "DECLARATION_MISMATCH"
  ) {
    blockers.push("content.sourceDeclarations");
  }
  return unique(blockers);
}

export function buildResearchStorageReport(manifest) {
  const packages = manifest.packages ?? [];
  const repositories = packages.filter(
    (entry) => entry.packageType === "PINNED_GIT_REPOSITORY"
  );
  const repositoryLicenseArtifacts = packages.filter(
    (entry) =>
      entry.packageType === "REPOSITORY_LICENSE_ARTIFACT"
  );
  const embeddedLicenseArtifacts = packages.filter(
    (entry) =>
      entry.packageType === "EMBEDDED_LICENSE_ARTIFACT"
  );
  const standalone = packages.filter(
    (entry) =>
      ![
        "PINNED_GIT_REPOSITORY",
        "REPOSITORY_LICENSE_ARTIFACT",
        "EMBEDDED_LICENSE_ARTIFACT"
      ].includes(entry.packageType)
  );
  const ecr = manifest.destination?.ecr ?? {
    repositories: [],
    blocker: "No ECR destination is recorded."
  };
  const ecrRepositories = ecr.repositories ?? [];
  const locallyVerifiedRepositories = ecrRepositories.filter(
    (entry) =>
      ecrLocalVerificationStatus(entry) ===
      "PASS_COMMITTED_POST_HOC_REPLAY"
  );
  const remotelyVerifiedRepositories = ecrRepositories.filter(
    (entry) =>
      ecrRemoteVerificationStatus(entry) ===
      "VERIFIED_EXACT_DIGEST"
  );
  const localArtifactAudit = manifest.localArtifactAudit ?? {
    artifactGroups: [],
    sourcePath: null,
    sourceSha256: null
  };
  const originalLocalArtifacts =
    manifest.originalLocalArtifacts ?? [];
  const auditExecutionResults = auditedCleanupResults(manifest);
  const auditedExactFiles =
    localArtifactAudit.artifactGroups.flatMap(
      (group) =>
        (group.childFiles ?? []).map((record) => {
          const inherited = inheritedAuditRecord(group, record);
          return {
            ...inherited,
            cleanupStatus: effectiveAuditCleanupStatus({
              manifest,
              record: inherited,
              executionResults: auditExecutionResults
            })
          };
        })
    );
  const auditedDirectories =
    localArtifactAudit.artifactGroups.flatMap(
      (group) =>
        (group.directoryEntries ?? []).map((record) => {
          const inherited = inheritedAuditRecord(group, record);
          return {
            ...inherited,
            cleanupStatus: effectiveAuditCleanupStatus({
              manifest,
              record: inherited,
              executionResults: auditExecutionResults
            })
          };
        })
    );
  const auditedRecords = [
    ...auditedExactFiles,
    ...auditedDirectories
  ];
  const auditedCleanup =
    manifest.execution?.auditedLocalArtifactCleanup ?? null;
  const auditedKnownExactFiles = auditedDirectories.flatMap(
    (directory) =>
      (directory.knownExactFiles ?? []).map((record) => ({
        groupId: directory.groupId,
        parentPath: directory.originalPath,
        ...record
      }))
  );
  const pendingSourceArchives = repositories.filter(
    (entry) =>
      entry.plannedObject?.uploadReady !== true ||
      entry.plannedObject?.state === "SOURCE_ARCHIVE_REQUIRED"
  );
  const pendingEmbeddedLicenseExtractions =
    embeddedLicenseArtifacts.filter(
      (entry) =>
        entry.plannedObject?.uploadReady !== true ||
        entry.plannedObject?.state ===
          "EMBEDDED_LICENSE_EXTRACTION_REQUIRED"
    );
  const uploadReadyPackages = packages.filter(
    (entry) => entry.plannedObject?.uploadReady === true
  );
  const s3VerifiedPackages = packages.filter(
    (entry) =>
      packageS3VerificationStatus(entry) === "VERIFIED" &&
      packageS3Version(entry) !== "none"
  );
  const restoredPackages = packages.filter(
    packageHasRestoredByteProof
  );
  const cleanupEligiblePackages = packages.filter(
    (entry) => entry.cleanupEligibility?.status === "ELIGIBLE"
  );
  const locallyDeletedPackages = packages.filter(
    (entry) =>
      PACKAGE_LOCAL_DELETED_STATUSES.has(
        packageLocalStatus(entry)
      )
  );
  const pendingDeletablePackages = packages.filter(
    (entry) =>
      [
        "DELETE_AFTER_VERIFIED_MIGRATION",
        "DELETE_WITH_PARENT_REPOSITORY"
      ].includes(entry.localRetentionPolicy) &&
      packageIsStillLocal(entry)
  );
  const retainedPolicyPackages = packages.filter(
    (entry) =>
      entry.localRetentionPolicy ===
        "RETAIN_SOURCE_CONTROLLED_FIXTURE" &&
      packageIsStillLocal(entry)
  );
  const publicationMetadataBlockedPackages = packages.filter(
    (entry) =>
      packagePublicationMetadataBlockers(entry).length > 0
  );
  const originalPaths = new Set(
    originalLocalArtifacts.map((entry) => entry.path)
  );
  const pendingOriginalArtifacts =
    originalLocalArtifacts.filter(originalArtifactIsStillLocal);
  const pendingAuditedArtifacts = auditedRecords.filter(
    (entry) =>
      auditedArtifactIsStillLocal(entry) &&
      !originalPaths.has(entry.originalPath) &&
      entry.cleanupStatus !==
        "LOCAL_RETAINED_SHARED_BUILDKIT_NO_BROAD_PRUNE"
  );
  const intentionallyRetainedAuditedArtifacts =
    auditedRecords.filter(
      (entry) =>
        entry.cleanupStatus ===
        "LOCAL_RETAINED_SHARED_BUILDKIT_NO_BROAD_PRUNE"
    );
  const finalCleanupValidation =
    manifest.execution?.finalCleanupValidation ?? {
      status: "NOT_RECORDED"
    };
  const lastEcrRestoreReplay =
    manifest.execution?.lastEcrRestoreReplay ?? null;
  let ecrRestoreReplayComplete = false;
  let ecrRestoreReplayBlocker = null;
  try {
    assertCurrentEcrRestoreReceipt({
      manifest,
      receipt: lastEcrRestoreReplay,
      specs: DESTINATION.ecrRepositories,
      accountId: DESTINATION.accountId,
      region: DESTINATION.region,
      principalArnPattern: RESEARCH_ROLE_ARN_PATTERN,
      requireFullValidation: true,
      requireLocalCleanup: true,
      requireDurableArtifacts: true
    });
    ecrRestoreReplayComplete = true;
  } catch (error) {
    ecrRestoreReplayBlocker = error.message;
  }
  const s3Destination = manifest.destination?.s3 ?? {};
  const s3DestinationVerified =
    s3Destination.verificationStatus ===
    "CALLER_AND_BUCKET_CONTROLS_VERIFIED";
  const ecrPublicationIncomplete =
    ecrRepositories.length === 0 ||
    remotelyVerifiedRepositories.length <
      locallyVerifiedRepositories.length ||
    ecrRepositories.some(
      (entry) =>
        ecrLocalVerificationStatus(entry) !==
        "PASS_COMMITTED_POST_HOC_REPLAY"
    );
  const s3DestinationBlocker = s3DestinationVerified
    ? null
    : typeof s3Destination.blocker === "string" &&
        s3Destination.blocker.trim()
      ? s3Destination.blocker
      : `The S3 destination verification status is ${s3Destination.verificationStatus ?? "NOT_RECORDED"}.`;
  const ecrStateBlocker = !ecrPublicationIncomplete
    ? null
    : typeof ecr.blocker === "string" && ecr.blocker.trim()
      ? ecr.blocker
      : ecrRepositories.length === 0
        ? "No research ECR repository state is recorded."
        : remotelyVerifiedRepositories.length <
            locallyVerifiedRepositories.length
          ? `${locallyVerifiedRepositories.length - remotelyVerifiedRepositories.length} locally verified model images do not have an exact-digest ECR verification record.`
          : "One or more configured model repositories do not have a passing local build and exact-digest ECR verification record.";
  const currentBlockers = [
    s3DestinationBlocker,
    ecrStateBlocker,
    publicationMetadataBlockedPackages.length > 0
      ? `${publicationMetadataBlockedPackages.length} package entries have incomplete publication metadata.`
      : null,
    pendingSourceArchives.length > 0
      ? `${pendingSourceArchives.length} pinned repositories still require deterministic source archives.`
      : null,
    pendingEmbeddedLicenseExtractions.length > 0
      ? `${pendingEmbeddedLicenseExtractions.length} embedded license members still require deterministic extraction.`
      : null,
    uploadReadyPackages.length < packages.length
      ? `${packages.length - uploadReadyPackages.length} packages are not upload-ready.`
      : null,
    s3VerifiedPackages.length < packages.length
      ? `${packages.length - s3VerifiedPackages.length} packages do not have an exact verified S3 version recorded.`
      : null,
    restoredPackages.length < packages.length
      ? `${packages.length - restoredPackages.length} packages do not have a matching restored-byte proof.`
      : null,
    finalCleanupValidation.status !== "PASSED"
      ? `Final cleanup validation status is ${finalCleanupValidation.status}.`
      : null,
    !ecrRestoreReplayComplete
      ? "No complete final ECR restore, full offline validation, and exact local-image removal receipt is recorded."
      : null,
    pendingDeletablePackages.length > 0
      ? `${pendingDeletablePackages.length} deletable packages still have local copies.`
      : null,
    pendingOriginalArtifacts.length > 0
      ? `${pendingOriginalArtifacts.length} original temporary artifacts still have local copies.`
      : null,
    pendingAuditedArtifacts.length > 0
      ? `${pendingAuditedArtifacts.length} audited nonpackage artifacts still require cleanup.`
      : null
  ].filter(Boolean);
  const s3DestinationStatusText = s3DestinationVerified
    ? "The dedicated S3 caller identity and bucket controls are recorded as verified."
    : typeof s3Destination.blocker === "string" &&
        s3Destination.blocker.trim()
      ? `S3 execution context verification is pending: ${s3Destination.blocker}`
      : `S3 execution context status is \`${s3Destination.verificationStatus ?? "NOT_RECORDED"}\`, and no blocker text is recorded.`;
  const cacheRoot = manifest.sourceRepository?.cacheRoot ?? null;
  const outsideCachePackages = cacheRoot
    ? packages.filter(
        (entry) =>
          entry.localPath !== cacheRoot &&
          !String(entry.localPath ?? "").startsWith(
            `${cacheRoot}/`
          )
      )
    : packages.filter(
        (entry) =>
          entry.coverage?.mode ===
          "EXACT_ALLOWLISTED_REPOSITORY_FILE"
      );
  const licenseReviewPackages = packages.filter(
    (entry) =>
      entry.license?.blocker ||
      entry.license?.status === "NEEDS_REVIEW"
  );
  const ingestionReviewPackages = packages.filter(
    (entry) =>
      entry.ingestion?.blocker ||
      entry.ingestion?.status ===
        "NOT_DOCUMENTED_IN_PROOF_MANIFEST"
  );
  const proofCriticalFiles = manifest.proofCriticalFiles ?? [];
  const compiledBinaries = manifest.compiledBinaries ?? [];
  const modelFixturesAndResources =
    manifest.modelFixturesAndResources ?? [];
  const normalizedDatabaseAndOutputFixtures =
    manifest.normalizedDatabaseAndOutputFixtures ?? [];
  const discoveredCoverage = manifest.coverage?.discovered ?? {};
  const uncoveredPaths = manifest.coverage?.uncoveredPaths ?? [];
  const plannedTopLevelPrefixes = unique(
    packages
      .map((entry) => entry.plannedObject?.key?.split("/")[0])
      .filter(Boolean)
      .map((prefix) => `${prefix}/`)
  ).sort();
  const stillLocalArtifacts = [
    ...packages
      .filter(packageIsStillLocal)
      .map((entry) => ({
        kind: entry.packageType,
        path:
          entry.packageType ===
          "EMBEDDED_LICENSE_ARTIFACT"
            ? `${entry.localPath}!/${entry.embeddedMember?.memberPath ?? "unknown-member"}`
            : entry.localPath,
        status: packageLocalStatus(entry),
        reason: packageLocalReason(entry)
      })),
    ...pendingOriginalArtifacts.map((entry) => ({
      kind: "ORIGINAL_LOCAL_ARTIFACT",
      path: entry.path,
      status: entry.cleanupStatus,
      reason: originalArtifactLocalReason(manifest, entry)
    })),
    ...auditedRecords
      .filter(
        (entry) =>
          auditedArtifactIsStillLocal(entry) &&
          !originalPaths.has(entry.originalPath)
      )
      .map((entry) => ({
        kind: entry.artifactType,
        path: entry.originalPath,
        status: entry.cleanupStatus,
        reason: auditedArtifactLocalReason(
          entry,
          auditExecutionResults
        )
      }))
  ].sort((left, right) =>
    String(left.path ?? "").localeCompare(
      String(right.path ?? "")
    )
  );
  const lines = [
    "# Operational savings research storage migration",
    "",
    `Generated from repository commit \`${manifest.sourceRepository?.headCommit ?? "not recorded"}\` on ${manifest.generatedOn ?? "an unrecorded date"}.`,
    "",
    "This report renders the migration, verification, and cleanup state currently recorded in the manifest.",
    "",
    "Rendering this report does not call AWS, upload data, delete local files, deploy software, or change production resources.",
    "",
    "## Destination status",
    "",
    `The authorized research S3 destination is \`${s3Destination.bucket ?? "not recorded"}\` in account \`${s3Destination.accountId ?? "not recorded"}\` and region \`${s3Destination.region ?? "not recorded"}\`.`,
    "",
    `The only accepted CLI profile is \`${s3Destination.profile ?? "not recorded"}\`, and execution must resolve to the dedicated \`${s3Destination.roleName ?? "not recorded"}\` assumed role.`,
    "",
    s3DestinationStatusText,
    "",
    `The planned IAM role is \`${s3Destination.roleName ?? "not recorded"}\`.`,
    "",
    "Raw artifacts, probes, and source archives use `raw/<source>/<release>/<sha256>/<filename>`.",
    "",
    "Exact repository license and notice files use `licenses/<repository>/<release>/<sha256>/<repository-relative-path>`.",
    "",
    "Normalized source-inspection outputs use `normalized/<source>/<release>/<adapter-version>/<filename>`.",
    "",
    "Database files and compact exports use `database-exports/<source>/<release>/<adapter-version>/<filename>`.",
    "",
    "Exact-allowlisted model build manifests, dependency locks, and derived PDF inspection renders use immutable `model-assets/<model>/<release>/<artifact-version>/<sha256>/<filename>` keys.",
    "",
    "Model inputs and outputs use parallel immutable `model-inputs/...` and `model-outputs/...` keys.",
    "",
    plannedTopLevelPrefixes.length > 0
      ? `Current planned package keys use ${plannedTopLevelPrefixes.map((prefix) => `\`${prefix}\``).join(", ")}.`
      : "No planned package object keys are recorded.",
    "",
    ecrRepositories.length > 0
      ? `The ECR repository names are ${ecrRepositories.map((entry) => `\`${entry.repositoryName ?? "not recorded"}\``).join(", ")}.`
      : "No ECR repository state is recorded.",
    "",
    `${locallyVerifiedRepositories.length} runnable research container ${locallyVerifiedRepositories.length === 1 ? "image has" : "images have"} a passing committed post-hoc exact-context replay receipt.`,
    "",
    ecr.postHocReplayReceipt?.status ===
    "PASS_COMMITTED_POST_HOC_REPLAY"
      ? `The replay receipt is committed and content-bound at source context \`${ecr.postHocReplayReceipt.receipt.contextGitCommit}\`. It explicitly does not attest that the current source context produced the historical image. The receipt is unsigned, unauthenticated, and forgeable by any repository writer. Its hashes detect stale or corrupt content only under the recorded honest-local-operator trust model.`
      : `The four-model post-hoc replay receipt status is \`${ecr.postHocReplayReceipt?.status ?? "NOT_RECORDED"}\`. Historical build-manifest PASS records are not treated as current exact-context verification.`,
    "",
    "Inventory generation did not query the local Docker daemon, so it does not independently reconfirm that a recorded local image is still present.",
    "",
    `${remotelyVerifiedRepositories.length} ECR ${remotelyVerifiedRepositories.length === 1 ? "publication has" : "publications have"} a complete exact-digest verification record.`,
    "",
    remotelyVerifiedRepositories.length === 0
      ? "No exact-digest-verified ECR publication is recorded."
      : "Recorded ECR evidence is copied from the corresponding build manifest, and inventory generation did not independently call AWS.",
    "",
    markdownTable(
      [
        "Model",
        "Source",
        "Source commit",
        "Model version",
        "Purpose",
        "License",
        "Build-manifest SHA-256",
        "Build context",
        "Exact input-set SHA-256",
        "Build manifest",
        "Local verification",
        "Local tag",
        "Remote verification",
        "Remote digest",
        "Scan",
        "Findings C/H/M/L"
      ],
      ecrRepositories.map((entry) => [
        entry.modelId ?? entry.repositoryName ?? "not recorded",
        entry.provenance?.sourceRepository ?? "not recorded",
        entry.provenance?.sourceCommit ?? "not recorded",
        entry.provenance?.modelVersion ?? "not recorded",
        entry.provenance?.purpose ?? "not recorded",
        entry.provenance?.license
          ? `${entry.provenance.license.identifier} (${entry.provenance.license.status})`
          : "not recorded",
        entry.provenance?.buildManifestSha256 ??
          "not recorded",
        entry.buildManifest?.buildEvidence
          ?.buildContextProvenance?.status ??
          "not recorded",
        entry.buildManifest?.buildEvidence
          ?.contentBinding?.completeInputSetSha256 ??
          "not recorded",
        entry.buildManifest?.status ?? "NOT_RECORDED",
        ecrLocalVerificationStatus(entry),
        entry.localImage?.imageTag ??
          entry.imageTag ??
          "none",
        ecrRemoteVerificationStatus(entry),
        ecrRemoteDigest(entry) ?? "none",
        entry.remoteImage?.scan?.status ?? "none",
        entry.remoteImage?.scan
          ? [
              entry.remoteImage.scan.critical,
              entry.remoteImage.scan.high,
              entry.remoteImage.scan.medium,
              entry.remoteImage.scan.low
            ].join("/")
          : "none"
      ])
    ),
    "",
    "## Final ECR restore and local cleanup receipt",
    "",
    ecrRestoreReplayComplete
      ? `The final exact-digest ECR restore completed at \`${lastEcrRestoreReplay.completedAt}\`, all offline model replays and the exact bound full validation passed, each exact ECR digest reference was removed, and every corresponding image ID was absent afterward.`
      : `No complete current exact-digest ECR restore and local cleanup receipt is recorded. Validation blocker: ${ecrRestoreReplayBlocker ?? "receipt not recorded"}.`,
    "",
    lastEcrRestoreReplay?.images?.length
      ? markdownTable(
          [
            "Model",
            "Exact image URI",
            "Platform",
            "Pull",
            "Replay",
            "Live exact scan",
            "License evidence objects",
            "License evidence set SHA-256",
            "Durable evidence SHA-256",
            "Local cleanup"
          ],
          lastEcrRestoreReplay.images.map((image) => [
            image.modelId,
            image.imageUri,
            image.targetPlatform,
            image.pullStatus,
            image.replayStatus,
            image.liveEcr?.exactDigestScan
              ?.recordedEvidenceMatched === true
              ? `MATCHED ${image.liveEcr.exactDigestScan.critical}/${image.liveEcr.exactDigestScan.high}/${image.liveEcr.exactDigestScan.medium}/${image.liveEcr.exactDigestScan.low}`
              : "not recorded",
            image.durableArtifactEvidence?.licenseEvidence
              ?.entryCount ?? "not recorded",
            image.licenseEvidenceSetSha256 ??
              "not recorded",
            image.durableArtifactEvidenceSha256 ??
              "not recorded",
            image.localCleanupStatus
          ])
        )
      : "No final ECR restore image rows are recorded.",
    "",
    "## Inventory summary",
    "",
    markdownTable(
      ["Measure", "Count or size"],
      [
        ["Logical migration packages", packages.length],
        ["Standalone files and databases", standalone.length],
        ["Pinned repository packages", repositories.length],
        [
          "Independent repository license objects",
          repositoryLicenseArtifacts.length
        ],
        [
          "Independent embedded license objects",
          embeddedLicenseArtifacts.length
        ],
        [
          "Embedded-license parent packages scanned",
          manifest.embeddedLicenseDiscovery
            ?.scannedParentPackageCount ?? 0
        ],
        [
          "Embedded-license parents without matching members",
          manifest.embeddedLicenseDiscovery
            ?.parentPackageWithoutMatchingMemberCount ?? 0
        ],
        [
          "Exact-allowlisted packages outside the cache",
          outsideCachePackages.length
        ],
        [
          "Discovered cache files",
          discoveredCoverage.fileCount ?? "not recorded"
        ],
        [
          "Exact logical cache size",
          Number.isFinite(discoveredCoverage.totalSizeBytes)
            ? `${discoveredCoverage.totalSizeBytes} bytes (${formatBytes(discoveredCoverage.totalSizeBytes)})`
            : "not recorded"
        ],
        ["Proof-critical nested files", proofCriticalFiles.length],
        ["Compiled binaries", compiledBinaries.length],
        [
          "Proof-required compiled binaries",
          compiledBinaries.filter((entry) => entry.proofRequired)
            .length
        ],
        [
          "Model fixtures and resource files",
          modelFixturesAndResources.length
        ],
        ["Source archives still needed", pendingSourceArchives.length],
        ["Upload-ready packages", uploadReadyPackages.length],
        [
          "Packages with exact verified S3 versions",
          s3VerifiedPackages.length
        ],
        [
          "Packages with matching restored-byte proofs",
          restoredPackages.length
        ],
        [
          "Cleanup-eligible packages",
          cleanupEligiblePackages.length
        ],
        [
          "Packages deleted locally after verification",
          locallyDeletedPackages.length
        ],
        [
          "Deletable packages still local",
          pendingDeletablePackages.length
        ],
        [
          "Source-controlled packages retained by policy",
          retainedPolicyPackages.length
        ],
        [
          "Normalized database and output fixtures",
          normalizedDatabaseAndOutputFixtures.length
        ],
        [
          "Packages needing license metadata review",
          licenseReviewPackages.length
        ],
        [
          "Packages needing ingestion metadata review",
          ingestionReviewPackages.length
        ],
        [
          "Packages with incomplete publication metadata",
          publicationMetadataBlockedPackages.length
        ],
        [
          "Original temporary artifacts linked to canonical packages",
          originalLocalArtifacts.length
        ],
        [
          "Original temporary artifacts pending cleanup",
          pendingOriginalArtifacts.length
        ],
        [
          "Audited external exact files and local images",
          auditedExactFiles.length
        ],
        [
          "Audited external directory or cache aggregates",
          auditedDirectories.length
        ],
        [
          "Audited nonpackage artifacts pending cleanup",
          pendingAuditedArtifacts.length
        ],
        [
          "Audited shared artifacts retained intentionally",
          intentionallyRetainedAuditedArtifacts.length
        ],
        [
          "Exact-digest-verified ECR publications",
          remotelyVerifiedRepositories.length
        ]
      ]
    ),
    "",
    uncoveredPaths.length === 0
      ? "The manifest records complete cache coverage through exact-file packages, recursive repository packages, or explicit operational control-file exclusions."
      : `The manifest records ${uncoveredPaths.length} uncovered cache paths.`,
    "",
    uncoveredPaths.length === 0
      ? "The uncovered path list is empty."
      : `The uncovered paths are ${uncoveredPaths.map((path) => `\`${path}\``).join(", ")}.`,
    "",
    "Outside `.cache`, migration discovery is exact-allowlist-only.",
    "",
    `${outsideCachePackages.length} current outside-cache packages are exact-allowlisted in the manifest.`,
    "",
    "Tracked product data, adapters, tests, migrations, documentation, proof ledgers, and all temporary files not on that exact allowlist remain excluded from inference-based migration.",
    "",
    "## Pinned repository packages",
    "",
    markdownTable(
      [
        "Repository",
        "Physical files",
        "Physical size",
        "Commit",
        "Git tree",
        "Archive status",
        "S3 URI",
        "Exact version",
        "S3 verification",
        "Local policy",
        "Local status",
        "Local reason"
      ],
      repositories.map((entry) => [
        entry.localPath,
        entry.coverage?.physicalFileCount ?? "not recorded",
        Number.isFinite(entry.coverage?.physicalSizeBytes)
          ? `${entry.coverage.physicalSizeBytes} bytes (${formatBytes(entry.coverage.physicalSizeBytes)})`
          : "not recorded",
        entry.fingerprint?.commitSha ?? "not recorded",
        entry.fingerprint?.gitTreeObjectSha1 ?? "not recorded",
        entry.plannedObject?.state ?? "NOT_RECORDED",
        entry.remote?.s3?.s3Uri ?? entry.s3Uri ?? "none",
        packageS3Version(entry),
        packageS3VerificationStatus(entry),
        entry.localRetentionPolicy ?? "NOT_RECORDED",
        packageLocalStatus(entry),
        packageLocalReason(entry)
      ])
    ),
    "",
    "Each repository parent entry covers every file under the clone, including local Git metadata for footprint accounting.",
    "",
    "The planned source archives contain the exact pinned Git tree and intentionally omit `.git` metadata.",
    "",
    "For a repository archive, the canonical key's SHA-256 segment is the deterministic Git index-listing digest shown in the manifest, while the materialized tar file receives a separate exact object-byte SHA-256 before upload.",
    "",
    "Before archive upload and repository cleanup, each source archive must be materialized, checksummed, sized, reviewed, uploaded without overwrite, and verified remotely.",
    "",
    "## Independent repository license objects",
    "",
    "Each row is an independently uploaded exact-byte license or notice object and a logical child of its pinned repository package.",
    "",
    "The parent repository remains the only owner of the local bytes, so these logical children do not double-count cache coverage or delete files separately from the verified parent cleanup.",
    "",
    "License and notice material embedded in independently stored Scout wheels and the exact OR-Tools archive is deterministically extracted into separate immutable `licenses/` objects while remaining byte-owned by its parent package for cache coverage and cleanup.",
    "",
    markdownTable(
      [
        "Repository path",
        "Role",
        "SPDX summary",
        "Commit",
        "Bytes",
        "SHA-256",
        "Planned immutable key",
        "S3 verification",
        "Parent package"
      ],
      repositoryLicenseArtifacts.map((entry) => [
        entry.repositoryIdentity?.repositoryRelativePath ??
          entry.localPath,
        entry.license?.licenseRole ?? "not recorded",
        entry.license?.spdxExpression ?? "not recorded",
        entry.repositoryIdentity?.commitSha ?? "not recorded",
        entry.plannedObject?.expectedSizeBytes ?? "not recorded",
        entry.plannedObject?.expectedSha256 ?? "not recorded",
        entry.plannedObject?.key ?? "not recorded",
        packageS3VerificationStatus(entry),
        entry.parentPackageId ?? "not recorded"
      ])
    ),
    "",
    "## Independent embedded license objects",
    "",
    "The inventory scans all 34 checksum-pinned Scout wheels plus the exact OR-Tools binary archive.",
    "",
    `${manifest.embeddedLicenseDiscovery?.parentPackageWithoutMatchingMemberCount ?? 0} scanned parent package lacks a matching LICENSE, NOTICE, COPYING, or COPYRIGHT-style member.`,
    "",
    (manifest.embeddedLicenseDiscovery
      ?.parentsWithoutMatchingMembers ?? []).length > 0
      ? `Parents without matching members: ${(manifest.embeddedLicenseDiscovery?.parentsWithoutMatchingMembers ?? []).map((entry) => `\`${entry.localPath}\``).join(", ")}.`
      : "Every scanned parent package contains at least one matching member.",
    "",
    markdownTable(
      [
        "Parent package",
        "Archive member",
        "Role",
        "Bytes",
        "SHA-256",
        "Extraction state",
        "Planned immutable key",
        "S3 verification"
      ],
      embeddedLicenseArtifacts.map((entry) => [
        entry.parentPackageId ?? "not recorded",
        entry.embeddedMember?.memberPath ?? "not recorded",
        entry.license?.licenseRole ?? "not recorded",
        entry.plannedObject?.expectedSizeBytes ?? "not recorded",
        entry.plannedObject?.expectedSha256 ?? "not recorded",
        entry.plannedObject?.state ?? "not recorded",
        entry.plannedObject?.key ?? "not recorded",
        packageS3VerificationStatus(entry)
      ])
    ),
    "",
    "## Standalone migration packages",
    "",
    markdownTable(
      [
        "Type",
        "Path",
        "Size",
        "SHA-256",
        "Planned immutable key",
        "S3 URI",
        "Exact version",
        "S3 verification",
        "Local policy",
        "Local status",
        "Local reason"
      ],
      standalone.map((entry) => [
        entry.packageType,
        entry.localPath,
        Number.isFinite(entry.coverage?.totalSizeBytes)
          ? `${entry.coverage.totalSizeBytes} bytes`
          : "not recorded",
        entry.fingerprint?.digest ?? "not recorded",
        entry.plannedObject?.key ?? "not recorded",
        entry.remote?.s3?.s3Uri ?? entry.s3Uri ?? "none",
        packageS3Version(entry),
        packageS3VerificationStatus(entry),
        entry.localRetentionPolicy ?? "NOT_RECORDED",
        packageLocalStatus(entry),
        packageLocalReason(entry)
      ])
    ),
    "",
    "## Artifacts still local",
    "",
    stillLocalArtifacts.length > 0
      ? "Every package, original temporary artifact, and audited nonpackage artifact still recorded as local is listed below with its exact recorded reason."
      : "No migratable package, original temporary artifact, or audited nonpackage artifact is still recorded as local.",
    "",
    stillLocalArtifacts.length > 0
      ? markdownTable(
          ["Kind", "Path", "Local status", "Reason"],
          stillLocalArtifacts.map((entry) => [
            entry.kind ?? "NOT_RECORDED",
            entry.path ?? "not recorded",
            entry.status ?? "NOT_RECORDED",
            entry.reason
          ])
        )
      : "No local artifact rows remain.",
    "",
    "## Original temporary artifacts linked to canonical packages",
    "",
    "Every row below identifies the original temporary byte source for a canonical cache package.",
    "",
    "An original temporary artifact is retained until its canonical package has an exact S3 version, restored-byte proof, a committed manifest, successful final validation, and no active consumer.",
    "",
    markdownTable(
      [
        "Original path",
        "Bytes",
        "SHA-256",
        "Canonical path",
        "Planned S3 URI",
        "Cleanup",
        "Local reason"
      ],
      originalLocalArtifacts.map((entry) => [
        entry.path,
        entry.expectedSizeBytes,
        entry.expectedSha256,
        entry.canonicalLocalPath,
        entry.plannedS3Uri,
        entry.cleanupStatus,
        originalArtifactLocalReason(manifest, entry)
      ])
    ),
    "",
    "## Complete external local artifact audit",
    "",
    localArtifactAudit.sourcePath
      ? `The committed audit source is \`${localArtifactAudit.sourcePath}\` with SHA-256 \`${localArtifactAudit.sourceSha256 ?? "not recorded"}\`.`
      : "No committed external local artifact audit is recorded.",
    "",
    "The audit excludes active contractor-enrichment, CSLB, opportunity-program, operating-system, and application artifacts that are outside this operational-savings task.",
    "",
    auditedCleanup
      ? `The latest audited nonpackage cleanup status is \`${auditedCleanup.status ?? "NOT_RECORDED"}\`, with ${auditedCleanup.summary?.deletedPathCount ?? 0} exact filesystem paths deleted, ${auditedCleanup.summary?.removedDockerImageCount ?? 0} exact local research images removed, and ${auditedCleanup.summary?.retainedSharedCacheCount ?? 0} shared cache retained without broad pruning.`
      : "No audited nonpackage cleanup execution is recorded.",
    "",
    "Cleanup outcomes are recorded in the migration manifest as an execution overlay, while the committed audit remains the immutable pre-cleanup inventory.",
    "",
    markdownTable(
      [
        "Group",
        "Disposition",
        "Exact children",
        "Directory aggregates",
        "Cleanup"
      ],
      localArtifactAudit.artifactGroups.map(
        (group) => [
          group.groupId,
          group.disposition,
          group.childFiles?.length ?? 0,
          group.directoryEntries?.length ?? 0,
          effectiveAuditGroupStatus(group, auditedRecords)
        ]
      )
    ),
    "",
    "### Exact external files and local images",
    "",
    markdownTable(
      [
        "Group",
        "Original path",
        "Type",
        "Bytes",
        "SHA-256 or image digest",
        "Disposition",
        "Canonical linkage",
        "Cleanup",
        "Local reason"
      ],
      auditedExactFiles.map((entry) => [
        entry.groupId,
        entry.originalPath,
        entry.artifactType,
        entry.byteSize,
        entry.sha256,
        entry.disposition,
        entry.canonicalPackageLinkage ?? "none",
        entry.cleanupStatus,
        auditedArtifactLocalReason(
          entry,
          auditExecutionResults
        )
      ])
    ),
    "",
    "### External directory and shared-cache aggregates",
    "",
    markdownTable(
      [
        "Group",
        "Original path",
        "Type",
        "Files",
        "Symlinks",
        "Logical bytes",
        "Disposition",
        "Reason",
        "Cleanup"
      ],
      auditedDirectories.map((entry) => [
        entry.groupId,
        entry.originalPath,
        entry.artifactType,
        entry.fileCount,
        entry.symlinkCount,
        entry.logicalBytes ?? entry.reportedTotalSize ?? "unknown",
        entry.disposition,
        auditedArtifactLocalReason(
          entry,
          auditExecutionResults
        ),
        entry.cleanupStatus
      ])
    ),
    "",
    "### Known exact files inside directory aggregates",
    "",
    auditedKnownExactFiles.length
      ? markdownTable(
          [
            "Group",
            "Parent",
            "Original path",
            "Bytes",
            "SHA-256",
            "Canonical path"
          ],
          auditedKnownExactFiles.map((entry) => [
            entry.groupId,
            entry.parentPath,
            entry.originalPath,
            entry.byteSize,
            entry.sha256,
            entry.canonicalCachePath ?? "none"
          ])
        )
      : "No additional exact nested files were recorded.",
    "",
    "## Proof-required compiled binaries",
    ""
  ];
  if (
    compiledBinaries.some((entry) => entry.proofRequired)
  ) {
    lines.push(
      markdownTable(
        ["Path", "Size", "SHA-256", "Parent package"],
        compiledBinaries
          .filter((entry) => entry.proofRequired)
          .map((entry) => [
            entry.path,
            `${entry.sizeBytes} bytes`,
            entry.sha256,
            entry.parentPackageId
          ])
      )
    );
  } else {
    lines.push("No compiled binary is currently referenced by a retained proof.");
  }
  lines.push(
    "",
    "All other discovered shared libraries remain covered by their repository parent package and are listed in the JSON manifest.",
    "",
    "Proof-critical binaries are not planned as duplicate S3 objects.",
    "",
    "## Official model fixtures and resources",
    "",
    markdownTable(
      ["Kind", "Path", "Size", "SHA-256", "Roles"],
      modelFixturesAndResources.map((entry) => [
        entry.resourceKind,
        entry.path,
        `${entry.sizeBytes} bytes`,
        entry.sha256,
        entry.roles.join(", ") || "fixture"
      ])
    ),
    "",
    "These files remain children of their pinned repository archives.",
    "",
    "## Pinned repository source archive state",
    "",
    markdownTable(
      [
        "Package",
        "Commit",
        "Tree digest",
        "Planned key",
        "Archive state",
        "Upload ready",
        "S3 verification",
        "Exact version"
      ],
      repositories.map((entry) => [
        entry.packageId,
        entry.fingerprint?.commitSha ?? "not recorded",
        entry.fingerprint?.gitIndexListingSha256 ??
          "not recorded",
        entry.plannedObject?.key ?? "not recorded",
        entry.plannedObject?.state ?? "NOT_RECORDED",
        entry.plannedObject?.uploadReady === true
          ? "yes"
          : "no",
        packageS3VerificationStatus(entry),
        packageS3Version(entry)
      ])
    ),
    "",
    "## Normalized databases and output fixtures",
    "",
    markdownTable(
      ["Role", "Path", "Status", "Size", "SHA-256", "Git status"],
      normalizedDatabaseAndOutputFixtures.map((entry) => [
        entry.role,
        entry.path,
        entry.status,
        entry.sizeBytes ?? "n/a",
        entry.sha256 ?? "n/a",
        entry.repositoryStatus ?? "n/a"
      ])
    ),
    "",
    "## Upload, verification, and cleanup gates",
    "",
    "The companion CLI is dry-run-only unless `--execute` is supplied.",
    "",
    "Repository source packages are prepared locally with `git bundle`, an exclusive final-path link, exact size, and SHA-256 recording before they become upload-ready.",
    "",
    "Hydration clones the verified bundle, checks out the pinned commit, restores the recorded origin URL, and rejects any commit, tree, index-listing, or clean-tree mismatch.",
    "",
    "Execution requires an explicitly named research profile, the exact authorized research bucket, region, and one package identifier.",
    "",
    "Known production, management, legacy, and generic profiles are rejected.",
    "",
    "An existing object is never overwritten.",
    "",
    "An existing object is accepted only when remote size, SHA-256 metadata, and the S3 checksum all match the manifest.",
    "",
    "A new upload uses an S3 conditional write and is re-read with checksum mode enabled before it is considered verified.",
    "",
    "Execution verifies the research account and assumed role, bucket location, versioning, all four Block Public Access controls, BucketOwnerEnforced ownership, AES256 default encryption, the HTTPS-only bucket policy, and lifecycle retention for every non-temporary prefix before object access.",
    "",
    "Every uploaded object must independently report server-side encryption, a durable version ID, exact length, SHA-256 metadata, and the S3 SHA-256 checksum.",
    "",
    "Verification restores each exact recorded S3 version into a mode-0600 temporary file, hashes the restored bytes, compares exact size and SHA-256, and removes only that temporary restore.",
    "",
    "The batch workflow prepares all repository archives, uploads all packages, verifies all exact remote versions, and writes one manifest update per phase.",
    "",
    "Final cleanup eligibility requires a clean committed manifest with every exact remote version and restored-byte proof, one successful recorded final tests/build command, explicit confirmation that no consumer is active, and an unchanged tracked repository tree digest excluding only the fixed migration manifest and derived migration report.",
    "",
    "Cleanup-all preflights every local package and exact-version remote restore before any deletion starts.",
    "",
    "Repository cleanup additionally rechecks the exact commit, Git tree, deterministic index digest, and clean working tree before removing the clone and its staged archive.",
    "",
    `${retainedPolicyPackages.length} source-controlled package ${retainedPolicyPackages.length === 1 ? "copy remains" : "copies remain"} local by policy, independently of the exact S3 verification state shown above.`,
    "",
    "The restore command hydrates a deleted exact file or extracts a pinned repository archive without overwrite, then invalidates cleanup eligibility until final validation is run again.",
    "",
    "The final ECR restore mode requires accepted images to be absent before pulling, keeps every exact image present for the fixed full offline validation, binds one replay receipt to that exact validation, removes only each exact ECR digest reference, and succeeds only when the corresponding image ID is absent afterward.",
    "",
    "## Current blockers",
    "",
    currentBlockers.length === 0
      ? "No current migration blocker is recorded."
      : currentBlockers.map((blocker) => `- ${blocker}`).join("\n\n"),
    "",
    `${cleanupEligiblePackages.length} packages are cleanup-eligible, ${locallyDeletedPackages.length} package copies are recorded as deleted after remote verification, and ${pendingDeletablePackages.length} deletable package copies remain local.`,
    "",
    currentBlockers.length === 0
      ? "All required migration and cleanup gates recorded in this manifest are complete, and every intentionally retained local artifact is listed above with its reason."
      : `${currentBlockers.length} migration or cleanup blockers remain recorded in this manifest.`,
    ""
  );
  return lines.join("\n");
}
