/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { db } from "../../../utils/conectDB";
import bcrypt from "bcryptjs";
import { RowDataPacket } from "mysql2";
import { requireAdmin } from "../../../utils/auth.server";

type DbUser = {
  id: number;
  email: string;
  password_hash: string; // ajustá al nombre real de tu columna
  role: "admin" | "user"; 
}

type DbUserRow = RowDataPacket & DbUser;

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json(
        { ok: false, message: "Faltan credenciales" },
        { status: 400 }
      );
    }

    const [rows] = await db.query<DbUserRow[]>(
      "SELECT id, email, password_hash, role FROM users WHERE email = ? LIMIT 1",
      [email]
    );

    const user = rows[0];
    console.log("Usuario encontrado:", user);
    console.log("Usuario encontrado:", user[0]);
    if (!user) {
      return NextResponse.json({ ok: false, message: "Credenciales inválidas" }, { status: 401 });
    }

    const esValido = await bcrypt.compare(password, user.password_hash);
    if (!esValido) {
      return NextResponse.json({ ok: false, message: "Credenciales inválidas" }, { status: 401 });
    }

    if (email !== user.email || !esValido) {
      return NextResponse.json(
        { ok: false, message: "Credenciales inválidas" },
        { status: 401 }
      );
    }

    // Crear token
    const token = jwt.sign(
      {
        email,
        role: user.role,
      },
      process.env.JWT_SECRET as string,
      { expiresIn: "1d" } // 1 día
    );

    const res = NextResponse.json({ ok: true });

    const isProd = process.env.NODE_ENV === "production";

    // Si NO tenés HTTPS en el dominio de producción, dejá esto en false.
    const useSecureCookies = false; // cambiar a true cuando tengas https

    res.cookies.set("token", token, {
      httpOnly: true,
      secure: useSecureCookies,
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24,
    });
    
    return res;
  } catch (error) {
    console.error("Error en login:", error);
    return NextResponse.json(
      { ok: false, message: "Error en el login" },
      { status: 500 }
    );
  }
}
