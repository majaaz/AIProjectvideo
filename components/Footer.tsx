'use client'

import Link from 'next/link'
import { Sparkles, Twitter, Instagram, Github, Linkedin, Mail } from 'lucide-react'
import { motion } from 'framer-motion'

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-white border-t border-slate-100 pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-20">
          {/* Brand Section */}
          <div className="space-y-6">
            <Link href="/" className="inline-flex items-center group">
              <motion.div 
                whileHover={{ rotate: 10, scale: 1.1 }}
                className="w-10 h-10 bg-stripe-blurple rounded-xl flex items-center justify-center shadow-lg"
              >
                <Sparkles className="w-6 h-6 text-white" />
              </motion.div>
              <span className="ml-3 text-2xl font-black text-slate-900 tracking-tighter">NovaCart</span>
            </Link>
            <p className="text-sm text-slate-500 font-medium leading-relaxed max-w-xs">
              Redefining the digital marketplace with immersive 3D technology and premium AI-powered support.
            </p>
            <div className="flex items-center space-x-4">
               {[Twitter, Instagram, Github, Linkedin].map((Icon, i) => (
                 <motion.a 
                   key={i}
                   href="#" 
                   whileHover={{ y: -3, color: '#635bff' }}
                   className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-slate-400 transition-colors"
                 >
                   <Icon className="w-5 h-5" />
                 </motion.a>
               ))}
            </div>
          </div>

          {/* Links Section 1 */}
          <div>
            <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-8">Marketplace</h3>
            <ul className="space-y-4">
              <li><Link href="/search" className="text-sm font-bold text-slate-600 hover:text-stripe-blurple transition-colors">All Products</Link></li>
              <li><Link href="/search?category=Electronics" className="text-sm font-bold text-slate-600 hover:text-stripe-blurple transition-colors">Electronics</Link></li>
              <li><Link href="/search?category=Fashion" className="text-sm font-bold text-slate-600 hover:text-stripe-blurple transition-colors">Fashion</Link></li>
              <li><Link href="/search?category=Home" className="text-sm font-bold text-slate-600 hover:text-stripe-blurple transition-colors">Home & Living</Link></li>
            </ul>
          </div>

          {/* Links Section 2 */}
          <div>
            <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-8">Business</h3>
            <ul className="space-y-4">
              <li><Link href="/auth/register" className="text-sm font-bold text-slate-600 hover:text-stripe-blurple transition-colors">Become a Seller</Link></li>
              <li><Link href="/seller/dashboard" className="text-sm font-bold text-slate-600 hover:text-stripe-blurple transition-colors">Seller Dashboard</Link></li>
              <li><Link href="/affiliate" className="text-sm font-bold text-slate-600 hover:text-stripe-blurple transition-colors">Affiliate Program</Link></li>
              <li><Link href="/advertise" className="text-sm font-bold text-slate-600 hover:text-stripe-blurple transition-colors">Advertise With Us</Link></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="space-y-6">
            <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-2">Stay Updated</h3>
            <p className="text-xs text-slate-500 font-medium">Join our newsletter for the latest premium drops and 3D features.</p>
            <div className="relative group">
               <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300 group-focus-within:text-stripe-blurple transition-colors" />
               <input 
                 type="email" 
                 placeholder="your@email.com" 
                 className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:ring-4 focus:ring-stripe-blurple/5 transition-all text-sm font-medium"
               />
            </div>
          </div>
        </div>

        <div className="pt-10 border-t border-slate-50 flex flex-col md:flex-row items-center justify-between gap-6">
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
            © {currentYear} NovaCart Technologies Inc. All rights reserved.
          </p>
          <div className="flex items-center space-x-8">
            <Link href="/privacy" className="text-[10px] font-bold text-slate-400 hover:text-slate-900 uppercase tracking-widest transition-colors">Privacy</Link>
            <Link href="/terms" className="text-[10px] font-bold text-slate-400 hover:text-slate-900 uppercase tracking-widest transition-colors">Terms</Link>
            <Link href="/cookies" className="text-[10px] font-bold text-slate-400 hover:text-slate-900 uppercase tracking-widest transition-colors">Cookies</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
