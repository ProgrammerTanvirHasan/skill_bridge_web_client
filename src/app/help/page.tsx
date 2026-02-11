export default function HelpPage() {
  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">Help Center</h1>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-3">Getting Started</h2>
        <p>
          Welcome! If you're new here, you can create a profile, browse
          tutors/students, and book sessions.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-3">Common Questions</h2>
        <ul className="list-disc list-inside space-y-2">
          <li>
            <strong>How do I create or update my profile?</strong> Visit your
            dashboard and fill in the profile form.
          </li>
          <li>
            <strong>How do I book a tutoring session?</strong> Browse tutors and
            select a slot that suits you.
          </li>
          <li>
            <strong>How do I manage my bookings?</strong> Go to your dashboard
            and click on "My Bookings".
          </li>
          <li>
            <strong>How to contact support?</strong> You can email
            support@example.com or use the contact form below.
          </li>
        </ul>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-3">Contact Us</h2>
        <p>
          If you need further assistance, please email{" "}
          <a
            href="mailto:support@example.com"
            className="text-blue-600 underline"
          >
            support@example.com
          </a>
          .
        </p>
      </section>
    </div>
  );
}
