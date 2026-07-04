import fs from "node:fs";
import path from "node:path";

const repoRoot = path.resolve(import.meta.dirname, "..");
const defaultTestCasesPath = path.join(repoRoot, "public", "sample_matching_test_cases.json");
const defaultPackagesPath = path.join(repoRoot, "data", "opportunity_incentive_calculation_packages_v2.json");
const defaultJsonReportPath = path.join(repoRoot, "data", "blocked_suppressed_package_audit_2026-07-04.json");
const defaultMarkdownReportPath = path.join(repoRoot, "data", "blocked_suppressed_package_audit_2026-07-04.md");

const BLOCKED_RUNTIME_STATUSES = new Set([
  "source_inaccessible_repair_failure",
  "unavailable_archived",
  "no_calculable_value",
  "needs_repair_review",
  "custom_quote_estimate"
]);

const SUPPRESSED_WITHOUT_AMOUNT_STATUSES = new Set(["not_user_facing_default", "human_review_required", "low_confidence"]);
const TAX_EFFECT_TYPES = new Set(["tax_credit", "tax_exemption", "tax_abatement", "tax_rate_preference", "property_tax_valuation"]);
const DIRECT_MONETARY_CLASSES = new Set(["rebate", "reimbursement", "cash_grant", "tax_credit", "tax_exemption", "tax_abatement"]);
const PROCESS_OR_POLICY_CLASSES = new Set(["process_value", "tariff_or_rate", "technical_assistance", "financing", "loan", "non_cash"]);

const options = parseArgs(process.argv.slice(2));
const testCasesPath = path.resolve(options.testCasesPath || defaultTestCasesPath);
const packagesPath = path.resolve(options.packagesPath || defaultPackagesPath);
const jsonReportPath = path.resolve(options.jsonReportPath || defaultJsonReportPath);
const markdownReportPath = path.resolve(options.markdownReportPath || defaultMarkdownReportPath);

const testCasePayload = readJson(testCasesPath);
const packagePayload = readJson(packagesPath);
const packagesById = new Map((packagePayload.packages || []).map((pkg) => [pkg.opportunity_id, pkg]));

const evaluationRows = collectEvaluationRows(testCasePayload.testCases || [], packagesById);
const targetRows = buildUniqueTargets(evaluationRows);
const auditedTargets = targetRows.map((target) => ({ ...target, auditRecommendation: classifyTarget(target) }));
const report = buildReport({ evaluationRows, targets: auditedTargets });

fs.writeFileSync(jsonReportPath, `${JSON.stringify(report, null, 2)}\n`);
fs.writeFileSync(markdownReportPath, buildMarkdown(report), "utf8");

console.log(`Blocked/suppressed evaluations: ${evaluationRows.length}`);
console.log(`Unique package targets: ${auditedTargets.length}`);
console.log(`Recommendation counts: ${JSON.stringify(report.summary.recommendationCounts)}`);
console.log(`Targets needing GPT Pro: ${report.summary.targetsNeedingGptProCount}`);
console.log(`Wrote ${path.relative(repoRoot, jsonReportPath)}`);
console.log(`Wrote ${path.relative(repoRoot, markdownReportPath)}`);

function collectEvaluationRows(testCases, packagesById) {
  const rows = [];
  for (const testCase of testCases) {
    for (const retrofit of testCase.retrofits || []) {
      for (const summary of retrofit.savingsPreview?.incentiveCalculationPackageSummaries || []) {
        const outcomeClass = classifyPackageSummary(summary);
        if (outcomeClass !== "source_or_package_blocked" && outcomeClass !== "suppressed_without_amount") continue;
        const pkg = packagesById.get(summary.opportunityId);
        rows.push({
          outcomeClass,
          sampleUserId: testCase.sampleUserId,
          sampleName: testCase.name || testCase.sampleUserId,
          retrofitTypeId: retrofit.retrofitTypeId,
          retrofitDisplayName: retrofit.displayName || retrofit.retrofitTypeId,
          opportunityId: summary.opportunityId,
          programName: summary.programName || pkg?.program_name || summary.opportunityId,
          runtimeInclusionStatus: summary.runtimeInclusionStatus,
          calculationStatus: summary.calculationStatus || pkg?.calculation_status || null,
          sourceStatus: summary.sourceStatus || pkg?.availability?.source_access_status || null,
          packageConfidence: summary.confidence || confidenceLabel(pkg?.confidence?.overall),
          missingInputs: summary.missingInputs || [],
          defaultedInputs: (summary.defaultedInputs || []).map(compactResolvedInput),
          computedAmountCents: sum(summary.effectSummaries || [], (effect) => Number(effect.amountCents || 0)),
          hasPositiveComputedAmount: (summary.effectSummaries || []).some((effect) => Number(effect.amountCents || 0) > 0),
          effectSummaries: (summary.effectSummaries || []).map((effectSummary) => {
            const effect = (pkg?.effects || []).find((item) => item.effect_id === effectSummary.effectId);
            return {
              effectId: effectSummary.effectId,
              effectType: effectSummary.effectType || effect?.effect_type || null,
              calculationMethod: effectSummary.calculationMethod || effect?.calculation?.method || null,
              valueModelKind: effectSummary.valueModelKind || effect?.repair_metadata?.value_model_kind || null,
              cashValueClassification: effectSummary.cashValueClassification || effect?.repair_metadata?.cash_value_classification || null,
              amountCents: Number(effectSummary.amountCents || 0),
              includedInUserFacingTotalDefault: effectSummary.includedInUserFacingTotalDefault === true,
              runtimeEligibleForTotals: effectSummary.runtimeEligibleForTotals === true,
              humanReviewRequired: effectSummary.humanReviewRequired === true,
              missingInputs: effectSummary.missingInputs || [],
              confidenceOverall: effect?.confidence?.overall ?? null,
              confidenceReasonCodes: effect?.confidence?.reason_codes || [],
              humanReviewReasons: effect?.repair_metadata?.human_review_reasons || [],
              sourceRepairStatus:
                effect?.repair_metadata?.computed_suppressed_source_repair?.research_status ||
                effect?.repair_metadata?.tax_package_repair?.recommended_estimate_status ||
                null,
              label: effect?.label || effectSummary.label || effectSummary.effectId
            };
          }),
          packageMetadata: summarizePackage(pkg)
        });
      }
    }
  }
  return rows;
}

function buildUniqueTargets(rows) {
  const byTarget = new Map();
  for (const row of rows) {
    if (!byTarget.has(row.opportunityId)) {
      byTarget.set(row.opportunityId, {
        opportunityId: row.opportunityId,
        programName: row.programName,
        evaluationCount: 0,
        outcomeClassCounts: {},
        runtimeInclusionStatusCounts: {},
        calculationStatusCounts: {},
        sourceStatusCounts: {},
        packageConfidenceCounts: {},
        retrofitTypeIds: new Set(),
        sampleUserIds: new Set(),
        effectIds: new Set(),
        effectTypes: new Set(),
        calculationMethods: new Set(),
        valueModelKinds: new Set(),
        cashValueClassifications: new Set(),
        totalComputedAmountCentsAcrossEvaluations: 0,
        hasPositiveComputedAmount: false,
        missingInputKeyCounts: {},
        defaultedInputKeyCounts: {},
        topHumanReviewReasons: {},
        topConfidenceReasonCodes: {},
        sourceRepairStatuses: new Set(),
        packageMetadata: row.packageMetadata,
        exampleRows: []
      });
    }

    const target = byTarget.get(row.opportunityId);
    target.evaluationCount += 1;
    target.totalComputedAmountCentsAcrossEvaluations += row.computedAmountCents;
    target.hasPositiveComputedAmount = target.hasPositiveComputedAmount || row.hasPositiveComputedAmount;
    increment(target.outcomeClassCounts, row.outcomeClass);
    increment(target.runtimeInclusionStatusCounts, row.runtimeInclusionStatus);
    increment(target.calculationStatusCounts, row.calculationStatus || "unknown");
    increment(target.sourceStatusCounts, row.sourceStatus || "unknown");
    increment(target.packageConfidenceCounts, row.packageConfidence || "unknown");
    target.retrofitTypeIds.add(row.retrofitTypeId);
    target.sampleUserIds.add(row.sampleUserId);

    for (const input of row.missingInputs || []) increment(target.missingInputKeyCounts, input.inputKey || input.input_key || "unknown");
    for (const input of row.defaultedInputs || []) increment(target.defaultedInputKeyCounts, input.canonicalInputKey || input.inputKey || "unknown");

    for (const effect of row.effectSummaries || []) {
      target.effectIds.add(effect.effectId);
      target.effectTypes.add(effect.effectType || "unknown");
      target.calculationMethods.add(effect.calculationMethod || "unknown");
      target.valueModelKinds.add(effect.valueModelKind || "unknown");
      target.cashValueClassifications.add(effect.cashValueClassification || "unknown");
      if (effect.sourceRepairStatus) target.sourceRepairStatuses.add(effect.sourceRepairStatus);
      for (const reason of effect.humanReviewReasons || []) increment(target.topHumanReviewReasons, reason);
      for (const reason of effect.confidenceReasonCodes || []) increment(target.topConfidenceReasonCodes, reason);
    }

    if (target.exampleRows.length < 3) {
      target.exampleRows.push({
        sampleUserId: row.sampleUserId,
        retrofitTypeId: row.retrofitTypeId,
        runtimeInclusionStatus: row.runtimeInclusionStatus,
        outcomeClass: row.outcomeClass,
        computedAmountCents: row.computedAmountCents
      });
    }
  }

  return [...byTarget.values()]
    .map((target) => ({
      ...target,
      outcomeClassCounts: sortCounts(target.outcomeClassCounts),
      runtimeInclusionStatusCounts: sortCounts(target.runtimeInclusionStatusCounts),
      calculationStatusCounts: sortCounts(target.calculationStatusCounts),
      sourceStatusCounts: sortCounts(target.sourceStatusCounts),
      packageConfidenceCounts: sortCounts(target.packageConfidenceCounts),
      retrofitTypeIds: [...target.retrofitTypeIds].sort(),
      sampleUserIds: [...target.sampleUserIds].sort(),
      effectIds: [...target.effectIds].sort(),
      effectTypes: [...target.effectTypes].sort(),
      calculationMethods: [...target.calculationMethods].sort(),
      valueModelKinds: [...target.valueModelKinds].sort(),
      cashValueClassifications: [...target.cashValueClassifications].sort(),
      sourceRepairStatuses: [...target.sourceRepairStatuses].sort(),
      topMissingInputs: topCountsFromObject(target.missingInputKeyCounts, 8),
      topDefaultedInputs: topCountsFromObject(target.defaultedInputKeyCounts, 8),
      topHumanReviewReasons: topCountsFromObject(target.topHumanReviewReasons, 8),
      topConfidenceReasonCodes: topCountsFromObject(target.topConfidenceReasonCodes, 8)
    }))
    .sort((a, b) => recommendationSortKey(a).localeCompare(recommendationSortKey(b)) || b.evaluationCount - a.evaluationCount);
}

function classifyTarget(target) {
  const runtimeStatuses = new Set(Object.keys(target.runtimeInclusionStatusCounts || {}));
  const calculationStatuses = new Set(Object.keys(target.calculationStatusCounts || {}));
  const cashClasses = new Set(target.cashValueClassifications || []);
  const effectTypes = new Set(target.effectTypes || []);
  const methods = new Set(target.calculationMethods || []);
  const sourceRepairStatuses = new Set(target.sourceRepairStatuses || []);
  const reasons = [];

  if (runtimeStatuses.has("source_inaccessible_repair_failure") || calculationStatuses.has("source_inaccessible_repair_failure")) {
    return {
      bucket: "archive_or_exclude_source_inaccessible",
      priority: "high",
      needsGptPro: false,
      action:
        "Archive or exclude from product-visible estimates unless a new accessible official source appears. This matches the current policy for repeated source-inaccessible repair failures.",
      reasons: ["runtime or package status is source_inaccessible_repair_failure"]
    };
  }

  if (runtimeStatuses.has("custom_quote_estimate") || calculationStatuses.has("custom_quote_estimate") || methods.has("custom_quote")) {
    return {
      bucket: "needs_quote_or_custom_calculation_workflow",
      priority: "medium",
      needsGptPro: false,
      action:
        "Keep suppressed until the user/quote workflow can collect custom project data. Do not send to GPT Pro unless the source formula itself is unclear.",
      reasons: ["package is custom quote or custom calculation"]
    };
  }

  if (methods.has("expected_value") || effectTypes.has("grant_expected_value")) {
    return {
      bucket: "keep_suppressed_ev_or_probability_gap",
      priority: "medium",
      needsGptPro: false,
      action:
        "Keep suppressed unless a conditional award and probability model become source-backed. Competitive expected-value grants should not be included just because they matched.",
      reasons: ["expected-value or competitive grant path is not user-facing by default"]
    };
  }

  if (hasAny(TAX_EFFECT_TYPES, effectTypes)) {
    return {
      bucket: "keep_review_gated_tax_workflow",
      priority: "medium",
      needsGptPro: false,
      action:
        "Keep suppressed until tax/accountant/assessor inputs are confirmed. This is a tax workflow/input problem, not a GPT Pro source-repair blocker.",
      reasons: target.topHumanReviewReasons.length
        ? target.topHumanReviewReasons.map((item) => `${item.value} (${item.count})`)
        : ["tax effect requires review/input confirmation"]
    };
  }

  if (cashClasses.has("tariff_or_rate") || effectTypes.has("recurring_savings")) {
    return {
      bucket: "needs_recurring_or_tariff_workflow",
      priority: "medium",
      needsGptPro: false,
      action:
        "Keep suppressed until recurring savings and tariff/rate product treatment is designed. Do not include in upfront totals.",
      reasons: ["tariff/rate or recurring savings workflow"]
    };
  }

  if (runtimeStatuses.has("no_calculable_value") || calculationStatuses.has("no_calculable_value")) {
    if (hasAny(PROCESS_OR_POLICY_CLASSES, cashClasses) || effectTypes.has("process_value") || effectTypes.has("no_cash_value")) {
      return {
        bucket: "intentional_non_cash_or_process_workflow",
        priority: "low",
        needsGptPro: false,
        action:
          "Keep as a non-cash/process workflow. It can be modeled later as application, interconnection, permit, technical-assistance, or no-retrofit-needed workflow value.",
        reasons: ["package has no calculable cash value and is process/non-cash classified"]
      };
    }
    return {
      bucket: "review_no_calculable_value_policy",
      priority: "medium",
      needsGptPro: false,
      action:
        "Keep suppressed for now. Review whether the opportunity should be archived, retained as informational/non-cash, or converted into a workflow package.",
      reasons: ["runtime or package status is no_calculable_value"]
    };
  }

  if (runtimeStatuses.has("needs_repair_review") || calculationStatuses.has("needs_repair_review")) {
    return {
      bucket: "needs_package_repair_review",
      priority: "high",
      needsGptPro: true,
      action: "Use GPT Pro/source review to decide whether to recode, archive, or suppress the package.",
      reasons: ["package status is needs_repair_review"]
    };
  }

  if (runtimeStatuses.has("unavailable_archived") || calculationStatuses.has("unavailable_archived")) {
    return {
      bucket: "already_archived_or_unavailable",
      priority: "low",
      needsGptPro: false,
      action: "No immediate repair. Keep hidden unless collection finds a current replacement program.",
      reasons: ["package is unavailable_archived"]
    };
  }

  if (sourceRepairStatuses.has("keep_human_review") || sourceRepairStatuses.has("needs_property_tax_profile")) {
    return {
      bucket: "keep_review_gated_source_or_tax",
      priority: "medium",
      needsGptPro: false,
      action: "Keep suppressed; prior repair already identified source/tax review gating rather than a missing prompt batch.",
      reasons: [`source/tax repair status: ${[...sourceRepairStatuses].join(", ")}`]
    };
  }

  if (runtimeStatuses.has("human_review_required")) {
    if (hasReasonMatching(target, /fund|portal|approval|approved|document|assessor|accountant|tax/i)) {
      return {
        bucket: "needs_runtime_verification_or_document_upload",
        priority: "medium",
        needsGptPro: false,
        action:
          "Keep suppressed until runtime funding/status, approval documents, or user/accountant/assessor documents are available.",
        reasons: target.topHumanReviewReasons.length
          ? target.topHumanReviewReasons.map((item) => `${item.value} (${item.count})`)
          : ["human review required for runtime/document confirmation"]
      };
    }
    return {
      bucket: "needs_human_review_reason_audit",
      priority: "high",
      needsGptPro: true,
      action: "Audit human-review reasons. If the blocker is stale source wording, send a targeted GPT Pro source-repair prompt; otherwise keep gated.",
      reasons: target.topHumanReviewReasons.length
        ? target.topHumanReviewReasons.map((item) => `${item.value} (${item.count})`)
        : ["human_review_required with no computed positive amount"]
    };
  }

  if (runtimeStatuses.has("low_confidence") || hasLowConfidence(target)) {
    return {
      bucket: "needs_confidence_repair_or_archive_decision",
      priority: "high",
      needsGptPro: true,
      action:
        "Use GPT Pro/source review if this is a valuable package; otherwise archive/exclude. Low confidence currently prevents user-facing estimates.",
      reasons: target.topConfidenceReasonCodes.length
        ? target.topConfidenceReasonCodes.map((item) => `${item.value} (${item.count})`)
        : ["low confidence"]
    };
  }

  if (runtimeStatuses.has("not_user_facing_default")) {
    if (hasAny(DIRECT_MONETARY_CLASSES, cashClasses)) {
      reasons.push("direct monetary class exists but no positive amount computed");
      if (methods.has("expected_value") || effectTypes.has("grant_expected_value")) {
        return {
          bucket: "keep_suppressed_ev_or_probability_gap",
          priority: "medium",
          needsGptPro: false,
          action: "Keep suppressed unless a conditional award and probability model become source-backed.",
          reasons
        };
      }
      return {
        bucket: "needs_formula_or_input_resolution_audit",
        priority: "high",
        needsGptPro: false,
        action:
          "Audit runtime inputs and formula rows. This may be a code/input-default issue rather than a source-research issue because the package is direct monetary but computes zero.",
        reasons
      };
    }
    return {
      bucket: "intentional_default_suppression_policy",
      priority: "low",
      needsGptPro: false,
      action: "Keep suppressed under current policy until the relevant non-upfront/product workflow is designed.",
      reasons: ["not_user_facing_default without direct monetary positive amount"]
    };
  }

  return {
    bucket: "manual_audit_needed",
    priority: "medium",
    needsGptPro: true,
    action: "Review manually; target did not match an automatic audit bucket.",
    reasons
  };
}

function buildReport({ evaluationRows, targets }) {
  return {
    schemaVersion: "retrofi_blocked_suppressed_package_audit.v1",
    generatedAt: new Date().toISOString(),
    sourceFiles: {
      testCases: path.relative(repoRoot, testCasesPath),
      packages: path.relative(repoRoot, packagesPath)
    },
    summary: {
      blockedOrSuppressedEvaluationCount: evaluationRows.length,
      uniquePackageTargetCount: targets.length,
      outcomeClassCounts: countBy(evaluationRows, (row) => row.outcomeClass),
      runtimeInclusionStatusCounts: countBy(evaluationRows, (row) => row.runtimeInclusionStatus),
      calculationStatusCounts: countBy(evaluationRows, (row) => row.calculationStatus || "unknown"),
      recommendationCounts: countBy(targets, (target) => target.auditRecommendation.bucket),
      targetsNeedingGptProCount: targets.filter((target) => target.auditRecommendation.needsGptPro).length,
      highPriorityTargetCount: targets.filter((target) => target.auditRecommendation.priority === "high").length
    },
    targets
  };
}

function buildMarkdown(report) {
  const groups = groupBy(report.targets, (target) => target.auditRecommendation.bucket);
  const orderedBuckets = [
    "needs_confidence_repair_or_archive_decision",
    "needs_human_review_reason_audit",
    "needs_package_repair_review",
    "needs_formula_or_input_resolution_audit",
    "archive_or_exclude_source_inaccessible",
    "needs_quote_or_custom_calculation_workflow",
    "needs_runtime_verification_or_document_upload",
    "review_no_calculable_value_policy",
    "intentional_non_cash_or_process_workflow",
    "intentional_default_suppression_policy",
    "needs_recurring_or_tariff_workflow",
    "keep_review_gated_tax_workflow",
    "keep_review_gated_source_or_tax",
    "keep_suppressed_ev_or_probability_gap",
    "already_archived_or_unavailable",
    "manual_audit_needed"
  ];

  const lines = [];
  lines.push("# Blocked And Suppressed Package Audit");
  lines.push("");
  lines.push(`Generated: ${report.generatedAt}`);
  lines.push("");
  lines.push("## Summary");
  lines.push("");
  lines.push(`- Blocked/suppressed package evaluations: ${report.summary.blockedOrSuppressedEvaluationCount}`);
  lines.push(`- Unique package targets: ${report.summary.uniquePackageTargetCount}`);
  lines.push(`- High-priority targets: ${report.summary.highPriorityTargetCount}`);
  lines.push(`- Targets needing GPT Pro/source repair: ${report.summary.targetsNeedingGptProCount}`);
  lines.push("");
  lines.push("## Recommendation Counts");
  lines.push("");
  lines.push(tableFromCounts(report.summary.recommendationCounts));
  lines.push("");
  lines.push("## Runtime Status Counts");
  lines.push("");
  lines.push(tableFromCounts(report.summary.runtimeInclusionStatusCounts));
  lines.push("");
  lines.push("## Outcome Class Counts");
  lines.push("");
  lines.push(tableFromCounts(report.summary.outcomeClassCounts));
  lines.push("");

  for (const bucket of orderedBuckets) {
    const targets = groups[bucket] || [];
    if (!targets.length) continue;
    lines.push(`## ${titleCase(bucket)}`);
    lines.push("");
    lines.push(targetTable(targets));
    lines.push("");
  }

  lines.push("## Interpretation");
  lines.push("");
  lines.push(
    "- This report groups repeated test-case evaluations into unique opportunity/package targets. Counts here should drive repair batching, not the raw repeated evaluation count."
  );
  lines.push(
    "- `archive_or_exclude_source_inaccessible` targets do not need another GPT Pro pass under the current product policy unless a new official source appears."
  );
  lines.push(
    "- Buckets marked as needing GPT Pro/source repair are the only candidates for targeted GPT Pro repair prompts. Expected-value grants, tax workflows, quote workflows, and tariff/rate workflows are intentionally not treated as GPT Pro blockers here."
  );
  lines.push(
    "- `needs_formula_or_input_resolution_audit` should be checked in code/data first because the package is monetary but computed no amount."
  );
  lines.push(
    "- Custom quote, tariff/rate, process-value, and non-cash buckets should stay suppressed until the corresponding product workflow exists."
  );
  return `${lines.join("\n")}\n`;
}

function targetTable(targets) {
  if (!targets.length) return "_None._";
  return table(
    ["Program", "Evaluations", "Statuses", "Effects", "Cash Classes", "Samples", "Action"],
    targets.map((target) => [
      `${target.programName} (${target.opportunityId})`,
      target.evaluationCount,
      compactCounts(target.runtimeInclusionStatusCounts),
      target.effectTypes.join(", "),
      target.cashValueClassifications.join(", "),
      target.sampleUserIds.slice(0, 3).join(", "),
      target.auditRecommendation.action
    ])
  );
}

function classifyPackageSummary(summary) {
  if (summary.runtimeInclusionStatus === "included") return "calculated_and_included";
  if (summary.runtimeInclusionStatus === "legacy_rule_preferred") return "legacy_rule_preferred";
  if (summary.runtimeInclusionStatus === "non_monetary_workflow") return "non_monetary_workflow";
  if (BLOCKED_RUNTIME_STATUSES.has(summary.runtimeInclusionStatus)) return "source_or_package_blocked";

  const hasPositiveAmount = (summary.effectSummaries || []).some((effect) => Number(effect.amountCents || 0) > 0);
  if (SUPPRESSED_WITHOUT_AMOUNT_STATUSES.has(summary.runtimeInclusionStatus)) {
    return hasPositiveAmount ? "computed_but_suppressed" : "suppressed_without_amount";
  }
  if (summary.runtimeInclusionStatus === "missing_inputs" || (summary.missingInputs || []).length > 0) return "missing_evidence_or_inputs";
  if (summary.runtimeInclusionStatus === "no_supported_effect_amount") return "calculated_zero_or_no_supported_amount";
  return "other_suppressed";
}

function summarizePackage(pkg) {
  if (!pkg) return null;
  return {
    calculationStatus: pkg.calculation_status || null,
    sourceAccessStatus: pkg.availability?.source_access_status || null,
    confidenceOverall: pkg.confidence?.overall ?? null,
    confidenceLabel: confidenceLabel(pkg.confidence?.overall),
    statusRepairSource: pkg.migration_metadata?.source || null,
    retrofitTypes: pkg.retrofit_types || [],
    sourceEvidenceTypes: [...new Set((pkg.source_evidence || []).map((evidence) => evidence.source_type).filter(Boolean))]
  };
}

function compactResolvedInput(input) {
  return {
    inputKey: input.inputKey || input.input_key || null,
    canonicalInputKey: input.canonicalInputKey || input.canonical_input_key || null,
    source: input.source || null,
    defaultIsPlaceholder: input.defaultIsPlaceholder === true,
    defaultConfidence: input.defaultConfidence || null,
    userOverrideAllowed: input.userOverrideAllowed === true
  };
}

function recommendationSortKey(target) {
  return `${target.auditRecommendation?.priority || ""}|${target.auditRecommendation?.bucket || ""}|${target.programName || ""}`;
}

function hasAny(needles, haystack) {
  for (const value of haystack) if (needles.has(value)) return true;
  return false;
}

function hasLowConfidence(target) {
  if (target.packageMetadata?.confidenceLabel === "low") return true;
  return Object.keys(target.packageConfidenceCounts || {}).includes("low");
}

function hasReasonMatching(target, pattern) {
  return (
    (target.topHumanReviewReasons || []).some((item) => pattern.test(String(item.value || ""))) ||
    (target.topConfidenceReasonCodes || []).some((item) => pattern.test(String(item.value || "")))
  );
}

function countBy(rows, keyFn) {
  return sortCounts(
    rows.reduce((counts, row) => {
      const key = keyFn(row) || "unknown";
      counts[key] = (counts[key] || 0) + 1;
      return counts;
    }, {})
  );
}

function groupBy(rows, keyFn) {
  return rows.reduce((groups, row) => {
    const key = keyFn(row) || "unknown";
    groups[key] ||= [];
    groups[key].push(row);
    return groups;
  }, {});
}

function topCountsFromObject(counts, limit) {
  return Object.entries(sortCounts(counts))
    .slice(0, limit)
    .map(([value, count]) => ({ value, count }));
}

function sortCounts(counts = {}) {
  return Object.fromEntries(Object.entries(counts).sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0])));
}

function increment(counts, key) {
  counts[key || "unknown"] = (counts[key || "unknown"] || 0) + 1;
}

function sum(rows, valueFn) {
  return rows.reduce((total, row) => total + valueFn(row), 0);
}

function tableFromCounts(counts) {
  return table(
    ["Key", "Count"],
    Object.entries(counts || {}).map(([key, count]) => [key, count])
  );
}

function table(headers, rows) {
  if (!rows.length) return "_None._";
  return [
    `| ${headers.join(" | ")} |`,
    `| ${headers.map(() => "---").join(" | ")} |`,
    ...rows.map((row) => `| ${row.map((value) => String(value ?? "").replace(/\|/g, "\\|")).join(" | ")} |`)
  ].join("\n");
}

function compactCounts(counts) {
  return Object.entries(counts || {})
    .map(([key, count]) => `${key}: ${count}`)
    .join("; ");
}

function titleCase(value) {
  return String(value)
    .split("_")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

function confidenceLabel(value) {
  const number = Number(value);
  if (number >= 0.82) return "high";
  if (number >= 0.55) return "medium";
  return "low";
}

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

function readJson(filePath) {
  return JSON.parse(fs.readFileSync(filePath, "utf8"));
}
