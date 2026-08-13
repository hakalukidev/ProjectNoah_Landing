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
  children: string;
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
  const words = children.split(" ");

  return (
    <div ref={targetRef} className={cn("relative z-0 h-[150vh]", className)}>
      <div className="sticky top-0 mx-auto flex h-screen max-w-4xl items-center bg-transparent px-6 py-20 lg:px-8">
        <p className="flex flex-wrap text-2xl font-bold leading-snug text-foreground/15 sm:text-3xl md:text-4xl lg:text-5xl">
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
