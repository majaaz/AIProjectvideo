'use client'

import { motion } from 'framer-motion'
import { 
  TrendingUp, 
  Users, 
  Package, 
  DollarSign, 
  ArrowUpRight, 
  ArrowDownRight,
  MoreHorizontal,
  Plus,
  ShoppingBag,
  Sparkles
} from 'lucide-react'
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  AreaChart,
  Area
} from 'recharts'
import Link from 'next/link'

const data = [
  { name: 'Mon', sales: 4000, orders: 24 },
  { name: 'Tue', sales: 3000, orders: 13 },
  { name: 'Wed', sales: 2000, orders: 98 },
  { name: 'Thu', sales: 2780, orders: 39 },
  { name: 'Fri', sales: 1890, orders: 48 },
  { name: 'Sat', sales: 2390, orders: 38 },
  { name: 'Sun', sales: 3490, orders: 43 },
]

const recentOrders = [
  { id: '1', customer: 'Alice Smith', total: 129.99, status: 'Completed', date: '2 mins ago' },
  { id: '2', customer: 'Bob Johnson', total: 45.50, status: 'Processing', date: '1 hour ago' },
  { id: '3', customer: 'Charlie Brown', total: 890.00, status: 'Completed', date: '3 hours ago' },
  { id: '4', customer: 'Diana Prince', total: 24.99, status: 'Cancelled', date: '5 hours ago' },
]

export default function SellerDashboard() {
  return (
    <div className="space-y-10 pb-20">
      {/* Welcome Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h2 className="text-3xl font-bold text-slate-900 tracking-tight">Daily Summary</h2>
          <p className="text-slate-500 font-medium">Keep tracking your sales and product performance.</p>
        </div>
        <div className="flex gap-4">
          <Link href="/seller/products/new">
            <button className="stripe-btn-primary flex items-center px-6">
              <Plus className="w-5 h-5 mr-2" />
              Add Product
            </button>
          </Link>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: 'Total Revenue', value: '$45,231', icon: DollarSign, trend: '+12.5%', isUp: true },
          { label: 'Active Orders', value: '42', icon: ShoppingBag, trend: '+3.2%', isUp: true },
          { label: 'Customers', value: '1,283', icon: Users, trend: '-2.1%', isUp: false },
          { label: 'Conversion Rate', value: '4.8%', icon: TrendingUp, trend: '+0.5%', isUp: true },
        ].map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="bg-white p-6 rounded-[2rem] border border-white shadow-sm hover:shadow-md transition-all"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-600">
                <stat.icon className="w-6 h-6" />
              </div>
              <div className={`flex items-center text-xs font-bold px-2 py-1 rounded-full ${stat.isUp ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600'}`}>
                {stat.isUp ? <ArrowUpRight className="w-3 h-3 mr-1" /> : <ArrowDownRight className="w-3 h-3 mr-1" />}
                {stat.trend}
              </div>
            </div>
            <div className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-1">{stat.label}</div>
            <div className="text-3xl font-black text-slate-900 tracking-tight">{stat.value}</div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Chart */}
        <div className="lg:col-span-2 bg-white p-8 rounded-[3rem] border border-white shadow-sm">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h3 className="text-xl font-bold text-slate-900 tracking-tight">Revenue Trend</h3>
              <p className="text-sm text-slate-400 font-medium">Monthly performance overview</p>
            </div>
             <select className="bg-slate-50 border border-slate-100 rounded-xl px-4 py-2 text-sm font-bold text-slate-600 focus:outline-none focus:ring-2 focus:ring-stripe-blurple/10">
               <option>Last 7 Days</option>
               <option>Last 30 Days</option>
             </select>
          </div>
          <div className="h-[350px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data}>
                <defs>
                  <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#635bff" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#635bff" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis 
                  dataKey="name" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: '#94a3b8', fontSize: 12, fontWeight: 600 }}
                  dy={10}
                />
                <YAxis 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: '#94a3b8', fontSize: 12, fontWeight: 600 }}
                  dx={-10}
                />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#fff', 
                    borderRadius: '20px', 
                    border: 'none', 
                    boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' 
                  }} 
                />
                <Area 
                  type="monotone" 
                  dataKey="sales" 
                  stroke="#635bff" 
                  strokeWidth={4}
                  fillOpacity={1} 
                  fill="url(#colorSales)" 
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Recent Orders */}
        <div className="bg-white p-8 rounded-[3rem] border border-white shadow-sm">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-xl font-bold text-slate-900 tracking-tight">Recent Orders</h3>
            <Link href="/seller/orders" className="text-sm font-bold text-stripe-blurple hover:underline">View All</Link>
          </div>
          <div className="space-y-6">
            {recentOrders.map((order) => (
              <div key={order.id} className="flex items-center justify-between p-4 rounded-2xl hover:bg-slate-50 transition-colors border border-transparent hover:border-slate-100">
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 font-bold mr-4">
                    {order.customer.charAt(0)}
                  </div>
                  <div>
                    <div className="text-sm font-bold text-slate-900">{order.customer}</div>
                    <div className="text-xs text-slate-400">{order.date}</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-bold text-slate-900">${order.total.toFixed(2)}</div>
                  <div className={`text-[10px] font-black uppercase tracking-widest ${
                    order.status === 'Completed' ? 'text-emerald-500' : 
                    order.status === 'Processing' ? 'text-amber-500' : 'text-rose-500'
                  }`}>
                    {order.status}
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-8 pt-8 border-t border-slate-50">
             <div className="p-6 rounded-2xl bg-slate-900 text-white relative overflow-hidden">
                <div className="relative z-10">
                  <h4 className="font-bold mb-2">Grow your business</h4>
                  <p className="text-xs text-slate-400 mb-4 tracking-tight">Get expert tips on how to improve your store's sales.</p>
                  <button className="text-xs font-bold uppercase tracking-widest hover:underline">Read more</button>
                </div>
                <Sparkles className="absolute top-[-20%] right-[-10%] w-32 h-32 text-white opacity-5 rotate-12" />
             </div>
          </div>
        </div>
      </div>
    </div>
  )
}
