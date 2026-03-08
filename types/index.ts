export type UserRole = 'customer' | 'seller' | 'admin'
export type OrderStatus = 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled'

export interface User {
  id: string
  email: string
  full_name: string | null
  avatar_url: string | null
  role: UserRole
  created_at: string
}

export interface Category {
  id: string
  name: string
  slug: string
  parent_id: string | null
  image_url: string | null
  created_at: string
}

export interface Product {
  id: string
  title: string
  description: string | null
  price: number
  compare_price: number | null
  images: string[]
  category_id: string | null
  seller_id: string | null
  stock_quantity: number
  sku: string | null
  rating: number
  review_count: number
  created_at: string
  updated_at: string
  categories?: Category
  users?: User
}

export interface Order {
  id: string
  user_id: string | null
  status: OrderStatus
  total_amount: number
  shipping_address: Record<string, unknown> | null
  payment_intent_id: string | null
  created_at: string
  users?: User
  order_items?: OrderItem[]
}

export interface OrderItem {
  id: string
  order_id: string
  product_id: string
  quantity: number
  price_at_purchase: number
  products?: Product
}

export interface CartItem {
  id: string
  user_id: string | null
  product_id: string
  quantity: number
  created_at: string
  products?: Product
}

export interface Review {
  id: string
  product_id: string
  user_id: string
  rating: number
  comment: string | null
  created_at: string
  users?: User
}

export interface WishlistItem {
  id: string
  user_id: string
  product_id: string
  created_at: string
  products?: Product
}
