"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { API_URL } from "@/lib/api-url";
import { useSession } from "@/lib/session-context";
import { TutorProfileForm } from "./profile-form";

type ProfileData = {
  id?: string;
  bio?: string | null;
  hourlyRate?: number | null;
  status?: "AVAILABLE" | "BUSY" | "OFFLINE";
  categoryIds?: number[];
  user?: { email?: string | null };
};

type Category = { id: number; name: string };

export default function TutorProfilePage() {
  const { user } = useSession();
  const loggedInUserEmail = user?.email ?? null;

  const [profile, setProfile] = useState<ProfileData | null>(null);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const [profileRes, categoriesRes] = await Promise.all([
          fetch(`${API_URL}/api/tutor/me`, { credentials: "include" }),
          fetch(`${API_URL}/api/admin/categories`, { credentials: "include" }),
        ]);

        const profileJson = await profileRes.json().catch(() => null);
        const categoriesJson = await categoriesRes.json().catch(() => null);

        const profiles: ProfileData[] = profileRes.ok && profileJson?.data
          ? (Array.isArray(profileJson.data) ? profileJson.data : [profileJson.data])
          : [];
        const profileMatch =
          loggedInUserEmail != null
            ? profiles.find((p) => p.user?.email === loggedInUserEmail) ?? null
            : null;
        setProfile(profileMatch ?? null);

        const catList =
          categoriesRes.ok && categoriesJson
            ? (Array.isArray(categoriesJson.data) ? categoriesJson.data : categoriesJson.data ?? [])
            : [];
        setCategories(Array.isArray(catList) ? catList : []);
      } catch {
        setProfile(null);
        setCategories([]);
      } finally {
        setLoading(false);
      }
    })();
  }, [loggedInUserEmail]);

  return (
    <div className="py-8">
      <h1 className="text-2xl font-bold text-foreground">Tutor Profile</h1>
      <p className="mt-1 text-muted-foreground">
        Edit your tutor profile and subjects.
      </p>
      {loading ? (
        <p className="mt-6 text-muted-foreground">Loading profile...</p>
      ) : (
        <TutorProfileForm
          initialProfile={profile}
          initialCategories={categories}
        />
      )}

      <Button asChild variant="outline" className="mt-6">
        <Link href="/tutor">Back to dashboard</Link>
      </Button>
    </div>
  );
}
