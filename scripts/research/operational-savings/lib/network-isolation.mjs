import { spawnSync } from "node:child_process";
import { connect } from "node:net";

export const NETWORK_ENFORCEMENT =
  "macos-sandbox-exec-deny-network";

export const SANDBOX_PATH = "/usr/bin/sandbox-exec";
const SANDBOX_PROFILE =
  "(version 1)(allow default)(deny network*)";
const NETWORK_CONTROL_HOST = "192.0.2.1";
const NETWORK_CONTROL_PORT = 9;

export async function assertProcessWideNetworkDenied({
  timeoutMs = 1_000
} = {}) {
  if (
    process.env.OS_RESEARCH_NETWORK !== "disabled" ||
    process.env.OS_RESEARCH_NETWORK_ENFORCEMENT !==
      NETWORK_ENFORCEMENT
  ) {
    throw new Error(
      "NETWORK_SANDBOX_MARKER_MISSING: run the real-proof operation through its deny-network wrapper"
    );
  }

  const outcome = await new Promise((resolve) => {
    let settled = false;
    const finish = (value) => {
      if (settled) return;
      settled = true;
      socket.destroy();
      resolve(value);
    };
    const socket = connect({
      host: NETWORK_CONTROL_HOST,
      port: NETWORK_CONTROL_PORT
    });
    socket.once("connect", () => {
      finish({ kind: "connected" });
    });
    socket.once("error", (error) => {
      finish({
        kind: "error",
        code: error.code ?? "UNKNOWN"
      });
    });
    socket.setTimeout(timeoutMs, () => {
      finish({ kind: "timeout" });
    });
  });

  if (
    outcome.kind !== "error" ||
    outcome.code !== "EPERM"
  ) {
    throw new Error(
      `NETWORK_SANDBOX_CONTROL_FAILED: expected EPERM from the deny-network sandbox, received ${JSON.stringify(
        outcome
      )}`
    );
  }
  return {
    enforcement: NETWORK_ENFORCEMENT,
    host: NETWORK_CONTROL_HOST,
    port: NETWORK_CONTROL_PORT,
    observedErrorCode: outcome.code
  };
}

export function networkSandboxRequired({
  forceTopLevelSandbox = true,
  ambientNetworkEnforcement =
    process.env.OS_RESEARCH_NETWORK_ENFORCEMENT
} = {}) {
  return (
    forceTopLevelSandbox ||
    ambientNetworkEnforcement !== NETWORK_ENFORCEMENT
  );
}

export function spawnSyncWithNetworkDenied(
  command,
  args,
  options = {},
  {
    forceTopLevelSandbox = true,
    ambientNetworkEnforcement =
      process.env.OS_RESEARCH_NETWORK_ENFORCEMENT
  } = {}
) {
  if (
    !networkSandboxRequired({
      forceTopLevelSandbox,
      ambientNetworkEnforcement
    })
  ) {
    return spawnSync(command, args, options);
  }
  if (process.platform !== "darwin") {
    throw new Error(
      "NETWORK_SANDBOX_UNAVAILABLE: host-native proof execution requires the macOS deny-network sandbox"
    );
  }
  return spawnSync(
    SANDBOX_PATH,
    ["-p", SANDBOX_PROFILE, command, ...args],
    options
  );
}
