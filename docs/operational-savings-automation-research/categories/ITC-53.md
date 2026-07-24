# ITC-53 - Commercial laundry cycle resource balance

This report evaluates automation coverage without changing the approved Information Card.
The category contains 3 category-local process instances and references 2 canonical Standards.
Its current formula, tree, bindings, ownership decisions, and status remain unchanged.

## Process coverage

| Process key | Process name | Canonical Standard | Required inputs | Exact outputs | Formula terms | Source feasibility | Runtime external calls | Current blocker |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| existing-product-rating | Existing Commercial Washer Rating Resolution | STD-DOE-CCMS-RATINGS, STD-ENERGY-STAR-PRODUCT-DATA | Existing commercial washer type or application; Existing make and model, when available; Existing capacity or size class | Existing water use per cycle; Existing hot-water use per cycle; Existing machine electricity per cycle | water_per_cycle_existing; hot_water_per_cycle_existing; machine_kWh_per_cycle_existing | FEASIBLE_AFTER_MANUAL_SEED, FEASIBLE_NOW | 0 | The official certification access paths and native product-family fields were checked. Current efficient-product records do not represent the installed baseline. An exact documented existing model is preferred; when it is unavailable, a separately sourced context-matched installed-equipment benchmark is required. That benchmark adapter and the category golden test have not yet been added. |
| exact-proposed-product-rating | Exact Proposed Commercial Washer Rating Lookup | STD-DOE-CCMS-RATINGS, STD-ENERGY-STAR-PRODUCT-DATA | Exact proposed make and model from the linked opportunity; Product type and capacity; Applicable certified test method | Proposed water use per cycle; Proposed hot-water use per cycle; Proposed machine electricity per cycle | water_per_cycle_proposed; hot_water_per_cycle_proposed; machine_kWh_per_cycle_proposed | FEASIBLE_AFTER_MANUAL_SEED, FEASIBLE_NOW | 0 | The official certification access path and applicable commercial washer product-family fields were checked. Exact active-model matching is technically possible, but the category-specific adapter, retained product fixture, and golden test have not yet been added. |
| requirement-proposed-product-rating | Requirement-Based Proposed Commercial Washer Resolution | STD-DOE-CCMS-RATINGS, STD-ENERGY-STAR-PRODUCT-DATA | Product requirements from the linked opportunity; Required application and capacity; Applicable efficiency or resource-use criteria | Selected proposed water use per cycle; Selected proposed hot-water use per cycle; Selected proposed machine electricity per cycle | water_per_cycle_proposed; hot_water_per_cycle_proposed; machine_kWh_per_cycle_proposed | FEASIBLE_AFTER_MANUAL_SEED, FEASIBLE_NOW | 0 | The official certification access path and applicable commercial washer product-family filters were checked. Candidate-set automation is technically possible, but no retained category export proves the eligible population, filters, population size, or selected median result. |

## End-to-end graph

- `existing-product-rating`: Existing commercial washer type or application [User] + Existing make and model, when available [User] + Existing capacity or size class [User] -> STD-DOE-CCMS-RATINGS + STD-ENERGY-STAR-PRODUCT-DATA -> equipment_products + equipment_certifications + equipment_performance_fields + source_releases + source_artifacts + product_taxonomy_crosswalks -> Existing water use per cycle -> water_per_cycle_existing (gallons/cycle) + Existing hot-water use per cycle -> hot_water_per_cycle_existing (gallons/cycle) + Existing machine electricity per cycle -> machine_kWh_per_cycle_existing (kWh/cycle)
- `exact-proposed-product-rating`: Exact proposed make and model from the linked opportunity [Linked Opportunity] + Product type and capacity [Linked Opportunity] + Applicable certified test method [Linked Opportunity] -> STD-DOE-CCMS-RATINGS + STD-ENERGY-STAR-PRODUCT-DATA -> equipment_products + equipment_certifications + equipment_performance_fields + source_releases + source_artifacts + product_taxonomy_crosswalks -> Proposed water use per cycle -> water_per_cycle_proposed (gallons/cycle) + Proposed hot-water use per cycle -> hot_water_per_cycle_proposed (gallons/cycle) + Proposed machine electricity per cycle -> machine_kWh_per_cycle_proposed (kWh/cycle)
- `requirement-proposed-product-rating`: Product requirements from the linked opportunity [Linked Opportunity] + Required application and capacity [Linked Opportunity] + Applicable efficiency or resource-use criteria [Linked Opportunity] -> STD-DOE-CCMS-RATINGS + STD-ENERGY-STAR-PRODUCT-DATA -> equipment_products + equipment_certifications + equipment_performance_fields + source_releases + source_artifacts + product_taxonomy_crosswalks -> Selected proposed water use per cycle -> water_per_cycle_proposed (gallons/cycle) + Selected proposed hot-water use per cycle -> hot_water_per_cycle_proposed (gallons/cycle) + Selected proposed machine electricity per cycle -> machine_kWh_per_cycle_proposed (kWh/cycle)

## Feasibility

The category depends on these source-level verdicts: FEASIBLE_AFTER_MANUAL_SEED, FEASIBLE_NOW.
An exact path is feasible only when every bound Profile, Bill, Linked Opportunity, Project Document, and User input is present and every Standard adapter returns an unambiguous compatible result.
A benchmark path is feasible only where the category has a retained authoritative population and exact selection rule.
The runtime external-call count remains zero.

## Recommended next action

Implement and accept the shared source-family adapters before connecting this category to any calculation runtime.
Add one category golden fixture for each supported exact or benchmark path.
Keep unsupported paths explicit rather than filling them with generic defaults.
