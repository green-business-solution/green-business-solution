import fs from "node:fs";
import path from "node:path";

const repoRoot = path.resolve(import.meta.dirname, "..");
const defaultInputPath = path.join(repoRoot, "public", "sample_matching_test_cases.json");
const defaultWorkRoot = path.join(repoRoot, "GPT Pro Work");
const defaultDate = "2026-07-03";

const options = parseArgs(process.argv.slice(2));
const source = readJson(options.inputPath);
const testCases = source.testCases || [];
const packetDir = path.join(options.workRoot, `scenario-verification-gpt-pro-${options.date}`);

if (fs.existsSync(packetDir) && !options.force) {
  throw new Error(`packet directory already exists: ${path.relative(repoRoot, packetDir)}. Use --force to overwrite.`);
}

fs.mkdirSync(packetDir, { recursive: true });

const workItems = testCases.map((testCase, index) => {
  const ordinal = index + 1;
  const slug = slugify(testCase.sampleUserId || `test_case_${ordinal}`);
  const promptFile = `prompt_${pad(ordinal)}_${slug}.md`;
  const outputFile = `output_${pad(ordinal)}_${slug}.md`;
  const packet = compactTestCase(testCase, ordinal);
  writeText(path.join(packetDir, promptFile), buildPrompt({ ordinal, total: testCases.length, packet }));
  writeText(path.join(packetDir, outputFile), "");
  return {
    ordinal,
    sampleUserId: testCase.sampleUserId,
    description: testCase.description || null,
    promptFile,
    outputFile,
    retrofitCount: packet.retrofits.length,
    scenarioCount: packet.retrofits.reduce((sum, retrofit) => sum + retrofit.scenarios.length, 0)
  };
});

writeText(path.join(packetDir, "README.md"), buildReadme(workItems));
writeJson(path.join(packetDir, "work_index.json"), {
  schemaVersion: "retrofi_scenario_verification_work_index.v1",
  generatedAt: new Date().toISOString(),
  sourcePath: path.relative(repoRoot, options.inputPath),
  promptCount: workItems.length,
  outputCount: workItems.length,
  workItems
});

console.log(`Wrote ${path.relative(repoRoot, packetDir)}`);
console.log(`Prompts: ${workItems.length}`);
console.log(`Blank outputs: ${workItems.length}`);
console.log(`Total retrofits covered: ${workItems.reduce((sum, item) => sum + item.retrofitCount, 0)}`);
console.log(`Total scenarios covered: ${workItems.reduce((sum, item) => sum + item.scenarioCount, 0)}`);

function buildPrompt({ ordinal, total, packet }) {
  return `You are helping RetroFi verify scenario construction for one test case.

Task: Scenario combination verification only.

Do not deeply recalculate formula math in this pass. A later pass will verify dollar math. This pass should decide whether RetroFi picked the right combination of opportunities for each retrofit, given the opportunities and scenario candidates in the packet.

Definitions:
- The selected scenario is RetroFi's current best scenario for a retrofit.
- Alternative scenarios are other combinations RetroFi considered.
- Matched opportunities are opportunities that matched the retrofit/user profile, including opportunities that may not have entered a scenario because no calculable rule/package existed.
- V2 package summaries explain whether repaired calculation packages were included, blocked by missing inputs, low confidence, human review, not user-facing by default, or unsupported.

Review goals:
1. Check whether each selected scenario is internally valid.
2. Check whether it includes two opportunities that should not stack together.
3. Check whether it excludes a compatible additive opportunity that should be included.
4. Check whether an alternative scenario should have been selected instead.
5. Check whether duplicate/overlapping opportunities are being double-counted.
6. Check whether missing stacking/conflict metadata or bad opportunity data prevents a reliable scenario decision.

Rules:
- Use only the packet below. Do not browse the web.
- Do not invent new source facts.
- If source facts are insufficient, mark the issue as a data gap instead of guessing.
- Keep math comments limited to obvious scenario-level inconsistencies, such as a selected scenario with lower first-year benefit than a listed compatible alternative. Do not verify individual formulas or rate tables.
- Return one JSON object only. No markdown outside JSON.

Return schema:
{
  "schemaVersion": "retrofi_scenario_combination_verification.v1",
  "reviewedBy": "gpt_pro",
  "testCaseId": "",
  "testCaseOrdinal": ${ordinal},
  "overallAssessment": "no_issues_found | issues_found | inconclusive_due_to_data_gaps",
  "findings": [
    {
      "retrofitTypeId": "",
      "retrofitDisplayName": "",
      "severity": "high | medium | low",
      "findingType": "invalid_stack | missing_compatible_opportunity | selected_not_optimal | duplicate_or_overlapping_opportunity | missing_required_dependency | excluded_opportunity_should_stay_excluded | no_calculable_scenario_but_should_have_one | data_gap_blocks_verification | no_issue",
      "selectedScenarioId": null,
      "affectedOpportunityIds": [],
      "affectedScenarioIds": [],
      "explanation": "",
      "recommendedRepair": "",
      "needsMathVerificationLater": false
    }
  ],
  "summary": {
    "retrofitsReviewed": 0,
    "highSeverityCount": 0,
    "mediumSeverityCount": 0,
    "lowSeverityCount": 0,
    "noIssueRetrofitCount": 0,
    "dataGapRetrofitCount": 0
  }
}

Packet ${ordinal} of ${total}:
${JSON.stringify(packet, null, 2)}
`;
}

function buildReadme(workItems) {
  const lines = [
    "# Scenario Verification GPT Pro Work Packet",
    "",
    "One prompt is provided per test case. Paste each `prompt_*.md` file into GPT Pro and paste the JSON-only response into the matching blank `output_*.md` file.",
    "",
    "This packet verifies scenario combination validity only. It does not ask GPT Pro to recalculate detailed formula math.",
    "",
    "Files:"
  ];

  for (const item of workItems) {
    lines.push(`- ${item.promptFile} -> ${item.outputFile} (${item.sampleUserId}, ${item.retrofitCount} retrofits)`);
  }

  return `${lines.join("\n")}\n`;
}

function compactTestCase(testCase, ordinal) {
  const normalized = testCase.normalizedProfile || {};
  return {
    schemaVersion: "retrofi_scenario_combination_packet.v1",
    testCaseOrdinal: ordinal,
    sampleUserId: testCase.sampleUserId,
    description: truncate(testCase.description, 500),
    userProfile: compactProfile(normalized),
    statusCounts: testCase.statusCounts || null,
    retrofitCount: (testCase.retrofits || []).length,
    retrofits: (testCase.retrofits || []).map(compactRetrofit)
  };
}

function compactProfile(profile = {}) {
  return {
    business: {
      organizationTypes: profile.business?.organizationTypes || [],
      primaryActivityText: truncate(profile.business?.primaryActivityText, 300),
      naicsCodes: profile.business?.naicsCodes || [],
      organizationSize: profile.business?.organizationSize || null
    },
    site: {
      address: profile.site?.addressStructured || null,
      geo: profile.site?.geo || null,
      utility: profile.site?.utility || null,
      ownershipRelationship: profile.site?.ownershipRelationship || null,
      buildingTypes: profile.site?.buildingTypes || [],
      squareFootage: profile.site?.squareFootage || null
    },
    project: profile.project || null,
    completeness: profile.completeness || null
  };
}

function compactRetrofit(retrofit = {}) {
  const preview = retrofit.savingsPreview || {};
  const selectedScenario = compactScenario(preview.selectedIncentiveScenario, "selected");
  const alternativeScenarios = (preview.alternativeScenarios || []).map((scenario, index) =>
    compactScenario(scenario, `alternative_${index + 1}`)
  );
  const scenarios = [selectedScenario, ...alternativeScenarios].filter(Boolean);

  return {
    retrofitTypeId: retrofit.retrofitTypeId,
    displayName: retrofit.displayName,
    parentCategory: retrofit.parentCategory || null,
    isPhysicalRetrofit: retrofit.isPhysicalRetrofit,
    opportunityCount: retrofit.opportunityCount,
    savingsPreview: {
      status: preview.status || null,
      unsupportedReason: preview.unsupportedReason || null,
      upfrontCostCents: preview.upfrontCostCents ?? null,
      oneTimeSavingsCents: preview.oneTimeSavingsCents ?? null,
      possibleGrantMoneyCents: preview.possibleGrantMoneyCents ?? null,
      annualRecurringSavingsCents: preview.annualRecurringSavingsCents ?? null,
      annualRecurringExpensesCents: preview.annualRecurringExpensesCents ?? null,
      netAnnualRecurringSavingsCents: preview.netAnnualRecurringSavingsCents ?? null,
      incentiveCalculationPackageCounts: preview.incentiveCalculationPackageCounts || null
    },
    scenarios,
    matchedOpportunities: (retrofit.opportunities || []).map(compactOpportunity),
    v2PackageSummaries: (preview.incentiveCalculationPackageSummaries || []).map(compactPackageSummary)
  };
}

function compactScenario(scenario, scenarioRole) {
  if (!scenario) return null;
  return {
    scenarioRole,
    id: scenario.id || null,
    name: truncate(scenario.name, 400),
    status: scenario.status || null,
    opportunityIds: scenario.opportunityIds || [],
    incentiveRuleIds: scenario.incentiveRuleIds || [],
    totalUpfrontSavingsCents: scenario.totalUpfrontSavingsCents ?? 0,
    possibleGrantMoneyCents: scenario.possibleGrantMoneyCents ?? 0,
    firstYearRecurringSavingsCents: scenario.firstYearRecurringSavingsCents ?? 0,
    firstYearRecurringExpensesCents: scenario.firstYearRecurringExpensesCents ?? 0,
    firstYearNetRecurringSavingsCents: scenario.firstYearNetRecurringSavingsCents ?? 0,
    firstYearTotalBenefitCents: scenario.firstYearTotalBenefitCents ?? 0,
    upfrontCostAfterSavingsCents: scenario.upfrontCostAfterSavingsCents ?? null,
    upfrontSavingsEntries: (scenario.upfrontSavingsEntries || []).map(compactSavingsEntry),
    recurringSavingsEntries: (scenario.recurringSavingsEntries || []).map(compactSavingsEntry),
    conflictExplanations: (scenario.conflictExplanations || []).map(compactConflict),
    capExplanations: strings(scenario.capExplanations).map((item) => truncate(item, 300)),
    traceWarnings: strings(scenario.trace?.warnings).map((item) => truncate(item, 300))
  };
}

function compactSavingsEntry(entry = {}) {
  return {
    kind: entry.kind || null,
    category: entry.category || null,
    label: truncate(entry.label, 300),
    amountCents: entry.amountCents ?? 0,
    source: entry.source || null,
    opportunityId: entry.opportunityId || null,
    incentiveRuleId: entry.incentiveRuleId || null,
    formula: entry.formula || null
  };
}

function compactConflict(conflict = {}) {
  if (typeof conflict === "string") return truncate(conflict, 300);
  return {
    opportunityId: conflict.opportunityId || null,
    conflictingOpportunityId: conflict.conflictingOpportunityId || null,
    reason: truncate(conflict.reason || conflict.explanation, 300)
  };
}

function compactOpportunity(opportunity = {}) {
  const repair = opportunity.opportunityDataRepair || {};
  return {
    opportunityId: opportunity.opportunityId,
    opportunityName: truncate(opportunity.opportunityName, 250),
    eligibilityStatus: opportunity.eligibilityStatus || null,
    availabilityStatus: opportunity.availabilityStatus || null,
    programType: opportunity.programType || opportunity.sourceSummary?.programType || repair.programType || null,
    administrator: opportunity.administrator || opportunity.sourceSummary?.administrator || repair.administrator || null,
    state: opportunity.state || opportunity.sourceSummary?.state || null,
    rankScore: opportunity.rankScore ?? null,
    matchConfidence: opportunity.confidence ?? null,
    opportunityDataConfidence: opportunity.opportunityDataConfidence ?? null,
    sourceConfidence: repair.confidence || null,
    sourceUrl: opportunity.sourceUrl || repair.websiteUrl || null,
    applicationUrl: opportunity.applicationUrl || repair.applicationUrl || null,
    matchedReasons: strings(opportunity.matchedReasons).slice(0, 8).map((item) => truncate(item, 220)),
    unresolvedRequirements: strings(opportunity.unresolvedRequirements).slice(0, 8).map((item) => truncate(item, 220)),
    blockers: strings([...(opportunity.blockers || []), ...(repair.blockers || [])]).slice(0, 8).map((item) => truncate(item, 220)),
    hardRequirements: strings(repair.hardRequirements).slice(0, 8).map((item) => truncate(item, 220)),
    eligibleApplicantTypes: repair.eligibleApplicantTypes || [],
    eligibleSectors: repair.eligibleSectors || [],
    eligibleRetrofitCategories: repair.eligibleRetrofitCategories || [],
    evidenceText: truncate(repair.evidenceText, 500),
    reasoningNotes: truncate(repair.reasoningNotes, 500)
  };
}

function compactPackageSummary(summary = {}) {
  return {
    opportunityId: summary.opportunityId,
    programName: truncate(summary.programName, 250),
    calculationStatus: summary.calculationStatus || null,
    runtimeInclusionStatus: summary.runtimeInclusionStatus || null,
    includedInRuntimeTotals: summary.includedInRuntimeTotals === true,
    confidence: summary.confidence || null,
    missingInputs: (summary.missingInputs || []).map((input) => ({
      inputKey: input.inputKey,
      effectId: input.effectId || null,
      label: truncate(input.label, 160)
    })),
    requiredInputs: strings(summary.requiredInputs).slice(0, 30),
    defaultedInputs: (summary.defaultedInputs || []).slice(0, 20).map((input) => ({
      inputKey: input.inputKey,
      source: input.source,
      defaultIsPlaceholder: input.defaultIsPlaceholder === true,
      defaultConfidence: input.defaultConfidence || null
    })),
    totals: summary.totals || null,
    effectSummaries: (summary.effectSummaries || []).map((effect) => ({
      effectId: effect.effectId,
      effectType: effect.effectType,
      calculationMethod: effect.calculationMethod || null,
      valueModelKind: effect.valueModelKind || null,
      cashValueClassification: effect.cashValueClassification || null,
      runtimeEligibleForTotals: effect.runtimeEligibleForTotals === true,
      humanReviewRequired: effect.humanReviewRequired === true,
      amountCents: effect.amountCents ?? 0,
      annualizedAmountCents: effect.annualizedAmountCents ?? 0,
      missingInputs: (effect.missingInputs || []).map((input) => input.inputKey)
    }))
  };
}

function parseArgs(argv) {
  const parsed = {
    inputPath: defaultInputPath,
    workRoot: defaultWorkRoot,
    date: defaultDate,
    force: false
  };

  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index];
    const next = argv[index + 1];
    if (arg === "--input" && next) {
      parsed.inputPath = resolveRepoPath(next);
      index += 1;
      continue;
    }
    if (arg === "--work-root" && next) {
      parsed.workRoot = resolveRepoPath(next);
      index += 1;
      continue;
    }
    if (arg === "--date" && next) {
      parsed.date = next;
      index += 1;
      continue;
    }
    if (arg === "--force") {
      parsed.force = true;
      continue;
    }
    if (arg === "--help" || arg === "-h") {
      printUsageAndExit();
    }
    throw new Error(`Unknown argument: ${arg}`);
  }

  return parsed;
}

function printUsageAndExit() {
  console.log(`Usage: node scripts/write-scenario-verification-work-packet.mjs [--input path] [--work-root path] [--date YYYY-MM-DD] [--force]`);
  process.exit(0);
}

function readJson(filePath) {
  return JSON.parse(fs.readFileSync(filePath, "utf8"));
}

function writeJson(filePath, value) {
  writeText(filePath, `${JSON.stringify(value, null, 2)}\n`);
}

function writeText(filePath, value) {
  fs.writeFileSync(filePath, value);
}

function resolveRepoPath(value) {
  return path.isAbsolute(value) ? value : path.join(repoRoot, value);
}

function strings(value) {
  if (!Array.isArray(value)) return [];
  return value.filter((item) => typeof item === "string" && item.trim()).map((item) => item.trim());
}

function truncate(value, maxLength) {
  if (value === undefined || value === null) return null;
  const text = String(value);
  if (text.length <= maxLength) return text;
  return `${text.slice(0, maxLength - 3)}...`;
}

function slugify(value) {
  return String(value || "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "_")
    .replace(/^_+|_+$/g, "")
    .slice(0, 80) || "test_case";
}

function pad(value) {
  return String(value).padStart(3, "0");
}
