import fs from "fs"
import path from "path"
import { NextResponse } from "next/server"
import { RowDataPacket } from "mysql2";
import { db } from "@/src/utils/conectDB";

type ProductRow = RowDataPacket & {
  id: number;
  nombre: string;
  descripcion: string;
  urlImagen: string | null;
  precio: number | null;
  created_at: string; // o Date, según tu tabla
  tipos: number | null;
  material: number | null;
  atributos: number | null;
};


type CountRow = RowDataPacket & { total: number };

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)

  const page = Number(searchParams.get("page") ?? 1)
  const limit = Number(searchParams.get("limit") ?? 8)
  /*
  // Leer JSON desde /src/json
  const filePath = path.join(process.cwd(), "src", "json", "products.json")
  
  const fileContent = fs.readFileSync(filePath, "utf8")
  
  const products = JSON.parse(fileContent)

  const total = products.length
  const totalPages = Math.ceil(total / limit)

  // Slice para paginar
  const start = (page - 1) * limit
  const end = start + limit
  const paginatedProducts = products.slice(start, end)

  return NextResponse.json({
    page,
    limit,
    total,
    totalPages,
    products: paginatedProducts
  })*/
  // Leer desde base de datos MySQL
  const offset = (page - 1) * limit;

  // 1) total
  const [countRows] = await db.query<CountRow[]>(
    "SELECT COUNT(*) AS total FROM productos"
  );
  const total = countRows[0]?.total ?? 0;
  const totalPages = Math.max(Math.ceil(total / limit), 1);

  // 2) página de productos
  const [rows] = await db.query<ProductRow[]>(
    `SELECT id, nombre, descripcion, urlImagen, precio, created_at, tipos, material, atributos
     FROM productos
     ORDER BY id DESC
     LIMIT ? OFFSET ?`,
    [limit, offset]
  );

  return NextResponse.json({
    page,
    limit,
    total,
    totalPages,
    products: rows,
  });
}
