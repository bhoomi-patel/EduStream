import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, Clock, FileText } from "lucide-react"

interface Course {
  title: string
  description: string
}

interface CourseContentProps {
  course: Course
}

const courseModules = [
  {
    id: 1,
    title: "Getting Started with Web Development",
    lessons: 5,
    duration: "2 hours",
    completed: true,
    topics: [
      "Introduction to HTML",
      "Setting up your development environment",
      "Creating your first webpage",
      "Understanding web browsers",
      "Web development tools overview",
    ],
  },
  {
    id: 2,
    title: "HTML Fundamentals",
    lessons: 8,
    duration: "4 hours",
    completed: true,
    topics: [
      "HTML document structure",
      "Common HTML elements",
      "Forms and input elements",
      "Semantic HTML",
      "Accessibility best practices",
    ],
  },
  {
    id: 3,
    title: "CSS Styling and Layout",
    lessons: 10,
    duration: "6 hours",
    completed: false,
    topics: [
      "CSS syntax and selectors",
      "Box model and positioning",
      "Flexbox and Grid layouts",
      "Responsive design principles",
      "CSS animations and transitions",
    ],
  },
  {
    id: 4,
    title: "JavaScript Programming",
    lessons: 12,
    duration: "8 hours",
    completed: false,
    topics: [
      "JavaScript fundamentals",
      "DOM manipulation",
      "Event handling",
      "Asynchronous programming",
      "Modern JavaScript features",
    ],
  },
]

export function CourseContent({ course }: CourseContentProps) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-4">Course Content</h2>
        <p className="text-muted-foreground">
          Comprehensive curriculum designed to take you from beginner to advanced level
        </p>
      </div>

      <div className="space-y-4">
        {courseModules.map((module) => (
          <Card key={module.id} className="overflow-hidden">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg flex items-center">
                  {module.completed ? (
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                  ) : (
                    <div className="h-5 w-5 rounded-full border-2 border-muted-foreground mr-2" />
                  )}
                  {module.title}
                </CardTitle>
                <Badge variant={module.completed ? "default" : "secondary"}>
                  {module.completed ? "Completed" : "Locked"}
                </Badge>
              </div>
              <div className="flex items-center text-sm text-muted-foreground space-x-4">
                <div className="flex items-center">
                  <FileText className="h-4 w-4 mr-1" />
                  {module.lessons} lessons
                </div>
                <div className="flex items-center">
                  <Clock className="h-4 w-4 mr-1" />
                  {module.duration}
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {module.topics.map((topic, index) => (
                  <li key={index} className="flex items-center text-sm">
                    <div className="h-2 w-2 rounded-full bg-muted-foreground mr-3" />
                    {topic}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
