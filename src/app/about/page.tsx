import { Button } from "@/components/ui/button";
import Link from "next/link";

const About = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-16 px-6 md:px-20 lg:px-40">
      <h1 className="text-5xl font-extrabold text-center mb-12 text-indigo-700">
        About SkillBridge
      </h1>

      {/* Introduction */}
      <section className="max-w-4xl mx-auto text-center mb-16">
        <p className="text-lg text-gray-700 leading-relaxed">
          SkillBridge is a dynamic online platform connecting students with
          expert tutors across a wide range of subjects. Whether you're looking
          to master a language, ace your exams, or learn a new skill,
          SkillBridge makes personalized learning accessible and easy.
        </p>
      </section>

      {/* Mission */}
      <section className="max-w-4xl mx-auto mb-20">
        <h2 className="text-3xl font-semibold text-indigo-600 mb-6 text-center">
          Our Mission
        </h2>
        <p className="text-center text-gray-700 text-lg leading-relaxed max-w-3xl mx-auto">
          We believe everyone deserves access to quality education. Our mission
          is to bridge the gap between learners and tutors by providing a
          reliable, user-friendly platform that empowers lifelong learning.
        </p>
      </section>

      {/* How It Works */}
      <section className="max-w-5xl mx-auto mb-20">
        <h2 className="text-3xl font-semibold text-indigo-600 mb-10 text-center">
          How It Works
        </h2>

        <div className="flex flex-col md:flex-row justify-around gap-12 text-center">
          <div className="flex flex-col items-center max-w-xs mx-auto">
            <div className="bg-indigo-100 text-indigo-700 rounded-full w-20 h-20 flex items-center justify-center mb-6 text-4xl">
              🧑‍🎓
            </div>
            <h3 className="text-xl font-semibold mb-2">For Students</h3>
            <p className="text-gray-600">
              Browse and search expert tutors by subject, rating, and price.
              Book sessions instantly to learn at your own pace.
            </p>
          </div>

          <div className="flex flex-col items-center max-w-xs mx-auto">
            <div className="bg-indigo-100 text-indigo-700 rounded-full w-20 h-20 flex items-center justify-center mb-6 text-4xl">
              👨‍🏫
            </div>
            <h3 className="text-xl font-semibold mb-2">For Tutors</h3>
            <p className="text-gray-600">
              Create your profile, set availability, manage bookings, and
              connect with motivated students eager to learn.
            </p>
          </div>

          <div className="flex flex-col items-center max-w-xs mx-auto">
            <div className="bg-indigo-100 text-indigo-700 rounded-full w-20 h-20 flex items-center justify-center mb-6 text-4xl">
              🔗
            </div>
            <h3 className="text-xl font-semibold mb-2">Simple & Secure</h3>
            <p className="text-gray-600">
              Our platform ensures secure payments, transparent reviews, and a
              seamless booking experience for all users.
            </p>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="max-w-4xl mx-auto mb-20 text-center">
        <h2 className="text-3xl font-semibold text-indigo-600 mb-8">
          Why Choose SkillBridge?
        </h2>
        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-8 text-left max-w-3xl mx-auto">
          <li className="flex items-center gap-4">
            <span className="text-indigo-600 text-3xl">✔️</span>
            <span>Expert tutors vetted for quality and experience</span>
          </li>
          <li className="flex items-center gap-4">
            <span className="text-indigo-600 text-3xl">✔️</span>
            <span>Instant booking and flexible scheduling</span>
          </li>
          <li className="flex items-center gap-4">
            <span className="text-indigo-600 text-3xl">✔️</span>
            <span>Transparent reviews and ratings from real users</span>
          </li>
          <li className="flex items-center gap-4">
            <span className="text-indigo-600 text-3xl">✔️</span>
            <span>Secure and user-friendly platform</span>
          </li>
        </ul>
      </section>

      {/* Call to Action */}
      <section className="text-center">
        <h2 className="text-3xl font-semibold mb-6">
          Ready to Start Learning?
        </h2>
        <Button className="bg-indigo-600 text-white rounded-md px-8 py-4 font-semibold hover:bg-indigo-700 transition">
          <Link href={"/tutors"}>Browse Tutors</Link>
        </Button>
      </section>
    </div>
  );
};

export default About;
