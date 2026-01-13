import { NextResponse } from "next/server";
import { db } from "../../../utils/conectDB";
import bcrypt from "bcryptjs";

export async function POST(req: Request) {

  try {
    const { email, password } = await req.json();

    console.log("Creando usuario:", email);

    const hash = await bcrypt.hash(password, 10);

    const result = await db.query(
      "INSERT INTO users (email, password_hash, role) VALUES (?, ?, ?)",
      [email, hash, "user"]
    );

    return NextResponse.json({ ok: true, result });
  }
  catch (error) {
    console.error("Error en /api/login:", error);
    return NextResponse.json(
      { ok: false, message: "Error del servidor" },
      { status: 500 }
    );
  }
}