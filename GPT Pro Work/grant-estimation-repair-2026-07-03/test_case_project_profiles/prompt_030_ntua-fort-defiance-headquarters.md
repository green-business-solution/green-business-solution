You are helping RetroFi create realistic synthetic project-profile data for grant estimation tests.

Prompt 30 of 50.

This is NOT source research for grant formulas. This is project/test-case enrichment. Use the supplied test-case facts, public/common-sense building assumptions, and realistic project planning assumptions. You may use the organization's public website only for basic context, but do not invent that a project qualifies for a grant just to make the estimate positive.

## Goal

Add realistic synthetic project-profile inputs for this test case so Codex can calculate or suppress grant estimates. The profile should look like a real customer record: some projects should qualify, some should not, some should need quote data, and some should have uncertainty.

Do not make every grant barely qualify. If the organization/building/project would not normally pursue a grant, mark that honestly.

## Current Test Case Context

```json
{
  "sampleUserId": "ntua-fort-defiance-headquarters",
  "description": "Navajo Tribal Utility Authority headquarters where the applicant is also the electric distribution utility.",
  "sourceForm": {
    "sampleUserId": "ntua-fort-defiance-headquarters",
    "description": "Navajo Tribal Utility Authority headquarters where the applicant is also the electric distribution utility.",
    "companyName": "Navajo Tribal Utility Authority Headquarters",
    "website": "https://www.ntua.com/",
    "organizationType": "Government / Public Agency",
    "organizationSize": "251-1,000 employees",
    "siteAddress": "Indian Route 12, Fort Defiance, AZ 86504, USA",
    "electricUtilityProvider": "Navajo Tribal Utility Authority",
    "gasUtilityProvider": "Navajo Tribal Utility Authority",
    "ownershipStatus": "Own",
    "buildingType": "Office / Administrative",
    "squareFootage": "Unknown",
    "primaryActivityText": "Tribal electric, water, wastewater, natural gas, telecommunications, off-grid solar, and utility operations",
    "naicsCodes": [
      "221122",
      "221210",
      "221310",
      "221320"
    ],
    "publicSourceNotes": "NTUA is a tribally owned multi-utility enterprise serving the Navajo Nation. Public records identify a headquarters complex in Fort Defiance.",
    "notes": "Tests a tribal utility as both applicant and distribution utility, tribal and rural funding overlays, and possible program exclusions for utility-owned assets.",
    "project": {
      "stage": "exploring"
    }
  },
  "normalizedProfile": {
    "site": {
      "addressStructured": {
        "raw": "Indian Route 12, Fort Defiance, AZ 86504, USA",
        "stateCode": "AZ",
        "zip5": "86504"
      },
      "geo": {
        "stateCode": "AZ",
        "zip5": "86504",
        "countyFips": null,
        "placeGeoid": null,
        "censusTractGeoid": null,
        "designations": []
      },
      "utility": {
        "electric": {
          "selfReportedName": "Navajo Tribal Utility Authority",
          "distributionUtilityId": "UTIL_NTUA",
          "territoryCandidates": [
            "UTIL_NTUA"
          ],
          "verificationStatus": "self_reported_unverified",
          "customerClass": null
        }
      },
      "ownershipRelationship": "owner",
      "buildingTypes": [
        "office_admin"
      ],
      "squareFootage": {
        "value": null,
        "raw": "Unknown",
        "parsingStatus": "needs_validation"
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
    "latestUtilityProvider": "NTUA facilities contracted waste and recycling haulers",
    "annualKwh": 1660000,
    "annualElectricCost": 195880,
    "averageCostPerKwh": 0.118,
    "utilitySummaries": [
      {
        "utilityCategory": "electric",
        "annualCost": 195880
      },
      {
        "utilityCategory": "gas",
        "annualCost": 95550
      },
      {
        "utilityCategory": "water_sewer",
        "annualCost": 14200
      },
      {
        "utilityCategory": "waste",
        "annualCost": 36000
      }
    ]
  },
  "siteTaxProfile": {
    "availableFieldIds": [
      "owner_name",
      "property_tax_account_status",
      "assessed_reference_value_cents",
      "taxable_assessed_value_cents",
      "annual_property_tax_due_cents",
      "tribal_utility_tax_status",
      "applicant_is_distribution_utility",
      "tribal_utility_gross_operating_revenue_cents",
      "utility_tax_or_fee_due_cents",
      "gas_and_electric_provider_same_as_applicant",
      "state_code"
    ]
  },
  "existingTaxFacts": [
    {
      "inputKey": "state_code",
      "value": "AZ",
      "sourceFileId": "taxfile_050_ntua_fort_defiance_headquarters_02",
      "sourceStrategy": "synthetic_tax_document",
      "uiPlacement": "hidden_derived",
      "userOverrideAllowed": false,
      "defaultIsSynthetic": true,
      "confidenceImpactUntilConfirmed": "low"
    },
    {
      "inputKey": "site_ownership_status",
      "value": "Own",
      "sourceFileId": "taxfile_050_ntua_fort_defiance_headquarters_01",
      "sourceStrategy": "synthetic_tax_document",
      "uiPlacement": "organization_profile",
      "userOverrideAllowed": true,
      "defaultIsSynthetic": true,
      "confidenceImpactUntilConfirmed": "medium"
    },
    {
      "inputKey": "building_square_footage",
      "value": null,
      "sourceFileId": "",
      "sourceStrategy": "assessor_review",
      "uiPlacement": "property_tax_profile",
      "userOverrideAllowed": true,
      "defaultIsSynthetic": true,
      "confidenceImpactUntilConfirmed": "high"
    },
    {
      "inputKey": "property_tax_status",
      "value": "tribal_utility_property_non_taxable_or_exempt_review_required",
      "sourceFileId": "taxfile_050_ntua_fort_defiance_headquarters_02",
      "sourceStrategy": "synthetic_tax_document",
      "uiPlacement": "property_tax_profile",
      "userOverrideAllowed": true,
      "defaultIsSynthetic": true,
      "confidenceImpactUntilConfirmed": "high"
    },
    {
      "inputKey": "tribal_utility_tax_status",
      "value": true,
      "sourceFileId": "taxfile_050_ntua_fort_defiance_headquarters_01",
      "sourceStrategy": "synthetic_tax_document",
      "uiPlacement": "organization_profile",
      "userOverrideAllowed": true,
      "defaultIsSynthetic": true,
      "confidenceImpactUntilConfirmed": "high"
    },
    {
      "inputKey": "applicant_is_distribution_utility",
      "value": true,
      "sourceFileId": "taxfile_050_ntua_fort_defiance_headquarters_03",
      "sourceStrategy": "synthetic_tax_document",
      "uiPlacement": "organization_profile",
      "userOverrideAllowed": true,
      "defaultIsSynthetic": true,
      "confidenceImpactUntilConfirmed": "high"
    },
    {
      "inputKey": "gross_receipts_or_utility_tax_review_required",
      "value": true,
      "sourceFileId": "taxfile_050_ntua_fort_defiance_headquarters_03",
      "sourceStrategy": "synthetic_tax_document",
      "uiPlacement": "tax_profile",
      "userOverrideAllowed": true,
      "defaultIsSynthetic": true,
      "confidenceImpactUntilConfirmed": "high"
    },
    {
      "inputKey": "state_and_local_tax_jurisdiction_review_required",
      "value": true,
      "sourceFileId": "taxfile_050_ntua_fort_defiance_headquarters_01",
      "sourceStrategy": "synthetic_tax_document",
      "uiPlacement": "admin_only",
      "userOverrideAllowed": false,
      "defaultIsSynthetic": true,
      "confidenceImpactUntilConfirmed": "high"
    },
    {
      "inputKey": "retrofi_supplied_target_state_match",
      "value": false,
      "sourceFileId": "taxfile_050_ntua_fort_defiance_headquarters_02",
      "sourceStrategy": "synthetic_tax_document",
      "uiPlacement": "hidden_derived",
      "userOverrideAllowed": false,
      "defaultIsSynthetic": true,
      "confidenceImpactUntilConfirmed": "low"
    }
  ],
  "existingTaxOpportunitySpecificInputs": [
    {
      "opportunityId": "SOURCE_DSIRE:dsire_program_id:3216",
      "inputKey": "approved_rerz_designation",
      "value": false,
      "sourceFileId": "taxfile_050_ntua_fort_defiance_headquarters_01",
      "estimateStatusIfUsed": "suppressed",
      "includeInUserFacingTotalBeforeConfirmation": false,
      "notes": "Suppress Michigan Renewable Energy Renaissance Zone treatment because the synthetic site state is AZ, not Michigan, and no approved Michigan zone designation document is present."
    },
    {
      "opportunityId": "SOURCE_DSIRE:dsire_program_id:22798",
      "inputKey": "municipality",
      "value": "Fort Defiance, AZ",
      "sourceFileId": "taxfile_050_ntua_fort_defiance_headquarters_02",
      "estimateStatusIfUsed": "suppressed",
      "includeInUserFacingTotalBeforeConfirmation": false,
      "notes": "Suppress Rhode Island renewable property-tax valuation because the synthetic site is in AZ, not Rhode Island."
    },
    {
      "opportunityId": "SOURCE_DSIRE:dsire_program_id:381",
      "inputKey": "qualifying_solar_b_and_o_classification",
      "value": "not_applicable_out_of_state_and_no_synthetic_solar_manufacturing_activity",
      "sourceFileId": "taxfile_050_ntua_fort_defiance_headquarters_01",
      "estimateStatusIfUsed": "suppressed",
      "includeInUserFacingTotalBeforeConfirmation": false,
      "notes": "Suppress Washington solar-manufacturing B&O treatment because the synthetic site is in AZ, not Washington, and the profile does not include a WA solar manufacturing B&O tax return."
    }
  ],
  "retrofitSummaries": [
    {
      "retrofitTypeId": "biomass_biogas_energy_system",
      "displayName": "Biomass / biogas energy system",
      "parentCategory": "solar_renewable_electricity",
      "opportunityCount": 4,
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
      "retrofitTypeId": "ground_source_geothermal_heat_pump",
      "displayName": "Ground-source / geothermal heat pump",
      "parentCategory": "hvac_space_conditioning",
      "opportunityCount": 4,
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
      "retrofitTypeId": "led_lighting_retrofit",
      "displayName": "LED lighting retrofit",
      "parentCategory": "lighting",
      "opportunityCount": 4,
      "savingsPreview": {
        "status": "calculated",
        "upfrontCostCents": 160425,
        "assumptions": [
          "LED preview assumes 12 fixture replacements with fixed operating hours and fixture costs.",
          "Admin test-case fixture uses fixed project inputs until real project inputs are collected.",
          "Opportunity savings use source-backed incentive rules and reviewed v2 calculation packages when a matched rule is complete enough to include.",
          "This is not a customer quote or final savings estimate."
        ]
      }
    },
    {
      "retrofitTypeId": "combined_heat_and_power_system",
      "displayName": "Combined heat and power system",
      "parentCategory": "solar_renewable_electricity",
      "opportunityCount": 3,
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
      "retrofitTypeId": "high_efficiency_hvac_replacement",
      "displayName": "High-efficiency HVAC replacement",
      "parentCategory": "hvac_space_conditioning",
      "opportunityCount": 2,
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
      "retrofitTypeId": "solar_water_heating_system",
      "displayName": "Solar water heating system",
      "parentCategory": "water_heating",
      "opportunityCount": 3,
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
      "retrofitTypeId": "battery_storage_system",
      "displayName": "Battery storage system",
      "parentCategory": "energy_storage_resilience",
      "opportunityCount": 1,
      "savingsPreview": {
        "status": "calculated",
        "upfrontCostCents": 7280000,
        "assumptions": [
          "Admin test-case fixture uses fixed project inputs until real project inputs are collected.",
          "No source-backed OpportunityIncentiveRule or v2 calculation package matched this retrofit preview, so opportunity savings are shown as $0.",
          "This is not a customer quote or final savings estimate."
        ]
      }
    },
    {
      "retrofitTypeId": "microgrid_system",
      "displayName": "Microgrid system",
      "parentCategory": "energy_storage_resilience",
      "opportunityCount": 1,
      "savingsPreview": {
        "status": "calculated",
        "upfrontCostCents": 10920000,
        "assumptions": [
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
    },
    {
      "retrofitTypeId": "submetering_energy_monitoring",
      "displayName": "Submetering / energy monitoring system",
      "parentCategory": "building_controls_energy_management",
      "opportunityCount": 1,
      "savingsPreview": {
        "status": "calculated",
        "upfrontCostCents": 84800,
        "assumptions": [
          "Admin test-case fixture uses fixed project inputs until real project inputs are collected.",
          "No source-backed OpportunityIncentiveRule or v2 calculation package matched this retrofit preview, so opportunity savings are shown as $0.",
          "This is not a customer quote or final savings estimate."
        ]
      }
    },
    {
      "retrofitTypeId": "thermal_energy_storage",
      "displayName": "Thermal energy storage",
      "parentCategory": "energy_storage_resilience",
      "opportunityCount": 1,
      "savingsPreview": {
        "status": "calculated",
        "upfrontCostCents": 5510000,
        "assumptions": [
          "Admin test-case fixture uses fixed project inputs until real project inputs are collected.",
          "No source-backed OpportunityIncentiveRule or v2 calculation package matched this retrofit preview, so opportunity savings are shown as $0.",
          "This is not a customer quote or final savings estimate."
        ]
      }
    },
    {
      "retrofitTypeId": "window_replacement",
      "displayName": "Window replacement",
      "parentCategory": "building_envelope",
      "opportunityCount": 1,
      "savingsPreview": {
        "status": "calculated",
        "upfrontCostCents": 444000,
        "assumptions": [
          "Admin test-case fixture uses fixed project inputs until real project inputs are collected.",
          "No source-backed OpportunityIncentiveRule or v2 calculation package matched this retrofit preview, so opportunity savings are shown as $0.",
          "This is not a customer quote or final savings estimate."
        ]
      }
    }
  ],
  "blockers": [
    {
      "value": "User site or facility type (office_admin) does not match broad_residential eligibility.",
      "count": 553
    },
    {
      "value": "Project site state AZ does not match opportunity geography CA.",
      "count": 176
    },
    {
      "value": "Project site state AZ does not match opportunity geography MN.",
      "count": 112
    },
    {
      "value": "Opportunity appears residential-only and the user profile is nonresidential.",
      "count": 93
    },
    {
      "value": "Project site state AZ does not match opportunity geography CO.",
      "count": 74
    },
    {
      "value": "Project site state AZ does not match opportunity geography MA.",
      "count": 70
    },
    {
      "value": "Project site state AZ does not match opportunity geography OR.",
      "count": 70
    },
    {
      "value": "Project site state AZ does not match opportunity geography TX.",
      "count": 67
    },
    {
      "value": "Opportunity site or facility specificity (multifamily_residential) does not match the user's site type (office_admin).",
      "count": 65
    },
    {
      "value": "Project site state AZ does not match opportunity geography WA.",
      "count": 61
    },
    {
      "value": "Project site state AZ does not match opportunity geography FL.",
      "count": 55
    },
    {
      "value": "Project site state AZ does not match opportunity geography MD.",
      "count": 53
    },
    {
      "value": "Project site state AZ does not match opportunity geography IL.",
      "count": 47
    },
    {
      "value": "Project site state AZ does not match opportunity geography IN.",
      "count": 46
    },
    {
      "value": "Project site state AZ does not match opportunity geography PA.",
      "count": 46
    },
    {
      "value": "Project site state AZ does not match opportunity geography NY.",
      "count": 43
    },
    {
      "value": "Project site state AZ does not match opportunity geography NC.",
      "count": 40
    },
    {
      "value": "Opportunity site or facility specificity (agricultural_facility) does not match the user's site type (office_admin).",
      "count": 38
    },
    {
      "value": "Opportunity site or facility specificity (education_campus) does not match the user's site type (office_admin).",
      "count": 38
    },
    {
      "value": "Project site state AZ does not match opportunity geography VT.",
      "count": 37
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
  "sampleUserId": "ntua-fort-defiance-headquarters",
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
