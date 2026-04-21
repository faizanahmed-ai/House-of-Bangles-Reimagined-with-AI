import { Metadata } from 'next'

export const metadata: Metadata = { title: 'Terms of Service', description: 'Terms of service for House of Bangles.' }

export default function TermsPage() {
  return (
    <div className="pt-nav bg-ivory-100 min-h-screen">
      <div className="container-luxury max-w-3xl py-12 sm:py-16">
        <div className="text-center mb-10">
          <h1 className="font-display text-3xl sm:text-4xl md:text-5xl text-maroon-700">Terms of Service</h1>
          <p className="font-body text-stone-500 mt-3 text-sm">Last updated: March 2026</p>
          <div className="divider-gold w-24 mx-auto mt-5" />
        </div>
        <div className="space-y-6 font-body text-stone-700 text-sm leading-relaxed">
          {[
            { title: 'Acceptance of Terms', content: 'By placing an order or using our website, you agree to these terms of service. If you do not agree, please do not use our services.' },
            { title: 'Products & Pricing', content: 'All prices are listed in Pakistani Rupees (PKR). Prices are subject to change without notice. Product images are for illustration purposes — actual colors may vary slightly due to screen settings and lighting.' },
            { title: 'Orders & Payment', content: 'Orders are confirmed upon receipt of payment or COD agreement. We reserve the right to cancel orders that cannot be fulfilled. Minimum order amount is Rs. 1,250.' },
            { title: 'Shipping & Delivery', content: 'We aim to deliver within 3–5 business days. Delivery times may vary due to courier delays or remote locations. We are not responsible for delays caused by courier partners.' },
            { title: 'Exchange Policy', content: 'Exchanges are accepted for size issues within 7 days of delivery. Items must be in original, unworn condition. We do not accept returns for change of mind.' },
            { title: 'Intellectual Property', content: 'All content on this website including images, text, and designs are the property of House of Bangles. Unauthorized use is prohibited.' },
            { title: 'Contact', content: 'For any questions about these terms: WhatsApp +92-313-8560441 or Instagram @houseofbanglesx' },
          ].map(({ title, content }) => (
            <div key={title} className="border border-gold-200 bg-white p-5 sm:p-6">
              <h2 className="font-display text-lg text-maroon-700 mb-2">{title}</h2>
              <p>{content}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
