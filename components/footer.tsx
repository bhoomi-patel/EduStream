import Link from "next/link"
import { Facebook, Twitter, Instagram, Linkedin } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-muted py-12 px-4">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center space-x-2">
              <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-lg">E</span>
              </div>
              <span className="font-bold text-xl">EduStream</span>
            </Link>
            <p className="text-muted-foreground">Empowering learners worldwide with interactive online education.</p>
            <div className="flex space-x-4">
              <Link href="#" className="text-muted-foreground hover:text-primary">
                <Facebook className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-primary">
                <Twitter className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-primary">
                <Instagram className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-primary">
                <Linkedin className="h-5 w-5" />
              </Link>
            </div>
          </div>

          {/* Courses */}
          <div className="space-y-4">
            <h3 className="font-semibold">Courses</h3>
            <div className="space-y-2">
              <Link href="/courses" className="block text-muted-foreground hover:text-primary">
                Development
              </Link>
              <Link href="/courses" className="block text-muted-foreground hover:text-primary">
                Design
              </Link>
              <Link href="/courses" className="block text-muted-foreground hover:text-primary">
                Business
              </Link>
              <Link href="/courses" className="block text-muted-foreground hover:text-primary">
                Marketing
              </Link>
            </div>
          </div>

          {/* Support */}
          <div className="space-y-4">
            <h3 className="font-semibold">Support</h3>
            <div className="space-y-2">
              <Link href="/help" className="block text-muted-foreground hover:text-primary">
                Help Center
              </Link>
              <Link href="/contact" className="block text-muted-foreground hover:text-primary">
                Contact Us
              </Link>
              <Link href="/faq" className="block text-muted-foreground hover:text-primary">
                FAQ
              </Link>
              <Link href="/community" className="block text-muted-foreground hover:text-primary">
                Community
              </Link>
            </div>
          </div>

          {/* Legal */}
          <div className="space-y-4">
            <h3 className="font-semibold">Legal</h3>
            <div className="space-y-2">
              <Link href="/privacy" className="block text-muted-foreground hover:text-primary">
                Privacy Policy
              </Link>
              <Link href="/terms" className="block text-muted-foreground hover:text-primary">
                Terms of Service
              </Link>
              <Link href="/cookies" className="block text-muted-foreground hover:text-primary">
                Cookie Policy
              </Link>
            </div>
          </div>
        </div>

        <div className="border-t mt-8 pt-8 text-center text-muted-foreground">
          <p>© 2025 EduStream. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
