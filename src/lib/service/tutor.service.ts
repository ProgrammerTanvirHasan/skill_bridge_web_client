"use server";

import { cookies } from "next/headers";

export async function createTutorProfile(payload: {
  bio: string;
  hourlyRate: number;
  status: string;
  categoryIds: number[];
}) {
  const cookieStore = await cookies();
  const res = await fetch("http://localhost:5000/api/tutor", {
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

    const res = await fetch("http://localhost:5000/api/tutor/me", {
      headers: {
        Cookie: cookieStore.toString(),
      },
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
    const res = await fetch("http://localhost:5000/api/tutor/availability", {
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
    const url = `http://localhost:5000/api/tutor?${params.toString()}`;
    const res = await fetch(url, { cache: "no-store" });
    const data = await res.json();
    if (!res.ok) return { data: null, error: data };
    return { data, error: null };
  } catch {
    return { data: null, error: { message: "Network error" } };
  }
}

export async function getTutorById(id: number) {
  try {
    const res = await fetch(`http://localhost:5000/api/tutor/${id}`, {
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
    const res = await fetch("http://localhost:5000/api/tutor/profile", {
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
    const res = await fetch("http://localhost:5000/api/tutor/availability", {
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
