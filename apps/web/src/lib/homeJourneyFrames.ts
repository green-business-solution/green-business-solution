import homeJourneyFrameBuild from "./homeJourneyFrameBuild.json";
import type { FrameAssetFormat, FrameSequenceTier } from "./frameDelivery";

const HOME_JOURNEY_FRAME_COUNT = 300;
const HOME_JOURNEY_FRAME_DIRECTORY = "/how-it-works/scroll-frames";
const HOME_JOURNEY_GENERATED_DIRECTORY =
  `${HOME_JOURNEY_FRAME_DIRECTORY}/generated/${homeJourneyFrameBuild.version}`;
export const homeJourneyFrameVersion = homeJourneyFrameBuild.version;

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
  ...homeJourneyFrameBuild.tiers.map((tier) => ({
    format: tier.format as FrameAssetFormat,
    frames: homeJourneyFrameBuild.canonicalFrameNumbers.map((canonicalFrameNumber) =>
      `${HOME_JOURNEY_GENERATED_DIRECTORY}/${tier.id}/ezgif-frame-${String(canonicalFrameNumber).padStart(3, "0")}.${tier.format}`
    ),
    height: tier.height,
    id: tier.id,
    width: tier.width,
  })),
];

export const homeJourneyFirstFrame = homeJourneyFrames[0];
export const homeJourneyFinalFrame = homeJourneyFrames[homeJourneyFrames.length - 1];
export const homeJourneyFrameCount = HOME_JOURNEY_FRAME_COUNT;
