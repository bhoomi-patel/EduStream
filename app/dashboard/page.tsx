"use client"

import { useEffect, useState } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { DashboardStats } from "@/components/dashboard-stats"
import { CourseProgress } from "@/components/course-progress"
import { RecentActivity } from "@/components/recent-activity"
import { LearningGoals } from "@/components/learning-goals"
import { QuickActions } from "@/components/quick-actions"

export default function DashboardPage() {
  const [userName, setUserName] = useState("User")

  useEffect(() => {
    const currentUser = localStorage.getItem("edustream_current_user")
    if (currentUser) {
      const user = JSON.parse(currentUser)
      setUserName(`${user.firstName} ${user.lastName}`)
    }
  }, [])

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="space-y-8">
          {/* Welcome Section */}
          <div className="space-y-2">
            <h1 className="text-3xl font-bold">Welcome back, {userName}!</h1>
            <p className="text-muted-foreground">Continue your learning journey and track your progress</p>
          </div>

          {/* Dashboard Stats */}
          <DashboardStats />

          {/* Main Dashboard Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
              <CourseProgress />
              <RecentActivity />
            </div>
            <div className="space-y-8">
              <QuickActions />
              <LearningGoals />
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
