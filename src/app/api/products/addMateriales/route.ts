import fs from "fs"
import path from "path"
import { NextResponse } from "next/server"
import { RowDataPacket } from "mysql2";
import { db } from "@/src/utils/conectDB";

type MaterialesRow = RowDataPacket & {
  id: number;
  nombre: string;
};

export async function POST(req: Request) {
  // 1) Insertar materiales
  const requestBody = await req.json();
  const { nombre } = requestBody;

  const [rows] = await db.query<MaterialesRow[]>(`INSERT INTO materiales (nombre) 
    VALUES (?)`, [nombre]);  

  return NextResponse.json({
    materiales: rows,
  });
}
