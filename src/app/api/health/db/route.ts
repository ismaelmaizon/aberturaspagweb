import { NextResponse } from "next/server";
import { db } from "../../../../utils/conectDB"; // ajustá la ruta según donde tengas el archivo

export async function GET() {
  try {
    const [rows] = await db.query("SELECT 1");
    return NextResponse.json({
      ok: true,
      message: "Conexión a la base de datos OK",
      db: process.env.DB_NAME,
    });
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.error("Error en /api/health/db:", error);
    return NextResponse.json(
      {
        ok: false,
        message: "Error al conectar a la base de datos",
        error: error?.message || "Error desconocido",
      },
      { status: 500 }
    );
  }
}
