"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { API_URL } from "@/lib/api-url";
import type { Booking } from "@/types";

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

export default function TutorTeachingSessionPage() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(`${API_URL}/api/bookings/tutor/me`, {
          credentials: "include",
        });
        const data = await res.json().catch(() => null);
        const allBookings = res.ok ? normalizeBookings(data?.data ?? data) : [];
        setBookings(allBookings.filter((b) => b.status === "COMPLETED"));
      } catch {
        setBookings([]);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return (
    <div className="py-8">
      <h1 className="text-3xl font-bold text-foreground">Teaching Sessions</h1>
      <p className="mt-2 text-muted-foreground">
        Your completed teaching sessions.
      </p>

      <Card className="mt-6 overflow-hidden">
        <CardHeader>
          <CardTitle>Completed Sessions</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          {loading ? (
            <p className="p-6 text-muted-foreground">Loading sessions…</p>
          ) : bookings.length === 0 ? (
            <p className="p-6 text-muted-foreground">
              No completed teaching sessions yet.
            </p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b bg-muted/50">
                    <th className="p-3 text-left font-medium">Student</th>
                    <th className="p-3 text-left font-medium">Status</th>
                    <th className="p-3 text-left font-medium">Scheduled At</th>
                  </tr>
                </thead>
                <tbody>
                  {bookings.map((b) => (
                    <tr key={b.id} className="border-b hover:bg-muted/30">
                      <td className="p-3">
                        {b.student?.name ?? b.studentId ?? "—"}
                      </td>
                      <td className="p-3">{b.status}</td>
                      <td className="p-3 text-muted-foreground">
                        {b.scheduledAt
                          ? new Date(b.scheduledAt).toLocaleString()
                          : "—"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>

      <Button asChild variant="outline" className="mt-6">
        <Link href="/tutor">Back to dashboard</Link>
      </Button>
    </div>
  );
}
