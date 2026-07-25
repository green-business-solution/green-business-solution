# Operational savings research

This directory contains source-specific acquisition, inspection, normalization, proof, model-container, and research-storage workflows.

## Test modes

Use `npm run operational-savings:test:portable` for a clean checkout that does not have the ignored research artifact cache.
This mode runs the portable proof-ledger, infrastructure, validation, operator-contract, and synthetic checks.
It excludes tests whose purpose is to replay exact raw artifacts, pinned source repositories, native binaries, or local model containers.
Excluded artifact tests are not reported as passing.

Use `npm run operational-savings:test:real` after restoring the complete research cache from the exact S3 object versions recorded in the storage manifest.
This mode requires all four pinned source repositories and the artifact cache to be present.
It also requires macOS because the retained native SSC library, MEASUR compiler harness, and measured `sandbox-exec` network isolation are platform-specific.
The real-suite wrapper executes the entire Vitest process tree under a deny-network sandbox after acquisition, in addition to the adapter-level offline guards.
The wrapper forces the tracked `vite.config.ts` explicitly, so ignored generated Vite config files cannot change which tests execute.
The command fails before testing on an unsupported host instead of implying that Linux ran the native proofs.
The artifact-backed tests then verify their own source checksums, commits, schemas, native execution, mappings, provenance, and failure boundaries.

Use `npm run operational-savings:test:containers` to replay the exact local REopt, SSC, MEASUR, and Scout image IDs on a Docker host.
This is the portable Linux model-execution path, but it does not replace source-adapter tests that inspect raw artifacts outside the images.
After local image cleanup, use `node scripts/research/operational-savings/storage/research-storage.mjs restore-ecr-images --profile retrofi-operational-savings-research --bucket retrofi-operational-savings-research-945129430686-us-east-1 --region us-east-1 --execute` to restore and replay all four models from their exact recorded ECR digests.
That guarded restore verifies the dedicated research role, immutable repository tags, AES256 repository encryption, scan-on-push, an untagged-only expiration policy of at least 14 days, the exact tagged image metadata, and live scan findings that match the recorded exact image or target-platform child manifest before any pull.
It uses an isolated temporary Docker authentication configuration, removes the configuration after the run, inspects each pulled digest, and executes every verifier with Docker networking disabled by the verifier.
For the final restore proof, first restore every S3 package and commit the resulting manifest checkpoint.
Then add `--run-validation --confirm-no-active-consumers --remove-after-replay` to the ECR restore command.
That mode requires every accepted image ID and digest reference to be absent before pulling, keeps all four images present while the fixed full offline validation runs, records the validation and replay receipt in the migration manifest, removes only each exact ECR digest reference, and succeeds only when the corresponding image ID is then absent.
The no-active-consumers confirmation is an operator coordination assertion that must remain true for the full replay and cleanup window.
It rejects an unexpected tag, digest, container, Docker-daemon error, or pre-existing accepted image instead of attempting broad cleanup.

Use `npm run operational-savings:database:real` to rebuild the durable SQLite database, compact Git fixture, and publication receipt under the same process-wide deny-network sandbox.
The underlying `run-real-proofs.mjs` builder refuses direct execution unless the wrapper markers are present and a live outbound socket control observes `EPERM` from the operating-system sandbox before any output path is created.
The receipt is published last and binds the exact database and compact-export hashes as one generation.

On macOS, an ordinary Vitest run selects the real mode when the complete cache is present and otherwise selects the portable mode.
Other hosts select the portable mode even when a cache is present.
Set `OS_RESEARCH_REAL_PROOFS=required` when a missing artifact must fail immediately instead of falling back to the portable checks.

## Proof execution records

Proof manifests declare intended evidence, gates, formula mappings, and exact Vitest test identities.
They do not by themselves establish that any test ran or passed.
The generated proof ledger keeps each `declaredProofLevel` separate from its `executionVerifiedProofLevel` and fails execution-dependent contributions closed to `DOCUMENTATION_ONLY` without a current matching run record.

Commit every relevant proof input before creating a record.
The attestation rejects a dirty or untracked relevant input when the committed snapshot cannot represent its exact content.
Use the single orchestrated attestation command, then regenerate the ledger:

```sh
npm run operational-savings:proof:attest
node scripts/research/operational-savings/proof-ledger.mjs --write
```

The attestation command captures the exact proof-input fingerprint, bounded toolchain identity, research-cache identity, and Git state before starting the fixed complete real suite.
It materializes the committed HEAD in a private detached Git worktree.
On macOS it asks `cp -cR` to use clonefile semantics for private copies of `node_modules` and the complete research cache inside that worktree.
The recorded mode remains `MACOS_CLONEFILE_OR_PRIVATE_COPY` because the workflow does not independently prove that the filesystem retained clone-on-write storage rather than completing a private byte copy.
The copied trees do not share mutable paths with the caller's worktree, so a later caller-side dependency or cache mutation does not alter the execution inputs.
The attested command resolves and executes the Vitest entrypoint from the private snapshot dependency tree.
The private snapshot fingerprint must equal the caller's pre-run fingerprint before execution.
The private snapshot fingerprint is captured again after execution and must still equal both the original pre-run fingerprint and the caller's post-run fingerprint.
The fingerprint traversal rejects symlinks, sockets, FIFOs, devices, and other special entries below fingerprint roots.
It writes Vitest JSON to a newly created private operating-system temporary directory and removes the execution snapshot before writing the record.
It refuses to write a record if the original input state, private snapshot state, original or copied installed dependency tree, original or copied research cache, or bound execution-tool bytes differ across the run.
Setup and teardown remove both the temporary worktree path and its exact validated Git worktree metadata.
If the primary target-specific Git removal fails, the fallback removes only the validated direct-child administrative directory for that snapshot and leaves every unrelated worktree registration untouched.
The Vitest run timestamps must also fall inside that exact orchestrated runner window.
There is no supported command that creates a run record from a previously existing Vitest JSON file.
The generator matches every declared test by normalized repository-relative path and exact full test name.
Missing, failed, skipped, duplicate, path-mismatched, or name-mismatched results prevent the record from passing.
The attestation command still writes a failed diagnostic record when the stable, orchestrated Vitest run completes with failed assertions, but it exits nonzero so automation cannot mistake it for a passing attestation.
The record fingerprints every regular file below `scripts/research/operational-savings` except `.cache`, the tracked `vite.config.ts`, both TypeScript config inputs, the package manifests and lockfile, the canonical operational-savings inputs, the compact research database publication files when present, all proof manifests, and all referenced tests and adapters.
It content-binds the exact named Node executable file, private Vitest entrypoint file, Git executable file, network sandbox executable file, developer-tool resolver file, resolved SSC Python executable file, resolved MEASUR C++ compiler executable file, lockfile declarations, exact installed package file trees, package roots, package bin links, and workspace-link target trees.
It deliberately excludes `node_modules/.vite` and `node_modules/.vite-temp` as mutable runtime caches and removes them from the private dependency copy before execution.
It does not content-bind the operating-system runtime, dynamically loaded libraries, Python standard library or external site packages, or compiler SDK headers and libraries.
The proof child receives a constructed environment with fixed tool paths and without `NODE_OPTIONS`, `NODE_PATH`, `PYTHONPATH`, `PYTHONHOME`, `DYLD_*`, `LD_*`, or shell startup injection variables.
The attested Vitest run disables its mutable cache.
It also records the pre-run and post-run Git HEAD and dirty-tree state observed before the record write, the Vitest version, exact command, platform, durations, pinned artifact identity catalog, and the exact process-wide network-enforcement control result.

The record type is `LOCAL_CONTENT_BOUND_RUN_RECORD`.
It is unsigned, unauthenticated, and does not establish independent execution provenance.
A repository writer can fabricate a self-consistent record because every validator and digest is controlled by the same repository trust domain.
The record's hashes detect stale content and accidental corruption, but they do not resist a malicious repository writer.
The record reports process-wide network denial as verified only when the exact sandbox control assertion passes inside the real Vitest process tree after its outbound socket attempt fails immediately with `EPERM`.
The top-level wrapper always applies the operating-system network sandbox even when the caller supplies the nested-process enforcement marker.
Nested subprocesses inherit the active marker so they continue to run inside the existing top-level sandbox without recursively wrapping themselves.
If that assertion is missing, renamed, moved, skipped, duplicated, or failed, the run record fails and makes no process-wide network-isolation claim.
Under the explicit honest-local-operator assumption, the record binds those exact Vitest results to the exact hashed source, bounded executable and dependency files, private research-cache copy, and manifest-declared artifact identities.

## Storage boundary

Git contains code, schemas, manifests, compact fixtures, tests, and documentation.
Research S3 is the durable source of truth for raw artifacts, normalized outputs, model support files, and pinned source archives.
Research ECR is the durable source of truth for runnable model images.
Each central image record includes the source repository and commit, model release, research purpose, license evidence, source-archive checksum, and build-manifest checksum.
Local image cleanup requires a fresh live proof that each exact tagged image remains in an immutable, AES256-encrypted, scan-on-push research repository whose lifecycle expires only untagged images after at least 14 days.
Cleanup also requires the live scan counts and scan timestamp to match the content-bound publication evidence.
The cleanup journal records those controls before the exact ECR digest reference is removed, and completion requires the corresponding local image ID to be absent afterward.
Production resources and customer calculation paths are outside this research workflow.
