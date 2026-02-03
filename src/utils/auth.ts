import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

export type AuthUser = {
  email: string;
  role: string;
};

async function  getToken(): Promise<string | null>{
  return (await cookies()).get("token")?.value ?? null;
}

export async function getUserFromCookies(): Promise<AuthUser | null> {
  const token = await getToken();
  if (!token) return null;

  try {
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET as string
    ) as unknown as AuthUser;
    return decoded;
  } catch (err) {
    console.error("Error verificando token:", err);
    return null;
  }
}

export async function requireAdmin(): Promise<AuthUser | null> {
  const user = await getUserFromCookies();
  if (!user) return null;
  if (user.role !== "admin") return null;
  return user;
}
