import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Clock, Star, Users } from "lucide-react"
import Link from "next/link"

const featuredCourses = [
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
  },
]

export function FeaturedCourses() {
  return (
    <section className="py-20 px-4">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Featured Courses</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Discover our most popular courses taught by industry experts
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredCourses.map((course) => (
            <Card key={course.id} className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="aspect-video relative overflow-hidden">
                <img
                  src={course.image || "/placeholder.svg"}
                  alt={course.title}
                  className="w-full h-full object-cover"
                />
                <Badge className="absolute top-2 left-2" variant="secondary">
                  {course.category}
                </Badge>
              </div>

              <CardHeader>
                <div className="flex items-center justify-between mb-2">
                  <Badge variant="outline">{course.level}</Badge>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400 mr-1" />
                    {course.rating}
                  </div>
                </div>
                <CardTitle className="text-lg">{course.title}</CardTitle>
                <p className="text-sm text-muted-foreground">by {course.instructor}</p>
              </CardHeader>

              <CardContent>
                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <div className="flex items-center">
                    {course.duration}
                  </div>
                  <div className="flex items-center">
                    {course.students.toLocaleString()}
                  </div>
                </div>
              </CardContent>

              <CardFooter className="flex items-center justify-between">
                <div className="text-2xl font-bold text-primary">₹{course.price}</div>
                <Button asChild>
                  <Link href={`/courses/${course.id}`}>Enroll Now</Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button size="lg" variant="outline" asChild>
            <Link href="/courses">View All Courses</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
