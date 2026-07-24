import crypto from "node:crypto";
import dns from "node:dns/promises";
import { once } from "node:events";
import fs from "node:fs";
import fsPromises from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { execFile, spawn } from "node:child_process";
import { promisify } from "node:util";
import { pathToFileURL } from "node:url";

import {
  GetObjectCommand,
  HeadBucketCommand,
  HeadObjectCommand,
  PutObjectCommand,
  S3Client,
} from "@aws-sdk/client-s3";
import { fromIni } from "@aws-sdk/credential-providers";
import * as cheerio from "cheerio";
import { parse } from "csv-parse";

import {
  buildIdentityRecord,
  buildContractorIdentityIndices,
  buildPilotAudit,
  chooseInternalCrawlLinks,
  domainFromEmail,
  domainFromUrl,
  extractWebsiteFields,
  fieldEvidenceChecks,
  generateCandidateDomains,
  isAcceptableEmail,
  isUsableContractor,
  matchOsmRecord,
  pilotStrataSummary,
  scoreDomainIdentity,
  selectStratifiedPilot,
  token,
} from "./contractor-web-enrichment-core.mjs";
import {
  loadReviewedDirectoryRecords,
} from "./contractor-directory-sources.mjs";
import {
  createPersistentRunState,
  forEachAdaptiveConcurrent,
  PersistentRunStateError,
  readJsonLinesToMap,
  repairJsonLinesTail,
} from "./contractor-web-enrichment-run-state.mjs";
import {
  buildExactIndices,
  createAwsAdapter,
  matchExact,
} from "./enrich-contractor-directories.mjs";
import {
  CONTRACTOR_SOURCE_BUCKET,
  CONTRACTORS_TABLE,
  DYNAMODB_REGION,
  EXPECTED_AWS_ACCOUNT_ID,
  EXPECTED_AWS_PROFILE,
  S3_REGION,
} from "./import-cslb-contractors.mjs";

const execFileAsync = promisify(execFile);

export const WEB_ENRICHMENT_SCRIPT_VERSION = "1.3.1";
export const WEB_ENRICHMENT_REPORT_SCHEMA_VERSION =
  "contractor-web-enrichment-report.v1";

const REVIEWED_DIRECTORY_RUN_ID =
  "directory-enrichment-20260723T181209453Z";
const REVIEWED_DIRECTORY_REPORT_KEY =
  `imports/enrichment/${REVIEWED_DIRECTORY_RUN_ID}/report.json`;
const OSM_URL =
  "https://download.geofabrik.de/north-america/us/california-latest.osm.pbf";
const OSM_MD5_URL = `${OSM_URL}.md5`;
const CENSUS_CITY_URL =
  "https://www2.census.gov/geo/docs/maps-data/data/gazetteer/2025_Gazetteer/2025_gaz_place_06.txt";
const CENSUS_COUNTY_URL =
  "https://www2.census.gov/geo/docs/maps-data/data/gazetteer/2025_Gazetteer/2025_gaz_counties_06.txt";
const USER_AGENT =
  "RetroFi contractor web enrichment pilot/1.0 (public first-party websites; contact: https://retrofi.org)";
const DNS_RESOLUTION_BATCH_SIZE = 4;
const TRANSIENT_FETCH_ERROR_CODES = new Set([
  "ECONNRESET",
  "EPIPE",
  "UND_ERR_SOCKET",
]);
const REVIEWED_LICENSE_TRANSITIONS = new Map([
  [
    "936846|prostarmechanical.com",
    {
      reviewSource:
        "contractor-web-enrichment-manual-audit-regressions.v1",
      websiteLicenseNumbers: ["1044879"],
    },
  ],
  [
    "1108001|willbii.net",
    {
      reviewSource:
        "contractor-web-enrichment-manual-audit-regressions.v1",
      websiteLicenseNumbers: ["1113528"],
    },
  ],
]);

export async function runContractorWebEnrichment(
  options,
  dependencies = {},
) {
  const now = dependencies.now || (() => new Date());
  let startedAt = now().toISOString();
  let priorCompletedAt = "";
  const profile =
    options.profile ||
    process.env.AWS_PROFILE ||
    EXPECTED_AWS_PROFILE;
  if (profile !== EXPECTED_AWS_PROFILE) {
    throw new Error(
      `This workflow requires AWS profile ${EXPECTED_AWS_PROFILE}.`,
    );
  }
  if (options.write) {
    throw new Error(
      "DynamoDB write mode is intentionally unavailable until the pilot report is reviewed.",
    );
  }
  if (options.scope === "full" && !options.reviewedPilotReport) {
    throw new Error(
      "Full scope requires --reviewed-pilot-report after explicit pilot approval.",
    );
  }
  if (options.scope === "full") {
    await assertReviewedPilotApproval(options);
  }
  if (options.mode === "deep" && options.scope === "pilot") {
    throw new Error(
      "The initial pilot must run in fast mode. Deep mode is a measured follow-up.",
    );
  }

  const runId =
    options.runId ||
    [
      "web-enrichment",
      options.scope,
      options.mode,
      startedAt.replace(/[-:.]/g, ""),
    ].join("-");
  const outputDirectory = path.resolve(
    options.outputDirectory ||
      path.join("var", "contractor-web-enrichment", runId),
  );
  await fsPromises.mkdir(outputDirectory, { recursive: true });
  let runState;
  let resultAppender;
  if (options.resume) {
    try {
      const previousReport = JSON.parse(
        await fsPromises.readFile(
          path.join(outputDirectory, "report.json"),
          "utf8",
        ),
      );
      if (
        previousReport.runId === runId &&
        previousReport.startedAt
      ) {
        startedAt = previousReport.startedAt;
        priorCompletedAt = previousReport.completedAt || "";
      }
    } catch {
      // A partial run may not have produced its report yet.
    }
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
      `This workflow requires AWS account ${EXPECTED_AWS_ACCOUNT_ID}.`,
    );
  }
  await aws.assertInfrastructure();
  const s3 =
    dependencies.s3 ||
    new S3Client({
      credentials: fromIni({ profile }),
      region: S3_REGION,
    });
  await s3.send(
    new HeadBucketCommand({ Bucket: CONTRACTOR_SOURCE_BUCKET }),
  );

  if (!options.quiet) {
    console.log(
      `Starting ${options.scope} ${options.mode} run ${runId}. DynamoDB writes are disabled.`,
    );
    console.log(
      "Reading the authoritative live contractor table and retained CSLB source.",
    );
  }

  const temporaryDirectory = await fsPromises.mkdtemp(
    path.join(os.tmpdir(), "retrofi-web-enrichment-"),
  );
  try {
    const [contractors, cslbSource] = await Promise.all([
      aws.scanContractors(),
      aws.downloadLatestCslbSource(temporaryDirectory),
    ]);
    const aliasesByLicense = await parseCslbAliases(
      cslbSource.localPath,
    );
    const statusCounts = countBy(
      contractors,
      (contractor) => contractor.licenseStatus || "<ABSENT>",
    );
    const usableContractors = contractors.filter(isUsableContractor);
    const skippedStatusCounts = countBy(
      contractors.filter((contractor) => !isUsableContractor(contractor)),
      (contractor) => contractor.licenseStatus || "<ABSENT>",
    );
    const identities = usableContractors.map((contractor) =>
      buildIdentityRecord({
        aliases:
          aliasesByLicense.get(String(contractor.licenseNumber)) || [],
        contractor,
      }),
    );

    const reviewedDirectory = await loadReviewedDirectoryArtifacts({
      outputDirectory,
      s3,
    });
    const officialSeeds = matchOfficialDirectorySeeds({
      directoryRecords: reviewedDirectory.records,
      identities,
    });
    const placeReference = await loadCaliforniaPlaceReference({
      cacheDirectory: path.join(
        options.cacheDirectory,
        "california-places",
      ),
      fetchImpl: dependencies.fetchImpl || fetch,
      now,
    });
    const osm = await prepareOsmRecords({
      cacheDirectory: options.cacheDirectory,
      fetchImpl: dependencies.fetchImpl || fetch,
      osmPbfPath: options.osmPbfPath,
      quiet: options.quiet,
    });
    const allOsmSeeds = await matchOsmSeeds({
      allIdentities: identities,
      osmJsonSequencePath: osm.jsonSequencePath,
    });
    const knownDomainContractorIds = new Set([
      ...officialSeeds.keys(),
      ...allOsmSeeds.seeds.keys(),
    ]);
    const targetContractorIds = await readContractorIds(
      options.targetContractorsFile,
    );
    const excludedContractorIds = await readContractorIds(
      options.excludeContractorsFile,
    );
    const selectableIdentities = identities.filter(
      (identity) =>
        !excludedContractorIds.has(identity.contractorId),
    );
    const selectedIdentities = targetContractorIds.size
      ? selectableIdentities.filter((identity) =>
          targetContractorIds.has(identity.contractorId),
        )
      : options.scope === "pilot"
        ? selectStratifiedPilot({
            identities: selectableIdentities,
            knownDomainContractorIds,
            pilotSize: options.pilotSize,
            seed: options.selectionSeed,
          })
        : identities;
    if (
      targetContractorIds.size &&
      selectedIdentities.length !== targetContractorIds.size
    ) {
      throw new Error(
        `Requested ${targetContractorIds.size} targeted contractors, but ${selectedIdentities.length} are eligible and present.`,
      );
    }
    selectedIdentities.sort((left, right) =>
      left.contractorId.localeCompare(right.contractorId),
    );
    const selectedIds = new Set(
      selectedIdentities.map((identity) => identity.contractorId),
    );
    const selectedOfficialSeeds = filterSeedMap(
      officialSeeds,
      selectedIds,
    );
    const selectedOsmSeeds = filterSeedMap(
      allOsmSeeds.seeds,
      selectedIds,
    );
    const osmSeeds = {
      counts: {
        ...allOsmSeeds.counts,
        selectedContractorMatches: selectedOsmSeeds.size,
      },
      seeds: selectedOsmSeeds,
    };
    const combinedSeeds = mergeSeedMaps(
      selectedOfficialSeeds,
      osmSeeds.seeds,
    );

    const resultPath = path.join(outputDirectory, "results.jsonl");
    if (options.resume) await repairJsonLinesTail(resultPath);
    const resultsById = options.resume
      ? await readJsonLinesToMap(resultPath, {
          keyFor: (result) => result.contractorId,
        })
      : new Map();
    resultAppender = createJsonLinesAppender(resultPath, {
      truncate: !options.resume,
    });
    runState = await createPersistentRunState({
      outputDirectory,
      resume: options.resume,
    });
    const domainLocks = new Map();
    const withRequestPermit = createConcurrencyLimiter(
      Math.min(16, options.concurrency),
    );
    const remaining = selectedIdentities.filter(
      (identity) => !resultsById.has(identity.contractorId),
    );
    let completedContractorCount =
      selectedIdentities.length - remaining.length;
    let processedThisInvocation = 0;

    if (!options.quiet) {
      console.log(
        `Selected ${selectedIdentities.length} contractors. ${remaining.length} require processing in this invocation.`,
      );
      console.log(
        `Official directory domains seed ${selectedOfficialSeeds.size} pilot contractors; OpenStreetMap seeds ${osmSeeds.seeds.size}.`,
      );
    }

    const hardDeadlineMs =
      options.scope === "full"
        ? Date.parse(startedAt) +
          options.maxRuntimeHours * 60 * 60 * 1_000
        : Number.POSITIVE_INFINITY;
    const processingDeadlineMs =
      hardDeadlineMs -
      options.reserveFinalizationMinutes * 60 * 1_000;
    let checkpointSequence = await nextCheckpointSequence(
      outputDirectory,
    );
    const persistCheckpoint = async ({
      completedCount,
      deepProcessed = 0,
      phase,
      selectedContractorIds,
    }) => {
      const sequence = checkpointSequence;
      checkpointSequence += 1;
      await resultAppender.flush();
      await runState.flush();
      await writeCheckpointSnapshot({
        completedContractorCount: completedCount,
        deepPassProcessed: deepProcessed,
        outputDirectory,
        phase,
        runId,
        runState,
        s3,
        selectedContractorIds,
        sequence,
        totalContractorCount: selectedIdentities.length,
        upload: options.upload,
      });
    };
    if (checkpointSequence === 0) {
      await persistCheckpoint({
        completedCount: completedContractorCount,
        phase: "selection",
        selectedContractorIds: selectedIdentities.map(
          (identity) => identity.contractorId,
        ),
      });
    }
    let fastPassStopped = false;
    if (
      remaining.length &&
      Date.now() < processingDeadlineMs
    ) {
      const completedBeforeFast = completedContractorCount;
      let lastCheckpointCompleted = 0;
      let nextCheckpointCompleted = options.checkpointEvery;
      let checkpointQueue = Promise.resolve();
      const queueCheckpoint = (completed) => {
        const completedCount = completedBeforeFast + completed;
        checkpointQueue = checkpointQueue.then(() =>
          persistCheckpoint({
            completedCount,
            phase: "fast",
          }),
        );
        return checkpointQueue;
      };
      const execution = await forEachAdaptiveConcurrent({
        initialConcurrency: Math.min(16, options.concurrency),
        maxConcurrency: options.concurrency,
        minimumConcurrency: Math.min(8, options.concurrency),
        metrics: runState.requestMetrics,
        onConcurrencyChange: ({ currentConcurrency, snapshot }) => {
          withRequestPermit.setLimit(currentConcurrency);
          if (!options.quiet) {
            console.log(
              `Adjusted contractor concurrency to ${currentConcurrency} after ${snapshot.requests} network requests.`,
            );
          }
        },
        onProgress: async (completed) => {
          if (
            !options.quiet &&
            (completed % 100 === 0 ||
              completed === remaining.length)
          ) {
            console.log(
              `Processed ${completed} of ${remaining.length} remaining contractors.`,
            );
          }
          if (completed >= nextCheckpointCompleted) {
            lastCheckpointCompleted = completed;
            nextCheckpointCompleted += options.checkpointEvery;
            await queueCheckpoint(completed);
          }
        },
        pressureConcurrencyFloor: Math.min(
          16,
          options.concurrency,
        ),
        shouldStop: () => Date.now() >= processingDeadlineMs,
        values: remaining,
        worker: async (identity) => {
          const result = await processIdentitySafely({
            combinedSeeds,
            dependencies,
            domainLocks,
            identity,
            mode: options.mode,
            pageLimit: options.mode === "deep" ? 8 : 4,
            placeReference,
            runState,
            timeoutMs: options.timeoutMs,
            withRequestPermit,
          });
          resultsById.set(identity.contractorId, result);
          await resultAppender.append(result);
          completedContractorCount += 1;
          processedThisInvocation += 1;
        },
      });
      await checkpointQueue;
      if (execution.completed !== lastCheckpointCompleted) {
        await persistCheckpoint({
          completedCount:
            completedBeforeFast + execution.completed,
          phase: "fast",
        });
      }
      fastPassStopped =
        execution.stopped ||
        execution.scheduled < remaining.length;
    } else if (remaining.length) {
      fastPassStopped = true;
    }
    const fastPassComplete =
      completedContractorCount === selectedIdentities.length;
    let deepPassProcessed =
      runState.deepPassCompletedIds.size;
    let deepPassImproved =
      runState.deepPassImprovedIds.size;
    let deepPassStopped = false;
    if (
      options.scope === "full" &&
      options.deepIfTime &&
      fastPassComplete &&
      Date.now() < processingDeadlineMs
    ) {
      const deepCandidates = selectDeepPassCandidates({
        identities: selectedIdentities,
        resultsById,
      }).filter(
        (identity) =>
          !runState.deepPassCompletedIds.has(
            identity.contractorId,
          ),
      );
      for (
        let offset = 0;
        offset < deepCandidates.length;
        offset += options.checkpointEvery
      ) {
        if (Date.now() >= processingDeadlineMs) {
          deepPassStopped = true;
          break;
        }
        const batch = deepCandidates.slice(
          offset,
          offset + options.checkpointEvery,
        );
        withRequestPermit.setLimit(
          Math.min(8, options.concurrency),
        );
        await forEachAdaptiveConcurrent({
          initialConcurrency: Math.min(8, options.concurrency),
          maxConcurrency: options.concurrency,
          minimumConcurrency: Math.min(4, options.concurrency),
          metrics: runState.requestMetrics,
          onConcurrencyChange: ({ currentConcurrency }) => {
            withRequestPermit.setLimit(currentConcurrency);
          },
          values: batch,
          worker: async (identity) => {
            const prior = resultsById.get(identity.contractorId);
            const candidate = await processIdentitySafely({
              combinedSeeds,
              dependencies,
              domainLocks,
              identity,
              mode: "deep",
              pageLimit: 8,
              placeReference,
              runState,
              timeoutMs: options.timeoutMs,
              withRequestPermit,
            });
            const result = chooseBetterResult(prior, candidate);
            const improved = result !== prior;
            if (improved) {
              resultsById.set(identity.contractorId, result);
              await resultAppender.append(result);
              deepPassImproved += 1;
            }
            runState.markDeepPassCompleted(
              identity.contractorId,
              { improved },
            );
            deepPassProcessed += 1;
          },
        });
        await persistCheckpoint({
          completedCount: completedContractorCount,
          deepProcessed: deepPassProcessed,
          phase: "deep",
        });
      }
    }
    await persistCheckpoint({
      completedCount: completedContractorCount,
      deepProcessed: deepPassProcessed,
      phase: "finalizing",
    });
    await resultAppender.close();
    resultAppender = null;
    const requestMetrics =
      runState.requestMetrics.snapshot();
    await runState.close();
    runState = null;

    const eligibleResults = selectedIdentities.map((identity) => {
      const result = resultsById.get(identity.contractorId);
      return result
        ? normalizeResultForArtifacts(result)
        : buildUnprocessedResult(identity);
    });
    const eligibleResultsById = new Map(
      eligibleResults.map((result) => [
        result.contractorId,
        result,
      ]),
    );
    const results =
      options.scope === "full"
        ? contractors.map(
            (contractor) =>
              eligibleResultsById.get(contractor.contractorId) ||
              buildSkippedResult(contractor),
          )
        : eligibleResults;
    if (
      options.scope === "full" &&
      results.length !== contractors.length
    ) {
      throw new Error(
        `Expected ${contractors.length} statewide outcomes, found ${results.length}.`,
      );
    }
    const acceptedResults = eligibleResults.filter(
      (result) => result.domainDisposition === "VERIFIED_DOMAIN",
    );
    const audit = buildPilotAudit({
      acceptedResults,
      minimumSampleSize: 400,
      seed: options.auditSeed,
    });
    const proposals = eligibleResults
      .filter((result) => Object.keys(result.proposal || {}).length)
      .map((result) => ({
        contractorId: result.contractorId,
        expected: result.expected,
        set: result.proposal,
        verifiedDomain: result.domain,
        discoveryMethod: result.discoveryMethod,
        domainEvidence: result.identityVerification,
      }));
    assertProposalSafety({ contractors, proposals });
    const reviewQueue = buildStatewideReviewQueue({
      results: eligibleResults,
      seed: options.auditSeed,
    });
    const licenseTransitionReview =
      buildLicenseTransitionReview(eligibleResults);
    const unresolved = buildUnresolvedRecords({
      identities: selectedIdentities,
      resultsById: eligibleResultsById,
    });
    const validation = validateFinalArtifacts({
      contractors,
      eligibleResults,
      fullScope: options.scope === "full",
      licenseTransitionReview,
      proposals,
      results,
    });

    const completedAt =
      options.resume && !remaining.length && priorCompletedAt
        ? priorCompletedAt
        : now().toISOString();
    const report = buildReport({
      accountId,
      acceptedResults,
      audit,
      completedAt,
      contractors,
      mode: options.mode,
      osmSeeds,
      processedThisInvocation,
      proposals,
      results: eligibleResults,
      runId,
      scope: options.scope,
      selectedIdentities,
      skippedStatusCounts,
      startedAt,
      statusCounts,
      usableContractors,
    });
    report.execution = {
      checkpointCount: checkpointSequence,
      deepPassImproved,
      deepPassProcessed,
      deepPassStopped,
      eligibleCompleted: eligibleResults.filter(
        (result) =>
          result.domainDisposition !==
          "NOT_PROCESSED_TIME_LIMIT",
      ).length,
      eligibleRemaining: eligibleResults.filter(
        (result) =>
          result.domainDisposition ===
          "NOT_PROCESSED_TIME_LIMIT",
      ).length,
      fastPassComplete,
      fastPassStopped,
      hardDeadline: Number.isFinite(hardDeadlineMs)
        ? new Date(hardDeadlineMs).toISOString()
        : null,
      outcomeAccountingCount: results.length,
      requestMetrics,
    };
    report.deepModeBenefitEstimate = {
      available: deepPassProcessed > 0,
      contractorsProcessed: deepPassProcessed,
      contractorsImproved: deepPassImproved,
      incrementalProposalRate: divide(
        deepPassImproved,
        deepPassProcessed,
      ),
      stoppedAtDeadline: deepPassStopped,
    };
    const finalArtifactCount = 10;
    const expectedS3ObjectCount = options.upload
      ? finalArtifactCount + checkpointSequence
      : 0;
    report.s3Upload = {
      enabled: options.upload,
      objectCount: expectedS3ObjectCount,
      prefix: options.upload
        ? `imports/web-enrichment/${runId}/`
        : "",
    };
    report.awsWriteCount = expectedS3ObjectCount;
    report.dynamodbWriteCount = 0;
    const artifacts = await writeRunArtifacts({
      audit,
      manifestBase: {
        schemaVersion: "contractor-web-enrichment-manifest.v1",
        runId,
        scope: options.scope,
        mode: options.mode,
        scriptVersion: WEB_ENRICHMENT_SCRIPT_VERSION,
        accountId,
        resources: {
          contractorTable: CONTRACTORS_TABLE,
          contractorSourceBucket: CONTRACTOR_SOURCE_BUCKET,
        },
        startedAt,
        completedAt,
        liveContractorCount: contractors.length,
        usableContractorCount: usableContractors.length,
        selectedContractorCount: selectedIdentities.length,
        checkpointKeys: Array.from(
          { length: checkpointSequence },
          (_, index) =>
            `imports/web-enrichment/${runId}/checkpoints/${String(index).padStart(6, "0")}.json`,
        ),
        cslbSource: {
          s3Key: cslbSource.s3Key,
          sha256: cslbSource.sha256,
          sizeBytes: cslbSource.sizeBytes,
        },
        reviewedDirectory: {
          runId: REVIEWED_DIRECTORY_RUN_ID,
          reportS3Key: REVIEWED_DIRECTORY_REPORT_KEY,
          sourceSnapshotCount:
            reviewedDirectory.report.sourceSnapshots.length,
        },
        openStreetMap: osm.metadata,
        californiaPlaceReference: placeReference.metadata,
        selectionSeed: options.selectionSeed,
        auditSeed: options.auditSeed,
        selectedContractorHash: sha256Text(
          selectedIdentities
            .map((identity) => identity.contractorId)
            .join("\n"),
        ),
        invariants: {
          dynamodbWritesEnabled: false,
          overwritesExistingFields: false,
          modifiesCslbFields: false,
          modifiesProgramMemberships: false,
          modifiesCertifications: false,
          modifiesSupportedRetrofitIds: false,
          paidApisUsed: false,
          searchResultPagesScraped: false,
        },
      },
      outputDirectory,
      licenseTransitionReview,
      proposals,
      reviewQueue,
      rawEvidence: results
        .filter((result) => result.domain)
        .map((result) => ({
          contractorIdToken: result.contractorIdToken,
          domain: result.domain,
          discoveryMethod: result.discoveryMethod,
          domainDisposition: result.domainDisposition,
          identityVerification: result.identityVerification,
          pages: result.pages,
        })),
      report,
      results,
      runId,
      unresolved,
      validation,
    });

    let uploadedObjectCount = 0;
    if (options.upload) {
      uploadedObjectCount = await uploadRunArtifacts({
        artifacts,
        s3,
      });
    }
    const totalUploadedObjectCount =
      uploadedObjectCount +
      (options.upload ? checkpointSequence : 0);
    if (totalUploadedObjectCount !== expectedS3ObjectCount) {
      throw new Error(
        `Expected ${expectedS3ObjectCount} S3 artifacts, completed ${totalUploadedObjectCount}.`,
      );
    }

    if (!options.quiet) {
      console.log(JSON.stringify({
        runId,
        outputDirectory,
        report: artifacts.report.summary,
        audit: {
          sampleSize: audit.sampleSize,
          verifiedDomainPrecision: audit.verifiedDomainPrecision,
          gate: audit.gate,
        },
        s3Upload: artifacts.report.s3Upload,
        dynamodbWriteCount: 0,
      }, null, 2));
    }
    return {
      audit,
      manifest: artifacts.manifest,
      proposals,
      report: artifacts.report,
      runId,
      outputDirectory,
    };
  } finally {
    let resultCloseError;
    try {
      await resultAppender?.close();
    } catch (error) {
      resultCloseError = error;
    } finally {
      try {
        await runState?.close({
          persistProgress: !resultCloseError,
        });
      } finally {
        await fsPromises.rm(temporaryDirectory, {
          force: true,
          recursive: true,
        });
      }
    }
    if (resultCloseError) throw resultCloseError;
  }
}

async function processContractor({
  fetchImpl,
  identity,
  mode,
  pageLimit,
  placeReference,
  runState,
  seeds,
  timeoutMs,
  withDomainLock,
  withRequestPermit,
}) {
  if (!identity.fieldsNeeded.length) {
    return {
      contractorId: identity.contractorId,
      contractorIdToken: token(identity.contractorId),
      domainDisposition: "NO_DOMAIN_CANDIDATE",
      discoveryMethod: "",
      outcomes: ["SKIPPED_ALREADY_ENRICHED"],
      proposal: {},
    };
  }
  const seedCandidates = seeds.map((seed) => ({
    domain: seed.domain,
    discoveryMethod: seed.sourceType,
    seed,
  }));
  const generatedCandidates = generateCandidateDomains(identity, {
    limit: mode === "deep" ? 40 : 12,
    mode,
  }).map((domain) => ({
    domain,
    discoveryMethod: "candidate_generation",
    seed: {
      domain,
      sourceType: "candidate_generation",
      matchMethod: "generated_from_cslb_identity",
    },
  }));
  const candidatesByDomain = new Map();
  for (const candidate of [
    ...seedCandidates,
    ...generatedCandidates,
  ]) {
    if (
      candidate.domain &&
      !candidatesByDomain.has(candidate.domain)
    ) {
      candidatesByDomain.set(candidate.domain, candidate);
    }
  }
  const candidates = [...candidatesByDomain.values()];
  if (!candidates.length) {
    return {
      contractorId: identity.contractorId,
      contractorIdToken: token(identity.contractorId),
      domainDisposition: "NO_DOMAIN_CANDIDATE",
      discoveryMethod: "",
      outcomes: ["NO_VERIFIED_DOMAIN"],
      proposal: {},
    };
  }

  const attemptedDomains = [];
  let sawReachable = false;
  let sawUnreachable = false;
  let ambiguousResult = null;
  let licenseTransitionResult = null;
  for (
    let offset = 0;
    offset < candidates.length;
    offset += DNS_RESOLUTION_BATCH_SIZE
  ) {
    const batch = candidates.slice(
      offset,
      offset + DNS_RESOLUTION_BATCH_SIZE,
    );
    const dnsResults = await Promise.all(
      batch.map(async (candidate) => ({
        candidate,
        resolved: await domainResolves(
          candidate.domain,
          runState,
        ),
      })),
    );
    const evaluatedResults = await Promise.all(
      dnsResults.map(async ({ candidate, resolved }) => ({
        candidate,
        resolved,
        evaluated: resolved
          ? await withDomainLock(
              candidate.domain,
              () =>
                withRequestPermit(() =>
                  evaluateDomainCandidate({
                    candidate,
                    fetchImpl,
                    identity,
                    mode,
                    pageLimit,
                    placeReference,
                    runState,
                    timeoutMs,
                  }),
                ),
            )
          : null,
      })),
    );
    for (const {
      candidate,
      evaluated,
      resolved,
    } of evaluatedResults) {
      if (!resolved) {
        attemptedDomains.push({
          domain: candidate.domain,
          disposition: "REJECTED_DOMAIN",
          reason: "dns_not_resolved",
        });
        continue;
      }
      attemptedDomains.push({
        domain: candidate.domain,
        disposition: evaluated.domainDisposition,
        reason: evaluated.reason,
        ...(evaluated.domainDisposition ===
        "LICENSE_TRANSITION_REVIEW"
          ? {
              databaseLicenseNumber:
                evaluated.identityVerification
                  ?.databaseLicenseNumber || "",
              websiteLicenseNumbers:
                evaluated.identityVerification
                  ?.websiteLicenseNumbers || [],
            }
          : {}),
      });
      if (
        evaluated.domainDisposition ===
        "WEBSITE_UNREACHABLE"
      ) {
        sawUnreachable = true;
        continue;
      }
      sawReachable = true;
      if (
        evaluated.domainDisposition ===
        "LICENSE_TRANSITION_REVIEW"
      ) {
        licenseTransitionResult ||= evaluated;
        continue;
      }
      if (
        evaluated.domainDisposition === "AMBIGUOUS_DOMAIN"
      ) {
        ambiguousResult ||= evaluated;
        continue;
      }
      if (
        evaluated.domainDisposition !== "VERIFIED_DOMAIN"
      ) {
        continue;
      }
      return {
        contractorId: identity.contractorId,
        contractorIdToken: token(identity.contractorId),
        attemptedDomainCount: attemptedDomains.length,
        attemptedDomains,
        ...evaluated,
      };
    }
  }

  if (licenseTransitionResult) {
    return {
      contractorId: identity.contractorId,
      contractorIdToken: token(identity.contractorId),
      attemptedDomainCount: attemptedDomains.length,
      attemptedDomains,
      ...licenseTransitionResult,
      outcomes: ["LICENSE_TRANSITION_REVIEW"],
      proposal: {},
    };
  }
  if (ambiguousResult) {
    return {
      contractorId: identity.contractorId,
      contractorIdToken: token(identity.contractorId),
      attemptedDomainCount: attemptedDomains.length,
      attemptedDomains,
      ...ambiguousResult,
      outcomes: ["NO_VERIFIED_DOMAIN"],
      proposal: {},
    };
  }
  return {
    contractorId: identity.contractorId,
    contractorIdToken: token(identity.contractorId),
    attemptedDomainCount: attemptedDomains.length,
    attemptedDomains,
    domainDisposition:
      sawUnreachable && !sawReachable
        ? "WEBSITE_UNREACHABLE"
        : "NO_VERIFIED_DOMAIN",
    discoveryMethod: "",
    outcomes:
      sawUnreachable && !sawReachable
        ? ["WEBSITE_UNREACHABLE", "NO_VERIFIED_DOMAIN"]
        : ["NO_VERIFIED_DOMAIN"],
    proposal: {},
  };
}

async function processIdentitySafely({
  combinedSeeds,
  dependencies,
  domainLocks,
  identity,
  mode,
  pageLimit,
  placeReference,
  runState,
  timeoutMs,
  withRequestPermit,
}) {
  try {
    return await processContractor({
      fetchImpl: dependencies.fetchImpl || fetch,
      identity,
      mode,
      pageLimit,
      placeReference,
      runState,
      seeds: combinedSeeds.get(identity.contractorId) || [],
      timeoutMs,
      withDomainLock: (domain, task) =>
        withDomainLock(domainLocks, domain, task),
      withRequestPermit,
    });
  } catch (error) {
    if (error instanceof PersistentRunStateError) throw error;
    return {
      contractorId: identity.contractorId,
      contractorIdToken: token(identity.contractorId),
      discoveryMethod: "",
      domainDisposition: "NO_VERIFIED_DOMAIN",
      error: cleanError(error),
      outcomes: ["NO_VERIFIED_DOMAIN"],
      proposal: {},
    };
  }
}

function verificationCacheKey({
  candidate,
  identity,
  pages,
}) {
  return [
    identity.contractorId,
    candidate.domain,
    candidate.seed?.sourceType || "",
    candidate.seed?.matchMethod || "",
    pages.map((page) => page.contentSha256).join(","),
  ].join("|");
}

function selectDeepPassCandidates({
  identities,
  resultsById,
}) {
  return identities
    .filter((identity) => {
      const result = resultsById.get(identity.contractorId);
      if (!result) return true;
      if (result.domainDisposition !== "VERIFIED_DOMAIN") {
        return true;
      }
      return identity.fieldsNeeded.some(
        (field) =>
          !Object.hasOwn(result.proposal || {}, field),
      );
    })
    .sort(
      (left, right) =>
        deepPassPriority(right, resultsById.get(right.contractorId)) -
          deepPassPriority(
            left,
            resultsById.get(left.contractorId),
          ) ||
        left.contractorId.localeCompare(right.contractorId),
    );
}

function deepPassPriority(identity, result) {
  let score = 0;
  if (identity.phone) score += 4;
  if (
    identity.address.line1 &&
    identity.address.city &&
    identity.address.postalCode
  ) {
    score += 4;
  }
  if (identity.normalizedNames.some((name) => name.split(" ").length > 1)) {
    score += 2;
  }
  if (result?.domainDisposition === "VERIFIED_DOMAIN") score += 6;
  if (result?.domainDisposition === "WEBSITE_UNREACHABLE") score += 3;
  return score;
}

function chooseBetterResult(prior, candidate) {
  if (!prior) return candidate;
  const priorScore = resultQuality(prior);
  const candidateScore = resultQuality(candidate);
  if (candidateScore > priorScore) return candidate;
  if (
    candidateScore === priorScore &&
    Object.keys(candidate.proposal || {}).length >
      Object.keys(prior.proposal || {}).length
  ) {
    return candidate;
  }
  return prior;
}

function resultQuality(result) {
  if (result?.domainDisposition === "VERIFIED_DOMAIN") return 4;
  if (
    result?.domainDisposition === "LICENSE_TRANSITION_REVIEW"
  ) {
    return 3;
  }
  if (result?.domainDisposition === "AMBIGUOUS_DOMAIN") return 2;
  if (result?.domainDisposition === "WEBSITE_UNREACHABLE") return 1;
  return 0;
}

async function evaluateDomainCandidate({
  candidate,
  fetchImpl,
  identity,
  mode,
  pageLimit,
  placeReference,
  runState,
  timeoutMs,
}) {
  let crawlState = runState.domainCrawlCache.get(
    candidate.domain,
  );
  const crawlStateWasCached = Boolean(crawlState);
  if (!crawlState) {
    const homepage = await fetchCandidateHomepage({
      domain: candidate.domain,
      fetchImpl,
      includeHttpVariants:
        mode === "deep" ||
        candidate.discoveryMethod !== "candidate_generation",
      retryUnavailableRobots: mode === "deep",
      runState,
      timeoutMs,
    });
    if (!homepage) {
      return {
        domain: candidate.domain,
        domainDisposition: "WEBSITE_UNREACHABLE",
        discoveryMethod: candidate.discoveryMethod,
        reason: "homepage_unreachable",
      };
    }
    const homepagePage = parseHtmlPage(homepage);
    crawlState = {
      pageLimit: 1,
      pages: [homepagePage],
      robots: homepage.robots,
    };
  }
  const homepagePage = crawlState.pages[0];
  const verifiedDomain =
    domainFromUrl(homepagePage.url) || candidate.domain;
  const initialVerificationKey = verificationCacheKey({
    candidate,
    identity,
    pages: [homepagePage],
  });
  let identityVerification = runState.verificationCache.get(
    initialVerificationKey,
  );
  if (!identityVerification) {
    identityVerification = scoreDomainIdentity({
      homepageText:
        homepagePage.identityText || homepagePage.text,
      identity,
      seed: candidate.seed,
    });
    if (identityVerification.disposition !== "REJECTED_DOMAIN") {
      await runState.setVerification(
        initialVerificationKey,
        identityVerification,
      );
    }
  }
  identityVerification = applyReviewedLicenseTransition({
    domain: verifiedDomain,
    identity,
    verification: identityVerification,
  });
  if (!identityVerification.accepted) {
    if (
      !crawlStateWasCached &&
      (candidate.discoveryMethod !== "candidate_generation" ||
        identityVerification.disposition !== "REJECTED_DOMAIN")
    ) {
      await runState.setDomainCrawl(candidate.domain, crawlState);
    }
    return {
      domain: candidate.domain,
      domainDisposition: identityVerification.disposition,
      discoveryMethod: candidate.discoveryMethod,
      identityVerification,
      reason:
        identityVerification.disposition ===
        "LICENSE_TRANSITION_REVIEW"
          ? "different_current_license_displayed"
          : identityVerification.ambiguous
            ? "insufficient_identity_evidence"
            : "identity_rejected",
    };
  }
  if (crawlState.pageLimit < pageLimit) {
    const pages = [...crawlState.pages];
    const existingUrls = new Set(
      pages.map((page) => page.url),
    );
    const crawlLinks = chooseInternalCrawlLinks({
      homepageUrl: homepagePage.url,
      links: homepagePage.links,
      limit: Math.max(0, pageLimit - 1),
    });
    for (const url of crawlLinks) {
      if (existingUrls.has(url)) continue;
      const page = await fetchHtmlPage({
        fetchImpl,
        robots: crawlState.robots,
        runState,
        timeoutMs,
        url,
      });
      if (page) {
        const parsed = parseHtmlPage(page);
        pages.push(parsed);
        existingUrls.add(parsed.url);
      }
      if (pages.length >= pageLimit) break;
    }
    crawlState = {
      ...crawlState,
      pageLimit,
      pages,
    };
    await runState.setDomainCrawl(candidate.domain, crawlState);
  }
  const pages = crawlState.pages.slice(0, pageLimit);
  const finalVerificationKey = verificationCacheKey({
    candidate,
    identity,
    pages,
  });
  let finalIdentityVerification =
    runState.verificationCache.get(finalVerificationKey);
  if (!finalIdentityVerification) {
    finalIdentityVerification = scoreDomainIdentity({
      homepageText: pages
        .map((page) => page.identityText || page.text)
        .join("\n"),
      identity,
      seed: candidate.seed,
    });
    if (
      finalIdentityVerification.disposition !==
      "REJECTED_DOMAIN"
    ) {
      await runState.setVerification(
        finalVerificationKey,
        finalIdentityVerification,
      );
    }
  }
  finalIdentityVerification =
    applyReviewedLicenseTransition({
      domain: verifiedDomain,
      identity,
      verification: finalIdentityVerification,
    });
  if (!finalIdentityVerification.accepted) {
    return {
      domain: candidate.domain,
      domainDisposition: finalIdentityVerification.disposition,
      discoveryMethod: candidate.discoveryMethod,
      identityVerification: finalIdentityVerification,
      pages: pages.map(sanitizePageMetadata),
      reason:
        finalIdentityVerification.disposition ===
        "LICENSE_TRANSITION_REVIEW"
          ? "different_current_license_displayed"
          : finalIdentityVerification.ambiguous
            ? "insufficient_identity_evidence"
            : "identity_rejected",
    };
  }
  const extracted = extractWebsiteFields({
    domain: verifiedDomain,
    identity,
    pages,
    placeReference,
  });
  const proposal = {
    ...extracted.proposal,
  };
  if (extracted.evidence.length) {
    proposal.enrichmentEvidence = [
      ...(identity.existing.enrichmentEvidence || []),
      ...extracted.evidence,
    ];
  }
  const expected = Object.fromEntries(
    Object.keys(proposal).map((field) => [
      field,
      field === "enrichmentEvidence"
        ? identity.existing.enrichmentEvidence
        : identity.existing[field],
    ]),
  );
  const outcomes = ["VERIFIED_DOMAIN"];
  if (Object.hasOwn(proposal, "email")) {
    outcomes.push("FOUND_EMAIL");
  } else if (identity.fieldsNeeded.includes("email")) {
    outcomes.push("VERIFIED_DOMAIN_NO_EMAIL", "EMAIL_NOT_PUBLISHED");
  }
  if (
    identity.fieldsNeeded.some((field) =>
      ["servesCommercial", "servesResidential"].includes(field),
    ) &&
    !Object.hasOwn(proposal, "servesCommercial") &&
    !Object.hasOwn(proposal, "servesResidential")
  ) {
    outcomes.push("CUSTOMER_TYPE_NOT_STATED");
  }
  if (
    identity.fieldsNeeded.includes("serviceAreas") &&
    !Object.hasOwn(proposal, "serviceAreas")
  ) {
    outcomes.push("SERVICE_AREA_NOT_STATED");
  }
  return {
    domain: verifiedDomain,
    domainDisposition: "VERIFIED_DOMAIN",
    discoveryMethod: candidate.discoveryMethod,
    expected,
    confidenceTier: finalIdentityVerification.confidenceTier,
    identityVerification: finalIdentityVerification,
    outcomes,
    pages: pages.map(sanitizePageMetadata),
    proposal,
    reason: "identity_verified",
  };
}

async function fetchCandidateHomepage({
  domain,
  fetchImpl,
  includeHttpVariants,
  retryUnavailableRobots,
  runState,
  timeoutMs,
}) {
  const variants = [
    `https://${domain}/`,
    `https://www.${domain}/`,
    ...(includeHttpVariants
      ? [
          `http://${domain}/`,
          `http://www.${domain}/`,
        ]
      : []),
  ];
  for (const url of variants) {
    let origin;
    try {
      origin = new URL(url).origin;
    } catch {
      continue;
    }
    const robots = await fetchRobots({
      fetchImpl,
      origin,
      retryUnavailable: retryUnavailableRobots,
      runState,
      timeoutMs,
    });
    if (!robotsAllows(robots, "/")) continue;
    const page = await fetchHtmlPage({
      fetchImpl,
      robots,
      runState,
      timeoutMs,
      url,
    });
    if (page) return { ...page, robots };
  }
  return null;
}

async function fetchHtmlPage({
  fetchImpl,
  robots,
  runState,
  timeoutMs,
  url,
}) {
  const parsed = new URL(url);
  if (!robotsAllows(robots, `${parsed.pathname}${parsed.search}`)) {
    return null;
  }
  let lastError;
  for (let attempt = 1; attempt <= 2; attempt += 1) {
    try {
      const response = await fetchImpl(url, {
        headers: {
          accept: "text/html,application/xhtml+xml",
          "user-agent": USER_AGENT,
        },
        redirect: "follow",
        signal: AbortSignal.timeout(timeoutMs),
      });
      if (!response.ok) {
        if (response.status === 429) {
          runState.requestMetrics.record("http429");
        } else if (response.status >= 500) {
          runState.requestMetrics.record("http5xx");
        } else {
          runState.requestMetrics.record("successes");
        }
        if (response.status >= 500 && attempt === 1) continue;
        return null;
      }
      runState.requestMetrics.record("successes");
      const contentType = response.headers.get("content-type") || "";
      const contentLength = Number(
        response.headers.get("content-length") || 0,
      );
      if (
        !/text\/html|application\/xhtml\+xml/i.test(contentType) ||
        contentLength > 2_000_000
      ) {
        return null;
      }
      const html = await response.text();
      if (Buffer.byteLength(html) > 2_000_000) return null;
      return {
        contentType,
        finalUrl: response.url || url,
        html,
        retrievedAt: new Date().toISOString(),
        status: response.status,
      };
    } catch (error) {
      lastError = error;
      const timedOut =
        error?.name === "TimeoutError" ||
        error?.name === "AbortError";
      runState.requestMetrics.record(
        timedOut ? "timeouts" : "networkErrors",
      );
      if (timedOut) return null;
      if (attempt === 1 && isTransientFetchError(error)) {
        continue;
      }
      return null;
    }
  }
  void lastError;
  return null;
}

async function fetchRobots({
  fetchImpl,
  origin,
  retryUnavailable,
  runState,
  timeoutMs,
}) {
  if (runState.robotsCache.has(origin)) {
    const cached = runState.robotsCache.get(origin);
    if (!(retryUnavailable && cached.unavailable)) {
      return cached;
    }
  }
  try {
    const response = await fetchImpl(`${origin}/robots.txt`, {
      headers: { "user-agent": USER_AGENT },
      redirect: "follow",
      signal: AbortSignal.timeout(timeoutMs),
    });
    if (!response.ok) {
      runState.requestMetrics.record(
        response.status === 429
          ? "http429"
          : response.status >= 500
            ? "http5xx"
            : "successes",
      );
      const value =
        response.status === 429 || response.status >= 500
          ? {
              rules: [],
              unavailable: true,
              unavailableReason: `http_${response.status}`,
            }
          : { rules: [] };
      await runState.setRobots(origin, value);
      return value;
    }
    const body = await response.text();
    runState.requestMetrics.record("successes");
    const value = parseRobots(body);
    await runState.setRobots(origin, value);
    return value;
  } catch (error) {
    runState.requestMetrics.record(
      error?.name === "TimeoutError" ||
        error?.name === "AbortError"
        ? "timeouts"
        : "networkErrors",
    );
    const value = {
      rules: [],
      unavailable: true,
      unavailableReason:
        error?.name === "TimeoutError" ||
        error?.name === "AbortError"
          ? "timeout"
          : "network_error",
    };
    await runState.setRobots(origin, value);
    return value;
  }
}

function parseRobots(body) {
  const groups = [];
  let group = null;
  for (const rawLine of String(body || "").split(/\r?\n/)) {
    const line = rawLine.replace(/#.*$/, "").trim();
    if (!line) continue;
    const separator = line.indexOf(":");
    if (separator < 0) continue;
    const key = line.slice(0, separator).trim().toLowerCase();
    const value = line.slice(separator + 1).trim();
    if (key === "user-agent") {
      if (!group || group.rules.length) {
        group = { agents: [], rules: [] };
        groups.push(group);
      }
      group.agents.push(value.toLowerCase());
    } else if (
      group &&
      (key === "allow" || key === "disallow")
    ) {
      group.rules.push({ type: key, path: value });
    }
  }
  const matching = groups.filter((candidate) =>
    candidate.agents.some(
      (agent) =>
        agent === "*" ||
        USER_AGENT.toLowerCase().includes(agent),
    ),
  );
  return {
    rules: matching.flatMap((candidate) => candidate.rules),
  };
}

export function robotsAllows(robots, pathname) {
  if (robots?.unavailable) return false;
  const candidates = (robots?.rules || [])
    .filter((rule) => rule.path && pathname.startsWith(rule.path))
    .sort((left, right) => right.path.length - left.path.length);
  if (!candidates.length) return true;
  return candidates[0].type === "allow";
}

export function isTransientFetchError(error) {
  const code =
    error?.cause?.code ||
    error?.code ||
    "";
  return TRANSIENT_FETCH_ERROR_CODES.has(code);
}

export function parseHtmlPage(page) {
  const $ = cheerio.load(page.html);
  const embeddedLicenseText = $("script")
    .toArray()
    .flatMap((element) =>
      clean($(element).text()).match(
        /\b(?:(?:CA|CALIFORNIA)\s+(?:CONTRACTOR\s+)?(?:LICENSE|LIC\.?)|CSLB\s+(?:LICENSE|LIC\.?)|CONTRACTOR\s+(?:LICENSE|LIC\.?))(?:\s*(?:NO\.?|NUMBER|#))?\s*[:#-]?\s*[0-9]{6,8}\b/gi,
      ) || [],
    );
  $("script, style, noscript, svg, template").remove();
  $("br").replaceWith("\n");
  $("p, li, h1, h2, h3, h4, address").each((_, element) => {
    $(element).append("\n");
  });
  const text = $("body")
    .text()
    .replace(/\u00a0/g, " ")
    .replace(/[^\S\r\n]+/g, " ")
    .replace(/\n\s*/g, "\n")
    .trim();
  const links = $("a[href]")
    .toArray()
    .map((anchor) => ({
      href: clean($(anchor).attr("href")),
      text: clean($(anchor).text()),
    }))
    .filter((link) => link.href);
  const emails = [];
  for (const anchor of $('a[href^="mailto:"]').toArray()) {
    let href = clean($(anchor).attr("href"));
    try {
      href = decodeURIComponent(href);
    } catch {
      continue;
    }
    const value = href
      .replace(/^mailto:/i, "")
      .split("?")[0]
      .trim();
    emails.push({
      sourceMethod: "mailto",
      value,
      snippet: clean($(anchor).parent().text()) || value,
    });
  }
  const textNodes = [];
  $("body")
    .add("body *")
    .each((_, element) => {
      for (const child of element.children || []) {
        if (child.type === "text") {
          textNodes.push(child);
        }
      }
    });
  for (const node of textNodes) {
    const nodeText = clean(node.data);
    if (!nodeText || nodeText.length > 500) continue;
    for (const match of nodeText.matchAll(
      /\b[A-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[A-Z0-9.-]+\.[A-Z]{2,}\b/gi,
    )) {
      emails.push({
        sourceMethod: "isolated_text_node",
        value: match[0],
        snippet: nodeText,
      });
    }
  }
  for (const match of text.matchAll(
    /\b[A-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[A-Z0-9.-]+\.[A-Z]{2,}\b/gi,
  )) {
    emails.push({
      sourceMethod: "visible_text",
      value: match[0],
      snippet: text.slice(
        Math.max(0, match.index - 100),
        Math.min(text.length, match.index + match[0].length + 100),
      ),
    });
  }
  return {
    contentSha256: sha256Text(page.html),
    emails: [
      ...new Map(
        emails.map((email) => [
          [
            email.sourceMethod,
            clean(email.value).toLowerCase(),
            clean(email.snippet),
          ].join("|"),
          email,
        ]),
      ).values(),
    ],
    identityText: [text, ...embeddedLicenseText]
      .filter(Boolean)
      .join("\n"),
    links,
    retrievedAt: page.retrievedAt,
    status: page.status,
    text,
    url: page.finalUrl,
  };
}

export function applyReviewedLicenseTransition({
  domain,
  identity,
  verification,
}) {
  const reviewed = reviewedLicenseTransitionFor({
    domain,
    licenseNumber: identity.licenseNumber,
  });
  const signals = verification?.signals || {};
  if (
    !reviewed ||
    !(
      signals.nameStrong ||
      signals.exactPhone ||
      signals.locationMatch
    )
  ) {
    return verification;
  }
  return {
    ...verification,
    accepted: false,
    ambiguous: false,
    confidenceTier: "",
    databaseLicenseNumber: identity.licenseNumber,
    disposition: "LICENSE_TRANSITION_REVIEW",
    reviewSource: reviewed.reviewSource,
    websiteLicenseNumbers:
      reviewed.websiteLicenseNumbers,
    signals: {
      ...signals,
      confidenceTier: "",
      conflictingLicense: true,
      licenseTransition: true,
      reviewedLicenseTransition: true,
    },
  };
}

function reviewedLicenseTransitionFor({
  domain,
  licenseNumber,
}) {
  const normalizedDomain =
    domainFromUrl(`https://${domain}`) ||
    clean(domain).toLowerCase();
  return REVIEWED_LICENSE_TRANSITIONS.get(
    `${licenseNumber}|${normalizedDomain}`,
  );
}

function sanitizePageMetadata(page) {
  return {
    url: page.url,
    retrievedAt: page.retrievedAt,
    status: page.status,
    contentSha256: page.contentSha256,
    emailCandidateCount: page.emails.length,
    textLength: page.text.length,
  };
}

async function domainResolves(domain, runState) {
  if (runState.dnsCache.has(domain)) {
    return runState.dnsCache.get(domain);
  }
  let timeout;
  try {
    const result = await Promise.race([
      dns.lookup(domain, {
        all: true,
        verbatim: true,
      }),
      new Promise((_, reject) => {
        timeout = setTimeout(
          () => reject(new Error("DNS timeout")),
          4_000,
        );
      }),
    ]);
    const resolved = Array.isArray(result) && result.length > 0;
    await runState.setDns(domain, resolved);
    return resolved;
  } catch {
    await runState.setDns(domain, false);
    return false;
  } finally {
    clearTimeout(timeout);
  }
}

async function withDomainLock(locks, domain, task) {
  const prior = locks.get(domain) || Promise.resolve();
  const current = prior
    .catch(() => {})
    .then(task);
  locks.set(domain, current);
  try {
    return await current;
  } finally {
    if (locks.get(domain) === current) locks.delete(domain);
  }
}

export function createConcurrencyLimiter(limit) {
  let currentLimit = Math.max(1, Number(limit) || 1);
  const waiters = [];
  let active = 0;
  const dispatch = () => {
    while (active < currentLimit && waiters.length) {
      active += 1;
      waiters.shift()();
    }
  };
  const acquire = () =>
    new Promise((resolve) => {
      if (active < currentLimit) {
        active += 1;
        resolve();
      } else {
        waiters.push(resolve);
      }
    });
  const withPermit = async (task) => {
    await acquire();
    try {
      return await task();
    } finally {
      active -= 1;
      dispatch();
    }
  };
  withPermit.setLimit = (nextLimit) => {
    currentLimit = Math.max(1, Number(nextLimit) || 1);
    dispatch();
  };
  return withPermit;
}

async function parseCslbAliases(sourcePath) {
  const aliases = new Map();
  const parser = parse({
    bom: true,
    columns: true,
    relax_quotes: true,
    skip_records_with_error: true,
  });
  fs.createReadStream(sourcePath).pipe(parser);
  for await (const row of parser) {
    const licenseNumber = clean(row.LicenseNo)
      .replace(/\s+/g, "")
      .toUpperCase();
    if (!licenseNumber) continue;
    const values = [
      row.BusinessName,
      row["BUS-NAME-2"],
      row.FullBusinessName,
    ]
      .map(clean)
      .filter(Boolean);
    aliases.set(
      licenseNumber,
      [...new Set([...(aliases.get(licenseNumber) || []), ...values])],
    );
  }
  return aliases;
}

async function loadReviewedDirectoryArtifacts({
  outputDirectory,
  s3,
}) {
  const directory = path.join(
    outputDirectory,
    "reviewed-directory",
    REVIEWED_DIRECTORY_RUN_ID,
  );
  const reportPath = path.join(directory, "report.json");
  await fsPromises.mkdir(directory, { recursive: true });
  let report;
  try {
    report = JSON.parse(
      await fsPromises.readFile(reportPath, "utf8"),
    );
  } catch {
    report = await readS3Json(
      s3,
      REVIEWED_DIRECTORY_REPORT_KEY,
    );
    await writeJson(reportPath, report);
  }
  if (
    report.runId !== REVIEWED_DIRECTORY_RUN_ID ||
    report.mode !== "write" ||
    report.proposalHash !==
      "b5e4c593f64f9285cd485db4d3a623c7cb05772871d34effe6e7c76d72ad24a7"
  ) {
    throw new Error("The retained reviewed directory report changed.");
  }
  for (const snapshot of report.sourceSnapshots || []) {
    const localPath = path.join(directory, snapshot.relativePath);
    let valid = false;
    try {
      valid =
        (await sha256File(localPath)) === snapshot.sha256;
    } catch {
      valid = false;
    }
    if (valid) continue;
    await fsPromises.mkdir(path.dirname(localPath), {
      recursive: true,
    });
    const date = snapshot.retrievedAt.slice(0, 10);
    const key = [
      "raw/enrichment",
      snapshot.sourceId,
      date,
      `${snapshot.sha256.slice(0, 12)}-${path.basename(
        snapshot.relativePath,
      )}`,
    ].join("/");
    const response = await s3.send(
      new GetObjectCommand({
        Bucket: CONTRACTOR_SOURCE_BUCKET,
        Key: key,
      }),
    );
    await fsPromises.writeFile(
      localPath,
      Buffer.from(await response.Body.transformToByteArray()),
    );
    if ((await sha256File(localPath)) !== snapshot.sha256) {
      throw new Error(
        `Reviewed directory snapshot hash mismatch for ${snapshot.relativePath}.`,
      );
    }
  }
  return {
    report,
    records: (
      await loadReviewedDirectoryRecords({
        report,
        reportPath,
      })
    ).records,
  };
}

function matchOfficialDirectorySeeds({
  directoryRecords,
  identities,
}) {
  const indices = buildExactIndices(identities);
  const seeds = new Map();
  for (const record of directoryRecords) {
    const domain = domainFromUrl(record.website);
    if (!domain) continue;
    const match = matchExact(record, indices);
    if (match.status !== "matched") continue;
    const values = seeds.get(match.record.contractorId) || [];
    values.push({
      domain,
      matchMethod: match.method,
      sourceId: record.sourceId,
      sourceType: "official_directory",
      sourceUrl: record.sourceUrl,
      websiteUrl: record.website,
    });
    seeds.set(
      match.record.contractorId,
      deduplicateSeeds(values),
    );
  }
  return seeds;
}

async function prepareOsmRecords({
  cacheDirectory,
  fetchImpl,
  osmPbfPath,
  quiet,
}) {
  await fsPromises.mkdir(cacheDirectory, { recursive: true });
  const expectedMd5 = await fetchOsmMd5(fetchImpl);
  const pbfPath = path.resolve(
    osmPbfPath ||
      path.join(
        cacheDirectory,
        `california-${expectedMd5}.osm.pbf`,
      ),
  );
  let actualMd5 = "";
  try {
    actualMd5 = await hashFile(pbfPath, "md5");
  } catch {
    actualMd5 = "";
  }
  if (actualMd5 !== expectedMd5) {
    if (osmPbfPath && actualMd5) {
      throw new Error(
        `The supplied OpenStreetMap PBF does not match the current California extract MD5 ${expectedMd5}.`,
      );
    }
    if (!quiet) {
      console.log(
        `Downloading current California OpenStreetMap PBF to ${pbfPath}.`,
      );
    }
    await downloadWithCurl(OSM_URL, pbfPath);
    actualMd5 = await hashFile(pbfPath, "md5");
  }
  if (actualMd5 !== expectedMd5) {
    throw new Error(
      `OpenStreetMap MD5 mismatch: expected ${expectedMd5}, received ${actualMd5}.`,
    );
  }
  const stat = await fsPromises.stat(pbfPath);
  const cacheKey = `${actualMd5}-${stat.size}`;
  const filteredPath = path.join(
    cacheDirectory,
    `california-web-contacts-${cacheKey}.osm.pbf`,
  );
  const jsonSequencePath = path.join(
    cacheDirectory,
    `california-web-contacts-${cacheKey}.geojsonseq`,
  );
  if (!(await fileExists(jsonSequencePath))) {
    await assertCommand("osmium");
    if (!quiet) {
      console.log(
        "Filtering OpenStreetMap to records with website or email tags.",
      );
    }
    await execFileAsync(
      "osmium",
      [
        "tags-filter",
        pbfPath,
        "nwr/website",
        "nwr/contact:website",
        "nwr/url",
        "nwr/email",
        "nwr/contact:email",
        "--overwrite",
        "-o",
        filteredPath,
      ],
      { maxBuffer: 10_000_000 },
    );
    await execFileAsync(
      "osmium",
      [
        "export",
        filteredPath,
        "--overwrite",
        "-f",
        "geojsonseq",
        "-o",
        jsonSequencePath,
      ],
      { maxBuffer: 10_000_000 },
    );
  }
  return {
    jsonSequencePath,
    metadata: {
      sourceUrl: OSM_URL,
      md5Url: OSM_MD5_URL,
      md5: actualMd5,
      sizeBytes: stat.size,
      pbfFilename: path.basename(pbfPath),
      filteredArtifactSha256: await sha256File(jsonSequencePath),
      filteredArtifactSizeBytes: (
        await fsPromises.stat(jsonSequencePath)
      ).size,
    },
  };
}

async function matchOsmSeeds({
  allIdentities,
  osmJsonSequencePath,
}) {
  const indices = buildContractorIdentityIndices(allIdentities);
  const seeds = new Map();
  const counts = {
    recordsWithContactData: 0,
    exactMatches: 0,
    ambiguousMatches: 0,
    unmatchedRecords: 0,
    contractorMatchesWithUsableDomain: 0,
  };
  const lines = fs
    .createReadStream(osmJsonSequencePath)
    .setEncoding("utf8");
  let remainder = "";
  for await (const chunk of lines) {
    remainder += chunk;
    const values = remainder.split("\n");
    remainder = values.pop() || "";
    for (const line of values) {
      processOsmLine(line);
    }
  }
  if (remainder.trim()) processOsmLine(remainder);
  return { counts, seeds };

  function processOsmLine(line) {
    const cleanLine = line.replace(/^\u001e/, "").trim();
    if (!cleanLine) return;
    let feature;
    try {
      feature = JSON.parse(cleanLine);
    } catch {
      return;
    }
    const record = osmRecordFromProperties(feature.properties || {});
    if (!record.website && !record.email) return;
    counts.recordsWithContactData += 1;
    const match = matchOsmRecord({
      contractorIndices: indices,
      osmRecord: record,
    });
    if (match.status === "ambiguous") {
      counts.ambiguousMatches += 1;
      return;
    }
    if (match.status !== "matched") {
      counts.unmatchedRecords += 1;
      return;
    }
    counts.exactMatches += 1;
    const domains = [
      domainFromUrl(record.website),
      domainFromEmail(record.email),
    ].filter(Boolean);
    if (!domains.length) return;
    counts.contractorMatchesWithUsableDomain += 1;
    const values = seeds.get(match.identity.contractorId) || [];
    for (const domain of domains) {
      values.push({
        domain,
        matchMethod: match.method,
        osmType: feature.id?.[0] || "",
        sourceType: "openstreetmap",
        sourceUrl: "https://www.openstreetmap.org/",
      });
    }
    seeds.set(
      match.identity.contractorId,
      deduplicateSeeds(values),
    );
  }
}

function osmRecordFromProperties(properties) {
  const street = [
    properties["addr:housenumber"],
    properties["addr:street"],
  ]
    .map(clean)
    .filter(Boolean)
    .join(" ");
  return {
    name:
      clean(properties.name) ||
      clean(properties.operator) ||
      clean(properties.brand),
    phone:
      clean(properties.phone) ||
      clean(properties["contact:phone"]),
    city:
      clean(properties["addr:city"]) ||
      clean(properties["addr:place"]),
    postalCode: clean(properties["addr:postcode"]),
    streetAddress: street,
    website:
      clean(properties.website) ||
      clean(properties["contact:website"]) ||
      clean(properties.url),
    email:
      clean(properties.email) ||
      clean(properties["contact:email"]),
  };
}

async function loadCaliforniaPlaceReference({
  cacheDirectory,
  fetchImpl,
  now,
}) {
  const cachePath = path.join(
    cacheDirectory,
    "census-2025-california-places.json",
  );
  try {
    return JSON.parse(await fsPromises.readFile(cachePath, "utf8"));
  } catch {
    await fsPromises.mkdir(cacheDirectory, { recursive: true });
  }
  const [cityResponse, countyResponse] = await Promise.all([
    fetchImpl(CENSUS_CITY_URL, {
      headers: { "user-agent": USER_AGENT },
      signal: AbortSignal.timeout(30_000),
    }),
    fetchImpl(CENSUS_COUNTY_URL, {
      headers: { "user-agent": USER_AGENT },
      signal: AbortSignal.timeout(30_000),
    }),
  ]);
  if (!cityResponse.ok || !countyResponse.ok) {
    throw new Error("The official Census place reference was unavailable.");
  }
  const [cityText, countyText] = await Promise.all([
    cityResponse.text(),
    countyResponse.text(),
  ]);
  const cityRows = parsePipeDelimitedNames(cityText);
  const countyRows = parsePipeDelimitedNames(countyText);
  const value = {
    cities: cityRows
      .map((name) =>
        name.replace(/\s+(?:city|town|CDP)$/, ""),
      )
      .filter(Boolean)
      .sort(),
    counties: countyRows
      .filter(Boolean)
      .sort(),
    metadata: {
      source: "United States Census Bureau 2025 Gazetteer Files",
      cityUrl: CENSUS_CITY_URL,
      countyUrl: CENSUS_COUNTY_URL,
      citySha256: sha256Text(cityText),
      countySha256: sha256Text(countyText),
      retrievedAt: now().toISOString(),
    },
  };
  await writeJson(cachePath, value);
  return value;
}

function parsePipeDelimitedNames(value) {
  const lines = String(value || "")
    .split(/\r?\n/)
    .filter(Boolean);
  const headers = lines.shift()?.split("|").map(clean) || [];
  const nameIndex = headers.indexOf("NAME");
  if (nameIndex < 0) {
    throw new Error("The Census Gazetteer file has no NAME column.");
  }
  return lines
    .map((line) => clean(line.split("|")[nameIndex]))
    .filter(Boolean);
}

function assertProposalSafety({ contractors, proposals }) {
  const byId = new Map(
    contractors.map((contractor) => [
      contractor.contractorId,
      contractor,
    ]),
  );
  const allowedFields = new Set([
    "email",
    "enrichmentEvidence",
    "servesCommercial",
    "servesResidential",
    "serviceAreas",
  ]);
  for (const proposal of proposals) {
    const contractor = byId.get(proposal.contractorId);
    if (!contractor) {
      throw new Error(
        `Proposal references missing contractor ${proposal.contractorId}.`,
      );
    }
    for (const field of Object.keys(proposal.set)) {
      if (!allowedFields.has(field)) {
        throw new Error(
          `Proposal attempted to modify protected field ${field}.`,
        );
      }
      if (
        field !== "enrichmentEvidence" &&
        field !== "serviceAreas" &&
        contractor[field] !== undefined &&
        contractor[field] !== "" &&
        clean(contractor[field]).toUpperCase() !== "UNKNOWN"
      ) {
        throw new Error(
          `Proposal attempted to replace existing ${field} for ${proposal.contractorId}.`,
        );
      }
      if (
        field === "serviceAreas" &&
        Array.isArray(contractor.serviceAreas) &&
        contractor.serviceAreas.some(
          (value) => clean(value).toUpperCase() !== "UNKNOWN",
        )
      ) {
        throw new Error(
          `Proposal attempted to replace existing serviceAreas for ${proposal.contractorId}.`,
        );
      }
    }
  }
}

function buildReport({
  accountId,
  acceptedResults,
  audit,
  completedAt,
  contractors,
  mode,
  osmSeeds,
  processedThisInvocation,
  proposals,
  results,
  runId,
  scope,
  selectedIdentities,
  skippedStatusCounts,
  startedAt,
  statusCounts,
  usableContractors,
}) {
  const domainDispositionCounts = countBy(
    results,
    (result) => result.domainDisposition,
  );
  const attemptedDomainDispositionMap = new Map();
  const outcomeCountMap = new Map();
  const rejectedDomainExamples = [];
  let candidateDomainsAttempted = 0;
  let candidateDomainsWithoutDns = 0;
  let officialDirectoryDomainMatches = 0;
  for (const result of results) {
    if (
      result.discoveryMethod === "official_directory" &&
      result.domainDisposition === "VERIFIED_DOMAIN"
    ) {
      officialDirectoryDomainMatches += 1;
    }
    for (const outcome of result.outcomes || []) {
      outcomeCountMap.set(
        outcome,
        (outcomeCountMap.get(outcome) || 0) + 1,
      );
    }
    for (const attempt of result.attemptedDomains || []) {
      candidateDomainsAttempted += 1;
      attemptedDomainDispositionMap.set(
        attempt.disposition,
        (attemptedDomainDispositionMap.get(
          attempt.disposition,
        ) || 0) + 1,
      );
      if (attempt.reason === "dns_not_resolved") {
        candidateDomainsWithoutDns += 1;
      }
      if (
        rejectedDomainExamples.length < 10 &&
        attempt.disposition === "REJECTED_DOMAIN"
      ) {
        rejectedDomainExamples.push({
          contractorIdToken: result.contractorIdToken,
          domainToken: token(attempt.domain),
          reason: attempt.reason,
        });
      }
    }
  }
  const attemptedDomainDispositionCounts =
    sortedCountEntries(attemptedDomainDispositionMap);
  const unresolvedOutcomeCounts =
    sortedCountEntries(outcomeCountMap);
  const discoveryMethodCounts = countBy(
    acceptedResults,
    (result) => result.discoveryMethod || "<UNKNOWN>",
  );
  const confidenceTierCounts = countBy(
    acceptedResults,
    (result) =>
      result.confidenceTier ||
      result.identityVerification?.confidenceTier ||
      "<UNKNOWN>",
  );
  const fieldCountMap = new Map();
  let serviceAreaValuesFound = 0;
  for (const proposal of proposals) {
    serviceAreaValuesFound +=
      proposal.set.serviceAreas?.length || 0;
    for (const field of Object.keys(proposal.set)) {
      if (field === "enrichmentEvidence") continue;
      fieldCountMap.set(
        field,
        (fieldCountMap.get(field) || 0) + 1,
      );
    }
  }
  const fieldCounts = sortedCountEntries(fieldCountMap);
  const websitePagesCrawled = acceptedResults.reduce(
    (total, result) => total + (result.pages?.length || 0),
    0,
  );
  const summary = {
    liveContractorCount: contractors.length,
    usableContractorCount: usableContractors.length,
    skippedContractorCount:
      contractors.length - usableContractors.length,
    selectedContractorCount: selectedIdentities.length,
    processedContractorCount: results.length,
    processedThisInvocation,
    officialDirectoryDomainMatches,
    openStreetMapMatches:
      osmSeeds.counts.selectedContractorMatches,
    verifiedDomains: acceptedResults.length,
    ambiguousDomains:
      attemptedDomainDispositionCounts.AMBIGUOUS_DOMAIN || 0,
    rejectedDomains:
      attemptedDomainDispositionCounts.REJECTED_DOMAIN || 0,
    noDomainCandidates:
      domainDispositionCounts.NO_DOMAIN_CANDIDATE || 0,
    contractorsWithoutVerifiedDomains:
      domainDispositionCounts.NO_VERIFIED_DOMAIN || 0,
    websitesUnreachable:
      domainDispositionCounts.WEBSITE_UNREACHABLE || 0,
    candidateDomainsAttempted,
    candidateDomainsWithoutDns,
    websitesCrawled: acceptedResults.length,
    websitePagesCrawled,
    emailsFound: fieldCounts.email || 0,
    commercialIndicatorsFound:
      fieldCounts.servesCommercial || 0,
    residentialIndicatorsFound:
      fieldCounts.servesResidential || 0,
    serviceAreasFound: fieldCounts.serviceAreas || 0,
    serviceAreaValuesFound,
    licenseTransitionCases:
      domainDispositionCounts.LICENSE_TRANSITION_REVIEW || 0,
    contractorProposals: proposals.length,
    coverage: {
      verifiedDomainRate: divide(
        acceptedResults.length,
        results.length,
      ),
      emailRate: divide(fieldCounts.email || 0, results.length),
      commercialRate: divide(
        fieldCounts.servesCommercial || 0,
        results.length,
      ),
      residentialRate: divide(
        fieldCounts.servesResidential || 0,
        results.length,
      ),
      serviceAreaRate: divide(
        fieldCounts.serviceAreas || 0,
        results.length,
      ),
    },
    pilotAuditPrecision: audit.verifiedDomainPrecision,
    pilotAuditSampleSize: audit.sampleSize,
    pilotGateStatus: audit.gate.status,
    runtimeSeconds: Math.max(
      0,
      Math.round(
        (Date.parse(completedAt) - Date.parse(startedAt)) /
          1_000,
      ),
    ),
    dynamodbUpdatesApplied: 0,
  };
  return {
    schemaVersion: WEB_ENRICHMENT_REPORT_SCHEMA_VERSION,
    runId,
    scope,
    mode,
    startedAt,
    completedAt,
    accountId,
    usableStatusRule:
      "licenseStatus must equal CLEAR exactly and supportedRetrofitIds must be nonempty",
    statusCounts,
    skippedStatusCounts,
    pilotStrata: pilotStrataSummary(selectedIdentities),
    openStreetMap: osmSeeds.counts,
    domainDispositionCounts,
    attemptedDomainDispositionCounts,
    verifiedDomainDiscoveryMethodCounts: discoveryMethodCounts,
    verifiedDomainConfidenceTierCounts: confidenceTierCounts,
    proposalFieldCounts: fieldCounts,
    unresolvedOutcomeCounts,
    summary,
    audit: {
      acceptedDomainCount: audit.acceptedDomainCount,
      sampleSize: audit.sampleSize,
      sampleRequirementMet: audit.sampleRequirementMet,
      verifiedDomainPrecision: audit.verifiedDomainPrecision,
      fieldPrecision: audit.fieldPrecision,
      verdictCounts: audit.verdictCounts,
      gate: audit.gate,
    },
    deepModeBenefitEstimate: {
      available: false,
      reason:
        "Deep mode was not run. Incremental benefit must be measured on a reviewed follow-up pilot.",
    },
    sanitizedExamples: {
      verifiedDomains: acceptedResults.slice(0, 10).map(sanitizeResult),
      ambiguousDomains: firstSanitizedResults(
        results,
        (result) =>
          result.domainDisposition === "AMBIGUOUS_DOMAIN",
      ),
      rejectedDomains: rejectedDomainExamples,
      noDomainCandidate: firstSanitizedResults(
        results,
        (result) =>
          result.domainDisposition ===
          "NO_DOMAIN_CANDIDATE",
      ),
      proposals: firstSanitizedResults(
        results,
        (result) =>
          Object.keys(result.proposal || {}).length > 0,
      ),
      noVerifiedDomain: firstSanitizedResults(
        results,
        (result) =>
          result.domainDisposition === "NO_VERIFIED_DOMAIN",
      ),
      websiteUnreachable: firstSanitizedResults(
        results,
        (result) =>
          result.domainDisposition === "WEBSITE_UNREACHABLE",
      ),
      byOutcome: sanitizedOutcomeExamples(results),
    },
    invariants: {
      dynamodbWriteCount: 0,
      newContractorRows: 0,
      protectedFieldsModified: false,
      existingEnrichmentFieldsReplaced: false,
      fullStatewideRunExecuted: scope === "full",
      fullStatewideWriteExecuted: false,
    },
    awsWriteCount: 0,
    dynamodbWriteCount: 0,
  };
}

async function writeRunArtifacts({
  audit,
  licenseTransitionReview,
  manifestBase,
  outputDirectory,
  proposals,
  rawEvidence,
  report,
  reviewQueue,
  results,
  runId,
  unresolved,
  validation,
}) {
  const paths = {
    audit: path.join(outputDirectory, "audit.json"),
    licenseTransitionReview: path.join(
      outputDirectory,
      "license-transition-review.jsonl",
    ),
    manifest: path.join(outputDirectory, "manifest.json"),
    proposals: path.join(outputDirectory, "proposals.jsonl"),
    rawEvidence: path.join(outputDirectory, "raw-evidence.jsonl"),
    report: path.join(outputDirectory, "report.json"),
    reviewQueue: path.join(outputDirectory, "review-queue.jsonl"),
    results: path.join(outputDirectory, "results.jsonl"),
    unresolved: path.join(outputDirectory, "unresolved.jsonl"),
    validation: path.join(outputDirectory, "validation.json"),
  };
  await writeJsonLines(paths.proposals, proposals);
  await writeJsonLines(paths.rawEvidence, rawEvidence);
  await writeJsonLines(paths.reviewQueue, reviewQueue);
  await writeJsonLines(
    paths.licenseTransitionReview,
    licenseTransitionReview,
  );
  await writeJsonLines(paths.unresolved, unresolved);
  await writeJsonLines(paths.results, results);
  await writeJson(paths.audit, audit);
  await writeJson(paths.report, report);
  await writeJson(paths.validation, validation);
  const hashes = {};
  for (const [name, filePath] of Object.entries(paths)) {
    if (name === "manifest") continue;
    hashes[name] = {
      sha256: await sha256File(filePath),
      sizeBytes: (await fsPromises.stat(filePath)).size,
    };
  }
  const s3Keys = {
    audit: `imports/web-enrichment/${runId}/audit.json`,
    licenseTransitionReview:
      `raw/web-enrichment/${runId}/license-transition-review.jsonl`,
    manifest: `imports/web-enrichment/${runId}/manifest.json`,
    proposals: `imports/web-enrichment/${runId}/proposals.jsonl`,
    rawEvidence: `raw/web-enrichment/${runId}/evidence.jsonl`,
    report: `imports/web-enrichment/${runId}/report.json`,
    reviewQueue: `raw/web-enrichment/${runId}/review-queue.jsonl`,
    results: `raw/web-enrichment/${runId}/outcomes.jsonl`,
    unresolved: `raw/web-enrichment/${runId}/unresolved.jsonl`,
    validation: `imports/web-enrichment/${runId}/validation.json`,
  };
  const manifest = {
    ...manifestBase,
    artifactHashes: hashes,
    s3Keys,
  };
  await writeJson(paths.manifest, manifest);
  return {
    audit,
    manifest,
    paths,
    report,
    s3Keys,
  };
}

async function uploadRunArtifacts({
  artifacts,
  s3,
}) {
  const uploads = [
    ["manifest", "application/json"],
    ["proposals", "application/x-ndjson"],
    ["report", "application/json"],
    ["audit", "application/json"],
    ["validation", "application/json"],
    ["rawEvidence", "application/x-ndjson"],
    ["results", "application/x-ndjson"],
    ["reviewQueue", "application/x-ndjson"],
    ["licenseTransitionReview", "application/x-ndjson"],
    ["unresolved", "application/x-ndjson"],
  ];
  let count = 0;
  for (const [name, contentType] of uploads) {
    const localPath = artifacts.paths[name];
    const stat = await fsPromises.stat(localPath);
    await uploadFileIdempotent({
      contentType,
      key: artifacts.s3Keys[name],
      localPath,
      s3,
      sizeBytes: stat.size,
    });
    count += 1;
  }
  return count;
}

async function uploadFileIdempotent({
  contentType,
  key,
  localPath,
  s3,
  sizeBytes,
}) {
  const sha256 = await sha256File(localPath);
  const checksum = Buffer.from(sha256, "hex").toString("base64");
  try {
    const existing = await s3.send(
      new HeadObjectCommand({
        Bucket: CONTRACTOR_SOURCE_BUCKET,
        Key: key,
        ChecksumMode: "ENABLED",
      }),
    );
    if (
      Number(existing.ContentLength) === Number(sizeBytes) &&
      existing.ChecksumSHA256 === checksum
    ) {
      return;
    }
    throw new Error(
      `Refusing to replace different pilot artifact s3://${CONTRACTOR_SOURCE_BUCKET}/${key}.`,
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
      Bucket: CONTRACTOR_SOURCE_BUCKET,
      Key: key,
      Body: fs.createReadStream(localPath),
      ContentLength: sizeBytes,
      ContentType: contentType,
      ChecksumSHA256: checksum,
      IfNoneMatch: "*",
    }),
  );
  const uploaded = await s3.send(
    new HeadObjectCommand({
      Bucket: CONTRACTOR_SOURCE_BUCKET,
      ChecksumMode: "ENABLED",
      Key: key,
    }),
  );
  if (
    Number(uploaded.ContentLength) !== Number(sizeBytes) ||
    uploaded.ChecksumSHA256 !== checksum
  ) {
    throw new Error(
      `Uploaded artifact verification failed for s3://${CONTRACTOR_SOURCE_BUCKET}/${key}.`,
    );
  }
}

function createJsonLinesAppender(filePath, { truncate }) {
  const stream = fs.createWriteStream(filePath, {
    flags: truncate ? "w" : "a",
  });
  let queue = Promise.resolve();
  let closed = false;
  let closePromise;
  let streamError;
  stream.on("error", (error) => {
    streamError ||= error;
  });
  return {
    append(value) {
      if (closed) {
        return Promise.reject(
          new Error(
            `Cannot append to closed result file ${filePath}.`,
          ),
        );
      }
      queue = queue.then(async () => {
        if (streamError) throw streamError;
        if (!stream.write(`${JSON.stringify(value)}\n`)) {
          await once(stream, "drain");
        }
        if (streamError) throw streamError;
      });
      return queue;
    },
    close() {
      if (closePromise) return closePromise;
      closed = true;
      closePromise = (async () => {
        await queue;
        if (streamError) throw streamError;
        const finished = once(stream, "finish");
        stream.end();
        await finished;
        if (streamError) throw streamError;
      })();
      return closePromise;
    },
    flush() {
      if (!closed) {
        queue = queue.then(async () => {
          if (streamError) throw streamError;
          await new Promise((resolve, reject) => {
            stream.write("", (error) => {
              if (error) reject(error);
              else resolve();
            });
          });
          if (streamError) throw streamError;
        });
      }
      return queue.then(() => {
        if (streamError) throw streamError;
      });
    },
  };
}

function sanitizeResult(result) {
  return {
    contractorIdToken: result.contractorIdToken,
    domainToken: result.domain ? token(result.domain) : "",
    domainDisposition: result.domainDisposition,
    discoveryMethod: result.discoveryMethod,
    outcomes: result.outcomes,
    proposedFields: Object.keys(result.proposal || {})
      .filter((field) => field !== "enrichmentEvidence")
      .sort(),
  };
}

function sanitizedOutcomeExamples(results) {
  const examples = new Map();
  for (const result of results) {
    for (const outcome of result.outcomes || []) {
      const values = examples.get(outcome) || [];
      if (values.length < 5) {
        values.push(sanitizeResult(result));
        examples.set(outcome, values);
      }
    }
  }
  return Object.fromEntries(
    [...examples].sort(([left], [right]) =>
      left.localeCompare(right),
    ),
  );
}

function firstSanitizedResults(
  results,
  predicate,
  limit = 10,
) {
  const values = [];
  for (const result of results) {
    if (!predicate(result)) continue;
    values.push(sanitizeResult(result));
    if (values.length >= limit) break;
  }
  return values;
}

function normalizeResultForArtifacts(result) {
  const attemptedDomain = result.domain;
  const canonicalDomain =
    domainFromUrl(result.pages?.[0]?.url) || attemptedDomain;
  if (canonicalDomain && canonicalDomain !== attemptedDomain) {
    result = {
      ...result,
      domain: canonicalDomain,
    };
  }
  const signals = result.identityVerification?.signals;
  if (
    result.domainDisposition === "VERIFIED_DOMAIN" &&
    signals &&
    !finalIdentityPolicyAccepts(signals)
  ) {
    return {
      ...result,
      attemptedDomains: (result.attemptedDomains || []).map(
        (attempt) =>
          attempt.domain === attemptedDomain &&
          attempt.disposition === "VERIFIED_DOMAIN"
            ? {
                ...attempt,
                disposition: "AMBIGUOUS_DOMAIN",
                reason: "final_identity_policy_not_met",
              }
            : attempt,
      ),
      domainDisposition: "AMBIGUOUS_DOMAIN",
      identityVerification: {
        ...result.identityVerification,
        accepted: false,
        ambiguous: true,
        disposition: "AMBIGUOUS_DOMAIN",
      },
      outcomes: ["NO_VERIFIED_DOMAIN"],
      proposal: {},
      reason: "final_identity_policy_not_met",
    };
  }
  const proposal = result.proposal || {};
  if (!Array.isArray(proposal.enrichmentEvidence)) {
    return result;
  }
  const normalizedEvidence = proposal.enrichmentEvidence.map(
    (entry) => {
      if (
        entry.matchingMethod !==
        "verified_first_party_domain"
      ) {
        return entry;
      }
      const { matchingMethod, ...rest } = entry;
      return {
        ...rest,
        matchMethod: matchingMethod,
        sourceId:
          entry.sourceId ||
          "first_party_contractor_website",
        verificationDate:
          entry.verificationDate ||
          String(entry.retrievedAt || "").slice(0, 10),
      };
    },
  );
  let finalProposal = {
    ...proposal,
    enrichmentEvidence: [
      ...new Map(
        normalizedEvidence.map((entry) => [
          [
            entry.sourceId || "",
            entry.sourceName || "",
            entry.sourceUrl || "",
            entry.field || "",
            entry.matchMethod || entry.matchingMethod || "",
            entry.sourceValue || "",
            entry.supportingTextSnippet || "",
            entry.verificationDate || entry.retrievedAt || "",
          ].join("|"),
          entry,
        ]),
      ).values(),
    ],
  };
  let normalizedOutcomes = [...(result.outcomes || [])];
  if (
    finalProposal.email &&
    !isAcceptableEmail(finalProposal.email, result.domain)
  ) {
    delete finalProposal.email;
    finalProposal.enrichmentEvidence =
      finalProposal.enrichmentEvidence.filter(
        (entry) =>
          !(
            entry.field === "email" &&
            (entry.matchMethod || entry.matchingMethod) ===
              "verified_first_party_domain"
          ),
      );
    normalizedOutcomes = [
      ...new Set([
        ...normalizedOutcomes.filter(
          (outcome) => outcome !== "FOUND_EMAIL",
        ),
        "VERIFIED_DOMAIN_NO_EMAIL",
        "EMAIL_NOT_PUBLISHED",
      ]),
    ];
  }
  const originalProposedFields = new Set(
    Object.keys(finalProposal).filter(
      (field) => field !== "enrichmentEvidence",
    ),
  );
  const checks = fieldEvidenceChecks({
    ...result,
    proposal: finalProposal,
  });
  const unsupportedFields = [
    "email",
    "servesCommercial",
    "servesResidential",
    "serviceAreas",
  ].filter(
    (field) =>
      Object.hasOwn(finalProposal, field) &&
      checks[field] !== true,
  );
  for (const field of unsupportedFields) {
    delete finalProposal[field];
  }
  if (unsupportedFields.length) {
    finalProposal.enrichmentEvidence =
      finalProposal.enrichmentEvidence.filter(
        (entry) =>
          !(
            unsupportedFields.includes(entry.field) &&
            (entry.matchMethod || entry.matchingMethod) ===
              "verified_first_party_domain"
          ),
      );
  }
  if (
    unsupportedFields.includes("email") ||
    (originalProposedFields.has("email") &&
      !Object.hasOwn(finalProposal, "email"))
  ) {
    normalizedOutcomes = [
      ...new Set([
        ...normalizedOutcomes.filter(
          (outcome) => outcome !== "FOUND_EMAIL",
        ),
        "VERIFIED_DOMAIN_NO_EMAIL",
        "EMAIL_NOT_PUBLISHED",
      ]),
    ];
  }
  if (
    (unsupportedFields.includes("servesCommercial") ||
      unsupportedFields.includes("servesResidential")) &&
    !Object.hasOwn(finalProposal, "servesCommercial") &&
    !Object.hasOwn(finalProposal, "servesResidential")
  ) {
    normalizedOutcomes = [
      ...new Set([
        ...normalizedOutcomes,
        "CUSTOMER_TYPE_NOT_STATED",
      ]),
    ];
  }
  if (unsupportedFields.includes("serviceAreas")) {
    normalizedOutcomes = [
      ...new Set([
        ...normalizedOutcomes,
        "SERVICE_AREA_NOT_STATED",
      ]),
    ];
  }
  if (
    !Object.keys(finalProposal).some(
      (field) => field !== "enrichmentEvidence",
    )
  ) {
    finalProposal = {};
  }
  return {
    ...result,
    outcomes: normalizedOutcomes,
    proposal: finalProposal,
  };
}

function buildSkippedResult(contractor) {
  return {
    contractorId: contractor.contractorId,
    contractorIdToken: token(contractor.contractorId),
    discoveryMethod: "",
    domainDisposition: "SKIPPED_LICENSE_STATUS",
    licenseStatus: contractor.licenseStatus || "",
    outcomes: ["SKIPPED_LICENSE_STATUS"],
    proposal: {},
    skipReason:
      contractor.licenseStatus !== "CLEAR"
        ? "license_status_not_clear"
        : "no_supported_retrofit_ids",
  };
}

function buildUnprocessedResult(identity) {
  return {
    contractorId: identity.contractorId,
    contractorIdToken: token(identity.contractorId),
    discoveryMethod: "",
    domainDisposition: "NOT_PROCESSED_TIME_LIMIT",
    outcomes: ["NOT_PROCESSED_TIME_LIMIT"],
    proposal: {},
  };
}

function buildStatewideReviewQueue({
  results,
  seed,
}) {
  const strata = new Map();
  for (const result of results) {
    if (result.domainDisposition !== "VERIFIED_DOMAIN") continue;
    const names = [
      `discovery:${result.discoveryMethod || "unknown"}`,
      `tier:${result.confidenceTier || result.identityVerification?.confidenceTier || "unknown"}`,
    ];
    for (const field of Object.keys(result.proposal || {})) {
      if (field !== "enrichmentEvidence") {
        names.push(`field:${field}`);
      }
    }
    for (const name of names) {
      const values = strata.get(name) || [];
      values.push(result);
      strata.set(name, values);
    }
  }
  const selected = new Map();
  for (const [stratum, values] of strata) {
    const ordered = [...values].sort((left, right) =>
      sha256Text(`${seed}|${stratum}|${left.contractorId}`).localeCompare(
        sha256Text(`${seed}|${stratum}|${right.contractorId}`),
      ),
    );
    for (const result of ordered.slice(0, 100)) {
      const key = `${result.contractorId}|${result.domain}`;
      const evidenceChecks = fieldEvidenceChecks(result);
      const proposedFields = Object.keys(result.proposal || {})
        .filter((field) => field !== "enrichmentEvidence")
        .sort();
      const existing = selected.get(key) || {
        automatedAuditVerdict: proposedFields.every(
          (field) => evidenceChecks[field] === true,
        )
          ? "CORRECT"
          : "INCONCLUSIVE",
        confidenceTier:
          result.confidenceTier ||
          result.identityVerification?.confidenceTier ||
          "",
        contractorId: result.contractorId,
        contractorIdToken: result.contractorIdToken,
        discoveryMethod: result.discoveryMethod,
        domain: result.domain,
        evidenceChecks,
        identityVerification: result.identityVerification,
        pagesReviewed: result.pages || [],
        proposedFields,
        reviewStrata: [],
      };
      existing.reviewStrata.push(stratum);
      selected.set(key, existing);
    }
  }
  return [...selected.values()]
    .map((entry) => ({
      ...entry,
      reviewStrata: [...new Set(entry.reviewStrata)].sort(),
    }))
    .sort(
      (left, right) =>
        left.contractorId.localeCompare(right.contractorId) ||
        left.domain.localeCompare(right.domain),
    );
}

function buildLicenseTransitionReview(results) {
  const values = [];
  for (const result of results) {
    if (
      result.domainDisposition ===
      "LICENSE_TRANSITION_REVIEW"
    ) {
      values.push({
        contractorId: result.contractorId,
        contractorIdToken: result.contractorIdToken,
        databaseLicenseNumber:
          result.identityVerification?.databaseLicenseNumber || "",
        discoveryMethod: result.discoveryMethod,
        domain: result.domain,
        identityVerification: result.identityVerification,
        websiteLicenseNumbers:
          result.identityVerification?.websiteLicenseNumbers || [],
      });
    }
    for (const attempt of result.attemptedDomains || []) {
      if (
        attempt.disposition !==
        "LICENSE_TRANSITION_REVIEW"
      ) {
        continue;
      }
      values.push({
        contractorId: result.contractorId,
        contractorIdToken: result.contractorIdToken,
        databaseLicenseNumber:
          attempt.databaseLicenseNumber || "",
        discoveryMethod: "",
        domain: attempt.domain,
        websiteLicenseNumbers:
          attempt.websiteLicenseNumbers || [],
      });
    }
  }
  return [
    ...new Map(
      values.map((value) => [
        `${value.contractorId}|${value.domain}|${value.websiteLicenseNumbers.join(",")}`,
        value,
      ]),
    ).values(),
  ].sort(
    (left, right) =>
      left.contractorId.localeCompare(right.contractorId) ||
      left.domain.localeCompare(right.domain),
  );
}

function buildUnresolvedRecords({
  identities,
  resultsById,
}) {
  const records = [];
  for (const identity of identities) {
    const result = resultsById.get(identity.contractorId);
    const unresolvedFields = identity.fieldsNeeded.filter(
      (field) =>
        !Object.hasOwn(result?.proposal || {}, field),
    );
    if (
      !unresolvedFields.length &&
      result?.domainDisposition === "VERIFIED_DOMAIN"
    ) {
      continue;
    }
    records.push({
      attemptedDomainCount:
        result?.attemptedDomainCount || 0,
      contractorId: identity.contractorId,
      contractorIdToken: token(identity.contractorId),
      domainDisposition:
        result?.domainDisposition || "NOT_PROCESSED_TIME_LIMIT",
      outcomes: result?.outcomes || ["NOT_PROCESSED_TIME_LIMIT"],
      unresolvedFields,
    });
  }
  return records;
}

function validateFinalArtifacts({
  contractors,
  eligibleResults,
  fullScope,
  licenseTransitionReview,
  proposals,
  results,
}) {
  const failures = [];
  const eligibleResultsById = new Map(
    eligibleResults.map((result) => [
      result.contractorId,
      result,
    ]),
  );
  const recordFailure = (condition, message) => {
    if (!condition) failures.push(message);
  };
  recordFailure(
    !fullScope || results.length === contractors.length,
    "outcome accounting does not include every live contractor",
  );
  recordFailure(
    new Set(results.map((result) => result.contractorId)).size ===
      results.length,
    "duplicate contractor outcomes",
  );
  recordFailure(
    new Set(proposals.map((proposal) => proposal.contractorId)).size ===
      proposals.length,
    "duplicate contractor proposals",
  );
  const allowedFields = new Set([
    "email",
    "enrichmentEvidence",
    "servesCommercial",
    "servesResidential",
    "serviceAreas",
  ]);
  for (const proposal of proposals) {
    for (const field of Object.keys(proposal.set)) {
      recordFailure(
        allowedFields.has(field),
        `protected proposal field ${field}`,
      );
    }
    if (proposal.set.email) {
      recordFailure(
        isAcceptableEmail(
          proposal.set.email,
          proposal.verifiedDomain,
        ),
        `malformed email for ${proposal.contractorId}`,
      );
    }
    if (proposal.set.serviceAreas) {
      recordFailure(
        new Set(proposal.set.serviceAreas).size ===
          proposal.set.serviceAreas.length,
        `duplicate service area for ${proposal.contractorId}`,
      );
    }
    const evidence = proposal.set.enrichmentEvidence || [];
    const evidenceKeys = evidence.map((entry) =>
      [
        entry.sourceId || "",
        entry.sourceUrl || "",
        entry.field || "",
        entry.matchMethod || entry.matchingMethod || "",
        entry.sourceValue || "",
        entry.supportingTextSnippet || "",
      ].join("|"),
    );
    recordFailure(
      new Set(evidenceKeys).size === evidenceKeys.length,
      `duplicate evidence for ${proposal.contractorId}`,
    );
    const result = eligibleResultsById.get(
      proposal.contractorId,
    );
    const checks = fieldEvidenceChecks(result);
    for (const field of Object.keys(proposal.set)) {
      if (field === "enrichmentEvidence") continue;
      recordFailure(
        checks[field] === true,
        `missing field evidence for ${proposal.contractorId} ${field}`,
      );
    }
  }
  for (const result of eligibleResults) {
    const reviewedTransition =
      reviewedLicenseTransitionFor({
        domain: result.domain,
        licenseNumber:
          result.identityVerification?.databaseLicenseNumber,
      });
    recordFailure(
      !reviewedTransition ||
        result.domainDisposition ===
          "LICENSE_TRANSITION_REVIEW",
      `reviewed license transition escaped quarantine ${result.contractorId}`,
    );
    if (result.domainDisposition === "VERIFIED_DOMAIN") {
      recordFailure(
        [
          "TIER_A_EXACT_LICENSE",
          "TIER_B_PHONE_AND_NAME",
          "TIER_C_NAME_LOCATION_TRADE",
        ].includes(
          result.confidenceTier ||
            result.identityVerification?.confidenceTier,
        ),
        `historical-seed-only domain ${result.contractorId}`,
      );
    }
    if (
      result.domainDisposition ===
      "LICENSE_TRANSITION_REVIEW"
    ) {
      recordFailure(
        Object.keys(result.proposal || {}).length === 0,
        `license transition produced proposal ${result.contractorId}`,
      );
    }
  }
  recordFailure(
    licenseTransitionReview.every(
      (entry) =>
        entry.databaseLicenseNumber &&
        entry.websiteLicenseNumbers.length,
    ),
    "incomplete license-transition review record",
  );
  if (failures.length) {
    throw new Error(
      `Final contractor web-enrichment validation failed: ${failures
        .slice(0, 20)
        .join("; ")}`,
    );
  }
  const eligibleRemaining = eligibleResults.filter(
    (result) =>
      result.domainDisposition === "NOT_PROCESSED_TIME_LIMIT",
  ).length;
  return {
    schemaVersion: "contractor-web-enrichment-validation.v1",
    status: eligibleRemaining ? "PARTIAL" : "PASS",
    checkedAt: new Date().toISOString(),
    checks: {
      allLiveContractorsAccountedFor: true,
      duplicateContractorOutcomes: 0,
      duplicateContractorProposals: 0,
      duplicateEvidenceValues: 0,
      duplicateServiceAreaValues: 0,
      historicalSeedOnlyAcceptedDomains: 0,
      licenseTransitionProposals: 0,
      malformedEmails: 0,
      protectedFieldProposals: 0,
      proposalsMissingFieldEvidence: 0,
    },
    counts: {
      eligibleContractors: eligibleResults.length,
      eligibleRemaining,
      licenseTransitionCases: licenseTransitionReview.length,
      liveContractors: contractors.length,
      proposals: proposals.length,
    },
    invariants: {
      certificationsModified: false,
      dynamodbWrites: 0,
      existingSubstantiveValuesReplaced: false,
      programMembershipsModified: false,
      supportedRetrofitIdsModified: false,
    },
    failures: [],
  };
}

function finalIdentityPolicyAccepts(signals) {
  return Boolean(
    !signals.conflictingLicense &&
      !signals.parkedOrUnrelated &&
      !signals.conflictingPhoneAndAddress &&
      !signals.substantiallyConflictingGeography &&
      !signals.clearlyUnrelatedBusinessType &&
      [
        "TIER_A_EXACT_LICENSE",
        "TIER_B_PHONE_AND_NAME",
        "TIER_C_NAME_LOCATION_TRADE",
      ].includes(signals.confidenceTier),
  );
}

function filterSeedMap(source, selectedIds) {
  return new Map(
    [...source].filter(([contractorId]) =>
      selectedIds.has(contractorId),
    ),
  );
}

function mergeSeedMaps(...maps) {
  const result = new Map();
  for (const map of maps) {
    for (const [contractorId, seeds] of map) {
      result.set(
        contractorId,
        deduplicateSeeds([
          ...(result.get(contractorId) || []),
          ...seeds,
        ]),
      );
    }
  }
  return result;
}

function deduplicateSeeds(values) {
  return [
    ...new Map(
      values.map((value) => [
        `${value.sourceType}|${value.domain}`,
        value,
      ]),
    ).values(),
  ].sort(
    (left, right) =>
      seedPriority(left) - seedPriority(right) ||
      left.domain.localeCompare(right.domain),
  );
}

function seedPriority(seed) {
  if (seed.sourceType === "official_directory") return 0;
  if (seed.sourceType === "openstreetmap") return 1;
  return 2;
}

function countBy(values, keyFor) {
  const counts = new Map();
  for (const value of values) {
    const key = keyFor(value);
    counts.set(key, (counts.get(key) || 0) + 1);
  }
  return sortedCountEntries(counts);
}

function sortedCountEntries(counts) {
  return Object.fromEntries(
    [...counts].sort(
      (left, right) =>
        right[1] - left[1] ||
        String(left[0]).localeCompare(String(right[0])),
    ),
  );
}

async function fetchOsmMd5(fetchImpl) {
  const response = await fetchImpl(OSM_MD5_URL, {
    headers: { "user-agent": USER_AGENT },
    signal: AbortSignal.timeout(30_000),
  });
  if (!response.ok) {
    throw new Error(`Unable to read ${OSM_MD5_URL}.`);
  }
  const value = (await response.text()).match(/\b[a-f0-9]{32}\b/i)?.[0];
  if (!value) throw new Error("The OpenStreetMap MD5 file was invalid.");
  return value.toLowerCase();
}

async function downloadWithCurl(url, destination) {
  await fsPromises.mkdir(path.dirname(destination), {
    recursive: true,
  });
  await new Promise((resolve, reject) => {
    const child = spawn(
      "curl",
      [
        "--fail",
        "--location",
        "--continue-at",
        "-",
        "--output",
        destination,
        url,
      ],
      { stdio: "inherit" },
    );
    child.once("error", reject);
    child.once("exit", (code) => {
      if (code === 0) resolve();
      else reject(new Error(`curl exited with code ${code}.`));
    });
  });
}

async function assertCommand(command) {
  try {
    await execFileAsync(command, ["--version"]);
  } catch {
    throw new Error(
      `${command} is required. On macOS install it with: brew install osmium-tool`,
    );
  }
}

async function readS3Json(s3, key) {
  const response = await s3.send(
    new GetObjectCommand({
      Bucket: CONTRACTOR_SOURCE_BUCKET,
      Key: key,
    }),
  );
  return JSON.parse(await response.Body.transformToString());
}

async function readJsonLines(filePath) {
  try {
    return (await fsPromises.readFile(filePath, "utf8"))
      .split("\n")
      .filter(Boolean)
      .map((line) => JSON.parse(line));
  } catch (error) {
    if (error?.code === "ENOENT") return [];
    throw error;
  }
}

async function readContractorIds(filePath) {
  if (!filePath) return new Set();
  const contents = await fsPromises.readFile(
    path.resolve(filePath),
    "utf8",
  );
  try {
    const parsed = JSON.parse(contents);
    const values = Array.isArray(parsed)
      ? parsed
      : parsed.contractorIds || parsed.entries || [];
    return new Set(
      values
        .map((value) =>
          typeof value === "string"
            ? value
            : value?.contractorId,
        )
        .filter(Boolean),
    );
  } catch {
    return new Set(
      contents
        .split("\n")
        .filter(Boolean)
        .map((line) => JSON.parse(line))
        .map((value) => value.contractorId)
        .filter(Boolean),
    );
  }
}

async function nextCheckpointSequence(outputDirectory) {
  const directory = path.join(outputDirectory, "checkpoints");
  try {
    const names = await fsPromises.readdir(directory);
    const sequences = names
      .map((name) => Number.parseInt(name.match(/^(\d+)\.json$/)?.[1], 10))
      .filter(Number.isInteger);
    return sequences.length ? Math.max(...sequences) + 1 : 0;
  } catch (error) {
    if (error?.code === "ENOENT") return 0;
    throw error;
  }
}

async function writeCheckpointSnapshot({
  completedContractorCount,
  deepPassProcessed = 0,
  outputDirectory,
  phase,
  runId,
  runState,
  s3,
  selectedContractorIds,
  sequence,
  totalContractorCount,
  upload,
}) {
  const sequenceName = String(sequence).padStart(6, "0");
  const localPath = path.join(
    outputDirectory,
    "checkpoints",
    `${sequenceName}.json`,
  );
  const payload = {
    schemaVersion: "contractor-web-enrichment-checkpoint.v1",
    runId,
    sequence,
    phase,
    createdAt: new Date().toISOString(),
    completedContractorCount,
    totalContractorCount,
    remainingContractorCount: Math.max(
      0,
      totalContractorCount - completedContractorCount,
    ),
    deepPassProcessed,
    caches: {
      dnsEntries: runState.dnsCache.size,
      domainCrawlEntries: runState.domainCrawlCache.size,
      domainVerificationEntries:
        runState.verificationCache.size,
      robotsEntries: runState.robotsCache.size,
    },
    requestMetrics: runState.requestMetrics.snapshot(),
    ...(selectedContractorIds
      ? {
          selectedContractorHash: sha256Text(
            selectedContractorIds.join("\n"),
          ),
          selectedContractorIds,
        }
      : {}),
  };
  await writeJson(localPath, payload);
  const s3Key =
    `imports/web-enrichment/${runId}/checkpoints/${sequenceName}.json`;
  if (upload) {
    const stat = await fsPromises.stat(localPath);
    await uploadFileIdempotent({
      contentType: "application/json",
      key: s3Key,
      localPath,
      s3,
      sizeBytes: stat.size,
    });
  }
  return { localPath, s3Key };
}

async function writeJsonLines(filePath, values) {
  await fsPromises.mkdir(path.dirname(filePath), {
    recursive: true,
  });
  const stream = fs.createWriteStream(filePath);
  try {
    for (const value of values) {
      if (!stream.write(`${JSON.stringify(value)}\n`)) {
        await once(stream, "drain");
      }
    }
    stream.end();
    await once(stream, "finish");
  } catch (error) {
    stream.destroy();
    throw error;
  }
}

async function writeJson(filePath, value) {
  await fsPromises.mkdir(path.dirname(filePath), {
    recursive: true,
  });
  await fsPromises.writeFile(
    filePath,
    `${JSON.stringify(value, null, 2)}\n`,
  );
}

async function sha256File(filePath) {
  return hashFile(filePath, "sha256");
}

async function hashFile(filePath, algorithm) {
  const hash = crypto.createHash(algorithm);
  for await (const chunk of fs.createReadStream(filePath)) {
    hash.update(chunk);
  }
  return hash.digest("hex");
}

function sha256Text(value) {
  return crypto
    .createHash("sha256")
    .update(String(value || ""))
    .digest("hex");
}

async function fileExists(filePath) {
  try {
    return (await fsPromises.stat(filePath)).isFile();
  } catch {
    return false;
  }
}

function divide(numerator, denominator) {
  return denominator
    ? Math.round((numerator / denominator) * 10_000) / 10_000
    : 0;
}

function clean(value) {
  return String(value || "")
    .replace(/\u00a0/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function cleanError(error) {
  return clean(error?.message || error).slice(0, 300);
}

async function assertReviewedPilotApproval(options) {
  if (
    !options.approvedPilotReportSha256 ||
    !options.approvedManualBundleSha256 ||
    !options.reviewedManualBundle ||
    !options.approval
  ) {
    throw new Error(
      "Full scope requires the approved pilot report, manual-review bundle, hashes, and approval run ID.",
    );
  }
  const reportPath = path.resolve(options.reviewedPilotReport);
  const sha256 = await sha256File(reportPath);
  if (sha256 !== options.approvedPilotReportSha256) {
    throw new Error("The reviewed pilot report hash changed.");
  }
  const report = JSON.parse(
    await fsPromises.readFile(reportPath, "utf8"),
  );
  if (
    report.schemaVersion !==
      WEB_ENRICHMENT_REPORT_SCHEMA_VERSION ||
    report.scope !== "pilot" ||
    report.mode !== "fast" ||
    report.runId !== options.approval ||
    report.audit?.sampleRequirementMet !== true ||
    report.audit?.verifiedDomainPrecision < 0.98 ||
    report.invariants?.dynamodbWriteCount !== 0
  ) {
    throw new Error(
      "The reviewed pilot report does not satisfy the full-scope accuracy guards.",
    );
  }
  const manualBundlePath = path.resolve(
    options.reviewedManualBundle,
  );
  const manualBundleSha256 = await sha256File(manualBundlePath);
  if (
    manualBundleSha256 !== options.approvedManualBundleSha256 ||
    manualBundleSha256 !==
      "45f9281129e58042319df19f88007c69b8f8efa3499b8d5ef3ebd6aab5422d9a"
  ) {
    throw new Error("The reviewed manual-audit bundle hash changed.");
  }
  const manualRows = await readJsonLines(manualBundlePath);
  if (
    manualRows.length !== 400 ||
    new Set(
      manualRows.map(
        (row) => `${row.contractorId}|${row.domain}`,
      ),
    ).size !== 400
  ) {
    throw new Error(
      "The reviewed manual-audit bundle is not the approved 400-row sample.",
    );
  }
}

function parseArgs(argv) {
  const options = {
    approval: "",
    approvedManualBundleSha256: "",
    approvedPilotReportSha256: "",
    auditSeed: "retrofi-statewide-web-enrichment-audit-v1",
    cacheDirectory: path.resolve(
      "var",
      "contractor-web-enrichment",
      "cache",
    ),
    checkpointEvery: 500,
    concurrency: 32,
    deepIfTime: false,
    excludeContractorsFile: "",
    maxRuntimeHours: 16,
    mode: "fast",
    osmPbfPath: "",
    outputDirectory: "",
    pilotSize: 5_000,
    profile: "",
    quiet: false,
    reserveFinalizationMinutes: 60,
    resume: false,
    reviewedManualBundle: "",
    reviewedPilotReport: "",
    runId: "",
    scope: "",
    selectionSeed:
      "retrofi-statewide-web-enrichment-pilot-v1",
    timeoutMs: 8_000,
    targetContractorsFile: "",
    upload: false,
    write: false,
  };
  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index];
    if (arg === "--pilot") {
      options.scope = setScope(options.scope, "pilot");
    } else if (arg === "--full") {
      options.scope = setScope(options.scope, "full");
    } else if (arg === "--mode") {
      options.mode = requiredArg(argv, ++index, arg);
    } else if (arg === "--profile") {
      options.profile = requiredArg(argv, ++index, arg);
    } else if (arg === "--pilot-size") {
      options.pilotSize = positiveInteger(
        requiredArg(argv, ++index, arg),
        arg,
        100_000,
      );
    } else if (arg === "--concurrency") {
      options.concurrency = positiveInteger(
        requiredArg(argv, ++index, arg),
        arg,
        100,
      );
    } else if (arg === "--checkpoint-every") {
      options.checkpointEvery = positiveInteger(
        requiredArg(argv, ++index, arg),
        arg,
        10_000,
      );
    } else if (arg === "--max-runtime-hours") {
      options.maxRuntimeHours = positiveNumber(
        requiredArg(argv, ++index, arg),
        arg,
        24,
      );
    } else if (arg === "--reserve-finalization-minutes") {
      options.reserveFinalizationMinutes = positiveInteger(
        requiredArg(argv, ++index, arg),
        arg,
        240,
      );
    } else if (arg === "--timeout-ms") {
      options.timeoutMs = positiveInteger(
        requiredArg(argv, ++index, arg),
        arg,
        60_000,
      );
    } else if (arg === "--run-id") {
      options.runId = requiredArg(argv, ++index, arg);
    } else if (arg === "--output-dir") {
      options.outputDirectory = requiredArg(argv, ++index, arg);
    } else if (arg === "--cache-dir") {
      options.cacheDirectory = path.resolve(
        requiredArg(argv, ++index, arg),
      );
    } else if (arg === "--osm-pbf") {
      options.osmPbfPath = requiredArg(argv, ++index, arg);
    } else if (arg === "--reviewed-pilot-report") {
      options.reviewedPilotReport = requiredArg(
        argv,
        ++index,
        arg,
      );
    } else if (arg === "--approved-pilot-report-sha256") {
      options.approvedPilotReportSha256 = requiredArg(
        argv,
        ++index,
        arg,
      );
    } else if (arg === "--reviewed-manual-bundle") {
      options.reviewedManualBundle = requiredArg(
        argv,
        ++index,
        arg,
      );
    } else if (arg === "--approved-manual-bundle-sha256") {
      options.approvedManualBundleSha256 = requiredArg(
        argv,
        ++index,
        arg,
      );
    } else if (arg === "--target-contractors-file") {
      options.targetContractorsFile = requiredArg(
        argv,
        ++index,
        arg,
      );
    } else if (arg === "--exclude-contractors-file") {
      options.excludeContractorsFile = requiredArg(
        argv,
        ++index,
        arg,
      );
    } else if (arg === "--approval") {
      options.approval = requiredArg(argv, ++index, arg);
    } else if (arg === "--resume") {
      options.resume = true;
    } else if (arg === "--upload") {
      options.upload = true;
    } else if (arg === "--deep-if-time") {
      options.deepIfTime = true;
    } else if (arg === "--write") {
      options.write = true;
    } else if (arg === "--quiet") {
      options.quiet = true;
    } else if (arg === "--help" || arg === "-h") {
      options.help = true;
    } else {
      throw new Error(`Unknown argument: ${arg}`);
    }
  }
  if (!options.help) {
    if (!options.scope) {
      throw new Error("Choose exactly one of --pilot or --full.");
    }
    if (!["fast", "deep"].includes(options.mode)) {
      throw new Error("--mode must be fast or deep.");
    }
    if (
      options.runId &&
      !/^[A-Za-z0-9][A-Za-z0-9._-]{0,127}$/.test(
        options.runId,
      )
    ) {
      throw new Error(
        "--run-id must use 1 to 128 letters, numbers, periods, underscores, or hyphens.",
      );
    }
    if (options.resume && !options.runId) {
      throw new Error("--resume requires --run-id.");
    }
  }
  return options;
}

function setScope(current, next) {
  if (current && current !== next) {
    throw new Error("Choose exactly one of --pilot or --full.");
  }
  return next;
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

function positiveNumber(value, flag, maximum) {
  const parsed = Number(value);
  if (
    !Number.isFinite(parsed) ||
    parsed <= 0 ||
    parsed > maximum
  ) {
    throw new Error(
      `${flag} must be greater than zero and no more than ${maximum}.`,
    );
  }
  return parsed;
}

function printHelp() {
  console.log(`Run the one-time contractor web-enrichment pipeline.

Usage:
  npm run contractors:web-enrich -- --pilot --mode fast [options]
  npm run contractors:web-enrich -- --full --mode fast \\
    --reviewed-pilot-report <path> \\
    --approved-pilot-report-sha256 <hash> \\
    --reviewed-manual-bundle <path> \\
    --approved-manual-bundle-sha256 <hash> \\
    --approval <pilot-run-id>

Options:
  --profile <name>          AWS profile. Must be retrofi-prod.
  --pilot-size <count>      Pilot size. Default: 5000.
  --concurrency <count>     Maximum adaptive concurrency. Default: 32.
  --checkpoint-every <n>    Contractors per checkpoint. Default: 500.
  --timeout-ms <count>      Request timeout. Default: 8000.
  --max-runtime-hours <n>   Full-run wall-clock ceiling. Default: 16.
  --reserve-finalization-minutes <n>
                             Finalization reserve. Default: 60.
  --run-id <id>             Stable run ID for resume.
  --resume                  Resume completed contractor results.
  --upload                  Upload checkpoints and final artifacts to S3.
  --deep-if-time            Run deep processing after the full fast pass.
  --target-contractors-file <path>
                             Process only listed contractor IDs.
  --exclude-contractors-file <path>
                             Exclude listed IDs from pilot selection.
  --osm-pbf <path>          Reuse a downloaded California PBF.
  --cache-dir <path>        Persistent source cache directory.
  --output-dir <path>       Local run artifact directory.
  --quiet                   Suppress progress output.

DynamoDB write mode is unavailable and --write always fails closed.`);
}

async function main() {
  const options = parseArgs(process.argv.slice(2));
  if (options.help) {
    printHelp();
    return;
  }
  await runContractorWebEnrichment(options);
}

const isEntrypoint =
  process.argv[1] &&
  import.meta.url ===
    pathToFileURL(path.resolve(process.argv[1])).href;
if (isEntrypoint) {
  main().catch((error) => {
    console.error(error?.stack || error?.message || error);
    process.exitCode = 1;
  });
}
