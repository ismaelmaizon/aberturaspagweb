/* eslint-disable @typescript-eslint/no-explicit-any */
import fs from "fs/promises";
import path from "path";
import { NextResponse } from "next/server";

export async function GET() {
  const nombreArchivo = "ABERTURASBODEREAU.pdf";
  const rutaArchivo = path.join(process.cwd(), "src", "catalogo", nombreArchivo);

  try {
    const buffer = await fs.readFile(rutaArchivo);

    return new NextResponse(buffer, {
      headers: {
        "Content-Type": "application/pdf",
        // inline = abrir en el navegador; attachment = forzar descarga
        "Content-Disposition": `inline; filename="${nombreArchivo}"`,
      },
    });
  } catch (err: any) {
    if (err?.code === "ENOENT") {
      return NextResponse.json({ error: "El archivo no existe", rutaArchivo }, { status: 404 });
    }
    return NextResponse.json({ error: "Error al leer el archivo", detalle: String(err) }, { status: 500 });
  }
}
