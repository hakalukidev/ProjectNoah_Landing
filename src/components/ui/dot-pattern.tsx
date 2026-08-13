"use client"

import React, { useEffect, useId, useMemo, useRef, useState } from "react"

import { cn } from "@/lib/utils"

/**
 *  DotPattern Component Props
 *
 * @param {number} [width=16] - The horizontal spacing between dots
 * @param {number} [height=16] - The vertical spacing between dots
 * @param {number} [x=0] - The x-offset of the entire pattern
 * @param {number} [y=0] - The y-offset of the entire pattern
 * @param {number} [cx=1] - The x-offset of individual dots
 * @param {number} [cy=1] - The y-offset of individual dots
 * @param {number} [cr=1] - The radius of each dot
 * @param {string} [className] - Additional CSS classes to apply to the SVG container
 * @param {boolean} [glow=false] - Whether dots should have a glowing animation effect
 */
interface DotPatternProps extends React.SVGProps<SVGSVGElement> {
  width?: number
  height?: number
  x?: number
  y?: number
  cx?: number
  cy?: number
  cr?: number
  className?: string
  glow?: boolean
  [key: string]: unknown
}

/**
 * DotPattern Component
 *
 * A React component that creates an animated or static dot pattern background using SVG.
 * The pattern automatically adjusts to fill its container and can optionally display glowing dots.
 *
 * @component
 *
 * @see DotPatternProps for the props interface.
 *
 * @example
 * // Basic usage
 * <DotPattern />
 *
 * // With glowing effect and custom spacing
 * <DotPattern
 *   width={20}
 *   height={20}
 *   glow={true}
 *   className="opacity-50"
 * />
 *
 * @notes
 * - The component is client-side only ("use client")
 * - Automatically responds to container size changes via ResizeObserver
 * - When glow is enabled, dots animate with random delays/durations using a
 *   plain CSS keyframe animation (compositor-driven), not per-dot JS —
 *   mounting one Framer Motion instance per dot is what made this component
 *   janky on large, full-bleed sections.
 * - Dots color can be controlled via the text color utility classes
 */

export function DotPattern({
  width = 16,
  height = 16,
  x = 0,
  y = 0,
  cx = 1,
  cy = 1,
  cr = 1,
  className,
  glow = false,
  ...props
}: DotPatternProps) {
  const id = useId()
  const containerRef = useRef<SVGSVGElement>(null)
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 })

  useEffect(() => {
    const element = containerRef.current
    if (!element) return

    let frame = 0
    const observer = new ResizeObserver(([entry]) => {
      // Coalesce rapid resize notifications into a single update per frame.
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(() => {
        const { width, height } = entry.contentRect
        setDimensions((prev) =>
          prev.width === width && prev.height === height
            ? prev
            : { width, height }
        )
      })
    })
    observer.observe(element)

    return () => {
      cancelAnimationFrame(frame)
      observer.disconnect()
    }
  }, [])

  const dots = useMemo(() => {
    const cols = Math.ceil(dimensions.width / width)
    const rows = Math.ceil(dimensions.height / height)

    return Array.from({ length: cols * rows }, (_, i) => {
      const col = i % cols
      const row = Math.floor(i / cols)
      // Deterministic pseudo-random values (seeded by index) instead of
      // Math.random(), which is an impure call during render.
      const seeded = (n: number) => {
        const s = Math.sin(n) * 10000
        return s - Math.floor(s)
      }
      return {
        x: col * width + cx + x,
        y: row * height + cy + y,
        delay: seeded(i) * 5,
        duration: seeded(i + 0.5) * 3 + 2,
      }
    })
  }, [dimensions.width, dimensions.height, width, height, cx, cy, x, y])

  return (
    <svg
      ref={containerRef}
      aria-hidden="true"
      className={cn(
        "pointer-events-none absolute inset-0 h-full w-full text-neutral-400/80",
        className
      )}
      {...props}
    >
      <defs>
        <radialGradient id={`${id}-gradient`}>
          <stop offset="0%" stopColor="currentColor" stopOpacity="1" />
          <stop offset="100%" stopColor="currentColor" stopOpacity="0" />
        </radialGradient>
      </defs>
      {dots.map((dot) => (
        <circle
          key={`${dot.x}-${dot.y}`}
          cx={dot.x}
          cy={dot.y}
          r={cr}
          fill={glow ? `url(#${id}-gradient)` : "currentColor"}
          className={glow ? "animate-dot-glow origin-center" : undefined}
          style={
            glow
              ? {
                  animationDelay: `${dot.delay}s`,
                  animationDuration: `${dot.duration}s`,
                }
              : undefined
          }
        />
      ))}
    </svg>
  )
}
