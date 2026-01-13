/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { db } from "../../../utils/conectDB";
import bcrypt from "bcryptjs";
import { RowDataPacket } from "mysql2";
import { requireAdmin } from "../../../utils/auth";

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
    const esValido = await bcrypt.compare(password, user.password_hash);

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
        role: "admin",
      },
      process.env.JWT_SECRET as string,
      { expiresIn: "1d" } // 1 día
    );

    const res = NextResponse.json({ ok: true });

    // Setear cookie httpOnly
    res.cookies.set("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24, // 1 día
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
