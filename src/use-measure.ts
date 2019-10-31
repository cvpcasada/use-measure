import { useState, useLayoutEffect, RefObject } from "react";
import ResizeObserver from "resize-observer-polyfill";
export interface DOMRectReadOnly {
  readonly x: number;
  readonly y: number;
  readonly width: number;
  readonly height: number;
  readonly top: number;
  readonly right: number;
  readonly bottom: number;
  readonly left: number;
}

export default function useMeasure(ref: RefObject<HTMLElement | null>) {
  const [bounds, setContentRect] = useState<DOMRectReadOnly>(
    // DOMRectReadOnly.fromRect()
    { x: 0, y: 0, width: 0, height: 0, top: 0, right: 0, bottom: 0, left: 0 }
  );

  useLayoutEffect(() => {
    if (ref.current === null) {
      return;
    }
    
    let animationFrameId : number | null = null;
    const measure: ResizeObserverCallback = ([entry]) => {
      animationFrameId = window.requestAnimationFrame(() => {
        setContentRect(entry.contentRect);
      });
    };

    const ro = new ResizeObserver(measure);
    ro.observe(ref.current!);

    return () => {
      window.cancelAnimationFrame(animationFrameId!);
      ro.disconnect();
    };
  }, []);

  return bounds;
}
