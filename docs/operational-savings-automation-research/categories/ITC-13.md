# ITC-13 - Ice-machine production resource intensity

This report evaluates automation coverage without changing the approved Information Card.
The category contains 3 category-local process instances and references 2 canonical Standards.
Its current formula, tree, bindings, ownership decisions, and status remain unchanged.

## Process coverage

### Canonical process contract

| Process key | Process name | Canonical Standard | Required inputs | Exact output and formula term |
| --- | --- | --- | --- | --- |
| existing-product-rating | Existing Ice Machine Rating Resolution | STD-DOE-CCMS-RATINGS, STD-ENERGY-STAR-PRODUCT-DATA | Existing ice machine type or application [User]; Existing make and model, when available [User]; Existing capacity or size class [User] | Existing electricity use per 100 pounds of ice -> kWh_per_100lb_existing (kWh/100 lb; PER_EQUIPMENT_UNIT); Existing potable water use per 100 pounds of ice -> water_gallons_per_100lb_existing (gallons/100 lb; PER_EQUIPMENT_UNIT) |
| exact-proposed-product-rating | Exact Proposed Ice Machine Rating Lookup | STD-DOE-CCMS-RATINGS, STD-ENERGY-STAR-PRODUCT-DATA | Exact proposed make and model from the linked opportunity [Linked Opportunity]; Product type and capacity [Linked Opportunity]; Applicable certified test method [Linked Opportunity] | Proposed electricity use per 100 pounds of ice -> kWh_per_100lb_proposed (kWh/100 lb; PER_EQUIPMENT_UNIT); Proposed potable water use per 100 pounds of ice -> water_gallons_per_100lb_proposed (gallons/100 lb; PER_EQUIPMENT_UNIT) |
| requirement-proposed-product-rating | Requirement-Based Proposed Ice Machine Resolution | STD-DOE-CCMS-RATINGS, STD-ENERGY-STAR-PRODUCT-DATA | Product requirements from the linked opportunity [Linked Opportunity]; Required application and capacity [Linked Opportunity]; Applicable efficiency or resource-use criteria [Linked Opportunity] | Selected proposed electricity use per 100 pounds of ice -> kWh_per_100lb_proposed (kWh/100 lb; PER_EQUIPMENT_UNIT); Selected proposed potable water use per 100 pounds of ice -> water_gallons_per_100lb_proposed (gallons/100 lb; PER_EQUIPMENT_UNIT) |

### Current execution evidence

| Process key | Execution-verified proof level | Adapter path | Actual adapter test result | Current blocker |
| --- | --- | --- | --- | --- |
| existing-product-rating | ACCESS_BLOCKED | scripts/research/operational-savings/adapters/doe-ccms/run.mjs | doe-ccms-real-access-block-proof: PASSED; scripts/research/operational-savings/tests/doe-ccms-blocked.test.mjs :: verifies the retained official CCMS 403 access boundary | REMAINING_BLOCKER: The official certification-data endpoint returned HTTP 403 and no lawful product-family export or official template has been retained. |
| exact-proposed-product-rating | ACCESS_BLOCKED | scripts/research/operational-savings/adapters/doe-ccms/run.mjs | doe-ccms-real-access-block-proof: PASSED; scripts/research/operational-savings/tests/doe-ccms-blocked.test.mjs :: verifies the retained official CCMS 403 access boundary | REMAINING_BLOCKER: The official certification-data endpoint returned HTTP 403 and no lawful product-family export or official template has been retained. |
| requirement-proposed-product-rating | ACCESS_BLOCKED | scripts/research/operational-savings/adapters/doe-ccms/run.mjs | doe-ccms-real-access-block-proof: PASSED; scripts/research/operational-savings/tests/doe-ccms-blocked.test.mjs :: verifies the retained official CCMS 403 access boundary | REMAINING_BLOCKER: The official certification-data endpoint returned HTTP 403 and no lawful product-family export or official template has been retained. |

## End-to-end graph

- `existing-product-rating`: Existing ice machine type or application [User] + Existing make and model, when available [User] + Existing capacity or size class [User] -> STD-DOE-CCMS-RATINGS + STD-ENERGY-STAR-PRODUCT-DATA -> equipment_products + equipment_certifications + equipment_performance_fields + source_releases + source_artifacts + energy_star_commercial_dishwashers + energy_star_dishwasher_operating_modes + product_taxonomy_crosswalks -> Existing electricity use per 100 pounds of ice -> kWh_per_100lb_existing (kWh/100 lb) + Existing potable water use per 100 pounds of ice -> water_gallons_per_100lb_existing (gallons/100 lb)
- `exact-proposed-product-rating`: Exact proposed make and model from the linked opportunity [Linked Opportunity] + Product type and capacity [Linked Opportunity] + Applicable certified test method [Linked Opportunity] -> STD-DOE-CCMS-RATINGS + STD-ENERGY-STAR-PRODUCT-DATA -> equipment_products + equipment_certifications + equipment_performance_fields + source_releases + source_artifacts + energy_star_commercial_dishwashers + energy_star_dishwasher_operating_modes + product_taxonomy_crosswalks -> Proposed electricity use per 100 pounds of ice -> kWh_per_100lb_proposed (kWh/100 lb) + Proposed potable water use per 100 pounds of ice -> water_gallons_per_100lb_proposed (gallons/100 lb)
- `requirement-proposed-product-rating`: Product requirements from the linked opportunity [Linked Opportunity] + Required application and capacity [Linked Opportunity] + Applicable efficiency or resource-use criteria [Linked Opportunity] -> STD-DOE-CCMS-RATINGS + STD-ENERGY-STAR-PRODUCT-DATA -> equipment_products + equipment_certifications + equipment_performance_fields + source_releases + source_artifacts + energy_star_commercial_dishwashers + energy_star_dishwasher_operating_modes + product_taxonomy_crosswalks -> Selected proposed electricity use per 100 pounds of ice -> kWh_per_100lb_proposed (kWh/100 lb) + Selected proposed potable water use per 100 pounds of ice -> water_gallons_per_100lb_proposed (gallons/100 lb)

## Feasibility

The category depends on these source-level verdicts: NOT_FEASIBLE_WITH_CURRENT_PUBLIC_SOURCES, FEASIBLE_AFTER_ADAPTER_WORK.
The process table reports the final proof level after execution-record verification, not a higher level that a manifest may have declared before the current run.
An exact path is usable only when every owned input is present and every Standard adapter returns one unambiguous compatible result.
A benchmark path is usable only where the category has a retained authoritative population and exact selection rule.
The runtime external-call count remains zero.

## Conditional next actions

| Process key | Current proof level | Next action |
| --- | --- | --- |
| existing-product-rating | ACCESS_BLOCKED | Perform the exact approved operator or access action recorded by the blocker, retain the resulting artifact, and resume at checksum and schema validation. REMAINING_BLOCKER: The official certification-data endpoint returned HTTP 403 and no lawful product-family export or official template has been retained. |
| exact-proposed-product-rating | ACCESS_BLOCKED | Perform the exact approved operator or access action recorded by the blocker, retain the resulting artifact, and resume at checksum and schema validation. REMAINING_BLOCKER: The official certification-data endpoint returned HTTP 403 and no lawful product-family export or official template has been retained. |
| requirement-proposed-product-rating | ACCESS_BLOCKED | Perform the exact approved operator or access action recorded by the blocker, retain the resulting artifact, and resume at checksum and schema validation. REMAINING_BLOCKER: The official certification-data endpoint returned HTTP 403 and no lawful product-family export or official template has been retained. |
