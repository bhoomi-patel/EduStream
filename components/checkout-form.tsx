"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { ValidatedInput } from "@/components/validated-input"
import { useFormValidation } from "@/hooks/use-form-validation"
import { CreditCard, Lock } from "lucide-react"
import { useCart } from "@/contexts/cart-context"

const validationRules = {
  email: {
    required: true,
    pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  },
  firstName: {
    required: true,
    minLength: 2,
  },
  lastName: {
    required: true,
    minLength: 2,
  },
  cardNumber: {
    required: true,
    pattern: /^\d{4}\s?\d{4}\s?\d{4}\s?\d{4}$/,
  },
  expiryDate: {
    required: true,
    pattern: /^(0[1-9]|1[0-2])\/\d{2}$/,
  },
  cvv: {
    required: true,
    pattern: /^\d{3,4}$/,
  },
  billingAddress: {
    required: true,
    minLength: 5,
  },
  city: {
    required: true,
    minLength: 2,
  },
  state: {
    required: true,
    minLength: 2,
  },
  zipCode: {
    required: true,
    pattern: /^\d{5}(-\d{4})?$/,
  },
}

export function CheckoutForm() {
  const { state, clearCart } = useCart()
  const [isProcessing, setIsProcessing] = useState(false)
  const [formData, setFormData] = useState({
    email: "",
    firstName: "",
    lastName: "",
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    billingAddress: "",
    city: "",
    state: "",
    zipCode: "",
    country: "IN",
  })
  const [acceptTerms, setAcceptTerms] = useState(false)
  const [submitError, setSubmitError] = useState("")

  const { errors, validateField, validateForm, clearError } = useFormValidation(validationRules)

  const handleInputChange = (field: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value

    // Format card number
    if (field === "cardNumber") {
      value = value
        .replace(/\s/g, "")
        .replace(/(.{4})/g, "$1 ")
        .trim()
    }

    // Format expiry date
    if (field === "expiryDate") {
      value = value.replace(/\D/g, "").replace(/(\d{2})(\d)/, "$1/$2")
    }

    setFormData((prev) => ({ ...prev, [field]: value }))
    clearError(field)
    setSubmitError("")
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitError("")

    if (!validateForm(formData)) {
      setSubmitError("Please fix the errors above")
      return
    }

    if (!acceptTerms) {
      setSubmitError("Please accept the terms and conditions")
      return
    }

    setIsProcessing(true)

    try {
      await new Promise((resolve) => setTimeout(resolve, 2000))
      clearCart()
      window.location.href = "/checkout/success"
    } catch (err) {
      setSubmitError("Payment failed. Please try again.")
    } finally {
      setIsProcessing(false)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Lock className="mr-2 h-5 w-5" />
          Payment Information
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          {submitError && (
            <Alert variant="destructive">
              <AlertDescription>{submitError}</AlertDescription>
            </Alert>
          )}

          {/* Contact Information */}
          <div className="space-y-4">
            <h3 className="font-semibold">Contact Information</h3>
            <ValidatedInput
              label="Email Address"
              type="email"
              value={formData.email}
              onChange={handleInputChange("email")}
              onValidate={(value) => validateField("email", value)}
              error={errors.email}
              validateOnChange
              validateOnBlur
            />
            <div className="grid grid-cols-2 gap-4">
              <ValidatedInput
                label="First Name"
                value={formData.firstName}
                onChange={handleInputChange("firstName")}
                onValidate={(value) => validateField("firstName", value)}
                error={errors.firstName}
                validateOnBlur
              />
              <ValidatedInput
                label="Last Name"
                value={formData.lastName}
                onChange={handleInputChange("lastName")}
                onValidate={(value) => validateField("lastName", value)}
                error={errors.lastName}
                validateOnBlur
              />
            </div>
          </div>

          {/* Payment Details */}
          <div className="space-y-4">
            <h3 className="font-semibold">Payment Details</h3>
            <div className="relative">
              <CreditCard className="absolute left-3 top-8 h-4 w-4 text-muted-foreground z-10" />
              <ValidatedInput
                label="Card Number"
                placeholder="1234 5678 9012 3456"
                value={formData.cardNumber}
                onChange={handleInputChange("cardNumber")}
                onValidate={(value) => validateField("cardNumber", value)}
                error={errors.cardNumber}
                className="pl-10"
                maxLength={19}
                validateOnBlur
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <ValidatedInput
                label="Expiry Date"
                placeholder="MM/YY"
                value={formData.expiryDate}
                onChange={handleInputChange("expiryDate")}
                onValidate={(value) => validateField("expiryDate", value)}
                error={errors.expiryDate}
                maxLength={5}
                validateOnBlur
              />
              <ValidatedInput
                label="CVV"
                placeholder="123"
                value={formData.cvv}
                onChange={handleInputChange("cvv")}
                onValidate={(value) => validateField("cvv", value)}
                error={errors.cvv}
                maxLength={4}
                validateOnBlur
              />
            </div>
          </div>

          {/* Billing Address */}
          <div className="space-y-4">
            <h3 className="font-semibold">Billing Address</h3>
            <ValidatedInput
              label="Address"
              value={formData.billingAddress}
              onChange={handleInputChange("billingAddress")}
              onValidate={(value) => validateField("billingAddress", value)}
              error={errors.billingAddress}
              validateOnBlur
            />
            <div className="grid grid-cols-2 gap-4">
              <ValidatedInput
                label="City"
                value={formData.city}
                onChange={handleInputChange("city")}
                onValidate={(value) => validateField("city", value)}
                error={errors.city}
                validateOnBlur
              />
              <ValidatedInput
                label="State"
                value={formData.state}
                onChange={handleInputChange("state")}
                onValidate={(value) => validateField("state", value)}
                error={errors.state}
                validateOnBlur
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <ValidatedInput
                label="ZIP Code"
                value={formData.zipCode}
                onChange={handleInputChange("zipCode")}
                onValidate={(value) => validateField("zipCode", value)}
                error={errors.zipCode}
                validateOnBlur
              />
              <div className="space-y-2">
                <Label>Country</Label>
                <Select
                  value={formData.country}
                  onValueChange={(value) => setFormData((prev) => ({ ...prev, country: value }))}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="IN">India</SelectItem>
                    <SelectItem value="US">United States</SelectItem>
                    <SelectItem value="CA">Canada</SelectItem>
                    <SelectItem value="UK">United Kingdom</SelectItem>
                    <SelectItem value="AU">Australia</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {/* Terms and Conditions */}
          <div className="flex items-center space-x-2">
            <Checkbox
              id="terms"
              checked={acceptTerms}
              onCheckedChange={(checked) => setAcceptTerms(checked as boolean)}
            />
            <Label htmlFor="terms" className="text-sm">
              I agree to the{" "}
              <a href="/terms" className="text-primary hover:underline">
                Terms of Service
              </a>{" "}
              and{" "}
              <a href="/privacy" className="text-primary hover:underline">
                Privacy Policy
              </a>
            </Label>
          </div>

          <Button type="submit" className="w-full" size="lg" disabled={isProcessing}>
            {isProcessing ? (
              <>
                <div className="mr-2 h-5 w-5 animate-spin rounded-full border-2 border-background border-t-transparent" />
                Processing Payment...
              </>
            ) : (
              `Complete Purchase - ₹${(state.total * 1.18).toFixed(2)}`
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
