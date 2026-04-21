import { Metadata } from 'next'

export const metadata: Metadata = { title: 'Privacy Policy', description: 'Privacy policy for House of Bangles.' }

export default function PrivacyPage() {
  return (
    <div className="pt-nav bg-ivory-100 min-h-screen">
      <div className="container-luxury max-w-3xl py-12 sm:py-16">
        <div className="text-center mb-10">
          <h1 className="font-display text-3xl sm:text-4xl md:text-5xl text-maroon-700">Privacy Policy</h1>
          <p className="font-body text-stone-500 mt-3 text-sm">Last updated: March 2026</p>
          <div className="divider-gold w-24 mx-auto mt-5" />
        </div>
        <div className="space-y-6 font-body text-stone-700 text-sm leading-relaxed">
          {[
            { title: 'Information We Collect', content: 'We collect your name, phone number, address, and order details when you place an order. We may also collect your email if you subscribe to our newsletter.' },
            { title: 'How We Use Your Information', content: 'Your information is used solely to process and deliver your orders, send order updates, and improve our service. We do not sell or share your personal information with third parties.' },
            { title: 'WhatsApp & Social Media', content: 'When you contact us via WhatsApp or Instagram, your messages are subject to those platforms\' privacy policies. We only use this communication to help you with your orders.' },
            { title: 'Data Security', content: 'We take reasonable measures to protect your personal information. However, no method of transmission over the internet is 100% secure.' },
            { title: 'Cookies', content: 'Our website may use basic cookies to improve your browsing experience. You can disable cookies in your browser settings.' },
            { title: 'Contact Us', content: 'For any privacy concerns, contact us at: WhatsApp +92-313-8560441 or Instagram @houseofbanglesx' },
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
