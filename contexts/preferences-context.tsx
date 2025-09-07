"use client"

import { createContext, useContext, useEffect, useState, type ReactNode } from "react"
import { useTheme } from "next-themes"

interface UserPreferences {
  // Theme preferences
  theme: "light" | "dark" | "system"

  // Learning preferences
  autoplay: boolean
  subtitles: boolean
  playbackSpeed: number

  // Notification preferences
  emailUpdates: boolean
  courseReminders: boolean
  achievements: boolean
  marketing: boolean

  // Display preferences
  reducedMotion: boolean
  fontSize: "small" | "medium" | "large"
  language: string
}

interface PreferencesContextType {
  preferences: UserPreferences
  updatePreference: <K extends keyof UserPreferences>(key: K, value: UserPreferences[K]) => void
  resetPreferences: () => void
}

const defaultPreferences: UserPreferences = {
  theme: "system",
  autoplay: true,
  subtitles: false,
  playbackSpeed: 1,
  emailUpdates: true,
  courseReminders: true,
  achievements: true,
  marketing: false,
  reducedMotion: false,
  fontSize: "medium",
  language: "en",
}

const PreferencesContext = createContext<PreferencesContextType | null>(null)

export function PreferencesProvider({ children }: { children: ReactNode }) {
  const [preferences, setPreferences] = useState<UserPreferences>(defaultPreferences)
  const { setTheme } = useTheme()
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    const savedPreferences = localStorage.getItem("edustream-preferences")
    if (savedPreferences) {
      try {
        const parsed = JSON.parse(savedPreferences)
        setPreferences({ ...defaultPreferences, ...parsed })
        // Apply theme preference
        if (parsed.theme) {
          setTheme(parsed.theme)
        }
      } catch (error) {
        console.error("Failed to parse saved preferences:", error)
      }
    }
    setIsLoaded(true)
  }, []) // Removed setTheme from dependencies to prevent infinite loop

  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem("edustream-preferences", JSON.stringify(preferences))
    }
  }, [preferences, isLoaded])

  const updatePreference = <K extends keyof UserPreferences>(key: K, value: UserPreferences[K]) => {
    setPreferences((prev) => ({ ...prev, [key]: value }))

    // Apply theme changes immediately
    if (key === "theme") {
      setTheme(value as string)
    }

    // Apply font size changes to document
    if (key === "fontSize") {
      document.documentElement.setAttribute("data-font-size", value as string)
    }

    // Apply reduced motion preference
    if (key === "reducedMotion") {
      document.documentElement.setAttribute("data-reduced-motion", value ? "true" : "false")
    }
  }

  const resetPreferences = () => {
    setPreferences(defaultPreferences)
    setTheme(defaultPreferences.theme)
    localStorage.removeItem("edustream-preferences")
  }

  return (
    <PreferencesContext.Provider value={{ preferences, updatePreference, resetPreferences }}>
      {children}
    </PreferencesContext.Provider>
  )
}

export function usePreferences() {
  const context = useContext(PreferencesContext)
  if (!context) {
    throw new Error("usePreferences must be used within a PreferencesProvider")
  }
  return context
}
