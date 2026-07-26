# Interval tariff real-source proof

This adapter reads all 58,920 records and all 737 observed columns in the pinned official URDB CSV gzip artifact.
It selects the current SDG&E TOU-A secondary 5-20 kW commercial record by exact native ID.
It preserves the native energy and demand structures, weekday and weekend schedules, fixed charge, effective date, supersession link, service type, voltage class, and demand eligibility band.

The URDB record does not contain the current non-bypassable `WF-NBC + DWR-BC` component.
The adapter therefore joins the record to SDG&E's current small-commercial rate summary effective June 1, 2026.
The joined periods are reconciled field-by-field against the publication's UDC, non-bypassable, EECC, and total-electric components.

The official SDG&E and San Diego Community Power joint comparison supplies a separate worked comparison.
For TOU-A secondary, its published average rate of `$0.41248/kWh` times `1,123 kWh` produces `$463.21504`, within one cent of the published `$463.21` average monthly bill.
This is a representative blended-rate reconciliation, not a claim that an undisclosed interval load shape was independently reconstructed.

The resulting `tariff_input_set` is complete only for the bounded `NO_EXPORT` screening case.
The retained URDB record says net metering applies but contains no current sell rate, so any export-credit mode fails closed.

Acquire the three public artifacts only in an explicitly network-enabled acquisition step.

```bash
OS_RESEARCH_NETWORK=enabled node -e 'import("./scripts/research/operational-savings/adapters/interval-tariff/acquire.mjs").then(({ acquireIntervalTariffArtifacts }) => acquireIntervalTariffArtifacts("scripts/research/operational-savings/.cache/artifacts"))'
```

Run the deterministic offline proof.

```bash
OS_RESEARCH_NETWORK=disabled npx vitest run scripts/research/operational-savings/tests/interval-tariff-real.test.mjs
```

The raw artifacts and SQLite research database remain under the ignored `.cache` directory.
Only source-specific code, migrations, proof metadata, and compact database exports are committed.
