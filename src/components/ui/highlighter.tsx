"use client";

import { type ReactNode, useEffect, useRef } from "react";
import { useInView } from "motion/react";
import { annotate } from "rough-notation";
import type { RoughAnnotation, RoughAnnotationType } from "rough-notation/lib/model";

interface HighlighterProps {
  children: ReactNode;
  action?: RoughAnnotationType;
  color?: string;
  strokeWidth?: number;
  animationDuration?: number;
  iterations?: number;
  padding?: number;
  multiline?: boolean;
  isView?: boolean;
}

/**
 * Magic UI "Highlighter" — draws a hand-sketched annotation (highlight,
 * underline, circle, box, strike-through…) around its children using
 * rough-notation, once the element scrolls into view.
 */
export function Highlighter({
  children,
  action = "highlight",
  color = "var(--primary)",
  strokeWidth = 1.5,
  animationDuration = 600,
  iterations = 2,
  padding = 2,
  multiline = true,
  isView = true,
}: HighlighterProps) {
  const elementRef = useRef<HTMLSpanElement>(null);
  const inView = useInView(elementRef, { once: true, margin: "-10%" });
  const shouldAnnotate = !isView || inView;

  useEffect(() => {
    if (!shouldAnnotate) return;
    const element = elementRef.current;
    if (!element) return;

    const annotation: RoughAnnotation = annotate(element, {
      type: action,
      color,
      strokeWidth,
      animationDuration,
      iterations,
      padding,
      multiline,
    });

    annotation.show();

    const resizeObserver = new ResizeObserver(() => {
      annotation.hide();
      annotation.show();
    });
    resizeObserver.observe(element);

    return () => {
      resizeObserver.disconnect();
      annotation.remove();
    };
  }, [
    action,
    color,
    strokeWidth,
    animationDuration,
    iterations,
    padding,
    multiline,
    shouldAnnotate,
  ]);

  return (
    <span ref={elementRef} className="relative inline-block bg-transparent">
      {children}
    </span>
  );
}
