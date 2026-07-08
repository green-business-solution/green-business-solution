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
  const currentFrameRef = useRef(0);
  const frameRequestRef = useRef<number | null>(null);
  const [isFirstFrameLoaded, setIsFirstFrameLoaded] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;
    const canvas = canvasRef.current;

    if (!section || !canvas || frames.length === 0) {
      return undefined;
    }

    let isDisposed = false;
    let renderLoopFrame = 0;
    const reducedMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
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

    const drawFrame = (frameIndex: number) => {
      const bestFrameIndex = getBestLoadedFrameIndex(frameIndex);
      const image = bestFrameIndex >= 0 ? imagesRef.current[bestFrameIndex] : null;

      if (!image) {
        return;
      }

      currentFrameRef.current = bestFrameIndex;
      drawCoverImage(canvas, image);
    };

    const requestDraw = () => {
      if (frameRequestRef.current !== null) {
        return;
      }

      frameRequestRef.current = window.requestAnimationFrame(() => {
        frameRequestRef.current = null;
        const progress = reducedMotionQuery.matches ? 1 : getScrollProgress();
        const frameIndex = Math.min(frames.length - 1, Math.max(0, Math.round(progress * (frames.length - 1))));
        section.style.setProperty("--scroll-frame-progress", progress.toFixed(4));
        section.style.setProperty("--scroll-frame-cue-opacity", String(Math.max(0, 1 - progress * 4)));
        section.style.setProperty("--scroll-frame-copy-out", smoothstep(0.2, 0.44, progress).toFixed(4));
        section.style.setProperty("--scroll-frame-copy-in", smoothstep(0.34, 0.56, progress).toFixed(4));
        drawFrame(frameIndex);
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
          drawCoverImage(canvas, image);
        } else if (index === currentFrameRef.current) {
          drawCoverImage(canvas, image);
        }

        requestDraw();
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
      drawFrame(currentFrameRef.current);
      requestDraw();
    };

    const renderLoop = () => {
      if (isDisposed) {
        return;
      }

      requestDraw();
      renderLoopFrame = window.requestAnimationFrame(renderLoop);
    };

    loadFrame(frames[0], 0);
    preloadRemainingFrames();
    renderLoopFrame = window.requestAnimationFrame(renderLoop);

    window.addEventListener("scroll", requestDraw, { passive: true });
    window.addEventListener("resize", handleResize);
    reducedMotionQuery.addEventListener("change", requestDraw);

    return () => {
      isDisposed = true;
      if (frameRequestRef.current !== null) {
        window.cancelAnimationFrame(frameRequestRef.current);
      }
      window.cancelAnimationFrame(renderLoopFrame);
      window.removeEventListener("scroll", requestDraw);
      window.removeEventListener("resize", handleResize);
      reducedMotionQuery.removeEventListener("change", requestDraw);
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
