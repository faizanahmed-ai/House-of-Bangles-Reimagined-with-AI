import { Metadata } from 'next'

export const metadata: Metadata = { title: 'FAQs', description: 'Frequently asked questions about House of Bangles.' }

const FAQS = [
  { q: 'Do you ship all over Pakistan?', a: 'Yes! We ship to all cities across Pakistan. Delivery takes 3–5 business days depending on your location.' },
  { q: 'Is there free shipping?', a: 'Yes — free shipping on all orders above Rs. 1,999. Orders below Rs. 1,250 cannot be processed.' },
  { q: 'How do I find my bangle size?', a: 'Measure the circumference of your wrist (the full circle) just below the wrist bone using a soft measuring tape. Our sizes are 2.0", 2.4", 2.6" (most popular), and 2.8". If between sizes, go one size up. Use our Size Guide calculator on the homepage for exact fit.' },
  { q: 'Can I exchange if the size is wrong?', a: 'Yes! We have an exchange policy for size issues. Contact us on WhatsApp (+92-313-8560441) with your order details and we\'ll sort it out quickly.' },
  { q: 'What payment methods do you accept?', a: 'We accept Cash on Delivery (COD), EasyPaisa, JazzCash, and bank transfers. Contact us on WhatsApp for payment details.' },
  { q: 'How many bangles come in a Deal Box?', a: 'Each Deal Box contains 120 bangles (10 dozen) plus additional items like Pearl Karras and Kundan bangles. The Velvet Deal Box (Rs. 3,000) and Metal Deal Box (Rs. 4,000) each let you create 100+ different set combinations.' },
  { q: 'Are your bangles authentic Hyderabadi?', a: 'Yes — 100% authentic. We source directly from master artisans in the old city of Hyderabad. We\'ve been in business for 7+ years with 10,000+ happy customers.' },
  { q: 'Can I order via WhatsApp?', a: 'Absolutely! WhatsApp is actually the easiest way to order. Message us at +92-313-8560441 with the product name, your size, and address.' },
  { q: 'Will my bangles arrive safely?', a: 'Yes! All orders are packed in sturdy white corrugated boxes designed to protect your bangles during transit.' },
  { q: 'Do you do wholesale or bulk orders?', a: 'Yes! Our Deal Boxes are perfect for resellers. For large custom bulk orders, WhatsApp us at +92-313-8560441 to discuss pricing.' },
  { q: 'Do you ship internationally?', a: 'We primarily ship within Pakistan. For international orders, WhatsApp us at +92-313-8560441 to discuss options.' },
  { q: 'How can I track my order?', a: 'Once your order ships, we\'ll send you the tracking number and courier details via WhatsApp or the contact info you provided.' },
]

export default function FAQsPage() {
  return (
    <div className="pt-nav bg-ivory-100 min-h-screen">
      <div className="container-luxury max-w-3xl py-12 sm:py-16">
        <div className="text-center mb-10 sm:mb-14">
          <p className="label-luxury text-gold-600 mb-3">Got Questions?</p>
          <h1 className="font-display text-3xl sm:text-4xl md:text-5xl text-maroon-700">Frequently Asked Questions</h1>
          <div className="divider-gold w-24 mx-auto mt-5" />
        </div>

        <div className="space-y-4">
          {FAQS.map((faq, i) => (
            <div key={i} className="border border-gold-200 bg-white p-5 sm:p-6">
              <h3 className="font-display text-lg text-maroon-700 mb-2">{faq.q}</h3>
              <p className="font-body text-sm text-stone-600 leading-relaxed">{faq.a}</p>
            </div>
          ))}
        </div>

        <div className="mt-10 p-6 bg-maroon-700 text-ivory-100 text-center">
          <p className="font-display text-xl mb-2">Still have questions?</p>
          <p className="font-body text-sm text-ivory-300/80 mb-4">Our team is always happy to help!</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a href="https://wa.me/923138560441" target="_blank" rel="noopener noreferrer" className="btn-gold text-sm">WhatsApp Us</a>
            <a href="https://instagram.com/houseofbanglesx" target="_blank" rel="noopener noreferrer" className="btn-ghost text-ivory-200 border-ivory-300/30 text-sm">Instagram DM</a>
          </div>
        </div>
      </div>
    </div>
  )
}
