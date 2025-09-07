"use client"

import type React from "react"

import { useState, useEffect, forwardRef } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"
import { CheckCircle, AlertCircle } from "lucide-react"

interface ValidatedInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
  onValidate?: (value: string) => string | null
  showValidationIcon?: boolean
  validateOnBlur?: boolean
  validateOnChange?: boolean
}

export const ValidatedInput = forwardRef<HTMLInputElement, ValidatedInputProps>(
  (
    {
      label,
      error,
      onValidate,
      showValidationIcon = true,
      validateOnBlur = true,
      validateOnChange = false,
      className,
      onChange,
      onBlur,
      ...props
    },
    ref,
  ) => {
    const [internalError, setInternalError] = useState<string | null>(null)
    const [touched, setTouched] = useState(false)
    const [isValid, setIsValid] = useState<boolean | null>(null)

    const currentError = error || internalError
    const showError = touched && currentError
    const showSuccess = touched && !currentError && props.value && showValidationIcon

    const validateValue = (value: string) => {
      if (!onValidate) return null
      return onValidate(value)
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value
      onChange?.(e)

      if (validateOnChange && touched) {
        const validationError = validateValue(value)
        setInternalError(validationError)
        setIsValid(validationError === null)
      }
    }

    const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
      setTouched(true)
      onBlur?.(e)

      if (validateOnBlur) {
        const validationError = validateValue(e.target.value)
        setInternalError(validationError)
        setIsValid(validationError === null)
      }
    }

    // Clear internal error when external error changes
    useEffect(() => {
      if (error) {
        setInternalError(null)
        setIsValid(false)
      }
    }, [error])

    return (
      <div className="space-y-2">
        {label && (
          <Label htmlFor={props.id} className={cn(showError && "text-destructive")}>
            {label}
          </Label>
        )}
        <div className="relative">
          <Input
            ref={ref}
            className={cn(
              className,
              showError && "border-destructive focus-visible:ring-destructive",
              showSuccess && "border-green-500 focus-visible:ring-green-500",
              (showError || showSuccess) && "pr-10",
            )}
            onChange={handleChange}
            onBlur={handleBlur}
            {...props}
          />
          {showValidationIcon && (showError || showSuccess) && (
            <div className="absolute right-3 top-1/2 -translate-y-1/2">
              {showError ? (
                <AlertCircle className="h-4 w-4 text-destructive" />
              ) : (
                <CheckCircle className="h-4 w-4 text-green-500" />
              )}
            </div>
          )}
        </div>
        {showError && <p className="text-sm text-destructive">{currentError}</p>}
      </div>
    )
  },
)

ValidatedInput.displayName = "ValidatedInput"
