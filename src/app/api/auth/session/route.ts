import { getSession } from "@/lib/service/user.service";
import { NextResponse } from "next/server";

export async function GET() {
  const result = await getSession();
  if (result.error) {
    return NextResponse.json({ data: null }, { status: 401 });
  }
  return NextResponse.json(result);
}
