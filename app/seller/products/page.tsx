'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Plus, 
  Search, 
  MoreVertical, 
  Edit2, 
  Trash2, 
  Eye, 
  Package, 
  Box,
  ExternalLink
} from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import { supabase } from '@/lib/supabase'
import { Product } from '@/types'

export default function SellerProductsPage() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')

  useEffect(() => {
    fetchSellerProducts()
  }, [])

  const fetchSellerProducts = async () => {
    setLoading(true)
    if (!supabase) return

    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return

    const { data, error } = await supabase
      .from('products')
      .select('*')
      .eq('seller_id', user.id)
      .order('created_at', { ascending: false })

    if (!error) {
      setProducts(data as Product[])
    }
    setLoading(false)
  }

  const filteredProducts = products.filter(p => 
    p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.category.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="space-y-8 pb-20">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h2 className="text-3xl font-bold text-slate-900 tracking-tight">My Products</h2>
          <p className="text-slate-500 font-medium">Manage your inventory and 3D listings.</p>
        </div>
        <Link href="/seller/products/new">
          <button className="stripe-btn-primary flex items-center px-6">
            <Plus className="w-5 h-5 mr-2" />
            Add New Product
          </button>
        </Link>
      </div>

      {/* Toolbar */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1 group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-stripe-blurple transition-colors" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search products by name or category..."
            className="w-full pl-12 pr-4 py-3 bg-white border border-white shadow-sm rounded-2xl focus:outline-none focus:ring-4 focus:ring-stripe-blurple/5 focus:border-stripe-blurple/20 transition-all font-medium text-slate-600"
          />
        </div>
        <div className="flex gap-2">
           <select className="bg-white border border-white shadow-sm rounded-2xl px-4 py-3 text-sm font-bold text-slate-600 focus:outline-none">
             <option>All Status</option>
             <option>In Stock</option>
             <option>Out of Stock</option>
           </select>
        </div>
      </div>

      {/* Products Table/Grid */}
      {loading ? (
        <div className="space-y-4">
          {[1, 2, 3].map(i => (
            <div key={i} className="h-24 bg-white rounded-3xl animate-pulse border border-white" />
          ))}
        </div>
      ) : filteredProducts.length === 0 ? (
        <div className="bg-white rounded-[3rem] border border-white shadow-inner p-20 flex flex-col items-center justify-center text-center">
           <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mb-6">
              <Package className="w-10 h-10 text-slate-300" />
           </div>
           <h3 className="text-xl font-bold text-slate-900 mb-2">No products found</h3>
           <p className="text-slate-500 max-w-xs">You haven't listed any products yet. Start by adding your first item.</p>
           <Link href="/seller/products/new" className="mt-8 text-stripe-blurple font-bold hover:underline underline-offset-8">
             Create your first listing
           </Link>
        </div>
      ) : (
        <div className="bg-white rounded-[3.5rem] border border-white shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-50">
                  <th className="px-8 py-6 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Product</th>
                  <th className="px-8 py-6 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Category</th>
                  <th className="px-8 py-6 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Price</th>
                  <th className="px-8 py-6 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Stock</th>
                  <th className="px-8 py-6 text-[10px] font-bold text-slate-400 uppercase tracking-widest text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                <AnimatePresence>
                  {filteredProducts.map((p, i) => (
                    <motion.tr 
                      key={p.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.05 }}
                      className="group border-b border-slate-50 hover:bg-slate-50 transition-colors"
                    >
                      <td className="px-8 py-6">
                        <div className="flex items-center">
                          <div className="relative w-12 h-12 rounded-xl bg-slate-100 overflow-hidden mr-4 flex-shrink-0 border border-slate-100 group-hover:border-stripe-blurple/20">
                            {p.image_url ? (
                              <Image src={p.image_url} alt="" fill className="object-cover" />
                            ) : (
                              <Box className="w-6 h-6 m-3 text-slate-300" />
                            )}
                          </div>
                          <div>
                            <div className="text-sm font-bold text-slate-900 group-hover:text-stripe-blurple transition-colors">{p.name}</div>
                            {p.model_url && (
                              <div className="flex items-center text-[10px] text-emerald-500 font-bold uppercase tracking-tight mt-1">
                                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 mr-1.5" />
                                3D Ready
                              </div>
                            )}
                          </div>
                        </div>
                      </td>
                      <td className="px-8 py-6">
                        <span className="px-3 py-1 bg-slate-100 rounded-full text-[10px] font-bold text-slate-500 uppercase tracking-widest">
                          {p.category}
                        </span>
                      </td>
                      <td className="px-8 py-6 text-sm font-bold text-slate-900">
                        ${Number(p.price).toFixed(2)}
                      </td>
                      <td className="px-8 py-6">
                        <div className={`text-sm font-bold ${p.stock > 10 ? 'text-slate-600' : p.stock > 0 ? 'text-amber-500' : 'text-rose-500'}`}>
                          {p.stock}
                        </div>
                      </td>
                      <td className="px-8 py-6 text-right">
                        <div className="flex items-center justify-end space-x-2">
                           <Link href={`/products/${p.id}`} target="_blank">
                             <button className="p-2 text-slate-400 hover:text-stripe-blurple hover:bg-white rounded-xl transition-all shadow-none hover:shadow-sm">
                               <ExternalLink className="w-5 h-5" />
                             </button>
                           </Link>
                           <Link href={`/seller/products/${p.id}`}>
                             <button className="p-2 text-slate-400 hover:text-stripe-blurple hover:bg-white rounded-xl transition-all shadow-none hover:shadow-sm">
                               <Edit2 className="w-5 h-5" />
                             </button>
                           </Link>
                           <button className="p-2 text-slate-400 hover:text-rose-500 hover:bg-white rounded-xl transition-all shadow-none hover:shadow-sm">
                             <Trash2 className="w-5 h-5" />
                           </button>
                        </div>
                      </td>
                    </motion.tr>
                  ))}
                </AnimatePresence>
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  )
}
