import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const scriptPath = fileURLToPath(import.meta.url);
const repoRoot = path.resolve(path.dirname(scriptPath), "..");

const defaultDate = "2026-07-03";
const defaultTaxDatasetDir = path.join(repoRoot, "GPT Pro Work", `tax-official-dataset-rule-research-${defaultDate}`);
const defaultTestCaseDir = path.join(repoRoot, "GPT Pro Work", `test-case-tax-document-updates-${defaultDate}`);

export function parseArgs(argv) {
  const options = {
    date: defaultDate,
    taxDatasetDir: defaultTaxDatasetDir,
    testCaseDir: defaultTestCaseDir
  };

  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index];
    const next = argv[index + 1];
    if (arg === "--date" && next) {
      options.date = next;
      options.taxDatasetDir = path.join(repoRoot, "GPT Pro Work", `tax-official-dataset-rule-research-${next}`);
      options.testCaseDir = path.join(repoRoot, "GPT Pro Work", `test-case-tax-document-updates-${next}`);
      index += 1;
      continue;
    }
    if (arg === "--tax-dataset-dir" && next) {
      options.taxDatasetDir = resolveRepoPath(next);
      index += 1;
      continue;
    }
    if (arg === "--test-case-dir" && next) {
      options.testCaseDir = resolveRepoPath(next);
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

export function writeTaxResearchWorkPackets(options = {}) {
  const date = options.date || defaultDate;
  const taxDatasetDir = options.taxDatasetDir || defaultTaxDatasetDir;
  const testCaseDir = options.testCaseDir || defaultTestCaseDir;

  const taxGeographyRules = readJson("data/tax_geography_rules.json");
  const sampleProfiles = readJson("data/sample_user_profiles.json");
  const incentivePackages = readJson("data/opportunity_incentive_calculation_packages_v2.json");

  const taxTargetPackages = compactTaxTargetPackages(incentivePackages.packages || []);
  const profileSummaries = sampleProfiles.map(compactSampleProfile);
  const jurisdictionSummaries = compactJurisdictionSummaries(profileSummaries);
  const currentTaxRules = compactTaxRules(taxGeographyRules.rules || []);

  fs.mkdirSync(taxDatasetDir, { recursive: true });
  fs.mkdirSync(testCaseDir, { recursive: true });

  const taxPrompts = buildTaxDatasetPrompts({
    date,
    currentTaxRules,
    taxTargetPackages,
    jurisdictionSummaries
  });

  writeReadme(taxDatasetDir, "Official Tax Dataset And Rule Research", [
    "Run these prompts first. They ask GPT Pro to build the official-source map and normalized rule recommendations that will feed the tax geography/rule database.",
    "Paste GPT Pro responses into the matching output files. Keep output JSON only."
  ]);
  for (const prompt of taxPrompts) {
    writeFileStrict(path.join(taxDatasetDir, prompt.promptFile), prompt.content);
    writeFileStrict(path.join(taxDatasetDir, prompt.outputFile), "");
  }

  writeReadme(testCaseDir, "Test Case Tax Document Updates", [
    "Run these prompts after or alongside official tax dataset/rule research. They ask GPT Pro to create realistic synthetic tax-document fixtures for all 50 sample test cases.",
    "Paste GPT Pro responses into the matching output files. Keep output JSON only."
  ]);
  const profileBatches = chunk(profileSummaries, 10);
  for (let index = 0; index < profileBatches.length; index += 1) {
    const batchNumber = index + 1;
    const start = index * 10 + 1;
    const end = start + profileBatches[index].length - 1;
    const padded = String(batchNumber).padStart(3, "0");
    const promptFile = `prompt_${padded}_test_case_tax_documents_profiles_${String(start).padStart(2, "0")}_${String(end).padStart(2, "0")}.md`;
    const outputFile = `output_${padded}_test_case_tax_documents_profiles_${String(start).padStart(2, "0")}_${String(end).padStart(2, "0")}.md`;
    writeFileStrict(
      path.join(testCaseDir, promptFile),
      buildTestCaseTaxDocumentPrompt({
        date,
        batchNumber,
        start,
        end,
        profiles: profileBatches[index],
        currentTaxRules,
        taxTargetPackages
      })
    );
    writeFileStrict(path.join(testCaseDir, outputFile), "");
  }

  return {
    taxDatasetDir,
    testCaseDir,
    taxPromptCount: taxPrompts.length,
    testCasePromptCount: profileBatches.length
  };
}

function buildTaxDatasetPrompts({ date, currentTaxRules, taxTargetPackages, jurisdictionSummaries }) {
  return [
    {
      promptFile: "prompt_001_national_tax_dataset_source_catalog.md",
      outputFile: "output_001_national_tax_dataset_source_catalog.md",
      content: `${baseTaxDatasetInstructions({ date, taskName: "National official tax dataset source catalog" })}

Task:
Build a national official-source catalog for tax datasets RetroFi should use to minimize user-entered tax inputs.

Cover these tax data families:
- state sales and use tax rate/boundary datasets, APIs, downloadable files, and local-option addenda;
- state and local property tax datasets, including assessor, treasurer, parcel, millage, exemption, abatement, and taxing district sources;
- state income/franchise/gross receipts/B&O/CAT/excise tax rate and form sources relevant to business incentives;
- local business tax sources such as city B&O, gross receipts, local income, and occupational taxes where applicable;
- program-specific tax incentive statutes, manuals, application guides, and annual reporting sources.

For each source, identify whether it is machine-readable, official but manual/PDF, official lookup-only, or not currently usable.

Return JSON only using this schema:
\`\`\`json
{
  "schemaVersion": "retrofi_official_tax_dataset_source_catalog.v1",
  "researchedAt": "${date}",
  "source": "gpt_pro",
  "datasetFamilies": [
    {
      "taxDataFamily": "sales_use_tax | property_tax | state_business_tax | local_business_tax | tax_incentive_rules | parcel_boundary | assessor_boundary | special_district_boundary",
      "jurisdictionLevel": "federal | state | county | city | municipality | special_district | mixed",
      "jurisdictionsCovered": [],
      "officialSourceName": "",
      "officialOwner": "",
      "sourceUrls": [],
      "machineReadable": true,
      "accessMethod": "download | API | lookup_tool | PDF | HTML_table | GIS_service | unknown",
      "fileFormats": [],
      "updateFrequency": "",
      "effectiveDateHandling": "",
      "addressOrGeographyJoinKeys": [],
      "licensingOrUseNotes": "",
      "priority": "high | medium | low",
      "implementationNotes": "",
      "sourceConfidence": "high | medium | low"
    }
  ],
  "recommendedFirstImports": [],
  "datasetsNeedingGPTProGapResearch": [],
  "humanReviewWarnings": []
}
\`\`\`
`
    },
    {
      promptFile: "prompt_002_sales_use_tax_rate_boundary_rules.md",
      outputFile: "output_002_sales_use_tax_rate_boundary_rules.md",
      content: `${baseTaxDatasetInstructions({ date, taskName: "Sales and use tax rate/boundary rule research" })}

Task:
Research the official sources and normalized rule model for sales/use tax rate lookup. Prioritize official state revenue departments, Streamlined Sales Tax rate/boundary files, and official address lookup APIs where available.

For each U.S. state and DC, determine:
- whether the state has sales/use tax;
- whether local rates apply;
- whether official rate/boundary files or APIs exist;
- whether lookup requires address, ZIP+4, county/city, coordinates, or special district;
- whether product category exemptions may matter for retrofit equipment/labor;
- whether installation labor is taxable by default or requires category-specific review.

Return JSON only using this schema:
\`\`\`json
{
  "schemaVersion": "retrofi_sales_use_tax_rule_research.v1",
  "researchedAt": "${date}",
  "source": "gpt_pro",
  "stateRules": [
    {
      "state": "CA",
      "stateFips": "06",
      "hasStateSalesTax": true,
      "localRatesApply": true,
      "officialRateSources": [],
      "officialBoundarySources": [],
      "lookupTools": [],
      "machineReadableImportPlan": "",
      "addressResolutionNeeded": true,
      "joinKeys": [],
      "equipmentTaxabilityDefault": "taxable | exempt | category_specific | unknown",
      "installationLaborTaxabilityDefault": "taxable | exempt | category_specific | unknown",
      "retrofitSpecificNotes": [],
      "effectiveDateRules": "",
      "refreshFrequency": "",
      "sourceConfidence": "high | medium | low",
      "humanReviewRequired": false,
      "humanReviewReasons": []
    }
  ],
  "normalizedRuleSchemaRecommendations": {},
  "importPriorityOrder": [],
  "validationRules": []
}
\`\`\`
`
    },
    {
      promptFile: "prompt_003_property_tax_assessor_boundary_rules.md",
      outputFile: "output_003_property_tax_assessor_boundary_rules.md",
      content: `${baseTaxDatasetInstructions({ date, taskName: "Property tax assessor, millage, parcel, and exemption rule research" })}

Task:
Research official property-tax datasets and rules needed to estimate retrofit-related property-tax effects. Focus on official assessor/treasurer/taxing-district/parcel boundary sources and state/local exemption or special valuation rules.

Return a practical database-building plan. Do not try to list every county parcel file if impossible; classify states by whether centralized official data exists, local county/city research is required, or only assessor review is realistic.

Also research the current tax rules already in RetroFi:
\`\`\`json
${JSON.stringify(currentTaxRules.filter((rule) => rule.taxType.includes("property")), null, 2)}
\`\`\`

Return JSON only using this schema:
\`\`\`json
{
  "schemaVersion": "retrofi_property_tax_dataset_rule_research.v1",
  "researchedAt": "${date}",
  "source": "gpt_pro",
  "statePropertyTaxData": [
    {
      "state": "",
      "stateFips": "",
      "centralizedOfficialParcelData": "yes | partial | no | unknown",
      "centralizedOfficialAssessmentData": "yes | partial | no | unknown",
      "centralizedOfficialTaxRateOrMillageData": "yes | partial | no | unknown",
      "officialSources": [],
      "localAssessorResearchRequired": true,
      "commonJoinKeys": [],
      "effectiveDateHandling": "",
      "retrofitRelevantExemptionsOrSpecialValuations": [],
      "recommendedRetroFiTreatment": "calculate_from_official_data | needs_tax_bill | needs_assessor_review | suppress_until_review",
      "sourceConfidence": "high | medium | low"
    }
  ],
  "specificRuleRepairs": [],
  "normalizedRuleSchemaRecommendations": {},
  "requiredUserOrDocumentInputs": [],
  "refreshPlan": []
}
\`\`\`
`
    },
    {
      promptFile: "prompt_004_business_tax_income_franchise_gross_receipts_rules.md",
      outputFile: "output_004_business_tax_income_franchise_gross_receipts_rules.md",
      content: `${baseTaxDatasetInstructions({ date, taskName: "Business tax rule research" })}

Task:
Research official state and major local business tax sources needed to estimate tax incentives and tax-rate preferences. Include corporate income tax, franchise tax, gross receipts tax, Washington B&O, Ohio CAT, Texas franchise/margins tax, local gross receipts/B&O/local income taxes where common, and tax-credit filing sources.

For each state and major local special case, identify:
- official rate/source tables;
- filing form or instruction sources;
- whether geography can derive the jurisdiction;
- which inputs require taxpayer tax-return/accountant data;
- whether values should be included in user-facing totals or gated.

Use these current RetroFi tax target packages as concrete cases:
\`\`\`json
${JSON.stringify(taxTargetPackages, null, 2)}
\`\`\`

Return JSON only using this schema:
\`\`\`json
{
  "schemaVersion": "retrofi_business_tax_rule_research.v1",
  "researchedAt": "${date}",
  "source": "gpt_pro",
  "stateBusinessTaxRules": [
    {
      "state": "",
      "taxTypes": [],
      "officialRateSources": [],
      "officialFormInstructionSources": [],
      "geographyDerivedInputs": [],
      "taxpayerSpecificInputs": [],
      "retrofitOrIncentiveRelevance": "",
      "recommendedEstimateStatus": "deterministic_with_tax_return_inputs | needs_accountant_review | not_calculable | suppress_until_review",
      "sourceConfidence": "high | medium | low"
    }
  ],
  "majorLocalBusinessTaxSources": [],
  "specificRuleRepairs": [],
  "normalizedRuleSchemaRecommendations": {},
  "validationRules": []
}
\`\`\`
`
    },
    {
      promptFile: "prompt_005_current_retrofi_tax_rule_repairs.md",
      outputFile: "output_005_current_retrofi_tax_rule_repairs.md",
      content: `${baseTaxDatasetInstructions({ date, taskName: "Current RetroFi tax rule repair" })}

Task:
Repair and enrich the current RetroFi tax rules so Codex can update \`data/tax_geography_rules.json\` and v2 tax calculation packages safely.

Current tax geography rules:
\`\`\`json
${JSON.stringify(currentTaxRules, null, 2)}
\`\`\`

Current tax target packages:
\`\`\`json
${JSON.stringify(taxTargetPackages, null, 2)}
\`\`\`

For each current rule/package:
- verify official source URLs;
- correct formula/rate constants;
- identify required geography-derived, source-derived, user, document, accountant, and assessor inputs;
- define when calculation should be deterministic, needs property-tax profile, needs accountant review, or suppressed;
- identify any missing aliases needed by existing v2 package input keys;
- provide exact normalized \`derivedInputs\`, \`requiredUserInputs\`, \`serverDerivableInputs\`, \`calculationImpact\`, and \`humanReviewReasons\`.

Return JSON only using this schema:
\`\`\`json
{
  "schemaVersion": "retrofi_current_tax_rule_repairs.v1",
  "researchedAt": "${date}",
  "source": "gpt_pro",
  "repairs": [
    {
      "ruleId": "",
      "opportunityId": "",
      "recommendedAction": "replace_rule | amend_rule | no_change | archive_rule",
      "sourceConfidence": "high | medium | low",
      "taxType": "",
      "ruleKind": "",
      "geography": {},
      "effectiveStartDate": null,
      "effectiveEndDate": null,
      "derivedInputs": [],
      "requiredUserInputs": [],
      "serverDerivableInputs": [],
      "calculationImpact": {},
      "localityMatters": true,
      "localityExplanation": "",
      "sourceUrls": [],
      "evidenceText": "",
      "humanReviewRequired": true,
      "humanReviewReasons": []
    }
  ],
  "newRulesToAdd": [],
  "rulesToRemove": [],
  "notesForCodexImporter": []
}
\`\`\`
`
    },
    {
      promptFile: "prompt_006_tax_rule_import_validation_refresh_plan.md",
      outputFile: "output_006_tax_rule_import_validation_refresh_plan.md",
      content: `${baseTaxDatasetInstructions({ date, taskName: "Tax rule import validation and refresh plan" })}

Task:
Design the validation/import/refresh approach for RetroFi's future tax dataset database. This should tell Codex exactly how to validate GPT Pro-researched tax data before importing it.

Use these current sample profile jurisdictions to prioritize practical coverage:
\`\`\`json
${JSON.stringify(jurisdictionSummaries, null, 2)}
\`\`\`

Return JSON only using this schema:
\`\`\`json
{
  "schemaVersion": "retrofi_tax_dataset_import_validation_refresh_plan.v1",
  "researchedAt": "${date}",
  "source": "gpt_pro",
  "recommendedDatabaseTables": [],
  "ruleVersioningModel": {},
  "effectiveDateModel": {},
  "sourceConfidenceModel": {},
  "importValidationRules": [],
  "crossSourceConsistencyChecks": [],
  "addressGeographyJoinPlan": [],
  "refreshSchedulesByDatasetFamily": [],
  "failureAndStalenessPolicy": [],
  "adminReviewQueueReasons": [],
  "firstImplementationMilestones": []
}
\`\`\`
`
    }
  ];
}

function baseTaxDatasetInstructions({ date, taskName }) {
  return `You are helping RetroFi build a source-backed tax dataset and rule database.

Task name: ${taskName}
Research date: ${date}

Rules:
- Use official government, utility, tax agency, assessor, treasurer, statutory, regulatory, or filed-tariff sources wherever possible.
- Prefer machine-readable official sources over third-party summaries.
- Do not invent rates, jurisdictions, formulas, or effective dates.
- If official data is not complete, mark the gap and state the safest user-facing behavior.
- Separate geography-derived facts from taxpayer/project-specific facts.
- Separate source confidence from estimate confidence.
- Return JSON only. No markdown outside the JSON object.
- Use source URLs and concise evidence text for every material claim.
`;
}

function buildTestCaseTaxDocumentPrompt({ date, batchNumber, start, end, profiles, currentTaxRules, taxTargetPackages }) {
  return `You are helping RetroFi create realistic synthetic tax-document fixtures for sample test cases.

Task: Create synthetic tax documents and tax-profile extracted values for sample profiles ${start}-${end}.
Research date: ${date}
Batch number: ${batchNumber}

Important constraints:
- These are synthetic test fixtures, not real confidential tax documents.
- Values should be realistic for the profile's location, organization type, building type, size, and utility profile, but they must be marked synthetic.
- Do not claim the synthetic values came from real public documents.
- Use public/official tax rules only to shape plausible fields and document types.
- Do not overfit to a tax incentive. Include the documents a real user would likely upload so RetroFi can later calculate or review tax effects.
- Minimize user input by pre-populating values that a tax document could plausibly provide, but mark every value with sourceType = "synthetic_tax_document".
- If a value would normally require accountant or assessor confirmation, include it as a review item rather than a trusted final answer.
- Return JSON only. No markdown outside the JSON object.

Current RetroFi tax geography rules:
\`\`\`json
${JSON.stringify(currentTaxRules, null, 2)}
\`\`\`

Current tax target packages:
\`\`\`json
${JSON.stringify(taxTargetPackages, null, 2)}
\`\`\`

Target sample profiles:
\`\`\`json
${JSON.stringify(profiles, null, 2)}
\`\`\`

Return JSON only using this schema:
\`\`\`json
{
  "schemaVersion": "retrofi_test_case_tax_document_updates.v1",
  "researchedAt": "${date}",
  "source": "gpt_pro",
  "batchNumber": ${batchNumber},
  "profileTaxDocumentUpdates": [
    {
      "sampleUserId": "",
      "profileSummary": {
        "companyName": "",
        "siteAddress": "",
        "state": "",
        "organizationType": "",
        "buildingType": "",
        "squareFootage": null
      },
      "syntheticTaxFiles": [
        {
          "fileId": "",
          "clientIntakeId": "",
          "siteId": "",
          "originalFilename": "",
          "taxDocumentType": "property_tax_bill | assessor_notice | business_tax_return_summary | gross_receipts_tax_workpaper | sales_use_tax_workpaper | tax_credit_form | exemption_certificate | abatement_approval_letter | local_tax_bill | other",
          "taxYear": 2026,
          "jurisdiction": "",
          "issuingAuthority": "",
          "syntheticNotice": "Synthetic estimated tax profile for test fixtures; not an actual tax document.",
          "processingStatus": "processed",
          "uploadedAt": "2026-07-03T00:00:00.000Z",
          "processedAt": "2026-07-03T00:00:00.000Z"
        }
      ],
      "syntheticTaxExtractedValues": [
        {
          "extractedValueId": "",
          "clientIntakeId": "",
          "fileId": "",
          "fieldId": "",
          "fieldDisplayName": "",
          "value": null,
          "unit": "USD | cents | decimal | percent | date | text | boolean | kW AC | square_feet | other",
          "taxYear": 2026,
          "periodStart": null,
          "periodEnd": null,
          "confidence": "high | medium | low",
          "sourceType": "synthetic_tax_document",
          "sourceText": "Synthetic GPT Pro estimate based on public profile, location, business type, square footage, and tax-document fixture assumptions.",
          "sourcePath": ""
        }
      ],
      "taxProfileFacts": [
        {
          "inputKey": "",
          "value": null,
          "sourceFileId": "",
          "sourceStrategy": "synthetic_tax_document | accountant_review | assessor_review | admin_review",
          "uiPlacement": "tax_profile | property_tax_profile | organization_profile | admin_only | hidden_derived",
          "userOverrideAllowed": true,
          "defaultIsSynthetic": true,
          "confidenceImpactUntilConfirmed": "high | medium | low"
        }
      ],
      "opportunitySpecificTaxInputs": [
        {
          "opportunityId": "",
          "inputKey": "",
          "value": null,
          "sourceFileId": "",
          "estimateStatusIfUsed": "deterministic_estimate | needs_accountant_review | needs_assessor_review | needs_property_tax_profile | suppressed",
          "includeInUserFacingTotalBeforeConfirmation": false,
          "notes": ""
        }
      ],
      "missingOrReviewInputs": [],
      "sourceUrlsChecked": [],
      "reasoningNotes": ""
    }
  ],
  "globalWarnings": []
}
\`\`\`
`;
}

function compactTaxTargetPackages(packages) {
  return packages
    .filter((pkg) =>
      (pkg.effects || []).some(
        (effect) =>
          ["tax_credit", "tax_exemption", "property_tax_valuation"].includes(effect.effect_type) ||
          effect.calculation?.tax_benefit_classification ||
          /tax_(credit|exemption|rate|abatement|valuation)/.test(JSON.stringify(effect.calculation || {}))
      )
    )
    .map((pkg) => ({
      opportunityId: pkg.opportunity_id,
      programName: pkg.program_name,
      calculationStatus: pkg.calculation_status,
      geography: pkg.geography,
      effects: (pkg.effects || []).map((effect) => ({
        effectType: effect.effect_type,
        expressionId: effect.calculation?.expression_id || null,
        expression: effect.calculation?.expression || null,
        taxBenefitClassification: effect.calculation?.tax_benefit_classification || null,
        cashValueClassification: effect.calculation?.cash_value_classification || null,
        displayRecommendation: effect.calculation?.display_recommendation || null,
        variables: effect.calculation?.variables || [],
        requiredInputs: (effect.required_inputs || []).map((input) => ({
          inputKey: input.input_key,
          label: input.label,
          valueType: input.value_type,
          sourcePrecedence: input.source_precedence,
          uiPlacement: input.ui_placement,
          missingSeverity: input.missing_severity,
          userOverrideAllowed: input.user_override_allowed
        }))
      }))
    }));
}

function compactTaxRules(rules) {
  return rules.map((rule) => ({
    id: rule.id,
    version: rule.version,
    active: rule.active,
    taxType: rule.taxType,
    ruleKind: rule.ruleKind,
    geography: rule.geography,
    opportunityIds: rule.opportunityIds,
    effectiveStartDate: rule.effectiveStartDate,
    effectiveEndDate: rule.effectiveEndDate,
    sourceConfidence: rule.sourceConfidence,
    localityMatters: rule.localityMatters,
    derivedInputs: rule.derivedInputs,
    requiredUserInputs: rule.requiredUserInputs,
    serverDerivableInputs: rule.serverDerivableInputs,
    calculationImpact: rule.calculationImpact,
    humanReviewRequired: rule.humanReviewRequired,
    humanReviewReasons: rule.humanReviewReasons,
    sourceUrls: rule.sourceUrls,
    evidenceText: rule.evidenceText
  }));
}

function compactSampleProfile(profile) {
  const utilitySummaries = profile.siteEnergyProfile?.utilitySummaries || [];
  return {
    sampleUserId: profile.sampleUserId,
    companyName: profile.companyName,
    website: profile.website,
    organizationType: profile.organizationType,
    organizationSize: profile.organizationSize,
    siteAddress: profile.siteAddress,
    state: parseState(profile.siteAddress),
    electricUtilityProvider: profile.electricUtilityProvider,
    gasUtilityProvider: profile.gasUtilityProvider,
    ownershipStatus: profile.ownershipStatus,
    buildingType: profile.buildingType,
    squareFootage: numberFromText(profile.squareFootage),
    primaryActivityText: profile.primaryActivityText,
    naicsCodes: profile.naicsCodes || [],
    projectStage: profile.project?.stage || null,
    annualUtilitySummaries: utilitySummaries.map((summary) => ({
      utilityCategory: summary.utilityCategory,
      utilityProvider: summary.latestUtilityProvider,
      annualUsage: summary.annualUsage,
      annualCost: summary.annualCost,
      averageUnitCost: summary.averageUnitCost,
      usageUnit: summary.usageUnit
    })),
    publicSourceNotes: profile.publicSourceNotes,
    notes: profile.notes
  };
}

function compactJurisdictionSummaries(profileSummaries) {
  const byState = new Map();
  for (const profile of profileSummaries) {
    const state = profile.state || "unknown";
    if (!byState.has(state)) byState.set(state, []);
    byState.get(state).push({
      sampleUserId: profile.sampleUserId,
      companyName: profile.companyName,
      siteAddress: profile.siteAddress,
      organizationType: profile.organizationType,
      buildingType: profile.buildingType
    });
  }
  return [...byState.entries()]
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([state, profiles]) => ({ state, profiles }));
}

function parseState(address) {
  const match = String(address || "").match(/,\s*([A-Z]{2})\s+\d{5}/);
  return match?.[1] || null;
}

function numberFromText(value) {
  const number = Number(String(value || "").replace(/[^0-9.]/g, ""));
  return Number.isFinite(number) && number > 0 ? number : null;
}

function chunk(values, size) {
  const batches = [];
  for (let index = 0; index < values.length; index += size) {
    batches.push(values.slice(index, index + size));
  }
  return batches;
}

function writeReadme(directory, title, notes) {
  writeFileStrict(
    path.join(directory, "README.md"),
    [`# ${title}`, "", ...notes.map((note) => `- ${note}`), ""].join("\n")
  );
}

function readJson(relativePath) {
  return JSON.parse(fs.readFileSync(path.join(repoRoot, relativePath), "utf8"));
}

function writeFileStrict(filePath, content) {
  if (fs.existsSync(filePath)) {
    const existing = fs.readFileSync(filePath, "utf8");
    if (existing.trim()) {
      throw new Error(`Refusing to overwrite non-empty file: ${filePath}`);
    }
  }
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  fs.writeFileSync(filePath, `${content.trimEnd()}\n`, "utf8");
}

function resolveRepoPath(value) {
  return path.resolve(repoRoot, value);
}

function printHelp() {
  console.log(`Usage: node scripts/write-tax-research-gpt-pro-work-packets.mjs [options]

Options:
  --date 2026-07-03
  --tax-dataset-dir "GPT Pro Work/tax-official-dataset-rule-research-2026-07-03"
  --test-case-dir "GPT Pro Work/test-case-tax-document-updates-2026-07-03"
`);
}

async function main() {
  const options = parseArgs(process.argv.slice(2));
  if (options.help) {
    printHelp();
    return;
  }
  const result = writeTaxResearchWorkPackets(options);
  console.log(`Wrote ${result.taxPromptCount} tax dataset/rule prompts to ${result.taxDatasetDir}`);
  console.log(`Wrote ${result.testCasePromptCount} test-case tax document prompts to ${result.testCaseDir}`);
}

if (process.argv[1] === scriptPath) {
  main().catch((error) => {
    console.error(error instanceof Error ? error.message : error);
    process.exitCode = 1;
  });
}
