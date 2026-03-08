'use client'

import { useState, useEffect, use } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useCart } from '@/context/CartContext'
import { Product, Review } from '@/types'
import { Star, Truck, Shield, ArrowLeft, Heart, ChevronRight } from 'lucide-react'

interface ProductPageProps {
  params: Promise<{ id: string }>
}

export default function ProductPage({ params }: ProductPageProps) {
  const resolvedParams = use(params)
  const { addItem } = useCart()

  const [product, setProduct] = useState<Product | null>(null)
  const [reviews, setReviews] = useState<Review[]>([])
  const [selectedImage, setSelectedImage] = useState(0)
  const [quantity, setQuantity] = useState(1)
  const [loading, setLoading] = useState(true)
  const [selectedColor, setSelectedColor] = useState('')
  const [selectedSize, setSelectedSize] = useState('')

  useEffect(() => {
    fetchProduct()
    fetchReviews()
  }, [resolvedParams.id])

  const fetchProduct = async () => {
    setLoading(true)
    // Mock product data - in production, fetch from Supabase
    const mockProduct: Product = {
      id: resolvedParams.id,
      title: 'Wireless Noise-Canceling Headphones - Premium Sound Quality',
      description: 'Experience immersive audio with our premium wireless headphones. Featuring advanced active noise cancellation, 30-hour battery life, and premium comfort for all-day listening. Perfect for music lovers, commuters, and professionals who demand the best audio quality.',
      price: 199.99,
      compare_price: 249.99,
      images: [
        'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800',
        'https://images.unsplash.com/photo-1583394838336-acd977736f90?w=800',
        'https://images.unsplash.com/photo-1484704849700-f032a568e944?w=800',
        'https://images.unsplash.com/photo-1524678606372-1f7b2e7373c8?w=800',
      ],
      category_id: '1',
      seller_id: '1',
      stock_quantity: 50,
      sku: 'WH-1000XM4',
      rating: 4.5,
      review_count: 1234,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    }

    setProduct(mockProduct)
    setLoading(false)
  }

  const fetchReviews = async () => {
    // Mock reviews
    const mockReviews: Review[] = [
      {
        id: '1',
        product_id: resolvedParams.id,
        user_id: '1',
        rating: 5,
        comment: 'Amazing sound quality! The noise cancellation is top-notch.',
        created_at: new Date(Date.now() - 86400000 * 5).toISOString(),
        users: { id: '1', email: 'user1@example.com', full_name: 'John D.', avatar_url: null, role: 'customer', created_at: '' },
      },
      {
        id: '2',
        product_id: resolvedParams.id,
        user_id: '2',
        rating: 4,
        comment: 'Great headphones but a bit pricey. Battery life is excellent.',
        created_at: new Date(Date.now() - 86400000 * 10).toISOString(),
        users: { id: '2', email: 'user2@example.com', full_name: 'Sarah M.', avatar_url: null, role: 'customer', created_at: '' },
      },
      {
        id: '3',
        product_id: resolvedParams.id,
        user_id: '3',
        rating: 5,
        comment: 'Best investment ever! Use them for work from home every day.',
        created_at: new Date(Date.now() - 86400000 * 15).toISOString(),
        users: { id: '3', email: 'user3@example.com', full_name: 'Mike R.', avatar_url: null, role: 'customer', created_at: '' },
      },
    ]
    setReviews(mockReviews)
  }

  const handleAddToCart = () => {
    if (product) {
      addItem(product, quantity)
    }
  }

  if (loading) {
    return (
      <div className="bg-gray-100 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amazon-orange mx-auto mb-4"></div>
          <p>Loading product...</p>
        </div>
      </div>
    )
  }

  if (!product) {
    return (
      <div className="bg-gray-100 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600">Product not found</p>
          <Link href="/" className="text-amazon-orange hover:underline mt-2 inline-block">
            Go back home
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Breadcrumb */}
        <nav className="flex items-center text-sm text-gray-600 mb-4">
          <Link href="/" className="hover:underline">Home</Link>
          <ChevronRight className="w-4 h-4 mx-1" />
          <Link href="/search" className="hover:underline">Electronics</Link>
          <ChevronRight className="w-4 h-4 mx-1" />
          <span className="text-gray-800">{product.title.substring(0, 50)}...</span>
        </nav>

        <div className="bg-white p-6 rounded-sm border border-gray-200">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Image Gallery */}
            <div className="space-y-4">
              <div className="relative h-96 bg-gray-100 rounded-sm overflow-hidden">
                <Image
                  src={product.images[selectedImage]}
                  alt={product.title}
                  fill
                  className="object-contain"
                  priority
                />
              </div>
              <div className="flex gap-2 overflow-x-auto">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`relative h-20 w-20 flex-shrink-0 border-2 rounded-sm ${
                      selectedImage === index ? 'border-amazon-orange' : 'border-transparent'
                    }`}
                  >
                    <Image
                      src={image}
                      alt={`${product.title} ${index + 1}`}
                      fill
                      className="object-contain"
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Product Info */}
            <div>
              <h1 className="text-2xl font-bold mb-2">{product.title}</h1>
              <Link href="#" className="text-sm text-amazon-orange hover:underline mb-4 block">
                Visit the Store
              </Link>

              {/* Rating */}
              <div className="flex items-center mb-4">
                <div className="flex">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className={`w-5 h-5 ${
                        star <= Math.round(product.rating)
                          ? 'fill-amazon-orange text-amazon-orange'
                          : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>
                <Link href="#reviews" className="text-sm text-amazon-orange hover:underline ml-2">
                  {product.review_count} ratings
                </Link>
              </div>

              {/* Price */}
              <div className="mb-4">
                <span className="text-3xl font-bold">${product.price.toFixed(2)}</span>
                {product.compare_price && (
                  <>
                    <span className="text-lg text-gray-500 line-through ml-3">
                      ${product.compare_price.toFixed(2)}
                    </span>
                    <span className="text-sm text-green-600 ml-2">
                      Save ${(product.compare_price - product.price).toFixed(2)} ({Math.round((1 - product.price / product.compare_price) * 100)}%)
                    </span>
                  </>
                )}
              </div>

              {/* Stock Status */}
              <div className="mb-4">
                {product.stock_quantity > 0 ? (
                  <span className="text-green-600 font-medium">In Stock</span>
                ) : (
                  <span className="text-red-600 font-medium">Out of Stock</span>
                )}
              </div>

              {/* Variants */}
              {selectedColor && (
                <div className="mb-4">
                  <span className="text-sm font-medium block mb-2">Color: {selectedColor}</span>
                  <div className="flex gap-2">
                    {['Black', 'Silver', 'Blue'].map((color) => (
                      <button
                        key={color}
                        onClick={() => setSelectedColor(color)}
                        className={`px-3 py-1 border rounded-sm text-sm ${
                          selectedColor === color ? 'border-amazon-orange bg-orange-50' : 'border-gray-300'
                        }`}
                      >
                        {color}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {selectedSize && (
                <div className="mb-4">
                  <span className="text-sm font-medium block mb-2">Size: {selectedSize}</span>
                  <div className="flex gap-2">
                    {['Standard', 'Compact'].map((size) => (
                      <button
                        key={size}
                        onClick={() => setSelectedSize(size)}
                        className={`px-3 py-1 border rounded-sm text-sm ${
                          selectedSize === size ? 'border-amazon-orange bg-orange-50' : 'border-gray-300'
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Quantity */}
              <div className="mb-6">
                <span className="text-sm font-medium block mb-2">Quantity:</span>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-8 h-8 border border-gray-300 rounded-sm flex items-center justify-center hover:bg-gray-100"
                  >
                    -
                  </button>
                  <span className="w-12 text-center font-medium">{quantity}</span>
                  <button
                    onClick={() => setQuantity(Math.min(product.stock_quantity, quantity + 1))}
                    className="w-8 h-8 border border-gray-300 rounded-sm flex items-center justify-center hover:bg-gray-100"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-4 mb-6">
                <button
                  onClick={handleAddToCart}
                  disabled={product.stock_quantity <= 0}
                  className="amazon-btn-primary flex-1 py-3 text-base"
                >
                  Add to Cart
                </button>
                <button className="amazon-btn-secondary px-4">
                  <Heart className="w-5 h-5" />
                </button>
              </div>

              {/* Features */}
              <div className="space-y-2 text-sm">
                <div className="flex items-center text-gray-600">
                  <Truck className="w-4 h-4 mr-2" />
                  Free delivery on orders over $35
                </div>
                <div className="flex items-center text-gray-600">
                  <Shield className="w-4 h-4 mr-2" />
                  1 Year Warranty
                </div>
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="mt-8 pt-8 border-t border-gray-200">
            <h2 className="text-xl font-bold mb-4">About this item</h2>
            <p className="text-gray-700 whitespace-pre-line">{product.description}</p>
          </div>

          {/* Reviews Section */}
          <div id="reviews" className="mt-8 pt-8 border-t border-gray-200">
            <h2 className="text-xl font-bold mb-4">Customer Reviews</h2>
            <div className="flex items-center mb-4">
              <div className="flex">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className={`w-6 h-6 ${
                      star <= Math.round(product.rating)
                        ? 'fill-amazon-orange text-amazon-orange'
                        : 'text-gray-300'
                    }`}
                  />
                ))}
              </div>
              <span className="ml-2 font-medium">{product.rating} out of 5</span>
              <span className="ml-2 text-gray-600">({product.review_count} reviews)</span>
            </div>

            <div className="space-y-4">
              {reviews.map((review) => (
                <div key={review.id} className="border-b border-gray-200 pb-4">
                  <div className="flex items-center mb-2">
                    <div className="flex">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          className={`w-4 h-4 ${
                            star <= review.rating
                              ? 'fill-amazon-orange text-amazon-orange'
                              : 'text-gray-300'
                          }`}
                        />
                      ))}
                    </div>
                    <span className="ml-2 font-medium">{review.users?.full_name}</span>
                    <span className="ml-2 text-sm text-gray-500">
                      {new Date(review.created_at).toLocaleDateString()}
                    </span>
                  </div>
                  <p className="text-gray-700">{review.comment}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Frequently Bought Together */}
        <div className="mt-6 bg-white p-6 rounded-sm border border-gray-200">
          <h2 className="text-xl font-bold mb-4">Frequently Bought Together</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="border border-gray-200 rounded-sm p-4 hover:shadow-md transition-shadow">
                <div className="relative h-32 mb-2 bg-gray-100">
                  <Image
                    src={`https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=200`}
                    alt="Related product"
                    fill
                    className="object-contain"
                  />
                </div>
                <p className="text-sm line-clamp-2 mb-1">Premium Accessory {i}</p>
                <p className="font-bold">${(29.99 * i).toFixed(2)}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
