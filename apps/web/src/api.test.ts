import { afterEach, describe, expect, it, vi } from "vitest";
import { apiGet } from "./api";

afterEach(() => {
  vi.restoreAllMocks();
});

describe("apiGet", () => {
  it("passes fetch init through unchanged", async () => {
    const fetchMock = vi.spyOn(globalThis, "fetch").mockResolvedValue(
      new Response(JSON.stringify({ ok: true }), {
        status: 200,
        headers: { "Content-Type": "application/json" }
      })
    );

    await expect(apiGet("/api/admin/firstmate/tasks")).resolves.toEqual({ ok: true });

    expect(fetchMock).toHaveBeenCalledWith("/api/admin/firstmate/tasks", undefined);
  });
});
