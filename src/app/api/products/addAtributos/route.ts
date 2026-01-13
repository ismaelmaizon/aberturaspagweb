
import { NextResponse } from "next/server"
import { RowDataPacket } from "mysql2";
import { db } from "@/src/utils/conectDB";

type AtributosRow = RowDataPacket & {
  id: number;
  nombre: string;
  descripcion: string;
};

export async function POST(req: Request) {
  // 1) Insertar atributos
  const requestBody = await req.json();
  console.log(requestBody);
  const { nombre, descripcion } = requestBody;
  console.log(nombre, descripcion);

  const [rows] = await db.query<AtributosRow[]>(`INSERT INTO atributos (nombre, descripcion) 
    VALUES (?, ?)`, [nombre, descripcion]);  
    
  return NextResponse.json({
    atributos: rows,
  });
}
