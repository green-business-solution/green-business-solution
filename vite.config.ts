import { existsSync } from "node:fs";
import { resolve } from "node:path";

import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";

const operationalSavingsProofMode =
  process.env.OS_RESEARCH_REAL_PROOFS;
const operationalSavingsNetworkEnforcement =
  process.env.OS_RESEARCH_NETWORK_ENFORCEMENT;
const operationalSavingsCacheRoot = resolve(
  "scripts/research/operational-savings/.cache"
);
const operationalSavingsRealProofCacheAvailable = [
  "artifacts",
  "repos/amo-tools-suite/.git",
  "repos/reopt/.git",
  "repos/scout/.git",
  "repos/ssc/.git"
].every((path) =>
  existsSync(resolve(operationalSavingsCacheRoot, path))
);
if (
  operationalSavingsProofMode === "required" &&
  process.platform !== "darwin"
) {
  throw new Error(
    "OS_RESEARCH_REAL_PROOFS=required is the macOS-native proof suite. Use operational-savings:test:containers for portable model replay."
  );
}
if (
  operationalSavingsProofMode === "required" &&
  operationalSavingsNetworkEnforcement !==
    "macos-sandbox-exec-deny-network"
) {
  throw new Error(
    "OS_RESEARCH_REAL_PROOFS=required must run through operational-savings:test:real so the complete process tree is measured under the deny-network sandbox."
  );
}
if (
  operationalSavingsProofMode === "required" &&
  !operationalSavingsRealProofCacheAvailable
) {
  throw new Error(
    "OS_RESEARCH_REAL_PROOFS=required needs the restored operational-savings artifact cache."
  );
}
const excludeOperationalSavingsArtifactTests =
  operationalSavingsProofMode === "portable" ||
  process.platform !== "darwin" ||
  operationalSavingsNetworkEnforcement !==
    "macos-sandbox-exec-deny-network" ||
  (
    operationalSavingsProofMode !== "required" &&
    !operationalSavingsRealProofCacheAvailable
  );
const operationalSavingsArtifactTestPatterns = [
  "scripts/research/operational-savings/tests/**/*-real.test.mjs",
  "scripts/research/operational-savings/tests/**/real-*.test.mjs",
  "scripts/research/operational-savings/tests/doe-ccms-blocked.test.mjs",
  "scripts/research/operational-savings/tests/ssc-database-publication.test.mjs",
  "scripts/research/operational-savings/tests/ssc-models.test.mjs"
];

export default defineConfig({
  plugins: [react()],
  test: {
    exclude: [
      "node_modules/**",
      "build/**",
      "dist/**",
      ...(
        operationalSavingsNetworkEnforcement ===
        "macos-sandbox-exec-deny-network"
          ? []
          : [
              "scripts/research/operational-savings/tests/network-sandbox-real.test.mjs"
            ]
      ),
      ...(
        excludeOperationalSavingsArtifactTests
          ? operationalSavingsArtifactTestPatterns
          : []
      )
    ]
  },
  server: {
    port: 5173,
    proxy: {
      "/api": "http://127.0.0.1:8787"
    }
  }
});
