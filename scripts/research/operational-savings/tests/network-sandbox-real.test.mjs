import { connect } from "node:net";
import { expect, test } from "vitest";

function attemptOutboundConnection() {
  return new Promise((resolve, reject) => {
    const socket = connect({
      host: "192.0.2.1",
      port: 9
    });
    const timeout = setTimeout(() => {
      socket.destroy();
      reject(
        new Error(
          "NETWORK_SANDBOX_NOT_MEASURED: outbound connection did not fail immediately"
        )
      );
    }, 2_000);
    socket.once("connect", () => {
      clearTimeout(timeout);
      socket.destroy();
      reject(
        new Error(
          "NETWORK_SANDBOX_BYPASS: outbound connection unexpectedly succeeded"
        )
      );
    });
    socket.once("error", (error) => {
      clearTimeout(timeout);
      resolve(error);
    });
  });
}

test("enforces deny-network policy across the real Vitest process tree", async () => {
  expect(process.platform).toBe("darwin");
  expect(process.env.OS_RESEARCH_NETWORK).toBe("disabled");
  expect(process.env.OS_RESEARCH_NETWORK_ENFORCEMENT).toBe(
    "macos-sandbox-exec-deny-network"
  );
  const error = await attemptOutboundConnection();
  expect(error).toMatchObject({ code: "EPERM" });
});
