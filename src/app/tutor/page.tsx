export default function TutorDashboardPage() {
  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">
        Welcome to Your Tutor Dashboard
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className=" shadow-md rounded-lg p-5">
          <h2 className="text-xl font-semibold mb-2">Your Profile</h2>
          <p>
            Update your bio, hourly rate, availability status, and categories.
          </p>
        </div>

        <div className=" shadow-md rounded-lg p-5">
          <h2 className="text-xl font-semibold mb-2">Upcoming Bookings</h2>
          <p>Check your upcoming tutoring sessions and manage your schedule.</p>
        </div>

        <div className=" shadow-md rounded-lg p-5">
          <h2 className="text-xl font-semibold mb-2">Student Reviews</h2>
          <p>Read feedback from your students and improve your teaching.</p>
        </div>
      </div>

      <div className="mt-10 text-center text-gray-600">
        <p>
          Need help? Visit the{" "}
          <a href="/help" className="text-blue-600 underline">
            Help Center
          </a>{" "}
          or contact support.
        </p>
      </div>
    </div>
  );
}
