# WaterSense landscape real-source adapter

This adapter ingests the pinned official WaterSense climate workbook from `scripts/research/operational-savings/.cache/artifacts/watersense-climate.xlsx`.
It verifies the 10,078,683-byte artifact and SHA-256 checksum before parsing any cells.

The native workbook contains four sheets named `About`, `Peak_Month`, `ETo`, and `P50`.
The three climate sheets contain 31,735 populated postal-code records, including 30,116 numeric U.S. ZIP rows and 1,619 Canadian FSA rows.
The `ETo` and `P50` worksheet dimensions also contain 24,179 styled blank rows that are intentionally not published as climate records.

The adapter joins the native peak-month, monthly ETo, and monthly P50 rows by postal code.
It checks annual totals, peak-month values, exact native headers, dimensions, cached value types, source notes, and source units.
It publishes typed rows to `watersense_landscape_climate`.

The Version 2.0 calculation port is pinned to the exact cells and constants observed in EPA's official `watersense_water-budget-tool_v2.0.xlsx`.
That method source has SHA-256 `56fab916b37196655c9cf293928ca7d2f74a95fb44a47c0fc7bf5c770281201a`.
The reviewed method applies 25 percent effective rainfall, growing-season clipping, the native `Kspecies/Effi` factors, the 0.6233 gallons conversion, the 0.58 application rate, and the reviewed controller, pressure-regulation, and certified-professional factors.

The cached climate workbook does not contain Version 2.0 growing-season start and end months.
The calculation therefore fails unless the caller supplies a growing-season record identified as `EPA_WATERSENSE_V2`, tied to the calculation ZIP, and pinned to the reviewed Version 2.0 method artifact checksum.
It also fails on missing hydrozones, mismatched total area, unsupported units, unrecognized native enumerations, or an irrigation-efficiency override that differs from the reviewed Version 2.0 table.

The baseline result is the Version 2.0 design comparison for typical standard construction.
It is not measured existing irrigation consumption and must not be described that way.

Run the focused proof offline:

```bash
OS_RESEARCH_NETWORK=disabled npx vitest run \
  scripts/research/operational-savings/tests/watersense-landscape-real.test.mjs
```

The test ingests the complete official climate workbook, publishes all populated postal-code rows, resolves ZIP `94105`, executes a reviewed exact-input design scenario, reaches both ITC-34 formula terms, and exercises schema, unit, checksum, missing-input, and network mutations.
