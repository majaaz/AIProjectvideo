'use client'

import { useState, useEffect, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import { ProductCard } from '@/components/ProductCard'
import { Product } from '@/types'
import { Filter, X } from 'lucide-react'

function SearchContent() {
  const searchParams = useSearchParams()
  const initialQuery = searchParams.get('q') || ''
  const initialCategory = searchParams.get('category') || ''
  const initialSort = searchParams.get('sort') || 'relevance'

  const [query, setQuery] = useState(initialQuery)
  const [products, setProducts] = useState<Product[]>([])
  const [categories, setCategories] = useState<{ id: string; name: string; slug: string }[]>([])
  const [loading, setLoading] = useState(true)
  const [showFilters, setShowFilters] = useState(false)

  // Filter states
  const [category, setCategory] = useState(initialCategory)
  const [minPrice, setMinPrice] = useState('')
  const [maxPrice, setMaxPrice] = useState('')
  const [minRating, setMinRating] = useState(0)
  const [freeShipping, setFreeShipping] = useState(false)
  const [sort, setSort] = useState(initialSort)

  useEffect(() => {
    fetchCategories()
  }, [])

  useEffect(() => {
    fetchProducts()
  }, [query, category, minPrice, maxPrice, minRating, freeShipping, sort])

  const fetchCategories = async () => {
    // In production, fetch from Supabase
    setCategories([
      { id: '1', name: 'Electronics', slug: 'electronics' },
      { id: '2', name: 'Fashion', slug: 'fashion' },
      { id: '3', name: 'Home & Kitchen', slug: 'home' },
      { id: '4', name: 'Sports', slug: 'sports' },
      { id: '5', name: 'Books', slug: 'books' },
      { id: '6', name: 'Toys & Games', slug: 'toys' },
    ])
  }

  const fetchProducts = async () => {
    setLoading(true)
    // Mock products - in production, fetch from Supabase
    const mockProducts: Product[] = [
      {
        id: '1',
        title: 'Wireless Noise-Canceling Headphones',
        description: 'Premium sound quality',
        price: 199.99,
        compare_price: 249.99,
        images: ['https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400'],
        category_id: '1',
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
        description: 'Advanced fitness tracking',
        price: 349.99,
        compare_price: 399.99,
        images: ['https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400'],
        category_id: '1',
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
        description: 'Waterproof',
        price: 79.99,
        compare_price: 99.99,
        images: ['https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=400'],
        category_id: '1',
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
        description: 'Stunning picture quality',
        price: 599.99,
        compare_price: 799.99,
        images: ['https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=400'],
        category_id: '1',
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
        description: 'High-precision sensor',
        price: 69.99,
        compare_price: 89.99,
        images: ['https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=400'],
        category_id: '1',
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
        description: 'Cherry MX switches',
        price: 129.99,
        compare_price: 159.99,
        images: ['https://images.unsplash.com/photo-1511467687858-23d96c32e4ae?w=400'],
        category_id: '1',
        seller_id: null,
        stock_quantity: 40,
        sku: 'KB-MECH-01',
        rating: 4.6,
        review_count: 789,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      },
    ]

    // Apply filters
    let filtered = mockProducts.filter(p => {
      if (query && !p.title.toLowerCase().includes(query.toLowerCase())) return false
      if (category && p.category_id !== category) return false
      if (minPrice && p.price < parseFloat(minPrice)) return false
      if (maxPrice && p.price > parseFloat(maxPrice)) return false
      if (minRating > 0 && p.rating < minRating) return false
      return true
    })

    // Apply sorting
    switch (sort) {
      case 'price-low':
        filtered.sort((a, b) => a.price - b.price)
        break
      case 'price-high':
        filtered.sort((a, b) => b.price - a.price)
        break
      case 'rating':
        filtered.sort((a, b) => b.rating - a.rating)
        break
      case 'newest':
        filtered.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
        break
    }

    setProducts(filtered)
    setLoading(false)
  }

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    fetchProducts()
  }

  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Search Header */}
        <div className="bg-white p-4 rounded-sm border border-gray-200 mb-6">
          <form onSubmit={handleSearch} className="flex gap-2">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search for products..."
              className="flex-1 px-4 py-2 border border-gray-300 rounded-sm focus:outline-none focus:border-amazon-orange"
            />
            <button type="submit" className="amazon-btn-primary">
              Search
            </button>
          </form>
        </div>

        <div className="flex gap-6">
          {/* Filters Sidebar */}
          <aside className={`${showFilters ? 'block' : 'hidden'} md:block w-64 flex-shrink-0`}>
            <div className="bg-white p-4 rounded-sm border border-gray-200 sticky top-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold flex items-center">
                  <Filter className="w-4 h-4 mr-2" />
                  Filters
                </h3>
                <button
                  onClick={() => setShowFilters(false)}
                  className="md:hidden"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Category Filter */}
              <div className="mb-4">
                <h4 className="font-semibold text-sm mb-2">Category</h4>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-sm text-sm"
                >
                  <option value="">All Categories</option>
                  {categories.map((cat) => (
                    <option key={cat.id} value={cat.id}>
                      {cat.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Price Range */}
              <div className="mb-4">
                <h4 className="font-semibold text-sm mb-2">Price Range</h4>
                <div className="flex gap-2">
                  <input
                    type="number"
                    placeholder="Min"
                    value={minPrice}
                    onChange={(e) => setMinPrice(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-sm text-sm"
                  />
                  <input
                    type="number"
                    placeholder="Max"
                    value={maxPrice}
                    onChange={(e) => setMaxPrice(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-sm text-sm"
                  />
                </div>
              </div>

              {/* Rating Filter */}
              <div className="mb-4">
                <h4 className="font-semibold text-sm mb-2">Rating</h4>
                {[4, 3, 2, 1].map((rating) => (
                  <label key={rating} className="flex items-center mb-1 cursor-pointer">
                    <input
                      type="radio"
                      name="rating"
                      checked={minRating === rating}
                      onChange={() => setMinRating(rating)}
                      className="mr-2"
                    />
                    <span className="text-sm">{rating} & up</span>
                  </label>
                ))}
              </div>

              {/* Free Shipping */}
              <div className="mb-4">
                <label className="flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={freeShipping}
                    onChange={(e) => setFreeShipping(e.target.checked)}
                    className="mr-2"
                  />
                  <span className="text-sm">Free Shipping</span>
                </label>
              </div>

              <button
                onClick={() => {
                  setCategory('')
                  setMinPrice('')
                  setMaxPrice('')
                  setMinRating(0)
                  setFreeShipping(false)
                }}
                className="text-sm text-amazon-orange hover:underline"
              >
                Clear all filters
              </button>
            </div>
          </aside>

          {/* Results */}
          <div className="flex-1">
            {/* Sort and Results Count */}
            <div className="bg-white p-4 rounded-sm border border-gray-200 mb-4 flex flex-wrap items-center justify-between gap-4">
              <p className="text-sm text-gray-600">
                {loading ? 'Loading...' : `${products.length} results for "${query || 'All Products'}"`}
              </p>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setShowFilters(true)}
                  className="md:hidden amazon-btn-secondary text-sm"
                >
                  <Filter className="w-4 h-4 mr-1" />
                  Filters
                </button>
                <select
                  value={sort}
                  onChange={(e) => setSort(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-sm text-sm"
                >
                  <option value="relevance">Relevance</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="rating">Customer Rating</option>
                  <option value="newest">Newest Arrivals</option>
                </select>
              </div>
            </div>

            {/* Product Grid */}
            {loading ? (
              <div className="text-center py-12">Loading...</div>
            ) : products.length === 0 ? (
              <div className="text-center py-12 bg-white rounded-sm border border-gray-200">
                <p className="text-gray-600">No products found matching your criteria.</p>
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {products.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default function SearchPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SearchContent />
    </Suspense>
  )
}
