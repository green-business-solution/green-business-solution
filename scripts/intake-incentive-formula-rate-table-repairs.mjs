import fs from "node:fs";
import path from "node:path";

const repoRoot = path.resolve(import.meta.dirname, "..");
const defaultWorkDir = path.join(repoRoot, "GPT Pro Work", "incentive-formula-rate-table-repair-batches-1-50");
const expectedSchemaVersion = "incentive_formula_rate_table_research_repairs.v1";
const urlArrayKeys = new Set(["sourceUrls", "sourceUrlsChecked"]);
const allowedRepairStatuses = new Set([
  "calculation_package_found",
  "custom_quote_required",
  "non_monetary_workflow",
  "no_monetary_effect",
  "source_inaccessible",
  "unavailable_archive",
  "bad_edge_delete_only",
  "needs_human_review"
]);
const allowedCalculationStatuses = new Set([
  "calculable",
  "calculable_with_missing_inputs",
  "estimate_from_range",
  "custom_quote_estimate",
  "source_inaccessible_repair_failure",
  "unavailable_archived",
  "non_monetary_workflow",
  "no_calculable_value",
  "needs_repair_review"
]);
const allowedConfidences = new Set(["high", "medium", "low"]);
const allowedEdgeActions = new Set(["keep", "delete_bad_edge", "move_to_special_workflow", "needs_review"]);

const options = parseArgs(process.argv.slice(2));
const targetBatchPath = options.targetBatchPath || path.join(options.workDir, "target_batches_1_50.json");
const targetArtifact = readJson(targetBatchPath);
const targetBatchesByNumber = new Map((targetArtifact.batches || []).map((batch) => [batch.batchNumber, batch]));
const artifact = buildArtifact();

writeJson(options.outputPath, artifact);
writeText(options.reportPath, buildReport(artifact));

console.log("Intook incentive formula/rate-table repair outputs.");
console.log(`Batches: ${artifact.batchStart}-${artifact.batchEnd}`);
console.log(`Repairs: ${artifact.repairCount}`);
console.log(`Validation warnings: ${artifact.validation.warningCount}`);
console.log(`Normalized markdown/url fragments: ${artifact.normalization.markdownLinkFragmentsRemoved}`);
console.log(`Wrote: ${path.relative(repoRoot, options.outputPath)}`);
console.log(`Report: ${path.relative(repoRoot, options.reportPath)}`);

function buildArtifact() {
  const repairs = [];
  const batches = [];
  const validationWarnings = [];
  const normalization = {
    markdownLinkFragmentsRemoved: 0,
    urlValuesNormalized: 0,
    objectKeysNormalized: 0,
    urlArraysNormalized: 0
  };

  for (let batchNumber = options.startBatch; batchNumber <= options.endBatch; batchNumber += 1) {
    const expectedBatch = targetBatchesByNumber.get(batchNumber);
    if (!expectedBatch) throw new Error(`No target metadata for batch ${batchNumber}`);

    const outputPath = path.join(options.workDir, `output_batch${pad(batchNumber)}.md`);
    if (!fs.existsSync(outputPath)) throw new Error(`Missing output file: ${path.relative(repoRoot, outputPath)}`);

    const rawText = fs.readFileSync(outputPath, "utf8").trim();
    if (!rawText) throw new Error(`Output file is blank: ${path.relative(repoRoot, outputPath)}`);

    let parsed;
    try {
      parsed = JSON.parse(rawText);
    } catch (error) {
      throw new Error(`JSON.parse failed for ${path.relative(repoRoot, outputPath)}: ${error.message}`);
    }

    if (parsed.schemaVersion !== expectedSchemaVersion) {
      throw new Error(`Unexpected schemaVersion in batch ${batchNumber}: ${parsed.schemaVersion}`);
    }
    if (Number(parsed.batchNumber) !== batchNumber) {
      throw new Error(`Batch number mismatch for batch ${batchNumber}: got ${parsed.batchNumber}`);
    }
    if (!Array.isArray(parsed.repairs)) throw new Error(`repairs must be an array for batch ${batchNumber}`);
    if (parsed.repairs.length !== expectedBatch.targetCount) {
      throw new Error(`Batch ${batchNumber} repair count mismatch: got ${parsed.repairs.length}, expected ${expectedBatch.targetCount}`);
    }

    const seenIds = new Set();
    const normalizedRepairs = parsed.repairs.map((repair, index) => {
      const expectedId = expectedBatch.opportunityIds[index];
      if (repair?.opportunityId !== expectedId) {
        throw new Error(`Batch ${batchNumber} order mismatch at repair ${index + 1}: got ${repair?.opportunityId}, expected ${expectedId}`);
      }
      if (seenIds.has(repair.opportunityId)) throw new Error(`Duplicate opportunityId in batch ${batchNumber}: ${repair.opportunityId}`);
      seenIds.add(repair.opportunityId);

      const context = {
        stats: normalization,
        warnings: validationWarnings,
        path: `batch${batchNumber}.repairs[${index}]`
      };
      const normalized = normalizeNode(repair, context);
      validateRepair(normalized, {
        batchNumber,
        repairIndex: index,
        warnings: validationWarnings
      });
      return {
        ...normalized,
        researchBatchNumber: batchNumber,
        workPacketOutputPath: path.relative(repoRoot, outputPath)
      };
    });

    repairs.push(...normalizedRepairs);
    batches.push({
      batchNumber,
      outputPath: path.relative(repoRoot, outputPath),
      targetStart: expectedBatch.targetStart,
      targetEnd: expectedBatch.targetEnd,
      targetCount: expectedBatch.targetCount,
      repairCount: normalizedRepairs.length,
      continueFromOpportunityId: parsed.continueFromOpportunityId ?? null
    });
  }

  const compact = JSON.stringify(repairs);
  const residualMarkdownLinks = (compact.match(/\]\(https?:\/\//g) || []).length;
  const residualEncodedQuotes = (compact.match(/%22/g) || []).length;
  const residualMarkdownUrlLabels = (compact.match(/"\[https?:\/\//g) || []).length;
  if (residualMarkdownLinks || residualEncodedQuotes || residualMarkdownUrlLabels) {
    validationWarnings.push({
      code: "RESIDUAL_MARKDOWN_CONTAMINATION",
      message: "Some normalized repair strings still contain markdown-link or encoded-quote markers.",
      residualMarkdownLinks,
      residualEncodedQuotes,
      residualMarkdownUrlLabels
    });
  }

  return {
    schemaVersion: "incentive_formula_rate_table_research_repairs_intake.v1",
    generatedAt: new Date().toISOString(),
    sourceSchemaVersion: expectedSchemaVersion,
    source: "gpt_pro",
    researchedAt: firstNonEmpty(repairs.map((repair) => repair.researchedAt)) || null,
    workPacketDir: path.relative(repoRoot, options.workDir),
    targetBatchPath: path.relative(repoRoot, targetBatchPath),
    batchStart: options.startBatch,
    batchEnd: options.endBatch,
    batchCount: batches.length,
    repairCount: repairs.length,
    normalization,
    validation: {
      warningCount: validationWarnings.length,
      warnings: validationWarnings
    },
    statusCounts: {
      repairStatus: countBy(repairs, (repair) => repair.repairStatus || "unknown"),
      calculationStatus: countBy(repairs, (repair) => repair.calculationStatus || "unknown"),
      sourceConfidence: countBy(repairs, (repair) => repair.sourceConfidence || "unknown"),
      estimateConfidence: countBy(repairs, (repair) => repair.estimateConfidence || "unknown")
    },
    edgeActionCounts: countEdgeActions(repairs),
    batches,
    repairs
  };
}

function validateRepair(repair, { batchNumber, repairIndex, warnings }) {
  const prefix = `batch ${batchNumber} repair ${repairIndex + 1} ${repair.opportunityId}`;
  if (!repair.opportunityId) throw new Error(`${prefix}: missing opportunityId`);
  if (!allowedRepairStatuses.has(repair.repairStatus)) {
    warnings.push({ code: "UNEXPECTED_REPAIR_STATUS", message: `${prefix}: ${repair.repairStatus}` });
  }
  if (!allowedCalculationStatuses.has(repair.calculationStatus)) {
    warnings.push({ code: "UNEXPECTED_CALCULATION_STATUS", message: `${prefix}: ${repair.calculationStatus}` });
  }
  if (!allowedConfidences.has(repair.sourceConfidence)) {
    warnings.push({ code: "UNEXPECTED_SOURCE_CONFIDENCE", message: `${prefix}: ${repair.sourceConfidence}` });
  }
  if (!allowedConfidences.has(repair.estimateConfidence)) {
    warnings.push({ code: "UNEXPECTED_ESTIMATE_CONFIDENCE", message: `${prefix}: ${repair.estimateConfidence}` });
  }
  if (!Array.isArray(repair.effects)) throw new Error(`${prefix}: effects must be an array`);
  if (!Array.isArray(repair.edgeActions)) throw new Error(`${prefix}: edgeActions must be an array`);
  for (const [edgeIndex, edge] of repair.edgeActions.entries()) {
    if (!edge?.retrofitTypeId) warnings.push({ code: "MISSING_EDGE_RETROFIT_ID", message: `${prefix} edge ${edgeIndex + 1}` });
    if (!allowedEdgeActions.has(edge?.action)) {
      warnings.push({ code: "UNEXPECTED_EDGE_ACTION", message: `${prefix} edge ${edgeIndex + 1}: ${edge?.action}` });
    }
  }
}

function normalizeNode(value, context) {
  if (Array.isArray(value)) return value.map((item, index) => normalizeNode(item, { ...context, path: `${context.path}[${index}]` }));
  if (value && typeof value === "object") {
    const normalized = {};
    for (const [rawKey, rawValue] of Object.entries(value)) {
      const key = cleanText(rawKey, context.stats);
      if (key !== rawKey) context.stats.objectKeysNormalized += 1;
      if (urlArrayKeys.has(key)) {
        normalized[key] = normalizeUrlArray(rawValue, context.stats);
      } else {
        normalized[key] = normalizeNode(rawValue, { ...context, path: `${context.path}.${key}` });
      }
    }
    return normalized;
  }
  if (typeof value === "string") return cleanText(value, context.stats);
  return value;
}

function normalizeUrlArray(value, stats) {
  const values = Array.isArray(value) ? value : [value];
  const urls = [];
  for (const item of values) {
    const extracted = extractUrls(String(item || ""));
    if (extracted.length > 0) {
      urls.push(...extracted);
    } else {
      const normalized = normalizeUrl(String(item || ""));
      if (normalized) urls.push(normalized);
    }
  }
  const unique = uniqueStrings(urls);
  if (JSON.stringify(values) !== JSON.stringify(unique)) {
    stats.urlArraysNormalized += 1;
    stats.urlValuesNormalized += Math.max(values.length, unique.length);
  }
  return unique;
}

function extractUrls(value) {
  return uniqueStrings(
    [...String(value || "").matchAll(/https?:\/\/[^\s\]"'<>]+/gi)]
      .map((match) => normalizeUrl(match[0]))
      .filter(Boolean)
  );
}

function normalizeUrl(value) {
  let url = String(value || "").trim();
  if (!url) return null;
  const markdownMatch = /^\[([^\]]+)\]\((https?:\/\/[^)]+)\)$/.exec(url);
  if (markdownMatch) url = markdownMatch[2];
  url = url.replace(/^\[/, "");
  const encodedQuoteIndex = url.indexOf("%22");
  if (encodedQuoteIndex !== -1) url = url.slice(0, encodedQuoteIndex);
  url = url.replace(/[\])}.,;]+$/g, "");
  return /^https?:\/\//i.test(url) ? url : null;
}

function cleanText(value, stats = null) {
  let text = String(value || "");
  const before = text;
  text = text.replace(/\[([^\]]+)\]\(https?:\/\/[^)]*\)/g, "$1");
  text = text.replace(/([A-Za-z0-9][A-Za-z0-9 .,'/&+$:-]{0,80})\]\(https?:\/\/[^)]*\)/g, "$1");
  text = text.replace(/[“”]/g, '"');
  text = text.replace(/[‘’]/g, "'");
  text = text.replace(/\u2011|\u2012|\u2013|\u2014/g, "-");
  text = text.replace(/\s+/g, " ").trim();
  if (stats && before !== text) {
    stats.markdownLinkFragmentsRemoved += (before.match(/\]\(https?:\/\//g) || []).length;
  }
  return text;
}

function countEdgeActions(repairs) {
  const counts = {};
  for (const repair of repairs) {
    for (const edge of repair.edgeActions || []) {
      const key = edge?.action || "unknown";
      counts[key] = (counts[key] || 0) + 1;
    }
  }
  return counts;
}

function buildReport(artifact) {
  return [
    "# Incentive Formula / Rate-Table Repair Intake Report",
    "",
    `Generated: ${artifact.generatedAt}`,
    `Work packet: \`${artifact.workPacketDir}\``,
    `Batches: ${artifact.batchStart}-${artifact.batchEnd}`,
    `Repairs: ${artifact.repairCount}`,
    "",
    "## Validation",
    "",
    `- Warning count: ${artifact.validation.warningCount}`,
    `- Markdown/link fragments removed: ${artifact.normalization.markdownLinkFragmentsRemoved}`,
    `- URL arrays normalized: ${artifact.normalization.urlArraysNormalized}`,
    `- Object keys normalized: ${artifact.normalization.objectKeysNormalized}`,
    "",
    "## Status Counts",
    "",
    `- Repair statuses: ${JSON.stringify(artifact.statusCounts.repairStatus)}`,
    `- Calculation statuses: ${JSON.stringify(artifact.statusCounts.calculationStatus)}`,
    `- Source confidence: ${JSON.stringify(artifact.statusCounts.sourceConfidence)}`,
    `- Estimate confidence: ${JSON.stringify(artifact.statusCounts.estimateConfidence)}`,
    `- Edge actions: ${JSON.stringify(artifact.edgeActionCounts)}`,
    "",
    "## Batches",
    "",
    ...artifact.batches.map((batch) => `- Batch ${batch.batchNumber}: ${batch.repairCount} repairs, ${batch.outputPath}`),
    ""
  ].join("\n");
}

function parseArgs(args) {
  const parsed = {
    workDir: defaultWorkDir,
    targetBatchPath: null,
    startBatch: 1,
    endBatch: 25,
    outputPath: null,
    reportPath: null
  };

  for (let index = 0; index < args.length; index += 1) {
    const arg = args[index];
    if (arg === "--work-dir") {
      parsed.workDir = path.resolve(requiredValue(args, ++index, arg));
    } else if (arg === "--target-batches") {
      parsed.targetBatchPath = path.resolve(requiredValue(args, ++index, arg));
    } else if (arg === "--start-batch") {
      parsed.startBatch = positiveInteger(requiredValue(args, ++index, arg), arg);
    } else if (arg === "--end-batch") {
      parsed.endBatch = positiveInteger(requiredValue(args, ++index, arg), arg);
    } else if (arg === "--output") {
      parsed.outputPath = path.resolve(requiredValue(args, ++index, arg));
    } else if (arg === "--report") {
      parsed.reportPath = path.resolve(requiredValue(args, ++index, arg));
    } else {
      throw new Error(`Unknown option: ${arg}`);
    }
  }

  if (parsed.endBatch < parsed.startBatch) {
    throw new Error(`--end-batch must be >= --start-batch`);
  }
  parsed.outputPath ||= path.join(
    repoRoot,
    "data",
    `incentive_formula_rate_table_research_repairs_gpt_pro_2026-07-02_batches_${parsed.startBatch}_${parsed.endBatch}.json`
  );
  parsed.reportPath ||= path.join(
    repoRoot,
    "data",
    `incentive_formula_rate_table_research_repairs_intake_report_batches_${parsed.startBatch}_${parsed.endBatch}.md`
  );
  return parsed;
}

function readJson(filePath) {
  return JSON.parse(fs.readFileSync(path.resolve(filePath), "utf8"));
}

function writeJson(filePath, value) {
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  fs.writeFileSync(filePath, `${JSON.stringify(value, null, 2)}\n`);
}

function writeText(filePath, value) {
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  fs.writeFileSync(filePath, value);
}

function firstNonEmpty(values) {
  return values.find((value) => value !== null && value !== undefined && value !== "") ?? null;
}

function countBy(rows, keyFn) {
  const counts = {};
  for (const row of rows) {
    const key = keyFn(row);
    counts[key] = (counts[key] || 0) + 1;
  }
  return counts;
}

function uniqueStrings(values) {
  return [...new Set(values.map((value) => String(value || "").trim()).filter(Boolean))];
}

function pad(value) {
  return String(value).padStart(3, "0");
}

function positiveInteger(value, flag) {
  const number = Number(value);
  if (!Number.isInteger(number) || number <= 0) throw new Error(`${flag} must be a positive integer`);
  return number;
}

function requiredValue(args, index, flag) {
  const value = args[index];
  if (!value || value.startsWith("--")) throw new Error(`${flag} requires a value`);
  return value;
}
