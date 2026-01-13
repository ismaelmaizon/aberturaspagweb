import fs from "fs"
import path from "path"
import { NextResponse } from "next/server"
import { RowDataPacket } from "mysql2";
import { db } from "@/src/utils/conectDB";

type TiposRow = RowDataPacket & {
  id: number;
  nombre: string;
  descripcion: string;
};

export async function POST(req: Request) {
  // 1) Insertar tipos
  const requestBody = await req.json();
  const { nombre, descripcion } = requestBody;

  const [rows] = await db.query<TiposRow[]>(`INSERT INTO tipos (nombre, descripcion) 
    VALUES (?, ?)`, [nombre, descripcion]);  

  return NextResponse.json({
    tipos: rows,
  });
}
