"use client";

import { SessionProvider } from "@/lib/session-context";

export function CommonLayoutClient({
  initialUser,
  children,
}: {
  initialUser: { id?: string; name?: string; email?: string; role?: string; [key: string]: unknown } | null;
  children: React.ReactNode;
}) {
  return <SessionProvider initialUser={initialUser}>{children}</SessionProvider>;
}
