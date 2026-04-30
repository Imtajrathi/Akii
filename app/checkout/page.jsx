'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useCart } from '@/context/CartContext'

export default function CheckoutPage() {
  const { cart, total, clearCart } = useCart()
  const [step, setStep] = useState('form') // 'form' | 'success'
  const [form, setForm] = useState({
    name: '', email: '', phone: '', address: '', city: '', pincode: '', payment: 'cod',
  })
  const [errors, setErrors] = useState({})

  const shipping = total >= 999 ? 0 : 99

  const validate = () => {
    const e = {}
    if (!form.name.trim()) e.name = 'Required'
    if (!form.phone.trim() || !/^\d{10}$/.test(form.phone)) e.phone = 'Enter valid 10-digit number'
    if (!form.address.trim()) e.address = 'Required'
    if (!form.city.trim()) e.city = 'Required'
    if (!form.pincode.trim() || !/^\d{6}$/.test(form.pincode)) e.pincode = 'Enter valid 6-digit pincode'
    return e
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length) { setErrors(errs); return }
    setStep('success')
    clearCart()
  }

  if (step === 'success') {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center pt-16 px-4 text-center">
        <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mb-6 text-3xl">
          ✓
        </div>
        <h2 className="text-3xl font-black tracking-tight mb-3">Order Placed!</h2>
        <p className="text-muted text-sm mb-2 max-w-sm">
          Thank you, <strong>{form.name}</strong>! Your order has been confirmed.
        </p>
        <p className="text-muted text-sm mb-8 max-w-sm">
          We'll deliver to <strong>{form.city}</strong> within 3–5 business days.
        </p>
        <div className="bg-surface border border-border rounded-sm p-5 mb-8 text-left w-full max-w-xs">
          <p className="text-xs font-bold uppercase tracking-widest mb-3 text-muted">Order Details</p>
          <p className="text-sm"><span className="text-muted">Payment:</span> <strong>Cash on Delivery</strong></p>
          <p className="text-sm mt-1"><span className="text-muted">Order ID:</span> <strong>#ZNM{Math.floor(Math.random() * 90000) + 10000}</strong></p>
        </div>
        <Link
          href="/"
          className="bg-brand text-white px-8 py-3.5 text-xs font-semibold uppercase tracking-widest hover:bg-gray-800 transition-colors rounded-sm"
        >
          Back to Home
        </Link>
      </div>
    )
  }

  if (cart.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center pt-16 px-4 text-center">
        <h2 className="text-2xl font-black mb-4">Nothing to checkout</h2>
        <Link href="/" className="text-sm font-semibold underline">Shop now</Link>
      </div>
    )
  }

  const Field = ({ label, name, type = 'text', placeholder, half }) => (
    <div className={half ? 'col-span-1' : 'col-span-2'}>
      <label className="block text-xs font-semibold uppercase tracking-widest text-muted mb-1.5">
        {label}
      </label>
      <input
        type={type}
        value={form[name]}
        onChange={e => { setForm(f => ({ ...f, [name]: e.target.value })); setErrors(er => ({ ...er, [name]: '' })) }}
        placeholder={placeholder}
        className={`w-full border rounded-sm px-4 py-3 text-sm outline-none transition-colors ${
          errors[name] ? 'border-red-400 bg-red-50' : 'border-border focus:border-brand'
        }`}
      />
      {errors[name] && <p className="text-[11px] text-red-500 mt-1">{errors[name]}</p>}
    </div>
  )

  return (
    <div className="pt-20 min-h-screen max-w-5xl mx-auto px-4 sm:px-6 pb-24">
      <h1 className="text-3xl font-black tracking-tight mb-2">Checkout</h1>
      <p className="text-muted text-sm mb-10">Almost there — fill in your delivery details below.</p>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Form */}
        <form onSubmit={handleSubmit} className="lg:col-span-2 space-y-6">
          <div>
            <h2 className="text-xs font-bold uppercase tracking-widest mb-4 text-muted">Contact Info</h2>
            <div className="grid grid-cols-2 gap-4">
              <Field label="Full Name" name="name" placeholder="Arjun Singh" />
              <Field label="Phone" name="phone" type="tel" placeholder="9876543210" half />
              <Field label="Email (optional)" name="email" type="email" placeholder="you@email.com" half />
            </div>
          </div>

          <div>
            <h2 className="text-xs font-bold uppercase tracking-widest mb-4 text-muted">Delivery Address</h2>
            <div className="grid grid-cols-2 gap-4">
              <Field label="Street Address" name="address" placeholder="123, MG Road" />
              <Field label="City" name="city" placeholder="Mumbai" half />
              <Field label="Pincode" name="pincode" placeholder="400001" half />
            </div>
          </div>

          <div>
            <h2 className="text-xs font-bold uppercase tracking-widest mb-4 text-muted">Payment Method</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                { value: 'cod', label: 'Cash on Delivery', sub: 'Pay when it arrives' },
                { value: 'upi', label: 'UPI / Online', sub: 'Demo — no charge' },
              ].map(opt => (
                <label
                  key={opt.value}
                  className={`flex items-center gap-4 border rounded-sm p-4 cursor-pointer transition-colors ${
                    form.payment === opt.value ? 'border-brand bg-surface' : 'border-border'
                  }`}
                >
                  <input
                    type="radio"
                    name="payment"
                    value={opt.value}
                    checked={form.payment === opt.value}
                    onChange={e => setForm(f => ({ ...f, payment: e.target.value }))}
                    className="accent-brand"
                  />
                  <div>
                    <p className="text-sm font-semibold">{opt.label}</p>
                    <p className="text-xs text-muted">{opt.sub}</p>
                  </div>
                </label>
              ))}
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-brand text-white py-4 text-sm font-bold uppercase tracking-widest hover:bg-gray-800 active:scale-[0.98] transition-all rounded-sm"
          >
            Place Order
          </button>
        </form>

        {/* Summary */}
        <div className="lg:col-span-1">
          <div className="border border-border p-5 rounded-sm sticky top-24">
            <h2 className="text-xs font-bold uppercase tracking-widest mb-4 text-muted">Order Summary</h2>
            <div className="space-y-3 mb-5">
              {cart.map(item => (
                <div key={item.id} className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-surface rounded-sm overflow-hidden flex-shrink-0 relative">
                    <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                    <span className="absolute -top-1 -right-1 bg-brand text-white text-[9px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                      {item.qty}
                    </span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-semibold truncate">{item.name}</p>
                  </div>
                  <p className="text-xs font-bold">₹{(item.price * item.qty).toLocaleString()}</p>
                </div>
              ))}
            </div>
            <div className="border-t border-border pt-4 space-y-2 text-sm">
              <div className="flex justify-between text-muted">
                <span>Subtotal</span>
                <span>₹{total.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-muted">
                <span>Shipping</span>
                <span>{shipping === 0 ? <span className="text-emerald-600">Free</span> : `₹${shipping}`}</span>
              </div>
              <div className="flex justify-between font-black pt-2 border-t border-border text-base">
                <span>Total</span>
                <span>₹{(total + shipping).toLocaleString()}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
