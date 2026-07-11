const HOME_JOURNEY_FRAME_COUNT = 300;
const HOME_JOURNEY_FRAME_DIRECTORY = "/how-it-works/scroll-frames";

export const homeJourneyFrames = Array.from({ length: HOME_JOURNEY_FRAME_COUNT }, (_, index) => {
  const frameNumber = String(index + 1).padStart(3, "0");
  return `${HOME_JOURNEY_FRAME_DIRECTORY}/ezgif-frame-${frameNumber}.jpg`;
});

export const homeJourneyFirstFrame = homeJourneyFrames[0];
export const homeJourneyFinalFrame = homeJourneyFrames[homeJourneyFrames.length - 1];
export const homeJourneyFrameCount = HOME_JOURNEY_FRAME_COUNT;
