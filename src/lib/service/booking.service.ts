"use server";

import { BookingStatus } from "@/types";
import { cookies } from "next/headers";
const API = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:5000";
export async function createBooking(payload: {
  tutorId: number;
  scheduledAt: Date;
}) {
  try {
    const cookieStore = await cookies();
    const body = {
      tutorId: payload.tutorId,
      scheduledAt: payload.scheduledAt.toISOString(),
    };
    const res = await fetch(`${API}/api/bookings`, {
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
    return { data: null, error: { message: "something went wrong" } };
  }
}

export async function getMyBookings() {
  try {
    const cookieStore = await cookies();
    const res = await fetch(`${API}/api/bookings`, {
      headers: { cookie: cookieStore.toString() },
      cache: "no-store",
    });
    const data = await res.json();
    if (!res.ok) return { data: null, error: data };
    return { data, error: null };
  } catch {
    return { data: null, error: { message: "something went wrong" } };
  }
}

export async function getBookingById(id: number) {
  try {
    const cookieStore = await cookies();
    const res = await fetch(`${API}/api/bookings/${id}`, {
      headers: { cookie: cookieStore.toString() },
      cache: "no-store",
    });
    const data = await res.json();
    if (!res.ok) return { data: null, error: data };
    return { data, error: null };
  } catch {
    return { data: null, error: { message: "something went wrong" } };
  }
}

export async function getTutorBookings() {
  try {
    const cookieStore = await cookies();
    const res = await fetch(`${API}/api/bookings/tutor/me`, {
      headers: { cookie: cookieStore.toString() },
      cache: "no-store",
    });
    const data = await res.json();
    if (!res.ok) return { data: [], error: data };
    return { data: data.data, error: null };
  } catch {
    return { data: [], error: { message: "Something went wrong" } };
  }
}

export async function updateBookingStatus(
  id: string | number,
  status: BookingStatus,
) {
  try {
    const cookieStore = await cookies();
    const res = await fetch(`${API}/api/bookings/${id}/status`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        cookie: cookieStore.toString(),
      },
      body: JSON.stringify({ status }),
      cache: "no-store",
    });
    const data = await res.json();
    if (!res.ok) return { data: null, error: data };
    return { data, error: null };
  } catch {
    return { data: null, error: { message: "something went wrong" } };
  }
}
