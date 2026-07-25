# Pinned SSC research container

This directory builds an offline Linux arm64 runner from SSC commit `ba7a7968a115baa0c250597ce2381c7ffb27fbf2`.

The runner executes the real `pvwattsv8`, `swh`, and `windpower` compute modules with initializers and resource files taken from the pinned upstream SSC source.

All source archives are fetched during the image build and verified by SHA-256.

The runtime commands in `build-manifest.json` disable networking, make the container filesystem read-only, drop Linux capabilities, and enable the no-new-privileges security option.

Run the exact build command recorded in `build-manifest.json` from the repository root.

Then run:

```sh
node scripts/research/operational-savings/containers/ssc/verify.mjs
```

The verifier checks the local image identity, Linux arm64 architecture, source revision reported by every calculation, and every expected output tolerance.

SSC is redistributed under BSD-3-Clause.

The complete upstream license is stored at `/opt/ssc/LICENSE` in the image.

The recorded image digest and runtime proof remain in `build-manifest.json`.
The current Dockerfile, verifier, and declared input files are exact hash-bound as a post-hoc reproduction context.
Because no committed historical repository context or retained historical shell invocation proves how the recorded digest was built, `buildContextProvenance.status` remains `UNCOMMITTED_HISTORICAL_BUILD_CONTEXT`.
The separate `Dockerfile.offline` is a prospective candidate path and is not historical evidence for that digest.
Its Ubuntu package inputs are intentionally fail-closed until exact build and runtime `.deb` closures are retained, inventoried, uploaded, and restore-verified.
An executable candidate also requires durable and restore-verified AWS OCI evidence for the exact pinned Ubuntu base plus independently verified Docker daemon egress denial.
The guarded build emits a candidate receipt, and the separate candidate verifier tests the new image without requiring or changing the recorded image ID.
See [Prospective offline container rebuilds](../OFFLINE_REBUILDS.md) for the guarded workflow and current readiness.
