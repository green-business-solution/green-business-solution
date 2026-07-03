You are helping RetroFi create realistic synthetic project-profile data for grant estimation tests.

Prompt 17 of 50.

This is NOT source research for grant formulas. This is project/test-case enrichment. Use the supplied test-case facts, public/common-sense building assumptions, and realistic project planning assumptions. You may use the organization's public website only for basic context, but do not invent that a project qualifies for a grant just to make the estimate positive.

## Goal

Add realistic synthetic project-profile inputs for this test case so Codex can calculate or suppress grant estimates. The profile should look like a real customer record: some projects should qualify, some should not, some should need quote data, and some should have uncertainty.

Do not make every grant barely qualify. If the organization/building/project would not normally pursue a grant, mark that honestly.

## Current Test Case Context

```json
{
  "sampleUserId": "gm-factory-zero-detroit",
  "description": "Detroit EV assembly plant with facility efficiency, fleet charging, and clean-manufacturing overlap.",
  "sourceForm": {
    "sampleUserId": "gm-factory-zero-detroit",
    "description": "Detroit EV assembly plant with facility efficiency, fleet charging, and clean-manufacturing overlap.",
    "companyName": "General Motors Factory ZERO",
    "website": "https://www.gm.com/",
    "organizationType": "Industrial Facility",
    "organizationSize": "1,000+ employees",
    "siteAddress": "2500 E Grand Boulevard, Detroit, MI 48211, USA",
    "electricUtilityProvider": "DTE Electric",
    "gasUtilityProvider": "DTE Gas",
    "ownershipStatus": "Own",
    "buildingType": "Industrial / Manufacturing",
    "squareFootage": "4,000,000",
    "primaryActivityText": "Electric-vehicle manufacturing, assembly, logistics, testing, and plant operations",
    "naicsCodes": [
      "336110"
    ],
    "publicSourceNotes": "Public GM facility information identifies Factory ZERO at 2500 E Grand Boulevard and describes more than four million square feet.",
    "notes": "Tests an EV manufacturing site where facility efficiency, transportation electrification, and federal clean-manufacturing incentives overlap.",
    "project": {
      "stage": "exploring"
    }
  },
  "normalizedProfile": {
    "site": {
      "addressStructured": {
        "raw": "2500 E Grand Boulevard, Detroit, MI 48211, USA",
        "stateCode": "MI",
        "zip5": "48211"
      },
      "geo": {
        "stateCode": "MI",
        "zip5": "48211",
        "countyFips": null,
        "placeGeoid": null,
        "censusTractGeoid": null,
        "designations": []
      },
      "utility": {
        "electric": {
          "selfReportedName": "DTE Electric",
          "distributionUtilityId": "UTIL_DTE",
          "territoryCandidates": [
            "UTIL_DTE"
          ],
          "verificationStatus": "self_reported_unverified",
          "customerClass": null
        }
      },
      "ownershipRelationship": "owner",
      "buildingTypes": [
        "industrial_manufacturing"
      ],
      "squareFootage": {
        "value": 4000000,
        "raw": "4,000,000",
        "parsingStatus": "parsed"
      }
    }
  },
  "siteEnergyProfile": {
    "availableFieldIds": [
      "account_number_masked",
      "annual_electric_cost",
      "annual_gas_cost",
      "annual_kwh",
      "annual_sewer_cost",
      "annual_therms",
      "annual_water_cost",
      "annual_water_use",
      "average_cost_per_kwh",
      "average_cost_per_therm",
      "billing_period_end",
      "billing_period_start",
      "bin_size",
      "contamination_fees",
      "customer_class",
      "delivery_charges",
      "demand_charge_rate",
      "demand_charges",
      "fixed_customer_charge",
      "fixed_gas_charge",
      "gas_delivery_charges",
      "gas_procurement_charges",
      "gas_rate_schedule",
      "gas_utility_provider",
      "generation_charges",
      "irrigation_meter_present",
      "landfill_service_cost",
      "meter_size",
      "monthly_kwh",
      "monthly_peak_kw",
      "monthly_therms",
      "monthly_water_use",
      "organics_service_cost",
      "overage_fees",
      "peak_kw",
      "pickup_frequency",
      "rate_schedule",
      "recycling_service_cost",
      "service_address",
      "sewer_cost",
      "stormwater_fee",
      "taxes_and_fees",
      "time_of_use_periods",
      "total_electric_cost",
      "total_gas_cost",
      "total_waste_cost",
      "total_water_cost",
      "utility_provider",
      "waste_hauler",
      "water_provider",
      "water_unit"
    ],
    "latestUtilityProvider": "Private industrial waste and recycling haulers",
    "annualKwh": 299000000,
    "annualElectricCost": 32595000,
    "averageCostPerKwh": 0.109,
    "utilitySummaries": [
      {
        "utilityCategory": "electric",
        "annualCost": 32595000
      },
      {
        "utilityCategory": "gas",
        "annualCost": 11557200
      },
      {
        "utilityCategory": "water_sewer",
        "annualCost": 2184140
      },
      {
        "utilityCategory": "waste",
        "annualCost": 3060000
      }
    ]
  },
  "siteTaxProfile": {
    "availableFieldIds": [
      "eligible_state_education_tax_cents",
      "eligible_real_property_tax_cents",
      "eligible_personal_property_tax_cents",
      "eligible_local_income_tax_cents",
      "approved_rerz_designation",
      "qualified_company_operations",
      "phaseout_multiplier"
    ]
  },
  "existingTaxFacts": [
    {
      "inputKey": "state_code",
      "value": "MI",
      "sourceFileId": "taxfile_gm_factory_zero_2026_wayne_property_bill",
      "sourceStrategy": "synthetic_tax_document",
      "uiPlacement": "hidden_derived",
      "userOverrideAllowed": false,
      "defaultIsSynthetic": true,
      "confidenceImpactUntilConfirmed": "low"
    },
    {
      "inputKey": "approved_rerz_designation",
      "value": false,
      "sourceFileId": "taxfile_gm_factory_zero_2026_mi_rz_review_memo",
      "sourceStrategy": "synthetic_tax_document",
      "uiPlacement": "admin_only",
      "userOverrideAllowed": false,
      "defaultIsSynthetic": true,
      "confidenceImpactUntilConfirmed": "high"
    },
    {
      "inputKey": "qualified_company_operations",
      "value": false,
      "sourceFileId": "taxfile_gm_factory_zero_2026_mi_rz_review_memo",
      "sourceStrategy": "synthetic_tax_document",
      "uiPlacement": "organization_profile",
      "userOverrideAllowed": false,
      "defaultIsSynthetic": true,
      "confidenceImpactUntilConfirmed": "high"
    },
    {
      "inputKey": "eligible_state_education_tax_cents",
      "value": 324000000,
      "sourceFileId": "taxfile_gm_factory_zero_2026_wayne_property_bill",
      "sourceStrategy": "synthetic_tax_document",
      "uiPlacement": "property_tax_profile",
      "userOverrideAllowed": true,
      "defaultIsSynthetic": true,
      "confidenceImpactUntilConfirmed": "high"
    },
    {
      "inputKey": "eligible_real_property_tax_cents",
      "value": 1889000000,
      "sourceFileId": "taxfile_gm_factory_zero_2026_wayne_property_bill",
      "sourceStrategy": "synthetic_tax_document",
      "uiPlacement": "property_tax_profile",
      "userOverrideAllowed": true,
      "defaultIsSynthetic": true,
      "confidenceImpactUntilConfirmed": "high"
    },
    {
      "inputKey": "eligible_personal_property_tax_cents",
      "value": 742000000,
      "sourceFileId": "taxfile_gm_factory_zero_2026_wayne_property_bill",
      "sourceStrategy": "synthetic_tax_document",
      "uiPlacement": "property_tax_profile",
      "userOverrideAllowed": true,
      "defaultIsSynthetic": true,
      "confidenceImpactUntilConfirmed": "high"
    },
    {
      "inputKey": "eligible_local_income_tax_cents",
      "value": 118000000,
      "sourceFileId": "taxfile_gm_factory_zero_2026_detroit_income_tax_workpaper",
      "sourceStrategy": "synthetic_tax_document",
      "uiPlacement": "tax_profile",
      "userOverrideAllowed": true,
      "defaultIsSynthetic": true,
      "confidenceImpactUntilConfirmed": "high"
    }
  ],
  "existingTaxOpportunitySpecificInputs": [
    {
      "opportunityId": "SOURCE_DSIRE:dsire_program_id:3216",
      "inputKey": "approved_rerz_designation",
      "value": false,
      "sourceFileId": "taxfile_gm_factory_zero_2026_mi_rz_review_memo",
      "estimateStatusIfUsed": "suppressed",
      "includeInUserFacingTotalBeforeConfirmation": false,
      "notes": "No approved Renewable Energy Renaissance Zone designation is identified."
    },
    {
      "opportunityId": "SOURCE_DSIRE:dsire_program_id:3216",
      "inputKey": "qualified_company_operations",
      "value": false,
      "sourceFileId": "taxfile_gm_factory_zero_2026_mi_rz_review_memo",
      "estimateStatusIfUsed": "suppressed",
      "includeInUserFacingTotalBeforeConfirmation": false,
      "notes": "EV manufacturing is not treated as approved renewable-energy company operations without program documents."
    },
    {
      "opportunityId": "SOURCE_DSIRE:dsire_program_id:3216",
      "inputKey": "eligible_state_education_tax_cents",
      "value": 324000000,
      "sourceFileId": "taxfile_gm_factory_zero_2026_wayne_property_bill",
      "estimateStatusIfUsed": "needs_assessor_review",
      "includeInUserFacingTotalBeforeConfirmation": false,
      "notes": "Line is included for review only; no total before approved-zone confirmation."
    },
    {
      "opportunityId": "SOURCE_DSIRE:dsire_program_id:3216",
      "inputKey": "eligible_real_property_tax_cents",
      "value": 1889000000,
      "sourceFileId": "taxfile_gm_factory_zero_2026_wayne_property_bill",
      "estimateStatusIfUsed": "needs_assessor_review",
      "includeInUserFacingTotalBeforeConfirmation": false,
      "notes": "Line is included for review only; no total before approved-zone confirmation."
    },
    {
      "opportunityId": "SOURCE_DSIRE:dsire_program_id:3216",
      "inputKey": "eligible_personal_property_tax_cents",
      "value": 742000000,
      "sourceFileId": "taxfile_gm_factory_zero_2026_wayne_property_bill",
      "estimateStatusIfUsed": "needs_assessor_review",
      "includeInUserFacingTotalBeforeConfirmation": false,
      "notes": "Line is included for review only; no total before approved-zone confirmation."
    },
    {
      "opportunityId": "SOURCE_DSIRE:dsire_program_id:3216",
      "inputKey": "eligible_local_income_tax_cents",
      "value": 118000000,
      "sourceFileId": "taxfile_gm_factory_zero_2026_detroit_income_tax_workpaper",
      "estimateStatusIfUsed": "needs_accountant_review",
      "includeInUserFacingTotalBeforeConfirmation": false,
      "notes": "Line is included for review only; no total before approved-zone and accountant confirmation."
    },
    {
      "opportunityId": "SOURCE_DSIRE:dsire_program_id:3216",
      "inputKey": "phaseout_multiplier",
      "value": 0,
      "sourceFileId": "taxfile_gm_factory_zero_2026_mi_rz_review_memo",
      "estimateStatusIfUsed": "suppressed",
      "includeInUserFacingTotalBeforeConfirmation": false,
      "notes": "Set to zero because no approved zone term or program year was identified."
    }
  ],
  "retrofitSummaries": [
    {
      "retrofitTypeId": "biomass_biogas_energy_system",
      "displayName": "Biomass / biogas energy system",
      "parentCategory": "solar_renewable_electricity",
      "opportunityCount": 3,
      "savingsPreview": {
        "status": "calculated",
        "upfrontCostCents": 9000000,
        "assumptions": [
          "Admin test-case fixture uses fixed project inputs until real project inputs are collected.",
          "No source-backed OpportunityIncentiveRule or v2 calculation package matched this retrofit preview, so opportunity savings are shown as $0.",
          "This is not a customer quote or final savings estimate."
        ]
      }
    },
    {
      "retrofitTypeId": "ev_charger_installation",
      "displayName": "EV charger installation",
      "parentCategory": "ev_charging_transportation",
      "opportunityCount": 2,
      "savingsPreview": {
        "status": "calculated",
        "upfrontCostCents": 848000,
        "assumptions": [
          "Admin test-case fixture uses fixed project inputs until real project inputs are collected.",
          "Opportunity savings use source-backed incentive rules and reviewed v2 calculation packages when a matched rule is complete enough to include.",
          "This is not a customer quote or final savings estimate."
        ]
      },
      "grantOpportunityIds": [
        "SOURCE_DSIRE:dsire_program_id:22647"
      ]
    },
    {
      "retrofitTypeId": "ground_source_geothermal_heat_pump",
      "displayName": "Ground-source / geothermal heat pump",
      "parentCategory": "hvac_space_conditioning",
      "opportunityCount": 2,
      "savingsPreview": {
        "status": "calculated",
        "upfrontCostCents": 1576000,
        "assumptions": [
          "Admin test-case fixture uses fixed project inputs until real project inputs are collected.",
          "No source-backed OpportunityIncentiveRule or v2 calculation package matched this retrofit preview, so opportunity savings are shown as $0.",
          "This is not a customer quote or final savings estimate."
        ]
      }
    },
    {
      "retrofitTypeId": "solar_water_heating_system",
      "displayName": "Solar water heating system",
      "parentCategory": "water_heating",
      "opportunityCount": 1,
      "savingsPreview": {
        "status": "calculated",
        "upfrontCostCents": 680000,
        "assumptions": [
          "Admin test-case fixture uses fixed project inputs until real project inputs are collected.",
          "No source-backed OpportunityIncentiveRule or v2 calculation package matched this retrofit preview, so opportunity savings are shown as $0.",
          "This is not a customer quote or final savings estimate."
        ]
      }
    },
    {
      "retrofitTypeId": "combined_heat_and_power_system",
      "displayName": "Combined heat and power system",
      "parentCategory": "solar_renewable_electricity",
      "opportunityCount": 1,
      "savingsPreview": {
        "status": "calculated",
        "upfrontCostCents": 12000000,
        "assumptions": [
          "Admin test-case fixture uses fixed project inputs until real project inputs are collected.",
          "No source-backed OpportunityIncentiveRule or v2 calculation package matched this retrofit preview, so opportunity savings are shown as $0.",
          "This is not a customer quote or final savings estimate."
        ]
      }
    },
    {
      "retrofitTypeId": "engineering_feasibility_study",
      "displayName": "Engineering feasibility study",
      "parentCategory": "audits_studies_planning",
      "opportunityCount": 1,
      "savingsPreview": {
        "status": "unsupported"
      }
    },
    {
      "retrofitTypeId": "high_efficiency_hvac_replacement",
      "displayName": "High-efficiency HVAC replacement",
      "parentCategory": "hvac_space_conditioning",
      "opportunityCount": 1,
      "savingsPreview": {
        "status": "calculated",
        "upfrontCostCents": 798000,
        "assumptions": [
          "HVAC preview uses an admin-modeled annual kWh reduction until equipment-specific efficiency inputs are collected.",
          "Admin test-case fixture uses fixed project inputs until real project inputs are collected.",
          "No source-backed OpportunityIncentiveRule or v2 calculation package matched this retrofit preview, so opportunity savings are shown as $0.",
          "This is not a customer quote or final savings estimate."
        ]
      }
    },
    {
      "retrofitTypeId": "led_lighting_retrofit",
      "displayName": "LED lighting retrofit",
      "parentCategory": "lighting",
      "opportunityCount": 1,
      "savingsPreview": {
        "status": "calculated",
        "upfrontCostCents": 160425,
        "assumptions": [
          "LED preview assumes 12 fixture replacements with fixed operating hours and fixture costs.",
          "Admin test-case fixture uses fixed project inputs until real project inputs are collected.",
          "No source-backed OpportunityIncentiveRule or v2 calculation package matched this retrofit preview, so opportunity savings are shown as $0.",
          "This is not a customer quote or final savings estimate."
        ]
      }
    },
    {
      "retrofitTypeId": "small_wind_turbine",
      "displayName": "Small wind turbine",
      "parentCategory": "solar_renewable_electricity",
      "opportunityCount": 1,
      "savingsPreview": {
        "status": "calculated",
        "upfrontCostCents": 8000000,
        "assumptions": [
          "Admin test-case fixture uses fixed project inputs until real project inputs are collected.",
          "No source-backed OpportunityIncentiveRule or v2 calculation package matched this retrofit preview, so opportunity savings are shown as $0.",
          "This is not a customer quote or final savings estimate."
        ]
      }
    }
  ],
  "grantRelatedMatches": [
    {
      "retrofitTypeId": "ev_charger_installation",
      "displayName": "EV charger installation",
      "grantOpportunities": [
        {
          "opportunityId": "SOURCE_DSIRE:dsire_program_id:22647",
          "opportunityName": "Michigan - National Electric Vehicle Infrastructure (NEVI) Formula Grant Program",
          "sourceUrl": "https://programs.dsireusa.org/system/program/detail/22647/michigan-national-electric-vehicle-infrastructure-nevi-formula-grant-program",
          "websiteUrl": "https://www.michigan.gov/mdot/travel/mobility/initiatives/nevi",
          "applicationUrl": "https://www.michigan.gov/mdot/business/contractors/innovativecontracting/national-electric-vehicle-infrastructure-3",
          "eligibilityStatus": "eligible",
          "availabilityStatus": "active",
          "programType": "Grant Program",
          "administrator": "Michigan Department of Transportation",
          "state": "MI",
          "rankScore": 100,
          "opportunityDataConfidence": 0.79,
          "matchedReasons": [
            "Opportunity appears active.",
            "Project site state MI matches opportunity geography.",
            "Opportunity explicitly has no electric utility restriction.",
            "Applicant type overlaps eligible sector: industrial.",
            "Site or facility type is not applicable to this opportunity.",
            "Opportunity technology is available for retrofit discovery: ev_charging, fleet_electrification, clean_transportation."
          ]
        }
      ]
    }
  ],
  "blockers": [
    {
      "value": "User site or facility type (industrial_manufacturing) does not match broad_residential eligibility.",
      "count": 553
    },
    {
      "value": "User site or facility type (industrial_manufacturing) does not match broad_commercial eligibility.",
      "count": 362
    },
    {
      "value": "Project site state MI does not match opportunity geography CA.",
      "count": 176
    },
    {
      "value": "Project site state MI does not match opportunity geography MN.",
      "count": 112
    },
    {
      "value": "Opportunity appears residential-only and the user profile is nonresidential.",
      "count": 93
    },
    {
      "value": "Project site state MI does not match opportunity geography CO.",
      "count": 74
    },
    {
      "value": "Project site state MI does not match opportunity geography MA.",
      "count": 70
    },
    {
      "value": "Project site state MI does not match opportunity geography OR.",
      "count": 70
    },
    {
      "value": "Project site state MI does not match opportunity geography TX.",
      "count": 67
    },
    {
      "value": "Opportunity site or facility specificity (multifamily_residential) does not match the user's site type (industrial_manufacturing).",
      "count": 65
    },
    {
      "value": "Project site state MI does not match opportunity geography WA.",
      "count": 61
    },
    {
      "value": "Project site state MI does not match opportunity geography FL.",
      "count": 55
    },
    {
      "value": "Project site state MI does not match opportunity geography MD.",
      "count": 53
    },
    {
      "value": "Project site state MI does not match opportunity geography IL.",
      "count": 47
    },
    {
      "value": "Project site state MI does not match opportunity geography IN.",
      "count": 46
    },
    {
      "value": "Project site state MI does not match opportunity geography PA.",
      "count": 46
    },
    {
      "value": "Project site state MI does not match opportunity geography NY.",
      "count": 43
    },
    {
      "value": "Project site state MI does not match opportunity geography NC.",
      "count": 40
    },
    {
      "value": "Opportunity site or facility specificity (agricultural_facility) does not match the user's site type (industrial_manufacturing).",
      "count": 38
    },
    {
      "value": "Opportunity site or facility specificity (education_campus) does not match the user's site type (industrial_manufacturing).",
      "count": 38
    }
  ]
}
```

## Inputs To Add Where Realistic

Think about these categories, but only add values that make sense for this specific customer:

- project stage, procurement stage, preapproval/application status
- eligible project cost by retrofit
- unit quantities: charger ports, fixtures, HVAC units, system kW, battery kWh, audit/study cost
- selected equipment/measure types and conservative sizing
- applicant facts: nonprofit, public entity, school, state entity, agricultural producer, tribal entity, fleet owner, utility customer, etc.
- ownership/control facts and tenant/landlord constraints
- grant-specific inputs for matched grant opportunities
- explicit nonqualification facts where realistic
- missing quote/bill/application facts that should keep estimates suppressed

## Required Output

Return JSON only. Values are synthetic unless already present in the test case. Amounts must be cents. Use null when the value should remain unknown.

```json
{
  "schemaVersion": "retrofi_test_case_grant_profile_repair.v1",
  "researchedAt": "YYYY-MM-DD",
  "sampleUserId": "gm-factory-zero-detroit",
  "profileConfidence": "high | medium | low",
  "profileNotes": "",
  "organizationFactsToAddOrUpdate": [
    {
      "inputKey": "",
      "value": null,
      "valueType": "number | boolean | text | date | enum | money_cents | array",
      "sourceStrategy": "existing_test_case | synthetic_realistic_default | public_context | should_ask_user | quote_required | application_status_required",
      "confidence": "high | medium | low",
      "userOverrideAllowed": true,
      "reasoning": ""
    }
  ],
  "retrofitProjectInputs": [
    {
      "retrofitTypeId": "",
      "projectScopeSummary": "",
      "inputFacts": [
        {
          "inputKey": "",
          "value": null,
          "valueType": "number | boolean | text | date | enum | money_cents | array",
          "sourceStrategy": "synthetic_realistic_default | derived_from_building_size | derived_from_utility_profile | should_ask_user | quote_required",
          "confidence": "high | medium | low",
          "userOverrideAllowed": true,
          "reasoning": ""
        }
      ],
      "shouldQualifyForTypicalGrants": true,
      "qualificationCaveats": []
    }
  ],
  "grantOpportunitySpecificInputs": [
    {
      "opportunityId": "",
      "expectedHandling": "calculate_if_formula_ready | needs_quote | needs_project_scope | needs_application_status | likely_ineligible | suppress_no_probability_evidence | not_relevant_to_this_profile",
      "inputFacts": [],
      "reasoning": ""
    }
  ],
  "missingInputsThatShouldRemainMissing": [
    {
      "inputKey": "",
      "reason": "quote not available | application not submitted | source requires agency approval | unrealistic for this customer | needs user decision"
    }
  ],
  "doNotForceQualificationReasons": []
}
```
