import { useEffect, useRef } from "react"
import gsap from "gsap"

export default function Cursor() {
  const cursorRef = useRef(null)

  useEffect(() => {
    const cursor = cursorRef.current
    if (!cursor) return

    gsap.set(cursor, { xPercent: -50, yPercent: -50 })
    const xTo = gsap.quickTo(cursor, "x", {
      duration: 0.55,
      ease: "power3.out",
    })
    const yTo = gsap.quickTo(cursor, "y", {
      duration: 0.55,
      ease: "power3.out",
    })

    const onMouseMove = (event) => {
      xTo(event.clientX)
      yTo(event.clientY)
      gsap.to(cursor, {
        opacity: 1,
        duration: 0.25,
        ease: "power3.out",
      })
    }
    const onMouseOver = (event) => {
      if (event.target.closest("a, button")) {
        gsap.to(cursor, {
          scale: 3.6,
          duration: 0.35,
          ease: "power3.out",
        })
      }
    }
    const onMouseOut = (event) => {
      if (event.target.closest("a, button")) {
        gsap.to(cursor, {
          scale: 1,
          duration: 0.35,
          ease: "power3.out",
        })
      }
    }

    window.addEventListener("mousemove", onMouseMove)
    document.addEventListener("mouseover", onMouseOver)
    document.addEventListener("mouseout", onMouseOut)

    return () => {
      window.removeEventListener("mousemove", onMouseMove)
      document.removeEventListener("mouseover", onMouseOver)
      document.removeEventListener("mouseout", onMouseOut)
      gsap.killTweensOf(cursor)
    }
  }, [])

  return (
    <div
      ref={cursorRef}
      className="cursor"
      aria-hidden="true"
    />
  )
}
