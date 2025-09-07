import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { CourseGrid } from "@/components/course-grid"
import { CourseFilters } from "@/components/course-filters"

export default function CoursesPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="py-8">
        <div className="container mx-auto px-4">
          <div className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">All Courses</h1>
            <p className="text-xl text-muted-foreground">
              Discover our comprehensive collection of interactive courses
            </p>
          </div>

          <CourseFilters />
          <CourseGrid />
        </div>
      </main>
      <Footer />
    </div>
  )
}
