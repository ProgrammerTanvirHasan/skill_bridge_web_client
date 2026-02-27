"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Star, ArrowRight } from "lucide-react";
import { ModeToggle } from "@/components/ui/MoodToggle";

interface Category {
  id: number;
  name: string;
}

interface Tutor {
  id: string;
  name: string;
  hourlyRate: number;
  rating: number;
  reviewsCount: number;
  bio: string;
  subjects: string[];
}

function calcAverageRating(reviews: { rating: number }[]) {
  if (!reviews.length) return 0;
  const sum = reviews.reduce((acc, r) => acc + r.rating, 0);
  return +(sum / reviews.length).toFixed(2);
}

export default function BrowseTutorsPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [tutors, setTutors] = useState<Tutor[]>([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  useEffect(() => {
    async function fetchCategories() {
      try {
        const res = await fetch(`${API_URL}/api/admin/categories`);
        if (!res.ok) throw new Error("Failed to fetch categories");
        const data = await res.json();
        setCategories(data.data);
      } catch (err) {
        console.error(err);
        setError("Failed to load categories");
      }
    }
    fetchCategories();
  }, []);

  useEffect(() => {
    async function fetchTutors() {
      setLoading(true);
      setError(null);
      try {
        const params = new URLSearchParams();

        if (category !== "All") {
          const cat = categories.find((c) => c.name === category);
          if (cat) params.append("categoryId", cat.id.toString());
        }

        const url = `${API_URL}/api/tutor?${params.toString()}`;

        const res = await fetch(url, { method: "GET", credentials: "include" });
        if (!res.ok) {
          const data = await res.json();
          throw new Error(data.message || "Failed to fetch tutors");
        }
        const data = await res.json();

        const tutorsMapped: Tutor[] = data.data.map((t: any) => ({
          id: t.id,
          name: t.user?.name || "No Name",
          hourlyRate: t.hourlyRate,
          bio: t.bio || "",

          subjects: t.categories?.map((cat: any) => cat.category.name) || [],

          rating: t.reviews?.length
            ? t.reviews.reduce((acc: number, r: any) => acc + r.rating, 0) /
              t.reviews.length
            : 0,
          reviewsCount: t.reviews?.length || 0,
        }));

        setTutors(tutorsMapped);
      } catch (err: any) {
        console.error(err);
        setError(err.message || "Failed to load tutors");
      } finally {
        setLoading(false);
      }
    }

    fetchTutors();
  }, [category, categories]);

  const filteredTutors = useMemo(() => {
    if (!search) return tutors;
    return tutors.filter((t) => {
      const nameMatch = t.name.toLowerCase().includes(search.toLowerCase());
      const subjectMatch = t.subjects.some((s) =>
        s.toLowerCase().includes(search.toLowerCase()),
      );
      return nameMatch || subjectMatch;
    });
  }, [search, tutors]);

  return (
    <div className="min-h-screen py-8 md:py-12">
      <div className="flex justify-end">
        <ModeToggle />
      </div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight text-foreground md:text-4xl">
          Browse Tutors
        </h1>
        <p className="mt-2 text-muted-foreground">
          Find the perfect tutor by subject, rating, and price.
        </p>
      </div>

      <div className="grid gap-8 lg:grid-cols-[240px_1fr]">
        <aside className="space-y-4 rounded-xl border bg-card p-4">
          <div className="space-y-2">
            <Label htmlFor="search">Search</Label>
            <Input
              id="search"
              placeholder="Name or subject..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="h-10"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="category">Category</Label>
            <select
              id="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
            >
              <option value="All">All</option>
              {categories.map((c) => (
                <option key={c.id} value={c.name}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>
        </aside>

        <main>
          {loading && <p className="text-center py-12">Loading tutors...</p>}
          {error && <p className="text-center py-12 text-red-600">{error}</p>}

          {!loading && !error && (
            <>
              <p className="mb-4 text-sm text-muted-foreground">
                {filteredTutors.length} tutor
                {filteredTutors.length !== 1 ? "s" : ""} found
              </p>
              <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
                {filteredTutors.map((t) => (
                  <Card
                    key={t.id}
                    className="flex flex-col transition-shadow hover:shadow-lg"
                  >
                    <CardHeader className="pb-2">
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="font-semibold text-lg text-foreground">
                            {t.name}
                          </h3>
                          <div className="mt-1 flex flex-wrap gap-1">
                            {t.subjects.map((subj) => (
                              <span
                                key={subj}
                                className="inline-block rounded bg-muted px-2 py-0.5 text-xs font-medium text-muted-foreground"
                              >
                                {subj}
                              </span>
                            ))}
                          </div>
                        </div>
                        <span className="text-sm font-medium text-muted-foreground">
                          ${t.hourlyRate}/hr
                        </span>
                      </div>
                      <div className="flex items-center gap-1 text-sm text-muted-foreground">
                        <Star className="size-4 fill-amber-400 text-amber-400" />
                        <span>{t.rating.toFixed(2)}</span>
                        <span>({t.reviewsCount} reviews)</span>
                      </div>
                    </CardHeader>
                    <CardContent className="flex-1 pb-2">
                      <p className="line-clamp-2 text-sm text-muted-foreground">
                        {t.bio}
                      </p>
                    </CardContent>
                    <CardFooter>
                      <Button
                        asChild
                        variant="outline"
                        size="sm"
                        className="w-full group"
                      >
                        <Link
                          href={`/tutors/${t.id}`}
                          className="flex items-center justify-center gap-2"
                        >
                          View profile & book
                          <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                        </Link>
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
              {filteredTutors.length === 0 && (
                <p className="py-12 text-center text-muted-foreground">
                  No tutors match your filters.
                </p>
              )}
            </>
          )}
        </main>
      </div>

      <div className="flex justify-center mt-12">
        <Button asChild className="lg:w-[50%] w-full  group">
          <Link href={`/`} className="flex items-center justify-center gap-2">
            Go Back To Home
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </Button>
      </div>
    </div>
  );
}
