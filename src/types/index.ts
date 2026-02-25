export type UserRole = "STUDENT" | "TUTOR" | "ADMIN";

export interface User {
  id: string;
  name: string;
  email: string;
  image?: string | null;
  role: UserRole;
  emailVerified?: boolean;
  createdAt?: string;
  updatedAt?: string;
  banned?: boolean;
}

export type SessionUser = {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  status: string;
} | null;

export const Roles = {
  ADMIN: "ADMIN",
  TUTOR: "TUTOR",
  STUDENT: "STUDENT",
} as const;

export interface ApiResponse {
  success: boolean;
  data: {
    id: string;
    name: string;
    email: string;
    role: UserRole;
    status: string;
  };
}
export interface SessionResponse {
  data: ApiResponse | null;
  error: unknown;
}
export interface TutorProfile {
  id: string;
  userId: string;
  headline?: string | null;
  bio?: string | null;
  hourlyRateCents?: number | null;
  categoryIds?: string[];
  averageRating?: number | null;
  totalReviews?: number;
  createdAt?: string;
  updatedAt?: string;
  user?: Pick<User, "id" | "name" | "image">;
}

export interface Category {
  id: string;
  name: string;
  slug?: string;
  description?: string | null;
}

export type BookingStatus = "CONFIRMED" | "COMPLETED" | "CANCELLED";

export interface Booking {
  id: number;
  studentId: string;
  tutorId: number;
  tutorProfileId: string;
  scheduledAt: string;
  status: BookingStatus;
  createdAt: string;

  student?: { name: string };
  tutor?: { user?: { name: string } };
}

export interface Review {
  id: string;
  bookingId: string;
  studentId: string;
  tutorId: string;
  rating: number;
  comment?: string | null;
  createdAt?: string;
  student?: Pick<User, "id" | "name">;
}

export interface TutorsQuery {
  categoryId?: string;
  minRating?: number;
  maxPrice?: number;
  search?: string;
  page?: number;
  limit?: number;
}
