# REopt.jl offline proof container

This directory builds and records the real REopt.jl execution proof for `STD-REOPT-LOCAL-DISPATCH`.

The image pins Julia 1.10.4, REopt.jl 0.59.2 at commit `f952cabdf3e60f6e88eef80bb7bc9e7e24bac643`, HiGHS.jl 1.12.0, and the compatible HiGHS_jll 1.8.0 binary.
It targets `linux/arm64`, runs as numeric non-root user `65532:65532`, uses one Julia and BLAS thread, and sets `JULIA_PKG_OFFLINE=true`.

The source archive is checksum-verified during the build.
The original upstream `Project.toml` and `Manifest.toml` are retained inside the image before the pinned HiGHS dependency is added to the runtime environment.

Build the local image with:

```sh
docker buildx build \
  --platform linux/arm64 \
  --provenance=false \
  --load \
  --tag retrofit-research-reopt:reopt-0.59.2-f952cab-arm64 \
  scripts/research/operational-savings/containers/reopt
```

Run the exact official shipped regression scenario with networking disabled:

```sh
docker run --rm --network none --platform linux/arm64 \
  retrofit-research-reopt:reopt-0.59.2-f952cab-arm64 official
```

Run the bounded local-load, local-tariff, baseline-versus-storage proof with networking disabled:

```sh
docker run --rm --network none --platform linux/arm64 \
  retrofit-research-reopt:reopt-0.59.2-f952cab-arm64 retrofi
```

Replay the exact bounded PVWatts-plus-fixed-storage pair through the same image:

```sh
node scripts/research/operational-savings/containers/reopt/verify-solar-storage.mjs
```

The replay mounts the separately checksum-pinned solar-storage runner, specification, and 8,760-value PVWatts interval series read-only.
It runs as UID and GID `65532:65532` with Docker networking disabled, a read-only root filesystem, all Linux capabilities dropped, and no-new-privileges enabled.
The 96 KB series fixture preserves the exact `PV_AC_kWh_t` values from the pinned SSC 303 PVWatts proof, its formula-series hash, its model input and output hashes, and the official Phoenix weather-fixture hash.
The proof fixes PV at 4 kW-DC and storage at 4 kW with 8 kWh usable energy, a 20 percent reserve, 50 percent initial state of charge, explicit 95 percent charge and discharge efficiencies, and no grid charging.
The replay checks that PV charges the battery, the battery discharges to load, grid charging remains zero, and the two canonical annual bill outputs match the retained evidence.

Verify the retained evidence and the locally loaded image with:

```sh
node scripts/research/operational-savings/containers/reopt/verify.mjs
```

The official `no_techs.json` scenario attempts a Cambium renewable-profile lookup because the shipped input omits that series.
Docker network isolation blocks the lookup, REopt emits its documented fallback warning, and the optimization still returns `OPTIMAL` with the exact upstream regression costs.

The RetroFi-shaped input supplies all 8,760 load values, all 8,760 time-of-use energy rates, all 12 monthly demand rates, four zero emissions factors, and an 8,760-value zero renewable-fraction series locally.
Its proposed case fixes storage at 25 kW and 50 kWh while preserving the baseline load, tariff, site, financial horizon, and grid assumptions.

The reported $5,794.80 annual bill reduction is a bounded solver proof for this synthetic local case.
It is not a production estimate and is not reconciled to a real utility bill.

The recorded image digest and runtime proof remain in `build-manifest.json`.
The current Dockerfile, verifier, and declared input files are exact hash-bound as a post-hoc reproduction context.
Because no committed historical repository context or retained historical shell invocation proves how the recorded digest was built, `buildContextProvenance.status` remains `UNCOMMITTED_HISTORICAL_BUILD_CONTEXT`.
The separate `Dockerfile.offline` is a prospective candidate path and is not historical evidence for that digest.
Its exact Julia environment input is intentionally fail-closed until the resolved project files and depot are retained, inventoried, uploaded, and restore-verified.
An executable candidate also requires durable and restore-verified AWS OCI evidence for the exact pinned Julia base plus independently verified Docker daemon egress denial.
The guarded build emits a candidate receipt, and the separate candidate verifier tests the new image without requiring or changing the recorded image ID.
See [Prospective offline container rebuilds](../OFFLINE_REBUILDS.md) for the guarded workflow and current readiness.
