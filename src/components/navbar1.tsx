"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Menu } from "lucide-react";

import { authClient } from "@/lib/auth-client";
import { useSession } from "@/lib/session-context";
import { cn } from "@/lib/utils";

import { Accordion } from "@/components/ui/accordion";

import { Button } from "@/components/ui/button";

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { ModeToggle } from "./ui/MoodToggle";
import { toast } from "sonner";

interface MenuItem {
  title: string;
  url: string;
  description?: string;
  icon?: React.ReactNode;
  items?: MenuItem[];
}

export function Navbar1({ className }: { className?: string }) {
  const router = useRouter();
  const pathname = usePathname();
  const { user, setUser } = useSession();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const loginHref =
    pathname === "/"
      ? "/login"
      : `/login?redirect=${encodeURIComponent(pathname)}`;

  const logout = async () => {
    await authClient.signOut();
    setUser(null);
    toast.success("Logged out successfully");
    router.push("/");
  };

  const menu: MenuItem[] = [
    { title: "Home", url: "/" },
    { title: "Tutors", url: "/tutors" },
    { title: "About", url: "/about" },
    { title: "Chart_Bar", url: "/chart" },
  ];

  const dashboardLink =
    user?.role === "ADMIN"
      ? "/admin"
      : user?.role === "TUTOR"
        ? "/tutor"
        : "/dashboard";

  return (
    <section
      className={cn(
        "absolute top-0 left-0 w-full z-50 py-4 bg-transparent ",
        className,
      )}
    >
      <div className=" px-2">
        {/* Desktop */}
        <nav className="hidden items-center justify-between lg:flex">
          <Link
            href="/"
            className="inline-flex items-center gap-2 font-bold text-xl text-primary"
          >
            <span className="text-2xl">🎓</span>
            SkillBridge
          </Link>

          <NavigationMenu>
            <NavigationMenuList>
              {menu.map((item) => (
                <NavigationMenuItem key={item.title}>
                  <NavigationMenuLink asChild>
                    <Link
                      href={item.url}
                      className="group inline-flex h-10 items-center rounded-md px-4 py-2 text-sm font-medium hover:bg-muted"
                    >
                      {item.title}
                    </Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>

          <div className="flex items-center gap-3 ">
            <ModeToggle />

            {user ? (
              <>
                <Link className="text-white" href={dashboardLink}>
                  Dashboard
                </Link>

                <Button size="sm" onClick={logout}>
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Button size="sm">
                  <Link href={loginHref}>Login</Link>
                </Button>

                <Button size="sm">
                  <Link href="/register">Register</Link>
                </Button>
              </>
            )}
          </div>
        </nav>

        <div className="lg:hidden flex justify-between items-center">
          <Link href="/" className="font-bold text-lg">
            SkillBridge
          </Link>

          {!mounted ? (
            <Button size="icon" type="button" aria-label="Open menu">
              <Menu className="size-4" />
            </Button>
          ) : (
            <Sheet>
              <SheetTrigger asChild>
                <Button size="icon">
                  <Menu className="size-4" />
                </Button>
              </SheetTrigger>

              <SheetContent>
                <SheetHeader>
                  <SheetTitle></SheetTitle>
                </SheetHeader>

                <div className="flex flex-col gap-6 px-4">
                  <Accordion type="single" collapsible>
                    {menu.map((item) => (
                      <Link
                        key={item.title}
                        href={item.url}
                        className="block py-2 font-semibold"
                      >
                        {item.title}
                      </Link>
                    ))}
                  </Accordion>

                  <ModeToggle />

                  {user ? (
                    <>
                      <Link href={dashboardLink}>Dashboard</Link>

                      <Button variant="outline" onClick={logout}>
                        Logout
                      </Button>
                    </>
                  ) : (
                    <>
                      <Button asChild variant="outline">
                        <Link href={loginHref}>Login</Link>
                      </Button>

                      <Button asChild>
                        <Link href="/register">Register</Link>
                      </Button>
                    </>
                  )}
                </div>
              </SheetContent>
            </Sheet>
          )}
        </div>
      </div>
    </section>
  );
}
