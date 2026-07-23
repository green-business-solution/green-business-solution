import fsPromises from "node:fs/promises";
import path from "node:path";

export async function createPersistentRunState({
  outputDirectory,
  resume,
}) {
  const stateDirectory = path.join(outputDirectory, "state");
  await fsPromises.mkdir(stateDirectory, { recursive: true });
  const paths = {
    dns: path.join(stateDirectory, "dns-cache.json"),
    domainCrawls: path.join(
      stateDirectory,
      "domain-crawl-cache.jsonl",
    ),
    robots: path.join(stateDirectory, "robots-cache.json"),
    progress: path.join(stateDirectory, "progress.json"),
    verifications: path.join(
      stateDirectory,
      "domain-verification-cache.jsonl",
    ),
  };
  const dnsCache = new Map(
    Object.entries(
      resume ? await readJson(paths.dns, {}) : {},
    ),
  );
  const robotsCache = new Map(
    Object.entries(
      resume ? await readJson(paths.robots, {}) : {},
    ),
  );
  const domainCrawlCache = new Map(
    (resume ? await readJsonLines(paths.domainCrawls) : []).map(
      (entry) => [entry.key, entry.value],
    ),
  );
  const verificationCache = new Map(
    (resume ? await readJsonLines(paths.verifications) : []).map(
      (entry) => [entry.key, entry.value],
    ),
  );
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
    async close() {
      await Promise.all([
        domainCrawlAppender.close(),
        verificationAppender.close(),
      ]);
      await this.flush();
    },
    async flush() {
      await Promise.all([
        writeJsonAtomic(
          paths.dns,
          Object.fromEntries(dnsCache),
        ),
        writeJsonAtomic(
          paths.robots,
          Object.fromEntries(robotsCache),
        ),
        writeJsonAtomic(paths.progress, {
          deepPassCompletedIds: [
            ...deepPassCompletedIds,
          ].sort(),
          deepPassImprovedIds: [
            ...deepPassImprovedIds,
          ].sort(),
        }),
        domainCrawlAppender.close(),
        verificationAppender.close(),
      ]);
    },
    markDeepPassCompleted(contractorId, { improved = false } = {}) {
      deepPassCompletedIds.add(contractorId);
      if (improved) {
        deepPassImprovedIds.add(contractorId);
      }
    },
    async setDomainCrawl(key, value) {
      domainCrawlCache.set(key, value);
      await domainCrawlAppender.append({ key, value });
    },
    async setVerification(key, value) {
      verificationCache.set(key, value);
      await verificationAppender.append({ key, value });
    },
  };
}

export async function forEachAdaptiveConcurrent({
  initialConcurrency,
  maxConcurrency,
  metrics,
  onConcurrencyChange = () => {},
  onProgress = () => {},
  shouldStop = () => false,
  values,
  worker,
}) {
  let active = 0;
  let completed = 0;
  let currentConcurrency = Math.max(
    1,
    Math.min(initialConcurrency, maxConcurrency),
  );
  let failed = false;
  let nextIndex = 0;
  let stopped = false;

  return new Promise((resolve, reject) => {
    const finishIfDone = () => {
      if (
        active === 0 &&
        (failed || stopped || nextIndex >= values.length)
      ) {
        resolve({
          completed,
          finalConcurrency: currentConcurrency,
          scheduled: nextIndex,
          stopped,
        });
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
      const previous = currentConcurrency;
      if (
        snapshot.http429 > 0 ||
        pressureRate >= 0.2
      ) {
        currentConcurrency = Math.max(
          4,
          Math.floor(currentConcurrency * 0.75),
        );
      } else if (pressureRate <= 0.05) {
        currentConcurrency = Math.min(
          maxConcurrency,
          currentConcurrency + 2,
        );
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
      if (failed || finishIfDone()) return;
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
          .then(() => {
            completed += 1;
            adjustConcurrency();
            onProgress(completed, values.length);
          })
          .catch((error) => {
            failed = true;
            reject(error);
          })
          .finally(() => {
            active -= 1;
            if (!failed) launch();
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

async function readJsonLines(filePath) {
  try {
    return (await fsPromises.readFile(filePath, "utf8"))
      .split("\n")
      .filter(Boolean)
      .map((line) => JSON.parse(line));
  } catch (error) {
    if (error?.code === "ENOENT") return [];
    throw error;
  }
}

function createJsonLinesAppender(filePath, { truncate }) {
  let queue = truncate
    ? fsPromises.writeFile(filePath, "")
    : Promise.resolve();
  return {
    append(value) {
      queue = queue.then(() =>
        fsPromises.appendFile(
          filePath,
          `${JSON.stringify(value)}\n`,
        ),
      );
      return queue;
    },
    close() {
      return queue;
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
