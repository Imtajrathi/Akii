'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useCart } from '@/context/CartContext'
import { products, reviews } from '@/data/products'

export default function ProductPage({ params }) {
  const product = products.find(p => p.id === Number(params.id))
  const { addToCart } = useCart()
  const [activeImg, setActiveImg] = useState(0)
  const [added, setAdded] = useState(false)

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-16">
        <div className="text-center">
          <p className="text-muted mb-4">Product not found.</p>
          <Link href="/" className="text-sm font-semibold underline">Back to shop</Link>
        </div>
      </div>
    )
  }

  const discount = Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
  const productReviews = reviews.filter(r => r.product === product.name).slice(0, 2)

  const handleAdd = () => {
    addToCart(product)
    setAdded(true)
    setTimeout(() => setAdded(false), 2000)
  }

  return (
    <div className="pt-16 min-h-screen">
      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
        <nav className="text-xs text-muted flex gap-2">
          <Link href="/" className="hover:text-brand">Home</Link>
          <span>/</span>
          <Link href="/#products" className="hover:text-brand">Shop</Link>
          <span>/</span>
          <span className="text-brand">{product.name}</span>
        </nav>
      </div>

      {/* Main product section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 pb-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-16">
          {/* Gallery */}
          <div className="space-y-3">
            <div className="relative aspect-square overflow-hidden bg-surface rounded-sm">
              <Image
                src={product.images[activeImg]}
                alt={product.name}
                fill
                className="object-cover transition-opacity duration-300"
                priority
              />
              {product.badge && (
                <span className="absolute top-4 left-4 bg-brand text-white text-[10px] font-bold uppercase tracking-wider px-3 py-1.5 rounded-sm">
                  {product.badge}
                </span>
              )}
            </div>
            {product.images.length > 1 && (
              <div className="flex gap-3">
                {product.images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveImg(i)}
                    className={`relative w-20 h-20 flex-shrink-0 overflow-hidden rounded-sm border-2 transition-colors ${
                      activeImg === i ? 'border-brand' : 'border-border'
                    }`}
                  >
                    <Image src={img} alt="" fill className="object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Info */}
          <div className="flex flex-col">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-muted mb-2">
              {product.category}
            </p>
            <h1 className="text-3xl sm:text-4xl font-black tracking-tight mb-1">
              {product.name}
            </h1>
            <p className="text-muted text-sm mb-4">{product.tagline}</p>

            {/* Rating */}
            <div className="flex items-center gap-2 mb-5">
              <span className="text-gold text-sm">{'★'.repeat(Math.floor(product.rating))}</span>
              <span className="text-sm font-semibold">{product.rating}</span>
              <span className="text-xs text-muted">({product.reviewCount} reviews)</span>
            </div>

            {/* Price */}
            <div className="flex items-end gap-3 mb-2">
              <span className="text-3xl font-black">₹{product.price.toLocaleString()}</span>
              <span className="text-lg text-muted line-through mb-0.5">
                ₹{product.originalPrice.toLocaleString()}
              </span>
            </div>
            <div className="flex items-center gap-3 mb-6">
              <span className="bg-emerald-50 text-emerald-700 text-xs font-bold px-2.5 py-1 rounded-sm">
                {discount}% OFF — YOU SAVE ₹{(product.originalPrice - product.price).toLocaleString()}
              </span>
            </div>

            {/* Urgency */}
            {product.stock <= 5 && (
              <div className="flex items-center gap-2 mb-5 text-red-500 text-sm font-semibold">
                <span className="w-1.5 h-1.5 bg-red-500 rounded-full animate-pulse" />
                Only {product.stock} left in stock — order soon
              </div>
            )}

            {/* Description */}
            <p className="text-muted text-sm leading-relaxed mb-6 border-t border-border pt-5">
              {product.description}
            </p>

            {/* Benefits */}
            <ul className="space-y-2.5 mb-8">
              {product.benefits.map((b, i) => (
                <li key={i} className="flex items-start gap-2.5 text-sm">
                  <span className="text-emerald-600 font-bold mt-0.5">✓</span>
                  <span>{b}</span>
                </li>
              ))}
            </ul>

            {/* CTA */}
            <button
              onClick={handleAdd}
              className={`w-full py-4 text-sm font-bold uppercase tracking-widest transition-all duration-200 rounded-sm mb-3 ${
                added
                  ? 'bg-emerald-600 text-white'
                  : 'bg-brand text-white hover:bg-gray-800 active:scale-[0.98]'
              }`}
            >
              {added ? '✓ Added to Cart' : 'Add to Cart'}
            </button>

            <Link
              href="/cart"
              className="w-full py-4 text-sm font-bold uppercase tracking-widest border border-brand text-brand hover:bg-brand hover:text-white transition-all duration-200 rounded-sm text-center block"
            >
              View Cart
            </Link>

            {/* Trust badges */}
            <div className="mt-6 grid grid-cols-3 gap-3 border-t border-border pt-5">
              {[
                { icon: '🚚', text: 'COD Available' },
                { icon: '↩', text: '7-Day Returns' },
                { icon: '🛡', text: '6-Month Warranty' },
              ].map(b => (
                <div key={b.text} className="text-center">
                  <div className="text-lg mb-1">{b.icon}</div>
                  <p className="text-[10px] text-muted font-semibold uppercase tracking-wide">{b.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Lifestyle shots */}
      <section className="bg-surface py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <h2 className="text-xl font-black tracking-tight mb-8 text-center">Styled to wear.</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {[
              'https://images.unsplash.com/photo-1529958030586-3aae4ca485ff?w=600&q=80',
              'https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=600&q=80',
              'https://images.unsplash.com/photo-1434493789847-2f02dc6ca35d?w=600&q=80',
            ].map((src, i) => (
              <div key={i} className="relative aspect-[3/4] overflow-hidden rounded-sm">
                <Image src={src} alt="Lifestyle" fill className="object-cover hover:scale-105 transition-transform duration-500" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Reviews under product */}
      {productReviews.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 py-14">
          <h2 className="text-xl font-black tracking-tight mb-6">What buyers say</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {productReviews.map(r => (
              <div key={r.id} className="border border-border p-5">
                <p className="text-xs text-gold mb-2">{'★'.repeat(r.rating)}</p>
                <p className="text-sm text-muted leading-relaxed mb-4">"{r.text}"</p>
                <p className="text-xs font-bold">{r.name} — {r.location}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Sticky mobile CTA */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t border-border md:hidden z-50">
        <button
          onClick={handleAdd}
          className={`w-full py-4 text-sm font-bold uppercase tracking-widest rounded-sm transition-colors ${
            added ? 'bg-emerald-600 text-white' : 'bg-brand text-white'
          }`}
        >
          {added ? '✓ Added to Cart' : `Add to Cart — ₹${product.price.toLocaleString()}`}
        </button>
      </div>
    </div>
  )
}
