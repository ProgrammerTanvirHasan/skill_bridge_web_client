"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getAllUsers } from "@/lib/service/user.service";
import { getAllBookings } from "@/lib/service/admin.service";

type UserRole = "ADMIN" | "TUTOR" | "STUDENT";

interface User {
  id: string;
  role: UserRole;
}

interface Booking {
  id: number;
}

export default function AdminDashboardPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const usersRes = await getAllUsers();
        const bookingsRes = await getAllBookings();

        setUsers(usersRes.data.data ?? []);
        setBookings(bookingsRes.data.data ?? []);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  if (loading) {
    return <p className="text-center py-10">Loading statistics…</p>;
  }

  const totalTutors = users.filter((u) => u.role === "TUTOR").length;
  const totalStudents = users.filter((u) => u.role === "STUDENT").length;
  const totalBookings = bookings.length;

  return (
    <div className="">
      <h1 className="text-3xl font-bold text-center mb-6">Admin Dashboard</h1>

      <Card className="w-full overflow-x-auto">
        <CardHeader>
          <CardTitle>User & Booking Statistics</CardTitle>
        </CardHeader>
        <CardContent>
          <Table className="w-full min-w-[300px]">
            <TableHeader>
              <TableRow>
                <TableHead>Type</TableHead>
                <TableHead>Count</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow className="hover:bg-gray-50">
                <TableCell>Tutors</TableCell>
                <TableCell>{totalTutors}</TableCell>
              </TableRow>
              <TableRow className="hover:bg-gray-50">
                <TableCell>Students</TableCell>
                <TableCell>{totalStudents}</TableCell>
              </TableRow>
              <TableRow className="hover:bg-gray-50">
                <TableCell>Total Bookings</TableCell>
                <TableCell>{totalBookings}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
