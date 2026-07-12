import { ReactNode, useEffect, useRef, useState } from "react";

type ScrollFrameScannerProps = {
  afterStickyChildren?: ReactNode;
  ariaLabel?: string;
  ariaLabelledBy?: string;
  children?: ReactNode;
  className?: string;
  frames: string[];
  gradientOpacity?: number;
  id?: string;
  onProgress?: (progress: number) => void;
  pauseFrameAt?: number;
  pauseFrameWhileSelector?: string;
  reducedMotionFrameIndex?: number;
  resumeFrameSelector?: string;
  scrollDistanceViewportHeights?: number;
};

type FrameLoadState = "error" | "idle" | "loaded" | "loading";

const BACKGROUND_PRELOAD_BATCH_SIZE = 6;
const BACKGROUND_PRELOAD_DELAY_MS = 40;
const FRAME_PRELOAD_RADIUS = 8;
const LARGE_SEQUENCE_CACHE_LIMIT = 24;
const LARGE_SEQUENCE_THRESHOLD = 80;
const MAX_CONCURRENT_FRAME_LOADS = 6;

function clamp(value: number, min = 0, max = 1) {
  return Math.min(max, Math.max(min, value));
}

function smoothstep(start: number, end: number, value: number) {
  if (start === end) {
    return value >= end ? 1 : 0;
  }

  const progress = clamp((value - start) / (end - start));
  return progress * progress * (3 - 2 * progress);
}

function drawCoverImage(canvas: HTMLCanvasElement, image: HTMLImageElement) {
  if (typeof canvas.getContext !== "function") {
    return false;
  }

  const context = canvas.getContext("2d");

  if (!context) {
    return false;
  }

  const rect = canvas.getBoundingClientRect();
  const maximumPixelRatio = window.matchMedia("(max-width: 768px)").matches
    ? 1.5
    : 2;
  const pixelRatio = Math.min(
    window.devicePixelRatio || 1,
    maximumPixelRatio,
  );
  const nextWidth = Math.max(1, Math.round(rect.width * pixelRatio));
  const nextHeight = Math.max(1, Math.round(rect.height * pixelRatio));

  if (canvas.width !== nextWidth || canvas.height !== nextHeight) {
    canvas.width = nextWidth;
    canvas.height = nextHeight;
  }

  const imageRatio = image.naturalWidth / image.naturalHeight;
  const canvasRatio = canvas.width / canvas.height;
  let sourceWidth = image.naturalWidth;
  let sourceHeight = image.naturalHeight;
  let sourceX = 0;
  let sourceY = 0;

  if (imageRatio > canvasRatio) {
    sourceWidth = image.naturalHeight * canvasRatio;
    sourceX = (image.naturalWidth - sourceWidth) / 2;
  } else {
    sourceHeight = image.naturalWidth / canvasRatio;
    sourceY = (image.naturalHeight - sourceHeight) / 2;
  }

  context.clearRect(0, 0, canvas.width, canvas.height);
  context.imageSmoothingEnabled = true;
  context.imageSmoothingQuality = "high";
  context.drawImage(image, sourceX, sourceY, sourceWidth, sourceHeight, 0, 0, canvas.width, canvas.height);
  return true;
}

export function ScrollFrameScanner({
  afterStickyChildren,
  ariaLabel,
  ariaLabelledBy,
  children,
  className,
  frames,
  gradientOpacity,
  id,
  onProgress,
  pauseFrameAt,
  pauseFrameWhileSelector,
  reducedMotionFrameIndex = 0,
  resumeFrameSelector,
  scrollDistanceViewportHeights
}: ScrollFrameScannerProps) {
  const sectionRef = useRef<HTMLElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const imagesRef = useRef<Array<HTMLImageElement | null>>([]);
  const loadStatesRef = useRef<FrameLoadState[]>([]);
  const currentFrameRef = useRef(-1);
  const onProgressRef = useRef(onProgress);
  const [isInitialFrameLoaded, setIsInitialFrameLoaded] = useState(false);

  useEffect(() => {
    onProgressRef.current = onProgress;
  }, [onProgress]);

  useEffect(() => {
    const section = sectionRef.current;
    const canvas = canvasRef.current;

    if (!section || !canvas || frames.length === 0) {
      return undefined;
    }

    let activeLoads = 0;
    let backgroundCursor = 0;
    let backgroundPreloadObserver: IntersectionObserver | null = null;
    let backgroundPreloadTimer: number | null = null;
    let isDisposed = false;
    let lastReportedProgress = -1;
    let scrollAnimationFrame = 0;
    let targetFrameIndex = 0;
    const everLoaded = Array.from({ length: frames.length }, () => false);
    const loadQueue: number[] = [];
    const queuedFrames = new Set<number>();
    const reducedMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const compactViewportQuery = window.matchMedia("(max-width: 768px)");
    const connection = (
      navigator as Navigator & { connection?: { saveData?: boolean } }
    ).connection;
    const shouldLimitBackgroundPreload = () =>
      reducedMotionQuery.matches ||
      compactViewportQuery.matches ||
      connection?.saveData === true;
    const safeReducedMotionFrameIndex = Math.min(frames.length - 1, Math.max(0, reducedMotionFrameIndex));
    const initialFrameIndex = reducedMotionQuery.matches ? safeReducedMotionFrameIndex : 0;
    const canDrawToCanvas = (() => {
      try {
        return typeof canvas.getContext === "function" && Boolean(canvas.getContext("2d"));
      } catch {
        return false;
      }
    })();
    const primaryMessage = section.querySelector<HTMLElement>(".planet-scan-message-primary");
    const nextMessage = section.querySelector<HTMLElement>(".planet-scan-message-next");
    imagesRef.current = Array.from({ length: frames.length }, () => null);
    loadStatesRef.current = Array.from({ length: frames.length }, () => "idle");
    currentFrameRef.current = -1;
    setIsInitialFrameLoaded(false);

    const getBestLoadedFrameIndex = (targetIndex: number) => {
      if (loadStatesRef.current[targetIndex] === "loaded" && imagesRef.current[targetIndex]) {
        return targetIndex;
      }

      for (let distance = 1; distance < frames.length; distance += 1) {
        const previousIndex = targetIndex - distance;
        const nextIndex = targetIndex + distance;

        if (
          previousIndex >= 0 &&
          loadStatesRef.current[previousIndex] === "loaded" &&
          imagesRef.current[previousIndex]
        ) {
          return previousIndex;
        }

        if (
          nextIndex < frames.length &&
          loadStatesRef.current[nextIndex] === "loaded" &&
          imagesRef.current[nextIndex]
        ) {
          return nextIndex;
        }
      }

      return -1;
    };

    const getScrollProgress = () => {
      const scrollDistance = Math.max(
        1,
        scrollDistanceViewportHeights === undefined
          ? section.offsetHeight - window.innerHeight
          : window.innerHeight * Math.max(0, scrollDistanceViewportHeights - 1)
      );

      if (pauseFrameAt !== undefined && pauseFrameWhileSelector) {
        const pauseTarget = section.querySelector<HTMLElement>(pauseFrameWhileSelector);

        if (pauseTarget) {
          const pauseTargetBounds = pauseTarget.getBoundingClientRect();

          if (pauseTargetBounds.top <= 0 && pauseTargetBounds.bottom >= 0) {
            return clamp(pauseFrameAt);
          }
        }
      }

      if (pauseFrameAt !== undefined && resumeFrameSelector) {
        const resumeTarget = section.querySelector<HTMLElement>(resumeFrameSelector);

        if (resumeTarget) {
          const resumeTargetBounds = resumeTarget.getBoundingClientRect();

          if (resumeTargetBounds.top <= 0) {
            const resumeDistance = Math.max(1, resumeTargetBounds.height);
            return clamp(pauseFrameAt + (1 - pauseFrameAt) * (-resumeTargetBounds.top / resumeDistance));
          }
        }
      }

      return clamp(-section.getBoundingClientRect().top / scrollDistance);
    };

    const drawFrame = (frameIndex: number, force = false) => {
      const bestFrameIndex = getBestLoadedFrameIndex(frameIndex);
      const image = bestFrameIndex >= 0 ? imagesRef.current[bestFrameIndex] : null;

      if (!image || (!force && bestFrameIndex === currentFrameRef.current)) {
        return;
      }

      currentFrameRef.current = bestFrameIndex;
      if (drawCoverImage(canvas, image)) {
        canvas.style.removeProperty("background-image");
      } else {
        canvas.style.backgroundImage = `url("${image.currentSrc || image.src}")`;
      }
    };

    const trimDecodedFrameCache = () => {
      if (frames.length <= LARGE_SEQUENCE_THRESHOLD) {
        return;
      }

      const protectedFrames = new Set([0, frames.length - 1, safeReducedMotionFrameIndex, targetFrameIndex, currentFrameRef.current]);

      for (let distance = 1; distance <= FRAME_PRELOAD_RADIUS; distance += 1) {
        protectedFrames.add(targetFrameIndex - distance);
        protectedFrames.add(targetFrameIndex + distance);
      }

      const loadedIndices = imagesRef.current
        .map((image, index) => (image && loadStatesRef.current[index] === "loaded" ? index : -1))
        .filter((index) => index >= 0);

      if (loadedIndices.length <= LARGE_SEQUENCE_CACHE_LIMIT) {
        return;
      }

      loadedIndices
        .filter((index) => !protectedFrames.has(index))
        .sort((first, second) => Math.abs(second - targetFrameIndex) - Math.abs(first - targetFrameIndex))
        .slice(0, loadedIndices.length - LARGE_SEQUENCE_CACHE_LIMIT)
        .forEach((index) => {
          imagesRef.current[index] = null;
          loadStatesRef.current[index] = "idle";
        });
    };

    const applyCopyMotion = (progress: number) => {
      if (!primaryMessage || !nextMessage) {
        return;
      }

      if (reducedMotionQuery.matches) {
        primaryMessage.style.opacity = "1";
        primaryMessage.style.filter = "blur(0)";
        primaryMessage.style.transform = "translate3d(0, 0, 0)";
        primaryMessage.style.pointerEvents = "auto";
        nextMessage.style.opacity = "0";
        nextMessage.style.filter = "blur(0)";
        nextMessage.style.transform = "translate3d(0, 12px, 0)";
        nextMessage.style.pointerEvents = "none";
        return;
      }

      const copyOut = smoothstep(0.24, 0.42, progress);
      const copyIn = smoothstep(0.4, 0.58, progress);
      primaryMessage.style.opacity = String(1 - copyOut);
      primaryMessage.style.filter = `blur(${(copyOut * 2).toFixed(2)}px)`;
      primaryMessage.style.transform = `translate3d(0, ${(-20 * copyOut).toFixed(2)}px, 0)`;
      primaryMessage.style.pointerEvents = copyOut > 0.8 ? "none" : "auto";
      nextMessage.style.opacity = String(copyIn);
      nextMessage.style.filter = `blur(${((1 - copyIn) * 2).toFixed(2)}px)`;
      nextMessage.style.transform = `translate3d(0, ${(18 * (1 - copyIn)).toFixed(2)}px, 0)`;
      nextMessage.style.pointerEvents = copyIn > 0.8 ? "auto" : "none";
    };

    const syncProgress = () => {
      const progress = reducedMotionQuery.matches
        ? safeReducedMotionFrameIndex / Math.max(1, frames.length - 1)
        : getScrollProgress();
      const frameIndex = Math.min(frames.length - 1, Math.max(0, Math.round(progress * (frames.length - 1))));
      targetFrameIndex = frameIndex;
      prioritizeNearbyFrames(frameIndex);
      applyCopyMotion(progress);

      if (!canDrawToCanvas) {
        canvas.style.backgroundImage = `url("${frames[frameIndex]}")`;
      }

      if (Math.abs(progress - lastReportedProgress) > 0.0001) {
        lastReportedProgress = progress;
        onProgressRef.current?.(progress);
      }

      return frameIndex;
    };

    const syncAndDraw = (force = false) => {
      const frameIndex = syncProgress();
      drawFrame(frameIndex, force);
    };

    const enqueueFrame = (index: number, priority = false) => {
      if (index < 0 || index >= frames.length || loadStatesRef.current[index] !== "idle") {
        return;
      }

      if (queuedFrames.has(index)) {
        if (priority) {
          const queueIndex = loadQueue.indexOf(index);
          if (queueIndex >= 0) {
            loadQueue.splice(queueIndex, 1);
            loadQueue.unshift(index);
          }
        }
        return;
      }

      queuedFrames.add(index);
      if (priority) {
        loadQueue.unshift(index);
      } else {
        loadQueue.push(index);
      }
    };

    const pumpLoadQueue = () => {
      while (!isDisposed && activeLoads < MAX_CONCURRENT_FRAME_LOADS && loadQueue.length > 0) {
        const index = loadQueue.shift();

        if (index === undefined) {
          return;
        }

        queuedFrames.delete(index);
        if (loadStatesRef.current[index] !== "idle") {
          continue;
        }

        const image = new Image();
        activeLoads += 1;
        loadStatesRef.current[index] = "loading";
        image.decoding = "async";
        image.fetchPriority = index === 0 || index === frames.length - 1 || index === initialFrameIndex ? "high" : "auto";
        image.onload = () => {
          activeLoads -= 1;
          if (isDisposed) {
            return;
          }

          everLoaded[index] = true;
          imagesRef.current[index] = image;
          loadStatesRef.current[index] = "loaded";

          if (index === initialFrameIndex) {
            setIsInitialFrameLoaded(true);
          }

          trimDecodedFrameCache();
          syncAndDraw(index === targetFrameIndex || currentFrameRef.current < 0);
          pumpLoadQueue();
        };
        image.onerror = () => {
          activeLoads -= 1;
          if (isDisposed) {
            return;
          }

          everLoaded[index] = true;
          loadStatesRef.current[index] = "error";
          pumpLoadQueue();
        };
        image.src = frames[index];
      }
    };

    const enqueuePriorityFrames = (indices: number[]) => {
      indices
        .slice()
        .reverse()
        .forEach((index) => enqueueFrame(index, true));
      pumpLoadQueue();
    };

    function prioritizeNearbyFrames(centerIndex: number) {
      const nearbyFrames = [centerIndex];

      for (let distance = 1; distance <= FRAME_PRELOAD_RADIUS; distance += 1) {
        nearbyFrames.push(centerIndex - distance, centerIndex + distance);
      }

      enqueuePriorityFrames(nearbyFrames);
    }

    const scheduleBackgroundPreload = () => {
      if (isDisposed || backgroundPreloadTimer !== null || backgroundCursor >= frames.length) {
        return;
      }

      backgroundPreloadTimer = window.setTimeout(() => {
        backgroundPreloadTimer = null;
        let queuedCount = 0;

        while (backgroundCursor < frames.length && queuedCount < BACKGROUND_PRELOAD_BATCH_SIZE) {
          const index = backgroundCursor;
          backgroundCursor += 1;

          if (!everLoaded[index] && loadStatesRef.current[index] === "idle" && !queuedFrames.has(index)) {
            enqueueFrame(index);
            queuedCount += 1;
          }
        }

        pumpLoadQueue();
        scheduleBackgroundPreload();
      }, BACKGROUND_PRELOAD_DELAY_MS);
    };

    const cancelBackgroundPreload = () => {
      if (backgroundPreloadTimer !== null) {
        window.clearTimeout(backgroundPreloadTimer);
        backgroundPreloadTimer = null;
      }
      backgroundPreloadObserver?.disconnect();
      backgroundPreloadObserver = null;
    };

    const syncBackgroundPreloadPolicy = () => {
      if (shouldLimitBackgroundPreload()) {
        cancelBackgroundPreload();
        return;
      }

      if (
        backgroundPreloadObserver ||
        backgroundPreloadTimer !== null ||
        backgroundCursor >= frames.length
      ) {
        return;
      }

      if (
        frames.length > LARGE_SEQUENCE_THRESHOLD &&
        typeof window.IntersectionObserver === "function"
      ) {
        backgroundPreloadObserver = new IntersectionObserver(
          (entries) => {
            if (entries.some((entry) => entry.isIntersecting)) {
              backgroundPreloadObserver?.disconnect();
              backgroundPreloadObserver = null;
              scheduleBackgroundPreload();
            }
          },
          { rootMargin: "200% 0px" },
        );
        backgroundPreloadObserver.observe(section);
      } else {
        scheduleBackgroundPreload();
      }
    };

    const handleResize = () => syncAndDraw(true);
    const handleScroll = () => {
      if (scrollAnimationFrame) {
        return;
      }

      scrollAnimationFrame = window.requestAnimationFrame(() => {
        scrollAnimationFrame = 0;
        syncAndDraw();
      });
    };
    const handleResponsiveMediaChange = () => {
      syncAndDraw(true);
      syncBackgroundPreloadPolicy();
    };

    enqueuePriorityFrames([
      initialFrameIndex,
      0,
      frames.length - 1,
      initialFrameIndex + 1,
      initialFrameIndex - 1,
      initialFrameIndex + 2,
      initialFrameIndex - 2
    ]);
    syncBackgroundPreloadPolicy();
    syncAndDraw(true);

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleResize);
    reducedMotionQuery.addEventListener("change", handleResponsiveMediaChange);
    compactViewportQuery.addEventListener("change", handleResponsiveMediaChange);

    return () => {
      isDisposed = true;
      cancelBackgroundPreload();
      if (scrollAnimationFrame) {
        window.cancelAnimationFrame(scrollAnimationFrame);
      }
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
      reducedMotionQuery.removeEventListener(
        "change",
        handleResponsiveMediaChange,
      );
      compactViewportQuery.removeEventListener(
        "change",
        handleResponsiveMediaChange,
      );
    };
  }, [frames, pauseFrameAt, pauseFrameWhileSelector, reducedMotionFrameIndex, resumeFrameSelector, scrollDistanceViewportHeights]);

  return (
    <section
      aria-label={ariaLabel}
      aria-labelledby={ariaLabelledBy}
      className={["scroll-frame-scanner", className].filter(Boolean).join(" ")}
      data-loaded={isInitialFrameLoaded ? "true" : "false"}
      id={id}
      ref={sectionRef}
    >
      <div className="scroll-frame-scanner-sticky">
        <canvas aria-hidden="true" className="scroll-frame-scanner-canvas" ref={canvasRef} />
        <div
          aria-hidden="true"
          className="scroll-frame-scanner-gradient"
          style={gradientOpacity === undefined ? undefined : { opacity: gradientOpacity }}
        />
        {children}
      </div>
      {afterStickyChildren ? <div className="scroll-frame-scanner-after">{afterStickyChildren}</div> : null}
    </section>
  );
}
