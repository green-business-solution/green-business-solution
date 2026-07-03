# Scenario Verification Results Summary

Generated: 2026-07-03

Source files: `output_001_*.md` through `output_050_*.md` in this folder.

## Validation

- 50 output files found.
- 50 output files parsed as JSON.
- 0 parse errors.
- No output file appeared cut off at the file level.
- One output had incomplete finding rows: `output_030_trees_atlanta_kendeda_treehouse.md` reports 25 retrofits reviewed but includes 10 finding objects. Its summary reports 15 `no_issue` retrofits, so this rollup treats those 15 missing finding rows as inferred no-issue outcomes.

## Overall Counts

- Test cases reviewed: 50
- Retrofit/scenario decisions reviewed: 779
- Correct or safely excluded: 461
- Concrete scenario-combination repairs needed: 82
- Blocked by data/package gaps: 236

Practical interpretation: 461 decisions are usable as-is, 82 need concrete scenario/data repair, and 236 need missing package/suppression metadata before scenario correctness can be decided.

## Test Case Counts

- Clean at finding level: 3 / 50
- At least one concrete scenario repair: 17 / 50
- No concrete repair but data-gap blocked: 30 / 50
- Any data gap present: 41 / 50

GPT Pro `overallAssessment` values:

- `issues_found`: 43
- `inconclusive_due_to_data_gaps`: 5
- `no_issues_found`: 2

## Finding Type Counts

- `no_issue`: 208 explicit findings, plus 15 inferred no-issue rows from output 030
- `excluded_opportunity_should_stay_excluded`: 238
- `data_gap_blocks_verification`: 236
- `missing_compatible_opportunity`: 20
- `no_calculable_scenario_but_should_have_one`: 57
- `selected_not_optimal`: 4
- `duplicate_or_overlapping_opportunity`: 1

Concrete repair finding total: 82.

## Severity Counts

Concrete repair findings:

- High: 5
- Medium: 76
- Low: 1

All explicit findings:

- High: 5
- Medium: 296
- Low: 463

## High-Severity Repairs

1. `hoa-mai-gardens-seattle-household` / `insulation_upgrade`
   - Richland Energy Services rebate selected for a Seattle City Light household.
   - Repair: block Richland unless the user is a Richland Energy Services customer; add a review-gated HomeWise path or select no incentives.

2. `hoa-mai-gardens-seattle-household` / `heat_pump_hvac_retrofit`
   - Same Richland utility-territory mismatch.
   - Repair: block Richland; select no incentives unless a compatible heat-pump incentive is added.

3. `hoa-mai-gardens-seattle-household` / `heat_pump_water_heater`
   - Same Richland utility-territory mismatch.
   - Repair: block Richland; select no incentives unless a compatible HPWH incentive is added.

4. `hoa-mai-gardens-seattle-household` / `window_replacement`
   - Same Richland utility-territory mismatch.
   - Repair: block Richland; select no incentives unless a compatible window replacement incentive is added.

5. `burlington-beer-company` / `led_lighting_retrofit`
   - Selected scenario used an evaporator fan motor controls rule for LED lighting.
   - Repair: do not reuse the evaporator fan motor rule for LED lighting; add a lighting-specific package or select no incentives.

## Most Common Concrete Repair Patterns

- Missing calculable/package coverage for broad federal tax opportunities:
  - `SOURCE_DSIRE:dsire_program_id:658` (ITC)
  - `SOURCE_DSIRE:dsire_program_id:676` (MACRS)
  - `SOURCE_DSIRE:dsire_program_id:2511` (REAP)
- Compatible utility programs excluded because packages are marked `not_user_facing_default`.
- Utility-territory leakage for Richland Energy Services.
- Wrong measure/rule reuse in at least one lighting scenario.
- Duplicate/overlapping EV charger and Level 2 EV charger presentation for one VEDA financing case.

## Most Common Data-Gap Patterns

Top data-gap opportunities:

- `SOURCE_DSIRE:dsire_program_id:676` (MACRS): 106 data-gap findings
- `SOURCE_DSIRE:dsire_program_id:658` (ITC): 105 data-gap findings
- `SOURCE_DSIRE:dsire_program_id:2511` (REAP): 44 data-gap findings

Top data-gap retrofit categories:

- `biomass_biogas_energy_system`: 25
- `solar_water_heating_system`: 25
- `ground_source_geothermal_heat_pump`: 24
- `combined_heat_and_power_system`: 22
- `small_wind_turbine`: 19
- `battery_storage_system`: 17
- `thermal_energy_storage`: 14
- `microgrid_system`: 10

## Recommended Repair Order

1. Fix high-severity concrete bugs first:
   - Utility-territory mismatch for Richland Energy Services.
   - Wrong measure/rule reuse for Burlington Beer LED lighting.

2. Build a concrete scenario repair queue from the 82 concrete findings:
   - Missing compatible package/scenario.
   - No calculable scenario but should have one.
   - Selected scenario not optimal.
   - Duplicate or overlapping opportunity presentation.

3. Complete tax/depreciation/finance package metadata before revisiting scenario verification:
   - ITC
   - MACRS
   - REAP
   - PACE/financing-only opportunities
   - property-tax exemption workflows

4. Re-run scenario construction after package repairs.

5. Run the separate math verification pass after scenario combinations are repaired.

## Current Decision

The project is pausing scenario repair until tax-related calculations are fixed. This summary preserves the GPT Pro scenario verification results so we can return to them later without re-reading all 50 outputs.
