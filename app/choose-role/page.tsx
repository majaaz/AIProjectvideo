'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { ShoppingBag, Store, ArrowRight, Sparkles } from 'lucide-react'
import { supabase } from '@/lib/supabase'

export default function ChooseRolePage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [selected, setSelected] = useState<'buyer' | 'seller' | null>(null)

  const handleConfirm = async () => {
    if (!selected || !supabase) return
    setLoading(true)

    try {
      const { data: { user } } = await supabase.auth.getUser()
      
      if (user) {
        const { error } = await supabase
          .from('users')
          .update({ role: selected })
          .eq('id', user.id)

        if (error) throw error

        // Redirect based on role
        const redirectTo = selected === 'seller' ? '/seller/dashboard' : '/'
        router.push(redirectTo)
        router.refresh()
      } else {
        router.push('/auth/login')
      }
    } catch (err) {
      console.error('Error selecting role:', err)
      alert('Failed to save role. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#F6F9FC] flex flex-col items-center justify-center p-6 relative overflow-hidden">
      {/* Background blobs */}
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-stripe-blurple/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-stripe-pink/10 rounded-full blur-[120px]" />
      </div>

      <div className="w-full max-w-4xl relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-white border border-slate-200 text-sm text-slate-600 font-medium mb-6 shadow-sm">
            <Sparkles className="w-4 h-4 text-stripe-purple mr-2" />
            Welcome to NovaCart
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 tracking-tight mb-4">
            How do you want to use the platform?
          </h1>
          <p className="text-lg text-slate-600">
            Choose your primary role to customize your experience.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {/* Buyer Option */}
          <motion.button
            whileHover={{ y: -5, scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setSelected('buyer')}
            className={`relative p-8 rounded-3xl text-left transition-all border-2 ${
              selected === 'buyer' 
                ? 'border-stripe-blurple bg-white shadow-stripe-hover' 
                : 'border-white bg-white/60 hover:bg-white shadow-sm'
            }`}
          >
            <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 ${
              selected === 'buyer' ? 'bg-stripe-blurple text-white' : 'bg-slate-100 text-slate-400'
            }`}>
              <ShoppingBag className="w-7 h-7" />
            </div>
            <h3 className="text-2xl font-bold text-slate-900 mb-3">I want to Buy</h3>
            <p className="text-slate-600 leading-relaxed">
              Explore thousands of products, enjoy a 3D shopping experience, and manage your orders with ease.
            </p>
            {selected === 'buyer' && (
              <motion.div 
                layoutId="check"
                className="absolute top-6 right-6 w-6 h-6 bg-stripe-blurple rounded-full flex items-center justify-center"
              >
                <div className="w-2 h-4 border-r-2 border-b-2 border-white rotate-45 mb-1" />
              </motion.div>
            )}
          </motion.button>

          {/* Seller Option */}
          <motion.button
            whileHover={{ y: -5, scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setSelected('seller')}
            className={`relative p-8 rounded-3xl text-left transition-all border-2 ${
              selected === 'seller' 
                ? 'border-stripe-purple bg-white shadow-stripe-hover' 
                : 'border-white bg-white/60 hover:bg-white shadow-sm'
            }`}
          >
            <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 ${
              selected === 'seller' ? 'bg-stripe-purple text-white' : 'bg-slate-100 text-slate-400'
            }`}>
              <Store className="w-7 h-7" />
            </div>
            <h3 className="text-2xl font-bold text-slate-900 mb-3">I want to Sell</h3>
            <p className="text-slate-600 leading-relaxed">
              List products, manage inventory in 3D, and grow your business with our advanced seller tools and analytics.
            </p>
            {selected === 'seller' && (
              <motion.div 
                layoutId="check"
                className="absolute top-6 right-6 w-6 h-6 bg-stripe-purple rounded-full flex items-center justify-center"
              >
                <div className="w-2 h-4 border-r-2 border-b-2 border-white rotate-45 mb-1" />
              </motion.div>
            )}
          </motion.button>
        </div>

        <motion.div 
          animate={{ opacity: selected ? 1 : 0.5 }}
          className="flex justify-center"
        >
          <button
            onClick={handleConfirm}
            disabled={!selected || loading}
            className="stripe-btn-primary px-12 py-4 text-xl flex items-center group disabled:cursor-not-allowed"
          >
            {loading ? 'Setting up...' : 'Get Started'}
            {!loading && <ArrowRight className="w-6 h-6 ml-2 group-hover:translate-x-1 transition-transform" />}
          </button>
        </motion.div>
      </div>
    </div>
  )
}
