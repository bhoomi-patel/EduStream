"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Checkbox } from "@/components/ui/checkbox"
import { ValidatedInput } from "@/components/validated-input"
import { useFormValidation } from "@/hooks/use-form-validation"
import { Eye, EyeOff, Mail, Lock, User } from "lucide-react"

const validationRules = {
  firstName: {
    required: true,
    minLength: 2,
    maxLength: 50,
  },
  lastName: {
    required: true,
    minLength: 2,
    maxLength: 50,
  },
  email: {
    required: true,
    pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  },
  password: {
    required: true,
    minLength: 8,
    custom: (value: string) => {
      if (!/(?=.*[a-z])/.test(value)) return "Must contain at least one lowercase letter"
      if (!/(?=.*[A-Z])/.test(value)) return "Must contain at least one uppercase letter"
      if (!/(?=.*\d)/.test(value)) return "Must contain at least one number"
      return null
    },
  },
  confirmPassword: {
    required: true,
  },
}

export default function SignUpPage() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  })
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [acceptTerms, setAcceptTerms] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [submitError, setSubmitError] = useState("")

  const { errors, validateField, validateForm, clearError, setCustomError } = useFormValidation(validationRules)

  const handleInputChange = (field: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setFormData((prev) => ({ ...prev, [field]: value }))

    // Clear any existing errors for this field
    clearError(field)
    setSubmitError("")
  }

  const validateConfirmPassword = (value: string) => {
    if (!value) return "Please confirm your password"
    if (value !== formData.password) return "Passwords do not match"
    return null
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setSubmitError("")

    // Validate confirm password separately
    const confirmPasswordError = validateConfirmPassword(formData.confirmPassword)
    if (confirmPasswordError) {
      setCustomError("confirmPassword", confirmPasswordError)
      setIsLoading(false)
      return
    }

    // Validate form
    if (!validateForm(formData)) {
      setIsLoading(false)
      return
    }

    if (!acceptTerms) {
      setSubmitError("Please accept the terms and conditions")
      setIsLoading(false)
      return
    }

    setTimeout(() => {
      const storedUsers = JSON.parse(localStorage.getItem("edustream_users") || "[]")

      // Check if email already exists
      if (storedUsers.find((u: any) => u.email === formData.email)) {
        setSubmitError("An account with this email already exists")
        setCustomError("email", "Email already registered")
        setIsLoading(false)
        return
      }

      // Add new user
      const newUser = {
        id: Date.now().toString(),
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        password: formData.password,
        createdAt: new Date().toISOString(),
      }

      storedUsers.push(newUser)
      localStorage.setItem("edustream_users", JSON.stringify(storedUsers))

      window.location.href = "/login"
      setIsLoading(false)
    }, 1000)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4 py-8">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <Link href="/" className="flex items-center justify-center space-x-2 mb-4">
            <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-lg">E</span>
            </div>
            <span className="font-bold text-xl">EduStream</span>
          </Link>
          <CardTitle>Create Account</CardTitle>
          <CardDescription>Join thousands of learners on EduStream</CardDescription>
        </CardHeader>

        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            {submitError && (
              <Alert variant="destructive">
                <AlertDescription>{submitError}</AlertDescription>
              </Alert>
            )}

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName">First Name</Label>
                <div className="relative">
                  <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground z-10" />
                  <ValidatedInput
                    id="firstName"
                    name="firstName"
                    type="text"
                    placeholder="First name"
                    value={formData.firstName}
                    onChange={handleInputChange("firstName")}
                    onValidate={(value) => validateField("firstName", value)}
                    error={errors.firstName}
                    className="pl-10"
                    validateOnBlur
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName">Last Name</Label>
                <ValidatedInput
                  id="lastName"
                  name="lastName"
                  type="text"
                  placeholder="Last name"
                  value={formData.lastName}
                  onChange={handleInputChange("lastName")}
                  onValidate={(value) => validateField("lastName", value)}
                  error={errors.lastName}
                  validateOnBlur
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground z-10" />
                <ValidatedInput
                  id="email"
                  name="email"
                  type="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={handleInputChange("email")}
                  onValidate={(value) => validateField("email", value)}
                  error={errors.email}
                  className="pl-10"
                  validateOnChange
                  validateOnBlur
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground z-10" />
                <ValidatedInput
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Create a password"
                  value={formData.password}
                  onChange={handleInputChange("password")}
                  onValidate={(value) => validateField("password", value)}
                  error={errors.password}
                  className="pl-10 pr-10"
                  validateOnChange
                  validateOnBlur
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="absolute right-0 top-0 h-full px-3 z-10"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </Button>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground z-10" />
                <ValidatedInput
                  id="confirmPassword"
                  name="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Confirm your password"
                  value={formData.confirmPassword}
                  onChange={handleInputChange("confirmPassword")}
                  onValidate={validateConfirmPassword}
                  error={errors.confirmPassword}
                  className="pl-10 pr-10"
                  validateOnChange
                  validateOnBlur
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="absolute right-0 top-0 h-full px-3 z-10"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </Button>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="terms"
                checked={acceptTerms}
                onCheckedChange={(checked) => setAcceptTerms(checked as boolean)}
              />
              <Label htmlFor="terms" className="text-sm">
                I agree to the{" "}
                <Link href="/terms" className="text-primary hover:underline">
                  Terms of Service
                </Link>{" "}
                and{" "}
                <Link href="/privacy" className="text-primary hover:underline">
                  Privacy Policy
                </Link>
              </Label>
            </div>
          </CardContent>

          <CardFooter className="flex flex-col space-y-4">
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? "Creating account..." : "Create Account"}
            </Button>

            <p className="text-sm text-center text-muted-foreground">
              Already have an account?{" "}
              <Link href="/login" className="text-primary hover:underline">
                Sign in
              </Link>
            </p>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}
