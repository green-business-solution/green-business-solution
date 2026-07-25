# ENERGY STAR commercial dishwasher real-source adapter

This adapter ingests a pinned 418-row snapshot of the official ENERGY STAR Certified Commercial Dishwashers Socrata dataset and its official dataset metadata.
The snapshot represents the complete current certified-product list returned on July 24, 2026, rather than a hand-selected sample.
The metadata pins dataset identity, revision time, EPA Data License link, and publisher.

The schema inspector validates the exact observed JSON field union, source identifiers, timestamps, decimal-string fields, three sanitation-method values, and sanitation-specific performance-field variants.
Source-native performance fields are nullable in the real dataset, so the normalizer preserves missing values rather than inventing replacements.
Thirty dual-sanitizing product rows become two explicit operating-mode rows apiece.
The official `energy_star_model_identifier` is retained as a non-unique source identifier because the complete snapshot contains one genuine duplicate.

The adapter publishes product, certification, performance, base dishwasher, and operating-mode rows.
Exact resolution accepts a source `pd_id` or exact brand and model, plus an explicit operating mode when the source product supports more than one.
Requirement resolution searches the complete current snapshot and fails closed on zero matches, multiple matches, missing source metrics, duplicate candidate IDs, or incompatible units.
An optional explicit candidate set may narrow a separately reviewed procurement population, but it is no longer required merely because the local artifact is incomplete.

The ITC-52 mapping reaches the rack-machine terms `water_per_rack_proposed`, `active_kWh_per_rack_proposed`, and `idle_kW_proposed`.
It also returns the native proposed dishwasher record and its selected operating mode.
It does not synthesize `active_kWh_per_hour_proposed` for flight machines because the source does not publish that term.
It does not treat current efficient-product rows as installed baselines.
It rejects formula mapping when the source row contains a separate booster-heater idle rate because the project boundary must state whether that separate equipment is in scope.

Acquire a new immutable snapshot while network access is enabled:

```bash
node scripts/research/operational-savings/adapters/energy-star/acquire.mjs
```

Run the retained snapshot proof with runtime networking disabled:

```bash
OS_RESEARCH_NETWORK=disabled npx vitest run \
  scripts/research/operational-savings/tests/energy-star-real.test.mjs
```

The cached JSON files are ignored by Git and must be preserved in research S3 through the storage migration workflow.
Normalization, resolution, and formula mapping require `OS_RESEARCH_NETWORK=disabled`.
