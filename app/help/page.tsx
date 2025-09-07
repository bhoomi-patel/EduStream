import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Search, MessageCircle, Phone } from "lucide-react"
import Link from "next/link"

export default function HelpPage() {
  return (
    <div className="min-h-screen bg-background py-12 px-4">
      <div className="container mx-auto max-w-4xl">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Help Center</h1>
          <p className="text-lg text-muted-foreground">Find answers to common questions and get support</p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-12">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Search className="h-5 w-5" />
                <span>Getting Started</span>
              </CardTitle>
              <CardDescription>Learn how to navigate EduStream and start your learning journey</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                New to EduStream? Our getting started guide will help you create an account, browse courses, and begin
                learning.
              </p>
              <Button variant="outline" asChild>
                <Link href="/courses">Browse Courses</Link>
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <MessageCircle className="h-5 w-5" />
                <span>Contact Support</span>
              </CardTitle>
              <CardDescription>Get in touch with our support team for personalized help</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                Need help with your account, courses, or technical issues? Our support team is here to assist you.
              </p>
              <div className="flex items-center space-x-2 text-sm">
                <Phone className="h-4 w-4" />
                <span>xyz - 2314325435</span>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Frequently Asked Questions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h3 className="font-semibold mb-2">How do I access my purchased courses?</h3>
              <p className="text-muted-foreground">
                After purchasing a course, you can access it from your dashboard. All purchased courses have lifetime
                access.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Can I get a refund?</h3>
              <p className="text-muted-foreground">
                Yes, we offer a 30-day money-back guarantee for all courses. Contact support to request a refund.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Do I get a certificate after completion?</h3>
              <p className="text-muted-foreground">
                Yes, you'll receive a certificate of completion for each course you finish. Certificates can be
                downloaded from your dashboard.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
