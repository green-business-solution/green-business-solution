import { expect, test } from "vitest";

import { validateResearch } from "../validate-research.mjs";

test("generated operational-savings research is complete and internally consistent", async () => {
  const report = await validateResearch();
  expect(report.errors).toEqual([]);
  expect(report.counts.standards).toBe(19);
  expect(report.counts.categories).toBe(54);
  expect(report.counts.processes).toBe(124);
  expect(report.counts.inputBindings).toBe(632);
  expect(report.counts.outputBindings).toBe(215);
  expect(report.counts.formulaTerms).toBe(497);
  expect(report.counts.samples).toBe(19);
});
