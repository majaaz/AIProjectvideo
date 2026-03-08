'use client'

import Link from 'next/link'

export function Footer() {
  return (
    <footer className="bg-amazon-blue text-white">
      {/* Back to top button */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className="w-full bg-amazon-blue-light hover:bg-[#37475A] py-4 text-center text-sm transition-colors"
      >
        Back to top
      </button>

      <div className="max-w-7xl mx-auto px-4 py-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {/* Get to Know Us */}
          <div>
            <h3 className="font-bold mb-4">Get to Know Us</h3>
            <ul className="space-y-2 text-sm text-gray-300">
              <li><Link href="/about" className="hover:underline">Careers</Link></li>
              <li><Link href="/about" className="hover:underline">Blog</Link></li>
              <li><Link href="/about" className="hover:underline">About Amazon</Link></li>
              <li><Link href="/about" className="hover:underline">Investor Relations</Link></li>
              <li><Link href="/about" className="hover:underline">Amazon Devices</Link></li>
              <li><Link href="/about" className="hover:underline">Amazon Science</Link></li>
            </ul>
          </div>

          {/* Make Money with Us */}
          <div>
            <h3 className="font-bold mb-4">Make Money with Us</h3>
            <ul className="space-y-2 text-sm text-gray-300">
              <li><Link href="/sell" className="hover:underline">Sell products on Amazon</Link></li>
              <li><Link href="/sell" className="hover:underline">Sell on Amazon Business</Link></li>
              <li><Link href="/sell" className="hover:underline">Sell apps on Amazon</Link></li>
              <li><Link href="/affiliate" className="hover:underline">Become an Affiliate</Link></li>
              <li><Link href="/advertise" className="hover:underline">Advertise Your Products</Link></li>
              <li><Link href="/hosting" className="hover:underline">Host an Amazon Hub</Link></li>
            </ul>
          </div>

          {/* Amazon Payment Products */}
          <div>
            <h3 className="font-bold mb-4">Amazon Payment Products</h3>
            <ul className="space-y-2 text-sm text-gray-300">
              <li><Link href="/creditcard" className="hover:underline">Amazon Business Card</Link></li>
              <li><Link href="/points" className="hover:underline">Shop with Points</Link></li>
              <li><Link href="/reload" className="hover:underline">Reload Your Balance</Link></li>
              <li><Link href="/currency" className="hover:underline">Amazon Currency Converter</Link></li>
            </ul>
          </div>

          {/* Let Us Help You */}
          <div>
            <h3 className="font-bold mb-4">Let Us Help You</h3>
            <ul className="space-y-2 text-sm text-gray-300">
              <li><Link href="/help" className="hover:underline">Amazon and COVID-19</Link></li>
              <li><Link href="/account" className="hover:underline">Your Account</Link></li>
              <li><Link href="/orders" className="hover:underline">Your Orders</Link></li>
              <li><Link href="/shipping" className="hover:underline">Shipping Rates & Policies</Link></li>
              <li><Link href="/returns" className="hover:underline">Returns & Replacements</Link></li>
              <li><Link href="/help" className="hover:underline">Help</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-600 mt-10 pt-8 flex flex-col md:flex-row items-center justify-between">
          <div className="mb-4 md:mb-0">
            <span className="text-2xl font-bold italic">SHOP</span>
          </div>
          <div className="flex items-center space-x-4 text-sm text-gray-300">
            <Link href="/conditions" className="hover:underline">Conditions of Use</Link>
            <Link href="/privacy" className="hover:underline">Privacy Notice</Link>
            <Link href="/ads" className="hover:underline">Interest-Based Ads</Link>
          </div>
          <div className="mt-4 md:mt-0 text-sm text-gray-300">
            © 2024, Shop.com, Inc. or its affiliates
          </div>
        </div>
      </div>
    </footer>
  )
}
