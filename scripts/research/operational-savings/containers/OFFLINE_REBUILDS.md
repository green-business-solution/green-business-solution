# Prospective offline container rebuilds

The recorded image evidence remains in each model's `build-manifest.json`.
The current Dockerfile, verifier, and declared input files are exact hash-bound as a post-hoc reproduction context.
They are not represented as the proven historical build context for the recorded image digest.
The `Dockerfile.offline` files, `offline-rebuild-plan.v1.json`, `offline-rebuild.mjs`, and `offline-candidate-verifier.mjs` define a separate prospective path for new candidate images.
They do not change, extend, supersede, or explain the provenance of an existing accepted image digest.

The prospective workflow covers REopt, SSC, and Scout.
MEASUR is included in the dependency closure, but its prospective workflow remains explicitly blocked until a separate offline Dockerfile, deterministic context, and candidate verification path are implemented.

## Security and evidence boundaries

The workflow distinguishes content readiness from executable build readiness.
A context can be content-ready while the build remains blocked.
An executable build requires all of the following:

- exact context inputs whose sizes and SHA-256 checksums match the plan;
- safe archive members and all declared required members;
- exact base-image OCI evidence retained and restore-verified in research S3 or research ECR;
- the same pinned base-image identities loaded locally;
- source-controlled evidence that external egress is denied for the local Docker daemon and builder;
- one inspected local Docker builder using the local Docker driver and supporting `linux/arm64`.

The guarded build sets the default network for Dockerfile `RUN` instructions to `none`.
That flag does not by itself deny registry, frontend, or other Docker daemon egress.
The workflow therefore remains blocked unless independent daemon-egress evidence is recorded and checksum-verified.

The Dockerfile validator rejects syntax and other parser directives, unpinned or unrecognized base images, base-stage options, every `ADD`, external `COPY --from`, privileged `RUN` options, non-`none` `RUN` networks, and recognized live dependency operations.
The build command also disables pulls, cache reuse, provenance generation, and SBOM generation.

Archive validation streams tar headers before context preparation.
It rejects unsafe paths, escaping links, duplicate members, unsupported special entries, malformed metadata, and missing required members.

Context preparation uses exclusive file creation, normalizes copied files to mode `0444` and an epoch modification time, rejects ancestor symlink escapes, and records an exact input-tree digest.
The guarded build rehashes the complete Docker input tree immediately before and after Docker execution.

These controls provide a content-locked, functionally reproducible candidate workflow.
They do not claim bit-for-bit OCI image reproducibility because builder and image metadata can still vary.

## Readiness inspection

Run the read-only readiness check from the repository root:

```sh
node scripts/research/operational-savings/containers/offline-rebuild.mjs inspect
```

The command returns a nonzero status while any exact dependency, durable base-image record, daemon-egress record, or pinned local image is unavailable.
Use `--skip-base-check` only to inspect context inputs separately from executable build readiness.

The optional model selector accepts `reopt`, `ssc`, `scout`, or `measur`.

## Prepare, build, and verify a candidate

Prepare a new context only after its exact S3-restored inputs validate:

```sh
node scripts/research/operational-savings/containers/offline-rebuild.mjs \
  prepare \
  --model scout \
  --output /private/tmp/retrofi-scout-offline-context
```

Preparation does not build an image and does not update accepted image evidence.
The command written to the context lock is descriptive and must not be run directly.

Use a different new context path for the guarded build after every executable-readiness condition passes:

```sh
node scripts/research/operational-savings/containers/offline-rebuild.mjs \
  build \
  --model scout \
  --output /private/tmp/retrofi-scout-offline-build-context
```

The build writes `offline-candidate-receipt.v1.json`.
The receipt binds the candidate image ID, exact plan, context lock, input-tree digest, inspected builder, daemon-egress evidence, and exact Docker command.

Verify that candidate through the separate receipt workflow:

```sh
node scripts/research/operational-savings/containers/offline-rebuild.mjs \
  verify-candidate \
  --receipt /private/tmp/retrofi-scout-offline-build-context/offline-candidate-receipt.v1.json
```

Candidate verification does not require the new image to have the recorded image ID.
It checks the current candidate's exact ID, reconstructs the only allowed build command from the plan, and runs the current checksum-bound verifier against a temporary candidate-manifest overlay.
It writes separate `offline-candidate-verification.v1.json` evidence with status `PASS_CANDIDATE_NOT_ACCEPTED`.
It does not edit the current verifier, recorded manifest, or recorded image identity.

Passing candidate verification is not publication or acceptance.
A new ECR digest and accepted manifest may be recorded only through the separately authorized publication and review workflow.

## Current readiness

Scout has a checksum-pinned source archive and a complete checksum-pinned Linux arm64 wheelhouse.
Its context is locally materializable.
Its executable build remains blocked because the exact Python base image has no recorded AWS durable and restore-verified evidence, and daemon-egress evidence is not recorded.

SSC has checksum-pinned source and OR-Tools binary archives.
Its build remains blocked because exact Ubuntu 24.04 arm64 build and runtime `.deb` closures were not retained.
It also requires durable and restore-verified OCI evidence for the pinned Ubuntu base and verified daemon-egress control.

REopt has a checksum-pinned source archive.
Its build remains blocked because the exact resolved post-`Pkg.add` project files and Julia depot were not retained as one checksum-pinned archive.
It also requires durable and restore-verified OCI evidence for the pinned Julia base and verified daemon-egress control.

MEASUR records both its pinned GCC build base and pinned Ubuntu runtime base as required durable dependencies.
No prospective executable workflow is implemented for MEASUR, so no candidate build is allowed.

No missing base image, package closure, or daemon-egress record is invented by the plan.

## Required archive shapes

The REopt environment archive must contain `reopt-environment/Project.toml`, `reopt-environment/Manifest.toml`, and `julia-depot/`.
It should be derived from the exact accepted image and must not be represented as independently reacquired dependency evidence.

The SSC build package archive must contain the exact Ubuntu arm64 build `.deb` closure at the archive root.
The SSC runtime package archive must contain the exact Ubuntu arm64 runtime `.deb` closure at the archive root.
Both closures must come from a pinned Ubuntu snapshot and must be complete enough for `dpkg --unpack` followed by `dpkg --configure --pending` with build networking disabled.

Prepared contexts are temporary working directories.
Do not treat a prepared context as the durable source of truth.
Delete it only after no build needs it and every required source or dependency artifact is independently upload-verified and restore-verified from research AWS storage.
