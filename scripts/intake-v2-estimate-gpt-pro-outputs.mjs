import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import { validateIncentiveCalculationPackageV2 } from "../apps/api/server/savings/incentiveCalculationsV2.mjs";

const repoRoot = path.resolve(import.meta.dirname, "..");
const defaultWorkDir = path.join(
  repoRoot,
  "GPT Pro Work",
  "v2-input-resolution-and-grant-probability-2026-07-02"
);
const defaultPackagesPath = path.join(repoRoot, "data", "opportunity_incentive_calculation_packages_v2.json");
const defaultInputArtifactPath = path.join(
  repoRoot,
  "data",
  "v2_estimate_input_resolution_research_gpt_pro_2026-07-02.json"
);
const defaultGrantArtifactPath = path.join(
  repoRoot,
  "data",
  "grant_probability_research_repairs_gpt_pro_2026-07-02.json"
);
const defaultReportPath = path.join(repoRoot, "data", "v2_estimate_gpt_pro_intake_report.md");

const options = parseArgs(process.argv.slice(2));
const workDir = path.resolve(options.workDir || defaultWorkDir);
const packagesPath = path.resolve(options.packagesPath || defaultPackagesPath);
const inputArtifactPath = path.resolve(options.inputArtifactPath || defaultInputArtifactPath);
const grantArtifactPath = path.resolve(options.grantArtifactPath || defaultGrantArtifactPath);
const reportPath = path.resolve(options.reportPath || defaultReportPath);

const outputFiles = fs
  .readdirSync(workDir)
  .filter((file) => file.startsWith("output_") && file.endsWith(".md"))
  .sort();

const parsedOutputs = outputFiles.map((file) => parseOutputFile(path.join(workDir, file), file));
const inputOutputs = parsedOutputs.filter((output) => output.object.schemaVersion === "retrofi_v2_input_resolution.v1");
const grantOutputs = parsedOutputs.filter((output) => output.object.schemaVersion === "retrofi_grant_probability_repair.v1");
const inputArtifact = buildInputArtifact(inputOutputs);
const grantArtifact = buildGrantArtifact(grantOutputs, parsedOutputs);
const packagesArtifact = readJson(packagesPath);
const applyResult = applyGrantRepairsToPackages(packagesArtifact, grantArtifact.repairs);
const validation = validatePackages(packagesArtifact.packages || []);

if (validation.invalidCount > 0) {
  throw new Error(`Grant repair application generated invalid v2 packages: ${JSON.stringify(validation.invalidSamples, null, 2)}`);
}

fs.writeFileSync(inputArtifactPath, `${JSON.stringify(inputArtifact, null, 2)}\n`);
fs.writeFileSync(grantArtifactPath, `${JSON.stringify(grantArtifact, null, 2)}\n`);
fs.writeFileSync(packagesPath, `${JSON.stringify(packagesArtifact, null, 2)}\n`);
fs.writeFileSync(
  reportPath,
  buildReport({ inputArtifact, grantArtifact, applyResult, validation, parsedOutputs }),
  "utf8"
);

console.log("Intook v2 estimate GPT Pro outputs.");
console.log(`Input mappings: ${inputArtifact.inputMappings.length}`);
console.log(`Grant repairs: ${grantArtifact.repairs.length}`);
console.log(`Grant repairs applied: ${applyResult.appliedCount}`);
console.log(`Warnings: ${grantArtifact.validationWarnings.length + inputArtifact.validationWarnings.length}`);
console.log(`Input artifact: ${path.relative(repoRoot, inputArtifactPath)}`);
console.log(`Grant artifact: ${path.relative(repoRoot, grantArtifactPath)}`);
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
  const extracted = extractFirstJsonObject(raw);
  return {
    fileName,
    object: JSON.parse(extracted.json),
    trailingText: extracted.trailing,
    trailingTextLength: extracted.trailing.length
  };
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

function buildInputArtifact(inputOutputs) {
  const validationWarnings = [];
  const promptIds = new Set();
  const globalRules = [];
  const inputMappings = [];
  const retrofitQuantityOverrides = [];
  const missingUiTodos = [];
  const questionsForRetroFi = [];

  for (const output of inputOutputs) {
    const object = output.object;
    if (promptIds.has(object.promptId)) {
      validationWarnings.push(`Duplicate input-resolution prompt id: ${object.promptId}`);
    }
    promptIds.add(object.promptId);
    globalRules.push(...annotateRows(object.globalRules || [], output.fileName));
    inputMappings.push(...annotateRows(object.inputMappings || [], output.fileName));
    retrofitQuantityOverrides.push(...annotateRows(object.retrofitQuantityOverrides || [], output.fileName));
    missingUiTodos.push(...annotateRows(object.missingUiTodos || [], output.fileName));
    questionsForRetroFi.push(...(object.questionsForRetroFi || []).map((question) => ({
      question,
      sourceFile: output.fileName
    })));
  }

  const canonicalInputCounts = countBy(inputMappings, (mapping) => mapping.canonicalInputKey || "unknown");
  const sourceStrategyCounts = countBy(inputMappings, (mapping) => mapping.sourceStrategy || "unknown");
  const uiPlacementCounts = countBy(inputMappings, (mapping) => mapping.uiPlacement || "unknown");

  return {
    schemaVersion: "retrofi_v2_input_resolution_research_gpt_pro.v1",
    generatedAt: new Date().toISOString(),
    sourceWorkDir: path.relative(repoRoot, workDir),
    sourceFiles: inputOutputs.map((output) => output.fileName),
    promptIds: [...promptIds].sort(),
    globalRules,
    inputMappings,
    retrofitQuantityOverrides,
    missingUiTodos,
    questionsForRetroFi,
    counts: {
      globalRuleCount: globalRules.length,
      inputMappingCount: inputMappings.length,
      retrofitQuantityOverrideCount: retrofitQuantityOverrides.length,
      missingUiTodoCount: missingUiTodos.length,
      questionCount: questionsForRetroFi.length,
      canonicalInputCounts,
      sourceStrategyCounts,
      uiPlacementCounts
    },
    validationWarnings
  };
}

function buildGrantArtifact(grantOutputs, parsedOutputs) {
  const validationWarnings = [];
  const repairs = [];
  const seenRepairIds = new Set();

  for (const output of parsedOutputs.filter((item) => item.trailingTextLength > 0)) {
    validationWarnings.push(
      `${output.fileName} contained ${output.trailingTextLength} trailing characters after the first JSON object; imported the first JSON object and ignored trailing text.`
    );
  }

  for (const output of grantOutputs) {
    const object = output.object;
    const expectedCount = expectedRepairCountForRange(object.batchRange);
    if (expectedCount !== null && expectedCount !== (object.repairs || []).length) {
      validationWarnings.push(
        `${output.fileName} batch ${object.batchRange} expected ${expectedCount} repairs but contained ${(object.repairs || []).length}.`
      );
    }

    for (const repair of object.repairs || []) {
      const repairId = `${repair.opportunityId}|${repair.effectId}`;
      if (seenRepairIds.has(repairId)) validationWarnings.push(`Duplicate grant repair target: ${repairId}`);
      seenRepairIds.add(repairId);
      repairs.push(normalizeGrantRepair(repair, output));
    }
  }

  const statusCounts = countBy(repairs, (repair) => repair.expectedValueRecommendation?.estimateStatus || "unknown");
  const valueModelCounts = countBy(repairs, (repair) => repair.grantValueModelKind || "unknown");
  const probabilityEvidenceCounts = countBy(repairs, (repair) => repair.probabilityEvidence?.probabilityEvidenceType || "unknown");
  const sourceConfidenceCounts = countBy(repairs, (repair) => repair.sourceConfidence || "unknown");

  return {
    schemaVersion: "retrofi_grant_probability_research_repairs_gpt_pro.v1",
    generatedAt: new Date().toISOString(),
    sourceWorkDir: path.relative(repoRoot, workDir),
    sourceFiles: grantOutputs.map((output) => output.fileName),
    repairCount: repairs.length,
    counts: {
      statusCounts,
      valueModelCounts,
      probabilityEvidenceCounts,
      sourceConfidenceCounts,
      repairsWithProbabilityDiscount: repairs.filter((repair) =>
        Number.isFinite(repair.probabilityEvidence?.probabilityDiscount)
      ).length,
      repairsIncludedInUserFacingTotalDefault: repairs.filter(
        (repair) => repair.expectedValueRecommendation?.includeInUserFacingTotalDefault === true
      ).length
    },
    validationWarnings,
    repairs
  };
}

function normalizeGrantRepair(repair, output) {
  const conditionalAward = repair.conditionalAward || {};
  const probabilityEvidence = repair.probabilityEvidence || {};
  const expectedValueRecommendation = repair.expectedValueRecommendation || {};

  return {
    ...repair,
    sourceFile: output.fileName,
    batchRange: output.object.batchRange || null,
    sourceUrlsChecked: normalizeUrls(repair.sourceUrlsChecked || []),
    rawEvidenceText: repair.evidenceText || "",
    evidenceText: cleanEvidenceText(repair.evidenceText || ""),
    conditionalAward: {
      ...conditionalAward,
      costSharePercent: normalizePercent(conditionalAward.costSharePercent)
    },
    probabilityEvidence: {
      ...probabilityEvidence,
      probabilityDiscount: normalizePercent(probabilityEvidence.probabilityDiscount)
    },
    expectedValueRecommendation: {
      ...expectedValueRecommendation,
      includeInUserFacingTotalDefault: expectedValueRecommendation.includeInUserFacingTotalDefault === true
    },
    fallbackPriorSuggestion: {
      ...(repair.fallbackPriorSuggestion || {}),
      probabilityDiscount: normalizePercent(repair.fallbackPriorSuggestion?.probabilityDiscount)
    }
  };
}

function expectedRepairCountForRange(range) {
  if (!range || !/^\d+-\d+$/.test(range)) return null;
  const [start, end] = range.split("-").map((value) => Number(value));
  if (!Number.isFinite(start) || !Number.isFinite(end) || end < start) return null;
  return end - start + 1;
}

function applyGrantRepairsToPackages(packagesArtifact, repairs) {
  const packages = packagesArtifact.packages || [];
  const packageById = new Map(packages.map((pkg) => [pkg.opportunity_id, pkg]));
  const warnings = [];
  let appliedCount = 0;

  for (const repair of repairs) {
    const pkg = packageById.get(repair.opportunityId);
    if (!pkg) {
      warnings.push(`Missing package for repair ${repair.opportunityId}|${repair.effectId}`);
      continue;
    }
    const effect = (pkg.effects || []).find((item) => item.effect_id === repair.effectId);
    if (!effect) {
      warnings.push(`Missing effect for repair ${repair.opportunityId}|${repair.effectId}`);
      continue;
    }
    applyGrantRepairToEffect({ pkg, effect, repair });
    appliedCount += 1;
  }

  packagesArtifact.generatedAt = new Date().toISOString();
  packagesArtifact.grantProbabilityRepairAppliedAt = new Date().toISOString();
  packagesArtifact.grantProbabilityRepairArtifact = path.relative(repoRoot, grantArtifactPath);
  packagesArtifact.grantProbabilityRepairCount = appliedCount;
  packagesArtifact.statusCounts = countBy(packages, (pkg) => pkg.calculation_status || "unknown");
  packagesArtifact.confidenceCounts = countBy(packages, (pkg) => confidenceLabel(pkg.confidence?.overall));

  return {
    appliedCount,
    warningCount: warnings.length,
    warnings
  };
}

function applyGrantRepairToEffect({ pkg, effect, repair }) {
  const evidenceId = `grant_probability_repair_${shortHash(`${repair.opportunityId}|${repair.effectId}`)}`;
  const sourceUrls = normalizeUrls(repair.sourceUrlsChecked || []);
  const evidence = {
    evidence_id: evidenceId,
    source_type: "gpt_pro_grant_probability_repair",
    quote: repair.evidenceText || repair.conditionalAward?.formulaText || repair.reasoningNotes || "",
    source_urls: sourceUrls,
    evidence_confidence: confidenceNumber(repair.sourceConfidence)
  };

  pkg.source_evidence = [
    ...(pkg.source_evidence || []).filter((item) => item.evidence_id !== evidenceId),
    evidence
  ];
  effect.evidence_refs = uniqueStrings([...(effect.evidence_refs || []), evidenceId]);
  effect.calculation = buildUpdatedCalculation(effect.calculation || {}, repair);
  effect.required_inputs = mergeInputRequirements(
    effect.required_inputs || [],
    repair.conditionalAward?.requiredProjectInputs || [],
    effect.effect_id
  );
  pkg.input_requirements = dedupeInputRequirements([
    ...(pkg.input_requirements || []),
    ...(effect.required_inputs || [])
  ]);

  const estimateConfidence = repair.expectedValueRecommendation?.estimateConfidence || "low";
  effect.confidence = {
    ...(effect.confidence || {}),
    calculation: confidenceNumber(estimateConfidence),
    extraction: confidenceNumber(repair.sourceConfidence),
    overall: Math.min(confidenceNumber(estimateConfidence), confidenceNumber(repair.sourceConfidence)),
    reason_codes: uniqueStrings([
      ...(effect.confidence?.reason_codes || []),
      "grant_probability_repair_applied",
      `source_confidence_${repair.sourceConfidence || "unknown"}`,
      `estimate_confidence_${estimateConfidence}`,
      `value_model_${repair.grantValueModelKind || "unknown"}`,
      `estimate_status_${repair.expectedValueRecommendation?.estimateStatus || "unknown"}`
    ])
  };

  effect.repair_metadata = {
    ...(effect.repair_metadata || {}),
    value_model_kind: repair.grantValueModelKind || effect.repair_metadata?.value_model_kind || null,
    cash_value_classification: repair.cashValueClassification || effect.repair_metadata?.cash_value_classification || null,
    included_in_user_facing_total_default:
      repair.expectedValueRecommendation?.includeInUserFacingTotalDefault === true,
    human_review_required:
      repair.expectedValueRecommendation?.estimateStatus === "human_review_required" ||
      repair.expectedValueRecommendation?.estimateStatus === "suppressed" ||
      repair.sourceConfidence === "low",
    human_review_reasons: uniqueStrings([
      ...(effect.repair_metadata?.human_review_reasons || []),
      ...(repair.expectedValueRecommendation?.reasonCodes || [])
    ]),
    grant_probability_repair: {
      source_file: repair.sourceFile,
      batch_range: repair.batchRange,
      availability_status: repair.availabilityStatus || null,
      source_confidence: repair.sourceConfidence || null,
      estimate_confidence: estimateConfidence,
      estimate_status: repair.expectedValueRecommendation?.estimateStatus || null,
      reason_codes: repair.expectedValueRecommendation?.reasonCodes || [],
      evidence_text: repair.evidenceText || "",
      reasoning_notes: repair.reasoningNotes || "",
      source_urls_checked: sourceUrls,
      fallback_prior_suggestion: toSnakeObject(repair.fallbackPriorSuggestion || {})
    }
  };

  pkg.migration_metadata = {
    ...(pkg.migration_metadata || {}),
    grant_probability_repair_applied_at: new Date().toISOString(),
    grant_probability_repair_artifact: path.relative(repoRoot, grantArtifactPath)
  };
}

function buildUpdatedCalculation(current, repair) {
  const conditionalAward = toSnakeObject(repair.conditionalAward || {});
  const probabilityModel = toSnakeObject(repair.probabilityEvidence || {});
  const recommendation = toSnakeObject(repair.expectedValueRecommendation || {});
  const fallbackPrior = toSnakeObject(repair.fallbackPriorSuggestion || {});
  const calculation = {
    ...current,
    grant_value_model_kind: repair.grantValueModelKind || null,
    cash_value_classification: repair.cashValueClassification || null,
    conditional_award: conditionalAward,
    probability_model: probabilityModel,
    expected_value_recommendation: recommendation,
    fallback_prior_suggestion: fallbackPrior
  };

  if (current.method === "expected_value") {
    calculation.probability_discount = repair.probabilityEvidence?.probabilityDiscount ?? current.probability_discount ?? null;
    calculation.conditional_award_cents =
      repair.conditionalAward?.conditionalAwardCents ?? current.conditional_award_cents ?? null;
    calculation.min_award_cents = repair.conditionalAward?.minAwardCents ?? current.min_award_cents ?? null;
    calculation.max_award_cents = repair.conditionalAward?.maxAwardCents ?? current.max_award_cents ?? null;
    if (repair.conditionalAward?.costSharePercent !== null && repair.conditionalAward?.costSharePercent !== undefined) {
      calculation.cost_share_percent = repair.conditionalAward.costSharePercent;
    }
  }

  if (
    repair.grantValueModelKind === "capped_percent_of_eligible_cost" &&
    Number.isFinite(repair.conditionalAward?.costSharePercent) &&
    (current.method === "percent_of_cost" || current.method === "zero_when_not_applicable")
  ) {
    calculation.method = "percent_of_cost";
    calculation.percent = repair.conditionalAward.costSharePercent;
    calculation.cost_input = findCostInput(repair.conditionalAward.requiredProjectInputs) || current.cost_input || "eligible_project_cost_cents";
  }

  if (
    repair.grantValueModelKind === "formula_grant" &&
    !Number.isFinite(repair.conditionalAward?.costSharePercent) &&
    current.method === "percent_of_cost"
  ) {
    calculation.method = "custom_quote";
    calculation.reason =
      "Formula grant requires custom source-backed logic and must not reuse the prior simple percent-of-cost shortcut.";
  }

  if (
    repair.expectedValueRecommendation?.estimateStatus === "zero_value" &&
    Number(repair.conditionalAward?.conditionalAwardCents) === 0
  ) {
    calculation.method = "zero_when_not_applicable";
    calculation.reason = repair.conditionalAward?.formulaText || "Grant probability repair classified this effect as zero cash value.";
  }

  return calculation;
}

function mergeInputRequirements(existingInputs, requiredKeys, effectId) {
  const generated = (requiredKeys || []).map((inputKey) => ({
    input_key: inputKey,
    label: labelFromInputKey(inputKey),
    value_type: valueTypeForInputKey(inputKey),
    required_for: [effectId],
    source_precedence: sourcePrecedenceForInputKey(inputKey),
    missing_severity: "blocks_calculation"
  }));
  return dedupeInputRequirements([...(existingInputs || []), ...generated]);
}

function dedupeInputRequirements(inputs = []) {
  const byKey = new Map();
  for (const input of inputs) {
    if (!input?.input_key) continue;
    if (!byKey.has(input.input_key)) {
      byKey.set(input.input_key, {
        ...input,
        required_for: uniqueStrings(input.required_for || [])
      });
      continue;
    }
    const existing = byKey.get(input.input_key);
    byKey.set(input.input_key, {
      ...existing,
      required_for: uniqueStrings([...(existing.required_for || []), ...(input.required_for || [])]),
      source_precedence: uniqueStrings([...(existing.source_precedence || []), ...(input.source_precedence || [])])
    });
  }
  return [...byKey.values()];
}

function validatePackages(packages) {
  const invalidSamples = [];
  let invalidCount = 0;
  for (const pkg of packages) {
    const validation = validateIncentiveCalculationPackageV2(pkg);
    if (!validation.valid) {
      invalidCount += 1;
      if (invalidSamples.length < 10) {
        invalidSamples.push({
          opportunityId: pkg.opportunity_id,
          errors: validation.errors
        });
      }
    }
  }
  return {
    packageCount: packages.length,
    invalidCount,
    invalidSamples
  };
}

function buildReport({ inputArtifact, grantArtifact, applyResult, validation, parsedOutputs }) {
  const lines = [];
  lines.push("# V2 Estimate GPT Pro Intake Report");
  lines.push("");
  lines.push(`Generated: ${new Date().toISOString()}`);
  lines.push("");
  lines.push("## Output Validation");
  lines.push("");
  lines.push(`- Output files parsed: ${parsedOutputs.length}`);
  lines.push(`- Input-resolution outputs: ${inputArtifact.sourceFiles.length}`);
  lines.push(`- Grant probability outputs: ${grantArtifact.sourceFiles.length}`);
  lines.push(`- Trailing text recoveries: ${parsedOutputs.filter((output) => output.trailingTextLength > 0).length}`);
  lines.push(`- Input warnings: ${inputArtifact.validationWarnings.length}`);
  lines.push(`- Grant warnings: ${grantArtifact.validationWarnings.length}`);
  lines.push("");

  if (inputArtifact.validationWarnings.length || grantArtifact.validationWarnings.length || applyResult.warnings.length) {
    lines.push("## Warnings");
    lines.push("");
    for (const warning of [...inputArtifact.validationWarnings, ...grantArtifact.validationWarnings, ...applyResult.warnings]) {
      lines.push(`- ${warning}`);
    }
    lines.push("");
  }

  lines.push("## Input Resolution");
  lines.push("");
  lines.push(`- Input mappings: ${inputArtifact.inputMappings.length}`);
  lines.push(`- Global rules: ${inputArtifact.globalRules.length}`);
  lines.push(`- Retrofit quantity override rows: ${inputArtifact.retrofitQuantityOverrides.length}`);
  lines.push(`- Missing UI TODOs: ${inputArtifact.missingUiTodos.length}`);
  lines.push("");
  lines.push("### Source Strategy Counts");
  lines.push("");
  appendCountTable(lines, inputArtifact.counts.sourceStrategyCounts);
  lines.push("");
  lines.push("### UI Placement Counts");
  lines.push("");
  appendCountTable(lines, inputArtifact.counts.uiPlacementCounts);
  lines.push("");

  lines.push("## Grant Probability Repairs");
  lines.push("");
  lines.push(`- Repairs imported: ${grantArtifact.repairs.length}`);
  lines.push(`- Repairs applied to v2 packages: ${applyResult.appliedCount}`);
  lines.push(`- Repairs with source-backed probability discount: ${grantArtifact.counts.repairsWithProbabilityDiscount}`);
  lines.push(`- Repairs included in user-facing totals by default: ${grantArtifact.counts.repairsIncludedInUserFacingTotalDefault}`);
  lines.push("");
  lines.push("### Estimate Status Counts");
  lines.push("");
  appendCountTable(lines, grantArtifact.counts.statusCounts);
  lines.push("");
  lines.push("### Value Model Counts");
  lines.push("");
  appendCountTable(lines, grantArtifact.counts.valueModelCounts);
  lines.push("");
  lines.push("### Probability Evidence Counts");
  lines.push("");
  appendCountTable(lines, grantArtifact.counts.probabilityEvidenceCounts);
  lines.push("");

  lines.push("## Package Validation");
  lines.push("");
  lines.push(`- Packages validated: ${validation.packageCount}`);
  lines.push(`- Invalid packages: ${validation.invalidCount}`);
  lines.push("");

  lines.push("## Artifacts");
  lines.push("");
  lines.push(`- Input artifact: \`${path.relative(repoRoot, inputArtifactPath)}\``);
  lines.push(`- Grant artifact: \`${path.relative(repoRoot, grantArtifactPath)}\``);
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

function annotateRows(rows, sourceFile) {
  return rows.map((row) => ({ ...row, sourceFile }));
}

function normalizeUrls(values) {
  const urls = [];
  for (const value of values || []) {
    const text = String(value || "");
    const matches = text.match(/https?:\/\/[^\s\]\)"'<>]+/g) || [];
    urls.push(...matches.map((url) => url.replace(/[.,;]+$/g, "")));
  }
  return uniqueStrings(urls);
}

function cleanEvidenceText(value) {
  const original = String(value || "").trim();
  if (!original) return "";

  let text = original;
  try {
    const decoded = decodeURIComponent(original);
    const marker = '"evidenceText":"';
    if (decoded.includes(marker)) {
      text = decoded.slice(decoded.lastIndexOf(marker) + marker.length);
    } else {
      text = decoded;
    }
  } catch {
    const partiallyDecoded = original.replace(/%22/g, "\"").replace(/%20/g, " ");
    const marker = '"evidenceText":"';
    if (partiallyDecoded.includes(marker)) {
      text = partiallyDecoded.slice(partiallyDecoded.lastIndexOf(marker) + marker.length);
    } else {
      text = original;
    }
  }

  text = text
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
    .replace(/^([A-Za-z&' ]+)\)\s+/, "$1 ")
    .replace(/\s+/g, " ")
    .trim();

  return text || original;
}

function normalizePercent(value) {
  if (value === null || value === undefined || value === "") return null;
  const number = Number(value);
  if (!Number.isFinite(number)) return null;
  if (number > 1 && number <= 100) return number / 100;
  return number;
}

function findCostInput(inputs = []) {
  return (inputs || []).find((input) => /cost|budget|expense|price|invoice/i.test(input));
}

function valueTypeForInputKey(inputKey) {
  if (/cost|amount|budget|price|invoice|funding|award|match/i.test(inputKey)) return "number";
  if (/count|quantity|number|units|ports|chargers/i.test(inputKey)) return "number";
  if (/date|deadline/i.test(inputKey)) return "text";
  if (/status|eligibility|qualification|decision|approval|scope|type|territory/i.test(inputKey)) return "text";
  return "text";
}

function sourcePrecedenceForInputKey(inputKey) {
  if (/cost|amount|budget|price|invoice|quote|award|match/i.test(inputKey)) return ["quote", "user_profile", "retrofit_assumptions"];
  if (/kwh|kw|savings|usage|bill|rate|tariff/i.test(inputKey)) return ["utility_data", "quote", "retrofit_assumptions"];
  if (/status|eligibility|qualification|approval|decision/i.test(inputKey)) return ["user_profile", "program_application", "admin_review"];
  return ["user_profile", "retrofit_assumptions", "quote", "utility_data"];
}

function labelFromInputKey(inputKey) {
  return String(inputKey || "")
    .replace(/_cents$/i, "")
    .replace(/_/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());
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

function shortHash(value) {
  return crypto.createHash("sha256").update(String(value)).digest("hex").slice(0, 16);
}
