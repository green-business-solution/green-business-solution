# ITC-08 - Solar thermal backup-resource displacement

This report evaluates automation coverage without changing the approved Information Card.
The category contains 2 category-local process instances and references 2 canonical Standards.
Its current formula, tree, bindings, ownership decisions, and status remain unchanged.

## Process coverage

| Process key | Process name | Canonical Standard | Required inputs | Exact outputs | Formula terms | Source feasibility | Runtime external calls | Current blocker |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| context_benchmarks | Solar Water-Heating Input Benchmark | STD-CONTEXT-BENCHMARKS | Business activity; Building type; Building area; Operating schedule; Electricity use from the bill when water heating is electric; Gas use from the bill when water heating is gas; Collector requirements from the linked opportunity; Available collector and storage Project Document; Available hot-water-load Project Document; Available backup-system Project Document | One context-matched collector and storage configuration; One annual hot-water load; One backup-system efficiency | collector_and_storage_configuration; annual_delivered_hot_water_load; backup_efficiency | PARTIALLY_FEASIBLE | 0 | The DOE reference-building source supports context matching, while SAM supplies the simulation method only after inputs are selected. A retained category benchmark fixture is not yet present, so the selection adapter remains implementation-pending and must not be attributed to SAM. |
| sam_solar_thermal | Solar Thermal Production Simulation | STD-SAM-SOLAR-THERMAL | Site location; Collector and storage design from the linked opportunity; Collector and storage design from a Project Document; Annual hot-water load from a Project Document; Annual hot-water load from the connected context benchmark; Backup fuel type; Backup-system efficiency from a Project Document; Backup-system efficiency from the connected context benchmark | Annual useful solar thermal output and displaced backup resource, with simulation inputs, units, and source version | SAM_output | FEASIBLE_AFTER_ADAPTER_WORK | 0 | The official SAM tool and open-source repository were checked, and local simulation is possible. No retained category fixture or golden calculation exists, and SAM does not supply missing collector design, hot-water load, or backup-system inputs. |

## End-to-end graph

- `context_benchmarks`: Business activity [Profile] + Building type [Profile] + Building area [Profile] + Operating schedule [User] + Electricity use from the bill when water heating is electric [Bill] + Gas use from the bill when water heating is gas [Bill] + Collector requirements from the linked opportunity [Linked Opportunity] + Available collector and storage Project Document [Project Document] + Available hot-water-load Project Document [Project Document] + Available backup-system Project Document [Project Document] -> STD-CONTEXT-BENCHMARKS -> benchmark_populations + benchmark_values + calculation_assumptions + selected_values + selected_value_provenance -> One context-matched collector and storage configuration -> collector_and_storage_configuration (record set) + One annual hot-water load -> annual_delivered_hot_water_load (kWh-thermal/year) + One backup-system efficiency -> backup_efficiency (fraction)
- `sam_solar_thermal`: Site location [Profile] + Collector and storage design from the linked opportunity [Linked Opportunity] + Collector and storage design from a Project Document [Project Document] + Annual hot-water load from a Project Document [Project Document] + Annual hot-water load from the connected context benchmark [Standard Output] + Backup fuel type [User] + Backup-system efficiency from a Project Document [Project Document] + Backup-system efficiency from the connected context benchmark [Standard Output] -> STD-SAM-SOLAR-THERMAL -> model_versions + model_input_schemas + climate_crosswalks + calculation_runs + calculation_warnings -> Annual useful solar thermal output and displaced backup resource, with simulation inputs, units, and source version -> SAM_output (kWh-thermal/year)

## Feasibility

The category depends on these source-level verdicts: PARTIALLY_FEASIBLE, FEASIBLE_AFTER_ADAPTER_WORK.
An exact path is feasible only when every bound Profile, Bill, Linked Opportunity, Project Document, and User input is present and every Standard adapter returns an unambiguous compatible result.
A benchmark path is feasible only where the category has a retained authoritative population and exact selection rule.
The runtime external-call count remains zero.

## Recommended next action

Implement and accept the shared source-family adapters before connecting this category to any calculation runtime.
Add one category golden fixture for each supported exact or benchmark path.
Keep unsupported paths explicit rather than filling them with generic defaults.
