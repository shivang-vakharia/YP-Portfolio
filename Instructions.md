# Premium Portfolio Loader Replica — Full Implementation Guide

## Objective

Create a near 1:1 replica of the loading experience and motion system inspired by:
https://jasonjerez.com/

The implementation must feel cinematic, premium, fluid, and motion-heavy.

This is NOT a simple loader animation.

The final result should resemble:
- Awwwards websites
- Premium creative developer portfolios
- GSAP-heavy agency websites
- Motion design focused experiences

---

# TECH STACK

Use the following stack EXACTLY:

- React + Vite
- TailwindCSS
- GSAP
- SplitType
- Lenis
- Three.js

Do NOT replace these technologies.

---

# REQUIRED PACKAGES

Install:

```bash
npm install gsap split-type three @studio-freight/lenis
npm install -D tailwindcss postcss autoprefixer
```

---

# REQUIRED PROJECT STRUCTURE

The AI agent must create the following structure:

src/
│
├── components/
│   ├── Loader.jsx
│   ├── Cursor.jsx
│   ├── FilmGrain.jsx
│   └── Background.jsx
│
├── assets/
│   └── fonts/
│       └── NeueMontreal-Bold.otf
│
├── App.jsx
├── main.jsx
└── index.css

---

# VISUAL STYLE REQUIREMENTS

The final implementation MUST follow these rules:

## GENERAL STYLE

- Fullscreen black background
- Minimalist aesthetic
- Extremely smooth motion
- Large typography
- Tight letter spacing
- Premium easing curves
- Cinematic transitions
- Layered animation systems
- Motion depth
- Floating effects
- Subtle visual noise

---

# TYPOGRAPHY REQUIREMENTS

Typography is CRITICAL.

Use:
- General Sans
OR
- Neue Montreal

Requirements:
- Very large text
- Tight tracking
- Heavy font weight
- Uppercase hero text
- Smooth rendering

Apply:

```css
-webkit-font-smoothing: antialiased;
-moz-osx-font-smoothing: grayscale;
```

Hero titles should use:

```css
font-size: clamp(80px, 10vw, 220px);
letter-spacing: -0.06em;
line-height: 0.9;
font-weight: 900;
text-transform: uppercase;
```

---

# LOADER REQUIREMENTS

## Loader must include:

### 1. Fullscreen overlay

Requirements:
- position: fixed
- inset: 0
- z-index > 9999
- black background

---

### 2. Animated Percentage Counter

Requirements:
- Positioned top-right
- Large font size
- Randomized increment logic
- Count from 0 → 100
- Smooth updating
- Fade away during exit

Implementation behavior:
- Increment every ~40ms
- Random increments between 2–8
- Finish around 2–3 seconds

---

### 3. Split Character Animation

Use:
- SplitType
- Animate individual characters

Initial character state:
- translateY(140px)
- rotateZ(10deg)
- opacity: 0
- blur(10px)

Animate to:
- translateY(0)
- rotateZ(0)
- opacity: 1
- blur(0px)

Animation requirements:
- staggered character reveal
- smooth easing
- premium timing

Use:
```js
ease: "expo.out"
```

---

### 4. Loader Exit Sequence

The exit sequence MUST include:

1. Characters move upward
2. Characters fade
3. Counter fades
4. White overlay wipe appears
5. Entire loader exits upward
6. Main content reveals

This MUST be coordinated using a GSAP timeline.

Use:
```js
ease: "expo.inOut"
```

---

# MAIN CONTENT REVEAL

The hero section MUST animate in after loader exit.

Initial state:
- translateY(200px)
- skewY(8deg)
- opacity: 0
- scale: 1.2

Animate to:
- translateY(0)
- skewY(0)
- opacity: 1
- scale: 1

Animation requirements:
- delayed reveal
- cinematic timing
- smooth easing

---

# FILM GRAIN REQUIREMENTS

Create animated film grain overlay.

Requirements:
- fixed fullscreen layer
- very low opacity
- pointer-events: none
- animated transform movement
- infinite subtle movement

Use:
- noise SVG texture
- CSS animation

Animation style:
- jitter movement
- floating movement

Opacity:
```css
opacity: 0.03;
```

---

# CUSTOM CURSOR REQUIREMENTS

The project MUST include a custom cursor.

Requirements:
- Circular white cursor
- Mix-blend-mode: difference
- Smooth interpolation using GSAP
- Follows mouse with easing
- Pointer events disabled

Hover behavior:
- Scale cursor on links/buttons
- Smooth scaling animation
- Revert on mouse leave

Cursor must feel fluid and delayed.

---

# PARALLAX SYSTEM

The hero section MUST respond to mouse movement.

Requirements:
- Floating motion
- Very subtle movement
- GSAP interpolation
- Depth illusion

Behavior:
- Mouse movement shifts hero slightly
- Motion should feel cinematic, not reactive

Use:
```js
duration: 2
ease: "power3.out"
```

---

# LENIS SMOOTH SCROLL

Configure Lenis globally.

Requirements:
- Smooth wheel scrolling
- requestAnimationFrame loop
- integrated with GSAP ticker

Use:
```js
duration: 1.2
```

---

# SCROLL-BASED MOTION BLUR

Implement velocity-based skewing.

Requirements:
- Detect scroll velocity
- Apply subtle skew transform
- Smooth interpolation

Behavior:
- Faster scroll = more skew
- Subtle effect only

Use:
```js
skewY: velocity * 0.03
```

---

# WEBGL BACKGROUND REQUIREMENTS

Create subtle animated Three.js background.

Requirements:
- fullscreen canvas
- low opacity
- subtle movement
- depth effect
- wireframe or distortion feel

Initial version may use:
- rotating plane geometry
- wireframe material

Scene requirements:
- PerspectiveCamera
- animate loop
- requestAnimationFrame

Canvas must sit behind content.

---

# PERFORMANCE REQUIREMENTS

The implementation MUST prioritize:
- GPU transforms
- transform instead of top/left
- opacity animation
- will-change where needed
- requestAnimationFrame loops
- no layout thrashing

Target:
- 60fps animation

---

# MOTION DESIGN RULES

The experience MUST feel:
- expensive
- cinematic
- smooth
- luxurious
- modern
- minimal

Avoid:
- bouncy animations
- cheap easing
- excessive colors
- abrupt transitions
- linear motion

Preferred easing:
```js
expo.out
expo.inOut
power3.out
```

---

# REQUIRED COMPONENT RESPONSIBILITIES

## Loader.jsx

Responsibilities:
- loading counter
- split text animations
- intro animation
- exit timeline
- overlay wipe

---

## Cursor.jsx

Responsibilities:
- custom cursor
- interpolation
- hover scaling

---

## FilmGrain.jsx

Responsibilities:
- animated grain overlay
- subtle visual texture

---

## Background.jsx

Responsibilities:
- Three.js scene
- animated depth
- cinematic background visuals

---

# APP STRUCTURE REQUIREMENTS

App.jsx must render in this order:

1. Background
2. Loader
3. Main content
4. Cursor
5. Film grain

The background must remain behind everything.

The film grain must remain above everything.

---

# INDEX.CSS REQUIREMENTS

The stylesheet MUST include:

- global resets
- overflow handling
- smoothing
- typography rendering
- cursor styling
- grain animations
- hero typography
- loader styles

---

# ADDITIONAL POLISH REQUIREMENTS

The implementation SHOULD include:

- blur transitions
- opacity layering
- overflow clipping
- staggered reveals
- subtle floating animation
- delayed startup timing

---

# QUALITY REQUIREMENTS

The final result should resemble:
- Awwwards-level motion
- Premium frontend engineering
- Creative developer portfolio
- GSAP showcase projects

The experience should NOT resemble:
- beginner loader tutorial
- generic CSS animation demo
- simple landing page

---

# FINAL GOAL

The final result should feel:
- cinematic
- interactive
- luxurious
- motion-first
- immersive
- fluid
- highly polished

The loader should feel like part of a premium digital experience, not just a loading spinner.