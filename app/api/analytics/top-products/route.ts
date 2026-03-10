import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function GET() {
  try {
    // Note: In a real setup, query the Stitch replicated data warehouse using `pg`
    // Example: SELECT p.name, SUM(oi.quantity) as sales FROM order_items oi JOIN products p ...
    
    // Fallback mock data for the dashboard
    const topProducts = [
      { name: 'Wireless Headphones', sales: 120, revenue: 11998.80 },
      { name: 'Smart Watch Pro', sales: 85, revenue: 16999.15 },
      { name: 'Bluetooth Speaker', sales: 60, revenue: 4799.40 },
      { name: 'Mechanical Keyboard', sales: 45, revenue: 6749.55 },
      { name: 'USB-C Hub', sales: 150, revenue: 4498.50 },
    ]

    return NextResponse.json({ data: topProducts })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch top products' }, { status: 500 })
  }
}
