# Low Source-Confidence Opportunity Queue

Generated: 2026-07-01T22:58:06.409Z

This queue uses GPT Pro repair `confidence` as `source_confidence`. It does not represent deterministic `match_confidence`.

## Summary

- Repair batches scanned: 58
- Latest unique repaired opportunities: 785
- Low source-confidence opportunities: 15
- Availability status counts: active 4, source_inaccessible 10, unknown 1
- Recommended next-step counts: deeper_gpt_pro_research_before_trusting_active_program 4, human_or_gpt_pro_availability_verification 1, human_or_gpt_pro_source_access_followup 10

## Queue

| Priority | Opportunity | State | Availability | Source confidence | Match confidence | Latest repair | Next step |
| --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | Emerald PUD - Commercial and Industrial Energy Efficiency Rebate Program / SOURCE_DSIRE:dsire_program_id:2138 | OR | active | low | 0.68 | opportunity_data_research_repairs_gpt_pro_2026-07-01_batch29 | deeper_gpt_pro_research_before_trusting_active_program |
| 2 | Lane Electric Cooperative - Commercial/Residential Weatherization & Energy Efficiency Program / SOURCE_DSIRE:dsire_program_id:2469 | OR | active | low | 0.68 | opportunity_data_research_repairs_gpt_pro_2026-07-01_batch34 | deeper_gpt_pro_research_before_trusting_active_program |
| 3 | Duke Energy - Commercial Energy Efficiency Rebate Program / SOURCE_DSIRE:dsire_program_id:2297 | IN | active | low | 0.68 | opportunity_data_research_repairs_gpt_pro_2026-07-01_batch39 | deeper_gpt_pro_research_before_trusting_active_program |
| 4 | Dixie Electric Cooperative - Residential Energy Efficiency Loan Program / SOURCE_DSIRE:dsire_program_id:1968 | AL | active | low | 0.68 | opportunity_data_research_repairs_gpt_pro_2026-07-01_batch51 | deeper_gpt_pro_research_before_trusting_active_program |
| 5 | Modesto Irrigation District - Commercial Energy Efficiency Rebate Program / SOURCE_DSIRE:dsire_program_id:1885 | CA | unknown | low | 0.68 | opportunity_data_research_repairs_gpt_pro_2026-06-29_batch1 | human_or_gpt_pro_availability_verification |
| 6 | Gunnison County Electric - Residential Energy Efficiency Rebate Program / SOURCE_DSIRE:dsire_program_id:3372 | CO | source_inaccessible | low | 0.68 | opportunity_data_research_repairs_gpt_pro_2026-06-30_batch4 | human_or_gpt_pro_source_access_followup |
| 7 | Tillamook County PUD - Residential Energy Efficiency Rebate Program / SOURCE_DSIRE:dsire_program_id:2185 | OR | source_inaccessible | low | 0.68 | opportunity_data_research_repairs_gpt_pro_2026-07-01_batch14 | human_or_gpt_pro_source_access_followup |
| 8 | Emerald PUD - Residential Energy Efficiency Rebate Program / SOURCE_DSIRE:dsire_program_id:2132 | OR | source_inaccessible | low | 0.68 | opportunity_data_research_repairs_gpt_pro_2026-07-01_batch22 | human_or_gpt_pro_source_access_followup |
| 9 | Mason County PUD 3 - Commercial and Industrial Energy Rebates / SOURCE_DSIRE:dsire_program_id:2199 | WA | source_inaccessible | low | 0.68 | opportunity_data_research_repairs_gpt_pro_2026-07-01_batch30 | human_or_gpt_pro_source_access_followup |
| 10 | Northern Lights Inc. - Energy Conservation Rebate Program / SOURCE_DSIRE:dsire_program_id:4198 | ID | source_inaccessible | low | 0.68 | opportunity_data_research_repairs_gpt_pro_2026-06-30_batch9 | human_or_gpt_pro_source_access_followup |
| 11 | Duke Energy - Non-Residential Energy Efficiency Rebate Program / SOURCE_DSIRE:dsire_program_id:1553 | KY | source_inaccessible | low | 0.68 | opportunity_data_research_repairs_gpt_pro_2026-06-30_batch8 | human_or_gpt_pro_source_access_followup |
| 12 | Farmers Electric Cooperative (Kalona) - Residential Energy Efficiency Grant Program / SOURCE_DSIRE:dsire_program_id:4535 | IA | source_inaccessible | low | 0.68 | opportunity_data_research_repairs_gpt_pro_2026-07-01_batch45 | human_or_gpt_pro_source_access_followup |
| 13 | Xcel Energy - Residential Energy Efficiency Rebate Programs / SOURCE_DSIRE:dsire_program_id:4816 | ND | source_inaccessible | low | 0.68 | opportunity_data_research_repairs_gpt_pro_2026-07-01_batch49 | human_or_gpt_pro_source_access_followup |
| 14 | Duke Energy Indiana Off-Peak Charging Credit / SOURCE_DSIRE:dsire_program_id:22551 | IN | source_inaccessible | low | 0.68 | opportunity_data_research_repairs_gpt_pro_2026-07-01_batch51 | human_or_gpt_pro_source_access_followup |
| 15 | Flathead Electric Cooperative - Commercial Incentive Programs / SOURCE_DSIRE:dsire_program_id:2180 | MT | source_inaccessible | low | 0.68 | opportunity_data_research_repairs_gpt_pro_2026-07-01_batch51 | human_or_gpt_pro_source_access_followup |

## Verification Notes

### Emerald PUD - Commercial and Industrial Energy Efficiency Rebate Program

- Opportunity ID: `SOURCE_DSIRE:dsire_program_id:2138`
- Latest repair: `opportunity_data_research_repairs_gpt_pro_2026-07-01_batch29` from `data/opportunity_data_research_repairs_gpt_pro_2026-07-01_batch29.json`
- Recommended next step: `deeper_gpt_pro_research_before_trusting_active_program`
- Evidence: EPUD's]( current energy incentive pages identify commercial and industrial incentive programs; official snippets support commercial shell measures and BPA-based industrial lighting incentives, but detailed pages were access-restricted.
- Reasoning: Because current official details were not fully readable, this repair keeps only conservative EPUD-supported commercial shell, lighting and custom categories. Legacy DSIRE matches for heat pumps, refrigeration and air compressors should be blocked until current measure sheets are verified.
- Sources checked: https://www.epud.org/energy-efficiency/energy-incentive-programs/, https://www.epud.org/energy-efficiency/energy-incentive-programs/commercial-incentive-programs/, https://www.epud.org/energy-efficiency/energy-incentive-programs/industrial-incentive-programs/

### Lane Electric Cooperative - Commercial/Residential Weatherization & Energy Efficiency Program

- Opportunity ID: `SOURCE_DSIRE:dsire_program_id:2469`
- Latest repair: `opportunity_data_research_repairs_gpt_pro_2026-07-01_batch34` from `data/opportunity_data_research_repairs_gpt_pro_2026-07-01_batch34.json`
- Recommended next step: `deeper_gpt_pro_research_before_trusting_active_program`
- Evidence: Official Lane Electric result text identifies current energy-saving, weatherization, heat pump, and heat pump water heater programs for members. The renewable-energy page states member renewable incentives ended in 2023.
- Reasoning: Use low confidence because current official pages were not fully readable. Keep only categories repeatedly verified by official Lane Electric page snippets and do not preserve solar.
- Sources checked: https://www.laneelectric.com/energy-efficiency/energy-saving-programs/, https://www.laneelectric.com/energy-efficiency/weatherization-programs/, https://www.laneelectric.com/energy-efficiency/heat-pump-program/, https://www.laneelectric.com/energy-efficiency/heat-pump-water-heaters/, https://www.laneelectric.com/energy-efficiency/renewable-energy/member-renewable-programs/

### Duke Energy - Commercial Energy Efficiency Rebate Program

- Opportunity ID: `SOURCE_DSIRE:dsire_program_id:2297`
- Latest repair: `opportunity_data_research_repairs_gpt_pro_2026-07-01_batch39` from `data/opportunity_data_research_repairs_gpt_pro_2026-07-01_batch39.json`
- Recommended next step: `deeper_gpt_pro_research_before_trusting_active_program`
- Evidence: Duke’s]( official business Smart $aver pages are current but blocked to the browser; readable Duke material identifies Indiana business rebates for lighting, HVAC, agriculture and custom measures.
- Reasoning: Because current Duke detail pages were inaccessible, this repair is conservative: unsupported refrigeration and insulation matches were removed rather than inferred from DSIRE.
- Sources checked: https://www.duke-energy.com/business/products/smartsaver, https://www.duke-energy.com/business/products/smartsaver/hvac-incentives, https://www.duke-energy.com/business/products/smartsaver/chiller, https://www.duke-energy.com/business/products/smartsaver/all-smartsaver-rebates?jur=IN01, https://illumination.duke-energy.com/articles/with-lower-energy-bills-this-clinic-can-help-more-people

### Dixie Electric Cooperative - Residential Energy Efficiency Loan Program

- Opportunity ID: `SOURCE_DSIRE:dsire_program_id:1968`
- Latest repair: `opportunity_data_research_repairs_gpt_pro_2026-07-01_batch51` from `data/opportunity_data_research_repairs_gpt_pro_2026-07-01_batch51.json`
- Recommended next step: `deeper_gpt_pro_research_before_trusting_active_program`
- Evidence: Official]( search snippets identify an active Co-op Energy Efficiency Loan Program and low-interest financing related to heat-pump upgrades, but the detail page returned access errors.
- Reasoning: Retain heat-pump and high-efficiency HVAC only as financing categories. Confidence is low because official current terms were not readable beyond official snippets.
- Sources checked: https://www.dixie.coop/energy-efficiency-program, https://www.dixie.coop/manufacturedhomeprogram, http://www.dixie.coop/content.cfm?id=2049&download_id=59#attached_content

### Modesto Irrigation District - Commercial Energy Efficiency Rebate Program

- Opportunity ID: `SOURCE_DSIRE:dsire_program_id:1885`
- Latest repair: `opportunity_data_research_repairs_gpt_pro_2026-06-29_batch1` from `data/opportunity_data_research_repairs_gpt_pro_2026-06-29_batch1.json`
- Recommended next step: `human_or_gpt_pro_availability_verification`
- Evidence: Official MID business rebate page was indexed as offering incentives for commercial, industrial, and agricultural customers, but the live page returned HTTP 403 during review.
- Reasoning: Manual review required before repairing retrofit category matches; current official source could not be fully accessed.
- Sources checked: https://www.mid.org/saving-energy-money/rebates/business-rebates/

### Gunnison County Electric - Residential Energy Efficiency Rebate Program

- Opportunity ID: `SOURCE_DSIRE:dsire_program_id:3372`
- Latest repair: `opportunity_data_research_repairs_gpt_pro_2026-06-30_batch4` from `data/opportunity_data_research_repairs_gpt_pro_2026-06-30_batch4.json`
- Recommended next step: `human_or_gpt_pro_source_access_followup`
- Evidence: The current GCEA rebates page could not be fetched because the site returned 403 Forbidden. Search snippets suggested a 2026 rebate form exists, but no official readable measure schedule was available from the checked URLs.
- Reasoning: Because the primary source is inaccessible, the safe repair is to mark the record source_inaccessible and remove all category matches rather than carrying forward DSIRE or snippet-derived measure mappings.
- Sources checked: https://www.gcea.coop/energy-efficiency/rebates/, http://www.gcea.coop/content/rebates, https://programs.dsireusa.org/system/program/detail/3372/gunnison-county-electric-residential-energy-efficiency-rebate-program

### Tillamook County PUD - Residential Energy Efficiency Rebate Program

- Opportunity ID: `SOURCE_DSIRE:dsire_program_id:2185`
- Latest repair: `opportunity_data_research_repairs_gpt_pro_2026-07-01_batch14` from `data/opportunity_data_research_repairs_gpt_pro_2026-07-01_batch14.json`
- Recommended next step: `human_or_gpt_pro_source_access_followup`
- Evidence: TPUD appliance, weatherization and residential heat-pump pages appear in search results, but official pages returned 403 Forbidden when opened, preventing current verification.
- Reasoning: Because current official sources were inaccessible, unsupported categories were cleared instead of relying on older DSIRE text or snippets.
- Sources checked: https://www.tpud.org/ways-to-save/appliance-water-heater-rebates/, https://www.tpud.org/ways-to-save/residential-weatherization-program/, https://www.tpud.org/ways-to-save/heat-pump-programs/residential-heat-pump-program/, https://www.tpud.org/ways-to-save/green-programs/electric-vehicle/

### Emerald PUD - Residential Energy Efficiency Rebate Program

- Opportunity ID: `SOURCE_DSIRE:dsire_program_id:2132`
- Latest repair: `opportunity_data_research_repairs_gpt_pro_2026-07-01_batch22` from `data/opportunity_data_research_repairs_gpt_pro_2026-07-01_batch22.json`
- Recommended next step: `human_or_gpt_pro_source_access_followup`
- Evidence: Official]( EPUD pages returned access errors; official snippets only verified current heat-pump water-heater rebate or loan content, not the wider residential measure list.
- Reasoning: Marked source_inaccessible because current official sources could not be read well enough to verify the full DSIRE-derived residential program. Unsupported categories were cleared except the specifically observed HPWH measure.
- Sources checked: https://www.epud.org/conservation-energy-savings/residential-programs/, https://www.epud.org/energy-efficiency/energy-incentive-programs/residential-incentive-programs/, https://www.epud.org/res-hpwh-inc/, https://www.epud.org/news-releases/get-a-heat-pump-water-heater-for-144/

### Mason County PUD 3 - Commercial and Industrial Energy Rebates

- Opportunity ID: `SOURCE_DSIRE:dsire_program_id:2199`
- Latest repair: `opportunity_data_research_repairs_gpt_pro_2026-07-01_batch30` from `data/opportunity_data_research_repairs_gpt_pro_2026-07-01_batch30.json`
- Recommended next step: `human_or_gpt_pro_source_access_followup`
- Evidence: PUD 3 official rebate and FAQ pages returned 403 access errors. Search snippets mention commercial heat-pump inquiries but do not expose current C&I eligibility or requirements.
- Reasoning: Because official sources were inaccessible, unsupported categories were cleared rather than inferred from snippets or DSIRE.
- Sources checked: https://www.pud3.org/ways-to-save/rebates-incentives/, https://www.pud3.org/faqs/heat-pump-incentives/, https://www.pud3.org/faqs/ductless-heat-pump-incentives/, https://www.pud3.org/faqs/appliance-incentives/, https://www.pud3.org/faqs/insulation-incentives/, https://programs.dsireusa.org/system/program/detail/2199/mason-county-pud-3-commercial-and-industrial-energy-rebates

### Northern Lights Inc. - Energy Conservation Rebate Program

- Opportunity ID: `SOURCE_DSIRE:dsire_program_id:4198`
- Latest repair: `opportunity_data_research_repairs_gpt_pro_2026-06-30_batch9` from `data/opportunity_data_research_repairs_gpt_pro_2026-06-30_batch9.json`
- Recommended next step: `human_or_gpt_pro_source_access_followup`
- Evidence: The official Northern Lights Inc. rebate URLs checked were inaccessible with 403 Forbidden responses, so no current official measure table, application form or eligibility language could be verified.
- Reasoning: Marked source_inaccessible and cleared categories to avoid carrying forward DSIRE-only or search-snippet-derived matches.
- Sources checked: https://www.nli.coop/save/rebates/, https://www.nli.coop/rebate-clothes-washer/, https://www.nli.coop/smart-thermostat-rebate/, https://programs.dsireusa.org/system/program/detail/4198/northern-lights-inc-energy-conservation-rebate-program

### Duke Energy - Non-Residential Energy Efficiency Rebate Program

- Opportunity ID: `SOURCE_DSIRE:dsire_program_id:1553`
- Latest repair: `opportunity_data_research_repairs_gpt_pro_2026-06-30_batch8` from `data/opportunity_data_research_repairs_gpt_pro_2026-06-30_batch8.json`
- Recommended next step: `human_or_gpt_pro_source_access_followup`
- Evidence: Duke Energy search snippets indicate Smart $aver business rebates for qualifying high-efficiency equipment, but the official Duke pages checked were blocked, errored, or required JavaScript/dynamic rendering and did not expose current measure tables for refrigeration or compressed air.
- Reasoning: The safe repair is source_inaccessible with no eligible retrofit categories. This avoids preserving stale or DSIRE-only category matches for a current non-residential program whose official measure details could not be read.
- Sources checked: https://www.duke-energy.com/business/products/smartsaver, https://www.duke-energy.com/business/products/smartsaver/all-smartsaver-rebates, https://www.duke-energy.com/business/products/smartsaver/industrial-equipment, https://programs.dsireusa.org/system/program/detail/1553/duke-energy-non-residential-energy-efficiency-rebate-program

### Farmers Electric Cooperative (Kalona) - Residential Energy Efficiency Grant Program

- Opportunity ID: `SOURCE_DSIRE:dsire_program_id:4535`
- Latest repair: `opportunity_data_research_repairs_gpt_pro_2026-07-01_batch45` from `data/opportunity_data_research_repairs_gpt_pro_2026-07-01_batch45.json`
- Recommended next step: `human_or_gpt_pro_source_access_followup`
- Evidence: The current Farmers Electric Cooperative conservation-grants, rebates, and ways-to-save pages returned 502 Bad Gateway. Search snippets showed only page titles and a partial insulation reference, insufficient to verify current eligible measures.
- Reasoning: Source inaccessible; cleared retrofit categories until official terms can be read. Retained only minimal geography and applicant context from the program name and official URL.
- Sources checked: https://www.feckalona.net/energy-conservation-grants.html, http://www.feckalona.net/energy-conservation-grants.html, https://www.feckalona.net/energy-efficiency-rebates.html, https://www.feckalona.net/ways-to-save.html

### Xcel Energy - Residential Energy Efficiency Rebate Programs

- Opportunity ID: `SOURCE_DSIRE:dsire_program_id:4816`
- Latest repair: `opportunity_data_research_repairs_gpt_pro_2026-07-01_batch49` from `data/opportunity_data_research_repairs_gpt_pro_2026-07-01_batch49.json`
- Recommended next step: `human_or_gpt_pro_source_access_followup`
- Evidence: The current Xcel North Dakota rebate page could not be read beyond dynamic loading; the digital application is active but does not show measure-level eligibility.
- Reasoning: Marked source_inaccessible to prevent matching on outdated furnace/boiler assumptions. Current official details must be verified before restoring categories.
- Sources checked: https://nd.my.xcelenergy.com/s/residential/heating-cooling/heating-upgrade-rebates, https://www.xcelenergy.com/digital_application, https://xcelenergy.com/staticfiles/xe/Marketing/Files/MN-Res-Heating-Rebate-Application.pdf

### Duke Energy Indiana Off-Peak Charging Credit

- Opportunity ID: `SOURCE_DSIRE:dsire_program_id:22551`
- Latest repair: `opportunity_data_research_repairs_gpt_pro_2026-07-01_batch51` from `data/opportunity_data_research_repairs_gpt_pro_2026-07-01_batch51.json`
- Recommended next step: `human_or_gpt_pro_source_access_followup`
- Evidence: Accessible]( Duke release describes a two-year Indiana pilot launched October 1, 2022, capped at 500 residential Level 2 participants; current continuation was not readable.
- Reasoning: Cleared retrofit categories because current official sources were not readable enough to verify ongoing availability after the original pilot period.
- Sources checked: https://news.duke-energy.com/releases/duke-energy-indiana-plans-two-year-electric-transportation-pilot-programs, https://www.duke-energy.com/home/products/ev-complete/off-peak-credit

### Flathead Electric Cooperative - Commercial Incentive Programs

- Opportunity ID: `SOURCE_DSIRE:dsire_program_id:2180`
- Latest repair: `opportunity_data_research_repairs_gpt_pro_2026-07-01_batch51` from `data/opportunity_data_research_repairs_gpt_pro_2026-07-01_batch51.json`
- Recommended next step: `human_or_gpt_pro_source_access_followup`
- Evidence: Current]( official commercial rebate page could not be fetched; snippets identify commercial and industrial lighting, while older official snippets mention broader measures.
- Reasoning: Cleared categories under source_inaccessible because current official program materials were not readable enough to verify measure eligibility.
- Sources checked: https://www.flatheadelectric.com/commercial/business-energy-savings/, https://www.flatheadelectric.com/energy-solutions/energy-efficiency-rebate-programs/commercial-rebate-programs/, https://www.flatheadelectric.com/energy-solutions/energy-efficiency-rebate-programs/, https://www.flatheadelectric.com/co-op-announces-2022-energy-efficiency-savings-862574-paid-out-to-members-and-partners/

