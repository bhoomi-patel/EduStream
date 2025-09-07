import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Star, Users, Award, MessageCircle } from "lucide-react"

interface Instructor {
  name: string
  avatar: string
  bio: string
  rating: number
  students: number
}

interface CourseInstructorProps {
  instructor: Instructor
}

export function CourseInstructor({ instructor }: CourseInstructorProps) {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Your Instructor</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center space-x-4">
            <img
              src={instructor.avatar || "/placeholder.svg"}
              alt={instructor.name}
              className="w-16 h-16 rounded-full"
            />
            <div>
              <h3 className="font-semibold text-lg">{instructor.name}</h3>
              <div className="flex items-center text-sm text-muted-foreground">
                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400 mr-1" />
                {instructor.rating} instructor rating
              </div>
            </div>
          </div>

          <p className="text-muted-foreground">{instructor.bio}</p>

          <div className="grid grid-cols-2 gap-4 text-center">
            <div>
              <div className="flex items-center justify-center mb-1">
                <Users className="h-4 w-4 text-primary mr-1" />
              </div>
              <div className="font-semibold">{instructor.students.toLocaleString()}</div>
              <div className="text-sm text-muted-foreground">Students</div>
            </div>
            <div>
              <div className="flex items-center justify-center mb-1">
                <Award className="h-4 w-4 text-primary mr-1" />
              </div>
              <div className="font-semibold">15</div>
              <div className="text-sm text-muted-foreground">Courses</div>
            </div>
          </div>

          <Button variant="outline" className="w-full bg-transparent">
            <MessageCircle className="mr-2 h-4 w-4" />
            Message Instructor
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Course Features</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex items-center text-sm">
            <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
            Lifetime access
          </div>
          <div className="flex items-center text-sm">
            <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
            Certificate of completion
          </div>
          <div className="flex items-center text-sm">
            <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
            Mobile and desktop access
          </div>
          <div className="flex items-center text-sm">
            <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
            Downloadable resources
          </div>
          <div className="flex items-center text-sm">
            <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
            Q&A support
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

function CheckCircle({ className }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 20 20">
      <path
        fillRule="evenodd"
        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
        clipRule="evenodd"
      />
    </svg>
  )
}
