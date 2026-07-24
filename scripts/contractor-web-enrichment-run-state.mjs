import { once } from "node:events";
import fs from "node:fs";
import fsPromises from "node:fs/promises";
import path from "node:path";
import { createInterface } from "node:readline";

export class PersistentRunStateError extends Error {
  constructor(filePath, cause) {
    super(`Unable to persist run state in ${filePath}.`, {
      cause,
    });
    this.name = "PersistentRunStateError";
    this.filePath = filePath;
  }
}

export async function createPersistentRunState({
  outputDirectory,
  resume,
}) {
  const stateDirectory = path.join(outputDirectory, "state");
  await fsPromises.mkdir(stateDirectory, { recursive: true });
  const paths = {
    dns: path.join(stateDirectory, "dns-cache.jsonl"),
    domainCrawls: path.join(
      stateDirectory,
      "domain-crawl-cache.jsonl",
    ),
    robots: path.join(stateDirectory, "robots-cache.jsonl"),
    progress: path.join(stateDirectory, "progress.json"),
    verifications: path.join(
      stateDirectory,
      "domain-verification-cache.jsonl",
    ),
  };
  if (resume) {
    await Promise.all([
      repairJsonLinesTail(paths.dns),
      repairJsonLinesTail(paths.domainCrawls),
      repairJsonLinesTail(paths.robots),
      repairJsonLinesTail(paths.verifications),
    ]);
  }
  const dnsCache = resume
    ? await readJsonLinesToMap(paths.dns, {
        keyFor: (entry) => entry.key,
        valueFor: (entry) => entry.value,
      })
    : new Map();
  const robotsCache = resume
    ? await readJsonLinesToMap(paths.robots, {
        keyFor: (entry) => entry.key,
        valueFor: (entry) => entry.value,
      })
    : new Map();
  const domainCrawlCache = resume
    ? await readJsonLinesToMap(paths.domainCrawls, {
        keyFor: (entry) => entry.key,
        valueFor: (entry) => entry.value,
      })
    : new Map();
  const verificationCache = resume
    ? await readJsonLinesToMap(paths.verifications, {
        keyFor: (entry) => entry.key,
        valueFor: (entry) => entry.value,
      })
    : new Map();
  const progress = resume
    ? await readJson(paths.progress, {})
    : {};
  const deepPassCompletedIds = new Set(
    progress.deepPassCompletedIds || [],
  );
  const deepPassImprovedIds = new Set(
    progress.deepPassImprovedIds || [],
  );
  const domainCrawlAppender = createJsonLinesAppender(
    paths.domainCrawls,
    { truncate: !resume },
  );
  const dnsAppender = createJsonLinesAppender(paths.dns, {
    truncate: !resume,
  });
  const robotsAppender = createJsonLinesAppender(
    paths.robots,
    { truncate: !resume },
  );
  const verificationAppender = createJsonLinesAppender(
    paths.verifications,
    { truncate: !resume },
  );
  const requestMetrics = createRequestMetrics();

  return {
    dnsCache,
    deepPassCompletedIds,
    deepPassImprovedIds,
    domainCrawlCache,
    paths,
    requestMetrics,
    robotsCache,
    verificationCache,
    async close({ persistProgress = true } = {}) {
      if (persistProgress) {
        await this.flush();
      } else {
        await Promise.all([
          domainCrawlAppender.flush(),
          dnsAppender.flush(),
          robotsAppender.flush(),
          verificationAppender.flush(),
        ]);
      }
      await Promise.all([
        domainCrawlAppender.close(),
        dnsAppender.close(),
        robotsAppender.close(),
        verificationAppender.close(),
      ]);
    },
    async flush() {
      await Promise.all([
        domainCrawlAppender.flush(),
        dnsAppender.flush(),
        robotsAppender.flush(),
        verificationAppender.flush(),
      ]);
      await writeJsonAtomic(paths.progress, {
        deepPassCompletedIds: [
          ...deepPassCompletedIds,
        ].sort(),
        deepPassImprovedIds: [
          ...deepPassImprovedIds,
        ].sort(),
      });
    },
    markDeepPassCompleted(contractorId, { improved = false } = {}) {
      deepPassCompletedIds.add(contractorId);
      if (improved) {
        deepPassImprovedIds.add(contractorId);
      }
    },
    async setDomainCrawl(key, value) {
      domainCrawlCache.set(key, value);
      await appendRunState(
        domainCrawlAppender,
        paths.domainCrawls,
        { key, value },
      );
    },
    async setDns(key, value) {
      dnsCache.set(key, value);
      await appendRunState(dnsAppender, paths.dns, {
        key,
        value,
      });
    },
    async setRobots(key, value) {
      robotsCache.set(key, value);
      await appendRunState(robotsAppender, paths.robots, {
        key,
        value,
      });
    },
    async setVerification(key, value) {
      verificationCache.set(key, value);
      await appendRunState(
        verificationAppender,
        paths.verifications,
        { key, value },
      );
    },
  };
}

export async function forEachAdaptiveConcurrent({
  initialConcurrency,
  maxConcurrency,
  minimumConcurrency = 4,
  metrics,
  onConcurrencyChange = () => {},
  onProgress = () => {},
  pressureConcurrencyFloor = minimumConcurrency,
  shouldStop = () => false,
  values,
  worker,
}) {
  let active = 0;
  let completed = 0;
  const concurrencyFloor = Math.max(
    1,
    Math.min(minimumConcurrency, maxConcurrency),
  );
  const pressureFloor = Math.max(
    concurrencyFloor,
    Math.min(pressureConcurrencyFloor, maxConcurrency),
  );
  let currentConcurrency = Math.max(
    concurrencyFloor,
    Math.min(initialConcurrency, maxConcurrency),
  );
  let serverPressureConstrained = false;
  let failed = false;
  let nextIndex = 0;
  let stopped = false;

  let firstError;
  return new Promise((resolve, reject) => {
    const finishIfDone = () => {
      if (
        active === 0 &&
        (failed || stopped || nextIndex >= values.length)
      ) {
        if (firstError) {
          reject(firstError);
        } else {
          resolve({
            completed,
            finalConcurrency: currentConcurrency,
            scheduled: nextIndex,
            stopped,
          });
        }
        return true;
      }
      return false;
    };

    const adjustConcurrency = () => {
      if (!metrics || completed % 100 !== 0) return;
      const snapshot = metrics.takeWindow();
      if (!snapshot.requests) return;
      const pressureRate =
        (snapshot.http429 +
          snapshot.http5xx +
          snapshot.networkErrors +
          snapshot.timeouts) /
        snapshot.requests;
      const serverPressureRate =
        (snapshot.http429 + snapshot.http5xx) /
        snapshot.requests;
      const previous = currentConcurrency;
      if (serverPressureRate >= 0.05) {
        serverPressureConstrained = true;
        currentConcurrency = Math.max(
          concurrencyFloor,
          Math.floor(currentConcurrency * 0.75),
        );
      } else if (pressureRate >= 0.2) {
        currentConcurrency = Math.max(
          concurrencyFloor,
          serverPressureConstrained
            ? concurrencyFloor
            : pressureFloor,
          Math.floor(currentConcurrency * 0.75),
        );
      } else if (pressureRate <= 0.05) {
        currentConcurrency = Math.min(
          maxConcurrency,
          currentConcurrency + 2,
        );
        if (currentConcurrency >= pressureFloor) {
          serverPressureConstrained = false;
        }
      }
      if (previous !== currentConcurrency) {
        onConcurrencyChange({
          currentConcurrency,
          previousConcurrency: previous,
          snapshot,
        });
      }
    };

    const launch = () => {
      if (finishIfDone() || failed) return;
      if (shouldStop()) stopped = true;
      while (
        !stopped &&
        active < currentConcurrency &&
        nextIndex < values.length
      ) {
        const value = values[nextIndex];
        nextIndex += 1;
        active += 1;
        Promise.resolve()
          .then(() => worker(value))
          .then(async () => {
            completed += 1;
            adjustConcurrency();
            await onProgress(completed, values.length);
          })
          .catch((error) => {
            failed = true;
            firstError ||= error;
          })
          .finally(() => {
            active -= 1;
            if (!finishIfDone() && !failed) launch();
          });
      }
      finishIfDone();
    };

    launch();
  });
}

export function createRequestMetrics() {
  const total = emptyMetrics();
  let window = emptyMetrics();
  return {
    record(outcome) {
      total.requests += 1;
      window.requests += 1;
      if (Object.hasOwn(total, outcome)) {
        total[outcome] += 1;
        window[outcome] += 1;
      }
    },
    snapshot() {
      return { ...total };
    },
    takeWindow() {
      const value = { ...window };
      window = emptyMetrics();
      return value;
    },
  };
}

async function readJson(filePath, fallback) {
  try {
    return JSON.parse(await fsPromises.readFile(filePath, "utf8"));
  } catch (error) {
    if (error?.code === "ENOENT") return fallback;
    throw error;
  }
}

export async function readJsonLinesToMap(
  filePath,
  {
    keyFor,
    valueFor = (value) => value,
  },
) {
  const values = new Map();
  try {
    const input = fs.createReadStream(filePath, {
      encoding: "utf8",
    });
    const lines = createInterface({
      crlfDelay: Number.POSITIVE_INFINITY,
      input,
    });
    for await (const line of lines) {
      if (!line) continue;
      const value = JSON.parse(line);
      values.set(keyFor(value), valueFor(value));
    }
    return values;
  } catch (error) {
    if (error?.code === "ENOENT") return values;
    throw error;
  }
}

async function appendRunState(appender, filePath, value) {
  try {
    await appender.append(value);
  } catch (error) {
    if (error instanceof PersistentRunStateError) throw error;
    throw new PersistentRunStateError(filePath, error);
  }
}

export async function repairJsonLinesTail(filePath) {
  let handle;
  try {
    handle = await fsPromises.open(filePath, "r+");
    const { size } = await handle.stat();
    if (size === 0) return { action: "none", sizeBytes: 0 };
    const byte = Buffer.allocUnsafe(1);
    await handle.read(byte, 0, 1, size - 1);
    if (byte[0] === 0x0a) {
      return { action: "none", sizeBytes: size };
    }

    const blockSize = 64 * 1_024;
    let cursor = size;
    let finalNewlineOffset = -1;
    while (cursor > 0 && finalNewlineOffset < 0) {
      const start = Math.max(0, cursor - blockSize);
      const length = cursor - start;
      const block = Buffer.allocUnsafe(length);
      const { bytesRead } = await handle.read(
        block,
        0,
        length,
        start,
      );
      const index = block.lastIndexOf(0x0a, bytesRead - 1);
      if (index >= 0) {
        finalNewlineOffset = start + index;
      }
      cursor = start;
    }

    const tailStart = finalNewlineOffset + 1;
    const tail = Buffer.allocUnsafe(size - tailStart);
    let tailBytesRead = 0;
    while (tailBytesRead < tail.length) {
      const { bytesRead } = await handle.read(
        tail,
        tailBytesRead,
        tail.length - tailBytesRead,
        tailStart + tailBytesRead,
      );
      if (bytesRead === 0) break;
      tailBytesRead += bytesRead;
    }
    try {
      JSON.parse(tail.subarray(0, tailBytesRead).toString("utf8"));
      await handle.write(Buffer.from("\n"), 0, 1, size);
      return { action: "terminated", sizeBytes: size + 1 };
    } catch (error) {
      if (!(error instanceof SyntaxError)) throw error;
      await handle.truncate(tailStart);
      return { action: "truncated", sizeBytes: tailStart };
    }
  } catch (error) {
    if (error?.code === "ENOENT") {
      return { action: "none", sizeBytes: 0 };
    }
    throw error;
  } finally {
    await handle?.close();
  }
}

function createJsonLinesAppender(filePath, { truncate }) {
  const stream = fs.createWriteStream(filePath, {
    flags: truncate ? "w" : "a",
  });
  let queue = Promise.resolve();
  let closed = false;
  let closePromise;
  let streamError;
  stream.on("error", (error) => {
    streamError ||= error;
  });
  return {
    append(value) {
      if (closed) {
        return Promise.reject(
          new Error(
            `Cannot append to closed state file ${filePath}.`,
          ),
        );
      }
      queue = queue.then(async () => {
        if (streamError) throw streamError;
        if (!stream.write(`${JSON.stringify(value)}\n`)) {
          await once(stream, "drain");
        }
        if (streamError) throw streamError;
      });
      return queue;
    },
    close() {
      if (closePromise) return closePromise;
      closed = true;
      closePromise = (async () => {
        await queue;
        if (streamError) throw streamError;
        const finished = once(stream, "finish");
        stream.end();
        await finished;
        if (streamError) throw streamError;
      })();
      return closePromise;
    },
    flush() {
      if (!closed) {
        queue = queue.then(async () => {
          if (streamError) throw streamError;
          await new Promise((resolve, reject) => {
            stream.write("", (error) => {
              if (error) reject(error);
              else resolve();
            });
          });
          if (streamError) throw streamError;
        });
      }
      return queue.then(() => {
        if (streamError) throw streamError;
      });
    },
  };
}

async function writeJsonAtomic(filePath, value) {
  const temporaryPath = `${filePath}.tmp`;
  await fsPromises.writeFile(
    temporaryPath,
    `${JSON.stringify(value)}\n`,
  );
  await fsPromises.rename(temporaryPath, filePath);
}

function emptyMetrics() {
  return {
    http429: 0,
    http5xx: 0,
    networkErrors: 0,
    requests: 0,
    successes: 0,
    timeouts: 0,
  };
}
