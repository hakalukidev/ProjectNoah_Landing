"use client"

import {
  useEffect,
  useRef,
  useState,
  type ComponentPropsWithoutRef,
  type ElementType,
} from "react"

import { cn } from "@/lib/utils"

interface TypingAnimationProps extends ComponentPropsWithoutRef<"div"> {
  children: string
  className?: string
  /** Milliseconds between characters. */
  duration?: number
  /** Milliseconds to wait before the first character appears. */
  delay?: number
  as?: ElementType
  /** Hold off until the element scrolls into view instead of typing on mount. */
  startOnView?: boolean
}

/**
 * Types its text out one character at a time.
 *
 * Upstream (Magic UI) wraps the rendered tag in `motion.create()`, which
 * builds a fresh component type on every render - react-hooks/static-components
 * rejects that, and nothing here animates through motion anyway, so the tag
 * from `as` is rendered directly instead.
 */
export function TypingAnimation({
  children,
  className,
  duration = 100,
  delay = 0,
  as: Component = "div",
  startOnView = false,
  ...props
}: TypingAnimationProps) {
  const [displayedText, setDisplayedText] = useState("")
  const [started, setStarted] = useState(false)
  const elementRef = useRef<HTMLElement | null>(null)

  useEffect(() => {
    if (!startOnView) {
      const timeoutId = setTimeout(() => setStarted(true), delay)
      return () => clearTimeout(timeoutId)
    }

    const element = elementRef.current
    if (!element) return

    let timeoutId: ReturnType<typeof setTimeout> | undefined
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return
        timeoutId = setTimeout(() => setStarted(true), delay)
        observer.disconnect()
      },
      { threshold: 0.1 },
    )
    observer.observe(element)

    return () => {
      observer.disconnect()
      if (timeoutId) clearTimeout(timeoutId)
    }
  }, [delay, startOnView])

  useEffect(() => {
    if (!started) return

    let i = 0
    const typingEffect = setInterval(() => {
      if (i < children.length) {
        setDisplayedText(children.substring(0, i + 1))
        i++
      } else {
        clearInterval(typingEffect)
      }
    }, duration)

    return () => clearInterval(typingEffect)
  }, [children, duration, started])

  return (
    <Component ref={elementRef} className={cn(className)} {...props}>
      {displayedText}
    </Component>
  )
}
