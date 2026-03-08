'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'

export function ProductCard({ product }: { product: any }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      whileHover={{ y: -10, scale: 1.02 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100 hover:shadow-stripe-hover cursor-pointer group relative flex flex-col h-full"
    >
      {/* Stripe-style gradient border effect on hover */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-stripe-blurple to-stripe-pink opacity-0 group-hover:opacity-10 transition-opacity duration-500 pointer-events-none" />

      <div className="relative aspect-square w-full bg-slate-50 rounded-xl overflow-hidden mb-4 flex-shrink-0">
        {product.images?.[0] ? (
          <Image
            src={product.images[0]}
            alt={product.title}
            fill
            className="object-contain p-4 group-hover:scale-110 transition-transform duration-700 ease-out"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center text-slate-300">No image</div>
        )}
      </div>

      <div className="flex flex-col flex-grow">
        <h3 className="font-semibold text-slate-800 text-sm line-clamp-2 leading-tight mb-2 group-hover:text-stripe-blurple transition-colors">
          {product.title}
        </h3>
        
        <div className="mt-auto pt-4 flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-lg font-bold text-slate-900">
              ${Number(product.price).toFixed(2)}
            </span>
            {product.compare_price && (
              <span className="text-xs text-slate-400 line-through">
                ${Number(product.compare_price).toFixed(2)}
              </span>
            )}
          </div>
          
          <motion.button 
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="w-8 h-8 rounded-full bg-slate-100 text-slate-600 flex items-center justify-center hover:bg-stripe-blurple hover:text-white transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="M12 5v14"/></svg>
          </motion.button>
        </div>
      </div>
    </motion.div>
  )
}

// Keeping empty exports for components that were imported in the main page.tsx
export function HeroCarousel() { return null }
export function CategoryGrid() { return null }
export function DealsOfTheDay() { return null }
