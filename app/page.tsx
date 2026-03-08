'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { ProductCard } from '@/components/ProductCard'
import Link from 'next/link'
import { ArrowRight, Sparkles } from 'lucide-react'
import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'

export default function HomePage() {
  const { scrollYProgress } = useScroll()
  const y = useTransform(scrollYProgress, [0, 1], [0, -200])
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0])

  const [products, setProducts] = useState<any[]>([])

  useEffect(() => {
    // Fetch real or fallback data
    async function load() {
      if (supabase) {
        const { data } = await supabase.from('products').select('*').limit(8)
        if (data && data.length) {
          setProducts(data)
          return
        }
      }
      setProducts(mockProducts)
    }
    load()
  }, [])

  return (
    <div className="relative min-h-screen overflow-hidden pt-24 pb-20">
      
      {/* Animated Background blobs */}
      <div className="fixed inset-0 z-[-1] overflow-hidden pointer-events-none">
        <div className="bg-shape bg-stripe-blurple w-96 h-96 top-0 left-10" />
        <div className="bg-shape bg-stripe-pink w-96 h-96 top-40 right-10 animation-delay-2000" />
        <div className="bg-shape bg-stripe-cyan w-80 h-80 bottom-20 left-1/3 animation-delay-4000" />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* HERO SECTION */}
        <motion.section 
          style={{ opacity, y }}
          className="py-20 md:py-32 flex flex-col items-center text-center max-w-4xl mx-auto"
        >
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center px-4 py-2 rounded-full bg-white/50 backdrop-blur-sm border border-white/20 shadow-sm text-sm text-stripe-slate font-medium mb-8"
          >
            <Sparkles className="w-4 h-4 text-stripe-purple mr-2" />
            V2 Platform Now Live
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-5xl md:text-7xl font-bold tracking-tighter text-slate-900 mb-6 leading-tight"
          >
            Commerce that feels <br className="hidden md:block"/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-stripe-blurple via-stripe-purple to-stripe-pink">
              like magic.
            </span>
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg md:text-xl text-slate-600 mb-10 max-w-2xl"
          >
            Discover the next generation of online shopping. A beautifully polished, lightning-fast platform built for modern consumers.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <button className="stripe-btn-primary flex items-center justify-center group text-lg px-8">
              Start Shopping
              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </button>
            <button className="stripe-btn-secondary text-lg px-8">
              View Categories
            </button>
          </motion.div>
        </motion.section>

        {/* 3D FLOATING CARDS SECTION (MOCK UP) */}
        <div className="relative h-64 md:h-96 w-full max-w-5xl mx-auto mb-32 hidden md:block perspective-1000">
          <motion.div
            initial={{ rotateX: 20, rotateY: -10, y: 50, opacity: 0 }}
            animate={{ rotateX: 10, rotateY: -5, y: 0, opacity: 1 }}
            transition={{ type: 'spring', damping: 20, stiffness: 100, delay: 0.4 }}
            className="absolute inset-0 bg-white/40 backdrop-blur-xl border border-white rounded-[2rem] shadow-stripe-hover transform-3d p-8"
          >
            <div className="w-full h-full bg-slate-50/50 rounded-xl border border-white/50 flex items-center justify-center">
              <span className="text-slate-400 font-medium">Interactive 3D Dashboard Preview</span>
            </div>
          </motion.div>
        </div>

        {/* FEATURED PRODUCTS GRID */}
        <section className="py-10">
          <div className="flex items-center justify-between mb-10">
            <div>
              <h2 className="text-3xl font-bold text-slate-900 tracking-tight">Trending Now</h2>
              <p className="text-slate-500 mt-2">Curated products picked just for you.</p>
            </div>
            <Link href="/products" className="text-stripe-blurple font-medium hover:text-stripe-purple flex items-center group">
              View all <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.map((product, i) => (
              <ProductCard key={product.id || i} product={product} />
            ))}
          </div>
        </section>

      </div>
    </div>
  )
}

// Fallback Mock data
const mockProducts = [
  { id: '1', title: 'Wireless Noise-Canceling Headphones', price: 199.99, images: ['https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400'] },
  { id: '2', title: 'Smart Watch Pro', price: 349.99, images: ['https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400'] },
  { id: '3', title: 'Portable Bluetooth Speaker', price: 79.99, images: ['https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=400'] },
  { id: '4', title: '4K Ultra HD Smart TV 55"', price: 599.99, images: ['https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=400'] },
]
