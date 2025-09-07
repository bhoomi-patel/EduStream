import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Users, BookOpen, Award, Globe } from "lucide-react"
import Link from "next/link"

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="py-12 md:py-20 px-4">
        <div className="container mx-auto text-center">
          <h1 className="text-3xl md:text-5xl font-bold mb-6 text-balance">About EduStream</h1>
          <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-3xl mx-auto text-pretty">
            Empowering learners across India with high-quality, affordable online education. Join thousands of students
            on their journey to success.
          </p>
          <Button size="lg" asChild>
            <Link href="/courses">Explore Courses</Link>
          </Button>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 px-4 bg-muted/50">
        <div className="container mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-2xl md:text-3xl font-bold text-primary mb-2">50K+</div>
              <div className="text-sm md:text-base text-muted-foreground">Students</div>
            </div>
            <div className="text-center">
              <div className="text-2xl md:text-3xl font-bold text-primary mb-2">500+</div>
              <div className="text-sm md:text-base text-muted-foreground">Courses</div>
            </div>
            <div className="text-center">
              <div className="text-2xl md:text-3xl font-bold text-primary mb-2">100+</div>
              <div className="text-sm md:text-base text-muted-foreground">Instructors</div>
            </div>
            <div className="text-center">
              <div className="text-2xl md:text-3xl font-bold text-primary mb-2">95%</div>
              <div className="text-sm md:text-base text-muted-foreground">Success Rate</div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-12 md:py-20 px-4">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-2xl md:text-4xl font-bold mb-6">Our Mission</h2>
              <p className="text-muted-foreground mb-6 text-pretty">
                At EduStream, we believe education should be accessible to everyone. Our platform provides world-class
                learning experiences at affordable prices, helping students across India achieve their career goals.
              </p>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Badge variant="secondary" className="p-2">
                    <Users className="h-4 w-4" />
                  </Badge>
                  <span>Expert instructors from top institutions</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Badge variant="secondary" className="p-2">
                    <BookOpen className="h-4 w-4" />
                  </Badge>
                  <span>Comprehensive curriculum design</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Badge variant="secondary" className="p-2">
                    <Award className="h-4 w-4" />
                  </Badge>
                  <span>Industry-recognized certifications</span>
                </div>
              </div>
            </div>
            <div className="bg-gradient-to-br from-primary/10 to-secondary/10 rounded-lg p-8 text-center">
              <Globe className="h-16 w-16 mx-auto mb-4 text-primary" />
              <h3 className="text-xl font-semibold mb-2">Global Impact</h3>
              <p className="text-muted-foreground">Connecting learners worldwide with quality education</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
