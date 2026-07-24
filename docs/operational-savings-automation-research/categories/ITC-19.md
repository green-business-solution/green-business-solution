# ITC-19 - Wind interval generation and bill offset

This report evaluates automation coverage without changing the approved Information Card.
The category contains 2 category-local process instances and references 2 canonical Standards.
Its current formula, tree, bindings, ownership decisions, and status remain unchanged.

## Process coverage

| Process key | Process name | Canonical Standard | Required inputs | Exact outputs | Formula terms | Source feasibility | Runtime external calls | Current blocker |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| wind_sam | Small Wind Production Simulation | STD-WIND-SAM | Wind Turbine Class or Intended Application; Exact Turbine Model or Power Curve; Hub Height; Loss factor; Analysis Year; Site Location | Interval and annual AC electricity generation, with wind resource, turbine, loss, unit, and source provenance | wind_kWh_t | FEASIBLE_AFTER_ADAPTER_WORK | 0 | The official WIND Toolkit access path and SAM implementation were checked. A retained turbine and resource fixture is still absent, and the source cannot choose the turbine, power curve, hub height, or losses for the project. |
| interval_tariff | Interval Tariff Resolution | STD-INTERVAL-TARIFF | Serving electric utility from the bill; Published rate schedule and customer class from the bill; Tariff effective date covering the analysis period; Continuous interval energy and demand aligned to the tariff timezone; Interconnection and export-credit configuration from the project agreement | One complete tariff input set with exact or conservative-screening provenance | tariff_input_set | FEASIBLE_AFTER_ADAPTER_WORK | 0 | The official OpenEI Utility Rate Database and API documentation define structured utility-rate access. No retained utility tariff, parser fixture, or bill-reconciliation golden case currently proves this category adapter, so exact execution remains implementation-pending and the conservative screen must remain explicitly labeled. |

## End-to-end graph

- `wind_sam`: Wind Turbine Class or Intended Application [Linked Opportunity] + Exact Turbine Model or Power Curve [Linked Opportunity] + Hub Height [Linked Opportunity] + Loss factor [Linked Opportunity] + Analysis Year [User] + Site Location [Profile] -> STD-WIND-SAM -> model_versions + model_input_schemas + climate_crosswalks + calculation_runs -> Interval and annual AC electricity generation, with wind resource, turbine, loss, unit, and source provenance -> wind_kWh_t (kWh/interval)
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
