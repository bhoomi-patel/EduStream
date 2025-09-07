import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CheckCircle, Download, Play } from "lucide-react"
import Link from "next/link"

export default function CheckoutSuccessPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto text-center space-y-8">
          <div className="space-y-4">
            <div className="flex justify-center">
              <CheckCircle className="h-16 w-16 text-green-500" />
            </div>
            <h1 className="text-3xl font-bold">Payment Successful!</h1>
            <p className="text-xl text-muted-foreground">
              Thank you for your purchase. You now have access to your courses.
            </p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>What's Next?</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Button asChild className="h-auto p-4">
                  <Link href="/dashboard">
                    <div className="text-center">
                      <Play className="h-6 w-6 mx-auto mb-2" />
                      <div className="font-semibold">Start Learning</div>
                      <div className="text-sm opacity-80">Access your courses</div>
                    </div>
                  </Link>
                </Button>
                <Button variant="outline" asChild className="h-auto p-4 bg-transparent">
                  <Link href="/dashboard/certificates">
                    <div className="text-center">
                      <Download className="h-6 w-6 mx-auto mb-2" />
                      <div className="font-semibold">Get Certificates</div>
                      <div className="text-sm opacity-80">Download upon completion</div>
                    </div>
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>

          <div className="text-sm text-muted-foreground">
            <p>A confirmation email has been sent to your email address.</p>
            <p>If you have any questions, please contact our support team.</p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
