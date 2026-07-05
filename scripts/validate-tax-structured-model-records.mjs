import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const scriptPath = fileURLToPath(import.meta.url);
const repoRoot = path.resolve(path.dirname(scriptPath), "..");
const defaultDate = "2026-07-04";

const options = parseArgs(process.argv.slice(2));
const date = options.date || defaultDate;
const recordsPath = path.resolve(options.recordsPath || path.join(repoRoot, "data", `tax_structured_model_records_${date}.json`));
const frameworkPath = path.resolve(options.frameworkPath || path.join(repoRoot, "data", "tax_model_framework.json"));

if (options.help) {
  printHelp();
  process.exit(0);
}

const records = readJson(recordsPath);
const framework = readJson(frameworkPath);
const errors = [];
const warnings = [];
const allowedModelKinds = new Set((framework.modelKinds || []).map((model) => model.kind));
const allowedRuntimeStatuses = new Set((framework.runtimeStatuses || []).map((status) => status.status));

requireString(records, "schemaVersion", "records.schemaVersion");
requireArray(records, "sourceDocuments", "records.sourceDocuments");
requireArray(records, "sourceRegistryRecords", "records.sourceRegistryRecords");
requireArray(records, "taxRateImportPlans", "records.taxRateImportPlans");
requireArray(records, "taxRuleRecords", "records.taxRuleRecords");
requireArray(records, "unsupportedTriageRules", "records.unsupportedTriageRules");
requireArray(records, "skippedRecords", "records.skippedRecords");

if (records.schemaVersion !== "retrofi_tax_structured_model_records.v1") {
  errors.push(`Unexpected schemaVersion ${records.schemaVersion}`);
}

const sourceDocumentIds = requireUnique(records.sourceDocuments, "sourceDocumentId", "source document");
requireUnique(records.sourceRegistryRecords, "sourceId", "source registry record");
requireUnique(records.taxRateImportPlans, "planId", "tax rate import plan");
requireUnique(records.taxRuleRecords, "taxRuleId", "tax rule record");
requireUnique(records.unsupportedTriageRules, "ruleId", "unsupported triage rule");
requireUnique(records.skippedRecords, "skippedRecordId", "skipped record");

for (const [index, document] of (records.sourceDocuments || []).entries()) {
  requireString(document, "sourceDocumentId", `sourceDocuments[${index}].sourceDocumentId`);
  requireString(document, "canonicalUrl", `sourceDocuments[${index}].canonicalUrl`);
  if (!String(document.canonicalUrl || "").startsWith("http")) errors.push(`sourceDocuments[${index}].canonicalUrl must be an HTTP(S) URL.`);
}

for (const [index, row] of (records.sourceRegistryRecords || []).entries()) {
  requireString(row, "sourceId", `sourceRegistryRecords[${index}].sourceId`);
  requireString(row, "taxDataFamily", `sourceRegistryRecords[${index}].taxDataFamily`);
  requireArray(row, "sourceDocumentIds", `sourceRegistryRecords[${index}].sourceDocumentIds`);
  validateSourceDocumentRefs(row, `sourceRegistryRecords[${index}]`, sourceDocumentIds);
}

for (const [index, row] of (records.taxRateImportPlans || []).entries()) {
  requireString(row, "planId", `taxRateImportPlans[${index}].planId`);
  requireString(row, "state", `taxRateImportPlans[${index}].state`);
  requireArray(row, "taxTypes", `taxRateImportPlans[${index}].taxTypes`);
  validateSourceDocumentRefs(row, `taxRateImportPlans[${index}]`, sourceDocumentIds);
}

for (const [index, row] of (records.taxRuleRecords || []).entries()) {
  requireString(row, "taxRuleId", `taxRuleRecords[${index}].taxRuleId`);
  requireString(row, "recordType", `taxRuleRecords[${index}].recordType`);
  requireString(row, "modelKind", `taxRuleRecords[${index}].modelKind`);
  requireArray(row, "taxTypes", `taxRuleRecords[${index}].taxTypes`);
  requireArray(row, "requiredRuntimeInputs", `taxRuleRecords[${index}].requiredRuntimeInputs`);
  requireArray(row, "sourceDocumentIds", `taxRuleRecords[${index}].sourceDocumentIds`);
  if (!allowedModelKinds.has(row.modelKind)) errors.push(`${row.taxRuleId} has unsupported modelKind ${row.modelKind}.`);
  if (!allowedRuntimeStatuses.has(row.runtimeStatusWhenInputsMissing)) {
    errors.push(`${row.taxRuleId} has unsupported runtimeStatusWhenInputsMissing ${row.runtimeStatusWhenInputsMissing}.`);
  }
  if (row.includeInUserFacingTotalDefault === true) warnings.push(`${row.taxRuleId} is user-facing by default; review before runtime import.`);
  validateSourceDocumentRefs(row, `taxRuleRecords[${index}]`, sourceDocumentIds);
}

if ((records.taxRateImportPlans || []).length !== 51) errors.push(`Expected 51 state/DC tax rate import plans; found ${(records.taxRateImportPlans || []).length}.`);
if ((records.taxRuleRecords || []).length !== 151) errors.push(`Expected 151 tax rule records from the comprehensive research artifact; found ${(records.taxRuleRecords || []).length}.`);

if (errors.length) {
  console.error(`Tax structured model record validation failed with ${errors.length} error(s):`);
  for (const error of errors) console.error(`- ${error}`);
  if (warnings.length) {
    console.error("Warnings:");
    for (const warning of warnings) console.error(`- ${warning}`);
  }
  process.exit(1);
}

console.log(JSON.stringify({
  ok: true,
  sourceDocumentCount: (records.sourceDocuments || []).length,
  sourceRegistryRecordCount: (records.sourceRegistryRecords || []).length,
  taxRateImportPlanCount: (records.taxRateImportPlans || []).length,
  taxRuleRecordCount: (records.taxRuleRecords || []).length,
  unsupportedTriageRuleCount: (records.unsupportedTriageRules || []).length,
  skippedRecordCount: (records.skippedRecords || []).length,
  warnings
}, null, 2));

function parseArgs(args) {
  const parsed = {};
  for (let index = 0; index < args.length; index += 1) {
    const arg = args[index];
    if (!arg.startsWith("--")) throw new Error(`Unexpected positional argument: ${arg}`);
    const key = arg.slice(2);
    if (key === "help") {
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
  console.log(`Usage: node scripts/validate-tax-structured-model-records.mjs [--date ${defaultDate}]`);
}

function validateSourceDocumentRefs(row, label, sourceDocumentIds) {
  for (const sourceDocumentId of row.sourceDocumentIds || []) {
    if (!sourceDocumentIds.has(sourceDocumentId)) errors.push(`${label} references missing source document ${sourceDocumentId}.`);
  }
}

function requireUnique(rows, key, label) {
  const seen = new Set();
  for (const row of rows || []) {
    const value = row?.[key];
    if (!value) continue;
    if (seen.has(value)) errors.push(`Duplicate ${label} ${key}: ${value}.`);
    seen.add(value);
  }
  return seen;
}

function requireString(object, key, label) {
  if (typeof object?.[key] !== "string" || !object[key].trim()) errors.push(`${label} must be a non-empty string.`);
}

function requireArray(object, key, label) {
  if (!Array.isArray(object?.[key])) errors.push(`${label} must be an array.`);
}

function readJson(filePath) {
  return JSON.parse(fs.readFileSync(filePath, "utf8"));
}
