import fs from "node:fs";
import path from "node:path";

const repoRoot = path.resolve(import.meta.dirname, "..");
const defaultTestCasesPath = path.join(repoRoot, "public", "sample_matching_test_cases.json");
const defaultPackagesPath = path.join(repoRoot, "data", "opportunity_incentive_calculation_packages_v2.json");
const defaultWorkRoot = path.join(repoRoot, "GPT Pro Work");
const defaultPacketName = "grant-expected-value-gap-repair-2026-07-03";
const currentDate = "2026-07-03";

const TAX_EFFECT_TYPES = new Set(["tax_credit", "tax_exemption", "tax_abatement", "tax_rate_preference", "property_tax_valuation"]);
const BLOCKED_RUNTIME_STATUSES = new Set([
  "source_inaccessible_repair_failure",
  "unavailable_archived",
  "no_calculable_value",
  "needs_repair_review",
  "custom_quote_estimate"
]);

const options = parseArgs(process.argv.slice(2));
const testCasesPath = path.resolve(options.testCasesPath || defaultTestCasesPath);
const packagesPath = path.resolve(options.packagesPath || defaultPackagesPath);
const workRoot = path.resolve(options.workRoot || defaultWorkRoot);
const packetDir = path.join(workRoot, options.packetName || defaultPacketName);
const targetsPerPrompt = Number(options.targetsPerPrompt || 1);

if (!Number.isInteger(targetsPerPrompt) || targetsPerPrompt <= 0) {
  throw new Error("--targetsPerPrompt must be a positive integer.");
}

if (fs.existsSync(packetDir) && !options.force) {
  throw new Error(`packet directory already exists: ${path.relative(repoRoot, packetDir)}. Use --force to overwrite.`);
}
if (fs.existsSync(packetDir) && options.force) {
  fs.rmSync(packetDir, { recursive: true, force: true });
}

const testCasePayload = readJson(testCasesPath);
const packagePayload = readJson(packagesPath);
const packages = packagePayload.packages || [];
const packageById = new Map(packages.map((pkg) => [pkg.opportunity_id, pkg]));
const gapRows = buildGrantExpectedValueGapRows(testCasePayload.testCases || []);
const targets = buildTargets(gapRows, packageById);
const promptCount = Math.ceil(targets.length / targetsPerPrompt);

fs.mkdirSync(packetDir, { recursive: true });
writeText(path.join(packetDir, "README.md"), buildReadme({ targets, gapRows, promptCount }));
writeJson(path.join(packetDir, "target_grant_expected_value_gaps.json"), buildTargetArtifact({ targets, gapRows }));

for (let promptIndex = 0; promptIndex < promptCount; promptIndex += 1) {
  const promptNumber = promptIndex + 1;
  const start = promptIndex * targetsPerPrompt;
  const batchTargets = targets.slice(start, start + targetsPerPrompt);
  const targetStart = start + 1;
  const targetEnd = start + batchTargets.length;
  const promptPath = path.join(packetDir, `prompt_${pad(promptNumber)}_grant_ev_gaps_${pad(targetStart)}_${pad(targetEnd)}.md`);
  const outputPath = path.join(packetDir, `output_${pad(promptNumber)}_grant_ev_gaps_${pad(targetStart)}_${pad(targetEnd)}.md`);

  writeText(
    promptPath,
    buildPrompt({
      promptNumber,
      targetStart,
      targetEnd,
      totalTargetCount: targets.length,
      targets: batchTargets,
      continuation: targets[targetEnd]?.opportunityId || null
    })
  );
  writeText(outputPath, "");
}

console.log(`Wrote ${path.relative(repoRoot, packetDir)}`);
console.log(`Runtime gap evaluations: ${gapRows.length}`);
console.log(`Unique opportunity/effect targets: ${targets.length}`);
console.log(`Prompt/output pairs: ${promptCount}`);

function buildGrantExpectedValueGapRows(testCases) {
  const rows = [];
  for (const testCase of testCases || []) {
    for (const retrofit of testCase.retrofits || []) {
      for (const summary of retrofit.savingsPreview?.incentiveCalculationPackageSummaries || []) {
        const outcomeClass = classifyPackageSummary(summary);
        const effectSummaries = summary.effectSummaries || [];
        if (outcomeClass !== "missing_evidence_or_inputs") continue;
        if (!effectSummaries.some(isGrantOrIncentiveEffect)) continue;

        for (const missing of summary.missingInputs || []) {
          const effectId = missing.effectId || missing.effect_id || findGrantExpectedValueEffectId(effectSummaries);
          if (!effectId) continue;
          rows.push({
            sampleUserId: testCase.sampleUserId,
            sampleName: testCase.name || testCase.sampleUserId,
            retrofitTypeId: retrofit.retrofitTypeId,
            retrofitDisplayName: retrofit.displayName || retrofit.retrofitTypeId,
            opportunityId: summary.opportunityId,
            programName: summary.programName,
            calculationStatus: summary.calculationStatus,
            sourceStatus: summary.sourceStatus,
            confidence: summary.confidence,
            runtimeInclusionStatus: summary.runtimeInclusionStatus,
            includedInRuntimeTotals: summary.includedInRuntimeTotals === true,
            missingInput: missing.inputKey || missing.input_key,
            effectId,
            requiredInputKeys: strings(summary.requiredInputs).slice(0, 32),
            defaultedInputKeys: (summary.defaultedInputs || [])
              .map((input) => input.canonicalInputKey || input.inputKey || input.input_key)
              .filter(Boolean)
              .slice(0, 16),
            resolvedInputKeys: (summary.resolvedInputs || [])
              .map((input) => input.canonicalInputKey || input.inputKey || input.input_key)
              .filter(Boolean)
              .slice(0, 16),
            effectSummaries: effectSummaries.map(compactEffectSummary)
          });
        }
      }
    }
  }
  return rows;
}

function buildTargets(rows, packageById) {
  const byTarget = new Map();
  for (const row of rows) {
    const key = `${row.opportunityId}|${row.effectId}`;
    if (!byTarget.has(key)) {
      const pkg = packageById.get(row.opportunityId);
      byTarget.set(key, {
        opportunityId: row.opportunityId,
        effectId: row.effectId,
        programName: row.programName,
        missingInputs: [],
        occurrenceCount: 0,
        sampleEvaluations: [],
        currentPackage: compactPackageForTarget(pkg, row.effectId)
      });
    }

    const target = byTarget.get(key);
    target.occurrenceCount += 1;
    target.missingInputs = uniqueStrings([...target.missingInputs, row.missingInput]);
    target.sampleEvaluations.push({
      sampleUserId: row.sampleUserId,
      sampleName: row.sampleName,
      retrofitTypeId: row.retrofitTypeId,
      retrofitDisplayName: row.retrofitDisplayName,
      runtimeInclusionStatus: row.runtimeInclusionStatus,
      calculationStatus: row.calculationStatus,
      confidence: row.confidence,
      missingInput: row.missingInput,
      requiredInputKeys: row.requiredInputKeys,
      defaultedInputKeys: row.defaultedInputKeys,
      resolvedInputKeys: row.resolvedInputKeys
    });
  }

  return [...byTarget.values()]
    .map((target) => ({
      ...target,
      sampleEvaluations: target.sampleEvaluations.slice(0, 8)
    }))
    .sort((a, b) => {
      const missingDelta = missingPriority(a.missingInputs) - missingPriority(b.missingInputs);
      if (missingDelta !== 0) return missingDelta;
      const countDelta = b.occurrenceCount - a.occurrenceCount;
      if (countDelta !== 0) return countDelta;
      return String(a.programName || a.opportunityId).localeCompare(String(b.programName || b.opportunityId));
    });
}

function compactPackageForTarget(pkg, effectId) {
  if (!pkg) return null;
  const effect = (pkg.effects || []).find((item) => item.effect_id === effectId);
  const evidenceRefs = new Set(effect?.evidence_refs || []);
  const referencedEvidence = (pkg.source_evidence || []).filter((evidence) => evidenceRefs.has(evidence.evidence_id));
  const sourceEvidence = referencedEvidence.length > 0 ? referencedEvidence : pkg.source_evidence || [];

  return {
    opportunityId: pkg.opportunity_id,
    programName: pkg.program_name || pkg.opportunity_id,
    packageCalculationStatus: pkg.calculation_status,
    availability: pkg.availability || null,
    customerSegments: pkg.customer_segments || [],
    retrofitTypes: pkg.retrofit_types || [],
    geography: pkg.geography || null,
    globalLimits: pkg.global_limits || [],
    globalCaps: pkg.global_caps || [],
    stacking: pkg.stacking || null,
    assumptions: strings(pkg.assumptions).slice(0, 12),
    packageConfidence: pkg.confidence || null,
    effect: effect ? compactEffect(effect) : null,
    packageInputRequirements: compactInputRequirements(pkg.input_requirements || []).slice(0, 32),
    sourceEvidence: sourceEvidence.map(compactEvidence).slice(0, 12),
    migrationMetadata: compactMigrationMetadata(pkg.migration_metadata)
  };
}

function compactEffect(effect) {
  return {
    effectId: effect.effect_id,
    effectType: effect.effect_type,
    label: truncate(effect.label, 1400),
    cashFlowDirection: effect.cash_flow_direction || null,
    timing: effect.timing || null,
    calculation: compactCalculation(effect.calculation || {}),
    limits: effect.limits || [],
    caps: effect.caps || [],
    requiredInputs: compactInputRequirements(effect.required_inputs || []),
    confidence: effect.confidence || null,
    repairMetadata: effect.repair_metadata || null
  };
}

function compactCalculation(calculation) {
  return {
    method: calculation.method || null,
    amountCents: calculation.amount_cents ?? null,
    percent: calculation.percent ?? calculation.cost_share_percent ?? null,
    conditionalAwardCents: calculation.conditional_award_cents ?? null,
    conditionalAwardFormula: truncate(calculation.conditional_award_formula, 1800),
    minAwardCents: calculation.min_award_cents ?? null,
    maxAwardCents: calculation.max_award_cents ?? null,
    probabilityDiscount: calculation.probability_discount ?? null,
    probabilityEvidenceType: calculation.probability_evidence_type ?? null,
    grantValueModelKind: calculation.grant_value_model_kind ?? calculation.conditional_award?.grant_value_model_kind ?? null,
    cashValueClassification: calculation.cash_value_classification ?? null,
    sourceRepairStatus: calculation.source_repair_status ?? null,
    rateRows: (calculation.rate_rows || []).slice(0, 12),
    conditionalAward: calculation.conditional_award || null,
    probabilityModel: calculation.probability_model || null,
    expectedValueRecommendation: calculation.expected_value_recommendation || null,
    fallbackPriorSuggestion: calculation.fallback_prior_suggestion || null,
    reason: truncate(calculation.reason, 600)
  };
}

function compactInputRequirements(inputs) {
  return (inputs || []).map((input) => ({
    inputKey: input.input_key || input.inputKey,
    label: input.label || input.input_key || input.inputKey,
    valueType: input.value_type || input.valueType || null,
    missingSeverity: input.missing_severity || input.missingSeverity || null
  }));
}

function compactEffectSummary(effect) {
  return {
    effectId: effect.effectId || effect.effect_id,
    effectType: effect.effectType || effect.effect_type,
    calculationMethod: effect.calculationMethod || null,
    valueModelKind: effect.valueModelKind || null,
    cashValueClassification: effect.cashValueClassification || null,
    includedInUserFacingTotalDefault: effect.includedInUserFacingTotalDefault === true,
    humanReviewRequired: effect.humanReviewRequired === true,
    amountCents: effect.amountCents || 0,
    missingInputs: effect.missingInputs || []
  };
}

function compactEvidence(evidence) {
  return {
    evidenceId: evidence.evidence_id || evidence.evidenceId || null,
    sourceType: evidence.source_type || evidence.sourceType || null,
    quote: truncate(evidence.quote, 900),
    sourceUrls: strings(evidence.source_urls || evidence.sourceUrls).slice(0, 12),
    evidenceConfidence: evidence.evidence_confidence ?? evidence.evidenceConfidence ?? null
  };
}

function compactMigrationMetadata(metadata) {
  if (!metadata) return null;
  return {
    formulaRateTableRepairArtifact: metadata.formula_rate_table_repair_artifact || null,
    grantProbabilityRepairArtifact: metadata.grant_probability_repair_artifact || null,
    grantEstimationRepairArtifact: metadata.grant_estimation_repair_artifact || null
  };
}

function buildReadme({ targets, gapRows, promptCount }) {
  return `# Grant Expected-Value Gap Repair Work Packet

Generated: ${new Date().toISOString()}

This folder contains GPT Pro prompts for the current grant expected-value gaps from \`public/sample_matching_test_cases.json\`.

- Runtime missing-evidence/input evaluations: ${gapRows.length}
- Unique opportunity/effect targets: ${targets.length}
- Prompt/output pairs: ${promptCount}

Paste each prompt into GPT Pro, then paste the response into the matching blank \`output_*.md\` file.

The prompts ask for \`retrofi_grant_probability_repair.v1\`, which is the schema consumed by \`scripts/intake-v2-estimate-gpt-pro-outputs.mjs\`.
`;
}

function buildTargetArtifact({ targets, gapRows }) {
  return {
    schemaVersion: "retrofi_grant_expected_value_gap_work_packet.v1",
    generatedAt: new Date().toISOString(),
    sourceFiles: {
      testCases: path.relative(repoRoot, testCasesPath),
      packages: path.relative(repoRoot, packagesPath)
    },
    runtimeGapEvaluationCount: gapRows.length,
    uniqueTargetCount: targets.length,
    missingInputCounts: countBy(gapRows, (row) => row.missingInput),
    targets
  };
}

function buildPrompt({ promptNumber, targetStart, targetEnd, totalTargetCount, targets, continuation }) {
  const promptId = `grant_ev_gap_${pad(targetStart)}_${pad(targetEnd)}`;
  const batchRange = `${pad(targetStart)}-${pad(targetEnd)}`;
  return `You are helping RetroFi repair grant and incentive expected-value gaps.

Current date: ${currentDate}. Program status, deadlines, budgets, award statistics, funding availability, and award notices are time-sensitive. Check official sources wherever possible.

## Prompt ${promptId}

These targets come from RetroFi's 2026-07-03 grant/tax coverage run. There were 31 runtime missing-evidence/input evaluations, but they collapse to ${totalTargetCount} unique opportunity/effect targets. This prompt covers targets ${targetStart}-${targetEnd}.

For each target below, repair the grant expected-value metadata. We need two separate things:

1. Conditional award amount: what the matched applicant/project could receive if selected or approved, using source-backed formulas, ranges, caps, or approved-award records.
2. Probability evidence: whether there is enough evidence to discount a competitive grant into a conservative expected value.

Do not confuse these. A source saying "up to $250,000" gives a possible cap, not an expected value. Do not include max-only competitive grants in user-facing savings totals unless probability evidence exists or RetroFi later approves a human-reviewed prior.

If no defensible probability exists, say so. If no source-backed conditional award can be calculated before an official award decision, say so. Those are valid repairs because they let RetroFi intentionally suppress the estimate instead of treating it as a broken missing input.

## Output JSON schema

Return one JSON object only, no markdown fences.

{
  "schemaVersion": "retrofi_grant_probability_repair.v1",
  "researchedAt": "${currentDate}",
  "promptId": "${promptId}",
  "batchRange": "${batchRange}",
  "repairs": [
    {
      "opportunityId": "string",
      "effectId": "string",
      "programName": "string",
      "availabilityStatus": "active|closed|exhausted|waitlist|source_inaccessible|unknown",
      "cashValueClassification": "cash_grant|reimbursement|rebate|tax_credit|loan|financing|technical_assistance|unknown",
      "sourceConfidence": "high|medium|low",
      "grantValueModelKind": "fixed_amount|fixed_tier_amount|percent_of_eligible_cost|capped_percent_of_eligible_cost|per_unit_award|hybrid_rate_plus_cap|competitive_max_only|competitive_award_range|competitive_cost_share|formula_grant|study_or_audit_grant|rebate_labeled_as_grant|loan_or_financing_labeled_as_grant|tax_credit_mixed_with_grant|non_cash_technical_assistance|no_calculable_value|source_inaccessible|other",
      "conditionalAward": {
        "status": "calculable|needs_project_cost|needs_quote|needs_project_scope|not_calculable|zero_value|source_inaccessible",
        "formulaText": "string",
        "conditionalAwardCents": null,
        "minAwardCents": null,
        "maxAwardCents": null,
        "costSharePercent": null,
        "requiredProjectInputs": ["string"],
        "calculationTrace": ["string"]
      },
      "probabilityEvidence": {
        "status": "evidence_found|evidence_not_found|not_required_deterministic|first_come_funding_unknown|human_review_required|not_applicable",
        "probabilityDiscount": null,
        "probabilityEvidenceType": "historical_success_rate|budget_and_expected_awards|historical_awards_only|first_come_funds_confirmed|first_come_funding_unknown|scoring_criteria_only|eligibility_only|human_reviewed_prior|not_required|none",
        "historicalAwardsCount": null,
        "historicalApplicationsCount": null,
        "totalProgramBudgetCents": null,
        "expectedAwardCount": null,
        "competitionScope": "narrow_local|utility_territory|sector_specific|statewide_broad|federal_broad|unknown",
        "probabilityNotes": "string"
      },
      "fallbackPriorSuggestion": {
        "probabilityDiscount": null,
        "basis": "string",
        "shouldRetroFiUseWithoutHumanApproval": false
      },
      "expectedValueRecommendation": {
        "estimateStatus": "deterministic_estimate|expected_value_estimate|needs_quote|needs_project_scope|needs_funding_check|not_calculable|zero_value|human_review_required|suppressed",
        "expectedValueCents": null,
        "estimateConfidence": "high|medium|low",
        "includeInUserFacingTotalDefault": false,
        "reasonCodes": ["string"]
      },
      "sourceUrlsChecked": ["string"],
      "evidenceText": "string",
      "reasoningNotes": "string"
    }
  ],
  "continueFromOpportunityId": ${JSON.stringify(continuation)}
}

## Rules

- Return exactly ${targets.length} repairs, one for each target.
- Preserve each target's \`opportunityId\` and \`effectId\` exactly.
- Separate source confidence, estimate confidence, and matching. Matching is already repaired.
- If the incentive is deterministic, set probability evidence to \`not_required_deterministic\`.
- If the incentive is a loan, tax credit, financing product, or non-cash assistance, classify it and do not count it as a cash grant estimate.
- If the source only says "up to" with no probability anchor, set \`probabilityDiscount\` to null and \`includeInUserFacingTotalDefault\` to false.
- If direct probability evidence is unavailable, you may suggest a low-confidence fallback prior only in \`fallbackPriorSuggestion\`, and keep \`shouldRetroFiUseWithoutHumanApproval\` false.
- If expected value is not defensible, set \`expectedValueRecommendation.estimateStatus\` to \`suppressed\` or \`human_review_required\`.
- Use cents for dollar amounts.
- Cite the official URLs checked.

## Targets ${targetStart}-${targetEnd}

${JSON.stringify(targets, null, 2)}
`;
}

function classifyPackageSummary(summary) {
  if (summary.runtimeInclusionStatus === "included") return "calculated_and_included";
  if (summary.runtimeInclusionStatus === "legacy_rule_preferred") return "legacy_rule_preferred";
  if (summary.runtimeInclusionStatus === "missing_inputs" || (summary.missingInputs || []).length > 0) return "missing_evidence_or_inputs";
  if (summary.runtimeInclusionStatus === "non_monetary_workflow") return "non_monetary_workflow";
  if (BLOCKED_RUNTIME_STATUSES.has(summary.runtimeInclusionStatus)) return "source_or_package_blocked";

  const hasPositiveAmount = (summary.effectSummaries || []).some((effect) => Number(effect.amountCents || 0) > 0);
  if (["not_user_facing_default", "human_review_required", "low_confidence"].includes(summary.runtimeInclusionStatus)) {
    return hasPositiveAmount ? "computed_but_suppressed" : "suppressed_without_amount";
  }

  if (summary.runtimeInclusionStatus === "no_supported_effect_amount") return "calculated_zero_or_no_supported_amount";
  return "other_suppressed";
}

function isGrantOrIncentiveEffect(effect) {
  const cashClass = effect.cashValueClassification || effect.cash_value_classification || "";
  const effectType = effect.effectType || effect.effect_type;
  if (effectType === "grant_expected_value") return true;
  if (["cash_grant", "reimbursement", "rebate"].includes(cashClass)) return true;
  if (effectType === "one_time_savings" || effectType === "recurring_savings") return true;
  if (TAX_EFFECT_TYPES.has(effectType)) return false;
  return false;
}

function findGrantExpectedValueEffectId(effectSummaries) {
  const effect = (effectSummaries || []).find((item) => (item.effectType || item.effect_type) === "grant_expected_value");
  return effect?.effectId || effect?.effect_id || null;
}

function missingPriority(missingInputs) {
  if (missingInputs.includes("conditional_award_amount")) return 0;
  if (missingInputs.includes("award_probability")) return 1;
  return 2;
}

function parseArgs(args) {
  const parsed = {
    force: false
  };
  for (let index = 0; index < args.length; index += 1) {
    const arg = args[index];
    if (!arg.startsWith("--")) continue;
    const key = arg.slice(2);
    const next = args[index + 1];
    if (!next || next.startsWith("--")) {
      parsed[key] = true;
    } else {
      parsed[key] = next;
      index += 1;
    }
  }
  return parsed;
}

function readJson(filePath) {
  return JSON.parse(fs.readFileSync(filePath, "utf8"));
}

function writeJson(filePath, value) {
  writeText(filePath, `${JSON.stringify(value, null, 2)}\n`);
}

function writeText(filePath, value) {
  fs.writeFileSync(filePath, value, "utf8");
}

function countBy(values, getKey) {
  const counts = {};
  for (const value of values || []) {
    const key = getKey(value) || "unknown";
    counts[key] = (counts[key] || 0) + 1;
  }
  return Object.fromEntries(Object.entries(counts).sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0])));
}

function uniqueStrings(values) {
  return [...new Set(strings(values))];
}

function strings(values) {
  return (Array.isArray(values) ? values : [values])
    .flatMap((value) => {
      if (value === null || value === undefined) return [];
      return [String(value).trim()];
    })
    .filter(Boolean);
}

function truncate(value, maxLength) {
  const text = String(value || "").trim();
  if (!text || text.length <= maxLength) return text;
  return `${text.slice(0, maxLength - 3)}...`;
}

function pad(value) {
  return String(value).padStart(3, "0");
}
