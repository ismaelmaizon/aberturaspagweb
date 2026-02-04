import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

export type AuthUser = {
  email: string;
  role: string;
};

export async function getUserFromCookies(): Promise<AuthUser | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;
  if (!token) return null;

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as AuthUser;
    return decoded;
  } catch (err) {
    console.error("Error verificando token:", err);
    return null;
  }
}

export async function requireAdmin(): Promise<AuthUser | null> {
  const user = await getUserFromCookies();
  if (!user) return null;
  return user.role === "admin" ? user : null;
}