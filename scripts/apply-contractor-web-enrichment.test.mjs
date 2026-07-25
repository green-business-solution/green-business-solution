import assert from "node:assert/strict";

import { test } from "vitest";

import {
  applyReplayPlan,
  buildIdempotentReplayPlan,
  verifyAppliedReplay,
} from "./apply-contractor-web-enrichment.mjs";

function evidence(field, sourceValue) {
  return {
    field,
    matchMethod: "OFFICIAL_WEBSITE",
    retrievedAt: "2026-07-24T19:00:00.000Z",
    sourceId: "contractor_website",
    sourceName: "Contractor website",
    sourceUrl: "https://example.com/contact",
    sourceValue,
    supportingTextSnippet: sourceValue,
    verificationDate: "2026-07-24",
  };
}

function proposal(set) {
  return {
    contractorId: "CA-CSLB-123",
    set,
    append: {
      enrichmentEvidence: Object.entries(set).map(([field, value]) =>
        evidence(
          field,
          Array.isArray(value) ? value.join(", ") : value,
        ),
      ),
    },
  };
}

function contractor(overrides = {}) {
  return {
    contractorId: "CA-CSLB-123",
    licenseStatus: "CLEAR",
    businessName: "Example Electric",
    supportedRetrofitIds: ["led_lighting_retrofit"],
    servesCommercial: "UNKNOWN",
    serviceAreas: ["UNKNOWN"],
    ...overrides,
  };
}

test("plans only unresolved fields and preserves substantive values", () => {
  const plan = buildIdempotentReplayPlan({
    contractors: [
      contractor({
        email: "existing@example.com",
      }),
    ],
    proposals: [
      proposal({
        email: "new@example.com",
        servesCommercial: "YES",
        serviceAreas: ["Alameda County"],
      }),
    ],
  });

  assert.equal(plan.operations.length, 1);
  assert.deepEqual(plan.operations[0].set, {
    servesCommercial: "YES",
    serviceAreas: ["Alameda County"],
  });
  assert.equal(plan.fieldCounts.conflicts.email, 1);
  assert.equal(plan.fieldCounts.toApply.servesCommercial, 1);
  assert.equal(plan.fieldCounts.toApply.serviceAreas, 1);
  assert.deepEqual(
    plan.operations[0].evidenceAdditions.map((entry) => entry.field),
    ["servesCommercial", "serviceAreas"],
  );
});

test("replay is idempotent and appends only missing exact evidence", () => {
  const inputProposal = proposal({
    email: "info@example.com",
  });
  const plan = buildIdempotentReplayPlan({
    contractors: [
      contractor({
        email: "info@example.com",
        enrichmentEvidence:
          inputProposal.append.enrichmentEvidence,
      }),
    ],
    proposals: [inputProposal],
  });

  assert.equal(plan.operations.length, 0);
  assert.equal(plan.fieldCounts.alreadyApplied.email, 1);
  assert.equal(plan.evidenceAlreadyPresent, 1);
});

test("treats DynamoDB UTF-8 replacement of a lone surrogate as idempotent", () => {
  const inputProposal = proposal({
    serviceAreas: ["San Diego County"],
  });
  inputProposal.append.enrichmentEvidence[0].supportingTextSnippet =
    "Call \udcde now";
  const storedEvidence = structuredClone(
    inputProposal.append.enrichmentEvidence,
  );
  storedEvidence[0].supportingTextSnippet = "Call ? now";
  const plan = buildIdempotentReplayPlan({
    contractors: [
      contractor({
        serviceAreas: ["San Diego County"],
        enrichmentEvidence: storedEvidence,
      }),
    ],
    proposals: [inputProposal],
  });

  assert.equal(plan.operations.length, 0);
  assert.equal(plan.evidenceAlreadyPresent, 1);
});

test("conditional conflicts are reported without becoming failures", async () => {
  const plan = buildIdempotentReplayPlan({
    contractors: [contractor()],
    proposals: [proposal({ servesCommercial: "YES" })],
  });
  const result = await applyReplayPlan({
    aws: {
      async updateContractor() {
        const error = new Error("changed concurrently");
        error.name = "ConditionalCheckFailedException";
        throw error;
      },
    },
    operations: plan.operations,
    quiet: true,
  });

  assert.equal(result.appliedCount, 0);
  assert.equal(result.conditionalConflicts.length, 1);
  assert.equal(result.failures.length, 0);
});

test("verification confirms applied fields, evidence, and protected data", () => {
  const inputProposal = proposal({
    servesCommercial: "YES",
    serviceAreas: ["Alameda County"],
  });
  const before = contractor();
  const plan = buildIdempotentReplayPlan({
    contractors: [before],
    proposals: [inputProposal],
  });
  const operation = plan.operations[0];
  const after = {
    ...before,
    ...operation.set,
    enrichmentEvidence: operation.nextEnrichmentEvidence,
  };
  const verification = verifyAppliedReplay({
    afterRows: [after],
    plan,
    writeResult: {
      appliedCount: 1,
      attemptedCount: 1,
      conditionalConflicts: [],
      failures: [],
    },
  });

  assert.equal(verification.status, "PASS");
  assert.equal(verification.protectedRowsVerified, 1);
  assert.equal(verification.setValuesVerified, 2);
  assert.equal(verification.evidenceVerified, 2);
});

test("ineligible and missing contractors never produce writes", () => {
  const inputProposal = proposal({ servesCommercial: "YES" });
  const plan = buildIdempotentReplayPlan({
    contractors: [
      contractor({
        contractorId: "CA-CSLB-OTHER",
        licenseStatus: "EXPIRED",
      }),
    ],
    proposals: [inputProposal],
  });

  assert.equal(plan.operations.length, 0);
  assert.equal(plan.conflicts[0].reason, "contractor_missing");
});
