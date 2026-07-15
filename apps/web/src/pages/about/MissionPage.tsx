import { useEffect, useRef, useState } from "react";
import { PublicShell, type PublicAuthState } from "../../components/public/PublicShell";
import type { Route } from "../../routes";
import {
  getMissionFinaleVisibility,
  getMissionStatementVisibility,
  getMissionStageVisibility,
  mapMissionScrollToVideoProgress,
} from "./missionTimeline";

const MISSION_VIDEO_PATH = "/about/retrofi-mission-path.mp4";
const MISSION_POSTER_PATH = "/about/retrofi-mission-business-to-ocean-start-v2.webp";

function PracticalGraphic() {
  return (
    <div aria-hidden="true" className="mission-clarity-map">
      <div className="mission-clarity-sources">
        <span>Options</span>
        <span>Requirements</span>
        <span>Tradeoffs</span>
      </div>
      <span className="mission-clarity-line"><i /></span>
      <strong>Clear next step</strong>
    </div>
  );
}

function ValueGraphic() {
  return (
    <div aria-hidden="true" className="mission-value-map">
      <span className="mission-value-orbit is-time">Time</span>
      <strong>Better-informed<br />investment</strong>
      <span className="mission-value-orbit is-money">Money</span>
    </div>
  );
}

const ecosystemMembers = [
  "Businesses",
  "Property owners",
  "Governments",
  "Homeowners",
  "Contractors",
  "Utilities",
  "Financial institutions",
];

function EcosystemGraphic() {
  return (
    <div className="mission-ecosystem-map">
      <strong aria-hidden="true">RetroFi</strong>
      <ul aria-label="People and institutions RetroFi aims to connect">
        {ecosystemMembers.map((member) => <li key={member}>{member}</li>)}
      </ul>
    </div>
  );
}

const missionChapters = [
  {
    copy: "RetroFi turns fragmented options, requirements, tradeoffs, expected outcomes, and next steps into a clear path people can understand and act on—without requiring specialist knowledge.",
    graphic: <PracticalGraphic />,
    title: "Clarity from complexity",
  },
  {
    copy: "Sustainable upgrades should respect both the budget and the calendar. RetroFi helps customers focus time and capital where they may matter most, supporting better-informed financial choices without presenting outcomes as guarantees.",
    graphic: <ValueGraphic />,
    title: "Value in time and money",
  },
  {
    copy: "RetroFi aims to connect businesses, property owners, governments, homeowners, contractors, utilities, and financial institutions—making sustainable retrofit projects easier to coordinate, repeat, and scale worldwide.",
    graphic: <EcosystemGraphic />,
    title: "One connected ecosystem",
  },
];

export function MissionPage({
  navigate,
  publicAuth,
}: {
  navigate: (route: Route) => void;
  publicAuth: PublicAuthState;
}) {
  const scrollSectionRef = useRef<HTMLElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const statementRef = useRef<HTMLElement | null>(null);
  const panelRefs = useRef<Array<HTMLElement | null>>([]);
  const finaleRef = useRef<HTMLDivElement | null>(null);
  const progressRef = useRef<HTMLSpanElement | null>(null);
  const progressDotRefs = useRef<Array<HTMLSpanElement | null>>([]);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(
    () => typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches,
  );
  const [videoReady, setVideoReady] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updatePreference = () => setPrefersReducedMotion(mediaQuery.matches);
    mediaQuery.addEventListener("change", updatePreference);
    return () => mediaQuery.removeEventListener("change", updatePreference);
  }, []);

  useEffect(() => {
    if (prefersReducedMotion) return undefined;

    const section = scrollSectionRef.current;
    if (!section) return undefined;

    let frameId = 0;
    let targetProgress = 0;
    let renderedProgress = 0;

    const readScrollProgress = () => {
      const scrollDistance = Math.max(1, section.offsetHeight - window.innerHeight);
      const traveled = Math.min(scrollDistance, Math.max(0, -section.getBoundingClientRect().top));
      return traveled / scrollDistance;
    };

    const renderProgress = (progress: number) => {
      const video = videoRef.current;
      if (video && Number.isFinite(video.duration) && video.duration > 0) {
        const nextTime = mapMissionScrollToVideoProgress(progress) * video.duration;
        if (Math.abs(video.currentTime - nextTime) > 1 / 120) {
          video.currentTime = nextTime;
        }
      }

      panelRefs.current.forEach((panel, index) => {
        if (!panel) return;
        const visibility = getMissionStageVisibility(progress, index);
        panel.style.opacity = visibility.toFixed(3);
        panel.style.pointerEvents = visibility > 0.55 ? "auto" : "none";
        panel.style.transform = `translate3d(0, ${(1 - visibility) * 22}px, 0) scale(${0.985 + visibility * 0.015})`;
        panel.dataset.active = visibility > 0.55 ? "true" : "false";
      });

      const statementVisibility = getMissionStatementVisibility(progress);
      if (statementRef.current) {
        statementRef.current.style.opacity = statementVisibility.toFixed(3);
        statementRef.current.style.pointerEvents = statementVisibility > 0.55 ? "auto" : "none";
        statementRef.current.style.transform = `translate3d(-50%, calc(-50% + ${(1 - statementVisibility) * 22}px), 0) scale(${0.985 + statementVisibility * 0.015})`;
      }

      const finaleVisibility = getMissionFinaleVisibility(progress);
      if (finaleRef.current) {
        finaleRef.current.style.opacity = finaleVisibility.toFixed(3);
        finaleRef.current.style.transform = `translate3d(-50%, calc(-50% + ${(1 - finaleVisibility) * 26}px), 0)`;
      }

      if (progressRef.current) {
        progressRef.current.style.transform = `scaleY(${progress})`;
      }

      const sceneVisibilities = [
        statementVisibility,
        ...missionChapters.map((_, index) => getMissionStageVisibility(progress, index)),
        finaleVisibility,
      ];
      progressDotRefs.current.forEach((dot, index) => {
        if (!dot) return;
        dot.dataset.active = sceneVisibilities[index] > 0.55 ? "true" : "false";
      });
    };

    const tick = () => {
      const difference = targetProgress - renderedProgress;
      renderedProgress += difference * 0.18;

      if (Math.abs(difference) < 0.0005) {
        renderedProgress = targetProgress;
      }

      renderProgress(renderedProgress);
      frameId = renderedProgress === targetProgress ? 0 : window.requestAnimationFrame(tick);
    };

    const requestRender = () => {
      targetProgress = readScrollProgress();
      if (!frameId) frameId = window.requestAnimationFrame(tick);
    };

    renderedProgress = readScrollProgress();
    targetProgress = renderedProgress;
    renderProgress(renderedProgress);
    window.addEventListener("scroll", requestRender, { passive: true });
    window.addEventListener("resize", requestRender);

    return () => {
      window.cancelAnimationFrame(frameId);
      window.removeEventListener("scroll", requestRender);
      window.removeEventListener("resize", requestRender);
    };
  }, [prefersReducedMotion, videoReady]);

  return (
    <PublicShell
      navigate={navigate}
      pageClassName="about-editorial-page home-page about-mission-page mission-page"
      publicAuth={publicAuth}
      showFooter
    >
      <section
        aria-labelledby="about-mission-title"
        className={prefersReducedMotion ? "mission-scroll-story is-reduced" : "mission-scroll-story"}
        ref={scrollSectionRef}
      >
        <div className="mission-sticky-stage">
          <div className="mission-video-frame" data-video-ready={videoReady ? "true" : "false"}>
            <img alt="A sustainable coastal property opening onto a path toward the ocean" className="mission-video-poster" src={MISSION_POSTER_PATH} />
            <video
              aria-hidden="true"
              className="mission-scroll-video"
              muted
              onError={() => setVideoReady(false)}
              onLoadedMetadata={(event) => {
                event.currentTarget.pause();
                event.currentTarget.currentTime = 0.001;
                setVideoReady(true);
              }}
              playsInline
              poster={MISSION_POSTER_PATH}
              preload="auto"
              ref={videoRef}
              tabIndex={-1}
            >
              <source src={MISSION_VIDEO_PATH} type="video/mp4" />
            </video>
            <div aria-hidden="true" className="mission-video-wash" />
            <div aria-hidden="true" className="mission-video-vignette" />
          </div>

          <div className="mission-story-label" aria-hidden="true">
            <span>Our mission</span>
            <i />
          </div>

          <div className="mission-progress" aria-hidden="true">
            <span className="mission-progress-line"><i ref={progressRef} /></span>
            {["M", "1", "2", "3", "V"].map((label, index) => (
              <span
                className="mission-progress-dot"
                key={label}
                ref={(element) => { progressDotRefs.current[index] = element; }}
              >
                {label}
              </span>
            ))}
          </div>

          <div className="mission-narrative">
            <header className="mission-statement" ref={statementRef}>
              <p className="about-editorial-eyebrow">Mission statement</p>
              <h1 id="about-mission-title">Sustainable retrofits, made practical.</h1>
              <p className="about-editorial-intro">
                RetroFi exists to make sustainable retrofit adoption practical, understandable, and
                financially worthwhile—saving customers time and money.
              </p>
            </header>
            {missionChapters.map((chapter, index) => (
              <article
                className={`mission-chapter mission-chapter-${index + 1}`}
                key={chapter.title}
                ref={(element) => { panelRefs.current[index] = element; }}
              >
                <div className="mission-chapter-heading">
                  <span className="mission-chapter-number">0{index + 1}</span>
                  <p>Our commitment</p>
                  <h2>{chapter.title}</h2>
                </div>
                <p className="mission-chapter-copy">{chapter.copy}</p>
                {chapter.graphic}
              </article>
            ))}
          </div>

          <div className="mission-finale" ref={finaleRef}>
            <p>Our vision</p>
            <h2>Making sustainable retrofits the standard—not the exception.</h2>
            <span>By connecting the people, programs, expertise, and capital each project depends on, RetroFi is working toward a world where sustainable retrofit investment is a normal, practical choice.</span>
          </div>
        </div>
      </section>
    </PublicShell>
  );
}
