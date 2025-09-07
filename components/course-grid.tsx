"use client"

import { useState } from "react"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Clock, Star, Users, Play } from "lucide-react"
import Link from "next/link"

const courses = [
  {
    id: 1,
    title: "Complete Web Development Bootcamp",
    instructor: "Sarah Johnson",
    rating: 4.8,
    students: 12500,
    duration: "40 hours",
    price: 7499,
    image: "/web-development-coding.png",
    category: "Development",
    level: "Beginner",
    hasVideo: true,
  },
  {
    id: 2,
    title: "Advanced React & Next.js Masterclass",
    instructor: "Mike Chen",
    rating: 4.9,
    students: 8200,
    duration: "32 hours",
    price: 10999,
    image: "/react-nextjs-javascript.jpg",
    category: "Development",
    level: "Advanced",
    hasVideo: true,
  },
  {
    id: 3,
    title: "UI/UX Design Fundamentals",
    instructor: "Emma Davis",
    rating: 4.7,
    students: 9800,
    duration: "28 hours",
    price: 6499,
    image: "/ui-ux-design-interface.png",
    category: "Design",
    level: "Intermediate",
    hasVideo: true,
  },
  {
    id: 4,
    title: "Python for Data Science",
    instructor: "David Wilson",
    rating: 4.6,
    students: 7500,
    duration: "35 hours",
    price: 8299,
    image: "/placeholder.svg?height=200&width=300",
    category: "Data Science",
    level: "Intermediate",
    hasVideo: true,
  },
  {
    id: 5,
    title: "Digital Marketing Mastery",
    instructor: "Lisa Brown",
    rating: 4.5,
    students: 6200,
    duration: "25 hours",
    price: 5799,
    image: "/placeholder.svg?height=200&width=300",
    category: "Marketing",
    level: "Beginner",
    hasVideo: false,
  },
  {
    id: 6,
    title: "Mobile App Development with Flutter",
    instructor: "Alex Rodriguez",
    rating: 4.8,
    students: 5800,
    duration: "42 hours",
    price: 9999,
    image: "/placeholder.svg?height=200&width=300",
    category: "Development",
    level: "Advanced",
    hasVideo: true,
  },
]

export function CourseGrid() {
  const [hoveredCourse, setHoveredCourse] = useState<number | null>(null)

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {courses.map((course) => (
        <Card
          key={course.id}
          className="overflow-hidden hover:shadow-lg transition-all duration-300 group"
          onMouseEnter={() => setHoveredCourse(course.id)}
          onMouseLeave={() => setHoveredCourse(null)}
        >
          <div className="aspect-video relative overflow-hidden">
            <img
              src={course.image || "/placeholder.svg"}
              alt={course.title}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
            <Badge className="absolute top-2 left-2" variant="secondary">
              {course.category}
            </Badge>
            {course.hasVideo && (
              <div
                className={`absolute inset-0 bg-black/20 flex items-center justify-center transition-opacity duration-300 ${
                  hoveredCourse === course.id ? "opacity-100" : "opacity-0"
                }`}
              >
                <div className="bg-white/90 rounded-full p-3">
                  <Play className="h-6 w-6 text-primary" />
                </div>
              </div>
            )}
          </div>

          <CardHeader>
            <div className="flex items-center justify-between mb-2">
              <Badge variant="outline">{course.level}</Badge>
              <div className="flex items-center text-sm text-muted-foreground">
                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400 mr-1" />
                {course.rating}
              </div>
            </div>
            <CardTitle className="text-lg line-clamp-2">{course.title}</CardTitle>
            <p className="text-sm text-muted-foreground">by {course.instructor}</p>
          </CardHeader>

          <CardContent>
            <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
              <div className="flex items-center">
                <Clock className="h-4 w-4 mr-1" />
                {course.duration}
              </div>
              <div className="flex items-center">
                <Users className="h-4 w-4 mr-1" />
                {course.students.toLocaleString()}
              </div>
            </div>
          </CardContent>

          <CardFooter className="flex items-center justify-between">
            <div className="text-2xl font-bold text-primary">₹{course.price}</div>
            <Button asChild>
              <Link href={`/courses/${course.id}`}>View Course</Link>
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}
