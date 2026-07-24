# STD-REOPT-LOCAL-DISPATCH - REopt interval dispatch and bill optimization

## 1. RetroFi role

This Standard is used by 8 categories and 8 category-local process instances.
The categories are ITC-16, ITC-23, ITC-24, ITC-25, ITC-26, ITC-27, ITC-28, ITC-31.
The process keys are reopt_local_dispatch.
The formula terms supplied are baseline_annual_bill, baseline_grid_and_fuel_bill, managed_annual_bill, proposed_annual_bill, proposed_grid_and_fuel_bill, proposed_unmanaged_charging_bill, unmanaged_annual_bill.
The current claimed output set contains 7 distinct output descriptions.
The present automation limitation is: Incomplete tariff screens represented as detailed optimization and inferred charging or storage constraints.

| Evidence ID | Source title | Version | Status | Exact artifact |
| --- | --- | --- | --- | --- |
| E-REOPT-DISPATCH | REopt API source repository | Unpinned | UNVERIFIED | Versioned REopt input schema, solver, and result schema |

## 2. Official source inventory

The primary organization is National Laboratory of the Rockies.
The selected official source is REopt.jl.
The pinned version is 0.59.2, git commit f952cabdf3e60f6e88eef80bb7bc9e7e24bac643.
The release date or release state is 2026-05-14.
The expected update cadence is Package release based.
The license finding is Apache-2.0 with NOTICE requirements.
The legal-review requirement is Retain LICENSE and NOTICE in any distributed local package.

- https://github.com/NatLabRockies/REopt.jl
- https://natlabrockies.github.io/REopt.jl/stable/

## 3. What can actually be acquired

- Public Julia package repository
- Local Julia package execution
- Bundled SSC shared libraries
- JSON scenario inputs

| Route | Exact endpoint or source | Authentication, registration, and key | Rate limit and pagination | Observed size, format, compression, and partition | History and URL stability | Automation assessment | Research result |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Public Julia package repository | https://github.com/NatLabRockies/REopt.jl | No authentication, registration, or API key observed for this route | Not applicable to a static artifact, repository, local package, or manual export | Not separately sized; Git tree | 0.59.2, git commit f952cabdf3e60f6e88eef80bb7bc9e7e24bac643; Package release based; Commit pins are stable | Public acquisition appears automatable, subject to artifact-specific license review | Repository cloned and input structs, tariff implementation, scenario fixtures, and result fields inspected; Julia is not installed in the research environment |
| Local Julia package execution | https://github.com/NatLabRockies/REopt.jl | No authentication, registration, or API key observed for this route | Not applicable to a static artifact, repository, local package, or manual export | Not separately sized; Route-specific source structure | 0.59.2, git commit f952cabdf3e60f6e88eef80bb7bc9e7e24bac643; Package release based; Monitor URL and checksum drift | Public acquisition appears automatable, subject to artifact-specific license review | Not separately probed; retained as a documented alternative |
| Bundled SSC shared libraries | https://github.com/NatLabRockies/REopt.jl | No authentication, registration, or API key observed for this route | Not applicable to a static artifact, repository, local package, or manual export | Not separately sized; Route-specific source structure | 0.59.2, git commit f952cabdf3e60f6e88eef80bb7bc9e7e24bac643; Package release based; Monitor URL and checksum drift | Public acquisition appears automatable, subject to artifact-specific license review | Not separately probed; retained as a documented alternative |
| JSON scenario inputs | https://github.com/NatLabRockies/REopt.jl | No authentication, registration, or API key observed for this route | Not applicable to a static artifact, repository, local package, or manual export | Not separately sized; Route-specific source structure | 0.59.2, git commit f952cabdf3e60f6e88eef80bb7bc9e7e24bac643; Package release based; Monitor URL and checksum drift | Public acquisition appears automatable, subject to artifact-specific license review | Not separately probed; retained as a documented alternative |

The tested access result is: Repository cloned and input structs, tariff implementation, scenario fixtures, and result fields inspected; Julia is not installed in the research environment.
The retained inspected artifact is test/scenarios and src/core/electric_tariff.jl, Julia and JSON; source repository content is pinned by commit where applicable.
The access-cost classification is completely free.

## 4. Real source structure

The observed source-native fields or model inputs are:

- `ElectricLoad.loads_kw`
- `ElectricTariff`
- `ElectricStorage`
- `PV`
- `Wind`
- `CHP`
- `year_one_energy_cost_before_tax`
- `year_one_demand_cost_before_tax`
- `dispatch series`
- `warnings`

These names are research requirements from the source inventory, not claims about an observed source schema.
Exact source types, units, enumerations, nullability, keys, workbook coordinates, or model declarations must come from the source-specific proof manifest under `scripts/research/operational-savings/adapters/reopt-local-dispatch/`.
If no proof manifest records direct inspection evidence, this Standard remains incomplete.

Product and record sources must preserve a natural source identifier plus a release identifier as the composite natural key.
Model sources must preserve the complete input schema, package version, configuration, warnings, and output schema.
Dates remain source-native timestamps in raw snapshots and normalize to UTC timestamps or date-only effective intervals in query tables.
Enumerations remain source-native in raw storage and map through versioned crosswalk rows.
Null means unknown or not reported and must never be converted to zero.
Withdrawn, expired, superseded, and inactive records remain historically retained but are excluded from current resolution by default.
Duplicate manufacturer and model strings are normalized for search only, while the original source text remains immutable.

## 5. RetroFi field coverage

| Required RetroFi field | Process and category | Source artifact or owner | Source-native field | Transformation | Target unit | Support classification | Limitation |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Timestamped interval utility data from the uploaded utility artifact | reopt_local_dispatch; ITC-16, ITC-23, ITC-24, ITC-25, ITC-26, ITC-27, ITC-28, ITC-31 | Bill | Annual Operational Savings > Chronological Electricity Load and Tariff > Timestamped Interval Utility Data | Normalize the owned value to the process input contract without substituting another tree path. | Process-native input unit | REQUIRES_BILL | The external source cannot supply a value owned by Profile, Bill, Linked Opportunity, Project Document, or User. |
| Time zone and daylight-saving metadata from the uploaded utility artifact | reopt_local_dispatch; ITC-16, ITC-23, ITC-24, ITC-25, ITC-26, ITC-27, ITC-28, ITC-31 | Bill | Annual Operational Savings > Chronological Electricity Load and Tariff > Time Zone and Daylight-Saving Metadata from the Uploaded Utility Artifact | Normalize the owned value to the process input contract without substituting another tree path. | Process-native input unit | REQUIRES_BILL | The external source cannot supply a value owned by Profile, Bill, Linked Opportunity, Project Document, or User. |
| Resolved interval tariff input set from the connected tariff process | reopt_local_dispatch; ITC-16, ITC-23, ITC-27 | Standard Output | Annual Operational Savings > Chronological Electricity Load and Tariff > Standard 1.1 - Interval Tariff Resolution | Normalize the owned value to the process input contract without substituting another tree path. | Process-native input unit | DERIVABLE_FROM_SOURCE | The external source cannot supply a value owned by Profile, Bill, Linked Opportunity, Project Document, or User. |
| Controllable-load definition from a Project Document | reopt_local_dispatch; ITC-16 | Project Document | Annual Operational Savings > Demand-Response Event Inputs > Controllable-Load Definition from Audit, Controls Trend, or Engineering Study | Normalize the owned value to the process input contract without substituting another tree path. | Process-native input unit | REQUIRES_PROJECT_DOCUMENT | The external source cannot supply a value owned by Profile, Bill, Linked Opportunity, Project Document, or User. |
| Controllable-load definition from the connected context benchmark | reopt_local_dispatch; ITC-16 | Standard Output | Annual Operational Savings > Demand-Response Event Inputs > Standard 1.2 - Demand-Response Event Behavior Benchmark | Normalize the owned value to the process input contract without substituting another tree path. | Process-native input unit | DERIVABLE_FROM_SOURCE | The external source cannot supply a value owned by Profile, Bill, Linked Opportunity, Project Document, or User. |
| Maximum shed from a Project Document | reopt_local_dispatch; ITC-16 | Project Document | Annual Operational Savings > Demand-Response Event Inputs > Maximum Shed from Audit, Controls Trend, or Engineering Study | Normalize the owned value to the process input contract without substituting another tree path. | Process-native input unit | REQUIRES_PROJECT_DOCUMENT | The external source cannot supply a value owned by Profile, Bill, Linked Opportunity, Project Document, or User. |
| Maximum shed restrictions from the linked opportunity | reopt_local_dispatch; ITC-16 | Linked Opportunity | Annual Operational Savings > Demand-Response Event Inputs > Opportunity Event and Maximum-Shed Restrictions | Normalize the owned value to the process input contract without substituting another tree path. | Process-native input unit | REQUIRES_LINKED_OPPORTUNITY | The external source cannot supply a value owned by Profile, Bill, Linked Opportunity, Project Document, or User. |
| Maximum shed from the connected context benchmark | reopt_local_dispatch; ITC-16 | Standard Output | Annual Operational Savings > Demand-Response Event Inputs > Standard 1.2 - Demand-Response Event Behavior Benchmark | Normalize the owned value to the process input contract without substituting another tree path. | Process-native input unit | DERIVABLE_FROM_SOURCE | The external source cannot supply a value owned by Profile, Bill, Linked Opportunity, Project Document, or User. |
| Event-availability schedule from a Project Document | reopt_local_dispatch; ITC-16 | Project Document | Annual Operational Savings > Demand-Response Event Inputs > Event-Availability Schedule from Audit, Controls Trend, or Engineering Study | Normalize the owned value to the process input contract without substituting another tree path. | Process-native input unit | REQUIRES_PROJECT_DOCUMENT | The external source cannot supply a value owned by Profile, Bill, Linked Opportunity, Project Document, or User. |
| Event restrictions from the linked opportunity | reopt_local_dispatch; ITC-16 | Linked Opportunity | Annual Operational Savings > Demand-Response Event Inputs > Opportunity Event and Maximum-Shed Restrictions | Normalize the owned value to the process input contract without substituting another tree path. | Process-native input unit | REQUIRES_LINKED_OPPORTUNITY | The external source cannot supply a value owned by Profile, Bill, Linked Opportunity, Project Document, or User. |
| Event-availability schedule from the connected context benchmark | reopt_local_dispatch; ITC-16 | Standard Output | Annual Operational Savings > Demand-Response Event Inputs > Standard 1.2 - Demand-Response Event Behavior Benchmark | Normalize the owned value to the process input contract without substituting another tree path. | Process-native input unit | DERIVABLE_FROM_SOURCE | The external source cannot supply a value owned by Profile, Bill, Linked Opportunity, Project Document, or User. |
| Maximum event duration from a Project Document | reopt_local_dispatch; ITC-16 | Project Document | Annual Operational Savings > Demand-Response Event Inputs > Maximum Event Duration from Audit, Controls Trend, or Engineering Study | Normalize the owned value to the process input contract without substituting another tree path. | Process-native input unit | REQUIRES_PROJECT_DOCUMENT | The external source cannot supply a value owned by Profile, Bill, Linked Opportunity, Project Document, or User. |
| Maximum event duration restrictions from the linked opportunity | reopt_local_dispatch; ITC-16 | Linked Opportunity | Annual Operational Savings > Demand-Response Event Inputs > Opportunity Event and Maximum-Shed Restrictions | Normalize the owned value to the process input contract without substituting another tree path. | Process-native input unit | REQUIRES_LINKED_OPPORTUNITY | The external source cannot supply a value owned by Profile, Bill, Linked Opportunity, Project Document, or User. |
| Maximum event duration from the connected context benchmark | reopt_local_dispatch; ITC-16 | Standard Output | Annual Operational Savings > Demand-Response Event Inputs > Standard 1.2 - Demand-Response Event Behavior Benchmark | Normalize the owned value to the process input contract without substituting another tree path. | Process-native input unit | DERIVABLE_FROM_SOURCE | The external source cannot supply a value owned by Profile, Bill, Linked Opportunity, Project Document, or User. |
| Rebound or recovery constraint from a Project Document | reopt_local_dispatch; ITC-16 | Project Document | Annual Operational Savings > Demand-Response Event Inputs > Rebound or Recovery Constraint from Audit, Controls Trend, or Engineering Study | Normalize the owned value to the process input contract without substituting another tree path. | Process-native input unit | REQUIRES_PROJECT_DOCUMENT | The external source cannot supply a value owned by Profile, Bill, Linked Opportunity, Project Document, or User. |
| Rebound or recovery profile from the connected context benchmark | reopt_local_dispatch; ITC-16 | Standard Output | Annual Operational Savings > Demand-Response Event Inputs > Standard 1.2 - Demand-Response Event Behavior Benchmark | Normalize the owned value to the process input contract without substituting another tree path. | Process-native input unit | DERIVABLE_FROM_SOURCE | The external source cannot supply a value owned by Profile, Bill, Linked Opportunity, Project Document, or User. |
| Power capacity | reopt_local_dispatch; ITC-23, ITC-24, ITC-26 | Linked Opportunity | Annual Operational Savings > Battery Design and Operating Constraints > Opportunity-Prescribed Battery Design > Power Capacity | Normalize the owned value to the process input contract without substituting another tree path. | Process-native input unit | REQUIRES_LINKED_OPPORTUNITY | The external source cannot supply a value owned by Profile, Bill, Linked Opportunity, Project Document, or User. |
| Usable-energy capacity | reopt_local_dispatch; ITC-23, ITC-24, ITC-26 | Linked Opportunity | Annual Operational Savings > Battery Design and Operating Constraints > Opportunity-Prescribed Battery Design > Usable-Energy Capacity | Normalize the owned value to the process input contract without substituting another tree path. | Process-native input unit | REQUIRES_LINKED_OPPORTUNITY | The external source cannot supply a value owned by Profile, Bill, Linked Opportunity, Project Document, or User. |
| Charge efficiency from a nameplate, measurement, audit, or contractor specification | reopt_local_dispatch; ITC-23 | Project Document | Annual Operational Savings > Battery Design and Operating Constraints > Contractor or Engineering Battery Design | Normalize the owned value to the process input contract without substituting another tree path. | Process-native input unit | REQUIRES_PROJECT_DOCUMENT | The external source cannot supply a value owned by Profile, Bill, Linked Opportunity, Project Document, or User. |
| Discharge efficiency from a nameplate, measurement, audit, or contractor specification | reopt_local_dispatch; ITC-23 | Project Document | Annual Operational Savings > Battery Design and Operating Constraints > Contractor or Engineering Battery Design | Normalize the owned value to the process input contract without substituting another tree path. | Process-native input unit | REQUIRES_PROJECT_DOCUMENT | The external source cannot supply a value owned by Profile, Bill, Linked Opportunity, Project Document, or User. |
| Initial state of charge | reopt_local_dispatch; ITC-23, ITC-24, ITC-26 | Linked Opportunity | Annual Operational Savings > Battery Design and Operating Constraints > Opportunity-Prescribed Battery Design > Initial State of Charge | Normalize the owned value to the process input contract without substituting another tree path. | Process-native input unit | REQUIRES_LINKED_OPPORTUNITY | The external source cannot supply a value owned by Profile, Bill, Linked Opportunity, Project Document, or User. |
| Terminal state-of-charge constraint from the linked opportunity | reopt_local_dispatch; ITC-23 | Linked Opportunity | Annual Operational Savings > Battery Design and Operating Constraints > Opportunity-Prescribed Battery Design > Terminal State-of-Charge Constraint | Normalize the owned value to the process input contract without substituting another tree path. | Process-native input unit | REQUIRES_LINKED_OPPORTUNITY | The external source cannot supply a value owned by Profile, Bill, Linked Opportunity, Project Document, or User. |
| Terminal state-of-charge constraint from a Project Document | reopt_local_dispatch; ITC-23 | Project Document | Annual Operational Savings > Battery Design and Operating Constraints > Contractor or Engineering Battery Design | Normalize the owned value to the process input contract without substituting another tree path. | Process-native input unit | REQUIRES_PROJECT_DOCUMENT | The external source cannot supply a value owned by Profile, Bill, Linked Opportunity, Project Document, or User. |
| Terminal state-of-charge constraint from the connected context benchmark | reopt_local_dispatch; ITC-23 | Standard Output | Annual Operational Savings > Battery Design and Operating Constraints > Standard 1.2 - Battery Dispatch Boundary Benchmark | Normalize the owned value to the process input contract without substituting another tree path. | Process-native input unit | DERIVABLE_FROM_SOURCE | The external source cannot supply a value owned by Profile, Bill, Linked Opportunity, Project Document, or User. |
| Dispatch-availability schedule | reopt_local_dispatch; ITC-23 | Linked Opportunity | Annual Operational Savings > Battery Design and Operating Constraints > Opportunity-Prescribed Battery Design > Dispatch-Availability Schedule | Normalize the owned value to the process input contract without substituting another tree path. | Process-native input unit | REQUIRES_LINKED_OPPORTUNITY | The external source cannot supply a value owned by Profile, Bill, Linked Opportunity, Project Document, or User. |
| Reserve constraint | reopt_local_dispatch; ITC-23, ITC-24, ITC-26 | Linked Opportunity | Annual Operational Savings > Battery Design and Operating Constraints > Opportunity-Prescribed Battery Design > Reserve Constraint | Normalize the owned value to the process input contract without substituting another tree path. | Process-native input unit | REQUIRES_LINKED_OPPORTUNITY | The external source cannot supply a value owned by Profile, Bill, Linked Opportunity, Project Document, or User. |
| Charge efficiency prescribed by the linked opportunity | reopt_local_dispatch; ITC-24, ITC-25, ITC-26 | Linked Opportunity | Annual Operational Savings > Battery configuration > Charge efficiency | Normalize the owned value to the process input contract without substituting another tree path. | Process-native input unit | REQUIRES_LINKED_OPPORTUNITY | The external source cannot supply a value owned by Profile, Bill, Linked Opportunity, Project Document, or User. |
| Discharge efficiency prescribed by the linked opportunity | reopt_local_dispatch; ITC-24, ITC-25, ITC-26 | Linked Opportunity | Annual Operational Savings > Battery configuration > Discharge efficiency | Normalize the owned value to the process input contract without substituting another tree path. | Process-native input unit | REQUIRES_LINKED_OPPORTUNITY | The external source cannot supply a value owned by Profile, Bill, Linked Opportunity, Project Document, or User. |
| Interval solar generation from the connected PVWatts process | reopt_local_dispatch; ITC-24, ITC-26 | Standard Output | Annual Operational Savings > Standard 1.1 - PVWatts Solar Production Calculation | Normalize the owned value to the process input contract without substituting another tree path. | Process-native input unit | DERIVABLE_FROM_SOURCE | The external source cannot supply a value owned by Profile, Bill, Linked Opportunity, Project Document, or User. |
| Thermal capacity | reopt_local_dispatch; ITC-25 | Linked Opportunity | Annual Operational Savings > Thermal capacity | Normalize the owned value to the process input contract without substituting another tree path. | Process-native input unit | REQUIRES_LINKED_OPPORTUNITY | The external source cannot supply a value owned by Profile, Bill, Linked Opportunity, Project Document, or User. |
| Charge limit | reopt_local_dispatch; ITC-25 | Linked Opportunity | Annual Operational Savings > Charge limit | Normalize the owned value to the process input contract without substituting another tree path. | Process-native input unit | REQUIRES_LINKED_OPPORTUNITY | The external source cannot supply a value owned by Profile, Bill, Linked Opportunity, Project Document, or User. |
| Discharge limit | reopt_local_dispatch; ITC-25 | Linked Opportunity | Annual Operational Savings > Discharge limit | Normalize the owned value to the process input contract without substituting another tree path. | Process-native input unit | REQUIRES_LINKED_OPPORTUNITY | The external source cannot supply a value owned by Profile, Bill, Linked Opportunity, Project Document, or User. |
| Standing loss | reopt_local_dispatch; ITC-25 | Linked Opportunity | Annual Operational Savings > Standing loss | Normalize the owned value to the process input contract without substituting another tree path. | Process-native input unit | REQUIRES_LINKED_OPPORTUNITY | The external source cannot supply a value owned by Profile, Bill, Linked Opportunity, Project Document, or User. |
| Initial Thermal State | reopt_local_dispatch; ITC-25 | Linked Opportunity | Annual Operational Savings > Initial Thermal State | Normalize the owned value to the process input contract without substituting another tree path. | Process-native input unit | REQUIRES_LINKED_OPPORTUNITY | The external source cannot supply a value owned by Profile, Bill, Linked Opportunity, Project Document, or User. |
| Terminal thermal-state constraint | reopt_local_dispatch; ITC-25 | Linked Opportunity | Annual Operational Savings > Terminal thermal-state constraint | Normalize the owned value to the process input contract without substituting another tree path. | Process-native input unit | REQUIRES_LINKED_OPPORTUNITY | The external source cannot supply a value owned by Profile, Bill, Linked Opportunity, Project Document, or User. |
| Included component types | reopt_local_dispatch; ITC-26 | User | Annual Operational Savings > Included component types | Normalize the owned value to the process input contract without substituting another tree path. | Process-native input unit | REQUIRES_USER | The external source cannot supply a value owned by Profile, Bill, Linked Opportunity, Project Document, or User. |
| Annual operating profile | reopt_local_dispatch; ITC-26 | Linked Opportunity | Annual Operational Savings > Component site and operating inputs > Fuel-cell or CHP configuration when fuel generation is included > Annual operating profile | Normalize the owned value to the process input contract without substituting another tree path. | Process-native input unit | REQUIRES_LINKED_OPPORTUNITY | The external source cannot supply a value owned by Profile, Bill, Linked Opportunity, Project Document, or User. |
| Interval wind generation from the connected wind process | reopt_local_dispatch; ITC-26 | Standard Output | Annual Operational Savings > PV or wind interval generation when included > Standard 1.3 - Small Wind Production Simulation | Normalize the owned value to the process input contract without substituting another tree path. | Process-native input unit | DERIVABLE_FROM_SOURCE | The external source cannot supply a value owned by Profile, Bill, Linked Opportunity, Project Document, or User. |
| Annual generation, input fuel, and useful recovered heat from the connected onsite-generation process | reopt_local_dispatch; ITC-26 | Standard Output | Annual Operational Savings > Standard 1.4 - Microgrid System Performance Balance | Normalize the owned value to the process input contract without substituting another tree path. | Process-native input unit | DERIVABLE_FROM_SOURCE | The external source cannot supply a value owned by Profile, Bill, Linked Opportunity, Project Document, or User. |
| Installed charger count | reopt_local_dispatch; ITC-27 | User | Annual Operational Cost Impact > Installed Charger Count | Normalize the owned value to the process input contract without substituting another tree path. | Process-native input unit | REQUIRES_USER | The external source cannot supply a value owned by Profile, Bill, Linked Opportunity, Project Document, or User. |
| Public operating hours | reopt_local_dispatch; ITC-27 | User | Annual Operational Cost Impact > Public Operating Hours | Normalize the owned value to the process input contract without substituting another tree path. | Process-native input unit | REQUIRES_USER | The external source cannot supply a value owned by Profile, Bill, Linked Opportunity, Project Document, or User. |
| Site daily delivered charging energy from the connected exact project resolver | reopt_local_dispatch; ITC-27 | Standard Output | Annual Operational Cost Impact > Site Daily Delivered Energy > Standard 1.2 - Site Daily Delivered-Energy Resolution | Normalize the owned value to the process input contract without substituting another tree path. | Process-native input unit | DERIVABLE_FROM_SOURCE | The external source cannot supply a value owned by Profile, Bill, Linked Opportunity, Project Document, or User. |
| Normalized weekday and weekend 15-minute shape from the connected EVI-Pro resolver | reopt_local_dispatch; ITC-27 | Standard Output | Annual Operational Cost Impact > Normalized Time-of-Day Charging Shape > Standard 1.3 - EVI-Pro Normalized Charging-Shape Resolution | Normalize the owned value to the process input contract without substituting another tree path. | Process-native input unit | DERIVABLE_FROM_SOURCE | The external source cannot supply a value owned by Profile, Bill, Linked Opportunity, Project Document, or User. |
| Resolved native AC-output or DC-output charger fields from the connected exact charger process, when used | reopt_local_dispatch; ITC-27 | Standard Output | Annual Operational Cost Impact > Charger Performance > Linked Opportunity names an exact charger > Standard 1.4 - Exact Charger Rating Lookup | Normalize the owned value to the process input contract without substituting another tree path. | Process-native input unit | DERIVABLE_FROM_SOURCE | The external source cannot supply a value owned by Profile, Bill, Linked Opportunity, Project Document, or User. |
| Resolved native AC-output or DC-output charger fields from the connected requirement-selected charger process, when used | reopt_local_dispatch; ITC-27 | Standard Output | Annual Operational Cost Impact > Charger Performance > Linked Opportunity specifies charger requirements but no exact product > Standard 1.5 - Requirement-Based Charger Resolution | Normalize the owned value to the process input contract without substituting another tree path. | Process-native input unit | DERIVABLE_FROM_SOURCE | The external source cannot supply a value owned by Profile, Bill, Linked Opportunity, Project Document, or User. |
| Annual fleet miles | reopt_local_dispatch; ITC-28 | User | Annual Operational Cost Impact > Annual fleet miles | Normalize the owned value to the process input contract without substituting another tree path. | Process-native input unit | REQUIRES_USER | The external source cannot supply a value owned by Profile, Bill, Linked Opportunity, Project Document, or User. |
| Depot allocation fraction | reopt_local_dispatch; ITC-28 | Project Document | Annual Operational Cost Impact > Documented Depot Allocation Fraction from Fleet Study or Contractor Design | Normalize the owned value to the process input contract without substituting another tree path. | Process-native input unit | REQUIRES_PROJECT_DOCUMENT | The external source cannot supply a value owned by Profile, Bill, Linked Opportunity, Project Document, or User. |
| Vehicle Class and Service Need | reopt_local_dispatch; ITC-28 | User | Annual Operational Cost Impact > Vehicle Class and Service Need | Normalize the owned value to the process input contract without substituting another tree path. | Process-native input unit | REQUIRES_USER | The external source cannot supply a value owned by Profile, Bill, Linked Opportunity, Project Document, or User. |
| Measured kWh per Mile from the fleet study or contractor charging design | reopt_local_dispatch; ITC-28 | Project Document | Annual Operational Cost Impact > Vehicle Electricity Intensity > Measured Kilowatt-Hours per Mile from Fleet Study or Contractor Charging Design | Normalize the owned value to the process input contract without substituting another tree path. | Process-native input unit | REQUIRES_PROJECT_DOCUMENT | The external source cannot supply a value owned by Profile, Bill, Linked Opportunity, Project Document, or User. |
| Vehicle-arrival schedule from the fleet study or contractor charging design | reopt_local_dispatch; ITC-28 | Project Document | Annual Operational Cost Impact > Fleet Charging Activity > Vehicle-Arrival Schedule from Fleet Study or Contractor Charging Design | Normalize the owned value to the process input contract without substituting another tree path. | Process-native input unit | REQUIRES_PROJECT_DOCUMENT | The external source cannot supply a value owned by Profile, Bill, Linked Opportunity, Project Document, or User. |
| Vehicle-departure schedule from the fleet study or contractor charging design | reopt_local_dispatch; ITC-28 | Project Document | Annual Operational Cost Impact > Fleet Charging Activity > Vehicle-Departure Schedule from Fleet Study or Contractor Charging Design | Normalize the owned value to the process input contract without substituting another tree path. | Process-native input unit | REQUIRES_PROJECT_DOCUMENT | The external source cannot supply a value owned by Profile, Bill, Linked Opportunity, Project Document, or User. |
| Uncontrolled charging rule from the fleet study or contractor charging design | reopt_local_dispatch; ITC-28 | Project Document | Annual Operational Cost Impact > Fleet Charging Activity > Uncontrolled Charging Rule from Fleet Study or Contractor Charging Design | Normalize the owned value to the process input contract without substituting another tree path. | Process-native input unit | REQUIRES_PROJECT_DOCUMENT | The external source cannot supply a value owned by Profile, Bill, Linked Opportunity, Project Document, or User. |
| Installed port count | reopt_local_dispatch; ITC-28 | Linked Opportunity | Annual Operational Cost Impact > Installed Port Count | Normalize the owned value to the process input contract without substituting another tree path. | Process-native input unit | REQUIRES_LINKED_OPPORTUNITY | The external source cannot supply a value owned by Profile, Bill, Linked Opportunity, Project Document, or User. |
| Resolved vehicle electricity intensity from the connected vehicle process | reopt_local_dispatch; ITC-28 | Standard Output | Annual Operational Cost Impact > Vehicle Electricity Intensity > Standard 1.2 - Vehicle Electricity-Intensity Resolution | Normalize the owned value to the process input contract without substituting another tree path. | Process-native input unit | DERIVABLE_FROM_SOURCE | The external source cannot supply a value owned by Profile, Bill, Linked Opportunity, Project Document, or User. |
| Resolved charger efficiency, standby power, and rated capacity from the connected exact charger process, when used | reopt_local_dispatch; ITC-28 | Standard Output | Annual Operational Cost Impact > Charger Performance > Linked Opportunity names an exact charger > Standard 1.4 - Exact Charger Rating Lookup | Normalize the owned value to the process input contract without substituting another tree path. | Process-native input unit | DERIVABLE_FROM_SOURCE | The external source cannot supply a value owned by Profile, Bill, Linked Opportunity, Project Document, or User. |
| Resolved charger efficiency, standby power, and rated capacity from the connected requirement-selected charger process, when used | reopt_local_dispatch; ITC-28 | Standard Output | Annual Operational Cost Impact > Charger Performance > Linked Opportunity specifies charger requirements but no exact product > Standard 1.5 - Requirement-Based Charger Resolution | Normalize the owned value to the process input contract without substituting another tree path. | Process-native input unit | DERIVABLE_FROM_SOURCE | The external source cannot supply a value owned by Profile, Bill, Linked Opportunity, Project Document, or User. |
| Vehicle-arrival schedule | reopt_local_dispatch; ITC-31 | Project Document | Annual Operational Savings > Documented Vehicle-arrival schedule from Submeter, Controls Trend, Audit, or Contractor Specification | Normalize the owned value to the process input contract without substituting another tree path. | Process-native input unit | REQUIRES_PROJECT_DOCUMENT | The external source cannot supply a value owned by Profile, Bill, Linked Opportunity, Project Document, or User. |
| Vehicle-departure schedule | reopt_local_dispatch; ITC-31 | Project Document | Annual Operational Savings > Documented Vehicle-departure schedule from Submeter, Controls Trend, Audit, or Contractor Specification | Normalize the owned value to the process input contract without substituting another tree path. | Process-native input unit | REQUIRES_PROJECT_DOCUMENT | The external source cannot supply a value owned by Profile, Bill, Linked Opportunity, Project Document, or User. |
| Required energy by departure | reopt_local_dispatch; ITC-31 | Project Document | Annual Operational Savings > Documented Required energy by departure from Submeter, Controls Trend, Audit, or Contractor Specification | Normalize the owned value to the process input contract without substituting another tree path. | Process-native input unit | REQUIRES_PROJECT_DOCUMENT | The external source cannot supply a value owned by Profile, Bill, Linked Opportunity, Project Document, or User. |
| Charger power limit | reopt_local_dispatch; ITC-31 | Project Document | Annual Operational Savings > Documented Charger power limit from Nameplate, Measurement, Audit, or Contractor Specification | Normalize the owned value to the process input contract without substituting another tree path. | Process-native input unit | REQUIRES_PROJECT_DOCUMENT | The external source cannot supply a value owned by Profile, Bill, Linked Opportunity, Project Document, or User. |
| Site power limit | reopt_local_dispatch; ITC-31 | Project Document | Annual Operational Savings > Documented Site power limit from Nameplate, Measurement, Audit, or Contractor Specification | Normalize the owned value to the process input contract without substituting another tree path. | Process-native input unit | REQUIRES_PROJECT_DOCUMENT | The external source cannot supply a value owned by Profile, Bill, Linked Opportunity, Project Document, or User. |
| Managed charging template | reopt_local_dispatch; ITC-31 | Project Document | Annual Operational Savings > Documented Managed charging template from Submeter, Controls Trend, Audit, or Contractor Specification | Normalize the owned value to the process input contract without substituting another tree path. | Process-native input unit | REQUIRES_PROJECT_DOCUMENT | The external source cannot supply a value owned by Profile, Bill, Linked Opportunity, Project Document, or User. |
| Unmanaged charging template | reopt_local_dispatch; ITC-31 | Project Document | Annual Operational Savings > Documented Unmanaged charging template from Submeter, Controls Trend, Audit, or Contractor Specification | Normalize the owned value to the process input contract without substituting another tree path. | Process-native input unit | REQUIRES_PROJECT_DOCUMENT | The external source cannot supply a value owned by Profile, Bill, Linked Opportunity, Project Document, or User. |
| Baseline annual bill | reopt_local_dispatch; ITC-16, ITC-23, ITC-24, ITC-25, ITC-27, ITC-28 | test/scenarios and src/core/electric_tariff.jl | ElectricLoad.loads_kw; ElectricTariff; ElectricStorage; PV; Wind; CHP; year_one_energy_cost_before_tax; year_one_demand_cost_before_tax; dispatch series; warnings | annual_savings_usd = baseline_annual_bill_usd - proposed_annual_bill_usd; all bill components must come from the same pinned tariff and time basis | USD/year | DERIVABLE_FROM_SOURCE | Incomplete tariff screens represented as detailed optimization and inferred charging or storage constraints |
| Proposed annual bill | reopt_local_dispatch; ITC-16, ITC-23, ITC-24, ITC-25, ITC-27 | test/scenarios and src/core/electric_tariff.jl | ElectricLoad.loads_kw; ElectricTariff; ElectricStorage; PV; Wind; CHP; year_one_energy_cost_before_tax; year_one_demand_cost_before_tax; dispatch series; warnings | annual_savings_usd = baseline_annual_bill_usd - proposed_annual_bill_usd; all bill components must come from the same pinned tariff and time basis | USD/year | DERIVABLE_FROM_SOURCE | Incomplete tariff screens represented as detailed optimization and inferred charging or storage constraints |
| Baseline annual grid and fuel bill | reopt_local_dispatch; ITC-26 | test/scenarios and src/core/electric_tariff.jl | ElectricLoad.loads_kw; ElectricTariff; ElectricStorage; PV; Wind; CHP; year_one_energy_cost_before_tax; year_one_demand_cost_before_tax; dispatch series; warnings | annual_savings_usd = baseline_annual_bill_usd - proposed_annual_bill_usd; all bill components must come from the same pinned tariff and time basis | USD/year | DERIVABLE_FROM_SOURCE | Incomplete tariff screens represented as detailed optimization and inferred charging or storage constraints |
| Proposed annual grid and fuel bill | reopt_local_dispatch; ITC-26 | test/scenarios and src/core/electric_tariff.jl | ElectricLoad.loads_kw; ElectricTariff; ElectricStorage; PV; Wind; CHP; year_one_energy_cost_before_tax; year_one_demand_cost_before_tax; dispatch series; warnings | annual_savings_usd = baseline_annual_bill_usd - proposed_annual_bill_usd; all bill components must come from the same pinned tariff and time basis | USD/year | DERIVABLE_FROM_SOURCE | Incomplete tariff screens represented as detailed optimization and inferred charging or storage constraints |
| Proposed unmanaged-charging annual bill | reopt_local_dispatch; ITC-28 | test/scenarios and src/core/electric_tariff.jl | ElectricLoad.loads_kw; ElectricTariff; ElectricStorage; PV; Wind; CHP; year_one_energy_cost_before_tax; year_one_demand_cost_before_tax; dispatch series; warnings | annual_savings_usd = baseline_annual_bill_usd - proposed_annual_bill_usd; all bill components must come from the same pinned tariff and time basis | USD/year | DERIVABLE_FROM_SOURCE | Incomplete tariff screens represented as detailed optimization and inferred charging or storage constraints |
| Unmanaged annual bill | reopt_local_dispatch; ITC-31 | test/scenarios and src/core/electric_tariff.jl | ElectricLoad.loads_kw; ElectricTariff; ElectricStorage; PV; Wind; CHP; year_one_energy_cost_before_tax; year_one_demand_cost_before_tax; dispatch series; warnings | annual_savings_usd = baseline_annual_bill_usd - proposed_annual_bill_usd; all bill components must come from the same pinned tariff and time basis | USD/year | DERIVABLE_FROM_SOURCE | Incomplete tariff screens represented as detailed optimization and inferred charging or storage constraints |
| Managed annual bill | reopt_local_dispatch; ITC-31 | test/scenarios and src/core/electric_tariff.jl | ElectricLoad.loads_kw; ElectricTariff; ElectricStorage; PV; Wind; CHP; year_one_energy_cost_before_tax; year_one_demand_cost_before_tax; dispatch series; warnings | annual_savings_usd = baseline_annual_bill_usd - proposed_annual_bill_usd; all bill components must come from the same pinned tariff and time basis | USD/year | DERIVABLE_FROM_SOURCE | Incomplete tariff screens represented as detailed optimization and inferred charging or storage constraints |

For every `DERIVABLE_FROM_SOURCE` row, the governing derivation is: annual_savings_usd = baseline_annual_bill_usd - proposed_annual_bill_usd; all bill components must come from the same pinned tariff and time basis.
No field owned by Profile, Bill, Linked Opportunity, Project Document, or User is silently replaced with a source default.

## 6. Acquisition workflow

```text
REopt.jl
-> Public Julia package repository
-> immutable raw snapshot
-> SHA-256 checksum and media-type validation
-> schema and enumeration validation
-> source-specific normalization and deduplication
-> model_versions + model_input_schemas + calculation_runs + calculation_warnings + selected_value_provenance
-> deterministic reopt-local-dispatch adapter
-> typed formula input
-> calculation result with provenance
```

Acquisition runs under a scheduler or operator action and never during a customer estimate.
A failed checksum, schema drift, or incomplete artifact leaves the prior published release active.

## 7. Internal database schema

The intended normalized targets are model_versions, model_input_schemas, calculation_runs, calculation_warnings, selected_value_provenance.
Implementation evidence must come from executed migrations and populated table counts in the committed compact proof export.
No generic per-Standard JSON payload table is claimed as an implemented source schema.
Each source-specific adapter must publish typed columns derived from its inspected native structure or remain incomplete.

## 8. Exact resolution

Identifiers are Unicode-normalized, trimmed, case-folded for search, and compared with punctuation-insensitive aliases only after exact original matching fails.
Manufacturer aliases and model aliases are versioned rows, never destructive edits.
Equipment class, capacity, geography, effective date, active status, source version, and test procedure are mandatory filters whenever the source exposes them.
An exact path must return one compatible active record.
Zero records returns a typed unavailable result.
Multiple compatible records return an ambiguity error unless the source defines a deterministic edition or submodel key.
The original identifier, matched alias, filters, and rejected candidates remain in provenance.

## 9. Requirements-based resolution

Mandatory filters are the category's explicit equipment class, performance requirement, capacity boundary, geography, date, active status, test-procedure version, and source release.
The eligible population contains only records satisfying every mandatory filter.
Inactive, withdrawn, superseded, incompatible-unit, missing-required-field, and cross-test-procedure records are excluded.
The source release is never mixed with another release inside one population.
A single eligible record may be selected directly.
Multiple eligible records use an official recommended value only when the source defines one, then a weighted median only when a defensible source weight exists, then an ordinary median only for a true scalar benchmark population.
Structured records and model result sets are never median-selected.

## 10. Benchmark resolution

The benchmark population must be authoritative, category-specific, unit-compatible, and filtered to the same context dimensions used by the formula.
The minimum sample size is five unless an official source explicitly publishes one typical value or a category-specific report approves a different threshold.
The weighting field must come from the source and is never inferred from record order.
The weighted median is the first value whose cumulative positive weight reaches at least half of total eligible weight after sorting by value.
The ordinary median is permitted only when no defensible weight exists and the population is an exchangeable scalar population.
The selected value retains filters, population size, sample size, method, fallback level, and uncertainty.
The unsupported boundary is Incomplete tariff screens represented as detailed optimization and inferred charging or storage constraints.

## 11. Calculation or local-model execution

The exact output contract contains: Baseline annual bill; Proposed annual bill; Baseline annual grid and fuel bill; Proposed annual grid and fuel bill; Proposed unmanaged-charging annual bill; Unmanaged annual bill; Managed annual bill.
The governing source equation or transformation is annual_savings_usd = baseline_annual_bill_usd - proposed_annual_bill_usd; all bill components must come from the same pinned tariff and time basis.
The local execution mode is Pinned local Julia service or compiled worker with no hosted REopt API dependency.
Inputs are rejected for missing required fields, incompatible units, ambiguous identifiers, invalid effective dates, out-of-range physical values, or a mismatched model version.
Outputs retain their native unit and a normalized unit from the repository unit registry.
Warnings are first-class result fields and cannot be dropped by the category adapter.
Reproducibility requires the raw-artifact checksum, source release, adapter version, input hash, model or formula version, and output hash.

## 12. Refresh and versioning

Refresh follows Package release based.
Release detection compares official release metadata and artifact checksums.
A changed checksum under an unchanged source version is quarantined for review.
Schema drift compares columns, types, required fields, enumeration values, workbook sheets, or model input declarations against the prior accepted fingerprint.
Raw snapshots, normalized releases, crosswalks, and selection outputs are immutable.
Publication uses an atomic pointer to the accepted release.
Rollback changes only that pointer and records an operator reason.
Deprecated releases remain available for historical calculation replay.
Stale data is labeled and blocked when an effective-date or certification-status guarantee can no longer be made.

## 13. Runtime design

The selected runtime design is Pinned local Julia service or compiled worker with no hosted REopt API dependency.
The required number of external calls during a customer estimate is zero.
The adapter reads a published internal release or executes a pinned local model only.
If the source is offline, existing published releases and reproducible historical calculations continue to work.

## 14. Cost

One-time engineering effort is 220-360 hours.
Estimated raw storage is 3 GB.
Estimated published storage is 1 GB.
Refresh effort is 20-40 per release.
Maintenance burden is High.
External source cost is $0 per month.
Estimated internal storage and compute cost is $1 at 100 calculations per month, $6 at 1,000, and $45 at 10,000.
These figures exclude ordinary shared database and observability overhead and are planning estimates, not vendor quotes.

## 15. Synthetic regression boundary

The offline command is:

```bash
node scripts/research/operational-savings/run-synthetic-prototypes.mjs --json
```

The retained compact sample is `docs/operational-savings-automation-research/samples/reopt-local-dispatch.sample.json`.
Its local output kind is `model_result_set`, its selection rule is `PINNED_LOCAL_FORMULA:annualBillDelta`, and its output unit is `USD/year`.
This synthetic regression executes without network access, but it does not prove acquisition, schema inspection, source-specific parsing, a real model run, database publication, or formula-term reachability.
Only the separate real-proof registry and source-backed tests may satisfy those gates.

## 16. Feasibility verdict

**FEASIBLE_AFTER_ADAPTER_WORK**

The supported boundary is Complete interval load, complete internal tariff, explicit technology inputs, and a pinned solver configuration.
The unsupported boundary is Incomplete tariff screens represented as detailed optimization and inferred charging or storage constraints.

## 17. Final recommended strategy

Package REopt.jl 0.59.2 with HiGHS in a reproducible local worker, strip all API-era dependencies, validate exact interval lengths, and store the complete input, solver version, status, and result hashes.
This is the single recommended production path for this Standard.
The rejected alternative is: The retired hosted API path is rejected because it is unavailable and violates zero-network runtime.

## 18. Potential later Information Card changes

No Information Card change is made on this research branch.
Later review may update the visible source version, fallback wording, input ownership, category scope, or status to match the supported boundary documented above.
Any formula change must be separately researched, reviewed, and approved.
Any fallback must name its authoritative population and exact numeric selection rule.
