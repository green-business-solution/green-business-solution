# ITC-24 - Solar-plus-storage interval dispatch

This report evaluates automation coverage without changing the approved Information Card.
The category contains 3 category-local process instances and references 3 canonical Standards.
Its current formula, tree, bindings, ownership decisions, and status remain unchanged.

## Process coverage

### Canonical process contract

| Process key | Process name | Canonical Standard | Required inputs | Exact output and formula term |
| --- | --- | --- | --- | --- |
| pvwatts_v8 | PVWatts Solar Production Calculation | STD-PVWATTS-V8 | DC capacity [Linked Opportunity]; Module Type [Linked Opportunity]; Array type [Linked Opportunity]; System losses [Linked Opportunity]; Tilt [Linked Opportunity]; Azimuth [Linked Opportunity]; Site Location [Profile] | Interval or annual AC electricity generation, with model inputs, warnings, units, and source version -> PV_AC_kWh_t (kWh/interval; PROFILE) |
| interval_tariff | Interval Tariff Resolution | STD-INTERVAL-TARIFF | Serving electric utility from the bill [Bill]; Published rate schedule and customer class from the bill [Bill]; Tariff effective date covering the analysis period [Bill]; Continuous interval energy and demand aligned to the tariff timezone [Bill] | One complete tariff input set with exact or conservative-screening provenance -> tariff_input_set (record set; RECORD_SET) |
| reopt_local_dispatch | Solar Plus Storage Interval Bill Calculation | STD-REOPT-LOCAL-DISPATCH | Power capacity [Linked Opportunity]; Usable-energy capacity [Linked Opportunity]; Charge efficiency prescribed by the linked opportunity [Linked Opportunity]; Discharge efficiency prescribed by the linked opportunity [Linked Opportunity]; Initial state of charge [Linked Opportunity]; Reserve constraint [Linked Opportunity]; Timestamped interval utility data from the uploaded utility artifact [Bill]; Time zone and daylight-saving metadata from the uploaded utility artifact [Bill]; Interval solar generation from the connected PVWatts process [Standard Output] | Baseline annual bill -> baseline_annual_bill (USD/year; SITE_TOTAL); Proposed annual bill -> proposed_annual_bill (USD/year; SITE_TOTAL) |

### Current execution evidence

| Process key | Execution-verified proof level | Adapter path | Actual adapter test result | Current blocker |
| --- | --- | --- | --- | --- |
| pvwatts_v8 | DOCUMENTATION_ONLY | scripts/research/operational-savings/adapters/pvwatts/run.mjs | pvwatts-publication-failure: NOT_COVERED<br>pvwatts-real-database-publication: NOT_COVERED<br>pvwatts-real-ssc-execution: NOT_COVERED<br>pvwatts-ssc-version-failure: NOT_COVERED | EXECUTION_RUN_RECORD_REQUIRED: The static proof declaration is not counted as executed proof until one current local content-bound run record covers every required exact test. |
| interval_tariff | DOCUMENTATION_ONLY | scripts/research/operational-savings/adapters/interval-tariff/run.mjs | interval-tariff-real-composite-proof: NOT_COVERED<br>interval-tariff-term-schedule-failure-proof: NOT_COVERED | EXECUTION_RUN_RECORD_REQUIRED: The static proof declaration is not counted as executed proof until one current local content-bound run record covers every required exact test. |
| reopt_local_dispatch | DOCUMENTATION_ONLY | scripts/research/operational-savings/adapters/reopt/run.mjs | reopt-immutable-identity-failure-proof: NOT_COVERED<br>reopt-offline-proof: NOT_COVERED<br>reopt-run-evidence-failure-proof: NOT_COVERED<br>reopt-solar-input-boundary-failure-proof: NOT_COVERED<br>reopt-solar-storage-publication-proof: NOT_COVERED | EXECUTION_RUN_RECORD_REQUIRED: The static proof declaration is not counted as executed proof until one current local content-bound run record covers every required exact test. |

## End-to-end graph

- `pvwatts_v8`: DC capacity [Linked Opportunity] + Module Type [Linked Opportunity] + Array type [Linked Opportunity] + System losses [Linked Opportunity] + Tilt [Linked Opportunity] + Azimuth [Linked Opportunity] + Site Location [Profile] -> STD-PVWATTS-V8 -> model_versions + model_input_schemas + climate_crosswalks + calculation_runs -> Interval or annual AC electricity generation, with model inputs, warnings, units, and source version -> PV_AC_kWh_t (kWh/interval)
- `interval_tariff`: Serving electric utility from the bill [Bill] + Published rate schedule and customer class from the bill [Bill] + Tariff effective date covering the analysis period [Bill] + Continuous interval energy and demand aligned to the tariff timezone [Bill] -> STD-INTERVAL-TARIFF -> utility_providers + utility_tariffs + tariff_periods + tariff_energy_charges + tariff_demand_charges + tariff_export_rules -> One complete tariff input set with exact or conservative-screening provenance -> tariff_input_set (record set)
- `reopt_local_dispatch`: Power capacity [Linked Opportunity] + Usable-energy capacity [Linked Opportunity] + Charge efficiency prescribed by the linked opportunity [Linked Opportunity] + Discharge efficiency prescribed by the linked opportunity [Linked Opportunity] + Initial state of charge [Linked Opportunity] + Reserve constraint [Linked Opportunity] + Timestamped interval utility data from the uploaded utility artifact [Bill] + Time zone and daylight-saving metadata from the uploaded utility artifact [Bill] + Interval solar generation from the connected PVWatts process [Standard Output] -> STD-REOPT-LOCAL-DISPATCH -> model_versions + model_input_schemas + calculation_runs + calculation_warnings + selected_value_provenance -> Baseline annual bill -> baseline_annual_bill (USD/year) + Proposed annual bill -> proposed_annual_bill (USD/year)

## Feasibility

The category depends on these source-level verdicts: NOT_FEASIBLE_WITH_CURRENT_PUBLIC_SOURCES.
The process table reports the final proof level after execution-record verification, not a higher level that a manifest may have declared before the current run.
An exact path is usable only when every owned input is present and every Standard adapter returns one unambiguous compatible result.
A benchmark path is usable only where the category has a retained authoritative population and exact selection rule.
The runtime external-call count remains zero.

## Conditional next actions

| Process key | Current proof level | Next action |
| --- | --- | --- |
| pvwatts_v8 | DOCUMENTATION_ONLY | Acquire or implement the missing evidence named by the blocker, then add exact adapter tests before claiming executable coverage. EXECUTION_RUN_RECORD_REQUIRED: The static proof declaration is not counted as executed proof until one current local content-bound run record covers every required exact test. |
| interval_tariff | DOCUMENTATION_ONLY | Acquire or implement the missing evidence named by the blocker, then add exact adapter tests before claiming executable coverage. EXECUTION_RUN_RECORD_REQUIRED: The static proof declaration is not counted as executed proof until one current local content-bound run record covers every required exact test. |
| reopt_local_dispatch | DOCUMENTATION_ONLY | Acquire or implement the missing evidence named by the blocker, then add exact adapter tests before claiming executable coverage. EXECUTION_RUN_RECORD_REQUIRED: The static proof declaration is not counted as executed proof until one current local content-bound run record covers every required exact test. |
