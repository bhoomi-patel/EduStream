"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Play, Clock, CheckCircle } from "lucide-react"
import Link from "next/link"

const enrolledCourses = [
  {
    id: 1,
    title: "Complete Web Development Bootcamp",
    instructor: "Sarah Johnson",
    progress: 75,
    totalLessons: 45,
    completedLessons: 34,
    timeRemaining: "8 hours left",
    image: "/web-development-coding.png",
    status: "in-progress",
  },
  {
    id: 2,
    title: "Advanced React & Next.js Masterclass",
    instructor: "Mike Chen",
    progress: 45,
    totalLessons: 32,
    completedLessons: 14,
    timeRemaining: "18 hours left",
    image: "/react-nextjs-javascript.jpg",
    status: "in-progress",
  },
  {
    id: 3,
    title: "UI/UX Design Fundamentals",
    instructor: "Emma Davis",
    progress: 100,
    totalLessons: 28,
    completedLessons: 28,
    timeRemaining: "Completed",
    image: "/ui-ux-design-interface.png",
    status: "completed",
  },
]

export function CourseProgress() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Your Courses</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {enrolledCourses.map((course) => (
          <div key={course.id} className="flex items-start space-x-4 p-4 border rounded-lg">
            <img
              src={course.image || "/placeholder.svg"}
              alt={course.title}
              className="w-20 h-14 object-cover rounded"
            />
            <div className="flex-1 space-y-2">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-semibold line-clamp-1">{course.title}</h3>
                  <p className="text-sm text-muted-foreground">by {course.instructor}</p>
                </div>
                <Badge variant={course.status === "completed" ? "default" : "secondary"}>
                  {course.status === "completed" ? "Completed" : "In Progress"}
                </Badge>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span>
                    {course.completedLessons} of {course.totalLessons} lessons
                  </span>
                  <span className="text-muted-foreground">{course.progress}%</span>
                </div>
                <Progress value={course.progress} className="h-2" />
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center text-sm text-muted-foreground">
                  <Clock className="h-4 w-4 mr-1" />
                  {course.timeRemaining}
                </div>
                <Button size="sm" asChild>
                  <Link href={`/courses/${course.id}`}>
                    {course.status === "completed" ? (
                      <>
                        <CheckCircle className="mr-2 h-4 w-4" />
                        Review
                      </>
                    ) : (
                      <>
                        <Play className="mr-2 h-4 w-4" />
                        Continue
                      </>
                    )}
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
