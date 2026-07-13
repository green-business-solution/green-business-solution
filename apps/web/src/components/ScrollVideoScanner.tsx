import {
  useCallback,
  useEffect,
  useReducer,
  useRef,
  useState,
} from "react";

import {
  getScrollMediaMode,
  reduceScrollVideoState,
  SCROLL_VIDEO_DECODE_TIMEOUT_MS,
  SCROLL_VIDEO_PRELOAD_ROOT_MARGIN,
  scrollProgressToVideoTime,
  selectScrollVideoVariant,
  shouldBeginScrollVideoBuffering,
  type ScrollVideoAsset,
} from "../lib/scrollVideo";
import {
  ScrollFrameScanner,
  type ScrollFrameScannerProps,
} from "./ScrollFrameScanner";

type NetworkInformationLike = EventTarget & {
  effectiveType?: string;
  saveData?: boolean;
};

type ScrollVideoScannerProps = ScrollFrameScannerProps & {
  videoAsset: ScrollVideoAsset;
};

type FallbackReason = "decode-timeout" | "media-error" | "unsupported";

function getConnection() {
  return (navigator as Navigator & { connection?: NetworkInformationLike }).connection;
}

export function ScrollVideoScanner({
  onProgress,
  videoAsset,
  ...scannerProps
}: ScrollVideoScannerProps) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const latestProgressRef = useRef(0);
  const timeUpdateFrameRef = useRef(0);
  const sourceAttachedRef = useRef(false);
  const isVisibleRef = useRef(false);
  const documentVisibleRef = useRef(true);
  const mediaModeRef = useRef<ReturnType<typeof getScrollMediaMode>>("video");
  const onProgressRef = useRef(onProgress);
  const [videoState, dispatchVideoState] = useReducer(reduceScrollVideoState, {
    failed: false,
    reducedMotion: false,
  });
  const [selectedVariant, setSelectedVariant] = useState(videoAsset.desktop);
  const [sourceAttached, setSourceAttached] = useState(false);
  const [hasDecodedFrame, setHasDecodedFrame] = useState(false);
  const [isNearViewport, setIsNearViewport] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [saveData, setSaveData] = useState(false);
  const [documentVisible, setDocumentVisible] = useState(
    typeof document === "undefined" || document.visibilityState !== "hidden",
  );
  const [fallbackReason, setFallbackReason] = useState<FallbackReason | null>(null);
  const mediaMode = getScrollMediaMode(videoState);
  const fallbackActive = mediaMode === "jpeg-fallback";
  const activePoster = videoState.reducedMotion
    ? selectedVariant.reducedMotionPoster ?? selectedVariant.poster
    : selectedVariant.poster;

  sourceAttachedRef.current = sourceAttached;
  isVisibleRef.current = isVisible;
  documentVisibleRef.current = documentVisible;
  mediaModeRef.current = mediaMode;
  onProgressRef.current = onProgress;

  const activateFallback = useCallback((reason: FallbackReason) => {
    setFallbackReason((currentReason) => currentReason ?? reason);
    dispatchVideoState({ type: "failure" });
  }, []);

  const scheduleVideoTimeUpdate = useCallback(() => {
    if (
      timeUpdateFrameRef.current ||
      mediaModeRef.current !== "video" ||
      !sourceAttachedRef.current ||
      !isVisibleRef.current ||
      !documentVisibleRef.current
    ) {
      return;
    }

    timeUpdateFrameRef.current = window.requestAnimationFrame(() => {
      timeUpdateFrameRef.current = 0;
      const video = videoRef.current;
      if (
        !video ||
        mediaModeRef.current !== "video" ||
        !sourceAttachedRef.current ||
        !isVisibleRef.current ||
        !documentVisibleRef.current ||
        video.readyState < 1
      ) {
        return;
      }

      const targetTime = scrollProgressToVideoTime(
        latestProgressRef.current,
        video.duration,
        videoAsset.framesPerSecond,
      );
      const minimumChange = 1 / Math.max(1, videoAsset.framesPerSecond * 2);
      if (Math.abs(video.currentTime - targetTime) < minimumChange) {
        return;
      }

      try {
        video.currentTime = targetTime;
      } catch {
        activateFallback("media-error");
      }
    });
  }, [activateFallback, videoAsset.framesPerSecond]);

  const handleProgress = useCallback((progress: number) => {
    latestProgressRef.current = progress;
    onProgressRef.current?.(progress);
    scheduleVideoTimeUpdate();
  }, [scheduleVideoTimeUpdate]);

  useEffect(() => {
    const reducedMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const connection = getConnection();

    const syncPreferences = () => {
      const nextSaveData = connection?.saveData === true;
      setSaveData(nextSaveData);
      dispatchVideoState({
        reducedMotion: reducedMotionQuery.matches,
        type: "preference",
      });
      if (!sourceAttachedRef.current) {
        setSelectedVariant(selectScrollVideoVariant(videoAsset, {
          effectiveType: connection?.effectiveType,
          saveData: nextSaveData,
          viewportWidth: window.innerWidth,
        }));
      }
    };

    syncPreferences();
    reducedMotionQuery.addEventListener("change", syncPreferences);
    connection?.addEventListener("change", syncPreferences);
    window.addEventListener("resize", syncPreferences);

    return () => {
      reducedMotionQuery.removeEventListener("change", syncPreferences);
      connection?.removeEventListener("change", syncPreferences);
      window.removeEventListener("resize", syncPreferences);
    };
  }, [videoAsset]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) {
      return undefined;
    }

    if (typeof window.IntersectionObserver !== "function") {
      setIsNearViewport(true);
      setIsVisible(true);
      return undefined;
    }

    const preloadObserver = new IntersectionObserver(
      (entries) => setIsNearViewport(entries.some((entry) => entry.isIntersecting)),
      { rootMargin: SCROLL_VIDEO_PRELOAD_ROOT_MARGIN },
    );
    const visibilityObserver = new IntersectionObserver(
      (entries) => setIsVisible(entries.some((entry) => entry.isIntersecting)),
      { threshold: 0.01 },
    );
    preloadObserver.observe(video);
    visibilityObserver.observe(video);

    return () => {
      preloadObserver.disconnect();
      visibilityObserver.disconnect();
    };
  }, []);

  useEffect(() => {
    const handleVisibilityChange = () => {
      const nextDocumentVisible = document.visibilityState !== "hidden";
      setDocumentVisible(nextDocumentVisible);
      if (!nextDocumentVisible && timeUpdateFrameRef.current) {
        window.cancelAnimationFrame(timeUpdateFrameRef.current);
        timeUpdateFrameRef.current = 0;
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => document.removeEventListener("visibilitychange", handleVisibilityChange);
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) {
      return;
    }
    const supportsH264 =
      video.canPlayType('video/mp4; codecs="avc1.64001F"') ||
      video.canPlayType('video/mp4; codecs="avc1.4D401F"') ||
      video.canPlayType("video/mp4");
    if (!supportsH264) {
      activateFallback("unsupported");
    }
  }, [activateFallback]);

  useEffect(() => {
    if (mediaMode !== "video") {
      if (sourceAttached) {
        setSourceAttached(false);
      }
      return;
    }

    if (
      !sourceAttached &&
      shouldBeginScrollVideoBuffering({
        documentVisible,
        isNearViewport,
        isVisible,
        reducedMotion: videoState.reducedMotion,
        saveData,
      })
    ) {
      setSourceAttached(true);
    }
  }, [
    documentVisible,
    isNearViewport,
    isVisible,
    mediaMode,
    saveData,
    sourceAttached,
    videoState.reducedMotion,
  ]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) {
      return;
    }

    if (sourceAttached && mediaMode === "video") {
      setHasDecodedFrame(false);
      video.load();
      return;
    }

    if (video.currentSrc || video.readyState > 0) {
      video.removeAttribute("src");
      video.load();
      setHasDecodedFrame(false);
    }
  }, [mediaMode, selectedVariant.src, sourceAttached]);

  useEffect(() => {
    if (
      mediaMode !== "video" ||
      !sourceAttached ||
      !isVisible ||
      !documentVisible ||
      hasDecodedFrame
    ) {
      return undefined;
    }

    const timeout = window.setTimeout(
      () => activateFallback("decode-timeout"),
      SCROLL_VIDEO_DECODE_TIMEOUT_MS,
    );
    return () => window.clearTimeout(timeout);
  }, [
    activateFallback,
    documentVisible,
    hasDecodedFrame,
    isVisible,
    mediaMode,
    sourceAttached,
  ]);

  useEffect(() => {
    if (isVisible && documentVisible) {
      scheduleVideoTimeUpdate();
    }
  }, [documentVisible, isVisible, scheduleVideoTimeUpdate]);

  useEffect(() => () => {
    if (timeUpdateFrameRef.current) {
      window.cancelAnimationFrame(timeUpdateFrameRef.current);
    }
  }, []);

  const activeSource = sourceAttached && mediaMode === "video"
    ? selectedVariant.src
    : undefined;

  return (
    <ScrollFrameScanner
      {...scannerProps}
      fallbackPoster={activePoster}
      framesEnabled={fallbackActive}
      mediaLayer={
        <video
          aria-hidden="true"
          className="scroll-video-scanner-video"
          data-buffering={sourceAttached ? "true" : "false"}
          data-fallback-reason={fallbackReason ?? undefined}
          data-video-ready={hasDecodedFrame ? "true" : "false"}
          disablePictureInPicture
          disableRemotePlayback
          muted
          onCanPlay={() => {
            setHasDecodedFrame(true);
            scheduleVideoTimeUpdate();
          }}
          onError={() => {
            if (sourceAttachedRef.current && mediaModeRef.current === "video") {
              activateFallback("media-error");
            }
          }}
          onLoadedData={() => {
            setHasDecodedFrame(true);
            scheduleVideoTimeUpdate();
          }}
          onLoadedMetadata={scheduleVideoTimeUpdate}
          onSeeked={() => {
            setHasDecodedFrame(true);
            scheduleVideoTimeUpdate();
          }}
          playsInline
          poster={activePoster}
          preload={sourceAttached ? (saveData ? "metadata" : "auto") : "none"}
          ref={videoRef}
          src={activeSource}
          tabIndex={-1}
        />
      }
      mediaLoaded={fallbackActive ? undefined : true}
      mediaMode={mediaMode}
      mediaTier={`${videoAsset.id}-${selectedVariant.id}`}
      onProgress={handleProgress}
    />
  );
}
