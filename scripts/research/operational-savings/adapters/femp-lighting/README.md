# FEMP exterior-lighting real-source adapter

This adapter parses Table 1 from the retained official FEMP exterior-lighting HTML page.
It requires the exact table title, exact two-column header, a unique application row, and a native `≥` efficacy threshold before publishing the seven requirements to SQLite.

The page does not contain product model identifiers or exact product input-power rows.
Exact-product resolution therefore fails closed.
The requirements path accepts an exact FEMP application category and an externally supplied exact light-output requirement in lumens.
It calculates the maximum qualifying input power at the FEMP minimum efficacy threshold and maps that bound to ITC-02 `proposed_kW`.
The result is explicitly labeled as a requirement-derived ceiling rather than observed product wattage.

The migration columns for lumen range and example power remain `NULL` because Table 1 does not contain those values.
The wall-mounted example in Table 2 is not generalized to other applications and is not treated as a product population.

The manifest declares a complete ITC-02 composition from three Standard outputs.
The composition is current execution-verified evidence only when every required exact test passes in a content-bound run against the same source fingerprint.
The DOE 2015 Lighting Market Characterization supplies the 97 W national average for the exact `Building Exterior: C&I` subsector as `existing_kW`.
The FEMP requirement supplies the exact 10,000 lumen wall-mounted requirement ceiling as `proposed_kW`.
The operating-schedule adapter supplies `annual_on_hours` from a content-addressed project-owned local calendar input.
When executed, the composition records all three input calculation IDs in `calculation_source_dependencies`.
The DOE and FEMP dependencies retain their source artifacts, while the schedule dependency has a null source artifact and points to the declared upstream schedule calculation.
Before publication, each dependency must match the expected upstream Standard, process, and input SHA-256.
After those checks, the composition calculates `annual_kWh = fixture_count * (existing_kW - proposed_kW) * annual_on_hours`.
The DOE value remains a national 2015 context benchmark, not a substitute for a project nameplate measurement.

Run the proof offline:

```bash
OS_RESEARCH_NETWORK=disabled npx vitest run \
  scripts/research/operational-savings/tests/femp-lighting-real.test.mjs
```

The cached HTML is ignored by Git.
Normalization, resolution, and formula mapping require `OS_RESEARCH_NETWORK=disabled`.
