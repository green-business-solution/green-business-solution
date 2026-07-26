# Scout real-source preparation adapter

This adapter verifies the official Scout repository at commit `72bcf419eb1cb37379f163563344b0ec61507fd3`.
It pins the ECM JSON Schema, `(C) 90.1 Lighting` definition, `scout/ecm_prep.py` entry point, and Scout configuration schema by byte size and SHA-256 checksum.

## Retained preparation evidence

The retained preparation record reports a historical run of Scout's official `scout/ecm_prep.py` entry point with only the `(C) 90.1 Lighting` commercial ECM selected.
The exact Scout arguments were `--ecm_files "(C) 90.1 Lighting" --alt_regions AIA --no_scnd_lgt`.
The AIA regional mode preserves the category's site climate-zone meaning instead of substituting an EMM electricity-market region.
The retained record identifies Python 3.12.13 and Scout-compatible pinned runtime dependencies.
The exact python-build-standalone source archive and the assembled macOS ARM64 runtime are retained as ignored cache artifacts with SHA-256 checksums and a complete sorted dependency lock in `proof.json`.
The storage migration uploads both runtime artifacts to research S3 before the expanded temporary runtime is removed.
The retained record declares that the operating-system sandbox denied network access during preparation.
That network claim and the Scout proof level become current execution-verified evidence only when the content-bound run record covers the exact retained tests against the same source fingerprint.

The preparation record reports two historical runs from separate detached and clean worktrees at the pinned commit.
It records the same 599,004-byte `generated/ecm_prep.json` with SHA-256 `f7b428a2e66d90b4bfc4cf6272d85f52b1aea88229ff3c3fb53e33f536eccf50` for both runs.
The compact checked-in preparation record retains the exact source and runtime checksums, prepared market selectors, source-native reduction fractions, and representative annual baseline and efficient MMBtu outputs.

## Database publication

The adapter publishes the pinned source release, model version, model input schema, preparation run, ten applicable commercial building-type rows, and six retained annual model-output rows.
The exact normalized tables are `scout_preparation_runs`, `scout_prepared_ecm_values`, and `scout_prepared_ecm_annual_results`.
The source measure is also registered in `building_upgrade_measures` without creating a RetroFi taxonomy crosswalk.

## Supported formula mapping

The ITC-14 mapping is supported only when the caller supplies the exact source measure name, building type, climate zone, structure type, end use, and fuel.
The proved selector uses `(C) 90.1 Lighting`, `small office`, `AIA_CZ3`, `existing`, `lighting`, and `electricity`.
The prepared source value maps to `Scout_reduction_fraction_r = 0.2` with unit `fraction`.

The stock-wide annual Scout results are retained as model evidence but are not substituted for the exact market-segment formula input.
Those annual results blend multiple building types and adoption behavior, so treating their aggregate reduction as a generic project factor would change scope.
Scout also documents that relative-savings inputs can retain baseline-comparability uncertainty.

## Boundaries

ITC-05 and ITC-11 are classified as source-unsupported within the pinned Scout release.
The complete pinned ECM inventory has envelope infiltration and whole-equipment refrigeration efficiency measures, but no compatible duct-loss or refrigeration-control reduction output for those processes.
Generic keyword matching remains unsupported.
A Retrofit taxonomy mapping remains unsupported until it is independently reviewed.
Unknown measures, unsupported units, and incomplete or incompatible market selectors fail closed.

Run the focused proof with:

```sh
npx vitest run scripts/research/operational-savings/tests/scout-real.test.mjs
```
