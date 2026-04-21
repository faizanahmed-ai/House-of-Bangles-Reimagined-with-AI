'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, useScroll, useTransform, useMotionValue, useSpring } from 'framer-motion'
import Link from 'next/link'
import { MagneticButton } from '@/components/AnimationKit'

const stats = [
  { value: '10K+', label: 'Orders Delivered' },
  { value: '500+', label: 'Unique Designs' },
  { value: '5★',   label: 'Customer Rating' },
  { value: '7+',   label: 'Years of Craft' },
]

const RINGS = [180, 260, 340, 430, 520]

export default function Hero() {
  const [isMobile, setIsMobile] = useState(false)
  const containerRef = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ['start start', 'end start'] })

  const bgY    = useTransform(scrollYProgress, [0, 1], ['0%', '25%'])
  const textY  = useTransform(scrollYProgress, [0, 1], ['0%', '15%'])
  const ringsY = useTransform(scrollYProgress, [0, 1], ['0%', '-10%'])
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0])

  const mouseX  = useMotionValue(0)
  const mouseY  = useMotionValue(0)
  const rotateX = useSpring(useTransform(mouseY, [-300, 300], [6, -6]), { stiffness: 80, damping: 20 })
  const rotateY = useSpring(useTransform(mouseX, [-400, 400], [-6, 6]), { stiffness: 80, damping: 20 })

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768)
    check()
    window.addEventListener('resize', check, { passive: true })
    const onMove = (e: MouseEvent) => {
      if (window.innerWidth < 768) return
      mouseX.set(e.clientX - window.innerWidth / 2)
      mouseY.set(e.clientY - window.innerHeight / 2)
    }
    window.addEventListener('mousemove', onMove, { passive: true })
    return () => {
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('resize', check)
    }
  }, [mouseX, mouseY])

  return (
    <section
      ref={containerRef}
      className="relative min-h-[100svh] flex items-center justify-center overflow-hidden"
      style={{ perspective: isMobile ? 'none' : '1200px' }}
    >
      {/* Instant CSS gradient background */}
      <motion.div
        className="absolute inset-0 scale-110"
        style={{
          y: bgY,
          background: 'radial-gradient(ellipse at 30% 40%, #6b1414 0%, #2d0808 45%, #150303 100%)',
        }}
      />
      <div className="absolute inset-0" style={{
        background: 'radial-gradient(ellipse at 70% 55%, rgba(212,168,67,0.09) 0%, transparent 55%)',
      }} />
      <div className="absolute inset-0 bg-gradient-to-b from-maroon-950/40 via-transparent to-maroon-950/80" />

      {/* 3D tilt */}
      <motion.div
        className="relative z-10 w-full flex items-center justify-center"
        style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
      >
        {/* Rotating rings */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden"
          style={{ y: ringsY }}
        >
          {RINGS.map((size, i) => (
            <motion.div
              key={size}
              className="absolute rounded-full"
              style={{
                width: size, height: size,
                border: `1px solid rgba(212,168,67,${0.13 - i * 0.02})`,
              }}
              animate={{ rotate: i % 2 === 0 ? 360 : -360 }}
              transition={{ duration: 25 + i * 12, repeat: Infinity, ease: 'linear' }}
            >
              <div
                className="absolute rounded-full bg-gold-400"
                style={{
                  width: Math.max(5 - i * 0.5, 2), height: Math.max(5 - i * 0.5, 2),
                  top: '50%', left: -3, transform: 'translateY(-50%)',
                  boxShadow: `0 0 ${8 + i * 2}px rgba(212,168,67,0.7)`,
                }}
              />
            </motion.div>
          ))}
          <motion.div
            className="absolute rounded-full"
            style={{ width: 100, height: 100, background: 'radial-gradient(circle, rgba(212,168,67,0.15) 0%, transparent 70%)' }}
            animate={{ scale: [1, 1.3, 1], opacity: [0.5, 0.9, 0.5] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          />
        </motion.div>

        {/* Text content */}
        <motion.div
          className="text-center px-5 sm:px-8 max-w-4xl mx-auto pt-24 pb-16 relative w-full"
          style={{ y: textY, opacity, translateZ: 40 }}
        >
          <motion.p
            className="label-luxury text-gold-400 mb-5 tracking-[0.3em] sm:tracking-[0.4em] text-[10px] sm:text-xs"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.5 }}
          >
            Rooted in Heritage
          </motion.p>

          <motion.h1
            className="font-display font-light text-ivory-100 text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl leading-[1.05] mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            Where Heritage
            <br />
            <motion.em
              className="not-italic text-shimmer block"
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.35, duration: 0.55 }}
            >
              Meets Elegance
            </motion.em>
          </motion.h1>

          <motion.p
            className="font-body font-light text-ivory-300/80 text-base sm:text-lg max-w-xs sm:max-w-xl mx-auto mt-5 mb-8 sm:mb-10 leading-relaxed"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            Authentic Hyderabadi bangles crafted with centuries of tradition.
            Velvet, Kundan, and Pearl designs — delivered across Pakistan.
          </motion.p>

          <motion.div
            className="flex flex-col xs:flex-row items-center justify-center gap-3 sm:gap-4 mb-14 sm:mb-20"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.45 }}
          >
            <MagneticButton>
              <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
                <Link href="/products" className="btn-gold w-[200px] sm:min-w-[190px] block text-center">
                  Explore Collection
                </Link>
              </motion.div>
            </MagneticButton>
            <MagneticButton>
              <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
                <Link href="#story" className="btn-ghost text-ivory-200 border-ivory-300/30 hover:border-gold-400 w-[200px] sm:min-w-[190px] block text-center">
                  Our Story
                </Link>
              </motion.div>
            </MagneticButton>
          </motion.div>

          {/* Stats */}
          <motion.div
            className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-8 border-t border-ivory-100/10 pt-8 sm:pt-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.5 }}
          >
            {stats.map(({ value, label }, i) => (
              <motion.div
                key={label}
                className="text-center"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.55 + i * 0.07 }}
                whileHover={{ y: -3, transition: { duration: 0.15 } }}
              >
                <p className="font-display text-2xl sm:text-3xl text-gold-400 font-light">{value}</p>
                <p className="font-body text-[10px] sm:text-xs tracking-widest uppercase text-ivory-400/70 mt-1">{label}</p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        style={{ opacity }}
        animate={{ y: [0, 7, 0] }}
        transition={{ duration: 2.2, repeat: Infinity }}
      >
        <div className="w-px h-10 sm:h-12 bg-gradient-to-b from-gold-400/60 to-transparent" />
        <p className="label-luxury text-ivory-400/50 text-[9px] tracking-[0.3em] hidden sm:block">Scroll</p>
      </motion.div>
    </section>
  )
}
