You are helping RetroFi repair its v2 incentive-estimate input model.

Current date: 2026-07-02. Treat current program status, rates, and source language as time-sensitive. Use official sources only if you need to verify terminology; this task is primarily data modeling.

## Prompt input_scope_quantity_equipment: scope, quantity, and equipment specifications

Focus on project scope, equipment specs, measure selection, and especially per-unit replacement quantities. The most important output is a clear canonical strategy for unit counts and user overrides.

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
  "promptId": "input_scope_quantity_equipment",
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
  "category": "retrofit_scope_or_equipment_spec",
  "inputKeys": [
    {
      "inputKey": "measure_type",
      "count": 409,
      "observedLabels": [
        "measure type"
      ],
      "observedValueTypes": [
        "text"
      ]
    },
    {
      "inputKey": "unit_count",
      "count": 303,
      "observedLabels": [
        "unit count"
      ],
      "observedValueTypes": [
        "number"
      ]
    },
    {
      "inputKey": "selected_measure",
      "count": 113,
      "observedLabels": [
        "selected measure"
      ],
      "observedValueTypes": [
        "text"
      ]
    },
    {
      "inputKey": "tons",
      "count": 108,
      "observedLabels": [
        "tons"
      ],
      "observedValueTypes": [
        "number"
      ]
    },
    {
      "inputKey": "quantity",
      "count": 87,
      "observedLabels": [
        "quantity"
      ],
      "observedValueTypes": [
        "number"
      ]
    },
    {
      "inputKey": "equipment_type",
      "count": 69,
      "observedLabels": [
        "equipment type"
      ],
      "observedValueTypes": [
        "text"
      ]
    },
    {
      "inputKey": "equipment_tier",
      "count": 57,
      "observedLabels": [
        "equipment tier"
      ],
      "observedValueTypes": [
        "text"
      ]
    },
    {
      "inputKey": "efficiency_tier",
      "count": 51,
      "observedLabels": [
        "efficiency tier"
      ],
      "observedValueTypes": [
        "text"
      ]
    },
    {
      "inputKey": "equipment_efficiency",
      "count": 49,
      "observedLabels": [
        "equipment efficiency"
      ],
      "observedValueTypes": [
        "text"
      ]
    },
    {
      "inputKey": "equipment_specifications",
      "count": 48,
      "observedLabels": [
        "equipment specifications"
      ],
      "observedValueTypes": [
        "text"
      ]
    },
    {
      "inputKey": "square_feet",
      "count": 46,
      "observedLabels": [
        "square feet"
      ],
      "observedValueTypes": [
        "number"
      ]
    },
    {
      "inputKey": "selectedmeasure",
      "count": 44,
      "observedLabels": [
        "selectedMeasure"
      ],
      "observedValueTypes": [
        "text"
      ]
    },
    {
      "inputKey": "charger_count",
      "count": 43,
      "observedLabels": [
        "charger count"
      ],
      "observedValueTypes": [
        "number"
      ]
    },
    {
      "inputKey": "annual_kwh_savings",
      "count": 42,
      "observedLabels": [
        "annual kwh savings",
        "annual kWh savings"
      ],
      "observedValueTypes": [
        "number"
      ]
    },
    {
      "inputKey": "charger_level",
      "count": 40,
      "observedLabels": [
        "charger level"
      ],
      "observedValueTypes": [
        "text"
      ]
    },
    {
      "inputKey": "unitcount",
      "count": 39,
      "observedLabels": [
        "unitCount"
      ],
      "observedValueTypes": [
        "number"
      ]
    },
    {
      "inputKey": "charger_type",
      "count": 35,
      "observedLabels": [
        "charger type"
      ],
      "observedValueTypes": [
        "text"
      ]
    },
    {
      "inputKey": "equipment_quantity",
      "count": 33,
      "observedLabels": [
        "equipment quantity"
      ],
      "observedValueTypes": [
        "number"
      ]
    },
    {
      "inputKey": "seer2",
      "count": 33,
      "observedLabels": [
        "SEER2",
        "seer2"
      ],
      "observedValueTypes": [
        "text"
      ]
    },
    {
      "inputKey": "horsepower",
      "count": 32,
      "observedLabels": [
        "horsepower"
      ],
      "observedValueTypes": [
        "text"
      ]
    },
    {
      "inputKey": "port_count",
      "count": 31,
      "observedLabels": [
        "port count"
      ],
      "observedValueTypes": [
        "number"
      ]
    },
    {
      "inputKey": "thermostat_count",
      "count": 30,
      "observedLabels": [
        "thermostat count"
      ],
      "observedValueTypes": [
        "number"
      ]
    },
    {
      "inputKey": "equipment_cost",
      "count": 28,
      "observedLabels": [
        "equipment cost"
      ],
      "observedValueTypes": [
        "number"
      ]
    },
    {
      "inputKey": "member_account",
      "count": 26,
      "observedLabels": [
        "member account"
      ],
      "observedValueTypes": [
        "number"
      ]
    },
    {
      "inputKey": "linear_feet",
      "count": 23,
      "observedLabels": [
        "linear feet"
      ],
      "observedValueTypes": [
        "number"
      ]
    },
    {
      "inputKey": "measuretype",
      "count": 23,
      "observedLabels": [
        "measureType"
      ],
      "observedValueTypes": [
        "text"
      ]
    },
    {
      "inputKey": "afue",
      "count": 22,
      "observedLabels": [
        "afue",
        "AFUE"
      ],
      "observedValueTypes": [
        "text"
      ]
    },
    {
      "inputKey": "site_type",
      "count": 22,
      "observedLabels": [
        "site type"
      ],
      "observedValueTypes": [
        "text"
      ]
    },
    {
      "inputKey": "heat_pump_type",
      "count": 21,
      "observedLabels": [
        "heat pump type"
      ],
      "observedValueTypes": [
        "text"
      ]
    },
    {
      "inputKey": "project_scope",
      "count": 21,
      "observedLabels": [
        "project scope"
      ],
      "observedValueTypes": [
        "text"
      ]
    },
    {
      "inputKey": "eligible_equipment_cost",
      "count": 20,
      "observedLabels": [
        "eligible equipment cost"
      ],
      "observedValueTypes": [
        "number"
      ]
    },
    {
      "inputKey": "equipmenttier",
      "count": 20,
      "observedLabels": [
        "equipmentTier"
      ],
      "observedValueTypes": [
        "text"
      ]
    },
    {
      "inputKey": "home_type",
      "count": 20,
      "observedLabels": [
        "home type"
      ],
      "observedValueTypes": [
        "text"
      ]
    },
    {
      "inputKey": "hspf2",
      "count": 19,
      "observedLabels": [
        "hspf2",
        "HSPF2"
      ],
      "observedValueTypes": [
        "text"
      ]
    },
    {
      "inputKey": "project_type",
      "count": 19,
      "observedLabels": [
        "project type"
      ],
      "observedValueTypes": [
        "text"
      ]
    },
    {
      "inputKey": "equipment_model",
      "count": 18,
      "observedLabels": [
        "equipment model"
      ],
      "observedValueTypes": [
        "text"
      ]
    },
    {
      "inputKey": "charger_cost",
      "count": 17,
      "observedLabels": [
        "charger cost"
      ],
      "observedValueTypes": [
        "number"
      ]
    },
    {
      "inputKey": "equipment_efficiency_tier",
      "count": 17,
      "observedLabels": [
        "equipment efficiency tier"
      ],
      "observedValueTypes": [
        "text"
      ]
    },
    {
      "inputKey": "tonnage",
      "count": 17,
      "observedLabels": [
        "tonnage"
      ],
      "observedValueTypes": [
        "text"
      ]
    },
    {
      "inputKey": "approved_scope",
      "count": 16,
      "observedLabels": [
        "approved scope"
      ],
      "observedValueTypes": [
        "text"
      ]
    },
    {
      "inputKey": "efficiency_rating",
      "count": 16,
      "observedLabels": [
        "efficiency rating"
      ],
      "observedValueTypes": [
        "text"
      ]
    },
    {
      "inputKey": "equipment_specification",
      "count": 15,
      "observedLabels": [
        "equipment specification"
      ],
      "observedValueTypes": [
        "text"
      ]
    },
    {
      "inputKey": "squarefeet",
      "count": 14,
      "observedLabels": [
        "squareFeet"
      ],
      "observedValueTypes": [
        "number"
      ]
    },
    {
      "inputKey": "vehicle_type",
      "count": 14,
      "observedLabels": [
        "vehicle type"
      ],
      "observedValueTypes": [
        "text"
      ]
    },
    {
      "inputKey": "battery_kwh",
      "count": 13,
      "observedLabels": [
        "battery kwh",
        "battery kWh"
      ],
      "observedValueTypes": [
        "number"
      ]
    },
    {
      "inputKey": "equipmenttype",
      "count": 13,
      "observedLabels": [
        "equipmentType"
      ],
      "observedValueTypes": [
        "text"
      ]
    },
    {
      "inputKey": "fuel_type",
      "count": 13,
      "observedLabels": [
        "fuel type"
      ],
      "observedValueTypes": [
        "text"
      ]
    },
    {
      "inputKey": "equipment_category",
      "count": 12,
      "observedLabels": [
        "equipment category"
      ],
      "observedValueTypes": [
        "text"
      ]
    },
    {
      "inputKey": "measure_category",
      "count": 12,
      "observedLabels": [
        "measure category"
      ],
      "observedValueTypes": [
        "text"
      ]
    },
    {
      "inputKey": "service_type",
      "count": 12,
      "observedLabels": [
        "service type"
      ],
      "observedValueTypes": [
        "text"
      ]
    },
    {
      "inputKey": "tier",
      "count": 12,
      "observedLabels": [
        "tier"
      ],
      "observedValueTypes": [
        "text"
      ]
    },
    {
      "inputKey": "verified_annual_kwh_savings",
      "count": 12,
      "observedLabels": [
        "verified annual kwh savings",
        "verified annual kWh savings"
      ],
      "observedValueTypes": [
        "number"
      ]
    },
    {
      "inputKey": "applicant_type",
      "count": 11,
      "observedLabels": [
        "applicant type"
      ],
      "observedValueTypes": [
        "text"
      ]
    },
    {
      "inputKey": "facility_type",
      "count": 11,
      "observedLabels": [
        "facility type"
      ],
      "observedValueTypes": [
        "text"
      ]
    },
    {
      "inputKey": "system_count",
      "count": 11,
      "observedLabels": [
        "system count"
      ],
      "observedValueTypes": [
        "number"
      ]
    },
    {
      "inputKey": "unit_count_or_tons",
      "count": 11,
      "observedLabels": [
        "unit count or tons"
      ],
      "observedValueTypes": [
        "number"
      ]
    },
    {
      "inputKey": "annual_kwh_savings_for_custom_projects",
      "count": 10,
      "observedLabels": [
        "annual kwh savings for custom projects",
        "annual kWh savings for custom projects"
      ],
      "observedValueTypes": [
        "number"
      ]
    },
    {
      "inputKey": "annual_therm_savings",
      "count": 10,
      "observedLabels": [
        "annual therm savings"
      ],
      "observedValueTypes": [
        "number"
      ]
    },
    {
      "inputKey": "charger_model",
      "count": 10,
      "observedLabels": [
        "charger model"
      ],
      "observedValueTypes": [
        "text"
      ]
    },
    {
      "inputKey": "customer_type",
      "count": 10,
      "observedLabels": [
        "customer type"
      ],
      "observedValueTypes": [
        "text"
      ]
    },
    {
      "inputKey": "estimated_kwh_savings",
      "count": 10,
      "observedLabels": [
        "estimated kwh savings",
        "estimated kWh savings"
      ],
      "observedValueTypes": [
        "number"
      ]
    },
    {
      "inputKey": "income_tier",
      "count": 10,
      "observedLabels": [
        "income tier"
      ],
      "observedValueTypes": [
        "text"
      ]
    },
    {
      "inputKey": "measure_selection",
      "count": 10,
      "observedLabels": [
        "measure selection"
      ],
      "observedValueTypes": [
        "text"
      ]
    },
    {
      "inputKey": "quantity_or_size",
      "count": 10,
      "observedLabels": [
        "quantity or size"
      ],
      "observedValueTypes": [
        "number"
      ]
    },
    {
      "inputKey": "system_type",
      "count": 10,
      "observedLabels": [
        "system type"
      ],
      "observedValueTypes": [
        "text"
      ]
    },
    {
      "inputKey": "unit_count_or_square_feet",
      "count": 10,
      "observedLabels": [
        "unit count or square feet"
      ],
      "observedValueTypes": [
        "number"
      ]
    },
    {
      "inputKey": "utility_account",
      "count": 10,
      "observedLabels": [
        "utility account"
      ],
      "observedValueTypes": [
        "number"
      ]
    },
    {
      "inputKey": "baseline_equipment",
      "count": 9,
      "observedLabels": [
        "baseline equipment"
      ],
      "observedValueTypes": [
        "text"
      ]
    },
    {
      "inputKey": "building_type",
      "count": 9,
      "observedLabels": [
        "building type"
      ],
      "observedValueTypes": [
        "text"
      ]
    },
    {
      "inputKey": "eligible_unit_count",
      "count": 9,
      "observedLabels": [
        "eligible unit count"
      ],
      "observedValueTypes": [
        "number"
      ]
    },
    {
      "inputKey": "equipment_size",
      "count": 9,
      "observedLabels": [
        "equipment size"
      ],
      "observedValueTypes": [
        "text"
      ]
    },
    {
      "inputKey": "kw_reduction",
      "count": 9,
      "observedLabels": [
        "kw reduction",
        "kW reduction"
      ],
      "observedValueTypes": [
        "number"
      ]
    },
    {
      "inputKey": "first_year_kwh_savings",
      "count": 8,
      "observedLabels": [
        "first year kWh savings",
        "first-year kWh savings"
      ],
      "observedValueTypes": [
        "number"
      ]
    },
    {
      "inputKey": "indoor_head_count",
      "count": 8,
      "observedLabels": [
        "indoor head count"
      ],
      "observedValueTypes": [
        "number"
      ]
    },
    {
      "inputKey": "measure_life",
      "count": 8,
      "observedLabels": [
        "measure life"
      ],
      "observedValueTypes": [
        "text"
      ]
    },
    {
      "inputKey": "measure_quantity",
      "count": 8,
      "observedLabels": [
        "measure quantity"
      ],
      "observedValueTypes": [
        "number"
      ]
    },
    {
      "inputKey": "qualified_level_2_charger",
      "count": 8,
      "observedLabels": [
        "qualified level 2 charger"
      ],
      "observedValueTypes": [
        "text"
      ]
    },
    {
      "inputKey": "replacement_fuel",
      "count": 8,
      "observedLabels": [
        "replacement fuel"
      ],
      "observedValueTypes": [
        "text"
      ]
    },
    {
      "inputKey": "verified_kwh_savings",
      "count": 8,
      "observedLabels": [
        "verified kWh savings"
      ],
      "observedValueTypes": [
        "number"
      ]
    },
    {
      "inputKey": "approved_measure_scope",
      "count": 7,
      "observedLabels": [
        "approved measure scope"
      ],
      "observedValueTypes": [
        "text"
      ]
    },
    {
      "inputKey": "charger_power_kw",
      "count": 7,
      "observedLabels": [
        "charger power kw",
        "charger power kW"
      ],
      "observedValueTypes": [
        "number"
      ]
    },
    {
      "inputKey": "customer_utility_account",
      "count": 7,
      "observedLabels": [
        "customer utility account"
      ],
      "observedValueTypes": [
        "number"
      ]
    },
    {
      "inputKey": "eer",
      "count": 7,
      "observedLabels": [
        "EER"
      ],
      "observedValueTypes": [
        "text"
      ]
    },
    {
      "inputKey": "fixture_count",
      "count": 7,
      "observedLabels": [
        "fixture count"
      ],
      "observedValueTypes": [
        "number"
      ]
    },
    {
      "inputKey": "heat_pump_tons",
      "count": 7,
      "observedLabels": [
        "heat pump tons"
      ],
      "observedValueTypes": [
        "number"
      ]
    },
    {
      "inputKey": "kw_saved",
      "count": 7,
      "observedLabels": [
        "kW saved",
        "kw saved"
      ],
      "observedValueTypes": [
        "number"
      ]
    },
    {
      "inputKey": "kwh_savings",
      "count": 7,
      "observedLabels": [
        "kwh savings",
        "kWh savings"
      ],
      "observedValueTypes": [
        "number"
      ]
    },
    {
      "inputKey": "property_type",
      "count": 7,
      "observedLabels": [
        "property type"
      ],
      "observedValueTypes": [
        "text"
      ]
    },
    {
      "inputKey": "proposed_equipment",
      "count": 7,
      "observedLabels": [
        "proposed equipment"
      ],
      "observedValueTypes": [
        "text"
      ]
    },
    {
      "inputKey": "qualifying_model",
      "count": 7,
      "observedLabels": [
        "qualifying model"
      ],
      "observedValueTypes": [
        "text"
      ]
    },
    {
      "inputKey": "quantity_or_equipment_size",
      "count": 7,
      "observedLabels": [
        "quantity or equipment size"
      ],
      "observedValueTypes": [
        "number"
      ]
    },
    {
      "inputKey": "study_scope",
      "count": 7,
      "observedLabels": [
        "study scope"
      ],
      "observedValueTypes": [
        "text"
      ]
    },
    {
      "inputKey": "tank_gallons",
      "count": 7,
      "observedLabels": [
        "tank gallons"
      ],
      "observedValueTypes": [
        "text"
      ]
    },
    {
      "inputKey": "verified_annual_therm_savings",
      "count": 7,
      "observedLabels": [
        "verified annual therm savings"
      ],
      "observedValueTypes": [
        "number"
      ]
    },
    {
      "inputKey": "annual_kwh_saved",
      "count": 6,
      "observedLabels": [
        "annual kWh saved",
        "annual kwh saved"
      ],
      "observedValueTypes": [
        "number"
      ]
    },
    {
      "inputKey": "building_square_feet",
      "count": 6,
      "observedLabels": [
        "building square feet"
      ],
      "observedValueTypes": [
        "number"
      ]
    },
    {
      "inputKey": "construction_type",
      "count": 6,
      "observedLabels": [
        "construction type"
      ],
      "observedValueTypes": [
        "text"
      ]
    },
    {
      "inputKey": "dwelling_type",
      "count": 6,
      "observedLabels": [
        "dwelling type"
      ],
      "observedValueTypes": [
        "text"
      ]
    },
    {
      "inputKey": "efficiency_ratings",
      "count": 6,
      "observedLabels": [
        "efficiency ratings"
      ],
      "observedValueTypes": [
        "text"
      ]
    },
    {
      "inputKey": "eligible_measure_cost",
      "count": 6,
      "observedLabels": [
        "eligible measure cost"
      ],
      "observedValueTypes": [
        "number"
      ]
    },
    {
      "inputKey": "enrolled_ev_count",
      "count": 6,
      "observedLabels": [
        "enrolled ev count"
      ],
      "observedValueTypes": [
        "number"
      ]
    },
    {
      "inputKey": "equipment_qualification",
      "count": 6,
      "observedLabels": [
        "equipment qualification"
      ],
      "observedValueTypes": [
        "text"
      ]
    },
    {
      "inputKey": "estimated_therm_savings",
      "count": 6,
      "observedLabels": [
        "estimated therm savings"
      ],
      "observedValueTypes": [
        "number"
      ]
    },
    {
      "inputKey": "ev_charging_kwh",
      "count": 6,
      "observedLabels": [
        "EV charging kWh"
      ],
      "observedValueTypes": [
        "number"
      ]
    },
    {
      "inputKey": "existing_heating_fuel",
      "count": 6,
      "observedLabels": [
        "existing heating fuel"
      ],
      "observedValueTypes": [
        "text"
      ]
    },
    {
      "inputKey": "qualifying_smart_thermostat",
      "count": 6,
      "observedLabels": [
        "qualifying smart thermostat"
      ],
      "observedValueTypes": [
        "number"
      ]
    },
    {
      "inputKey": "seer",
      "count": 6,
      "observedLabels": [
        "SEER"
      ],
      "observedValueTypes": [
        "text"
      ]
    },
    {
      "inputKey": "thermostat_program_enrollment",
      "count": 6,
      "observedLabels": [
        "thermostat program enrollment"
      ],
      "observedValueTypes": [
        "number"
      ]
    },
    {
      "inputKey": "annualkwhsavings",
      "count": 5,
      "observedLabels": [
        "annualKWhSavings"
      ],
      "observedValueTypes": [
        "number"
      ]
    },
    {
      "inputKey": "appliance_type",
      "count": 5,
      "observedLabels": [
        "appliance type"
      ],
      "observedValueTypes": [
        "text"
      ]
    },
    {
      "inputKey": "building_size",
      "count": 5,
      "observedLabels": [
        "building size"
      ],
      "observedValueTypes": [
        "text"
      ]
    },
    {
      "inputKey": "capacity_or_unit_count",
      "count": 5,
      "observedLabels": [
        "capacity or unit count"
      ],
      "observedValueTypes": [
        "number"
      ]
    },
    {
      "inputKey": "charger_kw",
      "count": 5,
      "observedLabels": [
        "charger kW",
        "charger kw"
      ],
      "observedValueTypes": [
        "number"
      ]
    },
    {
      "inputKey": "device_type",
      "count": 5,
      "observedLabels": [
        "device type"
      ],
      "observedValueTypes": [
        "text"
      ]
    },
    {
      "inputKey": "door_count",
      "count": 5,
      "observedLabels": [
        "door count"
      ],
      "observedValueTypes": [
        "number"
      ]
    },
    {
      "inputKey": "efficiencytier",
      "count": 5,
      "observedLabels": [
        "efficiencyTier"
      ],
      "observedValueTypes": [
        "text"
      ]
    },
    {
      "inputKey": "eligible_project_scope",
      "count": 5,
      "observedLabels": [
        "eligible project scope"
      ],
      "observedValueTypes": [
        "text"
      ]
    },
    {
      "inputKey": "eligible_smart_thermostat",
      "count": 5,
      "observedLabels": [
        "eligible smart thermostat"
      ],
      "observedValueTypes": [
        "number"
      ]
    },
    {
      "inputKey": "equipmentspecifications",
      "count": 5,
      "observedLabels": [
        "equipmentSpecifications"
      ],
      "observedValueTypes": [
        "text"
      ]
    },
    {
      "inputKey": "ev_charger_type",
      "count": 5,
      "observedLabels": [
        "EV charger type"
      ],
      "observedValueTypes": [
        "text"
      ]
    },
    {
      "inputKey": "existing_equipment",
      "count": 5,
      "observedLabels": [
        "existing equipment"
      ],
      "observedValueTypes": [
        "text"
      ]
    },
    {
      "inputKey": "existing_heating_type",
      "count": 5,
      "observedLabels": [
        "existing heating type"
      ],
      "observedValueTypes": [
        "text"
      ]
    },
    {
      "inputKey": "fixture_type",
      "count": 5,
      "observedLabels": [
        "fixture type"
      ],
      "observedValueTypes": [
        "text"
      ]
    },
    {
      "inputKey": "furnace_count",
      "count": 5,
      "observedLabels": [
        "furnace count"
      ],
      "observedValueTypes": [
        "number"
      ]
    },
    {
      "inputKey": "heating_fuel",
      "count": 5,
      "observedLabels": [
        "heating fuel"
      ],
      "observedValueTypes": [
        "text"
      ]
    },
    {
      "inputKey": "inspection",
      "count": 5,
      "observedLabels": [
        "inspection"
      ],
      "observedValueTypes": [
        "text"
      ]
    },
    {
      "inputKey": "inspection_status",
      "count": 5,
      "observedLabels": [
        "inspection status"
      ],
      "observedValueTypes": [
        "text"
      ]
    },
    {
      "inputKey": "installation_type",
      "count": 5,
      "observedLabels": [
        "installation type"
      ],
      "observedValueTypes": [
        "text"
      ]
    },
    {
      "inputKey": "level_2_port_count",
      "count": 5,
      "observedLabels": [
        "level 2 port count"
      ],
      "observedValueTypes": [
        "number"
      ]
    },
    {
      "inputKey": "measure_scope",
      "count": 5,
      "observedLabels": [
        "measure scope"
      ],
      "observedValueTypes": [
        "text"
      ]
    },
    {
      "inputKey": "model_number",
      "count": 5,
      "observedLabels": [
        "model number"
      ],
      "observedValueTypes": [
        "text"
      ]
    },
    {
      "inputKey": "number_of_units",
      "count": 5,
      "observedLabels": [
        "number of units"
      ],
      "observedValueTypes": [
        "text"
      ]
    },
    {
      "inputKey": "portcount",
      "count": 5,
      "observedLabels": [
        "portCount"
      ],
      "observedValueTypes": [
        "number"
      ]
    },
    {
      "inputKey": "projecttype",
      "count": 5,
      "observedLabels": [
        "projectType"
      ],
      "observedValueTypes": [
        "text"
      ]
    },
    {
      "inputKey": "replacement_type",
      "count": 5,
      "observedLabels": [
        "replacement type"
      ],
      "observedValueTypes": [
        "text"
      ]
    },
    {
      "inputKey": "residential_account",
      "count": 5,
      "observedLabels": [
        "residential account"
      ],
      "observedValueTypes": [
        "number"
      ]
    },
    {
      "inputKey": "thermostat_cost",
      "count": 5,
      "observedLabels": [
        "thermostat cost"
      ],
      "observedValueTypes": [
        "number"
      ]
    },
    {
      "inputKey": "thermostatcount",
      "count": 5,
      "observedLabels": [
        "thermostatCount"
      ],
      "observedValueTypes": [
        "number"
      ]
    },
    {
      "inputKey": "window_square_feet",
      "count": 5,
      "observedLabels": [
        "window square feet"
      ],
      "observedValueTypes": [
        "number"
      ]
    },
    {
      "inputKey": "agency_scope",
      "count": 4,
      "observedLabels": [
        "agency scope"
      ],
      "observedValueTypes": [
        "text"
      ]
    },
    {
      "inputKey": "annual_kwh_savings_for_custom_measures",
      "count": 4,
      "observedLabels": [
        "annual kwh savings for custom measures",
        "annual kWh savings for custom measures"
      ],
      "observedValueTypes": [
        "number"
      ]
    },
    {
      "inputKey": "annual_kwh_savings_if_custom",
      "count": 4,
      "observedLabels": [
        "annual kwh savings if custom",
        "annual kWh savings if custom"
      ],
      "observedValueTypes": [
        "number"
      ]
    },
    {
      "inputKey": "annual_operating_hours",
      "count": 4,
      "observedLabels": [
        "annual operating hours"
      ],
      "observedValueTypes": [
        "text"
      ]
    },
    {
      "inputKey": "approved_annual_kwh_savings",
      "count": 4,
      "observedLabels": [
        "approved annual kwh savings",
        "approved annual kWh savings"
      ],
      "observedValueTypes": [
        "number"
      ]
    },
    {
      "inputKey": "assembly_type",
      "count": 4,
      "observedLabels": [
        "assembly type"
      ],
      "observedValueTypes": [
        "text"
      ]
    },
    {
      "inputKey": "assessment_scope",
      "count": 4,
      "observedLabels": [
        "assessment scope"
      ],
      "observedValueTypes": [
        "text"
      ]
    },
    {
      "inputKey": "battery_capacity_kwh",
      "count": 4,
      "observedLabels": [
        "battery capacity kWh",
        "battery capacity kwh"
      ],
      "observedValueTypes": [
        "number"
      ]
    },
    {
      "inputKey": "charger_type_if_ev",
      "count": 4,
      "observedLabels": [
        "charger type if EV",
        "charger type if ev"
      ],
      "observedValueTypes": [
        "text"
      ]
    },
    {
      "inputKey": "community_action_agency_project_scope",
      "count": 4,
      "observedLabels": [
        "community action agency project scope"
      ],
      "observedValueTypes": [
        "text"
      ]
    },
    {
      "inputKey": "control_type",
      "count": 4,
      "observedLabels": [
        "control type"
      ],
      "observedValueTypes": [
        "text"
      ]
    },
    {
      "inputKey": "conversion_type",
      "count": 4,
      "observedLabels": [
        "conversion type"
      ],
      "observedValueTypes": [
        "text"
      ]
    },
    {
      "inputKey": "counterfactual_interest_rate",
      "count": 4,
      "observedLabels": [
        "counterfactual interest rate"
      ],
      "observedValueTypes": [
        "number"
      ]
    },
    {
      "inputKey": "customer_account",
      "count": 4,
      "observedLabels": [
        "customer account"
      ],
      "observedValueTypes": [
        "number"
      ]
    },
    {
      "inputKey": "disadvantaged_community_status",
      "count": 4,
      "observedLabels": [
        "disadvantaged community status",
        "disadvantaged-community status"
      ],
      "observedValueTypes": [
        "text"
      ]
    },
    {
      "inputKey": "dual_fuel_status",
      "count": 4,
      "observedLabels": [
        "dual fuel status"
      ],
      "observedValueTypes": [
        "text"
      ]
    },
    {
      "inputKey": "eligible_motor_horsepower",
      "count": 4,
      "observedLabels": [
        "eligible motor horsepower"
      ],
      "observedValueTypes": [
        "text"
      ]
    },
    {
      "inputKey": "eligible_port_count",
      "count": 4,
      "observedLabels": [
        "eligible port count"
      ],
      "observedValueTypes": [
        "number"
      ]
    },
    {
      "inputKey": "eligible_quantity",
      "count": 4,
      "observedLabels": [
        "eligible quantity"
      ],
      "observedValueTypes": [
        "number"
      ]
    },
    {
      "inputKey": "equipment_capacity",
      "count": 4,
      "observedLabels": [
        "equipment capacity"
      ],
      "observedValueTypes": [
        "text"
      ]
    },
    {
      "inputKey": "equipment_cost_cents",
      "count": 4,
      "observedLabels": [
        "equipment cost cents"
      ],
      "observedValueTypes": [
        "number"
      ]
    },
    {
      "inputKey": "equipment_specs",
      "count": 4,
      "observedLabels": [
        "equipment specs"
      ],
      "observedValueTypes": [
        "text"
      ]
    },
    {
      "inputKey": "existing_fuel",
      "count": 4,
      "observedLabels": [
        "existing fuel"
      ],
      "observedValueTypes": [
        "text"
      ]
    },
    {
      "inputKey": "existing_heat_type",
      "count": 4,
      "observedLabels": [
        "existing heat type"
      ],
      "observedValueTypes": [
        "text"
      ]
    },
    {
      "inputKey": "existingequipmenttype",
      "count": 4,
      "observedLabels": [
        "existingEquipmentType"
      ],
      "observedValueTypes": [
        "text"
      ]
    },
    {
      "inputKey": "first_year_kwh_saved",
      "count": 4,
      "observedLabels": [
        "first year kwh saved"
      ],
      "observedValueTypes": [
        "number"
      ]
    },
    {
      "inputKey": "furnace_afue",
      "count": 4,
      "observedLabels": [
        "furnace afue",
        "furnace AFUE"
      ],
      "observedValueTypes": [
        "text"
      ]
    },
    {
      "inputKey": "geothermal_status",
      "count": 4,
      "observedLabels": [
        "geothermal status"
      ],
      "observedValueTypes": [
        "number"
      ]
    },
    {
      "inputKey": "heat_pump_tonnage",
      "count": 4,
      "observedLabels": [
        "heat pump tonnage",
        "heat-pump tonnage"
      ],
      "observedValueTypes": [
        "text"
      ]
    },
    {
      "inputKey": "hspf",
      "count": 4,
      "observedLabels": [
        "HSPF"
      ],
      "observedValueTypes": [
        "text"
      ]
    },
    {
      "inputKey": "inspectiondocumentation",
      "count": 4,
      "observedLabels": [
        "inspectionDocumentation"
      ],
      "observedValueTypes": [
        "text"
      ]
    },
    {
      "inputKey": "insulated_square_feet",
      "count": 4,
      "observedLabels": [
        "insulated square feet"
      ],
      "observedValueTypes": [
        "number"
      ]
    },
    {
      "inputKey": "insulation_square_feet",
      "count": 4,
      "observedLabels": [
        "insulation square feet"
      ],
      "observedValueTypes": [
        "number"
      ]
    },
    {
      "inputKey": "minimum_two_ports",
      "count": 4,
      "observedLabels": [
        "minimum two ports"
      ],
      "observedValueTypes": [
        "text"
      ]
    },
    {
      "inputKey": "number_of_ports",
      "count": 4,
      "observedLabels": [
        "number of ports"
      ],
      "observedValueTypes": [
        "text"
      ]
    },
    {
      "inputKey": "outdoor_unit_count",
      "count": 4,
      "observedLabels": [
        "outdoor unit count"
      ],
      "observedValueTypes": [
        "number"
      ]
    },
    {
      "inputKey": "product_type",
      "count": 4,
      "observedLabels": [
        "product type"
      ],
      "observedValueTypes": [
        "text"
      ]
    },
    {
      "inputKey": "qualifying_vehicle_count",
      "count": 4,
      "observedLabels": [
        "qualifying vehicle count"
      ],
      "observedValueTypes": [
        "number"
      ]
    },
    {
      "inputKey": "serial_number",
      "count": 4,
      "observedLabels": [
        "serial number"
      ],
      "observedValueTypes": [
        "text"
      ]
    },
    {
      "inputKey": "size_or_savings",
      "count": 4,
      "observedLabels": [
        "size or savings"
      ],
      "observedValueTypes": [
        "text"
      ]
    },
    {
      "inputKey": "steam_trap_count",
      "count": 4,
      "observedLabels": [
        "steam trap count"
      ],
      "observedValueTypes": [
        "number"
      ]
    },
    {
      "inputKey": "system_tonnage",
      "count": 4,
      "observedLabels": [
        "system tonnage"
      ],
      "observedValueTypes": [
        "text"
      ]
    },
    {
      "inputKey": "technical_assistance_scope",
      "count": 4,
      "observedLabels": [
        "technical assistance scope"
      ],
      "observedValueTypes": [
        "text"
      ]
    },
    {
      "inputKey": "technology_type",
      "count": 4,
      "observedLabels": [
        "technology type"
      ],
      "observedValueTypes": [
        "text"
      ]
    },
    {
      "inputKey": "thermostat_tier",
      "count": 4,
      "observedLabels": [
        "thermostat tier"
      ],
      "observedValueTypes": [
        "number"
      ]
    },
    {
      "inputKey": "tons_for_geothermal",
      "count": 4,
      "observedLabels": [
        "tons for geothermal"
      ],
      "observedValueTypes": [
        "number"
      ]
    },
    {
      "inputKey": "tons_or_unit_count",
      "count": 4,
      "observedLabels": [
        "tons or unit count"
      ],
      "observedValueTypes": [
        "number"
      ]
    },
    {
      "inputKey": "total_measure_cost",
      "count": 4,
      "observedLabels": [
        "total measure cost"
      ],
      "observedValueTypes": [
        "number"
      ]
    },
    {
      "inputKey": "unit_count_or_heating_tons",
      "count": 4,
      "observedLabels": [
        "unit count or heating tons"
      ],
      "observedValueTypes": [
        "number"
      ]
    },
    {
      "inputKey": "vec_member_account",
      "count": 4,
      "observedLabels": [
        "VEC member account"
      ],
      "observedValueTypes": [
        "number"
      ]
    },
    {
      "inputKey": "water_heater_gallons",
      "count": 4,
      "observedLabels": [
        "water heater gallons"
      ],
      "observedValueTypes": [
        "text"
      ]
    },
    {
      "inputKey": "accounteligibility",
      "count": 3,
      "observedLabels": [
        "accountEligibility"
      ],
      "observedValueTypes": [
        "number"
      ]
    },
    {
      "inputKey": "aesresidentialaccount",
      "count": 3,
      "observedLabels": [
        "AESResidentialAccount"
      ],
      "observedValueTypes": [
        "number"
      ]
    },
    {
      "inputKey": "annual_usage_kwh",
      "count": 3,
      "observedLabels": [
        "annual usage kwh"
      ],
      "observedValueTypes": [
        "number"
      ]
    },
    {
      "inputKey": "applicationportalresult",
      "count": 3,
      "observedLabels": [
        "applicationPortalResult"
      ],
      "observedValueTypes": [
        "text"
      ]
    },
    {
      "inputKey": "approved_equipment_status",
      "count": 3,
      "observedLabels": [
        "approved equipment status"
      ],
      "observedValueTypes": [
        "text"
      ]
    },
    {
      "inputKey": "approved_measure",
      "count": 3,
      "observedLabels": [
        "approved measure"
      ],
      "observedValueTypes": [
        "text"
      ]
    },
    {
      "inputKey": "approved_measure_proposal",
      "count": 3,
      "observedLabels": [
        "approved measure proposal"
      ],
      "observedValueTypes": [
        "text"
      ]
    },
    {
      "inputKey": "audit_scope",
      "count": 3,
      "observedLabels": [
        "audit scope"
      ],
      "observedValueTypes": [
        "text"
      ]
    },
    {
      "inputKey": "audit_type",
      "count": 3,
      "observedLabels": [
        "audit type"
      ],
      "observedValueTypes": [
        "text"
      ]
    },
    {
      "inputKey": "backup_heat_type",
      "count": 3,
      "observedLabels": [
        "backup heat type"
      ],
      "observedValueTypes": [
        "text"
      ]
    },
    {
      "inputKey": "belmont_light_account",
      "count": 3,
      "observedLabels": [
        "belmont light account"
      ],
      "observedValueTypes": [
        "number"
      ]
    },
    {
      "inputKey": "biogas_or_biomass_project_type",
      "count": 3,
      "observedLabels": [
        "biogas or biomass project type"
      ],
      "observedValueTypes": [
        "text"
      ]
    },
    {
      "inputKey": "blower_door_test_for_air_sealing",
      "count": 3,
      "observedLabels": [
        "blower door test for air sealing"
      ],
      "observedValueTypes": [
        "text"
      ]
    },
    {
      "inputKey": "capacity_in_tons_or_unit_count",
      "count": 3,
      "observedLabels": [
        "capacity in tons or unit count"
      ],
      "observedValueTypes": [
        "number"
      ]
    },
    {
      "inputKey": "ceda_custom_energy_report",
      "count": 3,
      "observedLabels": [
        "CEDA custom energy report"
      ],
      "observedValueTypes": [
        "text"
      ]
    },
    {
      "inputKey": "charger_connected_to_gmp",
      "count": 3,
      "observedLabels": [
        "charger connected to gmp"
      ],
      "observedValueTypes": [
        "text"
      ]
    },
    {
      "inputKey": "charger_or_outlet_type",
      "count": 3,
      "observedLabels": [
        "charger or outlet type"
      ],
      "observedValueTypes": [
        "text"
      ]
    },
    {
      "inputKey": "charger_output_kw",
      "count": 3,
      "observedLabels": [
        "charger output kw"
      ],
      "observedValueTypes": [
        "number"
      ]
    },
    {
      "inputKey": "chargerpowerlevelkw",
      "count": 3,
      "observedLabels": [
        "chargerPowerLevelKW"
      ],
      "observedValueTypes": [
        "number"
      ]
    },
    {
      "inputKey": "charging_time_window",
      "count": 3,
      "observedLabels": [
        "charging time window"
      ],
      "observedValueTypes": [
        "text"
      ]
    },
    {
      "inputKey": "chargingwindowcompliance",
      "count": 3,
      "observedLabels": [
        "chargingWindowCompliance"
      ],
      "observedValueTypes": [
        "text"
      ]
    },
    {
      "inputKey": "commercial_account",
      "count": 3,
      "observedLabels": [
        "commercial account"
      ],
      "observedValueTypes": [
        "number"
      ]
    },
    {
      "inputKey": "commercial_account_status",
      "count": 3,
      "observedLabels": [
        "commercial account status"
      ],
      "observedValueTypes": [
        "number"
      ]
    },
    {
      "inputKey": "conditioned_square_feet",
      "count": 3,
      "observedLabels": [
        "conditioned square feet"
      ],
      "observedValueTypes": [
        "number"
      ]
    },
    {
      "inputKey": "connected_control_kw",
      "count": 3,
      "observedLabels": [
        "connected control kW"
      ],
      "observedValueTypes": [
        "number"
      ]
    },
    {
      "inputKey": "controlled_fan_count",
      "count": 3,
      "observedLabels": [
        "controlled fan count"
      ],
      "observedValueTypes": [
        "number"
      ]
    },
    {
      "inputKey": "controlretrofittype",
      "count": 3,
      "observedLabels": [
        "controlRetrofitType"
      ],
      "observedValueTypes": [
        "text"
      ]
    },
    {
      "inputKey": "cooling_btu",
      "count": 3,
      "observedLabels": [
        "cooling BTU"
      ],
      "observedValueTypes": [
        "text"
      ]
    },
    {
      "inputKey": "cooling_tons",
      "count": 3,
      "observedLabels": [
        "cooling tons"
      ],
      "observedValueTypes": [
        "number"
      ]
    },
    {
      "inputKey": "cow_count",
      "count": 3,
      "observedLabels": [
        "cow count"
      ],
      "observedValueTypes": [
        "number"
      ]
    },
    {
      "inputKey": "cow_count_or_horsepower",
      "count": 3,
      "observedLabels": [
        "cow count or horsepower"
      ],
      "observedValueTypes": [
        "number"
      ]
    },
    {
      "inputKey": "custom_project_scope",
      "count": 3,
      "observedLabels": [
        "custom project scope"
      ],
      "observedValueTypes": [
        "text"
      ]
    },
    {
      "inputKey": "customeraccountidentifier",
      "count": 3,
      "observedLabels": [
        "customerAccountIdentifier"
      ],
      "observedValueTypes": [
        "number"
      ]
    },
    {
      "inputKey": "dairy_measure_type",
      "count": 3,
      "observedLabels": [
        "dairy measure type"
      ],
      "observedValueTypes": [
        "text"
      ]
    },
    {
      "inputKey": "dcfc_power_kw",
      "count": 3,
      "observedLabels": [
        "DCFC power kw"
      ],
      "observedValueTypes": [
        "number"
      ]
    },
    {
      "inputKey": "device_count",
      "count": 3,
      "observedLabels": [
        "device count"
      ],
      "observedValueTypes": [
        "number"
      ]
    },
    {
      "inputKey": "disadvantagedcommunitystatus",
      "count": 3,
      "observedLabels": [
        "disadvantagedCommunityStatus"
      ],
      "observedValueTypes": [
        "text"
      ]
    },
    {
      "inputKey": "discount_charging_rate_enrollment",
      "count": 3,
      "observedLabels": [
        "discount charging rate enrollment"
      ],
      "observedValueTypes": [
        "number"
      ]
    },
    {
      "inputKey": "dual_fuel_equipment",
      "count": 3,
      "observedLabels": [
        "dual-fuel equipment"
      ],
      "observedValueTypes": [
        "text"
      ]
    },
    {
      "inputKey": "dukeoperatingcompany",
      "count": 3,
      "observedLabels": [
        "DukeOperatingCompany"
      ],
      "observedValueTypes": [
        "text"
      ]
    },
    {
      "inputKey": "dwelling_unit_count",
      "count": 3,
      "observedLabels": [
        "dwelling unit count"
      ],
      "observedValueTypes": [
        "number"
      ]
    },
    {
      "inputKey": "efficiency_level",
      "count": 3,
      "observedLabels": [
        "efficiency level"
      ],
      "observedValueTypes": [
        "text"
      ]
    },
    {
      "inputKey": "efficiencydocumentation",
      "count": 3,
      "observedLabels": [
        "efficiencyDocumentation"
      ],
      "observedValueTypes": [
        "text"
      ]
    },
    {
      "inputKey": "efficiencyrating",
      "count": 3,
      "observedLabels": [
        "efficiencyRating"
      ],
      "observedValueTypes": [
        "text"
      ]
    },
    {
      "inputKey": "eligible_battery_brand_model",
      "count": 3,
      "observedLabels": [
        "eligible battery brand/model"
      ],
      "observedValueTypes": [
        "text"
      ]
    },
    {
      "inputKey": "eligible_battery_count_over_10_kwh",
      "count": 3,
      "observedLabels": [
        "eligible battery count over 10 kwh"
      ],
      "observedValueTypes": [
        "number"
      ]
    },
    {
      "inputKey": "eligible_battery_type",
      "count": 3,
      "observedLabels": [
        "eligible battery type"
      ],
      "observedValueTypes": [
        "text"
      ]
    },
    {
      "inputKey": "eligible_connected_smart_thermostat",
      "count": 3,
      "observedLabels": [
        "eligible connected smart thermostat"
      ],
      "observedValueTypes": [
        "number"
      ]
    },
    {
      "inputKey": "eligible_organization_type",
      "count": 3,
      "observedLabels": [
        "eligible organization type"
      ],
      "observedValueTypes": [
        "text"
      ]
    },
    {
      "inputKey": "eligible_report_cost",
      "count": 3,
      "observedLabels": [
        "eligible report cost"
      ],
      "observedValueTypes": [
        "number"
      ]
    }
  ],
  "mustHandleQuantityAliases": [
    {
      "inputKey": "unit_count",
      "count": 303,
      "observedLabels": [
        "unit count"
      ],
      "observedValueTypes": [
        "number"
      ]
    },
    {
      "inputKey": "quantity",
      "count": 87,
      "observedLabels": [
        "quantity"
      ],
      "observedValueTypes": [
        "number"
      ]
    },
    {
      "inputKey": "charger_count",
      "count": 43,
      "observedLabels": [
        "charger count"
      ],
      "observedValueTypes": [
        "number"
      ]
    },
    {
      "inputKey": "charger_level",
      "count": 40,
      "observedLabels": [
        "charger level"
      ],
      "observedValueTypes": [
        "text"
      ]
    },
    {
      "inputKey": "unitcount",
      "count": 39,
      "observedLabels": [
        "unitCount"
      ],
      "observedValueTypes": [
        "number"
      ]
    },
    {
      "inputKey": "charger_type",
      "count": 35,
      "observedLabels": [
        "charger type"
      ],
      "observedValueTypes": [
        "text"
      ]
    },
    {
      "inputKey": "equipment_quantity",
      "count": 33,
      "observedLabels": [
        "equipment quantity"
      ],
      "observedValueTypes": [
        "number"
      ]
    },
    {
      "inputKey": "port_count",
      "count": 31,
      "observedLabels": [
        "port count"
      ],
      "observedValueTypes": [
        "number"
      ]
    },
    {
      "inputKey": "thermostat_count",
      "count": 30,
      "observedLabels": [
        "thermostat count"
      ],
      "observedValueTypes": [
        "number"
      ]
    },
    {
      "inputKey": "member_account",
      "count": 26,
      "observedLabels": [
        "member account"
      ],
      "observedValueTypes": [
        "number"
      ]
    },
    {
      "inputKey": "charger_cost",
      "count": 17,
      "observedLabels": [
        "charger cost"
      ],
      "observedValueTypes": [
        "number"
      ]
    },
    {
      "inputKey": "system_count",
      "count": 11,
      "observedLabels": [
        "system count"
      ],
      "observedValueTypes": [
        "number"
      ]
    },
    {
      "inputKey": "unit_count_or_tons",
      "count": 11,
      "observedLabels": [
        "unit count or tons"
      ],
      "observedValueTypes": [
        "number"
      ]
    },
    {
      "inputKey": "charger_model",
      "count": 10,
      "observedLabels": [
        "charger model"
      ],
      "observedValueTypes": [
        "text"
      ]
    },
    {
      "inputKey": "quantity_or_size",
      "count": 10,
      "observedLabels": [
        "quantity or size"
      ],
      "observedValueTypes": [
        "number"
      ]
    },
    {
      "inputKey": "unit_count_or_square_feet",
      "count": 10,
      "observedLabels": [
        "unit count or square feet"
      ],
      "observedValueTypes": [
        "number"
      ]
    },
    {
      "inputKey": "utility_account",
      "count": 10,
      "observedLabels": [
        "utility account"
      ],
      "observedValueTypes": [
        "number"
      ]
    },
    {
      "inputKey": "eligible_unit_count",
      "count": 9,
      "observedLabels": [
        "eligible unit count"
      ],
      "observedValueTypes": [
        "number"
      ]
    },
    {
      "inputKey": "indoor_head_count",
      "count": 8,
      "observedLabels": [
        "indoor head count"
      ],
      "observedValueTypes": [
        "number"
      ]
    },
    {
      "inputKey": "measure_quantity",
      "count": 8,
      "observedLabels": [
        "measure quantity"
      ],
      "observedValueTypes": [
        "number"
      ]
    },
    {
      "inputKey": "qualified_level_2_charger",
      "count": 8,
      "observedLabels": [
        "qualified level 2 charger"
      ],
      "observedValueTypes": [
        "text"
      ]
    },
    {
      "inputKey": "charger_power_kw",
      "count": 7,
      "observedLabels": [
        "charger power kw",
        "charger power kW"
      ],
      "observedValueTypes": [
        "number"
      ]
    },
    {
      "inputKey": "customer_utility_account",
      "count": 7,
      "observedLabels": [
        "customer utility account"
      ],
      "observedValueTypes": [
        "number"
      ]
    },
    {
      "inputKey": "fixture_count",
      "count": 7,
      "observedLabels": [
        "fixture count"
      ],
      "observedValueTypes": [
        "number"
      ]
    },
    {
      "inputKey": "quantity_or_equipment_size",
      "count": 7,
      "observedLabels": [
        "quantity or equipment size"
      ],
      "observedValueTypes": [
        "number"
      ]
    },
    {
      "inputKey": "enrolled_ev_count",
      "count": 6,
      "observedLabels": [
        "enrolled ev count"
      ],
      "observedValueTypes": [
        "number"
      ]
    },
    {
      "inputKey": "capacity_or_unit_count",
      "count": 5,
      "observedLabels": [
        "capacity or unit count"
      ],
      "observedValueTypes": [
        "number"
      ]
    },
    {
      "inputKey": "charger_kw",
      "count": 5,
      "observedLabels": [
        "charger kW",
        "charger kw"
      ],
      "observedValueTypes": [
        "number"
      ]
    },
    {
      "inputKey": "door_count",
      "count": 5,
      "observedLabels": [
        "door count"
      ],
      "observedValueTypes": [
        "number"
      ]
    },
    {
      "inputKey": "ev_charger_type",
      "count": 5,
      "observedLabels": [
        "EV charger type"
      ],
      "observedValueTypes": [
        "text"
      ]
    },
    {
      "inputKey": "fixture_type",
      "count": 5,
      "observedLabels": [
        "fixture type"
      ],
      "observedValueTypes": [
        "text"
      ]
    },
    {
      "inputKey": "furnace_count",
      "count": 5,
      "observedLabels": [
        "furnace count"
      ],
      "observedValueTypes": [
        "number"
      ]
    },
    {
      "inputKey": "level_2_port_count",
      "count": 5,
      "observedLabels": [
        "level 2 port count"
      ],
      "observedValueTypes": [
        "number"
      ]
    },
    {
      "inputKey": "model_number",
      "count": 5,
      "observedLabels": [
        "model number"
      ],
      "observedValueTypes": [
        "text"
      ]
    },
    {
      "inputKey": "number_of_units",
      "count": 5,
      "observedLabels": [
        "number of units"
      ],
      "observedValueTypes": [
        "text"
      ]
    },
    {
      "inputKey": "portcount",
      "count": 5,
      "observedLabels": [
        "portCount"
      ],
      "observedValueTypes": [
        "number"
      ]
    },
    {
      "inputKey": "residential_account",
      "count": 5,
      "observedLabels": [
        "residential account"
      ],
      "observedValueTypes": [
        "number"
      ]
    },
    {
      "inputKey": "thermostatcount",
      "count": 5,
      "observedLabels": [
        "thermostatCount"
      ],
      "observedValueTypes": [
        "number"
      ]
    },
    {
      "inputKey": "window_square_feet",
      "count": 5,
      "observedLabels": [
        "window square feet"
      ],
      "observedValueTypes": [
        "number"
      ]
    },
    {
      "inputKey": "charger_type_if_ev",
      "count": 4,
      "observedLabels": [
        "charger type if EV",
        "charger type if ev"
      ],
      "observedValueTypes": [
        "text"
      ]
    },
    {
      "inputKey": "community_action_agency_project_scope",
      "count": 4,
      "observedLabels": [
        "community action agency project scope"
      ],
      "observedValueTypes": [
        "text"
      ]
    },
    {
      "inputKey": "counterfactual_interest_rate",
      "count": 4,
      "observedLabels": [
        "counterfactual interest rate"
      ],
      "observedValueTypes": [
        "number"
      ]
    },
    {
      "inputKey": "customer_account",
      "count": 4,
      "observedLabels": [
        "customer account"
      ],
      "observedValueTypes": [
        "number"
      ]
    },
    {
      "inputKey": "disadvantaged_community_status",
      "count": 4,
      "observedLabels": [
        "disadvantaged community status",
        "disadvantaged-community status"
      ],
      "observedValueTypes": [
        "text"
      ]
    },
    {
      "inputKey": "eligible_port_count",
      "count": 4,
      "observedLabels": [
        "eligible port count"
      ],
      "observedValueTypes": [
        "number"
      ]
    },
    {
      "inputKey": "eligible_quantity",
      "count": 4,
      "observedLabels": [
        "eligible quantity"
      ],
      "observedValueTypes": [
        "number"
      ]
    },
    {
      "inputKey": "minimum_two_ports",
      "count": 4,
      "observedLabels": [
        "minimum two ports"
      ],
      "observedValueTypes": [
        "text"
      ]
    },
    {
      "inputKey": "number_of_ports",
      "count": 4,
      "observedLabels": [
        "number of ports"
      ],
      "observedValueTypes": [
        "text"
      ]
    },
    {
      "inputKey": "outdoor_unit_count",
      "count": 4,
      "observedLabels": [
        "outdoor unit count"
      ],
      "observedValueTypes": [
        "number"
      ]
    },
    {
      "inputKey": "qualifying_vehicle_count",
      "count": 4,
      "observedLabels": [
        "qualifying vehicle count"
      ],
      "observedValueTypes": [
        "number"
      ]
    },
    {
      "inputKey": "serial_number",
      "count": 4,
      "observedLabels": [
        "serial number"
      ],
      "observedValueTypes": [
        "text"
      ]
    },
    {
      "inputKey": "steam_trap_count",
      "count": 4,
      "observedLabels": [
        "steam trap count"
      ],
      "observedValueTypes": [
        "number"
      ]
    },
    {
      "inputKey": "tons_or_unit_count",
      "count": 4,
      "observedLabels": [
        "tons or unit count"
      ],
      "observedValueTypes": [
        "number"
      ]
    },
    {
      "inputKey": "unit_count_or_heating_tons",
      "count": 4,
      "observedLabels": [
        "unit count or heating tons"
      ],
      "observedValueTypes": [
        "number"
      ]
    },
    {
      "inputKey": "vec_member_account",
      "count": 4,
      "observedLabels": [
        "VEC member account"
      ],
      "observedValueTypes": [
        "number"
      ]
    },
    {
      "inputKey": "accounteligibility",
      "count": 3,
      "observedLabels": [
        "accountEligibility"
      ],
      "observedValueTypes": [
        "number"
      ]
    },
    {
      "inputKey": "aesresidentialaccount",
      "count": 3,
      "observedLabels": [
        "AESResidentialAccount"
      ],
      "observedValueTypes": [
        "number"
      ]
    },
    {
      "inputKey": "applicationportalresult",
      "count": 3,
      "observedLabels": [
        "applicationPortalResult"
      ],
      "observedValueTypes": [
        "text"
      ]
    },
    {
      "inputKey": "belmont_light_account",
      "count": 3,
      "observedLabels": [
        "belmont light account"
      ],
      "observedValueTypes": [
        "number"
      ]
    },
    {
      "inputKey": "blower_door_test_for_air_sealing",
      "count": 3,
      "observedLabels": [
        "blower door test for air sealing"
      ],
      "observedValueTypes": [
        "text"
      ]
    },
    {
      "inputKey": "capacity_in_tons_or_unit_count",
      "count": 3,
      "observedLabels": [
        "capacity in tons or unit count"
      ],
      "observedValueTypes": [
        "number"
      ]
    },
    {
      "inputKey": "ceda_custom_energy_report",
      "count": 3,
      "observedLabels": [
        "CEDA custom energy report"
      ],
      "observedValueTypes": [
        "text"
      ]
    },
    {
      "inputKey": "charger_connected_to_gmp",
      "count": 3,
      "observedLabels": [
        "charger connected to gmp"
      ],
      "observedValueTypes": [
        "text"
      ]
    },
    {
      "inputKey": "charger_or_outlet_type",
      "count": 3,
      "observedLabels": [
        "charger or outlet type"
      ],
      "observedValueTypes": [
        "text"
      ]
    },
    {
      "inputKey": "charger_output_kw",
      "count": 3,
      "observedLabels": [
        "charger output kw"
      ],
      "observedValueTypes": [
        "number"
      ]
    },
    {
      "inputKey": "chargerpowerlevelkw",
      "count": 3,
      "observedLabels": [
        "chargerPowerLevelKW"
      ],
      "observedValueTypes": [
        "number"
      ]
    },
    {
      "inputKey": "charging_time_window",
      "count": 3,
      "observedLabels": [
        "charging time window"
      ],
      "observedValueTypes": [
        "text"
      ]
    },
    {
      "inputKey": "chargingwindowcompliance",
      "count": 3,
      "observedLabels": [
        "chargingWindowCompliance"
      ],
      "observedValueTypes": [
        "text"
      ]
    },
    {
      "inputKey": "commercial_account",
      "count": 3,
      "observedLabels": [
        "commercial account"
      ],
      "observedValueTypes": [
        "number"
      ]
    },
    {
      "inputKey": "commercial_account_status",
      "count": 3,
      "observedLabels": [
        "commercial account status"
      ],
      "observedValueTypes": [
        "number"
      ]
    },
    {
      "inputKey": "controlled_fan_count",
      "count": 3,
      "observedLabels": [
        "controlled fan count"
      ],
      "observedValueTypes": [
        "number"
      ]
    },
    {
      "inputKey": "cow_count",
      "count": 3,
      "observedLabels": [
        "cow count"
      ],
      "observedValueTypes": [
        "number"
      ]
    },
    {
      "inputKey": "cow_count_or_horsepower",
      "count": 3,
      "observedLabels": [
        "cow count or horsepower"
      ],
      "observedValueTypes": [
        "number"
      ]
    },
    {
      "inputKey": "customeraccountidentifier",
      "count": 3,
      "observedLabels": [
        "customerAccountIdentifier"
      ],
      "observedValueTypes": [
        "number"
      ]
    },
    {
      "inputKey": "device_count",
      "count": 3,
      "observedLabels": [
        "device count"
      ],
      "observedValueTypes": [
        "number"
      ]
    },
    {
      "inputKey": "disadvantagedcommunitystatus",
      "count": 3,
      "observedLabels": [
        "disadvantagedCommunityStatus"
      ],
      "observedValueTypes": [
        "text"
      ]
    },
    {
      "inputKey": "discount_charging_rate_enrollment",
      "count": 3,
      "observedLabels": [
        "discount charging rate enrollment"
      ],
      "observedValueTypes": [
        "number"
      ]
    },
    {
      "inputKey": "dwelling_unit_count",
      "count": 3,
      "observedLabels": [
        "dwelling unit count"
      ],
      "observedValueTypes": [
        "number"
      ]
    },
    {
      "inputKey": "eligible_battery_count_over_10_kwh",
      "count": 3,
      "observedLabels": [
        "eligible battery count over 10 kwh"
      ],
      "observedValueTypes": [
        "number"
      ]
    },
    {
      "inputKey": "eligible_report_cost",
      "count": 3,
      "observedLabels": [
        "eligible report cost"
      ],
      "observedValueTypes": [
        "number"
      ]
    }
  ],
  "sampleContexts": [
    {
      "inputKey": "measure_type",
      "opportunityId": "SOURCE_DSIRE:dsire_program_id:4698",
      "programName": "Ameren Illinois - Energy-Efficiency Program",
      "calculationStatus": "calculable_with_missing_inputs",
      "effectId": "effect_one_time_savings_1_2a825725ce3b83b0",
      "effectLabel": "Use the current Ameren Illinois prescriptive row for the matched measure and multiply by eligible unit count; custom projects use published first-year saving..."
    },
    {
      "inputKey": "eligible_unit_count",
      "opportunityId": "SOURCE_DSIRE:dsire_program_id:4698",
      "programName": "Ameren Illinois - Energy-Efficiency Program",
      "calculationStatus": "calculable_with_missing_inputs",
      "effectId": "effect_one_time_savings_1_2a825725ce3b83b0",
      "effectLabel": "Use the current Ameren Illinois prescriptive row for the matched measure and multiply by eligible unit count; custom projects use published first-year saving..."
    },
    {
      "inputKey": "fuel_type",
      "opportunityId": "SOURCE_DSIRE:dsire_program_id:4698",
      "programName": "Ameren Illinois - Energy-Efficiency Program",
      "calculationStatus": "calculable_with_missing_inputs",
      "effectId": "effect_one_time_savings_1_2a825725ce3b83b0",
      "effectLabel": "Use the current Ameren Illinois prescriptive row for the matched measure and multiply by eligible unit count; custom projects use published first-year saving..."
    },
    {
      "inputKey": "verified_annual_kwh_savings",
      "opportunityId": "SOURCE_DSIRE:dsire_program_id:4698",
      "programName": "Ameren Illinois - Energy-Efficiency Program",
      "calculationStatus": "calculable_with_missing_inputs",
      "effectId": "effect_one_time_savings_1_2a825725ce3b83b0",
      "effectLabel": "Use the current Ameren Illinois prescriptive row for the matched measure and multiply by eligible unit count; custom projects use published first-year saving..."
    },
    {
      "inputKey": "verified_annual_therm_savings",
      "opportunityId": "SOURCE_DSIRE:dsire_program_id:4698",
      "programName": "Ameren Illinois - Energy-Efficiency Program",
      "calculationStatus": "calculable_with_missing_inputs",
      "effectId": "effect_one_time_savings_1_2a825725ce3b83b0",
      "effectLabel": "Use the current Ameren Illinois prescriptive row for the matched measure and multiply by eligible unit count; custom projects use published first-year saving..."
    },
    {
      "inputKey": "project_type",
      "opportunityId": "SOURCE_DSIRE:dsire_program_id:4245",
      "programName": "RG&E (Electric) - Commercial and Industrial Efficiency Program",
      "calculationStatus": "calculable_with_missing_inputs",
      "effectId": "effect_one_time_savings_1_c66e6b303c2dd52a",
      "effectLabel": "Custom incentive equals the applicable custom savings rate times verified first-year savings, capped by the applicable eligible-cost limit for the project type."
    },
    {
      "inputKey": "trap_count",
      "opportunityId": "SOURCE_DSIRE:dsire_program_id:3235",
      "programName": "Peoples Gas - Commercial & Industrial Prescriptive Rebate Program",
      "calculationStatus": "calculable_with_missing_inputs",
      "effectId": "effect_one_time_savings_1_1beb808333fd22f1",
      "effectLabel": "For eligible commercial or process steam traps, multiply the applicable 2026 rate-table amount by trap count; total rebate cannot exceed eligible project cost."
    },
    {
      "inputKey": "eligible_tons",
      "opportunityId": "SOURCE_DSIRE:dsire_program_id:3074",
      "programName": "ComEd -Energy Efficiency Program For Businesses",
      "calculationStatus": "calculable_with_missing_inputs",
      "effectId": "effect_one_time_savings_1_49a095ce4a11a747",
      "effectLabel": "For listed DX tune-up controls, multiply the ComEd 2026 worksheet rate by eligible tons or thermostat count; worksheet caps and reservation rules apply."
    },
    {
      "inputKey": "thermostat_count",
      "opportunityId": "SOURCE_DSIRE:dsire_program_id:3074",
      "programName": "ComEd -Energy Efficiency Program For Businesses",
      "calculationStatus": "calculable_with_missing_inputs",
      "effectId": "effect_one_time_savings_1_49a095ce4a11a747",
      "effectLabel": "For listed DX tune-up controls, multiply the ComEd 2026 worksheet rate by eligible tons or thermostat count; worksheet caps and reservation rules apply."
    },
    {
      "inputKey": "charger_count",
      "opportunityId": "SOURCE_DSIRE:dsire_program_id:3146",
      "programName": "Otter Tail Power Company - Residential and Commercial Energy Efficiency Rebate Program",
      "calculationStatus": "calculable_with_missing_inputs",
      "effectId": "effect_one_time_savings_1_997bbb71eb9a990a",
      "effectLabel": "Rebate is $500 for each hardwired Level 2 EV charging station installed on a qualified Otter Tail Power off-peak rate."
    },
    {
      "inputKey": "thermostat_or_zone_sensor_count",
      "opportunityId": "SOURCE_DSIRE:dsire_program_id:3659",
      "programName": "AEP Public Service Company of Oklahoma - Commercial Rebate Program",
      "calculationStatus": "calculable_with_missing_inputs",
      "effectId": "effect_one_time_savings_1_d5077f41d3129631",
      "effectLabel": "Rebate is $250 for each eligible networked HVAC thermostat or zone sensor."
    },
    {
      "inputKey": "eligible_square_feet",
      "opportunityId": "SOURCE_DSIRE:dsire_program_id:3260",
      "programName": "Pasadena Water and Power - Commercial Energy Efficiency Rebate Program",
      "calculationStatus": "calculable_with_missing_inputs",
      "effectId": "effect_one_time_savings_1_166ab742e1702fd3",
      "effectLabel": "Use the PWP commercial measure-table rate for selected equipment and unit count; total rebate is capped at 25% of project cost and $24,000 per metered accoun..."
    },
    {
      "inputKey": "permit_or_inspection_signoff",
      "opportunityId": "SOURCE_DSIRE:dsire_program_id:1896",
      "programName": "Riverside Public Utilities - Residential Energy Efficiency Rebate Program",
      "calculationStatus": "calculable_with_missing_inputs",
      "effectId": "effect_one_time_savings_1_1b6a13edbc0c7154",
      "effectLabel": "Residential Level 2 EV charger rebate reimburses actual charger, permit, labor, and installation costs up to $1,500, or up to $2,500 for qualifying SHARE cus..."
    },
    {
      "inputKey": "installation_count",
      "opportunityId": "SOURCE_DSIRE:dsire_program_id:1810",
      "programName": "Lodi Electric Utility - Residential Energy Efficiency Rebate Program",
      "calculationStatus": "calculable_with_missing_inputs",
      "effectId": "effect_one_time_savings_1_add363ac030ab973",
      "effectLabel": "For eligible residential Level II EV projects, Lodi lists separate $500 rebates for charger hardware and charger installation."
    },
    {
      "inputKey": "charger_type",
      "opportunityId": "SOURCE_DSIRE:dsire_program_id:1889",
      "programName": "Pasadena Water and Power - Residential Energy Efficiency Rebate Program",
      "calculationStatus": "calculable_with_missing_inputs",
      "effectId": "effect_one_time_savings_1_ac406a53b4c69f6f",
      "effectLabel": "For a qualifying residential Level 2 charger, use $600 for Wi-Fi enabled equipment or $200 for standard non-Wi-Fi equipment."
    },
    {
      "inputKey": "steam_trap_count",
      "opportunityId": "SOURCE_DSIRE:dsire_program_id:4952",
      "programName": "SoCalGas - Custom Non-Residential Energy Efficiency Program",
      "calculationStatus": "calculable_with_missing_inputs",
      "effectId": "effect_one_time_savings_1_84210744e6c37713",
      "effectLabel": "For eligible SoCalGas commercial steam traps, rebate is $100 per qualifying unit."
    },
    {
      "inputKey": "community_grant_qualification",
      "opportunityId": "SOURCE_DSIRE:dsire_program_id:5796",
      "programName": "Efficiency Works - Business Energy Efficiency Rebate Program (Offered by 4 Utilities)",
      "calculationStatus": "calculable_with_missing_inputs",
      "effectId": "effect_one_time_savings_1_2750a32ce554031b",
      "effectLabel": "Community Efficiency Grant adds an incentive equal to 100% of the standard Efficiency Works rebate, capped at total project cost and limited to the grant pat..."
    },
    {
      "inputKey": "eligible_horsepower",
      "opportunityId": "SOURCE_DSIRE:dsire_program_id:2620",
      "programName": "Idaho Power - Easy Upgrades for Simple Retrofits Rebate Program",
      "calculationStatus": "calculable_with_missing_inputs",
      "effectId": "effect_one_time_savings_1_82e85a0f43682e30",
      "effectLabel": "For eligible Idaho Power Easy Upgrades refrigeration controls, multiply the selected measure rate by eligible compressor horsepower or linear feet."
    },
    {
      "inputKey": "eligible_linear_feet",
      "opportunityId": "SOURCE_DSIRE:dsire_program_id:2620",
      "programName": "Idaho Power - Easy Upgrades for Simple Retrofits Rebate Program",
      "calculationStatus": "calculable_with_missing_inputs",
      "effectId": "effect_one_time_savings_1_82e85a0f43682e30",
      "effectLabel": "For eligible Idaho Power Easy Upgrades refrigeration controls, multiply the selected measure rate by eligible compressor horsepower or linear feet."
    },
    {
      "inputKey": "state_specific_form",
      "opportunityId": "SOURCE_DSIRE:dsire_program_id:2620",
      "programName": "Idaho Power - Easy Upgrades for Simple Retrofits Rebate Program",
      "calculationStatus": "calculable_with_missing_inputs",
      "effectId": "effect_one_time_savings_1_82e85a0f43682e30",
      "effectLabel": "For eligible Idaho Power Easy Upgrades refrigeration controls, multiply the selected measure rate by eligible compressor horsepower or linear feet."
    },
    {
      "inputKey": "equipment_model",
      "opportunityId": "SOURCE_DSIRE:dsire_program_id:4653",
      "programName": "Wabash Valley Power Association (23 Member Cooperatives) - Commercial and Industrial Energy Effic...",
      "calculationStatus": "calculable_with_missing_inputs",
      "effectId": "effect_one_time_savings_1_016f73ff8b01368c",
      "effectLabel": "Use the 2026 PowerMoves non-lighting row: $75 per Wi-Fi smart thermostat on an air-source heat pump or $750 per qualifying heat pump water heater."
    },
    {
      "inputKey": "replacement_equipment_type",
      "opportunityId": "SOURCE_DSIRE:dsire_program_id:4653",
      "programName": "Wabash Valley Power Association (23 Member Cooperatives) - Commercial and Industrial Energy Effic...",
      "calculationStatus": "calculable_with_missing_inputs",
      "effectId": "effect_one_time_savings_1_016f73ff8b01368c",
      "effectLabel": "Use the 2026 PowerMoves non-lighting row: $75 per Wi-Fi smart thermostat on an air-source heat pump or $750 per qualifying heat pump water heater."
    },
    {
      "inputKey": "member_account",
      "opportunityId": "SOURCE_DSIRE:dsire_program_id:2516",
      "programName": "Riverland Energy Cooperative - Commercial, Industrial, and Agricultural Energy Efficiency Rebate ...",
      "calculationStatus": "calculable_with_missing_inputs",
      "effectId": "effect_one_time_savings_1_fdff23a76226146a",
      "effectLabel": "EV charger rebate is $500 for each qualifying Level 2 charger on the applicable Riverland EV charger form, subject to purchase-price and funds limits."
    },
    {
      "inputKey": "post_installation_inspection_completed",
      "opportunityId": "SOURCE_DSIRE:dsire_program_id:1812",
      "programName": "Marblehead Municipal Light Department - Residential Energy Efficiency Rebate Program",
      "calculationStatus": "calculable_with_missing_inputs",
      "effectId": "effect_one_time_savings_1_7a1d733dcef3abcb",
      "effectLabel": "Weatherization rebate equals 50% of purchase price for blower-door/air sealing, insulation, or duct sealing, capped at $750 per measure."
    },
    {
      "inputKey": "equipment_quantity",
      "opportunityId": "SOURCE_DSIRE:dsire_program_id:3689",
      "programName": "PEPCO - Commercial and Industrial Energy Efficiency Incentives Program",
      "calculationStatus": "calculable_with_missing_inputs",
      "effectId": "effect_one_time_savings_1_76898304da98e944",
      "effectLabel": "Use Pepco Maryland business prescriptive incentive-reference amount for the selected qualifying measure, subject to application requirements and program caps..."
    },
    {
      "inputKey": "tons_or_horsepower_or_square_feet_or_linear_feet_as_applicable",
      "opportunityId": "SOURCE_DSIRE:dsire_program_id:3689",
      "programName": "PEPCO - Commercial and Industrial Energy Efficiency Incentives Program",
      "calculationStatus": "calculable_with_missing_inputs",
      "effectId": "effect_one_time_savings_1_76898304da98e944",
      "effectLabel": "Use Pepco Maryland business prescriptive incentive-reference amount for the selected qualifying measure, subject to application requirements and program caps..."
    },
    {
      "inputKey": "annual_kwh_savings_for_custom_or_glazing_measures",
      "opportunityId": "SOURCE_DSIRE:dsire_program_id:3689",
      "programName": "PEPCO - Commercial and Industrial Energy Efficiency Incentives Program",
      "calculationStatus": "calculable_with_missing_inputs",
      "effectId": "effect_one_time_savings_1_76898304da98e944",
      "effectLabel": "Use Pepco Maryland business prescriptive incentive-reference amount for the selected qualifying measure, subject to application requirements and program caps..."
    },
    {
      "inputKey": "quantity",
      "opportunityId": "SOURCE_DSIRE:dsire_program_id:3689",
      "programName": "PEPCO - Commercial and Industrial Energy Efficiency Incentives Program",
      "calculationStatus": "calculable_with_missing_inputs",
      "effectId": "effect_one_time_savings_1_76898304da98e944",
      "effectLabel": "Use Pepco Maryland business prescriptive incentive-reference amount for the selected qualifying measure, subject to application requirements and program caps..."
    },
    {
      "inputKey": "equipment_size_or_area",
      "opportunityId": "SOURCE_DSIRE:dsire_program_id:3689",
      "programName": "PEPCO - Commercial and Industrial Energy Efficiency Incentives Program",
      "calculationStatus": "calculable_with_missing_inputs",
      "effectId": "effect_one_time_savings_1_76898304da98e944",
      "effectLabel": "Use Pepco Maryland business prescriptive incentive-reference amount for the selected qualifying measure, subject to application requirements and program caps..."
    },
    {
      "inputKey": "annual_kwh_savings_for_custom_measures",
      "opportunityId": "SOURCE_DSIRE:dsire_program_id:3689",
      "programName": "PEPCO - Commercial and Industrial Energy Efficiency Incentives Program",
      "calculationStatus": "calculable_with_missing_inputs",
      "effectId": "effect_one_time_savings_1_76898304da98e944",
      "effectLabel": "Use Pepco Maryland business prescriptive incentive-reference amount for the selected qualifying measure, subject to application requirements and program caps..."
    },
    {
      "inputKey": "insulation_square_feet_if_applicable",
      "opportunityId": "SOURCE_DSIRE:dsire_program_id:1882",
      "programName": "Modesto Irrigation District - Residential Energy Efficiency Rebate Program",
      "calculationStatus": "calculable_with_missing_inputs",
      "effectId": "effect_one_time_savings_1_7e77716a5e8aceed",
      "effectLabel": "Apply the MID residential rebate amount for the selected qualifying home measure. Known current examples include $500 per ENERGY STAR heat pump water heater,..."
    },
    {
      "inputKey": "equipment_efficiency",
      "opportunityId": "SOURCE_DSIRE:dsire_program_id:1882",
      "programName": "Modesto Irrigation District - Residential Energy Efficiency Rebate Program",
      "calculationStatus": "calculable_with_missing_inputs",
      "effectId": "effect_one_time_savings_1_7e77716a5e8aceed",
      "effectLabel": "Apply the MID residential rebate amount for the selected qualifying home measure. Known current examples include $500 per ENERGY STAR heat pump water heater,..."
    },
    {
      "inputKey": "mid_account_status",
      "opportunityId": "SOURCE_DSIRE:dsire_program_id:1882",
      "programName": "Modesto Irrigation District - Residential Energy Efficiency Rebate Program",
      "calculationStatus": "calculable_with_missing_inputs",
      "effectId": "effect_one_time_savings_1_7e77716a5e8aceed",
      "effectLabel": "Apply the MID residential rebate amount for the selected qualifying home measure. Known current examples include $500 per ENERGY STAR heat pump water heater,..."
    },
    {
      "inputKey": "square_feet_for_insulation",
      "opportunityId": "SOURCE_DSIRE:dsire_program_id:1882",
      "programName": "Modesto Irrigation District - Residential Energy Efficiency Rebate Program",
      "calculationStatus": "calculable_with_missing_inputs",
      "effectId": "effect_one_time_savings_1_7e77716a5e8aceed",
      "effectLabel": "Apply the MID residential rebate amount for the selected qualifying home measure. Known current examples include $500 per ENERGY STAR heat pump water heater,..."
    },
    {
      "inputKey": "qualifying_smart_thermostat",
      "opportunityId": "SOURCE_DSIRE:dsire_program_id:1882",
      "programName": "Modesto Irrigation District - Residential Energy Efficiency Rebate Program",
      "calculationStatus": "calculable_with_missing_inputs",
      "effectId": "effect_one_time_savings_1_7e77716a5e8aceed",
      "effectLabel": "Apply the MID residential rebate amount for the selected qualifying home measure. Known current examples include $500 per ENERGY STAR heat pump water heater,..."
    }
  ]
}
