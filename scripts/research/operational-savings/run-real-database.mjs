#!/usr/bin/env node

import { accessSync, constants } from "node:fs";
import { fileURLToPath } from "node:url";

import {
  NETWORK_ENFORCEMENT,
  spawnSyncWithNetworkDenied
} from "./lib/network-isolation.mjs";

if (process.argv.includes("--help")) {
  process.stdout.write(
    "Build the operational-savings real SQLite database, compact fixture, and publication receipt under the macOS deny-network sandbox.\n\nUsage:\n  npm run operational-savings:database:real\n"
  );
  process.exit(0);
}

if (process.platform !== "darwin") {
  throw new Error(
    "REAL_DATABASE_PLATFORM_UNSUPPORTED: the host-native real database build requires macOS. Restore the committed compact export on other platforms."
  );
}
for (const path of [
  "/usr/bin/clang++",
  "/usr/bin/sandbox-exec"
]) {
  try {
    accessSync(path, constants.X_OK);
  } catch {
    throw new Error(
      `REAL_DATABASE_EXECUTABLE_MISSING: ${path}`
    );
  }
}

const builderPath = fileURLToPath(
  new URL("./run-real-proofs.mjs", import.meta.url)
);
const result = spawnSyncWithNetworkDenied(
  process.execPath,
  [builderPath, ...process.argv.slice(2)],
  {
    cwd: fileURLToPath(new URL("../../..", import.meta.url)),
    env: {
      ...process.env,
      OS_RESEARCH_NETWORK: "disabled",
      OS_RESEARCH_NETWORK_ENFORCEMENT: NETWORK_ENFORCEMENT
    },
    stdio: "inherit"
  },
  {
    forceTopLevelSandbox: true
  }
);
if (result.error) throw result.error;
process.exitCode = result.status ?? 1;
