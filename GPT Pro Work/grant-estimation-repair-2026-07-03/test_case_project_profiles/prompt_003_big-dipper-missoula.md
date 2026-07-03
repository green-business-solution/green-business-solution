You are helping RetroFi create realistic synthetic project-profile data for grant estimation tests.

Prompt 3 of 50.

This is NOT source research for grant formulas. This is project/test-case enrichment. Use the supplied test-case facts, public/common-sense building assumptions, and realistic project planning assumptions. You may use the organization's public website only for basic context, but do not invent that a project qualifies for a grant just to make the estimate positive.

## Goal

Add realistic synthetic project-profile inputs for this test case so Codex can calculate or suppress grant estimates. The profile should look like a real customer record: some projects should qualify, some should not, some should need quote data, and some should have uncertainty.

Do not make every grant barely qualify. If the organization/building/project would not normally pursue a grant, mark that honestly.

## Current Test Case Context

```json
{
  "sampleUserId": "big-dipper-missoula",
  "description": "Small Missoula ice-cream shop with freezer and refrigeration loads.",
  "sourceForm": {
    "sampleUserId": "big-dipper-missoula",
    "description": "Small Missoula ice-cream shop with freezer and refrigeration loads.",
    "companyName": "Big Dipper Ice Cream - Missoula",
    "website": "https://www.bigdippericecream.com/",
    "organizationType": "Commercial Business",
    "organizationSize": "1-10 employees",
    "siteAddress": "631 S Higgins Avenue, Missoula, MT 59801, USA",
    "electricUtilityProvider": "NorthWestern Energy",
    "gasUtilityProvider": "NorthWestern Energy",
    "ownershipStatus": "Lease",
    "buildingType": "Restaurant / Commercial Kitchen",
    "squareFootage": "2,000",
    "primaryActivityText": "Retail ice-cream sales, frozen-product storage, and small-scale food preparation",
    "naicsCodes": [
      "722515",
      "311520"
    ],
    "publicSourceNotes": "Big Dipper lists its Missoula shop at 631 S Higgins Avenue. Floor area is estimated.",
    "notes": "Tests small-business refrigeration logic in a colder-climate IOU territory with likely tenant control limitations.",
    "project": {
      "stage": "exploring"
    }
  },
  "normalizedProfile": {
    "site": {
      "addressStructured": {
        "raw": "631 S Higgins Avenue, Missoula, MT 59801, USA",
        "stateCode": "MT",
        "zip5": "59801"
      },
      "geo": {
        "stateCode": "MT",
        "zip5": "59801",
        "countyFips": null,
        "placeGeoid": null,
        "censusTractGeoid": null,
        "designations": []
      },
      "utility": {
        "electric": {
          "selfReportedName": "NorthWestern Energy",
          "distributionUtilityId": "UTIL_NORTHWESTERN",
          "territoryCandidates": [
            "UTIL_NORTHWESTERN"
          ],
          "verificationStatus": "self_reported_unverified",
          "customerClass": null
        }
      },
      "ownershipRelationship": "tenant",
      "buildingTypes": [
        "restaurant_foodservice"
      ],
      "squareFootage": {
        "value": 2000,
        "raw": "2,000",
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
      "fixed_gas_charge",
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
      "total_electric_cost",
      "total_gas_cost",
      "total_waste_cost",
      "total_water_cost",
      "utility_provider",
      "waste_hauler",
      "water_provider",
      "water_unit"
    ],
    "latestUtilityProvider": "Republic Services",
    "annualKwh": 78000,
    "annualElectricCost": 10050,
    "averageCostPerKwh": 0.1288,
    "utilitySummaries": [
      {
        "utilityCategory": "electric",
        "annualCost": 10050
      },
      {
        "utilityCategory": "gas",
        "annualCost": 1700
      },
      {
        "utilityCategory": "water_sewer",
        "annualCost": 1100
      },
      {
        "utilityCategory": "waste",
        "annualCost": 4200
      }
    ]
  },
  "siteTaxProfile": {
    "availableFieldIds": [
      "state_code",
      "naics_primary",
      "annual_gross_receipts_cents",
      "refrigeration_equipment_asset_basis_cents",
      "leased_square_footage",
      "lease_property_tax_cam_pass_through_cents",
      "direct_property_tax_bill_to_applicant"
    ]
  },
  "existingTaxFacts": [
    {
      "inputKey": "state_code",
      "value": "MT",
      "sourceFileId": "taxfile_batch2_018_mt_business_tax_summary_2026",
      "sourceStrategy": "synthetic_tax_document",
      "uiPlacement": "hidden_derived",
      "userOverrideAllowed": false,
      "defaultIsSynthetic": true,
      "confidenceImpactUntilConfirmed": "low"
    },
    {
      "inputKey": "ownership_status",
      "value": "Lease",
      "sourceFileId": "taxfile_batch2_018_lease_cam_tax_reconciliation_2026",
      "sourceStrategy": "synthetic_tax_document",
      "uiPlacement": "organization_profile",
      "userOverrideAllowed": true,
      "defaultIsSynthetic": true,
      "confidenceImpactUntilConfirmed": "low"
    },
    {
      "inputKey": "primary_business_activity",
      "value": "retail_ice_cream_food_service_and_frozen_storage",
      "sourceFileId": "taxfile_batch2_018_mt_business_tax_summary_2026",
      "sourceStrategy": "synthetic_tax_document",
      "uiPlacement": "organization_profile",
      "userOverrideAllowed": true,
      "defaultIsSynthetic": true,
      "confidenceImpactUntilConfirmed": "medium"
    },
    {
      "inputKey": "annual_gross_receipts_cents",
      "value": 72000000,
      "sourceFileId": "taxfile_batch2_018_mt_business_tax_summary_2026",
      "sourceStrategy": "accountant_review",
      "uiPlacement": "tax_profile",
      "userOverrideAllowed": true,
      "defaultIsSynthetic": true,
      "confidenceImpactUntilConfirmed": "high"
    },
    {
      "inputKey": "lease_property_tax_pass_through_cents",
      "value": 980000,
      "sourceFileId": "taxfile_batch2_018_lease_cam_tax_reconciliation_2026",
      "sourceStrategy": "accountant_review",
      "uiPlacement": "property_tax_profile",
      "userOverrideAllowed": true,
      "defaultIsSynthetic": true,
      "confidenceImpactUntilConfirmed": "high"
    },
    {
      "inputKey": "taxpayer_has_direct_property_tax_bill",
      "value": false,
      "sourceFileId": "taxfile_batch2_018_lease_cam_tax_reconciliation_2026",
      "sourceStrategy": "synthetic_tax_document",
      "uiPlacement": "property_tax_profile",
      "userOverrideAllowed": true,
      "defaultIsSynthetic": true,
      "confidenceImpactUntilConfirmed": "medium"
    }
  ],
  "retrofitSummaries": [
    {
      "retrofitTypeId": "biomass_biogas_energy_system",
      "displayName": "Biomass / biogas energy system",
      "parentCategory": "solar_renewable_electricity",
      "opportunityCount": 6,
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
      "opportunityCount": 6,
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
      "opportunityCount": 5,
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
      "retrofitTypeId": "solar_water_heating_system",
      "displayName": "Solar water heating system",
      "parentCategory": "water_heating",
      "opportunityCount": 5,
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
      "retrofitTypeId": "high_efficiency_hvac_replacement",
      "displayName": "High-efficiency HVAC replacement",
      "parentCategory": "hvac_space_conditioning",
      "opportunityCount": 3,
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
      "retrofitTypeId": "battery_storage_system",
      "displayName": "Battery storage system",
      "parentCategory": "energy_storage_resilience",
      "opportunityCount": 3,
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
      "retrofitTypeId": "insulation_upgrade",
      "displayName": "Insulation upgrade",
      "parentCategory": "building_envelope",
      "opportunityCount": 2,
      "savingsPreview": {
        "status": "calculated",
        "upfrontCostCents": 316000,
        "assumptions": [
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
      "retrofitTypeId": "low_flow_fixture_retrofit",
      "displayName": "Low-flow fixture retrofit",
      "parentCategory": "water_efficiency",
      "opportunityCount": 1,
      "savingsPreview": {
        "status": "calculated",
        "upfrontCostCents": 116400,
        "assumptions": [
          "Admin test-case fixture uses fixed project inputs until real project inputs are collected.",
          "Opportunity savings use source-backed incentive rules and reviewed v2 calculation packages when a matched rule is complete enough to include.",
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
      "retrofitTypeId": "lighting_controls_retrofit",
      "displayName": "Lighting controls retrofit",
      "parentCategory": "lighting",
      "opportunityCount": 1,
      "savingsPreview": {
        "status": "calculated",
        "upfrontCostCents": 132200,
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
    },
    {
      "retrofitTypeId": "waste_heat_recovery",
      "displayName": "Waste heat recovery",
      "parentCategory": "compressed_air_industrial",
      "opportunityCount": 1,
      "savingsPreview": {
        "status": "calculated",
        "upfrontCostCents": 636000,
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
      "value": "User site or facility type (restaurant_foodservice) does not match broad_residential eligibility.",
      "count": 553
    },
    {
      "value": "Project site state MT does not match opportunity geography CA.",
      "count": 176
    },
    {
      "value": "Project site state MT does not match opportunity geography MN.",
      "count": 112
    },
    {
      "value": "Opportunity appears residential-only and the user profile is nonresidential.",
      "count": 93
    },
    {
      "value": "Project site state MT does not match opportunity geography CO.",
      "count": 74
    },
    {
      "value": "Project site state MT does not match opportunity geography MA.",
      "count": 70
    },
    {
      "value": "Project site state MT does not match opportunity geography OR.",
      "count": 70
    },
    {
      "value": "Project site state MT does not match opportunity geography TX.",
      "count": 67
    },
    {
      "value": "Opportunity site or facility specificity (multifamily_residential) does not match the user's site type (restaurant_foodservice).",
      "count": 65
    },
    {
      "value": "Project site state MT does not match opportunity geography WA.",
      "count": 61
    },
    {
      "value": "Project site state MT does not match opportunity geography FL.",
      "count": 55
    },
    {
      "value": "Project site state MT does not match opportunity geography MD.",
      "count": 53
    },
    {
      "value": "Project site state MT does not match opportunity geography IL.",
      "count": 47
    },
    {
      "value": "Project site state MT does not match opportunity geography IN.",
      "count": 46
    },
    {
      "value": "Project site state MT does not match opportunity geography PA.",
      "count": 46
    },
    {
      "value": "Project site state MT does not match opportunity geography NY.",
      "count": 43
    },
    {
      "value": "Project site state MT does not match opportunity geography NC.",
      "count": 40
    },
    {
      "value": "Opportunity site or facility specificity (agricultural_facility) does not match the user's site type (restaurant_foodservice).",
      "count": 38
    },
    {
      "value": "Opportunity site or facility specificity (education_campus) does not match the user's site type (restaurant_foodservice).",
      "count": 38
    },
    {
      "value": "Project site state MT does not match opportunity geography VT.",
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
  "sampleUserId": "big-dipper-missoula",
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
