# Sample Matching Report

Generated: 2026-06-26T01:31:34.403Z
Matcher clock: 2026-06-26T01:28:45.307Z
Opportunities evaluated: 2096
Sample users evaluated: 10
Pairings evaluated: 20960

This is a deterministic first-pass matcher audit. It is not a human-reviewed ground-truth label set yet.
The script evaluates every current opportunity against each sample profile, then reports the strongest matches and the most common unknowns/blockers.
Full JSON output: `/tmp/retrofi-sample-matching-results.json`

## Global Notes

- Hard failures are limited to explicit unavailable status/deadline, state mismatch, utility mismatch, residential-only mismatch, applicant mismatch, technology mismatch, and parsed numeric threshold failure.
- Utility restrictions use the generated review artifact when present. `required` gates matching; `none`, `not_applicable`, and `none_found_after_review` are treated as pass; only unresolved ambiguous utility evidence remains `unknown`.
- Utility review artifact: not loaded.
- Missing building specificity and ambiguous opportunity geography return `unknown` rather than a false rejection.
- Current form limitations are visible for municipal-utility sample users because the utility picker does not include every California municipal utility.
- This report is designed to be iterated: manually inspect top false positives/false negatives, update extraction/ontology rules, rerun.

## Sample User Results

### sample-ca-pge-cupertino-office-ev

Commercial office site in Cupertino exploring employee and fleet EV charging.

Normalized profile:
```json
{
  "organizationTypes": [
    "commercial"
  ],
  "stateCode": "CA",
  "zip5": "95014",
  "utility": {
    "selfReportedName": "PG&E",
    "distributionUtilityId": "UTIL_PGE",
    "territoryCandidates": [
      "UTIL_PGE"
    ],
    "verificationStatus": "self_reported_unverified",
    "customerClass": null
  },
  "ownershipRelationship": "tenant",
  "buildingTypes": [
    "office"
  ],
  "squareFootage": {
    "value": 12000,
    "raw": "12,000",
    "parsingStatus": "parsed"
  },
  "technologyIds": [
    "ev_charging"
  ]
}
```

Status counts:
```json
{
  "eligible_active": 0,
  "likely_eligible": 5,
  "needs_information": 0,
  "upcoming": 9,
  "manual_review": 7,
  "ineligible": 1866,
  "unavailable": 209
}
```

Top matches requiring no hard blocker:
- likely_eligible / 96: GFO-25-607 - Clean Transportation Program Hydrogen Infrastructure Project Opportunity (HIPO) (SOURCE_CA_ENERGY_COMMISSION:cec_solicitation_number:GFO-25-607)
  - matched: Opportunity appears active.; Project site state CA matches opportunity geography.; Opportunity explicitly has no electric utility restriction.
  - unresolved: Opportunity building specificity (other) does not directly match the user's site type.
- likely_eligible / 96: GFO-25-605 – Reliable Electric Charging for Eligible School-bus Sites (RECESS) (SOURCE_CA_ENERGY_COMMISSION:cec_solicitation_number:GFO-25-605)
  - matched: Opportunity appears active.; Project site state CA matches opportunity geography.; Opportunity explicitly has no electric utility restriction.
  - unresolved: Opportunity building specificity (other) does not directly match the user's site type.
- likely_eligible / 96: GFO-25-608 - Electric Vehicle Hub, Outreach, Messaging, and Equipment (EV HOME) (SOURCE_CA_ENERGY_COMMISSION:cec_solicitation_number:GFO-25-608)
  - matched: Opportunity appears active.; Project site state CA matches opportunity geography.; Opportunity explicitly has no electric utility restriction.
  - unresolved: Opportunity building specificity (other) does not directly match the user's site type.
- likely_eligible / 96: GFO-25-603 - California’s National Electric Vehicle Infrastructure Formula Program – Solicitation 6 Community Charging (SOURCE_CA_ENERGY_COMMISSION:cec_solicitation_number:GFO-25-603)
  - matched: Opportunity appears active.; Project site state CA matches opportunity geography.; Opportunity explicitly has no electric utility restriction.
  - unresolved: Opportunity building specificity (other) does not directly match the user's site type.
- likely_eligible / 96: PG&E - EV Fleet Program (SOURCE_DSIRE:dsire_program_id:22283)
  - matched: Opportunity appears active.; Project site state CA matches opportunity geography.; Self-reported utility matches PG&E.
  - unresolved: No specific eligible building type was normalized.
- upcoming / 96: Technology Enablers for Using Electric Vehicles as Distributed Energy Resources (SOURCE_CA_ENERGY_COMMISSION:cec_url_hash:url_hash:1d170a7698573135)
  - matched: Project site state CA matches opportunity geography.; Opportunity explicitly has no electric utility restriction.; Applicant type overlaps eligible sector: commercial.
  - unresolved: Opportunity appears upcoming; application timing should be verified.; Opportunity building specificity (other) does not directly match the user's site type.
- upcoming / 96: Characterizing Non-Driving Electric Vehicle Energy Efficiency (SOURCE_CA_ENERGY_COMMISSION:cec_url_hash:url_hash:ee2970905a6a3bbb)
  - matched: Project site state CA matches opportunity geography.; Opportunity explicitly has no electric utility restriction.; Applicant type overlaps eligible sector: commercial.
  - unresolved: Opportunity appears upcoming; application timing should be verified.; Opportunity building specificity (other) does not directly match the user's site type.
- upcoming / 79: Floating Offshore Wind Environmental Monitoring Technologies (SOURCE_CA_ENERGY_COMMISSION:cec_url_hash:url_hash:710eb522f987205c)
  - matched: Project site state CA matches opportunity geography.; Opportunity explicitly has no electric utility restriction.; Applicant type overlaps eligible sector: commercial.
  - unresolved: Opportunity appears upcoming; application timing should be verified.; Opportunity building specificity (other) does not directly match the user's site type.; No project technology was normalized.
- upcoming / 79: Location-Specific Analysis of Decommissioning to Support Long-Term Gas Planning (SOURCE_CA_ENERGY_COMMISSION:cec_url_hash:url_hash:2412a914048ed625)
  - matched: Project site state CA matches opportunity geography.; Opportunity explicitly has no electric utility restriction.; Applicant type overlaps eligible sector: commercial.
  - unresolved: Opportunity appears upcoming; application timing should be verified.; Opportunity building specificity (other) does not directly match the user's site type.; No project technology was normalized.
- upcoming / 79: Supporting Applications of Open Data for Electricity Sector Planning and Outreach (SOURCE_CA_ENERGY_COMMISSION:cec_url_hash:url_hash:a530fbc239afb0af)
  - matched: Project site state CA matches opportunity geography.; Opportunity explicitly has no electric utility restriction.; Applicant type overlaps eligible sector: commercial.
  - unresolved: Opportunity appears upcoming; application timing should be verified.; Opportunity building specificity (other) does not directly match the user's site type.; No project technology was normalized.
- upcoming / 79: Advancing Integrated Planning to Support the Energy Transition (SOURCE_CA_ENERGY_COMMISSION:cec_url_hash:url_hash:9a2dd6f8a9c9eb1f)
  - matched: Project site state CA matches opportunity geography.; Opportunity explicitly has no electric utility restriction.; Applicant type overlaps eligible sector: commercial.
  - unresolved: Opportunity appears upcoming; application timing should be verified.; Opportunity building specificity (other) does not directly match the user's site type.; No project technology was normalized.
- upcoming / 79: Scaled-Up Gas Decommissioning Pilots (SOURCE_CA_ENERGY_COMMISSION:cec_url_hash:url_hash:77fb1c936a0c0a6a)
  - matched: Project site state CA matches opportunity geography.; Opportunity explicitly has no electric utility restriction.; Applicant type overlaps eligible sector: commercial.
  - unresolved: Opportunity appears upcoming; application timing should be verified.; Opportunity building specificity (other) does not directly match the user's site type.; No project technology was normalized.

Common next questions:
- project.technologyIds: 7

Common unresolved requirements among promising matches:
- Opportunity building specificity (other) does not directly match the user's site type.: 13
- Opportunity appears upcoming; application timing should be verified.: 9
- No project technology was normalized.: 7
- No specific eligible building type was normalized.: 1

Retrofit types inferred from promising matches:
- EV charger installation: 7
- Fuel cell system: 1
- High-efficiency refrigeration equipment: 1
- Level 2 EV charger installation: 1

Common blockers across rejected/unavailable opportunities:
- Opportunity appears residential-only and the user profile is nonresidential.: 451
- Selected improvements do not match opportunity technologies (energy_efficiency).: 211
- Opportunity appears unavailable or the application deadline has passed.: 209
- Selected improvements do not match opportunity technologies (solar).: 162
- Project site state CA does not match opportunity geography MN.: 86

### sample-ca-pge-mountain-view-office-hvac-led

Large Mountain View office campus evaluating HVAC, LED lighting, and building controls.

Normalized profile:
```json
{
  "organizationTypes": [
    "commercial"
  ],
  "stateCode": "CA",
  "zip5": "94043",
  "utility": {
    "selfReportedName": "PG&E",
    "distributionUtilityId": "UTIL_PGE",
    "territoryCandidates": [
      "UTIL_PGE"
    ],
    "verificationStatus": "self_reported_unverified",
    "customerClass": null
  },
  "ownershipRelationship": "property_manager",
  "buildingTypes": [
    "office"
  ],
  "squareFootage": {
    "value": 95000,
    "raw": "95,000",
    "parsingStatus": "parsed"
  },
  "technologyIds": [
    "hvac",
    "lighting",
    "building_controls"
  ]
}
```

Status counts:
```json
{
  "eligible_active": 3,
  "likely_eligible": 22,
  "needs_information": 0,
  "upcoming": 18,
  "manual_review": 8,
  "ineligible": 1836,
  "unavailable": 209
}
```

Top matches requiring no hard blocker:
- eligible_active / 100: U.S. Department of Energy - Loan Guarantee Program (SOURCE_DSIRE:dsire_program_id:3071)
  - matched: Opportunity appears active.; Opportunity appears nationwide.; Utility provider is not applicable to this opportunity.
- eligible_active / 100: Energy Efficiency Financing for Public Sector Projects (SOURCE_DSIRE:dsire_program_id:5131)
  - matched: Opportunity appears active.; Project site state CA matches opportunity geography.; Utility provider is not applicable to this opportunity.
- eligible_active / 100: USDA - Rural Energy for America Program (REAP) Energy Audit and Renewable Energy Development Assistance (EA/REDA) Program (SOURCE_DSIRE:dsire_program_id:5681)
  - matched: Opportunity appears active.; Opportunity appears nationwide.; Utility provider is not applicable to this opportunity.
- likely_eligible / 96: USDA - Biorefinery, Renewable Chemical, and Biobased Product Manufacturing Assistance Program (SOURCE_DSIRE:dsire_program_id:5313)
  - matched: Opportunity appears active.; Opportunity appears nationwide.; Utility provider is not applicable to this opportunity.
  - unresolved: No specific eligible building type was normalized.
- likely_eligible / 96: PG&E - Non-Residential Energy Efficiency Rebates (SOURCE_DSIRE:dsire_program_id:4899)
  - matched: Opportunity appears active.; Project site state CA matches opportunity geography.; Self-reported utility matches PG&E.
  - unresolved: No specific eligible building type was normalized.
- likely_eligible / 96: Business Energy Investment Tax Credit (ITC) (SOURCE_DSIRE:dsire_program_id:658)
  - matched: Opportunity appears active.; Opportunity appears nationwide.; Utility provider is not applicable to this opportunity.
  - unresolved: No specific eligible building type was normalized.
- likely_eligible / 96: USDA - Rural Energy for America Program (REAP) Loan Guarantees (SOURCE_DSIRE:dsire_program_id:2511)
  - matched: Opportunity appears active.; Opportunity appears nationwide.; Utility provider is not applicable to this opportunity.
  - unresolved: No specific eligible building type was normalized.
- likely_eligible / 96: RFQ-25-401 - Energy Code Compliance Evaluation Support (SOURCE_CA_ENERGY_COMMISSION:cec_solicitation_number:RFQ-25-401)
  - matched: Opportunity appears active.; Project site state CA matches opportunity geography.; Opportunity explicitly has no electric utility restriction.
  - unresolved: Opportunity building specificity (other) does not directly match the user's site type.
- likely_eligible / 96: Statewide Midstream Water Heating (SOURCE_SDGE_BUSINESS:program_url:statewide_waterheating_com)
  - matched: Project site state CA matches opportunity geography.; Self-reported utility matches PG&E.; Applicant type overlaps eligible sector: commercial.
  - unresolved: Availability is uncertain.; Opportunity building specificity (other) does not directly match the user's site type.
- likely_eligible / 96: PON-17-401 - Financing for Energy Efficiency and Renewable Energy Generation Projects (SOURCE_CA_ENERGY_COMMISSION:cec_solicitation_number:PON-17-401)
  - matched: Project site state CA matches opportunity geography.; Opportunity explicitly has no electric utility restriction.; Applicant type overlaps eligible sector: commercial.
  - unresolved: Availability is uncertain.; Opportunity building specificity (other, medical) does not directly match the user's site type.
- likely_eligible / 96: San Diego County - Green Building Program (SOURCE_DSIRE:dsire_program_id:1105)
  - matched: Opportunity appears active.; Project site state CA matches opportunity geography.; No utility restriction was found after source review.
  - unresolved: No specific eligible building type was normalized.
- likely_eligible / 96: Fannie Mae Green Financing – Loan Program (SOURCE_DSIRE:dsire_program_id:5780)
  - matched: Opportunity appears active.; Opportunity appears nationwide.; Utility provider is not applicable to this opportunity.
  - unresolved: Opportunity building specificity (multifamily) does not directly match the user's site type.

Common next questions:
- project.technologyIds: 7
- site.utility.electric.distributionUtilityId: 1

Common unresolved requirements among promising matches:
- Opportunity building specificity (other) does not directly match the user's site type.: 22
- Opportunity appears upcoming; application timing should be verified.: 18
- No specific eligible building type was normalized.: 12
- No project technology was normalized.: 7
- Opportunity building specificity (multifamily) does not directly match the user's site type.: 3

Retrofit types inferred from promising matches:
- High-efficiency HVAC replacement: 9
- LED lighting retrofit: 6
- Biomass / biogas energy system: 5
- Ground-source / geothermal heat pump: 5
- Battery storage system: 3
- Combined heat and power system: 3
- Insulation upgrade: 3
- Energy audit: 2

Common blockers across rejected/unavailable opportunities:
- Opportunity appears residential-only and the user profile is nonresidential.: 451
- Opportunity appears unavailable or the application deadline has passed.: 209
- Selected improvements do not match opportunity technologies (solar).: 162
- Selected improvements do not match opportunity technologies (ev_charging).: 153
- Project site state CA does not match opportunity geography MN.: 86

### sample-ca-other-burbank-studio-efficiency

Burbank studio and production facility with utility provider to be confirmed.

Normalized profile:
```json
{
  "organizationTypes": [
    "commercial"
  ],
  "stateCode": "CA",
  "zip5": "91521",
  "utility": {
    "selfReportedName": "Other / Not sure",
    "distributionUtilityId": null,
    "territoryCandidates": [],
    "verificationStatus": "unknown",
    "customerClass": null
  },
  "ownershipRelationship": "owner",
  "buildingTypes": [
    "warehouse"
  ],
  "squareFootage": {
    "value": 90000,
    "raw": "90,000",
    "parsingStatus": "parsed"
  },
  "technologyIds": [
    "hvac",
    "lighting",
    "building_controls"
  ]
}
```

Status counts:
```json
{
  "eligible_active": 0,
  "likely_eligible": 98,
  "needs_information": 0,
  "upcoming": 18,
  "manual_review": 16,
  "ineligible": 1755,
  "unavailable": 209
}
```

Top matches requiring no hard blocker:
- likely_eligible / 96: USDA - Biorefinery, Renewable Chemical, and Biobased Product Manufacturing Assistance Program (SOURCE_DSIRE:dsire_program_id:5313)
  - matched: Opportunity appears active.; Opportunity appears nationwide.; Utility provider is not applicable to this opportunity.
  - unresolved: No specific eligible building type was normalized.
- likely_eligible / 96: Business Energy Investment Tax Credit (ITC) (SOURCE_DSIRE:dsire_program_id:658)
  - matched: Opportunity appears active.; Opportunity appears nationwide.; Utility provider is not applicable to this opportunity.
  - unresolved: No specific eligible building type was normalized.
- likely_eligible / 96: USDA - Rural Energy for America Program (REAP) Loan Guarantees (SOURCE_DSIRE:dsire_program_id:2511)
  - matched: Opportunity appears active.; Opportunity appears nationwide.; Utility provider is not applicable to this opportunity.
  - unresolved: No specific eligible building type was normalized.
- likely_eligible / 96: RFQ-25-401 - Energy Code Compliance Evaluation Support (SOURCE_CA_ENERGY_COMMISSION:cec_solicitation_number:RFQ-25-401)
  - matched: Opportunity appears active.; Project site state CA matches opportunity geography.; Opportunity explicitly has no electric utility restriction.
  - unresolved: Opportunity building specificity (other) does not directly match the user's site type.
- likely_eligible / 96: PON-17-401 - Financing for Energy Efficiency and Renewable Energy Generation Projects (SOURCE_CA_ENERGY_COMMISSION:cec_solicitation_number:PON-17-401)
  - matched: Project site state CA matches opportunity geography.; Opportunity explicitly has no electric utility restriction.; Applicant type overlaps eligible sector: commercial.
  - unresolved: Availability is uncertain.; Opportunity building specificity (other, medical) does not directly match the user's site type.
- likely_eligible / 96: San Diego County - Green Building Program (SOURCE_DSIRE:dsire_program_id:1105)
  - matched: Opportunity appears active.; Project site state CA matches opportunity geography.; No utility restriction was found after source review.
  - unresolved: No specific eligible building type was normalized.
- likely_eligible / 96: Fannie Mae Green Financing – Loan Program (SOURCE_DSIRE:dsire_program_id:5780)
  - matched: Opportunity appears active.; Opportunity appears nationwide.; Utility provider is not applicable to this opportunity.
  - unresolved: Opportunity building specificity (multifamily) does not directly match the user's site type.
- likely_eligible / 96: PON-24-002 - K–12 Energy Efficiency Program (KTEP) (SOURCE_CA_ENERGY_COMMISSION:cec_solicitation_number:PON-24-002)
  - matched: Opportunity appears active.; Project site state CA matches opportunity geography.; Opportunity explicitly has no electric utility restriction.
  - unresolved: Opportunity building specificity (other) does not directly match the user's site type.
- likely_eligible / 96: Plumas-Sierra REC - Commercial and Irrigation Rebate Program (SOURCE_DSIRE:dsire_program_id:22067)
  - matched: Opportunity appears active.; Project site state CA matches opportunity geography.; No utility restriction was found after source review.
  - unresolved: No specific eligible building type was normalized.
- likely_eligible / 96: GFO-25-305 - Non-Energy Impacts of Integrated Energy Retrofit Packages from the Equitable Building Decarbonization Program (SOURCE_CA_ENERGY_COMMISSION:cec_solicitation_number:GFO-25-305)
  - matched: Opportunity appears active.; Project site state CA matches opportunity geography.; Opportunity explicitly has no electric utility restriction.
  - unresolved: Opportunity building specificity (other) does not directly match the user's site type.
- likely_eligible / 96: U.S. Department of Energy - Loan Guarantee Program (SOURCE_DSIRE:dsire_program_id:3071)
  - matched: Opportunity appears active.; Opportunity appears nationwide.; Utility provider is not applicable to this opportunity.
  - unresolved: Opportunity building specificity (office) does not directly match the user's site type.
- likely_eligible / 96: CaliforniaFIRST (SOURCE_DSIRE:dsire_program_id:5309)
  - matched: Opportunity appears active.; Project site state CA matches opportunity geography.; Utility provider is not applicable to this opportunity.
  - unresolved: No specific eligible building type was normalized.

Common next questions:
- site.utility.electric.distributionUtilityId: 77
- project.technologyIds: 7

Common unresolved requirements among promising matches:
- User electric distribution utility is unknown.: 76
- Opportunity building specificity (other) does not directly match the user's site type.: 51
- No specific eligible building type was normalized.: 34
- Opportunity appears upcoming; application timing should be verified.: 18
- Availability is uncertain.: 10

Retrofit types inferred from promising matches:
- High-efficiency HVAC replacement: 47
- LED lighting retrofit: 26
- Low-flow fixture retrofit: 24
- Heat pump HVAC retrofit: 21
- High-efficiency refrigeration equipment: 20
- Heat pump water heater: 14
- Energy management system: 11
- Insulation upgrade: 11

Common blockers across rejected/unavailable opportunities:
- Opportunity appears residential-only and the user profile is nonresidential.: 451
- Opportunity appears unavailable or the application deadline has passed.: 209
- Selected improvements do not match opportunity technologies (solar).: 162
- Selected improvements do not match opportunity technologies (ev_charging).: 153
- Project site state CA does not match opportunity geography MN.: 86

### sample-ca-pge-menlo-park-office-solar-ev

Menlo Park office site considering solar, battery storage, and EV charging.

Normalized profile:
```json
{
  "organizationTypes": [
    "commercial"
  ],
  "stateCode": "CA",
  "zip5": "94025",
  "utility": {
    "selfReportedName": "PG&E",
    "distributionUtilityId": "UTIL_PGE",
    "territoryCandidates": [
      "UTIL_PGE"
    ],
    "verificationStatus": "self_reported_unverified",
    "customerClass": null
  },
  "ownershipRelationship": "owner",
  "buildingTypes": [
    "office"
  ],
  "squareFootage": {
    "value": 120000,
    "raw": "120,000",
    "parsingStatus": "parsed"
  },
  "technologyIds": [
    "solar",
    "battery_storage",
    "ev_charging"
  ]
}
```

Status counts:
```json
{
  "eligible_active": 1,
  "likely_eligible": 16,
  "needs_information": 0,
  "upcoming": 12,
  "manual_review": 9,
  "ineligible": 1849,
  "unavailable": 209
}
```

Top matches requiring no hard blocker:
- eligible_active / 100: Energy Efficiency Financing for Public Sector Projects (SOURCE_DSIRE:dsire_program_id:5131)
  - matched: Opportunity appears active.; Project site state CA matches opportunity geography.; Utility provider is not applicable to this opportunity.
- likely_eligible / 96: Business Energy Investment Tax Credit (ITC) (SOURCE_DSIRE:dsire_program_id:658)
  - matched: Opportunity appears active.; Opportunity appears nationwide.; Utility provider is not applicable to this opportunity.
  - unresolved: No specific eligible building type was normalized.
- likely_eligible / 96: USDA - Rural Energy for America Program (REAP) Loan Guarantees (SOURCE_DSIRE:dsire_program_id:2511)
  - matched: Opportunity appears active.; Opportunity appears nationwide.; Utility provider is not applicable to this opportunity.
  - unresolved: No specific eligible building type was normalized.
- likely_eligible / 96: GFO-25-607 - Clean Transportation Program Hydrogen Infrastructure Project Opportunity (HIPO) (SOURCE_CA_ENERGY_COMMISSION:cec_solicitation_number:GFO-25-607)
  - matched: Opportunity appears active.; Project site state CA matches opportunity geography.; Opportunity explicitly has no electric utility restriction.
  - unresolved: Opportunity building specificity (other) does not directly match the user's site type.
- likely_eligible / 96: GFO-25-605 – Reliable Electric Charging for Eligible School-bus Sites (RECESS) (SOURCE_CA_ENERGY_COMMISSION:cec_solicitation_number:GFO-25-605)
  - matched: Opportunity appears active.; Project site state CA matches opportunity geography.; Opportunity explicitly has no electric utility restriction.
  - unresolved: Opportunity building specificity (other) does not directly match the user's site type.
- likely_eligible / 96: GFO-25-608 - Electric Vehicle Hub, Outreach, Messaging, and Equipment (EV HOME) (SOURCE_CA_ENERGY_COMMISSION:cec_solicitation_number:GFO-25-608)
  - matched: Opportunity appears active.; Project site state CA matches opportunity geography.; Opportunity explicitly has no electric utility restriction.
  - unresolved: Opportunity building specificity (other) does not directly match the user's site type.
- likely_eligible / 96: Self-Generation Incentive Program (SOURCE_DSIRE:dsire_program_id:552)
  - matched: Opportunity appears active.; Project site state CA matches opportunity geography.; Self-reported utility matches PG&E.
  - unresolved: Opportunity building specificity (retail) does not directly match the user's site type.
- likely_eligible / 96: GFO-25-308 - Distributed Clean Hydrogen Production with Onsite End Use (H2ONSITE) (SOURCE_CA_ENERGY_COMMISSION:cec_solicitation_number:GFO-25-308)
  - matched: Opportunity appears active.; Project site state CA matches opportunity geography.; Opportunity explicitly has no electric utility restriction.
  - unresolved: Opportunity building specificity (retail, other) does not directly match the user's site type.
- likely_eligible / 96: GFO-25-603 - California’s National Electric Vehicle Infrastructure Formula Program – Solicitation 6 Community Charging (SOURCE_CA_ENERGY_COMMISSION:cec_solicitation_number:GFO-25-603)
  - matched: Opportunity appears active.; Project site state CA matches opportunity geography.; Opportunity explicitly has no electric utility restriction.
  - unresolved: Opportunity building specificity (other) does not directly match the user's site type.
- likely_eligible / 96: USDA - Rural Energy for America Program (REAP) Grants (SOURCE_DSIRE:dsire_program_id:917)
  - matched: Opportunity appears active.; Opportunity appears nationwide.; Utility provider is not applicable to this opportunity.
  - unresolved: No specific eligible building type was normalized.
- likely_eligible / 96: Local Option - Municipal Energy Districts (SOURCE_DSIRE:dsire_program_id:3527)
  - matched: Opportunity appears active.; Project site state CA matches opportunity geography.; Utility provider is not applicable to this opportunity.
  - unresolved: Opportunity building specificity (medical) does not directly match the user's site type.
- likely_eligible / 96: Modified Accelerated Cost-Recovery System (MACRS) (SOURCE_DSIRE:dsire_program_id:676)
  - matched: Opportunity appears active.; Opportunity appears nationwide.; Utility provider is not applicable to this opportunity.
  - unresolved: No specific eligible building type was normalized.

Common next questions:
- project.technologyIds: 7

Common unresolved requirements among promising matches:
- Opportunity building specificity (other) does not directly match the user's site type.: 16
- Opportunity appears upcoming; application timing should be verified.: 12
- No specific eligible building type was normalized.: 9
- No project technology was normalized.: 7
- Opportunity building specificity (medical) does not directly match the user's site type.: 1

Retrofit types inferred from promising matches:
- Battery storage system: 8
- EV charger installation: 8
- Biomass / biogas energy system: 7
- Ground-source / geothermal heat pump: 7
- Combined heat and power system: 5
- Solar water heating system: 5
- High-efficiency HVAC replacement: 4
- Rooftop solar PV: 4

Common blockers across rejected/unavailable opportunities:
- Opportunity appears residential-only and the user profile is nonresidential.: 451
- Selected improvements do not match opportunity technologies (energy_efficiency).: 211
- Opportunity appears unavailable or the application deadline has passed.: 209
- Project site state CA does not match opportunity geography MN.: 86
- Selected improvements do not match opportunity technologies (hvac, energy_efficiency).: 72

### sample-ca-pge-san-francisco-office-lighting-hvac

San Francisco office tenant evaluating lighting, HVAC, and controls.

Normalized profile:
```json
{
  "organizationTypes": [
    "commercial"
  ],
  "stateCode": "CA",
  "zip5": "94105",
  "utility": {
    "selfReportedName": "PG&E",
    "distributionUtilityId": "UTIL_PGE",
    "territoryCandidates": [
      "UTIL_PGE"
    ],
    "verificationStatus": "self_reported_unverified",
    "customerClass": null
  },
  "ownershipRelationship": "tenant",
  "buildingTypes": [
    "office"
  ],
  "squareFootage": {
    "value": 30000,
    "raw": "30,000",
    "parsingStatus": "parsed"
  },
  "technologyIds": [
    "lighting",
    "hvac",
    "building_controls"
  ]
}
```

Status counts:
```json
{
  "eligible_active": 3,
  "likely_eligible": 22,
  "needs_information": 0,
  "upcoming": 18,
  "manual_review": 8,
  "ineligible": 1836,
  "unavailable": 209
}
```

Top matches requiring no hard blocker:
- eligible_active / 100: U.S. Department of Energy - Loan Guarantee Program (SOURCE_DSIRE:dsire_program_id:3071)
  - matched: Opportunity appears active.; Opportunity appears nationwide.; Utility provider is not applicable to this opportunity.
- eligible_active / 100: Energy Efficiency Financing for Public Sector Projects (SOURCE_DSIRE:dsire_program_id:5131)
  - matched: Opportunity appears active.; Project site state CA matches opportunity geography.; Utility provider is not applicable to this opportunity.
- eligible_active / 100: USDA - Rural Energy for America Program (REAP) Energy Audit and Renewable Energy Development Assistance (EA/REDA) Program (SOURCE_DSIRE:dsire_program_id:5681)
  - matched: Opportunity appears active.; Opportunity appears nationwide.; Utility provider is not applicable to this opportunity.
- likely_eligible / 96: USDA - Biorefinery, Renewable Chemical, and Biobased Product Manufacturing Assistance Program (SOURCE_DSIRE:dsire_program_id:5313)
  - matched: Opportunity appears active.; Opportunity appears nationwide.; Utility provider is not applicable to this opportunity.
  - unresolved: No specific eligible building type was normalized.
- likely_eligible / 96: PG&E - Non-Residential Energy Efficiency Rebates (SOURCE_DSIRE:dsire_program_id:4899)
  - matched: Opportunity appears active.; Project site state CA matches opportunity geography.; Self-reported utility matches PG&E.
  - unresolved: No specific eligible building type was normalized.
- likely_eligible / 96: Business Energy Investment Tax Credit (ITC) (SOURCE_DSIRE:dsire_program_id:658)
  - matched: Opportunity appears active.; Opportunity appears nationwide.; Utility provider is not applicable to this opportunity.
  - unresolved: No specific eligible building type was normalized.
- likely_eligible / 96: USDA - Rural Energy for America Program (REAP) Loan Guarantees (SOURCE_DSIRE:dsire_program_id:2511)
  - matched: Opportunity appears active.; Opportunity appears nationwide.; Utility provider is not applicable to this opportunity.
  - unresolved: No specific eligible building type was normalized.
- likely_eligible / 96: RFQ-25-401 - Energy Code Compliance Evaluation Support (SOURCE_CA_ENERGY_COMMISSION:cec_solicitation_number:RFQ-25-401)
  - matched: Opportunity appears active.; Project site state CA matches opportunity geography.; Opportunity explicitly has no electric utility restriction.
  - unresolved: Opportunity building specificity (other) does not directly match the user's site type.
- likely_eligible / 96: Statewide Midstream Water Heating (SOURCE_SDGE_BUSINESS:program_url:statewide_waterheating_com)
  - matched: Project site state CA matches opportunity geography.; Self-reported utility matches PG&E.; Applicant type overlaps eligible sector: commercial.
  - unresolved: Availability is uncertain.; Opportunity building specificity (other) does not directly match the user's site type.
- likely_eligible / 96: PON-17-401 - Financing for Energy Efficiency and Renewable Energy Generation Projects (SOURCE_CA_ENERGY_COMMISSION:cec_solicitation_number:PON-17-401)
  - matched: Project site state CA matches opportunity geography.; Opportunity explicitly has no electric utility restriction.; Applicant type overlaps eligible sector: commercial.
  - unresolved: Availability is uncertain.; Opportunity building specificity (other, medical) does not directly match the user's site type.
- likely_eligible / 96: San Diego County - Green Building Program (SOURCE_DSIRE:dsire_program_id:1105)
  - matched: Opportunity appears active.; Project site state CA matches opportunity geography.; No utility restriction was found after source review.
  - unresolved: No specific eligible building type was normalized.
- likely_eligible / 96: Fannie Mae Green Financing – Loan Program (SOURCE_DSIRE:dsire_program_id:5780)
  - matched: Opportunity appears active.; Opportunity appears nationwide.; Utility provider is not applicable to this opportunity.
  - unresolved: Opportunity building specificity (multifamily) does not directly match the user's site type.

Common next questions:
- project.technologyIds: 7
- site.utility.electric.distributionUtilityId: 1

Common unresolved requirements among promising matches:
- Opportunity building specificity (other) does not directly match the user's site type.: 22
- Opportunity appears upcoming; application timing should be verified.: 18
- No specific eligible building type was normalized.: 12
- No project technology was normalized.: 7
- Opportunity building specificity (multifamily) does not directly match the user's site type.: 3

Retrofit types inferred from promising matches:
- High-efficiency HVAC replacement: 9
- LED lighting retrofit: 6
- Biomass / biogas energy system: 5
- Ground-source / geothermal heat pump: 5
- Battery storage system: 3
- Combined heat and power system: 3
- Insulation upgrade: 3
- Energy audit: 2

Common blockers across rejected/unavailable opportunities:
- Opportunity appears residential-only and the user profile is nonresidential.: 451
- Opportunity appears unavailable or the application deadline has passed.: 209
- Selected improvements do not match opportunity technologies (solar).: 162
- Selected improvements do not match opportunity technologies (ev_charging).: 153
- Project site state CA does not match opportunity geography MN.: 86

### sample-ca-svp-santa-clara-nonprofit-solar

Santa Clara nonprofit office in Silicon Valley Power territory considering solar and storage.

Normalized profile:
```json
{
  "organizationTypes": [
    "nonprofit"
  ],
  "stateCode": "CA",
  "zip5": "95051",
  "utility": {
    "selfReportedName": "Silicon Valley Power",
    "distributionUtilityId": "UTIL_SVP",
    "territoryCandidates": [
      "UTIL_SVP"
    ],
    "verificationStatus": "self_reported_unverified",
    "customerClass": null
  },
  "ownershipRelationship": "owner",
  "buildingTypes": [
    "office"
  ],
  "squareFootage": {
    "value": 18000,
    "raw": "18,000",
    "parsingStatus": "parsed"
  },
  "technologyIds": [
    "solar",
    "battery_storage"
  ]
}
```

Status counts:
```json
{
  "eligible_active": 1,
  "likely_eligible": 12,
  "needs_information": 0,
  "upcoming": 10,
  "manual_review": 9,
  "ineligible": 1855,
  "unavailable": 209
}
```

Top matches requiring no hard blocker:
- eligible_active / 100: Energy Efficiency Financing for Public Sector Projects (SOURCE_DSIRE:dsire_program_id:5131)
  - matched: Opportunity appears active.; Project site state CA matches opportunity geography.; Utility provider is not applicable to this opportunity.
- likely_eligible / 96: Commercial Solar Rebate Program (SOURCE_SILICON_VALLEY_POWER:svp_source_section:6e6b359eb5fc98c0:commercial-solar-rebate-program)
  - matched: Opportunity appears active.; Project site state CA matches opportunity geography.; Self-reported utility matches Silicon Valley Power.
  - unresolved: Opportunity building specificity (other) does not directly match the user's site type.
- likely_eligible / 96: Nonprofit Solar Grant (SOURCE_SILICON_VALLEY_POWER:svp_source_section:6e6b359eb5fc98c0:nonprofit-solar-grant)
  - matched: Opportunity appears active.; Project site state CA matches opportunity geography.; Self-reported utility matches Silicon Valley Power.
  - unresolved: Opportunity building specificity (other) does not directly match the user's site type.
- likely_eligible / 96: Business Energy Investment Tax Credit (ITC) (SOURCE_DSIRE:dsire_program_id:658)
  - matched: Opportunity appears active.; Opportunity appears nationwide.; Utility provider is not applicable to this opportunity.
  - unresolved: No specific eligible building type was normalized.
- likely_eligible / 96: USDA - Rural Energy for America Program (REAP) Loan Guarantees (SOURCE_DSIRE:dsire_program_id:2511)
  - matched: Opportunity appears active.; Opportunity appears nationwide.; Utility provider is not applicable to this opportunity.
  - unresolved: No specific eligible building type was normalized.
- likely_eligible / 96: GFO-25-308 - Distributed Clean Hydrogen Production with Onsite End Use (H2ONSITE) (SOURCE_CA_ENERGY_COMMISSION:cec_solicitation_number:GFO-25-308)
  - matched: Opportunity appears active.; Project site state CA matches opportunity geography.; Opportunity explicitly has no electric utility restriction.
  - unresolved: Opportunity building specificity (retail, other) does not directly match the user's site type.
- likely_eligible / 96: USDA - Rural Energy for America Program (REAP) Grants (SOURCE_DSIRE:dsire_program_id:917)
  - matched: Opportunity appears active.; Opportunity appears nationwide.; Utility provider is not applicable to this opportunity.
  - unresolved: No specific eligible building type was normalized.
- likely_eligible / 96: Local Option - Municipal Energy Districts (SOURCE_DSIRE:dsire_program_id:3527)
  - matched: Opportunity appears active.; Project site state CA matches opportunity geography.; Utility provider is not applicable to this opportunity.
  - unresolved: Opportunity building specificity (medical) does not directly match the user's site type.
- likely_eligible / 96: Modified Accelerated Cost-Recovery System (MACRS) (SOURCE_DSIRE:dsire_program_id:676)
  - matched: Opportunity appears active.; Opportunity appears nationwide.; Utility provider is not applicable to this opportunity.
  - unresolved: No specific eligible building type was normalized.
- likely_eligible / 96: Residential Energy Conservation Subsidy Exclusion (Corporate) (SOURCE_DSIRE:dsire_program_id:727)
  - matched: Opportunity appears active.; Opportunity appears nationwide.; Utility provider is not applicable to this opportunity.
  - unresolved: No specific eligible building type was normalized.
- likely_eligible / 96: Residential Energy Conservation Subsidy Exclusion (Personal) (SOURCE_DSIRE:dsire_program_id:666)
  - matched: Opportunity appears active.; Opportunity appears nationwide.; Utility provider is not applicable to this opportunity.
  - unresolved: No specific eligible building type was normalized.
- likely_eligible / 96: Marin Clean Energy - Feed-In Tariff Plus (SOURCE_DSIRE:dsire_program_id:22615)
  - matched: Opportunity appears active.; Project site state CA matches opportunity geography.; No utility restriction was found after source review.
  - unresolved: No specific eligible building type was normalized.

Common next questions:
- project.technologyIds: 7

Common unresolved requirements among promising matches:
- Opportunity building specificity (other) does not directly match the user's site type.: 12
- Opportunity appears upcoming; application timing should be verified.: 10
- No specific eligible building type was normalized.: 8
- No project technology was normalized.: 7
- Opportunity building specificity (medical) does not directly match the user's site type.: 1

Retrofit types inferred from promising matches:
- Battery storage system: 7
- Ground-source / geothermal heat pump: 7
- Biomass / biogas energy system: 6
- Rooftop solar PV: 5
- Solar water heating system: 5
- Combined heat and power system: 4
- High-efficiency HVAC replacement: 4
- LED lighting retrofit: 3

Common blockers across rejected/unavailable opportunities:
- Opportunity appears residential-only and the user profile is nonresidential.: 451
- Selected improvements do not match opportunity technologies (energy_efficiency).: 211
- Opportunity appears unavailable or the application deadline has passed.: 209
- Selected improvements do not match opportunity technologies (ev_charging).: 153
- Project site state CA does not match opportunity geography MN.: 86

### sample-ca-pge-los-gatos-retail-refrigeration

Los Gatos retail market evaluating refrigeration, lighting, and HVAC.

Normalized profile:
```json
{
  "organizationTypes": [
    "commercial"
  ],
  "stateCode": "CA",
  "zip5": "95032",
  "utility": {
    "selfReportedName": "PG&E",
    "distributionUtilityId": "UTIL_PGE",
    "territoryCandidates": [
      "UTIL_PGE"
    ],
    "verificationStatus": "self_reported_unverified",
    "customerClass": null
  },
  "ownershipRelationship": "tenant",
  "buildingTypes": [
    "grocery"
  ],
  "squareFootage": {
    "value": 15000,
    "raw": "15,000",
    "parsingStatus": "parsed"
  },
  "technologyIds": [
    "refrigeration",
    "lighting",
    "hvac"
  ]
}
```

Status counts:
```json
{
  "eligible_active": 0,
  "likely_eligible": 25,
  "needs_information": 0,
  "upcoming": 17,
  "manual_review": 8,
  "ineligible": 1837,
  "unavailable": 209
}
```

Top matches requiring no hard blocker:
- likely_eligible / 96: USDA - Biorefinery, Renewable Chemical, and Biobased Product Manufacturing Assistance Program (SOURCE_DSIRE:dsire_program_id:5313)
  - matched: Opportunity appears active.; Opportunity appears nationwide.; Utility provider is not applicable to this opportunity.
  - unresolved: No specific eligible building type was normalized.
- likely_eligible / 96: PG&E - Non-Residential Energy Efficiency Rebates (SOURCE_DSIRE:dsire_program_id:4899)
  - matched: Opportunity appears active.; Project site state CA matches opportunity geography.; Self-reported utility matches PG&E.
  - unresolved: No specific eligible building type was normalized.
- likely_eligible / 96: Business Energy Investment Tax Credit (ITC) (SOURCE_DSIRE:dsire_program_id:658)
  - matched: Opportunity appears active.; Opportunity appears nationwide.; Utility provider is not applicable to this opportunity.
  - unresolved: No specific eligible building type was normalized.
- likely_eligible / 96: USDA - Rural Energy for America Program (REAP) Loan Guarantees (SOURCE_DSIRE:dsire_program_id:2511)
  - matched: Opportunity appears active.; Opportunity appears nationwide.; Utility provider is not applicable to this opportunity.
  - unresolved: No specific eligible building type was normalized.
- likely_eligible / 96: RFQ-25-401 - Energy Code Compliance Evaluation Support (SOURCE_CA_ENERGY_COMMISSION:cec_solicitation_number:RFQ-25-401)
  - matched: Opportunity appears active.; Project site state CA matches opportunity geography.; Opportunity explicitly has no electric utility restriction.
  - unresolved: Opportunity building specificity (other) does not directly match the user's site type.
- likely_eligible / 96: Statewide Midstream Water Heating (SOURCE_SDGE_BUSINESS:program_url:statewide_waterheating_com)
  - matched: Project site state CA matches opportunity geography.; Self-reported utility matches PG&E.; Applicant type overlaps eligible sector: commercial.
  - unresolved: Availability is uncertain.; Opportunity building specificity (other) does not directly match the user's site type.
- likely_eligible / 96: PON-17-401 - Financing for Energy Efficiency and Renewable Energy Generation Projects (SOURCE_CA_ENERGY_COMMISSION:cec_solicitation_number:PON-17-401)
  - matched: Project site state CA matches opportunity geography.; Opportunity explicitly has no electric utility restriction.; Applicant type overlaps eligible sector: commercial.
  - unresolved: Availability is uncertain.; Opportunity building specificity (other, medical) does not directly match the user's site type.
- likely_eligible / 96: San Diego County - Green Building Program (SOURCE_DSIRE:dsire_program_id:1105)
  - matched: Opportunity appears active.; Project site state CA matches opportunity geography.; No utility restriction was found after source review.
  - unresolved: No specific eligible building type was normalized.
- likely_eligible / 96: Fannie Mae Green Financing – Loan Program (SOURCE_DSIRE:dsire_program_id:5780)
  - matched: Opportunity appears active.; Opportunity appears nationwide.; Utility provider is not applicable to this opportunity.
  - unresolved: Opportunity building specificity (multifamily) does not directly match the user's site type.
- likely_eligible / 96: PON-24-002 - K–12 Energy Efficiency Program (KTEP) (SOURCE_CA_ENERGY_COMMISSION:cec_solicitation_number:PON-24-002)
  - matched: Opportunity appears active.; Project site state CA matches opportunity geography.; Opportunity explicitly has no electric utility restriction.
  - unresolved: Opportunity building specificity (other) does not directly match the user's site type.
- likely_eligible / 96: Plumas-Sierra REC - Commercial and Irrigation Rebate Program (SOURCE_DSIRE:dsire_program_id:22067)
  - matched: Opportunity appears active.; Project site state CA matches opportunity geography.; No utility restriction was found after source review.
  - unresolved: No specific eligible building type was normalized.
- likely_eligible / 96: California Energy Design Assistance (CEDA) (SOURCE_DSIRE:dsire_program_id:1455)
  - matched: Opportunity appears active.; Project site state CA matches opportunity geography.; Self-reported utility matches PG&E.
  - unresolved: Opportunity building specificity (multifamily) does not directly match the user's site type.

Common next questions:
- project.technologyIds: 7
- site.utility.electric.distributionUtilityId: 1

Common unresolved requirements among promising matches:
- Opportunity building specificity (other) does not directly match the user's site type.: 21
- Opportunity appears upcoming; application timing should be verified.: 17
- No specific eligible building type was normalized.: 12
- No project technology was normalized.: 7
- Opportunity building specificity (multifamily) does not directly match the user's site type.: 3

Retrofit types inferred from promising matches:
- High-efficiency HVAC replacement: 9
- LED lighting retrofit: 6
- Biomass / biogas energy system: 5
- Ground-source / geothermal heat pump: 5
- Battery storage system: 3
- Combined heat and power system: 3
- Insulation upgrade: 3
- Energy audit: 2

Common blockers across rejected/unavailable opportunities:
- Opportunity appears residential-only and the user profile is nonresidential.: 451
- Opportunity appears unavailable or the application deadline has passed.: 209
- Selected improvements do not match opportunity technologies (solar).: 162
- Selected improvements do not match opportunity technologies (ev_charging).: 153
- Project site state CA does not match opportunity geography MN.: 86

### sample-ca-pge-san-ramon-office-water-controls

San Ramon office campus considering water efficiency, building controls, and EV charging.

Normalized profile:
```json
{
  "organizationTypes": [
    "commercial"
  ],
  "stateCode": "CA",
  "zip5": "94583",
  "utility": {
    "selfReportedName": "PG&E",
    "distributionUtilityId": "UTIL_PGE",
    "territoryCandidates": [
      "UTIL_PGE"
    ],
    "verificationStatus": "self_reported_unverified",
    "customerClass": null
  },
  "ownershipRelationship": "property_manager",
  "buildingTypes": [
    "office"
  ],
  "squareFootage": {
    "value": 60000,
    "raw": "60,000",
    "parsingStatus": "parsed"
  },
  "technologyIds": [
    "water_efficiency",
    "building_controls",
    "ev_charging"
  ]
}
```

Status counts:
```json
{
  "eligible_active": 3,
  "likely_eligible": 25,
  "needs_information": 0,
  "upcoming": 18,
  "manual_review": 8,
  "ineligible": 1833,
  "unavailable": 209
}
```

Top matches requiring no hard blocker:
- eligible_active / 100: U.S. Department of Energy - Loan Guarantee Program (SOURCE_DSIRE:dsire_program_id:3071)
  - matched: Opportunity appears active.; Opportunity appears nationwide.; Utility provider is not applicable to this opportunity.
- eligible_active / 100: Energy Efficiency Financing for Public Sector Projects (SOURCE_DSIRE:dsire_program_id:5131)
  - matched: Opportunity appears active.; Project site state CA matches opportunity geography.; Utility provider is not applicable to this opportunity.
- eligible_active / 100: USDA - Rural Energy for America Program (REAP) Energy Audit and Renewable Energy Development Assistance (EA/REDA) Program (SOURCE_DSIRE:dsire_program_id:5681)
  - matched: Opportunity appears active.; Opportunity appears nationwide.; Utility provider is not applicable to this opportunity.
- likely_eligible / 96: USDA - Biorefinery, Renewable Chemical, and Biobased Product Manufacturing Assistance Program (SOURCE_DSIRE:dsire_program_id:5313)
  - matched: Opportunity appears active.; Opportunity appears nationwide.; Utility provider is not applicable to this opportunity.
  - unresolved: No specific eligible building type was normalized.
- likely_eligible / 96: PG&E - Non-Residential Energy Efficiency Rebates (SOURCE_DSIRE:dsire_program_id:4899)
  - matched: Opportunity appears active.; Project site state CA matches opportunity geography.; Self-reported utility matches PG&E.
  - unresolved: No specific eligible building type was normalized.
- likely_eligible / 96: USDA - Rural Energy for America Program (REAP) Loan Guarantees (SOURCE_DSIRE:dsire_program_id:2511)
  - matched: Opportunity appears active.; Opportunity appears nationwide.; Utility provider is not applicable to this opportunity.
  - unresolved: No specific eligible building type was normalized.
- likely_eligible / 96: GFO-25-607 - Clean Transportation Program Hydrogen Infrastructure Project Opportunity (HIPO) (SOURCE_CA_ENERGY_COMMISSION:cec_solicitation_number:GFO-25-607)
  - matched: Opportunity appears active.; Project site state CA matches opportunity geography.; Opportunity explicitly has no electric utility restriction.
  - unresolved: Opportunity building specificity (other) does not directly match the user's site type.
- likely_eligible / 96: RFQ-25-401 - Energy Code Compliance Evaluation Support (SOURCE_CA_ENERGY_COMMISSION:cec_solicitation_number:RFQ-25-401)
  - matched: Opportunity appears active.; Project site state CA matches opportunity geography.; Opportunity explicitly has no electric utility restriction.
  - unresolved: Opportunity building specificity (other) does not directly match the user's site type.
- likely_eligible / 96: Statewide Midstream Water Heating (SOURCE_SDGE_BUSINESS:program_url:statewide_waterheating_com)
  - matched: Project site state CA matches opportunity geography.; Self-reported utility matches PG&E.; Applicant type overlaps eligible sector: commercial.
  - unresolved: Availability is uncertain.; Opportunity building specificity (other) does not directly match the user's site type.
- likely_eligible / 96: PON-17-401 - Financing for Energy Efficiency and Renewable Energy Generation Projects (SOURCE_CA_ENERGY_COMMISSION:cec_solicitation_number:PON-17-401)
  - matched: Project site state CA matches opportunity geography.; Opportunity explicitly has no electric utility restriction.; Applicant type overlaps eligible sector: commercial.
  - unresolved: Availability is uncertain.; Opportunity building specificity (other, medical) does not directly match the user's site type.
- likely_eligible / 96: GFO-25-605 – Reliable Electric Charging for Eligible School-bus Sites (RECESS) (SOURCE_CA_ENERGY_COMMISSION:cec_solicitation_number:GFO-25-605)
  - matched: Opportunity appears active.; Project site state CA matches opportunity geography.; Opportunity explicitly has no electric utility restriction.
  - unresolved: Opportunity building specificity (other) does not directly match the user's site type.
- likely_eligible / 96: GFO-25-608 - Electric Vehicle Hub, Outreach, Messaging, and Equipment (EV HOME) (SOURCE_CA_ENERGY_COMMISSION:cec_solicitation_number:GFO-25-608)
  - matched: Opportunity appears active.; Project site state CA matches opportunity geography.; Opportunity explicitly has no electric utility restriction.
  - unresolved: Opportunity building specificity (other) does not directly match the user's site type.

Common next questions:
- project.technologyIds: 7

Common unresolved requirements among promising matches:
- Opportunity building specificity (other) does not directly match the user's site type.: 26
- Opportunity appears upcoming; application timing should be verified.: 18
- No specific eligible building type was normalized.: 12
- No project technology was normalized.: 7
- Availability is uncertain.: 2

Retrofit types inferred from promising matches:
- EV charger installation: 8
- High-efficiency HVAC replacement: 5
- Biomass / biogas energy system: 4
- Ground-source / geothermal heat pump: 4
- LED lighting retrofit: 4
- Battery storage system: 3
- Insulation upgrade: 3
- Combined heat and power system: 2

Common blockers across rejected/unavailable opportunities:
- Opportunity appears residential-only and the user profile is nonresidential.: 451
- Opportunity appears unavailable or the application deadline has passed.: 209
- Selected improvements do not match opportunity technologies (solar).: 162
- Project site state CA does not match opportunity geography MN.: 86
- Project site state CA does not match opportunity geography OR.: 60

### sample-ca-svp-santa-clara-office-solar-storage

Large Santa Clara office in Silicon Valley Power territory considering solar and battery storage.

Normalized profile:
```json
{
  "organizationTypes": [
    "commercial"
  ],
  "stateCode": "CA",
  "zip5": "95054",
  "utility": {
    "selfReportedName": "Silicon Valley Power",
    "distributionUtilityId": "UTIL_SVP",
    "territoryCandidates": [
      "UTIL_SVP"
    ],
    "verificationStatus": "self_reported_unverified",
    "customerClass": null
  },
  "ownershipRelationship": "owner",
  "buildingTypes": [
    "office"
  ],
  "squareFootage": {
    "value": 80000,
    "raw": "80,000",
    "parsingStatus": "parsed"
  },
  "technologyIds": [
    "solar",
    "battery_storage",
    "building_controls"
  ]
}
```

Status counts:
```json
{
  "eligible_active": 4,
  "likely_eligible": 43,
  "needs_information": 0,
  "upcoming": 19,
  "manual_review": 8,
  "ineligible": 1813,
  "unavailable": 209
}
```

Top matches requiring no hard blocker:
- eligible_active / 100: U.S. Department of Energy - Loan Guarantee Program (SOURCE_DSIRE:dsire_program_id:3071)
  - matched: Opportunity appears active.; Opportunity appears nationwide.; Utility provider is not applicable to this opportunity.
- eligible_active / 100: Energy Efficiency Financing for Public Sector Projects (SOURCE_DSIRE:dsire_program_id:5131)
  - matched: Opportunity appears active.; Project site state CA matches opportunity geography.; Utility provider is not applicable to this opportunity.
- eligible_active / 100: HVAC System and Heat Pump Rebates (SOURCE_SILICON_VALLEY_POWER:svp_source_section:6e6b359eb5fc98c0:hvac-system-and-heat-pump-rebates)
  - matched: Opportunity appears active.; Project site state CA matches opportunity geography.; Self-reported utility matches Silicon Valley Power.
- eligible_active / 100: USDA - Rural Energy for America Program (REAP) Energy Audit and Renewable Energy Development Assistance (EA/REDA) Program (SOURCE_DSIRE:dsire_program_id:5681)
  - matched: Opportunity appears active.; Opportunity appears nationwide.; Utility provider is not applicable to this opportunity.
- likely_eligible / 96: USDA - Biorefinery, Renewable Chemical, and Biobased Product Manufacturing Assistance Program (SOURCE_DSIRE:dsire_program_id:5313)
  - matched: Opportunity appears active.; Opportunity appears nationwide.; Utility provider is not applicable to this opportunity.
  - unresolved: No specific eligible building type was normalized.
- likely_eligible / 96: Commercial Solar Rebate Program (SOURCE_SILICON_VALLEY_POWER:svp_source_section:6e6b359eb5fc98c0:commercial-solar-rebate-program)
  - matched: Opportunity appears active.; Project site state CA matches opportunity geography.; Self-reported utility matches Silicon Valley Power.
  - unresolved: Opportunity building specificity (other) does not directly match the user's site type.
- likely_eligible / 96: Nonprofit Solar Grant (SOURCE_SILICON_VALLEY_POWER:svp_source_section:6e6b359eb5fc98c0:nonprofit-solar-grant)
  - matched: Opportunity appears active.; Project site state CA matches opportunity geography.; Self-reported utility matches Silicon Valley Power.
  - unresolved: Opportunity building specificity (other) does not directly match the user's site type.
- likely_eligible / 96: Emerging Technologies Grant (SOURCE_SILICON_VALLEY_POWER:svp_source_section:6e6b359eb5fc98c0:emerging-technologies-grant)
  - matched: Opportunity appears active.; Project site state CA matches opportunity geography.; Self-reported utility matches Silicon Valley Power.
  - unresolved: Opportunity building specificity (other) does not directly match the user's site type.
- likely_eligible / 96: Building Operator Certification Training Scholarships (SOURCE_SILICON_VALLEY_POWER:svp_source_section:ef0850c0e097a7f9:building-operator-certification-training-scholarships)
  - matched: Opportunity appears active.; Project site state CA matches opportunity geography.; Self-reported utility matches Silicon Valley Power.
  - unresolved: Opportunity building specificity (multifamily, other) does not directly match the user's site type.
- likely_eligible / 96: Business Energy Investment Tax Credit (ITC) (SOURCE_DSIRE:dsire_program_id:658)
  - matched: Opportunity appears active.; Opportunity appears nationwide.; Utility provider is not applicable to this opportunity.
  - unresolved: No specific eligible building type was normalized.
- likely_eligible / 96: USDA - Rural Energy for America Program (REAP) Loan Guarantees (SOURCE_DSIRE:dsire_program_id:2511)
  - matched: Opportunity appears active.; Opportunity appears nationwide.; Utility provider is not applicable to this opportunity.
  - unresolved: No specific eligible building type was normalized.
- likely_eligible / 96: RFQ-25-401 - Energy Code Compliance Evaluation Support (SOURCE_CA_ENERGY_COMMISSION:cec_solicitation_number:RFQ-25-401)
  - matched: Opportunity appears active.; Project site state CA matches opportunity geography.; Opportunity explicitly has no electric utility restriction.
  - unresolved: Opportunity building specificity (other) does not directly match the user's site type.

Common next questions:
- project.technologyIds: 7

Common unresolved requirements among promising matches:
- Opportunity building specificity (other) does not directly match the user's site type.: 38
- Opportunity appears upcoming; application timing should be verified.: 19
- No specific eligible building type was normalized.: 16
- No project technology was normalized.: 7
- Opportunity building specificity (multifamily) does not directly match the user's site type.: 2

Retrofit types inferred from promising matches:
- Low-flow fixture retrofit: 21
- High-efficiency HVAC replacement: 17
- LED lighting retrofit: 8
- Battery storage system: 7
- Biomass / biogas energy system: 7
- Combined heat and power system: 7
- Ground-source / geothermal heat pump: 7
- Heat pump HVAC retrofit: 6

Common blockers across rejected/unavailable opportunities:
- Opportunity appears residential-only and the user profile is nonresidential.: 451
- Opportunity appears unavailable or the application deadline has passed.: 209
- Selected improvements do not match opportunity technologies (ev_charging).: 153
- Project site state CA does not match opportunity geography MN.: 86
- Selected improvements do not match opportunity technologies (ev_charging, fleet_electrification).: 71

### sample-ca-pge-san-jose-restaurant-kitchen

San Jose restaurant and commercial kitchen evaluating kitchen equipment and lighting.

Normalized profile:
```json
{
  "organizationTypes": [
    "commercial"
  ],
  "stateCode": "CA",
  "zip5": "95110",
  "utility": {
    "selfReportedName": "PG&E",
    "distributionUtilityId": "UTIL_PGE",
    "territoryCandidates": [
      "UTIL_PGE"
    ],
    "verificationStatus": "self_reported_unverified",
    "customerClass": null
  },
  "ownershipRelationship": "tenant",
  "buildingTypes": [
    "restaurant"
  ],
  "squareFootage": {
    "value": 8500,
    "raw": "8,500",
    "parsingStatus": "parsed"
  },
  "technologyIds": [
    "commercial_kitchen",
    "lighting"
  ]
}
```

Status counts:
```json
{
  "eligible_active": 0,
  "likely_eligible": 24,
  "needs_information": 0,
  "upcoming": 16,
  "manual_review": 7,
  "ineligible": 1840,
  "unavailable": 209
}
```

Top matches requiring no hard blocker:
- likely_eligible / 96: USDA - Biorefinery, Renewable Chemical, and Biobased Product Manufacturing Assistance Program (SOURCE_DSIRE:dsire_program_id:5313)
  - matched: Opportunity appears active.; Opportunity appears nationwide.; Utility provider is not applicable to this opportunity.
  - unresolved: No specific eligible building type was normalized.
- likely_eligible / 96: PG&E - Non-Residential Energy Efficiency Rebates (SOURCE_DSIRE:dsire_program_id:4899)
  - matched: Opportunity appears active.; Project site state CA matches opportunity geography.; Self-reported utility matches PG&E.
  - unresolved: No specific eligible building type was normalized.
- likely_eligible / 96: Business Energy Investment Tax Credit (ITC) (SOURCE_DSIRE:dsire_program_id:658)
  - matched: Opportunity appears active.; Opportunity appears nationwide.; Utility provider is not applicable to this opportunity.
  - unresolved: No specific eligible building type was normalized.
- likely_eligible / 96: USDA - Rural Energy for America Program (REAP) Loan Guarantees (SOURCE_DSIRE:dsire_program_id:2511)
  - matched: Opportunity appears active.; Opportunity appears nationwide.; Utility provider is not applicable to this opportunity.
  - unresolved: No specific eligible building type was normalized.
- likely_eligible / 96: RFQ-25-401 - Energy Code Compliance Evaluation Support (SOURCE_CA_ENERGY_COMMISSION:cec_solicitation_number:RFQ-25-401)
  - matched: Opportunity appears active.; Project site state CA matches opportunity geography.; Opportunity explicitly has no electric utility restriction.
  - unresolved: Opportunity building specificity (other) does not directly match the user's site type.
- likely_eligible / 96: Statewide Midstream Water Heating (SOURCE_SDGE_BUSINESS:program_url:statewide_waterheating_com)
  - matched: Project site state CA matches opportunity geography.; Self-reported utility matches PG&E.; Applicant type overlaps eligible sector: commercial.
  - unresolved: Availability is uncertain.; Opportunity building specificity (other) does not directly match the user's site type.
- likely_eligible / 96: PON-17-401 - Financing for Energy Efficiency and Renewable Energy Generation Projects (SOURCE_CA_ENERGY_COMMISSION:cec_solicitation_number:PON-17-401)
  - matched: Project site state CA matches opportunity geography.; Opportunity explicitly has no electric utility restriction.; Applicant type overlaps eligible sector: commercial.
  - unresolved: Availability is uncertain.; Opportunity building specificity (other, medical) does not directly match the user's site type.
- likely_eligible / 96: San Diego County - Green Building Program (SOURCE_DSIRE:dsire_program_id:1105)
  - matched: Opportunity appears active.; Project site state CA matches opportunity geography.; No utility restriction was found after source review.
  - unresolved: No specific eligible building type was normalized.
- likely_eligible / 96: Fannie Mae Green Financing – Loan Program (SOURCE_DSIRE:dsire_program_id:5780)
  - matched: Opportunity appears active.; Opportunity appears nationwide.; Utility provider is not applicable to this opportunity.
  - unresolved: Opportunity building specificity (multifamily) does not directly match the user's site type.
- likely_eligible / 96: PON-24-002 - K–12 Energy Efficiency Program (KTEP) (SOURCE_CA_ENERGY_COMMISSION:cec_solicitation_number:PON-24-002)
  - matched: Opportunity appears active.; Project site state CA matches opportunity geography.; Opportunity explicitly has no electric utility restriction.
  - unresolved: Opportunity building specificity (other) does not directly match the user's site type.
- likely_eligible / 96: Plumas-Sierra REC - Commercial and Irrigation Rebate Program (SOURCE_DSIRE:dsire_program_id:22067)
  - matched: Opportunity appears active.; Project site state CA matches opportunity geography.; No utility restriction was found after source review.
  - unresolved: No specific eligible building type was normalized.
- likely_eligible / 96: California Energy Design Assistance (CEDA) (SOURCE_DSIRE:dsire_program_id:1455)
  - matched: Opportunity appears active.; Project site state CA matches opportunity geography.; Self-reported utility matches PG&E.
  - unresolved: Opportunity building specificity (multifamily) does not directly match the user's site type.

Common next questions:
- project.technologyIds: 7

Common unresolved requirements among promising matches:
- Opportunity building specificity (other) does not directly match the user's site type.: 20
- Opportunity appears upcoming; application timing should be verified.: 16
- No specific eligible building type was normalized.: 12
- No project technology was normalized.: 7
- Opportunity building specificity (office) does not directly match the user's site type.: 3

Retrofit types inferred from promising matches:
- High-efficiency HVAC replacement: 7
- LED lighting retrofit: 6
- Biomass / biogas energy system: 5
- Ground-source / geothermal heat pump: 5
- Battery storage system: 3
- Combined heat and power system: 3
- Insulation upgrade: 3
- Energy audit: 2

Common blockers across rejected/unavailable opportunities:
- Opportunity appears residential-only and the user profile is nonresidential.: 451
- Opportunity appears unavailable or the application deadline has passed.: 209
- Selected improvements do not match opportunity technologies (solar).: 162
- Selected improvements do not match opportunity technologies (ev_charging).: 153
- Project site state CA does not match opportunity geography MN.: 86

## Immediate Iteration Targets

1. Improve utility resolution for `Other / Not sure` users by geocoding and service-territory lookup instead of relying on the current form option.
2. Split offer-level sectors/technologies more carefully for DSIRE parameter sets to reduce residential/commercial leakage.
3. Add source-specific availability handling for CEC awarded solicitations and utility pages with no explicit deadline.
4. Add a small hand-reviewed truth fixture for the top 20 matches per sample user; this is the realistic way to approach exhaustive validation without pretending all 20,960 pairings were manually adjudicated.
