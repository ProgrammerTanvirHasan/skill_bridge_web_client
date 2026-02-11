"use client";

import { useEffect, useState } from "react";

type UserRole = "ADMIN" | "TUTOR" | "STUDENT";

interface User {
  id: string;
  role: UserRole;
}

interface Booking {
  id: number;
}

import { getAllUsers } from "@/lib/service/user.service";
import { getAllBookings } from "@/lib/service/admin.service";

export default function PlatformStatistics() {
  const [users, setUsers] = useState<User[]>([]);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const usersRes = await getAllUsers();
        const bookingsRes = await getAllBookings();

        setUsers(usersRes.data?.data ?? []);
        setBookings(bookingsRes.data?.data ?? []);
      } catch (err) {
        console.error("Failed to fetch data", err);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  if (loading) {
    return <p className="text-center py-10">Loading statistics…</p>;
  }

  // Compute statistics dynamically
  const totalTutors = users.filter((u) => u.role === "TUTOR").length;
  const totalStudents = users.filter((u) => u.role === "STUDENT").length;
  const totalBookings = bookings.length;

  const statisticsData = [
    { label: "Tutors", value: totalTutors.toString(), icon: "🎓" },
    { label: "Students", value: totalStudents.toString(), icon: "🧑‍🎓" },
    { label: "Sessions Booked", value: totalBookings.toString(), icon: "📚" },
  ];

  return (
    <div className="py-8 flex flex-col items-center">
      <h1 className="text-4xl font-extrabold mb-4 text-center">
        Platform Growth & Statistics
      </h1>
      <p className="text-center max-w-xl mb-12 text-lg text-muted-foreground">
        See how SkillBridge is growing every day with expert tutors and
        thousands of successful tutoring sessions.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 max-w-5xl w-full">
        {statisticsData.map(({ label, value, icon }) => (
          <div
            key={label}
            className="bg-white rounded-xl shadow-md p-8 flex flex-col items-center hover:shadow-xl transition-shadow duration-300"
          >
            <div className="text-6xl mb-4">{icon}</div>
            <div className="text-3xl font-bold text-indigo-600">{value}</div>
            <div className="text-gray-600 mt-2 text-lg">{label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
