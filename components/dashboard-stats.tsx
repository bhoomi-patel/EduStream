"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BookOpen, Clock, Award, TrendingUp } from "lucide-react"

const stats = [
  {
    title: "Courses Enrolled",
    value: "12",
    change: "+2 this month",
    icon: BookOpen,
    color: "text-blue-600",
  },
  {
    title: "Hours Learned",
    value: "47.5",
    change: "+8.2 this week",
    icon: Clock,
    color: "text-green-600",
  },
  {
    title: "Certificates Earned",
    value: "5",
    change: "+1 this month",
    icon: Award,
    color: "text-yellow-600",
  },
  {
    title: "Learning Streak",
    value: "12 days",
    change: "Keep it up!",
    icon: TrendingUp,
    color: "text-purple-600",
  },
]

export function DashboardStats() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat) => (
        <Card key={stat.title}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
            <stat.icon className={`h-4 w-4 ${stat.color}`} />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stat.value}</div>
            <p className="text-xs text-muted-foreground">{stat.change}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
