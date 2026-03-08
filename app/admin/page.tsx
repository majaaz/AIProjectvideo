'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Package, DollarSign, ShoppingCart, AlertTriangle, TrendingUp, Users } from 'lucide-react'
import {
  LineChart, Line, BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, AreaChart, Area
} from 'recharts'

interface AnalyticsData {
  revenueData: any[]
  topProducts: any[]
  customerData: any[]
}

export default function AdminDashboard() {
  const [revenueData, setRevenueData] = useState<any[]>([])
  const [topProducts, setTopProducts] = useState<any[]>([])
  const [customerData, setCustomerData] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  // Hardcoded for overall stats
  const [stats, setStats] = useState({
    totalRevenue: 12450.89,
    ordersCount: 156,
    pendingOrders: 23,
    lowStockItems: 5,
  })

  useEffect(() => {
    async function fetchAnalytics() {
      try {
        const [revRes, prodRes, custRes] = await Promise.all([
          fetch('/api/analytics/revenue'),
          fetch('/api/analytics/top-products'),
          fetch('/api/analytics/customers')
        ])

        const rev = await revRes.json()
        const prod = await prodRes.json()
        const cust = await custRes.json()

        if (rev.data) setRevenueData(rev.data)
        if (prod.data) setTopProducts(prod.data)
        if (cust.data) setCustomerData(cust.data)
      } catch (err) {
        console.error('Failed to load analytics', err)
      } finally {
        setLoading(false)
      }
    }
    fetchAnalytics()
  }, [])

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8']

  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 py-6">
        <h1 className="text-2xl font-bold mb-6">Admin Analytics Dashboard</h1>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
          <div className="bg-white p-6 rounded-sm border border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-gray-600 text-sm font-medium">Total Revenue</h3>
              <DollarSign className="w-5 h-5 text-green-500" />
            </div>
            <p className="text-2xl font-bold">${stats.totalRevenue.toLocaleString()}</p>
          </div>
          <div className="bg-white p-6 rounded-sm border border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-gray-600 text-sm font-medium">Total Orders</h3>
              <ShoppingCart className="w-5 h-5 text-blue-500" />
            </div>
            <p className="text-2xl font-bold">{stats.ordersCount}</p>
          </div>
          <div className="bg-white p-6 rounded-sm border border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-gray-600 text-sm font-medium">Pending Orders</h3>
              <Package className="w-5 h-5 text-yellow-500" />
            </div>
            <p className="text-2xl font-bold">{stats.pendingOrders}</p>
          </div>
          <div className="bg-white p-6 rounded-sm border border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-gray-600 text-sm font-medium">Low Stock Alerts</h3>
              <AlertTriangle className="w-5 h-5 text-red-500" />
            </div>
            <p className="text-2xl font-bold">{stats.lowStockItems}</p>
          </div>
        </div>

        {loading ? (
          <div className="text-center py-10">Loading AI & Analytics Data...</div>
        ) : (
          <>
            {/* Charts Section 1 */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
              {/* Revenue Trend */}
              <div className="bg-white p-6 rounded-sm border border-gray-200">
                <h2 className="text-lg font-bold mb-4">Revenue Trend (Stitch Data)</h2>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={revenueData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="date" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Line type="monotone" dataKey="revenue" stroke="#f59e0b" strokeWidth={2} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Orders Bar Chart */}
              <div className="bg-white p-6 rounded-sm border border-gray-200">
                <h2 className="text-lg font-bold mb-4">Orders Over Time</h2>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={revenueData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="date" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="orders" fill="#3b82f6" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>

            {/* Charts Section 2 */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Top Products Pie Chart */}
              <div className="bg-white p-6 rounded-sm border border-gray-200">
                <h2 className="text-lg font-bold mb-4">Top Products by Sales</h2>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={topProducts}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, percent }) => `${name?.substring(0, 10) || ''}... ${((percent || 0) * 100).toFixed(0)}%`}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="sales"
                      >
                        {topProducts.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Customer Acquisition Funnel (Area Chart) */}
              <div className="bg-white p-6 rounded-sm border border-gray-200">
                <h2 className="text-lg font-bold mb-4">Customer Acquisition & Retention</h2>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={customerData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Area type="monotone" dataKey="new" stackId="1" stroke="#8884d8" fill="#8884d8" name="New Customers" />
                      <Area type="monotone" dataKey="returning" stackId="1" stroke="#82ca9d" fill="#82ca9d" name="Returning" />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
