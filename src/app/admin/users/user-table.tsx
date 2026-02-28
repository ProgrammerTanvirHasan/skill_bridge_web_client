"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import type { User } from "@/types";
import { API_URL } from "@/lib/api-url";

type UserRow = User & { banned?: boolean };

function isBanned(u: UserRow): boolean {
  return u.banned === true || (u as { status?: string }).status === "BANNED";
}

export function AdminUserTable({ initialUsers }: { initialUsers: UserRow[] }) {
  const router = useRouter();
  const [users, setUsers] = useState(initialUsers);
  const [loadingIds, setLoadingIds] = useState<Set<string>>(new Set());

  async function handleToggleStatus(userId: string, currentlyBanned: boolean) {
    const newStatus = currentlyBanned ? "ACTIVE" : "BANNED";
    setLoadingIds((prev) => new Set(prev).add(userId));
    try {
      const res = await fetch(`${API_URL}/api/admin/users/${userId}`, {
        method: "PATCH",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error((data as { message?: string }).message ?? "Failed to update status");
      setUsers((prev) =>
        prev.map((u) => (u.id === userId ? { ...u, banned: newStatus === "BANNED" } : u)),
      );
      router.refresh();
    } catch {
      alert("Failed to update user status.");
    } finally {
      setLoadingIds((prev) => {
        const next = new Set(prev);
        next.delete(userId);
        return next;
      });
    }
  }

  if (users.length === 0) {
    return <p className="mt-6 text-muted-foreground">No users found.</p>;
  }

  return (
    <div className="mt-6 overflow-hidden rounded-lg border">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b bg-muted/50">
              <th className="p-3 text-left font-medium">Name</th>
              <th className="p-3 text-left font-medium">Email</th>
              <th className="p-3 text-left font-medium">Role</th>
              <th className="p-3 text-left font-medium">Status</th>
              <th className="p-3 text-right font-medium">Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => {
              const banned = isBanned(user);
              const loading = loadingIds.has(user.id);
              return (
                <tr key={user.id} className="border-b hover:bg-muted/30">
                  <td className="p-3 font-medium">{user.name ?? "—"}</td>
                  <td className="p-3 text-muted-foreground">{user.email ?? "—"}</td>
                  <td className="p-3">{user.role ?? "—"}</td>
                  <td className="p-3">
                    <span className={banned ? "text-destructive font-medium" : "text-green-600"}>
                      {banned ? "Banned" : "Active"}
                    </span>
                  </td>
                  <td className="p-3 text-right">
                    <button
                      type="button"
                      disabled={loading}
                      onClick={() => handleToggleStatus(user.id, banned)}
                      className="rounded-md border border-input bg-background px-3 py-1.5 text-sm font-medium hover:bg-muted disabled:opacity-50"
                    >
                      {loading ? "Updating..." : banned ? "Unban" : "Ban"}
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
