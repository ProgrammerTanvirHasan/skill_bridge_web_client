"use server";

import { cookies } from "next/headers";
const API = process.env.API_URL ?? "http://localhost:5000";
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

    const res = await fetch(`${API}/api/reviews`, {
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
    const cookieStore = await cookies();

    const res = await fetch(`${API}/api/reviews`, {
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
