import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getMyReviews } from "@/lib/service/review.service";

function normalizeReviews(data: unknown): {
  id: string;
  rating: number;
  comment?: string;
  student?: { name?: string };
}[] {
  if (Array.isArray(data))
    return data as {
      id: string;
      rating: number;
      comment?: string;
      student?: { name?: string };
    }[];
  if (
    data &&
    typeof data === "object" &&
    "data" in data &&
    Array.isArray((data as { data: unknown }).data)
  )
    return (
      data as {
        data: {
          id: string;
          rating: number;
          comment?: string;
          student?: { name?: string };
        }[];
      }
    ).data;
  return [];
}

export default async function TutorRatingReviewsPage() {
  const result = await getMyReviews();
  const reviews = result.error ? [] : normalizeReviews(result.data ?? null);
  const totalReviews = reviews.length;
  const averageRating =
    totalReviews > 0
      ? reviews.reduce((s, r) => s + r.rating, 0) / totalReviews
      : 0;

  return (
    <div className="py-8">
      <h1 className="text-3xl font-bold text-foreground">Ratings & reviews</h1>
      <p className="mt-2 text-muted-foreground">
        Reviews from students after sessions.
      </p>
      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-2xl font-bold">
            {totalReviews > 0 ? `${averageRating.toFixed(1)} / 5` : "—"} (
            {totalReviews} reviews)
          </p>
        </CardContent>
      </Card>
      <Card className="mt-6 overflow-hidden">
        <CardHeader>
          <CardTitle>All reviews</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          {reviews.length === 0 ? (
            <p className="p-6 text-muted-foreground">No reviews yet.</p>
          ) : (
            <ul className="divide-y">
              {reviews.map((r) => (
                <li key={r.id} className="p-4">
                  <div className="flex items-center gap-2">
                    <span className="font-medium">★ {r.rating}</span>
                    {r.student?.name && (
                      <span className="text-muted-foreground">
                        — {r.student.name}
                      </span>
                    )}
                  </div>
                  {r.comment && (
                    <p className="mt-2 text-sm text-muted-foreground">
                      {r.comment}
                    </p>
                  )}
                </li>
              ))}
            </ul>
          )}
        </CardContent>
      </Card>
      <Button asChild variant="outline" className="mt-6">
        <Link href="/tutor">Back to dashboard</Link>
      </Button>
    </div>
  );
}
