'use client'

import { useState, useEffect, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import { ProductCard } from '@/components/ProductCard'
import { Product } from '@/types'
import { Filter, X, Search, ChevronRight, SlidersHorizontal, Package, Sparkles } from 'lucide-react'
import { supabase } from '@/lib/supabase'
import { motion, AnimatePresence } from 'framer-motion'

function SearchContent() {
  const searchParams = useSearchParams()
  const initialQuery = searchParams.get('q') || ''
  const initialCategory = searchParams.get('category') || ''
  const initialSort = searchParams.get('sort') || 'newest'

  const [query, setQuery] = useState(initialQuery)
  const [products, setProducts] = useState<Product[]>([])
  const [categories, setCategories] = useState<string[]>([])
  const [loading, setLoading] = useState(true)
  const [showFilters, setShowFilters] = useState(false)

  // Filter states
  const [category, setCategory] = useState(initialCategory)
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 2000])
  const [minRating, setMinRating] = useState(0)
  const [sort, setSort] = useState(initialSort)

  useEffect(() => {
    fetchProducts()
    fetchMetadata()
  }, [query, category, priceRange, minRating, sort])

  const fetchMetadata = async () => {
    if (!supabase) return
    const { data } = await supabase.from('products').select('category')
    if (data) {
      const uniqueCats = Array.from(new Set(data.map(p => p.category)))
      setCategories(uniqueCats)
    }
  }

  const fetchProducts = async () => {
    setLoading(true)
    if (!supabase) return

    let orbit = supabase.from('products').select('*')

    if (query) orbit = orbit.ilike('name', `%${query}%`)
    if (category) orbit = orbit.eq('category', category)
    if (minRating > 0) orbit = orbit.gte('rating', minRating)
    
    orbit = orbit.gte('price', priceRange[0]).lte('price', priceRange[1])

    // Apply sorting
    switch (sort) {
      case 'price-low': orbit = orbit.order('price', { ascending: true }); break
      case 'price-high': orbit = orbit.order('price', { ascending: false }); break
      case 'rating': orbit = orbit.order('rating', { ascending: false }); break
      default: orbit = orbit.order('created_at', { ascending: false }); break
    }

    const { data, error } = await orbit

    if (error) {
      console.error('Error fetching products:', error)
    } else {
      setProducts(data as Product[])
    }
    setLoading(false)
  }

  return (
    <div className="bg-[#F6F9FC] min-h-screen pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-6">
        {/* Search & Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="max-w-xl flex-1">
            <h1 className="text-4xl font-bold text-slate-900 tracking-tight mb-4 flex items-center">
              Explore Products
              <Sparkles className="w-6 h-6 ml-3 text-stripe-blurple opacity-50" />
            </h1>
            <div className="relative group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-stripe-blurple transition-colors" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search premium goods..."
                className="w-full pl-12 pr-4 py-4 bg-white border border-white shadow-sm rounded-2xl focus:outline-none focus:ring-4 focus:ring-stripe-blurple/5 focus:border-stripe-blurple/20 transition-all text-slate-600 font-medium"
              />
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center bg-white border border-white shadow-sm p-1 rounded-2xl">
              <button 
                onClick={() => setSort('newest')}
                className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-widest transition-all ${sort === 'newest' ? 'bg-slate-900 text-white shadow-md' : 'text-slate-400 hover:text-slate-600'}`}
              >Newest</button>
              <button 
                onClick={() => setSort('price-low')}
                className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-widest transition-all ${sort === 'price-low' ? 'bg-slate-900 text-white shadow-md' : 'text-slate-400 hover:text-slate-600'}`}
              >Price</button>
              <button 
                onClick={() => setSort('rating')}
                className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-widest transition-all ${sort === 'rating' ? 'bg-slate-900 text-white shadow-md' : 'text-slate-400 hover:text-slate-600'}`}
              >Rating</button>
            </div>
            
            <button 
              onClick={() => setShowFilters(!showFilters)}
              className="md:hidden p-4 bg-white border border-white shadow-sm rounded-2xl text-slate-600"
            >
              <SlidersHorizontal className="w-6 h-6" />
            </button>
          </div>
        </div>

        <div className="flex gap-12">
          {/* Desktop Sidebar Filters */}
          <aside className="hidden md:block w-72 flex-shrink-0 space-y-10">
            <div>
              <h3 className="text-sm font-bold text-slate-900 uppercase tracking-widest mb-6 flex items-center">
                <Package className="w-4 h-4 mr-2 text-stripe-blurple" />
                Categories
              </h3>
              <div className="space-y-2">
                <button 
                  onClick={() => setCategory('')}
                  className={`w-full text-left px-4 py-3 rounded-2xl text-sm font-medium transition-all ${!category ? 'bg-white shadow-sm border border-white text-stripe-blurple' : 'text-slate-500 hover:text-slate-900'}`}
                >
                  All Products
                </button>
                {categories.map((cat) => (
                  <button 
                    key={cat}
                    onClick={() => setCategory(cat)}
                    className={`w-full text-left px-4 py-3 rounded-2xl text-sm font-medium transition-all ${category === cat ? 'bg-white shadow-sm border border-white text-stripe-blurple' : 'text-slate-500 hover:text-slate-900'}`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-sm font-bold text-slate-900 uppercase tracking-widest mb-6">Price Range</h3>
              <div className="px-2">
                <input 
                  type="range" 
                  min="0" 
                  max="2000" 
                  step="50"
                  value={priceRange[1]}
                  onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                  className="w-full accent-stripe-blurple h-1 bg-slate-200 rounded-lg appearance-none cursor-pointer"
                />
                <div className="flex justify-between mt-4 text-xs font-bold text-slate-400">
                  <span>$0</span>
                  <span className="text-stripe-blurple">${priceRange[1]}</span>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-sm font-bold text-slate-900 uppercase tracking-widest mb-6">Minimum Rating</h3>
              <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    onClick={() => setMinRating(star)}
                    className={`w-10 h-10 rounded-xl flex items-center justify-center border-2 transition-all ${minRating === star ? 'border-amber-400 bg-amber-50 text-amber-600' : 'border-white bg-white text-slate-300 hover:border-slate-100'}`}
                  >
                    {star}
                  </button>
                ))}
              </div>
            </div>
          </aside>

          {/* Results Grid */}
          <main className="flex-1">
            {loading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <div key={i} className="aspect-[4/5] bg-white border border-white rounded-[2rem] animate-pulse" />
                ))}
              </div>
            ) : products.length === 0 ? (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex flex-col items-center justify-center py-32 bg-white rounded-[3rem] border border-white shadow-inner"
              >
                <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mb-6">
                  <Search className="w-8 h-8 text-slate-300" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">No items found</h3>
                <p className="text-slate-500 max-w-xs text-center">Try adjusting your filters or search terms for better results.</p>
                <button 
                  onClick={() => { setQuery(''); setCategory(''); setPriceRange([0, 2000]); setMinRating(0); }}
                  className="mt-8 text-sm font-bold text-stripe-blurple hover:underline underline-offset-8"
                >
                  Clear all filters
                </button>
              </motion.div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                <AnimatePresence mode="popLayout">
                  {products.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </AnimatePresence>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  )
}

export default function SearchPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-[#F6F9FC] pt-24 flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-stripe-blurple border-t-transparent rounded-full animate-spin" />
      </div>
    }>
      <SearchContent />
    </Suspense>
  )
}
