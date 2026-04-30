'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useCart } from '@/context/CartContext'

export default function CartPage() {
  const { cart, removeFromCart, updateQty, total, count } = useCart()

  if (cart.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center pt-16 px-4 text-center">
        <div className="text-6xl mb-6">◻</div>
        <h2 className="text-2xl font-black tracking-tight mb-3">Your cart is empty</h2>
        <p className="text-muted text-sm mb-8">Looks like you haven't added anything yet.</p>
        <Link
          href="/#products"
          className="bg-brand text-white px-8 py-3.5 text-xs font-semibold uppercase tracking-widest hover:bg-gray-800 transition-colors rounded-sm"
        >
          Shop the Collection
        </Link>
      </div>
    )
  }

  const shipping = total >= 999 ? 0 : 99
  const finalTotal = total + shipping

  return (
    <div className="pt-20 min-h-screen max-w-5xl mx-auto px-4 sm:px-6 pb-24">
      <h1 className="text-3xl font-black tracking-tight mb-2">Your Cart</h1>
      <p className="text-muted text-sm mb-10">{count} item{count !== 1 ? 's' : ''}</p>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Items */}
        <div className="lg:col-span-2 space-y-5">
          {cart.map(item => (
            <div key={item.id} className="flex gap-4 border border-border p-4 rounded-sm">
              <Link href={`/product/${item.id}`} className="relative w-24 h-24 flex-shrink-0 overflow-hidden bg-surface rounded-sm">
                <Image src={item.image} alt={item.name} fill className="object-cover" />
              </Link>

              <div className="flex flex-col flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2">
                  <Link href={`/product/${item.id}`} className="text-sm font-semibold hover:underline line-clamp-2">
                    {item.name}
                  </Link>
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="text-muted hover:text-brand transition-colors flex-shrink-0 mt-0.5"
                    aria-label="Remove"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>

                <p className="text-xs text-muted mt-1">₹{item.price.toLocaleString()} each</p>

                <div className="flex items-center justify-between mt-auto pt-3">
                  <div className="flex items-center border border-border rounded-sm">
                    <button
                      onClick={() => item.qty === 1 ? removeFromCart(item.id) : updateQty(item.id, item.qty - 1)}
                      className="w-8 h-8 flex items-center justify-center text-lg hover:bg-surface transition-colors"
                    >
                      −
                    </button>
                    <span className="w-8 text-center text-sm font-semibold">{item.qty}</span>
                    <button
                      onClick={() => updateQty(item.id, item.qty + 1)}
                      className="w-8 h-8 flex items-center justify-center text-lg hover:bg-surface transition-colors"
                    >
                      +
                    </button>
                  </div>
                  <span className="text-sm font-bold">₹{(item.price * item.qty).toLocaleString()}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Summary */}
        <div className="lg:col-span-1">
          <div className="border border-border p-6 rounded-sm sticky top-24">
            <h2 className="text-sm font-bold uppercase tracking-widest mb-5">Order Summary</h2>

            <div className="space-y-3 text-sm mb-5">
              <div className="flex justify-between text-muted">
                <span>Subtotal</span>
                <span>₹{total.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-muted">
                <span>Shipping</span>
                <span>{shipping === 0 ? <span className="text-emerald-600">Free</span> : `₹${shipping}`}</span>
              </div>
              {shipping > 0 && (
                <p className="text-[11px] text-muted">Add ₹{(999 - total).toLocaleString()} more for free shipping</p>
              )}
            </div>

            <div className="border-t border-border pt-4 mb-6 flex justify-between font-bold">
              <span>Total</span>
              <span>₹{finalTotal.toLocaleString()}</span>
            </div>

            <Link
              href="/checkout"
              className="block w-full bg-brand text-white text-center py-4 text-xs font-bold uppercase tracking-widest hover:bg-gray-800 transition-colors rounded-sm mb-3"
            >
              Proceed to Checkout
            </Link>

            <Link
              href="/#products"
              className="block text-center text-xs text-muted hover:text-brand transition-colors mt-3"
            >
              ← Continue Shopping
            </Link>

            <div className="mt-6 pt-5 border-t border-border grid grid-cols-2 gap-3 text-center">
              {[{ i: '🚚', t: 'COD Available' }, { i: '🔒', t: 'Secure Checkout' }].map(b => (
                <div key={b.t}>
                  <div className="text-base">{b.i}</div>
                  <p className="text-[10px] text-muted mt-1 font-semibold uppercase tracking-wide">{b.t}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
