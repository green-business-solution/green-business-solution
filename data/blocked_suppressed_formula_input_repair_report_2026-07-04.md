# Blocked/Suppressed Formula Input Repair Report

Generated: 2026-07-04T01:52:04.820Z

## Summary

- Target packages repaired: 12
- Runtime-included after repair: 10
- Intentionally gated after repair: 2
- Public index bad edges deleted: 6
- Sample fixture bad edges deleted: 6

## Repairs

| Program | Action | Included | Before | After | Reason |
| --- | --- | --- | --- | --- | --- |
| Georgia Power - Commercial Energy Efficiency Rebate Program (SOURCE_DSIRE:dsire_program_id:4656) | rate_table_from_payload | yes | calculable_with_missing_inputs/rate_table/included | calculable_with_missing_inputs/rate_table/included | Original GPT Pro repair included Georgia Power selected rates, but the imported measure catalog was empty. |
| Customer Directed Electrification Rebate (SOURCE_SILICON_VALLEY_POWER:svp_source_section:6849d4cc60567610:customer-directed-electrification-rebate) | per_kwh_rate | yes | calculable_with_missing_inputs/per_kwh/included | calculable_with_missing_inputs/per_kwh/included | SVP customer-directed electrification uses annual electric energy savings times $0.15/kWh, capped by measure cost. |
| Anaheim Public Utilities - EV Fleet Charger and Infrastructure Rebate (SOURCE_DSIRE:dsire_program_id:22277) | rate_table_from_payload | yes | estimate_from_range/rate_table/included | estimate_from_range/rate_table/included | Original GPT Pro repair included Anaheim fleet charging reimbursement rows, but the imported v2 package retained a zero placeholder. |
| Anaheim Public Utilities - Personal Use EV Charger Rebates (SOURCE_DSIRE:dsire_program_id:22275) | measure_catalog_from_payload | no | calculable_with_missing_inputs/measure_catalog/not-included | calculable_with_missing_inputs/measure_catalog/not-included | The private/personal EV charger formula is executable, but current test-case matching hits a business sample; keep it suppressed until customer-segment matching is corrected. |
| LADWP - Non-Residential Energy Efficiency Incentive Program (SOURCE_DSIRE:dsire_program_id:1866) | existing_rate_table | yes | calculable_with_missing_inputs/rate_table/included | calculable_with_missing_inputs/rate_table/included | The LADWP lighting kWh-saved rate table is already imported; mark the deterministic rebate effect as runtime-eligible. |
| Eagle County - Walking Mountains Science Center Solar PV Rebate (SOURCE_DSIRE:dsire_program_id:22786) | custom_quote_gate | no | custom_quote_estimate/custom_quote/not-included | custom_quote_estimate/custom_quote/not-included | Walking Mountains matches a separate Holy Cross Energy solar rebate and is locality-specific; keep quote/geography-gated instead of estimating from the $1,000 cap. |
| Solar Water Heater Rebate (SOURCE_DSIRE:dsire_program_id:506) | rate_table_from_payload | yes | calculable_with_missing_inputs/rate_table/included | calculable_with_missing_inputs/rate_table/included | Original GPT Pro repair included Hawaii Energy solar water-heater tier rows, but the imported v2 package retained a zero placeholder. |
| Rocky Mountain Power - wattsmart Business Program (SOURCE_DSIRE:dsire_program_id:2412) | rate_table_from_payload | yes | calculable_with_missing_inputs/rate_table/included | calculable_with_missing_inputs/rate_table/included | Original GPT Pro repair included Rocky Mountain Power wattsmart rows, but the imported v2 package retained a zero placeholder. |
| Alliant Energy Interstate Power and Light - Commercial and Industrial Energy Efficiency Rebate Program (SOURCE_DSIRE:dsire_program_id:4971) | rate_table_from_payload | yes | calculable_with_missing_inputs/rate_table/included | calculable_with_missing_inputs/rate_table/included | Original GPT Pro repair included a prescriptive Alliant Iowa instant-discount rate table, but the imported v2 package retained a zero placeholder. |
| Controls Program (SOURCE_SILICON_VALLEY_POWER:svp_source_section:6e6b359eb5fc98c0:controls-program) | per_kwh_rate | yes | calculable_with_missing_inputs/per_kwh/included | calculable_with_missing_inputs/per_kwh/included | SVP controls potential incentive is annual kWh savings times $0.02/kWh times six, capped by cost. |
| SD Energy Edge (SOURCE_SDGE_BUSINESS:program_url:sdenergyedge_com) | existing_rate_table | yes | estimate_from_range/rate_table/included | estimate_from_range/rate_table/included | The SD Energy Edge conservative range table is already imported; mark the deterministic range estimate as runtime-eligible. |
| Commercial Retro-Commissioning and New Construction Program (SOURCE_DSIRE:dsire_program_id:5218) | existing_rate_table | yes | calculable_with_missing_inputs/rate_table/included | calculable_with_missing_inputs/rate_table/included | The Focus on Energy retro-commissioning rate table is already imported; mark the deterministic rebate effect as runtime-eligible. |

## Notes

- Anaheim Personal EV Charger remains suppressed because the current matching path hits a business sample; this needs customer-segment/edge correction rather than a forced customer-facing estimate.
- Eagle County Walking Mountains solar remains custom/geography gated because the source-backed amount depends on the separate Holy Cross Energy rebate and local eligibility.
- Runtime support was added separately for conservative rate-table row shapes used by these repaired packages.
