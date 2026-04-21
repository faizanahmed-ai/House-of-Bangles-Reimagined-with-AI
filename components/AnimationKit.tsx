'use client'

import { useRef, ReactNode } from 'react'
import { motion, useInView } from 'framer-motion'

// ── ScrollReveal — wraps any element with a cinematic entrance ──────────────
interface RevealProps {
  children: ReactNode
  delay?: number
  direction?: 'up' | 'left' | 'right' | 'scale'
  className?: string
}

export function ScrollReveal({ children, delay = 0, direction = 'up', className = '' }: RevealProps) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  const variants = {
    up:    { hidden: { opacity: 0, y: 48 },        visible: { opacity: 1, y: 0 } },
    left:  { hidden: { opacity: 0, x: -48 },       visible: { opacity: 1, x: 0 } },
    right: { hidden: { opacity: 0, x: 48 },        visible: { opacity: 1, x: 0 } },
    scale: { hidden: { opacity: 0, scale: 0.88 },  visible: { opacity: 1, scale: 1 } },
  }

  return (
    <motion.div
      ref={ref}
      className={className}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      variants={variants[direction]}
      transition={{ duration: 0.65, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      {children}
    </motion.div>
  )
}

// ── MagneticButton — cursor pulls the button toward it on hover ─────────────
import { useMotionValue, useSpring } from 'framer-motion'

interface MagneticProps {
  children: ReactNode
  className?: string
  strength?: number
}

export function MagneticButton({ children, className = '', strength = 0.35 }: MagneticProps) {
  const ref = useRef<HTMLDivElement>(null)
  const rawX = useMotionValue(0)
  const rawY = useMotionValue(0)
  const x = useSpring(rawX, { stiffness: 200, damping: 18 })
  const y = useSpring(rawY, { stiffness: 200, damping: 18 })

  const onMove = (e: React.MouseEvent) => {
    const rect = ref.current?.getBoundingClientRect()
    if (!rect) return
    const cx = rect.left + rect.width / 2
    const cy = rect.top + rect.height / 2
    rawX.set((e.clientX - cx) * strength)
    rawY.set((e.clientY - cy) * strength)
  }
  const onLeave = () => { rawX.set(0); rawY.set(0) }

  return (
    <motion.div
      ref={ref}
      style={{ x, y, display: 'inline-block' }}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className={className}
    >
      {children}
    </motion.div>
  )
}

// ── CountUp — animates numbers when they scroll into view ───────────────────
import { useEffect, useState } from 'react'

interface CountUpProps {
  end: number
  duration?: number
  suffix?: string
  prefix?: string
}

export function CountUp({ end, duration = 2, suffix = '', prefix = '' }: CountUpProps) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true })
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!inView) return
    let startTime: number
    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp
      const progress = Math.min((timestamp - startTime) / (duration * 1000), 1)
      setCount(Math.floor(progress * end))
      if (progress < 1) requestAnimationFrame(step)
    }
    requestAnimationFrame(step)
  }, [inView, end, duration])

  return <span ref={ref}>{prefix}{count.toLocaleString()}{suffix}</span>
}
