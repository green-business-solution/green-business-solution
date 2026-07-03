You are helping RetroFi create realistic synthetic project-profile data for grant estimation tests.

Prompt 36 of 50.

This is NOT source research for grant formulas. This is project/test-case enrichment. Use the supplied test-case facts, public/common-sense building assumptions, and realistic project planning assumptions. You may use the organization's public website only for basic context, but do not invent that a project qualifies for a grant just to make the estimate positive.

## Goal

Add realistic synthetic project-profile inputs for this test case so Codex can calculate or suppress grant estimates. The profile should look like a real customer record: some projects should qualify, some should not, some should need quote data, and some should have uncertainty.

Do not make every grant barely qualify. If the organization/building/project would not normally pursue a grant, mark that honestly.

## Current Test Case Context

```json
{
  "sampleUserId": "portland-food-coop-maine",
  "description": "Portland Maine urban grocery co-op with refrigeration and cold-climate gas utility ambiguity.",
  "sourceForm": {
    "sampleUserId": "portland-food-coop-maine",
    "description": "Portland Maine urban grocery co-op with refrigeration and cold-climate gas utility ambiguity.",
    "companyName": "Portland Food Co-op",
    "website": "https://www.portlandfood.coop/",
    "organizationType": "Commercial Business",
    "organizationSize": "51-250 employees",
    "siteAddress": "290 Congress Street, Portland, ME 04101, USA",
    "electricUtilityProvider": "Central Maine Power",
    "gasUtilityProvider": "Unitil / Northern Utilities",
    "ownershipStatus": "Lease",
    "buildingType": "Grocery / Convenience / Cold Storage",
    "squareFootage": "10,000",
    "primaryActivityText": "Retail grocery sales, local food merchandising, refrigerated foods, and prepared foods",
    "naicsCodes": [
      "445110"
    ],
    "publicSourceNotes": "Portland Food Co-op lists 290 Congress Street in Portland. Floor area is estimated.",
    "notes": "Tests a cold-climate grocery in Central Maine Power territory with gas utility ambiguity after Maine gas-market changes.",
    "project": {
      "stage": "exploring"
    }
  },
  "normalizedProfile": {
    "site": {
      "addressStructured": {
        "raw": "290 Congress Street, Portland, ME 04101, USA",
        "stateCode": "ME",
        "zip5": "04101"
      },
      "geo": {
        "stateCode": "ME",
        "zip5": "04101",
        "countyFips": null,
        "placeGeoid": null,
        "censusTractGeoid": null,
        "designations": []
      },
      "utility": {
        "electric": {
          "selfReportedName": "Central Maine Power",
          "distributionUtilityId": "UTIL_CMP",
          "territoryCandidates": [
            "UTIL_CMP"
          ],
          "verificationStatus": "self_reported_unverified",
          "customerClass": null
        }
      },
      "ownershipRelationship": "tenant",
      "buildingTypes": [
        "grocery_food_retail"
      ],
      "squareFootage": {
        "value": 10000,
        "raw": "10,000",
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
      "demand_charge_rate",
      "demand_charges",
      "gas_rate_schedule",
      "gas_utility_provider",
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
    "latestUtilityProvider": "ecomaine / Casella Waste Systems",
    "annualKwh": 430000,
    "annualElectricCost": 64500,
    "averageCostPerKwh": 0.15,
    "utilitySummaries": [
      {
        "utilityCategory": "electric",
        "annualCost": 64500
      },
      {
        "utilityCategory": "gas",
        "annualCost": 24750
      },
      {
        "utilityCategory": "water_sewer",
        "annualCost": 6200
      },
      {
        "utilityCategory": "waste",
        "annualCost": 20900
      }
    ]
  },
  "siteTaxProfile": {
    "availableFieldIds": [
      "taxpayer_name",
      "property_owner_name",
      "assessor_parcel_number",
      "leasehold_status",
      "building_area_square_feet",
      "tenant_allocated_assessed_value",
      "tenant_allocated_property_tax_cents",
      "annual_gross_sales_cents",
      "taxable_sales_cents",
      "sales_tax_remitted_cents"
    ]
  },
  "existingTaxFacts": [
    {
      "inputKey": "state_code",
      "value": "ME",
      "sourceFileId": "taxfile_026_portland_food_coop_me_property_tax_bill_2026",
      "sourceStrategy": "synthetic_tax_document",
      "uiPlacement": "hidden_derived",
      "userOverrideAllowed": false,
      "defaultIsSynthetic": true,
      "confidenceImpactUntilConfirmed": "low"
    },
    {
      "inputKey": "ownership_status",
      "value": "Lease",
      "sourceFileId": "taxfile_026_portland_food_coop_me_property_tax_bill_2026",
      "sourceStrategy": "synthetic_tax_document",
      "uiPlacement": "property_tax_profile",
      "userOverrideAllowed": true,
      "defaultIsSynthetic": true,
      "confidenceImpactUntilConfirmed": "medium"
    },
    {
      "inputKey": "annual_property_tax_cents",
      "value": 2639000,
      "sourceFileId": "taxfile_026_portland_food_coop_me_property_tax_bill_2026",
      "sourceStrategy": "synthetic_tax_document",
      "uiPlacement": "property_tax_profile",
      "userOverrideAllowed": true,
      "defaultIsSynthetic": true,
      "confidenceImpactUntilConfirmed": "high"
    },
    {
      "inputKey": "taxable_sales_cents",
      "value": 118000000,
      "sourceFileId": "taxfile_026_portland_food_coop_me_sales_tax_workpaper_2026",
      "sourceStrategy": "synthetic_tax_document",
      "uiPlacement": "tax_profile",
      "userOverrideAllowed": true,
      "defaultIsSynthetic": true,
      "confidenceImpactUntilConfirmed": "high"
    }
  ],
  "existingTaxOpportunitySpecificInputs": [
    {
      "opportunityId": "SOURCE_DSIRE:dsire_program_id:381",
      "inputKey": "qualifying_solar_b_and_o_classification",
      "value": null,
      "sourceFileId": "",
      "estimateStatusIfUsed": "suppressed",
      "includeInUserFacingTotalBeforeConfirmation": false,
      "notes": "Suppressed because this Maine grocery tenant is not a Washington solar manufacturing taxpayer."
    },
    {
      "opportunityId": "SOURCE_DSIRE:dsire_program_id:22798",
      "inputKey": "ac_kw_capacity",
      "value": null,
      "sourceFileId": "",
      "estimateStatusIfUsed": "suppressed",
      "includeInUserFacingTotalBeforeConfirmation": false,
      "notes": "Suppressed because the Rhode Island renewable property-tax valuation workflow does not apply to a Maine site."
    },
    {
      "opportunityId": "SOURCE_DSIRE:dsire_program_id:3216",
      "inputKey": "approved_rerz_designation",
      "value": false,
      "sourceFileId": "taxfile_026_portland_food_coop_me_property_tax_bill_2026",
      "estimateStatusIfUsed": "suppressed",
      "includeInUserFacingTotalBeforeConfirmation": false,
      "notes": "Suppressed because the Michigan Renewable Energy Renaissance Zone workflow does not apply to a Maine site."
    }
  ],
  "retrofitSummaries": [
    {
      "retrofitTypeId": "ev_charger_installation",
      "displayName": "EV charger installation",
      "parentCategory": "ev_charging_transportation",
      "opportunityCount": 3,
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
        "SOURCE_DSIRE:dsire_program_id:22783"
      ]
    },
    {
      "retrofitTypeId": "high_efficiency_hvac_replacement",
      "displayName": "High-efficiency HVAC replacement",
      "parentCategory": "hvac_space_conditioning",
      "opportunityCount": 5,
      "savingsPreview": {
        "status": "calculated",
        "upfrontCostCents": 798000,
        "assumptions": [
          "HVAC preview uses an admin-modeled annual kWh reduction until equipment-specific efficiency inputs are collected.",
          "Admin test-case fixture uses fixed project inputs until real project inputs are collected.",
          "Opportunity savings use source-backed incentive rules and reviewed v2 calculation packages when a matched rule is complete enough to include.",
          "This is not a customer quote or final savings estimate."
        ]
      }
    },
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
          "Opportunity savings use source-backed incentive rules and reviewed v2 calculation packages when a matched rule is complete enough to include.",
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
      "retrofitTypeId": "ground_source_geothermal_heat_pump",
      "displayName": "Ground-source / geothermal heat pump",
      "parentCategory": "hvac_space_conditioning",
      "opportunityCount": 3,
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
      "retrofitTypeId": "battery_storage_system",
      "displayName": "Battery storage system",
      "parentCategory": "energy_storage_resilience",
      "opportunityCount": 2,
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
      "retrofitTypeId": "combined_heat_and_power_system",
      "displayName": "Combined heat and power system",
      "parentCategory": "solar_renewable_electricity",
      "opportunityCount": 2,
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
      "retrofitTypeId": "heat_pump_hvac_retrofit",
      "displayName": "Heat pump HVAC retrofit",
      "parentCategory": "hvac_space_conditioning",
      "opportunityCount": 2,
      "savingsPreview": {
        "status": "calculated",
        "upfrontCostCents": 1172000,
        "assumptions": [
          "Admin test-case fixture uses fixed project inputs until real project inputs are collected.",
          "Opportunity savings use source-backed incentive rules and reviewed v2 calculation packages when a matched rule is complete enough to include.",
          "This is not a customer quote or final savings estimate."
        ]
      }
    },
    {
      "retrofitTypeId": "solar_water_heating_system",
      "displayName": "Solar water heating system",
      "parentCategory": "water_heating",
      "opportunityCount": 2,
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
      "retrofitTypeId": "air_sealing_weatherization",
      "displayName": "Air sealing / weatherization",
      "parentCategory": "building_envelope",
      "opportunityCount": 1,
      "savingsPreview": {
        "status": "calculated",
        "upfrontCostCents": 194600,
        "assumptions": [
          "Admin test-case fixture uses fixed project inputs until real project inputs are collected.",
          "Opportunity savings use source-backed incentive rules and reviewed v2 calculation packages when a matched rule is complete enough to include.",
          "This is not a customer quote or final savings estimate."
        ]
      }
    },
    {
      "retrofitTypeId": "energy_recovery_ventilation_retrofit",
      "displayName": "Energy recovery ventilation retrofit",
      "parentCategory": "hvac_space_conditioning",
      "opportunityCount": 1,
      "savingsPreview": {
        "status": "calculated",
        "upfrontCostCents": 370800,
        "assumptions": [
          "Admin test-case fixture uses fixed project inputs until real project inputs are collected.",
          "Opportunity savings use source-backed incentive rules and reviewed v2 calculation packages when a matched rule is complete enough to include.",
          "This is not a customer quote or final savings estimate."
        ]
      }
    },
    {
      "retrofitTypeId": "heat_pump_water_heater",
      "displayName": "Heat pump water heater",
      "parentCategory": "water_heating",
      "opportunityCount": 1,
      "savingsPreview": {
        "status": "calculated",
        "upfrontCostCents": 350000,
        "assumptions": [
          "Admin test-case fixture uses fixed project inputs until real project inputs are collected.",
          "No source-backed OpportunityIncentiveRule or v2 calculation package matched this retrofit preview, so opportunity savings are shown as $0.",
          "This is not a customer quote or final savings estimate."
        ]
      }
    },
    {
      "retrofitTypeId": "high_efficiency_laundry_equipment",
      "displayName": "High-efficiency laundry equipment",
      "parentCategory": "water_efficiency",
      "opportunityCount": 1,
      "savingsPreview": {
        "status": "calculated",
        "upfrontCostCents": 307600,
        "assumptions": [
          "Admin test-case fixture uses fixed project inputs until real project inputs are collected.",
          "No source-backed OpportunityIncentiveRule or v2 calculation package matched this retrofit preview, so opportunity savings are shown as $0.",
          "This is not a customer quote or final savings estimate."
        ]
      }
    },
    {
      "retrofitTypeId": "high_efficiency_refrigeration_equipment",
      "displayName": "High-efficiency refrigeration equipment",
      "parentCategory": "refrigeration",
      "opportunityCount": 1,
      "savingsPreview": {
        "status": "calculated",
        "upfrontCostCents": 345000,
        "assumptions": [
          "Admin test-case fixture uses fixed project inputs until real project inputs are collected.",
          "Opportunity savings use source-backed incentive rules and reviewed v2 calculation packages when a matched rule is complete enough to include.",
          "This is not a customer quote or final savings estimate."
        ]
      }
    },
    {
      "retrofitTypeId": "level_2_ev_charger_installation",
      "displayName": "Level 2 EV charger installation",
      "parentCategory": "ev_charging_transportation",
      "opportunityCount": 1,
      "savingsPreview": {
        "status": "calculated",
        "upfrontCostCents": 848000,
        "assumptions": [
          "Admin test-case fixture uses fixed project inputs until real project inputs are collected.",
          "Opportunity savings use source-backed incentive rules and reviewed v2 calculation packages when a matched rule is complete enough to include.",
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
      "retrofitTypeId": "variable_frequency_drive_retrofit",
      "displayName": "Variable frequency drive retrofit",
      "parentCategory": "motors_pumps_fans_drives",
      "opportunityCount": 1,
      "savingsPreview": {
        "status": "calculated",
        "upfrontCostCents": 212000,
        "assumptions": [
          "Admin test-case fixture uses fixed project inputs until real project inputs are collected.",
          "Opportunity savings use source-backed incentive rules and reviewed v2 calculation packages when a matched rule is complete enough to include.",
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
          "opportunityId": "SOURCE_DSIRE:dsire_program_id:22783",
          "opportunityName": "Public Charger Grants",
          "sourceUrl": "https://programs.dsireusa.org/system/program/detail/22783/public-charger-grants",
          "websiteUrl": "https://www.efficiencymaine.com/opportunities/",
          "applicationUrl": "https://www.efficiencymaine.com/rfp-em-008-2026/",
          "eligibilityStatus": "eligible",
          "availabilityStatus": "active",
          "programType": "Grant Program",
          "administrator": "Efficiency Maine",
          "state": "ME",
          "rankScore": 100,
          "opportunityDataConfidence": 0.79,
          "matchedReasons": [
            "Opportunity appears active.",
            "Project site state ME matches opportunity geography.",
            "Utility provider is not applicable to this opportunity.",
            "Applicant type overlaps eligible sector: commercial.",
            "Site or facility type matches: grocery_food_retail.",
            "Opportunity technology is available for retrofit discovery: ev_charging."
          ]
        }
      ]
    }
  ],
  "blockers": [
    {
      "value": "User site or facility type (grocery_food_retail) does not match broad_residential eligibility.",
      "count": 553
    },
    {
      "value": "Project site state ME does not match opportunity geography CA.",
      "count": 176
    },
    {
      "value": "Project site state ME does not match opportunity geography MN.",
      "count": 112
    },
    {
      "value": "Opportunity appears residential-only and the user profile is nonresidential.",
      "count": 93
    },
    {
      "value": "Project site state ME does not match opportunity geography CO.",
      "count": 74
    },
    {
      "value": "Project site state ME does not match opportunity geography MA.",
      "count": 70
    },
    {
      "value": "Project site state ME does not match opportunity geography OR.",
      "count": 70
    },
    {
      "value": "Project site state ME does not match opportunity geography TX.",
      "count": 67
    },
    {
      "value": "Opportunity site or facility specificity (multifamily_residential) does not match the user's site type (grocery_food_retail).",
      "count": 65
    },
    {
      "value": "Project site state ME does not match opportunity geography WA.",
      "count": 61
    },
    {
      "value": "Project site state ME does not match opportunity geography FL.",
      "count": 55
    },
    {
      "value": "Project site state ME does not match opportunity geography MD.",
      "count": 53
    },
    {
      "value": "Project site state ME does not match opportunity geography IL.",
      "count": 47
    },
    {
      "value": "Project site state ME does not match opportunity geography IN.",
      "count": 46
    },
    {
      "value": "Project site state ME does not match opportunity geography PA.",
      "count": 46
    },
    {
      "value": "Project site state ME does not match opportunity geography NY.",
      "count": 43
    },
    {
      "value": "Project site state ME does not match opportunity geography NC.",
      "count": 40
    },
    {
      "value": "Opportunity site or facility specificity (agricultural_facility) does not match the user's site type (grocery_food_retail).",
      "count": 38
    },
    {
      "value": "Opportunity site or facility specificity (education_campus) does not match the user's site type (grocery_food_retail).",
      "count": 38
    },
    {
      "value": "Project site state ME does not match opportunity geography VT.",
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
  "sampleUserId": "portland-food-coop-maine",
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
