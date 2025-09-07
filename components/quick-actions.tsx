import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Search, BookOpen, MessageCircle, Settings } from "lucide-react"
import Link from "next/link"

export function QuickActions() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Quick Actions</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <Button variant="outline" className="w-full justify-start bg-transparent" asChild>
          <Link href="/courses">
            <Search className="mr-2 h-4 w-4" />
            Browse Courses
          </Link>
        </Button>
        <Button variant="outline" className="w-full justify-start bg-transparent" asChild>
          <Link href="/dashboard/certificates">
            <BookOpen className="mr-2 h-4 w-4" />
            View Certificates
          </Link>
        </Button>
        <Button variant="outline" className="w-full justify-start bg-transparent" asChild>
          <Link href="/support">
            <MessageCircle className="mr-2 h-4 w-4" />
            Get Help
          </Link>
        </Button>
        <Button variant="outline" className="w-full justify-start bg-transparent" asChild>
          <Link href="/dashboard/settings">
            <Settings className="mr-2 h-4 w-4" />
            Account Settings
          </Link>
        </Button>
      </CardContent>
    </Card>
  )
}
