# Scout offline proof container

This directory packages the pinned Scout commercial-lighting preparation path for research-only execution.
The image uses Scout commit `72bcf419eb1cb37379f163563344b0ec61507fd3` and Python 3.12.13 on `linux/arm64`.
Every Python dependency is pinned to the version used by the accepted local proof and to the exact Linux ARM64 wheel checksum.
The upstream source archive, selected ECM definition, ECM schema, entry point, configuration schema, input fixtures, and dual-license file are checksum-verified.

The build executes the official command:

```sh
python scout/ecm_prep.py \
  --ecm_files "(C) 90.1 Lighting" \
  --alt_regions AIA \
  --no_scnd_lgt
```

The build fails unless `generated/ecm_prep.json` exactly matches the independently replayed 599,004-byte output retained by the Scout adapter.
The runtime verifier checks the retained output and then performs the full preparation again from a fresh temporary copy.
Both runtime checks use a non-root user and must run with Docker networking disabled.

Build the image from the repository root:

```sh
docker buildx build \
  --platform linux/arm64 \
  --provenance=false \
  --load \
  --tag retrofit-research-scout:scout-72bcf419-arm64 \
  scripts/research/operational-savings/containers/scout
```

Verify the locally loaded image:

```sh
node scripts/research/operational-savings/containers/scout/verify.mjs
```

The verifier uses a read-only container filesystem, drops all Linux capabilities, enables `no-new-privileges`, disables networking, and supplies only a temporary in-memory `/tmp` for the full rerun.
The image is a research proof and is not approved for customer calculations or production deployment.

The recorded image digest and runtime proof remain in `build-manifest.json`.
The current Dockerfile, verifier, and declared input files are exact hash-bound as a post-hoc reproduction context.
Because no committed historical repository context or retained historical shell invocation proves how the recorded digest was built, `buildContextProvenance.status` remains `UNCOMMITTED_HISTORICAL_BUILD_CONTEXT`.
The separate `Dockerfile.offline` is a prospective candidate path and is not historical evidence for that digest.
It consumes the retained 34-wheel Linux arm64 wheelhouse through `pip --no-index --require-hashes`.
The context is content-ready, but an executable candidate remains blocked until the exact pinned Python base has durable and restore-verified AWS OCI evidence and Docker daemon egress denial is independently verified.
The guarded build emits a candidate receipt, and the separate candidate verifier tests the new image without requiring or changing the recorded image ID.
See [Prospective offline container rebuilds](../OFFLINE_REBUILDS.md) for the guarded workflow and current readiness.
