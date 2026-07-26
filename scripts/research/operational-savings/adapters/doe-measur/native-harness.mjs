import { mkdtemp, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join, resolve } from "node:path";

import {
  assertNetworkDisabled,
  sha256File
} from "../../lib/artifact.mjs";
import {
  spawnSyncWithNetworkDenied
} from "../../lib/network-isolation.mjs";

function runProcess(command, args, options, label) {
  const result = spawnSyncWithNetworkDenied(
    command,
    args,
    {
      ...options,
      encoding: "utf8",
      maxBuffer: 4 * 1024 * 1024
    },
    {
      forceTopLevelSandbox: false
    }
  );
  if (result.error) throw result.error;
  if (result.status !== 0) {
    throw new Error(
      `${label}: ${
        result.stderr.trim() ||
        result.stdout.trim() ||
        `exit ${result.status}`
      }`
    );
  }
  return result;
}

export async function compileAndRunNativeJsonHarness({
  repositoryPath,
  compiler = process.env.MEASUR_CXX || "/usr/bin/clang++",
  harnessSource,
  sourceFiles,
  executionArgs = [],
  workspacePrefix,
  compileFailureLabel,
  executionFailureLabel
}) {
  assertNetworkDisabled();
  const absoluteRepositoryPath = resolve(repositoryPath);
  const workspace = await mkdtemp(
    join(tmpdir(), workspacePrefix)
  );
  try {
    const harnessPath = join(workspace, "proof.cpp");
    const binaryPath = join(workspace, "proof");
    await writeFile(harnessPath, harnessSource, "utf8");
    const compilerArguments = [
      "-std=c++17",
      "-O0",
      "-I",
      join(absoluteRepositoryPath, "include"),
      harnessPath,
      ...sourceFiles.map((relativePath) =>
        join(absoluteRepositoryPath, relativePath)
      ),
      ...(process.platform === "darwin"
        ? ["-Wl,-no_uuid"]
        : []),
      "-o",
      binaryPath
    ];
    runProcess(
      compiler,
      compilerArguments,
      { cwd: workspace },
      compileFailureLabel
    );
    const compilerVersion = runProcess(
      compiler,
      ["--version"],
      { cwd: workspace },
      "MEASUR_COMPILER_VERSION_FAILED"
    ).stdout.split(/\r?\n/, 1)[0];
    const executableSha256 = await sha256File(binaryPath);
    const execution = runProcess(
      binaryPath,
      executionArgs,
      { cwd: workspace },
      executionFailureLabel
    );
    let nativeOutput;
    try {
      nativeOutput = JSON.parse(execution.stdout);
    } catch (error) {
      throw new Error(
        `MEASUR_NATIVE_OUTPUT_INVALID: ${error.message}: ${execution.stdout}`
      );
    }
    return {
      compilerVersion,
      executableSha256,
      networkMode:
        "macOS sandbox-exec deny network for compilation and execution",
      nativeOutput
    };
  } finally {
    await rm(workspace, { recursive: true, force: true });
  }
}
