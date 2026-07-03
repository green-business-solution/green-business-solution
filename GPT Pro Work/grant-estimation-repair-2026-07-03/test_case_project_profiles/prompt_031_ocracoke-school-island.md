You are helping RetroFi create realistic synthetic project-profile data for grant estimation tests.

Prompt 31 of 50.

This is NOT source research for grant formulas. This is project/test-case enrichment. Use the supplied test-case facts, public/common-sense building assumptions, and realistic project planning assumptions. You may use the organization's public website only for basic context, but do not invent that a project qualifies for a grant just to make the estimate positive.

## Goal

Add realistic synthetic project-profile inputs for this test case so Codex can calculate or suppress grant estimates. The profile should look like a real customer record: some projects should qualify, some should not, some should need quote data, and some should have uncertainty.

Do not make every grant barely qualify. If the organization/building/project would not normally pursue a grant, mark that honestly.

## Current Test Case Context

```json
{
  "sampleUserId": "ocracoke-school-island",
  "description": "Remote North Carolina island public school in Tideland EMC territory with no natural gas distribution assumption.",
  "sourceForm": {
    "sampleUserId": "ocracoke-school-island",
    "description": "Remote North Carolina island public school in Tideland EMC territory with no natural gas distribution assumption.",
    "companyName": "Ocracoke School",
    "website": "https://www.hyde.k12.nc.us/o/ocracoke",
    "organizationType": "Government / Public Agency",
    "organizationSize": "11-50 employees",
    "siteAddress": "120 Schoolhouse Road, Ocracoke, NC 27960, USA",
    "electricUtilityProvider": "Tideland Electric Membership Corporation",
    "gasUtilityProvider": "None",
    "ownershipStatus": "Own",
    "buildingType": "School / Education Campus",
    "squareFootage": "19,117",
    "primaryActivityText": "Public K-12 education in a remote island community",
    "naicsCodes": [
      "611110"
    ],
    "publicSourceNotes": "Hyde County Schools identifies Ocracoke School at 120 Schoolhouse Road. Public rebuild coverage estimated 19,117 square feet.",
    "notes": "Tests island and remote-community resilience, electric cooperative territory, no-gas handling, and public school procurement.",
    "project": {
      "stage": "exploring"
    }
  },
  "normalizedProfile": {
    "site": {
      "addressStructured": {
        "raw": "120 Schoolhouse Road, Ocracoke, NC 27960, USA",
        "stateCode": "NC",
        "zip5": "27960"
      },
      "geo": {
        "stateCode": "NC",
        "zip5": "27960",
        "countyFips": null,
        "placeGeoid": null,
        "censusTractGeoid": null,
        "designations": []
      },
      "utility": {
        "electric": {
          "selfReportedName": "Tideland Electric Membership Corporation",
          "distributionUtilityId": "UTIL_TIDELAND_EMC",
          "territoryCandidates": [
            "UTIL_TIDELAND_EMC"
          ],
          "verificationStatus": "self_reported_unverified",
          "customerClass": null
        }
      },
      "ownershipRelationship": "owner",
      "buildingTypes": [
        "education_campus"
      ],
      "squareFootage": {
        "value": 19117,
        "raw": "19,117",
        "parsingStatus": "parsed"
      }
    }
  },
  "siteEnergyProfile": {
    "availableFieldIds": [
      "account_number_masked",
      "annual_electric_cost",
      "annual_kwh",
      "annual_sewer_cost",
      "annual_water_cost",
      "annual_water_use",
      "average_cost_per_kwh",
      "billing_period_end",
      "billing_period_start",
      "bin_size",
      "contamination_fees",
      "customer_class",
      "delivery_charges",
      "demand_charge_rate",
      "demand_charges",
      "fixed_customer_charge",
      "generation_charges",
      "irrigation_meter_present",
      "landfill_service_cost",
      "meter_size",
      "monthly_kwh",
      "monthly_peak_kw",
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
      "total_waste_cost",
      "total_water_cost",
      "utility_provider",
      "waste_hauler",
      "water_provider",
      "water_unit"
    ],
    "latestUtilityProvider": "Hyde County solid waste / school district contracted hauling",
    "annualKwh": 478000,
    "annualElectricCost": 74090,
    "averageCostPerKwh": 0.155,
    "utilitySummaries": [
      {
        "utilityCategory": "electric",
        "annualCost": 74090
      },
      {
        "utilityCategory": "water_sewer",
        "annualCost": 5800
      },
      {
        "utilityCategory": "waste",
        "annualCost": 14000
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
      "building_square_footage",
      "remote_island_facility",
      "gas_service_status",
      "public_school_sales_use_tax_status",
      "state_code"
    ]
  },
  "existingTaxFacts": [
    {
      "inputKey": "state_code",
      "value": "NC",
      "sourceFileId": "taxfile_049_ocracoke_school_island_01",
      "sourceStrategy": "synthetic_tax_document",
      "uiPlacement": "hidden_derived",
      "userOverrideAllowed": false,
      "defaultIsSynthetic": true,
      "confidenceImpactUntilConfirmed": "low"
    },
    {
      "inputKey": "site_ownership_status",
      "value": "Own",
      "sourceFileId": "taxfile_049_ocracoke_school_island_01",
      "sourceStrategy": "synthetic_tax_document",
      "uiPlacement": "organization_profile",
      "userOverrideAllowed": true,
      "defaultIsSynthetic": true,
      "confidenceImpactUntilConfirmed": "medium"
    },
    {
      "inputKey": "building_square_footage",
      "value": 19117,
      "sourceFileId": "taxfile_049_ocracoke_school_island_03",
      "sourceStrategy": "synthetic_tax_document",
      "uiPlacement": "property_tax_profile",
      "userOverrideAllowed": true,
      "defaultIsSynthetic": true,
      "confidenceImpactUntilConfirmed": "medium"
    },
    {
      "inputKey": "property_tax_status",
      "value": "county_public_school_property_exempt",
      "sourceFileId": "taxfile_049_ocracoke_school_island_01",
      "sourceStrategy": "synthetic_tax_document",
      "uiPlacement": "property_tax_profile",
      "userOverrideAllowed": true,
      "defaultIsSynthetic": true,
      "confidenceImpactUntilConfirmed": "medium"
    },
    {
      "inputKey": "remote_island_facility",
      "value": true,
      "sourceFileId": "taxfile_049_ocracoke_school_island_03",
      "sourceStrategy": "synthetic_tax_document",
      "uiPlacement": "organization_profile",
      "userOverrideAllowed": true,
      "defaultIsSynthetic": true,
      "confidenceImpactUntilConfirmed": "medium"
    },
    {
      "inputKey": "gas_service_status",
      "value": "no_piped_gas_reported",
      "sourceFileId": "taxfile_049_ocracoke_school_island_03",
      "sourceStrategy": "synthetic_tax_document",
      "uiPlacement": "organization_profile",
      "userOverrideAllowed": true,
      "defaultIsSynthetic": true,
      "confidenceImpactUntilConfirmed": "medium"
    },
    {
      "inputKey": "public_school_sales_use_tax_status",
      "value": "refund_or_exemption_review_required",
      "sourceFileId": "taxfile_049_ocracoke_school_island_02",
      "sourceStrategy": "synthetic_tax_document",
      "uiPlacement": "tax_profile",
      "userOverrideAllowed": true,
      "defaultIsSynthetic": true,
      "confidenceImpactUntilConfirmed": "high"
    },
    {
      "inputKey": "retrofi_supplied_target_state_match",
      "value": false,
      "sourceFileId": "taxfile_049_ocracoke_school_island_01",
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
      "sourceFileId": "taxfile_049_ocracoke_school_island_01",
      "estimateStatusIfUsed": "suppressed",
      "includeInUserFacingTotalBeforeConfirmation": false,
      "notes": "Suppress Michigan Renewable Energy Renaissance Zone treatment because the synthetic site state is NC, not Michigan, and no approved Michigan zone designation document is present."
    },
    {
      "opportunityId": "SOURCE_DSIRE:dsire_program_id:22798",
      "inputKey": "municipality",
      "value": "Ocracoke, NC",
      "sourceFileId": "taxfile_049_ocracoke_school_island_01",
      "estimateStatusIfUsed": "suppressed",
      "includeInUserFacingTotalBeforeConfirmation": false,
      "notes": "Suppress Rhode Island renewable property-tax valuation because the synthetic site is in NC, not Rhode Island."
    },
    {
      "opportunityId": "SOURCE_DSIRE:dsire_program_id:381",
      "inputKey": "qualifying_solar_b_and_o_classification",
      "value": "not_applicable_out_of_state_and_no_synthetic_solar_manufacturing_activity",
      "sourceFileId": "taxfile_049_ocracoke_school_island_01",
      "estimateStatusIfUsed": "suppressed",
      "includeInUserFacingTotalBeforeConfirmation": false,
      "notes": "Suppress Washington solar-manufacturing B&O treatment because the synthetic site is in NC, not Washington, and the profile does not include a WA solar manufacturing B&O tax return."
    }
  ],
  "retrofitSummaries": [
    {
      "retrofitTypeId": "biomass_biogas_energy_system",
      "displayName": "Biomass / biogas energy system",
      "parentCategory": "solar_renewable_electricity",
      "opportunityCount": 2,
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
      },
      "grantOpportunityIds": [
        "SOURCE_DSIRE:dsire_program_id:5712"
      ]
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
      "retrofitTypeId": "rooftop_solar_pv",
      "displayName": "Rooftop solar PV",
      "parentCategory": "solar_renewable_electricity",
      "opportunityCount": 1,
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
      "retrofitTypeId": "air_sealing_weatherization",
      "displayName": "Air sealing / weatherization",
      "grantOpportunities": [
        {
          "opportunityId": "SOURCE_DSIRE:dsire_program_id:5712",
          "opportunityName": "Low Income Home Energy Assistance Program (LIHEAP)",
          "sourceUrl": "https://programs.dsireusa.org/system/program/detail/5712/low-income-home-energy-assistance-program-liheap",
          "websiteUrl": "https://www.acf.hhs.gov/ocs/low-income-home-energy-assistance-program-liheap",
          "eligibilityStatus": "eligible",
          "availabilityStatus": "active",
          "programType": "Federal Assistance / Grant Program",
          "administrator": "U.S. Department of Health and Human Services, Administration for Children and Families, Office of Community Services",
          "rankScore": 100,
          "opportunityDataConfidence": 0.77,
          "matchedReasons": [
            "Opportunity appears active.",
            "Opportunity appears nationwide.",
            "Utility provider is not applicable to this opportunity.",
            "Applicant type overlaps eligible sector: government.",
            "Site or facility type matches: education_campus.",
            "Opportunity technology is available for retrofit discovery: building_envelope, energy_efficiency."
          ]
        }
      ]
    }
  ],
  "blockers": [
    {
      "value": "User site or facility type (education_campus) does not match broad_residential eligibility.",
      "count": 553
    },
    {
      "value": "User site or facility type (education_campus) does not match broad_commercial eligibility.",
      "count": 362
    },
    {
      "value": "Project site state NC does not match opportunity geography CA.",
      "count": 176
    },
    {
      "value": "Project site state NC does not match opportunity geography MN.",
      "count": 112
    },
    {
      "value": "Opportunity appears residential-only and the user profile is nonresidential.",
      "count": 93
    },
    {
      "value": "Project site state NC does not match opportunity geography CO.",
      "count": 74
    },
    {
      "value": "Project site state NC does not match opportunity geography MA.",
      "count": 70
    },
    {
      "value": "Project site state NC does not match opportunity geography OR.",
      "count": 70
    },
    {
      "value": "Project site state NC does not match opportunity geography TX.",
      "count": 67
    },
    {
      "value": "Opportunity site or facility specificity (multifamily_residential) does not match the user's site type (education_campus).",
      "count": 65
    },
    {
      "value": "Project site state NC does not match opportunity geography WA.",
      "count": 61
    },
    {
      "value": "Project site state NC does not match opportunity geography FL.",
      "count": 55
    },
    {
      "value": "Project site state NC does not match opportunity geography MD.",
      "count": 53
    },
    {
      "value": "Project site state NC does not match opportunity geography IL.",
      "count": 47
    },
    {
      "value": "Project site state NC does not match opportunity geography IN.",
      "count": 46
    },
    {
      "value": "Project site state NC does not match opportunity geography PA.",
      "count": 46
    },
    {
      "value": "Project site state NC does not match opportunity geography NY.",
      "count": 43
    },
    {
      "value": "Opportunity site or facility specificity (agricultural_facility) does not match the user's site type (education_campus).",
      "count": 38
    },
    {
      "value": "Project site state NC does not match opportunity geography VT.",
      "count": 37
    },
    {
      "value": "Project site state NC does not match opportunity geography MO.",
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
  "sampleUserId": "ocracoke-school-island",
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
