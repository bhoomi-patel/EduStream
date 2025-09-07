import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

export default function FAQPage() {
  return (
    <div className="min-h-screen bg-background py-12 px-4">
      <div className="container mx-auto max-w-4xl">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Frequently Asked Questions</h1>
          <p className="text-lg text-muted-foreground">
            Find quick answers to the most common questions about EduStream
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>General Questions</CardTitle>
            <CardDescription>Common questions about using EduStream</CardDescription>
          </CardHeader>
          <CardContent>
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1">
                <AccordionTrigger>What is EduStream?</AccordionTrigger>
                <AccordionContent>
                  EduStream is an online learning platform that offers high-quality courses across various subjects
                  including development, design, business, and marketing. Our platform is designed specifically for
                  Indian learners with affordable pricing in rupees.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-2">
                <AccordionTrigger>How do I create an account?</AccordionTrigger>
                <AccordionContent>
                  Click on the "Sign Up" button in the top navigation, fill in your details, and verify your email
                  address. Once verified, you can start browsing and purchasing courses.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-3">
                <AccordionTrigger>What payment methods do you accept?</AccordionTrigger>
                <AccordionContent>
                  We accept all major credit cards, debit cards, UPI, net banking, and digital wallets. All payments are
                  processed securely and prices are displayed in Indian Rupees (₹).
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-4">
                <AccordionTrigger>Can I access courses on mobile devices?</AccordionTrigger>
                <AccordionContent>
                  Yes! EduStream is fully responsive and works perfectly on all devices including smartphones, tablets,
                  and desktop computers. You can learn anywhere, anytime.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-5">
                <AccordionTrigger>Do you offer certificates?</AccordionTrigger>
                <AccordionContent>
                  Yes, upon successful completion of a course, you'll receive a certificate of completion that you can
                  download and share on professional networks like LinkedIn.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-6">
                <AccordionTrigger>How long do I have access to purchased courses?</AccordionTrigger>
                <AccordionContent>
                  Once you purchase a course, you have lifetime access to all course materials, including any future
                  updates or additional content added by the instructor.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-7">
                <AccordionTrigger>Can I get help if I'm stuck?</AccordionTrigger>
                <AccordionContent>
                  You can contact our support team at xyz - 2314325435 or use the community forums to get help from
                  instructors and fellow students.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
