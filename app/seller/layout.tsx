'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { 
  LayoutDashboard, 
  Package, 
  ShoppingBag, 
  Settings, 
  LogOut, 
  Sparkles,
  ChevronLeft,
  ChevronRight,
  User
} from 'lucide-react'
import { useState } from 'react'
import { motion } from 'framer-motion'

const navItems = [
  { name: 'Overview', href: '/seller/dashboard', icon: LayoutDashboard },
  { name: 'My Products', href: '/seller/products', icon: Package },
  { name: 'Orders', href: '/seller/orders', icon: ShoppingBag },
  { name: 'Settings', href: '/seller/settings', icon: Settings },
]

export default function SellerLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const [collapsed, setCollapsed] = useState(false)

  return (
    <div className="min-h-screen bg-[#F6F9FC] flex">
      {/* Sidebar */}
      <motion.aside 
        animate={{ width: collapsed ? 80 : 280 }}
        className="fixed left-0 top-0 bottom-0 bg-white border-r border-slate-100 flex flex-col z-50 transition-all duration-300"
      >
        <div className="p-6 flex items-center justify-between border-b border-slate-50">
          {!collapsed && (
            <Link href="/" className="inline-flex items-center">
              <Sparkles className="w-6 h-6 text-stripe-blurple mr-2" />
              <span className="text-xl font-bold text-slate-900 tracking-tight">NovaCart</span>
              <span className="ml-2 px-2 py-0.5 rounded-full bg-stripe-blurple/10 text-[10px] font-bold text-stripe-blurple uppercase tracking-widest">Seller</span>
            </Link>
          )}
          {collapsed && <Sparkles className="w-6 h-6 text-stripe-blurple mx-auto" />}
        </div>

        <nav className="flex-1 p-4 space-y-2 mt-4">
          {navItems.map((item) => {
            const isActive = pathname === item.href
            return (
              <Link key={item.name} href={item.href}>
                <div className={`flex items-center p-3 rounded-2xl transition-all group ${
                  isActive 
                    ? 'bg-stripe-blurple text-white shadow-md' 
                    : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'
                }`}>
                  <item.icon className={`w-5 h-5 ${collapsed ? 'mx-auto' : 'mr-3'}`} />
                  {!collapsed && <span className="text-sm font-bold tracking-tight">{item.name}</span>}
                  {isActive && !collapsed && (
                    <motion.div layoutId="activeNav" className="ml-auto w-1.5 h-1.5 rounded-full bg-white" />
                  )}
                </div>
              </Link>
            )
          })}
        </nav>

        <div className="p-4 border-t border-slate-50 space-y-2">
           <button 
             onClick={() => setCollapsed(!collapsed)}
             className="w-full flex items-center p-3 rounded-2xl text-slate-400 hover:bg-slate-50 hover:text-slate-900 transition-all"
           >
             {collapsed ? <ChevronRight className="w-5 h-5 mx-auto" /> : (
               <>
                 <ChevronLeft className="w-5 h-5 mr-3" />
                 <span className="text-sm font-bold tracking-tight">Collapse</span>
               </>
             )}
           </button>
           <Link href="/logout" className="w-full flex items-center p-3 rounded-2xl text-slate-400 hover:bg-rose-50 hover:text-rose-600 transition-all">
             <LogOut className={`w-5 h-5 ${collapsed ? 'mx-auto' : 'mr-3'}`} />
             {!collapsed && <span className="text-sm font-bold tracking-tight">Logout</span>}
           </Link>
        </div>
      </motion.aside>

      {/* Main Content */}
      <main className={`flex-1 transition-all duration-300 ${collapsed ? 'ml-20' : 'ml-[280px]'}`}>
        <header className="h-20 bg-white/80 backdrop-blur-md border-b border-white shadow-sm sticky top-0 z-40 flex items-center justify-between px-8">
           <div className="text-sm font-bold text-slate-400 uppercase tracking-widest">
             Seller Workspace
           </div>
           <div className="flex items-center space-x-6">
              <div className="text-right hidden sm:block">
                <div className="text-sm font-bold text-slate-900 underline decoration-stripe-blurple/30">John Doe</div>
                <div className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Pro Seller</div>
              </div>
              <div className="w-10 h-10 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-400 overflow-hidden">
                <User className="w-6 h-6" />
              </div>
           </div>
        </header>

        <div className="p-8 max-w-7xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  )
}
