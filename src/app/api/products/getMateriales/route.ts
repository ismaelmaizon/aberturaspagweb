import fs from "fs"
import path from "path"
import { NextResponse } from "next/server"
import { RowDataPacket } from "mysql2";
import { db } from "@/src/utils/conectDB";

type MaterialesRow = RowDataPacket & {
  id: number;
  nombre: string;
};

export async function GET(req: Request) {

  // 2) página de productos
  const [rows] = await db.query<MaterialesRow[]>(`SELECT * FROM materiales`);

  return NextResponse.json({
    materiales: rows,
  });
}
