import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getAllBookings } from "@/lib/service/admin.service";
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

export default async function AdminBookingsPage() {
  const result = await getAllBookings();
  const bookings = result.error ? [] : normalizeBookings(result.data ?? null);

  return (
    <div className="py-8">
      <h1 className="text-3xl font-bold text-foreground">Bookings</h1>
      <p className="mt-2 text-muted-foreground">View all platform bookings.</p>

      <Card className="mt-6 overflow-hidden">
        <CardHeader>
          <CardTitle>All bookings</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          {bookings.length === 0 ? (
            <p className="p-6 text-muted-foreground">No bookings found.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b bg-muted/50">
                    <th className="p-3 text-left font-medium">ID</th>
                    <th className="p-3 text-left font-medium">Student</th>
                    <th className="p-3 text-left font-medium">Tutor</th>
                    <th className="p-3 text-left font-medium">Status</th>
                    <th className="p-3 text-left font-medium">Scheduled At</th>
                  </tr>
                </thead>
                <tbody>
                  {bookings.map((b) => (
                    <tr key={b.id} className="border-b hover:bg-muted/30">
                      <td className="p-3 font-mono text-muted-foreground">
                        {String(b.id).slice(0, 8)}
                      </td>
                      <td className="p-3">
                        {b.student?.name ?? b.studentId ?? "—"}
                      </td>
                      <td className="p-3">
                        {b.tutor?.user?.name ?? b.tutorId ?? "—"}
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
        <Link href="/admin">Back to dashboard</Link>
      </Button>
    </div>
  );
}
