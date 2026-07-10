import { ReactNode, useEffect, useRef, useState } from "react";

type ScrollFrameScannerProps = {
  ariaLabelledBy?: string;
  children?: ReactNode;
  className?: string;
  frames: string[];
};

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
  const context = canvas.getContext("2d");

  if (!context) {
    return;
  }

  const rect = canvas.getBoundingClientRect();
  const pixelRatio = Math.min(window.devicePixelRatio || 1, 2);
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
}

export function ScrollFrameScanner({ ariaLabelledBy, children, className, frames }: ScrollFrameScannerProps) {
  const sectionRef = useRef<HTMLElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const imagesRef = useRef<Array<HTMLImageElement | null>>([]);
  const loadedRef = useRef<boolean[]>([]);
  const currentFrameRef = useRef(-1);
  const frameRequestRef = useRef<number | null>(null);
  const [isFirstFrameLoaded, setIsFirstFrameLoaded] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;
    const canvas = canvasRef.current;

    if (!section || !canvas || frames.length === 0) {
      return undefined;
    }

    let isDisposed = false;
    let forceNextDraw = false;
    const reducedMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const primaryMessage = section.querySelector<HTMLElement>(".planet-scan-message-primary");
    const nextMessage = section.querySelector<HTMLElement>(".planet-scan-message-next");
    imagesRef.current = Array.from({ length: frames.length }, () => null);
    loadedRef.current = Array.from({ length: frames.length }, () => false);

    const getBestLoadedFrameIndex = (targetIndex: number) => {
      if (loadedRef.current[targetIndex]) {
        return targetIndex;
      }

      for (let index = targetIndex; index >= 0; index -= 1) {
        if (loadedRef.current[index]) {
          return index;
        }
      }

      for (let index = targetIndex + 1; index < loadedRef.current.length; index += 1) {
        if (loadedRef.current[index]) {
          return index;
        }
      }

      return -1;
    };

    const getScrollProgress = () => {
      const scrollDistance = Math.max(1, section.offsetHeight - window.innerHeight);
      return clamp(-section.getBoundingClientRect().top / scrollDistance);
    };

    const drawFrame = (frameIndex: number, force = false) => {
      const bestFrameIndex = getBestLoadedFrameIndex(frameIndex);
      const image = bestFrameIndex >= 0 ? imagesRef.current[bestFrameIndex] : null;

      if (!image || (!force && bestFrameIndex === currentFrameRef.current)) {
        return;
      }

      currentFrameRef.current = bestFrameIndex;
      drawCoverImage(canvas, image);
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

    const requestDraw = (force = false) => {
      forceNextDraw = forceNextDraw || force;

      if (frameRequestRef.current !== null) {
        return;
      }

      frameRequestRef.current = window.requestAnimationFrame(() => {
        frameRequestRef.current = null;
        const shouldForceDraw = forceNextDraw;
        forceNextDraw = false;
        const progress = reducedMotionQuery.matches ? 0 : getScrollProgress();
        const frameIndex = Math.min(frames.length - 1, Math.max(0, Math.round(progress * (frames.length - 1))));
        applyCopyMotion(progress);
        drawFrame(frameIndex, shouldForceDraw);
      });
    };

    const loadFrame = (src: string, index: number) => {
      const image = new Image();
      image.decoding = "async";
      image.onload = () => {
        if (isDisposed) {
          return;
        }

        imagesRef.current[index] = image;
        loadedRef.current[index] = true;

        if (index === 0) {
          setIsFirstFrameLoaded(true);
          requestDraw(true);
        } else if (index === currentFrameRef.current) {
          requestDraw(true);
        } else {
          requestDraw();
        }
      };
      image.src = src;
    };

    const preloadRemainingFrames = () => {
      frames.forEach((src, index) => {
        if (index > 0) {
          loadFrame(src, index);
        }
      });
    };

    const handleResize = () => {
      requestDraw(true);
    };
    const handleScroll = () => {
      requestDraw();
    };
    const handleReducedMotionChange = () => {
      requestDraw(true);
    };

    loadFrame(frames[0], 0);
    preloadRemainingFrames();

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleResize);
    reducedMotionQuery.addEventListener("change", handleReducedMotionChange);

    return () => {
      isDisposed = true;
      if (frameRequestRef.current !== null) {
        window.cancelAnimationFrame(frameRequestRef.current);
      }
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
      reducedMotionQuery.removeEventListener("change", handleReducedMotionChange);
    };
  }, [frames]);

  return (
    <section
      aria-labelledby={ariaLabelledBy}
      className={["scroll-frame-scanner", className].filter(Boolean).join(" ")}
      data-loaded={isFirstFrameLoaded ? "true" : "false"}
      ref={sectionRef}
    >
      <div className="scroll-frame-scanner-sticky">
        <canvas aria-hidden="true" className="scroll-frame-scanner-canvas" ref={canvasRef} />
        <div aria-hidden="true" className="scroll-frame-scanner-gradient" />
        {children}
      </div>
    </section>
  );
}
