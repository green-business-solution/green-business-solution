import fs from 'node:fs'
import path from 'node:path'

const CURRENT_DATE = '2026-07-04'
const BASE_DIR = path.join(
  process.cwd(),
  'GPT Pro Work',
  `grant-production-quality-${CURRENT_DATE}`
)

const PACKAGE_SOURCE = path.join(
  process.cwd(),
  'data',
  'opportunity_incentive_calculation_packages_v2.json'
)
const TEST_CASE_SOURCE = path.join(process.cwd(), 'public', 'sample_matching_test_cases.json')
const AUDIT_SOURCE = path.join(
  process.cwd(),
  'data',
  'blocked_suppressed_package_audit_2026-07-04.json'
)

const force = process.argv.includes('--force')

function readJson(filePath) {
  return JSON.parse(fs.readFileSync(filePath, 'utf8'))
}

function writeJson(filePath, value) {
  fs.writeFileSync(filePath, `${JSON.stringify(value, null, 2)}\n`)
}

function slugify(value) {
  return String(value || 'untitled')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 72)
}

function compactMoney(cents) {
  if (!Number.isFinite(cents)) return null
  return `$${Math.round(cents / 100).toLocaleString('en-US')}`
}

function isGrantLikeEffect(effect) {
  const repair = effect?.repair_metadata || {}
  const cashClass = repair.cash_value_classification
  const valueModel = repair.value_model_kind
  return (
    effect?.effect_type === 'grant_expected_value' ||
    cashClass === 'cash_grant' ||
    cashClass === 'reimbursement' ||
    valueModel === 'formula_grant' ||
    valueModel === 'competitive_cost_share' ||
    valueModel === 'competitive_award_range' ||
    valueModel === 'competitive_max_only'
  )
}

function compactRequiredInput(input) {
  if (typeof input === 'string') return input
  return {
    input_key: input?.input_key,
    label: input?.label,
    value_type: input?.value_type,
    missing_severity: input?.missing_severity,
    source_precedence: input?.source_precedence,
  }
}

function compactEffect(effect) {
  return {
    effect_id: effect.effect_id,
    label: effect.label,
    effect_type: effect.effect_type,
    cash_flow_direction: effect.cash_flow_direction,
    timing: effect.timing,
    calculation: effect.calculation,
    limits: effect.limits,
    caps: effect.caps,
    required_inputs: (effect.required_inputs || []).map(compactRequiredInput),
    repair_metadata: effect.repair_metadata,
    confidence: effect.confidence,
  }
}

function compactMeasureCatalog(catalog) {
  return {
    catalog_id: catalog.catalog_id,
    name: catalog.name,
    selection_input: catalog.selection_input,
    measure_count: catalog.measures?.length || 0,
    sample_measures: (catalog.measures || []).slice(0, 12).map((measure) => ({
      measure_id: measure.measure_id,
      name: measure.name,
      category: measure.category,
      calculation: measure.calculation,
      limits: measure.limits,
      required_inputs: measure.required_inputs,
      source_row: measure.source_row,
    })),
  }
}

function compactRateTable(table) {
  return {
    table_id: table.table_id,
    name: table.name,
    dimensions: table.dimensions,
    row_count: table.rows?.length || 0,
    sample_rows: (table.rows || []).slice(0, 16),
  }
}

function compactPackage(pkg, auditTarget = null) {
  const grantEffects = (pkg.effects || []).filter(isGrantLikeEffect)
  return {
    opportunity_id: pkg.opportunity_id,
    program_name: pkg.program_name,
    calculation_status: pkg.calculation_status,
    availability: pkg.availability,
    customer_segments: pkg.customer_segments,
    retrofit_types: pkg.retrofit_types,
    geography: pkg.geography,
    effects: grantEffects.map(compactEffect),
    input_requirements: (pkg.input_requirements || []).map(compactRequiredInput),
    measure_catalogs: (pkg.measure_catalogs || []).map(compactMeasureCatalog),
    rate_tables: (pkg.rate_tables || []).map(compactRateTable),
    global_limits: pkg.global_limits,
    global_caps: pkg.global_caps,
    stacking: pkg.stacking,
    assumptions: pkg.assumptions,
    source_evidence: pkg.source_evidence,
    confidence: pkg.confidence,
    auditTarget: auditTarget
      ? {
          recommendation: auditTarget.auditRecommendation,
          evaluationCount: auditTarget.evaluationCount,
          outcomeClassCounts: auditTarget.outcomeClassCounts,
          runtimeInclusionStatusCounts: auditTarget.runtimeInclusionStatusCounts,
          topHumanReviewReasons: auditTarget.topHumanReviewReasons,
          topConfidenceReasonCodes: auditTarget.topConfidenceReasonCodes,
          topDefaultedInputs: auditTarget.topDefaultedInputs,
          exampleRows: auditTarget.exampleRows,
        }
      : null,
  }
}

function summarizeGrantProfile(grant) {
  if (!grant) return null
  const compactFact = (fact) => ({
    inputKey: fact.inputKey,
    value: fact.value,
    valueType: fact.valueType,
    sourceStrategy: fact.sourceStrategy,
    confidence: fact.confidence,
    confidenceImpactUntilConfirmed: fact.confidenceImpactUntilConfirmed,
    userOverrideAllowed: fact.userOverrideAllowed,
    retrofitTypeId: fact.retrofitTypeId,
    opportunityId: fact.opportunityId,
    estimateStatusIfUsed: fact.estimateStatusIfUsed,
    defaultIsSynthetic: fact.defaultIsSynthetic,
    reasoning: fact.reasoning,
  })

  return {
    grantProfileConfidence: grant.grantProfileConfidence,
    grantProfileNotes: grant.grantProfileNotes,
    syntheticGrantProfileDataNotice: grant.syntheticGrantProfileDataNotice,
    grantProfileFacts: (grant.grantProfileFacts || []).map(compactFact),
    grantRetrofitProjectInputs: (grant.grantRetrofitProjectInputs || []).map((entry) => ({
      retrofitTypeId: entry.retrofitTypeId,
      expectedHandling: entry.expectedHandling,
      inputFacts: (entry.inputFacts || []).map(compactFact),
      reasoning: entry.reasoning,
    })),
    grantOpportunitySpecificInputs: (grant.grantOpportunitySpecificInputs || []).map((entry) => ({
      opportunityId: entry.opportunityId,
      expectedHandling: entry.expectedHandling,
      inputFacts: (entry.inputFacts || []).map(compactFact),
      reasoning: entry.reasoning,
    })),
    grantMissingOrReviewInputs: grant.grantMissingOrReviewInputs || [],
    grantDoNotForceQualificationReasons: grant.grantDoNotForceQualificationReasons || [],
  }
}

function isGrantLikeOpportunity(opp) {
  const programType = `${opp?.sourceSummary?.programType || ''} ${opp?.opportunityName || ''}`
  return /grant|reimbursement|funding|cost.share|award/i.test(programType)
}

function compactPackageSummary(summary) {
  const grantEffects = (summary.effectSummaries || []).filter((effect) =>
    /grant|reimbursement|cash_grant/i.test(
      `${effect.effectType || ''} ${effect.cashValueClassification || ''} ${effect.valueModelKind || ''}`
    )
  )
  if (grantEffects.length === 0 && !/grant/i.test(summary.programName || '')) return null
  return {
    opportunityId: summary.opportunityId,
    programName: summary.programName,
    calculationStatus: summary.calculationStatus,
    sourceStatus: summary.sourceStatus,
    confidence: summary.confidence,
    includedInRuntimeTotals: summary.includedInRuntimeTotals,
    runtimeInclusionStatus: summary.runtimeInclusionStatus,
    missingInputs: summary.missingInputs,
    requiredInputs: summary.requiredInputs,
    defaultedInputs: (summary.defaultedInputs || []).slice(0, 30),
    totals: summary.totals,
    effectSummaries: grantEffects,
  }
}

function compactRetrofitForProfilePrompt(retrofit) {
  const preview = retrofit.savingsPreview || {}
  const packageSummaries = (preview.incentiveCalculationPackageSummaries || [])
    .map(compactPackageSummary)
    .filter(Boolean)
  const grantOpps = (retrofit.opportunities || []).filter(isGrantLikeOpportunity).map((opp) => ({
    opportunityId: opp.opportunityId,
    opportunityName: opp.opportunityName,
    eligibilityStatus: opp.eligibilityStatus,
    rankScore: opp.rankScore,
    opportunityDataConfidence: opp.opportunityDataConfidence,
    sourceUrl: opp.sourceUrl,
    websiteUrl: opp.websiteUrl,
    applicationUrl: opp.applicationUrl,
    retrofitTypeIds: opp.retrofitTypeIds,
    sourceSummary: opp.sourceSummary,
    matchedReasons: opp.matchedReasons,
    unresolvedRequirements: opp.unresolvedRequirements,
    blockers: opp.blockers,
  }))

  return {
    retrofitTypeId: retrofit.retrofitTypeId,
    displayName: retrofit.displayName,
    parentCategory: retrofit.parentCategory,
    typicalComponents: retrofit.typicalComponents,
    savingsPreview: {
      status: preview.status,
      upfrontCostCents: preview.upfrontCostCents,
      upfrontCost: compactMoney(preview.upfrontCostCents),
      oneTimeSavingsCents: preview.oneTimeSavingsCents,
      annualRecurringSavingsCents: preview.annualRecurringSavingsCents,
      annualRecurringExpensesCents: preview.annualRecurringExpensesCents,
      incentiveCalculationPackageCounts: preview.incentiveCalculationPackageCounts,
      costBreakdown: (preview.costBreakdown || []).map((entry) => ({
        category: entry.category,
        label: entry.label,
        amountCents: entry.amountCents,
        source: entry.source,
        formula: entry.formula,
      })),
    },
    matchedGrantLikeOpportunities: grantOpps,
    matchedGrantPackageSummaries: packageSummaries,
  }
}

function compactTestCase(testCase) {
  const profile = testCase.normalizedProfile || {}
  const retrofits = (testCase.retrofits || [])
    .map(compactRetrofitForProfilePrompt)
    .filter(
      (retrofit) =>
        retrofit.matchedGrantLikeOpportunities.length > 0 ||
        retrofit.matchedGrantPackageSummaries.length > 0
    )

  return {
    sampleUserId: testCase.sampleUserId,
    description: testCase.description,
    normalizedProfile: {
      business: profile.business,
      site: profile.site,
      project: profile.project,
    },
    currentGrantProfile: summarizeGrantProfile(profile.grant),
    grantRelevantRetrofits: retrofits,
  }
}

function promptHeader(promptId, title) {
  return `You are helping RetroFi improve grant estimation to production quality.

Current date: ${CURRENT_DATE}. Program status, funding windows, budgets, award history, and deadlines are time-sensitive. Use official sources wherever possible.

# ${title}

Prompt ID: ${promptId}
`
}

function packageRepairPrompt(promptId, target, index, total) {
  return `${promptHeader(promptId, `Grant Package Production Repair ${index} of ${total}`)}

Your job is to repair one RetroFi grant/reimbursement calculation package so it can support conservative, production-quality estimation.

We need source-backed metadata, not optimistic marketing language. A source saying "up to $X" is a cap, not an expected value. If the grant is competitive and no defensible probability anchor exists, return a suppressed recommendation instead of inventing a number.

## Return JSON only

Return exactly one JSON object, no markdown fences:

{
  "schemaVersion": "retrofi_grant_package_production_repair.v1",
  "researchedAt": "${CURRENT_DATE}",
  "promptId": "${promptId}",
  "repairs": [
    {
      "opportunityId": "string",
      "programName": "string",
      "availabilityStatus": "active|upcoming|closed|exhausted|waitlist|source_inaccessible|unknown",
      "sourceConfidence": "high|medium|low",
      "cashValueClassification": "cash_grant|reimbursement|rebate|tax_credit|loan|financing|technical_assistance|unknown",
      "valueModelKind": "fixed_amount|fixed_tier_amount|percent_of_eligible_cost|capped_percent_of_eligible_cost|per_unit_award|hybrid_rate_plus_cap|competitive_max_only|competitive_award_range|competitive_cost_share|formula_grant|study_or_audit_grant|rebate_labeled_as_grant|loan_or_financing_labeled_as_grant|tax_credit_mixed_with_grant|non_cash_technical_assistance|no_calculable_value|source_inaccessible|other",
      "conditionalAwardModel": {
        "status": "calculable|needs_project_cost|needs_quote|needs_project_scope|not_calculable|zero_value|source_inaccessible",
        "formulaText": "string",
        "amountCents": null,
        "minAwardCents": null,
        "maxAwardCents": null,
        "costSharePercent": null,
        "eligibleCostCategories": ["string"],
        "ineligibleCostCategories": ["string"],
        "caps": {
          "maxAwardCents": null,
          "maxPercentOfEligibleCost": null,
          "maxUnits": null,
          "perCustomerCapCents": null,
          "programBudgetCents": null
        },
        "requiredInputs": [
          {
            "inputKey": "string",
            "valueType": "money_cents|number|boolean|enum|string|date",
            "inputSource": "source_constant|server_derivable|user_profile|retrofit_scope|quote_or_invoice|utility_bill|tax_document|application_or_award_document|human_review",
            "isUserOverrideAllowed": true,
            "whyNeeded": "string"
          }
        ],
        "calculationTraceTemplate": ["string"]
      },
      "probabilityModel": {
        "probabilityRequired": true,
        "probabilityDiscount": null,
        "probabilityEvidenceType": "not_required|historical_success_rate|budget_and_expected_awards|historical_awards_only|first_come_funds_confirmed|first_come_funding_unknown|scoring_criteria_only|eligibility_only|human_reviewed_prior|none",
        "historicalAwardsCount": null,
        "historicalApplicationsCount": null,
        "totalProgramBudgetCents": null,
        "expectedAwardCount": null,
        "averageHistoricalAwardCents": null,
        "medianHistoricalAwardCents": null,
        "competitionScope": "narrow_local|utility_territory|sector_specific|statewide_broad|federal_broad|unknown",
        "probabilityNotes": "string"
      },
      "estimateRecommendation": {
        "estimateStatus": "deterministic_estimate|expected_value_estimate|needs_quote|needs_project_scope|needs_funding_check|not_calculable|zero_value|human_review_required|suppressed",
        "estimateConfidence": "high|medium|low",
        "includeInUserFacingTotalDefault": false,
        "userFacingLabel": "string",
        "userFacingCaveat": "string",
        "reasonCodes": ["string"]
      },
      "timingAndApplicationRules": {
        "approvalRequiredBeforePurchase": null,
        "approvalRequiredBeforeInstallation": null,
        "applicationDeadline": null,
        "fundingStatus": "open_funds_available|open_while_funds_last|waitlist|closed|exhausted|unknown",
        "paymentTiming": "upfront_grant|reservation_then_reimbursement|post_purchase_rebate|post_installation_reimbursement|tax_filing|loan_closing|unknown"
      },
      "stackingRules": {
        "stackableWithRebates": null,
        "stackableWithTaxCredits": null,
        "mustDeductOtherIncentivesFromEligibleCost": null,
        "stackingNotes": "string"
      },
      "sourceUrlsChecked": ["string"],
      "evidenceText": "string",
      "reasoningNotes": "string",
      "humanReviewRequired": false,
      "humanReviewReasons": ["string"]
    }
  ]
}

## Current RetroFi package summary

${JSON.stringify(target, null, 2)}
`
}

function testProfilePrompt(promptId, target, index, total) {
  return `${promptHeader(promptId, `Grant Test-Profile Realism Repair ${index} of ${total}`)}

Your job is to improve one synthetic RetroFi test profile so grant estimates use realistic project facts instead of values chosen to barely qualify for grants.

Use the known business/site facts. Create realistic default project assumptions for each grant-relevant retrofit and opportunity. Do not force qualification. If a normal real-world business like this would not be pursuing a school-bus, NEVI, hydrogen, tribal, agricultural, public-agency, or utility-scale grant, say so explicitly and provide suppressing facts.

Use reasonable real-world estimates when exact user/quote data is missing, but mark them as synthetic, user-overridable, and confidence-scored. For values that truly require a quote, application, award letter, bill, or engineering model, leave them null and explain why.

## Return JSON only

Return exactly one JSON object, no markdown fences:

{
  "schemaVersion": "retrofi_grant_test_profile_realism_repair.v1",
  "researchedAt": "${CURRENT_DATE}",
  "promptId": "${promptId}",
  "sampleUserId": "${target.sampleUserId}",
  "profileRepair": {
    "sampleUserId": "string",
    "profileConfidence": "high|medium|low",
    "profileNotes": "string",
    "globalGrantProfileFacts": [
      {
        "inputKey": "string",
        "value": null,
        "valueType": "money_cents|number|boolean|enum|string|date",
        "sourceStrategy": "existing_test_case|synthetic_realistic_default|public_source|quote_required|user_decision_required|application_status_required|engineering_model_required|do_not_assume",
        "confidence": "high|medium|low",
        "confidenceImpactUntilConfirmed": "high|medium|low",
        "userOverrideAllowed": true,
        "defaultIsSynthetic": true,
        "reasoning": "string"
      }
    ],
    "retrofitProjectFacts": [
      {
        "retrofitTypeId": "string",
        "expectedRealWorldScope": "string",
        "expectedHandling": "estimate_with_synthetic_defaults|needs_quote|needs_project_scope|likely_ineligible|suppress_for_this_profile",
        "inputFacts": [
          {
            "inputKey": "string",
            "value": null,
            "valueType": "money_cents|number|boolean|enum|string|date",
            "sourceStrategy": "existing_test_case|synthetic_realistic_default|public_source|quote_required|user_decision_required|application_status_required|engineering_model_required|do_not_assume",
            "confidence": "high|medium|low",
            "confidenceImpactUntilConfirmed": "high|medium|low",
            "userOverrideAllowed": true,
            "defaultIsSynthetic": true,
            "reasoning": "string"
          }
        ]
      }
    ],
    "opportunitySpecificFacts": [
      {
        "opportunityId": "string",
        "expectedHandling": "estimate_with_synthetic_defaults|needs_quote|needs_project_scope|likely_ineligible|suppress_for_this_profile",
        "inputFacts": [
          {
            "inputKey": "string",
            "value": null,
            "valueType": "money_cents|number|boolean|enum|string|date",
            "sourceStrategy": "existing_test_case|synthetic_realistic_default|public_source|quote_required|user_decision_required|application_status_required|engineering_model_required|do_not_assume",
            "confidence": "high|medium|low",
            "confidenceImpactUntilConfirmed": "high|medium|low",
            "userOverrideAllowed": true,
            "defaultIsSynthetic": true,
            "reasoning": "string"
          }
        ],
        "reasoning": "string"
      }
    ],
    "missingOrReviewInputs": [
      {
        "inputKey": "string",
        "reason": "quote_required|application_not_submitted|agency_preapproval_required|engineering_model_required|user_decision_required|unrealistic_for_this_customer",
        "appliesToRetrofitTypeId": null,
        "appliesToOpportunityId": null
      }
    ],
    "doNotForceQualificationReasons": ["string"]
  },
  "sourceUrlsChecked": ["string"],
  "reasoningNotes": "string"
}

## Current test profile and grant-relevant runtime context

${JSON.stringify(target, null, 2)}
`
}

function probabilityResearchPrompt(promptId, target, packageTarget, index, total) {
  return `${promptHeader(promptId, `Historical Award And Probability Research ${index} of ${total}`)}

Your job is to research one competitive or uncertain grant and determine whether RetroFi can support an expected-value estimate.

Find official or high-quality evidence for historical awards, application counts, budgets, expected awards, award ranges, average awards, scoring priorities, first-come funding status, and funding rounds. If direct applicant counts are unavailable, say so. If only "up to" language exists, keep probability null.

Do not invent probability. You may recommend a fallback prior only as a human-review suggestion, and it must not be used automatically unless evidence is strong.

## Return JSON only

Return exactly one JSON object, no markdown fences:

{
  "schemaVersion": "retrofi_grant_probability_deep_research.v1",
  "researchedAt": "${CURRENT_DATE}",
  "promptId": "${promptId}",
  "probabilityRepairs": [
    {
      "opportunityId": "string",
      "programName": "string",
      "effectIds": ["string"],
      "availabilityStatus": "active|upcoming|closed|exhausted|waitlist|source_inaccessible|unknown",
      "competitionType": "none|competitive|first_come_first_served|lottery|discretionary|unknown",
      "conditionalAwardEvidence": {
        "status": "calculable|needs_project_cost|needs_quote|needs_project_scope|not_calculable|source_inaccessible",
        "formulaText": "string",
        "minAwardCents": null,
        "maxAwardCents": null,
        "costSharePercent": null,
        "typicalAwardCents": null,
        "averageAwardCents": null,
        "medianAwardCents": null,
        "notes": "string"
      },
      "awardHistory": [
        {
          "roundOrFiscalYear": "string",
          "totalProgramBudgetCents": null,
          "applicationsCount": null,
          "awardsCount": null,
          "totalAwardedCents": null,
          "averageAwardCents": null,
          "medianAwardCents": null,
          "minAwardCents": null,
          "maxAwardCents": null,
          "sourceUrl": "string",
          "evidenceText": "string"
        }
      ],
      "probabilityRecommendation": {
        "probabilityEvidenceType": "historical_success_rate|budget_and_expected_awards|historical_awards_only|first_come_funds_confirmed|first_come_funding_unknown|scoring_criteria_only|eligibility_only|human_reviewed_prior|none",
        "probabilityDiscount": null,
        "competitionScope": "narrow_local|utility_territory|sector_specific|statewide_broad|federal_broad|unknown",
        "estimateConfidence": "high|medium|low",
        "includeInUserFacingTotalDefault": false,
        "reasonCodes": ["string"],
        "notes": "string"
      },
      "fallbackPriorSuggestion": {
        "probabilityDiscount": null,
        "basis": "string",
        "shouldRetroFiUseWithoutHumanApproval": false
      },
      "sourceUrlsChecked": ["string"],
      "evidenceText": "string",
      "reasoningNotes": "string"
    }
  ]
}

## Current blocked/suppressed audit target

${JSON.stringify(target, null, 2)}

## Current package summary

${JSON.stringify(packageTarget, null, 2)}
`
}

function ensureOutputDirectory(dir) {
  if (fs.existsSync(dir) && !force) {
    const nonEmptyOutputs = findFiles(dir, (filePath) => {
      const fileName = path.basename(filePath)
      return fileName.startsWith('output_') && fs.statSync(filePath).size > 0
    })

    if (nonEmptyOutputs.length > 0) {
      throw new Error(
        `Refusing to overwrite ${dir}; ${nonEmptyOutputs.length} output files are non-empty. Re-run with --force only after backing them up.`
      )
    }
  }
  if (fs.existsSync(dir)) fs.rmSync(dir, { recursive: true, force: true })
  fs.mkdirSync(dir, { recursive: true })
}

function findFiles(dir, predicate) {
  const matches = []
  if (!fs.existsSync(dir)) return matches
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const entryPath = path.join(dir, entry.name)
    if (entry.isDirectory()) {
      matches.push(...findFiles(entryPath, predicate))
    } else if (predicate(entryPath)) {
      matches.push(entryPath)
    }
  }
  return matches
}

function writePromptPair(dir, index, slug, prompt) {
  const number = String(index).padStart(3, '0')
  const promptName = `prompt_${number}_${slug}.md`
  const outputName = `output_${number}_${slug}.md`
  fs.writeFileSync(path.join(dir, promptName), prompt)
  if (!fs.existsSync(path.join(dir, outputName)) || force) {
    fs.writeFileSync(path.join(dir, outputName), '')
  }
  return { promptName, outputName }
}

function main() {
  const packageData = readJson(PACKAGE_SOURCE)
  const testCaseData = readJson(TEST_CASE_SOURCE)
  const auditData = readJson(AUDIT_SOURCE)

  const packages = packageData.packages || []
  const auditTargetsByOpportunityId = new Map(
    (auditData.targets || []).map((target) => [target.opportunityId, target])
  )
  const packagesByOpportunityId = new Map(packages.map((pkg) => [pkg.opportunity_id, pkg]))

  const grantPackageTargets = packages
    .filter((pkg) => (pkg.effects || []).some(isGrantLikeEffect))
    .map((pkg) => compactPackage(pkg, auditTargetsByOpportunityId.get(pkg.opportunity_id) || null))
    .sort((a, b) => a.program_name.localeCompare(b.program_name))

  const profileTargets = (testCaseData.testCases || [])
    .map(compactTestCase)
    .sort((a, b) => a.sampleUserId.localeCompare(b.sampleUserId))

  const probabilityTargets = (auditData.targets || [])
    .filter((target) => target.auditRecommendation?.bucket === 'keep_suppressed_ev_or_probability_gap')
    .map((target) => ({
      auditTarget: target,
      packageTarget: compactPackage(packagesByOpportunityId.get(target.opportunityId) || {}, target),
    }))
    .sort((a, b) => a.auditTarget.programName.localeCompare(b.auditTarget.programName))

  ensureOutputDirectory(BASE_DIR)

  const packageDir = path.join(BASE_DIR, '01-grant-package-production-repair')
  const profileDir = path.join(BASE_DIR, '02-test-profile-realism')
  const probabilityDir = path.join(BASE_DIR, '03-historical-probability-research')
  for (const dir of [packageDir, profileDir, probabilityDir]) ensureOutputDirectory(dir)

  const packageFiles = grantPackageTargets.map((target, index) => {
    const promptId = `grant_package_production_${String(index + 1).padStart(3, '0')}`
    const slug = slugify(target.program_name)
    return {
      promptId,
      opportunityId: target.opportunity_id,
      programName: target.program_name,
      ...writePromptPair(
        packageDir,
        index + 1,
        slug,
        packageRepairPrompt(promptId, target, index + 1, grantPackageTargets.length)
      ),
    }
  })

  const profileFiles = profileTargets.map((target, index) => {
    const promptId = `grant_test_profile_realism_${String(index + 1).padStart(3, '0')}`
    const slug = slugify(target.sampleUserId)
    return {
      promptId,
      sampleUserId: target.sampleUserId,
      description: target.description,
      ...writePromptPair(
        profileDir,
        index + 1,
        slug,
        testProfilePrompt(promptId, target, index + 1, profileTargets.length)
      ),
    }
  })

  const probabilityFiles = probabilityTargets.map(({ auditTarget, packageTarget }, index) => {
    const promptId = `grant_probability_deep_research_${String(index + 1).padStart(3, '0')}`
    const slug = slugify(auditTarget.programName)
    return {
      promptId,
      opportunityId: auditTarget.opportunityId,
      programName: auditTarget.programName,
      ...writePromptPair(
        probabilityDir,
        index + 1,
        slug,
        probabilityResearchPrompt(promptId, auditTarget, packageTarget, index + 1, probabilityTargets.length)
      ),
    }
  })

  const manifest = {
    schemaVersion: 'retrofi_grant_production_quality_work_packet_manifest.v1',
    generatedAt: new Date().toISOString(),
    currentDate: CURRENT_DATE,
    sourceFiles: {
      packages: path.relative(process.cwd(), PACKAGE_SOURCE),
      testCases: path.relative(process.cwd(), TEST_CASE_SOURCE),
      blockedSuppressedAudit: path.relative(process.cwd(), AUDIT_SOURCE),
    },
    folders: {
      grantPackageProductionRepair: {
        path: path.relative(process.cwd(), packageDir),
        promptCount: packageFiles.length,
        files: packageFiles,
      },
      testProfileRealism: {
        path: path.relative(process.cwd(), profileDir),
        promptCount: profileFiles.length,
        files: profileFiles,
      },
      historicalProbabilityResearch: {
        path: path.relative(process.cwd(), probabilityDir),
        promptCount: probabilityFiles.length,
        files: probabilityFiles,
      },
    },
  }

  writeJson(path.join(BASE_DIR, 'target_manifest.json'), manifest)

  fs.writeFileSync(
    path.join(BASE_DIR, 'README.md'),
    `# Grant Production Quality GPT Pro Work Packet

Generated: ${manifest.generatedAt}

This packet has three independent folders:

1. \`01-grant-package-production-repair\`
   - ${packageFiles.length} prompts.
   - Use these to repair source-backed grant formulas, caps, required inputs, timing, stacking, and default inclusion policy.

2. \`02-test-profile-realism\`
   - ${profileFiles.length} prompts.
   - Use these to improve synthetic project facts for test profiles without forcing qualification.

3. \`03-historical-probability-research\`
   - ${probabilityFiles.length} prompts.
   - Use these to research award history, budgets, applicant counts, and probability evidence for suppressed competitive grants.

Paste GPT Pro responses into the matching blank \`output_*.md\` files. Keep file names unchanged.

Manifest: \`target_manifest.json\`
`
  )

  console.log(`Wrote grant production quality work packet to ${path.relative(process.cwd(), BASE_DIR)}`)
  console.log(`Grant package prompts: ${packageFiles.length}`)
  console.log(`Test profile prompts: ${profileFiles.length}`)
  console.log(`Probability prompts: ${probabilityFiles.length}`)
}

main()
