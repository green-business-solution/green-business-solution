# FuelEconomy.gov real-source adapter

This adapter ingests the complete official `vehicles.csv.zip` snapshot.
It validates the exact CSV header, publishes typed vehicle and performance rows, resolves source IDs and descriptions, enforces source vehicle-class compatibility, and maps the exact reviewed pair to both ITC-29 formula terms.

Acquire with network enabled:

```bash
node scripts/research/operational-savings/adapters/fueleconomy/acquire.mjs
```

The committed research runner controls the destination path.
Acquisition is separate from normalization and estimate-time resolution.

Run the real proof offline:

```bash
OS_RESEARCH_NETWORK=disabled npx vitest run \
  scripts/research/operational-savings/tests/fueleconomy-real.test.mjs
```

The raw bulk ZIP and generated SQLite database remain under the ignored `.cache` directory.
The proof pins the acquired artifact checksum and fails if the source schema or checksum changes.
It does not approve a class-median benchmark for ITC-28.
