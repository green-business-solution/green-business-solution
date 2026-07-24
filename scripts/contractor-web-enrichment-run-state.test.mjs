import fsPromises from "node:fs/promises";
import os from "node:os";
import path from "node:path";

import { describe, expect, it } from "vitest";

import {
  createPersistentRunState,
  createRequestMetrics,
  forEachAdaptiveConcurrent,
  readJsonLinesToMap,
  repairJsonLinesTail,
} from "./contractor-web-enrichment-run-state.mjs";

describe("contractor web-enrichment persistent run state", () => {
  it("restores DNS, robots, crawl, and verification caches", async () => {
    const directory = await fsPromises.mkdtemp(
      path.join(os.tmpdir(), "retrofi-web-state-test-"),
    );
    try {
      const state = await createPersistentRunState({
        outputDirectory: directory,
        resume: false,
      });
      await state.setDns("example.test", true);
      await state.setRobots("https://example.test", {
        rules: [],
      });
      await state.setDomainCrawl("example.test", {
        pageLimit: 1,
        pages: [{ contentSha256: "abc", text: "Example" }],
      });
      await state.setVerification("contractor|example", {
        disposition: "VERIFIED_DOMAIN",
      });
      state.markDeepPassCompleted("CA_CSLB_123", {
        improved: true,
      });
      await state.close();

      const restored = await createPersistentRunState({
        outputDirectory: directory,
        resume: true,
      });
      expect(restored.dnsCache.get("example.test")).toBe(true);
      expect(
        restored.robotsCache.get("https://example.test"),
      ).toEqual({ rules: [] });
      expect(restored.domainCrawlCache.get("example.test")).toMatchObject({
        pageLimit: 1,
      });
      expect(
        restored.verificationCache.get("contractor|example"),
      ).toEqual({ disposition: "VERIFIED_DOMAIN" });
      expect(
        restored.deepPassCompletedIds.has("CA_CSLB_123"),
      ).toBe(true);
      expect(
        restored.deepPassImprovedIds.has("CA_CSLB_123"),
      ).toBe(true);
      await restored.close();
    } finally {
      await fsPromises.rm(directory, {
        force: true,
        recursive: true,
      });
    }
  });

  it("processes a bounded batch with adaptive concurrency", async () => {
    const completed = [];
    const metrics = createRequestMetrics();
    const result = await forEachAdaptiveConcurrent({
      initialConcurrency: 2,
      maxConcurrency: 4,
      metrics,
      values: [1, 2, 3, 4, 5],
      worker: async (value) => {
        metrics.record("successes");
        completed.push(value);
      },
    });

    expect(completed.sort()).toEqual([1, 2, 3, 4, 5]);
    expect(result).toMatchObject({
      completed: 5,
      scheduled: 5,
      stopped: false,
    });
  });

  it("repairs an incomplete JSONL tail before appending resumed state", async () => {
    const directory = await fsPromises.mkdtemp(
      path.join(os.tmpdir(), "retrofi-web-state-tail-test-"),
    );
    try {
      const state = await createPersistentRunState({
        outputDirectory: directory,
        resume: false,
      });
      await state.setDns("first.test", true);
      await state.close();
      await fsPromises.appendFile(
        state.paths.dns,
        '{"key":"incomplete',
      );

      const restored = await createPersistentRunState({
        outputDirectory: directory,
        resume: true,
      });
      expect(restored.dnsCache.get("first.test")).toBe(true);
      await restored.setDns("second.test", false);
      await restored.close();

      const restoredAgain = await createPersistentRunState({
        outputDirectory: directory,
        resume: true,
      });
      expect(restoredAgain.dnsCache.get("first.test")).toBe(true);
      expect(restoredAgain.dnsCache.get("second.test")).toBe(false);
      await restoredAgain.close();
    } finally {
      await fsPromises.rm(directory, {
        force: true,
        recursive: true,
      });
    }
  });

  it("terminates a complete final JSONL record before later appends", async () => {
    const directory = await fsPromises.mkdtemp(
      path.join(os.tmpdir(), "retrofi-web-state-line-test-"),
    );
    const filePath = path.join(directory, "values.jsonl");
    try {
      await fsPromises.writeFile(
        filePath,
        '{"key":"first.test","value":true}',
      );
      await expect(repairJsonLinesTail(filePath)).resolves.toMatchObject({
        action: "terminated",
      });
      await fsPromises.appendFile(
        filePath,
        '{"key":"second.test","value":false}\n',
      );
      const lines = (await fsPromises.readFile(filePath, "utf8"))
        .trim()
        .split("\n")
        .map((line) => JSON.parse(line));
      expect(lines).toHaveLength(2);
    } finally {
      await fsPromises.rm(directory, {
        force: true,
        recursive: true,
      });
    }
  });

  it("streams JSONL maps with last-record-wins semantics", async () => {
    const directory = await fsPromises.mkdtemp(
      path.join(os.tmpdir(), "retrofi-web-state-map-test-"),
    );
    const filePath = path.join(directory, "values.jsonl");
    try {
      await fsPromises.writeFile(
        filePath,
        [
          '{"key":"same.test","value":true}',
          '{"key":"same.test","value":false}',
          "",
        ].join("\n"),
      );
      const values = await readJsonLinesToMap(filePath, {
        keyFor: (entry) => entry.key,
        valueFor: (entry) => entry.value,
      });
      expect(values.get("same.test")).toBe(false);
    } finally {
      await fsPromises.rm(directory, {
        force: true,
        recursive: true,
      });
    }
  });

  it("rejects malformed non-tail JSONL state", async () => {
    const directory = await fsPromises.mkdtemp(
      path.join(os.tmpdir(), "retrofi-web-state-corrupt-test-"),
    );
    const filePath = path.join(directory, "values.jsonl");
    try {
      await fsPromises.writeFile(
        filePath,
        [
          '{"key":"first.test","value":true}',
          '{"key":"broken"',
          '{"key":"last.test","value":false}',
          "",
        ].join("\n"),
      );
      await expect(
        readJsonLinesToMap(filePath, {
          keyFor: (entry) => entry.key,
        }),
      ).rejects.toBeInstanceOf(SyntaxError);
    } finally {
      await fsPromises.rm(directory, {
        force: true,
        recursive: true,
      });
    }
  });

  it("backs off under network pressure without crossing the configured floor", async () => {
    const metrics = createRequestMetrics();
    const result = await forEachAdaptiveConcurrent({
      initialConcurrency: 12,
      maxConcurrency: 32,
      minimumConcurrency: 8,
      metrics,
      values: Array.from({ length: 200 }, (_, index) => index),
      worker: async () => {
        metrics.record("timeouts");
      },
    });

    expect(result).toMatchObject({
      completed: 200,
      finalConcurrency: 8,
      stopped: false,
    });
  });

  it("waits for active workers before rejecting a failed batch", async () => {
    let releaseWorker;
    const workerGate = new Promise((resolve) => {
      releaseWorker = resolve;
    });
    const started = [];
    let settled = false;
    const execution = forEachAdaptiveConcurrent({
      initialConcurrency: 2,
      maxConcurrency: 2,
      values: [1, 2, 3],
      worker: async (value) => {
        started.push(value);
        if (value === 1) throw new Error("expected worker failure");
        await workerGate;
      },
    });
    execution.then(
      () => {
        settled = true;
      },
      () => {
        settled = true;
      },
    );

    await new Promise((resolve) => setImmediate(resolve));
    expect(started.sort()).toEqual([1, 2]);
    expect(settled).toBe(false);

    releaseWorker();
    await expect(execution).rejects.toThrow(
      "expected worker failure",
    );
    expect(started).not.toContain(3);
  });
});
