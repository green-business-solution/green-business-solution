# Tax Research Codex Sweep

Date: 2026-07-03

Scope followed: research artifacts only. No runtime app code, AWS configuration, production data, or deployed behavior was changed.

## Repo Surface Reviewed

- `data/opportunity_incentive_calculation_packages_v2.json`
- `data/tax_geography_rules.json`
- `data/tax_credit_package_research_repairs_gpt_pro_2026-07-02.json`
- `data/tax_official_dataset_rule_research_gpt_pro_2026-07-03.json`
- `data/test_case_profile_defaults_gpt_pro_2026-07-02.json`
- `data/test_case_tax_document_updates_gpt_pro_2026-07-03.json`
- `docs/tax-geography-model.md`
- `docs/incentive-calculation-model-v2.md`

## Current Tax Packages

The live v2 calculation package file has 984 packages. Three current packages have explicit tax effects and matching tax geography rules:

| Opportunity | Program | Tax type | Runtime posture |
| --- | --- | --- | --- |
| `SOURCE_DSIRE:dsire_program_id:381` | Washington Tax Abatement for Solar Manufacturers | Gross receipts/B&O | Formula resolved; needs taxpayer/accountant inputs. |
| `SOURCE_DSIRE:dsire_program_id:22798` | Rhode Island Renewable Energy Tax Valuation | Property tax | State formula resolved for statutory amount; needs assessor/local facts for savings. |
| `SOURCE_DSIRE:dsire_program_id:3216` | Michigan Renewable Energy Renaissance Zones | Property tax and local income tax | Formula pattern resolved; needs approved zone docs and tax-line facts. |

The public opportunity index contains many tax-labeled opportunity records, but the current v2 tax calculation surface in `data/opportunity_incentive_calculation_packages_v2.json` is the three-package set above.

## Resolution Counts

- Fully research-resolved current tax packages: 1 of 3.
- Need GPT Pro follow-up: 2 of 3.
- Need user/accountant inputs: 3 of 3.
- Need locality datasets or local/program documents: 2 of 3.
- Current synthetic test values are enough to implement production-style test-case calculations now: no.

## Main Findings

Washington is the cleanest implementation target. Official law sets a 0.275% preferential B&O rate for qualifying solar manufacturing, processing for hire, and manufacturer wholesale sales, expiring July 1, 2032. The calculation is deterministic once the qualifying B&O base, comparison rate, dates, classification, deductions/MATC, and annual report status are supplied.

Rhode Island can calculate a statutory property/tangible tax amount from AC kW capacity, but not a savings benefit without a counterfactual ordinary assessment and local assessor/ordinance status. It should not be included in user-facing savings totals by default.

Michigan RERZ is a special economic-development workflow, not a general retrofit tax credit. Address-derived geography is insufficient. The resolver must require approved zone/company documents, parcel-in-boundary confirmation, local abatement resolution, phaseout schedule, compliance status, and actual eligible tax lines.

## Official Evidence Highlights

- Washington RCW 82.04.294 sets the preferential solar manufacturing/wholesaling B&O rate at 0.275% and expires July 1, 2032: https://apps.leg.wa.gov/rcw/default.aspx?cite=82.04.294
- Washington DOR requires Annual Tax Performance Report filing by May 31 after a claim year: https://dor.wa.gov/education/industry-guides/manufacturing-guide/manufacturing-solar-energy-systems-and-components-solar-energy-systems
- Rhode Island OER rule sets $5.00/kW AC tangible tax treatment for commercial renewable energy systems: https://rules.sos.ri.gov/regulations/part/300-00-00-2
- Rhode Island 2025 public law adds real-property treatment at $3.50/kW AC where applicable: https://webserver.rilegislature.gov/PublicLaws/law25/law25398.htm
- Michigan MEDC says RERZ benefits apply only to designated company operations within approved zone boundaries and can abate specified state/local taxes up to 15 years with final-three-year phaseout: https://www.michiganbusiness.org/globalassets/documents/reports/fact-sheets/renewableenergyrenzones.pdf
- Michigan Treasury explains ESA Renaissance Zone phaseout multipliers and warns the reduction changes during the three-year phaseout: https://www.michigan.gov/taxes/property/ppt/esa/topics/esa-topic-special-millages-and-renaissance-zones

## Conservative Runtime Defaults

- Never infer tax eligibility from postal city, ZIP, NAICS, or broad state match alone.
- Route address-derived state/local facts to the resolver, but block dollar estimates until all material taxpayer/project facts are present.
- Keep tax effects out of ordinary cash incentive totals unless a package explicitly supports monetization and all tax facts are confirmed.
- Treat synthetic defaults as test fixtures only. They can exercise code paths but must not support confirmed estimates.
