/**
 * Backend API base URL for client-side fetch (credentials: "include").
 * Use so Vercel deployment sends session cookie to backend.
 */
export const API_URL =
  process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:5000";
