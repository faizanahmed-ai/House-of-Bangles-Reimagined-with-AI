'use client'

import { useState, useMemo, memo } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import FilterBar from './FilterBar'
import ProductCard from './ProductCard'
import { PRODUCTS } from '@/lib/products'

// Memoize so re-renders don't rebuild the grid
const MemoCard = memo(ProductCard)

export default function ProductGrid() {
  const [activeFilter, setActiveFilter] = useState('all')

  const filtered = useMemo(() =>
    activeFilter === 'all'
      ? PRODUCTS
      : PRODUCTS.filter(p => p.category === activeFilter),
    [activeFilter]
  )

  return (
    <section id="collection" className="section-padding bg-ivory-100">
      <div className="container-luxury">
        <div className="text-center mb-8 sm:mb-10">
          <p className="label-luxury text-gold-600 mb-3">Curated with Care</p>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl text-maroon-700">Our Collection</h2>
          <div className="divider-gold w-24 sm:w-32 mx-auto mt-4 sm:mt-5" />
        </div>

        {/* Scrollable filters on mobile */}
        <div className="mb-8 sm:mb-10 -mx-4 px-4 sm:mx-0 sm:px-0 overflow-x-auto scrollbar-hide">
          <div className="min-w-max sm:min-w-0">
            <FilterBar active={activeFilter} onChange={setActiveFilter} />
          </div>
        </div>

        <motion.div layout className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-5 lg:gap-6">
          <AnimatePresence mode="popLayout">
            {filtered.map((product, i) => (
              <motion.div
                key={product.id}
                layout
                initial={{ opacity: 0, scale: 0.94 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.94 }}
                transition={{ duration: 0.2, delay: Math.min(i * 0.03, 0.3) }}
              >
                <MemoCard product={product} index={i} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  )
}
