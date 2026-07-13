import type { FrameSequenceTier } from "./frameDelivery";

const HOME_JOURNEY_FRAME_COUNT = 300;
const HOME_JOURNEY_FRAME_DIRECTORY = "/how-it-works/scroll-frames";
export const homeJourneyFrameVersion = "2026-07-13-720p-optimized";

export const homeJourneyFrames = Array.from({ length: HOME_JOURNEY_FRAME_COUNT }, (_, index) => {
  const frameNumber = String(index + 1).padStart(3, "0");
  return `${HOME_JOURNEY_FRAME_DIRECTORY}/ezgif-frame-${frameNumber}.jpg?v=${homeJourneyFrameVersion}`;
});

export const homeJourneyFrameTiers: FrameSequenceTier[] = [
  {
    format: "jpeg",
    frames: homeJourneyFrames,
    height: 720,
    id: "720p",
    width: 1280,
  },
];

export const homeJourneyFirstFrame = homeJourneyFrames[0];
export const homeJourneyFinalFrame = homeJourneyFrames[homeJourneyFrames.length - 1];
export const homeJourneyFrameCount = HOME_JOURNEY_FRAME_COUNT;
