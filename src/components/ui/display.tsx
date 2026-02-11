import Link from "next/link";
import { Button } from "./button";
import { ArrowRight } from "lucide-react";

export default function Display() {
  return (
    <div className="min-h-[800px] flex flex-col lg:flex-row ">
      <div className="flex-1 flex flex-col justify-center p-8 ">
        <div className="max-w-xl space-y-6">
          <h2 className="text-xl tracking-widest">S K I L L B R I D G E</h2>

          <h1 className="text-6xl font-extrabold leading-tight">
            Connect with Expert Tutors, <br /> Learn Anything
          </h1>

          <p className="text-lg leading-relaxed">
            Browse tutors by subject, book sessions instantly, and grow your
            skills with personalized one-on-one learning.
          </p>

          <Button asChild className="w-full group">
            <Link
              href={`/tutors/`}
              className="flex items-center justify-center gap-2"
            >
              Get a Free Session
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
        </div>
      </div>

      <div className="flex-1  flex items-center justify-center bg-[#093B3B]">
        <img
          src="/teach.png"
          alt="Education illustration"
          className="w-full h-full "
        />
      </div>
    </div>
  );
}
