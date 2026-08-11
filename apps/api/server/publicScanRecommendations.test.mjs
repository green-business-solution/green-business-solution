import { readFileSync } from "node:fs";
import { describe, expect, it, vi } from "vitest";
import {
  resolvePublicScanRecommendationContext,
  sanitizePublicScanRecommendationPayload
} from "./publicScanRecommendations.mjs";

describe("public scan recommendation access", () => {
  it("resolves an active client only after the scoped upload session is verified", async () => {
    const intake = { submissionId: "intake_1" };
    const user = { userId: "user_1", role: "client", status: "active" };
    const verifyEnergyUploadSession = vi.fn().mockResolvedValue(intake);
    const getUserRecord = vi.fn().mockResolvedValue(user);

    await expect(
      resolvePublicScanRecommendationContext(
        { userId: " user_1 ", uploadToken: " token_1 " },
        { getUserRecord, verifyEnergyUploadSession }
      )
    ).resolves.toEqual({ intake, user });
    expect(verifyEnergyUploadSession).toHaveBeenCalledWith("user_1", "token_1");
    expect(getUserRecord).toHaveBeenCalledWith("user_1");
  });

  it("rejects missing session credentials before reading profile data", async () => {
    const verifyEnergyUploadSession = vi.fn();
    const getUserRecord = vi.fn();

    await expect(
      resolvePublicScanRecommendationContext(
        { userId: "user_1", uploadToken: "" },
        { getUserRecord, verifyEnergyUploadSession }
      )
    ).rejects.toMatchObject({
      message: "A valid free-scan session is required to load recommendations.",
      status: 400
    });
    expect(verifyEnergyUploadSession).not.toHaveBeenCalled();
    expect(getUserRecord).not.toHaveBeenCalled();
  });

  it.each([
    null,
    { userId: "admin_1", role: "admin", status: "active" },
    { userId: "user_1", role: "client", status: "inactive" }
  ])("rejects a missing or unauthorized client record", async (user) => {
    const verifyEnergyUploadSession = vi.fn().mockResolvedValue({ submissionId: "intake_1" });
    const getUserRecord = vi.fn().mockResolvedValue(user);

    await expect(
      resolvePublicScanRecommendationContext(
        { userId: "user_1", uploadToken: "token_1" },
        { getUserRecord, verifyEnergyUploadSession }
      )
    ).rejects.toMatchObject({ status: 404 });
  });

  it("removes the stored upload-token hash from recommendation responses", () => {
    const payload = {
      intake: {
        submissionId: "intake_1",
        energyDataUploadSession: {
          tokenHash: "private-hash",
          expiresAt: "2026-09-01T00:00:00.000Z"
        }
      },
      retrofits: []
    };

    expect(sanitizePublicScanRecommendationPayload(payload)).toEqual({
      intake: { submissionId: "intake_1" },
      retrofits: []
    });
  });

  it("guards both public recommendation routes with the scoped session resolver", () => {
    const source = readFileSync(new URL("./index.mjs", import.meta.url), "utf8");
    const routes = source.slice(
      source.indexOf('app.post("/api/scan/retrofit-preview"'),
      source.indexOf('app.post("/api/energy-data/session"')
    );

    expect(routes).toContain('app.post("/api/scan/retrofit-preview"');
    expect(routes).toContain('app.post("/api/scan/retrofit-recommendations"');
    expect(routes.match(/resolvePublicScanRecommendationContext/g)).toHaveLength(2);
    expect(routes.match(/sanitizePublicScanRecommendationPayload/g)).toHaveLength(2);
    expect(routes).not.toContain('app.get("/api/scan/');
  });
});
