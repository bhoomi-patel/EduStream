import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Star, Clock, Users, BookOpen, Play } from "lucide-react"
import { AddToCartButton } from "@/components/add-to-cart-button"

interface Course {
  id: number
  title: string
  description: string
  instructor: {
    name: string
    avatar: string
  }
  price: number
  duration: string
  level: string
  category: string
  rating: number
  students: number
  lessons: number
}

interface CourseHeroProps {
  course: Course
}

export function CourseHero({ course }: CourseHeroProps) {
  return (
    <section className="bg-gradient-to-r from-primary/10 to-accent/10 py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <div className="space-y-6">
            <div className="space-y-2">
              <Badge variant="secondary">{course.category}</Badge>
              <h1 className="text-3xl md:text-4xl font-bold text-balance">{course.title}</h1>
              <p className="text-xl text-muted-foreground text-pretty">{course.description}</p>
            </div>

            <div className="flex items-center space-x-4">
              <img
                src={course.instructor.avatar || "/placeholder.svg"}
                alt={course.instructor.name}
                className="w-12 h-12 rounded-full"
              />
              <div>
                <p className="font-semibold">{course.instructor.name}</p>
                <div className="flex items-center text-sm text-muted-foreground">
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400 mr-1" />
                  {course.rating} • {course.students.toLocaleString()} students
                </div>
              </div>
            </div>

            <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
              <div className="flex items-center">
                <Clock className="h-4 w-4 mr-1" />
                {course.duration}
              </div>
              <div className="flex items-center">
                <BookOpen className="h-4 w-4 mr-1" />
                {course.lessons} lessons
              </div>
              <div className="flex items-center">
                <Users className="h-4 w-4 mr-1" />
                {course.level}
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <AddToCartButton course={course} />
              <Button size="lg" variant="outline">
                <Play className="mr-2 h-5 w-5" />
                Preview Course
              </Button>
            </div>
          </div>

          <div className="aspect-video rounded-lg overflow-hidden bg-muted">
            <img src="/web-development-coding.png" alt="Course preview" className="w-full h-full object-cover" />
          </div>
        </div>
      </div>
    </section>
  )
}
