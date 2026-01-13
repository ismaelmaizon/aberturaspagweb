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

export async function GET(req: Request) {

  // 2) página de productos
  const [rows] = await db.query<TiposRow[]>(`SELECT * FROM tipos`);

  return NextResponse.json({
    tipos: rows,
  });
}
