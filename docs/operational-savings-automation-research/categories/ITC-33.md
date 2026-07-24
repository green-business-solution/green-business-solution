# ITC-33 - Flush-fixture water reduction

This report evaluates automation coverage without changing the approved Information Card.
The category contains 4 category-local process instances and references 2 canonical Standards.
Its current formula, tree, bindings, ownership decisions, and status remain unchanged.

## Process coverage

| Process key | Process name | Canonical Standard | Required inputs | Exact outputs | Formula terms | Source feasibility | Runtime external calls | Current blocker |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| flush_activity | Flush Activity Resolution | STD-CONTEXT-BENCHMARKS | Toilet or urinal type; Female eligible population; Male eligible population; Customer or visitor population when applicable; In-scope fixture count; Operating days per week; Active weeks per year; Observed restroom study when available | Total annual flushes across the in-scope fixture group | total_annual_flushes_group | PARTIALLY_FEASIBLE | 0 | The retained WaterSense fixture proves the female toilet, male toilet, and male urinal daily assumptions and annual flush-count equation. A category calculation golden fixture remains pending, but the source fields and no-double-count boundary are explicit. |
| existing_flush_rate | Existing Flush Volume Resolution | STD-CONTEXT-BENCHMARKS | Existing toilet or urinal type; Existing label, specification, audit, or measurement when available | One existing gallons-per-flush value | gpf_existing | PARTIALLY_FEASIBLE | 0 | The retained EPA activity fixture does not supply installed gallons-per-flush values. Exact project evidence is supported, while an installed-volume benchmark remains implementation-pending. |
| exact-proposed-fixture-rating | Exact Proposed Flush Fixture Rating Lookup | STD-WATERSENSE-FIXTURES | Exact proposed fixture make and model from the linked opportunity; Fixture type and application | Proposed rated gallons per flush with units and product provenance | gpf_proposed | FEASIBLE_AFTER_MANUAL_SEED | 0 | The official WaterSense Product Search exposes a downloadable complete model list for supported toilet and urinal categories. No retained product export or category adapter currently proves the exact rated gallons per flush lookup, so source access is verified while field-level execution remains pending. The product source does not supply existing installed performance or usage frequency. |
| requirement-proposed-fixture-rating | Requirement-Based Proposed Flush Fixture Resolution | STD-WATERSENSE-FIXTURES | Fixture requirements from the linked opportunity; Fixture type and application; Required water-use criterion | One selected proposed rated gallons per flush, with the eligible compatible fixture population, selection rule, units, and source provenance retained internally | gpf_proposed | FEASIBLE_AFTER_MANUAL_SEED | 0 | The official WaterSense criteria define compatible proposed rated gallons per flush requirements. The official product-search or downloadable-product adapter and retained compatible population are not yet implemented, so the source-supported filtering method is verified but execution proof for the selected median is pending. The source does not supply existing ratings or usage frequency. |

## End-to-end graph

- `flush_activity`: Toilet or urinal type [User] + Female eligible population [User] + Male eligible population [User] + Customer or visitor population when applicable [User] + In-scope fixture count [User] + Operating days per week [User] + Active weeks per year [User] + Observed restroom study when available [Project Document] -> STD-CONTEXT-BENCHMARKS -> benchmark_populations + benchmark_values + calculation_assumptions + selected_values + selected_value_provenance -> Total annual flushes across the in-scope fixture group -> total_annual_flushes_group (flushes/year)
- `existing_flush_rate`: Existing toilet or urinal type [User] + Existing label, specification, audit, or measurement when available [Project Document] -> STD-CONTEXT-BENCHMARKS -> benchmark_populations + benchmark_values + calculation_assumptions + selected_values + selected_value_provenance -> One existing gallons-per-flush value -> gpf_existing (gallons/flush)
- `exact-proposed-fixture-rating`: Exact proposed fixture make and model from the linked opportunity [Linked Opportunity] + Fixture type and application [Linked Opportunity] -> STD-WATERSENSE-FIXTURES -> equipment_products + equipment_certifications + equipment_performance_fields -> Proposed rated gallons per flush with units and product provenance -> gpf_proposed (gallons/flush)
- `requirement-proposed-fixture-rating`: Fixture requirements from the linked opportunity [Linked Opportunity] + Fixture type and application [Linked Opportunity] + Required water-use criterion [Linked Opportunity] -> STD-WATERSENSE-FIXTURES -> equipment_products + equipment_certifications + equipment_performance_fields -> One selected proposed rated gallons per flush, with the eligible compatible fixture population, selection rule, units, and source provenance retained internally -> gpf_proposed (gallons/flush)

## Feasibility

The category depends on these source-level verdicts: PARTIALLY_FEASIBLE, FEASIBLE_AFTER_MANUAL_SEED.
An exact path is feasible only when every bound Profile, Bill, Linked Opportunity, Project Document, and User input is present and every Standard adapter returns an unambiguous compatible result.
A benchmark path is feasible only where the category has a retained authoritative population and exact selection rule.
The runtime external-call count remains zero.

## Recommended next action

Implement and accept the shared source-family adapters before connecting this category to any calculation runtime.
Add one category golden fixture for each supported exact or benchmark path.
Keep unsupported paths explicit rather than filling them with generic defaults.
