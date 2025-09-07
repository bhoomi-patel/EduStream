import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { Analytics } from "@vercel/analytics/next"
import { ThemeProvider } from "@/components/theme-provider"
import { CartProvider } from "@/contexts/cart-context"
import { PreferencesProvider } from "@/contexts/preferences-context"
import { Suspense } from "react"
import "./globals.css"

export const metadata: Metadata = {
  title: "EduStream - Modern Online Learning Platform",
  description: "Interactive online courses with multimedia content, progress tracking, and secure learning experience",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable}`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <PreferencesProvider>
            <Suspense fallback={null}>
              <CartProvider>{children}</CartProvider>
            </Suspense>
          </PreferencesProvider>
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  )
}
