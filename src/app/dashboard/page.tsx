export default function StudentDashboardPage() {
  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">
        Welcome to Your Student Dashboard
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className=" shadow-md rounded-lg p-5">
          <h2 className="text-xl font-semibold mb-2">My Bookings</h2>
          <p>View and manage your upcoming tutoring sessions.</p>
        </div>

        <div className=" shadow-md rounded-lg p-5">
          <h2 className="text-xl font-semibold mb-2">Favorite Tutors</h2>
          <p>Keep track of your preferred tutors for quick access.</p>
        </div>

        <div className=" shadow-md rounded-lg p-5">
          <h2 className="text-xl font-semibold mb-2">Reviews</h2>
          <p>See and manage your reviews of tutors you've worked with.</p>
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
