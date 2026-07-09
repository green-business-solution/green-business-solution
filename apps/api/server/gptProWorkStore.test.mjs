import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import {
  buildGptProWorkIndex,
  gptProArtifactS3Key,
  gptProObjectPathFromS3Key,
  gptProOutputPathForPromptPath,
  isGptProChatsLocalAuthBypassEnabled,
  resolveGptProWorkBucket,
  validateGptProArtifactPath,
  validateGptProBatchId
} from "./gptProWorkStore.mjs";

describe("GPT Pro work store helpers", () => {
  it("keeps the local chats auth bypass explicit and disabled in Lambda", () => {
    expect(isGptProChatsLocalAuthBypassEnabled({})).toBe(false);
    expect(isGptProChatsLocalAuthBypassEnabled({
      RETROFI_GPT_PRO_CHATS_LOCAL_AUTH_BYPASS: "true"
    })).toBe(false);
    expect(isGptProChatsLocalAuthBypassEnabled({
      RETROFI_GPT_PRO_CHATS_LOCAL_AUTH_BYPASS: "1"
    })).toBe(true);
    expect(isGptProChatsLocalAuthBypassEnabled({
      AWS_EXECUTION_ENV: "AWS_Lambda_nodejs24.x",
      RETROFI_GPT_PRO_CHATS_LOCAL_AUTH_BYPASS: "1"
    })).toBe(false);
  });

  it("keeps GPT Pro work routes scoped to the GPT Pro chats local bypass", () => {
    const source = readFileSync(new URL("./index.mjs", import.meta.url), "utf8");
    const helperSource = source.slice(
      source.indexOf("function isLocalGptProWorkAuthBypassEnabled"),
      source.indexOf('app.get("/api/health"')
    );

    expect(helperSource).toContain("isGptProChatsLocalAuthBypassEnabled(env)");
    expect(helperSource).not.toContain("isFirstmateTasksLocalAuthBypassEnabled(env)");
  });

  it("lets an explicit empty GPT Pro work bucket disable S3", () => {
    expect(resolveGptProWorkBucket({})).toBe("gbs-retrofi-dev-work-059310317821-us-east-1");
    expect(resolveGptProWorkBucket({
      GBS_GPT_PRO_WORK_BUCKET: "gpt-pro-work-bucket"
    })).toBe("gpt-pro-work-bucket");
    expect(resolveGptProWorkBucket({
      GBS_DEV_WORK_BUCKET: "dev-work-bucket",
      GBS_GPT_PRO_WORK_BUCKET: "gpt-pro-work-bucket"
    })).toBe("dev-work-bucket");
    expect(resolveGptProWorkBucket({
      GBS_GPT_PRO_WORK_BUCKET: ""
    })).toBe("");
    expect(resolveGptProWorkBucket({
      GBS_DEV_WORK_BUCKET: "",
      GBS_GPT_PRO_WORK_BUCKET: "gpt-pro-work-bucket"
    })).toBe("");
  });

  it("derives output paths from prompt paths without accepting traversal", () => {
    expect(gptProOutputPathForPromptPath("prompt_001_opportunity.md")).toBe("output_001_opportunity.md");
    expect(gptProOutputPathForPromptPath("nested/gpt_pro_followup_prompts.md")).toBe("nested/gpt_pro_followup_output.md");
    expect(gptProOutputPathForPromptPath("prompts/work_packet.md")).toBe("prompts/output_work_packet.md");

    expect(() => validateGptProBatchId("../bad")).toThrow("Batch is not valid.");
    expect(() => validateGptProArtifactPath("../prompt.md")).toThrow("Artifact path is not valid.");
    expect(() => validateGptProArtifactPath(".DS_Store")).toThrow("Artifact path is not a supported GPT Pro work file.");
  });

  it("maps artifact keys to the configured S3 prefix", () => {
    expect(
      gptProArtifactS3Key({
        batchId: "grant-estimation-repair-2026-07-03",
        prefix: "gpt-pro-work",
        relativePath: "grant_package_research/output_001_program.md"
      })
    ).toBe("gpt-pro-work/grant-estimation-repair-2026-07-03/grant_package_research/output_001_program.md");

    expect(
      gptProObjectPathFromS3Key(
        "gpt-pro-work/grant-estimation-repair-2026-07-03/grant_package_research/prompt_001_program.md",
        "gpt-pro-work"
      )
    ).toEqual({
      batchId: "grant-estimation-repair-2026-07-03",
      relativePath: "grant_package_research/prompt_001_program.md"
    });
    expect(gptProObjectPathFromS3Key("other-prefix/batch/prompt.md", "gpt-pro-work")).toBeNull();
  });

  it("groups files by batch and pairs prompt files with existing outputs", () => {
    const index = buildGptProWorkIndex(
      [
        {
          batchId: "batch-a",
          lastModified: new Date("2026-07-03T00:00:00Z"),
          relativePath: "prompt_001_alpha.md",
          sizeBytes: 100
        },
        {
          batchId: "batch-a",
          lastModified: new Date("2026-07-03T00:01:00Z"),
          relativePath: "output_001_alpha.md",
          sizeBytes: 200
        },
        {
          batchId: "batch-b",
          lastModified: new Date("2026-07-04T00:00:00Z"),
          relativePath: "nested/prompt_001_beta.md",
          sizeBytes: 300
        }
      ],
      { prefix: "gpt-pro-work", storageStatus: "s3" }
    );

    expect(index.currentBatchId).toBe("batch-b");
    expect(index.totals).toMatchObject({
      batchCount: 2,
      objectCount: 3,
      outputCount: 1,
      promptCount: 2,
      totalBytes: 600
    });
    expect(index.batches.find((batch) => batch.batchId === "batch-a")?.promptFiles[0]).toMatchObject({
      outputExists: true,
      outputPath: "output_001_alpha.md",
      promptPath: "prompt_001_alpha.md"
    });
  });
});
