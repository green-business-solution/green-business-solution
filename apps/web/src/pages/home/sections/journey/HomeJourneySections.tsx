import {
  type CSSProperties,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { ScrollFrameScanner } from "../../../../components/ScrollFrameScanner";
import { ArrowUpRightIcon } from "../../../../components/public/PublicIcons";
import {
  homeJourneyFirstFrame,
  homeJourneyFrameCount,
  homeJourneyFrames,
  homeJourneyFrameTiers,
} from "../../../../lib/homeJourneyFrames";
import {
  HOME_JOURNEY_INPUT_IDLE_MS,
  HOME_JOURNEY_MAGNET_DURATION_MS,
  HOME_JOURNEY_MAGNET_IDLE_MS,
  decideHomeJourneyInput,
  getHomeJourneyPositionState,
  isFreshHomeJourneyGesture,
  isHorizontalHomeJourneySwipe,
  shouldStartHomeJourneyMagnet,
  type HomeJourneyInteractionState,
} from "../../../../lib/homeJourneyInteraction";
import type { Route } from "../../../../routes";
import { HomeDashboardPreviewSection } from "../dashboard/HomeDashboardPreviewSection";
import { CustomerPricingSection } from "../pricing/CustomerPricingSection";
import {
  homeHowItWorksSteps,
  howItWorksJourneyCloudLayers,
  howItWorksJourneyStages,
} from "./journey.data";

function smoothHomeJourneyFrameProgress(start: number, end: number, value: number) {
  const normalized = Math.min(1, Math.max(0, (value - start) / Math.max(0.0001, end - start)));
  return normalized * normalized * (3 - 2 * normalized);
}

export function HomeJourneyTransition() {
  return (
    <section aria-labelledby="home-journey-transition-heading" className="home-journey-transition">
      <div className="home-journey-transition-copy">
        <p>From insight to action</p>
        <h2 id="home-journey-transition-heading">See how a clearer retrofit plan becomes a path forward.</h2>
      </div>
    </section>
  );
}

export function HowItWorksJourneySection({
  sectionId,
  withDashboardHandoff = false,
  embedded = false
}: {
  sectionId?: string;
  withDashboardHandoff?: boolean;
  embedded?: boolean;
}) {
  const transitionStart = 0.38;
  const transitionEnd = 0.62;
  const journeyRef = useRef<HTMLElement | null>(null);
  const journeyScrollRef = useRef<HTMLElement | null>(null);
  const activateEmbeddedJourneyRef = useRef<(() => void) | null>(null);
  const firstVisitJourneyPromptShownRef = useRef(false);
  const [sectionProgress, setSectionProgress] = useState(0);
  const [embeddedInteractionState, setEmbeddedInteractionState] =
    useState<HomeJourneyInteractionState>("passing");
  const [showFirstVisitJourneyPrompt, setShowFirstVisitJourneyPrompt] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(() =>
    typeof window !== "undefined" ? window.matchMedia("(prefers-reduced-motion: reduce)").matches : false
  );
  const stages = howItWorksJourneyStages;
  const cloudLayers = howItWorksJourneyCloudLayers;

  useEffect(() => {
    if (!embedded || !showFirstVisitJourneyPrompt) return undefined;

    const dismissPrompt = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setShowFirstVisitJourneyPrompt(false);
      }
    };

    window.addEventListener("keydown", dismissPrompt);
    return () => window.removeEventListener("keydown", dismissPrompt);
  }, [embedded, showFirstVisitJourneyPrompt]);

  const revealScrollUnits = 1.2;
  const journeyScrollUnits = stages.length - 1;
  const revealShare = revealScrollUnits / (revealScrollUnits + journeyScrollUnits);
  const clampProgress = (value: number) => Math.min(1, Math.max(0, value));
  const smootherstep = (value: number) => {
    const clamped = clampProgress(value);
    return clamped * clamped * clamped * (clamped * (clamped * 6 - 15) + 10);
  };
  const smoothstep = (start: number, end: number, value: number) => {
    if (start === end) return value >= end ? 1 : 0;
    const clamped = clampProgress((value - start) / (end - start));
    return clamped * clamped * (3 - 2 * clamped);
  };
  const dashboardHandoffEnabled = withDashboardHandoff && !prefersReducedMotion;
  const dashboardHandoffShare = dashboardHandoffEnabled ? revealShare * 0.82 : 0;
  const journeySectionProgress = dashboardHandoffEnabled
    ? clampProgress((sectionProgress - dashboardHandoffShare) / (1 - dashboardHandoffShare))
    : sectionProgress;
  const revealProgress = Math.min(1, Math.max(0, journeySectionProgress / revealShare));
  const continuousJourneyProgress =
    Math.min(1, Math.max(0, (journeySectionProgress - revealShare) / (1 - revealShare))) * journeyScrollUnits;
  const journeyProgress = prefersReducedMotion
    ? Math.round(continuousJourneyProgress)
    : continuousJourneyProgress;
  const activeStageIndex = Math.min(stages.length - 1, Math.max(0, Math.round(journeyProgress)));
  const activeStage = stages[activeStageIndex];
  const easedRevealProgress = revealProgress * revealProgress * (3 - 2 * revealProgress);
  const cloudTravelProgress = prefersReducedMotion ? 0 : easedRevealProgress;
  const cloudHazeOpacity = prefersReducedMotion
    ? revealProgress < 1
      ? 0.32
      : 0
    : Math.max(0, 0.32 * (1 - easedRevealProgress));
  const cloudSkyOpacity = prefersReducedMotion
    ? revealProgress < 1
      ? 0.78
      : 0
    : Math.max(0, 0.78 * (1 - easedRevealProgress));
  const dashboardHandoffProgress = dashboardHandoffEnabled ? clampProgress(sectionProgress / dashboardHandoffShare) : 1;
  const dashboardHandoffCloudReveal = dashboardHandoffEnabled ? smoothstep(0.12, 0.8, dashboardHandoffProgress) : 1;
  const dashboardHandoffSceneReveal = dashboardHandoffEnabled ? smoothstep(0.72, 1, dashboardHandoffProgress) : 1;
  const dashboardHandoffOverlayOpacity = dashboardHandoffEnabled
    ? smoothstep(0.22, 0.72, dashboardHandoffProgress) * (1 - smoothstep(0.84, 1, dashboardHandoffProgress))
    : 0;
  const dashboardHandoffDarkCloudOpacity =
    dashboardHandoffEnabled
      ? smoothstep(0.26, 0.72, dashboardHandoffProgress) * (1 - smoothstep(0.72, 1, dashboardHandoffProgress))
      : 0;
  const dashboardHandoffHazeOpacity = dashboardHandoffEnabled ? smoothstep(0.58, 0.96, dashboardHandoffProgress) : 0;
  const introHandoffGate = dashboardHandoffEnabled ? smoothstep(0.86, 1, dashboardHandoffProgress) : 1;
  const showIntro = prefersReducedMotion ? revealProgress < 1 : revealProgress < 0.7;
  const baseIntroOpacity = prefersReducedMotion ? 1 : Math.max(0, 1 - revealProgress / 0.55);
  const introOpacity = baseIntroOpacity * introHandoffGate;
  const visualProgress = (() => {
    if (prefersReducedMotion) {
      return activeStageIndex;
    }

    const clamped = Math.min(stages.length - 1, Math.max(0, journeyProgress));
    const whole = Math.floor(clamped);

    if (whole >= stages.length - 1) {
      return stages.length - 1;
    }

    const local = clamped - whole;

    if (local <= transitionStart) {
      return whole;
    }

    if (local >= transitionEnd) {
      return whole + 1;
    }

    const normalized = (local - transitionStart) / (transitionEnd - transitionStart);
    const eased = normalized * normalized * (3 - 2 * normalized);
    return whole + eased;
  })();

  useEffect(() => {
    const journey = journeyRef.current;

    if (!journey) {
      return undefined;
    }

    if (embedded) {
      const scrollSurface = journeyScrollRef.current;

      if (!scrollSurface) {
        return undefined;
      }

      const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
      let interactionState: HomeJourneyInteractionState = "passing";
      let centeredAt = 0;
      let lastDocumentScrollAt = window.performance.now();
      let lastWheelAt: number | null = null;
      let lastLockedInputAt: number | null = null;
      let lastKeyboardAt: number | null = null;
      let magnetTimer: number | null = null;
      let magnetSettleTimer: number | null = null;
      let positionAnimationFrame = 0;
      let magnetAlignmentActive = false;
      let pointerCandidateId: number | null = null;
      let pointerId: number | null = null;
      let pointerStartX = 0;
      let pointerStartScrollLeft = 0;
      let touchStartX: number | null = null;
      let touchStartY: number | null = null;
      let touchLastX: number | null = null;
      let touchLastY: number | null = null;
      let touchHasConsumedInput = false;
      let touchPageHandoffActive = false;

      const getMaxScrollLeft = () => Math.max(0, scrollSurface.scrollWidth - scrollSurface.clientWidth);
      const getCenterOffset = () => {
        const bounds = scrollSurface.getBoundingClientRect();
        return bounds.top + bounds.height / 2 - window.innerHeight / 2;
      };
      const getCenteredScrollY = () => Math.max(0, window.scrollY + getCenterOffset());
      const getMagnetDistance = () => Math.min(120, Math.max(72, window.innerHeight * 0.11));
      const getCenteredTolerance = () => 24;
      const getReleaseDistance = () => Math.min(220, Math.max(160, window.innerHeight * 0.22));
      const hasReleasedInteraction = () => interactionState === "released";
      const syncInteractionState = (nextState: HomeJourneyInteractionState) => {
        if (interactionState === nextState) return;
        interactionState = nextState;
        if (nextState === "centered-awaiting-intent") {
          centeredAt = window.performance.now();
        }
        setEmbeddedInteractionState(nextState);
      };
      const showFirstVisitPrompt = () => {
        if (firstVisitJourneyPromptShownRef.current) {
          return;
        }

        firstVisitJourneyPromptShownRef.current = true;

        try {
          if (window.localStorage.getItem("retrofi-home-how-it-works-prompt-seen") === "true") {
            return;
          }

          window.localStorage.setItem("retrofi-home-how-it-works-prompt-seen", "true");
        } catch {
          // Continue with the in-memory first-visit prompt when storage is unavailable.
        }

        setShowFirstVisitJourneyPrompt(true);
      };
      const updateProgress = () => {
        const maxScrollLeft = getMaxScrollLeft();
        setSectionProgress(maxScrollLeft === 0 ? 0 : clampProgress(scrollSurface.scrollLeft / maxScrollLeft));
      };
      const cancelMagnetAlignment = () => {
        if (magnetTimer !== null) {
          window.clearTimeout(magnetTimer);
          magnetTimer = null;
        }
        if (magnetSettleTimer !== null) {
          window.clearTimeout(magnetSettleTimer);
          magnetSettleTimer = null;
        }
        magnetAlignmentActive = false;
      };
      const releaseInteraction = () => {
        cancelMagnetAlignment();
        lastLockedInputAt = null;
        syncInteractionState("released");
      };
      const activateInteraction = () => {
        if (interactionState === "locked") return;
        cancelMagnetAlignment();
        syncInteractionState("locked");
        lastLockedInputAt = window.performance.now();
        showFirstVisitPrompt();
      };
      const applyJourneyInput = (
        event: WheelEvent | TouchEvent | KeyboardEvent,
        delta: number,
        timestamp: number,
        freshGesture: boolean,
        explicitIntent: boolean,
      ) => {
        const maxScrollLeft = getMaxScrollLeft();
        const decision = decideHomeJourneyInput({
          atEnd: scrollSurface.scrollLeft >= maxScrollLeft - 1,
          atStart: scrollSurface.scrollLeft <= 1,
          direction: delta,
          explicitIntent,
          freshGesture,
          state: interactionState,
        });

        if (decision.activated) {
          activateInteraction();
        } else if (decision.nextState !== interactionState) {
          syncInteractionState(decision.nextState);
        }

        if (decision.released) {
          lastLockedInputAt = timestamp;
          return false;
        }

        if (!decision.consume) return false;
        event.preventDefault();
        scrollSurface.scrollLeft = Math.min(maxScrollLeft, Math.max(0, scrollSurface.scrollLeft + delta));
        lastLockedInputAt = timestamp;
        return true;
      };
      const startMagnetAlignment = () => {
        if (interactionState !== "passing") return;
        cancelMagnetAlignment();
        magnetAlignmentActive = true;
        const targetScrollY = getCenteredScrollY();
        window.scrollTo({
          behavior: mediaQuery.matches ? "auto" : "smooth",
          top: targetScrollY,
        });
        magnetSettleTimer = window.setTimeout(
          () => {
            magnetSettleTimer = null;
            magnetAlignmentActive = false;
            if (interactionState !== "passing") return;
            const centerOffset = getCenterOffset();
            if (Math.abs(centerOffset) <= getCenteredTolerance() * 2) {
              if (Math.abs(centerOffset) > getCenteredTolerance()) {
                window.scrollTo({ top: getCenteredScrollY() });
              }
              syncInteractionState("centered-awaiting-intent");
            }
          },
          mediaQuery.matches ? 0 : HOME_JOURNEY_MAGNET_DURATION_MS + 80,
        );
      };
      const evaluatePosition = () => {
        positionAnimationFrame = 0;
        const centerOffset = getCenterOffset();

        if (
          interactionState === "released" ||
          interactionState === "centered-awaiting-intent"
        ) {
          syncInteractionState(
            getHomeJourneyPositionState({
              centerOffset,
              centeredTolerance: getCenteredTolerance(),
              releaseDistance: getReleaseDistance(),
              state: interactionState,
            }),
          );
        }

        if (interactionState !== "passing" || magnetAlignmentActive) return;
        const elapsedSinceScroll = window.performance.now() - lastDocumentScrollAt;
        const isScrollIdle = elapsedSinceScroll >= HOME_JOURNEY_MAGNET_IDLE_MS;

        if (
          shouldStartHomeJourneyMagnet({
            centerOffset,
            isScrollIdle,
            magnetDistance: getMagnetDistance(),
            state: interactionState,
          })
        ) {
          startMagnetAlignment();
          return;
        }

        if (
          !isScrollIdle &&
          Math.abs(centerOffset) <= getMagnetDistance() &&
          magnetTimer === null
        ) {
          magnetTimer = window.setTimeout(() => {
            magnetTimer = null;
            schedulePositionCheck();
          }, HOME_JOURNEY_MAGNET_IDLE_MS - elapsedSinceScroll);
        }
      };
      const schedulePositionCheck = () => {
        if (!positionAnimationFrame) {
          positionAnimationFrame = window.requestAnimationFrame(evaluatePosition);
        }
      };
      const handleDocumentScroll = () => {
        if (!magnetAlignmentActive) {
          lastDocumentScrollAt = window.performance.now();
          if (magnetTimer !== null) {
            window.clearTimeout(magnetTimer);
            magnetTimer = null;
          }
        }
        schedulePositionCheck();
      };
      const handleUserScrollIntent = () => {
        if (magnetAlignmentActive && interactionState === "passing") {
          cancelMagnetAlignment();
          lastDocumentScrollAt = window.performance.now();
        }
      };
      const handleWheel = (event: WheelEvent) => {
        const timestamp = event.timeStamp || window.performance.now();
        const wheelUnit = event.deltaMode === 1
          ? 16
          : event.deltaMode === 2
            ? scrollSurface.clientWidth
            : 1;
        const delta =
          (Math.abs(event.deltaX) > Math.abs(event.deltaY)
            ? event.deltaX
            : event.deltaY) * wheelUnit;
        const freshWheelGesture = isFreshHomeJourneyGesture(timestamp, lastWheelAt);
        lastWheelAt = timestamp;

        if (interactionState === "locked") {
          applyJourneyInput(
            event,
            delta,
            timestamp,
            isFreshHomeJourneyGesture(timestamp, lastLockedInputAt),
            true,
          );
          return;
        }

        if (
          interactionState === "centered-awaiting-intent" &&
          freshWheelGesture &&
          timestamp - centeredAt >= HOME_JOURNEY_INPUT_IDLE_MS
        ) {
          applyJourneyInput(event, delta, timestamp, false, true);
        }
      };
      const handleTouchStart = (event: TouchEvent) => {
        handleUserScrollIntent();
        const touch = event.touches[0];
        touchStartX = touch?.clientX ?? null;
        touchStartY = touch?.clientY ?? null;
        touchLastX = touchStartX;
        touchLastY = touchStartY;
        touchHasConsumedInput = false;
        touchPageHandoffActive = false;
      };
      const handleTouchMove = (event: TouchEvent) => {
        const touch = event.touches[0];
        const currentX = touch?.clientX;
        const currentY = touch?.clientY;
        if (
          touchStartX == null ||
          touchStartY == null ||
          touchLastX == null ||
          touchLastY == null ||
          currentX == null ||
          currentY == null
        ) return;

        const totalDeltaX = touchStartX - currentX;
        const totalDeltaY = touchStartY - currentY;
        const stepDeltaX = touchLastX - currentX;
        const stepDeltaY = touchLastY - currentY;
        touchLastX = currentX;
        touchLastY = currentY;

        const dominantStepDelta = Math.abs(stepDeltaX) > Math.abs(stepDeltaY)
          ? stepDeltaX
          : stepDeltaY;

        if (touchPageHandoffActive) {
          event.preventDefault();
          window.scrollBy({ top: dominantStepDelta });
          return;
        }

        if (
          interactionState === "centered-awaiting-intent" &&
          isHorizontalHomeJourneySwipe(totalDeltaX, totalDeltaY)
        ) {
          touchHasConsumedInput = applyJourneyInput(
            event,
            stepDeltaX,
            window.performance.now(),
            false,
            true,
          );
          return;
        }

        if (interactionState === "locked") {
          const wasLocked = interactionState === "locked";
          const consumedInput = applyJourneyInput(
            event,
            dominantStepDelta,
            window.performance.now(),
            !touchHasConsumedInput,
            true,
          );
          touchHasConsumedInput = consumedInput || touchHasConsumedInput;

          if (wasLocked && hasReleasedInteraction() && !consumedInput) {
            touchPageHandoffActive = true;
            event.preventDefault();
            window.scrollBy({ top: dominantStepDelta });
          }
        }
      };
      const resetTouch = () => {
        touchStartX = null;
        touchStartY = null;
        touchLastX = null;
        touchLastY = null;
        touchHasConsumedInput = false;
        touchPageHandoffActive = false;
      };
      const handlePointerDown = (event: PointerEvent) => {
        handleUserScrollIntent();
        if (event.pointerType === "touch" || event.button !== 0) return;
        pointerCandidateId = event.pointerId;
        pointerStartX = event.clientX;
        pointerStartScrollLeft = scrollSurface.scrollLeft;
        if (interactionState === "locked") {
          pointerId = event.pointerId;
          scrollSurface.setPointerCapture(event.pointerId);
        }
      };
      const handlePointerMove = (event: PointerEvent) => {
        if (pointerCandidateId !== event.pointerId && pointerId !== event.pointerId) return;
        const bounds = scrollSurface.getBoundingClientRect();
        if (
          event.clientX < bounds.left ||
          event.clientX > bounds.right ||
          event.clientY < bounds.top ||
          event.clientY > bounds.bottom
        ) {
          releasePointer(event);
          releaseInteraction();
          return;
        }

        if (
          pointerId == null &&
          interactionState === "centered-awaiting-intent" &&
          Math.abs(event.clientX - pointerStartX) >= 6
        ) {
          activateInteraction();
          pointerId = event.pointerId;
          scrollSurface.setPointerCapture(event.pointerId);
        }

        if (pointerId !== event.pointerId || interactionState !== "locked") return;

        scrollSurface.scrollLeft = Math.min(
          getMaxScrollLeft(),
          Math.max(0, pointerStartScrollLeft + pointerStartX - event.clientX)
        );
      };
      const releasePointer = (event: PointerEvent) => {
        if (pointerCandidateId !== event.pointerId && pointerId !== event.pointerId) return;
        const capturedPointerId = pointerId;
        pointerCandidateId = null;
        pointerId = null;
        if (
          capturedPointerId !== null &&
          scrollSurface.hasPointerCapture(capturedPointerId)
        ) {
          scrollSurface.releasePointerCapture(capturedPointerId);
        }
      };
      const handlePointerLeave = (event: PointerEvent) => {
        if (event.pointerType === "touch") return;
        resetTouch();
        lastWheelAt = null;
        if (pointerId !== null && scrollSurface.hasPointerCapture(pointerId)) {
          scrollSurface.releasePointerCapture(pointerId);
        }
        pointerCandidateId = null;
        pointerId = null;
        releaseInteraction();
      };
      const handleWindowPointerMove = (event: PointerEvent) => {
        if (interactionState !== "locked" || event.pointerType === "touch") return;
        const bounds = scrollSurface.getBoundingClientRect();
        if (
          event.clientX < bounds.left ||
          event.clientX > bounds.right ||
          event.clientY < bounds.top ||
          event.clientY > bounds.bottom
        ) {
          handlePointerLeave(event);
        }
      };
      const handleKeyDown = (event: KeyboardEvent) => {
        const target = event.target;
        if (
          target instanceof HTMLElement &&
          target !== scrollSurface &&
          target.closest("button, a, input, select, textarea, [role='button']")
        ) {
          return;
        }

        const scrollAmount = Math.max(180, scrollSurface.clientWidth * 0.6);
        let delta: number | null = null;

        if (event.key === "ArrowLeft" || event.key === "ArrowUp" || event.key === "PageUp") delta = -scrollAmount;
        if (event.key === "ArrowRight" || event.key === "ArrowDown" || event.key === "PageDown" || event.key === " ") delta = scrollAmount;
        if (event.key === "Home") delta = -getMaxScrollLeft();
        if (event.key === "End") delta = getMaxScrollLeft();
        if (delta === null) return;

        const timestamp = event.timeStamp || window.performance.now();
        const freshKeyboardGesture =
          !event.repeat && isFreshHomeJourneyGesture(timestamp, lastKeyboardAt);
        lastKeyboardAt = timestamp;

        if (interactionState !== "locked") {
          cancelMagnetAlignment();
          window.scrollTo({
            behavior: "auto",
            top: getCenteredScrollY(),
          });
          syncInteractionState("centered-awaiting-intent");
          applyJourneyInput(event, delta, timestamp, false, true);
          return;
        }

        const wasLocked = interactionState === "locked";
        const consumedInput = applyJourneyInput(
          event,
          delta,
          timestamp,
          freshKeyboardGesture && isFreshHomeJourneyGesture(timestamp, lastLockedInputAt),
          true,
        );

        if (wasLocked && hasReleasedInteraction() && !consumedInput) {
          event.preventDefault();
          window.scrollBy({
            behavior: "auto",
            top: Math.sign(delta) * Math.max(180, window.innerHeight * 0.45),
          });
        }
      };
      const updateMotionPreference = () => {
        setPrefersReducedMotion(mediaQuery.matches);
        updateProgress();
      };

      activateEmbeddedJourneyRef.current = () => {
        if (interactionState === "centered-awaiting-intent") {
          activateInteraction();
        }
      };
      syncInteractionState("passing");
      updateProgress();
      schedulePositionCheck();
      scrollSurface.addEventListener("scroll", updateProgress, { passive: true });
      scrollSurface.addEventListener("wheel", handleWheel, { passive: false });
      scrollSurface.addEventListener("touchstart", handleTouchStart, { passive: true });
      scrollSurface.addEventListener("touchmove", handleTouchMove, { passive: false });
      scrollSurface.addEventListener("touchend", resetTouch);
      scrollSurface.addEventListener("touchcancel", resetTouch);
      scrollSurface.addEventListener("pointerdown", handlePointerDown);
      scrollSurface.addEventListener("pointermove", handlePointerMove);
      scrollSurface.addEventListener("pointerup", releasePointer);
      scrollSurface.addEventListener("pointercancel", releasePointer);
      scrollSurface.addEventListener("pointerleave", handlePointerLeave);
      scrollSurface.addEventListener("keydown", handleKeyDown);
      window.addEventListener("scroll", handleDocumentScroll, { passive: true });
      window.addEventListener("resize", schedulePositionCheck);
      window.addEventListener("pointermove", handleWindowPointerMove, {
        passive: true,
      });
      window.addEventListener("wheel", handleUserScrollIntent, {
        capture: true,
        passive: true,
      });
      mediaQuery.addEventListener("change", updateMotionPreference);

      return () => {
        activateEmbeddedJourneyRef.current = null;
        cancelMagnetAlignment();
        if (positionAnimationFrame) {
          window.cancelAnimationFrame(positionAnimationFrame);
        }
        if (pointerId !== null && scrollSurface.hasPointerCapture(pointerId)) {
          scrollSurface.releasePointerCapture(pointerId);
        }
        scrollSurface.removeEventListener("scroll", updateProgress);
        scrollSurface.removeEventListener("wheel", handleWheel);
        scrollSurface.removeEventListener("touchstart", handleTouchStart);
        scrollSurface.removeEventListener("touchmove", handleTouchMove);
        scrollSurface.removeEventListener("touchend", resetTouch);
        scrollSurface.removeEventListener("touchcancel", resetTouch);
        scrollSurface.removeEventListener("pointerdown", handlePointerDown);
        scrollSurface.removeEventListener("pointermove", handlePointerMove);
        scrollSurface.removeEventListener("pointerup", releasePointer);
        scrollSurface.removeEventListener("pointercancel", releasePointer);
        scrollSurface.removeEventListener("pointerleave", handlePointerLeave);
        scrollSurface.removeEventListener("keydown", handleKeyDown);
        window.removeEventListener("scroll", handleDocumentScroll);
        window.removeEventListener("resize", schedulePositionCheck);
        window.removeEventListener("pointermove", handleWindowPointerMove);
        window.removeEventListener("wheel", handleUserScrollIntent, true);
        mediaQuery.removeEventListener("change", updateMotionPreference);
      };
    }

    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    let animationFrame = 0;
    let autoHandoffActive = false;
    let autoHandoffSettled = false;
    let autoHandoffReturned = false;
    let autoHandoffDirection: "forward" | "reverse" = "forward";
    let touchStartY: number | null = null;
    let autoHandoffStartProgress = 0;
    let autoHandoffStartTime = 0;
    let lastNormalizedProgress = 0;
    let dashboardHandoffDeadzoneConsumed = 0;
    let dashboardHandoffDeadzoneReady = false;
    const autoHandoffDuration = 860;
    const dashboardHandoffDeadzoneDistance = 780;
    const handoffEndProgress = revealShare * 0.82;
    const revealEndProgress = handoffEndProgress + revealShare * (1 - handoffEndProgress);
    const reverseCatchProgress = handoffEndProgress + (revealEndProgress - handoffEndProgress) * 0.78;
    const lerp = (start: number, end: number, progress: number) => start + (end - start) * progress;
    const easeOutCubic = (value: number) => {
      const clamped = clampProgress(value);
      return 1 - Math.pow(1 - clamped, 3);
    };
    const resetDashboardHandoff = () => {
      const scanner = document.querySelector<HTMLElement>(".planet-scan-section");

      if (!scanner) {
        return;
      }

      scanner.classList.remove("planet-scan-section--cloud-handoff");
      scanner.style.removeProperty("--scanner-dashboard-handoff-scale");
      scanner.style.removeProperty("--scanner-dashboard-handoff-y");
    };
    const resetDashboardHandoffDeadzone = () => {
      dashboardHandoffDeadzoneConsumed = 0;
      dashboardHandoffDeadzoneReady = false;
    };
    const getScrollYForProgress = (progress: number) => {
      const scrollDistance = Math.max(1, journey.offsetHeight - window.innerHeight);
      const sectionTop = window.scrollY + journey.getBoundingClientRect().top;
      return sectionTop + scrollDistance * clampProgress(progress);
    };
    const startAutoHandoff = (direction: "forward" | "reverse", normalizedProgress: number, timestamp: number) => {
      autoHandoffActive = true;
      autoHandoffDirection = direction;
      const maxStartProgress = direction === "forward" ? handoffEndProgress : reverseCatchProgress;
      autoHandoffStartProgress = clampProgress(Math.min(Math.max(normalizedProgress, 0), maxStartProgress));
      autoHandoffStartTime = timestamp;
      window.scrollTo(0, getScrollYForProgress(autoHandoffStartProgress));
    };
    const holdDashboardHandoffDeadzone = (scrollAmount: number, normalizedProgress: number) => {
      if (scrollAmount <= 0 || dashboardHandoffDeadzoneReady || normalizedProgress > handoffEndProgress + 0.01) {
        return false;
      }

      dashboardHandoffDeadzoneConsumed += scrollAmount;
      window.scrollTo(0, getScrollYForProgress(0));

      if (dashboardHandoffDeadzoneConsumed >= dashboardHandoffDeadzoneDistance) {
        dashboardHandoffDeadzoneReady = true;
        startAutoHandoff("forward", 0, window.performance.now());
        requestProgressUpdate();
      }

      return true;
    };
    const syncDashboardHandoff = (normalizedProgress: number, isAtHandoffStart: boolean) => {
      const scanner = document.querySelector<HTMLElement>(".planet-scan-section");

      if (!scanner || !withDashboardHandoff || mediaQuery.matches || !isAtHandoffStart) {
        resetDashboardHandoff();
        return;
      }

      const handoffProgress = clampProgress(normalizedProgress / handoffEndProgress);
      const handoffActive = handoffProgress < 0.995;

      if (!handoffActive) {
        resetDashboardHandoff();
        return;
      }

      const handoffScale = 1 + 1.48 * smootherstep(handoffProgress);
      const handoffY = 9 * smootherstep((handoffProgress - 0.24) / 0.56);

      scanner.classList.add("planet-scan-section--cloud-handoff");
      scanner.style.setProperty("--scanner-dashboard-handoff-scale", handoffScale.toFixed(4));
      scanner.style.setProperty("--scanner-dashboard-handoff-y", `${handoffY.toFixed(2)}vh`);
    };

    const updateProgress = () => {
      const timestamp = window.performance.now();
      const bounds = journey.getBoundingClientRect();
      const scrollDistance = Math.max(1, journey.offsetHeight - window.innerHeight);
      let normalizedProgress = Math.min(1, Math.max(0, -bounds.top / scrollDistance));
      const progressDelta = normalizedProgress - lastNormalizedProgress;
      const canAutoHandoff = withDashboardHandoff && !mediaQuery.matches;

      if (canAutoHandoff && bounds.top > 1) {
        autoHandoffActive = false;
        autoHandoffSettled = false;
        autoHandoffReturned = false;
        lastNormalizedProgress = 0;
        resetDashboardHandoffDeadzone();
      }

      if (
        canAutoHandoff &&
        !autoHandoffActive &&
        !autoHandoffSettled &&
        !autoHandoffReturned &&
        bounds.top <= 1 &&
        normalizedProgress < handoffEndProgress - 0.001
      ) {
        if (dashboardHandoffDeadzoneReady) {
          startAutoHandoff("forward", normalizedProgress, timestamp);
        } else {
          normalizedProgress = 0;
          window.scrollTo(0, getScrollYForProgress(0));
        }
      } else if (
        canAutoHandoff &&
        !autoHandoffActive &&
        !autoHandoffSettled &&
        bounds.top <= 1 &&
        normalizedProgress >= handoffEndProgress
      ) {
        autoHandoffSettled = true;
        autoHandoffReturned = false;
      } else if (
        canAutoHandoff &&
        !autoHandoffActive &&
        autoHandoffSettled &&
        bounds.top <= 1 &&
        normalizedProgress < reverseCatchProgress &&
        progressDelta < -0.0005
      ) {
        startAutoHandoff("reverse", normalizedProgress, timestamp);
      } else if (
        canAutoHandoff &&
        !autoHandoffActive &&
        autoHandoffReturned &&
        bounds.top <= 1 &&
        normalizedProgress > 0.001 &&
        progressDelta > 0.0005
      ) {
        if (dashboardHandoffDeadzoneReady) {
          startAutoHandoff("forward", normalizedProgress, timestamp);
        } else {
          normalizedProgress = 0;
          window.scrollTo(0, getScrollYForProgress(0));
        }
      }

      if (autoHandoffActive) {
        const autoProgress = clampProgress((timestamp - autoHandoffStartTime) / autoHandoffDuration);
        const autoTargetProgress = autoHandoffDirection === "forward" ? handoffEndProgress : 0;
        normalizedProgress = lerp(autoHandoffStartProgress, autoTargetProgress, easeOutCubic(autoProgress));
        window.scrollTo(0, getScrollYForProgress(normalizedProgress));

        if (autoProgress >= 1) {
          autoHandoffActive = false;
          autoHandoffSettled = autoHandoffDirection === "forward";
          autoHandoffReturned = autoHandoffDirection === "reverse";
          resetDashboardHandoffDeadzone();
          normalizedProgress = autoTargetProgress;
          window.scrollTo(0, getScrollYForProgress(autoTargetProgress));
        }
      }

      syncDashboardHandoff(normalizedProgress, bounds.top <= 1 || autoHandoffActive);
      setSectionProgress(normalizedProgress);
      lastNormalizedProgress = normalizedProgress;
      animationFrame = 0;

      if (autoHandoffActive) {
        requestProgressUpdate();
      }
    };

    const requestProgressUpdate = () => {
      if (!animationFrame) {
        animationFrame = window.requestAnimationFrame(updateProgress);
      }
    };

    const updateMotionPreference = () => {
      setPrefersReducedMotion(mediaQuery.matches);
      requestProgressUpdate();
    };
    const getCurrentProgress = () => {
      const bounds = journey.getBoundingClientRect();
      const scrollDistance = Math.max(1, journey.offsetHeight - window.innerHeight);

      return {
        bounds,
        normalizedProgress: Math.min(1, Math.max(0, -bounds.top / scrollDistance))
      };
    };
    const startOrLockHandoff = (event: WheelEvent | TouchEvent | KeyboardEvent, scrollDirection: number) => {
      if (!withDashboardHandoff || mediaQuery.matches) {
        return;
      }

      const { bounds, normalizedProgress } = getCurrentProgress();

      if (autoHandoffActive) {
        event.preventDefault();
        return;
      }

      if (
        !autoHandoffSettled &&
        (autoHandoffReturned || normalizedProgress < handoffEndProgress) &&
        bounds.top <= 1 &&
        scrollDirection > 0 &&
        holdDashboardHandoffDeadzone(scrollDirection, normalizedProgress)
      ) {
        event.preventDefault();
        return;
      }

      if (autoHandoffSettled) {
        if (scrollDirection < 0 && bounds.top <= 1 && normalizedProgress <= reverseCatchProgress) {
          event.preventDefault();
          startAutoHandoff("reverse", normalizedProgress, window.performance.now());
          requestProgressUpdate();
        }

        return;
      }

      if (autoHandoffReturned) {
        if (scrollDirection > 0 && bounds.top <= 1 && normalizedProgress < handoffEndProgress + 0.01) {
          event.preventDefault();
          startAutoHandoff("forward", normalizedProgress, window.performance.now());
          requestProgressUpdate();
        }

        return;
      }

      if (bounds.top <= 1 && normalizedProgress < handoffEndProgress && scrollDirection >= 0) {
        event.preventDefault();
        startAutoHandoff("forward", normalizedProgress, window.performance.now());
        requestProgressUpdate();
      }
    };
    const handleWheel = (event: WheelEvent) => {
      startOrLockHandoff(event, event.deltaY);
    };
    const handleTouchStart = (event: TouchEvent) => {
      touchStartY = event.touches[0]?.clientY ?? null;
    };
    const handleTouchMove = (event: TouchEvent) => {
      const currentY = event.touches[0]?.clientY;
      const scrollDirection = touchStartY == null || currentY == null ? 0 : touchStartY - currentY;
      startOrLockHandoff(event, scrollDirection);
    };
    const handleKeyDown = (event: KeyboardEvent) => {
      const scrollKeys = new Set([" ", "ArrowDown", "ArrowUp", "PageDown", "PageUp", "Home", "End"]);

      if (!scrollKeys.has(event.key)) {
        return;
      }

      const scrollDirection = event.key === "ArrowUp" || event.key === "PageUp" || event.key === "Home" ? -1 : 1;
      startOrLockHandoff(event, scrollDirection);
    };

    updateProgress();
    window.addEventListener("scroll", requestProgressUpdate, { passive: true });
    window.addEventListener("resize", requestProgressUpdate);
    window.addEventListener("wheel", handleWheel, { passive: false });
    window.addEventListener("touchstart", handleTouchStart, { passive: true });
    window.addEventListener("touchmove", handleTouchMove, { passive: false });
    window.addEventListener("keydown", handleKeyDown);
    mediaQuery.addEventListener("change", updateMotionPreference);

    return () => {
      window.removeEventListener("scroll", requestProgressUpdate);
      window.removeEventListener("resize", requestProgressUpdate);
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("keydown", handleKeyDown);
      mediaQuery.removeEventListener("change", updateMotionPreference);
      window.cancelAnimationFrame(animationFrame);
      resetDashboardHandoff();
    };
  }, [embedded, stages.length, withDashboardHandoff, revealShare]);

  return (
    <section
      aria-label={embedded ? "How RetroFi works. Scroll horizontally to explore the journey." : undefined}
      className={`how-it-works-journey-section${withDashboardHandoff ? " how-it-works-journey-section--home-handoff" : ""}${embedded ? " how-it-works-journey-section--home-embedded" : ""}`}
      data-interaction-state={embedded ? embeddedInteractionState : undefined}
      id={sectionId}
      ref={(element) => {
        journeyRef.current = element;
        journeyScrollRef.current = element;
      }}
      tabIndex={embedded ? 0 : undefined}
    >
      <div
        className="journey-canvas"
        aria-label="RetroFi business transformation journey"
        style={
          dashboardHandoffEnabled
            ? { backgroundColor: `rgba(22, 32, 27, ${dashboardHandoffSceneReveal.toFixed(4)})` }
            : undefined
        }
      >
        <div className="journey-image-stack" aria-hidden="true" style={{ opacity: dashboardHandoffSceneReveal }}>
          {stages.map((stage, index) => (
            <img
              alt=""
              className="journey-scene-image"
              decoding="async"
              fetchPriority={index === 0 ? "high" : "auto"}
              key={stage.image}
              loading={index < 2 ? "eager" : "lazy"}
              src={stage.image}
              style={{
                opacity:
                  visualProgress >= index
                    ? 1
                    : visualProgress > index - 1
                      ? visualProgress - (index - 1)
                      : 0
              }}
            />
          ))}
        </div>
        <div className="journey-vignette" aria-hidden="true" style={{ opacity: dashboardHandoffSceneReveal }} />
        <div className="journey-cloud-reveal" aria-hidden="true" style={{ opacity: dashboardHandoffCloudReveal }}>
          <div
            className="journey-cloud-sky"
            style={{
              opacity: cloudSkyOpacity,
              transform: `translate3d(${4 * cloudTravelProgress}vw, ${-5 * cloudTravelProgress}vh, 0) scale(${1 + 0.03 * cloudTravelProgress})`
            }}
          />
          <div className="journey-cloud-haze" style={{ opacity: cloudHazeOpacity }} />
          {cloudLayers.map((cloud, index) => {
            const cloudProgress = prefersReducedMotion ? 0 : Math.min(1, cloudTravelProgress * cloud.speed);
            const opacityProgress = Math.min(1, Math.max(0, (cloudProgress - 0.08) / 0.92));
            const layerOpacity = prefersReducedMotion
              ? revealProgress < 1
                ? cloud.opacity * 0.38
                : 0
              : Math.max(0, cloud.opacity * 0.38 * (1 - opacityProgress * opacityProgress));
            const scale = cloud.baseScale + (cloud.exitScale - cloud.baseScale) * cloudProgress;
            const blur = cloud.blur + 8 + cloud.exitBlur * cloudProgress;

            return (
              <div
                className={cloud.className}
                key={`journey-cloud-${index}`}
                style={{
                  filter: `blur(${blur}px)`,
                  height: cloud.height,
                  left: cloud.left,
                  opacity: layerOpacity,
                  top: cloud.top,
                  transform: `translate3d(${cloud.exitX * cloudProgress}vw, ${cloud.exitY * cloudProgress}vh, 0) scale(${scale})`,
                  width: cloud.width
                }}
              />
            );
          })}
        </div>
        {withDashboardHandoff ? (
          <div aria-hidden="true" className="journey-dashboard-handoff" style={{ opacity: dashboardHandoffOverlayOpacity }}>
            <div className="journey-dashboard-handoff-clouds" style={{ opacity: dashboardHandoffDarkCloudOpacity }} />
            <div className="journey-dashboard-handoff-haze" style={{ opacity: dashboardHandoffHazeOpacity }} />
          </div>
        ) : null}
        {showIntro ? (
          <header
            className="journey-intro-copy"
            style={{
              opacity: introOpacity,
              transform: `translate3d(0, calc(-50% - ${32 * cloudTravelProgress}px), 0)`,
            }}
          >
            <p className="journey-intro-eyebrow">How it works</p>
            <h1>From outdated building to high-performing business</h1>
          </header>
        ) : (
          <div className="journey-story-shell">
            <article aria-live="polite" className="journey-story-copy" key={activeStage.title}>
              <p className="journey-step-label">
                Step {String(activeStageIndex + 1).padStart(2, "0")} / {String(stages.length).padStart(2, "0")}
                <span aria-hidden="true">·</span>
                {activeStage.accent}
              </p>
              <h2>{activeStage.title}</h2>
              <p>{activeStage.copy}</p>
            </article>
            <div className="journey-progress" aria-hidden="true">
              <span style={{ transform: `scaleX(${visualProgress / (stages.length - 1)})` }} />
              <div className="journey-progress-dots">
                {stages.map((stage) => (
                  <i className={stage.title === activeStage.title ? "active" : undefined} key={stage.title} />
                ))}
              </div>
            </div>
          </div>
        )}
        {embedded && embeddedInteractionState === "centered-awaiting-intent" ? (
          <button
            className="journey-intent-cue"
            onClick={() => activateEmbeddedJourneyRef.current?.()}
            onPointerDown={(event) => event.stopPropagation()}
            type="button"
          >
            Scroll to explore.
            <span aria-hidden="true">↔</span>
          </button>
        ) : null}
        {embedded && showFirstVisitJourneyPrompt ? (
          <aside
            aria-atomic="true"
            aria-labelledby="journey-first-visit-prompt-title"
            aria-live="polite"
            className="journey-first-visit-prompt"
          >
            <p>How it works</p>
            <h2 id="journey-first-visit-prompt-title">Scroll to explore the journey</h2>
            <span>Each scroll reveals the next step. Keep going to continue down the page.</span>
            <button
              onClick={(event) => {
                event.stopPropagation();
                setShowFirstVisitJourneyPrompt(false);
              }}
              onKeyDown={(event) => {
                if (event.key === " " || event.key === "Enter") {
                  event.preventDefault();
                  event.stopPropagation();
                  setShowFirstVisitJourneyPrompt(false);
                }
              }}
              onPointerDown={(event) => event.stopPropagation()}
              type="button"
            >
              Got it
            </button>
          </aside>
        ) : null}
      </div>
    </section>
  );
}

function HomeHowItWorksSection({
  navigate,
  sectionId
}: {
  navigate: (route: Route) => void;
  sectionId: string;
}) {
  const railRef = useRef<HTMLDivElement | null>(null);
  const journeyDragRef = useRef<{ moved: boolean; pointerId: number; startScrollLeft: number; startX: number } | null>(null);
  const suppressStepClickRef = useRef(false);
  const [activeStepIndex, setActiveStepIndex] = useState(0);
  const [isKeyboardNavigation, setIsKeyboardNavigation] = useState(false);
  const steps = homeHowItWorksSteps;

  const scrollRail = (direction: -1 | 1, animate = true) => {
    const rail = railRef.current;
    if (!rail) return;

    const nextIndex = Math.min(steps.length - 1, Math.max(0, activeStepIndex + direction));
    const nextStep = rail.querySelector<HTMLElement>(`[data-step-index="${nextIndex}"]`);
    nextStep?.scrollIntoView({
      behavior: animate && !window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "smooth" : "auto",
      block: "nearest",
      inline: "center"
    });
    setIsKeyboardNavigation(!animate);
    setActiveStepIndex(nextIndex);
  };

  const activeStep = steps[activeStepIndex];

  return (
    <section aria-labelledby="home-how-it-works-heading" className="home-how-it-works-section" id={sectionId}>
      <div aria-hidden="true" className="home-mist-transition">
        <span className="home-mist-layer home-mist-layer--back" />
        <span className="home-mist-layer home-mist-layer--middle" />
        <span className="home-mist-layer home-mist-layer--front" />
      </div>

      <div className="home-how-it-works-panel">
        <header className="home-how-it-works-header">
          <div>
            <p className="home-how-it-works-eyebrow">How it works</p>
            <h2 id="home-how-it-works-heading">A clear path, whenever you need it.</h2>
            <p className="home-how-it-works-intro">
              Explore the process at your own pace—or head straight to your dashboard.
            </p>
          </div>
          <button className="home-how-dashboard-cta" onClick={() => navigate("portal")} type="button">
            View Dashboard
            <ArrowUpRightIcon />
          </button>
        </header>

        <div
          className="home-how-journey"
          onPointerDown={(event) => {
            const rail = railRef.current;
            if (!rail || event.button !== 0) return;

            journeyDragRef.current = {
              moved: false,
              pointerId: event.pointerId,
              startScrollLeft: rail.scrollLeft,
              startX: event.clientX
            };
            event.currentTarget.setPointerCapture(event.pointerId);
          }}
          onPointerMove={(event) => {
            const drag = journeyDragRef.current;
            const rail = railRef.current;
            if (!drag || !rail || drag.pointerId !== event.pointerId) return;

            if (Math.abs(event.clientX - drag.startX) > 6) {
              drag.moved = true;
            }
            rail.scrollLeft = drag.startScrollLeft + drag.startX - event.clientX;
          }}
          onPointerUp={(event) => {
            const drag = journeyDragRef.current;
            if (drag?.pointerId === event.pointerId) {
              suppressStepClickRef.current = drag.moved;
              journeyDragRef.current = null;
              event.currentTarget.releasePointerCapture(event.pointerId);
              window.setTimeout(() => {
                suppressStepClickRef.current = false;
              }, 0);
            }
          }}
          onPointerCancel={() => {
            journeyDragRef.current = null;
          }}
          onWheel={(event) => {
            const rail = railRef.current;
            const horizontalDelta = Math.abs(event.deltaX) > Math.abs(event.deltaY)
              ? event.deltaX
              : event.shiftKey
                ? event.deltaY
                : 0;

            if (!rail || horizontalDelta === 0) return;

            event.preventDefault();
            rail.scrollLeft += horizontalDelta;
          }}
        >
          <div className={`home-how-scene${isKeyboardNavigation ? " is-keyboard-navigation" : ""}`}>
            <div aria-hidden="true" className="home-how-scene-images">
              {steps.map((step, index) => (
                <img
                  alt=""
                  className={index === activeStepIndex ? "is-active" : undefined}
                  decoding="async"
                  key={step.image}
                  loading={index < 2 ? "eager" : "lazy"}
                  src={step.image}
                />
              ))}
            </div>
            <div aria-hidden="true" className="home-how-scene-vignette" />
            <article aria-live="polite" className="home-how-scene-copy" key={activeStep.title}>
              <p>
                Step {String(activeStepIndex + 1).padStart(2, "0")} / {String(steps.length).padStart(2, "0")}
              </p>
              <h3>{activeStep.title}</h3>
              <span>{activeStep.copy}</span>
            </article>
          </div>

          <div className="home-how-rail-shell">
          <div
            aria-label="How RetroFi works"
            className="home-how-steps-rail"
            onKeyDown={(event) => {
              if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") return;
              event.preventDefault();
              scrollRail(event.key === "ArrowLeft" ? -1 : 1, false);
            }}
            onScroll={(event) => {
              const rail = event.currentTarget;
              const railCenter = rail.scrollLeft + rail.clientWidth / 2;
              const buttons = Array.from(rail.querySelectorAll<HTMLElement>("[data-step-index]"));
              const nearest = buttons.reduce(
                (best, button) => {
                  const center = button.offsetLeft + button.offsetWidth / 2;
                  const distance = Math.abs(center - railCenter);
                  return distance < best.distance
                    ? { distance, index: Number(button.dataset.stepIndex) }
                    : best;
                },
                { distance: Number.POSITIVE_INFINITY, index: activeStepIndex }
              );

              if (nearest.index !== activeStepIndex) {
                setIsKeyboardNavigation(false);
                setActiveStepIndex(nearest.index);
              }
            }}
            ref={railRef}
            role="region"
            tabIndex={0}
          >
            {steps.map((step, index) => (
              <button
                aria-current={index === activeStepIndex ? "step" : undefined}
                className={`home-how-step${index === activeStepIndex ? " is-active" : ""}`}
                data-step-index={index}
                key={step.title}
                onClick={(event) => {
                  if (suppressStepClickRef.current) return;
                  setIsKeyboardNavigation(false);
                  setActiveStepIndex(index);
                  event.currentTarget.scrollIntoView({
                    behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth",
                    block: "nearest",
                    inline: "center"
                  });
                }}
                type="button"
              >
                <span>{String(index + 1).padStart(2, "0")}</span>
                {step.title}
              </button>
            ))}
          </div>
          <p className="home-how-scroll-hint">Scroll horizontally to explore</p>
        </div>
        </div>
      </div>
    </section>
  );
}

export function HomeJourneyFrameSection() {
  const [frameProgress, setFrameProgress] = useState(0);
  const dashboardHandoffOpacity =
    1 - smoothHomeJourneyFrameProgress(0.94, 0.995, frameProgress);
  const handleFrameProgress = useCallback((progress: number) => {
    setFrameProgress((currentProgress) =>
      Math.abs(currentProgress - progress) > 0.0001
        ? progress
        : currentProgress,
    );
  }, []);

  return (
    <div
      className="home-journey-frame-bridge"
      style={{ "--home-journey-first-frame": `url("${homeJourneyFirstFrame}")` } as CSSProperties}
    >
      <ScrollFrameScanner
        afterStickyChildren={
          <>
            <HomeDashboardPreviewSection embeddedInJourney includePricing={false} />
            <div aria-hidden="true" className="home-dashboard-exit-spacer" />
            <CustomerPricingSection />
          </>
        }
        ariaLabel="How RetroFi works and transitions into the performance dashboard"
        className="home-journey-frame-scanner"
        frameTiers={homeJourneyFrameTiers}
        frames={homeJourneyFrames}
        gradientOpacity={dashboardHandoffOpacity}
        onProgress={handleFrameProgress}
        pauseFrameAt={0.5}
        pauseFrameWhileSelector=".home-dashboard-preview-stage--journey-embedded"
        reducedMotionFrameIndex={homeJourneyFrameCount - 1}
        resumeFrameSelector=".home-dashboard-exit-spacer"
        scrollDistanceViewportHeights={3.75}
      />
    </div>
  );
}
