# STD-DISHWASHER-WATER-HEATING - Commercial dishwasher water-heating conversion

## 1. Canonical role and current process proof

This Standard is used by 1 category and 1 category-local process instance.
The categories are ITC-52.
The process keys are dishwasher-water-heating-conversion.
The formula terms supplied are dishwasher_water_heating_result, water_heating_R_per_hour_existing, water_heating_R_per_hour_proposed, water_heating_R_per_rack_existing, water_heating_R_per_rack_proposed.
The canonical output set contains 5 distinct output descriptions.

| Category and process | Execution-verified proof level | Adapter | Actual adapter test result | Current blocker | Conditional next action |
| --- | --- | --- | --- | --- | --- |
| ITC-52/dishwasher-water-heating-conversion | DOCUMENTATION_ONLY | scripts/research/operational-savings/adapters/dishwasher-water-heating/run.mjs | dishwasher-water-heating-input-failure-proof: NOT_COVERED<br>dishwasher-water-heating-real-workbook-proof: NOT_COVERED<br>dishwasher-water-heating-workbook-mutation-proof: NOT_COVERED | EXECUTION_RUN_RECORD_REQUIRED: The static proof declaration is not counted as executed proof until one current local content-bound run record covers every required exact test. | Acquire or implement the missing evidence named by the blocker, then add exact adapter tests before claiming executable coverage. EXECUTION_RUN_RECORD_REQUIRED: The static proof declaration is not counted as executed proof until one current local content-bound run record covers every required exact test. |

## 2. Official source inventory

The primary organization is U.S. Environmental Protection Agency.
The selected official source is ENERGY STAR Commercial Food Service Equipment Calculator, Dishwasher Calcs.
The catalog acquisition target is Workbook published March 2024.
Its release date or release state is 2024-03.
The expected update cadence is Calculator and specification release based.
The license finding is EPA calculator; retain source attribution and review workbook notices.
The legal-review requirement is Low.
These catalog values describe the planned source inventory and do not replace proof-manifest artifact identity.

- https://www.energystar.gov/sites/default/files/2024-03/CFS%20Equipment%20Calculator.xlsx

| Evidence ID | Source title | Version | Status | Exact artifact |
| --- | --- | --- | --- | --- |
| E-DISHWASHER-WATER-HEATING | ENERGY STAR Commercial Food Service Equipment Calculator - Dishwasher Calculations | Workbook published March 2024 | VERIFIED | Dishwasher Calcs worksheet |

## 3. What can actually be acquired

- Public XLSX calculator
- Locally inspected formulas and assumptions

| Route | Exact endpoint or source | Authentication, registration, and key | Rate limit and pagination | Observed size, format, compression, and partition | History and URL stability | Automation assessment | Research result |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Public XLSX calculator | https://www.energystar.gov/sites/default/files/2024-03/CFS%20Equipment%20Calculator.xlsx | No authentication, registration, or API key observed for this route | Not applicable to a static artifact, repository, local package, or manual export | 403484 bytes observed; XLSX; XLSX ZIP container | Workbook published March 2024; Calculator and specification release based; Monitor URL and checksum drift | Public acquisition appears automatable, subject to artifact-specific license review | The official 403 KB workbook downloaded; all 15 sheets, Dishwasher Calcs inputs, formulas, and water-heating factors were inspected |
| Locally inspected formulas and assumptions | https://www.energystar.gov/sites/default/files/2024-03/CFS%20Equipment%20Calculator.xlsx | No authentication, registration, or API key observed for this route | Not applicable to a static artifact, repository, local package, or manual export | Not separately sized; Route-specific source structure | Workbook published March 2024; Calculator and specification release based; Monitor URL and checksum drift | Public acquisition appears automatable, subject to artifact-specific license review | Not separately probed; retained as a documented alternative |

The tested access result is: The official 403 KB workbook downloaded; all 15 sheets, Dishwasher Calcs inputs, formulas, and water-heating factors were inspected.
The planning catalog observation is CFS Equipment Calculator.xlsx, XLSX, 403484 bytes, sha256:3d2abed1938bd1400378a2e0ca2095058fe490b2b599ef15f09056639f06fcd6.
The access-cost classification is completely free.

## 4. Proof-backed artifacts, releases, and schemas

The following table is generated from current proof contributions that explicitly name this Standard.
It reports retained artifact releases, versions, locators, and integrity values instead of treating the planning catalog observation as executed proof.

| Artifact ID | Evidence role | Retained release or version | Exact locator | Integrity | Current proof state | Bound processes |
| --- | --- | --- | --- | --- | --- | --- |
| artifact:energy-star-cfs-calculator:2024-03 | PUBLIC_XLSX_DOWNLOAD | Workbook published March 2024 | https://www.energystar.gov/sites/default/files/2024-03/CFS%20Equipment%20Calculator.xlsx | sha256:3d2abed1938bd1400378a2e0ca2095058fe490b2b599ef15f09056639f06fcd6; 403484 bytes | DOCUMENTATION_ONLY | ITC-52/dishwasher-water-heating-conversion |

The current proof manifests record these inspected schemas:

| Schema ID | Artifact ID | Format | Extractor | Required native fields | Current proof state |
| --- | --- | --- | --- | --- | --- |
| schema:energy-star-cfs-dishwasher-water-heating:2024-03 | artifact:energy-star-cfs-calculator:2024-03 | XLSX_EXACT_CELLS_AND_FORMULAS | scripts/research/operational-savings/adapters/dishwasher-water-heating/inspect-schema.mjs | Dishwasher Calcs!I18 specific heat; Dishwasher Calcs!I19 water density; Dishwasher Calcs!C20:D21 water-heater efficiencies; Dishwasher Calcs!E20:E21 temperature rises; Dishwasher Calcs!C39:D40 resource input per gallon formulas; General Assumptions!C62:C63 resource conversions | DOCUMENTATION_ONLY |

Catalog-native field names that still require proof-backed inspection are:

- `machine type`
- `sanitation method`
- `water gallons per rack or square foot`
- `temperature rise`
- `water-heater efficiency`
- `specific heat`
- `water density`
- `resource conversion`
- `kWh or therm per gallon`

Null means unknown or not reported and must never be converted to zero.
Inactive, withdrawn, superseded, and historical records remain immutable and are excluded from current resolution unless an explicit historical query selects them.

## 5. RetroFi field coverage

| Required RetroFi field | Process and category | Source artifact or owner | Source-native field | Transformation | Target unit | Support classification | Limitation |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Rack-machine type and sanitation method, when the rack branch is used | dishwasher-water-heating-conversion; ITC-52 | User | Annual Operational Savings > Annual Commercial Dishwasher Resource Reduction > Native Activity Basis > Rack Machines Only > Rack-Machine Type and Sanitation Method | Normalize the owned value to the process input contract without substituting another tree path. | Process-native input unit | REQUIRES_USER | The external source cannot supply a value owned by Profile, Bill, Linked Opportunity, Project Document, or User. |
| Flight or conveyor machine type and sanitation method, when the flight branch is used | dishwasher-water-heating-conversion; ITC-52 | User | Annual Operational Savings > Annual Commercial Dishwasher Resource Reduction > Native Activity Basis > Flight or Conveyor Machines Only > Flight or Conveyor Machine Type and Sanitation Method | Normalize the owned value to the process input contract without substituting another tree path. | Process-native input unit | REQUIRES_USER | The external source cannot supply a value owned by Profile, Bill, Linked Opportunity, Project Document, or User. |
| Existing native water quantity from the connected existing dishwasher record | dishwasher-water-heating-conversion; ITC-52 | Standard Output | Annual Operational Savings > Annual Commercial Dishwasher Resource Reduction > Existing Dishwasher Native Performance > Standard 1.1 - Exact Existing Dishwasher Native-Field Resolution | Normalize the owned value to the process input contract without substituting another tree path. | Process-native input unit | DERIVABLE_FROM_SOURCE | The external source cannot supply a value owned by Profile, Bill, Linked Opportunity, Project Document, or User. |
| Proposed native water quantity from the connected exact proposed dishwasher record, when used | dishwasher-water-heating-conversion; ITC-52 | Standard Output | Annual Operational Savings > Annual Commercial Dishwasher Resource Reduction > Proposed Dishwasher Native Performance > Linked Opportunity names an exact dishwasher > Standard 1.2 - Exact Proposed Dishwasher Native-Field Resolution | Normalize the owned value to the process input contract without substituting another tree path. | Process-native input unit | DERIVABLE_FROM_SOURCE | The external source cannot supply a value owned by Profile, Bill, Linked Opportunity, Project Document, or User. |
| Proposed native water quantity from the connected requirement-selected dishwasher record, when used | dishwasher-water-heating-conversion; ITC-52 | Standard Output | Annual Operational Savings > Annual Commercial Dishwasher Resource Reduction > Proposed Dishwasher Native Performance > Linked Opportunity specifies dishwasher requirements but no exact product > Standard 1.3 - Requirement-Based Proposed Dishwasher Native-Field Resolution | Normalize the owned value to the process input contract without substituting another tree path. | Process-native input unit | DERIVABLE_FROM_SOURCE | The external source cannot supply a value owned by Profile, Bill, Linked Opportunity, Project Document, or User. |
| Incoming water temperature | dishwasher-water-heating-conversion; ITC-52 | Project Document | Annual Operational Savings > Annual Commercial Dishwasher Resource Reduction > Dishwasher Water-Heating Conversion > Incoming Water Temperature | Normalize the owned value to the process input contract without substituting another tree path. | Process-native input unit | REQUIRES_PROJECT_DOCUMENT | The external source cannot supply a value owned by Profile, Bill, Linked Opportunity, Project Document, or User. |
| Wash, rinse, or booster temperature or certified hot-water quantity | dishwasher-water-heating-conversion; ITC-52 | Project Document | Annual Operational Savings > Annual Commercial Dishwasher Resource Reduction > Dishwasher Water-Heating Conversion > Wash, Rinse, or Booster Temperature or Certified Hot-Water Quantity | Normalize the owned value to the process input contract without substituting another tree path. | Process-native input unit | REQUIRES_PROJECT_DOCUMENT | The external source cannot supply a value owned by Profile, Bill, Linked Opportunity, Project Document, or User. |
| Water-heating resource type | dishwasher-water-heating-conversion; ITC-52 | User | Annual Operational Savings > Annual Commercial Dishwasher Resource Reduction > Dishwasher Water-Heating Conversion > Water-Heating Resource Type | Normalize the owned value to the process input contract without substituting another tree path. | Process-native input unit | REQUIRES_USER | The external source cannot supply a value owned by Profile, Bill, Linked Opportunity, Project Document, or User. |
| Water-heater efficiency | dishwasher-water-heating-conversion; ITC-52 | Project Document | Annual Operational Savings > Annual Commercial Dishwasher Resource Reduction > Dishwasher Water-Heating Conversion > Water-Heater Efficiency | Normalize the owned value to the process input contract without substituting another tree path. | Process-native input unit | REQUIRES_PROJECT_DOCUMENT | The external source cannot supply a value owned by Profile, Bill, Linked Opportunity, Project Document, or User. |
| Dishwasher water-heating result set | dishwasher-water-heating-conversion; ITC-52 | artifact:energy-star-cfs-calculator:2024-03 | machine type; sanitation method; water gallons per rack or square foot; temperature rise; water-heater efficiency; specific heat; water density; resource conversion; kWh or therm per gallon | water_heating_input_per_gallon = temperature_rise_F * water_density_lb_per_gallon * specific_heat_Btu_per_lb_F / heater_efficiency / resource_Btu_per_unit | record set | DERIVABLE_FROM_SOURCE | Treating all machine water as hot water without the building and booster boundary or converting flight gallons per hour to racks |
| Existing rack-machine water-heating resource per rack | dishwasher-water-heating-conversion; ITC-52 | artifact:energy-star-cfs-calculator:2024-03 | machine type; sanitation method; water gallons per rack or square foot; temperature rise; water-heater efficiency; specific heat; water density; resource conversion; kWh or therm per gallon | water_heating_input_per_gallon = temperature_rise_F * water_density_lb_per_gallon * specific_heat_Btu_per_lb_F / heater_efficiency / resource_Btu_per_unit | resource/certified activity | DERIVABLE_FROM_SOURCE | Treating all machine water as hot water without the building and booster boundary or converting flight gallons per hour to racks |
| Proposed rack-machine water-heating resource per rack | dishwasher-water-heating-conversion; ITC-52 | artifact:energy-star-cfs-calculator:2024-03 | machine type; sanitation method; water gallons per rack or square foot; temperature rise; water-heater efficiency; specific heat; water density; resource conversion; kWh or therm per gallon | water_heating_input_per_gallon = temperature_rise_F * water_density_lb_per_gallon * specific_heat_Btu_per_lb_F / heater_efficiency / resource_Btu_per_unit | resource/certified activity | DERIVABLE_FROM_SOURCE | Treating all machine water as hot water without the building and booster boundary or converting flight gallons per hour to racks |
| Existing flight or conveyor water-heating resource per operating hour | dishwasher-water-heating-conversion; ITC-52 | artifact:energy-star-cfs-calculator:2024-03 | machine type; sanitation method; water gallons per rack or square foot; temperature rise; water-heater efficiency; specific heat; water density; resource conversion; kWh or therm per gallon | water_heating_input_per_gallon = temperature_rise_F * water_density_lb_per_gallon * specific_heat_Btu_per_lb_F / heater_efficiency / resource_Btu_per_unit | resource/hour | DERIVABLE_FROM_SOURCE | Treating all machine water as hot water without the building and booster boundary or converting flight gallons per hour to racks |
| Proposed flight or conveyor water-heating resource per operating hour | dishwasher-water-heating-conversion; ITC-52 | artifact:energy-star-cfs-calculator:2024-03 | machine type; sanitation method; water gallons per rack or square foot; temperature rise; water-heater efficiency; specific heat; water density; resource conversion; kWh or therm per gallon | water_heating_input_per_gallon = temperature_rise_F * water_density_lb_per_gallon * specific_heat_Btu_per_lb_F / heater_efficiency / resource_Btu_per_unit | resource/hour | DERIVABLE_FROM_SOURCE | Treating all machine water as hot water without the building and booster boundary or converting flight gallons per hour to racks |

For every `DERIVABLE_FROM_SOURCE` row, the governing derivation is: water_heating_input_per_gallon = temperature_rise_F * water_density_lb_per_gallon * specific_heat_Btu_per_lb_F / heater_efficiency / resource_Btu_per_unit.
No field owned by Profile, Bill, Linked Opportunity, Project Document, or User is silently replaced with a source default.

## 6. Acquisition and internal publication

```text
ENERGY STAR Commercial Food Service Equipment Calculator, Dishwasher Calcs
-> Public XLSX calculator
-> immutable checksummed raw artifact
-> source-specific schema and enumeration validation
-> typed normalization into calculation_assumptions + model_versions + calculation_runs
-> deterministic dishwasher-water-heating adapter
-> typed Standard output
-> category formula mapping
-> immutable calculation and provenance
```

Acquisition runs under a scheduler or approved operator action and never during a customer estimate.
A failed checksum, schema validation, normalization, or publication step leaves the prior accepted release and publication receipt active.
Implementation evidence must come from executed migrations, populated table counts, exact artifact identities, and the committed compact proof publication.

## 7. Resolution rules

Exact resolution requires one compatible active record after applying every source-supported identity, equipment class, capacity, geography, effective-date, and test-procedure filter.
Zero compatible records returns a typed unavailable result.
Multiple compatible records return an ambiguity error unless the source defines a deterministic edition or submodel key.
Requirements resolution admits only records satisfying every mandatory project and category constraint from one source release.
Benchmark resolution requires an authoritative, category-specific, unit-compatible population and a retained numeric selection rule.
An official recommended value takes precedence, followed by a defensible source-weighted median, then an ordinary median only for an exchangeable scalar population.
Structured records and model result sets are never median-selected.
Every selection retains its filters, eligible population, sample size, method, fallback level, uncertainty, and rejected candidates.

## 8. Calculation and runtime execution

The exact output contract contains: Dishwasher water-heating result set; Existing rack-machine water-heating resource per rack; Proposed rack-machine water-heating resource per rack; Existing flight or conveyor water-heating resource per operating hour; Proposed flight or conveyor water-heating resource per operating hour.
The governing source equation or transformation is water_heating_input_per_gallon = temperature_rise_F * water_density_lb_per_gallon * specific_heat_Btu_per_lb_F / heater_efficiency / resource_Btu_per_unit.
The selected runtime design is Small immutable calculator-assumption artifact plus deterministic local equation.
The required number of external calls during a customer estimate is zero.
Inputs are rejected for missing required fields, incompatible units, ambiguous identifiers, invalid dates, impossible physical values, or a mismatched model version.
Warnings are first-class result fields and cannot be dropped by the category adapter.
Reproducibility requires the source-artifact or content-addressed project-input identity, source release when applicable, adapter version, input hash, model or formula version, and output hash.

## 9. Refresh, immutable identity, and publication receipt

Refresh follows Calculator and specification release based.
Source IDs, release IDs, artifact IDs, project-input hashes, calculation IDs, and model-version IDs are content-bound identities.
An upsert may confirm an identical record but may not silently rewrite content behind one of those identities.
A source-backed dependency pins a source artifact and release, while a project-owned dependency may leave those fields null only when its exact input run and input SHA-256 carry the provenance.
Database publication builds the SQLite database, compact export, and receipt in temporary paths.
The publisher verifies byte sizes, SHA-256 values, and one generation ID before replacing the database and compact export, then renames the receipt last as the commit marker.
Consumers verify `docs/operational-savings-automation-research/fixtures/research-database.compact.json` against `docs/operational-savings-automation-research/fixtures/research-database.publication.json`.
A failed publication preserves the prior committed generation.

## 10. Cost

One-time engineering effort is 40-70 hours.
Estimated raw storage is 0.01 GB.
Estimated published storage is 0.001 GB.
Refresh effort is 4-8 per calculator release.
Maintenance burden is Low.
External source cost is $0 per month.
Estimated internal storage and compute cost is $0.01 at 100 calculations per month, $0.02 at 1,000, and $0.08 at 10,000.
These figures exclude ordinary shared database and observability overhead and are planning estimates, not vendor quotes.

## 11. Synthetic regression boundary

The offline command is:

```bash
node scripts/research/operational-savings/run-synthetic-prototypes.mjs --json
```

The retained compact sample is `docs/operational-savings-automation-research/samples/dishwasher-water-heating.sample.json`.
Its local output kind is `model_result_set`, its selection rule is `PINNED_LOCAL_FORMULA:waterHeatingPerGallon`, and its output unit is `kWh/gallon`.
This synthetic regression does not prove acquisition, source-specific parsing, a real model run, database publication, or category formula-term reachability.

## 12. Feasibility and supported boundary

**NOT_FEASIBLE_WITH_CURRENT_PUBLIC_SOURCES**

This verdict is derived from 1 bound process.
No bound process has retained real-source execution proof beyond documentation, synthetic evidence, an access block, or an unsupported source boundary.
The proof ledger records 0 end-to-end real processes, 0 source-verified processes, and 0 processes with genuine manual-export downstream proof.
The supported boundary is Matched rack or flight machine, explicit hot-water boundary, temperature rise, heater fuel, and heater efficiency.
The unsupported boundary is Treating all machine water as hot water without the building and booster boundary or converting flight gallons per hour to racks.

## 13. Recommended strategy and later card review

Retain the workbook checksum and exact formula cells, normalize rack and flight activity separately, and execute the specific-heat conversion locally with explicit building and booster stages.
The rejected alternative is: A universal kWh per gallon is rejected because temperature rise, heater fuel, and efficiency differ by stage.
No Information Card change is made on this research branch.
Later review may update visible source versions, fallback wording, ownership, category scope, or status only after the generated proof view supports the change.
Any formula change requires separate research, review, and approval.
