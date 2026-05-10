import Loader from "./components/Loader"
import FilmGrain from "./components/FilmGrain"
import Cursor from "./components/Cursor"
import Background from "./components/Background"
import { useCallback, useEffect, useRef, useState } from "react"
import gsap from "gsap"

function App() {
  const [isLoaded, setIsLoaded] = useState(false)
  const heroRef = useRef(null)
  const titleRef = useRef(null)
  const handleLoaderComplete = useCallback(() => {
    setIsLoaded(true)
  }, [])

  useEffect(() => {
    const hero = heroRef.current
    const title = titleRef.current
    if (!hero || !title) return

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

    let lastY = window.scrollY
    let resetTween

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

      skewTitle(skew)
      resetTween?.kill()
      resetTween = gsap.delayedCall(0.12, () => skewTitle(0))
    }

    window.addEventListener("mousemove", onMouseMove)
    window.addEventListener("scroll", onScroll, { passive: true })

    return () => {
      window.removeEventListener("mousemove", onMouseMove)
      window.removeEventListener("scroll", onScroll)
      resetTween?.kill()
    }
  }, [])

  return (
    <>
      <Background />
      <Loader onComplete={handleLoaderComplete} />

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

        <section className="content-band">
          <p>Pussy Ass Nigger</p>
          <a href="">Contact Us</a>
        </section>
      </main>

      <Cursor />
      <FilmGrain />
    </>
  )
}

export default App
