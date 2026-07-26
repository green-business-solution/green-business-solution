# Pinned DOE MEASUR research container

This directory builds a Linux arm64 research runner from AMO Tools Suite commit `bdc33b837d39e3b30d2ad802cde9f49ec5df1e6b`.

The build compiles the exact compressed-air and equipment C++ harnesses embedded in the RetroFi DOE MEASUR adapters.

It executes the pinned native `CompressedAirLeakSurvey`, `MotorEfficiency`, `PSATResult`, `FanResult`, and `CoolingTower::FanEnergyConsumption` modules.

The build script requires the ignored pinned source checkout at `scripts/research/operational-savings/.cache/repos/amo-tools-suite`, or an equivalent clean checkout supplied through `MEASUR_SOURCE_DIR`.

It verifies the Git commit, requires a clean source tree, creates a deterministic Git archive, verifies the archive SHA-256, extracts the exact adapter harnesses, and removes the temporary build context after Docker finishes.

Build from the repository root:

```sh
node scripts/research/operational-savings/containers/measur/build.mjs
```

Verify the image:

```sh
node scripts/research/operational-savings/containers/measur/verify.mjs
```

The verifier runs as the image's nonroot user with Docker networking disabled, a read-only root filesystem, all Linux capabilities dropped, and no-new-privileges enabled.

It verifies the source revision and license labels, the license checksum inside the image, the exact declared build and verification input checksums, and both native golden outputs.

The source is redistributed under the upstream ORNL AMO permissive license identified in this research package as `LicenseRef-ORNL-AMO-Permissive`.

The complete upstream license is stored at `/opt/measur/LICENSE.txt` in the image.

This image is research-only and is not approved for production or customer calculations.

The recorded image digest and runtime proof remain in `build-manifest.json`.
The current Dockerfile, verifier, and declared input files are exact hash-bound as a post-hoc reproduction context.
Because no committed historical repository context or retained historical shell invocation proves how the recorded digest was built, `buildContextProvenance.status` remains `UNCOMMITTED_HISTORICAL_BUILD_CONTEXT`.
The prospective offline plan records both the pinned GCC build base and pinned Ubuntu runtime base as durable dependencies.
No prospective MEASUR Dockerfile, locked context, or candidate verifier has been implemented, so the workflow remains explicitly blocked and cannot produce an offline candidate.
See [Prospective offline container rebuilds](../OFFLINE_REBUILDS.md) for the dependency and evidence boundary.
