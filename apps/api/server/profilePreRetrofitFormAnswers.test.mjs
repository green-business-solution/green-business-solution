import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import {
  buildPreRetrofitFormAnswerRecord,
  mergePreRetrofitFormAnswers,
  normalizePreRetrofitFormAnswers,
  PRE_RETROFIT_FORM_ANSWERS_SCHEMA_VERSION
} from "./profilePreRetrofitFormAnswers.mjs";

const now = "2026-07-09T12:00:00.000Z";

describe("profile pre-retrofit form answers", () => {
  it("normalizes submitted answers with question metadata", () => {
    const record = buildPreRetrofitFormAnswerRecord(
      {
        retrofitTypeId: "led_lighting",
        retrofitName: "LED Lighting",
        answers: {
          "led_lighting:fixture_count": "42"
        },
        questions: [
          {
            id: "led_lighting:fixture_count",
            questionId: "lighting_fixture_count",
            canonicalInputKey: "fixture_count",
            collectionSurface: "retrofit_scope_form",
            question: "How many fixtures are being replaced?",
            answerType: "number"
          }
        ]
      },
      { now }
    );

    expect(record).toMatchObject({
      retrofitTypeId: "led_lighting",
      retrofitName: "LED Lighting",
      answerCount: 1,
      answerOrder: ["led_lighting:fixture_count"],
      answers: {
        "led_lighting:fixture_count": {
          catalogQuestionId: "lighting_fixture_count",
          canonicalInputKey: "fixture_count",
          collectionSurface: "retrofit_scope_form",
          answerType: "number",
          value: "42",
          updatedAt: now
        }
      }
    });
  });

  it("merges by retrofit and replaces the submitted retrofit's prior answers", () => {
    const existing = {
      schemaVersion: PRE_RETROFIT_FORM_ANSWERS_SCHEMA_VERSION,
      updatedAt: "2026-07-08T00:00:00.000Z",
      retrofits: {
        hvac: buildPreRetrofitFormAnswerRecord(
          {
            retrofitTypeId: "hvac",
            answers: { "hvac:fuel": "Gas" },
            questions: [{ id: "hvac:fuel", question: "Current fuel?", answerType: "select" }]
          },
          { now: "2026-07-08T00:00:00.000Z" }
        ),
        led_lighting: buildPreRetrofitFormAnswerRecord(
          {
            retrofitTypeId: "led_lighting",
            answers: { "led_lighting:old": "old answer" },
            questions: [{ id: "led_lighting:old", question: "Old question?", answerType: "text" }]
          },
          { now: "2026-07-08T00:00:00.000Z" }
        )
      }
    };
    const nextLedRecord = buildPreRetrofitFormAnswerRecord(
      {
        retrofitTypeId: "led_lighting",
        answers: { "led_lighting:new": "new answer" },
        questions: [{ id: "led_lighting:new", question: "New question?", answerType: "text" }]
      },
      { now }
    );

    const merged = mergePreRetrofitFormAnswers(existing, nextLedRecord, { now });

    expect(Object.keys(merged.retrofits)).toEqual(["hvac", "led_lighting"]);
    expect(merged.retrofits.hvac.answers["hvac:fuel"].value).toBe("Gas");
    expect(merged.retrofits.led_lighting.answers["led_lighting:new"].value).toBe("new answer");
    expect(merged.retrofits.led_lighting.answers["led_lighting:old"]).toBeUndefined();
    expect(merged.updatedAt).toBe(now);
  });

  it("drops malformed stored data instead of exposing it as profile answers", () => {
    expect(
      normalizePreRetrofitFormAnswers({
        retrofits: {
          empty: { answers: {} },
          malformed: { answers: { one: { questionId: "one", value: "" } } }
        }
      })
    ).toBeNull();
  });

  it("keeps the write route out of admin preview endpoints", () => {
    const source = readFileSync(new URL("./index.mjs", import.meta.url), "utf8");
    const adminPreviewSource = source.slice(
      source.indexOf('app.get("/api/admin/client-retrofit-preview/:userId"'),
      source.indexOf('app.post("/api/admin/client-retrofit-recommendations/precompute"')
    );

    expect(source).toContain('app.post("/api/portal/pre-retrofit-form-answers"');
    expect(source).toContain("Pre-retrofit form answers cannot be saved for test-case preview users.");
    expect(adminPreviewSource).not.toContain("savePreRetrofitFormAnswersForUser");
  });
});
