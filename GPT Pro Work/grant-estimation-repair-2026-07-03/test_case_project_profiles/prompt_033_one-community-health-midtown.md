You are helping RetroFi create realistic synthetic project-profile data for grant estimation tests.

Prompt 33 of 50.

This is NOT source research for grant formulas. This is project/test-case enrichment. Use the supplied test-case facts, public/common-sense building assumptions, and realistic project planning assumptions. You may use the organization's public website only for basic context, but do not invent that a project qualifies for a grant just to make the estimate positive.

## Goal

Add realistic synthetic project-profile inputs for this test case so Codex can calculate or suppress grant estimates. The profile should look like a real customer record: some projects should qualify, some should not, some should need quote data, and some should have uncertainty.

Do not make every grant barely qualify. If the organization/building/project would not normally pursue a grant, mark that honestly.

## Current Test Case Context

```json
{
  "sampleUserId": "one-community-health-midtown",
  "description": "Sacramento nonprofit community health center with SMUD electric service and PG&E gas service.",
  "sourceForm": {
    "sampleUserId": "one-community-health-midtown",
    "description": "Sacramento nonprofit community health center with SMUD electric service and PG&E gas service.",
    "companyName": "One Community Health - Midtown Campus",
    "website": "https://onecommunityhealth.com/locations/midtown-campus/",
    "organizationType": "Nonprofit Organization",
    "organizationSize": "51-250 employees",
    "siteAddress": "1500 21st Street, Sacramento, CA 95811, USA",
    "electricUtilityProvider": "Sacramento Municipal Utility District",
    "gasUtilityProvider": "Pacific Gas and Electric Company",
    "ownershipStatus": "Not sure",
    "buildingType": "Medical / Healthcare",
    "squareFootage": "59,000",
    "primaryActivityText": "Outpatient primary care, dental care, behavioral health, pharmacy, laboratory, and community-health services",
    "naicsCodes": [
      "621498",
      "621210",
      "456110"
    ],
    "publicSourceNotes": "Official location materials identify the Midtown Campus address; organizational reports describe about 59,000 square feet occupied in Midtown buildings.",
    "notes": "Nonprofit healthcare case. Use SMUD for electric programs and PG&E only for gas-side eligibility.",
    "project": {
      "stage": "exploring"
    }
  },
  "normalizedProfile": {
    "site": {
      "addressStructured": {
        "raw": "1500 21st Street, Sacramento, CA 95811, USA",
        "stateCode": "CA",
        "zip5": "95811"
      },
      "geo": {
        "stateCode": "CA",
        "zip5": "95811",
        "countyFips": null,
        "placeGeoid": null,
        "censusTractGeoid": null,
        "designations": []
      },
      "utility": {
        "electric": {
          "selfReportedName": "Sacramento Municipal Utility District",
          "distributionUtilityId": "UTIL_SMUD",
          "territoryCandidates": [
            "UTIL_SMUD"
          ],
          "verificationStatus": "self_reported_unverified",
          "customerClass": null
        }
      },
      "ownershipRelationship": "unknown",
      "buildingTypes": [
        "healthcare"
      ],
      "squareFootage": {
        "value": 59000,
        "raw": "59,000",
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
    "latestUtilityProvider": "Republic Services",
    "annualKwh": 1357000,
    "annualElectricCost": 230690,
    "averageCostPerKwh": 0.17,
    "utilitySummaries": [
      {
        "utilityCategory": "electric",
        "annualCost": 230690
      },
      {
        "utilityCategory": "gas",
        "annualCost": 55165
      },
      {
        "utilityCategory": "water_sewer",
        "annualCost": 14300
      },
      {
        "utilityCategory": "waste",
        "annualCost": 34200
      }
    ]
  },
  "siteTaxProfile": {
    "availableFieldIds": [
      "total_assessed_value_before_exemption_cents",
      "welfare_exemption_value_cents",
      "net_taxable_value_cents",
      "annual_property_tax_due_cents",
      "exemption_percent",
      "building_square_feet"
    ]
  },
  "existingTaxFacts": [
    {
      "inputKey": "property_tax_jurisdiction",
      "value": "Sacramento County, CA",
      "sourceFileId": "synthetic_tax_file_one_community_health_midtown_2026_property_tax_bill",
      "sourceStrategy": "synthetic_tax_document",
      "uiPlacement": "property_tax_profile",
      "userOverrideAllowed": true,
      "defaultIsSynthetic": true,
      "confidenceImpactUntilConfirmed": "medium"
    },
    {
      "inputKey": "nonprofit_property_tax_exemption_claimed",
      "value": true,
      "sourceFileId": "synthetic_tax_file_one_community_health_midtown_2026_nonprofit_exemption_notice",
      "sourceStrategy": "assessor_review",
      "uiPlacement": "property_tax_profile",
      "userOverrideAllowed": true,
      "defaultIsSynthetic": true,
      "confidenceImpactUntilConfirmed": "high"
    },
    {
      "inputKey": "annual_property_tax_due_cents",
      "value": 5175000,
      "sourceFileId": "synthetic_tax_file_one_community_health_midtown_2026_property_tax_bill",
      "sourceStrategy": "synthetic_tax_document",
      "uiPlacement": "property_tax_profile",
      "userOverrideAllowed": true,
      "defaultIsSynthetic": true,
      "confidenceImpactUntilConfirmed": "high"
    },
    {
      "inputKey": "exemption_percent",
      "value": 85,
      "sourceFileId": "synthetic_tax_file_one_community_health_midtown_2026_nonprofit_exemption_notice",
      "sourceStrategy": "assessor_review",
      "uiPlacement": "property_tax_profile",
      "userOverrideAllowed": true,
      "defaultIsSynthetic": true,
      "confidenceImpactUntilConfirmed": "high"
    }
  ],
  "retrofitSummaries": [
    {
      "retrofitTypeId": "ev_charger_installation",
      "displayName": "EV charger installation",
      "parentCategory": "ev_charging_transportation",
      "opportunityCount": 5,
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
        "SOURCE_CA_ENERGY_COMMISSION:cec_solicitation_number:GFO-25-605",
        "SOURCE_DSIRE:dsire_program_id:22629",
        "SOURCE_CA_ENERGY_COMMISSION:cec_solicitation_number:GFO-25-603"
      ]
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
      "retrofitTypeId": "battery_storage_system",
      "displayName": "Battery storage system",
      "parentCategory": "energy_storage_resilience",
      "opportunityCount": 3,
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
      "retrofitTypeId": "high_efficiency_hvac_replacement",
      "displayName": "High-efficiency HVAC replacement",
      "parentCategory": "hvac_space_conditioning",
      "opportunityCount": 4,
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
      "retrofitTypeId": "heat_pump_water_heater",
      "displayName": "Heat pump water heater",
      "parentCategory": "water_heating",
      "opportunityCount": 2,
      "savingsPreview": {
        "status": "calculated",
        "upfrontCostCents": 350000,
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
      "retrofitTypeId": "dc_fast_charger_installation",
      "displayName": "DC fast charger installation",
      "parentCategory": "ev_charging_transportation",
      "opportunityCount": 1,
      "savingsPreview": {
        "status": "calculated",
        "upfrontCostCents": 4140000,
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
      "retrofitTypeId": "induction_cooking_equipment",
      "displayName": "Induction cooking equipment",
      "parentCategory": "commercial_kitchen_foodservice",
      "opportunityCount": 1,
      "savingsPreview": {
        "status": "calculated",
        "upfrontCostCents": 232800,
        "assumptions": [
          "Admin test-case fixture uses fixed project inputs until real project inputs are collected.",
          "Opportunity savings use source-backed incentive rules and reviewed v2 calculation packages when a matched rule is complete enough to include.",
          "This is not a customer quote or final savings estimate."
        ]
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
      "retrofitTypeId": "leed_certification",
      "displayName": "LEED certification",
      "parentCategory": "certifications_compliance",
      "opportunityCount": 1,
      "savingsPreview": {
        "status": "unsupported"
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
    }
  ],
  "grantRelatedMatches": [
    {
      "retrofitTypeId": "ev_charger_installation",
      "displayName": "EV charger installation",
      "grantOpportunities": [
        {
          "opportunityId": "SOURCE_CA_ENERGY_COMMISSION:cec_solicitation_number:GFO-25-605",
          "opportunityName": "GFO-25-605 – Reliable Electric Charging for Eligible School-bus Sites (RECESS)",
          "sourceUrl": "https://www.energy.ca.gov/solicitations/2026-04/gfo-25-605-reliable-electric-charging-eligible-school-bus-sites-recess",
          "websiteUrl": "https://www.energy.ca.gov/solicitations/2026-04/gfo-25-605-reliable-electric-charging-eligible-school-bus-sites-recess",
          "applicationUrl": "https://ecams.energy.ca.gov/s/login/",
          "eligibilityStatus": "eligible",
          "availabilityStatus": "active",
          "programType": "Grant",
          "administrator": "California Energy Commission",
          "state": "CA",
          "rankScore": 100,
          "opportunityDataConfidence": 0.8,
          "matchedReasons": [
            "Opportunity appears active.",
            "Project site state CA matches opportunity geography.",
            "Opportunity explicitly has no electric utility restriction.",
            "Applicant type overlaps eligible sector: nonprofit.",
            "User site is compatible with broad commercial facility eligibility.",
            "Opportunity technology is available for retrofit discovery: ev_charging, fleet_electrification, clean_transportation."
          ]
        },
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
            "Applicant type overlaps eligible sector: nonprofit.",
            "Site or facility type is not applicable to this opportunity.",
            "Opportunity technology is available for retrofit discovery: ev_charging, fleet_electrification, clean_transportation."
          ]
        },
        {
          "opportunityId": "SOURCE_CA_ENERGY_COMMISSION:cec_solicitation_number:GFO-25-603",
          "opportunityName": "GFO-25-603 - California’s National Electric Vehicle Infrastructure Formula Program – Solicitation 6 Community Charging",
          "sourceUrl": "https://www.energy.ca.gov/solicitations/2026-02/gfo-25-603-californias-national-electric-vehicle-infrastructure-formula",
          "websiteUrl": "https://www.energy.ca.gov/solicitations/2026-02/gfo-25-603-californias-national-electric-vehicle-infrastructure-formula",
          "applicationUrl": "https://ecams.energy.ca.gov/s/login/",
          "eligibilityStatus": "eligible",
          "availabilityStatus": "active",
          "programType": "Grant",
          "administrator": "California Energy Commission",
          "state": "CA",
          "rankScore": 100,
          "opportunityDataConfidence": 0.77,
          "matchedReasons": [
            "Opportunity appears active.",
            "Project site state CA matches opportunity geography.",
            "Opportunity explicitly has no electric utility restriction.",
            "Applicant type overlaps eligible sector: nonprofit.",
            "User site is compatible with broad commercial facility eligibility.",
            "Opportunity technology is available for retrofit discovery: ev_charging, fleet_electrification."
          ]
        }
      ]
    }
  ],
  "blockers": [
    {
      "value": "User site or facility type (healthcare) does not match broad_residential eligibility.",
      "count": 553
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
      "value": "Opportunity site or facility specificity (multifamily_residential) does not match the user's site type (healthcare).",
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
      "value": "Opportunity site or facility specificity (agricultural_facility) does not match the user's site type (healthcare).",
      "count": 38
    },
    {
      "value": "Opportunity site or facility specificity (education_campus) does not match the user's site type (healthcare).",
      "count": 38
    },
    {
      "value": "Project site state CA does not match opportunity geography VT.",
      "count": 37
    },
    {
      "value": "Project site state CA does not match opportunity geography MO.",
      "count": 36
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
  "sampleUserId": "one-community-health-midtown",
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
