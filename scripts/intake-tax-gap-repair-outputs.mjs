import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import crypto from "node:crypto";

const scriptPath = fileURLToPath(import.meta.url);
const repoRoot = path.resolve(path.dirname(scriptPath), "..");
const defaultDate = "2026-07-05";

const options = parseArgs(process.argv.slice(2));
const date = options.date || defaultDate;
const workDir = path.resolve(options.workDir || path.join(repoRoot, "GPT Pro Work", `tax-skipped-gap-repair-${date}`));
const manifestPath = path.resolve(options.manifestPath || path.join(workDir, "manifest.json"));
const dispositionPath = path.resolve(options.dispositionPath || path.join(repoRoot, "data", `tax_gap_disposition_${date}.json`));
const frameworkPath = path.resolve(options.frameworkPath || path.join(repoRoot, "data", "tax_model_framework.json"));
const artifactPath = path.resolve(options.artifactPath || path.join(repoRoot, "data", `tax_gap_repairs_gpt_pro_${date}.json`));
const reportPath = path.resolve(options.reportPath || path.join(repoRoot, "data", `tax_gap_repair_intake_report_${date}.md`));

if (options.help) {
  printHelp();
  process.exit(0);
}

const manifest = readJson(manifestPath);
const disposition = readJson(dispositionPath);
const framework = readJson(frameworkPath);
const allowedModelKinds = new Set((framework.modelKinds || []).map((model) => model.kind));
const allowedRuntimeStatuses = new Set((framework.runtimeStatuses || []).map((status) => status.status));
const dispositionTargetsById = new Map((disposition.repairTargets || []).map((target) => [target.skippedRecordId, target]));
const sourceDocumentsByUrl = new Map();
const errors = [];
const warnings = [];

const parsedOutputs = readOutputs();
const repairs = normalizeRepairs(parsedOutputs);
validateRepairs(repairs);

const promotedTaxRuleRecords = repairs
  .filter((repair) => repair.disposition === "promote_to_tax_rule")
  .map(buildPromotedTaxRuleRecord);
const suppressionRecords = repairs
  .filter((repair) => repair.disposition === "suppress_archive")
  .map(buildSuppressionRecord);
const inputGatedRecords = repairs
  .filter((repair) => repair.disposition === "keep_input_gate")
  .map(buildInputGatedRecord);
const routedRecords = repairs
  .filter((repair) => repair.disposition === "route_to_existing_non_tax_or_tax_model")
  .map(buildRoutedRecord);

const artifact = buildArtifact();

if (errors.length) {
  console.error(`Tax gap repair intake failed with ${errors.length} error(s):`);
  for (const error of errors) console.error(`- ${error}`);
  if (warnings.length) {
    console.error("Warnings:");
    for (const warning of warnings) console.error(`- ${warning}`);
  }
  process.exit(1);
}

if (!options.dryRun) {
  writeJson(artifactPath, artifact);
  fs.writeFileSync(reportPath, buildReport(artifact), "utf8");
}

console.log("Tax gap repair intake complete.");
console.log(`Outputs parsed: ${artifact.counts.outputCount}`);
console.log(`Repairs imported: ${artifact.counts.repairCount}`);
console.log(`Promoted tax rule candidates: ${artifact.counts.promotedTaxRuleRecordCount}`);
console.log(`Suppressed/archive decisions: ${artifact.counts.suppressionRecordCount}`);
console.log(`Input-gated decisions: ${artifact.counts.inputGatedRecordCount}`);
console.log(`Routed decisions: ${artifact.counts.routedRecordCount}`);
console.log(`Warnings: ${artifact.validation.warnings.length}`);
console.log(`Artifact: ${path.relative(repoRoot, artifactPath)}`);
console.log(`Report: ${path.relative(repoRoot, reportPath)}`);

function readOutputs() {
  if (manifest.schemaVersion !== "retrofi_tax_gap_repair_work_packet_manifest.v1") {
    errors.push(`Unexpected manifest schemaVersion: ${manifest.schemaVersion}`);
  }
  const outputs = [];
  for (const prompt of manifest.prompts || []) {
    const outputPath = path.join(workDir, prompt.outputFile);
    if (!fs.existsSync(outputPath)) {
      errors.push(`${prompt.outputFile}: output file is missing.`);
      continue;
    }
    const text = fs.readFileSync(outputPath, "utf8");
    if (!text.trim()) {
      errors.push(`${prompt.outputFile}: output file is empty.`);
      continue;
    }
    try {
      const object = extractFirstJsonObject(text);
      outputs.push({
        prompt,
        outputFile: prompt.outputFile,
        object
      });
    } catch (error) {
      errors.push(`${prompt.outputFile}: ${error.message}`);
    }
  }
  return outputs;
}

function normalizeRepairs(outputs) {
  const rows = [];
  for (const output of outputs) {
    const object = output.object;
    if (object.schemaVersion !== "retrofi_tax_gap_repair_batch.v1") {
      errors.push(`${output.outputFile}: unexpected schemaVersion ${object.schemaVersion}`);
    }
    if (object.promptId !== output.prompt.promptId) {
      errors.push(`${output.outputFile}: promptId ${object.promptId} does not match manifest ${output.prompt.promptId}`);
    }
    if (!Array.isArray(object.repairs) || object.repairs.length === 0) {
      errors.push(`${output.outputFile}: repairs must be a non-empty array.`);
      continue;
    }
    const outputIds = object.repairs.map((repair) => repair.skippedRecordId);
    for (const expectedId of output.prompt.targetIds || []) {
      if (!outputIds.includes(expectedId)) errors.push(`${output.outputFile}: missing expected target ${expectedId}`);
    }
    for (const repair of object.repairs) {
      if (!(output.prompt.targetIds || []).includes(repair.skippedRecordId)) {
        errors.push(`${output.outputFile}: unexpected skippedRecordId ${repair.skippedRecordId}`);
      }
      const target = dispositionTargetsById.get(repair.skippedRecordId);
      if (!target) errors.push(`${output.outputFile}: ${repair.skippedRecordId} is not a disposition repair target.`);
      const taxRule = repair.taxRule || {};
      const sourceUrlsChecked = normalizeUrlList(repair.sourceUrlsChecked || []);
      const officialSourceUrls = normalizeUrlList(repair.officialSourceUrls || []);
      const sourceDocumentIds = addSourceDocuments([...officialSourceUrls, ...sourceUrlsChecked], {
        sourceFile: output.outputFile,
        sourceFamily: "tax_gap_gpt_pro_repair",
        evidenceText: repair.evidenceText || repair.reasoningNotes || ""
      });
      rows.push({
        sourceFile: output.outputFile,
        promptId: object.promptId || output.prompt.promptId,
        researchedAt: object.researchedAt || null,
        skippedRecordId: repair.skippedRecordId,
        disposition: repair.disposition || "unknown",
        sourceConfidence: normalizeConfidence(repair.sourceConfidence),
        recommendedRuntimeStatus: normalizeRuntimeStatus(repair.recommendedRuntimeStatus),
        taxRule: {
          modelKind: normalizeModelKind(taxRule.modelKind || target?.modelFamily),
          taxTypes: normalizeStringList(taxRule.taxTypes),
          jurisdiction: taxRule.jurisdiction || target?.jurisdiction || "",
          eligibleTaxpayerTypes: normalizeStringList(taxRule.eligibleTaxpayerTypes),
          eligibleItemsOrActivities: normalizeStringList(taxRule.eligibleItemsOrActivities),
          formulaText: taxRule.formulaText || "",
          formulaExpression: taxRule.formulaExpression || "",
          caps: Array.isArray(taxRule.caps) ? taxRule.caps : [],
          effectiveDates: taxRule.effectiveDates || {},
          requiredRuntimeInputs: normalizeStringList(taxRule.requiredRuntimeInputs),
          filingOrCertificateRequirements: normalizeStringList(taxRule.filingOrCertificateRequirements),
          localAdoptionOrApprovalRules: normalizeStringList(taxRule.localAdoptionOrApprovalRules),
          userFacingCalculationAllowedWhen: normalizeStringList(taxRule.userFacingCalculationAllowedWhen)
        },
        suppression: repair.suppression || {},
        sourceUrlsChecked,
        officialSourceUrls,
        sourceDocumentIds,
        evidenceText: repair.evidenceText || "",
        reasoningNotes: repair.reasoningNotes || "",
        originalTarget: target || null
      });
    }
  }
  return rows;
}

function validateRepairs(rows) {
  const expectedIds = new Set((manifest.prompts || []).flatMap((prompt) => prompt.targetIds || []));
  const seenIds = new Set();
  const allowedDispositions = new Set([
    "promote_to_tax_rule",
    "suppress_archive",
    "keep_input_gate",
    "route_to_existing_non_tax_or_tax_model"
  ]);

  for (const repair of rows) {
    if (!repair.skippedRecordId) errors.push(`${repair.sourceFile}: repair is missing skippedRecordId.`);
    if (seenIds.has(repair.skippedRecordId)) errors.push(`${repair.skippedRecordId}: duplicate repair target.`);
    seenIds.add(repair.skippedRecordId);

    if (!allowedDispositions.has(repair.disposition)) errors.push(`${repair.skippedRecordId}: unsupported disposition ${repair.disposition}`);
    if (!allowedModelKinds.has(repair.taxRule.modelKind)) errors.push(`${repair.skippedRecordId}: unsupported modelKind ${repair.taxRule.modelKind}`);
    if (!allowedRuntimeStatuses.has(repair.recommendedRuntimeStatus)) errors.push(`${repair.skippedRecordId}: unsupported runtime status ${repair.recommendedRuntimeStatus}`);

    if (repair.disposition === "promote_to_tax_rule") {
      if (!repair.taxRule.taxTypes.length) warnings.push(`${repair.skippedRecordId}: promoted record has no taxTypes.`);
      if (!repair.taxRule.formulaText.trim()) errors.push(`${repair.skippedRecordId}: promoted record is missing formulaText.`);
      if (!repair.taxRule.requiredRuntimeInputs.length) warnings.push(`${repair.skippedRecordId}: promoted record has no requiredRuntimeInputs.`);
      if (!repair.officialSourceUrls.length) warnings.push(`${repair.skippedRecordId}: promoted record has no officialSourceUrls.`);
      if (repair.recommendedRuntimeStatus === "calculated") {
        warnings.push(`${repair.skippedRecordId}: GPT Pro says calculated; customer-facing default is still forced off until runtime importer validates inputs.`);
      }
    }
    if (repair.disposition === "suppress_archive" && !repair.suppression?.archiveReason) {
      warnings.push(`${repair.skippedRecordId}: suppress_archive repair has no archiveReason.`);
    }
  }

  for (const expectedId of expectedIds) {
    if (!seenIds.has(expectedId)) errors.push(`Missing expected repair target ${expectedId}`);
  }
}

function buildPromotedTaxRuleRecord(repair) {
  return {
    taxRuleId: `tax_gap_rule_${shortHash(repair.skippedRecordId)}`,
    recordType: recordTypeForModelKind(repair.taxRule.modelKind),
    sourceSkippedRecordId: repair.skippedRecordId,
    sourcePromptId: repair.promptId,
    sourceFile: repair.sourceFile,
    sourceType: "gpt_pro_tax_gap_repair",
    disposition: repair.disposition,
    modelKind: repair.taxRule.modelKind,
    taxTypes: repair.taxRule.taxTypes,
    jurisdictionText: repair.taxRule.jurisdiction,
    eligibleTaxpayerTypes: repair.taxRule.eligibleTaxpayerTypes,
    eligibleItemsOrActivities: repair.taxRule.eligibleItemsOrActivities,
    formulaText: repair.taxRule.formulaText,
    formulaExpression: repair.taxRule.formulaExpression,
    caps: repair.taxRule.caps,
    effectiveDates: repair.taxRule.effectiveDates,
    requiredRuntimeInputs: repair.taxRule.requiredRuntimeInputs,
    filingOrCertificateRequirements: repair.taxRule.filingOrCertificateRequirements,
    localAdoptionOrApprovalRules: repair.taxRule.localAdoptionOrApprovalRules,
    userFacingCalculationAllowedWhen: repair.taxRule.userFacingCalculationAllowedWhen,
    runtimeStatusWhenInputsMissing: repair.recommendedRuntimeStatus,
    includeInUserFacingTotalDefault: false,
    customerFacingSavingsCentsDefault: 0,
    sourceConfidence: repair.sourceConfidence,
    sourceDocumentIds: repair.sourceDocumentIds,
    officialSourceUrls: repair.officialSourceUrls,
    sourceUrlsChecked: repair.sourceUrlsChecked,
    evidenceText: repair.evidenceText,
    reasoningNotes: repair.reasoningNotes,
    originalTarget: {
      skipType: repair.originalTarget?.skipType || null,
      currentRuntimeStatus: repair.originalTarget?.currentRuntimeStatus || null,
      promptFocus: repair.originalTarget?.promptFocus || null,
      requiredOutcome: repair.originalTarget?.requiredOutcome || null
    }
  };
}

function buildSuppressionRecord(repair) {
  return {
    suppressionId: `tax_gap_suppression_${shortHash(repair.skippedRecordId)}`,
    skippedRecordId: repair.skippedRecordId,
    sourcePromptId: repair.promptId,
    sourceFile: repair.sourceFile,
    recommendedRuntimeStatus: repair.recommendedRuntimeStatus,
    sourceConfidence: repair.sourceConfidence,
    customerFacingSavingsCentsDefault: 0,
    sourceDocumentIds: repair.sourceDocumentIds,
    officialSourceUrls: repair.officialSourceUrls,
    reasonCodes: normalizeStringList(repair.suppression?.reasonCodes),
    archiveReason: repair.suppression?.archiveReason || "",
    effectiveEndDate: repair.suppression?.effectiveEndDate || null,
    routeToModule: repair.suppression?.routeToModule || null,
    evidenceText: repair.evidenceText,
    reasoningNotes: repair.reasoningNotes
  };
}

function buildInputGatedRecord(repair) {
  return {
    inputGateId: `tax_gap_input_gate_${shortHash(repair.skippedRecordId)}`,
    skippedRecordId: repair.skippedRecordId,
    sourcePromptId: repair.promptId,
    sourceFile: repair.sourceFile,
    modelKind: repair.taxRule.modelKind,
    recommendedRuntimeStatus: repair.recommendedRuntimeStatus,
    sourceConfidence: repair.sourceConfidence,
    customerFacingSavingsCentsDefault: 0,
    requiredRuntimeInputs: repair.taxRule.requiredRuntimeInputs,
    filingOrCertificateRequirements: repair.taxRule.filingOrCertificateRequirements,
    localAdoptionOrApprovalRules: repair.taxRule.localAdoptionOrApprovalRules,
    sourceDocumentIds: repair.sourceDocumentIds,
    officialSourceUrls: repair.officialSourceUrls,
    evidenceText: repair.evidenceText,
    reasoningNotes: repair.reasoningNotes
  };
}

function buildRoutedRecord(repair) {
  return {
    routedRecordId: `tax_gap_routed_${shortHash(repair.skippedRecordId)}`,
    skippedRecordId: repair.skippedRecordId,
    sourcePromptId: repair.promptId,
    sourceFile: repair.sourceFile,
    recommendedRuntimeStatus: repair.recommendedRuntimeStatus,
    sourceConfidence: repair.sourceConfidence,
    routeToModule: repair.suppression?.routeToModule || null,
    customerFacingSavingsCentsDefault: 0,
    sourceDocumentIds: repair.sourceDocumentIds,
    officialSourceUrls: repair.officialSourceUrls,
    evidenceText: repair.evidenceText,
    reasoningNotes: repair.reasoningNotes,
    notes: "GPT Pro determined this target should not become a new tax runtime rule in this pass."
  };
}

function buildArtifact() {
  const sourceDocuments = [...sourceDocumentsByUrl.values()].sort((a, b) => a.sourceDocumentId.localeCompare(b.sourceDocumentId));
  const counts = {
    outputCount: parsedOutputs.length,
    repairCount: repairs.length,
    promotedTaxRuleRecordCount: promotedTaxRuleRecords.length,
    suppressionRecordCount: suppressionRecords.length,
    inputGatedRecordCount: inputGatedRecords.length,
    routedRecordCount: routedRecords.length,
    sourceDocumentCount: sourceDocuments.length,
    repairCountByDisposition: countBy(repairs, (repair) => repair.disposition),
    promotedRuleCountByModelKind: countBy(promotedTaxRuleRecords, (record) => record.modelKind),
    promotedRuleCountByRuntimeStatus: countBy(promotedTaxRuleRecords, (record) => record.runtimeStatusWhenInputsMissing)
  };
  return {
    schemaVersion: "retrofi_tax_gap_repairs_gpt_pro.v1",
    generatedAt: new Date().toISOString(),
    workDir: path.relative(repoRoot, workDir),
    manifestPath: path.relative(repoRoot, manifestPath),
    dispositionArtifact: path.relative(repoRoot, dispositionPath),
    frameworkArtifact: path.relative(repoRoot, frameworkPath),
    safetyPolicy: {
      includeInUserFacingTotalDefault: false,
      customerFacingSavingsCentsDefault: 0,
      notes: [
        "Promoted records are source-backed tax rule candidates, not enabled customer-facing runtime calculations.",
        "Runtime inclusion remains blocked until the importer verifies model support, jurisdiction match, source confidence, and all taxpayer-specific inputs.",
        "Suppressed, routed, and input-gated records remain $0 in customer-facing tax totals."
      ]
    },
    counts,
    validation: {
      ok: errors.length === 0,
      errors,
      warnings
    },
    sourceDocuments,
    repairs,
    promotedTaxRuleRecords,
    suppressionRecords,
    inputGatedRecords,
    routedRecords
  };
}

function buildReport(artifact) {
  const lines = [
    "# Tax Gap Repair Intake Report",
    "",
    `Generated at: ${artifact.generatedAt}`,
    `Work dir: \`${artifact.workDir}\``,
    `Disposition artifact: \`${artifact.dispositionArtifact}\``,
    "",
    "## Counts",
    "",
    `- Outputs parsed: ${artifact.counts.outputCount}`,
    `- Repairs imported: ${artifact.counts.repairCount}`,
    `- Promoted tax rule candidates: ${artifact.counts.promotedTaxRuleRecordCount}`,
    `- Suppressed/archive decisions: ${artifact.counts.suppressionRecordCount}`,
    `- Input-gated decisions: ${artifact.counts.inputGatedRecordCount}`,
    `- Routed decisions: ${artifact.counts.routedRecordCount}`,
    `- Source documents: ${artifact.counts.sourceDocumentCount}`,
    "",
    "## Dispositions",
    "",
    ...Object.entries(artifact.counts.repairCountByDisposition).map(([key, value]) => `- ${key}: ${value}`),
    "",
    "## Promoted Rule Candidates By Model",
    "",
    ...Object.entries(artifact.counts.promotedRuleCountByModelKind).map(([key, value]) => `- ${key}: ${value}`),
    "",
    "## Promoted Rule Candidates By Runtime Gate",
    "",
    ...Object.entries(artifact.counts.promotedRuleCountByRuntimeStatus).map(([key, value]) => `- ${key}: ${value}`),
    "",
    "## Promoted Tax Rule Candidates",
    "",
    ...artifact.promotedTaxRuleRecords.map((record) => `- ${record.sourceSkippedRecordId}: ${record.modelKind}, ${record.runtimeStatusWhenInputsMissing}, ${record.sourceConfidence}`),
    "",
    "## Non-Promoted Decisions",
    "",
    ...artifact.suppressionRecords.map((record) => `- suppress ${record.skippedRecordId}: ${record.recommendedRuntimeStatus}`),
    ...artifact.inputGatedRecords.map((record) => `- input gate ${record.skippedRecordId}: ${record.recommendedRuntimeStatus}`),
    ...artifact.routedRecords.map((record) => `- routed ${record.skippedRecordId}: ${record.recommendedRuntimeStatus}`),
    "",
    "## Validation",
    "",
    `- Errors: ${artifact.validation.errors.length}`,
    `- Warnings: ${artifact.validation.warnings.length}`,
    ...(artifact.validation.warnings.length ? artifact.validation.warnings.map((warning) => `- ${warning}`) : ["- None"])
  ];
  return `${lines.join("\n")}\n`;
}

function extractFirstJsonObject(text) {
  const trimmed = text.trim().replace(/^```(?:json)?\s*/i, "").replace(/```\s*$/i, "").trim();
  const start = trimmed.indexOf("{");
  if (start < 0) throw new Error("No JSON object found.");
  let depth = 0;
  let inString = false;
  let escaped = false;
  for (let index = start; index < trimmed.length; index += 1) {
    const char = trimmed[index];
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
      if (depth === 0) return JSON.parse(trimmed.slice(start, index + 1));
    }
  }
  throw new Error("Unterminated JSON object.");
}

function addSourceDocuments(urls = [], context = {}) {
  const ids = [];
  for (const url of normalizeUrlList(urls)) {
    const sourceDocumentId = `tax_gap_source_doc_${shortHash(url)}`;
    const existing = sourceDocumentsByUrl.get(url);
    const next = existing || {
      sourceDocumentId,
      canonicalUrl: url,
      sourceFiles: [],
      sourceFamilies: [],
      evidenceSnippets: []
    };
    pushUnique(next.sourceFiles, context.sourceFile);
    pushUnique(next.sourceFamilies, context.sourceFamily);
    pushUnique(next.evidenceSnippets, context.evidenceText);
    sourceDocumentsByUrl.set(url, next);
    ids.push(sourceDocumentId);
  }
  return uniqueStrings(ids);
}

function recordTypeForModelKind(modelKind) {
  if (modelKind === "sales_use_tax_exemption" || modelKind === "sales_use_tax_rate") return "tax_gap_sales_use_tax_rule";
  if (modelKind === "state_income_or_franchise_tax_credit") return "tax_gap_state_credit_rule";
  if (modelKind === "property_tax_credit" || modelKind === "property_tax_exemption" || modelKind === "property_tax_special_valuation") return "tax_gap_property_tax_rule";
  if (modelKind === "tax_abatement_or_pilot") return "tax_gap_abatement_or_pilot_rule";
  if (modelKind === "gross_receipts_or_bo_rate_preference" || modelKind === "local_business_license_or_receipts_tax") return "tax_gap_business_tax_rule";
  return "tax_gap_rule";
}

function normalizeRuntimeStatus(value) {
  const normalized = String(value || "").trim();
  if (allowedRuntimeStatuses.has(normalized)) return normalized;
  if (normalized === "deterministic_estimate" || normalized === "calculated_estimate") return "calculated";
  return normalized || "unsupported_tax_model";
}

function normalizeModelKind(value) {
  return String(value || "unsupported_tax_model").trim() || "unsupported_tax_model";
}

function normalizeConfidence(value) {
  return ["high", "medium", "low"].includes(value) ? value : "low";
}

function normalizeStringList(values) {
  if (!Array.isArray(values)) return [];
  return uniqueStrings(values.map((value) => String(value || "").trim()).filter(Boolean));
}

function normalizeUrlList(values) {
  if (!Array.isArray(values)) return [];
  return uniqueStrings(values.map(normalizeMarkdownUrl).map(stripTrackingParams).filter((value) => value.startsWith("http")));
}

function normalizeMarkdownUrl(value) {
  const text = String(value || "").trim();
  const markdownMatch = text.match(/^\[[^\]]+\]\((https?:\/\/[^)]+)\)$/i);
  return markdownMatch ? markdownMatch[1].trim() : text;
}

function stripTrackingParams(url) {
  try {
    const parsed = new URL(url);
    for (const key of [...parsed.searchParams.keys()]) {
      if (key.startsWith("utm_") || key === "fbclid" || key === "gclid") parsed.searchParams.delete(key);
    }
    parsed.hash = "";
    return parsed.toString();
  } catch {
    return url;
  }
}

function countBy(values, keyFn) {
  const counts = {};
  for (const value of values || []) {
    const key = keyFn(value) || "unknown";
    counts[key] = (counts[key] || 0) + 1;
  }
  return Object.fromEntries(Object.entries(counts).sort(([a], [b]) => a.localeCompare(b)));
}

function pushUnique(values, value) {
  if (value && !values.includes(value)) values.push(value);
}

function uniqueStrings(values) {
  return [...new Set((values || []).map((value) => String(value || "").trim()).filter(Boolean))];
}

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

function printHelp() {
  console.log(`Usage: node scripts/intake-tax-gap-repair-outputs.mjs [--date ${defaultDate}] [--dryRun]`);
}

function shortHash(value) {
  return crypto.createHash("sha256").update(String(value)).digest("hex").slice(0, 10);
}

function readJson(filePath) {
  return JSON.parse(fs.readFileSync(filePath, "utf8"));
}

function writeJson(filePath, value) {
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  fs.writeFileSync(filePath, `${JSON.stringify(value, null, 2)}\n`, "utf8");
}
