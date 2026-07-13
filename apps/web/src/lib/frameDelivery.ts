export type FrameAssetFormat = "avif" | "jpeg" | "webp";

export type FrameSequenceTier = {
  format: FrameAssetFormat;
  frames: readonly string[];
  height: number;
  id: string;
  width: number;
};

export type FrameDeliveryEnvironment = {
  deviceMemory?: number;
  devicePixelRatio: number;
  effectiveType?: string;
  reducedMotion: boolean;
  renderedHeight: number;
  renderedWidth: number;
  saveData: boolean;
  viewportWidth: number;
};

export type FrameDeliveryPolicy = {
  decodedByteBudget: number;
  maxCanvasPixels: number;
  maxConcurrentLoads: number;
  preloadRadius: number;
  tier: FrameSequenceTier;
};

export type DecodedFrameCacheEntry = {
  bytes: number;
  fallback: boolean;
  index: number;
  lastUsed: number;
};

const MEBIBYTE = 1024 * 1024;
const MOBILE_VIEWPORT_MAX = 768;
const TABLET_VIEWPORT_MAX = 1180;
const SLOW_CONNECTION_TYPES = new Set(["slow-2g", "2g", "3g"]);

function sortTiers(tiers: readonly FrameSequenceTier[]) {
  return [...tiers].sort((first, second) => first.height - second.height);
}

export function selectFrameDeliveryPolicy(
  tiers: readonly FrameSequenceTier[],
  environment: FrameDeliveryEnvironment,
): FrameDeliveryPolicy {
  if (tiers.length === 0) {
    throw new Error("At least one frame tier is required.");
  }

  const sortedTiers = sortTiers(tiers);
  const lowestTier = sortedTiers[0];
  const slowConnection = environment.effectiveType
    ? SLOW_CONNECTION_TYPES.has(environment.effectiveType)
    : false;
  const mobile = environment.viewportWidth <= MOBILE_VIEWPORT_MAX;
  const lowMemory = environment.deviceMemory !== undefined && environment.deviceMemory <= 4;
  const constrained = environment.saveData || slowConnection || mobile;

  let desiredHeight = lowestTier.height;
  if (!environment.reducedMotion && !constrained) {
    const desiredPixelRatio = Math.min(Math.max(environment.devicePixelRatio || 1, 1), 2);
    const tierAspectRatio = lowestTier.width / lowestTier.height;
    const coverHeight = Math.max(
      environment.renderedHeight,
      environment.renderedWidth / tierAspectRatio,
    );
    desiredHeight = coverHeight * desiredPixelRatio;

    if (environment.viewportWidth <= TABLET_VIEWPORT_MAX || lowMemory) {
      desiredHeight = Math.min(desiredHeight, 1080);
    }
  }

  const tier = sortedTiers.find((candidate) => candidate.height >= desiredHeight) ?? sortedTiers.at(-1)!;
  const decodedFrameBytes = tier.width * tier.height * 4;

  if (environment.reducedMotion) {
    return {
      decodedByteBudget: Math.max(decodedFrameBytes, 16 * MEBIBYTE),
      maxCanvasPixels: tier.width * tier.height,
      maxConcurrentLoads: 1,
      preloadRadius: 0,
      tier,
    };
  }

  if (constrained) {
    return {
      decodedByteBudget: Math.max(decodedFrameBytes * 4, 20 * MEBIBYTE),
      maxCanvasPixels: tier.width * tier.height,
      maxConcurrentLoads: 2,
      preloadRadius: 1,
      tier,
    };
  }

  const highResolution = tier.height >= 1440;
  return {
    decodedByteBudget: highResolution ? 84 * MEBIBYTE : 64 * MEBIBYTE,
    maxCanvasPixels: tier.width * tier.height,
    maxConcurrentLoads: highResolution ? 3 : 4,
    preloadRadius: highResolution ? 2 : 3,
    tier,
  };
}

export function getFrameRequestWindow({
  centerIndex,
  direction,
  frameCount,
  radius,
}: {
  centerIndex: number;
  direction: -1 | 0 | 1;
  frameCount: number;
  radius: number;
}) {
  if (frameCount <= 0) {
    return [];
  }

  const safeCenterIndex = Math.min(frameCount - 1, Math.max(0, centerIndex));
  const indices = [safeCenterIndex];
  const seen = new Set(indices);
  const append = (index: number) => {
    if (index >= 0 && index < frameCount && !seen.has(index)) {
      seen.add(index);
      indices.push(index);
    }
  };

  for (let distance = 1; distance <= radius; distance += 1) {
    if (direction >= 0) {
      append(safeCenterIndex + distance);
      append(safeCenterIndex - distance);
    } else {
      append(safeCenterIndex - distance);
      append(safeCenterIndex + distance);
    }
  }

  if (direction !== 0) {
    for (let distance = radius + 1; distance <= radius * 2; distance += 1) {
      append(safeCenterIndex + direction * distance);
    }
  }

  return indices;
}

export function getCanvasBackingSize({
  cssHeight,
  cssWidth,
  devicePixelRatio,
  maxPixels,
  sourceHeight,
  sourceWidth,
}: {
  cssHeight: number;
  cssWidth: number;
  devicePixelRatio: number;
  maxPixels: number;
  sourceHeight: number;
  sourceWidth: number;
}) {
  const safeCssWidth = Math.max(1, cssWidth);
  const safeCssHeight = Math.max(1, cssHeight);
  const canvasRatio = safeCssWidth / safeCssHeight;
  const sourceRatio = sourceWidth / sourceHeight;
  const sourcePixelRatio = sourceRatio > canvasRatio
    ? sourceHeight / safeCssHeight
    : sourceWidth / safeCssWidth;
  const pixelRatio = Math.max(
    0.5,
    Math.min(devicePixelRatio || 1, 2, sourcePixelRatio),
  );
  let width = Math.max(1, Math.round(safeCssWidth * pixelRatio));
  let height = Math.max(1, Math.round(safeCssHeight * pixelRatio));
  const pixelCount = width * height;

  if (pixelCount > maxPixels) {
    const scale = Math.sqrt(maxPixels / pixelCount);
    width = Math.max(1, Math.floor(width * scale));
    height = Math.max(1, Math.floor(height * scale));
  }

  return { height, pixelRatio, width };
}

export function chooseDecodedFramesToEvict({
  budget,
  currentIndex,
  entries,
  targetIndex,
}: {
  budget: number;
  currentIndex: number;
  entries: readonly DecodedFrameCacheEntry[];
  targetIndex: number;
}) {
  let decodedBytes = entries.reduce((total, entry) => total + entry.bytes, 0);
  if (decodedBytes <= budget) {
    return [];
  }

  const primaryIndices = new Set(
    entries.filter((entry) => !entry.fallback).map((entry) => entry.index),
  );
  const candidates = entries
    .filter((entry) => {
      if (entry.fallback && primaryIndices.has(entry.index)) {
        return true;
      }
      return entry.index !== targetIndex && entry.index !== currentIndex;
    })
    .sort((first, second) => {
      if (first.fallback !== second.fallback) {
        return first.fallback ? -1 : 1;
      }

      const firstDistance = Math.abs(first.index - targetIndex);
      const secondDistance = Math.abs(second.index - targetIndex);
      if (firstDistance !== secondDistance) {
        return secondDistance - firstDistance;
      }

      return first.lastUsed - second.lastUsed;
    });
  const evicted = [];

  for (const candidate of candidates) {
    if (decodedBytes <= budget) {
      break;
    }
    decodedBytes -= candidate.bytes;
    evicted.push(candidate);
  }

  return evicted;
}
