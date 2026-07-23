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
  contractorIdForLicense,
  normalizeLicenseNumber,
  parseCslbSource,
} from "./import-cslb-contractors.mjs";
import {
  ENRICHMENT_REPORT_SCHEMA_VERSION,
  classifyDirectoryEntriesForResolution,
  createAwsAdapter,
  loadClassificationMapping,
  looksNonContractor,
  normalizeName,
  normalizePhone,
  planDirectoryEnrichment,
} from "./enrich-contractor-directories.mjs";
import { loadReviewedDirectoryRecords } from "./contractor-directory-sources.mjs";
import {
  assessCslbIdentity,
  buildCslbBusinessNameQueries,
  businessNamesCompatible,
  createCslbLiveClient,
  parseCslbBusinessNameResults,
  parseCslbLicenseDetail,
} from "./cslb-live-license-resolution.mjs";

export const RESOLUTION_SCRIPT_VERSION = "1.0.0";
export const RESOLUTION_REPORT_SCHEMA_VERSION =
  "contractor-directory-resolution-report.v1";
export const RESOLUTION_PROPOSAL_SCHEMA_VERSION =
  "contractor-directory-resolution-proposal.v1";
export const UNRESOLVED_REPORT_SCHEMA_VERSION =
  "contractor-directory-unresolved-candidates.v1";

const REVIEW_DISPOSITIONS = new Set([
  "ambiguous_cslb_match",
  "ambiguous_existing_match",
  "identity_conflict",
  "inactive_or_unusable_license",
  "new_contractor_proposed",
  "noncontractor",
  "unmapped_classification",
  "unmatched",
]);
const OUTCOME_CATEGORIES = [
  "verified_new_contractor",
  "existing_alternate_identity",
  "inactive_license",
  "unmapped_license",
  "noncontractor_provider",
  "identity_conflict",
  "unresolved_ambiguous",
  "unresolved",
  "lookup_error",
];

export async function runDirectoryContractorResolution(
  options,
  dependencies = {},
) {
  return options.write
    ? runWriteMode(options, dependencies)
    : runDryRun(options, dependencies);
}

async function runDryRun(options, dependencies) {
  const now = dependencies.now || (() => new Date());
  const startedAt = now().toISOString();
  const sourceReportPath = path.resolve(
    requiredOption(options.sourceReport, "--source-report"),
  );
  const sourceReport = await readJsonFile(sourceReportPath);
  assertSourceReport(sourceReport);
  const sourceReportSha256 = await sha256File(sourceReportPath);
  const runId =
    options.runId ||
    `directory-resolution-${startedAt.replace(/[-:.]/g, "")}`;
  const outputDirectory = path.resolve(
    options.outputDirectory ||
      path.join("var", "contractor-directory-resolution", runId),
  );
  await fsPromises.mkdir(outputDirectory, { recursive: true });

  const profile = validateProfile(options.profile);
  const aws = dependencies.aws || createDefaultAwsAdapter(profile);
  const accountId = await validateAws(aws);
  const temporaryDirectory = await fsPromises.mkdtemp(
    path.join(os.tmpdir(), "retrofi-directory-resolution-"),
  );

  try {
    if (!options.quiet) {
      console.log(
        "Reconstructing the reviewed directory records and reading current official contractor data.",
      );
    }
    const mappingPath = path.resolve(
      options.mappingPath || DEFAULT_MAPPING_PATH,
    );
    const [
      sourceCollection,
      existingContractors,
      cslbSource,
      mapping,
      mappingSha256,
    ] = await Promise.all([
      dependencies.sourceCollection ||
        loadReviewedDirectoryRecords({
          report: sourceReport,
          reportPath: sourceReportPath,
        }),
      dependencies.existingContractors || aws.scanContractors(),
      dependencies.cslbSource ||
        aws.downloadLatestCslbSource(temporaryDirectory),
      dependencies.mapping || loadClassificationMapping(mappingPath),
      sha256File(mappingPath),
    ]);
    if (cslbSource.sha256 !== sourceReport.cslbSource.sha256) {
      throw new Error(
        `The retained CSLB source hash ${cslbSource.sha256} does not match the reviewed Pass 2 hash ${sourceReport.cslbSource.sha256}.`,
      );
    }
    const cslbParseResult =
      dependencies.cslbParseResult ||
      (await parseCslbSource(cslbSource.localPath));
    const cslbRecords = [
      ...cslbParseResult.contractorsByLicense.values(),
    ];
    const basePlan = {
      decisions: classifyDirectoryEntriesForResolution({
        cslbRecords,
        directoryRecords: sourceCollection.records,
        existingContractors,
        mapping,
      }),
    };
    const queue = buildResolutionQueue({
      basePlan,
      directoryRecords: sourceCollection.records,
      sourceReport,
    });
    if (!options.quiet) {
      console.log(
        `Reviewing ${queue.length} entries through the official live CSLB system.`,
      );
    }

    const liveClient =
      dependencies.liveClient ||
      createCslbLiveClient({
        fetchImpl: dependencies.fetchImpl || fetch,
        minimumIntervalMs: options.minimumIntervalMs ?? 150,
        now,
      });
    const lookupRecorder = createLookupRecorder({
      client: liveClient,
      outputDirectory,
    });
    const resolution = await resolveQueue({
      cslbRecords,
      existingContractors,
      lookupRecorder,
      mapping,
      onProgress:
        dependencies.onProgress ||
        ((completed, total) => {
          if (!options.quiet && (completed % 10 === 0 || completed === total)) {
            console.log(`Reviewed ${completed} of ${total} entries.`);
          }
        }),
      queue,
      startedAt,
    });
    const artifacts = await writeDryRunArtifacts({
      accountId,
      cslbSource,
      mappingPath,
      mappingSha256,
      outputDirectory,
      resolution,
      runId,
      sourceCollection,
      sourceReport,
      sourceReportPath,
      sourceReportSha256,
      startedAt,
      completedAt: now().toISOString(),
    });
    if (!options.quiet) printSummary(artifacts.report, artifacts.reportPath);
    return {
      ...artifacts,
      queue,
      resolution,
    };
  } finally {
    await fsPromises.rm(temporaryDirectory, {
      force: true,
      recursive: true,
    });
  }
}

async function runWriteMode(options, dependencies) {
  const reviewedReportPath = path.resolve(
    requiredOption(options.reviewedReport, "--reviewed-report"),
  );
  const reviewedReportSha256 = await sha256File(reviewedReportPath);
  const approvedReportSha256 = requiredOption(
    options.approvedReportSha256,
    "--approved-report-sha256",
  );
  if (reviewedReportSha256 !== approvedReportSha256) {
    throw new Error(
      `Reviewed report hash ${reviewedReportSha256} does not match the approved hash ${approvedReportSha256}.`,
    );
  }
  const reviewedReport = await readJsonFile(reviewedReportPath);
  assertReviewedResolutionReport(reviewedReport);
  if (options.approval !== reviewedReport.runId) {
    throw new Error(
      `Write mode requires --approval ${reviewedReport.runId}.`,
    );
  }
  const reportDirectory = path.dirname(reviewedReportPath);
  const proposalPath = path.resolve(
    reportDirectory,
    reviewedReport.artifacts.proposal.relativePath,
  );
  const proposalSha256 = await sha256File(proposalPath);
  const approvedProposalSha256 = requiredOption(
    options.approvedProposalSha256,
    "--approved-proposal-sha256",
  );
  if (
    proposalSha256 !== reviewedReport.artifacts.proposal.sha256 ||
    proposalSha256 !== approvedProposalSha256
  ) {
    throw new Error(
      "The proposal artifact does not match both the reviewed and explicitly approved hashes.",
    );
  }
  const proposal = await readJsonFile(proposalPath);
  if (
    proposal.schemaVersion !== RESOLUTION_PROPOSAL_SCHEMA_VERSION ||
    proposal.runId !== reviewedReport.runId ||
    proposal.proposalHash !== reviewedReport.proposalHash
  ) {
    throw new Error("The reviewed proposal is incompatible with the report.");
  }
  const reviewedArtifacts = await verifyReviewedArtifacts({
    proposal,
    reportDirectory,
    reviewedReport,
  });

  const profile = validateProfile(options.profile);
  const aws = dependencies.aws || createDefaultAwsAdapter(profile);
  const accountId = await validateAws(aws);
  if (accountId !== reviewedReport.accountId) {
    throw new Error("The current AWS account differs from the dry run.");
  }
  const temporaryDirectory = await fsPromises.mkdtemp(
    path.join(os.tmpdir(), "retrofi-directory-write-replay-"),
  );
  let existingContractors;
  try {
    const [currentContractors, cslbSource] = await Promise.all([
      aws.scanContractors(),
      aws.downloadLatestCslbSource(temporaryDirectory),
    ]);
    if (
      cslbSource.sha256 !== reviewedReport.cslbSource.sha256 ||
      cslbSource.sha256 !== proposal.cslbSourceSha256
    ) {
      throw new Error("The retained CSLB source hash changed.");
    }
    existingContractors = currentContractors;
  } finally {
    await fsPromises.rm(temporaryDirectory, {
      force: true,
      recursive: true,
    });
  }
  const replay = prepareIdempotentReplay({
    existingContractors,
    newItems: proposal.newItems,
    updates: proposal.updates,
  });
  const outputDirectory = path.resolve(
    options.outputDirectory || reportDirectory,
  );
  await fsPromises.mkdir(outputDirectory, { recursive: true });

  const existingWriteReport = aws.readJson
    ? await aws.readJson(
        `imports/enrichment/${reviewedReport.runId}/resolution-report.json`,
      )
    : null;
  if (
    existingWriteReport?.proposalHash === reviewedReport.proposalHash
  ) {
    const reportPath = path.join(
      outputDirectory,
      "write-report.json",
    );
    const report = {
      ...existingWriteReport,
      idempotentReplay: true,
      replayAwsWriteCount: 0,
    };
    await writeJson(reportPath, report);
    return {
      report,
      reportPath,
    };
  }

  let awsWriteCount = 0;
  for (const snapshot of reviewedArtifacts.sourceCollection.snapshots) {
    const date = reviewedArtifacts.sourceReport.startedAt.slice(0, 10);
    const uploaded = await aws.uploadFile({
      contentType: snapshot.contentType,
      key: `raw/enrichment/${snapshot.sourceId}/${date}/${snapshot.sha256.slice(0, 12)}-${path.basename(snapshot.relativePath)}`,
      localPath: snapshot.absolutePath,
      sha256: snapshot.sha256,
      sizeBytes: snapshot.sizeBytes,
    });
    if (uploaded) awsWriteCount += 1;
  }
  for (const snapshot of proposal.lookupSnapshots) {
    const localPath = path.resolve(reportDirectory, snapshot.relativePath);
    const uploaded = await aws.uploadFile({
      contentType: snapshot.contentType,
      key: snapshot.s3Key,
      localPath,
      sha256: snapshot.sha256,
      sizeBytes: snapshot.sizeBytes,
    });
    if (uploaded) awsWriteCount += 1;
  }
  for (const update of replay.updatesToApply) {
    await aws.updateContractor(update);
    awsWriteCount += 1;
  }
  for (const item of replay.newItemsToInsert) {
    await aws.putContractor(item);
    awsWriteCount += 1;
  }

  const writeReport = {
    ...reviewedReport,
    mode: "write",
    completedAt: new Date().toISOString(),
    dryRunConfirmedZeroAwsWrites: false,
    approvedArtifacts: {
      proposalSha256,
      reportSha256: reviewedReportSha256,
    },
    invariants: {
      ...reviewedReport.invariants,
      dryRunConfirmedZeroAwsWrites: false,
    },
    writeSummary: {
      alreadyAppliedNewContractors: replay.alreadyAppliedNewItems.length,
      alreadyAppliedUpdates: replay.alreadyAppliedUpdates.length,
      insertedContractors: replay.newItemsToInsert.length,
      updatedContractors: replay.updatesToApply.length,
      directorySnapshotCount:
        reviewedArtifacts.sourceCollection.snapshots.length,
      lookupSnapshotCount: proposal.lookupSnapshots.length,
      awsWriteCount: awsWriteCount + 1,
    },
    awsWriteCount: awsWriteCount + 1,
  };
  await aws.uploadJson(
    `imports/enrichment/${reviewedReport.runId}/resolution-report.json`,
    writeReport,
  );
  const reportPath = path.join(outputDirectory, "write-report.json");
  await writeJson(reportPath, writeReport);
  if (!options.quiet) printSummary(writeReport, reportPath);
  return { report: writeReport, reportPath };
}

export function buildResolutionQueue({
  basePlan,
  directoryRecords,
  sourceReport,
}) {
  const recordsByKey = new Map(
    directoryRecords.map((record) => [directoryRecordKey(record), record]),
  );
  const queue = basePlan.decisions
    .filter((entry) => REVIEW_DISPOSITIONS.has(entry.disposition))
    .map((entry) => {
      const directoryRecord = recordsByKey.get(directoryDecisionKey(entry));
      if (!directoryRecord) {
        throw new Error(
          `Could not reconstruct ${entry.sourceId}/${entry.sourceRecordId}.`,
        );
      }
      return {
        directoryRecord,
        originalDisposition: entry.disposition,
      };
    });
  const expected = sourceReport.combinedTotals?.dispositionCounts || {};
  const queueCounts = countBy(queue, (entry) => entry.originalDisposition);
  for (const disposition of REVIEW_DISPOSITIONS) {
    if ((queueCounts[disposition] || 0) !== (expected[disposition] || 0)) {
      throw new Error(
        `Reconstructed ${queueCounts[disposition] || 0} ${disposition} entries, but the reviewed report has ${expected[disposition] || 0}.`,
      );
    }
  }
  return queue.sort(
    (left, right) =>
      compareStrings(
        left.directoryRecord.sourceId,
        right.directoryRecord.sourceId,
      ) ||
      compareStrings(
        left.directoryRecord.businessName,
        right.directoryRecord.businessName,
      ),
  );
}

export async function resolveQueue({
  cslbRecords,
  existingContractors,
  lookupRecorder,
  mapping,
  onProgress = () => {},
  queue,
  startedAt,
}) {
  const existingById = new Map(
    existingContractors.map((record) => [record.contractorId, record]),
  );
  const candidateIndices = buildCandidateIndices([
    ...cslbRecords,
    ...existingContractors,
  ]);
  const updatesById = new Map();
  const newItemsById = new Map();
  const conflicts = [];
  const outcomes = [];

  for (let index = 0; index < queue.length; index += 1) {
    const queueEntry = queue[index];
    let result;
    try {
      result = await resolveDirectoryRecord({
        candidateIndices,
        directoryRecord: queueEntry.directoryRecord,
        lookupRecorder,
      });
    } catch (error) {
      result = {
        category: "lookup_error",
        reason: clean(error?.message || error),
        verifiedDetail: null,
        candidateDetails: [],
        identity: null,
      };
    }
    const directoryRecord = queueEntry.directoryRecord;
    let category = result.category;
    let changedFields = [];
    let contractorId = "";

    if (result.verifiedDetail) {
      const detail = result.verifiedDetail;
      contractorId = contractorIdForLicense(detail.licenseNumber);
      const existing = existingById.get(contractorId);
      const providerType = classifyNoncontractorProvider(directoryRecord);
      if (providerType) {
        category = "noncontractor_provider";
      } else if (!detail.usableStatus) {
        category = "inactive_license";
      } else {
        const item = buildContractorItem(
          liveDetailAsCslbRecord(detail),
          mapping,
          {
            importId: `cslb-live-${startedAt.slice(0, 10)}-${detail.sourceRecordHash.slice(0, 12)}`,
            importedAt: startedAt,
            s3SourceKey: detail.snapshot.s3Key,
            sourceReceivedAt: detail.snapshot.retrievedAt,
          },
        );
        if (
          !item.matchedClassificationCodes.length ||
          !item.supportedRetrofitIds.length
        ) {
          category = "unmapped_license";
        } else if (existing) {
          category = "existing_alternate_identity";
          changedFields = planDirectoryEnrichment({
            conflicts,
            directoryRecord,
            existing,
            matchMethod: result.identity.method,
            updatesById,
          });
        } else {
          category = "verified_new_contractor";
          const mutableItem = newItemsById.get(contractorId) || item;
          changedFields = planDirectoryEnrichment({
            conflicts,
            directoryRecord,
            existing: mutableItem,
            matchMethod: result.identity.method,
            mutableItem,
            updatesById: new Map(),
          });
          newItemsById.set(contractorId, mutableItem);
        }
      }
    } else if (
      category === "unresolved" &&
      (looksNonContractor(directoryRecord) ||
        classifyNoncontractorProvider(directoryRecord))
    ) {
      category = "noncontractor_provider";
    }

    outcomes.push({
      category,
      changedFields,
      contractorId,
      directoryRecord,
      originalDisposition: queueEntry.originalDisposition,
      reason: result.reason,
      identity: result.identity,
      candidateDetails: result.candidateDetails,
      verifiedDetail: result.verifiedDetail,
    });
    onProgress(index + 1, queue.length);
  }

  const updates = [...updatesById.values()]
    .filter((update) => Object.keys(update.set).length)
    .sort((left, right) =>
      compareStrings(left.contractorId, right.contractorId),
    );
  const newItems = [...newItemsById.values()].sort((left, right) =>
    compareStrings(left.contractorId, right.contractorId),
  );
  assertResolutionPlan({ newItems, updates });
  return {
    conflicts,
    lookupSnapshots: lookupRecorder.snapshots,
    newItems,
    outcomes,
    updates,
  };
}

export async function resolveDirectoryRecord({
  candidateIndices,
  directoryRecord,
  lookupRecorder,
}) {
  const sourceLicense = normalizeLicenseNumber(
    directoryRecord.licenseNumber,
  );
  const candidateDetails = [];

  if (sourceLicense) {
    const detail = await lookupRecorder.lookupLicense(sourceLicense);
    if (!detail.found) {
      return unresolvedResult(
        "unresolved",
        "The source-provided license number was not found in the official live CSLB system.",
        candidateDetails,
      );
    }
    candidateDetails.push(detail);
    const identity = assessCslbIdentity({
      detail,
      directoryRecord,
      sourceProvidedLicense: true,
    });
    if (!identity.verified) {
      return {
        category: "identity_conflict",
        reason:
          "The source identity conflicts with the official CSLB license detail.",
        verifiedDetail: null,
        candidateDetails,
        identity,
      };
    }
    return {
      category: "resolved",
      reason: "Verified from a source-provided CSLB license number.",
      verifiedDetail: detail,
      candidateDetails,
      identity,
    };
  }

  const candidateScores = new Map();
  for (const candidate of exactCandidateRecords(
    directoryRecord,
    candidateIndices,
  )) {
    addCandidateScore(
      candidateScores,
      normalizeLicenseNumber(candidate.licenseNumber),
      125,
    );
  }
  for (const query of buildCslbBusinessNameQueries(
    directoryRecord.businessName,
  )) {
    const searchResults = await lookupRecorder.searchBusinessName(query);
    for (const result of searchResults) {
      const score = scoreSearchResult(directoryRecord, result);
      if (score >= 35) {
        addCandidateScore(
          candidateScores,
          result.licenseNumber,
          score,
        );
      }
    }
  }
  const candidateLicenseNumbers = [...candidateScores.entries()]
    .sort(
      ([leftLicense, leftScore], [rightLicense, rightScore]) =>
        rightScore - leftScore ||
        compareStrings(leftLicense, rightLicense),
    )
    .slice(0, 10)
    .map(([licenseNumber]) => licenseNumber);

  for (const licenseNumber of candidateLicenseNumbers) {
    const detail = await lookupRecorder.lookupLicense(licenseNumber);
    if (detail.found) candidateDetails.push(detail);
  }
  const verified = candidateDetails
    .map((detail) => ({
      detail,
      identity: assessCslbIdentity({
        detail,
        directoryRecord,
        sourceProvidedLicense: false,
      }),
    }))
    .filter((candidate) => candidate.identity.verified);
  if (!verified.length) {
    return unresolvedResult(
      "unresolved",
      candidateDetails.length
        ? "Official CSLB candidates were reviewed, but none established a nonconflicting identity."
        : "No plausible official CSLB license candidate was found.",
      candidateDetails,
    );
  }
  const selected = selectVerifiedCandidate(verified);
  if (!selected) {
    return {
      category: "unresolved_ambiguous",
      reason:
        "More than one official CSLB license remained a verified identity match.",
      verifiedDetail: null,
      candidateDetails,
      identity: null,
    };
  }
  return {
    category: "resolved",
    reason: "Verified through official CSLB name search and license detail.",
    verifiedDetail: selected.detail,
    candidateDetails,
    identity: selected.identity,
  };
}

export function selectVerifiedCandidate(verifiedCandidates) {
  const usable = verifiedCandidates.filter(
    (candidate) => candidate.detail.usableStatus,
  );
  const pool = usable.length ? usable : verifiedCandidates;
  if (pool.length === 1) return pool[0];
  const ranked = pool
    .map((candidate) => ({
      candidate,
      score: identityEvidenceScore(candidate.identity),
    }))
    .sort(
      (left, right) =>
        right.score - left.score ||
        compareStrings(
          left.candidate.detail.licenseNumber,
          right.candidate.detail.licenseNumber,
        ),
    );
  if (
    ranked[0]?.score > 10 &&
    ranked[0].score > (ranked[1]?.score || 0)
  ) {
    return ranked[0].candidate;
  }
  return null;
}

function identityEvidenceScore(identity) {
  const weights = {
    business_name: 10,
    phone: 8,
    address: 6,
    zip: 3,
    city: 2,
  };
  return (identity?.corroboratingMatches || []).reduce(
    (total, match) => total + (weights[match] || 0),
    0,
  );
}

export function createLookupRecorder({ client, outputDirectory }) {
  const detailCache = new Map();
  const searchCache = new Map();
  const snapshots = [];

  return {
    snapshots,

    async lookupLicense(licenseNumber) {
      const normalized = normalizeLicenseNumber(licenseNumber);
      if (detailCache.has(normalized)) {
        return detailCache.get(normalized);
      }
      const response = await client.lookupLicense(normalized);
      const snapshot = await retainLookupSnapshot({
        body: response.html,
        contentType: "text/html",
        filename: `license-${normalized}.html`,
        lookupType: "license_detail",
        outputDirectory,
        queryHash: sha256Text(normalized),
        retrievedAt: response.retrievedAt,
        url: response.url,
      });
      snapshots.push(snapshot);
      const detail = {
        ...parseCslbLicenseDetail(response.html, response.url),
        snapshot,
      };
      detailCache.set(normalized, detail);
      return detail;
    },

    async searchBusinessName(businessName) {
      const cacheKey = normalizeName(businessName);
      if (searchCache.has(cacheKey)) return searchCache.get(cacheKey);
      const response = await client.searchBusinessName(businessName);
      const queryHash = sha256Text(cacheKey);
      const snapshot = await retainLookupSnapshot({
        body: response.html,
        contentType: "text/html",
        filename: `business-${queryHash.slice(0, 16)}.html`,
        lookupType: "business_name_search",
        outputDirectory,
        queryHash,
        retrievedAt: response.retrievedAt,
        url: response.url,
      });
      snapshots.push(snapshot);
      const results = parseCslbBusinessNameResults(response.html);
      searchCache.set(cacheKey, results);
      return results;
    },
  };
}

export function buildCandidateIndices(records) {
  const indices = {
    license: new Map(),
    name: new Map(),
    nameZip: new Map(),
    phone: new Map(),
    addressZip: new Map(),
  };
  for (const record of records) {
    addToIndex(
      indices.license,
      normalizeLicenseNumber(record.licenseNumber),
      record,
    );
    const name = normalizeName(record.businessName);
    const phone = normalizePhone(record.phone);
    const zip = normalizeZip(
      record.zip || record.address?.postalCode || record.businessAddress?.postalCode,
    );
    const address = normalizeStreet(
      record.address?.line1 || record.businessAddress?.line1,
    );
    addToIndex(indices.name, name, record);
    addToIndex(
      indices.nameZip,
      name && zip ? `${name}|${zip}` : "",
      record,
    );
    addToIndex(indices.phone, phone, record);
    addToIndex(
      indices.addressZip,
      address && zip ? `${address}|${zip}` : "",
      record,
    );
  }
  return indices;
}

function exactCandidateRecords(record, indices) {
  const name = normalizeName(record.businessName);
  const phone = normalizePhone(record.phone);
  const zip = normalizeZip(
    record.zip || record.address?.postalCode,
  );
  const address = normalizeStreet(record.address?.line1);
  const groups = [
    indices.phone.get(phone) || [],
    indices.nameZip.get(name && zip ? `${name}|${zip}` : "") || [],
    indices.addressZip.get(
      address && zip ? `${address}|${zip}` : "",
    ) || [],
    indices.name.get(name) || [],
  ];
  return [
    ...new Map(
      groups
        .flat()
        .filter((candidate) => candidate?.licenseNumber)
        .map((candidate) => [
          normalizeLicenseNumber(candidate.licenseNumber),
          candidate,
        ]),
    ).values(),
  ];
}

function scoreSearchResult(directoryRecord, result) {
  let score = 0;
  if (
    businessNamesCompatible(
      directoryRecord.businessName,
      result.businessName,
    )
  ) {
    score += 100;
  } else {
    score += Math.round(
      businessNameSimilarity(
        directoryRecord.businessName,
        result.businessName,
      ) * 60,
    );
  }
  const directoryCity = normalizeName(directoryRecord.address?.city);
  if (
    directoryCity &&
    directoryCity === normalizeName(result.city)
  ) {
    score += 20;
  }
  if (/\bactive\b|\bcurrent\b/i.test(result.status)) score += 5;
  return score;
}

export function businessNameSimilarity(left, right) {
  const leftTokens = businessNameTokens(left);
  const rightTokens = businessNameTokens(right);
  if (!leftTokens.size || !rightTokens.size) return 0;
  const intersection = [...leftTokens].filter((token) =>
    rightTokens.has(token),
  ).length;
  if (
    intersection < 2 &&
    normalizeName(left) !== normalizeName(right)
  ) {
    return 0;
  }
  return (
    intersection /
    new Set([...leftTokens, ...rightTokens]).size
  );
}

function businessNameTokens(value) {
  const ignored = new Set([
    "AND",
    "CO",
    "COMPANY",
    "CORP",
    "CORPORATION",
    "INC",
    "INCORPORATED",
    "L",
    "LLC",
    "LP",
    "THE",
  ]);
  return new Set(
    normalizeName(value)
      .split(" ")
      .filter((token) => token && !ignored.has(token)),
  );
}

function addCandidateScore(scores, licenseNumber, score) {
  if (!licenseNumber) return;
  scores.set(
    licenseNumber,
    Math.max(score, scores.get(licenseNumber) || 0),
  );
}

function unresolvedResult(category, reason, candidateDetails) {
  return {
    category,
    reason,
    verifiedDetail: null,
    candidateDetails,
    identity: null,
  };
}

export function classifyNoncontractorProvider(record) {
  const text = clean(
    `${record.businessName} ${record.description} ${record.sourceText}`,
  );
  const providerPatterns = [
    ["manufacturer", /\bmanufacturer\b|\bmanufacturing\b/i],
    ["distributor_or_vendor", /\bdistributor\b|\bwholesaler\b|\bvendor\b/i],
    ["consultant", /\bconsult(?:ant|ancy|ing)\b/i],
    ["program_administrator", /\bprogram administrator\b|\bprogram implementer\b/i],
    ["engineering_or_design", /\bengineering services\b|\barchitect(?:ure|ural)?\b|\bdesign services\b/i],
  ];
  const contractorSignal =
    /\blicensed contractor\b|\bconstruction\b|\binstall(?:er|ation|s|ing)?\b|\bhvac\b|\belectrical\b|\bplumb(?:er|ing)?\b|\bmechanical contractor\b/i.test(
      text,
    );
  if (contractorSignal) return "";
  return (
    providerPatterns.find(([, pattern]) => pattern.test(text))?.[0] || ""
  );
}

function liveDetailAsCslbRecord(detail) {
  return {
    businessAddress: detail.businessAddress,
    businessName: detail.businessName,
    licenseClassifications: detail.licenseClassifications,
    licenseExpirationDate: detail.licenseExpirationDate,
    licenseIssueDate: detail.licenseIssueDate,
    licenseNumber: detail.licenseNumber,
    licenseStatus: detail.licenseStatus,
    pendingClassRemoval: "",
    pendingClassReplace: "",
    pendingSuspension: "",
    phone: detail.phone,
    primaryStatus: detail.usableStatus ? "CLEAR" : detail.primaryStatus,
    secondaryStatus: "",
    sourceRowHashes: [detail.sourceRecordHash],
  };
}

export function prepareIdempotentReplay({
  existingContractors,
  newItems,
  updates,
}) {
  const existingById = new Map(
    existingContractors.map((record) => [record.contractorId, record]),
  );
  const alreadyAppliedNewItems = [];
  const alreadyAppliedUpdates = [];
  const newItemsToInsert = [];
  const updatesToApply = [];

  for (const item of newItems) {
    const existing = existingById.get(item.contractorId);
    if (!existing) {
      newItemsToInsert.push(item);
      continue;
    }
    if (stableStringify(existing) === stableStringify(item)) {
      alreadyAppliedNewItems.push(item.contractorId);
      continue;
    }
    throw new Error(
      `Refusing to overwrite existing contractor ID ${item.contractorId}.`,
    );
  }
  for (const update of updates) {
    const existing = existingById.get(update.contractorId);
    if (!existing) {
      throw new Error(
        `Cannot update missing contractor ${update.contractorId}.`,
      );
    }
    const fields = Object.keys(update.set);
    if (
      fields.every(
        (field) =>
          stableStringify(existing[field]) ===
          stableStringify(update.set[field]),
      )
    ) {
      alreadyAppliedUpdates.push(update.contractorId);
      continue;
    }
    for (const field of fields) {
      if (
        stableStringify(existing[field]) !==
        stableStringify(update.expected[field])
      ) {
        throw new Error(
          `Contractor ${update.contractorId} changed in field ${field} after the dry run.`,
        );
      }
    }
    updatesToApply.push(update);
  }
  return {
    alreadyAppliedNewItems,
    alreadyAppliedUpdates,
    newItemsToInsert,
    updatesToApply,
  };
}

function assertResolutionPlan({ newItems, updates }) {
  const newIds = new Set();
  for (const item of newItems) {
    if (newIds.has(item.contractorId)) {
      throw new Error(`Duplicate new contractor ${item.contractorId}.`);
    }
    newIds.add(item.contractorId);
    if (
      item.schemaVersion !== "retrofi-contractor.v1" ||
      !item.licenseNumber ||
      !item.matchedClassificationCodes?.length ||
      !item.supportedRetrofitIds?.length
    ) {
      throw new Error(
        `New contractor ${item.contractorId} does not meet the row requirements.`,
      );
    }
  }
  for (const update of updates) {
    if (
      Object.hasOwn(update.set, "supportedRetrofitIds") ||
      Object.hasOwn(update.set, "licenseNumber") ||
      Object.hasOwn(update.set, "businessName") ||
      Object.hasOwn(update.set, "licenseClassifications")
    ) {
      throw new Error(
        `Update ${update.contractorId} attempts to replace CSLB-derived data.`,
      );
    }
  }
}

async function retainLookupSnapshot({
  body,
  contentType,
  filename,
  lookupType,
  outputDirectory,
  queryHash,
  retrievedAt,
  url,
}) {
  const directory = path.join(outputDirectory, "raw", "cslb-live");
  await fsPromises.mkdir(directory, { recursive: true });
  const absolutePath = path.join(directory, filename);
  await fsPromises.writeFile(absolutePath, body);
  const stat = await fsPromises.stat(absolutePath);
  const sha256 = await sha256File(absolutePath);
  const relativePath = path.relative(outputDirectory, absolutePath);
  return {
    contentType,
    lookupType,
    queryHash,
    relativePath,
    retrievedAt,
    s3Key: `raw/enrichment/cslb-resolution/${retrievedAt.slice(0, 10)}/${sha256.slice(0, 12)}-${filename}`,
    sha256,
    sizeBytes: stat.size,
    url,
  };
}

async function writeDryRunArtifacts({
  accountId,
  completedAt,
  cslbSource,
  mappingPath,
  mappingSha256,
  outputDirectory,
  resolution,
  runId,
  sourceCollection,
  sourceReport,
  sourceReportPath,
  sourceReportSha256,
  startedAt,
}) {
  const proposalHash = sha256Text(
    stableStringify({
      cslbSourceSha256: cslbSource.sha256,
      lookupSnapshotHashes: resolution.lookupSnapshots.map(
        (snapshot) => snapshot.sha256,
      ),
      mappingSha256,
      newItems: resolution.newItems,
      sourceReportSha256,
      updates: resolution.updates,
    }),
  );
  const proposal = {
    schemaVersion: RESOLUTION_PROPOSAL_SCHEMA_VERSION,
    scriptVersion: RESOLUTION_SCRIPT_VERSION,
    runId,
    proposalHash,
    sourceReportSha256,
    cslbSourceSha256: cslbSource.sha256,
    mappingSha256,
    lookupSnapshots: resolution.lookupSnapshots,
    updates: resolution.updates,
    newItems: resolution.newItems,
  };
  const proposalPath = path.join(outputDirectory, "proposal.json");
  await writeJson(proposalPath, proposal);
  const proposalSha256 = await sha256File(proposalPath);

  const unresolvedCandidates = buildUnresolvedCandidates(
    resolution.outcomes,
  );
  const unresolved = {
    schemaVersion: UNRESOLVED_REPORT_SCHEMA_VERSION,
    runId,
    generatedAt: completedAt,
    categories: Object.fromEntries(
      OUTCOME_CATEGORIES.filter(
        (category) =>
          ![
            "verified_new_contractor",
            "existing_alternate_identity",
          ].includes(category),
      ).map((category) => [
        category,
        unresolvedCandidates.filter(
          (candidate) => candidate.category === category,
        ),
      ]),
    ),
  };
  const unresolvedPath = path.join(
    outputDirectory,
    "unresolved-candidates.json",
  );
  await writeJson(unresolvedPath, unresolved);
  const unresolvedSha256 = await sha256File(unresolvedPath);

  const report = buildResolutionReport({
    accountId,
    completedAt,
    cslbSource,
    mappingPath,
    mappingSha256,
    outputDirectory,
    proposalHash,
    proposalPath,
    proposalSha256,
    resolution,
    runId,
    sourceCollection,
    sourceReport,
    sourceReportPath,
    sourceReportSha256,
    startedAt,
    unresolvedPath,
    unresolvedSha256,
  });
  const reportPath = path.join(outputDirectory, "report.json");
  await writeJson(reportPath, report);
  const reportSha256 = await sha256File(reportPath);
  const hashPath = path.join(outputDirectory, "report.sha256");
  await fsPromises.writeFile(
    hashPath,
    `${reportSha256}  ${path.basename(reportPath)}\n`,
  );
  return {
    proposal,
    proposalPath,
    report,
    reportPath,
    reportSha256,
    unresolved,
    unresolvedPath,
  };
}

function buildResolutionReport({
  accountId,
  completedAt,
  cslbSource,
  mappingPath,
  mappingSha256,
  outputDirectory,
  proposalHash,
  proposalPath,
  proposalSha256,
  resolution,
  runId,
  sourceCollection,
  sourceReport,
  sourceReportPath,
  sourceReportSha256,
  startedAt,
  unresolvedPath,
  unresolvedSha256,
}) {
  const outcomeCounts = countBy(
    resolution.outcomes,
    (outcome) => outcome.category,
  );
  const exactResolvedOutcomes = resolution.outcomes.filter(
    (outcome) => outcome.verifiedDetail,
  );
  const exactResolvedLicenseNumbers = [
    ...new Set(
      exactResolvedOutcomes.map(
        (outcome) => outcome.verifiedDetail.licenseNumber,
      ),
    ),
  ].sort(compareStrings);
  const alternateContractorIds = [
    ...new Set(
      resolution.outcomes
        .filter(
          (outcome) =>
            outcome.category === "existing_alternate_identity",
        )
        .map((outcome) => outcome.contractorId),
    ),
  ];
  const proposedEnrichmentFieldCounts =
    countProposedEnrichmentFields(resolution);
  const sourceDispositionCounts =
    sourceReport.combinedTotals.dispositionCounts;
  const inputCounts = {
    unmatchedEntriesReviewed: sourceDispositionCounts.unmatched || 0,
    ambiguousEntriesReviewed: Object.entries(sourceDispositionCounts)
      .filter(([key]) => key.startsWith("ambiguous_"))
      .reduce((total, [, count]) => total + count, 0),
    possibleNewContractorEntriesReviewed: Object.entries(
      sourceDispositionCounts,
    )
      .filter(
        ([key]) =>
          REVIEW_DISPOSITIONS.has(key) &&
          key !== "unmatched" &&
          !key.startsWith("ambiguous_"),
      )
      .reduce((total, [, count]) => total + count, 0),
    totalEntriesReviewed: resolution.outcomes.length,
  };
  const examples = Object.fromEntries(
    OUTCOME_CATEGORIES.map((category) => [
      category,
      resolution.outcomes
        .filter((outcome) => outcome.category === category)
        .slice(0, 5)
        .map(sanitizeOutcome),
    ]),
  );

  return {
    schemaVersion: RESOLUTION_REPORT_SCHEMA_VERSION,
    scriptVersion: RESOLUTION_SCRIPT_VERSION,
    runId,
    mode: "dry-run",
    startedAt,
    completedAt,
    accountId,
    resources: {
      bucket: CONTRACTOR_SOURCE_BUCKET,
      bucketRegion: S3_REGION,
      table: CONTRACTORS_TABLE,
      tableRegion: DYNAMODB_REGION,
    },
    sourceDryRunArtifact: {
      path: sourceReportPath,
      runId: sourceReport.runId,
      proposalHash: sourceReport.proposalHash,
      sha256: sourceReportSha256,
    },
    sourceSnapshots: sourceCollection.snapshots.map(
      ({ absolutePath: _absolutePath, ...snapshot }) => snapshot,
    ),
    cslbSource: {
      importId: cslbSource.importId,
      s3Key: cslbSource.s3Key,
      sha256: cslbSource.sha256,
      sizeBytes: cslbSource.sizeBytes,
      sourceReceivedAt: cslbSource.sourceReceivedAt,
    },
    mappingArtifact: {
      path: mappingPath,
      sha256: mappingSha256,
    },
    inputCounts,
    results: {
      exactCslbLicenseEntriesResolved: exactResolvedOutcomes.length,
      exactCslbLicensesResolved: exactResolvedLicenseNumbers.length,
      existingContractorsFoundUnderAlternateIdentities:
        alternateContractorIds.length,
      verifiedNewContractorRowsProposed: resolution.newItems.length,
      inactiveLicenses: outcomeCounts.inactive_license || 0,
      unmappedLicenses: outcomeCounts.unmapped_license || 0,
      noncontractorProviders:
        outcomeCounts.noncontractor_provider || 0,
      unresolvedEntries:
        (outcomeCounts.unresolved || 0) +
        (outcomeCounts.unresolved_ambiguous || 0) +
        (outcomeCounts.lookup_error || 0),
      identityConflicts: outcomeCounts.identity_conflict || 0,
      proposedExistingContractorUpdates: resolution.updates.length,
      proposedEnrichmentFieldCounts,
      outcomeCounts: Object.fromEntries(
        OUTCOME_CATEGORIES.map((category) => [
          category,
          outcomeCounts[category] || 0,
        ]),
      ),
    },
    proposalHash,
    artifacts: {
      proposal: {
        relativePath: path.relative(outputDirectory, proposalPath),
        sha256: proposalSha256,
      },
      unresolvedCandidates: {
        relativePath: path.relative(outputDirectory, unresolvedPath),
        sha256: unresolvedSha256,
      },
      lookupSnapshots: resolution.lookupSnapshots.map((snapshot) => ({
        relativePath: snapshot.relativePath,
        sha256: snapshot.sha256,
        sizeBytes: snapshot.sizeBytes,
      })),
    },
    conflicts: resolution.conflicts.map((conflict) => ({
      contractorIdToken: token(conflict.contractorId),
      field: conflict.field,
      sourceId: conflict.sourceId,
    })),
    sanitizedExamples: examples,
    invariants: {
      dryRunConfirmedZeroAwsWrites: true,
      existingRowsModifySupportedRetrofitIds: false,
      newRowsRequireVerifiedCslbLicense: true,
      newRowsRequireMappedClassification: true,
      newRowsRequireNonemptySupportedRetrofitIds: true,
      newRowsRefuseExistingContractorIds: true,
      writesRequireApprovedArtifactHashes: true,
    },
    awsWriteCount: 0,
    dryRunConfirmedZeroAwsWrites: true,
    writeInstructions:
      `After review, run with --write --reviewed-report <this report path> --approval ${runId} ` +
      "--approved-report-sha256 <report-sha256> --approved-proposal-sha256 " +
      proposalSha256,
  };
}

function buildUnresolvedCandidates(outcomes) {
  return outcomes
    .filter(
      (outcome) =>
        ![
          "verified_new_contractor",
          "existing_alternate_identity",
        ].includes(outcome.category),
    )
    .map((outcome) => ({
      category: outcome.category,
      reason: outcome.reason,
      originalDisposition: outcome.originalDisposition,
      directoryEntry: {
        sourceId: outcome.directoryRecord.sourceId,
        sourceName: outcome.directoryRecord.sourceName,
        sourceUrl: outcome.directoryRecord.sourceUrl,
        sourceRecordId: outcome.directoryRecord.sourceRecordId,
        businessName: outcome.directoryRecord.businessName,
        licenseNumber: outcome.directoryRecord.licenseNumber,
      },
      verifiedLicense: outcome.verifiedDetail
        ? publicLicenseSummary(outcome.verifiedDetail)
        : undefined,
      officialCandidates: outcome.candidateDetails.map(
        publicLicenseSummary,
      ),
      providerType: classifyNoncontractorProvider(
        outcome.directoryRecord,
      ) || undefined,
    }))
    .sort(
      (left, right) =>
        compareStrings(left.category, right.category) ||
        compareStrings(
          left.directoryEntry.sourceId,
          right.directoryEntry.sourceId,
        ) ||
        compareStrings(
          left.directoryEntry.businessName,
          right.directoryEntry.businessName,
        ),
    );
}

function publicLicenseSummary(detail) {
  return {
    licenseNumber: detail.licenseNumber,
    businessName: detail.businessName,
    dbaNames: detail.dbaNames,
    licenseStatus: detail.licenseStatus,
    usableStatus: detail.usableStatus,
    licenseClassifications: detail.licenseClassifications,
    city: detail.businessAddress?.city,
    postalCode: detail.businessAddress?.postalCode,
    sourceUrl: detail.sourceUrl,
  };
}

function sanitizeOutcome(outcome) {
  return {
    sourceId: outcome.directoryRecord.sourceId,
    sourceRecordToken: token(
      `${outcome.directoryRecord.sourceId}|${outcome.directoryRecord.sourceRecordId}`,
    ),
    businessIdentityToken: token(
      normalizeName(outcome.directoryRecord.businessName),
    ),
    originalDisposition: outcome.originalDisposition,
    outcome: outcome.category,
    reason: outcome.reason,
    licenseLast4: outcome.verifiedDetail?.licenseNumber?.slice(-4),
    proposedFields: [...(outcome.changedFields || [])].sort(
      compareStrings,
    ),
  };
}

async function verifyReviewedArtifacts({
  proposal,
  reportDirectory,
  reviewedReport,
}) {
  const sourceReportPath = path.resolve(
    reviewedReport.sourceDryRunArtifact.path,
  );
  if (
    (await sha256File(sourceReportPath)) !==
    reviewedReport.sourceDryRunArtifact.sha256
  ) {
    throw new Error("The Pass 2 dry-run report hash changed.");
  }
  const sourceReport = await readJsonFile(sourceReportPath);
  assertSourceReport(sourceReport);
  if (
    proposal.sourceReportSha256 !==
      reviewedReport.sourceDryRunArtifact.sha256 ||
    sourceReport.proposalHash !==
      reviewedReport.sourceDryRunArtifact.proposalHash
  ) {
    throw new Error("The Pass 2 proposal identity changed.");
  }
  const sourceCollection = await loadReviewedDirectoryRecords({
    report: sourceReport,
    reportPath: sourceReportPath,
  });
  if (
    (await sha256File(reviewedReport.mappingArtifact.path)) !==
    reviewedReport.mappingArtifact.sha256 ||
    proposal.mappingSha256 !== reviewedReport.mappingArtifact.sha256
  ) {
    throw new Error("The CSLB classification mapping hash changed.");
  }
  for (const snapshot of proposal.lookupSnapshots) {
    const snapshotPath = path.resolve(
      reportDirectory,
      snapshot.relativePath,
    );
    if ((await sha256File(snapshotPath)) !== snapshot.sha256) {
      throw new Error(
        `Official CSLB lookup snapshot changed: ${snapshot.relativePath}`,
      );
    }
  }
  return {
    sourceCollection,
    sourceReport,
  };
}

function assertSourceReport(report) {
  if (
    report.schemaVersion !== ENRICHMENT_REPORT_SCHEMA_VERSION ||
    report.mode !== "dry-run" ||
    !report.dryRunConfirmedZeroAwsWrites ||
    !report.combinedTotals?.dispositionCounts
  ) {
    throw new Error(
      "The source report is not a completed contractor-directory dry run.",
    );
  }
}

function assertReviewedResolutionReport(report) {
  if (
    report.schemaVersion !== RESOLUTION_REPORT_SCHEMA_VERSION ||
    report.mode !== "dry-run" ||
    !report.dryRunConfirmedZeroAwsWrites ||
    report.awsWriteCount !== 0 ||
    !report.artifacts?.proposal
  ) {
    throw new Error("The reviewed artifact is not a valid resolution dry run.");
  }
}

function validateProfile(profileOption) {
  const profile =
    profileOption ||
    process.env.AWS_PROFILE ||
    EXPECTED_AWS_PROFILE;
  if (profile !== EXPECTED_AWS_PROFILE) {
    throw new Error(
      `This operation requires AWS profile ${EXPECTED_AWS_PROFILE}. Received: ${profile}`,
    );
  }
  return profile;
}

function createDefaultAwsAdapter(profile) {
  return createAwsAdapter({
    bucketName: CONTRACTOR_SOURCE_BUCKET,
    profile,
    s3Region: S3_REGION,
    tableName: CONTRACTORS_TABLE,
    tableRegion: DYNAMODB_REGION,
  });
}

async function validateAws(aws) {
  const accountId = await aws.getAccountId();
  if (accountId !== EXPECTED_AWS_ACCOUNT_ID) {
    throw new Error(
      `This operation requires AWS account ${EXPECTED_AWS_ACCOUNT_ID}. Received: ${accountId}`,
    );
  }
  await aws.assertInfrastructure();
  return accountId;
}

function addToIndex(index, key, record) {
  if (!key) return;
  const records = index.get(key) || [];
  if (
    !records.some(
      (candidate) =>
        normalizeLicenseNumber(candidate.licenseNumber) ===
        normalizeLicenseNumber(record.licenseNumber),
    )
  ) {
    records.push(record);
  }
  index.set(key, records);
}

function directoryRecordKey(record) {
  return [
    record.sourceId,
    record.sourceRecordId,
    normalizeName(record.businessName),
  ].join("|");
}

function directoryDecisionKey(entry) {
  return [
    entry.sourceId,
    entry.sourceRecordId,
    normalizeName(entry.businessName),
  ].join("|");
}

function normalizeZip(value) {
  return clean(value).match(/\d{5}/)?.[0] || "";
}

function normalizeStreet(value) {
  return normalizeName(value)
    .replace(/\bSTREET\b/g, "ST")
    .replace(/\bAVENUE\b/g, "AVE")
    .replace(/\bBOULEVARD\b/g, "BLVD")
    .replace(/\bROAD\b/g, "RD")
    .replace(/\bDRIVE\b/g, "DR")
    .replace(/\s+/g, " ")
    .trim();
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

function countProposedEnrichmentFields(resolution) {
  const proposed = new Set();
  for (const update of resolution.updates) {
    for (const field of Object.keys(update.set)) {
      if (field !== "enrichmentEvidence") {
        proposed.add(`${update.contractorId}|${field}`);
      }
    }
  }
  for (const outcome of resolution.outcomes) {
    if (outcome.category !== "verified_new_contractor") continue;
    for (const field of outcome.changedFields || []) {
      proposed.add(`${outcome.contractorId}|${field}`);
    }
  }
  return countBy(
    [...proposed].map((entry) => entry.split("|").at(-1)),
    (field) => field,
  );
}

function token(value) {
  return sha256Text(clean(value)).slice(0, 12);
}

function clean(value) {
  return String(value || "").replace(/\s+/g, " ").trim();
}

function requiredOption(value, flag) {
  if (!value) throw new Error(`${flag} is required.`);
  return value;
}

async function readJsonFile(filePath) {
  return JSON.parse(await fsPromises.readFile(filePath, "utf8"));
}

async function writeJson(filePath, value) {
  await fsPromises.writeFile(
    filePath,
    `${JSON.stringify(value, null, 2)}\n`,
  );
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

function parseArgs(argv) {
  const options = {
    approval: "",
    approvedProposalSha256: "",
    approvedReportSha256: "",
    mappingPath: "",
    minimumIntervalMs: 150,
    outputDirectory: "",
    profile: "",
    quiet: false,
    reviewedReport: "",
    sourceReport: "",
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
    } else if (arg === "--source-report") {
      options.sourceReport = requiredArg(argv, ++index, arg);
    } else if (arg === "--reviewed-report") {
      options.reviewedReport = requiredArg(argv, ++index, arg);
    } else if (arg === "--approval") {
      options.approval = requiredArg(argv, ++index, arg);
    } else if (arg === "--approved-report-sha256") {
      options.approvedReportSha256 = requiredArg(argv, ++index, arg);
    } else if (arg === "--approved-proposal-sha256") {
      options.approvedProposalSha256 = requiredArg(argv, ++index, arg);
    } else if (arg === "--mapping") {
      options.mappingPath = requiredArg(argv, ++index, arg);
    } else if (arg === "--output-dir") {
      options.outputDirectory = requiredArg(argv, ++index, arg);
    } else if (arg === "--profile") {
      options.profile = requiredArg(argv, ++index, arg);
    } else if (arg === "--minimum-interval-ms") {
      const value = Number.parseInt(
        requiredArg(argv, ++index, arg),
        10,
      );
      if (!Number.isFinite(value) || value < 0) {
        throw new Error(`${arg} must be a nonnegative integer.`);
      }
      options.minimumIntervalMs = value;
    } else if (arg === "--quiet") {
      options.quiet = true;
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

function printSummary(report, reportPath) {
  console.log(
    JSON.stringify(
      {
        mode: report.mode,
        reportPath,
        inputCounts: report.inputCounts,
        results: report.results,
        proposalHash: report.proposalHash,
        proposalArtifactSha256: report.artifacts?.proposal?.sha256,
        awsWriteCount: report.awsWriteCount,
      },
      null,
      2,
    ),
  );
}

function printHelp() {
  console.log(`Resolve unmatched California contractor directory entries.

Usage:
  npm run contractors:resolve:directories -- --dry-run --source-report <pass-2-report>
  npm run contractors:resolve:directories -- --write --reviewed-report <resolution-report> --approval <run-id> --approved-report-sha256 <sha256> --approved-proposal-sha256 <sha256>

Options:
  --dry-run                         Use official live CSLB lookups and write local artifacts only.
  --source-report <path>            Completed Pass 2 contractor-directory dry-run report.
  --write                           Replay an explicitly approved resolution proposal.
  --reviewed-report <path>          Resolution dry-run report approved for write mode.
  --approval <run-id>               Exact reviewed run ID required for write mode.
  --approved-report-sha256 <hash>   Exact reviewed report hash required for write mode.
  --approved-proposal-sha256 <hash> Exact reviewed proposal hash required for write mode.
  --mapping <path>                  CSLB classification mapping path.
  --output-dir <path>               Local artifact directory.
  --profile <name>                  AWS profile. Must be ${EXPECTED_AWS_PROFILE}.
  --minimum-interval-ms <number>    Minimum delay between official CSLB requests.
  --quiet                           Suppress progress output.
  --help                            Show this help.`);
}

async function main() {
  const options = parseArgs(process.argv.slice(2));
  if (options.help) {
    printHelp();
    return;
  }
  await runDirectoryContractorResolution(options);
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
