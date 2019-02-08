import { useRef, useState, useLayoutEffect } from "react";
import ResizeObserver from 'resize-observer-polyfill';
 
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

export default function useMeasure() {
  const nodeRef = useRef<Element>(null);
  const [contentRect, setContentRect] = useState<DOMRectReadOnly | null>(null);

  useLayoutEffect(() => {
    let animId: number | null = null;
    
    const measure: ResizeObserverCallback = entries => {
      animId = requestAnimationFrame(() => {
        setContentRect(entries[0].contentRect);
      });
    };

    const resizeObserver = new ResizeObserver(measure);

    if (nodeRef && nodeRef.current) {
      resizeObserver.observe(nodeRef.current);
    }

    return () => {
      resizeObserver.disconnect();
      if (animId !== null) {
        cancelAnimationFrame(animId)
      }
    };
  }, []);

  return [nodeRef, contentRect];
}