You are helping RetroFi create synthetic test-case profile defaults for richer tax/profile and v2 incentive-estimate testing.

Current date: 2026-07-02. This task is for test data only. Do not imply these defaults are accurate for real users.

Return strict JSON only. Do not include markdown fences or commentary outside JSON fields.

## Context

RetroFi can use GPT Pro to repair source-backed formulas, but real estimates still need project/user inputs. For test cases, we can temporarily synthesize values so the estimator can be exercised end to end.

Current known facts:
- Current public sample matching test cases do not appear to include the three tax-related opportunity IDs below.
- We still need reusable synthetic profile templates so future test cases can cover tax credits, property-tax valuation, tax-rate preferences, and user-overridable v2 input defaults.
- Synthetic values must be explicitly marked `synthetic_test_case` and should never be treated as source-backed production data.

Tax-related opportunity IDs to support:
- `SOURCE_DSIRE:dsire_program_id:3216` - Renewable Energy Renaissance Zones
- `SOURCE_DSIRE:dsire_program_id:381` - Tax Abatement for Solar Manufacturers
- `SOURCE_DSIRE:dsire_program_id:22798` - Renewable Energy Tax Valuation

## Output schema

Return one JSON object:

{
  "schemaVersion": "retrofi_test_case_profile_defaults.v1",
  "researchedAt": "2026-07-02",
  "source": "gpt_pro",
  "promptId": "test_case_profile_defaults",
  "globalRules": [
    {
      "ruleId": "string",
      "description": "string",
      "implementationNotes": "string"
    }
  ],
  "profileTemplates": [
    {
      "templateId": "snake_case",
      "displayName": "string",
      "intendedCoverage": ["tax_credit|property_tax_valuation|tax_rate_preference|rebate_rate_table|grant_expected_value|quantity_override|eligibility_profile"],
      "applicableOpportunityIds": ["string"],
      "applicableRetrofitFamilies": ["string"],
      "syntheticAnswers": [
        {
          "inputKey": "snake_case",
          "value": null,
          "valueType": "number|integer|currency_cents|percent|boolean|date|enum|string|object",
          "source": "synthetic_test_case",
          "defaultIsPlaceholder": true,
          "userOverrideAllowed": true,
          "confidenceImpactUntilConfirmed": "medium|low",
          "whyIncluded": "string"
        }
      ],
      "expectedCalculatorBehavior": {
        "shouldCalculate": true,
        "expectedStatus": "deterministic_estimate|needs_tax_profile|needs_property_tax_profile|needs_quote|human_review_required|not_calculable|suppressed",
        "includeInUserFacingTotalDefault": false,
        "notes": "string"
      },
      "warnings": ["string"]
    }
  ],
  "recommendedTestCaseAdditions": [
    {
      "testCaseIdeaId": "snake_case",
      "title": "string",
      "userType": "homeowner|business|nonprofit|school|government|agriculture|industrial|manufacturer|developer",
      "state": "string",
      "siteType": "string",
      "retrofitFamily": "string",
      "targetOpportunityIds": ["string"],
      "profileTemplateIds": ["string"],
      "whyThisCaseMatters": "string",
      "minimumSyntheticInputs": ["string"],
      "expectedLimitations": ["string"]
    }
  ],
  "questionCatalogBacklog": [
    {
      "inputKey": "snake_case",
      "shouldBecomeUserQuestion": true,
      "uiPlacement": "tax_profile|organization_profile|property_tax_profile|retrofit_details|project_quote|admin_only",
      "questionPrompt": "string",
      "helperText": "string",
      "answerType": "number|currency|percent|boolean|date|select|text|textarea",
      "sensitiveField": true,
      "reason": "string"
    }
  ],
  "summary": {
    "templateCount": 0,
    "recommendedTestCaseAdditionCount": 0,
    "implementationNotes": ["string"]
  }
}

## Required templates

Create at least these synthetic profile templates:

1. A normal commercial retrofit profile with realistic but generic project cost, quantity, bill, quote, and preapproval fields.
2. A nonprofit/school/public entity profile where tax appetite may be low or zero, so tax credits should be shown differently from cash rebates.
3. A Washington solar manufacturer profile for `SOURCE_DSIRE:dsire_program_id:381`.
4. A Michigan renewable energy renaissance zone company profile for `SOURCE_DSIRE:dsire_program_id:3216`.
5. A Rhode Island renewable generation property-tax valuation profile for `SOURCE_DSIRE:dsire_program_id:22798`.
6. A quantity-scaling stress profile for lighting or EV charging where `unit_count = 1` would be materially wrong and the user override should drive the estimate.

## Rules

- Use plausible synthetic values, not real customer data.
- Mark every synthetic answer as `source: "synthetic_test_case"`.
- Tax-liability, gross-receipts, assessed-value, and local-tax fields are sensitive. Mark them accordingly in the backlog.
- Do not recommend putting sensitive tax fields directly in the first-pass public intake unless there is a clear product reason.
- Prefer richer profile templates over trying to patch current test cases blindly.

