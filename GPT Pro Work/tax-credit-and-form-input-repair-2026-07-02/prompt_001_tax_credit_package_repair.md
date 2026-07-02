You are helping RetroFi repair its remaining tax-related incentive calculation packages.

Current date: 2026-07-02. Tax rules, program status, expiration dates, and agency guidance are time-sensitive. Use current official sources wherever possible: state tax agency pages, statutes/regulations, program administrator pages, official fact sheets, and official forms. DSIRE may be used only as a lead when an official source is available.

Return strict JSON only. Do not include markdown fences, commentary, or citations outside JSON fields.

## Context

RetroFi has already repaired most grant/rebate/rate-table opportunities. The remaining gap is tax-related packages. We want tax benefits to be first-class monetary effects, separate from grants.

Do not overstate tax benefits:
- Do not route tax credits through grant/upfront grant logic.
- Do not include tax values in user-facing totals unless the formula is source-backed and required user/tax inputs are available.
- If a value depends on actual tax liability, tax appetite, tax return data, local assessment, or tax-professional review, say that clearly.
- If the opportunity is really a property-tax valuation rule, tax exemption, tax-rate preference, or special workflow rather than a normal retrofit incentive, classify it accurately.
- For user-facing estimates, prefer gross estimated tax benefit before tax-professional review. Do not imply guaranteed cash.

## Output schema

Return one JSON object:

{
  "schemaVersion": "retrofi_tax_credit_package_repair.v1",
  "researchedAt": "2026-07-02",
  "source": "gpt_pro",
  "promptId": "tax_credit_package_repair",
  "repairs": [
    {
      "opportunityId": "string",
      "programName": "string",
      "availabilityStatus": "active|closed|expired|source_inaccessible|unknown",
      "sourceConfidence": "high|medium|low",
      "taxBenefitClassification": "tax_credit|tax_deduction|tax_exemption|tax_abatement|tax_rate_preference|property_tax_valuation|tax_rebate|direct_pay|special_tax_workflow|not_tax_benefit|unknown",
      "cashValueClassification": "tax_credit|tax_exemption|tax_rate_preference|tariff_or_rate|process_value|non_cash|unknown",
      "recommendedRetrofitOrWorkflowTypes": ["string"],
      "shouldArchive": false,
      "archiveReason": null,
      "effects": [
        {
          "effectType": "tax_credit|tax_exemption|tax_rate_preference|recurring_expense_reduction|property_tax_valuation|process_value|no_cash_value",
          "timing": "tax_filing|annual|one_time|recurring|application_process|unknown",
          "valueModelKind": "fixed_amount|percent_of_tax_basis|percent_of_eligible_cost|tax_rate_difference|tax_liability_offset|tax_exempt_liability|assessed_value_reduction|property_tax_valuation_formula|formula|no_calculable_value",
          "formulaText": "plain English source-backed formula",
          "formulaExpression": "machine-readable expression if safe, otherwise null",
          "variables": [
            {
              "inputKey": "snake_case",
              "label": "user-facing/admin-facing label",
              "valueType": "number|currency_cents|percent|boolean|date|enum|string|object",
              "unit": "string|null",
              "required": true,
              "sourceStrategy": "user_input|tax_return_or_accountant|property_tax_bill|quote_or_invoice|runtime_project_data|program_approval|official_source|admin_review|derived",
              "uiPlacement": "tax_profile|organization_profile|property_tax_profile|retrofit_details|project_quote|admin_only|hidden_derived",
              "userOverrideAllowed": true,
              "testCaseDefault": null,
              "defaultIsSynthetic": false,
              "confidenceImpactUntilConfirmed": "high|medium|low",
              "validationNotes": "string"
            }
          ],
          "capsAndLimits": {
            "maxBenefitCents": null,
            "minBenefitCents": null,
            "maxPercent": null,
            "phaseoutRules": "string|null",
            "expirationDate": "YYYY-MM-DD|null",
            "carryforward": "string|null",
            "refundability": "refundable|nonrefundable|partially_refundable|unknown|not_applicable",
            "transferability": "transferable|not_transferable|unknown|not_applicable",
            "directPayAvailable": "yes|no|unknown|not_applicable"
          },
          "filingAndApprovalRequirements": ["string"],
          "calculationExamples": [
            {
              "name": "string",
              "inputs": {},
              "grossEstimatedBenefitCents": null,
              "calculationTrace": ["string"]
            }
          ],
          "includedInUserFacingTotalDefault": false,
          "displayRecommendation": {
            "label": "string",
            "caveat": "string",
            "estimateStatus": "deterministic_estimate|needs_tax_profile|needs_property_tax_profile|needs_accountant_review|human_review_required|not_calculable|zero_value|suppressed"
          },
          "sourceUrlsChecked": ["string"],
          "evidenceText": "under 75 words, no URLs",
          "reasoningNotes": "string"
        }
      ],
      "inputQuestionNotes": [
        {
          "inputKey": "snake_case",
          "shouldBecomeUserQuestion": true,
          "questionPrompt": "string",
          "answerType": "number|currency|percent|boolean|date|select|text|textarea",
          "options": ["string"],
          "helperText": "string",
          "sensitiveTaxField": true
        }
      ],
      "sourceUrlsChecked": ["string"],
      "evidenceText": "under 75 words, no URLs",
      "reasoningNotes": "string"
    }
  ],
  "summary": {
    "repairedCount": 0,
    "calculableTaxPackages": 0,
    "specialWorkflowPackages": 0,
    "archiveRecommendedCount": 0,
    "implementationNotes": ["string"]
  }
}

## Targets

[
  {
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:3216",
    "programName": "Renewable Energy Renaissance Zones",
    "currentCalculationStatus": "calculable_with_missing_inputs",
    "currentEffectType": "tax_credit",
    "currentLabel": "Annual tax relief equals eligible state education, real and personal property, and applicable local income taxes otherwise due for approved renewable-energy company operations within a designated zone, excluding federal taxes, bond obligations, sinking funds, special assessments, and Michigan sales or use tax. Benefits can run up to 15 years with phaseout in the final three years.",
    "currentRequiredInputs": [
      "approvedzonedesignation",
      "qualifiedcompanyoperations",
      "zonetermyears",
      "programyear",
      "eligiblestateeducationtaxcents",
      "eligiblerealpropertytaxcents",
      "eligiblepersonalpropertytaxcents",
      "eligiblelocalincometaxcents",
      "phaseoutschedule",
      "eligibletaxliabilitybytype"
    ],
    "currentEvidenceUrls": [
      "https://www.michiganbusiness.org/4aef8b/globalassets/documents/reports/fact-sheets/renewableenergyrenzones.pdf"
    ],
    "knownConcern": "This appears to be approved zone/company tax relief, not a normal project rebate. Repair formula and input names so RetroFi can model it only for appropriate special workflows."
  },
  {
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:381",
    "programName": "Tax Abatement for Solar Manufacturers",
    "currentCalculationStatus": "calculable_with_missing_inputs",
    "currentEffectType": "tax_credit",
    "currentLabel": "For qualifying Washington solar energy system or component manufacturing, processing for hire, or wholesale sales, compute B&O tax at the preferential solar energy classification rate of 0.275% of taxable gross receipts. The tax benefit equals the difference between tax under the otherwise applicable B&O classification and tax under the 0.275% solar energy classification, after applicable deductions or multiple-activities tax credit adjustments.",
    "currentRequiredInputs": [
      "qualifying_taxable_gross_receipts",
      "business_activity_classification",
      "otherwise_applicable_b_o_tax_rate",
      "tax_period",
      "deductions_for_interstate_or_foreign_sales",
      "multiple_activities_tax_credit_adjustments",
      "annual_tax_performance_report_filing_status",
      "deductions_or_credits"
    ],
    "currentEvidenceUrls": [
      "https://dor.wa.gov/education/industry-guides/manufacturing-guide/manufacturing-solar-energy-systems-and-components-solar-energy-systems",
      "https://dor.wa.gov/open-business/apply-business-license/plan-taxes/business-and-occupation-bo-tax-classification-definitions"
    ],
    "knownConcern": "This applies to solar manufacturers/processors/wholesalers, not customers installing rooftop solar. Repair formula, expiration, tax-rate treatment, and workflow routing."
  },
  {
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:22798",
    "programName": "Renewable Energy Tax Valuation",
    "currentCalculationStatus": "non_monetary_workflow",
    "currentEffectType": "recurring_expense",
    "currentLabel": "Commercial renewable energy tangible tax valuation is $5 multiplied by the system's AC kW capacity. Any savings versus ordinary assessment requires a counterfactual assessment and local tax treatment.",
    "currentRequiredInputs": [
      "ac_kw_capacity",
      "municipality",
      "commercial_tax_status",
      "renewable_technology",
      "waiver_or_exemption_status",
      "counterfactual_assessed_value",
      "municipal_tax_treatment",
      "counterfactual_assessment"
    ],
    "currentEvidenceUrls": [
      "https://rules.sos.ri.gov/regulations/part/300-00-00-2",
      "https://webserver.rilegislature.gov/Statutes/TITLE39/39-26/39-26-5.htm",
      "https://webserver.rilegislature.gov/Statutes/TITLE39/39-26/39-26-2.htm"
    ],
    "knownConcern": "This looks like Rhode Island property/tangible tax valuation for renewable energy systems. Repair as property-tax valuation or recurring expense reduction, not a grant."
  }
]

