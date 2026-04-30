'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useCart } from '@/context/CartContext'
import { useState } from 'react'

const BADGE_STYLES = {
  Bestseller: 'bg-brand text-white',
  'Low Stock': 'bg-red-500 text-white',
  New: 'bg-emerald-600 text-white',
  Limited: 'bg-gold text-white',
}

export default function ProductCard({ product }) {
  const { addToCart } = useCart()
  const [added, setAdded] = useState(false)

  const discount = Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)

  const handleAdd = (e) => {
    e.preventDefault()
    addToCart(product)
    setAdded(true)
    setTimeout(() => setAdded(false), 1500)
  }

  return (
    <Link href={`/product/${product.id}`} className="group block">
      <div className="relative overflow-hidden bg-surface rounded-sm aspect-square">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 768px) 50vw, 33vw"
        />
        {product.badge && (
          <span className={`absolute top-3 left-3 text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-sm ${BADGE_STYLES[product.badge] || 'bg-brand text-white'}`}>
            {product.badge}
          </span>
        )}
        {product.stock <= 4 && (
          <span className="absolute bottom-3 left-3 text-[10px] text-white bg-black/60 backdrop-blur-sm px-2 py-1 rounded-sm">
            Only {product.stock} left
          </span>
        )}
      </div>

      <div className="mt-3">
        <h3 className="text-sm font-semibold tracking-wide">{product.name}</h3>
        <div className="flex items-center gap-2 mt-1">
          <span className="text-base font-bold">₹{product.price.toLocaleString()}</span>
          <span className="text-xs text-muted line-through">₹{product.originalPrice.toLocaleString()}</span>
          <span className="text-xs text-emerald-600 font-semibold">{discount}% off</span>
        </div>
        <div className="flex items-center gap-1 mt-1">
          <span className="text-xs text-gold">{'★'.repeat(Math.floor(product.rating))}</span>
          <span className="text-[11px] text-muted">({product.reviewCount})</span>
        </div>
      </div>

      <button
        onClick={handleAdd}
        className={`mt-3 w-full py-2.5 text-xs font-semibold uppercase tracking-widest transition-all duration-200 rounded-sm ${
          added
            ? 'bg-emerald-600 text-white'
            : 'bg-brand text-white hover:bg-gray-800 active:scale-95'
        }`}
      >
        {added ? '✓ Added' : 'Add to Cart'}
      </button>
    </Link>
  )
}
