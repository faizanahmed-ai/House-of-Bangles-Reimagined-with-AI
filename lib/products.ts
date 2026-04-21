// ─── HOB Product Data — synced from houseofbangles.store ────────────────────

export interface Product {
  id: string
  slug: string
  title: string
  subtitle: string
  price: number
  originalPrice?: number
  image: string
  images?: string[]
  category: 'velvet' | 'kundan' | 'pearl' | 'metal' | 'deals'
  sizes: string[]
  sizeLabels: { value: string; urdu: string }[]
  rating: number
  reviews: number
  badge?: 'new' | 'bestseller' | 'deal' | 'viral'
  description: string
  whatsIn?: string[]
  soldOut?: boolean
}

// Shopify CDN base
const CDN = 'https://www.houseofbangles.store/cdn/shop/files'

export const PRODUCTS: Product[] = [

  // ── DEAL BOXES ─────────────────────────────────────────────────────────────

  {
    id: 'deal-velvet-box',
    slug: 'hobs-special-velvet-deal-box',
    title: "HOB's Special Velvet Deal Box",
    subtitle: '10 dozen glass velvet + pearls + kundan — 100+ set designs',
    price: 3000,
    image: `${CDN}/IMG_6655_400x.jpg?v=1762106118`,
    images: [
      `${CDN}/IMG_6655_1400x.jpg?v=1762106118`,
      `${CDN}/IMG_8593_e4cfe392-c415-405a-acde-8ee426798844_1400x.jpg?v=1762106118`,
      `${CDN}/IMG_8568_1400x.jpg?v=1762106118`,
      `${CDN}/IMG_6653_1400x.jpg?v=1762106118`,
    ],
    category: 'deals',
    sizes: ['2.0', '2.4', '2.6', '2.8'],
    sizeLabels: [
      { value: '2.0', urdu: 'Extra Small (do)' },
      { value: '2.4', urdu: 'Small (Adha pao do)' },
      { value: '2.6', urdu: 'Medium (Sawa do)' },
      { value: '2.8', urdu: 'Large (Dhai)' },
    ],
    rating: 4.9,
    reviews: 200,
    badge: 'bestseller',
    description: 'Our most iconic deal box — everything you need to create 100+ bangle set combinations. A complete Hyderabadi collection in one box.',
    whatsIn: [
      '💎 10 Dozen Glass Velvet Bangles — vibrant, durable, luxurious velvety touch',
      '🤍 1 Pair of Pearl Karras — timeless elegance for traditional outfits',
      '🌸 12 Thin Pearl Bangles — perfect for layering or solo wear',
      '👑 4 Kundan Bangles — regal, intricate, for every special occasion',
    ],
  },

  {
    id: 'deal-metal-box',
    slug: 'hobs-special-metal-deal-box',
    title: "HOB's Special Metal Deal Box",
    subtitle: '10 dozen metal + pearls + kundan — 100+ set designs',
    price: 4000,
    image: `${CDN}/IMG_9501_400x.jpg?v=1763911156`,
    images: [
      `${CDN}/IMG_9501_1400x.jpg?v=1763911156`,
      `${CDN}/IMG_9503_1400x.jpg?v=1763911156`,
      `${CDN}/IMG_9500_1400x.jpg?v=1763911156`,
      `${CDN}/IMG_9498_1400x.jpg?v=1763911156`,
    ],
    category: 'deals',
    sizes: ['2.4', '2.6', '2.8'],
    sizeLabels: [
      { value: '2.4', urdu: 'Small (Adh pa do)' },
      { value: '2.6', urdu: 'Medium (Sawa 2)' },
      { value: '2.8', urdu: 'Large (Dhai)' },
    ],
    rating: 4.9,
    reviews: 200,
    badge: 'deal',
    description: 'The premium metal edition of our legendary deal box. Gleaming metallic shine with pearl and kundan extras — a complete luxury collection.',
    whatsIn: [
      '💍 10 Dozen Metal Bangles — gleaming metallic shine for everyday & festive wear',
      '🕊️ 1 Pair of Pearl Karras — timeless, graceful finishing touch',
      '🌹 12 Slim Pearl Bangles — perfect for stacking or wearing solo',
      '👑 4 Kundan Bangles — regal and intricate for every occasion',
    ],
  },

  {
    id: 'deal-metal-bangles-box',
    slug: 'hobs-special-metal-bangles-box',
    title: "HOB's Special Metal Bangles Box",
    subtitle: '10 dozen metal bangles — 10 vibrant colors',
    price: 2500,
    image: `${CDN}/IMG_1938_400x.jpg?v=1758995422`,
    images: [
      `${CDN}/IMG_1938_1400x.jpg?v=1758995422`,
      `${CDN}/IMG_1958_1400x.jpg?v=1758995737`,
      `${CDN}/IMG_1943_1400x.jpg?v=1758995737`,
    ],
    category: 'deals',
    sizes: ['2.4', '2.6', '2.8'],
    sizeLabels: [
      { value: '2.4', urdu: 'Small (Adh pa do)' },
      { value: '2.6', urdu: 'Medium (Sawa 2)' },
      { value: '2.8', urdu: 'Large (Dhai)' },
    ],
    rating: 4.8,
    reviews: 10,
    badge: 'new',
    description: '120 metal bangles in 10 stunning colors. Polished metallic finish, strong yet lightweight. Perfect for daily wear and festive occasions.',
    whatsIn: [
      '💍 120 Metal Bangles (10 Dozen)',
      '🎨 10 Different Colors — bold, radiant, versatile',
      '✨ Polished Metal Finish — sleek and timeless',
      '🪶 Strong & Lightweight — long-lasting comfort',
    ],
  },

  {
    id: 'deal-velvet-bangles-box',
    slug: 'hobs-special-velvet-bangles-box',
    title: "HOB's Special Velvet Bangles Box",
    subtitle: '10 dozen velvet bangles — 10 vibrant colors',
    price: 1750,
    image: `${CDN}/IMG_1708_400x.jpg?v=1758991337`,
    images: [
      `${CDN}/IMG_1708_1400x.jpg?v=1758991337`,
      `${CDN}/IMG_1727_1400x.jpg?v=1758991338`,
      `${CDN}/IMG_1723_1400x.jpg?v=1758991337`,
      `${CDN}/IMG_1715_1400x.jpg?v=1758991337`,
    ],
    category: 'deals',
    sizes: ['2.4', '2.6', '2.8'],
    sizeLabels: [
      { value: '2.4', urdu: 'Small (Adh pa do)' },
      { value: '2.6', urdu: 'Medium (Sawa 2)' },
      { value: '2.8', urdu: 'Large (Dhai)' },
    ],
    rating: 4.8,
    reviews: 20,
    description: '120 velvet bangles across 10 rich, bold colors. Soft velvet finish, durable and lightweight. Matches every outfit from casual to bridal.',
    whatsIn: [
      '💎 120 Bangles (10 Dozen)',
      '🎨 10 Different Colors — rich, bold, versatile',
      '🧶 Velvet Finish — soft, smooth, premium look',
      '🪶 Durable & Lightweight — long-lasting comfort',
    ],
  },

  // ── VELVET SETS ─────────────────────────────────────────────────────────────

  {
    id: 'velvet-maroon-pearl',
    slug: 'maroon-velvet-pearl-bangles-set',
    title: 'Maroon Velvet Pearl Bangles Set',
    subtitle: 'Pearl-adorned velvet, deep maroon',
    price: 1450,
    image: `${CDN}/IMG_6988_400x.jpg?v=1745410558`,
    category: 'velvet',
    sizes: ['2.4', '2.6', '2.8'],
    sizeLabels: [
      { value: '2.4', urdu: 'Small (Adh pa do)' },
      { value: '2.6', urdu: 'Medium (Sawa 2)' },
      { value: '2.8', urdu: 'Large (Dhai)' },
    ],
    rating: 4.8,
    reviews: 54,
    badge: 'bestseller',
    description: 'Deep maroon velvet bangles adorned with delicate pearl accents. A timeless combination that works for both daily wear and special occasions.',
  },

  {
    id: 'velvet-pink-pearl',
    slug: 'pink-velvet-pearl-bangles-set',
    title: 'Pink Velvet Pearl Bangles Set',
    subtitle: 'Soft pink velvet with pearl detail',
    price: 1450,
    image: `${CDN}/IMG_6984_400x.jpg?v=1745410559`,
    category: 'velvet',
    sizes: ['2.4', '2.6', '2.8'],
    sizeLabels: [
      { value: '2.4', urdu: 'Small (Adh pa do)' },
      { value: '2.6', urdu: 'Medium (Sawa 2)' },
      { value: '2.8', urdu: 'Large (Dhai)' },
    ],
    rating: 4.7,
    reviews: 38,
    badge: 'new',
    description: 'Romantic soft pink velvet with pearl accents. Feminine and elegant — perfect for Eid, weddings, or any celebration.',
  },

  {
    id: 'velvet-red-pearl',
    slug: 'red-velvet-pearl-bangles-set',
    title: 'Red Velvet Pearl Bangles Set',
    subtitle: 'Bold red velvet with pearl border',
    price: 1450,
    image: `${CDN}/IMG_6982_400x.jpg?v=1745410559`,
    category: 'velvet',
    sizes: ['2.4', '2.6', '2.8'],
    sizeLabels: [
      { value: '2.4', urdu: 'Small (Adh pa do)' },
      { value: '2.6', urdu: 'Medium (Sawa 2)' },
      { value: '2.8', urdu: 'Large (Dhai)' },
    ],
    rating: 4.9,
    reviews: 72,
    badge: 'bestseller',
    description: 'Bold and dramatic red velvet with a pearl border trim. A bridal favourite — rich in colour and craftsmanship.',
  },

  {
    id: 'velvet-black-pearl',
    slug: 'black-velvet-pearl-bangles-set',
    title: 'Black Velvet Pearl Bangles Set',
    subtitle: 'Midnight black velvet, pearl finish',
    price: 1450,
    image: `${CDN}/WhatsApp_Image_2025-04-23_at_4.29.26_PM_400x.jpg?v=1745413245`,
    category: 'velvet',
    sizes: ['2.4', '2.6', '2.8'],
    sizeLabels: [
      { value: '2.4', urdu: 'Small (Adh pa do)' },
      { value: '2.6', urdu: 'Medium (Sawa 2)' },
      { value: '2.8', urdu: 'Large (Dhai)' },
    ],
    rating: 4.8,
    reviews: 47,
    description: 'Sleek midnight black velvet with pearl accents. Versatile enough for formal and casual wear — a modern classic.',
  },

  {
    id: 'velvet-yellow-pearl',
    slug: 'yellow-velvet-pearl-bangles-set',
    title: 'Yellow Velvet Pearl Bangles Set',
    subtitle: 'Sunshine yellow velvet, pearl trim',
    price: 1450,
    image: `${CDN}/IMG_6987_400x.jpg?v=1745410559`,
    category: 'velvet',
    sizes: ['2.4', '2.6', '2.8'],
    sizeLabels: [
      { value: '2.4', urdu: 'Small (Adh pa do)' },
      { value: '2.6', urdu: 'Medium (Sawa 2)' },
      { value: '2.8', urdu: 'Large (Dhai)' },
    ],
    rating: 4.7,
    reviews: 29,
    description: 'Bright sunshine yellow velvet with pearl detailing. Perfect for spring and summer occasions — cheerful and eye-catching.',
  },

  // ── KUNDAN SETS ─────────────────────────────────────────────────────────────

  {
    id: 'kundan-white-velvet',
    slug: 'white-velvet-kundan-bangles-set',
    title: 'White Velvet Kundan Bangles Set',
    subtitle: 'Pristine white velvet with kundan stones',
    price: 1150,
    image: `${CDN}/IMG_7933_400x.jpg?v=1753005121`,
    category: 'kundan',
    sizes: ['2.4', '2.6', '2.8'],
    sizeLabels: [
      { value: '2.4', urdu: 'Small (Adh pa do)' },
      { value: '2.6', urdu: 'Medium (Sawa 2)' },
      { value: '2.8', urdu: 'Large (Dhai)' },
    ],
    rating: 4.8,
    reviews: 33,
    description: 'Crisp white velvet base with intricate kundan stonework. Bridal-worthy and beautiful — pairs perfectly with any colour outfit.',
  },

  {
    id: 'kundan-black-velvet',
    slug: 'black-velvet-kundan-bangles-set',
    title: 'Black Velvet Kundan Bangles Set',
    subtitle: 'Black velvet with gold kundan inlay',
    price: 1150,
    image: `${CDN}/IMG_7951_400x.jpg?v=1753005121`,
    category: 'kundan',
    sizes: ['2.4', '2.6', '2.8'],
    sizeLabels: [
      { value: '2.4', urdu: 'Small (Adh pa do)' },
      { value: '2.6', urdu: 'Medium (Sawa 2)' },
      { value: '2.8', urdu: 'Large (Dhai)' },
    ],
    rating: 4.9,
    reviews: 58,
    badge: 'bestseller',
    description: 'Dramatic black velvet with gold kundan inlay. A showstopper at any event — the contrast of black and gold is simply stunning.',
  },

  {
    id: 'kundan-maroon-velvet',
    slug: 'maroon-velvet-kundan-bangles-set',
    title: 'Maroon Velvet Kundan Bangles Set',
    subtitle: 'Rich maroon with kundan stonework',
    price: 1150,
    image: `${CDN}/IMG_7939_400x.jpg?v=1753005120`,
    category: 'kundan',
    sizes: ['2.4', '2.6', '2.8'],
    sizeLabels: [
      { value: '2.4', urdu: 'Small (Adh pa do)' },
      { value: '2.6', urdu: 'Medium (Sawa 2)' },
      { value: '2.8', urdu: 'Large (Dhai)' },
    ],
    rating: 4.7,
    reviews: 41,
    description: 'Rich maroon velvet studded with intricate kundan stones. Heritage at its finest — a nod to the grandeur of Hyderabadi craft.',
  },

  // ── PEARL SETS ──────────────────────────────────────────────────────────────

  {
    id: 'pearl-hania-amir',
    slug: 'hania-amir-inspired-pearl-bangles',
    title: 'Hania Amir Inspired Pearl Bangles',
    subtitle: 'Viral Look — thin pearl bangles set',
    price: 700,
    image: `${CDN}/IMG_0871_400x.jpg?v=1752932705`,
    category: 'pearl',
    sizes: ['2.4', '2.6', '2.8'],
    sizeLabels: [
      { value: '2.4', urdu: 'Small (Adh pa do)' },
      { value: '2.6', urdu: 'Medium (Sawa 2)' },
      { value: '2.8', urdu: 'Large (Dhai)' },
    ],
    rating: 4.9,
    reviews: 180,
    badge: 'viral',
    description: 'The viral look that took Instagram by storm. Delicate thin pearl bangles inspired by Hania Amir\'s iconic style. Stack them up for maximum effect.',
  },

  {
    id: 'pearl-triple-karra',
    slug: 'all-pearl-triple-karra-set',
    title: 'All Pearl Triple Karra Set',
    subtitle: '3 pearl karras — timeless elegance',
    price: 1750,
    image: `${CDN}/IMG_8537_400x.jpg?v=1753466413`,
    category: 'pearl',
    sizes: ['2.4', '2.6', '2.8'],
    sizeLabels: [
      { value: '2.4', urdu: 'Small (Adh pa do)' },
      { value: '2.6', urdu: 'Medium (Sawa 2)' },
      { value: '2.8', urdu: 'Large (Dhai)' },
    ],
    rating: 4.8,
    reviews: 62,
    badge: 'new',
    description: 'A set of three full pearl karras — heavy, luxurious, and timelessly beautiful. The ultimate traditional bridal accessory.',
  },

  {
    id: 'pearl-kara-pair',
    slug: 'pearl-kare-1-pair',
    title: 'Pearl Kara — 1 Pair',
    subtitle: 'Classic pearl kara, sold as a pair',
    price: 600,
    image: `${CDN}/WhatsAppImage2025-01-28at4.45.15PM_400x.jpg?v=1745235817`,
    category: 'pearl',
    sizes: ['2.4', '2.6', '2.8'],
    sizeLabels: [
      { value: '2.4', urdu: 'Small (Adh pa do)' },
      { value: '2.6', urdu: 'Medium (Sawa 2)' },
      { value: '2.8', urdu: 'Large (Dhai)' },
    ],
    rating: 4.7,
    reviews: 95,
    description: 'A classic pair of pearl karras. Simple, elegant, and versatile — works with casual and formal wear alike.',
  },

  // ── METAL ───────────────────────────────────────────────────────────────────

  {
    id: 'metal-silver-gajra',
    slug: 'silver-gajra-metal-bangles-set',
    title: 'Silver Gajra Metal Bangles Set',
    subtitle: 'Intricate gajra pattern, silver finish',
    price: 1650,
    image: `${CDN}/IMG_4374_400x.jpg?v=1763911523`,
    category: 'metal',
    sizes: ['2.4', '2.6', '2.8'],
    sizeLabels: [
      { value: '2.4', urdu: 'Small (Adh pa do)' },
      { value: '2.6', urdu: 'Medium (Sawa 2)' },
      { value: '2.8', urdu: 'Large (Dhai)' },
    ],
    rating: 4.8,
    reviews: 44,
    soldOut: true,
    description: 'Intricate gajra (flower garland) pattern on a polished silver metal bangle. A stunning piece that bridges traditional and contemporary aesthetics.',
  },

  {
    id: 'metal-golden-glass',
    slug: 'golden-glass-bangles-dozen',
    title: 'Golden Glass Bangles (Dozen)',
    subtitle: '12 golden glass bangles',
    price: 250,
    image: `${CDN}/IMG_7894_fb06e911-cf76-4e15-84ce-33ebb4d064fc_400x.jpg?v=1752836123`,
    category: 'metal',
    sizes: ['2.4', '2.6', '2.8'],
    sizeLabels: [
      { value: '2.4', urdu: 'Small (Adh pa do)' },
      { value: '2.6', urdu: 'Medium (Sawa 2)' },
      { value: '2.8', urdu: 'Large (Dhai)' },
    ],
    rating: 4.5,
    reviews: 28,
    description: 'A dozen classic golden glass bangles. Perfect for layering with other sets or wearing on their own for everyday elegance.',
  },

  {
    id: 'metal-silver-glass',
    slug: 'silver-glass-bangles-dozen',
    title: 'Silver Glass Bangles (Dozen)',
    subtitle: '12 silver glass bangles',
    price: 250,
    image: `${CDN}/IMG_7896_400x.jpg?v=1752836024`,
    category: 'metal',
    sizes: ['2.4', '2.6', '2.8'],
    sizeLabels: [
      { value: '2.4', urdu: 'Small (Adh pa do)' },
      { value: '2.6', urdu: 'Medium (Sawa 2)' },
      { value: '2.8', urdu: 'Large (Dhai)' },
    ],
    rating: 4.5,
    reviews: 31,
    description: 'A dozen classic silver glass bangles. Timeless, versatile, and perfect for building layered sets.',
  },
]

export const FILTERS = [
  { id: 'all',    label: 'All' },
  { id: 'deals',  label: 'Deal Boxes' },
  { id: 'velvet', label: 'Velvet' },
  { id: 'kundan', label: 'Kundan' },
  { id: 'pearl',  label: 'Pearl' },
  { id: 'metal',  label: 'Metal' },
]
