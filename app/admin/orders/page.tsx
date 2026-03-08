'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Search, Filter, Package, Truck, CheckCircle, XCircle, Clock } from 'lucide-react'

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState([
    { id: 'ORD001', customer: 'John Doe', email: 'john@example.com', total: 129.99, status: 'pending', items: 2, date: '2024-01-15' },
    { id: 'ORD002', customer: 'Jane Smith', email: 'jane@example.com', total: 89.99, status: 'processing', items: 1, date: '2024-01-15' },
    { id: 'ORD003', customer: 'Bob Wilson', email: 'bob@example.com', total: 249.99, status: 'shipped', items: 3, date: '2024-01-14' },
    { id: 'ORD004', customer: 'Alice Brown', email: 'alice@example.com', total: 59.99, status: 'delivered', items: 1, date: '2024-01-14' },
    { id: 'ORD005', customer: 'Charlie Davis', email: 'charlie@example.com', total: 179.99, status: 'cancelled', items: 2, date: '2024-01-13' },
    { id: 'ORD006', customer: 'Eva Martinez', email: 'eva@example.com', total: 399.99, status: 'pending', items: 4, date: '2024-01-13' },
  ])

  const [statusFilter, setStatusFilter] = useState('')
  const [searchQuery, setSearchQuery] = useState('')

  const filteredOrders = orders.filter(o => {
    if (statusFilter && o.status !== statusFilter) return false
    if (searchQuery && !o.id.toLowerCase().includes(searchQuery.toLowerCase()) && !o.customer.toLowerCase().includes(searchQuery.toLowerCase())) return false
    return true
  })

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending': return <Clock className="w-4 h-4 text-yellow-500" />
      case 'processing': return <Package className="w-4 h-4 text-blue-500" />
      case 'shipped': return <Truck className="w-4 h-4 text-purple-500" />
      case 'delivered': return <CheckCircle className="w-4 h-4 text-green-500" />
      case 'cancelled': return <XCircle className="w-4 h-4 text-red-500" />
      default: return null
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800'
      case 'processing': return 'bg-blue-100 text-blue-800'
      case 'shipped': return 'bg-purple-100 text-purple-800'
      case 'delivered': return 'bg-green-100 text-green-800'
      case 'cancelled': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const updateOrderStatus = (orderId: string, newStatus: string) => {
    setOrders(orders.map(o => o.id === orderId ? { ...o, status: newStatus } : o))
  }

  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 py-6">
        <h1 className="text-2xl font-bold mb-6">Orders</h1>

        {/* Filters */}
        <div className="bg-white p-4 rounded-sm border border-gray-200 mb-6">
          <div className="flex flex-wrap gap-4">
            <div className="flex-1 min-w-[200px]">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search orders..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-sm focus:outline-none focus:border-amazon-orange"
                />
              </div>
            </div>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-sm focus:outline-none focus:border-amazon-orange"
            >
              <option value="">All Status</option>
              <option value="pending">Pending</option>
              <option value="processing">Processing</option>
              <option value="shipped">Shipped</option>
              <option value="delivered">Delivered</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>
        </div>

        {/* Orders Table */}
        <div className="bg-white rounded-sm border border-gray-200 overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-left px-6 py-3 text-sm font-medium text-gray-600">Order ID</th>
                <th className="text-left px-6 py-3 text-sm font-medium text-gray-600">Customer</th>
                <th className="text-left px-6 py-3 text-sm font-medium text-gray-600">Items</th>
                <th className="text-left px-6 py-3 text-sm font-medium text-gray-600">Total</th>
                <th className="text-left px-6 py-3 text-sm font-medium text-gray-600">Status</th>
                <th className="text-left px-6 py-3 text-sm font-medium text-gray-600">Date</th>
                <th className="text-right px-6 py-3 text-sm font-medium text-gray-600">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredOrders.map((order) => (
                <tr key={order.id} className="border-t border-gray-200 hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <span className="font-medium">#{order.id}</span>
                  </td>
                  <td className="px-6 py-4">
                    <p className="font-medium">{order.customer}</p>
                    <p className="text-sm text-gray-500">{order.email}</p>
                  </td>
                  <td className="px-6 py-4 text-sm">{order.items} items</td>
                  <td className="px-6 py-4 font-medium">${order.total.toFixed(2)}</td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                      {getStatusIcon(order.status)}
                      {order.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">{order.date}</td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      {/* Status Update Dropdown */}
                      {order.status !== 'delivered' && order.status !== 'cancelled' && (
                        <select
                          value={order.status}
                          onChange={(e) => updateOrderStatus(order.id, e.target.value)}
                          className="text-sm border border-gray-300 rounded-sm px-2 py-1"
                        >
                          <option value="pending">Pending</option>
                          <option value="processing">Processing</option>
                          <option value="shipped">Shipped</option>
                          <option value="delivered">Delivered</option>
                          <option value="cancelled">Cancelled</option>
                        </select>
                      )}
                      <button className="text-amazon-orange hover:underline text-sm">
                        View
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
