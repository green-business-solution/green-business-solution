# ITC-53 - Commercial laundry cycle resource balance

This report evaluates automation coverage without changing the approved Information Card.
The category contains 3 category-local process instances and references 2 canonical Standards.
Its current formula, tree, bindings, ownership decisions, and status remain unchanged.

## Process coverage

### Canonical process contract

| Process key | Process name | Canonical Standard | Required inputs | Exact output and formula term |
| --- | --- | --- | --- | --- |
| existing-product-rating | Existing Commercial Washer Rating Resolution | STD-DOE-CCMS-RATINGS, STD-ENERGY-STAR-PRODUCT-DATA | Existing commercial washer type or application [User]; Existing make and model, when available [User]; Existing capacity or size class [User] | Existing water use per cycle -> water_per_cycle_existing (gallons/cycle; PER_EVENT); Existing hot-water use per cycle -> hot_water_per_cycle_existing (gallons/cycle; PER_EVENT); Existing machine electricity per cycle -> machine_kWh_per_cycle_existing (kWh/cycle; PER_EVENT) |
| exact-proposed-product-rating | Exact Proposed Commercial Washer Rating Lookup | STD-DOE-CCMS-RATINGS, STD-ENERGY-STAR-PRODUCT-DATA | Exact proposed make and model from the linked opportunity [Linked Opportunity]; Product type and capacity [Linked Opportunity]; Applicable certified test method [Linked Opportunity] | Proposed water use per cycle -> water_per_cycle_proposed (gallons/cycle; PER_EVENT); Proposed hot-water use per cycle -> hot_water_per_cycle_proposed (gallons/cycle; PER_EVENT); Proposed machine electricity per cycle -> machine_kWh_per_cycle_proposed (kWh/cycle; PER_EVENT) |
| requirement-proposed-product-rating | Requirement-Based Proposed Commercial Washer Resolution | STD-DOE-CCMS-RATINGS, STD-ENERGY-STAR-PRODUCT-DATA | Product requirements from the linked opportunity [Linked Opportunity]; Required application and capacity [Linked Opportunity]; Applicable efficiency or resource-use criteria [Linked Opportunity] | Selected proposed water use per cycle -> water_per_cycle_proposed (gallons/cycle; PER_EVENT); Selected proposed hot-water use per cycle -> hot_water_per_cycle_proposed (gallons/cycle; PER_EVENT); Selected proposed machine electricity per cycle -> machine_kWh_per_cycle_proposed (kWh/cycle; PER_EVENT) |

### Current execution evidence

| Process key | Execution-verified proof level | Adapter path | Actual adapter test result | Current blocker |
| --- | --- | --- | --- | --- |
| existing-product-rating | DOCUMENTATION_ONLY | scripts/research/operational-savings/adapters/doe-ccms/run.mjs | doe-ccms-real-access-block-proof: PASSED; scripts/research/operational-savings/tests/doe-ccms-blocked.test.mjs :: verifies the retained official CCMS 403 access boundary | EXECUTION_RUN_RECORD_REQUIRED: The static proof declaration is not counted as executed proof until one current local content-bound run record covers every required exact test. |
| exact-proposed-product-rating | DOCUMENTATION_ONLY | scripts/research/operational-savings/adapters/doe-ccms/run.mjs | doe-ccms-real-access-block-proof: PASSED; scripts/research/operational-savings/tests/doe-ccms-blocked.test.mjs :: verifies the retained official CCMS 403 access boundary | EXECUTION_RUN_RECORD_REQUIRED: The static proof declaration is not counted as executed proof until one current local content-bound run record covers every required exact test. |
| requirement-proposed-product-rating | DOCUMENTATION_ONLY | scripts/research/operational-savings/adapters/doe-ccms/run.mjs | doe-ccms-real-access-block-proof: PASSED; scripts/research/operational-savings/tests/doe-ccms-blocked.test.mjs :: verifies the retained official CCMS 403 access boundary | EXECUTION_RUN_RECORD_REQUIRED: The static proof declaration is not counted as executed proof until one current local content-bound run record covers every required exact test. |

## End-to-end graph

- `existing-product-rating`: Existing commercial washer type or application [User] + Existing make and model, when available [User] + Existing capacity or size class [User] -> STD-DOE-CCMS-RATINGS + STD-ENERGY-STAR-PRODUCT-DATA -> equipment_products + equipment_certifications + equipment_performance_fields + source_releases + source_artifacts + energy_star_commercial_dishwashers + energy_star_dishwasher_operating_modes + product_taxonomy_crosswalks -> Existing water use per cycle -> water_per_cycle_existing (gallons/cycle) + Existing hot-water use per cycle -> hot_water_per_cycle_existing (gallons/cycle) + Existing machine electricity per cycle -> machine_kWh_per_cycle_existing (kWh/cycle)
- `exact-proposed-product-rating`: Exact proposed make and model from the linked opportunity [Linked Opportunity] + Product type and capacity [Linked Opportunity] + Applicable certified test method [Linked Opportunity] -> STD-DOE-CCMS-RATINGS + STD-ENERGY-STAR-PRODUCT-DATA -> equipment_products + equipment_certifications + equipment_performance_fields + source_releases + source_artifacts + energy_star_commercial_dishwashers + energy_star_dishwasher_operating_modes + product_taxonomy_crosswalks -> Proposed water use per cycle -> water_per_cycle_proposed (gallons/cycle) + Proposed hot-water use per cycle -> hot_water_per_cycle_proposed (gallons/cycle) + Proposed machine electricity per cycle -> machine_kWh_per_cycle_proposed (kWh/cycle)
- `requirement-proposed-product-rating`: Product requirements from the linked opportunity [Linked Opportunity] + Required application and capacity [Linked Opportunity] + Applicable efficiency or resource-use criteria [Linked Opportunity] -> STD-DOE-CCMS-RATINGS + STD-ENERGY-STAR-PRODUCT-DATA -> equipment_products + equipment_certifications + equipment_performance_fields + source_releases + source_artifacts + energy_star_commercial_dishwashers + energy_star_dishwasher_operating_modes + product_taxonomy_crosswalks -> Selected proposed water use per cycle -> water_per_cycle_proposed (gallons/cycle) + Selected proposed hot-water use per cycle -> hot_water_per_cycle_proposed (gallons/cycle) + Selected proposed machine electricity per cycle -> machine_kWh_per_cycle_proposed (kWh/cycle)

## Feasibility

The category depends on these source-level verdicts: NOT_FEASIBLE_WITH_CURRENT_PUBLIC_SOURCES.
The process table reports the final proof level after execution-record verification, not a higher level that a manifest may have declared before the current run.
An exact path is usable only when every owned input is present and every Standard adapter returns one unambiguous compatible result.
A benchmark path is usable only where the category has a retained authoritative population and exact selection rule.
The runtime external-call count remains zero.

## Conditional next actions

| Process key | Current proof level | Next action |
| --- | --- | --- |
| existing-product-rating | DOCUMENTATION_ONLY | Acquire or implement the missing evidence named by the blocker, then add exact adapter tests before claiming executable coverage. EXECUTION_RUN_RECORD_REQUIRED: The static proof declaration is not counted as executed proof until one current local content-bound run record covers every required exact test. |
| exact-proposed-product-rating | DOCUMENTATION_ONLY | Acquire or implement the missing evidence named by the blocker, then add exact adapter tests before claiming executable coverage. EXECUTION_RUN_RECORD_REQUIRED: The static proof declaration is not counted as executed proof until one current local content-bound run record covers every required exact test. |
| requirement-proposed-product-rating | DOCUMENTATION_ONLY | Acquire or implement the missing evidence named by the blocker, then add exact adapter tests before claiming executable coverage. EXECUTION_RUN_RECORD_REQUIRED: The static proof declaration is not counted as executed proof until one current local content-bound run record covers every required exact test. |
