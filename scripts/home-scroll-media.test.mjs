import { createHash } from "node:crypto";
import fs from "node:fs";
import path from "node:path";

import { describe, expect, it } from "vitest";

const version = "v20260713-g4-c914aa0e9110";
const mediaDirectory = path.resolve("public/home-scroll-media", version);

describe("homepage scroll media", () => {
  it("preloads only the critical hero poster", () => {
    const indexHtml = fs.readFileSync(path.resolve("index.html"), "utf8");

    expect(indexHtml.match(/rel="preload"/g)).toHaveLength(1);
    expect(indexHtml).toContain(
      `href="/home-scroll-media/${version}/hero-poster-720p.jpg"`,
    );
    expect(indexHtml).not.toContain("forest-poster-720p.jpg");
  });

  it("ships every manifest-pinned asset with its expected bytes and hash", () => {
    const manifest = JSON.parse(fs.readFileSync(
      path.join(mediaDirectory, "manifest.json"),
      "utf8",
    ));

    expect(manifest.version).toBe(version);
    expect(manifest.encoding).toMatchObject({
      audio: false,
      faststart: true,
      fixedGopFrames: 4,
    });

    for (const entry of [...manifest.assets, ...manifest.posters]) {
      const bytes = fs.readFileSync(path.join(mediaDirectory, entry.file));
      expect(bytes.byteLength).toBe(entry.size);
      expect(createHash("sha256").update(bytes).digest("hex")).toBe(entry.sha256);
    }
  });
});
