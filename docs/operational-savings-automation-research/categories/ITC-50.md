# ITC-50 - Commercial cooking tested-duty and idle balance

This report evaluates automation coverage without changing the approved Information Card.
The category contains 3 category-local process instances and references 2 canonical Standards.
Its current formula, tree, bindings, ownership decisions, and status remain unchanged.

## Process coverage

| Process key | Process name | Canonical Standard | Required inputs | Exact outputs | Formula terms | Source feasibility | Runtime external calls | Current blocker |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| existing-product-rating | Existing Cooking Equipment Rating Resolution | STD-DOE-CCMS-RATINGS, STD-ENERGY-STAR-PRODUCT-DATA | Existing cooking equipment type or application; Existing make and model, when available; Existing capacity or size class | Existing active resource intensity; Existing idle resource rate | active_intensity_existing,r; idle_rate_existing,r | FEASIBLE_AFTER_MANUAL_SEED, FEASIBLE_NOW | 0 | The official certification access paths and native product-family fields were checked. Current efficient-product records do not represent the installed baseline. An exact documented existing model is preferred; when it is unavailable, a separately sourced context-matched installed-equipment benchmark is required. That benchmark adapter and the category golden test have not yet been added. |
| exact-proposed-product-rating | Exact Proposed Cooking Equipment Rating Lookup | STD-DOE-CCMS-RATINGS, STD-ENERGY-STAR-PRODUCT-DATA | Exact proposed make and model from the linked opportunity; Product type and capacity; Applicable certified test method | Proposed active resource intensity; Proposed idle resource rate | active_intensity_proposed,r; idle_rate_proposed,r | FEASIBLE_AFTER_MANUAL_SEED, FEASIBLE_NOW | 0 | The official certification access path and applicable cooking equipment product-family fields were checked. Exact active-model matching is technically possible, but the category-specific adapter, retained product fixture, and golden test have not yet been added. |
| requirement-proposed-product-rating | Requirement-Based Proposed Cooking Equipment Resolution | STD-DOE-CCMS-RATINGS, STD-ENERGY-STAR-PRODUCT-DATA | Product requirements from the linked opportunity; Required application and capacity; Applicable efficiency or resource-use criteria | Selected proposed active resource intensity; Selected proposed idle resource rate | active_intensity_proposed,r; idle_rate_proposed,r | FEASIBLE_AFTER_MANUAL_SEED, FEASIBLE_NOW | 0 | The official certification access path and applicable cooking equipment product-family filters were checked. Candidate-set automation is technically possible, but no retained category export proves the eligible population, filters, population size, or selected median result. |

## End-to-end graph

- `existing-product-rating`: Existing cooking equipment type or application [User] + Existing make and model, when available [User] + Existing capacity or size class [User] -> STD-DOE-CCMS-RATINGS + STD-ENERGY-STAR-PRODUCT-DATA -> equipment_products + equipment_certifications + equipment_performance_fields + source_releases + source_artifacts + product_taxonomy_crosswalks -> Existing active resource intensity -> active_intensity_existing,r (resource/certified activity) + Existing idle resource rate -> idle_rate_existing,r (resource/hour)
- `exact-proposed-product-rating`: Exact proposed make and model from the linked opportunity [Linked Opportunity] + Product type and capacity [Linked Opportunity] + Applicable certified test method [Linked Opportunity] -> STD-DOE-CCMS-RATINGS + STD-ENERGY-STAR-PRODUCT-DATA -> equipment_products + equipment_certifications + equipment_performance_fields + source_releases + source_artifacts + product_taxonomy_crosswalks -> Proposed active resource intensity -> active_intensity_proposed,r (resource/certified activity) + Proposed idle resource rate -> idle_rate_proposed,r (resource/hour)
- `requirement-proposed-product-rating`: Product requirements from the linked opportunity [Linked Opportunity] + Required application and capacity [Linked Opportunity] + Applicable efficiency or resource-use criteria [Linked Opportunity] -> STD-DOE-CCMS-RATINGS + STD-ENERGY-STAR-PRODUCT-DATA -> equipment_products + equipment_certifications + equipment_performance_fields + source_releases + source_artifacts + product_taxonomy_crosswalks -> Selected proposed active resource intensity -> active_intensity_proposed,r (resource/certified activity) + Selected proposed idle resource rate -> idle_rate_proposed,r (resource/hour)

## Feasibility

The category depends on these source-level verdicts: FEASIBLE_AFTER_MANUAL_SEED, FEASIBLE_NOW.
An exact path is feasible only when every bound Profile, Bill, Linked Opportunity, Project Document, and User input is present and every Standard adapter returns an unambiguous compatible result.
A benchmark path is feasible only where the category has a retained authoritative population and exact selection rule.
The runtime external-call count remains zero.

## Recommended next action

Implement and accept the shared source-family adapters before connecting this category to any calculation runtime.
Add one category golden fixture for each supported exact or benchmark path.
Keep unsupported paths explicit rather than filling them with generic defaults.
