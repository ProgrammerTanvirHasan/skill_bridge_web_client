"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { getAllCategories } from "@/lib/service/admin.service";
import { API_URL } from "@/lib/api-url";

type CategoryRow = { id: number | string; name: string };

export default function AdminCategoriesPage() {
  const [categoryName, setCategoryName] = useState("");
  const [categories, setCategories] = useState<CategoryRow[]>([]);
  const [loading, setLoading] = useState(false);
  const [loadCategories, setLoadCategories] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [editingId, setEditingId] = useState<number | string | null>(null);
  const [editName, setEditName] = useState("");

  useEffect(() => {
    if (!loadCategories) return;
    (async () => {
      const result = await getAllCategories();
      if (result.data) setCategories(result.data as CategoryRow[]);
      setLoadCategories(false);
    })();
  }, [loadCategories]);

  const handleCreateCategory = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!categoryName.trim()) return;
    setLoading(true);
    setError(null);
    setSuccess(false);
    try {
      const res = await fetch(`${API_URL}/api/admin/categories`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: categoryName.trim() }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok)
        throw new Error(
          (data as { message?: string }).message ?? "Failed to create category",
        );
      setSuccess(true);
      setCategoryName("");
      setLoadCategories(true);
    } catch {
      setError("Failed to create category");
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = async (id: number | string) => {
    if (!editName.trim()) return;
    try {
      const res = await fetch(`${API_URL}/api/admin/categories/${Number(id)}`, {
        method: "PATCH",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: editName.trim() }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok)
        throw new Error(
          (data as { message?: string }).message ?? "Failed to update category",
        );
      setCategories((prev) =>
        prev.map((c) => (c.id === id ? { ...c, name: editName.trim() } : c)),
      );
      setEditingId(null);
      setEditName("");
    } catch {
      alert("Failed to update category");
    }
  };

  const handleDelete = async (id: number | string) => {
    if (!confirm("Delete this category?")) return;
    try {
      const res = await fetch(`${API_URL}/api/admin/categories/${Number(id)}`, {
        method: "DELETE",
        credentials: "include",
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok)
        throw new Error(
          (data as { message?: string }).message ?? "Failed to delete category",
        );
      setCategories((prev) => prev.filter((c) => c.id !== id));
    } catch {
      alert("Failed to delete category");
    }
  };

  return (
    <div className="py-8 max-w-2xl">
      <h1 className="text-3xl font-bold text-foreground mb-4">Categories</h1>
      <p className="text-muted-foreground mb-6">
        Create and manage categories.
      </p>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Add Category</CardTitle>
          <CardDescription>Enter the name and click Add.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleCreateCategory} className="flex gap-2">
            <Input
              placeholder="Category name"
              value={categoryName}
              onChange={(e) => setCategoryName(e.target.value)}
              disabled={loading}
              className="flex-grow"
            />
            <Button type="submit" disabled={loading}>
              {loading ? "Adding..." : "Add"}
            </Button>
          </form>
          {error && <p className="text-destructive mt-2">{error}</p>}
          {success && (
            <p className="text-green-600 mt-2">Category added successfully!</p>
          )}
        </CardContent>
      </Card>

      <Card className="overflow-hidden">
        <CardHeader>
          <CardTitle>All categories</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          {categories.length === 0 && !loadCategories && (
            <p className="p-6 text-muted-foreground">No categories yet.</p>
          )}
          {categories.length > 0 && (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b bg-muted/50">
                    <th className="p-3 text-left font-medium">Name</th>
                    <th className="p-3 text-right font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {categories.map((c) => (
                    <tr key={c.id} className="border-b hover:bg-muted/30">
                      <td className="p-3">
                        {editingId === c.id ? (
                          <Input
                            value={editName}
                            onChange={(e) => setEditName(e.target.value)}
                            className="max-w-xs"
                            autoFocus
                          />
                        ) : (
                          <span className="font-medium">{c.name}</span>
                        )}
                      </td>
                      <td className="p-3 text-right">
                        {editingId === c.id ? (
                          <>
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => handleUpdate(c.id)}
                            >
                              Save
                            </Button>
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => {
                                setEditingId(null);
                                setEditName("");
                              }}
                            >
                              Cancel
                            </Button>
                          </>
                        ) : (
                          <>
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => {
                                setEditingId(c.id);
                                setEditName(c.name);
                              }}
                            >
                              Edit
                            </Button>
                            <Button
                              size="sm"
                              variant="ghost"
                              className="text-destructive"
                              onClick={() => handleDelete(c.id)}
                            >
                              Delete
                            </Button>
                          </>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>

      <Button asChild variant="outline" className="mt-6">
        <Link href="/admin">Back to dashboard</Link>
      </Button>
    </div>
  );
}
