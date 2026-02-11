"use client";

import * as React from "react";
import Link from "next/link";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";
import {
  LayoutDashboard,
  Users,
  BookOpen,
  FolderOpen,
  Calendar,
  User,
  ShoppingBasket,
} from "lucide-react";

export type AppSidebarVariant = "admin" | "tutor" | "student";

const navConfig: Record<
  AppSidebarVariant,
  {
    title: string;
    items: {
      title: string;
      url: string;
      icon: React.ComponentType<{ className?: string }>;
    }[];
  }
> = {
  admin: {
    title: "Admin",
    items: [
      { title: "Users", url: "/admin/users", icon: Users },
      { title: "Bookings", url: "/admin/bookings", icon: BookOpen },
      { title: "Categories", url: "/admin/categories", icon: FolderOpen },
    ],
  },
  tutor: {
    title: "Tutor",
    items: [
      { title: "Availability", url: "/tutor/availability", icon: Calendar },
      { title: "Booking", url: "/tutor/bookingSession", icon: ShoppingBasket },
      { title: "Profile", url: "/tutor/profile", icon: User },
      {
        title: "Teaching sessions",
        url: "/tutor/teachingSession",
        icon: BookOpen,
      },
      { title: "Ratings & reviews", url: "/tutor/rating&reviews", icon: User },
    ],
  },
  student: {
    title: "Student",
    items: [
      { title: "My Bookings", url: "/dashboard/bookings", icon: BookOpen },
      { title: "Profile", url: "/dashboard/profile", icon: User },
    ],
  },
};

type AppSidebarProps = Omit<React.ComponentProps<typeof Sidebar>, "variant"> & {
  variant?: AppSidebarVariant;
};

export function AppSidebar({ variant = "admin", ...props }: AppSidebarProps) {
  const config = navConfig[variant];

  return (
    <Sidebar {...props} collapsible="icon">
      <SidebarHeader className="border-b border-sidebar-border">
        <div className="flex h-14 items-center px-2">
          <Link href={"/"} className="flex items-center gap-2 font-semibold">
            <span className="text-lg">🎓 SkillBridge</span>
          </Link>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="text-xl">
            {config.title}
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {config.items.map((item) => {
                const Icon = item.icon;
                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild tooltip={item.title}>
                      <Link href={item.url}>
                        <Icon className="size-4" />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}
