import { Metadata } from 'next'
import { MessageCircle, Instagram, Globe, MapPin } from 'lucide-react'

export const metadata: Metadata = { title: 'Contact Us', description: 'Contact House of Bangles.' }

export default function ContactPage() {
  return (
    <div className="pt-nav bg-ivory-100 min-h-screen">
      {/* Page header — matches other pages */}
      <div className="bg-maroon-900 py-16 text-center">
        <p className="label-luxury text-gold-400 mb-3 tracking-[0.35em]">We&apos;d Love to Hear From You</p>
        <h1 className="font-display text-4xl md:text-5xl text-ivory-100">Contact Us</h1>
        <div className="h-px w-20 bg-gradient-to-r from-transparent via-gold-400 to-transparent mx-auto mt-5" />
      </div>

      <div className="container-luxury max-w-2xl py-12 sm:py-16">

        {/* Contact cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
          <a
            href="https://wa.me/923138560441"
            target="_blank" rel="noopener noreferrer"
            className="border border-gold-200 bg-white p-5 sm:p-6 flex items-center gap-4 hover:border-gold-400 hover:shadow-gold transition-all duration-300 group"
          >
            <div className="w-11 h-11 bg-maroon-700 flex items-center justify-center flex-shrink-0 group-hover:bg-maroon-900 transition-colors">
              <MessageCircle size={20} className="text-ivory-100" strokeWidth={1.5} />
            </div>
            <div>
              <p className="label-luxury text-stone-400 text-[10px] mb-0.5">WhatsApp</p>
              <p className="font-body text-sm font-medium text-maroon-700">+92-313-8560441</p>
            </div>
          </a>

          <a
            href="https://instagram.com/houseofbanglesx"
            target="_blank" rel="noopener noreferrer"
            className="border border-gold-200 bg-white p-5 sm:p-6 flex items-center gap-4 hover:border-gold-400 hover:shadow-gold transition-all duration-300 group"
          >
            <div className="w-11 h-11 bg-maroon-700 flex items-center justify-center flex-shrink-0 group-hover:bg-maroon-900 transition-colors">
              <Instagram size={20} className="text-ivory-100" strokeWidth={1.5} />
            </div>
            <div>
              <p className="label-luxury text-stone-400 text-[10px] mb-0.5">Instagram</p>
              <p className="font-body text-sm font-medium text-maroon-700">@houseofbanglesx</p>
            </div>
          </a>

          <a
            href="https://houseofbangles.store"
            target="_blank" rel="noopener noreferrer"
            className="border border-gold-200 bg-white p-5 sm:p-6 flex items-center gap-4 hover:border-gold-400 hover:shadow-gold transition-all duration-300 group"
          >
            <div className="w-11 h-11 bg-maroon-700 flex items-center justify-center flex-shrink-0 group-hover:bg-maroon-900 transition-colors">
              <Globe size={20} className="text-ivory-100" strokeWidth={1.5} />
            </div>
            <div>
              <p className="label-luxury text-stone-400 text-[10px] mb-0.5">Website</p>
              <p className="font-body text-sm font-medium text-maroon-700">houseofbangles.store</p>
            </div>
          </a>

          <div className="border border-gold-200 bg-white p-5 sm:p-6 flex items-center gap-4">
            <div className="w-11 h-11 bg-maroon-700 flex items-center justify-center flex-shrink-0">
              <MapPin size={20} className="text-ivory-100" strokeWidth={1.5} />
            </div>
            <div>
              <p className="label-luxury text-stone-400 text-[10px] mb-0.5">Location</p>
              <p className="font-body text-sm font-medium text-maroon-700">Hyderabad, Pakistan</p>
            </div>
          </div>
        </div>

        {/* WhatsApp CTA */}
        <div className="bg-maroon-900 text-ivory-100 p-8 sm:p-10 text-center">
          <h2 className="font-display text-2xl sm:text-3xl mb-2">Fastest Way to Order</h2>
          <div className="h-px w-16 bg-gradient-to-r from-transparent via-gold-400 to-transparent mx-auto my-4" />
          <p className="font-body text-ivory-300/80 text-sm mb-6 max-w-sm mx-auto">
            WhatsApp us with product name, size & address — we&apos;ll handle the rest!
          </p>
          <a
            href="https://wa.me/923138560441?text=Hi! I want to order from House of Bangles"
            target="_blank" rel="noopener noreferrer"
            className="btn-gold inline-flex items-center gap-2"
          >
            <MessageCircle size={16} strokeWidth={1.5} />
            Chat on WhatsApp
          </a>
        </div>

        {/* Response time note */}
        <p className="font-body text-xs text-stone-400 text-center mt-6">
          We typically respond within a few hours. For urgent orders, WhatsApp is fastest! ⚡
        </p>
      </div>
    </div>
  )
}
