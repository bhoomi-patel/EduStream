import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Users, MessageSquare, Trophy, Calendar } from "lucide-react"
import Link from "next/link"

export default function CommunityPage() {
  return (
    <div className="min-h-screen bg-background py-12 px-4">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">EduStream Community</h1>
          <p className="text-lg text-muted-foreground">
            Connect with fellow learners, share knowledge, and grow together
          </p>
        </div>

        {/* Community Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
          <Card className="text-center">
            <CardContent className="pt-6">
              <Users className="h-8 w-8 mx-auto mb-2 text-primary" />
              <div className="text-2xl font-bold">50K+</div>
              <div className="text-sm text-muted-foreground">Active Members</div>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardContent className="pt-6">
              <MessageSquare className="h-8 w-8 mx-auto mb-2 text-primary" />
              <div className="text-2xl font-bold">25K+</div>
              <div className="text-sm text-muted-foreground">Discussions</div>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardContent className="pt-6">
              <Trophy className="h-8 w-8 mx-auto mb-2 text-primary" />
              <div className="text-2xl font-bold">1K+</div>
              <div className="text-sm text-muted-foreground">Success Stories</div>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardContent className="pt-6">
              <Calendar className="h-8 w-8 mx-auto mb-2 text-primary" />
              <div className="text-2xl font-bold">100+</div>
              <div className="text-sm text-muted-foreground">Events Monthly</div>
            </CardContent>
          </Card>
        </div>

        {/* Community Features */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <Card>
            <CardHeader>
              <CardTitle>Discussion Forums</CardTitle>
              <CardDescription>Join topic-specific discussions and get help from the community</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                  <div>
                    <div className="font-medium">Web Development</div>
                    <div className="text-sm text-muted-foreground">2.5K discussions</div>
                  </div>
                  <Badge>Active</Badge>
                </div>
                <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                  <div>
                    <div className="font-medium">Data Science</div>
                    <div className="text-sm text-muted-foreground">1.8K discussions</div>
                  </div>
                  <Badge>Active</Badge>
                </div>
                <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                  <div>
                    <div className="font-medium">Digital Marketing</div>
                    <div className="text-sm text-muted-foreground">1.2K discussions</div>
                  </div>
                  <Badge>Active</Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Study Groups</CardTitle>
              <CardDescription>Form study groups with fellow learners and learn together</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p className="text-muted-foreground">
                  Join or create study groups to collaborate on projects, share resources, and motivate each other
                  throughout your learning journey.
                </p>
                <Button className="w-full">Join a Study Group</Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Contact Info */}
        <Card>
          <CardHeader>
            <CardTitle>Need Help Getting Started?</CardTitle>
            <CardDescription>Our community managers are here to help you connect and engage</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row md:items-center md:justify-between">
              <div>
                <p className="text-muted-foreground mb-2">
                  Contact our community team for assistance with forums, study groups, or events.
                </p>
                <p className="font-medium">Community Support: xyz - 2314325435</p>
              </div>
              <Button asChild className="mt-4 md:mt-0">
                <Link href="/contact">Contact Support</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
