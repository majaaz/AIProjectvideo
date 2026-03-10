'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useCart } from '@/context/CartContext'
import { 
  ArrowLeft, 
  Lock, 
  ShoppingBag, 
  Truck, 
  ShieldCheck, 
  CreditCard,
  ChevronRight,
  AlertCircle,
  Package,
  Sparkles,
  Smartphone
} from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

export default function CheckoutPage() {
  const router = useRouter()
  const { items, total, clearCart } = useCart()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [step, setStep] = useState<'details' | 'simulating'>('details')

  const [email, setEmail] = useState('')
  const [name, setName] = useState('')

  const subtotal = total
  const shipping = 0 
  const tax = subtotal * 0.08
  const orderTotal = subtotal + tax + shipping

  const handleSimulatedCheckout = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    setStep('simulating')

    try {
      const response = await fetch('/api/checkout/simulate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          items,
          email,
          amount: orderTotal
        }),
      })

      const data = await response.json()

      if (data.success) {
        // Wait another bit for the simulation animation to feel premium
        setTimeout(() => {
          clearCart()
          router.push(`/checkout/success?session_id=${data.id}`)
        }, 3000)
      } else {
        throw new Error(data.error || 'Simulation failed')
      }
    } catch (err: any) {
      console.error('Checkout Error:', err)
      setError(err.message || 'Something went wrong. Please try again.')
      setLoading(false)
      setStep('details')
    }
  }

  if (items.length === 0) {
    return (
      <div className="bg-[#F6F9FC] min-h-screen pt-32 pb-20">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white p-16 rounded-[3rem] border border-white shadow-sm"
          >
            <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-8">
              <ShoppingBag className="w-10 h-10 text-slate-300" />
            </div>
            <h2 className="text-3xl font-bold text-slate-900 mb-4 tracking-tight">Your cart is empty</h2>
            <p className="text-slate-500 mb-10 font-medium">Add some premium items to your cart before checking out.</p>
            <Link href="/search" className="stripe-btn-primary px-10 py-5 inline-block">
              Explore Products
            </Link>
          </motion.div>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-[#F6F9FC] min-h-screen pt-32 pb-20 relative">
      <AnimatePresence>
        {step === 'simulating' && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-white/80 backdrop-blur-xl flex flex-col items-center justify-center"
          >
            <div className="relative">
              <motion.div 
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 8, ease: "linear" }}
                className="w-32 h-32 rounded-full border-t-2 border-stripe-blurple"
              />
              <motion.div 
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ repeat: Infinity, duration: 2 }}
                className="absolute inset-0 flex items-center justify-center"
              >
                <Sparkles className="w-10 h-10 text-stripe-blurple" />
              </motion.div>
            </div>
            <h2 className="text-3xl font-black text-slate-900 mt-12 tracking-tighter">Processing Order</h2>
            <p className="text-slate-500 font-medium mt-4">Simulating secure transaction via virtual bank...</p>
            <div className="mt-12 flex space-x-2">
               {[1, 2, 3].map(i => (
                 <motion.div 
                   key={i}
                   animate={{ opacity: [0.2, 1, 0.2] }}
                   transition={{ repeat: Infinity, duration: 1, delay: i * 0.2 }}
                   className="w-2 h-2 rounded-full bg-stripe-blurple"
                 />
               ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-12 flex items-center justify-between">
           <Link href="/cart" className="flex items-center text-slate-400 hover:text-slate-900 font-bold transition-all group">
             <div className="w-10 h-10 rounded-xl bg-white border border-slate-100 flex items-center justify-center mr-3 group-hover:shadow-sm">
               <ArrowLeft className="w-5 h-5" />
             </div>
             Back to Cart
           </Link>
           <div className="hidden md:flex items-center space-x-4 text-[10px] font-bold uppercase tracking-[0.2em] text-slate-300">
             <span>Bag</span>
             <ChevronRight className="w-3 h-3" />
             <span className="text-slate-900 underline decoration-stripe-blurple underline-offset-4">Checkout</span>
             <ChevronRight className="w-3 h-3" />
             <span>Success</span>
           </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          <div className="lg:col-span-7 space-y-8">
            <h1 className="text-4xl font-bold text-slate-900 tracking-tight mb-8">Secure Checkout</h1>

            {error && (
              <motion.div 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-6 bg-rose-50 border border-rose-100 rounded-2xl flex items-start space-x-4 text-rose-700 font-medium"
              >
                <AlertCircle className="w-6 h-6 shrink-0" />
                <p className="text-sm">{error}</p>
              </motion.div>
            )}

            <form id="checkout-form" onSubmit={handleSimulatedCheckout} className="space-y-8">
              {/* Contact Information */}
              <div className="bg-white p-8 rounded-[2.5rem] border border-white shadow-sm space-y-6">
                <div className="flex items-center space-x-2 text-[10px] font-bold text-stripe-blurple tracking-widest uppercase">
                  <Lock className="w-4 h-4" />
                  <span>Contact Information</span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700 ml-1">Full Name</label>
                    <input
                      required
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Jane Doe"
                      className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:ring-4 focus:ring-stripe-blurple/5 transition-all font-medium"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700 ml-1">Email Address</label>
                    <input
                      required
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="jane@example.com"
                      className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:ring-4 focus:ring-stripe-blurple/5 transition-all font-medium"
                    />
                  </div>
                </div>
                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest ml-1">Simulation: Any valid email works</p>
              </div>

              {/* Shipping Details */}
              <div className="bg-white p-8 rounded-[2.5rem] border border-white shadow-sm space-y-6">
                <div className="flex items-center space-x-2 text-[10px] font-bold text-slate-400 tracking-widest uppercase">
                  <Truck className="w-4 h-4" />
                  <span>Shipping Details</span>
                </div>
                <div className="p-6 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-between">
                   <div className="flex items-center">
                      <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center mr-4 shadow-sm">
                        <Package className="w-6 h-6 text-stripe-blurple" />
                      </div>
                      <div>
                         <div className="text-sm font-bold text-slate-900">Virtual Next-Day Delivery</div>
                         <div className="text-xs text-slate-400 font-medium tracking-tight">Insured • Global Tracking</div>
                      </div>
                   </div>
                   <div className="text-xs font-black text-emerald-500 uppercase tracking-widest">Free</div>
                </div>
              </div>

              {/* Payment Methods PREVIEW */}
              <div className="bg-white p-8 rounded-[2.5rem] border border-white shadow-sm space-y-8">
                <div className="flex items-center space-x-2 text-[10px] font-bold text-slate-400 tracking-widest uppercase">
                  <CreditCard className="w-4 h-4" />
                  <span>Choose Method (Simulation)</span>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                   <div className="p-6 rounded-[2rem] border-2 border-stripe-blurple bg-stripe-blurple/5 space-y-4 relative overflow-hidden group">
                      <div className="flex items-center justify-between">
                        <Smartphone className="w-6 h-6 text-stripe-blurple rotate-12" />
                        <div className="w-4 h-4 rounded-full border-2 border-stripe-blurple flex items-center justify-center">
                           <div className="w-2 h-2 rounded-full bg-stripe-blurple" />
                        </div>
                      </div>
                      <div className="font-bold text-slate-900">Virtual UPI</div>
                      <p className="text-[10px] text-slate-500 font-medium">Auto-confirms instantly in simulation mode.</p>
                   </div>
                   <div className="p-6 rounded-[2rem] border border-slate-100 bg-slate-50 space-y-4 opacity-70">
                      <div className="flex items-center justify-between">
                        <CreditCard className="w-6 h-6 text-slate-400" />
                        <div className="w-4 h-4 rounded-full border border-slate-200" />
                      </div>
                      <div className="font-bold text-slate-900">Digital Card</div>
                      <p className="text-[10px] text-slate-500 font-medium">Standard processing simulation.</p>
                   </div>
                </div>

                <div className="p-6 rounded-2xl bg-slate-900 text-white relative overflow-hidden group cursor-pointer" onClick={() => (document.getElementById('checkout-form') as HTMLFormElement).requestSubmit()}>
                   <div className="relative z-10 flex items-center justify-between">
                      <div>
                        <div className="text-sm font-bold opacity-70 mb-1">Click to start</div>
                        <div className="text-xl font-black italic tracking-tighter">Safe Simulation</div>
                      </div>
                      <Sparkles className="w-8 h-8 text-white opacity-50" />
                   </div>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full stripe-btn-primary py-5 text-xl font-bold flex items-center justify-center group"
              >
                {loading ? 'Starting Simulation...' : `Confirm & Pay ₹${orderTotal.toFixed(2)}`}
                {!loading && <ChevronRight className="w-6 h-6 ml-2 group-hover:translate-x-1 transition-transform" />}
              </button>
            </form>

            <div className="flex items-center justify-center space-x-6 pt-4 opacity-50 grayscale hover:grayscale-0 transition-all font-bold text-[10px] text-slate-400 uppercase tracking-widest">
                <div className="flex items-center space-x-2"><ShieldCheck className="w-4 h-4" /> <span>No Personal Data Stored</span></div>
                <div className="flex items-center space-x-2"><Lock className="w-4 h-4 text-emerald-500" /> <span>Developer Demo Mode</span></div>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="bg-white p-10 rounded-[3.5rem] border border-white shadow-sm sticky top-32 space-y-8">
              <h3 className="text-xl font-bold text-slate-900 tracking-tight">Order Summary</h3>
              
              <div className="space-y-6 max-h-[400px] overflow-y-auto pr-2 scrollbar-hide">
                {items.map((item) => (
                  <div key={item.id} className="flex gap-4 group">
                    <div className="relative h-20 w-20 bg-slate-50 rounded-2xl border border-slate-50 group-hover:border-stripe-blurple/20 transition-all overflow-hidden shrink-0">
                      {item.products?.image_url ? (
                        <Image
                          src={item.products.image_url}
                          alt={item.products.name}
                          fill
                          className="object-cover"
                        />
                      ) : (
                        <div className="flex items-center justify-center h-full text-slate-300">
                          <Package className="w-8 h-8 opacity-20" />
                        </div>
                      )}
                      <div className="absolute -top-1 -right-1 bg-slate-900 text-white text-[10px] font-black w-6 h-6 rounded-full flex items-center justify-center shadow-lg">
                        {item.quantity}
                      </div>
                    </div>
                    <div className="flex-1 min-w-0 flex flex-col justify-center">
                      <p className="text-sm font-bold text-slate-900 line-clamp-2 leading-tight mb-1 group-hover:text-stripe-blurple transition-colors">
                        {item.products?.name}
                      </p>
                      <p className="text-xs text-slate-400 font-bold uppercase tracking-widest">
                        ₹{(item.products?.price || 0).toFixed(2)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="space-y-4 pt-8 border-t border-slate-50">
                <div className="flex justify-between text-sm font-medium text-slate-500">
                  <span>Subtotal</span>
                  <span className="text-slate-900 font-bold">₹{subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm font-medium text-slate-500">
                  <span>Virtual Shipping</span>
                  <span className="text-emerald-500 font-black tracking-widest uppercase text-[10px]">Free</span>
                </div>
                <div className="flex justify-between text-sm font-medium text-slate-500">
                  <span>Simulated Tax</span>
                  <span className="text-slate-900 font-bold">₹{tax.toFixed(2)}</span>
                </div>
              </div>

              <div className="pt-8 border-t border-slate-900/5">
                <div className="flex justify-between items-end">
                   <div>
                      <div className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-1">Final Amount</div>
                      <div className="text-4xl font-black text-slate-900 tracking-tighter">₹{orderTotal.toFixed(2)}</div>
                   </div>
                   <div className="text-xs font-bold text-stripe-blurple">INR</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
