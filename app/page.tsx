import { supabase } from '@/lib/supabase'
import { HeroCarousel, ProductCard, CategoryGrid, DealsOfTheDay } from '@/components/ProductCard'
import Link from 'next/link'

// Mock data for when Supabase is not configured
const mockCategories = [
  { id: '1', name: 'Electronics', slug: 'electronics', image_url: 'https://images.unsplash.com/photo-1498049794561-7780e7231661?w=200' },
  { id: '2', name: 'Fashion', slug: 'fashion', image_url: 'https://images.unsplash.com/photo-1445205170230-053b83016050?w=200' },
  { id: '3', name: 'Home & Kitchen', slug: 'home', image_url: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=200' },
  { id: '4', name: 'Sports', slug: 'sports', image_url: 'https://images.unsplash.com/photo-1517686469429-8bdb88b9f907?w=200' },
  { id: '5', name: 'Books', slug: 'books', image_url: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=200' },
  { id: '6', name: 'Toys & Games', slug: 'toys', image_url: 'https://images.unsplash.com/photo-1558060370-d644479cb6f7?w=200' },
]

const mockProducts = [
  {
    id: '1',
    title: 'Wireless Noise-Canceling Headphones',
    description: 'Premium sound quality with active noise cancellation',
    price: 199.99,
    compare_price: 249.99,
    images: ['https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400'],
    category_id: null,
    seller_id: null,
    stock_quantity: 50,
    sku: 'WH-1000XM4',
    rating: 4.5,
    review_count: 1234,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: '2',
    title: 'Smart Watch Pro',
    description: 'Advanced fitness tracking and notifications',
    price: 349.99,
    compare_price: 399.99,
    images: ['https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400'],
    category_id: null,
    seller_id: null,
    stock_quantity: 30,
    sku: 'SW-PRO-001',
    rating: 4.7,
    review_count: 856,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: '3',
    title: 'Portable Bluetooth Speaker',
    description: 'Waterproof with 20-hour battery life',
    price: 79.99,
    compare_price: 99.99,
    images: ['https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=400'],
    category_id: null,
    seller_id: null,
    stock_quantity: 100,
    sku: 'BT-SPK-01',
    rating: 4.3,
    review_count: 567,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: '4',
    title: '4K Ultra HD Smart TV 55"',
    description: 'Stunning picture quality with smart features',
    price: 599.99,
    compare_price: 799.99,
    images: ['https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=400'],
    category_id: null,
    seller_id: null,
    stock_quantity: 15,
    sku: 'TV-55-4K',
    rating: 4.8,
    review_count: 2341,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: '5',
    title: 'Wireless Gaming Mouse',
    description: 'High-precision sensor with customizable RGB',
    price: 69.99,
    compare_price: 89.99,
    images: ['https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=400'],
    category_id: null,
    seller_id: null,
    stock_quantity: 75,
    sku: 'GM-WIRE-01',
    rating: 4.4,
    review_count: 432,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: '6',
    title: 'Mechanical Keyboard RGB',
    description: 'Cherry MX switches with per-key RGB',
    price: 129.99,
    compare_price: 159.99,
    images: ['https://images.unsplash.com/photo-1511467687858-23d96c32e4ae?w=400'],
    category_id: null,
    seller_id: null,
    stock_quantity: 40,
    sku: 'KB-MECH-01',
    rating: 4.6,
    review_count: 789,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
]

export const dynamic = 'force-dynamic'

export default async function HomePage() {
  let categories = mockCategories
  let products = mockProducts

  // Try to fetch from Supabase
  try {
    if (supabase) {
      const { data: categoryData } = await supabase
        .from('categories')
        .select('*')
        .limit(6)

      if (categoryData && categoryData.length > 0) {
        categories = categoryData
      }

      const { data: productData } = await supabase
        .from('products')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(12)

      if (productData && productData.length > 0) {
        products = productData
      }
    }
  } catch (error) {
    console.log('Using mock data - Supabase not configured')
  }

  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 py-6 space-y-6">
        {/* Hero Carousel */}
        <HeroCarousel deals={products} />

        {/* Category Grid */}
        <section>
          <h2 className="text-xl font-bold mb-4">Shop by Category</h2>
          <CategoryGrid categories={categories} />
        </section>

        {/* Featured Products */}
        <section className="bg-white p-6 rounded-sm border border-gray-200">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold">Featured Products</h2>
            <Link href="/search" className="text-sm text-amazon-orange hover:underline">
              See more →
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>

        {/* Deals of the Day */}
        <DealsOfTheDay products={products} />

        {/* Recently Viewed (placeholder) */}
        <section className="bg-white p-6 rounded-sm border border-gray-200">
          <h2 className="text-xl font-bold mb-4">Recently Viewed</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {products.slice(0, 6).map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}
