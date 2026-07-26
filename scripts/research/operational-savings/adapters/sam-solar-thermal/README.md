# SAM solar-thermal local SSC proof

This adapter executes the real `swh` compute module from the SSC 303 library vendored by the pinned REopt.jl repository.
It parses the official SSC C++ fixture and reads its Fargo weather, hourly draw, mains-temperature, and set-temperature files.
It verifies every source checksum, both repository commits, the native SSC version, and the native build string before execution.

Run the compact offline proof from the repository root:

```sh
OS_RESEARCH_NETWORK=disabled \
  node scripts/research/operational-savings/adapters/sam-solar-thermal/run.mjs
```

Return the complete native interval series:

```sh
OS_RESEARCH_NETWORK=disabled \
  node scripts/research/operational-savings/adapters/sam-solar-thermal/run.mjs \
  --include-series
```

Regenerate the committed compact manifest:

```sh
OS_RESEARCH_NETWORK=disabled \
  node scripts/research/operational-savings/adapters/sam-solar-thermal/run.mjs \
  --output scripts/research/operational-savings/adapters/sam-solar-thermal/proof.json
```

The exact formula binding is `SAM_output` in `kWh-thermal/year`.
The upstream fixture is a residential Fargo design and proves execution, not a commercial California project design.
The executed binary is SSC 303, while the independently pinned fixture checkout currently has SSC 308 source.
The proof records both identities and does not claim that the binary is SSC 308.
