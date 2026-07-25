# REopt real-run adapter

This adapter inspects the pinned official REopt.jl repository at commit `f952cabdf3e60f6e88eef80bb7bc9e7e24bac643`.
It verifies exact source checksums for the package metadata, ElectricStorage input struct, PV input struct, electric tariff result builder, electric storage result builder, PV result builder, and an upstream storage scenario.

The real-run path additionally verifies retained proof files from the pinned `linux/arm64` Julia 1.10.4 and HiGHS container.
Both proof commands ran with Docker `--network none`.

The official shipped `test/scenarios/no_techs.json` run returns `OPTIMAL` and matches the upstream regression assertions of $1,000.00 annual energy cost and $136.99 annual demand cost.

The bounded RetroFi-shaped pair holds an exact 8,760-hour local load and tariff constant.
Its baseline has no storage.
Its proposed case fixes storage at 25 kW and 50 kWh.
Both runs return `OPTIMAL`, and the proof-case annual bill changes from $89,827.00 to $84,032.20.

The adapter publishes source metadata, model identity, three calculation runs, source-specific run records, and the $5,794.80 proof-case savings with provenance.
It rejects changed evidence checksums, wrong model or package versions, non-optimal solver statuses, load mismatches, storage-size drift, and savings arithmetic drift.

The ITC-24 proof adds a second bounded pair with the same exact 8,760-hour load, tariff, and Phoenix no-daylight-saving time basis.
Its proposed case fixes a 4 kW-DC PV system and feeds REopt the exact hourly `PV_AC_kWh_t` series produced by the pinned real PVWatts adapter.
It also fixes storage at 4 kW and 8 kWh usable energy, converts that usable energy and the 20 percent reserve to 10 kWh nameplate energy, applies explicit 95 percent charge and discharge efficiencies, starts at 50 percent state of charge, and disables grid charging.
Both runs return `OPTIMAL`, and the proof-case annual bill changes from $89,827.00 to $87,586.78.
The adapter publishes those bills directly as `baseline_annual_bill` and `proposed_annual_bill` with the REopt image digest, PVWatts series and source hashes, input hashes, fixed design boundaries, and offline execution controls in provenance.
The generated specification, derived interval series, execution evidence, build manifest, and research container are registered as non-official content-addressed artifacts.
Both solar-storage calculation runs retain typed dependencies on those artifacts and the official PVWatts library, fixture, weather resource, and upstream calculation.
The retained mutation tests reject a changed interval count, time basis, site, PV capacity, storage design, and grid-charging policy.
The canonical ITC-24 binding prescribes initial state of charge and a reserve but does not prescribe a cyclic terminal state.
The bounded replay therefore starts at 50 percent and ends at the 20 percent reserve, and it must not be generalized to an annual project calculation that requires an equal initial and terminal state without adding that explicit project boundary.
The connected PV series comes from the pinned SSC 303 runtime and retains the separate SSC fixture revision as provenance rather than claiming the two source revisions are identical.

The modeled savings is a bounded synthetic proof, not a production estimate or a utility-bill reconciliation.

Run the focused proof:

```sh
OS_RESEARCH_NETWORK=disabled \
  npx vitest run \
  scripts/research/operational-savings/tests/reopt-source-real.test.mjs
```

Verify retained container evidence and local image identity:

```sh
node scripts/research/operational-savings/containers/reopt/verify.mjs
```

Replay the solar-plus-storage pair through the exact pinned image as non-root with Docker networking disabled:

```sh
node scripts/research/operational-savings/containers/reopt/verify-solar-storage.mjs
```
