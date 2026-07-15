import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { MissionPage } from "./MissionPage";

const publicAuth = {
  isAdmin: false,
  isSignedIn: false,
  onSignOut: () => undefined,
};

describe("MissionPage", () => {
  it("places the mission statement inside the scroll story before three pillars and the vision", () => {
    const html = renderToStaticMarkup(
      <MissionPage navigate={() => undefined} publicAuth={publicAuth} />,
    );
    const introIndex = html.indexOf("Sustainable retrofits, made practical.");
    const firstPillarIndex = html.indexOf("Clarity from complexity");
    const conclusionIndex = html.indexOf("Making sustainable retrofits the standard");

    expect(html.match(/<article class="mission-chapter/g)).toHaveLength(3);
    expect(introIndex).toBeGreaterThan(-1);
    expect(firstPillarIndex).toBeGreaterThan(introIndex);
    expect(conclusionIndex).toBeGreaterThan(firstPillarIndex);
    expect(html).not.toContain("mission-intro");
    expect(html).toContain('<header class="mission-statement"');
    expect(html).not.toContain("about-section-nav");
  });
});
