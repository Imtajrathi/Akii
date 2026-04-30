'use client'

import { createContext, useContext, useReducer, useEffect } from 'react'

const CartContext = createContext(null)

function cartReducer(state, action) {
  switch (action.type) {
    case 'ADD': {
      const exists = state.find(i => i.id === action.product.id)
      if (exists) {
        return state.map(i =>
          i.id === action.product.id ? { ...i, qty: i.qty + 1 } : i
        )
      }
      return [...state, { ...action.product, qty: 1 }]
    }
    case 'REMOVE':
      return state.filter(i => i.id !== action.id)
    case 'UPDATE_QTY':
      return state.map(i =>
        i.id === action.id ? { ...i, qty: Math.max(1, action.qty) } : i
      )
    case 'CLEAR':
      return []
    case 'INIT':
      return action.items
    default:
      return state
  }
}

export function CartProvider({ children }) {
  const [cart, dispatch] = useReducer(cartReducer, [])

  useEffect(() => {
    try {
      const saved = localStorage.getItem('zenmo_cart')
      if (saved) dispatch({ type: 'INIT', items: JSON.parse(saved) })
    } catch {}
  }, [])

  useEffect(() => {
    localStorage.setItem('zenmo_cart', JSON.stringify(cart))
  }, [cart])

  const addToCart = (product) => dispatch({ type: 'ADD', product })
  const removeFromCart = (id) => dispatch({ type: 'REMOVE', id })
  const updateQty = (id, qty) => dispatch({ type: 'UPDATE_QTY', id, qty })
  const clearCart = () => dispatch({ type: 'CLEAR' })

  const total = cart.reduce((sum, i) => sum + i.price * i.qty, 0)
  const count = cart.reduce((sum, i) => sum + i.qty, 0)

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, updateQty, clearCart, total, count }}>
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be used within CartProvider')
  return ctx
}
