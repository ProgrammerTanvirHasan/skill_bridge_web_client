import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/service/user.service";
import { Roles } from "./types/roles";

export async function proxy(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  const session = await getSession();
  const role =
    session?.data?.data?.role ??
    session?.data?.role ??
    (session?.data as { role?: string })?.role;

  if (!role) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("redirect", pathname);
    return NextResponse.redirect(loginUrl);
  }

  const isAdmin = role === Roles.ADMIN;
  const isTutor = role === Roles.TUTOR;

  if (isAdmin && pathname.startsWith("/tutor")) {
    return NextResponse.redirect(new URL("/admin", request.url));
  }

  if (isTutor && pathname.startsWith("/admin")) {
    return NextResponse.redirect(new URL("/tutor", request.url));
  }

  if (
    !isAdmin &&
    !isTutor &&
    (pathname.startsWith("/admin") || pathname.startsWith("/tutor"))
  ) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/admin/:path*", "/tutor/:path*"],
};
