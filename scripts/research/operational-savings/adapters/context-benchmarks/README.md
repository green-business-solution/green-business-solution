# Context benchmark adapter

This adapter proves only source-specific context benchmarks that have a retained official artifact and an exact compatibility boundary.

The current real artifacts are the March 2024 ENERGY STAR Commercial Food Service Equipment Calculator, the DOE workbook containing all tables from the 2015 U.S. Lighting Market Characterization, the FEMA IS-815 generator-fueling lesson page, WaterSense at Work 2023 Sections 3.1 and 3.2, Argonne report ANL/ESD/08-3, and the August 2023 DOE walk-in cooler and freezer NOPR.

The rack-dishwasher path reads the nine exact machine-type and sanitation-specific `Racks washed per day` defaults from `Dishwasher Calcs`.

It combines one exact matched default with explicit operating days per week and active weeks per year.

The result is annual racks per equipment unit.

The exterior-lighting path reads all nine outdoor-subsector averages from DOE Table 4-29.

It resolves an exact native subsector and converts the published average watts per lamp or luminaire to the ITC-02 `existing_kW` term.

The DOE value is a national 2015 installed-stock screening benchmark, not a project nameplate value.

The workbook's electric-cooktop cells are also normalized for research.

Those cooktop cells remain partial evidence because the source labels the proposed level as ENERGY STAR and does not prove every induction or gas-to-induction configuration.

The FEMA path extracts the native 0.07 gallon-per-hour-per-kilowatt rule, verifies the published 40 kW worked example, and preserves the diesel-only applicability statement.

It calculates annual full-load diesel test fuel only when the project supplies generator technology, diesel fuel, full-load operation, rated kilowatts, and documented annual test hours.

It does not infer annual test hours, part-load fuel use, standby electricity, or another fuel or technology.

The WaterSense flush-activity path preserves the separate female toilet, male toilet, and male urinal daily assumptions and the native annualization equations.

It returns one annual total only for a complete eligible toilet or urinal group with explicit populations and operating days.

It records fixture count as group-boundary metadata and does not multiply that already aggregated result by fixture count.

Visitor populations without a male/female split and subset fixture groups without an explicit allocation share fail closed.

The Argonne forklift path retains the source's side-by-side 5,000-pound electric and propane comparison.

It returns 7.5 kWh per hour and 1.38 propane gallons per hour only for that exact capacity, propulsion pair, and comparable-duty relationship.

It rejects use as a universal forklift default.

The DOE walk-in path validates the source title and docket, the equipment-class definitions in Tables IV.1 through IV.3, and the energy estimates on PDF page 164 and document page 163 in Tables IV.31 through IV.33.

It publishes only the ten equipment-class rows retained in the reviewed fixture and pairs each row's baseline value with its own TSL 3 value.

Panel rows require a project-supplied in-scope area and multiply both native kWh per square foot per year intensities by that same area.

Door and refrigeration-system rows are already annual component values and are never multiplied by operating hours.

The result is a component benchmark for an exact compatible row, not measured whole-box energy or a universal walk-in default.

No cross-category median or universal fallback is implemented.

All remaining context benchmark processes stay unproved until their own official populations, filters, selection rules, and tests are retained.

Run the focused proof offline:

```bash
OS_RESEARCH_NETWORK=disabled npx vitest run \
  scripts/research/operational-savings/tests/context-benchmarks-real.test.mjs \
  scripts/research/operational-savings/tests/context-fema-real.test.mjs \
  scripts/research/operational-savings/tests/context-watersense-flush-real.test.mjs \
  scripts/research/operational-savings/tests/context-argonne-forklift-real.test.mjs \
  scripts/research/operational-savings/tests/context-doe-walkin-real.test.mjs
```
