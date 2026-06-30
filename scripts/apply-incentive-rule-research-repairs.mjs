import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";

const repoRoot = path.resolve(import.meta.dirname, "..");
const defaultRulesPath = path.join(repoRoot, "data", "opportunity_incentive_rules.json");
const rulesPath = process.env.OPPORTUNITY_INCENTIVE_RULES_PATH || defaultRulesPath;
const repairsPath =
  process.env.OPPORTUNITY_INCENTIVE_RESEARCH_REPAIRS_PATH ||
  path.join(repoRoot, "data", "opportunity_incentive_rule_research_repairs_gpt_pro_2026-06-28_batch1.json");
const reportPath =
  process.env.OPPORTUNITY_INCENTIVE_RULES_REPORT_PATH ||
  path.join(repoRoot, "data", "opportunity_incentive_rule_repair_report.md");

const source = readJson(rulesPath);
const research = readJson(repairsPath);
const batchId =
  research.batchId ||
  path.basename(repairsPath, ".json").replace(/^opportunity_incentive_rule_research_repairs_/, "");
const manualById = new Map((source.manualRepairTargets || []).map((target) => [target.opportunityId, target]));
const reviewedIds = new Set([
  ...(research.repairs || []).map((repair) => repair.opportunityId),
  ...(research.unresolved || []).map((row) => row.opportunityId)
]);

const repairedRules = (research.repairs || [])
  .filter((repair) => repair.repairStatus === "rule_found")
  .map((repair, index) => buildRule(repair, index));
const reviewedNoRule = (research.unresolved || []).map((row) => buildReviewedNoRule(row));
const repairedRuleIds = new Set(repairedRules.map((rule) => rule.id));
const existingRules = (source.rules || []).filter((rule) => !repairedRuleIds.has(rule.id));
const existingReviewedNoRule = (source.researchReviewedNoRule || []).filter(
  (row) => !reviewedIds.has(row.opportunityId)
);
const rules = [...existingRules, ...repairedRules];
const manualRepairTargets = (source.manualRepairTargets || []).filter((target) => !reviewedIds.has(target.opportunityId));
const researchReviewedNoRule = [...existingReviewedNoRule, ...reviewedNoRule];
const appliedResearchBatches = [
  ...(source.appliedResearchBatches || []).filter((batch) => batch.batchId !== batchId),
  {
    batchId,
    appliedAt: new Date().toISOString(),
    repairsPath: path.relative(repoRoot, repairsPath),
    ruleCount: repairedRules.length,
    reviewedNoRuleCount: reviewedNoRule.length,
    reviewedOpportunityCount: reviewedIds.size,
    continueFromOpportunityId: research.continueFromOpportunityId || null
  }
];

const output = {
  ...source,
  generatedAt: new Date().toISOString(),
  repairedThisRunCount: repairedRules.length,
  manualThisRunCount: 0,
  repairedRuleCount: rules.length,
  manualRepairTargetCount: manualRepairTargets.length,
  researchReviewedNoRuleCount: researchReviewedNoRule.length,
  appliedResearchBatches,
  lastResearchRepairBatch: appliedResearchBatches.at(-1),
  ruleExtractionCounts: countBy(rules, (rule) => rule.extractionMethod || "unknown"),
  ruleConfidenceCounts: countBy(rules, (rule) => rule.confidence || "unknown"),
  gapReasonCounts: countBy(manualRepairTargets, (gap) => gap.reason || "unknown"),
  researchNoRuleStatusCounts: countBy(researchReviewedNoRule, (row) => row.repairStatus || "unknown"),
  rules,
  manualRepairTargets,
  researchReviewedNoRule
};

fs.writeFileSync(rulesPath, `${JSON.stringify(output, null, 2)}\n`);
fs.writeFileSync(reportPath, buildReport(output), "utf8");

console.log("Applied incentive rule research repairs.");
console.log(`Batch: ${batchId}`);
console.log(`Rules added: ${repairedRules.length}`);
console.log(`Reviewed without rule: ${reviewedNoRule.length}`);
console.log(`Remaining manual targets: ${manualRepairTargets.length}`);
console.log(`Wrote: ${rulesPath}`);
console.log(`Report: ${reportPath}`);

function readJson(filePath) {
  return JSON.parse(fs.readFileSync(path.resolve(repoRoot, filePath), "utf8"));
}

function buildRule(repair, index) {
  const target = manualById.get(repair.opportunityId);
  const amountRule = normalizeAmountRule(repair.amountRule || {});
  const basisPolicy = normalizeBasisPolicy(repair.basisPolicy);
  const rule = {
    id: `oir_${shortHash(`${repair.opportunityId}|${repair.formula}|${JSON.stringify(amountRule)}|${index}`)}_v1`,
    version: 1,
    opportunityId: repair.opportunityId,
    name: repair.opportunityName || target?.opportunityName || repair.opportunityId,
    incentiveType: normalizeIncentiveType(repair.incentiveType, amountRule),
    timing: repair.timing || "upfront",
    amountRule,
    basisPolicy,
    active: true,
    source: "gpt_pro_opportunity_incentive_rule_repair",
    extractionMethod: "gpt_pro_research",
    researchBatchId: batchId,
    confidence: repair.confidence || "medium",
    formula: repair.formula || null,
    evidenceText: cleanText(repair.evidenceText),
    sourceUrlsChecked: normalizeUrls(repair.sourceUrlsChecked),
    reasoningNotes: cleanText(repair.reasoningNotes),
    mapping: target
      ? {
          primarySavingsModelId: target.primarySavingsModelId,
          incentiveValueMethod: target.incentiveValueMethod,
          calculationReadiness: target.calculationReadiness,
          calculationInputNeed: target.calculationInputNeed || null,
          businessRelevance: target.businessRelevance,
          v1Readiness: target.v1Readiness
        }
      : null
  };

  if (basisPolicy.basis === "eligible_cost_categories") {
    rule.eligibleCostCategories = repair.eligibleCostCategories || ["equipment_cost", "installation_labor"];
  }
  if (repair.cap && Object.keys(repair.cap).length) rule.cap = repair.cap;

  return rule;
}

function buildReviewedNoRule(row) {
  const target = manualById.get(row.opportunityId);
  return {
    opportunityId: row.opportunityId,
    opportunityName: row.opportunityName || target?.opportunityName || row.opportunityId,
    repairStatus: row.repairStatus,
    confidence: row.confidence || "medium",
    evidenceText: cleanText(row.evidenceText),
    sourceUrlsChecked: normalizeUrls(row.sourceUrlsChecked),
    reasoningNotes: cleanText(row.reasoningNotes),
    researchBatchId: batchId,
    reviewedAt: research.researchedAt || null,
    originalGapReason: target?.reason || null,
    mapping: target
      ? {
          primarySavingsModelId: target.primarySavingsModelId,
          incentiveValueMethod: target.incentiveValueMethod,
          calculationReadiness: target.calculationReadiness,
          calculationInputNeed: target.calculationInputNeed || null,
          businessRelevance: target.businessRelevance,
          v1Readiness: target.v1Readiness
        }
      : null
  };
}

function normalizeAmountRule(amountRule) {
  if (!amountRule.kind) throw new Error(`Missing amountRule.kind: ${JSON.stringify(amountRule)}`);
  if (amountRule.kind === "fixed_per_unit") {
    return {
      kind: "fixed_per_unit",
      amountCentsPerUnit: integer(amountRule.amountCentsPerUnit),
      unitAnswerKey: amountRule.unitAnswerKey || "unit_count"
    };
  }
  if (amountRule.kind === "fixed_amount") {
    return {
      kind: "fixed_amount",
      amountCents: integer(amountRule.amountCents)
    };
  }
  if (amountRule.kind === "percent_of_basis") {
    return {
      kind: "percent_of_basis",
      percent: Number(amountRule.percent)
    };
  }
  if (amountRule.kind === "rate_per_kw") {
    return {
      kind: "rate_per_kw",
      amountCentsPerKw: integer(amountRule.amountCentsPerKw),
      kwSource: amountRule.kwSource || "system_kw"
    };
  }
  if (amountRule.kind === "rate_per_kwh") {
    return {
      kind: "rate_per_kwh",
      amountCentsPerKwh: integer(amountRule.amountCentsPerKwh),
      kwhSource: amountRule.kwhSource || "annual_kwh_delta_abs"
    };
  }
  if (amountRule.kind === "rate_per_battery_kwh") {
    return {
      kind: "rate_per_battery_kwh",
      amountCentsPerBatteryKwh: integer(amountRule.amountCentsPerBatteryKwh),
      batteryKwhSource: amountRule.batteryKwhSource || "battery_storage_kwh"
    };
  }
  throw new Error(`Unsupported amountRule.kind: ${amountRule.kind}`);
}

function normalizeBasisPolicy(basisPolicy = {}) {
  return {
    basis: basisPolicy.basis || "gross_project_cost",
    applicationOrder: Number.isFinite(Number(basisPolicy.applicationOrder)) ? Number(basisPolicy.applicationOrder) : 10
  };
}

function normalizeIncentiveType(incentiveType, amountRule) {
  if (incentiveType) return incentiveType;
  if (amountRule.kind === "percent_of_basis") return "percent_project_cost_rebate";
  if (amountRule.kind === "fixed_amount") return "capped_rebate";
  return "fixed_per_unit_rebate";
}

function normalizeUrls(urls = []) {
  return uniqueStrings(
    urls
      .map((url) => String(url || "").trim())
      .map((url) => {
        const markdownMatch = /^\[([^\]]+)\]\(([^)]+)\)$/.exec(url);
        return markdownMatch ? markdownMatch[2] : url;
      })
      .filter((url) => /^https?:\/\//i.test(url))
  );
}

function cleanText(value) {
  return String(value || "")
    .replace(/[“”]/g, '"')
    .replace(/[‘’]/g, "'")
    .replace(/\u2011|\u2013|\u2014/g, "-")
    .replace(/\s+/g, " ")
    .trim();
}

function integer(value) {
  const number = Number(value);
  if (!Number.isFinite(number)) throw new Error(`Expected finite integer, got ${value}`);
  return Math.round(number);
}

function shortHash(value) {
  return crypto.createHash("sha256").update(value).digest("hex").slice(0, 16);
}

function uniqueStrings(values) {
  return [...new Set(values.filter(Boolean))];
}

function countBy(rows, keyFn) {
  return rows.reduce((counts, row) => {
    const key = keyFn(row);
    counts[key] = (counts[key] || 0) + 1;
    return counts;
  }, {});
}

function buildReport(output) {
  const lines = [
    "# Opportunity Incentive Rule Repair Report",
    "",
    `Generated: ${output.generatedAt}`,
    `Targets reviewed: ${output.targetCount}`,
    `Rules generated: ${output.repairedRuleCount}`,
    `Manual repair targets: ${output.manualRepairTargetCount}`,
    `Research-reviewed no-rule targets: ${output.researchReviewedNoRuleCount || 0}`,
    "",
    "## Rule Extraction Counts",
    "",
    "```json",
    JSON.stringify(output.ruleExtractionCounts || {}, null, 2),
    "```",
    "",
    "## Rule Confidence Counts",
    "",
    "```json",
    JSON.stringify(output.ruleConfidenceCounts || {}, null, 2),
    "```",
    "",
    "## Remaining Gap Reason Counts",
    "",
    "```json",
    JSON.stringify(output.gapReasonCounts || {}, null, 2),
    "```",
    "",
    "## Research No-Rule Status Counts",
    "",
    "```json",
    JSON.stringify(output.researchNoRuleStatusCounts || {}, null, 2),
    "```",
    "",
    "## Applied Research Batches",
    "",
    "```json",
    JSON.stringify(output.appliedResearchBatches || [], null, 2),
    "```",
    "",
    "## Notes",
    "",
    "- Rules are generated when deterministic source text or GPT Pro research contains an extractable upfront, recurring, grant, tax, rate, amount, percentage, or cap effect.",
    "- GPT Pro research repairs are stored with `extractionMethod: gpt_pro_research` and include source URLs plus short evidence text.",
    "- Targets reviewed by GPT Pro without any safe monetary effect are moved to `researchReviewedNoRule` instead of being repeatedly sent through the same repair queue. Recurring bill credits, recurring charges, tariff discounts, demand-response credits, and performance incentives should be returned as `rule_found` with non-upfront `timing`, not as no-rule rows.",
    "- Broad programs with measure-specific tables often need manual or LLM-assisted extraction because one opportunity can contain many rates.",
    "",
    "## First Manual Repair Targets",
    ""
  ];

  for (const target of (output.manualRepairTargets || []).slice(0, 50)) {
    lines.push(`- ${target.opportunityName} (${target.opportunityId})`);
    lines.push(
      `  - reason: ${target.reason}; method: ${target.incentiveValueMethod}; source: ${target.websiteUrl || target.sourceUrl || "n/a"}`
    );
  }

  return `${lines.join("\n")}\n`;
}
