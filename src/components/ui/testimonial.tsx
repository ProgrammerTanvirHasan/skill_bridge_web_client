const testimonials = [
  {
    id: 1,
    name: "Sarah Johnson",
    role: "Student",
    avatar: "https://i.pravatar.cc/100?img=5",
    testimonial:
      "SkillBridge helped me find an amazing math tutor who made learning fun and easy!",
  },
  {
    id: 2,
    name: "Michael Lee",
    role: "Tutor",
    avatar: "https://i.pravatar.cc/100?img=12",
    testimonial:
      "As a tutor on SkillBridge, I love the flexibility and great students I get to work with.",
  },
  {
    id: 3,
    name: "Emily Davis",
    role: "Student",
    avatar: "https://i.pravatar.cc/100?img=8",
    testimonial:
      "Booking sessions was seamless, and the tutors are truly experts. Highly recommend!",
  },
  {
    id: 4,
    name: "David Kim",
    role: "Tutor",
    avatar: "https://i.pravatar.cc/100?img=15",
    testimonial:
      "SkillBridge’s platform is very intuitive. Managing my schedule and students is super easy.",
  },
];

export default function Testimonials() {
  return (
    <div className=" px-6 flex flex-col ">
      <h1 className="text-4xl font-extrabold mb-4 ">What Our Users Say</h1>
      <p className="text-center max-w-2xl mb-12  text-lg">
        Real feedback from students and tutors on how SkillBridge has
        transformed their learning and teaching experiences.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 w-full">
        {testimonials.map(({ id, name, role, avatar, testimonial }) => (
          <div
            key={id}
            className="bg-white rounded-lg shadow-md p-8 flex flex-col items-center text-center hover:shadow-lg transition-shadow duration-300"
          >
            <img
              src={avatar}
              alt={`${name}'s avatar`}
              className="w-24 h-24 rounded-full mb-6 object-cover"
            />
            <p className="text-gray-800 italic mb-4">"{testimonial}"</p>
            <h3 className="text-xl font-semibold text-indigo-600">{name}</h3>
            <span className="text-sm text-gray-500">{role}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
