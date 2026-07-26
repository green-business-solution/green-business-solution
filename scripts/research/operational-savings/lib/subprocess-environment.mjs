import { constants } from "node:fs";
import {
  access,
  lstat,
  realpath
} from "node:fs/promises";
import {
  dirname,
  isAbsolute,
  join,
  resolve
} from "node:path";

export const FIXED_SUBPROCESS_PATH =
  "/usr/local/bin:/opt/homebrew/bin:/usr/bin:/bin";
export const FIXED_GIT_PATH = "/usr/bin/git";
export const FIXED_TAR_PATH = "/usr/bin/tar";
export const FIXED_UNZIP_PATH = "/usr/bin/unzip";
export const FIXED_DOCKER_HOST =
  "unix:///var/run/docker.sock";

const EMPTY_HOME = "/var/empty";
const FIXED_TEMP_DIRECTORY = "/tmp";
const AWS_CLI_CANDIDATES = Object.freeze([
  "/opt/homebrew/bin/aws",
  "/usr/local/bin/aws",
  "/usr/bin/aws"
]);
const DOCKER_CLI_CANDIDATES = Object.freeze([
  "/usr/local/bin/docker",
  "/opt/homebrew/bin/docker",
  "/usr/bin/docker"
]);

function validatedAbsoluteHome(homePath) {
  if (
    typeof homePath !== "string" ||
    !isAbsolute(homePath) ||
    resolve(homePath) !== homePath
  ) {
    throw new Error(
      "SUBPROCESS_HOME_INVALID: an absolute normalized HOME is required"
    );
  }
  return homePath;
}

export function minimalSubprocessEnvironment({
  homePath = EMPTY_HOME,
  additional = {}
} = {}) {
  return {
    HOME: validatedAbsoluteHome(homePath),
    TMPDIR: FIXED_TEMP_DIRECTORY,
    TMP: FIXED_TEMP_DIRECTORY,
    TEMP: FIXED_TEMP_DIRECTORY,
    PATH: FIXED_SUBPROCESS_PATH,
    LANG: "C",
    LC_ALL: "C",
    TZ: "UTC",
    TERM: "dumb",
    CI: "1",
    NO_COLOR: "1",
    ...additional
  };
}

export function gitSubprocessEnvironment() {
  return minimalSubprocessEnvironment({
    additional: {
      GIT_CONFIG_NOSYSTEM: "1",
      GIT_CONFIG_GLOBAL: "/dev/null",
      GIT_CONFIG_SYSTEM: "/dev/null",
      GIT_CONFIG_COUNT: "0",
      GIT_OPTIONAL_LOCKS: "0",
      GIT_TERMINAL_PROMPT: "0",
      GIT_LFS_SKIP_SMUDGE: "1"
    }
  });
}

export function archiveSubprocessEnvironment() {
  return minimalSubprocessEnvironment();
}

export function awsSubprocessEnvironment(
  ambientEnvironment = process.env
) {
  return minimalSubprocessEnvironment({
    homePath: validatedAbsoluteHome(
      ambientEnvironment.HOME
    ),
    additional: {
      AWS_PAGER: "",
      AWS_CLI_AUTO_PROMPT: "off",
      AWS_EC2_METADATA_DISABLED: "true",
      AWS_IGNORE_CONFIGURED_ENDPOINT_URLS: "true"
    }
  });
}

export function dockerSubprocessEnvironment({
  dockerConfig = EMPTY_HOME,
  additional = {}
} = {}) {
  return minimalSubprocessEnvironment({
    additional: {
      DOCKER_CONFIG: validatedAbsoluteHome(dockerConfig),
      DOCKER_HOST: FIXED_DOCKER_HOST,
      ...additional
    }
  });
}

export function nodeSubprocessEnvironment({
  additional = {}
} = {}) {
  return minimalSubprocessEnvironment({
    additional
  });
}

async function verifiedExecutablePath({
  toolId,
  candidates
}) {
  for (const candidate of candidates) {
    try {
      const canonicalPath = await realpath(candidate);
      const details = await lstat(canonicalPath);
      if (
        !details.isFile() ||
        details.isSymbolicLink()
      ) {
        continue;
      }
      await access(canonicalPath, constants.X_OK);
      return canonicalPath;
    } catch (error) {
      if (
        ["ENOENT", "EACCES", "ENOTDIR"].includes(
          error.code
        )
      ) {
        continue;
      }
      throw error;
    }
  }
  throw new Error(
    `TRUSTED_EXECUTABLE_NOT_FOUND: ${toolId}`
  );
}

let awsCliPathPromise;
export function verifiedAwsCliPath() {
  awsCliPathPromise ??= verifiedExecutablePath({
    toolId: "aws",
    candidates: AWS_CLI_CANDIDATES
  });
  return awsCliPathPromise;
}

let dockerCliPathPromise;
export function verifiedDockerCliPath() {
  dockerCliPathPromise ??= verifiedExecutablePath({
    toolId: "docker",
    candidates: DOCKER_CLI_CANDIDATES
  });
  return dockerCliPathPromise;
}

let nodeExecutablePathPromise;
export function verifiedNodeExecutablePath() {
  nodeExecutablePathPromise ??= verifiedExecutablePath({
    toolId: "node",
    candidates: [process.execPath]
  });
  return nodeExecutablePathPromise;
}

let npmCliPathPromise;
export function verifiedNpmCliPath() {
  const nodeDirectory = dirname(process.execPath);
  npmCliPathPromise ??= verifiedExecutablePath({
    toolId: "npm-cli.js",
    candidates: [
      join(
        nodeDirectory,
        "..",
        "lib",
        "node_modules",
        "npm",
        "bin",
        "npm-cli.js"
      ),
      "/opt/homebrew/lib/node_modules/npm/bin/npm-cli.js",
      "/usr/local/lib/node_modules/npm/bin/npm-cli.js",
      "/usr/lib/node_modules/npm/bin/npm-cli.js"
    ]
  });
  return npmCliPathPromise;
}
