# ITC-22 - Biomass or biogas resource balance

This report evaluates automation coverage without changing the approved Information Card.
The category contains 1 category-local process instance and references 1 canonical Standard.
Its current formula, tree, bindings, ownership decisions, and status remain unchanged.

## Process coverage

### Canonical process contract

| Process key | Process name | Canonical Standard | Required inputs | Exact output and formula term |
| --- | --- | --- | --- | --- |
| epa_chp_performance | Biomass or Biogas Energy System Performance Balance | STD-EPA-CHP-PERFORMANCE | Confirmed annual fuel availability, if known [User]; Fuel unit [User]; Fuel lower heating value, if known from a nameplate, measurement, audit, or contractor specification [Project Document]; Conversion technology [Linked Opportunity]; Selected Unit Model, if known [Linked Opportunity]; Installed capacity [Linked Opportunity]; Coincident onsite electric-load constraint, if known [Project Document]; Coincident useful thermal-load constraint [Project Document]; Existing Boiler Nameplate or Combustion-Test Information, if known [Project Document] | Annual electricity generation -> generation (kWh/year; PROJECT_TOTAL); Scheduled annual input fuel -> scheduled_input_fuel (resource-unit/year; PROJECT_TOTAL); Annual useful recovered heat -> useful_heat (energy/year; PROJECT_TOTAL) |

### Current execution evidence

| Process key | Execution-verified proof level | Adapter path | Actual adapter test result | Current blocker |
| --- | --- | --- | --- | --- |
| epa_chp_performance | DOCUMENTATION_ONLY | scripts/research/operational-savings/adapters/epa-chp/run.mjs | epa-biomass-chp-real-proof: PASSED; scripts/research/operational-savings/tests/epa-chp-real.test.mjs :: reaches every ITC-22 formula term from the official representative system<br>epa-biomass-native-evidence-failure-proof: PASSED; scripts/research/operational-savings/tests/epa-chp-real.test.mjs :: fails closed when the biomass table loses native evidence<br>epa-biomass-publication-proof: PASSED; scripts/research/operational-savings/tests/epa-chp-real.test.mjs :: publishes ITC-22 values with biomass-artifact provenance<br>epa-chp-offline-proof: PASSED; scripts/research/operational-savings/tests/epa-chp-real.test.mjs :: requires the offline guard | EXECUTION_RUN_RECORD_REQUIRED: The static proof declaration is not counted as executed proof until one current local content-bound run record covers every required exact test. |

## End-to-end graph

- `epa_chp_performance`: Confirmed annual fuel availability, if known [User] + Fuel unit [User] + Fuel lower heating value, if known from a nameplate, measurement, audit, or contractor specification [Project Document] + Conversion technology [Linked Opportunity] + Selected Unit Model, if known [Linked Opportunity] + Installed capacity [Linked Opportunity] + Coincident onsite electric-load constraint, if known [Project Document] + Coincident useful thermal-load constraint [Project Document] + Existing Boiler Nameplate or Combustion-Test Information, if known [Project Document] -> STD-EPA-CHP-PERFORMANCE -> equipment_performance_fields + benchmark_populations + benchmark_values + calculation_assumptions -> Annual electricity generation -> generation (kWh/year) + Scheduled annual input fuel -> scheduled_input_fuel (resource-unit/year) + Annual useful recovered heat -> useful_heat (energy/year)

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
