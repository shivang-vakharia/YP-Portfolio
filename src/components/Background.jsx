import { useEffect, useRef } from "react"
import * as THREE from "three"

export default function Background() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(
      45,
      window.innerWidth / window.innerHeight,
      0.1,
      100
    )
    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: true,
    })

    const geometry = new THREE.PlaneGeometry(22, 22, 72, 72)
    const material = new THREE.MeshBasicMaterial({
      color: 0xded7c9,
      wireframe: true,
      transparent: true,
      opacity: 0.12,
    })
    const plane = new THREE.Mesh(geometry, material)
    const hazeGeometry = new THREE.TorusKnotGeometry(2.8, 0.006, 180, 8)
    const hazeMaterial = new THREE.MeshBasicMaterial({
      color: 0xffffff,
      transparent: true,
      opacity: 0.18,
    })
    const haze = new THREE.Mesh(hazeGeometry, hazeMaterial)

    camera.position.z = 10
    plane.rotation.x = -0.74
    scene.add(plane)
    scene.add(haze)

    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.6))
    renderer.setSize(window.innerWidth, window.innerHeight)

    let rafId = 0
    let pointerX = 0
    let pointerY = 0

    const onPointerMove = (event) => {
      pointerX = (event.clientX / window.innerWidth - 0.5) * 0.35
      pointerY = (event.clientY / window.innerHeight - 0.5) * 0.25
    }

    const onResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight
      camera.updateProjectionMatrix()
      renderer.setSize(window.innerWidth, window.innerHeight)
    }

    const animate = (time) => {
      const t = time * 0.00035

      plane.rotation.z = Math.sin(t) * 0.12 + pointerX
      plane.rotation.x = -0.74 + Math.cos(t * 0.8) * 0.08 + pointerY
      plane.position.y = Math.sin(t * 1.2) * 0.25
      haze.rotation.x = t * 0.7 + pointerY
      haze.rotation.y = t * 0.55 + pointerX
      haze.position.z = -1.4 + Math.sin(t) * 0.2

      renderer.render(scene, camera)
      rafId = requestAnimationFrame(animate)
    }

    window.addEventListener("pointermove", onPointerMove)
    window.addEventListener("resize", onResize)
    rafId = requestAnimationFrame(animate)

    return () => {
      cancelAnimationFrame(rafId)
      window.removeEventListener("pointermove", onPointerMove)
      window.removeEventListener("resize", onResize)
      geometry.dispose()
      material.dispose()
      hazeGeometry.dispose()
      hazeMaterial.dispose()
      renderer.dispose()
    }
  }, [])

  return <canvas ref={canvasRef} className="webgl-background" aria-hidden="true" />
}
