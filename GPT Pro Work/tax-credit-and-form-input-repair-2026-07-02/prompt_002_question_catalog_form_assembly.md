You are helping RetroFi design and repair the input-question catalog used to assemble retrofit-specific forms.

Current date: 2026-07-02. Use product/data-model reasoning. Use official source research only if a specific tax/program field needs source-backed wording.

Return strict JSON only. Do not include markdown fences or commentary outside JSON fields.

## Context

RetroFi currently has several disconnected input/question layers:

- Main intake questions: user type, address, utility, building type, square footage, contact info.
- Hardcoded retrofit detail questions: lighting count, HVAC fuel/system, EV charger count/level, solar system size, etc.
- v2 incentive package required inputs: opportunity-specific fields like `unit_count`, `eligible_project_cost`, `charger_level`, `preapproval_status`, `qualifying_taxable_gross_receipts`, etc.
- Runtime-derived/defaulted inputs: cost aliases, safe placeholder quantity `unit_count = 1`, bill-derived kWh/therm savings, synthetic test-case defaults.

We want a better structure:

1. Stable base retrofit questions attach to the retrofit taxonomy or retrofit table by question ID.
2. Opportunity-specific incentive questions stay with v2 incentive packages as required inputs.
3. Cross-cutting tax/profile questions live in a reusable profile/tax question set.
4. Bill/quote-derived fields may prefill answers but should show provenance and allow override when appropriate.
5. A form assembly layer builds a selected retrofit/scenario form by merging and deduping:
   - base retrofit questions;
   - matched opportunity package required inputs;
   - tax/profile fields;
   - bill/quote-derived fields;
   - application-prep fields.

Important product rule: conservative defaults such as `unit_count = 1` must be visible, editable, and provenance-labeled. Do not hide them as truth.

## Output schema

Return one JSON object:

{
  "schemaVersion": "retrofi_question_catalog_repair.v1",
  "researchedAt": "2026-07-02",
  "source": "gpt_pro",
  "promptId": "question_catalog_form_assembly",
  "questionCatalog": [
    {
      "questionId": "snake_case_stable_id",
      "canonicalInputKey": "snake_case",
      "aliases": ["string"],
      "label": "short label",
      "questionPrompt": "customer-facing question",
      "adminLabel": "admin-facing label",
      "helperText": "string",
      "answerType": "number|currency|percent|boolean|date|select|multi_select|text|textarea|file_upload|derived_readonly",
      "valueType": "number|integer|currency_cents|percent|boolean|date|enum|string|array|object",
      "unit": "string|null",
      "options": ["string"],
      "validation": {
        "required": false,
        "min": null,
        "max": null,
        "integer": false,
        "pattern": null,
        "customValidationNotes": "string"
      },
      "defaultStrategy": {
        "strategy": "none|safe_visible_placeholder|derive_from_bill|derive_from_quote|derive_from_retrofit_model|derive_from_profile|synthetic_test_case|admin_review",
        "defaultValue": null,
        "defaultIsPlaceholder": false,
        "defaultConfidence": "high|medium|low|null",
        "userOverrideAllowed": true,
        "userOverrideRequiredForReliableEstimate": false
      },
      "provenanceOptions": [
        "user_entered",
        "bill_derived",
        "quote_derived",
        "source_derived",
        "retrofit_model_derived",
        "inferred",
        "synthetic_test_case",
        "admin_reviewed"
      ],
      "uiPlacement": "retrofit_quantity|equipment_details|project_quote|timing_preapproval|utility_bill_upload|rate_selection|tax_profile|organization_profile|property_tax_profile|application_prep|admin_only|hidden_derived",
      "appliesToRetrofitFamilies": ["string"],
      "appliesToOpportunityIds": ["string"],
      "requiredFor": ["savings_estimate|incentive_estimate|tax_estimate|eligibility_match|application_prep|scenario_math"],
      "displayConditions": ["string"],
      "confidenceImpactUntilConfirmed": "none|medium|low",
      "sensitiveField": false,
      "notes": "string"
    }
  ],
  "formAssemblyRules": [
    {
      "ruleId": "string",
      "description": "string",
      "mergeOrder": ["base_retrofit_questions", "selected_scenario_opportunity_inputs", "tax_profile_questions", "bill_quote_fields", "application_prep_requirements"],
      "dedupeBy": "canonicalInputKey",
      "conflictResolution": "string",
      "implementationNotes": "string"
    }
  ],
  "retrofitBaseQuestionSets": [
    {
      "retrofitFamily": "lighting|hvac|water_heating|weatherization|refrigeration|ev_charging|solar_storage|motors|water_efficiency|commercial_kitchen|compressed_air|renewable_generation|audits_studies|tax_or_special_workflow|other",
      "questionIds": ["string"],
      "notes": "string"
    }
  ],
  "opportunitySpecificQuestionSets": [
    {
      "opportunityId": "string",
      "questionIds": ["string"],
      "notes": "string"
    }
  ],
  "missingUiTodos": [
    {
      "todo": "string",
      "priority": "high|medium|low",
      "blockedInputs": ["string"],
      "reason": "string"
    }
  ],
  "summary": {
    "questionCount": 0,
    "baseRetrofitQuestionCount": 0,
    "taxProfileQuestionCount": 0,
    "opportunitySpecificQuestionCount": 0,
    "implementationNotes": ["string"]
  }
}

## Required coverage

Create catalog entries and form rules for at least these input groups.

### Universal project and quantity inputs

- `unit_count`
- `fixture_count`
- `port_count`
- `charger_count`
- `thermostat_count`
- `system_count`
- `tons`
- `square_feet`
- `linear_feet`
- `horsepower`
- `system_kw`
- `annual_kwh_savings`
- `annual_therm_savings`
- `demand_reduction_kw`
- `operating_hours`

### Cost and timing inputs

- `project_cost_cents`
- `eligible_project_cost_cents`
- `equipment_cost_cents`
- `installation_cost_cents`
- `quote_status`
- `purchase_date`
- `installation_date`
- `application_date`
- `preapproval_status`
- `program_enrollment_status`

### Equipment and measure inputs

- `measure_selection`
- `equipment_type`
- `equipment_tier`
- `equipment_efficiency`
- `equipment_model`
- `charger_level`
- `charger_power_kw`
- `site_category`
- `fuel_type`
- `replacement_fuel`

### Tax/profile inputs

- `tax_entity_type`
- `tax_exempt_status`
- `tax_appetite_or_liability_cents`
- `tax_filing_status`
- `tax_year`
- `qualifying_taxable_gross_receipts`
- `otherwise_applicable_b_o_tax_rate`
- `business_activity_classification`
- `deductions_or_credits`
- `annual_tax_performance_report_filing_status`
- `approved_zone_designation`
- `qualified_company_operations`
- `zone_term_years`
- `program_year`
- `eligible_state_education_tax_cents`
- `eligible_real_property_tax_cents`
- `eligible_personal_property_tax_cents`
- `eligible_local_income_tax_cents`
- `phaseout_schedule`
- `eligible_tax_liability_by_type`
- `municipality`
- `commercial_tax_status`
- `renewable_technology`
- `waiver_or_exemption_status`
- `counterfactual_assessed_value_cents`
- `counterfactual_assessment_cents`
- `municipal_tax_treatment`
- `property_tax_rate`

### Current tax-related opportunity IDs

- `SOURCE_DSIRE:dsire_program_id:3216`
- `SOURCE_DSIRE:dsire_program_id:381`
- `SOURCE_DSIRE:dsire_program_id:22798`

## Rules

- Prefer reusable canonical questions over one-off duplicates.
- If a field is sensitive tax information, mark `sensitiveField: true`.
- If a field belongs in the user/org profile rather than the retrofit form, mark the correct `uiPlacement`.
- If a value can be derived from bills, quotes, or runtime models but should be overrideable, specify that clearly.
- For quantity fields, the default may be `1` only as a visible placeholder and must reduce confidence until confirmed.
- For tax fields, do not invent production defaults. Synthetic values are allowed only for test cases and must be marked as synthetic.

