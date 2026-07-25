# WaterSense fixtures operator-import boundary

No official full WaterSense labeled-product export is retained in this research branch.

The cached official Product Search page shows a full-list XLSX download action.

Its JavaScript obtains an API base URL and API key from an environment endpoint before requesting the file.

This adapter does not call that endpoint, copy the key, guess the API URL, or fabricate product rows.

The current process claims are therefore `ACCESS_BLOCKED`.

## Lawful operator runbook

1. Open `https://www.epa.gov/watersense/product-search` in a normal browser.

2. Use the displayed `Download in XLSX format` action.

3. Do not inspect or copy an API key and do not substitute a guessed endpoint.

4. Save the XLSX unchanged.

5. Record its exact filename, byte size, SHA-256 digest, download timestamp, worksheet name, header row, exact source headers, canonical role mappings, and reviewed product-type unit rules in a sidecar JSON manifest.

6. Set every acquisition attestation to the values required by `OPERATOR_IMPORT_CONTRACT`.

7. Run the offline inspector against the XLSX and sidecar.

8. Review and commit a separate proof update only after the real export schema, record keys, category enumerations, certification states, units, nullability, and duplicate behavior have been observed.

The import-contract fingerprint is `a735273bfcdfd4637fee437b41afa26dc0af4fd1c3b30b7e87712d74f3ad410e`.

This fingerprint identifies the repository's operator package contract.

It is not a fingerprint of an unacquired WaterSense product schema.

The cached access probes are:

- Product Search HTML: 55,399 bytes, SHA-256 `25b7f23f3a094c0eb81bc52510977672da547984709ec85be55c64c20db72ce4`.

- Public `common.js`: 32,988 bytes, SHA-256 `394a1d631f667a07576dc9928f96ee70516aa57870493f1c589049c1e9c42b44`.

Run the contract tests offline:

```bash
OS_RESEARCH_NETWORK=disabled npx vitest run scripts/research/operational-savings/tests/watersense-fixtures-operator.test.mjs
```
