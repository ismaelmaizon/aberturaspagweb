import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

export type AuthUser = {
  email: string;
  role: string;
};

export async function getUserFromCookies(): Promise<AuthUser | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;
  console.log("Token from cookies:", token);
  if (!token) return null;

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as AuthUser;
    console.log("Decoded token:", decoded);
    return decoded;
  } catch (err) {
    console.error("Error verificando token:", err);
    return null;
  }
}

export async function requireAdmin(): Promise<AuthUser | null> {
  console.log("Verificando usuario admin...");
  const user = await getUserFromCookies();
  console.log("Usuario obtenido:", user);
  if (!user) return null;
  return user.role === "admin" ? user : null;
}