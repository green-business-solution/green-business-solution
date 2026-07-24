# ITC-17 - PV interval generation and bill offset

This report evaluates automation coverage without changing the approved Information Card.
The category contains 2 category-local process instances and references 2 canonical Standards.
Its current formula, tree, bindings, ownership decisions, and status remain unchanged.

## Process coverage

| Process key | Process name | Canonical Standard | Required inputs | Exact outputs | Formula terms | Source feasibility | Runtime external calls | Current blocker |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| pvwatts_v8 | PVWatts Solar Production Calculation | STD-PVWATTS-V8 | DC capacity; Module Type; Array type; System losses; Tilt; Azimuth; Site Location | Interval or annual AC electricity generation, with model inputs, warnings, units, and source version | PV_AC_kWh_t | FEASIBLE_AFTER_ADAPTER_WORK | 0 | The official V8 field contract was checked and the retained fixture validates required fields, units, source version, and unsupported defaults. The source can calculate generation but cannot choose system capacity or array configuration for the project. The category adapter and formula-level golden test have not yet been added. |
| interval_tariff | Interval Tariff Resolution | STD-INTERVAL-TARIFF | Serving electric utility from the bill; Published rate schedule and customer class from the bill; Tariff effective date covering the analysis period; Continuous interval energy and demand aligned to the tariff timezone; Interconnection and export-credit configuration from the project agreement | One complete tariff input set with exact or conservative-screening provenance | tariff_input_set | FEASIBLE_AFTER_ADAPTER_WORK | 0 | The official OpenEI Utility Rate Database and API documentation define structured utility-rate access. No retained utility tariff, parser fixture, or bill-reconciliation golden case currently proves this category adapter, so exact execution remains implementation-pending and the conservative screen must remain explicitly labeled. |

## End-to-end graph

- `pvwatts_v8`: DC capacity [Linked Opportunity] + Module Type [Linked Opportunity] + Array type [Linked Opportunity] + System losses [Linked Opportunity] + Tilt [Linked Opportunity] + Azimuth [Linked Opportunity] + Site Location [Profile] -> STD-PVWATTS-V8 -> model_versions + model_input_schemas + climate_crosswalks + calculation_runs -> Interval or annual AC electricity generation, with model inputs, warnings, units, and source version -> PV_AC_kWh_t (kWh/interval)
- `interval_tariff`: Serving electric utility from the bill [Bill] + Published rate schedule and customer class from the bill [Bill] + Tariff effective date covering the analysis period [Bill] + Continuous interval energy and demand aligned to the tariff timezone [Bill] + Interconnection and export-credit configuration from the project agreement [Linked Opportunity] -> STD-INTERVAL-TARIFF -> utility_providers + utility_tariffs + tariff_periods + tariff_energy_charges + tariff_demand_charges + tariff_export_rules -> One complete tariff input set with exact or conservative-screening provenance -> tariff_input_set (record set)

## Feasibility

The category depends on these source-level verdicts: FEASIBLE_AFTER_ADAPTER_WORK.
An exact path is feasible only when every bound Profile, Bill, Linked Opportunity, Project Document, and User input is present and every Standard adapter returns an unambiguous compatible result.
A benchmark path is feasible only where the category has a retained authoritative population and exact selection rule.
The runtime external-call count remains zero.

## Recommended next action

Implement and accept the shared source-family adapters before connecting this category to any calculation runtime.
Add one category golden fixture for each supported exact or benchmark path.
Keep unsupported paths explicit rather than filling them with generic defaults.
