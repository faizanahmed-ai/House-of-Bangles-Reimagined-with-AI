'use client'

import { motion } from 'framer-motion'
import { FILTERS } from '@/lib/products'

interface FilterBarProps {
  active: string
  onChange: (id: string) => void
}

export default function FilterBar({ active, onChange }: FilterBarProps) {
  return (
    <div className="flex items-center gap-1 sm:gap-2 py-1 sm:justify-center">
      {FILTERS.map((filter) => (
        <button
          key={filter.id}
          onClick={() => onChange(filter.id)}
          className={`
            relative px-3.5 sm:px-5 md:px-6 py-2 sm:py-2.5 whitespace-nowrap flex-shrink-0
            font-body text-[11px] sm:text-xs md:text-sm tracking-[0.12em] sm:tracking-[0.15em] uppercase
            transition-colors duration-300
            ${active === filter.id ? 'text-maroon-700' : 'text-stone-500 hover:text-maroon-600'}
          `}
        >
          {active === filter.id && (
            <motion.span
              layoutId="filter-pill"
              className="absolute inset-0 border border-gold-400 bg-gold-400/8"
              transition={{ type: 'spring', bounce: 0.2, duration: 0.35 }}
            />
          )}
          <span className="relative">{filter.label}</span>
        </button>
      ))}
    </div>
  )
}
