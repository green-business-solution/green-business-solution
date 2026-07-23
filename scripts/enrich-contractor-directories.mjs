import crypto from "node:crypto";
import fs from "node:fs";
import fsPromises from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { execFile } from "node:child_process";
import { promisify } from "node:util";
import { fileURLToPath, pathToFileURL } from "node:url";

import { DynamoDBClient, DescribeTableCommand } from "@aws-sdk/client-dynamodb";
import {
  DynamoDBDocumentClient,
  PutCommand,
  ScanCommand,
  UpdateCommand,
} from "@aws-sdk/lib-dynamodb";
import {
  GetObjectCommand,
  HeadBucketCommand,
  HeadObjectCommand,
  ListObjectsV2Command,
  PutObjectCommand,
  S3Client,
} from "@aws-sdk/client-s3";
import { fromIni } from "@aws-sdk/credential-providers";

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
  SOURCE_CATALOG,
  collectOfficialDirectoryRecords,
  loadReviewedDirectoryRecords,
} from "./contractor-directory-sources.mjs";

const execFileAsync = promisify(execFile);

export const ENRICHMENT_SCRIPT_VERSION = "1.0.0";
export const ENRICHMENT_REPORT_SCHEMA_VERSION =
  "contractor-directory-enrichment-report.v1";

const PATCHABLE_CSLB_FIELDS = [
  "primaryStatus",
  "secondaryStatus",
  "pendingSuspension",
  "pendingClassRemoval",
  "pendingClassReplace",
];
const ENRICHMENT_ARRAY_FIELDS = [
  "serviceAreas",
  "programMemberships",
  "certifications",
];

export async function runContractorDirectoryConsolidation(
  options,
  dependencies = {},
) {
  const now = dependencies.now || (() => new Date());
  const startedAt = now().toISOString();
  const profile =
    options.profile || process.env.AWS_PROFILE || EXPECTED_AWS_PROFILE;
  if (profile !== EXPECTED_AWS_PROFILE) {
    throw new Error(
      `This operation requires AWS profile ${EXPECTED_AWS_PROFILE}. Received: ${profile}`,
    );
  }

  const reviewedReport = options.write
    ? await readReviewedReport(options.reviewedReport)
    : null;
  const runId =
    reviewedReport?.runId ||
    `directory-enrichment-${startedAt.replace(/[-:.]/g, "").replace("Z", "Z")}`;
  if (options.write && options.approval !== runId) {
    throw new Error(
      `Write mode requires --approval ${runId} for the reviewed dry run.`,
    );
  }

  const outputDirectory = path.resolve(
    options.outputDirectory ||
      (reviewedReport
        ? path.dirname(path.resolve(options.reviewedReport))
        : path.join("var", "contractor-directory-enrichment", runId)),
  );
  await fsPromises.mkdir(outputDirectory, { recursive: true });

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
      `This operation requires AWS account ${EXPECTED_AWS_ACCOUNT_ID}. Received: ${accountId}`,
    );
  }
  await aws.assertInfrastructure();

  if (options.write && aws.readJson) {
    const existingReport = await aws.readJson(
      `imports/enrichment/${runId}/report.json`,
    );
    if (
      existingReport &&
      existingReport.proposalHash === reviewedReport.proposalHash
    ) {
      const reportPath = path.join(outputDirectory, "report.json");
      await fsPromises.writeFile(
        reportPath,
        `${JSON.stringify(existingReport, null, 2)}\n`,
      );
      if (!options.quiet) {
        console.log(
          `Run ${runId} was already applied. No AWS writes were repeated.`,
        );
      }
      return {
        plan: null,
        report: {
          ...existingReport,
          idempotentReplay: true,
          replayAwsWriteCount: 0,
        },
        reportPath,
      };
    }
  }

  if (!options.quiet) {
    console.log("Reading the live contractor table and raw CSLB snapshot.");
  }
  const temporaryDirectory = await fsPromises.mkdtemp(
    path.join(os.tmpdir(), "retrofi-contractor-enrichment-"),
  );
  let report;
  try {
    const [existingContractors, cslbSource, mapping] = await Promise.all([
      aws.scanContractors(),
      aws.downloadLatestCslbSource(temporaryDirectory),
      loadClassificationMapping(options.mappingPath || DEFAULT_MAPPING_PATH),
    ]);
    const cslbParseResult = await parseCslbSource(cslbSource.localPath);

    if (!options.quiet) {
      console.log(
        `Read ${existingContractors.length} live contractors and ${cslbParseResult.contractorsByLicense.size} CSLB licenses.`,
      );
    }

    const sourceCollection =
      dependencies.sourceCollection ||
      (reviewedReport
        ? await loadReviewedDirectoryRecords({
            report: reviewedReport,
            reportPath: path.resolve(options.reviewedReport),
          })
        : await collectOfficialDirectoryRecords({
            outputDirectory,
            fetchedAt: startedAt,
            fetchImpl: dependencies.fetchImpl || fetch,
            quiet: options.quiet,
          }));

    const plan = planConsolidation({
      cslbContext: {
        importId: cslbSource.importId,
        importedAt: reviewedReport?.startedAt || startedAt,
        s3SourceKey: cslbSource.s3Key,
        sourceReceivedAt: cslbSource.sourceReceivedAt,
      },
      cslbRecords: [...cslbParseResult.contractorsByLicense.values()],
      directoryRecords: sourceCollection.records,
      existingContractors,
      mapping,
    });
    const proposalHash = sha256Text(
      stableStringify({
        newItems: plan.newItems,
        updates: plan.updates,
      }),
    );

    if (
      reviewedReport &&
      proposalHash !== reviewedReport.proposalHash
    ) {
      throw new Error(
        `The current live data produces proposal hash ${proposalHash}, not reviewed hash ${reviewedReport.proposalHash}. Run and review a new dry run.`,
      );
    }

    report = buildReport({
      accountId,
      cslbSource,
      existingContractors,
      mode: options.write ? "write" : "dry-run",
      plan,
      proposalHash,
      runId,
      sourceCollection,
      startedAt,
    });

    if (options.write) {
      const writeResult = await applyPlan({
        aws,
        outputDirectory,
        plan,
        report,
        sourceCollection,
        updateConcurrency: options.writeConcurrency,
        quiet: options.quiet,
      });
      report.writeSummary = writeResult;
      report.awsWriteCount = writeResult.awsWriteCount;
      report.dryRunConfirmedZeroAwsWrites = false;
    }

    report.completedAt = now().toISOString();
    const reportPath = path.join(outputDirectory, "report.json");
    await fsPromises.writeFile(
      reportPath,
      `${JSON.stringify(report, null, 2)}\n`,
    );
    if (options.write) {
      report.awsWriteCount += 1;
      report.writeSummary.awsWriteCount = report.awsWriteCount;
      await aws.uploadJson(
        `imports/enrichment/${runId}/report.json`,
        report,
      );
      await fsPromises.writeFile(
        reportPath,
        `${JSON.stringify(report, null, 2)}\n`,
      );
    }

    if (!options.quiet) printSummary(report, reportPath);
    return { plan, report, reportPath };
  } finally {
    await fsPromises.rm(temporaryDirectory, {
      force: true,
      recursive: true,
    });
  }
}

export function planConsolidation({
  cslbContext,
  cslbRecords,
  directoryRecords,
  existingContractors,
  mapping,
}) {
  const updatesById = new Map();
  const newItemsById = new Map();
  const decisions = [];
  const conflicts = [];
  const existingIndices = buildExactIndices(existingContractors);
  const rawIndices = buildExactIndices(cslbRecords);
  const rawByLicense = new Map(
    cslbRecords.map((record) => [normalizeLicense(record.licenseNumber), record]),
  );
  const maximumSnapshotLicenseNumber = cslbRecords.reduce(
    (maximum, record) =>
      Math.max(
        maximum,
        Number.parseInt(normalizeLicense(record.licenseNumber), 10) || 0,
      ),
    0,
  );
  const postSnapshotCandidateLicenseNumbers = [
    ...new Set(
      directoryRecords
        .map((record) => normalizeLicense(record.licenseNumber))
        .filter(
          (licenseNumber) =>
            licenseNumber &&
            Number.parseInt(licenseNumber, 10) >
              maximumSnapshotLicenseNumber,
        ),
    ),
  ].sort(compareStrings);

  planCslbFieldPatches({
    conflicts,
    existingContractors,
    rawByLicense,
    updatesById,
  });

  for (const directoryRecord of directoryRecords) {
    const existingMatch = matchExact(directoryRecord, existingIndices);
    if (existingMatch.status === "matched") {
      const changedFields = planDirectoryEnrichment({
        conflicts,
        directoryRecord,
        existing: existingMatch.record,
        matchMethod: existingMatch.method,
        updatesById,
      });
      decisions.push(
        decision(
          directoryRecord,
          changedFields.length
            ? "existing_enrichment_proposed"
            : "already_present",
          {
            changedFields,
            contractorId: existingMatch.record.contractorId,
            matchMethod: existingMatch.method,
          },
        ),
      );
      continue;
    }
    if (existingMatch.status === "ambiguous") {
      decisions.push(
        decision(directoryRecord, "ambiguous_existing_match", {
          matchMethod: existingMatch.method,
        }),
      );
      continue;
    }

    const rawMatch = matchExact(directoryRecord, rawIndices);
    if (rawMatch.status === "ambiguous") {
      decisions.push(
        decision(directoryRecord, "ambiguous_cslb_match", {
          matchMethod: rawMatch.method,
        }),
      );
      continue;
    }
    if (rawMatch.status !== "matched") {
      decisions.push(decision(directoryRecord, "unmatched"));
      continue;
    }
    if (looksNonContractor(directoryRecord)) {
      decisions.push(
        decision(directoryRecord, "noncontractor", {
          matchMethod: rawMatch.method,
        }),
      );
      continue;
    }
    if (
      directoryRecord.licenseNumber &&
      !namesCompatible(
        directoryRecord.businessName,
        rawMatch.record.businessName,
      )
    ) {
      decisions.push(
        decision(directoryRecord, "identity_conflict", {
          matchMethod: rawMatch.method,
        }),
      );
      conflicts.push(
        conflict(directoryRecord, "businessName", rawMatch.record),
      );
      continue;
    }
    if (normalizeStatus(rawMatch.record.primaryStatus) !== "CLEAR") {
      decisions.push(
        decision(directoryRecord, "inactive_or_unusable_license", {
          matchMethod: rawMatch.method,
        }),
      );
      continue;
    }
    const newItem = buildContractorItem(rawMatch.record, mapping, cslbContext);
    if (
      !newItem.matchedClassificationCodes.length ||
      !newItem.supportedRetrofitIds.length
    ) {
      decisions.push(
        decision(directoryRecord, "unmapped_classification", {
          matchMethod: rawMatch.method,
        }),
      );
      continue;
    }
    planDirectoryEnrichment({
      conflicts,
      directoryRecord,
      existing: newItem,
      matchMethod: rawMatch.method,
      updatesById: new Map(),
      mutableItem: newItem,
    });
    const existingCandidate = newItemsById.get(newItem.contractorId);
    if (existingCandidate) {
      mergeNewItemEnrichment(existingCandidate, newItem);
    } else {
      newItemsById.set(newItem.contractorId, newItem);
    }
    decisions.push(
      decision(directoryRecord, "new_contractor_proposed", {
        contractorId: newItem.contractorId,
        matchMethod: rawMatch.method,
      }),
    );
  }

  const updates = [...updatesById.values()]
    .filter((update) => Object.keys(update.set).length)
    .sort((left, right) =>
      compareStrings(left.contractorId, right.contractorId),
    );
  const newItems = [...newItemsById.values()].sort((left, right) =>
    compareStrings(left.contractorId, right.contractorId),
  );

  assertSupportedRetrofitsUnchanged(updates);
  return {
    boundedOfficialCslbLookup: {
      limit: 25,
      maximumSnapshotLicenseNumber,
      candidateCount: postSnapshotCandidateLicenseNumbers.length,
      attemptedCount: 0,
      outcome:
        postSnapshotCandidateLicenseNumbers.length === 0
          ? "No directory license number postdates the retained CSLB snapshot."
          : "Post-snapshot candidates require exact official CSLB detail review before a row can be added.",
    },
    conflicts,
    decisions,
    newItems,
    updates,
  };
}

export function classifyDirectoryEntriesForResolution({
  cslbRecords,
  directoryRecords,
  existingContractors,
  mapping,
}) {
  const existingIndices = buildExactIndices(existingContractors);
  const rawIndices = buildExactIndices(cslbRecords);
  return directoryRecords.map((directoryRecord) => {
    const existingMatch = matchExact(directoryRecord, existingIndices);
    if (existingMatch.status === "matched") {
      return decision(directoryRecord, "existing_match", {
        contractorId: existingMatch.record.contractorId,
        matchMethod: existingMatch.method,
      });
    }
    if (existingMatch.status === "ambiguous") {
      return decision(directoryRecord, "ambiguous_existing_match", {
        matchMethod: existingMatch.method,
      });
    }

    const rawMatch = matchExact(directoryRecord, rawIndices);
    if (rawMatch.status === "ambiguous") {
      return decision(directoryRecord, "ambiguous_cslb_match", {
        matchMethod: rawMatch.method,
      });
    }
    if (rawMatch.status !== "matched") {
      return decision(directoryRecord, "unmatched");
    }
    if (looksNonContractor(directoryRecord)) {
      return decision(directoryRecord, "noncontractor", {
        matchMethod: rawMatch.method,
      });
    }
    if (
      directoryRecord.licenseNumber &&
      !namesCompatible(
        directoryRecord.businessName,
        rawMatch.record.businessName,
      )
    ) {
      return decision(directoryRecord, "identity_conflict", {
        matchMethod: rawMatch.method,
      });
    }
    if (normalizeStatus(rawMatch.record.primaryStatus) !== "CLEAR") {
      return decision(
        directoryRecord,
        "inactive_or_unusable_license",
        {
          matchMethod: rawMatch.method,
        },
      );
    }
    const mappedCodes = rawMatch.record.licenseClassifications.filter(
      (code) => mapping.has(code),
    );
    const mappedRetrofits = new Set(
      mappedCodes.flatMap(
        (code) => mapping.get(code)?.retrofitIds || [],
      ),
    );
    if (!mappedCodes.length || !mappedRetrofits.size) {
      return decision(directoryRecord, "unmapped_classification", {
        matchMethod: rawMatch.method,
      });
    }
    return decision(directoryRecord, "new_contractor_proposed", {
      contractorId: `CA_CSLB_${normalizeLicense(
        rawMatch.record.licenseNumber,
      )}`,
      matchMethod: rawMatch.method,
    });
  });
}

export function buildExactIndices(records) {
  const indices = {
    license: new Map(),
    phone: new Map(),
    nameZip: new Map(),
    nameAddress: new Map(),
    name: new Map(),
  };
  for (const record of records) {
    addIndex(indices.license, normalizeLicense(record.licenseNumber), record);
    addIndex(indices.phone, normalizePhone(record.phone), record);
    const name = normalizeName(record.businessName);
    const zip = normalizeZip(
      record.zip || record.businessAddress?.postalCode,
    );
    const address = normalizeAddress(
      record.address || record.businessAddress,
    );
    addIndex(indices.nameZip, name && zip ? `${name}|${zip}` : "", record);
    addIndex(
      indices.nameAddress,
      name && address ? `${name}|${address}` : "",
      record,
    );
    addIndex(indices.name, name, record);
  }
  return indices;
}

export function matchExact(record, indices) {
  const candidates = [
    ["license", normalizeLicense(record.licenseNumber)],
    ["phone", normalizePhone(record.phone)],
    [
      "name_zip",
      normalizeName(record.businessName) &&
      normalizeZip(record.zip || record.address?.postalCode)
        ? `${normalizeName(record.businessName)}|${normalizeZip(
            record.zip || record.address?.postalCode,
          )}`
        : "",
    ],
    [
      "name_address",
      normalizeName(record.businessName) && normalizeAddress(record.address)
        ? `${normalizeName(record.businessName)}|${normalizeAddress(
            record.address,
          )}`
        : "",
    ],
    ["unique_statewide_name", normalizeName(record.businessName)],
  ];
  const maps = {
    license: indices.license,
    name_address: indices.nameAddress,
    name_zip: indices.nameZip,
    phone: indices.phone,
    unique_statewide_name: indices.name,
  };
  for (const [method, key] of candidates) {
    if (!key) continue;
    const matches = maps[method].get(key) || [];
    if (matches.length === 1) {
      return { method, record: matches[0], status: "matched" };
    }
    if (matches.length > 1) {
      return { method, status: "ambiguous" };
    }
  }
  return { status: "unmatched" };
}

function planCslbFieldPatches({
  conflicts,
  existingContractors,
  rawByLicense,
  updatesById,
}) {
  for (const existing of existingContractors) {
    const raw = rawByLicense.get(normalizeLicense(existing.licenseNumber));
    if (!raw) continue;
    const update = ensureUpdate(updatesById, existing);
    for (const field of PATCHABLE_CSLB_FIELDS) {
      planMissingScalar({
        conflicts,
        existing,
        field,
        sourceRecord: raw,
        update,
        value: raw[field],
      });
    }
    const county = clean(raw.businessAddress?.county);
    if (county && !clean(existing.businessAddress?.county)) {
      update.expected.businessAddress = existing.businessAddress;
      update.set.businessAddress = {
        ...(existing.businessAddress || {}),
        county,
      };
      update.reasons.push("cslb:businessAddress.county");
    } else if (
      county &&
      clean(existing.businessAddress?.county) &&
      clean(existing.businessAddress.county) !== county
    ) {
      conflicts.push({
        contractorId: existing.contractorId,
        field: "businessAddress.county",
        sourceId: "cslb",
      });
    }
  }
}

function planMissingScalar({
  conflicts,
  existing,
  field,
  sourceRecord,
  update,
  value,
}) {
  const candidate = clean(value);
  if (!candidate) return;
  if (!clean(existing[field])) {
    update.expected[field] = existing[field];
    update.set[field] = candidate;
    update.reasons.push(`cslb:${field}`);
  } else if (clean(existing[field]) !== candidate) {
    conflicts.push({
      contractorId: existing.contractorId,
      field,
      sourceId: sourceRecord.sourceId || "cslb",
    });
  }
}

export function planDirectoryEnrichment({
  conflicts,
  directoryRecord,
  existing,
  matchMethod,
  updatesById,
  mutableItem,
}) {
  const changedFields = [];
  const update = mutableItem
    ? null
    : ensureUpdate(updatesById, existing);
  const target = mutableItem
    ? mutableItem
    : {
        ...existing,
        ...update.set,
      };
  const candidateValues = {
    email: directoryRecord.email,
    servesCommercial: directoryRecord.commercial,
    serviceAreas: directoryRecord.serviceAreas,
    programMemberships: directoryRecord.programMemberships,
    certifications: directoryRecord.certifications,
  };

  for (const field of ["email", "servesCommercial"]) {
    const candidate = clean(candidateValues[field]);
    if (!candidate) continue;
    const current = clean(target[field]);
    if (field === "servesCommercial" && current === "UNKNOWN") {
      setField({ field, target, update, value: candidate });
      changedFields.push(field);
    } else if (!current) {
      setField({ field, target, update, value: candidate });
      changedFields.push(field);
    } else if (current !== candidate) {
      conflicts.push({
        contractorId: existing.contractorId,
        field,
        sourceId: directoryRecord.sourceId,
        sourceRecordId: directoryRecord.sourceRecordId,
      });
    }
  }

  for (const field of ENRICHMENT_ARRAY_FIELDS) {
    const candidates = candidateValues[field] || [];
    if (!candidates.length) continue;
    const merged = mergeArrayField(field, target[field] || [], candidates);
    if (stableStringify(merged) === stableStringify(target[field] || [])) {
      continue;
    }
    setField({ field, target, update, value: merged });
    changedFields.push(field);
  }

  if (changedFields.length) {
    const evidence = changedFields.map((field) =>
      evidenceFor(
        directoryRecord,
        field,
        candidateValues[field],
        matchMethod,
      ),
    );
    const mergedEvidence = deduplicateEvidence([
      ...(target.enrichmentEvidence || []),
      ...evidence,
    ]);
    setField({
      field: "enrichmentEvidence",
      target,
      update,
      value: mergedEvidence,
    });
  }
  return changedFields;
}

function setField({ field, target, update, value }) {
  if (update) {
    if (!(field in update.expected)) update.expected[field] = target[field];
    update.set[field] = value;
    update.reasons.push(`directory:${field}`);
  } else {
    target[field] = value;
  }
}

function mergeArrayField(field, existing, candidates) {
  if (field === "certifications") {
    return [
      ...new Map(
        [...existing, ...candidates]
          .filter((value) => value?.name)
          .map((value) => [
            `${clean(value.issuer).toUpperCase()}|${clean(value.name).toUpperCase()}`,
            {
              issuer: clean(value.issuer),
              name: clean(value.name),
            },
          ]),
      ).values(),
    ].sort(
      (left, right) =>
        compareStrings(left.issuer, right.issuer) ||
        compareStrings(left.name, right.name),
    );
  }
  return [...new Set([...existing, ...candidates].map(clean).filter(Boolean))].sort(
    compareStrings,
  );
}

function evidenceFor(record, field, value, matchMethod) {
  return {
    field,
    matchMethod,
    sourceId: record.sourceId,
    sourceName: record.sourceName,
    sourceUrl: record.sourceUrl,
    sourceValue: evidenceValue(value),
    verificationDate: record.retrievedAt.slice(0, 10),
  };
}

function evidenceValue(value) {
  if (Array.isArray(value)) {
    return value
      .map((child) =>
        typeof child === "string"
          ? child
          : `${clean(child.issuer)}: ${clean(child.name)}`,
      )
      .join(" | ");
  }
  return clean(value);
}

function deduplicateEvidence(values) {
  return [
    ...new Map(
      values.map((value) => [
        [
          value.field,
          value.sourceId,
          value.sourceUrl,
          value.sourceValue,
          value.verificationDate,
        ].join("|"),
        value,
      ]),
    ).values(),
  ].sort(
    (left, right) =>
      compareStrings(left.field, right.field) ||
      compareStrings(left.sourceId, right.sourceId) ||
      compareStrings(left.sourceValue, right.sourceValue),
  );
}

function mergeNewItemEnrichment(existing, incoming) {
  for (const field of ENRICHMENT_ARRAY_FIELDS) {
    existing[field] = mergeArrayField(
      field,
      existing[field] || [],
      incoming[field] || [],
    );
    if (!existing[field].length) delete existing[field];
  }
  existing.enrichmentEvidence = deduplicateEvidence([
    ...(existing.enrichmentEvidence || []),
    ...(incoming.enrichmentEvidence || []),
  ]);
  if (!existing.email && incoming.email) existing.email = incoming.email;
  if (!existing.servesCommercial && incoming.servesCommercial) {
    existing.servesCommercial = incoming.servesCommercial;
  }
}

function ensureUpdate(updatesById, existing) {
  let update = updatesById.get(existing.contractorId);
  if (!update) {
    update = {
      contractorId: existing.contractorId,
      expected: {},
      reasons: [],
      set: {},
    };
    updatesById.set(existing.contractorId, update);
  }
  return update;
}

function buildReport({
  accountId,
  cslbSource,
  existingContractors,
  mode,
  plan,
  proposalHash,
  runId,
  sourceCollection,
  startedAt,
}) {
  const decisionCounts = countBy(
    plan.decisions,
    (entry) => entry.disposition,
  );
  const sources = sourceCollection.sourceResults.map((source) => {
    const sourceDecisions = plan.decisions.filter(
      (entry) => entry.sourceId === source.id,
    );
    return {
      ...source,
      existingContractorsMatched: uniqueCount(
        sourceDecisions
          .filter((entry) =>
            [
              "already_present",
              "existing_enrichment_proposed",
            ].includes(entry.disposition),
          )
          .map((entry) => entry.contractorId),
      ),
      proposedEnrichments: sourceDecisions.filter(
        (entry) => entry.disposition === "existing_enrichment_proposed",
      ).length,
      directoryEntriesAlreadyPresent: sourceDecisions.filter(
        (entry) => entry.disposition === "already_present",
      ).length,
      proposedNewContractors: sourceDecisions.filter(
        (entry) => entry.disposition === "new_contractor_proposed",
      ).length,
      ambiguousMatches: sourceDecisions.filter((entry) =>
        entry.disposition.startsWith("ambiguous_"),
      ).length,
      inactiveOrUnusableLicenses: sourceDecisions.filter(
        (entry) => entry.disposition === "inactive_or_unusable_license",
      ).length,
      unmappedClassifications: sourceDecisions.filter(
        (entry) => entry.disposition === "unmapped_classification",
      ).length,
      noncontractorEntries: sourceDecisions.filter(
        (entry) => entry.disposition === "noncontractor",
      ).length,
      identityConflicts: sourceDecisions.filter(
        (entry) => entry.disposition === "identity_conflict",
      ).length,
      fieldConflicts: plan.conflicts.filter(
        (entry) => entry.sourceId === source.id,
      ).length,
      unmatchedEntries: sourceDecisions.filter(
        (entry) => entry.disposition === "unmatched",
      ).length,
    };
  });
  const patchFields = countBy(
    plan.updates.flatMap((update) =>
      Object.keys(update.set)
        .filter(
          (field) =>
            PATCHABLE_CSLB_FIELDS.includes(field) ||
            field === "businessAddress",
        )
        .map((field) => ({ field })),
    ),
    (entry) => entry.field,
  );
  const enrichmentFields = countBy(
    plan.updates.flatMap((update) =>
      Object.keys(update.set)
        .filter(
          (field) =>
            !PATCHABLE_CSLB_FIELDS.includes(field) &&
            field !== "businessAddress" &&
            field !== "enrichmentEvidence",
        )
        .map((field) => ({ field })),
    ),
    (entry) => entry.field,
  );
  return {
    schemaVersion: ENRICHMENT_REPORT_SCHEMA_VERSION,
    scriptVersion: ENRICHMENT_SCRIPT_VERSION,
    runId,
    mode,
    startedAt,
    completedAt: "",
    accountId,
    resources: {
      bucket: CONTRACTOR_SOURCE_BUCKET,
      bucketRegion: S3_REGION,
      table: CONTRACTORS_TABLE,
      tableRegion: DYNAMODB_REGION,
    },
    cslbSource: {
      s3Key: cslbSource.s3Key,
      sha256: cslbSource.sha256,
      sizeBytes: cslbSource.sizeBytes,
      sourceReceivedAt: cslbSource.sourceReceivedAt,
      importId: cslbSource.importId,
    },
    liveContractorCount: existingContractors.length,
    sourceSnapshots: sourceCollection.snapshots.map(
      ({ absolutePath: _absolutePath, ...snapshot }) => snapshot,
    ),
    sources,
    combinedTotals: {
      directoryEntryCount: sourceCollection.records.length,
      existingContractorsMatched: uniqueCount(
        plan.decisions
          .filter((entry) =>
            [
              "already_present",
              "existing_enrichment_proposed",
            ].includes(entry.disposition),
          )
          .map((entry) => entry.contractorId),
      ),
      proposedExistingContractorUpdates: plan.updates.filter((update) =>
        update.reasons.some((reason) => reason.startsWith("directory:")),
      ).length,
      proposedCslbPatchUpdates: plan.updates.filter((update) =>
        update.reasons.some((reason) => reason.startsWith("cslb:")),
      ).length,
      proposedNewContractors: plan.newItems.length,
      conflictCount: plan.conflicts.length,
      dispositionCounts: decisionCounts,
      proposedCslbPatchFieldCounts: patchFields,
      proposedEnrichmentFieldCounts: enrichmentFields,
    },
    boundedOfficialCslbLookup: plan.boundedOfficialCslbLookup,
    proposalHash,
    quarantinedExamples: plan.decisions
      .filter(
        (entry) =>
          ![
            "already_present",
            "existing_enrichment_proposed",
            "new_contractor_proposed",
          ].includes(entry.disposition),
      )
      .slice(0, 50)
      .map(sanitizeDecision),
    proposedChangeExamples: [
      ...plan.updates.slice(0, 10).map((update) => ({
        contractorId: update.contractorId,
        fields: Object.keys(update.set).sort(compareStrings),
      })),
      ...plan.newItems.slice(0, 10).map((item) => ({
        contractorId: item.contractorId,
        fields: Object.keys(item).sort(compareStrings),
        proposedNewContractor: true,
      })),
    ],
    conflictExamples: plan.conflicts.slice(0, 50),
    invariants: {
      existingRowsModifySupportedRetrofitIds: false,
      storesContactFormUrl: false,
      storesVerifiedRetrofitIds: false,
      storesWebsite: false,
    },
    awsWriteCount: 0,
    dryRunConfirmedZeroAwsWrites: mode === "dry-run",
    writeInstructions:
      mode === "dry-run"
        ? `After review, run with --write --reviewed-report <this report path> --approval ${runId}.`
        : undefined,
  };
}

async function applyPlan({
  aws,
  outputDirectory,
  plan,
  quiet,
  report,
  sourceCollection,
  updateConcurrency = 24,
}) {
  let awsWriteCount = 0;
  let updatedContractorCount = 0;
  let insertedContractorCount = 0;
  const date = report.startedAt.slice(0, 10);

  for (const snapshot of sourceCollection.snapshots) {
    const localPath =
      snapshot.absolutePath ||
      path.join(outputDirectory, snapshot.relativePath);
    const key = `raw/enrichment/${snapshot.sourceId}/${date}/${snapshot.sha256.slice(
      0,
      12,
    )}-${path.basename(snapshot.relativePath)}`;
    const uploaded = await aws.uploadFile({
      contentType: snapshot.contentType,
      key,
      localPath,
      sha256: snapshot.sha256,
      sizeBytes: snapshot.sizeBytes,
    });
    if (uploaded) awsWriteCount += 1;
  }
  await forEachConcurrent({
    concurrency: updateConcurrency,
    onProgress: (completed, total) => {
      if (!quiet && (completed % 5_000 === 0 || completed === total)) {
        console.log(
          `Applied ${completed} of ${total} conditional contractor updates.`,
        );
      }
    },
    values: plan.updates,
    worker: async (update) => {
      await aws.updateContractor(update);
      awsWriteCount += 1;
      updatedContractorCount += 1;
    },
  });
  for (const item of plan.newItems) {
    await aws.putContractor(item);
    awsWriteCount += 1;
    insertedContractorCount += 1;
  }
  return {
    awsWriteCount,
    insertedContractorCount,
    snapshotUploadCount: sourceCollection.snapshots.length,
    updateConcurrency,
    updatedContractorCount,
  };
}

export async function forEachConcurrent({
  concurrency,
  onProgress = () => {},
  values,
  worker,
}) {
  const boundedConcurrency = Math.max(
    1,
    Math.min(Number(concurrency) || 1, values.length || 1),
  );
  let nextIndex = 0;
  let completed = 0;
  let failure;

  async function runWorker() {
    while (!failure) {
      const index = nextIndex;
      nextIndex += 1;
      if (index >= values.length) return;
      try {
        await worker(values[index], index);
        completed += 1;
        onProgress(completed, values.length);
      } catch (error) {
        failure = error;
      }
    }
  }

  await Promise.all(
    Array.from({ length: boundedConcurrency }, () => runWorker()),
  );
  if (failure) throw failure;
}

export function createAwsAdapter({
  bucketName,
  profile,
  s3Region,
  tableName,
  tableRegion,
}) {
  const credentials = fromIni({ profile });
  const s3 = new S3Client({ credentials, region: s3Region });
  const dynamodbClient = new DynamoDBClient({
    credentials,
    maxAttempts: 10,
    region: tableRegion,
  });
  const db = DynamoDBDocumentClient.from(dynamodbClient, {
    marshallOptions: { removeUndefinedValues: true },
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
      const result = await dynamodbClient.send(
        new DescribeTableCommand({ TableName: tableName }),
      );
      if (result.Table?.TableStatus !== "ACTIVE") {
        throw new Error(`${tableName} is not ACTIVE.`);
      }
    },

    async scanContractors() {
      const items = [];
      let ExclusiveStartKey;
      do {
        const result = await db.send(
          new ScanCommand({
            TableName: tableName,
            ExclusiveStartKey,
            ConsistentRead: false,
          }),
        );
        items.push(...(result.Items || []));
        ExclusiveStartKey = result.LastEvaluatedKey;
      } while (ExclusiveStartKey);
      return items;
    },

    async downloadLatestCslbSource(destinationDirectory) {
      const objects = await listAllObjects(s3, bucketName, "raw/cslb/");
      const csvObjects = objects
        .filter((object) => object.Key?.toLowerCase().endsWith(".csv"))
        .sort(
          (left, right) =>
            Number(right.Size || 0) - Number(left.Size || 0) ||
            String(right.LastModified).localeCompare(
              String(left.LastModified),
            ),
        );
      const object = csvObjects[0];
      if (!object?.Key) {
        throw new Error("No raw CSLB CSV exists in the source bucket.");
      }
      const response = await s3.send(
        new GetObjectCommand({ Bucket: bucketName, Key: object.Key }),
      );
      const localPath = path.join(destinationDirectory, "MasterLicenseData.csv");
      await fsPromises.writeFile(
        localPath,
        Buffer.from(await response.Body.transformToByteArray()),
      );
      const sha256 = await sha256File(localPath);
      const manifest = await findCslbManifest(s3, bucketName, object.Key);
      return {
        importId:
          manifest?.importId ||
          `cslb-${sha256.slice(0, 12)}`,
        localPath,
        s3Key: object.Key,
        sha256,
        sizeBytes: Number(object.Size || 0),
        sourceReceivedAt:
          manifest?.receivedAt ||
          object.LastModified?.toISOString() ||
          "",
      };
    },

    async readJson(key) {
      try {
        const response = await s3.send(
          new GetObjectCommand({ Bucket: bucketName, Key: key }),
        );
        return JSON.parse(await response.Body.transformToString());
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

    async uploadFile({
      contentType,
      key,
      localPath,
      sha256,
      sizeBytes,
    }) {
      const expectedChecksum = Buffer.from(sha256, "hex").toString("base64");
      try {
        const existing = await s3.send(
          new HeadObjectCommand({
            Bucket: bucketName,
            Key: key,
            ChecksumMode: "ENABLED",
          }),
        );
        if (
          Number(existing.ContentLength) === Number(sizeBytes) &&
          existing.ChecksumSHA256 === expectedChecksum
        ) {
          return false;
        }
        throw new Error(
          `Refusing to replace different retained source object s3://${bucketName}/${key}.`,
        );
      } catch (error) {
        if (
          error?.$metadata?.httpStatusCode !== 404 &&
          error?.name !== "NotFound" &&
          error?.name !== "NoSuchKey"
        ) {
          throw error;
        }
      }
      await s3.send(
        new PutObjectCommand({
          Bucket: bucketName,
          Key: key,
          Body: fs.createReadStream(localPath),
          ContentLength: sizeBytes,
          ContentType: contentType,
          ChecksumSHA256: expectedChecksum,
          IfNoneMatch: "*",
        }),
      );
      return true;
    },

    async uploadJson(key, value) {
      await s3.send(
        new PutObjectCommand({
          Bucket: bucketName,
          Key: key,
          Body: `${JSON.stringify(value, null, 2)}\n`,
          ContentType: "application/json",
          IfNoneMatch: "*",
        }),
      );
    },

    async updateContractor(update) {
      const fields = Object.keys(update.set).sort(compareStrings);
      const names = { "#contractorId": "contractorId" };
      const values = {};
      const setParts = [];
      const conditions = ["attribute_exists(#contractorId)"];
      fields.forEach((field, index) => {
        const name = `#field${index}`;
        const nextValue = `:next${index}`;
        names[name] = field;
        values[nextValue] = update.set[field];
        setParts.push(`${name} = ${nextValue}`);
        if (update.expected[field] === undefined) {
          conditions.push(`attribute_not_exists(${name})`);
        } else {
          const expectedValue = `:expected${index}`;
          values[expectedValue] = update.expected[field];
          conditions.push(`${name} = ${expectedValue}`);
        }
      });
      await db.send(
        new UpdateCommand({
          TableName: tableName,
          Key: { contractorId: update.contractorId },
          UpdateExpression: `SET ${setParts.join(", ")}`,
          ConditionExpression: conditions.join(" AND "),
          ExpressionAttributeNames: names,
          ExpressionAttributeValues: values,
        }),
      );
    },

    async putContractor(item) {
      await db.send(
        new PutCommand({
          TableName: tableName,
          Item: item,
          ConditionExpression: "attribute_not_exists(contractorId)",
        }),
      );
    },
  };
}

async function listAllObjects(s3, bucket, prefix) {
  const objects = [];
  let ContinuationToken;
  do {
    const result = await s3.send(
      new ListObjectsV2Command({
        Bucket: bucket,
        Prefix: prefix,
        ContinuationToken,
      }),
    );
    objects.push(...(result.Contents || []));
    ContinuationToken = result.NextContinuationToken;
  } while (ContinuationToken);
  return objects;
}

async function findCslbManifest(s3, bucket, sourceKey) {
  const objects = await listAllObjects(s3, bucket, "imports/cslb/");
  const manifests = objects
    .filter((object) => object.Key?.endsWith("/manifest.json"))
    .sort((left, right) =>
      String(right.LastModified).localeCompare(String(left.LastModified)),
    );
  for (const object of manifests.slice(0, 10)) {
    const response = await s3.send(
      new GetObjectCommand({ Bucket: bucket, Key: object.Key }),
    );
    const manifest = JSON.parse(await response.Body.transformToString());
    if (manifest.s3SourceKey === sourceKey) return manifest;
  }
  return null;
}

export async function loadClassificationMapping(mappingPath) {
  const payload = JSON.parse(await fsPromises.readFile(mappingPath, "utf8"));
  return new Map(
    payload.classifications.map((classification) => [
      classification.classificationCode,
      classification,
    ]),
  );
}

async function readReviewedReport(reportPath) {
  if (!reportPath) {
    throw new Error("Write mode requires --reviewed-report <path>.");
  }
  const report = JSON.parse(
    await fsPromises.readFile(path.resolve(reportPath), "utf8"),
  );
  if (
    report.schemaVersion !== ENRICHMENT_REPORT_SCHEMA_VERSION ||
    report.mode !== "dry-run" ||
    !report.dryRunConfirmedZeroAwsWrites
  ) {
    throw new Error("The reviewed report is not a valid dry-run report.");
  }
  return report;
}

function addIndex(index, key, record) {
  if (!key) return;
  const values = index.get(key) || [];
  values.push(record);
  index.set(key, values);
}

function decision(record, disposition, extra = {}) {
  return {
    sourceId: record.sourceId,
    sourceRecordId: record.sourceRecordId,
    businessName: record.businessName,
    disposition,
    ...extra,
  };
}

function conflict(directoryRecord, field, matchedRecord) {
  return {
    contractorId:
      matchedRecord.contractorId ||
      `CA_CSLB_${normalizeLicense(matchedRecord.licenseNumber)}`,
    field,
    sourceId: directoryRecord.sourceId,
    sourceRecordId: directoryRecord.sourceRecordId,
  };
}

function sanitizeDecision(entry) {
  return {
    sourceId: entry.sourceId,
    sourceRecordId: entry.sourceRecordId,
    businessName: entry.businessName,
    disposition: entry.disposition,
    matchMethod: entry.matchMethod,
  };
}

export function looksNonContractor(record) {
  const text = `${record.businessName} ${record.description} ${record.sourceText}`;
  const nonContractor =
    /\bmanufacturer\b|\bdistributor\b|\bwholesaler\b|\bconsulting\b|\barchitect(?:ure)?\b|\bengineering services\b/i.test(
      text,
    );
  const contractor =
    /\bcontractor\b|\bconstruction\b|\binstall(?:er|ation|s|ing)?\b|\bhvac\b|\belectrical\b|\bplumb(?:er|ing)?\b|\bmechanical\b|\bbuild(?:er|ing)?\b/i.test(
      text,
    );
  return nonContractor && !contractor;
}

function namesCompatible(left, right) {
  const normalizedLeft = normalizeName(left);
  const normalizedRight = normalizeName(right);
  if (!normalizedLeft || !normalizedRight) return true;
  if (normalizedLeft === normalizedRight) return true;
  const strippedLeft = stripLegalSuffixes(normalizedLeft);
  const strippedRight = stripLegalSuffixes(normalizedRight);
  return (
    strippedLeft === strippedRight ||
    (strippedLeft.length >= 8 && strippedRight.includes(strippedLeft)) ||
    (strippedRight.length >= 8 && strippedLeft.includes(strippedRight))
  );
}

function stripLegalSuffixes(value) {
  return value
    .replace(
      /\b(?:INCORPORATED|INC|LLC|L L C|CORPORATION|CORP|COMPANY|CO|LP|L P)\b/g,
      " ",
    )
    .replace(/\s+/g, " ")
    .trim();
}

export function normalizeName(value) {
  return clean(value)
    .toUpperCase()
    .replace(/&/g, " AND ")
    .replace(/[^A-Z0-9]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

export function normalizePhone(value) {
  const digits = clean(value).replace(/\D/g, "");
  return digits.length === 11 && digits.startsWith("1")
    ? digits.slice(1)
    : digits;
}

function normalizeLicense(value) {
  return clean(value).replace(/\D/g, "").replace(/^0+/, "");
}

function normalizeZip(value) {
  return clean(value).match(/\d{5}/)?.[0] || "";
}

function normalizeAddress(value = {}) {
  return [
    value.line1,
    value.city,
    value.state,
    normalizeZip(value.postalCode),
  ]
    .map(normalizeName)
    .filter(Boolean)
    .join("|");
}

function normalizeStatus(value) {
  return clean(value).toUpperCase();
}

function assertSupportedRetrofitsUnchanged(updates) {
  for (const update of updates) {
    if (
      Object.hasOwn(update.set, "supportedRetrofitIds") ||
      Object.hasOwn(update.expected, "supportedRetrofitIds")
    ) {
      throw new Error(
        `The consolidation plan attempted to change supportedRetrofitIds for ${update.contractorId}.`,
      );
    }
  }
}

function countBy(values, keyFor) {
  const counts = {};
  for (const value of values) {
    const key = keyFor(value);
    counts[key] = (counts[key] || 0) + 1;
  }
  return Object.fromEntries(
    Object.entries(counts).sort(([left], [right]) =>
      compareStrings(left, right),
    ),
  );
}

function uniqueCount(values) {
  return new Set(values.filter(Boolean)).size;
}

function clean(value) {
  return String(value || "").replace(/\s+/g, " ").trim();
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
        (key) => `${JSON.stringify(key)}:${stableStringify(value[key])}`,
      )
      .join(",")}}`;
  }
  return JSON.stringify(value);
}

function compareStrings(left, right) {
  return String(left).localeCompare(String(right));
}

function printSummary(report, reportPath) {
  console.log(
    JSON.stringify(
      {
        mode: report.mode,
        reportPath,
        directoryEntryCount: report.combinedTotals.directoryEntryCount,
        existingContractorsMatched:
          report.combinedTotals.existingContractorsMatched,
        proposedExistingContractorUpdates:
          report.combinedTotals.proposedExistingContractorUpdates,
        proposedCslbPatchUpdates:
          report.combinedTotals.proposedCslbPatchUpdates,
        proposedNewContractors:
          report.combinedTotals.proposedNewContractors,
        conflictCount: report.combinedTotals.conflictCount,
        proposalHash: report.proposalHash,
        awsWriteCount: report.awsWriteCount,
      },
      null,
      2,
    ),
  );
}

function parseArgs(argv) {
  const options = {
    approval: "",
    mappingPath: "",
    outputDirectory: "",
    profile: "",
    quiet: false,
    reviewedReport: "",
    writeConcurrency: 24,
    write: false,
  };
  let explicitMode = "";
  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index];
    if (arg === "--help" || arg === "-h") {
      options.help = true;
    } else if (arg === "--dry-run") {
      if (explicitMode === "write") {
        throw new Error("Choose either --dry-run or --write.");
      }
      explicitMode = "dry-run";
    } else if (arg === "--write") {
      if (explicitMode === "dry-run") {
        throw new Error("Choose either --dry-run or --write.");
      }
      explicitMode = "write";
      options.write = true;
    } else if (arg === "--approval") {
      options.approval = requiredArg(argv, ++index, arg);
    } else if (arg === "--reviewed-report") {
      options.reviewedReport = requiredArg(argv, ++index, arg);
    } else if (arg === "--mapping") {
      options.mappingPath = requiredArg(argv, ++index, arg);
    } else if (arg === "--output-dir") {
      options.outputDirectory = requiredArg(argv, ++index, arg);
    } else if (arg === "--profile") {
      options.profile = requiredArg(argv, ++index, arg);
    } else if (arg === "--write-concurrency") {
      options.writeConcurrency = parsePositiveInteger(
        requiredArg(argv, ++index, arg),
        arg,
      );
    } else if (arg === "--quiet") {
      options.quiet = true;
    } else {
      throw new Error(`Unknown argument: ${arg}`);
    }
  }
  return options;
}

function parsePositiveInteger(value, flag) {
  const parsed = Number.parseInt(value, 10);
  if (!Number.isInteger(parsed) || parsed < 1 || parsed > 100) {
    throw new Error(`${flag} must be an integer from 1 through 100.`);
  }
  return parsed;
}

function requiredArg(argv, index, flag) {
  const value = argv[index];
  if (!value || value.startsWith("--")) {
    throw new Error(`${flag} requires a value.`);
  }
  return value;
}

function printHelp() {
  console.log(`Consolidate official California contractor directories.

Usage:
  npm run contractors:enrich:directories -- --dry-run
  npm run contractors:enrich:directories -- --write --reviewed-report <path> --approval <run-id>

Options:
  --dry-run                Read live data and sources, then write local reports only.
  --write                  Replay and apply a reviewed dry-run proposal.
  --reviewed-report <path> Required for write mode.
  --approval <run-id>      Required explicit approval for write mode.
  --mapping <path>         Classification mapping path.
  --output-dir <path>      Local report and raw snapshot directory.
  --profile <name>         AWS profile. Must be ${EXPECTED_AWS_PROFILE}.
  --write-concurrency <n>  Concurrent conditional updates. Default: 24.
  --quiet                  Suppress progress output.
  --help                   Show this help.`);
}

async function main() {
  const options = parseArgs(process.argv.slice(2));
  if (options.help) {
    printHelp();
    return;
  }
  await runContractorDirectoryConsolidation(options);
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
