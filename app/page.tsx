import { Header } from "@/components/header"
import { Hero } from "@/components/hero"
import { FeaturedCourses } from "@/components/featured-courses"
import { Footer } from "@/components/footer"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <Hero />
        <FeaturedCourses />
      </main>
      <Footer />
    </div>
  )
}
