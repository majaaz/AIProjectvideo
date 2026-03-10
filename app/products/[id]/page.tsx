'use client'

import { useState, useEffect, use } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useCart } from '@/context/CartContext'
import { Product, Review } from '@/types'
import { Star, Truck, Shield, ArrowLeft, Heart, ChevronRight } from 'lucide-react'

interface ProductPageProps {
  params: Promise<{ id: string }>
}

export default function ProductPage({ params }: ProductPageProps) {
  const resolvedParams = use(params)
  const { addItem } = useCart()

  const [mouseX, setMouseX] = useState(0)
  const [mouseY, setMouseY] = useState(0)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMouseX((e.clientX / window.innerWidth - 0.5) * 20)
      setMouseY((e.clientY / window.innerHeight - 0.5) * 20)
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  const fetchProduct = async () => {
    setLoading(true)
    if (supabase) {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('id', resolvedParams.id)
        .single()
      
      if (data) {
        setProduct(data as Product)
        setLoading(false)
        return
      }
    }

    // Fallback Mock product data
    const mockProduct: Product = {
      id: resolvedParams.id,
      title: 'Wireless Noise-Canceling Headphones',
      description: 'Experience immersive audio with our premium wireless headphones. Featuring advanced active noise cancellation and premium comfort for all-day listening.',
      price: 199.99,
      compare_price: 249.99,
      images: [
        'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800',
      ],
      category_id: '1',
      seller_id: '1',
      stock_quantity: 50,
      sku: 'WH-1000XM4',
      rating: 4.5,
      review_count: 1234,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    }

    setProduct(mockProduct)
    setLoading(false)
  }

  const fetchReviews = async () => {
    if (supabase) {
       const { data } = await supabase
         .from('messages') // Assuming reviews might be in a different table or messages
         .select('*')
         .eq('conversation_id', resolvedParams.id) // This is just a placeholder logic check
    }

    // Mock reviews
    const mockReviews: Review[] = [
      {
        id: '1',
        product_id: resolvedParams.id,
        user_id: '1',
        rating: 5,
        comment: 'Amazing sound quality! The 3D view is so cool.',
        created_at: new Date(Date.now() - 86400000 * 5).toISOString(),
        users: { id: '1', email: 'user1@example.com', full_name: 'John D.', avatar_url: null, role: 'customer', created_at: '' },
      },
    ]
    setReviews(mockReviews)
  }

  const handleAddToCart = () => {
    if (product) {
      addItem(product, quantity)
    }
  }

  if (loading) {
    return (
      <div className="bg-[#F6F9FC] min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-stripe-blurple border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-slate-500 font-medium">Preparing experience...</p>
        </div>
      </div>
    )
  }

  if (!product) {
    return (
      <div className="bg-[#F6F9FC] min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-slate-600">Product not found</p>
          <Link href="/" className="text-stripe-blurple hover:underline mt-2 inline-block">
            Go back home
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-[#F6F9FC] min-h-screen pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-6">
        {/* Breadcrumb */}
        <nav className="flex items-center text-sm text-slate-400 mb-8">
          <Link href="/" className="hover:text-stripe-blurple transition-colors">Home</Link>
          <ChevronRight className="w-4 h-4 mx-2" />
          <Link href="/search" className="hover:text-stripe-blurple transition-colors">Products</Link>
          <ChevronRight className="w-4 h-4 mx-2" />
          <span className="text-slate-900 font-medium">{product.name || product.title}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Left Side: 3D Viewer & Interaction */}
          <motion.div 
            style={{ x: mouseX * 0.5, y: mouseY * 0.5 }}
            className="space-y-6"
          >
            <Product3DViewer 
              modelUrl={product.model_url} 
              fallbackColor="#635bff" 
            />
            
            <div className="grid grid-cols-4 gap-4">
              {product.image_url && (
                <button
                  onClick={() => setSelectedImage(0)}
                  className={`relative aspect-square rounded-2xl overflow-hidden border-2 transition-all ${
                    selectedImage === 0 ? 'border-stripe-blurple ring-4 ring-stripe-blurple/10' : 'border-transparent bg-white shadow-sm hover:shadow-md'
                  }`}
                >
                  <Image src={product.image_url} alt="" fill className="object-cover" />
                </button>
              )}
            </div>
          </motion.div>

            {/* Product Info */}
            <div className="space-y-8 bg-white p-8 md:p-12 rounded-[2rem] border border-white shadow-sm">
              <div>
                <motion.h1 
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="text-3xl md:text-4xl font-bold text-slate-900 tracking-tight mb-4"
                >
                  {product.name || product.title}
                </motion.h1>
              
              <div className="flex items-center space-x-4 mb-6">
                <div className="flex items-center bg-slate-50 px-3 py-1 rounded-full border border-slate-100">
                  <Star className="w-4 h-4 text-amber-400 fill-amber-400 mr-1" />
                  <span className="text-sm font-bold text-slate-700">{product.rating}</span>
                  <span className="text-sm text-slate-400 ml-1">({product.review_count})</span>
                </div>
                <div className="text-sm text-slate-400 font-medium tracking-wide uppercase">SKU: {product.sku}</div>
              </div>

              <div className="flex items-baseline space-x-3">
                <span className="text-4xl font-bold text-slate-900">${product.price.toFixed(2)}</span>
                {product.compare_price && (
                  <span className="text-xl text-slate-300 line-through">${product.compare_price.toFixed(2)}</span>
                )}
              </div>
            </div>

            <p className="text-lg text-slate-600 leading-relaxed border-t border-slate-50 pt-8">
              {product.description}
            </p>

            <div className="space-y-6 pt-8 border-t border-slate-50">
               {/* Stock & Status */}
               <div className="flex items-center space-x-3">
                <div className={`w-3 h-3 rounded-full ${product.stock > 0 ? 'bg-emerald-500 animate-pulse' : 'bg-rose-500'}`} />
                <span className="text-sm font-bold text-slate-700 uppercase tracking-widest">
                  {product.stock > 0 ? `In Stock (${product.stock} available)` : 'Out of Stock'}
                </span>
               </div>

               {/* Quantity Selector */}
               <div className="flex items-center space-x-6">
                  <span className="text-sm font-bold text-slate-900 uppercase tracking-widest">Quantity</span>
                  <div className="flex items-center bg-slate-50 rounded-full border border-slate-100 p-1">
                    <button 
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-white transition-colors text-slate-600 font-bold"
                    >-</button>
                    <span className="w-12 text-center font-bold text-slate-900">{quantity}</span>
                    <button 
                      onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                      className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-white transition-colors text-slate-600 font-bold"
                    >+</button>
                  </div>
               </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 pt-4">
               <button
                 onClick={handleAddToCart}
                 disabled={product.stock <= 0}
                 className="stripe-btn-primary py-4 px-8 text-lg flex-1 flex items-center justify-center group"
               >
                 Add to Bag
                 <ShoppingBag className="w-5 h-5 ml-2 group-hover:scale-110 transition-transform" />
               </button>
               <button className="p-4 bg-slate-50 rounded-2xl border border-slate-100 hover:bg-white hover:shadow-sm transition-all text-slate-400 hover:text-rose-500">
                 <Heart className="w-6 h-6" />
               </button>
            </div>

            <div className="grid grid-cols-2 gap-4 pt-4">
              <div className="flex items-center p-4 rounded-2xl bg-slate-50 border border-slate-100">
                <Truck className="w-5 h-5 text-stripe-blurple mr-3" />
                <span className="text-xs font-bold text-slate-600 uppercase tracking-tight">Express Shipping</span>
              </div>
              <div className="flex items-center p-4 rounded-2xl bg-slate-50 border border-slate-100">
                <Shield className="w-5 h-5 text-stripe-blurple mr-3" />
                <span className="text-xs font-bold text-slate-600 uppercase tracking-tight">2 Year Warranty</span>
              </div>
            </div>
          </div>
        </div>

        {/* Reviews Section */}
        <section id="reviews" className="mt-24">
          <div className="flex items-center justify-between mb-12">
            <h2 className="text-3xl font-bold text-slate-900 tracking-tight">Customer Reviews</h2>
            <div className="flex items-center space-x-2">
               <div className="flex items-center text-amber-400">
                  {[1,2,3,4,5].map(i => <Star key={i} className={`w-5 h-5 ${i <= Math.round(product.rating) ? 'fill-current' : 'text-slate-200'}`} />)}
               </div>
               <span className="font-bold text-slate-900">{product.rating} Average</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {reviews.map((review) => (
              <motion.div 
                key={review.id}
                whileHover={{ y: -5 }}
                className="bg-white p-8 rounded-3xl border border-white shadow-sm hover:shadow-md transition-all"
              >
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center">
                    <div className="w-10 h-10 rounded-full bg-stripe-blurple/10 flex items-center justify-center text-stripe-blurple font-bold mr-3">
                      {review.users?.full_name?.charAt(0) || 'U'}
                    </div>
                    <div>
                      <div className="text-sm font-bold text-slate-900">{review.users?.full_name}</div>
                      <div className="text-xs text-slate-400">{new Date(review.created_at).toLocaleDateString()}</div>
                    </div>
                  </div>
                  <div className="flex text-amber-400">
                    {[1,2,3,4,5].map(i => <Star key={i} className={`w-3 h-3 ${i <= review.rating ? 'fill-current' : 'text-slate-200'}`} />)}
                  </div>
                </div>
                <p className="text-slate-600 leading-relaxed italic">"{review.comment}"</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Relevant Products */}
        <section className="mt-24">
          <h2 className="text-3xl font-bold text-slate-900 tracking-tight mb-12 text-center underline decoration-stripe-blurple/30 transition-transform cursor-pointer">You might also like</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="group cursor-pointer">
                <div className="relative aspect-square rounded-[2rem] bg-white border border-white shadow-sm overflow-hidden mb-4 group-hover:shadow-md transition-all">
                  <Image src={`https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400`} alt="" fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute inset-x-0 bottom-0 p-4 bg-white/40 backdrop-blur-md border-t border-white/20 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button className="w-full py-2 bg-slate-900 text-white rounded-xl text-xs font-bold uppercase tracking-widest">Quick View</button>
                  </div>
                </div>
                <h3 className="font-bold text-slate-800 tracking-tight group-hover:text-stripe-blurple transition-colors">Premium Lifestyle Series {i}</h3>
                <p className="text-slate-500 font-medium">${(149 + i * 50).toFixed(2)}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}
