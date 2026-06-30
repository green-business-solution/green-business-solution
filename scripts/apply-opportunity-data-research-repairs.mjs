import fs from "node:fs";
import path from "node:path";

const repoRoot = path.resolve(import.meta.dirname, "..");
const dataDir = path.join(repoRoot, "data");
const publicDir = path.join(repoRoot, "public");

const defaultRepairsPath = path.join(dataDir, "opportunity_data_research_repairs_gpt_pro_2026-06-29_batch1.json");
const repairsPaths = resolveRepairPaths();
const retrofitIndexPath = process.env.RETROFIT_INDEX_PATH || path.join(publicDir, "retrofit_opportunity_index.json");
const testCasesPath = process.env.MATCHING_TEST_CASES_PATH || path.join(publicDir, "sample_matching_test_cases.json");
const reportPath =
  process.env.OPPORTUNITY_DATA_REPAIR_REPORT_PATH || path.join(dataDir, "opportunity_data_repair_import_report.md");
const appliedAt = new Date().toISOString();

const repairArtifacts = repairsPaths.map((filePath) => ({ filePath, artifact: readJson(filePath) }));
const repairRows = repairArtifacts.flatMap(({ filePath, artifact }) =>
  (artifact.repairs || [])
    .filter((repair) => repair?.opportunityId)
    .map((repair) => ({ filePath, artifact, repair }))
);
const repairsById = new Map();
for (const row of repairRows) {
  repairsById.set(row.repair.opportunityId, normalizeRepair(row.repair, row.artifact, row.filePath));
}
const retrofitIndex = readJson(retrofitIndexPath);
const testCases = readJson(testCasesPath);

const retrofitPatch = patchRetrofitIndex(retrofitIndex);
const testCasePatch = patchTestCases(testCases);
const appliedBatchIds = repairArtifacts.map(({ filePath, artifact }) => batchId(artifact, filePath));
const appliedRelativePaths = repairsPaths.map((filePath) => path.relative(repoRoot, path.resolve(filePath)));

retrofitIndex.opportunityDataRepairedAt = appliedAt;
retrofitIndex.opportunityDataRepairBatch = appliedBatchIds.at(-1) || null;
retrofitIndex.opportunityDataRepairBatches = appliedBatchIds;
retrofitIndex.opportunityDataRepairPaths = appliedRelativePaths;
testCases.opportunityDataRepairedAt = appliedAt;
testCases.opportunityDataRepairBatch = appliedBatchIds.at(-1) || null;
testCases.opportunityDataRepairBatches = appliedBatchIds;
testCases.opportunityDataRepairPaths = appliedRelativePaths;

writeJson(retrofitIndexPath, retrofitIndex);
writeJson(testCasesPath, testCases);
fs.writeFileSync(reportPath, buildReport({ retrofitPatch, testCasePatch }), "utf8");

console.log("Applied opportunity data research repairs.");
console.log(`Batches: ${appliedBatchIds.join(", ")}`);
console.log(`Repair files: ${appliedRelativePaths.join(", ")}`);
console.log(`Repairs supplied: ${repairRows.length}`);
console.log(`Unique repairs supplied: ${repairsById.size}`);
console.log(`Duplicate opportunity repairs overwritten by later files: ${repairRows.length - repairsById.size}`);
console.log(`Retrofit index opportunity edges patched: ${retrofitPatch.edgeCount}`);
console.log(`Retrofit index unique opportunities patched: ${retrofitPatch.uniqueOpportunityCount}`);
console.log(`Test case opportunity edges patched: ${testCasePatch.edgeCount}`);
console.log(`Test case top result edges patched: ${testCasePatch.topResultCount}`);
console.log(`Report: ${reportPath}`);

function patchRetrofitIndex(index) {
  let edgeCount = 0;
  const uniqueIds = new Set();

  for (const retrofit of index.retrofits || []) {
    for (const opportunity of retrofit.opportunities || []) {
      const repair = repairsById.get(opportunity.opportunityId);
      if (!repair) continue;
      Object.assign(opportunity, patchedOpportunityFields(opportunity, repair));
      edgeCount += 1;
      uniqueIds.add(opportunity.opportunityId);
    }
  }

  for (const opportunity of index.upcomingOpportunities || []) {
    const repair = repairsById.get(opportunity.opportunityId);
    if (!repair) continue;
    Object.assign(opportunity, patchedOpportunityFields(opportunity, repair));
    edgeCount += 1;
    uniqueIds.add(opportunity.opportunityId);
  }

  return {
    edgeCount,
    uniqueOpportunityCount: uniqueIds.size,
    uniqueOpportunityIds: [...uniqueIds].sort()
  };
}

function patchTestCases(source) {
  let edgeCount = 0;
  let topResultCount = 0;
  const uniqueIds = new Set();

  for (const testCase of source.testCases || []) {
    for (const retrofit of testCase.retrofits || []) {
      for (const opportunity of retrofit.opportunities || []) {
        const repair = repairsById.get(opportunity.opportunityId);
        if (!repair) continue;
        Object.assign(opportunity, patchedOpportunityFields(opportunity, repair));
        edgeCount += 1;
        uniqueIds.add(opportunity.opportunityId);
      }
    }

    for (const opportunity of testCase.topResults || []) {
      const repair = repairsById.get(opportunity.opportunityId);
      if (!repair) continue;
      Object.assign(opportunity, patchedOpportunityFields(opportunity, repair));
      topResultCount += 1;
      uniqueIds.add(opportunity.opportunityId);
    }

    for (const opportunity of testCase.upcomingOpportunities || []) {
      const repair = repairsById.get(opportunity.opportunityId);
      if (!repair) continue;
      Object.assign(opportunity, patchedOpportunityFields(opportunity, repair));
      edgeCount += 1;
      uniqueIds.add(opportunity.opportunityId);
    }
  }

  return {
    edgeCount,
    topResultCount,
    uniqueOpportunityCount: uniqueIds.size,
    uniqueOpportunityIds: [...uniqueIds].sort()
  };
}

function patchedOpportunityFields(opportunity, repair) {
  return {
    ...optionalField("programType", repair.programType),
    ...optionalField("administrator", repair.administrator),
    ...optionalField("websiteUrl", repair.websiteUrl),
    ...optionalField("applicationUrl", repair.applicationUrl),
    ...optionalField("state", repair.geography.states[0] || opportunity.state),
    availabilityStatus: publicAvailabilityStatus(repair.availabilityStatus, opportunity.availabilityStatus),
    dataRepairConfidence: confidenceNumber(repair.confidence),
    opportunityDataRepair: repair
  };
}

function normalizeRepair(repair, repairsArtifact, repairsPath) {
  return {
    schemaVersion: repairsArtifact.schemaVersion || "opportunity_data_research_repairs.v1",
    batchId: batchId(repairsArtifact, repairsPath),
    researchedAt: repairsArtifact.researchedAt || null,
    source: repairsArtifact.source || "gpt_pro",
    repairsPath: path.relative(repoRoot, path.resolve(repairsPath)),
    opportunityId: repair.opportunityId,
    repairStatus: repair.repairStatus || "data_found",
    confidence: repair.confidence || "medium",
    availabilityStatus: repair.availabilityStatus || "unknown",
    geography: {
      country: repair.geography?.country || "US",
      states: uniqueStrings(repair.geography?.states || []),
      counties: uniqueStrings(repair.geography?.counties || []),
      cities: uniqueStrings(repair.geography?.cities || []),
      utilityTerritories: uniqueStrings(repair.geography?.utilityTerritories || []),
      notes: cleanText(repair.geography?.notes)
    },
    eligibleApplicantTypes: uniqueStrings(repair.eligibleApplicantTypes || []),
    eligibleSectors: uniqueStrings(repair.eligibleSectors || []),
    eligibleRetrofitCategories: uniqueStrings(repair.eligibleRetrofitCategories || []),
    hardRequirements: uniqueStrings(repair.hardRequirements || []),
    blockers: uniqueStrings(repair.blockers || []),
    programType: cleanText(repair.programType),
    administrator: cleanText(repair.administrator),
    applicationUrl: normalizeUrl(repair.applicationUrl),
    websiteUrl: normalizeUrl(repair.websiteUrl),
    sourceUrlsChecked: uniqueStrings((repair.sourceUrlsChecked || []).map(normalizeUrl).filter(Boolean)),
    evidenceText: cleanText(repair.evidenceText),
    reasoningNotes: cleanText(repair.reasoningNotes)
  };
}

function publicAvailabilityStatus(status, fallback = "active") {
  if (status === "active") return "active";
  if (status === "rolling") return "rolling";
  if (status === "unavailable") return "unavailable";
  if (status === "upcoming") return "upcoming";
  if (status === "temporarily_closed" || status === "unknown" || status === "source_inaccessible") return "uncertain";
  return fallback || "uncertain";
}

function optionalField(key, value) {
  return value ? { [key]: value } : {};
}

function normalizeUrl(value) {
  const raw = String(value || "").trim();
  const markdownMatch = /^\[([^\]]+)\]\(([^)]+)\)$/.exec(raw);
  const url = markdownMatch ? markdownMatch[2] : raw;
  return /^https?:\/\//i.test(url) ? url : null;
}

function confidenceNumber(value) {
  if (value === "high") return 0.9;
  if (value === "medium") return 0.72;
  if (value === "low") return 0.38;
  const number = Number(value);
  return Number.isFinite(number) ? Math.max(0, Math.min(1, number)) : 0.62;
}

function batchId(repairsArtifact, repairsPath) {
  return repairsArtifact.batchId || path.basename(repairsPath, ".json");
}

function buildReport({ retrofitPatch, testCasePatch }) {
  return [
    "# Opportunity Data Repair Import Report",
    "",
    `Generated: ${appliedAt}`,
    `Batches: ${appliedBatchIds.join(", ")}`,
    `Repair files: ${appliedRelativePaths.join(", ")}`,
    `Repairs supplied: ${repairRows.length}`,
    `Unique repairs supplied: ${repairsById.size}`,
    `Duplicate opportunity repairs overwritten by later files: ${repairRows.length - repairsById.size}`,
    `Retrofit index edges patched: ${retrofitPatch.edgeCount}`,
    `Retrofit index unique opportunities patched: ${retrofitPatch.uniqueOpportunityCount}`,
    `Test case opportunity edges patched: ${testCasePatch.edgeCount}`,
    `Test case top result edges patched: ${testCasePatch.topResultCount}`,
    "",
    "## Patched Opportunities",
    "",
    ...retrofitPatch.uniqueOpportunityIds.map((id) => `- ${id}`)
  ].join("\n") + "\n";
}

function cleanText(value) {
  return String(value || "").replace(/\s+/g, " ").trim();
}

function uniqueStrings(values) {
  return [...new Set((Array.isArray(values) ? values : []).map((value) => cleanText(value)).filter(Boolean))];
}

function readJson(filePath) {
  return JSON.parse(fs.readFileSync(path.resolve(filePath), "utf8"));
}

function writeJson(filePath, value) {
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  fs.writeFileSync(filePath, `${JSON.stringify(value, null, 2)}\n`);
}

function resolveRepairPaths() {
  const cliPaths = process.argv.slice(2).filter((value) => value && !value.startsWith("--"));
  if (cliPaths.length > 0) return uniqueResolvedPaths(cliPaths);

  const envPaths =
    process.env.OPPORTUNITY_DATA_RESEARCH_REPAIRS_PATHS || process.env.OPPORTUNITY_DATA_RESEARCH_REPAIRS_PATH || "";
  if (envPaths.trim()) return uniqueResolvedPaths(splitPathList(envPaths));

  return [defaultRepairsPath];
}

function splitPathList(value) {
  return value
    .split(/[,\n]/)
    .flatMap((part) => part.split(path.delimiter))
    .map((part) => part.trim())
    .filter(Boolean);
}

function uniqueResolvedPaths(values) {
  return [...new Set(values.map((value) => path.resolve(repoRoot, value)))];
}
