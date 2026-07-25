# ITC-02 - Exterior lighting power and schedule

This report evaluates automation coverage without changing the approved Information Card.
The category contains 6 category-local process instances and references 3 canonical Standards.
Its current formula, tree, bindings, ownership decisions, and status remain unchanged.

## Process coverage

### Canonical process contract

| Process key | Process name | Canonical Standard | Required inputs | Exact output and formula term |
| --- | --- | --- | --- | --- |
| context_benchmarks | Existing Fixture Wattage Benchmark | STD-CONTEXT-BENCHMARKS | Existing fixture type or exterior application [User]; Exact existing wattage from a Project Document, when available [Project Document] | One existing input-watt value per fixture -> existing_kW (kW/fixture; PER_FIXTURE) |
| exact-new-fixture-watts | Exact New Fixture Wattage Lookup | STD-FEMP-EXTERIOR-LIGHTING | Exact replacement product information from the linked opportunity [Linked Opportunity]; Exterior lighting application [Linked Opportunity] | Proposed input power per fixture -> proposed_kW (kW/fixture; PER_FIXTURE) |
| requirement-new-fixture-watts | Requirement-Based New Fixture Wattage Resolution | STD-FEMP-EXTERIOR-LIGHTING | Product requirements from the linked opportunity [Linked Opportunity]; Exterior lighting application [Linked Opportunity]; Required light output or performance criteria [Linked Opportunity] | Selected proposed input power per fixture -> proposed_kW (kW/fixture; PER_FIXTURE) |
| fixed-lighting-hours | Fixed-Schedule Lighting Hours | STD-OPERATING-SCHEDULE | Lighting hours per operating day [User]; Operating days per week [User]; Active weeks per year [User] | Annual operating hours -> annual_on_hours (hours/year; PER_YEAR) |
| daylight-lighting-hours | Daylight-Based Lighting Hours | STD-OPERATING-SCHEDULE | Control type and timing offset [User]; Site location [Profile]; Analysis year [User] | Annual daylight-based operating hours -> annual_on_hours (hours/year; PER_YEAR) |
| lighting-replacement-calculation | Lighting-Replacement Calculation | STD-FEMP-EXTERIOR-LIGHTING, STD-OPERATING-SCHEDULE | Replacement fixture count [User]; Existing fixture watts [Standard Output]; Proposed fixture watts from the exact-product process, when used [Standard Output]; Proposed fixture watts from the requirement-selected process, when used [Standard Output]; Annual operating hours from the fixed-schedule process, when used [Standard Output]; Annual operating hours from the daylight-based process, when used [Standard Output] | Annual electricity reduction -> annual_kWh (kWh/year; PROJECT_TOTAL) |

### Current execution evidence

| Process key | Execution-verified proof level | Adapter path | Actual adapter test result | Current blocker |
| --- | --- | --- | --- | --- |
| context_benchmarks | DOCUMENTATION_ONLY | scripts/research/operational-savings/adapters/context-benchmarks/run.mjs | context-doe-lighting-market-real-proof: NOT_COVERED<br>context-doe-lighting-schema-failure-proof: NOT_COVERED | EXECUTION_RUN_RECORD_REQUIRED: The static proof declaration is not counted as executed proof until one current local content-bound run record covers every required exact test. |
| exact-new-fixture-watts | DOCUMENTATION_ONLY | scripts/research/operational-savings/adapters/femp-lighting/run.mjs | femp-exterior-lighting-schema-publication-proof: NOT_COVERED<br>femp-exterior-lighting-source-boundary-proof: NOT_COVERED | EXECUTION_RUN_RECORD_REQUIRED: The static proof declaration is not counted as executed proof until one current local content-bound run record covers every required exact test. |
| requirement-new-fixture-watts | DOCUMENTATION_ONLY | scripts/research/operational-savings/adapters/femp-lighting/run.mjs | femp-exterior-lighting-checksum-mutation-proof: NOT_COVERED<br>femp-exterior-lighting-offline-proof: NOT_COVERED<br>femp-exterior-lighting-requirement-mapping-proof: NOT_COVERED<br>femp-exterior-lighting-resolution-failure-proof: NOT_COVERED<br>femp-exterior-lighting-schema-mutation-proof: NOT_COVERED<br>femp-exterior-lighting-schema-publication-proof: NOT_COVERED | EXECUTION_RUN_RECORD_REQUIRED: The static proof declaration is not counted as executed proof until one current local content-bound run record covers every required exact test. |
| fixed-lighting-hours | DOCUMENTATION_ONLY | scripts/research/operational-savings/adapters/operating-schedule/run.mjs | operating-schedule-itc02-fixed-project-input-proof: NOT_COVERED<br>operating-schedule-project-fixture-proof: NOT_COVERED | EXECUTION_RUN_RECORD_REQUIRED: The static proof declaration is not counted as executed proof until one current local content-bound run record covers every required exact test. |
| daylight-lighting-hours | DOCUMENTATION_ONLY | scripts/research/operational-savings/adapters/operating-schedule/run.mjs | operating-schedule-usno-astronomy-comparison-proof: NOT_COVERED<br>operating-schedule-usno-checksum-mutation-proof: NOT_COVERED<br>operating-schedule-usno-schema-mutation-proof: NOT_COVERED<br>operating-schedule-usno-schema-proof: NOT_COVERED | EXECUTION_RUN_RECORD_REQUIRED: The static proof declaration is not counted as executed proof until one current local content-bound run record covers every required exact test. |
| lighting-replacement-calculation | DOCUMENTATION_ONLY | scripts/research/operational-savings/adapters/femp-lighting/run.mjs | femp-exterior-lighting-resolution-failure-proof: NOT_COVERED<br>itc02-lighting-composition-real-proof: NOT_COVERED | EXECUTION_RUN_RECORD_REQUIRED: The static proof declaration is not counted as executed proof until one current local content-bound run record covers every required exact test. |

## End-to-end graph

- `context_benchmarks`: Existing fixture type or exterior application [User] + Exact existing wattage from a Project Document, when available [Project Document] -> STD-CONTEXT-BENCHMARKS -> benchmark_populations + benchmark_values + calculation_assumptions + selected_values + selected_value_provenance -> One existing input-watt value per fixture -> existing_kW (kW/fixture)
- `exact-new-fixture-watts`: Exact replacement product information from the linked opportunity [Linked Opportunity] + Exterior lighting application [Linked Opportunity] -> STD-FEMP-EXTERIOR-LIGHTING -> benchmark_values + equipment_performance_fields + calculation_assumptions -> Proposed input power per fixture -> proposed_kW (kW/fixture)
- `requirement-new-fixture-watts`: Product requirements from the linked opportunity [Linked Opportunity] + Exterior lighting application [Linked Opportunity] + Required light output or performance criteria [Linked Opportunity] -> STD-FEMP-EXTERIOR-LIGHTING -> benchmark_values + equipment_performance_fields + calculation_assumptions -> Selected proposed input power per fixture -> proposed_kW (kW/fixture)
- `fixed-lighting-hours`: Lighting hours per operating day [User] + Operating days per week [User] + Active weeks per year [User] -> STD-OPERATING-SCHEDULE -> operating_schedule_references + calculation_runs + selected_values + selected_value_provenance + calculation_source_dependencies -> Annual operating hours -> annual_on_hours (hours/year)
- `daylight-lighting-hours`: Control type and timing offset [User] + Site location [Profile] + Analysis year [User] -> STD-OPERATING-SCHEDULE -> operating_schedule_references + calculation_runs + selected_values + selected_value_provenance + calculation_source_dependencies -> Annual daylight-based operating hours -> annual_on_hours (hours/year)
- `lighting-replacement-calculation`: Replacement fixture count [User] + Existing fixture watts [Standard Output] + Proposed fixture watts from the exact-product process, when used [Standard Output] + Proposed fixture watts from the requirement-selected process, when used [Standard Output] + Annual operating hours from the fixed-schedule process, when used [Standard Output] + Annual operating hours from the daylight-based process, when used [Standard Output] -> STD-FEMP-EXTERIOR-LIGHTING + STD-OPERATING-SCHEDULE -> benchmark_values + equipment_performance_fields + calculation_assumptions + operating_schedule_references + calculation_runs + selected_values + selected_value_provenance + calculation_source_dependencies -> Annual electricity reduction -> annual_kWh (kWh/year)

## Feasibility

The category depends on these source-level verdicts: NOT_FEASIBLE_WITH_CURRENT_PUBLIC_SOURCES.
The process table reports the final proof level after execution-record verification, not a higher level that a manifest may have declared before the current run.
An exact path is usable only when every owned input is present and every Standard adapter returns one unambiguous compatible result.
A benchmark path is usable only where the category has a retained authoritative population and exact selection rule.
The runtime external-call count remains zero.

## Conditional next actions

| Process key | Current proof level | Next action |
| --- | --- | --- |
| context_benchmarks | DOCUMENTATION_ONLY | Acquire or implement the missing evidence named by the blocker, then add exact adapter tests before claiming executable coverage. EXECUTION_RUN_RECORD_REQUIRED: The static proof declaration is not counted as executed proof until one current local content-bound run record covers every required exact test. |
| exact-new-fixture-watts | DOCUMENTATION_ONLY | Acquire or implement the missing evidence named by the blocker, then add exact adapter tests before claiming executable coverage. EXECUTION_RUN_RECORD_REQUIRED: The static proof declaration is not counted as executed proof until one current local content-bound run record covers every required exact test. |
| requirement-new-fixture-watts | DOCUMENTATION_ONLY | Acquire or implement the missing evidence named by the blocker, then add exact adapter tests before claiming executable coverage. EXECUTION_RUN_RECORD_REQUIRED: The static proof declaration is not counted as executed proof until one current local content-bound run record covers every required exact test. |
| fixed-lighting-hours | DOCUMENTATION_ONLY | Acquire or implement the missing evidence named by the blocker, then add exact adapter tests before claiming executable coverage. EXECUTION_RUN_RECORD_REQUIRED: The static proof declaration is not counted as executed proof until one current local content-bound run record covers every required exact test. |
| daylight-lighting-hours | DOCUMENTATION_ONLY | Acquire or implement the missing evidence named by the blocker, then add exact adapter tests before claiming executable coverage. EXECUTION_RUN_RECORD_REQUIRED: The static proof declaration is not counted as executed proof until one current local content-bound run record covers every required exact test. |
| lighting-replacement-calculation | DOCUMENTATION_ONLY | Acquire or implement the missing evidence named by the blocker, then add exact adapter tests before claiming executable coverage. EXECUTION_RUN_RECORD_REQUIRED: The static proof declaration is not counted as executed proof until one current local content-bound run record covers every required exact test. |
