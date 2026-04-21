import { Metadata } from 'next'
import ProductGrid from '@/components/ProductGrid'

export const metadata: Metadata = {
  title: 'Collection',
  description: 'Browse our full collection of authentic Hyderabadi bangles.',
}

export default function ProductsPage() {
  return (
    <div className="pt-nav">
      <div className="bg-maroon-900 py-16 text-center">
        <p className="label-luxury text-gold-400 mb-3 tracking-[0.35em]">Explore</p>
        <h1 className="font-display text-4xl md:text-5xl text-ivory-100">Our Collection</h1>
        <div className="h-px w-20 bg-gradient-to-r from-transparent via-gold-400 to-transparent mx-auto mt-5" />
      </div>
      <ProductGrid />
    </div>
  )
}
