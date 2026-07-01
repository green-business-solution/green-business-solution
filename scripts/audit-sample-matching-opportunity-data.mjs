import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const defaultTestCasesPath = path.join(repoRoot, "public/sample_matching_test_cases.json");
const defaultTargetsPath = path.join(repoRoot, "data/opportunity_data_research_targets_next_from_current.json");
const defaultRetrofitIndexPath = path.join(repoRoot, "public/retrofit_opportunity_index.json");
const defaultOutputPath = path.join(repoRoot, "data/sample_matching_post_batch13_audit.json");
const defaultReportPath = path.join(repoRoot, "data/sample_matching_post_batch13_audit.md");
const lowConfidenceThreshold = 0.8;
const planningParentCategories = new Set(["audits_studies_planning", "certifications_compliance"]);

export function buildSampleMatchingOpportunityAudit({ testCasesPayload, targetsPayload, retrofitIndexPayload }) {
  const targetRows = targetsPayload?.targets || [];
  const targetIdSet = new Set(targetRows.map((target) => target.opportunityId));
  const targetOrderById = new Map(targetRows.map((target, index) => [target.opportunityId, index + 1]));
  const repairByOpportunityId = buildRepairMap(retrofitIndexPayload);
  const issueRows = [];
  const opportunityRows = new Map();
  const caseSummaries = [];

  for (const testCase of testCasesPayload?.testCases || []) {
    const caseIssues = [];
    const sampleCity = cityFromAddress(testCase.sourceForm?.siteAddress);
    const sampleState = testCase.normalizedProfile?.site?.geo?.stateCode || testCase.sourceForm?.state || "";

    (testCase.topResults || []).forEach((result, resultIndex) => {
      const flags = classifyTopResult({
        result,
        resultIndex,
        sampleCity,
        sampleState,
        targetIdSet,
        repair: repairByOpportunityId.get(result.opportunityId)
      });
      if (flags.length === 0) return;

      const issue = {
        sampleUserId: testCase.sampleUserId,
        sampleDescription: testCase.description,
        rank: resultIndex + 1,
        opportunityId: result.opportunityId,
        opportunityName: result.opportunityName,
        opportunityDataConfidence: result.opportunityDataConfidence ?? null,
        rankScore: result.rankScore ?? null,
        sourceState: result.sourceSummary?.state || null,
        retrofitTypeIds: result.retrofitTypeIds || [],
        flags,
        workstreams: classifyWorkstreams(flags),
        nextTargetOrder: targetOrderById.get(result.opportunityId) || null,
        hasOpportunityDataRepair: repairByOpportunityId.has(result.opportunityId)
      };

      issueRows.push(issue);
      caseIssues.push(issue);
      const opportunity = opportunityRows.get(result.opportunityId) || {
        opportunityId: result.opportunityId,
        opportunityName: result.opportunityName,
        appearances: 0,
        topRankAppearances: 0,
        samples: [],
        flags: new Map(),
        workstreams: new Map(),
        nextTargetOrder: targetOrderById.get(result.opportunityId) || null,
        hasOpportunityDataRepair: repairByOpportunityId.has(result.opportunityId),
        opportunityDataConfidence: result.opportunityDataConfidence ?? null
      };
      opportunity.appearances += 1;
      if (resultIndex === 0) opportunity.topRankAppearances += 1;
      if (opportunity.samples.length < 8) opportunity.samples.push(testCase.sampleUserId);
      for (const flag of flags) opportunity.flags.set(flag, (opportunity.flags.get(flag) || 0) + 1);
      for (const workstream of issue.workstreams) opportunity.workstreams.set(workstream, (opportunity.workstreams.get(workstream) || 0) + 1);
      opportunityRows.set(result.opportunityId, opportunity);
    });

    caseSummaries.push({
      sampleUserId: testCase.sampleUserId,
      description: testCase.description,
      topResultCount: (testCase.topResults || []).length,
      issueCount: caseIssues.length,
      opportunityDataIssueCount: caseIssues.filter((issue) => issue.workstreams.includes("opportunity_data")).length,
      rankingIssueCount: caseIssues.filter((issue) => issue.workstreams.includes("matching_ranking")).length,
      topIssues: caseIssues.slice(0, 5)
    });
  }

  const opportunitySummaries = [...opportunityRows.values()]
    .map((row) => ({
      ...row,
      flags: sortCountMap(row.flags),
      workstreams: sortCountMap(row.workstreams)
    }))
    .sort((a, b) => b.topRankAppearances - a.topRankAppearances || b.appearances - a.appearances || a.opportunityName.localeCompare(b.opportunityName));

  const summary = {
    generatedAt: new Date().toISOString(),
    sampleCaseCount: (testCasesPayload?.testCases || []).length,
    topResultCount: (testCasesPayload?.testCases || []).reduce((sum, testCase) => sum + (testCase.topResults || []).length, 0),
    nextTargetCount: targetRows.length,
    issueCount: issueRows.length,
    issueTopRankCount: issueRows.filter((issue) => issue.rank === 1).length,
    opportunityDataIssueCount: issueRows.filter((issue) => issue.workstreams.includes("opportunity_data")).length,
    matchingRankingIssueCount: issueRows.filter((issue) => issue.workstreams.includes("matching_ranking")).length,
    pendingGptTargetTopResultCount: issueRows.filter((issue) => issue.flags.includes("pending_gpt_repair_target")).length,
    unrepairedLowConfidenceTopResultCount: issueRows.filter((issue) => issue.flags.includes("unrepaired_low_confidence_opportunity_data")).length,
    nonPhysicalTopResultCount: issueRows.filter((issue) => issue.flags.includes("non_physical_top_result")).length,
    localScopeRiskCount: issueRows.filter((issue) => issue.flags.includes("local_scope_matched_by_state_only")).length,
    financingOrTaxHighRankCount: issueRows.filter((issue) => issue.flags.includes("financing_or_tax_program_high_rank")).length
  };

  return {
    schemaVersion: "sample_matching_opportunity_data_audit.v1",
    summary,
    caseSummaries,
    opportunitySummaries,
    issues: issueRows
  };
}

export function buildSampleMatchingOpportunityAuditReport(audit) {
  const opportunityData = audit.opportunitySummaries.filter((row) =>
    row.workstreams.some((item) => item.value === "opportunity_data")
  );
  const ranking = audit.opportunitySummaries.filter((row) =>
    row.workstreams.some((item) => item.value === "matching_ranking")
  );
  const lines = [
    "# Sample Matching Post-Batch13 Audit",
    "",
    `Generated: ${audit.summary.generatedAt}`,
    `Sample cases: ${audit.summary.sampleCaseCount}`,
    `Top-result rows inspected: ${audit.summary.topResultCount}`,
    `Flagged rows: ${audit.summary.issueCount}`,
    `Flagged rank-1 rows: ${audit.summary.issueTopRankCount}`,
    "",
    "## Workstream Split",
    "",
    `- Opportunity data issues: ${audit.summary.opportunityDataIssueCount}`,
    `- Matching/ranking issues: ${audit.summary.matchingRankingIssueCount}`,
    `- Pending GPT target top-result rows: ${audit.summary.pendingGptTargetTopResultCount}`,
    `- Unrepaired low-confidence top-result rows: ${audit.summary.unrepairedLowConfidenceTopResultCount}`,
    `- Non-physical top-result rows: ${audit.summary.nonPhysicalTopResultCount}`,
    `- Local scope/state-only risk rows: ${audit.summary.localScopeRiskCount}`,
    `- Financing/tax high-rank rows: ${audit.summary.financingOrTaxHighRankCount}`,
    "",
    "## Interpretation",
    "",
    "- The parallel GPT Pro batches should directly reduce the pending-target and unrepaired low-confidence counts.",
    "- Repeated federal tax, loan, certification, permit, or local programs at rank 1 are ranking/category-boundary work, not just source-data cleanup.",
    "- Local city or county programs matched only by state should get stronger geography handling after the data cleanup pass.",
    "",
    "## Top Opportunity-Data Targets Appearing In Current Top Results",
    "",
    ...formatOpportunityRows(opportunityData.slice(0, 20)),
    "",
    "## Top Matching/Ranking Candidates",
    "",
    ...formatOpportunityRows(ranking.slice(0, 20)),
    "",
    "## Highest-Issue Sample Cases",
    "",
    ...audit.caseSummaries
      .filter((row) => row.issueCount > 0)
      .sort((a, b) => b.issueCount - a.issueCount || a.sampleUserId.localeCompare(b.sampleUserId))
      .slice(0, 20)
      .map(
        (row) =>
          `- ${row.sampleUserId}: ${row.issueCount} flagged top results (${row.opportunityDataIssueCount} data, ${row.rankingIssueCount} ranking)`
      )
  ];
  return `${lines.join("\n")}\n`;
}

function classifyTopResult({ result, resultIndex, sampleCity, sampleState, targetIdSet, repair }) {
  const flags = [];
  const retrofitTypes = result.retrofitTypes || [];
  const confidence = result.opportunityDataConfidence ?? 1;
  const name = result.opportunityName || "";

  if (targetIdSet.has(result.opportunityId)) flags.push("pending_gpt_repair_target");
  if (confidence < lowConfidenceThreshold && !repair && !targetIdSet.has(result.opportunityId)) {
    flags.push("unrepaired_low_confidence_opportunity_data");
  }
  if (retrofitTypes.length > 0 && retrofitTypes.every((retrofit) => retrofit.isPhysicalRetrofit === false)) {
    flags.push("non_physical_top_result");
  }
  if (resultIndex < 3 && isFinancingOrTaxProgram(name, result.sourceSummary?.programType)) {
    flags.push("financing_or_tax_program_high_rank");
  }
  if (resultIndex < 3 && isLocalScopeRisk(name, sampleCity)) {
    flags.push("local_scope_matched_by_state_only");
  }
  if (result.sourceSummary?.state && sampleState && !["US", sampleState].includes(result.sourceSummary.state)) {
    flags.push("state_mismatch_visible_top_result");
  }
  if (retrofitTypes.some((retrofit) => planningParentCategories.has(retrofit.parentCategory)) && resultIndex < 5) {
    flags.push("planning_or_certification_high_rank");
  }
  if ((result.retrofitTypeIds || []).length === 0) flags.push("empty_retrofit_type_top_result");

  return [...new Set(flags)];
}

function classifyWorkstreams(flags) {
  const workstreams = new Set();
  if (flags.some((flag) => ["pending_gpt_repair_target", "unrepaired_low_confidence_opportunity_data"].includes(flag))) {
    workstreams.add("opportunity_data");
  }
  if (
    flags.some((flag) =>
      [
        "non_physical_top_result",
        "financing_or_tax_program_high_rank",
        "local_scope_matched_by_state_only",
        "planning_or_certification_high_rank",
        "state_mismatch_visible_top_result",
        "empty_retrofit_type_top_result"
      ].includes(flag)
    )
  ) {
    workstreams.add("matching_ranking");
  }
  return [...workstreams];
}

function buildRepairMap(index) {
  const repairs = new Map();
  for (const retrofit of index?.retrofits || []) {
    for (const opportunity of retrofit.opportunities || []) {
      if (opportunity.opportunityDataRepair) repairs.set(opportunity.opportunityId, opportunity.opportunityDataRepair);
    }
  }
  return repairs;
}

function isFinancingOrTaxProgram(name, programType = "") {
  return /\b(?:tax credit|tax deduction|tax exemption|loan|financing|pace|macrs|srec|renewable energy credit)\b/i.test(
    `${name} ${programType}`
  );
}

function isLocalScopeRisk(name, sampleCity) {
  const cityMatch = /^City of ([^-–]+)/i.exec(name);
  const countyMatch = /^([A-Za-z .']+ County)\b/i.exec(name) || /^County of ([^-–]+)/i.exec(name);
  const localName = cleanText(cityMatch?.[1] || countyMatch?.[1] || "");
  if (!localName || !sampleCity) return false;
  return !normalizePlace(sampleCity).includes(normalizePlace(localName)) && !normalizePlace(localName).includes(normalizePlace(sampleCity));
}

function cityFromAddress(address) {
  const parts = String(address || "").split(",").map(cleanText).filter(Boolean);
  return parts.length >= 3 ? parts.at(-3) : "";
}

function normalizePlace(value) {
  return cleanText(value).toLowerCase().replace(/\b(city|county|parish|town|village)\b/g, "").replace(/[^a-z0-9]+/g, " ").trim();
}

function sortCountMap(map) {
  return [...map.entries()]
    .map(([value, count]) => ({ value, count }))
    .sort((a, b) => b.count - a.count || a.value.localeCompare(b.value));
}

function formatOpportunityRows(rows) {
  if (rows.length === 0) return ["- None flagged."];
  return rows.map((row) => {
    const flags = row.flags.slice(0, 3).map((item) => `${item.value}=${item.count}`).join(", ");
    const target = row.nextTargetOrder ? ` target #${row.nextTargetOrder}` : " not in next target list";
    return `- ${row.opportunityName} (${row.opportunityId}): ${row.appearances} appearances, ${row.topRankAppearances} rank-1,${target}; ${flags}`;
  });
}

function cleanText(value) {
  return String(value || "").replace(/\s+/g, " ").trim();
}

function readJson(filePath) {
  return JSON.parse(fs.readFileSync(path.resolve(filePath), "utf8"));
}

function writeJson(filePath, value) {
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  fs.writeFileSync(filePath, `${JSON.stringify(value, null, 2)}\n`);
}

function parseArgs(args) {
  const options = {
    testCasesPath: defaultTestCasesPath,
    targetsPath: defaultTargetsPath,
    retrofitIndexPath: defaultRetrofitIndexPath,
    outputPath: defaultOutputPath,
    reportPath: defaultReportPath
  };

  for (let index = 0; index < args.length; index += 1) {
    const arg = args[index];
    if (arg === "--test-cases") options.testCasesPath = path.resolve(args[++index]);
    else if (arg === "--targets") options.targetsPath = path.resolve(args[++index]);
    else if (arg === "--retrofit-index") options.retrofitIndexPath = path.resolve(args[++index]);
    else if (arg === "--output") options.outputPath = path.resolve(args[++index]);
    else if (arg === "--report") options.reportPath = path.resolve(args[++index]);
    else throw new Error(`unknown option: ${arg}`);
  }

  return options;
}

function main() {
  try {
    const options = parseArgs(process.argv.slice(2));
    const audit = buildSampleMatchingOpportunityAudit({
      testCasesPayload: readJson(options.testCasesPath),
      targetsPayload: readJson(options.targetsPath),
      retrofitIndexPayload: readJson(options.retrofitIndexPath)
    });
    writeJson(options.outputPath, audit);
    fs.mkdirSync(path.dirname(options.reportPath), { recursive: true });
    fs.writeFileSync(options.reportPath, buildSampleMatchingOpportunityAuditReport(audit), "utf8");
    console.log("Sample matching opportunity-data audit complete.");
    console.log(`Sample cases: ${audit.summary.sampleCaseCount}`);
    console.log(`Flagged rows: ${audit.summary.issueCount}`);
    console.log(`Opportunity data issues: ${audit.summary.opportunityDataIssueCount}`);
    console.log(`Matching/ranking issues: ${audit.summary.matchingRankingIssueCount}`);
    console.log(`JSON: ${path.relative(repoRoot, options.outputPath)}`);
    console.log(`Report: ${path.relative(repoRoot, options.reportPath)}`);
  } catch (error) {
    console.error(`Sample matching opportunity-data audit failed: ${error.message}`);
    process.exitCode = 1;
  }
}

const isCli = process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url);
if (isCli) main();
