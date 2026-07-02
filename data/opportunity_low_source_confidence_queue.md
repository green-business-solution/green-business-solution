# Low Source-Confidence Opportunity Queue

Generated: 2026-07-02T01:01:09.750Z

This queue uses GPT Pro repair `confidence` as `source_confidence`. It does not represent deterministic `match_confidence`.

## Summary

- Repair batches scanned: 96
- Latest unique repaired opportunities: 1519
- Low source-confidence opportunities: 5
- Availability status counts: active 1, source_inaccessible 4
- Recommended next-step counts: deeper_gpt_pro_research_before_trusting_active_program 1, human_or_gpt_pro_source_access_followup 4

## Queue

| Priority | Opportunity | State | Availability | Source confidence | Match confidence | Latest repair | Next step |
| --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | Dixie Electric Cooperative - Residential Energy Efficiency Loan Program / SOURCE_DSIRE:dsire_program_id:1968 | AL | active | low | 0.68 | opportunity_data_research_repairs_gpt_pro_2026-07-02_batch95 | deeper_gpt_pro_research_before_trusting_active_program |
| 2 | Modesto Irrigation District - Commercial Energy Efficiency Rebate Program / SOURCE_DSIRE:dsire_program_id:1885 | CA | source_inaccessible | low | 0.68 | opportunity_data_research_repairs_gpt_pro_2026-07-02_batch96 | human_or_gpt_pro_source_access_followup |
| 3 | City of Chicago - Green Building Permit Programs / SOURCE_DSIRE:dsire_program_id:2466 | IL | source_inaccessible | low | 0.86 | opportunity_data_research_repairs_gpt_pro_2026-07-02_batch96 | human_or_gpt_pro_source_access_followup |
| 4 | Farmers Electric Cooperative (Kalona) - Residential Energy Efficiency Grant Program / SOURCE_DSIRE:dsire_program_id:4535 | IA | source_inaccessible | low | 0.68 | opportunity_data_research_repairs_gpt_pro_2026-07-02_batch96 | human_or_gpt_pro_source_access_followup |
| 5 | Custom Renewable Energy Projects / SOURCE_DSIRE:dsire_program_id:709 | OR | source_inaccessible | low | 0.86 | opportunity_data_research_repairs_gpt_pro_2026-07-02_batch87 | human_or_gpt_pro_source_access_followup |

## Verification Notes

### Dixie Electric Cooperative - Residential Energy Efficiency Loan Program

- Opportunity ID: `SOURCE_DSIRE:dsire_program_id:1968`
- Latest repair: `opportunity_data_research_repairs_gpt_pro_2026-07-02_batch95` from `data/opportunity_data_research_repairs_gpt_pro_2026-07-02_batch95.json`
- Recommended next step: `deeper_gpt_pro_research_before_trusting_active_program`
- Evidence: Official Dixie Electric result text identifies a Co-op Energy Efficiency Loan Program and heat-pump-related financing, but detailed current terms were access-restricted.
- Reasoning: Keep confidence low because official current program details could not be fully read. Retain only financing categories tied to residential heat-pump or HVAC efficiency.
- Sources checked: https://www.dixie.coop/energy-efficiency-program, https://www.dixie.coop/manufacturedhomeprogram

### Modesto Irrigation District - Commercial Energy Efficiency Rebate Program

- Opportunity ID: `SOURCE_DSIRE:dsire_program_id:1885`
- Latest repair: `opportunity_data_research_repairs_gpt_pro_2026-07-02_batch96` from `data/opportunity_data_research_repairs_gpt_pro_2026-07-02_batch96.json`
- Recommended next step: `human_or_gpt_pro_source_access_followup`
- Evidence: Official]( MID snippets verify business rebate programs for commercial, industrial and agricultural customers and terms requiring installation at a MID-served business in good standing; live pages returned 403, so measure-level eligibility was not readable.
- Reasoning: The official source supports a business rebate framework but not any specific retrofit category. Categories were cleared to avoid DSIRE-only false positives.
- Sources checked: https://www.mid.org/saving-energy-money/rebates/business-rebates/, https://www.mid.org/saving-energy-money/rebates/rebate-terms-conditions/, https://www.mid.org/saving-energy-money/rebates/

### City of Chicago - Green Building Permit Programs

- Opportunity ID: `SOURCE_DSIRE:dsire_program_id:2466`
- Latest repair: `opportunity_data_research_repairs_gpt_pro_2026-07-02_batch96` from `data/opportunity_data_research_repairs_gpt_pro_2026-07-02_batch96.json`
- Recommended next step: `human_or_gpt_pro_source_access_followup`
- Evidence: Official]( Chicago snippets identify LEED submittal requirements and older green-permit review benefits, but the current green-permit page and guidance were not readable enough to verify active eligibility.
- Reasoning: Because current official eligibility was inaccessible, all physical retrofit matches were cleared. The opportunity should be handled as a permit-processing incentive, not an equipment incentive.
- Sources checked: https://www.chicago.gov/city/en/depts/bldgs/provdrs/permits/svcs/green-permits.html, https://311.chicago.gov/s/article/Green-permit-program-LEED-submittal-requirements?language=en_US, https://www.chicago.gov/dam/city/depts/bldgs/general/DelService/ChecklistForPermit101_29_08.pdf, https://www.chicago.gov/city/en/depts/bldgs/provdrs/e_plan.html

### Farmers Electric Cooperative (Kalona) - Residential Energy Efficiency Grant Program

- Opportunity ID: `SOURCE_DSIRE:dsire_program_id:4535`
- Latest repair: `opportunity_data_research_repairs_gpt_pro_2026-07-02_batch96` from `data/opportunity_data_research_repairs_gpt_pro_2026-07-02_batch96.json`
- Recommended next step: `human_or_gpt_pro_source_access_followup`
- Evidence: Official]( Farmers Electric pages identify conservation grants and efficiency rebates, but the pages returned server errors and did not expose current measure lists or application terms.
- Reasoning: Because current official source access failed, all retrofit categories were cleared while preserving only minimal residential member context from the program title and official pages.
- Sources checked: https://www.feckalona.net/energy-conservation-grants.html, https://www.feckalona.net/energy-efficiency-rebates.html, https://www.feckalona.net/ways-to-save.html, https://www.feckalona.net/

### Custom Renewable Energy Projects

- Opportunity ID: `SOURCE_DSIRE:dsire_program_id:709`
- Latest repair: `opportunity_data_research_repairs_gpt_pro_2026-07-02_batch87` from `data/opportunity_data_research_repairs_gpt_pro_2026-07-02_batch87.json`
- Recommended next step: `human_or_gpt_pro_source_access_followup`
- Evidence: Accessible sources did not verify a current official custom renewable eligibility list; available descriptions point to renewable generation rather than geothermal heat pumps.
- Reasoning: Because the current official Energy Trust page was inaccessible and the matched retrofit is unsupported, clear categories until an accessible current program manual or application confirms eligibility.
- Sources checked: https://www.energytrust.org/renewable-energy/, https://programs.dsireusa.org/system/program/detail/709/custom-renewable-energy-projects, https://blog.energytrust.org/oregon-tech-first-in-the-nation-to-power-campus-with-onsite-renewable-energy/, https://oregoncounties.org/energy-trust-helps-counties-thrive-with-energy-efficiency-renewable-energy-projects/

