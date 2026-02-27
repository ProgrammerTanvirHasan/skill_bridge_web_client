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
import {
  getTutorBookings,
  updateBookingStatus,
} from "@/lib/service/booking.service";
import { BookingStatus } from "@/types";

interface Booking {
  id: number;
  student: { name: string };
  scheduledAt: string;
  status: BookingStatus;
}

export default function BookedSession() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState<number | null>(null);

  useEffect(() => {
    async function fetchBookings() {
      const res = await getTutorBookings();
      if (!res.error) setBookings(res.data);
      setLoading(false);
    }
    fetchBookings();
  }, []);

  const handleStatusChange = async (
    bookingId: number,
    newStatus: BookingStatus,
  ) => {
    setUpdatingId(bookingId);
    const res = await updateBookingStatus(bookingId, newStatus);
    if (!res.error) {
      setBookings((prev) =>
        prev.map((b) => (b.id === bookingId ? { ...b, status: newStatus } : b)),
      );
    } else {
      alert(res.error.message || "Failed to update status");
    }
    setUpdatingId(null);
  };

  if (loading) return <p className="text-center py-10">Loading bookings…</p>;

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6 text-center">
        All Booked Sessions
      </h1>

      <Card className="w-full overflow-x-auto">
        <CardHeader>
          <CardTitle>Booked Sessions</CardTitle>
        </CardHeader>
        <CardContent>
          <Table className="w-full min-w-[500px]">
            <TableHeader>
              <TableRow>
                <TableHead>Student</TableHead>
                <TableHead>Scheduled At</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {bookings.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={3} className="text-center">
                    No bookings found.
                  </TableCell>
                </TableRow>
              ) : (
                bookings.map((b) => (
                  <TableRow key={b.id}>
                    <TableCell>{b.student.name}</TableCell>
                    <TableCell>
                      {new Date(b.scheduledAt).toLocaleString()}
                    </TableCell>
                    <TableCell>
                      <select
                        value={b.status}
                        onChange={(e) =>
                          handleStatusChange(
                            b.id,
                            e.target.value as BookingStatus,
                          )
                        }
                        className="border p-1 rounded"
                        disabled={updatingId === b.id}
                      >
                        <option value="PENDING">PENDING</option>
                        <option value="CONFIRMED">CONFIRMED</option>
                        <option value="COMPLETED">COMPLETED</option>
                        <option value="CANCELLED">CANCELLED</option>
                      </select>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
