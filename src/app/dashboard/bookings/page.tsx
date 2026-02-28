"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { API_URL } from "@/lib/api-url";
import type { Booking } from "@/types";
import { StudentBookingTable } from "./booking-table";

function normalizeBookings(data: unknown): Booking[] {
  if (Array.isArray(data)) return data as Booking[];
  if (
    data &&
    typeof data === "object" &&
    "data" in data &&
    Array.isArray((data as { data: unknown }).data)
  )
    return (data as { data: Booking[] }).data;
  if (
    data &&
    typeof data === "object" &&
    "bookings" in data &&
    Array.isArray((data as { bookings: unknown }).bookings)
  )
    return (data as { bookings: Booking[] }).bookings;
  return [];
}

export default function DashboardBookingsPage() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(`${API_URL}/api/bookings/tutor/me`, {
          credentials: "include",
        });
        const data = await res.json().catch(() => null);
        const list = res.ok ? normalizeBookings(data?.data ?? data) : [];
        setBookings(list);
      } catch {
        setBookings([]);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return (
    <div className="py-8">
      <h1 className="text-2xl font-bold text-foreground">My Bookings</h1>
      <p className="mt-1 text-muted-foreground">
        Upcoming and past tutoring sessions.
      </p>

      <Card className="mt-6 overflow-hidden">
        <CardHeader>
          <CardTitle>All bookings</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          {loading ? (
            <p className="p-6 text-muted-foreground">Loading bookings...</p>
          ) : (
            <StudentBookingTable initialBookings={bookings} />
          )}
        </CardContent>
      </Card>

      <Button asChild variant="outline" className="mt-6">
        <Link href="/dashboard">Back to dashboard</Link>
      </Button>
    </div>
  );
}
