# ITC-23 - Battery interval dispatch

This report evaluates automation coverage without changing the approved Information Card.
The category contains 3 category-local process instances and references 3 canonical Standards.
Its current formula, tree, bindings, ownership decisions, and status remain unchanged.

## Process coverage

| Process key | Process name | Canonical Standard | Required inputs | Exact outputs | Formula terms | Source feasibility | Runtime external calls | Current blocker |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| interval_tariff | Interval Tariff Resolution | STD-INTERVAL-TARIFF | Serving electric utility from the bill; Published rate schedule and customer class from the bill; Tariff effective date covering the analysis period; Continuous interval energy and demand aligned to the tariff timezone | One complete tariff input set with exact or conservative-screening provenance | tariff_input_set | FEASIBLE_AFTER_ADAPTER_WORK | 0 | The official OpenEI Utility Rate Database and API documentation define structured utility-rate access. No retained utility tariff, parser fixture, or bill-reconciliation golden case currently proves this category adapter, so exact execution remains implementation-pending and the conservative screen must remain explicitly labeled. |
| context_benchmarks | Battery Dispatch Boundary Benchmark | STD-CONTEXT-BENCHMARKS | Initial state of charge; Dispatch horizon; Opportunity reserve requirement; Project Document reserve requirement | One terminal state-of-charge constraint | state_of_charge_t | PARTIALLY_FEASIBLE | 0 | The REopt input reference confirms that storage state constraints are model inputs. Equality to the initial state is a deterministic RetroFi screening boundary, not a value supplied by REopt and not a substitute for missing battery design specifications. A retained category dispatch golden fixture has not yet been added. |
| reopt_local_dispatch | Battery Storage Dispatch Interval Bill Calculation | STD-REOPT-LOCAL-DISPATCH | Timestamped interval utility data from the uploaded utility artifact; Time zone and daylight-saving metadata from the uploaded utility artifact; Resolved interval tariff input set from the connected tariff process; Power capacity; Usable-energy capacity; Charge efficiency from a nameplate, measurement, audit, or contractor specification; Discharge efficiency from a nameplate, measurement, audit, or contractor specification; Initial state of charge; Terminal state-of-charge constraint from the linked opportunity; Terminal state-of-charge constraint from a Project Document; Terminal state-of-charge constraint from the connected context benchmark; Dispatch-availability schedule; Reserve constraint | Baseline annual bill; Proposed annual bill | baseline_annual_bill; proposed_annual_bill | FEASIBLE_AFTER_ADAPTER_WORK | 0 | The official V3 input documentation and open-source solver were checked, so local optimization is technically possible. No category dispatch adapter or golden result is retained, and REopt cannot supply a missing load profile, tariff, or technology design. |

## End-to-end graph

- `interval_tariff`: Serving electric utility from the bill [Bill] + Published rate schedule and customer class from the bill [Bill] + Tariff effective date covering the analysis period [Bill] + Continuous interval energy and demand aligned to the tariff timezone [Bill] -> STD-INTERVAL-TARIFF -> utility_providers + utility_tariffs + tariff_periods + tariff_energy_charges + tariff_demand_charges + tariff_export_rules -> One complete tariff input set with exact or conservative-screening provenance -> tariff_input_set (record set)
- `context_benchmarks`: Initial state of charge [Linked Opportunity] + Dispatch horizon [User] + Opportunity reserve requirement [Linked Opportunity] + Project Document reserve requirement [Project Document] -> STD-CONTEXT-BENCHMARKS -> benchmark_populations + benchmark_values + calculation_assumptions + selected_values + selected_value_provenance -> One terminal state-of-charge constraint -> state_of_charge_t (kWh)
- `reopt_local_dispatch`: Timestamped interval utility data from the uploaded utility artifact [Bill] + Time zone and daylight-saving metadata from the uploaded utility artifact [Bill] + Resolved interval tariff input set from the connected tariff process [Standard Output] + Power capacity [Linked Opportunity] + Usable-energy capacity [Linked Opportunity] + Charge efficiency from a nameplate, measurement, audit, or contractor specification [Project Document] + Discharge efficiency from a nameplate, measurement, audit, or contractor specification [Project Document] + Initial state of charge [Linked Opportunity] + Terminal state-of-charge constraint from the linked opportunity [Linked Opportunity] + Terminal state-of-charge constraint from a Project Document [Project Document] + Terminal state-of-charge constraint from the connected context benchmark [Standard Output] + Dispatch-availability schedule [Linked Opportunity] + Reserve constraint [Linked Opportunity] -> STD-REOPT-LOCAL-DISPATCH -> model_versions + model_input_schemas + calculation_runs + calculation_warnings + selected_value_provenance -> Baseline annual bill -> baseline_annual_bill (USD/year) + Proposed annual bill -> proposed_annual_bill (USD/year)

## Feasibility

The category depends on these source-level verdicts: FEASIBLE_AFTER_ADAPTER_WORK, PARTIALLY_FEASIBLE.
An exact path is feasible only when every bound Profile, Bill, Linked Opportunity, Project Document, and User input is present and every Standard adapter returns an unambiguous compatible result.
A benchmark path is feasible only where the category has a retained authoritative population and exact selection rule.
The runtime external-call count remains zero.

## Recommended next action

Implement and accept the shared source-family adapters before connecting this category to any calculation runtime.
Add one category golden fixture for each supported exact or benchmark path.
Keep unsupported paths explicit rather than filling them with generic defaults.
