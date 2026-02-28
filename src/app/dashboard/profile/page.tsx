"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { API_URL } from "@/lib/api-url";
import { getSession } from "@/lib/service/user.service";

function getUser(data: unknown): { name?: string; email?: string } | null {
  if (!data || typeof data !== "object") return null;
  const d = data as Record<string, unknown>;
  if ("data" in d && d.data && typeof d.data === "object") {
    const inner = (d.data as Record<string, unknown>);
    return { name: String(inner.name ?? ""), email: String(inner.email ?? "") };
  }
  return { name: String(d.name ?? ""), email: String(d.email ?? "") };
}

export default function StudentProfilePage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(`${API_URL}/api/user/me`, {
          credentials: "include",
        });
        const json = await res.json().catch(() => null);
        const user = getUser(res.ok ? json : null);
        if (user) {
          setName(user.name ?? "");
          setEmail(user.email ?? "");
        } else {
          const fallback = await getSession();
          const u = getUser(fallback.data);
          if (u) {
            setName(u.name ?? "");
            setEmail(u.email ?? "");
          }
        }
      } catch {
        const fallback = await getSession();
        const u = getUser(fallback.data);
        if (u) {
          setName(u.name ?? "");
          setEmail(u.email ?? "");
        }
      }
    })();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);
    try {
      const res = await fetch(`${API_URL}/api/user/update`, {
        method: "PATCH",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: name.trim(), email: email.trim() }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error((data as { message?: string }).message ?? "Failed to update");
      setSuccess(true);
    } catch {
      setError("Failed to update profile.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="py-8">
      <h1 className="text-3xl font-bold text-foreground">Profile</h1>
      <p className="mt-2 text-muted-foreground">Edit your account information.</p>

      <Card className="mt-6 max-w-md">
        <CardHeader>
          <CardTitle>Personal info</CardTitle>
          <CardDescription>Update your name and email.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-sm font-medium">Name</label>
              <Input
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="mt-1"
              />
            </div>
            <div>
              <label className="text-sm font-medium">Email</label>
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1"
              />
            </div>
            {error && <p className="text-destructive">{error}</p>}
            {success && <p className="text-green-600">Profile updated.</p>}
            <Button type="submit" disabled={loading}>
              {loading ? "Saving..." : "Save"}
            </Button>
          </form>
        </CardContent>
      </Card>

      <Button asChild variant="outline" className="mt-6">
        <Link href="/dashboard">Back to dashboard</Link>
      </Button>
    </div>
  );
}
