You are helping RetroFi repair its v2 incentive-estimate input model.

Current date: 2026-07-02. Treat current program status, rates, and source language as time-sensitive. Use official sources only if you need to verify terminology; this task is primarily data modeling.

## Prompt input_cost_timing_bills_profile: cost, timing, utility bills, rate data, organization profile, and review-only fields

Focus on project cost/quote/invoice fields, preapproval and timing fields, utility bill/rate/tariff fields, organization/applicant profile fields, probability placeholders, and any ambiguous review-only inputs.

## Critical product rule: retrofit quantity override

RetroFi may use a conservative placeholder default of `1` for per-unit calculations, but that value must be visible and user-overridable. Do not treat `1` as source-backed truth.

Examples:
- LEDs/lighting can be 1 fixture, 20 fixtures, or 1,000+ bulbs/fixtures.
- EV chargers can be 1 port or many ports.
- Windows, doors, thermostats, motors, HVAC units, linear feet, square feet, tons, kW, and similar dimensions can vary materially by project.

For any raw key that means number of units installed/replaced, create or map to a canonical input such as `unit_count` / `retrofit_quantity`. It should:
- default to `1` only as a visible placeholder/test-case value;
- be editable by the user before final estimate;
- support retrofit-specific labels such as "Number of fixtures to replace", "Number of charger ports", "Number of windows", etc.;
- have integer validation where appropriate, with no artificially small maximum;
- lower estimate confidence until confirmed by the user or derived from a quote.

## Output JSON schema

Return one JSON object only, no markdown fences.

{
  "schemaVersion": "retrofi_v2_input_resolution.v1",
  "researchedAt": "2026-07-02",
  "promptId": "input_cost_timing_bills_profile",
  "globalRules": [{"ruleId": "string", "description": "string", "appliesToCanonicalInputs": ["string"], "implementationNotes": "string"}],
  "inputMappings": [
    {
      "rawInputKeys": ["string"],
      "canonicalInputKey": "string",
      "canonicalLabel": "string",
      "valueType": "number|integer|currency_cents|boolean|enum|date|string|array|object",
      "unit": "string|null",
      "allowedValues": ["string"],
      "sourceStrategy": "derive_from_runtime|derive_from_retrofit_model|safe_placeholder_default|user_input|quote_or_invoice|utility_bill_or_interval_data|program_source_repair_required|admin_review",
      "defaultValue": null,
      "defaultIsPlaceholder": true,
      "defaultConfidence": "high|medium|low",
      "userOverrideAllowed": true,
      "userOverrideRequiredForReliableEstimate": true,
      "uiPlacement": "retrofit_quantity|equipment_details|project_quote|timing_preapproval|utility_bill_upload|rate_selection|tax_profile|organization_profile|admin_only|hidden_derived",
      "testCaseDefault": null,
      "serverDerivationLogic": "string",
      "riskIfDefaultWrong": "string",
      "notes": "string"
    }
  ],
  "retrofitQuantityOverrides": [
    {"retrofitFamily": "lighting|ev_charging|hvac|water_heating|weatherization|motors|windows_doors|solar_storage|other", "canonicalInputKey": "unit_count", "defaultValue": 1, "defaultIsPlaceholder": true, "uiLabel": "string", "helperText": "string", "validation": {"min": 0, "integer": true, "suggestedSoftMax": null}, "confidenceImpactUntilConfirmed": "medium|low"}
  ],
  "missingUiTodos": [{"todo": "string", "priority": "high|medium|low", "blockedCanonicalInputs": ["string"], "reason": "string"}],
  "questionsForRetroFi": ["string"]
}

## Rules

- Group aliases aggressively.
- Use conservative defaults only when they are transparent and overrideable.
- If a user-specific value materially changes dollars, prefer user input, quote/invoice, utility bill, or explicit test-case synthetic value over a hidden default.
- For test cases, provide temporary defaults and mark them synthetic.
- You do not need to produce a separate mapping for every typo if a global alias rule covers it.

## Current package summary

Total v2 packages: 984
Unique raw input keys observed: 4232
Rough category occurrence counts:

{
  "retrofit_scope_or_equipment_spec": 5480,
  "project_cost_or_financing": 1276,
  "eligibility_timing_or_profile": 2026,
  "other_or_needs_review": 1485,
  "utility_bill_or_rate_data": 320,
  "award_probability": 42
}

## Target raw inputs for this prompt

{
  "categories": [
    "project_cost_or_financing",
    "eligibility_timing_or_profile",
    "utility_bill_or_rate_data",
    "award_probability",
    "other_or_needs_review"
  ],
  "inputKeysByCategory": {
    "project_cost_or_financing": [
      {
        "inputKey": "project_cost",
        "count": 139,
        "observedLabels": [
          "project cost"
        ],
        "observedValueTypes": [
          "number"
        ]
      },
      {
        "inputKey": "eligible_project_cost",
        "count": 129,
        "observedLabels": [
          "eligible project cost"
        ],
        "observedValueTypes": [
          "number"
        ]
      },
      {
        "inputKey": "invoice",
        "count": 60,
        "observedLabels": [
          "invoice"
        ],
        "observedValueTypes": [
          "text"
        ]
      },
      {
        "inputKey": "eligible_cost",
        "count": 56,
        "observedLabels": [
          "eligible cost"
        ],
        "observedValueTypes": [
          "number"
        ]
      },
      {
        "inputKey": "installation_cost",
        "count": 20,
        "observedLabels": [
          "installation cost"
        ],
        "observedValueTypes": [
          "number"
        ]
      },
      {
        "inputKey": "installed_cost",
        "count": 20,
        "observedLabels": [
          "installed cost"
        ],
        "observedValueTypes": [
          "number"
        ]
      },
      {
        "inputKey": "eligible_installation_cost",
        "count": 15,
        "observedLabels": [
          "eligible installation cost"
        ],
        "observedValueTypes": [
          "number"
        ]
      },
      {
        "inputKey": "eligible_project_cost_cents",
        "count": 15,
        "observedLabels": [
          "eligible project cost cents"
        ],
        "observedValueTypes": [
          "number"
        ]
      },
      {
        "inputKey": "purchase_price",
        "count": 15,
        "observedLabels": [
          "purchase price"
        ],
        "observedValueTypes": [
          "text"
        ]
      },
      {
        "inputKey": "current_form_amount",
        "count": 11,
        "observedLabels": [
          "current form amount"
        ],
        "observedValueTypes": [
          "number"
        ]
      },
      {
        "inputKey": "make_ready_cost",
        "count": 11,
        "observedLabels": [
          "make ready cost",
          "make-ready cost"
        ],
        "observedValueTypes": [
          "number"
        ]
      },
      {
        "inputKey": "material_cost",
        "count": 11,
        "observedLabels": [
          "material cost"
        ],
        "observedValueTypes": [
          "number"
        ]
      },
      {
        "inputKey": "eligible_costs",
        "count": 9,
        "observedLabels": [
          "eligible costs"
        ],
        "observedValueTypes": [
          "number"
        ]
      },
      {
        "inputKey": "incremental_cost",
        "count": 9,
        "observedLabels": [
          "incremental cost"
        ],
        "observedValueTypes": [
          "number"
        ]
      },
      {
        "inputKey": "loan_amount",
        "count": 9,
        "observedLabels": [
          "loan amount"
        ],
        "observedValueTypes": [
          "number"
        ]
      },
      {
        "inputKey": "contractor_quote",
        "count": 8,
        "observedLabels": [
          "contractor quote"
        ],
        "observedValueTypes": [
          "text"
        ]
      },
      {
        "inputKey": "funding_availability",
        "count": 8,
        "observedLabels": [
          "funding availability"
        ],
        "observedValueTypes": [
          "text"
        ]
      },
      {
        "inputKey": "eligible_make_ready_cost",
        "count": 7,
        "observedLabels": [
          "eligible make ready cost",
          "eligible make-ready cost"
        ],
        "observedValueTypes": [
          "number"
        ]
      },
      {
        "inputKey": "financed_amount",
        "count": 7,
        "observedLabels": [
          "financed amount"
        ],
        "observedValueTypes": [
          "number"
        ]
      },
      {
        "inputKey": "installedcost",
        "count": 7,
        "observedLabels": [
          "installedCost"
        ],
        "observedValueTypes": [
          "number"
        ]
      },
      {
        "inputKey": "invoice_date",
        "count": 7,
        "observedLabels": [
          "invoice date"
        ],
        "observedValueTypes": [
          "text"
        ]
      },
      {
        "inputKey": "itemized_invoice",
        "count": 7,
        "observedLabels": [
          "itemized invoice"
        ],
        "observedValueTypes": [
          "text"
        ]
      },
      {
        "inputKey": "loan_terms",
        "count": 7,
        "observedLabels": [
          "loan terms"
        ],
        "observedValueTypes": [
          "text"
        ]
      },
      {
        "inputKey": "total_cost",
        "count": 7,
        "observedLabels": [
          "total cost"
        ],
        "observedValueTypes": [
          "number"
        ]
      },
      {
        "inputKey": "contractor_invoice",
        "count": 6,
        "observedLabels": [
          "contractor invoice"
        ],
        "observedValueTypes": [
          "text"
        ]
      },
      {
        "inputKey": "approved_cost_share",
        "count": 5,
        "observedLabels": [
          "approved cost share"
        ],
        "observedValueTypes": [
          "number"
        ]
      },
      {
        "inputKey": "eligible_evse_cost",
        "count": 5,
        "observedLabels": [
          "eligible EVSE cost"
        ],
        "observedValueTypes": [
          "number"
        ]
      },
      {
        "inputKey": "eligiblecost",
        "count": 5,
        "observedLabels": [
          "eligibleCost"
        ],
        "observedValueTypes": [
          "number"
        ]
      },
      {
        "inputKey": "eligibledevice",
        "count": 5,
        "observedLabels": [
          "eligibleDevice"
        ],
        "observedValueTypes": [
          "text"
        ]
      },
      {
        "inputKey": "eligibleprojectcostcents",
        "count": 5,
        "observedLabels": [
          "eligibleProjectCostCents"
        ],
        "observedValueTypes": [
          "number"
        ]
      },
      {
        "inputKey": "loan_term",
        "count": 5,
        "observedLabels": [
          "loan term"
        ],
        "observedValueTypes": [
          "text"
        ]
      },
      {
        "inputKey": "loanamount",
        "count": 5,
        "observedLabels": [
          "loanAmount"
        ],
        "observedValueTypes": [
          "number"
        ]
      },
      {
        "inputKey": "study_cost",
        "count": 5,
        "observedLabels": [
          "study cost"
        ],
        "observedValueTypes": [
          "number"
        ]
      },
      {
        "inputKey": "total_project_cost",
        "count": 5,
        "observedLabels": [
          "total project cost"
        ],
        "observedValueTypes": [
          "number"
        ]
      },
      {
        "inputKey": "approved_award_amount",
        "count": 4,
        "observedLabels": [
          "approved award amount"
        ],
        "observedValueTypes": [
          "number"
        ]
      },
      {
        "inputKey": "cost",
        "count": 4,
        "observedLabels": [
          "cost"
        ],
        "observedValueTypes": [
          "number"
        ]
      },
      {
        "inputKey": "eligible_cost_cents",
        "count": 4,
        "observedLabels": [
          "eligible cost cents"
        ],
        "observedValueTypes": [
          "number"
        ]
      },
      {
        "inputKey": "eligible_dcfc_project",
        "count": 4,
        "observedLabels": [
          "eligible DCFC project"
        ],
        "observedValueTypes": [
          "text"
        ]
      },
      {
        "inputKey": "eligible_installation_invoice",
        "count": 4,
        "observedLabels": [
          "eligible installation invoice"
        ],
        "observedValueTypes": [
          "text"
        ]
      },
      {
        "inputKey": "eligible_project_budget",
        "count": 4,
        "observedLabels": [
          "eligible project budget"
        ],
        "observedValueTypes": [
          "text"
        ]
      },
      {
        "inputKey": "income_eligible_status",
        "count": 4,
        "observedLabels": [
          "income eligible status"
        ],
        "observedValueTypes": [
          "text"
        ]
      },
      {
        "inputKey": "incremental_project_cost",
        "count": 4,
        "observedLabels": [
          "incremental project cost"
        ],
        "observedValueTypes": [
          "number"
        ]
      },
      {
        "inputKey": "non_federal_match",
        "count": 4,
        "observedLabels": [
          "non federal match"
        ],
        "observedValueTypes": [
          "text"
        ]
      },
      {
        "inputKey": "premise_rebate_history",
        "count": 4,
        "observedLabels": [
          "premise rebate history"
        ],
        "observedValueTypes": [
          "text"
        ]
      },
      {
        "inputKey": "projectcost",
        "count": 4,
        "observedLabels": [
          "projectCost"
        ],
        "observedValueTypes": [
          "number"
        ]
      },
      {
        "inputKey": "public_or_eligible_mdu_use",
        "count": 4,
        "observedLabels": [
          "public or eligible MDU use"
        ],
        "observedValueTypes": [
          "text"
        ]
      },
      {
        "inputKey": "related_upgrade_cost",
        "count": 4,
        "observedLabels": [
          "related upgrade cost"
        ],
        "observedValueTypes": [
          "number"
        ]
      },
      {
        "inputKey": "ahri_match",
        "count": 3,
        "observedLabels": [
          "AHRI match"
        ],
        "observedValueTypes": [
          "text"
        ]
      },
      {
        "inputKey": "approved_project_cost",
        "count": 3,
        "observedLabels": [
          "approved project cost"
        ],
        "observedValueTypes": [
          "number"
        ]
      },
      {
        "inputKey": "approved_rebate_amount",
        "count": 3,
        "observedLabels": [
          "approved rebate amount"
        ],
        "observedValueTypes": [
          "number"
        ]
      },
      {
        "inputKey": "attic_insulation_upgrade_cost",
        "count": 3,
        "observedLabels": [
          "attic insulation upgrade cost"
        ],
        "observedValueTypes": [
          "number"
        ]
      },
      {
        "inputKey": "cec_funding_request",
        "count": 3,
        "observedLabels": [
          "CEC funding request"
        ],
        "observedValueTypes": [
          "text"
        ]
      },
      {
        "inputKey": "confirmed_point_of_sale_or_rebate_amount",
        "count": 3,
        "observedLabels": [
          "confirmed point of sale or rebate amount"
        ],
        "observedValueTypes": [
          "number"
        ]
      },
      {
        "inputKey": "cost_share_requirement",
        "count": 3,
        "observedLabels": [
          "cost-share requirement",
          "cost share requirement"
        ],
        "observedValueTypes": [
          "number"
        ]
      },
      {
        "inputKey": "current_rebate_amount",
        "count": 3,
        "observedLabels": [
          "current rebate amount"
        ],
        "observedValueTypes": [
          "number"
        ]
      },
      {
        "inputKey": "current_rebate_form",
        "count": 3,
        "observedLabels": [
          "current rebate form"
        ],
        "observedValueTypes": [
          "text"
        ]
      },
      {
        "inputKey": "duct_repair_cost",
        "count": 3,
        "observedLabels": [
          "duct repair cost"
        ],
        "observedValueTypes": [
          "number"
        ]
      },
      {
        "inputKey": "eligible_all_electric_vehicle",
        "count": 3,
        "observedLabels": [
          "eligible all electric vehicle"
        ],
        "observedValueTypes": [
          "text"
        ]
      },
      {
        "inputKey": "eligible_customer_cost",
        "count": 3,
        "observedLabels": [
          "eligible customer cost"
        ],
        "observedValueTypes": [
          "number"
        ]
      },
      {
        "inputKey": "eligible_device",
        "count": 3,
        "observedLabels": [
          "eligible device"
        ],
        "observedValueTypes": [
          "text"
        ]
      },
      {
        "inputKey": "eligible_infrastructure_cost",
        "count": 3,
        "observedLabels": [
          "eligible infrastructure cost"
        ],
        "observedValueTypes": [
          "number"
        ]
      },
      {
        "inputKey": "eligible_installed_cost",
        "count": 3,
        "observedLabels": [
          "eligible installed cost"
        ],
        "observedValueTypes": [
          "number"
        ]
      },
      {
        "inputKey": "eligible_networked_evse",
        "count": 3,
        "observedLabels": [
          "eligible networked EVSE"
        ],
        "observedValueTypes": [
          "text"
        ]
      },
      {
        "inputKey": "eligible_networking_years",
        "count": 3,
        "observedLabels": [
          "eligible networking years"
        ],
        "observedValueTypes": [
          "text"
        ]
      },
      {
        "inputKey": "eligible_weatherization_cost",
        "count": 3,
        "observedLabels": [
          "eligible weatherization cost"
        ],
        "observedValueTypes": [
          "number"
        ]
      },
      {
        "inputKey": "eligibledeviceorev",
        "count": 3,
        "observedLabels": [
          "eligibleDeviceOrEV"
        ],
        "observedValueTypes": [
          "text"
        ]
      },
      {
        "inputKey": "eligibleprojectcost",
        "count": 3,
        "observedLabels": [
          "eligibleProjectCost"
        ],
        "observedValueTypes": [
          "number"
        ]
      },
      {
        "inputKey": "evse_cost",
        "count": 3,
        "observedLabels": [
          "EVSE cost"
        ],
        "observedValueTypes": [
          "number"
        ]
      },
      {
        "inputKey": "final_quote",
        "count": 3,
        "observedLabels": [
          "final quote"
        ],
        "observedValueTypes": [
          "text"
        ]
      },
      {
        "inputKey": "improvement_cost",
        "count": 3,
        "observedLabels": [
          "improvement cost"
        ],
        "observedValueTypes": [
          "number"
        ]
      },
      {
        "inputKey": "incrementalprojectcostcents",
        "count": 3,
        "observedLabels": [
          "incrementalProjectCostCents"
        ],
        "observedValueTypes": [
          "number"
        ]
      },
      {
        "inputKey": "installation_cost_cents",
        "count": 3,
        "observedLabels": [
          "installation cost cents"
        ],
        "observedValueTypes": [
          "number"
        ]
      },
      {
        "inputKey": "installation_electrical_cost",
        "count": 3,
        "observedLabels": [
          "installation/electrical cost"
        ],
        "observedValueTypes": [
          "number"
        ]
      },
      {
        "inputKey": "installation_invoice",
        "count": 3,
        "observedLabels": [
          "installation invoice"
        ],
        "observedValueTypes": [
          "text"
        ]
      },
      {
        "inputKey": "installed_project_cost_cents",
        "count": 3,
        "observedLabels": [
          "installed project cost cents"
        ],
        "observedValueTypes": [
          "number"
        ]
      },
      {
        "inputKey": "installedjobcostcents",
        "count": 3,
        "observedLabels": [
          "installedJobCostCents"
        ],
        "observedValueTypes": [
          "number"
        ]
      },
      {
        "inputKey": "invoice_amount",
        "count": 3,
        "observedLabels": [
          "invoice amount"
        ],
        "observedValueTypes": [
          "number"
        ]
      },
      {
        "inputKey": "invoice_cost",
        "count": 3,
        "observedLabels": [
          "invoice cost"
        ],
        "observedValueTypes": [
          "number"
        ]
      },
      {
        "inputKey": "invoice_or_receipt",
        "count": 3,
        "observedLabels": [
          "invoice or receipt"
        ],
        "observedValueTypes": [
          "text"
        ]
      },
      {
        "inputKey": "marketplacepurchaseforadditionalinstantrebate",
        "count": 3,
        "observedLabels": [
          "marketplacePurchaseForAdditionalInstantRebate"
        ],
        "observedValueTypes": [
          "text"
        ]
      },
      {
        "inputKey": "one_rebate_per_home_status",
        "count": 3,
        "observedLabels": [
          "one-rebate-per-home status"
        ],
        "observedValueTypes": [
          "text"
        ]
      },
      {
        "inputKey": "project_cost_where_capped",
        "count": 3,
        "observedLabels": [
          "project cost where capped"
        ],
        "observedValueTypes": [
          "number"
        ]
      },
      {
        "inputKey": "rebate_claim_date",
        "count": 3,
        "observedLabels": [
          "rebate claim date"
        ],
        "observedValueTypes": [
          "text"
        ]
      },
      {
        "inputKey": "rebate_plus_eligibility",
        "count": 3,
        "observedLabels": [
          "rebate plus eligibility",
          "Rebate Plus eligibility"
        ],
        "observedValueTypes": [
          "text"
        ]
      },
      {
        "inputKey": "remaining_customer_share",
        "count": 3,
        "observedLabels": [
          "remaining customer share"
        ],
        "observedValueTypes": [
          "text"
        ]
      },
      {
        "inputKey": "requested_grant_amount",
        "count": 3,
        "observedLabels": [
          "requested grant amount"
        ],
        "observedValueTypes": [
          "number"
        ]
      },
      {
        "inputKey": "study_cost_cents",
        "count": 3,
        "observedLabels": [
          "study cost cents"
        ],
        "observedValueTypes": [
          "number"
        ]
      },
      {
        "inputKey": "applicable_on_peak_and_off_peak_energy_prices",
        "count": 2,
        "observedLabels": [
          "applicable on-peak and off-peak energy prices"
        ],
        "observedValueTypes": [
          "text"
        ]
      },
      {
        "inputKey": "application_or_quote",
        "count": 2,
        "observedLabels": [
          "application or quote"
        ],
        "observedValueTypes": [
          "text"
        ]
      },
      {
        "inputKey": "approval_amount",
        "count": 2,
        "observedLabels": [
          "approval amount"
        ],
        "observedValueTypes": [
          "number"
        ]
      },
      {
        "inputKey": "approved_contractor_quote",
        "count": 2,
        "observedLabels": [
          "approved contractor quote"
        ],
        "observedValueTypes": [
          "text"
        ]
      },
      {
        "inputKey": "approved_fit_price",
        "count": 2,
        "observedLabels": [
          "approved FiT price"
        ],
        "observedValueTypes": [
          "text"
        ]
      },
      {
        "inputKey": "available_funding",
        "count": 2,
        "observedLabels": [
          "available funding"
        ],
        "observedValueTypes": [
          "text"
        ]
      },
      {
        "inputKey": "charging_station_cost",
        "count": 2,
        "observedLabels": [
          "charging station cost"
        ],
        "observedValueTypes": [
          "number"
        ]
      },
      {
        "inputKey": "connected_homes_enrollment_before_rebate_application",
        "count": 2,
        "observedLabels": [
          "connected homes enrollment before rebate application"
        ],
        "observedValueTypes": [
          "text"
        ]
      },
      {
        "inputKey": "contractor_or_program_quote",
        "count": 2,
        "observedLabels": [
          "contractor or program quote"
        ],
        "observedValueTypes": [
          "text"
        ]
      },
      {
        "inputKey": "current_official_rebate_table",
        "count": 2,
        "observedLabels": [
          "current official rebate table"
        ],
        "observedValueTypes": [
          "text"
        ]
      },
      {
        "inputKey": "customer_repayment_share",
        "count": 2,
        "observedLabels": [
          "customer repayment share"
        ],
        "observedValueTypes": [
          "text"
        ]
      },
      {
        "inputKey": "distributor_pass_through_amount",
        "count": 2,
        "observedLabels": [
          "distributor pass through amount"
        ],
        "observedValueTypes": [
          "number"
        ]
      },
      {
        "inputKey": "eligible_commercial_heat_pump",
        "count": 2,
        "observedLabels": [
          "eligible commercial heat pump"
        ],
        "observedValueTypes": [
          "text"
        ]
      },
      {
        "inputKey": "eligible_contractor_or_form",
        "count": 2,
        "observedLabels": [
          "eligible contractor or form"
        ],
        "observedValueTypes": [
          "text"
        ]
      },
      {
        "inputKey": "eligible_cost_breakdown",
        "count": 2,
        "observedLabels": [
          "eligible cost breakdown"
        ],
        "observedValueTypes": [
          "number"
        ]
      },
      {
        "inputKey": "eligible_customer_side_make_ready_cost",
        "count": 2,
        "observedLabels": [
          "eligible customer side make ready cost"
        ],
        "observedValueTypes": [
          "number"
        ]
      },
      {
        "inputKey": "eligible_development_assistance_cost",
        "count": 2,
        "observedLabels": [
          "eligible development assistance cost"
        ],
        "observedValueTypes": [
          "number"
        ]
      },
      {
        "inputKey": "eligible_documented_expenditures",
        "count": 2,
        "observedLabels": [
          "eligible documented expenditures"
        ],
        "observedValueTypes": [
          "text"
        ]
      },
      {
        "inputKey": "eligible_fleet_site_category",
        "count": 2,
        "observedLabels": [
          "eligible fleet site category"
        ],
        "observedValueTypes": [
          "text"
        ]
      },
      {
        "inputKey": "eligible_labor_cost",
        "count": 2,
        "observedLabels": [
          "eligible labor cost"
        ],
        "observedValueTypes": [
          "number"
        ]
      },
      {
        "inputKey": "eligible_local_jurisdiction",
        "count": 2,
        "observedLabels": [
          "eligible local jurisdiction"
        ],
        "observedValueTypes": [
          "text"
        ]
      },
      {
        "inputKey": "eligible_location",
        "count": 2,
        "observedLabels": [
          "eligible location"
        ],
        "observedValueTypes": [
          "text"
        ]
      },
      {
        "inputKey": "eligible_material_cost",
        "count": 2,
        "observedLabels": [
          "eligible material cost"
        ],
        "observedValueTypes": [
          "number"
        ]
      },
      {
        "inputKey": "eligible_network_fee",
        "count": 2,
        "observedLabels": [
          "eligible network fee"
        ],
        "observedValueTypes": [
          "text"
        ]
      },
      {
        "inputKey": "eligible_panel_upgrade_cost",
        "count": 2,
        "observedLabels": [
          "eligible panel upgrade cost"
        ],
        "observedValueTypes": [
          "number"
        ]
      },
      {
        "inputKey": "eligible_product_sku",
        "count": 2,
        "observedLabels": [
          "eligible product SKU"
        ],
        "observedValueTypes": [
          "text"
        ]
      },
      {
        "inputKey": "eligible_project_confirmation",
        "count": 2,
        "observedLabels": [
          "eligible project confirmation"
        ],
        "observedValueTypes": [
          "text"
        ]
      },
      {
        "inputKey": "eligible_project_cost_or_incremental_cost",
        "count": 2,
        "observedLabels": [
          "eligible project cost or incremental cost"
        ],
        "observedValueTypes": [
          "number"
        ]
      },
      {
        "inputKey": "eligible_public_sector_customer",
        "count": 2,
        "observedLabels": [
          "eligible public sector customer"
        ],
        "observedValueTypes": [
          "text"
        ]
      },
      {
        "inputKey": "eligible_purchase_channel",
        "count": 2,
        "observedLabels": [
          "eligible purchase channel"
        ],
        "observedValueTypes": [
          "text"
        ]
      },
      {
        "inputKey": "eligible_rate_class",
        "count": 2,
        "observedLabels": [
          "eligible rate class"
        ],
        "observedValueTypes": [
          "number"
        ]
      },
      {
        "inputKey": "eligible_residential_address",
        "count": 2,
        "observedLabels": [
          "eligible residential address"
        ],
        "observedValueTypes": [
          "text"
        ]
      },
      {
        "inputKey": "eligible_schedule",
        "count": 2,
        "observedLabels": [
          "eligible schedule"
        ],
        "observedValueTypes": [
          "text"
        ]
      },
      {
        "inputKey": "eligible_school_status",
        "count": 2,
        "observedLabels": [
          "eligible school status"
        ],
        "observedValueTypes": [
          "text"
        ]
      },
      {
        "inputKey": "eligible_site_category",
        "count": 2,
        "observedLabels": [
          "eligible site category"
        ],
        "observedValueTypes": [
          "text"
        ]
      },
      {
        "inputKey": "eligible_summer_months",
        "count": 2,
        "observedLabels": [
          "eligible summer months"
        ],
        "observedValueTypes": [
          "text"
        ]
      },
      {
        "inputKey": "eligible_system_cost",
        "count": 2,
        "observedLabels": [
          "eligible system cost"
        ],
        "observedValueTypes": [
          "number"
        ]
      },
      {
        "inputKey": "eligible_tribal_or_alaska_native_entity",
        "count": 2,
        "observedLabels": [
          "eligible Tribal or Alaska Native entity"
        ],
        "observedValueTypes": [
          "text"
        ]
      },
      {
        "inputKey": "eligible_warranty_cost",
        "count": 2,
        "observedLabels": [
          "eligible warranty cost"
        ],
        "observedValueTypes": [
          "number"
        ]
      },
      {
        "inputKey": "eligible_wiring_cost",
        "count": 2,
        "observedLabels": [
          "eligible wiring cost"
        ],
        "observedValueTypes": [
          "number"
        ]
      },
      {
        "inputKey": "eligibleconnecteddevice",
        "count": 2,
        "observedLabels": [
          "eligibleConnectedDevice"
        ],
        "observedValueTypes": [
          "text"
        ]
      },
      {
        "inputKey": "eligiblecostcents",
        "count": 2,
        "observedLabels": [
          "eligibleCostCents"
        ],
        "observedValueTypes": [
          "number"
        ]
      },
      {
        "inputKey": "eligiblesmartlevel2evse",
        "count": 2,
        "observedLabels": [
          "eligibleSmartLevel2EVSE"
        ],
        "observedValueTypes": [
          "text"
        ]
      },
      {
        "inputKey": "ev_purchase_price",
        "count": 2,
        "observedLabels": [
          "EV purchase price"
        ],
        "observedValueTypes": [
          "text"
        ]
      },
      {
        "inputKey": "final_installer_quote",
        "count": 2,
        "observedLabels": [
          "final installer quote"
        ],
        "observedValueTypes": [
          "text"
        ]
      },
      {
        "inputKey": "funding_available",
        "count": 2,
        "observedLabels": [
          "funding available"
        ],
        "observedValueTypes": [
          "text"
        ]
      },
      {
        "inputKey": "homeownership_or_eligible_site",
        "count": 2,
        "observedLabels": [
          "homeownership or eligible site"
        ],
        "observedValueTypes": [
          "text"
        ]
      },
      {
        "inputKey": "household_rebate_history",
        "count": 2,
        "observedLabels": [
          "household rebate history"
        ],
        "observedValueTypes": [
          "text"
        ]
      },
      {
        "inputKey": "incentive_amount",
        "count": 2,
        "observedLabels": [
          "incentive amount"
        ],
        "observedValueTypes": [
          "number"
        ]
      },
      {
        "inputKey": "installationinvoice",
        "count": 2,
        "observedLabels": [
          "installationInvoice"
        ],
        "observedValueTypes": [
          "text"
        ]
      },
      {
        "inputKey": "installed_system_cost",
        "count": 2,
        "observedLabels": [
          "installed system cost"
        ],
        "observedValueTypes": [
          "number"
        ]
      },
      {
        "inputKey": "installedprojectcost",
        "count": 2,
        "observedLabels": [
          "installedProjectCost"
        ],
        "observedValueTypes": [
          "number"
        ]
      },
      {
        "inputKey": "invoice_and_installation_date",
        "count": 2,
        "observedLabels": [
          "invoice and installation date"
        ],
        "observedValueTypes": [
          "text"
        ]
      },
      {
        "inputKey": "invoice_and_verification_documents",
        "count": 2,
        "observedLabels": [
          "invoice and verification documents"
        ],
        "observedValueTypes": [
          "text"
        ]
      },
      {
        "inputKey": "invoice_or_project_cost",
        "count": 2,
        "observedLabels": [
          "invoice or project cost"
        ],
        "observedValueTypes": [
          "number"
        ]
      },
      {
        "inputKey": "invoice_or_proof_of_purchase",
        "count": 2,
        "observedLabels": [
          "invoice or proof of purchase"
        ],
        "observedValueTypes": [
          "text"
        ]
      },
      {
        "inputKey": "invoiceorquote",
        "count": 2,
        "observedLabels": [
          "invoiceOrQuote"
        ],
        "observedValueTypes": [
          "text"
        ]
      },
      {
        "inputKey": "loan_interest_rate",
        "count": 2,
        "observedLabels": [
          "loan interest rate"
        ],
        "observedValueTypes": [
          "number"
        ]
      },
      {
        "inputKey": "loan_term_months",
        "count": 2,
        "observedLabels": [
          "loan term months"
        ],
        "observedValueTypes": [
          "text"
        ]
      },
      {
        "inputKey": "local_dollar_amount",
        "count": 2,
        "observedLabels": [
          "local dollar amount"
        ],
        "observedValueTypes": [
          "number"
        ]
      },
      {
        "inputKey": "marketplace_purchase_price_cents",
        "count": 2,
        "observedLabels": [
          "marketplace purchase price cents"
        ],
        "observedValueTypes": [
          "text"
        ]
      },
      {
        "inputKey": "materialcostifselfinstalled",
        "count": 2,
        "observedLabels": [
          "materialCostIfSelfInstalled"
        ],
        "observedValueTypes": [
          "number"
        ]
      },
      {
        "inputKey": "msrp_or_purchase_price",
        "count": 2,
        "observedLabels": [
          "MSRP or purchase price"
        ],
        "observedValueTypes": [
          "text"
        ]
      },
      {
        "inputKey": "no_cost_energy_analysis",
        "count": 2,
        "observedLabels": [
          "no cost energy analysis"
        ],
        "observedValueTypes": [
          "number"
        ]
      },
      {
        "inputKey": "non_federal_match_amount",
        "count": 2,
        "observedLabels": [
          "non federal match amount",
          "non-federal match amount"
        ],
        "observedValueTypes": [
          "number"
        ]
      },
      {
        "inputKey": "normal_approved_rebate_amount",
        "count": 2,
        "observedLabels": [
          "normal approved rebate amount"
        ],
        "observedValueTypes": [
          "number"
        ]
      },
      {
        "inputKey": "normal_svp_rebate_amount",
        "count": 2,
        "observedLabels": [
          "normal SVP rebate amount"
        ],
        "observedValueTypes": [
          "number"
        ]
      },
      {
        "inputKey": "one_rebate_per_residence_status",
        "count": 2,
        "observedLabels": [
          "one rebate per residence status"
        ],
        "observedValueTypes": [
          "text"
        ]
      },
      {
        "inputKey": "package_price",
        "count": 2,
        "observedLabels": [
          "package price"
        ],
        "observedValueTypes": [
          "text"
        ]
      },
      {
        "inputKey": "paid_invoice",
        "count": 2,
        "observedLabels": [
          "paid invoice"
        ],
        "observedValueTypes": [
          "text"
        ]
      },
      {
        "inputKey": "participant_budget_share_status",
        "count": 2,
        "observedLabels": [
          "participant budget share status"
        ],
        "observedValueTypes": [
          "text"
        ]
      },
      {
        "inputKey": "pass_through_amount",
        "count": 2,
        "observedLabels": [
          "pass through amount"
        ],
        "observedValueTypes": [
          "number"
        ]
      },
      {
        "inputKey": "pays_project_cost",
        "count": 2,
        "observedLabels": [
          "pays project cost"
        ],
        "observedValueTypes": [
          "number"
        ]
      }
    ],
    "eligibility_timing_or_profile": [
      {
        "inputKey": "preapproval_status",
        "count": 83,
        "observedLabels": [
          "preapproval status"
        ],
        "observedValueTypes": [
          "text"
        ]
      },
      {
        "inputKey": "installation_date",
        "count": 78,
        "observedLabels": [
          "installation date"
        ],
        "observedValueTypes": [
          "text"
        ]
      },
      {
        "inputKey": "purchase_date",
        "count": 39,
        "observedLabels": [
          "purchase date"
        ],
        "observedValueTypes": [
          "text"
        ]
      },
      {
        "inputKey": "preapproval",
        "count": 28,
        "observedLabels": [
          "preapproval"
        ],
        "observedValueTypes": [
          "text"
        ]
      },
      {
        "inputKey": "proof_of_purchase",
        "count": 28,
        "observedLabels": [
          "proof of purchase"
        ],
        "observedValueTypes": [
          "text"
        ]
      },
      {
        "inputKey": "enrollment_status",
        "count": 24,
        "observedLabels": [
          "enrollment status"
        ],
        "observedValueTypes": [
          "text"
        ]
      },
      {
        "inputKey": "program_enrollment",
        "count": 24,
        "observedLabels": [
          "program enrollment"
        ],
        "observedValueTypes": [
          "text"
        ]
      },
      {
        "inputKey": "income_qualification",
        "count": 19,
        "observedLabels": [
          "income qualification"
        ],
        "observedValueTypes": [
          "text"
        ]
      },
      {
        "inputKey": "customer_class",
        "count": 18,
        "observedLabels": [
          "customer class"
        ],
        "observedValueTypes": [
          "text"
        ]
      },
      {
        "inputKey": "income_qualified_status",
        "count": 14,
        "observedLabels": [
          "income qualified status"
        ],
        "observedValueTypes": [
          "text"
        ]
      },
      {
        "inputKey": "purchase_or_installation_date",
        "count": 12,
        "observedLabels": [
          "purchase or installation date"
        ],
        "observedValueTypes": [
          "text"
        ]
      },
      {
        "inputKey": "application_date",
        "count": 11,
        "observedLabels": [
          "application date"
        ],
        "observedValueTypes": [
          "text"
        ]
      },
      {
        "inputKey": "energy_star_status",
        "count": 11,
        "observedLabels": [
          "energy star status",
          "ENERGY STAR status"
        ],
        "observedValueTypes": [
          "text"
        ]
      },
      {
        "inputKey": "connected_homes_enrollment",
        "count": 10,
        "observedLabels": [
          "connected homes enrollment",
          "Connected Homes enrollment"
        ],
        "observedValueTypes": [
          "text"
        ]
      },
      {
        "inputKey": "enrollmentstatus",
        "count": 10,
        "observedLabels": [
          "enrollmentStatus"
        ],
        "observedValueTypes": [
          "text"
        ]
      },
      {
        "inputKey": "preapproval_status_where_required",
        "count": 9,
        "observedLabels": [
          "preapproval status where required"
        ],
        "observedValueTypes": [
          "text"
        ]
      },
      {
        "inputKey": "completion_date",
        "count": 8,
        "observedLabels": [
          "completion date"
        ],
        "observedValueTypes": [
          "text"
        ]
      },
      {
        "inputKey": "connection_status_for_chargepoint",
        "count": 8,
        "observedLabels": [
          "connection status for chargepoint"
        ],
        "observedValueTypes": [
          "text"
        ]
      },
      {
        "inputKey": "customer_sector",
        "count": 8,
        "observedLabels": [
          "customer sector"
        ],
        "observedValueTypes": [
          "text"
        ]
      },
      {
        "inputKey": "energy_star_qualification",
        "count": 8,
        "observedLabels": [
          "energy star qualification",
          "ENERGY STAR qualification"
        ],
        "observedValueTypes": [
          "text"
        ]
      },
      {
        "inputKey": "installation_documentation",
        "count": 8,
        "observedLabels": [
          "installation documentation"
        ],
        "observedValueTypes": [
          "text"
        ]
      },
      {
        "inputKey": "installationdate",
        "count": 8,
        "observedLabels": [
          "installationDate"
        ],
        "observedValueTypes": [
          "text"
        ]
      },
      {
        "inputKey": "application_timing",
        "count": 7,
        "observedLabels": [
          "application timing"
        ],
        "observedValueTypes": [
          "text"
        ]
      },
      {
        "inputKey": "application_within_90_days",
        "count": 7,
        "observedLabels": [
          "application within 90 days"
        ],
        "observedValueTypes": [
          "text"
        ]
      },
      {
        "inputKey": "approval_status",
        "count": 7,
        "observedLabels": [
          "approval status"
        ],
        "observedValueTypes": [
          "text"
        ]
      },
      {
        "inputKey": "contractor_status",
        "count": 7,
        "observedLabels": [
          "contractor status"
        ],
        "observedValueTypes": [
          "text"
        ]
      },
      {
        "inputKey": "program_enrollment_status",
        "count": 7,
        "observedLabels": [
          "program enrollment status"
        ],
        "observedValueTypes": [
          "text"
        ]
      },
      {
        "inputKey": "purchasedate",
        "count": 7,
        "observedLabels": [
          "purchaseDate"
        ],
        "observedValueTypes": [
          "text"
        ]
      },
      {
        "inputKey": "replacement_status",
        "count": 7,
        "observedLabels": [
          "replacement status"
        ],
        "observedValueTypes": [
          "text"
        ]
      },
      {
        "inputKey": "service_address",
        "count": 7,
        "observedLabels": [
          "service address"
        ],
        "observedValueTypes": [
          "text"
        ]
      },
      {
        "inputKey": "applicationdate",
        "count": 6,
        "observedLabels": [
          "applicationDate"
        ],
        "observedValueTypes": [
          "text"
        ]
      },
      {
        "inputKey": "contractor_network_status",
        "count": 6,
        "observedLabels": [
          "contractor network status",
          "contractor-network status"
        ],
        "observedValueTypes": [
          "text"
        ]
      },
      {
        "inputKey": "customer_segment",
        "count": 6,
        "observedLabels": [
          "customer segment"
        ],
        "observedValueTypes": [
          "text"
        ]
      },
      {
        "inputKey": "preapproval_date",
        "count": 6,
        "observedLabels": [
          "preapproval date"
        ],
        "observedValueTypes": [
          "text"
        ]
      },
      {
        "inputKey": "preapproval_if_required",
        "count": 6,
        "observedLabels": [
          "preapproval if required"
        ],
        "observedValueTypes": [
          "text"
        ]
      },
      {
        "inputKey": "preapproval_where_required",
        "count": 6,
        "observedLabels": [
          "preapproval where required"
        ],
        "observedValueTypes": [
          "text"
        ]
      },
      {
        "inputKey": "preapprovalstatus",
        "count": 6,
        "observedLabels": [
          "preapprovalStatus"
        ],
        "observedValueTypes": [
          "text"
        ]
      },
      {
        "inputKey": "service_territory",
        "count": 6,
        "observedLabels": [
          "service territory"
        ],
        "observedValueTypes": [
          "text"
        ]
      },
      {
        "inputKey": "energy_star_or_cold_climate_status",
        "count": 5,
        "observedLabels": [
          "ENERGY STAR or cold-climate status",
          "ENERGY STAR or cold climate status"
        ],
        "observedValueTypes": [
          "text"
        ]
      },
      {
        "inputKey": "energy_star_or_program_qualification",
        "count": 5,
        "observedLabels": [
          "ENERGY STAR or program qualification"
        ],
        "observedValueTypes": [
          "text"
        ]
      },
      {
        "inputKey": "installation_or_purchase_date",
        "count": 5,
        "observedLabels": [
          "installation or purchase date"
        ],
        "observedValueTypes": [
          "text"
        ]
      },
      {
        "inputKey": "installed_r_value",
        "count": 5,
        "observedLabels": [
          "installed R value",
          "installed r value"
        ],
        "observedValueTypes": [
          "text"
        ]
      },
      {
        "inputKey": "off_peak_program_enrollment",
        "count": 5,
        "observedLabels": [
          "off peak program enrollment"
        ],
        "observedValueTypes": [
          "text"
        ]
      },
      {
        "inputKey": "program_approval",
        "count": 5,
        "observedLabels": [
          "program approval"
        ],
        "observedValueTypes": [
          "text"
        ]
      },
      {
        "inputKey": "program_sponsor_approval",
        "count": 5,
        "observedLabels": [
          "program sponsor approval"
        ],
        "observedValueTypes": [
          "text"
        ]
      },
      {
        "inputKey": "rate_enrollment",
        "count": 5,
        "observedLabels": [
          "rate enrollment"
        ],
        "observedValueTypes": [
          "number"
        ]
      },
      {
        "inputKey": "reservation_status",
        "count": 5,
        "observedLabels": [
          "reservation status"
        ],
        "observedValueTypes": [
          "text"
        ]
      },
      {
        "inputKey": "application_score_or_award_decision",
        "count": 4,
        "observedLabels": [
          "application score or award decision"
        ],
        "observedValueTypes": [
          "text"
        ]
      },
      {
        "inputKey": "application_score_or_award_probability",
        "count": 4,
        "observedLabels": [
          "application score or award probability"
        ],
        "observedValueTypes": [
          "text"
        ]
      },
      {
        "inputKey": "application_within_six_months",
        "count": 4,
        "observedLabels": [
          "application within six months"
        ],
        "observedValueTypes": [
          "text"
        ]
      },
      {
        "inputKey": "approval",
        "count": 4,
        "observedLabels": [
          "approval"
        ],
        "observedValueTypes": [
          "text"
        ]
      },
      {
        "inputKey": "avista_business_customer",
        "count": 4,
        "observedLabels": [
          "avista business customer"
        ],
        "observedValueTypes": [
          "text"
        ]
      },
      {
        "inputKey": "cold_climate_status",
        "count": 4,
        "observedLabels": [
          "cold climate status"
        ],
        "observedValueTypes": [
          "text"
        ]
      },
      {
        "inputKey": "commercial_customer_status",
        "count": 4,
        "observedLabels": [
          "commercial customer status"
        ],
        "observedValueTypes": [
          "text"
        ]
      },
      {
        "inputKey": "commercial_project_approval",
        "count": 4,
        "observedLabels": [
          "commercial project approval"
        ],
        "observedValueTypes": [
          "text"
        ]
      },
      {
        "inputKey": "continued_program_enrollment",
        "count": 4,
        "observedLabels": [
          "continued program enrollment"
        ],
        "observedValueTypes": [
          "text"
        ]
      },
      {
        "inputKey": "dac_status",
        "count": 4,
        "observedLabels": [
          "DAC status"
        ],
        "observedValueTypes": [
          "text"
        ]
      },
      {
        "inputKey": "demand_response_enrollment",
        "count": 4,
        "observedLabels": [
          "demand response enrollment"
        ],
        "observedValueTypes": [
          "text"
        ]
      },
      {
        "inputKey": "ev_or_phev_purchase_lease_or_preorder",
        "count": 4,
        "observedLabels": [
          "EV or PHEV purchase lease or preorder"
        ],
        "observedValueTypes": [
          "text"
        ]
      },
      {
        "inputKey": "facility_data",
        "count": 4,
        "observedLabels": [
          "facility data"
        ],
        "observedValueTypes": [
          "text"
        ]
      },
      {
        "inputKey": "facility_information",
        "count": 4,
        "observedLabels": [
          "facility information"
        ],
        "observedValueTypes": [
          "text"
        ]
      },
      {
        "inputKey": "forklift_purchase_or_lease",
        "count": 4,
        "observedLabels": [
          "forklift purchase or lease"
        ],
        "observedValueTypes": [
          "text"
        ]
      },
      {
        "inputKey": "income_or_cares_qualification",
        "count": 4,
        "observedLabels": [
          "income or CARES qualification"
        ],
        "observedValueTypes": [
          "text"
        ]
      },
      {
        "inputKey": "income_pathway",
        "count": 4,
        "observedLabels": [
          "income pathway"
        ],
        "observedValueTypes": [
          "text"
        ]
      },
      {
        "inputKey": "installation_address",
        "count": 4,
        "observedLabels": [
          "installation address"
        ],
        "observedValueTypes": [
          "text"
        ]
      },
      {
        "inputKey": "memberresidence",
        "count": 4,
        "observedLabels": [
          "memberResidence"
        ],
        "observedValueTypes": [
          "text"
        ]
      },
      {
        "inputKey": "months_enrolled",
        "count": 4,
        "observedLabels": [
          "months enrolled"
        ],
        "observedValueTypes": [
          "text"
        ]
      },
      {
        "inputKey": "nighttime_savers_enrollment",
        "count": 4,
        "observedLabels": [
          "Nighttime Savers enrollment"
        ],
        "observedValueTypes": [
          "text"
        ]
      },
      {
        "inputKey": "participating_contractor_status",
        "count": 4,
        "observedLabels": [
          "participating contractor status"
        ],
        "observedValueTypes": [
          "text"
        ]
      },
      {
        "inputKey": "participating_green_motors_service_center",
        "count": 4,
        "observedLabels": [
          "participating green motors service center"
        ],
        "observedValueTypes": [
          "text"
        ]
      },
      {
        "inputKey": "permission_to_operate_date",
        "count": 4,
        "observedLabels": [
          "permission to operate date"
        ],
        "observedValueTypes": [
          "number"
        ]
      },
      {
        "inputKey": "preapproval_before_purchase",
        "count": 4,
        "observedLabels": [
          "preapproval before purchase"
        ],
        "observedValueTypes": [
          "text"
        ]
      },
      {
        "inputKey": "preapproval_status_if_required",
        "count": 4,
        "observedLabels": [
          "preapproval status if required"
        ],
        "observedValueTypes": [
          "text"
        ]
      },
      {
        "inputKey": "project_approval",
        "count": 4,
        "observedLabels": [
          "project approval"
        ],
        "observedValueTypes": [
          "text"
        ]
      },
      {
        "inputKey": "purchase_and_installation_date",
        "count": 4,
        "observedLabels": [
          "purchase and installation date"
        ],
        "observedValueTypes": [
          "text"
        ]
      },
      {
        "inputKey": "purchase_or_install_date",
        "count": 4,
        "observedLabels": [
          "purchase or install date"
        ],
        "observedValueTypes": [
          "text"
        ]
      },
      {
        "inputKey": "purchase_or_lease_date",
        "count": 4,
        "observedLabels": [
          "purchase or lease date"
        ],
        "observedValueTypes": [
          "text"
        ]
      },
      {
        "inputKey": "qcn_contractor_status",
        "count": 4,
        "observedLabels": [
          "qcn contractor status"
        ],
        "observedValueTypes": [
          "text"
        ]
      },
      {
        "inputKey": "qualified_product_status",
        "count": 4,
        "observedLabels": [
          "qualified product status"
        ],
        "observedValueTypes": [
          "text"
        ]
      },
      {
        "inputKey": "residential_customer",
        "count": 4,
        "observedLabels": [
          "residential customer"
        ],
        "observedValueTypes": [
          "text"
        ]
      },
      {
        "inputKey": "service_requested",
        "count": 4,
        "observedLabels": [
          "service requested"
        ],
        "observedValueTypes": [
          "text"
        ]
      },
      {
        "inputKey": "simplesaver_enrollment_status",
        "count": 4,
        "observedLabels": [
          "SimpleSaver enrollment status"
        ],
        "observedValueTypes": [
          "text"
        ]
      },
      {
        "inputKey": "site_contact",
        "count": 4,
        "observedLabels": [
          "site contact"
        ],
        "observedValueTypes": [
          "text"
        ]
      },
      {
        "inputKey": "smart_charging_or_nighttime_savers_enrollment",
        "count": 4,
        "observedLabels": [
          "Smart Charging or Nighttime Savers enrollment"
        ],
        "observedValueTypes": [
          "text"
        ]
      },
      {
        "inputKey": "utility_approval",
        "count": 4,
        "observedLabels": [
          "utility approval"
        ],
        "observedValueTypes": [
          "text"
        ]
      },
      {
        "inputKey": "application_within_four_weeks_of_completion",
        "count": 3,
        "observedLabels": [
          "application within four weeks of completion"
        ],
        "observedValueTypes": [
          "text"
        ]
      },
      {
        "inputKey": "applicationwithin90days",
        "count": 3,
        "observedLabels": [
          "applicationWithin90Days"
        ],
        "observedValueTypes": [
          "text"
        ]
      },
      {
        "inputKey": "approval_before_installation",
        "count": 3,
        "observedLabels": [
          "approval before installation"
        ],
        "observedValueTypes": [
          "text"
        ]
      },
      {
        "inputKey": "approved_contractor_status",
        "count": 3,
        "observedLabels": [
          "approved contractor status"
        ],
        "observedValueTypes": [
          "text"
        ]
      },
      {
        "inputKey": "audit_completion",
        "count": 3,
        "observedLabels": [
          "audit completion"
        ],
        "observedValueTypes": [
          "text"
        ]
      },
      {
        "inputKey": "audit_status",
        "count": 3,
        "observedLabels": [
          "audit status"
        ],
        "observedValueTypes": [
          "text"
        ]
      },
      {
        "inputKey": "award_selection_status",
        "count": 3,
        "observedLabels": [
          "award selection status"
        ],
        "observedValueTypes": [
          "text"
        ]
      },
      {
        "inputKey": "building_complexity",
        "count": 3,
        "observedLabels": [
          "building complexity"
        ],
        "observedValueTypes": [
          "text"
        ]
      },
      {
        "inputKey": "bundle_selection_status",
        "count": 3,
        "observedLabels": [
          "bundle selection status"
        ],
        "observedValueTypes": [
          "text"
        ]
      },
      {
        "inputKey": "business_customer_status",
        "count": 3,
        "observedLabels": [
          "business customer status"
        ],
        "observedValueTypes": [
          "text"
        ]
      },
      {
        "inputKey": "byoc_enrollment",
        "count": 3,
        "observedLabels": [
          "BYOC enrollment"
        ],
        "observedValueTypes": [
          "text"
        ]
      },
      {
        "inputKey": "connectedhomes_enrollment",
        "count": 3,
        "observedLabels": [
          "connectedhomes enrollment"
        ],
        "observedValueTypes": [
          "text"
        ]
      },
      {
        "inputKey": "construction_completion_date",
        "count": 3,
        "observedLabels": [
          "construction completion date"
        ],
        "observedValueTypes": [
          "text"
        ]
      },
      {
        "inputKey": "current_application",
        "count": 3,
        "observedLabels": [
          "current application"
        ],
        "observedValueTypes": [
          "text"
        ]
      },
      {
        "inputKey": "current_application_limit",
        "count": 3,
        "observedLabels": [
          "current application limit"
        ],
        "observedValueTypes": [
          "text"
        ]
      },
      {
        "inputKey": "customer_investment_estimate",
        "count": 3,
        "observedLabels": [
          "customer investment estimate"
        ],
        "observedValueTypes": [
          "text"
        ]
      },
      {
        "inputKey": "customer_ownership",
        "count": 3,
        "observedLabels": [
          "customer ownership"
        ],
        "observedValueTypes": [
          "text"
        ]
      },
      {
        "inputKey": "customer_payment_option",
        "count": 3,
        "observedLabels": [
          "customer payment option"
        ],
        "observedValueTypes": [
          "text"
        ]
      },
      {
        "inputKey": "customer_rate_class",
        "count": 3,
        "observedLabels": [
          "customer rate class"
        ],
        "observedValueTypes": [
          "number"
        ]
      },
      {
        "inputKey": "dacstatus",
        "count": 3,
        "observedLabels": [
          "DACstatus"
        ],
        "observedValueTypes": [
          "text"
        ]
      },
      {
        "inputKey": "dcfc_service_start_date",
        "count": 3,
        "observedLabels": [
          "DCFC service start date"
        ],
        "observedValueTypes": [
          "text"
        ]
      },
      {
        "inputKey": "early_design_phase_status",
        "count": 3,
        "observedLabels": [
          "early design phase status"
        ],
        "observedValueTypes": [
          "text"
        ]
      },
      {
        "inputKey": "ejc_status",
        "count": 3,
        "observedLabels": [
          "EJC status"
        ],
        "observedValueTypes": [
          "text"
        ]
      },
      {
        "inputKey": "electric_utility_customer_status",
        "count": 3,
        "observedLabels": [
          "electric utility customer status"
        ],
        "observedValueTypes": [
          "text"
        ]
      },
      {
        "inputKey": "electricheatingstatus",
        "count": 3,
        "observedLabels": [
          "electricHeatingStatus"
        ],
        "observedValueTypes": [
          "text"
        ]
      },
      {
        "inputKey": "enrollment_anniversary",
        "count": 3,
        "observedLabels": [
          "enrollment anniversary"
        ],
        "observedValueTypes": [
          "text"
        ]
      },
      {
        "inputKey": "environmental_justice_area_status",
        "count": 3,
        "observedLabels": [
          "environmental justice area status"
        ],
        "observedValueTypes": [
          "text"
        ]
      },
      {
        "inputKey": "ev_rate_enrollment",
        "count": 3,
        "observedLabels": [
          "ev rate enrollment",
          "EV rate enrollment"
        ],
        "observedValueTypes": [
          "number"
        ]
      },
      {
        "inputKey": "ev_time_of_day_rate_enrollment",
        "count": 3,
        "observedLabels": [
          "ev time of day rate enrollment"
        ],
        "observedValueTypes": [
          "number"
        ]
      },
      {
        "inputKey": "final_paperwork_date",
        "count": 3,
        "observedLabels": [
          "final paperwork date"
        ],
        "observedValueTypes": [
          "text"
        ]
      },
      {
        "inputKey": "financing_approval",
        "count": 3,
        "observedLabels": [
          "financing approval"
        ],
        "observedValueTypes": [
          "text"
        ]
      },
      {
        "inputKey": "fleet_program_enrollment",
        "count": 3,
        "observedLabels": [
          "fleet program enrollment"
        ],
        "observedValueTypes": [
          "text"
        ]
      },
      {
        "inputKey": "gas_service_status",
        "count": 3,
        "observedLabels": [
          "gas service status"
        ],
        "observedValueTypes": [
          "text"
        ]
      },
      {
        "inputKey": "gas_service_turn_on_date",
        "count": 3,
        "observedLabels": [
          "gas service turn on date"
        ],
        "observedValueTypes": [
          "text"
        ]
      },
      {
        "inputKey": "income_ejc_status",
        "count": 3,
        "observedLabels": [
          "income EJC status"
        ],
        "observedValueTypes": [
          "text"
        ]
      },
      {
        "inputKey": "income_qualified_facility_status",
        "count": 3,
        "observedLabels": [
          "income qualified facility status"
        ],
        "observedValueTypes": [
          "text"
        ]
      },
      {
        "inputKey": "incomeenhancedpathifapplicable",
        "count": 3,
        "observedLabels": [
          "incomeEnhancedPathIfApplicable"
        ],
        "observedValueTypes": [
          "text"
        ]
      },
      {
        "inputKey": "incomeorr2status",
        "count": 3,
        "observedLabels": [
          "incomeOrR2Status"
        ],
        "observedValueTypes": [
          "text"
        ]
      },
      {
        "inputKey": "installation_path",
        "count": 3,
        "observedLabels": [
          "installation path"
        ],
        "observedValueTypes": [
          "text"
        ]
      },
      {
        "inputKey": "internet_connection_status",
        "count": 3,
        "observedLabels": [
          "internet connection status"
        ],
        "observedValueTypes": [
          "text"
        ]
      },
      {
        "inputKey": "lane_electric_member_status",
        "count": 3,
        "observedLabels": [
          "Lane Electric member status"
        ],
        "observedValueTypes": [
          "text"
        ]
      },
      {
        "inputKey": "lenderapproval",
        "count": 3,
        "observedLabels": [
          "lenderApproval"
        ],
        "observedValueTypes": [
          "text"
        ]
      },
      {
        "inputKey": "major_alteration_or_new_construction_status",
        "count": 3,
        "observedLabels": [
          "major alteration or new construction status"
        ],
        "observedValueTypes": [
          "text"
        ]
      },
      {
        "inputKey": "managed_charging_enrollment",
        "count": 3,
        "observedLabels": [
          "managed charging enrollment"
        ],
        "observedValueTypes": [
          "text"
        ]
      },
      {
        "inputKey": "marketplacepurchasestatus",
        "count": 3,
        "observedLabels": [
          "marketplacePurchaseStatus"
        ],
        "observedValueTypes": [
          "text"
        ]
      },
      {
        "inputKey": "member_utility",
        "count": 3,
        "observedLabels": [
          "member utility"
        ],
        "observedValueTypes": [
          "text"
        ]
      },
      {
        "inputKey": "michigan_registered_pev_status",
        "count": 3,
        "observedLabels": [
          "Michigan registered PEV status"
        ],
        "observedValueTypes": [
          "text"
        ]
      },
      {
        "inputKey": "nevi_corridor_site",
        "count": 3,
        "observedLabels": [
          "NEVI corridor site"
        ],
        "observedValueTypes": [
          "text"
        ]
      },
      {
        "inputKey": "new_construction_status",
        "count": 3,
        "observedLabels": [
          "new construction status"
        ],
        "observedValueTypes": [
          "text"
        ]
      },
      {
        "inputKey": "new_service_required",
        "count": 3,
        "observedLabels": [
          "new service required"
        ],
        "observedValueTypes": [
          "text"
        ]
      },
      {
        "inputKey": "new_utility_service",
        "count": 3,
        "observedLabels": [
          "new utility service"
        ],
        "observedValueTypes": [
          "text"
        ]
      },
      {
        "inputKey": "participating_electric_utility_status",
        "count": 3,
        "observedLabels": [
          "participating electric utility status"
        ],
        "observedValueTypes": [
          "text"
        ]
      },
      {
        "inputKey": "participating_member_utility",
        "count": 3,
        "observedLabels": [
          "participating member utility"
        ],
        "observedValueTypes": [
          "text"
        ]
      },
      {
        "inputKey": "participating_utility_service",
        "count": 3,
        "observedLabels": [
          "participating utility service"
        ],
        "observedValueTypes": [
          "text"
        ]
      },
      {
        "inputKey": "permit_status",
        "count": 3,
        "observedLabels": [
          "permit status"
        ],
        "observedValueTypes": [
          "text"
        ]
      },
      {
        "inputKey": "preapproval_required",
        "count": 3,
        "observedLabels": [
          "preapproval required"
        ],
        "observedValueTypes": [
          "text"
        ]
      },
      {
        "inputKey": "preconstructionapplication",
        "count": 3,
        "observedLabels": [
          "preConstructionApplication"
        ],
        "observedValueTypes": [
          "text"
        ]
      },
      {
        "inputKey": "preinstallationapplication",
        "count": 3,
        "observedLabels": [
          "preInstallationApplication"
        ],
        "observedValueTypes": [
          "text"
        ]
      },
      {
        "inputKey": "prequalification_if_required",
        "count": 3,
        "observedLabels": [
          "prequalification if required"
        ],
        "observedValueTypes": [
          "text"
        ]
      },
      {
        "inputKey": "program_authorized_contractor_or_application_path",
        "count": 3,
        "observedLabels": [
          "program authorized contractor or application path"
        ],
        "observedValueTypes": [
          "text"
        ]
      },
      {
        "inputKey": "project_assessment_application_status",
        "count": 3,
        "observedLabels": [
          "project assessment application status"
        ],
        "observedValueTypes": [
          "text"
        ]
      },
      {
        "inputKey": "project_completion_documentation",
        "count": 3,
        "observedLabels": [
          "project completion documentation"
        ],
        "observedValueTypes": [
          "text"
        ]
      },
      {
        "inputKey": "proof_of_installation",
        "count": 3,
        "observedLabels": [
          "proof of installation"
        ],
        "observedValueTypes": [
          "text"
        ]
      },
      {
        "inputKey": "proof_of_purchase_or_installation",
        "count": 3,
        "observedLabels": [
          "proof of purchase or installation"
        ],
        "observedValueTypes": [
          "text"
        ]
      },
      {
        "inputKey": "public_access_status",
        "count": 3,
        "observedLabels": [
          "public access status"
        ],
        "observedValueTypes": [
          "text"
        ]
      },
      {
        "inputKey": "public_benefit_qualification",
        "count": 3,
        "observedLabels": [
          "public benefit qualification"
        ],
        "observedValueTypes": [
          "text"
        ]
      },
      {
        "inputKey": "public_purpose_program_surcharge_status",
        "count": 3,
        "observedLabels": [
          "Public Purpose Program surcharge status"
        ],
        "observedValueTypes": [
          "text"
        ]
      },
      {
        "inputKey": "purchase_channel",
        "count": 3,
        "observedLabels": [
          "purchase channel"
        ],
        "observedValueTypes": [
          "text"
        ]
      },
      {
        "inputKey": "purchase_install_date",
        "count": 3,
        "observedLabels": [
          "purchase install date"
        ],
        "observedValueTypes": [
          "text"
        ]
      },
      {
        "inputKey": "purchase_path",
        "count": 3,
        "observedLabels": [
          "purchase path"
        ],
        "observedValueTypes": [
          "text"
        ]
      },
      {
        "inputKey": "qualification",
        "count": 3,
        "observedLabels": [
          "qualification"
        ],
        "observedValueTypes": [
          "text"
        ]
      },
      {
        "inputKey": "qualified_service_provider",
        "count": 3,
        "observedLabels": [
          "qualified service provider"
        ],
        "observedValueTypes": [
          "text"
        ]
      },
      {
        "inputKey": "qualifying_rate_status",
        "count": 3,
        "observedLabels": [
          "qualifying rate status"
        ],
        "observedValueTypes": [
          "number"
        ]
      },
      {
        "inputKey": "receipt_date",
        "count": 3,
        "observedLabels": [
          "receipt date"
        ],
        "observedValueTypes": [
          "text"
        ]
      },
      {
        "inputKey": "residential_battery_installation",
        "count": 3,
        "observedLabels": [
          "residential battery installation"
        ],
        "observedValueTypes": [
          "text"
        ]
      }
    ],
    "utility_bill_or_rate_data": [
      {
        "inputKey": "estimated_savings",
        "count": 9,
        "observedLabels": [
          "estimated savings"
        ],
        "observedValueTypes": [
          "text"
        ]
      },
      {
        "inputKey": "verified_savings",
        "count": 9,
        "observedLabels": [
          "verified savings"
        ],
        "observedValueTypes": [
          "text"
        ]
      },
      {
        "inputKey": "baseline_rate",
        "count": 6,
        "observedLabels": [
          "baseline rate"
        ],
        "observedValueTypes": [
          "number"
        ]
      },
      {
        "inputKey": "monthly_charging_compliance",
        "count": 5,
        "observedLabels": [
          "monthly charging compliance"
        ],
        "observedValueTypes": [
          "text"
        ]
      },
      {
        "inputKey": "currentratetable",
        "count": 4,
        "observedLabels": [
          "currentRateTable"
        ],
        "observedValueTypes": [
          "number"
        ]
      },
      {
        "inputKey": "estimated_energy_savings",
        "count": 4,
        "observedLabels": [
          "estimated energy savings"
        ],
        "observedValueTypes": [
          "text"
        ]
      },
      {
        "inputKey": "load_management_participation",
        "count": 4,
        "observedLabels": [
          "load management participation"
        ],
        "observedValueTypes": [
          "text"
        ]
      },
      {
        "inputKey": "monthly_charging_participation",
        "count": 4,
        "observedLabels": [
          "monthly charging participation"
        ],
        "observedValueTypes": [
          "text"
        ]
      },
      {
        "inputKey": "monthly_participation",
        "count": 4,
        "observedLabels": [
          "monthly participation"
        ],
        "observedValueTypes": [
          "text"
        ]
      },
      {
        "inputKey": "off_peak_charging_agreement",
        "count": 4,
        "observedLabels": [
          "off peak charging agreement"
        ],
        "observedValueTypes": [
          "text"
        ]
      },
      {
        "inputKey": "rate_class",
        "count": 4,
        "observedLabels": [
          "rate class"
        ],
        "observedValueTypes": [
          "number"
        ]
      },
      {
        "inputKey": "verified_first_year_savings",
        "count": 4,
        "observedLabels": [
          "verified first year savings"
        ],
        "observedValueTypes": [
          "text"
        ]
      },
      {
        "inputKey": "annual_participation",
        "count": 3,
        "observedLabels": [
          "annual participation"
        ],
        "observedValueTypes": [
          "text"
        ]
      },
      {
        "inputKey": "continuedannualparticipation",
        "count": 3,
        "observedLabels": [
          "continuedAnnualParticipation"
        ],
        "observedValueTypes": [
          "text"
        ]
      },
      {
        "inputKey": "current_official_rate_table",
        "count": 3,
        "observedLabels": [
          "current official rate table"
        ],
        "observedValueTypes": [
          "number"
        ]
      },
      {
        "inputKey": "curtailment_or_tou_agreement",
        "count": 3,
        "observedLabels": [
          "curtailment or TOU agreement"
        ],
        "observedValueTypes": [
          "text"
        ]
      },
      {
        "inputKey": "market_interest_rate_comparison",
        "count": 3,
        "observedLabels": [
          "market interest rate comparison"
        ],
        "observedValueTypes": [
          "number"
        ]
      },
      {
        "inputKey": "monthly_distribution_demand_charges",
        "count": 3,
        "observedLabels": [
          "monthly distribution demand charges"
        ],
        "observedValueTypes": [
          "text"
        ]
      },
      {
        "inputKey": "monthly_event_participation",
        "count": 3,
        "observedLabels": [
          "monthly event participation"
        ],
        "observedValueTypes": [
          "text"
        ]
      },
      {
        "inputKey": "offered_interest_rate",
        "count": 3,
        "observedLabels": [
          "offered interest rate"
        ],
        "observedValueTypes": [
          "number"
        ]
      },
      {
        "inputKey": "primary_residence_and_usage_requirements",
        "count": 3,
        "observedLabels": [
          "primary residence and usage requirements"
        ],
        "observedValueTypes": [
          "text"
        ]
      },
      {
        "inputKey": "projected_energy_savings",
        "count": 3,
        "observedLabels": [
          "projected energy savings"
        ],
        "observedValueTypes": [
          "text"
        ]
      },
      {
        "inputKey": "selected_pev_tariff",
        "count": 3,
        "observedLabels": [
          "selected PEV tariff"
        ],
        "observedValueTypes": [
          "text"
        ]
      },
      {
        "inputKey": "standard_rate",
        "count": 3,
        "observedLabels": [
          "standard rate"
        ],
        "observedValueTypes": [
          "number"
        ]
      },
      {
        "inputKey": "24_months_of_recent_utility_bills",
        "count": 2,
        "observedLabels": [
          "24 months of recent utility bills"
        ],
        "observedValueTypes": [
          "text"
        ]
      },
      {
        "inputKey": "active_monthly_participation_data",
        "count": 2,
        "observedLabels": [
          "active monthly participation data"
        ],
        "observedValueTypes": [
          "text"
        ]
      },
      {
        "inputKey": "administrator_confirmed_above_cap_rate",
        "count": 2,
        "observedLabels": [
          "administrator-confirmed above-cap rate"
        ],
        "observedValueTypes": [
          "number"
        ]
      },
      {
        "inputKey": "annual_energy_reduction",
        "count": 2,
        "observedLabels": [
          "annual energy reduction"
        ],
        "observedValueTypes": [
          "text"
        ]
      },
      {
        "inputKey": "applicable_value_of_solar_tariff",
        "count": 2,
        "observedLabels": [
          "applicable Value of Solar tariff"
        ],
        "observedValueTypes": [
          "text"
        ]
      },
      {
        "inputKey": "baseline_and_proposed_energy_use",
        "count": 2,
        "observedLabels": [
          "baseline and proposed energy use"
        ],
        "observedValueTypes": [
          "text"
        ]
      },
      {
        "inputKey": "baseline_eui",
        "count": 2,
        "observedLabels": [
          "baseline EUI"
        ],
        "observedValueTypes": [
          "text"
        ]
      },
      {
        "inputKey": "baseline_unmanaged_charging_schedule",
        "count": 2,
        "observedLabels": [
          "baseline unmanaged charging schedule"
        ],
        "observedValueTypes": [
          "text"
        ]
      },
      {
        "inputKey": "baseline_wattage",
        "count": 2,
        "observedLabels": [
          "baseline wattage"
        ],
        "observedValueTypes": [
          "text"
        ]
      },
      {
        "inputKey": "beat_the_peak_text_signup",
        "count": 2,
        "observedLabels": [
          "Beat the Peak text signup"
        ],
        "observedValueTypes": [
          "text"
        ]
      },
      {
        "inputKey": "bge_rate_schedule",
        "count": 2,
        "observedLabels": [
          "BGE rate schedule"
        ],
        "observedValueTypes": [
          "number"
        ]
      },
      {
        "inputKey": "business_demand",
        "count": 2,
        "observedLabels": [
          "business demand"
        ],
        "observedValueTypes": [
          "text"
        ]
      },
      {
        "inputKey": "business_usage_threshold",
        "count": 2,
        "observedLabels": [
          "business usage threshold"
        ],
        "observedValueTypes": [
          "text"
        ]
      },
      {
        "inputKey": "commercialrateschedule",
        "count": 2,
        "observedLabels": [
          "commercialRateSchedule"
        ],
        "observedValueTypes": [
          "number"
        ]
      },
      {
        "inputKey": "comparison_rate",
        "count": 2,
        "observedLabels": [
          "comparison rate"
        ],
        "observedValueTypes": [
          "number"
        ]
      },
      {
        "inputKey": "compatibility_with_load_management",
        "count": 2,
        "observedLabels": [
          "compatibility with load management"
        ],
        "observedValueTypes": [
          "text"
        ]
      },
      {
        "inputKey": "current_applicable_tariff_rates",
        "count": 2,
        "observedLabels": [
          "current applicable tariff rates"
        ],
        "observedValueTypes": [
          "number"
        ]
      },
      {
        "inputKey": "current_bge_ev_tou_rates",
        "count": 2,
        "observedLabels": [
          "current BGE EV TOU rates"
        ],
        "observedValueTypes": [
          "number"
        ]
      },
      {
        "inputKey": "current_lighting_or_custom_rate_table",
        "count": 2,
        "observedLabels": [
          "current lighting or custom rate table"
        ],
        "observedValueTypes": [
          "number"
        ]
      },
      {
        "inputKey": "current_tariff_credit",
        "count": 2,
        "observedLabels": [
          "current tariff credit"
        ],
        "observedValueTypes": [
          "text"
        ]
      },
      {
        "inputKey": "custom_savings",
        "count": 2,
        "observedLabels": [
          "custom savings"
        ],
        "observedValueTypes": [
          "text"
        ]
      },
      {
        "inputKey": "documented_savings",
        "count": 2,
        "observedLabels": [
          "documented savings"
        ],
        "observedValueTypes": [
          "text"
        ]
      },
      {
        "inputKey": "energy_savings",
        "count": 2,
        "observedLabels": [
          "energy savings"
        ],
        "observedValueTypes": [
          "text"
        ]
      },
      {
        "inputKey": "energy_savings_proposal",
        "count": 2,
        "observedLabels": [
          "energy savings proposal"
        ],
        "observedValueTypes": [
          "text"
        ]
      },
      {
        "inputKey": "estimatedenergysavings",
        "count": 2,
        "observedLabels": [
          "estimatedEnergySavings"
        ],
        "observedValueTypes": [
          "text"
        ]
      },
      {
        "inputKey": "gas_meter_rate_schedule",
        "count": 2,
        "observedLabels": [
          "gas meter rate schedule"
        ],
        "observedValueTypes": [
          "number"
        ]
      },
      {
        "inputKey": "lightingworksheetoutput",
        "count": 2,
        "observedLabels": [
          "lightingWorksheetOutput"
        ],
        "observedValueTypes": [
          "text"
        ]
      },
      {
        "inputKey": "load_calculation",
        "count": 2,
        "observedLabels": [
          "load calculation"
        ],
        "observedValueTypes": [
          "text"
        ]
      },
      {
        "inputKey": "load_management_participation_if_required",
        "count": 2,
        "observedLabels": [
          "load management participation if required"
        ],
        "observedValueTypes": [
          "text"
        ]
      },
      {
        "inputKey": "load_shape",
        "count": 2,
        "observedLabels": [
          "load shape"
        ],
        "observedValueTypes": [
          "text"
        ]
      },
      {
        "inputKey": "metering_confirmation",
        "count": 2,
        "observedLabels": [
          "metering confirmation"
        ],
        "observedValueTypes": [
          "text"
        ]
      },
      {
        "inputKey": "monthly_at_home_charging_and_smart_time_compliance",
        "count": 2,
        "observedLabels": [
          "monthly at-home charging and smart-time compliance"
        ],
        "observedValueTypes": [
          "text"
        ]
      },
      {
        "inputKey": "monthly_compliance_data",
        "count": 2,
        "observedLabels": [
          "monthly compliance data"
        ],
        "observedValueTypes": [
          "text"
        ]
      },
      {
        "inputKey": "newannualhours",
        "count": 2,
        "observedLabels": [
          "newAnnualHours"
        ],
        "observedValueTypes": [
          "text"
        ]
      },
      {
        "inputKey": "off_peak_charging_participation",
        "count": 2,
        "observedLabels": [
          "off-peak charging participation"
        ],
        "observedValueTypes": [
          "text"
        ]
      },
      {
        "inputKey": "off_peak_charging_percentage",
        "count": 2,
        "observedLabels": [
          "off-peak charging percentage"
        ],
        "observedValueTypes": [
          "number"
        ]
      },
      {
        "inputKey": "off_peak_participation",
        "count": 2,
        "observedLabels": [
          "off-peak participation"
        ],
        "observedValueTypes": [
          "text"
        ]
      },
      {
        "inputKey": "oldannualhours",
        "count": 2,
        "observedLabels": [
          "oldAnnualHours"
        ],
        "observedValueTypes": [
          "text"
        ]
      },
      {
        "inputKey": "oldlightingbaseline",
        "count": 2,
        "observedLabels": [
          "oldLightingBaseline"
        ],
        "observedValueTypes": [
          "text"
        ]
      },
      {
        "inputKey": "on_bill_charge_terms",
        "count": 2,
        "observedLabels": [
          "on bill charge terms"
        ],
        "observedValueTypes": [
          "text"
        ]
      },
      {
        "inputKey": "on_bill_repayment_terms",
        "count": 2,
        "observedLabels": [
          "on bill repayment terms"
        ],
        "observedValueTypes": [
          "text"
        ]
      },
      {
        "inputKey": "operation_during_peak_hours",
        "count": 2,
        "observedLabels": [
          "operation during peak hours"
        ],
        "observedValueTypes": [
          "text"
        ]
      },
      {
        "inputKey": "peak_demand_below_threshold",
        "count": 2,
        "observedLabels": [
          "peak demand below threshold"
        ],
        "observedValueTypes": [
          "text"
        ]
      },
      {
        "inputKey": "peak_hour_operation",
        "count": 2,
        "observedLabels": [
          "peak hour operation"
        ],
        "observedValueTypes": [
          "text"
        ]
      },
      {
        "inputKey": "prescriptive_workbook_or_approved_savings",
        "count": 2,
        "observedLabels": [
          "prescriptive workbook or approved savings"
        ],
        "observedValueTypes": [
          "text"
        ]
      },
      {
        "inputKey": "program_approved_savings",
        "count": 2,
        "observedLabels": [
          "program-approved savings"
        ],
        "observedValueTypes": [
          "text"
        ]
      },
      {
        "inputKey": "program_rate",
        "count": 2,
        "observedLabels": [
          "program rate"
        ],
        "observedValueTypes": [
          "number"
        ]
      },
      {
        "inputKey": "published_current_rate",
        "count": 2,
        "observedLabels": [
          "published current rate"
        ],
        "observedValueTypes": [
          "number"
        ]
      },
      {
        "inputKey": "rate_code",
        "count": 2,
        "observedLabels": [
          "rate code"
        ],
        "observedValueTypes": [
          "number"
        ]
      },
      {
        "inputKey": "rate_participation",
        "count": 2,
        "observedLabels": [
          "rate participation"
        ],
        "observedValueTypes": [
          "number"
        ]
      },
      {
        "inputKey": "rate_schedule",
        "count": 2,
        "observedLabels": [
          "rate schedule"
        ],
        "observedValueTypes": [
          "number"
        ]
      },
      {
        "inputKey": "recentpepcobill",
        "count": 2,
        "observedLabels": [
          "recentPepcoBill"
        ],
        "observedValueTypes": [
          "text"
        ]
      },
      {
        "inputKey": "savings",
        "count": 2,
        "observedLabels": [
          "savings"
        ],
        "observedValueTypes": [
          "text"
        ]
      },
      {
        "inputKey": "savings_documentation",
        "count": 2,
        "observedLabels": [
          "savings documentation"
        ],
        "observedValueTypes": [
          "text"
        ]
      },
      {
        "inputKey": "savings_estimate",
        "count": 2,
        "observedLabels": [
          "savings estimate"
        ],
        "observedValueTypes": [
          "text"
        ]
      },
      {
        "inputKey": "selected_ece_ev_rate",
        "count": 2,
        "observedLabels": [
          "selected ECE EV rate"
        ],
        "observedValueTypes": [
          "number"
        ]
      },
      {
        "inputKey": "solar_and_storage_rate_participation",
        "count": 2,
        "observedLabels": [
          "Solar and Storage Rate participation"
        ],
        "observedValueTypes": [
          "number"
        ]
      },
      {
        "inputKey": "standard_residential_comparison_rate",
        "count": 2,
        "observedLabels": [
          "standard residential comparison rate"
        ],
        "observedValueTypes": [
          "number"
        ]
      },
      {
        "inputKey": "summer_winter_demand_threshold",
        "count": 2,
        "observedLabels": [
          "summer winter demand threshold"
        ],
        "observedValueTypes": [
          "text"
        ]
      },
      {
        "inputKey": "tariff_option",
        "count": 2,
        "observedLabels": [
          "tariff option"
        ],
        "observedValueTypes": [
          "text"
        ]
      },
      {
        "inputKey": "tariff_participation",
        "count": 2,
        "observedLabels": [
          "tariff participation"
        ],
        "observedValueTypes": [
          "text"
        ]
      },
      {
        "inputKey": "tou_rate_schedule",
        "count": 2,
        "observedLabels": [
          "TOU rate schedule"
        ],
        "observedValueTypes": [
          "number"
        ]
      },
      {
        "inputKey": "verified_savings_or_controlled_watts",
        "count": 2,
        "observedLabels": [
          "verified savings or controlled watts"
        ],
        "observedValueTypes": [
          "text"
        ]
      },
      {
        "inputKey": "12_months_pre_project_interval_or_billing_data",
        "count": 1,
        "observedLabels": [
          "12 months pre-project interval or billing data"
        ],
        "observedValueTypes": [
          "text"
        ]
      },
      {
        "inputKey": "active_program_tariff_or_current_battery_incentive_notice",
        "count": 1,
        "observedLabels": [
          "active program tariff or current battery incentive notice"
        ],
        "observedValueTypes": [
          "text"
        ]
      },
      {
        "inputKey": "annual_commissioning_verification",
        "count": 1,
        "observedLabels": [
          "annual commissioning verification"
        ],
        "observedValueTypes": [
          "text"
        ]
      },
      {
        "inputKey": "annual_consumption_limit",
        "count": 1,
        "observedLabels": [
          "annual consumption limit"
        ],
        "observedValueTypes": [
          "text"
        ]
      },
      {
        "inputKey": "annual_delivered_mwh",
        "count": 1,
        "observedLabels": [
          "annual delivered MWh"
        ],
        "observedValueTypes": [
          "text"
        ]
      },
      {
        "inputKey": "annual_energy_savings",
        "count": 1,
        "observedLabels": [
          "annual energy savings"
        ],
        "observedValueTypes": [
          "text"
        ]
      },
      {
        "inputKey": "annual_energy_savings_estimate",
        "count": 1,
        "observedLabels": [
          "annual energy savings estimate"
        ],
        "observedValueTypes": [
          "text"
        ]
      },
      {
        "inputKey": "annual_mcf_saved",
        "count": 1,
        "observedLabels": [
          "annual Mcf saved"
        ],
        "observedValueTypes": [
          "text"
        ]
      },
      {
        "inputKey": "annual_mcf_savings",
        "count": 1,
        "observedLabels": [
          "annual mcf savings"
        ],
        "observedValueTypes": [
          "text"
        ]
      },
      {
        "inputKey": "annual_o_m_savings",
        "count": 1,
        "observedLabels": [
          "annual O&M savings"
        ],
        "observedValueTypes": [
          "text"
        ]
      },
      {
        "inputKey": "annual_steam_savings_mlbs",
        "count": 1,
        "observedLabels": [
          "annual steam savings Mlbs"
        ],
        "observedValueTypes": [
          "text"
        ]
      },
      {
        "inputKey": "annualsavingsifcustom",
        "count": 1,
        "observedLabels": [
          "annualSavingsIfCustom"
        ],
        "observedValueTypes": [
          "text"
        ]
      },
      {
        "inputKey": "approved_baseline",
        "count": 1,
        "observedLabels": [
          "approved baseline"
        ],
        "observedValueTypes": [
          "text"
        ]
      },
      {
        "inputKey": "approved_demand_reduction",
        "count": 1,
        "observedLabels": [
          "approved demand reduction"
        ],
        "observedValueTypes": [
          "text"
        ]
      },
      {
        "inputKey": "approved_ev_submeter_product",
        "count": 1,
        "observedLabels": [
          "approved EV submeter product"
        ],
        "observedValueTypes": [
          "text"
        ]
      },
      {
        "inputKey": "approved_meter_data_management_agent",
        "count": 1,
        "observedLabels": [
          "approved meter data management agent"
        ],
        "observedValueTypes": [
          "text"
        ]
      },
      {
        "inputKey": "approved_project_savings",
        "count": 1,
        "observedLabels": [
          "approved project savings"
        ],
        "observedValueTypes": [
          "text"
        ]
      },
      {
        "inputKey": "baseline",
        "count": 1,
        "observedLabels": [
          "baseline"
        ],
        "observedValueTypes": [
          "text"
        ]
      },
      {
        "inputKey": "baseline_energy_use",
        "count": 1,
        "observedLabels": [
          "baseline energy use"
        ],
        "observedValueTypes": [
          "text"
        ]
      },
      {
        "inputKey": "baseline_method",
        "count": 1,
        "observedLabels": [
          "baseline method"
        ],
        "observedValueTypes": [
          "text"
        ]
      },
      {
        "inputKey": "baseline_proposed_savings",
        "count": 1,
        "observedLabels": [
          "baseline/proposed savings"
        ],
        "observedValueTypes": [
          "text"
        ]
      },
      {
        "inputKey": "baseline_standard",
        "count": 1,
        "observedLabels": [
          "baseline standard"
        ],
        "observedValueTypes": [
          "text"
        ]
      },
      {
        "inputKey": "baselinecodeperformance",
        "count": 1,
        "observedLabels": [
          "baselineCodePerformance"
        ],
        "observedValueTypes": [
          "text"
        ]
      },
      {
        "inputKey": "baselineperformance",
        "count": 1,
        "observedLabels": [
          "baselinePerformance"
        ],
        "observedValueTypes": [
          "text"
        ]
      },
      {
        "inputKey": "business_rate_schedule",
        "count": 1,
        "observedLabels": [
          "business rate schedule"
        ],
        "observedValueTypes": [
          "number"
        ]
      },
      {
        "inputKey": "calculated_energy_savings",
        "count": 1,
        "observedLabels": [
          "calculated energy savings"
        ],
        "observedValueTypes": [
          "text"
        ]
      },
      {
        "inputKey": "company_annual_incentive_total",
        "count": 1,
        "observedLabels": [
          "company annual incentive total"
        ],
        "observedValueTypes": [
          "text"
        ]
      },
      {
        "inputKey": "current_commercial_rate",
        "count": 1,
        "observedLabels": [
          "current commercial rate"
        ],
        "observedValueTypes": [
          "number"
        ]
      },
      {
        "inputKey": "current_cpp_d_tariff_rates",
        "count": 1,
        "observedLabels": [
          "current CPP D tariff rates"
        ],
        "observedValueTypes": [
          "number"
        ]
      },
      {
        "inputKey": "current_form_rate",
        "count": 1,
        "observedLabels": [
          "current form rate"
        ],
        "observedValueTypes": [
          "number"
        ]
      },
      {
        "inputKey": "current_local_rate_table_for_nonresidential_or_make_ready",
        "count": 1,
        "observedLabels": [
          "current local rate table for nonresidential or make-ready"
        ],
        "observedValueTypes": [
          "number"
        ]
      },
      {
        "inputKey": "current_rate_table",
        "count": 1,
        "observedLabels": [
          "current rate table"
        ],
        "observedValueTypes": [
          "number"
        ]
      },
      {
        "inputKey": "current_rate_table_for_refrigeration_lighting_and_hvac_replacement",
        "count": 1,
        "observedLabels": [
          "current rate table for refrigeration, lighting, and HVAC replacement"
        ],
        "observedValueTypes": [
          "number"
        ]
      },
      {
        "inputKey": "current_source_backed_rate_table",
        "count": 1,
        "observedLabels": [
          "current source-backed rate table"
        ],
        "observedValueTypes": [
          "number"
        ]
      },
      {
        "inputKey": "current_tpud_rate_or_formula",
        "count": 1,
        "observedLabels": [
          "current TPUD rate or formula"
        ],
        "observedValueTypes": [
          "number"
        ]
      },
      {
        "inputKey": "custom_energy_savings_proposal",
        "count": 1,
        "observedLabels": [
          "custom energy-savings proposal"
        ],
        "observedValueTypes": [
          "text"
        ]
      },
      {
        "inputKey": "custom_project_savings",
        "count": 1,
        "observedLabels": [
          "custom project savings"
        ],
        "observedValueTypes": [
          "text"
        ]
      },
      {
        "inputKey": "d1_h_rate",
        "count": 1,
        "observedLabels": [
          "D1 H rate"
        ],
        "observedValueTypes": [
          "number"
        ]
      },
      {
        "inputKey": "demand_class",
        "count": 1,
        "observedLabels": [
          "demand class"
        ],
        "observedValueTypes": [
          "text"
        ]
      },
      {
        "inputKey": "demand_profile",
        "count": 1,
        "observedLabels": [
          "demand profile"
        ],
        "observedValueTypes": [
          "text"
        ]
      },
      {
        "inputKey": "demand_response_acceptance",
        "count": 1,
        "observedLabels": [
          "demand response acceptance"
        ],
        "observedValueTypes": [
          "text"
        ]
      },
      {
        "inputKey": "design_it_load",
        "count": 1,
        "observedLabels": [
          "design IT load"
        ],
        "observedValueTypes": [
          "text"
        ]
      },
      {
        "inputKey": "documented_energy_savings_for_custom_projects",
        "count": 1,
        "observedLabels": [
          "documented energy savings for custom projects"
        ],
        "observedValueTypes": [
          "text"
        ]
      },
      {
        "inputKey": "electric_demand_or_gas_use_threshold",
        "count": 1,
        "observedLabels": [
          "electric demand or gas use threshold"
        ],
        "observedValueTypes": [
          "text"
        ]
      },
      {
        "inputKey": "energy_savings_percentage",
        "count": 1,
        "observedLabels": [
          "energy savings percentage"
        ],
        "observedValueTypes": [
          "number"
        ]
      },
      {
        "inputKey": "estimated_electricity_savings",
        "count": 1,
        "observedLabels": [
          "estimated electricity savings"
        ],
        "observedValueTypes": [
          "text"
        ]
      },
      {
        "inputKey": "estimated_savings_if_custom",
        "count": 1,
        "observedLabels": [
          "estimated savings if custom"
        ],
        "observedValueTypes": [
          "text"
        ]
      },
      {
        "inputKey": "existing_lighting_baseline",
        "count": 1,
        "observedLabels": [
          "existing lighting baseline"
        ],
        "observedValueTypes": [
          "text"
        ]
      },
      {
        "inputKey": "fan_diameter_feet",
        "count": 1,
        "observedLabels": [
          "fan diameter feet"
        ],
        "observedValueTypes": [
          "number"
        ]
      },
      {
        "inputKey": "fan_diameter_inches",
        "count": 1,
        "observedLabels": [
          "fan diameter inches"
        ],
        "observedValueTypes": [
          "text"
        ]
      },
      {
        "inputKey": "fiscal_year_cap_usage",
        "count": 1,
        "observedLabels": [
          "fiscal-year cap usage"
        ],
        "observedValueTypes": [
          "text"
        ]
      },
      {
        "inputKey": "form_rate",
        "count": 1,
        "observedLabels": [
          "form rate"
        ],
        "observedValueTypes": [
          "number"
        ]
      },
      {
        "inputKey": "gas_rate_schedule",
        "count": 1,
        "observedLabels": [
          "gas rate schedule"
        ],
        "observedValueTypes": [
          "number"
        ]
      },
      {
        "inputKey": "grid_interconnection_and_net_metering",
        "count": 1,
        "observedLabels": [
          "grid interconnection and net metering"
        ],
        "observedValueTypes": [
          "text"
        ]
      },
      {
        "inputKey": "grid_tied_behind_the_meter_confirmation",
        "count": 1,
        "observedLabels": [
          "grid-tied behind-the-meter confirmation"
        ],
        "observedValueTypes": [
          "text"
        ]
      },
      {
        "inputKey": "individual_electric_metering",
        "count": 1,
        "observedLabels": [
          "individual electric metering"
        ],
        "observedValueTypes": [
          "text"
        ]
      },
      {
        "inputKey": "load_management_participation_if_applicable",
        "count": 1,
        "observedLabels": [
          "load management participation if applicable"
        ],
        "observedValueTypes": [
          "text"
        ]
      },
      {
        "inputKey": "metered_annual_savings",
        "count": 1,
        "observedLabels": [
          "metered annual savings"
        ],
        "observedValueTypes": [
          "text"
        ]
      },
      {
        "inputKey": "metered_data",
        "count": 1,
        "observedLabels": [
          "metered data"
        ],
        "observedValueTypes": [
          "text"
        ]
      },
      {
        "inputKey": "monthly_mwh_delivered",
        "count": 1,
        "observedLabels": [
          "monthly MWh delivered"
        ],
        "observedValueTypes": [
          "text"
        ]
      },
      {
        "inputKey": "monthly_peak_period_hours",
        "count": 1,
        "observedLabels": [
          "monthly peak period hours"
        ],
        "observedValueTypes": [
          "text"
        ]
      },
      {
        "inputKey": "months_of_off_peak_compliant_charging",
        "count": 1,
        "observedLabels": [
          "months of off peak compliant charging"
        ],
        "observedValueTypes": [
          "text"
        ]
      },
      {
        "inputKey": "noalternativesupplierornetmeteringblockers",
        "count": 1,
        "observedLabels": [
          "noAlternativeSupplierOrNetMeteringBlockers"
        ],
        "observedValueTypes": [
          "text"
        ]
      },
      {
        "inputKey": "nonresidentialrateschedule",
        "count": 1,
        "observedLabels": [
          "nonResidentialRateSchedule"
        ],
        "observedValueTypes": [
          "number"
        ]
      },
      {
        "inputKey": "off_peak_meter_or_demand_response_requirement",
        "count": 1,
        "observedLabels": [
          "off peak meter or demand response requirement"
        ],
        "observedValueTypes": [
          "text"
        ]
      },
      {
        "inputKey": "off_peak_meter_socket_confirmation",
        "count": 1,
        "observedLabels": [
          "off-peak meter socket confirmation"
        ],
        "observedValueTypes": [
          "text"
        ]
      },
      {
        "inputKey": "optouts",
        "count": 1,
        "observedLabels": [
          "optOuts"
        ],
        "observedValueTypes": [
          "text"
        ]
      },
      {
        "inputKey": "otherwise_applicable_rate",
        "count": 1,
        "observedLabels": [
          "otherwise applicable rate"
        ],
        "observedValueTypes": [
          "number"
        ]
      },
      {
        "inputKey": "peak_alert_charging_compliance",
        "count": 1,
        "observedLabels": [
          "peak alert charging compliance"
        ],
        "observedValueTypes": [
          "text"
        ]
      },
      {
        "inputKey": "peak_demand_savings",
        "count": 1,
        "observedLabels": [
          "peak demand savings"
        ],
        "observedValueTypes": [
          "text"
        ]
      },
      {
        "inputKey": "percent_savings_above_code",
        "count": 1,
        "observedLabels": [
          "percent savings above code"
        ],
        "observedValueTypes": [
          "number"
        ]
      },
      {
        "inputKey": "permission_to_operate",
        "count": 1,
        "observedLabels": [
          "permission to operate"
        ],
        "observedValueTypes": [
          "number"
        ]
      },
      {
        "inputKey": "pgw_firm_rate_bill",
        "count": 1,
        "observedLabels": [
          "PGW firm rate bill"
        ],
        "observedValueTypes": [
          "number"
        ]
      }
    ],
    "award_probability": [
      {
        "inputKey": "award_probability",
        "count": 16,
        "observedLabels": [
          "award probability"
        ],
        "observedValueTypes": [
          "text"
        ]
      },
      {
        "inputKey": "award_decision",
        "count": 3,
        "observedLabels": [
          "award decision"
        ],
        "observedValueTypes": [
          "text"
        ]
      },
      {
        "inputKey": "award_selection_probability",
        "count": 3,
        "observedLabels": [
          "award selection probability"
        ],
        "observedValueTypes": [
          "text"
        ]
      },
      {
        "inputKey": "award_notice",
        "count": 2,
        "observedLabels": [
          "award notice"
        ],
        "observedValueTypes": [
          "text"
        ]
      },
      {
        "inputKey": "score_participation_path",
        "count": 2,
        "observedLabels": [
          "SCORE participation path"
        ],
        "observedValueTypes": [
          "text"
        ]
      },
      {
        "inputKey": "award_decision_probability",
        "count": 1,
        "observedLabels": [
          "award decision probability"
        ],
        "observedValueTypes": [
          "text"
        ]
      },
      {
        "inputKey": "award_probability_or_award_decision",
        "count": 1,
        "observedLabels": [
          "award probability or award decision"
        ],
        "observedValueTypes": [
          "text"
        ]
      },
      {
        "inputKey": "award_selection",
        "count": 1,
        "observedLabels": [
          "award selection"
        ],
        "observedValueTypes": [
          "text"
        ]
      },
      {
        "inputKey": "cec_award_decision",
        "count": 1,
        "observedLabels": [
          "CEC award decision"
        ],
        "observedValueTypes": [
          "text"
        ]
      },
      {
        "inputKey": "cobb_emc_award_determination",
        "count": 1,
        "observedLabels": [
          "Cobb EMC award determination"
        ],
        "observedValueTypes": [
          "text"
        ]
      },
      {
        "inputKey": "current_smmpa_form_selection",
        "count": 1,
        "observedLabels": [
          "current SMMPA form selection"
        ],
        "observedValueTypes": [
          "text"
        ]
      },
      {
        "inputKey": "gdot_procurement_round_or_award",
        "count": 1,
        "observedLabels": [
          "GDOT procurement round or award"
        ],
        "observedValueTypes": [
          "text"
        ]
      },
      {
        "inputKey": "mdot_round_3_award_selection",
        "count": 1,
        "observedLabels": [
          "mdot round 3 award selection"
        ],
        "observedValueTypes": [
          "text"
        ]
      },
      {
        "inputKey": "mdt_procurement_selection",
        "count": 1,
        "observedLabels": [
          "mdt procurement selection"
        ],
        "observedValueTypes": [
          "text"
        ]
      },
      {
        "inputKey": "nhdot_round_ii_selection",
        "count": 1,
        "observedLabels": [
          "nhdot round ii selection"
        ],
        "observedValueTypes": [
          "text"
        ]
      },
      {
        "inputKey": "participant_prior_awards_cents",
        "count": 1,
        "observedLabels": [
          "participant prior awards cents"
        ],
        "observedValueTypes": [
          "text"
        ]
      },
      {
        "inputKey": "procurement_selection",
        "count": 1,
        "observedLabels": [
          "procurement selection"
        ],
        "observedValueTypes": [
          "text"
        ]
      },
      {
        "inputKey": "rfp_response_score_and_award_decision",
        "count": 1,
        "observedLabels": [
          "RFP response score and award decision"
        ],
        "observedValueTypes": [
          "text"
        ]
      },
      {
        "inputKey": "round_ii_selection",
        "count": 1,
        "observedLabels": [
          "round ii selection"
        ],
        "observedValueTypes": [
          "text"
        ]
      },
      {
        "inputKey": "selection_result",
        "count": 1,
        "observedLabels": [
          "selection result"
        ],
        "observedValueTypes": [
          "text"
        ]
      },
      {
        "inputKey": "svp_award_decision",
        "count": 1,
        "observedLabels": [
          "SVP award decision"
        ],
        "observedValueTypes": [
          "text"
        ]
      }
    ],
    "other_or_needs_review": [
      {
        "inputKey": "participating_utility",
        "count": 18,
        "observedLabels": [
          "participating utility"
        ],
        "observedValueTypes": [
          "text"
        ]
      },
      {
        "inputKey": "ahri_certificate",
        "count": 17,
        "observedLabels": [
          "AHRI certificate",
          "ahri certificate"
        ],
        "observedValueTypes": [
          "text"
        ]
      },
      {
        "inputKey": "uef",
        "count": 16,
        "observedLabels": [
          "uef",
          "UEF"
        ],
        "observedValueTypes": [
          "text"
        ]
      },
      {
        "inputKey": "receipt",
        "count": 13,
        "observedLabels": [
          "receipt"
        ],
        "observedValueTypes": [
          "text"
        ]
      },
      {
        "inputKey": "audit_request",
        "count": 12,
        "observedLabels": [
          "audit request"
        ],
        "observedValueTypes": [
          "text"
        ]
      },
      {
        "inputKey": "existing_r_value",
        "count": 12,
        "observedLabels": [
          "existing r value",
          "existing R value"
        ],
        "observedValueTypes": [
          "text"
        ]
      },
      {
        "inputKey": "participating_contractor",
        "count": 12,
        "observedLabels": [
          "participating contractor"
        ],
        "observedValueTypes": [
          "text"
        ]
      },
      {
        "inputKey": "pathway",
        "count": 11,
        "observedLabels": [
          "pathway"
        ],
        "observedValueTypes": [
          "text"
        ]
      },
      {
        "inputKey": "existing_heat_source",
        "count": 10,
        "observedLabels": [
          "existing heat source"
        ],
        "observedValueTypes": [
          "text"
        ]
      },
      {
        "inputKey": "approved_incentive",
        "count": 9,
        "observedLabels": [
          "approved incentive"
        ],
        "observedValueTypes": [
          "text"
        ]
      },
      {
        "inputKey": "program_path",
        "count": 9,
        "observedLabels": [
          "program path"
        ],
        "observedValueTypes": [
          "text"
        ]
      },
      {
        "inputKey": "program_pathway",
        "count": 9,
        "observedLabels": [
          "program pathway"
        ],
        "observedValueTypes": [
          "text"
        ]
      },
      {
        "inputKey": "qualified_product",
        "count": 9,
        "observedLabels": [
          "qualified product"
        ],
        "observedValueTypes": [
          "text"
        ]
      },
      {
        "inputKey": "home_age",
        "count": 8,
        "observedLabels": [
          "home age"
        ],
        "observedValueTypes": [
          "text"
        ]
      },
      {
        "inputKey": "participating_utility_confirmation",
        "count": 8,
        "observedLabels": [
          "participating utility confirmation"
        ],
        "observedValueTypes": [
          "text"
        ]
      },
      {
        "inputKey": "program_track",
        "count": 8,
        "observedLabels": [
          "program track"
        ],
        "observedValueTypes": [
          "text"
        ]
      },
      {
        "inputKey": "ahri_documentation",
        "count": 7,
        "observedLabels": [
          "AHRI documentation"
        ],
        "observedValueTypes": [
          "text"
        ]
      },
      {
        "inputKey": "continued_participation",
        "count": 7,
        "observedLabels": [
          "continued participation"
        ],
        "observedValueTypes": [
          "text"
        ]
      },
      {
        "inputKey": "assessment_completed",
        "count": 6,
        "observedLabels": [
          "assessment completed"
        ],
        "observedValueTypes": [
          "text"
        ]
      },
      {
        "inputKey": "audit_completed",
        "count": 6,
        "observedLabels": [
          "audit completed"
        ],
        "observedValueTypes": [
          "text"
        ]
      },
      {
        "inputKey": "audit_recommendation",
        "count": 6,
        "observedLabels": [
          "audit recommendation"
        ],
        "observedValueTypes": [
          "text"
        ]
      },
      {
        "inputKey": "audit_requested",
        "count": 6,
        "observedLabels": [
          "audit requested"
        ],
        "observedValueTypes": [
          "text"
        ]
      },
      {
        "inputKey": "final_r_value",
        "count": 6,
        "observedLabels": [
          "final r value",
          "final R value",
          "final R-value"
        ],
        "observedValueTypes": [
          "text"
        ]
      },
      {
        "inputKey": "project_location",
        "count": 6,
        "observedLabels": [
          "project location"
        ],
        "observedValueTypes": [
          "text"
        ]
      },
      {
        "inputKey": "simple_payback_years",
        "count": 6,
        "observedLabels": [
          "simple payback years"
        ],
        "observedValueTypes": [
          "text"
        ]
      },
      {
        "inputKey": "state",
        "count": 6,
        "observedLabels": [
          "state"
        ],
        "observedValueTypes": [
          "text"
        ]
      },
      {
        "inputKey": "ahricertificate",
        "count": 5,
        "observedLabels": [
          "AHRIcertificate"
        ],
        "observedValueTypes": [
          "text"
        ]
      },
      {
        "inputKey": "cfm",
        "count": 5,
        "observedLabels": [
          "CFM",
          "cfm"
        ],
        "observedValueTypes": [
          "text"
        ]
      },
      {
        "inputKey": "event_participation",
        "count": 5,
        "observedLabels": [
          "event participation"
        ],
        "observedValueTypes": [
          "text"
        ]
      },
      {
        "inputKey": "existing_heating_system",
        "count": 5,
        "observedLabels": [
          "existing heating system"
        ],
        "observedValueTypes": [
          "text"
        ]
      },
      {
        "inputKey": "location",
        "count": 5,
        "observedLabels": [
          "location"
        ],
        "observedValueTypes": [
          "text"
        ]
      },
      {
        "inputKey": "panel_upgrade_required",
        "count": 5,
        "observedLabels": [
          "panel upgrade required"
        ],
        "observedValueTypes": [
          "text"
        ]
      },
      {
        "inputKey": "participating_municipal_utility",
        "count": 5,
        "observedLabels": [
          "participating municipal utility"
        ],
        "observedValueTypes": [
          "text"
        ]
      },
      {
        "inputKey": "program_assessment",
        "count": 5,
        "observedLabels": [
          "program assessment"
        ],
        "observedValueTypes": [
          "text"
        ]
      },
      {
        "inputKey": "project_path",
        "count": 5,
        "observedLabels": [
          "project path"
        ],
        "observedValueTypes": [
          "text"
        ]
      },
      {
        "inputKey": "seasonparticipation",
        "count": 5,
        "observedLabels": [
          "seasonParticipation"
        ],
        "observedValueTypes": [
          "text"
        ]
      },
      {
        "inputKey": "utility_review",
        "count": 5,
        "observedLabels": [
          "utility review"
        ],
        "observedValueTypes": [
          "text"
        ]
      },
      {
        "inputKey": "audit_result",
        "count": 4,
        "observedLabels": [
          "audit result"
        ],
        "observedValueTypes": [
          "text"
        ]
      },
      {
        "inputKey": "auditor_recommendations",
        "count": 4,
        "observedLabels": [
          "auditor recommendations"
        ],
        "observedValueTypes": [
          "text"
        ]
      },
      {
        "inputKey": "charging_time_profile",
        "count": 4,
        "observedLabels": [
          "charging time profile"
        ],
        "observedValueTypes": [
          "text"
        ]
      },
      {
        "inputKey": "compressed_air_system",
        "count": 4,
        "observedLabels": [
          "compressed air system"
        ],
        "observedValueTypes": [
          "text"
        ]
      },
      {
        "inputKey": "dcfc_program_round_open",
        "count": 4,
        "observedLabels": [
          "dcfc program round open"
        ],
        "observedValueTypes": [
          "text"
        ]
      },
      {
        "inputKey": "event_participation_compliance",
        "count": 4,
        "observedLabels": [
          "event participation compliance"
        ],
        "observedValueTypes": [
          "text"
        ]
      },
      {
        "inputKey": "heat_pump_eligibility",
        "count": 4,
        "observedLabels": [
          "heat pump eligibility"
        ],
        "observedValueTypes": [
          "text"
        ]
      },
      {
        "inputKey": "new_or_used",
        "count": 4,
        "observedLabels": [
          "new or used"
        ],
        "observedValueTypes": [
          "text"
        ]
      },
      {
        "inputKey": "participating_contractor_confirmation",
        "count": 4,
        "observedLabels": [
          "participating contractor confirmation"
        ],
        "observedValueTypes": [
          "text"
        ]
      },
      {
        "inputKey": "participating_distributor",
        "count": 4,
        "observedLabels": [
          "participating distributor"
        ],
        "observedValueTypes": [
          "text"
        ]
      },
      {
        "inputKey": "project_sponsor",
        "count": 4,
        "observedLabels": [
          "project sponsor"
        ],
        "observedValueTypes": [
          "text"
        ]
      },
      {
        "inputKey": "replacement_scenario",
        "count": 4,
        "observedLabels": [
          "replacement scenario"
        ],
        "observedValueTypes": [
          "text"
        ]
      },
      {
        "inputKey": "seasonal_participation",
        "count": 4,
        "observedLabels": [
          "seasonal participation"
        ],
        "observedValueTypes": [
          "text"
        ]
      },
      {
        "inputKey": "ton_hours",
        "count": 4,
        "observedLabels": [
          "ton hours"
        ],
        "observedValueTypes": [
          "text"
        ]
      },
      {
        "inputKey": "utility",
        "count": 4,
        "observedLabels": [
          "utility"
        ],
        "observedValueTypes": [
          "text"
        ]
      },
      {
        "inputKey": "vehicle_class",
        "count": 4,
        "observedLabels": [
          "vehicle class"
        ],
        "observedValueTypes": [
          "text"
        ]
      },
      {
        "inputKey": "wi_fi_connection",
        "count": 4,
        "observedLabels": [
          "Wi-Fi connection"
        ],
        "observedValueTypes": [
          "text"
        ]
      },
      {
        "inputKey": "12_month_event_participation_percentage",
        "count": 3,
        "observedLabels": [
          "12-month event participation percentage"
        ],
        "observedValueTypes": [
          "number"
        ]
      },
      {
        "inputKey": "active_program_participation",
        "count": 3,
        "observedLabels": [
          "active program participation"
        ],
        "observedValueTypes": [
          "text"
        ]
      },
      {
        "inputKey": "anticipated_revenues",
        "count": 3,
        "observedLabels": [
          "anticipated revenues"
        ],
        "observedValueTypes": [
          "text"
        ]
      },
      {
        "inputKey": "approved_interconnection",
        "count": 3,
        "observedLabels": [
          "approved interconnection"
        ],
        "observedValueTypes": [
          "text"
        ]
      },
      {
        "inputKey": "assessment_result",
        "count": 3,
        "observedLabels": [
          "assessment result"
        ],
        "observedValueTypes": [
          "text"
        ]
      },
      {
        "inputKey": "audit_results",
        "count": 3,
        "observedLabels": [
          "audit results"
        ],
        "observedValueTypes": [
          "text"
        ]
      },
      {
        "inputKey": "authorized_contractor_or_distributor",
        "count": 3,
        "observedLabels": [
          "authorized contractor or distributor"
        ],
        "observedValueTypes": [
          "text"
        ]
      },
      {
        "inputKey": "centralacorheatpumpconnection",
        "count": 3,
        "observedLabels": [
          "centralACOrHeatPumpConnection"
        ],
        "observedValueTypes": [
          "text"
        ]
      },
      {
        "inputKey": "commercialvehicleusecase",
        "count": 3,
        "observedLabels": [
          "commercialVehicleUseCase"
        ],
        "observedValueTypes": [
          "text"
        ]
      },
      {
        "inputKey": "consultation_scheduled_in_program_year",
        "count": 3,
        "observedLabels": [
          "consultation scheduled in program year"
        ],
        "observedValueTypes": [
          "text"
        ]
      },
      {
        "inputKey": "contractor_compliance",
        "count": 3,
        "observedLabels": [
          "contractor compliance"
        ],
        "observedValueTypes": [
          "text"
        ]
      },
      {
        "inputKey": "contractor_documentation",
        "count": 3,
        "observedLabels": [
          "contractor documentation"
        ],
        "observedValueTypes": [
          "text"
        ]
      },
      {
        "inputKey": "controlled_watts",
        "count": 3,
        "observedLabels": [
          "controlled watts"
        ],
        "observedValueTypes": [
          "text"
        ]
      },
      {
        "inputKey": "current_form",
        "count": 3,
        "observedLabels": [
          "current form"
        ],
        "observedValueTypes": [
          "text"
        ]
      },
      {
        "inputKey": "cutsheets",
        "count": 3,
        "observedLabels": [
          "cutSheets"
        ],
        "observedValueTypes": [
          "text"
        ]
      },
      {
        "inputKey": "deep_energy_retrofit_achievement",
        "count": 3,
        "observedLabels": [
          "deep energy retrofit achievement"
        ],
        "observedValueTypes": [
          "text"
        ]
      },
      {
        "inputKey": "design_team_participation",
        "count": 3,
        "observedLabels": [
          "design team participation"
        ],
        "observedValueTypes": [
          "text"
        ]
      },
      {
        "inputKey": "direct_liberty_incentive_confirmation",
        "count": 3,
        "observedLabels": [
          "direct Liberty incentive confirmation"
        ],
        "observedValueTypes": [
          "text"
        ]
      },
      {
        "inputKey": "dlc_or_energy_star_listing",
        "count": 3,
        "observedLabels": [
          "DLC or ENERGY STAR listing"
        ],
        "observedValueTypes": [
          "text"
        ]
      },
      {
        "inputKey": "eligibility_path",
        "count": 3,
        "observedLabels": [
          "eligibility path"
        ],
        "observedValueTypes": [
          "text"
        ]
      },
      {
        "inputKey": "energy_trust_pathway",
        "count": 3,
        "observedLabels": [
          "Energy Trust pathway"
        ],
        "observedValueTypes": [
          "text"
        ]
      },
      {
        "inputKey": "ev_charging_schedule",
        "count": 3,
        "observedLabels": [
          "EV charging schedule"
        ],
        "observedValueTypes": [
          "text"
        ]
      },
      {
        "inputKey": "ev_notification",
        "count": 3,
        "observedLabels": [
          "ev notification"
        ],
        "observedValueTypes": [
          "text"
        ]
      },
      {
        "inputKey": "evaluation_completed",
        "count": 3,
        "observedLabels": [
          "evaluation completed"
        ],
        "observedValueTypes": [
          "text"
        ]
      },
      {
        "inputKey": "event_participation_percentage",
        "count": 3,
        "observedLabels": [
          "event participation percentage"
        ],
        "observedValueTypes": [
          "number"
        ]
      },
      {
        "inputKey": "evergy_location",
        "count": 3,
        "observedLabels": [
          "Evergy location"
        ],
        "observedValueTypes": [
          "text"
        ]
      },
      {
        "inputKey": "existing_heat_source_age",
        "count": 3,
        "observedLabels": [
          "existing heat source age"
        ],
        "observedValueTypes": [
          "text"
        ]
      },
      {
        "inputKey": "existingcontrols",
        "count": 3,
        "observedLabels": [
          "existingControls"
        ],
        "observedValueTypes": [
          "text"
        ]
      },
      {
        "inputKey": "existingprimaryheatsource",
        "count": 3,
        "observedLabels": [
          "existingPrimaryHeatSource"
        ],
        "observedValueTypes": [
          "text"
        ]
      },
      {
        "inputKey": "fleet_advisory_interest",
        "count": 3,
        "observedLabels": [
          "fleet advisory interest"
        ],
        "observedValueTypes": [
          "text"
        ]
      },
      {
        "inputKey": "greenhouse_gas_reduction_percent",
        "count": 3,
        "observedLabels": [
          "greenhouse gas reduction percent"
        ],
        "observedValueTypes": [
          "number"
        ]
      },
      {
        "inputKey": "home_address",
        "count": 3,
        "observedLabels": [
          "home address"
        ],
        "observedValueTypes": [
          "text"
        ]
      },
      {
        "inputKey": "home_conditions",
        "count": 3,
        "observedLabels": [
          "home conditions"
        ],
        "observedValueTypes": [
          "text"
        ]
      },
      {
        "inputKey": "home_energy_assessment",
        "count": 3,
        "observedLabels": [
          "home energy assessment",
          "Home Energy Assessment"
        ],
        "observedValueTypes": [
          "text"
        ]
      },
      {
        "inputKey": "liberty_direct_program_path",
        "count": 3,
        "observedLabels": [
          "Liberty direct program path"
        ],
        "observedValueTypes": [
          "text"
        ]
      },
      {
        "inputKey": "licensed_contractor_where_required",
        "count": 3,
        "observedLabels": [
          "licensed contractor where required"
        ],
        "observedValueTypes": [
          "text"
        ]
      },
      {
        "inputKey": "licensed_florida_contractor",
        "count": 3,
        "observedLabels": [
          "licensed Florida contractor"
        ],
        "observedValueTypes": [
          "text"
        ]
      },
      {
        "inputKey": "lifetime_mtco2e_reduction",
        "count": 3,
        "observedLabels": [
          "lifetime MTCO2e reduction"
        ],
        "observedValueTypes": [
          "text"
        ]
      },
      {
        "inputKey": "new_construction_requirements",
        "count": 3,
        "observedLabels": [
          "new construction requirements"
        ],
        "observedValueTypes": [
          "text"
        ]
      },
      {
        "inputKey": "oec_contact_review",
        "count": 3,
        "observedLabels": [
          "OEC contact review"
        ],
        "observedValueTypes": [
          "text"
        ]
      },
      {
        "inputKey": "old_appliance_working_for_recycling",
        "count": 3,
        "observedLabels": [
          "old appliance working for recycling"
        ],
        "observedValueTypes": [
          "text"
        ]
      },
      {
        "inputKey": "participating_city",
        "count": 3,
        "observedLabels": [
          "participating city"
        ],
        "observedValueTypes": [
          "text"
        ]
      },
      {
        "inputKey": "participatingmunicipalutility",
        "count": 3,
        "observedLabels": [
          "participatingMunicipalUtility"
        ],
        "observedValueTypes": [
          "text"
        ]
      },
      {
        "inputKey": "participationrecord",
        "count": 3,
        "observedLabels": [
          "participationRecord"
        ],
        "observedValueTypes": [
          "text"
        ]
      },
      {
        "inputKey": "permission_to_energize",
        "count": 3,
        "observedLabels": [
          "permission to energize"
        ],
        "observedValueTypes": [
          "text"
        ]
      },
      {
        "inputKey": "post_implementation_verification",
        "count": 3,
        "observedLabels": [
          "post implementation verification"
        ],
        "observedValueTypes": [
          "text"
        ]
      },
      {
        "inputKey": "pre_post_heat_loss_calculation",
        "count": 3,
        "observedLabels": [
          "pre post heat loss calculation"
        ],
        "observedValueTypes": [
          "text"
        ]
      },
      {
        "inputKey": "primary_heat_source",
        "count": 3,
        "observedLabels": [
          "primary heat source"
        ],
        "observedValueTypes": [
          "text"
        ]
      },
      {
        "inputKey": "prior_heating_system",
        "count": 3,
        "observedLabels": [
          "prior heating system"
        ],
        "observedValueTypes": [
          "text"
        ]
      },
      {
        "inputKey": "program_agreement",
        "count": 3,
        "observedLabels": [
          "program agreement"
        ],
        "observedValueTypes": [
          "text"
        ]
      },
      {
        "inputKey": "program_authorized_contractor_path",
        "count": 3,
        "observedLabels": [
          "program authorized contractor path"
        ],
        "observedValueTypes": [
          "text"
        ]
      },
      {
        "inputKey": "program_screening_result",
        "count": 3,
        "observedLabels": [
          "program screening result"
        ],
        "observedValueTypes": [
          "text"
        ]
      },
      {
        "inputKey": "programoption",
        "count": 3,
        "observedLabels": [
          "programOption"
        ],
        "observedValueTypes": [
          "text"
        ]
      },
      {
        "inputKey": "project_pathway",
        "count": 3,
        "observedLabels": [
          "project pathway"
        ],
        "observedValueTypes": [
          "text"
        ]
      },
      {
        "inputKey": "propertyidentifier",
        "count": 3,
        "observedLabels": [
          "propertyIdentifier"
        ],
        "observedValueTypes": [
          "text"
        ]
      },
      {
        "inputKey": "qualified_level_2_or_240v_charging_upgrade",
        "count": 3,
        "observedLabels": [
          "qualified Level 2 or 240V charging upgrade"
        ],
        "observedValueTypes": [
          "text"
        ]
      },
      {
        "inputKey": "receipts_within_six_months",
        "count": 3,
        "observedLabels": [
          "receipts within six months"
        ],
        "observedValueTypes": [
          "text"
        ]
      },
      {
        "inputKey": "recommendation_grade",
        "count": 3,
        "observedLabels": [
          "recommendation grade"
        ],
        "observedValueTypes": [
          "text"
        ]
      },
      {
        "inputKey": "recommendations",
        "count": 3,
        "observedLabels": [
          "recommendations"
        ],
        "observedValueTypes": [
          "text"
        ]
      },
      {
        "inputKey": "repayment_term",
        "count": 3,
        "observedLabels": [
          "repayment term"
        ],
        "observedValueTypes": [
          "text"
        ]
      },
      {
        "inputKey": "replacement_path",
        "count": 3,
        "observedLabels": [
          "replacement path"
        ],
        "observedValueTypes": [
          "text"
        ]
      },
      {
        "inputKey": "required_ceda_forms_and_w9",
        "count": 3,
        "observedLabels": [
          "required CEDA forms and W9"
        ],
        "observedValueTypes": [
          "text"
        ]
      },
      {
        "inputKey": "rtueligibility",
        "count": 3,
        "observedLabels": [
          "RTUeligibility"
        ],
        "observedValueTypes": [
          "text"
        ]
      },
      {
        "inputKey": "sector",
        "count": 3,
        "observedLabels": [
          "sector"
        ],
        "observedValueTypes": [
          "text"
        ]
      },
      {
        "inputKey": "selected_form",
        "count": 3,
        "observedLabels": [
          "selected form"
        ],
        "observedValueTypes": [
          "text"
        ]
      },
      {
        "inputKey": "selected_repayment_option",
        "count": 3,
        "observedLabels": [
          "selected repayment option"
        ],
        "observedValueTypes": [
          "text"
        ]
      }
    ]
  },
  "sampleContextsByCategory": {
    "project_cost_or_financing": [
      {
        "inputKey": "eligible_project_cost_cents",
        "opportunityId": "SOURCE_DSIRE:dsire_program_id:4698",
        "programName": "Ameren Illinois - Energy-Efficiency Program",
        "calculationStatus": "calculable_with_missing_inputs",
        "effectId": "effect_one_time_savings_1_2a825725ce3b83b0",
        "effectLabel": "Use the current Ameren Illinois prescriptive row for the matched measure and multiply by eligible unit count; custom projects use published first-year saving..."
      },
      {
        "inputKey": "total_project_cost_cents",
        "opportunityId": "SOURCE_DSIRE:dsire_program_id:3260",
        "programName": "Pasadena Water and Power - Commercial Energy Efficiency Rebate Program",
        "calculationStatus": "calculable_with_missing_inputs",
        "effectId": "effect_one_time_savings_1_166ab742e1702fd3",
        "effectLabel": "Use the PWP commercial measure-table rate for selected equipment and unit count; total rebate is capped at 25% of project cost and $24,000 per metered accoun..."
      },
      {
        "inputKey": "share_customer_flag",
        "opportunityId": "SOURCE_DSIRE:dsire_program_id:1896",
        "programName": "Riverside Public Utilities - Residential Energy Efficiency Rebate Program",
        "calculationStatus": "calculable_with_missing_inputs",
        "effectId": "effect_one_time_savings_1_1b6a13edbc0c7154",
        "effectLabel": "Residential Level 2 EV charger rebate reimburses actual charger, permit, labor, and installation costs up to $1,500, or up to $2,500 for qualifying SHARE cus..."
      },
      {
        "inputKey": "standard_rebate_cents",
        "opportunityId": "SOURCE_DSIRE:dsire_program_id:5796",
        "programName": "Efficiency Works - Business Energy Efficiency Rebate Program (Offered by 4 Utilities)",
        "calculationStatus": "calculable_with_missing_inputs",
        "effectId": "effect_one_time_savings_1_2750a32ce554031b",
        "effectLabel": "Community Efficiency Grant adds an incentive equal to 100% of the standard Efficiency Works rebate, capped at total project cost and limited to the grant pat..."
      },
      {
        "inputKey": "purchase_price_cents",
        "opportunityId": "SOURCE_DSIRE:dsire_program_id:2516",
        "programName": "Riverland Energy Cooperative - Commercial, Industrial, and Agricultural Energy Efficiency Rebate ...",
        "calculationStatus": "calculable_with_missing_inputs",
        "effectId": "effect_one_time_savings_1_fdff23a76226146a",
        "effectLabel": "EV charger rebate is $500 for each qualifying Level 2 charger on the applicable Riverland EV charger form, subject to purchase-price and funds limits."
      },
      {
        "inputKey": "eligible_purchase_price_cents",
        "opportunityId": "SOURCE_DSIRE:dsire_program_id:1812",
        "programName": "Marblehead Municipal Light Department - Residential Energy Efficiency Rebate Program",
        "calculationStatus": "calculable_with_missing_inputs",
        "effectId": "effect_one_time_savings_1_7a1d733dcef3abcb",
        "effectLabel": "Weatherization rebate equals 50% of purchase price for blower-door/air sealing, insulation, or duct sealing, capped at $750 per measure."
      },
      {
        "inputKey": "eligible_project_cost",
        "opportunityId": "SOURCE_DSIRE:dsire_program_id:3689",
        "programName": "PEPCO - Commercial and Industrial Energy Efficiency Incentives Program",
        "calculationStatus": "calculable_with_missing_inputs",
        "effectId": "effect_one_time_savings_1_76898304da98e944",
        "effectLabel": "Use Pepco Maryland business prescriptive incentive-reference amount for the selected qualifying measure, subject to application requirements and program caps..."
      },
      {
        "inputKey": "eligible_installation_cost",
        "opportunityId": "SOURCE_DSIRE:dsire_program_id:4312",
        "programName": "San Miguel Power Association - Energy Efficiency Rebate Program",
        "calculationStatus": "calculable_with_missing_inputs",
        "effectId": "effect_one_time_savings_1_ec6aa78a1630c0e9",
        "effectLabel": "Apply SMPA's stated measure amount or 50% cost cap, whichever is lower where a cap applies. EV examples: private Level 2 50% equipment plus 50% installation ..."
      },
      {
        "inputKey": "eligible_cost",
        "opportunityId": "SOURCE_DSIRE:dsire_program_id:4312",
        "programName": "San Miguel Power Association - Energy Efficiency Rebate Program",
        "calculationStatus": "calculable_with_missing_inputs",
        "effectId": "effect_one_time_savings_1_ec6aa78a1630c0e9",
        "effectLabel": "Apply SMPA's stated measure amount or 50% cost cap, whichever is lower where a cap applies. EV examples: private Level 2 50% equipment plus 50% installation ..."
      },
      {
        "inputKey": "installed_cost",
        "opportunityId": "SOURCE_DSIRE:dsire_program_id:2176",
        "programName": "New Hampshire Electric Co-op - Commercial and Municipal Retrofit Energy Efficiency Programs",
        "calculationStatus": "calculable_with_missing_inputs",
        "effectId": "effect_one_time_savings_1_deb34b5dc9079b54",
        "effectLabel": "Use current NHEC or NHSaves C&I prescriptive/custom measure amount for qualifying lighting, HVAC, refrigeration, controls, and foodservice projects. NHEC's E..."
      },
      {
        "inputKey": "preapproval_status_if_rebate_over_2500",
        "opportunityId": "SOURCE_DSIRE:dsire_program_id:2593",
        "programName": "EWEB - Commercial Energy Efficiency Rebates Program",
        "calculationStatus": "calculable_with_missing_inputs",
        "effectId": "effect_one_time_savings_1_8fc373696e3ccf71",
        "effectLabel": "Apply EWEB's current business measure amount for the selected qualifying measure. Examples include Level 2 public/multifamily EVSE $1,500 per port or afforda..."
      },
      {
        "inputKey": "current_official_amount_table",
        "opportunityId": "SOURCE_DSIRE:dsire_program_id:3348",
        "programName": "Hutchinson Utilities Commission - Residential Energy Efficiency Program",
        "calculationStatus": "needs_repair_review",
        "effectId": "effect_one_time_savings_1_3ea9df3d58b2a96b",
        "effectLabel": "Current Bright Energy Solutions/Hutchinson sources identify residential rebate families, but exact official amount tables were not reliably accessible from c..."
      },
      {
        "inputKey": "project_cost",
        "opportunityId": "SOURCE_DSIRE:dsire_program_id:1941",
        "programName": "Marshall Municipal Utilities - Commercial Energy Efficiency Rebate Program",
        "calculationStatus": "calculable_with_missing_inputs",
        "effectId": "effect_one_time_savings_1_f9ae3b5cf12cb73d",
        "effectLabel": "Select the applicable Marshall Municipal Utilities or Bright Energy Solutions business measure. Prescriptive HVAC examples include $100 per ton for qualifyin..."
      },
      {
        "inputKey": "incremental_cost_if_custom",
        "opportunityId": "SOURCE_DSIRE:dsire_program_id:1941",
        "programName": "Marshall Municipal Utilities - Commercial Energy Efficiency Rebate Program",
        "calculationStatus": "calculable_with_missing_inputs",
        "effectId": "effect_one_time_savings_1_f9ae3b5cf12cb73d",
        "effectLabel": "Select the applicable Marshall Municipal Utilities or Bright Energy Solutions business measure. Prescriptive HVAC examples include $100 per ton for qualifyin..."
      },
      {
        "inputKey": "purchase_price",
        "opportunityId": "SOURCE_DSIRE:dsire_program_id:1940",
        "programName": "Marshall Municipal Utilities - Residential Energy Efficiency Rebate Program",
        "calculationStatus": "calculable_with_missing_inputs",
        "effectId": "effect_one_time_savings_1_0abd0f85c4ab783a",
        "effectLabel": "Use the current Marshall residential measure menu. Examples include $200 per ton for ground-source heat pumps, $150 per ton for qualifying air-source heat pu..."
      },
      {
        "inputKey": "eligible_installation_labor_cost",
        "opportunityId": "SOURCE_DSIRE:dsire_program_id:4279",
        "programName": "Black Hills Energy (Electric) - Commercial Energy Efficiency Program",
        "calculationStatus": "calculable_with_missing_inputs",
        "effectId": "effect_one_time_savings_1_d49853e43f32c2aa",
        "effectLabel": "For the Colorado electric commercial pathway identified by the source, rebate amount is 70% of eligible equipment and installation costs for listed measures ..."
      },
      {
        "inputKey": "installed_cost_if_up_to_amount",
        "opportunityId": "SOURCE_DSIRE:dsire_program_id:3672",
        "programName": "Black Hills Energy (Gas) - Residential Energy Efficiency Program",
        "calculationStatus": "calculable_with_missing_inputs",
        "effectId": "effect_one_time_savings_1_c4335ace528ce922",
        "effectLabel": "Use the 2026 Colorado gas residential application by measure. The smart thermostat line is up to $100 per qualifying ENERGY STAR or learning Wi-Fi thermostat..."
      },
      {
        "inputKey": "installation_cost_cents",
        "opportunityId": "SOURCE_DSIRE:dsire_program_id:3571",
        "programName": "La Plata Electric Association - Residential Energy Efficiency Rebate Program",
        "calculationStatus": "calculable_with_missing_inputs",
        "effectId": "effect_one_time_savings_1_52caa6872ec219cc",
        "effectLabel": "Select the LPEA residential measure and tier. Standard Level 2 EV charging is 50% of equipment plus professional installation up to $250; income-qualified is..."
      },
      {
        "inputKey": "material_cost_cents",
        "opportunityId": "SOURCE_DSIRE:dsire_program_id:3571",
        "programName": "La Plata Electric Association - Residential Energy Efficiency Rebate Program",
        "calculationStatus": "calculable_with_missing_inputs",
        "effectId": "effect_one_time_savings_1_52caa6872ec219cc",
        "effectLabel": "Select the LPEA residential measure and tier. Standard Level 2 EV charging is 50% of equipment plus professional installation up to $250; income-qualified is..."
      },
      {
        "inputKey": "calendar_year_prior_rebates_cents",
        "opportunityId": "SOURCE_DSIRE:dsire_program_id:5241",
        "programName": "Florida Keys Electric Cooperative - Residential Rebate Program",
        "calculationStatus": "calculable_with_missing_inputs",
        "effectId": "effect_one_time_savings_1_16fc58d980481c02",
        "effectLabel": "Use the FKEC residential measure schedule. Publicly indexed official material identifies a UL-certified smart Level 2 EV charger rebate up to $350, programma..."
      },
      {
        "inputKey": "eligible_cost_cents",
        "opportunityId": "SOURCE_DSIRE:dsire_program_id:1780",
        "programName": "Orlando Utilities Commission - Residential Energy Efficiency Rebate Program",
        "calculationStatus": "calculable_with_missing_inputs",
        "effectId": "effect_one_time_savings_1_0b0035e7671a85c6",
        "effectLabel": "Use the OUC residential rebate table. Heat pump water heaters receive $500. Solar thermal water heaters are reimbursed at 100% of eligible cost up to $900. H..."
      },
      {
        "inputKey": "product_cost_cents",
        "opportunityId": "SOURCE_DSIRE:dsire_program_id:3175",
        "programName": "Georgia Power - Home Energy Improvement Program",
        "calculationStatus": "calculable_with_missing_inputs",
        "effectId": "effect_one_time_savings_1_ce560588cbb6d033",
        "effectLabel": "Select the HEIP 2026 measure. Most installed measures pay 50% of eligible cost up to the published measure cap; product measures are fixed amounts. Annual HE..."
      },
      {
        "inputKey": "customer_annual_heip_rebates_cents",
        "opportunityId": "SOURCE_DSIRE:dsire_program_id:3175",
        "programName": "Georgia Power - Home Energy Improvement Program",
        "calculationStatus": "calculable_with_missing_inputs",
        "effectId": "effect_one_time_savings_1_ce560588cbb6d033",
        "effectLabel": "Select the HEIP 2026 measure. Most installed measures pay 50% of eligible cost up to the published measure cap; product measures are fixed amounts. Annual HE..."
      },
      {
        "inputKey": "invoice_date",
        "opportunityId": "SOURCE_DSIRE:dsire_program_id:22130",
        "programName": "Minnesota Power - Business Rebates & Savings",
        "calculationStatus": "calculable_with_missing_inputs",
        "effectId": "effect_one_time_savings_1_f51f43bda0b69af6",
        "effectLabel": "Use Minnesota Power's 2026 business catalog. Lighting includes fixed lamp amounts and per-LED-watt rates; HVAC, appliance and foodservice measures use fixed ..."
      },
      {
        "inputKey": "contractor_quote",
        "opportunityId": "SOURCE_DSIRE:dsire_program_id:2237",
        "programName": "Snohomish County PUD No 1 - Residential Energy Efficiency Rebate Program",
        "calculationStatus": "calculable_with_missing_inputs",
        "effectId": "effect_one_time_savings_1_aad5358b50e1dc2a",
        "effectLabel": "Select product or contractor-delivered row; some rebates are instant through registered contractors and product rebates require purchase details."
      }
    ],
    "eligibility_timing_or_profile": [
      {
        "inputKey": "trap_application",
        "opportunityId": "SOURCE_DSIRE:dsire_program_id:3235",
        "programName": "Peoples Gas - Commercial & Industrial Prescriptive Rebate Program",
        "calculationStatus": "calculable_with_missing_inputs",
        "effectId": "effect_one_time_savings_1_1beb808333fd22f1",
        "effectLabel": "For eligible commercial or process steam traps, multiply the applicable 2026 rate-table amount by trap count; total rebate cannot exceed eligible project cost."
      },
      {
        "inputKey": "qualified_off_peak_rate_enrollment",
        "opportunityId": "SOURCE_DSIRE:dsire_program_id:3146",
        "programName": "Otter Tail Power Company - Residential and Commercial Energy Efficiency Rebate Program",
        "calculationStatus": "calculable_with_missing_inputs",
        "effectId": "effect_one_time_savings_1_997bbb71eb9a990a",
        "effectLabel": "Rebate is $500 for each hardwired Level 2 EV charging station installed on a qualified Otter Tail Power off-peak rate."
      },
      {
        "inputKey": "proof_of_installation",
        "opportunityId": "SOURCE_DSIRE:dsire_program_id:3146",
        "programName": "Otter Tail Power Company - Residential and Commercial Energy Efficiency Rebate Program",
        "calculationStatus": "calculable_with_missing_inputs",
        "effectId": "effect_one_time_savings_1_997bbb71eb9a990a",
        "effectLabel": "Rebate is $500 for each hardwired Level 2 EV charging station installed on a qualified Otter Tail Power off-peak rate."
      },
      {
        "inputKey": "proof_of_purchase_or_installation",
        "opportunityId": "SOURCE_DSIRE:dsire_program_id:1810",
        "programName": "Lodi Electric Utility - Residential Energy Efficiency Rebate Program",
        "calculationStatus": "calculable_with_missing_inputs",
        "effectId": "effect_one_time_savings_1_add363ac030ab973",
        "effectLabel": "For eligible residential Level II EV projects, Lodi lists separate $500 rebates for charger hardware and charger installation."
      },
      {
        "inputKey": "proof_of_purchase",
        "opportunityId": "SOURCE_DSIRE:dsire_program_id:1889",
        "programName": "Pasadena Water and Power - Residential Energy Efficiency Rebate Program",
        "calculationStatus": "calculable_with_missing_inputs",
        "effectId": "effect_one_time_savings_1_ac406a53b4c69f6f",
        "effectLabel": "For a qualifying residential Level 2 charger, use $600 for Wi-Fi enabled equipment or $200 for standard non-Wi-Fi equipment."
      },
      {
        "inputKey": "installation_date",
        "opportunityId": "SOURCE_DSIRE:dsire_program_id:4952",
        "programName": "SoCalGas - Custom Non-Residential Energy Efficiency Program",
        "calculationStatus": "calculable_with_missing_inputs",
        "effectId": "effect_one_time_savings_1_84210744e6c37713",
        "effectLabel": "For eligible SoCalGas commercial steam traps, rebate is $100 per qualifying unit."
      },
      {
        "inputKey": "socalgas_nonresidential_gas_service",
        "opportunityId": "SOURCE_DSIRE:dsire_program_id:4952",
        "programName": "SoCalGas - Custom Non-Residential Energy Efficiency Program",
        "calculationStatus": "calculable_with_missing_inputs",
        "effectId": "effect_one_time_savings_1_84210744e6c37713",
        "effectLabel": "For eligible SoCalGas commercial steam traps, rebate is $100 per qualifying unit."
      },
      {
        "inputKey": "completion_date",
        "opportunityId": "SOURCE_DSIRE:dsire_program_id:5796",
        "programName": "Efficiency Works - Business Energy Efficiency Rebate Program (Offered by 4 Utilities)",
        "calculationStatus": "calculable_with_missing_inputs",
        "effectId": "effect_one_time_savings_1_2750a32ce554031b",
        "effectLabel": "Community Efficiency Grant adds an incentive equal to 100% of the standard Efficiency Works rebate, capped at total project cost and limited to the grant pat..."
      },
      {
        "inputKey": "preapproval_status",
        "opportunityId": "SOURCE_DSIRE:dsire_program_id:3689",
        "programName": "PEPCO - Commercial and Industrial Energy Efficiency Incentives Program",
        "calculationStatus": "calculable_with_missing_inputs",
        "effectId": "effect_one_time_savings_1_76898304da98e944",
        "effectLabel": "Use Pepco Maryland business prescriptive incentive-reference amount for the selected qualifying measure, subject to application requirements and program caps..."
      },
      {
        "inputKey": "power_smart_enrollment_status",
        "opportunityId": "SOURCE_DSIRE:dsire_program_id:1882",
        "programName": "Modesto Irrigation District - Residential Energy Efficiency Rebate Program",
        "calculationStatus": "calculable_with_missing_inputs",
        "effectId": "effect_one_time_savings_1_7e77716a5e8aceed",
        "effectLabel": "Apply the MID residential rebate amount for the selected qualifying home measure. Known current examples include $500 per ENERGY STAR heat pump water heater,..."
      },
      {
        "inputKey": "enrollment_status",
        "opportunityId": "SOURCE_DSIRE:dsire_program_id:1882",
        "programName": "Modesto Irrigation District - Residential Energy Efficiency Rebate Program",
        "calculationStatus": "calculable_with_missing_inputs",
        "effectId": "effect_one_time_savings_1_7e77716a5e8aceed",
        "effectLabel": "Apply the MID residential rebate amount for the selected qualifying home measure. Known current examples include $500 per ENERGY STAR heat pump water heater,..."
      },
      {
        "inputKey": "gas_service_status",
        "opportunityId": "SOURCE_DSIRE:dsire_program_id:1463",
        "programName": "SoCalGas - Non-Residential Energy Efficiency Rebate Programs",
        "calculationStatus": "calculable_with_missing_inputs",
        "effectId": "effect_one_time_savings_1_86e7a2048c1b7639",
        "effectLabel": "Apply SoCalGas 2026 business rebate guide amount for the selected qualifying natural-gas measure. Foodservice and steam-trap examples are per unit, per vat, ..."
      },
      {
        "inputKey": "existing_central_cooling_status_for_envelope",
        "opportunityId": "SOURCE_DSIRE:dsire_program_id:4281",
        "programName": "Black Hills Energy (Electric) - Residential Energy Efficiency Program",
        "calculationStatus": "calculable_with_missing_inputs",
        "effectId": "effect_one_time_savings_1_ca491ecb2b8d33e2",
        "effectLabel": "Apply Black Hills Energy 2026 Colorado electric residential prescriptive amount for the qualifying measure. Examples include HPWH $500, ENERGY STAR smart the..."
      },
      {
        "inputKey": "public_access_status",
        "opportunityId": "SOURCE_DSIRE:dsire_program_id:4312",
        "programName": "San Miguel Power Association - Energy Efficiency Rebate Program",
        "calculationStatus": "calculable_with_missing_inputs",
        "effectId": "effect_one_time_savings_1_ec6aa78a1630c0e9",
        "effectLabel": "Apply SMPA's stated measure amount or 50% cost cap, whichever is lower where a cap applies. EV examples: private Level 2 50% equipment plus 50% installation ..."
      },
      {
        "inputKey": "trade_ally_status",
        "opportunityId": "SOURCE_DSIRE:dsire_program_id:4608",
        "programName": "JEA - Commercial Energy Efficiency Rebate Program",
        "calculationStatus": "calculable_with_missing_inputs",
        "effectId": "effect_one_time_savings_1_2c490f3917ef6c21",
        "effectLabel": "Use JEA's business rebate table or trade-ally application for the selected qualifying commercial measure. EV charging belongs to JEA's separate business elec..."
      },
      {
        "inputKey": "purchase_or_installation_date",
        "opportunityId": "SOURCE_DSIRE:dsire_program_id:4723",
        "programName": "JEA - Residential Energy Efficiency Rebate Program",
        "calculationStatus": "calculable_with_missing_inputs",
        "effectId": "effect_one_time_savings_1_70fcef53efde0582",
        "effectLabel": "Apply JEA's residential rebate amount for the selected qualifying measure. Current examples include attic insulation $0.20/sq ft up to $200, clothes washer $..."
      },
      {
        "inputKey": "survey_status",
        "opportunityId": "SOURCE_DSIRE:dsire_program_id:4130",
        "programName": "Nicor Gas - Commercial Energy Efficiency Rebates",
        "calculationStatus": "calculable_with_missing_inputs",
        "effectId": "effect_one_time_savings_1_1580d4e8008dbe2c",
        "effectLabel": "Apply current Nicor Gas business or multifamily rebate amount for the qualifying gas-saving measure. Steam-trap examples: commercial steam traps under 15 psi..."
      },
      {
        "inputKey": "customer_class",
        "opportunityId": "SOURCE_DSIRE:dsire_program_id:4130",
        "programName": "Nicor Gas - Commercial Energy Efficiency Rebates",
        "calculationStatus": "calculable_with_missing_inputs",
        "effectId": "effect_one_time_savings_1_1580d4e8008dbe2c",
        "effectLabel": "Apply current Nicor Gas business or multifamily rebate amount for the qualifying gas-saving measure. Steam-trap examples: commercial steam traps under 15 psi..."
      },
      {
        "inputKey": "approved_contractor_status_for_multifamily_weatherization",
        "opportunityId": "SOURCE_DSIRE:dsire_program_id:4130",
        "programName": "Nicor Gas - Commercial Energy Efficiency Rebates",
        "calculationStatus": "calculable_with_missing_inputs",
        "effectId": "effect_one_time_savings_1_1580d4e8008dbe2c",
        "effectLabel": "Apply current Nicor Gas business or multifamily rebate amount for the qualifying gas-saving measure. Steam-trap examples: commercial steam traps under 15 psi..."
      },
      {
        "inputKey": "steam_trap_survey_status",
        "opportunityId": "SOURCE_DSIRE:dsire_program_id:4130",
        "programName": "Nicor Gas - Commercial Energy Efficiency Rebates",
        "calculationStatus": "calculable_with_missing_inputs",
        "effectId": "effect_one_time_savings_1_1580d4e8008dbe2c",
        "effectLabel": "Apply current Nicor Gas business or multifamily rebate amount for the qualifying gas-saving measure. Steam-trap examples: commercial steam traps under 15 psi..."
      },
      {
        "inputKey": "affordable_housing_status_for_ev",
        "opportunityId": "SOURCE_DSIRE:dsire_program_id:2593",
        "programName": "EWEB - Commercial Energy Efficiency Rebates Program",
        "calculationStatus": "calculable_with_missing_inputs",
        "effectId": "effect_one_time_savings_1_8fc373696e3ccf71",
        "effectLabel": "Apply EWEB's current business measure amount for the selected qualifying measure. Examples include Level 2 public/multifamily EVSE $1,500 per port or afforda..."
      },
      {
        "inputKey": "income_qualified_status",
        "opportunityId": "SOURCE_DSIRE:dsire_program_id:4636",
        "programName": "Burlington Electric Department - Residential Energy Efficiency Rebate Program",
        "calculationStatus": "calculable_with_missing_inputs",
        "effectId": "effect_one_time_savings_1_d62ab023b6fca6fc",
        "effectLabel": "Apply BED's current measure amount, with total rebate generally capped at 75% of installed cost where stated. Examples include residential EV charger $900 fo..."
      },
      {
        "inputKey": "ev_rate_enrollment_status",
        "opportunityId": "SOURCE_DSIRE:dsire_program_id:4636",
        "programName": "Burlington Electric Department - Residential Energy Efficiency Rebate Program",
        "calculationStatus": "calculable_with_missing_inputs",
        "effectId": "effect_one_time_savings_1_d62ab023b6fca6fc",
        "effectLabel": "Apply BED's current measure amount, with total rebate generally capped at 75% of installed cost where stated. Examples include residential EV charger $900 fo..."
      },
      {
        "inputKey": "qualifying_product_status",
        "opportunityId": "SOURCE_DSIRE:dsire_program_id:4636",
        "programName": "Burlington Electric Department - Residential Energy Efficiency Rebate Program",
        "calculationStatus": "calculable_with_missing_inputs",
        "effectId": "effect_one_time_savings_1_d62ab023b6fca6fc",
        "effectLabel": "Apply BED's current measure amount, with total rebate generally capped at 75% of installed cost where stated. Examples include residential EV charger $900 fo..."
      },
      {
        "inputKey": "income_qualified_weatherization_agency_status",
        "opportunityId": "SOURCE_DSIRE:dsire_program_id:2290",
        "programName": "Carbon Power & Light - Residential Energy Efficiency Rebate Program",
        "calculationStatus": "calculable_with_missing_inputs",
        "effectId": "effect_one_time_savings_1_f007af6ed7f876a0",
        "effectLabel": "Credits are applied to the Carbon Power member-owner account. Apply the current official measure amount: HPWH $350, ducted or ductless air-source heat pump $..."
      }
    ],
    "utility_bill_or_rate_data": [
      {
        "inputKey": "rate_schedule_class",
        "opportunityId": "SOURCE_DSIRE:dsire_program_id:1897",
        "programName": "Riverside Public Utilities - Commercial Energy Efficiency Rebate Program",
        "calculationStatus": "calculable_with_missing_inputs",
        "effectId": "effect_one_time_savings_1_7fc063a35be15550",
        "effectLabel": "Use the business AC incentive row by equipment efficiency and measure type; total rebate is capped by rate schedule and cannot exceed 50% of project cost."
      },
      {
        "inputKey": "qualifying_control_or_rate_program",
        "opportunityId": "SOURCE_DSIRE:dsire_program_id:2516",
        "programName": "Riverland Energy Cooperative - Commercial, Industrial, and Agricultural Energy Efficiency Rebate ...",
        "calculationStatus": "calculable_with_missing_inputs",
        "effectId": "effect_one_time_savings_1_fdff23a76226146a",
        "effectLabel": "EV charger rebate is $500 for each qualifying Level 2 charger on the applicable Riverland EV charger form, subject to purchase-price and funds limits."
      },
      {
        "inputKey": "custom_savings",
        "opportunityId": "SOURCE_DSIRE:dsire_program_id:4608",
        "programName": "JEA - Commercial Energy Efficiency Rebate Program",
        "calculationStatus": "calculable_with_missing_inputs",
        "effectId": "effect_one_time_savings_1_2c490f3917ef6c21",
        "effectLabel": "Use JEA's business rebate table or trade-ally application for the selected qualifying commercial measure. EV charging belongs to JEA's separate business elec..."
      },
      {
        "inputKey": "current_tariff_credit",
        "opportunityId": "SOURCE_DSIRE:dsire_program_id:4636",
        "programName": "Burlington Electric Department - Residential Energy Efficiency Rebate Program",
        "calculationStatus": "calculable_with_missing_inputs",
        "effectId": "effect_one_time_savings_1_d62ab023b6fca6fc",
        "effectLabel": "Apply BED's current measure amount, with total rebate generally capped at 75% of installed cost where stated. Examples include residential EV charger $900 fo..."
      },
      {
        "inputKey": "load_management_participation_if_required",
        "opportunityId": "SOURCE_DSIRE:dsire_program_id:1940",
        "programName": "Marshall Municipal Utilities - Residential Energy Efficiency Rebate Program",
        "calculationStatus": "calculable_with_missing_inputs",
        "effectId": "effect_one_time_savings_1_0abd0f85c4ab783a",
        "effectLabel": "Use the current Marshall residential measure menu. Examples include $200 per ton for ground-source heat pumps, $150 per ton for qualifying air-source heat pu..."
      },
      {
        "inputKey": "load_management_participation",
        "opportunityId": "SOURCE_DSIRE:dsire_program_id:1940",
        "programName": "Marshall Municipal Utilities - Residential Energy Efficiency Rebate Program",
        "calculationStatus": "calculable_with_missing_inputs",
        "effectId": "effect_one_time_savings_1_0abd0f85c4ab783a",
        "effectLabel": "Use the current Marshall residential measure menu. Examples include $200 per ton for ground-source heat pumps, $150 per ton for qualifying air-source heat pu..."
      },
      {
        "inputKey": "qualified_off_peak_rate_participation",
        "opportunityId": "SOURCE_DSIRE:dsire_program_id:3139",
        "programName": "Otter Tail Power Company - Energy Efficiency Rebate Program",
        "calculationStatus": "calculable_with_missing_inputs",
        "effectId": "effect_one_time_savings_1_7e7daabfb73f25a9",
        "effectLabel": "Qualifying customers installing a Level 2 EV charging station on an Otter Tail Power qualified off-peak rate may receive a $500 rebate per eligible charging ..."
      },
      {
        "inputKey": "load_management_participation_if_applicable",
        "opportunityId": "SOURCE_DSIRE:dsire_program_id:3919",
        "programName": "Firelands Electric Cooperative - Residential Energy Efficiency Rebate Program",
        "calculationStatus": "calculable_with_missing_inputs",
        "effectId": "effect_one_time_savings_1_8d3ff88f254888ba",
        "effectLabel": "Use Firelands' current member rebate menu. Examples include $250 per Level 2 EV charger, weatherization at the lower of the listed dollar cap or 50% of proje..."
      },
      {
        "inputKey": "gas_meter_rate_schedule",
        "opportunityId": "SOURCE_DSIRE:dsire_program_id:2689",
        "programName": "Dominion Energy - Commercial Energy Efficiency Rebate Program",
        "calculationStatus": "calculable_with_missing_inputs",
        "effectId": "effect_one_time_savings_1_0fc455ecfdb0423a",
        "effectLabel": "Use the ThermWise Utah business measure schedule for eligible Enbridge Gas business meters. The commercial smart thermostat formula is $100 per qualifying th..."
      },
      {
        "inputKey": "swepco_arkansas_residential_meter",
        "opportunityId": "SOURCE_DSIRE:dsire_program_id:3642",
        "programName": "AEP SWEPCO - Residential Energy Efficiency Rebate Programs",
        "calculationStatus": "calculable_with_missing_inputs",
        "effectId": "effect_one_time_savings_1_e41195585209b096",
        "effectLabel": "SWEPCO Arkansas residential customers may receive $250 per ENERGY STAR certified Level 2 EV charging station. Other residential efficient-products, HVAC and ..."
      },
      {
        "inputKey": "verified_savings",
        "opportunityId": "SOURCE_DSIRE:dsire_program_id:4639",
        "programName": "Avista Utilities (Electric) - Commercial Energy Efficiency Incentives Program",
        "calculationStatus": "calculable_with_missing_inputs",
        "effectId": "effect_one_time_savings_1_e5f6014279212ff0",
        "effectLabel": "For published instant or standard business measures, multiply the applicable rate by the qualifying unit count or use the fixed table amount. Green Motors re..."
      },
      {
        "inputKey": "estimated_savings",
        "opportunityId": "SOURCE_DSIRE:dsire_program_id:4639",
        "programName": "Avista Utilities (Electric) - Commercial Energy Efficiency Incentives Program",
        "calculationStatus": "calculable_with_missing_inputs",
        "effectId": "effect_one_time_savings_1_e5f6014279212ff0",
        "effectLabel": "For published instant or standard business measures, multiply the applicable rate by the qualifying unit count or use the fixed table amount. Green Motors re..."
      },
      {
        "inputKey": "annual_mcf_saved",
        "opportunityId": "SOURCE_DSIRE:dsire_program_id:3594",
        "programName": "Consumers Energy (Gas) - Commercial Energy Efficiency Program",
        "calculationStatus": "calculable_with_missing_inputs",
        "effectId": "effect_one_time_savings_1_bf19cdf9d410beaa",
        "effectLabel": "For qualifying business custom measures, incentive equals $0.10 per annual kWh saved or $12 per annual Mcf saved, capped at 50% of eligible project cost and ..."
      },
      {
        "inputKey": "prescriptive_workbook_or_approved_savings",
        "opportunityId": "SOURCE_DSIRE:dsire_program_id:1544",
        "programName": "Texas-New Mexico Power Company - Commercial Market Transformation Program",
        "calculationStatus": "calculable_with_missing_inputs",
        "effectId": "effect_one_time_savings_1_2a973e3a7484e30d",
        "effectLabel": "Final incentive is calculated from annual energy savings as $400 per kilowatt saved or $0.105 per kilowatt-hour saved; custom projects may have varied values..."
      },
      {
        "inputKey": "rate_participation",
        "opportunityId": "SOURCE_DSIRE:dsire_program_id:2278",
        "programName": "Sawnee EMC - Residential Energy Efficiency Rebate Program",
        "calculationStatus": "calculable_with_missing_inputs",
        "effectId": "effect_one_time_savings_1_bee4369dee0b3927",
        "effectLabel": "One-time bill-credit rebate equals the fixed or capped published amount for the selected residential measure; several measures use 50% of total cost up to th..."
      },
      {
        "inputKey": "off_peak_charging_agreement",
        "opportunityId": "SOURCE_DSIRE:dsire_program_id:2966",
        "programName": "Platte-Clay Electric Cooperative - Residential and Commercial Energy Efficiency Rebates",
        "calculationStatus": "calculable_with_missing_inputs",
        "effectId": "effect_one_time_savings_1_8ebe23796f57d5e1",
        "effectLabel": "Rebate equals the applicable Platte-Clay published amount, per-ton heat pump rate, capped cost-share amount, or business lighting audit amount for the select..."
      },
      {
        "inputKey": "tariff_participation",
        "opportunityId": "SOURCE_DSIRE:dsire_program_id:2966",
        "programName": "Platte-Clay Electric Cooperative - Residential and Commercial Energy Efficiency Rebates",
        "calculationStatus": "calculable_with_missing_inputs",
        "effectId": "effect_one_time_savings_1_8ebe23796f57d5e1",
        "effectLabel": "Rebate equals the applicable Platte-Clay published amount, per-ton heat pump rate, capped cost-share amount, or business lighting audit amount for the select..."
      },
      {
        "inputKey": "beat_the_peak_text_signup",
        "opportunityId": "SOURCE_DSIRE:dsire_program_id:2084",
        "programName": "United Cooperative Services - Residential Energy Efficiency Rebate Program",
        "calculationStatus": "calculable_with_missing_inputs",
        "effectId": "effect_one_time_savings_1_fe90a7063e5e4ad0",
        "effectLabel": "Residential rebate equals the published fixed, capped cost-share, or insulation formula amount for qualifying purchases or services, subject to documentation..."
      },
      {
        "inputKey": "rate_class",
        "opportunityId": "SOURCE_DSIRE:dsire_program_id:5163",
        "programName": "Empire Electric Association - Commercial Energy Efficiency Rebate Program",
        "calculationStatus": "calculable_with_missing_inputs",
        "effectId": "effect_one_time_savings_1_72bb0b86a14ea923",
        "effectLabel": "Apply the 2026 EEA commercial products rate for pole-mounted LED lighting or eligible EV charging; EV incentives are 50% of equipment and/or installation sub..."
      },
      {
        "inputKey": "approved_demand_reduction",
        "opportunityId": "SOURCE_DSIRE:dsire_program_id:5412",
        "programName": "Orlando Utilities Commission - Commercial Energy Efficiency Rebate Program",
        "calculationStatus": "calculable_with_missing_inputs",
        "effectId": "effect_one_time_savings_1_8d48e844404a9493",
        "effectLabel": "Apply the OUC business electric rebate rate for the selected measure; C&I incentive projects are calculated from approved permanent demand reduction and savi..."
      },
      {
        "inputKey": "demand_class",
        "opportunityId": "SOURCE_DSIRE:dsire_program_id:2447",
        "programName": "Linn County Rural Electric Cooperative - Residential and Small Commercial (<75kw) rebates",
        "calculationStatus": "calculable_with_missing_inputs",
        "effectId": "effect_one_time_savings_1_ddc2516a6d5fb15c",
        "effectLabel": "Apply the Corridor Energy residential or small-commercial rebate row for qualifying heat pump, ground-source heat pump, HPWH, Level II charger, appliance or ..."
      },
      {
        "inputKey": "gas_rate_schedule",
        "opportunityId": "SOURCE_DSIRE:dsire_program_id:5037",
        "programName": "Dominion Energy - ThermWise Commercial Energy Efficiency Rebate Program",
        "calculationStatus": "calculable_with_missing_inputs",
        "effectId": "effect_one_time_savings_1_3aceddbf6ada8b87",
        "effectLabel": "Apply the ThermWise business rebate row for qualifying natural-gas equipment, smart thermostats, laundry, insulation retrofit or approved custom gas-efficien..."
      },
      {
        "inputKey": "custom_project_savings",
        "opportunityId": "SOURCE_DSIRE:dsire_program_id:5037",
        "programName": "Dominion Energy - ThermWise Commercial Energy Efficiency Rebate Program",
        "calculationStatus": "calculable_with_missing_inputs",
        "effectId": "effect_one_time_savings_1_3aceddbf6ada8b87",
        "effectLabel": "Apply the ThermWise business rebate row for qualifying natural-gas equipment, smart thermostats, laundry, insulation retrofit or approved custom gas-efficien..."
      },
      {
        "inputKey": "annual_steam_savings_mlbs",
        "opportunityId": "SOURCE_DSIRE:dsire_program_id:4691",
        "programName": "ConEd (Gas) - Commercial and Industrial Energy Efficiency Program",
        "calculationStatus": "calculable_with_missing_inputs",
        "effectId": "effect_one_time_savings_1_632f174ecd9fe2eb",
        "effectLabel": "For qualifying Con Edison C&I measures, calculate incentive from approved annual savings using the published custom rate by fuel or measure type. Southeast Q..."
      },
      {
        "inputKey": "fan_diameter_feet",
        "opportunityId": "SOURCE_DSIRE:dsire_program_id:2004",
        "programName": "PSEG Long Island - Commercial Energy Efficiency Rebate Program",
        "calculationStatus": "calculable_with_missing_inputs",
        "effectId": "effect_one_time_savings_1_4425c8b439e5ddc7",
        "effectLabel": "Use the PSEG Long Island commercial measure rate for eligible equipment quantity, such as $95 per horsepower for variable speed drives. Custom and weatheriza..."
      }
    ],
    "award_probability": [
      {
        "inputKey": "award_probability",
        "opportunityId": "SOURCE_DSIRE:dsire_program_id:21861",
        "programName": "Agricultural Energy Program",
        "calculationStatus": "no_calculable_value",
        "effectId": "effect_grant_expected_value_1_d2ac4b4734cc8f4f",
        "effectLabel": "Competitive agricultural energy grants may cover eligible project costs up to a $20,000 award, with at least 10% applicant cost share. Do not estimate an exp..."
      },
      {
        "inputKey": "svp_award_decision",
        "opportunityId": "SOURCE_SILICON_VALLEY_POWER:svp_source_section:6e6b359eb5fc98c0:energy-efficiency-grant-program-for-nonprofit-organizations",
        "programName": "Energy Efficiency Grant Program for Nonprofit Organizations",
        "calculationStatus": "calculable_with_missing_inputs",
        "effectId": "effect_grant_expected_value_1_6f580262ed2e24cd",
        "effectLabel": "Grant can fund up to 80% of eligible electricity-saving project cost, capped at $25,000 for a single project; award is application-based and not an expected ..."
      },
      {
        "inputKey": "cobb_emc_award_determination",
        "opportunityId": "SOURCE_DSIRE:dsire_program_id:22811",
        "programName": "Cobb Electric Membership Corporation - Business EV Charger Grant Program",
        "calculationStatus": "custom_quote_estimate",
        "effectId": "effect_grant_expected_value_1_54a6dbe585e8fc1f",
        "effectLabel": "Cobb EMC business EV grants range from $500 to $5,000; Cobb EMC determines the award at its sole discretion based on charger classification, number of ports,..."
      },
      {
        "inputKey": "award_notice",
        "opportunityId": "SOURCE_DSIRE:dsire_program_id:22199",
        "programName": "It Pay$ to Plug in Program",
        "calculationStatus": "calculable_with_missing_inputs",
        "effectId": "effect_one_time_savings_1_775c1a75361e123c",
        "effectLabel": "Level 1 and Level 2 reimbursement is up to $750 per Level 1 charging port or up to $4,000 per Level 2 charging port for eligible non-single-family sites."
      },
      {
        "inputKey": "award_selection_probability",
        "opportunityId": "SOURCE_SDGE_BUSINESS:program_url:sdge_com_node_23891",
        "programName": "National Electric Vehicle Infrastructure (NEVI) Program",
        "calculationStatus": "non_monetary_workflow",
        "effectId": "effect_process_value_1_cf6d168f0142b014",
        "effectLabel": "SDG&E provides customer support for businesses pursuing California NEVI funding, but the SDG&E page is not a direct charger rebate or grant award."
      },
      {
        "inputKey": "gdot_procurement_round_or_award",
        "opportunityId": "SOURCE_DSIRE:dsire_program_id:22635",
        "programName": "Georgia - National Electric Vehicle Infrastructure (NEVI) Formula Grant Program",
        "calculationStatus": "calculable_with_missing_inputs",
        "effectId": "effect_grant_expected_value_1_8aaf3b374a0e6004",
        "effectLabel": "For Georgia NEVI public DC fast-charging projects selected through GDOT procurement, potential federal NEVI participation may cover up to 80% of eligible pro..."
      },
      {
        "inputKey": "mdot_round_3_award_selection",
        "opportunityId": "SOURCE_DSIRE:dsire_program_id:22647",
        "programName": "Michigan - National Electric Vehicle Infrastructure (NEVI) Formula Grant Program",
        "calculationStatus": "calculable_with_missing_inputs",
        "effectId": "effect_grant_expected_value_1_cddd6282f92b5b42",
        "effectLabel": "Selected Michigan NEVI projects may receive federal cost-share funding up to 80% of eligible EV charging project costs; the actual award is determined by MDO..."
      },
      {
        "inputKey": "award_selection",
        "opportunityId": "SOURCE_DSIRE:dsire_program_id:22647",
        "programName": "Michigan - National Electric Vehicle Infrastructure (NEVI) Formula Grant Program",
        "calculationStatus": "calculable_with_missing_inputs",
        "effectId": "effect_grant_expected_value_1_cddd6282f92b5b42",
        "effectLabel": "Selected Michigan NEVI projects may receive federal cost-share funding up to 80% of eligible EV charging project costs; the actual award is determined by MDO..."
      },
      {
        "inputKey": "mdt_procurement_selection",
        "opportunityId": "SOURCE_DSIRE:dsire_program_id:22656",
        "programName": "Montana - National Electric Vehicle Infrastructure (NEVI) Formula Grant Program",
        "calculationStatus": "calculable_with_missing_inputs",
        "effectId": "effect_grant_expected_value_1_0f0a763b480029a9",
        "effectLabel": "Selected Montana NEVI projects may receive up to 80% federal cost-share for eligible public DC fast-charging project costs; actual funding depends on MDT pro..."
      },
      {
        "inputKey": "procurement_selection",
        "opportunityId": "SOURCE_DSIRE:dsire_program_id:22656",
        "programName": "Montana - National Electric Vehicle Infrastructure (NEVI) Formula Grant Program",
        "calculationStatus": "calculable_with_missing_inputs",
        "effectId": "effect_grant_expected_value_1_0f0a763b480029a9",
        "effectLabel": "Selected Montana NEVI projects may receive up to 80% federal cost-share for eligible public DC fast-charging project costs; actual funding depends on MDT pro..."
      },
      {
        "inputKey": "nhdot_round_ii_selection",
        "opportunityId": "SOURCE_DSIRE:dsire_program_id:22640",
        "programName": "New Hampshire - National Electric Vehicle Infrastructure (NEVI) Formula Grant Program",
        "calculationStatus": "calculable_with_missing_inputs",
        "effectId": "effect_grant_expected_value_1_08058b4cd05b18d9",
        "effectLabel": "Selected New Hampshire Round II NEVI projects may receive up to 80% federal cost-share for eligible DC fast-charging infrastructure costs; actual awards depe..."
      },
      {
        "inputKey": "round_ii_selection",
        "opportunityId": "SOURCE_DSIRE:dsire_program_id:22640",
        "programName": "New Hampshire - National Electric Vehicle Infrastructure (NEVI) Formula Grant Program",
        "calculationStatus": "calculable_with_missing_inputs",
        "effectId": "effect_grant_expected_value_1_08058b4cd05b18d9",
        "effectLabel": "Selected New Hampshire Round II NEVI projects may receive up to 80% federal cost-share for eligible DC fast-charging infrastructure costs; actual awards depe..."
      },
      {
        "inputKey": "selection_result",
        "opportunityId": "SOURCE_DSIRE:dsire_program_id:22650",
        "programName": "Wisconsin - National Electric Vehicle Infrastructure (NEVI) Formula Grant Program",
        "calculationStatus": "custom_quote_estimate",
        "effectId": "effect_grant_expected_value_1_87952524be536771",
        "effectLabel": "Wisconsin Electric Vehicle Infrastructure awards may fund up to 80% of eligible NEVI-compliant charging project costs, with at least 20% non-federal match re..."
      },
      {
        "inputKey": "current_smmpa_form_selection",
        "opportunityId": "SOURCE_DSIRE:dsire_program_id:2588",
        "programName": "Spring Valley Public Utilities - Commercial & Industrial Energy Efficiency Rebate Program",
        "calculationStatus": "custom_quote_estimate",
        "effectId": "effect_one_time_savings_1_f01984b100d5f323",
        "effectLabel": "Use the current SMMPA/Spring Valley business rebate form for the selected measure. Official pages confirm eligible categories and form links, but the current..."
      },
      {
        "inputKey": "award_decision_probability",
        "opportunityId": "SOURCE_DSIRE:dsire_program_id:22761",
        "programName": "City and County of Denver - Green Workforce Mini Grant",
        "calculationStatus": "non_monetary_workflow",
        "effectId": "effect_grant_expected_value_1_fe826aecbd61ca63",
        "effectLabel": "Competitive workforce mini grants are available up to $49,000 for organizations improving green workforce training. This is not an installation rebate; no ex..."
      },
      {
        "inputKey": "rfp_response_score_and_award_decision",
        "opportunityId": "SOURCE_DSIRE:dsire_program_id:22783",
        "programName": "Public Charger Grants",
        "calculationStatus": "calculable_with_missing_inputs",
        "effectId": "effect_grant_expected_value_1_c8247b1ced6ec8db",
        "effectLabel": "Competitive RFP EM-008-2026 reimburses awardees up to 80% of total eligible project costs, capped at $200,000 per site, for public Level 2 EV charger project..."
      },
      {
        "inputKey": "award_probability_or_award_decision",
        "opportunityId": "SOURCE_DSIRE:dsire_program_id:22783",
        "programName": "Public Charger Grants",
        "calculationStatus": "calculable_with_missing_inputs",
        "effectId": "effect_grant_expected_value_1_c8247b1ced6ec8db",
        "effectLabel": "Competitive RFP EM-008-2026 reimburses awardees up to 80% of total eligible project costs, capped at $200,000 per site, for public Level 2 EV charger project..."
      },
      {
        "inputKey": "participant_prior_awards_cents",
        "opportunityId": "SOURCE_DSIRE:dsire_program_id:3682",
        "programName": "Entergy Arkansas - Commercial and Industrial Energy Efficiency Programs",
        "calculationStatus": "calculable_with_missing_inputs",
        "effectId": "effect_one_time_savings_1_ba949a1a460c8019",
        "effectLabel": "Feasibility study co-funding is tiered by estimated annual M&V project kWh savings, capped at the tier amount, actual study cost, and $20,000 per participant..."
      },
      {
        "inputKey": "cec_award_decision",
        "opportunityId": "SOURCE_CA_ENERGY_COMMISSION:cec_solicitation_number:GFO-25-902",
        "programName": "GFO-25-902 - Cost-Share for Federal Geothermal Energy Funding Opportunities",
        "calculationStatus": "no_calculable_value",
        "effectId": "effect_grant_expected_value_1_f1659ce17e5da4b9",
        "effectLabel": "CEC cost-share funding is available only to applicants that apply for and receive awards under eligible federal geothermal funding opportunities and meet GFO..."
      },
      {
        "inputKey": "award_decision",
        "opportunityId": "SOURCE_DSIRE:dsire_program_id:5558",
        "programName": "City of Aspen and Pitkin County - Renewable Energy Mitigation Program Grants",
        "calculationStatus": "calculable_with_missing_inputs",
        "effectId": "effect_one_time_savings_1_22733c30bc9dd9f9",
        "effectLabel": "Commercial and multifamily rebates generally cover 50% of eligible project cost, capped at $25,000 for standard participants or $50,000 for Community Priorit..."
      },
      {
        "inputKey": "score_participation_path",
        "opportunityId": "SOURCE_DSIRE:dsire_program_id:4593",
        "programName": "El Paso Electric Company - SCORE Program for Counties, Municipalities, and Schools",
        "calculationStatus": "calculable_with_missing_inputs",
        "effectId": "effect_one_time_savings_1_e12cd632f9b686c9",
        "effectLabel": "Cash incentive equals $240 per verified peak kW reduced for eligible SCORE efficiency projects, subject to verified savings, available budget, project comple..."
      }
    ],
    "other_or_needs_review": [
      {
        "inputKey": "tested_or_untested",
        "opportunityId": "SOURCE_DSIRE:dsire_program_id:3235",
        "programName": "Peoples Gas - Commercial & Industrial Prescriptive Rebate Program",
        "calculationStatus": "calculable_with_missing_inputs",
        "effectId": "effect_one_time_savings_1_1beb808333fd22f1",
        "effectLabel": "For eligible commercial or process steam traps, multiply the applicable 2026 rate-table amount by trap count; total rebate cannot exceed eligible project cost."
      },
      {
        "inputKey": "other_incentives_received",
        "opportunityId": "SOURCE_DSIRE:dsire_program_id:4312",
        "programName": "San Miguel Power Association - Energy Efficiency Rebate Program",
        "calculationStatus": "calculable_with_missing_inputs",
        "effectId": "effect_one_time_savings_1_ec6aa78a1630c0e9",
        "effectLabel": "Apply SMPA's stated measure amount or 50% cost cap, whichever is lower where a cap applies. EV examples: private Level 2 50% equipment plus 50% installation ..."
      },
      {
        "inputKey": "steam_pressure_psig",
        "opportunityId": "SOURCE_DSIRE:dsire_program_id:4130",
        "programName": "Nicor Gas - Commercial Energy Efficiency Rebates",
        "calculationStatus": "calculable_with_missing_inputs",
        "effectId": "effect_one_time_savings_1_1580d4e8008dbe2c",
        "effectLabel": "Apply current Nicor Gas business or multifamily rebate amount for the qualifying gas-saving measure. Steam-trap examples: commercial steam traps under 15 psi..."
      },
      {
        "inputKey": "simple_payback_years",
        "opportunityId": "SOURCE_DSIRE:dsire_program_id:4644",
        "programName": "Orange and Rockland Utilities (Electric) - Commercial Efficiency Programs",
        "calculationStatus": "calculable_with_missing_inputs",
        "effectId": "effect_one_time_savings_1_e7e0f1fb7e87b8fd",
        "effectLabel": "For New York business custom incentives, electric projects are paid at $0.15 per annual kWh saved, capped at 25% of project cost; gas projects are paid at $1..."
      },
      {
        "inputKey": "payback",
        "opportunityId": "SOURCE_DSIRE:dsire_program_id:4644",
        "programName": "Orange and Rockland Utilities (Electric) - Commercial Efficiency Programs",
        "calculationStatus": "calculable_with_missing_inputs",
        "effectId": "effect_one_time_savings_1_e7e0f1fb7e87b8fd",
        "effectLabel": "For New York business custom incentives, electric projects are paid at $0.15 per annual kWh saved, capped at 25% of project cost; gas projects are paid at $1..."
      },
      {
        "inputKey": "sensor_configuration",
        "opportunityId": "SOURCE_DSIRE:dsire_program_id:2593",
        "programName": "EWEB - Commercial Energy Efficiency Rebates Program",
        "calculationStatus": "calculable_with_missing_inputs",
        "effectId": "effect_one_time_savings_1_8fc373696e3ccf71",
        "effectLabel": "Apply EWEB's current business measure amount for the selected qualifying measure. Examples include Level 2 public/multifamily EVSE $1,500 per port or afforda..."
      },
      {
        "inputKey": "new_or_replacement_ground_source",
        "opportunityId": "SOURCE_DSIRE:dsire_program_id:2290",
        "programName": "Carbon Power & Light - Residential Energy Efficiency Rebate Program",
        "calculationStatus": "calculable_with_missing_inputs",
        "effectId": "effect_one_time_savings_1_f007af6ed7f876a0",
        "effectLabel": "Credits are applied to the Carbon Power member-owner account. Apply the current official measure amount: HPWH $350, ducted or ductless air-source heat pump $..."
      },
      {
        "inputKey": "current_bright_energy_solutions_form",
        "opportunityId": "SOURCE_DSIRE:dsire_program_id:3348",
        "programName": "Hutchinson Utilities Commission - Residential Energy Efficiency Program",
        "calculationStatus": "needs_repair_review",
        "effectId": "effect_one_time_savings_1_3ea9df3d58b2a96b",
        "effectLabel": "Current Bright Energy Solutions/Hutchinson sources identify residential rebate families, but exact official amount tables were not reliably accessible from c..."
      },
      {
        "inputKey": "participating_utility",
        "opportunityId": "SOURCE_DSIRE:dsire_program_id:5100",
        "programName": "Residential Energy Efficiency Rebates (Offered by 5 Utilities)",
        "calculationStatus": "estimate_from_range",
        "effectId": "effect_one_time_savings_1_e2d70ef93a57ffdd",
        "effectLabel": "For participating North Dakota Bright Energy Solutions municipal customers, select the current residential measure. EV charger examples are $500 for connecte..."
      },
      {
        "inputKey": "contractor_participation_if_required",
        "opportunityId": "SOURCE_DSIRE:dsire_program_id:3823",
        "programName": "AEP Public Service Company of Oklahoma - Residential Efficiency Rebate Program",
        "calculationStatus": "calculable_with_missing_inputs",
        "effectId": "effect_one_time_savings_1_1418b789bb5b6292",
        "effectLabel": "Use PSO's current residential rebate menu. Examples include $200 for an ENERGY STAR Level 2 smart EV charger, heat pump water heaters up to $750, programmabl..."
      },
      {
        "inputKey": "energy_star_certification",
        "opportunityId": "SOURCE_DSIRE:dsire_program_id:3642",
        "programName": "AEP SWEPCO - Residential Energy Efficiency Rebate Programs",
        "calculationStatus": "calculable_with_missing_inputs",
        "effectId": "effect_one_time_savings_1_e41195585209b096",
        "effectLabel": "SWEPCO Arkansas residential customers may receive $250 per ENERGY STAR certified Level 2 EV charging station. Other residential efficient-products, HVAC and ..."
      },
      {
        "inputKey": "registered_ev_at_truckee_address",
        "opportunityId": "SOURCE_DSIRE:dsire_program_id:1925",
        "programName": "Truckee Donner Public Utility District - Energy Conservation Rebate Program",
        "calculationStatus": "calculable_with_missing_inputs",
        "effectId": "effect_one_time_savings_1_90839d44ee9f3327",
        "effectLabel": "TDPUD residential SMART Level 2 EV charger rebate equals $500 per qualifying charger, not to exceed eligible equipment plus contractor installation cost."
      },
      {
        "inputKey": "certification",
        "opportunityId": "SOURCE_DSIRE:dsire_program_id:1780",
        "programName": "Orlando Utilities Commission - Residential Energy Efficiency Rebate Program",
        "calculationStatus": "calculable_with_missing_inputs",
        "effectId": "effect_one_time_savings_1_0b0035e7671a85c6",
        "effectLabel": "Use the OUC residential rebate table. Heat pump water heaters receive $500. Solar thermal water heaters are reimbursed at 100% of eligible cost up to $900. H..."
      },
      {
        "inputKey": "qualified_product",
        "opportunityId": "SOURCE_DSIRE:dsire_program_id:4639",
        "programName": "Avista Utilities (Electric) - Commercial Energy Efficiency Incentives Program",
        "calculationStatus": "calculable_with_missing_inputs",
        "effectId": "effect_one_time_savings_1_e5f6014279212ff0",
        "effectLabel": "For published instant or standard business measures, multiply the applicable rate by the qualifying unit count or use the fixed table amount. Green Motors re..."
      },
      {
        "inputKey": "existing_heating_system",
        "opportunityId": "SOURCE_DSIRE:dsire_program_id:3135",
        "programName": "Idaho Power - Residential Energy Efficiency Rebate Programs",
        "calculationStatus": "calculable_with_missing_inputs",
        "effectId": "effect_one_time_savings_1_36629a10d961a613",
        "effectLabel": "Selected Idaho Power residential measures pay fixed amounts: smart thermostat $50, heat pump water heater $300 and duct sealing $200. Other heating and cooli..."
      },
      {
        "inputKey": "audit_participation",
        "opportunityId": "SOURCE_DSIRE:dsire_program_id:3135",
        "programName": "Idaho Power - Residential Energy Efficiency Rebate Programs",
        "calculationStatus": "calculable_with_missing_inputs",
        "effectId": "effect_one_time_savings_1_36629a10d961a613",
        "effectLabel": "Selected Idaho Power residential measures pay fixed amounts: smart thermostat $50, heat pump water heater $300 and duct sealing $200. Other heating and cooli..."
      },
      {
        "inputKey": "participating_utility_confirmation",
        "opportunityId": "SOURCE_DSIRE:dsire_program_id:2534",
        "programName": "Fairmont Public Utilities - Residential Energy Efficiency Rebate Program",
        "calculationStatus": "calculable_with_missing_inputs",
        "effectId": "effect_one_time_savings_1_8e5faa4c6f74888b",
        "effectLabel": "For participating Bright Energy Solutions municipal utilities, a Wi-Fi-enabled ChargePoint Home Flex connected to the local utility receives $500; a differen..."
      },
      {
        "inputKey": "led_watts",
        "opportunityId": "SOURCE_DSIRE:dsire_program_id:22130",
        "programName": "Minnesota Power - Business Rebates & Savings",
        "calculationStatus": "calculable_with_missing_inputs",
        "effectId": "effect_one_time_savings_1_f51f43bda0b69af6",
        "effectLabel": "Use Minnesota Power's 2026 business catalog. Lighting includes fixed lamp amounts and per-LED-watt rates; HVAC, appliance and foodservice measures use fixed ..."
      },
      {
        "inputKey": "uef",
        "opportunityId": "SOURCE_DSIRE:dsire_program_id:4822",
        "programName": "Unitil (Gas) - Residential Energy Efficiency Program",
        "calculationStatus": "calculable_with_missing_inputs",
        "effectId": "effect_one_time_savings_1_328ac6d4baa85913",
        "effectLabel": "Select Unitil/NHSaves gas row; rebate is listed amount but cannot exceed cost and applicable 50% caps. Weatherization uses Home Energy Performance rules."
      },
      {
        "inputKey": "enhanced_eligibility",
        "opportunityId": "SOURCE_DSIRE:dsire_program_id:3025",
        "programName": "National Grid (Electric) - Residential Energy Efficiency Incentive Program",
        "calculationStatus": "calculable_with_missing_inputs",
        "effectId": "effect_one_time_savings_1_ba26d94bad9098b2",
        "effectLabel": "Select electric residential measure row; apply per-ton heat pump rates or up-to caps for HPWH and thermostat subject to product and pathway requirements."
      },
      {
        "inputKey": "mbh",
        "opportunityId": "SOURCE_DSIRE:dsire_program_id:5713",
        "programName": "Washington Gas - Commercial Efficiency Rebate Program",
        "calculationStatus": "calculable_with_missing_inputs",
        "effectId": "effect_one_time_savings_1_7d17abb9dc5f28fb",
        "effectLabel": "All projects require preapproval; after approval select natural-gas business row and multiply by units, MBH, HP, feet, or laundry pounds."
      },
      {
        "inputKey": "pressure_class",
        "opportunityId": "SOURCE_DSIRE:dsire_program_id:5713",
        "programName": "Washington Gas - Commercial Efficiency Rebate Program",
        "calculationStatus": "calculable_with_missing_inputs",
        "effectId": "effect_one_time_savings_1_7d17abb9dc5f28fb",
        "effectLabel": "All projects require preapproval; after approval select natural-gas business row and multiply by units, MBH, HP, feet, or laundry pounds."
      },
      {
        "inputKey": "manual_j_or_ahri_documentation",
        "opportunityId": "SOURCE_DSIRE:dsire_program_id:3579",
        "programName": "Southwest Electric Cooperative - Energy Efficiency Rebate Program",
        "calculationStatus": "calculable_with_missing_inputs",
        "effectId": "effect_one_time_savings_1_98c65371308e5ef6",
        "effectLabel": "For eligible members, apply the heat pump, geothermal, HPWH or foundation-insulation rate. Rebates generally may not exceed 50% of total cost unless the meas..."
      },
      {
        "inputKey": "audit_requested",
        "opportunityId": "SOURCE_DSIRE:dsire_program_id:3579",
        "programName": "Southwest Electric Cooperative - Energy Efficiency Rebate Program",
        "calculationStatus": "calculable_with_missing_inputs",
        "effectId": "effect_one_time_savings_1_98c65371308e5ef6",
        "effectLabel": "For eligible members, apply the heat pump, geothermal, HPWH or foundation-insulation rate. Rebates generally may not exceed 50% of total cost unless the meas..."
      },
      {
        "inputKey": "ton_hours",
        "opportunityId": "SOURCE_DSIRE:dsire_program_id:22123",
        "programName": "TVA - Commercial Energy Efficiency Rebate Program",
        "calculationStatus": "calculable_with_missing_inputs",
        "effectId": "effect_one_time_savings_1_d9e9bbf28c9ebc6e",
        "effectLabel": "For TVA-served business customers, apply the selected standard measure rate, fast-track unit amount, custom first-year kWh savings rate, or capped equipment ..."
      }
    ]
  }
}
