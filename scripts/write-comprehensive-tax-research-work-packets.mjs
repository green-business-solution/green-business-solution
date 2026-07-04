import fs from "node:fs";
import path from "node:path";

const repoRoot = path.resolve(import.meta.dirname, "..");
const defaultDate = "2026-07-04";
const defaultOutputDir = path.join(repoRoot, "GPT Pro Work", `tax-comprehensive-model-research-${defaultDate}`);

function parseArgs(argv) {
  const options = {
    date: defaultDate,
    outputDir: defaultOutputDir
  };

  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index];
    const next = argv[index + 1];
    if (arg === "--date" && next) {
      options.date = next;
      options.outputDir = path.join(repoRoot, "GPT Pro Work", `tax-comprehensive-model-research-${next}`);
      index += 1;
      continue;
    }
    if (arg === "--output-dir" && next) {
      options.outputDir = path.resolve(repoRoot, next);
      index += 1;
      continue;
    }
    if (arg === "--help" || arg === "-h") {
      options.help = true;
      continue;
    }
    throw new Error(`Unknown argument: ${arg}`);
  }

  return options;
}

function writeComprehensiveTaxResearchWorkPackets(options = {}) {
  const date = options.date || defaultDate;
  const outputDir = options.outputDir || defaultOutputDir;
  const framework = readJson("data/tax_model_framework.json");
  const registry = readJson("data/tax_source_registry_seed.json");
  const existingTaxResearch = readJson("data/tax_official_dataset_rule_research_gpt_pro_2026-07-03.json");
  const currentTaxPackages = compactTaxPackages(readJson("data/opportunity_incentive_calculation_packages_v2.json").packages || []);
  const currentRules = compactRuntimeTaxRules(readJson("data/tax_geography_rules.json").rules || []);
  const currentWorkflows = compactLocalTaxWorkflows(readJson("data/tax_local_workflow_rules.json").workflows || []);

  const context = {
    date,
    frameworkSummary: {
      runtimeStatuses: framework.runtimeStatuses.map((status) => status.status),
      modelKinds: framework.modelKinds.map((model) => ({
        kind: model.kind,
        taxTypes: model.taxTypes,
        commonGates: model.commonGates,
        userFacingPolicy: model.userFacingPolicy
      }))
    },
    registrySummary: registry.sourceFamilies.map((family) => ({
      taxDataFamily: family.taxDataFamily,
      priority: family.priority,
      modelKindsSupported: family.modelKindsSupported,
      runtimeGoal: family.runtimeGoal,
      refreshCadence: family.refreshCadence
    })),
    priorResearchCounts: existingTaxResearch.counts || {},
    currentTaxPackages,
    currentRules,
    currentWorkflows
  };

  const prompts = buildPrompts(context);

  fs.mkdirSync(outputDir, { recursive: true });
  writeFileStrict(
    path.join(outputDir, "README.md"),
    [
      "# Comprehensive Tax Model Research",
      "",
      "Run these prompts with GPT Pro and paste responses into the matching output files.",
      "Each prompt must return JSON only. The outputs are intended to populate future tax source registry, rule, and model imports.",
      "This folder is ignored from git and can be archived to the development S3 bucket after use.",
      ""
    ].join("\n")
  );

  for (const prompt of prompts) {
    writeFileStrict(path.join(outputDir, prompt.promptFile), prompt.content);
    writeFileStrict(path.join(outputDir, prompt.outputFile), "");
  }

  writeFileStrict(
    path.join(outputDir, "target_context_summary.json"),
    `${JSON.stringify(
      {
        schemaVersion: "retrofi_comprehensive_tax_research_context.v1",
        generatedAt: new Date().toISOString(),
        promptCount: prompts.length,
        promptFiles: prompts.map((prompt) => prompt.promptFile),
        outputFiles: prompts.map((prompt) => prompt.outputFile),
        modelKinds: context.frameworkSummary.modelKinds.map((model) => model.kind),
        sourceFamilies: context.registrySummary.map((family) => family.taxDataFamily),
        currentTaxPackageCount: currentTaxPackages.length,
        currentRuntimeRuleCount: currentRules.length,
        currentLocalWorkflowCount: currentWorkflows.length
      },
      null,
      2
    )}\n`
  );

  return {
    outputDir,
    promptCount: prompts.length
  };
}

function buildPrompts(context) {
  return [
    packet(
      1,
      "national_source_registry_gap_fill",
      "National Tax Source Registry Gap Fill",
      context,
      `Build a source-backed national tax source registry expansion plan. Use the current source registry seed as the base and fill gaps across all tax data families.

Return JSON only:
{
  "schemaVersion": "retrofi_tax_source_registry_gap_fill.v1",
  "researchedAt": "${context.date}",
  "source": "gpt_pro",
  "sourceRegistryAdditions": [
    {
      "sourceId": "",
      "taxDataFamily": "",
      "jurisdictionLevel": "",
      "jurisdictionsCovered": [],
      "officialOwner": "",
      "sourceUrls": [],
      "accessMethod": "download | API | lookup_tool | PDF | HTML_table | statute | regulation | form_instruction | municipal_code | GIS_service | unknown",
      "machineReadable": true,
      "fileFormats": [],
      "effectiveDateHandling": "",
      "refreshCadence": "",
      "licensingOrUseNotes": "",
      "runtimeUsePolicy": "",
      "sourceConfidence": "high | medium | low",
      "implementationPriority": "high | medium | low"
    }
  ],
  "sourcesToSkipForNow": [],
  "sourcesNeedingCodexStructuredImport": [],
  "sourcesNeedingFurtherGPTResearch": []
}`
    ),
    packet(
      2,
      "sales_use_tax_rates_boundaries",
      "Sales And Use Tax Rates And Boundaries",
      context,
      `Research official sales/use tax rate and boundary data for all states and DC. Prioritize machine-readable rate files, official APIs, SST member files, and official address lookup rules. Include no-sales-tax states with zero-rate handling.

Return JSON only:
{
  "schemaVersion": "retrofi_sales_use_tax_import_plan.v1",
  "researchedAt": "${context.date}",
  "source": "gpt_pro",
  "statePlans": [
    {
      "state": "",
      "stateFips": "",
      "hasStateSalesTax": true,
      "localRatesApply": true,
      "bestRateSourceIds": [],
      "bestBoundarySourceIds": [],
      "officialLookupUrls": [],
      "machineReadableImportReady": false,
      "joinKeys": [],
      "effectiveDateHandling": "",
      "productTaxabilityRequiresSeparateRules": true,
      "recommendedRuntimeStatusWhenRateMissing": "unsupported_tax_model | source_unavailable | needs_tax_profile",
      "sourceConfidence": "high | medium | low",
      "evidenceText": ""
    }
  ],
  "normalizationNotes": [],
  "validationRules": []
}`
    ),
    packet(
      3,
      "sales_use_tax_exemptions_taxability",
      "Sales And Use Tax Exemptions And Retrofit Taxability",
      context,
      `Research source-backed state and local sales/use tax exemptions and taxability rules relevant to energy efficiency, renewable energy, EV charging, storage, building equipment, installation labor, and contractor labor.

Return JSON only:
{
  "schemaVersion": "retrofi_sales_use_tax_exemption_taxability_research.v1",
  "researchedAt": "${context.date}",
  "source": "gpt_pro",
  "rules": [
    {
      "taxRuleId": "",
      "modelKind": "sales_use_tax_exemption",
      "state": "",
      "locality": null,
      "eligibleEquipmentOrServices": [],
      "excludedEquipmentOrServices": [],
      "exemptionPercent": 1,
      "requiresCertificateOrFiling": false,
      "installationLaborTaxTreatment": "taxable | exempt | mixed | unknown",
      "effectiveStartDate": null,
      "effectiveEndDate": null,
      "requiredRuntimeInputs": [],
      "recommendedRuntimeStatusWhenInputsMissing": "needs_tax_profile | needs_filing_confirmation | unsupported_tax_model",
      "sourceUrls": [],
      "evidenceText": "",
      "sourceConfidence": "high | medium | low"
    }
  ],
  "statesWithNoRelevantExemptionFound": [],
  "ambiguousRulesToSkipForNow": []
}`
    ),
    packet(
      4,
      "state_tax_credits_exemptions_deductions",
      "State Tax Credits Exemptions And Deductions",
      context,
      `Research state-level clean-energy and efficiency tax credits, income/franchise tax credits, deductions, depreciation-style benefits, refundability, carryforward, transferability, and direct-pay/cash-equivalent provisions.

Return JSON only:
{
  "schemaVersion": "retrofi_state_tax_credit_exemption_deduction_research.v1",
  "researchedAt": "${context.date}",
  "source": "gpt_pro",
  "rules": [
    {
      "taxRuleId": "",
      "modelKind": "state_income_or_franchise_tax_credit | depreciation_or_deduction | property_tax_exemption | unsupported_tax_model",
      "state": "",
      "taxType": "",
      "eligibleTechnologies": [],
      "eligibleApplicantTypes": [],
      "formulaText": "",
      "formulaExpression": "",
      "caps": {},
      "refundability": "refundable | nonrefundable | partially_refundable | unknown | not_applicable",
      "transferability": "transferable | non_transferable | unknown | not_applicable",
      "carryforward": "",
      "requiredRuntimeInputs": [],
      "requiredDocuments": [],
      "effectiveStartDate": null,
      "effectiveEndDate": null,
      "recommendedRuntimeStatusWhenInputsMissing": "needs_tax_return | needs_tax_appetite | needs_filing_confirmation | unsupported_tax_model",
      "sourceUrls": [],
      "evidenceText": "",
      "sourceConfidence": "high | medium | low"
    }
  ],
  "rulesToSkipForNow": []
}`
    ),
    packet(
      5,
      "property_tax_statewide_rules",
      "Property Tax Statewide Exemptions Credits And Special Valuations",
      context,
      `Research statewide property-tax exemptions, credits, special valuations, nameplate-capacity tax substitutes, renewable valuation formulas, and filing deadlines relevant to retrofits.

Return JSON only:
{
  "schemaVersion": "retrofi_property_tax_statewide_rule_research.v1",
  "researchedAt": "${context.date}",
  "source": "gpt_pro",
  "rules": [
    {
      "taxRuleId": "",
      "modelKind": "property_tax_exemption | property_tax_credit | property_tax_special_valuation | tax_abatement_or_pilot | unsupported_tax_model",
      "state": "",
      "eligibleTechnologies": [],
      "eligibleSectors": [],
      "formulaText": "",
      "formulaExpression": "",
      "ordinaryTaxCounterfactualNeeded": true,
      "assessorConfirmationNeeded": true,
      "filingDeadline": null,
      "requiredRuntimeInputs": [],
      "requiredDocuments": [],
      "effectiveStartDate": null,
      "effectiveEndDate": null,
      "recommendedRuntimeStatusWhenInputsMissing": "needs_tax_bill | needs_assessor_confirmation | needs_filing_confirmation | unsupported_tax_model",
      "sourceUrls": [],
      "evidenceText": "",
      "sourceConfidence": "high | medium | low"
    }
  ],
  "statesWithNoRelevantStatewideRuleFound": [],
  "rulesToSkipForNow": []
}`
    ),
    packet(
      6,
      "county_city_local_option_incentives",
      "County City Local Option Incentives",
      context,
      `Research county/city/local-option clean-energy tax incentives and local-option authority. Focus on direct official local adoption evidence where possible. If only state enabling authority exists, do not mark runtime-ready.

Return JSON only:
{
  "schemaVersion": "retrofi_county_city_local_option_tax_research.v1",
  "researchedAt": "${context.date}",
  "source": "gpt_pro",
  "localOptionAuthorities": [
    {
      "state": "",
      "authorityType": "property_tax_credit | property_tax_exemption | green_building_credit | renewable_energy_exemption | abatement | other",
      "stateAuthorityUrls": [],
      "localAdoptionRequired": true,
      "localAdoptionEvidenceNeeded": [],
      "recommendedRuntimeStatusWithoutLocalAdoption": "needs_local_ordinance_confirmation"
    }
  ],
  "verifiedLocalRules": [
    {
      "taxRuleId": "",
      "modelKind": "property_tax_credit | property_tax_exemption | tax_abatement_or_pilot | unsupported_tax_model",
      "state": "",
      "county": null,
      "city": null,
      "localityGeography": {},
      "formulaText": "",
      "requiredRuntimeInputs": [],
      "requiredDocuments": [],
      "sourceUrls": [],
      "evidenceText": "",
      "sourceConfidence": "high | medium | low"
    }
  ],
  "highValueLocalitiesNeedingFollowup": [],
  "localRulesToSkipForNow": []
}`
    ),
    packet(
      7,
      "business_tax_gross_receipts_bo",
      "Business Income Franchise Gross Receipts B&O And Local Business Taxes",
      context,
      `Research state and major local business tax models relevant to tax opportunities: corporate income, franchise, gross receipts, B&O, CAT, local business license taxes, local income taxes, tax-rate preferences, and credits.

Return JSON only:
{
  "schemaVersion": "retrofi_business_tax_model_research.v1",
  "researchedAt": "${context.date}",
  "source": "gpt_pro",
  "stateBusinessTaxModels": [
    {
      "state": "",
      "taxTypes": [],
      "modelKinds": [],
      "officialRateSources": [],
      "officialFormInstructionSources": [],
      "geographyDerivedInputs": [],
      "taxpayerSpecificInputs": [],
      "supportedRuntimeTreatment": "calculate_with_tax_return_inputs | needs_tax_return | needs_tax_appetite | unsupported_tax_model",
      "sourceConfidence": "high | medium | low"
    }
  ],
  "majorLocalBusinessTaxModels": [
    {
      "taxRuleId": "",
      "state": "",
      "city": "",
      "taxType": "",
      "formulaText": "",
      "calculationInputs": [],
      "includeInUserFacingTotalDefault": false,
      "sourceUrls": [],
      "evidenceText": "",
      "sourceConfidence": "high | medium | low"
    }
  ],
  "rulesToSkipForNow": []
}`
    ),
    packet(
      8,
      "abatement_pilot_special_assessment_pace",
      "Abatement PILOT Special Assessment PACE And Exotic Tax Workflows",
      context,
      `Research tax-like workflows that may appear in DSIRE or local sources but are not simple credits/exemptions: PILOTs, special assessments, PACE, enterprise/renaissance zones, negotiated abatements, utility tax substitutes, nameplate taxes, and economic-development tax agreements.

Return JSON only:
{
  "schemaVersion": "retrofi_exotic_tax_workflow_research.v1",
  "researchedAt": "${context.date}",
  "source": "gpt_pro",
  "workflowPatterns": [
    {
      "patternId": "",
      "recommendedModelKind": "tax_abatement_or_pilot | property_tax_special_valuation | unsupported_tax_model",
      "description": "",
      "whenToCalculate": [],
      "whenToReturnZero": [],
      "requiredDocuments": [],
      "requiredRuntimeInputs": [],
      "customerFacingPolicy": "",
      "exampleSourceTypes": []
    }
  ],
  "opportunityClassificationRules": [],
  "unsupportedPatterns": []
}`
    ),
    packet(
      9,
      "unsupported_tax_fallback_triage",
      "Unsupported Tax Fallback And Opportunity Triage",
      context,
      `Design conservative fallback behavior for future tax-related opportunities that do not map to a supported model. Include exact triage rules Codex should use when importing or repairing opportunities.

Return JSON only:
{
  "schemaVersion": "retrofi_unsupported_tax_fallback_triage.v1",
  "researchedAt": "${context.date}",
  "source": "gpt_pro",
  "triageRules": [
    {
      "ruleId": "",
      "sourcePattern": "",
      "classification": "supported_model | unsupported_tax_model | non_tax_workflow | source_unavailable | archive_candidate",
      "recommendedRuntimeStatus": "",
      "customerFacingValueCents": 0,
      "repairQueueReason": "",
      "examples": []
    }
  ],
  "unsupportedModelUserFacingCopy": [],
  "adminReviewQueueReasons": [],
  "archiveOrSuppressRules": []
}`
    ),
    packet(
      10,
      "import_validation_runtime_mapping",
      "Import Validation And Runtime Mapping",
      context,
      `Design the import validation, conflict handling, and runtime mapping algorithm for comprehensive tax data. This should tell Codex how to turn GPT Pro research and structured official files into tax model records safely.

Return JSON only:
{
  "schemaVersion": "retrofi_tax_import_validation_runtime_mapping.v1",
  "researchedAt": "${context.date}",
  "source": "gpt_pro",
  "normalizedDatabaseTables": [],
  "requiredIndexes": [],
  "validationRules": [],
  "conflictResolutionRules": [],
  "effectiveDateRules": [],
  "runtimeMappingAlgorithm": [],
  "unsupportedFallbackAlgorithm": [],
  "refreshCadenceBySourceFamily": [],
  "testCaseExpansionRecommendations": [],
  "codexImplementationNotes": []
}`
    )
  ];
}

function packet(number, slug, title, context, taskBody) {
  const padded = String(number).padStart(3, "0");
  return {
    promptFile: `prompt_${padded}_${slug}.md`,
    outputFile: `output_${padded}_${slug}.md`,
    content: `${baseInstructions(title, context)}

${taskBody}
`
  };
}

function baseInstructions(title, context) {
  return `You are helping RetroFi build a comprehensive source-backed tax calculation database.

Task: ${title}
Research date: ${context.date}

Hard rules:
- Return JSON only. No markdown outside the JSON object.
- Use official tax agency, statute, regulation, assessor, treasurer, municipal code, official form instruction, or official GIS/data sources wherever possible.
- Do not invent rates, formulas, local adoptions, effective dates, or taxability treatment.
- Separate source-backed facts from taxpayer-specific facts.
- If a tax area cannot be verified or modeled, mark it unsupported_tax_model, source_unavailable, or needs_* input/review status.
- Customer-facing savings must be $0 unless the formula, jurisdiction, source confidence, and required runtime inputs support inclusion.
- Include source URLs and concise evidence text for every material claim.

RetroFi model framework summary:
\`\`\`json
${JSON.stringify(context.frameworkSummary, null, 2)}
\`\`\`

RetroFi source registry seed summary:
\`\`\`json
${JSON.stringify(context.registrySummary, null, 2)}
\`\`\`

Current RetroFi tax packages:
\`\`\`json
${JSON.stringify(context.currentTaxPackages, null, 2)}
\`\`\`

Current runtime tax geography rules:
\`\`\`json
${JSON.stringify(context.currentRules, null, 2)}
\`\`\`

Current local tax workflow examples:
\`\`\`json
${JSON.stringify(context.currentWorkflows, null, 2)}
\`\`\`
`;
}

function compactTaxPackages(packages) {
  return packages
    .filter((pkg) =>
      (pkg.effects || []).some((effect) =>
        ["tax_credit", "tax_exemption", "tax_abatement", "tax_rate_preference", "property_tax_valuation"].includes(effect.effect_type)
      )
    )
    .map((pkg) => ({
      opportunityId: pkg.opportunity_id,
      programName: pkg.program_name,
      calculationStatus: pkg.calculation_status,
      geography: pkg.geography,
      effects: (pkg.effects || []).map((effect) => ({
        effectId: effect.effect_id,
        effectType: effect.effect_type,
        expressionId: effect.calculation?.expression_id || null,
        valueModelKind: effect.repair_metadata?.value_model_kind || null,
        cashValueClassification: effect.repair_metadata?.cash_value_classification || null,
        humanReviewRequired: effect.repair_metadata?.human_review_required === true,
        estimateStatus: effect.repair_metadata?.tax_package_repair?.display_recommendation?.estimateStatus || null,
        variables: effect.calculation?.variables || [],
        requiredInputs: (effect.required_inputs || []).map((input) => input.input_key || input.inputKey).filter(Boolean)
      }))
    }));
}

function compactRuntimeTaxRules(rules) {
  return rules.map((rule) => ({
    id: rule.id,
    taxType: rule.taxType,
    ruleKind: rule.ruleKind,
    geography: rule.geography,
    opportunityIds: rule.opportunityIds,
    effectiveStartDate: rule.effectiveStartDate,
    effectiveEndDate: rule.effectiveEndDate,
    sourceConfidence: rule.sourceConfidence,
    localityMatters: rule.localityMatters,
    derivedInputKeys: (rule.derivedInputs || []).map((input) => input.inputKey),
    requiredUserInputKeys: (rule.requiredUserInputs || []).map((input) => input.inputKey),
    humanReviewRequired: rule.humanReviewRequired,
    sourceUrls: rule.sourceUrls
  }));
}

function compactLocalTaxWorkflows(workflows) {
  return workflows.slice(0, 20).map((workflow) => ({
    id: workflow.id,
    taxDomain: workflow.taxDomain,
    taxType: workflow.taxType,
    calculationStatus: workflow.calculationStatus,
    geography: workflow.geography,
    opportunityIds: workflow.opportunityIds,
    requiredInputs: workflow.requiredInputs,
    calculationModelIds: (workflow.calculationModels || []).map((model) => model.modelId),
    includeInUserFacingTotalDefault: workflow.includeInUserFacingTotalDefault === true,
    sourceConfidence: workflow.sourceConfidence || null
  }));
}

function readJson(relativePath) {
  return JSON.parse(fs.readFileSync(path.join(repoRoot, relativePath), "utf8"));
}

function writeFileStrict(filePath, content) {
  if (fs.existsSync(filePath)) {
    const existing = fs.readFileSync(filePath, "utf8");
    if (existing.trim()) throw new Error(`Refusing to overwrite non-empty file: ${filePath}`);
  }
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  fs.writeFileSync(filePath, content.endsWith("\n") ? content : `${content}\n`, "utf8");
}

function printHelp() {
  console.log(`Usage: node scripts/write-comprehensive-tax-research-work-packets.mjs [options]

Options:
  --date 2026-07-04
  --output-dir "GPT Pro Work/tax-comprehensive-model-research-2026-07-04"
`);
}

const options = parseArgs(process.argv.slice(2));
if (options.help) {
  printHelp();
} else {
  const result = writeComprehensiveTaxResearchWorkPackets(options);
  console.log(`Wrote ${result.promptCount} comprehensive tax research prompts to ${result.outputDir}`);
}
