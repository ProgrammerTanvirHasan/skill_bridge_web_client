"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { setAvailability } from "@/lib/service/tutor.service";

const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

type Slot = { dayOfWeek: number; startTime: string; endTime: string };

export function AvailabilityForm({ initialSlots }: { initialSlots: Slot[] }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [slots, setSlots] = useState<Slot[]>(
    initialSlots.length > 0 ? initialSlots : [{ dayOfWeek: 1, startTime: "09:00", endTime: "17:00" }],
  );

  const addSlot = () => {
    setSlots((prev) => [...prev, { dayOfWeek: 0, startTime: "09:00", endTime: "17:00" }]);
  };
  const removeSlot = (i: number) => {
    setSlots((prev) => prev.filter((_, idx) => idx !== i));
  };
  const updateSlot = (i: number, field: keyof Slot, value: number | string) => {
    setSlots((prev) => {
      const next = [...prev];
      next[i] = { ...next[i], [field]: value };
      return next;
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);
    try {
      const result = await setAvailability(slots);
      if (result.error) throw new Error("Failed to save");
      setSuccess(true);
      router.refresh();
    } catch {
      setError("Failed to save availability.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="mt-6 max-w-2xl">
      <CardHeader>
        <CardTitle>Time slots</CardTitle>
        <CardDescription>Add weekly slots. Use 24h format (e.g. 09:00, 17:00).</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          {slots.map((slot, i) => (
            <div key={i} className="flex flex-wrap items-center gap-3 rounded border p-3">
              <select
                value={slot.dayOfWeek}
                onChange={(e) => updateSlot(i, "dayOfWeek", Number(e.target.value))}
                className="rounded border px-2 py-1"
              >
                {DAYS.map((d, dIdx) => (
                  <option key={d} value={dIdx}>{d}</option>
                ))}
              </select>
              <input
                type="time"
                value={slot.startTime}
                onChange={(e) => updateSlot(i, "startTime", e.target.value)}
                className="rounded border px-2 py-1"
              />
              <span className="text-muted-foreground">to</span>
              <input
                type="time"
                value={slot.endTime}
                onChange={(e) => updateSlot(i, "endTime", e.target.value)}
                className="rounded border px-2 py-1"
              />
              <Button type="button" variant="ghost" size="sm" onClick={() => removeSlot(i)}>Remove</Button>
            </div>
          ))}
          <Button type="button" variant="outline" onClick={addSlot}>Add slot</Button>
          {error && <p className="text-destructive">{error}</p>}
          {success && <p className="text-green-600">Availability saved.</p>}
          <Button type="submit" disabled={loading}>{loading ? "Saving..." : "Save availability"}</Button>
        </form>
      </CardContent>
    </Card>
  );
}
