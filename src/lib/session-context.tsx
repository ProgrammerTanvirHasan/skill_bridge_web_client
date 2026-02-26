"use client";

import React, {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";
import { authClient } from "./auth-client";

type User = {
  id?: string;
  name?: string;
  email?: string;
  role?: string;
  [key: string]: unknown;
} | null;

type SessionContextValue = {
  user: User;
  setUser: (user: User) => void;
  refreshSession: () => Promise<void>;
};

const SessionContext = createContext<SessionContextValue | null>(null);

export function SessionProvider({
  initialUser,
  children,
}: {
  initialUser: User;
  children: React.ReactNode;
}) {
  const [user, setUserState] = useState<User>(initialUser);

  const refreshSession = useCallback(async () => {
    try {
      const session = await authClient.getSession();
      const nextUser = session?.data?.user ?? session?.data ?? null;
      setUserState(nextUser);
    } catch {
      setUserState(null);
    }
  }, []);

  const setUser = useCallback((value: User) => {
    setUserState(value);
  }, []);

  const value = useMemo(
    () => ({ user, setUser, refreshSession }),
    [user, setUser, refreshSession],
  );

  return (
    <SessionContext.Provider value={value}>{children}</SessionContext.Provider>
  );
}

export function useSession() {
  const ctx = useContext(SessionContext);
  if (!ctx) {
    throw new Error("useSession must be used within SessionProvider");
  }
  return ctx;
}
