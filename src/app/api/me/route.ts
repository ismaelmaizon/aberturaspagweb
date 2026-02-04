// app/api/me/route.ts
import { NextResponse } from "next/server";
import { getUserFromCookies } from "../../../utils/auth.server";

export async function GET() {
  const user = await getUserFromCookies();
  return NextResponse.json({ user });
}