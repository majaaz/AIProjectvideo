'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Plus, Search, Edit, Trash2, Filter } from 'lucide-react'

export default function AdminProductsPage() {
  const [products, setProducts] = useState([
    { id: '1', title: 'Wireless Headphones', price: 199.99, stock: 50, category: 'Electronics', image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=100' },
    { id: '2', title: 'Smart Watch Pro', price: 349.99, stock: 30, category: 'Electronics', image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=100' },
    { id: '3', title: 'Bluetooth Speaker', price: 79.99, stock: 100, category: 'Electronics', image: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=100' },
    { id: '4', title: '4K Smart TV 55"', price: 599.99, stock: 15, category: 'Electronics', image: 'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=100' },
    { id: '5', title: 'Gaming Mouse', price: 69.99, stock: 75, category: 'Electronics', image: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=100' },
    { id: '6', title: 'Mechanical Keyboard', price: 129.99, stock: 40, category: 'Electronics', image: 'https://images.unsplash.com/photo-1511467687858-23d96c32e4ae?w=100' },
  ])

  const [searchQuery, setSearchQuery] = useState('')
  const [filterCategory, setFilterCategory] = useState('')

  const filteredProducts = products.filter(p => {
    if (searchQuery && !p.title.toLowerCase().includes(searchQuery.toLowerCase())) return false
    if (filterCategory && p.category !== filterCategory) return false
    return true
  })

  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold">Products</h1>
          <button className="amazon-btn-primary flex items-center gap-2">
            <Plus className="w-4 h-4" />
            Add Product
          </button>
        </div>

        {/* Filters */}
        <div className="bg-white p-4 rounded-sm border border-gray-200 mb-6">
          <div className="flex flex-wrap gap-4">
            <div className="flex-1 min-w-[200px]">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-sm focus:outline-none focus:border-amazon-orange"
                />
              </div>
            </div>
            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-sm focus:outline-none focus:border-amazon-orange"
            >
              <option value="">All Categories</option>
              <option value="Electronics">Electronics</option>
              <option value="Fashion">Fashion</option>
              <option value="Home">Home & Kitchen</option>
            </select>
          </div>
        </div>

        {/* Products Table */}
        <div className="bg-white rounded-sm border border-gray-200 overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-left px-6 py-3 text-sm font-medium text-gray-600">Product</th>
                <th className="text-left px-6 py-3 text-sm font-medium text-gray-600">Category</th>
                <th className="text-left px-6 py-3 text-sm font-medium text-gray-600">Price</th>
                <th className="text-left px-6 py-3 text-sm font-medium text-gray-600">Stock</th>
                <th className="text-right px-6 py-3 text-sm font-medium text-gray-600">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredProducts.map((product) => (
                <tr key={product.id} className="border-t border-gray-200 hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="relative h-12 w-12 bg-gray-100 rounded-sm overflow-hidden flex-shrink-0">
                        <Image
                          src={product.image}
                          alt={product.title}
                          fill
                          className="object-contain"
                        />
                      </div>
                      <div>
                        <p className="font-medium">{product.title}</p>
                        <p className="text-sm text-gray-500">SKU: PRD-{product.id}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm">{product.category}</td>
                  <td className="px-6 py-4 font-medium">${product.price.toFixed(2)}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      product.stock <= 10 ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'
                    }`}>
                      {product.stock} in stock
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button className="p-2 hover:bg-gray-100 rounded-sm">
                        <Edit className="w-4 h-4 text-gray-600" />
                      </button>
                      <button className="p-2 hover:bg-red-50 rounded-sm">
                        <Trash2 className="w-4 h-4 text-red-600" />
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
