import { pathForRoute } from "../../routes";

export const HOME_HOW_IT_WORKS_SECTION_ID = "home-how-it-works";
export const HOME_INSIGHTS_SECTION_ID = "home-insights";
export const HOME_DASHBOARD_SECTION_ID = "home-dashboard";
export const HOME_PRICING_SECTION_ID = "home-pricing";
export const HOME_PRICING_SCROLL_DURATION_MS = 1600;

const HOME_SCROLL_DURATION_STATE_KEY = "homeScrollDurationMs";

function easeInOutCubic(progress: number) {
  return progress < 0.5
    ? 4 * progress * progress * progress
    : 1 - Math.pow(-2 * progress + 2, 3) / 2;
}

export function animateWindowScrollTo(top: number, durationMs: number) {
  if (typeof window === "undefined") {
    return () => undefined;
  }

  const reducedMotion = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
  if (reducedMotion || durationMs <= 0) {
    window.scrollTo({ behavior: "auto", top });
    return () => undefined;
  }

  const startTop = window.scrollY;
  const distance = top - startTop;
  const startTime = performance.now();
  let animationFrame = 0;
  let isFinished = false;

  const removeCancellationListeners = () => {
    window.removeEventListener("wheel", cancel);
    window.removeEventListener("touchstart", cancel);
    window.removeEventListener("pointerdown", cancel);
    window.removeEventListener("keydown", cancel);
  };

  const finish = () => {
    if (isFinished) return;
    isFinished = true;
    window.cancelAnimationFrame(animationFrame);
    removeCancellationListeners();
  };

  function cancel() {
    finish();
  }

  const step = (now: number) => {
    if (isFinished) return;
    const progress = Math.min(1, (now - startTime) / durationMs);
    window.scrollTo({ behavior: "auto", top: startTop + distance * easeInOutCubic(progress) });

    if (progress >= 1) {
      finish();
      return;
    }

    animationFrame = window.requestAnimationFrame(step);
  };

  window.addEventListener("wheel", cancel, { passive: true });
  window.addEventListener("touchstart", cancel, { passive: true });
  window.addEventListener("pointerdown", cancel, { passive: true });
  window.addEventListener("keydown", cancel);
  animationFrame = window.requestAnimationFrame(step);

  return finish;
}

export function takeRequestedHomeScrollDuration() {
  if (typeof window === "undefined") return null;

  const state = window.history.state as Record<string, unknown> | null;
  const durationMs = state?.[HOME_SCROLL_DURATION_STATE_KEY];
  if (typeof durationMs !== "number") return null;

  const nextState = { ...state };
  delete nextState[HOME_SCROLL_DURATION_STATE_KEY];
  window.history.replaceState(nextState, "", window.location.href);
  return durationMs;
}

export function scrollToHomeSectionFallback(
  sectionId: string,
  { durationMs }: { durationMs?: number } = {},
) {
  if (typeof window === "undefined") {
    return;
  }

  const homeSectionPath = `${pathForRoute("home")}#${sectionId}`;

  if (window.location.pathname !== pathForRoute("home")) {
    window.history.pushState(
      durationMs ? { [HOME_SCROLL_DURATION_STATE_KEY]: durationMs } : {},
      "",
      homeSectionPath,
    );
    window.dispatchEvent(new Event("popstate"));
    return;
  }

  const section = document.getElementById(sectionId);
  window.history.replaceState({}, "", homeSectionPath);

  if (!section) {
    return;
  }

  const headerOffset = 96;
  const top = Math.max(0, section.getBoundingClientRect().top + window.scrollY - headerOffset);
  if (durationMs) {
    animateWindowScrollTo(top, durationMs);
  } else {
    window.scrollTo({ behavior: "smooth", top });
  }
}

export function scrollToHomeHowItWorksFallback() {
  scrollToHomeSectionFallback(HOME_HOW_IT_WORKS_SECTION_ID);
}

export function scrollToHomePricingFallback() {
  scrollToHomeSectionFallback(HOME_PRICING_SECTION_ID, {
    durationMs: HOME_PRICING_SCROLL_DURATION_MS,
  });
}
