You are helping RetroFi create realistic synthetic project-profile data for grant estimation tests.

Prompt 15 of 50.

This is NOT source research for grant formulas. This is project/test-case enrichment. Use the supplied test-case facts, public/common-sense building assumptions, and realistic project planning assumptions. You may use the organization's public website only for basic context, but do not invent that a project qualifies for a grant just to make the estimate positive.

## Goal

Add realistic synthetic project-profile inputs for this test case so Codex can calculate or suppress grant estimates. The profile should look like a real customer record: some projects should qualify, some should not, some should need quote data, and some should have uncertainty.

Do not make every grant barely qualify. If the organization/building/project would not normally pursue a grant, mark that honestly.

## Current Test Case Context

```json
{
  "sampleUserId": "fender-corona-plant",
  "description": "Corona musical-instrument manufacturing plant in SCE electric and SoCalGas gas territory.",
  "sourceForm": {
    "sampleUserId": "fender-corona-plant",
    "description": "Corona musical-instrument manufacturing plant in SCE electric and SoCalGas gas territory.",
    "companyName": "Fender Musical Instruments Corporation - Corona Manufacturing Plant",
    "website": "https://www.fender.com/pages/about-fmic",
    "organizationType": "Industrial Facility",
    "organizationSize": "251-1,000 employees",
    "siteAddress": "311 Cessna Circle, Corona, CA 92880, USA",
    "electricUtilityProvider": "Southern California Edison",
    "gasUtilityProvider": "Southern California Gas Company",
    "ownershipStatus": "Not sure",
    "buildingType": "Industrial / Manufacturing",
    "squareFootage": "181,593",
    "primaryActivityText": "Manufacturing, finishing, assembly, testing, warehousing, and distribution of musical instruments",
    "naicsCodes": [
      "339992"
    ],
    "publicSourceNotes": "Public sources identify Fender's manufacturing plant at 311 Cessna Circle; property records report about 181,593 square feet.",
    "notes": "Process-heavy manufacturing case. Distinguish calculated industrial measures from prescriptive building upgrades.",
    "project": {
      "stage": "exploring"
    }
  },
  "normalizedProfile": {
    "site": {
      "addressStructured": {
        "raw": "311 Cessna Circle, Corona, CA 92880, USA",
        "stateCode": "CA",
        "zip5": "92880"
      },
      "geo": {
        "stateCode": "CA",
        "zip5": "92880",
        "countyFips": null,
        "placeGeoid": null,
        "censusTractGeoid": null,
        "designations": []
      },
      "utility": {
        "electric": {
          "selfReportedName": "Southern California Edison",
          "distributionUtilityId": "UTIL_SCE",
          "territoryCandidates": [
            "UTIL_SCE"
          ],
          "verificationStatus": "self_reported_unverified",
          "customerClass": null
        }
      },
      "ownershipRelationship": "unknown",
      "buildingTypes": [
        "industrial_manufacturing"
      ],
      "squareFootage": {
        "value": 181593,
        "raw": "181,593",
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
      "monthly_therms",
      "monthly_water_use",
      "organics_service_cost",
      "overage_fees",
      "peak_kw",
      "pickup_frequency",
      "rate_schedule",
      "recycling_service_cost",
      "service_address",
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
    "latestUtilityProvider": "Waste Management",
    "annualKwh": 4540000,
    "annualElectricCost": 771800,
    "averageCostPerKwh": 0.17,
    "utilitySummaries": [
      {
        "utilityCategory": "electric",
        "annualCost": 771800
      },
      {
        "utilityCategory": "gas",
        "annualCost": 188800
      },
      {
        "utilityCategory": "water_sewer",
        "annualCost": 19600
      },
      {
        "utilityCategory": "waste",
        "annualCost": 80400
      }
    ]
  },
  "siteTaxProfile": {
    "availableFieldIds": [
      "total_real_property_assessed_value_cents",
      "annual_real_property_tax_due_cents",
      "business_personal_property_assessed_value_cents",
      "manufacturing_equipment_assessed_value_cents",
      "building_square_feet",
      "effective_property_tax_rate_percent"
    ]
  },
  "existingTaxFacts": [
    {
      "inputKey": "property_tax_jurisdiction",
      "value": "Riverside County, CA",
      "sourceFileId": "synthetic_tax_file_fender_corona_2026_property_tax_bill",
      "sourceStrategy": "synthetic_tax_document",
      "uiPlacement": "property_tax_profile",
      "userOverrideAllowed": true,
      "defaultIsSynthetic": true,
      "confidenceImpactUntilConfirmed": "medium"
    },
    {
      "inputKey": "annual_real_property_tax_due_cents",
      "value": 46350500,
      "sourceFileId": "synthetic_tax_file_fender_corona_2026_property_tax_bill",
      "sourceStrategy": "synthetic_tax_document",
      "uiPlacement": "property_tax_profile",
      "userOverrideAllowed": true,
      "defaultIsSynthetic": true,
      "confidenceImpactUntilConfirmed": "medium"
    },
    {
      "inputKey": "business_personal_property_assessed_value_cents",
      "value": 1910000000,
      "sourceFileId": "synthetic_tax_file_fender_corona_2026_business_property_statement",
      "sourceStrategy": "synthetic_tax_document",
      "uiPlacement": "property_tax_profile",
      "userOverrideAllowed": true,
      "defaultIsSynthetic": true,
      "confidenceImpactUntilConfirmed": "medium"
    },
    {
      "inputKey": "manufacturing_equipment_assessed_value_cents",
      "value": 1260000000,
      "sourceFileId": "synthetic_tax_file_fender_corona_2026_business_property_statement",
      "sourceStrategy": "synthetic_tax_document",
      "uiPlacement": "property_tax_profile",
      "userOverrideAllowed": true,
      "defaultIsSynthetic": true,
      "confidenceImpactUntilConfirmed": "medium"
    }
  ],
  "retrofitSummaries": [
    {
      "retrofitTypeId": "battery_storage_system",
      "displayName": "Battery storage system",
      "parentCategory": "energy_storage_resilience",
      "opportunityCount": 6,
      "savingsPreview": {
        "status": "calculated",
        "upfrontCostCents": 7280000,
        "assumptions": [
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
      "opportunityCount": 5,
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
        "SOURCE_DSIRE:dsire_program_id:22629",
        "SOURCE_DSIRE:dsire_program_id:22149"
      ]
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
      "retrofitTypeId": "rooftop_solar_pv",
      "displayName": "Rooftop solar PV",
      "parentCategory": "solar_renewable_electricity",
      "opportunityCount": 2,
      "savingsPreview": {
        "status": "calculated",
        "upfrontCostCents": 10000000,
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
      "opportunityCount": 2,
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
      "retrofitTypeId": "automated_demand_response_controls",
      "displayName": "Automated demand response controls",
      "parentCategory": "building_controls_energy_management",
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
      "retrofitTypeId": "electric_vehicle_purchase",
      "displayName": "Electric vehicle purchase",
      "parentCategory": "ev_charging_transportation",
      "opportunityCount": 1,
      "savingsPreview": {
        "status": "calculated",
        "upfrontCostCents": 9000000,
        "assumptions": [
          "Fleet preview uses annual mileage, gasoline price, and charging-rate assumptions from the admin test fixture.",
          "Admin test-case fixture uses fixed project inputs until real project inputs are collected.",
          "Opportunity savings use source-backed incentive rules and reviewed v2 calculation packages when a matched rule is complete enough to include.",
          "This is not a customer quote or final savings estimate."
        ]
      },
      "grantOpportunityIds": [
        "SOURCE_DSIRE:dsire_program_id:22149"
      ]
    },
    {
      "retrofitTypeId": "energy_audit",
      "displayName": "Energy audit",
      "parentCategory": "audits_studies_planning",
      "opportunityCount": 1,
      "savingsPreview": {
        "status": "unsupported"
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
      "retrofitTypeId": "insulation_upgrade",
      "displayName": "Insulation upgrade",
      "parentCategory": "building_envelope",
      "opportunityCount": 1,
      "savingsPreview": {
        "status": "calculated",
        "upfrontCostCents": 316000,
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
      "retrofitTypeId": "leed_certification",
      "displayName": "LEED certification",
      "parentCategory": "certifications_compliance",
      "opportunityCount": 1,
      "savingsPreview": {
        "status": "unsupported"
      }
    },
    {
      "retrofitTypeId": "solar_plus_storage_system",
      "displayName": "Solar-plus-storage system",
      "parentCategory": "energy_storage_resilience",
      "opportunityCount": 1,
      "savingsPreview": {
        "status": "calculated",
        "upfrontCostCents": 13080000,
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
          "opportunityId": "SOURCE_DSIRE:dsire_program_id:22629",
          "opportunityName": "California - National Electric Vehicle Infrastructure (NEVI) Formula Grant Program",
          "sourceUrl": "https://programs.dsireusa.org/system/program/detail/22629/california-national-electric-vehicle-infrastructure-nevi-formula-grant-program",
          "websiteUrl": "https://www.energy.ca.gov/programs-and-topics/programs/national-electric-vehicle-infrastructure-nevi-formula-program",
          "eligibilityStatus": "eligible",
          "availabilityStatus": "active",
          "programType": "Competitive EV Infrastructure Grant",
          "administrator": "California Energy Commission and California Department of Transportation",
          "state": "CA",
          "rankScore": 100,
          "opportunityDataConfidence": 0.79,
          "matchedReasons": [
            "Opportunity appears active.",
            "Project site state CA matches opportunity geography.",
            "Utility provider is not applicable to this opportunity.",
            "Nonresidential applicant is compatible with broad commercial eligibility.",
            "Site or facility type is not applicable to this opportunity.",
            "Opportunity technology is available for retrofit discovery: ev_charging, fleet_electrification, clean_transportation."
          ]
        },
        {
          "opportunityId": "SOURCE_DSIRE:dsire_program_id:22149",
          "opportunityName": "Clean Transportation Program",
          "sourceUrl": "https://programs.dsireusa.org/system/program/detail/22149/clean-transportation-program",
          "websiteUrl": "https://www.energy.ca.gov/programs-and-topics/programs/clean-transportation-program",
          "eligibilityStatus": "eligible",
          "availabilityStatus": "active",
          "programType": "Grant Program",
          "administrator": "California Energy Commission",
          "state": "CA",
          "rankScore": 100,
          "opportunityDataConfidence": 0.79,
          "matchedReasons": [
            "Opportunity appears active.",
            "Project site state CA matches opportunity geography.",
            "Utility provider is not applicable to this opportunity.",
            "Nonresidential applicant is compatible with broad commercial eligibility.",
            "Site or facility type matches: industrial_manufacturing.",
            "Opportunity technology is available for retrofit discovery: fleet_electrification, clean_transportation, ev_charging."
          ]
        }
      ]
    },
    {
      "retrofitTypeId": "electric_vehicle_purchase",
      "displayName": "Electric vehicle purchase",
      "grantOpportunities": [
        {
          "opportunityId": "SOURCE_DSIRE:dsire_program_id:22149",
          "opportunityName": "Clean Transportation Program",
          "sourceUrl": "https://programs.dsireusa.org/system/program/detail/22149/clean-transportation-program",
          "websiteUrl": "https://www.energy.ca.gov/programs-and-topics/programs/clean-transportation-program",
          "eligibilityStatus": "eligible",
          "availabilityStatus": "active",
          "programType": "Grant Program",
          "administrator": "California Energy Commission",
          "state": "CA",
          "rankScore": 100,
          "opportunityDataConfidence": 0.79,
          "matchedReasons": [
            "Opportunity appears active.",
            "Project site state CA matches opportunity geography.",
            "Utility provider is not applicable to this opportunity.",
            "Nonresidential applicant is compatible with broad commercial eligibility.",
            "Site or facility type matches: industrial_manufacturing.",
            "Opportunity technology is available for retrofit discovery: fleet_electrification, clean_transportation, ev_charging."
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
      "value": "Project site state CA does not match opportunity geography MN.",
      "count": 112
    },
    {
      "value": "Opportunity appears residential-only and the user profile is nonresidential.",
      "count": 93
    },
    {
      "value": "Project site state CA does not match opportunity geography CO.",
      "count": 74
    },
    {
      "value": "Project site state CA does not match opportunity geography MA.",
      "count": 70
    },
    {
      "value": "Project site state CA does not match opportunity geography OR.",
      "count": 70
    },
    {
      "value": "Project site state CA does not match opportunity geography TX.",
      "count": 67
    },
    {
      "value": "Opportunity site or facility specificity (multifamily_residential) does not match the user's site type (industrial_manufacturing).",
      "count": 65
    },
    {
      "value": "Project site state CA does not match opportunity geography WA.",
      "count": 61
    },
    {
      "value": "Project site state CA does not match opportunity geography FL.",
      "count": 55
    },
    {
      "value": "Project site state CA does not match opportunity geography MD.",
      "count": 53
    },
    {
      "value": "Project site state CA does not match opportunity geography IL.",
      "count": 47
    },
    {
      "value": "Project site state CA does not match opportunity geography IN.",
      "count": 46
    },
    {
      "value": "Project site state CA does not match opportunity geography PA.",
      "count": 46
    },
    {
      "value": "Project site state CA does not match opportunity geography NY.",
      "count": 43
    },
    {
      "value": "Project site state CA does not match opportunity geography NC.",
      "count": 40
    },
    {
      "value": "Opportunity site or facility specificity (agricultural_facility) does not match the user's site type (industrial_manufacturing).",
      "count": 38
    },
    {
      "value": "Opportunity site or facility specificity (education_campus) does not match the user's site type (industrial_manufacturing).",
      "count": 38
    },
    {
      "value": "Project site state CA does not match opportunity geography VT.",
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
  "sampleUserId": "fender-corona-plant",
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
