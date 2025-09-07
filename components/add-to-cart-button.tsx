"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { ShoppingCart, Check } from "lucide-react"
import { useCart } from "@/contexts/cart-context"

interface Course {
  id: number
  title: string
  instructor: {
    name: string
  }
  price: number
}

interface AddToCartButtonProps {
  course: Course
}

export function AddToCartButton({ course }: AddToCartButtonProps) {
  const { state, addToCart } = useCart()
  const [isAdding, setIsAdding] = useState(false)

  const isInCart = state.items.some((item) => item.id === course.id)

  const handleAddToCart = async () => {
    if (isInCart) return

    setIsAdding(true)

    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 500))

    addToCart({
      id: course.id,
      title: course.title,
      instructor: course.instructor.name,
      price: course.price,
      image: "/web-development-coding.png", // Default image for now
    })

    setIsAdding(false)
  }

  if (isInCart) {
    return (
      <Button size="lg" variant="outline" disabled className="flex-1 sm:flex-none bg-transparent">
        <Check className="mr-2 h-5 w-5" />
        Added to Cart
      </Button>
    )
  }

  return (
    <Button size="lg" className="flex-1 sm:flex-none" onClick={handleAddToCart} disabled={isAdding}>
      {isAdding ? (
        <>
          <div className="mr-2 h-5 w-5 animate-spin rounded-full border-2 border-background border-t-transparent" />
          Adding...
        </>
      ) : (
        <>
          <ShoppingCart className="mr-2 h-5 w-5" />
          Add to Cart - ₹{course.price}
        </>
      )}
    </Button>
  )
}
