import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import { validateIncentiveCalculationPackageV2 } from "../server/savings/incentiveCalculationsV2.mjs";

const repoRoot = path.resolve(import.meta.dirname, "..");
const defaultDate = "2026-07-04";
const defaultWorkDir = path.join(repoRoot, "GPT Pro Work", `grant-production-action-repair-${defaultDate}`);
const defaultPackagesPath = path.join(repoRoot, "data", "opportunity_incentive_calculation_packages_v2.json");

const options = parseArgs(process.argv.slice(2));
const date = options.date || defaultDate;
const now = new Date().toISOString();
const workDir = path.resolve(options.workDir || defaultWorkDir);
const manifestPath = path.resolve(options.manifestPath || path.join(workDir, "target_manifest.json"));
const packagesPath = path.resolve(options.packagesPath || defaultPackagesPath);
const artifactPath = path.resolve(
  options.artifactPath || path.join(repoRoot, "data", `grant_production_action_repairs_gpt_pro_${date}.json`)
);
const reportPath = path.resolve(
  options.reportPath || path.join(repoRoot, "data", `grant_production_action_repair_intake_report_${date}.md`)
);

if (options.help) {
  console.log(`Usage: node scripts/intake-grant-production-action-repair-outputs.mjs [--date ${defaultDate}] [--dryRun]`);
  process.exit(0);
}

const manifest = readJson(manifestPath);
const outputs = readOutputsFromManifest(manifest);
const validation = validateOutputs(outputs, manifest);

if (validation.fatalErrors.length > 0) {
  throw new Error(`Grant production action outputs are not safe to import:\n${validation.fatalErrors.join("\n")}`);
}

const packagesArtifact = readJson(packagesPath);
const repairs = outputs.flatMap((output) =>
  (output.object.repairs || []).map((repair) => normalizeRepair(repair, output))
);
const applyResult = applyRepairs(packagesArtifact, repairs);
const packageValidation = validatePackages(packagesArtifact.packages || []);

if (packageValidation.invalidCount > 0) {
  throw new Error(`Grant production action import generated invalid v2 packages:\n${JSON.stringify(packageValidation.invalidSamples, null, 2)}`);
}

const artifact = buildArtifact({ repairs, outputs, validation, applyResult, packageValidation });

if (!options.dryRun) {
  writeJson(artifactPath, artifact);
  writeJson(packagesPath, packagesArtifact);
  fs.writeFileSync(reportPath, buildReport(artifact), "utf8");
}

console.log("Intook grant production action GPT Pro outputs.");
console.log(`Output files parsed: ${outputs.length}`);
console.log(`Repairs imported: ${repairs.length}`);
console.log(`Repairs applied: ${applyResult.appliedCount}`);
console.log(`Effects patched: ${applyResult.patchedEffectCount}`);
console.log(`Warnings: ${artifact.warnings.length}`);
console.log(`Package validation invalid count: ${packageValidation.invalidCount}`);
console.log(`Report: ${path.relative(repoRoot, reportPath)}`);

function parseArgs(args) {
  const parsed = {};
  for (let index = 0; index < args.length; index += 1) {
    const arg = args[index];
    if (!arg.startsWith("--")) throw new Error(`Unexpected positional argument: ${arg}`);
    const key = arg.slice(2);
    if (key === "help" || key === "dryRun") {
      parsed[key] = true;
      continue;
    }
    const value = args[index + 1];
    if (!value || value.startsWith("--")) throw new Error(`Missing value for --${key}`);
    parsed[key] = value;
    index += 1;
  }
  return parsed;
}

function readOutputsFromManifest(workManifest) {
  if (workManifest.schemaVersion !== "retrofi_grant_production_action_repair_work_packet_manifest.v1") {
    throw new Error(`Unexpected manifest schema: ${workManifest.schemaVersion || "missing"}`);
  }
  return (workManifest.prompts || []).map((prompt) => {
    const filePath = path.join(workDir, prompt.outputName);
    const parsed = {
      prompt,
      fileName: prompt.outputName,
      filePath,
      object: null,
      missing: false,
      broken: false,
      error: null,
      trailingText: "",
      trailingTextLength: 0
    };

    if (!fs.existsSync(filePath)) {
      parsed.missing = true;
      parsed.error = "Output file is missing.";
      return parsed;
    }

    try {
      const raw = fs.readFileSync(filePath, "utf8");
      const extracted = extractFirstJsonObject(raw);
      parsed.object = JSON.parse(extracted.json);
      parsed.trailingText = extracted.trailing;
      parsed.trailingTextLength = extracted.trailing.length;
    } catch (error) {
      parsed.broken = true;
      parsed.error = error.message;
    }

    return parsed;
  });
}

function extractFirstJsonObject(raw) {
  const cleaned = raw
    .trim()
    .replace(/^```(?:json)?\s*/i, "")
    .replace(/```\s*$/i, "")
    .trim();
  const start = cleaned.indexOf("{");
  if (start < 0) throw new Error("No JSON object found.");

  let depth = 0;
  let inString = false;
  let escaped = false;

  for (let index = start; index < cleaned.length; index += 1) {
    const char = cleaned[index];
    if (inString) {
      if (escaped) escaped = false;
      else if (char === "\\") escaped = true;
      else if (char === "\"") inString = false;
      continue;
    }

    if (char === "\"") inString = true;
    else if (char === "{") depth += 1;
    else if (char === "}") {
      depth -= 1;
      if (depth === 0) {
        return {
          json: cleaned.slice(start, index + 1),
          trailing: cleaned.slice(index + 1).trim()
        };
      }
    }
  }

  throw new Error("Unclosed JSON object.");
}

function validateOutputs(parsedOutputs, workManifest) {
  const fatalErrors = [];
  const warnings = [];
  const expectedIds = new Set((workManifest.prompts || []).flatMap((prompt) => prompt.targetOpportunityIds || []));
  const seenIds = new Map();

  for (const output of parsedOutputs) {
    if (output.missing || output.broken) {
      fatalErrors.push(`${output.fileName}: ${output.error}`);
      continue;
    }
    if (output.object?.schemaVersion !== "retrofi_grant_production_action_repair_batch.v1") {
      fatalErrors.push(`${output.fileName}: unexpected schema ${output.object?.schemaVersion || "missing"}.`);
      continue;
    }
    if (output.object?.promptId !== output.prompt.promptId) {
      fatalErrors.push(`${output.fileName}: expected promptId ${output.prompt.promptId}, got ${output.object?.promptId || "missing"}.`);
    }
    if (output.trailingTextLength > 0) {
      warnings.push(`${output.fileName}: ignored ${output.trailingTextLength} trailing characters after the first JSON object.`);
    }

    const promptExpectedIds = new Set(output.prompt.targetOpportunityIds || []);
    const repairs = output.object.repairs || [];
    if (!Array.isArray(repairs) || repairs.length === 0) {
      fatalErrors.push(`${output.fileName}: repairs must be a non-empty array.`);
      continue;
    }

    const fileIds = new Set();
    for (const repair of repairs) {
      const id = baseOpportunityId(repair.opportunityId);
      if (!id) {
        fatalErrors.push(`${output.fileName}: repair is missing opportunityId.`);
        continue;
      }
      if (!expectedIds.has(id)) fatalErrors.push(`${output.fileName}: unexpected opportunityId ${id}.`);
      if (!promptExpectedIds.has(id)) fatalErrors.push(`${output.fileName}: opportunityId ${id} is not assigned to prompt ${output.prompt.promptId}.`);
      if (fileIds.has(id)) fatalErrors.push(`${output.fileName}: duplicate opportunityId ${id} in this output.`);
      if (seenIds.has(id)) fatalErrors.push(`${output.fileName}: duplicate opportunityId ${id}; first seen in ${seenIds.get(id)}.`);
      fileIds.add(id);
      seenIds.set(id, output.fileName);

      if (!repair.recommendedAction) warnings.push(`${output.fileName}: ${id} is missing recommendedAction.`);
      if (!repair.formulaRepair) warnings.push(`${output.fileName}: ${id} is missing formulaRepair.`);
      if (!repair.runtimeRecommendation) warnings.push(`${output.fileName}: ${id} is missing runtimeRecommendation.`);
      if (!repair.probabilityModel) warnings.push(`${output.fileName}: ${id} is missing probabilityModel.`);
    }

    for (const expectedId of promptExpectedIds) {
      if (!fileIds.has(expectedId)) fatalErrors.push(`${output.fileName}: missing expected opportunityId ${expectedId}.`);
    }
  }

  for (const expectedId of expectedIds) {
    if (!seenIds.has(expectedId)) fatalErrors.push(`Missing expected opportunityId across all outputs: ${expectedId}.`);
  }

  return { fatalErrors, warnings };
}

function normalizeRepair(repair, output) {
  const formula = repair.formulaRepair || {};
  const runtime = repair.runtimeRecommendation || {};
  const normalizedEstimateStatus = normalizedEstimateStatusForRepair(repair);
  const includeDefault = includeDefaultForRepair(repair, normalizedEstimateStatus);
  const humanReviewRequired = humanReviewRequiredForRepair(repair, normalizedEstimateStatus);
  const reasonCodes = uniqueStrings([
    ...(runtime.reasonCodes || []),
    "grant_production_action_repair_applied",
    `recommended_action_${repair.recommendedAction || "unknown"}`,
    `formula_status_${formula.status || "unknown"}`,
    `probability_evidence_${repair.probabilityModel?.probabilityEvidenceType || "unknown"}`,
    `estimate_status_${normalizedEstimateStatus || "unknown"}`
  ]);

  return {
    ...repair,
    baseOpportunityId: baseOpportunityId(repair.opportunityId),
    branchId: branchId(repair.opportunityId),
    sourceFile: output.fileName,
    sourceWorkDir: path.relative(repoRoot, workDir),
    promptId: output.object.promptId,
    researchedAt: output.object.researchedAt || null,
    expectedOpportunityIds: output.prompt.targetOpportunityIds || [],
    normalizedSourceUrlsChecked: normalizeUrls(repair.sourceUrlsChecked || []),
    normalizedEstimateStatus,
    normalizedIncludeDefault: includeDefault,
    normalizedHumanReviewRequired: humanReviewRequired,
    normalizedReasonCodes: reasonCodes,
    conditionalAwardModel: {
      status: formula.status || null,
      formulaText: formula.formulaText || "",
      formulaExpression: formula.formulaExpression || null,
      amountCents: finiteOrNull(formula.amountCents),
      minAwardCents: finiteOrNull(formula.minAwardCents),
      maxAwardCents: finiteOrNull(formula.maxAwardCents),
      costSharePercent: finiteOrNull(formula.costSharePercent),
      perUnitRates: formula.perUnitRates || [],
      eligibleCostCategories: formula.eligibleCostCategories || [],
      ineligibleCostCategories: formula.ineligibleCostCategories || [],
      caps: formula.caps || {},
      requiredInputs: requiredInputObjects(formula.requiredInputs),
      calculationTraceTemplate: formula.calculationTraceTemplate || []
    },
    estimateRecommendation: {
      estimateStatus: normalizedEstimateStatus,
      includeInUserFacingTotalDefault: includeDefault,
      includedAmountPolicy: runtime.includedAmountPolicy || (includeDefault ? "estimated_amount" : "not_included"),
      userFacingLabel: runtime.userFacingLabel || repair.programName || repair.opportunityId,
      userFacingCaveat: runtime.userFacingCaveat || "",
      reasonCodes
    }
  };
}

function normalizedEstimateStatusForRepair(repair) {
  const action = repair.recommendedAction;
  const runtimeStatus = repair.runtimeRecommendation?.estimateStatus || "";
  const formulaStatus = repair.formulaRepair?.status || "";

  if (action === "archive_or_exclude") return "suppressed";
  if (action === "zero_placeholder_no_calculable_value") return "zero_value";
  if (action === "non_grant_workflow") return "non_grant_workflow";
  if (action === "funding_refresh_required" || runtimeStatus === "needs_funding_check") return "needs_funding_check";
  if (action === "form_input_required") {
    if (runtimeStatus === "needs_project_scope") return "needs_project_scope";
    if (runtimeStatus === "needs_funding_check") return "needs_funding_check";
    if (formulaStatus === "needs_tax_document") return "needs_quote";
    if (formulaStatus === "needs_utility_bill") return "needs_quote";
    if (formulaStatus === "needs_application_or_award_document") return "needs_quote";
    if (formulaStatus === "needs_quote_or_invoice") return "needs_quote";
    if (formulaStatus === "needs_user_input") return "needs_project_scope";
    return "needs_quote";
  }
  if (action === "keep_suppressed_needs_more_research") return runtimeStatus || "human_review_required";
  if (action === "include_expected_value_estimate") {
    return runtimeStatus || "expected_value_estimate";
  }
  if (action === "include_deterministic_estimate") {
    if (runtimeStatus === "needs_quote" || formulaStatus === "needs_quote_or_invoice") return "needs_quote";
    if (runtimeStatus === "needs_project_scope") return "needs_project_scope";
    return runtimeStatus || "deterministic_estimate";
  }
  return runtimeStatus || "human_review_required";
}

function includeDefaultForRepair(repair, estimateStatus) {
  if (["suppressed", "human_review_required", "zero_value", "not_calculable", "needs_funding_check", "non_grant_workflow"].includes(estimateStatus)) {
    return false;
  }
  if (repair.sourceConfidence === "low" || repair.estimateConfidence === "low") {
    return false;
  }
  return repair.runtimeRecommendation?.includeInUserFacingTotalDefault === true;
}

function humanReviewRequiredForRepair(repair, estimateStatus) {
  if (repair.recommendedAction === "keep_suppressed_needs_more_research") return true;
  if (repair.recommendedAction === "archive_or_exclude") return true;
  if (repair.sourceConfidence === "low") return true;
  if (["human_review_required", "suppressed"].includes(estimateStatus)) return true;
  return false;
}

function applyRepairs(packagesArtifact, repairs) {
  const packages = packagesArtifact.packages || [];
  const packagesById = new Map(packages.map((pkg) => [pkg.opportunity_id, pkg]));
  const warnings = [];
  let appliedCount = 0;
  let patchedEffectCount = 0;

  for (const repair of repairs) {
    const pkg = packagesById.get(repair.baseOpportunityId);
    if (!pkg) {
      warnings.push(`No v2 package found for ${repair.opportunityId}.`);
      continue;
    }

    const targetEffects = findTargetEffects(pkg, repair);
    if (targetEffects.length === 0) {
      warnings.push(`No v2 effect found for ${repair.opportunityId}.`);
      continue;
    }

    applyRepairToPackage(pkg, repair, targetEffects);
    patchedEffectCount += targetEffects.length;
    appliedCount += 1;
  }

  packagesArtifact.generatedAt = now;
  packagesArtifact.grantProductionActionRepairAppliedAt = now;
  packagesArtifact.grantProductionActionRepairArtifact = path.relative(repoRoot, artifactPath);
  packagesArtifact.grantProductionActionRepairCount = appliedCount;
  packagesArtifact.grantProductionActionPatchedEffectCount = patchedEffectCount;
  packagesArtifact.statusCounts = countBy(packages, (pkg) => pkg.calculation_status || "unknown");
  packagesArtifact.confidenceCounts = countBy(packages, (pkg) => confidenceLabel(pkg.confidence?.overall));

  return { appliedCount, patchedEffectCount, warnings };
}

function findTargetEffects(pkg, repair) {
  const effects = pkg.effects || [];
  if (effects.length === 0) return [];

  const grantLike = effects.filter((effect) => isGrantLikeEffect(effect) || isRebateLikeEffect(effect));
  if (repair.recommendedAction === "non_grant_workflow" || repair.recommendedAction === "zero_placeholder_no_calculable_value") {
    return grantLike.length ? grantLike : effects;
  }
  if (grantLike.length > 0) return grantLike;
  return [effects[0]];
}

function applyRepairToPackage(pkg, repair, targetEffects) {
  const evidenceId = `grant_production_action_${shortHash(`${repair.opportunityId}|${repair.sourceFile}`)}`;
  pkg.source_evidence = upsertByKey(
    pkg.source_evidence || [],
    {
      evidence_id: evidenceId,
      source_type: "gpt_pro_grant_production_action_repair",
      quote: repair.evidenceText || repair.conditionalAwardModel.formulaText || repair.reasoningNotes || "",
      source_urls: repair.normalizedSourceUrlsChecked || [],
      evidence_confidence: confidenceNumber(repair.sourceConfidence)
    },
    "evidence_id"
  );

  pkg.availability = {
    ...(pkg.availability || {}),
    status: normalizeAvailabilityStatus(repair.availabilityStatus, pkg.availability?.status),
    funding_status: repair.timingAndApplicationRules?.fundingStatus || pkg.availability?.funding_status || null,
    application_deadline: repair.timingAndApplicationRules?.applicationDeadline ?? pkg.availability?.application_deadline ?? null,
    source_access_status: sourceAccessStatus(repair),
    grant_production_action_availability_status: repair.availabilityStatus || null,
    grant_production_action_researched_at: repair.researchedAt || null
  };

  const candidateStatus = calculationStatusForRepair(repair);
  pkg.calculation_status = shouldOverrideCalculationStatus(repair)
    ? candidateStatus
    : chooseCalculationStatus(pkg.calculation_status, candidateStatus);

  for (const effect of targetEffects) {
    applyRepairToEffect({ pkg, effect, repair, evidenceId });
  }

  pkg.input_requirements = mergeInputRequirements(
    pkg.input_requirements || [],
    targetEffects.flatMap((effect) => effect.required_inputs || [])
  );
  pkg.confidence = confidenceForRepair(pkg.confidence || {}, repair, { packageLevel: true });
  pkg.migration_metadata = {
    ...(pkg.migration_metadata || {}),
    grant_production_action_repair_applied_at: now,
    grant_production_action_repair_artifact: path.relative(repoRoot, artifactPath)
  };
}

function applyRepairToEffect({ pkg, effect, repair, evidenceId }) {
  effect.evidence_refs = uniqueStrings([...(effect.evidence_refs || []), evidenceId]);
  effect.label = repair.estimateRecommendation.userFacingLabel || effect.label || repair.programName || repair.opportunityId;
  effect.cash_flow_direction = effect.effect_type === "recurring_expense" ? "cost" : "benefit";
  effect.timing = {
    ...(effect.timing || { cadence: "one_time" }),
    approval_required_before_purchase:
      repair.timingAndApplicationRules?.approvalRequiredBeforePurchase ?? effect.timing?.approval_required_before_purchase ?? null,
    approval_required_before_installation:
      repair.timingAndApplicationRules?.approvalRequiredBeforeInstallation ?? effect.timing?.approval_required_before_installation ?? null,
    application_deadline: repair.timingAndApplicationRules?.applicationDeadline ?? effect.timing?.application_deadline ?? null,
    funding_status: repair.timingAndApplicationRules?.fundingStatus || effect.timing?.funding_status || null,
    payment_timing: repair.timingAndApplicationRules?.paymentTiming || effect.timing?.payment_timing || null
  };

  effect.required_inputs = mergeInputRequirements(
    effect.required_inputs || [],
    requiredInputsFromRepair(repair, effect.effect_id)
  );
  effect.caps = mergeCaps(effect.caps || [], repair, effect.effect_id);
  effect.calculation = buildCalculation(effect.calculation || {}, repair);
  effect.included_in_user_facing_total = repair.normalizedIncludeDefault === true;
  effect.confidence = confidenceForRepair(effect.confidence || {}, repair);
  effect.repair_metadata = {
    ...(effect.repair_metadata || {}),
    repair_status: repairStatusForRepair(repair),
    calculation_status: calculationStatusForRepair(repair),
    value_model_kind: repair.valueModelKind || effect.repair_metadata?.value_model_kind || null,
    cash_value_classification: repair.cashValueClassification || effect.repair_metadata?.cash_value_classification || null,
    included_in_user_facing_total_default: repair.normalizedIncludeDefault === true,
    human_review_required: repair.normalizedHumanReviewRequired === true,
    human_review_reasons: uniqueStrings([
      ...(effect.repair_metadata?.human_review_reasons || []),
      ...(repair.humanReviewReasons || []),
      ...(repair.normalizedHumanReviewRequired ? repair.normalizedReasonCodes : [])
    ]),
    grant_production_action_repair: {
      source_file: repair.sourceFile,
      prompt_id: repair.promptId,
      researched_at: repair.researchedAt,
      opportunity_id: repair.opportunityId,
      base_opportunity_id: repair.baseOpportunityId,
      recommended_action: repair.recommendedAction || null,
      availability_status: repair.availabilityStatus || null,
      source_confidence: repair.sourceConfidence || null,
      estimate_confidence: repair.estimateConfidence || null,
      estimate_status: repair.normalizedEstimateStatus || null,
      value_model_kind: repair.valueModelKind || null,
      cash_value_classification: repair.cashValueClassification || null,
      reason_codes: repair.normalizedReasonCodes,
      formula_repair: toSnakeObject(repair.formulaRepair || {}),
      probability_model: toSnakeObject(repair.probabilityModel || {}),
      runtime_recommendation: toSnakeObject(repair.runtimeRecommendation || {}),
      estimate_recommendation: toSnakeObject(repair.estimateRecommendation || {}),
      timing_and_application_rules: toSnakeObject(repair.timingAndApplicationRules || {}),
      patch_instructions: toSnakeObject(repair.patchInstructions || {}),
      evidence_text: repair.evidenceText || "",
      reasoning_notes: repair.reasoningNotes || "",
      source_urls_checked: repair.normalizedSourceUrlsChecked || [],
      human_review_required: repair.normalizedHumanReviewRequired === true,
      human_review_reasons: repair.humanReviewReasons || []
    },
    grant_production_quality_repair: {
      ...(effect.repair_metadata?.grant_production_quality_repair || {}),
      source_file: repair.sourceFile,
      prompt_id: repair.promptId,
      researched_at: repair.researchedAt,
      opportunity_id: repair.opportunityId,
      base_opportunity_id: repair.baseOpportunityId,
      availability_status: repair.availabilityStatus || null,
      source_confidence: repair.sourceConfidence || null,
      estimate_confidence: repair.estimateConfidence || null,
      estimate_status: repair.normalizedEstimateStatus || null,
      value_model_kind: repair.valueModelKind || null,
      cash_value_classification: repair.cashValueClassification || null,
      reason_codes: repair.normalizedReasonCodes,
      evidence_text: repair.evidenceText || "",
      reasoning_notes: repair.reasoningNotes || "",
      source_urls_checked: repair.normalizedSourceUrlsChecked || [],
      human_review_required: repair.normalizedHumanReviewRequired === true,
      human_review_reasons: repair.humanReviewReasons || [],
      estimate_recommendation: toSnakeObject(repair.estimateRecommendation || {})
    }
  };

  pkg.migration_metadata = {
    ...(pkg.migration_metadata || {}),
    grant_production_action_repair_last_effect_id: effect.effect_id
  };
}

function buildCalculation(current, repair) {
  const conditional = repair.conditionalAwardModel || {};
  const probability = repair.probabilityModel || {};
  const recommendation = repair.estimateRecommendation || {};
  const formula = repair.formulaRepair || {};
  let method = current.method || "custom_quote";

  if (repair.recommendedAction === "zero_placeholder_no_calculable_value" || recommendation.estimateStatus === "zero_value") {
    method = "zero_when_not_applicable";
  } else if (repair.recommendedAction === "non_grant_workflow") {
    method = current.method || "zero_when_not_applicable";
  } else if (!["rate_table", "tiered_rate_table", "measure_catalog", "expression"].includes(method)) {
    if (recommendation.estimateStatus === "expected_value_estimate" && Number.isFinite(finiteOrNull(probability.probabilityDiscount))) {
      method = "expected_value";
    } else if (recommendation.estimateStatus === "deterministic_estimate" && Number.isFinite(finiteOrNull(conditional.amountCents))) {
      method = "fixed_amount";
    } else if (Number.isFinite(finiteOrNull(conditional.costSharePercent))) {
      method = "percent_of_cost";
    } else if (method === "zero_when_not_applicable" && repair.normalizedIncludeDefault === true) {
      method = "custom_quote";
    }
  }

  const calculation = {
    ...current,
    method,
    grant_value_model_kind: repair.valueModelKind || current.grant_value_model_kind || null,
    cash_value_classification: repair.cashValueClassification || current.cash_value_classification || null,
    formula_repair: toSnakeObject(formula),
    conditional_award_model: toSnakeObject(conditional),
    probability_model: toSnakeObject(probability),
    estimate_recommendation: toSnakeObject(recommendation),
    runtime_recommendation: toSnakeObject(repair.runtimeRecommendation || {}),
    timing_and_application_rules: toSnakeObject(repair.timingAndApplicationRules || {}),
    production_action_recommendation: repair.recommendedAction || null,
    formula_text: conditional.formulaText || current.formula_text || current.conditional_award_formula || null,
    formula_expression: conditional.formulaExpression || current.formula_expression || null,
    source_repair_status: recommendation.estimateStatus || conditional.status || null
  };

  const amountCents = finiteOrNull(conditional.amountCents);
  const maxAwardCents = finiteOrNull(conditional.maxAwardCents ?? conditional.caps?.maxAwardCents);
  const probabilityDiscount = finiteOrNull(probability.probabilityDiscount);

  if (Number.isFinite(maxAwardCents)) calculation.max_award_cents = maxAwardCents;
  if (method === "expected_value" && Number.isFinite(amountCents) && Number.isFinite(probabilityDiscount)) {
    calculation.conditional_award_cents = amountCents;
    calculation.probability_discount = probabilityDiscount;
  } else if (method === "expected_value" && Number.isFinite(probabilityDiscount)) {
    calculation.probability_discount = probabilityDiscount;
  }
  if (method === "fixed_amount" && Number.isFinite(amountCents)) {
    calculation.amount = centsToMoney(amountCents);
    calculation.amount_cents = amountCents;
  }
  if (method === "percent_of_cost") {
    calculation.percent = normalizePercent(conditional.costSharePercent);
    calculation.cost_input = findCostInput(requiredInputKeys(conditional.requiredInputs)) || current.cost_input || "eligible_project_cost_cents";
  }
  if (method === "zero_when_not_applicable") {
    calculation.reason = recommendation.userFacingCaveat || conditional.formulaText || current.reason || "Grant production action repair classified this as a zero-value/no-calculable grant estimate.";
  }
  if (method === "custom_quote") {
    calculation.reason = recommendation.userFacingCaveat || conditional.formulaText || current.reason || "Project-specific inputs are required before this incentive can be estimated.";
  }

  return calculation;
}

function requiredInputsFromRepair(repair, effectId) {
  return requiredInputObjects(repair.conditionalAwardModel?.requiredInputs).map((input) => ({
    input_key: input.inputKey,
    label: input.label || labelFromInputKey(input.inputKey),
    value_type: normalizeInputValueType(input.valueType),
    allowed_values: input.allowedValues || input.allowed_values || undefined,
    required_for: [effectId],
    source_precedence: sourcePrecedenceForInput(input),
    missing_severity: missingSeverityForInput(input, repair),
    user_override_allowed: input.userOverrideAllowed !== false,
    why_needed: input.whyNeeded || "",
    source: "grant_production_action_repair"
  }));
}

function mergeCaps(existingCaps, repair, effectId) {
  const conditional = repair.conditionalAwardModel || {};
  const caps = conditional.caps || {};
  const generated = [];
  const maxAwardCents = finiteOrNull(caps.maxAwardCents ?? conditional.maxAwardCents);
  const maxPercent = finiteOrNull(caps.maxPercentOfEligibleCost);
  const maxUnits = finiteOrNull(caps.maxUnits);
  if (Number.isFinite(maxAwardCents)) {
    generated.push({
      cap_id: `grant_action_max_${shortHash(`${repair.opportunityId}|${effectId}|max`)}`,
      cap_type: "maximum_amount",
      amount: centsToMoney(maxAwardCents),
      applies_to: "effect",
      source: "grant_production_action_repair"
    });
  }
  if (Number.isFinite(maxPercent)) {
    generated.push({
      cap_id: `grant_action_pct_${shortHash(`${repair.opportunityId}|${effectId}|pct`)}`,
      cap_type: "maximum_percent_of_cost",
      percent: normalizePercent(maxPercent),
      applies_to: "effect",
      source: "grant_production_action_repair"
    });
  }
  if (Number.isFinite(maxUnits)) {
    generated.push({
      cap_id: `grant_action_units_${shortHash(`${repair.opportunityId}|${effectId}|units`)}`,
      cap_type: "maximum_units",
      max_units: maxUnits,
      applies_to: "effect",
      source: "grant_production_action_repair"
    });
  }

  return [
    ...arrayOf(existingCaps).filter((cap) => cap.source !== "grant_production_action_repair"),
    ...generated
  ];
}

function repairStatusForRepair(repair) {
  if (repair.recommendedAction === "archive_or_exclude") return "archive_or_exclude";
  if (repair.recommendedAction === "zero_placeholder_no_calculable_value") return "zero_placeholder_no_calculable_value";
  if (repair.recommendedAction === "non_grant_workflow") return "non_grant_workflow";
  if (repair.recommendedAction === "funding_refresh_required") return "funding_refresh_required";
  if (repair.recommendedAction === "form_input_required") return "form_input_required";
  if (repair.recommendedAction === "include_expected_value_estimate") return "expected_value_formula_repaired";
  if (repair.recommendedAction === "include_deterministic_estimate") return "deterministic_formula_repaired";
  return repair.recommendedAction || "grant_production_action_repaired";
}

function calculationStatusForRepair(repair) {
  const estimateStatus = repair.normalizedEstimateStatus;
  if (repair.recommendedAction === "archive_or_exclude" || repair.availabilityStatus === "closed" || repair.availabilityStatus === "exhausted") {
    return "unavailable_archived";
  }
  if (repair.availabilityStatus === "source_inaccessible" || repair.valueModelKind === "source_inaccessible") {
    return "source_inaccessible_repair_failure";
  }
  if (repair.recommendedAction === "non_grant_workflow" || estimateStatus === "non_grant_workflow") return "non_monetary_workflow";
  if (repair.recommendedAction === "zero_placeholder_no_calculable_value" || ["zero_value", "not_calculable"].includes(estimateStatus)) {
    return "no_calculable_value";
  }
  if (repair.recommendedAction === "keep_suppressed_needs_more_research" || ["human_review_required", "suppressed"].includes(estimateStatus)) {
    return "needs_repair_review";
  }
  if (["needs_quote", "needs_project_scope", "needs_funding_check"].includes(estimateStatus)) return "calculable_with_missing_inputs";
  if (["deterministic_estimate", "expected_value_estimate", "range_estimate"].includes(estimateStatus)) return "calculable";
  return "calculable_with_missing_inputs";
}

function shouldOverrideCalculationStatus(repair) {
  return [
    "archive_or_exclude",
    "zero_placeholder_no_calculable_value",
    "non_grant_workflow",
    "keep_suppressed_needs_more_research"
  ].includes(repair.recommendedAction);
}

function chooseCalculationStatus(current, candidate) {
  const priority = {
    source_inaccessible_repair_failure: 0,
    unavailable_archived: 0,
    no_calculable_value: 1,
    non_monetary_workflow: 1,
    needs_repair_review: 2,
    custom_quote_estimate: 3,
    calculable_with_missing_inputs: 4,
    estimate_from_range: 4,
    calculable: 5
  };
  return (priority[candidate] ?? 0) > (priority[current] ?? 0) ? candidate : current;
}

function sourceAccessStatus(repair) {
  if (repair.availabilityStatus === "source_inaccessible" || repair.sourceConfidence === "low") return "limited_or_inaccessible";
  if (repair.sourceConfidence === "high") return "verified_official_source";
  return "partially_verified";
}

function normalizeAvailabilityStatus(value, fallback = "unknown") {
  const normalized = String(value || "").trim().toLowerCase();
  if (!normalized) return fallback;
  if (normalized === "open") return "active";
  if (["active", "upcoming", "closed", "exhausted", "waitlist", "source_inaccessible", "unknown"].includes(normalized)) return normalized;
  return fallback;
}

function isGrantLikeEffect(effect) {
  return (
    effect.effect_type === "grant_expected_value" ||
    effect.calculation?.method === "expected_value" ||
    ["cash_grant", "reimbursement"].includes(effect.repair_metadata?.cash_value_classification) ||
    ["cash_grant", "reimbursement"].includes(effect.calculation?.cash_value_classification)
  );
}

function isRebateLikeEffect(effect) {
  return (
    effect.repair_metadata?.cash_value_classification === "rebate" ||
    effect.calculation?.cash_value_classification === "rebate" ||
    /rebate|grant|reimbursement/i.test(`${effect.label || ""} ${effect.repair_metadata?.value_model_kind || ""}`)
  );
}

function requiredInputObjects(inputs = []) {
  return arrayOf(inputs)
    .map((input) => (typeof input === "string" ? { inputKey: input } : input))
    .map((input) => ({ ...input, inputKey: input.inputKey || input.input_key || "" }))
    .filter((input) => input.inputKey);
}

function requiredInputKeys(inputs = []) {
  return requiredInputObjects(inputs).map((input) => input.inputKey);
}

function mergeInputRequirements(existingInputs, newInputs) {
  const byKey = new Map();
  for (const input of [...arrayOf(existingInputs), ...arrayOf(newInputs)]) {
    const inputKey = input.input_key || input.inputKey;
    if (!inputKey) continue;
    const normalized = {
      ...input,
      input_key: inputKey,
      label: input.label || labelFromInputKey(inputKey),
      value_type: input.value_type || input.valueType || "text",
      required_for: uniqueStrings(input.required_for || input.requiredFor || []),
      source_precedence: uniqueStrings(input.source_precedence || input.sourcePrecedence || [])
    };
    const existing = byKey.get(inputKey);
    byKey.set(
      inputKey,
      existing
        ? {
            ...existing,
            ...normalized,
            required_for: uniqueStrings([...(existing.required_for || []), ...(normalized.required_for || [])]),
            source_precedence: uniqueStrings([...(existing.source_precedence || []), ...(normalized.source_precedence || [])]),
            allowed_values: uniqueStrings([...(existing.allowed_values || []), ...(normalized.allowed_values || [])])
          }
        : normalized
    );
  }
  return [...byKey.values()];
}

function sourcePrecedenceForInput(input) {
  const source = String(input.inputSource || input.input_source || "").toLowerCase();
  const key = String(input.inputKey || "").toLowerCase();
  if (source.includes("source_constant")) return ["source_constant", "admin_review"];
  if (source.includes("server")) return ["server_derived", "user_profile", "admin_review"];
  if (source.includes("quote") || source.includes("invoice")) return ["quote", "paid_invoice", "user_profile", "admin_review"];
  if (source.includes("utility")) return ["utility_data", "bill_upload", "user_profile"];
  if (source.includes("application") || source.includes("award")) return ["program_application", "award_document", "admin_review", "user_profile"];
  if (source.includes("tax")) return ["tax_document", "user_profile", "admin_review"];
  if (/cost|amount|budget|price|invoice|award|match/.test(key)) return ["quote", "program_application", "user_profile", "admin_review"];
  return ["user_profile", "retrofit_assumptions", "quote", "admin_review"];
}

function missingSeverityForInput(input, repair) {
  const key = String(input.inputKey || "").toLowerCase();
  if (/funding|award|approval|agreement|preapproval|executed|authorization/.test(key)) return "blocks_user_facing_total";
  if (repair.normalizedEstimateStatus === "needs_funding_check") return "blocks_user_facing_total";
  return "blocks_calculation";
}

function normalizeInputValueType(value) {
  const text = String(value || "text").toLowerCase();
  if (text.includes("money")) return "money_cents";
  if (text.includes("number") || text.includes("integer")) return "number";
  if (text.includes("boolean")) return "boolean";
  if (text.includes("enum")) return "enum";
  if (text.includes("date")) return "date";
  return "text";
}

function confidenceForRepair(current, repair, { packageLevel = false } = {}) {
  const source = confidenceNumber(repair.sourceConfidence);
  const estimate = confidenceNumber(repair.estimateConfidence || "low");
  return {
    ...current,
    overall: Math.min(source, estimate),
    source_access: packageLevel ? source : current.source_access,
    calculation: estimate,
    extraction: source,
    reason_codes: uniqueStrings([
      ...(current.reason_codes || []),
      ...repair.normalizedReasonCodes,
      `source_confidence_${repair.sourceConfidence || "unknown"}`,
      `estimate_confidence_${repair.estimateConfidence || "unknown"}`,
      `value_model_${repair.valueModelKind || "unknown"}`
    ])
  };
}

function buildArtifact({ repairs, outputs, validation, applyResult, packageValidation }) {
  const warnings = uniqueStrings([...validation.warnings, ...applyResult.warnings]);
  return {
    schemaVersion: "retrofi_grant_production_action_repairs_gpt_pro.v1",
    generatedAt: now,
    sourceWorkDir: path.relative(repoRoot, workDir),
    sourceFiles: outputs.map((output) => output.fileName),
    repairCount: repairs.length,
    appliedCount: applyResult.appliedCount,
    patchedEffectCount: applyResult.patchedEffectCount,
    counts: {
      recommendedActionCounts: countBy(repairs, (repair) => repair.recommendedAction || "unknown"),
      normalizedEstimateStatusCounts: countBy(repairs, (repair) => repair.normalizedEstimateStatus || "unknown"),
      sourceConfidenceCounts: countBy(repairs, (repair) => repair.sourceConfidence || "unknown"),
      estimateConfidenceCounts: countBy(repairs, (repair) => repair.estimateConfidence || "unknown"),
      valueModelKindCounts: countBy(repairs, (repair) => repair.valueModelKind || "unknown"),
      probabilityEvidenceTypeCounts: countBy(repairs, (repair) => repair.probabilityModel?.probabilityEvidenceType || "unknown"),
      includedByDefaultCount: repairs.filter((repair) => repair.normalizedIncludeDefault === true).length
    },
    packageValidation,
    warnings,
    repairs
  };
}

function buildReport(artifact) {
  const lines = [];
  lines.push("# Grant Production Action Repair Intake Report");
  lines.push("");
  lines.push(`Generated: ${artifact.generatedAt}`);
  lines.push("");
  lines.push("## Validation");
  lines.push("");
  lines.push(`- Output files parsed: ${artifact.sourceFiles.length}`);
  lines.push(`- Repairs imported: ${artifact.repairCount}`);
  lines.push(`- Repairs applied: ${artifact.appliedCount}`);
  lines.push(`- Effects patched: ${artifact.patchedEffectCount}`);
  lines.push(`- Invalid packages after import: ${artifact.packageValidation.invalidCount}`);
  lines.push(`- Warnings: ${artifact.warnings.length}`);
  lines.push("");
  lines.push("## Recommended Actions");
  lines.push("");
  appendCountTable(lines, artifact.counts.recommendedActionCounts);
  lines.push("");
  lines.push("## Runtime Estimate Status");
  lines.push("");
  appendCountTable(lines, artifact.counts.normalizedEstimateStatusCounts);
  lines.push("");
  lines.push("## Probability Evidence");
  lines.push("");
  appendCountTable(lines, artifact.counts.probabilityEvidenceTypeCounts);
  lines.push("");
  lines.push("## Files");
  lines.push("");
  lines.push(`- Artifact: \`${path.relative(repoRoot, artifactPath)}\``);
  lines.push(`- Updated packages: \`${path.relative(repoRoot, packagesPath)}\``);
  lines.push("");
  lines.push("## Warnings");
  lines.push("");
  if (artifact.warnings.length) {
    for (const warning of artifact.warnings) lines.push(`- ${warning}`);
  } else {
    lines.push("- None.");
  }
  return `${lines.join("\n").replace(/\n+$/g, "")}\n`;
}

function appendCountTable(lines, counts) {
  lines.push("| Key | Count |");
  lines.push("| --- | ---: |");
  for (const [key, count] of Object.entries(counts || {}).sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))) {
    lines.push(`| ${key} | ${count} |`);
  }
}

function validatePackages(packages) {
  const invalidSamples = [];
  let invalidCount = 0;
  for (const pkg of packages) {
    const validation = validateIncentiveCalculationPackageV2(pkg);
    if (!validation.valid) {
      invalidCount += 1;
      if (invalidSamples.length < 10) invalidSamples.push({ opportunityId: pkg.opportunity_id, errors: validation.errors });
    }
  }
  return { packageCount: packages.length, invalidCount, invalidSamples };
}

function baseOpportunityId(value) {
  return String(value || "").split("#")[0] || "";
}

function branchId(value) {
  const parts = String(value || "").split("#");
  return parts.length > 1 ? parts.slice(1).join("#") : null;
}

function findCostInput(inputs = []) {
  return (inputs || []).find((input) => /cost|budget|expense|price|invoice/i.test(input));
}

function normalizeUrls(values) {
  const urls = [];
  for (const value of values || []) {
    const matches = String(value || "").match(/https?:\/\/[^\s\]\)"'<>]+/g) || [];
    urls.push(...matches.map((url) => url.replace(/[.,;]+$/g, "")));
  }
  return uniqueStrings(urls);
}

function labelFromInputKey(inputKey) {
  return String(inputKey || "")
    .replace(/_cents$/i, "")
    .replace(/_/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());
}

function centsToMoney(cents) {
  if (!Number.isFinite(cents)) return { value: 0, currency: "USD" };
  return { value: Number(cents) / 100, currency: "USD" };
}

function finiteOrNull(value) {
  if (value == null || value === "") return null;
  const number = Number(value);
  return Number.isFinite(number) ? number : null;
}

function normalizePercent(value) {
  const number = Number(value);
  if (!Number.isFinite(number)) return null;
  if (number > 1 && number <= 100) return number / 100;
  return number;
}

function confidenceNumber(value) {
  if (typeof value === "number") return value;
  if (value === "high") return 0.9;
  if (value === "medium") return 0.72;
  if (value === "low") return 0.38;
  return 0.5;
}

function confidenceLabel(value) {
  const number = Number(value);
  if (number >= 0.82) return "high";
  if (number >= 0.55) return "medium";
  return "low";
}

function arrayOf(value) {
  return Array.isArray(value) ? value : [];
}

function uniqueStrings(values = []) {
  return [...new Set(values.map((value) => String(value || "").trim()).filter(Boolean))];
}

function upsertByKey(rows, row, key) {
  return [...rows.filter((existing) => existing?.[key] !== row[key]), row];
}

function countBy(rows, getter) {
  return rows.reduce((counts, row) => {
    const key = getter(row);
    counts[key] = (counts[key] || 0) + 1;
    return counts;
  }, {});
}

function shortHash(value) {
  return crypto.createHash("sha256").update(String(value)).digest("hex").slice(0, 16);
}

function toSnakeObject(value) {
  if (Array.isArray(value)) return value.map(toSnakeObject);
  if (!value || typeof value !== "object") return value;
  return Object.fromEntries(Object.entries(value).map(([key, nested]) => [toSnakeKey(key), toSnakeObject(nested)]));
}

function toSnakeKey(key) {
  return String(key)
    .replace(/([a-z0-9])([A-Z])/g, "$1_$2")
    .replace(/[-\s]+/g, "_")
    .toLowerCase();
}

function readJson(filePath) {
  return JSON.parse(fs.readFileSync(filePath, "utf8"));
}

function writeJson(filePath, value) {
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  fs.writeFileSync(filePath, `${JSON.stringify(value, null, 2)}\n`);
}
