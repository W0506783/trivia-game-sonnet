// src/components/StarField.jsx
import { useEffect, useRef } from 'react'

const NEON_COLORS = [
  '#00ffff',
  '#ff00ff',
  '#ffff00',
  '#00ff88',
  '#ffffff',
]

const MAX_STARS = 10
const SPAWN_RATE = 0.02

function randomBetween(a, b) {
  return a + Math.random() * (b - a)
}

function createStar(canvasWidth) {
  const speed = randomBetween(6, 14)
  const angle = randomBetween(20, 50) * (Math.PI / 180) // downward-right diagonal
  const color = NEON_COLORS[Math.floor(Math.random() * NEON_COLORS.length)]
  const length = randomBetween(80, 200)

  return {
    x: randomBetween(0, canvasWidth),
    y: randomBetween(-100, 0),
    vx: Math.cos(angle) * speed,   // moves right
    vy: Math.sin(angle) * speed,   // moves down
    length,
    color,
    width: randomBetween(1, 2.5),
    alpha: randomBetween(0.5, 1),
  }
}

function StarField({ active = true }) {
  const canvasRef = useRef(null)
  const starsRef = useRef([])
  const rafRef = useRef(null)
  const activeRef = useRef(active)

  // Keep activeRef in sync so the animation loop can read it
  useEffect(() => {
    activeRef.current = active
  }, [active])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener('resize', resize)

    const animate = () => {
      rafRef.current = requestAnimationFrame(animate)

      // If not active, clear canvas completely and stop
      if (!activeRef.current) {
        ctx.clearRect(0, 0, canvas.width, canvas.height)
        starsRef.current = []
        return
      }

      // Fade the previous frame rather than fully clearing — gives trailing effect
      ctx.fillStyle = 'rgba(0, 0, 0, 0.3)'
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Spawn new stars
      if (starsRef.current.length < MAX_STARS && Math.random() < SPAWN_RATE) {
        starsRef.current.push(createStar(canvas.width))
      }

      // Update + draw
      starsRef.current = starsRef.current.filter(star => {
        // Advance position
        star.x += star.vx
        star.y += star.vy

        // Tail starts behind the head in the opposite direction of travel
        const tailX = star.x - (star.vx / Math.hypot(star.vx, star.vy)) * star.length
        const tailY = star.y - (star.vy / Math.hypot(star.vx, star.vy)) * star.length

        // Gradient trail — transparent at tail, full color at head
        const gradient = ctx.createLinearGradient(tailX, tailY, star.x, star.y)
        gradient.addColorStop(0, 'transparent')
        gradient.addColorStop(1, star.color)

        ctx.beginPath()
        ctx.moveTo(tailX, tailY)
        ctx.lineTo(star.x, star.y)
        ctx.strokeStyle = gradient
        ctx.lineWidth = star.width
        ctx.globalAlpha = star.alpha
        ctx.shadowColor = star.color
        ctx.shadowBlur = 8
        ctx.stroke()

        // Bright head dot
        ctx.beginPath()
        ctx.arc(star.x, star.y, star.width, 0, Math.PI * 2)
        ctx.fillStyle = '#ffffff'
        ctx.shadowColor = star.color
        ctx.shadowBlur = 12
        ctx.fill()

        ctx.globalAlpha = 1
        ctx.shadowBlur = 0

        // Remove once off screen
        return star.x < canvas.width + 200 && star.y < canvas.height + 200
      })
    }

    animate()

    return () => {
      cancelAnimationFrame(rafRef.current)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex: 0 }}
    />
  )
}

export default StarField