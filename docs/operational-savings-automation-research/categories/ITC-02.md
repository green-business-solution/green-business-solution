# ITC-02 - Exterior lighting power and schedule

This report evaluates automation coverage without changing the approved Information Card.
The category contains 6 category-local process instances and references 3 canonical Standards.
Its current formula, tree, bindings, ownership decisions, and status remain unchanged.

## Process coverage

| Process key | Process name | Canonical Standard | Required inputs | Exact outputs | Formula terms | Source feasibility | Runtime external calls | Current blocker |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| context_benchmarks | Existing Fixture Wattage Benchmark | STD-CONTEXT-BENCHMARKS | Existing fixture type or exterior application; Exact existing wattage from a Project Document, when available | One existing input-watt value per fixture | existing_kW | PARTIALLY_FEASIBLE | 0 | DOE's 2015 U.S. Lighting Market Characterization Table 4.29 reports application-specific outdoor average system wattages. The retained source fixture records the reviewed rows and scope. The values are screening benchmarks, not project-specific nameplate values, and a category calculation golden fixture has not yet been added. |
| exact-new-fixture-watts | Exact New Fixture Wattage Lookup | STD-FEMP-EXTERIOR-LIGHTING | Exact replacement product information from the linked opportunity; Exterior lighting application | Proposed input power per fixture | proposed_kW | FEASIBLE_NOW | 0 | The official DLC data-access guide documents tokenized SSL QPL CSV downloads, and the technical requirements define model, application, light-output, efficacy, input-power, status, and version fields. No authenticated QPL extract, retained exact-product fixture, or category adapter is present, so implementation execution is not yet proved. |
| requirement-new-fixture-watts | Requirement-Based New Fixture Wattage Resolution | STD-FEMP-EXTERIOR-LIGHTING | Product requirements from the linked opportunity; Exterior lighting application; Required light output or performance criteria | Selected proposed input power per fixture | proposed_kW | FEASIBLE_NOW | 0 | The official DLC data-access guide and SSL technical requirements establish a candidate-filtering method. No retained QPL population currently proves the application, light-output, distribution, mounting, controls, active-status, and version filters or the resulting selected median wattage. |
| fixed-lighting-hours | Fixed-Schedule Lighting Hours | STD-OPERATING-SCHEDULE | Lighting hours per operating day; Operating days per week; Active weeks per year | Annual operating hours | annual_on_hours | FEASIBLE_AFTER_ADAPTER_WORK | 0 | The DOE commercial reference-building schedule context was checked. The calendar arithmetic is deterministic when all schedule inputs are supplied, but no category golden fixture exists and a business label alone is not a validated annual-hours value. |
| daylight-lighting-hours | Daylight-Based Lighting Hours | STD-OPERATING-SCHEDULE | Control type and timing offset; Site location; Analysis year | Annual daylight-based operating hours | annual_on_hours | FEASIBLE_AFTER_ADAPTER_WORK | 0 | The USNO daylight definitions and data-services interface were checked. Location-specific calculation is feasible when location, year, timezone, and control offset are supplied, but no category golden fixture exists. |
| lighting-replacement-calculation | Lighting-Replacement Calculation | STD-FEMP-EXTERIOR-LIGHTING, STD-OPERATING-SCHEDULE | Replacement fixture count; Existing fixture watts; Proposed fixture watts from the exact-product process, when used; Proposed fixture watts from the requirement-selected process, when used; Annual operating hours from the fixed-schedule process, when used; Annual operating hours from the daylight-based process, when used | Annual electricity reduction | annual_kWh | FEASIBLE_NOW, FEASIBLE_AFTER_ADAPTER_WORK | 0 | The arithmetic and unit conversion are deterministic and correspond to the displayed formula. The result is executable only when fixture count, existing watts, proposed watts, and annual operating hours have all been resolved. A category-level golden test has not yet been added, and the reviewed source gaps for those inputs remain visible in the connected processes. |

## End-to-end graph

- `context_benchmarks`: Existing fixture type or exterior application [User] + Exact existing wattage from a Project Document, when available [Project Document] -> STD-CONTEXT-BENCHMARKS -> benchmark_populations + benchmark_values + calculation_assumptions + selected_values + selected_value_provenance -> One existing input-watt value per fixture -> existing_kW (kW/fixture)
- `exact-new-fixture-watts`: Exact replacement product information from the linked opportunity [Linked Opportunity] + Exterior lighting application [Linked Opportunity] -> STD-FEMP-EXTERIOR-LIGHTING -> benchmark_values + equipment_performance_fields + calculation_assumptions -> Proposed input power per fixture -> proposed_kW (kW/fixture)
- `requirement-new-fixture-watts`: Product requirements from the linked opportunity [Linked Opportunity] + Exterior lighting application [Linked Opportunity] + Required light output or performance criteria [Linked Opportunity] -> STD-FEMP-EXTERIOR-LIGHTING -> benchmark_values + equipment_performance_fields + calculation_assumptions -> Selected proposed input power per fixture -> proposed_kW (kW/fixture)
- `fixed-lighting-hours`: Lighting hours per operating day [User] + Operating days per week [User] + Active weeks per year [User] -> STD-OPERATING-SCHEDULE -> calculation_assumptions + benchmark_values + model_input_schemas -> Annual operating hours -> annual_on_hours (hours/year)
- `daylight-lighting-hours`: Control type and timing offset [User] + Site location [Profile] + Analysis year [User] -> STD-OPERATING-SCHEDULE -> calculation_assumptions + benchmark_values + model_input_schemas -> Annual daylight-based operating hours -> annual_on_hours (hours/year)
- `lighting-replacement-calculation`: Replacement fixture count [User] + Existing fixture watts [Standard Output] + Proposed fixture watts from the exact-product process, when used [Standard Output] + Proposed fixture watts from the requirement-selected process, when used [Standard Output] + Annual operating hours from the fixed-schedule process, when used [Standard Output] + Annual operating hours from the daylight-based process, when used [Standard Output] -> STD-FEMP-EXTERIOR-LIGHTING + STD-OPERATING-SCHEDULE -> benchmark_values + equipment_performance_fields + calculation_assumptions + model_input_schemas -> Annual electricity reduction -> annual_kWh (kWh/year)

## Feasibility

The category depends on these source-level verdicts: PARTIALLY_FEASIBLE, FEASIBLE_NOW, FEASIBLE_AFTER_ADAPTER_WORK.
An exact path is feasible only when every bound Profile, Bill, Linked Opportunity, Project Document, and User input is present and every Standard adapter returns an unambiguous compatible result.
A benchmark path is feasible only where the category has a retained authoritative population and exact selection rule.
The runtime external-call count remains zero.

## Recommended next action

Implement and accept the shared source-family adapters before connecting this category to any calculation runtime.
Add one category golden fixture for each supported exact or benchmark path.
Keep unsupported paths explicit rather than filling them with generic defaults.
