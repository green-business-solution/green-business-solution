# ITC-24 - Solar-plus-storage interval dispatch

This report evaluates automation coverage without changing the approved Information Card.
The category contains 3 category-local process instances and references 3 canonical Standards.
Its current formula, tree, bindings, ownership decisions, and status remain unchanged.

## Process coverage

| Process key | Process name | Canonical Standard | Required inputs | Exact outputs | Formula terms | Source feasibility | Runtime external calls | Current blocker |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| pvwatts_v8 | PVWatts Solar Production Calculation | STD-PVWATTS-V8 | DC capacity; Module Type; Array type; System losses; Tilt; Azimuth; Site Location | Interval or annual AC electricity generation, with model inputs, warnings, units, and source version | PV_AC_kWh_t | FEASIBLE_AFTER_ADAPTER_WORK | 0 | The official V8 field contract was checked and the retained fixture validates required fields, units, source version, and unsupported defaults. The source can calculate generation but cannot choose system capacity or array configuration for the project. The category adapter and formula-level golden test have not yet been added. |
| interval_tariff | Interval Tariff Resolution | STD-INTERVAL-TARIFF | Serving electric utility from the bill; Published rate schedule and customer class from the bill; Tariff effective date covering the analysis period; Continuous interval energy and demand aligned to the tariff timezone | One complete tariff input set with exact or conservative-screening provenance | tariff_input_set | FEASIBLE_AFTER_ADAPTER_WORK | 0 | The official OpenEI Utility Rate Database and API documentation define structured utility-rate access. No retained utility tariff, parser fixture, or bill-reconciliation golden case currently proves this category adapter, so exact execution remains implementation-pending and the conservative screen must remain explicitly labeled. |
| reopt_local_dispatch | Solar Plus Storage Interval Bill Calculation | STD-REOPT-LOCAL-DISPATCH | Power capacity; Usable-energy capacity; Charge efficiency prescribed by the linked opportunity; Discharge efficiency prescribed by the linked opportunity; Initial state of charge; Reserve constraint; Timestamped interval utility data from the uploaded utility artifact; Time zone and daylight-saving metadata from the uploaded utility artifact; Interval solar generation from the connected PVWatts process | Baseline annual bill; Proposed annual bill | baseline_annual_bill; proposed_annual_bill | FEASIBLE_AFTER_ADAPTER_WORK | 0 | The official V3 input documentation and open-source solver were checked, so local optimization is technically possible. No category dispatch adapter or golden result is retained, and REopt cannot supply a missing load profile, tariff, or technology design. |

## End-to-end graph

- `pvwatts_v8`: DC capacity [Linked Opportunity] + Module Type [Linked Opportunity] + Array type [Linked Opportunity] + System losses [Linked Opportunity] + Tilt [Linked Opportunity] + Azimuth [Linked Opportunity] + Site Location [Profile] -> STD-PVWATTS-V8 -> model_versions + model_input_schemas + climate_crosswalks + calculation_runs -> Interval or annual AC electricity generation, with model inputs, warnings, units, and source version -> PV_AC_kWh_t (kWh/interval)
- `interval_tariff`: Serving electric utility from the bill [Bill] + Published rate schedule and customer class from the bill [Bill] + Tariff effective date covering the analysis period [Bill] + Continuous interval energy and demand aligned to the tariff timezone [Bill] -> STD-INTERVAL-TARIFF -> utility_providers + utility_tariffs + tariff_periods + tariff_energy_charges + tariff_demand_charges + tariff_export_rules -> One complete tariff input set with exact or conservative-screening provenance -> tariff_input_set (record set)
- `reopt_local_dispatch`: Power capacity [Linked Opportunity] + Usable-energy capacity [Linked Opportunity] + Charge efficiency prescribed by the linked opportunity [Linked Opportunity] + Discharge efficiency prescribed by the linked opportunity [Linked Opportunity] + Initial state of charge [Linked Opportunity] + Reserve constraint [Linked Opportunity] + Timestamped interval utility data from the uploaded utility artifact [Bill] + Time zone and daylight-saving metadata from the uploaded utility artifact [Bill] + Interval solar generation from the connected PVWatts process [Standard Output] -> STD-REOPT-LOCAL-DISPATCH -> model_versions + model_input_schemas + calculation_runs + calculation_warnings + selected_value_provenance -> Baseline annual bill -> baseline_annual_bill (USD/year) + Proposed annual bill -> proposed_annual_bill (USD/year)

## Feasibility

The category depends on these source-level verdicts: FEASIBLE_AFTER_ADAPTER_WORK.
An exact path is feasible only when every bound Profile, Bill, Linked Opportunity, Project Document, and User input is present and every Standard adapter returns an unambiguous compatible result.
A benchmark path is feasible only where the category has a retained authoritative population and exact selection rule.
The runtime external-call count remains zero.

## Recommended next action

Implement and accept the shared source-family adapters before connecting this category to any calculation runtime.
Add one category golden fixture for each supported exact or benchmark path.
Keep unsupported paths explicit rather than filling them with generic defaults.
