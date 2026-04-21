import type { Metadata, Viewport } from 'next'
import './globals.css'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import Providers from '@/components/Providers'
import CustomCursor from '@/components/CustomCursor'
import AmbientParticles from '@/components/AmbientParticles'
import CartDrawer from '@/components/CartDrawer'
import AIChatBot from '@/components/AIChatBot'
import { Toaster } from 'react-hot-toast'

export const metadata: Metadata = {
  title: {
    default: 'House of Bangles — Authentic Hyderabadi Bangles',
    template: '%s | House of Bangles',
  },
  description:
    'Discover the finest Hyderabadi bangles — velvet, kundan, and pearl designs crafted with heritage and elegance. Free shipping across Pakistan above Rs. 1,999.',
  keywords: [
    'Hyderabadi bangles', 'velvet bangles', 'kundan bangles', 'pearl bangles',
    'Pakistani jewelry', 'bangles online', 'House of Bangles',
    'bangles Pakistan', 'traditional jewelry',
  ],
  authors: [{ name: 'House of Bangles' }],
  creator: 'House of Bangles',
  openGraph: {
    type: 'website',
    locale: 'en_PK',
    url: 'https://houseofbangles.store',
    siteName: 'House of Bangles',
    title: 'House of Bangles — Authentic Hyderabadi Bangles',
    description: 'Discover the finest Hyderabadi bangles crafted with heritage and elegance.',
    images: [{ url: '/og-image.jpg', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'House of Bangles',
    description: 'Authentic Hyderabadi bangles shipped across Pakistan.',
    images: ['/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
}

export const viewport: Viewport = {
  themeColor: '#8b1a1a',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400;1,500;1,600&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;1,9..40,300;1,9..40,400&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="grain-overlay antialiased">
        <Providers>
          <CustomCursor />
          <AmbientParticles />
          <Navbar />
          <CartDrawer />
          <AIChatBot />
          <Toaster
            position="bottom-center"
            toastOptions={{
              duration: 2500,
              style: {
                background: '#4a0e0e',
                color: '#fdf9ed',
                fontFamily: "'DM Sans', sans-serif",
                fontSize: '13px',
                borderRadius: '0',
                border: '1px solid rgba(212,168,67,0.3)',
              },
              success: {
                iconTheme: { primary: '#d4a843', secondary: '#4a0e0e' },
              },
            }}
          />
          <main className="min-h-screen">
            {children}
          </main>
          <Footer />
        </Providers>
      </body>
    </html>
  )
}
