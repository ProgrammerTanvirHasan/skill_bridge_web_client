"use client";

import { LoginForm } from "@/components/login-form";
import Link from "next/link";
import { Suspense } from "react";

export default function LoginPage() {
  return (
    <div className="flex min-h-[calc(100vh-8rem)] w-full items-center justify-center bg-muted/30 px-4 py-12">
      <div className="w-full max-w-md space-y-6">
        <div className="text-center">
          <Link
            href="/"
            className="inline-flex items-center gap-2 font-bold text-xl text-primary"
          >
            <span className="text-2xl">🎓</span>
            SkillBridge
          </Link>
          <h1 className="mt-4 text-2xl font-bold tracking-tight text-foreground">
            Welcome back
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Sign in to your account to continue
          </p>
        </div>
        <Suspense fallback={<div>Loading...</div>}>
          <LoginForm />
        </Suspense>
        <p className="text-center text-sm text-muted-foreground">
          Don&apos;t have an account?{" "}
          <Link
            href="/register"
            className="font-medium text-primary underline-offset-4 hover:underline"
          >
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}
