import { Button } from "@/components/ui/button"
import { Play, BookOpen, Users, Award } from "lucide-react"
import Link from "next/link"

export function Hero() {
  return (
    <section className="py-12 md:py-20 px-4 bg-gradient-to-br from-background to-muted">
      <div className="container mx-auto text-center">
        <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold mb-4 md:mb-6 text-balance leading-tight">
          Learn Without Limits with EduStream
        </h1>
        <p className="text-base sm:text-lg md:text-xl text-muted-foreground mb-6 md:mb-8 max-w-2xl mx-auto text-pretty px-2">
          Access thousands of interactive courses, track your progress, and learn from industry experts. Your journey to mastery starts here.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center mb-8 md:mb-12 px-4">
          <Button size="lg" asChild className="w-full sm:w-auto">
            <Link href="/courses">
              Browse Courses
            </Link>
          </Button>
          <Button size="lg" variant="outline" asChild className="w-full sm:w-auto bg-transparent">
            <Link href="/demo">
              Watch Demo
            </Link>
          </Button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 md:gap-8 max-w-4xl mx-auto px-4">
          <div className="text-center">
            <div className="text-2xl sm:text-3xl font-bold text-primary">500+</div>
            <div className="text-sm sm:text-base text-muted-foreground">Courses Available</div>
          </div>
          <div className="text-center">
            <div className="text-2xl sm:text-3xl font-bold text-primary">50K+</div>
            <div className="text-sm sm:text-base text-muted-foreground">Active Students</div>
          </div>
          <div className="text-center">
            <div className="text-2xl sm:text-3xl font-bold text-primary">95%</div>
            <div className="text-sm sm:text-base text-muted-foreground">Completion Rate</div>
          </div>
        </div>
      </div>
    </section>
  )
}
