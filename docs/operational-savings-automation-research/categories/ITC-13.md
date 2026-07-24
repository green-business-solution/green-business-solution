# ITC-13 - Ice-machine production resource intensity

This report evaluates automation coverage without changing the approved Information Card.
The category contains 3 category-local process instances and references 2 canonical Standards.
Its current formula, tree, bindings, ownership decisions, and status remain unchanged.

## Process coverage

| Process key | Process name | Canonical Standard | Required inputs | Exact outputs | Formula terms | Source feasibility | Runtime external calls | Current blocker |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| existing-product-rating | Existing Ice Machine Rating Resolution | STD-DOE-CCMS-RATINGS, STD-ENERGY-STAR-PRODUCT-DATA | Existing ice machine type or application; Existing make and model, when available; Existing capacity or size class | Existing electricity use per 100 pounds of ice; Existing potable water use per 100 pounds of ice | kWh_per_100lb_existing; water_gallons_per_100lb_existing | FEASIBLE_AFTER_MANUAL_SEED, FEASIBLE_NOW | 0 | The official certification access paths and native product-family fields were checked. Current efficient-product records do not represent the installed baseline. An exact documented existing model is preferred; when it is unavailable, a separately sourced context-matched installed-equipment benchmark is required. That benchmark adapter and the category golden test have not yet been added. |
| exact-proposed-product-rating | Exact Proposed Ice Machine Rating Lookup | STD-DOE-CCMS-RATINGS, STD-ENERGY-STAR-PRODUCT-DATA | Exact proposed make and model from the linked opportunity; Product type and capacity; Applicable certified test method | Proposed electricity use per 100 pounds of ice; Proposed potable water use per 100 pounds of ice | kWh_per_100lb_proposed; water_gallons_per_100lb_proposed | FEASIBLE_AFTER_MANUAL_SEED, FEASIBLE_NOW | 0 | The official certification access path and applicable ice machine product-family fields were checked. Exact active-model matching is technically possible, but the category-specific adapter, retained product fixture, and golden test have not yet been added. |
| requirement-proposed-product-rating | Requirement-Based Proposed Ice Machine Resolution | STD-DOE-CCMS-RATINGS, STD-ENERGY-STAR-PRODUCT-DATA | Product requirements from the linked opportunity; Required application and capacity; Applicable efficiency or resource-use criteria | Selected proposed electricity use per 100 pounds of ice; Selected proposed potable water use per 100 pounds of ice | kWh_per_100lb_proposed; water_gallons_per_100lb_proposed | FEASIBLE_AFTER_MANUAL_SEED, FEASIBLE_NOW | 0 | The official certification access path and applicable ice machine product-family filters were checked. Candidate-set automation is technically possible, but no retained category export proves the eligible population, filters, population size, or selected median result. |

## End-to-end graph

- `existing-product-rating`: Existing ice machine type or application [User] + Existing make and model, when available [User] + Existing capacity or size class [User] -> STD-DOE-CCMS-RATINGS + STD-ENERGY-STAR-PRODUCT-DATA -> equipment_products + equipment_certifications + equipment_performance_fields + source_releases + source_artifacts + product_taxonomy_crosswalks -> Existing electricity use per 100 pounds of ice -> kWh_per_100lb_existing (kWh/100 lb) + Existing potable water use per 100 pounds of ice -> water_gallons_per_100lb_existing (gallons/100 lb)
- `exact-proposed-product-rating`: Exact proposed make and model from the linked opportunity [Linked Opportunity] + Product type and capacity [Linked Opportunity] + Applicable certified test method [Linked Opportunity] -> STD-DOE-CCMS-RATINGS + STD-ENERGY-STAR-PRODUCT-DATA -> equipment_products + equipment_certifications + equipment_performance_fields + source_releases + source_artifacts + product_taxonomy_crosswalks -> Proposed electricity use per 100 pounds of ice -> kWh_per_100lb_proposed (kWh/100 lb) + Proposed potable water use per 100 pounds of ice -> water_gallons_per_100lb_proposed (gallons/100 lb)
- `requirement-proposed-product-rating`: Product requirements from the linked opportunity [Linked Opportunity] + Required application and capacity [Linked Opportunity] + Applicable efficiency or resource-use criteria [Linked Opportunity] -> STD-DOE-CCMS-RATINGS + STD-ENERGY-STAR-PRODUCT-DATA -> equipment_products + equipment_certifications + equipment_performance_fields + source_releases + source_artifacts + product_taxonomy_crosswalks -> Selected proposed electricity use per 100 pounds of ice -> kWh_per_100lb_proposed (kWh/100 lb) + Selected proposed potable water use per 100 pounds of ice -> water_gallons_per_100lb_proposed (gallons/100 lb)

## Feasibility

The category depends on these source-level verdicts: FEASIBLE_AFTER_MANUAL_SEED, FEASIBLE_NOW.
An exact path is feasible only when every bound Profile, Bill, Linked Opportunity, Project Document, and User input is present and every Standard adapter returns an unambiguous compatible result.
A benchmark path is feasible only where the category has a retained authoritative population and exact selection rule.
The runtime external-call count remains zero.

## Recommended next action

Implement and accept the shared source-family adapters before connecting this category to any calculation runtime.
Add one category golden fixture for each supported exact or benchmark path.
Keep unsupported paths explicit rather than filling them with generic defaults.
