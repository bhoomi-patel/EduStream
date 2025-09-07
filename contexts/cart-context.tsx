"use client"

import type React from "react"

import { createContext, useContext, useReducer, type ReactNode } from "react"
import { useRouter } from "next/navigation"
import { useState, useEffect } from "react"

interface CartItem {
  id: number
  title: string
  instructor: string
  price: number
  image: string
  originalPrice?: number
}

interface CartState {
  items: CartItem[]
  total: number
  itemCount: number
}

type CartAction =
  | { type: "ADD_ITEM"; payload: CartItem }
  | { type: "REMOVE_ITEM"; payload: number }
  | { type: "UPDATE_QUANTITY"; payload: { id: number; quantity: number } }
  | { type: "CLEAR_CART" }

const CartContext = createContext<{
  state: CartState
  dispatch: React.Dispatch<CartAction>
  addToCart: (item: CartItem) => void
  removeFromCart: (id: number) => void
  clearCart: () => void
} | null>(null)

function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case "ADD_ITEM": {
      const existingItem = state.items.find((item) => item.id === action.payload.id)
      if (existingItem) {
        return state // Item already in cart, don't add duplicate
      }

      const newItems = [...state.items, action.payload]
      const newTotal = newItems.reduce((sum, item) => sum + item.price, 0)

      return {
        items: newItems,
        total: newTotal,
        itemCount: newItems.length,
      }
    }

    case "REMOVE_ITEM": {
      const newItems = state.items.filter((item) => item.id !== action.payload)
      const newTotal = newItems.reduce((sum, item) => sum + item.price, 0)

      return {
        items: newItems,
        total: newTotal,
        itemCount: newItems.length,
      }
    }

    case "CLEAR_CART":
      return {
        items: [],
        total: 0,
        itemCount: 0,
      }

    default:
      return state
  }
}

const initialState: CartState = {
  items: [],
  total: 0,
  itemCount: 0,
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, initialState)
  const router = useRouter()
  const [currentUser, setCurrentUser] = useState<any>(null)

  useEffect(() => {
    const user = localStorage.getItem("edustream_current_user")
    if (user) {
      setCurrentUser(JSON.parse(user))
    }
  }, [])

  const addToCart = (item: CartItem) => {
    if (!currentUser) {
      router.push("/login")
      return
    }
    dispatch({ type: "ADD_ITEM", payload: item })
  }

  const removeFromCart = (id: number) => {
    dispatch({ type: "REMOVE_ITEM", payload: id })
  }

  const clearCart = () => {
    dispatch({ type: "CLEAR_CART" })
  }

  return (
    <CartContext.Provider value={{ state, dispatch, addToCart, removeFromCart, clearCart }}>
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error("useCart must be used within a CartProvider")
  }
  return context
}
