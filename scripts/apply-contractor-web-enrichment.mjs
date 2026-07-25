import crypto from "node:crypto";
import { execFile } from "node:child_process";
import fs from "node:fs";
import fsPromises from "node:fs/promises";
import path from "node:path";
import readline from "node:readline";
import { promisify } from "node:util";
import { pathToFileURL } from "node:url";

import {
  DescribeTableCommand,
  DynamoDBClient,
} from "@aws-sdk/client-dynamodb";
import {
  BatchGetCommand,
  DynamoDBDocumentClient,
  ScanCommand,
  UpdateCommand,
} from "@aws-sdk/lib-dynamodb";
import {
  GetObjectCommand,
  HeadBucketCommand,
  HeadObjectCommand,
  PutObjectCommand,
  S3Client,
} from "@aws-sdk/client-s3";
import { fromIni } from "@aws-sdk/credential-providers";

import {
  CONTRACTOR_SOURCE_BUCKET,
  CONTRACTORS_TABLE,
  DYNAMODB_REGION,
  EXPECTED_AWS_ACCOUNT_ID,
  EXPECTED_AWS_PROFILE,
  S3_REGION,
} from "./import-cslb-contractors.mjs";

const execFileAsync = promisify(execFile);

export const WEB_ENRICHMENT_WRITE_SCRIPT_VERSION = "1.0.0";
export const WEB_ENRICHMENT_WRITE_REPORT_SCHEMA_VERSION =
  "contractor-web-enrichment-production-write-report.v1";
export const REVIEWED_RUN_ID =
  "web-enrichment-statewide-fast-20260724T190000Z";
export const REVIEWED_ARTIFACT_HASHES = Object.freeze({
  manifest:
    "3c90e766f5e86e32318c20e22b1426b447c9571b27a4f130677bae765734e24f",
  proposals:
    "d242155f0a76e8b47be9bea771f53bf1d35e038b5059a0dee2c81f50a99dade4",
  report:
    "502203a525eba2e236779a763ad3711b8488c75394c92ddc3385783a1caa1436",
  validation:
    "c33923f24180031bbbf993f855a962864bb01ae16edf8bbb60d50df8b23145c3",
});

const ALLOWED_SET_FIELDS = Object.freeze([
  "email",
  "servesCommercial",
  "servesResidential",
  "serviceAreas",
]);
const ALLOWED_SET_FIELD_SET = new Set(ALLOWED_SET_FIELDS);
const CUSTOMER_TYPE_FIELDS = new Set([
  "servesCommercial",
  "servesResidential",
]);
const ACCEPTED_CONFIDENCE_TIERS = new Set([
  "TIER_A_EXACT_LICENSE",
  "TIER_B_PHONE_AND_NAME",
  "TIER_C_NAME_LOCATION_TRADE",
]);
const FINAL_REPORT_KEY =
  `imports/web-enrichment/${REVIEWED_RUN_ID}/production-write-report.json`;

export async function runContractorWebEnrichmentProductionWrite(
  options,
  dependencies = {},
) {
  const startedAt = new Date().toISOString();
  const mode = options.write ? "write" : "dry-run";
  if (options.write === options.dryRun) {
    throw new Error("Choose exactly one of --dry-run or --write.");
  }
  if (options.approval !== REVIEWED_RUN_ID) {
    throw new Error(
      `This operation requires --approval ${REVIEWED_RUN_ID}.`,
    );
  }
  const profile =
    options.profile ||
    process.env.AWS_PROFILE ||
    EXPECTED_AWS_PROFILE;
  if (profile !== EXPECTED_AWS_PROFILE) {
    throw new Error(
      `This operation requires AWS profile ${EXPECTED_AWS_PROFILE}.`,
    );
  }

  const reviewed = await loadAndValidateReviewedArtifacts(options);
  const aws =
    dependencies.aws ||
    createProductionAwsAdapter({
      profile,
      writeConcurrency: options.writeConcurrency,
    });
  const accountId = await aws.getAccountId();
  if (accountId !== EXPECTED_AWS_ACCOUNT_ID) {
    throw new Error(
      `This operation requires AWS account ${EXPECTED_AWS_ACCOUNT_ID}. Received: ${accountId}`,
    );
  }
  await aws.assertInfrastructure();

  const outputDirectory = path.resolve(
    options.outputDirectory || reviewed.runDirectory,
  );
  await fsPromises.mkdir(outputDirectory, { recursive: true });
  const reportPath = path.join(
    outputDirectory,
    mode === "write"
      ? "production-write-report.json"
      : "production-write-dry-run.json",
  );
  const recoveredAttempt = options.write
    ? await readRecoverableAttempt(reportPath)
    : null;

  if (options.write) {
    const existingReport = await aws.readJson(FINAL_REPORT_KEY);
    if (existingReport) {
      assertExistingWriteReport(existingReport);
      await writeJson(reportPath, {
        ...existingReport,
        idempotentReplay: true,
        replayDynamoDbWriteCount: 0,
      });
      return {
        existingReport: true,
        report: existingReport,
        reportPath,
      };
    }
  }

  const contractorIds = reviewed.proposals.map(
    (proposal) => proposal.contractorId,
  );
  const beforeRows = await aws.batchGetContractors(contractorIds);
  const plan = buildIdempotentReplayPlan({
    contractors: beforeRows,
    proposals: reviewed.proposals,
  });
  const dryRunReport = buildReport({
    accountId,
    mode,
    plan,
    reviewed,
    startedAt,
  });

  if (!options.write) {
    const completedReport = {
      ...dryRunReport,
      completedAt: new Date().toISOString(),
    };
    await writeJson(reportPath, completedReport);
    return {
      existingReport: false,
      plan,
      report: completedReport,
      reportPath,
    };
  }

  const writeResult = await applyReplayPlan({
    aws,
    operations: plan.operations,
    quiet: options.quiet,
    writeConcurrency: options.writeConcurrency,
  });
  const afterRows = await aws.batchGetContractors(contractorIds);
  const verification = verifyAppliedReplay({
    afterRows,
    plan,
    writeResult,
  });
  const finalTableItemCount = await aws.countContractors();
  if (
    verification.failures.length ||
    writeResult.failures.length ||
    finalTableItemCount !== reviewed.report.summary.liveContractorCount
  ) {
    const failureReport = {
      ...dryRunReport,
      completedAt: new Date().toISOString(),
      finalTableItemCount,
      verification,
      writeResult: sanitizeWriteResult(writeResult),
    };
    await writeJson(reportPath, failureReport);
    throw new Error(
      `Production verification failed with ${verification.failures.length} verification failures, ${writeResult.failures.length} write failures, and ${finalTableItemCount} table rows.`,
    );
  }

  const finalReport = {
    ...dryRunReport,
    completedAt: new Date().toISOString(),
    finalTableItemCount,
    verification,
    writeResult: sanitizeWriteResult(writeResult),
    recoveredAttempt,
    invariants: {
      ...dryRunReport.invariants,
      certificationsModified: false,
      contractorRowsInserted: 0,
      dynamodbWriteCount:
        writeResult.appliedCount +
        Number(recoveredAttempt?.appliedCount || 0),
      existingSubstantiveValuesReplaced: false,
      programMembershipsModified: false,
      protectedFieldsModified: false,
      supportedRetrofitIdsModified: false,
    },
  };
  await writeJson(reportPath, finalReport);
  const reportSha256 = await sha256File(reportPath);
  const reportSizeBytes = (await fsPromises.stat(reportPath)).size;
  await aws.uploadFile({
    contentType: "application/json",
    key: FINAL_REPORT_KEY,
    localPath: reportPath,
    sha256: reportSha256,
    sizeBytes: reportSizeBytes,
  });
  await aws.verifyObject({
    key: FINAL_REPORT_KEY,
    sha256: reportSha256,
    sizeBytes: reportSizeBytes,
  });

  return {
    existingReport: false,
    plan,
    report: finalReport,
    reportPath,
    reportS3Key: FINAL_REPORT_KEY,
    reportSha256,
    reportSizeBytes,
  };
}

export async function loadAndValidateReviewedArtifacts(options) {
  const runDirectory = path.resolve(
    requiredOption(options.runDirectory, "--run-directory"),
  );
  const paths = {
    manifest: path.join(runDirectory, "manifest.json"),
    proposals: path.join(runDirectory, "proposals.jsonl"),
    report: path.join(runDirectory, "report.json"),
    validation: path.join(runDirectory, "validation.json"),
  };
  for (const name of Object.keys(paths)) {
    const approved = requiredOption(
      options[
        `approved${name[0].toUpperCase()}${name.slice(1)}Sha256`
      ],
      `--approved-${camelToKebab(name)}-sha256`,
    );
    if (approved !== REVIEWED_ARTIFACT_HASHES[name]) {
      throw new Error(
        `The approved ${name} hash is not the reviewed statewide hash.`,
      );
    }
    const actual = await sha256File(paths[name]);
    if (actual !== REVIEWED_ARTIFACT_HASHES[name]) {
      throw new Error(
        `The reviewed ${name} artifact hash changed from ${REVIEWED_ARTIFACT_HASHES[name]} to ${actual}.`,
      );
    }
  }

  const [manifest, report, validation, proposals] =
    await Promise.all([
      readJson(paths.manifest),
      readJson(paths.report),
      readJson(paths.validation),
      readJsonLines(paths.proposals),
    ]);
  assertReviewedManifest(manifest);
  assertReviewedReport(report);
  assertReviewedValidation(validation);
  assertReviewedProposals(proposals);
  if (
    manifest.artifactHashes?.proposals?.sha256 !==
      REVIEWED_ARTIFACT_HASHES.proposals ||
    manifest.artifactHashes?.report?.sha256 !==
      REVIEWED_ARTIFACT_HASHES.report ||
    manifest.artifactHashes?.validation?.sha256 !==
      REVIEWED_ARTIFACT_HASHES.validation
  ) {
    throw new Error(
      "The reviewed manifest does not bind the exact approved final artifacts.",
    );
  }
  return {
    hashes: REVIEWED_ARTIFACT_HASHES,
    manifest,
    paths,
    proposals,
    report,
    runDirectory,
    validation,
  };
}

export function buildIdempotentReplayPlan({
  contractors,
  proposals,
}) {
  const contractorById = new Map(
    contractors.map((contractor) => [
      contractor.contractorId,
      contractor,
    ]),
  );
  const operations = [];
  const conflicts = [];
  const fieldCounts = initializeFieldCounts();
  let evidenceAlreadyPresent = 0;
  let evidenceToAppend = 0;

  for (const proposal of proposals) {
    const contractor = contractorById.get(proposal.contractorId);
    if (!contractor) {
      conflicts.push({
        contractorIdToken: token(proposal.contractorId),
        fields: Object.keys(proposal.set).sort(),
        reason: "contractor_missing",
      });
      continue;
    }
    if (
      contractor.licenseStatus !== "CLEAR" ||
      !Array.isArray(contractor.supportedRetrofitIds) ||
      contractor.supportedRetrofitIds.length === 0
    ) {
      conflicts.push({
        contractorIdToken: token(proposal.contractorId),
        fields: Object.keys(proposal.set).sort(),
        reason: "contractor_no_longer_eligible",
      });
      continue;
    }

    const set = {};
    const expected = {};
    const eligibleEvidenceFields = new Set();
    const fieldConflicts = [];
    for (const [field, nextValue] of Object.entries(proposal.set)) {
      fieldCounts.proposed[field] += 1;
      const currentValue = contractor[field];
      if (valuesEqual(currentValue, nextValue)) {
        fieldCounts.alreadyApplied[field] += 1;
        eligibleEvidenceFields.add(field);
      } else if (isUnresolvedValue(field, currentValue)) {
        set[field] = nextValue;
        expected[field] = clone(currentValue);
        fieldCounts.toApply[field] += 1;
        eligibleEvidenceFields.add(field);
      } else {
        fieldCounts.conflicts[field] += 1;
        fieldConflicts.push(field);
      }
    }

    if (fieldConflicts.length) {
      conflicts.push({
        contractorIdToken: token(proposal.contractorId),
        fields: fieldConflicts.sort(),
        reason: "substantive_value_preserved",
      });
    }

    const currentEvidence = Array.isArray(
      contractor.enrichmentEvidence,
    )
      ? contractor.enrichmentEvidence
      : [];
    const evidenceKeys = new Set(
      currentEvidence.map(canonicalEvidenceKey),
    );
    const evidenceAdditions = [];
    for (const evidence of proposal.append.enrichmentEvidence) {
      if (!eligibleEvidenceFields.has(evidence.field)) continue;
      const key = canonicalEvidenceKey(evidence);
      if (evidenceKeys.has(key)) {
        evidenceAlreadyPresent += 1;
        continue;
      }
      evidenceKeys.add(key);
      evidenceAdditions.push(evidence);
      evidenceToAppend += 1;
    }
    const nextEvidence = [
      ...currentEvidence,
      ...evidenceAdditions,
    ];

    if (
      Object.keys(set).length === 0 &&
      evidenceAdditions.length === 0
    ) {
      continue;
    }
    operations.push({
      contractorId: proposal.contractorId,
      contractorIdToken: token(proposal.contractorId),
      expected,
      expectedEnrichmentEvidence: Array.isArray(
        contractor.enrichmentEvidence,
      )
        ? clone(contractor.enrichmentEvidence)
        : undefined,
      expectedLicenseStatus: contractor.licenseStatus,
      expectedSupportedRetrofitIds: clone(
        contractor.supportedRetrofitIds,
      ),
      evidenceAdditions,
      nextEnrichmentEvidence: nextEvidence,
      protectedFieldHash: protectedFieldHash(contractor),
      set,
    });
  }

  return {
    contractorCount: contractors.length,
    conflicts,
    evidenceAlreadyPresent,
    evidenceToAppend,
    fieldCounts,
    operations,
    proposalCount: proposals.length,
    proposedContractorCount: proposals.length,
  };
}

export async function applyReplayPlan({
  aws,
  operations,
  quiet = false,
  writeConcurrency = 24,
}) {
  let appliedCount = 0;
  const conditionalConflicts = [];
  const failures = [];
  await forEachConcurrent({
    concurrency: writeConcurrency,
    onProgress: (completed, total) => {
      if (
        !quiet &&
        (completed % 1_000 === 0 || completed === total)
      ) {
        console.log(
          `Applied or checked ${completed} of ${total} contractor updates.`,
        );
      }
    },
    values: operations,
    worker: async (operation) => {
      try {
        await aws.updateContractor(operation);
        appliedCount += 1;
      } catch (error) {
        if (isConditionalCheckFailure(error)) {
          conditionalConflicts.push({
            contractorIdToken: operation.contractorIdToken,
            fields: Object.keys(operation.set).sort(),
          });
          return;
        }
        failures.push({
          contractorIdToken: operation.contractorIdToken,
          errorName: error?.name || "Error",
        });
      }
    },
  });
  return {
    appliedCount,
    attemptedCount: operations.length,
    conditionalConflicts,
    failures,
  };
}

export function verifyAppliedReplay({
  afterRows,
  plan,
  writeResult,
}) {
  const afterById = new Map(
    afterRows.map((row) => [row.contractorId, row]),
  );
  const conditionalConflictTokens = new Set(
    writeResult.conditionalConflicts.map(
      (entry) => entry.contractorIdToken,
    ),
  );
  const failures = [];
  let evidenceVerified = 0;
  let operationRowsVerified = 0;
  let protectedRowsVerified = 0;
  let setValuesVerified = 0;

  for (const operation of plan.operations) {
    if (
      conditionalConflictTokens.has(operation.contractorIdToken)
    ) {
      continue;
    }
    const row = afterById.get(operation.contractorId);
    if (!row) {
      failures.push({
        contractorIdToken: operation.contractorIdToken,
        reason: "contractor_missing_after_write",
      });
      continue;
    }
    if (
      protectedFieldHash(row) !== operation.protectedFieldHash
    ) {
      failures.push({
        contractorIdToken: operation.contractorIdToken,
        reason: "protected_field_hash_changed",
      });
    } else {
      protectedRowsVerified += 1;
    }
    for (const [field, value] of Object.entries(operation.set)) {
      if (!valuesEqual(row[field], value)) {
        failures.push({
          contractorIdToken: operation.contractorIdToken,
          field,
          reason: "set_value_not_applied",
        });
      } else {
        setValuesVerified += 1;
      }
    }
    const afterEvidenceKeys = new Set(
      (row.enrichmentEvidence || []).map(canonicalEvidenceKey),
    );
    for (const evidence of operation.evidenceAdditions) {
      if (!afterEvidenceKeys.has(canonicalEvidenceKey(evidence))) {
        failures.push({
          contractorIdToken: operation.contractorIdToken,
          field: evidence.field,
          reason: "evidence_not_applied",
        });
      } else {
        evidenceVerified += 1;
      }
    }
    if (
      Object.hasOwn(operation.set, "serviceAreas") &&
      hasDuplicateValues(row.serviceAreas)
    ) {
      failures.push({
        contractorIdToken: operation.contractorIdToken,
        field: "serviceAreas",
        reason: "duplicate_service_area_values",
      });
    }
    if (hasDuplicateEvidence(row.enrichmentEvidence)) {
      failures.push({
        contractorIdToken: operation.contractorIdToken,
        field: "enrichmentEvidence",
        reason: "duplicate_evidence_values",
      });
    }
    operationRowsVerified += 1;
  }

  return {
    conditionalConflictCount:
      writeResult.conditionalConflicts.length,
    evidenceVerified,
    failures,
    operationRowsVerified,
    protectedRowsVerified,
    setValuesVerified,
    status: failures.length ? "FAIL" : "PASS",
  };
}

export function createProductionAwsAdapter({
  profile,
}) {
  const credentials = fromIni({ profile });
  const s3 = new S3Client({
    credentials,
    region: S3_REGION,
  });
  const dynamodbClient = new DynamoDBClient({
    credentials,
    maxAttempts: 10,
    region: DYNAMODB_REGION,
  });
  const db = DynamoDBDocumentClient.from(dynamodbClient, {
    marshallOptions: { removeUndefinedValues: true },
  });

  return {
    async assertInfrastructure() {
      await s3.send(
        new HeadBucketCommand({
          Bucket: CONTRACTOR_SOURCE_BUCKET,
        }),
      );
      const result = await dynamodbClient.send(
        new DescribeTableCommand({
          TableName: CONTRACTORS_TABLE,
        }),
      );
      if (result.Table?.TableStatus !== "ACTIVE") {
        throw new Error(`${CONTRACTORS_TABLE} is not ACTIVE.`);
      }
    },

    async batchGetContractors(contractorIds) {
      const rows = [];
      for (const ids of chunk(contractorIds, 100)) {
        let keys = ids.map((contractorId) => ({ contractorId }));
        let attempts = 0;
        while (keys.length) {
          attempts += 1;
          if (attempts > 10) {
            throw new Error(
              "DynamoDB continued returning unprocessed contractor keys.",
            );
          }
          const result = await db.send(
            new BatchGetCommand({
              RequestItems: {
                [CONTRACTORS_TABLE]: {
                  ConsistentRead: true,
                  Keys: keys,
                },
              },
            }),
          );
          rows.push(
            ...(result.Responses?.[CONTRACTORS_TABLE] || []),
          );
          keys =
            result.UnprocessedKeys?.[CONTRACTORS_TABLE]?.Keys ||
            [];
          if (keys.length) {
            await delay(Math.min(1_000, attempts * 100));
          }
        }
      }
      return rows;
    },

    async countContractors() {
      let count = 0;
      let ExclusiveStartKey;
      do {
        const result = await db.send(
          new ScanCommand({
            TableName: CONTRACTORS_TABLE,
            ConsistentRead: true,
            ExclusiveStartKey,
            Select: "COUNT",
          }),
        );
        count += Number(result.Count || 0);
        ExclusiveStartKey = result.LastEvaluatedKey;
      } while (ExclusiveStartKey);
      return count;
    },

    async getAccountId() {
      const { stdout } = await execFileAsync(
        "aws",
        [
          "--profile",
          profile,
          "--region",
          S3_REGION,
          "sts",
          "get-caller-identity",
          "--output",
          "json",
        ],
        { encoding: "utf8" },
      );
      return JSON.parse(stdout).Account;
    },

    async readJson(key) {
      try {
        const response = await s3.send(
          new GetObjectCommand({
            Bucket: CONTRACTOR_SOURCE_BUCKET,
            Key: key,
          }),
        );
        return JSON.parse(
          await response.Body.transformToString(),
        );
      } catch (error) {
        if (
          error?.$metadata?.httpStatusCode === 404 ||
          error?.name === "NoSuchKey" ||
          error?.name === "NotFound"
        ) {
          return null;
        }
        throw error;
      }
    },

    async updateContractor(operation) {
      const names = {
        "#contractorId": "contractorId",
        "#licenseStatus": "licenseStatus",
        "#supportedRetrofitIds": "supportedRetrofitIds",
      };
      const values = {
        ":expectedLicenseStatus":
          operation.expectedLicenseStatus,
        ":expectedSupportedRetrofitIds":
          operation.expectedSupportedRetrofitIds,
      };
      const conditions = [
        "attribute_exists(#contractorId)",
        "#licenseStatus = :expectedLicenseStatus",
        "#supportedRetrofitIds = :expectedSupportedRetrofitIds",
      ];
      const setParts = [];
      let index = 0;
      for (const [field, nextValue] of Object.entries(
        operation.set,
      )) {
        const fieldName = `#field${index}`;
        const nextName = `:next${index}`;
        names[fieldName] = field;
        values[nextName] = nextValue;
        setParts.push(`${fieldName} = ${nextName}`);
        const currentValue = operation.expected[field];
        if (currentValue === undefined) {
          conditions.push(`attribute_not_exists(${fieldName})`);
        } else {
          const expectedName = `:expected${index}`;
          values[expectedName] = currentValue;
          conditions.push(
            `${fieldName} = ${expectedName}`,
          );
        }
        index += 1;
      }
      if (operation.evidenceAdditions.length) {
        names["#enrichmentEvidence"] =
          "enrichmentEvidence";
        values[":nextEnrichmentEvidence"] =
          operation.nextEnrichmentEvidence;
        setParts.push(
          "#enrichmentEvidence = :nextEnrichmentEvidence",
        );
        if (
          operation.expectedEnrichmentEvidence === undefined
        ) {
          conditions.push(
            "attribute_not_exists(#enrichmentEvidence)",
          );
        } else {
          values[":expectedEnrichmentEvidence"] =
            operation.expectedEnrichmentEvidence;
          conditions.push(
            "#enrichmentEvidence = :expectedEnrichmentEvidence",
          );
        }
      }
      await db.send(
        new UpdateCommand({
          TableName: CONTRACTORS_TABLE,
          Key: { contractorId: operation.contractorId },
          ConditionExpression: conditions.join(" AND "),
          ExpressionAttributeNames: names,
          ExpressionAttributeValues: values,
          UpdateExpression: `SET ${setParts.join(", ")}`,
        }),
      );
    },

    async uploadFile({
      contentType,
      key,
      localPath,
      sha256,
      sizeBytes,
    }) {
      const expectedChecksum = Buffer.from(
        sha256,
        "hex",
      ).toString("base64");
      await s3.send(
        new PutObjectCommand({
          Bucket: CONTRACTOR_SOURCE_BUCKET,
          Key: key,
          Body: fs.createReadStream(localPath),
          ChecksumSHA256: expectedChecksum,
          ContentLength: sizeBytes,
          ContentType: contentType,
          IfNoneMatch: "*",
        }),
      );
    },

    async verifyObject({
      key,
      sha256,
      sizeBytes,
    }) {
      const expectedChecksum = Buffer.from(
        sha256,
        "hex",
      ).toString("base64");
      const result = await s3.send(
        new HeadObjectCommand({
          Bucket: CONTRACTOR_SOURCE_BUCKET,
          ChecksumMode: "ENABLED",
          Key: key,
        }),
      );
      if (
        Number(result.ContentLength) !== Number(sizeBytes) ||
        result.ChecksumSHA256 !== expectedChecksum
      ) {
        throw new Error(
          `The uploaded report checksum or size does not match s3://${CONTRACTOR_SOURCE_BUCKET}/${key}.`,
        );
      }
    },
  };
}

function buildReport({
  accountId,
  mode,
  plan,
  reviewed,
  startedAt,
}) {
  return {
    schemaVersion:
      WEB_ENRICHMENT_WRITE_REPORT_SCHEMA_VERSION,
    scriptVersion: WEB_ENRICHMENT_WRITE_SCRIPT_VERSION,
    runId: REVIEWED_RUN_ID,
    mode,
    startedAt,
    completedAt: "",
    accountId,
    resources: {
      contractorSourceBucket: CONTRACTOR_SOURCE_BUCKET,
      contractorSourceBucketRegion: S3_REGION,
      contractorTable: CONTRACTORS_TABLE,
      contractorTableRegion: DYNAMODB_REGION,
    },
    approvedArtifacts: clone(reviewed.hashes),
    reviewedProposalCount: reviewed.proposals.length,
    liveContractorCountBeforeWrite:
      reviewed.report.summary.liveContractorCount,
    replayPlan: {
      contractorRowsRead: plan.contractorCount,
      contractorsWithOperations: plan.operations.length,
      conflictCount: plan.conflicts.length,
      conflictExamples: plan.conflicts.slice(0, 50),
      evidenceAlreadyPresent: plan.evidenceAlreadyPresent,
      evidenceToAppend: plan.evidenceToAppend,
      fieldCounts: plan.fieldCounts,
    },
    approval: {
      approvalRunId: REVIEWED_RUN_ID,
      approvedByUserInstruction: true,
      originalAutomatedAuditStatus:
        reviewed.report.audit.gate.status,
      originalStatewideWriteAuthorized:
        reviewed.report.audit.gate.statewideWriteAuthorized,
      doesNotClaimHumanVerification: true,
    },
    invariants: {
      certificationsModified: false,
      contractorRowsInserted: 0,
      dynamodbWriteCount: 0,
      existingSubstantiveValuesReplaced: false,
      programMembershipsModified: false,
      protectedFieldsModified: false,
      supportedRetrofitIdsModified: false,
    },
  };
}

function assertReviewedManifest(manifest) {
  if (
    manifest.schemaVersion !==
      "contractor-web-enrichment-manifest.v1" ||
    manifest.runId !== REVIEWED_RUN_ID ||
    manifest.scope !== "full" ||
    manifest.accountId !== EXPECTED_AWS_ACCOUNT_ID ||
    manifest.liveContractorCount !== 207_903 ||
    manifest.selectedContractorCount !== 192_900 ||
    manifest.invariants?.dynamodbWritesEnabled !== false
  ) {
    throw new Error(
      "The reviewed manifest is not the approved statewide proposal manifest.",
    );
  }
}

function assertReviewedReport(report) {
  if (
    report.schemaVersion !==
      "contractor-web-enrichment-report.v1" ||
    report.runId !== REVIEWED_RUN_ID ||
    report.scope !== "full" ||
    report.accountId !== EXPECTED_AWS_ACCOUNT_ID ||
    report.summary?.contractorProposals !== 16_029 ||
    report.execution?.fastPassComplete !== true ||
    report.execution?.eligibleRemaining !== 0 ||
    report.execution?.outcomeAccountingCount !== 207_903 ||
    report.audit?.gate?.precisionPassed !== true ||
    report.dynamodbWriteCount !== 0
  ) {
    throw new Error(
      "The reviewed report does not satisfy the production replay guards.",
    );
  }
}

function assertReviewedValidation(validation) {
  if (
    validation.schemaVersion !==
      "contractor-web-enrichment-validation.v1" ||
    validation.status !== "PASS" ||
    validation.failures?.length !== 0 ||
    validation.counts?.liveContractors !== 207_903 ||
    validation.counts?.eligibleRemaining !== 0 ||
    validation.counts?.proposals !== 16_029 ||
    validation.invariants?.dynamodbWrites !== 0 ||
    validation.invariants?.existingSubstantiveValuesReplaced ||
    validation.invariants?.supportedRetrofitIdsModified ||
    validation.invariants?.programMembershipsModified ||
    validation.invariants?.certificationsModified
  ) {
    throw new Error(
      "The reviewed validation artifact is not a successful proposal-only statewide validation.",
    );
  }
}

function assertReviewedProposals(proposals) {
  if (
    proposals.length !== 16_029 ||
    new Set(proposals.map((proposal) => proposal.contractorId))
      .size !== proposals.length
  ) {
    throw new Error(
      "The reviewed proposal artifact does not contain 16,029 unique contractors.",
    );
  }
  for (const proposal of proposals) {
    const setFields = Object.keys(proposal.set || {});
    const appendFields = Object.keys(proposal.append || {});
    if (
      proposal.schemaVersion !==
        "contractor-web-enrichment-proposal.v2" ||
      !proposal.contractorId ||
      Object.keys(proposal.expected || {}).length !== 0 ||
      !setFields.length ||
      setFields.some(
        (field) => !ALLOWED_SET_FIELD_SET.has(field),
      ) ||
      appendFields.length !== 1 ||
      appendFields[0] !== "enrichmentEvidence" ||
      !Array.isArray(proposal.append.enrichmentEvidence) ||
      !proposal.append.enrichmentEvidence.length ||
      proposal.domainEvidence?.accepted !== true ||
      proposal.domainEvidence?.disposition !== "VERIFIED_DOMAIN" ||
      proposal.domainEvidence?.signals?.conflictingLicense ||
      proposal.domainEvidence?.signals?.licenseTransition ||
      !ACCEPTED_CONFIDENCE_TIERS.has(
        proposal.domainEvidence?.confidenceTier,
      )
    ) {
      throw new Error(
        `Proposal ${token(proposal.contractorId)} violates the reviewed proposal schema or identity guards.`,
      );
    }
    for (const [field, value] of Object.entries(proposal.set)) {
      if (field === "email" && !isAcceptableEmail(value)) {
        throw new Error(
          `Proposal ${token(proposal.contractorId)} contains a malformed email.`,
        );
      }
      if (
        CUSTOMER_TYPE_FIELDS.has(field) &&
        !["YES", "NO"].includes(value)
      ) {
        throw new Error(
          `Proposal ${token(proposal.contractorId)} contains an invalid customer-type value.`,
        );
      }
      if (
        field === "serviceAreas" &&
        (!Array.isArray(value) ||
          !value.length ||
          hasDuplicateValues(value) ||
          value.some(
            (entry) =>
              typeof entry !== "string" ||
              !entry.trim() ||
              entry === "UNKNOWN",
          ))
      ) {
        throw new Error(
          `Proposal ${token(proposal.contractorId)} contains invalid service areas.`,
        );
      }
    }
    const proposedFields = new Set(setFields);
    for (const evidence of proposal.append.enrichmentEvidence) {
      if (
        !proposedFields.has(evidence.field) ||
        typeof evidence.sourceUrl !== "string" ||
        !evidence.sourceUrl.startsWith("http") ||
        typeof evidence.sourceValue !== "string" ||
        !evidence.sourceValue ||
        containsCredentialBearingUrl(evidence.sourceUrl)
      ) {
        throw new Error(
          `Proposal ${token(proposal.contractorId)} contains invalid field evidence.`,
        );
      }
    }
  }
}

function assertExistingWriteReport(report) {
  if (
    report.schemaVersion !==
      WEB_ENRICHMENT_WRITE_REPORT_SCHEMA_VERSION ||
    report.runId !== REVIEWED_RUN_ID ||
    report.mode !== "write" ||
    report.accountId !== EXPECTED_AWS_ACCOUNT_ID ||
    report.verification?.status !== "PASS" ||
    report.verification?.failures?.length !== 0 ||
    report.finalTableItemCount !== 207_903 ||
    stableStringify(report.approvedArtifacts) !==
      stableStringify(REVIEWED_ARTIFACT_HASHES)
  ) {
    throw new Error(
      "The existing S3 production-write report is not a successful application of the reviewed proposal.",
    );
  }
}

function initializeFieldCounts() {
  const sections = [
    "alreadyApplied",
    "conflicts",
    "proposed",
    "toApply",
  ];
  return Object.fromEntries(
    sections.map((section) => [
      section,
      Object.fromEntries(
        ALLOWED_SET_FIELDS.map((field) => [field, 0]),
      ),
    ]),
  );
}

function isUnresolvedValue(field, value) {
  if (field === "serviceAreas") {
    return (
      value === undefined ||
      value === null ||
      (Array.isArray(value) &&
        (value.length === 0 ||
          (value.length === 1 && value[0] === "UNKNOWN")))
    );
  }
  return (
    value === undefined ||
    value === null ||
    value === "" ||
    value === "UNKNOWN"
  );
}

function isAcceptableEmail(value) {
  return (
    typeof value === "string" &&
    value.length <= 254 &&
    /^[A-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[A-Z0-9](?:[A-Z0-9-]{0,61}[A-Z0-9])?(?:\.[A-Z0-9](?:[A-Z0-9-]{0,61}[A-Z0-9])?)+$/i.test(
      value,
    )
  );
}

function containsCredentialBearingUrl(value) {
  try {
    const url = new URL(value);
    for (const key of url.searchParams.keys()) {
      if (
        /^(?:access_token|auth|authorization|code|credential|expires|id_token|jwt|key|password|policy|signature|sig|session|session_token|token|x-amz-.+)$/i.test(
          key,
        )
      ) {
        return true;
      }
    }
    return Boolean(url.username || url.password);
  } catch {
    return true;
  }
}

function canonicalEvidenceKey(evidence) {
  return stableStringify(normalizeDynamoDbText(evidence));
}

function normalizeDynamoDbText(value) {
  if (typeof value === "string") {
    return value
      .replace(
        /[\uD800-\uDBFF](?![\uDC00-\uDFFF])/g,
        "?",
      )
      .replace(
        /(?<![\uD800-\uDBFF])[\uDC00-\uDFFF]/g,
        "?",
      );
  }
  if (Array.isArray(value)) {
    return value.map(normalizeDynamoDbText);
  }
  if (value && typeof value === "object") {
    return Object.fromEntries(
      Object.entries(value).map(([key, entry]) => [
        key,
        normalizeDynamoDbText(entry),
      ]),
    );
  }
  return value;
}

function protectedFieldHash(contractor) {
  const protectedFields = Object.fromEntries(
    Object.entries(contractor)
      .filter(
        ([field]) =>
          !ALLOWED_SET_FIELD_SET.has(field) &&
          field !== "enrichmentEvidence",
      )
      .sort(([left], [right]) => left.localeCompare(right)),
  );
  return sha256Text(stableStringify(protectedFields));
}

function valuesEqual(left, right) {
  return stableStringify(left) === stableStringify(right);
}

function hasDuplicateValues(values) {
  return (
    Array.isArray(values) &&
    new Set(values.map((value) => stableStringify(value))).size !==
      values.length
  );
}

function hasDuplicateEvidence(evidence) {
  return (
    Array.isArray(evidence) &&
    new Set(evidence.map(canonicalEvidenceKey)).size !==
      evidence.length
  );
}

function stableStringify(value) {
  if (value === undefined) return "undefined";
  if (value === null || typeof value !== "object") {
    return JSON.stringify(value);
  }
  if (Array.isArray(value)) {
    return `[${value.map(stableStringify).join(",")}]`;
  }
  return `{${Object.keys(value)
    .sort()
    .map(
      (key) =>
        `${JSON.stringify(key)}:${stableStringify(value[key])}`,
    )
    .join(",")}}`;
}

function sanitizeWriteResult(writeResult) {
  return {
    appliedCount: writeResult.appliedCount,
    attemptedCount: writeResult.attemptedCount,
    conditionalConflictCount:
      writeResult.conditionalConflicts.length,
    conditionalConflictExamples:
      writeResult.conditionalConflicts.slice(0, 50),
    failureCount: writeResult.failures.length,
    failureExamples: writeResult.failures.slice(0, 50),
  };
}

async function forEachConcurrent({
  concurrency,
  onProgress,
  values,
  worker,
}) {
  const limit = Math.max(
    1,
    Math.min(Number(concurrency) || 1, values.length || 1),
  );
  let nextIndex = 0;
  let completed = 0;
  async function runWorker() {
    while (true) {
      const index = nextIndex;
      nextIndex += 1;
      if (index >= values.length) return;
      await worker(values[index], index);
      completed += 1;
      onProgress(completed, values.length);
    }
  }
  await Promise.all(
    Array.from({ length: limit }, () => runWorker()),
  );
}

async function readJsonLines(filePath) {
  const rows = [];
  const input = fs.createReadStream(filePath);
  const lines = readline.createInterface({
    crlfDelay: Infinity,
    input,
  });
  for await (const line of lines) {
    if (line.trim()) rows.push(JSON.parse(line));
  }
  return rows;
}

async function readJson(filePath) {
  return JSON.parse(await fsPromises.readFile(filePath, "utf8"));
}

async function readRecoverableAttempt(filePath) {
  try {
    const report = await readJson(filePath);
    if (
      report.schemaVersion ===
        WEB_ENRICHMENT_WRITE_REPORT_SCHEMA_VERSION &&
      report.runId === REVIEWED_RUN_ID &&
      report.mode === "write" &&
      report.verification?.status === "PASS"
    ) {
      return null;
    }
    if (
      report.schemaVersion !==
        WEB_ENRICHMENT_WRITE_REPORT_SCHEMA_VERSION ||
      report.runId !== REVIEWED_RUN_ID ||
      report.mode !== "write" ||
      report.accountId !== EXPECTED_AWS_ACCOUNT_ID ||
      report.verification?.status !== "FAIL" ||
      report.writeResult?.failureCount !== 0 ||
      report.writeResult?.conditionalConflictCount !== 0 ||
      report.writeResult?.appliedCount !== 16_029 ||
      report.finalTableItemCount !== 207_903 ||
      stableStringify(report.approvedArtifacts) !==
        stableStringify(REVIEWED_ARTIFACT_HASHES)
    ) {
      throw new Error(
        "The local production report is not a recoverable matching attempt.",
      );
    }
    return {
      appliedCount: report.writeResult.appliedCount,
      completedAt: report.completedAt,
      originalVerificationFailureCount:
        report.verification.failures.length,
      recoveryReason:
        "A lone invalid UTF-16 code unit was normalized during DynamoDB string serialization.",
    };
  } catch (error) {
    if (error?.code === "ENOENT") return null;
    throw error;
  }
}

async function writeJson(filePath, value) {
  const temporaryPath = `${filePath}.${process.pid}.tmp`;
  await fsPromises.writeFile(
    temporaryPath,
    `${JSON.stringify(value, null, 2)}\n`,
  );
  await fsPromises.rename(temporaryPath, filePath);
}

async function sha256File(filePath) {
  const hash = crypto.createHash("sha256");
  for await (const chunkValue of fs.createReadStream(filePath)) {
    hash.update(chunkValue);
  }
  return hash.digest("hex");
}

function sha256Text(value) {
  return crypto
    .createHash("sha256")
    .update(value)
    .digest("hex");
}

function token(value) {
  return sha256Text(String(value)).slice(0, 12);
}

function clone(value) {
  return value === undefined
    ? undefined
    : structuredClone(value);
}

function chunk(values, size) {
  const chunks = [];
  for (let index = 0; index < values.length; index += size) {
    chunks.push(values.slice(index, index + size));
  }
  return chunks;
}

function delay(milliseconds) {
  return new Promise((resolve) =>
    setTimeout(resolve, milliseconds),
  );
}

function isConditionalCheckFailure(error) {
  return error?.name === "ConditionalCheckFailedException";
}

function camelToKebab(value) {
  return value.replace(
    /[A-Z]/g,
    (letter) => `-${letter.toLowerCase()}`,
  );
}

function requiredOption(value, flag) {
  if (!value) throw new Error(`${flag} is required.`);
  return value;
}

function parseArgs(argv) {
  const options = {
    approval: "",
    approvedManifestSha256: "",
    approvedProposalsSha256: "",
    approvedReportSha256: "",
    approvedValidationSha256: "",
    dryRun: false,
    outputDirectory: "",
    profile: "",
    quiet: false,
    runDirectory: "",
    write: false,
    writeConcurrency: 24,
  };
  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index];
    if (arg === "--dry-run") {
      options.dryRun = true;
    } else if (arg === "--write") {
      options.write = true;
    } else if (arg === "--profile") {
      options.profile = requiredArg(argv, ++index, arg);
    } else if (arg === "--approval") {
      options.approval = requiredArg(argv, ++index, arg);
    } else if (arg === "--run-directory") {
      options.runDirectory = requiredArg(argv, ++index, arg);
    } else if (arg === "--output-dir") {
      options.outputDirectory = requiredArg(argv, ++index, arg);
    } else if (arg === "--approved-manifest-sha256") {
      options.approvedManifestSha256 = requiredArg(
        argv,
        ++index,
        arg,
      );
    } else if (arg === "--approved-proposals-sha256") {
      options.approvedProposalsSha256 = requiredArg(
        argv,
        ++index,
        arg,
      );
    } else if (arg === "--approved-report-sha256") {
      options.approvedReportSha256 = requiredArg(
        argv,
        ++index,
        arg,
      );
    } else if (arg === "--approved-validation-sha256") {
      options.approvedValidationSha256 = requiredArg(
        argv,
        ++index,
        arg,
      );
    } else if (arg === "--write-concurrency") {
      options.writeConcurrency = positiveInteger(
        requiredArg(argv, ++index, arg),
        arg,
        100,
      );
    } else if (arg === "--quiet") {
      options.quiet = true;
    } else if (arg === "--help" || arg === "-h") {
      options.help = true;
    } else {
      throw new Error(`Unknown option: ${arg}`);
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

function positiveInteger(value, flag, maximum) {
  const parsed = Number.parseInt(value, 10);
  if (
    !Number.isInteger(parsed) ||
    parsed < 1 ||
    parsed > maximum
  ) {
    throw new Error(
      `${flag} must be an integer from 1 through ${maximum}.`,
    );
  }
  return parsed;
}

function printHelp() {
  console.log(`Apply the reviewed statewide contractor web-enrichment proposal.

Usage:
  npm run contractors:web-enrich:apply -- --dry-run [guards]
  npm run contractors:web-enrich:apply -- --write [guards]

Required guards:
  --profile retrofi-prod
  --approval ${REVIEWED_RUN_ID}
  --run-directory <path>
  --approved-manifest-sha256 <sha256>
  --approved-proposals-sha256 <sha256>
  --approved-report-sha256 <sha256>
  --approved-validation-sha256 <sha256>

Options:
  --write-concurrency <n>  Concurrent conditional updates. Default: 24.
  --output-dir <path>      Local report directory.
  --quiet                  Suppress progress output.`);
}

async function main() {
  const options = parseArgs(process.argv.slice(2));
  if (options.help) {
    printHelp();
    return;
  }
  const result =
    await runContractorWebEnrichmentProductionWrite(options);
  console.log(
    JSON.stringify(
      {
        existingReport: result.existingReport,
        reportPath: result.reportPath,
        reportS3Key: result.reportS3Key,
        reportSha256: result.reportSha256,
        summary: {
          mode: result.report.mode,
          replayPlan: result.report.replayPlan,
          verification: result.report.verification,
          writeResult: result.report.writeResult,
        },
      },
      null,
      2,
    ),
  );
}

const executedPath = process.argv[1]
  ? pathToFileURL(path.resolve(process.argv[1])).href
  : "";
if (import.meta.url === executedPath) {
  main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });
}
