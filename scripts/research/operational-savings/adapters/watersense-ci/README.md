# WaterSense commercial operations real-source adapter

This adapter ingests the pinned official WaterSense at Work writeable-table workbook from `scripts/research/operational-savings/.cache/artifacts/watersense-ci-worksheets.xlsx`.
It verifies the 89,786-byte artifact and SHA-256 checksum before parsing any cells.

The workbook contains seven sheets and no formula cells.
The schema inspector retains each exact sheet name and dimension together with the native measured-flow, operating-time, daily-flow, leak, equipment, billing-unit, and cooling-tower cells.

The `Water Use Inventory` headers define flow in gallons per minute, operating time in minutes per day, and flow per day in gallons per day.
The adapter publishes this measured-input contract and six related source rows to `watersense_ci_methods`.
The measured-leak resolver requires exact project flow and confirmed annual duration, preserves their native canonical units, and multiplies them to produce annual avoided gallons.
It maps only the canonical ITC-35 terms `measured_leak_gpm` and `confirmed_leak_minutes_per_year`.

The workbook identifies cooling-tower cycles of concentration, metering, controls, and conductivity-based blowdown.
It does not contain a numeric cooling-tower makeup-water equation or units for the complete ITC-36 input set.
The adapter therefore rejects ITC-36 even when candidate measurements are supplied, and it rejects missing project measurements before reaching that source boundary.

Run the focused proof offline:

```bash
OS_RESEARCH_NETWORK=disabled npx vitest run \
  scripts/research/operational-savings/tests/watersense-ci-real.test.mjs
```

The test ingests the real workbook, publishes the method rows, executes the measured leak method, reaches both ITC-35 formula terms, and exercises schema, unit, checksum, missing-measurement, unsupported-source, and network mutations.
