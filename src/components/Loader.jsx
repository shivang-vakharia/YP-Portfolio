import { useEffect, useRef } from "react"
import gsap from "gsap"

export default function Loader({ onComplete }) {
  const loaderRef = useRef(null)
  const counterRef = useRef(null)
  const wipeRef = useRef(null)
  const veilRef = useRef(null)
  const doneRef = useRef(false)

  useEffect(() => {
    document.body.style.overflow = "hidden"

    const loader = loaderRef.current
    const counter = counterRef.current
    const wipe = wipeRef.current
    const veil = veilRef.current

    gsap.set(".hero-title", {
      y: 200,
      skewY: 8,
      opacity: 0,
      scale: 1.2,
      filter: "blur(18px)",
      transformOrigin: "50% 50%",
    })
    gsap.set(".hero-meta", {
      y: 28,
      opacity: 0,
      filter: "blur(8px)",
    })
    gsap.set(".content-band", {
      y: 48,
      opacity: 0,
      filter: "blur(8px)",
    })
    gsap.set(".main-content", { opacity: 0 })
    gsap.set(wipe, { yPercent: 100 })
    gsap.set(veil, {
      opacity: 1,
      scale: 1,
    })
    gsap.set(counter, {
      opacity: 1,
      filter: "blur(0px)",
      scale: 1,
    })

    let counterTimer
    let current = 0
    const startedAt = performance.now()
    const sprintDuration = 2050

    const getIncrement = () => {
      return Math.floor(Math.random() * 7) + 2
    }

    const finish = () => {
      if (doneRef.current) return
      doneRef.current = true

      const timeline = gsap.timeline({
        defaults: { ease: "expo.inOut" },
        onComplete: () => {
          document.body.style.overflow = ""
          onComplete?.()
          gsap.set(loader, { display: "none" })
        },
      })

      timeline
        .to(counter, {
          y: -44,
          opacity: 0,
          filter: "blur(16px)",
          scale: 0.92,
          duration: 0.58,
        })
        .to(
          wipe,
          {
            yPercent: 0,
            duration: 0.82,
          },
          "-=0.28"
        )
        .to(
          ".main-content",
          {
            opacity: 1,
            duration: 0.01,
          },
          "-=0.2"
        )
        .to(
          loader,
          {
            yPercent: -100,
            duration: 1.05,
          },
          "-=0.08"
        )
        .to(
          ".hero-title",
          {
            y: 0,
            skewY: 0,
            opacity: 1,
            scale: 1,
            filter: "blur(0px)",
            duration: 1.35,
            ease: "expo.out",
          },
          "-=0.72"
        )
        .to(
          [".hero-meta", ".content-band"],
          {
            y: 0,
            opacity: 1,
            filter: "blur(0px)",
            duration: 0.85,
            stagger: 0.08,
            ease: "expo.out",
          },
          "-=1.02"
        )
    }

    const runFinalTail = (index = 0) => {
      const tailValues = [97, 98, 99, 100]
      const tailDelays = [90, 145, 230, 340]
      const value = tailValues[index]

      current = value
      counter.textContent = `${current}%`

      if (value === 100) {
        counterTimer = setTimeout(finish, 360)
        return
      }

      counterTimer = setTimeout(
        () => runFinalTail(index + 1),
        tailDelays[index]
      )
    }

    const updateCounter = () => {
      const elapsed = performance.now() - startedAt

      if (current >= 96 || elapsed >= sprintDuration) {
        current = 96
        counter.textContent = `${current}%`
        counterTimer = setTimeout(() => runFinalTail(), 65)
        return
      }

      if (current >= 88) {
        current = Math.min(current + Math.floor(Math.random() * 3) + 2, 96)
      } else {
        current = Math.min(current + getIncrement(), 96)
      }
      counter.textContent = `${current}%`

      const delay = current >= 88 ? 58 : 35
      counterTimer = setTimeout(updateCounter, delay)
    }

    counter.textContent = "0%"
    counterTimer = setTimeout(updateCounter, 220)

    return () => {
      clearTimeout(counterTimer)
      document.body.style.overflow = ""
    }
  }, [onComplete])

  return (
    <div ref={loaderRef} className="loader-shell" aria-hidden="true">
      <div ref={veilRef} className="loader-veil" />
      <div ref={counterRef} className="counter" data-cursor-invert="true">
        0%
      </div>
      <div ref={wipeRef} className="loader-overlay" />
    </div>
  )
}
