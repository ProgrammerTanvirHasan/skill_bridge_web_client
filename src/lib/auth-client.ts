import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient({
  // ✅ Login must hit SAME backend
  baseURL: process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:5000",
});
