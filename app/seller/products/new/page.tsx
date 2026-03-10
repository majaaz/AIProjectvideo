'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { 
  ArrowLeft, 
  Upload, 
  Info, 
  DollarSign, 
  Package, 
  Box, 
  Save,
  Trash2,
  Sparkles
} from 'lucide-react'
import Link from 'next/link'
import { supabase } from '@/lib/supabase'

export default function NewProductPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    category: 'Electronics',
    price: '',
    compare_price: '',
    description: '',
    stock: '',
    image_url: '',
    model_url: '',
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      if (!supabase) throw new Error('Supabase not configured')

      const { data: { user } } = await supabase.auth.getUser()
      if (!user) throw new Error('Not authenticated')

      const { error } = await supabase
        .from('products')
        .insert([{
          ...formData,
          price: parseFloat(formData.price),
          compare_price: formData.compare_price ? parseFloat(formData.compare_price) : null,
          stock: parseInt(formData.stock),
          seller_id: user.id
        }])

      if (error) throw error

      router.push('/seller/products')
      router.refresh()
    } catch (err: any) {
      console.error('Error creating product:', err)
      alert(err.message || 'Failed to create product')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-4xl mx-auto pb-20">
      <div className="mb-8 flex items-center justify-between">
        <Link href="/seller/products" className="flex items-center text-slate-400 hover:text-slate-900 font-bold transition-all group">
          <div className="w-10 h-10 rounded-xl bg-white border border-slate-100 flex items-center justify-center mr-3 group-hover:shadow-sm">
            <ArrowLeft className="w-5 h-5" />
          </div>
          Back to Inventory
        </Link>
        <div className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em]">Listing Editor</div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-10">
        <div className="flex flex-col md:flex-row justify-between md:items-end gap-6">
           <div>
              <h2 className="text-4xl font-bold text-slate-900 tracking-tight">Create Listing</h2>
              <p className="text-slate-500 font-medium">Add details for your new premium product.</p>
           </div>
           <button
            type="submit"
            disabled={loading}
            className="stripe-btn-primary px-8 py-4 flex items-center group"
          >
            {loading ? 'Publishing...' : 'Publish Listing'}
            <Save className="w-5 h-5 ml-2 group-hover:scale-110 transition-transform" />
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Info */}
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-white p-8 rounded-[2.5rem] border border-white shadow-sm space-y-6">
              <div className="flex items-center space-x-2 text-[10px] font-bold text-stripe-blurple tracking-widest uppercase">
                <Info className="w-4 h-4" />
                <span>Essential Information</span>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700 ml-1">Product Name</label>
                <input
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. Premium Leather Satchel"
                  className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:ring-4 focus:ring-stripe-blurple/5 focus:border-stripe-blurple/20 transition-all font-medium text-slate-600"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700 ml-1">Full Description</label>
                <textarea
                  rows={6}
                  required
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Tell the story behind this product..."
                  className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:ring-4 focus:ring-stripe-blurple/5 focus:border-stripe-blurple/20 transition-all font-medium text-slate-600 resize-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-6">
                 <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700 ml-1">Category</label>
                    <select
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                      className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none transition-all font-medium text-slate-600 appearance-none"
                    >
                      <option>Electronics</option>
                      <option>Fashion</option>
                      <option>Home</option>
                      <option>Lifestyle</option>
                    </select>
                 </div>
                 <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700 ml-1">Inventory Level</label>
                    <div className="relative">
                       <Package className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                       <input
                        type="number"
                        required
                        value={formData.stock}
                        onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                        placeholder="0"
                        className="w-full pl-14 pr-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none transition-all font-medium text-slate-600"
                      />
                    </div>
                 </div>
              </div>
            </div>

            <div className="bg-white p-8 rounded-[2.5rem] border border-white shadow-sm space-y-6">
              <div className="flex items-center space-x-2 text-[10px] font-bold text-emerald-500 tracking-widest uppercase">
                <DollarSign className="w-4 h-4" />
                <span>Pricing Strategy</span>
              </div>
              <div className="grid grid-cols-2 gap-6">
                 <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700 ml-1">Selling Price ($)</label>
                    <input
                      type="number"
                      step="0.01"
                      required
                      value={formData.price}
                      onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                      placeholder="0.00"
                      className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none transition-all font-medium text-slate-600"
                    />
                 </div>
                 <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700 ml-1">Compare at Price ($)</label>
                    <input
                      type="number"
                      step="0.01"
                      value={formData.compare_price}
                      onChange={(e) => setFormData({ ...formData, compare_price: e.target.value })}
                      placeholder="0.00"
                      className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none transition-all font-medium text-slate-600"
                    />
                 </div>
              </div>
            </div>
          </div>

          {/* Sidebar / Asset management */}
          <div className="space-y-8">
            <div className="bg-white p-8 rounded-[2.5rem] border border-white shadow-sm space-y-6">
              <div className="flex items-center space-x-2 text-[10px] font-bold text-slate-400 tracking-widest uppercase">
                <Upload className="w-4 h-4" />
                <span>Media & Assets</span>
              </div>
              
              <div className="space-y-4">
                <label className="text-sm font-bold text-slate-700 ml-1">Main Image URL</label>
                <input
                  value={formData.image_url}
                  onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
                  placeholder="https://..."
                  className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none transition-all font-medium text-slate-600"
                />
                <div className="aspect-square bg-slate-50 rounded-3xl border border-dashed border-slate-200 flex items-center justify-center overflow-hidden">
                   {formData.image_url ? (
                     <img src={formData.image_url} alt="Preview" className="w-full h-full object-cover" />
                   ) : (
                     <div className="text-center p-6">
                        <Upload className="w-8 h-8 text-slate-300 mx-auto mb-2" />
                        <p className="text-[10px] font-bold text-slate-400 tracking-tight uppercase">Preview Image</p>
                     </div>
                   )}
                </div>
              </div>

              <div className="space-y-4 pt-6 border-t border-slate-50">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-bold text-slate-700 ml-1 flex items-center">
                    <Box className="w-4 h-4 mr-2 text-stripe-blurple" />
                    3D Model URL
                  </label>
                  <span className="text-[10px] font-bold bg-stripe-blurple/10 text-stripe-blurple px-2 py-0.5 rounded-full">GLB/GLTF</span>
                </div>
                <input
                  value={formData.model_url}
                  onChange={(e) => setFormData({ ...formData, model_url: e.target.value })}
                  placeholder="https://..."
                  className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none transition-all font-medium text-slate-600"
                />
                <div className="p-4 rounded-2xl bg-indigo-50 border border-indigo-100 flex items-start space-x-3">
                  <Sparkles className="w-5 h-5 text-stripe-blurple shrink-0 mt-0.5" />
                  <p className="text-[10px] font-medium text-indigo-700 leading-tight tracking-tight">
                    Add a GLB model to enable immersive 3D browsing for your customers.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="p-8 rounded-[2.5rem] bg-slate-900 text-white relative overflow-hidden">
               <div className="relative z-10">
                  <h4 className="font-bold mb-2">Sell with confidence</h4>
                  <p className="text-xs text-slate-400 mb-6 leading-relaxed">
                    Once published, your product will be available across NovaCart for buyers to discover and purchase.
                  </p>
                  <button type="button" className="text-xs font-bold uppercase tracking-widest text-white/50 hover:text-rose-500 transition-colors flex items-center">
                     <Trash2 className="w-4 h-4 mr-2" />
                     Discard Draft
                  </button>
               </div>
               <div className="absolute top-[-20%] right-[-10%] w-32 h-32 bg-white/5 rounded-full blur-2xl" />
            </div>
          </div>
        </div>
      </form>
    </div>
  )
}
