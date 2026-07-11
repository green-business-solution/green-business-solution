import { describe, expect, it } from "vitest";
import {
  hasCurrentRetrofitRecommendationsPayloadShape,
  filterRetrofitRecommendationsPayload,
  persistentRetrofitRecommendationsS3Key,
  persistentRetrofitRecommendationsStateKey,
  retrofitRecommendationsFingerprint
} from "./retrofitRecommendationsCache.mjs";

describe("retrofit recommendations persistent cache helpers", () => {
  it("builds stable cache identity from the user and intake fingerprint inputs", () => {
    const user = {
      userId: "fake_user_1",
      updatedAt: "2026-07-04T00:00:00.000Z",
      isFakeUser: true
    };
    const intake = {
      userId: "fake_user_1",
      submissionId: "intake_fake_user_1",
      updatedAt: "2026-07-04T00:00:00.000Z",
      nested: { b: 2, a: 1 }
    };

    const fingerprint = retrofitRecommendationsFingerprint(user, intake);

    expect(fingerprint).toMatch(/^[a-f0-9]{64}$/);
    expect(retrofitRecommendationsFingerprint(user, { ...intake, nested: { a: 1, b: 2 } })).toBe(fingerprint);
    expect(persistentRetrofitRecommendationsStateKey(user)).toEqual({
      stateScope: "retrofitRecommendations",
      stateKey: "user:fake_user_1"
    });
    expect(persistentRetrofitRecommendationsS3Key(user, fingerprint)).toBe(
      `runtime-cache/retrofit-recommendations/fake_user_1/${fingerprint}.json`
    );
  });

  it("filters a full payload into a selected-retrofit partial payload", () => {
    const payload = {
      generatedAt: "2026-07-04T00:00:00.000Z",
      summary: { matchedRetrofitCount: 2, matchedOpportunityCount: 3 },
      retrofits: [
        { retrofitTypeId: "insulation", opportunities: [{ id: "a" }, { id: "b" }] },
        { retrofitTypeId: "led_lighting_retrofit", opportunities: [{ id: "c" }] }
      ]
    };

    const partial = filterRetrofitRecommendationsPayload(payload, ["LED_LIGHTING_RETROFIT"]);

    expect(partial.isPartialRecommendations).toBe(true);
    expect(partial.retrofits).toEqual([{ retrofitTypeId: "led_lighting_retrofit", opportunities: [{ id: "c" }] }]);
    expect(partial.summary).toEqual({ matchedRetrofitCount: 1, matchedOpportunityCount: 1 });
  });

  it("requires payback fields on calculated savings preview payloads", () => {
    const validPayload = {
      retrofits: [
        {
          retrofitTypeId: "led_lighting_retrofit",
          savingsPreview: {
            status: "calculated",
            paybackPeriodYears: 1.8,
            paybackPeriodDetails: {
              method: "simple"
            }
          }
        }
      ]
    };
    const stalePayload = {
      retrofits: [
        {
          retrofitTypeId: "led_lighting_retrofit",
          savingsPreview: {
            status: "calculated",
            paybackPeriodYears: 1.8
          }
        }
      ]
    };
    const unsupportedPayload = {
      retrofits: [
        {
          retrofitTypeId: "energy_audit",
          savingsPreview: {
            status: "unsupported"
          }
        }
      ]
    };

    expect(hasCurrentRetrofitRecommendationsPayloadShape(validPayload)).toBe(true);
    expect(hasCurrentRetrofitRecommendationsPayloadShape(stalePayload)).toBe(false);
    expect(hasCurrentRetrofitRecommendationsPayloadShape(unsupportedPayload)).toBe(true);
  });
});
