import { Metadata } from 'next'
import { Truck, Package, Clock, MapPin } from 'lucide-react'

export const metadata: Metadata = { title: 'Shipping Info', description: 'Shipping and delivery information for House of Bangles.' }

export default function ShippingPage() {
  return (
    <div className="pt-nav bg-ivory-100 min-h-screen">
      <div className="container-luxury max-w-3xl py-12 sm:py-16">
        <div className="text-center mb-10">
          <p className="label-luxury text-gold-600 mb-3">Delivery Info</p>
          <h1 className="font-display text-3xl sm:text-4xl md:text-5xl text-maroon-700">Shipping Policy</h1>
          <div className="divider-gold w-24 mx-auto mt-5" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
          {[
            { icon: MapPin, title: 'All of Pakistan', desc: 'We ship to every city and town across Pakistan' },
            { icon: Clock, title: '3–5 Business Days', desc: 'Standard delivery time after order confirmation' },
            { icon: Truck, title: 'Free Shipping', desc: 'On all orders above Rs. 1,999' },
            { icon: Package, title: 'Safe Packaging', desc: 'White corrugated boxes for maximum protection' },
          ].map(({ icon: Icon, title, desc }) => (
            <div key={title} className="border border-gold-200 bg-white p-5 flex gap-4 items-start">
              <div className="w-10 h-10 bg-maroon-700 flex items-center justify-center flex-shrink-0">
                <Icon size={18} className="text-ivory-100" strokeWidth={1.5} />
              </div>
              <div>
                <h3 className="font-display text-lg text-maroon-700 mb-1">{title}</h3>
                <p className="font-body text-sm text-stone-600">{desc}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="space-y-6 font-body text-stone-700 text-sm leading-relaxed">
          <div className="border border-gold-200 bg-white p-5 sm:p-6">
            <h2 className="font-display text-xl text-maroon-700 mb-3">Order Processing</h2>
            <p>Orders are processed within 1–2 business days after payment confirmation. You will receive a WhatsApp message with tracking details once your order is dispatched.</p>
          </div>
          <div className="border border-gold-200 bg-white p-5 sm:p-6">
            <h2 className="font-display text-xl text-maroon-700 mb-3">Shipping Charges</h2>
            <ul className="space-y-2">
              <li>✅ <strong>Free shipping</strong> on orders above Rs. 1,999</li>
              <li>⚠️ <strong>Minimum order</strong> of Rs. 1,250 required</li>
              <li>📦 Shipping charges apply for orders below Rs. 1,999 (calculated at checkout)</li>
            </ul>
          </div>
          <div className="border border-gold-200 bg-white p-5 sm:p-6">
            <h2 className="font-display text-xl text-maroon-700 mb-3">Courier Partners</h2>
            <p>We use reliable courier partners including Leopards, TCS, M&P, and Pakistan Post depending on your location. All packages are insured during transit.</p>
          </div>
          <div className="border border-gold-200 bg-white p-5 sm:p-6">
            <h2 className="font-display text-xl text-maroon-700 mb-3">Tracking Your Order</h2>
            <p>Once dispatched, you will receive a tracking number via WhatsApp. You can use this to track your package on the courier's website. For any issues, contact us at +92-313-8560441.</p>
          </div>
        </div>
      </div>
    </div>
  )
}
