# ITC-22 - Biomass or biogas resource balance

This report evaluates automation coverage without changing the approved Information Card.
The category contains 1 category-local process instance and references 1 canonical Standard.
Its current formula, tree, bindings, ownership decisions, and status remain unchanged.

## Process coverage

| Process key | Process name | Canonical Standard | Required inputs | Exact outputs | Formula terms | Source feasibility | Runtime external calls | Current blocker |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| epa_chp_performance | Biomass or Biogas Energy System Performance Balance | STD-EPA-CHP-PERFORMANCE | Confirmed annual fuel availability, if known; Fuel unit; Fuel lower heating value, if known from a nameplate, measurement, audit, or contractor specification; Conversion technology; Selected Unit Model, if known; Installed capacity; Coincident onsite electric-load constraint, if known; Coincident useful thermal-load constraint; Existing Boiler Nameplate or Combustion-Test Information, if known | Annual electricity generation; Scheduled annual input fuel; Annual useful recovered heat | generation; scheduled_input_fuel; useful_heat | FEASIBLE_AFTER_ADAPTER_WORK | 0 | The official technology pages, efficiency method, and calculator download were checked. The category adapter and retained source fixture are still absent, and the source does not identify an exact unit or supply site capacity, schedule, or thermal coincidence. |

## End-to-end graph

- `epa_chp_performance`: Confirmed annual fuel availability, if known [User] + Fuel unit [User] + Fuel lower heating value, if known from a nameplate, measurement, audit, or contractor specification [Project Document] + Conversion technology [Linked Opportunity] + Selected Unit Model, if known [Linked Opportunity] + Installed capacity [Linked Opportunity] + Coincident onsite electric-load constraint, if known [Project Document] + Coincident useful thermal-load constraint [Project Document] + Existing Boiler Nameplate or Combustion-Test Information, if known [Project Document] -> STD-EPA-CHP-PERFORMANCE -> equipment_performance_fields + benchmark_populations + benchmark_values + calculation_assumptions -> Annual electricity generation -> generation (kWh/year) + Scheduled annual input fuel -> scheduled_input_fuel (resource-unit/year) + Annual useful recovered heat -> useful_heat (energy/year)

## Feasibility

The category depends on these source-level verdicts: FEASIBLE_AFTER_ADAPTER_WORK.
An exact path is feasible only when every bound Profile, Bill, Linked Opportunity, Project Document, and User input is present and every Standard adapter returns an unambiguous compatible result.
A benchmark path is feasible only where the category has a retained authoritative population and exact selection rule.
The runtime external-call count remains zero.

## Recommended next action

Implement and accept the shared source-family adapters before connecting this category to any calculation runtime.
Add one category golden fixture for each supported exact or benchmark path.
Keep unsupported paths explicit rather than filling them with generic defaults.
