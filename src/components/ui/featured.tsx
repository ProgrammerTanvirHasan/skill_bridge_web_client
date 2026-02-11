import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, ArrowRight } from "lucide-react";

const FEATURED = [
  {
    id: "01",
    name: "Dr. Sarah Chen",
    subject: "Mathematics",
    rate: 45,
    rating: 4.9,
    reviews: 124,
  },
  {
    id: "02",
    name: "James Wilson",
    subject: "Programming",
    rate: 55,
    rating: 4.8,
    reviews: 89,
  },
  {
    id: "03",
    name: "Emily Rodriguez",
    subject: "Physics",
    rate: 50,
    rating: 5,
    reviews: 56,
  },
];

export default function HomePage() {
  return (
    <div className="space-y-20 pb-16 ">
      <section className="py-12">
        <div className="flex flex-col items-center gap-4 text-center">
          <h2 className="text-3xl font-bold tracking-tight text-foreground md:text-4xl">
            Featured Tutors
          </h2>
          <p className="max-w-2xl text-muted-foreground">
            Discover top tutors and book your first session. Learn from experts
            in math, programming, physics, and more.
          </p>
        </div>
        <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURED.map((t) => (
            <Card
              key={t.id}
              className="border shadow-md hover:shadow-xl transition-all duration-300 rounded-2xl"
            >
              <CardHeader className="space-y-3">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-xl font-semibold">{t.name}</h3>

                    {/* <Badge variant="secondary" className="mt-2">
                      {t.subject}
                    </Badge> */}
                  </div>

                  <span className="font-semibold text-primary">
                    ${t.rate}/hr
                  </span>
                </div>

                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Star className="size-4 fill-amber-400 text-amber-400" />
                  {t.rating}
                  <span>• {t.reviews} reviews</span>
                </div>
              </CardHeader>

              <CardContent className="pt-0">
                <p className="text-muted-foreground">
                  Personalized 1-on-1 sessions to help you master {t.subject}.
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-10 flex justify-center">
          <Button asChild size="lg">
            <Link href="/tutors">Browse all tutors</Link>
          </Button>
        </div>
      </section>

      <section className="rounded-2xl bg-muted/50 p-8 text-center md:p-12">
        <h2 className="text-2xl font-bold text-foreground md:text-3xl">
          Ready to start learning?
        </h2>
        <p className="mx-auto mt-3 max-w-xl text-muted-foreground">
          Join thousands of students who are already growing their skills with
          SkillBridge.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-4">
          <Button asChild size="lg">
            <Link href="/register">Create free account</Link>
          </Button>
          <Button asChild size="lg" variant="outline">
            <Link href="/tutors">Explore tutors</Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
