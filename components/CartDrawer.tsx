'use client'

import { useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Plus, Minus, Trash2, ShoppingBag } from 'lucide-react'
import Link from 'next/link'
import { useCartStore } from '@/lib/store'

const FREE_SHIPPING = 1999

export default function CartDrawer() {
  const { isOpen, closeCart, items, removeItem, updateQty, totalItems, totalPrice } = useCartStore()

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [isOpen])

  const progress  = Math.min((totalPrice / FREE_SHIPPING) * 100, 100)
  const remaining = Math.max(FREE_SHIPPING - totalPrice, 0)

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={closeCart}
            className="fixed inset-0 bg-maroon-950/50 backdrop-blur-sm z-80"
          />

          {/* Drawer — full width on xs, 420px cap on sm+ */}
          <motion.div
            initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }}
            transition={{ type: 'tween', duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="fixed top-0 right-0 bottom-0 z-90 w-full sm:w-[420px] bg-ivory-100 flex flex-col border-l border-gold-200"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-4 sm:px-6 py-4 sm:py-5 border-b border-gold-200/60">
              <div>
                <h2 className="font-display text-lg sm:text-xl text-maroon-700">Your Cart</h2>
                <p className="font-body text-xs text-stone-500 mt-0.5">{totalItems} item{totalItems !== 1 ? 's' : ''}</p>
              </div>
              <button onClick={closeCart} className="p-2 -mr-1 text-stone-500 hover:text-maroon-700 transition-colors touch-manipulation">
                <X size={20} strokeWidth={1.5} />
              </button>
            </div>

            {/* Shipping progress */}
            <div className="px-4 sm:px-6 py-2.5 bg-maroon-700/5 border-b border-gold-200/40">
              {remaining > 0
                ? <p className="font-body text-xs text-stone-600 mb-1.5">Add <span className="text-maroon-700 font-medium">Rs.{remaining.toLocaleString()}</span> for free shipping</p>
                : <p className="font-body text-xs text-maroon-700 font-medium mb-1.5">🎉 Free shipping unlocked!</p>
              }
              <div className="h-1 bg-gold-200 rounded-full overflow-hidden">
                <motion.div className="h-full bg-gradient-to-r from-gold-400 to-gold-500"
                  initial={{ width: 0 }} animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.5, ease: 'easeOut' }}
                />
              </div>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto px-4 sm:px-6 py-4 space-y-4">
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center py-12">
                  <ShoppingBag size={44} strokeWidth={1} className="text-gold-300 mb-4" />
                  <h3 className="font-display text-xl text-maroon-700 mb-2">Your cart is empty</h3>
                  <p className="font-body text-sm text-stone-500 mb-6">Add some beautiful bangles</p>
                  <button onClick={closeCart} className="btn-primary">Browse Collection</button>
                </div>
              ) : (
                items.map(item => (
                  <div key={item.id} className="flex gap-3 sm:gap-4 pb-4 border-b border-gold-200/50 last:border-0">
                    <div className="w-16 sm:w-20 h-20 sm:h-24 flex-shrink-0 overflow-hidden bg-ivory-200">
                      <img src={item.image} alt={item.title} className="w-full h-full object-cover" loading="lazy" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-display text-sm sm:text-base text-maroon-700 leading-tight line-clamp-2">{item.title}</h4>
                      <p className="font-body text-xs text-stone-500 mt-0.5">Size: {item.size}&quot;</p>
                      <p className="font-body text-sm font-medium text-maroon-700 mt-1">Rs.{(item.price * item.quantity).toLocaleString()}</p>
                      <div className="flex items-center gap-2 mt-2">
                        <button onClick={() => updateQty(item.id, item.quantity - 1)}
                          className="w-7 h-7 border border-gold-300 flex items-center justify-center text-stone-600 hover:border-maroon-400 touch-manipulation">
                          <Minus size={11} />
                        </button>
                        <span className="font-body text-sm w-5 text-center">{item.quantity}</span>
                        <button onClick={() => updateQty(item.id, item.quantity + 1)}
                          className="w-7 h-7 border border-gold-300 flex items-center justify-center text-stone-600 hover:border-maroon-400 touch-manipulation">
                          <Plus size={11} />
                        </button>
                        <button onClick={() => removeItem(item.id)}
                          className="ml-auto p-1.5 text-stone-400 hover:text-maroon-600 transition-colors touch-manipulation">
                          <Trash2 size={13} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="border-t border-gold-200/60 px-4 sm:px-6 py-4 sm:py-5 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-body text-stone-600 text-sm">Subtotal</span>
                  <span className="font-display text-lg text-maroon-700">Rs.{totalPrice.toLocaleString()}</span>
                </div>
                <button className="btn-primary w-full text-center block py-3.5">Proceed to Checkout</button>
                <button onClick={closeCart} className="btn-outline w-full text-center text-sm py-3">Continue Shopping</button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
