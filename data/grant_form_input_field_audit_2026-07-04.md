# Grant Form Input Field Audit

Generated: 2026-07-04T10:04:18.832Z

## Summary

| Metric | Value |
| --- | --- |
| Form-input evaluations | 65 |
| Unique opportunities | 16 |
| Rows without mapped fields | 0 |

## Collection Surfaces

| Value | Count |
| --- | --- |
| Business/site intake form | 684 |
| Program application or award status | 335 |
| Project quote or invoice upload | 238 |
| Utility bill upload | 18 |
| Tax/accounting document upload | 10 |

## Implementation Status

| Value | Count |
| --- | --- |
| implemented | 702 |
| planned | 583 |

## Planned Surfaces

| Value | Count |
| --- | --- |
| Program application or award status | 335 |
| Project quote or invoice upload | 238 |
| Tax/accounting document upload | 10 |

## Unique Opportunity Mapping

| Opportunity | Program | Evaluations | Mapped surfaces | Planned surfaces |
| --- | --- | --- | --- | --- |
| SOURCE_CA_ENERGY_COMMISSION:cec_solicitation_number:GFO-25-605 | GFO-25-605 - Reliable Electric Charging for Eligible School-bus Sites (RECESS) | 7 | Business/site intake form, Program application or award status, Project quote or invoice upload | Program application or award status, Project quote or invoice upload |
| SOURCE_CA_ENERGY_COMMISSION:cec_solicitation_number:GFO-25-902 | GFO-25-902 - Cost-Share for Federal Geothermal Energy Funding Opportunities | 7 | Business/site intake form, Program application or award status, Project quote or invoice upload | Program application or award status, Project quote or invoice upload |
| SOURCE_CA_ENERGY_COMMISSION:cec_solicitation_number:GFO-25-308 | GFO-25-308 - Distributed Clean Hydrogen Production with Onsite End Use (H2ONSITE) | 10 | Business/site intake form, Program application or award status, Project quote or invoice upload | Program application or award status, Project quote or invoice upload |
| SOURCE_SDGE_BUSINESS:program_url:comfortablyca_com | Comfortably CA | 1 | Business/site intake form | None |
| SOURCE_SDGE_BUSINESS:program_url:aesc_inc_com_groceries_restaurants_and_food_storage_program | Groceries, Restaurants and Food Storage Program | 3 | Business/site intake form | None |
| SOURCE_CA_ENERGY_COMMISSION:cec_solicitation_number:GFO-25-608 | GFO-25-608 - Electric Vehicle Hub, Outreach, Messaging, and Equipment (EV HOME) | 1 | Business/site intake form, Program application or award status, Project quote or invoice upload | Program application or award status, Project quote or invoice upload |
| SOURCE_DSIRE:dsire_program_id:22786 | Eagle County - Walking Mountains Science Center Solar PV Rebate | 2 | Business/site intake form | None |
| SOURCE_DSIRE:dsire_program_id:4630 | Boulder County - EnergySmart Residential Energy Efficiency Rebate Program | 10 | Business/site intake form, Program application or award status, Project quote or invoice upload, Tax/accounting document upload, Utility bill upload | Program application or award status, Project quote or invoice upload, Tax/accounting document upload |
| SOURCE_DSIRE:dsire_program_id:5558 | City of Aspen and Pitkin County - Renewable Energy Mitigation Program Grants | 1 | Business/site intake form, Program application or award status, Project quote or invoice upload | Program application or award status, Project quote or invoice upload |
| SOURCE_DSIRE:dsire_program_id:3639 | OG&E - Commercial Energy Efficiency Rebate Programs | 8 | Business/site intake form, Project quote or invoice upload | Project quote or invoice upload |
| SOURCE_DSIRE:dsire_program_id:22186 | MassEVIP Workplace and Fleet Charging Program | 3 | Business/site intake form, Program application or award status, Project quote or invoice upload | Program application or award status, Project quote or invoice upload |
| SOURCE_DSIRE:dsire_program_id:22187 | MassEVIP Public Access Charging (PAC) Program | 2 | Business/site intake form, Program application or award status, Project quote or invoice upload, Utility bill upload | Program application or award status, Project quote or invoice upload |
| SOURCE_DSIRE:dsire_program_id:22185 | MassEVIP Fleets Charging Program | 1 | Business/site intake form, Program application or award status, Project quote or invoice upload | Program application or award status, Project quote or invoice upload |
| SOURCE_DSIRE:dsire_program_id:22630 | Hawaii - National Electric Vehicle Infrastructure (NEVI) Formula Grant Program | 1 | Business/site intake form, Program application or award status | Program application or award status |
| SOURCE_DSIRE:dsire_program_id:5756 | Rhode Island Energy (Electric) Commercial and Industrial Rebate Program | 5 | Business/site intake form, Project quote or invoice upload | Project quote or invoice upload |
| SOURCE_DSIRE:dsire_program_id:5361 | Small Scale Solar Grants (Commerce RI) | 3 | Business/site intake form, Program application or award status, Project quote or invoice upload, Utility bill upload | Program application or award status, Project quote or invoice upload |

## Interpretation

- Every form-input-required grant/rebate evaluation maps to at least one collection field.
- `implemented` means the collection surface already exists in the app/runtime, such as intake/profile fields, retrofit scope fields, or utility bill upload.
- `planned` means the estimate can be gated correctly now, but the dedicated upload/form surface still needs product UI work, usually quote/invoice upload, tax document upload, or program application/award status.