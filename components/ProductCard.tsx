'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'

export function ProductCard({ product }: { product: Product }) {
  return (
    <Link href={`/products/${product.id}`}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-50px' }}
        whileHover={{ y: -10, scale: 1.02 }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
        className="bg-white rounded-[2rem] p-6 shadow-sm border border-slate-50 hover:shadow-stripe-hover cursor-pointer group relative flex flex-col h-full overflow-hidden"
      >
        {/* Stripe-style gradient border effect on hover */}
        <div className="absolute inset-0 rounded-[2rem] bg-gradient-to-r from-stripe-blurple/5 to-stripe-pink/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

        <div className="relative aspect-square w-full bg-slate-50 rounded-2xl overflow-hidden mb-5">
          {product.image_url ? (
            <Image
              src={product.image_url}
              alt={product.name}
              fill
              className="object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center text-slate-300">
              <ShoppingBag className="w-8 h-8 opacity-20" />
            </div>
          )}
          
          <div className="absolute top-4 right-4 z-10 opacity-0 group-hover:opacity-100 transition-opacity">
            <div className="w-10 h-10 rounded-full bg-white/90 backdrop-blur-md shadow-sm flex items-center justify-center text-slate-600 hover:text-stripe-blurple">
              <Plus className="w-5 h-5" />
            </div>
          </div>
        </div>

        <div className="flex flex-col flex-grow">
          <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">{product.category}</div>
          <h3 className="font-bold text-slate-900 text-base line-clamp-2 leading-tight mb-3 group-hover:text-stripe-blurple transition-colors">
            {product.name}
          </h3>
          
          <div className="mt-auto pt-4 flex items-center justify-between">
            <div className="flex flex-col">
              <span className="text-xl font-bold text-slate-900">
                ${Number(product.price).toFixed(2)}
              </span>
              {product.compare_price && (
                <span className="text-xs text-slate-300 line-through">
                  ${Number(product.compare_price).toFixed(2)}
                </span>
              )}
            </div>
            
            <div className="flex items-center text-amber-400 text-xs font-bold">
              <Star className="w-3 h-3 fill-current mr-1" />
              {product.rating}
            </div>
          </div>
        </div>
      </motion.div>
    </Link>
  )
}

// Keeping empty exports for components that were imported in the main page.tsx
export function HeroCarousel() { return null }
export function CategoryGrid() { return null }
export function DealsOfTheDay() { return null }
