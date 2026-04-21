import { Metadata } from 'next'

export const metadata: Metadata = { title: 'Returns & Exchange', description: 'Returns and exchange policy for House of Bangles.' }

export default function ReturnsPage() {
  return (
    <div className="pt-nav bg-ivory-100 min-h-screen">
      <div className="container-luxury max-w-3xl py-12 sm:py-16">
        <div className="text-center mb-10">
          <p className="label-luxury text-gold-600 mb-3">We've Got You</p>
          <h1 className="font-display text-3xl sm:text-4xl md:text-5xl text-maroon-700">Returns & Exchange</h1>
          <div className="divider-gold w-24 mx-auto mt-5" />
        </div>

        <div className="space-y-5 font-body text-stone-700 text-sm leading-relaxed">
          <div className="border border-gold-200 bg-white p-5 sm:p-6">
            <h2 className="font-display text-xl text-maroon-700 mb-3">Exchange Policy</h2>
            <p className="mb-3">We offer exchanges for size issues. If your bangles don't fit, we'll exchange them for the correct size at no extra charge.</p>
            <ul className="space-y-2">
              <li>✅ Exchange allowed for size issues</li>
              <li>✅ Contact us within 7 days of receiving your order</li>
              <li>✅ Items must be in original, unworn condition</li>
              <li>✅ Original packaging must be intact</li>
            </ul>
          </div>

          <div className="border border-gold-200 bg-white p-5 sm:p-6">
            <h2 className="font-display text-xl text-maroon-700 mb-3">How to Exchange</h2>
            <ol className="space-y-3">
              <li><strong>Step 1:</strong> Contact us on WhatsApp: +92-313-8560441</li>
              <li><strong>Step 2:</strong> Share your order details and photos of the bangles</li>
              <li><strong>Step 3:</strong> Tell us the correct size you need</li>
              <li><strong>Step 4:</strong> We'll arrange pickup and send the replacement</li>
            </ol>
          </div>

          <div className="border border-gold-200 bg-white p-5 sm:p-6">
            <h2 className="font-display text-xl text-maroon-700 mb-3">Non-Exchangeable Items</h2>
            <ul className="space-y-2">
              <li>❌ Items that have been worn or used</li>
              <li>❌ Items without original packaging</li>
              <li>❌ Custom or special orders</li>
              <li>❌ Items damaged due to misuse</li>
            </ul>
          </div>

          <div className="bg-maroon-700 text-ivory-100 p-5 sm:p-6">
            <h2 className="font-display text-xl mb-2">Need Help?</h2>
            <p className="text-ivory-300/80 text-sm mb-4">Our team will resolve your issue quickly, InshAllah.</p>
            <a href="https://wa.me/923138560441" target="_blank" rel="noopener noreferrer" className="btn-gold text-sm inline-block">
              WhatsApp: +92-313-8560441
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
