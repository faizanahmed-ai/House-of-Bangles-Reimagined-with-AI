'use client'

import { useRef } from 'react'
import { motion, useInView, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { Star } from 'lucide-react'

const reviews = [
  { name: 'Fatima Zahra',  city: 'Karachi',    avatar: 'FZ', rating: 5, text: 'Absolutely stunning quality. The velvet bangles for my sister\'s wedding were the talk of the event!', product: 'Royal Crimson Velvet' },
  { name: 'Ayesha Malik',  city: 'Lahore',     avatar: 'AM', rating: 5, text: 'The most beautiful bangles I\'ve ever owned. The kundan work is so detailed — looks like fine jewellery.', product: 'Bridal Kundan Set' },
  { name: 'Sana Rehman',   city: 'Islamabad',  avatar: 'SR', rating: 5, text: 'Fast delivery, beautiful packaging. Bought the Heritage Trio Deal and every single piece is perfect.', product: 'Heritage Trio Deal' },
  { name: 'Zara Hussain',  city: 'Hyderabad',  avatar: 'ZH', rating: 5, text: 'Being from Hyderabad I know authentic bangles — and these are the real thing. So happy to find this brand!', product: 'Baroque Pearl Set' },
  { name: 'Nadia Ahmed',   city: 'Faisalabad', avatar: 'NA', rating: 4, text: 'Excellent quality, very fast shipping. The pearl bangles are gorgeous. Will order again for Eid!', product: 'Pearl Set' },
]

function ReviewCard({ review, index }: { review: typeof reviews[0], index: number }) {
  const ref    = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-50px' })
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const rotateX = useSpring(useTransform(mouseY, [-1, 1], [4, -4]), { stiffness: 150, damping: 20 })
  const rotateY = useSpring(useTransform(mouseX, [-1, 1], [-4, 4]), { stiffness: 150, damping: 20 })

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    mouseX.set(((e.clientX - rect.left) / rect.width - 0.5) * 2)
    mouseY.set(((e.clientY - rect.top) / rect.height - 0.5) * 2)
  }
  const onLeave = () => { mouseX.set(0); mouseY.set(0) }

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: index * 0.09, duration: 0.45 }}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{ rotateX, rotateY, transformStyle: 'preserve-3d', perspective: 800 }}
      className="card-luxury p-4 sm:p-6 relative overflow-hidden group"
    >
      <motion.div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{ background: 'linear-gradient(135deg, rgba(212,168,67,0.04) 0%, transparent 60%)' }} />

      <div className="flex items-center gap-0.5 mb-3 sm:mb-4">
        {[...Array(5)].map((_, j) => (
          <motion.div key={j}
            initial={{ scale: 0, rotate: -20 }}
            animate={inView ? { scale: 1, rotate: 0 } : {}}
            transition={{ delay: index * 0.09 + j * 0.04 + 0.2, type: 'spring', stiffness: 300 }}>
            <Star size={12} className={j < review.rating ? 'text-gold-400 fill-gold-400' : 'text-stone-300'} />
          </motion.div>
        ))}
      </div>

      <p className="font-body text-xs sm:text-sm text-stone-700 leading-relaxed mb-4 sm:mb-5 italic">&ldquo;{review.text}&rdquo;</p>
      <p className="label-luxury text-gold-600 text-[9px] sm:text-[10px] mb-3 sm:mb-4">Purchased: {review.product}</p>

      <div className="flex items-center gap-2.5 sm:gap-3 pt-3 sm:pt-4 border-t border-gold-200/50">
        <motion.div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-maroon-700 flex items-center justify-center flex-shrink-0"
          whileHover={{ scale: 1.1, rotate: 5 }} transition={{ type: 'spring', stiffness: 400 }}>
          <span className="font-body text-[10px] sm:text-xs font-semibold text-ivory-100">{review.avatar}</span>
        </motion.div>
        <div>
          <p className="font-body text-xs sm:text-sm font-medium text-stone-800">{review.name}</p>
          <p className="font-body text-[10px] sm:text-xs text-stone-500">{review.city}</p>
        </div>
      </div>
    </motion.div>
  )
}

export default function Testimonials() {
  const ref    = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  return (
    <section className="section-padding bg-ivory-200/50 overflow-hidden">
      <div className="container-luxury" ref={ref}>
        <motion.div className="text-center mb-8 sm:mb-12"
          initial={{ opacity: 0, y: 14 }} animate={inView ? { opacity: 1, y: 0 } : {}}>
          <p className="label-luxury text-gold-600 mb-3">What Our Customers Say</p>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl text-maroon-700">Loved Across Pakistan</h2>
          <motion.div className="divider-gold w-24 sm:w-32 mx-auto mt-4 sm:mt-5"
            initial={{ scaleX: 0 }} animate={inView ? { scaleX: 1 } : {}}
            transition={{ delay: 0.3, duration: 0.7 }} />
        </motion.div>
        {/* 1 col mobile → 2 col sm → 3 col lg */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
          {reviews.map((r, i) => <ReviewCard key={r.name} review={r} index={i} />)}
        </div>
      </div>
    </section>
  )
}
