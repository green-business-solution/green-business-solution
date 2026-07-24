import fsPromises from "node:fs/promises";
import os from "node:os";
import path from "node:path";

import { describe, expect, it } from "vitest";

import {
  createPersistentRunState,
  createRequestMetrics,
  forEachAdaptiveConcurrent,
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
      state.dnsCache.set("example.test", true);
      state.robotsCache.set("https://example.test", {
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
});
