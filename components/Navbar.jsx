'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useCart } from '@/context/CartContext'

export default function Navbar() {
  const { count } = useCart()
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-white border-b border-border shadow-sm' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        <Link href="/" className="text-xl font-black tracking-[0.15em] text-brand">
          ZENMO
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          <Link href="/#products" className="text-sm font-medium text-muted hover:text-brand transition-colors">
            Shop
          </Link>
          <Link href="/#about" className="text-sm font-medium text-muted hover:text-brand transition-colors">
            About
          </Link>
        </nav>

        <div className="flex items-center gap-4">
          <Link href="/cart" className="relative">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
            {count > 0 && (
              <span className="absolute -top-2 -right-2 bg-brand text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                {count}
              </span>
            )}
          </Link>

          <button
            className="md:hidden"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {menuOpen
                ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
                : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 12h16M4 18h16" />}
            </svg>
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="md:hidden bg-white border-t border-border px-4 py-4 flex flex-col gap-4 animate-fade-in">
          <Link href="/#products" onClick={() => setMenuOpen(false)} className="text-sm font-medium">Shop</Link>
          <Link href="/#about" onClick={() => setMenuOpen(false)} className="text-sm font-medium">About</Link>
          <Link href="/cart" onClick={() => setMenuOpen(false)} className="text-sm font-medium">Cart ({count})</Link>
        </div>
      )}
    </header>
  )
}
