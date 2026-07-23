import crypto from "node:crypto";
import fs from "node:fs";
import fsPromises from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { pathToFileURL } from "node:url";

import {
  CONTRACTOR_SOURCE_BUCKET,
  CONTRACTORS_TABLE,
  DEFAULT_MAPPING_PATH,
  DYNAMODB_REGION,
  EXPECTED_AWS_ACCOUNT_ID,
  EXPECTED_AWS_PROFILE,
  S3_REGION,
  buildContractorItem,
  parseCslbSource,
} from "./import-cslb-contractors.mjs";
import {
  createAwsAdapter,
  loadClassificationMapping,
} from "./enrich-contractor-directories.mjs";

const CORE_CSLB_FIELDS = [
  "schemaVersion",
  "contractorId",
  "licenseNumber",
  "businessName",
  "licenseStatus",
  "primaryStatus",
  "secondaryStatus",
  "pendingSuspension",
  "pendingClassRemoval",
  "pendingClassReplace",
  "licenseIssueDate",
  "licenseExpirationDate",
  "licenseClassifications",
  "matchedClassificationCodes",
  "supportedRetrofitIds",
  "businessAddress",
  "phone",
];
const STRING_ARRAY_FIELDS = [
  "licenseClassifications",
  "matchedClassificationCodes",
  "supportedRetrofitIds",
  "serviceAreas",
  "programMemberships",
];

export async function verifyContractorDirectoryProductionWrite(
  options,
  dependencies = {},
) {
  const profile =
    options.profile ||
    process.env.AWS_PROFILE ||
    EXPECTED_AWS_PROFILE;
  if (profile !== EXPECTED_AWS_PROFILE) {
    throw new Error(
      `Verification requires AWS profile ${EXPECTED_AWS_PROFILE}.`,
    );
  }
  const pass2ReportPath = path.resolve(options.pass2Report);
  const resolutionProposalPath = path.resolve(
    options.resolutionProposal,
  );
  const resolutionWriteReportPath = path.resolve(
    options.resolutionWriteReport,
  );
  const outputPath = path.resolve(options.output);
  const [pass2Report, proposal, resolutionWriteReport] =
    await Promise.all([
      readJson(pass2ReportPath),
      readJson(resolutionProposalPath),
      readJson(resolutionWriteReportPath),
    ]);
  const artifactHashes = {
    pass2WriteReportSha256: await sha256File(pass2ReportPath),
    resolutionProposalSha256: await sha256File(
      resolutionProposalPath,
    ),
    resolutionWriteReportSha256: await sha256File(
      resolutionWriteReportPath,
    ),
  };

  const aws =
    dependencies.aws ||
    createAwsAdapter({
      bucketName: CONTRACTOR_SOURCE_BUCKET,
      profile,
      s3Region: S3_REGION,
      tableName: CONTRACTORS_TABLE,
      tableRegion: DYNAMODB_REGION,
    });
  const accountId = await aws.getAccountId();
  if (accountId !== EXPECTED_AWS_ACCOUNT_ID) {
    throw new Error(
      `Verification requires AWS account ${EXPECTED_AWS_ACCOUNT_ID}.`,
    );
  }
  await aws.assertInfrastructure();
  const temporaryDirectory = await fsPromises.mkdtemp(
    path.join(os.tmpdir(), "retrofi-contractor-verification-"),
  );

  try {
    const [contractors, cslbSource, mapping] = await Promise.all([
      aws.scanContractors(),
      aws.downloadLatestCslbSource(temporaryDirectory),
      loadClassificationMapping(
        options.mappingPath || DEFAULT_MAPPING_PATH,
      ),
    ]);
    const parsed = await parseCslbSource(cslbSource.localPath);
    const rawByLicense = parsed.contractorsByLicense;
    const coreMismatches = [];
    const duplicateArrays = [];
    let emailCount = 0;

    for (const contractor of contractors) {
      if (contractor.email) emailCount += 1;
      const raw = rawByLicense.get(contractor.licenseNumber);
      if (!raw) {
        addBounded(coreMismatches, {
          contractorIdToken: token(contractor.contractorId),
          field: "missing_raw_cslb_record",
        });
        continue;
      }
      const expected = buildContractorItem(raw, mapping, {
        importId: cslbSource.importId,
        importedAt: contractor.importedAt,
        s3SourceKey: cslbSource.s3Key,
        sourceReceivedAt: cslbSource.sourceReceivedAt,
      });
      for (const field of CORE_CSLB_FIELDS) {
        if (
          stableStringify(contractor[field]) !==
          stableStringify(expected[field])
        ) {
          addBounded(coreMismatches, {
            contractorIdToken: token(contractor.contractorId),
            field,
          });
        }
      }
      for (const field of STRING_ARRAY_FIELDS) {
        if (hasDuplicateValues(contractor[field])) {
          addBounded(duplicateArrays, {
            contractorIdToken: token(contractor.contractorId),
            field,
          });
        }
      }
      if (
        hasDuplicateValues(
          contractor.certifications,
          certificationKey,
        )
      ) {
        addBounded(duplicateArrays, {
          contractorIdToken: token(contractor.contractorId),
          field: "certifications",
        });
      }
      if (
        hasDuplicateValues(
          contractor.enrichmentEvidence,
          evidenceKey,
        )
      ) {
        addBounded(duplicateArrays, {
          contractorIdToken: token(contractor.contractorId),
          field: "enrichmentEvidence",
        });
      }
    }

    const existingById = new Map(
      contractors.map((contractor) => [
        contractor.contractorId,
        contractor,
      ]),
    );
    const resolutionChecks = verifyResolutionProposal({
      existingById,
      proposal,
    });
    const pass2Samples = sanitizedSamples(
      contractors.filter((contractor) =>
        (contractor.enrichmentEvidence || []).some(
          (evidence) => evidence.sourceId !== "cslb",
        ),
      ),
      [
        "email",
        "servesCommercial",
        "serviceAreas",
        "programMemberships",
        "certifications",
      ],
    );
    const cslbPatchSamples = sanitizedSamples(
      contractors,
      [
        "primaryStatus",
        "secondaryStatus",
        "pendingSuspension",
        "pendingClassRemoval",
        "pendingClassReplace",
        "businessAddress",
      ],
    );
    const resolutionSamples = sanitizedSamples(
      proposal.updates
        .map((update) => existingById.get(update.contractorId))
        .filter(Boolean),
      [
        "email",
        "servesCommercial",
        "serviceAreas",
        "programMemberships",
        "certifications",
      ],
    );

    const checks = {
      accountMatches:
        accountId === EXPECTED_AWS_ACCOUNT_ID,
      approvedProposalHashMatches:
        proposal.proposalHash ===
        resolutionWriteReport.proposalHash,
      arraysDeduplicated: duplicateArrays.length === 0,
      contractorCountMatches:
        contractors.length ===
        pass2Report.combinedTotals.proposedCslbPatchUpdates,
      coreCslbFieldsPreserved: coreMismatches.length === 0,
      noNewContractors:
        pass2Report.writeSummary.insertedContractorCount === 0 &&
        resolutionWriteReport.writeSummary.insertedContractors === 0,
      pass2UpdateCountMatches:
        pass2Report.writeSummary.updatedContractorCount ===
        pass2Report.combinedTotals.proposedCslbPatchUpdates,
      resolutionUpdateCountMatches:
        resolutionWriteReport.writeSummary.updatedContractors ===
        proposal.updates.length,
      resolutionValuesVerified:
        resolutionChecks.failedChecks.length === 0,
      unresolvedEntriesNotWritten:
        proposal.newItems.length === 0 &&
        resolutionWriteReport.results.unresolvedEntries === 59,
    };
    const report = {
      schemaVersion:
        "contractor-directory-production-verification.v1",
      verifiedAt: new Date().toISOString(),
      accountId,
      resources: {
        bucket: CONTRACTOR_SOURCE_BUCKET,
        table: CONTRACTORS_TABLE,
      },
      artifactHashes,
      writeReports: {
        pass2: {
          runId: pass2Report.runId,
          proposalHash: pass2Report.proposalHash,
          updatedContractors:
            pass2Report.writeSummary.updatedContractorCount,
          insertedContractors:
            pass2Report.writeSummary.insertedContractorCount,
          awsWriteCount: pass2Report.awsWriteCount,
        },
        resolution: {
          runId: resolutionWriteReport.runId,
          proposalHash: resolutionWriteReport.proposalHash,
          approvedUpdates:
            resolutionWriteReport.writeSummary
              .approvedExistingContractorUpdates,
          updatedContractors:
            resolutionWriteReport.writeSummary.updatedContractors,
          insertedContractors:
            resolutionWriteReport.writeSummary.insertedContractors,
          conflictingFields:
            resolutionWriteReport.writeSummary.conflictingFields,
          skippedContractorUpdates:
            resolutionWriteReport.writeSummary
              .skippedContractorUpdates,
          awsWriteCount: resolutionWriteReport.awsWriteCount,
        },
      },
      table: {
        contractorCount: contractors.length,
        emailCount,
        cslbSourceSha256: cslbSource.sha256,
        coreMismatchCount: coreMismatches.length,
        duplicateArrayCount: duplicateArrays.length,
      },
      resolutionFields: resolutionChecks.summary,
      checks,
      sanitizedSamples: {
        cslbPatches: cslbPatchSamples,
        pass2Enrichment: pass2Samples,
        resolutionEnrichment: resolutionSamples,
      },
      boundedFailures: {
        coreMismatches,
        duplicateArrays,
        resolution: resolutionChecks.failedChecks,
      },
      verificationReportS3Key: options.uploadKey || undefined,
    };
    report.overallPassed = Object.values(checks).every(Boolean);
    await fsPromises.mkdir(path.dirname(outputPath), {
      recursive: true,
    });
    await fsPromises.writeFile(
      outputPath,
      `${JSON.stringify(report, null, 2)}\n`,
    );
    if (!report.overallPassed) {
      throw new Error(
        `Production verification failed. See ${outputPath}.`,
      );
    }
    if (options.uploadKey) {
      await aws.uploadJson(options.uploadKey, report);
    }
    return { report, outputPath };
  } finally {
    await fsPromises.rm(temporaryDirectory, {
      force: true,
      recursive: true,
    });
  }
}

function verifyResolutionProposal({ existingById, proposal }) {
  const failedChecks = [];
  const fieldCounts = {};
  let conflictingEmailCount = 0;
  let existingEmailsPreserved = true;

  for (const update of proposal.updates) {
    const contractor = existingById.get(update.contractorId);
    if (!contractor) {
      addBounded(failedChecks, {
        contractorIdToken: token(update.contractorId),
        field: "missing_contractor",
      });
      continue;
    }
    const conflictingFields = new Set();
    for (const field of Object.keys(update.set).filter(
      (candidate) => candidate !== "enrichmentEvidence",
    )) {
      fieldCounts[field] = (fieldCounts[field] || 0) + 1;
      if (isArrayField(field)) {
        const additions = approvedAdditions(
          update.expected[field],
          update.set[field],
        );
        if (
          !additions.every((value) =>
            includesStable(contractor[field], value),
          )
        ) {
          addBounded(failedChecks, {
            contractorIdToken: token(update.contractorId),
            field,
          });
        }
      } else if (
        stableStringify(contractor[field]) !==
        stableStringify(update.set[field])
      ) {
        conflictingFields.add(field);
        if (field === "email") {
          conflictingEmailCount += 1;
          existingEmailsPreserved &&= Boolean(contractor.email);
        } else {
          addBounded(failedChecks, {
            contractorIdToken: token(update.contractorId),
            field,
          });
        }
      }
    }
    const evidenceAdditions = approvedAdditions(
      update.expected.enrichmentEvidence,
      update.set.enrichmentEvidence,
    );
    for (const evidence of evidenceAdditions) {
      const present = includesStable(
        contractor.enrichmentEvidence,
        evidence,
      );
      if (conflictingFields.has(evidence.field)) {
        if (present) {
          existingEmailsPreserved = false;
          addBounded(failedChecks, {
            contractorIdToken: token(update.contractorId),
            field: `${evidence.field}_conflict_evidence`,
          });
        }
      } else if (!present) {
        addBounded(failedChecks, {
          contractorIdToken: token(update.contractorId),
          field: `${evidence.field}_evidence`,
        });
      }
    }
  }

  return {
    failedChecks,
    summary: {
      approvedUpdateCount: proposal.updates.length,
      approvedFieldCounts: fieldCounts,
      conflictingEmailCount,
      existingEmailsPreserved,
    },
  };
}

function sanitizedSamples(records, fields) {
  return [...records]
    .sort((left, right) =>
      String(left.contractorId).localeCompare(
        String(right.contractorId),
      ),
    )
    .slice(0, 5)
    .map((record) => ({
      contractorIdToken: token(record.contractorId),
      fields: Object.fromEntries(
        fields.map((field) => [
          field,
          Array.isArray(record[field])
            ? { count: record[field].length }
            : { present: Boolean(record[field]) },
        ]),
      ),
    }));
}

function approvedAdditions(expectedValue, approvedValue) {
  const expected = new Set(
    (Array.isArray(expectedValue) ? expectedValue : []).map(
      stableStringify,
    ),
  );
  return (Array.isArray(approvedValue)
    ? approvedValue
    : []
  ).filter((value) => !expected.has(stableStringify(value)));
}

function isArrayField(field) {
  return [
    "certifications",
    "programMemberships",
    "serviceAreas",
  ].includes(field);
}

function includesStable(values, expected) {
  return (Array.isArray(values) ? values : []).some(
    (value) =>
      stableStringify(value) === stableStringify(expected),
  );
}

function hasDuplicateValues(values, keyFor = stableStringify) {
  if (!Array.isArray(values)) return false;
  return new Set(values.map(keyFor)).size !== values.length;
}

function certificationKey(value) {
  return `${clean(value?.issuer).toUpperCase()}|${clean(
    value?.name,
  ).toUpperCase()}`;
}

function evidenceKey(value) {
  return [
    value?.field,
    value?.sourceId,
    value?.sourceUrl,
    value?.sourceValue,
    value?.verificationDate,
  ].join("|");
}

function addBounded(values, value) {
  if (values.length < 50) values.push(value);
}

function token(value) {
  return crypto
    .createHash("sha256")
    .update(String(value || ""))
    .digest("hex")
    .slice(0, 12);
}

function clean(value) {
  return String(value || "").replace(/\s+/g, " ").trim();
}

function stableStringify(value) {
  if (Array.isArray(value)) {
    return `[${value.map(stableStringify).join(",")}]`;
  }
  if (value && typeof value === "object") {
    return `{${Object.keys(value)
      .sort()
      .map(
        (key) =>
          `${JSON.stringify(key)}:${stableStringify(value[key])}`,
      )
      .join(",")}}`;
  }
  return JSON.stringify(value);
}

async function readJson(filePath) {
  return JSON.parse(await fsPromises.readFile(filePath, "utf8"));
}

async function sha256File(filePath) {
  const hash = crypto.createHash("sha256");
  for await (const chunk of fs.createReadStream(filePath)) {
    hash.update(chunk);
  }
  return hash.digest("hex");
}

function parseArgs(argv) {
  const options = {
    mappingPath: "",
    output: "",
    pass2Report: "",
    profile: "",
    resolutionProposal: "",
    resolutionWriteReport: "",
    uploadKey: "",
  };
  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index];
    if (arg === "--pass2-report") {
      options.pass2Report = requiredArg(argv, ++index, arg);
    } else if (arg === "--resolution-proposal") {
      options.resolutionProposal = requiredArg(argv, ++index, arg);
    } else if (arg === "--resolution-write-report") {
      options.resolutionWriteReport = requiredArg(
        argv,
        ++index,
        arg,
      );
    } else if (arg === "--output") {
      options.output = requiredArg(argv, ++index, arg);
    } else if (arg === "--upload-key") {
      options.uploadKey = requiredArg(argv, ++index, arg);
    } else if (arg === "--mapping") {
      options.mappingPath = requiredArg(argv, ++index, arg);
    } else if (arg === "--profile") {
      options.profile = requiredArg(argv, ++index, arg);
    } else if (arg === "--help" || arg === "-h") {
      options.help = true;
    } else {
      throw new Error(`Unknown argument: ${arg}`);
    }
  }
  return options;
}

function requiredArg(argv, index, flag) {
  const value = argv[index];
  if (!value || value.startsWith("--")) {
    throw new Error(`${flag} requires a value.`);
  }
  return value;
}

function printHelp() {
  console.log(`Verify the contractor-directory production writes.

Usage:
  node scripts/verify-contractor-directory-production-write.mjs \\
    --profile retrofi-prod \\
    --pass2-report <write-report> \\
    --resolution-proposal <proposal> \\
    --resolution-write-report <write-report> \\
    --output <verification-report> \\
    [--upload-key <s3-key>]`);
}

async function main() {
  const options = parseArgs(process.argv.slice(2));
  if (options.help) {
    printHelp();
    return;
  }
  for (const field of [
    "pass2Report",
    "resolutionProposal",
    "resolutionWriteReport",
    "output",
  ]) {
    if (!options[field]) {
      throw new Error(`Missing required option: ${field}.`);
    }
  }
  const result = await verifyContractorDirectoryProductionWrite(
    options,
  );
  console.log(JSON.stringify(result.report, null, 2));
}

const isEntrypoint =
  process.argv[1] &&
  import.meta.url === pathToFileURL(path.resolve(process.argv[1])).href;
if (isEntrypoint) {
  main().catch((error) => {
    console.error(error?.stack || error?.message || error);
    process.exitCode = 1;
  });
}
