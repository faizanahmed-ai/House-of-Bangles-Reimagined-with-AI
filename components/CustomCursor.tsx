'use client'

import { useEffect, useRef, useState } from 'react'

interface Trail { x: number; y: number; id: number }

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null)
  const ringRef   = useRef<HTMLDivElement>(null)
  const [trails, setTrails] = useState<Trail[]>([])
  const [isHover, setIsHover] = useState(false)
  const [isClick, setIsClick] = useState(false)
  const mouse  = useRef({ x: 0, y: 0 })
  const ring   = useRef({ x: 0, y: 0 })
  const trailId = useRef(0)

  useEffect(() => {
    const cursor = cursorRef.current
    const ringEl = ringRef.current
    if (!cursor || !ringEl) return

    let rafId: number

    const onMove = (e: MouseEvent) => {
      mouse.current = { x: e.clientX, y: e.clientY }
      cursor.style.transform = `translate(${e.clientX}px, ${e.clientY}px) translate(-50%,-50%)`
      const id = trailId.current++
      setTrails(prev => [...prev.slice(-8), { x: e.clientX, y: e.clientY, id }])
      setTimeout(() => setTrails(prev => prev.filter(t => t.id !== id)), 600)
    }

    const animate = () => {
      ring.current.x += (mouse.current.x - ring.current.x) * 0.1
      ring.current.y += (mouse.current.y - ring.current.y) * 0.1
      ringEl.style.transform = `translate(${ring.current.x}px, ${ring.current.y}px) translate(-50%,-50%)`
      rafId = requestAnimationFrame(animate)
    }

    const onEnter = () => setIsHover(true)
    const onLeave = () => setIsHover(false)
    const onDown  = () => setIsClick(true)
    const onUp    = () => setIsClick(false)

    document.addEventListener('mousemove', onMove, { passive: true })
    document.addEventListener('mousedown', onDown, { passive: true })
    document.addEventListener('mouseup',   onUp,   { passive: true })
    document.querySelectorAll('a, button, [data-cursor]').forEach(el => {
      el.addEventListener('mouseenter', onEnter, { passive: true })
      el.addEventListener('mouseleave', onLeave, { passive: true })
    })
    rafId = requestAnimationFrame(animate)

    return () => {
      document.removeEventListener('mousemove', onMove)
      document.removeEventListener('mousedown', onDown)
      document.removeEventListener('mouseup',   onUp)
      cancelAnimationFrame(rafId)
    }
  }, [])

  return (
    <>
      {trails.map((t, i) => (
        <div
          key={t.id}
          className="fixed pointer-events-none z-[9995] hidden md:block"
          style={{
            left: t.x, top: t.y,
            transform: 'translate(-50%,-50%)',
            width: `${Math.max(4 - i * 0.4, 1)}px`,
            height: `${Math.max(4 - i * 0.4, 1)}px`,
            borderRadius: '50%',
            background: `rgba(212,168,67,${Math.max(0.6 - i * 0.07, 0)})`,
            animation: 'trailFade 0.6s ease forwards',
          }}
        />
      ))}
      <div
        ref={cursorRef}
        className="fixed top-0 left-0 pointer-events-none z-[9999] hidden md:block"
        style={{
          width: isClick ? '8px' : isHover ? '6px' : '10px',
          height: isClick ? '8px' : isHover ? '6px' : '10px',
          borderRadius: '50%',
          background: isHover ? '#d4a843' : '#8b1a1a',
          transition: 'width 0.2s, height 0.2s, background 0.3s',
        }}
      />
      <div
        ref={ringRef}
        className="fixed top-0 left-0 pointer-events-none z-[9998] hidden md:block"
        style={{
          width: isHover ? '56px' : isClick ? '28px' : '40px',
          height: isHover ? '56px' : isClick ? '28px' : '40px',
          borderRadius: '50%',
          border: `1.5px solid ${isHover ? 'rgba(212,168,67,0.7)' : 'rgba(139,26,26,0.35)'}`,
          transition: 'width 0.35s cubic-bezier(0.25,0.46,0.45,0.94), height 0.35s cubic-bezier(0.25,0.46,0.45,0.94), border-color 0.3s',
        }}
      />
      <style>{`
        body { cursor: none; }
        @keyframes trailFade {
          0% { opacity: 1; transform: translate(-50%,-50%) scale(1); }
          100% { opacity: 0; transform: translate(-50%,-50%) scale(0); }
        }
      `}</style>
    </>
  )
}
