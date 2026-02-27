"use client";

import { use, useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Star, ArrowLeft } from "lucide-react";
import { ModeToggle } from "@/components/ui/MoodToggle";
import { createBooking } from "@/lib/service/booking.service";
import { useSession } from "@/lib/session-context";
import { UserRole } from "@/types";

interface Tutor {
  id: number | string;
  name: string;
  subjects: string[];
  hourlyRate: number;
  rating: number;
  reviewsCount: number;
  bio: string;
}

interface Review {
  name: string;
  rating: number;
  comment: string;
  date: string;
}

interface Params {
  id: string;
}

export default function TutorProfilePage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { id } = use(params) as Params;
  const router = useRouter();

  const { user, loading: sessionLoading } = useSession();
  const userRole = user?.role as UserRole | null;

  const [tutor, setTutor] = useState<Tutor | null>(null);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [showBookingForm, setShowBookingForm] = useState(false);
  const [scheduledAt, setScheduledAt] = useState("");
  const [bookingLoading, setBookingLoading] = useState(false);
  const [bookingError, setBookingError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchTutor() {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(`http://localhost:5000/api/tutor/${id}`, {
          credentials: "include",
        });

        if (!res.ok) {
          const errorData = await res.json();
          throw new Error(errorData.message || "Failed to fetch tutor");
        }

        const data = (await res.json()).data;

        const fetchedTutor: Tutor = {
          id: data.id,
          name: data.user?.name || "No Name",
          subjects:
            data.categories?.map((c: any) => c.category?.name || "Unknown") ||
            [],
          hourlyRate: data.hourlyRate,
          rating: data.reviews?.length
            ? data.reviews.reduce((acc: number, r: any) => acc + r.rating, 0) /
              data.reviews.length
            : 0,
          reviewsCount: data.reviews?.length || 0,
          bio: data.bio || "",
        };

        const fetchedReviews: Review[] =
          data.reviews?.map((r: any) => ({
            name: r.user?.name || "Anonymous",
            rating: r.rating,
            comment: r.comment,
            date: new Date(r.createdAt).toLocaleDateString("en-US", {
              year: "numeric",
              month: "short",
            }),
          })) || [];

        setTutor(fetchedTutor);
        setReviews(fetchedReviews);
      } catch (err: any) {
        setError(err.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    }

    fetchTutor();
  }, [id]);

  // Booking handlers
  const handleBookNowClick = () => {
    if (userRole === "STUDENT") {
      setShowBookingForm(true);
    }
  };

  const handleCreateBooking = async () => {
    if (!scheduledAt.trim()) {
      setBookingError("Please select date & time");
      return;
    }

    const tutorId = Number(id);
    if (Number.isNaN(tutorId)) {
      setBookingError("Invalid tutor");
      return;
    }

    const at = new Date(scheduledAt);
    if (Number.isNaN(at.getTime())) {
      setBookingError("Invalid date & time");
      return;
    }

    setBookingLoading(true);
    setBookingError(null);

    try {
      const result = await createBooking({ tutorId, scheduledAt: at });
      if ((result as any)?.error) {
        setBookingError((result as any).error.message || "Booking failed");
        return;
      }

      setShowBookingForm(false);
      setScheduledAt("");
      router.push("/dashboard/bookings");
    } catch (err: unknown) {
      setBookingError(
        err instanceof Error ? err.message : "Something went wrong",
      );
    } finally {
      setBookingLoading(false);
    }
  };

  // Loading / error states
  if (loading || sessionLoading)
    return <p className="py-12 text-center">Loading...</p>;
  if (error)
    return (
      <div className="py-12 text-center">
        <p className="text-red-600">{error}</p>
        <Button asChild variant="link" className="mt-4">
          <Link href="/tutors">Back to tutors</Link>
        </Button>
      </div>
    );
  if (!tutor)
    return (
      <div className="py-12 text-center">
        <p className="text-muted-foreground">Tutor not found.</p>
        <Button asChild variant="link" className="mt-4">
          <Link href="/tutors">Back to tutors</Link>
        </Button>
      </div>
    );

  return (
    <div className="min-h-screen py-8 md:py-12">
      <div className="flex justify-between">
        <Button asChild variant="ghost" size="sm" className="mb-6 -ml-2">
          <Link href="/tutors" className="flex items-center gap-2">
            <ArrowLeft className="size-4" />
            Back to tutors
          </Link>
        </Button>
        <ModeToggle />
      </div>

      <div className="grid gap-8 lg:grid-cols-[1fr_320px]">
        {/* Tutor Info */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <CardTitle className="text-2xl">{tutor.name}</CardTitle>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {tutor.subjects.map((subject) => (
                      <Badge key={subject}>{subject}</Badge>
                    ))}
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Star className="size-5 fill-amber-400 text-amber-400" />
                  <span className="text-lg font-semibold">
                    {tutor.rating.toFixed(2)}
                  </span>
                  <span className="text-muted-foreground">
                    ({tutor.reviewsCount} reviews)
                  </span>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="whitespace-pre-wrap text-muted-foreground">
                {tutor.bio}
              </p>
            </CardContent>
          </Card>

          {/* Reviews */}
          <Card>
            <CardHeader>
              <CardTitle>Reviews</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {reviews.length === 0 && (
                <p className="text-muted-foreground">No reviews yet.</p>
              )}
              {reviews.map((r, i) => (
                <div key={i} className="border-b pb-6 last:border-0 last:pb-0">
                  <div className="flex items-center gap-2">
                    <span className="font-medium">{r.name}</span>
                    <div className="flex">
                      {[1, 2, 3, 4, 5].map((j) => (
                        <Star
                          key={j}
                          className={`size-4 ${
                            j <= r.rating
                              ? "fill-amber-400 text-amber-400"
                              : "text-muted-foreground/50"
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-sm text-muted-foreground">
                      {r.date}
                    </span>
                  </div>
                  <p className="mt-2 text-sm text-muted-foreground">
                    {r.comment}
                  </p>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Booking Section */}
        <div>
          <Card className="sticky top-24">
            <CardHeader>
              <CardTitle>Book a session</CardTitle>
              <p className="text-sm text-muted-foreground">
                1-hour session with {tutor.name}
              </p>
              <p className="text-2xl font-bold text-foreground">
                ${tutor.hourlyRate}/hr
              </p>
            </CardHeader>
            <CardContent className="space-y-4">
              {!user ? (
                <Button asChild size="lg" className="w-full">
                  <Link
                    href={`/login?redirect=${encodeURIComponent(`/tutors/${id}`)}`}
                  >
                    Log in to book
                  </Link>
                </Button>
              ) : userRole === "STUDENT" ? (
                !showBookingForm ? (
                  <Button
                    size="lg"
                    className="w-full"
                    onClick={handleBookNowClick}
                  >
                    Book now
                  </Button>
                ) : (
                  <>
                    <Label htmlFor="scheduledAt">Date & time</Label>
                    <Input
                      id="scheduledAt"
                      type="datetime-local"
                      value={scheduledAt}
                      onChange={(e) => setScheduledAt(e.target.value)}
                    />
                    {bookingError && (
                      <p className="text-sm text-red-600">{bookingError}</p>
                    )}
                    <Button
                      size="lg"
                      className="w-full"
                      onClick={handleCreateBooking}
                      disabled={bookingLoading}
                    >
                      {bookingLoading ? "Booking…" : "Confirm booking"}
                    </Button>
                  </>
                )
              ) : (
                <p className="text-sm text-muted-foreground">
                  Only students can book a session. Please contact support or
                  change your account type.
                </p>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
