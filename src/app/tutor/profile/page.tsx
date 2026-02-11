import { getAllCategories } from "@/lib/service/admin.service";
import { getMyTutorProfile } from "@/lib/service/tutor.service";
import { getSession } from "@/lib/service/user.service";
import { TutorProfileForm } from "./profile-form";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default async function TutorProfilePage() {
  const session = await getSession();

  const loggedInUserEmail = session?.data?.data?.email ?? null;

  const [profileRes, categoriesRes] = await Promise.all([
    getMyTutorProfile(),
    getAllCategories(),
  ]);

  const profiles = Array.isArray(profileRes.data) ? profileRes.data : [];

  const profile =
    loggedInUserEmail != null
      ? (profiles.find((p) => p.user?.email === loggedInUserEmail) ?? null)
      : null;

  const categories =
    categoriesRes.data && Array.isArray(categoriesRes.data)
      ? (categoriesRes.data as { id: number; name: string }[])
      : [];

  return (
    <div className="py-8">
      <h1 className="text-2xl font-bold text-foreground">Tutor Profile</h1>
      <p className="mt-1 text-muted-foreground">
        Edit your tutor profile and subjects.
      </p>
      <TutorProfileForm
        initialProfile={profile}
        initialCategories={categories}
      />

      <Button asChild variant="outline" className="mt-6">
        <Link href="/tutor">Back to dashboard</Link>
      </Button>
    </div>
  );
}
