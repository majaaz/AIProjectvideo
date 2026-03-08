'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useCart } from '@/context/CartContext'
import { Minus, Plus, Trash2, ArrowRight } from 'lucide-react'

export default function CartPage() {
  const { items, removeItem, updateQuantity, total } = useCart()

  const subtotal = total
  const tax = subtotal * 0.08 // 8% tax estimate
  const shipping = subtotal >= 35 ? 0 : 5.99
  const orderTotal = subtotal + tax + shipping

  if (items.length === 0) {
    return (
      <div className="bg-gray-100 min-h-screen">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <h1 className="text-2xl font-bold mb-6">Shopping Cart</h1>
          <div className="bg-white p-8 rounded-sm border border-gray-200 text-center">
            <div className="text-6xl mb-4">🛒</div>
            <h2 className="text-xl font-semibold mb-2">Your cart is empty</h2>
            <p className="text-gray-600 mb-6">Looks like you haven't added anything to your cart yet.</p>
            <Link href="/" className="amazon-btn-primary inline-block">
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 py-6">
        <h1 className="text-2xl font-bold mb-6">Shopping Cart</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {items.map((item) => (
              <div key={item.id} className="bg-white p-4 rounded-sm border border-gray-200">
                <div className="flex gap-4">
                  {/* Product Image */}
                  <div className="relative h-32 w-32 flex-shrink-0 bg-gray-100 rounded-sm">
                    {item.products?.images && item.products.images.length > 0 ? (
                      <Image
                        src={item.products.images[0]}
                        alt={item.products.title}
                        fill
                        className="object-contain p-2"
                      />
                    ) : (
                      <div className="flex items-center justify-center h-full text-gray-400">
                        No image
                      </div>
                    )}
                  </div>

                  {/* Product Info */}
                  <div className="flex-1">
                    <Link href={`/products/${item.product_id}`} className="hover:text-amazon-orange">
                      <h3 className="font-medium line-clamp-2 mb-1">{item.products?.title}</h3>
                    </Link>
                    <p className="text-lg font-bold mb-2">
                      ${(item.products?.price || 0).toFixed(2)}
                    </p>
                    <p className="text-sm text-green-600 mb-3">
                      {item.products?.stock_quantity && item.products.stock_quantity > 0
                        ? 'In Stock'
                        : 'Out of Stock'}
                    </p>

                    {/* Quantity Controls */}
                    <div className="flex items-center gap-4">
                      <div className="flex items-center border border-gray-300 rounded-sm">
                        <button
                          onClick={() => updateQuantity(item.product_id, item.quantity - 1)}
                          className="px-3 py-1 hover:bg-gray-100"
                        >
                          <Minus className="w-4 h-4" />
                        </button>
                        <span className="px-3 py-1 min-w-[40px] text-center">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.product_id, item.quantity + 1)}
                          className="px-3 py-1 hover:bg-gray-100"
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>
                      <button
                        onClick={() => removeItem(item.product_id)}
                        className="text-red-600 hover:underline text-sm flex items-center gap-1"
                      >
                        <Trash2 className="w-4 h-4" />
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white p-6 rounded-sm border border-gray-200 sticky top-4">
              <h2 className="text-lg font-bold mb-4">Order Summary</h2>

              <div className="space-y-2 text-sm mb-4">
                <div className="flex justify-between">
                  <span>Subtotal ({items.length} items)</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span>
                    {shipping === 0 ? (
                      <span className="text-green-600">FREE</span>
                    ) : (
                      `$${shipping.toFixed(2)}`
                    )}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Estimated Tax</span>
                  <span>${tax.toFixed(2)}</span>
                </div>
                {shipping > 0 && (
                  <div className="text-xs text-gray-600">
                    Free shipping on orders over $35
                  </div>
                )}
              </div>

              <div className="border-t border-gray-200 pt-4 mb-4">
                <div className="flex justify-between font-bold text-lg">
                  <span>Order Total</span>
                  <span>${orderTotal.toFixed(2)}</span>
                </div>
              </div>

              <Link
                href="/checkout"
                className="amazon-btn-primary w-full py-3 text-center block text-base"
              >
                Proceed to Checkout
              </Link>

              <Link
                href="/"
                className="block text-center mt-4 text-sm text-amazon-orange hover:underline"
              >
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
