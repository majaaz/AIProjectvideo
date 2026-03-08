'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Star, ShoppingCart, Clock } from 'lucide-react'
import { useCart } from '@/context/CartContext'
import { Product } from '@/types'

interface ProductCardProps {
  product: Product
}

export function ProductCard({ product }: ProductCardProps) {
  const { addItem } = useCart()

  return (
    <div className="product-card group">
      <Link href={`/products/${product.id}`}>
        <div className="relative h-48 mb-4 flex items-center justify-center bg-gray-100">
          {product.images && product.images.length > 0 ? (
            <Image
              src={product.images[0]}
              alt={product.title}
              fill
              className="object-contain p-4"
            />
          ) : (
            <div className="text-gray-400">No image</div>
          )}
        </div>
        <Link href={`/products/${product.id}`}>
          <h3 className="text-sm line-clamp-2 hover:text-amazon-orange transition-colors mb-1">
            {product.title}
          </h3>
        </Link>
        {/* Star rating */}
        <div className="flex items-center mb-2">
          {[1, 2, 3, 4, 5].map((star) => (
            <Star
              key={star}
              className={`w-3 h-3 ${
                star <= Math.round(product.rating || 0)
                  ? 'fill-amazon-orange text-amazon-orange'
                  : 'text-gray-300'
              }`}
            />
          ))}
          <span className="text-xs text-gray-500 ml-1">({product.review_count || 0})</span>
        </div>
        <div className="flex items-baseline space-x-2">
          {product.compare_price && product.compare_price > product.price && (
            <span className="text-xs text-gray-500 line-through">
              ${product.compare_price.toFixed(2)}
            </span>
          )}
          <span className="text-lg font-bold">${product.price?.toFixed(2)}</span>
        </div>
        {product.stock_quantity > 0 ? (
          <span className="text-xs text-green-600">In Stock</span>
        ) : (
          <span className="text-xs text-red-600">Out of Stock</span>
        )}
      </Link>
      <button
        onClick={(e) => {
          e.preventDefault()
          addItem(product)
        }}
        className="amazon-btn-primary w-full mt-3 text-sm"
        disabled={product.stock_quantity <= 0}
      >
        Add to Cart
      </button>
    </div>
  )
}

interface HeroCarouselProps {
  deals: Product[]
}

export function HeroCarousel({ deals }: HeroCarouselProps) {
  const [currentSlide, setCurrentSlide] = useState(0)

  const slides = [
    {
      image: 'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=1200',
      title: 'Great Deals on Electronics',
      link: '/search?category=electronics',
    },
    {
      image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1200',
      title: 'Up to 50% Off Fashion',
      link: '/search?category=fashion',
    },
    {
      image: 'https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?w=1200',
      title: 'Home Essentials',
      link: '/search?category=home',
    },
  ]

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [slides.length])

  return (
    <div className="relative h-64 md:h-96 overflow-hidden rounded-sm">
      {slides.map((slide, index) => (
        <Link
          key={index}
          href={slide.link}
          className={`absolute inset-0 transition-opacity duration-700 ${
            index === currentSlide ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <Image
            src={slide.image}
            alt={slide.title}
            fill
            className="object-cover"
            priority={index === 0}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          <div className="absolute bottom-8 left-8 text-white">
            <h2 className="text-2xl md:text-3xl font-bold mb-2">{slide.title}</h2>
            <span className="text-sm">Shop now →</span>
          </div>
        </Link>
      ))}
      {/* Slide indicators */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-2 h-2 rounded-full transition-colors ${
              index === currentSlide ? 'bg-white' : 'bg-white/50'
            }`}
          />
        ))}
      </div>
    </div>
  )
}

interface CategoryGridProps {
  categories: { id: string; name: string; slug: string; image_url: string | null }[]
}

export function CategoryGrid({ categories }: CategoryGridProps) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
      {categories.map((category) => (
        <Link
          key={category.id}
          href={`/search?category=${category.slug}`}
          className="bg-white p-4 rounded-sm hover:shadow-lg transition-shadow text-center border border-gray-200"
        >
          <div className="relative h-20 mb-3 flex items-center justify-center">
            {category.image_url ? (
              <Image
                src={category.image_url}
                alt={category.name}
                fill
                className="object-contain"
              />
            ) : (
              <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center text-2xl">
                📦
              </div>
            )}
          </div>
          <h3 className="text-sm font-medium line-clamp-2">{category.name}</h3>
        </Link>
      ))}
    </div>
  )
}

interface DealsOfTheDayProps {
  products: Product[]
}

export function DealsOfTheDay({ products }: DealsOfTheDayProps) {
  const [timeLeft, setTimeLeft] = useState({ hours: 0, minutes: 0, seconds: 0 })

  useEffect(() => {
    // Set end time to midnight tonight
    const endTime = new Date()
    endTime.setHours(24, 0, 0, 0)

    const timer = setInterval(() => {
      const now = new Date()
      const diff = endTime.getTime() - now.getTime()

      if (diff > 0) {
        setTimeLeft({
          hours: Math.floor(diff / (1000 * 60 * 60)),
          minutes: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((diff % (1000 * 60)) / 1000),
        })
      }
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  return (
    <div className="bg-white p-6 rounded-sm border border-gray-200">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold flex items-center">
          <Clock className="w-5 h-5 text-amazon-orange mr-2" />
          Deals of the Day
        </h2>
        <div className="text-sm text-gray-600">
          Ends in:{' '}
          <span className="font-mono font-bold text-amazon-orange">
            {String(timeLeft.hours).padStart(2, '0')}:
            {String(timeLeft.minutes).padStart(2, '0')}:
            {String(timeLeft.seconds).padStart(2, '0')}
          </span>
        </div>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {products.slice(0, 6).map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
      <Link
        href="/search?sort=deals"
        className="block text-center mt-6 text-amazon-orange hover:underline font-medium"
      >
        See all deals →
      </Link>
    </div>
  )
}
