import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import { validateIncentiveCalculationPackageV2 } from "../server/savings/incentiveCalculationsV2.mjs";

const repoRoot = path.resolve(import.meta.dirname, "..");
const defaultWorkDir = path.join(
  repoRoot,
  "GPT Pro Work",
  "grant-estimation-repair-2026-07-03",
  "grant_package_research"
);
const defaultTargetsPath = path.join(
  repoRoot,
  "GPT Pro Work",
  "grant-estimation-repair-2026-07-03",
  "grant_package_targets.json"
);
const defaultPackagesPath = path.join(repoRoot, "data", "opportunity_incentive_calculation_packages_v2.json");
const defaultArtifactPath = path.join(
  repoRoot,
  "data",
  "grant_estimation_package_repair_gpt_pro_2026-07-03.json"
);
const defaultReportPath = path.join(repoRoot, "data", "grant_estimation_package_repair_intake_report.md");

const options = parseArgs(process.argv.slice(2));
const workDir = path.resolve(options.workDir || defaultWorkDir);
const targetsPath = path.resolve(options.targetsPath || defaultTargetsPath);
const packagesPath = path.resolve(options.packagesPath || defaultPackagesPath);
const artifactPath = path.resolve(options.artifactPath || defaultArtifactPath);
const reportPath = path.resolve(options.reportPath || defaultReportPath);

const targets = readJson(targetsPath);
const packagesArtifact = readJson(packagesPath);
const outputFiles = fs
  .readdirSync(workDir)
  .filter((file) => /^output_\d{3}.*\.md$/i.test(file))
  .sort();

const parsedOutputs = outputFiles.map((fileName) => parseOutputFile(path.join(workDir, fileName), fileName));
const validation = validateParsedOutputs(parsedOutputs, targets);

if (validation.brokenOutputs.length > 0 || validation.mismatchedOutputs.length > 0) {
  throw new Error(
    `Grant package outputs are not safe to import: ${JSON.stringify(
      {
        brokenOutputs: validation.brokenOutputs,
        mismatchedOutputs: validation.mismatchedOutputs
      },
      null,
      2
    )}`
  );
}

const grantArtifact = buildArtifact(parsedOutputs, validation);
const applyResult = applyGrantPackageRepairsToPackages(packagesArtifact, grantArtifact.repairs);
const packageValidation = validatePackages(packagesArtifact.packages || []);

if (packageValidation.invalidCount > 0) {
  throw new Error(
    `Grant package repair application generated invalid v2 packages: ${JSON.stringify(
      packageValidation.invalidSamples,
      null,
      2
    )}`
  );
}

fs.writeFileSync(artifactPath, `${JSON.stringify(grantArtifact, null, 2)}\n`);
fs.writeFileSync(packagesPath, `${JSON.stringify(packagesArtifact, null, 2)}\n`);
fs.writeFileSync(
  reportPath,
  buildReport({ grantArtifact, applyResult, packageValidation, parsedOutputs, validation }),
  "utf8"
);

console.log("Intook grant-estimation package GPT Pro outputs.");
console.log(`Output files found: ${parsedOutputs.length}`);
console.log(`Repairs imported: ${grantArtifact.repairCount}`);
console.log(`Repairs applied: ${applyResult.appliedCount}`);
console.log(`Missing outputs: ${validation.missingOutputs.length}`);
console.log(`Warnings: ${grantArtifact.validationWarnings.length + applyResult.warnings.length}`);
console.log(`Artifact: ${path.relative(repoRoot, artifactPath)}`);
console.log(`Packages: ${path.relative(repoRoot, packagesPath)}`);
console.log(`Report: ${path.relative(repoRoot, reportPath)}`);

function parseArgs(args) {
  const parsed = {};
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

function parseOutputFile(filePath, fileName) {
  const raw = fs.readFileSync(filePath, "utf8");
  const outputIndex = outputIndexFromFileName(fileName);
  const parsed = {
    fileName,
    outputIndex,
    object: null,
    missing: false,
    broken: false,
    error: null,
    trailingText: "",
    trailingTextLength: 0
  };

  try {
    const extracted = extractFirstJsonObject(raw);
    parsed.object = JSON.parse(extracted.json);
    parsed.trailingText = extracted.trailing;
    parsed.trailingTextLength = extracted.trailing.length;
  } catch (error) {
    const hasJsonStart = raw.includes("{");
    parsed.missing = !hasJsonStart;
    parsed.broken = hasJsonStart;
    parsed.error = error.message;
  }

  return parsed;
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

function outputIndexFromFileName(fileName) {
  const match = fileName.match(/^output_(\d{3})/i);
  return match ? Number(match[1]) : null;
}

function validateParsedOutputs(outputs, targetRows) {
  const missingOutputs = [];
  const brokenOutputs = [];
  const mismatchedOutputs = [];
  const duplicateOpportunityIds = [];
  const schemaWarnings = [];
  const trailingTextOutputs = [];
  const seenIds = new Map();

  for (const output of outputs) {
    const expected = output.outputIndex ? targetRows[output.outputIndex - 1] : null;

    if (output.missing) {
      missingOutputs.push({
        fileName: output.fileName,
        outputIndex: output.outputIndex,
        expectedOpportunityId: expected?.opportunity_id || null,
        expectedProgramName: expected?.program_name || null,
        reason: output.error || "No JSON object found."
      });
      continue;
    }

    if (output.broken) {
      brokenOutputs.push({
        fileName: output.fileName,
        outputIndex: output.outputIndex,
        expectedOpportunityId: expected?.opportunity_id || null,
        error: output.error
      });
      continue;
    }

    if (output.trailingTextLength > 0) {
      trailingTextOutputs.push({
        fileName: output.fileName,
        trailingTextLength: output.trailingTextLength
      });
    }

    if (output.object?.schemaVersion !== "retrofi_grant_package_repair.v1") {
      schemaWarnings.push({
        fileName: output.fileName,
        schemaVersion: output.object?.schemaVersion || null
      });
      continue;
    }

    if (expected?.opportunity_id && output.object.opportunityId !== expected.opportunity_id) {
      mismatchedOutputs.push({
        fileName: output.fileName,
        outputIndex: output.outputIndex,
        expectedOpportunityId: expected.opportunity_id,
        actualOpportunityId: output.object.opportunityId,
        expectedProgramName: expected.program_name || null,
        actualProgramName: output.object.programName || null
      });
    }

    const previous = seenIds.get(output.object.opportunityId);
    if (previous) {
      duplicateOpportunityIds.push({
        opportunityId: output.object.opportunityId,
        files: [previous, output.fileName]
      });
    } else {
      seenIds.set(output.object.opportunityId, output.fileName);
    }
  }

  return {
    missingOutputs,
    brokenOutputs,
    mismatchedOutputs,
    duplicateOpportunityIds,
    schemaWarnings,
    trailingTextOutputs
  };
}

function buildArtifact(parsedOutputs, validation) {
  const repairs = parsedOutputs
    .filter((output) => output.object?.schemaVersion === "retrofi_grant_package_repair.v1")
    .map((output) => normalizeRepairOutput(output));

  return {
    schemaVersion: "retrofi_grant_estimation_package_repairs_gpt_pro.v1",
    generatedAt: new Date().toISOString(),
    sourceWorkDir: path.relative(repoRoot, workDir),
    sourceFiles: repairs.map((repair) => repair.sourceFile),
    repairCount: repairs.length,
    counts: {
      calculationStatusCounts: countBy(repairs, (repair) => repair.packagePatch?.calculation_status || "unknown"),
      researchStatusCounts: countBy(repairs, (repair) => repair.status || "unknown"),
      sourceConfidenceCounts: countBy(repairs, (repair) => repair.sourceConfidence || "unknown"),
      estimateConfidenceCounts: countBy(repairs, (repair) => repair.estimateConfidenceIfInputsPresent || "unknown"),
      valueModelKindCounts: countBy(
        repairs.flatMap((repair) => repair.packagePatch?.effects_to_add_or_update || []),
        (effect) => effect.value_model_kind || "unknown"
      ),
      calculationMethodCounts: countBy(
        repairs.flatMap((repair) => repair.packagePatch?.effects_to_add_or_update || []),
        (effect) => effect.calculation?.method || "unknown"
      ),
      defaultUserFacingIncludedEffectCount: repairs
        .flatMap((repair) => repair.packagePatch?.effects_to_add_or_update || [])
        .filter((effect) => effect.includedInUserFacingTotalDefault === true).length
    },
    validationWarnings: [
      ...validation.schemaWarnings.map((warning) => `${warning.fileName} used unexpected schema ${warning.schemaVersion}.`),
      ...validation.trailingTextOutputs.map(
        (warning) =>
          `${warning.fileName} contained ${warning.trailingTextLength} trailing characters after the first JSON object; imported the first JSON object and ignored trailing text.`
      ),
      ...validation.duplicateOpportunityIds.map(
        (duplicate) => `Duplicate opportunity output ${duplicate.opportunityId}: ${duplicate.files.join(", ")}.`
      ),
      ...validation.missingOutputs.map(
        (missing) =>
          `${missing.fileName} is missing JSON for ${missing.expectedOpportunityId || "unknown expected opportunity"} (${missing.expectedProgramName || "unknown program"}).`
      )
    ],
    missingOutputs: validation.missingOutputs,
    repairs
  };
}

function normalizeRepairOutput(output) {
  const object = output.object;
  return {
    schemaVersion: object.schemaVersion,
    sourceFile: output.fileName,
    outputIndex: output.outputIndex,
    researchedAt: object.researchedAt || null,
    opportunityId: object.opportunityId,
    programName: object.programName || null,
    status: object.status || null,
    sourceConfidence: object.sourceConfidence || null,
    estimateConfidenceIfInputsPresent: object.estimateConfidenceIfInputsPresent || null,
    officialSources: normalizeSourceRows(object.officialSources || []),
    sourceSummary: cleanText(object.sourceSummary || ""),
    packagePatch: object.packagePatch || {},
    testCaseInputHints: object.testCaseInputHints || [],
    remainingGaps: object.remainingGaps || [],
    doNotUseAsUserFacingEstimateReasons: object.doNotUseAsUserFacingEstimateReasons || []
  };
}

function normalizeSourceRows(rows) {
  return (rows || []).map((row) => ({
    ...row,
    url: normalizeUrl(row.url || row.sourceUrl || row.href || "")
  }));
}

function applyGrantPackageRepairsToPackages(packagesArtifact, repairs) {
  const packages = packagesArtifact.packages || [];
  const packageById = new Map(packages.map((pkg) => [pkg.opportunity_id, pkg]));
  const warnings = [];
  const stats = {
    appliedCount: 0,
    effectUpdatedCount: 0,
    effectAddedCount: 0,
    rateTableUpsertCount: 0,
    inputRequirementUpsertCount: 0,
    warnings
  };

  for (const repair of repairs) {
    const pkg = packageById.get(repair.opportunityId);
    if (!pkg) {
      warnings.push(`Missing v2 package for ${repair.opportunityId} from ${repair.sourceFile}.`);
      continue;
    }

    applyGrantPackageRepairToPackage({ pkg, repair, stats });
    stats.appliedCount += 1;
  }

  packagesArtifact.generatedAt = new Date().toISOString();
  packagesArtifact.grantEstimationRepairAppliedAt = new Date().toISOString();
  packagesArtifact.grantEstimationRepairArtifact = path.relative(repoRoot, artifactPath);
  packagesArtifact.grantEstimationRepairCount = stats.appliedCount;
  packagesArtifact.grantEstimationRepairMissingOutputCount = repairs.length < outputFiles.length ? outputFiles.length - repairs.length : 0;
  packagesArtifact.packageCount = packages.length;
  packagesArtifact.statusCounts = countBy(packages, (pkg) => pkg.calculation_status || "unknown");
  packagesArtifact.confidenceCounts = countBy(packages, (pkg) => confidenceLabel(pkg.confidence?.overall));

  return stats;
}

function applyGrantPackageRepairToPackage({ pkg, repair, stats }) {
  const patch = repair.packagePatch || {};
  const effectPatches = patch.effects_to_add_or_update || [];
  const inputPatches = normalizeInputRequirements(patch.input_requirements_to_add_or_update || [], null);
  const inputByKey = new Map(inputPatches.map((input) => [input.input_key, input]));
  const evidenceId = `grant_package_repair_${shortHash(repair.opportunityId)}`;
  const sourceUrls = uniqueStrings([
    ...normalizeUrls(repair.officialSources?.map((source) => source.url) || []),
    ...normalizeUrls(effectPatches.flatMap((effect) => effect.sourceUrlsChecked || []))
  ]);
  const sourceEvidence = {
    evidence_id: evidenceId,
    source_type: "gpt_pro_grant_estimation_package_repair",
    quote: repair.sourceSummary || repair.programName || repair.opportunityId,
    source_urls: sourceUrls,
    evidence_confidence: confidenceNumber(repair.sourceConfidence)
  };

  pkg.source_evidence = [
    ...(pkg.source_evidence || []).filter((evidence) => evidence.evidence_id !== evidenceId),
    sourceEvidence
  ];

  if (patch.calculation_status) pkg.calculation_status = patch.calculation_status;
  pkg.availability = {
    ...(pkg.availability || {}),
    ...normalizeAvailability(patch.availability || {})
  };

  for (const effectPatch of effectPatches) {
    const result = upsertPatchedEffect({ pkg, repair, effectPatch, inputByKey, evidenceId });
    stats.effectUpdatedCount += result.updated ? 1 : 0;
    stats.effectAddedCount += result.added ? 1 : 0;
    stats.rateTableUpsertCount += result.rateTableUpserted ? 1 : 0;
  }

  const patchedInputs = [
    ...inputPatches,
    ...(pkg.effects || []).flatMap((effect) => effect.required_inputs || [])
  ];
  const beforeInputCount = (pkg.input_requirements || []).length;
  pkg.input_requirements = dedupeInputRequirements([...(pkg.input_requirements || []), ...patchedInputs]);
  stats.inputRequirementUpsertCount += Math.max(0, pkg.input_requirements.length - beforeInputCount);

  const sourceConfidence = confidenceNumber(repair.sourceConfidence);
  const estimateConfidence = confidenceNumber(repair.estimateConfidenceIfInputsPresent);
  pkg.confidence = {
    ...(pkg.confidence || {}),
    overall: Math.min(sourceConfidence, estimateConfidence),
    source_access: sourceConfidence,
    availability: sourceConfidence,
    calculation: estimateConfidence,
    extraction: sourceConfidence,
    reason_codes: uniqueStrings([
      ...(pkg.confidence?.reason_codes || []),
      "grant_estimation_package_repair_applied",
      `grant_estimation_research_status_${repair.status || "unknown"}`,
      `source_confidence_${repair.sourceConfidence || "unknown"}`,
      `estimate_confidence_${repair.estimateConfidenceIfInputsPresent || "unknown"}`,
      `calculation_status_${patch.calculation_status || pkg.calculation_status || "unknown"}`
    ])
  };

  pkg.migration_metadata = {
    ...(pkg.migration_metadata || {}),
    grant_estimation_package_repair_applied_at: new Date().toISOString(),
    grant_estimation_package_repair_artifact: path.relative(repoRoot, artifactPath),
    grant_estimation_package_repair_source_file: repair.sourceFile,
    grant_estimation_package_repair_status: repair.status || null,
    grant_estimation_package_repair_remaining_gaps: repair.remainingGaps || []
  };
}

function upsertPatchedEffect({ pkg, repair, effectPatch, inputByKey, evidenceId }) {
  const effects = pkg.effects || [];
  let effect = effects.find((item) => item.effect_id === effectPatch.effect_id);
  const added = !effect;
  if (!effect) {
    effect = buildNewEffect({ pkg, effectPatch, repair });
    effects.push(effect);
    pkg.effects = effects;
  }

  const calculationResult = buildCalculationSpec({ pkg, effectPatch, repair });
  const requiredInputs = normalizeInputRequirementsForEffect({
    existingInputs: effect.required_inputs || [],
    requiredKeys: effectPatch.required_inputs || [],
    inputByKey,
    effectId: effect.effect_id
  });

  effect.label = effect.label || labelFromEffectPatch(effectPatch, repair);
  effect.effect_type = normalizeEffectType(effectPatch.effect_type || effect.effect_type);
  effect.cash_flow_direction = effect.effect_type === "recurring_expense" ? "cost" : "benefit";
  effect.timing = {
    ...(effect.timing || { cadence: "one_time" }),
    ...timingFromAvailability(repair.packagePatch?.availability || {})
  };
  effect.calculation = calculationResult.calculation;
  effect.caps = mergeCaps(effect.caps || [], effectPatch);
  effect.required_inputs = requiredInputs;
  effect.evidence_refs = uniqueStrings([...(effect.evidence_refs || []), evidenceId]);
  effect.included_in_user_facing_total = effectPatch.includedInUserFacingTotalDefault === true;

  const estimateConfidence = confidenceNumber(repair.estimateConfidenceIfInputsPresent);
  const sourceConfidence = confidenceNumber(repair.sourceConfidence);
  effect.confidence = {
    ...(effect.confidence || {}),
    overall: Math.min(estimateConfidence, sourceConfidence),
    calculation: estimateConfidence,
    extraction: sourceConfidence,
    reason_codes: uniqueStrings([
      ...(effect.confidence?.reason_codes || []),
      "grant_estimation_package_repair_applied",
      `grant_research_status_${repair.status || "unknown"}`,
      `source_confidence_${repair.sourceConfidence || "unknown"}`,
      `estimate_confidence_${repair.estimateConfidenceIfInputsPresent || "unknown"}`,
      `value_model_${effectPatch.value_model_kind || "unknown"}`,
      ...(effectPatch.reasonCodes || [])
    ])
  };

  effect.repair_metadata = {
    ...(effect.repair_metadata || {}),
    repair_status: repair.status || effect.repair_metadata?.repair_status || null,
    calculation_status: repair.packagePatch?.calculation_status || effect.repair_metadata?.calculation_status || null,
    value_model_kind: effectPatch.value_model_kind || effect.repair_metadata?.value_model_kind || null,
    cash_value_classification: effectPatch.cash_value_classification || effect.repair_metadata?.cash_value_classification || null,
    included_in_user_facing_total_default: effectPatch.includedInUserFacingTotalDefault === true,
    human_review_required: effectPatch.humanReviewRequired === true,
    human_review_reasons: uniqueStrings([
      ...(effect.repair_metadata?.human_review_reasons || []),
      ...(effectPatch.reasonCodes || []),
      ...(repair.doNotUseAsUserFacingEstimateReasons || [])
    ]),
    grant_estimation_package_repair: {
      source_file: repair.sourceFile,
      output_index: repair.outputIndex,
      researched_at: repair.researchedAt,
      repair_status: repair.status,
      calculation_status: repair.packagePatch?.calculation_status || null,
      availability: normalizeAvailability(repair.packagePatch?.availability || {}),
      source_confidence: repair.sourceConfidence || null,
      estimate_confidence_if_inputs_present: repair.estimateConfidenceIfInputsPresent || null,
      value_model_kind: effectPatch.value_model_kind || null,
      cash_value_classification: effectPatch.cash_value_classification || null,
      missing_input_behavior: effectPatch.missing_input_behavior || null,
      reason_codes: effectPatch.reasonCodes || [],
      calculation_trace: effectPatch.calculationTrace || [],
      source_summary: repair.sourceSummary || "",
      official_sources: repair.officialSources || [],
      test_case_input_hints: repair.testCaseInputHints || [],
      remaining_gaps: repair.remainingGaps || [],
      do_not_use_as_user_facing_estimate_reasons: repair.doNotUseAsUserFacingEstimateReasons || []
    }
  };

  return {
    added,
    updated: !added,
    rateTableUpserted: calculationResult.rateTableUpserted
  };
}

function buildNewEffect({ pkg, effectPatch, repair }) {
  const template = (pkg.effects || [])[0] || {};
  return {
    effect_id: effectPatch.effect_id || `effect_grant_repair_${shortHash(`${repair.opportunityId}|${Date.now()}`)}`,
    label: labelFromEffectPatch(effectPatch, repair),
    effect_type: normalizeEffectType(effectPatch.effect_type),
    cash_flow_direction: effectPatch.effect_type === "recurring_expense" ? "cost" : "benefit",
    timing: template.timing || { cadence: "one_time", source_timing: "unknown" },
    calculation: { method: "zero_when_not_applicable", reason: "Created by grant package repair importer." },
    limits: [],
    caps: [],
    required_inputs: [],
    evidence_refs: [],
    confidence: {
      overall: 0.38,
      calculation: 0.38,
      extraction: 0.38,
      reason_codes: ["grant_estimation_package_repair_created_effect"]
    }
  };
}

function buildCalculationSpec({ pkg, effectPatch, repair }) {
  const rawCalculation = effectPatch.calculation || {};
  const calculation = toSnakeObject(rawCalculation);
  const method = calculation.method || "zero_when_not_applicable";
  const base = {
    ...calculation,
    method,
    grant_value_model_kind: effectPatch.value_model_kind || null,
    cash_value_classification: effectPatch.cash_value_classification || null,
    source_repair_status: repair.status || null
  };

  if (method === "rate_table") {
    const table = buildRateTable({ pkg, effectPatch });
    pkg.rate_tables = [
      ...(pkg.rate_tables || []).filter((item) => item.table_id !== table.table_id),
      table
    ];
    return {
      calculation: {
        ...base,
        rate_table_id: table.table_id,
        lookup_inputs: table.dimensions
      },
      rateTableUpserted: true
    };
  }

  if (method === "fixed_amount") {
    return {
      calculation: {
        ...base,
        amount: centsToMoney(calculation.amount_cents)
      },
      rateTableUpserted: false
    };
  }

  if (method === "per_unit") {
    return {
      calculation: {
        ...base,
        rate: { amount: centsToMoney(firstFinite(calculation.rate_cents, calculation.amount_cents)), unit: calculation.unit || "unit" },
        quantity_input: findQuantityInput(effectPatch.required_inputs || []) || "unit_count"
      },
      rateTableUpserted: false
    };
  }

  if (method === "percent_of_cost") {
    return {
      calculation: {
        ...base,
        percent: normalizePercent(calculation.percent),
        cost_input: findCostInput(effectPatch.required_inputs || []) || "eligible_project_cost_cents"
      },
      rateTableUpserted: false
    };
  }

  if (method === "expected_value") {
    return {
      calculation: {
        ...base,
        probability_discount: normalizePercent(calculation.probability_discount),
        conditional_award_cents: finiteOrNull(calculation.conditional_award_cents),
        max_award_cents: finiteOrNull(calculation.max_award_cents),
        min_award_cents: finiteOrNull(calculation.min_award_cents)
      },
      rateTableUpserted: false
    };
  }

  if (method === "expression") {
    return {
      calculation: {
        ...base,
        expression_id: calculation.expression_id || null,
        expression_text:
          calculation.expression_text ||
          calculation.expression ||
          calculation.conditional_award_formula ||
          "Expression requires future formula-engine support."
      },
      rateTableUpserted: false
    };
  }

  if (method === "custom_quote") {
    return {
      calculation: {
        ...base,
        reason: calculation.reason || effectPatch.missing_input_behavior || "Project-specific quote or program review required."
      },
      rateTableUpserted: false
    };
  }

  if (method === "zero_when_not_applicable") {
    return {
      calculation: {
        ...base,
        reason:
          calculation.reason ||
          effectPatch.missing_input_behavior ||
          "Grant package repair classified this effect as not calculable or not applicable."
      },
      rateTableUpserted: false
    };
  }

  return { calculation: base, rateTableUpserted: false };
}

function buildRateTable({ pkg, effectPatch }) {
  const calculation = effectPatch.calculation || {};
  const rows = (calculation.rate_rows || []).map(normalizeRateTableRow);
  const dimensions = inferRateTableDimensions(rows);
  const tableId =
    calculation.rate_table_id ||
    `grant_repair_rate_table_${shortHash(`${pkg.opportunity_id}|${effectPatch.effect_id}`)}`;

  return {
    table_id: tableId,
    name: `${pkg.program_name || pkg.opportunity_id} grant repair rates`,
    dimensions,
    rows,
    source: "gpt_pro_grant_estimation_package_repair",
    source_effect_id: effectPatch.effect_id,
    source_value_model_kind: effectPatch.value_model_kind || null
  };
}

function normalizeRateTableRow(row) {
  const normalized = toCamelObject(row || {});
  normalized.sourceRow = row;

  if (Number.isFinite(row?.amount_cents)) normalized.amountCents = Number(row.amount_cents);
  if (Number.isFinite(row?.rate_cents)) normalized.rateCents = Number(row.rate_cents);
  if (Number.isFinite(row?.rate_dollars)) normalized.rateDollars = Number(row.rate_dollars);
  if (Number.isFinite(row?.rate_cents_per_kwh)) normalized.rateCentsPerKwh = Number(row.rate_cents_per_kwh);
  if (Number.isFinite(row?.rate_cents_per_kw)) normalized.rateCentsPerKw = Number(row.rate_cents_per_kw);
  if (Number.isFinite(row?.rate_cents_per_peak_kw)) normalized.rateCentsPerPeakKw = Number(row.rate_cents_per_peak_kw);
  if (Number.isFinite(row?.rate_cents_per_battery_kwh)) {
    normalized.rateCentsPerBatteryKwh = Number(row.rate_cents_per_battery_kwh);
  }
  if (Number.isFinite(row?.percent_of_eligible_installed_cost)) {
    normalized.percent = Number(row.percent_of_eligible_installed_cost);
  }
  if (Number.isFinite(row?.max_percent_of_eligible_cost)) {
    normalized.maxPercentOfEligibleCost = Number(row.max_percent_of_eligible_cost);
  }

  for (const [key, unit] of [
    ["rate_cents_per_port", "port"],
    ["rate_cents_per_lamp", "lamp"],
    ["rate_cents_per_fixture", "fixture"],
    ["rate_cents_per_unit", "unit"],
    ["rate_cents_per_watt", "watt"]
  ]) {
    if (Number.isFinite(row?.[key]) && !Number.isFinite(normalized.rateCents)) {
      normalized.rateCents = Number(row[key]);
      normalized.unit = normalized.unit || unit;
    }
  }

  return normalized;
}

function inferRateTableDimensions(rows) {
  const excluded = /(^source|note|notes|eligibility|amount|rate|percent|cap|cost|award|minimum|maximum|tier_start|tier_end|range|unit$)/i;
  const dimensions = new Set();
  for (const row of rows) {
    for (const [key, value] of Object.entries(row || {})) {
      if (key === "sourceRow" || excluded.test(key)) continue;
      if (typeof value === "string" || typeof value === "boolean") dimensions.add(key);
    }
  }
  return [...dimensions].sort().slice(0, 8);
}

function normalizeInputRequirements(inputs, fallbackEffectId) {
  return (inputs || [])
    .filter((input) => input?.input_key || input?.inputKey)
    .map((input) => normalizeInputRequirement(input, fallbackEffectId));
}

function normalizeInputRequirement(input, fallbackEffectId) {
  const inputKey = safeInputKey(input.input_key || input.inputKey);
  return {
    ...toSnakeObject(input),
    input_key: inputKey,
    label: input.label || labelFromInputKey(inputKey),
    value_type: input.value_type || input.valueType || valueTypeForInputKey(inputKey),
    required_for: uniqueStrings([...(input.required_for || input.requiredFor || []), fallbackEffectId].filter(Boolean)),
    source_precedence: uniqueStrings(input.source_precedence || input.sourcePrecedence || sourcePrecedenceForInputKey(inputKey)),
    missing_severity: input.missing_severity || input.missingSeverity || "blocks_calculation"
  };
}

function normalizeInputRequirementsForEffect({ existingInputs, requiredKeys, inputByKey, effectId }) {
  const generated = (requiredKeys || []).map((inputKey) => {
    const normalizedKey = safeInputKey(inputKey);
    const patched = inputByKey.get(normalizedKey);
    return normalizeInputRequirement(
      patched || {
        input_key: normalizedKey,
        label: labelFromInputKey(normalizedKey),
        value_type: valueTypeForInputKey(normalizedKey),
        required_for: [effectId],
        source_precedence: sourcePrecedenceForInputKey(normalizedKey),
        missing_severity: "blocks_calculation"
      },
      effectId
    );
  });

  return dedupeInputRequirements([
    ...(existingInputs || []).map((input) => normalizeInputRequirement(input, effectId)),
    ...generated
  ]);
}

function mergeCaps(existingCaps, effectPatch) {
  const calculation = effectPatch.calculation || {};
  const generated = [];
  if (Number.isFinite(calculation.max_award_cents)) {
    generated.push({
      cap_type: "maximum_amount",
      amount: centsToMoney(calculation.max_award_cents),
      applies_to: "effect",
      source: "grant_estimation_package_repair"
    });
  }
  if (Number.isFinite(calculation.percent) && effectPatch.value_model_kind === "capped_percent_of_eligible_cost") {
    generated.push({
      cap_type: "maximum_percent_of_cost",
      percent: normalizePercent(calculation.percent),
      applies_to: "effect",
      source: "grant_estimation_package_repair"
    });
  }
  return [
    ...(existingCaps || []).filter((cap) => cap.source !== "grant_estimation_package_repair"),
    ...generated
  ];
}

function timingFromAvailability(availability = {}) {
  return {
    funding_status: availability.funding_status || availability.fundingStatus || undefined,
    application_deadline: availability.applicationDeadline || availability.application_deadline || undefined
  };
}

function normalizeAvailability(availability = {}) {
  const normalized = toSnakeObject(availability);
  if (availability.fundingStatus && !normalized.funding_status) normalized.funding_status = availability.fundingStatus;
  if (availability.sourceAccessStatus && !normalized.source_access_status) {
    normalized.source_access_status = availability.sourceAccessStatus;
  }
  return normalized;
}

function labelFromEffectPatch(effectPatch, repair) {
  const model = effectPatch.value_model_kind ? effectPatch.value_model_kind.replace(/_/g, " ") : "grant estimate";
  return `${repair.programName || repair.opportunityId}: ${model}`;
}

function validatePackages(packages) {
  const invalidSamples = [];
  let invalidCount = 0;
  for (const pkg of packages) {
    const validation = validateIncentiveCalculationPackageV2(pkg);
    if (!validation.valid) {
      invalidCount += 1;
      if (invalidSamples.length < 20) invalidSamples.push({ opportunityId: pkg.opportunity_id, errors: validation.errors });
    }
  }
  return { packageCount: packages.length, invalidCount, invalidSamples };
}

function buildReport({ grantArtifact, applyResult, packageValidation, parsedOutputs, validation }) {
  const lines = [];
  lines.push("# Grant Estimation Package Repair Intake Report");
  lines.push("");
  lines.push(`Generated: ${new Date().toISOString()}`);
  lines.push(`Source folder: \`${path.relative(repoRoot, workDir)}\``);
  lines.push("");
  lines.push("## Output Validation");
  lines.push("");
  lines.push(`- Output files found: ${parsedOutputs.length}`);
  lines.push(`- Valid repair outputs imported: ${grantArtifact.repairCount}`);
  lines.push(`- Missing outputs: ${validation.missingOutputs.length}`);
  lines.push(`- Broken JSON outputs: ${validation.brokenOutputs.length}`);
  lines.push(`- Opportunity ID mismatches: ${validation.mismatchedOutputs.length}`);
  lines.push(`- Duplicate opportunity IDs in imported outputs: ${validation.duplicateOpportunityIds.length}`);
  lines.push(`- Outputs with trailing text ignored after JSON: ${validation.trailingTextOutputs.length}`);
  lines.push("");

  if (validation.missingOutputs.length > 0) {
    lines.push("### Missing Outputs");
    lines.push("");
    lines.push("| File | Expected opportunity | Program |");
    lines.push("| --- | --- | --- |");
    for (const missing of validation.missingOutputs) {
      lines.push(`| ${missing.fileName} | ${missing.expectedOpportunityId || ""} | ${missing.expectedProgramName || ""} |`);
    }
    lines.push("");
  }

  if (grantArtifact.validationWarnings.length || applyResult.warnings.length) {
    lines.push("## Warnings");
    lines.push("");
    for (const warning of [...grantArtifact.validationWarnings, ...applyResult.warnings]) {
      lines.push(`- ${warning}`);
    }
    lines.push("");
  }

  lines.push("## Import Summary");
  lines.push("");
  lines.push(`- Repairs applied to v2 packages: ${applyResult.appliedCount}`);
  lines.push(`- Effects updated: ${applyResult.effectUpdatedCount}`);
  lines.push(`- Effects added: ${applyResult.effectAddedCount}`);
  lines.push(`- Rate tables upserted: ${applyResult.rateTableUpsertCount}`);
  lines.push(`- Net package input requirements added: ${applyResult.inputRequirementUpsertCount}`);
  lines.push("");
  lines.push("### Package Calculation Status Counts");
  lines.push("");
  appendCountTable(lines, grantArtifact.counts.calculationStatusCounts);
  lines.push("");
  lines.push("### Research Status Counts");
  lines.push("");
  appendCountTable(lines, grantArtifact.counts.researchStatusCounts);
  lines.push("");
  lines.push("### Calculation Method Counts");
  lines.push("");
  appendCountTable(lines, grantArtifact.counts.calculationMethodCounts);
  lines.push("");
  lines.push("### Estimate Confidence Counts");
  lines.push("");
  appendCountTable(lines, grantArtifact.counts.estimateConfidenceCounts);
  lines.push("");
  lines.push("### Source Confidence Counts");
  lines.push("");
  appendCountTable(lines, grantArtifact.counts.sourceConfidenceCounts);
  lines.push("");
  lines.push(`- Effects included in user-facing totals by default: ${grantArtifact.counts.defaultUserFacingIncludedEffectCount}`);
  lines.push("");
  lines.push("## Package Validation");
  lines.push("");
  lines.push(`- Packages validated: ${packageValidation.packageCount}`);
  lines.push(`- Invalid packages: ${packageValidation.invalidCount}`);
  lines.push("");
  lines.push("## Artifacts");
  lines.push("");
  lines.push(`- Repair artifact: \`${path.relative(repoRoot, artifactPath)}\``);
  lines.push(`- Updated packages: \`${path.relative(repoRoot, packagesPath)}\``);
  lines.push("");
  return `${lines.join("\n")}\n`;
}

function appendCountTable(lines, counts) {
  lines.push("| Key | Count |");
  lines.push("| --- | ---: |");
  for (const [key, count] of Object.entries(counts || {}).sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))) {
    lines.push(`| ${key} | ${count} |`);
  }
}

function normalizeUrls(values) {
  const urls = [];
  for (const value of values || []) {
    const text = String(value || "");
    const matches = text.match(/https?:\/\/[^\s\]\)"'<>]+/g) || [];
    urls.push(...matches.map(normalizeUrl));
  }
  return uniqueStrings(urls);
}

function normalizeUrl(value) {
  return String(value || "").trim().replace(/[.,;]+$/g, "");
}

function cleanText(value) {
  return String(value || "")
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
    .replace(/\s+/g, " ")
    .trim();
}

function normalizeEffectType(value) {
  const allowed = new Set([
    "one_time_savings",
    "recurring_savings",
    "recurring_expense",
    "grant_expected_value",
    "tax_credit",
    "tax_exemption",
    "tax_abatement",
    "tax_rate_preference",
    "property_tax_valuation",
    "financing_subsidy",
    "process_value",
    "no_cash_value"
  ]);
  return allowed.has(value) ? value : "grant_expected_value";
}

function valueTypeForInputKey(inputKey) {
  if (/cents|cost|amount|budget|price|invoice|funding|award|match|tax|liability/i.test(inputKey)) return "money_cents";
  if (/count|quantity|number|units|ports|chargers|kw|kwh|watts|r_value|square_feet|capacity/i.test(inputKey)) return "number";
  if (/date|deadline/i.test(inputKey)) return "text";
  if (/is_|has_|confirmed|completed|required|eligible|approved|executed|owns|operates/i.test(inputKey)) return "boolean_or_status";
  return "text";
}

function sourcePrecedenceForInputKey(inputKey) {
  if (/cost|amount|budget|price|invoice|quote|award|match|tax|liability/i.test(inputKey)) {
    return ["quote", "program_application", "paid_invoice", "user_profile", "admin_review"];
  }
  if (/kwh|kw|savings|usage|bill|rate|tariff|watts|capacity/i.test(inputKey)) {
    return ["quote", "utility_data", "retrofit_assumptions", "user_profile"];
  }
  if (/status|eligibility|qualification|approval|decision|funding|executed|confirmed/i.test(inputKey)) {
    return ["program_application", "admin_review", "user_profile"];
  }
  return ["user_profile", "retrofit_assumptions", "quote", "utility_data"];
}

function labelFromInputKey(inputKey) {
  return String(inputKey || "")
    .replace(/_cents$/i, "")
    .replace(/_/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());
}

function findCostInput(inputs = []) {
  return (inputs || []).find((input) => /cost|budget|expense|price|invoice|amount/i.test(input));
}

function findQuantityInput(inputs = []) {
  return (inputs || []).find((input) => /count|quantity|unit|ports|chargers|fixture|lamp|kw|kwh|watts|square_feet/i.test(input));
}

function normalizePercent(value) {
  if (value === null || value === undefined || value === "") return null;
  const number = Number(value);
  if (!Number.isFinite(number)) return null;
  return number > 1 && number <= 100 ? number / 100 : number;
}

function finiteOrNull(value) {
  const number = Number(value);
  return Number.isFinite(number) ? number : null;
}

function firstFinite(...values) {
  for (const value of values) {
    const number = Number(value);
    if (Number.isFinite(number)) return number;
  }
  return null;
}

function centsToMoney(cents) {
  return { value: Number(cents || 0) / 100, currency: "USD" };
}

function dedupeInputRequirements(inputs = []) {
  const byKey = new Map();
  for (const input of inputs) {
    if (!input?.input_key) continue;
    const normalized = normalizeInputRequirement(input);
    const existing = byKey.get(normalized.input_key);
    if (!existing) {
      byKey.set(normalized.input_key, normalized);
      continue;
    }
    byKey.set(normalized.input_key, {
      ...existing,
      required_for: uniqueStrings([...(existing.required_for || []), ...(normalized.required_for || [])]),
      source_precedence: uniqueStrings([...(existing.source_precedence || []), ...(normalized.source_precedence || [])]),
      missing_severity:
        existing.missing_severity === "optional" ? normalized.missing_severity : existing.missing_severity
    });
  }
  return [...byKey.values()];
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

function toCamelObject(value) {
  if (Array.isArray(value)) return value.map(toCamelObject);
  if (!value || typeof value !== "object") return value;
  return Object.fromEntries(Object.entries(value).map(([key, nested]) => [toCamelKey(key), toCamelObject(nested)]));
}

function toCamelKey(key) {
  return String(key).replace(/_([a-z0-9])/g, (_, char) => char.toUpperCase());
}

function safeInputKey(value) {
  return safeId(value).replace(/^_+|_+$/g, "") || "input";
}

function safeId(value) {
  return String(value || "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "_")
    .replace(/^_+|_+$/g, "")
    .slice(0, 120) || "item";
}

function readJson(filePath) {
  return JSON.parse(fs.readFileSync(filePath, "utf8"));
}

function countBy(rows, getter) {
  return rows.reduce((counts, row) => {
    const key = getter(row);
    counts[key] = (counts[key] || 0) + 1;
    return counts;
  }, {});
}

function uniqueStrings(values = []) {
  return [...new Set(values.map((value) => String(value || "").trim()).filter(Boolean))];
}

function confidenceNumber(value) {
  if (typeof value === "number") return Math.max(0, Math.min(1, value));
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

function shortHash(value) {
  return crypto.createHash("sha256").update(String(value)).digest("hex").slice(0, 16);
}
