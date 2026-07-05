import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import { validateIncentiveCalculationPackageV2 } from "../apps/api/server/savings/incentiveCalculationsV2.mjs";

const repoRoot = path.resolve(import.meta.dirname, "..");
const defaultWorkDir = path.join(repoRoot, "GPT Pro Work", "computed-suppressed-source-repair-2026-07-03");
const defaultPackagesPath = path.join(repoRoot, "data", "opportunity_incentive_calculation_packages_v2.json");
const defaultAuditPath = path.join(repoRoot, "data", "computed_but_suppressed_audit_2026-07-03.json");
const defaultRepairArtifactPath = path.join(repoRoot, "data", "computed_suppressed_source_repairs_gpt_pro_2026-07-03.json");
const defaultApplyReportPath = path.join(repoRoot, "data", "computed_suppressed_apply_report_2026-07-03.md");

const options = parseArgs(process.argv.slice(2));
const workDir = path.resolve(options.workDir || defaultWorkDir);
const packagesPath = path.resolve(options.packagesPath || defaultPackagesPath);
const auditPath = path.resolve(options.auditPath || defaultAuditPath);
const repairArtifactPath = path.resolve(options.repairArtifactPath || defaultRepairArtifactPath);
const applyReportPath = path.resolve(options.applyReportPath || defaultApplyReportPath);

const packagesArtifact = readJson(packagesPath);
const audit = readJson(auditPath);
const parsedOutputs = parseOutputFiles(workDir);
const repairArtifact = buildRepairArtifact(parsedOutputs);
const applyResult = applyRepairsAndPromotions({ packagesArtifact, audit, repairs: repairArtifact.repairs });
const validation = validatePackages(packagesArtifact.packages || []);

if (validation.invalidCount > 0) {
  throw new Error(`Computed-suppressed repair generated invalid packages: ${JSON.stringify(validation.invalidSamples, null, 2)}`);
}

packagesArtifact.generatedAt = new Date().toISOString();
packagesArtifact.computedSuppressedRepairAppliedAt = new Date().toISOString();
packagesArtifact.computedSuppressedRepairArtifact = path.relative(repoRoot, repairArtifactPath);
packagesArtifact.computedSuppressedDefaultInclusionPromotionCount = applyResult.defaultInclusionPromotionCount;
packagesArtifact.computedSuppressedSourceRepairApplyCount = applyResult.sourceRepairApplyCount;
packagesArtifact.statusCounts = countBy(packagesArtifact.packages || [], (pkg) => pkg.calculation_status || "unknown");
packagesArtifact.confidenceCounts = countBy(packagesArtifact.packages || [], (pkg) => confidenceLabel(pkg.confidence?.overall));

fs.writeFileSync(repairArtifactPath, `${JSON.stringify(repairArtifact, null, 2)}\n`);
fs.writeFileSync(packagesPath, `${JSON.stringify(packagesArtifact, null, 2)}\n`);
fs.writeFileSync(applyReportPath, buildApplyReport({ repairArtifact, applyResult, validation }), "utf8");

console.log("Applied computed-suppressed repairs.");
console.log(`Outputs parsed: ${parsedOutputs.length}`);
console.log(`Source repairs imported: ${repairArtifact.repairs.length}`);
console.log(`Source repairs applied: ${applyResult.sourceRepairApplyCount}`);
console.log(`Verified source repairs promoted: ${applyResult.verifiedSourceRepairPromotionCount}`);
console.log(`Audit default-inclusion promotions: ${applyResult.defaultInclusionPromotionCount}`);
console.log(`Skipped source repairs: ${applyResult.skippedSourceRepairCount}`);
console.log(`Package validation invalid count: ${validation.invalidCount}`);
console.log(`Repair artifact: ${path.relative(repoRoot, repairArtifactPath)}`);
console.log(`Apply report: ${path.relative(repoRoot, applyReportPath)}`);

function parseOutputFiles(dir) {
  return fs
    .readdirSync(dir)
    .filter((file) => file.startsWith("output_") && file.endsWith(".md"))
    .sort()
    .map((file) => {
      const raw = fs.readFileSync(path.join(dir, file), "utf8");
      const extracted = extractFirstJsonObject(raw);
      return {
        fileName: file,
        object: JSON.parse(extracted.json),
        trailingTextLength: extracted.trailing.length
      };
    });
}

function buildRepairArtifact(parsedOutputs) {
  const repairs = [];
  const validationWarnings = [];
  const promptIds = new Set();

  for (const output of parsedOutputs) {
    const object = output.object;
    if (object.schemaVersion !== "retrofi_computed_suppressed_source_repair.v1") {
      validationWarnings.push(`${output.fileName} has unexpected schemaVersion ${object.schemaVersion}`);
      continue;
    }
    if (output.trailingTextLength > 0) {
      validationWarnings.push(
        `${output.fileName} contained ${output.trailingTextLength} trailing characters after the first JSON object; imported the first JSON object.`
      );
    }
    if (promptIds.has(object.promptId)) validationWarnings.push(`Duplicate promptId ${object.promptId}`);
    promptIds.add(object.promptId);

    for (const repair of object.repairs || []) {
      repairs.push(normalizeRepair(repair, output));
    }
  }

  return {
    schemaVersion: "retrofi_computed_suppressed_source_repairs_gpt_pro.v1",
    generatedAt: new Date().toISOString(),
    sourceWorkDir: path.relative(repoRoot, workDir),
    sourceFiles: parsedOutputs.map((output) => output.fileName),
    repairCount: repairs.length,
    counts: {
      researchStatusCounts: countBy(repairs, (repair) => repair.researchStatus || "unknown"),
      sourceConfidenceCounts: countBy(repairs, (repair) => repair.sourceConfidence || "unknown"),
      estimateConfidenceCounts: countBy(repairs, (repair) => repair.estimateConfidence || "unknown"),
      recommendedDefaultIncludeCount: repairs.filter((repair) => repair.recommendedPatch?.includedInUserFacingTotalDefault === true).length,
      recommendedHumanReviewCount: repairs.filter((repair) => repair.recommendedPatch?.humanReviewRequired === true).length
    },
    validationWarnings,
    repairs
  };
}

function normalizeRepair(repair, output) {
  return {
    ...repair,
    sourceFile: output.fileName,
    sourceUrlsChecked: normalizeUrls(repair.sourceUrlsChecked || []),
    evidenceText: cleanEvidenceText(repair.evidenceText || ""),
    reasoningNotes: String(repair.reasoningNotes || "").trim(),
    verifiedMeasureRows: repair.verifiedMeasureRows || [],
    recommendedPatch: {
      ...(repair.recommendedPatch || {}),
      includedInUserFacingTotalDefault: repair.recommendedPatch?.includedInUserFacingTotalDefault === true,
      humanReviewRequired: repair.recommendedPatch?.humanReviewRequired === true,
      humanReviewReasons: stringArray(repair.recommendedPatch?.humanReviewReasons),
      confidenceReasonCodes: stringArray(repair.recommendedPatch?.confidenceReasonCodes)
    }
  };
}

function applyRepairsAndPromotions({ packagesArtifact, audit, repairs }) {
  const packages = packagesArtifact.packages || [];
  const packageById = new Map(packages.map((pkg) => [pkg.opportunity_id, pkg]));
  const warnings = [];
  const promotedTargets = [];
  const skippedSourceRepairs = [];
  let sourceRepairApplyCount = 0;
  let verifiedSourceRepairPromotionCount = 0;
  let defaultInclusionPromotionCount = 0;

  for (const repair of repairs) {
    const pkg = packageById.get(repair.opportunityId);
    const effect = (pkg?.effects || []).find((item) => item.effect_id === repair.effectId);
    if (!pkg || !effect) {
      warnings.push(`Missing package/effect for source repair ${repair.opportunityId}|${repair.effectId}`);
      skippedSourceRepairs.push({ opportunityId: repair.opportunityId, effectId: repair.effectId, reason: "missing_package_or_effect" });
      continue;
    }

    applySourceRepairMetadata({ pkg, effect, repair });
    sourceRepairApplyCount += 1;

    if (
      repair.researchStatus === "data_verified" &&
      repair.recommendedPatch?.includedInUserFacingTotalDefault === true &&
      repair.recommendedPatch?.humanReviewRequired === false
    ) {
      promoteEffect({
        pkg,
        effect,
        reasonCode: "computed_suppressed_source_repair_verified",
        source: "gpt_pro_computed_suppressed_source_repair"
      });
      verifiedSourceRepairPromotionCount += 1;
      promotedTargets.push({ opportunityId: pkg.opportunity_id, effectId: effect.effect_id, source: "source_repair_verified" });
    } else {
      skippedSourceRepairs.push({
        opportunityId: repair.opportunityId,
        effectId: repair.effectId,
        reason: repair.researchStatus || "not_verified_for_default_inclusion"
      });
    }
  }

  const sourceRepairTargetIds = new Set(repairs.map((repair) => `${repair.opportunityId}|${repair.effectId}`));
  for (const target of audit.targets || []) {
    if (target.auditRecommendation?.bucket !== "ready_for_default_inclusion") continue;
    const targetId = `${target.opportunityId}|${target.effectId}`;
    if (sourceRepairTargetIds.has(targetId)) continue;

    const pkg = packageById.get(target.opportunityId);
    const effect = (pkg?.effects || []).find((item) => item.effect_id === target.effectId);
    if (!pkg || !effect) {
      warnings.push(`Missing package/effect for default-inclusion promotion ${targetId}`);
      continue;
    }
    promoteEffect({
      pkg,
      effect,
      reasonCode: "computed_suppressed_audit_default_inclusion",
      source: "computed_suppressed_audit"
    });
    defaultInclusionPromotionCount += 1;
    promotedTargets.push({ opportunityId: pkg.opportunity_id, effectId: effect.effect_id, source: "audit_ready_for_default_inclusion" });
  }

  return {
    sourceRepairApplyCount,
    verifiedSourceRepairPromotionCount,
    defaultInclusionPromotionCount,
    skippedSourceRepairCount: skippedSourceRepairs.length,
    warnings,
    skippedSourceRepairs,
    promotedTargets
  };
}

function applySourceRepairMetadata({ pkg, effect, repair }) {
  const evidenceId = `computed_suppressed_source_repair_${shortHash(`${repair.opportunityId}|${repair.effectId}`)}`;
  const evidence = {
    evidence_id: evidenceId,
    source_type: "gpt_pro_computed_suppressed_source_repair",
    quote: repair.evidenceText || repair.reasoningNotes || "",
    source_urls: repair.sourceUrlsChecked || [],
    evidence_confidence: confidenceNumber(repair.sourceConfidence)
  };

  pkg.source_evidence = [...(pkg.source_evidence || []).filter((item) => item.evidence_id !== evidenceId), evidence];
  effect.evidence_refs = uniqueStrings([...(effect.evidence_refs || []), evidenceId]);
  effect.repair_metadata = {
    ...(effect.repair_metadata || {}),
    included_in_user_facing_total_default: repair.recommendedPatch?.includedInUserFacingTotalDefault === true,
    human_review_required: repair.recommendedPatch?.humanReviewRequired === true,
    human_review_reasons: repair.recommendedPatch?.humanReviewReasons || [],
    computed_suppressed_source_repair: {
      source_file: repair.sourceFile,
      research_status: repair.researchStatus || null,
      source_confidence: repair.sourceConfidence || null,
      estimate_confidence: repair.estimateConfidence || null,
      evidence_text: repair.evidenceText || "",
      reasoning_notes: repair.reasoningNotes || "",
      source_urls_checked: repair.sourceUrlsChecked || [],
      verified_measure_rows: toSnakeObject(repair.verifiedMeasureRows || []),
      recommended_patch: toSnakeObject(repair.recommendedPatch || {})
    }
  };

  effect.confidence = {
    ...(effect.confidence || {}),
    extraction: confidenceNumber(repair.sourceConfidence),
    calculation: confidenceNumber(repair.estimateConfidence),
    overall: Math.min(confidenceNumber(repair.sourceConfidence), confidenceNumber(repair.estimateConfidence)),
    reason_codes: uniqueStrings([
      ...(effect.confidence?.reason_codes || []),
      "computed_suppressed_source_repair_applied",
      `research_status_${repair.researchStatus || "unknown"}`,
      `source_confidence_${repair.sourceConfidence || "unknown"}`,
      `estimate_confidence_${repair.estimateConfidence || "unknown"}`,
      ...(repair.recommendedPatch?.confidenceReasonCodes || [])
    ])
  };

  pkg.migration_metadata = {
    ...(pkg.migration_metadata || {}),
    computed_suppressed_source_repair_applied_at: new Date().toISOString(),
    computed_suppressed_source_repair_artifact: path.relative(repoRoot, repairArtifactPath)
  };
}

function promoteEffect({ pkg, effect, reasonCode, source }) {
  effect.repair_metadata = {
    ...(effect.repair_metadata || {}),
    included_in_user_facing_total_default: true,
    human_review_required: false,
    human_review_reasons: []
  };
  effect.confidence = {
    ...(effect.confidence || {}),
    reason_codes: uniqueStrings([...(effect.confidence?.reason_codes || []), reasonCode])
  };
  pkg.migration_metadata = {
    ...(pkg.migration_metadata || {}),
    computed_suppressed_default_inclusion_applied_at: new Date().toISOString(),
    computed_suppressed_default_inclusion_source: source
  };
}

function validatePackages(packages) {
  const invalidSamples = [];
  let invalidCount = 0;
  for (const pkg of packages) {
    const validation = validateIncentiveCalculationPackageV2(pkg);
    if (!validation.valid) {
      invalidCount += 1;
      if (invalidSamples.length < 10) {
        invalidSamples.push({ opportunityId: pkg.opportunity_id, errors: validation.errors });
      }
    }
  }
  return { packageCount: packages.length, invalidCount, invalidSamples };
}

function buildApplyReport({ repairArtifact, applyResult, validation }) {
  const lines = [];
  lines.push("# Computed-Suppressed Repair Apply Report");
  lines.push("");
  lines.push(`Generated: ${new Date().toISOString()}`);
  lines.push("");
  lines.push("## Summary");
  lines.push("");
  lines.push(`- Source repairs imported: ${repairArtifact.repairs.length}`);
  lines.push(`- Source repairs applied: ${applyResult.sourceRepairApplyCount}`);
  lines.push(`- Verified source repairs promoted: ${applyResult.verifiedSourceRepairPromotionCount}`);
  lines.push(`- Audit default-inclusion promotions: ${applyResult.defaultInclusionPromotionCount}`);
  lines.push(`- Skipped source repairs: ${applyResult.skippedSourceRepairCount}`);
  lines.push(`- Invalid packages after apply: ${validation.invalidCount}`);
  lines.push("");
  lines.push("## Research Status Counts");
  lines.push("");
  lines.push(tableFromCounts(repairArtifact.counts.researchStatusCounts));
  lines.push("");
  if (repairArtifact.validationWarnings.length || applyResult.warnings.length) {
    lines.push("## Warnings");
    lines.push("");
    for (const warning of [...repairArtifact.validationWarnings, ...applyResult.warnings]) lines.push(`- ${warning}`);
    lines.push("");
  }
  lines.push("## Skipped Source Repairs");
  lines.push("");
  lines.push(
    applyResult.skippedSourceRepairs.length
      ? table(
          ["Opportunity", "Effect", "Reason"],
          applyResult.skippedSourceRepairs.map((row) => [row.opportunityId, row.effectId, row.reason])
        )
      : "_None._"
  );
  lines.push("");
  lines.push("## Promoted Targets");
  lines.push("");
  lines.push(
    applyResult.promotedTargets.length
      ? table(
          ["Opportunity", "Effect", "Source"],
          applyResult.promotedTargets.map((row) => [row.opportunityId, row.effectId, row.source])
        )
      : "_None._"
  );
  return `${lines.join("\n")}\n`;
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

function parseArgs(args) {
  const parsed = {};
  for (let index = 0; index < args.length; index += 1) {
    const arg = args[index];
    if (!arg.startsWith("--")) continue;
    const key = arg.slice(2);
    const next = args[index + 1];
    if (!next || next.startsWith("--")) parsed[key] = true;
    else {
      parsed[key] = next;
      index += 1;
    }
  }
  return parsed;
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
  return String(value || "")
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
    .replace(/\s+/g, " ")
    .trim();
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

function stringArray(values) {
  return (Array.isArray(values) ? values : [values]).map((value) => String(value || "").trim()).filter(Boolean);
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
