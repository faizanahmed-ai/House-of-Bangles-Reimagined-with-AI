'use client'

import { useState, useRef } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { Ruler } from 'lucide-react'

const SIZE_CHART = [
  { cm: [14.5, 15.5], inches: '2.0', urdu: 'بہت چھوٹا', label: 'XS', fit: 'Extra Small (do)' },
  { cm: [15.5, 16.5], inches: '2.4', urdu: 'چھوٹا',     label: 'S',  fit: 'Small (Adha pao do)' },
  { cm: [16.5, 17.5], inches: '2.6', urdu: 'درمیانہ',   label: 'M',  fit: 'Medium (Sawa do) — Most Popular' },
  { cm: [17.5, 18.5], inches: '2.8', urdu: 'بڑا',       label: 'L',  fit: 'Large (Dhai)' },
]

export default function SizeGuide() {
  const [wrist, setWrist]   = useState('')
  const [result, setResult] = useState<typeof SIZE_CHART[0] | null>(null)
  const [error, setError]   = useState('')
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  const calculate = () => {
    const value = parseFloat(wrist)
    if (isNaN(value) || value < 10 || value > 25) {
      setError('Enter a valid wrist size between 10–25 cm')
      setResult(null)
      return
    }
    setError('')
    const match = SIZE_CHART.find(s => value >= s.cm[0] && value < s.cm[1])
    setResult(match || SIZE_CHART[SIZE_CHART.length - 1])
  }

  return (
    <section id="size-guide" className="section-padding bg-ivory-100">
      <div className="container-luxury max-w-4xl" ref={ref}>

        {/* Header */}
        <motion.div className="text-center mb-8 sm:mb-12"
          initial={{ opacity: 0, y: 16 }} animate={inView ? { opacity: 1, y: 0 } : {}}>
          <p className="label-luxury text-gold-600 mb-3">Get the Perfect Fit</p>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl text-maroon-700">Size Guide</h2>
          <div className="divider-gold w-24 sm:w-32 mx-auto mt-4 sm:mt-5 mb-4 sm:mb-6" />
          <p className="font-body text-sm sm:text-base text-stone-600 max-w-md mx-auto">
            Measure your wrist in centimetres just below the wrist bone.
          </p>
        </motion.div>

        {/* Stack on mobile, side-by-side on lg */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 items-start">

          {/* Calculator */}
          <motion.div
            initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.15 }}
            className="border border-gold-200 p-5 sm:p-8 bg-white"
          >
            <div className="flex items-center gap-3 mb-5 sm:mb-6">
              <div className="w-9 h-9 sm:w-10 sm:h-10 bg-maroon-700 flex items-center justify-center flex-shrink-0">
                <Ruler size={16} className="text-ivory-100" strokeWidth={1.5} />
              </div>
              <h3 className="font-display text-lg sm:text-xl text-maroon-700">Wrist Measurement</h3>
            </div>

            <label className="label-luxury text-stone-600 block mb-2 text-[10px] sm:text-xs">Your wrist circumference (cm)</label>
            <div className="flex mb-3">
              <input
                type="number" inputMode="decimal"
                step="0.1" min="10" max="25"
                value={wrist}
                onChange={e => { setWrist(e.target.value); setError(''); setResult(null) }}
                onKeyDown={e => e.key === 'Enter' && calculate()}
                placeholder="e.g. 16.5"
                className="flex-1 px-3 sm:px-4 py-3 bg-transparent border border-r-0 border-gold-300 font-body text-sm text-stone-800 placeholder:text-stone-400 outline-none focus:border-gold-500 transition-colors"
              />
              <span className="flex items-center px-3 sm:px-4 border border-gold-300 bg-ivory-200 text-stone-500 font-body text-xs sm:text-sm flex-shrink-0">
                cm
              </span>
            </div>

            {error && <p className="font-body text-xs text-maroon-600 mb-3">{error}</p>}

            <button onClick={calculate} className="btn-primary w-full py-3 sm:py-3.5 text-sm">
              Find My Size
            </button>

            <AnimatePresence>
              {result && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                  className="mt-5 sm:mt-6 p-4 sm:p-5 border border-gold-300 bg-gold-50/50"
                >
                  <p className="label-luxury text-gold-600 mb-3 text-[10px]">Your Recommended Size</p>
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <p className="font-display text-3xl sm:text-4xl text-maroon-700">{result.inches}&quot;</p>
                      <p className="font-body text-xs sm:text-sm text-stone-600 mt-1">{result.fit}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-body text-xl sm:text-2xl text-maroon-700" style={{ fontFamily: 'serif' }}>{result.urdu}</p>
                      <p className="label-luxury text-stone-500 text-[9px] sm:text-[10px] mt-1">Size {result.label}</p>
                    </div>
                  </div>
                  <p className="font-body text-xs text-stone-500">Tip: If between sizes, go one size up.</p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Chart — scrollable on mobile if needed */}
          <motion.div
            initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.25 }}
          >
            <h3 className="font-display text-lg sm:text-xl text-maroon-700 mb-4 sm:mb-5">Full Size Chart</h3>
            <div className="border border-gold-200 overflow-hidden overflow-x-auto">
              <div className="min-w-[280px]">
                <div className="grid grid-cols-4 bg-maroon-700 text-ivory-100 px-3 sm:px-4 py-2.5 sm:py-3">
                  {['Size', 'Inches', 'Wrist (cm)', 'Urdu'].map(h => (
                    <span key={h} className="label-luxury text-ivory-300/80 text-[9px] sm:text-[10px]">{h}</span>
                  ))}
                </div>
                {SIZE_CHART.map((row, i) => (
                  <div key={row.inches}
                    className={`grid grid-cols-4 px-3 sm:px-4 py-3 sm:py-3.5 border-b border-gold-200/50 last:border-0 ${i % 2 === 0 ? 'bg-white' : 'bg-ivory-100/50'}`}
                  >
                    <span className="font-body text-xs sm:text-sm font-medium text-maroon-700">{row.label}</span>
                    <span className="font-body text-xs sm:text-sm text-stone-700">{row.inches}&quot;</span>
                    <span className="font-body text-xs sm:text-sm text-stone-600">{row.cm[0]}–{row.cm[1]}</span>
                    <span className="font-body text-xs sm:text-sm text-stone-700" style={{ fontFamily: 'serif', direction: 'rtl' }}>{row.urdu}</span>
                  </div>
                ))}
              </div>
            </div>
            <p className="font-body text-xs text-stone-500 mt-3 leading-relaxed">
              * Measure wrist circumference (not diameter). Use a tape or strip of paper.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
