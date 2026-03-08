import Link from 'next/link'
import { CheckCircle } from 'lucide-react'

export default function CheckoutSuccessPage() {
  const orderNumber = `ORD-${Date.now().toString(36).toUpperCase()}`

  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="max-w-2xl mx-auto px-4 py-12">
        <div className="bg-white p-8 rounded-sm border border-gray-200 text-center">
          <div className="flex justify-center mb-4">
            <CheckCircle className="w-16 h-16 text-green-500" />
          </div>
          <h1 className="text-2xl font-bold mb-2">Order Placed Successfully!</h1>
          <p className="text-gray-600 mb-4">
            Thank you for your order. We've sent a confirmation email with your order details.
          </p>
          <div className="bg-gray-100 p-4 rounded-sm mb-6">
            <p className="text-sm text-gray-600">Order Number</p>
            <p className="text-lg font-bold">{orderNumber}</p>
          </div>
          <div className="space-y-3">
            <Link href="/account/orders" className="amazon-btn-primary block">
              View Order Details
            </Link>
            <Link href="/" className="amazon-btn-secondary block">
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
