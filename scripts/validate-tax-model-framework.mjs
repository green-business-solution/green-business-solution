import fs from "node:fs";
import path from "node:path";

const repoRoot = path.resolve(import.meta.dirname, "..");
const frameworkPath = path.join(repoRoot, "data", "tax_model_framework.json");
const registryPath = path.join(repoRoot, "data", "tax_source_registry_seed.json");

const framework = readJson(frameworkPath);
const registry = readJson(registryPath);
const errors = [];

requireString(framework, "schemaVersion", "framework.schemaVersion");
requireArray(framework, "runtimeStatuses", "framework.runtimeStatuses");
requireArray(framework, "modelKinds", "framework.modelKinds");
requireArray(framework, "sourceStrategies", "framework.sourceStrategies");

const statuses = new Set();
for (const [index, status] of (framework.runtimeStatuses || []).entries()) {
  requireString(status, "status", `framework.runtimeStatuses[${index}].status`);
  requireBoolean(status, "customerFacingTotalAllowed", `framework.runtimeStatuses[${index}].customerFacingTotalAllowed`);
  requireString(status, "meaning", `framework.runtimeStatuses[${index}].meaning`);
  if (status.status) statuses.add(status.status);
}

for (const requiredStatus of [
  "calculated",
  "not_applicable_zero_value",
  "needs_tax_bill",
  "needs_tax_return",
  "needs_assessor_confirmation",
  "needs_tax_profile",
  "unsupported_tax_model",
  "source_unavailable"
]) {
  if (!statuses.has(requiredStatus)) errors.push(`Missing required runtime status: ${requiredStatus}`);
}

const modelKinds = new Set();
for (const [index, model] of (framework.modelKinds || []).entries()) {
  requireString(model, "kind", `framework.modelKinds[${index}].kind`);
  requireArray(model, "taxTypes", `framework.modelKinds[${index}].taxTypes`);
  requireString(model, "estimateFormula", `framework.modelKinds[${index}].estimateFormula`);
  requireArray(model, "requiredSourceFields", `framework.modelKinds[${index}].requiredSourceFields`);
  requireArray(model, "requiredRuntimeInputs", `framework.modelKinds[${index}].requiredRuntimeInputs`);
  requireArray(model, "commonGates", `framework.modelKinds[${index}].commonGates`);
  requireString(model, "userFacingPolicy", `framework.modelKinds[${index}].userFacingPolicy`);
  if (model.kind) modelKinds.add(model.kind);
  for (const gate of model.commonGates || []) {
    if (!statuses.has(gate)) errors.push(`Model ${model.kind} references unknown runtime status/common gate: ${gate}`);
  }
}

for (const requiredKind of [
  "sales_use_tax_rate",
  "sales_use_tax_exemption",
  "state_income_or_franchise_tax_credit",
  "gross_receipts_or_bo_rate_preference",
  "property_tax_exemption",
  "property_tax_credit",
  "property_tax_special_valuation",
  "tax_abatement_or_pilot",
  "local_business_license_or_receipts_tax",
  "depreciation_or_deduction",
  "unsupported_tax_model"
]) {
  if (!modelKinds.has(requiredKind)) errors.push(`Missing required tax model kind: ${requiredKind}`);
}

requireString(registry, "schemaVersion", "registry.schemaVersion");
requireArray(registry, "sourceFamilies", "registry.sourceFamilies");
requireArray(registry, "databaseTableSkeleton", "registry.databaseTableSkeleton");
requireArray(registry, "validationRules", "registry.validationRules");

for (const [index, family] of (registry.sourceFamilies || []).entries()) {
  requireString(family, "taxDataFamily", `registry.sourceFamilies[${index}].taxDataFamily`);
  requireArray(family, "modelKindsSupported", `registry.sourceFamilies[${index}].modelKindsSupported`);
  requireString(family, "priority", `registry.sourceFamilies[${index}].priority`);
  requireString(family, "runtimeGoal", `registry.sourceFamilies[${index}].runtimeGoal`);
  requireArray(family, "recommendedSources", `registry.sourceFamilies[${index}].recommendedSources`);
  requireArray(family, "requiredRuntimeInputs", `registry.sourceFamilies[${index}].requiredRuntimeInputs`);
  requireArray(family, "documentGates", `registry.sourceFamilies[${index}].documentGates`);
  requireString(family, "refreshCadence", `registry.sourceFamilies[${index}].refreshCadence`);
  for (const kind of family.modelKindsSupported || []) {
    if (!modelKinds.has(kind)) errors.push(`Source family ${family.taxDataFamily} references unknown model kind: ${kind}`);
  }
}

if (errors.length) {
  console.error(`Tax model framework validation failed with ${errors.length} error(s):`);
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log(
  JSON.stringify(
    {
      ok: true,
      runtimeStatusCount: statuses.size,
      modelKindCount: modelKinds.size,
      sourceFamilyCount: registry.sourceFamilies.length,
      registryTableCount: registry.databaseTableSkeleton.length,
      validationRuleCount: registry.validationRules.length
    },
    null,
    2
  )
);

function readJson(filePath) {
  return JSON.parse(fs.readFileSync(filePath, "utf8"));
}

function requireString(object, key, label) {
  if (typeof object?.[key] !== "string" || !object[key].trim()) errors.push(`${label} must be a non-empty string`);
}

function requireBoolean(object, key, label) {
  if (typeof object?.[key] !== "boolean") errors.push(`${label} must be a boolean`);
}

function requireArray(object, key, label) {
  if (!Array.isArray(object?.[key])) errors.push(`${label} must be an array`);
}
