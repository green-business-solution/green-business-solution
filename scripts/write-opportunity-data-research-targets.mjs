import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { readExpectedOpportunityIds } from "./validate-opportunity-data-research-repairs.mjs";

const repoRoot = path.resolve(import.meta.dirname, "..");
const defaultSourcePath = path.join(repoRoot, "public/retrofit_opportunity_index.json");
const defaultOutputPath = path.join(repoRoot, "data/opportunity_data_research_targets_next_from_current.json");
const defaultMaxTargets = 75;
const defaultConfidenceThreshold = 0.9;
const defaultAvailabilityStatuses = new Set(["active", "rolling", null]);

export function buildTargets(index, options = {}) {
  const maxTargets = options.maxTargets ?? defaultMaxTargets;
  const confidenceThreshold = options.confidenceThreshold ?? defaultConfidenceThreshold;
  const excludeRepaired = options.excludeRepaired !== false;
  const rowsById = new Map();
  const excludedOpportunityIds = new Set(options.excludeOpportunityIds || []);

  for (const retrofit of index.retrofits || []) {
    for (const opportunity of retrofit.opportunities || []) {
      if (excludedOpportunityIds.has(opportunity.opportunityId)) continue;
      if (!defaultAvailabilityStatuses.has(opportunity.availabilityStatus ?? null)) continue;
      if (excludeRepaired && opportunity.opportunityDataRepair) continue;
      if (!Number.isFinite(opportunity.confidence) || opportunity.confidence >= confidenceThreshold) continue;

      const row = rowsById.get(opportunity.opportunityId) || createTargetRow(opportunity);
      row.lowestConfidence = Math.min(row.lowestConfidence, opportunity.confidence);
      row.matchBases.add(opportunity.matchBasis || "unknown");
      for (const term of opportunity.matchedTerms || []) row.matchedTerms.add(term);
      row.relatedRetrofits.push(retrofitSummary(retrofit));
      rowsById.set(opportunity.opportunityId, row);
    }
  }

  return [...rowsById.values()]
    .map(finalizeTargetRow)
    .sort((a, b) => {
      const confidenceDelta = a.lowestConfidence - b.lowestConfidence;
      if (confidenceDelta !== 0) return confidenceDelta;
      const retrofitDelta = b.relatedRetrofitCount - a.relatedRetrofitCount;
      if (retrofitDelta !== 0) return retrofitDelta;
      return a.opportunityName.localeCompare(b.opportunityName);
    })
    .slice(0, maxTargets);
}

function createTargetRow(opportunity) {
  return {
    opportunityId: opportunity.opportunityId,
    opportunityName: opportunity.opportunityName,
    sourceName: opportunity.sourceName,
    sourceUrl: opportunity.sourceUrl,
    websiteUrl: opportunity.websiteUrl,
    applicationUrl: opportunity.applicationUrl,
    state: opportunity.state,
    programType: opportunity.programType,
    administrator: opportunity.administrator,
    availabilityStatus: opportunity.availabilityStatus,
    lowestConfidence: Number.POSITIVE_INFINITY,
    matchBases: new Set(),
    matchedTerms: new Set(),
    relatedRetrofits: []
  };
}

function finalizeTargetRow(row) {
  return {
    ...row,
    lowestConfidence: Number(row.lowestConfidence.toFixed(4)),
    matchBases: [...row.matchBases].sort(),
    matchedTerms: [...row.matchedTerms].sort(),
    relatedRetrofits: row.relatedRetrofits.sort((a, b) => a.displayName.localeCompare(b.displayName)),
    relatedRetrofitCount: row.relatedRetrofits.length
  };
}

function retrofitSummary(retrofit) {
  return {
    retrofitTypeId: retrofit.retrofitTypeId,
    displayName: retrofit.displayName,
    parentCategory: retrofit.parentCategory,
    isPhysicalRetrofit: Boolean(retrofit.isPhysicalRetrofit)
  };
}

function parseArgs(args) {
  const options = {
    sourcePath: defaultSourcePath,
    outputPath: defaultOutputPath,
    maxTargets: defaultMaxTargets,
    confidenceThreshold: defaultConfidenceThreshold,
    excludeRepaired: true,
    excludeOpportunityIds: [],
    excludeTargetsPath: null
  };

  for (let index = 0; index < args.length; index += 1) {
    const arg = args[index];
    if (arg === "--source") {
      options.sourcePath = path.resolve(requiredValue(args, ++index, arg));
    } else if (arg === "--output") {
      options.outputPath = path.resolve(requiredValue(args, ++index, arg));
    } else if (arg === "--max-targets") {
      options.maxTargets = positiveInteger(requiredValue(args, ++index, arg), arg);
    } else if (arg === "--confidence-threshold") {
      options.confidenceThreshold = numberValue(requiredValue(args, ++index, arg), arg);
    } else if (arg === "--include-repaired") {
      options.excludeRepaired = false;
    } else if (arg === "--exclude-targets") {
      options.excludeTargetsPath = path.resolve(requiredValue(args, ++index, arg));
      options.excludeOpportunityIds = readExpectedOpportunityIds(options.excludeTargetsPath);
    } else {
      throw new Error(`Unknown option: ${arg}`);
    }
  }

  return options;
}

function requiredValue(args, index, flag) {
  const value = args[index];
  if (!value) throw new Error(`${flag} requires a value`);
  return value;
}

function positiveInteger(value, flag) {
  const number = Number(value);
  if (!Number.isInteger(number) || number <= 0) throw new Error(`${flag} must be a positive integer`);
  return number;
}

function numberValue(value, flag) {
  const number = Number(value);
  if (!Number.isFinite(number)) throw new Error(`${flag} must be a number`);
  return number;
}

function readJson(filePath) {
  return JSON.parse(fs.readFileSync(path.resolve(filePath), "utf8"));
}

function writeJson(filePath, value) {
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  fs.writeFileSync(filePath, `${JSON.stringify(value, null, 2)}\n`);
}

function main() {
  const options = parseArgs(process.argv.slice(2));
  const index = readJson(options.sourcePath);
  const targets = buildTargets(index, options);
  const artifact = {
    schemaVersion: "opportunity_data_research_targets.v1",
    generatedAt: new Date().toISOString(),
    sourcePath: path.relative(repoRoot, options.sourcePath),
    selection: {
      maxTargets: options.maxTargets,
      confidenceThresholdExclusive: options.confidenceThreshold,
      availabilityStatuses: [...defaultAvailabilityStatuses].map((status) => status ?? null),
      excludeOpportunityDataRepaired: options.excludeRepaired,
      excludeOpportunityTargetPath: options.excludeTargetsPath ? path.relative(repoRoot, options.excludeTargetsPath) : null,
      excludedOpportunityCount: options.excludeOpportunityIds.length,
      sort: [
        "lowest opportunity confidence ascending",
        "related retrofit count descending",
        "opportunity name ascending"
      ]
    },
    targetCount: targets.length,
    targets
  };

  writeJson(options.outputPath, artifact);
  console.log(`Wrote ${path.relative(repoRoot, options.outputPath)}`);
  console.log(`Targets: ${targets.length}`);
}

const isCli = process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url);
if (isCli) main();
