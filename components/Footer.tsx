'use client'

import Link from 'next/link'
import { Instagram, Mail, MessageCircle, Heart } from 'lucide-react'

const footerLinks = {
  shop: [
    { label: 'All Bangles',     href: '/products' },
    { label: 'Velvet Collection', href: '/products?filter=velvet' },
    { label: 'Kundan Collection', href: '/products?filter=kundan' },
    { label: 'Pearl Collection',  href: '/products?filter=pearl' },
    { label: 'Deal Boxes',        href: '/products?filter=deals' },
  ],
  help: [
    { label: 'Size Guide',       href: '/#size-guide' },
    { label: 'Shipping Info',    href: '/shipping' },
    { label: 'Returns Policy',   href: '/returns' },
    { label: 'Contact Us',       href: '/contact' },
    { label: 'FAQs',             href: '/faqs' },
  ],
}

export default function Footer() {
  return (
    <>
      {/* ══ WHATSAPP FLOAT BUTTON ═══════════════════════ */}
      <a
        href="https://wa.me/92XXXXXXXXXX?text=Hi! I'm interested in your bangles."
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
        className="
          fixed bottom-6 left-6 z-60
          w-14 h-14 rounded-full
          bg-[#25D366] text-white
          flex items-center justify-center
          shadow-lg shadow-[#25D366]/30
          transition-transform duration-200
          hover:scale-110 active:scale-95
          no-print
        "
      >
        <MessageCircle size={26} strokeWidth={1.5} fill="white" />
      </a>

      {/* ══ MARQUEE ANNOUNCEMENT STRIP ══════════════════ */}
      <div className="bg-maroon-700 text-ivory-100 py-2.5 overflow-hidden">
        <div className="marquee-strip">
          <div className="marquee-content">
            {[...Array(8)].map((_, i) => (
              <span key={i} className="flex items-center gap-8 px-8">
                <span className="font-body text-xs tracking-[0.2em] uppercase">Free shipping above Rs. 1,999</span>
                <span className="text-gold-400 text-lg">◆</span>
                <span className="font-body text-xs tracking-[0.2em] uppercase">Authentic Hyderabadi Bangles</span>
                <span className="text-gold-400 text-lg">◆</span>
                <span className="font-body text-xs tracking-[0.2em] uppercase">Ships across Pakistan</span>
                <span className="text-gold-400 text-lg">◆</span>
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* ══ MAIN FOOTER ══════════════════════════════════ */}
      <footer className="bg-maroon-900 text-ivory-200">

        {/* Top section */}
        <div className="container-luxury pt-16 pb-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">

            {/* Brand column */}
            <div className="lg:col-span-2">
              <div className="mb-6">
                <p className="font-display font-light text-gold-400 tracking-[0.35em] uppercase text-xs mb-1">
                  House of
                </p>
                <h2 className="font-display font-semibold text-ivory-100 tracking-[0.15em] uppercase text-3xl mb-3">
                  Bangles
                </h2>
                <div className="h-px w-24 bg-gradient-to-r from-gold-400 to-transparent" />
              </div>
              <p className="font-body font-light text-ivory-300/80 text-sm leading-relaxed max-w-xs mb-8">
                Bringing the finest Hyderabadi bangles to jewelry lovers across Pakistan and beyond. 
                Every piece tells a story of heritage, craftsmanship, and timeless elegance.
              </p>

              {/* Social links */}
              <div className="flex items-center gap-4">
                <a
                  href="https://instagram.com/houseofbanglesx"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                  className="
                    w-10 h-10 border border-ivory-300/20
                    flex items-center justify-center
                    text-ivory-300/60 hover:text-gold-400 hover:border-gold-400/40
                    transition-all duration-300
                  "
                >
                  <Instagram size={18} strokeWidth={1.5} />
                </a>
                <a
                  href="mailto:hello@houseofbangles.store"
                  aria-label="Email"
                  className="
                    w-10 h-10 border border-ivory-300/20
                    flex items-center justify-center
                    text-ivory-300/60 hover:text-gold-400 hover:border-gold-400/40
                    transition-all duration-300
                  "
                >
                  <Mail size={18} strokeWidth={1.5} />
                </a>
                <a
                  href="https://wa.me/92XXXXXXXXXX"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="WhatsApp"
                  className="
                    w-10 h-10 border border-ivory-300/20
                    flex items-center justify-center
                    text-ivory-300/60 hover:text-gold-400 hover:border-gold-400/40
                    transition-all duration-300
                  "
                >
                  <MessageCircle size={18} strokeWidth={1.5} />
                </a>
              </div>
            </div>

            {/* Shop links */}
            <div>
              <h3 className="label-luxury text-gold-500 mb-5">Shop</h3>
              <ul className="flex flex-col gap-3">
                {footerLinks.shop.map(link => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="
                        font-body text-sm text-ivory-300/70
                        hover:text-gold-400 transition-colors duration-200
                        flex items-center gap-2 group
                      "
                    >
                      <span className="w-0 group-hover:w-3 h-px bg-gold-400 transition-all duration-300 flex-shrink-0" />
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Help links */}
            <div>
              <h3 className="label-luxury text-gold-500 mb-5">Help</h3>
              <ul className="flex flex-col gap-3">
                {footerLinks.help.map(link => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="
                        font-body text-sm text-ivory-300/70
                        hover:text-gold-400 transition-colors duration-200
                        flex items-center gap-2 group
                      "
                    >
                      <span className="w-0 group-hover:w-3 h-px bg-gold-400 transition-all duration-300 flex-shrink-0" />
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>

              {/* Newsletter */}
              <div className="mt-8">
                <h3 className="label-luxury text-gold-500 mb-3">Stay in touch</h3>
                <div className="flex gap-0">
                  <input
                    type="email"
                    placeholder="Your email"
                    className="
                      flex-1 px-3 py-2.5
                      bg-maroon-800 border border-ivory-300/10
                      text-ivory-200 text-sm font-body
                      placeholder:text-ivory-300/30
                      outline-none focus:border-gold-400/40
                      transition-colors duration-200
                    "
                  />
                  <button className="
                    px-4 py-2.5
                    bg-gold-400 text-maroon-900
                    text-xs font-body font-semibold tracking-wider uppercase
                    hover:bg-gold-300 transition-colors duration-200
                    flex-shrink-0
                  ">
                    Join
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="divider-gold opacity-20 mx-8" />

        {/* Bottom bar */}
        <div className="container-luxury py-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-ivory-300/40 font-body">
            <p>© {new Date().getFullYear()} House of Bangles. All rights reserved.</p>
            <p className="flex items-center gap-1.5">
              Made with <Heart size={10} className="text-maroon-400 fill-maroon-400" /> in Pakistan
            </p>
            <div className="flex items-center gap-4">
              <Link href="/privacy" className="hover:text-gold-400 transition-colors">Privacy</Link>
              <Link href="/terms"   className="hover:text-gold-400 transition-colors">Terms</Link>
            </div>
          </div>
        </div>
      </footer>
    </>
  )
}
