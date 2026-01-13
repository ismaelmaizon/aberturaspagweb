import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

export type AuthUser = {
  email: string;
  role: string;
};

export async function getUserFromCookies(): Promise<AuthUser | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  if (!token) return null;

  try {
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET as string
    ) as AuthUser;
    return decoded;
  } catch (err) {
    console.error("Error verificando token:", err);
    return null;
  }
}

export async function requireAdmin(): Promise<AuthUser | null> {
  const token = (await cookies()).get("token")?.value;
  if (!token) return null;

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as AuthUser;
    if (decoded.role !== "admin") return null;
    return decoded;
  } catch {
    return null;
  }
}
