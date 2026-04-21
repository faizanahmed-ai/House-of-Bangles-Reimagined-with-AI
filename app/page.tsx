import Hero from '@/components/Hero'
import ProductGrid from '@/components/ProductGrid'
import BrandStory from '@/components/BrandStory'
import Testimonials from '@/components/Testimonials'
import SizeGuide from '@/components/SizeGuide'

// Tell Next.js to prerender this page statically
export const revalidate = 3600 // revalidate every hour

export default function HomePage() {
  return (
    <>
      <Hero />
      <ProductGrid />
      <BrandStory />
      <Testimonials />
      <SizeGuide />
    </>
  )
}
