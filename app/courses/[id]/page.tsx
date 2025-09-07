import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { CourseHero } from "@/components/course-hero"
import { CourseContent } from "@/components/course-content"
import { MediaGallery } from "@/components/media-gallery"
import { CourseInstructor } from "@/components/course-instructor"

// Mock course data - in real app this would come from API
const courseData = {
  id: 1,
  title: "Complete Web Development Bootcamp",
  description: "Master modern web development with HTML, CSS, JavaScript, React, and Node.js",
  instructor: {
    name: "Sarah Johnson",
    avatar: "/placeholder.svg?height=100&width=100",
    bio: "Senior Full Stack Developer with 8+ years experience",
    rating: 4.8,
    students: 12500,
  },
  price: 7499,
  duration: "40 hours",
  level: "Beginner",
  category: "Development",
  rating: 4.8,
  students: 12500,
  lessons: 45,
  media: [
    {
      id: 1,
      title: "Introduction to Web Development",
      type: "video" as const,
      url: "/placeholder-video.mp4",
      thumbnail: "/web-development-coding.png",
      duration: "15:30",
    },
    {
      id: 2,
      title: "HTML Fundamentals",
      type: "video" as const,
      url: "/placeholder-video.mp4",
      thumbnail: "/placeholder.svg?height=200&width=300",
      duration: "22:45",
    },
    {
      id: 3,
      title: "CSS Styling Techniques",
      type: "audio" as const,
      url: "/placeholder-audio.mp3",
      thumbnail: "/placeholder.svg?height=200&width=300",
      duration: "18:20",
    },
    {
      id: 4,
      title: "JavaScript Basics",
      type: "video" as const,
      url: "/placeholder-video.mp4",
      thumbnail: "/react-nextjs-javascript.jpg",
      duration: "28:15",
    },
  ],
}

export default function CoursePage({ params }: { params: { id: string } }) {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <CourseHero course={courseData} />
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
              <CourseContent course={courseData} />
              <MediaGallery media={courseData.media} />
            </div>
            <div className="lg:col-span-1">
              <CourseInstructor instructor={courseData.instructor} />
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
