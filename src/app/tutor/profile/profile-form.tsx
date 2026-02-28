"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
// import { useSession } from "next-auth/react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { API_URL } from "@/lib/api-url";
import { useSession } from "@/lib/session-context";

type ProfileData = {
  id?: string;
  bio?: string | null;
  hourlyRate?: number | null;
  status?: "AVAILABLE" | "BUSY" | "OFFLINE";
  categoryIds?: number[];
  user?: {
    email?: string | null;
  };
};

type Category = {
  id: number;
  name: string;
};

export function TutorProfileForm({
  initialProfile,
  initialCategories,
}: {
  initialProfile: ProfileData | null;
  initialCategories: Category[];
}) {
  const router = useRouter();
  const { user } = useSession();

  const loggedInUserEmail = user?.email ?? null;

  const [hasProfile, setHasProfile] = useState(false);

  const [bio, setBio] = useState("");
  const [hourlyRate, setHourlyRate] = useState("");
  const [status, setStatus] = useState<"AVAILABLE" | "BUSY" | "OFFLINE" | "">(
    "",
  );
  const [categoryIds, setCategoryIds] = useState<number[]>([]);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (!initialProfile) {
      setHasProfile(false);
      return;
    }
    const profileEmail =
      initialProfile?.user?.email?.trim().toLowerCase() ?? "";
    const loggedEmail = loggedInUserEmail?.trim().toLowerCase() ?? "";

    console.log("Profile email:", JSON.stringify(profileEmail));
    console.log("Logged user email:", JSON.stringify(loggedEmail));
    console.log("Emails equal?", profileEmail === loggedEmail);

    if (
      initialProfile.id &&
      initialProfile.user?.email &&
      initialProfile?.user?.email === loggedInUserEmail
    ) {
      setHasProfile(true);
      setBio(initialProfile.bio ?? "");
      setHourlyRate(
        initialProfile.hourlyRate !== undefined &&
          initialProfile.hourlyRate !== null
          ? String(initialProfile.hourlyRate)
          : "",
      );
      setStatus(initialProfile.status ?? "");
      setCategoryIds(initialProfile.categoryIds ?? []);
    } else {
      setHasProfile(false);
      setBio("");
      setHourlyRate("");
      setStatus("");
      setCategoryIds([]);
    }
  }, [initialProfile, loggedInUserEmail]);

  const toggleCategory = (id: number) => {
    setCategoryIds((prev) =>
      prev.includes(id) ? prev.filter((c) => c !== id) : [...prev, id],
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const payload = {
        bio,
        hourlyRate: Number(hourlyRate),
        status: status as "AVAILABLE" | "BUSY" | "OFFLINE",
        categoryIds,
      };

      if (hasProfile) {
        const res = await fetch(`${API_URL}/api/tutor/profile`, {
          method: "PUT",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        const data = await res.json().catch(() => ({}));
        if (!res.ok) throw new Error((data as { message?: string }).message ?? "Failed to update profile");
      } else {
        const res = await fetch(`${API_URL}/api/tutor`, {
          method: "POST",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        const data = await res.json().catch(() => ({}));
        if (!res.ok) throw new Error((data as { message?: string }).message ?? "Failed to create profile");
        setHasProfile(true);
      }

      setSuccess(true);
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="max-w-md mx-auto mt-6">
      <CardHeader>
        <CardTitle>
          {hasProfile ? "Update Tutor Profile" : "Create Tutor Profile"}
        </CardTitle>
      </CardHeader>

      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <textarea
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            placeholder="Write your bio"
            className="w-full border p-2 rounded"
            rows={4}
            required
          />

          <input
            type="number"
            value={hourlyRate}
            onChange={(e) => setHourlyRate(e.target.value)}
            placeholder="Hourly Rate"
            className="w-full border p-2 rounded"
            min={0}
            step={0.01}
            required
          />

          <select
            value={status}
            onChange={(e) =>
              setStatus(e.target.value as "AVAILABLE" | "BUSY" | "OFFLINE")
            }
            className="w-full border p-2 rounded"
            required
          >
            <option value="">Select Status</option>
            <option value="AVAILABLE">Available</option>
            <option value="BUSY">Busy</option>
            <option value="OFFLINE">Offline</option>
          </select>

          <div>
            <p className="font-medium mb-2">Categories</p>
            <div className="flex flex-wrap gap-4">
              {initialCategories.map((cat) => (
                <label key={cat.id} className="inline-flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={categoryIds.includes(cat.id)}
                    onChange={() => toggleCategory(cat.id)}
                  />
                  {cat.name}
                </label>
              ))}
            </div>
          </div>

          {error && <p className="text-red-600">{error}</p>}
          {success && <p className="text-green-600">Profile saved!</p>}

          <Button type="submit" disabled={loading} className="w-full">
            {loading
              ? "Saving..."
              : hasProfile
                ? "Update Profile"
                : "Create Profile"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
