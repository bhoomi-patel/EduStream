"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, Play, Award, BookOpen } from "lucide-react"

const activities = [
  {
    id: 1,
    type: "lesson_completed",
    title: "Completed 'JavaScript Functions'",
    course: "Complete Web Development Bootcamp",
    time: "2 hours ago",
    icon: CheckCircle,
    color: "text-green-600",
  },
  {
    id: 2,
    type: "course_started",
    title: "Started 'Advanced React Patterns'",
    course: "Advanced React & Next.js Masterclass",
    time: "1 day ago",
    icon: Play,
    color: "text-blue-600",
  },
  {
    id: 3,
    type: "certificate_earned",
    title: "Earned Certificate",
    course: "UI/UX Design Fundamentals",
    time: "3 days ago",
    icon: Award,
    color: "text-yellow-600",
  },
  {
    id: 4,
    type: "course_enrolled",
    title: "Enrolled in new course",
    course: "Python for Data Science",
    time: "1 week ago",
    icon: BookOpen,
    color: "text-purple-600",
  },
]

export function RecentActivity() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Activity</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {activities.map((activity) => (
          <div
            key={activity.id}
            className="flex items-start space-x-4 p-3 rounded-lg hover:bg-muted/50 transition-colors"
          >
            <div className={`p-2 rounded-full bg-muted ${activity.color}`}>
              <activity.icon className="h-4 w-4" />
            </div>
            <div className="flex-1 space-y-1">
              <p className="font-medium">{activity.title}</p>
              <p className="text-sm text-muted-foreground">{activity.course}</p>
              <p className="text-xs text-muted-foreground">{activity.time}</p>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
