import fs from "node:fs";
import path from "node:path";

const repoRoot = path.resolve(import.meta.dirname, "..");
const defaultManifestPath = path.join(repoRoot, "data", "opportunity_data_repair_batches.json");
const defaultRetrofitIndexPath = path.join(repoRoot, "public", "retrofit_opportunity_index.json");
const defaultJsonOutputPath = path.join(repoRoot, "data", "opportunity_low_source_confidence_queue.json");
const defaultReportPath = path.join(repoRoot, "data", "opportunity_low_source_confidence_queue.md");

const options = parseArgs(process.argv.slice(2));
const generatedAt = new Date().toISOString();
const manifest = readJson(options.manifestPath);
const retrofitIndex = readJson(options.retrofitIndexPath);
const opportunityContextById = buildOpportunityContext(retrofitIndex);
const repairLoad = loadLatestRepairs(manifest, options.manifestPath);
const queue = repairLoad.latestRepairs
  .filter((row) => row.sourceConfidence === "low" && isLowSourceConfidenceFollowUpCandidate(row))
  .map((row) => buildQueueRow(row, opportunityContextById.get(row.opportunityId)))
  .sort(compareQueueRows);

const artifact = {
  schemaVersion: "opportunity_low_source_confidence_queue.v1",
  generatedAt,
  sourceConfidenceDefinition:
    "The historical GPT Pro repair confidence field is interpreted as source_confidence, not deterministic match_confidence.",
  selection: {
    manifestPath: path.relative(repoRoot, options.manifestPath),
    retrofitIndexPath: path.relative(repoRoot, options.retrofitIndexPath),
    sourceConfidence: "low",
    excludedAvailabilityStatuses: ["unavailable", "expired"],
    duplicatePolicy: "later repair manifest entries overwrite earlier repairs for the same opportunityId",
    recommendedUse:
      "Queue low-source-confidence records for deeper GPT Pro research or human/admin verification only while they remain potentially product-visible. Terminal unavailable or expired records are excluded from this follow-up queue."
  },
  summary: {
    repairBatchCount: manifest.batches.length,
    totalRepairRows: repairLoad.totalRepairRows,
    uniqueRepairedOpportunityCount: repairLoad.latestRepairs.length,
    lowSourceConfidenceCount: queue.length,
    lowSourceConfidenceByAvailabilityStatus: countBy(queue, (row) => row.availabilityStatus || "unknown"),
    lowSourceConfidenceByRecommendedNextStep: countBy(queue, (row) => row.recommendedNextStep)
  },
  opportunities: queue
};

writeJson(options.jsonOutputPath, artifact);
fs.writeFileSync(options.reportPath, buildReport(artifact), "utf8");

console.log(`Wrote ${path.relative(repoRoot, options.jsonOutputPath)}`);
console.log(`Wrote ${path.relative(repoRoot, options.reportPath)}`);
console.log(`Low source-confidence opportunities: ${queue.length}`);

function loadLatestRepairs(manifest, manifestPath) {
  if (manifest.schemaVersion !== "opportunity_data_repair_batches.v1" || !Array.isArray(manifest.batches)) {
    throw new Error(`Unsupported opportunity data repair manifest: ${path.relative(repoRoot, manifestPath)}`);
  }

  const latestById = new Map();
  let totalRepairRows = 0;

  manifest.batches.forEach((batch, batchIndex) => {
    if (!batch?.path) throw new Error(`Manifest batch ${batchIndex + 1} is missing path`);
    const repairPath = path.resolve(repoRoot, batch.path);
    const artifact = readJson(repairPath);
    const batchId = artifact.batchId || path.basename(repairPath, ".json");
    for (const repair of artifact.repairs || []) {
      if (!repair?.opportunityId) continue;
      totalRepairRows += 1;
      latestById.set(repair.opportunityId, {
        opportunityId: repair.opportunityId,
        sourceConfidence: repair.confidence || "medium",
        availabilityStatus: repair.availabilityStatus || "unknown",
        repairStatus: repair.repairStatus || "data_found",
        latestRepairBatchNumber: batchIndex + 1,
        latestRepairBatchId: batchId,
        latestRepairPath: path.relative(repoRoot, repairPath),
        researchedAt: artifact.researchedAt || null,
        source: artifact.source || "gpt_pro",
        geography: {
          country: repair.geography?.country || "US",
          states: strings(repair.geography?.states),
          counties: strings(repair.geography?.counties),
          cities: strings(repair.geography?.cities),
          utilityTerritories: strings(repair.geography?.utilityTerritories),
          notes: cleanText(repair.geography?.notes)
        },
        eligibleApplicantTypes: strings(repair.eligibleApplicantTypes),
        eligibleSectors: strings(repair.eligibleSectors),
        eligibleRetrofitCategories: strings(repair.eligibleRetrofitCategories),
        hardRequirements: strings(repair.hardRequirements),
        blockers: strings(repair.blockers),
        programType: cleanText(repair.programType),
        administrator: cleanText(repair.administrator),
        applicationUrl: cleanText(repair.applicationUrl) || null,
        websiteUrl: cleanText(repair.websiteUrl) || null,
        sourceUrlsChecked: strings(repair.sourceUrlsChecked),
        evidenceText: cleanText(repair.evidenceText),
        reasoningNotes: cleanText(repair.reasoningNotes)
      });
    }
  });

  return { totalRepairRows, latestRepairs: [...latestById.values()] };
}

function isLowSourceConfidenceFollowUpCandidate(repair) {
  return !["unavailable", "expired"].includes(repair.availabilityStatus);
}

function buildOpportunityContext(index) {
  const byId = new Map();
  const addOpportunity = (opportunity, retrofit) => {
    if (!opportunity?.opportunityId) return;
    const existing = byId.get(opportunity.opportunityId) || {
      opportunityId: opportunity.opportunityId,
      opportunityName: opportunity.opportunityName || null,
      sourceName: opportunity.sourceName || null,
      sourceUrl: opportunity.sourceUrl || null,
      state: opportunity.state || null,
      currentPublicAvailabilityStatus: opportunity.availabilityStatus || null,
      currentMatchConfidenceMinimum: Number.POSITIVE_INFINITY,
      relatedRetrofits: []
    };
    existing.opportunityName ||= opportunity.opportunityName || null;
    existing.sourceName ||= opportunity.sourceName || null;
    existing.sourceUrl ||= opportunity.sourceUrl || null;
    existing.state ||= opportunity.state || null;
    existing.currentPublicAvailabilityStatus ||= opportunity.availabilityStatus || null;
    if (Number.isFinite(opportunity.confidence)) {
      existing.currentMatchConfidenceMinimum = Math.min(existing.currentMatchConfidenceMinimum, opportunity.confidence);
    }
    if (retrofit && !existing.relatedRetrofits.some((row) => row.retrofitTypeId === retrofit.retrofitTypeId)) {
      existing.relatedRetrofits.push({
        retrofitTypeId: retrofit.retrofitTypeId,
        displayName: retrofit.displayName,
        parentCategory: retrofit.parentCategory,
        isPhysicalRetrofit: Boolean(retrofit.isPhysicalRetrofit)
      });
    }
    byId.set(opportunity.opportunityId, existing);
  };

  for (const retrofit of index.retrofits || []) {
    for (const opportunity of retrofit.opportunities || []) addOpportunity(opportunity, retrofit);
  }
  for (const opportunity of index.upcomingOpportunities || []) addOpportunity(opportunity, null);

  for (const context of byId.values()) {
    context.relatedRetrofits.sort((a, b) => a.displayName.localeCompare(b.displayName));
    context.relatedRetrofitCount = context.relatedRetrofits.length;
    context.currentMatchConfidenceMinimum = Number.isFinite(context.currentMatchConfidenceMinimum)
      ? Number(context.currentMatchConfidenceMinimum.toFixed(4))
      : null;
  }

  return byId;
}

function buildQueueRow(repair, context) {
  return {
    opportunityId: repair.opportunityId,
    opportunityName: context?.opportunityName || null,
    sourceName: context?.sourceName || null,
    state: context?.state || repair.geography.states[0] || null,
    sourceUrl: context?.sourceUrl || null,
    websiteUrl: repair.websiteUrl,
    applicationUrl: repair.applicationUrl,
    source_confidence: repair.sourceConfidence,
    match_confidence: context?.currentMatchConfidenceMinimum ?? null,
    availabilityStatus: repair.availabilityStatus,
    currentPublicAvailabilityStatus: context?.currentPublicAvailabilityStatus || publicAvailabilityStatus(repair.availabilityStatus),
    recommendedNextStep: recommendedNextStep(repair),
    latestRepairBatchNumber: repair.latestRepairBatchNumber,
    latestRepairBatchId: repair.latestRepairBatchId,
    latestRepairPath: repair.latestRepairPath,
    researchedAt: repair.researchedAt,
    programType: repair.programType,
    administrator: repair.administrator,
    geography: repair.geography,
    eligibleApplicantTypes: repair.eligibleApplicantTypes,
    eligibleSectors: repair.eligibleSectors,
    eligibleRetrofitCategories: repair.eligibleRetrofitCategories,
    hardRequirements: repair.hardRequirements,
    blockers: repair.blockers,
    relatedRetrofitCount: context?.relatedRetrofitCount || 0,
    relatedRetrofits: context?.relatedRetrofits || [],
    sourceUrlsChecked: repair.sourceUrlsChecked,
    evidenceText: repair.evidenceText,
    reasoningNotes: repair.reasoningNotes
  };
}

function recommendedNextStep(repair) {
  if (repair.availabilityStatus === "active" || repair.availabilityStatus === "rolling") {
    return "deeper_gpt_pro_research_before_trusting_active_program";
  }
  if (repair.availabilityStatus === "source_inaccessible") {
    return "human_or_gpt_pro_source_access_followup";
  }
  return "human_or_gpt_pro_availability_verification";
}

function publicAvailabilityStatus(status) {
  if (status === "active" || status === "rolling" || status === "upcoming") return status;
  if (status === "unavailable" || status === "expired") return "unavailable";
  return "uncertain";
}

function compareQueueRows(a, b) {
  const priority = {
    deeper_gpt_pro_research_before_trusting_active_program: 0,
    human_or_gpt_pro_availability_verification: 1,
    human_or_gpt_pro_source_access_followup: 2
  };
  const priorityDelta = priority[a.recommendedNextStep] - priority[b.recommendedNextStep];
  if (priorityDelta !== 0) return priorityDelta;
  const retrofitDelta = b.relatedRetrofitCount - a.relatedRetrofitCount;
  if (retrofitDelta !== 0) return retrofitDelta;
  return String(a.opportunityName || a.opportunityId).localeCompare(String(b.opportunityName || b.opportunityId));
}

function buildReport(artifact) {
  const lines = [
    "# Low Source-Confidence Opportunity Queue",
    "",
    `Generated: ${artifact.generatedAt}`,
    "",
    "This queue uses GPT Pro repair `confidence` as `source_confidence`. It does not represent deterministic `match_confidence`.",
    "",
    "## Summary",
    "",
    `- Repair batches scanned: ${artifact.summary.repairBatchCount}`,
    `- Latest unique repaired opportunities: ${artifact.summary.uniqueRepairedOpportunityCount}`,
    `- Low source-confidence opportunities: ${artifact.summary.lowSourceConfidenceCount}`,
    `- Availability status counts: ${formatCounts(artifact.summary.lowSourceConfidenceByAvailabilityStatus)}`,
    `- Recommended next-step counts: ${formatCounts(artifact.summary.lowSourceConfidenceByRecommendedNextStep)}`,
    "",
    "## Queue",
    "",
    "| Priority | Opportunity | State | Availability | Source confidence | Match confidence | Latest repair | Next step |",
    "| --- | --- | --- | --- | --- | --- | --- | --- |"
  ];

  artifact.opportunities.forEach((row, index) => {
    lines.push(
      [
        index + 1,
        escapeTable([row.opportunityName, row.opportunityId].filter(Boolean).join(" / ")),
        escapeTable(row.state || ""),
        escapeTable(row.availabilityStatus || ""),
        row.source_confidence,
        row.match_confidence === null ? "" : row.match_confidence,
        escapeTable(row.latestRepairBatchId),
        escapeTable(row.recommendedNextStep)
      ].join(" | ").replace(/^/, "| ").replace(/$/, " |")
    );
  });

  lines.push("", "## Verification Notes", "");
  for (const row of artifact.opportunities) {
    lines.push(`### ${row.opportunityName || row.opportunityId}`);
    lines.push("");
    lines.push(`- Opportunity ID: \`${row.opportunityId}\``);
    lines.push(`- Latest repair: \`${row.latestRepairBatchId}\` from \`${row.latestRepairPath}\``);
    lines.push(`- Recommended next step: \`${row.recommendedNextStep}\``);
    if (row.evidenceText) lines.push(`- Evidence: ${row.evidenceText}`);
    if (row.reasoningNotes) lines.push(`- Reasoning: ${row.reasoningNotes}`);
    if (row.sourceUrlsChecked.length > 0) lines.push(`- Sources checked: ${row.sourceUrlsChecked.join(", ")}`);
    lines.push("");
  }

  return `${lines.join("\n")}\n`;
}

function countBy(rows, keyFn) {
  const counts = {};
  for (const row of rows) {
    const key = keyFn(row);
    counts[key] = (counts[key] || 0) + 1;
  }
  return Object.fromEntries(Object.entries(counts).sort(([a], [b]) => a.localeCompare(b)));
}

function formatCounts(counts) {
  const entries = Object.entries(counts);
  if (entries.length === 0) return "none";
  return entries
    .map(([key, count]) => `${key} ${count}`)
    .join(", ");
}

function escapeTable(value) {
  return String(value ?? "").replace(/\|/g, "\\|").replace(/\s+/g, " ").trim();
}

function strings(values) {
  return [...new Set((Array.isArray(values) ? values : []).map(cleanText).filter(Boolean))];
}

function cleanText(value) {
  return String(value || "").replace(/\s+/g, " ").trim();
}

function readJson(filePath) {
  return JSON.parse(fs.readFileSync(path.resolve(filePath), "utf8"));
}

function writeJson(filePath, value) {
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  fs.writeFileSync(filePath, `${JSON.stringify(value, null, 2)}\n`);
}

function parseArgs(args) {
  const parsed = {
    manifestPath: defaultManifestPath,
    retrofitIndexPath: defaultRetrofitIndexPath,
    jsonOutputPath: defaultJsonOutputPath,
    reportPath: defaultReportPath
  };

  for (let index = 0; index < args.length; index += 1) {
    const arg = args[index];
    if (arg === "--manifest") {
      parsed.manifestPath = path.resolve(requiredValue(args, ++index, arg));
    } else if (arg === "--retrofit-index") {
      parsed.retrofitIndexPath = path.resolve(requiredValue(args, ++index, arg));
    } else if (arg === "--json-output") {
      parsed.jsonOutputPath = path.resolve(requiredValue(args, ++index, arg));
    } else if (arg === "--report") {
      parsed.reportPath = path.resolve(requiredValue(args, ++index, arg));
    } else {
      throw new Error(`Unknown option: ${arg}`);
    }
  }

  return parsed;
}

function requiredValue(args, index, flag) {
  const value = args[index];
  if (!value) throw new Error(`${flag} requires a value`);
  return value;
}
