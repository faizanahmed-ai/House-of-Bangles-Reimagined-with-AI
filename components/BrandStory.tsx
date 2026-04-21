'use client'

import { useRef } from 'react'
import { motion, useInView, useScroll, useTransform } from 'framer-motion'

const stats = [
  { value: '10K+', label: 'Orders Delivered' },
  { value: '500+', label: 'Unique Designs' },
  { value: '5★',   label: 'Average Rating' },
  { value: '7+',   label: 'Years of Craft' },
]

export default function BrandStory() {
  const sectionRef = useRef(null)
  const inView = useInView(sectionRef, { once: true, margin: '-80px' })
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start end', 'end start'] })
  const textX = useTransform(scrollYProgress, [0, 1], ['-2%', '0%'])

  return (
    <section id="story" ref={sectionRef} className="relative section-padding bg-maroon-900 text-ivory-100 overflow-hidden">
      {/* Decorative ring — hidden on mobile for perf */}
      <motion.div
        className="absolute -right-32 sm:-right-20 top-1/2 -translate-y-1/2 w-[280px] sm:w-[400px] h-[280px] sm:h-[400px] rounded-full border border-gold-400/8 pointer-events-none"
        animate={{ rotate: 360 }}
        transition={{ duration: 80, repeat: Infinity, ease: 'linear' }}
      />

      <div className="container-luxury relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 sm:gap-16 items-center">

          {/* Text */}
          <motion.div style={{ x: textX }}>
            <motion.p className="label-luxury text-gold-400 mb-3 sm:mb-4 tracking-[0.3em] sm:tracking-[0.35em] text-[10px] sm:text-xs"
              initial={{ opacity: 0, x: -20 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.6 }}>
              Our Heritage
            </motion.p>
            <motion.h2 className="font-display text-3xl sm:text-4xl md:text-5xl text-ivory-100 leading-tight mb-5 sm:mb-6"
              initial={{ opacity: 0, x: -24 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.7, delay: 0.1 }}>
              Rooted in the Heart<br />
              <em className="not-italic text-gold-400">of Hyderabad</em>
            </motion.h2>
            <motion.div className="h-px w-16 sm:w-20 bg-gradient-to-r from-gold-400 to-transparent mb-6 sm:mb-8"
              initial={{ scaleX: 0, originX: 0 }} animate={inView ? { scaleX: 1 } : {}} transition={{ duration: 0.8, delay: 0.3 }} />

            {['Every piece carries the fingerprints of living heritage — born from a passion for preserving the exquisite bangle-making tradition of Hyderabad, a city whose artisans have crafted wearable poetry for centuries.',
              'We work directly with master craftspeople in the old city, bringing their finest velvet, kundan, and pearl creations to women across Pakistan and beyond.'
            ].map((text, i) => (
              <motion.p key={i} className="font-body font-light text-ivory-300/80 leading-relaxed mb-4 sm:mb-5 text-sm sm:text-base"
                initial={{ opacity: 0, y: 14 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay: 0.35 + i * 0.12 }}>
                {text}
              </motion.p>
            ))}

            <motion.div className="flex flex-wrap gap-3 sm:gap-4 mt-6 sm:mt-8"
              initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ delay: 0.6 }}>
              {['Authentic Craftsmanship', 'Direct from Artisans', 'Nationwide Delivery'].map((badge, i) => (
                <motion.span key={badge}
                  className="flex items-center gap-2 font-body text-[11px] sm:text-xs text-ivory-300/70 tracking-wider"
                  whileHover={{ x: 3 }} transition={{ duration: 0.15 }}>
                  <motion.span className="w-1.5 h-1.5 rounded-full bg-gold-400 flex-shrink-0"
                    animate={{ scale: [1, 1.4, 1] }} transition={{ duration: 2, repeat: Infinity, delay: i * 0.4 }} />
                  {badge}
                </motion.span>
              ))}
            </motion.div>
          </motion.div>

          {/* Stats grid */}
          <div className="grid grid-cols-2 gap-3 sm:gap-4">
            {stats.map(({ value, label }, i) => (
              <motion.div key={label}
                className="border border-ivory-100/10 p-5 sm:p-8 text-center relative overflow-hidden group"
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
                transition={{ delay: 0.2 + i * 0.1 }}
                whileHover={{ borderColor: 'rgba(212,168,67,0.4)' }}>
                <div className="absolute inset-0 bg-gold-400/0 group-hover:bg-gold-400/5 transition-colors duration-400 pointer-events-none" />
                <motion.p className="font-display text-3xl sm:text-4xl md:text-5xl font-light text-gold-400 mb-1.5 sm:mb-2 relative z-10"
                  initial={{ scale: 0.5, opacity: 0 }} animate={inView ? { scale: 1, opacity: 1 } : {}}
                  transition={{ delay: 0.3 + i * 0.1, type: 'spring', stiffness: 200 }}>
                  {value}
                </motion.p>
                <p className="label-luxury text-ivory-400/60 text-[9px] sm:text-[10px] relative z-10">{label}</p>
              </motion.div>
            ))}

            <motion.div className="col-span-2 border border-gold-400/20 p-4 sm:p-6 bg-maroon-800/40 relative overflow-hidden"
              initial={{ opacity: 0, y: 18 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.65 }}>
              <motion.div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-gold-400/60 to-transparent"
                initial={{ scaleY: 0, originY: 0 }} animate={inView ? { scaleY: 1 } : {}} transition={{ delay: 0.8, duration: 0.6 }} />
              <p className="font-display text-base sm:text-xl text-ivory-200 italic leading-relaxed mb-2 sm:mb-3 pl-4">
                &ldquo;Every bangle is a conversation between the past and the present — a circle with no beginning and no end.&rdquo;
              </p>
              <p className="label-luxury text-gold-500 text-[9px] sm:text-[10px] pl-4">— House of Bangles, Founder</p>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
