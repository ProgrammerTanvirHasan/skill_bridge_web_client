"use server";

import { cookies } from "next/headers";

export async function getAllCategories() {
  try {
    const cookieStore = await cookies();
    const res = await fetch("http://localhost:5000/api/admin/categories", {
      headers: { cookie: cookieStore.toString() },
      cache: "no-store",
    });
    if (!res.ok)
      return { data: null, error: { message: "Failed to fetch categories" } };
    const json = await res.json();
    const list = json.data ?? json ?? [];
    return { data: Array.isArray(list) ? list : [], error: null };
  } catch {
    return { data: null, error: { message: "something went wrong" } };
  }
}

export async function createCategory(name: string) {
  try {
    const cookieStore = await cookies();
    const res = await fetch("http://localhost:5000/api/admin/categories", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        cookie: cookieStore.toString(),
      },
      body: JSON.stringify({ name }),
      cache: "no-store",
    });
    const data = await res.json();
    if (!res.ok) return { data: null, error: data };
    return { data, error: null };
  } catch {
    return { data: null, error: { message: "something went wrong" } };
  }
}

export async function getAllUsers() {
  try {
    const cookieStore = await cookies();
    const res = await fetch("http://localhost:5000/api/user", {
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

export async function updateUserStatus(
  userId: string,
  status: "ACTIVE" | "BANNED",
) {
  try {
    const cookieStore = await cookies();
    const res = await fetch(`http://localhost:5000/api/admin/users/${userId}`, {
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

export async function getAllBookings() {
  try {
    const cookieStore = await cookies();
    const res = await fetch("http://localhost:5000/api/admin/bookings", {
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

export async function updateCategory(id: number, name: string) {
  try {
    const cookieStore = await cookies();
    const res = await fetch(
      `http://localhost:5000/api/admin/categories/${id}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          cookie: cookieStore.toString(),
        },
        body: JSON.stringify({ name }),
        cache: "no-store",
      },
    );
    const data = await res.json();
    if (!res.ok) return { data: null, error: data };
    return { data, error: null };
  } catch {
    return { data: null, error: { message: "something went wrong" } };
  }
}

export async function deleteCategory(id: number) {
  try {
    const cookieStore = await cookies();
    const res = await fetch(
      `http://localhost:5000/api/admin/categories/${id}`,
      {
        method: "DELETE",
        headers: { cookie: cookieStore.toString() },
        cache: "no-store",
      },
    );
    const data = await res.json();
    if (!res.ok) return { data: null, error: data };
    return { data, error: null };
  } catch {
    return { data: null, error: { message: "something went wrong" } };
  }
}
