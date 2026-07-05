import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const scriptPath = fileURLToPath(import.meta.url);
const repoRoot = path.resolve(path.dirname(scriptPath), "..");
const defaultDate = "2026-07-04";

const options = parseArgs(process.argv.slice(2));
const date = options.date || defaultDate;
const sourceArtifactPath = path.resolve(
  options.sourceArtifactPath || path.join(repoRoot, "data", `tax_comprehensive_model_research_gpt_pro_${date}.json`)
);
const frameworkPath = path.resolve(options.frameworkPath || path.join(repoRoot, "data", "tax_model_framework.json"));
const outputPath = path.resolve(options.outputPath || path.join(repoRoot, "data", `tax_structured_model_records_${date}.json`));
const reportPath = path.resolve(options.reportPath || path.join(repoRoot, "data", `tax_structured_model_records_report_${date}.md`));

if (options.help) {
  printHelp();
  process.exit(0);
}

const now = new Date().toISOString();
const sourceArtifact = readJson(sourceArtifactPath);
const framework = readJson(frameworkPath);
const allowedModelKinds = new Set((framework.modelKinds || []).map((model) => model.kind));
const allowedRuntimeStatuses = new Set((framework.runtimeStatuses || []).map((status) => status.status));
const sourceDocumentsByUrl = new Map();
const validationWarnings = [];

const records = buildStructuredRecords();
validateRecords(records);

if (!options.dryRun) {
  writeJson(outputPath, records);
  fs.writeFileSync(reportPath, buildReport(records), "utf8");
}

console.log("Built structured tax model records.");
console.log(`Source documents: ${records.counts.sourceDocumentCount}`);
console.log(`Source registry records: ${records.counts.sourceRegistryRecordCount}`);
console.log(`Tax rate import plans: ${records.counts.taxRateImportPlanCount}`);
console.log(`Tax rule records: ${records.counts.taxRuleRecordCount}`);
console.log(`Skipped/gap records: ${records.counts.skippedRecordCount}`);
console.log(`Import/normalization warnings: ${records.validationWarnings.length}`);
console.log(`Output: ${path.relative(repoRoot, outputPath)}`);
console.log(`Report: ${path.relative(repoRoot, reportPath)}`);

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
  console.log(`Usage: node scripts/build-tax-structured-model-records.mjs [--date ${defaultDate}] [--dryRun]`);
}

function buildStructuredRecords() {
  const outputs = sourceArtifact.outputs || {};
  addFootnoteSourceDocuments(sourceArtifact.sourceReferences || {});

  const sourceRegistryRecords = buildSourceRegistryRecords(outputs.nationalSourceRegistryGapFill || {});
  const taxRateImportPlans = buildTaxRateImportPlans(outputs.salesUseTaxRatesBoundaries || {});
  const taxRuleRecords = [
    ...buildSalesUseExemptionRules(outputs.salesUseTaxExemptionsTaxability || {}),
    ...buildStateTaxCreditRules(outputs.stateTaxCreditsExemptionsDeductions || {}),
    ...buildPropertyTaxStatewideRules(outputs.propertyTaxStatewideRules || {}),
    ...buildVerifiedLocalOptionRules(outputs.countyCityLocalOptionIncentives || {}),
    ...buildStateBusinessTaxModelRules(outputs.businessTaxGrossReceiptsBo || {}),
    ...buildMajorLocalBusinessTaxModelRules(outputs.businessTaxGrossReceiptsBo || {})
  ];
  const localOptionAuthorityRecords = buildLocalOptionAuthorityRecords(outputs.countyCityLocalOptionIncentives || {});
  const exoticWorkflowRecords = buildExoticWorkflowRecords(outputs.abatementPilotSpecialAssessmentPace || {});
  const unsupportedTriageRules = buildUnsupportedTriageRules(outputs.unsupportedTaxFallbackTriage || {});
  const skippedRecords = buildSkippedRecords(outputs);
  const importValidation = buildImportValidation(outputs.importValidationRuntimeMapping || {});

  const sourceDocuments = [...sourceDocumentsByUrl.values()].sort((a, b) => a.sourceDocumentId.localeCompare(b.sourceDocumentId));
  const counts = buildCounts({
    sourceDocuments,
    sourceRegistryRecords,
    taxRateImportPlans,
    taxRuleRecords,
    localOptionAuthorityRecords,
    exoticWorkflowRecords,
    unsupportedTriageRules,
    skippedRecords,
    importValidation
  });

  return {
    schemaVersion: "retrofi_tax_structured_model_records.v1",
    generatedAt: now,
    sourceArtifact: path.relative(repoRoot, sourceArtifactPath),
    sourceArtifactSchemaVersion: sourceArtifact.schemaVersion,
    safetyPolicy: {
      includeInUserFacingTotalDefault: false,
      customerFacingSavingsDefaultCents: 0,
      notes: [
        "These records are structured import candidates, not a claim that all tax calculations are runtime-ready.",
        "Do not include tax savings in customer-facing totals unless a future runtime package verifies source-backed formula fields, jurisdiction match, and all required taxpayer inputs.",
        "Tax rates and local boundaries must be loaded from official structured sources before nationwide rate calculations are enabled.",
        "Tax-return, tax-bill, assessor, certificate, filing, and program-document gates remain runtime inputs."
      ]
    },
    counts,
    sourceDocuments,
    sourceRegistryRecords,
    taxRateImportPlans,
    taxRuleRecords,
    localOptionAuthorityRecords,
    exoticWorkflowRecords,
    unsupportedTriageRules,
    skippedRecords,
    importValidation,
    validationWarnings
  };
}

function addFootnoteSourceDocuments(sourceReferencesByFile) {
  for (const [sourceFile, references] of Object.entries(sourceReferencesByFile || {})) {
    for (const reference of references || []) {
      addSourceDocuments([reference.url], {
        sourceFile,
        sourceFamily: "citation_reference",
        title: reference.title || "",
        evidenceText: "Trailing GPT Pro citation footnote preserved from source output."
      });
    }
  }
}

function buildSourceRegistryRecords(output) {
  return (output.sourceRegistryAdditions || []).map((row) => {
    const sourceDocumentIds = addSourceDocuments(row.sourceUrls, {
      sourceFile: "output_001_national_source_registry_gap_fill.md",
      sourceFamily: row.taxDataFamily,
      sourceConfidence: row.sourceConfidence,
      evidenceText: row.evidenceText
    });
    return compactObject({
      sourceId: row.sourceId,
      taxDataFamily: row.taxDataFamily,
      jurisdictionLevel: row.jurisdictionLevel,
      jurisdictionsCovered: normalizeList(row.jurisdictionsCovered),
      officialOwner: row.officialOwner || null,
      sourceDocumentIds,
      accessMethod: row.accessMethod || "unknown",
      machineReadable: row.machineReadable,
      fileFormats: normalizeList(row.fileFormats),
      effectiveDateHandling: row.effectiveDateHandling || "",
      refreshCadence: row.refreshCadence || "",
      licensingOrUseNotes: row.licensingOrUseNotes || "",
      runtimeUsePolicy: row.runtimeUsePolicy || "",
      sourceConfidence: normalizeConfidence(row.sourceConfidence),
      implementationPriority: row.implementationPriority || null,
      importStatus: sourceDocumentIds.length ? "source_registry_candidate" : "needs_source_url",
      evidenceText: row.evidenceText || "",
      originalResearchSchema: output.schemaVersion
    });
  });
}

function buildTaxRateImportPlans(output) {
  return (output.statePlans || []).map((row) => {
    const sourceDocumentIds = addSourceDocuments([...(row.sourceUrls || []), ...(row.officialLookupUrls || [])], {
      sourceFile: "output_002_sales_use_tax_rates_boundaries.md",
      sourceFamily: "sales_use_tax_rates_and_boundaries",
      sourceConfidence: row.sourceConfidence,
      evidenceText: row.evidenceText
    });
    return compactObject({
      planId: `sales_use_tax_rate_plan_${normalizeKey(row.state || row.stateFips || "unknown")}_v1`,
      state: row.state || null,
      stateFips: row.stateFips || null,
      taxTypes: ["sales_tax", "use_tax"],
      hasStateSalesTax: row.hasStateSalesTax === true,
      localRatesApply: row.localRatesApply === true,
      bestRateSourceIds: normalizeList(row.bestRateSourceIds),
      bestBoundarySourceIds: normalizeList(row.bestBoundarySourceIds),
      officialLookupUrls: normalizeList(row.officialLookupUrls),
      sourceDocumentIds,
      machineReadableImportReady: row.machineReadableImportReady === true,
      joinKeys: normalizeList(row.joinKeys),
      effectiveDateHandling: row.effectiveDateHandling || "",
      productTaxabilityRequiresSeparateRules: row.productTaxabilityRequiresSeparateRules !== false,
      recommendedRuntimeStatusWhenRateMissing: normalizeRuntimeStatus(row.recommendedRuntimeStatusWhenRateMissing, "source_unavailable"),
      sourceConfidence: normalizeConfidence(row.sourceConfidence),
      evidenceText: row.evidenceText || "",
      importStatus: row.machineReadableImportReady === true ? "structured_import_candidate" : "lookup_or_research_only"
    });
  });
}

function buildSalesUseExemptionRules(output) {
  return (output.rules || []).map((row) => buildTaxRuleRecord({
    row,
    recordType: "sales_use_tax_exemption_taxability_rule",
    sourceFile: "output_003_sales_use_tax_exemptions_taxability.md",
    taxRuleId: row.taxRuleId,
    modelKind: row.modelKind,
    taxTypes: ["sales_tax", "use_tax"],
    geography: geographyFor({ state: row.state, locality: row.locality }),
    eligibleItems: row.eligibleEquipmentOrServices,
    excludedItems: row.excludedEquipmentOrServices,
    formulaText: row.formulaText || `Sales/use tax exemption percent: ${row.exemptionPercent ?? "unknown"}.`,
    formulaExpression: row.exemptionPercent !== undefined ? `eligible_taxable_basis_cents * combined_rate_decimal * ${row.exemptionPercent}` : "",
    caps: { exemptionPercent: row.exemptionPercent ?? null },
    requiredRuntimeInputs: row.requiredRuntimeInputs,
    requiredDocuments: row.requiredDocuments,
    runtimeStatusWhenInputsMissing: row.recommendedRuntimeStatusWhenInputsMissing,
    sourceUrls: row.sourceUrls,
    evidenceText: row.evidenceText,
    sourceConfidence: row.sourceConfidence,
    extra: {
      installationLaborTaxTreatment: row.installationLaborTaxTreatment || "unknown",
      requiresCertificateOrFiling: row.requiresCertificateOrFiling === true,
      effectiveStartDate: row.effectiveStartDate ?? null,
      effectiveEndDate: row.effectiveEndDate ?? null
    }
  }));
}

function buildStateTaxCreditRules(output) {
  return (output.rules || []).map((row) => buildTaxRuleRecord({
    row,
    recordType: "state_tax_credit_exemption_deduction_rule",
    sourceFile: "output_004_state_tax_credits_exemptions_deductions.md",
    taxRuleId: row.taxRuleId,
    modelKind: row.modelKind,
    taxTypes: normalizeList(row.taxType || inferTaxTypeFromModelKind(row.modelKind)),
    geography: geographyFor({ state: row.state }),
    eligibleItems: row.eligibleTechnologies,
    eligibleApplicantTypes: row.eligibleApplicantTypes,
    formulaText: row.formulaText,
    formulaExpression: row.formulaExpression,
    caps: row.caps,
    requiredRuntimeInputs: row.requiredRuntimeInputs,
    requiredDocuments: row.requiredDocuments,
    runtimeStatusWhenInputsMissing: row.recommendedRuntimeStatusWhenInputsMissing,
    sourceUrls: row.sourceUrls,
    evidenceText: row.evidenceText,
    sourceConfidence: row.sourceConfidence,
    extra: {
      refundability: row.refundability || null,
      transferability: row.transferability || null,
      carryforward: row.carryforward || "",
      effectiveStartDate: row.effectiveStartDate ?? null,
      effectiveEndDate: row.effectiveEndDate ?? null
    }
  }));
}

function buildPropertyTaxStatewideRules(output) {
  return (output.rules || []).map((row) => buildTaxRuleRecord({
    row,
    recordType: "property_tax_statewide_rule",
    sourceFile: "output_005_property_tax_statewide_rules.md",
    taxRuleId: row.taxRuleId,
    modelKind: row.modelKind,
    taxTypes: ["property_tax"],
    geography: geographyFor({ state: row.state }),
    eligibleItems: row.eligibleTechnologies,
    eligibleSectors: row.eligibleSectors,
    formulaText: row.formulaText,
    formulaExpression: row.formulaExpression,
    caps: row.caps,
    requiredRuntimeInputs: row.requiredRuntimeInputs,
    requiredDocuments: row.requiredDocuments,
    runtimeStatusWhenInputsMissing: row.recommendedRuntimeStatusWhenInputsMissing,
    sourceUrls: row.sourceUrls,
    evidenceText: row.evidenceText,
    sourceConfidence: row.sourceConfidence,
    extra: {
      ordinaryTaxCounterfactualNeeded: row.ordinaryTaxCounterfactualNeeded === true,
      assessorConfirmationNeeded: row.assessorConfirmationNeeded === true,
      filingDeadline: row.filingDeadline || null,
      effectiveStartDate: row.effectiveStartDate ?? null,
      effectiveEndDate: row.effectiveEndDate ?? null
    }
  }));
}

function buildVerifiedLocalOptionRules(output) {
  return (output.verifiedLocalRules || []).map((row) => buildTaxRuleRecord({
    row,
    recordType: "verified_local_option_tax_rule",
    sourceFile: "output_006_county_city_local_option_incentives.md",
    taxRuleId: row.taxRuleId,
    modelKind: row.modelKind,
    taxTypes: inferTaxTypesForLocalRule(row),
    geography: geographyFor({
      state: row.state,
      county: row.county,
      city: row.city,
      localityGeography: row.localityGeography
    }),
    formulaText: row.formulaText,
    formulaExpression: row.formulaExpression,
    requiredRuntimeInputs: row.requiredRuntimeInputs,
    requiredDocuments: row.requiredDocuments,
    runtimeStatusWhenInputsMissing: row.recommendedRuntimeStatus,
    sourceUrls: row.sourceUrls,
    evidenceText: row.evidenceText,
    sourceConfidence: row.sourceConfidence,
    includeInUserFacingTotalDefault: row.includeInUserFacingTotalDefault === true,
    customerFacingSavingsDefaultCents: Number(row.customerFacingSavingsCentsDefault || 0)
  }));
}

function buildStateBusinessTaxModelRules(output) {
  return (output.stateBusinessTaxModels || []).map((row) => buildTaxRuleRecord({
    row,
    recordType: "state_business_tax_model",
    sourceFile: "output_007_business_tax_gross_receipts_bo.md",
    taxRuleId: `state_business_tax_model_${normalizeKey(row.state || "unknown")}_${shortHash((row.taxTypes || []).join("|"))}`,
    modelKind: normalizeList(row.modelKinds)[0] || "gross_receipts_or_bo_rate_preference",
    taxTypes: row.taxTypes,
    geography: geographyFor({ state: row.state }),
    formulaText: row.formulaText || `State business tax model for ${(row.taxTypes || []).join(", ") || row.state}.`,
    requiredRuntimeInputs: [...normalizeList(row.geographyDerivedInputs), ...normalizeList(row.taxpayerSpecificInputs)],
    requiredDocuments: row.requiredDocuments,
    runtimeStatusWhenInputsMissing: row.supportedRuntimeTreatment,
    sourceUrls: [...normalizeList(row.officialRateSources), ...normalizeList(row.officialFormInstructionSources)],
    evidenceText: row.evidenceText || "",
    sourceConfidence: row.sourceConfidence,
    includeInUserFacingTotalDefault: false,
    extra: {
      supportedRuntimeTreatment: row.supportedRuntimeTreatment || null,
      geographyDerivedInputs: normalizeList(row.geographyDerivedInputs),
      taxpayerSpecificInputs: normalizeList(row.taxpayerSpecificInputs)
    }
  }));
}

function buildMajorLocalBusinessTaxModelRules(output) {
  return (output.majorLocalBusinessTaxModels || []).map((row) => buildTaxRuleRecord({
    row,
    recordType: "major_local_business_tax_model",
    sourceFile: "output_007_business_tax_gross_receipts_bo.md",
    taxRuleId: row.taxRuleId,
    modelKind: "local_business_license_or_receipts_tax",
    taxTypes: normalizeList(row.taxType || "local_business_tax"),
    geography: geographyFor({ state: row.state, city: row.city }),
    formulaText: row.formulaText,
    requiredRuntimeInputs: row.calculationInputs,
    requiredDocuments: row.requiredDocuments,
    runtimeStatusWhenInputsMissing: row.recommendedRuntimeStatus || "needs_tax_return",
    sourceUrls: row.sourceUrls,
    evidenceText: row.evidenceText,
    sourceConfidence: row.sourceConfidence,
    includeInUserFacingTotalDefault: row.includeInUserFacingTotalDefault === true
  }));
}

function buildTaxRuleRecord({
  row,
  recordType,
  sourceFile,
  taxRuleId,
  modelKind,
  taxTypes,
  geography,
  eligibleItems = [],
  eligibleApplicantTypes = [],
  eligibleSectors = [],
  excludedItems = [],
  formulaText = "",
  formulaExpression = "",
  caps = null,
  requiredRuntimeInputs = [],
  requiredDocuments = [],
  runtimeStatusWhenInputsMissing,
  sourceUrls = [],
  evidenceText = "",
  sourceConfidence,
  includeInUserFacingTotalDefault = false,
  customerFacingSavingsDefaultCents = 0,
  extra = {}
}) {
  const sourceDocumentIds = addSourceDocuments(sourceUrls, {
    sourceFile,
    sourceFamily: recordType,
    sourceConfidence,
    evidenceText
  });
  const normalizedModelKind = normalizeModelKind(modelKind);
  const normalizedRuntimeStatus = normalizeRuntimeStatus(runtimeStatusWhenInputsMissing, defaultRuntimeStatusForModelKind(normalizedModelKind));
  return compactObject({
    taxRuleId,
    recordType,
    modelKind: normalizedModelKind,
    taxTypes: normalizeList(taxTypes),
    geography,
    eligibleItems: normalizeList(eligibleItems),
    eligibleApplicantTypes: normalizeList(eligibleApplicantTypes),
    eligibleSectors: normalizeList(eligibleSectors),
    excludedItems: normalizeList(excludedItems),
    formulaText: formulaText || "",
    formulaExpression: formulaExpression || "",
    caps: caps || null,
    requiredRuntimeInputs: normalizeList(requiredRuntimeInputs),
    requiredDocuments: normalizeList(requiredDocuments),
    runtimeStatusWhenInputsMissing: normalizedRuntimeStatus,
    includeInUserFacingTotalDefault: includeInUserFacingTotalDefault === true,
    customerFacingSavingsDefaultCents: Number(customerFacingSavingsDefaultCents || 0),
    sourceConfidence: normalizeConfidence(sourceConfidence),
    sourceDocumentIds,
    evidenceText: evidenceText || "",
    importStatus: sourceDocumentIds.length ? "structured_rule_candidate" : "needs_source_url",
    runtimeReadiness: runtimeReadinessFor({
      sourceDocumentIds,
      requiredRuntimeInputs,
      runtimeStatusWhenInputsMissing: normalizedRuntimeStatus,
      includeInUserFacingTotalDefault
    }),
    originalResearch: compactObject({
      sourceFile,
      schemaVersion: row?.schemaVersion || null,
      sourceRecordId: taxRuleId
    }),
    ...extra
  });
}

function buildLocalOptionAuthorityRecords(output) {
  return (output.localOptionAuthorities || []).map((row) => {
    const sourceDocumentIds = addSourceDocuments(row.stateAuthorityUrls, {
      sourceFile: "output_006_county_city_local_option_incentives.md",
      sourceFamily: "local_option_authority",
      evidenceText: row.evidenceText
    });
    return compactObject({
      authorityId: `local_option_authority_${normalizeKey(row.state || "unknown")}_${shortHash(row.authorityType || "")}`,
      state: row.state || null,
      authorityType: row.authorityType || null,
      geography: geographyFor({ state: row.state }),
      localAdoptionRequired: row.localAdoptionRequired !== false,
      localAdoptionEvidenceNeeded: normalizeList(row.localAdoptionEvidenceNeeded),
      recommendedRuntimeStatusWithoutLocalAdoption: normalizeRuntimeStatus(row.recommendedRuntimeStatusWithoutLocalAdoption, "needs_local_ordinance_confirmation"),
      sourceDocumentIds,
      evidenceText: row.evidenceText || "",
      importStatus: "authority_only_not_runtime_rule"
    });
  });
}

function buildExoticWorkflowRecords(output) {
  return {
    workflowPatterns: (output.workflowPatterns || []).map((row) => ({
      patternId: row.patternId,
      recommendedModelKind: normalizeModelKind(row.recommendedModelKind),
      description: row.description || "",
      whenToCalculate: normalizeList(row.whenToCalculate),
      whenToReturnZero: normalizeList(row.whenToReturnZero),
      requiredDocuments: normalizeList(row.requiredDocuments),
      requiredRuntimeInputs: normalizeList(row.requiredRuntimeInputs),
      customerFacingPolicy: row.customerFacingPolicy || "",
      exampleSourceTypes: normalizeList(row.exampleSourceTypes),
      sourceBackedFacts: normalizeList(row.sourceBackedFacts)
    })),
    opportunityClassificationRules: (output.opportunityClassificationRules || []).map((row) => ({
      ruleId: row.ruleId,
      matchSignals: normalizeList(row.matchSignals),
      recommendedModelKind: normalizeModelKind(row.recommendedModelKind),
      initialRuntimeStatus: normalizeRuntimeStatus(row.initialRuntimeStatus, "unsupported_tax_model"),
      includeInUserFacingTotalDefault: row.includeInUserFacingTotalDefault === true,
      requiredEvidence: normalizeList(row.requiredEvidence),
      doNotInfer: normalizeList(row.doNotInfer),
      sourceBackedRationale: row.sourceBackedRationale || ""
    })),
    unsupportedPatterns: (output.unsupportedPatterns || []).map((row) => ({
      patternId: row.patternId,
      recommendedModelKind: normalizeModelKind(row.recommendedModelKind),
      runtimeStatus: normalizeRuntimeStatus(row.runtimeStatus, "unsupported_tax_model"),
      description: row.description || "",
      returnZeroReason: row.returnZeroReason || "",
      customerFacingSavingsCents: Number(row.customerFacingSavingsCents || 0),
      requiredReviewToReclassify: normalizeList(row.requiredReviewToReclassify),
      sourceDocumentIds: addSourceDocuments(row.sourceUrls, {
        sourceFile: "output_008_abatement_pilot_special_assessment_pace.md",
        sourceFamily: "unsupported_exotic_tax_pattern",
        evidenceText: row.sourceCitation || row.description || ""
      })
    }))
  };
}

function buildUnsupportedTriageRules(output) {
  return (output.triageRules || []).map((row) => {
    const materialUrls = (row.materialEvidence || []).map((evidence) => evidence.sourceUrl).filter(Boolean);
    return compactObject({
      ruleId: row.ruleId,
      sourcePattern: row.sourcePattern || "",
      classification: row.classification || "unsupported_tax_model",
      recommendedRuntimeStatus: normalizeRuntimeStatus(row.recommendedRuntimeStatus, "unsupported_tax_model"),
      customerFacingValueCents: Number(row.customerFacingValueCents || 0),
      repairQueueReason: row.repairQueueReason || "",
      modelKindWhenRepairable: row.modelKindWhenRepairable ? normalizeModelKind(row.modelKindWhenRepairable) : null,
      codexActions: normalizeList(row.codexActions),
      sourceBackedFacts: normalizeList(row.sourceBackedFacts),
      taxpayerSpecificFactsRequired: normalizeList(row.taxpayerSpecificFactsRequired),
      sourceDocumentIds: addSourceDocuments(materialUrls, {
        sourceFile: "output_009_unsupported_tax_fallback_triage.md",
        sourceFamily: "unsupported_tax_fallback_triage",
        evidenceText: row.repairQueueReason || ""
      }),
      examples: normalizeList(row.examples)
    });
  });
}

function buildSkippedRecords(outputs) {
  return [
    ...normalizeSkipped(outputs.nationalSourceRegistryGapFill?.sourcesToSkipForNow, "source_registry_skip", "output_001_national_source_registry_gap_fill.md"),
    ...normalizeSkipped(outputs.salesUseTaxExemptionsTaxability?.ambiguousRulesToSkipForNow, "sales_use_tax_ambiguous_rule", "output_003_sales_use_tax_exemptions_taxability.md"),
    ...normalizeSkipped(outputs.stateTaxCreditsExemptionsDeductions?.rulesToSkipForNow, "state_tax_credit_skip", "output_004_state_tax_credits_exemptions_deductions.md"),
    ...normalizeSkipped(outputs.propertyTaxStatewideRules?.rulesToSkipForNow, "property_tax_statewide_skip", "output_005_property_tax_statewide_rules.md"),
    ...normalizeSkipped(outputs.countyCityLocalOptionIncentives?.highValueLocalitiesNeedingFollowup, "local_option_followup", "output_006_county_city_local_option_incentives.md"),
    ...normalizeSkipped(outputs.countyCityLocalOptionIncentives?.localRulesToSkipForNow, "local_option_skip", "output_006_county_city_local_option_incentives.md"),
    ...normalizeSkipped(outputs.businessTaxGrossReceiptsBo?.rulesToSkipForNow, "business_tax_skip", "output_007_business_tax_gross_receipts_bo.md")
  ];
}

function normalizeSkipped(rows = [], skipType, sourceFile) {
  return (rows || []).map((row, index) => {
    const id = row.skipId || row.taxRuleId || row.sourceId || row.researchId || row.id || `${skipType}_${index + 1}`;
    const sourceDocumentIds = addSourceDocuments([
      ...(row.sourceUrls || []),
      ...(row.exampleSourceUrls || [])
    ], {
      sourceFile,
      sourceFamily: skipType,
      evidenceText: row.evidenceText || row.reason || row.reasonToSkip || ""
    });
    return compactObject({
      skippedRecordId: id,
      skipType,
      jurisdiction: row.jurisdiction || row.locality || row.state || null,
      reason: row.reason || row.reasonToSkip || row.whyNeeded || "",
      recommendedRuntimeStatus: normalizeRuntimeStatus(row.recommendedRuntimeStatus || row.recommendedStatus || row.status, "unsupported_tax_model"),
      customerFacingSavingsCentsDefault: Number(row.customerFacingSavingsCentsDefault || 0),
      sourceDocumentIds,
      evidenceText: row.evidenceText || "",
      sourceFile
    });
  });
}

function buildImportValidation(output) {
  return {
    normalizedDatabaseTables: output.normalizedDatabaseTables || [],
    requiredIndexes: output.requiredIndexes || [],
    validationRules: output.validationRules || [],
    conflictResolutionRules: output.conflictResolutionRules || [],
    effectiveDateRules: output.effectiveDateRules || [],
    runtimeMappingAlgorithm: output.runtimeMappingAlgorithm || [],
    unsupportedFallbackAlgorithm: output.unsupportedFallbackAlgorithm || [],
    refreshCadenceBySourceFamily: output.refreshCadenceBySourceFamily || [],
    testCaseExpansionRecommendations: output.testCaseExpansionRecommendations || [],
    codexImplementationNotes: output.codexImplementationNotes || []
  };
}

function addSourceDocuments(urls = [], context = {}) {
  const ids = [];
  for (const url of normalizeList(urls).map(normalizeMarkdownUrl).filter((value) => value.startsWith("http"))) {
    const canonicalUrl = stripTrackingParams(url);
    const existing = sourceDocumentsByUrl.get(canonicalUrl);
    const sourceDocumentId = existing?.sourceDocumentId || `tax_source_doc_${shortHash(canonicalUrl)}`;
    const next = existing || {
      sourceDocumentId,
      canonicalUrl,
      urlHash: shortHash(canonicalUrl),
      titles: [],
      sourceFiles: [],
      sourceFamilies: [],
      evidenceSnippets: [],
      confidenceHints: []
    };
    pushUnique(next.titles, context.title);
    pushUnique(next.sourceFiles, context.sourceFile);
    pushUnique(next.sourceFamilies, context.sourceFamily);
    pushUnique(next.evidenceSnippets, context.evidenceText);
    pushUnique(next.confidenceHints, context.sourceConfidence);
    sourceDocumentsByUrl.set(canonicalUrl, next);
    ids.push(sourceDocumentId);
  }
  return uniqueStrings(ids);
}

function geographyFor({ state, county, city, locality, localityGeography } = {}) {
  const geography = {
    country: localityGeography?.country || "US",
    states: uniqueStrings([state, localityGeography?.state]),
    stateFips: localityGeography?.stateFips || null,
    counties: uniqueStrings([county, localityGeography?.county]),
    cities: uniqueStrings([city, locality, localityGeography?.city]),
    boroughs: normalizeList(localityGeography?.boroughs),
    placeGeoids: normalizeList(localityGeography?.placeGeoids || localityGeography?.placeGeoid),
    countyFipsList: normalizeList(localityGeography?.countyFipsList || localityGeography?.countyFips)
  };
  return compactObject(geography);
}

function inferTaxTypeFromModelKind(modelKind) {
  const normalized = normalizeModelKind(modelKind);
  if (normalized.startsWith("property_tax") || normalized === "tax_abatement_or_pilot") return "property_tax";
  if (normalized === "sales_use_tax_exemption" || normalized === "sales_use_tax_rate") return ["sales_tax", "use_tax"];
  if (normalized === "gross_receipts_or_bo_rate_preference" || normalized === "local_business_license_or_receipts_tax") return "business_tax";
  if (normalized === "depreciation_or_deduction") return "income_tax";
  return "tax";
}

function inferTaxTypesForLocalRule(row) {
  const text = normalizeKey([row.modelKind, row.taxRuleId, row.formulaText].join(" "));
  if (text.includes("property")) return ["property_tax"];
  if (text.includes("business") || text.includes("gross") || text.includes("bo")) return ["local_business_tax"];
  return normalizeList(inferTaxTypeFromModelKind(row.modelKind));
}

function normalizeModelKind(value) {
  const normalized = String(value || "unsupported_tax_model").trim();
  if (allowedModelKinds.has(normalized)) return normalized;
  if (normalized === "sales_use_tax_exemption") return "sales_use_tax_exemption";
  validationWarnings.push(`Unknown tax model kind "${normalized}" normalized to unsupported_tax_model.`);
  return "unsupported_tax_model";
}

function normalizeRuntimeStatus(value, fallback) {
  const normalized = normalizeKey(value);
  const candidate = statusAliases()[normalized] || String(value || "").trim();
  if (allowedRuntimeStatuses.has(candidate)) return candidate;
  return fallback;
}

function statusAliases() {
  return {
    calculate_with_tax_return_inputs: "needs_tax_return",
    needs_tax_return: "needs_tax_return",
    needs_tax_appetite: "needs_tax_appetite",
    needs_tax_profile: "needs_tax_profile",
    needs_assessor_confirmation: "needs_assessor_confirmation",
    needs_filing_confirmation: "needs_filing_confirmation",
    needs_local_ordinance_confirmation: "needs_local_ordinance_confirmation",
    needs_program_documentation: "needs_program_documentation",
    needs_tax_bill: "needs_tax_bill",
    source_unavailable: "source_unavailable",
    source_inaccessible: "source_unavailable",
    unsupported_tax_model: "unsupported_tax_model",
    human_review_required: "human_review_required",
    not_applicable_zero_value: "not_applicable_zero_value",
    calculated: "calculated",
    suppressed: "suppressed"
  };
}

function defaultRuntimeStatusForModelKind(modelKind) {
  if (modelKind.includes("property_tax") || modelKind === "tax_abatement_or_pilot") return "needs_assessor_confirmation";
  if (modelKind.includes("income") || modelKind.includes("franchise") || modelKind.includes("deduction") || modelKind.includes("gross_receipts")) return "needs_tax_return";
  if (modelKind.includes("sales_use")) return "needs_tax_profile";
  return "unsupported_tax_model";
}

function runtimeReadinessFor({ sourceDocumentIds = [], requiredRuntimeInputs = [], runtimeStatusWhenInputsMissing, includeInUserFacingTotalDefault }) {
  if (!sourceDocumentIds.length) return "blocked_missing_official_source_document";
  if (runtimeStatusWhenInputsMissing === "unsupported_tax_model") return "unsupported_fallback";
  if ((requiredRuntimeInputs || []).length) return "source_backed_requires_runtime_inputs";
  if (includeInUserFacingTotalDefault === true) return "candidate_for_user_facing_after_validation";
  return "source_backed_internal_only_candidate";
}

function normalizeConfidence(value) {
  return ["high", "medium", "low"].includes(value) ? value : "medium";
}

function buildCounts({
  sourceDocuments,
  sourceRegistryRecords,
  taxRateImportPlans,
  taxRuleRecords,
  localOptionAuthorityRecords,
  exoticWorkflowRecords,
  unsupportedTriageRules,
  skippedRecords,
  importValidation
}) {
  return {
    sourceDocumentCount: sourceDocuments.length,
    sourceRegistryRecordCount: sourceRegistryRecords.length,
    taxRateImportPlanCount: taxRateImportPlans.length,
    taxRuleRecordCount: taxRuleRecords.length,
    taxRuleRecordsByRecordType: countBy(taxRuleRecords, (record) => record.recordType),
    taxRuleRecordsByModelKind: countBy(taxRuleRecords, (record) => record.modelKind),
    taxRuleRecordsByRuntimeGate: countBy(taxRuleRecords, (record) => record.runtimeStatusWhenInputsMissing),
    localOptionAuthorityRecordCount: localOptionAuthorityRecords.length,
    exoticWorkflowPatternCount: exoticWorkflowRecords.workflowPatterns.length,
    exoticOpportunityClassificationRuleCount: exoticWorkflowRecords.opportunityClassificationRules.length,
    unsupportedExoticPatternCount: exoticWorkflowRecords.unsupportedPatterns.length,
    unsupportedTriageRuleCount: unsupportedTriageRules.length,
    skippedRecordCount: skippedRecords.length,
    skippedRecordsByType: countBy(skippedRecords, (record) => record.skipType),
    importValidationTableCount: importValidation.normalizedDatabaseTables.length,
    importValidationRuleCount: importValidation.validationRules.length
  };
}

function validateRecords(records) {
  requireUnique(records.sourceDocuments, "sourceDocumentId", "source document");
  requireUnique(records.sourceRegistryRecords, "sourceId", "source registry record");
  requireUnique(records.taxRateImportPlans, "planId", "tax rate import plan");
  requireUnique(records.taxRuleRecords, "taxRuleId", "tax rule record");
  requireUnique(records.unsupportedTriageRules, "ruleId", "unsupported triage rule");

  const sourceDocumentIds = new Set(records.sourceDocuments.map((record) => record.sourceDocumentId));
  for (const record of [...records.sourceRegistryRecords, ...records.taxRateImportPlans, ...records.taxRuleRecords, ...records.skippedRecords]) {
    for (const sourceDocumentId of record.sourceDocumentIds || []) {
      if (!sourceDocumentIds.has(sourceDocumentId)) validationWarnings.push(`${record.taxRuleId || record.sourceId || record.planId || record.skippedRecordId} references missing source document ${sourceDocumentId}.`);
    }
  }

  for (const record of records.taxRuleRecords) {
    if (!record.taxRuleId) validationWarnings.push("A tax rule record is missing taxRuleId.");
    if (!allowedModelKinds.has(record.modelKind)) validationWarnings.push(`${record.taxRuleId} has unsupported modelKind ${record.modelKind}.`);
    if (!allowedRuntimeStatuses.has(record.runtimeStatusWhenInputsMissing)) validationWarnings.push(`${record.taxRuleId} has unsupported runtimeStatusWhenInputsMissing ${record.runtimeStatusWhenInputsMissing}.`);
    if (record.includeInUserFacingTotalDefault === true) validationWarnings.push(`${record.taxRuleId} is marked user-facing by default; review before runtime import.`);
    if (!record.sourceDocumentIds?.length) validationWarnings.push(`${record.taxRuleId} has no sourceDocumentIds.`);
  }

  if (records.taxRateImportPlans.length !== 51) validationWarnings.push(`Expected 51 state/DC sales-use tax plans; found ${records.taxRateImportPlans.length}.`);
  if (records.taxRuleRecords.length !== sourceArtifact.counts?.trackedRuleCount) {
    validationWarnings.push(`Expected ${sourceArtifact.counts?.trackedRuleCount} tracked tax rule records from research counts; built ${records.taxRuleRecords.length}.`);
  }
}

function requireUnique(rows, key, label) {
  const seen = new Set();
  for (const row of rows || []) {
    const value = row?.[key];
    if (!value) {
      validationWarnings.push(`A ${label} is missing ${key}.`);
      continue;
    }
    if (seen.has(value)) validationWarnings.push(`Duplicate ${label} ${key}: ${value}.`);
    seen.add(value);
  }
}

function buildReport(records) {
  return [
    "# Structured Tax Model Records Report",
    "",
    `Generated at: ${records.generatedAt}`,
    `Source artifact: \`${records.sourceArtifact}\``,
    "",
    "## Counts",
    "",
    `- Source documents: ${records.counts.sourceDocumentCount}`,
    `- Source registry records: ${records.counts.sourceRegistryRecordCount}`,
    `- State/DC sales-use tax import plans: ${records.counts.taxRateImportPlanCount}`,
    `- Tax rule records: ${records.counts.taxRuleRecordCount}`,
    `- Local-option authority records: ${records.counts.localOptionAuthorityRecordCount}`,
    `- Unsupported triage rules: ${records.counts.unsupportedTriageRuleCount}`,
    `- Skipped/gap records: ${records.counts.skippedRecordCount}`,
    `- Import validation rules: ${records.counts.importValidationRuleCount}`,
    "",
    "## Tax Rule Records By Type",
    "",
    ...Object.entries(records.counts.taxRuleRecordsByRecordType).map(([key, value]) => `- ${key}: ${value}`),
    "",
    "## Runtime Gates",
    "",
    ...Object.entries(records.counts.taxRuleRecordsByRuntimeGate).map(([key, value]) => `- ${key}: ${value}`),
    "",
    "## Safety",
    "",
    "- All normalized records default to customer-facing value of `$0` unless a later runtime package explicitly validates formula, jurisdiction, source confidence, and required taxpayer inputs.",
    "- This file is appropriate for future importer/runtime mapping work; it is not a nationwide tax-rate database yet.",
    "",
    "## Import And Normalization Warnings",
    "",
    ...(records.validationWarnings.length ? records.validationWarnings.map((warning) => `- ${warning}`) : ["- None"]),
    ""
  ].join("\n");
}

function readJson(filePath) {
  return JSON.parse(fs.readFileSync(filePath, "utf8"));
}

function writeJson(filePath, value) {
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  fs.writeFileSync(filePath, `${JSON.stringify(value, null, 2)}\n`, "utf8");
}

function normalizeList(value) {
  const values = Array.isArray(value) ? value : [value];
  return uniqueStrings(values.flatMap((item) => {
    if (item === undefined || item === null || item === "") return [];
    return [typeof item === "string" ? item.trim() : item];
  }));
}

function uniqueStrings(values) {
  return [...new Set((values || []).filter((value) => value !== undefined && value !== null && value !== ""))];
}

function pushUnique(target, value) {
  if (!value) return;
  if (!target.includes(value)) target.push(value);
}

function countBy(values, keyFn) {
  return (values || []).reduce((counts, value) => {
    const key = keyFn(value) || "unknown";
    counts[key] = (counts[key] || 0) + 1;
    return counts;
  }, {});
}

function compactObject(value) {
  return Object.fromEntries(Object.entries(value).filter(([, item]) => {
    if (item === undefined || item === null) return false;
    if (typeof item === "object" && !Array.isArray(item) && Object.keys(item).length === 0) return false;
    return true;
  }));
}

function normalizeMarkdownUrl(value) {
  const text = String(value || "").trim();
  const directMarkdown = text.match(/^\[(https?:\/\/[^\]]+)\]\((https?:\/\/[^)]+)\)$/i);
  if (directMarkdown) return directMarkdown[2];
  const labelMarkdown = text.match(/^\[[^\]]+\]\((https?:\/\/[^)]+)\)$/i);
  if (labelMarkdown) return labelMarkdown[1];
  return text;
}

function stripTrackingParams(value) {
  try {
    const url = new URL(value);
    for (const key of [...url.searchParams.keys()]) {
      if (key.toLowerCase().startsWith("utm_")) url.searchParams.delete(key);
    }
    return url.toString();
  } catch {
    return value;
  }
}

function normalizeKey(value) {
  return String(value || "")
    .trim()
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "_")
    .replace(/^_+|_+$/g, "");
}

function shortHash(value) {
  let hash = 2166136261;
  for (const char of String(value || "")) {
    hash ^= char.charCodeAt(0);
    hash = Math.imul(hash, 16777619);
  }
  return (hash >>> 0).toString(16);
}
