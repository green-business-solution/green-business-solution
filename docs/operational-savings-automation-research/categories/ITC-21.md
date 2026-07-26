# ITC-21 - CHP electric and useful-heat balance

This report evaluates automation coverage without changing the approved Information Card.
The category contains 1 category-local process instance and references 1 canonical Standard.
Its current formula, tree, bindings, ownership decisions, and status remain unchanged.

## Process coverage

### Canonical process contract

| Process key | Process name | Canonical Standard | Required inputs | Exact output and formula term |
| --- | --- | --- | --- | --- |
| epa_chp_performance | Combined Heat and Power Performance Balance | STD-EPA-CHP-PERFORMANCE | Prime mover [Linked Opportunity]; Input fuel [Linked Opportunity]; Selected Unit Model, if known [Linked Opportunity]; Total installed capacity [Linked Opportunity]; Annual capacity factor [Linked Opportunity]; Coincident onsite electric-load constraint, if known [Project Document]; Coincident useful thermal-load constraint [Project Document]; Existing Boiler Nameplate or Combustion-Test Information, if known [Project Document] | Annual electricity generation -> generation (kWh/year; PROJECT_TOTAL); Annual CHP input fuel -> CHP_input_fuel (fuel-unit/year; PROJECT_TOTAL); Annual useful recovered heat -> useful_heat (energy/year; PROJECT_TOTAL) |

### Current execution evidence

| Process key | Execution-verified proof level | Adapter path | Actual adapter test result | Current blocker |
| --- | --- | --- | --- | --- |
| epa_chp_performance | DOCUMENTATION_ONLY | scripts/research/operational-savings/adapters/epa-chp/run.mjs | epa-chp-itc21-formula-proof: PASSED; scripts/research/operational-savings/tests/epa-chp-real.test.mjs :: reaches every ITC-21 formula term from one exact real system<br>epa-chp-offline-proof: PASSED; scripts/research/operational-savings/tests/epa-chp-real.test.mjs :: requires the offline guard<br>epa-chp-real-catalog-proof: PASSED; scripts/research/operational-savings/tests/epa-chp-real.test.mjs :: publishes an exact real CHP output set and provenance<br>epa-chp-required-row-failure-proof: PASSED; scripts/research/operational-savings/tests/epa-chp-real.test.mjs :: fails closed when an actual required table row is missing | EXECUTION_RUN_RECORD_REQUIRED: The static proof declaration is not counted as executed proof until one current local content-bound run record covers every required exact test. |

## End-to-end graph

- `epa_chp_performance`: Prime mover [Linked Opportunity] + Input fuel [Linked Opportunity] + Selected Unit Model, if known [Linked Opportunity] + Total installed capacity [Linked Opportunity] + Annual capacity factor [Linked Opportunity] + Coincident onsite electric-load constraint, if known [Project Document] + Coincident useful thermal-load constraint [Project Document] + Existing Boiler Nameplate or Combustion-Test Information, if known [Project Document] -> STD-EPA-CHP-PERFORMANCE -> equipment_performance_fields + benchmark_populations + benchmark_values + calculation_assumptions -> Annual electricity generation -> generation (kWh/year) + Annual CHP input fuel -> CHP_input_fuel (fuel-unit/year) + Annual useful recovered heat -> useful_heat (energy/year)

## Feasibility

The category depends on these source-level verdicts: NOT_FEASIBLE_WITH_CURRENT_PUBLIC_SOURCES.
The process table reports the final proof level after execution-record verification, not a higher level that a manifest may have declared before the current run.
An exact path is usable only when every owned input is present and every Standard adapter returns one unambiguous compatible result.
A benchmark path is usable only where the category has a retained authoritative population and exact selection rule.
The runtime external-call count remains zero.

## Conditional next actions

| Process key | Current proof level | Next action |
| --- | --- | --- |
| epa_chp_performance | DOCUMENTATION_ONLY | Acquire or implement the missing evidence named by the blocker, then add exact adapter tests before claiming executable coverage. EXECUTION_RUN_RECORD_REQUIRED: The static proof declaration is not counted as executed proof until one current local content-bound run record covers every required exact test. |
