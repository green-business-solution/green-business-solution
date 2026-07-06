import { describe, expect, it } from "vitest";
import {
  clearFormQuestionCatalogCache,
  formQuestionCatalogCacheVersion,
  loadFormQuestionCatalog,
  readFormQuestionCatalog
} from "./formQuestionCatalog.mjs";

function fakeClient(handler) {
  return {
    send(command) {
      return handler(command);
    }
  };
}

describe("form question catalog loader", () => {
  it("uses an empty bundled fallback so production catalog data stays in AWS", () => {
    clearFormQuestionCatalogCache();
    const catalog = readFormQuestionCatalog();

    expect(catalog.catalogId).toBe("empty_form_question_catalog");
    expect(Object.keys(catalog.retrofit.questions)).toHaveLength(0);
  });

  it("prefers DynamoDB over S3 and bundled fallback", async () => {
    clearFormQuestionCatalogCache();
    const catalog = {
      schemaVersion: "retrofi_form_question_catalog.v1",
      catalogId: "ddb_catalog",
      version: "v1",
      retrofit: { questions: {}, bindings: [], defaultQuestionIds: [] },
      application: { requirementSections: {}, requirementTypeMappings: {} }
    };

    const loaded = await loadFormQuestionCatalog({
      db: fakeClient(() => ({ Item: { catalog } })),
      s3: fakeClient(() => {
        throw new Error("S3 should not be read when DynamoDB has a catalog.");
      }),
      tableName: "runtime",
      bucketName: "runtime-bucket",
      cacheTtlMs: 0,
      logger: { warn: () => {} }
    });

    expect(loaded.catalogId).toBe("ddb_catalog");
    expect(formQuestionCatalogCacheVersion(loaded)).toBe("retrofi_form_question_catalog.v1:ddb_catalog:v1");
  });

  it("falls back to S3 when DynamoDB has no catalog", async () => {
    clearFormQuestionCatalogCache();
    const catalog = {
      schemaVersion: "retrofi_form_question_catalog.v1",
      catalogId: "s3_catalog",
      version: "v2",
      retrofit: { questions: {}, bindings: [], defaultQuestionIds: [] },
      application: { requirementSections: {}, requirementTypeMappings: {} }
    };

    const loaded = await loadFormQuestionCatalog({
      db: fakeClient(() => ({ Item: null })),
      s3: fakeClient(() => ({
        Body: {
          transformToString: async () => JSON.stringify(catalog)
        }
      })),
      tableName: "runtime",
      bucketName: "runtime-bucket",
      cacheTtlMs: 0,
      logger: { warn: () => {} }
    });

    expect(loaded.catalogId).toBe("s3_catalog");
  });
});
