export default function TermsPage() {
  return (
    <div className="min-h-screen bg-background py-12 px-4">
      <div className="container mx-auto max-w-4xl">
        <h1 className="text-3xl md:text-4xl font-bold mb-8">Terms of Service</h1>

        <div className="prose prose-gray dark:prose-invert max-w-none space-y-6">
          <section>
            <h2 className="text-xl font-semibold mb-4">1. Acceptance of Terms</h2>
            <p className="text-muted-foreground">
              By accessing and using EduStream, you accept and agree to be bound by the terms and provision of this
              agreement.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4">2. Course Access</h2>
            <p className="text-muted-foreground">
              Upon purchase, you will have lifetime access to course materials unless otherwise specified. Course
              content is for personal use only and cannot be redistributed.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4">3. Refund Policy</h2>
            <p className="text-muted-foreground">
              We offer a 30-day money-back guarantee for all courses. Refund requests must be submitted within 30 days
              of purchase with valid reasons.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4">4. User Conduct</h2>
            <p className="text-muted-foreground">
              Users must not engage in any activity that disrupts or interferes with the platform. Sharing account
              credentials is strictly prohibited.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4">5. Contact Information</h2>
            <p className="text-muted-foreground">
              For any questions regarding these terms, please contact us at xyz - 2314325435.
            </p>
          </section>
        </div>
      </div>
    </div>
  )
}
