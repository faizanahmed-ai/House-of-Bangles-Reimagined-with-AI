'use client'

import { useEffect, useRef } from 'react'

interface Particle {
  x: number; y: number; vx: number; vy: number
  size: number; opacity: number; life: number; maxLife: number
}

export default function AmbientParticles() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d', { alpha: true, desynchronized: true })
    if (!ctx) return

    const isMobile = window.innerWidth < 768
    const MAX  = isMobile ? 8  : 20
    const RATE = isMobile ? 70 : 45
    const OMAX = isMobile ? 0.15 : 0.25
    const SMAX = isMobile ? 2   : 3.5

    let rafId: number
    const particles: Particle[] = []

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      canvas.width  = window.innerWidth  * dpr
      canvas.height = window.innerHeight * dpr
      canvas.style.width  = window.innerWidth  + 'px'
      canvas.style.height = window.innerHeight + 'px'
      ctx.scale(dpr, dpr)
    }
    resize()

    let resizeTimer: ReturnType<typeof setTimeout>
    const onResize = () => { clearTimeout(resizeTimer); resizeTimer = setTimeout(resize, 250) }
    window.addEventListener('resize', onResize, { passive: true })

    const spawn = () => {
      if (particles.length >= MAX) return
      const life = 150 + Math.random() * 110
      particles.push({
        x: Math.random() * window.innerWidth,
        y: window.innerHeight + 10,
        vx: (Math.random() - 0.5) * 0.4,
        vy: -(0.3 + Math.random() * 0.5),
        size: 1 + Math.random() * SMAX,
        opacity: 0, life: 0, maxLife: life,
      })
    }

    let frame = 0
    const animate = () => {
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight)
      frame++
      if (frame % RATE === 0) spawn()

      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i]
        p.x += p.vx; p.y += p.vy; p.life++
        const prog = p.life / p.maxLife
        p.opacity = prog < 0.2 ? (prog / 0.2) * OMAX : prog > 0.8 ? ((1 - prog) / 0.2) * OMAX : OMAX
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(212,168,67,${p.opacity})`
        ctx.fill()
        if (p.life >= p.maxLife || p.y < -10) particles.splice(i, 1)
      }
      rafId = requestAnimationFrame(animate)
    }
    animate()

    return () => {
      cancelAnimationFrame(rafId)
      window.removeEventListener('resize', onResize)
      clearTimeout(resizeTimer)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-[5]"
      style={{ mixBlendMode: 'screen' }}
      aria-hidden="true"
    />
  )
}
