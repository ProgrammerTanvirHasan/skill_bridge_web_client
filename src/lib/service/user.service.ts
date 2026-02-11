"use server";

import { cookies } from "next/headers";

export async function getSession() {
  try {
    const cookieStore = await cookies();
    const res = await fetch(`http://localhost:5000/api/user/me`, {
      headers: { cookie: cookieStore.toString() },
      cache: "no-store",
    });
    const session = await res.json();
    if (!session) return { data: null, error: { message: "data missing" } };
    return { data: session, error: null };
  } catch {
    return { data: null, error: { message: "something went wrong" } };
  }
}

export async function getAllUsers() {
  try {
    const cookieStore = await cookies();
    const res = await fetch(`http://localhost:5000/api/user`, {
      headers: { cookie: cookieStore.toString() },
      cache: "no-store",
    });
    const users = await res.json();
    if (!users) return { data: null, error: { message: "data missing" } };
    return { data: users, error: null };
  } catch {
    return { data: null, error: { message: "something went wrong" } };
  }
}

export async function getUserById(id: string) {
  try {
    const cookieStore = await cookies();
    const res = await fetch(`http://localhost:5000/api/user/${id}`, {
      headers: { cookie: cookieStore.toString() },
      cache: "no-store",
    });
    const user = await res.json();
    if (!user) return { data: null, error: { message: "data missing" } };
    return { data: user, error: null };
  } catch {
    return { data: null, error: { message: "something went wrong" } };
  }
}

export async function updateProfile(payload: {
  name?: string;
  email?: string;
}) {
  try {
    const cookieStore = await cookies();
    const res = await fetch("http://localhost:5000/api/user/update", {
      method: "PATCH",
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
    return { data: null, error: { message: "something went wrong" } };
  }
}
