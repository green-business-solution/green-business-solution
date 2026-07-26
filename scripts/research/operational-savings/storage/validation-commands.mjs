import { execFile } from "node:child_process";
import { promisify } from "node:util";

import {
  nodeSubprocessEnvironment,
  verifiedNodeExecutablePath,
  verifiedNpmCliPath
} from "../lib/subprocess-environment.mjs";

const execFileAsync = promisify(execFile);

export const FULL_OFFLINE_RESEARCH_VALIDATION_STEPS =
  Object.freeze([
    Object.freeze({
      tool: "node",
      args: Object.freeze([
        "scripts/research/operational-savings/validate-research.mjs",
        "--check-cache"
      ])
    }),
    Object.freeze({
      tool: "node",
      args: Object.freeze([
        "scripts/research/operational-savings/run-real-test-suite.mjs",
        "--no-file-parallelism"
      ])
    }),
    Object.freeze({
      tool: "node",
      args: Object.freeze([
        "scripts/research/operational-savings/verify-model-containers.mjs"
      ])
    }),
    Object.freeze({
      tool: "npm",
      args: Object.freeze([
        "run",
        "build",
        "-w",
        "@gbs/web"
      ])
    })
  ]);

export const FULL_OFFLINE_RESEARCH_VALIDATION_COMMAND = [
  "node scripts/research/operational-savings/validate-research.mjs --check-cache",
  "npm run operational-savings:test:real -- --no-file-parallelism",
  "npm run operational-savings:test:containers",
  "npm run build"
].join(" && ");

function combinedOutput(outputs) {
  return outputs
    .map(
      (result) =>
        `$ ${result.displayCommand}\n${result.stdout}${result.stderr}`
    )
    .join("\n");
}

export async function runFullOfflineResearchValidation({
  repoRoot,
  command
}) {
  if (command !== FULL_OFFLINE_RESEARCH_VALIDATION_COMMAND) {
    throw new Error(
      "OFFLINE_VALIDATION_COMMAND_MISMATCH"
    );
  }
  const [nodePath, npmCliPath] = await Promise.all([
    verifiedNodeExecutablePath(),
    verifiedNpmCliPath()
  ]);
  const outputs = [];
  for (const step of FULL_OFFLINE_RESEARCH_VALIDATION_STEPS) {
    const executable = nodePath;
    const args =
      step.tool === "npm"
        ? [npmCliPath, ...step.args]
        : [...step.args];
    const displayCommand =
      step.tool === "npm"
        ? `node ${npmCliPath} ${step.args.join(" ")}`
        : `node ${step.args.join(" ")}`;
    try {
      const { stdout, stderr } = await execFileAsync(
        executable,
        args,
        {
          cwd: repoRoot,
          encoding: "utf8",
          maxBuffer: 64 * 1024 * 1024,
          env: nodeSubprocessEnvironment()
        }
      );
      outputs.push({
        displayCommand,
        exitCode: 0,
        stdout,
        stderr
      });
    } catch (error) {
      outputs.push({
        displayCommand,
        exitCode:
          typeof error.code === "number"
            ? error.code
            : 1,
        stdout: error.stdout ?? "",
        stderr: error.stderr ?? error.message
      });
      return {
        exitCode: outputs.at(-1).exitCode,
        stdout: combinedOutput(outputs),
        stderr: outputs.at(-1).stderr
      };
    }
  }
  return {
    exitCode: 0,
    stdout: combinedOutput(outputs),
    stderr: ""
  };
}
