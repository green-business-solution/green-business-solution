const SCANNER_FRAME_COUNT = 26;

export const scannerFrames = Array.from({ length: SCANNER_FRAME_COUNT }, (_, index) => {
  const frameNumber = String(index + 1).padStart(4, "0");
  return `/scanner-scroll/frames/frame_${frameNumber}.jpg`;
});

export const scannerFrameCount = SCANNER_FRAME_COUNT;
