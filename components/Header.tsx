'use client'

import Link from 'next/link'
import { Search, ShoppingCart, User, Menu } from 'lucide-react'
import { useCart } from '@/context/CartContext'
import { useState, useEffect } from 'react'

export function Header() {
  const { itemCount } = useCart()
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 0)
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
    <header className="sticky top-0 z-50">
      {/* Top bar - Amazon Blue */}
      <div className="bg-amazon-blue text-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center">
              <span className="text-2xl font-bold italic">SHOP</span>
            </Link>

            {/* Search bar */}
            <form onSubmit={handleSearch} className="flex-1 max-w-2xl mx-4 hidden md:flex">
              <div className="flex w-full">
                <div className="relative flex-1">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search Amazon"
                    className="w-full px-4 py-2 text-gray-800 rounded-l-md focus:outline-none"
                  />
                </div>
                <button
                  type="submit"
                  className="bg-amazon-orange hover:bg-amazon-orange-hover px-6 rounded-r-md flex items-center justify-center"
                >
                  <Search className="w-5 h-5 text-gray-800" />
                </button>
              </div>
            </form>

            {/* Right side icons */}
            <div className="flex items-center space-x-4 md:space-x-6">
              {/* Mobile menu button */}
              <button
                className="md:hidden p-2"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                <Menu className="w-6 h-6" />
              </button>

              {/* Account */}
              <Link href="/auth/login" className="hidden md:block group">
                <div className="text-xs">Hello, sign in</div>
                <div className="font-bold text-sm">Account & Lists</div>
              </Link>

              {/* Orders */}
              <Link href="/account/orders" className="hidden md:block">
                <div className="text-xs">Returns</div>
                <div className="font-bold text-sm">& Orders</div>
              </Link>

              {/* Cart */}
              <Link href="/cart" className="flex items-center relative">
                <div className="relative">
                  <ShoppingCart className="w-8 h-8" />
                  {itemCount > 0 && (
                    <span className="absolute -top-2 -right-2 bg-amazon-orange text-gray-800 font-bold rounded-full w-5 h-5 flex items-center justify-center text-xs">
                      {itemCount}
                    </span>
                  )}
                </div>
                <span className="font-bold hidden md:block">Cart</span>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Category nav */}
      <div className="bg-amazon-blue-light text-white text-sm">
        <div className="max-w-7xl mx-auto px-4 py-2 flex items-center space-x-6 overflow-x-auto">
          <Link href="/" className="hover:underline whitespace-nowrap flex items-center">
            <Menu className="w-4 h-4 mr-1" />
            All
          </Link>
          <Link href="/search?category=electronics" className="hover:underline whitespace-nowrap">
            Electronics
          </Link>
          <Link href="/search?category=fashion" className="hover:underline whitespace-nowrap">
            Fashion
          </Link>
          <Link href="/search?category=home" className="hover:underline whitespace-nowrap">
            Home & Kitchen
          </Link>
          <Link href="/search?category=sports" className="hover:underline whitespace-nowrap">
            Sports
          </Link>
          <Link href="/search?category=books" className="hover:underline whitespace-nowrap">
            Books
          </Link>
          <Link href="/search?category=toys" className="hover:underline whitespace-nowrap">
            Toys & Games
          </Link>
          <Link href="/search?category=beauty" className="hover:underline whitespace-nowrap">
            Beauty & Health
          </Link>
        </div>
      </div>

      {/* Mobile search */}
      <div className="md:hidden bg-amazon-blue px-4 py-2">
        <form onSubmit={handleSearch} className="flex">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search Amazon"
            className="flex-1 px-4 py-2 text-gray-800 rounded-l-md focus:outline-none"
          />
          <button
            type="submit"
            className="bg-amazon-orange hover:bg-amazon-orange-hover px-4 rounded-r-md"
          >
            <Search className="w-5 h-5 text-gray-800" />
          </button>
        </form>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-amazon-blue-light text-white p-4">
          <Link href="/auth/login" className="block py-2 hover:underline">
            Sign In
          </Link>
          <Link href="/account/orders" className="block py-2 hover:underline">
            Orders
          </Link>
          <Link href="/account" className="block py-2 hover:underline">
            Account
          </Link>
        </div>
      )}
    </header>
  )
}
