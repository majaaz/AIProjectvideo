'use client'

import { useEffect, useState, Suspense } from 'react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { 
  CheckCircle2, 
  ShoppingBag, 
  ArrowRight, 
  Package, 
  Mail, 
  Sparkles,
  ChevronRight,
  Monitor
} from 'lucide-react'
import { motion } from 'framer-motion'
import { useCart } from '@/context/CartContext'

function SuccessPageContent() {
  const searchParams = useSearchParams()
  const sessionId = searchParams.get('session_id')
  const { clearCart } = useCart()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    clearCart() // Clear the cart on successful purchase
  }, [])

  if (!mounted) return null

  return (
    <div className="bg-[#F6F9FC] min-h-screen pt-32 pb-20 overflow-hidden relative">
      {/* Background Decorative Elements */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[600px] bg-gradient-to-b from-stripe-blurple/5 to-transparent pointer-events-none" />
      
      <div className="max-w-3xl mx-auto px-6 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 40, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ type: 'spring', damping: 20, stiffness: 100 }}
          className="bg-white p-12 md:p-20 rounded-[4rem] border border-white shadow-stripe-xl text-center"
        >
          <motion.div 
             initial={{ scale: 0 }}
             animate={{ scale: 1 }}
             transition={{ delay: 0.3, type: 'spring', damping: 12 }}
             className="w-24 h-24 bg-emerald-50 rounded-[2rem] flex items-center justify-center mx-auto mb-10 relative"
          >
             <CheckCircle2 className="w-12 h-12 text-emerald-500" />
             <motion.div 
               animate={{ scale: [1, 1.5, 1], opacity: [0, 0.5, 0] }}
               transition={{ repeat: Infinity, duration: 2 }}
               className="absolute inset-0 bg-emerald-400 rounded-[2rem]"
             />
          </motion.div>

          <h1 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tighter mb-6 relative">
            <Sparkles className="absolute -top-10 -left-10 w-12 h-12 text-amber-400 opacity-20 rotate-12" />
            Order Confirmed!
            <Sparkles className="absolute -bottom-10 -right-10 w-12 h-12 text-stripe-blurple opacity-20 -rotate-12" />
          </h1>
          
          <p className="text-slate-500 text-lg font-medium mb-12 max-w-md mx-auto leading-relaxed">
            Your premium selection is being prepared for shipment. A digital receipt has been sent to your email.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
             <div className="p-8 rounded-[2.5rem] bg-slate-50 border border-slate-100 text-left">
                <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center mb-4 shadow-sm">
                  <Monitor className="w-5 h-5 text-stripe-blurple" />
                </div>
                <h4 className="font-bold text-slate-900 mb-2">3D Access Enabled</h4>
                <p className="text-xs text-slate-400 font-medium leading-relaxed">
                  You can now interact with your products in your virtual gallery.
                </p>
             </div>
             <div className="p-8 rounded-[2.5rem] bg-slate-50 border border-slate-100 text-left">
                <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center mb-4 shadow-sm">
                  <Mail className="w-5 h-5 text-emerald-500" />
                </div>
                <h4 className="font-bold text-slate-900 mb-2">Receipt Sent</h4>
                <p className="text-xs text-slate-400 font-medium leading-relaxed">
                  Session ID: <span className="font-mono text-slate-500">{sessionId?.slice(0, 10)}...</span>
                </p>
             </div>
          </div>

          <div className="space-y-4">
            <Link href="/search" className="w-full stripe-btn-primary py-5 text-lg flex items-center justify-center group">
              Continue Exploration
              <ChevronRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link href="/" className="block text-sm font-bold text-slate-400 hover:text-slate-900 transition-colors py-2">
              Back to Home
            </Link>
          </div>
        </motion.div>

        <div className="mt-12 flex items-center justify-center space-x-8 opacity-30">
           <div className="flex items-center space-x-2">
              <Package className="w-4 h-4" />
              <span className="text-[10px] font-bold uppercase tracking-widest">Global Shipping</span>
           </div>
           <div className="flex items-center space-x-2">
              <ShoppingBag className="w-4 h-4" />
              <span className="text-[10px] font-bold uppercase tracking-widest">Premium Packing</span>
           </div>
        </div>
      </div>
    </div>
  )
}

export default function SuccessPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-[#F6F9FC] flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-stripe-blurple border-t-transparent rounded-full animate-spin" />
      </div>
    }>
      <SuccessPageContent />
    </Suspense>
  )
}
