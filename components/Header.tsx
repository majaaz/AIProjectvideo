'use client'

import Link from 'next/link'
import { Search, ShoppingCart, User, Menu } from 'lucide-react'
import { useCart } from '@/context/CartContext'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export function Header() {
  const { itemCount } = useCart()
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      window.location.href = `/search?q=${encodeURIComponent(searchQuery)}`
    }
  }

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      className={`fixed top-4 left-4 right-4 z-50 transition-all duration-300 ${
        scrolled ? 'bg-white/80 backdrop-blur-md shadow-stripe' : 'bg-transparent'
      } rounded-full border border-white/20`}
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo */}
          <Link href="/" className="flex items-center group">
            <motion.div 
              whileHover={{ rotate: 5, scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-10 h-10 bg-stripe-blurple rounded-xl flex items-center justify-center shadow-lg"
            >
              <span className="text-xl font-bold text-white tracking-tighter">S</span>
            </motion.div>
            <span className="ml-3 text-xl font-bold text-slate-800 tracking-tight group-hover:text-stripe-blurple transition-colors">
              Commerce
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-8 text-sm font-medium text-slate-600">
            {[
              { name: 'All Products', href: '/search' },
              { name: 'Electronics', href: '/search?category=electronics' },
              { name: 'Fashion', href: '/search?category=fashion' },
              { name: 'Deals', href: '/search?deals=true' }
            ].map((item) => (
              <Link key={item.name} href={item.href}>
                <motion.div whileHover={{ y: -2 }} className="cursor-pointer hover:text-stripe-blurple transition-colors">
                  {item.name}
                </motion.div>
              </Link>
            ))}
          </div>

          {/* Right side icons */}
          <div className="flex items-center space-x-4 md:space-x-6">
            
            {/* Search */}
            <form onSubmit={handleSearch} className="hidden md:flex items-center relative group">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 group-hover:text-stripe-blurple transition-colors" />
              <input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9 pr-4 py-2 bg-slate-100/50 hover:bg-slate-100 focus:bg-white text-slate-800 rounded-full border border-transparent focus:border-stripe-blurple/30 focus:outline-none focus:ring-4 focus:ring-stripe-blurple/10 transition-all text-sm w-48 focus:w-64"
              />
            </form>

            <Link href="/auth/login" className="hidden md:block">
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="text-sm font-semibold text-slate-600 hover:text-slate-900 transition-colors"
              >
                Sign in
              </motion.button>
            </Link>

            {/* Cart */}
            <Link href="/cart">
              <motion.div 
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.9 }}
                className="relative p-2 bg-slate-100 rounded-full text-slate-600 hover:text-stripe-blurple hover:bg-stripe-blurple/10 transition-colors"
              >
                <ShoppingCart className="w-5 h-5" />
                <AnimatePresence>
                  {itemCount > 0 && (
                    <motion.span 
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0, opacity: 0 }}
                      className="absolute -top-1 -right-1 bg-stripe-pink text-white font-bold rounded-full w-4 h-4 flex items-center justify-center text-[10px] shadow-sm"
                    >
                      {itemCount}
                    </motion.span>
                  )}
                </AnimatePresence>
              </motion.div>
            </Link>

            {/* Mobile menu button */}
            <button
              className="md:hidden p-2 text-slate-600"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-t border-slate-100 overflow-hidden rounded-b-2xl shadow-xl absolute top-full left-0 right-0 mt-2"
          >
            <div className="p-6 space-y-4">
              <Link href="/auth/login" className="block text-slate-700 font-medium hover:text-stripe-blurple">Sign In</Link>
              <Link href="/cart" className="block text-slate-700 font-medium hover:text-stripe-blurple">Cart ({itemCount})</Link>
              <div className="pt-4 border-t border-slate-100">
                 <form onSubmit={handleSearch} className="flex items-center relative">
                  <Search className="w-5 h-5 text-slate-400 absolute left-3" />
                  <input
                    type="text"
                    placeholder="Search..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 bg-slate-50 text-slate-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-stripe-blurple/20"
                  />
                </form>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}
