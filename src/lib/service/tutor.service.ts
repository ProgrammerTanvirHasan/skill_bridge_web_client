"use server";

import { cookies } from "next/headers";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function createTutorProfile(payload: {
  bio: string;
  hourlyRate: number;
  status: string;
  categoryIds: number[];
}) {
  const cookieStore = await cookies();
  const res = await fetch(`${API_URL}/api/tutor`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      cookie: cookieStore.toString(),
    },
    body: JSON.stringify(payload),
    cache: "no-store",
  });

  const data = await res.json();
  if (!res.ok) return { data: null, error: data };
  return { data, error: null };
}

export async function getMyTutorProfile() {
  try {
    const cookieStore = await cookies();
    const res = await fetch(`${API_URL}/api/tutor/me`, {
      headers: { cookie: cookieStore.toString() },
      cache: "no-store",
    });

    const json = await res.json();
    if (!res.ok) return { data: null, error: json };

    return { data: json.data, error: null };
  } catch {
    return { data: null, error: { message: "Network error" } };
  }
}

export async function getAvailability() {
  try {
    const cookieStore = await cookies();
    const res = await fetch(`${API_URL}/api/tutor/availability`, {
      headers: { cookie: cookieStore.toString() },
      cache: "no-store",
    });

    const data = await res.json();
    if (!res.ok) return { data: null, error: data };
    return { data, error: null };
  } catch {
    return { data: null, error: { message: "Network error" } };
  }
}

export async function getAllTutors(filters?: {
  categoryId?: number;
  minRating?: number;
  maxPrice?: number;
}) {
  try {
    const params = new URLSearchParams();
    if (filters?.categoryId)
      params.append("categoryId", filters.categoryId.toString());
    if (filters?.minRating)
      params.append("minRating", filters.minRating.toString());
    if (filters?.maxPrice)
      params.append("maxPrice", filters.maxPrice.toString());

    const res = await fetch(`${API_URL}/api/tutor?${params.toString()}`, {
      headers: { cookie: (await cookies()).toString() },
      cache: "no-store",
    });

    const data = await res.json();
    if (!res.ok) return { data: null, error: data };
    return { data, error: null };
  } catch {
    return { data: null, error: { message: "Network error" } };
  }
}

export async function getTutorById(id: number) {
  try {
    const res = await fetch(`${API_URL}/api/tutor/${id}`, {
      headers: { cookie: (await cookies()).toString() },
      cache: "no-store",
    });

    const data = await res.json();
    if (!res.ok) return { data: null, error: data };
    return { data, error: null };
  } catch {
    return { data: null, error: { message: "Network error" } };
  }
}

export async function updateTutorProfile(payload: {
  bio?: string;
  hourlyRate?: number;
  status?: "AVAILABLE" | "BUSY" | "OFFLINE";
  categoryIds?: number[];
}) {
  try {
    const cookieStore = await cookies();
    const res = await fetch(`${API_URL}/api/tutor/profile`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        cookie: cookieStore.toString(),
      },
      body: JSON.stringify(payload),
      cache: "no-store",
    });

    const data = await res.json();
    if (!res.ok) return { data: null, error: data };
    return { data, error: null };
  } catch {
    return { data: null, error: { message: "Network error" } };
  }
}

export async function setAvailability(
  slots: {
    dayOfWeek: number;
    startTime: string;
    endTime: string;
  }[],
) {
  try {
    const cookieStore = await cookies();
    const res = await fetch(`${API_URL}/api/tutor/availability`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        cookie: cookieStore.toString(),
      },
      body: JSON.stringify({ slots }),
      cache: "no-store",
    });

    const data = await res.json();
    if (!res.ok) return { data: null, error: data };
    return { data, error: null };
  } catch {
    return { data: null, error: { message: "Network error" } };
  }
}
