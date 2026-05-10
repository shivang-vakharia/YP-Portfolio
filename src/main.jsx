import ReactDOM from 'react-dom/client'
import gsap from 'gsap'
import App from './App'
import './index.css'

import Lenis from '@studio-freight/lenis'

const lenis = new Lenis({
  duration: 1.2,
  smoothWheel: true,
  lerp: 0.08,
})

gsap.ticker.add((time) => {
  lenis.raf(time * 1000)
})
gsap.ticker.lagSmoothing(0)

ReactDOM.createRoot(document.getElementById('root')).render(
  <App />
)
