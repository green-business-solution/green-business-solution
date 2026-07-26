# ITC-19 - Wind interval generation and bill offset

This report evaluates automation coverage without changing the approved Information Card.
The category contains 2 category-local process instances and references 2 canonical Standards.
Its current formula, tree, bindings, ownership decisions, and status remain unchanged.

## Process coverage

### Canonical process contract

| Process key | Process name | Canonical Standard | Required inputs | Exact output and formula term |
| --- | --- | --- | --- | --- |
| wind_sam | Small Wind Production Simulation | STD-WIND-SAM | Wind Turbine Class or Intended Application [Linked Opportunity]; Exact Turbine Model or Power Curve [Linked Opportunity]; Hub Height [Linked Opportunity]; Loss factor [Linked Opportunity]; Analysis Year [User]; Site Location [Profile] | Interval and annual AC electricity generation, with wind resource, turbine, loss, unit, and source provenance -> wind_kWh_t (kWh/interval; PROFILE) |
| interval_tariff | Interval Tariff Resolution | STD-INTERVAL-TARIFF | Serving electric utility from the bill [Bill]; Published rate schedule and customer class from the bill [Bill]; Tariff effective date covering the analysis period [Bill]; Continuous interval energy and demand aligned to the tariff timezone [Bill]; Interconnection and export-credit configuration from the project agreement [Linked Opportunity] | One complete tariff input set with exact or conservative-screening provenance -> tariff_input_set (record set; RECORD_SET) |

### Current execution evidence

| Process key | Execution-verified proof level | Adapter path | Actual adapter test result | Current blocker |
| --- | --- | --- | --- | --- |
| wind_sam | END_TO_END_REAL | scripts/research/operational-savings/adapters/wind-sam/run.mjs | wind-sam-publication-failure: PASSED; scripts/research/operational-savings/tests/ssc-database-publication.test.mjs :: STD-WIND-SAM rejects mixed model identity and offline publication violations<br>wind-sam-real-database-publication: PASSED; scripts/research/operational-savings/tests/ssc-database-publication.test.mjs :: STD-WIND-SAM publishes its pinned model identity, calculation, provenance, and exact formula selection<br>wind-sam-real-ssc-execution: PASSED; scripts/research/operational-savings/tests/ssc-models.test.mjs :: STD-WIND-SAM executes a real pinned local SSC model deterministically<br>wind-sam-ssc-version-failure: PASSED; scripts/research/operational-savings/tests/ssc-models.test.mjs :: STD-WIND-SAM rejects a caller model-version mismatch | None |
| interval_tariff | END_TO_END_REAL | scripts/research/operational-savings/adapters/interval-tariff/run.mjs | interval-tariff-real-composite-proof: PASSED; scripts/research/operational-savings/tests/interval-tariff-real.test.mjs :: returns the exact tariff_input_set formula term offline<br>interval-tariff-term-schedule-failure-proof: PASSED; scripts/research/operational-savings/tests/interval-tariff-real.test.mjs :: fails closed when a required tariff term or schedule is mutated | None |

## End-to-end graph

- `wind_sam`: Wind Turbine Class or Intended Application [Linked Opportunity] + Exact Turbine Model or Power Curve [Linked Opportunity] + Hub Height [Linked Opportunity] + Loss factor [Linked Opportunity] + Analysis Year [User] + Site Location [Profile] -> STD-WIND-SAM -> model_versions + model_input_schemas + climate_crosswalks + calculation_runs -> Interval and annual AC electricity generation, with wind resource, turbine, loss, unit, and source provenance -> wind_kWh_t (kWh/interval)
- `interval_tariff`: Serving electric utility from the bill [Bill] + Published rate schedule and customer class from the bill [Bill] + Tariff effective date covering the analysis period [Bill] + Continuous interval energy and demand aligned to the tariff timezone [Bill] + Interconnection and export-credit configuration from the project agreement [Linked Opportunity] -> STD-INTERVAL-TARIFF -> utility_providers + utility_tariffs + tariff_periods + tariff_energy_charges + tariff_demand_charges + tariff_export_rules -> One complete tariff input set with exact or conservative-screening provenance -> tariff_input_set (record set)

## Feasibility

The category depends on these source-level verdicts: FEASIBLE_NOW.
The process table reports the final proof level after execution-record verification, not a higher level that a manifest may have declared before the current run.
An exact path is usable only when every owned input is present and every Standard adapter returns one unambiguous compatible result.
A benchmark path is usable only where the category has a retained authoritative population and exact selection rule.
The runtime external-call count remains zero.

## Conditional next actions

| Process key | Current proof level | Next action |
| --- | --- | --- |
| wind_sam | END_TO_END_REAL | Accept or connect the proved path only within its recorded boundary, and keep the exact execution record current when code, fixtures, artifacts, or canonical bindings change. |
| interval_tariff | END_TO_END_REAL | Accept or connect the proved path only within its recorded boundary, and keep the exact execution record current when code, fixtures, artifacts, or canonical bindings change. |
