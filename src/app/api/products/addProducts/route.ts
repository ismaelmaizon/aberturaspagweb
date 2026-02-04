import { NextResponse } from "next/server";
import { db } from "../../../../utils/conectDB";
import fs from "fs";
import path from "path";
import { requireAdmin } from "../../../../utils/auth.server";


export async function POST(req: Request) {
  // PROTEGER SOLO ADMIN (UNA SOLA VEZ)
  const user = await requireAdmin();
  if (!user) {
    return NextResponse.json(
      { ok: false, message: "No autorizado" },
      { status: 401 }
    );
  }

  try {
    
    console.log("Llegó una solicitud POST a /api/addProducts");

    const formData = await req.formData();
    
    const nombre = formData.get("nombre") as string | null;
    const descripcion = formData.get("descripcion") as string | null;
    const imagen = formData.get("imagen") as File | null;
    const precio = formData.get("precio") as number | null;
    const tipos = formData.get("tipos") as number | null;
    const material = formData.get("material") as number | null;
    const atributos = formData.get("atributos") as number | null;
    
   

    if (!nombre || !descripcion || !imagen) {
      return NextResponse.json(
        { ok: false, message: "No se subió ninguna imagen" },
        { status: 400 }
      );
    }

    const bytes = await imagen.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Nombre único para evitar conflictos
    const fileName: string = `${Date.now()}-${imagen.name}`;

    // Ruta absoluta hacia /public/products
    const filePath = path.join(process.cwd(), "public", "products", fileName);

    // Guardar físicamente la imagen
    fs.writeFileSync(filePath, buffer);

    // Guardar en DB la ruta accesible desde el navegador
    const urlImagen: string = `/products/${fileName}`;
    console.log("Imagen guardada como:", fileName);
    console.log("Guardando en DB:", { nombre, descripcion, urlImagen, precio, tipos, material });
    
    
    const query = `
      INSERT INTO productos (nombre, descripcion, urlImagen, precio, tipos, material, atributos)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const [result]: any = await db.execute(query, [
      nombre,
      descripcion,
      urlImagen,
      precio,
      tipos,
      material,
      atributos
    ]);
      

    return NextResponse.json(
      {
        ok: true,
        id: result.insertId,
        nombre, // 👈 para que tu frontend pueda hacer data.nombre
      },
      { status: 201 }
    );
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.error("Error al agregar el producto:", error);
    return NextResponse.json(
      {
        ok: false,
        message: error.message || "Error al agregar el producto",
      },
      { status: 500 }
    );
  }
}