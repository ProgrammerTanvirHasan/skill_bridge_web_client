import { SignupForm } from "@/components/signup-form";
import Link from "next/link";

export default function RegisterPage() {
  return (
    <div className="flex min-h-[calc(100vh-8rem)] w-full items-center justify-center bg-muted/30 px-4 py-12">
      <div className="w-full max-w-md space-y-6">
        <div className="text-center">
          <Link href="/" className="inline-flex items-center gap-2 font-bold text-xl text-primary">
            <span className="text-2xl">🎓</span>
            SkillBridge
          </Link>
          <h1 className="mt-4 text-2xl font-bold tracking-tight text-foreground">Create an account</h1>
          <p className="mt-2 text-sm text-muted-foreground">Join as a student or tutor to get started</p>
        </div>
        <SignupForm className="shadow-lg" />
        <p className="text-center text-sm text-muted-foreground">
          Already have an account?{" "}
          <Link href="/login" className="font-medium text-primary underline-offset-4 hover:underline">Login</Link>
        </p>
      </div>
    </div>
  );
}
