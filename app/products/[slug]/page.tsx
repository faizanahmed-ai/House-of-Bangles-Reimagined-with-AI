import { notFound } from 'next/navigation'
import { Metadata } from 'next'
import ProductDetailClient from './ProductDetailClient'
import { PRODUCTS } from '@/lib/products'

interface Props {
  params: { slug: string }
}

export async function generateStaticParams() {
  return PRODUCTS.map(p => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const product = PRODUCTS.find(p => p.slug === params.slug)
  if (!product) return { title: 'Not Found' }
  return {
    title: product.title,
    description: product.description,
  }
}

export default function ProductPage({ params }: Props) {
  const product = PRODUCTS.find(p => p.slug === params.slug)
  if (!product) notFound()

  // Related products — same category, different id
  const related = PRODUCTS.filter(p => p.category === product.category && p.id !== product.id).slice(0, 3)

  return <ProductDetailClient product={product} related={related} />
}
