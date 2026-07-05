import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import crypto from "node:crypto";

const scriptPath = fileURLToPath(import.meta.url);
const repoRoot = path.resolve(path.dirname(scriptPath), "..");
const defaultDate = "2026-07-05";
const defaultSourceDate = "2026-07-04";

const options = parseArgs(process.argv.slice(2));
const date = options.date || defaultDate;
const sourceDate = options.sourceDate || defaultSourceDate;
const sourcePath = path.resolve(
  options.sourcePath || path.join(repoRoot, "data", `tax_structured_model_records_${sourceDate}.json`)
);
const dispositionPath = path.resolve(
  options.dispositionPath || path.join(repoRoot, "data", `tax_gap_disposition_${date}.json`)
);
const reportPath = path.resolve(
  options.reportPath || path.join(repoRoot, "data", `tax_gap_disposition_report_${date}.md`)
);
const workDir = path.resolve(
  options.workDir || path.join(repoRoot, "GPT Pro Work", `tax-skipped-gap-repair-${date}`)
);

if (options.help) {
  printHelp();
  process.exit(0);
}

const source = readJson(sourcePath);
const repairSpecs = buildRepairSpecs();
const inputGateIds = new Set([
  "skip_activity_specific_local_taxes_without_tax_profile",
  "skip_local_business_tax_customer_facing_totals_without_tax_return_inputs"
]);
const repairIds = new Set(repairSpecs.map((target) => target.skippedRecordId));
const skippedById = new Map((source.skippedRecords || []).map((record) => [record.skippedRecordId, record]));
const sourceDocumentsById = new Map((source.sourceDocuments || []).map((document) => [document.sourceDocumentId, document]));

for (const spec of repairSpecs) {
  if (!skippedById.has(spec.skippedRecordId)) {
    throw new Error(`Repair spec references missing skipped record ${spec.skippedRecordId}`);
  }
}

const disposition = buildDisposition();
validateDisposition(disposition);

if (!options.dryRun) {
  writeJson(dispositionPath, disposition);
  fs.writeFileSync(reportPath, buildReport(disposition), "utf8");
  writeWorkPacket(disposition);
}

console.log("Built tax gap disposition and GPT Pro work packet.");
console.log(`Suppressed/archive records: ${disposition.counts.suppressedOrArchivedCount}`);
console.log(`Input-gated records: ${disposition.counts.inputGatedCount}`);
console.log(`Repair targets: ${disposition.counts.repairTargetCount}`);
console.log(`Triage guardrails kept: ${disposition.counts.policyGuardrailCount}`);
console.log(`Prompt batches: ${disposition.counts.promptBatchCount}`);
console.log(`Disposition: ${path.relative(repoRoot, dispositionPath)}`);
console.log(`Report: ${path.relative(repoRoot, reportPath)}`);
console.log(`Work packet: ${path.relative(repoRoot, workDir)}`);

function buildDisposition() {
  const repairTargets = repairSpecs.map((spec) => {
    const record = skippedById.get(spec.skippedRecordId);
    return {
      dispositionId: `tax_gap_repair_${shortHash(spec.skippedRecordId)}`,
      action: "repair_with_gpt_pro",
      skippedRecordId: record.skippedRecordId,
      skipType: record.skipType,
      jurisdiction: record.jurisdiction || null,
      currentRuntimeStatus: record.recommendedRuntimeStatus,
      sourceFile: record.sourceFile,
      modelFamily: spec.modelFamily,
      priority: spec.priority,
      promptFocus: spec.promptFocus,
      requiredOutcome: spec.requiredOutcome,
      acceptableFinalDispositions: [
        "promote_to_tax_rule",
        "suppress_archive",
        "keep_input_gate",
        "route_to_existing_non_tax_or_tax_model"
      ],
      sourceDocumentIds: record.sourceDocumentIds || [],
      sourceDocuments: resolveSourceDocuments(record.sourceDocumentIds || []),
      originalReason: record.reason || "",
      evidenceText: record.evidenceText || "",
      customerFacingSavingsCentsDefault: 0
    };
  });

  const inputGatedRecords = [];
  const suppressedOrArchivedRecords = [];

  for (const record of source.skippedRecords || []) {
    if (repairIds.has(record.skippedRecordId)) continue;

    if (inputGateIds.has(record.skippedRecordId)) {
      inputGatedRecords.push({
        dispositionId: `tax_gap_input_gate_${shortHash(record.skippedRecordId)}`,
        action: "keep_input_gate_zero_until_user_data",
        skippedRecordId: record.skippedRecordId,
        skipType: record.skipType,
        jurisdiction: record.jurisdiction || null,
        currentRuntimeStatus: record.recommendedRuntimeStatus,
        sourceFile: record.sourceFile,
        reason: record.reason || "",
        requiredRuntimeInputs: inferInputGateRequirements(record),
        customerFacingSavingsCentsDefault: 0,
        notes: "This is not a GPT Pro source-repair target. Keep it out of customer-facing tax savings until taxpayer-specific inputs are supplied."
      });
      continue;
    }

    suppressedOrArchivedRecords.push({
      dispositionId: `tax_gap_suppress_${shortHash(record.skippedRecordId)}`,
      action: suppressionActionFor(record),
      skippedRecordId: record.skippedRecordId,
      skipType: record.skipType,
      jurisdiction: record.jurisdiction || null,
      currentRuntimeStatus: record.recommendedRuntimeStatus,
      sourceFile: record.sourceFile,
      reason: record.reason || "",
      suppressionReasonCode: suppressionReasonCodeFor(record),
      archiveCandidate: archiveCandidateFor(record),
      customerFacingSavingsCentsDefault: 0,
      sourceDocumentIds: record.sourceDocumentIds || [],
      sourceDocuments: resolveSourceDocuments(record.sourceDocumentIds || [])
    });
  }

  const policyGuardrailRecords = (source.unsupportedTriageRules || []).map((record) => ({
    dispositionId: `tax_gap_policy_${shortHash(record.ruleId)}`,
    action: "keep_policy_guardrail",
    ruleId: record.ruleId,
    classification: record.classification,
    recommendedRuntimeStatus: record.recommendedRuntimeStatus,
    reason: record.repairQueueReason || "",
    customerFacingValueCents: Number(record.customerFacingValueCents || 0),
    notes: "This is a generic import/runtime routing guardrail, not a skipped opportunity to repair."
  }));

  const promptBatches = chunk(repairTargets, 4).map((targets, index) => ({
    promptId: `tax_gap_repair_${String(index + 1).padStart(3, "0")}`,
    promptFile: `prompt_${String(index + 1).padStart(3, "0")}_tax_gap_repair.md`,
    outputFile: `output_${String(index + 1).padStart(3, "0")}_tax_gap_repair.md`,
    targetIds: targets.map((target) => target.skippedRecordId)
  }));

  return {
    schemaVersion: "retrofi_tax_gap_disposition.v1",
    generatedAt: new Date().toISOString(),
    sourceArtifact: path.relative(repoRoot, sourcePath),
    safetyPolicy: {
      customerFacingSavingsCentsDefault: 0,
      notes: [
        "Suppressed/archive records remain excluded from customer-facing tax totals.",
        "Input-gated records remain excluded until user, accountant, tax bill, filing, certificate, or program-document inputs are present.",
        "Repair targets require official-source GPT Pro follow-up before they can be promoted into tax rule records.",
        "Unsupported triage rules are retained as policy guardrails for future import decisions."
      ]
    },
    counts: {
      totalSkippedRecords: (source.skippedRecords || []).length,
      suppressedOrArchivedCount: suppressedOrArchivedRecords.length,
      inputGatedCount: inputGatedRecords.length,
      repairTargetCount: repairTargets.length,
      policyGuardrailCount: policyGuardrailRecords.length,
      promptBatchCount: promptBatches.length
    },
    suppressedOrArchivedRecords,
    inputGatedRecords,
    repairTargets,
    policyGuardrailRecords,
    promptBatches
  };
}

function buildRepairSpecs() {
  return [
    {
      skippedRecordId: "vernon_ca_partial_local_tax_sources_skip_until_code_verified_v1",
      modelFamily: "local_business_license_or_receipts_tax",
      priority: "medium",
      promptFocus: "Verify City of Vernon official code or fee schedule formulas for business license, special parcel, warehouse, hazardous-waste, or related local taxes.",
      requiredOutcome: "Promote only if official formula, taxpayer class, tax base, effective date, and source URLs are verified."
    },
    {
      skippedRecordId: "sales_use_tax_ambiguous_rule_1",
      modelFamily: "tax_abatement_or_pilot",
      priority: "medium",
      promptFocus: "Determine whether Alabama has any current general retrofit sales/use exemption, or only project-specific Chapter 9B abatement workflows.",
      requiredOutcome: "Either promote as a source-backed abatement workflow or archive as not a general sales/use exemption."
    },
    {
      skippedRecordId: "sales_use_tax_ambiguous_rule_4",
      modelFamily: "sales_use_tax_exemption",
      priority: "high",
      promptFocus: "Find current official Iowa authority for any retrofit, renewable, geothermal, manufacturing, or energy-efficiency sales/use tax exemption.",
      requiredOutcome: "Promote only with current DOR/statute/form evidence for eligible items, certificate requirements, and labor treatment."
    },
    {
      skippedRecordId: "sales_use_tax_ambiguous_rule_5",
      modelFamily: "tax_abatement_or_pilot",
      priority: "high",
      promptFocus: "Repair Nevada partial sales/use and property-tax abatement program into source-backed project-specific workflow rules.",
      requiredOutcome: "Capture formula, approval process, caps, compliance audit, eligible projects, and required project documents."
    },
    {
      skippedRecordId: "sales_use_tax_ambiguous_rule_8",
      modelFamily: "gross_receipts_or_bo_rate_preference",
      priority: "medium",
      promptFocus: "Determine whether New Mexico has source-backed gross receipts or compensating tax treatment for clean-energy or retrofit equipment.",
      requiredOutcome: "Route to gross receipts/compensating tax model or archive if no current official retrofit-specific rule exists."
    },
    {
      skippedRecordId: "az_renewable_energy_production_tax_credit_skip_v1",
      modelFamily: "state_income_or_franchise_tax_credit",
      priority: "medium",
      promptFocus: "Verify Arizona renewable energy production tax credit current status, legacy eligibility, formulas, caps, certificates, and carryforward.",
      requiredOutcome: "Promote only as active/current or legacy carryforward workflow with exact tax-year gates."
    },
    {
      skippedRecordId: "co_heat_pump_systems_registered_contractor_credit_skip_v1",
      modelFamily: "state_income_or_franchise_tax_credit",
      priority: "high",
      promptFocus: "Capture current Colorado DR 1322 heat pump systems registered contractor credit formulas by technology and tax year.",
      requiredOutcome: "Promote with source-backed amounts, assignment/advance-payment rules, contractor registration gates, and filing inputs."
    },
    {
      skippedRecordId: "co_electric_bicycle_retailer_credit_skip_v1",
      modelFamily: "state_income_or_franchise_tax_credit",
      priority: "medium",
      promptFocus: "Capture current Colorado electric bicycle retailer credit formula, eligible sale rules, assignment or advance-payment mechanics, caps, and forms.",
      requiredOutcome: "Promote if relevant to RetroFi user paths, otherwise suppress with official evidence."
    },
    {
      skippedRecordId: "ct_green_buildings_credit_skip_v1",
      modelFamily: "state_income_or_franchise_tax_credit",
      priority: "high",
      promptFocus: "Repair Connecticut green buildings credit formula, certification gates, tax-year availability, carryforward, caps, and current form status.",
      requiredOutcome: "Promote only if current official formula and claim mechanics exist."
    },
    {
      skippedRecordId: "mt_energy_production_development_abatement_skip_2026_v1",
      modelFamily: "tax_abatement_or_pilot",
      priority: "medium",
      promptFocus: "Verify Montana energy production/development property-tax abatement status, eligible facilities, local approval rules, and formula.",
      requiredOutcome: "Promote as project-specific abatement workflow or archive if no current source-backed retrofit applicability exists."
    },
    {
      skippedRecordId: "ct_uniform_solar_capacity_tax_pa26_refresh_watch_2026_v1",
      modelFamily: "property_tax_special_valuation",
      priority: "medium",
      promptFocus: "Refresh Connecticut uniform solar capacity tax against 2026 Public Act text and assessor implementation guidance.",
      requiredOutcome: "Confirm whether the existing medium-confidence rule should be promoted, modified, or suppressed."
    },
    {
      skippedRecordId: "local_option_followup_1",
      modelFamily: "property_tax_credit",
      priority: "high",
      promptFocus: "Verify Baltimore County high-performance building and high-performance home tax credit code, caps, rating definitions, forms, and active status.",
      requiredOutcome: "Promote with exact current formulas and required assessor/application inputs."
    },
    {
      skippedRecordId: "local_option_followup_2",
      modelFamily: "property_tax_credit",
      priority: "high",
      promptFocus: "Verify Prince George's County high-performance building and green business real/personal property tax credit formulas, duration, caps, and forms.",
      requiredOutcome: "Promote with exact local code rows and official application requirements."
    },
    {
      skippedRecordId: "local_option_followup_3",
      modelFamily: "property_tax_credit",
      priority: "medium",
      promptFocus: "Repair Anne Arundel County solar, geothermal, and high-performance building tax credit calculations with SDAT building/land allocation and stacking rules.",
      requiredOutcome: "Promote calculators only where official county and SDAT source fields are sufficient."
    },
    {
      skippedRecordId: "local_option_followup_4",
      modelFamily: "property_tax_exemption",
      priority: "high",
      promptFocus: "Build New York RPTL 487 opt-out/PILOT workflow using official Tax Department opt-out list and local taxing-jurisdiction requirements.",
      requiredOutcome: "Promote a safe workflow that identifies when assessor/PILOT confirmation is required."
    },
    {
      skippedRecordId: "local_option_followup_5",
      modelFamily: "property_tax_exemption",
      priority: "medium",
      promptFocus: "Verify Virginia solar exemption ordinances beyond Fairfax, Arlington, Loudoun, and Prince William, prioritizing Alexandria, Fairfax City, Richmond, and Virginia Beach.",
      requiredOutcome: "Promote only localities with official ordinance, certification, exemption percent, and eligible system definitions."
    },
    {
      skippedRecordId: "local_option_followup_6",
      modelFamily: "tax_abatement_or_pilot",
      priority: "medium",
      promptFocus: "Verify Ohio CRA municipalities and counties with sustainability-linked terms, caps, or bonuses, beyond the existing Cincinnati workflow.",
      requiredOutcome: "Promote only official local CRA rows tied to LEED, HERS, Living Building Challenge, or similar criteria."
    },
    {
      skippedRecordId: "skip_prince_georges_MD_green_business_amount_unverified_v1",
      modelFamily: "property_tax_credit",
      priority: "high",
      promptFocus: "Resolve the exact Prince George's County Green Business real/personal property tax credit amount, percent, duration, cap, and code authority.",
      requiredOutcome: "Either merge into the Prince George's promoted rule or suppress if no official amount exists."
    },
    {
      skippedRecordId: "skip_cincinnati_commercial_CRA_without_executed_agreement_v1",
      modelFamily: "tax_abatement_or_pilot",
      priority: "medium",
      promptFocus: "Clarify Cincinnati commercial CRA calculation boundaries, standard terms, sustainability bonuses, and which values require executed agreement documents.",
      requiredOutcome: "Promote only safe pre-agreement estimate rules, or keep as program-document gate."
    },
    {
      skippedRecordId: "skip_wa_quincy_public_utility_tax_until_official_rate_table_accessible",
      modelFamily: "local_business_license_or_receipts_tax",
      priority: "medium",
      promptFocus: "Verify Quincy, Washington public utility business tax rates from official code section 3.28.040 or official fee schedule.",
      requiredOutcome: "Promote only if current official rate table and taxable gross income base are accessible."
    },
    {
      skippedRecordId: "skip_unverified_ca_city_business_license_rates",
      modelFamily: "local_business_license_or_receipts_tax",
      priority: "medium",
      promptFocus: "Research official business license/gross receipts tax formulas for Burbank, Pasadena, Anaheim, Los Angeles, San Diego, Vernon, and San Francisco.",
      requiredOutcome: "Promote city-specific rows only where official code or fee schedules provide current formulas and business classifications."
    },
    {
      skippedRecordId: "skip_mi_rerz_customer_facing_savings_without_approved_zone_docs",
      modelFamily: "tax_abatement_or_pilot",
      priority: "medium",
      promptFocus: "Repair Michigan Renewable Energy Renaissance Zone tax benefit model, including tax lines affected, phaseout, boundary/project approval, and required documents.",
      requiredOutcome: "Promote source-backed general workflow while keeping customer-facing amount gated by approved zone and taxpayer documents."
    },
    {
      skippedRecordId: "skip_oh_cat_current_exclusion_amount_without_current_return_confirmation",
      modelFamily: "gross_receipts_or_bo_rate_preference",
      priority: "medium",
      promptFocus: "Verify current Ohio Commercial Activity Tax rate, exclusion, filing threshold, tax-year mechanics, and official return/instruction source.",
      requiredOutcome: "Promote updated CAT calculation constants if current official return/instructions support them."
    }
  ];
}

function writeWorkPacket(disposition) {
  fs.mkdirSync(workDir, { recursive: true });
  const manifest = {
    schemaVersion: "retrofi_tax_gap_repair_work_packet_manifest.v1",
    generatedAt: disposition.generatedAt,
    sourceArtifact: disposition.sourceArtifact,
    dispositionArtifact: path.relative(repoRoot, dispositionPath),
    promptCount: disposition.promptBatches.length,
    targetCount: disposition.repairTargets.length,
    prompts: disposition.promptBatches
  };
  writeJson(path.join(workDir, "manifest.json"), manifest);
  writeJson(path.join(workDir, "repair_targets.json"), disposition.repairTargets);
  writeJson(path.join(workDir, "suppressed_or_archived_records.json"), disposition.suppressedOrArchivedRecords);
  writeJson(path.join(workDir, "input_gated_records.json"), disposition.inputGatedRecords);

  for (const batch of disposition.promptBatches) {
    const targets = batch.targetIds.map((id) => disposition.repairTargets.find((target) => target.skippedRecordId === id));
    fs.writeFileSync(path.join(workDir, batch.promptFile), buildPrompt(batch, targets), "utf8");
    if (!fs.existsSync(path.join(workDir, batch.outputFile))) fs.writeFileSync(path.join(workDir, batch.outputFile), "", "utf8");
  }
}

function buildPrompt(batch, targets) {
  return [
    "# RetroFi Tax Gap Repair Research",
    "",
    `Prompt ID: ${batch.promptId}`,
    "",
    "You are helping RetroFi repair skipped tax calculation gaps. Research only official sources: tax agency pages, statutes, regulations, official forms/instructions, assessor/treasurer pages, municipal or county code, official GIS/data portals, or official program manuals.",
    "",
    "Do not use third-party summaries as final authority. You may use them only to discover official sources. Do not invent rates, formulas, caps, effective dates, eligibility rules, local adoption, or filing requirements.",
    "",
    "For each target, either promote it to a source-backed tax rule, keep it as an input/document gate, route it to an existing non-tax or different tax model, or suppress/archive it with official evidence. Customer-facing savings must remain 0 unless the source-backed formula and required user inputs are complete.",
    "",
    "Return exactly one JSON object, no markdown fences, with this schema:",
    "",
    JSON.stringify(exampleOutput(batch, targets), null, 2),
    "",
    "Targets to research:",
    "",
    ...targets.flatMap((target, index) => [
      `## Target ${index + 1}: ${target.skippedRecordId}`,
      "",
      JSON.stringify(target, null, 2),
      ""
    ])
  ].join("\n");
}

function exampleOutput(batch, targets) {
  return {
    schemaVersion: "retrofi_tax_gap_repair_batch.v1",
    promptId: batch.promptId,
    researchedAt: "YYYY-MM-DD",
    repairs: targets.map((target) => ({
      skippedRecordId: target.skippedRecordId,
      disposition: "promote_to_tax_rule | suppress_archive | keep_input_gate | route_to_existing_non_tax_or_tax_model",
      sourceConfidence: "high | medium | low",
      recommendedRuntimeStatus: "deterministic_estimate | needs_tax_profile | needs_tax_return | needs_tax_bill | needs_filing_confirmation | needs_assessor_confirmation | needs_program_documentation | source_unavailable | stale_source | unsupported_tax_model | not_applicable_zero_value",
      taxRule: {
        modelKind: target.modelFamily,
        taxTypes: [],
        jurisdiction: target.jurisdiction || "",
        eligibleTaxpayerTypes: [],
        eligibleItemsOrActivities: [],
        formulaText: "",
        formulaExpression: "",
        caps: [],
        effectiveDates: {
          startDate: null,
          endDate: null,
          taxYears: []
        },
        requiredRuntimeInputs: [],
        filingOrCertificateRequirements: [],
        localAdoptionOrApprovalRules: [],
        userFacingCalculationAllowedWhen: []
      },
      suppression: {
        reasonCodes: [],
        archiveReason: "",
        effectiveEndDate: null,
        routeToModule: null
      },
      sourceUrlsChecked: [],
      officialSourceUrls: [],
      evidenceText: "",
      reasoningNotes: ""
    }))
  };
}

function buildReport(disposition) {
  const lines = [
    "# Tax Gap Disposition Report",
    "",
    `Generated at: ${disposition.generatedAt}`,
    `Source artifact: \`${disposition.sourceArtifact}\``,
    "",
    "## Counts",
    "",
    `- Total skipped records reviewed: ${disposition.counts.totalSkippedRecords}`,
    `- Suppressed/archive records: ${disposition.counts.suppressedOrArchivedCount}`,
    `- Input-gated records: ${disposition.counts.inputGatedCount}`,
    `- GPT Pro repair targets: ${disposition.counts.repairTargetCount}`,
    `- Unsupported triage guardrails kept: ${disposition.counts.policyGuardrailCount}`,
    `- GPT Pro prompt batches: ${disposition.counts.promptBatchCount}`,
    "",
    "## GPT Pro Repair Targets",
    "",
    ...disposition.repairTargets.map((target) => `- ${target.skippedRecordId} (${target.priority}, ${target.modelFamily}): ${target.promptFocus}`),
    "",
    "## Suppressed Or Archived",
    "",
    ...disposition.suppressedOrArchivedRecords.map((record) => `- ${record.skippedRecordId}: ${record.suppressionReasonCode}`),
    "",
    "## Input-Gated, Not Source-Repair Targets",
    "",
    ...disposition.inputGatedRecords.map((record) => `- ${record.skippedRecordId}: ${record.currentRuntimeStatus}`),
    "",
    "## Prompt Files",
    "",
    ...disposition.promptBatches.map((batch) => `- ${batch.promptFile} -> ${batch.outputFile}: ${batch.targetIds.join(", ")}`)
  ];
  return `${lines.join("\n")}\n`;
}

function resolveSourceDocuments(sourceDocumentIds) {
  return (sourceDocumentIds || [])
    .map((sourceDocumentId) => sourceDocumentsById.get(sourceDocumentId))
    .filter(Boolean)
    .map((document) => ({
      sourceDocumentId: document.sourceDocumentId,
      canonicalUrl: document.canonicalUrl,
      sourceFiles: document.sourceFiles || [],
      sourceFamilies: document.sourceFamilies || [],
      evidenceSnippets: document.evidenceSnippets || []
    }));
}

function validateDisposition(disposition) {
  const total =
    disposition.suppressedOrArchivedRecords.length +
    disposition.inputGatedRecords.length +
    disposition.repairTargets.length;
  if (total !== (source.skippedRecords || []).length) {
    throw new Error(`Disposition classifies ${total} skipped records, expected ${(source.skippedRecords || []).length}`);
  }
  const seen = new Set();
  for (const record of [
    ...disposition.suppressedOrArchivedRecords,
    ...disposition.inputGatedRecords,
    ...disposition.repairTargets
  ]) {
    if (seen.has(record.skippedRecordId)) throw new Error(`Duplicate skipped record disposition for ${record.skippedRecordId}`);
    seen.add(record.skippedRecordId);
  }
}

function suppressionActionFor(record) {
  if (archiveCandidateFor(record)) return "archive_or_suppress_as_inactive_or_invalid";
  if (record.skipType === "source_registry_skip") return "suppress_as_non_authoritative_source";
  if (record.recommendedRuntimeStatus === "source_unavailable") return "suppress_until_official_source_found";
  if (record.recommendedRuntimeStatus === "needs_local_ordinance_confirmation") return "suppress_until_local_adoption_verified";
  if (record.recommendedRuntimeStatus === "needs_program_documentation") return "suppress_until_program_documents_exist";
  return "suppress_from_customer_facing_tax_runtime";
}

function suppressionReasonCodeFor(record) {
  const id = record.skippedRecordId || "";
  const reason = `${record.reason || ""}`.toLowerCase();
  if (record.recommendedRuntimeStatus === "stale_source" || reason.includes("expired") || reason.includes("repealed") || reason.includes("eliminated") || reason.includes("suspended") || reason.includes("unconstitutional")) {
    return "INACTIVE_EXPIRED_REPEALED_OR_LEGALLY_INVALID";
  }
  if (id.includes("dsire") || reason.includes("third-party") || reason.includes("commercial calculator") || reason.includes("secondary summaries") || reason.includes("not official")) {
    return "NON_AUTHORITATIVE_SOURCE_ONLY";
  }
  if (reason.includes("not a sales/use tax") || reason.includes("not a sales") || reason.includes("not a general")) return "WRONG_TAX_MODEL_OR_NO_GENERAL_RULE";
  if (record.recommendedRuntimeStatus === "source_unavailable") return "OFFICIAL_SOURCE_UNAVAILABLE";
  if (record.recommendedRuntimeStatus === "needs_program_documentation") return "PROGRAM_DOCUMENTS_REQUIRED";
  if (record.recommendedRuntimeStatus === "needs_local_ordinance_confirmation") return "LOCAL_ADOPTION_NOT_VERIFIED";
  return "UNSUPPORTED_OR_UNSAFE_FOR_CUSTOMER_FACING_TAX_ESTIMATE";
}

function archiveCandidateFor(record) {
  const reason = `${record.reason || ""}`.toLowerCase();
  return (
    record.recommendedRuntimeStatus === "stale_source" ||
    record.recommendedRuntimeStatus === "not_applicable_zero_value" ||
    reason.includes("expired") ||
    reason.includes("repealed") ||
    reason.includes("eliminated") ||
    reason.includes("suspended") ||
    reason.includes("unconstitutional") ||
    reason.includes("not available for new") ||
    reason.includes("after december 31, 2024") ||
    reason.includes("after december 31, 2023") ||
    reason.includes("after december 31, 2021")
  );
}

function inferInputGateRequirements(record) {
  if ((record.skippedRecordId || "").includes("activity_specific")) {
    return ["taxable_activity", "jurisdiction", "tax_base", "current_official_rate", "taxpayer_tax_profile"];
  }
  return ["tax_return_inputs", "gross_receipts_or_income", "business_classification", "apportionment", "exemptions_or_credits", "filing_confirmation"];
}

function parseArgs(args) {
  const parsed = {};
  for (let index = 0; index < args.length; index += 1) {
    const arg = args[index];
    if (!arg.startsWith("--")) throw new Error(`Unexpected positional argument: ${arg}`);
    const key = arg.slice(2);
    if (key === "help" || key === "dryRun") {
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
  console.log(`Usage: node scripts/write-tax-gap-disposition-work-packet.mjs [--date ${defaultDate}] [--dryRun]`);
}

function chunk(values, size) {
  const chunks = [];
  for (let index = 0; index < values.length; index += size) chunks.push(values.slice(index, index + size));
  return chunks;
}

function shortHash(value) {
  return crypto.createHash("sha256").update(String(value)).digest("hex").slice(0, 10);
}

function readJson(filePath) {
  return JSON.parse(fs.readFileSync(filePath, "utf8"));
}

function writeJson(filePath, value) {
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  fs.writeFileSync(filePath, `${JSON.stringify(value, null, 2)}\n`, "utf8");
}
