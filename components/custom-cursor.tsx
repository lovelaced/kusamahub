"use client"

import { useEffect, useRef } from "react"

function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null)
  const dotRef = useRef<HTMLDivElement>(null)
  const positionRef = useRef({ x: 0, y: 0 })
  const targetRef = useRef({ x: 0, y: 0 })
  const isHoveringRef = useRef(false)
  const isClickingRef = useRef(false)
  const animationFrameRef = useRef<number>(0)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      targetRef.current = { x: e.clientX, y: e.clientY }
    }

    const handleMouseDown = () => {
      isClickingRef.current = true
      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${positionRef.current.x - 16}px, ${positionRef.current.y - 16}px, 0) scale(0.8)`
      }
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${targetRef.current.x - 2}px, ${targetRef.current.y - 2}px, 0) scale(1.5)`
      }
    }

    const handleMouseUp = () => {
      isClickingRef.current = false
      updateCursorStyle()
    }

    const updateCursorStyle = () => {
      if (!cursorRef.current || !dotRef.current) return

      const scale = isHoveringRef.current ? 1.2 : 1
      const scaleModifier = isClickingRef.current ? 0.8 : 1

      cursorRef.current.style.transform = `translate3d(${positionRef.current.x - 16}px, ${positionRef.current.y - 16}px, 0) scale(${scale * scaleModifier})`
      cursorRef.current.style.borderColor = isHoveringRef.current ? "#00ff88" : "#00ffff"

      const dotScale = isClickingRef.current ? 1.5 : 1
      dotRef.current.style.transform = `translate3d(${targetRef.current.x - 2}px, ${targetRef.current.y - 2}px, 0) scale(${dotScale})`
    }

    const checkHover = () => {
      const element = document.elementFromPoint(targetRef.current.x, targetRef.current.y)
      const isHovering =
        element &&
        (element.matches('button, a, input, select, textarea, [role="button"], [tabindex]:not([tabindex="-1"])') ||
          element.closest('button, a, input, select, textarea, [role="button"], [tabindex]:not([tabindex="-1"])'))

      if (isHovering !== isHoveringRef.current) {
        isHoveringRef.current = !!isHovering
        updateCursorStyle()
      }
    }

    const animate = () => {
      // Smooth trailing for main cursor
      positionRef.current.x += (targetRef.current.x - positionRef.current.x) * 0.15
      positionRef.current.y += (targetRef.current.y - positionRef.current.y) * 0.15

      if (cursorRef.current && dotRef.current) {
        const scale = isHoveringRef.current ? 1.2 : 1
        const scaleModifier = isClickingRef.current ? 0.8 : 1

        cursorRef.current.style.transform = `translate3d(${positionRef.current.x - 16}px, ${positionRef.current.y - 16}px, 0) scale(${scale * scaleModifier})`

        // Instant tracking for center dot
        const dotScale = isClickingRef.current ? 1.5 : 1
        dotRef.current.style.transform = `translate3d(${targetRef.current.x - 2}px, ${targetRef.current.y - 2}px, 0) scale(${dotScale})`
      }

      checkHover()
      animationFrameRef.current = requestAnimationFrame(animate)
    }

    document.addEventListener("mousemove", handleMouseMove, { passive: true })
    document.addEventListener("mousedown", handleMouseDown, { passive: true })
    document.addEventListener("mouseup", handleMouseUp, { passive: true })

    animationFrameRef.current = requestAnimationFrame(animate)

    return () => {
      document.removeEventListener("mousemove", handleMouseMove)
      document.removeEventListener("mousedown", handleMouseDown)
      document.removeEventListener("mouseup", handleMouseUp)
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
    }
  }, [])

  return (
    <>
      <div
        ref={cursorRef}
        className="fixed top-0 left-0 w-8 h-8 pointer-events-none z-50 mix-blend-difference"
        style={{
          border: "2px solid #00ffff",
          borderRadius: "50%",
          willChange: "transform",
          transition: "border-color 100ms ease-out",
        }}
      >
        <div
          className="absolute inset-0 opacity-30"
          style={{
            background: "radial-gradient(circle, transparent 40%, currentColor 42%, currentColor 58%, transparent 60%)",
            transform: "rotate(45deg)",
          }}
        />
      </div>

      <div
        ref={dotRef}
        className="fixed top-0 left-0 w-1 h-1 pointer-events-none z-50 mix-blend-difference"
        style={{
          backgroundColor: "#00ff88",
          borderRadius: "50%",
          willChange: "transform",
          transition: "none",
        }}
      />
    </>
  )
}

export { CustomCursor }
export default CustomCursor
