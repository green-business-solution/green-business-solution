# SAM wind local SSC proof

This adapter executes the real `windpower` compute module from the SSC 303 library vendored by the pinned REopt.jl repository.
It parses the official SSC C++ fixture, including its 161-point turbine curve, 80-meter hub height, 32-turbine coordinates, and wake-model selection.
It verifies the official representative wind resource and every other pinned source identity before execution.

Run the compact offline proof from the repository root:

```sh
OS_RESEARCH_NETWORK=disabled \
  node scripts/research/operational-savings/adapters/wind-sam/run.mjs
```

Return all 8,760 formula-term values:

```sh
OS_RESEARCH_NETWORK=disabled \
  node scripts/research/operational-savings/adapters/wind-sam/run.mjs \
  --include-series
```

Regenerate the committed compact manifest:

```sh
OS_RESEARCH_NETWORK=disabled \
  node scripts/research/operational-savings/adapters/wind-sam/run.mjs \
  --output scripts/research/operational-savings/adapters/wind-sam/proof.json
```

The exact formula binding is `wind_kWh_t` in `kWh/interval`.
The upstream resource represents Northwestern Arkansas and proves execution, not California project production.
The executed binary is SSC 303, while the independently pinned fixture checkout currently has SSC 308 source.
The proof records both identities and does not claim that the binary is SSC 308.
