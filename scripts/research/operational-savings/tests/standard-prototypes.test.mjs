import { readFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { expect, test } from "vitest";

import {
  runStandardPrototype,
  validateResult
} from "../adapter-prototype.mjs";

const catalogPath = fileURLToPath(new URL("../research-catalog.json", import.meta.url));
const catalog = JSON.parse(await readFile(catalogPath, "utf8"));

function assertApproximately(actual, expected, path = "value") {
  if (typeof expected === "number") {
    expect(typeof actual, `${path} must be numeric`).toBe("number");
    const tolerance = Math.max(1e-6, Math.abs(expected) * 1e-8);
    expect(
      Math.abs(actual - expected),
      `${path}: expected ${expected}, received ${actual}`
    ).toBeLessThanOrEqual(tolerance);
    return;
  }
  if (expected && typeof expected === "object" && !Array.isArray(expected)) {
    for (const [key, value] of Object.entries(expected)) {
      assertApproximately(actual?.[key], value, `${path}.${key}`);
    }
    return;
  }
  expect(actual, path).toEqual(expected);
}

test("catalog contains all 19 unique canonical standards", () => {
  expect(catalog.standards).toHaveLength(19);
  expect(new Set(catalog.standards.map((standard) => standard.id)).size).toBe(19);
});

for (const standard of catalog.standards) {
  test(`${standard.id} executes deterministically offline`, () => {
    const first = runStandardPrototype(standard);
    const second = runStandardPrototype(standard);
    expect(second).toEqual(first);
    validateResult(first);
    assertApproximately(first.value, standard.prototype.expected);
    expect(first.standardId).toBe(standard.id);
    expect(first.scope).toBe("RESEARCH_PROTOTYPE");
    expect(first.provenance.sha256).toHaveLength(64);
  });
}

test("exact lookup fails closed when an identifier is ambiguous", () => {
  const standard = structuredClone(
    catalog.standards.find((candidate) => candidate.prototype.operation === "exactLookup")
  );
  const matchingRecord = standard.prototype.records.find((record) =>
    Object.entries(standard.prototype.query).every(([key, expected]) => record[key] === expected)
  );
  standard.prototype.records.push(structuredClone(matchingRecord));
  const result = runStandardPrototype(standard);
  expect(result.kind).toBe("unavailable");
  expect(result.value.reasonCode).toBe("AMBIGUOUS_EXACT_MATCH");
  expect(result.sampleSize).toBe(2);
});

test("requirements filtering retains an ambiguous population without selecting a value", () => {
  const standard = structuredClone(
    catalog.standards.find((candidate) => candidate.id === "STD-WATERSENSE-FIXTURES")
  );
  standard.prototype.records.push({
    ...structuredClone(standard.prototype.records[0]),
    modelNumber: "SECOND-ELIGIBLE-MODEL"
  });
  const result = runStandardPrototype(standard);
  expect(result.kind).toBe("input_set");
  expect(result.sampleSize).toBe(2);
  expect(result.value).toEqual({ eligibleCount: 2 });
  expect(result.warnings).toHaveLength(1);
});
