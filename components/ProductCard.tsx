'use client'

import { useState, useRef, useCallback } from 'react'
import Link from 'next/link'
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from 'framer-motion'
import { ShoppingBag, Star, Heart } from 'lucide-react'
import { toast } from 'react-hot-toast'
import { useCartStore } from '@/lib/store'
import type { Product } from '@/lib/products'

interface ProductCardProps {
  product: Product
  index?: number
}

export default function ProductCard({ product, index = 0 }: ProductCardProps) {
  const [selectedSize, setSelectedSize] = useState('')
  const [showSizes, setShowSizes]       = useState(false)
  const [wishlisted, setWishlisted]     = useState(false)
  const cardRef = useRef<HTMLDivElement>(null)
  const addItem  = useCartStore(s => s.addItem)
  const openCart = useCartStore(s => s.openCart)

  // 3D tilt
  const mouseX  = useMotionValue(0)
  const mouseY  = useMotionValue(0)
  const rotateX = useSpring(useTransform(mouseY, [-1, 1], [4, -4]), { stiffness: 180, damping: 25 })
  const rotateY = useSpring(useTransform(mouseX, [-1, 1], [-4, 4]), { stiffness: 180, damping: 25 })
  const glareX  = useTransform(mouseX, [-1, 1], ['0%', '100%'])
  const glareY  = useTransform(mouseY, [-1, 1], ['0%', '100%'])

  const onMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const rect = cardRef.current?.getBoundingClientRect()
    if (!rect) return
    mouseX.set(((e.clientX - rect.left) / rect.width - 0.5) * 2)
    mouseY.set(((e.clientY - rect.top) / rect.height - 0.5) * 2)
  }, [mouseX, mouseY])

  const onMouseLeave = useCallback(() => {
    mouseX.set(0); mouseY.set(0); setShowSizes(false)
  }, [mouseX, mouseY])

  const handleAddToCart = useCallback((e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (!selectedSize) {
      toast('Please select a size first', { icon: '📏' })
      return
    }
    addItem({
      id: `${product.id}-${selectedSize}`,
      variantId: `${product.id}-${selectedSize}`,
      title: product.title,
      price: product.price,
      quantity: 1,
      image: product.image,
      size: selectedSize,
    })
    toast.success('Added to cart!')
    openCart()
  }, [selectedSize, product, addItem, openCart])

  const handleWishlist = useCallback((e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setWishlisted(v => !v)
    toast(wishlisted ? 'Removed from wishlist' : '❤️ Added to wishlist!')
  }, [wishlisted])

  const handleSizeClick = useCallback((e: React.MouseEvent, size: string) => {
    e.preventDefault()
    e.stopPropagation()
    setSelectedSize(size)
  }, [])

  const sizeLabels = product.sizeLabels || product.sizes.map(s => ({ value: s, urdu: s }))

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.06, duration: 0.45, ease: [0.25, 0.46, 0.45, 0.94] }}
      onMouseMove={onMouseMove}
      onMouseEnter={() => setShowSizes(true)}
      onMouseLeave={onMouseLeave}
      style={{ rotateX, rotateY, transformStyle: 'preserve-3d', perspective: 800 }}
      className="card-product group relative"
    >
      {/* Glare */}
      <motion.div
        className="absolute inset-0 z-10 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{ background: `radial-gradient(circle at ${glareX} ${glareY}, rgba(255,255,255,0.07) 0%, transparent 60%)` }}
      />

      {/* Wishlist button */}
      <button
        onClick={handleWishlist}
        className="absolute top-2.5 right-2.5 z-20 w-8 h-8 flex items-center justify-center bg-ivory-100/90 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-all duration-200 hover:scale-110 touch-manipulation"
        aria-label="Add to wishlist"
      >
        <Heart
          size={14}
          className={wishlisted ? 'fill-maroon-600 text-maroon-600' : 'text-stone-500'}
        />
      </button>

      {/* Image — Link always navigates */}
      <Link href={`/products/${product.slug}`} className="block">
        <div className="product-img-wrap aspect-[4/5] relative overflow-hidden">
          <motion.img
            src={product.image}
            alt={product.title}
            className="w-full h-full object-cover"
            loading="lazy"
            decoding="async"
            whileHover={{ scale: 1.06 }}
            transition={{ duration: 0.55, ease: [0.25, 0.46, 0.45, 0.94] }}
          />

          {/* Sold out */}
          {product.soldOut && (
            <div className="absolute inset-0 bg-maroon-950/50 flex items-center justify-center">
              <span className="font-body text-xs text-ivory-200 tracking-widest uppercase bg-maroon-900/80 px-3 py-1.5">Sold Out</span>
            </div>
          )}

          {/* Badge */}
          {product.badge && !product.soldOut && (
            <motion.span
              initial={{ x: -16, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: index * 0.06 + 0.25 }}
              className={`absolute top-2.5 left-2.5 z-10 px-2 py-1 text-[10px] sm:text-xs font-body font-medium tracking-wider uppercase
                ${product.badge === 'deal' || product.badge === 'viral' ? 'bg-gold-400 text-maroon-900' : product.badge === 'bestseller' ? 'bg-maroon-700 text-ivory-100' : 'bg-maroon-600 text-ivory-100'}`}
            >
              {product.badge === 'viral' ? '🔥 Viral' : product.badge}
            </motion.span>
          )}

          {/* Size selector — stops propagation so Link still works on non-overlay click */}
          <AnimatePresence>
            {showSizes && !product.soldOut && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 5 }}
                transition={{ duration: 0.18 }}
                className="absolute bottom-0 left-0 right-0 bg-ivory-100/97 backdrop-blur-sm p-2.5 sm:p-3"
                onClick={e => e.stopPropagation()}
              >
                <p className="label-luxury text-gold-600 mb-1.5 sm:mb-2 text-[9px] sm:text-[10px]">Select Size</p>
                <div className="flex flex-wrap gap-1 sm:gap-1.5 mb-2 sm:mb-2.5">
                  {sizeLabels.map(({ value, urdu }) => (
                    <motion.button
                      key={value}
                      whileTap={{ scale: 0.88 }}
                      onClick={e => handleSizeClick(e, value)}
                      title={urdu}
                      className={`px-1.5 sm:px-2 h-7 sm:h-8 text-[10px] sm:text-xs font-body font-medium border transition-all duration-150 touch-manipulation
                        ${selectedSize === value ? 'bg-maroon-700 text-ivory-100 border-maroon-700' : 'border-gold-300 text-stone-700 hover:border-maroon-400'}`}
                    >
                      {value}&quot;
                    </motion.button>
                  ))}
                </div>
                <motion.button
                  whileTap={{ scale: 0.97 }}
                  onClick={handleAddToCart}
                  className="w-full bg-maroon-700 text-ivory-100 py-2 sm:py-2.5 text-[10px] sm:text-xs font-body font-medium tracking-wider uppercase flex items-center justify-center gap-1.5 hover:bg-maroon-900 transition-colors touch-manipulation"
                >
                  <ShoppingBag size={12} />
                  Add to Cart
                </motion.button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </Link>

      {/* Info */}
      <motion.div className="p-3 sm:p-4" style={{ translateZ: 16 }}>
        <Link href={`/products/${product.slug}`}>
          <h3 className="font-display font-medium text-maroon-700 text-base sm:text-lg leading-tight mb-0.5 hover:text-maroon-900 transition-colors line-clamp-2">
            {product.title}
          </h3>
        </Link>
        <p className="font-body text-[10px] sm:text-xs text-stone-500 mb-2 sm:mb-3 line-clamp-1">{product.subtitle}</p>

        <div className="flex items-center gap-1 mb-2 sm:mb-3">
          <div className="flex items-center gap-0.5">
            {[...Array(5)].map((_, i) => (
              <Star key={i} size={10} className={i < Math.round(product.rating) ? 'text-gold-400 fill-gold-400' : 'text-stone-300'} />
            ))}
          </div>
          <span className="text-[10px] sm:text-[11px] text-stone-500 font-body">({product.reviews})</span>
        </div>

        <div className="flex items-baseline gap-1.5 sm:gap-2">
          <span className="font-body font-semibold text-maroon-700 text-base sm:text-lg">
            Rs.{product.price.toLocaleString()}
          </span>
          {product.originalPrice && (
            <span className="font-body text-xs sm:text-sm text-stone-400 line-through">
              Rs.{product.originalPrice.toLocaleString()}
            </span>
          )}
        </div>
      </motion.div>
    </motion.div>
  )
}
