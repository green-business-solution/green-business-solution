import crypto from "node:crypto";
import fs from "node:fs";
import fsPromises from "node:fs/promises";
import path from "node:path";
import { execFile } from "node:child_process";
import { promisify } from "node:util";
import { fileURLToPath, pathToFileURL } from "node:url";

import { DynamoDBClient, DescribeTableCommand } from "@aws-sdk/client-dynamodb";
import {
  BatchWriteCommand,
  DynamoDBDocumentClient,
  ScanCommand,
} from "@aws-sdk/lib-dynamodb";
import {
  HeadBucketCommand,
  HeadObjectCommand,
  PutObjectCommand,
  S3Client,
} from "@aws-sdk/client-s3";
import { fromIni } from "@aws-sdk/credential-providers";
import { parse } from "csv-parse";

const execFileAsync = promisify(execFile);

export const IMPORT_SCRIPT_VERSION = "1.0.0";
export const CONTRACTOR_SCHEMA_VERSION = "retrofi-contractor.v1";
export const EXPECTED_AWS_PROFILE = "retrofi-prod";
export const EXPECTED_AWS_ACCOUNT_ID = "059310317821";
export const CONTRACTOR_SOURCE_BUCKET =
  "gbs-retrofi-contractor-source-data-059310317821-us-east-1";
export const CONTRACTORS_TABLE = "gbs-contractors";
export const S3_REGION = "us-east-1";
export const DYNAMODB_REGION = "us-east-2";
export const DEFAULT_MAPPING_PATH = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  "../data/cslb_classification_to_retrofits.v1.json",
);

export const CSLB_SOURCE_HEADERS = [
  "LicenseNo",
  "LastUpdate",
  "BusinessName",
  "BUS-NAME-2",
  "FullBusinessName",
  "MailingAddress",
  "City",
  "State",
  "County",
  "ZIPCode",
  "country",
  "BusinessPhone",
  "BusinessType",
  "IssueDate",
  "ReissueDate",
  "ExpirationDate",
  "InactivationDate",
  "ReactivationDate",
  "PendingSuspension",
  "PendingClassRemoval",
  "PendingClassReplace",
  "PrimaryStatus",
  "SecondaryStatus",
  "Classifications(s)",
  "AsbestosReg",
  "WorkersCompCoverageType",
  "WCInsuranceCompany",
  "WCPolicyNumber",
  "WCEffectiveDate",
  "WCExpirationDate",
  "WCCancellationDate",
  "WCSuspendDate",
  "CBSuretyCompany",
  "CBNumber",
  "CBEffectiveDate",
  "CBCancellationDate",
  "CBAmount",
  "WBSuretyCompany",
  "WBNumber",
  "WBEffectiveDate",
  "WBCancellationDate",
  "WBAmount",
  "DBSuretyCompany",
  "DBNumber",
  "DBEffectiveDate",
  "DBCancellationDate",
  "DBAmount",
  "DateRequired",
  "DiscpCaseRegion",
  "DBBondReason",
  "DBCaseNo",
  "NAME-TP-2",
];

const ignoredCredentialTokens = new Set(["ASB", "HAZ"]);
const sourceUnavailableFields = [
  "website",
  "email",
  "contactFormUrl",
  "customerTypes",
  "serviceAreas",
  "programMemberships",
  "certifications",
];
const conflictFields = [
  "businessName",
  "licenseStatus",
  "primaryStatus",
  "secondaryStatus",
  "pendingSuspension",
  "pendingClassRemoval",
  "pendingClassReplace",
  "licenseIssueDate",
  "licenseExpirationDate",
  "businessAddress",
  "phone",
];

export async function runCslbImport(options, dependencies = {}) {
  const now = dependencies.now || (() => new Date());
  const startedAt = now().toISOString();
  const sourcePath = path.resolve(options.sourceFile);
  const mappingPath = path.resolve(
    options.mappingPath || DEFAULT_MAPPING_PATH,
  );
  const sourceStat = await fsPromises.stat(sourcePath);

  if (!sourceStat.isFile()) {
    throw new Error(`CSLB source is not a file: ${sourcePath}`);
  }
  if (path.extname(sourcePath).toLowerCase() !== ".csv") {
    throw new Error(
      `This importer only supports the attached CSV source. Received: ${path.basename(sourcePath)}`,
    );
  }

  const sourceSha256 = await sha256File(sourcePath);
  const sourceReceivedAt = sourceStat.mtime.toISOString();
  const receivedDate = sourceReceivedAt.slice(0, 10);
  const originalFilename = path.basename(sourcePath);
  const importId = `cslb-${receivedDate}-${sourceSha256.slice(0, 12)}`;
  const s3ObjectKeys = {
    source: `raw/cslb/${receivedDate}/${originalFilename}`,
    manifest: `imports/cslb/${importId}/manifest.json`,
    report: `imports/cslb/${importId}/report.json`,
  };

  const mapping = await loadClassificationMapping(mappingPath);
  const parseResult = await parseCslbSource(sourcePath);
  if (options.enforceStatewide !== false) {
    validateStatewideSource(parseResult);
  }

  const importedAt = startedAt;
  const analysis = analyzeContractors(parseResult, mapping, {
    importId,
    importedAt,
    s3SourceKey: s3ObjectKeys.source,
    sourceReceivedAt,
  });

  const manifest = {
    schemaVersion: "cslb-import-manifest.v1",
    importId,
    sourceName: "CSLB",
    originalFilename,
    sourceFormat: "CSV",
    sourceHeaders: parseResult.sourceHeaders,
    s3SourceKey: s3ObjectKeys.source,
    receivedAt: sourceReceivedAt,
    sha256: sourceSha256,
    sizeBytes: sourceStat.size,
    importScriptVersion: IMPORT_SCRIPT_VERSION,
  };

  const report = {
    schemaVersion: "cslb-import-report.v1",
    importId,
    mode: options.write ? "write" : "dry-run",
    sourceFilename: originalFilename,
    sourceFormat: "CSV",
    sourceHeaders: parseResult.sourceHeaders,
    sourceRowCount: parseResult.sourceRowCount,
    uniqueLicenseCount: parseResult.contractorsByLicense.size,
    relevantContractorCount: analysis.relevantContractorCount,
    irrelevantContractorCount: analysis.irrelevantContractorCount,
    duplicateLicenseCount: parseResult.duplicateLicenseNumbers.size,
    duplicateRowCount: parseResult.duplicateRowCount,
    classificationCounts: analysis.classificationCounts,
    matchedClassificationCounts: analysis.matchedClassificationCounts,
    unmappedClassificationCounts: analysis.unmappedClassificationCounts,
    ignoredCredentialTokenCounts: counterToObject(
      parseResult.ignoredCredentialTokenCounts,
    ),
    unknownClassificationCount: totalCounter(
      parseResult.unknownClassificationCounts,
    ),
    unknownClassificationCounts: counterToObject(
      parseResult.unknownClassificationCounts,
    ),
    licenseStatusCounts: analysis.licenseStatusCounts,
    retrofitCoverageCounts: analysis.retrofitCoverageCounts,
    uniqueRetrofitIdsRepresented: analysis.uniqueRetrofitIdsRepresented,
    uniqueRetrofitIdCount: analysis.uniqueRetrofitIdsRepresented.length,
    maximumContractorItemSizeBytes:
      analysis.maximumContractorItemSizeBytes,
    maximumContractorItemId: analysis.maximumContractorItemId,
    malformedRowCount: parseResult.malformedRowCount,
    malformedRowExamples: parseResult.malformedRowExamples,
    invalidDateCount: totalCounter(parseResult.invalidDateFieldCounts),
    invalidDateFieldCounts: counterToObject(
      parseResult.invalidDateFieldCounts,
    ),
    conflictCount: totalCounter(parseResult.conflictCounts),
    conflictCounts: counterToObject(parseResult.conflictCounts),
    conflictExamples: parseResult.conflictExamples,
    missingPhoneCount: analysis.missingPhoneCount,
    missingAddressCount: analysis.missingAddressCount,
    incompleteAddressCount: analysis.incompleteAddressCount,
    missingAddressFieldCounts: analysis.missingAddressFieldCounts,
    sourceUnavailableFields,
    writtenContractorCount: 0,
    dynamodbFailureCount: 0,
    dynamodbFinalItemCount: 0,
    sourceSha256,
    sourceSizeBytes: sourceStat.size,
    s3ObjectKeys,
    startTime: startedAt,
    completionTime: "",
    awsWriteCount: 0,
    dryRunConfirmedZeroAwsWrites: !options.write,
  };

  const outputDirectory = path.resolve(
    options.outputDirectory ||
      path.join("var", "cslb-imports", importId),
  );
  const localManifestPath = path.join(outputDirectory, "manifest.json");
  const localReportPath = path.join(outputDirectory, "report.json");

  if (!options.quiet) {
    console.log(
      `Detected ${parseResult.sourceHeaders.length} source headers in ${originalFilename}.`,
    );
    console.log(JSON.stringify(parseResult.sourceHeaders, null, 2));
    console.log(
      JSON.stringify(
        {
          sanitizedContractorExamples: analysis.sanitizedExamples,
        },
        null,
        2,
      ),
    );
  }

  if (!options.write) {
    report.completionTime = now().toISOString();
    await writeLocalArtifacts({
      manifest,
      report,
      outputDirectory,
    });
    if (!options.quiet) {
      console.log(
        JSON.stringify(
          {
            dryRun: true,
            awsWrites: 0,
            localManifestPath,
            localReportPath,
            relevantContractorCount: report.relevantContractorCount,
            irrelevantContractorCount: report.irrelevantContractorCount,
            malformedRowCount: report.malformedRowCount,
            unknownClassificationCount:
              report.unknownClassificationCount,
          },
          null,
          2,
        ),
      );
    }
    return {
      analysis,
      manifest,
      parseResult,
      report,
      localManifestPath,
      localReportPath,
    };
  }

  const profile = options.profile || process.env.AWS_PROFILE || EXPECTED_AWS_PROFILE;
  if (profile !== EXPECTED_AWS_PROFILE) {
    throw new Error(
      `Write mode requires AWS profile ${EXPECTED_AWS_PROFILE}. Received: ${profile}`,
    );
  }

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
      `Write mode requires AWS account ${EXPECTED_AWS_ACCOUNT_ID}. Received: ${accountId}`,
    );
  }

  await aws.assertInfrastructure();
  await aws.assertObjectsAbsent(Object.values(s3ObjectKeys));
  await aws.uploadSource({
    contentLength: sourceStat.size,
    key: s3ObjectKeys.source,
    sha256: sourceSha256,
    sourcePath,
  });
  report.awsWriteCount += 1;
  await aws.uploadJson(s3ObjectKeys.manifest, manifest);
  report.awsWriteCount += 1;
  await aws.verifyObject(s3ObjectKeys.manifest);
  await aws.assertTableEmpty();

  const writeResult = await writeContractors({
    aws,
    context: {
      importId,
      importedAt,
      s3SourceKey: s3ObjectKeys.source,
      sourceReceivedAt,
    },
    mapping,
    parseResult,
    quiet: options.quiet,
  });
  report.writtenContractorCount = writeResult.writtenContractorCount;
  report.dynamodbFailureCount = writeResult.dynamodbFailureCount;
  report.awsWriteCount += writeResult.batchWriteRequestCount;
  report.dynamodbFinalItemCount = await aws.countItems();
  const readBackSample = await aws.readSanitizedSample();
  report.completionTime = now().toISOString();
  report.awsWriteCount += 1;

  await writeLocalArtifacts({
    manifest,
    report,
    outputDirectory,
  });
  await aws.uploadJson(s3ObjectKeys.report, report);
  await aws.verifyObject(s3ObjectKeys.report);

  const expectedCount = report.relevantContractorCount;
  if (
    report.dynamodbFailureCount !== 0 ||
    report.writtenContractorCount !== expectedCount ||
    report.dynamodbFinalItemCount !== expectedCount
  ) {
    throw new Error(
      `Import verification failed. Expected ${expectedCount} contractors, wrote ${report.writtenContractorCount}, found ${report.dynamodbFinalItemCount}, and recorded ${report.dynamodbFailureCount} failures.`,
    );
  }

  if (!options.quiet) {
    console.log(
      JSON.stringify(
        {
          accountId,
          bucketName: CONTRACTOR_SOURCE_BUCKET,
          tableName: CONTRACTORS_TABLE,
          tableRegion: DYNAMODB_REGION,
          writtenContractorCount: report.writtenContractorCount,
          dynamodbFinalItemCount: report.dynamodbFinalItemCount,
          sanitizedReadBackSample: readBackSample,
          localManifestPath,
          localReportPath,
          s3ObjectKeys,
        },
        null,
        2,
      ),
    );
  }

  return {
    analysis,
    manifest,
    parseResult,
    report,
    readBackSample,
    localManifestPath,
    localReportPath,
  };
}

export async function parseCslbSource(sourcePath) {
  const skippedParserLines = new Set();
  const result = {
    conflictCounts: new Map(),
    conflictExamples: [],
    contractorsByLicense: new Map(),
    duplicateLicenseNumbers: new Set(),
    duplicateRowCount: 0,
    ignoredCredentialTokenCounts: new Map(),
    invalidDateFieldCounts: new Map(),
    malformedRowCount: 0,
    malformedRowExamples: [],
    sourceHeaders: [],
    sourceRowCount: 0,
    unknownClassificationCounts: new Map(),
  };

  const parser = parse({
    bom: true,
    columns(headers) {
      validateHeaders(headers);
      result.sourceHeaders = [...headers];
      return headers;
    },
    on_skip(error) {
      const lineKey = error.lines || `unknown-${skippedParserLines.size}`;
      if (skippedParserLines.has(lineKey)) return;
      skippedParserLines.add(lineKey);
      result.sourceRowCount += 1;
      result.malformedRowCount += 1;
      addBoundedExample(result.malformedRowExamples, {
        line: error.lines || null,
        reason: error.message,
      });
    },
    relax_quotes: true,
    skip_empty_lines: false,
    skip_records_with_error: true,
  });
  fs.createReadStream(sourcePath).pipe(parser);

  for await (const row of parser) {
    result.sourceRowCount += 1;
    const standardized = standardizeSourceRow(row, result);
    if (!standardized) {
      continue;
    }

    const existing = result.contractorsByLicense.get(
      standardized.licenseNumber,
    );
    if (!existing) {
      result.contractorsByLicense.set(
        standardized.licenseNumber,
        standardized,
      );
      continue;
    }

    result.duplicateLicenseNumbers.add(standardized.licenseNumber);
    result.duplicateRowCount += 1;
    result.contractorsByLicense.set(
      standardized.licenseNumber,
      mergeContractorRecords(existing, standardized, result),
    );
  }

  if (!result.sourceHeaders.length) {
    throw new Error("The source CSV did not contain a header row.");
  }
  return result;
}

export function normalizeClassificationCode(value) {
  const compact = normalizeWhitespace(value).toUpperCase().replace(/\s+/g, "");
  if (!compact) return null;
  if (compact === "A" || compact === "B") return compact;
  if (ignoredCredentialTokens.has(compact)) return null;

  const c61d = compact.match(/^C-?61\/?D-?(\d+)$/);
  if (c61d) return `C-61/D-${Number.parseInt(c61d[1], 10)}`;

  const d = compact.match(/^D-?(\d+)$/);
  if (d) return `C-61/D-${Number.parseInt(d[1], 10)}`;

  const b = compact.match(/^B-?(\d+)$/);
  if (b) return `B-${Number.parseInt(b[1], 10)}`;

  const c = compact.match(/^C-?(\d+)$/);
  if (c) return `C-${Number.parseInt(c[1], 10)}`;

  return null;
}

export function normalizeLicenseNumber(value) {
  const normalized = normalizeWhitespace(value)
    .replace(/\s+/g, "")
    .toUpperCase();
  if (!normalized || !/^[A-Z0-9]+$/.test(normalized)) return null;
  return normalized;
}

export function normalizeCslbDate(value) {
  const normalized = normalizeWhitespace(value);
  if (!normalized) return null;
  const match = normalized.match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})$/);
  if (!match) return null;
  const month = Number.parseInt(match[1], 10);
  const day = Number.parseInt(match[2], 10);
  const year = Number.parseInt(match[3], 10);
  const date = new Date(Date.UTC(year, month - 1, day));
  if (
    date.getUTCFullYear() !== year ||
    date.getUTCMonth() !== month - 1 ||
    date.getUTCDate() !== day
  ) {
    return null;
  }
  return `${String(year).padStart(4, "0")}-${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
}

export function contractorIdForLicense(licenseNumber) {
  return `CA_CSLB_${normalizeLicenseNumber(licenseNumber)}`;
}

export function buildContractorItem(record, mapping, context) {
  const matchedClassificationCodes = record.licenseClassifications
    .filter((code) => mapping.has(code))
    .sort(compareStrings);
  const supportedRetrofitIds = [
    ...new Set(
      matchedClassificationCodes.flatMap(
        (code) => mapping.get(code)?.retrofitIds || [],
      ),
    ),
  ].sort(compareStrings);

  const canonicalSourceRecord = {
    businessAddress: record.businessAddress || null,
    businessName: record.businessName,
    licenseClassifications: record.licenseClassifications,
    licenseExpirationDate: record.licenseExpirationDate || null,
    licenseIssueDate: record.licenseIssueDate || null,
    licenseNumber: record.licenseNumber,
    licenseStatus: record.licenseStatus,
    pendingClassRemoval: record.pendingClassRemoval || null,
    pendingClassReplace: record.pendingClassReplace || null,
    pendingSuspension: record.pendingSuspension || null,
    phone: record.phone || null,
    primaryStatus: record.primaryStatus || null,
    secondaryStatus: record.secondaryStatus || null,
    sourceRowHashes: [...record.sourceRowHashes].sort(compareStrings),
  };
  const sourceRecordHash = sha256Text(stableStringify(canonicalSourceRecord));

  return removeUndefinedDeep({
    schemaVersion: CONTRACTOR_SCHEMA_VERSION,
    contractorId: contractorIdForLicense(record.licenseNumber),
    licenseNumber: record.licenseNumber,
    businessName: record.businessName,
    licenseStatus: record.licenseStatus,
    primaryStatus: record.primaryStatus || undefined,
    secondaryStatus: record.secondaryStatus || undefined,
    pendingSuspension: record.pendingSuspension || undefined,
    pendingClassRemoval: record.pendingClassRemoval || undefined,
    pendingClassReplace: record.pendingClassReplace || undefined,
    licenseIssueDate: record.licenseIssueDate || undefined,
    licenseExpirationDate: record.licenseExpirationDate || undefined,
    licenseClassifications: [...record.licenseClassifications].sort(
      compareStrings,
    ),
    matchedClassificationCodes,
    supportedRetrofitIds,
    businessAddress: record.businessAddress || undefined,
    phone: record.phone || undefined,
    source: {
      name: "CSLB",
      s3Key: context.s3SourceKey,
      sourceReceivedAt: context.sourceReceivedAt,
      sourceRecordHash,
    },
    importId: context.importId,
    importedAt: context.importedAt,
  });
}

export async function writeBatchWithRetries({
  items,
  maxAttempts = 10,
  sendBatch,
  sleep = defaultSleep,
  tableName,
}) {
  let pending = items.map((Item) => ({ PutRequest: { Item } }));
  let requestCount = 0;

  for (let attempt = 1; attempt <= maxAttempts && pending.length; attempt += 1) {
    requestCount += 1;
    try {
      const response = await sendBatch({
        RequestItems: {
          [tableName]: pending,
        },
      });
      pending = response.UnprocessedItems?.[tableName] || [];
    } catch (error) {
      if (!isRetryableDynamoError(error) || attempt === maxAttempts) {
        throw error;
      }
    }

    if (pending.length && attempt < maxAttempts) {
      const delayMs = Math.min(5_000, 100 * 2 ** (attempt - 1));
      await sleep(delayMs);
    }
  }

  return {
    failedItems: pending.map((request) => request.PutRequest.Item),
    requestCount,
    writtenCount: items.length - pending.length,
  };
}

async function writeContractors({
  aws,
  context,
  mapping,
  parseResult,
  quiet,
}) {
  const concurrency = 8;
  const inFlight = new Set();
  let batch = [];
  let batchWriteRequestCount = 0;
  let dynamodbFailureCount = 0;
  let writtenContractorCount = 0;
  let nextProgress = 10_000;

  const scheduleBatch = (items) => {
    const pendingPromise = writeBatchWithRetries({
      items,
      sendBatch: (input) => aws.batchWrite(input),
      tableName: CONTRACTORS_TABLE,
    })
      .then((result) => {
        batchWriteRequestCount += result.requestCount;
        dynamodbFailureCount += result.failedItems.length;
        writtenContractorCount += result.writtenCount;
        if (!quiet && writtenContractorCount >= nextProgress) {
          console.log(
            `Wrote ${writtenContractorCount} of ${parseResult.contractorsByLicense.size} parsed licenses.`,
          );
          nextProgress += 10_000;
        }
      })
      .finally(() => {
        inFlight.delete(pendingPromise);
      });
    inFlight.add(pendingPromise);
  };

  for (const record of parseResult.contractorsByLicense.values()) {
    const item = buildContractorItem(record, mapping, context);
    if (!item.matchedClassificationCodes.length) continue;
    batch.push(item);
    if (batch.length < 25) continue;

    scheduleBatch(batch);
    batch = [];
    if (inFlight.size >= concurrency) {
      await Promise.race(inFlight);
    }
  }
  if (batch.length) scheduleBatch(batch);
  await Promise.all(inFlight);

  return {
    batchWriteRequestCount,
    dynamodbFailureCount,
    writtenContractorCount,
  };
}

function standardizeSourceRow(row, result) {
  const licenseNumber = normalizeLicenseNumber(row.LicenseNo);
  const businessName = normalizeWhitespace(row.BusinessName);
  if (!licenseNumber || !businessName) {
    result.malformedRowCount += 1;
    addBoundedExample(result.malformedRowExamples, {
      line: null,
      reason: !licenseNumber
        ? "Missing or invalid LicenseNo."
        : "Missing BusinessName.",
    });
    return null;
  }

  const classificationResult = parseClassificationCell(
    row["Classifications(s)"],
  );
  incrementCounter(
    result.ignoredCredentialTokenCounts,
    classificationResult.ignoredCredentials,
  );
  incrementCounter(
    result.unknownClassificationCounts,
    classificationResult.unknownTokens,
  );

  const primaryStatus = normalizeWhitespace(row.PrimaryStatus);
  const secondaryStatus = normalizeWhitespace(row.SecondaryStatus);
  const licenseStatus = [primaryStatus, secondaryStatus]
    .filter(Boolean)
    .join(" | ");

  const licenseIssueDate = normalizedDateOrReport(
    row.IssueDate,
    "IssueDate",
    result,
  );
  const licenseExpirationDate = normalizedDateOrReport(
    row.ExpirationDate,
    "ExpirationDate",
    result,
  );
  const businessAddress = removeUndefinedDeep({
    line1: normalizeWhitespace(row.MailingAddress) || undefined,
    city: normalizeWhitespace(row.City) || undefined,
    state: normalizeWhitespace(row.State) || undefined,
    county: normalizeWhitespace(row.County) || undefined,
    postalCode: normalizeWhitespace(row.ZIPCode) || undefined,
  });
  const record = {
    licenseNumber,
    businessName,
    licenseStatus,
    primaryStatus: primaryStatus || undefined,
    secondaryStatus: secondaryStatus || undefined,
    pendingSuspension:
      normalizeWhitespace(row.PendingSuspension) || undefined,
    pendingClassRemoval:
      normalizeWhitespace(row.PendingClassRemoval) || undefined,
    pendingClassReplace:
      normalizeWhitespace(row.PendingClassReplace) || undefined,
    licenseIssueDate: licenseIssueDate || undefined,
    licenseExpirationDate: licenseExpirationDate || undefined,
    licenseClassifications:
      classificationResult.licenseClassifications.sort(compareStrings),
    businessAddress: Object.keys(businessAddress).length
      ? businessAddress
      : undefined,
    phone: normalizeWhitespace(row.BusinessPhone) || undefined,
  };
  const sourceRowHash = sha256Text(stableStringify(record));
  return {
    ...record,
    sourceRowHashes: [sourceRowHash],
  };
}

function parseClassificationCell(value) {
  const licenseClassifications = new Set();
  const ignoredCredentials = [];
  const unknownTokens = [];
  const tokens = String(value || "")
    .split("|")
    .map(normalizeWhitespace)
    .filter(Boolean);

  for (const token of tokens) {
    const compact = token.toUpperCase().replace(/\s+/g, "");
    if (ignoredCredentialTokens.has(compact)) {
      ignoredCredentials.push(compact);
      continue;
    }
    const normalized = normalizeClassificationCode(token);
    if (normalized) {
      licenseClassifications.add(normalized);
    } else {
      unknownTokens.push(compact);
    }
  }

  return {
    ignoredCredentials,
    licenseClassifications: [...licenseClassifications],
    unknownTokens,
  };
}

function mergeContractorRecords(existing, incoming, result) {
  const preferred =
    compareRecordCompleteness(existing, incoming) >= 0 ? existing : incoming;
  const other = preferred === existing ? incoming : existing;
  const merged = {
    licenseNumber: existing.licenseNumber,
    businessName: preferred.businessName,
    licenseStatus: preferred.licenseStatus,
    primaryStatus: preferred.primaryStatus,
    secondaryStatus: preferred.secondaryStatus,
    pendingSuspension: preferred.pendingSuspension,
    pendingClassRemoval: preferred.pendingClassRemoval,
    pendingClassReplace: preferred.pendingClassReplace,
    licenseIssueDate: preferred.licenseIssueDate,
    licenseExpirationDate: preferred.licenseExpirationDate,
    businessAddress: preferred.businessAddress,
    phone: preferred.phone,
    licenseClassifications: [
      ...new Set([
        ...existing.licenseClassifications,
        ...incoming.licenseClassifications,
      ]),
    ].sort(compareStrings),
    sourceRowHashes: [
      ...new Set([...existing.sourceRowHashes, ...incoming.sourceRowHashes]),
    ].sort(compareStrings),
  };

  for (const field of conflictFields) {
    const preferredValue = preferred[field];
    const otherValue = other[field];
    if (!hasValue(preferredValue) && hasValue(otherValue)) {
      merged[field] = otherValue;
      continue;
    }
    if (
      hasValue(preferredValue) &&
      hasValue(otherValue) &&
      stableStringify(preferredValue) !== stableStringify(otherValue)
    ) {
      incrementCounter(result.conflictCounts, [field]);
      addBoundedExample(result.conflictExamples, {
        contractorId: contractorIdForLicense(existing.licenseNumber),
        field,
      });
    }
  }
  return removeUndefinedDeep(merged);
}

function compareRecordCompleteness(left, right) {
  const difference = recordCompleteness(left) - recordCompleteness(right);
  if (difference) return difference;
  const leftHash = left.sourceRowHashes[0] || "";
  const rightHash = right.sourceRowHashes[0] || "";
  return rightHash.localeCompare(leftHash);
}

function recordCompleteness(record) {
  let score = 0;
  for (const field of conflictFields) {
    const value = record[field];
    if (field === "businessAddress") {
      score += value ? Object.keys(value).length : 0;
    } else if (hasValue(value)) {
      score += 1;
    }
  }
  return score;
}

function analyzeContractors(parseResult, mapping, context) {
  const classificationCounts = new Map();
  const matchedClassificationCounts = new Map();
  const unmappedClassificationCounts = new Map();
  const licenseStatusCounts = new Map();
  const retrofitCoverageCounts = new Map();
  const uniqueRetrofitIds = new Set();
  const missingAddressFieldCounts = new Map();
  const sanitizedExamples = [];
  let relevantContractorCount = 0;
  let irrelevantContractorCount = 0;
  let missingPhoneCount = 0;
  let missingAddressCount = 0;
  let incompleteAddressCount = 0;
  let maximumContractorItemSizeBytes = 0;
  let maximumContractorItemId = "";

  for (const record of parseResult.contractorsByLicense.values()) {
    incrementCounter(classificationCounts, record.licenseClassifications);
    const item = buildContractorItem(record, mapping, context);
    if (!item.matchedClassificationCodes.length) {
      irrelevantContractorCount += 1;
      incrementCounter(
        unmappedClassificationCounts,
        record.licenseClassifications,
      );
      continue;
    }

    relevantContractorCount += 1;
    const itemSizeBytes = Buffer.byteLength(JSON.stringify(item));
    if (itemSizeBytes >= 400_000) {
      throw new Error(
        `Contractor item ${item.contractorId} is too large for DynamoDB at ${itemSizeBytes} bytes.`,
      );
    }
    if (itemSizeBytes > maximumContractorItemSizeBytes) {
      maximumContractorItemSizeBytes = itemSizeBytes;
      maximumContractorItemId = item.contractorId;
    }
    incrementCounter(
      matchedClassificationCounts,
      item.matchedClassificationCodes,
    );
    incrementCounter(licenseStatusCounts, [item.licenseStatus]);
    incrementCounter(retrofitCoverageCounts, item.supportedRetrofitIds);
    for (const retrofitId of item.supportedRetrofitIds) {
      uniqueRetrofitIds.add(retrofitId);
    }
    if (!item.phone) missingPhoneCount += 1;
    if (!item.businessAddress) missingAddressCount += 1;
    const missingAddressFields = ["line1", "city", "state", "postalCode"].filter(
      (field) => !item.businessAddress?.[field],
    );
    if (missingAddressFields.length) incompleteAddressCount += 1;
    incrementCounter(missingAddressFieldCounts, missingAddressFields);

    if (sanitizedExamples.length < 3) {
      sanitizedExamples.push({
        contractorId: item.contractorId,
        licenseStatus: item.licenseStatus,
        licenseClassifications: item.licenseClassifications,
        matchedClassificationCodes: item.matchedClassificationCodes,
        supportedRetrofitIds: item.supportedRetrofitIds,
      });
    }
  }

  for (const [code, count] of classificationCounts) {
    if (!mapping.has(code)) {
      unmappedClassificationCounts.set(code, count);
    }
  }

  return {
    classificationCounts: counterToObject(classificationCounts),
    incompleteAddressCount,
    irrelevantContractorCount,
    licenseStatusCounts: counterToObject(licenseStatusCounts),
    maximumContractorItemId,
    maximumContractorItemSizeBytes,
    matchedClassificationCounts: counterToObject(
      matchedClassificationCounts,
    ),
    missingAddressCount,
    missingAddressFieldCounts: counterToObject(missingAddressFieldCounts),
    missingPhoneCount,
    relevantContractorCount,
    retrofitCoverageCounts: counterToObject(retrofitCoverageCounts),
    sanitizedExamples,
    uniqueRetrofitIdsRepresented: [...uniqueRetrofitIds].sort(compareStrings),
    unmappedClassificationCounts: counterToObject(
      unmappedClassificationCounts,
    ),
  };
}

async function loadClassificationMapping(mappingPath) {
  const parsed = JSON.parse(await fsPromises.readFile(mappingPath, "utf8"));
  if (
    parsed.schemaVersion !== "cslb-classification-to-retrofits.v1" ||
    !Array.isArray(parsed.classifications)
  ) {
    throw new Error(`Unsupported CSLB classification mapping: ${mappingPath}`);
  }
  return new Map(
    parsed.classifications.map((entry) => [
      entry.classificationCode,
      {
        classificationName: entry.classificationName,
        retrofitIds: [...entry.retrofitIds],
      },
    ]),
  );
}

function validateHeaders(headers) {
  if (
    headers.length !== CSLB_SOURCE_HEADERS.length ||
    headers.some((header, index) => header !== CSLB_SOURCE_HEADERS[index])
  ) {
    throw new Error(
      `The attached file does not match the inspected CSLB License Master headers. Received: ${JSON.stringify(headers)}`,
    );
  }
}

function validateStatewideSource(parseResult) {
  if (
    parseResult.sourceRowCount < 100_000 ||
    parseResult.contractorsByLicense.size < 100_000
  ) {
    throw new Error(
      `The attached file does not appear to be the statewide CSLB License Master dataset. Parsed ${parseResult.sourceRowCount} rows and ${parseResult.contractorsByLicense.size} unique licenses.`,
    );
  }
}

function normalizedDateOrReport(value, field, result) {
  const raw = normalizeWhitespace(value);
  if (!raw) return null;
  const normalized = normalizeCslbDate(raw);
  if (!normalized) {
    incrementCounter(result.invalidDateFieldCounts, [field]);
  }
  return normalized;
}

function createAwsAdapter({
  bucketName,
  profile,
  s3Region,
  tableName,
  tableRegion,
}) {
  const credentials = fromIni({ profile });
  const s3 = new S3Client({
    credentials,
    region: s3Region,
  });
  const dynamodbClient = new DynamoDBClient({
    credentials,
    region: tableRegion,
  });
  const db = DynamoDBDocumentClient.from(dynamodbClient, {
    marshallOptions: {
      removeUndefinedValues: true,
    },
  });

  return {
    async getAccountId() {
      const { stdout } = await execFileAsync(
        "aws",
        [
          "--profile",
          profile,
          "--region",
          s3Region,
          "sts",
          "get-caller-identity",
          "--output",
          "json",
        ],
        { encoding: "utf8" },
      );
      return JSON.parse(stdout).Account;
    },

    async assertInfrastructure() {
      await s3.send(new HeadBucketCommand({ Bucket: bucketName }));
      const description = await dynamodbClient.send(
        new DescribeTableCommand({ TableName: tableName }),
      );
      if (description.Table?.TableStatus !== "ACTIVE") {
        throw new Error(
          `DynamoDB table ${tableName} is not ACTIVE. Status: ${description.Table?.TableStatus || "unknown"}`,
        );
      }
    },

    async assertObjectsAbsent(keys) {
      for (const key of keys) {
        let exists = true;
        try {
          await s3.send(
            new HeadObjectCommand({
              Bucket: bucketName,
              Key: key,
            }),
          );
        } catch (error) {
          if (
            error?.$metadata?.httpStatusCode === 404 ||
            error?.name === "NotFound"
          ) {
            exists = false;
          } else {
            throw error;
          }
        }
        if (exists) {
          throw new Error(
            `Refusing to repeat the import because s3://${bucketName}/${key} already exists.`,
          );
        }
      }
    },

    async uploadSource({ contentLength, key, sha256, sourcePath }) {
      const checksumSha256 = Buffer.from(sha256, "hex").toString("base64");
      await s3.send(
        new PutObjectCommand({
          Bucket: bucketName,
          Key: key,
          Body: fs.createReadStream(sourcePath),
          ContentLength: contentLength,
          ContentType: "text/csv",
          ChecksumSHA256: checksumSha256,
        }),
      );
      const uploaded = await this.verifyObject(key);
      if (uploaded.ContentLength !== contentLength) {
        throw new Error(
          `Uploaded source size mismatch for s3://${bucketName}/${key}.`,
        );
      }
      if (uploaded.ChecksumSHA256 !== checksumSha256) {
        throw new Error(
          `Uploaded source checksum mismatch for s3://${bucketName}/${key}.`,
        );
      }
    },

    async uploadJson(key, value) {
      await s3.send(
        new PutObjectCommand({
          Bucket: bucketName,
          Key: key,
          Body: `${JSON.stringify(value, null, 2)}\n`,
          ContentType: "application/json",
        }),
      );
    },

    async verifyObject(key) {
      return s3.send(
        new HeadObjectCommand({
          Bucket: bucketName,
          Key: key,
          ChecksumMode: "ENABLED",
        }),
      );
    },

    async assertTableEmpty() {
      const result = await db.send(
        new ScanCommand({
          TableName: tableName,
          Select: "COUNT",
          Limit: 1,
          ConsistentRead: true,
        }),
      );
      if ((result.Count || 0) !== 0) {
        throw new Error(
          `Refusing to import because DynamoDB table ${tableName} is not empty.`,
        );
      }
    },

    async batchWrite(input) {
      return db.send(new BatchWriteCommand(input));
    },

    async countItems() {
      let count = 0;
      let ExclusiveStartKey;
      do {
        const result = await db.send(
          new ScanCommand({
            TableName: tableName,
            Select: "COUNT",
            ConsistentRead: true,
            ExclusiveStartKey,
          }),
        );
        count += result.Count || 0;
        ExclusiveStartKey = result.LastEvaluatedKey;
      } while (ExclusiveStartKey);
      return count;
    },

    async readSanitizedSample() {
      const result = await db.send(
        new ScanCommand({
          TableName: tableName,
          Limit: 3,
          ProjectionExpression:
            "contractorId, licenseStatus, licenseClassifications, matchedClassificationCodes, supportedRetrofitIds",
        }),
      );
      return (result.Items || []).sort((left, right) =>
        compareStrings(left.contractorId, right.contractorId),
      );
    },
  };
}

async function writeLocalArtifacts({ manifest, outputDirectory, report }) {
  await fsPromises.mkdir(outputDirectory, { recursive: true });
  await Promise.all([
    fsPromises.writeFile(
      path.join(outputDirectory, "manifest.json"),
      `${JSON.stringify(manifest, null, 2)}\n`,
    ),
    fsPromises.writeFile(
      path.join(outputDirectory, "report.json"),
      `${JSON.stringify(report, null, 2)}\n`,
    ),
  ]);
}

async function sha256File(filePath) {
  const hash = crypto.createHash("sha256");
  for await (const chunk of fs.createReadStream(filePath)) {
    hash.update(chunk);
  }
  return hash.digest("hex");
}

function sha256Text(value) {
  return crypto.createHash("sha256").update(value).digest("hex");
}

function stableStringify(value) {
  if (Array.isArray(value)) {
    return `[${value.map(stableStringify).join(",")}]`;
  }
  if (value && typeof value === "object") {
    return `{${Object.keys(value)
      .sort(compareStrings)
      .map(
        (key) =>
          `${JSON.stringify(key)}:${stableStringify(value[key])}`,
      )
      .join(",")}}`;
  }
  return JSON.stringify(value);
}

function removeUndefinedDeep(value) {
  if (Array.isArray(value)) {
    return value.map(removeUndefinedDeep);
  }
  if (!value || typeof value !== "object") return value;
  return Object.fromEntries(
    Object.entries(value)
      .filter(([, child]) => child !== undefined && child !== null)
      .map(([key, child]) => [key, removeUndefinedDeep(child)]),
  );
}

function normalizeWhitespace(value) {
  return String(value || "").replace(/\s+/g, " ").trim();
}

function incrementCounter(counter, values) {
  for (const value of values) {
    counter.set(value, (counter.get(value) || 0) + 1);
  }
}

function counterToObject(counter) {
  return Object.fromEntries(
    [...counter.entries()].sort(([left], [right]) =>
      compareStrings(left, right),
    ),
  );
}

function totalCounter(counter) {
  return [...counter.values()].reduce((sum, value) => sum + value, 0);
}

function addBoundedExample(examples, example, limit = 20) {
  if (examples.length < limit) examples.push(example);
}

function hasValue(value) {
  if (value && typeof value === "object") {
    return Object.keys(value).length > 0;
  }
  return value !== undefined && value !== null && value !== "";
}

function compareStrings(left, right) {
  const leftString = String(left);
  const rightString = String(right);
  if (leftString < rightString) return -1;
  if (leftString > rightString) return 1;
  return 0;
}

function isRetryableDynamoError(error) {
  return [
    "InternalServerError",
    "ProvisionedThroughputExceededException",
    "RequestLimitExceeded",
    "ThrottlingException",
  ].includes(error?.name);
}

function defaultSleep(delayMs) {
  return new Promise((resolve) => setTimeout(resolve, delayMs));
}

function parseArgs(argv) {
  const options = {
    enforceStatewide: true,
    outputDirectory: "",
    profile: "",
    quiet: false,
    sourceFile: "",
    write: false,
  };
  let explicitMode = "";

  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index];
    if (arg === "--help" || arg === "-h") {
      options.help = true;
      continue;
    }
    if (arg === "--dry-run") {
      if (explicitMode === "write") {
        throw new Error("Choose either --dry-run or --write, not both.");
      }
      explicitMode = "dry-run";
      options.write = false;
      continue;
    }
    if (arg === "--write") {
      if (explicitMode === "dry-run") {
        throw new Error("Choose either --dry-run or --write, not both.");
      }
      explicitMode = "write";
      options.write = true;
      continue;
    }
    if (arg === "--source-file") {
      options.sourceFile = requiredArg(argv, ++index, arg);
      continue;
    }
    if (arg === "--output-dir") {
      options.outputDirectory = requiredArg(argv, ++index, arg);
      continue;
    }
    if (arg === "--profile") {
      options.profile = requiredArg(argv, ++index, arg);
      continue;
    }
    throw new Error(`Unknown argument: ${arg}`);
  }
  return options;
}

function requiredArg(args, index, flag) {
  const value = args[index];
  if (!value || value.startsWith("--")) {
    throw new Error(`${flag} requires a value.`);
  }
  return value;
}

function printHelp() {
  console.log(`Import the one-time CSLB License Master contractor dataset.

Usage:
  npm run contractors:cslb:import -- --dry-run --source-file <path>
  npm run contractors:cslb:import -- --write --source-file <path>

Options:
  --source-file <path>  Required CSV source path.
  --dry-run             Parse and report without AWS access. This is the default.
  --write               Run the guarded one-time production import.
  --output-dir <path>   Local manifest and report directory.
  --profile <name>      AWS profile. Write mode requires ${EXPECTED_AWS_PROFILE}.
  --help                Show this help.`);
}

async function main() {
  const options = parseArgs(process.argv.slice(2));
  if (options.help) {
    printHelp();
    return;
  }
  if (!options.sourceFile) {
    throw new Error("--source-file is required.");
  }
  await runCslbImport(options);
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
