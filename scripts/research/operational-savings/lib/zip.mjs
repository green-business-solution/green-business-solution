import { execFile, spawn } from "node:child_process";
import { promisify } from "node:util";

const execFileAsync = promisify(execFile);

export async function listZipEntries(path) {
  const { stdout } = await execFileAsync("/usr/bin/unzip", ["-Z1", path], {
    encoding: "utf8",
    maxBuffer: 16 * 1024 * 1024
  });
  return stdout.split(/\r?\n/).filter(Boolean);
}

export async function readZipEntry(path, entry, {
  maxBuffer = 256 * 1024 * 1024
} = {}) {
  const { stdout } = await execFileAsync("/usr/bin/unzip", ["-p", path, entry], {
    encoding: "buffer",
    maxBuffer
  });
  return stdout;
}

export function streamZipEntry(path, entry) {
  const child = spawn("/usr/bin/unzip", ["-p", path, entry], {
    stdio: ["ignore", "pipe", "pipe"]
  });
  const errors = [];
  child.stderr.on("data", (chunk) => errors.push(chunk));
  child.stdout.childProcess = child;
  child.stdout.zipCompletion = new Promise((resolve, reject) => {
    child.once("error", reject);
    child.once("close", (code) => {
      if (code === 0) {
        resolve();
      } else {
        reject(
          new Error(
            `ZIP_ENTRY_READ_FAILED: ${entry}, exit ${code}, ${Buffer.concat(errors).toString("utf8")}`
          )
        );
      }
    });
  });
  return child.stdout;
}
