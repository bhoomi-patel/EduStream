import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Download, Award, Calendar, ArrowLeft } from "lucide-react"
import Link from "next/link"

const certificates = [
  {
    id: 1,
    courseName: "UI/UX Design Fundamentals",
    instructor: "Emma Davis",
    completedDate: "2024-01-15",
    certificateId: "CERT-2024-001",
    image: "/ui-ux-design-interface.png",
  },
  {
    id: 2,
    courseName: "JavaScript Essentials",
    instructor: "John Smith",
    completedDate: "2023-12-20",
    certificateId: "CERT-2023-045",
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    id: 3,
    courseName: "Digital Marketing Basics",
    instructor: "Lisa Brown",
    completedDate: "2023-11-10",
    certificateId: "CERT-2023-032",
    image: "/placeholder.svg?height=200&width=300",
  },
]

export default function CertificatesPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="space-y-8">
          <div>
            <Button variant="ghost" asChild className="mb-4">
              <Link href="/dashboard">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Dashboard
              </Link>
            </Button>
            <h1 className="text-3xl font-bold">Your Certificates</h1>
            <p className="text-muted-foreground">Download and share your achievements</p>
          </div>

          {certificates.length === 0 ? (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-12 text-center">
                <Award className="h-16 w-16 text-muted-foreground mb-4" />
                <h3 className="text-lg font-semibold mb-2">No certificates yet</h3>
                <p className="text-muted-foreground mb-4">Complete courses to earn certificates</p>
                <Button asChild>
                  <Link href="/courses">Browse Courses</Link>
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {certificates.map((cert) => (
                <Card key={cert.id} className="overflow-hidden">
                  <div className="aspect-video relative">
                    <img
                      src={cert.image || "/placeholder.svg"}
                      alt={cert.courseName}
                      className="w-full h-full object-cover"
                    />
                    <Badge className="absolute top-2 left-2">
                      <Award className="h-3 w-3 mr-1" />
                      Certified
                    </Badge>
                  </div>
                  <CardHeader>
                    <CardTitle className="text-lg line-clamp-2">{cert.courseName}</CardTitle>
                    <p className="text-sm text-muted-foreground">by {cert.instructor}</p>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Calendar className="h-4 w-4 mr-2" />
                      Completed on {new Date(cert.completedDate).toLocaleDateString()}
                    </div>
                    <div className="text-xs text-muted-foreground">Certificate ID: {cert.certificateId}</div>
                    <Button className="w-full">
                      <Download className="mr-2 h-4 w-4" />
                      Download Certificate
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  )
}
