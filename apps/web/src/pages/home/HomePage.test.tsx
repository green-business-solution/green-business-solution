import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { HomePage } from "./HomePage";

describe("HomePage", () => {
  it("composes the public homepage sections in their established order", () => {
    const html = renderToStaticMarkup(
      <HomePage
        navigate={() => undefined}
        onHowItWorksClick={() => undefined}
        publicAuth={{
          isAdmin: false,
          isSignedIn: false,
          onSignOut: () => undefined,
        }}
      />,
    );
    const sectionMarkers = [
      'id="home-overview"',
      'id="home-insights"',
      'id="home-how-it-works"',
      'id="home-dashboard"',
      'id="home-pricing"',
    ];

    expect(html).toContain('class="public-page home-page"');
    expect(html).toContain('aria-label="Primary"');
    expect(html).toContain('class="site-footer"');
    sectionMarkers.reduce((previousIndex, marker) => {
      const currentIndex = html.indexOf(marker);
      expect(currentIndex).toBeGreaterThan(previousIndex);
      return currentIndex;
    }, -1);
  });

  it("renders poster-first video layers while keeping JPEG canvases available", () => {
    const html = renderToStaticMarkup(
      <HomePage
        navigate={() => undefined}
        onHowItWorksClick={() => undefined}
        publicAuth={{
          isAdmin: false,
          isSignedIn: false,
          onSignOut: () => undefined,
        }}
      />,
    );

    expect(html.match(/<video/g)).toHaveLength(2);
    expect(html.match(/class="scroll-video-scanner-video"/g)).toHaveLength(2);
    expect(html.match(/class="scroll-frame-scanner-canvas"/g)).toHaveLength(2);
    expect(html.match(/data-media-mode="video"/g)).toHaveLength(2);
    expect(html).toContain("hero-poster-720p.jpg");
    expect(html).toContain("forest-poster-720p.jpg");
    expect(html).not.toMatch(/<video[^>]+src=/);
  });
});
