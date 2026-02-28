"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { API_URL } from "@/lib/api-url";
import { AvailabilityForm } from "./availability-form";

type Slot = { dayOfWeek: number; startTime: string; endTime: string };

function normalizeSlots(data: unknown): Slot[] {
  const raw =
    (data &&
      typeof data === "object" &&
      "slots" in data &&
      (data as { slots: unknown }).slots) ??
    data;
  return Array.isArray(raw) ? (raw as Slot[]) : [];
}

export default function TutorAvailabilityPage() {
  const [initialSlots, setInitialSlots] = useState<Slot[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(`${API_URL}/api/tutor/availability`, {
          credentials: "include",
        });
        const data = await res.json().catch(() => null);
        setInitialSlots(res.ok ? normalizeSlots(data?.data ?? data) : []);
      } catch {
        setInitialSlots([]);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return (
    <div className="py-8">
      <h1 className="text-3xl font-bold text-foreground">Availability</h1>
      <p className="mt-2 text-muted-foreground">
        Set your available time slots for tutoring.
      </p>
      {loading ? (
        <p className="mt-6 text-muted-foreground">Loading availability…</p>
      ) : (
        <AvailabilityForm initialSlots={initialSlots} />
      )}
      <Button asChild variant="outline" className="mt-6">
        <Link href="/tutor">Back to dashboard</Link>
      </Button>
    </div>
  );
}
