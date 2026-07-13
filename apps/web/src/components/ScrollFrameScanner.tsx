import { ReactNode, useEffect, useRef, useState } from "react";

import {
  chooseDecodedFramesToEvict,
  getCanvasBackingSize,
  getFrameRequestWindow,
  selectFrameDeliveryPolicy,
  type FrameSequenceTier,
} from "../lib/frameDelivery";

export type ScrollFrameScannerProps = {
  afterStickyChildren?: ReactNode;
  ariaLabel?: string;
  ariaLabelledBy?: string;
  children?: ReactNode;
  className?: string;
  fallbackPoster?: string;
  frameTiers?: readonly FrameSequenceTier[];
  framesEnabled?: boolean;
  frames: string[];
  gradientOpacity?: number;
  id?: string;
  mediaLayer?: ReactNode;
  mediaLoaded?: boolean;
  mediaMode?: string;
  mediaTier?: string;
  onProgress?: (progress: number) => void;
  pauseFrameAt?: number;
  pauseFrameWhileSelector?: string;
  reducedMotionFrameIndex?: number;
  resumeFrameSelector?: string;
  scrollDistanceViewportHeights?: number;
};

type FrameLoadState = "error" | "idle" | "loaded" | "loading";

type CachedFrame = {
  bytes: number;
  image: HTMLImageElement;
  lastUsed: number;
};

type ActiveFrameRequest = {
  finished: boolean;
  image: HTMLImageElement;
  index: number;
};

type NetworkInformationLike = EventTarget & {
  effectiveType?: string;
  saveData?: boolean;
};

const FALLBACK_TIER_HEIGHT = 720;
const FALLBACK_TIER_WIDTH = 1280;
const TRANSPARENT_PIXEL =
  "data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs=";

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

function drawCoverImage(
  canvas: HTMLCanvasElement,
  image: HTMLImageElement,
  maximumCanvasPixels: number,
) {
  if (typeof canvas.getContext !== "function") {
    return false;
  }

  let context: CanvasRenderingContext2D | null;
  try {
    context = canvas.getContext("2d");
  } catch {
    return false;
  }

  if (!context || !image.naturalWidth || !image.naturalHeight) {
    return false;
  }

  const rect = canvas.getBoundingClientRect();
  const backingSize = getCanvasBackingSize({
    cssHeight: rect.height,
    cssWidth: rect.width,
    devicePixelRatio: window.devicePixelRatio || 1,
    maxPixels: maximumCanvasPixels,
    sourceHeight: image.naturalHeight,
    sourceWidth: image.naturalWidth,
  });

  if (canvas.width !== backingSize.width || canvas.height !== backingSize.height) {
    canvas.width = backingSize.width;
    canvas.height = backingSize.height;
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
  context.drawImage(
    image,
    sourceX,
    sourceY,
    sourceWidth,
    sourceHeight,
    0,
    0,
    canvas.width,
    canvas.height,
  );
  return true;
}

function getConnection() {
  return (navigator as Navigator & { connection?: NetworkInformationLike }).connection;
}

function isSlowConnection(connection: NetworkInformationLike | undefined) {
  return connection?.saveData === true ||
    connection?.effectiveType === "slow-2g" ||
    connection?.effectiveType === "2g" ||
    connection?.effectiveType === "3g";
}

export function ScrollFrameScanner({
  afterStickyChildren,
  ariaLabel,
  ariaLabelledBy,
  children,
  className,
  fallbackPoster,
  frameTiers,
  framesEnabled = true,
  frames,
  gradientOpacity,
  id,
  mediaLayer,
  mediaLoaded,
  mediaMode,
  mediaTier,
  onProgress,
  pauseFrameAt,
  pauseFrameWhileSelector,
  reducedMotionFrameIndex = 0,
  resumeFrameSelector,
  scrollDistanceViewportHeights,
}: ScrollFrameScannerProps) {
  const sectionRef = useRef<HTMLElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const currentFrameRef = useRef(-1);
  const onProgressRef = useRef(onProgress);
  const [isInitialFrameLoaded, setIsInitialFrameLoaded] = useState(false);
  const [selectedTierId, setSelectedTierId] = useState("pending");

  useEffect(() => {
    onProgressRef.current = onProgress;
  }, [onProgress]);

  useEffect(() => {
    const section = sectionRef.current;
    const canvas = canvasRef.current;

    if (!section || !canvas || frames.length === 0) {
      return undefined;
    }

    const fallbackTier: FrameSequenceTier = {
      format: "jpeg",
      frames,
      height: FALLBACK_TIER_HEIGHT,
      id: "source",
      width: FALLBACK_TIER_WIDTH,
    };
    const validTiers = frameTiers?.filter((tier) => tier.frames.length === frames.length) ?? [];
    const availableTiers = validTiers.length > 0 ? validTiers : [fallbackTier];
    const fallbackDeliveryTier = availableTiers.find((tier) => tier.frames === frames) ?? fallbackTier;
    const reducedMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const connection = getConnection();
    const canvasBounds = canvas.getBoundingClientRect();
    const policy = selectFrameDeliveryPolicy(availableTiers, {
      deviceMemory: (navigator as Navigator & { deviceMemory?: number }).deviceMemory,
      devicePixelRatio: window.devicePixelRatio || 1,
      effectiveType: connection?.effectiveType,
      reducedMotion: reducedMotionQuery.matches,
      renderedHeight: canvasBounds.height || window.innerHeight,
      renderedWidth: canvasBounds.width || window.innerWidth,
      saveData: connection?.saveData === true,
      viewportWidth: window.innerWidth,
    });
    const selectedFrames = policy.tier.frames;
    const selectedTierUsesFallback = selectedFrames === frames;
    const primaryCache: Array<CachedFrame | null> = Array.from({ length: frames.length }, () => null);
    const fallbackCache: Array<CachedFrame | null> = Array.from({ length: frames.length }, () => null);
    const loadStates: FrameLoadState[] = Array.from({ length: frames.length }, () => "idle");
    const activeRequests = new Map<number, ActiveFrameRequest>();
    const queuedFrames = new Set<number>();
    const safeReducedMotionFrameIndex = Math.min(frames.length - 1, Math.max(0, reducedMotionFrameIndex));
    const initialFrameIndex = reducedMotionQuery.matches ? safeReducedMotionFrameIndex : 0;
    const primaryMessage = section.querySelector<HTMLElement>(".planet-scan-message-primary");
    const nextMessage = section.querySelector<HTMLElement>(".planet-scan-message-next");
    let activeLoads = 0;
    let currentDrawKey = "";
    let fallbackRequest: ActiveFrameRequest | null = null;
    let pendingFallbackIndex: number | null = null;
    let intersectionObserver: IntersectionObserver | null = null;
    let isDisposed = false;
    let isNearViewport = typeof window.IntersectionObserver !== "function";
    let lastReportedProgress = -1;
    let lastTargetFrameIndex = initialFrameIndex;
    let loadQueue: number[] = [];
    let scrollAnimationFrame = 0;
    let targetFrameIndex = initialFrameIndex;
    let usageClock = 0;

    currentFrameRef.current = -1;
    setIsInitialFrameLoaded(false);
    setSelectedTierId(framesEnabled ? policy.tier.id : "disabled");

    const isActive = () => isNearViewport && document.visibilityState !== "hidden";
    const currentPreloadRadius = () => {
      if (reducedMotionQuery.matches) {
        return 0;
      }
      return isSlowConnection(connection) ? Math.min(1, policy.preloadRadius) : policy.preloadRadius;
    };
    const currentConcurrency = () =>
      isSlowConnection(connection) ? Math.min(2, policy.maxConcurrentLoads) : policy.maxConcurrentLoads;

    const touchCachedFrame = (entry: CachedFrame | null) => {
      if (entry) {
        usageClock += 1;
        entry.lastUsed = usageClock;
      }
      return entry;
    };

    const getBestLoadedFrame = (index: number) => {
      const exactPrimary = touchCachedFrame(primaryCache[index]);
      if (exactPrimary) {
        return { entry: exactPrimary, fallback: false, index };
      }

      const exactFallback = touchCachedFrame(fallbackCache[index]);
      if (exactFallback) {
        return { entry: exactFallback, fallback: true, index };
      }

      for (let distance = 1; distance < frames.length; distance += 1) {
        const previousIndex = index - distance;
        const nextIndex = index + distance;

        if (previousIndex >= 0) {
          const previousPrimary = touchCachedFrame(primaryCache[previousIndex]);
          if (previousPrimary) {
            return { entry: previousPrimary, fallback: false, index: previousIndex };
          }
          const previousFallback = touchCachedFrame(fallbackCache[previousIndex]);
          if (previousFallback) {
            return { entry: previousFallback, fallback: true, index: previousIndex };
          }
        }

        if (nextIndex < frames.length) {
          const nextPrimary = touchCachedFrame(primaryCache[nextIndex]);
          if (nextPrimary) {
            return { entry: nextPrimary, fallback: false, index: nextIndex };
          }
          const nextFallback = touchCachedFrame(fallbackCache[nextIndex]);
          if (nextFallback) {
            return { entry: nextFallback, fallback: true, index: nextIndex };
          }
        }
      }

      return null;
    };

    const drawFrame = (index: number, force = false) => {
      const loadedFrame = getBestLoadedFrame(index);
      if (!loadedFrame) {
        return;
      }

      const drawKey = `${loadedFrame.fallback ? "fallback" : "primary"}:${loadedFrame.index}:${loadedFrame.entry.image.currentSrc || loadedFrame.entry.image.src}`;
      if (!force && drawKey === currentDrawKey) {
        return;
      }

      currentDrawKey = drawKey;
      currentFrameRef.current = loadedFrame.index;
      if (drawCoverImage(canvas, loadedFrame.entry.image, policy.maxCanvasPixels)) {
        canvas.style.removeProperty("background-image");
      } else {
        canvas.style.backgroundImage = `url("${loadedFrame.entry.image.currentSrc || loadedFrame.entry.image.src}")`;
      }
    };

    const trimDecodedFrameCache = () => {
      const entries = [
        ...primaryCache.flatMap((entry, index) => entry ? [{
          bytes: entry.bytes,
          fallback: false,
          index,
          lastUsed: entry.lastUsed,
        }] : []),
        ...fallbackCache.flatMap((entry, index) => entry ? [{
          bytes: entry.bytes,
          fallback: true,
          index,
          lastUsed: entry.lastUsed,
        }] : []),
      ];
      const evictions = chooseDecodedFramesToEvict({
        budget: policy.decodedByteBudget,
        currentIndex: currentFrameRef.current,
        entries,
        targetIndex: targetFrameIndex,
      });

      for (const eviction of evictions) {
        if (eviction.fallback) {
          fallbackCache[eviction.index] = null;
        } else {
          primaryCache[eviction.index] = null;
          loadStates[eviction.index] = "idle";
        }
      }
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

    const getScrollProgress = () => {
      const scrollDistance = Math.max(
        1,
        scrollDistanceViewportHeights === undefined
          ? section.offsetHeight - window.innerHeight
          : window.innerHeight * Math.max(0, scrollDistanceViewportHeights - 1),
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

    const finishPrimaryRequest = (request: ActiveFrameRequest) => {
      if (request.finished) {
        return false;
      }
      request.finished = true;
      activeRequests.delete(request.index);
      activeLoads = Math.max(0, activeLoads - 1);
      return true;
    };

    const cancelPrimaryRequest = (request: ActiveFrameRequest) => {
      if (!finishPrimaryRequest(request)) {
        return;
      }
      request.image.onload = null;
      request.image.onerror = null;
      request.image.src = TRANSPARENT_PIXEL;
      if (loadStates[request.index] === "loading") {
        loadStates[request.index] = "idle";
      }
    };

    const cancelFallbackRequest = () => {
      pendingFallbackIndex = null;
      if (!fallbackRequest || fallbackRequest.finished) {
        fallbackRequest = null;
        return;
      }
      fallbackRequest.finished = true;
      fallbackRequest.image.onload = null;
      fallbackRequest.image.onerror = null;
      fallbackRequest.image.src = TRANSPARENT_PIXEL;
      fallbackRequest = null;
    };

    const pumpLoadQueue = () => {
      while (!isDisposed && activeLoads < currentConcurrency() && loadQueue.length > 0) {
        const index = loadQueue.shift();
        if (index === undefined) {
          return;
        }
        queuedFrames.delete(index);

        if (!isActive() && index !== initialFrameIndex) {
          loadQueue.unshift(index);
          queuedFrames.add(index);
          return;
        }
        if (document.visibilityState === "hidden") {
          loadQueue.unshift(index);
          queuedFrames.add(index);
          return;
        }
        if (loadStates[index] !== "idle") {
          continue;
        }

        const image = new Image();
        const request: ActiveFrameRequest = { finished: false, image, index };
        activeRequests.set(index, request);
        activeLoads += 1;
        loadStates[index] = "loading";
        image.decoding = "async";
        image.fetchPriority = index === initialFrameIndex || index === targetFrameIndex ? "high" : "auto";
        image.onload = async () => {
          try {
            await image.decode();
          } catch {
            // onload confirms the image is drawable even when decode() is unavailable or rejects.
          }
          if (isDisposed || !finishPrimaryRequest(request)) {
            return;
          }

          usageClock += 1;
          primaryCache[index] = {
            bytes: image.naturalWidth * image.naturalHeight * 4,
            image,
            lastUsed: usageClock,
          };
          loadStates[index] = "loaded";
          if (index === initialFrameIndex) {
            setIsInitialFrameLoaded(true);
          }
          if (index === targetFrameIndex) {
            cancelFallbackRequest();
          }
          trimDecodedFrameCache();
          if (isActive() || index === initialFrameIndex) {
            drawFrame(targetFrameIndex, index === targetFrameIndex || currentFrameRef.current < 0);
          }
          pumpLoadQueue();
        };
        image.onerror = () => {
          if (isDisposed || !finishPrimaryRequest(request)) {
            return;
          }
          loadStates[index] = "error";
          if (index === targetFrameIndex || index === initialFrameIndex) {
            requestFallbackFrame(index);
          }
          pumpLoadQueue();
        };
        image.src = selectedFrames[index];
      }
    };

    const enqueueFrame = (index: number, priority = false) => {
      if (index < 0 || index >= frames.length || loadStates[index] !== "idle") {
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

    const enqueuePriorityFrames = (indices: number[]) => {
      indices.slice().reverse().forEach((index) => enqueueFrame(index, true));
      pumpLoadQueue();
    };

    const cancelObsoleteWork = (neededIndices: Set<number>) => {
      loadQueue = loadQueue.filter((index) => {
        const keep = neededIndices.has(index);
        if (!keep) {
          queuedFrames.delete(index);
        }
        return keep;
      });
      for (const request of activeRequests.values()) {
        if (!neededIndices.has(request.index) && request.index !== currentFrameRef.current) {
          cancelPrimaryRequest(request);
        }
      }
    };

    const prioritizeNearbyFrames = (centerIndex: number) => {
      const direction = centerIndex === lastTargetFrameIndex
        ? 0
        : centerIndex > lastTargetFrameIndex
          ? 1
          : -1;
      const requestWindow = getFrameRequestWindow({
        centerIndex,
        direction,
        frameCount: frames.length,
        radius: currentPreloadRadius(),
      });
      const neededIndices = new Set(requestWindow);
      neededIndices.add(centerIndex);
      if (currentFrameRef.current >= 0) {
        neededIndices.add(currentFrameRef.current);
      }
      cancelObsoleteWork(neededIndices);
      enqueuePriorityFrames(requestWindow);
      lastTargetFrameIndex = centerIndex;
    };

    function requestFallbackFrame(index: number) {
      if (
        isDisposed ||
        selectedTierUsesFallback ||
        selectedFrames[index] === frames[index] ||
        primaryCache[index] ||
        fallbackCache[index]
      ) {
        return;
      }

      if (fallbackRequest?.index === index) {
        return;
      }
      if (fallbackRequest) {
        pendingFallbackIndex = index;
        return;
      }

      if (isDisposed || primaryCache[index] || index !== targetFrameIndex) {
        return;
      }

      const image = new Image();
      const request: ActiveFrameRequest = { finished: false, image, index };
      fallbackRequest = request;
      image.decoding = "async";
      image.fetchPriority = "high";
      image.onload = async () => {
        try {
          await image.decode();
        } catch {
          // onload confirms the fallback is drawable.
        }
        if (isDisposed || request.finished) {
          return;
        }
        request.finished = true;
        fallbackRequest = null;
        usageClock += 1;
        fallbackCache[index] = {
          bytes: image.naturalWidth * image.naturalHeight * 4,
          image,
          lastUsed: usageClock,
        };
        if (index === initialFrameIndex) {
          setIsInitialFrameLoaded(true);
        }
        trimDecodedFrameCache();
        if (index === targetFrameIndex) {
          drawFrame(index, true);
        }
        const nextFallbackIndex = pendingFallbackIndex;
        pendingFallbackIndex = null;
        if (nextFallbackIndex !== null) {
          requestFallbackFrame(nextFallbackIndex);
        }
      };
      image.onerror = () => {
        if (request.finished) {
          return;
        }
        request.finished = true;
        fallbackRequest = null;
        const nextFallbackIndex = pendingFallbackIndex;
        pendingFallbackIndex = null;
        if (nextFallbackIndex !== null) {
          requestFallbackFrame(nextFallbackIndex);
        }
      };
      image.src = fallbackDeliveryTier.frames[index] ?? frames[index];
    }

    const syncProgress = () => {
      const progress = reducedMotionQuery.matches
        ? safeReducedMotionFrameIndex / Math.max(1, frames.length - 1)
        : getScrollProgress();
      const frameIndex = Math.min(
        frames.length - 1,
        Math.max(0, Math.round(progress * (frames.length - 1))),
      );
      targetFrameIndex = frameIndex;
      if (framesEnabled) {
        if (reducedMotionQuery.matches && !selectedTierUsesFallback) {
          cancelObsoleteWork(new Set());
        } else {
          prioritizeNearbyFrames(frameIndex);
        }
        requestFallbackFrame(frameIndex);
      }
      applyCopyMotion(progress);

      if (Math.abs(progress - lastReportedProgress) > 0.0001) {
        lastReportedProgress = progress;
        onProgressRef.current?.(progress);
      }

      return frameIndex;
    };

    const syncAndDraw = (force = false) => {
      const frameIndex = syncProgress();
      if (framesEnabled) {
        drawFrame(frameIndex, force);
      }
    };

    const scheduleSyncAndDraw = (force = false) => {
      if (scrollAnimationFrame || (!isActive() && !force)) {
        return;
      }
      scrollAnimationFrame = window.requestAnimationFrame(() => {
        scrollAnimationFrame = 0;
        if (isActive() || force) {
          syncAndDraw(force);
        }
      });
    };

    const pauseFrameWork = () => {
      if (scrollAnimationFrame) {
        window.cancelAnimationFrame(scrollAnimationFrame);
        scrollAnimationFrame = 0;
      }
      cancelFallbackRequest();
      loadQueue = [];
      queuedFrames.clear();
      for (const request of activeRequests.values()) {
        cancelPrimaryRequest(request);
      }
    };

    const handleScroll = () => scheduleSyncAndDraw();
    const handleResize = () => {
      if (isActive()) {
        scheduleSyncAndDraw(true);
      }
    };
    const handleVisibilityChange = () => {
      if (document.visibilityState === "hidden") {
        pauseFrameWork();
      } else if (isNearViewport) {
        scheduleSyncAndDraw(true);
      }
    };
    const handleReducedMotionChange = () => {
      if (framesEnabled && reducedMotionQuery.matches) {
        pauseFrameWork();
        targetFrameIndex = safeReducedMotionFrameIndex;
        requestFallbackFrame(safeReducedMotionFrameIndex);
      }
      scheduleSyncAndDraw(true);
    };
    const handleConnectionChange = () => {
      if (framesEnabled && isActive()) {
        prioritizeNearbyFrames(targetFrameIndex);
      }
    };

    if (framesEnabled) {
      enqueuePriorityFrames([initialFrameIndex]);
    }
    if (typeof window.IntersectionObserver === "function") {
      intersectionObserver = new IntersectionObserver(
        (entries) => {
          const nextNearViewport = entries.some((entry) => entry.isIntersecting);
          if (nextNearViewport === isNearViewport) {
            return;
          }
          isNearViewport = nextNearViewport;
          if (isNearViewport && document.visibilityState !== "hidden") {
            scheduleSyncAndDraw(true);
          } else {
            pauseFrameWork();
          }
        },
        { rootMargin: "175% 0px" },
      );
      intersectionObserver.observe(section);
    } else {
      scheduleSyncAndDraw(true);
    }

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleResize);
    document.addEventListener("visibilitychange", handleVisibilityChange);
    reducedMotionQuery.addEventListener("change", handleReducedMotionChange);
    connection?.addEventListener("change", handleConnectionChange);

    return () => {
      isDisposed = true;
      pauseFrameWork();
      intersectionObserver?.disconnect();
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      reducedMotionQuery.removeEventListener("change", handleReducedMotionChange);
      connection?.removeEventListener("change", handleConnectionChange);
    };
  }, [frameTiers, frames, framesEnabled, pauseFrameAt, pauseFrameWhileSelector, reducedMotionFrameIndex, resumeFrameSelector, scrollDistanceViewportHeights]);

  const isMediaLoaded = mediaLoaded ?? isInitialFrameLoaded;

  return (
    <section
      aria-label={ariaLabel}
      aria-labelledby={ariaLabelledBy}
      className={["scroll-frame-scanner", className].filter(Boolean).join(" ")}
      data-frame-tier={selectedTierId}
      data-loaded={isMediaLoaded ? "true" : "false"}
      data-media-mode={mediaMode}
      data-media-tier={mediaTier}
      id={id}
      ref={sectionRef}
    >
      <div className="scroll-frame-scanner-sticky">
        {mediaLayer}
        <canvas
          aria-hidden="true"
          className="scroll-frame-scanner-canvas"
          ref={canvasRef}
          style={fallbackPoster ? {
            backgroundImage: `url("${fallbackPoster}")`,
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
          } : undefined}
        />
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
