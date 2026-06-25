import fs from "node:fs";
import path from "node:path";
import { unmarshall } from "@aws-sdk/util-dynamodb";

type SavingsModel = {
  id: string;
  required_bill_fields: string[];
  optional_bill_fields: string[];
};

type BillField = {
  id: string;
};

type MappingRecord = {
  opportunity_id: string;
  primary_savings_model_id: string;
  secondary_savings_model_ids: string[];
  value_roles: string[];
  business_relevance: string;
  required_bill_fields: string[];
  optional_bill_fields: string[];
};

const repoRoot = path.resolve(import.meta.dirname, "..");
const dataDir = path.join(repoRoot, "data");
const sourcePath = process.env.OPPORTUNITY_SOURCE_PATH || "/tmp/retrofi-opportunity-scan-all.json";

const savingsModels = readJson<SavingsModel[]>(path.join(dataDir, "savings_models.json"));
const billFields = readJson<BillField[]>(path.join(dataDir, "bill_field_dictionary.json"));
const mapping = readJson<MappingRecord[]>(path.join(dataDir, "opportunity_savings_mapping.sample.json"));

const modelIds = new Set(savingsModels.map((model) => model.id));
const fieldIds = new Set(billFields.map((field) => field.id));
const allowedValueRoles = new Set([
  "bill_savings",
  "upfront_cost_reduction",
  "tax_benefit",
  "financing",
  "policy_or_permitting",
  "market_credit",
  "no_direct_savings"
]);
const allowedBusinessRelevance = new Set([
  "business_relevant",
  "residential_only",
  "mixed",
  "public_nonprofit_only",
  "agriculture_only",
  "unknown"
]);
const errors: string[] = [];

for (const model of savingsModels) {
  for (const fieldId of [...model.required_bill_fields, ...model.optional_bill_fields]) {
    if (!fieldIds.has(fieldId)) {
      errors.push(`Savings model ${model.id} references unknown bill/document field ${fieldId}.`);
    }
  }
}

for (const record of mapping) {
  if (!modelIds.has(record.primary_savings_model_id)) {
    errors.push(`Mapping ${record.opportunity_id} has unknown primary model ${record.primary_savings_model_id}.`);
  }

  for (const modelId of record.secondary_savings_model_ids || []) {
    if (!modelIds.has(modelId)) {
      errors.push(`Mapping ${record.opportunity_id} has unknown secondary model ${modelId}.`);
    }
  }

  for (const fieldId of [...(record.required_bill_fields || []), ...(record.optional_bill_fields || [])]) {
    if (!fieldIds.has(fieldId)) {
      errors.push(`Mapping ${record.opportunity_id} references unknown bill/document field ${fieldId}.`);
    }
  }

  for (const role of record.value_roles || []) {
    if (!allowedValueRoles.has(role)) {
      errors.push(`Mapping ${record.opportunity_id} has invalid value role ${role}.`);
    }
  }

  if (!allowedBusinessRelevance.has(record.business_relevance)) {
    errors.push(`Mapping ${record.opportunity_id} has invalid business relevance ${record.business_relevance}.`);
  }
}

if (fs.existsSync(sourcePath)) {
  const source = readJson<{ Items?: Record<string, unknown>[] }>(sourcePath);
  const opportunityIds = new Set((source.Items || []).map((item) => unmarshall(item).opportunityId));

  for (const record of mapping) {
    if (!opportunityIds.has(record.opportunity_id)) {
      errors.push(`Mapping opportunity_id does not exist in source scan: ${record.opportunity_id}.`);
    }
  }
} else {
  errors.push(
    `Opportunity source scan was not found at ${sourcePath}. Set OPPORTUNITY_SOURCE_PATH to validate sampled IDs against a current database scan.`
  );
}

if (errors.length > 0) {
  console.error(`Savings mapping validation failed with ${errors.length} issue(s):`);
  for (const error of errors) {
    console.error(`- ${error}`);
  }
  process.exit(1);
}

console.log(`Savings mapping validation passed: ${savingsModels.length} models, ${billFields.length} fields, ${mapping.length} mappings.`);

function readJson<T>(filePath: string): T {
  return JSON.parse(fs.readFileSync(filePath, "utf8")) as T;
}
