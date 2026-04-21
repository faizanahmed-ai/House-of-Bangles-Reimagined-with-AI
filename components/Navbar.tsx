'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { ShoppingBag, Menu, X, Search, Heart } from 'lucide-react'
import { useCartStore } from '@/lib/store'

const navLinks = [
  { label: 'Collection', href: '/products' },
  { label: 'Deal Boxes', href: '/products?filter=deals' },
  { label: 'Velvet',     href: '/products?filter=velvet' },
  { label: 'Kundan',     href: '/products?filter=kundan' },
  { label: 'Pearl',      href: '/products?filter=pearl' },
  { label: 'Our Story',  href: '/#story' },
]

export default function Navbar() {
  const pathname = usePathname()
  const [scrolled, setScrolled]   = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const { openCart, totalItems }   = useCartStore()

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [mobileOpen])

  const isHome = pathname === '/'

  return (
    <>
      <header
        className={`
          fixed top-0 left-0 right-0 z-50
          transition-all duration-500
          ${scrolled || !isHome
            ? 'bg-ivory-100/95 backdrop-blur-md border-b border-gold-200/60 shadow-luxury'
            : 'bg-transparent border-b border-white/10'
          }
        `}
        style={{ height: 'var(--nav-height)' }}
      >
        <div className="container-luxury h-full flex items-center justify-between gap-8">

          {/* ── Left nav links (desktop) ── */}
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.slice(0, 3).map(link => (
              <Link
                key={link.href}
                href={link.href}
                className={`nav-link ${
                  pathname === link.href ? 'active' : ''
                } ${!scrolled && isHome ? 'text-ivory-200 hover:text-ivory-100' : ''}`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* ── Logo (centre) ── */}
          <Link
            href="/"
            className="flex flex-col items-center leading-none select-none flex-shrink-0"
          >
            <span
              className={`
                font-display font-light tracking-[0.35em] uppercase text-xs
                ${scrolled || !isHome ? 'text-gold-600' : 'text-gold-300'}
                transition-colors duration-300
              `}
            >
              House of
            </span>
            <span
              className={`
                font-display font-semibold tracking-[0.15em] uppercase text-2xl
                ${scrolled || !isHome ? 'text-maroon-700' : 'text-ivory-100'}
                transition-colors duration-300
              `}
            >
              Bangles
            </span>
            {/* Gold ornament line */}
            <span
              className={`
                mt-0.5 block h-px w-16
                bg-gradient-to-r from-transparent via-gold-400 to-transparent
                transition-opacity duration-300
                ${scrolled || !isHome ? 'opacity-80' : 'opacity-50'}
              `}
            />
          </Link>

          {/* ── Right nav + icons (desktop) ── */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.slice(3, 6).map(link => (
              <Link
                key={link.href}
                href={link.href}
                className={`nav-link ${
                  pathname === link.href ? 'active' : ''
                } ${!scrolled && isHome ? 'text-ivory-200 hover:text-ivory-100' : ''}`}
              >
                {link.label}
              </Link>
            ))}
            <div className="flex items-center gap-4 ml-2">
              <Link
                href="/search"
                aria-label="Search"
                className={`
                  p-1.5 transition-colors duration-200 flex items-center
                  ${scrolled || !isHome
                    ? 'text-stone-600 hover:text-maroon-700'
                    : 'text-ivory-300 hover:text-ivory-100'
                  }
                `}
              >
                <Search size={18} strokeWidth={1.5} />
              </Link>
              <button
                aria-label="Wishlist"
                onClick={() => { const t = document.querySelector('[data-wishlist]'); if(t) (t as HTMLElement).click(); else import('react-hot-toast').then(({toast}) => toast('❤️ Add items to wishlist from product cards!')) }}
                className={`
                  p-1.5 transition-colors duration-200
                  ${scrolled || !isHome
                    ? 'text-stone-600 hover:text-maroon-700'
                    : 'text-ivory-300 hover:text-ivory-100'
                  }
                `}
              >
                <Heart size={18} strokeWidth={1.5} />
              </button>
              <button
                onClick={openCart}
                aria-label={`Cart (${totalItems} items)`}
                className={`
                  relative p-1.5 transition-colors duration-200
                  ${scrolled || !isHome
                    ? 'text-stone-600 hover:text-maroon-700'
                    : 'text-ivory-300 hover:text-ivory-100'
                  }
                `}
              >
                <ShoppingBag size={20} strokeWidth={1.5} />
                {totalItems > 0 && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="
                      absolute -top-1 -right-1
                      w-4 h-4 rounded-full
                      bg-maroon-700 text-ivory-100
                      text-[9px] font-body font-semibold
                      flex items-center justify-center
                    "
                  >
                    {totalItems}
                  </motion.span>
                )}
              </button>
            </div>
          </div>

          {/* ── Mobile icons ── */}
          <div className="flex lg:hidden items-center gap-3">
            <button
              onClick={openCart}
              aria-label="Cart"
              className={`
                relative p-1.5
                ${scrolled || !isHome ? 'text-stone-700' : 'text-ivory-200'}
              `}
            >
              <ShoppingBag size={20} strokeWidth={1.5} />
              {totalItems > 0 && (
                <span className="
                  absolute -top-1 -right-1
                  w-4 h-4 rounded-full
                  bg-maroon-700 text-ivory-100
                  text-[9px] font-body font-semibold
                  flex items-center justify-center
                ">
                  {totalItems}
                </span>
              )}
            </button>
            <button
              onClick={() => setMobileOpen(true)}
              aria-label="Open menu"
              className={`p-1.5 ${scrolled || !isHome ? 'text-stone-700' : 'text-ivory-200'}`}
            >
              <Menu size={22} strokeWidth={1.5} />
            </button>
          </div>
        </div>
      </header>

      {/* ══ MOBILE MENU ══════════════════════════════════ */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileOpen(false)}
              className="fixed inset-0 bg-maroon-950/60 backdrop-blur-sm z-60 lg:hidden"
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'tween', duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="
                fixed top-0 right-0 bottom-0 z-70
                w-[min(320px,85vw)]
                bg-ivory-100 flex flex-col
                border-l border-gold-200
                lg:hidden
              "
            >
              {/* Header */}
              <div className="flex items-center justify-between px-6 py-5 border-b border-gold-200/60">
                <div className="flex flex-col leading-none">
                  <span className="font-display font-light text-gold-600 tracking-widest text-xs uppercase">House of</span>
                  <span className="font-display font-semibold text-maroon-700 tracking-wider text-xl uppercase">Bangles</span>
                </div>
                <button
                  onClick={() => setMobileOpen(false)}
                  className="p-1.5 text-stone-500 hover:text-maroon-700 transition-colors"
                >
                  <X size={22} strokeWidth={1.5} />
                </button>
              </div>

              {/* Nav Links */}
              <nav className="flex-1 px-6 py-8 flex flex-col gap-1 overflow-y-auto">
                {navLinks.map((link, i) => (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.06 + 0.1 }}
                  >
                    <Link
                      href={link.href}
                      onClick={() => setMobileOpen(false)}
                      className="
                        block py-3.5 px-2
                        font-display font-light text-2xl
                        text-maroon-700 tracking-wide
                        border-b border-gold-200/40
                        transition-colors hover:text-maroon-900
                      "
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                ))}
              </nav>

              {/* Bottom strip */}
              <div className="px-6 py-6 border-t border-gold-200/60">
                <p className="label-luxury mb-3">Need help?</p>
                <a
                  href="https://wa.me/92XXXXXXXXXX"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary w-full text-center"
                >
                  WhatsApp Us
                </a>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
