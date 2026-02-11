import Link from "next/link";
import { Button } from "@/components/ui/button";
import { getAllUsers } from "@/lib/service/user.service";
import type { User } from "@/types";
import { AdminUserTable } from "./user-table";

function normalizeUsers(data: unknown): User[] {
  if (Array.isArray(data)) return data as User[];
  if (data && typeof data === "object" && "data" in data && Array.isArray((data as { data: unknown }).data))
    return (data as { data: User[] }).data;
  if (data && typeof data === "object" && "users" in data && Array.isArray((data as { users: unknown }).users))
    return (data as { users: User[] }).users;
  return [];
}

export default async function AdminUsersPage() {
  const result = await getAllUsers();
  const users = normalizeUsers(result.data ?? null);

  return (
    <div className="py-8">
      <h1 className="text-3xl font-bold text-foreground">Users</h1>
      <p className="mt-2 text-muted-foreground">
        Manage students and tutors (ban/unban).
      </p>
      <AdminUserTable initialUsers={users} />
      <Button asChild variant="outline" className="mt-6">
        <Link href="/admin">Back to dashboard</Link>
      </Button>
    </div>
  );
}
