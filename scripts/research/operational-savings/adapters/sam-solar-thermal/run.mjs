#!/usr/bin/env node

import { fileURLToPath } from "node:url";

import { assertNetworkDisabled } from "../../lib/artifact.mjs";
import {
  NETWORK_ENFORCEMENT,
  spawnSyncWithNetworkDenied
} from "../../lib/network-isolation.mjs";

assertNetworkDisabled();

const bridgePath = fileURLToPath(
  new URL("../../lib/ssc_bridge.py", import.meta.url)
);
const python = process.env.SSC_PYTHON || "/usr/bin/python3";
const result = spawnSyncWithNetworkDenied(
  python,
  [
    bridgePath,
    "--proof",
    "sam-solar-thermal",
    ...process.argv.slice(2)
  ],
  {
    cwd: process.cwd(),
    encoding: "utf8",
    env: {
      ...process.env,
      SSC_NETWORK_ENFORCEMENT: NETWORK_ENFORCEMENT
    },
    maxBuffer: 32 * 1024 * 1024
  },
  {
    forceTopLevelSandbox: false
  }
);

if (result.error) {
  throw result.error;
}
if (result.stdout) {
  process.stdout.write(result.stdout);
}
if (result.stderr) {
  process.stderr.write(result.stderr);
}
process.exitCode = result.status ?? 1;
