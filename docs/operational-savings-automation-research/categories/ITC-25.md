# ITC-25 - Thermal-storage interval dispatch

This report evaluates automation coverage without changing the approved Information Card.
The category contains 2 category-local process instances and references 2 canonical Standards.
Its current formula, tree, bindings, ownership decisions, and status remain unchanged.

## Process coverage

| Process key | Process name | Canonical Standard | Required inputs | Exact outputs | Formula terms | Source feasibility | Runtime external calls | Current blocker |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| interval_tariff | Interval Tariff Resolution | STD-INTERVAL-TARIFF | Serving electric utility from the bill; Published rate schedule and customer class from the bill; Tariff effective date covering the analysis period; Continuous interval energy and demand aligned to the tariff timezone | One complete tariff input set with exact or conservative-screening provenance | tariff_input_set | FEASIBLE_AFTER_ADAPTER_WORK | 0 | The official OpenEI Utility Rate Database and API documentation define structured utility-rate access. No retained utility tariff, parser fixture, or bill-reconciliation golden case currently proves this category adapter, so exact execution remains implementation-pending and the conservative screen must remain explicitly labeled. |
| reopt_local_dispatch | Thermal Energy Storage Interval Bill Calculation | STD-REOPT-LOCAL-DISPATCH | Timestamped interval utility data from the uploaded utility artifact; Time zone and daylight-saving metadata from the uploaded utility artifact; Thermal capacity; Charge limit; Discharge limit; Charge efficiency prescribed by the linked opportunity; Discharge efficiency prescribed by the linked opportunity; Standing loss; Initial Thermal State; Terminal thermal-state constraint | Baseline annual bill; Proposed annual bill | baseline_annual_bill; proposed_annual_bill | FEASIBLE_AFTER_ADAPTER_WORK | 0 | The official V3 input documentation and open-source solver were checked, so local optimization is technically possible. No category dispatch adapter or golden result is retained, and REopt cannot supply a missing load profile, tariff, or technology design. |

## End-to-end graph

- `interval_tariff`: Serving electric utility from the bill [Bill] + Published rate schedule and customer class from the bill [Bill] + Tariff effective date covering the analysis period [Bill] + Continuous interval energy and demand aligned to the tariff timezone [Bill] -> STD-INTERVAL-TARIFF -> utility_providers + utility_tariffs + tariff_periods + tariff_energy_charges + tariff_demand_charges + tariff_export_rules -> One complete tariff input set with exact or conservative-screening provenance -> tariff_input_set (record set)
- `reopt_local_dispatch`: Timestamped interval utility data from the uploaded utility artifact [Bill] + Time zone and daylight-saving metadata from the uploaded utility artifact [Bill] + Thermal capacity [Linked Opportunity] + Charge limit [Linked Opportunity] + Discharge limit [Linked Opportunity] + Charge efficiency prescribed by the linked opportunity [Linked Opportunity] + Discharge efficiency prescribed by the linked opportunity [Linked Opportunity] + Standing loss [Linked Opportunity] + Initial Thermal State [Linked Opportunity] + Terminal thermal-state constraint [Linked Opportunity] -> STD-REOPT-LOCAL-DISPATCH -> model_versions + model_input_schemas + calculation_runs + calculation_warnings + selected_value_provenance -> Baseline annual bill -> baseline_annual_bill (USD/year) + Proposed annual bill -> proposed_annual_bill (USD/year)

## Feasibility

The category depends on these source-level verdicts: FEASIBLE_AFTER_ADAPTER_WORK.
An exact path is feasible only when every bound Profile, Bill, Linked Opportunity, Project Document, and User input is present and every Standard adapter returns an unambiguous compatible result.
A benchmark path is feasible only where the category has a retained authoritative population and exact selection rule.
The runtime external-call count remains zero.

## Recommended next action

Implement and accept the shared source-family adapters before connecting this category to any calculation runtime.
Add one category golden fixture for each supported exact or benchmark path.
Keep unsupported paths explicit rather than filling them with generic defaults.
