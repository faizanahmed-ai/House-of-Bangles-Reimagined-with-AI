'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ShoppingBag, Star, Shield, Truck, RotateCcw, ChevronLeft } from 'lucide-react'
import { toast } from 'react-hot-toast'
import { useCartStore } from '@/lib/store'
import ProductCard from '@/components/ProductCard'
import type { Product } from '@/lib/products'

interface Props { product: Product; related: Product[] }

const TRUST = [
  { icon: Shield,     label: 'Authentic',      sub: 'Certified craftsmanship' },
  { icon: Truck,      label: 'Free Shipping',  sub: 'Above Rs. 1,999' },
  { icon: RotateCcw,  label: 'Exchange',       sub: 'For size issues' },
]

export default function ProductDetailClient({ product, related }: Props) {
  const [selectedSize, setSelectedSize] = useState('')
  const addItem  = useCartStore(s => s.addItem)
  const openCart = useCartStore(s => s.openCart)
  const sizeLabels = product.sizeLabels || product.sizes.map(s => ({ value: s, urdu: s }))

  const handleAddToCart = () => {
    if (!selectedSize) { toast('Please select a size', { icon: '📏' }); return }
    addItem({ id: `${product.id}-${selectedSize}`, variantId: `${product.id}-${selectedSize}`, title: product.title, price: product.price, quantity: 1, image: product.image, size: selectedSize })
    toast.success('Added to cart!')
    openCart()
  }

  return (
    <div className="pt-nav bg-ivory-100 min-h-screen">
      {/* Breadcrumb */}
      <div className="container-luxury py-3 sm:py-4">
        <Link href="/products" className="flex items-center gap-1.5 font-body text-xs sm:text-sm text-stone-500 hover:text-maroon-700 transition-colors touch-manipulation">
          <ChevronLeft size={15} /> Back to Collection
        </Link>
      </div>

      {/* Main — stack on mobile, side-by-side on lg */}
      <div className="container-luxury pb-12 sm:pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-start">

          {/* Image */}
          <motion.div
            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
            className="product-img-wrap aspect-square bg-ivory-200 relative"
          >
            <img src={product.image} alt={product.title} className="w-full h-full object-cover" loading="eager" decoding="async" />
            {product.badge && (
              <span className={`absolute top-3 sm:top-4 left-3 sm:left-4 z-10 px-2.5 py-1.5 text-xs font-body font-medium tracking-wider uppercase
                ${product.badge === 'deal' || product.badge === 'viral' ? 'bg-gold-400 text-maroon-900' : 'bg-maroon-700 text-ivory-100'}`}>
                {product.badge === 'viral' ? '🔥 Viral' : product.badge === 'deal' ? 'Best Value' : product.badge}
              </span>
            )}
            {product.soldOut && (
              <div className="absolute inset-0 bg-maroon-950/40 flex items-center justify-center">
                <span className="bg-maroon-900/90 text-ivory-200 font-body text-sm tracking-widest uppercase px-4 py-2">Sold Out</span>
              </div>
            )}
          </motion.div>

          {/* Info */}
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }} className="py-0 lg:py-2">
            <p className="label-luxury text-gold-600 mb-2 sm:mb-3 capitalize text-[10px] sm:text-xs">{product.category} Collection</p>
            <h1 className="font-display text-2xl sm:text-3xl md:text-4xl text-maroon-700 mb-1.5 sm:mb-2 leading-tight">{product.title}</h1>
            <p className="font-body text-stone-500 mb-3 sm:mb-4 text-sm sm:text-base">{product.subtitle}</p>

            {/* Rating */}
            <div className="flex items-center gap-2 mb-4 sm:mb-6">
              <div className="flex items-center gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={14} className={i < Math.round(product.rating) ? 'text-gold-400 fill-gold-400' : 'text-stone-300'} />
                ))}
              </div>
              <span className="font-body text-xs sm:text-sm text-stone-500">{product.rating} ({product.reviews} reviews)</span>
            </div>

            <div className="divider-gold mb-4 sm:mb-6" />

            {/* Price */}
            <div className="flex items-baseline gap-2 sm:gap-3 mb-6 sm:mb-8">
              <span className="font-display text-3xl sm:text-4xl text-maroon-700">Rs.{product.price.toLocaleString()}</span>
              {product.originalPrice && (
                <>
                  <span className="font-body text-base sm:text-lg text-stone-400 line-through">Rs.{product.originalPrice.toLocaleString()}</span>
                  <span className="font-body text-xs font-medium text-gold-600 bg-gold-50 px-2 py-0.5 border border-gold-200">
                    Save Rs.{(product.originalPrice - product.price).toLocaleString()}
                  </span>
                </>
              )}
            </div>

            <p className="font-body text-stone-600 leading-relaxed mb-6 sm:mb-8 text-sm sm:text-base">{product.description}</p>

            {/* What's in the box */}
            {product.whatsIn && product.whatsIn.length > 0 && (
              <div className="mb-6 sm:mb-8 p-4 sm:p-5 border border-gold-200 bg-gold-50/30">
                <p className="label-luxury text-gold-600 mb-2.5 sm:mb-3 text-[10px] sm:text-xs">What&apos;s Inside the Box</p>
                <ul className="space-y-1.5 sm:space-y-2">
                  {product.whatsIn.map((item, i) => (
                    <li key={i} className="font-body text-xs sm:text-sm text-stone-700 leading-relaxed">{item}</li>
                  ))}
                </ul>
              </div>
            )}

            {/* Size selector */}
            {!product.soldOut && (
              <div className="mb-5 sm:mb-6">
                <div className="flex items-center justify-between mb-2.5 sm:mb-3">
                  <p className="label-luxury text-stone-700 text-[10px] sm:text-xs">Select Size (inches)</p>
                  <Link href="/#size-guide" className="font-body text-xs text-gold-600 hover:text-gold-700 underline underline-offset-2">
                    Size Guide
                  </Link>
                </div>
                <div className="flex flex-wrap gap-2">
                  {sizeLabels.map(({ value, urdu }) => (
                    <button key={value} onClick={() => setSelectedSize(value)}
                      className={`flex flex-col items-center justify-center px-2 sm:px-3 py-2 min-w-[52px] sm:min-w-[56px] h-auto border transition-all duration-200 touch-manipulation
                        ${selectedSize === value ? 'bg-maroon-700 text-ivory-100 border-maroon-700' : 'border-gold-300 text-stone-700 hover:border-maroon-400'}`}>
                      <span className="font-body text-sm font-medium">{value}&quot;</span>
                      <span className={`text-[8px] sm:text-[9px] mt-0.5 leading-tight text-center ${selectedSize === value ? 'text-ivory-300' : 'text-stone-400'}`}>{urdu}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* CTAs */}
            {!product.soldOut ? (
              <>
                <button onClick={handleAddToCart}
                  className="btn-primary w-full text-center block py-3.5 sm:py-4 text-sm flex items-center justify-center gap-2 mb-3 touch-manipulation">
                  <ShoppingBag size={16} /> Add to Cart
                </button>
                <a href={`https://api.whatsapp.com/send?phone=+923138560441&text=Hi! I want to order: ${encodeURIComponent(product.title)}`}
                  target="_blank" rel="noopener noreferrer"
                  className="btn-outline w-full text-center text-sm block py-3.5 touch-manipulation">
                  Order via WhatsApp
                </a>
              </>
            ) : (
              <a href="https://api.whatsapp.com/send?phone=+923138560441&text=Hi! Is this back in stock?"
                target="_blank" rel="noopener noreferrer"
                className="btn-primary w-full text-center block py-3.5 touch-manipulation">
                Ask About Availability
              </a>
            )}

            {/* Trust badges */}
            <div className="grid grid-cols-3 gap-2 sm:gap-3 mt-6 sm:mt-8 pt-5 sm:pt-6 border-t border-gold-200/60">
              {TRUST.map(({ icon: Icon, label, sub }) => (
                <div key={label} className="text-center">
                  <Icon size={18} strokeWidth={1.5} className="text-gold-500 mx-auto mb-1 sm:mb-1.5" />
                  <p className="font-body text-[10px] sm:text-xs font-medium text-stone-700">{label}</p>
                  <p className="font-body text-[9px] sm:text-[10px] text-stone-400 mt-0.5 hidden sm:block">{sub}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Related */}
      {related.length > 0 && (
        <div className="border-t border-gold-200/60 section-padding bg-ivory-200/40">
          <div className="container-luxury">
            <h2 className="font-display text-2xl sm:text-3xl text-maroon-700 mb-6 sm:mb-8 text-center">You May Also Like</h2>
            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-5 sm:gap-6">
              {related.map((p, i) => <ProductCard key={p.id} product={p} index={i} />)}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
