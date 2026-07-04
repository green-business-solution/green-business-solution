import fs from "node:fs";
import path from "node:path";

const repoRoot = path.resolve(import.meta.dirname, "..");
const defaultTestCasesPath = path.join(repoRoot, "public", "sample_matching_test_cases.json");
const defaultPackagesPath = path.join(repoRoot, "data", "opportunity_incentive_calculation_packages_v2.json");
const defaultJsonReportPath = path.join(repoRoot, "data", "computed_but_suppressed_audit_2026-07-03.json");
const defaultMarkdownReportPath = path.join(repoRoot, "data", "computed_but_suppressed_audit_2026-07-03.md");

const options = parseArgs(process.argv.slice(2));
const testCasesPath = path.resolve(options.testCasesPath || defaultTestCasesPath);
const packagesPath = path.resolve(options.packagesPath || defaultPackagesPath);
const jsonReportPath = path.resolve(options.jsonReportPath || defaultJsonReportPath);
const markdownReportPath = path.resolve(options.markdownReportPath || defaultMarkdownReportPath);

const testCasePayload = readJson(testCasesPath);
const packagePayload = readJson(packagesPath);
const packagesById = new Map((packagePayload.packages || []).map((pkg) => [pkg.opportunity_id, pkg]));

const auditRows = collectComputedButSuppressedRows(testCasePayload.testCases || [], packagesById);
const targets = buildUniqueTargets(auditRows.effectRows);
const recommendations = targets.map((target) => ({ ...target, auditRecommendation: classifyTarget(target) }));
const report = buildReport({ auditRows, recommendations });

fs.writeFileSync(jsonReportPath, `${JSON.stringify(report, null, 2)}\n`);
fs.writeFileSync(markdownReportPath, buildMarkdown(report), "utf8");

console.log(`Computed-but-suppressed package evaluations: ${auditRows.packageEvaluationCount}`);
console.log(`Positive suppressed effect evaluations: ${auditRows.effectRows.length}`);
console.log(`Unique positive package/effect targets: ${recommendations.length}`);
console.log(`Recommendation counts: ${JSON.stringify(report.summary.recommendationCounts)}`);
console.log(`Wrote ${path.relative(repoRoot, jsonReportPath)}`);
console.log(`Wrote ${path.relative(repoRoot, markdownReportPath)}`);

function collectComputedButSuppressedRows(testCases, packagesById) {
  const effectRows = [];
  const packageEvaluationKeys = new Set();
  for (const testCase of testCases) {
    for (const retrofit of testCase.retrofits || []) {
      for (const summary of retrofit.savingsPreview?.incentiveCalculationPackageSummaries || []) {
        if (classifyPackageSummary(summary) !== "computed_but_suppressed") continue;
        packageEvaluationKeys.add(`${testCase.sampleUserId}|${retrofit.retrofitTypeId}|${summary.opportunityId}`);
        const pkg = packagesById.get(summary.opportunityId);
        for (const effectSummary of summary.effectSummaries || []) {
          if (Number(effectSummary.amountCents || 0) <= 0) continue;
          const packageEffect = (pkg?.effects || []).find((effect) => effect.effect_id === effectSummary.effectId);
          effectRows.push({
            sampleUserId: testCase.sampleUserId,
            sampleName: testCase.name || testCase.sampleUserId,
            retrofitTypeId: retrofit.retrofitTypeId,
            retrofitDisplayName: retrofit.displayName || retrofit.retrofitTypeId,
            opportunityId: summary.opportunityId,
            programName: summary.programName,
            runtimeInclusionStatus: summary.runtimeInclusionStatus,
            calculationStatus: summary.calculationStatus,
            sourceStatus: summary.sourceStatus,
            packageConfidence: summary.confidence,
            amountCents: Number(effectSummary.amountCents || 0),
            effect: {
              effectId: effectSummary.effectId,
              effectType: effectSummary.effectType,
              calculationMethod: effectSummary.calculationMethod,
              valueModelKind: effectSummary.valueModelKind || packageEffect?.repair_metadata?.value_model_kind || null,
              cashValueClassification:
                effectSummary.cashValueClassification || packageEffect?.repair_metadata?.cash_value_classification || null,
              includedInUserFacingTotalDefault: effectSummary.includedInUserFacingTotalDefault === true,
              humanReviewRequired: effectSummary.humanReviewRequired === true,
              confidenceOverall: packageEffect?.confidence?.overall ?? null,
              confidenceReasonCodes: packageEffect?.confidence?.reason_codes || [],
              humanReviewReasons: packageEffect?.repair_metadata?.human_review_reasons || [],
              label: packageEffect?.label || effectSummary.label || effectSummary.effectId
            },
            defaultedInputs: (summary.defaultedInputs || []).map(compactResolvedInput),
            missingInputs: summary.missingInputs || []
          });
        }
      }
    }
  }
  return {
    packageEvaluationCount: packageEvaluationKeys.size,
    effectRows
  };
}

function buildUniqueTargets(rows) {
  const byTarget = new Map();
  for (const row of rows) {
    const key = `${row.opportunityId}|${row.effect.effectId}`;
    if (!byTarget.has(key)) {
      byTarget.set(key, {
        opportunityId: row.opportunityId,
        programName: row.programName,
        effectId: row.effect.effectId,
        effectType: row.effect.effectType,
        calculationMethod: row.effect.calculationMethod,
        valueModelKind: row.effect.valueModelKind,
        cashValueClassification: row.effect.cashValueClassification,
        includedInUserFacingTotalDefault: row.effect.includedInUserFacingTotalDefault,
        humanReviewRequired: row.effect.humanReviewRequired,
        effectConfidenceOverall: row.effect.confidenceOverall,
        effectConfidenceLabel: confidenceLabel(row.effect.confidenceOverall),
        confidenceReasonCodes: row.effect.confidenceReasonCodes,
        humanReviewReasons: row.effect.humanReviewReasons,
        label: row.effect.label,
        evaluationCount: 0,
        runtimeInclusionStatusCounts: {},
        packageConfidenceCounts: {},
        retrofitTypeIds: new Set(),
        sampleUserIds: new Set(),
        amountCentsMin: Number.POSITIVE_INFINITY,
        amountCentsMax: 0,
        amountCentsTotalAcrossEvaluations: 0,
        defaultedInputKeyCounts: {},
        defaultedInputSourceCounts: {},
        lowConfidenceDefaultedInputCount: 0
      });
    }

    const target = byTarget.get(key);
    target.evaluationCount += 1;
    target.runtimeInclusionStatusCounts[row.runtimeInclusionStatus] =
      (target.runtimeInclusionStatusCounts[row.runtimeInclusionStatus] || 0) + 1;
    target.packageConfidenceCounts[row.packageConfidence] = (target.packageConfidenceCounts[row.packageConfidence] || 0) + 1;
    target.retrofitTypeIds.add(row.retrofitTypeId);
    target.sampleUserIds.add(row.sampleUserId);
    target.amountCentsMin = Math.min(target.amountCentsMin, row.amountCents);
    target.amountCentsMax = Math.max(target.amountCentsMax, row.amountCents);
    target.amountCentsTotalAcrossEvaluations += row.amountCents;

    for (const input of row.defaultedInputs || []) {
      const keyName = input.canonicalInputKey || input.inputKey;
      target.defaultedInputKeyCounts[keyName] = (target.defaultedInputKeyCounts[keyName] || 0) + 1;
      target.defaultedInputSourceCounts[input.source || "unknown"] = (target.defaultedInputSourceCounts[input.source || "unknown"] || 0) + 1;
      if (input.defaultConfidence === "low") target.lowConfidenceDefaultedInputCount += 1;
    }
  }

  return [...byTarget.values()]
    .map((target) => ({
      ...target,
      retrofitTypeIds: [...target.retrofitTypeIds].sort(),
      sampleUserIds: [...target.sampleUserIds].sort(),
      amountCentsMin: finiteOrZero(target.amountCentsMin),
      topDefaultedInputs: topCountsFromObject(target.defaultedInputKeyCounts, 8),
      defaultedInputSourceCounts: sortCounts(target.defaultedInputSourceCounts),
      packageConfidenceCounts: sortCounts(target.packageConfidenceCounts),
      runtimeInclusionStatusCounts: sortCounts(target.runtimeInclusionStatusCounts)
    }))
    .sort((a, b) => recommendationSortKey(a).localeCompare(recommendationSortKey(b)) || b.evaluationCount - a.evaluationCount);
}

function classifyTarget(target) {
  const reasons = [];
  const runtimeStatuses = Object.keys(target.runtimeInclusionStatusCounts || {});
  const hasOnlyDefaultSuppression = runtimeStatuses.length === 1 && runtimeStatuses[0] === "not_user_facing_default";
  const mediumOrHighConfidence = confidenceRank(target.effectConfidenceLabel) >= confidenceRank("medium");
  const cashClass = target.cashValueClassification || "";
  const effectType = target.effectType || "";
  const method = target.calculationMethod || "";
  const deterministicMethod = !["expected_value", "custom_quote", "zero_when_not_applicable"].includes(method);
  const directMonetaryClass = ["rebate", "reimbursement", "cash_grant"].includes(cashClass);
  const directMonetaryEffect = ["one_time_savings", "recurring_savings"].includes(effectType);

  if (target.humanReviewRequired) reasons.push("effect is marked human_review_required");
  if (!mediumOrHighConfidence) reasons.push(`effect confidence is ${target.effectConfidenceLabel}`);
  if (!hasOnlyDefaultSuppression) reasons.push(`runtime statuses include ${runtimeStatuses.join(", ")}`);
  if (!deterministicMethod) reasons.push(`calculation method is ${method}`);
  if (!directMonetaryClass) reasons.push(`cash value classification is ${cashClass || "unknown"}`);
  if (!directMonetaryEffect) reasons.push(`effect type is ${effectType || "unknown"}`);

  if (effectType === "grant_expected_value" || method === "expected_value") {
    return {
      bucket: "keep_suppressed_grant_ev",
      action: "Keep suppressed. This is a competitive/expected-value grant path and should not be promoted without source-backed probability plus conditional award evidence.",
      needsGptPro: false,
      reasons: reasons.length ? reasons : ["expected-value grant should remain gated"]
    };
  }

  if (target.humanReviewRequired || !mediumOrHighConfidence) {
    return {
      bucket: "needs_source_repair_or_review",
      action: "Do not include yet. Use GPT Pro or source review to resolve the human-review or confidence reason, then reconsider default inclusion.",
      needsGptPro: true,
      reasons
    };
  }

  if (cashClass === "process_value" || effectType === "financing_subsidy") {
    return {
      bucket: "needs_product_policy",
      action: "Do not include in upfront grant/rebate totals until the product decides how to value financing/process benefits.",
      needsGptPro: false,
      reasons
    };
  }

  if (cashClass === "tariff_or_rate" || effectType === "recurring_savings") {
    return {
      bucket: "needs_recurring_savings_policy",
      action: "Do not include in upfront totals. Route to recurring savings display after tariff/rate treatment is finalized.",
      needsGptPro: false,
      reasons
    };
  }

  if (hasOnlyDefaultSuppression && deterministicMethod && directMonetaryClass && directMonetaryEffect) {
    return {
      bucket: "ready_for_default_inclusion",
      action:
        "Candidate to set included_in_user_facing_total_default=true for this effect. Amount is already computed and suppression appears to be only the conservative default flag.",
      needsGptPro: false,
      reasons: target.lowConfidenceDefaultedInputCount > 0
        ? ["computed with test-case placeholder/default inputs; real UI must collect or allow override"]
        : ["computed with resolved inputs and no review/confidence blocker"]
    };
  }

  return {
    bucket: "manual_audit_needed",
    action: "Review manually before promotion; this target does not match a safe deterministic-inclusion pattern.",
    needsGptPro: true,
    reasons
  };
}

function buildReport({ auditRows, recommendations }) {
  return {
    schemaVersion: "retrofi_computed_but_suppressed_audit.v1",
    generatedAt: new Date().toISOString(),
    sourceFiles: {
      testCases: path.relative(repoRoot, testCasesPath),
      packages: path.relative(repoRoot, packagesPath)
    },
    summary: {
      computedButSuppressedPackageEvaluationCount: auditRows.packageEvaluationCount,
      positiveSuppressedEffectEvaluationCount: auditRows.effectRows.length,
      uniquePositiveEffectTargetCount: recommendations.length,
      recommendationCounts: countBy(recommendations, (target) => target.auditRecommendation.bucket),
      effectTypeCounts: countBy(recommendations, (target) => target.effectType || "unknown"),
      cashValueClassificationCounts: countBy(recommendations, (target) => target.cashValueClassification || "unknown"),
      calculationMethodCounts: countBy(recommendations, (target) => target.calculationMethod || "unknown"),
      runtimeInclusionStatusCounts: countBy(auditRows.effectRows, (row) => row.runtimeInclusionStatus),
      targetsNeedingGptProCount: recommendations.filter((target) => target.auditRecommendation.needsGptPro).length,
      readyForDefaultInclusionCount: recommendations.filter(
        (target) => target.auditRecommendation.bucket === "ready_for_default_inclusion"
      ).length
    },
    targets: recommendations
  };
}

function buildMarkdown(report) {
  const ready = report.targets.filter((target) => target.auditRecommendation.bucket === "ready_for_default_inclusion");
  const needsRepair = report.targets.filter((target) => target.auditRecommendation.bucket === "needs_source_repair_or_review");
  const policy = report.targets.filter((target) =>
    ["needs_product_policy", "needs_recurring_savings_policy", "keep_suppressed_grant_ev", "manual_audit_needed"].includes(
      target.auditRecommendation.bucket
    )
  );

  const lines = [];
  lines.push("# Computed-But-Suppressed Package Audit");
  lines.push("");
  lines.push(`Generated: ${report.generatedAt}`);
  lines.push("");
  lines.push("## Summary");
  lines.push("");
  lines.push(`- Computed-but-suppressed package evaluations: ${report.summary.computedButSuppressedPackageEvaluationCount}`);
  lines.push(`- Positive suppressed effect evaluations: ${report.summary.positiveSuppressedEffectEvaluationCount}`);
  lines.push(`- Unique positive package/effect targets: ${report.summary.uniquePositiveEffectTargetCount}`);
  lines.push(`- Ready for default inclusion candidates: ${report.summary.readyForDefaultInclusionCount}`);
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
  lines.push("## Effect Type Counts");
  lines.push("");
  lines.push(tableFromCounts(report.summary.effectTypeCounts));
  lines.push("");
  lines.push("## Ready For Default Inclusion");
  lines.push("");
  lines.push(targetTable(ready));
  lines.push("");
  lines.push("## Needs Source Repair Or Review");
  lines.push("");
  lines.push(targetTable(needsRepair));
  lines.push("");
  lines.push("## Policy / Intentional Suppression");
  lines.push("");
  lines.push(targetTable(policy));
  lines.push("");
  lines.push("## Interpretation");
  lines.push("");
  lines.push(
    "- Most computed-but-suppressed rows are repeated evaluations of deterministic rebate/reimbursement package effects that computed a positive amount but still have `included_in_user_facing_total_default=false`."
  );
  lines.push(
    "- `ready_for_default_inclusion` means the audit found no human-review, low-confidence, expected-value, financing, or recurring/tariff blocker. It does not mean user inputs are perfect; many test-case amounts still use synthetic defaults that the real UI must collect or let the user override."
  );
  lines.push(
    "- `needs_source_repair_or_review` is the only bucket that should go to GPT Pro next. Those targets have explicit human-review flags or confidence blockers."
  );
  lines.push(
    "- `needs_product_policy`, `needs_recurring_savings_policy`, and `keep_suppressed_grant_ev` should stay out of upfront totals until the relevant product/calculation path is intentionally designed."
  );
  return `${lines.join("\n")}\n`;
}

function targetTable(targets) {
  if (!targets.length) return "_None._";
  return table(
    ["Program", "Effect", "Cash Class", "Method", "Evaluations", "Amount Range", "Action"],
    targets.map((target) => [
      `${target.programName} (${target.opportunityId})`,
      `${target.effectType} / ${target.valueModelKind || ""}`,
      target.cashValueClassification || "",
      target.calculationMethod || "",
      target.evaluationCount,
      `${formatCents(target.amountCentsMin)}-${formatCents(target.amountCentsMax)}`,
      target.auditRecommendation.action
    ])
  );
}

function classifyPackageSummary(summary) {
  if (summary.runtimeInclusionStatus === "included") return "calculated_and_included";
  if (summary.runtimeInclusionStatus === "legacy_rule_preferred") return "legacy_rule_preferred";
  if (summary.runtimeInclusionStatus === "non_monetary_workflow") return "non_monetary_workflow";
  if (
    [
      "source_inaccessible_repair_failure",
      "unavailable_archived",
      "no_calculable_value",
      "needs_repair_review",
      "custom_quote_estimate"
    ].includes(summary.runtimeInclusionStatus)
  ) {
    return "source_or_package_blocked";
  }

  const hasPositiveAmount = (summary.effectSummaries || []).some((effect) => Number(effect.amountCents || 0) > 0);
  if (["not_user_facing_default", "human_review_required", "low_confidence"].includes(summary.runtimeInclusionStatus)) {
    return hasPositiveAmount ? "computed_but_suppressed" : "suppressed_without_amount";
  }

  if (summary.runtimeInclusionStatus === "missing_inputs" || (summary.missingInputs || []).length > 0) return "missing_evidence_or_inputs";
  if (summary.runtimeInclusionStatus === "no_supported_effect_amount") return "calculated_zero_or_no_supported_amount";
  return "other_suppressed";
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
  return `${target.auditRecommendation?.bucket || ""}|${target.programName || ""}|${target.effectId || ""}`;
}

function confidenceLabel(value) {
  const number = Number(value);
  if (number >= 0.82) return "high";
  if (number >= 0.55) return "medium";
  return "low";
}

function confidenceRank(value) {
  if (value === "high") return 3;
  if (value === "medium") return 2;
  if (value === "low") return 1;
  return 0;
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

function topCountsFromObject(counts, limit) {
  return Object.entries(sortCounts(counts))
    .slice(0, limit)
    .map(([value, count]) => ({ value, count }));
}

function sortCounts(counts = {}) {
  return Object.fromEntries(Object.entries(counts).sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0])));
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

function formatCents(cents) {
  const dollars = Number(cents || 0) / 100;
  return dollars.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: dollars >= 100 ? 0 : 2
  });
}

function finiteOrZero(value) {
  return Number.isFinite(value) ? value : 0;
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
