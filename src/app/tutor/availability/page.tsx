import Link from "next/link";
import { Button } from "@/components/ui/button";
import { getAvailability } from "@/lib/service/tutor.service";
import { AvailabilityForm } from "./availability-form";

function normalizeSlots(data: unknown): { dayOfWeek: number; startTime: string; endTime: string }[] {
  const raw = (data && typeof data === "object" && "slots" in data && (data as { slots: unknown }).slots) ?? data;
  return Array.isArray(raw) ? (raw as { dayOfWeek: number; startTime: string; endTime: string }[]) : [];
}

export default async function TutorAvailabilityPage() {
  const result = await getAvailability();
  const initialSlots = normalizeSlots(result.data ?? null);

  return (
    <div className="py-8">
      <h1 className="text-3xl font-bold text-foreground">Availability</h1>
      <p className="mt-2 text-muted-foreground">
        Set your available time slots for tutoring.
      </p>
      <AvailabilityForm initialSlots={initialSlots} />
      <Button asChild variant="outline" className="mt-6">
        <Link href="/tutor">Back to dashboard</Link>
      </Button>
    </div>
  );
}
