export const SCROLL_VIDEO_DECODE_TIMEOUT_MS = 10_000;
export const SCROLL_VIDEO_PRELOAD_ROOT_MARGIN = "175% 0px";

const MOBILE_VIDEO_MAX_WIDTH = 768;
const SLOW_CONNECTION_TYPES = new Set(["slow-2g", "2g", "3g"]);

export type ScrollVideoVariant = {
  height: number;
  id: "desktop" | "mobile";
  poster: string;
  reducedMotionPoster?: string;
  src: string;
  width: number;
};

export type ScrollVideoAsset = {
  desktop: ScrollVideoVariant;
  framesPerSecond: number;
  id: string;
  mobile: ScrollVideoVariant;
};

export type ScrollVideoEnvironment = {
  effectiveType?: string;
  saveData: boolean;
  viewportWidth: number;
};

export type ScrollVideoState = {
  failed: boolean;
  reducedMotion: boolean;
};

export type ScrollVideoStateEvent =
  | { reducedMotion: boolean; type: "preference" }
  | { type: "failure" };

export type ScrollMediaMode = "jpeg-fallback" | "poster" | "video";

function clamp(value: number, min = 0, max = 1) {
  return Math.min(max, Math.max(min, value));
}

export function selectScrollVideoVariant(
  asset: ScrollVideoAsset,
  environment: ScrollVideoEnvironment,
) {
  const slowConnection = environment.effectiveType
    ? SLOW_CONNECTION_TYPES.has(environment.effectiveType)
    : false;
  const constrained =
    environment.saveData ||
    slowConnection ||
    environment.viewportWidth <= MOBILE_VIDEO_MAX_WIDTH;

  return constrained ? asset.mobile : asset.desktop;
}

export function scrollProgressToVideoTime(
  progress: number,
  duration: number,
  framesPerSecond: number,
) {
  if (!Number.isFinite(duration) || duration <= 0) {
    return 0;
  }

  const finalFramePadding = framesPerSecond > 0 ? 1 / framesPerSecond : 0;
  const lastFrameTime = Math.max(0, duration - finalFramePadding);
  return clamp(progress) * lastFrameTime;
}

export function shouldBeginScrollVideoBuffering({
  documentVisible,
  isNearViewport,
  isVisible,
  reducedMotion,
  saveData,
}: {
  documentVisible: boolean;
  isNearViewport: boolean;
  isVisible: boolean;
  reducedMotion: boolean;
  saveData: boolean;
}) {
  if (!documentVisible || reducedMotion) {
    return false;
  }

  return saveData ? isVisible : isNearViewport;
}

export function reduceScrollVideoState(
  state: ScrollVideoState,
  event: ScrollVideoStateEvent,
): ScrollVideoState {
  if (event.type === "failure") {
    return state.failed ? state : { ...state, failed: true };
  }

  if (state.reducedMotion === event.reducedMotion) {
    return state;
  }

  return { ...state, reducedMotion: event.reducedMotion };
}

export function getScrollMediaMode(state: ScrollVideoState): ScrollMediaMode {
  if (state.failed) {
    return "jpeg-fallback";
  }

  return state.reducedMotion ? "poster" : "video";
}
