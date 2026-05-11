import Loader from "./components/Loader"
import FilmGrain from "./components/FilmGrain"
import Cursor from "./components/Cursor"
import Background from "./components/Background"
import { useCallback, useEffect, useRef, useState } from "react"
import gsap from "gsap"
import ypImage from "./assets/YP-Image.jpeg"

function App() {
  const [isLoaded, setIsLoaded] = useState(false)
  const [showNav, setShowNav] = useState(false)
  const heroRef = useRef(null)
  const titleRef = useRef(null)
  const introLabelRef = useRef(null)
  const reachLabelRef = useRef(null)
  const kineticSectionRef = useRef(null)
  const kineticCardRef = useRef(null)
  const marqueeTrackRef = useRef(null)
  const handleLoaderComplete = useCallback(() => {
    setIsLoaded(true)
  }, [])

  useEffect(() => {
    const hero = heroRef.current
    const title = titleRef.current
    const introLabel = introLabelRef.current
    const reachLabel = reachLabelRef.current
    const kineticSection = kineticSectionRef.current
    const card = kineticCardRef.current
    const marqueeTrack = marqueeTrackRef.current
    if (!hero || !title || !kineticSection || !card || !marqueeTrack || !introLabel || !reachLabel) return

    const moveHero = gsap.quickTo(hero, "x", {
      duration: 2,
      ease: "power3.out",
    })
    const liftHero = gsap.quickTo(hero, "y", {
      duration: 2,
      ease: "power3.out",
    })
    const skewTitle = gsap.quickTo(title, "skewY", {
      duration: 0.8,
      ease: "power3.out",
    })

    const splitLabel = (element, key, wrapClass, charClass) => {
      if (element.dataset[key]) return
      const text = element.textContent ?? ""
      element.textContent = ""
      const fragment = document.createDocumentFragment()
      for (const ch of text) {
        const wrap = document.createElement("span")
        wrap.className = wrapClass
        const inner = document.createElement("span")
        inner.className = charClass
        inner.textContent = ch
        wrap.appendChild(inner)
        fragment.appendChild(wrap)
      }
      element.appendChild(fragment)
      element.dataset[key] = "true"
    }

    splitLabel(introLabel, "split", "intro-char-wrap", "intro-char")

    if (!reachLabel.dataset.split) {
      const lineNodes = Array.from(reachLabel.querySelectorAll(".reach-line"))
      lineNodes.forEach((lineNode) => {
        const text = lineNode.textContent ?? ""
        lineNode.textContent = ""
        const fragment = document.createDocumentFragment()
        for (const ch of text) {
          const wrap = document.createElement("span")
          wrap.className = "reach-char-wrap"
          const inner = document.createElement("span")
          inner.className = "reach-char"
          inner.textContent = ch
          wrap.appendChild(inner)
          fragment.appendChild(wrap)
        }
        lineNode.appendChild(fragment)
      })
      reachLabel.dataset.split = "true"
    }

    const introChars = introLabel.querySelectorAll(".intro-char")
    const reachChars = reachLabel.querySelectorAll(".reach-char")
    const labelObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return
          if (entry.target === introLabel) {
            gsap.fromTo(
              introChars,
              { xPercent: 105 },
              {
                xPercent: 0,
                duration: 0.88,
                ease: "power2.out",
                stagger: 0.045,
              }
            )
          }
          if (entry.target === reachLabel) {
            gsap.fromTo(
              reachChars,
              { xPercent: 105 },
              {
                xPercent: 0,
                duration: 0.88,
                ease: "power2.out",
                stagger: 0.045,
              }
            )
          }
          observer.unobserve(entry.target)
        })
      },
      { threshold: 0.2 }
    )
    labelObserver.observe(introLabel)
    labelObserver.observe(reachLabel)
    let lastY = window.scrollY
    let resetTween
    let marqueeOffset = 0
    let marqueeDirection = -1
    let previousFrameTime = performance.now()
    let velocityTarget = 0
    let velocityCurrent = 0
    let elapsed = 0

    const getLoopWidth = () => {
      const loop = marqueeTrack.firstElementChild
      return loop ? loop.clientWidth : 0
    }

    let rafId = 0

    const updateMarquee = (now) => {
      const delta = Math.min(40, now - previousFrameTime)
      previousFrameTime = now
      elapsed += delta * 0.001
      const width = getLoopWidth()

      if (width > 0) {
        marqueeOffset += marqueeDirection * 0.075 * delta
        if (marqueeOffset <= -width) marqueeOffset += width
        if (marqueeOffset >= 0) marqueeOffset -= width
        marqueeTrack.style.transform = `translate3d(${marqueeOffset}px, 0, 0)`
      }

      velocityCurrent += (velocityTarget - velocityCurrent) * 0.2
      velocityTarget *= 0.9

      const sectionRect = kineticSection.getBoundingClientRect()
      const sectionProgress =
        (window.innerHeight * 0.45 - sectionRect.top) /
        (window.innerHeight + sectionRect.height)
      const clampedProgress = gsap.utils.clamp(-0.25, 1.15, sectionProgress)

      const flowY = gsap.utils.clamp(-320, 250, -clampedProgress * 430)
      const stretch = gsap.utils.clamp(-1, 1, velocityCurrent / 24)
      const idleAmp = 10
      const idleX = Math.sin(elapsed * 1.15) * 6
      const idleY = Math.sin(elapsed * 1.9) * idleAmp + Math.cos(elapsed * 1.35) * 4
      const idleDistort = Math.sin(elapsed * 1.65) * 0.34 + Math.cos(elapsed * 1.1) * 0.22
      const activityBoost = Math.min(1, Math.abs(stretch) * 1.4)
      const boostedIdleY = idleY * (1 + activityBoost * 0.75)
      const boostedIdleX = idleX * (1 + activityBoost * 0.5)
      const velocityLift = gsap.utils.clamp(-220, 220, -velocityCurrent * 3.1)
      const rotateY = stretch * 10.5 + idleDistort * 2.1
      const rotateX = -stretch * 3.6 + idleDistort * 1.1
      const skewY = stretch * 12 + idleDistort * 2.8
      const skewX = stretch * 4.8 + idleDistort * 1.6
      const scaleY = 1 + Math.abs(stretch) * 0.11 + Math.abs(idleDistort) * 0.02
      const scaleX = 1 - Math.abs(stretch) * 0.045 - Math.abs(idleDistort) * 0.01
      const driftX = stretch * 18 + idleDistort * 5.5
      gsap.set(card, {
        x: driftX + boostedIdleX,
        y: flowY + boostedIdleY + velocityLift,
        rotateX,
        rotateY,
        skewX,
        skewY,
        scaleX,
        scaleY,
        transformOrigin: "50% 50%",
      })

      rafId = requestAnimationFrame(updateMarquee)
    }

    const onResize = () => {
      marqueeOffset = 0
    }

    const onMouseMove = (event) => {
      const x = (event.clientX / window.innerWidth - 0.5) * 36
      const y = (event.clientY / window.innerHeight - 0.5) * 24

      moveHero(x)
      liftHero(y)
    }

    const onScroll = () => {
      const velocity = window.scrollY - lastY
      lastY = window.scrollY
      const skew = gsap.utils.clamp(-7, 7, velocity * 0.03)
      const heroRect = hero.getBoundingClientRect()
      setShowNav(heroRect.bottom <= 120)

      skewTitle(skew)
      velocityTarget = gsap.utils.clamp(-80, 80, velocity)
      marqueeDirection = velocity > 0 ? 1 : velocity < 0 ? -1 : marqueeDirection

      resetTween?.kill()
      resetTween = gsap.delayedCall(0.12, () => skewTitle(0))
    }

    rafId = requestAnimationFrame(updateMarquee)
    window.addEventListener("mousemove", onMouseMove)
    window.addEventListener("scroll", onScroll, { passive: true })
    window.addEventListener("resize", onResize)

    return () => {
      window.removeEventListener("mousemove", onMouseMove)
      window.removeEventListener("scroll", onScroll)
      window.removeEventListener("resize", onResize)
      labelObserver.disconnect()
      cancelAnimationFrame(rafId)
      resetTween?.kill()
    }
  }, [])

  return (
    <>
      <Background />
      <Loader onComplete={handleLoaderComplete} />

      <header className={`site-nav ${showNav ? "is-visible" : ""}`}>
        <a href="#" className="site-nav-logo">Yohaan Patel</a>
        <nav className="site-nav-links" aria-label="Primary">
        </nav>
      </header>

      <main
        className={`main-content ${isLoaded ? "is-loaded" : ""}`}
      >
        <section className="hero-section">
          <div ref={heroRef} className="hero parallax">
            <p className="hero-kicker">Pussy portfolio / 2026</p>
            <h1
              ref={titleRef}
              className="hero-title"
            >
              Yohaan
              <span>Patel</span>
            </h1>

            <div className="hero-meta">
              <p>Chhori patata hai</p>
              <p>Badaal</p>
            </div>
          </div>
        </section>

        <section ref={kineticSectionRef} className="kinetic-section">
          <div className="kinetic-copy">
            <p className="kinetic-copy-availability">
              Currently available for freelance projects.
            </p>
            <p className="kinetic-copy-description">
              Mumbai-based visual creative synthesizing graphic design, video
              editing, and 3D art to construct immersive digital media.
            </p>
          </div>

          <div className="kinetic-image-shell">
            <div ref={kineticCardRef} className="kinetic-image-card">
              <img src={ypImage} alt="Yohaan Patel portrait" className="kinetic-image" />
            </div>
          </div>

          <div className="kinetic-marquee" aria-hidden="true">
            <div ref={marqueeTrackRef} className="kinetic-marquee-track">
              <p className="kinetic-marquee-loop">
                <span>Graphic Designer</span>
                <span>Video Editor</span>
                <span>3D Artist</span>
              </p>
              <p className="kinetic-marquee-loop">
                <span>Graphic Designer</span>
                <span>Video Editor</span>
                <span>3D Artist</span>
              </p>
            </div>
          </div>
        </section>

        <section className="intro-section">
          <div className="intro-label-wrap">
            <span ref={introLabelRef} className="intro-label">Intro</span>
          </div>

          <div className="intro-content">
            <p className="intro-lead">
              Having started with graphic composition and visual storytelling,
              I now combine design taste with technical execution to craft
              memorable digital experiences.
            </p>
            <p className="intro-statement">
              Visual creative with a design-driven mindset, building immersive
              media experiences that blend aesthetics, motion, and interaction.
            </p>
          </div>

          <div className="intro-tools">
            <span className="intro-tools-title">Core Domains</span>
            <div className="intro-tools-grid">
              <article className="intro-tool-item">
                <h3>Graphic Design</h3>
                <p>
                  Visual systems, branding language, typography, and layout
                  direction that create clear and memorable communication.
                </p>
              </article>
              <article className="intro-tool-item">
                <h3>Video Editing</h3>
                <p>
                  Rhythm-driven editing, pacing, transitions, and story cuts
                  that turn ideas into compelling motion narratives.
                </p>
              </article>
              <article className="intro-tool-item">
                <h3>3D Art</h3>
                <p>
                  Scene building, lighting, materials, and rendering workflows
                  used to craft stylized and immersive digital visuals.
                </p>
              </article>
            </div>
          </div>
        </section>

        <section className="reachout-section">
          <div className="reachout-head">
            <div className="reachout-label-wrap">
              <span ref={reachLabelRef} className="reachout-label">
                <span className="reach-line">Reach</span>
                <span className="reach-line">Out</span>
              </span>
            </div>
          </div>

          <div className="reachout-content">
            <div className="reachout-meta-left">
              <p className="reachout-availability" data-cursor-invert="true">
                <span>Currently available for</span>
                <span>freelance projects</span>
              </p>
              <div className="reachout-geo" data-cursor-invert="true">
              <p>Mumbai, Maharashtra, India</p>
              </div>
            </div>
            <div className="reachout-message" data-cursor-invert="true">
              <p data-cursor-invert="true">
                For collaborative projects, freelance work, or creative
                inquiries, feel free to reach out anytime.
              </p>
              <a href="mailto:yohaanpatel@example.com" data-cursor-invert="true">yohaanpatel@example.com</a>
            </div>
          </div>

          <div className="reachout-foot">
            <div className="reachout-socials">
              <a href="#" aria-label="Twitter" data-cursor-invert="true">Twitter</a>
              <a href="#" aria-label="Instagram" data-cursor-invert="true">Instagram</a>
              <a href="#" aria-label="Behance" data-cursor-invert="true">Behance</a>
            </div>
            <span className="reachout-typo" data-cursor-invert="true">Typography - Neue Montreal</span>
          </div>
        </section>
      </main>

      <Cursor />
      <FilmGrain />
    </>
  )
}

export default App
