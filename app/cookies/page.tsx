export default function CookiesPage() {
  return (
    <div className="min-h-screen bg-background py-12 px-4">
      <div className="container mx-auto max-w-4xl">
        <h1 className="text-3xl md:text-4xl font-bold mb-8">Cookie Policy</h1>

        <div className="prose prose-gray dark:prose-invert max-w-none space-y-6">
          <section>
            <h2 className="text-xl font-semibold mb-4">What Are Cookies</h2>
            <p className="text-muted-foreground">
              Cookies are small text files that are stored on your computer or mobile device when you visit our website.
              They help us provide you with a better experience by remembering your preferences and improving our
              services.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4">How We Use Cookies</h2>
            <p className="text-muted-foreground mb-4">We use cookies for several purposes:</p>
            <ul className="list-disc list-inside text-muted-foreground space-y-2">
              <li>Essential cookies: Required for the website to function properly</li>
              <li>Performance cookies: Help us understand how visitors interact with our website</li>
              <li>Functionality cookies: Remember your preferences and settings</li>
              <li>Marketing cookies: Used to deliver relevant advertisements</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4">Managing Cookies</h2>
            <p className="text-muted-foreground">
              You can control and manage cookies in various ways. Most web browsers automatically accept cookies, but
              you can modify your browser settings to decline cookies if you prefer. However, this may affect the
              functionality of our website.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4">Third-Party Cookies</h2>
            <p className="text-muted-foreground">
              We may use third-party services that set cookies on our website. These include analytics services, payment
              processors, and social media platforms. These third parties have their own privacy policies.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4">Contact Us</h2>
            <p className="text-muted-foreground">
              If you have any questions about our use of cookies, please contact us at xyz - 2314325435.
            </p>
          </section>
        </div>
      </div>
    </div>
  )
}
