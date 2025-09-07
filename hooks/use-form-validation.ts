"use client"

import { useState, useCallback, useRef } from "react"

interface ValidationRule {
  required?: boolean
  minLength?: number
  maxLength?: number
  pattern?: RegExp
  custom?: (value: string) => string | null
}

interface ValidationRules {
  [key: string]: ValidationRule
}

interface ValidationErrors {
  [key: string]: string
}

interface FormValidationHook {
  errors: ValidationErrors
  isValid: boolean
  validateField: (name: string, value: string) => string | null
  validateForm: (formData: Record<string, string>) => boolean
  clearError: (name: string) => void
  clearAllErrors: () => void
  setCustomError: (name: string, error: string) => void
}

export function useFormValidation(rules: ValidationRules): FormValidationHook {
  const [errors, setErrors] = useState<ValidationErrors>({})
  const rulesRef = useRef(rules)

  // Update rules ref when rules change
  rulesRef.current = rules

  const validateField = useCallback((name: string, value: string): string | null => {
    const rule = rulesRef.current[name]
    if (!rule) return null

    // Required validation
    if (rule.required && (!value || value.trim() === "")) {
      return "This field is required"
    }

    // Skip other validations if field is empty and not required
    if (!value || value.trim() === "") {
      return null
    }

    // Min length validation
    if (rule.minLength && value.length < rule.minLength) {
      return `Must be at least ${rule.minLength} characters`
    }

    // Max length validation
    if (rule.maxLength && value.length > rule.maxLength) {
      return `Must be no more than ${rule.maxLength} characters`
    }

    // Pattern validation
    if (rule.pattern && !rule.pattern.test(value)) {
      return "Invalid format"
    }

    // Custom validation
    if (rule.custom) {
      return rule.custom(value)
    }

    return null
  }, [])

  const validateForm = useCallback(
    (formData: Record<string, string>): boolean => {
      const newErrors: ValidationErrors = {}
      let isFormValid = true

      Object.keys(rulesRef.current).forEach((fieldName) => {
        const error = validateField(fieldName, formData[fieldName] || "")
        if (error) {
          newErrors[fieldName] = error
          isFormValid = false
        }
      })

      setErrors(newErrors)
      return isFormValid
    },
    [validateField],
  )

  const clearError = useCallback((name: string) => {
    setErrors((prev) => {
      const newErrors = { ...prev }
      delete newErrors[name]
      return newErrors
    })
  }, [])

  const clearAllErrors = useCallback(() => {
    setErrors({})
  }, [])

  const setCustomError = useCallback((name: string, error: string) => {
    setErrors((prev) => ({ ...prev, [name]: error }))
  }, [])

  const isValid = Object.keys(errors).length === 0

  return {
    errors,
    isValid,
    validateField,
    validateForm,
    clearError,
    clearAllErrors,
    setCustomError,
  }
}
