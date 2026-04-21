'use client'

import { useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import { Search } from 'lucide-react'
import { PRODUCTS } from '@/lib/products'
import ProductCard from '@/components/ProductCard'

export default function SearchPage() {
  const [query, setQuery] = useState('')

  const results = useMemo(() => {
    if (!query.trim()) return []
    const q = query.toLowerCase()
    return PRODUCTS.filter(p =>
      p.title.toLowerCase().includes(q) ||
      p.subtitle.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q) ||
      p.description.toLowerCase().includes(q)
    )
  }, [query])

  return (
    <div className="pt-nav bg-ivory-100 min-h-screen">
      <div className="container-luxury py-12 sm:py-16">
        <div className="text-center mb-8 sm:mb-12">
          <p className="label-luxury text-gold-600 mb-3">Find Your Perfect Bangle</p>
          <h1 className="font-display text-3xl sm:text-4xl md:text-5xl text-maroon-700 mb-6">Search</h1>

          {/* Search input */}
          <div className="relative max-w-xl mx-auto">
            <input
              type="text"
              autoFocus
              value={query}
              onChange={e => setQuery(e.target.value)}
              placeholder="Search bangles, velvet, kundan, pearl..."
              className="w-full pl-12 pr-4 py-4 border border-gold-300 bg-white font-body text-stone-800 placeholder:text-stone-400 outline-none focus:border-gold-500 transition-colors text-sm sm:text-base"
            />
            <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-400" strokeWidth={1.5} />
          </div>
        </div>

        {/* Results */}
        {query.trim() && (
          <div>
            <p className="font-body text-sm text-stone-500 mb-6 text-center">
              {results.length} result{results.length !== 1 ? 's' : ''} for &ldquo;{query}&rdquo;
            </p>
            {results.length > 0 ? (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-5">
                {results.map((p, i) => <ProductCard key={p.id} product={p} index={i} />)}
              </div>
            ) : (
              <div className="text-center py-16">
                <p className="font-display text-2xl text-maroon-700 mb-3">No results found</p>
                <p className="font-body text-stone-500 mb-6">Try searching for velvet, kundan, pearl, or metal</p>
              </div>
            )}
          </div>
        )}

        {!query.trim() && (
          <div className="text-center py-12 text-stone-400">
            <Search size={48} strokeWidth={1} className="mx-auto mb-4 text-gold-300" />
            <p className="font-body">Start typing to search our collection</p>
          </div>
        )}
      </div>
    </div>
  )
}
