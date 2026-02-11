"use server";

import { cookies } from "next/headers";

export async function createReview(payload: {
  tutorId: number;
  rating: number;
  comment?: string | null;
  bookingId?: number;
}) {
  try {
    const cookieStore = await cookies(); // ✅ inside function

    const body: Record<string, unknown> = {
      tutorId: payload.tutorId,
      rating: payload.rating,
      comment: payload.comment ?? "",
    };

    if (payload.bookingId != null) {
      body.bookingId = payload.bookingId;
    }

    const res = await fetch("http://localhost:5000/api/reviews", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        cookie: cookieStore.toString(),
      },
      body: JSON.stringify(body),
      cache: "no-store",
    });

    const data = await res.json();

    if (!res.ok) return { data: null, error: data };

    return { data, error: null };
  } catch {
    return { data: null, error: { message: "Something went wrong" } };
  }
}

export async function getMyReviews() {
  try {
    const cookieStore = await cookies(); // ✅ MUST be inside

    const res = await fetch("http://localhost:5000/api/reviews", {
      headers: {
        cookie: cookieStore.toString(),
      },
      cache: "no-store",
    });

    const data = await res.json();

    if (!res.ok) {
      return { data: null, error: data };
    }

    return { data, error: null };
  } catch {
    return { data: null, error: { message: "Something went wrong" } };
  }
}
