"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import type { Booking, BookingStatus } from "@/types";
import { updateBookingStatus } from "@/lib/service/booking.service";

export function StudentBookingTable({
  initialBookings,
}: {
  initialBookings: Booking[];
}) {
  const router = useRouter();
  const [bookings, setBookings] = useState(initialBookings);
  const [loadingId, setLoadingId] = useState<number | null>(null);
  const [reviewingBooking, setReviewingBooking] = useState<Booking | null>(
    null,
  );
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewComment, setReviewComment] = useState("");
  const [reviewSubmitting, setReviewSubmitting] = useState(false);
  const [reviewError, setReviewError] = useState<string | null>(null);
  const [reviewedIds, setReviewedIds] = useState<Set<number>>(new Set());
  const API_URL = process.env.NEXT_PUBLIC_API_URL;
  async function handleCancel(id: number) {
    if (!confirm("Cancel this booking?")) return;
    setLoadingId(id);
    try {
      const result = await updateBookingStatus(
        id,
        "CANCELLED" as BookingStatus,
      );
      if (result.error) throw new Error("Failed to cancel");
      setBookings((prev) =>
        prev.map((b) => (b.id === id ? { ...b, status: "CANCELLED" } : b)),
      );
      router.refresh();
    } catch {
      alert("Failed to cancel booking.");
    } finally {
      setLoadingId(null);
    }
  }

  function openReviewForm(booking: Booking) {
    setReviewingBooking(booking);
    setReviewRating(5);
    setReviewComment("");
    setReviewError(null);
  }

  async function submitReview() {
    if (!reviewingBooking) return;
    setReviewSubmitting(true);
    setReviewError(null);

    try {
      const res = await fetch(`${API_URL}/api/reviews`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          tutorId: reviewingBooking.tutorId,
          bookingId: reviewingBooking.id,
          rating: reviewRating,
          comment: reviewComment.trim() || "",
        }),
      });

      const data = await res.json();

      if (!res.ok || data.success === false) {
        setReviewError(data.message || "Failed to submit review");
        return;
      }

      setReviewedIds((prev) => new Set(prev).add(reviewingBooking.id));
      setReviewingBooking(null);
    } catch (error) {
      setReviewError("Something went wrong");
    } finally {
      setReviewSubmitting(false);
    }
  }

  if (bookings.length === 0) {
    return <p className="p-6 text-muted-foreground">No bookings yet.</p>;
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b bg-muted/50">
            <th className="p-3 text-left font-medium">Tutor</th>
            <th className="p-3 text-left font-medium">Status</th>
            <th className="p-3 text-left font-medium">Scheduled At</th>
            <th className="p-3 text-right font-medium">Action</th>
          </tr>
        </thead>
        <tbody>
          {bookings.map((b) => (
            <React.Fragment key={b.id}>
              <tr className="border-b hover:bg-muted/30">
                <td className="p-3">
                  {b.tutor?.user?.name ?? b.tutorId ?? "—"}
                </td>
                <td className="p-3">{b.status}</td>
                <td className="p-3 text-muted-foreground">
                  {b.scheduledAt
                    ? new Date(b.scheduledAt).toLocaleString()
                    : "—"}
                </td>
                <td className="p-3 text-right">
                  {b.status === "CONFIRMED" && (
                    <Button
                      size="sm"
                      variant="ghost"
                      className="text-destructive"
                      disabled={loadingId === b.id}
                      onClick={() => handleCancel(b.id)}
                    >
                      {loadingId === b.id ? "Cancelling..." : "Cancel"}
                    </Button>
                  )}
                  {b.status === "COMPLETED" &&
                    (reviewedIds.has(b.id) ? (
                      <span className="text-muted-foreground text-xs">
                        Reviewed
                      </span>
                    ) : (
                      <Button
                        size="sm"
                        variant="outline"
                        disabled={!!reviewingBooking}
                        onClick={() => openReviewForm(b)}
                      >
                        Review
                      </Button>
                    ))}
                </td>
              </tr>

              {reviewingBooking?.id === b.id && (
                <tr key={`${b.id}-review-form`}>
                  <td colSpan={4} className="bg-muted/20 p-4">
                    <div className="max-w-md space-y-3">
                      <p className="text-sm font-medium">
                        Rate this session (1–5)
                      </p>
                      <select
                        className="rounded-md border border-input bg-background px-2 py-1.5 text-sm"
                        value={reviewRating}
                        onChange={(e) =>
                          setReviewRating(Number(e.target.value))
                        }
                      >
                        {[1, 2, 3, 4, 5].map((n) => (
                          <option key={n} value={n}>
                            {n} star{n > 1 ? "s" : ""}
                          </option>
                        ))}
                      </select>

                      <div className="space-y-1">
                        <Label htmlFor="review-comment">
                          Comment (optional)
                        </Label>
                        <textarea
                          id="review-comment"
                          className="w-full min-h-[80px] rounded-md border border-input bg-background px-3 py-2 text-sm"
                          placeholder="How was the session?"
                          value={reviewComment}
                          onChange={(e) => setReviewComment(e.target.value)}
                        />
                      </div>

                      {reviewError && (
                        <p className="text-sm text-destructive">
                          {reviewError}
                        </p>
                      )}

                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          disabled={reviewSubmitting}
                          onClick={submitReview}
                        >
                          {reviewSubmitting ? "Submitting…" : "Submit review"}
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          disabled={reviewSubmitting}
                          onClick={() => setReviewingBooking(null)}
                        >
                          Cancel
                        </Button>
                      </div>
                    </div>
                  </td>
                </tr>
              )}
            </React.Fragment>
          ))}
        </tbody>
      </table>
    </div>
  );
}
