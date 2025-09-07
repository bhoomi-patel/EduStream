"use client"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { useCart } from "@/contexts/cart-context"
import { CreditCard, Lock, ArrowLeft } from "lucide-react"
import Link from "next/link"
import { CheckoutForm } from "@/components/checkout-form"

export default function CheckoutPage() {
  const { state } = useCart()

  if (state.items.length === 0) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="container mx-auto px-4 py-8">
          <div className="max-w-2xl mx-auto text-center space-y-4">
            <h1 className="text-3xl font-bold">Your cart is empty</h1>
            <p className="text-muted-foreground">Add some courses to proceed with checkout</p>
            <Button asChild>
              <Link href="/courses">Browse Courses</Link>
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="mb-8">
            <Button variant="ghost" asChild className="mb-4">
              <Link href="/courses">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Courses
              </Link>
            </Button>
            <h1 className="text-3xl font-bold">Checkout</h1>
            <p className="text-muted-foreground">Complete your purchase to start learning</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Order Summary */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <CreditCard className="mr-2 h-5 w-5" />
                    Order Summary
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {state.items.map((item) => (
                    <div key={item.id} className="flex items-start space-x-4">
                      <img
                        src={item.image || "/placeholder.svg"}
                        alt={item.title}
                        className="w-16 h-12 object-cover rounded"
                      />
                      <div className="flex-1">
                        <h4 className="font-semibold text-sm line-clamp-2">{item.title}</h4>
                        <p className="text-sm text-muted-foreground">by {item.instructor}</p>
                        <p className="font-bold text-primary">₹{item.price}</p>
                      </div>
                    </div>
                  ))}

                  <Separator />

                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Subtotal:</span>
                      <span>₹{state.total.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>GST (18%):</span>
                      <span>₹{(state.total * 0.18).toFixed(2)}</span>
                    </div>
                    <Separator />
                    <div className="flex justify-between text-lg font-bold">
                      <span>Total:</span>
                      <span className="text-primary">₹{(state.total * 1.18).toFixed(2)}</span>
                    </div>
                  </div>

                  <div className="flex items-center text-sm text-muted-foreground">
                    <Lock className="mr-2 h-4 w-4" />
                    Secure 256-bit SSL encryption
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>What you'll get</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center text-sm">
                    <Badge variant="secondary" className="mr-2">
                      ✓
                    </Badge>
                    Lifetime access to all courses
                  </div>
                  <div className="flex items-center text-sm">
                    <Badge variant="secondary" className="mr-2">
                      ✓
                    </Badge>
                    Certificates of completion
                  </div>
                  <div className="flex items-center text-sm">
                    <Badge variant="secondary" className="mr-2">
                      ✓
                    </Badge>
                    Mobile and desktop access
                  </div>
                  <div className="flex items-center text-sm">
                    <Badge variant="secondary" className="mr-2">
                      ✓
                    </Badge>
                    30-day money-back guarantee
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Payment Form */}
            <CheckoutForm />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
