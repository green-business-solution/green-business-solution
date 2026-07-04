import fs from "node:fs";
import path from "node:path";

const CURRENT_DATE = "2026-07-04";
const REPO_ROOT = path.resolve(import.meta.dirname, "..");
const DEFAULT_BATCH_SIZE = 4;

const TEST_CASE_SOURCE = path.join(REPO_ROOT, "public", "sample_matching_test_cases.json");
const PACKAGE_SOURCE = path.join(REPO_ROOT, "data", "opportunity_incentive_calculation_packages_v2.json");
const OUTPUT_DIR = path.join(REPO_ROOT, "GPT Pro Work", `grant-production-action-repair-${CURRENT_DATE}`);

const TAX_EFFECT_TYPES = new Set(["tax_credit", "tax_exemption", "tax_abatement", "tax_rate_preference", "property_tax_valuation"]);
const GRANT_CASH_CLASSIFICATIONS = new Set(["cash_grant", "reimbursement", "rebate"]);
const NON_GRANT_CASH_CLASSIFICATIONS = new Set(["loan", "financing", "technical_assistance", "tax_credit"]);
const FORM_INPUT_STATUSES = new Set(["missing_inputs", "needs_quote", "needs_project_scope", "custom_quote_estimate"]);

const force = process.argv.includes("--force");
const batchSize = batchSizeFromArgs();

function main() {
  const testCasePayload = readJson(TEST_CASE_SOURCE);
  const packagePayload = readJson(PACKAGE_SOURCE);
  const packagesByOpportunityId = new Map((packagePayload.packages || []).map((pkg) => [pkg.opportunity_id, pkg]));

  const rows = buildPackageRows(testCasePayload.testCases || []);
  const actionRows = rows.filter((row) => row.grantProductionAction === "grant_formula_repair_required");
  const targets = buildTargets(actionRows, packagesByOpportunityId);
  const batches = chunk(targets, batchSize);

  ensureOutputDirectory(OUTPUT_DIR);

  const promptFiles = batches.map((batch, index) => {
    const number = String(index + 1).padStart(3, "0");
    const first = String(index * batchSize + 1).padStart(3, "0");
    const last = String(index * batchSize + batch.length).padStart(3, "0");
    const slug = `grant-production-action-repair-${first}-${last}`;
    const promptName = `prompt_${number}_${slug}.md`;
    const outputName = `output_${number}_${slug}.md`;
    fs.writeFileSync(
      path.join(OUTPUT_DIR, promptName),
      buildPrompt({
        promptId: `grant_production_action_repair_${number}`,
        batch,
        index: index + 1,
        total: batches.length
      })
    );
    fs.writeFileSync(path.join(OUTPUT_DIR, outputName), "");
    return {
      promptId: `grant_production_action_repair_${number}`,
      promptName,
      outputName,
      targetOpportunityIds: batch.map((target) => target.opportunityId)
    };
  });

  const manifest = {
    schemaVersion: "retrofi_grant_production_action_repair_work_packet_manifest.v1",
    generatedAt: new Date().toISOString(),
    currentDate: CURRENT_DATE,
    sourceFiles: {
      testCases: path.relative(REPO_ROOT, TEST_CASE_SOURCE),
      packages: path.relative(REPO_ROOT, PACKAGE_SOURCE)
    },
    targetAction: "grant_formula_repair_required",
    targetCount: targets.length,
    evaluationCount: actionRows.length,
    targetsPerPrompt: batchSize,
    promptCount: promptFiles.length,
    prompts: promptFiles
  };

  writeJson(path.join(OUTPUT_DIR, "target_grant_formula_repair_required.json"), {
    schemaVersion: "retrofi_grant_formula_repair_required_targets.v1",
    generatedAt: manifest.generatedAt,
    currentDate: CURRENT_DATE,
    targetCount: targets.length,
    evaluationCount: actionRows.length,
    targets
  });
  writeJson(path.join(OUTPUT_DIR, "target_manifest.json"), manifest);
  fs.writeFileSync(path.join(OUTPUT_DIR, "README.md"), buildReadme(manifest));

  console.log(`Wrote grant production action repair packet to ${path.relative(REPO_ROOT, OUTPUT_DIR)}`);
  console.log(`Targets: ${targets.length}`);
  console.log(`Prompts: ${promptFiles.length}`);
  console.log(`Targets per prompt: ${batchSize}`);
}

function batchSizeFromArgs() {
  const arg = process.argv.find((item) => item.startsWith("--batch-size="));
  if (!arg) return DEFAULT_BATCH_SIZE;
  const value = Number(arg.split("=")[1]);
  return Number.isInteger(value) && value > 0 ? value : DEFAULT_BATCH_SIZE;
}

function readJson(filePath) {
  return JSON.parse(fs.readFileSync(filePath, "utf8"));
}

function writeJson(filePath, value) {
  fs.writeFileSync(filePath, `${JSON.stringify(value, null, 2)}\n`);
}

function ensureOutputDirectory(dir) {
  if (fs.existsSync(dir) && !force) {
    const nonEmptyOutputs = findFiles(dir, (filePath) => {
      const fileName = path.basename(filePath);
      return fileName.startsWith("output_") && fs.statSync(filePath).size > 0;
    });
    if (nonEmptyOutputs.length) {
      throw new Error(`Refusing to overwrite ${path.relative(REPO_ROOT, dir)}; ${nonEmptyOutputs.length} output files are non-empty.`);
    }
  }
  fs.rmSync(dir, { recursive: true, force: true });
  fs.mkdirSync(dir, { recursive: true });
}

function findFiles(dir, predicate) {
  const matches = [];
  if (!fs.existsSync(dir)) return matches;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const entryPath = path.join(dir, entry.name);
    if (entry.isDirectory()) matches.push(...findFiles(entryPath, predicate));
    else if (predicate(entryPath)) matches.push(entryPath);
  }
  return matches;
}

function buildPackageRows(testCases) {
  const rows = [];
  for (const testCase of testCases) {
    for (const retrofit of testCase.retrofits || []) {
      for (const summary of retrofit.savingsPreview?.incentiveCalculationPackageSummaries || []) {
        const effects = summary.effectSummaries || [];
        const row = {
          sampleUserId: testCase.sampleUserId,
          sampleName: testCase.name || testCase.sampleUserId,
          retrofitTypeId: retrofit.retrofitTypeId,
          opportunityId: summary.opportunityId,
          programName: summary.programName,
          runtimeInclusionStatus: summary.runtimeInclusionStatus,
          calculationStatus: summary.calculationStatus,
          sourceStatus: summary.sourceStatus,
          confidence: summary.confidence,
          missingInputs: summary.missingInputs || [],
          defaultedInputs: summary.defaultedInputs || [],
          effectTypes: unique(effects.map((effect) => effect.effectType)),
          valueModelKinds: unique(effects.map((effect) => effect.valueModelKind)),
          cashValueClassifications: unique(effects.map((effect) => effect.cashValueClassification)),
          estimateStatuses: unique(effects.map((effect) => effect.estimateStatus)),
          repairStatuses: unique(effects.map((effect) => effect.repairStatus)),
          repairedCalculationStatuses: unique(effects.map((effect) => effect.repairedCalculationStatus)),
          reasonCodes: unique(effects.flatMap((effect) => effect.reasonCodes || [])),
          humanReviewReasons: unique(effects.flatMap((effect) => effect.humanReviewReasons || [])),
          taxRelated: effects.some((effect) => TAX_EFFECT_TYPES.has(effect.effectType)),
          grantOrIncentiveRelated: effects.some(isGrantOrIncentiveEffect),
          grantEstimateRelated: effects.some(isGrantEstimateEffect),
          nonGrantWorkflowRelated: effects.some(isNonGrantWorkflowEffect),
          computedAmountCents: sum(effects, (effect) => Number(effect.amountCents || 0)),
          includedInRuntimeTotals: summary.includedInRuntimeTotals === true
        };
        const action = classifyGrantProductionAction(row);
        rows.push({ ...row, grantProductionAction: action.action, grantProductionReason: action.reason });
      }
    }
  }
  return rows.filter((row) => row.grantOrIncentiveRelated && !row.taxRelated);
}

function classifyGrantProductionAction(row) {
  const decisionText = [
    row.runtimeInclusionStatus,
    row.calculationStatus,
    row.sourceStatus,
    ...(row.estimateStatuses || []),
    ...(row.repairStatuses || []),
    ...(row.repairedCalculationStatuses || []),
    ...(row.reasonCodes || []),
    ...(row.humanReviewReasons || [])
  ]
    .filter(Boolean)
    .join(" ")
    .toLowerCase();

  if (row.includedInRuntimeTotals) return { action: "production_ready_included", reason: "The package already contributes a supported runtime amount." };
  if (!row.grantEstimateRelated) return { action: "not_grant_estimation_target", reason: "The row is an incentive workflow, but not a grant/rebate/reimbursement estimate target." };
  if (FORM_INPUT_STATUSES.has(row.runtimeInclusionStatus) || row.missingInputs.length > 0) {
    return { action: "form_input_required", reason: "The source-backed rule needs user, quote, bill, filing, or project-scope inputs before estimating." };
  }
  if (row.runtimeInclusionStatus === "needs_funding_check" || decisionText.includes("needs_funding_check")) {
    return { action: "funding_refresh_required", reason: "The estimate depends on current funding availability, waitlist, or while-funds-last status." };
  }
  if (row.nonGrantWorkflowRelated || row.runtimeInclusionStatus === "non_monetary_workflow" || isClearlyNonGrantWorkflow(row)) {
    return { action: "non_grant_workflow", reason: "The opportunity is better handled outside grant estimation." };
  }
  if (
    row.runtimeInclusionStatus === "source_inaccessible_repair_failure" ||
    row.runtimeInclusionStatus === "unavailable_archived" ||
    decisionText.includes("source_inaccessible") ||
    decisionText.includes("program_closed") ||
    decisionText.includes("unavailable_archived")
  ) {
    return { action: "archive_or_exclude", reason: "The source is inaccessible, unavailable, closed, or otherwise not reliable enough to show." };
  }
  if (row.runtimeInclusionStatus === "no_calculable_value" || decisionText.includes("no_calculable_value")) {
    return { action: "zero_placeholder_no_calculable_value", reason: "No defensible formula or expected-value model exists, so the grant contribution should remain $0." };
  }
  return { action: "grant_formula_repair_required", reason: "The package is grant/rebate-related but policy or confidence metadata still prevents a production estimate." };
}

function buildTargets(rows, packagesByOpportunityId) {
  const grouped = new Map();
  for (const row of rows) {
    if (!grouped.has(row.opportunityId)) {
      grouped.set(row.opportunityId, {
        opportunityId: row.opportunityId,
        programName: row.programName || row.opportunityId,
        evaluationCount: 0,
        runtimeStatusCounts: {},
        calculationStatusCounts: {},
        retrofitTypeIds: new Set(),
        sampleRows: [],
        reasonCodes: [],
        humanReviewReasons: [],
        missingInputKeys: [],
        defaultedInputKeys: [],
        grantProductionReason: row.grantProductionReason
      });
    }
    const target = grouped.get(row.opportunityId);
    target.evaluationCount += 1;
    increment(target.runtimeStatusCounts, row.runtimeInclusionStatus || "unknown");
    increment(target.calculationStatusCounts, row.calculationStatus || "unknown");
    target.retrofitTypeIds.add(row.retrofitTypeId);
    if (target.sampleRows.length < 5) {
      target.sampleRows.push({
        sampleUserId: row.sampleUserId,
        retrofitTypeId: row.retrofitTypeId,
        runtimeInclusionStatus: row.runtimeInclusionStatus,
        computedAmountCents: row.computedAmountCents
      });
    }
    target.reasonCodes.push(...(row.reasonCodes || []));
    target.humanReviewReasons.push(...(row.humanReviewReasons || []));
    target.missingInputKeys.push(...(row.missingInputs || []).map((input) => input.inputKey).filter(Boolean));
    target.defaultedInputKeys.push(...(row.defaultedInputs || []).map((input) => input.inputKey).filter(Boolean));
  }

  return [...grouped.values()]
    .map((target) => ({
      ...target,
      retrofitTypeIds: [...target.retrofitTypeIds].sort(),
      topReasonCodes: topCounts(target.reasonCodes, 30),
      topHumanReviewReasons: topCounts(target.humanReviewReasons, 30),
      topMissingInputKeys: topCounts(target.missingInputKeys, 30),
      topDefaultedInputKeys: topCounts(target.defaultedInputKeys, 30),
      currentPackage: compactPackage(packagesByOpportunityId.get(target.opportunityId))
    }))
    .sort((a, b) => b.evaluationCount - a.evaluationCount || a.programName.localeCompare(b.programName));
}

function compactPackage(pkg) {
  if (!pkg) return null;
  return {
    opportunity_id: pkg.opportunity_id,
    program_name: pkg.program_name,
    calculation_status: pkg.calculation_status,
    availability: pkg.availability,
    customer_segments: pkg.customer_segments,
    retrofit_types: pkg.retrofit_types,
    geography: pkg.geography,
    effects: (pkg.effects || []).filter(isRelevantPackageEffect).map(compactEffect),
    input_requirements: (pkg.input_requirements || []).map(compactRequiredInput),
    measure_catalogs: (pkg.measure_catalogs || []).slice(0, 2).map(compactMeasureCatalog),
    rate_tables: (pkg.rate_tables || []).slice(0, 2).map(compactRateTable),
    global_limits: pkg.global_limits,
    global_caps: pkg.global_caps,
    stacking: pkg.stacking,
    assumptions: pkg.assumptions,
    source_evidence: pkg.source_evidence,
    confidence: pkg.confidence
  };
}

function isRelevantPackageEffect(effect) {
  const repair = effect.repair_metadata || {};
  return (
    effect.effect_type === "grant_expected_value" ||
    ["one_time_savings", "recurring_savings"].includes(effect.effect_type) ||
    GRANT_CASH_CLASSIFICATIONS.has(repair.cash_value_classification) ||
    /grant|rebate|reimbursement/i.test(`${effect.label || ""} ${repair.value_model_kind || ""}`)
  );
}

function compactEffect(effect) {
  return {
    effect_id: effect.effect_id,
    label: effect.label,
    effect_type: effect.effect_type,
    cash_flow_direction: effect.cash_flow_direction,
    timing: effect.timing,
    calculation: effect.calculation,
    limits: effect.limits,
    caps: effect.caps,
    required_inputs: (effect.required_inputs || []).map(compactRequiredInput),
    repair_metadata: effect.repair_metadata,
    confidence: effect.confidence
  };
}

function compactRequiredInput(input) {
  if (typeof input === "string") return { input_key: input };
  return {
    input_key: input?.input_key,
    label: input?.label,
    value_type: input?.value_type,
    missing_severity: input?.missing_severity,
    source_precedence: input?.source_precedence,
    required_for: input?.required_for
  };
}

function compactMeasureCatalog(catalog) {
  return {
    catalog_id: catalog.catalog_id,
    name: catalog.name,
    selection_input: catalog.selection_input,
    measure_count: catalog.measures?.length || 0,
    sample_measures: (catalog.measures || []).slice(0, 12).map((measure) => ({
      measure_id: measure.measure_id,
      name: measure.name,
      category: measure.category,
      calculation: measure.calculation,
      limits: measure.limits,
      required_inputs: measure.required_inputs,
      eligibility_filters: measure.eligibility_filters,
      source_row: measure.source_row
    }))
  };
}

function compactRateTable(table) {
  return {
    table_id: table.table_id,
    name: table.name,
    dimensions: table.dimensions,
    row_count: table.rows?.length || 0,
    sample_rows: (table.rows || []).slice(0, 18)
  };
}

function buildPrompt({ promptId, batch, index, total }) {
  return `You are helping RetroFi make grant/rebate/reimbursement estimation production-ready.

Current date: ${CURRENT_DATE}. Program status, funding windows, application rounds, award history, and deadlines are time-sensitive. Use official sources wherever possible.

# Grant Production Action Repair Batch ${index} of ${total}

Prompt ID: ${promptId}

This prompt contains ${batch.length} unique opportunities. Four opportunities per prompt is intentional: do deeper source repair for each opportunity instead of short answers.

## What RetroFi needs

For each opportunity, determine the correct production handling:

- If source-backed formula/caps/rate table exist and all missing values are normal user/project facts, return a deterministic or form-gated rule.
- If it is competitive, return expected value only when a defensible probability anchor exists, such as historical awards/applications or published budget plus expected award count.
- Treat "up to" language as a cap, not an expected award.
- If the program is first-come or while-funds-last, separate the deterministic formula from funding-status uncertainty.
- If it is not actually a grant/rebate/reimbursement, route it outside the grant estimator.
- If no defensible dollar formula exists, use a $0 placeholder and do not include it in user-facing totals.
- If official sources are inaccessible/closed/stale and no reliable official evidence exists, recommend archive/exclude.

## Return JSON only

Return exactly one JSON object, no markdown fences:

{
  "schemaVersion": "retrofi_grant_production_action_repair_batch.v1",
  "researchedAt": "${CURRENT_DATE}",
  "promptId": "${promptId}",
  "repairs": [
    {
      "opportunityId": "string",
      "programName": "string",
      "recommendedAction": "include_deterministic_estimate|include_expected_value_estimate|form_input_required|funding_refresh_required|zero_placeholder_no_calculable_value|non_grant_workflow|archive_or_exclude|keep_suppressed_needs_more_research",
      "availabilityStatus": "active|upcoming|closed|exhausted|waitlist|source_inaccessible|unknown",
      "sourceConfidence": "high|medium|low",
      "estimateConfidence": "high|medium|low",
      "cashValueClassification": "cash_grant|reimbursement|rebate|tax_credit|loan|financing|technical_assistance|unknown",
      "valueModelKind": "fixed_amount|fixed_tier_amount|percent_of_eligible_cost|capped_percent_of_eligible_cost|per_unit_award|hybrid_rate_plus_cap|competitive_max_only|competitive_award_range|competitive_cost_share|formula_grant|study_or_audit_grant|rebate_labeled_as_grant|loan_or_financing_labeled_as_grant|tax_credit_mixed_with_grant|non_cash_technical_assistance|no_calculable_value|source_inaccessible|other",
      "formulaRepair": {
        "status": "calculable_now|needs_user_input|needs_quote_or_invoice|needs_utility_bill|needs_tax_document|needs_application_or_award_document|not_calculable|zero_value|source_inaccessible",
        "formulaText": "string",
        "formulaExpression": "string or null",
        "amountCents": null,
        "minAwardCents": null,
        "maxAwardCents": null,
        "costSharePercent": null,
        "perUnitRates": [],
        "eligibleCostCategories": ["string"],
        "ineligibleCostCategories": ["string"],
        "caps": {
          "maxAwardCents": null,
          "maxPercentOfEligibleCost": null,
          "maxUnits": null,
          "perCustomerCapCents": null,
          "programBudgetCents": null
        },
        "requiredInputs": [
          {
            "inputKey": "string",
            "label": "string",
            "valueType": "money_cents|number|boolean|enum|string|date",
            "inputSource": "source_constant|server_derivable|user_profile|retrofit_scope|quote_or_invoice|utility_bill|tax_document|application_or_award_document",
            "userOverrideAllowed": true,
            "whyNeeded": "string"
          }
        ],
        "calculationTraceTemplate": ["string"]
      },
      "probabilityModel": {
        "probabilityRequired": true,
        "probabilityDiscount": null,
        "probabilityEvidenceType": "not_required|historical_success_rate|budget_and_expected_awards|historical_awards_only|first_come_funds_confirmed|first_come_funding_unknown|scoring_criteria_only|eligibility_only|human_reviewed_prior|none",
        "historicalAwardsCount": null,
        "historicalApplicationsCount": null,
        "totalProgramBudgetCents": null,
        "expectedAwardCount": null,
        "averageHistoricalAwardCents": null,
        "medianHistoricalAwardCents": null,
        "competitionScope": "narrow_local|utility_territory|sector_specific|statewide_broad|federal_broad|unknown",
        "probabilityNotes": "string"
      },
      "runtimeRecommendation": {
        "estimateStatus": "deterministic_estimate|expected_value_estimate|needs_quote|needs_project_scope|needs_funding_check|not_calculable|zero_value|human_review_required|suppressed",
        "includeInUserFacingTotalDefault": false,
        "includedAmountPolicy": "estimated_amount|expected_value|lower_bound|zero|not_included",
        "userFacingLabel": "string",
        "userFacingCaveat": "string",
        "reasonCodes": ["string"]
      },
      "timingAndApplicationRules": {
        "approvalRequiredBeforePurchase": null,
        "approvalRequiredBeforeInstallation": null,
        "applicationDeadline": null,
        "fundingStatus": "open_funds_available|open_while_funds_last|waitlist|closed|exhausted|unknown",
        "paymentTiming": "upfront_grant|reservation_then_reimbursement|post_purchase_rebate|post_installation_reimbursement|tax_filing|loan_closing|unknown"
      },
      "sourceUrlsChecked": ["string"],
      "evidenceText": "string",
      "reasoningNotes": "string",
      "patchInstructions": {
        "calculationStatus": "string",
        "effectRepairMetadataChanges": ["string"],
        "runtimeStatusExpectedAfterPatch": "included|needs_quote|needs_funding_check|suppressed_by_policy|not_user_facing_default|no_calculable_value|non_monetary_workflow|unavailable_archived"
      }
    }
  ]
}

## Targets

${JSON.stringify(batch, null, 2)}
`;
}

function buildReadme(manifest) {
  return `# Grant Production Action Repair GPT Pro Packet

Generated: ${manifest.generatedAt}

This packet targets the current \`grant_formula_repair_required\` opportunities from the test-case grant/tax coverage flow.

- Target opportunities: ${manifest.targetCount}
- Repeated test-case evaluations represented: ${manifest.evaluationCount}
- Targets per prompt: ${manifest.targetsPerPrompt}
- Prompt count: ${manifest.promptCount}

Run each \`prompt_*.md\` in GPT Pro and paste the answer into the matching blank \`output_*.md\` file. Keep file names unchanged.

Target list: \`target_grant_formula_repair_required.json\`
Manifest: \`target_manifest.json\`
`;
}

function isGrantOrIncentiveEffect(effect) {
  const cashClass = effect.cashValueClassification || "";
  if (effect.effectType === "grant_expected_value") return true;
  if (GRANT_CASH_CLASSIFICATIONS.has(cashClass)) return true;
  if (effect.effectType === "one_time_savings" || effect.effectType === "recurring_savings") return true;
  return false;
}

function isGrantEstimateEffect(effect) {
  return effect.effectType === "grant_expected_value" || GRANT_CASH_CLASSIFICATIONS.has(effect.cashValueClassification || "");
}

function isNonGrantWorkflowEffect(effect) {
  return NON_GRANT_CASH_CLASSIFICATIONS.has(effect.cashValueClassification || "") || effect.effectType === "financing_subsidy";
}

function isClearlyNonGrantWorkflow(row) {
  return /\b(feed[-\s]?in|fit|tariff|rate|financ|loan|technical assistance|permit|interconnection|on[-\s]?bill)\b/i.test(row.programName || "");
}

function increment(counts, key) {
  counts[key] = (counts[key] || 0) + 1;
}

function topCounts(values, limit = 25) {
  return Object.entries(
    values.filter(Boolean).reduce((counts, value) => {
      counts[value] = (counts[value] || 0) + 1;
      return counts;
    }, {})
  )
    .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
    .slice(0, limit)
    .map(([value, count]) => ({ value, count }));
}

function unique(values) {
  return [...new Set(values.filter(Boolean))];
}

function sum(rows, valueFn) {
  return rows.reduce((total, row) => total + Number(valueFn(row) || 0), 0);
}

function chunk(values, size) {
  const chunks = [];
  for (let index = 0; index < values.length; index += size) chunks.push(values.slice(index, index + size));
  return chunks;
}

main();
