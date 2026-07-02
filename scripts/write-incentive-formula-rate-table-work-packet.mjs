import fs from "node:fs";
import path from "node:path";

const repoRoot = path.resolve(import.meta.dirname, "..");
const defaultPublicIndexPath = path.join(repoRoot, "public", "retrofit_opportunity_index.json");
const defaultRulesPath = path.join(repoRoot, "data", "opportunity_incentive_rules.json");
const defaultWorkRoot = path.join(repoRoot, "GPT Pro Work");
const activeStatuses = new Set(["active", "rolling"]);

const options = parseArgs(process.argv.slice(2));
const publicIndex = readJson(options.publicIndexPath);
const rulesArtifact = readJson(options.rulesPath);
const targets = buildTargets({ publicIndex, rulesArtifact });
const selectedTargets = targets.slice(0, options.promptCount * options.targetsPerPrompt);
const endBatch = options.startBatch + options.promptCount - 1;
const packetDir = path.join(options.workRoot, `incentive-formula-rate-table-repair-batches-${options.startBatch}-${endBatch}`);

if (fs.existsSync(packetDir) && !options.force) {
  throw new Error(`packet directory already exists: ${path.relative(repoRoot, packetDir)}. Use --force to overwrite.`);
}

fs.mkdirSync(packetDir, { recursive: true });
writeText(path.join(packetDir, "README.md"), buildReadme({ targets, selectedTargets, endBatch }));
writeJson(path.join(packetDir, `target_batches_${options.startBatch}_${endBatch}.json`), buildTargetBatchArtifact(selectedTargets));

let fileCount = 2;
for (let promptIndex = 0; promptIndex < options.promptCount; promptIndex += 1) {
  const batchNumber = options.startBatch + promptIndex;
  const start = promptIndex * options.targetsPerPrompt;
  const batchTargets = selectedTargets.slice(start, start + options.targetsPerPrompt);
  const targetStart = start + 1;
  const targetEnd = start + batchTargets.length;
  const promptPath = path.join(
    packetDir,
    `prompt_batch${pad(batchNumber)}_targets_${pad(targetStart)}_${pad(targetEnd)}.md`
  );
  const outputPath = path.join(packetDir, `output_batch${pad(batchNumber)}.md`);

  writeText(
    promptPath,
    buildPrompt({
      batchNumber,
      targetStart,
      targetEnd,
      totalTargetCount: selectedTargets.length,
      targets: batchTargets,
      continuation: selectedTargets[targetEnd]?.opportunityId || null
    })
  );
  writeText(outputPath, "");
  fileCount += 2;
}

console.log(`Wrote ${path.relative(repoRoot, packetDir)}`);
console.log(`Prompt/output files: ${options.promptCount * 2}`);
console.log(`Total files written: ${fileCount}`);
console.log(`Immediate repair targets available: ${targets.length}`);
console.log(`Targets included: ${selectedTargets.length}`);
console.log(`Last prompt target count: ${selectedTargets.slice((options.promptCount - 1) * options.targetsPerPrompt).length}`);

function buildTargets({ publicIndex, rulesArtifact }) {
  const publicById = buildPublicOpportunityContext(publicIndex);
  const rulesById = groupBy(rulesArtifact.rules || [], (rule) => rule.opportunityId);
  const reviewedNoRuleById = groupBy(rulesArtifact.researchReviewedNoRule || [], (row) => row.opportunityId);
  const targetIds = new Set([
    ...[...rulesById.keys()].filter((opportunityId) => isActivePublic(publicById.get(opportunityId))),
    ...[...reviewedNoRuleById.keys()].filter((opportunityId) => isActivePublic(publicById.get(opportunityId)))
  ]);

  return [...targetIds]
    .map((opportunityId) => {
      const publicContext = publicById.get(opportunityId);
      const existingRules = compactRules(rulesById.get(opportunityId) || []);
      const reviewedNoRule = compactReviewedNoRule(reviewedNoRuleById.get(opportunityId) || []);
      return {
        opportunityId,
        opportunityName: publicContext.opportunityName,
        state: publicContext.state,
        sourceName: publicContext.sourceName,
        sourceUrl: publicContext.sourceUrl,
        websiteUrl: publicContext.websiteUrl,
        applicationUrl: publicContext.applicationUrl,
        administrator: publicContext.administrator,
        programType: publicContext.programType,
        availabilityStatus: publicContext.availabilityStatus,
        sourceConfidence: publicContext.opportunityDataRepair?.confidence || null,
        currentPublicEdgeCount: publicContext.relatedRetrofits.length,
        targetKind: existingRules.length > 0 ? "existing_simple_rule_v2_repair" : "reviewed_no_rule_reclassification",
        currentRelatedRetrofits: publicContext.relatedRetrofits,
        repairedOpportunityData: compactOpportunityDataRepair(publicContext.opportunityDataRepair),
        existingSimpleRules: existingRules,
        reviewedNoRule
      };
    })
    .sort(compareTargets);
}

function buildPublicOpportunityContext(publicIndex) {
  const byId = new Map();
  for (const retrofit of publicIndex.retrofits || []) {
    for (const opportunity of retrofit.opportunities || []) {
      if (!opportunity?.opportunityId) continue;
      const existing = byId.get(opportunity.opportunityId) || {
        opportunityId: opportunity.opportunityId,
        opportunityName: opportunity.opportunityName || opportunity.opportunityId,
        sourceName: opportunity.sourceName || null,
        sourceUrl: opportunity.sourceUrl || null,
        websiteUrl: opportunity.websiteUrl || null,
        applicationUrl: opportunity.applicationUrl || null,
        state: opportunity.state || null,
        administrator: opportunity.administrator || null,
        programType: opportunity.programType || null,
        availabilityStatus: opportunity.availabilityStatus || null,
        opportunityDataRepair: opportunity.opportunityDataRepair || null,
        relatedRetrofits: []
      };
      existing.opportunityName ||= opportunity.opportunityName || opportunity.opportunityId;
      existing.sourceName ||= opportunity.sourceName || null;
      existing.sourceUrl ||= opportunity.sourceUrl || null;
      existing.websiteUrl ||= opportunity.websiteUrl || null;
      existing.applicationUrl ||= opportunity.applicationUrl || null;
      existing.state ||= opportunity.state || null;
      existing.administrator ||= opportunity.administrator || null;
      existing.programType ||= opportunity.programType || null;
      existing.availabilityStatus = strongestAvailability(existing.availabilityStatus, opportunity.availabilityStatus);
      existing.opportunityDataRepair ||= opportunity.opportunityDataRepair || null;
      if (!existing.relatedRetrofits.some((row) => row.retrofitTypeId === retrofit.retrofitTypeId)) {
        existing.relatedRetrofits.push({
          retrofitTypeId: retrofit.retrofitTypeId,
          displayName: retrofit.displayName,
          parentCategory: retrofit.parentCategory,
          isPhysicalRetrofit: Boolean(retrofit.isPhysicalRetrofit),
          currentMatchConfidence: Number.isFinite(opportunity.confidence) ? Number(opportunity.confidence.toFixed(4)) : null,
          matchBasis: opportunity.matchBasis || null,
          matchedTerms: strings(opportunity.matchedTerms).slice(0, 8)
        });
      }
      byId.set(opportunity.opportunityId, existing);
    }
  }

  for (const row of byId.values()) {
    row.relatedRetrofits.sort((a, b) => a.displayName.localeCompare(b.displayName));
  }
  return byId;
}

function compactOpportunityDataRepair(repair) {
  if (!repair) return null;
  return {
    confidence: repair.confidence || null,
    availabilityStatus: repair.availabilityStatus || null,
    geography: repair.geography || null,
    eligibleApplicantTypes: strings(repair.eligibleApplicantTypes),
    eligibleSectors: strings(repair.eligibleSectors),
    eligibleRetrofitCategories: strings(repair.eligibleRetrofitCategories),
    hardRequirements: strings(repair.hardRequirements).slice(0, 16),
    blockers: strings(repair.blockers).slice(0, 16),
    programType: repair.programType || null,
    administrator: repair.administrator || null,
    applicationUrl: repair.applicationUrl || null,
    websiteUrl: repair.websiteUrl || null,
    sourceUrlsChecked: strings(repair.sourceUrlsChecked).slice(0, 16),
    evidenceText: truncate(repair.evidenceText, 900),
    reasoningNotes: truncate(repair.reasoningNotes, 900)
  };
}

function compactRules(rules) {
  return rules
    .map((rule) => ({
      id: rule.id,
      incentiveType: rule.incentiveType || null,
      timing: rule.timing || null,
      amountRule: rule.amountRule || null,
      basisPolicy: rule.basisPolicy || null,
      cap: rule.cap || null,
      confidence: rule.confidence || null,
      formula: rule.formula || null,
      evidenceText: truncate(rule.evidenceText, 500),
      sourceUrlsChecked: strings(rule.sourceUrlsChecked),
      reasoningNotes: truncate(rule.reasoningNotes, 500),
      mapping: rule.mapping || null
    }))
    .sort((a, b) => String(a.id).localeCompare(String(b.id)));
}

function compactReviewedNoRule(rows) {
  return rows.map((row) => ({
    repairStatus: row.repairStatus || null,
    confidence: row.confidence || null,
    evidenceText: truncate(row.evidenceText, 500),
    sourceUrlsChecked: strings(row.sourceUrlsChecked),
    reasoningNotes: truncate(row.reasoningNotes, 500),
    originalGapReason: row.originalGapReason || null,
    mapping: row.mapping || null
  }));
}

function compareTargets(a, b) {
  const kindDelta = targetKindPriority(a.targetKind) - targetKindPriority(b.targetKind);
  if (kindDelta !== 0) return kindDelta;
  const edgeDelta = b.currentPublicEdgeCount - a.currentPublicEdgeCount;
  if (edgeDelta !== 0) return edgeDelta;
  const stateDelta = String(a.state || "").localeCompare(String(b.state || ""));
  if (stateDelta !== 0) return stateDelta;
  return String(a.opportunityName || a.opportunityId).localeCompare(String(b.opportunityName || b.opportunityId));
}

function targetKindPriority(kind) {
  if (kind === "existing_simple_rule_v2_repair") return 0;
  return 1;
}

function isActivePublic(context) {
  return Boolean(context && activeStatuses.has(context.availabilityStatus));
}

function strongestAvailability(left, right) {
  const priority = { active: 0, rolling: 1, uncertain: 2, upcoming: 3, unavailable: 4 };
  if (!left) return right || null;
  if (!right) return left;
  return (priority[right] ?? 99) < (priority[left] ?? 99) ? right : left;
}

function buildPrompt({ batchNumber, targetStart, targetEnd, totalTargetCount, targets, continuation }) {
  const targetCount = targets.length;
  return [
    "You are helping RetroFi repair incentive formulas, rate tables, grant estimates, tax credits, and non-cash workflow value rules.",
    "",
    "Return strict JSON only. Do not include markdown, code fences, commentary, or citations outside JSON fields.",
    "",
    `Batch: ${batchNumber}`,
    `Targets in this prompt: ${targetStart}-${targetEnd} of ${totalTargetCount}`,
    `Repair objects required: ${targetCount}`,
    "",
    "Core distinction:",
    "- Eligibility matching is already handled elsewhere. Do not decide whether a specific user is eligible.",
    "- Your job is to extract the source-backed value/calculation/workflow logic for an already-matched opportunity.",
    "- If current target retrofit edges are unsupported by the source, mark those edges as delete_bad_edge. Do not preserve false physical retrofit edges.",
    "- If the opportunity is real but belongs to a special workflow, classify it as non_monetary_workflow, process_value, permit_fee_waiver, interconnection, technical_assistance, financing, tax_credit, tariff, or another accurate category.",
    "",
    "Use current official sources first:",
    "- program administrator pages",
    "- utility rebate pages",
    "- current application forms",
    "- PDFs, program manuals, tariffs, statutes, tax authority pages, solicitation guides, rate sheets",
    "- DSIRE may be used as a lead, but not as final authority when official sources are available.",
    "",
    "Do not overstate value:",
    "- Treat 'up to' as a cap, not an expected amount.",
    "- Competitive max-only grants should not get a dollar estimate unless source-backed probability evidence exists.",
    "- Loans/financing are not cash savings unless explicit forgiveness, buy-down, or subsidy value is stated.",
    "- Tax credits are monetary, but classify them as tax_credit effects, not grants.",
    "- Custom incentives should be custom_quote_required unless a formula/rate table is published.",
    "- If project cost, unit count, kW, kWh savings, battery kWh, square feet, tonnage, equipment tier, or eligible cost basis is required, list it in requiredInputs.",
    "",
    "Important target interpretation:",
    "- `existingSimpleRules` are current legacy rules. Fact-check them; do not assume they are right.",
    "- `reviewedNoRule` means previous research did not find a simple one-time formula. Re-check for recurring credits, tariffs, tax credits, grants, rate tables, measure catalogs, non-cash workflow value, or bad edges.",
    "- `repairedOpportunityData` contains the latest source-confidence and match repair notes. Use it to avoid false physical edges and source-inaccessible traps.",
    "",
    "Output schema:",
    "{",
    "  \"schemaVersion\": \"incentive_formula_rate_table_research_repairs.v1\",",
    "  \"researchedAt\": \"2026-07-02\",",
    "  \"source\": \"gpt_pro\",",
    `  \"batchNumber\": ${batchNumber},`,
    "  \"repairs\": [",
    "    {",
    "      \"opportunityId\": \"exact target opportunityId\",",
    "      \"opportunityName\": \"\",",
    "      \"repairStatus\": \"calculation_package_found | custom_quote_required | non_monetary_workflow | no_monetary_effect | source_inaccessible | unavailable_archive | bad_edge_delete_only | needs_human_review\",",
    "      \"calculationStatus\": \"calculable | calculable_with_missing_inputs | estimate_from_range | custom_quote_estimate | source_inaccessible_repair_failure | unavailable_archived | non_monetary_workflow | no_calculable_value | needs_repair_review\",",
    "      \"sourceConfidence\": \"high | medium | low\",",
    "      \"estimateConfidence\": \"high | medium | low\",",
    "      \"cashValueClassifications\": [\"cash_grant | reimbursement | rebate | tax_credit | loan | financing | technical_assistance | process_value | tariff_or_rate | non_cash | unknown\"],",
    "      \"primaryValueModelKinds\": [\"fixed_amount | fixed_tier_amount | percent_of_eligible_cost | capped_percent_of_eligible_cost | per_unit_award | rate_table | measure_catalog | hybrid_rate_plus_cap | competitive_max_only | competitive_award_range | competitive_cost_share | formula_grant | tax_credit | loan_or_financing | tariff_or_rate | custom_quote | non_cash_process_value | no_calculable_value | source_inaccessible\"],",
    "      \"effects\": [",
    "        {",
    "          \"effectType\": \"one_time_savings | recurring_savings | recurring_expense | grant_expected_value | tax_credit | financing_subsidy | process_value | no_cash_value\",",
    "          \"cashValueClassification\": \"cash_grant | reimbursement | rebate | tax_credit | loan | financing | technical_assistance | process_value | tariff_or_rate | non_cash | unknown\",",
    "          \"valueModelKind\": \"fixed_amount | fixed_tier_amount | percent_of_eligible_cost | capped_percent_of_eligible_cost | per_unit_award | rate_table | measure_catalog | hybrid_rate_plus_cap | competitive_max_only | competitive_award_range | competitive_cost_share | formula_grant | tax_credit | loan_or_financing | tariff_or_rate | custom_quote | non_cash_process_value | no_calculable_value | source_inaccessible\",",
    "          \"timing\": \"upfront | point_of_sale | post_purchase_rebate | post_installation_reimbursement | annual | monthly | tax_filing | loan_closing | application_process | unknown\",",
    "          \"formulaText\": \"plain English formula from source\",",
    "          \"amountCents\": null,",
    "          \"percent\": null,",
    "          \"rate\": null,",
    "          \"rateUnit\": null,",
    "          \"minAmountCents\": null,",
    "          \"maxAmountCents\": null,",
    "          \"caps\": {",
    "            \"maxAwardCents\": null,",
    "            \"minAwardCents\": null,",
    "            \"maxPercentOfEligibleCost\": null,",
    "            \"maxUnits\": null,",
    "            \"perCustomerCapCents\": null,",
    "            \"perSiteCapCents\": null,",
    "            \"annualCapCents\": null,",
    "            \"programBudgetCents\": null",
    "          },",
    "          \"eligibleCostCategories\": [],",
    "          \"ineligibleCostCategories\": [],",
    "          \"requiredInputs\": [],",
    "          \"missingInputsForTypicalRetroFiEstimate\": [],",
    "          \"rateTable\": {",
    "            \"tableId\": null,",
    "            \"dimensions\": [],",
    "            \"rows\": []",
    "          },",
    "          \"measureCatalog\": {",
    "            \"catalogId\": null,",
    "            \"selectionInput\": null,",
    "            \"rows\": []",
    "          },",
    "          \"probabilityModel\": {",
    "            \"probabilityRequired\": false,",
    "            \"probabilityDiscount\": null,",
    "            \"probabilityEvidenceType\": \"not_required | historical_success_rate | budget_and_expected_awards | historical_awards_only | first_come_funds_confirmed | first_come_funding_unknown | scoring_criteria_only | eligibility_only | human_reviewed | none\"",
    "          },",
    "          \"includedInUserFacingTotalDefault\": false,",
    "          \"evidenceText\": \"under 75 words, no URLs\",",
    "          \"sourceUrls\": []",
    "        }",
    "      ],",
    "      \"edgeActions\": [",
    "        {",
    "          \"retrofitTypeId\": \"target retrofitTypeId\",",
    "          \"action\": \"keep | delete_bad_edge | move_to_special_workflow | needs_review\",",
    "          \"reason\": \"source-backed reason\"",
    "        }",
    "      ],",
    "      \"stackingRules\": {",
    "        \"stackableWithRebates\": null,",
    "        \"stackableWithTaxCredits\": null,",
    "        \"mustDeductOtherIncentivesFromEligibleCost\": null,",
    "        \"notes\": \"\"",
    "      },",
    "      \"timingRequirements\": {",
    "        \"approvalRequiredBeforePurchase\": null,",
    "        \"approvalRequiredBeforeInstallation\": null,",
    "        \"applicationDeadline\": null,",
    "        \"fundingStatus\": \"open_funds_available | open_while_funds_last | waitlist | closed | exhausted | unknown\"",
    "      },",
    "      \"sourceUrlsChecked\": [],",
    "      \"evidenceText\": \"under 75 words, no URLs\",",
    "      \"reasoningNotes\": \"\",",
    "      \"humanReviewRequired\": false,",
    "      \"humanReviewReasons\": []",
    "    }",
    "  ],",
    `  \"continueFromOpportunityId\": ${JSON.stringify(continuation)}`,
    "}",
    "",
    "Validation before responding:",
    "- JSON.parse must succeed.",
    `- repairs.length must equal ${targetCount}.`,
    "- repairs must be in the same order as targets.",
    "- Every target opportunityId must appear exactly once.",
    "- Use raw URL strings only. No markdown links.",
    "- Use cents for USD amounts where amount fields end in Cents.",
    "- Use null for unknown numeric values, not 0.",
    "- Use empty arrays for unknown lists.",
    "- Keep evidenceText fields concise and URL-free.",
    "",
    "Targets:",
    JSON.stringify(targets, null, 2),
    ""
  ].join("\n");
}

function buildReadme({ targets, selectedTargets, endBatch }) {
  const counts = countBy(selectedTargets, (target) => target.targetKind);
  return [
    "# Incentive Formula / Rate-Table Repair Work Packet",
    "",
    `Generated: ${new Date().toISOString()}`,
    "",
    "Use each `prompt_batch*.md` file as the prompt for GPT Pro and paste the result into the matching blank `output_batch*.md` file.",
    "",
    "You do not need to give GPT Pro `target_batches_1_50.json`; each prompt already embeds its targets. The target batch JSON is for Codex validation/import work after outputs are returned.",
    "",
    "## Counts",
    "",
    `- Immediate repair targets available: ${targets.length}`,
    `- Targets included in this packet: ${selectedTargets.length}`,
    `- Prompt batches: ${options.promptCount}`,
    `- End batch: ${endBatch}`,
    `- Targets per full prompt: ${options.targetsPerPrompt}`,
    `- Final prompt target count: ${selectedTargets.slice((options.promptCount - 1) * options.targetsPerPrompt).length}`,
    `- Target kinds: ${JSON.stringify(counts)}`,
    "",
    "## Focus",
    "",
    "- Repair and fact-check existing simple incentive rules.",
    "- Reclassify prior no-rule rows into richer calculation/workflow buckets.",
    "- Extract rate tables, measure catalogs, caps, tax credits, grants, recurring effects, custom quote status, and non-monetary workflows.",
    "- Mark unsupported retrofit-opportunity edges as `delete_bad_edge`.",
    ""
  ].join("\n");
}

function buildTargetBatchArtifact(selectedTargets) {
  const batches = [];
  for (let index = 0; index < selectedTargets.length; index += options.targetsPerPrompt) {
    const batchNumber = options.startBatch + batches.length;
    const batchTargets = selectedTargets.slice(index, index + options.targetsPerPrompt);
    batches.push({
      batchNumber,
      targetStart: index + 1,
      targetEnd: index + batchTargets.length,
      targetCount: batchTargets.length,
      opportunityIds: batchTargets.map((target) => target.opportunityId)
    });
  }
  return {
    schemaVersion: "incentive_formula_rate_table_repair_targets.v1",
    generatedAt: new Date().toISOString(),
    publicIndexPath: path.relative(repoRoot, options.publicIndexPath),
    rulesPath: path.relative(repoRoot, options.rulesPath),
    targetCount: selectedTargets.length,
    selection: {
      availabilityStatuses: [...activeStatuses],
      targetKinds: ["existing_simple_rule_v2_repair", "reviewed_no_rule_reclassification"],
      promptCount: options.promptCount,
      targetsPerPrompt: options.targetsPerPrompt,
      sort: [
        "existing simple rules before reviewed no-rule rows",
        "current public edge count descending",
        "state ascending",
        "opportunity name ascending"
      ]
    },
    batches,
    targets: selectedTargets
  };
}

function parseArgs(args) {
  const parsed = {
    publicIndexPath: defaultPublicIndexPath,
    rulesPath: defaultRulesPath,
    workRoot: defaultWorkRoot,
    startBatch: 1,
    promptCount: 50,
    targetsPerPrompt: 20,
    force: false
  };

  for (let index = 0; index < args.length; index += 1) {
    const arg = args[index];
    if (arg === "--public-index") {
      parsed.publicIndexPath = path.resolve(requiredValue(args, ++index, arg));
    } else if (arg === "--rules") {
      parsed.rulesPath = path.resolve(requiredValue(args, ++index, arg));
    } else if (arg === "--work-root") {
      parsed.workRoot = path.resolve(requiredValue(args, ++index, arg));
    } else if (arg === "--start-batch") {
      parsed.startBatch = positiveInteger(requiredValue(args, ++index, arg), arg);
    } else if (arg === "--prompt-count") {
      parsed.promptCount = positiveInteger(requiredValue(args, ++index, arg), arg);
    } else if (arg === "--targets-per-prompt") {
      parsed.targetsPerPrompt = positiveInteger(requiredValue(args, ++index, arg), arg);
    } else if (arg === "--force") {
      parsed.force = true;
    } else {
      throw new Error(`Unknown option: ${arg}`);
    }
  }

  return parsed;
}

function groupBy(rows, keyFn) {
  const groups = new Map();
  for (const row of rows) {
    const key = keyFn(row);
    if (!key) continue;
    const values = groups.get(key) || [];
    values.push(row);
    groups.set(key, values);
  }
  return groups;
}

function countBy(rows, keyFn) {
  const counts = {};
  for (const row of rows) {
    const key = keyFn(row);
    counts[key] = (counts[key] || 0) + 1;
  }
  return counts;
}

function strings(values) {
  return [...new Set((Array.isArray(values) ? values : []).map((value) => String(value || "").trim()).filter(Boolean))];
}

function truncate(value, maxLength) {
  const text = String(value || "").replace(/\s+/g, " ").trim();
  if (text.length <= maxLength) return text;
  return `${text.slice(0, maxLength - 3).trim()}...`;
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

function requiredValue(args, index, flag) {
  const value = args[index];
  if (!value) throw new Error(`${flag} requires a value`);
  return value;
}

function positiveInteger(value, flag) {
  const number = Number(value);
  if (!Number.isInteger(number) || number <= 0) throw new Error(`${flag} must be a positive integer`);
  return number;
}

function pad(value) {
  return String(value).padStart(3, "0");
}
