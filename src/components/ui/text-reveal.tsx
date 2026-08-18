"use client";

import { type FC, type ReactNode, useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  type MotionValue,
} from "motion/react";

import { cn } from "@/lib/utils";

export interface TextRevealProps {
  /**
   * One entry per "word" to reveal. Plain strings are the common case;
   * an entry can also be a ReactNode (e.g. a NumberTicker) so a stat
   * inside the sentence can animate independently of the reveal itself.
   */
  children: string | ReactNode[];
  className?: string;
}

/**
 * Magic UI "Text Reveal" — words fade in one by one as the section
 * scrolls through the viewport, pinned via a sticky inner container.
 */
export const TextReveal: FC<TextRevealProps> = ({ children, className }) => {
  const targetRef = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start 0.9", "end 0.25"],
  });
  const words = typeof children === "string" ? children.split(" ") : children;

  return (
    <div ref={targetRef} className={cn("relative z-0 h-[120vh]", className)}>
      <div className="sticky top-0 mx-auto flex h-[60vh] max-w-5xl items-center bg-transparent px-6 py-6 lg:px-8">
        <p className="flex flex-wrap text-3xl font-bold leading-snug text-foreground/15 sm:text-4xl md:text-5xl lg:text-6xl">
          {words.map((word, i) => {
            const start = i / words.length;
            const end = start + 1 / words.length;
            return (
              <Word key={i} progress={scrollYProgress} range={[start, end]}>
                {word}
              </Word>
            );
          })}
        </p>
      </div>
    </div>
  );
};

interface WordProps {
  children: ReactNode;
  progress: MotionValue<number>;
  range: [number, number];
}

const Word: FC<WordProps> = ({ children, progress, range }) => {
  const opacity = useTransform(progress, range, [0, 1]);
  return (
    <span className="relative mx-1 mt-1 lg:mx-2 lg:mt-2">
      <motion.span style={{ opacity }} className="text-foreground">
        {children}
      </motion.span>
    </span>
  );
};
