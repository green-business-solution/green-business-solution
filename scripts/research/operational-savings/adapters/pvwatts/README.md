# PVWatts local SSC proof

This adapter executes the real `pvwattsv8` compute module from the SSC 303 library vendored by the pinned REopt.jl repository.
It parses the official SSC C++ fixture instead of copying fixture values into a synthetic sample.
It verifies the library, fixture, Phoenix TMY2 weather file, repository commits, native SSC version, and native build string before execution.

Run the compact offline proof from the repository root:

```sh
OS_RESEARCH_NETWORK=disabled \
  node scripts/research/operational-savings/adapters/pvwatts/run.mjs
```

Return all 8,760 formula-term values:

```sh
OS_RESEARCH_NETWORK=disabled \
  node scripts/research/operational-savings/adapters/pvwatts/run.mjs \
  --include-series
```

Regenerate the committed compact manifest:

```sh
OS_RESEARCH_NETWORK=disabled \
  node scripts/research/operational-savings/adapters/pvwatts/run.mjs \
  --output scripts/research/operational-savings/adapters/pvwatts/proof.json
```

The exact formula binding is `PV_AC_kWh_t` in `kWh/interval`.
The retained hosted response is a Los Angeles case and is not numerically compared with this Phoenix fixture.
The executed binary is SSC 303, while the independently pinned fixture checkout currently has SSC 308 source.
The proof records both identities and does not claim that the binary is SSC 308.
