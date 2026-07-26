# ComStock annual-delta adapter

This adapter executes one bounded, source-backed ComStock 2025 AMY2018 Release 3 proof for ITC-01.

It verifies the official data dictionary, enumeration dictionary, measure-name crosswalk, upgrade lookup, San Francisco County baseline Parquet partition, and matching LED Lighting upgrade 43 partition by exact byte size and SHA-256 checksum.
It extracts and validates the source-native Parquet fields and physical types used by the calculation.
It also verifies the official `ltg_0001` to upgrade 43 crosswalk.

The proof selects applicable, successful `SmallOffice` records between 1,000 and 5,500 square feet in San Francisco County.
It removes only exact duplicates across the retained join fields, joins baseline and upgrade records by `bldg_id`, source `weight`, dataset label, and immutable segment dimensions, then calculates annual electricity savings as:

```text
(baseline annual kWh - upgrade annual kWh) / floor area ft2
```

The selected population contains 952 unique paired records representing 582.0665544105079 source-weighted buildings.
The first source-weighted delta at or above half of total weight is `0.27474747474747446 kWh/ft2-year`.

The adapter publishes both sides of every selected pair, the paired deltas, the approved `led_lighting_retrofit` to `ltg_0001` crosswalk, the benchmark population, the compact benchmark value, and the exact ITC-01 selected value with provenance.
The runtime calculation is offline and does not make an external call.

This proof is limited to the retained Release 3 LED Lighting SmallOffice segment.
It is not a project-specific equipment guarantee and does not authorize extrapolation to another geography, building type, floor-area band, measure, fuel, or release.
