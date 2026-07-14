import { afterEach, describe, expect, it, vi } from "vitest";
import {
  animateWindowScrollTo,
  HOME_PRICING_SCROLL_DURATION_MS,
  scrollToHomePricingFallback,
} from "./homeSections";

afterEach(() => {
  vi.unstubAllGlobals();
});

describe("homepage section scrolling", () => {
  it("moves halfway to Pricing halfway through the slower scroll duration", () => {
    const frames = new Map<number, FrameRequestCallback>();
    let nextFrameId = 0;
    const windowStub = {
      addEventListener: vi.fn(),
      cancelAnimationFrame: vi.fn((frameId: number) => frames.delete(frameId)),
      matchMedia: vi.fn(() => ({ matches: false })),
      removeEventListener: vi.fn(),
      requestAnimationFrame: vi.fn((callback: FrameRequestCallback) => {
        nextFrameId += 1;
        frames.set(nextFrameId, callback);
        return nextFrameId;
      }),
      scrollTo: vi.fn(({ top }: { top: number }) => {
        windowStub.scrollY = top;
      }),
      scrollY: 0,
    };

    vi.stubGlobal("window", windowStub);
    vi.stubGlobal("performance", { now: () => 0 });

    animateWindowScrollTo(1000, HOME_PRICING_SCROLL_DURATION_MS);
    frames.get(1)?.(0);
    frames.get(2)?.(HOME_PRICING_SCROLL_DURATION_MS / 2);
    expect(windowStub.scrollY).toBeCloseTo(500, 5);

    frames.get(3)?.(HOME_PRICING_SCROLL_DURATION_MS);
    expect(windowStub.scrollY).toBeCloseTo(1000, 5);
    expect(windowStub.removeEventListener).toHaveBeenCalledWith("wheel", expect.any(Function));
  });

  it("jumps immediately when reduced motion is requested", () => {
    const scrollTo = vi.fn();
    vi.stubGlobal("window", {
      matchMedia: vi.fn(() => ({ matches: true })),
      scrollTo,
    });

    animateWindowScrollTo(900, HOME_PRICING_SCROLL_DURATION_MS);
    expect(scrollTo).toHaveBeenCalledWith({ behavior: "auto", top: 900 });
  });

  it("carries the slower Pricing duration when navigating to the homepage", () => {
    const pushState = vi.fn();
    const dispatchEvent = vi.fn();
    vi.stubGlobal("window", {
      dispatchEvent,
      history: { pushState },
      location: { pathname: "/about/mission" },
    });

    scrollToHomePricingFallback();

    expect(pushState).toHaveBeenCalledWith(
      { homeScrollDurationMs: HOME_PRICING_SCROLL_DURATION_MS },
      "",
      "/#home-pricing",
    );
    expect(dispatchEvent).toHaveBeenCalledOnce();
  });
});
