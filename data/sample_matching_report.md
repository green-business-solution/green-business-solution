# Sample Matching Report

Generated: 2026-06-25T21:26:47.837Z
Matcher clock: 2026-06-25T21:26:30.628Z
Opportunities evaluated: 2096
Sample users evaluated: 10
Pairings evaluated: 20960

This is a deterministic first-pass matcher audit. It is not a human-reviewed ground-truth label set yet.
The script evaluates every current opportunity against each sample profile, then reports the strongest matches and the most common unknowns/blockers.
Full JSON output: `/tmp/retrofi-sample-matching-results.json`

## Global Notes

- Hard failures are limited to explicit unavailable status/deadline, state mismatch, utility mismatch, residential-only mismatch, applicant mismatch, technology mismatch, and parsed numeric threshold failure.
- Missing utility restriction, missing building specificity, and ambiguous opportunity geography return `unknown` rather than a false rejection.
- Current form limitations are visible for non-California sample users because the utility picker only has California utilities plus `Other / Not sure`.
- This report is designed to be iterated: manually inspect top false positives/false negatives, update extraction/ontology rules, rerun.

## Sample User Results

### sample-ca-sdge-ag-office-ev

Agricultural organization with an office site in San Diego exploring EV charging.

Normalized profile:
```json
{
  "organizationTypes": [
    "agricultural"
  ],
  "stateCode": "CA",
  "zip5": "92101",
  "utility": {
    "selfReportedName": "SDG&E",
    "distributionUtilityId": "UTIL_SDGE",
    "territoryCandidates": [
      "UTIL_SDGE"
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
  "likely_eligible": 26,
  "needs_information": 0,
  "upcoming": 10,
  "manual_review": 13,
  "ineligible": 1838,
  "unavailable": 209
}
```

Top matches requiring no hard blocker:
- likely_eligible / 96: Power Your Drive for Fleets (SOURCE_SDGE_BUSINESS:program_url:sdge_com_node_15131)
  - matched: Project site state CA matches opportunity geography.; Self-reported utility matches SDG&E.; Nonresidential applicant is compatible with broad commercial eligibility.
  - unresolved: Availability is uncertain.; Opportunity building specificity (other) does not directly match the user's site type.
- likely_eligible / 96: Hydrogen 101 for Fleets (SOURCE_SDGE_BUSINESS:program_url:sdge_com_node_26181)
  - matched: Project site state CA matches opportunity geography.; Self-reported utility matches SDG&E.; Nonresidential applicant is compatible with broad commercial eligibility.
  - unresolved: Availability is uncertain.; Opportunity building specificity (other) does not directly match the user's site type.
- likely_eligible / 96: Power Your Drive for Workplaces (SOURCE_SDGE_BUSINESS:program_url:sdge_com_node_21406)
  - matched: Project site state CA matches opportunity geography.; Self-reported utility matches SDG&E.; Nonresidential applicant is compatible with broad commercial eligibility.
  - unresolved: Availability is uncertain.; Opportunity building specificity (other) does not directly match the user's site type.
- likely_eligible / 96: EV Infrastructure Rule (SOURCE_SDGE_BUSINESS:program_url:sdge_com_node_22121)
  - matched: Project site state CA matches opportunity geography.; Self-reported utility matches SDG&E.; Nonresidential applicant is compatible with broad commercial eligibility.
  - unresolved: Availability is uncertain.; Opportunity building specificity (other) does not directly match the user's site type.
- likely_eligible / 96: Transportation Electrification Advisory Services (TEAS) (SOURCE_SDGE_BUSINESS:program_url:teas_sdge_com)
  - matched: Project site state CA matches opportunity geography.; Self-reported utility matches SDG&E.; Nonresidential applicant is compatible with broad commercial eligibility.
  - unresolved: Availability is uncertain.; Opportunity building specificity (other) does not directly match the user's site type.
- likely_eligible / 96: Electric Vehicle Submeter Billing (SOURCE_SDGE_BUSINESS:program_url:sdge_com_node_25406)
  - matched: Project site state CA matches opportunity geography.; Self-reported utility matches SDG&E.; Nonresidential applicant is compatible with broad commercial eligibility.
  - unresolved: Availability is uncertain.; Opportunity building specificity (other) does not directly match the user's site type.
- likely_eligible / 96: Charge with lower pricing (SOURCE_SDGE_BUSINESS:program_url:sdge_com_node_16456)
  - matched: Opportunity appears active.; Project site state CA matches opportunity geography.; Self-reported utility matches SDG&E.
  - unresolved: Opportunity building specificity (other) does not directly match the user's site type.
- likely_eligible / 96: Power Your Drive for Apartments and Condos (SOURCE_SDGE_BUSINESS:program_url:sdge_com_node_21401)
  - matched: Project site state CA matches opportunity geography.; Self-reported utility matches SDG&E.; Nonresidential applicant is compatible with broad commercial eligibility.
  - unresolved: Availability is uncertain.; Opportunity building specificity (multifamily, other) does not directly match the user's site type.
- likely_eligible / 96: National Electric Vehicle Infrastructure (NEVI) Program (SOURCE_SDGE_BUSINESS:program_url:sdge_com_node_23891)
  - matched: Project site state CA matches opportunity geography.; Self-reported utility matches SDG&E.; Nonresidential applicant is compatible with broad commercial eligibility.
  - unresolved: Availability is uncertain.; Opportunity building specificity (other) does not directly match the user's site type.
- likely_eligible / 87: Lodi Electric Utility - Commercial Energy Efficiency Rebate Program (SOURCE_DSIRE:dsire_program_id:4583)
  - matched: Opportunity appears active.; Project site state CA matches opportunity geography.; Nonresidential applicant is compatible with broad commercial eligibility.
  - unresolved: No explicit utility restriction was normalized.; Opportunity building specificity (multifamily) does not directly match the user's site type.
- likely_eligible / 87: Truckee Donner Public Utility District - Energy Conservation Rebate Program (SOURCE_DSIRE:dsire_program_id:1925)
  - matched: Opportunity appears active.; Project site state CA matches opportunity geography.; Nonresidential applicant is compatible with broad commercial eligibility.
  - unresolved: No explicit utility restriction was normalized.; No specific eligible building type was normalized.
- likely_eligible / 87: Alameda Municipal Power - Electric Vehicle Rebate Program (SOURCE_DSIRE:dsire_program_id:22274)
  - matched: Opportunity appears active.; Project site state CA matches opportunity geography.; Nonresidential applicant is compatible with broad commercial eligibility.
  - unresolved: No explicit utility restriction was normalized.; Opportunity building specificity (multifamily) does not directly match the user's site type.

Common next questions:
- site.utility.electric.distributionUtilityId: 26

Common unresolved requirements among promising matches:
- No explicit utility restriction was normalized.: 26
- Opportunity building specificity (other) does not directly match the user's site type.: 22
- Opportunity appears upcoming; application timing should be verified.: 10
- Availability is uncertain.: 8
- No project technology was normalized.: 7

Common blockers across rejected/unavailable opportunities:
- Opportunity appears residential-only and the user profile is nonresidential.: 451
- Selected improvements do not match opportunity technologies (energy_efficiency).: 211
- Opportunity appears unavailable or the application deadline has passed.: 209
- Selected improvements do not match opportunity technologies (solar).: 162
- Project site state CA does not match opportunity geography MN.: 86

### sample-ca-pge-restaurant-kitchen

Commercial restaurant in PG&E territory evaluating kitchen equipment and lighting.

Normalized profile:
```json
{
  "organizationTypes": [
    "commercial"
  ],
  "stateCode": "CA",
  "zip5": "93721",
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
  "likely_eligible": 48,
  "needs_information": 0,
  "upcoming": 16,
  "manual_review": 10,
  "ineligible": 1813,
  "unavailable": 209
}
```

Top matches requiring no hard blocker:
- likely_eligible / 96: PG&E - Non-Residential Energy Efficiency Rebates (SOURCE_DSIRE:dsire_program_id:4899)
  - matched: Opportunity appears active.; Project site state CA matches opportunity geography.; Self-reported utility matches PG&E.
  - unresolved: No specific eligible building type was normalized.
- likely_eligible / 96: California Energy Design Assistance (CEDA) (SOURCE_DSIRE:dsire_program_id:1455)
  - matched: Opportunity appears active.; Project site state CA matches opportunity geography.; Self-reported utility matches PG&E.
  - unresolved: Opportunity building specificity (multifamily) does not directly match the user's site type.
- likely_eligible / 91: City of Palo Alto Utilities - Commercial Energy Efficiency Rebate Program (SOURCE_DSIRE:dsire_program_id:1684)
  - matched: Opportunity appears active.; Project site state CA matches opportunity geography.; Applicant type overlaps eligible sector: commercial.
  - unresolved: No explicit utility restriction was normalized.
- likely_eligible / 91: Pasadena Water and Power - Commercial Energy Efficiency Rebate Program (SOURCE_DSIRE:dsire_program_id:3260)
  - matched: Opportunity appears active.; Project site state CA matches opportunity geography.; Applicant type overlaps eligible sector: commercial.
  - unresolved: No explicit utility restriction was normalized.
- likely_eligible / 87: USDA - Biorefinery, Renewable Chemical, and Biobased Product Manufacturing Assistance Program (SOURCE_DSIRE:dsire_program_id:5313)
  - matched: Opportunity appears active.; Opportunity appears nationwide.; Applicant type overlaps eligible sector: commercial.
  - unresolved: No explicit utility restriction was normalized.; No specific eligible building type was normalized.
- likely_eligible / 87: Lodi Electric Utility - Commercial Energy Efficiency Rebate Program (SOURCE_DSIRE:dsire_program_id:4583)
  - matched: Opportunity appears active.; Project site state CA matches opportunity geography.; Applicant type overlaps eligible sector: commercial.
  - unresolved: No explicit utility restriction was normalized.; Opportunity building specificity (multifamily) does not directly match the user's site type.
- likely_eligible / 87: Alameda Municipal Power - Commercial New Construction Rebate Program (SOURCE_DSIRE:dsire_program_id:1611)
  - matched: Opportunity appears rolling or no-deadline.; Project site state CA matches opportunity geography.; Applicant type overlaps eligible sector: commercial.
  - unresolved: No explicit utility restriction was normalized.; No specific eligible building type was normalized.
- likely_eligible / 87: Truckee Donner Public Utility District - Energy Conservation Rebate Program (SOURCE_DSIRE:dsire_program_id:1925)
  - matched: Opportunity appears active.; Project site state CA matches opportunity geography.; Applicant type overlaps eligible sector: commercial.
  - unresolved: No explicit utility restriction was normalized.; No specific eligible building type was normalized.
- likely_eligible / 87: SoCalGas - Custom Non-Residential Energy Efficiency Program (SOURCE_DSIRE:dsire_program_id:4952)
  - matched: Opportunity appears active.; Project site state CA matches opportunity geography.; Applicant type overlaps eligible sector: commercial.
  - unresolved: No explicit utility restriction was normalized.; No specific eligible building type was normalized.
- likely_eligible / 87: Lodi Electric Utility - Commercial and Industrial Energy Efficiency Loan Program (SOURCE_DSIRE:dsire_program_id:5854)
  - matched: Opportunity appears active.; Project site state CA matches opportunity geography.; Applicant type overlaps eligible sector: commercial.
  - unresolved: No explicit utility restriction was normalized.; No specific eligible building type was normalized.
- likely_eligible / 87: Business Energy Investment Tax Credit (ITC) (SOURCE_DSIRE:dsire_program_id:658)
  - matched: Opportunity appears active.; Opportunity appears nationwide.; Applicant type overlaps eligible sector: commercial.
  - unresolved: No explicit utility restriction was normalized.; No specific eligible building type was normalized.
- likely_eligible / 87: Burbank Water & Power - Business Bucks Energy Efficiency Grant Program (SOURCE_DSIRE:dsire_program_id:1631)
  - matched: Opportunity appears active.; Project site state CA matches opportunity geography.; Applicant type overlaps eligible sector: commercial.
  - unresolved: No explicit utility restriction was normalized.; No specific eligible building type was normalized.

Common next questions:
- site.utility.electric.distributionUtilityId: 62

Common unresolved requirements among promising matches:
- No explicit utility restriction was normalized.: 62
- No specific eligible building type was normalized.: 29
- Opportunity building specificity (other) does not directly match the user's site type.: 19
- Opportunity appears upcoming; application timing should be verified.: 16
- No project technology was normalized.: 7

Common blockers across rejected/unavailable opportunities:
- Opportunity appears residential-only and the user profile is nonresidential.: 451
- Opportunity appears unavailable or the application deadline has passed.: 209
- Selected improvements do not match opportunity technologies (solar).: 162
- Selected improvements do not match opportunity technologies (ev_charging).: 153
- Project site state CA does not match opportunity geography MN.: 86

### sample-ca-sce-warehouse-hvac-led

Warehouse in SCE territory considering HVAC and LED upgrades.

Normalized profile:
```json
{
  "organizationTypes": [
    "commercial"
  ],
  "stateCode": "CA",
  "zip5": "92501",
  "utility": {
    "selfReportedName": "Southern California Edison",
    "distributionUtilityId": "UTIL_SCE",
    "territoryCandidates": [
      "UTIL_SCE"
    ],
    "verificationStatus": "self_reported_unverified",
    "customerClass": null
  },
  "ownershipRelationship": "property_manager",
  "buildingTypes": [
    "warehouse"
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
  "eligible_active": 0,
  "likely_eligible": 56,
  "needs_information": 0,
  "upcoming": 18,
  "manual_review": 11,
  "ineligible": 1802,
  "unavailable": 209
}
```

Top matches requiring no hard blocker:
- likely_eligible / 96: HVAC Optimization Program (SOURCE_SCE_BUSINESS:sce_source_section:bcdeae04c5863d3b:hvac-optimization-program)
  - matched: Opportunity appears active.; Project site state CA matches opportunity geography.; Self-reported utility matches Southern California Edison.
  - unresolved: Opportunity building specificity (other) does not directly match the user's site type.
- likely_eligible / 96: On-Bill Financing (SOURCE_SCE_BUSINESS:sce_source_section:f4ae5887bd3fcdc9:on-bill-financing)
  - matched: Opportunity appears active.; Project site state CA matches opportunity geography.; Self-reported utility matches Southern California Edison.
  - unresolved: Opportunity building specificity (other) does not directly match the user's site type.
- likely_eligible / 96: Retrocommissioning Program (SOURCE_SCE_BUSINESS:sce_source_section:bcdeae04c5863d3b:retrocommissioning-program)
  - matched: Opportunity appears active.; Project site state CA matches opportunity geography.; Self-reported utility matches Southern California Edison.
  - unresolved: Opportunity building specificity (other) does not directly match the user's site type.
- likely_eligible / 96: Continuous Energy Improvement (SOURCE_SCE_BUSINESS:sce_source_section:bcdeae04c5863d3b:continuous-energy-improvement)
  - matched: Opportunity appears active.; Project site state CA matches opportunity geography.; Self-reported utility matches Southern California Edison.
  - unresolved: Opportunity building specificity (other) does not directly match the user's site type.
- likely_eligible / 96: SCE - Non-Residential On-Bill Financing Program (SOURCE_DSIRE:dsire_program_id:4250)
  - matched: Opportunity appears active.; Project site state CA matches opportunity geography.; Self-reported utility matches Southern California Edison.
  - unresolved: Opportunity building specificity (multifamily) does not directly match the user's site type.
- likely_eligible / 96: Sonoma County Energy Independence Program (SCEIP) (SOURCE_DSIRE:dsire_program_id:3334)
  - matched: Opportunity appears active.; Project site state CA matches opportunity geography.; Self-reported utility matches Southern California Edison.
  - unresolved: Opportunity building specificity (multifamily) does not directly match the user's site type.
- likely_eligible / 96: GoGreen Business Energy Financing (SOURCE_SCE_BUSINESS:sce_source_section:f4ae5887bd3fcdc9:gogreen-business-energy-financing)
  - matched: Opportunity appears active.; Project site state CA matches opportunity geography.; Self-reported utility matches Southern California Edison.
  - unresolved: Opportunity building specificity (other) does not directly match the user's site type.
- likely_eligible / 96: ReCharge Rebate (SOURCE_SCE_BUSINESS:sce_source_section:d049d8b8e95077d7:recharge-rebate)
  - matched: Opportunity appears active.; Project site state CA matches opportunity geography.; Self-reported utility matches Southern California Edison.
  - unresolved: Opportunity building specificity (other) does not directly match the user's site type.
- likely_eligible / 91: Turlock Irrigation District - Commercial Energy Efficiency Rebate Program (SOURCE_DSIRE:dsire_program_id:22071)
  - matched: Opportunity appears active.; Project site state CA matches opportunity geography.; Applicant type overlaps eligible sector: commercial.
  - unresolved: No explicit utility restriction was normalized.
- likely_eligible / 87: USDA - Biorefinery, Renewable Chemical, and Biobased Product Manufacturing Assistance Program (SOURCE_DSIRE:dsire_program_id:5313)
  - matched: Opportunity appears active.; Opportunity appears nationwide.; Applicant type overlaps eligible sector: commercial.
  - unresolved: No explicit utility restriction was normalized.; No specific eligible building type was normalized.
- likely_eligible / 87: Lodi Electric Utility - Commercial Energy Efficiency Rebate Program (SOURCE_DSIRE:dsire_program_id:4583)
  - matched: Opportunity appears active.; Project site state CA matches opportunity geography.; Applicant type overlaps eligible sector: commercial.
  - unresolved: No explicit utility restriction was normalized.; Opportunity building specificity (multifamily) does not directly match the user's site type.
- likely_eligible / 87: Alameda Municipal Power - Commercial New Construction Rebate Program (SOURCE_DSIRE:dsire_program_id:1611)
  - matched: Opportunity appears rolling or no-deadline.; Project site state CA matches opportunity geography.; Applicant type overlaps eligible sector: commercial.
  - unresolved: No explicit utility restriction was normalized.; No specific eligible building type was normalized.

Common next questions:
- site.utility.electric.distributionUtilityId: 66

Common unresolved requirements among promising matches:
- No explicit utility restriction was normalized.: 66
- No specific eligible building type was normalized.: 29
- Opportunity building specificity (other) does not directly match the user's site type.: 27
- Opportunity appears upcoming; application timing should be verified.: 18
- No project technology was normalized.: 7

Common blockers across rejected/unavailable opportunities:
- Opportunity appears residential-only and the user profile is nonresidential.: 451
- Opportunity appears unavailable or the application deadline has passed.: 209
- Selected improvements do not match opportunity technologies (solar).: 162
- Selected improvements do not match opportunity technologies (ev_charging).: 153
- Project site state CA does not match opportunity geography MN.: 86

### sample-ca-svp-nonprofit-solar

Nonprofit facility in Silicon Valley Power territory considering solar and battery storage.

Normalized profile:
```json
{
  "organizationTypes": [
    "nonprofit"
  ],
  "stateCode": "CA",
  "zip5": "95050",
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
  "eligible_active": 0,
  "likely_eligible": 19,
  "needs_information": 0,
  "upcoming": 10,
  "manual_review": 12,
  "ineligible": 1846,
  "unavailable": 209
}
```

Top matches requiring no hard blocker:
- likely_eligible / 96: Commercial Solar Rebate Program (SOURCE_SILICON_VALLEY_POWER:svp_source_section:6e6b359eb5fc98c0:commercial-solar-rebate-program)
  - matched: Opportunity appears active.; Project site state CA matches opportunity geography.; Self-reported utility matches Silicon Valley Power.
  - unresolved: Opportunity building specificity (other) does not directly match the user's site type.
- likely_eligible / 96: Nonprofit Solar Grant (SOURCE_SILICON_VALLEY_POWER:svp_source_section:6e6b359eb5fc98c0:nonprofit-solar-grant)
  - matched: Opportunity appears active.; Project site state CA matches opportunity geography.; Self-reported utility matches Silicon Valley Power.
  - unresolved: Opportunity building specificity (other) does not directly match the user's site type.
- likely_eligible / 91: Energy Efficiency Financing for Public Sector Projects (SOURCE_DSIRE:dsire_program_id:5131)
  - matched: Opportunity appears active.; Project site state CA matches opportunity geography.; Nonresidential applicant is compatible with broad commercial eligibility.
  - unresolved: No explicit utility restriction was normalized.
- likely_eligible / 87: SoCalGas - Custom Non-Residential Energy Efficiency Program (SOURCE_DSIRE:dsire_program_id:4952)
  - matched: Opportunity appears active.; Project site state CA matches opportunity geography.; Nonresidential applicant is compatible with broad commercial eligibility.
  - unresolved: No explicit utility restriction was normalized.; No specific eligible building type was normalized.
- likely_eligible / 87: Business Energy Investment Tax Credit (ITC) (SOURCE_DSIRE:dsire_program_id:658)
  - matched: Opportunity appears active.; Opportunity appears nationwide.; Applicant type overlaps eligible sector: nonprofit.
  - unresolved: No explicit utility restriction was normalized.; No specific eligible building type was normalized.
- likely_eligible / 87: USDA - Rural Energy for America Program (REAP) Loan Guarantees (SOURCE_DSIRE:dsire_program_id:2511)
  - matched: Opportunity appears active.; Opportunity appears nationwide.; Nonresidential applicant is compatible with broad commercial eligibility.
  - unresolved: No explicit utility restriction was normalized.; No specific eligible building type was normalized.
- likely_eligible / 87: Burbank Water & Power - Energy Solutions Business Rebate Program (SOURCE_DSIRE:dsire_program_id:1630)
  - matched: Opportunity appears active.; Project site state CA matches opportunity geography.; Applicant type overlaps eligible sector: nonprofit.
  - unresolved: No explicit utility restriction was normalized.; No specific eligible building type was normalized.
- likely_eligible / 87: Self-Generation Incentive Program (SOURCE_DSIRE:dsire_program_id:552)
  - matched: Opportunity appears active.; Project site state CA matches opportunity geography.; Applicant type overlaps eligible sector: nonprofit.
  - unresolved: No explicit utility restriction was normalized.; Opportunity building specificity (retail) does not directly match the user's site type.
- likely_eligible / 87: GFO-25-308 - Distributed Clean Hydrogen Production with Onsite End Use (H2ONSITE) (SOURCE_CA_ENERGY_COMMISSION:cec_solicitation_number:GFO-25-308)
  - matched: Opportunity appears active.; Project site state CA matches opportunity geography.; Nonresidential applicant is compatible with broad commercial eligibility.
  - unresolved: No explicit utility restriction was normalized.; Opportunity building specificity (retail, other) does not directly match the user's site type.
- likely_eligible / 87: USDA - Rural Energy for America Program (REAP) Grants (SOURCE_DSIRE:dsire_program_id:917)
  - matched: Opportunity appears active.; Opportunity appears nationwide.; Nonresidential applicant is compatible with broad commercial eligibility.
  - unresolved: No explicit utility restriction was normalized.; No specific eligible building type was normalized.
- likely_eligible / 87: Local Option - Municipal Energy Districts (SOURCE_DSIRE:dsire_program_id:3527)
  - matched: Opportunity appears active.; Project site state CA matches opportunity geography.; Nonresidential applicant is compatible with broad commercial eligibility.
  - unresolved: No explicit utility restriction was normalized.; Opportunity building specificity (medical) does not directly match the user's site type.
- likely_eligible / 87: Modified Accelerated Cost-Recovery System (MACRS) (SOURCE_DSIRE:dsire_program_id:676)
  - matched: Opportunity appears active.; Opportunity appears nationwide.; Nonresidential applicant is compatible with broad commercial eligibility.
  - unresolved: No explicit utility restriction was normalized.; No specific eligible building type was normalized.

Common next questions:
- site.utility.electric.distributionUtilityId: 27

Common unresolved requirements among promising matches:
- No explicit utility restriction was normalized.: 27
- No specific eligible building type was normalized.: 12
- Opportunity building specificity (other) does not directly match the user's site type.: 12
- Opportunity appears upcoming; application timing should be verified.: 10
- No project technology was normalized.: 7

Common blockers across rejected/unavailable opportunities:
- Opportunity appears residential-only and the user profile is nonresidential.: 451
- Selected improvements do not match opportunity technologies (energy_efficiency).: 211
- Opportunity appears unavailable or the application deadline has passed.: 209
- Selected improvements do not match opportunity technologies (ev_charging).: 153
- Project site state CA does not match opportunity geography MN.: 86

### sample-ca-ladwp-multifamily-water-controls

Multifamily property in Los Angeles considering water efficiency and controls.

Normalized profile:
```json
{
  "organizationTypes": [
    "multifamily"
  ],
  "stateCode": "CA",
  "zip5": "90012",
  "utility": {
    "selfReportedName": "LADWP",
    "distributionUtilityId": "UTIL_LADWP",
    "territoryCandidates": [
      "UTIL_LADWP"
    ],
    "verificationStatus": "self_reported_unverified",
    "customerClass": null
  },
  "ownershipRelationship": "owner",
  "buildingTypes": [
    "multifamily"
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
  "eligible_active": 0,
  "likely_eligible": 65,
  "needs_information": 0,
  "upcoming": 18,
  "manual_review": 10,
  "ineligible": 1794,
  "unavailable": 209
}
```

Top matches requiring no hard blocker:
- likely_eligible / 96: LADWP - Non-Residential Energy Efficiency Incentive Program (SOURCE_DSIRE:dsire_program_id:1866)
  - matched: Opportunity appears active.; Project site state CA matches opportunity geography.; Self-reported utility matches LADWP.
  - unresolved: No specific eligible building type was normalized.
- likely_eligible / 91: Lodi Electric Utility - Commercial Energy Efficiency Rebate Program (SOURCE_DSIRE:dsire_program_id:4583)
  - matched: Opportunity appears active.; Project site state CA matches opportunity geography.; Applicant type overlaps eligible sector: multifamily.
  - unresolved: No explicit utility restriction was normalized.
- likely_eligible / 91: Southern California Regional Energy Network (SoCalREN) - Multifamily Residential Energy Efficiency Rebate Program (SOURCE_DSIRE:dsire_program_id:22684)
  - matched: Opportunity appears active.; Project site state CA matches opportunity geography.; Applicant type overlaps eligible sector: multifamily.
  - unresolved: No explicit utility restriction was normalized.
- likely_eligible / 91: Alameda Municipal Power - Electric Vehicle Rebate Program (SOURCE_DSIRE:dsire_program_id:22274)
  - matched: Opportunity appears active.; Project site state CA matches opportunity geography.; Applicant type overlaps eligible sector: multifamily.
  - unresolved: No explicit utility restriction was normalized.
- likely_eligible / 91: SoCalGas - Non-Residential On-Bill Financing Program (SOURCE_DSIRE:dsire_program_id:2513)
  - matched: Opportunity appears active.; Project site state CA matches opportunity geography.; Applicant type overlaps eligible sector: multifamily.
  - unresolved: No explicit utility restriction was normalized.
- likely_eligible / 91: Modesto Irrigation District - Electric Vehicle  Charger Rebate Program (SOURCE_DSIRE:dsire_program_id:22525)
  - matched: Opportunity appears active.; Project site state CA matches opportunity geography.; Applicant type overlaps eligible sector: multifamily.
  - unresolved: No explicit utility restriction was normalized.
- likely_eligible / 91: SoCalGas - Multi-Family Residential Rebate Program (SOURCE_DSIRE:dsire_program_id:2508)
  - matched: Opportunity appears active.; Project site state CA matches opportunity geography.; Applicant type overlaps eligible sector: multifamily.
  - unresolved: No explicit utility restriction was normalized.
- likely_eligible / 91: Fannie Mae Green Financing – Loan Program (SOURCE_DSIRE:dsire_program_id:5780)
  - matched: Opportunity appears active.; Opportunity appears nationwide.; Applicant type overlaps eligible sector: multifamily.
  - unresolved: No explicit utility restriction was normalized.
- likely_eligible / 91: Energy-Efficient New Homes Tax Credit for Home Builders (SOURCE_DSIRE:dsire_program_id:1272)
  - matched: Opportunity appears active.; Opportunity appears nationwide.; Applicant type overlaps eligible sector: multifamily.
  - unresolved: No explicit utility restriction was normalized.
- likely_eligible / 91: Glendale Water and Power - Electric Vehicle Charging Station Rebate Program (SOURCE_DSIRE:dsire_program_id:22280)
  - matched: Opportunity appears active.; Project site state CA matches opportunity geography.; Applicant type overlaps eligible sector: multifamily.
  - unresolved: No explicit utility restriction was normalized.
- likely_eligible / 91: City of Lompoc Utilities - Residential Energy Efficiency Rebate Program (SOURCE_DSIRE:dsire_program_id:1663)
  - matched: Opportunity appears active.; Project site state CA matches opportunity geography.; Applicant type overlaps eligible sector: multifamily.
  - unresolved: No explicit utility restriction was normalized.
- likely_eligible / 91: Pacific Power - Residential Energy Efficiency Rebate Programs (SOURCE_DSIRE:dsire_program_id:3325)
  - matched: Opportunity appears active.; Project site state CA matches opportunity geography.; Applicant type overlaps eligible sector: multifamily.
  - unresolved: No explicit utility restriction was normalized.

Common next questions:
- site.utility.electric.distributionUtilityId: 82

Common unresolved requirements among promising matches:
- No explicit utility restriction was normalized.: 82
- No specific eligible building type was normalized.: 34
- Opportunity building specificity (other) does not directly match the user's site type.: 25
- Opportunity appears upcoming; application timing should be verified.: 18
- No project technology was normalized.: 7

Common blockers across rejected/unavailable opportunities:
- Applicant type multifamily does not match eligible sectors residential, other.: 321
- Opportunity appears unavailable or the application deadline has passed.: 209
- Selected improvements do not match opportunity technologies (solar).: 162
- Applicant type multifamily does not match eligible sectors residential.: 119
- Project site state CA does not match opportunity geography MN.: 86

### sample-ca-smud-public-office-solar-ev

Public agency office in SMUD territory considering solar and EV charging.

Normalized profile:
```json
{
  "organizationTypes": [
    "government"
  ],
  "stateCode": "CA",
  "zip5": "95814",
  "utility": {
    "selfReportedName": "SMUD",
    "distributionUtilityId": "UTIL_SMUD",
    "territoryCandidates": [
      "UTIL_SMUD"
    ],
    "verificationStatus": "self_reported_unverified",
    "customerClass": null
  },
  "ownershipRelationship": "owner",
  "buildingTypes": [
    "office"
  ],
  "squareFootage": {
    "value": 45000,
    "raw": "45,000",
    "parsingStatus": "parsed"
  },
  "technologyIds": [
    "solar",
    "ev_charging",
    "battery_storage"
  ]
}
```

Status counts:
```json
{
  "eligible_active": 0,
  "likely_eligible": 36,
  "needs_information": 0,
  "upcoming": 12,
  "manual_review": 12,
  "ineligible": 1827,
  "unavailable": 209
}
```

Top matches requiring no hard blocker:
- likely_eligible / 96: SMUD - Commercial Electric Vehicle Incentive Program (SOURCE_DSIRE:dsire_program_id:22290)
  - matched: Opportunity appears active.; Project site state CA matches opportunity geography.; Self-reported utility matches SMUD.
  - unresolved: No specific eligible building type was normalized.
- likely_eligible / 91: Energy Efficiency Financing for Public Sector Projects (SOURCE_DSIRE:dsire_program_id:5131)
  - matched: Opportunity appears active.; Project site state CA matches opportunity geography.; Applicant type overlaps eligible sector: government.
  - unresolved: No explicit utility restriction was normalized.
- likely_eligible / 87: Lodi Electric Utility - Commercial Energy Efficiency Rebate Program (SOURCE_DSIRE:dsire_program_id:4583)
  - matched: Opportunity appears active.; Project site state CA matches opportunity geography.; Nonresidential applicant is compatible with broad commercial eligibility.
  - unresolved: No explicit utility restriction was normalized.; Opportunity building specificity (multifamily) does not directly match the user's site type.
- likely_eligible / 87: Truckee Donner Public Utility District - Energy Conservation Rebate Program (SOURCE_DSIRE:dsire_program_id:1925)
  - matched: Opportunity appears active.; Project site state CA matches opportunity geography.; Nonresidential applicant is compatible with broad commercial eligibility.
  - unresolved: No explicit utility restriction was normalized.; No specific eligible building type was normalized.
- likely_eligible / 87: SoCalGas - Custom Non-Residential Energy Efficiency Program (SOURCE_DSIRE:dsire_program_id:4952)
  - matched: Opportunity appears active.; Project site state CA matches opportunity geography.; Nonresidential applicant is compatible with broad commercial eligibility.
  - unresolved: No explicit utility restriction was normalized.; No specific eligible building type was normalized.
- likely_eligible / 87: Business Energy Investment Tax Credit (ITC) (SOURCE_DSIRE:dsire_program_id:658)
  - matched: Opportunity appears active.; Opportunity appears nationwide.; Applicant type overlaps eligible sector: government.
  - unresolved: No explicit utility restriction was normalized.; No specific eligible building type was normalized.
- likely_eligible / 87: Alameda Municipal Power - Electric Vehicle Rebate Program (SOURCE_DSIRE:dsire_program_id:22274)
  - matched: Opportunity appears active.; Project site state CA matches opportunity geography.; Nonresidential applicant is compatible with broad commercial eligibility.
  - unresolved: No explicit utility restriction was normalized.; Opportunity building specificity (multifamily) does not directly match the user's site type.
- likely_eligible / 87: Pasadena Water and Power - Commercial Charger Incentive Program (SOURCE_DSIRE:dsire_program_id:22289)
  - matched: Opportunity appears active.; Project site state CA matches opportunity geography.; Nonresidential applicant is compatible with broad commercial eligibility.
  - unresolved: No explicit utility restriction was normalized.; No specific eligible building type was normalized.
- likely_eligible / 87: USDA - Rural Energy for America Program (REAP) Loan Guarantees (SOURCE_DSIRE:dsire_program_id:2511)
  - matched: Opportunity appears active.; Opportunity appears nationwide.; Applicant type overlaps eligible sector: government.
  - unresolved: No explicit utility restriction was normalized.; No specific eligible building type was normalized.
- likely_eligible / 87: Burbank Water & Power - Energy Solutions Business Rebate Program (SOURCE_DSIRE:dsire_program_id:1630)
  - matched: Opportunity appears active.; Project site state CA matches opportunity geography.; Nonresidential applicant is compatible with broad commercial eligibility.
  - unresolved: No explicit utility restriction was normalized.; No specific eligible building type was normalized.
- likely_eligible / 87: GFO-25-607 - Clean Transportation Program Hydrogen Infrastructure Project Opportunity (HIPO) (SOURCE_CA_ENERGY_COMMISSION:cec_solicitation_number:GFO-25-607)
  - matched: Opportunity appears active.; Project site state CA matches opportunity geography.; Applicant type overlaps eligible sector: government.
  - unresolved: No explicit utility restriction was normalized.; Opportunity building specificity (other) does not directly match the user's site type.
- likely_eligible / 87: Modesto Irrigation District - Electric Vehicle  Charger Rebate Program (SOURCE_DSIRE:dsire_program_id:22525)
  - matched: Opportunity appears active.; Project site state CA matches opportunity geography.; Applicant type overlaps eligible sector: government.
  - unresolved: No explicit utility restriction was normalized.; Opportunity building specificity (multifamily) does not directly match the user's site type.

Common next questions:
- site.utility.electric.distributionUtilityId: 47

Common unresolved requirements among promising matches:
- No explicit utility restriction was normalized.: 47
- No specific eligible building type was normalized.: 21
- Opportunity building specificity (other) does not directly match the user's site type.: 16
- Opportunity appears upcoming; application timing should be verified.: 12
- No project technology was normalized.: 7

Common blockers across rejected/unavailable opportunities:
- Opportunity appears residential-only and the user profile is nonresidential.: 451
- Selected improvements do not match opportunity technologies (energy_efficiency).: 211
- Opportunity appears unavailable or the application deadline has passed.: 209
- Project site state CA does not match opportunity geography MN.: 86
- Selected improvements do not match opportunity technologies (hvac, energy_efficiency).: 72

### sample-ca-other-retail-refrigeration

Retail site with uncertain utility evaluating refrigeration and lighting.

Normalized profile:
```json
{
  "organizationTypes": [
    "commercial"
  ],
  "stateCode": "CA",
  "zip5": "92805",
  "utility": {
    "selfReportedName": "Other / Not sure",
    "distributionUtilityId": null,
    "territoryCandidates": [],
    "verificationStatus": "unknown",
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
  "likely_eligible": 97,
  "needs_information": 0,
  "upcoming": 17,
  "manual_review": 16,
  "ineligible": 1757,
  "unavailable": 209
}
```

Top matches requiring no hard blocker:
- likely_eligible / 87: USDA - Biorefinery, Renewable Chemical, and Biobased Product Manufacturing Assistance Program (SOURCE_DSIRE:dsire_program_id:5313)
  - matched: Opportunity appears active.; Opportunity appears nationwide.; Applicant type overlaps eligible sector: commercial.
  - unresolved: No explicit utility restriction was normalized.; No specific eligible building type was normalized.
- likely_eligible / 87: PG&E - Non-Residential Energy Efficiency Rebates (SOURCE_DSIRE:dsire_program_id:4899)
  - matched: Opportunity appears active.; Project site state CA matches opportunity geography.; Applicant type overlaps eligible sector: commercial.
  - unresolved: User electric distribution utility is unknown.; No specific eligible building type was normalized.
- likely_eligible / 87: Lodi Electric Utility - Commercial Energy Efficiency Rebate Program (SOURCE_DSIRE:dsire_program_id:4583)
  - matched: Opportunity appears active.; Project site state CA matches opportunity geography.; Applicant type overlaps eligible sector: commercial.
  - unresolved: No explicit utility restriction was normalized.; Opportunity building specificity (multifamily) does not directly match the user's site type.
- likely_eligible / 87: Commercial Solar Rebate Program (SOURCE_SILICON_VALLEY_POWER:svp_source_section:6e6b359eb5fc98c0:commercial-solar-rebate-program)
  - matched: Opportunity appears active.; Project site state CA matches opportunity geography.; Applicant type overlaps eligible sector: commercial.
  - unresolved: User electric distribution utility is unknown.; Opportunity building specificity (other) does not directly match the user's site type.
- likely_eligible / 87: Alameda Municipal Power - Commercial New Construction Rebate Program (SOURCE_DSIRE:dsire_program_id:1611)
  - matched: Opportunity appears rolling or no-deadline.; Project site state CA matches opportunity geography.; Applicant type overlaps eligible sector: commercial.
  - unresolved: No explicit utility restriction was normalized.; No specific eligible building type was normalized.
- likely_eligible / 87: Truckee Donner Public Utility District - Energy Conservation Rebate Program (SOURCE_DSIRE:dsire_program_id:1925)
  - matched: Opportunity appears active.; Project site state CA matches opportunity geography.; Applicant type overlaps eligible sector: commercial.
  - unresolved: No explicit utility restriction was normalized.; No specific eligible building type was normalized.
- likely_eligible / 87: SoCalGas - Custom Non-Residential Energy Efficiency Program (SOURCE_DSIRE:dsire_program_id:4952)
  - matched: Opportunity appears active.; Project site state CA matches opportunity geography.; Applicant type overlaps eligible sector: commercial.
  - unresolved: No explicit utility restriction was normalized.; No specific eligible building type was normalized.
- likely_eligible / 87: Nonprofit Solar Grant (SOURCE_SILICON_VALLEY_POWER:svp_source_section:6e6b359eb5fc98c0:nonprofit-solar-grant)
  - matched: Opportunity appears active.; Project site state CA matches opportunity geography.; Applicant type overlaps eligible sector: commercial.
  - unresolved: User electric distribution utility is unknown.; Opportunity building specificity (other) does not directly match the user's site type.
- likely_eligible / 87: Lodi Electric Utility - Commercial and Industrial Energy Efficiency Loan Program (SOURCE_DSIRE:dsire_program_id:5854)
  - matched: Opportunity appears active.; Project site state CA matches opportunity geography.; Applicant type overlaps eligible sector: commercial.
  - unresolved: No explicit utility restriction was normalized.; No specific eligible building type was normalized.
- likely_eligible / 87: HVAC Optimization Program (SOURCE_SCE_BUSINESS:sce_source_section:bcdeae04c5863d3b:hvac-optimization-program)
  - matched: Opportunity appears active.; Project site state CA matches opportunity geography.; Applicant type overlaps eligible sector: commercial.
  - unresolved: User electric distribution utility is unknown.; Opportunity building specificity (other) does not directly match the user's site type.
- likely_eligible / 87: Emerging Technologies Grant (SOURCE_SILICON_VALLEY_POWER:svp_source_section:6e6b359eb5fc98c0:emerging-technologies-grant)
  - matched: Opportunity appears active.; Project site state CA matches opportunity geography.; Applicant type overlaps eligible sector: commercial.
  - unresolved: User electric distribution utility is unknown.; Opportunity building specificity (other) does not directly match the user's site type.
- likely_eligible / 87: Comfortably CA (SOURCE_SDGE_BUSINESS:program_url:comfortablyca_com)
  - matched: Opportunity appears active.; Project site state CA matches opportunity geography.; Applicant type overlaps eligible sector: commercial.
  - unresolved: User electric distribution utility is unknown.; Opportunity building specificity (retail, other) does not directly match the user's site type.

Common next questions:
- site.utility.electric.distributionUtilityId: 114

Common unresolved requirements among promising matches:
- No explicit utility restriction was normalized.: 64
- Opportunity building specificity (other) does not directly match the user's site type.: 50
- User electric distribution utility is unknown.: 50
- No specific eligible building type was normalized.: 33
- Opportunity appears upcoming; application timing should be verified.: 17

Common blockers across rejected/unavailable opportunities:
- Opportunity appears residential-only and the user profile is nonresidential.: 451
- Opportunity appears unavailable or the application deadline has passed.: 209
- Selected improvements do not match opportunity technologies (solar).: 162
- Selected improvements do not match opportunity technologies (ev_charging).: 153
- Project site state CA does not match opportunity geography MN.: 86

### sample-ny-multifamily-hvac-controls

New York multifamily property using the current form's Other utility option.

Normalized profile:
```json
{
  "organizationTypes": [
    "multifamily"
  ],
  "stateCode": "NY",
  "zip5": "10118",
  "utility": {
    "selfReportedName": "Other / Not sure",
    "distributionUtilityId": null,
    "territoryCandidates": [],
    "verificationStatus": "unknown",
    "customerClass": null
  },
  "ownershipRelationship": "property_manager",
  "buildingTypes": [
    "multifamily"
  ],
  "squareFootage": {
    "value": 120000,
    "raw": "120,000",
    "parsingStatus": "parsed"
  },
  "technologyIds": [
    "hvac",
    "building_controls"
  ]
}
```

Status counts:
```json
{
  "eligible_active": 0,
  "likely_eligible": 36,
  "needs_information": 0,
  "upcoming": 0,
  "manual_review": 9,
  "ineligible": 1842,
  "unavailable": 209
}
```

Top matches requiring no hard blocker:
- likely_eligible / 91: ConEd - Multifamily Energy Efficiency Incentives Program (SOURCE_DSIRE:dsire_program_id:3821)
  - matched: Opportunity appears active.; Project site state NY matches opportunity geography.; Applicant type overlaps eligible sector: multifamily.
  - unresolved: User electric distribution utility is unknown.
- likely_eligible / 91: RG&E (Gas) - Commercial and Industrial Efficiency Program (SOURCE_DSIRE:dsire_program_id:4575)
  - matched: Opportunity appears active.; Project site state NY matches opportunity geography.; Applicant type overlaps eligible sector: multifamily.
  - unresolved: No explicit utility restriction was normalized.
- likely_eligible / 91: Fannie Mae Green Financing – Loan Program (SOURCE_DSIRE:dsire_program_id:5780)
  - matched: Opportunity appears active.; Opportunity appears nationwide.; Applicant type overlaps eligible sector: multifamily.
  - unresolved: No explicit utility restriction was normalized.
- likely_eligible / 91: Energy-Efficient New Homes Tax Credit for Home Builders (SOURCE_DSIRE:dsire_program_id:1272)
  - matched: Opportunity appears active.; Opportunity appears nationwide.; Applicant type overlaps eligible sector: multifamily.
  - unresolved: No explicit utility restriction was normalized.
- likely_eligible / 91: NYSERDA – Buildings of Excellence Early Design Support  (RFP 3925 – D) (SOURCE_DSIRE:dsire_program_id:22447)
  - matched: Opportunity appears active.; Project site state NY matches opportunity geography.; Applicant type overlaps eligible sector: multifamily.
  - unresolved: User electric distribution utility is unknown.
- likely_eligible / 91: New York - Home Electrification and Appliance Rebate (HEAR) Program (SOURCE_DSIRE:dsire_program_id:22710)
  - matched: Opportunity appears active.; Project site state NY matches opportunity geography.; Applicant type overlaps eligible sector: multifamily.
  - unresolved: No explicit utility restriction was normalized.
- likely_eligible / 91: State of NY Commercial PACE Financing Program (SOURCE_DSIRE:dsire_program_id:3662)
  - matched: Opportunity appears active.; Project site state NY matches opportunity geography.; Applicant type overlaps eligible sector: multifamily.
  - unresolved: No explicit utility restriction was normalized.
- likely_eligible / 91: PSEG Long Island - Residential Energy Efficiency Rebate Program (SOURCE_DSIRE:dsire_program_id:2003)
  - matched: Opportunity appears active.; Project site state NY matches opportunity geography.; Applicant type overlaps eligible sector: multifamily.
  - unresolved: No explicit utility restriction was normalized.
- likely_eligible / 87: USDA - Biorefinery, Renewable Chemical, and Biobased Product Manufacturing Assistance Program (SOURCE_DSIRE:dsire_program_id:5313)
  - matched: Opportunity appears active.; Opportunity appears nationwide.; Nonresidential applicant is compatible with broad commercial eligibility.
  - unresolved: No explicit utility restriction was normalized.; No specific eligible building type was normalized.
- likely_eligible / 87: PSEG Long Island - Commercial Energy Efficiency Rebate Program (SOURCE_DSIRE:dsire_program_id:2004)
  - matched: Opportunity appears active.; Project site state NY matches opportunity geography.; Nonresidential applicant is compatible with broad commercial eligibility.
  - unresolved: No explicit utility restriction was normalized.; No specific eligible building type was normalized.
- likely_eligible / 87: National Fuel (Gas) - Commercial Energy Efficiency Program (SOURCE_DSIRE:dsire_program_id:3904)
  - matched: Opportunity appears active.; Project site state NY matches opportunity geography.; Nonresidential applicant is compatible with broad commercial eligibility.
  - unresolved: No explicit utility restriction was normalized.; No specific eligible building type was normalized.
- likely_eligible / 87: Business Energy Investment Tax Credit (ITC) (SOURCE_DSIRE:dsire_program_id:658)
  - matched: Opportunity appears active.; Opportunity appears nationwide.; Nonresidential applicant is compatible with broad commercial eligibility.
  - unresolved: No explicit utility restriction was normalized.; No specific eligible building type was normalized.

Common next questions:
- site.utility.electric.distributionUtilityId: 36

Common unresolved requirements among promising matches:
- No explicit utility restriction was normalized.: 30
- No specific eligible building type was normalized.: 23
- User electric distribution utility is unknown.: 6
- Opportunity building specificity (office) does not directly match the user's site type.: 2
- Opportunity building specificity (hospitality) does not directly match the user's site type.: 1

Common blockers across rejected/unavailable opportunities:
- Applicant type multifamily does not match eligible sectors residential, other.: 321
- Opportunity appears unavailable or the application deadline has passed.: 209
- Project site state NY does not match opportunity geography CA.: 177
- Selected improvements do not match opportunity technologies (solar).: 162
- Selected improvements do not match opportunity technologies (ev_charging).: 153

### sample-ma-office-lighting-hvac

Massachusetts commercial office interested in lighting and HVAC.

Normalized profile:
```json
{
  "organizationTypes": [
    "commercial"
  ],
  "stateCode": "MA",
  "zip5": "02201",
  "utility": {
    "selfReportedName": "Other / Not sure",
    "distributionUtilityId": null,
    "territoryCandidates": [],
    "verificationStatus": "unknown",
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
  "eligible_active": 0,
  "likely_eligible": 23,
  "needs_information": 0,
  "upcoming": 0,
  "manual_review": 5,
  "ineligible": 1859,
  "unavailable": 209
}
```

Top matches requiring no hard blocker:
- likely_eligible / 91: MassSAVE (Electric) - Commercial New Construction/Major Renovation Program (SOURCE_DSIRE:dsire_program_id:4791)
  - matched: Opportunity appears active.; Project site state MA matches opportunity geography.; Applicant type overlaps eligible sector: commercial.
  - unresolved: No explicit utility restriction was normalized.
- likely_eligible / 91: U.S. Department of Energy - Loan Guarantee Program (SOURCE_DSIRE:dsire_program_id:3071)
  - matched: Opportunity appears active.; Opportunity appears nationwide.; Applicant type overlaps eligible sector: commercial.
  - unresolved: No explicit utility restriction was normalized.
- likely_eligible / 91: USDA - Rural Energy for America Program (REAP) Energy Audit and Renewable Energy Development Assistance (EA/REDA) Program (SOURCE_DSIRE:dsire_program_id:5681)
  - matched: Opportunity appears active.; Opportunity appears nationwide.; Applicant type overlaps eligible sector: commercial.
  - unresolved: No explicit utility restriction was normalized.
- likely_eligible / 87: Chicopee Electric Light - Commercial Energy Efficiency Rebate Program (SOURCE_DSIRE:dsire_program_id:5239)
  - matched: Opportunity appears active.; Project site state MA matches opportunity geography.; Applicant type overlaps eligible sector: commercial.
  - unresolved: No explicit utility restriction was normalized.; Opportunity building specificity (multifamily) does not directly match the user's site type.
- likely_eligible / 87: USDA - Biorefinery, Renewable Chemical, and Biobased Product Manufacturing Assistance Program (SOURCE_DSIRE:dsire_program_id:5313)
  - matched: Opportunity appears active.; Opportunity appears nationwide.; Applicant type overlaps eligible sector: commercial.
  - unresolved: No explicit utility restriction was normalized.; No specific eligible building type was normalized.
- likely_eligible / 87: Mass Save (Electric) - Large Commercial Retrofit Program (SOURCE_DSIRE:dsire_program_id:4798)
  - matched: Opportunity appears active.; Project site state MA matches opportunity geography.; Applicant type overlaps eligible sector: commercial.
  - unresolved: No explicit utility restriction was normalized.; No specific eligible building type was normalized.
- likely_eligible / 87: Business Energy Investment Tax Credit (ITC) (SOURCE_DSIRE:dsire_program_id:658)
  - matched: Opportunity appears active.; Opportunity appears nationwide.; Applicant type overlaps eligible sector: commercial.
  - unresolved: No explicit utility restriction was normalized.; No specific eligible building type was normalized.
- likely_eligible / 87: PACE Massachusetts Financing (SOURCE_DSIRE:dsire_program_id:22037)
  - matched: Opportunity appears active.; Project site state MA matches opportunity geography.; Applicant type overlaps eligible sector: commercial.
  - unresolved: No explicit utility restriction was normalized.; No specific eligible building type was normalized.
- likely_eligible / 87: USDA - Rural Energy for America Program (REAP) Loan Guarantees (SOURCE_DSIRE:dsire_program_id:2511)
  - matched: Opportunity appears active.; Opportunity appears nationwide.; Applicant type overlaps eligible sector: commercial.
  - unresolved: No explicit utility restriction was normalized.; No specific eligible building type was normalized.
- likely_eligible / 87: Shrewsbury Electric - Commercial Energy Efficiency Rebate Program (SOURCE_DSIRE:dsire_program_id:22809)
  - matched: Opportunity appears active.; Project site state MA matches opportunity geography.; Applicant type overlaps eligible sector: commercial.
  - unresolved: No explicit utility restriction was normalized.; No specific eligible building type was normalized.
- likely_eligible / 87: Reading Municipal Light Department - Residential and Small Commercial Solar Rebate Program (SOURCE_DSIRE:dsire_program_id:22488)
  - matched: Opportunity appears active.; Project site state MA matches opportunity geography.; Applicant type overlaps eligible sector: commercial.
  - unresolved: No explicit utility restriction was normalized.; No specific eligible building type was normalized.
- likely_eligible / 87: Fannie Mae Green Financing – Loan Program (SOURCE_DSIRE:dsire_program_id:5780)
  - matched: Opportunity appears active.; Opportunity appears nationwide.; Applicant type overlaps eligible sector: commercial.
  - unresolved: No explicit utility restriction was normalized.; Opportunity building specificity (multifamily) does not directly match the user's site type.

Common next questions:
- site.utility.electric.distributionUtilityId: 23

Common unresolved requirements among promising matches:
- No explicit utility restriction was normalized.: 23
- No specific eligible building type was normalized.: 16
- Opportunity building specificity (multifamily) does not directly match the user's site type.: 2
- Opportunity building specificity (retail) does not directly match the user's site type.: 2

Common blockers across rejected/unavailable opportunities:
- Opportunity appears residential-only and the user profile is nonresidential.: 451
- Opportunity appears unavailable or the application deadline has passed.: 209
- Project site state MA does not match opportunity geography CA.: 177
- Selected improvements do not match opportunity technologies (solar).: 162
- Selected improvements do not match opportunity technologies (ev_charging).: 153

### sample-or-grocery-refrigeration

Oregon grocery site interested in refrigeration and commercial kitchen efficiency.

Normalized profile:
```json
{
  "organizationTypes": [
    "commercial"
  ],
  "stateCode": "OR",
  "zip5": "97204",
  "utility": {
    "selfReportedName": "Other / Not sure",
    "distributionUtilityId": null,
    "territoryCandidates": [],
    "verificationStatus": "unknown",
    "customerClass": null
  },
  "ownershipRelationship": "owner",
  "buildingTypes": [
    "grocery"
  ],
  "squareFootage": {
    "value": 22000,
    "raw": "22,000",
    "parsingStatus": "parsed"
  },
  "technologyIds": [
    "refrigeration",
    "commercial_kitchen",
    "lighting"
  ]
}
```

Status counts:
```json
{
  "eligible_active": 0,
  "likely_eligible": 86,
  "needs_information": 0,
  "upcoming": 3,
  "manual_review": 51,
  "ineligible": 1747,
  "unavailable": 209
}
```

Top matches requiring no hard blocker:
- likely_eligible / 91: Commercial Energy Efficiency Rebate for Existing Buildings (SOURCE_DSIRE:dsire_program_id:2437)
  - matched: Opportunity appears active.; Project site state OR matches opportunity geography.; Applicant type overlaps eligible sector: commercial.
  - unresolved: No explicit utility restriction was normalized.
- likely_eligible / 91: Emerald PUD - Commercial and Industrial Energy Efficiency Rebate Program (SOURCE_DSIRE:dsire_program_id:2138)
  - matched: Opportunity appears active.; Project site state OR matches opportunity geography.; Applicant type overlaps eligible sector: commercial.
  - unresolved: No explicit utility restriction was normalized.
- likely_eligible / 87: USDA - Biorefinery, Renewable Chemical, and Biobased Product Manufacturing Assistance Program (SOURCE_DSIRE:dsire_program_id:5313)
  - matched: Opportunity appears active.; Opportunity appears nationwide.; Applicant type overlaps eligible sector: commercial.
  - unresolved: No explicit utility restriction was normalized.; No specific eligible building type was normalized.
- likely_eligible / 87: Entergy Arkansas - Agricultural Energy Solutions Program Rebates (SOURCE_DSIRE:dsire_program_id:5532)
  - matched: Opportunity appears active.; Project site state OR matches opportunity geography.; Applicant type overlaps eligible sector: commercial.
  - unresolved: No explicit utility restriction was normalized.; No specific eligible building type was normalized.
- likely_eligible / 87: Shakopee Public Utilities - Commercial and Industrial Energy Efficiency Rebate Program (SOURCE_DSIRE:dsire_program_id:1948)
  - matched: Opportunity appears active.; Project site state OR matches opportunity geography.; Applicant type overlaps eligible sector: commercial.
  - unresolved: No explicit utility restriction was normalized.; No specific eligible building type was normalized.
- likely_eligible / 87: City of High Point Electric - Residential Energy Efficiency Rebate Program (SOURCE_DSIRE:dsire_program_id:3622)
  - matched: Opportunity appears active.; Project site state OR matches opportunity geography.; Applicant type overlaps eligible sector: commercial.
  - unresolved: No explicit utility restriction was normalized.; No specific eligible building type was normalized.
- likely_eligible / 87: City and County of Denver - Building Electrification Retrofit Pilot (SOURCE_DSIRE:dsire_program_id:22757)
  - matched: Opportunity appears active.; Project site state OR matches opportunity geography.; Applicant type overlaps eligible sector: commercial.
  - unresolved: No explicit utility restriction was normalized.; Opportunity building specificity (multifamily) does not directly match the user's site type.
- likely_eligible / 87: Business Energy Investment Tax Credit (ITC) (SOURCE_DSIRE:dsire_program_id:658)
  - matched: Opportunity appears active.; Opportunity appears nationwide.; Applicant type overlaps eligible sector: commercial.
  - unresolved: No explicit utility restriction was normalized.; No specific eligible building type was normalized.
- likely_eligible / 87: USDA - Rural Energy for America Program (REAP) Loan Guarantees (SOURCE_DSIRE:dsire_program_id:2511)
  - matched: Opportunity appears active.; Opportunity appears nationwide.; Applicant type overlaps eligible sector: commercial.
  - unresolved: No explicit utility restriction was normalized.; No specific eligible building type was normalized.
- likely_eligible / 87: Clark County REMC - Energy Efficiency Rebate Program (SOURCE_DSIRE:dsire_program_id:2665)
  - matched: Opportunity appears active.; Project site state OR matches opportunity geography.; Applicant type overlaps eligible sector: commercial.
  - unresolved: No explicit utility restriction was normalized.; No specific eligible building type was normalized.
- likely_eligible / 87: Avista Utilities (Electric) - Commercial Energy Efficiency Incentives Program (SOURCE_DSIRE:dsire_program_id:5946)
  - matched: Opportunity appears active.; Project site state OR matches opportunity geography.; Applicant type overlaps eligible sector: commercial.
  - unresolved: No explicit utility restriction was normalized.; No specific eligible building type was normalized.
- likely_eligible / 87: Sawnee EMC - Commercial Energy Efficiency Rebate Program (SOURCE_DSIRE:dsire_program_id:2279)
  - matched: Opportunity appears active.; Project site state OR matches opportunity geography.; Applicant type overlaps eligible sector: commercial.
  - unresolved: No explicit utility restriction was normalized.; No specific eligible building type was normalized.

Common next questions:
- site.utility.electric.distributionUtilityId: 89

Common unresolved requirements among promising matches:
- No explicit utility restriction was normalized.: 85
- No specific eligible building type was normalized.: 67
- Opportunity building specificity (multifamily) does not directly match the user's site type.: 6
- Opportunity building specificity (office) does not directly match the user's site type.: 6
- User electric distribution utility is unknown.: 4

Common blockers across rejected/unavailable opportunities:
- Opportunity appears residential-only and the user profile is nonresidential.: 451
- Opportunity appears unavailable or the application deadline has passed.: 209
- Project site state OR does not match opportunity geography CA.: 177
- Selected improvements do not match opportunity technologies (solar).: 162
- Selected improvements do not match opportunity technologies (ev_charging).: 153

## Immediate Iteration Targets

1. Improve utility resolution for `Other / Not sure` users by geocoding and service-territory lookup instead of relying on the current form option.
2. Split offer-level sectors/technologies more carefully for DSIRE parameter sets to reduce residential/commercial leakage.
3. Add source-specific availability handling for CEC awarded solicitations and utility pages with no explicit deadline.
4. Add a small hand-reviewed truth fixture for the top 20 matches per sample user; this is the realistic way to approach exhaustive validation without pretending all 20,960 pairings were manually adjudicated.
